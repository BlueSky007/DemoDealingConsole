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

using System.Data.SqlClient;
using iExchange.Common;

public partial class UpdateHistoryQuotation : System.Web.UI.Page
{
	protected void Page_Load(object sender, EventArgs e)
	{   
	}

    private DateTime CurrentTradeDay()
    {
        DataSet ds = new DataSet();
        string connectionString = ConfigurationSettings.AppSettings["ConnectionString"];
        SqlDataAdapter da = new SqlDataAdapter("SELECT dbo.FV_GetTradeDay(GETDATE())", connectionString);
        da.Fill(ds);
        
        DateTime dt = (DateTime)ds.Tables[0].Rows[0][0];
        return dt;
    }

    public string GetCurrentTradeDay()
    {
        DateTime dt = CurrentTradeDay();
        return dt.ToString("yyyy-MM-dd");
    }

    public string GetCurrentTradeDateTime()
    {
        DateTime dt = CurrentTradeDay();
        TimeSpan timeSpan = new TimeSpan(DateTime.Now.Hour, DateTime.Now.Minute, 0);
        return dt.Add(timeSpan).ToString("yyyy-MM-dd HH:mm");
    }

    public string GetCurrentTradeDateTime2()
    {
        DateTime dt = CurrentTradeDay();
        TimeSpan timeSpan = new TimeSpan(DateTime.Now.Hour, DateTime.Now.Minute,DateTime.Now.Second);
        return dt.Add(timeSpan).AddMilliseconds(DateTime.Now.Millisecond).ToString("yyyy-MM-dd HH:mm:ss.fff");
    }

    public string GetAllowDeleteOverridedQuotation()
    {
        string connectionString = ConfigurationSettings.AppSettings["ConnectionString"];
        string sql = @"SELECT AllowDeleteOverridedQuotation FROM dbo.SystemParameter";
        bool allowDeleteOverridedQuotation = (bool)DataAccess.ExecuteScalar(sql, connectionString);
        return allowDeleteOverridedQuotation?"TRUE":"FALSE";
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
