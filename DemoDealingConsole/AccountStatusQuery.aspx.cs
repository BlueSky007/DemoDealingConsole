﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;

namespace iExchange.DealingConsole
{
    public partial class AccountStatusQuery : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //public void ShowAccountItem()
        //{
        //    string accountComboList = ((DealingConsoleServer)(this.Context.Application["DealingConsoleServer"])).GetAccountComboList();
        //    Page.Response.Write("<SELECT runat='server' id='account' name='account'>");
        //    Page.Response.Write(accountComboList);
        //    Page.Response.Write("</SELECT>");
        //}
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