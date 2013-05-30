var SourceLevelAdjustmentInited = false;
var timerID = null;
var sourceLevelAdjustmentTimerInterval = 800;

//Added Michael on 2005-06-30
function SourceLevelAdjustmentInit() {
    with (sourceLevelAdjustmentGrid) {
        FixedRows = 1;
        FixedCols = 0;
        Rows = 1;
        Cols = 5;

        var quotationFrm = window.parent.quotationFrm;
        var sourceLevelAdjustmentGridColKey = quotationFrm.sourceLevelAdjustmentGridColKey;
        var sourceLevelAdjustmentGridLanguage = quotationFrm.sourceLevelAdjustmentGridLanguage;

        var parameter = quotationFrm.oDealingConsole.InitGrid(window.sourceLevelAdjustmentGrid, quotationFrm.optionGrid.SourceLevelAdjustmentGrid, sourceLevelAdjustmentGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForSourceLevelAdjustment(window.sourceLevelAdjustmentGrid, sourceLevelAdjustmentGridColKey);

        FixedAlignment(ColIndex(sourceLevelAdjustmentGridColKey.IncreaseAutoAdjustPoints)) = flexAlignCenterCenter;
        ColAlignment(ColIndex(sourceLevelAdjustmentGridColKey.IncreaseAutoAdjustPoints)) = flexAlignCenterCenter;
        ColAlignment(ColIndex(sourceLevelAdjustmentGridColKey.DecreaseAutoAdjustPoints)) = flexAlignCenterCenter;
        FixedAlignment(ColIndex(sourceLevelAdjustmentGridColKey.DecreaseAutoAdjustPoints)) = flexAlignCenterCenter;
        ColDataType(ColIndex(sourceLevelAdjustmentGridColKey.ReferenceAutoAdjustPoints)) = flexDTString;
        FixedAlignment(ColIndex(sourceLevelAdjustmentGridColKey.ReferenceAutoAdjustPoints)) = flexAlignLeftCenter;
        ColAlignment(ColIndex(sourceLevelAdjustmentGridColKey.ReferenceAutoAdjustPoints)) = flexAlignLeftCenter;

        FrozenCols = 1;
        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExMove;
        SelectionMode = flexSelectionFree;
        Ellipsis = flexEllipsisEnd;

        hideFocus = true;
    }
    sourceLevelAdjustmentTimerInterval = parseInt(window.document.all._SourceLevelAdjustmentTimerIntervalHidden.value);
    SourceLevelAdjustmentInited = true;
}

function GridColumnsDefaultFormatForSourceLevelAdjustment(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.OriginCode)) = 1200;
        ColWidth(ColIndex(gridColKey.IncreaseAutoAdjustPoints)) = 600;
        ColWidth(ColIndex(gridColKey.DecreaseAutoAdjustPoints)) = 600;
        ColWidth(ColIndex(gridColKey.ReferenceAutoAdjustPoints)) = 1000;
    }
}

function GetOriginCodes() {
    var oOriginCodes = new ActiveXObject("Scripting.Dictionary"); //key=OriginCode value=OriginCodeClass
    var quotationFrm = window.parent.quotationFrm;
    var instruments = (new VBArray(quotationFrm.oInstruments.Items())).toArray();
    instruments = instruments.sort(CompareSortByCode);
    for (var index = 0, count = instruments.length; index < count; index++) {
        var instrument = instruments[index];
        var originCode = instrument.originCode;
        var referenceAutoAdjustPoints = instrument.GetSourceLevelAdjustmentReferenceAutoAdjustPoints(quotationFrm.oCurrentQuotePolicyDetailID);
        var oOriginCode = null;
        if (!oOriginCodes.Exists(originCode)) {
            oOriginCode = new OriginCodeClass(originCode, referenceAutoAdjustPoints);
            if (referenceAutoAdjustPoints != "") {
                oOriginCode.instrumentCodes = instrument.code;
            }
            oOriginCodes.Add(originCode, oOriginCode);
        }
        else {
            oOriginCode = oOriginCodes.Item(originCode);
            oOriginCode.referenceAutoAdjustPoints += (oOriginCode.referenceAutoAdjustPoints == "" ? "" : " | ") + referenceAutoAdjustPoints;
            if (referenceAutoAdjustPoints != "") {
                oOriginCode.instrumentCodes += (oOriginCode.instrumentCodes == "" ? "" : " | ") + instrument.code;
            }
        }
    }
    return oOriginCodes;
}

function OriginCodeClass(originCode, referenceAutoAdjustPoints) {
    this.originCode = originCode;
    this.referenceAutoAdjustPoints = referenceAutoAdjustPoints;
    this.instrumentCodes = "";
}

function FillSourceLevelAdjustmentGrid() {
    var quotationFrm = window.parent.quotationFrm;
    if (!quotationFrm) return;
    sourceLevelAdjustmentGrid.Redraw = false;
    sourceLevelAdjustmentGrid.Rows = sourceLevelAdjustmentGrid.FixedRows;
    sourceLevelAdjustmentGrid.TextMatrix(0, sourceLevelAdjustmentGrid.ColIndex(quotationFrm.sourceLevelAdjustmentGridColKey.ReferenceAutoAdjustPoints)) = "";
    try{
        with (sourceLevelAdjustmentGrid) {
            var oOriginCodes = GetOriginCodes();
            var originCodes = (new VBArray(oOriginCodes.Items())).toArray();
            originCodes = originCodes.sort(CompareSort);
            var beginRowIndex = sourceLevelAdjustmentGrid.Rows;
            Rows += originCodes.length;
            var endRowIndex = sourceLevelAdjustmentGrid.Rows;
            for (var i = beginRowIndex; i < endRowIndex; i++) {
                FillSourceInstrument(quotationFrm.sourceLevelAdjustmentGridColKey, i, originCodes[i - beginRowIndex]);
            }
        }
    }
    catch(e) {
    }
    finally{
        sourceLevelAdjustmentGrid.Redraw = true;
    }
}

function SourceLevelAdjustmentGrid_OnAccountAfterRowColChange(oldRow, oldCol, newRow, newCol) {
    if (newRow < sourceLevelAdjustmentGrid.FixedRows || newCol < sourceLevelAdjustmentGrid.FixedCols) return;
    var quotationFrm = window.parent.quotationFrm;
    var instrumentCodes = sourceLevelAdjustmentGrid.TextMatrix(newRow, sourceLevelAdjustmentGrid.ColIndex(quotationFrm.sourceLevelAdjustmentGridColKey.InstrumentCodes));
    sourceLevelAdjustmentGrid.TextMatrix(0, sourceLevelAdjustmentGrid.ColIndex(quotationFrm.sourceLevelAdjustmentGridColKey.ReferenceAutoAdjustPoints)) = instrumentCodes;
}

function UpdateReferenceAutoAdjustPoints(instrument) {
    var quotationFrm = window.parent.quotationFrm;
    var instrumentReferenceAutoAdjustPoints = instrument.GetSourceLevelAdjustmentReferenceAutoAdjustPoints(quotationFrm.oCurrentQuotePolicyDetailID);
    var sourceLevelAdjustmentGridColKey = quotationFrm.sourceLevelAdjustmentGridColKey;
    var rowIndex = sourceLevelAdjustmentGrid.FindRow(instrument.originCode, sourceLevelAdjustmentGrid.FixedRows, sourceLevelAdjustmentGrid.ColIndex(sourceLevelAdjustmentGridColKey.OriginCode), true, true);
    if (rowIndex > 0) {
        var referenceAutoAdjustPoints = "";
        var oldReferenceAutoAdjustPoints = sourceLevelAdjustmentGrid.TextMatrix(rowIndex, sourceLevelAdjustmentGrid.ColIndex(sourceLevelAdjustmentGridColKey.ReferenceAutoAdjustPoints));
        if (oldReferenceAutoAdjustPoints == "") {
            referenceAutoAdjustPoints = instrumentReferenceAutoAdjustPoints;
        }
        else {
            var instrumentCodes = sourceLevelAdjustmentGrid.TextMatrix(rowIndex, sourceLevelAdjustmentGrid.ColIndex(sourceLevelAdjustmentGridColKey.InstrumentCodes));
            var instrumentCodesArray = instrumentCodes.split(" | ");

            var oldReferenceAutoAdjustPointsArray = oldReferenceAutoAdjustPoints.split(" | ");
            for (var i = 0; i < oldReferenceAutoAdjustPointsArray.length; i++) {
                if (instrument.code == instrumentCodesArray[i]) {
                    oldReferenceAutoAdjustPointsArray[i] = instrumentReferenceAutoAdjustPoints;// instrumentReferenceAutoAdjustPoints == "" ? "" : instrumentReferenceAutoAdjustPoints.substring(0, instrumentReferenceAutoAdjustPoints.length - 3);
                }
                referenceAutoAdjustPoints += (referenceAutoAdjustPoints == "" ? "" : " | ") + oldReferenceAutoAdjustPointsArray[i];
            }
        }
        sourceLevelAdjustmentGrid.TextMatrix(rowIndex, sourceLevelAdjustmentGrid.ColIndex(sourceLevelAdjustmentGridColKey.ReferenceAutoAdjustPoints)) = referenceAutoAdjustPoints;
    }
}

function FillSourceInstrument(sourceLevelAdjustmentGridColKey, rowIndex, oOriginCode) {
    with (sourceLevelAdjustmentGrid) {
        TextMatrix(rowIndex, ColIndex(sourceLevelAdjustmentGridColKey.OriginCode)) = oOriginCode.originCode;
        TextMatrix(rowIndex, ColIndex(sourceLevelAdjustmentGridColKey.IncreaseAutoAdjustPoints)) = "+";
        TextMatrix(rowIndex, ColIndex(sourceLevelAdjustmentGridColKey.DecreaseAutoAdjustPoints)) = "-";
        TextMatrix(rowIndex, ColIndex(sourceLevelAdjustmentGridColKey.ReferenceAutoAdjustPoints)) = oOriginCode.referenceAutoAdjustPoints;
        TextMatrix(rowIndex, ColIndex(sourceLevelAdjustmentGridColKey.InstrumentCodes)) = oOriginCode.instrumentCodes;
        RowData(rowIndex) = null;

        Cell(flexcpBackColor, rowIndex, ColIndex(sourceLevelAdjustmentGridColKey.IncreaseAutoAdjustPoints)) = color_royalblue;
        Cell(flexcpBackColor, rowIndex, ColIndex(sourceLevelAdjustmentGridColKey.DecreaseAutoAdjustPoints)) = color_indianred;
    }
}

function CompareSort(objA, objB) {
    if (objA.originCode > objB.originCode)
        return 1;
    else if (objA.originCode < objB.originCode)
        return -1;
    else
        return 0;
}

function CompareSortByCode(objA, objB) {
    if (objA.code > objB.code)
        return 1;
    else if (objA.code < objB.code)
        return -1;
    else
        return 0;
}

function CanModifyDealerParameterAutoAdjustPoints(quotationFrm) {
    var canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter("AutoAdjustPoints"));
    return canEdit;
}

function SourceLevelAdjustmentGrid_FilterKey2(theEvent) {
    if (theEvent.keyCode == 13) {
        SourceLevelAdjustmentGrid_OnClick(sourceLevelAdjustmentGrid.Row, sourceLevelAdjustmentGrid.Col);
    }
}

function SourceLevelAdjustmentGrid_OnClick(row, col) {
//    var currentRow = sourceLevelAdjustmentGrid.Row;
//    var currentCol = sourceLevelAdjustmentGrid.Col;
    if (row < sourceLevelAdjustmentGrid.FixedRows || col < sourceLevelAdjustmentGrid.FixedCols) return;
    var quotationFrm = window.parent.quotationFrm;
    if (!CanModifyDealerParameterAutoAdjustPoints(quotationFrm)) {
        alert("Can not Modify AutoAdjustPoints!");
        return;
    }
    var needSendOverridedQuotation = false;
    var sourceLevelAdjustmentGridColKey = quotationFrm.sourceLevelAdjustmentGridColKey;
    var originCode = sourceLevelAdjustmentGrid.TextMatrix(row, sourceLevelAdjustmentGrid.ColIndex(sourceLevelAdjustmentGridColKey.OriginCode));
    if (col == sourceLevelAdjustmentGrid.ColIndex(sourceLevelAdjustmentGridColKey.IncreaseAutoAdjustPoints)) {
        SourceLevelAdjustmentSubmit(originCode, true, needSendOverridedQuotation);
        sourceLevelAdjustmentGrid.RowData(row) = new Date();
        if (sourceLevelAdjustmentTimerID == null) {
            SourceLevelAdjustmentTimer();
        }
        sourceLevelAdjustmentGrid.Col = 0;
    }
    else if (col == sourceLevelAdjustmentGrid.ColIndex(sourceLevelAdjustmentGridColKey.DecreaseAutoAdjustPoints)) {
        SourceLevelAdjustmentSubmit(originCode, false, needSendOverridedQuotation);
        sourceLevelAdjustmentGrid.RowData(row) = new Date();
        if (sourceLevelAdjustmentTimerID == null) {
            SourceLevelAdjustmentTimer();
        }
        sourceLevelAdjustmentGrid.Col = 0;
    }
    SourceLevelAdjustmentGrid_OnAccountAfterRowColChange(-1, -1, row, col);
}

function SourceLevelAdjustmentSubmit(originCode, isIncrease, needSendOverridedQuotation) {
    var quotationFrm = window.parent.quotationFrm;
    quotationFrm.oDealingConsole.SourceLevelAdjustment(originCode, isIncrease, needSendOverridedQuotation);
}

var sourceLevelAdjustmentTimerID = null;
function SourceLevelAdjustmentTimer() {
    if (sourceLevelAdjustmentTimerID != null) {
        window.clearTimeout(sourceLevelAdjustmentTimerID);        
    }
    var now = new Date();
    var continueAction = false;
    var quotationFrm = window.parent.quotationFrm;
    var sourceLevelAdjustmentGridColKey = quotationFrm.sourceLevelAdjustmentGridColKey;
    for (var row = sourceLevelAdjustmentGrid.FixedRows, count = sourceLevelAdjustmentGrid.Rows; row < count; row++) {
        var lastRowChangeTime = sourceLevelAdjustmentGrid.RowData(row);
        if (lastRowChangeTime != null && now - lastRowChangeTime >= sourceLevelAdjustmentTimerInterval) {
            sourceLevelAdjustmentGrid.RowData(row) = null;
            lastRowChangeTime = null;
            //SendOverridedQuotation            
            var originCode = sourceLevelAdjustmentGrid.TextMatrix(row, sourceLevelAdjustmentGrid.ColIndex(sourceLevelAdjustmentGridColKey.OriginCode));
            quotationFrm.oDealingConsole.SendOverridedQuotation(originCode);
        }
        if (lastRowChangeTime != null)
        {
            continueAction = true;
        }
    }
    if (continueAction) {
        sourceLevelAdjustmentTimerID = window.setTimeout("SourceLevelAdjustmentTimer()", sourceLevelAdjustmentTimerInterval);
    }
    else {
        sourceLevelAdjustmentTimerID = null;
    }
}
