using System;
using System.Collections;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Web.Services;
using System.Xml;
using iExchange.Common;
using iExchange.Common.Client;
using System.Text;
using System.Web.SessionState;
using System.Web.Security;
using System.Collections.Generic;
using System.Globalization;
//using iExchange.DataAccess;

namespace iExchange.DealingConsole
{
    /// <summary>
    /// Summary description for Service.
    /// </summary>
    [WebService(Namespace = "http://www.omnicare.com/iExchange/DealingConsole/")]
    public class Service : System.Web.Services.WebService
    {
        public Service()
        {
            //CODEGEN: This call is required by the ASP.NET Web Services Designer
            InitializeComponent();
        }

        protected StateServerService StateServer
        {
            get { return (StateServerService)Application["StateServer"]; }
        }

        #region Component Designer generated code

        //Required by the Web Services Designer 
        private IContainer components = null;

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {

        }

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing && components != null)
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #endregion

        // WEB SERVICE EXAMPLE
        // The HelloWorld() example service returns the string Hello World
        // To build, uncomment the following lines then save and build the project
        // To test this web service, press F5
        
        public static string ConnectionString
        {
            get { return ConfigurationManager.AppSettings["ConnectionString"]; }
        }

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod(true)]
        public void Logout()
        {
            //try
            //{
            //    if (this.Session["Token"] != null && this.Context != null)
            //    {
            //        Token token = (Token)this.Session["Token"];
            //        Service.SaveLog2(token, this.Context.Request.UserHostAddress.ToString(), "Logout", "Logout", Guid.Empty, "");
            //        this.StateServer.Logout(token);
            //    }
            //}
            //catch (Exception exception)
            //{
            //    AppDebug.LogEvent("DealingConsole.Logout:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            //}

            try
            {
                Hashtable sessionIDs = (Hashtable)this.Application["SessionIDs"];
                sessionIDs = Hashtable.Synchronized(sessionIDs);

                //For multithread safety using following code
                DictionaryEntry[] userIDToSessionID = new DictionaryEntry[sessionIDs.Count];
                sessionIDs.CopyTo(userIDToSessionID, 0);
                foreach (DictionaryEntry de in userIDToSessionID)
                {
                    if ((string)de.Value == this.Session.SessionID)
                    {
                        sessionIDs.Remove(de.Key);
                        break;
                    }
                }

                if (this.Session["Token"] != null && this.Context != null)
                {
                    Token token = (Token)this.Session["Token"];
                    DealingConsoleServer.SaveLog2(token, this.Context.Request.UserHostAddress.ToString(), "Logout", "Logout", Guid.Empty, "");

                    this.StateServer.Logout(token);
                    FormsAuthentication.SignOut();
                }
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.Service.Logout(log)", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
        }

        [WebMethod(true)]
        public Guid Login(string loginID, string password)
        {
            Guid userID = Guid.Empty;
            if (loginID == "") return userID;

            try
            {
                if (LoginRetryTimeHelper.IsFailedCountExceeded(loginID, ParticipantType.Employee, ConnectionString))
                {
                    string info = string.Format("{0} login failed: exceed max login retry times", loginID);
                    AppDebug.LogEvent("DealingConsole", info, EventLogEntryType.Warning);
                    return userID;
                }

                ParticipantServices.ParticipantServices ParticipantServices = (ParticipantServices.ParticipantServices)Application["ParticipantServices"];
                userID = ParticipantServices.Login(loginID, password);
                if (userID != Guid.Empty)
                {
                    LoginRetryTimeHelper.ClearFailedCount(userID, ParticipantType.Employee, ConnectionString);

                    SecurityServices.SecurityServices securityServices = (SecurityServices.SecurityServices)Application["SecurityServices"];
                    Guid programID = new Guid(ConfigurationSettings.AppSettings["DealingConsole"]);
                    Guid permissionID = new Guid(ConfigurationSettings.AppSettings["Run"]);
                    string message;
                    bool isAuthrized = securityServices.CheckPermission(userID, programID, permissionID, "", "", userID, out message);
                    if (!isAuthrized)
                    {
                        userID = Guid.Empty;
                    }
                    else
                    {
                        Token token = new Token(Guid.Empty, UserType.Dealer, AppType.DealingConsole);
                        token.UserID = userID;
                        token.SessionID = this.Context.Session.SessionID;
                        this.Session["Token"] = token;
                        if (this.StateServer.Login(token) == false)
                        {
                            this.Session["Token"] = null;
                            userID = Guid.Empty;
                        }
                        else
                        {
                            DateTime now = DateTime.Now;
                            this.Session["LoginTime"] = now.ToString("yyyy-MM-dd HH:mm:ss");
                            this.WriteLoginLog("Logon",now, "Logon", Guid.Empty, "");
                        }
                    }
                }
                else
                {
                    LoginRetryTimeHelper.IncreaseFailedCount(loginID, ParticipantType.Employee, ConnectionString);
                }
            }
            catch (System.Exception e)
            {
                AppDebug.LogEvent("DealingConsole.Login", e.ToString(), EventLogEntryType.Error);
            }
            
            return userID;
        }

        private XmlNode GetPermissionItems(Token token)
        {
            try
            {
                string itemName = "Instrument";

                ArrayList groups = new ArrayList();
                string sqlString = string.Format("SELECT [ID] FROM [Group] WHERE [GroupType]='{0}'", itemName);
                SqlCommand cmd = new SqlCommand(sqlString, new SqlConnection(ConnectionString));
                try
                {
                    cmd.Connection.Open();
                    SqlDataReader myReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                    while (myReader.Read())
                    {
                        groups.Add(myReader.GetGuid(0));
                    }
                }
                finally
                {
                    if (cmd.Connection.State == ConnectionState.Open)
                        cmd.Connection.Close();
                }

#if (PERMISSION)
                SecurityServices.SecurityServices securityServices = (SecurityServices.SecurityServices)Application["SecurityServices"];
                Guid assignID = new Guid(ConfigurationSettings.AppSettings["Access1"]);
                DataSet ds = securityServices.GetRequestPermissionSettingSchma(token.UserID);
                DataTable dt = ds.Tables["V_RequestCheckPermission"];

                foreach (Guid groupID in groups)
                {
                    DataRow myRow = dt.NewRow();
                    myRow["ParticipantID"] = token.UserID;
                    myRow["ObjectID"] = groupID;
                    myRow["PermissionID"] = assignID;
                    myRow["ParticipantName"] = "";
                    myRow["ObjectName"] = "";
                    myRow["PermissionName"] = "";
                    dt.Rows.Add(myRow);
                }

                DataSet ds1 = securityServices.CheckPermission(ds, token.UserID);

                groups.Clear();
                foreach (DataRow dr in ds1.Tables["V_RequestCheckPermission"].Rows)
                {
                    Guid groupID = (Guid)dr["ObjectID"];
                    if ((bool)dr["Result"] == true)
                    {
                        groups.Add(groupID);
                    }
                }
#endif

                XmlDocument xmlDocument = new XmlDocument();
                XmlElement topNode = xmlDocument.CreateElement(itemName + "s");
                xmlDocument.AppendChild(topNode);

                string groups2 = this.Transform(groups, "Groups", "Group", "ID");
                sqlString = string.Format("exec dbo.P_GetGroupMember '{0}'", groups2);
                SqlConnection sqlConnection = new SqlConnection(ConnectionString);
                SqlCommand sqlCommand = new SqlCommand(sqlString, sqlConnection);
                sqlCommand.CommandTimeout = 30;
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
                sqlConnection.Open();
                DataSet dataSet = new DataSet();
                sqlDataAdapter.SelectCommand = sqlCommand;
                sqlDataAdapter.Fill(dataSet, "Group");
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables["Group"].Rows.Count > 0)
                {
                    foreach (DataRow dataRow in dataSet.Tables["Group"].Rows)
                    {
                        XmlElement itemElement = xmlDocument.CreateElement(itemName);
                        itemElement.SetAttribute("ID", ((Guid)dataRow["MemberID"]).ToString());
                        topNode.AppendChild(itemElement);
                    }
                }

                //foreach (Guid groupID in groups)
                //{
                //    sqlString = string.Format("SELECT MemberID FROM GroupMembership WHERE GroupID='{0}'", groupID);
                //    SqlCommand cmd2 = new SqlCommand(sqlString, new SqlConnection(ConnectionString));
                //    try
                //    {
                //        cmd2.Connection.Open();
                //        SqlDataReader myReader = cmd2.ExecuteReader(CommandBehavior.CloseConnection);
                //        while (myReader.Read())
                //        {
                //            XmlElement itemElement = doc.CreateElement(itemName);
                //            itemElement.SetAttribute("ID", myReader.GetGuid(0).ToString());
                //            topNode.AppendChild(itemElement);
                //        }
                //        myReader.Close();
                //    }
                //    catch
                //    {
                //        if (cmd2.Connection.State == ConnectionState.Open)
                //            cmd2.Connection.Close();
                //    }
                //}
                sqlConnection.Close();
                return xmlDocument.DocumentElement;
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.GetPermissionItems", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        private string Transform(ArrayList aDataStr, string rootName, string elementName, string attributeName)
        {
            XmlDocument doc = new XmlDocument();
            XmlElement root = doc.CreateElement(rootName);

            foreach (Guid attributeValue in aDataStr)
            {
                XmlElement node = doc.CreateElement(elementName);
                node.SetAttribute(attributeName, attributeValue.ToString());

                root.AppendChild(node);
            }
            return root.OuterXml;
        }

        #region GetInitDataXml3
        [WebMethod(true)]
        public XmlNode GetInitDataXml3()
        {
            try
            {
                int commandSequence;
                string userID;
                string xmlString = this.GetInitDataXml(out commandSequence, out userID);
                XmlDocument docSource = new XmlDocument();
                XmlDocument docTarget = new XmlDocument();
                docTarget.AppendChild(docTarget.CreateXmlDeclaration("1.0", "utf-8", null));
                if (!string.IsNullOrEmpty(xmlString))
                {
                    docSource.LoadXml(xmlString);
                    this.InitDataConvertNodeToAttribute(ref docTarget, docSource);
                }

                XmlElement xmlNodeTableCommandInfo = docTarget.CreateElement("CommandInfos");
                XmlElement xmlNodeRowCommandInfo = docTarget.CreateElement("CommandInfo");
                xmlNodeRowCommandInfo.SetAttribute("CommandSequence", XmlConvert.ToString(commandSequence));
                xmlNodeRowCommandInfo.SetAttribute("UserID", userID);
                xmlNodeTableCommandInfo.AppendChild(xmlNodeRowCommandInfo);
                docTarget.DocumentElement.InsertBefore(xmlNodeTableCommandInfo, docTarget.DocumentElement.FirstChild);

                //Add by Erric Language xml
                CultureInfo cultureInfo = (this.Session["CultureInfor"] != null) ? (CultureInfo)this.Session["CultureInfor"] : LanguageManager.CultureInfo;
                XmlElement rootNode = docTarget.DocumentElement;;
                rootNode.SetAttribute("Language", cultureInfo.Name);
               
                if(this.Session["LanguageXml"] != null && cultureInfo.Name != "en")
                {
                    XmlElement languageXmlInfo = docTarget.CreateElement("Languages");
                    XmlDocument languageXmlDoc= (XmlDocument)this.Session["LanguageXml"];
                    XmlElement root = languageXmlDoc.DocumentElement["GridLanguages"];

                    foreach (XmlNode node in root.ChildNodes)
                    {
                        XmlNode newNode = docTarget.CreateElement(node.Name);
                        foreach (XmlNode itemNode in node.ChildNodes)
                        {
                            XmlElement xe = docTarget.CreateElement("Item");
                            xe.SetAttribute("key", itemNode.Attributes["key"].Value);
                            xe.SetAttribute("value", itemNode.Attributes["value"].Value);
                            newNode.AppendChild(xe);
                        }
                        languageXmlInfo.AppendChild(newNode);
                    }
                    //docTarget.LastChild.AppendChild(languageXmlInfo);
                    docTarget.DocumentElement.InsertAfter(languageXmlInfo, docTarget.DocumentElement.LastChild);
                }

                return docTarget.DocumentElement;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetInitDataXml3:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);

                XmlDocument docTarget2 = new XmlDocument();
                docTarget2.AppendChild(docTarget2.CreateXmlDeclaration("1.0", "utf-8", null));
                XmlElement xmlNodeException = docTarget2.CreateElement("Exception");
                docTarget2.AppendChild(xmlNodeException);
                xmlNodeException.SetAttribute("Value",exception.Message);
                return docTarget2.DocumentElement;
                //return null;
            }
        }

        private string GetInitDataXml(out int commandSequence, out string userID)
        {
            DataSet dataSet = this.GetInitData(out commandSequence,out userID);
            dataSet = SqlHelper.ChangeDateTimeModeToUnspecified(dataSet);
            return SqlHelper.ConvertDataSetToString(dataSet,XmlWriteMode.IgnoreSchema);
        }

        private void InitDataConvertNodeToAttribute(ref XmlDocument docTarget, XmlDocument docSource)
        {
            if (docSource == null || !docSource.HasChildNodes) return;

            XmlNode xmlNewDataSet = docTarget.CreateElement("NewDataSet");
            docTarget.AppendChild(xmlNewDataSet);
            XmlElement xmlNodeTableSourceInstrument = docTarget.CreateElement("SourceInstruments");
            xmlNewDataSet.AppendChild(xmlNodeTableSourceInstrument);
            XmlElement xmlNodeTableSystemParameter = docTarget.CreateElement("SystemParameters");
            xmlNewDataSet.AppendChild(xmlNodeTableSystemParameter);
            XmlElement xmlNodeTableTradeDay = docTarget.CreateElement("TradeDays");
            xmlNewDataSet.AppendChild(xmlNodeTableTradeDay);
            XmlElement xmlNodeTableDealerParameterGroupDetail = docTarget.CreateElement("DealerParameterGroupDetails");
            xmlNewDataSet.AppendChild(xmlNodeTableDealerParameterGroupDetail);
            XmlElement xmlNodeTableCustomer = docTarget.CreateElement("Customers");
            xmlNewDataSet.AppendChild(xmlNodeTableCustomer);
            XmlElement xmlNodeTableAccountGroup = docTarget.CreateElement("AccountGroups");
            xmlNewDataSet.AppendChild(xmlNodeTableAccountGroup);
            XmlElement xmlNodeTableAccount = docTarget.CreateElement("Accounts");
            xmlNewDataSet.AppendChild(xmlNodeTableAccount);
            XmlElement xmlNodeTableQuotePolicy = docTarget.CreateElement("QuotePolicys");
            xmlNewDataSet.AppendChild(xmlNodeTableQuotePolicy);
            XmlElement xmlNodeTableQuotePolicyDetail = docTarget.CreateElement("QuotePolicyDetails");
            xmlNewDataSet.AppendChild(xmlNodeTableQuotePolicyDetail);
            XmlElement xmlNodeTableTradePolicy = docTarget.CreateElement("TradePolicys");
            xmlNewDataSet.AppendChild(xmlNodeTableTradePolicy);
            XmlElement xmlNodeTableTradePolicyDetail = docTarget.CreateElement("TradePolicyDetails");
            xmlNewDataSet.AppendChild(xmlNodeTableTradePolicyDetail);
            XmlElement xmlNodeTableInstrument = docTarget.CreateElement("Instruments");
            xmlNewDataSet.AppendChild(xmlNodeTableInstrument);
            XmlElement xmlNodeTableTradingTime = docTarget.CreateElement("TradingTimes");
            xmlNewDataSet.AppendChild(xmlNodeTableTradingTime);
            XmlElement xmlNodeTableOverridedQuotation = docTarget.CreateElement("OverridedQuotations");
            xmlNewDataSet.AppendChild(xmlNodeTableOverridedQuotation);
            XmlElement xmlNodeTableOriginQuotation = docTarget.CreateElement("OriginQuotations");
            xmlNewDataSet.AppendChild(xmlNodeTableOriginQuotation);
            XmlElement xmlNodeTableOrder = docTarget.CreateElement("Orders");
            xmlNewDataSet.AppendChild(xmlNodeTableOrder);
            XmlElement xmlNodeTableOrderRelation = docTarget.CreateElement("OrderRelations");
            xmlNewDataSet.AppendChild(xmlNodeTableOrderRelation);
            XmlElement xmlNodeTableOrderModification = docTarget.CreateElement("OrderModifications");
            xmlNewDataSet.AppendChild(xmlNodeTableOrderModification);
            XmlElement xmlNodeTableSettings = docTarget.CreateElement("Settingss");
            xmlNewDataSet.AppendChild(xmlNodeTableSettings);
            XmlElement xmlNodeTableAppendParameters = docTarget.CreateElement("AppendParameterss");
            xmlNewDataSet.AppendChild(xmlNodeTableAppendParameters);

            XmlNode xmlNodeDataSetSource = docSource.GetElementsByTagName("NewDataSet")[0];
            foreach (XmlNode xmlNodeTableSource in xmlNodeDataSetSource.ChildNodes)
            {
                switch (xmlNodeTableSource.Name)
                {
                    case "SourceInstrument":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableSourceInstrument, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "SystemParameter":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableSystemParameter, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "TradeDay":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableTradeDay, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "DealerParameterGroupDetail":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableDealerParameterGroupDetail, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "Customer":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableCustomer, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "AccountGroup":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableAccountGroup, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "Account":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableAccount, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "QuotePolicy":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableQuotePolicy, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "QuotePolicyDetail":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableQuotePolicyDetail, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "TradePolicy":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableTradePolicy, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "TradePolicyDetail":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableTradePolicyDetail, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "Instrument":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableInstrument, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "TradingTime":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableTradingTime, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "OverridedQuotation":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableOverridedQuotation, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "OriginQuotation":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableOriginQuotation, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "Order":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableOrder, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "OrderRelation":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableOrderRelation, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    //???
                    case "OrderModification":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableOrderModification, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "Settings":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableSettings, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;
                    case "AppendParameters":
                        this.ConvertNodeToAttribute(ref docTarget, xmlNodeTableAppendParameters, xmlNodeTableSource.Name, xmlNodeTableSource);
                        break;                        
                }
            }
        }

        private void ConvertNodeToAttribute(ref XmlDocument docTarget, XmlElement xmlNodeTable, string tableName, XmlNode xmlNodeTableSource)
        {
            XmlElement xmlNodeRow = docTarget.CreateElement(tableName);
            xmlNodeTable.AppendChild(xmlNodeRow);
            foreach (XmlNode xmlNodeFieldSource in xmlNodeTableSource)
            {
                xmlNodeRow.SetAttribute(xmlNodeFieldSource.Name, xmlNodeFieldSource.InnerText);
            }
        }
        #endregion GetInitDataXml3

        private DataSet GetInitData(out int commandSequence, out string userID)
        {
            //Token token=new Token(new Guid("FA846119-1FD3-4F5F-8144-3A90C0F14B27"),UserType.Dealer,AppType.DealingConsole);
            //Session["Token"]=token;

            try
            {
                Token token = (Token)Session["Token"];
                XmlNode itemNode = GetPermissionItems(token);
                DataSet initData = this.StateServer.GetInitData(token, itemNode, out commandSequence);
                //commandSequence++;
                Commands commands = (Commands)this.Context.Application["Commands"];
                commandSequence = commands.LastSequence;

                AppDebug.LogEvent("[DealingConsole.GetInitData]commandSequence", string.Format("{0} by {1}", commandSequence, token), EventLogEntryType.Information);

                userID = token.UserID.ToString();

                //Fill state
                DataRowCollection rows;
                DealingConsoleState state = new DealingConsoleState();
                //state.Instruments = new Hashtable();
                //QuotePolicy
                //rows=initData.Tables["Customer"].Rows;
                //state.QuotePolicyID=(Guid)rows[0]["QuotePolicyID"];
                //Instrument
                try
                {
                    rows = initData.Tables["Instrument"].Rows;
                    foreach (DataRow row in rows)
                    {
                        state.Instruments.Add(row["ID"], null);
                    }

                    //Account			
                    /*
                    rows = initData.Tables["Account"].Rows;
                    Guid[] accountIDs = new Guid[rows.Count];
                    int i = 0;
                    foreach (DataRow accountRow in rows)
                    {
                        accountIDs[i++] = (Guid)accountRow["ID"];
                    }
                    Session["AccountIDs"] = accountIDs;
                    */

                    this.Context.Session["State"] = state;
                    this.Context.Session["NextSequence"] = commandSequence;

                    this.AppendParameters(initData);
                }
                catch (System.Exception ex)
                {
                    AppDebug.LogEvent("DealingConsole.GetInitData", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
                }
                // ...            

                return initData;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetInitData:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        private void AppendParameters(DataSet initData)
        {
            DataTable parametersTable = new DataTable("AppendParameters");
            parametersTable.Columns.Add("ConfirmRejectDQOrder", typeof(bool));
            parametersTable.Columns.Add("AllowModifyOrderLot", typeof(bool));

            DataRow row = parametersTable.NewRow();
            parametersTable.Rows.Add(row);
            string confirmRejectDQOrder = ConfigurationSettings.AppSettings["ConfirmRejectDQOrder"];
            row["ConfirmRejectDQOrder"] = bool.Parse(confirmRejectDQOrder);

            string allowModifyOrderLot = ConfigurationSettings.AppSettings["AllowModifyOrderLot"];
            row["AllowModifyOrderLot"] = bool.Parse(allowModifyOrderLot);

            parametersTable.AcceptChanges();
            initData.Tables.Add(parametersTable);
        }

        [WebMethod(true)]
        public XmlNode GetCommands()
        {//Modified by Michael on 2005-01-20
            XmlNode xmlCommands = null;
            try
            {
                Token token = (Token)Session["Token"];
                int firstSequence = (int)this.Context.Session["NextSequence"];

                DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
                Commands commands = (Commands)this.Context.Application["Commands"];
                xmlCommands = commands.GetCommands(token, state, firstSequence);
                xmlCommands = this.VerifyRefrence(xmlCommands);

                int lastSequence = XmlConvert.ToInt32(xmlCommands.Attributes["LastSequence"].Value) + 1;
                this.Context.Session["NextSequence"] = lastSequence;

                if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebugGetCommands"]))
                {
                    AppDebug.LogEvent("DealingConsole.GetCommands:", token.ToString() + "\n" + xmlCommands.OuterXml, EventLogEntryType.Information);
                }
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.GetCommands", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw;
            }
            return xmlCommands;
        }

        [WebMethod(true)]
        public XmlNode GetCommands2(int firstSequence, int lastSequence)
        {
            Token token = (Token)Session["Token"];
            int nextSequence = (int)this.Context.Session["NextSequence"];
            if (Command.CompareSequence(firstSequence, lastSequence) > 0 || Command.CompareSequence(nextSequence, lastSequence) <= 0)
            {
                AppDebug.LogEvent("DealingConsole.GetCommands2:", string.Format("{0}, nextSequence == {1}, range == [{2},{3}]", token, nextSequence, firstSequence, lastSequence), EventLogEntryType.Error);
                return null;
            }

            //Modified by Michael on 2005-01-20
            XmlNode xmlCommands = null;
            try
            {
                DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
                Commands commands = (Commands)this.Context.Application["Commands"];
                xmlCommands = commands.GetCommands(token, state, firstSequence, lastSequence);
                xmlCommands = this.VerifyRefrence(xmlCommands);

                AppDebug.LogEvent("DealingConsole.GetCommands2:", string.Format("{0}, nextSequence == {1}, range == [{2},{3}]\n{4}", token, nextSequence, firstSequence, lastSequence, xmlCommands.OuterXml), EventLogEntryType.Warning);
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.GetCommands2", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw;
                //				return null;
            }
            return xmlCommands;
        }

        private XmlNode VerifyRefrence(XmlNode xmlCommands)
        {
            string xmlCustomerIDs = string.Empty;
            string xmlAccountIDs = string.Empty;
            DealingConsoleServer dealingConsoleServer = (DealingConsoleServer)this.Context.Application["DealingConsoleServer"];

            try
            {
                foreach (XmlElement xmlElement in xmlCommands.ChildNodes)
                {
                    switch (xmlElement.Name)
                    {
                        case "Execute2":
                        case "Place":
                        case "Cut":
                            XmlElement tran = (XmlElement)xmlElement.GetElementsByTagName("Transaction")[0];
                            Guid accountID = XmlConvert.ToGuid(tran.Attributes["AccountID"].Value);
                            if (!dealingConsoleServer.ContainsAccount(accountID))
                            {
                                xmlAccountIDs += "<Account ID='" + accountID.ToString() + "'></Account>";
                            }
                            break;
                        case "Quote":
                        case "CancelQuote":
                            Guid customerID = XmlConvert.ToGuid(xmlElement.Attributes["CustomerID"].Value);
                            if (!dealingConsoleServer.ContainsCustomer(customerID))
                            {
                                xmlCustomerIDs += "<Customer ID='" + customerID.ToString() + "'></Customer>";
                            }
                            break;
                    }
                }
                if (xmlCustomerIDs != string.Empty)
                {
                    xmlCustomerIDs = "<Customers>" + xmlCustomerIDs + "</Customers>";

                    DataSet dataSet = dealingConsoleServer.GetCustomers(xmlCustomerIDs);
                    XmlDocument xmlDocument = xmlCommands.OwnerDocument;
                    XmlElement parameters = xmlDocument.CreateElement("Parameters");

                    System.Text.StringBuilder stringBuilder = new System.Text.StringBuilder();
                    System.IO.StringWriter instrumentWriter = new System.IO.StringWriter(stringBuilder);
                    System.Xml.XmlWriter instrumentXmlWriter = new XmlTextWriter(instrumentWriter);

                    System.Xml.Serialization.XmlSerializer xmlSerializer = new System.Xml.Serialization.XmlSerializer(typeof(DataSet));
                    xmlSerializer.Serialize(instrumentXmlWriter, dataSet);

                    parameters.SetAttribute("DataSet", stringBuilder.ToString());
                    xmlCommands.InsertBefore(parameters, xmlCommands.FirstChild);
                }
                if (xmlAccountIDs != string.Empty)
                {
                    xmlAccountIDs = "<Accounts>" + xmlAccountIDs + "</Accounts>";

                    DataSet dataSet = dealingConsoleServer.GetAccounts(xmlAccountIDs);
                    XmlDocument xmlDocument = xmlCommands.OwnerDocument;
                    XmlElement parameters = xmlDocument.CreateElement("Parameters");

                    System.Text.StringBuilder stringBuilder = new System.Text.StringBuilder();
                    System.IO.StringWriter instrumentWriter = new System.IO.StringWriter(stringBuilder);
                    System.Xml.XmlWriter instrumentXmlWriter = new XmlTextWriter(instrumentWriter);

                    System.Xml.Serialization.XmlSerializer xmlSerializer = new System.Xml.Serialization.XmlSerializer(typeof(DataSet));
                    xmlSerializer.Serialize(instrumentXmlWriter, dataSet);

                    parameters.SetAttribute("DataSet", stringBuilder.ToString());
                    xmlCommands.InsertBefore(parameters, xmlCommands.FirstChild);
                }
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.VerifyRefrence", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }

            return xmlCommands;
        }

        [WebMethod(true)]
        public bool SetQuotation(string quotation,Guid instrumentID, bool acceptOutOfRangePrice, string eventMessage)
        {
            try
            {
                Token token = (Token)Session["Token"];
                bool isOK = this.StateServer.SetQuotation(token, quotation);
                if (acceptOutOfRangePrice && isOK)
                {
                    this.WriteLog("OutOfRangeAccept", eventMessage, instrumentID,"");
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.SetQuotation:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        #region UpdateInstrumentParameter
        //更新单个Instrument的单个参数
        [WebMethod(true)]
        public bool UpdateInstrument(string instrumentID, string instrumentCode, string Name, string Value)
        {
            try
            {
                Token token = (Token)Session["Token"];

                XmlDocument doc = new XmlDocument();
                XmlNode instruments = doc.CreateNode(XmlNodeType.Element, "Instruments", null);
                XmlNode instrument = doc.CreateNode(XmlNodeType.Element, "Instrument", null);
                XmlAttribute attribute = doc.CreateAttribute("ID");
                attribute.Value = instrumentID;
                instrument.Attributes.Append(attribute);

                attribute = doc.CreateAttribute(Name);
                attribute.Value = Value;
                instrument.Attributes.Append(attribute);

                instruments.AppendChild(instrument);

                if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                {
                    AppDebug.LogEvent("DealingConsole.UpdateInstrument:", token.ToString() + "\n instrumentCode=" + instrumentCode + ":" + instruments.OuterXml, EventLogEntryType.Information);
                }

                bool isOK = this.StateServer.UpdateInstrument(token, instruments);
                if (isOK)
                {
                    string objectIDs = "Instrument";
                    string eventMessage = string.Format("Code={0}: {1}={2}", instrumentCode, Name, Value);
                    this.WriteLog(objectIDs, eventMessage, new Guid(instrumentID), instrumentCode);
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateInstrument:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        //更新成批Instrument的参数
        [WebMethod(true)]
        public bool UpdateInstrument2(string instrumentXml, string objectIDs, string eventMessages, string instrumentIDString, string instrumentCode)
        {
            try
            {
                Token token = (Token)Session["Token"];

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(instrumentXml);
                XmlNode instrumentNodes = (XmlNode)doc.FirstChild;

                if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                {
                    AppDebug.LogEvent("DealingConsole.UpdateInstrument2:", token.ToString() + "\n" + instrumentNodes.OuterXml, EventLogEntryType.Information);
                }

                bool isOK = this.StateServer.UpdateInstrument(token, instrumentNodes);
                if (isOK)
                {
                    Guid transactionID = Guid.Empty;
                    if (!string.IsNullOrWhiteSpace(instrumentIDString))
                    {
                        transactionID = new Guid(instrumentIDString);
                    }
                    this.WriteLog(objectIDs, eventMessages, transactionID, instrumentCode);
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateInstrument2:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        [WebMethod(true)]
        public int SuspendOrResume(bool isResume)
        {
            int result = -1;
            try
            {
                Token token = (Token)Session["Token"];
                DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
                if (state == null || state.Instruments.Count <= 0 || state.Instruments.Keys.Count <= 0)
                {
                    result = -2;
                    return result;
                }

                int count = state.Instruments.Keys.Count;
                string[] instrumentIDArray = new string[count];
                int i = 0;
                foreach (Guid key in state.Instruments.Keys)
                {
                    instrumentIDArray[i] = "'" + key.ToString() + "'";
                    i++;
                }
                string instrumentIDs = String.Join(",", instrumentIDArray);

                string sql = string.Format("SELECT ID,Code,IsPriceEnabled,IsAutoEnablePrice FROM dbo.Instrument WHERE ID IN ({0}) AND (IsPriceEnabled={1} OR IsAutoEnablePrice={2})", instrumentIDs, (isResume ? 0 : 1), (isResume ? 0 : 1));
                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                {
                    string instrumentCodes = string.Empty;

                    bool setValue = (isResume ? true : false);
                    XmlDocument doc = new XmlDocument();
                    XmlNode instruments = doc.CreateNode(XmlNodeType.Element, "Instruments", null);
                    XmlAttribute attribute;
                    foreach (DataRow dataRow in dataSet.Tables[0].Rows)
                    {
                        bool isPriceEnabled = (bool)dataRow["IsPriceEnabled"];
                        bool isAutoEnablePrice = (bool)dataRow["IsAutoEnablePrice"];
                        instrumentCodes += (instrumentCodes != "" ? "," : "") + dataRow["Code"].ToString();

                        XmlNode instrument = doc.CreateNode(XmlNodeType.Element, "Instrument", null);
                        attribute = doc.CreateAttribute("ID");
                        attribute.Value = dataRow["ID"].ToString();
                        instrument.Attributes.Append(attribute);

                        if (isPriceEnabled != setValue)
                        {
                            attribute = doc.CreateAttribute("IsPriceEnabled");
                            attribute.Value = XmlConvert.ToString(setValue);
                            instrument.Attributes.Append(attribute);
                        }

                        if (isAutoEnablePrice != setValue)
                        {
                            attribute = doc.CreateAttribute("IsAutoEnablePrice");
                            attribute.Value = XmlConvert.ToString(setValue);
                            instrument.Attributes.Append(attribute);
                        }

                        instruments.AppendChild(instrument);
                    }

                    if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                    {
                        AppDebug.LogEvent("DealingConsole.SuspendOrResume:", token.ToString() + "\n" + instruments.OuterXml, EventLogEntryType.Information);
                    }
                    bool isOK = this.StateServer.UpdateInstrument(token, instruments);
                    if (isOK)
                    {
                        if (instrumentCodes != "")
                        {
                            string objectIDs = "Instruments";
                            string eventMessage = string.Format("SuspendOrResume: Codes={0}: IsPriceEnabled={1} and/or IsAutoEnablePrice={2}", instrumentCodes, setValue, setValue);
                            this.WriteLog(objectIDs, eventMessage, Guid.Empty, "");
                        }
                        result = 0;
                    }
                    return result;
                }
                else
                {
                    result = -2;
                }
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.SuspendOrResume" + (isResume?"Resume":"Suspend") + ":", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return result;
        }

        [WebMethod(true)]
        public int SuspendOrResumeForInstrument(bool isResume,Guid instrumentID)
        {
            int result = -1;
            try
            {
                Token token = (Token)Session["Token"];
                DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
                if (state == null || state.Instruments.Count <= 0 || state.Instruments.Keys.Count <= 0
                    || !state.Instruments.ContainsKey(instrumentID))
                {
                    result = -2;
                    return result;
                }

                //int count = state.Instruments.Keys.Count;
                //string[] instrumentIDArray = new string[count];
                //int i = 0;
                //foreach (Guid key in state.Instruments.Keys)
                //{
                //    instrumentIDArray[i] = "'" + key.ToString() + "'";
                //    i++;
                //}
                //string instrumentIDs = String.Join(",", instrumentIDArray);
                string instrumentIDs = "'" + instrumentID.ToString() + "'";
                string sql = string.Format("SELECT ID,Code,IsPriceEnabled,IsAutoEnablePrice FROM dbo.Instrument WHERE ID IN ({0}) AND (IsPriceEnabled={1} OR IsAutoEnablePrice={2})", instrumentIDs, (isResume ? 0 : 1), (isResume ? 0 : 1));
                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                {
                    string instrumentCodes = string.Empty;

                    bool setValue = (isResume ? true : false);
                    XmlDocument doc = new XmlDocument();
                    XmlNode instruments = doc.CreateNode(XmlNodeType.Element, "Instruments", null);
                    XmlAttribute attribute;
                    foreach (DataRow dataRow in dataSet.Tables[0].Rows)
                    {
                        bool isPriceEnabled = (bool)dataRow["IsPriceEnabled"];
                        bool isAutoEnablePrice = (bool)dataRow["IsAutoEnablePrice"];
                        instrumentCodes += (instrumentCodes != "" ? "," : "") + dataRow["Code"].ToString();

                        XmlNode instrument = doc.CreateNode(XmlNodeType.Element, "Instrument", null);
                        attribute = doc.CreateAttribute("ID");
                        attribute.Value = dataRow["ID"].ToString();
                        instrument.Attributes.Append(attribute);

                        if (isPriceEnabled != setValue)
                        {
                            attribute = doc.CreateAttribute("IsPriceEnabled");
                            attribute.Value = XmlConvert.ToString(setValue);
                            instrument.Attributes.Append(attribute);
                        }

                        if (isAutoEnablePrice != setValue)
                        {
                            attribute = doc.CreateAttribute("IsAutoEnablePrice");
                            attribute.Value = XmlConvert.ToString(setValue);
                            instrument.Attributes.Append(attribute);
                        }

                        instruments.AppendChild(instrument);
                    }

                    if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                    {
                        AppDebug.LogEvent("DealingConsole.SuspendOrResumeForInstrument:", token.ToString() + "\n" + instruments.OuterXml, EventLogEntryType.Information);
                    }
                    bool isOK = this.StateServer.UpdateInstrument(token, instruments);
                    if (isOK)
                    {
                        if (instrumentCodes != "")
                        {
                            string objectIDs = "Instruments";
                            string eventMessage = string.Format("SuspendOrResume: Code={0}: IsPriceEnabled={1} and/or IsAutoEnablePrice={2}", instrumentCodes, setValue, setValue);
                            this.WriteLog(objectIDs, eventMessage, Guid.Empty, "");
                        }
                        result = 0;
                    }
                    return result;
                }
                else
                {
                    result = -2;
                }
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.SuspendOrResumeForInstrument" + (isResume ? "Resume" : "Suspend") + ":", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return result;
        }

        #region OrderTypeMask.LMT

        [WebMethod(true)]
        public int MassAllowLMT(bool allow)
        {
            int result = -1; 
            Token token = (Token)Session["Token"];
            DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
            if (state == null || state.Instruments.Count <= 0 || state.Instruments.Keys.Count <= 0)
            {
                result = -2;
                return result;
            }

            int count = state.Instruments.Keys.Count;
            string[] instrumentIDArray = new string[count];
            int i = 0;
            foreach (Guid key in state.Instruments.Keys)
            {
                instrumentIDArray[i] = "'" + key.ToString() + "'";
                i++;
            }
            string instrumentIDs = String.Join(",", instrumentIDArray);
            return this.AllowLMTProcess(token, allow, instrumentIDs);
        }

        [WebMethod(true)]
        public int AllowLMT(bool allow, Guid instrumentID)
        {
            int result = -1;
            Token token = (Token)Session["Token"];
            DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
            if (state == null || state.Instruments.Count <= 0 || state.Instruments.Keys.Count <= 0
                || !state.Instruments.ContainsKey(instrumentID))
            {
                result = -2;
                return result;
            }
            string instrumentIDs = "'" + instrumentID.ToString() + "'";
            return this.AllowLMTProcess(token, allow, instrumentIDs);
        }

        private int AllowLMTProcess(Token token, bool allow, string instrumentIDs)
        {
            int result = -1;
            try
            {
                string sql = string.Format(@"SELECT ID,
	                Code, 
	                OldOrderTypeMask = dbo.FV_GetOrderTypeMask1( 
		                CAST( ( OrderTypeMask & POWER(2,0) ) AS BIT ), 
		                CAST( ( OrderTypeMask & POWER(2,1) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,2) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,3) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,4) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,5) ) AS BIT ),
		                1
		                ),
		           NewOrderTypeMask = dbo.FV_GetOrderTypeMask1( 
		                CAST( ( OrderTypeMask & POWER(2,0) ) AS BIT ), 
		                {0},
		                CAST( ( OrderTypeMask & POWER(2,2) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,3) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,4) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,5) ) AS BIT ),
		                1
		                )
                FROM dbo.Instrument i
                WHERE dbo.FV_GetOrderTypeMask1( 
		                CAST( ( OrderTypeMask & POWER(2,0) ) AS BIT ), 
		                CAST( ( OrderTypeMask & POWER(2,1) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,2) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,3) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,4) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,5) ) AS BIT ),
		                1
		                )<>dbo.FV_GetOrderTypeMask1( 
		                CAST( ( OrderTypeMask & POWER(2,0) ) AS BIT ), 
		                {0},
		                CAST( ( OrderTypeMask & POWER(2,2) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,3) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,4) ) AS BIT ),
		                CAST( ( OrderTypeMask & POWER(2,5) ) AS BIT ),
		                1
		                )
                    AND ID IN ({1})", (allow ? 1 : 0),instrumentIDs);

                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                {
                    string instrumentCodes = string.Empty;

                    XmlDocument doc = new XmlDocument();
                    XmlNode instruments = doc.CreateNode(XmlNodeType.Element, "Instruments", null);
                    XmlAttribute attribute;
                    foreach (DataRow dataRow in dataSet.Tables[0].Rows)
                    {
                        int oldOrderTypeMask = (int)dataRow["OldOrderTypeMask"];
                        int newOrderTypeMask = (int)dataRow["NewOrderTypeMask"];
                        instrumentCodes += (instrumentCodes != "" ? "," : "") + dataRow["Code"].ToString();

                        XmlNode instrument = doc.CreateNode(XmlNodeType.Element, "Instrument", null);
                        attribute = doc.CreateAttribute("ID");
                        attribute.Value = dataRow["ID"].ToString();
                        instrument.Attributes.Append(attribute);

                        if (oldOrderTypeMask != newOrderTypeMask)
                        {
                            attribute = doc.CreateAttribute("OrderTypeMask");
                            attribute.Value = XmlConvert.ToString(newOrderTypeMask);
                            instrument.Attributes.Append(attribute);
                        }

                        instruments.AppendChild(instrument);
                    }

                    if (Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["IsDebug"]))
                    {
                        AppDebug.LogEvent("DealingConsole.AllowLMT:", token.ToString() + "\n" + instruments.OuterXml, EventLogEntryType.Information);
                    }
                    bool isOK = this.StateServer.UpdateInstrument(token, instruments);
                    if (isOK)
                    {
                        if (instrumentCodes != "")
                        {
                            string objectIDs = "Instruments";
                            string eventMessage = string.Format("AllowLMT: Code={0}: Allow={1}", instrumentCodes, allow);
                            this.WriteLog(objectIDs, eventMessage, Guid.Empty, "");
                        }
                        result = 0;
                    }
                    return result;
                }
                else
                {
                    result = -2;
                }
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.AllowLMT" + (allow ? "Allow" : "Reject") + ":", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return result;
        }

        #endregion OrderTypeMask.LMT

        //更新所有Instrument的IsAutoFill=false
        [WebMethod(true)]
        public int UpdateInstrumentForAutoToManual()
        {
            int result = -1;
            try
            {
                Token token = (Token)Session["Token"];
                DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
                if (state == null || state.Instruments.Count <= 0 || state.Instruments.Keys.Count <= 0)
                {
                    result = -2;
                    return result;
                }

                int count = state.Instruments.Keys.Count;
                string[] instrumentIDArray = new string[count];
                int i = 0;
                foreach (Guid key in state.Instruments.Keys)
                {
                    instrumentIDArray[i] = "'" + key.ToString() + "'";
                    i++;
                }
                string instrumentIDs = String.Join(",", instrumentIDArray);

                string sql = string.Format("SELECT ID,Code FROM dbo.Instrument WHERE ID IN ({0}) AND IsAutoFill={1}",instrumentIDs,1);
                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                {
                    string instrumentCodes = string.Empty;

                    XmlDocument doc = new XmlDocument();
                    XmlNode instruments = doc.CreateNode(XmlNodeType.Element, "Instruments", null);
                    XmlAttribute attribute;
                    foreach (DataRow dataRow in dataSet.Tables[0].Rows)
                    {
                        instrumentCodes += (instrumentCodes != "" ? "," : "") + dataRow["Code"].ToString();

                        XmlNode instrument = doc.CreateNode(XmlNodeType.Element, "Instrument", null);
                        attribute = doc.CreateAttribute("ID");
                        attribute.Value = dataRow["ID"].ToString();
                        instrument.Attributes.Append(attribute);

                        attribute = doc.CreateAttribute("IsAutoFill");
                        attribute.Value = XmlConvert.ToString(false);
                        instrument.Attributes.Append(attribute);

                        //attribute = doc.CreateAttribute("AutoDQMaxLot");
                        //attribute.Value = "0.0";
                        //instrument.Attributes.Append(attribute);

                        //attribute = doc.CreateAttribute("AutoLmtMktMaxLot");
                        //attribute.Value = "0.0";
                        //instrument.Attributes.Append(attribute);

                        instruments.AppendChild(instrument);
                    }

                    if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                    {
                        AppDebug.LogEvent("DealingConsole.UpdateInstrumentForAutoToManual:", token.ToString() + "\n" + instruments.OuterXml, EventLogEntryType.Information);
                    }
                    bool isOK = this.StateServer.UpdateInstrument(token, instruments);
                    if (isOK)
                    {
                        if (instrumentCodes != "")
                        {
                            string objectIDs = "Instruments";
                            string eventMessage = string.Format("ChangeAutoToManual: Codes={0}: IsAutoFill={1}", instrumentCodes, false);
                            this.WriteLog(objectIDs, eventMessage, Guid.Empty, "");
                        }
                        result = 0;
                    }
                    return result;
                }
                else {
                    result = -2;
                }
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateInstrumentForAutoToManual:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return result;
        }

        //更新单个Instrument的IsAutoFill=false
        [WebMethod(true)]
        public bool UpdateInstrumentForAutoToManual2(Guid instrumentId, string instrumentCode)
        {
            try
            {
                Token token = (Token)Session["Token"];

                XmlDocument doc = new XmlDocument();
                XmlNode instruments = doc.CreateNode(XmlNodeType.Element, "Instruments", null);
                XmlAttribute attribute;

                XmlNode instrument = doc.CreateNode(XmlNodeType.Element, "Instrument", null);
                attribute = doc.CreateAttribute("ID");
                attribute.Value = instrumentId.ToString();
                instrument.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("IsAutoFill");
                attribute.Value = XmlConvert.ToString(false);
                instrument.Attributes.Append(attribute);

                //attribute = doc.CreateAttribute("AutoDQMaxLot");
                //attribute.Value = "0.0";
                //instrument.Attributes.Append(attribute);

                //attribute = doc.CreateAttribute("AutoLmtMktMaxLot");
                //attribute.Value = "0.0";
                //instrument.Attributes.Append(attribute);

                instruments.AppendChild(instrument);

                if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                {
                    AppDebug.LogEvent("DealingConsole.UpdateInstrumentForAutoToManual2:", token.ToString() + "\n" + instruments.OuterXml, EventLogEntryType.Information);
                }

                bool isOK = this.StateServer.UpdateInstrument(token, instruments);
                if (isOK)
                {
                    string objectIDs = "Instrument";
                    string eventMessage = string.Format("Code={0}: IsAutoFill={1}", instrumentCode, false);
                    this.WriteLog(objectIDs, eventMessage, instrumentId, instrumentCode);
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateInstrumentForAutoToManual2:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }
        #endregion UpdateInstrumentParameter

        #region UpdateQuotePolicyDetail
        [WebMethod(true)]
        public bool UpdateQuotePolicy(string quotePolicyID, string quotePolicyCode, string instrumentID, string instrumentCode, string Name, string Value, string objectIDs, string eventMessage, out int errorLine)
        {
            errorLine = -1;
            try
            {
                Token token = (Token)Session["Token"];

                XmlDocument doc = new XmlDocument();
                XmlNode quotePolicy = doc.CreateNode(XmlNodeType.Element, "QuotePolicyDetail", null);
                XmlAttribute attribute = doc.CreateAttribute("QuotePolicyID");
                attribute.Value = quotePolicyID;
                quotePolicy.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("InstrumentID");
                attribute.Value = instrumentID;
                quotePolicy.Attributes.Append(attribute);

                attribute = doc.CreateAttribute(Name);
                attribute.Value = Value;
                quotePolicy.Attributes.Append(attribute);

                bool isOK = this.StateServer.UpdateQuotePolicy(token, quotePolicy, out errorLine);
                if (isOK)
                {
                    if (string.IsNullOrWhiteSpace(eventMessage))
                    {
                        eventMessage = string.Format("QP={0},Item={1}: {2}={3}", quotePolicyCode, instrumentCode, Name, Value);
                    }
                    this.WriteLog(objectIDs, eventMessage, new Guid(instrumentID), instrumentCode);
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateQuotePolicy:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        private string ReplaceSpecialChar(string str) {
	        if (str == null) return str;
	        str = str.Replace("&", "&amp;");
	        return str;
	    }

        //Not Exists IsOriginHiLo & PriceType
        [WebMethod(true)]
        public bool SendQuotePolicyParameters(string quotePolicyXmls, out int errorLine)
        {
            errorLine = -1;
            try
            {
                bool isSucceed = true;
                Token token = (Token)Session["Token"];

                string ip = this.Context.Request.UserHostAddress.ToString();
                string role = UserType.Dealer.ToString();
                string timestampString = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
                StringBuilder stringBuilder = new StringBuilder();

                XmlDocument doc = new XmlDocument();
                quotePolicyXmls = ReplaceSpecialChar(quotePolicyXmls);
                doc.LoadXml(quotePolicyXmls);
                XmlNode quotePoliciesNode = (XmlNode)doc.FirstChild;
                foreach (XmlNode quotePolicy in quotePoliciesNode.ChildNodes)
                {
                    Guid instrumentId = XmlConvert.ToGuid(quotePolicy.Attributes["InstrumentID"].Value);
                    XmlAttribute objectIDsXmlAttribute = quotePolicy.Attributes["ObjectIDs"];
                    string objectIDs = objectIDsXmlAttribute.Value;
                    quotePolicy.Attributes.Remove(objectIDsXmlAttribute);
                    XmlAttribute instrumentCodeXmlAttribute = quotePolicy.Attributes["InstrumentCode"];
                    string instrumentCode = instrumentCodeXmlAttribute.Value;
                    quotePolicy.Attributes.Remove(instrumentCodeXmlAttribute);
                    XmlAttribute eventMessageXmlAttribute = quotePolicy.Attributes["EventMessage"];
                    string eventMessage = eventMessageXmlAttribute.Value;
                    quotePolicy.Attributes.Remove(eventMessageXmlAttribute);

                    //isSucceed = this.StateServer.UpdateQuotePolicy(token, quotePolicy, out errorLine);
                    //if (isSucceed == false)
                    //{
                    //    break;
                    //}
                    //else
                    //{
                    //    this.WriteLog(objectIDs, eventMessage, instrumentId, instrumentCode);
                    //}

                    stringBuilder.Append(string.Format(@"EXEC dbo.P_SaveLog @UserID='{0}',@IP='{1}',@Role='{2}',@ObjectIDs='{3}',@Timestamp='{4}',@Event='{5}',@TransactionID='{6}',@TransactionCode='{7}';",
                        token.UserID, ip, role, objectIDs, timestampString, eventMessage, instrumentId, instrumentCode));
                    stringBuilder.AppendLine();
                }

                isSucceed = this.StateServer.UpdateQuotePolicies(token, quotePoliciesNode, out errorLine);
                if (isSucceed)
                {
                    DataAccess.UpdateDB(stringBuilder.ToString(), Service.ConnectionString);
                }
                return isSucceed;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.SendQuotePolicyParameters:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }
        #endregion UpdateQuotePolicyDetail
        
        [WebMethod(true)]
        public void SetUpdateInstrumentSettingXml(string[] instrumentIDs)
        {
            this.Session["instrumentIDs"] = instrumentIDs;
        }

        [WebMethod(true)]
        public XmlNode GetDataUpdateInstrumentSettingXml()
        {
            try
            {
                string[] instrumentIDs = (string[])this.Session["instrumentIDs"];
                this.Session["instrumentIDs"] = null;
                DataSet dataSet = UpdateInstrumentSetting(instrumentIDs);
                dataSet = SqlHelper.ChangeDateTimeModeToUnspecified(dataSet);
                string xmlString = SqlHelper.ConvertDataSetToString(dataSet, XmlWriteMode.IgnoreSchema);
                XmlDocument docSource = new XmlDocument();
                XmlDocument docTarget = new XmlDocument();
                docTarget.AppendChild(docTarget.CreateXmlDeclaration("1.0", "utf-8", null));
                if (!string.IsNullOrEmpty(xmlString))
                {
                    docSource.LoadXml(xmlString);
                    this.InitDataConvertNodeToAttribute(ref docTarget, docSource);
                }
                return docTarget.DocumentElement;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateInstrumentSettingXml:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                return null;
            }
        }

        private System.Data.DataSet UpdateInstrumentSetting(string[] instrumentIDs)
        {
            try
            {
                Token token = (Token)Session["Token"];

                XmlDocument doc = new XmlDocument();
                XmlNode instrumentSetting = doc.CreateNode(XmlNodeType.Element, "InstrumentSetting", null);
                int index = 0;
                foreach (string instrumentID in instrumentIDs)
                {
                    XmlNode instrument = doc.CreateNode(XmlNodeType.Element, "Instrument", null);
                    XmlAttribute attribute = doc.CreateAttribute("ID");
                    attribute.Value = instrumentID;
                    instrument.Attributes.Append(attribute);

                    attribute = doc.CreateAttribute("Sequence");
                    attribute.Value = index.ToString();
                    instrument.Attributes.Append(attribute);

                    instrumentSetting.AppendChild(instrument);
                    index++;
                }

                DataSet initData = this.StateServer.UpdateInstrumentSetting(token, instrumentSetting);

                DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
                state.Instruments.Clear();
                foreach (string instrumentID in instrumentIDs)
                {
                    state.Instruments.Add(new Guid(instrumentID), null);
                }

                return initData;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateInstrumentSetting:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        [WebMethod(true)]
        public TransactionError Cancel(string tranID, CancelReason cancelReason, string objectIDs, string tranCode, string[] eventMessageArray)
        {
            try
            {
                Token token = (Token)Session["Token"];
                Guid tranGuid = new Guid(tranID);

                TransactionError transactionError = this.StateServer.Cancel(token, tranGuid, cancelReason);
                if (transactionError == TransactionError.OK)
                {
                    foreach (string eventMessage in eventMessageArray)
                    {
                        this.WriteLog(objectIDs, eventMessage, new Guid(tranID), tranCode);
                    }
                }
                return transactionError;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.Cancel:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        //Added by Michael on 2005-04-06
        [WebMethod(true)]
        public iExchange.Common.TransactionError RejectCancelLmtOrder(string tranID, string accountID, string objectIDs, string tranCode, string[] eventMessageArray)
        {
            try
            {
                Token token = (Token)Session["Token"];

                Guid tranGuid = new Guid(tranID);
                Guid accountGuid = new Guid(accountID);
                TransactionError transactionError = this.StateServer.RejectCancelLmtOrder(token, tranGuid, accountGuid);
                if (transactionError == TransactionError.OK)
                {
                    foreach (string eventMessage in eventMessageArray)
                    {
                        this.WriteLog(objectIDs, eventMessage, tranGuid, tranCode);
                    }
                }
                return transactionError;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.RejectCancelLmtOrder:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        [WebMethod(true)]
        public TransactionError Execute(string tranID, string buyPrice, string sellPrice, string lot, string executedOrderID, string orderCode, string eventMessage, out XmlNode xmlNode)
        {
            try
            {
                Token token = (Token)Session["Token"];

                Guid tranGuid = new Guid(tranID);
                Guid executedOrderGuid = new Guid(executedOrderID);

                TransactionError transactionError = this.StateServer.Execute(token, tranGuid, buyPrice, sellPrice, lot, executedOrderGuid, out xmlNode);
                if (transactionError == TransactionError.OK)
                {
                    string objectIDs = "Execute";
                    this.WriteLog(objectIDs, eventMessage, executedOrderGuid, orderCode);
                }
                return transactionError;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.Execute:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        /// <summary>
        /// Added for CME
        /// </summary>
        [WebMethod(true)]
        public TransactionError Book(ref XmlNode xmlTran)
        {
            try
            {
                Token token = (Token)Session["Token"];
                XmlNode xmlAccount, xmlAffectedOrders;
                return this.StateServer.Book(token, ref xmlTran, false, out xmlAccount, out xmlAffectedOrders);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.Book:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        //Added For CME GCC Trade Cancellation (OrdStatus='H')
        [WebMethod(true)]
        public TransactionError Delete(string orderID)
        {
            try
            {
                Token token = (Token)Session["Token"];
                Guid orderGuid = new Guid(orderID);

                XmlNode affectedOrders, xmlAccount;
                return this.StateServer.Delete(token, orderGuid,false, out affectedOrders, out xmlAccount);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.Delete:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        [WebMethod(true)]
        public bool UpdateLegExecutePrice(Guid transactionId, Guid legInstrumentId, string price)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(Service.ConnectionString))
                {
                    connection.Open();
                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "dbo.Order_UpdateLegExecutePrice";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@transactionId", transactionId));
                    command.Parameters.Add(new SqlParameter("@legInstrumentId", legInstrumentId));
                    command.Parameters.Add(new SqlParameter("@price", price));
                    command.ExecuteNonQuery();
                }
                return true;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateLegExecutePrice:", exception.ToString(), EventLogEntryType.Error);
            }
            return false;
        }

        ////unused
        //[WebMethod(true)]
        //public bool UpdateOrder(string[][] orders)
        //{
        //    try
        //    {
        //        Token token = (Token)Session["Token"];

        //        XmlDocument doc = new XmlDocument();
        //        XmlNode orderNodes = doc.CreateNode(XmlNodeType.Element, "Orders", null);
        //        foreach (string[] order in orders)
        //        {
        //            XmlNode orderNode = doc.CreateNode(XmlNodeType.Element, "Order", null);
        //            XmlAttribute attribute = doc.CreateAttribute("ID");
        //            attribute.Value = order[0];
        //            orderNode.Attributes.Append(attribute);

        //            attribute = doc.CreateAttribute("HitCount");
        //            attribute.Value = order[1];
        //            orderNode.Attributes.Append(attribute);

        //            attribute = doc.CreateAttribute("BestPrice");
        //            attribute.Value = order[2];
        //            orderNode.Attributes.Append(attribute);

        //            attribute = doc.CreateAttribute("BestTime");
        //            attribute.Value = order[3];
        //            orderNode.Attributes.Append(attribute);

        //            orderNodes.AppendChild(orderNode);
        //        }

        //        return this.StateServer.UpdateOrder(token, orderNodes);
        //    }
        //    catch (Exception exception)
        //    {
        //        AppDebug.LogEvent("DealingConsole.UpdateOrder:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
        //    }
        //    return false;
        //}

        [WebMethod(true)]
        public void Answer(string quotes, string instrumentId, string instrumentCode, string eventMessages)
        {
            try
            {
                Token token = (Token)Session["Token"];

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(quotes);
                XmlNode quoteNodes = (XmlNode)doc.FirstChild;

                this.StateServer.Answer(token, (XmlNode)quoteNodes);

                string objectIDs = "QuoteReply";
                this.WriteLog(objectIDs, eventMessages, new Guid(instrumentId), instrumentCode);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.Answer:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
        }

        [WebMethod(true)]
        public bool ChangePassword([System.Xml.Serialization.XmlElementAttribute(DataType = "base64Binary")] System.Byte[] oldPassword, [System.Xml.Serialization.XmlElementAttribute(DataType = "base64Binary")] System.Byte[] newPassword)
        {
            try
            {
                Token token = (Token)Session["Token"];

                return this.StateServer.ChangePassword(token, oldPassword, newPassword);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.ChangePassword:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        [WebMethod(false)]
        public string GetSystemTime()
        {
            try
            {
                return DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetSystemTime:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        [WebMethod(false)]
        public XmlNode GetAccount(string id)
        {
            XmlNode xmlNode = null;

            try
            {
                DealingConsoleServer dealingConsoleServer = (DealingConsoleServer)Application["DealingConsoleServer"];
                Account account = dealingConsoleServer.GetAccount(new Guid(id),true);
                if (account != null)
                    xmlNode = account.ToXmlNode();
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetAccount:", exception.ToString(), EventLogEntryType.Error);
            }

            return xmlNode;
        }

        [WebMethod(false)]
        public XmlNode GetCustomer(string id)
        {
            XmlNode xmlNode = null;

            try
            {
                DealingConsoleServer dealingConsoleServer = (DealingConsoleServer)Application["DealingConsoleServer"];
                Customer customer = dealingConsoleServer.GetCustomer(new Guid(id));
                if (customer != null)
                    xmlNode = customer.ToXmlNode();
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetCustomer:", exception.ToString(), EventLogEntryType.Error);
            }

            return xmlNode;
        }

        [WebMethod(true)]
        public XmlNode GetInstrumentForSetting()
        {
            try
            {
                Token token = (Token)Session["Token"];
#if (PERMISSION)
            XmlNode instrumentNode = this.GetPermissionItems(token);

            string sqlString = "dbo.P_GetVisualInstruments";
            SqlCommand cmd = new SqlCommand(sqlString, new SqlConnection(ConnectionString));
            try
            {
                cmd.Connection.Open();
                SqlDataReader myReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (myReader.Read())
                {
                    Guid id = myReader.GetGuid(0);
                    string code = myReader.GetString(1);
                    string originCode = myReader.GetString(2);
                    XmlNode itemNode = instrumentNode.SelectSingleNode(".//Instrument[@ID = '" + id.ToString() + "']");
                    if (itemNode != null)
                    {
                        ((XmlElement)itemNode).SetAttribute("Code", code);
                        ((XmlElement)itemNode).SetAttribute("OriginCode", originCode);
                    }
                }

                XmlNodeList itemNodes = instrumentNode.SelectNodes(".//Instrument[not(@Code)]");
                foreach (XmlNode itemNode in itemNodes)
                {
                    itemNode.ParentNode.RemoveChild(itemNode);
                }
            }
            catch (Exception e)
            {
                string a = e.ToString();
                return null;
            }
            finally
            {
                if (cmd.Connection.State == ConnectionState.Open)
                    cmd.Connection.Close();
            }
            return instrumentNode;
#else

                DataSet dataSet = this.StateServer.GetInstrumentForSetting(token);
                if (dataSet == null) return null;

                XmlDocument doc = new XmlDocument();
                XmlNode xmlNodeTop = doc.CreateNode(XmlNodeType.Element, "Instruments", null);
                DataTable table = dataSet.Tables[0];
                DataRowCollection rows = table.Rows;
                foreach (DataRow row in rows)
                {
                    XmlNode xmlNode = doc.CreateNode(XmlNodeType.Element, "Instrument", null);
                    ((XmlElement)xmlNode).SetAttribute("ID", ((Guid)row["ID"]).ToString());
                    ((XmlElement)xmlNode).SetAttribute("Code", (string)row["Code"]);
                    ((XmlElement)xmlNode).SetAttribute("OriginCode", (string)row["OriginCode"]);                    
                    xmlNodeTop.AppendChild(xmlNode);
                }
                return xmlNodeTop;
#endif
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetInstrumentForSetting:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                //throw exception;
            }
            return null;
        }

        [WebMethod(true)]
        public bool UpdateEnquiryOutTime(int enquiryOutTime)
        {
            try
            {
                DealingConsoleServer dealingConsoleServer = (DealingConsoleServer)this.Context.Application["DealingConsoleServer"];
                bool isOK = dealingConsoleServer.UpdateEnquiryOutTime(enquiryOutTime);
                if (isOK)
                {
                    string objectIDs = "EnquiryOutTime";
                    string eventMessage = string.Format("EnquiryOutTime={0}", enquiryOutTime);
                    this.WriteLog(objectIDs, eventMessage, Guid.Empty, "");
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateEnquiryOutTime:", exception.ToString(), EventLogEntryType.Error);
            }
            return false;
        }

        [WebMethod(true)]
        public DataSet GetUserListForCopyFrom()
        {
            try
            {
                Token token = (Token)Session["Token"];
                DealingConsoleServer dealingConsoleServer = (DealingConsoleServer)this.Context.Application["DealingConsoleServer"];
                return dealingConsoleServer.GetUserListForCopyFrom(token);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetUserListForCopyFrom:", exception.ToString(), EventLogEntryType.Error);
            }
            return null;
        }

        [WebMethod(true)]
        public string GetSettingForCopyFrom(string key, Guid fromUserId)
        {
            try
            {
                string output = "";
                Token token = (Token)Session["Token"];
                DealingConsoleServer dealingConsoleServer = (DealingConsoleServer)this.Context.Application["DealingConsoleServer"];
                bool bOk = dealingConsoleServer.GetSettingForCopyFrom(token, key, fromUserId, out output);
                return output;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetSettingForCopyFrom:", exception.ToString(), EventLogEntryType.Error);
            }
            return "";
        }

        [WebMethod(true)]
        public string LoadSystemParameters()
        {
            try
            {
                string sParam = "";
                Token token = (Token)Session["Token"];
                DealingConsoleServer dealingConsoleServer = (DealingConsoleServer)this.Context.Application["DealingConsoleServer"];
                bool bOk = dealingConsoleServer.GetSystemParameter(token, out sParam);
                return sParam;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.LoadSystemParameters:", exception.ToString(), EventLogEntryType.Error);
            }
            return "";
        }

        [WebMethod(true)]
        public bool UpdateSystemParameters(string sParam)
        {
            try
            {
                Token token = (Token)Session["Token"];
                DealingConsoleServer dealingConsoleServer = (DealingConsoleServer)this.Context.Application["DealingConsoleServer"];

                AppDebug.LogEvent("DealingConsole.UpdateSystemParameters:", token.ToString() + "\n" + sParam, EventLogEntryType.Information);

                return dealingConsoleServer.SetSystemParameter(token, sParam);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateSystemParameters:", string.Format("ParameterXml={0}\n Exception={1}", sParam, exception), EventLogEntryType.Information);
                return false;
            }
        }

        [WebMethod(true)]
        public bool UpdateSystemParameters3(string parameters, string objectID)
        {
            try
            {
                Token token = (Token)Session["Token"];
                string sql = string.Format("Exec dbo.P_SetSettings2 '{0}','{1}','{2}','{3}'", "{FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF}", (Int32)token.AppType, objectID, parameters);
                return DataAccess.UpdateDB(sql, ConnectionString);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateSystemParameters3:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        [WebMethod(true)]
        public bool UpdateSystemParameters2(string parameters, string objectID)
        {
            try
            {
                Token token = (Token)Session["Token"];
                string sql = string.Format("Exec dbo.P_SetSettings2 '{0}','{1}','{2}','{3}'", token.UserID, (Int32)token.AppType, objectID, parameters);
                return DataAccess.UpdateDB(sql, ConnectionString);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateSystemParameters2:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        [WebMethod(true)]
        public bool DiscardTaskCountTimerTimeoutWriteLog(string InstrumentID, string eventMessage)
        {
            try
            {
                this.WriteLog("OutOfRangeReject", eventMessage, new Guid(InstrumentID),"");
                return true;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.DiscardTaskCountTimerTimeoutWriteLog:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        [WebMethod(true)]
        public bool DiscardQuotation(string InstrumentID, string eventMessage)
        {
            try
            {
                Token token = (Token)Session["Token"];
                this.WriteLog("OutOfRangeReject", eventMessage, new Guid(InstrumentID),"");
                return this.StateServer.DiscardQuotation(token, new Guid(InstrumentID));
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.DiscardQuotation:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        [WebMethod(true)]
        public DataSet GetExecutedOrderByInstrument(string instrumentID, int orderType, string fromDate, string toDate, string accountGroupId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(accountGroupId))
                {
                    accountGroupId = Guid.Empty.ToString();
                }
                Token token = (Token)Session["Token"];
                string sql = string.Format("exec dbo.P_GetExecutedOrderByInstrument '{0}','{1}',{2},'{3}','{4}','{5}'", token.UserID, instrumentID, orderType, fromDate, toDate,accountGroupId);

                SqlConnection sqlConnection = new SqlConnection(ConnectionString);
                SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
                sqlCommand.CommandTimeout = 18000;
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
                sqlConnection.Open();

                DataSet dataSet = new DataSet();
                sqlDataAdapter.SelectCommand = sqlCommand;
                sqlDataAdapter.Fill(dataSet);
                sqlConnection.Close();

                return dataSet;
            }
            catch (Exception e)
            {
                AppDebug.LogEvent("DealingConsole.GetExecutedOrderByInstrument:", e.ToString(), EventLogEntryType.Error);
                return null;
            }
        }

        [WebMethod(true)]
        public DataSet GetCancelledOrderByInstrument(string instrumentID, int orderType, string fromDate, string toDate,string accountGroupId)
        {
            try
            {
                Token token = (Token)Session["Token"];
                if (string.IsNullOrWhiteSpace(accountGroupId))
                {
                    accountGroupId = Guid.Empty.ToString();
                }
                string sql = string.Format("exec dbo.P_GetCancelledOrderByInstrument '{0}','{1}',{2}, '{3}','{4}','{5}'", token.UserID, instrumentID, orderType, fromDate, toDate, accountGroupId);

                using (SqlConnection sqlConnection = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
                    sqlCommand.CommandTimeout = 18000;
                    SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
                    sqlConnection.Open();

                    DataSet dataSet = new DataSet();
                    sqlDataAdapter.SelectCommand = sqlCommand;
                    sqlDataAdapter.Fill(dataSet);
                    sqlConnection.Close();

                    return dataSet;
                }
            }
            catch (Exception e)
            {
                AppDebug.LogEvent("DealingConsole.GetCancelledOrderByInstrument:", e.ToString(), EventLogEntryType.Error);
                return null;
            }
        }

        //		private string ConvertArrayToString(string[] closeOrderIDs)
        //		{
        //			XmlDocument doc = new XmlDocument();
        //			XmlNode closeOrders = doc.CreateNode(XmlNodeType.Element, "CloseOrderIDs", null);
        //			foreach(string closeOrderID in closeOrderIDs)
        //			{
        //				XmlNode closeOrder = doc.CreateNode(XmlNodeType.Element, "CloseOrderID", null);
        //				XmlAttribute attribute = doc.CreateAttribute("ID");
        //				attribute.Value = closeOrderID;
        //				closeOrder.Attributes.Append(attribute);
        //
        //				closeOrders.AppendChild(closeOrder);
        //			}
        //			return closeOrders.OuterXml;
        //		}

        [WebMethod(false)]
        public DataSet GetAverageOpenPriceByCloseOrderID(string closeOrderIDs)
        {
            SqlConnection sqlConnection = new SqlConnection(ConnectionString);
            try
            {
                DataSet dataSet = new DataSet();
                //string closeOrderIDXml=ConvertArrayToString(closeOrderIDs);
                SqlCommand sqlCommand = new SqlCommand("dbo.P_GetAverageOpenPriceByCloseOrderID", sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParameter = sqlCommand.Parameters.Add("@closeOrderIDXml", SqlDbType.NText);
                sqlParameter.Value = closeOrderIDs;

                sqlConnection.Open();
                SqlDataAdapter dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = sqlCommand;
                dataAdapter.Fill(dataSet);
                sqlConnection.Close();
                return dataSet;
            }
            catch (Exception e)
            {
                AppDebug.LogEvent("DealingConsole.GetAverageOpenPriceByCloseOrderID:", e.ToString(), EventLogEntryType.Error);
                return null;
            }
            finally
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                }
            }
        }

        [WebMethod(false)]
        public DataSet GetRelationsByCloseOrderID(string closeOrderIDs)
        {
            try
            {
                DataSet dataSet = new DataSet();
                //string closeOrderIDXml=ConvertArrayToString(closeOrderIDs);
                using (SqlConnection sqlConnection = new SqlConnection(ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand("dbo.P_GetRelationsByCloseOrderID", sqlConnection);
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    SqlParameter sqlParameter = sqlCommand.Parameters.Add("@closeOrderIDXml", SqlDbType.NText);
                    sqlParameter.Value = closeOrderIDs;

                    sqlConnection.Open();
                    SqlDataAdapter dataAdapter = new SqlDataAdapter();
                    dataAdapter.SelectCommand = sqlCommand;
                    dataAdapter.Fill(dataSet);
                    sqlConnection.Close();
                    return dataSet;
                }
            }
            catch (Exception e)
            {
                AppDebug.LogEvent("DealingConsole.GetRelationsByCloseOrderID:", e.ToString(), EventLogEntryType.Error);
                return null;
            }
        }

        //Added by Michael on 2008-06-28
        private DataSet Merge(DataSet dataSet, Guid[] orderIDs)
        {
            if (dataSet == null) return dataSet;

            try
            {
                XmlNode ordersData = this.StateServer.GetOrdersForGetAutoPrice(orderIDs);

                DataTable orderTable = dataSet.Tables["OpenInstrument"];
                orderTable.Columns.Add("AutoStopPrice", typeof(string));
                orderTable.Columns.Add("AutoLimitPrice", typeof(string));
                orderTable.PrimaryKey = new DataColumn[] { orderTable.Columns["ID"] };
                DataRowCollection orderRows = orderTable.Rows;

                if (ordersData != null)
                {
                    foreach (XmlElement order in ordersData.ChildNodes)
                    {
                        Guid orderID = XmlConvert.ToGuid(order.Attributes["ID"].Value);
                        DataRow orderRow = orderRows.Find(new object[] { orderID });
                        if (orderRow != null)
                        {
                            orderRow["AutoStopPrice"] = order.Attributes["AutoStopPrice"].Value;
                            orderRow["AutoLimitPrice"] = order.Attributes["AutoLimitPrice"].Value;
                        }
                    }
                }
                return dataSet;
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.Merge:", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw ex;
            }
        }

        [WebMethod(false)]
        public string GetOpenInstrumentData(string InstrumentID, string[] blotterCodeSelecteds)
        {
            SqlConnection conn = new SqlConnection(ConnectionString);
            try
            {
                string sqlStringAccount = string.Empty;
                if (blotterCodeSelecteds == null)
                {
                    sqlStringAccount = string.Format("exec dbo.P_DealingOpenInterest '{0}'", InstrumentID);
                }
                else
                {
                    string blotterCodeSelecteds2 = iExchange.Common.XmlTransform.Transform(blotterCodeSelecteds, "Blotters", "Blotter", "Code");
                    sqlStringAccount = string.Format("exec dbo.P_DealingOpenInterest '{0}','{1}'", InstrumentID, blotterCodeSelecteds2);
                }
                
                SqlCommand dataCMD = new SqlCommand(sqlStringAccount, conn);
                dataCMD.CommandTimeout = 30;
                SqlDataAdapter da = new SqlDataAdapter();
                conn.Open();
                DataSet ds = new DataSet();
                da.SelectCommand = dataCMD;
                da.Fill(ds, "OpenInstrument");


                DataRowCollection rows;
                rows = ds.Tables["OpenInstrument"].Rows;
                Guid[] orderIDs = new Guid[rows.Count];
                int i = 0;
                foreach (DataRow orderRow in rows)
                {
                    orderIDs[i++] = (Guid)orderRow["ID"];
                }

                //Guid[] accountIDs = null;
                /*
                if (Session["AccountIDs"] != null)
                {
                    accountIDs = (Guid[])Session["AccountIDs"];
                }
                */
                if (orderIDs.Length != 0)
                {
                    ds = this.Merge(ds, orderIDs);
                }
                return ds.GetXml();
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetOpenInstrumentData:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }
            return null;
        }

        //private DataTable GetOpenInterestSummaryInstrumentInfo(Guid[] instrumentIDs)
        //{
        //    //Get Instrument Info
        //    string sql = string.Empty;
        //    foreach (Guid instrumentId in instrumentIDs)
        //    {
        //        if (sql == string.Empty)
        //        {
        //            sql += "'" + instrumentId.ToString() + "'";
        //        }
        //        else
        //        {
        //            sql += ",'" + instrumentId.ToString() + "'";
        //        }
        //    }
        //    sql = "(" + sql + ")";
        //    sql = "SELECT ID,Code,OriginCode FROM dbo.Instrument WHERE ID IN " + sql;
        //    DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
        //    if (dataSet != null && dataSet.Tables.Count > 0)
        //    {
        //        DataTable instrumentDataTable = dataSet.Tables[0];
        //        instrumentDataTable.PrimaryKey = new DataColumn[] { instrumentDataTable.Columns["ID"] };
        //        return instrumentDataTable;
        //    }
        //    return null;
        //}

        private void FixBlotterCodeSelecteds(ref string[] blotterCodeSelecteds)
        {
            if (blotterCodeSelecteds != null)
            {
                for (int i = 0, length = blotterCodeSelecteds.Length; i < length; i++)
                {
                    if (blotterCodeSelecteds[i] == "")
                    {
                        blotterCodeSelecteds[i] = null;
                        break;
                    }
                }
            }
        }

        //abeyance
        //#region Total Buy / Sell Lot
        //[WebMethod(true)]
        //public string GetInstrumentTotalBuySellLot(string[] instrumentIDs)
        //{
        //    SqlConnection sqlConnection = new SqlConnection(ConnectionString);
        //    try
        //    {                
        //        Token token = (Token)Session["Token"];
        //        string sql = string.Empty;                
        //        string instrumentIDXml = null;
        //        if (instrumentIDs != null)
        //        {
        //            instrumentIDXml = iExchange.Common.XmlTransform.Transform(instrumentIDs, "Instruments", "Instrument", "Id");
        //        }
        //        if (!string.IsNullOrEmpty(instrumentIDXml))
        //        {
        //            sql = string.Format(@"SELECT * FROM FT_GetInstrumentTotalBuySellLot('{0}','{1}','{2}',{3})", instrumentIDXml, token.UserID, "Access1", 0);
        //        }
        //        else
        //        {
        //            sql = string.Format(@"SELECT * FROM FT_GetInstrumentTotalBuySellLot(NULL,'{1}','{2}',{3})", token.UserID, "Access1", 0);
        //        }
        //        DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
        //        return SqlHelper.ConvertDataSetToString(dataSet, XmlWriteMode.IgnoreSchema);
        //    }
        //    catch (Exception exception)
        //    {
        //        AppDebug.LogEvent("DealingConsole.GetInstrumentTotalBuySellLot:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
        //    }
        //    finally
        //    {
        //        if (sqlConnection.State != ConnectionState.Closed)
        //        {
        //            sqlConnection.Close();
        //        }
        //    }
        //    return null;            
        //}

        //[WebMethod(true)]
        //public string GetQuotePolicyTotalBuySellLot(Guid instrumentID)
        //{
        //    SqlConnection sqlConnection = new SqlConnection(ConnectionString);
        //    try
        //    {
        //        Token token = (Token)Session["Token"];
        //        string sql = string.Format(@"SELECT * FROM FT_GetQuotePolicyTotalBuySellLot('{0}','{1}','{2}',{3})", instrumentID, token.UserID, "Access1",0);
        //        DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
        //        return SqlHelper.ConvertDataSetToString(dataSet, XmlWriteMode.IgnoreSchema);
        //    }
        //    catch (Exception exception)
        //    {
        //        AppDebug.LogEvent("DealingConsole.GetQuotePolicyTotalBuySellLot:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
        //    }
        //    finally
        //    {
        //        if (sqlConnection.State != ConnectionState.Closed)
        //        {
        //            sqlConnection.Close();
        //        }
        //    }
        //    return null;
        //}
        //#endregion Total Buy / Sell Lot

        [WebMethod(true)]
        public XmlNode GetOpenInterestInstrumentSummary(bool isGroupByOriginCode, string[] blotterCodeSelecteds)
        {
            this.FixBlotterCodeSelecteds(ref blotterCodeSelecteds);

            try
            {
                Token token = (Token)Session["Token"];
                XmlNode accountsNode = this.StateServer.GetOpenInterestInstrumentSummary(token, isGroupByOriginCode, blotterCodeSelecteds);
                return accountsNode;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetOpenInterestInstrumentSummary:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        [WebMethod(true)]
        public XmlNode GetOpenInterestSummary(Guid[] accountIDs, Guid[] instrumentIDs, string[] blotterCodeSelecteds)
        {
            this.FixBlotterCodeSelecteds(ref blotterCodeSelecteds);

            try
            {
                Token token = (Token)Session["Token"];
                XmlNode accountsNode = this.StateServer.GetOpenInterestSummary(token, accountIDs, instrumentIDs, blotterCodeSelecteds);
                
                //Add Attributes: GroupId, GroupCode, Account.Code
                if (accountsNode != null)
                {
                    if (accountsNode.ChildNodes.Count > 0)
                    {
                        //DataTable instrumentDataTable = null;
                        //instrumentDataTable = this.GetOpenInterestSummaryInstrumentInfo(instrumentIDs);
                        DealingConsoleServer dealingConsoleServer = (DealingConsoleServer)Application["DealingConsoleServer"];
                        XmlDocument xmlDocument = accountsNode.OwnerDocument;
                        XmlAttribute attribute;
                        foreach (XmlElement accountNode in accountsNode.ChildNodes)
                        {
                            Guid accountId = Guid.Parse(accountNode.GetAttribute("ID"));
                            Account account = dealingConsoleServer.GetAccount(accountId,false);

                            attribute = xmlDocument.CreateAttribute("Code");
                            attribute.Value = account.Code;
                            accountNode.Attributes.Append(attribute);

                            attribute = xmlDocument.CreateAttribute("GroupId");
                            attribute.Value = account.GroupID.ToString();
                            accountNode.Attributes.Append(attribute);

                            attribute = xmlDocument.CreateAttribute("GroupCode");
                            attribute.Value = account.GroupCode;
                            accountNode.Attributes.Append(attribute);

                            ////Instrument
                            //if (accountNode.ChildNodes.Count > 0)
                            //{
                            //    XmlNode instrumentsNode = accountNode.ChildNodes.Item(0);
                            //    foreach (XmlElement instrumentNode in instrumentsNode.ChildNodes)
                            //    {
                            //        Guid instrumentId = Guid.Parse(instrumentNode.GetAttribute("ID"));
                            //        DataRow instrumentDataRow = instrumentDataTable.Rows.Find(instrumentId);
                            //        attribute = xmlDocument.CreateAttribute("Code");
                            //        attribute.Value = (string)instrumentDataRow["Code"];
                            //        instrumentNode.Attributes.Append(attribute);

                            //        attribute = xmlDocument.CreateAttribute("OriginCode");
                            //        attribute.Value = (string)instrumentDataRow["OriginCode"];
                            //        instrumentNode.Attributes.Append(attribute);
                            //    }
                            //}
                        }
                    }
                }

                return accountsNode;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetOpenInterestSummary:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
            return null;
        }

        [WebMethod(true)]
        public XmlNode GetOpenInterestSummaryOrderList(Guid accountId, Guid[] instrumentIDs, string[] blotterCodeSelecteds)
        {
            this.FixBlotterCodeSelecteds(ref blotterCodeSelecteds);

            try
            {
                Token token = (Token)Session["Token"];
                return this.StateServer.GetOpenInterestSummaryOrderList(token, accountId, instrumentIDs, blotterCodeSelecteds);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetOpenInterestSummaryOrderList:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        [WebMethod(true)]
        public XmlNode GetGroupNetPosition(Guid[] accountIDs, Guid[] instrumentIDs, bool showActualQuantity, string[] blotterCodeSelecteds)
        {
            this.FixBlotterCodeSelecteds(ref blotterCodeSelecteds);

            try
            {
                Token token = (Token)Session["Token"];
                XmlNode groupNetPositionNode = this.StateServer.GetGroupNetPosition(token, "Access1", accountIDs, instrumentIDs, showActualQuantity, blotterCodeSelecteds);
                return groupNetPositionNode;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetGroupNetPosition:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        [WebMethod(true)]
        public XmlNode GetGroupNetPositionInstrument(Guid accountId, Guid instrumentId, bool showActualQuantity, string[] blotterCodeSelecteds)
        {
            this.FixBlotterCodeSelecteds(ref blotterCodeSelecteds);

            try
            {
                Token token = (Token)Session["Token"];
                XmlNode groupNetPositionNode = this.StateServer.GetGroupNetPositionInstrument(token, "Access1", accountId, instrumentId, showActualQuantity, blotterCodeSelecteds);
                return groupNetPositionNode;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetGroupNetPositionInstrument:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        [WebMethod(true)]
        public bool HasAccountPermission(Guid accountId)
        {
            try
            {
                Token token = (Token)Session["Token"];
                string sql = string.Format(@"SELECT RecordCount=COUNT(*)
		            FROM [dbo].[FT_GetAccountsByUser]('{0}','{1}',{2})
                    WHERE AccountID = '{3}'", token.UserID, "Access1", 0, accountId);
                int recordCount = (int)DataAccess.ExecuteScalar(sql, ConnectionString);
                return recordCount > 0;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.HasAccountPermission:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        //dbo.P_RptOpenInterestSummary
        //@instrumentId UNIQUEIDENTIFIER=NULL,
        //@instrumentOriginCode NVARCHAR(20)=NULL,
        //@queryTradeDay DATETIME,
        //@xmlAccounts NTEXT=NULL	

        ////Added by Michael on 2003-12-05
        //[WebMethod(true)]
        //public string CheckOpenOrderWetherLiquidated(string orderID)
        //{
        //    string willBeCancelTransactionIDs = string.Empty;
        //    try
        //    {
        //        SqlConnection sqlConnection = new SqlConnection(ConnectionString);

        //        SqlCommand sqlCommand = new SqlCommand("dbo.P_CheckOpenOrderWetherLiquidated", sqlConnection);
        //        sqlCommand.CommandType = CommandType.StoredProcedure;
        //        SqlParameter sqlParameter = sqlCommand.Parameters.Add("@OrderID", SqlDbType.UniqueIdentifier);
        //        sqlParameter.Value = new Guid(orderID);

        //        //sqlParameter = sqlCommand.Parameters.Add("@Return_Value",SqlDbType.Int);
        //        //sqlParameter.Direction = ParameterDirection.ReturnValue;

        //        sqlConnection.Open();
        //        SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
        //        //sqlCommand.ExecuteNonQuery();
        //        DataSet dataSet = new DataSet();
        //        sqlDataAdapter.Fill(dataSet);
        //        if (dataSet.Tables.Count > 0)
        //        {
        //            foreach (DataRow currentRow in dataSet.Tables[0].Rows)
        //            {
        //                willBeCancelTransactionIDs += "{" + currentRow["TransactionID"].ToString().ToLower() + "}";
        //            }
        //        }

        //        //Int32 return_Value = (Int32)sqlCommand.Parameters["@Return_Value"].Value;

        //        sqlConnection.Close();

        //        return willBeCancelTransactionIDs;
        //    }
        //    catch (Exception e)
        //    {
        //        AppDebug.LogEvent("DealingConsole.CheckOpenOrderWetherLiquidated:", e.ToString(), EventLogEntryType.Error);
        //        return string.Empty;
        //    }
        //}

        //Modified by Michael on 2008-05-26
        /*
        [WebMethod(true)]
        public bool SetActiveSource(string quotationSource)
        {
            Token token = (Token)this.Session["Token"];
            StateServer.Service stateServer = (StateServer.Service)Application["StateServer"];
            return stateServer.SetActiveSource(token, quotationSource);
        }
        */

        [WebMethod(true)]
        public string GetBlotterList()
        {
            string sql = @"SELECT ID,Code FROM dbo.Blotter ORDER BY Code";
            DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
            return SqlHelper.ConvertDataSetToString(dataSet, XmlWriteMode.IgnoreSchema);
        }
                
        #region CustomerPolicyManagement
        [WebMethod(true)]
        public string GetAccountGroupByPolicyId(Guid quotePolicyId, Guid? dealingPolicyId, Guid? accountGroupId, bool isSelectBlackListAccount, int queryType)
        {
            SqlConnection sqlConnection = new SqlConnection(ConnectionString);
            try
            {
                Token token = (Token)Session["Token"];
                SqlCommand sqlCommand = new SqlCommand("P_GetAccountGroupByPolicyId", sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParameter = sqlCommand.Parameters.Add("@employeeId", SqlDbType.UniqueIdentifier);
                sqlParameter.Value = token.UserID;
                sqlParameter = sqlCommand.Parameters.Add("@permissionName", SqlDbType.NVarChar, 10);
                sqlParameter.Value = "Access1";
                sqlParameter = sqlCommand.Parameters.Add("@quotePolicyId", SqlDbType.UniqueIdentifier);
                if (quotePolicyId != Guid.Empty)
                {
                    sqlParameter.Value = quotePolicyId;
                }
                else
                {
                    sqlParameter.Value = DBNull.Value;
                }
                sqlParameter = sqlCommand.Parameters.Add("@dealingPolicyId", SqlDbType.UniqueIdentifier);
                if (dealingPolicyId != null)
                {
                    sqlParameter.Value = dealingPolicyId.Value;
                }
                else
                {
                    sqlParameter.Value = DBNull.Value;
                }
                sqlParameter = sqlCommand.Parameters.Add("@accountGroupId", SqlDbType.UniqueIdentifier);
                if (accountGroupId != null)
                {
                    sqlParameter.Value = accountGroupId.Value;
                }
                else
                {
                    sqlParameter.Value = DBNull.Value;
                }
                sqlParameter = sqlCommand.Parameters.Add("@accountType", SqlDbType.Int);
                if (isSelectBlackListAccount)
                {
                    sqlParameter.Value = 4;
                }
                else
                {
                    sqlParameter.Value = DBNull.Value;
                }
                sqlParameter = sqlCommand.Parameters.Add("@queryType", SqlDbType.Int);
                sqlParameter.Value = queryType;

                sqlConnection.Open();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandTimeout = 180;
                SqlDataAdapter dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = sqlCommand;
                DataSet dataSet = new DataSet();
                dataAdapter.Fill(dataSet,"Group");
                return SqlHelper.ConvertDataSetToString(dataSet, XmlWriteMode.IgnoreSchema);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetAccountGroupByPolicyId:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            finally {
                if (sqlConnection.State != ConnectionState.Closed)
                {
                    sqlConnection.Close();
                }
            }
            return null;
        }

        [WebMethod(true)]
        public string GetPolicyList(Guid groupId, Guid quotePolicyId, Guid? dealingPolicyId, bool isSelectBlackListAccount, int queryType)
        {
            SqlConnection sqlConnection = new SqlConnection(ConnectionString);
            try
            {
                Token token = (Token)Session["Token"];
                SqlCommand sqlCommand = new SqlCommand("P_GetPolicyList", sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParameter = sqlCommand.Parameters.Add("@employeeId", SqlDbType.UniqueIdentifier);
                sqlParameter.Value = token.UserID;
                sqlParameter = sqlCommand.Parameters.Add("@permissionName", SqlDbType.NVarChar, 10);
                sqlParameter.Value = "Access1";
                sqlParameter = sqlCommand.Parameters.Add("@groupId", SqlDbType.UniqueIdentifier);
                sqlParameter.Value = groupId;
                sqlParameter = sqlCommand.Parameters.Add("@quotePolicyId", SqlDbType.UniqueIdentifier);
                if (quotePolicyId != Guid.Empty)
                {
                    sqlParameter.Value = quotePolicyId;
                }
                else
                {
                    sqlParameter.Value = DBNull.Value;
                }
                sqlParameter = sqlCommand.Parameters.Add("@dealingPolicyId", SqlDbType.UniqueIdentifier);
                if (dealingPolicyId != null)
                {
                    sqlParameter.Value = dealingPolicyId.Value;
                }
                else
                {
                    sqlParameter.Value = DBNull.Value;
                }
                sqlParameter = sqlCommand.Parameters.Add("@accountType", SqlDbType.Int);
                if (isSelectBlackListAccount)
                {
                    sqlParameter.Value = 4;
                }
                else
                {
                    sqlParameter.Value = DBNull.Value;
                }
                sqlParameter = sqlCommand.Parameters.Add("@queryType", SqlDbType.Int);
                sqlParameter.Value = queryType;

                sqlConnection.Open();
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandTimeout = 180;
                SqlDataAdapter dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = sqlCommand;
                DataSet dataSet = new DataSet();
                dataAdapter.Fill(dataSet,"Detail");
                return SqlHelper.ConvertDataSetToString(dataSet, XmlWriteMode.IgnoreSchema);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetPolicyList:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            finally
            {
                if (sqlConnection.State != ConnectionState.Closed)
                {
                    sqlConnection.Close();
                }
            }
            return null;
        }
        #endregion CustomerPolicyManagement

        //Added by Michael on 2008-05-23
        [WebMethod(true)]
        public bool SetActiveSourceInstrument(string sourceInstrumentXml, string eventMessageXml)
        {
            try
            {
                Token token = (Token)Session["Token"];

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(sourceInstrumentXml);
                XmlNode sourceInstrumentNodes = (XmlNode)doc.FirstChild;

                //Save to database
                //string sql = string.Format("dbo.P_UpdateSourceInstrument '{0}'", sourceInstrumentXml);
                //bool isUpdated = (bool) DataAccess.ExecuteScalar(sql, ConnectionString);
                //if (isUpdated)
                //{
                //SetActiveSourceIntrument & Notify other dealers

                bool isOk = this.StateServer.SetActiveSourceInstrument(token, sourceInstrumentNodes);
                if (isOk)
                {
                    XmlDocument doc2 = new XmlDocument();
                    doc2.LoadXml(eventMessageXml);
                    XmlNode eventMessagesNode = (XmlNode)doc2.FirstChild;
                    foreach (XmlNode eventMessageNode in eventMessagesNode.ChildNodes)
                    {
                        XmlAttribute objectIDsXmlAttribute = eventMessageNode.Attributes["ObjectIDs"];
                        string objectIDs = objectIDsXmlAttribute.Value;
                        XmlAttribute eventMessageXmlAttribute = eventMessageNode.Attributes["EventMessage"];
                        string eventMessage = eventMessageXmlAttribute.Value;
                        XmlAttribute transactionCodeXmlAttribute = eventMessageNode.Attributes["TransactionCode"];
                        string transactionCode = transactionCodeXmlAttribute.Value;

                        this.WriteLog(objectIDs, eventMessage, Guid.Empty, transactionCode);
                    }
                }
                return isOk;
                //}
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.SetActiveSourceInstrument:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        //Added by Michael on 2008-05-26
        [WebMethod(true)]
        public DataSet GetSourceInstrument()
        {
            try
            {
                Token token = (Token)Session["Token"];
                string sql = string.Format("SELECT * FROM dbo.FT_GetSourceInstrumentByDealer('{0}')", token.UserID);
                return DataAccess.GetData(sql, ConnectionString);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetSourceInstrument:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        [WebMethod(true)]
        public DataSet GetUnclosedOrder(Guid accountId)
        {
            try
            {
                Token token = (Token)Session["Token"];
                string sql = string.Format(@"EXEC dbo.GetUnclosedOrder '{0}'", accountId);
                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                return dataSet;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetUnclosedOrder:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        [WebMethod(true)]
        public void ResetHit(Guid[] orderIDs, string[] eventMessageArray)
        {
            try
            {
                Token token = (Token)this.Session["Token"];
                this.StateServer.ResetHit(token, orderIDs);

                string objectIDs = "ResetHit";
                int i = 0;
                foreach (string eventMessage in eventMessageArray)
                {
                    this.WriteLog(objectIDs, eventMessage, orderIDs[i], "");
                    i++;
                }
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.ResetHit:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
        }

        [WebMethod(true)]
        public TransactionError AcceptPlace(string tranID, string tranCode, string[] eventMessageArray)
        {
            try
            {
                Token token = (Token)this.Session["Token"];
                TransactionError transactionError = this.StateServer.AcceptPlace(token, new Guid(tranID));
                if (transactionError == TransactionError.OK)
                {
                    string objectIDs = "AcceptPlace";
                    foreach (string eventMessage in eventMessageArray)
                    {
                        this.WriteLog(objectIDs, eventMessage, new Guid(tranID), tranCode);
                    }
                }
                return transactionError;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.AcceptPlace:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
                throw exception;
            }
        }

        /// <returns>		
        ///		<Account ID="" Balance="" Equity="" Necessary="">
        ///			<Instrument ID="" BuyLotBalanceSum="" SellLotBalanceSum="" />
        ///		</Account>
        /// </returns>
        [WebMethod(true)]
        public XmlNode GetAcountInfo(string tranID)
        {
            try
            {
                Token token = (Token)this.Session["Token"];
                return this.StateServer.GetAcountInfo(token, new Guid(tranID));
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetAcountInfo:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        [WebMethod(true)]
        public XmlNode GetDealingPolicyDetailForDealingPolicy(string dealingPolicyID)
        {
            try
            {
                DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
                if (state == null || state.Instruments.Count <= 0 || state.Instruments.Keys.Count <= 0) return null;
                int count = state.Instruments.Keys.Count;
                string[] instrumentIDArray = new string[count];
                int i = 0;
                foreach (Guid key in state.Instruments.Keys)
                {
                    instrumentIDArray[i] = "'" + key.ToString() + "'";
                    i++;
                }
                string instrumentIDs = String.Join(",", instrumentIDArray);

                string sql = string.Format(@"SELECT dpd.[DealingPolicyID]
                    , dp.Code AS DealingPolicyCode
                    ,dpd.[InstrumentID]
                    ,i.Code AS InstrumentCode
                    ,dpd.[MaxDQLot]
                    ,dpd.[MaxOtherLot]
                    ,dpd.[DQQuoteMinLot]
                    ,dpd.[AutoDQMaxLot]
                    ,dpd.[AutoLmtMktMaxLot]
                    ,dpd.[AcceptDQVariation]
                    ,dpd.[AcceptLmtVariation]
                    ,dpd.[AcceptCloseLmtVariation]
                    ,dpd.[CancelLmtVariation]
                    ,dpd.[AutoDQDelay]
                    ,dpd.[AllowedNewTradeSides]
                    ,dpd.[AutoAcceptMaxLot]
                    ,dpd.[AutoCancelMaxLot]
                    ,dpd.[HitPriceVariationForSTP]
                FROM [dbo].[DealingPolicyDetail] dpd
                INNER JOIN DealingPolicy dp ON dp.ID = dpd.DealingPolicyID
                INNER JOIN Instrument i ON i.ID = dpd.InstrumentID
                WHERE dpd.DealingPolicyID = '{0}' 
                    AND dpd.InstrumentID IN ({1})
                ORDER BY dp.Code,i.Code", dealingPolicyID, instrumentIDs);

                try
                {
                    DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                    return this.GetDealingPolicyDetail(dataSet);
                }
                catch (System.Exception ex)
                {
                    AppDebug.LogEvent("DealingConsole.GetDealingPolicyDetailForDealingPolicy", string.Format("ConnectionString={0},SQLString={1},Exception={2}", ConnectionString, sql, ex.ToString()), System.Diagnostics.EventLogEntryType.Error);
                }
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetDealingPolicyDetailForDealingPolicy:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        private DataSet GetDealingPolicyDetailByInstrument(string instrumentID)
        {
            string sql = string.Format(@"SELECT dpd.[DealingPolicyID]
                    , dp.Code AS DealingPolicyCode
                    ,dpd.[InstrumentID]
                    ,i.Code AS InstrumentCode
                    ,dpd.[MaxDQLot]
                    ,dpd.[MaxOtherLot]
                    ,dpd.[DQQuoteMinLot]
                    ,dpd.[AutoDQMaxLot]
                    ,dpd.[AutoLmtMktMaxLot]
                    ,dpd.[AcceptDQVariation]
                    ,dpd.[AcceptLmtVariation]
                    ,dpd.[AcceptCloseLmtVariation]
                    ,dpd.[CancelLmtVariation]
                    ,dpd.[AutoDQDelay]
                    ,dpd.[AllowedNewTradeSides]
                    ,dpd.[AutoAcceptMaxLot]
                    ,dpd.[AutoCancelMaxLot]
                    ,dpd.[HitPriceVariationForSTP]
                FROM [dbo].[DealingPolicyDetail] dpd
                INNER JOIN DealingPolicy dp ON dp.ID = dpd.DealingPolicyID
                INNER JOIN Instrument i ON i.ID = dpd.InstrumentID
                WHERE dpd.InstrumentID = '{0}'
                UNION ALL
                SELECT '{1}' AS [DealingPolicyID]
                    , 'Owner: ' + i.Code AS DealingPolicyCode
                    ,i.ID AS [InstrumentID]
                    ,i.Code AS InstrumentCode
                    ,i.[MaxDQLot]
                    ,i.[MaxOtherLot]
                    ,i.[DQQuoteMinLot]
                    ,i.[AutoDQMaxLot]
                    ,i.[AutoLmtMktMaxLot]
                    ,i.[AcceptDQVariation]
                    ,i.[AcceptLmtVariation]
                    ,i.[AcceptCloseLmtVariation]
                    ,i.[CancelLmtVariation]
                    ,i.[AutoDQDelay]
                    ,i.[AllowedNewTradeSides]
                    ,i.[AutoAcceptMaxLot]
                    ,i.[AutoCancelMaxLot]
                    ,i.[HitPriceVariationForSTP]
                FROM Instrument i
                WHERE i.ID = '{0}'
                ORDER BY DealingPolicyCode,InstrumentCode", instrumentID, Guid.Empty);

            try
            {
                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                return dataSet;
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.GetDealingPolicyDetailForInstrument:", string.Format("ConnectionString={0},SQLString={1},Exception={2}", ConnectionString, sql, ex.ToString()), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        [WebMethod(false)]
        public XmlNode GetDealingPolicyDetailForInstrument(string instrumentID)
        {
            try
            {
                DataSet dataSet = this.GetDealingPolicyDetailByInstrument(instrumentID);
                return this.GetDealingPolicyDetail(dataSet);
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.GetDealingPolicyDetailForInstrument:", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        private XmlNode GetDealingPolicyDetail(DataSet dataSet)
        {
            if (dataSet == null
                || dataSet.Tables.Count <= 0
                || dataSet.Tables[0].Rows.Count <= 0)
            {
                return null;
            }

            XmlDocument doc = new XmlDocument();
            XmlNode dealingPolicyDetails = doc.CreateNode(XmlNodeType.Element, "DealingPolicyDetails", null);
            XmlAttribute attribute;
            foreach (DataRow dataRow in dataSet.Tables[0].Rows)
            {
                XmlNode dealingPolicyDetail = doc.CreateNode(XmlNodeType.Element, "DealingPolicyDetail", null);
                attribute = doc.CreateAttribute("DealingPolicyID");
                attribute.Value = dataRow["DealingPolicyID"].ToString();
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("DealingPolicyCode");
                attribute.Value = (string)dataRow["DealingPolicyCode"];
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("InstrumentID");
                attribute.Value = dataRow["InstrumentID"].ToString();
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("InstrumentCode");
                attribute.Value = (string)dataRow["InstrumentCode"];
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("MaxDQLot");
                attribute.Value = XmlConvert.ToString((decimal)dataRow["MaxDQLot"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("MaxOtherLot");
                attribute.Value = XmlConvert.ToString((decimal)dataRow["MaxOtherLot"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("DQQuoteMinLot");
                attribute.Value = XmlConvert.ToString((decimal)dataRow["DQQuoteMinLot"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("AutoDQMaxLot");
                attribute.Value = XmlConvert.ToString((decimal)dataRow["AutoDQMaxLot"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("AutoLmtMktMaxLot");
                attribute.Value = XmlConvert.ToString((decimal)dataRow["AutoLmtMktMaxLot"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("AcceptDQVariation");
                attribute.Value = XmlConvert.ToString((int)dataRow["AcceptDQVariation"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("AcceptLmtVariation");
                attribute.Value = XmlConvert.ToString((int)dataRow["AcceptLmtVariation"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("AcceptCloseLmtVariation");
                attribute.Value = XmlConvert.ToString((int)dataRow["AcceptCloseLmtVariation"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("CancelLmtVariation");
                attribute.Value = XmlConvert.ToString((int)dataRow["CancelLmtVariation"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("AutoDQDelay");
                attribute.Value = XmlConvert.ToString((Int16)dataRow["AutoDQDelay"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("AllowedNewTradeSides");
                attribute.Value = XmlConvert.ToString((byte)dataRow["AllowedNewTradeSides"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("AutoAcceptMaxLot");
                attribute.Value = XmlConvert.ToString((decimal)dataRow["AutoAcceptMaxLot"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("AutoCancelMaxLot");
                attribute.Value = XmlConvert.ToString((decimal)dataRow["AutoCancelMaxLot"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                attribute = doc.CreateAttribute("HitPriceVariationForSTP");
                attribute.Value = XmlConvert.ToString((int)dataRow["HitPriceVariationForSTP"]);
                dealingPolicyDetail.Attributes.Append(attribute);

                dealingPolicyDetails.AppendChild(dealingPolicyDetail);
            }
            return dealingPolicyDetails;
        }

        //Added by Michael on 2009-01-13
        [WebMethod(true)]
        public bool UpdateDealingPolicyDetail(string dealingPolicyDetailXml, string objectIDs, string eventMessages)
        {
            try
            {
                Token token = (Token)Session["Token"];

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(dealingPolicyDetailXml);
                XmlNode dealingPolicyDetailNodes = (XmlNode)doc.FirstChild;

                if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                {
                    AppDebug.LogEvent("DealingConsole.UpdateDealingPolicyDetail:", token.ToString() + "\n" + dealingPolicyDetailNodes.OuterXml, EventLogEntryType.Information);
                }

                bool isOK = this.StateServer.UpdateDealingPolicyDetail(token, dealingPolicyDetailNodes);
                this.WriteLog(objectIDs, eventMessages, Guid.Empty, "");
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateDealingPolicyDetail:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

 
        public bool UpdateEmployeePolicy(string employeePolicyXml)
        {
            try
            {
                Token token = (Token)Session["Token"];
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(employeePolicyXml);
                //doc = this.DeleteRepeatNode(doc);
                XmlNode employeePolicyNodes = (XmlNode)doc.FirstChild;

                if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                {
                    AppDebug.LogEvent("DealingConsole.UpdateEmployeePolicy:", token.ToString() + "\n" + employeePolicyNodes.OuterXml, EventLogEntryType.Information);
                }

                var isOK = this.StateServer.UpdateEmployeePolicy(token, employeePolicyNodes);
                if (isOK)
                {
                    string employeeIDs = string.Empty;
                    foreach (XmlNode employeePolicy in employeePolicyNodes.ChildNodes)
                    {
                        employeeIDs += (employeeIDs != "" ? ",'" : "'") + employeePolicy.Attributes["ID"].Value + "'";
                    }
                    if (!string.IsNullOrWhiteSpace(employeeIDs))
                    {
                        string sql = string.Format("SELECT DISTINCT Code FROM Employee WHERE ID IN({0})", employeeIDs);
                        DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                        if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                        {
                            string employeeCodes = string.Empty;
                            foreach (DataRow dataRow in dataSet.Tables[0].Rows)
                            {
                                employeeCodes += (employeeCodes != "" ? "," : "") + dataRow["Code"].ToString();
                            }
                            if (employeeCodes != "")
                            {
                                string objectIDs = "CMgmt";
                                //QP changed: DP changed:???
                                string eventMessage = string.Format("Employee Codes={0}", employeeCodes);
                                this.WriteLog(objectIDs, eventMessage, Guid.Empty, "");
                            }
                        }
                    }
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateEmployeePolicy:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

       
        public bool UpdateCustomerPolicy(string customerPolicyXml)
        {
            try
            {
                Token token = (Token)Session["Token"];

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(customerPolicyXml);
                //doc = this.DeleteRepeatNode(doc);
                XmlNode customerPolicyNodes = (XmlNode)doc.FirstChild;
                if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                {
                    AppDebug.LogEvent("DealingConsole.UpdateCustomerPolicy:", token.ToString() + "\n" + customerPolicyNodes.OuterXml, EventLogEntryType.Information);
                }

                var isOK = this.StateServer.UpdateCustomerPolicy(token, customerPolicyNodes);
                if (isOK)
                {
                    string customerIDs = string.Empty;
                    foreach (XmlNode customerPolicy in customerPolicyNodes.ChildNodes)
                    {
                        customerIDs += (customerIDs != "" ? ",'" : "'") + customerPolicy.Attributes["ID"].Value + "'";
                    }
                    if (!string.IsNullOrWhiteSpace(customerIDs))
                    {
                        string sql = string.Format("SELECT DISTINCT Code FROM dbo.Customer WHERE ID IN ({0})", customerIDs);
                        DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                        if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                        {
                            string customerCodes = string.Empty;
                            foreach (DataRow dataRow in dataSet.Tables[0].Rows)
                            {
                                customerCodes += (customerCodes != "" ? "," : "") + dataRow["Code"].ToString();
                            }
                            if (customerCodes != "")
                            {
                                string objectIDs = "CMgmt";
                                //QP changed: DP changed:???
                                string eventMessage = string.Format("Customer Codes={0}", customerCodes);
                                this.WriteLog(objectIDs, eventMessage, Guid.Empty, "");
                            }
                        }
                    }
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateCustomerPolicy:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        [WebMethod(true)]
        public bool UpdatePolicyProcess(string customerPolicyXml, string employeePolicyXml)
        {
            bool isSucceedForCustomer = (customerPolicyXml == string.Empty) ? true:this.UpdateCustomerPolicy(customerPolicyXml);
            bool isSucceedForEmployee = (employeePolicyXml == string.Empty) ? true:this.UpdateEmployeePolicy(employeePolicyXml);
            return (isSucceedForCustomer && isSucceedForEmployee);
        }

        public XmlDocument DeleteRepeatNode(XmlDocument doc)
        {
            List<string> list = new List<string>();
            XmlNodeList xmlNodes = doc.ChildNodes[0].ChildNodes;
            for (int i = xmlNodes.Count - 1; i >= 0; i--)
            {
                var item = xmlNodes[i];
                XmlElement xmlChildNode = (XmlElement)xmlNodes[i];
                if (list.Contains(item.Attributes["ID"].Value))
                {
                    item.ParentNode.RemoveChild(item);
                }
                else
                {
                    list.Add(item.Attributes["ID"].Value);
                }
            }
            return doc;
        }
        //private bool UpdateDealingPolicyDetailForAutoToManual()
        //{
        //    Token token = (Token)Session["Token"];
        //    StateServer.Service stateServer = (StateServer.Service)Application["StateServer"];

        //    DataSet dataSet = this.GetDealingPolicyDetailForAutoToManual();
        //    XmlNode dealingPolicyDetails = this.ToXmlNodeDealingPolicyDetailForAutoToManual2(dataSet);
        //    if (dealingPolicyDetails == null) return true;
        //    if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
        //    {
        //        AppDebug.LogEvent("DealingConsole.UpdateDealingPolicyDetailForAutoToManual:", token.ToString() + "\n" + dealingPolicyDetails.OuterXml, EventLogEntryType.Information);
        //    }
        //    return stateServer.UpdateDealingPolicyDetail(token, dealingPolicyDetails);
        //}

        //        private DataSet GetDealingPolicyDetailForAutoToManual()
        //        {
        //            DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
        //            if (state == null || state.Instruments.Count <= 0 || state.Instruments.Keys.Count <= 0) return null;
        //            int count = state.Instruments.Keys.Count;
        //            string[] instrumentIDArray = new string[count];
        //            int i = 0;
        //            foreach (Guid key in state.Instruments.Keys)
        //            {
        //                instrumentIDArray[i] = "'" + key.ToString() + "'";
        //                i++;
        //            }
        //            string instrumentIDs = String.Join(",", instrumentIDArray);

        //            string sql = string.Format(@"SELECT dpd.[DealingPolicyID]
        //                    ,dpd.[InstrumentID]
        //                FROM [dbo].[DealingPolicyDetail] dpd
        //                INNER JOIN DealingPolicy dp ON dp.ID = dpd.DealingPolicyID
        //                INNER JOIN Instrument i ON i.ID = dpd.InstrumentID
        //                WHERE dpd.InstrumentID IN ({0}) ",  instrumentIDs);

        //            try
        //            {
        //                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
        //                return dataSet;
        //            }
        //            catch (System.Exception ex)
        //            {
        //                AppDebug.LogEvent("DealingConsole.GetDealingPolicyDetailForDealingPolicy", string.Format("ConnectionString={0},SQLString={1},Exception={2}", ConnectionString, sql, ex.ToString()), System.Diagnostics.EventLogEntryType.Error);
        //            }
        //            return null;
        //        }

        //private bool UpdateDealingPolicyDetailByInstrumentForAutoToManual2(Guid instrumentId)
        //{
        //    Token token = (Token)Session["Token"];
        //    StateServer.Service stateServer = (StateServer.Service)Application["StateServer"];

        //    DataSet dataSet = this.GetDealingPolicyDetailByInstrumentForAutoToManual2(instrumentId);
        //    XmlNode dealingPolicyDetails = this.ToXmlNodeDealingPolicyDetailForAutoToManual2(dataSet);
        //    if (dealingPolicyDetails == null) return true;
        //    if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
        //    {
        //        AppDebug.LogEvent("DealingConsole.UpdateDealingPolicyDetailByInstrumentForAutoToManual2:", token.ToString() + "\n" + dealingPolicyDetails.OuterXml, EventLogEntryType.Information);
        //    }
        //    return stateServer.UpdateDealingPolicyDetail(token, dealingPolicyDetails);
        //}

        //        private DataSet GetDealingPolicyDetailByInstrumentForAutoToManual2(Guid instrumentID)
        //        {
        //            string sql = string.Format(@"SELECT dpd.[DealingPolicyID]
        //                    ,dpd.[InstrumentID]
        //                FROM [dbo].[DealingPolicyDetail] dpd
        //                INNER JOIN DealingPolicy dp ON dp.ID = dpd.DealingPolicyID
        //                INNER JOIN Instrument i ON i.ID = dpd.InstrumentID
        //                WHERE dpd.InstrumentID = '{0}'", instrumentID);

        //            try
        //            {
        //                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
        //                return dataSet;
        //            }
        //            catch (System.Exception ex)
        //            {
        //                AppDebug.LogEvent("DealingConsole.GetDealingPolicyDetailByInstrumentForAutoToManual2:", string.Format("ConnectionString={0},SQLString={1},Exception={2}", ConnectionString, sql, ex.ToString()), System.Diagnostics.EventLogEntryType.Error);
        //            }
        //            return null;
        //        }

        //private XmlNode ToXmlNodeDealingPolicyDetailForAutoToManual2(DataSet dataSet)
        //{
        //    if (dataSet == null
        //        || dataSet.Tables.Count <= 0
        //        || dataSet.Tables[0].Rows.Count <= 0)
        //    {
        //        return null;
        //    }

        //    XmlDocument doc = new XmlDocument();
        //    XmlNode dealingPolicyDetails = doc.CreateNode(XmlNodeType.Element, "DealingPolicyDetails", null);
        //    XmlAttribute attribute;
        //    foreach (DataRow dataRow in dataSet.Tables[0].Rows)
        //    {
        //        XmlNode dealingPolicyDetail = doc.CreateNode(XmlNodeType.Element, "DealingPolicyDetail", null);
        //        attribute = doc.CreateAttribute("DealingPolicyID");
        //        attribute.Value = dataRow["DealingPolicyID"].ToString();
        //        dealingPolicyDetail.Attributes.Append(attribute);

        //        attribute = doc.CreateAttribute("InstrumentID");
        //        attribute.Value = dataRow["InstrumentID"].ToString();
        //        dealingPolicyDetail.Attributes.Append(attribute);

        //        attribute = doc.CreateAttribute("AutoDQMaxLot");
        //        attribute.Value = "0.0";
        //        dealingPolicyDetail.Attributes.Append(attribute);

        //        attribute = doc.CreateAttribute("AutoLmtMktMaxLot");
        //        attribute.Value = "0.0";
        //        dealingPolicyDetail.Attributes.Append(attribute);

        //        dealingPolicyDetails.AppendChild(dealingPolicyDetail);
        //    }
        //    return dealingPolicyDetails;
        //}

        #region UpdateDealingPolicyDetailForSetValue SetValue

        [WebMethod(true)]
        public bool UpdateDealingPolicyDetailForSetValue(string setValueXml)
        {
            try
            {
                Token token = (Token)Session["Token"];

                DataSet dataSet = this.GetDealingPolicyDetailForSetValue();
                string eventMessages = "";
                XmlNode dealingPolicyDetails = this.ToXmlNodeDealingPolicyDetailForSetValue(dataSet, setValueXml, out eventMessages);
                if (dealingPolicyDetails == null) return true;
                if (Convert.ToBoolean(System.Configuration.ConfigurationSettings.AppSettings["IsDebug"]))
                {
                    AppDebug.LogEvent("DealingConsole.UpdateDealingPolicyDetailForSetValue:", token.ToString() + "\n" + dealingPolicyDetails.OuterXml, EventLogEntryType.Information);
                }
                bool isOK = this.StateServer.UpdateDealingPolicyDetail(token, dealingPolicyDetails);
                if (isOK)
                {
                    string objectIDs = "DP";
                    this.WriteLog(objectIDs, eventMessages, Guid.Empty, "");
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.UpdateDealingPolicyDetailForSetValue:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        private XmlNode ToXmlNodeDealingPolicyDetailForSetValue(DataSet dataSet, string setValueXml, out string eventMessages)
        {
            eventMessages = "";
            try
            {
                if (dataSet == null
                    || dataSet.Tables.Count <= 0
                    || dataSet.Tables[0].Rows.Count <= 0)
                {
                    return null;
                }

                decimal newMaxDQLot = Decimal.Zero;
                decimal newMaxOtherLot = Decimal.Zero;
                decimal newDQQuoteMinLot = Decimal.Zero;
                decimal newAutoDQMaxLot = Decimal.Zero;
                decimal newAutoLmtMktMaxLot = Decimal.Zero;
                int newAcceptDQVariation = 0;
                int newAcceptLmtVariation = 0;
                int newAcceptCloseLmtVariation = 0;
                int newCancelLmtVariation = 0;
                int newAutoDQDelay = 0;
                int newHitPriceVariationForSTP = 0;
                byte newAllowedNewTradeSides = 3;
                decimal newAutoAcceptMaxLot = Decimal.Parse("9999.00");
                decimal newAutoCancelMaxLot = Decimal.Parse("9999.00");

                bool isUpdateMaxDQLot = false;
                bool isUpdateMaxOtherLot = false;
                bool isUpdateDQQuoteMinLot = false;
                bool isUpdateAutoDQMaxLot = false;
                bool isUpdateAutoLmtMktMaxLot = false;
                bool isUpdateAcceptDQVariation = false;
                bool isUpdateAcceptLmtVariation = false;
                bool isUpdateAcceptCloseLmtVariation = false;
                bool isUpdateCancelLmtVariation = false;
                bool isUpdateAutoDQDelay = false;
                bool isUpdateAllowedNewTradeSides = false;
                bool isUpdateAutoAcceptMaxLot = false;
                bool isUpdateAutoCancelMaxLot = false;
                bool isUpdateHitPriceVariationForSTP =false;

                XmlDocument doc2 = new XmlDocument();
                doc2.LoadXml(setValueXml);
                XmlNode setValueNodes = (XmlNode)doc2.FirstChild;
                if (setValueNodes.Attributes["MaxDQLot"] != null)
                {
                    newMaxDQLot = XmlConvert.ToDecimal(setValueNodes.Attributes["MaxDQLot"].Value);
                    isUpdateMaxDQLot = true;
                }
                if (setValueNodes.Attributes["MaxOtherLot"] != null)
                {
                    newMaxOtherLot = XmlConvert.ToDecimal(setValueNodes.Attributes["MaxOtherLot"].Value);
                    isUpdateMaxOtherLot = true;
                }
                if (setValueNodes.Attributes["DQQuoteMinLot"] != null)
                {
                    newDQQuoteMinLot = XmlConvert.ToDecimal(setValueNodes.Attributes["DQQuoteMinLot"].Value);
                    isUpdateDQQuoteMinLot = true;
                }
                if (setValueNodes.Attributes["AutoDQMaxLot"] != null)
                {
                    newAutoDQMaxLot = XmlConvert.ToDecimal(setValueNodes.Attributes["AutoDQMaxLot"].Value);
                    isUpdateAutoDQMaxLot = true;
                }
                if (setValueNodes.Attributes["AutoLmtMktMaxLot"] != null)
                {
                    newAutoLmtMktMaxLot = XmlConvert.ToDecimal(setValueNodes.Attributes["AutoLmtMktMaxLot"].Value);
                    isUpdateAutoLmtMktMaxLot = true;
                }
                if (setValueNodes.Attributes["AcceptDQVariation"] != null)
                {
                    newAcceptDQVariation = XmlConvert.ToInt32(setValueNodes.Attributes["AcceptDQVariation"].Value);
                    isUpdateAcceptDQVariation = true;
                }
                if (setValueNodes.Attributes["AcceptLmtVariation"] != null)
                {
                    newAcceptLmtVariation = XmlConvert.ToInt32(setValueNodes.Attributes["AcceptLmtVariation"].Value);
                    isUpdateAcceptLmtVariation = true;
                }
                if (setValueNodes.Attributes["AcceptCloseLmtVariation"] != null)
                {
                    newAcceptCloseLmtVariation = XmlConvert.ToInt32(setValueNodes.Attributes["AcceptCloseLmtVariation"].Value);
                    isUpdateAcceptCloseLmtVariation = true;
                }
                if (setValueNodes.Attributes["CancelLmtVariation"] != null)
                {
                    newCancelLmtVariation = XmlConvert.ToInt32(setValueNodes.Attributes["CancelLmtVariation"].Value);
                    isUpdateCancelLmtVariation = true;
                }
                if (setValueNodes.Attributes["AutoDQDelay"] != null)
                {
                    newAutoDQDelay = XmlConvert.ToInt32(setValueNodes.Attributes["AutoDQDelay"].Value);
                    isUpdateAutoDQDelay = true;
                }

                if (setValueNodes.Attributes["AllowedNewTradeSides"] != null)
                {
                    newAllowedNewTradeSides = XmlConvert.ToByte(setValueNodes.Attributes["AllowedNewTradeSides"].Value);
                    isUpdateAllowedNewTradeSides = true;
                }

                if (setValueNodes.Attributes["AutoAcceptMaxLot"] != null)
                {
                    newAutoAcceptMaxLot = XmlConvert.ToDecimal(setValueNodes.Attributes["AutoAcceptMaxLot"].Value);
                    isUpdateAutoAcceptMaxLot = true;
                }

                if (setValueNodes.Attributes["AutoCancelMaxLot"] != null)
                {
                    newAutoCancelMaxLot = XmlConvert.ToDecimal(setValueNodes.Attributes["AutoCancelMaxLot"].Value);
                    isUpdateAutoCancelMaxLot = true;
                }

                if (setValueNodes.Attributes["HitPriceVariationForSTP"] != null)
                {
                    newHitPriceVariationForSTP = XmlConvert.ToInt32(setValueNodes.Attributes["HitPriceVariationForSTP"].Value);
                    isUpdateHitPriceVariationForSTP = true;
                }

                XmlDocument doc = new XmlDocument();
                XmlNode dealingPolicyDetails = doc.CreateNode(XmlNodeType.Element, "DealingPolicyDetails", null);
                XmlAttribute attribute;
                foreach (DataRow dataRow in dataSet.Tables[0].Rows)
                {
                    string eventMessage = "";

                    XmlNode dealingPolicyDetail = doc.CreateNode(XmlNodeType.Element, "DealingPolicyDetail", null);
                    attribute = doc.CreateAttribute("DealingPolicyID");
                    attribute.Value = dataRow["DealingPolicyID"].ToString();
                    dealingPolicyDetail.Attributes.Append(attribute);

                    attribute = doc.CreateAttribute("InstrumentID");
                    attribute.Value = dataRow["InstrumentID"].ToString();
                    dealingPolicyDetail.Attributes.Append(attribute);

                    decimal maxDQLot = (decimal)dataRow["MaxDQLot"];
                    decimal dQQuoteMinLot = (decimal)dataRow["DQQuoteMinLot"];

                    if (isUpdateMaxDQLot)
                    {
                        if (newMaxDQLot.CompareTo((isUpdateDQQuoteMinLot) ? newDQQuoteMinLot : dQQuoteMinLot) >= 0)
                        {
                            attribute = doc.CreateAttribute("MaxDQLot");
                            attribute.Value = XmlConvert.ToString(newMaxDQLot);
                            dealingPolicyDetail.Attributes.Append(attribute);

                            eventMessage += string.Format("{0}MaxDQLot={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newMaxDQLot));
                        }
                    }

                    if (isUpdateMaxOtherLot)
                    {
                        attribute = doc.CreateAttribute("MaxOtherLot");
                        attribute.Value = XmlConvert.ToString(newMaxOtherLot);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}MaxOtherLot={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newMaxOtherLot));
                    }

                    if (isUpdateDQQuoteMinLot)
                    {
                        if (((isUpdateMaxDQLot) ? newMaxDQLot : maxDQLot).CompareTo(newDQQuoteMinLot) >= 0)
                        {
                            attribute = doc.CreateAttribute("DQQuoteMinLot");
                            attribute.Value = XmlConvert.ToString(newDQQuoteMinLot);
                            dealingPolicyDetail.Attributes.Append(attribute);

                            eventMessage += string.Format("{0}DQQuoteMinLot={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newDQQuoteMinLot));
                        }
                    }

                    if (isUpdateAutoDQMaxLot)
                    {
                        attribute = doc.CreateAttribute("AutoDQMaxLot");
                        attribute.Value = XmlConvert.ToString(newAutoDQMaxLot);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}AutoDQMaxLot={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newAutoDQMaxLot));
                    }

                    if (isUpdateAutoLmtMktMaxLot)
                    {
                        attribute = doc.CreateAttribute("AutoLmtMktMaxLot");
                        attribute.Value = XmlConvert.ToString(newAutoLmtMktMaxLot);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}AutoLmtMktMaxLot={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newAutoLmtMktMaxLot));
                    }

                    if (isUpdateAcceptDQVariation)
                    {
                        attribute = doc.CreateAttribute("AcceptDQVariation");
                        attribute.Value = XmlConvert.ToString(newAcceptDQVariation);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}AcceptDQVariation={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newAcceptDQVariation));
                    }

                    if (isUpdateAcceptLmtVariation)
                    {
                        attribute = doc.CreateAttribute("AcceptLmtVariation");
                        attribute.Value = XmlConvert.ToString(newAcceptLmtVariation);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}AcceptLmtVariation={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newAcceptLmtVariation));
                    }
                    if (isUpdateAcceptCloseLmtVariation)
                    {
                        attribute = doc.CreateAttribute("AcceptCloseLmtVariation");
                        attribute.Value = XmlConvert.ToString(newAcceptCloseLmtVariation);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}AcceptCloseLmtVariation={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newAcceptCloseLmtVariation));
                    }

                    if (isUpdateCancelLmtVariation)
                    {
                        attribute = doc.CreateAttribute("CancelLmtVariation");
                        attribute.Value = XmlConvert.ToString(newCancelLmtVariation);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}CancelLmtVariation={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newCancelLmtVariation));
                    }

                    if (isUpdateAutoDQDelay)
                    {
                        attribute = doc.CreateAttribute("AutoDQDelay");
                        attribute.Value = XmlConvert.ToString(newAutoDQDelay);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}AutoDQDelay={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newAutoDQDelay));
                    }

                    if (isUpdateAllowedNewTradeSides)
                    {
                        attribute = doc.CreateAttribute("AllowedNewTradeSides");
                        attribute.Value = XmlConvert.ToString(newAllowedNewTradeSides);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}AllowedNewTradeSides={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newAllowedNewTradeSides));
                    }

                    if (isUpdateAutoAcceptMaxLot)
                    {
                        attribute = doc.CreateAttribute("AutoAcceptMaxLot");
                        attribute.Value = XmlConvert.ToString(newAutoAcceptMaxLot);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}AutoAcceptMaxLot={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newAutoAcceptMaxLot));
                    }

                    if (isUpdateAutoCancelMaxLot)
                    {
                        attribute = doc.CreateAttribute("AutoCancelMaxLot");
                        attribute.Value = XmlConvert.ToString(newAutoCancelMaxLot);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}AutoCancelMaxLot={1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newAutoCancelMaxLot));
                    }

                    if (isUpdateHitPriceVariationForSTP)
                    {
                        attribute = doc.CreateAttribute("HitPriceVariationForSTP");
                        attribute.Value = XmlConvert.ToString(newHitPriceVariationForSTP);
                        dealingPolicyDetail.Attributes.Append(attribute);

                        eventMessage += string.Format("{0}HitPriceVariationForSTP = {1}", (eventMessage != "" ? "," : ""), XmlConvert.ToString(newHitPriceVariationForSTP));
                    }

                    dealingPolicyDetails.AppendChild(dealingPolicyDetail);

                    if (eventMessage != "")
                    {
                        eventMessage = string.Format("SetValue: \n DP={0},Item={1}: ", dataRow["DealingPolicyCode"].ToString(), dataRow["InstrumentCode"].ToString()) + eventMessage;
                        eventMessages += (eventMessages != "" ? "\n" : "") + eventMessage;
                    }
                }
                return dealingPolicyDetails;
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.ToXmlNodeDealingPolicyDetailForSetValue", string.Format("SetValueXml={0},Exception={1}", setValueXml, ex.ToString()), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        private DataSet GetDealingPolicyDetailForSetValue()
        {
            DealingConsoleState state = (DealingConsoleState)this.Context.Session["State"];
            if (state == null || state.Instruments.Count <= 0 || state.Instruments.Keys.Count <= 0) return null;
            int count = state.Instruments.Keys.Count;
            string[] instrumentIDArray = new string[count];
            int i = 0;
            foreach (Guid key in state.Instruments.Keys)
            {
                instrumentIDArray[i] = "'" + key.ToString() + "'";
                i++;
            }
            string instrumentIDs = String.Join(",", instrumentIDArray);

            string sql = string.Format(@"SELECT dpd.[DealingPolicyID]
                    ,DealingPolicyCode = dp.Code
                    ,dpd.[InstrumentID]
                    ,InstrumentCode = i.Code
                    ,dpd.[MaxDQLot]
                    ,dpd.[DQQuoteMinLot]
                FROM [dbo].[DealingPolicyDetail] dpd
                INNER JOIN DealingPolicy dp ON dp.ID = dpd.DealingPolicyID
                INNER JOIN Instrument i ON i.ID = dpd.InstrumentID
                WHERE dpd.InstrumentID IN ({0}) ", instrumentIDs);

            try
            {
                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                return dataSet;
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.GetDealingPolicyDetailForSetValue", string.Format("ConnectionString={0},SQLString={1},Exception={2}", ConnectionString, sql, ex.ToString()), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }
        #endregion

        #region FixOverridedQuotationHistory

        private DataSet OverridedQuotationGetLastTimestampFromDB(string instrumentID)
        {
            string sql = string.Format(@"EXEC [dbo].[OverridedQuotation_GetLastTimestamp] @instrumentID='{0}'", instrumentID);

            try
            {
                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                return dataSet;
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.OverridedQuotationGetLastTimestampFromDB:", string.Format("ConnectionString={0},SQLString={1},Exception={2}", ConnectionString, sql, ex.ToString()), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        private XmlNode OverridedQuotationGetLastTimestampToXmlNode(DataSet dataSet)
        {
            if (dataSet == null
                || dataSet.Tables.Count <= 0
                || dataSet.Tables[0].Rows.Count <= 0)
            {
                return null;
            }

            XmlDocument doc = new XmlDocument();
            XmlNode overridedQuotations = doc.CreateNode(XmlNodeType.Element, "OverridedQuotations", null);
            XmlAttribute attribute;
            foreach (DataRow dataRow in dataSet.Tables[0].Rows)
            {
                XmlNode overridedQuotation = doc.CreateNode(XmlNodeType.Element, "OverridedQuotation", null);
                attribute = doc.CreateAttribute("Timestamp");
                attribute.Value = ((DateTime)dataRow["Timestamp"]).ToString("yyyy-MM-dd HH:mm:ss.fff");
                overridedQuotation.Attributes.Append(attribute);

                overridedQuotations.AppendChild(overridedQuotation);
            }
            return overridedQuotations;
        }

        [WebMethod(false)]
        public XmlNode OverridedQuotationGetLastTimestamp(string instrumentID)
        {
            try
            {
                DataSet dataSet = this.OverridedQuotationGetLastTimestampFromDB(instrumentID);
                return this.OverridedQuotationGetLastTimestampToXmlNode(dataSet);
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.OverridedQuotationGetLastTimestamp:", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return null;
        }

        [WebMethod(false)]
        public DataSet GetOriginQuotationForModifyAskBidHistory(string instrumentID, string beginDateTime, string origin)
        {
            try
            {
                string sql = string.Format("exec dbo.P_GetOriginQuotationForModifyAskBidHistory '{0}','{1}',{2}", new Guid(instrumentID), DateTime.Parse(beginDateTime), string.IsNullOrEmpty(origin.Trim()) ? "null" : "'" + origin + "'");

                return DataAccess.GetData(sql, ConnectionString);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetOriginQuotationForModifyAskBidHistory:", exception.ToString(), EventLogEntryType.Error);
                return null;
            }
        }

        [WebMethod(true)]
        public string GetUpdateHighLowBatchProcessInfos()
        {
            Token token = (Token)Session["Token"];
            string sql = string.Format("EXEC dbo.P_GetUpdateHighLowBatchProcessInfo @dealerID='{0}'", token.UserID);
            DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
            dataSet = SqlHelper.ChangeDateTimeModeToUnspecified(dataSet);
            return SqlHelper.ConvertDataSetToString(dataSet, XmlWriteMode.IgnoreSchema);
        }

        //Return value:
        //--0: Succeed
        //---1: FailedOnDBQuotation
        //---2: InvalidNewInput
        //---3: NotEffectedRecord
        //---4: FailedDeleteChartData
        //---5: FailedOnDBV3
        //-10: FailedCallOnQuotationServer
        //-11: FailedCallOnStateServer
        [WebMethod(true)]
        public void UpdateHighLow(Guid instrumentId, bool isOriginHiLo, string newInput, bool isUpdateHigh, out int batchProcessId, out string instrumentCode, out bool highBid, out bool lowBid, out string updateTime, out int returnValue, out string errorMessage)
        {
            updateTime = "";
            Token token = (Token)Session["Token"];
            string ip = this.Context.Request.UserHostAddress.ToString();
            DateTime updateTime2;
            DataSet dataSet = new DataSet();
            this.StateServer.UpdateHighLow(token, ip, instrumentId, isOriginHiLo, newInput, isUpdateHigh, out batchProcessId, out instrumentCode, out highBid, out lowBid, out updateTime2, out returnValue, out errorMessage);
            if (updateTime2 != null && updateTime2 != DateTime.MinValue) updateTime = updateTime2.ToString("yyyy/MM/dd HH:mm:ss");
        }

        //Return value:
        //0: Succeed
        //-1: FailedOnDBQuotation
        //-2: ExitsNewestBatchUpdate
        //-3: NotEffectedRecord
        //-4: FailedDeleteChartData
        //-5: FailedOnDBV3
        //-10: FailedCallOnQuotationServer
        //-11: FailedCallOnStateServer
        [WebMethod(true)]
        public void RestoreHighLow(int batchProcessId, out Guid instrumentId, out string instrumentCode, out string newInput, out bool isUpdateHigh, out bool highBid, out bool lowBid, out int returnValue, out string errorMessage)
        {
            Token token = (Token)Session["Token"];
            string ip = this.Context.Request.UserHostAddress.ToString();
            this.StateServer.RestoreHighLow(token, ip, batchProcessId, out instrumentId, out instrumentCode, out newInput, out isUpdateHigh, out highBid, out lowBid, out returnValue, out errorMessage);
        }

        [WebMethod(true, Description = "DealingConsole send fixed OverridedQuotationHistory to QuotationServer,include action: Insert,Delete,Modify")]
        public bool FixOverridedQuotationHistory(string quotation, bool needApplyAutoAdjustPoints, string objectIDs, string[] instrumentIDArray, string[] instrumentCodeArray, string[] eventMessageArray)
        {
            try
            {
                Token token = (Token)Session["Token"];
                bool isOK = this.StateServer.FixOverridedQuotationHistory(token, quotation, needApplyAutoAdjustPoints);
                if (isOK)
                {
                    int i = 0;
                    foreach (string eventMessage in eventMessageArray)
                    {
                        this.WriteLog(objectIDs, eventMessage, new Guid(instrumentIDArray[i]), instrumentCodeArray[i]);
                        i++;
                    }
                }
                return isOK;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.SetAskBidHistory:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return false;
        }

        [WebMethod(false)]
        public DataSet GetOriginQuotationForModifyHighLowHistory(string tradeDay, string instrumentID, string origin, string isLow)
        {
            try
            {
                string sql = string.Format("exec dbo.P_GetHistoryOriginQuotationByInstrument '{0}','{1}',{2},'{3}'", DateTime.Parse(tradeDay), new Guid(instrumentID), string.IsNullOrEmpty(origin.Trim()) ? "null" : "'" + origin + "'", bool.Parse(isLow));

                return DataAccess.GetData(sql, ConnectionString);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetOriginQuotationForModifyHighLowHistory:", exception.ToString(), EventLogEntryType.Error);
                return null;
            }
        }

        //[WebMethod(true)]
        //public bool SetHighLowHistory(string tradeDay, string quotation, bool needApplyAutoAdjustPoints)
        //{
        //    try
        //    {
        //        Token token = (Token)Session["Token"];
        //        StateServer.Service stateServer = (StateServer.Service)Application["StateServer"];
        //        return stateServer.SetHistoryQuotation(token, DateTime.Parse(tradeDay), quotation, needApplyAutoAdjustPoints);
        //    }
        //    catch (Exception exception)
        //    {
        //        AppDebug.LogEvent("DealingConsole.SetHighLowHistory:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
        //    }
        //    return false;
        //}

        #endregion

        #region Write Log
        [WebMethod(true)]
        public bool WriteLog(string objectIDs, string eventMessage, Guid transactionID, string transactionCode)
        {
            Token token = (Token)Session["Token"];
            return DealingConsoleServer.SaveLog2(token, this.Context.Request.UserHostAddress.ToString(), objectIDs, eventMessage, transactionID, transactionCode);
        }

        public bool WriteLoginLog(string objectIDs, DateTime now, string eventMessage, Guid transactionID, string transactionCode)
        {
            Token token = (Token)Session["Token"];
            return DealingConsoleServer.SaveLog(token.UserID, this.Context.Request.UserHostAddress.ToString(), UserType.Dealer.ToString(), objectIDs, now, eventMessage, transactionID, transactionCode);
        }
        #endregion

        [WebMethod(true)]
        public string GetAccountComboList()
        {
            try
            {
                Token token = (Token)Session["Token"];
                string sql = string.Format(@"dbo.P_GetAccountByDealer @dealerId='{0}'", token.UserID);
                DataSet dataSet = DataAccess.GetData(sql, ConnectionString);
                return SqlHelper.ConvertDataSetToString(dataSet, XmlWriteMode.IgnoreSchema);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.GetAccountComboList:", exception.ToString(), EventLogEntryType.Error);
                return string.Empty;
            }
        }

    }
}
