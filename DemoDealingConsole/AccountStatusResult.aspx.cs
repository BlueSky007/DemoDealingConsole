using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using iExchange.Common;
using iExchange.Common.Client;
using System.Data;
using System.Xml;
using System.Collections;
using System.Text;

namespace iExchange.DealingConsole
{
    public partial class AccountStatusResult : System.Web.UI.Page
    {
        private Hashtable _Language;

        private static string[] arrOpenList;
        private static string[] arrOpenList2;

        private static string[] arrExecutedOrderList;
        private static string[] arrExecutedOrderList2;

        private static string[] arrUnExecutedOrderList;
        private static string[] arrUnExecutedOrderList2;

        #region difference with ReportCenter
        private void SetLanguage()
        {
            if (this.Session["AccountStatusLanguage"] == null)
            {
                this._Language = Language.GetLanguage("AccountStatus");

                this.Session["AccountStatusLanguage"] = this._Language;
            }
            else
            {
                this._Language = (Hashtable)this.Session["AccountStatusLanguage"];
            }
        }

        private DataSet GetReportData(string selectedPrice, Guid accountId)
        {
            StateServerService stateServer = (StateServerService)(this.Context.Application["StateServer"]);
            DealingConsoleServer dealingConsoleServer = ((DealingConsoleServer)(this.Context.Application["DealingConsoleServer"]));
            Token token = (Token)Session["Token"];
            DataSet dataSet = dealingConsoleServer.ReportAccountStatusAllData(stateServer, token, selectedPrice, accountId, Guid.Empty);
            return dataSet;
        }
        #endregion difference with ReportCenter

        protected void Page_Load(object sender, EventArgs e)
        {
            this.SetLanguage();

            Guid accountId = new Guid(Request.QueryString.GetValues("id").GetValue(0).ToString());
            string selectedPrice = (Request.QueryString.GetValues("SelectedPrice").GetValue(0).ToString() == "0") ? "AccountStatus" : "AccountStatus2";
            DataSet dataSet = this.GetReportData(selectedPrice, accountId);

            this.GetReport(dataSet);
            this.OutOpenOrderList(dataSet);
            this.OutCurrentTradeDayExecutedOrder(dataSet);
            this.OutUnExecutedOrderHtml(dataSet);
        }
        
        public enum AccountStatusAllDataTableIndex
        {
            Uncleared = 0,
            Account = 1,
            TradeDay = 2,
            AccountCurrency = 3,
            OverNightNecessary = 4,
            HedgingLevel = 5,
            AccountDeposit = 6,
            AccountAdjustment = 7,
            OpenOrder = 8,
            CurrentTradeDayExecutedOrder = 9,
            UnExecuteOrder = 10,
        }

        public string GetLanguage(string key)
        {
            if (((Hashtable)Session["AccountStatusLanguage"]).ContainsKey(key))
            {
                return ((Hashtable)Session["AccountStatusLanguage"])[key].ToString();
            }
            else
            {
                return key;
            }
        }

        private void OutOpenOrderList(DataSet dataSet)
        {
            arrOpenList2 = new string[] { "Date", "OrderCode", "Item", "B/S", "Lot", "Price", "Ref", "Comm.", "Levy", "Interest", "Storage", "Trade PL", "In", "Out" };
            arrOpenList = new string[]{this.GetLanguage("Date"),
                this.GetLanguage("OrderCode"),
                this.GetLanguage("Item"),
                this.GetLanguage("BuySell"),
                this.GetLanguage("Lot"),
                this.GetLanguage("Price"),
                this.GetLanguage("RefPrice"),
                this.GetLanguage("Commission"),
                this.GetLanguage("Levy"),
                this.GetLanguage("Interest"),
                this.GetLanguage("Storage"),
                this.GetLanguage("TradePL"),
                this.GetLanguage("RateIn"),
                this.GetLanguage("RateOut")
                };

            StringBuilder sb = new StringBuilder();
            sb.Append("<table border=\"1\" width=\"100%\" bordercolordark=\"#FFFFFF\" cellspacing=\"0\" bordercolorlight=\"#000000\">" + FillTitle());

            try
            {    
                if (dataSet != null || dataSet.Tables.Count >=9)
                {
                    DataTable openOrderDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.OpenOrder];
                    foreach (DataRow dataRow in openOrderDataTable.Rows)
                    {
                        string orderCode = (string)dataRow["OrderCode"];
                        string tradeDay = (string)dataRow["TradeDay"];
                        string instrumentCode = (string)dataRow["Item"];
                        string buySell = (string)dataRow["BS"];
                        string lot = dataRow["Lot"].ToString();
                        string price = dataRow["Price"].ToString();
                        string mktPrice = dataRow["MktPrice"].ToString();
                        decimal interest = Decimal.Zero;
                        Decimal.TryParse(dataRow["Interest"].ToString(), out interest);
                        decimal storage = Decimal.Zero;
                        Decimal.TryParse(dataRow["Storage"].ToString(), out storage);
                        decimal floatTrade = Decimal.Zero;
                        Decimal.TryParse(dataRow["FloatTrade"].ToString(), out floatTrade);
                        decimal rateIn = Decimal.Zero;
                        Decimal.TryParse(dataRow["RateIn"].ToString(), out rateIn);
                        decimal rateOut = Decimal.Zero;
                        Decimal.TryParse(dataRow["RateOut"].ToString(), out rateOut);
                        decimal decimals = Decimal.Zero;
                        Decimal.TryParse(dataRow["Decimals"].ToString(), out decimals);

                        string buySellColor = buySell == "B" ? "blue" : "red";
                        sb.Append("<tr>");

                        sb.Append("<td align=\"center\">" + tradeDay + "</td>");
                        sb.Append("<td align=\"center\">" + orderCode + "</td>");
                        sb.Append("<td align=\"center\">" + instrumentCode + "</td>");
                        sb.Append("<td align=\"center\" style=\"color:" + buySellColor + "\">" + buySell + "</td>");
                        sb.Append("<td align=\"center\">" + lot + "</td>");
                        sb.Append("<td align=\"right\">" + price + "</td>");
                        sb.Append("<td align=\"right\">" + (string.IsNullOrEmpty(mktPrice) ? "&nbsp;" : mktPrice) + "</td>");
                        sb.Append("<td align=\"right\">" + this.GetMoney2(interest) + "</td>");
                        sb.Append("<td align=\"right\">" + this.GetMoney2(storage) + "</td>");
                        sb.Append("<td align=\"right\">" + this.GetMoney2(floatTrade) + "</td>");
                        sb.Append("<td align=\"center\">" + this.GetMoney2(rateIn) + "</td>");
                        sb.Append("<td align=\"center\">" + this.GetMoney2(rateOut) + "</td>");

                        sb.Append("</tr>");
                    }
                }
            }
            catch (System.Exception exception)
            {
                AppDebug.LogEvent("ReportCenter.GetAccountStatus.OutOpenOrderList:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }

            sb.Append("</table>");
            sb.Append("<div><asp:Label runat=\"server\" style=\" font-size:20px;\" text=\"Current day\" Font-Bold=\"True\" ForeColor=\"#666699\" /></div>");
            OpenListDiv.InnerHtml = sb.ToString();
        }

        private string GetOrderType(string orderTypeId)
        {
            var orderTypeString = "";
            switch (orderTypeId)
            {
                case "0":
                    orderTypeString = "SPT";
                    break;
                case "1":
                    orderTypeString = "LMT";
                    break;
                case "2":
                    orderTypeString = "MKT";
                    break;
                case "3":
                    orderTypeString = "MOO";
                    break;
                case "4":
                    orderTypeString = "MOC";
                    break;
                case "5":
                    orderTypeString = "OCO";
                    break;
                case "6":
                    orderTypeString = "RSK";
                    break;
            }
            return orderTypeString;
        }

        private string FillTitle()
        {
            var title = "<tr>";
            for (int index = 0; index < arrOpenList.Length; index++)
            {
                var column = arrOpenList[index];
                var column2 = arrOpenList2[index];

                if (column2 == "Comm." || column2 == "Levy") continue;

                title += "<td align=\"center\" style=\"font-size: 12px;\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\" ><b>" + column + "</b></td>";
            }
            title += "</tr>";

            return title;
        }

        private void OutUnExecutedOrderHtml(DataSet dataSet)
        {
            arrUnExecutedOrderList2 = new string[] { "Submit Time", "EndTime", "OrderCode", "Item", "N/C", "B/S", "Lot", "Lot Bal.", "Set Price", "C Size", "OrderType", "Open Position" };
            arrUnExecutedOrderList = new string[]{
                this.GetLanguage("SubmitTime"),
                 this.GetLanguage("EndTime"),
                this.GetLanguage("OrderCode"),
                this.GetLanguage("Item"),
                this.GetLanguage("IsOpen"),
                this.GetLanguage("IsBuy"),
                this.GetLanguage("Lot"),
                this.GetLanguage("LotBalance"),
                this.GetLanguage("SetPrice"),
                this.GetLanguage("ContractSize"),
                this.GetLanguage("OrderType"),
                this.GetLanguage("OpenPosition")
                };

            StringBuilder sb = new StringBuilder();
            sb.Append("<table border=\"1\" width=\"100%\" bordercolordark=\"#FFFFFF\" cellspacing=\"0\" bordercolorlight=\"#000000\">" + FillUnExecutedOrderTitle());

            try
            {
                if (dataSet != null || dataSet.Tables.Count >= 10)
                {
                    DataTable currentTradeDayExecutedOrderDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.UnExecuteOrder];
                    foreach (DataRow dataRow in currentTradeDayExecutedOrderDataTable.Rows)
                    {
                        string submitTime = ((DateTime)dataRow["SubmitTime"]).ToString("yyyy-MM-dd HH:mm:ss");
                        string endTime = ((DateTime)dataRow["EndTime"]).ToString("yyyy-MM-dd HH:mm:ss");
                        string orderCode = dataRow["OrderCode"].ToString();
                        string item = dataRow["InstrumentCode"].ToString();
                        string openClose = (bool)dataRow["IsOpen"] ? "N" : "C";
                        string buySell = (bool)dataRow["IsBuy"] ? "B" : "S";
                        string lot = dataRow["Lot"].ToString();
                        string lotBalance = dataRow["LotBalance"].ToString();
                        string setPrice = dataRow["SetPrice"] == DBNull.Value ? "&nbsp" : dataRow["SetPrice"].ToString();
                        string contractSize = dataRow["ContractSize"] == DBNull.Value ? "" : dataRow["ContractSize"].ToString();
                        string orderType =this.GetOrderType(dataRow["OrderTypeId"].ToString());
                        string openPosition = dataRow["OpenPosition"].ToString();
                        openPosition = (string.IsNullOrEmpty(openPosition) ? "&nbsp;" : openPosition);
                        openPosition = openPosition.Replace("...", "<br \\>");

                        string buySellColor = buySell == "B" ? "blue" : "red";
                        sb.Append("<tr>");

                        sb.Append("<td align=\"center\">" + submitTime + "</td>");
                        sb.Append("<td align=\"center\">" + endTime + "</td>");
                        sb.Append("<td align=\"center\">" + orderCode + "</td>");
                        sb.Append("<td align=\"center\">" + item + "</td>");
                        sb.Append("<td align=\"center\">" + openClose + "</td>");
                        sb.Append("<td align=\"center\" style=\"color:" + buySellColor + "\">" + buySell + "</td>");
                        sb.Append("<td align=\"center\">" + lot + "</td>");
                        sb.Append("<td align=\"right\">" + lotBalance + "</td>");
                        sb.Append("<td align=\"right\">" + setPrice + "</td>");
                        sb.Append("<td align=\"right\">" + contractSize + "</td>");
                        sb.Append("<td align=\"right\">" + orderType + "</td>");
                        sb.Append("<td align=\"right\">" + openPosition + "</td>");

                        sb.Append("</tr>");
                    }
                }
            }
            catch (System.Exception exception)
            {
                AppDebug.LogEvent("ReportCenter.GetAccountStatus.OutUnExecutedOrder:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }

            sb.Append("</table>");

            this._UnExcuteOrderListDiv.InnerHtml = sb.ToString();
        }

        private void OutCurrentTradeDayExecutedOrder(DataSet dataSet)
        {
            arrExecutedOrderList2 = new string[] { "Date", "OrderCode", "Item", "N/C", "B/S", "Lot", "Price", "C.Size", "Type", "Commission","Levy","TradePL","Position", "Dealer" };
            arrExecutedOrderList = new string[]{this.GetLanguage("ExecuteTime"),
                this.GetLanguage("OrderCode"),
                this.GetLanguage("InstrumentCode"),
                this.GetLanguage("IsOpen"),
                this.GetLanguage("IsBuy"),
                this.GetLanguage("Lot"),
                this.GetLanguage("ExecutePrice"),
                this.GetLanguage("ContractSize"),
                this.GetLanguage("OrderType"),
                this.GetLanguage("Commission"),
                this.GetLanguage("Levy"),
                this.GetLanguage("TradePL"),
                this.GetLanguage("OpenPosition"),
                this.GetLanguage("Dealer")
                };

            StringBuilder sb = new StringBuilder();
            sb.Append("<table border=\"1\" width=\"100%\" bordercolordark=\"#FFFFFF\" cellspacing=\"0\" bordercolorlight=\"#000000\">" + FillCurrentTradeDayExecutedOrderTitle());
            
            try
            {
                if (dataSet != null || dataSet.Tables.Count >= 10)
                {
                    DataTable currentTradeDayExecutedOrderDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.CurrentTradeDayExecutedOrder];
                    foreach (DataRow dataRow in currentTradeDayExecutedOrderDataTable.Rows)
                    {
                        string executeTime = ((DateTime)dataRow["ExecuteTime"]).ToString("yyyy-MM-dd HH:mm:ss");
                        string orderCode = (string)dataRow["OrderCode"];
                        string instrumentCode = (string)dataRow["InstrumentCode"];
                        string isOpen = ((bool)dataRow["IsOpen"]) ? "N" : "C";
                        string isBuy = ((bool)dataRow["IsBuy"]) ? "B" : "S";
                        string lot = dataRow["Lot"].ToString();
                        string executePrice = dataRow["ExecutePrice"].ToString();
                        string contractSize = dataRow["ContractSize"].ToString();
                        string orderTypeID = (string)dataRow["OrderTypeID"];
                        decimal commission = Decimal.Zero;
                        Decimal.TryParse(dataRow["Commission"].ToString(), out commission);
                        decimal levy = Decimal.Zero;
                        Decimal.TryParse(dataRow["Levy"].ToString(), out levy);
                        decimal tradePL = Decimal.Zero;
                        Decimal.TryParse(dataRow["TradePL"].ToString(), out tradePL);
                        string openPosition = dataRow["OpenPosition"].ToString();
                        openPosition = (string.IsNullOrEmpty(openPosition) ? "&nbsp;" : openPosition);
                        openPosition = openPosition.Replace("...","<br \\>");
                        string dealer = dataRow["Dealer"].ToString();

                        string buySellColor = isBuy == "B" ? "blue" : "red";
                        sb.Append("<tr>");

                        sb.Append("<td align=\"center\">" + executeTime + "</td>");
                        sb.Append("<td align=\"center\">" + orderCode + "</td>");
                        sb.Append("<td align=\"center\">" + instrumentCode + "</td>");
                        sb.Append("<td align=\"center\">" + isOpen + "</td>");
                        sb.Append("<td align=\"center\" style=\"color:" + buySellColor + "\">" + isBuy + "</td>");
                        sb.Append("<td align=\"center\">" + lot + "</td>");
                        sb.Append("<td align=\"right\">" + executePrice + "</td>");
                        sb.Append("<td align=\"right\">" + contractSize + "</td>");
                        sb.Append("<td align=\"center\">" + orderTypeID + "</td>");
                        sb.Append("<td align=\"right\">" + this.GetMoney2(commission) + "</td>");
                        sb.Append("<td align=\"right\">" + this.GetMoney2(levy) + "</td>");
                        sb.Append("<td align=\"right\">" + this.GetMoney2(tradePL) + "</td>");
                        sb.Append("<td align=\"left\">" + openPosition + "</td>");
                        sb.Append("<td align=\"center\">" + dealer + "</td>");

                        sb.Append("</tr>");
                    }
                }
            }
            catch (System.Exception exception)
            {
                AppDebug.LogEvent("ReportCenter.GetAccountStatus.OutCurrentTradeDayExecutedOrder:", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }

            sb.Append("</table>");
            _CurrentTradeDayOrderListDiv.InnerHtml = sb.ToString();
        }

        private string FillUnExecutedOrderTitle()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<tr>");
            for (int index = 0; index < arrUnExecutedOrderList.Length; index++)
            {
                var column = arrUnExecutedOrderList[index];
                var column2 = arrUnExecutedOrderList2[index];
                sb.Append("<td align=\"center\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\" ><b>" + column + "</b></td>");
            }
            sb.Append("</tr>");

            return sb.ToString();
        }

        private string FillCurrentTradeDayExecutedOrderTitle()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<tr>");
            for (int index = 0; index < arrExecutedOrderList.Length; index++)
            {
                var column = arrExecutedOrderList[index];
                var column2 = arrExecutedOrderList2[index];

                sb.Append("<td align=\"center\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\" ><b>" + column + "</b></td>");
            }
            sb.Append("</tr>");

            return sb.ToString();
        }

        private void GetReport(DataSet dataSet)
        {
            if (dataSet == null || dataSet.Tables.Count < 8) return;

            DataTable unclearedDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.Uncleared];
            DataTable accountDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.Account];
            DataTable tradeDayDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.TradeDay];
            DataTable accountCurrencyDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.AccountCurrency];
            DataTable overNightNecessaryDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.OverNightNecessary];
            DataTable hedgingLevelDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.HedgingLevel];
            DataTable accountDepositDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.AccountDeposit];
            DataTable accountAdjustmentDataTable = dataSet.Tables[(int)AccountStatusAllDataTableIndex.AccountAdjustment];

            StringBuilder sb = new StringBuilder();
            int isMultiCur = 0;

            string overNightNecessary = overNightNecessaryDataTable.Rows[0]["OverNightNecessary"].ToString();
            decimal uncleared = Decimal.Zero;
            Decimal.TryParse(unclearedDataTable.Rows[0]["Uncleared"].ToString(), out uncleared);
            string tradeDay = tradeDayDataTable.Rows[0]["TradeDay"].ToString();

            string organizationCode = accountDataTable.Rows[0]["OrganizationCode"].ToString();
            string accountCode = accountDataTable.Rows[0]["AccountCode"].ToString();
            string accountName = accountDataTable.Rows[0]["AaccountName"].ToString();
            accountName = string.IsNullOrEmpty(accountName) ? "&nbsp" : accountName;
            string currencyCode = accountDataTable.Rows[0]["CurrencyCode"].ToString();
            string sMultiCur = accountDataTable.Rows[0]["IsMultiCurrency"].ToString().Trim().ToLower();
            string credit = accountDataTable.Rows[0]["Credit"].ToString();	//5
            //string crLot = accountDataTable.Rows[0]["CrLot"].ToString();	//6
            string startDate = ((DateTime)accountDataTable.Rows[0]["StartDate"]).ToString("yyyy-MM-dd");	//6
            string saleCode = accountDataTable.Rows[0]["SaleCode"].ToString();	//7
            string accountGroupCode = accountDataTable.Rows[0]["AccountGroupCode"].ToString();	//8
            string sMAmount = accountDataTable.Rows[0]["SMAmount"].ToString();	//8
            string level = hedgingLevelDataTable.Rows[0]["HedgingLevel"].ToString();
            string accountDescription = accountDataTable.Rows[0]["AccountDescription"].ToString();
            accountDescription = string.IsNullOrEmpty(accountDescription) ? "&nbsp" : accountDescription;

            decimal accBalance = decimal.Zero;
            decimal accEquity = decimal.Zero;
            decimal accNecessary = decimal.Zero;
            decimal accUsable = decimal.Zero;
            decimal accRatio = decimal.Zero;
            decimal accNotValue = decimal.Zero;
            decimal accFloating = decimal.Zero;
            decimal accOverNightNecessary = decimal.Zero;
            decimal accOverNightUsable = decimal.Zero;
            //string accCall = "0";

            decimal accDeposit = decimal.Zero;
            decimal accAdjustment = decimal.Zero;
            if (accountDepositDataTable.Rows.Count > 0)
            {
                Decimal.TryParse(accountDepositDataTable.Rows[0]["AccDeposit"].ToString(), out accDeposit);
            }
            if (accountAdjustmentDataTable.Rows.Count > 0)
            {
                Decimal.TryParse(accountAdjustmentDataTable.Rows[0]["AccAdjustment"].ToString(), out accAdjustment);
            }

            if (accountCurrencyDataTable.Rows.Count > 0)
            {
                Decimal.TryParse(accountCurrencyDataTable.Rows[0]["AccBalance"].ToString(), out accBalance);
                Decimal.TryParse(accountCurrencyDataTable.Rows[0]["AccEquity"].ToString(), out accEquity);
                Decimal.TryParse(accountCurrencyDataTable.Rows[0]["AccNecessary"].ToString(), out accNecessary);
                Decimal.TryParse(accountCurrencyDataTable.Rows[0]["AccUsable"].ToString(), out accUsable);
                Decimal.TryParse(accountCurrencyDataTable.Rows[0]["AccRatio"].ToString(), out accRatio);
                Decimal.TryParse(accountCurrencyDataTable.Rows[0]["AccNotValue"].ToString(), out accNotValue);
                Decimal.TryParse(accountCurrencyDataTable.Rows[0]["AccFloating"].ToString(), out accFloating);
                Decimal.TryParse(accountCurrencyDataTable.Rows[0]["AccOverNightUsable"].ToString(), out accOverNightUsable);
                Decimal.TryParse(accountCurrencyDataTable.Rows[0]["AccOverNightNecessary"].ToString(), out accOverNightNecessary);
                //accCall = accountCurrencyDataTable.Rows[0]["AccCall"].ToString();
            }

            int iCount = accountCurrencyDataTable.Rows.Count;

            if (sMultiCur == "true")
                isMultiCur = 1;
            else
                isMultiCur = 0;

            ArrayList arrCurrency = new ArrayList();
            ArrayList arrBalance = new ArrayList();
            ArrayList arrEquity = new ArrayList();
            ArrayList arrNecessary = new ArrayList();
            ArrayList arrUsable = new ArrayList();
            ArrayList arrRatio = new ArrayList();
            ArrayList arrNotValue = new ArrayList();
            ArrayList arrFloating = new ArrayList();
            ArrayList arrDeposit = new ArrayList();
            ArrayList arrAdjustment = new ArrayList();
            ArrayList arrOverNightUsable = new ArrayList();
            ArrayList arrOverNightNecessary = new ArrayList();

            for (int i = 0; i < iCount; i++)
            {
                decimal curOverNightNecessary = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["CurOverNightNecessary"].ToString(), out curOverNightNecessary);
                arrOverNightNecessary.Add(curOverNightNecessary);
            }

            for (int i = 0; i < iCount; i++)
            {
                decimal curOverNightUsable = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["CurOverNightUsable"].ToString(), out curOverNightUsable);
                arrOverNightUsable.Add(curOverNightUsable);
            }

            for (int i = 0; i < iCount; i++)
            {
                decimal curFloating = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["CurFloating"].ToString(), out curFloating);
                arrFloating.Add(curFloating);
            }

            for (int i = 0; i < iCount; i++)
            {
                decimal curDeposit = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["CurDeposit"].ToString(), out curDeposit);
                arrDeposit.Add(curDeposit);
            }

            for (int i = 0; i < iCount; i++)
            {
                decimal curAdjustment = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["CurAdjustment"].ToString(), out curAdjustment);
                arrAdjustment.Add(curAdjustment);
            }

            for (int i = 0; i < iCount; i++)
            {
                decimal curNotValue = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["CurNotValue"].ToString(), out curNotValue);
                arrNotValue.Add(curNotValue);
            }
            for (int i = 0; i < iCount; i++)
            {
                arrCurrency.Add(accountCurrencyDataTable.Rows[i]["CurrencyCode"].ToString());
            }

            for (int i = 0; i < iCount; i++)
            {
                decimal curBalance = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["curBalance"].ToString(), out curBalance);
                arrBalance.Add(curBalance);
            }

            for (int i = 0; i < iCount; i++)
            {
                decimal curEquity = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["curEquity"].ToString(), out curEquity);
                arrEquity.Add(curEquity);
            }

            for (int i = 0; i < iCount; i++)
            {
                decimal curNecessary = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["curNecessary"].ToString(), out curNecessary);
                arrNecessary.Add(curNecessary);
            }
            for (int i = 0; i < iCount; i++)
            {
                decimal curUsable = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["CurUsable"].ToString(), out curUsable);
                arrUsable.Add(curUsable);
            }
            for (int i = 0; i < iCount; i++)
            {
                decimal curRatio = Decimal.Zero;
                Decimal.TryParse(accountCurrencyDataTable.Rows[i]["curRatio"].ToString(), out curRatio);
                arrRatio.Add(curRatio);
            }

            sb.Append("<table border=\"1\" width=\"100%\" bordercolordark=\"#FFFFFF\" cellspacing=\"0\" bordercolorlight=\"#000000\"> ");
            sb.Append("  <tr>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["AccountCode"].ToString() + "</b></td>");
            sb.Append("    <td width=\"12%\"> " + accountCode + "</td>");
            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["TradeDay"].ToString() + "</b></td>");
            sb.Append("    <td width=\"13%\">" + tradeDay + "</td>");
            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["Currency"].ToString() + "</b></td>");
            sb.Append("    <td width=\"13%\">" + currencyCode + "</td>");
            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["IsMultiCur"].ToString() + "</b></td>");
            sb.Append("    <td width=\"13%\">");
            if (isMultiCur == 0)
            {
                sb.Append("<input type=checkbox>");
            }
            else
            {
                sb.Append("<input type=checkbox checked>");
            }

            sb.Append("</td>");
            sb.Append("  </tr>");
            sb.Append("  <tr>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["AccountName"].ToString() + "</b></td>");
            sb.Append("    <td width=\"12%\">" + accountName + "</td>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["Employee"].ToString() + "</b></td>");
            sb.Append("    <td width=\"12%\">" + saleCode + "</td>");
            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["AccountGroup"].ToString() + "</b></td>");
            sb.Append("    <td width=\"13%\">" + accountGroupCode + "</td>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["Organization"].ToString() + "</b></td>");
            sb.Append("    <td width=\"12%\">" + organizationCode + "</td>");


            sb.Append("  </tr>");
            sb.Append("  <tr>");
            sb.Append("<td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["StartDate"].ToString() + "</b></td>");
            sb.Append("    <td width=\"12%\">" + startDate + "</td>");
            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["SMAmount"].ToString() + "</b></td>");
            sb.Append("    <td width=\"13%\">" + sMAmount + "</td>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["Credit"].ToString() + "</b></td>");
            sb.Append("    <td width=\"12%\">" + credit + "</td>");



            sb.Append("</td>");
            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["Uncleared"].ToString() + "</b></td>");
            sb.Append("    <td width=\"13%\" align=right>" + this.GetMoney2(uncleared) + "</td>");
            sb.Append("  </tr>");
            sb.Append("  <tr>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            //sb.Append(GetAccountStatusImg("Call",this._Language["Call"].ToString(), isMultiCur, arrCurrency, arrCall));
            sb.Append("<b>" + this._Language["AccountDescription"].ToString() + "</b>");
            sb.Append("</td>");
            sb.Append("    <td width=\"12%\">");
            sb.Append(accountDescription);
            //sb.Append(GetAccountStatusValue("Call", isMultiCur, accCall));
            sb.Append("</td>");

            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            sb.Append(GetAccountStatusImg("NotValue", this._Language["NotValue"].ToString(), isMultiCur, arrCurrency, arrNotValue));

            sb.Append("     </td>");
            sb.Append("    <td width=\"12%\">");
            sb.Append(GetAccountStatusValue("NotValue", isMultiCur, accNotValue, arrNotValue));

            sb.Append("</td>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            sb.Append(GetAccountStatusImg("Balance", this._Language["Balance"].ToString(), isMultiCur, arrCurrency, arrBalance));
            sb.Append("</td>");
            sb.Append("    <td width=\"12%\" align=right>");
            sb.Append(GetAccountStatusValue("Balance", isMultiCur, accBalance, arrBalance));

            sb.Append("</td>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            sb.Append(GetAccountStatusImg("Equity", this._Language["Equity"].ToString(), isMultiCur, arrCurrency, arrEquity));
            sb.Append("</td>");
            sb.Append("    <td width=\"12%\">");
            sb.Append(GetAccountStatusValue("Equity", isMultiCur, accEquity, arrEquity));

            sb.Append("</td>");
            sb.Append("  </tr>");
            sb.Append("  <tr>");
            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            sb.Append(GetAccountStatusImg("Necessary", this._Language["Necessary"].ToString(), isMultiCur, arrCurrency, arrNecessary));
            sb.Append("</td>");
            sb.Append("    <td width=\"13%\">");
            sb.Append(GetAccountStatusValue("Necessary", isMultiCur, accNecessary, arrNecessary));

            sb.Append("</td>");
            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            sb.Append(GetAccountStatusImg("Usable", this._Language["Usable"].ToString(), isMultiCur, arrCurrency, arrUsable));
            sb.Append("		</td>");
            sb.Append("    <td width=\"13%\">");
            sb.Append(GetAccountStatusValue("Usable", isMultiCur, accUsable, arrUsable));

            sb.Append("</td>");
            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            sb.Append(GetAccountStatusImg("Floating", this._Language["Floating"].ToString(), isMultiCur, arrCurrency, arrFloating));
            sb.Append("	</td>");
            sb.Append("    <td width=\"13%\">");
            sb.Append(GetAccountStatusValue("Floating", isMultiCur, accFloating, arrFloating));
            sb.Append("</td>");
            //sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            //sb.Append(GetAccountStatusImg("Ratio", isMultiCur, arrCurrency, arrRatio));

            sb.Append("    <td width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["Ratio"].ToString() + "</b></td>");
            sb.Append("    <td width=\"13%\" align=right>" + this.GetMoney2(accRatio) + "</td>");

            //strTop +=	"</td>";
            //sb.Append("    <td width=\"13%\">");
            //sb.Append(GetAccountStatusValue("Ratio", isMultiCur, accRatio));


            sb.Append("  </tr>");
            sb.Append("  <tr>");
            sb.Append("    <td  width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\" colspan=1>");
            sb.Append(GetAccountStatusImg("OverNightNecessary", this._Language["ONNecessary"].ToString(), isMultiCur, arrCurrency, arrOverNightNecessary));
            sb.Append("</td>");
            sb.Append("    <td width=\"13%\">");
            sb.Append(GetAccountStatusValue("OverNightNecessary", isMultiCur, accOverNightNecessary, arrOverNightNecessary));

            sb.Append("    <td align=right width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" >");
            //sb.Append("<table border=0 width=100%><tr><td>");
            sb.Append(GetAccountStatusImg("ON_Usable", this._Language["ONUsable"].ToString(), isMultiCur, arrCurrency, arrOverNightUsable));
            sb.Append("</td><td colspan=1 align=right>");
            sb.Append(GetAccountStatusValue("ON_Usable", isMultiCur, accOverNightUsable, arrOverNightUsable));
            //sb.Append("</td></tr></table>");
            sb.Append("</td>");

            //Erric
            sb.Append("    <td  width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            sb.Append(GetAccountStatusImg("Deposit", this._Language["Deposit"].ToString(), isMultiCur, arrCurrency, arrDeposit));
            sb.Append("	</td>");
            sb.Append("    <td width=\"13%\">");
            sb.Append(GetAccountStatusValue("Deposit", isMultiCur, accDeposit, arrDeposit) + "</td>");

            sb.Append("    <td  width=\"13%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\">");
            sb.Append(GetAccountStatusImg("Adjustment", this._Language["Adjustment"].ToString(), isMultiCur, arrCurrency, arrAdjustment));
            sb.Append("	</td>");
            sb.Append("    <td width=\"13%\">");
            sb.Append(GetAccountStatusValue("Adjustment", isMultiCur, accAdjustment, arrAdjustment) + "</td>");

            sb.Append("  </tr>");
            sb.Append("  <tr>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\"><b>" + this._Language["Level"].ToString() + "</b></td>");
            sb.Append("    <td width=\"12%\" bgcolor=\"#E4E4E4\" bordercolorlight=\"#000000\" bordercolordark=\"#FFFFFF\" colspan=7>");


            level = level.Replace("No Open Position", this._Language["NoOpenPosition"].ToString());
            level = level.Replace("Fully Hedge", this._Language["FullyHedge"].ToString());
            level = level.Replace("CallPrice", this._Language["CallPrice"].ToString());
            level = level.Replace("CutPrice", this._Language["CutPrice"].ToString());

            level = level.Replace("Instrument", this._Language["LevelInstrument"].ToString());
            level = level.Replace("P/L", this._Language["LevelPL"].ToString());
            level = level.Replace("Net Lot", this._Language["LevelNetLot"].ToString());
            level = level.Replace("BUY", this._Language["LevelBuy"].ToString());
            level = level.Replace("SELL", this._Language["LevelSell"].ToString());
            level = level.Replace("RateIn", this._Language["LevelRateIn"].ToString());
            level = level.Replace("RateOut", this._Language["LevelRateOut"].ToString());
            level = level.Replace("Lot", this._Language["LevelLot"].ToString());
            level = level.Replace("Average", this._Language["LevelAverage"].ToString());

            sb.Append(level);
            sb.Append("</td>");
            sb.Append("  </tr>");
            sb.Append("</table>");
            top.InnerHtml = "<table border=0 cellspacing = 0 cellpadding = 0 width=\"100%\"><tr><td>" + sb.ToString() + "</td></tr></table>";
        }

        private string GetAccountStatusValue(string str, int isMultiCur, decimal val, ArrayList arrValue)
        {
            string displayStr = isMultiCur == 1 ? "block" : "none";
            StringBuilder curValueSB = new StringBuilder();
            if (arrValue != null)
            {
                curValueSB.Append("<table cellspacing=0 cellpadding=0 border=0 width=100%>");
                foreach (decimal dval in arrValue)
                {
                    curValueSB.Append("<tr>");
                    curValueSB.Append("<td align=right>");
                    curValueSB.Append(this.GetMoney2(dval));
                    curValueSB.Append("</td>");
                    curValueSB.Append("</tr>");
                }
                curValueSB.Append("</table>");
            }
            StringBuilder htmlSB = new StringBuilder();
            htmlSB.Append("		<table border=0 width=100% cellspacing=0 cellpadding=0>");
            htmlSB.Append("			<tr>");
            htmlSB.Append("				<td align=right>");
            htmlSB.Append(this.GetMoney2(val));
            htmlSB.Append("				</td>");
            htmlSB.Append("			</tr>");
            htmlSB.Append("			<tr>");
            htmlSB.Append("				<td id=DIVTRDetail" + str + " style=\"display:" + displayStr + ";\">" + curValueSB.ToString());
            htmlSB.Append("				</td>");
            htmlSB.Append("			</tr>");
            htmlSB.Append("		</table>");
            return htmlSB.ToString();

        }

        private string GetAccountStatusImg(string str, string sCode, int isMultiCur, ArrayList arrCurrency, ArrayList arrValue)
        {
            string displayStr = isMultiCur == 1 ? "block" : "none";
            StringBuilder imgSB = new StringBuilder();
            StringBuilder curHtmlSB = new StringBuilder();
            curHtmlSB.Append("<table cellspacing=0 cellpadding=0 border=0 width=100%>");
            foreach (string currency in arrCurrency)
            {
                curHtmlSB.Append("<tr>");
                curHtmlSB.Append("<td align=right><b>");
                curHtmlSB.Append(currency);
                curHtmlSB.Append("</b></td>");
                curHtmlSB.Append("</tr>");
            }
            curHtmlSB.Append("</table>");

            StringBuilder curValueSB = new StringBuilder();
            curValueSB.Append("<table cellspacing=0 cellpadding=0 border=0 width=100%>");
            foreach (decimal val in arrValue)
            {
                curValueSB.Append("<tr>");
                curValueSB.Append("<td align=right>");
                curValueSB.Append(this.GetMoney2(val));
                curValueSB.Append("</td>");
                curValueSB.Append("</tr>");
            }
            curValueSB.Append("</table>");
            /*
			string sCode ;
			if (str.ToLower() == "notvalue")
			{
				sCode = "Not Valued Bal";
			}
			else
			{
				sCode = str;
			}
            */

            sCode = "<nobr>" + sCode;
            imgSB.Append("<table width=100% border=0 cellspacing=0 cellpadding =0><tr><td width=2>");
            imgSB.Append("<div id=DIVImg" + str + ">");
            if (isMultiCur == 1)
            {
                imgSB.Append("<img onClick=\"details" + str + "(1)\" style=\"cursor:hand;\" src=\"images/tree_symbol_expand.gif\">");
            }
            imgSB.Append("</div>");
            imgSB.Append("</td><td>");
            imgSB.Append("	<b>" + sCode + "</b></td>");
            imgSB.Append("</tr>");
            imgSB.Append("<tr >");
            imgSB.Append("<td id=DIVTR" + str + " style=\"display:" + displayStr + "\" colspan=2>" + curHtmlSB.ToString());
            imgSB.Append("</td>");
            imgSB.Append("</tr>");
            imgSB.Append("</table>");
            imgSB.Append("<script language=javascript>");
            imgSB.Append(" function details" + str + "(flag)");
            imgSB.Append(" {");
            imgSB.Append(" if (flag == 1) {");
            imgSB.Append(" eval('document.all.DIVImg" + str + "').innerHTML = '<img style=\"cursor:hand;\" onClick=\"details" + str + "(0)\" src=\"images/tree_symbol_expand.gif\">';");
            imgSB.Append(" eval('document.all.DIVTR" + str + "').innerHTML ='" + curHtmlSB.ToString() + "';");
            imgSB.Append(" eval('document.all.DIVTR" + str + "').style.display ='block';");

            imgSB.Append(" eval('document.all.DIVTRDetail" + str + "').innerHTML ='" + curValueSB.ToString() + "';");
            imgSB.Append(" eval('document.all.DIVTRDetail" + str + "').style.display ='block';");

            imgSB.Append("}");
            imgSB.Append(" else {");
            imgSB.Append(" eval('document.all.DIVImg" + str + "').innerHTML = '<img style=\"cursor:hand;\" onClick=\"details" + str + "(1)\" src=\"images/tree_symbol_collapse.gif\">';");
            imgSB.Append(" eval('document.all.DIVTR" + str + "').style.display ='none';");
            imgSB.Append(" eval('document.all.DIVTRDetail" + str + "').style.display ='none';");
            imgSB.Append("}");
            imgSB.Append(" }");
            imgSB.Append("</script>");
            return imgSB.ToString();
        }

        private string GetMoney2(object o)
        {
            return String.Format("{0:###,###,###,##0.00}", o);
        }

        public string GetLanguageString(string key)
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
        //private string GetMoney(string str)
        //{
        //    int i = str.IndexOf(".");
        //    string temp = "";
        //    string sInt;
        //    if (i == -1)		//none
        //    {
        //        temp = str + ".00";
        //    }
        //    else
        //    {
        //        try
        //        {
        //            string deci = str.Substring(i + 1, (str.Length - i - 1));
        //            sInt = str.Substring(0, i);
        //            if (deci.Length > 2)
        //            {
        //                temp = sInt + "." + deci.Substring(0, 2);
        //            }
        //            else if (deci.Length == 2)
        //            {
        //                temp = str;
        //            }
        //            else if (deci.Length == 1)
        //            {
        //                temp = sInt + "." + deci + "0";
        //            }
        //        }
        //        catch
        //        {
        //            temp = "";
        //        }
        //    }
        //    i = temp.IndexOf(".");
        //    sInt = temp.Substring(0, i);

        //    int iIntLength = sInt.Length;
        //    int y = iIntLength - 1;
        //    string newS = "";
        //    int iNegative = temp.IndexOf("-");
        //    int x;
        //    int bNegative = 0;
        //    if (iNegative == -1)
        //    {
        //        x = iIntLength;
        //    }
        //    else
        //    {
        //        x = iIntLength - 1;
        //        sInt = sInt.Substring(1, sInt.Length - 1);
        //        bNegative = 1;
        //    }

        //    int iCount = x;
        //    if (x > 3)
        //    {
        //        for (int n = 0; n < iCount; n++)
        //        {

        //            if (x % 3 != 1 || n == iCount - 1)
        //            {
        //                newS = newS + sInt.Substring(n, 1);

        //            }
        //            else
        //                newS = newS + sInt.Substring(n, 1) + ",";
        //            x--;
        //        }
        //    }
        //    else newS = sInt;
        //    string sReturn;
        //    if (bNegative == 0)
        //        sReturn = newS + "." + temp.Substring(i + 1, (temp.Length - i - 1));
        //    else
        //        sReturn = "-" + newS + "." + temp.Substring(i + 1, (temp.Length - i - 1));
        //    return sReturn;
        //}
    }
}