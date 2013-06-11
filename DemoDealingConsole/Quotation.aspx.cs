using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Xml;

namespace iExchange.DealingConsole
{
	/// <summary>
	/// Summary description for WebForm2.
	/// </summary>
	public partial class Quotation : System.Web.UI.Page
	{
		protected void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here
		}

        public string GetSystemTimeString()
        {
            return DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss");
        }

        public string GetLoggedInfo()
        {
            if (this.Session["LoginId"] != null && this.Session["LoginTime"] != null)
            {
                return (string)this.Session["LoginId"] + " logged in at " + (string)this.Session["LoginTime"];
            }
            return string.Empty;
        }

        public XmlNode GetLanguageInfo()
        {
            if (this.Session["Test"] != null)
            {
                return (XmlNode)this.Session["Test"];
            }
            return null;
        }
        public string GetLanguage(string key)
        {
            if (((Hashtable)Session["LoginLanguage"]).ContainsKey(key))
            {
                return ((Hashtable)Session["LoginLanguage"])[key].ToString();
            }
            else
            {
                return key;
            }
        }
        public string NeedSendQuotationChangeAPSP()
        {
            var needSendQuotationChangeAPSPString = (string)System.Configuration.ConfigurationManager.AppSettings["NeedSendQuotationChangeAPSP"];
            bool needSendQuotationChangeAPSP = true;
            if (string.IsNullOrEmpty(needSendQuotationChangeAPSPString) || !bool.TryParse(needSendQuotationChangeAPSPString, out needSendQuotationChangeAPSP))
            {
                needSendQuotationChangeAPSP = true;
            }
            return needSendQuotationChangeAPSP ? "True" : "False";
        }

		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: This call is required by the ASP.NET Web Form Designer.
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
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
