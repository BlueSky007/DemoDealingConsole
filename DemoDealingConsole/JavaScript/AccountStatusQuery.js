var accountStatusQueryScanTimerID = null;

function AccountStatusQueryScanTimerStart() {
    AccountStatusQueryTimerStop();
    AccountStatusQuery(false);
    if (!window.document.all._RealtimeCalculateCheckbox.checked) return;

    var interval = parseInt(window._IntervalText.value);
    interval = isNaN(interval) || interval < 5 ? 15 : interval;
    window._IntervalText.value = interval;
    interval = interval * 1000;
    accountStatusQueryScanTimerID = window.setTimeout("AccountStatusQueryScanTimerStart()", interval);
}

function AccountStatusQueryTimerStop() {
    if (accountStatusQueryScanTimerID) window.clearTimeout(accountStatusQueryScanTimerID);
}

function AccountStatusQueryOnUnload() {
    AccountStatusQueryTimerStop();
}
function getAccountNameComboString(includeAllOption) {
    return window.dialogArguments.quotationFrm.oDealingConsole.getAccountComboString(includeAllOption,false);
}
function getAccountComboString(includeAllOption) {
    return window.dialogArguments.quotationFrm.oDealingConsole.getAccountComboString(includeAllOption,true);
}

function AccountStatusQueryOnLoad() {
    selectGridInit(window.AccountSelectGrid);
//    window.AccountSelectGrid.style.border = "1";
//    window.AccountSelectGrid.GridColor = color_black;
//    window.AccountSelectGrid.GridLines = flexGridInset;
    selectGridInit(window.AccountNameSelectGrid);
    if (window.dialogArguments.quotationFrm.AccountComboString == "") {
        window.dialogArguments.quotationFrm.oIOProxy.GetAccountComboList(this, true);
        window.AccountSelectGrid.TextMatrix(0, 0) = "Select Account";
        window.AccountNameSelectGrid.TextMatrix(0, 0) = "Select Account Name";
        return;
    }
    OnReset();
    InitUI();
}

function InitUI() {
    var accountId=window.dialogArguments.accountId;
    if (accountId != "") {
        if (getAccountComboString(false) == "") {
            window.AccountSelectGrid.ColComboList(0) = "#" + accountId + ";" + window.dialogArguments.accountCode;
        }
        if (getAccountNameComboString(false) == "") {
            //window.AccountSelectGrid.ColComboList(0) = "#" + accountId + ";" + window.dialogArguments.accountCode;
        }
        if (window.AccountSelectGrid.ColComboList(0).indexOf(accountId) == -1) {
            alert("Account (" + window.dialogArguments.accountCode + ") has not access!");
            return;
        }
        else {
            window.AccountSelectGrid.Cell(flexcpText, 0, 0) = accountId;
            window.AccountNameSelectGrid.Cell(flexcpText, 0, 0) = accountId;
        }
        btnQuery_onclick();
    }
    else {
        window.AccountSelectGrid.TextMatrix(0, 0) = "Select Account";
        window.AccountNameSelectGrid.TextMatrix(0, 0) = "Select Account Name";
    } 
}

function OnReset() {
    window.AccountSelectGrid.ColComboList(0) = getAccountComboString(false);
    window.AccountSelectGrid.focus();

    window.AccountNameSelectGrid.ColComboList(0) = getAccountNameComboString(false);
    window.AccountNameSelectGrid.focus();
}

function GetAccountComboListResult(needInitUI) {
    OnReset();
    if (needInitUI) {
        InitUI();
    }
}


function RefreshAccountList_OnClick() {
    window.dialogArguments.quotationFrm.oIOProxy.GetAccountComboList(this,false);
}

function RealtimeCalculateCheckbox_OnChange() {
    if (window.document.all._RealtimeCalculateCheckbox.checked) {
        AccountStatusQueryScanTimerStart();
    }
    else {
        AccountStatusQueryTimerStop();
    }
}

function btnQuery_onclick() {
//    AccountStatusQueryTimerStop();
//    var isQuerySucceed = AccountStatusQuery(true);
//    if (isQuerySucceed) {
//        AccountStatusQueryScanTimerStart();
    //    }
    AccountStatusQueryScanTimerStart();
}

function AccountStatusQuery(isPrompt) {
    var accountId = window.AccountSelectGrid.Cell(flexcpText, 0, 0);
    if (accountId == null || typeof (accountId) == 'undefined' || accountId == "" || accountId.length < 36) {
        if (isPrompt) {
            AccountStatusQueryTimerStop();
            alert("Please select Account to query.");
        }
        return false;
    }
    var accountIdList = window.dialogArguments.quotationFrm.AccountIdList;
    if (!accountIdList.Exists(accountId)) {
        AccountStatusQueryTimerStop();
        alert("the Account have Deleted!");
        return;
    }
    var selectedPrice = document.all.selectPrice.value;
    parent.frames("down").location.href = "AccountStatusResult.aspx?id=" + accountId + "&SelectedPrice=" + selectedPrice;
    //Fixed IE 10
    window.AccountSelectGrid.Redraw = true;
    window.AccountSelectGrid.focus();
    return true;
}

function ChangePriceForFPLCalcButton_OnClick() {
    AccountStatusQueryTimerStop();
    var w = 550;
    var h = 580;
    var sw = window.screen.width;
    var sh = window.screen.height;
    var left = Math.abs((sw - w) / 2);
    var top = Math.abs((sh - h) / 2);
    var size = "top=" + top + "px,left=" + left + "px,Width=" + w + "px,Height=" + h + "px," + "resizable = yes,toolbar = no,titlebar = yes,status = yes,menubar = no";
    window.open("ChangePriceForFPLCalc.aspx", null, size);
}

function AccountSelectGrid_AfterEdit(Row, Col) {
    var accountId = window.AccountSelectGrid.Cell(flexcpText, 0, 0);
    var accountCode = window.AccountSelectGrid.Cell(flexcpTextDisplay, 0, 0);
    window.AccountNameSelectGrid.Cell(flexcpText, 0, 0) = accountId;
    window.document.all._AccountCodeText.value = accountCode;
}
function AccountNameSelectGrid_AfterEdit(Row, Col) {
    var accountId = window.AccountNameSelectGrid.Cell(flexcpText, 0, 0);
    window.AccountSelectGrid.Cell(flexcpText, 0, 0) = accountId;
    var accountCode = window.AccountSelectGrid.Cell(flexcpTextDisplay, 0, 0);
    window.document.all._AccountCodeText.value = accountCode;
}
function AccountCodeText_OnChange() {
    AccountStatusQueryTimerStop();
}
function AccountCodeText_OnKeyDown() {
    if (event.keyCode == 13) {
        var accountCode = window.document.all._AccountCodeText.value;
        var accountList = window.dialogArguments.quotationFrm.AccountCodeList;
        if (accountCode == "" || accountList == null || !accountList.Exists(accountCode)) {
            window.AccountSelectGrid.Cell(flexcpText, 0, 0) = "Select Account";
            window.AccountNameSelectGrid.Cell(flexcpText, 0, 0) = "Select Account Name"
            alert("Please Select an Account!");
            return;
        }
        window.AccountSelectGrid.Cell(flexcpText, 0, 0) = accountList.Item(accountCode);
        window.AccountNameSelectGrid.Cell(flexcpText, 0, 0) = accountList.Item(accountCode);
    }
}