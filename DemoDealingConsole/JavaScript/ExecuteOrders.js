
function ExecuteOrdersInit() {
    vsflexExecuteOrders.Redraw = false;
    flexExecuteOrdersInit();
    vsflexExecuteOrders.Redraw = true;
}

//Added Michael on 2005-06-30
function flexExecuteOrdersInit() {
    vsflexExecuteOrders.Redraw = false;
    with (vsflexExecuteOrders) {
        Cols = 15;
        Rows = 1;
        FixedRows = 1;
        FixedCols = 1;

        var quotationFrm = GetQuotationFrm();
        var executedGridColKey = quotationFrm.executedGridColKey;
        var executedGridLanguage = quotationFrm.executedGridLanguage;

        ColKey(0) = executedGridColKey.Sequence;
        TextMatrix(0, 0) = "NO";
        ColWidth(ColIndex(executedGridColKey.Sequence)) = 500;

        var parameter = quotationFrm.oDealingConsole.InitGrid(window.vsflexExecuteOrders, quotationFrm.optionGrid.ExecutedGrid, executedGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForExecuteOrder(window.vsflexExecuteOrders, executedGridColKey);

        var columnIndex = ColIndex(executedGridColKey.Item);
        MergeCol(columnIndex) = true;
        columnIndex = ColIndex(executedGridColKey.IsBuy);
        MergeCol(columnIndex) = true;
        columnIndex = ColIndex(executedGridColKey.OpenClose);
        MergeCol(columnIndex) = true;
        columnIndex = ColIndex(executedGridColKey.Account);
        MergeCol(columnIndex) = true;
        columnIndex = ColIndex(executedGridColKey.Blacklist);
        ColDataType(columnIndex) = flexDTBoolean;
        MergeCol(columnIndex) = true;
        columnIndex = ColIndex(executedGridColKey.Type);
        MergeCol(columnIndex) = true;
        columnIndex = ColIndex(executedGridColKey.Dealer);
        MergeCol(columnIndex) = true;
        columnIndex = ColIndex(executedGridColKey.ExecuteTime);
        ColDataType(columnIndex) = flexDTDate;
        ColFormat(columnIndex) = "yyyy-MM-dd HH:mm:ss";

        columnIndex = ColIndex(executedGridColKey.RelationString);
        ColComboList(columnIndex) = "...";

        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;

        SelectionMode = flexSelectionFree;
        ExplorerBar = flexExSortAndMove;

        Editable = flexEDNone;
    }
    vsflexExecuteOrders.Redraw = true;

    timeOutID = window.setTimeout(TimeOut, 10);
}

var timeOutID = null;
function TimeOut() {
    if (timeOutID) { window.clearTimeout(timeOutID); timeOutID = null; }

    vsflexExecuteOrders.Redraw = false;
    vsflexExecuteOrders.MousePointer = flexHourglass;
    try {
        FillExecuteOrderGrid();
    }
    catch (e) {
    }
    vsflexExecuteOrders.MousePointer = flexDefault;
    vsflexExecuteOrders.Redraw = true;
}

//Added Michael on 2005-06-30
function GridColumnsDefaultFormatForExecuteOrder(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.Item)) = 1200;
        ColWidth(ColIndex(gridColKey.IsBuy)) = 500;
        ColWidth(ColIndex(gridColKey.OpenClose)) = 500;
        ColWidth(ColIndex(gridColKey.Lot)) = 600;
        ColWidth(ColIndex(gridColKey.OrderCode)) = 2200;
        ColWidth(ColIndex(gridColKey.Account)) = 1200;
        ColWidth(ColIndex(gridColKey.Blacklist)) = 600;
        ColWidth(ColIndex(gridColKey.QuotePolicyCode)) = 2100;
        ColWidth(ColIndex(gridColKey.Price)) = 800;
        ColWidth(ColIndex(gridColKey.Type)) = 600;
        ColWidth(ColIndex(gridColKey.ExecuteTime)) = 2100;
        ColWidth(ColIndex(gridColKey.RelationString)) = 4200;
        ColWidth(ColIndex(gridColKey.Dealer)) = 800;
    }
}

function ExecuteOrderGrid_OnAfterRowColChange(oldRow, oldCol, newRow, newCol) {
    if (newRow < vsflexExecuteOrders.FixedRows) {
        return;
    }
    else {
        var updatedOrder = vsflexExecuteOrders.RowData(newRow);
        if (!updatedOrder.account) {
            var account = updatedOrder.GetAccount();
            if (account) {
                UpdateAccount(account);
                //vsflexExecuteOrders.TextMatrix(newRow, vsflexExecuteOrders.ColIndex("Account")) = account.code;
            }
        }
    }
}

function ExecuteOrderGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    var quotationFrm = GetQuotationFrm();
    var executedGridColKey = quotationFrm.executedGridColKey;
    var vsflexGrid = window.vsflexExecuteOrders;

    switch (vsflexGrid.ColKey(newCol)) {
        case executedGridColKey.RelationString:
            var order = vsflexGrid.RowData(newRow);
            if (order.tran.phase == TransPhase.Executed && order.isOpen == 0 && order.RelationString == "") {
                vsflexGrid.Editable = flexEDKbdMouse;
            }
            else {
                vsflexGrid.Editable = flexEDNone;
            }
            break;
        default:
            vsflexGrid.Editable = flexEDNone;
            break;
    }
}

function ExecuteOrderGrid_CellButtonClick() {
    var quotationFrm = GetQuotationFrm();
    quotationFrm.oDealingConsole.GetOrderRelations();
}

function GetRelationsByCloseOrderIDResult2(dataSet) {
    if (!dataSet) return;
    if (dataSet.Tables.Count <= 0) return;

    var vsflexGrid = window.vsflexExecuteOrders;
    vsflexGrid.Redraw = false;
    for (var line = vsflexGrid.FixedRows, rows = vsflexGrid.Rows; line < rows; line++) {
        var updatedOrder = vsflexGrid.RowData(line);
        vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("RelationString")) = updatedOrder.RelationString;
    }
    vsflexGrid.Redraw = true;
}

function GetRelationsByCloseOrderIDResult(dataSet) {
    if (!dataSet) return;
    if (dataSet.Tables.Count <= 0) return;

    vsflexExecuteOrders.Redraw = false;
    var table = dataSet.Tables(0);
    for (var index = 0; table && index < table.Rows.Count; index++) {
        var dataRow = table.Rows(index);
        with (vsflexExecuteOrders) {
            var foundRow = FindRow(dataRow("ID"), FixedRows, ColIndex("OrderID"), true, true);
            if (foundRow > 0) {
                TextMatrix(foundRow, ColIndex("RelationString")) = dataRow("RelationString");
            }
        }
    }
    vsflexExecuteOrders.Redraw = true;
}

function FillExecuteOrderGrid() {
    var quotationFrm = GetQuotationFrm();
    var line = vsflexExecuteOrders.FixedRows;
    var orders = (new VBArray(quotationFrm.oExecutedOrders.Items())).toArray();
    var count = orders.length;
    vsflexExecuteOrders.Rows = line + ((count > 0) ? count : 0);
    var fixedRowsIndex = vsflexExecuteOrders.Rows;
    for (var index = count - 1; index >= 0; index--) {
        vsflexExecuteOrders.TextMatrix(line, 0) = --fixedRowsIndex;
        UpdateOrderToExecuteGrid(quotationFrm, orders[index], line);

        line++;
    }
}

//Added by Michael on 2005-03-14
function UpdateOrderToExecuteGrid(quotationFrm, updatedOrder, line) {
    var intrument = updatedOrder.GetInstrument();
    var account = updatedOrder.GetAccount();
    var accountGroupId = window._AccountGroupSelect.value;
    var currentAccountGroupId = account.groupID;

    with (vsflexExecuteOrders) {
        RowData(line) = updatedOrder;
        TextMatrix(line, ColIndex("OrderID")) = updatedOrder.id;
        TextMatrix(line, ColIndex("Item")) = intrument ? intrument.code : updatedOrder.tran.instrumentID;
        TextMatrix(line, ColIndex("IsBuy")) = updatedOrder.isBuy ? "B" : "S";
        TextMatrix(line, ColIndex("OpenClose")) = updatedOrder.isOpen ? "O" : "C";
        TextMatrix(line, ColIndex("Lot")) = updatedOrder.GetFormatLot2(updatedOrder.lot);
        TextMatrix(line, ColIndex("OrderCode")) = updatedOrder.code;
        TextMatrix(line, ColIndex("Account")) = account ? account.code : updatedOrder.tran.accountID;
        Cell(flexcpChecked, line, ColIndex("Blacklist")) = (account && account.type == AccountType.BlackList) ? flexChecked : flexUnchecked;
        TextMatrix(line, ColIndex("QuotePolicyCode")) = updatedOrder.GetQuotePolicyCode();
        TextMatrix(line, ColIndex("Price")) = (updatedOrder.executePrice).ToString();
        TextMatrix(line, ColIndex("Type")) = OrderType.GetOrderTypeString(updatedOrder.tran.orderType);
        TextMatrix(line, ColIndex("ExecuteTime")) = GetDateTimeString(updatedOrder.tran.executeTime, "DateTime"); //.getVarDate();
        TextMatrix(line, ColIndex("RelationString")) = updatedOrder.RelationString;
        TextMatrix(line, ColIndex("Dealer")) = (updatedOrder.tran.approverID == quotationFrm.oUserID ? "me" : "other");

        //Add by Erric
        if (accountGroupId != "" && accountGroupId != currentAccountGroupId) {
            RowHidden(line) = true;
        }
        else {
            RowHidden(line) = false;
        }
       
    }
    SetRowForeColor(vsflexExecuteOrders, line, updatedOrder.isBuy ? color_blue : color_red);
    SetRowBackColor(vsflexExecuteOrders, line, (updatedOrder.status == OrderStatus.Deleted) ? color_slategray : color_white);
    var preLine = vsflexExecuteOrders.RowSel;
    if (preLine != 0) {
        vsflexExecuteOrders.setfcous;
        vsflexExecuteOrders.RowSel = Number(preLine) + 1;
        vsflexExecuteOrders.FocusRect = 1
        vsflexExecuteOrders.HighLight = 1
        vsflexExecuteOrders.SelectionMode = 3
        vsflexExecuteOrders.setfcous;
        vsflexExecuteOrders.Row = Number(preLine) + 1;
    }
}

function AddOrderToExecuteOrderListGrid(quotationFrm, updatedOrder) {
    with (vsflexExecuteOrders) {
        Redraw = false;
        var line = FixedRows;
        var foundRow = FindRow(updatedOrder.id, FixedRows, ColIndex("OrderID"), true, true);
        if (foundRow > 0) {
            line = foundRow;
        }
        else {
            AddItem(Rows, line);

            RowHeight(line) = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.ExecutedGrid);
        }

        UpdateOrderToExecuteGrid(quotationFrm, updatedOrder, line);
        //ScrollTrack = true;
        Redraw = true;
    }
}

function DeleteOrderFromExecuteOrderListGrid(quotationFrm, deletedOrderId, accountId, instrumentId) {
    with (vsflexExecuteOrders) {
        var foundRow = FindRow(deletedOrderId, FixedRows, ColIndex("OrderID"), true, true);
        if (foundRow > 0) {
            SetRowBackColor(vsflexExecuteOrders, foundRow, color_slategray);
        }
    }
}

function AffectOrderToExecuteOrderListGrid(quotationFrm, order) {
    AddOrderToExecuteOrderListGrid(quotationFrm, order);
}

function UpdateAccount(account) {
    var accountId = account.id;
    var accountCode = account.code;
    vsflexExecuteOrders.Redraw = false;
    var vsflexGrid = vsflexExecuteOrders;
    for (var line = vsflexGrid.FixedRows, rows = vsflexGrid.Rows; line < rows; line++) {
        var updatedOrder = vsflexGrid.RowData(line);
        if (updatedOrder.tran.accountID == accountId) {
            vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Account")) = accountCode;
        }
    }
    vsflexExecuteOrders.Redraw = true;
}

function Print() {
    try {
        if (window.vsflexExecuteOrders) {
            //window.vsflexExecuteOrders.PrintGrid();
            window.vsflexExecuteOrders.PrintGrid("", true, 0, 0, 0);
        }
    }
    catch (e) {
        alert("Printer's I/O was error! please check your printer.");
    }
}

function AccountGroupSelect_OnChanged() {
    var filedGroupId = window._AccountGroupSelect.value;
    with (vsflexExecuteOrders) {	
        for (var rowIndex = FixedRows; rowIndex < Rows; rowIndex++) {
            var excuteOrder = RowData(rowIndex);
            var groupId = excuteOrder.account.groupID;
	        RowHidden(rowIndex)=!(filedGroupId == "" || filedGroupId == groupId);
        }
    }
}

//double click to show opposit orders
function VsflexExecuteOrders_DblClick() {
    var vsflexGrid = vsflexExecuteOrders;
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
        var updatedOrder = vsflexGrid.RowData(vsflexGrid.Row);
        transferObject.accountId = updatedOrder.tran.accountID;
        transferObject.accountCode = vsflexGrid.TextMatrix(vsflexGrid.Row, vsflexGrid.ColIndex("Account"));
    }
    window.showModalDialog("AccountStatusFrames.aspx", transferObject, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:1200px;dialogHeight:600px");
}

function ShowAccountStatus() {
    VsflexExecuteOrders_DblClick();
}


