var startDate;
var endDate;
var items; //= new Array("<All>", "DQ", "LMT", "MKT", "MOO", "MOC", "SYS");
var orderTypeComboList;

function onLoad() {
    flexOrderSearchInit(window.QueryTypeSelect.value);

    //var quoteFrm = window.opener.parent.quotationFrm;oAccountGroups
    var quoteFrm = window.dialogArguments.parent.quotationFrm;
    var comboListLanguage = quoteFrm.comboListLanguage;
    orderTypeComboList = comboListLanguage["OrderTypeComboList"];
    items = orderTypeComboList.split('|');
    

    var oOption = document.createElement("OPTION");
    oOption.text = "<All>";
    oOption.value = "00000000-0000-0000-0000-000000000000";
    Select1.add(oOption);

    //Add by Erric
//    var accountGroups = (new VBArray(quoteFrm.oAccountGroups.Items())).toArray();
//    for (var index = 0, count = accountGroups.length; index < count; index++) {
//        var option = document.createElement("OPTION");
//        option.text = accountGroups[index].code;
//        option.value = accountGroups[index].id;
//        option.selected = (index == "0");
//        window._AccountGroupSelect.add(option);
//    }

    var instruments = (new VBArray(quoteFrm.oInstruments.Items())).toArray();
    for (var index = 0, count = instruments.length; index < count; index++) {
        var oOption = document.createElement("OPTION");
        oOption.text = instruments[index].code;
        oOption.value = instruments[index].id;
        oOption.selected = (index == "0");
        Select1.add(oOption);
    }

    for (var index = 0, count = items.length; index < count; index++) {
        var oOption = document.createElement("OPTION");
        var orderTypeItem = items[index].split(';');
        oOption.text = orderTypeItem[1];
        oOption.value = index;
        oOption.selected = (index == "0");
        Select2.add(oOption);
    }

    startDate = new Date();
    endDate = new Date();
    TextStart.value = Date2String(startDate);
    TextEnd.value = Date2String(endDate);
    TextStart.disabled = true;
    TextEnd.disabled = true;

    onSize();
}

function onSize() {
    //vsflexOrderSearch.style.posHeight = Body1.clientHeight - Table1.clientHeight;
    //vsflexOrderSearch.style.posWidth = Body1.clientWidth;
}

function BtnStartTime_onclick() {
    var newDate = window.showModalDialog("Calendar.aspx", startDate, "status:no;help:no;center:yes;resizable:yes; scroll:no; dialogWidth:375px;dialogHeight:385px");
    if (newDate) {
        startDate = new Date(newDate);
        TextStart.value = Date2String(startDate);
    }
}

function BtnEndTime_onclick() {
    var newDate = window.showModalDialog("Calendar.aspx", endDate, "status:no;help:no;center:yes; resizable:yes; scroll:no; dialogWidth:375px;dialogHeight:385px");
    if (newDate) {
        endDate = new Date(newDate);
        TextEnd.value = Date2String(endDate);
    }
}

var timeOutID = null;
function Query() {
    var accountGroupId = window._AccountGroupSelect.value == "" ? null : window._AccountGroupSelect.value;
    flexOrderSearchInit(window.QueryTypeSelect.value);

    if (window.Select1.value == "" ||
				window.Select2.value == "") {
        var quoteFrm = window.dialogArguments.parent.quotationFrm;
        var messageLanguage = quoteFrm.messageLanguage;
        alert(messageLanguage["SelectInstrumentAlert"]);
    }
    else {
        //var quoteFrm = window.opener.parent.quotationFrm;
        var quoteFrm = window.dialogArguments.parent.quotationFrm;
        switch (window.Select2.value) {
            case "0":
                orderType = 99;
                break;
            case "1":
                orderType = 0;
                break;
            case "2":
                orderType = 1;
                break;
            case "3":
                orderType = 2;
                break;
            case "4":
                orderType = 3;
                break;
            case "5":
                orderType = 4;
                break;
            case "6":
                orderType = 6;
                break;
        }
        if (window.QueryTypeSelect.value == "0") {
            quoteFrm.oIOProxy.GetExecutedOrderByInstrument(this, window.Select1.value, orderType, window.TextStart.value, window.TextEnd.value,accountGroupId);
        }
        else {
            quoteFrm.oIOProxy.GetCancelledOrderByInstrument(this, window.Select1.value, orderType, window.TextStart.value, window.TextEnd.value,accountGroupId);
        }
        window.btnQuery.disabled = true;
        timeOutID = window.setTimeout(TimeOut, 5000);
    }
    function TimeOut() {
        window.btnQuery.disabled = false;
        if (window.timeOutID) { window.clearTimeout(window.timeOutID); }
    }
}

function GetExecutedOrderByInstrumentResult(dataSet) {
    //var quotationFrm = window.opener.parent.quotationFrm;
    var quotationFrm = window.dialogArguments.parent.quotationFrm;
    var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;

    var searchGridColKey = quotationFrm.searchGridColKey;
    var vsflexGrid = window.vsflexOrderSearch;
    vsflexGrid.Rows = vsflexGrid.FixedRows;
    window.btnQuery.disabled = false;
    if (timeOutID) { window.clearTimeout(timeOutID); }
    if (!dataSet) return;
    var table = dataSet.Tables(0);
    if (!table) return;
    vsflexGrid.Redraw = false;
    var rowHeightValue = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.SearchGrid);
    var commonLanguage = quotationFrm.commonLanguage;
    var line = vsflexGrid.FixedRows;
    var iCount = table.Rows.Count;
    vsflexGrid.Rows = line + ((iCount > 0) ? iCount : 0);
    for (var index = 0; index < iCount; index++) {
        var dateSetRow = table.Rows(index);
        with (vsflexGrid) {
            RowHeight(line) = rowHeightValue;

            TextMatrix(line, ColIndex(searchGridColKey.Item)) = dateSetRow("InstrumentCode");
            TextMatrix(line, ColIndex(searchGridColKey.IsBuy)) = (dateSetRow("IsBuy") == true) ? commonLanguage["Buy"] : commonLanguage["Sell"];
            TextMatrix(line, ColIndex(searchGridColKey.OpenClose)) = dateSetRow("OpenClose") == "O" ? commonLanguage["Open"] : commonLanguage["Close"];
            TextMatrix(line, ColIndex(searchGridColKey.Lot)) = GetFormatLot2(dateSetRow("Lot").toString(), true, lotDecimal);
            TextMatrix(line, ColIndex(searchGridColKey.OrderCode)) = dateSetRow("OrderCode");
            TextMatrix(line, ColIndex(searchGridColKey.Account)) = dateSetRow("AccountCode");
            TextMatrix(line, ColIndex(searchGridColKey.Price)) = dateSetRow("ExecutePrice");
            TextMatrix(line, ColIndex(searchGridColKey.Type)) = GetOrderTypeCaption(orderTypeComboList, dateSetRow("OrderType").toString());
            TextMatrix(line, ColIndex(searchGridColKey.ExecuteTime)) = dateSetRow("ExecuteTime");
            TextMatrix(line, ColIndex(searchGridColKey.Relation)) = dateSetRow("Relation");
            TextMatrix(line, ColIndex(searchGridColKey.Dealer)) = (dateSetRow("approverID") == quotationFrm.oUserID ? "me" : "other");

            SetRowForeColor(vsflexGrid, line, (dateSetRow("IsBuy") == true) ? color_blue : color_red);

            TextMatrix(line, ColIndex(searchGridColKey.Sequence)) = line;

            line++;
        }
    }
    //vsflexGrid.AutoSizeMode = 1;
    //vsflexGrid.AutoSize(vsflexGrid.FixedCols,vsflexGrid.Cols - 1,false,0);

    vsflexGrid.Redraw = true;
}

function GetCancelledOrderByInstrumentResult(dataSet) {
    //var quotationFrm = window.opener.parent.quotationFrm;
    var quotationFrm = window.dialogArguments.parent.quotationFrm;
    var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
    var searchGridColKey = quotationFrm.searchGridColKeyForCancelledOrder;
    var vsflexGrid = window.vsflexOrderSearch;
    vsflexGrid.Rows = vsflexGrid.FixedRows;
    window.btnQuery.disabled = false;
    if (timeOutID) { window.clearTimeout(timeOutID); }
    if (!dataSet) return;
    var table = dataSet.Tables(0);
    if (!table) return;
    vsflexGrid.Redraw = false;
    var rowHeightValue = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.SearchGridForCancelledOrder);
    var commonLanguage = quotationFrm.commonLanguage; 
    var line = vsflexGrid.FixedRows;
    var iCount = table.Rows.Count;
    vsflexGrid.Rows = line + ((iCount > 0) ? iCount : 0);
    for (var index = 0; index < iCount; index++) {
        var dateSetRow = table.Rows(index);
        with (vsflexGrid) {
            RowHeight(line) = rowHeightValue;

            TextMatrix(line, ColIndex(searchGridColKey.Item)) = dateSetRow("InstrumentCode");
            TextMatrix(line, ColIndex(searchGridColKey.IsBuy)) = (dateSetRow("IsBuy") == true) ? commonLanguage["Buy"] : commonLanguage["Sell"];
            TextMatrix(line, ColIndex(searchGridColKey.OpenClose)) = dateSetRow("OpenClose") == "O" ? commonLanguage["Open"] : commonLanguage["Close"];
            TextMatrix(line, ColIndex(searchGridColKey.Lot)) = GetFormatLot2(dateSetRow("Lot").toString(), true, lotDecimal);
            TextMatrix(line, ColIndex(searchGridColKey.OrderCode)) = (dateSetRow("OrderCode") == null) ? "" : dateSetRow("OrderCode");
            TextMatrix(line, ColIndex(searchGridColKey.Account)) = dateSetRow("AccountCode");
            TextMatrix(line, ColIndex(searchGridColKey.Price)) = (dateSetRow("SetPrice") == null) ? "" : dateSetRow("SetPrice");
            TextMatrix(line, ColIndex(searchGridColKey.Type)) = GetOrderTypeCaption(orderTypeComboList, dateSetRow("OrderType").toString());
            TextMatrix(line, ColIndex(searchGridColKey.Relation)) = dateSetRow("Relation");
            TextMatrix(line, ColIndex(searchGridColKey.Reason)) = dateSetRow("Reason");

            SetRowForeColor(vsflexGrid, line, (dateSetRow("IsBuy") == true) ? color_blue : color_red);

            TextMatrix(line, ColIndex(searchGridColKey.Sequence)) = line;

            line++;
        }
    }
    //vsflexGrid.AutoSizeMode = 1;
    //vsflexGrid.AutoSize(vsflexGrid.FixedCols,vsflexGrid.Cols - 1,false,0);

    vsflexGrid.Redraw = true;
}

function Print() {
    try {
        if (window.vsflexOrderSearch) {
            //window.vsflexOrderSearch.PrintGrid();
            window.vsflexOrderSearch.PrintGrid("", true, 0, 0, 0);
        }
    }
    catch (e) {
        alert("Printer's I/O was error! please check your printer.");
    }
}

function Onunload() {
    //			if(this.opener && this.opener.oWndOrderSearch)
    //			    this.opener.oWndOrderSearch = null;
    if (window.dialogArguments && window.dialogArguments.oWndOrderSearch)
        window.dialogArguments.oWndOrderSearch = null;
}
