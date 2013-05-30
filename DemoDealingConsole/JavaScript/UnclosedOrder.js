
function UnclosedOrdersInit() {
    vsflexUnclosedOrders.Redraw = false;
    vsflexUnclosedOrdersInit();
    vsflexUnclosedOrders.Redraw = true;
}

function vsflexUnclosedOrdersInit() {
    var quotationFrm = window.dialogArguments.quotationFrm;
    vsflexUnclosedOrders.Redraw = false;
    with (vsflexUnclosedOrders) {
        Cols = 9;
        Rows = 1;
        FixedRows = 1;
        FixedCols = 1;

        var unclosedOrderGridColKey = quotationFrm.unclosedOrderGridColKey;
        var unclosedOrderGridLanguage = quotationFrm.unclosedOrderGridLanguage;

        ColKey(0) = unclosedOrderGridColKey.Sequence;
        TextMatrix(0, 0) = "NO";
        ColWidth(ColIndex(unclosedOrderGridColKey.Sequence)) = 500;

        var parameter = quotationFrm.oDealingConsole.InitGrid(window.vsflexUnclosedOrders, quotationFrm.optionGrid.UnclosedOrderGrid, unclosedOrderGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForUnclosedOrder(window.vsflexUnclosedOrders, unclosedOrderGridColKey);

        var columnIndex = ColIndex(unclosedOrderGridColKey.InstrumentCode);
        MergeCol(columnIndex) = true;
        columnIndex = ColIndex(unclosedOrderGridColKey.ExecuteTime);
        ColDataType(columnIndex) = flexDTDate;
        ColFormat(columnIndex) = "yyyy-MM-dd HH:mm:ss";

        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;

        SelectionMode = flexSelectionFree;
        ExplorerBar = flexExSortAndMove;
    }

    vsflexUnclosedOrders.Redraw = true;
    GetUnclosedOrder();   
}

function GridColumnsDefaultFormatForUnclosedOrder(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.InstrumentCode)) = 795;
        ColWidth(ColIndex(gridColKey.IsBuy)) = 500;
        ColWidth(ColIndex(gridColKey.ContractSize)) = 800;
        ColWidth(ColIndex(gridColKey.LotBalance)) = 600;
        ColWidth(ColIndex(gridColKey.OrderCode)) = 1005;
        ColWidth(ColIndex(gridColKey.ExecutePrice)) = 800;
        ColWidth(ColIndex(gridColKey.OrderTypeID)) = 600;
        ColWidth(ColIndex(gridColKey.ExecuteTime)) = 2500;

    }
}

function UpdateOrderToUnclosedOrderGird(order, iRow, unclosedOrderGridColKey, unclosedOrderGridRowHeight) {
    var vsflexGrid = vsflexUnclosedOrders;

    var line = iRow;
    if (typeof (iRow) == 'undefined') {
        line = vsflexGrid.FixedRows;
        with (vsflexGrid) {
            vsflexGrid.AddItem(vsflexGrid.Rows, line);
            vsflexGrid.RowHeight(line) = unclosedOrderGridRowHeight;
        }
    }
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(unclosedOrderGridColKey.InstrumentCode)) = order.instrumentCode;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(unclosedOrderGridColKey.IsBuy)) = order.isBuy ? "B" : "S";
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(unclosedOrderGridColKey.ContractSize)) = order.contractSize;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(unclosedOrderGridColKey.LotBalance)) = order.lotBalance;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(unclosedOrderGridColKey.OrderCode)) = order.orderCode;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(unclosedOrderGridColKey.ExecutePrice)) = order.executePrice;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(unclosedOrderGridColKey.OrderTypeID)) = OrderType.GetOrderTypeString(order.orderTypeID);
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(unclosedOrderGridColKey.ExecuteTime)) = order.executeTime;

    SetRowForeColor(vsflexGrid, line, order.isBuy ? color_blue : color_red);
}

function GetUnclosedOrder() {
    window.document.all._AccountCodeDiv.innerText = "Requesting, please wait...";

    var quotationFrm = window.dialogArguments.quotationFrm;
    var accountId = window.dialogArguments.accountId;
    quotationFrm.oIOProxy.GetUnclosedOrder(this, accountId);
}

function GetUnclosedOrderResult(accountId, dataSet) {
    if (!dataSet || dataSet.Tables.Count <= 0) {
        window.document.all._AccountCodeDiv.innerText = "No data";
        return;
    }

    var oUnclosedOrders = new ActiveXObject("Scripting.Dictionary"); //key=orderId value=UnclosedOrder
    var table = dataSet.Tables(0);
    for (var index = 0, count = table.Rows.Count; index < count; index++) {
        var row = table.Rows(index);
        var orderId = row("OrderId");
        var unclosedOrder = new UnclosedOrder();
        unclosedOrder.UpdateByDataRow(row);
        oUnclosedOrders.Item(orderId) = unclosedOrder;
    }
    table = dataSet.Tables(1);
    var accountCode = table.Rows(0)("AccountCode");
    window.document.all._AccountCodeDiv.innerText = accountCode;
    FillUnclosedOrderGrid(oUnclosedOrders);
}

function FillUnclosedOrderGrid(oUnclosedOrders) {
    var quotationFrm = window.dialogArguments.quotationFrm;
    var unclosedOrderGridRowHeight = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.UnclosedOrderGrid);
    var unclosedOrderGridColKey = quotationFrm.unclosedOrderGridColKey;

    vsflexUnclosedOrders.Redraw = false;
    var line = vsflexUnclosedOrders.FixedRows;
    var orders = (new VBArray(oUnclosedOrders.Items())).toArray();
    var count = orders.length;
    vsflexUnclosedOrders.Rows = line + ((count > 0) ? count : 0);
    var fixedRowsIndex = vsflexUnclosedOrders.Rows;
    for (var index = count - 1; index >= 0; index--) {
        vsflexUnclosedOrders.TextMatrix(line, 0) = --fixedRowsIndex;

        UpdateOrderToUnclosedOrderGird(orders[index], line, unclosedOrderGridColKey, unclosedOrderGridRowHeight);

        line++;
    }
    vsflexUnclosedOrders.Redraw = true;
}

function Print() {
    try {
        if (window.vsflexUnclosedOrders) {
            window.vsflexUnclosedOrders.PrintGrid("", true, 0, 0, 0);
        }
    }
    catch (e) {
        alert("Printer's I/O was error! please check your printer.");
    }
}
