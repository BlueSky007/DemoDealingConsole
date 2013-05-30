using System;
using System.Collections;
using System.ComponentModel;
using System.Configuration;
using System.Diagnostics;
using System.Web.Security;
using System.Web.Services;
using iExchange.Common;
using iExchange.Common.Client;
using System.Data;

namespace iExchange.DealingConsole
{
    /// <summary>
    /// Summary description for Service2.
    /// </summary>
    [WebService(Namespace = "http://www.omnicare.com/DealingConsole/")]
    public class Service2 : System.Web.Services.WebService
    {
        public Service2()
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

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        public void UnRegister(Token token)
        {
            this.Context.Application.Lock();
            this.Context.Application["IsRegistered"] = false;
            this.Context.Application.UnLock();
        }

        [WebMethod]
        public void AddCommand(Token token, Command command)
        {
            this.Context.Application.Lock();
            Commands commands = (Commands)this.Context.Application["Commands"];
            this.Context.Application.UnLock();

            //Do AddCommand
            commands.Add(token, command);

            //Log
            string isDebug = System.Configuration.ConfigurationSettings.AppSettings["IsDebug"];
            if (isDebug != null && Convert.ToBoolean(isDebug))
            {
                string logCommands = System.Configuration.ConfigurationSettings.AppSettings["LogCommands"];
                if (logCommands != null && (logCommands == "*" || logCommands.IndexOf(command.GetType().Name) > -1))
                {
                    iExchange.Common.AppDebug.LogEvent("DealingConsole.Service2.AddCommand", token.ToString() + "\n" + command.ToString(), System.Diagnostics.EventLogEntryType.Warning);
                }
            }
        }

        [WebMethod]
        public void UpdateLoginState(Token token, bool isLogin)
        {
            Hashtable tokens = (Hashtable)this.Application["Tokens"];
            tokens = Hashtable.Synchronized(tokens);
            if (isLogin)
            {
                this.Context.Application.Lock();
                tokens[token] = token;
                this.Context.Application.UnLock();
            }
            else
            {
                this.Context.Application.Lock();
                tokens.Remove(token);
                this.Context.Application.UnLock();
            }
        }

        [WebMethod(true)]
        public bool LoginAndAuthenticate(string userName, string password, ExchangeSystem exchangeSystem, out Guid userID, out string errorMsg)
        {
            return this.InnerLoginAndAuthenticate(userName, password, exchangeSystem, false, out userID, out errorMsg);
        }

        [WebMethod(EnableSession = true)]
        public bool Authenticate(string userName, string password, ExchangeSystem exchangeSystem, out Guid userID, out string errorMsg)
        {
            return this.InnerLoginAndAuthenticate(userName, password, exchangeSystem, true, out userID, out errorMsg);
        }

        private bool InnerLoginAndAuthenticate(string userName, string password, ExchangeSystem exchangeSystem, bool authenticateOnly, out Guid userID, out string errorMsg)
        {
            try
            {
                ParticipantServices.ParticipantServices participantServices = (ParticipantServices.ParticipantServices)Application["ParticipantServices"];
                userID = participantServices.Login(userName, password);
                if (userID == Guid.Empty)
                {
                    errorMsg = "User name not exists or password is invalid.";
                    return false;
                }

                SecurityServices.SecurityServices securityServices = (SecurityServices.SecurityServices)Application["SecurityServices"];
                Guid programID = new Guid(ConfigurationSettings.AppSettings["DealingConsole"]);
                Guid permissionID = new Guid(ConfigurationSettings.AppSettings["Run"]);
                bool isAuthrized = securityServices.CheckPermission(userID, programID, permissionID, "", "", userID, out errorMsg);
                if (isAuthrized == false)
                {
                    userID = Guid.Empty;
                    return false;
                }

                Token token = new Token(userID, UserType.System, AppType.DealingConsole);
                token.SessionID = this.Context.Session.SessionID;
                token.ExchangeSystem = exchangeSystem;
                this.Session["Token"] = token;
                bool success = this.StateServer.Login(token);
                if (success == false)
                {
                    userID = Guid.Empty;
                    errorMsg = "Login to stateServer failure.";
                    return false;
                }

                if (!authenticateOnly)
                {
                    FormsAuthentication.SetAuthCookie(userID.ToString(), false);

                    //Prevent be kickout
                    Hashtable sessionIDs = (Hashtable)this.Context.Application["SessionIDs"];
                    sessionIDs = Hashtable.Synchronized(sessionIDs);
                    sessionIDs[userID] = this.Context.Session.SessionID;
                }

                return true;
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole", exception.ToString(), EventLogEntryType.Error);
                throw;
            }
        }


        [WebMethod]
        public bool IsUserExistInDealingConsoleSystem(string name)
        {
            DataSet dataSet = DealingConsoleServer.GetUserId(name);
            SecurityServices.SecurityServices securityServices = (SecurityServices.SecurityServices)Application["SecurityServices"];
            Guid programID = new Guid(ConfigurationSettings.AppSettings["DealingConsole"]);
            Guid permissionID = new Guid(ConfigurationSettings.AppSettings["Run"]);
            bool isUserExist = false;
            string errorMsg;
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                Guid userId = (Guid)row["ID"];
                bool isAuthrized = securityServices.CheckPermission(userId, programID, permissionID, "", "", userId, out errorMsg);
                if (isAuthrized == true)
                {
                    isUserExist = true;
                    break;
                }
            }
            return isUserExist;
        }


    }
}
