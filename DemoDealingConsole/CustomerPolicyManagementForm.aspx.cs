using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using iExchange.Common;
using System.Collections;

namespace iExchange.DealingConsole
{
    public partial class CustomerPolicyManagementForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public string GetDealingPolicyOptions()
        {
            return DealingConsoleServer.GetDealingPolicyOptions();
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
        public string GetAccountGroupOptions()
        {
            Token token = (Token)this.Session["Token"];
            return DealingConsoleServer.GetAccountGroupOptions(token);
        }
    }
}