using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

public partial class DealerCanViewAccountInfoConfirm : System.Web.UI.Page
{
	protected void Page_Load(object sender, EventArgs e)
	{

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
