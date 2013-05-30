//var summaryInitTimeOutID = null;

function ExecuteOrderSummaryInit() {
    ExecuteOrderSummaryGridInit();
//    summaryInitTimeOutID = window.setTimeout(SummaryTimeOut, 10);    
}

//function SummaryTimeOut() {
//    if (summaryInitTimeOutID) { window.clearTimeout(summaryInitTimeOutID); summaryInitTimeOutID = null; }
//    OnResetSummary();
//}

function ExecuteOrderSummaryGridInit() {
    _ExecuteOrderSummaryGrid.Redraw = false;
    with (_ExecuteOrderSummaryGrid) {
        Cols = 7;
        Rows = 1;
        FixedRows = 1;
        FixedCols = 0;

        var quotationFrm = GetQuotationFrm();
        var executeOrderSummaryGridColKey = quotationFrm.executeOrderSummaryGridColKey;
        var executeOrderSummaryGridLanguage = quotationFrm.executeOrderSummaryGridLanguage;

        var parameter = quotationFrm.oDealingConsole.InitGrid(window._ExecuteOrderSummaryGrid, quotationFrm.optionGrid.ExecuteOrderSummaryGrid, executeOrderSummaryGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForExecuteOrderSummary(window._ExecuteOrderSummaryGrid, executeOrderSummaryGridColKey);

        FrozenCols = 1;
        ColAlignment(ColIndex(executeOrderSummaryGridColKey.Range)) = flexAlignRightCenter;

        ExtendLastCol = false;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSortAndMove; // flexExMove;
        SelectionMode = flexSelectionByRow;
        OutlineBar = flexOutlineBarComplete;
        Editable = flexEDNone;
        Ellipsis = flexEllipsisEnd;
    }

    _ExecuteOrderSummaryGrid.Redraw = true;
}

function GridColumnsDefaultFormatForExecuteOrderSummary(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.Range)) = 2200;
        ColWidth(ColIndex(gridColKey.OrderCount)) = 1200;
        ColWidth(ColIndex(gridColKey.SellLot)) = 1500;
        ColWidth(ColIndex(gridColKey.SellAvgPrice)) = 1500;
        ColWidth(ColIndex(gridColKey.BuyLot)) = 1500;
        ColWidth(ColIndex(gridColKey.BuyAvgPrice)) = 1500;
    }
}

//function RefreshInstrumentSummary_OnClick() {
//    GetQuotationFrm().oDealingConsole.setInstrumentComboString();
//    OnResetSummary();
//}

//function OnResetSummary() {
//    window._ExecuteOrderSummaryInstrumentSelectGrid.Redraw = false;
//    selectGridInit(window._ExecuteOrderSummaryInstrumentSelectGrid);
//    window._ExecuteOrderSummaryInstrumentSelectGrid.ColComboList(0) = GetQuotationFrm().oDealingConsole.getInstrumentComboString(true, "Item Selection", false);
//    //window._ExecuteOrderSummaryInstrumentSelectGrid.focus();
//    window._ExecuteOrderSummaryInstrumentSelectGrid.select(0, 0);
//    window._ExecuteOrderSummaryInstrumentSelectGrid.Redraw = true;
//}

function QueryOnTimeRadio_Onclick() {
    window.document.all._QueryOnPriceRadio.checked = false;
    QuerySummary();
}

function QueryOnPriceRadio_Onclick() {
    window.document.all._QueryOnTimeRadio.checked = false;
    QuerySummary();
}

function ExecuteOrderSummaryPrint() {
    try {
        if (window._ExecuteOrderSummaryGrid) {
            window._ExecuteOrderSummaryGrid.PrintGrid("", true, 0, 0, 0);
        }
    }
    catch (e) {
        alert("Printer's I/O was error! please check your printer.");
    }
}

function AddOrderToExecuteOrderSummaryGrid(quotationFrm, order) {
    var instrumentId = order.tran.instrumentID;
//    if (window._ExecuteOrderSummaryInstrumentSelectGrid.Cell(flexcpText, 0, 0) != order.tran.instrumentID) {
//        return;
//    }

    var instrumentSummaryItem = GetInstrumentSummaryItem(quotationFrm,instrumentId);
    //var executeOrderSummaryItems = GetExecuteOrderSummaryItems(instrumentId);
    var executeOrderSummaryItems = instrumentSummaryItem.childSummaryItems;
    var count = executeOrderSummaryItems.Count;
    if (count <= 0)
    {
        QuerySummaryByInstrumentId(quotationFrm, instrumentId);
        return;
    }
    var rangeType = window.document.all._QueryOnTimeRadio.checked ? RangeType.Time : RangeType.Price;
    var rangeValue = rangeType == RangeType.Time ? order.tran.executeTime : order.executePrice;
    var interval = rangeType == RangeType.Time ? parseInt(window.document.all._TimeRangeText.value) : parseInt(window.document.all._PriceRangeText.value);
    var rangeSummaryItem = null;
    var referenceRange = null;
    var executeOrderSummaryItems2 = (new VBArray(executeOrderSummaryItems.Items())).toArray();
    for (var index = 0; index < count; index++) {
        var rangeSummaryItem2 = executeOrderSummaryItems2[index];
        if (referenceRange == null) referenceRange = rangeSummaryItem2.range;
        if (rangeSummaryItem2.range.inRange(rangeValue)) {
            rangeSummaryItem = rangeSummaryItem2;
            break;
        }
    }
    if (rangeSummaryItem == null) {
        var range = Range.getRange(rangeType, rangeValue, interval, referenceRange);
        rangeSummaryItem = OrderToRangeSummaryItem(quotationFrm, range, order);
        rangeSummaryItem.setAvagePrice(quotationFrm);
        //instrumentSummaryItem.setAvagePrice(quotationFrm);
    }
//        var orderSummaryItem;
//        if (rangeSummaryItem.childSummaryItems.Exists(order.id)) {
//            orderSummaryItem = rangeSummaryItem.childSummaryItems.Item(order.id);
//        }
//        else {
//            var account = order.GetAccount();
//            var accountCode = account == null ? "" : account.code;
//            orderSummaryItem = new ExecuteOrderSummaryItem();
//            orderSummaryItem.instance(order.id, ExecuteOrderSummaryCategory.Order, rangeSummaryItem.range, instrumentId, accountCode);
//            rangeSummaryItem.AddSummaryItemRelation(orderSummaryItem);
//        }
//        orderSummaryItemSetItem(orderSummaryItem, order);
    var orderSummaryItem = OrderToOrderSummaryItem(rangeSummaryItem, order);
    RecalculateSummaryByOrders(rangeSummaryItem);
    var vsflexGrid = window._ExecuteOrderSummaryGrid;
    vsflexGrid.Redraw = false;
    var executeOrderSummaryGridColKey = quotationFrm.executeOrderSummaryGridColKey;
    var findRow = vsflexGrid.FindRow(rangeSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Id), true, true);
    if (findRow <= 0) {        
        //refresh instrumentSummaryItem upline grid
        var findRow2 = vsflexGrid.FindRow(instrumentId, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Id), true, true);
        if (findRow2 <= 0) {
            findRow2 = vsflexGrid.Rows;
            vsflexGrid.AddItem("", findRow2);
        }
        FillRow(vsflexGrid, findRow2, rangeSummaryItem.parentSummaryItem, executeOrderSummaryGridColKey);
        vsflexGrid.IsSubtotal(findRow2) = true;
        vsflexGrid.RowOutlineLevel(findRow2) = 1;

        var rangeSummaryItemRow = findRow2;
        vsflexGrid.AddItem("", rangeSummaryItemRow+1);
        rangeSummaryItemRow++;
        findRow = FillOrderSummaryItem(vsflexGrid, executeOrderSummaryGridColKey, rangeSummaryItem, rangeSummaryItemRow);
        vsflexGrid.Cell(flexcpForeColor, rangeSummaryItemRow, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.SellLot), findRow, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.SellLot)) = color_red;
        vsflexGrid.Cell(flexcpForeColor, rangeSummaryItemRow, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.BuyLot), findRow, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.BuyLot)) = color_blue;
    }
    else {
        var rangeSummaryItemOutline = vsflexGrid.IsCollapsed(findRow);

        var line = vsflexGrid.FindRow(orderSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Id), true, true);
        if (line <= 0) {
            line = findRow + 1;
            vsflexGrid.AddItem("", line);
        }
        FillRow(vsflexGrid, line, orderSummaryItem, executeOrderSummaryGridColKey);
        vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.SellLot)) = color_red;
        vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.BuyLot)) = color_blue;

        vsflexGrid.IsCollapsed(line) = rangeSummaryItemOutline == flexOutlineExpanded ? flexOutlineExpanded : flexOutlineSubtotals;

        //refresh rangeSummaryItem upline grid
        FillRow(vsflexGrid, findRow, rangeSummaryItem, executeOrderSummaryGridColKey);
        //refresh instrumentSummaryItem upline grid
        var findRow2 = vsflexGrid.FindRow(instrumentId, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Id), true, true);
        if (findRow2 > 0) {
            FillRow(vsflexGrid, findRow2, rangeSummaryItem.parentSummaryItem, executeOrderSummaryGridColKey);
        }
    }
    vsflexGrid.Redraw = true;
}

function RecalculateSummaryByOrders(rangeSummaryItem) {
    var instrumentSummaryItem = rangeSummaryItem.parentSummaryItem;
    var quotationFrm = GetQuotationFrm();
    //Range -
    instrumentSummaryItem.setItem(rangeSummaryItem, false);
    instrumentSummaryItem.orderCount -= rangeSummaryItem.orderCount;
    instrumentSummaryItem.orderCount++;
    rangeSummaryItem.reset();

    //Sum Orders -> Range +
    var orderSummaryItems = (new VBArray(rangeSummaryItem.childSummaryItems.Items())).toArray();
    for (var index = 0, count = orderSummaryItems.length; index < count; index++) {
        var orderSummaryItem = orderSummaryItems[index];
        if (rangeSummaryItem.minNumeratorUnit > orderSummaryItem.minNumeratorUnit) {
            rangeSummaryItem.minNumeratorUnit = orderSummaryItem.minNumeratorUnit;
        }
        if (rangeSummaryItem.maxDenominator < orderSummaryItem.maxDenominator) {
            rangeSummaryItem.maxDenominator = orderSummaryItem.maxDenominator;
        }
        rangeSummaryItem.setItem(orderSummaryItem, true);
    }

    //For AccountSummary: Set Avage price
    rangeSummaryItem.setAvagePrice(quotationFrm);

    if (instrumentSummaryItem.minNumeratorUnit > rangeSummaryItem.minNumeratorUnit) {
        instrumentSummaryItem.minNumeratorUnit = rangeSummaryItem.minNumeratorUnit;
    }
    if (instrumentSummaryItem.maxDenominator < rangeSummaryItem.maxDenominator) {
        instrumentSummaryItem.maxDenominator = rangeSummaryItem.maxDenominator;
    }
    instrumentSummaryItem.setItem(rangeSummaryItem, true);
    instrumentSummaryItem.orderCount += rangeSummaryItem.orderCount;
    instrumentSummaryItem.orderCount--;
    instrumentSummaryItem.setAvagePrice(quotationFrm);
}

function DeleteOrderFromExecuteOrderSummaryGrid(quotationFrm, deletedOrderId, accountId, instrumentId) {
    var executeOrderSummaryGridColKey = quotationFrm.executeOrderSummaryGridColKey;
    var vsflexGrid = window._ExecuteOrderSummaryGrid;

    var line = vsflexGrid.FindRow(deletedOrderId, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Id), true, true);
    if (line > 0) {
        var orderSummaryItem = vsflexGrid.RowData(line);
        var rangeSummaryItem = orderSummaryItem.parentSummaryItem;
        if (rangeSummaryItem.childSummaryItems.Exists(deletedOrderId)) {
            rangeSummaryItem.childSummaryItems.Remove(deletedOrderId);

            RecalculateSummaryByOrders(rangeSummaryItem);
            if (rangeSummaryItem.childSummaryItems.Count <= 0) {
                var instrumentSummaryItem = GetInstrumentSummaryItem(quotationFrm,instrumentId);
                instrumentSummaryItem.childSummaryItems.Remove(instrumentId + "_" + rangeSummaryItem.range.ToString());

                if (instrumentSummaryItem.childSummaryItems.Count <= 0) {
                    _AllExecuteOrderSummaryItems.Remove(instrumentId);
                }
            }

            vsflexGrid.Redraw = false;
            try {
                vsflexGrid.RemoveItem(line);

                //refresh rangeSummaryItem upline grid
                var findRow = vsflexGrid.FindRow(rangeSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Id), true, true);
                if (findRow > 0) {
                    if (rangeSummaryItem.childSummaryItems.Count > 0) {
                        FillRow(vsflexGrid, findRow, rangeSummaryItem, executeOrderSummaryGridColKey);
                    }
                    else {
                        vsflexGrid.RemoveItem(findRow);
                    }
                }
                //refresh instrumentSummaryItem upline grid
                var findRow = vsflexGrid.FindRow(instrumentId, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Id), true, true);
                if (findRow > 0) {
                    var instrumentSummaryItem = GetInstrumentSummaryItem(quotationFrm,instrumentId);
                    if (instrumentSummaryItem.childSummaryItems.Count > 0) {
                        FillRow(vsflexGrid, findRow, instrumentSummaryItem, executeOrderSummaryGridColKey);
                    }
                    else {
                        vsflexGrid.RemoveItem(findRow);
                    }
                }
            }
            catch (e)
            { }
            vsflexGrid.Redraw = true;
        }
    }
}

function AffectOrderToExecuteOrderSummaryGrid(quotationFrm, order) {
    AddOrderToExecuteOrderSummaryGrid(quotationFrm, order);
}

function QuerySummaryButton_Onclick() {
    QuerySummary();
}

function TimeRangeText_Onblur() {
    var interval = parseInt(window.document.all._TimeRangeText.value);
    if (isNaN(interval) || interval <= 0) {
        window.document.all._TimeRangeText.value = 10;
    }
    else {
        window.document.all._TimeRangeText.value = interval;
    }
}

function PriceRangeText_Onblur() {
    var interval = parseInt(window.document.all._PriceRangeText.value);
    if (isNaN(interval) || interval <= 0) {
        window.document.all._PriceRangeText.value = 100;
    }
    else {
        window.document.all._PriceRangeText.value = interval;
    }
}

function GetInstrumentSummaryItem(quotationFrm,instrumentId) {
    var instrumentSummaryItem;
    if (_AllExecuteOrderSummaryItems.Exists(instrumentId)) {
        instrumentSummaryItem = _AllExecuteOrderSummaryItems.Item(instrumentId);
    }
    else {
        instrumentSummaryItem = ToInstrumentSummaryItem(quotationFrm,instrumentId, null);
        _AllExecuteOrderSummaryItems.Add(instrumentId, instrumentSummaryItem);
    }
    return instrumentSummaryItem;
}

var _AllExecuteOrderSummaryItems = new ActiveXObject("Scripting.Dictionary"); //key=instrumentId value=ExecuteOrderSummaryItems
//var _ExecuteOrderSummaryItems = new ActiveXObject("Scripting.Dictionary"); //key=id value=ExecuteOrderSummaryItem
var summaryQueryTimeOutID = null;
function QuerySummary() {
    summaryQueryTimeOutID = window.setTimeout(SummaryQueryTimeOut, 10);
}

function SummaryQueryTimeOut() {
    if (summaryQueryTimeOutID) { window.clearTimeout(summaryQueryTimeOutID); summaryQueryTimeOutID = null; }

//    var instrumentId = window._ExecuteOrderSummaryInstrumentSelectGrid.Cell(flexcpText, 0, 0);
//    if (instrumentId == null || instrumentId == "" || instrumentId.length < 36) {
//        alert("Please select Instrument to query.");
//        return;
    //    }
    
    FillExecuteOrderSummaryData();
    _ExecuteOrderSummaryGrid.Redraw = false;
    _ExecuteOrderSummaryGrid.MousePointer = flexHourglass;
    try {
        FillDataToSummaryGrid();
    }
    catch (e)
    { }
    _ExecuteOrderSummaryGrid.MousePointer = flexDefault;
    _ExecuteOrderSummaryGrid.Redraw = true;
}

function QuerySummaryByInstrumentId(quotationFrm, instrumentId) {
    FillExecuteOrderSummaryData2(quotationFrm,instrumentId, null);
    _ExecuteOrderSummaryGrid.Redraw = false;
    _ExecuteOrderSummaryGrid.MousePointer = flexHourglass;
    try {
        var instrumentSummaryItem = GetInstrumentSummaryItem(quotationFrm,instrumentId);
        if (instrumentSummaryItem.childSummaryItems.Count > 0) {
            FillDataToSummaryGrid2(instrumentSummaryItem);
        }
    }
    catch (e)
    { }
    _ExecuteOrderSummaryGrid.MousePointer = flexDefault;
    _ExecuteOrderSummaryGrid.Redraw = true;
}

function FillExecuteOrderSummaryData() {
    var quotationFrm = GetQuotationFrm();
    var instrumentSortByCodesClone = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentId value=InstrumentSortByCode
    var instrumentSortByCodes = (new VBArray(quotationFrm.oInstrumentList.Items())).toArray();
    for (var index = 0, iCount = instrumentSortByCodes.length; index < iCount; index++) {
        var instrumentSortByCode = instrumentSortByCodes[index];
        instrumentSortByCodesClone.Add(instrumentSortByCode.instrumentId, instrumentSortByCode);
    }
    var instrumentSortByCodes = (new VBArray(instrumentSortByCodesClone.Items())).toArray();
    for (var index = 0, iCount = instrumentSortByCodes.length; index < iCount; index++) {
        var instrumentSortByCode = instrumentSortByCodes[index];
        FillExecuteOrderSummaryData2(quotationFrm,instrumentSortByCode.instrumentId, instrumentSortByCode.code);
    }
}

function FillExecuteOrderSummaryData2(quotationFrm,instrumentId, instrumentCode) {
    if (_AllExecuteOrderSummaryItems.Exists(instrumentId)) {
        _AllExecuteOrderSummaryItems.Remove(instrumentId);
    }
    var instrumentSummaryItem = ToInstrumentSummaryItem(quotationFrm,instrumentId, instrumentCode);
    _AllExecuteOrderSummaryItems.Add(instrumentId, instrumentSummaryItem);
    
    var quotationFrm = GetQuotationFrm();
    var orderArray = (new VBArray(quotationFrm.oExecutedOrders.Items())).toArray();
    var orderArray2 = new Array();
    for (var index = 0, count = orderArray.length; index < count; index++) {
        var order = orderArray[index];
        var intrument = order.GetInstrument();
        if (order.status == OrderStatus.Deleted || intrument.id.toLowerCase() != instrumentId.toLowerCase()) continue;
        orderArray2.push(order);
    }
    var count = orderArray2.length;
    if (count <= 0) return;

    var rangeType = window.document.all._QueryOnTimeRadio.checked ? RangeType.Time : RangeType.Price;
    var interval;
    if (rangeType == RangeType.Time) {
        orderArray2 = orderArray2.sort(CompareOrderExecuteTime);
        interval = parseInt(window.document.all._TimeRangeText.value);
    }
    else {
        orderArray2 = orderArray2.sort(CompareOrderExecutePrice);
        interval = parseInt(window.document.all._PriceRangeText.value);
    }
        
    var range = null;
    for (var index = 0; index < count; index++) {
        var order = orderArray2[index];
        var rangeValue = (rangeType == RangeType.Time) ? order.tran.executeTime : order.executePrice;
        if (range == null) {
            range = Range.getRange(rangeType, rangeValue, interval, range);
        }
        else {
            if (!range.inRange(rangeValue)) {
                range = Range.getRange(rangeType, rangeValue, interval, range);
            }
        }

        var rangeSummaryItem = OrderToRangeSummaryItem(quotationFrm,range, order);
        OrderToOrderSummaryItem(rangeSummaryItem, order);
    }

    //Set Range Avage Price
    var executeOrderSummaryItems2 = (new VBArray(instrumentSummaryItem.childSummaryItems.Items())).toArray();
    for (var index = 0, count = executeOrderSummaryItems2.length; index < count; index++) {
        var rangeSummaryItem = executeOrderSummaryItems2[index];
        rangeSummaryItem.setAvagePrice(quotationFrm);
    }
    instrumentSummaryItem.setAvagePrice(quotationFrm);
}

function OrderToRangeSummaryItem(quotationFrm,range, order) {
    //Range
    var intrument = order.GetInstrument();
    var instrumentId = intrument.id;
    var id = instrumentId + "_" + range.ToString();
    var rangeSummaryItem = null;
    var instrumentSummaryItem = GetInstrumentSummaryItem(quotationFrm,instrumentId);
    var executeOrderSummaryItems = instrumentSummaryItem.childSummaryItems;
    if (executeOrderSummaryItems.Exists(id)) {
        rangeSummaryItem = executeOrderSummaryItems.Item(id);
        if (rangeSummaryItem.minNumeratorUnit > intrument.numeratorUnit) {
            rangeSummaryItem.minNumeratorUnit = intrument.numeratorUnit;
        }
        if (rangeSummaryItem.maxDenominator < intrument.denominator) {
            rangeSummaryItem.maxDenominator = intrument.denominator;
        }
    }
    else {
        rangeSummaryItem = new ExecuteOrderSummaryItem();
        rangeSummaryItem.instance(id, ExecuteOrderSummaryCategory.Range, range, instrumentId,"");
        rangeSummaryItem.minNumeratorUnit = intrument.numeratorUnit;
        rangeSummaryItem.maxDenominator = intrument.denominator;
        //executeOrderSummaryItems.Add(id, rangeSummaryItem);
        instrumentSummaryItem.AddSummaryItemRelation(rangeSummaryItem);
    }
    if (instrumentSummaryItem.minNumeratorUnit > intrument.numeratorUnit) {
        instrumentSummaryItem.minNumeratorUnit = intrument.numeratorUnit;
    }
    if (instrumentSummaryItem.maxDenominator < intrument.denominator) {
        instrumentSummaryItem.maxDenominator = intrument.denominator;
    }
    rangeSummaryItem.setItemByOrder(order, true);
    instrumentSummaryItem.setItemByOrder(order, true);

    return rangeSummaryItem;
}

function ToInstrumentSummaryItem(quotationFrm,instrumentId, instrumentCode) {
    var instrumentSummaryItem;
    if (_AllExecuteOrderSummaryItems.Exists(instrumentId)) {
        instrumentSummaryItem = _AllExecuteOrderSummaryItems.Item(instrumentId);
    }
    else {
        if (instrumentCode == null) {
            var instrument = quotationFrm.oDealingConsole.GetInstrumentById(instrumentId);
            instrumentCode = instrument.code;
        }
        instrumentSummaryItem = new ExecuteOrderSummaryItem();
        instrumentSummaryItem.instance2(instrumentId, ExecuteOrderSummaryCategory.Instrument, instrumentId, instrumentCode);
    }    
    return instrumentSummaryItem;
}

function OrderToOrderSummaryItem(rangeSummaryItem, order) {
    //Order
    var orderSummaryItem;
    if (rangeSummaryItem.childSummaryItems.Exists(order.id)) {
        orderSummaryItem = rangeSummaryItem.childSummaryItems.Item(order.id);
    }
    else {
        var account = order.GetAccount();
        var accountCode = account == null ? "" : account.code;
        orderSummaryItem = new ExecuteOrderSummaryItem();
        orderSummaryItem.instance(order.id, ExecuteOrderSummaryCategory.Order, rangeSummaryItem.range, order.tran.instrumentID, accountCode);
        rangeSummaryItem.AddSummaryItemRelation(orderSummaryItem);
    }
    orderSummaryItemSetItem(orderSummaryItem, order);

    return orderSummaryItem;
}

function orderSummaryItemSetItem(orderSummaryItem, order) {
    var executePrice = order.executePrice.ToString();
    var executePriceValue = order.executePrice.ToDouble(); // XmlConvert.ToDecimal(executePrice);
    var isBuy = order.isBuy;
    var buyLot = isBuy ? order.lot : 0.0
    var sellLot = !isBuy ? order.lot : 0.0
    orderSummaryItem.code = Date2String(order.tran.executeTime);
    orderSummaryItem.buyLot = buyLot;
    orderSummaryItem.avgBuyPrice = isBuy ? executePrice : "0";
    orderSummaryItem.avgBuyPriceValue = isBuy ? executePriceValue : 0.00;
    orderSummaryItem.sellLot = sellLot;
    orderSummaryItem.avgSellPrice = !isBuy ? executePrice : "0";
    orderSummaryItem.avgSellPriceValue = !isBuy ? executePriceValue : 0.00;
}

function FillDataToSummaryGrid() {
    var quotationFrm = GetQuotationFrm();
    var executeOrderSummaryGridColKey = quotationFrm.executeOrderSummaryGridColKey;
    var vsflexGrid = window._ExecuteOrderSummaryGrid;
    vsflexGrid.Rows = vsflexGrid.FixedRows;
//    var line = vsflexGrid.FixedRows - 1;

    var allExecuteOrderSummaryItems = (new VBArray(_AllExecuteOrderSummaryItems.Items())).toArray();
    for (var index2 = 0, count2 = allExecuteOrderSummaryItems.length; index2 < count2; index2++) {
        var instrumentSummaryItem = allExecuteOrderSummaryItems[index2];
        if (instrumentSummaryItem.childSummaryItems.Count <= 0) continue;
        FillDataToSummaryGrid2(instrumentSummaryItem);
    }
}

function FillDataToSummaryGrid2(instrumentSummaryItem) {
    var quotationFrm = GetQuotationFrm();
    var executeOrderSummaryGridColKey = quotationFrm.executeOrderSummaryGridColKey;
    var vsflexGrid = window._ExecuteOrderSummaryGrid;

    var executeOrderSummaryItems = instrumentSummaryItem.childSummaryItems;
    var count = executeOrderSummaryItems.Count;
    if (count > 0) {
        var line = vsflexGrid.FixedRows  - 1;
        //refresh instrumentSummaryItem upline grid
        var findRow2 = vsflexGrid.FindRow(instrumentSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Id), true, true);
        if (findRow2 <= 0) {
            findRow2 = vsflexGrid.Rows;
            vsflexGrid.AddItem("", findRow2);
        }
        FillRow(vsflexGrid, findRow2, instrumentSummaryItem, executeOrderSummaryGridColKey);
        vsflexGrid.IsSubtotal(findRow2) = true;
        vsflexGrid.RowOutlineLevel(findRow2) = 1;
        line = findRow2;

        //vsflexGrid.Rows += count;
        var executeOrderSummaryItems2 = (new VBArray(executeOrderSummaryItems.Items())).toArray();
        for (var index = 0; index < count; index++) {
            var rangeSummaryItem = executeOrderSummaryItems2[index];
            vsflexGrid.AddItem("", line+1);
            line++;
            line = FillOrderSummaryItem(vsflexGrid, executeOrderSummaryGridColKey, rangeSummaryItem, line);

            //            FillRow(vsflexGrid, line, rangeSummaryItem, executeOrderSummaryGridColKey);            

            //            vsflexGrid.IsSubtotal(line) = true;
            //            vsflexGrid.RowOutlineLevel(line) = 1;
            //            var orderSummaryItemDetails = (new VBArray(rangeSummaryItem.childSummaryItems.Items())).toArray();
            //            var count2 = orderSummaryItemDetails.length;
            //            if (count2 > 0) {
            //                vsflexGrid.Rows += count2;
            //                for (var index2 = 0; index2 < count2; index2++) {
            //                    var orderSummaryItem = orderSummaryItemDetails[index2];

            //                    line++;
            //                    FillRow(vsflexGrid, line, orderSummaryItem, executeOrderSummaryGridColKey);
            //                }
            //            }
        }
    }
    vsflexGrid.Outline(1);

    if (vsflexGrid.Rows > vsflexGrid.FixedRows) {
        vsflexGrid.Cell(flexcpForeColor, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.SellLot), vsflexGrid.Rows - 1, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.SellLot)) = color_red;
        vsflexGrid.Cell(flexcpForeColor, vsflexGrid.FixedRows, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.BuyLot), vsflexGrid.Rows - 1, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.BuyLot)) = color_blue;
    }
}

function FillOrderSummaryItem(vsflexGrid, executeOrderSummaryGridColKey, rangeSummaryItem, rangeSummaryItemRow) {
    var line = rangeSummaryItemRow;
    FillRow(vsflexGrid, line, rangeSummaryItem, executeOrderSummaryGridColKey);

    vsflexGrid.IsSubtotal(line) = true;
    vsflexGrid.RowOutlineLevel(line) = 2;

    var rangeSummaryItemOutline = vsflexGrid.IsCollapsed(line);

    var orderSummaryItemDetails = (new VBArray(rangeSummaryItem.childSummaryItems.Items())).toArray();
    var count2 = orderSummaryItemDetails.length;
    if (count2 > 0) {
        //vsflexGrid.Rows += count2;
        for (var index2 = 0; index2 < count2; index2++) {
            var orderSummaryItem = orderSummaryItemDetails[index2];
            vsflexGrid.AddItem("", line+1);
            line++;
            FillRow(vsflexGrid, line, orderSummaryItem, executeOrderSummaryGridColKey);
        }
        vsflexGrid.IsCollapsed(line) = rangeSummaryItemOutline == flexOutlineExpanded ? flexOutlineExpanded : flexOutlineSubtotals;
    }
    return line;
}

function FillRow(vsflexGrid, line, summaryItem, executeOrderSummaryGridColKey) {
    var quotationFrm = GetQuotationFrm();
    var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Id)) = summaryItem.id;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.Range)) = summaryItem.getCode();
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.OrderCount)) = summaryItem.getOrderCountValue(); //  summaryItem.orderCount == 0 ? "" : summaryItem.orderCount;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.SellAvgPrice)) = summaryItem.avgSellPriceValue == 0.0000 ? "" : summaryItem.avgSellPrice;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.SellLot)) = summaryItem.sellLot == 0.0 ? "" : GetFormatLot2(summaryItem.sellLot, true, lotDecimal);
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.BuyAvgPrice)) = summaryItem.avgBuyPriceValue == 0.0000 ? "" : summaryItem.avgBuyPrice;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(executeOrderSummaryGridColKey.BuyLot)) = summaryItem.buyLot == 0.0 ? "" : GetFormatLot2(summaryItem.buyLot, true, lotDecimal);
    vsflexGrid.RowData(line) = summaryItem;
    if (summaryItem.executeOrderSummaryCategory == ExecuteOrderSummaryCategory.Range) {
        vsflexGrid.Cell(flexcpFontBold, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
        vsflexGrid.Cell(flexcpFontItalic, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
        vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightyellow;
    }
    else if (summaryItem.executeOrderSummaryCategory == ExecuteOrderSummaryCategory.Instrument) {
        vsflexGrid.Cell(flexcpFontBold, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
        vsflexGrid.Cell(flexcpFontItalic, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
        vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightblue;
    }
    else
    {
        vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightcyan;
    }
}

var sortedOrder = "ASC";
function CompareOrderExecuteTime(objA, objB) {
    var objASortValue = objA.tran.executePrice;
    var objBSortValue = objB.tran.executePrice;

    if (objASortValue == null && objBSortValue == null) return 0;
    if (objASortValue == null) return sortedOrder == "ASC" ? -1 : 1;
    if (objBSortValue == null) return sortedOrder == "ASC" ? 1 : -1;
    if (objASortValue.valueOf() > objBSortValue.valueOf()) {
        return sortedOrder == "ASC" ? 1 : -1;
    }
    else if (objASortValue.valueOf() < objBSortValue.valueOf()) {
        return sortedOrder == "ASC" ? -1 : 1;
    }
    else {
        return 0;
    }
}

function CompareOrderExecutePrice(objA, objB) {
    var objASortValue = objA.executePrice;
    var objBSortValue = objB.executePrice;

    if (objASortValue == null && objBSortValue == null) return 0;
    if (objASortValue == null) return sortedOrder == "ASC" ? -1 : 1;
    if (objBSortValue == null) return sortedOrder == "ASC" ? 1 : -1;
    if (objASortValue.More(objBSortValue)) {
        return sortedOrder == "ASC" ? 1 : -1;
    }
    else if (objASortValue.Less(objBSortValue)) {
        return sortedOrder == "ASC" ? -1 : 1;
    }
    else {
        return 0;
    }
}

var ExecuteOrderSummaryCategory = new ExecuteOrderSummaryCategory();
function ExecuteOrderSummaryCategory() {
    this.Instrument = 0;
    this.Range = 1;
    this.Order = 2;
}

var RangeType = new RangeType();
function RangeType() {
    this.Time = 0;
    this.Price = 1;
}

function Range() {
    this.rangeType;
    this.interval;
    this.beginRange;
    this.endRange;

    this.beginRangeString = "";
    this.endRangeString = "";
    
    this.instance = function (rangeType, interval, beginRange, endRange) {
        this.rangeType = rangeType;
        this.interval = interval;
        this.beginRange = beginRange;
        this.endRange = endRange;
    };

    this.getBeginRangeString = function () {
        if (this.beginRangeString == "") {
            if (this.rangeType == RangeType.Time) {
                this.beginRangeString = Date2String(this.beginRange).substring(0, 16);
            }
            else {
                this.beginRangeString = this.beginRange.ToString();
            }
        }
        return this.beginRangeString;
    };

    this.getEndRangeString = function () {
        if (this.endRangeString == "") {
            if (this.rangeType == RangeType.Time) {
                this.endRangeString = Date2String(this.endRange).substring(0, 16);
            }
            else {
                this.endRangeString = this.endRange.ToString();
            }
        }
        return this.endRangeString;
    };

    this.beginRangeDispString = function () {
        if (this.rangeType == RangeType.Time) {
            return this.getBeginRangeString().substring(11, 16);
        }
        else {
            return this.getBeginRangeString();
        }
    };

    this.endRangeDispString = function () {
        if (this.rangeType == RangeType.Time) {
            return this.getEndRangeString().substring(11, 16);
        }
        else {
            return this.getEndRangeString();
        }
    };

    this.ToString = function () {
        return this.rangeType.toString() + " _ " + this.getBeginRangeString() + " _ " + this.getEndRangeString();
    };
    
    this.inRange = function (value) {
        if (this.rangeType == RangeType.Time) {
            return value.valueOf() >= this.beginRange.valueOf() && value.valueOf() < this.endRange.valueOf();
        }
        else {
            return value.MoreEqual(this.beginRange) && value.Less(this.endRange);
        }
    };
}

Range.getRange = function (rangeType, value, interval, referenceRange) {
    if (rangeType == RangeType.Time) {
        return Range.getExecuteTimeRange(value, interval, referenceRange);
    }
    else {
        return Range.getExecutePriceRange(value, interval, referenceRange);
    }
}

Range.getExecuteTimeRange = function (executeTime, minuteInterval, referenceRange) {
    var millionSecondInterval = minuteInterval * 60 * 1000;
    var beginRange = null, endRange = null;    
    var yMDHmString = Date2String(executeTime).substring(0, 16);
    var dateTime = new Date(yMDHmString.replace(/-/g, "/") + ":00");
    beginRange = dateTime;
    endRange = new Date(dateTime.valueOf() + millionSecondInterval);

    if (referenceRange != null) {
        var diffMillionSeconds = beginRange.valueOf() - referenceRange.beginRange.valueOf();
        var diffMillionSeconds2 = parseInt(diffMillionSeconds / millionSecondInterval) * millionSecondInterval;
        if (diffMillionSeconds < 0.00 && diffMillionSeconds2 > diffMillionSeconds) {
            diffMillionSeconds2 -= millionSecondInterval;
        }
        beginRange = new Date(referenceRange.beginRange.valueOf() + diffMillionSeconds2);
        endRange = new Date(beginRange.valueOf() + millionSecondInterval);
    }
    var range = new Range();
    range.instance(RangeType.Time, minuteInterval, beginRange, endRange);
    return range;
}

//Reference Range: 96.60~96.80  pipsInterval: 20
//UP: 96.81 -> 96.80~97.00  diffPoints2: 20 diffPoints: 21 -> use diffPoints2
//UP: 96.90 -> 96.80~97.00  diffPoints2: 20 diffPoints: 30 -> use diffPoints2
//UP: 99.99 -> 97.00~97.20  diffPoints2: 20 diffPoints: 39 -> use diffPoints2
//UP: 97.01 -> 97.00~97.20  diffPoints2: 40 diffPoints: 41 -> use diffPoints2
//DN: 96.50 -> 96.40~96.60  diffPoints2:  0 diffPoints: -10 -> use diffPoints2-pipsInterval
//DN: 96.39 -> 96.20~96.40  diffPoints2: -20 diffPoints: -21 -> use diffPoints2-pipsInterval
//DN: 96.19 -> 96.00~96.20  diffPoints2: -40 diffPoints: -41 -> use diffPoints2-pipsInterval
Range.getExecutePriceRange = function (executePrice, pipsInterval, referenceRange) {
    var beginRange = null, endRange = null;
    beginRange = executePrice;
    endRange = beginRange.Add(pipsInterval);
    if (referenceRange != null) {
        var diffPoints = beginRange.SubStract(referenceRange.beginRange);
        var diffPoints2 = parseInt(diffPoints / pipsInterval) * pipsInterval;
        if (diffPoints < 0.00 && diffPoints2 > diffPoints) {
            diffPoints2 -= pipsInterval;
        }
        beginRange = referenceRange.beginRange.Add(diffPoints2);
        endRange = beginRange.Add(pipsInterval);
    }
    var range = new Range();
    range.instance(RangeType.Price, pipsInterval, beginRange, endRange);
    return range;
}

function ExecuteOrderSummaryItem() {
    this.id;
    this.code = "";
    this.range;
    this.executeOrderSummaryCategory;
    this.instrumentId;
    this.minNumeratorUnit = 1;
    this.maxDenominator = 1;
    this.orderCount = 0;
    this.buyLot = 0.0;
    this.buyAvgPrice = "0";
    this.sellLot = 0.0;
    this.sellAvgPrice = "0";

    this.avgBuyPriceValue = 0.0000;
    this.avgSellPriceValue = 0.0000;

    this.buyLotMultiplyAvgPriceSum = 0.0000;
    this.sellLotMultiplyAvgPriceSum = 0.0000;

    this.accountCode = "";

    this.parentSummaryItem = null;
    this.childSummaryItems = new ActiveXObject("Scripting.Dictionary"); //key=id value=ExecuteOrderSummaryItem

    this.getCode = function () {
        if (this.code == "" && this.executeOrderSummaryCategory == ExecuteOrderSummaryCategory.Range) {
            this.code = this.range.beginRangeDispString() + "~" + this.range.endRangeDispString();
        }
        return this.code;
    };

    this.getOrderCountValue = function () {
        if (this.executeOrderSummaryCategory == ExecuteOrderSummaryCategory.Range
            || this.executeOrderSummaryCategory == ExecuteOrderSummaryCategory.Instrument) {
            return this.orderCount == 0 ? "" : this.orderCount;
        }
        else {
            return this.accountCode + " ";
        }
    };

    this.instance = function (id, executeOrderSummaryCategory, range, instrumentId, accountCode) {
        this.id = id;
        this.range = range;
        this.executeOrderSummaryCategory = executeOrderSummaryCategory;
        this.instrumentId = instrumentId;
        this.accountCode = accountCode;
    };

    this.instance2 = function (id, executeOrderSummaryCategory, instrumentId, instrumentCode) {
        this.id = id;
        this.executeOrderSummaryCategory = executeOrderSummaryCategory;
        this.instrumentId = instrumentId;
        this.code = instrumentCode;
    };
    
    this.AddSummaryItemRelation = function (summaryItem) {
        summaryItem.parentSummaryItem = this;
        this.childSummaryItems.Add(summaryItem.id, summaryItem);
    };

    this.reset = function()
    {
        this.orderCount = 0;
        this.buyLot = 0.0;
        this.avgBuyPrice = "0";
        this.sellLot = 0.0;
        this.avgSellPrice = "0";

        this.avgBuyPriceValue = 0.0000;
        this.avgSellPriceValue = 0.0000;

        this.buyLotMultiplyAvgPriceSum = 0.0000;
        this.sellLotMultiplyAvgPriceSum = 0.0000;
    };

    this.setItemByOrder = function (order, increase) {
        if (increase) {
            this.orderCount++;
            var isBuy = order.isBuy;
            var lot = order.lot;
            var executePriceValue = order.executePrice.ToDouble();
            this.buyLot += isBuy ? lot : 0.0;
            this.sellLot += !isBuy ? lot : 0.0;
            this.buyLotMultiplyAvgPriceSum += isBuy ? lot * executePriceValue : 0.0000;
            this.sellLotMultiplyAvgPriceSum += !isBuy ? lot * executePriceValue : 0.0000;
        }
        else {
            this.orderCount--;
            var isBuy = order.isBuy;
            var lot = order.lot;
            var executePriceValue = executePrice.ToDouble();
            this.buyLot -= isBuy ? lot : 0.0;
            this.sellLot -= !isBuy ? lot : 0.0;
            this.buyLotMultiplyAvgPriceSum -= isBuy ? lot * executePriceValue : 0.0000;
            this.sellLotMultiplyAvgPriceSum -= !isBuy ? lot * executePriceValue : 0.0000;
        }
    };

    this.setItem = function (childSummaryItem, increase) {
        if (increase) {
            this.orderCount++;
            this.buyLot += childSummaryItem.buyLot;
            this.buyLotMultiplyAvgPriceSum += childSummaryItem.buyLot * childSummaryItem.avgBuyPriceValue;
            this.sellLot += childSummaryItem.sellLot;
            this.sellLotMultiplyAvgPriceSum += childSummaryItem.sellLot * childSummaryItem.avgSellPriceValue;
        }
        else {
            this.orderCount--;
            this.buyLot -= childSummaryItem.buyLot;
            this.buyLotMultiplyAvgPriceSum -= childSummaryItem.buyLot * childSummaryItem.avgBuyPriceValue;
            this.sellLot -= childSummaryItem.sellLot;
            this.sellLotMultiplyAvgPriceSum -= childSummaryItem.sellLot * childSummaryItem.avgSellPriceValue;
        }
    };

    this.setAvagePrice = function (quotationFrm) {
        var price = null;

        var avgBuyPriceValue = this.buyLot != 0.0 ? this.buyLotMultiplyAvgPriceSum / this.buyLot : 0.00;
        price = quotationFrm.ObjectPool.GetPriceHelper(avgBuyPriceValue, this.minNumeratorUnit, this.maxDenominator);
        this.avgBuyPrice = price == null ? "0" : price.ToString();
        this.avgBuyPriceValue = avgBuyPriceValue;

        var avgSellPriceValue = this.sellLot != 0.0 ? this.sellLotMultiplyAvgPriceSum / this.sellLot : 0.00;
        price = quotationFrm.ObjectPool.GetPriceHelper(avgSellPriceValue, this.minNumeratorUnit, this.maxDenominator);
        this.avgSellPrice = price == null ? "0" : price.ToString();
        this.avgSellPriceValue = avgSellPriceValue;
    };
}