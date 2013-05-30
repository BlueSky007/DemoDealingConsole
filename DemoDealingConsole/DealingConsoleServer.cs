using System;
using System.Collections;
using System.Data;
using System.Xml;
using System.Diagnostics;
using System.Data.SqlClient;

using iExchange.Common;
using System.Text;
using System.Collections.Generic;
using iExchange.Common.Client;

namespace iExchange.DealingConsole
{
    /// <summary>
    /// Summary description for DealingConsole.
    /// </summary>
    public class DealingConsoleServer
    {
        private static IComparer<Account> _MatchComparer = new InternalMatchComparer();
        //private SortedList<Guid, Account> accounts;
        private List<Account> accounts;
        private object accountsLock = new object();

        private Hashtable customers;
        private object customersLock = new object();

        private string connectionString;

        //add by jack
        private static string connectionStr;

        #region Proprties
        public bool ContainsCustomer(Guid customerId)
        {
            lock (this.customersLock)
            {
                return this.customers.Contains(customerId);
            }
        }

        public bool ContainsAccount(Guid accountId)
        {
            lock (this.accountsLock)
            {
                foreach (Account account in this.accounts)
                {
                    if (account.ID.Equals(accountId))
                    {
                        return true;
                    }
                }
                return false;
            }
        }
        #endregion

        public DealingConsoleServer(string connectionString)
        {
            this.connectionString = connectionString;
            connectionStr = connectionString;

            this.accounts = new List<Account>();
            this.customers = new Hashtable();
        }

        public void Init(DataSet dataSet)
        {
            try
            {
                DataRowCollection rows = dataSet.Tables["Customer"].Rows;
                foreach (DataRow row in rows)
                {
                    Customer customer = new Customer(row);
                    this.customers.Add(customer.ID, customer);
                }

                rows = dataSet.Tables["Account"].Rows;
                foreach (DataRow row in rows)
                {
                    Account account = new Account(row);
                    this.accounts.Add(account);
                }
            }
            catch (Exception e)
            {
                Trace.WriteLine(e.ToString(), "Error");
            }
            finally
            {
                Trace.WriteLine("Init OK", "Information");
            }

        }

        public bool Update(XmlNode update)
        {
            foreach (XmlNode method in update.ChildNodes)
            {
                foreach (XmlNode row in method.ChildNodes)
                {
                    switch (row.Name)
                    {
                        case "Account":
                            Guid accountID = XmlConvert.ToGuid(row.Attributes["ID"].Value);
                            lock (this.accountsLock)
                            {
                                if (method.Name == "Delete")
                                {
                                    foreach (Account account in this.accounts)
                                    {
                                        if (account.ID.Equals(accountID))
                                        {
                                            this.accounts.Remove(account);
                                            break;
                                        }
                                    }
                                }
                                else if (method.Name == "Modify")
                                {
                                    foreach (Account account in this.accounts)
                                    {
                                        if (account.ID.Equals(accountID))
                                        {
                                            account.Update(row);
                                            break;
                                        }
                                    }
                                }
                                else if (method.Name == "Add")
                                {
                                    bool exists = false;
                                    foreach (Account account in this.accounts)
                                    {
                                        if (account.ID.Equals(accountID))
                                        {
                                            exists = true;
                                            break;
                                        }
                                    }
                                    if (!exists)
                                    {
                                        Account account = new Account(row);
                                        this.accounts.Add(account);
                                    }
                                }
                            }
                            break;
                        case "Customer":
                            Guid customerID = XmlConvert.ToGuid(row.Attributes["ID"].Value);
                            lock (this.customersLock)
                            {
                                if (method.Name == "Delete")
                                {
                                    this.customers.Remove(customerID);
                                }
                                else if (method.Name == "Modify")
                                {
                                    if (this.customers.Contains(customerID))
                                    {
                                        Customer customer = (Customer)this.customers[customerID];
                                        customer.Update(row);
                                    }
                                }
                                else if (method.Name == "Add")
                                {
                                    if (!this.customers.Contains(customerID))
                                    {
                                        Customer customer = new Customer(row);
                                        this.customers.Add(customerID, customer);
                                    }
                                }
                            }
                            break;
                    }
                }
            }
            return true;
        }

        public bool UpdateEnquiryOutTime(int enquiryOutTime)
        {
            string sql = string.Format("UPDATE dbo.SystemParameter SET EnquiryOutTime = {0}", enquiryOutTime);
            return DataAccess.UpdateDB(sql, this.connectionString);
        }

        public bool GetSystemParameter(Token token, out string parameters)
        {
            parameters = "";
            string sql = string.Format("Exec dbo.P_GetSystemParameter '{0}','{1}'", token.UserID, (Int32)token.AppType);
            SqlCommand command = new SqlCommand(sql, new SqlConnection(connectionString));
            try
            {
                command.Connection.Open();
                parameters = command.ExecuteScalar().ToString();
            }
            catch
            {
                return false;
            }
            finally
            {
                if (command.Connection.State == ConnectionState.Open)
                {
                    command.Connection.Close();
                }
            }
            return false;
        }

        public DataSet GetUserListForCopyFrom(Token token)
        {
            //string sql = string.Format("SELECT ID,Code FROM dbo.Employee WHERE ID <> '{0}' ORDER BY Code",token.UserID);
            string sql = string.Format("EXEC [dbo].[Employee_GetComboListCopyFrom] '{0}',{1}", token.UserID, (Int32)token.AppType);
            return DataAccess.GetData(sql, connectionString);
        }

        public bool GetSettingForCopyFrom(Token token, string key, Guid fromUserId, out string output)
        {
            output = "";

            string sql = string.Empty;
            if (key == "Sound")
            {
                sql = string.Format("SELECT Parameters FROM dbo.Settings WHERE [AppType] = {0} AND UserID = '{1}'", (Int32)token.AppType, fromUserId);
            }
            else
            {
                sql = string.Format("SELECT Parameter FROM dbo.Settings2 WHERE [AppType] = {0} AND UserID = '{1}' AND ObjectID = '{2}'", (Int32)token.AppType, fromUserId, key);
            }
            SqlCommand command = new SqlCommand(sql, new SqlConnection(connectionString));
            try
            {
                command.Connection.Open();
                output = command.ExecuteScalar().ToString();
            }
            catch
            {
                return false;
            }
            finally
            {
                if (command.Connection.State == ConnectionState.Open)
                {
                    command.Connection.Close();
                }
            }
            return false;
        }

        public bool SetSystemParameter(Token token, string parameters)
        {
            string sql = string.Format("Exec dbo.P_SetSystemParameter '{0}','{1}',N'{2}'", token.UserID, (Int32)token.AppType, parameters);

            AppDebug.LogEvent("DealingConsoleServer.SetSystemParameter:", string.Format("Token={0}\n ConnectionString={1}\n SQL={2}", token.ToString(), this.connectionString, sql), EventLogEntryType.Information);

            return DataAccess.UpdateDB(sql, this.connectionString);
        }

        public Account GetAccount(Guid id, bool needRefresh)
        {
            if (!needRefresh)
            {
                lock (this.accountsLock)
                {
                    foreach (Account account in this.accounts)
                    {
                        if (account.ID.Equals(id))
                        {
                            return account;
                        }
                    }
                }
            }

            SqlConnection myConnection = new SqlConnection(connectionString);

            //string sql = string.Format("SELECT ID, Code,Type, CustomerID, TradePolicyID,RateLotMin, RateLotMultiplier, RateDefaultLot  FROM Account WHERE ID='{0}'", id);
            string sql = string.Format(@"SELECT a.ID, a.Code, a.CustomerID, a.TradePolicyID,a.Type,a.RateLotMin,a.RateLotMultiplier,a.RateDefaultLot,
		                    gm.GroupID, g.Code As GroupCode
	                    FROM Account a
		                    INNER JOIN GroupMembership gm ON gm.MemberID = a.ID
		                    INNER JOIN [Group] g ON g.[ID] = gm.GroupID
                        WHERE a.ID='{0}'", id);

            myConnection.Open();
            SqlCommand myCommand = new SqlCommand(sql, myConnection);
            myCommand.CommandType = CommandType.Text;

            SqlDataAdapter myAdapter = new SqlDataAdapter();
            myAdapter.SelectCommand = myCommand;

            DataSet ds = new DataSet("Accounts");
            myAdapter.Fill(ds);

            myConnection.Close();
            DataRow row = ds.Tables[0].Rows[0];
            lock (this.accountsLock)
            {
                foreach (Account account in this.accounts)
                {
                    if (account.ID.Equals(id))
                    {
                        account.Update(row);
                        return account;
                    }
                }
                Account account2 = new Account(row);
                this.accounts.Add(account2);
                return account2;
            }
        }

        private DataSet GetDatas(string procedureName, string parameterName, string xmlIDs)
        {
            DataSet dataSet = null;

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                SqlCommand sqlCommand = new SqlCommand(procedureName, sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParameter = sqlCommand.Parameters.Add(parameterName, SqlDbType.NText);
                sqlParameter.Value = xmlIDs;

                sqlConnection.Open();
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
                sqlCommand.CommandTimeout = 300;

                dataSet = new DataSet();
                sqlDataAdapter.Fill(dataSet);

                if (dataSet.Tables.Count > 0)
                {
                    dataSet.Tables[0].TableName = "Customer";

                    lock (this.customersLock)
                    {
                        foreach (DataRow row in dataSet.Tables[0].Rows)
                        {
                            if (!this.customers.Contains((Guid)row["ID"]))
                            {
                                Customer customer = new Customer(row);
                                this.customers.Add(customer.ID, customer);
                            }
                        }
                    }
                }
                if (dataSet.Tables.Count > 1)
                {
                    dataSet.Tables[1].TableName = "Account";

                    lock (this.accountsLock)
                    {
                        foreach (DataRow row in dataSet.Tables[1].Rows)
                        {
                            bool exists = false;
                            foreach (Account account in this.accounts)
                            {
                                if (account.ID.Equals((Guid)row["ID"]))
                                {
                                    exists = true;
                                    break;
                                }
                            }
                            if (!exists)
                            {
                                this.accounts.Add(new Account(row));
                            }
                        }
                    }
                }
            }

            return dataSet;
        }

        public DataSet GetAccounts(string xmlAccountIDs)
        {
            //Return Customers and Accounts
            return this.GetDatas("dbo.GetAccountsByAccountIDForDealingConsole", "@xmlAccounts", xmlAccountIDs);
        }

        public DataSet GetCustomers(string xmlCustomerIDs)
        {
            //Return Customers
            return this.GetDatas("dbo.GetCustomersByCustomerIDForDealingConsole", "@xmlCustomerIDs", xmlCustomerIDs);
        }

        public Customer GetCustomer(Guid id)
        {
            Customer customer = null;
            lock (this.customersLock)
            {
                if (this.customers.Contains(id))
                {
                    return (Customer)this.customers[id];
                }
            }

            using (SqlConnection myConnection = new SqlConnection(connectionString))
            {
                string sql = string.Format("SELECT ID, CODE, PrivateQuotePolicyID, PublicQuotePolicyID,DealingPolicyID FROM Customer WHERE ID='{0}'", id);

                myConnection.Open();
                SqlCommand myCommand = new SqlCommand(sql, myConnection);
                myCommand.CommandType = CommandType.Text;

                SqlDataAdapter myAdapter = new SqlDataAdapter();
                myAdapter.SelectCommand = myCommand;

                DataSet ds = new DataSet("Customers");
                myAdapter.Fill(ds);

                DataRow row = ds.Tables[0].Rows[0];

                lock (this.customersLock)
                {
                    if (this.customers.Contains(id))
                    {
                        return (Customer)this.customers[id];
                    }
                    else
                    {
                        customer = new Customer(row);
                        this.customers.Add(customer.ID, customer);
                        return customer;
                    }
                }
            }
        }

        #region Account Status
        //public string GetAccountComboList()
        //{
        //    StringBuilder accountListStringBuilder = new StringBuilder();
        //    accountListStringBuilder.Append("<Option value='0'>Please select Account to query.</Option>");
        //    lock (this.accountsLock)
        //    {
        //        this.accounts.Sort(_MatchComparer);
        //        foreach (Account account in this.accounts)
        //        {
        //            accountListStringBuilder.Append("<Option value='" + account.ID.ToString() + "'>" + System.Web.HttpUtility.HtmlEncode(account.Code==null?"":account.Code) + "</Option>");
        //        }
        //    }
        //    return accountListStringBuilder.ToString();
        //}

        public string GetStateServerAccount(StateServerService stateServer, Guid[] accountIDs)
        {
            string outerXml = string.Empty;

            Token token = new Token();
            token.UserID = Guid.Empty;
            token.UserType = UserType.System;
            token.AppType = AppType.BackOffice;

            System.Xml.XmlNode xmlNode = stateServer.GetAccounts(token, accountIDs, true);
            if (xmlNode != null)
            {
                outerXml = xmlNode.OuterXml;// stateService.GetAccounts(token,accountIDs, true).OuterXml;
            }
            return outerXml;
        }

        public string GetStateServerAccounts5(StateServerService stateServer, Guid[] accountIDs, Guid[] instrumentIDs)
        {
            string outerXml = string.Empty;

            Token token = new Token();
            token.UserID = Guid.Empty;
            token.UserType = UserType.System;
            token.AppType = AppType.BackOffice;

            System.Xml.XmlNode xmlNode = stateServer.GetAccounts5(token, accountIDs, instrumentIDs, true);
            if (xmlNode != null)
            {
                outerXml = xmlNode.OuterXml;// stateService.GetAccounts(token,accountIDs, true).OuterXml;
            }
            return outerXml;
        }

        private string GetAccountInfo(string accountXml, Guid accountId)
        {
            if (accountXml.Trim() == "" || accountXml == string.Empty)
            {
                XmlDocument doc = new XmlDocument();
                XmlElement root = doc.CreateElement("Accounts");

                XmlElement accountNode = doc.CreateElement("Account");
                accountNode.SetAttribute("ID", XmlConvert.ToString(accountId));

                accountNode.SetAttribute("Balance", "0.0");
                accountNode.SetAttribute("Necessary", "0.0");
                accountNode.SetAttribute("InterestPLNotValued", "0.0");
                accountNode.SetAttribute("StoragePLNotValued", "0.0");
                accountNode.SetAttribute("TradePLNotValued", "0.0");
                accountNode.SetAttribute("InterestPLFloat", "0.0");
                accountNode.SetAttribute("StoragePLFloat", "0.0");
                accountNode.SetAttribute("TradePLFloat", "0.0");

                root.AppendChild(accountNode);

                accountXml = root.OuterXml;
            }
            return accountXml;
        }

        public DataSet ReportAccountStatusAllData(StateServerService stateServer, Token token, string selectedPrice, Guid accountId, Guid instrumentId)
        {
            try
            {
                string accountXml = this.GetStateServerAccount(stateServer, new Guid[] { accountId });
                accountXml = this.GetAccountInfo(accountXml, accountId);

                string sql = string.Format("exec dbo.P_ReportAccountStatusAllData @accountId='{0}',@xmlAccounts='{1}',@queryType='{2}',@dealerId='{3}',@instrumentId='{4}',@applicationId={5}", accountId, accountXml, selectedPrice, token.UserID, instrumentId, 1);
                DataSet dataSet = DataAccess.GetData(sql, connectionString, TimeSpan.FromMinutes(5));
                return dataSet;
            }
            catch (System.Exception exception)
            {
                return null;
            }
        }

        private class InternalMatchComparer : IComparer<Account>
        {
            #region IComparer<Account> Members

            int IComparer<Account>.Compare(Account x, Account y)
            {
                return x.Code.CompareTo(y.Code);
            }

            #endregion
        }
        #endregion Account Status

        public static string GetAllAccountGroupOptions(Token token)
        {
            string connectionString = System.Configuration.ConfigurationManager.AppSettings["ConnectionString"];
            string accountGroupOptions = string.Empty;
            string sqlString = @"select ID,Code from [group] where GroupType = 'Account' ORDER BY Code";
            SqlCommand cmd = new SqlCommand(sqlString, new SqlConnection(connectionString));
            try
            {
                cmd.Connection.Open();
                SqlDataReader myReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (myReader.Read())
                {
                    string item = string.Format("<option id='{0}' value='{0}'>{1}</option>",myReader.GetGuid(0),myReader.GetString(1));
                    accountGroupOptions += item;
                }
            }
            finally
            {
                if (cmd.Connection.State == ConnectionState.Open)
                    cmd.Connection.Close();
            }
            return accountGroupOptions;

        }

        public static string GetAccountGroupOptions(Token token)
        {
            string accountGroupOptions = string.Empty;

            string connectionString = System.Configuration.ConfigurationManager.AppSettings["ConnectionString"];
            string sqlString = string.Format(@"SELECT DISTINCT 
			    ID = abu.GroupId,
			    Code = abu.GroupCode
		    FROM [dbo].[FT_GetAccountsByUser]('{0}','{1}',0) abu
			    INNER JOIN dbo.Account a ON a.ID = abu.AccountId
		    ORDER BY abu.GroupCode", token.UserID, "Access1", 0);
            SqlCommand cmd = new SqlCommand(sqlString, new SqlConnection(connectionString));
            try
            {
                cmd.Connection.Open();
                SqlDataReader myReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (myReader.Read())
                {
                    string accountGroupOption = string.Format("<option id='{0}' value='{0}'>{1}</option>", myReader.GetGuid(0), myReader.GetString(1));
                    accountGroupOptions += accountGroupOption;
                }
            }
            finally
            {
                if (cmd.Connection.State == ConnectionState.Open)
                    cmd.Connection.Close();
            }
            return accountGroupOptions;
        }

        public static string GetDealingPolicyOptions()
        {
            string dealingPolicyOptions = string.Empty;

            string connectionString = System.Configuration.ConfigurationManager.AppSettings["ConnectionString"];
            string sqlString = "SELECT [ID],[Code] FROM [DealingPolicy] ORDER BY Code";
            SqlCommand cmd = new SqlCommand(sqlString, new SqlConnection(connectionString));
            try
            {
                cmd.Connection.Open();
                SqlDataReader myReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (myReader.Read())
                {
                    string dealingPolicyOption = string.Format("<option id='{0}' value='{0}'>{1}</option>", myReader.GetGuid(0), myReader.GetString(1));
                    dealingPolicyOptions += dealingPolicyOption;
                }
            }
            finally
            {
                if (cmd.Connection.State == ConnectionState.Open)
                    cmd.Connection.Close();
            }
            return dealingPolicyOptions;
        }

        public static bool SaveLog2(Token token, string ip, string objectIDs, string eventMessage, Guid transactionID, string transactionCode)
        {
            if (token == null) return true;
            if (string.IsNullOrEmpty(eventMessage)) return true;
            return DealingConsoleServer.SaveLog(token.UserID, ip, UserType.Dealer.ToString(), objectIDs, DateTime.Now, eventMessage, transactionID, transactionCode);
        }

        public static bool SaveLog(Guid userID, string ip, string role, string objectIDs, DateTime timestamp, string eventMessage, Guid transactionID, string transactionCode)
        {
            bool isSucced = true;
            string connectionString = System.Configuration.ConfigurationManager.AppSettings["ConnectionString"];
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            try
            {
                SqlCommand sqlCommand = new SqlCommand("P_SaveLog", sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                SqlParameter sqlParameter = sqlCommand.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier);
                sqlParameter.Value = userID;
                sqlParameter = sqlCommand.Parameters.Add("@IP", SqlDbType.NVarChar, 15);
                sqlParameter.Value = ip;
                sqlParameter = sqlCommand.Parameters.Add("@Role", SqlDbType.NVarChar, 30);
                sqlParameter.Value = role;
                sqlParameter = sqlCommand.Parameters.Add("@ObjectIDs", SqlDbType.NVarChar, 4000);
                if (string.IsNullOrEmpty(objectIDs))
                    sqlParameter.Value = DBNull.Value;
                else
                    sqlParameter.Value = objectIDs;
                sqlParameter = sqlCommand.Parameters.Add("@Timestamp", SqlDbType.DateTime);
                sqlParameter.Value = timestamp;
                sqlParameter = sqlCommand.Parameters.Add("@Event", SqlDbType.NVarChar, 4000);
                sqlParameter.Value = eventMessage;
                sqlParameter = sqlCommand.Parameters.Add("@TransactionID", SqlDbType.UniqueIdentifier);
                if (transactionID != Guid.Empty)
                {
                    sqlParameter.Value = transactionID;
                }
                sqlParameter = sqlCommand.Parameters.Add("@TransactionCode", SqlDbType.NVarChar, 100);
                if (string.IsNullOrEmpty(transactionCode))
                    sqlParameter.Value = DBNull.Value;
                else
                    sqlParameter.Value = transactionCode;

                sqlConnection.Open();
                sqlCommand.ExecuteNonQuery();
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.SaveLog", string.Format("UserID:{0},IP:{1},Role:{2},objectIDs:{3},Timestamp:{4},Event:{5},TransactionID:{6},TransactionCode:{7}\nException:{8}",
                    userID, ip, role, string.IsNullOrEmpty(objectIDs) ? "NULL" : objectIDs, timestamp.ToString("yyyy-MM-dd HH:mm:ss"), eventMessage, (transactionID != Guid.Empty) ? "NULL" : transactionID.ToString(), (string.IsNullOrEmpty(transactionCode)) ? "NULL" : transactionCode, ex), System.Diagnostics.EventLogEntryType.Error);

                isSucced = false;
            }
            finally
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                }
            }
            return (isSucced);
        }

        public static DataSet GetUserId(string name)
        {
            DataSet dataSet = null;
            using (SqlConnection sqlConnection = new SqlConnection(connectionStr))
            {
                sqlConnection.Open();
                string sql = string.Format("SELECT [ID] FROM dbo.Employee WHERE [Name]='{0}'", name);
                SqlCommand cmd = new SqlCommand(sql, sqlConnection);
                dataSet = new DataSet();
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(dataSet);
                sqlConnection.Close();
                return dataSet;
            }
        }
    }
}