//#region For High/Low
var currentTradeDay;

function GetNeedApplyAutoAdjustPoints() {
    var quoteFrm = window.dialogArguments.parent.quotationFrm;
    return quoteFrm.oApplyAutoAdjustPoints;
}

function SetCurrentTradeDay() {
    //currentTradeDay = _TradeDayText.value;
    currentTradeDay = _CurrentTradeDateTime2.value;
}

function OnSetTradeDay() {
    TradeDayValidation(window.document.all._TradeDayText);
}

function InitHighLowData() {
    SetCurrentTradeDay();
    HistoryQuotationInitialize(_HighLowHistoryGrid);
    LoadSelectInstruments(_InstrumentForHighLowSelect, GetInstruments(),true);    
}

function RefreshInstrumentForHighLowButton_onclick() {
    LoadSelectInstruments(_InstrumentForHighLowSelect, GetInstruments(),true);    
}

function OnHighLowHistoryGridBeforeRowColChange(oldRow, oldCol, newRow, newCol) {
    OnHistoryGridBeforeRowColChangeProcess(_HighLowHistoryGrid, oldRow, oldCol, newRow, newCol);
}

function OnHighLowHistoryQuotationValidateEdit(row, col, cancel) {
    OnHistoryQuotationValidateEditProcess(_HighLowHistoryGrid, row, col, cancel);
}

function RefreshHighLowButton_onclick() {
    if (_InstrumentForHighLowSelect.value == "") return;
    if (_OriginPriceForHighLowText.value != "" && VerifyPrice(_OriginPriceForHighLowText.value) == false) {
        window.alert("you should input correct originPrice or keep it blank.");
    }
    if (HasModified(_HighLowHistoryGrid) == true) {
        if (!window.confirm("Are you sure to abandon the modified record?")) return;
    }
    service.useService("Service.asmx?WSDL", "MyService");
    service.MyService.callService(GetOriginQuotationForModifyHighLowHistoryResult, "GetOriginQuotationForModifyHighLowHistory", _TradeDayText.value, _InstrumentForHighLowSelect.value, _OriginPriceForHighLowText.value, _IsLowCheckbox.checked);
}

function AddHighLowButton_onclick() {
    var transferObject = new Object();
    transferObject.ModifyObject = "HighLow";
    transferObject.DateTime = currentTradeDay;
    transferObject.CallWindow = this;
    showModalDialog("AddHistoryQuotation.aspx", transferObject, "scroll:no;resizable:yes;help:no; status:no;dialogWidth:400px;dialogHeight:300px");
}

function ConfirmHighLowButton_onclick() {
    window.document.all._ConfirmHighLowButton.disabled = true;

    var grid = _HighLowHistoryGrid;
    //var historyQuotationXmls = "<HistoryQuotations>";
    var historyQuotationXmls = "";
    var eventMessageArray = new Array();
    var instrumentIDArray = new Array();
    var instrumentCodeArray = new Array();
    SetStatus(grid);
    for (var i = grid.FixedRows; i < grid.Rows; i++) {
        var historyQuotation = grid.RowData(i);
        //grid.RowData(col) will loss Milliseconds
        historyQuotation.timestamp = SetDateTime(grid.TextMatrix(i, gridColumns.timestamp.index).replace(/-/g, "/"));
        grid.RowData(i) = historyQuotation;
        //if (historyQuotation.status == EnumStatus.Inserted || historyQuotation.status == EnumStatus.Modified) 
        if (historyQuotation.status != EnumStatus.Unchanged) {
            //var historyQuotationXml = BuildHistoryQuotationXml(historyQuotation, true);
            var oHistory = BuildHistoryQuotationXml(historyQuotation, true);
            historyQuotationXmls += oHistory.historyQuotationXml;
            eventMessageArray.push(oHistory.eventMessage);
            instrumentIDArray.push(oHistory.instrumentId);
            instrumentCodeArray.push(oHistory.instrumentCode);    
        }
    }
    if (historyQuotationXmls == "") {
        alert("Please modify record!");
        return;
    }
    historyQuotationXmls = "<HistoryQuotations>" + historyQuotationXmls;
    historyQuotationXmls += "</HistoryQuotations>";
    historyQuotationXmls = historyQuotationXmls.replace(/</g, "&lt;");
    historyQuotationXmls = historyQuotationXmls.replace(/>/g, "&gt;");

    //Should add judement later...
    var needApplyAutoAdjustPoints = GetNeedApplyAutoAdjustPoints();
    service.useService("Service.asmx?WSDL", "MyService");
    service.MyService.callService(SetHighLowHistoryResult, "FixOverridedQuotationHistory", historyQuotationXmls, needApplyAutoAdjustPoints, "FixOverridedQuotationHistory", instrumentIDArray, instrumentCodeArray, eventMessageArray);
}

function SetHighLowHistoryResult(result) {
    if (result.error == false) {
        if (result.value) {
            for (var i = _HighLowHistoryGrid.FixedRows; i < _HighLowHistoryGrid.Rows; i++) {
                var historyQuotation = _HighLowHistoryGrid.RowData(i);
                historyQuotation.status = EnumStatus.Unchanged;
                SetStatusColor(_HighLowHistoryGrid, i, EnumStatus.Unchanged);
            }
            window.alert("Update HistoryQuotation succeed.");
            RefreshHighLowButton_onclick();
        }
        else {
            window.alert("Update HistoryQuotation failed.");
        }
    }
    else {
        window.alert("Update HistoryQuotation failed,the reason is:" + result.errorDetail.string);
    }

    window.document.all._ConfirmHighLowButton.disabled = false;
}

function GetOriginQuotationForModifyHighLowHistoryResult(result) {
    GetHistoryOriginQuotationResultProcess(_HighLowHistoryGrid, result);
}

//#endregion For High/Low

//#region For Ask/Bid
var currentTradeDateTime;

function SetCurrentTradeDateTime()
{
    //currentTradeDateTime = _BeginDateTimeText.value;
    currentTradeDateTime = _CurrentTradeDateTime2.value;
}

function OnSetBeginDateTime() {
    DateTimeValidation(window.document.all._BeginDateTimeText);
}

function InitAskBidData() {
    SetCurrentTradeDateTime();
    HistoryQuotationInitialize(_AskBidHistoryGrid);
    LoadSelectInstruments(_InstrumentForAskBidSelect, GetInstruments(),false);    
}

function RefreshInstrumentForAskBidButton_onclick() {
    LoadSelectInstruments(_InstrumentForAskBidSelect, GetInstruments(),false);
}

function OnAskBidHistoryGridBeforeRowColChange(oldRow, oldCol, newRow, newCol) {
    OnHistoryGridBeforeRowColChangeProcess(_AskBidHistoryGrid, oldRow, oldCol, newRow, newCol);
}
   
function OnAskBidHistoryQuotationValidateEdit(row, col, cancel) {
    OnHistoryQuotationValidateEditProcess(_AskBidHistoryGrid, row, col, cancel);
}

function RefreshAskBidButton_onclick() {
    if (_InstrumentForAskBidSelect.value == "") return;
    if (_OriginPriceForAskBidText.value != "" && VerifyPrice(_OriginPriceForAskBidText.value) == false) {
        window.alert("you should input correct originPrice or keep it blank.");
    }
    if (HasModified(_AskBidHistoryGrid) == true) {
        if (!window.confirm("Are you sure to abandon the modified record?")) return;
    }
    service.useService("Service.asmx?WSDL", "MyService");
    service.MyService.callService(GetOriginQuotationForModifyAskBidHistoryResult, "GetOriginQuotationForModifyAskBidHistory", _InstrumentForAskBidSelect.value, _BeginDateTimeText.value, _OriginPriceForAskBidText.value);
}

function AddAskBidButton_onclick() {
    var transferObject = new Object();
    transferObject.ModifyObject = "AskBid";
    transferObject.DateTime = currentTradeDateTime;
    transferObject.CallWindow = this;
    showModalDialog("AddHistoryQuotation.aspx", transferObject, "scroll:no;resizable:yes;help:no; status:no;dialogWidth:400px;dialogHeight:300px");
}

function ConfirmAskBidButton_onclick() {
    window.document.all._ConfirmAskBidButton.disabled = true;

    var grid = _AskBidHistoryGrid;
    //var historyQuotationXmls = "<HistoryQuotations>";
    var historyQuotationXmls = "";
    var eventMessageArray = new Array();
    var instrumentIDArray = new Array();
    var instrumentCodeArray = new Array();
    SetStatus(grid);
    for (var i = grid.FixedRows; i < grid.Rows; i++) {
        var historyQuotation = grid.RowData(i);
        //grid.RowData(col) will loss Milliseconds
        historyQuotation.timestamp = SetDateTime(grid.TextMatrix(i, gridColumns.timestamp.index).replace(/-/g, "/"));
        grid.RowData(i) = historyQuotation;
        //if (historyQuotation.status == EnumStatus.Inserted || historyQuotation.status == EnumStatus.Modified) 
        if (historyQuotation.status != EnumStatus.Unchanged) 
        {
            //var historyQuotationXml = BuildHistoryQuotationXml(historyQuotation, false);
            var oHistory = BuildHistoryQuotationXml(historyQuotation, false);
            historyQuotationXmls += oHistory.historyQuotationXml;
            eventMessageArray.push(oHistory.eventMessage);
            instrumentIDArray.push(oHistory.instrumentId);
            instrumentCodeArray.push(oHistory.instrumentCode);
        }
    }
    if (historyQuotationXmls == "") {
        alert("Please modify record!");
        return;
    }    
    historyQuotationXmls = "<HistoryQuotations>" + historyQuotationXmls;
    historyQuotationXmls += "</HistoryQuotations>";
    historyQuotationXmls = historyQuotationXmls.replace(/</g, "&lt;");
    historyQuotationXmls = historyQuotationXmls.replace(/>/g, "&gt;");

    var needApplyAutoAdjustPoints = GetNeedApplyAutoAdjustPoints();
    service.useService("Service.asmx?WSDL", "MyService");
    service.MyService.callService(SetAskBidHistoryResult, "FixOverridedQuotationHistory", historyQuotationXmls, needApplyAutoAdjustPoints, "FixOverridedQuotationHistory", instrumentIDArray, instrumentCodeArray, eventMessageArray);
}

function SetAskBidHistoryResult(result) {
    if (result.error == false) {
        if (result.value) {
            for (var i = _AskBidHistoryGrid.FixedRows; i < _AskBidHistoryGrid.Rows; i++) {
                var historyQuotation = _AskBidHistoryGrid.RowData(i);
                historyQuotation.status = EnumStatus.Unchanged;
                SetStatusColor(_AskBidHistoryGrid, i, EnumStatus.Unchanged);
            }
            window.alert("Update HistoryQuotation succeed.");
            RefreshAskBidButton_onclick();
        }
        else {
            window.alert("Update HistoryQuotation failed.");
        }
    }
    else {
        window.alert("Update HistoryQuotation failed,the reason is:" + result.errorDetail.string);
    }

    window.document.all._ConfirmAskBidButton.disabled = false;
}

function GetOriginQuotationForModifyAskBidHistoryResult(result) {
    GetHistoryOriginQuotationResultProcess(_AskBidHistoryGrid, result);
}

function DeleteAskBidButton_onclick()
{
    var line = _AskBidHistoryGrid.Row;
    if (line < _AskBidHistoryGrid.FixedRows) return;
    var historyQuotation = _AskBidHistoryGrid.RowData(line);
    if (historyQuotation.status == EnumStatus.Inserted) {
        _AskBidHistoryGrid.RemoveItem(_AskBidHistoryGrid.Row);
        return;
    }
    else {
        _AskBidHistoryGrid.TextMatrix(_AskBidHistoryGrid.Row, gridColumns.origin.index) = historyQuotation.origin;
        historyQuotation.status = EnumStatus.Deleted;
        SetStatusColor(_AskBidHistoryGrid, line, EnumStatus.Deleted);
    }    
}
//#endregion For Ask/Bid

//#region Common
var gridColumns;

function Page_Onload() {
    gridColumns = new QuotationColumns();
    InitAskBidData();
    InitHighLowData();
    InitRestoreHighLow();
}

function HistoryQuotationInitialize(grid) {
    var lFixedRows = 0;
    var lColIndex = 0;

    with (grid) {
        Rows = 1;
        FixedRows = 1;
        FixedCols = 1;
        Cols = 5;

        ColWidth(lColIndex) = 400;
        lColIndex++;

        TextMatrix(lFixedRows, lColIndex) = "instrumentID";
        ColKey(lColIndex) = "instrumentID";
        ColWidth(lColIndex) = 1000;
        ColHidden(lColIndex) = true;   //RowHidden(lRowIndex)
        lColIndex++;

        TextMatrix(lFixedRows, lColIndex) = "Code";
        ColKey(lColIndex) = "instrumentCode";
        ColWidth(lColIndex) = 2000;
        lColIndex++;

        TextMatrix(lFixedRows, lColIndex) = "Time";
        ColKey(lColIndex) = "Timestamp";
        ColWidth(lColIndex) = 4000;
        ColDataType(lColIndex) = flexDTDate;
        //ColFormat(lColIndex) = "yyyy-MM-dd HH:mm:ss.fff";
        lColIndex++;

        TextMatrix(lFixedRows, lColIndex) = "Origin";
        ColKey(lColIndex) = "Origin";
        ColWidth(lColIndex) = 1500;
        lColIndex++;

        ExtendLastCol = false;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSort; //flexExSortAndMove;
        Editable = flexEDNone; //flexEDKbdMouse;
    }
}

function GetInstruments() {
    var quoteFrm = window.dialogArguments.parent.quotationFrm;
    var instruments = (new VBArray(quoteFrm.oInstruments.Items())).toArray();
    return instruments;
}

function LoadSelectInstruments(selectControl, instruments, needCheckIsOriginHiLo) {
    selectControl.options.length = 0;
    
    var oOption = document.createElement("OPTION");
    //oOption.text="<All>";
    //oOption.value="00000000-0000-0000-0000-000000000000";
    selectControl.add(oOption);

    //var quotePolicyID = window.dialogArguments.parent.quotationFrm.oDealingConsole.mainWindow.oCurrentQuotePolicyDetailID;    
    for (var index = 0, count = instruments.length; index < count; index++) {
        var instrument = instruments[index];
        if (needCheckIsOriginHiLo) {
            var quotePolicyDetail = instrument.GetFirstQuotePolicyDetail();
            if (!quotePolicyDetail.isOriginHiLo) {
                var oOption = document.createElement("OPTION");
                oOption.text = instrument.code;
                oOption.value = instrument.id;
                oOption.selected = (index == "0");
                selectControl.add(oOption);
            }
        }
        else {
            var oOption = document.createElement("OPTION");
            oOption.text = instrument.code;
            oOption.value = instrument.id;
            oOption.selected = (index == "0");
            selectControl.add(oOption);
        }
    }
}

function OnHistoryGridBeforeRowColChangeProcess(grid, oldRow, oldCol, newRow, newCol) {
    switch (grid.ColKey(newCol))
	{
		case "Origin":
		    grid.Editable = flexEDKbdMouse;
			break;
		default:
		    grid.Editable = flexEDNone;
			break;
	}
}

function OnHistoryQuotationValidateEditProcess(grid, row, col, cancel) {
    var historyQuotation = grid.RowData(row);

    if (historyQuotation.status == EnumStatus.Deleted) {
        grid.EditText = grid.TextMatrix(row, col);
        cancel = true;
        return;
    }
    else {
        var newValue = grid.EditText;
        switch (grid.ColKey(col)) {
            case "Origin":
                if (VerifyPrice(newValue)) {
                    grid.EditText = newValue;
                }
                else {
                    grid.EditText = grid.TextMatrix(row, col);
                    cancel = true;
                }
                break;
            default:
                grid.EditText = grid.TextMatrix(row, col);
                cancel = true;
                break;
        }
    }
    if (historyQuotation.status != EnumStatus.Inserted && historyQuotation.status != EnumStatus.Deleted) {
        if (grid.ColKey(col) == "Origin" && historyQuotation.origin != grid.EditText) {
            historyQuotation.status = EnumStatus.Modified;
            SetStatusColor(grid, row, EnumStatus.Modified);
        }
        else {
            historyQuotation.status = EnumStatus.Unchanged;
            SetStatusColor(grid, row, EnumStatus.Unchanged);
        }
    }
}

function SetStatus(grid)
{
	for(var i=grid.FixedRows;i<grid.Rows;i++)
	{
		var historyQuotation = grid.RowData( i );
		var origin = grid.TextMatrix(i, gridColumns.origin.index);		
		if (historyQuotation.status == EnumStatus.Modified)
		{
		    if (origin == historyQuotation.origin) {
		        historyQuotation.status = EnumStatus.Unchanged;
		        SetStatusColor(grid, i, EnumStatus.Unchanged);
		    }
		    else {
		        historyQuotation.origin = origin;
		    }
		}
	}
}

function HasModified(grid)
{
    SetStatus(grid);
    
	for(var i=grid.FixedRows;i<grid.Rows;i++)
	{
		var historyQuotation = grid.RowData( i );
		if (historyQuotation.status != EnumStatus.Unchanged) return true;
	}
	return false;
}

function SetStatusColor(grid, row, enumStatus)
{
    var color = GetStatusColor(enumStatus);
    SetRowForeColor(grid, row, color);
}

function BuildHistoryQuotationXml(historyQuotation, isUpdateHiLo) {
    var oHistory = new Object();
    var timestampString = GetDateTimeString(historyQuotation.timestamp, "DateTimeMillionSeconds");
    
    var historyQuotationXml = "";
	historyQuotationXml += "<HistoryQuotation InstrumentID=\"" + historyQuotation.instrumentID + "\" ";
	historyQuotationXml += "InstrumentCode=\"" + historyQuotation.instrumentCode + "\" ";
	historyQuotationXml += "Timestamp=\"" + timestampString + "\" ";
	historyQuotationXml += "Origin=\""+historyQuotation.origin+"\" ";
	historyQuotationXml += "Status=\"" + historyQuotation.status + "\" ";
	//historyQuotationXml += "IsUpdateHiLo=\"" + (isUpdateHiLo==true)?"True":"False" + "\" ";
	historyQuotationXml += "/>";

	var eventMessage = "";
	eventMessage += "InstrumentCode=" + historyQuotation.instrumentCode;
	eventMessage += ",Status=" + historyQuotation.status;
	eventMessage += ",Timestamp=" + timestampString;
	eventMessage += ",Origin=" + historyQuotation.origin;

	oHistory.historyQuotationXml = historyQuotationXml;
	oHistory.eventMessage = ReplaceSpecialChar(eventMessage);
	oHistory.instrumentId = historyQuotation.instrumentID;
	oHistory.instrumentCode = ReplaceSpecialChar(historyQuotation.instrumentCode);
	return oHistory;
}

function ReplaceSpecialChar(str) {
    if (str == null) return str;
    str = str.replace(/&/g, "&amp;");
    return str;
}

function GetHistoryOriginQuotationResultProcess(grid, result)
{
	if (result.error == false)
	{
		if (result.value != null)
		{
		    grid.Rows = 1;
			
			var dataSet = new ActiveXObject("DATA.DataSet");
			dataSet.Site = window.document;
			dataSet.ReadXml(result.value.xml);
			if (dataSet.Tables.Count <= 0) return;
	    
			var table = dataSet.Tables(0);//("HistoryOriginQuotation");		
			for(var index=0; table && index<table.Rows.Count; index++)
			{
			    var row = table.Rows(index);
				var historyQuotation = new HistoryQuotation();
				historyQuotation.UpdateByDataRow(row);
				UpdateQuotationFlexGrid(true,grid, historyQuotation);
			}
			dataSet = null;

	//		var children=result.value.childNodes[0].childNodes;
	//        if(children!=null&&children.length>0)
	//        {
	//			for( var i=0;i<children.length;i++)
	//			{
	//				var historyQuotation = new HistoryQuotation(children[i]);
			//				UpdateQuotationFlexGrid(true,grid, historyQuotation);
	//			}
	//        }
		}
	}
	else
	{
		window.alert("Get historyQuotation failed,the reason is:"+result.errorDetail.string);
	}
}

function UpdateQuotationFlexGrid(isRefresh, grid, historyQuotation) {
    if (!isRefresh) {
        for (var i = grid.FixedRows; i < grid.Rows; i++) {
            var historyQuotation2 = grid.RowData(i);
            if (historyQuotation2.instrumentID == historyQuotation.instrumentID && historyQuotation2.timestamp.valueOf() == historyQuotation.timestamp.valueOf())
            {
                alert("Exists the same record!");
                return false;
            }
        }
     }
    
	var line = grid.Rows;
	grid.AddItem(line.toString());
	grid.TextMatrix(line, gridColumns.instrumentID.index) = historyQuotation.instrumentID;
	grid.TextMatrix(line, gridColumns.instrumentCode.index) = historyQuotation.instrumentCode;
	//grid.TextMatrix(line, gridColumns.timestamp.index) =  GetDateTimeString(historyQuotation.timestamp,"DateTime");
	grid.TextMatrix(line, gridColumns.timestamp.index) = GetDateTimeString(historyQuotation.timestamp, "DateTimeMillionSeconds");
	grid.TextMatrix(line, gridColumns.origin.index) = historyQuotation.origin;
	grid.RowData(line) = historyQuotation;

	SetStatusColor(grid, line, historyQuotation.status);
	
	return true;
}

function UpdateQuotationFlexGridForOuter(modifyObject, historyQuotation) {
    return UpdateQuotationFlexGrid(false, (modifyObject == "HighLow") ? _HighLowHistoryGrid : _AskBidHistoryGrid, historyQuotation);
}

//dateStr in format: yyyy-mm-dd hh:mi:ss.mmm
function ToDate(dateStr) 
{
    year = dateStr.substring(0, 4);
    month = dateStr.substring(5, 7);
    month = parseInt(month) - 1;
    day = dateStr.substring(8, 10);
    hour = dateStr.substring(11, 13);
    minute = dateStr.substring(14, 16);
    second = dateStr.substring(17, 19);
    millsecond = dateStr.substring(20, 23);

    return new Date(year, month, day, hour, minute, second, millsecond); 
}

function XmlConvertToDateTime(sValue) {
    var dateTime;
    try {
        var arrDateTime = sValue.split(" ");
        if (arrDateTime[0].length > 10) {
            var arrDateTime = sValue.split("T");
        }
        sDate = arrDateTime[0];
        sTime = arrDateTime[1];
        arrDate = sDate.split("-");
        arrTime = sTime.split(":");

        sYear = arrDate[0];
        sMonth = arrDate[1];
        sDay = arrDate[2]
        if (sMonth.length == 1)
            sMonth = "0" + sMonth;
        if (sDay.length == 1)
            sDay = "0" + sDay;

        sHour = arrTime[0];
        sMinute = arrTime[1];
        sSecond = arrTime[2];
        if (sHour.length == 1)
            sHour = "0" + sHour;
        if (sMinute.length == 1)
            sMinute = "0" + sMinute;
        if (sSecond.length == 1)
            sSecond = "0" + sSecond;

        sValue = sYear + "-" + sMonth + "-" + sDay + " " + sHour + ":" + sMinute + ":" + sSecond;
        dateTime = new Date(sValue.substring(0, 4) + "/" + (sValue.substring(5, 7)) + "/" + sValue.substring(8, 10) + " " + sValue.substring(11, 13) + ":" + sValue.substring(14, 16) + ":" + sValue.substring(17, 19));
        if (sValue.length > 20) {
            dateTime.setMilliseconds(parseFloat(sValue.substring(20, 23)));     //fix parseInt("030"),use parseFloat
        }
    }
    catch (e) {
        dateTime = null;
    }

    if (typeof (dateTime) == 'undefined' || isNaN(dateTime)) {
        dateTime = null;
    }
    return dateTime;
}

function HistoryQuotation() {
    this.instrumentID;
    this.instrumentCode;
    this.timestamp;
    this.origin;
    this.status;

    this.UpdateByDataRow = function (dataRow) {
        this.instrumentID = dataRow("InstrumentID");
        this.instrumentCode = dataRow("InstrumentCode");
        //this.timestamp = ToDate(dataRow("Timestamp"));
        this.timestamp = XmlConvertToDateTime(dataRow("Timestamp"));
        this.origin = dataRow("Origin");
		this.status = EnumStatus.Unchanged;
	};

	this.UpdateByValue = function (instrumentID, instrumentCode, timestamp, origin) {
	    this.instrumentID = instrumentID;
	    this.instrumentCode = instrumentCode;
	    //this.timestamp = new Date(timestamp);
	    this.timestamp = timestamp;
	    this.origin = origin;
	    this.status = EnumStatus.Inserted;
	};
}

function QuotationColumns() {
    var fields = "instrumentID|instrumentCode|timestamp|origin";
    
    var fields2 = fields.split("|");
	for(i=1;i<=fields2.length;i++)
	{	
		var index = i;
	    var field = fields2[i-1];
	    eval("this." + field + " = new QuotationColumn(" + index + ",\"" + field + "\")");
	}	
}

function QuotationColumn(index,key)
{
    this.index = index;
    this.key = key;
}

//function HistoryQuotation(row)
//{
//	this.instrumentID = row("InstrumentID");
//	this.instrumentCode = row("InstrumentCode");
//	this.timestamp = new Date(row("Timestamp"));
//	this.bid = row("Bid");
//	this.ask = row("Ask");	

//	this.instrumentID;
//	this.instrumentCode;
//	this.timestamp;
//	this.bid;
//	this.ask;

//	for(var index=0,count=xmlNode.attributes.length;index<count;index++)
//	{
//		var attribute = xmlNode.attributes.item(index);
//		switch(attribute.nodeName)
//		{
//			case "InstrumentID":
//				this.instrumentID = attribute.nodeValue;
//				break;
//			case "InstrumentCode":
//				this.instrumentCode = attribute.nodeValue;
//				break;
//			case "Timestamp":
//				this.timestamp = attribute.nodeValue;
//				break;
//			case "Bid":
//				this.bid = attribute.nodeValue;
//				break;
//			case "Ask":
//				this.ask = attribute.nodeValue;
//			default:break;
//		}
//	}
//}

//#endregion Common

//#region Public Function

var EnumStatus = new EnumStatus();

function EnumStatus()
{
    this.Unchanged = "Unchanged";
    this.Inserted = "Inserted";
    this.Modified = "Modified";
    this.Deleted = "Deleted";    
}

function GetStatusColor(enumStatus)
{
    if (enumStatus == EnumStatus.Inserted)
    {
        return color_green;
    }
    else if (enumStatus == EnumStatus.Modified)
    {
        return color_blue;
    }
    else if (enumStatus == EnumStatus.Deleted)
    {
        return color_red;
    }
    else
    {
        return color_black;
    }
}

function VerifyPrice(value) {
    if (/^(\+|- )?\d+($|\.\d+$)/.test(value)) {
        return true;
    }
    else {
        return false;
    }
}
//#endregion Public Function

//#region The following is AddHistoryQutoation Part
var transferObject;
var parentWin;
var modifyObject;
var dateTime;

function GetDialogArguments() {
    transferObject = window.dialogArguments;
    parentWin = transferObject.CallWindow;
    modifyObject = transferObject.ModifyObject;
    dateTime = transferObject.DateTime;
}

function AddHistoryQutoationInitialize() {
    GetDialogArguments();
    
    var quoteFrm = parentWin.window.dialogArguments.parent.quotationFrm;

	var oOption = document.createElement("OPTION");
	//oOption.text="<All>";
	//oOption.value="00000000-0000-0000-0000-000000000000";
	window.document.all.form1._InstrumentAddSelect.add(oOption);

	var instruments = (new VBArray(quoteFrm.oInstruments.Items())).toArray();
	//var quotePolicyID = quoteFrm.oDealingConsole.mainWindow.oCurrentQuotePolicyDetailID;   
	for(var index=0,count=instruments.length;index<count;index++) {
	    var instrument = instruments[index];
	    var quotePolicyDetail = instrument.GetFirstQuotePolicyDetail();
	    //if (!quotePolicyDetail.isOriginHiLo) {
	        var oOption = document.createElement("OPTION");
	        oOption.text = instrument.code;
	        oOption.value = instrument.id;
	        //oOption.selected = (index == "0");
	        window.document.all.form1._InstrumentAddSelect.add(oOption);
	    //}
    }
//    if (modifyObject == "HighLow")
//    {
//        window.document.all.form1._TimestampText.value = dateTime;
//    }
//    else
    //    {

    //window.document.all.form1._TimestampText.value = GetDateTimeString(new Date(dateTime.replace(/-/g, "/")), "DateTimeMillionSeconds");
    window.document.all.form1._TimestampText.value = dateTime;
//    }
}

function SetDateTime(s) {
    var pointIndex = s.indexOf(".");
    if (pointIndex <= 0) {
        return new Date(s);
    }
    else
    {
        var date = new Date(s.substring(0, pointIndex));
        var millionSecondsString = s.substring(pointIndex, s.length);
        if (millionSecondsString.length > 1) {
            millionSecondsString = millionSecondsString.substring(1, millionSecondsString.length);
            var millionSeconds = parseInt(parseFloat(millionSecondsString));
            if (!(isNaN(millionSeconds) || millionSeconds < 0 || millionSeconds > 999)) {
                date.setMilliseconds(millionSeconds);
            }
        }
        return date;
    }
}

function OkAddButton_onclick()
{
	if (this.VerifyAddHistoryQuotation() == true)
	{
		var instrumentID;
		var instrumentCode;
		var timestamp;
		var origin;		
		var index = window.document.all.form1._InstrumentAddSelect.selectedIndex;
		var option = window.document.all.form1._InstrumentAddSelect.options[index];
		instrumentID = option.value;
		instrumentCode= option.text;
		timestamp = SetDateTime(window.document.all.form1._TimestampText.value.replace(/-/g, "/"));
		origin = window.document.all.form1._OriginText.value;
		var historyQuotation = new HistoryQuotation();
		historyQuotation.UpdateByValue(instrumentID, instrumentCode, timestamp, origin);
		var isSucceed = parentWin.UpdateQuotationFlexGridForOuter(modifyObject, historyQuotation);
		if (isSucceed)
		{
		    window.close();
		}
	}
}

function CancelAddButton_onclick() 
{
	window.close();
}

function InstrumentAddSelect_Onchange() {
    var index = window.document.all.form1._InstrumentAddSelect.selectedIndex;
    var option = window.document.all.form1._InstrumentAddSelect.options[index];
    if (option.value != "") {
        window.document.all._OverridedQuotationLastTimestampDiv.innerText = "";
	    OverridedQuotationGetLastTimestamp(option.value);
	}
}

function OverridedQuotationGetLastTimestamp(instrumentID) {
    try {
        var xmlDoc2 = new ActiveXObject("Msxml2.DOMDocument");
        xmlDoc2.async = false;
        xmlDoc2.resolveExternals = false;

        xmlDoc2.load("Service.asmx/OverridedQuotationGetLastTimestamp?InstrumentID=" + instrumentID);
        if (xmlDoc2) {
            var rowNode = xmlDoc2.getElementsByTagName("OverridedQuotations")[0];
            FillLastTimestamp(rowNode);
        }
    }
    catch (ex) {
        alert("Failed to Get Last Timestamp for Overrided Quotation!");
    }
}

function FillLastTimestamp(rowNode) {
    if (!rowNode) return;

    for (var index = 0; index < rowNode.childNodes.length; index++) {
        var rowNode2 = rowNode.childNodes[index];
        var timestamp = rowNode2.getAttribute("Timestamp");

        window.document.all._OverridedQuotationLastTimestampDiv.innerText = timestamp;
        window.document.all.form1._TimestampText.value = timestamp;
    }
}

function VerifyAddHistoryQuotation() {
    var index = window.document.all.form1._InstrumentAddSelect.selectedIndex;
	var option = window.document.all.form1._InstrumentAddSelect.options[index];
	if (option.value == "")
	{
	    //showModalDialog("Alert.aspx", "Bad input, you must select instrument!","status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
	    alert("Bad input, you must select instrument!");
		return false;		
	}

	var passed = OnSetDateTime();
	if (!passed) {
	    return false;
	}	
//	var s = window.document.all.form1._TimestampText.value.replace(/-/g, "/");
//	var timestamp = new Date(s);
//	if(!timestamp || isNaN(timestamp))
//	{
//	    alert("Bad input, you must input correct datetime!");
//		return false;
//	}
	if (window.document.all.form1._OriginText.value == "")
	{
	    alert("Bad input, you must input origin price!");
		return false;
	}
	if (VerifyPrice(window.document.all.form1._OriginText.value)==false)
	{
	    alert("Bad input, you must input the right origin price!");
		return false;
	} 
	return true;
}

function OnSetPrice(theEvent)
{
	if(VerifyPrice(window.document.all.form1._OriginText.value)==false) {
	    alert("Bad input, you must input correct price!");
		if(theEvent)
			theEvent.returnValue = false;
		return false;
	}
	return true;
}

function TradeDayValidation(textControl) {
    var s = textControl.value;
    s = s.replace(/-/g, "/");
    var newDate = new Date(s);
    if (newDate && !isNaN(newDate)) {
        textControl.value = GetDateTimeString(newDate, "Date");
        return true;
    }
    else {
        alert("Bad input, you must input correct TradeDay!");
        textControl.focus();
        return false;
    }
    return true;
}

function DateTimeValidation(textControl) {
    DateTimeValidationByDateTimeFormat(textControl, "yyyy-MM-dd HH:mm");
}

function DateTimeValidationByDateTimeFormat(textControl, dateTimeFormat) {
    var s = textControl.value;
    s = s.replace(/-/g, "/");
    var newDate = new Date(s);
    if (newDate && !isNaN(newDate)) {
        if (dateTimeFormat == "yyyy-MM-dd HH:mm") {
            textControl.value = GetDateTimeString(newDate, "DateTime").substr(0, 16);
        }
        else {
            textControl.value = GetDateTimeString(newDate, "DateTime");
        }
        return;
    }
    else {
        alert("Bad input, you must input correct datetime!");
        textControl.focus();
        return;
    }
}
         
function DateTimeMillionSecondsValidation(textControl) {
    var s = textControl.value;
    s = s.replace(/-/g, "/");
    var pointIndex = s.indexOf(".");
    var millionSecondsString = "000";
    var millionSeconds;
    if (pointIndex > 0) {
        millionSecondsString = s.substring(pointIndex, s.length);
        if (millionSecondsString.length > 1) {
            millionSecondsString = millionSecondsString.substring(1, millionSecondsString.length);
            millionSeconds = parseInt(parseFloat(millionSecondsString));
            if (isNaN(millionSeconds) || millionSeconds < 0 || millionSeconds > 999) {
                alert("Bad input, you must input correct datetime!");
                textControl.focus();
                return false;
            }
        }
        else {
            alert("Bad input, you must input correct datetime!");
            textControl.focus();
            return false;
        }
        s = s.substring(0,pointIndex);
    }
    var newDate = new Date(s);
    if (newDate && !isNaN(newDate)) {
        var s2 = window.document.all._OverridedQuotationLastTimestampDiv.innerText.replace(/-/g, "/")
        var pointIndex2 = s2.indexOf(".");
        var millionSecondsStringLast = "000";
        var millionSecondsLast;
        if (pointIndex2 > 0) {
            millionSecondsStringLast = s2.substring(pointIndex2, s2.length);
            if (millionSecondsStringLast.length > 1) {
                millionSecondsStringLast = millionSecondsStringLast.substring(1, millionSecondsStringLast.length);
                millionSecondsLast = parseInt(parseFloat(millionSecondsStringLast));
                
                s2 = s2.substring(0, pointIndex2);
            }
        }
        var lastTimestamp = new Date(s2);
        if (lastTimestamp && !isNaN(lastTimestamp)) {
            if (newDate.valueOf() > lastTimestamp.valueOf()) {
                //textControl.value = window.document.all._OverridedQuotationLastTimestampDiv.innerText;
                alert("Bad input, you must input correct datetime!");
                textControl.focus();
                return false;
            }
        }
    
        if (typeof (millionSeconds) == 'undefined') return true;

        var millionSecondsString2 = "";
        if (millionSeconds < 10)
            millionSecondsString2 += "00";
        else if (millionSeconds < 100)
            millionSecondsString2 += "0";
        millionSecondsString2 += millionSeconds.toString();
        
        var lastTimestamp = new Date(s2);
        if (lastTimestamp && !isNaN(lastTimestamp)) {
            if (typeof (millionSecondsLast) != 'undefined' && newDate.valueOf() == lastTimestamp.valueOf() && millionSeconds > millionSecondsLast)
            {
                alert("Bad input, you must input correct datetime!");
                textControl.focus();
                return false;
            }
            else
            {
                textControl.value = GetDateTimeString(newDate, "DateTimeMillionSeconds").replace(".000", "." + millionSecondsString2);
            }
        }
        else {
            textControl.value = GetDateTimeString(newDate, "DateTimeMillionSeconds").replace(".000", "." + millionSecondsString2);
        }
        return true;
    }
    else {
        alert("Bad input, you must input correct datetime!");
        textControl.focus();
        return false;
    }
    
    return true;
}

function OnSetDateTime() {
//    if (modifyObject == "HighLow") {
//        return TradeDayValidation(window.document.all.form1._TimestampText);
//    }
//    else {
        return DateTimeMillionSecondsValidation(window.document.all.form1._TimestampText);
//    }
}
//#endregion The following is AddHistoryQutoation Part

//#region RestoreHighLow
function FillRestoreHighLowSelect() {
    var selectControl = window._RestoreHighLowSelect;
    selectControl.options.length = 0;
    var quoteFrm = window.dialogArguments.parent.quotationFrm;
    var updateHighLowBatchProcessInfos = (new VBArray(quoteFrm.oUpdateHighLowBatchProcessInfos.Items())).toArray();
    updateHighLowBatchProcessInfos = updateHighLowBatchProcessInfos.sort(CompareSortBatchUpdateHighLow);
    for (var index = 0, count = updateHighLowBatchProcessInfos.length; index < count; index++) {
        var updateHighLowBatchProcessInfo = updateHighLowBatchProcessInfos[index];
        var oOption = document.createElement("OPTION");
        oOption.value = updateHighLowBatchProcessInfo.getId();
        oOption.text = updateHighLowBatchProcessInfo.getCode();
        selectControl.add(oOption);
    }
}

function CompareSortBatchUpdateHighLow(objA, objB) {
    if (objA.sortKey() > objB.sortKey())
        return -1;
    else if (objA.sortKey() < objB.sortKey())
        return 1;
    else
        return 0;
}

function InitRestoreHighLow() {
    GetUpdateHighLowBatchProcessInfos();
}

function GetUpdateHighLowBatchProcessInfos()
{
    var quoteFrm = window.dialogArguments.parent.quotationFrm;
    if (quoteFrm.oUpdateHighLowBatchProcessInfos.Count <= 0) {
        quoteFrm.oIOProxy.GetUpdateHighLowBatchProcessInfos(this);
    }
    else {
        FillRestoreHighLowSelect();
    }
}

function GetUpdateHighLowBatchProcessInfosResult(xmlData) {
    FillRestoreHighLowSelect();
}

//var instrument = instruments[index];
//if (needCheckIsOriginHiLo) {
//    var quotePolicyDetail = instrument.GetFirstQuotePolicyDetail();
//    if (!quotePolicyDetail.isOriginHiLo) {

function RestoreHighLowButton_Onclick() {
    var id = window._RestoreHighLowSelect.value;//instrumentId + "_" + batchProcessId.toString()
    if (id == null || id == "") return;
    var batchProcessId = parseInt(id.substring(37, id.length));
    var quoteFrm = window.dialogArguments.parent.quotationFrm;
    var instrumentId = id.substring(0, 36);
    var instrument = quoteFrm.oDealingConsole.GetInstrumentById(instrumentId);
    var quotePolicyDetail = instrument.GetFirstQuotePolicyDetail();
    if (quotePolicyDetail.isOriginHiLo) {
        alert("Only allow restore high low when IsOriginHiLo is false");
    }
    else {
        quoteFrm.oIOProxy.RestoreHighLow(this, batchProcessId);
    }
}

function RestoreHighLowResult(isSucceed, batchProcessId, result) {
    if (isSucceed) {
        FillRestoreHighLowSelect();
    }
}

function RefreshRestoreHighLowInfoButton_Onclick() {
    GetUpdateHighLowBatchProcessInfos();
}

function RestoreHighLowSelect_Onchange() {
    var id = window._RestoreHighLowSelect.value; //instrumentId + "_" + batchProcessId.toString()
    if (id == null || id == "") return;
    var batchProcessId = parseInt(id.substring(37, id.length));
    var instrumentId = id.substring(0, 36);
    var lastIdForTheSameInstrument = id;
    var quoteFrm = window.dialogArguments.parent.quotationFrm;    
    var updateHighLowBatchProcessInfos = (new VBArray(quoteFrm.oUpdateHighLowBatchProcessInfos.Items())).toArray();
    updateHighLowBatchProcessInfos = updateHighLowBatchProcessInfos.sort(CompareSortBatchUpdateHighLow);
    for (var index = 0, count = updateHighLowBatchProcessInfos.length; index < count; index++) {
        var updateHighLowBatchProcessInfo = updateHighLowBatchProcessInfos[index];
        if (updateHighLowBatchProcessInfo.instrumentId == instrumentId) {
            lastIdForTheSameInstrument = updateHighLowBatchProcessInfo.getId();
            break;
        }
    }
    if (lastIdForTheSameInstrument != id) {                
        for (var index = 0, count = window._RestoreHighLowSelect.options.length; index < count; index++) {
            if (window._RestoreHighLowSelect.options[index].value == lastIdForTheSameInstrument) {
                window._RestoreHighLowSelect.selectedIndex = index;
                break;
            }
        }
    }

}
//#endregion RestoreHighLow