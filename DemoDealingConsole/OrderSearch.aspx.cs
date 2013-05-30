using System;
using iExchange.Common;

namespace iExchange.DealingConsole
{
	/// <summary>
	/// Summary description for OrderSearch.
	/// </summary>
	public partial class OrderSearch : System.Web.UI.Page
	{
		protected void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here
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

	}
}
