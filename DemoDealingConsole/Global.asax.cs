using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.Net;
using System.Threading;
using System.Web.Security;
using iExchange.Common;
using iExchange.Common.Client;


namespace iExchange.DealingConsole
{
    /// <summary>
    /// Summary description for Global.
    /// </summary>
    public class Global : System.Web.HttpApplication
    {
        public Global()
        {
            InitializeComponent();
        }

        protected StateServerService StateServer
        {
            get { return (StateServerService)Application["StateServer"]; }
        }

        protected void Application_Start(Object sender, EventArgs e)
        {
            try
            {
                AppDebug.LogEvent("DealingConsole", "Application_Start", EventLogEntryType.Information);

                //Used for kickout--Michael
                this.Context.Application["SessionIDs"] = new Hashtable();

                this.Context.Application["IsRegistered"] = false;
                this.Context.Application["Commands"] = new Commands(new TimeSpan(0, 10, 0).TotalMilliseconds);
                this.Context.Application["Tokens"] = new Hashtable();

                StateServerService stateServer = new StateServerService();
                this.StateServerReadyCheck(stateServer);
                this.Context.Application["StateServer"] = stateServer;

                ParticipantServices.ParticipantServices participantServices = new ParticipantServices.ParticipantServices();
                Application["ParticipantServices"] = participantServices;
                SecurityServices.SecurityServices securityServices = new SecurityServices.SecurityServices();
                Application["SecurityServices"] = securityServices;


                //			this.Context.Application["IsRegistered"]=false;
                //			this.Context.Application["Commands"]=null;
                //			this.Context.Application["Tokens"]=new Hashtable();
                ////			this.Context.Application["Sessions"]=new Hashtable();
                //
                //			StateServer.Service stateServer=new StateServer.Service();
                //			this.Context.Application["StateServer"]=stateServer;
                //
                int commandSequence;
                Token token = new Token(Guid.Empty, UserType.System, AppType.DealingConsoleServer);
                DataSet dataSet = stateServer.GetInitData(token, null, out commandSequence);

                string connectionString = ConfigurationSettings.AppSettings["ConnectionString"];
                DealingConsoleServer dealingConsoleServer = new DealingConsoleServer(connectionString);
                dealingConsoleServer.Init(dataSet);
                this.Context.Application["DealingConsoleServer"] = dealingConsoleServer;

                AppDebug.LogEvent("DealingConsole", "DealingConsole started", EventLogEntryType.SuccessAudit);
            }
            catch (Exception exception)
            {
                AppDebug.LogEvent("DealingConsole", exception.ToString(), EventLogEntryType.Error);
            }
            //
            //
            //#if (PERMISSION)
            //			ParticipantServices.ParticipantServices  participantServices = new ParticipantServices.ParticipantServices();
            //			Application["ParticipantServices"] = participantServices;
            //			SecurityServices.SecurityServices securityServices = new SecurityServices.SecurityServices();
            //			Application["SecurityServices"] = securityServices; 
            //#endif
        }

        private void StateServerReadyCheck(StateServerService stateServer)
        {
            try
            {
                stateServer.HelloWorld();
            }
            catch (WebException webException)
            {
                if (webException.Status == WebExceptionStatus.Timeout)
                {
                    AppDebug.LogEvent("[DealingConsole] Application_Start", webException.ToString(), System.Diagnostics.EventLogEntryType.Error);
                    Thread.Sleep(TimeSpan.FromSeconds(5));
                    this.StateServerReadyCheck(stateServer);
                }
            }
        }
        protected void Session_Start(Object sender, EventArgs e)
        {
            //			this.Context.Application.Lock();
            //			bool isRegistered=(bool)this.Context.Application["IsRegistered"];
            //			StateServer.Service stateServer=(StateServer.Service)this.Context.Application["StateServer"];
            //			//Command 
            //			if(Application["Commands"]==null)
            //			{
            //				Commands commands=new Commands(new TimeSpan(0,this.Context.Session.Timeout,0).TotalMilliseconds); 
            //				Application["Commands"]=commands;
            //			}
            //			this.Context.Application.UnLock();
            //
            //			if(!isRegistered)
            //			{
            //				string serviceUrl=this.GetLocalServiceUrl();
            //				isRegistered=stateServer.Register(new Token(Guid.Empty,UserType.System,AppType.DealingConsole),serviceUrl);
            //
            //				this.Context.Application.Lock();
            //				this.Context.Application["IsRegistered"]=isRegistered;
            //				this.Context.Application.UnLock();
            //			}

            this.Context.Application.Lock();
            bool isRegistered = (bool)this.Context.Application["IsRegistered"];
            
            this.Context.Application.UnLock();

            if (!isRegistered)
            {
                string serviceUrl = this.GetLocalServiceUrl();

                isRegistered = this.StateServer.Register(new Token(Guid.Empty, UserType.System, AppType.DealingConsole), serviceUrl);

                this.Context.Application.Lock();
                this.Context.Application["IsRegistered"] = isRegistered;
                this.Context.Application.UnLock();
            }
        }

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {

        }

        protected void Application_EndRequest(Object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(Object sender, EventArgs e)
        {
            //Used for kickout--Michael
            if (!this.Context.Request.IsAuthenticated) return;

            string sessionID = this.Context.Request["ASP.NET_SessionId"];
            Hashtable sessionIDs = (Hashtable)this.Context.Application["SessionIDs"];
            sessionIDs = Hashtable.Synchronized(sessionIDs);
            if (sessionID != (string)sessionIDs[new Guid(this.Context.User.Identity.Name)])
            {
                FormsAuthentication.SignOut();
                this.Response.StatusCode = (int)System.Net.HttpStatusCode.Unauthorized;
            }
            /*
                        if(this.Context.Request.Path.IndexOf("Login.aspx")>0) return;

                        Hashtable sessions = (Hashtable)this.Context.Application["Sessions"];
                        if(this.User == null)	
                            return;

                        this.Application.Lock();
                        HttpSessionState session = (HttpSessionState)sessions[this.User.Identity.Name];
                        this.Application.UnLock();
                        if(session==null)
                        {
                            this.Context.Response.Redirect("Login.aspx");
                        }
                        else
                        {
                            Token token=(Token)session["Token"];
                            this.ValidateUser(token); 
                        }
            */
        }

        protected void Application_PreRequestHandlerExecute(Object sender, EventArgs e)
        {
            try
            {
                //Fix: sometime iis Restarted but client's session is still valid ???
                if (!this.Context.Request.IsAuthenticated) return;
                if (this.Context.Request.RawUrl.EndsWith("?WSDL")) return;
                if (this.Context.Session == null) return;//for not all web method are session enabled, so it maybe null!?

                Token token = (Token)this.Context.Session["Token"];
                if (token == null)
                {
                    FormsAuthentication.SignOut();
                    this.Response.StatusCode = (int)System.Net.HttpStatusCode.Unauthorized;
                }
            }
            catch (System.Exception ex)
            {
                AppDebug.LogEvent("DealingConsole.Application_PreRequestHandlerExecute", ex.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
        }

        protected void Application_Error(Object sender, EventArgs e)
        {

        }

        protected void Session_End(Object sender, EventArgs e)
        {
            //--Michael
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

                this.StateServer.Logout((Token)this.Session["Token"]);
            }

            //			Hashtable sessions = (Hashtable)this.Context.Application["Sessions"];
            //			this.Context.Application.Lock();
            //			sessions.Remove(this.Context.User);
            //		    this.Context.Application.UnLock();
        }

        protected void Application_End(Object sender, EventArgs e)
        {
            AppDebug.LogEvent("[DealingConsole]", "Application_End", EventLogEntryType.Information);

            string serviceUrl = this.GetLocalServiceUrl();
            this.StateServer.UnRegister(new Token(Guid.Empty, UserType.System, AppType.DealingConsole), serviceUrl);

            AppDebug.LogEvent("DealingConsole", "DealingConsole stopped", EventLogEntryType.SuccessAudit);
        }

        private string GetLocalServiceUrl()
        {
            string serviceUrl = ConfigurationSettings.AppSettings["ServiceUrl"];
            if (serviceUrl == null || serviceUrl.Trim().Length == 0)
            {
                string authority = this.Context.Request.Url.GetLeftPart(UriPartial.Authority);
                string host = Dns.GetHostName();
                authority = authority.Replace("localhost", host);

                serviceUrl = authority + this.Context.Request.ApplicationPath + "/Inner/Service2.asmx";
            }
            return serviceUrl;
        }

        //		private void ValidateUser(Token token)
        //		{
        //			Hashtable tokens = (Hashtable)this.Application["tokens"];
        //			if(!tokens.Contains(token))
        //			{
        //				//not login
        //				//redirect to login page
        //				this.Response.Redirect("Login.aspx");
        //			}
        //			else
        //			{
        //				this.Application.Lock();
        //				Token token2=(Token)tokens[token];	//get good token
        //				this.Application.UnLock();
        //				if(token.SessionID != token2.SessionID)
        //				{
        //					//logined in other place
        //					//redirect to disconnect page
        //					this.Response.Redirect("Login.aspx");
        //				}
        //			}
        //		}

        #region Web Form Designer generated code
        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
        }
        #endregion
    }
}

