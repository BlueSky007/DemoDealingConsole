var initTimeOutID = null;
var _RepairMultiNotifyOrderForOpenInterests = new ActiveXObject("Scripting.Dictionary"); //key=id value=null

function OpenInterestListInit() {
    OpenInterestListGridInit();
    initTimeOutID = window.setTimeout(InitTimeOut, 10); 
}

function InitTimeOut() {
    if (initTimeOutID) { window.clearTimeout(initTimeOutID); initTimeOutID = null; }
    OnResetList();
}

function OpenInterestListGridInit() {
    vsflexOpenInterest.Redraw = false;
    with (vsflexOpenInterest) {
        Cols = 12;
        Rows = 1;
        FixedRows = 1;
        FixedCols = 1;

        //var quotationFrm = window.opener.parent.quotationFrm;
        var quotationFrm = GetQuotationFrm();
        var interestGridColKey = quotationFrm.interestGridColKey;
        var interestGridLanguage = quotationFrm.interestGridLanguage;

        ColKey(0) = interestGridColKey.Sequence;
        TextMatrix(0, 0) = "NO";
        ColWidth(ColIndex(interestGridColKey.Sequence)) = 500;

        var parameter = quotationFrm.oDealingConsole.InitGrid(window.vsflexOpenInterest, quotationFrm.optionGrid.InterestGrid, interestGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForOpenInterest(window.vsflexOpenInterest, interestGridColKey);

        var columnIndex = ColIndex(interestGridColKey.ExecuteTime);
        ColDataType(columnIndex) = flexDTDate;
        ColFormat(columnIndex) = "yyyy-MM-dd HH:mm:ss";
        FrozenCols = 1;
        ColAlignment(ColIndex(interestGridColKey.AccountCode)) = flexAlignLeftCenter;

        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;

        SelectionMode = flexSelectionFree;
        ExplorerBar = flexExSortAndMove;
    }
    vsflexOpenInterest.Redraw = true;
}

//Added Michael on 2005-06-30
function GridColumnsDefaultFormatForOpenInterest(grid,gridColKey)
{
	with (grid)
	{
		ColWidth(ColIndex(gridColKey.Code)) = 1500; 
		ColWidth(ColIndex(gridColKey.AccountCode)) = 1000;
		ColWidth(ColIndex(gridColKey.BS)) = 600;
		ColWidth(ColIndex(gridColKey.ContractSize)) = 800;
		ColWidth(ColIndex(gridColKey.ExecuteTime)) = 2500; 
		ColWidth(ColIndex(gridColKey.ExecutePrice)) = 800;
		ColWidth(ColIndex(gridColKey.LotBalance)) = 800;
		//Added by Michael on 2008-06-27
		ColWidth(ColIndex(gridColKey.AutoLimitPrice)) = 1400;
		ColWidth(ColIndex(gridColKey.AutoStopPrice)) = 1400;
	}
}

var blotterCodeSelectedsForList = null;
var blotterCodeSelectedsForListTemp = null;
function ShowBlotterSelectionListButton_Onclick() {
    var args = new Object();
    args.quotationFrm = GetQuotationFrm();
    args.blotterCodeSelecteds = blotterCodeSelectedsForListTemp;// blotterCodeSelectedsForList;
    args.service = Service;
    var returnObject = window.showModalDialog("BlotterSelection.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:300px;dialogHeight:300px");
    if (returnObject.confirm) {
        blotterCodeSelectedsForListTemp = returnObject.returnValue;
    }
}

function RefreshInstrumentList_OnClick() {
    GetQuotationFrm().oDealingConsole.setInstrumentComboString();
    OnResetList();
}

function OnResetList() {
    window.InstrumentSelectGrid.Redraw = false;
    selectGridInit(window.InstrumentSelectGrid);
    window.InstrumentSelectGrid.ColComboList(0) = GetQuotationFrm().oDealingConsole.getInstrumentComboString(true, "Item Selection", false);
    //window.InstrumentSelectGrid.focus();
    window.InstrumentSelectGrid.select(0, 0);
    window.InstrumentSelectGrid.Redraw = true;
}

function vsflexOpenInterest_DblClick() {
    var vsflexGrid = window.vsflexOpenInterest;

    var accountId = "";
    var accountCode = "";
    var quotationFrm = GetQuotationFrm();
    var transferObject = new Object();
    transferObject.quotationFrm = quotationFrm;
    transferObject.accountId = accountId;
    transferObject.accountCode = accountCode;
    if (vsflexGrid.Row < vsflexGrid.FixedRows) {
        //return;
    }
    else {
        transferObject.accountId = vsflexGrid.TextMatrix(vsflexGrid.Row, vsflexGrid.ColIndex("AccountID"));
        transferObject.accountCode = vsflexGrid.TextMatrix(vsflexGrid.Row, vsflexGrid.ColIndex("AccountCode"));
    }
    window.showModalDialog("AccountStatusFrames.aspx", transferObject, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:1200px;dialogHeight:600px");
}

function PrintList() {
    try {
        if (window.vsflexOpenInterest) {
            //window.vsflexOpenInterest.PrintGrid();
            window.vsflexOpenInterest.PrintGrid("", true, 0, 0, 0);
        }
    }
    catch (e) {
        alert("Printer's I/O was error! please check your printer.");
    }
}

//Data process part------------------------
function AddOrderToOpenInterestListGrid(quotationFrm, order) {
    if (_RepairMultiNotifyOrderForOpenInterests.Exists(order.id)) {
        _RepairMultiNotifyOrderForOpenInterests.Remove(order.id);
        return;
    }
    else {
        _RepairMultiNotifyOrderForOpenInterests.Add(order.id, order.id);
    }

    if (window.InstrumentSelectGrid.Cell(flexcpText, 0, 0) != order.tran.instrumentID) {
        return;
    }
    if (!InStringArray(order.blotterCode, blotterCodeSelectedsForList)) return;

    var interestGridColKey = quotationFrm.interestGridColKey;
    var commonLanguage = quotationFrm.commonLanguage; 
	var vsflexGrid = vsflexOpenInterest;

	vsflexGrid.Redraw = false;
	if (order.isOpen) {
	    var line = vsflexGrid.Rows;
	    vsflexGrid.AddItem(line.toString());
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.ContractSize)) = order.tran.contractSize;
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.BS)) = order.isBuy ? commonLanguage["Buy"] : commonLanguage["Sell"];
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.LotBalance)) = order.GetFormatLot2(order.lotBalance);
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.Code)) = order.code;
	    var account = order.GetAccount();
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.AccountID)) = account.id;
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.AccountCode)) = account.code;
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.ExecutePrice)) = (order.executePrice).ToString();
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.ExecuteTime)) = GetDateTimeString(order.tran.executeTime, "DateTime"); //.getVarDate();
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.Id)) = order.id;
	    vsflexGrid.RowData(line) = order;
	    SetRowForeColor(vsflexGrid, line, order.isBuy ? color_blue : color_red);
	    if (vsflexGrid.RowSel == (line - 1)) {
	        vsflexGrid.Select(line, 0, line, vsflexGrid.Cols - 1);
	        vsflexGrid.ShowCell(line, 0);
	    }
	    //Added by Michael on 2008-06-27
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.AutoLimitPrice)) = (order.AutoLimitPrice == null || order.AutoLimitPrice == "") ? "" : (order.AutoLimitPrice).ToString();
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.AutoStopPrice)) = (order.AutoStopPrice == null || order.AutoStopPrice == "") ? "" : (order.AutoStopPrice).ToString();

	    //OnOpenInterestUpdate();
	    vsflexGrid.ScrollTrack = true;
	}
	else {
	    for (var i = 0, count = order.orderRelations.length; i < count; i++) {
	        var orderRelation = order.orderRelations[i];
	        var line = vsflexGrid.FindRow(orderRelation.openOrderID, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestGridColKey.Id), true, true);
	        if (line > 0) {
	            var order2 = vsflexGrid.RowData(line);
	            order2.lotBalance -= orderRelation.closedLot;
	            if (order2.lotBalance <= 0) {
	                vsflexGrid.RemoveItem(line);
                }
	            else {
	                vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestGridColKey.LotBalance)) = order.GetFormatLot2(order2.lotBalance - orderRelation.closedLot);
	            }
	        }
	    }
    }
	vsflexGrid.Redraw = true;

	FormatSummary();
}

function DeleteOrderFromOpenInterestListGrid(quotationFrm, deletedOrderId, accountId, instrumentId) {
    var interestGridColKey = quotationFrm.interestGridColKey;
    var vsflexGrid = vsflexOpenInterest;
    var line = vsflexGrid.FindRow(deletedOrderId, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestGridColKey.Id), true, true);
    if (line > 0) {
        vsflexGrid.Redraw = false;
        vsflexGrid.RemoveItem(line);
        vsflexGrid.Redraw = true;
        FormatSummary();
    }
}

function AffectOrderToOpenInterestListGrid(quotationFrm, order) {
    AddOrderToOpenInterestListGrid(quotationFrm, order);
}

function FormatSummary() {
    var buyLot, sellLot, buyAvg, sellAvg, buySum, sellSum;
    buyLot = 0;
    sellLot = 0;
    buyAvg = 0;
    sellAvg = 0;
    buySum = 0;
    sellSum = 0;

    var quotationFrm = GetQuotationFrm();
    var commonLanguage = quotationFrm.commonLanguage;
    var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
    var interestGridColKey = quotationFrm.interestGridColKey;
    with (vsflexOpenInterest) {
        for (var line = vsflexOpenInterest.FixedRows, iCount = vsflexOpenInterest.Rows; line < iCount; line++) {
            var bs = TextMatrix(line, ColIndex(interestGridColKey.BS));
            var lotBalance = TextMatrix(line, ColIndex(interestGridColKey.LotBalance));
            var executePrice = TextMatrix(line, ColIndex(interestGridColKey.ExecutePrice));

            if (bs == commonLanguage["Buy"]) {
                buyLot += parseFloat(lotBalance);
                if (lotBalance != 0)
                    buySum += (parseFloat(lotBalance) * parseFloat(executePrice));
            }
            else {
                sellLot += parseFloat(lotBalance);
                if (lotBalance != 0)
                    sellSum += (parseFloat(lotBalance) * parseFloat(executePrice));
            }
        }
    }

    buyAvg = buySum / buyLot;
    sellAvg = sellSum / sellLot;
    buyAvg = new String(buyAvg);
    sellAvg = new String(sellAvg);
    buyAvg = buyAvg.substring(0, buyAvg.indexOf(".") + 5);
    sellAvg = sellAvg.substring(0, sellAvg.indexOf(".") + 5);

    buyLotTD2.innerText = "Buy Lot: " + GetFormatLot2(buyLot, true, lotDecimal);
    buyAveTD2.innerText = "Buy Ave Price: " + (isNaN(buyAvg) ? "" : buyAvg);
    sellLotTD2.innerText = "Sell Lot: " + GetFormatLot2(sellLot, true, lotDecimal);
    sellAveTD2.innerText = "Sell Ave Price: " + (isNaN(sellAvg) ? "" : sellAvg);

    NetLotTD.innerText = "NET:" + GetFormatLot2(buyLot - sellLot, true, lotDecimal);
    var color = (buyLot - sellLot >= 0) ? "Blue" : "Red";
    NetLotTD.style.color = color;
}

var listTimeOutID = null;
var listCallID = null;
function QueryList() {
    _RepairMultiNotifyOrderForOpenInterests = new ActiveXObject("Scripting.Dictionary"); //key=id value=null

	vsflexOpenInterest.Rows = vsflexOpenInterest.FixedRows;
	//OnOpenInterestUpdate();

	var instrumentId = window.InstrumentSelectGrid.Cell(flexcpText, 0, 0);
	if (instrumentId == null || instrumentId == "" || instrumentId.length < 36) {
	    alert("Please select Instrument to query.");
	    return;
	}
	
	Service.useService("Service.asmx?WSDL","service");
	listCallID = Service.service.callService(GetOpenInstrumentDataResult, "GetOpenInstrumentData", instrumentId, blotterCodeSelectedsForListTemp);

	window.btnQueryList.disabled = true;
	listTimeOutID = window.setTimeout(ListTimeOut, 5000);

	function ListTimeOut() {
	    window.btnQueryList.disabled = false;
	    if (listTimeOutID) { window.clearTimeout(listTimeOutID); }
	}	
}

function GetOpenInstrumentDataResult(result) {
    window.btnQueryList.disabled = false;
    if (listTimeOutID) { window.clearTimeout(listTimeOutID); }

    if (result.error) {
//		var xfaultcode = result.errorDetail.code;
//		var xfaultstring = result.errorDetail.string;    
        //		var xfaultsoap = result.errorDetail.raw;
        alert("Failed to get open interest data!");
	}
	else {
	    blotterCodeSelectedsForList = blotterCodeSelectedsForListTemp;
	    var oXML = result;
	    vsflexOpenInterest.Redraw = false;
	    vsflexOpenInterest.MousePointer = flexHourglass;
		vsflexOpenInterest.MergeCells = 4;
		vsflexOpenInterest.MergeCol(vsflexOpenInterest.ColIndex("AccountCode")) = true;
		FillDataToListGrid(oXML);
		vsflexOpenInterest.MousePointer = flexDefault;
		vsflexOpenInterest.Redraw = true;
	}
}

function FillDataToListGrid(oXML)
{
    //var quotationFrm = window.opener.parent.quotationFrm;
    var quotationFrm = GetQuotationFrm();
    var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
	var interestGridColKey = quotationFrm.interestGridColKey;
		
	var xml = oXML.value;
	vsflexOpenInterest.Rows = 1;
	var dataSet = new ActiveXObject( "Microsoft.XMLDOM" );				
	dataSet.loadXML( xml );
	var oOrderCode = dataSet.selectNodes("//NewDataSet/OpenInstrument/Code");
	var iCount = oOrderCode.length;
	var buyLot, sellLot, buyAvg, sellAvg, buySum, sellSum;
	buyLot = 0;
	sellLot = 0;
	buyAvg = 0;
	sellAvg = 0;
	buySum = 0;
	sellSum = 0;

	var rowHeightValue = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.InterestGrid);
	with (vsflexOpenInterest)
	{	
		var insertRow = FixedRows;
		for (var i = 0 ; i < iCount ; i++)
		{
			oThis	= oOrderCode.item(i);
			oParent = oThis.parentNode;
			var orderCode = oThis.text;
            var accountID       = oParent.selectSingleNode("AccountID").text;
			var accountCode		= oParent.selectSingleNode("AccountCode").text;
			var bs				= oParent.selectSingleNode("BS").text ;
			var contractSize	= oParent.selectSingleNode("ContractSize").text ;
			var executeTime		= oParent.selectSingleNode("ExecuteTime").text ;
			var executePrice	= oParent.selectSingleNode("ExecutePrice").text ;
			var lotBalance = oParent.selectSingleNode("LotBalance").text;
			var orderId = oParent.selectSingleNode("ID").text;
			if (bs == "B")
			{
				buyLot += parseFloat(lotBalance);
				if (lotBalance != 0)
					buySum += (parseFloat(lotBalance) * parseFloat(executePrice));
			}
			else
			{
				sellLot += parseFloat(lotBalance);
				if (lotBalance != 0)
					sellSum += (parseFloat(lotBalance) * parseFloat(executePrice));
			}			
			AddItem("");
			
			RowHeight(insertRow) = rowHeightValue;
			
			TextMatrix(insertRow, ColIndex(interestGridColKey.Sequence)) = insertRow;
			TextMatrix(insertRow, ColIndex(interestGridColKey.Code)) = orderCode;
			TextMatrix(insertRow, ColIndex(interestGridColKey.AccountID)) = accountID;
			TextMatrix(insertRow, ColIndex(interestGridColKey.AccountCode)) = accountCode;
			TextMatrix(insertRow, ColIndex(interestGridColKey.BS)) = bs;
			TextMatrix(insertRow, ColIndex(interestGridColKey.ContractSize)) = contractSize;
			TextMatrix(insertRow, ColIndex(interestGridColKey.ExecuteTime)) = GetEditDateTime(executeTime);
			TextMatrix(insertRow, ColIndex(interestGridColKey.ExecutePrice)) = executePrice;
			TextMatrix(insertRow, ColIndex(interestGridColKey.LotBalance)) = GetFormatLot2(lotBalance, true, lotDecimal);
			TextMatrix(insertRow, ColIndex(interestGridColKey.Id)) = orderId;
			//Added by Michael on 2008-06-27
			
			if (oParent.selectSingleNode("AutoLimitPrice") == null)
			{
			    TextMatrix(insertRow, ColIndex(interestGridColKey.AutoLimitPrice)) = "";
			}
			else
			{
			    var autoLimitPrice	= oParent.selectSingleNode("AutoLimitPrice").text ;
			    TextMatrix(insertRow, ColIndex(interestGridColKey.AutoLimitPrice)) = autoLimitPrice;
			}
			if (oParent.selectSingleNode("AutoStopPrice") == null)
			{
			    TextMatrix(insertRow, ColIndex(interestGridColKey.AutoStopPrice)) = "";
			}
			else
			{
			    var autoStopPrice	= oParent.selectSingleNode("AutoStopPrice").text ;
			    TextMatrix(insertRow, ColIndex(interestGridColKey.AutoStopPrice)) = autoStopPrice;
			}
			
			SetRowForeColor(vsflexOpenInterest, insertRow, (bs == "B") ? color_blue : color_red);
			
			insertRow++;
		}

        ColFormat(ColIndex(interestGridColKey.AccountCode)) = "";
    }
	
	buyAvg = buySum/buyLot;
	sellAvg = sellSum/sellLot;
	buyAvg = new String(buyAvg);
	sellAvg = new String(sellAvg);
	buyAvg = buyAvg.substring(0, buyAvg.indexOf(".")+5 );
	sellAvg = sellAvg.substring(0, sellAvg.indexOf(".")+5 );

	buyLotTD2.innerText = "Buy Lot: " + GetFormatLot2(buyLot, true, lotDecimal);
	buyAveTD2.innerText = "Buy Ave Price: " + (isNaN(buyAvg)?"":buyAvg);
	sellLotTD2.innerText = "Sell Lot: " + GetFormatLot2(sellLot, true, lotDecimal);
	sellAveTD2.innerText = "Sell Ave Price: " + (isNaN(sellAvg) ? "" : sellAvg);

	NetLotTD.innerText = "NET:" + GetFormatLot2(buyLot - sellLot, true, lotDecimal);
	var color = (buyLot - sellLot >= 0) ? "Blue" : "Red";
	NetLotTD.style.color = color;
}

function convertRound(value, numdecimalplaces)
{
	if (typeof(numdecimalplaces) == 'undefined' ) numdecimalplaces = 4;
	value = new String(value);
	var intPart, decimalPart, out;
	var position =  value.indexOf(".");
	if (position == -1)
	{
		decimalPart 	= '.'+this.spaceZero(numdecimalplaces)	
	} else 
	{
		//if (value.substring(position+1, value.length).length >= numdecimalplaces) return value;
		try
		{	
		decimalPart 	= this.spaceZero(numdecimalplaces -(value.substring(position+1, value.length) ).length);
		}
		catch(e)
		{
			decimalPart = '0000';
		}
	}
	return( value + decimalPart);
}

function spaceZero(numdecimalplaces)
{
	var value;
	if (numdecimalplaces == 0)
	{
		value = '';
	} else
	{
		value = new String(0) ;
		for (var i = 1; i <numdecimalplaces; i++ )
		{
			value = value + '0';
		}
	}
	return value;
}