
function GetQuotationFrm() {
    return window.parent.parent.parent.quotationFrm;
}

var instantOrderListPageLoaded = false;
function InstantOrderOnload() {
    instantOrderListPageLoaded = true;
}

function InstantOrderOnunload() {
    
}

var quotationFrm;
var instantOrderListGridColKey;
var instantOrderListGridLanguage;
var commonLanguage;
var messageLanguage;

//var instantOrderListInitTimeOutID = null;
var isInitialized = false;
function InstantOrderListInit() {
    if (isInitialized) return;

    quotationFrm = GetQuotationFrm();
    instantOrderListGridColKey = quotationFrm.instantOrderListGridColKey;
    instantOrderListGridLanguage = quotationFrm.instantOrderListGridLanguage;
    commonLanguage = quotationFrm.commonLanguage;
    messageLanguage = quotationFrm.messageLanguage;

    SettingLanguage();
    InstantOrderListGridInit();
    instantOrderListInitTimeOutID = window.setTimeout(InstantOrderListInitTimeOut, 10);
    isInitialized = true;
}

function InstantOrderListInitTimeOut() {
    if (instantOrderListInitTimeOutID) { window.clearTimeout(instantOrderListInitTimeOutID); instantOrderListInitTimeOutID = null; }
    //OnResetInstantOrderList();
    RefreshInstrumentComboData();
}

function InstantOrderListGridInit() {
    window._InstantOrderListGrid.Redraw = false;
    with (window._InstantOrderListGrid) {
        Cols = 14;
        Rows = 1;
        FixedRows = 1;
        FixedCols = 0;

        var parameter = quotationFrm.oDealingConsole.InitGrid(window._InstantOrderListGrid, quotationFrm.optionGrid.InstantOrderListGrid, instantOrderListGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForInstantOrderList(window._InstantOrderListGrid, instantOrderListGridColKey);

        var columnIndex = ColIndex(instantOrderListGridColKey.SubmitTime);
        ColDataType(columnIndex) = flexDTDate;
        ColFormat(columnIndex) = "yyyy-MM-dd HH:mm:ss";
//        columnIndex = ColIndex(instantOrderListGridColKey.AcceptAction);
//        ColComboList(columnIndex) = "...";
//        columnIndex = ColIndex(instantOrderListGridColKey.RejectAction);
//        ColComboList(columnIndex) = "...";
//        MergeCells = flexMergeFixedOnly;
//        MergeCol(columnIndex) = true;
//        MergeRow(0) = true;

        //FrozenCols = 3;
        
        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSortAndMove; // flexExMove;
        SelectionMode = flexSelectionFree;
        OutlineBar = flexOutlineBarComplete;
        Editable = flexEDNone;
        Ellipsis = flexEllipsisEnd;
    }
    window._InstantOrderListGrid.Redraw = true;
}

function GridColumnsDefaultFormatForInstantOrderList(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.Status)) = 1500;
        ColWidth(ColIndex(gridColKey.AcceptAction)) = 800;
        ColWidth(ColIndex(gridColKey.DiffPrice)) = 800;
        ColWidth(ColIndex(gridColKey.RejectAction)) = 800;
        //ColWidth(ColIndex(gridColKey.SubmitTime)) = 1600;
        //ColWidth(ColIndex(gridColKey.AccountCode)) = 800;
        ColWidth(ColIndex(gridColKey.SetPrice)) = 800;
        ColWidth(ColIndex(gridColKey.Lot)) = 400;
        ColWidth(ColIndex(gridColKey.IsOpen)) = 400;
        ColWidth(ColIndex(gridColKey.QuotePolicyCode)) = 1200;
        //ColWidth(ColIndex(gridColKey.DQMaxMove)) = 1000;
        //ColWidth(ColIndex(gridColKey.TransactionCode)) = 1650;
        //ColWidth(ColIndex(gridColKey.ContractSize)) = 800;
    }
}

function FillInstrumentSelect() {
    if (!isInitialized) return;
    window.document.all._InstrumentSelect.options.length = 0;
    var oOption;
    oOption = document.createElement("OPTION");
    oOption.text = "";
    oOption.value = "";
    oOption.selected = 0;
    window.document.all._InstrumentSelect.add(oOption);

    var instrumentOriginCodes = new ActiveXObject("Scripting.Dictionary"); //key=OriginCode value=OriginCode
    var instrumentSortByCodes = (new VBArray(quotationFrm.oInstrumentList.Items())).toArray();
    instrumentSortByCodes = instrumentSortByCodes.sort(CompareSortByOriginCode);
    for (var index = 0, iCount = instrumentSortByCodes.length; index < iCount; index++) {
        var instrumentSortByCode = instrumentSortByCodes[index];
        var originCode = instrumentSortByCode.originCode;
        if (!instrumentOriginCodes.Exists(originCode)) {
            instrumentOriginCodes.Add(originCode, null);

//            oOption = document.createElement("OPTION");
//            oOption.text = instrumentSortByCodes[index].originCode;
//            oOption.value = instrumentSortByCodes[index].originCode;
//            //oOption.selected = (index == "0");
//            window.document.all._InstrumentSelect.add(oOption);
        }
    }
    var instrumentOriginCodes2 = (new VBArray(instrumentOriginCodes.Keys())).toArray();
    for (var index = 0, iCount = instrumentOriginCodes2.length; index < iCount; index++) {
        var instrumentOriginCode = instrumentOriginCodes2[index];
        oOption = document.createElement("OPTION");
        oOption.text = instrumentOriginCode;
        oOption.value = instrumentOriginCode;
        window.document.all._InstrumentSelect.add(oOption);
    }
}

function CompareSortByOriginCode(objA, objB) {
    if (objA.originCode > objB.originCode)
        return 1;
    else if (objA.originCode < objB.originCode)
        return -1;
    else
        return 0;
}

function RefreshInstrumentComboData() {
    if (!isInitialized) return;
    FillInstrumentSelect();
//    quotationFrm.oDealingConsole.setInstrumentComboString();
//    OnResetInstantOrderList();
    RemoveAllRow();
    window.document.all._VariationText.value = "0";
}

//function OnResetInstantOrderList() {
//    window._InstrumentSelectGrid.Redraw = false;
//    window._InstrumentSelectGrid.MousePointer = flexHourglass;
//    selectGridInit(window._InstrumentSelectGrid);
//    window._InstrumentSelectGrid.ColComboList(0) = quotationFrm.oDealingConsole.getInstrumentComboString(false, "All", true);
//    //window._InstrumentSelectGrid.focus();
//    window._InstrumentSelectGrid.select(0, 0);
//    window._InstrumentSelectGrid.MousePointer = flexDefault;
//    window._InstrumentSelectGrid.Redraw = true;
//}

function QueryButton_Onclick() {
    var instrument = GetCurrentInstrument();
    if (instrument == null) {
        alert("Please select origin code to query.");
        return;
    }
    UpdateOriginQuotationInit();
    var vsflexGrid = window._InstantOrderListGrid;
    vsflexGrid.Rows = vsflexGrid.FixedRows;
    vsflexGrid.Redraw = false;
    vsflexGrid.MousePointer = flexHourglass;
    var line = vsflexGrid.FixedRows;
    var orders = (new VBArray(quotationFrm.oPendingOrders.Items())).toArray();
    for (var index = 0, count = orders.length; index < count; index++) {
        var order = orders[index];
        if (!MatchQueryCondition(order)) continue; 
        vsflexGrid.AddItem("");
        FillRow(quotationFrm, vsflexGrid, instantOrderListGridColKey, order, line);
        UpdateOrderStatus(order, vsflexGrid, line, instantOrderListGridColKey);
        line++;
    }
    vsflexGrid.MousePointer = flexDefault;
    vsflexGrid.Redraw = true;
}

function MatchQueryCondition(order) {
    if (order.tran.orderType != OrderType.SpotTrade) return false;
    if (!MatchInstrument(order.GetInstrument())) return false;
    var buySellSelect = window._BuySellSelect.value;
    if (buySellSelect != "-1") {
        if ((order.isBuy && buySellSelect == "0") || (!order.isBuy && buySellSelect == "1")) return false;
    }
    var newCloseSelect = window._NewCloseSelect.value;
    if (newCloseSelect != "-1") {
        if ((order.isOpen && newCloseSelect == "0") || (!order.isOpen && newCloseSelect == "1")) return false;
    }
    return true;    
}

function GetDiffPrice(order) { 
    var customer = order.GetCustomer();
    var instrument = order.GetInstrument();

    var quotePolicyDetail = null;
    if (instrument.quotePolicyDetails.Exists(customer.privateQuotePolicyID)) {
        quotePolicyDetail = instrument.quotePolicyDetails.Item(customer.privateQuotePolicyID);
    }
    else if (instrument.quotePolicyDetails.Exists(customer.publicQuotePolicyID)) {
        quotePolicyDetail = instrument.quotePolicyDetails.Item(customer.publicQuotePolicyID);
    }
    if (quotePolicyDetail != null) {
        var marketOriginPrice = quotationFrm.ObjectPool.GetCorrectPriceHelper(window.document.all._MarketOriginPriceDiv.innerText, instrument.numeratorUnit, instrument.denominator);
        if (marketOriginPrice != null) {
            var bid = marketOriginPrice.Add(quotePolicyDetail.autoAdjustPoints);
            var ask = bid.Add(quotePolicyDetail.spreadPoints);
            if (instrument.isNormal == order.isBuy) {
                return order.setPrice.SubStract(ask);
            }
            else {
                return bid.SubStract(order.setPrice);
            }
        }
    }
    return 0;
}

function AllowAccept(order) {
    //Allow: (isNormal = IsBuy), SetPrice >= Calculated.Quotepolicy.Ask, SetPrice <= Calculated.Quotepolicy.Bid
    var customer = order.GetCustomer();
    var instrument = order.GetInstrument();

    var quotePolicyDetail = null;
    if (instrument.quotePolicyDetails.Exists(customer.privateQuotePolicyID)) {
        quotePolicyDetail = instrument.quotePolicyDetails.Item(customer.privateQuotePolicyID);
    }
    else if (instrument.quotePolicyDetails.Exists(customer.publicQuotePolicyID)) {
        quotePolicyDetail = instrument.quotePolicyDetails.Item(customer.publicQuotePolicyID);
    }
    if (quotePolicyDetail != null) {
        var marketOriginPrice = quotationFrm.ObjectPool.GetCorrectPriceHelper(window.document.all._MarketOriginPriceDiv.innerText, instrument.numeratorUnit, instrument.denominator);
        if (marketOriginPrice != null) {
            var variation = parseInt(window.document.all._VariationText.value);
            variation = isNaN(variation)?0:variation;
            marketOriginPrice = marketOriginPrice.Add(variation);
            var ask = null;
            var bid = null;
            if (quotePolicyDetail.priceType == PriceType.Watch) {
                var diffValue = instrument.GetSourceAskBidDiffValue();
                bid = marketOriginPrice;
                ask = bid.Add(diffValue);
            }
            else if (quotePolicyDetail.priceType == PriceType.OriginEnable) {
                bid = marketOriginPrice.Add(quotePolicyDetail.autoAdjustPoints).Add(0 - quotePolicyDetail.spreadPoints);
                var diffValue = instrument.GetSourceAskBidDiffValue();
                ask = bid.Add(Math.abs(diffValue)).Add(quotePolicyDetail.spreadPoints);
            }
            else {
                bid = marketOriginPrice.Add(quotePolicyDetail.autoAdjustPoints);
                ask = bid.Add(quotePolicyDetail.spreadPoints);
            }
            if (instrument.isNormal == order.isBuy) {
                if (ask != null) {
                    return order.setPrice.MoreEqual(ask);
                }
            }
            else {
                if (bid != null) {
                    return order.setPrice.LessEqual(bid);
                }
            }
        }
    }

    return false;
}

function MatchInstrument(instrument) {
    return (instrument.originCode == currencyInstrumentOriginCode);//  window.document.all._InstrumentSelect.value;
//    //var originCode = window._InstrumentSelectGrid.Cell(flexcpText, 0, 0);
//    var originCode = window.document.all._InstrumentSelect.value;
//    return (instrument.originCode.toLowerCase() == originCode.toLowerCase());
}

function InstantOrderListGrid_Click() {
    var vsflexGrid = window._InstantOrderListGrid;
    if (vsflexGrid.Row < vsflexGrid.FixedRows || vsflexGrid.Col < vsflexGrid.FixedCols) return;
    var colkey = vsflexGrid.ColKey(vsflexGrid.Col);
    if (colkey == instantOrderListGridColKey.AcceptAction) {
        OnOrderAccept(vsflexGrid, vsflexGrid.Row, true);
    }
    else if (colkey == instantOrderListGridColKey.RejectAction) {
        OnOrderReject(vsflexGrid, vsflexGrid.Row, true);
    }
}

function GetCurrentInstrument() {
    var instrument = null;
    //var originCode = window._InstrumentSelectGrid.Cell(flexcpText, 0, 0);
    var originCode = window.document.all._InstrumentSelect.value;
    if (originCode == null || originCode == "") return instrument;
    var instruments = (new VBArray(quotationFrm.oInstruments.Items())).toArray();
    for (var index = 0, count = instruments.length; index < count; index++) {
        var instrument2 = instruments[index];
        if (instrument2.originCode.toLowerCase() != originCode.toLowerCase()) continue;
        if (instrument == null) {
            instrument = instrument2;
        }
        else {
            if (instrument2.acceptDQVariation < instrument.acceptDQVariation) {
                instrument = instrument2;
            }
        }
    }
    return instrument;
}

function ExecuteAll_Onclick() {
    var instrument = GetCurrentInstrument();
    if (instrument == null) {
        alert(messageLanguage["ExecuteAllMsg"]);
        return;
    }
    if (window.document.all._MarketOriginPriceDiv.innerText == "") {
        alert(messageLanguage["ExecuteAllAlert"]);
        return;
    }
    onBlurEvent();
    var vsflexGrid = window._InstantOrderListGrid;
    for (var count = vsflexGrid.Rows, index = count - 1; index >= vsflexGrid.FixedRows; index--) {
        var order = vsflexGrid.RowData(index);
        if (AllowAccept(order)) {
            OnOrderAccept(vsflexGrid, index, false);
        }
        else {
            OnOrderReject(vsflexGrid, index, false);
        }
    }
}

function RemoveAllRow() {
    var vsflexGrid = window._InstantOrderListGrid;
    vsflexGrid.Rows = vsflexGrid.FixedRows;
    window.document.all._MarketOriginPriceDiv.innerText = "";
}

var currencyInstrumentOriginCode = "";
//function InstrumentSelectGrid_AfterEdit(row, col, cancel) {
function InstrumentSelect_Onchange(){
    RemoveAllRow();
    window.document.all._VariationText.value = "0";
    currencyInstrumentOriginCode = window.document.all._InstrumentSelect.value;
}

function BuySellSelect_Onchange() {
    RemoveAllRow();
}

function NewCloseSelect_Onchange() {
    RemoveAllRow();
}

function UpdateOriginQuotationProcess(instrument) {
    var quotation = GetQuotation(instrument);
    FillOrigin(quotation);
}

function FillOrigin(quotation) {
    if (!quotation || !quotation.origin) return;
    var origin = quotation.origin;
    var oldValue = parseFloat(window.document.all._MarketOriginPriceDiv.innerText);
    oldValue = isNaN(oldValue) ? 0 : oldValue;
    var newValue = origin.ToDouble();
    var color = "black";
    if (newValue > oldValue) {
        color = "Blue";
    }
    else if (newValue < oldValue) {
        color = "Red";
    }
    window.document.all._MarketOriginPriceDiv.style.color = color;
    window.document.all._MarketOriginPriceDiv.innerText = origin.ToString();
}

function GetQuotation(instrument) {
    var quotation;
    if (instrument.originQuotation && instrument.originQuotation.origin)
        quotation = instrument.originQuotation;
    if (!quotation || !quotation.origin) {
        if (instrument.lastQuotation && instrument.lastQuotation.origin) {
            quotation = instrument.lastQuotation;
        }
    }
    return quotation;
}

//timestamp
function GetLastQuotation() {
    var quotation = null;
    //var originCode = window._InstrumentSelectGrid.Cell(flexcpText, 0, 0);
    var originCode = window.document.all._InstrumentSelect.value;
    if (originCode == null || originCode == "") return quotation;
    var instruments = (new VBArray(quotationFrm.oInstruments.Items())).toArray();
    for (var index = 0, count = instruments.length; index < count; index++) {
        var instrument = instruments[index];
        if (instrument.originCode.toLowerCase() != originCode.toLowerCase()) continue;
        var quotation2 = GetQuotation(instrument);
        if (quotation == null) {
            quotation = quotation2;
        }
        else {
            if (quotation2 != null && quotation2.timestamp.valueOf() >= quotation.timestamp.valueOf()) {
                quotation = quotation2;
            }
        }
    }
    return quotation;
}

function UpdateOriginQuotationInit() {
    var quotation = GetLastQuotation();
    FillOrigin(quotation);
}

function UpdateOriginQuotation(instrument) {
    if (!MatchInstrument(instrument)) return;
    UpdateOriginQuotationProcess(instrument);

    var vsflexGrid = window._InstantOrderListGrid;
    for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
        var order = vsflexGrid.RowData(line);
        FillDiff(vsflexGrid, line, instantOrderListGridColKey, order);
    }
}

function IncreaseAutoPoints() {
    var instrument = GetCurrentInstrument();
    if (instrument == null) {
        window.document.all._VariationText.value = 0;
        return;
    }

    var points = parseInt(window.document.all._VariationText.value);
    if (isNaN(points)) points = 0;
    if (CheckVariation(instrument, points + instrument.numeratorUnit)) {
        window.document.all._VariationText.value = points + instrument.numeratorUnit;
    }
    else {
        window.document.all._VariationText.value = 0 - instrument.acceptDQVariation;
    }
}

function DecreaseAutoPoints() {
    var instrument = GetCurrentInstrument();
    if (instrument == null) {
        window.document.all._VariationText.value = 0;
        return;
    }

    var points = parseInt(window.document.all._VariationText.value);
    if (isNaN(points)) points = 0;
    if (CheckVariation(instrument, points - instrument.numeratorUnit)) {
        window.document.all._VariationText.value = points - instrument.numeratorUnit;
    } 
    else {
        window.document.all._VariationText.value = 0 - instrument.acceptDQVariation;
    }
}

function onBlurEvent() {
    var instrument = GetCurrentInstrument();
    if (instrument == null) {
        window.document.all._VariationText.value = 0;
        return;
    }

    var variation = parseInt(window.document.all._VariationText.value);
    if (isNaN(variation)) variation = 0;
    if (CheckVariation(instrument, variation)) {
        window.document.all._VariationText.value = variation;
    }
    else {
        window.document.all._VariationText.value = 0 - instrument.acceptDQVariation;
    }
}

function CheckVariation(instrument, variation) {
    if (variation < 0 && variation < (0 - instrument.acceptDQVariation)) {
        return false;
    }
    return true;
}

function AddDQOrderToGrid(order) {
    if (!isInitialized) return;
    if (!MatchQueryCondition(order)) return;

    var vsflexGrid = window._InstantOrderListGrid;
    if (vsflexGrid.Rows == vsflexGrid.FixedRows) {
        QueryButton_Onclick();
        return;
    }

    with (vsflexGrid) {
        Redraw = false;
        var line = FixedRows;
        var foundRow = FindRow(order.id, FixedRows, ColIndex(instantOrderListGridColKey.Id), true, true);
        if (foundRow > 0) {
            return;
        }
        AddItem("", line);
        FillRow(quotationFrm, vsflexGrid, instantOrderListGridColKey, order, line);
        UpdateOrderStatus(order, vsflexGrid, line, instantOrderListGridColKey);
        Redraw = true;
    }
}

function UpdateOrderStatus(order, vsflexGrid, line, instantOrderListGridColKey) {
    var orderInRow = vsflexGrid.RowData(line);
    orderInRow.status = order.status;
    orderInRow.lastStatus = order.lastStatus;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(instantOrderListGridColKey.Status)) = OrderStatus.GetOrderStatusString(order.status, GetQuotationFrm().commonLanguage);
}

function RemoveOrderFromGrid(order) {
    if (!isInitialized) return;
    if (!MatchQueryCondition(order)) return;

    var vsflexGrid = window._InstantOrderListGrid;
    with (vsflexGrid) {
        Redraw = false;
        var line = FixedRows;
        var foundRow = FindRow(order.id, FixedRows, ColIndex(instantOrderListGridColKey.Id), true, true);
        if (foundRow > 0) {
            RemoveItem(foundRow);
        }
        Redraw = true;
    }
}

function FillRow(quotationFrm, vsflexGrid, instantOrderListGridColKey, order, line) {
    with (vsflexGrid) {
        var account = order.GetAccount();
        var tran = order.tran;

        RowHeight(line) = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.InstantOrderListGrid);
        //TextMatrix(line, ColIndex(instantOrderListGridColKey.Status)) = OrderStatus.GetOrderStatusString(order.status, GetQuotationFrm().commonLanguage);
        //TextMatrix(line, ColIndex(instantOrderListGridColKey.SystemTime)) = GetDateTimeString(quotationFrm.oSystemTime, "DateTime");//.getVarDate();
        //TextMatrix(line, ColIndex(instantOrderListGridColKey.SubmitTime)) = GetDateTimeString(tran.submitTime, "DateTime");//.getVarDate();
        //TextMatrix(line, ColIndex(instantOrderListGridColKey.AccountCode)) = account ? account.code : tran.accountID;
        TextMatrix(line, ColIndex(instantOrderListGridColKey.SetPrice)) = (order.setPrice == null) ? "" : order.setPrice.ToString();
        TextMatrix(line, ColIndex(instantOrderListGridColKey.Lot)) = order.GetFormatLot2(order.lot);
        TextMatrix(line, ColIndex(instantOrderListGridColKey.IsOpen)) = order.isOpen ? "O" : "C";
        TextMatrix(line, ColIndex(instantOrderListGridColKey.QuotePolicyCode)) = order.GetQuotePolicyCode();
        //TextMatrix(line, ColIndex(instantOrderListGridColKey.DQMaxMove)) = order.dQMaxMove;
        //TextMatrix(line, ColIndex(instantOrderListGridColKey.TransactionCode)) = tran.code;
        //TextMatrix(line, ColIndex(instantOrderListGridColKey.ContractSize)) = tran.contractSize;
        SetRowForeColor(vsflexGrid, line, order.isBuy ? color_blue : color_red);
        TextMatrix(line, ColIndex(instantOrderListGridColKey.Id)) = order.id;
        FillDiff(vsflexGrid, line, instantOrderListGridColKey, order);
        RowData(line) = order;
        //SetRowBackColor(vsflexGrid, line, order.isBuy ? color_blue : color_red);
        Cell(flexcpBackColor, line, ColIndex(instantOrderListGridColKey.AcceptAction)) = color_lightblue;
        Cell(flexcpBackColor, line, ColIndex(instantOrderListGridColKey.RejectAction)) = color_lightcyan;
        TextMatrix(line, ColIndex(instantOrderListGridColKey.AcceptAction)) = "Accept";
        TextMatrix(line, ColIndex(instantOrderListGridColKey.RejectAction)) = "Reject";
        if (order.status == OrderStatus.WaitAcceptRejectPlace 
            || order.status == OrderStatus.WaitAcceptRejectCancel 
            || order.status == OrderStatus.WaitOutPriceDQ 
            || order.status == OrderStatus.WaitOutLotDQ) {
            Cell(flexcpForeColor, line, ColIndex(instantOrderListGridColKey.Status)) = color_black;
        }
        else {
            Cell(flexcpForeColor, line, ColIndex(instantOrderListGridColKey.Status)) = color_darkgray;
        }
    }
}

function FillDiff(vsflexGrid, line, instantOrderListGridColKey, order) {
    with (vsflexGrid) {
        var diff = GetDiffPrice(order);
        TextMatrix(line, ColIndex(instantOrderListGridColKey.DiffPrice)) = diff;
        Cell(flexcpForeColor, line, ColIndex(instantOrderListGridColKey.DiffPrice)) = diff < 0 ? color_red : color_blue;
    }
}

function OnOrderAccept(vsflexGrid, line, needConfirmWindow) {
    var isOK = false;
    var order = vsflexGrid.RowData(line);
    if (order.status == OrderStatus.WaitOutPriceDQ || order.status == OrderStatus.WaitOutLotDQ) {
        if (!needConfirmWindow) {
            isOK = true;
        }
        else if (order.mainWindow.oAutoConfirm == 1
            && (order.IsNeedDQMaxMove()
                || (order.mainWindow.oDealingConsole.AllowModifyOrderLot
                    && order.mainWindow.CanDealerViewAccountInfo)) == false) {
            isOK = true;
        }
        else {
            var args = null;
            if (order.mainWindow.CanDealerViewAccountInfo) {
                args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"], order);
                isOK = window.showModalDialog("DealerCanViewAccountInfoConfirm.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:320px;dialogHeight:400px");
            }
            else {
                args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"], order);
                isOK = window.showModalDialog("DQConfirm.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
            }
        }
        if (isOK) {
            order.DoAccept();
            vsflexGrid.RowHidden(line) = true;
        }
    }
}

function OnOrderReject(vsflexGrid,line,needConfirmWindow)
{
	var order = vsflexGrid.RowData(line);
	if (order.status == OrderStatus.WaitOutPriceDQ || order.status == OrderStatus.WaitOutLotDQ) {
	    if (needConfirmWindow) {
	        var confirmRejectDQOrder = order.mainWindow.oDealingConsole.ConfirmRejectDQOrder;
	        if (confirmRejectDQOrder) {
	            var args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"], order.GetDescription());
	            isOK = window.showModalDialog("Confirm.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
	            if (!isOK) {
	                return;
	            }
	        }
	    }
		order.DoReject();
        var color = vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex("Status"));
        vsflexGrid.RowHidden(line) = (color == color_darkgray)?true:false;
	}
}

function SettingLanguage() {
    if (commonLanguage == null) return;
    document.getElementById("_QueryButton").value = commonLanguage["Go"];
    document.getElementById("VariationLable").value = commonLanguage["Go"];
    VariationLable.innerText = commonLanguage["VariationLable"];
    document.getElementById("_ExecuteAllButton").value = commonLanguage["ExecuteAllButton"];
}

function InstantOrderListGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)
{
//    var vsflexGrid = window._InstantOrderListGrid;
//    if (newRow < vsflexGrid.FixedRows || newCol < vsflexGrid.FixedCols) return;
//    switch (vsflexGrid.ColKey(newCol)) {
//        case instantOrderListGridColKey.AcceptAction:
//        case instantOrderListGridColKey.RejectAction:
//            var order = vsflexGrid.RowData(newRow);
//            if (order.status == OrderStatus.WaitOutPriceDQ || order.status == OrderStatus.WaitOutLotDQ) {
//                vsflexGrid.Editable = flexEDKbdMouse;
//            }
//            else {
//                vsflexGrid.Editable = flexEDNone;
//            }
//            break;
//        default:
//            vsflexGrid.Editable = flexEDNone;
//            break;
//    }
}