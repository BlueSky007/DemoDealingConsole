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

namespace iExchange.DealingConsole
{
	/// <summary>
	/// Summary description for ToolBar.
	/// </summary>
	public partial class ToolBar : System.Web.UI.Page
	{
	
		protected void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here
			if(Page.IsPostBack) return;
			this.Context.Session["LMTProcessDisplay"] = ((string)(System.Configuration.ConfigurationSettings.AppSettings["LMTProcessDisplay"]) == "true")?"inline":"none";
            

		}

        public string GetLanguage(string key)
        {
            if (((Hashtable)Session["TooBarPage"]).ContainsKey(key))
            {
                return ((Hashtable)Session["TooBarPage"])[key].ToString();
            }
            else
            {
                return key;
            }
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
