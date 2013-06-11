using System;
using iExchange.Common;
using System.Collections;

namespace iExchange.DealingConsole
{
	/// <summary>
	/// Summary description for ExecuteOrders.
	/// </summary>
	public partial class ExecuteOrders : System.Web.UI.Page
	{
		protected void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here
            this.AccountGroupLable.Text = this.GetLanguage("AccountGroup");
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

        public string GetAccountGroupOptions()
        {
            Token token = (Token)this.Session["Token"];
            return DealingConsoleServer.GetAllAccountGroupOptions(token);
        }
        public string GetLanguage(string key)
        {
            if (((Hashtable)Session["Common"]).ContainsKey(key))
            {
                return ((Hashtable)Session["Common"])[key].ToString();
            }
            else
            {
                return key;
            }
        }
	}
}
