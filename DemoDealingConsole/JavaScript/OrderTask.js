var messageLanguage;
var commonLanguage;
var OrderTaskInited = false;

function SettingLanguage(commonLanguage) {
    if (commonLanguage == null) return;
    //document.getElementById("_OpenPriceButton").value = commonLanguage["OpenPriceButton"];
};

//Added Michael on 2005-06-30
function OrderTaskInit() {
    with (window.vsflexOrderTask) {
        FixedRows = 1;
        FixedCols = 0;
        Rows = 1;
        Cols = 29;
        FrozenCols = 6;

        var quotationFrm = window.parent.quotationFrm;
        var orderGridColKey = quotationFrm.orderGridColKey;
        var orderGridLanguage = quotationFrm.orderGridLanguage;
        commonLanguage = quotationFrm.commonLanguage;
        messageLanguage = quotationFrm.messageLanguage;

        this.SettingLanguage(commonLanguage);

        var parameter = quotationFrm.oDealingConsole.InitGrid(window.vsflexOrderTask, quotationFrm.optionGrid.OrderGrid, orderGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForOrderTask(window.vsflexOrderTask, orderGridColKey);

        var columnIndex = ColIndex(orderGridColKey.Time);
        ColDataType(columnIndex) = flexDTDate;
        ColFormat(columnIndex) = "yyyy-MM-dd HH:mm:ss";

        columnIndex = ColIndex(orderGridColKey.SubmitTime);
        ColDataType(columnIndex) = flexDTDate;
        ColFormat(columnIndex) = "yyyy-MM-dd HH:mm:ss";

        columnIndex = ColIndex(orderGridColKey.ExpireTime);
        ColDataType(columnIndex) = flexDTDate;
        ColFormat(columnIndex) = "yyyy-MM-dd HH:mm:ss";

        columnIndex = ColIndex(orderGridColKey.BestTime);
        ColDataType(columnIndex) = flexDTDate;
        ColFormat(columnIndex) = "yyyy-MM-dd HH:mm:ss";

        columnIndex = ColIndex(orderGridColKey.DQAccept);
        ColAlignment(columnIndex) = flexAlignCenterCenter;

        columnIndex = ColIndex(orderGridColKey.DQReject);
        ColAlignment(columnIndex) = flexAlignCenterCenter;

        columnIndex = ColIndex(orderGridColKey.OrderPlacing);
        ColAlignment(columnIndex) = flexAlignCenterCenter;

        columnIndex = ColIndex(orderGridColKey.OrderPending);
        ColAlignment(columnIndex) = flexAlignCenterCenter;

        columnIndex = ColIndex(orderGridColKey.OrderCanceled);
        ColAlignment(columnIndex) = flexAlignCenterCenter;

        columnIndex = ColIndex(orderGridColKey.OrderExecuted);
        ColAlignment(columnIndex) = flexAlignCenterCenter;

        columnIndex = ColIndex(orderGridColKey.SetPrice);
        ColAlignment(columnIndex) = flexAlignCenterCenter;

        columnIndex = ColIndex(orderGridColKey.BestPrice);
        ColAlignment(columnIndex) = flexAlignCenterCenter;

        ExtendLastCol = false;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSortAndMove;
        SelectionMode = flexSelectionFree;

        hideFocus = true;

        MergeCells = flexMergeFree;
        MergeRow(0) = true;
        ColHidden(ColIndex("Order")) = true;
    }

    _OrderTaskGridColIndexs = new OrderTaskGridColIndexs();
    OrderTaskInited = true;
}

//Added Michael on 2005-06-30
function GridColumnsDefaultFormatForOrderTask(grid,gridColKey)
{
    with (grid) {
        ColWidth(ColIndex(gridColKey.DQAccept)) = 1050;
        ColWidth(ColIndex(gridColKey.DQReject)) = 1050;
        ColWidth(ColIndex(gridColKey.OrderPlacing)) = 1050;
        ColWidth(ColIndex(gridColKey.OrderPending)) = 1050;
        ColWidth(ColIndex(gridColKey.OrderCanceled)) = 1050;
        ColWidth(ColIndex(gridColKey.OrderExecuted)) = 1050;
		ColWidth(ColIndex(gridColKey.Order)) = 2000;
		ColWidth(ColIndex(gridColKey.Item)) = 1050; 
		ColWidth(ColIndex(gridColKey.Time)) = 2100;
		ColWidth(ColIndex(gridColKey.SubmitTime)) = 2100;
		ColWidth(ColIndex(gridColKey.Account)) = 1000;
		ColWidth(ColIndex(gridColKey.BuyLot)) = 500;
		ColWidth(ColIndex(gridColKey.SellLot)) = 850;
		ColWidth(ColIndex(gridColKey.OpenClose)) = 850;
		ColWidth(ColIndex(gridColKey.TradeOption)) = 800;
		ColWidth(ColIndex(gridColKey.QuotePolicyCode)) = 1410;
		ColWidth(ColIndex(gridColKey.SetPrice)) = 1050;
		ColWidth(ColIndex(gridColKey.BestPrice)) = 1200;
		ColWidth(ColIndex(gridColKey.RefPrice)) = 1050;
		ColWidth(ColIndex(gridColKey.PriceDif)) = 1050;
		ColWidth(ColIndex(gridColKey.DQMaxMove)) = 800;
		ColWidth(ColIndex(gridColKey.HitCount)) = 800;
		ColWidth(ColIndex(gridColKey.BestTime)) = 2100;
		ColWidth(ColIndex(gridColKey.TransactionCode)) = 1050;
		ColWidth(ColIndex(gridColKey.ContractSize)) = 1000;
		ColWidth(ColIndex(gridColKey.Type)) = 1050;
		ColWidth(ColIndex(gridColKey.ExpireTime)) = 2100;
		ColWidth(ColIndex(gridColKey.OpenPrice)) = 1050;
	}
}

function OnOrderTaskGridAfterMoveColumn(col, position) {
    _OrderTaskGridColIndexs = new OrderTaskGridColIndexs();
}

function OrderTaskGridFontChanged() {
    _OrderTaskGridColIndexs = new OrderTaskGridColIndexs();
}

var _OrderTaskGridColIndexs = null;
function OrderTaskGridColIndexs() {
    this.DQAccept = vsflexOrderTask.ColIndex("DQAccept");
    this.DQReject = vsflexOrderTask.ColIndex("DQReject");
    this.OrderPlacing = vsflexOrderTask.ColIndex("OrderPlacing");
    this.OrderPending = vsflexOrderTask.ColIndex("OrderPending");
    this.OrderCanceled = vsflexOrderTask.ColIndex("OrderCanceled");
    this.OrderExecuted = vsflexOrderTask.ColIndex("OrderExecuted");
    this.Order = vsflexOrderTask.ColIndex("Order");
    this.Item = vsflexOrderTask.ColIndex("Item");
    this.Time = vsflexOrderTask.ColIndex("Time");
    this.SubmitTime = vsflexOrderTask.ColIndex("SubmitTime");
    this.Account = vsflexOrderTask.ColIndex("Account");
    this.BuyLot = vsflexOrderTask.ColIndex("BuyLot");  //Show BuySell
    this.SellLot = vsflexOrderTask.ColIndex("SellLot"); //Show Lot
    this.OpenClose = vsflexOrderTask.ColIndex("OpenClose");
    this.TradeOption = vsflexOrderTask.ColIndex("TradeOption");
    this.QuotePolicyCode = vsflexOrderTask.ColIndex("QuotePolicyCode");
    this.SetPrice = vsflexOrderTask.ColIndex("SetPrice");
    this.BestPrice = vsflexOrderTask.ColIndex("BestPrice");
    this.RefPrice = vsflexOrderTask.ColIndex("RefPrice");
    this.PriceDif = vsflexOrderTask.ColIndex("PriceDif");
    this.DQMaxMove = vsflexOrderTask.ColIndex("DQMaxMove");
    this.HitCount = vsflexOrderTask.ColIndex("HitCount");
    this.BestTime = vsflexOrderTask.ColIndex("BestTime");
    this.TransactionCode = vsflexOrderTask.ColIndex("TransactionCode");
    this.ContractSize = vsflexOrderTask.ColIndex("ContractSize");
    this.Type = vsflexOrderTask.ColIndex("Type");
    this.ExpireTime = vsflexOrderTask.ColIndex("ExpireTime");
    this.OpenPrice = vsflexOrderTask.ColIndex("OpenPrice");
    this.Key = vsflexOrderTask.ColIndex("Key");
}

function FillRefPrice() {
    if (vsflexOrderTask) {
        if (vsflexOrderTask.Rows <= vsflexOrderTask.FixedRows) {
            return;
        }
        vsflexOrderTask.Redraw = false;
        for (var row = vsflexOrderTask.Rows - 1, fRow = vsflexOrderTask.FixedRows; row >= fRow; row--) {
            var data = vsflexOrderTask.RowData(row);
            if (!data || !data.object)
                continue;
            var type = data.type;
            if (type == OrderType.Limit) {
                var order = data.object;
                var oPrice = order.GetRefPriceAndPriceDifString();
                if (oPrice) {
                    if (oPrice.refPrice) {
                        vsflexOrderTask.TextMatrix(row, _OrderTaskGridColIndexs.RefPrice) = (oPrice.refPrice == null) ? "" : oPrice.refPrice.ToString();
                    }
                    if (oPrice.priceDif) {
                        vsflexOrderTask.TextMatrix(row, _OrderTaskGridColIndexs.PriceDif) = oPrice.priceDif;
                    }
                }
            }
        }
        //what need it???????????
//        SortWithKey(vsflexOrderTask, "PriceDif", flexSortGenericAscending);
        vsflexOrderTask.Redraw = true;
    }
}

//function SortWithKey(grid,colIndexKey,sortSettings) {
//    var colIndexValue = grid.ColIndex(colIndexKey);
//    if (colIndexValue == -1) return;
//	with (grid)
//	{
//	    if (Rows <= FixedRows || Cols <= FixedRows) { return; }
//	    Redraw = false;
//		var previousRow = Row;
//		var previousCol = Col;
//		Select(FixedRows, colIndexValue, Rows - 1, colIndexValue);
//		ColSort(colIndexValue) = sortSettings;
//		Sort = flexSortUseColSort;
//		Row = previousRow;
//		Col = previousCol;
//		Redraw = true;
//	}
//}

function OnOrderTaskAfterRowColChange(oldRow, oldCol, newRow, newCol)
{
	if(oldRow != newRow)
	{
	    //ShowOrderButtons(vsflexOrderTask.Row);
	    ShowCellButtons(vsflexOrderTask.Row,true);
    }

//    if (newRow < vsflexOrderTask.FixedRows) {
//        return;
//    }
//    else {
//        var data = vsflexOrderTask.RowData(newRow);
//        if (data && data.object) {
//            if (data.type == OrderType.MarketOnOpen || data.type == OrderType.MarketOnClose) {
//                var orders = data.object;
//                for (var index in orders) {
//                    var order = orders[index];
//                    if (!order.account) {
//                        var account = order.GetAccount();
//                        if (account) {
//                            UpdateAccount(account);
//                            return;
//                        }
//                    }
//                }
//            }
//            else {
//                var order = data.object;
//                if (!order.account && order.GetAccount) {
//                    var account = order.GetAccount();
//                    if (account) {
//                        UpdateAccount(account);
//                        return;
//                    }
//                }
//            }
//        }
//    }
}

function OnOrderUpdateButtons(isMust)
{
	with(parent.orderTaskFrm)
	{
		if(oPopupOrder.isOpen || isMust)
		{
		    //ShowOrderButtons(vsflexOrderTask.Row);
		    ShowCellButtons(vsflexOrderTask.Row,true);
		}
	}
}

function GetTradeOption(tradeOption) {
	var tradeOptionValue = "";
	switch (tradeOption)
	{
		case TradeOption.Invalid:
			tradeOptionValue = "";
			break;
		case TradeOption.Better:
			tradeOptionValue = "Better";
			break;
		case TradeOption.Stop:	
			tradeOptionValue = "Stop";
			break;
	}
	return tradeOptionValue;
}

function AddDQOrderToGrid(order) {
    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    var row = vsflexGrid.FindRow(order.id, vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
    if (row > 0) {
        return;
    }
    var quotationFrm = parent.quotationFrm;
    var instrument = order.GetInstrument();
    var account = order.GetAccount();
    var tran = order.tran;

    vsflexGrid.Redraw = false;

    vsflexGrid.AddItem("");
    var line = vsflexGrid.Rows - 1;

    vsflexGrid.RowHeight(line) = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.OrderGrid);

    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Key) = order.id;
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Order) = OrderType.GetOrderTypeString(tran.orderType);
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Item) = instrument ? instrument.code : tran.instrumentID;
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Time) = GetDateTimeString(window.parent.quotationFrm.oSystemTime, "DateTime"); //.getVarDate();
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Account) = account ? account.code : tran.accountID;

    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.BuyLot) = order.isBuy ? commonLanguage["Buy"] : commonLanguage["Sell"];
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SellLot) = order.GetFormatLot2(order.lot);
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.OpenClose) = order.isOpen ? commonLanguage["Open"] : commonLanguage["Close"];
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.TradeOption) = this.GetTradeOption(order.tradeOption);
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.QuotePolicyCode) = order.GetQuotePolicyCode();
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SetPrice) = (order.setPrice == null) ? "" : order.setPrice.ToString();
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.TransactionCode) = tran.code;
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.ContractSize) = tran.contractSize;
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Type) = OrderType.GetOrderTypeString(tran.orderType);
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SubmitTime) = GetDateTimeString(tran.submitTime, "DateTime"); //.getVarDate();
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.ExpireTime) = GetDateTimeString(tran.endTime, "DateTime"); //.getVarDate();
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.DQMaxMove) = order.dQMaxMove;
                                
    var data = new DataOfRow(tran.orderType, null,tran, order);
    vsflexGrid.RowData(line) = data;

    SetRowForeColor(vsflexGrid, line, order.isBuy ? color_blue : color_red);
    //SetRowBackColor(vsflexGrid, line, color_steelblue);

    UpdateOrderStatus(order,false);
    vsflexGrid.Redraw = true;
    OnOrderUpdateButtons(false);
}

function AddLmtMktOrderToGrid(order) {
    var quotationFrm = parent.quotationFrm;
    if(!order.isOpen)
    {
        var openOrderId = order.mainWindow.oCloseIdToOpenId.Item(order.id);
        var openOrder = order.mainWindow.GetOrderById(openOrderId);
        if (openOrder != null && openOrder.status != OrderStatus.Executed) {
            return; //done-order and the if-order is not executed
        }
    }
    
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
	var row = vsflexGrid.FindRow(order.id, vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
	if (row > 0) {
	    return;
    }
	var instrument = order.GetInstrument();
	var account = order.GetAccount();
	var tran = order.tran;

	vsflexGrid.Redraw = false;

	vsflexGrid.AddItem("");
	var line = vsflexGrid.Rows - 1;

	vsflexGrid.RowHeight(line) = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.OrderGrid);
    
	//this.SettingOrderButtonStyle(vsflexGrid, line);
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Key) = order.id;
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Order) = OrderType.GetOrderTypeString( tran.orderType );
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Item) = instrument ? instrument.code : tran.instrumentID;
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Time) = GetDateTimeString(window.parent.quotationFrm.oSystemTime, "DateTime"); //.getVarDate();
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Account) = account ? account.code : tran.accountID;

	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.BuyLot) = order.isBuy ? commonLanguage["Buy"] : commonLanguage["Sell"];
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SellLot) = order.GetFormatLot2(order.lot);
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.OpenClose) = order.isOpen ? commonLanguage["Open"] : commonLanguage["Close"];
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.TradeOption) = this.GetTradeOption(order.tradeOption);
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.QuotePolicyCode) = order.GetQuotePolicyCode();
	if(order.setPrice)
		vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SetPrice) = (order.setPrice==null)?"":order.setPrice.ToString();
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.TransactionCode) = tran.code;
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.ContractSize) = tran.contractSize;
	if (tran.orderType == OrderType.Limit && tran.subType == TransSubType.Match) {
	    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Type) = "MTH"
	}
	else {
	    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Type) = OrderType.GetOrderTypeString(tran.orderType);
	}
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SubmitTime) = GetDateTimeString(tran.submitTime, "DateTime"); //.getVarDate();
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.ExpireTime) = GetDateTimeString(tran.endTime, "DateTime"); //.getVarDate();
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.DQMaxMove) = order.dQMaxMove;

	var data = new DataOfRow(tran.orderType, null,tran, order);
	vsflexGrid.RowData(line) = data;

	SetRowForeColor(vsflexGrid, line, order.isBuy ? color_blue : color_red);
	//SetRowBackColor(vsflexGrid, line, (tran.orderType == OrderType.Limit) ? color_turquoise : color_seagreen);

	//UpdateOrderStatus(order);

	ShowCellButtons(line,false);
//	OnOrderUpdateButtons(false);

	vsflexGrid.Redraw = true;
}

function AddMooMocOrderToGrid(order) {
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
	var tran = order.tran;
	var line = vsflexGrid.FindRow(tran.orderType + tran.instrumentID, vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
	if (line > 0) {
	    var data = vsflexGrid.RowData(line);
	    var orders = data.object;
        orders.push(order);

        var totalLot = GetTotalLot(orders, order.isBuy);
        vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.BuyLot) = order.isBuy ? "B" : "S";
        vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SellLot) = order.GetFormatLot2(order.lot);

        var mooMocDialog = parent.orderTaskFrm.mooMocDialog;
        if (mooMocDialog)
            mooMocDialog.AddOrderToMooMocGrid(order, orders);
        return;
    }
    var quotationFrm = parent.quotationFrm;
	var instrument = order.GetInstrument();
	var account = order.GetAccount();

	vsflexGrid.Redraw = false;

	vsflexGrid.AddItem("");
	var line = vsflexGrid.Rows - 1;

	vsflexGrid.RowHeight(line) = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.OrderGrid);

	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Key) = tran.orderType + tran.instrumentID;
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Order) = OrderType.GetOrderTypeString( tran.orderType );
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Item) = instrument ? instrument.code : tran.instrumentID;
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Time) = GetDateTimeString(window.parent.quotationFrm.oSystemTime, "DateTime"); //.getVarDate();
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Account) = account ? account.code : tran.accountID;
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.BuyLot) = order.isBuy ? commonLanguage["Buy"] : commonLanguage["Sell"];
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SellLot) = order.GetFormatLot2(order.lot);
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.OpenClose) = order.isOpen ? commonLanguage["Open"] : commonLanguage["Close"];
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.TradeOption) = this.GetTradeOption(order.tradeOption);
	
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.QuotePolicyCode) = order.GetQuotePolicyCode();
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SetPrice) = (order.setPrice==null)?"":order.setPrice.ToString();
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.TransactionCode) = tran.code;
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.ContractSize) = tran.contractSize;	
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Type) = OrderType.GetOrderTypeString( tran.orderType );
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SubmitTime) = GetDateTimeString(tran.submitTime, "DateTime"); //.getVarDate();
	vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.ExpireTime) = GetDateTimeString(tran.endTime, "DateTime"); //.getVarDate();
    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.DQMaxMove) = order.dQMaxMove;
    
	var data = new DataOfRow(tran.orderType, null,tran, new Array(order));
	vsflexGrid.RowData(line) = data;

	//SetRowBackColor(vsflexGrid, line, (tran.orderType == OrderType.MarketOnOpen) ? color_pink : color_salmon);

	UpdateOrderStatus(order,false);
//OnOrderUpdateButtons(false);
	ShowCellButtons(line,false);
	vsflexGrid.Redraw = true;
}

function RemoveOrderFromGrid(order) {
    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    vsflexGrid.Redraw = false;
    var tran = order.tran;
    if (tran.orderType == OrderType.MarketOnOpen || tran.orderType == OrderType.MarketOnClose) {
        var line = vsflexGrid.FindRow(tran.orderType + tran.instrumentID, vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
        if (line > 0) {
            var data = vsflexGrid.RowData(line);
            var orders = data.object;
            for (var index = 0, iCount = orders.length; index < iCount; index++) {
                if (orders[index].id == order.id) {
                    orders.splice(index, 1);
                    var mooMocDialog = parent.orderTaskFrm.mooMocDialog;
                    if (mooMocDialog)
                        mooMocDialog.RemoveOrderFromMooMocGrid(order, orders);
                    break;
                }
            }
            if (orders.length > 0) {
                var totalLot = GetTotalLot(orders, order.isBuy);
                vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SellLot) = order.GetFormatLot2(totalLot);
                for (var index = 0, iCount = orders.length; index < iCount; index++) {
                    var order2 = orders[index];
                    data.relationObject = order2.tran;
                    var account = order2.GetAccount();
                    vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Account) = account ? account.code : order2.tran.accountID;
                    break;
                }
            }
            else {
                vsflexGrid.RemoveItem(line);
                OnOrderUpdateButtons(false);
            }
        }
    }
    else { 
        var line = vsflexGrid.FindRow(order.id, vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
        if (line > 0) {
            vsflexGrid.RemoveItem(line);
            OnOrderUpdateButtons(false);
        }
    }
    vsflexGrid.Redraw = true;
}

function UpdateOrderStatus(order,needRedraw) {
    var instrumentId = window.document.all._InstrumentSelect.value;
    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    var tran = order.tran;
    if (tran.orderType == OrderType.MarketOnOpen || tran.orderType == OrderType.MarketOnClose) {
        var line = vsflexGrid.FindRow(tran.orderType + tran.instrumentID, vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
        if (line > 0) {
            var data = vsflexGrid.RowData(line);
            var orders = data.object;
            for (var index = 0, iCount = orders.length; index < iCount; index++) {
                if (orders[index].id == order.id) {
                    var orderMain = orders[0];
                    var status = orderMain.status;
                    if (status == OrderStatus.WaitTime || status == OrderStatus.TimeArrived) {
                        vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Order) = OrderStatus.GetOrderStatusString(orderMain.status, commonLanguage);
                        if (orderMain.status == OrderStatus.TimeArrived) {
                            vsflexGrid.Cell(flexcpForeColor, line, _OrderTaskGridColIndexs.Order) = vsflexGrid.Cell(flexcpForeColor, line, _OrderTaskGridColIndexs.Item);
                            ForwardOrder(line, needRedraw);
                        }
                        else {
                            vsflexGrid.Cell(flexcpForeColor, line, _OrderTaskGridColIndexs.Order) = color_darkgray;
                        }
                        ShowCellButtons(line, needRedraw);
                        GridRowHidden(instrumentId, vsflexGrid, line);
                    }
                    break;
                }
            }
        }
    }
    else { 
        var line = vsflexGrid.FindRow(order.id, vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
        if (line > 0) {
            var orderMain = order;
            var data = vsflexGrid.RowData(line);
            var orderInRow = data.object;
            orderInRow.status = order.status;
            orderInRow.lastStatus = order.lastStatus;
            vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Order) = OrderStatus.GetOrderStatusString(orderMain.status, commonLanguage);
            //Modified by Michael on 2006-09-29

            var status = orderMain.status;
            if (status == OrderStatus.WaitAcceptRejectPlace ||
				status == OrderStatus.WaitAcceptRejectCancel ||
				status == OrderStatus.WaitOutPriceDQ ||
				status == OrderStatus.WaitOutLotDQ ||
				status == OrderStatus.WaitOutPriceLMT ||
				status == OrderStatus.WaitOutLotLMT ||
				status == OrderStatus.TimeArrived) {

                var buySellColor = vsflexGrid.Cell(flexcpForeColor, line, _OrderTaskGridColIndexs.Item);
                vsflexGrid.Cell(flexcpForeColor, line, _OrderTaskGridColIndexs.Order) = buySellColor;
                ForwardOrder(line, needRedraw);
            }
            else {
                vsflexGrid.Cell(flexcpForeColor, line, _OrderTaskGridColIndexs.Order) = color_darkgray;
            }
            ShowCellButtons(line, needRedraw);
            GridRowHidden(instrumentId, vsflexGrid, line);
        }
    }
}

function ForwardOrder(line, needRedraw) {
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
	
	var newLine = vsflexGrid.FixedRows;
	for(newLine=vsflexGrid.FixedRows; newLine<line; newLine++)
	{
		var color = vsflexGrid.Cell(flexcpForeColor	, newLine, _OrderTaskGridColIndexs.Order);
		if(color == color_darkgray)
			break;
	}
	
	if(newLine == line)	return;

	vsflexGrid.AddItem("", newLine);
	
	for(var colIndex=0,count=vsflexGrid.Cols;colIndex<count;colIndex++)
	{
		vsflexGrid.TextMatrix(newLine, colIndex) = vsflexGrid.TextMatrix(line+1, colIndex);
	}
	vsflexGrid.RowData(newLine) = vsflexGrid.RowData(line+1);
	
	var color = vsflexGrid.Cell(flexcpForeColor	, line+1, _OrderTaskGridColIndexs.Item);
	SetRowForeColor(vsflexGrid, newLine, color);

	vsflexGrid.RemoveItem(line + 1);
	ShowCellButtons(newLine, needRedraw);
}

function UpdateOrderPrice(order, needRedraw) {
    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    var line = vsflexGrid.FindRow(order.id, vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
    if (line > 0) {
        if (needRedraw) vsflexGrid.Redraw = false;
        vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SetPrice) = (order.setPrice == null) ? "" : order.setPrice.ToString();
        vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.BestPrice) = (order.bestPrice == null) ? "" : " " + order.bestPrice.ToString();
        vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.HitCount) = (order.hitCount == 0) ? "" : order.hitCount;
        vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.BestTime) = (order.bestTime == null) ? "" : GetDateTimeString(new Date(order.bestTime), "DateTime"); //.getVarDate();
        if (needRedraw) vsflexGrid.Redraw = true;
    }
}

function UpdateOrderLot(order) {
    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    vsflexGrid.Redraw = false;
    var line = vsflexGrid.FindRow(order.id, vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
    if (line > 0) {
        vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Lot) = order.lot.ToString();
    }
    vsflexGrid.Redraw = true;
}

function UpdateAccount(account) {
    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    vsflexGrid.Redraw = false;
    for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
        var data = vsflexGrid.RowData(line);
        if (data && data.object && data.object.tran.accountID == account.id) {
            vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.Account) = account.code;
            //vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.ContractSize) = data.object.tran.contractSize;
        }
    }
    vsflexGrid.Redraw = true;
}

//Added by Michael on 2006-09-29
function OnOrderAcceptPlace(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
	    var data = vsflexGrid.RowData(line);
	    //Modified by Michael on 2009-02-09
		if(data && data.object)// && 
			//(data.type == OrderType.Limit
			//|| data.type == OrderType.OneCancelOther))	//LMT/STP/OCO
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitAcceptRejectPlace)
			{
				//var args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"]);
				//isOK = window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
				//if(isOK)
				{
					order.DoAcceptPlace();
				}
	            OnOrderUpdateButtons(true);
			}
		}
	}
}
//Added by Michael on 2006-09-29
function OnOrderRejectPlace(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
	    var data = vsflexGrid.RowData(line);
	    //Modified by Michael on 2009-02-09
		if(data && data.object)// && 
			//(data.type == OrderType.Limit
			//|| data.type == OrderType.OneCancelOther))	//LMT/STP/OCO
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitAcceptRejectPlace)
			{
			    var args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"], order.GetDescription());
				isOK = window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
				if(isOK)
				{
					order.DoReject();
				}
				OnOrderUpdateButtons(true);
			}

        }
	}
}
//Added by Michael on 2006-09-29
function OnOrderAcceptCancel(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.Limit
			|| data.type == OrderType.OneCancelOther))	//LMT/STP/OCO
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitAcceptRejectCancel)
			{
			    var args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"], order.GetDescription());
				isOK = window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
				if(isOK)
				{
					order.DoAcceptCancel();
				}
				OnOrderUpdateButtons(true);
			}
		}
	}
}
//Added by Michael on 2006-09-29
function OnOrderRejectCancel(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.Limit
			|| data.type == OrderType.OneCancelOther))	//LMT/STP/OCO
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitAcceptRejectCancel)
			{
			    order.DoRejectCancel();

			    GridRowHidden(window.document.all._InstrumentSelect.value, vsflexGrid, line);
				OnOrderUpdateButtons(true);
			}
		}
	}
}

function OnOrderAccept(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.SpotTrade))
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitOutPriceDQ || order.status == OrderStatus.WaitOutLotDQ) {
			    if (order.mainWindow.oAutoConfirm == 1
                    && (order.IsNeedDQMaxMove()
                        || (order.mainWindow.oDealingConsole.AllowModifyOrderLot
                            && order.mainWindow.CanDealerViewAccountInfo))==false) {
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
				if(isOK)
				{
					order.DoAccept();
				}
				OnOrderUpdateButtons(true);
			}
		}
	}
}

function OnOrderReject(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.SpotTrade))
		{
			var order = data.object;
			if (order.status == OrderStatus.WaitOutPriceDQ || order.status == OrderStatus.WaitOutLotDQ) 
			{
			    var confirmRejectDQOrder = order.mainWindow.oDealingConsole.ConfirmRejectDQOrder;
			    if (confirmRejectDQOrder)
			    {
			        var args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"], order.GetDescription());
				    isOK = window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
				    if (!isOK) 
				    {
				        return;
				    }
				}

				order.DoReject();
				GridRowHidden(window.document.all._InstrumentSelect.value, vsflexGrid, line);
				OnOrderUpdateButtons(true);
			}
		}
	}
}

function OnOrderUpdate(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.Limit || data.type == OrderType.Market) )
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitOutLotLMT || 
				order.status == OrderStatus.WaitOutLotLMTOrigin)
				order.DoUpdate();
		}
	}
}

function OnSpotOrderModify(line) {
    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    if (line >= vsflexGrid.FixedRows) {
        var data = vsflexGrid.RowData(line);
        if (data && data.object && data.type == OrderType.SpotTrade) {
            var order = data.object;            
            if (order.status == OrderStatus.WaitAcceptRejectPlace) {
                var oldValue = order.lot;
                var args = new Array(commonLanguage["InputNewPrice"], oldValue);                
                var newValue = showModalDialog("Prompt.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
                if (newValue) {
                    if(newValue > oldValue)
                    {
                        var sMsg = commonLanguage["InputLotMustLessThan"] + oldValue;
                        window.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
                        OnOrderUpdateButtons(true);
                        window.focus();
                        vsflexGrid.focus();
                        return;
                    }
                    else {
                        order.lot = newValue;
                        UpdateOrderLot(order);
                    }
                }
                OnOrderUpdateButtons(true);
                window.focus();
                vsflexGrid.focus();
            }
        }
    }
}

function OnOrderModify(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.Limit || data.type == OrderType.Market) )
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitOutLotLMT) {
			    var oldValue = (order.bestPrice == null) ? "" : order.bestPrice.ToString(); //vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.SetPrice);
			    var args = new Array(commonLanguage["InputNewPrice"], oldValue);    
				var newValue = showModalDialog("Prompt.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
				if(newValue)
				{
					var instrument = order.GetInstrument();
					var adjustPriceString = GetAdjustPrice(newValue, oldValue, instrument.numeratorUnit, instrument.denominator);
					//var adjustPrice = new Price(); 
					//adjustPrice.Normalize(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
					var adjustPrice = window.parent.quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
					
					var isProblematic = false;
					//Added by Michael on 2005-08-22
					if (adjustPrice != null)
					{
						//isProblematic = instrument.IsLimitedPriceByDailyMaxMove(adjustPrice);
						if (instrument.IsLimitedPriceByDailyMaxMove(adjustPrice))
						{
							var sMsg = instrument.LimitedPriceByDailyMaxMovePrompt();
							window.showModalDialog("Alert.aspx", sMsg,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
							OnOrderUpdateButtons(true);
							window.focus();
							vsflexGrid.focus();
							return;
						}
					}
					
					if (!isProblematic) isProblematic = instrument.IsProblematic(adjustPrice);
					if(isProblematic)
					{
					    var args = new Array(messageLanguage["LMTProcessAlert"], messageLanguage["AlertAcceptButton"], messageLanguage["AlertRejectButton"]);
						isProblematic = !window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
					}
					if(!isProblematic)
					{
						order.bestPrice = adjustPrice.Clone();
						if(data.type == OrderType.Limit)
							order.setPrice = adjustPrice.Clone();
							
						UpdateOrderPrice(order,true);
					}
				}
				OnOrderUpdateButtons(true);
				window.focus();
				vsflexGrid.focus();
			}
		}
	}
}

function OnOrderWait(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.Limit || data.type == OrderType.Market) )
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitOutPriceLMT || 
				order.status == OrderStatus.WaitOutLotLMT || 
				order.status == OrderStatus.WaitOutLotLMTOrigin)
			{
			    order.DoWait();

			    GridRowHidden(window.document.all._InstrumentSelect.value, vsflexGrid, line);
				OnOrderUpdateButtons(true);
				
				//Added by Michael on 2005-03-15
				order.ResetHit(true);
			}
		}
	}
}

function OnOrderExecute(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.Limit || data.type == OrderType.Market) )
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitOutPriceLMT || 
				order.status == OrderStatus.WaitOutLotLMT ||
				order.status == OrderStatus.WaitOutLotLMTOrigin ||
                order.tran.subType == 3)
			{
				var args = null;
				if (order.mainWindow.CanDealerViewAccountInfo)
				{
					args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"],order);
					isOK = window.showModalDialog("DealerCanViewAccountInfoConfirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:320px;dialogHeight:400px");
				}
				else
				{
					args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"]);
					isOK = window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
				}
				if(isOK)
				{
					order.DoExecute();
				}
				OnOrderUpdateButtons(true);
			}
		}
	}
}

//Added by Michael on 2005-03-22
function GetLMTOrdersToExecute(instrumentID)
{
	var orders = null;
	
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
	for(var line=vsflexGrid.FixedRows,count=vsflexGrid.Rows; line<count; line++)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.Limit) && instrumentID == data.object.tran.instrumentID)
		{				
			if(data.object.status == OrderStatus.WaitOutPriceLMT || 
				data.object.status == OrderStatus.WaitOutLotLMT || 
				data.object.status == OrderStatus.WaitOutLotLMTOrigin)
			{
				if (orders == null) orders = new Array();
				orders.push(data.object);
			}	
		}
	}
	return orders;
}

//Added by Michael on 2005-03-22
function ExecuteLMTOrders(outArgs)
{
	if (outArgs != null)
	{
		oPopupOrder.hide(); 
		var executeTrans = new ActiveXObject("Scripting.Dictionary");
        for (var index = 0, iCount = outArgs.length; index < iCount; index++) {
			var order = outArgs[index][0];
			var priceStr = outArgs[index][1];
			var isReject = outArgs[index][2];
			var instrument = order.GetInstrument();
			//var newPrice = new Price();
			//newPrice.Normalize(priceStr, instrument.numeratorUnit, instrument.denominator);
			var newPrice = window.parent.quotationFrm.ObjectPool.GetPriceHelper(priceStr, instrument.numeratorUnit, instrument.denominator);
			
			//order.setPrice = newPrice;
			order.executePrice = newPrice;
			if(!executeTrans.Exists(order.tran.id))
			{
				if(isReject == true)
					order.tran.Reject(order);
				else
					order.tran.Commit(order,newPrice);
				executeTrans.Item(order.tran.id) = order.tran;
			}
		}
		executeTrans.RemoveAll();
		executeTrans = null;
		OnOrderUpdateButtons(true);
		window.focus();
		var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
		vsflexGrid.focus();
	}
}

function OnOrderDetail(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.MarketOnOpen || data.type == OrderType.MarketOnClose) )
		{
			oPopupOrder.hide(); 

			var executeTrans = new ActiveXObject("Scripting.Dictionary");			
			var args = new Array(data.object, this,line);
			var outArgs = showModalDialog("MooMocProcess.aspx",args,"status:no;help:no; resizable:yes; scroll:no; center:yes; dialogWidth:400px;dialogHeight:300px");
			for(var index in outArgs)
			{
				var order = outArgs[index][0];
				var priceStr = outArgs[index][1];
				var isReject = outArgs[index][2];
				var instrument = order.GetInstrument();
				//var newPrice = new Price();
				//newPrice.Normalize(priceStr, instrument.numeratorUnit, instrument.denominator);
				var newPrice = window.parent.quotationFrm.ObjectPool.GetPriceHelper(priceStr, instrument.numeratorUnit, instrument.denominator);
				
				order.setPrice = newPrice;
				if(!executeTrans.Exists(order.tran.id))
				{
					if(isReject == true)
						order.tran.Reject(order);
					else
						order.tran.Commit(order);
					executeTrans.Item(order.tran.id) = order.tran;
				}
			}
			executeTrans.RemoveAll();
			executeTrans = null;
			OnOrderUpdateButtons(true);
			window.focus();
			vsflexGrid.focus();
		}
	}
}

function OnOrderCancel(line)
{
	var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && 
			(data.type == OrderType.Limit))
		{
			var order = data.object;
			if(order.status == OrderStatus.WaitAcceptRejectPlace 
				|| order.status == OrderStatus.WaitAcceptRejectCancel 
				|| order.status == OrderStatus.WaitOutPriceLMT 
				|| order.status == OrderStatus.WaitOutLotLMT 
				|| order.status == OrderStatus.WaitOutLotLMTOrigin)
			{
				//at this case, do nothing.
			}
			else
			{
			    var args = new Array(messageLanguage["AlertContent"], messageLanguage["AlertYesButton"], messageLanguage["AlertNoButton"], order.GetDescription());
				var isOK = window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
				if(isOK)
				{
					order.DoReject();
				}

	            GridRowHidden(window.document.all._InstrumentSelect.value, vsflexGrid, line);
                OnOrderUpdateButtons(true);

			}
		}
	}
}

function FillInstrumentSelect() {
    window.document.all._InstrumentSelect.options.length = 0;
    var oOption;
    oOption = document.createElement("OPTION");
    oOption.text = "All";
    oOption.value = "";
    oOption.selected = 0;
    window.document.all._InstrumentSelect.add(oOption);

    var quotationFrm = window.parent.quotationFrm;
    var instruments = (new VBArray(quotationFrm.oInstruments.Items())).toArray();
    instruments = instruments.sort(CompareSort);
    for (var index = 0, count = instruments.length; index < count; index++) {
        oOption = document.createElement("OPTION");
        oOption.text = instruments[index].code;
        oOption.value = instruments[index].id;
        //oOption.selected = (index == "0");
        window.document.all._InstrumentSelect.add(oOption);
    }
}

function InstrumentSelect_Onchange() {
    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    vsflexGrid.Redraw = false;
    var instrumentId = window.document.all._InstrumentSelect.value;
    if (instrumentId != '') {
        for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
            GridRowHidden(instrumentId,vsflexGrid,line);
        }
    }
    //all instrumentIds
    else {
        for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
            GridRowHidden(instrumentId,vsflexGrid,line);
        }
    }
    vsflexGrid.Redraw = true;
}

function GridRowHidden(instrumentId, vsflexGrid, line) {
    if (instrumentId != '') {
        var color = vsflexGrid.Cell(flexcpForeColor, line, _OrderTaskGridColIndexs.Order);
        var data = vsflexGrid.RowData(line);
        if (data) {
            var tran = data.relationObject;
            if (tran && tran.instrumentID == instrumentId || color != color_darkgray) {
                vsflexGrid.RowHidden(line) = false;
            }
            else {
                vsflexGrid.RowHidden(line) = true;
            }
        }
    }
    //all instrumentIds
    else{
        vsflexGrid.RowHidden(line) = false;
    }
}

function CompareSort(objA, objB) {
    if (objA.code > objB.code)
        return 1;
    else if (objA.code < objB.code)
        return -1;
    else
        return 0;
}

function GetAverageOpenPriceByCloseOrderID() {
    var relationsByCloseOrderIDs = "";
    var mainWindow = null;
    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
        if (line >= vsflexGrid.FixedRows) {
            var data = vsflexGrid.RowData(line);
            if (data && data.object && (data.type == OrderType.SpotTrade || data.type == OrderType.Limit || data.type == OrderType.Market || data.type == OrderType.OneCancelOther)) {
                var order = data.object;
                if (order.isOpen == 0 && vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.OpenPrice) == "") {
                    relationsByCloseOrderIDs += "<CloseOrderID ID=\'" + order.id + "\'></CloseOrderID>";
                    
                    if (mainWindow == null) mainWindow = order.mainWindow;
                }
            }
        }
    }
    if (relationsByCloseOrderIDs != "") {
        relationsByCloseOrderIDs = "<CloseOrderIDs>" + relationsByCloseOrderIDs + "</CloseOrderIDs>";
        mainWindow.oIOProxy.GetAverageOpenPriceByCloseOrderID(this,relationsByCloseOrderIDs);
    }
}

function GetAverageOpenPriceByCloseOrderIDResult(dataSet) {
    if (!dataSet) return;
    if (dataSet.Tables.Count <= 0) return;

    var vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    vsflexGrid.Redraw = false;
    var table = dataSet.Tables(0);
    for (var index = 0; table && index < table.Rows.Count; index++) {
        var dataRow = table.Rows(index);
        var line = vsflexGrid.FindRow(dataRow("CloseOrderID"), vsflexGrid.FixedRows, _OrderTaskGridColIndexs.Key, true, true);
        if (line > 0) {
            vsflexGrid.TextMatrix(line, _OrderTaskGridColIndexs.OpenPrice) = dataRow("OpenPrice");
        }
    }
    vsflexGrid.Redraw = true;
}

