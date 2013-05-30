using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace iExchange.DealingConsole
{
    public partial class DealingPolicyForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public string GetDealingPolicyOptions()
        {
            return DealingConsoleServer.GetDealingPolicyOptions();
        }
    }
}
