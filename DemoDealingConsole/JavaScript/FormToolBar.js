var oWndOption = null;
var oWndDebug = null;
var oWndExecuteOrders = null;
var oWndOrderSearch = null;
var oWndOpenInterest = null;
var oWndHistoryPrice = null;
var oWndChangePasswod = null;
var onWndUpdateHistoryQuotation = null;
var oWndDealingPolicy = null;
//var oWndCustomerPolicyManagement = null;

var toolBarPageLoaded = false;
function ToolBarPageOnLoad() {
    toolBarPageLoaded = true;
}

function Password_click() {
    if (oWndChangePasswod == null || oWndChangePasswod.closed == true)
        oWndChangePasswod = window.open("ChangePasswod.aspx", "ChangePasswod", "scrollbars=no,status=no,toolbar=no,resizable=no,width=440px,height=300px");
    else
        oWndChangePasswod.focus();
}

function Save_click() {
    window.parent.quotationFrm.oDealingConsole.SaveSystemParameter();
}

function OpenInterest_click() {
    if (oWndOpenInterest == null || oWndOpenInterest.closed == true) {
        oWndOpenInterest = window.open("OpenInterest.aspx", "OpenInterest", "scrollbars=yes,status=yes,toolbar=no,resizable=yes,width=1250px,height=650px");
        //oWndOpenInterest = window.showModelessDialog("OpenInterest.aspx", this, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:1600px;dialogHeight:600px");
    }
    else
        oWndOpenInterest.focus();
}

function HistoryPrice_click() {
    if (oWndHistoryPrice == null || oWndHistoryPrice.closed == true)
        oWndHistoryPrice = window.open("HistoryPrice.aspx", "HistoryPrice", "toolbar=no,resizable=yes");
    else
        oWndHistoryPrice.focus();
}

function OrderSearch_click() {
    if (oWndOrderSearch == null || oWndOrderSearch.closed == true) {
        //oWndOrderSearch = window.open("OrderSearch.aspx", "OrderSearch", "toolbar=no,resizable=yes,width=800px,height=420px");
        oWndOrderSearch = window.showModelessDialog("OrderSearch.aspx", this, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:800px;dialogHeight:420px");
    }
    else
        oWndOrderSearch.focus();
}
function Option_click() {
    if (oWndOption == null || oWndOption.closed == true) {
        //oWndOption = window.open("Options.aspx", "Option", "scrollbars=no,status=no,toolbar=no,resizable=yes,width=480px,height=420px");
        oWndOption = window.showModelessDialog("Options.aspx", this, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:480px;dialogHeight:450px");
    }
    else
        oWndOption.focus();
    //showModelessDialog("Options.aspx",window,"resizable:yes;help:no;status:no;dialogWidth:300px;dialogHeight:300px");
}

function Debug() {
    if (oWndDebug == null || oWndDebug.closed == true)
        oWndDebug = window.open("Debug.aspx", "Debug", "resizable = yes,toolbar = no,titlebar = yes,status = no,menubar = no,height=620px,width=800px");
    else
        oWndDebug.focus();
}

function ChangeAutoToManual_onclick() {
    window.parent.quotationFrm.oDealingConsole.ChangeAutoToManual();
}

function ResetToPrevious_onclick() {
    window.parent.quotationFrm.oDealingConsole.ResetToPrevious();
}

function ResetToSetValue_onclick() {
    window.parent.quotationFrm.oDealingConsole.ResetToSetValue();
}

function ExecuteOrders_click() {
    if (oWndExecuteOrders == null || oWndExecuteOrders.closed == true) {
        oWndExecuteOrders = window.open("ExecuteOrders.aspx", "ExecuteOrdersFrm", "scrollbars=yes,status=yes,toolbar=no,resizable=yes,width=1200px,height=600px");
        //oWndExecuteOrders = window.showModelessDialog("ExecuteOrders.aspx", this, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:1200px;dialogHeight:600px");
    }
    else
        oWndExecuteOrders.focus();
}

function UpdateHistoryPrice_onclick() {
    if (onWndUpdateHistoryQuotation == null || onWndUpdateHistoryQuotation.closed == true)
    //onWndUpdateHistoryQuotation = window.open("UpdateHistoryQuotation.aspx", "UpdateHistoryQuotation", "scrollbars=no,status=no,toolbar=no,resizable=yes, width=850px,Height=460px");
        onWndUpdateHistoryQuotation = window.showModelessDialog("UpdateHistoryQuotation.aspx", this, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:850px;dialogHeight:460px");
    else
        onWndUpdateHistoryQuotation.focus();
}

function DealingPolicyEdit_Onclick() {
    if (oWndDealingPolicy == null || oWndDealingPolicy.closed == true) {
        //oWndDealingPolicy = window.open("DealingPolicyForm.aspx", "DealingPolicyEdit", "scrollbars=yes,status=no,toolbar=no,resizable=yes, width=840px,Height=560px");
        
        //oWndDealingPolicy = window.showModelessDialog("DealingPolicyForm.aspx", this, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:840px;dialogHeight:560px");
        //oWndDealingPolicy = window.showModelessDialog("ManagementFrame.aspx", this, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:860px;dialogHeight:620px");
        oWndDealingPolicy = window.open("ManagementFrame.aspx", "Management", "scrollbars=no,status=no,toolbar=no,resizable=yes, width=950px,Height=620px");
    }
    else
        oWndDealingPolicy.focus();
}

function ResumeOrSuspend_Onclick() {
    var isResume = window.document.all._ResumeOrSuspend.value.toLowerCase() == "resume";
    window.parent.quotationFrm.oDealingConsole.SuspendOrResume(isResume);
    window.document.all._ResumeOrSuspend.style.color = isResume ? "red" : "green";
    window.document.all._ResumeOrSuspend.value = isResume ? "Suspend" : "Resume";
}

function MassAllowLMT_Onclick() {
    var allow = window.document.all._MassAllowLMT.value.toLowerCase() == "allow limit";
    var needChangeDirection = window.parent.quotationFrm.oDealingConsole.MassAllowLMT(allow);
    if (needChangeDirection) {
        window.document.all._MassAllowLMT.style.color = allow ? "red" : "green";
        window.document.all._MassAllowLMT.value = allow ? "Disallow Limit" : "Allow Limit";
    }
}

function ShowCustomerPolicyManagementForm() {
//    if (oWndCustomerPolicyManagement == null || oWndCustomerPolicyManagement.closed == true) {
//        //oWndCustomerPolicyManagement = window.open("CustomerPolicyManagementForm.aspx", "CustomerPolicyManagement", "scrollbars=yes,status=no,toolbar=no,resizable=yes, width=840px,Height=560px");
//        oWndCustomerPolicyManagement = window.showModelessDialog("CustomerPolicyManagementForm.aspx", this, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:840px;dialogHeight:560px");
//    }
//    else
//        oWndCustomerPolicyManagement.focus();
}

function CloseChildWindow() {
    try {
        if (oWndDealingPolicy && oWndDealingPolicy.closed == false)
            oWndDealingPolicy.close();
//        if (oWndCustomerPolicyManagement && oWndCustomerPolicyManagement.closed == false)
//            oWndCustomerPolicyManagement.close();
        if (oWndOption && oWndOption.closed == false)
            oWndOption.close();
        if (oWndExecuteOrders && oWndExecuteOrders.closed == false)
            oWndExecuteOrders.close();
        if (oWndOrderSearch && oWndOrderSearch.closed == false)
            oWndOrderSearch.close();
        if (oWndOpenInterest && oWndOpenInterest.closed == false)
            oWndOpenInterest.close();
        if (oWndHistoryPrice && oWndHistoryPrice.closed == false)
            oWndHistoryPrice.close();
        if (oWndChangePasswod && oWndChangePasswod.closed == false)
            oWndChangePasswod.close();
        if (onWndUpdateHistoryQuotation && onWndUpdateHistoryQuotation.closed == false)
            onWndUpdateHistoryQuotation.close();
    }
    catch (e)
		    { }
}

function window_onunload() {
//    try {
//        window.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.Logout();
//    }
//    catch (e)
//			{ }

    CloseChildWindow();
}
function QuotePolicySelectInit() {
    while (Select1.length)
        Select1.remove(0);
    var _quotePolicys = parent.quotationFrm.oQuotePolicys;
    if (_quotePolicys) {
        var quotePolicys = (new VBArray(_quotePolicys.Items())).toArray();
        for (var index = 0, count = quotePolicys.length; index < count; index++) {
            var quotePolicy = quotePolicys[index];
            var oOption = document.createElement("OPTION");
            oOption.text = quotePolicy.code;
            oOption.value = quotePolicy.id;
            if (quotePolicy.isDefault) {
                Select1.add(oOption, 0);
                oOption.selected = true;

                MenuSelected(quotePolicy.id);
            }
            else
                Select1.add(oOption);
        }
    }
}

function btnRefPrice_Onclick() {
    try {
        window.parent.orderTaskFrm.FillRefPrice();
    }
    catch (e)
			{ }
}

//this function is used to call other functions when the user clicks on a menu item. These are the same functions that are called by the toolbar buttons.
/*		function CallMenuFunction()
{
var menuChoice = event.result;
switch(menuChoice){
case "Exit":
if (window.parent != null)
{
window.parent.close();
}
else
{
window.close();
}
break;
}
}*/

function QuotePolicyToContentMenu() {
    var count = parent.quotationFrm.oQuotePolicys.Count;
    var hight = (count < 5) ? count * 25 : 100;

    var s = "<div style=\"position:absolute; top:0; left:0; overflow:scroll; overflow-x:hidden; width:250; height:" + hight
					+ "; scrollbar-base-color:#3366CC; border-bottom:0px solid black; SCROLLBAR-HIGHLIGHT-COLOR: #99CCFF; SCROLLBAR-ARROW-COLOR: white;\">";
    var _quotePolicys = parent.quotationFrm.oQuotePolicys;
    if (_quotePolicys) {
        var quotePolicys = (new VBArray(_quotePolicys.Items())).toArray();
        for (var index = 0, count = quotePolicys.length; index < count; index++) {
            s += "<DIV onmouseover=\"this.style.filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#99ccff, EndColorStr=#FFFFFF)';\" onmouseout=\"this.style.filter='';\" STYLE=\"font-family:verdana; font-size:70%; height:25px; background:#e4e4e4; border:1px solid black; padding:3px; padding-left:20px;  cursor:hand; filter:;\" ";
            s += "onclick=\"parent.MenuSelected('";
            s += quotePolicys[index].id;
            s += "');\">";
            s += "<SPAN>";
            s += quotePolicys[index].code;
            s += "</SPAN>";
            s += "</DIV>";
        }
    }
    s += "</div>";
    return s;
}

function MenuSelected(newQuotePolicyID) {
    parent.quotationFrm.OnQuotePolicyChanged(newQuotePolicyID);

//    oPopupMenu.hide();
}

//var oPopupMenu = window.createPopup();
//function richDropDown() {
//    var count = parent.quotationFrm.oQuotePolicys.Count;
//    var hight = (count < 5) ? count * 25 : 100;

//    oPopupMenu.document.body.innerHTML = QuotePolicyToContentMenu();
//    oPopupMenu.show(0, 40, 250, hight, dropdowno);
//}

//Remarked by Michael on 2008-05-26
/*
function SelectPriceSource_OnChange()
{
try
{	
window.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.SetActiveSource(window,window.SelectPriceSource.value);
}
catch(e)
{}
}
*/

//Added by Michael on 2008-05-28
function SelectPriceSource_OnChange() {
    try {
        window.parent.quotationFrm.oDealingConsole.BatchSetSourceInstrument(window, window.SelectPriceSource.value);
    }
    catch (e) {
        alert("Failed to Set Active Source:" + e.Message);
    }
}

//Added by Michael on 2008-05-28
function FillSelectPriceSource() {
    try {
        window.SelectPriceSource.value = window.parent.quotationFrm.oDealingConsole.GetBatchActiveSource();
    }
    catch (e) {
        alert("Failed to Fill Active Source:" + e.Message);
    }
}


//Added by Michael on 2005-03-22
function LMTProcess_click() {
    try {
        if (window.parent.toolBarFrm && window.parent.orderTaskFrm && window.parent.quotationFrm && window.parent.quotationFrm.oDealingConsole) {
            var args = new Array(window.parent.toolBarFrm, window.parent.orderTaskFrm, window.parent.quotationFrm, window.parent.quotationFrm.oDealingConsole);
            var outArgs = showModalDialog("LMTProcess.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:400px;dialogHeight:300px");
        }
    }
    catch (e)
			{ }
}

function GoButton_OnClick() {
    window.parent.quotationFrm.oDealingConsole.ChangeQuotePolicyParameters(window.SelectQuotePolicyParameters.value);
}

function FillSelect(control, elementInnerText, elementValue) {
    var element = document.createElement("OPTION");
    control.add(element);
    element.innerText = elementInnerText;
    element.value = elementValue;
}

function LogoutButton_Onclick() {
    if (window.confirm("Are you sure to logout?")) {
        window.parent.quotationFrm.SystemLogout();
        window.parent.location = "Login.aspx";
    }
}

//Modified by Michael on 2008-05-26
/*
function FillQuotationSources()
{
var quotationSources = window.parent.quotationFrm.oQuotationSources;
var control = window.SelectPriceSource;
control.options.length = 0;
			
var quotationSources2 = (new VBArray(quotationSources.Items())).toArray();
for(var index=0,iCount=quotationSources2.length;index<iCount;index++)
{
var qs = quotationSources2[index];
FillSelect(control,qs.SourceName,qs.SourceName);
if (qs.IsActive) window.SelectPriceSource.selectedIndex=index;
}			
}
*/