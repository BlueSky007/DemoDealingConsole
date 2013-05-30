var oPopupOrder = window.createPopup();

var orderTaskPageLoaded = false;
function OrderTaskPageOnLoad() {
    orderTaskPageLoaded = true;
}

function ShowOrderButtons(line) {
    if (!OrderTaskInited) return;

    var line = vsflexOrderTask.Row;

    if (vsflexOrderTask.Rows <= vsflexOrderTask.FixedRows ||
				line < vsflexOrderTask.FixedRows ||
				vsflexOrderTask.RowIsVisible(line) == false ||
				vsflexOrderTask.hideFocus == true) {
        oPopupOrder.hide();
    }
    else {
        var data = vsflexOrderTask.RowData(line);
        if (!data || !data.object)
            return;

        var col = vsflexOrderTask.ColIndex("Order");
        var unit = 15;
        var l = vsflexOrderTask.Cell(flexcpLeft, line, col) / unit;
        var t = vsflexOrderTask.Cell(flexcpTop, line, col) / unit;
        var w = vsflexOrderTask.Cell(flexcpWidth, line, col) / unit;
        var h = vsflexOrderTask.Cell(flexcpHeight, line, col) / unit;

        var type = data.type;

        //Modified by Michael on 2009-02-09
        var order = data.object;
        if (order.status == OrderStatus.WaitAcceptRejectPlace) {
            btnAcceptPlace.style.width = w / 2;
            btnRejectPlace.style.width = w / 2;
            btnAcceptPlace.style.height = h;
            btnRejectPlace.style.height = h;
            oPopupOrder.document.body.innerHTML = oDialogForAcceptPlace.innerHTML;
            oPopupOrder.show(l + 2, t + 2, w, h, vsflexOrderTask);

            return;
        }

        if (type == OrderType.SpotTrade) {
            //var order = data.object;				    

            if (order.status == OrderStatus.WaitOutPriceDQ || order.status == OrderStatus.WaitOutLotDQ) {
                btnAccept.style.width = w / 2;
                btnReject.style.width = w / 2;

                btnAccept.style.height = h;
                btnReject.style.height = h;

                btnAccept.disabled = false;
                btnReject.disabled = false;

                oPopupOrder.document.body.innerHTML = oDialog2.innerHTML;
                oPopupOrder.show(l + 2, t + 2, w, h, vsflexOrderTask);
            }
            else {
                if (btnAccept != null) {
                    btnAccept.disabled = (order.status == OrderStatus.WaitAutoExecuteDQ) ? true : false;
                    btnReject.disabled = (order.status == OrderStatus.WaitAutoExecuteDQ) ? true : false;
                }
                //lOrderLastLine = -1;
                oPopupOrder.hide();
            }
        }
        else if (type == OrderType.Limit || type == OrderType.OneCancelOther || type == OrderType.Market) {
            //var order = data.object;
            //Remarked by Michael on 2009-02-09
            //					if((type == OrderType.Limit || type == OrderType.OneCancelOther) 
            //						&& order.status == OrderStatus.WaitAcceptRejectPlace)
            //					{
            //						btnAcceptPlace.style.width = w/2;
            //						btnRejectPlace.style.width = w/2;
            //						btnAcceptPlace.style.height = h;
            //						btnRejectPlace.style.height = h;
            //						oPopupOrder.document.body.innerHTML = oDialogForAcceptPlace.innerHTML; 
            //						oPopupOrder.show(l+2, t+2, w , h, vsflexOrderTask);
            //					}
            //					else 
            if ((type == OrderType.Limit || type == OrderType.OneCancelOther)
						&& order.status == OrderStatus.WaitAcceptRejectCancel) {
                btnAcceptCancel.style.width = w / 2;
                btnRejectCancel.style.width = w / 2;
                btnAcceptCancel.style.height = h;
                btnRejectCancel.style.height = h;
                oPopupOrder.document.body.innerHTML = oDialogForAcceptCancel.innerHTML;
                oPopupOrder.show(l + 2, t + 2, w, h, vsflexOrderTask);
            }
            else if (order.status == OrderStatus.WaitOutPriceLMT ||
						order.status == OrderStatus.WaitOutLotLMTOrigin ||
						order.status == OrderStatus.WaitOutLotLMT ||
                        order.tran.subType == 3) {
                var countButton = 4;
                /*if(order.status == OrderStatus.WaitOutLotLMTOrigin)
                countButton = 3;
                else if(order.status == OrderStatus.WaitOutPriceLMT)
                countButton = 2;*/
                var w2 = w / countButton;
                btnUpdate.style.width = w2;
                btnModify.style.width = w2;
                btnWait.style.width = w2;
                btnExecute.style.width = w2;
                btnUpdate.style.height = h;
                btnModify.style.height = h;
                btnWait.style.height = h;
                btnExecute.style.height = h;
                btnUpdate.disabled = (order.status == OrderStatus.WaitOutPriceLMT) ? true : false;
                btnModify.disabled = (order.status == OrderStatus.WaitOutLotLMT) ? false : true;
                oPopupOrder.document.body.innerHTML = oDialog3.innerHTML;
                oPopupOrder.show(l + 2, t + 2, w, h, vsflexOrderTask);
            }
            else if (type == OrderType.Limit) {
                btnCancel.style.width = w;
                btnCancel.style.height = h;
                oPopupOrder.document.body.innerHTML = oDialog4.innerHTML;
                oPopupOrder.show(l + 2, t + 2, w, h, vsflexOrderTask);
                /*lOrderLastLine = -1;
                oPopupOrder.hide();*/
            }
        }
        else if (type == OrderType.MarketOnOpen || type == OrderType.MarketOnClose) {
            btnDetail.style.width = w;
            btnDetail.style.height = h;
            oPopupOrder.document.body.innerHTML = oDialog1.innerHTML;
            oPopupOrder.show(l + 2, t + 2, w, h, vsflexOrderTask);
        }
    }
}

function VsflexOrderTask_OnActivate() {
    vsflexOrderTask.hideFocus = false;
    //ShowOrderButtons(vsflexOrderTask.Row);
    ShowCellButtons(vsflexOrderTask.Row,true);
}

function VsflexOrderTask_OnDeactivate() {
    vsflexOrderTask.hideFocus = true;
    oPopupOrder.hide();
}

function VsflexOrderTask_OnMouseMove() {
    if (vsflexOrderTask.hideFocus == false)
    //ShowOrderButtons(vsflexOrderTask.Row);
    ShowCellButtons(vsflexOrderTask.Row,true);
    //SetCellButtonBackColor(vsflexOrderTask, color_lightseagreen);
}

//function VsflexOrderTask_OnMouseOver() {
//    SetCellButtonBackColor(vsflexOrderTask, color_darkgreen);
//}
//Cell Button don't allow Drag
function VsflexOrderTask_BeforeMoveColumn(col, position) {
    if (col <= 6 || position <= 6) {
        vsflexOrderTask.ColPosition(position) = col;
    }
}

//Change Column Width
function VsflexOrderTask_AfterUserResize(row, col) {
    var vsflexGrid = vsflexOrderTask;
    var newWidth = vsflexGrid.ColWidth(col);

    if (col == _OrderTaskGridColIndexs.OrderExecuted) {
        var placingWidth = vsflexGrid.ColWidth(_OrderTaskGridColIndexs.OrderPlacing);
        var orderPendingWidth = vsflexGrid.ColWidth(_OrderTaskGridColIndexs.OrderPending);
        var orderCanceledWidth = vsflexGrid.ColWidth(_OrderTaskGridColIndexs.OrderCanceled);
        var sumWidth = placingWidth + orderPendingWidth + orderCanceledWidth + newWidth;
        if (sumWidth <= 0) {
            sumWidth = 2000;
        }
        var averageWidth = sumWidth * 0.25;
        vsflexGrid.ColWidth(_OrderTaskGridColIndexs.OrderExecuted) = averageWidth;
        vsflexGrid.ColWidth(_OrderTaskGridColIndexs.OrderCanceled) = averageWidth;
        vsflexGrid.ColWidth(_OrderTaskGridColIndexs.OrderPending) = averageWidth;
        vsflexGrid.ColWidth(_OrderTaskGridColIndexs.OrderPlacing) = averageWidth;
    }
    else if (col == _OrderTaskGridColIndexs.DQReject) {
        var dQAcceptWidth = vsflexGrid.ColWidth(_OrderTaskGridColIndexs.DQAccept);
        var sumWidth = dQAcceptWidth + newWidth;
        if (sumWidth <= 0) {
            sumWidth = 1000;
        }
        var averageWidth = sumWidth * 0.5;
        vsflexGrid.ColWidth(_OrderTaskGridColIndexs.DQAccept) = averageWidth;
        vsflexGrid.ColWidth(_OrderTaskGridColIndexs.DQReject) = averageWidth;
    } 
}

function OpenPriceButton_OnClick() {
    GetAverageOpenPriceByCloseOrderID();
}

function SetCellButtonBackColor(vsflexGrid,color) {
    var row = vsflexGrid.MouseRow
    var col = vsflexGrid.MouseCol

    if (row < vsflexGrid.FixedRows || col < vsflexGrid.FixedCols || col > 5) return;

    var cellData = vsflexGrid.Cell(flexcpData, row, col);
    if (typeof (cellData) == "undefined") return;

    vsflexGrid.Cell(flexcpBackColor, row, col) = color;
}

//Add by Erric 2012-12-05
function VsflexOrderTask_OnClick() {
    var vsflexGrid = vsflexOrderTask;
    var row = vsflexGrid.Row;
    var col = vsflexGrid.Col;
    if (row < vsflexGrid.FixedRows
        || col < vsflexGrid.FixedCols 
        || col > _OrderTaskGridColIndexs.OrderExecuted) return;

    var data = vsflexGrid.RowData(row);
    var orderType = data.type;

    var orders = data.object;

    var cellData = vsflexGrid.Cell(flexcpData, row, col);
    if (typeof (cellData) == "undefined") return;

    var orderAction = cellData.Action
    switch (orderAction) {
        case FillOrderAction.NoneAction:
            break;
        case FillOrderAction.OnOrderAccept:
            var isEnable = cellData.IsEnable;
            if (isEnable) {
                OnOrderAccept(row);
            }
            break;
        case FillOrderAction.OnOrderReject:
            var isEnable = cellData.IsEnable;
            if (isEnable) {
                OnOrderReject(row);
            }
            break;
        case FillOrderAction.OnOrderDetail:
            OnOrderDetail(row);
            break;
        case FillOrderAction.OnOrderAcceptPlace:
            OnOrderAcceptPlace(row);
            break;
        case FillOrderAction.OnOrderRejectPlace:
            OnOrderRejectPlace(row);
            break;
        case FillOrderAction.OnOrderAcceptCancel:
            OnOrderAcceptCancel(row);
            break;
        case FillOrderAction.OnOrderRejectCancel:
            OnOrderRejectCancel(row);
            break;
        case FillOrderAction.OnOrderUpdate:

            var isEnable = cellData.IsEnable;
            if (isEnable) {
                OnOrderUpdate(row);
            }
            break;
        case FillOrderAction.OnOrderModify:
            var isEnable = cellData.IsEnable;
            if (isEnable) {
                OnOrderModify(row);
            }
            break;
        case FillOrderAction.OnOrderWait:
            OnOrderWait(row) ;
            break;
        case FillOrderAction.OnOrderExecute:
            OnOrderExecute(row);
            break;
        case FillOrderAction.OnOrderCancel:
            OnOrderCancel(row);
            break;
    }
    vsflexGrid.Col = _OrderTaskGridColIndexs.Item;
}

//-----------------2012-12-05---------------------------------------------

function ActionClass(behaviors,caption) {
    this.Behaviors = behaviors;
    this.Caption = caption;
}

var FillOrderAction = new FillOrderAction()     //static
function FillOrderAction()
{
    this.NoneAction = new ActionClass(ActionEnum.None," ");
	this.OnOrderAccept = new ActionClass(ActionEnum.OnOrderAccept,"Accept");
	this.OnOrderReject = new ActionClass(ActionEnum.OnOrderReject, "Reject")
	this.OnOrderDetail = new ActionClass(ActionEnum.OnOrderDetail, "Detail")
	this.OnOrderAcceptPlace = new ActionClass(ActionEnum.OnOrderAcceptPlace, "Accept")
	this.OnOrderRejectPlace = new ActionClass(ActionEnum.OnOrderRejectPlace, "Reject")
	this.OnOrderAcceptCancel = new ActionClass(ActionEnum.OnOrderAcceptCancel, "Accept")
	this.OnOrderRejectCancel = new ActionClass(ActionEnum.OnOrderRejectCancel, "Reject")
	this.OnOrderUpdate = new ActionClass(ActionEnum.OnOrderUpdate, "uPdate");
	this.OnOrderModify = new ActionClass(ActionEnum.OnOrderModify, "modiFy")
	this.OnOrderWait = new ActionClass(ActionEnum.OnOrderWait, "waIt")
	this.OnOrderExecute = new ActionClass(ActionEnum.OnOrderExecute, "Execute")
	this.OnOrderCancel = new ActionClass(ActionEnum.OnOrderCancel, "Cancel")
}

//Binding Object
function CellDataDefine(fillOrderAction,isEnable,isDQ,btnCount)
{
    this.Action = fillOrderAction;
    this.IsEnable = isEnable;
    this.IsDQ = isDQ;
    this.ButtonCount = btnCount;
}

function SetCellData(vsflexGrid, row, col, cellDataDefine) {
    vsflexGrid.Cell(flexcpData, row, col) = cellDataDefine;
    var foreColorValue = color_black;
    var backColorValue = color_lightblue;
    var showBtnCount = cellDataDefine.ButtonCount;
    if (cellDataDefine.IsDQ) {
        vsflexGrid.MergeCells = flexMergeFree;
        vsflexGrid.MergeRow(row) = true;
        vsflexGrid.Cell(flexcpText, row, 2, row, 5) = vsflexGrid.TextMatrix(row, _OrderTaskGridColIndexs.Order);
        vsflexGrid.Cell(flexcpBackColor, row, col) = color_white;

        switch (showBtnCount) {
            case 2:
                vsflexGrid.TextMatrix(row, col) = cellDataDefine.Action.Caption;
//                backColorValue = color_lightblue;
                var isEnable = cellDataDefine.IsEnable;
                if (!isEnable) {
                    foreColorValue = color_darkgray;
                }
                else {
                    foreColorValue = col > _OrderTaskGridColIndexs.DQAccept ? color_red : color_black;
                }
//                backColorValue = color_lightblue;
                break;
        }
    }
    else {
        vsflexGrid.MergeCells = flexMergeFree;
        vsflexGrid.MergeRow(row) = true;
	    vsflexGrid.Cell(flexcpText, row, 0, row, 1) = vsflexGrid.TextMatrix(row, _OrderTaskGridColIndexs.Order);

	    switch (showBtnCount) {
	        case 0:
	            vsflexGrid.MergeCells = flexMergeFree;
	            vsflexGrid.MergeRow(row) = true;
	            vsflexGrid.Cell(flexcpText, row, _OrderTaskGridColIndexs.OrderPlacing, row, _OrderTaskGridColIndexs.OrderExecuted) = cellDataDefine.Action.Caption;
	            vsflexGrid.Cell(flexcpBackColor, row, _OrderTaskGridColIndexs.OrderPlacing) = color_lightblue;
	            vsflexGrid.Cell(flexcpData, row, _OrderTaskGridColIndexs.OrderPlacing) = cellDataDefine;
	            break;
            case 1:
                vsflexGrid.MergeCells = flexMergeFree;
                vsflexGrid.MergeRow(row) = true;
                vsflexGrid.Cell(flexcpText, row, _OrderTaskGridColIndexs.OrderPlacing, row, _OrderTaskGridColIndexs.OrderExecuted) = cellDataDefine.Action.Caption;
//                vsflexGrid.ColAlignment(2) = flexAlignCenterCenter
                vsflexGrid.Cell(flexcpBackColor, row, _OrderTaskGridColIndexs.OrderPlacing) = color_lightblue;
                vsflexGrid.Cell(flexcpData, row, _OrderTaskGridColIndexs.OrderPlacing) = cellDataDefine;
                break;
            case 2:
                vsflexGrid.MergeCells = flexMergeFree;
                vsflexGrid.MergeRow(row) = true;
                //                vsflexGrid.ColAlignment(3) = flexAlignCenterCenter
                if (col < _OrderTaskGridColIndexs.OrderPending) {
                    vsflexGrid.Cell(flexcpText, row, _OrderTaskGridColIndexs.OrderPlacing, row, _OrderTaskGridColIndexs.OrderPending) = cellDataDefine.Action.Caption;
                }
                else {
                    vsflexGrid.Cell(flexcpText, row, _OrderTaskGridColIndexs.OrderCanceled, row, _OrderTaskGridColIndexs.OrderExecuted) = cellDataDefine.Action.Caption;
                }
//                backColorValue = color_lightblue;
                //vsflexGrid.Cell(flexcpData, row, col) = cellDataDefine;
                foreColorValue = (col >= _OrderTaskGridColIndexs.OrderCanceled) ? color_red : color_black;
                break;
            case 4:
                vsflexGrid.TextMatrix(row, col) = cellDataDefine.Action.Caption;
//                backColorValue = color_lightblue;
//                vsflexGrid.ColAlignment(_OrderTaskGridColIndexs.OrderPlacing) = flexAlignCenterCenter;
//                vsflexGrid.ColAlignment(_OrderTaskGridColIndexs.OrderPending) = flexAlignCenterCenter;
//                vsflexGrid.ColAlignment(_OrderTaskGridColIndexs.OrderCanceled) = flexAlignCenterCenter;
//                vsflexGrid.ColAlignment(_OrderTaskGridColIndexs.OrderExecuted) = flexAlignCenterCenter;
                var isEnable = cellDataDefine.IsEnable;
                if (!isEnable) {
                    foreColorValue = color_darkgray;
                }
                else {
                    foreColorValue = color_black;
                }
                break;
        }
    }
    vsflexGrid.Cell(flexcpForeColor, row, col) = foreColorValue;
    vsflexGrid.Cell(flexcpBackColor, row, col) = backColorValue;
}

function ShowCellButtons(line,needRedraw) {
    if (!OrderTaskInited) return;
    if (line < vsflexOrderTask.FixedRows) return;
    var data = vsflexOrderTask.RowData(line);
    if (!data || !data.object)
        return;

    if (needRedraw) vsflexOrderTask.Redraw = false;
    vsflexOrderTask.GridColor = color_black;
    var order = data.object;
    var type = data.type;
    if (order.status == OrderStatus.WaitAcceptRejectPlace) {
        if (type == OrderType.SpotTrade) {
            var btnCount = 2;
            var acceptCellData = new CellDataDefine(FillOrderAction.OnOrderAcceptPlace, true, true, btnCount);
            var rejectCellData = new CellDataDefine(FillOrderAction.OnOrderRejectPlace, true, true, btnCount);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.DQAccept, acceptCellData);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.DQReject, rejectCellData);
        } else {
            var btnCount = 2;
            var acceptCellData = new CellDataDefine(FillOrderAction.OnOrderAcceptPlace, true, false, btnCount);
            var cancelCellData = new CellDataDefine(FillOrderAction.OnOrderRejectPlace, true, false, btnCount);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderPlacing, acceptCellData);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderCanceled, cancelCellData);
        }
        if (needRedraw) vsflexOrderTask.Redraw = true;
        return;
    }

    //DQ
    if (type == OrderType.SpotTrade) {			    
        var btnCount = 2;
        var btnAcceptIsEnable = (order.status == OrderStatus.WaitAutoExecuteDQ) ? false : true;
        var btnRejectIsEnable = (order.status == OrderStatus.WaitAutoExecuteDQ) ? false : true;
        var acceptCellData = new CellDataDefine(FillOrderAction.OnOrderAccept, btnAcceptIsEnable, true, btnCount);
        var rejectCellData = new CellDataDefine(FillOrderAction.OnOrderReject, btnRejectIsEnable, true, btnCount);
        this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.DQAccept, acceptCellData);
        this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.DQReject, rejectCellData);
    }
    else if (type == OrderType.Limit || type == OrderType.OneCancelOther || type == OrderType.Market) {    
        if ((type == OrderType.Limit || type == OrderType.OneCancelOther)
					&& order.status == OrderStatus.WaitAcceptRejectCancel) {
            var btnCount = 2;
            var acceptCellData = new CellDataDefine(FillOrderAction.OnOrderAcceptCancel, true, false, btnCount);
            var cancelCellData = new CellDataDefine(FillOrderAction.OnOrderRejectCancel, true, false, btnCount);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderPlacing, acceptCellData);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderCanceled, cancelCellData);
        }
        else if (order.status == OrderStatus.WaitOutPriceLMT ||
					order.status == OrderStatus.WaitOutLotLMTOrigin ||
					order.status == OrderStatus.WaitOutLotLMT ||
                    order.tran.subType == 3) {
            var btnCount = 4;
            var btnUpdateIsEnable = (order.status == OrderStatus.WaitOutPriceLMT) ? false : true;
            var btnModifyIsEnable = (order.status == OrderStatus.WaitOutLotLMT) ? true : false;

            var updateCellData = new CellDataDefine(FillOrderAction.OnOrderUpdate, btnUpdateIsEnable, false, btnCount);
            var modifyCellData = new CellDataDefine(FillOrderAction.OnOrderModify, btnModifyIsEnable, false, btnCount);
            var waiterCellData = new CellDataDefine(FillOrderAction.OnOrderWait, true, false, btnCount);
            var excuteCellData = new CellDataDefine(FillOrderAction.OnOrderExecute, true, false, btnCount);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderPlacing, updateCellData);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderPending, modifyCellData);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderCanceled, waiterCellData);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderExecuted, excuteCellData);
        }
        else if (type == OrderType.Limit) {
            var btnCount = 1;
            var cellData = new CellDataDefine(FillOrderAction.OnOrderCancel, true, false, btnCount);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderPlacing, cellData);
        }
        else if (type == OrderType.Market) {
            var btnCount = 0;
            var cellData = new CellDataDefine(FillOrderAction.NoneAction, true, false, btnCount);
            this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderPlacing, cellData);
        }
    }
    else if (type == OrderType.MarketOnOpen || type == OrderType.MarketOnClose) {
        var btnCount = 1;
        var cellData = new CellDataDefine(FillOrderAction.OnOrderDetail, true, false, btnCount);
        this.SetCellData(vsflexOrderTask, line, _OrderTaskGridColIndexs.OrderPlacing, cellData);
    }
    if (needRedraw) vsflexOrderTask.Redraw = true;
}