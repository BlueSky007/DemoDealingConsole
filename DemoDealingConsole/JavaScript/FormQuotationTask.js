var oPopup = window.createPopup();

var quotationTaskPageLoaded = false;
function QuotationTaskPageOnload() {
    quotationTaskPageLoaded = true;
}

function VsflexQuotationTask_OnActivate() {
    vsflexQuotationTask.hideFocus = false;
    ShowQuoteCellButtons(vsflexQuotationTask.Row,true);
}

function VsflexQuotationTask_OnBlur() {
    vsflexQuotationTask.hideFocus = true;
    //oPopup.hide();
}

function VsflexQuotationTask_OnDeactivate() {
    vsflexQuotationTask.hideFocus = true;
    //oPopup.hide();
}

function VsflexQuotationTask_OnMouseMove() {
    if (vsflexQuotationTask.hideFocus == false)
        ShowQuoteCellButtons(vsflexQuotationTask.Row,true);
    //else
        //oPopup.hide();
}

function VsflexQuotationTask_BeforeMoveColumn(col, position) {
    if (col <= _QuotationTaskGridColIndexs.QuotationButtonD
        || position <= _QuotationTaskGridColIndexs.QuotationButtonD) {
        vsflexQuotationTask.ColPosition(position) = col;
    }
}

function VsflexQuotationTask_AfterUserResize(row, col) {
    var vsflexGrid = vsflexQuotationTask;
    var newWidth = vsflexGrid.ColWidth(col);

    if (col == _QuotationTaskGridColIndexs.QuotationButtonD) {
        var buttonAWidth = vsflexGrid.ColWidth(_QuotationTaskGridColIndexs.QuotationButtonA);
        var buttonBWidth = vsflexGrid.ColWidth(_QuotationTaskGridColIndexs.QuotationButtonB);
        var buttonCWidth = vsflexGrid.ColWidth(_QuotationTaskGridColIndexs.QuotationButtonC);
        var sumWidth = newWidth + buttonAWidth + buttonBWidth + buttonCWidth;
        if (sumWidth <= 0) {
            sumWidth = 2400;
        }
        var widthOfPerButton = sumWidth * 0.25;
        vsflexGrid.ColWidth(_QuotationTaskGridColIndexs.QuotationButtonA) = widthOfPerButton;
        vsflexGrid.ColWidth(_QuotationTaskGridColIndexs.QuotationButtonB) = widthOfPerButton;
        vsflexGrid.ColWidth(_QuotationTaskGridColIndexs.QuotationButtonC) = widthOfPerButton;
        vsflexGrid.ColWidth(_QuotationTaskGridColIndexs.QuotationButtonD) = widthOfPerButton;
    }
}

function ShowQuoteCellButtons(line,needRedraw) {
    if (!QuotationTaskInited) return;
    //if (line < vsflexQuotationTask.FixedRows) return;
    if (line < 1) return;
    var data = vsflexQuotationTask.RowData(line);
    if (!data || !data.object) return;

    if (needRedraw) vsflexQuotationTask.Redraw = false;
    var type = data.type;
//    if (type == QuoteTaskType.Inactive) {
//        var btnCount = 2;
//        //need merge column
//        var switchCellData = new CellDataInstance(QuotationAction.OnSwitch, btnCount);
//        var ignoreCellData = new CellDataInstance(QuotationAction.OnIgnore, btnCount);
//        this.SetQuotationCellData(vsflexQuotationTask, line, _QuotationTaskGridColIndexs.QuotationButtonA, switchCellData);
//        this.SetQuotationCellData(vsflexQuotationTask, line, _QuotationTaskGridColIndexs.QuotationButtonC, ignoreCellData);
//    }
//    else 
    if (type == QuoteTaskType.OutOfRange) {
        var btnCount = 2;
        //need merge column
        var acceptCellData = new CellDataInstance(QuotationAction.OnAccept,btnCount);
        var discardCellData = new CellDataInstance(QuotationAction.OnDiscard,btnCount);
        this.SetQuotationCellData(vsflexQuotationTask, line, _QuotationTaskGridColIndexs.QuotationButtonA, acceptCellData);
        this.SetQuotationCellData(vsflexQuotationTask, line, _QuotationTaskGridColIndexs.QuotationButtonC, discardCellData);
    }
    else if (type == QuoteTaskType.Enquiry) {
        var btnCount = 4;
        //need merge column
        var aBandonCellData = new CellDataInstance(QuotationAction.OnAbandon, btnCount);
        var updateCellData = new CellDataInstance(QuotationAction.OnUpdate, btnCount);
        var modifyCellData = new CellDataInstance(QuotationAction.OnModify, btnCount);
        var sendCellData = new CellDataInstance(QuotationAction.OnSend, btnCount);
        this.SetQuotationCellData(vsflexQuotationTask, line, _QuotationTaskGridColIndexs.QuotationButtonA, aBandonCellData);
        this.SetQuotationCellData(vsflexQuotationTask, line, _QuotationTaskGridColIndexs.QuotationButtonB, updateCellData);
        this.SetQuotationCellData(vsflexQuotationTask, line, _QuotationTaskGridColIndexs.QuotationButtonC, modifyCellData);
        this.SetQuotationCellData(vsflexQuotationTask, line, _QuotationTaskGridColIndexs.QuotationButtonD, sendCellData);
    }
    else if (type == QuoteTaskType.Enquiry2) {
        var btnCount = 1;
        //need merge column
        var modifyCellData = new CellDataInstance(QuotationAction.OnModify2, btnCount);
        this.SetQuotationCellData(vsflexQuotationTask, line, _QuotationTaskGridColIndexs.QuotationButtonC, modifyCellData);
    }
    if (needRedraw) vsflexQuotationTask.Redraw = true;
}

function VsflexQuotationTask_OnClick() {
    var vsflexGrid = vsflexQuotationTask;
    var row = vsflexGrid.Row;
    var col = vsflexGrid.Col;

    if (row < vsflexGrid.FixedRows) return;

    if(col == _QuotationTaskGridColIndexs.QuotationButtonA
    || col == _QuotationTaskGridColIndexs.QuotationButtonB
    || col == _QuotationTaskGridColIndexs.QuotationButtonC
    || col == _QuotationTaskGridColIndexs.QuotationButtonD) {
        var cellData = vsflexGrid.Cell(flexcpData, row, col);
        if (typeof (cellData) == "undefined") return;

        switch (cellData.Action) {
            case QuotationAction.None:
                break;
//            case QuotationAction.OnSwitch:
//                OnSwitch(row);
//                break;
//            case QuotationAction.OnIgnore:
//                OnIgnore(row);
//                break;
            case QuotationAction.OnAccept:
                OnAccept(row);
                break;
            case QuotationAction.OnDiscard:
                OnDiscard(row);
                break;
            case QuotationAction.OnAbandon:
                OnAbandon(row);
                break;
            case QuotationAction.OnUpdate:
                OnUpdate(row);
                break;
            case QuotationAction.OnModify:
                OnModify(row);
                break;
            case QuotationAction.OnSend:
                OnSend(row);
                break;
            case QuotationAction.OnModify2:
                OnModify2(row);
                break;
        }
    }
}


//add by Erric
function ActionClass(behaviors, caption) {
    this.Behaviors = behaviors;
    this.Caption = caption;
}
var QuotationAction = new QuotationAction();   //static
function QuotationAction() {
    this.NoneAction = new ActionClass(QuotationActionEnum.None, " ");
//    this.OnSwitch = new ActionClass(QuotationActionEnum.OnSwitch, "Switch To Manual Way");
//    this.OnIgnore = new ActionClass(QuotationActionEnum.OnIgnore, "iGnore");
    this.OnAccept = new ActionClass(QuotationActionEnum.OnAccept, "OnAccept");
    this.OnDiscard = new ActionClass(QuotationActionEnum.OnDiscard, "OnDiscard");
    this.OnAbandon = new ActionClass(QuotationActionEnum.OnAbandon, "OnAbandon");
    this.OnUpdate = new ActionClass(QuotationActionEnum.OnUpdate, "OnUpdate");
    this.OnModify = new ActionClass(QuotationActionEnum.OnModify, "OnModify");
    this.OnSend = new ActionClass(QuotationActionEnum.OnSend, "OnSend");
    this.OnModify2 = new ActionClass(QuotationActionEnum.OnModify2, "OnModify2");
}

function CellDataInstance(quotationAction, btnCount) {
    this.Action = quotationAction;
    this.ButtonCount = btnCount;
}

function SetQuotationCellData(vsflexGrid, row, col, cellDataInstance) {
    //vsflexGrid.GridColor = color_black;
    vsflexGrid.Cell(flexcpBackColor, row, col) = color_lightblue;
    vsflexGrid.Cell(flexcpForeColor, row, col) = color_blue;
    var commonLanguage = parent.quotationFrm.commonLanguage;
    var showBtnCount = cellDataInstance.ButtonCount;
    var buttonCaption = commonLanguage[cellDataInstance.Action.Caption + "Qutation"];
    switch (showBtnCount) {
        case 1:
            vsflexGrid.MergeCells = flexMergeFree;
            vsflexGrid.MergeRow(row) = true;
            vsflexGrid.Cell(flexcpText, row, _QuotationTaskGridColIndexs.QuotationButtonA, row, _QuotationTaskGridColIndexs.QuotationButtonD) = buttonCaption;// cellDataInstance.Action.Caption;

            vsflexGrid.Cell(flexcpBackColor, row, _QuotationTaskGridColIndexs.QuotationButtonC) = color_lightblue;
            vsflexGrid.Cell(flexcpData, row, _QuotationTaskGridColIndexs.QuotationButtonC) = cellDataInstance;
            break;
        case 2:
            vsflexGrid.MergeCells = flexMergeFree;
            vsflexGrid.MergeRow(row) = true;

            if (col < _QuotationTaskGridColIndexs.QuotationButtonC) {
                vsflexGrid.Cell(flexcpText, row, _QuotationTaskGridColIndexs.QuotationButtonA, row, _QuotationTaskGridColIndexs.QuotationButtonB) = buttonCaption; // cellDataInstance.Action.Caption;
            }
            else {
                vsflexGrid.Cell(flexcpText, row, _QuotationTaskGridColIndexs.QuotationButtonC, row, _QuotationTaskGridColIndexs.QuotationButtonD) = buttonCaption;// cellDataInstance.Action.Caption;
            }
            vsflexGrid.Cell(flexcpData, row, col) = cellDataInstance;
            break;
        case 4:
            vsflexGrid.TextMatrix(row, col) = buttonCaption; //cellDataInstance.Action.Caption;
            vsflexGrid.Cell(flexcpData, row, col) = cellDataInstance;
            break;
    }
}