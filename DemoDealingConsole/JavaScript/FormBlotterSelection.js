var vsflexGrid;
var quotationFrm;
var blotterSelectionGridColKey;
var blotterSelectionGridLanguage;
var initTimeOutId = null;
var returnObject = null;

function Init() {
    initTimeOutId = window.setTimeout(InitTimeOut, 10);
}

function InitTimeOut() {
    if (initTimeOutId) { window.clearTimeout(initTimeOutId); initTimeOutId = null; }

    GridInit();
    Query();
}

function GridInit() {
    vsflexGrid.Redraw = false;
    with (vsflexGrid) {
        Cols = 3;
        Rows = 1;
        FixedRows = 1;
        FixedCols = 0;

        var parameter = quotationFrm.oDealingConsole.InitGrid(vsflexGrid, quotationFrm.optionGrid.BlotterSelectionGrid, blotterSelectionGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForBlotterSelection(vsflexGrid, blotterSelectionGridColKey);

        ColDataType(ColIndex(blotterSelectionGridColKey.Select)) = flexDTBoolean;
        ColAlignment(ColIndex(blotterSelectionGridColKey.Code)) = flexAlignLeftCenter;

        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSortAndMove; // flexExMove;
        SelectionMode = flexSelectionByRow;
        OutlineBar = flexOutlineBarComplete;
        Editable = flexEDNone;
        Ellipsis = flexEllipsisEnd;
    }
    vsflexGrid.Redraw = true;
}

function GridColumnsDefaultFormatForBlotterSelection(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.Select)) = 700;
        ColWidth(ColIndex(gridColKey.Code)) = 1000;
    }
}

function BlotterSelectionGrid_BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    switch (vsflexGrid.ColKey(newCol)) {
        case blotterSelectionGridColKey.Select:
            vsflexGrid.Editable = flexEDKbdMouse;
            break;
        default:
            vsflexGrid.Editable = flexEDNone;
            break;
    }
}

function FillRow(vsflexGrid, line, id, code, select) {
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(blotterSelectionGridColKey.Id)) = id;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(blotterSelectionGridColKey.Code)) = code;
    vsflexGrid.Cell(flexcpChecked, line, vsflexGrid.ColIndex(blotterSelectionGridColKey.Select)) = select ? flexChecked : flexUnchecked;
    vsflexGrid.RowData(line) = code;
}

//#region Update Item
function GetDataRootInDataSetXml(xmlDoc) {
    if (!xmlDoc) return null;

    var node = null;
    var nodes = xmlDoc.getElementsByTagName("NewDataSet")
    if (nodes) {
        node = nodes[0];
    }
    return node;
}

var nullString = "<NULL>";
function FillGrid(xmlData) {
    vsflexGrid.Rows = vsflexGrid.FixedRows;
    var line = vsflexGrid.FixedRows;
    if (xmlData == null) return;
    var previousBlotterCodeSelecteds = GetPreviousBlotterCodeSelecteds();

    vsflexGrid.Redraw = false;
    vsflexGrid.MousePointer = flexHourglass;

    vsflexGrid.Rows++;
    var select = InStringArray(null, previousBlotterCodeSelecteds);
    FillRow(vsflexGrid, line, "00000000-0000-0000-0000-000000000000", nullString, select);
    line++;

    var xmlRows = xmlData.childNodes;
    var length = xmlRows.length;
    vsflexGrid.Rows += length;
    for (var i = 0; i < length; i++) {
        var xmlRow = xmlRows.item(i);
        var xmlRowColumns = xmlRow.childNodes;
        var id = null;
        var code = null;
        for (var j = 0, jLength = xmlRowColumns.length; j < jLength; j++) {
            var column = xmlRowColumns.item(j);
            var fieldName = column.tagName;
            var value = column.text;
            switch (fieldName) {
                case "ID":
                    id = value;
                    break;
                case "Code":
                    code = value;
                    break;
            }
        }
        if (id != null) {
            select = InStringArray(code, previousBlotterCodeSelecteds);
            FillRow(vsflexGrid, line, id, code, select);
            line++;
        }
    }
    vsflexGrid.MousePointer = flexDefault;
    vsflexGrid.Redraw = true;
}
//#endregion Update Item

function Query() {    
    var listCallID = window.dialogArguments.service.service.callService(GetBlotterListResult, "GetBlotterList");
}

function GetBlotterListResult(result) {
    if (result.error) {
        alert("Failed to get data!");
    }
    else {
        if (result.value) {
            var xmlDoc = new ActiveXObject("MsXml.DOMDocument");
            xmlDoc.async = false;
            var succeed = xmlDoc.loadXML(result.value);
            if (!succeed) {
                alert(xmlDoc.parseError.reason);
            }
            else {
                var xmlData = GetDataRootInDataSetXml(xmlDoc);
                FillGrid(xmlData);
            }
            xmlDoc = null;
        }
    }
}

function SelectAllButton_Click() {
    for (var line = vsflexGrid.FixedRows; line < vsflexGrid.Rows; line++) {
        vsflexGrid.Cell(flexcpChecked, line, vsflexGrid.ColIndex(blotterSelectionGridColKey.Select)) = flexChecked;
    }
}

function ClearAllButton_Click() {
    for (var line = vsflexGrid.FixedRows; line < vsflexGrid.Rows; line++) {
        vsflexGrid.Cell(flexcpChecked, line, vsflexGrid.ColIndex(blotterSelectionGridColKey.Select)) = flexUnchecked;
    }
}

function OkButton_Click() {
    var blotterCodeSelecteds = new Array();
    for (var line = vsflexGrid.FixedRows; line < vsflexGrid.Rows; line++) {
        if (vsflexGrid.Cell(flexcpChecked, line, vsflexGrid.ColIndex(blotterSelectionGridColKey.Select)) == flexChecked) {
            var code = vsflexGrid.RowData(line);
            code = code == nullString ? null : code;
            blotterCodeSelecteds.push(code);
        }
    }
    returnObject.returnValue = blotterCodeSelecteds;
    returnObject.confirm = true;
    returnValue = returnObject;
    window.close();
}

function CancelButton_Click() {
    returnObject.returnValue = null;
    returnObject.confirm = false;
    returnValue = returnObject;
    window.close();
}

function GetQuotationFrm() {
    return window.dialogArguments.quotationFrm;
}

function GetPreviousBlotterCodeSelecteds() {
    return window.dialogArguments.blotterCodeSelecteds;
}

function BlotterSelectionForm_Onload() {
    returnObject = new Object();
    returnObject.returnValue = null;
    returnObject.confirm = false;
    returnValue = returnObject;

    vsflexGrid = window._BlotterSelectionGrid;
    quotationFrm = GetQuotationFrm();
    blotterSelectionGridColKey = quotationFrm.blotterSelectionGridColKey;
    blotterSelectionGridLanguage = quotationFrm.blotterSelectionGridLanguage;

    Init();
}

function BlotterSelectionForm_Onunload() {

}