var getOpenInterestComplete = false;
//var summaryInitTimeOutID = null;
function OpenInterestSummaryInit() {
    OpenInterestSummaryGridInit();
//    summaryInitTimeOutID = window.setTimeout(SummaryInitTimeOut, 10); 
}

//function SummaryInitTimeOut() {
//    if (summaryInitTimeOutID) { window.clearTimeout(summaryInitTimeOutID); summaryInitTimeOutID = null; }
//    OnResetSummary();
//}

function OpenInterestSummaryGridInit() {
    _OpenInterestSummaryGrid.Redraw = false;
    with (_OpenInterestSummaryGrid) {
        Cols = 13;
        Rows = 1;
        FixedRows = 1;
        FixedCols = 0;

        var quotationFrm = GetQuotationFrm();
        var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
        var interestSummaryGridLanguage = quotationFrm.interestSummaryGridLanguage;

        var parameter = quotationFrm.oDealingConsole.InitGrid(window._OpenInterestSummaryGrid, quotationFrm.optionGrid.InterestSummaryGrid, interestSummaryGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForOpenInterestSummary(window._OpenInterestSummaryGrid, interestSummaryGridColKey);

        ColDataType(ColIndex(interestSummaryGridColKey.Exclude)) = flexDTBoolean;
        FrozenCols = 1;        
        ColAlignment(ColIndex(interestSummaryGridColKey.Code)) = flexAlignLeftCenter;

        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSortAndMove; // flexExMove;
        SelectionMode = flexSelectionByRow;
        OutlineBar = flexOutlineBarComplete;
        Editable = flexEDNone;
        Ellipsis = flexEllipsisEnd;
    }
    _OpenInterestSummaryGrid.Redraw = true;
}

function GridColumnsDefaultFormatForOpenInterestSummary(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.Code)) = 2500;
        ColWidth(ColIndex(gridColKey.SellLot)) = 1000;
        ColWidth(ColIndex(gridColKey.SellAvgPrice)) = 1500;
        ColWidth(ColIndex(gridColKey.SellContractSize)) = 1500;
        ColWidth(ColIndex(gridColKey.BuyLot)) = 1000;
        ColWidth(ColIndex(gridColKey.BuyAvgPrice)) = 1500;
        ColWidth(ColIndex(gridColKey.BuyContractSize)) = 1500;
        ColWidth(ColIndex(gridColKey.NetLot)) = 1000;
        ColWidth(ColIndex(gridColKey.NetAvgPrice)) = 1500;
        ColWidth(ColIndex(gridColKey.NetContractSize)) = 1500;
    }
}

function IsSelectOriginCode() {
    return window._SelectOriginCodeCheckbox.checked;
}

//function RefreshInstrumentSummary_OnClick() {
//    GetQuotationFrm().oDealingConsole.setInstrumentComboString();
//    OnResetSummary();
//}

function SelectEitherCodeOrOrignCodeCheckboxOnclick() {
//    RefreshInstrumentSummary_OnClick();
}

//function OnResetSummary() {
//    window._OpenInterestSummaryInstrumentSelectGrid.Redraw = false;
//    selectGridInit(window._OpenInterestSummaryInstrumentSelectGrid);
//    window._OpenInterestSummaryInstrumentSelectGrid.ColComboList(0) = GetQuotationFrm().oDealingConsole.getInstrumentComboString(false, "All", IsSelectOriginCode());
//    //window._OpenInterestSummaryInstrumentSelectGrid.focus();
//    window._OpenInterestSummaryInstrumentSelectGrid.select(0, 0);
//    window._OpenInterestSummaryInstrumentSelectGrid.Redraw = true;
//}

function PrintSummary() {
    try {
        if (window._OpenInterestSummaryGrid) {
            //window._OpenInterestSummaryGrid.PrintGrid();
            window._OpenInterestSummaryGrid.PrintGrid("", true, 0, 0, 0);
        }
    }
    catch (e) {
        alert("Printer's I/O was error! please check your printer.");
    }
}

function OpenInterestSummaryGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;
    if (newRow < vsflexGrid.FixedRows || newCol < vsflexGrid.FixedCols) return;

    switch (vsflexGrid.ColKey(newCol)) {
        case interestSummaryGridColKey.Exclude:
            var summaryItem = vsflexGrid.RowData(newRow);
            if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account
                || summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Group) {
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

function OpenInterestSummaryGrid_DblClick() {
    var collapse = Collapse();
    if (collapse) return;

    ShowAccountStatus(false);
}

function ShowAccountStatus(mustShow)
{
    var vsflexGrid = window._OpenInterestSummaryGrid;

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
        var summaryItem = vsflexGrid.RowData(vsflexGrid.Row);
        if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account) {
            transferObject.accountId = summaryItem.id;
            transferObject.accountCode = summaryItem.code;
            mustShow = true;
        }
    }
    if (mustShow) {
        window.showModalDialog("AccountStatusFrames.aspx", transferObject, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:1200px;dialogHeight:600px");
    }
}

function OpenInterestSummaryGrid_OnAfterEdit(row, col, cancel) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;
    var summaryItem = vsflexGrid.RowData(row);
    if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account
        || summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Group) {
        var exclude = vsflexGrid.Cell(flexcpChecked, row, vsflexGrid.ColIndex(interestSummaryGridColKey.Exclude)) == flexChecked;
        if (summaryItem.exclude != exclude) {
            //Data process
            summaryItem.exclude = exclude;
            if (!exclude && summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account) {
                summaryItem.parentSummaryItem.exclude = exclude;
            }
            UpdateSummary(summaryItem);

            summaryItem.setExclude(exclude);
            if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Group) {
                summaryItem.reset();
                if (!exclude) UpdateSummaryRecalculateFromGroupToRoot(summaryItem);
            }

            //Refresh Grid
            var instrumentSummaryItem;
            if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Group) {
                instrumentSummaryItem = summaryItem.parentSummaryItem;
            }
            else {
                instrumentSummaryItem = summaryItem.parentSummaryItem.parentSummaryItem;
            }
            RefreshSummaryGrid(instrumentSummaryItem, summaryItem);
            RefreshGridChildSummaryItemExclude(summaryItem, exclude);
        }
    }
}

var sortedColKey = "Code";
var sortedOrder = "ASC";
function CompareGridSort(objA, objB) {
    var objASortValue = null;
    var objBSortValue = null;
    switch (sortedColKey) {
        case "Code":
            objASortValue = objA.code;
            objBSortValue = objB.code;
            break;
        case "SellLot":
            objASortValue = objA.sellLot;
            objBSortValue = objB.sellLot;
            break;
        case "SellAvgPrice":
            objASortValue = objA.avgSellPrice;
            objBSortValue = objB.avgSellPrice;
            break;
        case "SellContractSize":
            objASortValue = objA.sellContractSize;
            objBSortValue = objB.sellContractSize;
            break;
        case "BuyLot":
            objASortValue = objA.buyLot;
            objBSortValue = objB.buyLot;
            break;
        case "BuyAvgPrice":
            objASortValue = objA.avgBuyPrice;
            objBSortValue = objB.avgBuyPrice;
            break;
        case "BuyContractSize":
            objASortValue = objA.buyContractSize;
            objBSortValue = objB.buyContractSize;
            break;
        case "NetLot":
            objASortValue = objA.netLot;
            objBSortValue = objB.netLot;
            break;
        case "NetAvgPrice":
            objASortValue = objA.avgNetPrice;
            objBSortValue = objB.avgNetPrice;
            break;
        case "NetContractSize":
            objASortValue = objA.netContractSize;
            objBSortValue = objB.netContractSize;
            break;
        case "Exclude":
            objASortValue = objA.exclude;
            objBSortValue = objB.exclude;
            break;
    }

    if (objASortValue == null && objBSortValue == null) return 0;
    if (objASortValue == null) return sortedOrder == "ASC" ? -1 : 1;
    if (objBSortValue == null) return sortedOrder == "ASC" ? 1 : -1;
    if (objASortValue > objBSortValue) {
        return sortedOrder == "ASC" ? 1 : -1;
    }
    else if (objASortValue < objBSortValue) {
        return sortedOrder == "ASC" ? -1 : 1;
    }
    else {
        return 0;
    }
}

function OpenInterestSummaryGrid_BeforeSort(col, order) {
    //if (window.document.all._OrderOutlineRadio.checked) return;
    if (window.document.all._OutlineSelect.selectedIndex == 3) return;

    var vsflexGrid = window._OpenInterestSummaryGrid;
    if (col < vsflexGrid.FixedCols) return;

    sortedColKey = vsflexGrid.ColKey(col);
    sortedOrder = (order == 1) ? "ASC" : "DESC";

    vsflexGrid.Redraw = false;
    FillAllDataToSummaryGrid();
    vsflexGrid.Redraw = true;
}

function OpenInterestSummaryGrid_AfterCollapse(row, state) {
    //if (state != 0) return;
    if (getOpenInterestComplete) {
        var vsflexGrid = window._OpenInterestSummaryGrid;
        if (row >= vsflexGrid.FixedRows) {
            var summaryItem = vsflexGrid.RowData(row);
            summaryItem.setIsCollapsed(state == 0 ? flexOutlineExpanded : flexOutlineCollapsed);
            if (state != 0) return;
            if (summaryItem.isGotNextData) return;
            if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Instrument) {
                QuerySummaryByInstrument(null, false, summaryItem.id);
            }
            else if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account) {
                getAccountOpenOrders(row);
            }
        }
    }
}

function OpenInterestSummaryGrid_KeyDown(keyCode, shift) {
    if (keyCode == 13) {
        Collapse();
    }
    return (false);
}

function Collapse() {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;

    with (vsflexGrid) {
        if (Col < FixedCols) return false;
        if (Row < FixedRows) return false;
        if (Col == ColIndex(interestSummaryGridColKey.Code)) {
            var summaryItem = RowData(row);
            if (IsCollapsed(Row) == flexOutlineCollapsed) {
                IsCollapsed(Row) = flexOutlineExpanded;                
                summaryItem.setIsCollapsed(flexOutlineExpanded);
            }
            else {
                IsCollapsed(Row) = flexOutlineCollapsed;
                summaryItem.setIsCollapsed(flexOutlineCollapsed);
            }
            return true;
        }
        else if (Col == ColIndex(interestSummaryGridColKey.Exclude)) {
            return true;
        }
    }
    return false;
}

var blotterCodeSelectedsForSummary = null;
var blotterCodeSelectedsForSummaryTemp = null;
function ShowBlotterSelectionSummaryButton_Onclick() {
    var args = new Object();
    args.quotationFrm = GetQuotationFrm();
    args.blotterCodeSelecteds = blotterCodeSelectedsForSummaryTemp;// blotterCodeSelectedsForSummary;
    args.service = Service;
    var returnObject = window.showModalDialog("BlotterSelection.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:300px;dialogHeight:300px");
    if (returnObject.confirm) {
        blotterCodeSelectedsForSummaryTemp = returnObject.returnValue;
    }
}

var summaryTimeOutID = null;
var summaryCallID = null;
var listCalls = new ActiveXObject("Scripting.Dictionary");
function QuerySummary() {
    getOpenInterestComplete = false;
    window._OpenInterestSummaryGrid.Rows = window._OpenInterestSummaryGrid.FixedRows;

    Service.useService("Service.asmx?WSDL", "service");
    var listCallID = Service.service.callService(GetOpenInterestInstrumentSummaryResult, "GetOpenInterestInstrumentSummary", IsSelectOriginCode(), blotterCodeSelectedsForSummaryTemp);
    var oParameters = new Object();
    oParameters.blotterCodeSelectedsForSummaryTemp = blotterCodeSelectedsForSummaryTemp;
    oParameters.isSelectOriginCode = IsSelectOriginCode();
    listCalls.Add(listCallID, oParameters);

    window.btnQuerySummary.disabled = true;
    summaryTimeOutID = window.setTimeout(SummaryTimeOut, 5000);

    function SummaryTimeOut() {
        window.btnQuerySummary.disabled = false;
        if (summaryTimeOutID) { window.clearTimeout(summaryTimeOutID); }
    }
}

function GetOpenInterestInstrumentSummaryResult(result) {
    var oParameters = listCalls.Item(result.id);
    var blotterCodeSelectedsForSummaryTemp2 = oParameters.blotterCodeSelectedsForSummaryTemp;
    var isSelectOriginCode = oParameters.isSelectOriginCode;
    listCalls.Remove(result.id);

    if (isSelectOriginCode != IsSelectOriginCode()) return;
    window.btnQuerySummary.disabled = false;
    if (summaryTimeOutID) { window.clearTimeout(summaryTimeOutID); }

    if (result.error) {
        alert("Failed to get open interest instrument summary data!");
    }
    else {
        blotterCodeSelectedsForSummary = blotterCodeSelectedsForSummaryTemp2;
        FillOpenInterestInstrumentSummaryData(result.value);
        _OpenInterestSummaryGrid.Redraw = false;
        _OpenInterestSummaryGrid.MousePointer = flexHourglass;
        try {
            FillInstrumentDataToSummaryGrid();
        }
        catch (e) {
            alert("Failed to Fill instrument Summary Grid!");
        }
        finally {
            _OpenInterestSummaryGrid.MousePointer = flexDefault;
            _OpenInterestSummaryGrid.Redraw = true;
        }
    }
    getOpenInterestComplete = true;
}

var _OpenInterestSummaryGettings = new ActiveXObject("Scripting.Dictionary"); //key=id value=null
function QuerySummaryByInstrument(accountIDs, isModify, instrumentSelected) {
    if (!getOpenInterestComplete) return;
//    getOpenInterestComplete = false;
//    window._OpenInterestSummaryGrid.Rows = window._OpenInterestSummaryGrid.FixedRows;

//    var instrumentSelected = window._OpenInterestSummaryInstrumentSelectGrid.Cell(flexcpText, 0, 0);
//    if (instrumentSelected == null || instrumentSelected == "") {
//        alert("Please select Instrument to query.");
//        return;
//    }
    var instrumentIDs = GetQuotationFrm().oDealingConsole.getInstrumentIdsForOpenInterestSummary(instrumentSelected, IsSelectOriginCode());
    if (instrumentIDs == null || instrumentIDs.length <= 0) {
        alert("Instrument is not exists.");
        return;
    }

//    if (instrumentSelected == "All") {
//        //.....
//        return;
//    }
//    else {

        if (_OpenInterestSummaryGettings.Exists(instrumentSelected)) {
            return;
        }
        else {
            if (!isModify) {
                _OpenInterestSummaryGettings.Add(instrumentSelected, instrumentSelected);
            }
        }

        Service.useService("Service.asmx?WSDL", "service");
        var listCallID = Service.service.callService(GetOpenInterestSummaryResult, "GetOpenInterestSummary", accountIDs, instrumentIDs, blotterCodeSelectedsForSummaryTemp);
        var oParameters = new Object();
        oParameters.instrumentSelected = instrumentSelected;
        oParameters.accountIDs = accountIDs;
        oParameters.blotterCodeSelectedsForSummaryTemp = blotterCodeSelectedsForSummaryTemp;
        oParameters.isModify = isModify;
        oParameters.isSelectOriginCode = IsSelectOriginCode();
        listCalls.Add(listCallID, oParameters);
//    }

//    window.btnQuerySummary.disabled = true;
//    summaryTimeOutID = window.setTimeout(SummaryTimeOut, 5000);

//    function SummaryTimeOut() {
//        window.btnQuerySummary.disabled = false;
//        if (summaryTimeOutID) { window.clearTimeout(summaryTimeOutID); }
//    }
}

function GetOpenInterestSummaryResult(result) {
    var oParameters = listCalls.Item(result.id);
    var instrumentSelected = oParameters.instrumentSelected;
    var accountIDs = oParameters.accountIDs;
    var blotterCodeSelectedsForSummaryTemp2 = oParameters.blotterCodeSelectedsForSummaryTemp;
    var isModify = oParameters.isModify;
    var isSelectOriginCode = oParameters.isSelectOriginCode;
    listCalls.Remove(result.id);
    
    if (_OpenInterestSummaryGettings.Exists(instrumentSelected)) {
        _OpenInterestSummaryGettings.Remove(instrumentSelected);
    }

    if (isSelectOriginCode != IsSelectOriginCode()) return;
    window.btnQuerySummary.disabled = false;
    //if (window._OpenInterestSummaryInstrumentSelectGrid.Cell(flexcpText, 0, 0) != instrumentSelected) return;
    
    if (summaryTimeOutID) { window.clearTimeout(summaryTimeOutID); }
    if (result.error) {
        alert("Failed to get open interest summary data!");
    }
    else {
//        blotterCodeSelectedsForSummary = blotterCodeSelectedsForSummaryTemp;
        FillOpenInterestSummaryData(result.value, accountIDs, isModify, instrumentSelected);
        _OpenInterestSummaryGrid.Redraw = false;
        _OpenInterestSummaryGrid.MousePointer = flexHourglass;
        try {
            if (instrumentSelected != null && _InstrumentSummaryItems.Exists(instrumentSelected)) {
                var instrumentSummaryItem = _InstrumentSummaryItems.Item(instrumentSelected);
                FillDataToSummaryGrid(instrumentSummaryItem);
                SetOutline(false);
            }
            else {
                FillAllDataToSummaryGrid();
            }
        }
        catch (e) {
            alert("Failed to Fill Summary Grid!");
        }
        finally {
            _OpenInterestSummaryGrid.MousePointer = flexDefault;
            _OpenInterestSummaryGrid.Redraw = true;
        }
    }
//    getOpenInterestComplete = true;
}

function getAccountOpenOrders(row) {
    if (getOpenInterestComplete) {
        var vsflexGrid = window._OpenInterestSummaryGrid;
        if (row > vsflexGrid.FixedRows) {
            var summaryItem = vsflexGrid.RowData(row);
            if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account) {
                //if (!summaryItem.isGotNextData){
                if (summaryItem.childSummaryItems.Count <= 0) {
                    //var instrumentSelected = window._OpenInterestSummaryInstrumentSelectGrid.Cell(flexcpText, 0, 0);
                    var instrumentSelected = summaryItem.parentSummaryItem.parentSummaryItem.id;
                    var instrumentIDs = GetQuotationFrm().oDealingConsole.getInstrumentIdsForOpenInterestSummary(instrumentSelected, IsSelectOriginCode());
                    if (instrumentIDs == null || instrumentIDs.length <= 0) {
//                        alert("Please select Instrument to query.");
                        return;
                    }

                    var accountId = summaryItem.id;
                    Service.useService("Service.asmx?WSDL", "service");
                    var listCallID = Service.service.callService(GetOpenInterestSummaryOrderListResult, "GetOpenInterestSummaryOrderList", accountId, instrumentIDs, blotterCodeSelectedsForSummary);
                    var oParameters = new Object();
                    oParameters.instrumentSelected = instrumentSelected;
                    oParameters.accountSummaryItem = summaryItem;
                    oParameters.isSelectOriginCode = IsSelectOriginCode();
                    listCalls.Add(listCallID, oParameters);
                }
            }
        }
    }
}

function GetOpenInterestSummaryOrderListResult(result) {
    var oParameters = listCalls.Item(result.id);
    var instrumentSelected = oParameters.instrumentSelected;
    var accountSummaryItem = oParameters.accountSummaryItem;
    var isSelectOriginCode = oParameters.isSelectOriginCode;
    listCalls.Remove(result.id);
    //if (window._OpenInterestSummaryInstrumentSelectGrid.Cell(flexcpText, 0, 0) != instrumentSelected) return;
    if (isSelectOriginCode != IsSelectOriginCode()) return;
    
    if (result.error) {
        alert("Failed to get order data!");
    }
    else {
        FillOpenInterestSummaryOrderListData(accountSummaryItem, result.value);
        _OpenInterestSummaryGrid.Redraw = false;
        _OpenInterestSummaryGrid.MousePointer = flexHourglass;
        try {
            FillOrderListDataToSummaryGrid(accountSummaryItem);
        }
        catch (e)
        { }
        _OpenInterestSummaryGrid.MousePointer = flexDefault;
        _OpenInterestSummaryGrid.Redraw = true;
    }
}

//#region Update Summary Item Grid
function RefreshSummaryGrid(instrumentSummaryItem, summaryItem) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;

    if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account) {
        //Account
        var findRow = vsflexGrid.FindRow(summaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow > 0) {
            FillRow(vsflexGrid, findRow, summaryItem, interestSummaryGridColKey);
        }
        //Account Group
        findRow = vsflexGrid.FindRow(summaryItem.parentSummaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow > 0) {
            FillRow(vsflexGrid, findRow, summaryItem.parentSummaryItem, interestSummaryGridColKey);
        }
    }
    else if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Group) {
        //Account Group
        var findRow = vsflexGrid.FindRow(summaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow > 0) {
            FillRow(vsflexGrid, findRow, summaryItem, interestSummaryGridColKey);
        }
    }
    //instrumentSummaryItem
    var findRow = vsflexGrid.FindRow(instrumentSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
    if (findRow > 0) {
        FillRow(vsflexGrid, findRow, instrumentSummaryItem, interestSummaryGridColKey);
    }
}
function FillAllDataToSummaryGrid() {
    var vsflexGrid = window._OpenInterestSummaryGrid;
    vsflexGrid.Rows = vsflexGrid.FixedRows;
    var count = _InstrumentSummaryItems.Count;
    if (count <= 0) return;
    var instrumentSummaryItems = (new VBArray(_InstrumentSummaryItems.Items())).toArray();
    if (window.document.all._OutlineSelect.selectedIndex == 0) {
        instrumentSummaryItems = instrumentSummaryItems.sort(CompareGridSort);
    }
    for (var index = 0; index < count; index++) {
        FillDataToSummaryGrid(instrumentSummaryItems[index]);
    }
    SetOutline(false);
}

function FillDataToSummaryGrid(instrumentSummaryItem) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;

    //var line = vsflexGrid.FixedRows - 1;
    var line = vsflexGrid.Rows - 1;

    var findRow = vsflexGrid.FindRow(instrumentSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
    if (findRow > 0) {
        line = findRow;
        FillRow(vsflexGrid, line, instrumentSummaryItem, interestSummaryGridColKey);
    }
    else {
        //Summary
        //vsflexGrid.Rows = vsflexGrid.FixedRows + 1;
        //vsflexGrid.Rows += 1;
        vsflexGrid.AddItem("", line + 1);
        line++;
        FillRow(vsflexGrid, line, instrumentSummaryItem, interestSummaryGridColKey);
        vsflexGrid.Cell(flexcpFontBold, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
        vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightyellow;
        //vsflexGrid.FrozenRows = line;

        vsflexGrid.IsSubtotal(line) = true;
        vsflexGrid.RowOutlineLevel(line) = 0;

        if (!instrumentSummaryItem.isGotNextData) {
            line++;
            vsflexGrid.AddItem("", line);
            FillRow(vsflexGrid, line, instrumentSummaryItem.getEmptySummaryItem(instrumentSummaryItem.id), interestSummaryGridColKey);
            vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(interestSummaryGridColKey.Code)) = color_red;
            //        vsflexGrid.IsCollapsed(line) = flexOutlineCollapsed; // flexOutlineExpanded;
        }
    }    

    //Account Group
    var accountGroupSummarys = instrumentSummaryItem.childSummaryItems;
    var accountGroupSummarys2 = (new VBArray(accountGroupSummarys.Items())).toArray();
    //if (window.document.all._AccountGroupOutlineRadio.checked) {
    if (window.document.all._OutlineSelect.selectedIndex == 1) {
        accountGroupSummarys2 = accountGroupSummarys2.sort(CompareGridSort);
    }
    var instrumentSummaryItemLine = line;
    var count = accountGroupSummarys2.length;
    if (count > 0) {
        //vsflexGrid.Rows += count;
        for (var index = 0; index < count; index++) {
            var accountGroupSummaryItem = accountGroupSummarys2[index];
            var findRow = vsflexGrid.FindRow(accountGroupSummaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
            if (findRow <= 0) {
//                vsflexGrid.AddItem("", line + 1);
//                line++;
                vsflexGrid.AddItem("", instrumentSummaryItemLine + 1);
                line = instrumentSummaryItemLine + 1;
            }
            else {
                line = findRow;
            }
            FillRow(vsflexGrid, line, accountGroupSummaryItem, interestSummaryGridColKey);
            vsflexGrid.Cell(flexcpFontBold, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
            vsflexGrid.Cell(flexcpFontItalic, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
            vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightblue;

            vsflexGrid.IsSubtotal(line) = true;
            vsflexGrid.RowOutlineLevel(line) = 1;

            //Account
            var accountSummaryItemDetails = (new VBArray(accountGroupSummaryItem.childSummaryItems.Items())).toArray();
            //if (window.document.all._AccountOutlineRadio.checked) {
            if (window.document.all._OutlineSelect.selectedIndex == 2) {
                accountSummaryItemDetails = accountSummaryItemDetails.sort(CompareGridSort);
            }
            var accountGroupSummaryItemLine = line;
            var count2 = accountSummaryItemDetails.length;
            if (count2 > 0) {
                //vsflexGrid.Rows += count2;
                for (var index2 = 0; index2 < count2; index2++) {
                    var accountSummaryItem = accountSummaryItemDetails[index2];
                    var findRow = vsflexGrid.FindRow(accountSummaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
                    if (findRow <= 0) {
//                        vsflexGrid.AddItem("", line + 1);
//                        line++;
                        vsflexGrid.AddItem("", accountGroupSummaryItemLine + 1);
                        line = accountGroupSummaryItemLine + 1;
                    }
                    else {
                        line = findRow;
                    }
                    FillRow(vsflexGrid, line, accountSummaryItem, interestSummaryGridColKey);
                    vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightcyan;

                    vsflexGrid.IsSubtotal(line) = true;
                    vsflexGrid.RowOutlineLevel(line) = 2;

                    if (accountSummaryItem.isGotNextData) {
                        //remove empty node
                        if (line + 1 < vsflexGrid.Rows) {
                            var summaryItem = vsflexGrid.RowData(line + 1);
                            if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Empty) {
                                vsflexGrid.RemoveItem(line + 1);
                            }
                        }
                        //var accountSummaryItemOutline = vsflexGrid.IsCollapsed(line);
                        var accountSummaryItemOutline = GetFinallyOutline(accountSummaryItem);
                        FillOrderSummaryItem(vsflexGrid, interestSummaryGridColKey, accountSummaryItem, accountSummaryItemOutline, line);
                    }
                    else {
                        if (findRow <= 0) {
                            vsflexGrid.AddItem("", line + 1);
                            line++;
                            FillRow(vsflexGrid, line, accountSummaryItem.getEmptySummaryItem(instrumentSummaryItem.id), interestSummaryGridColKey);
                            vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(interestSummaryGridColKey.Code)) = color_red;                            
                            vsflexGrid.IsCollapsed(line) = flexOutlineCollapsed; // flexOutlineExpanded;
                            accountSummaryItem.setIsCollapsed(flexOutlineCollapsed);
                        }
                    }
                }
            }
        }
        //vsflexGrid.Outline(GetOutline());
    }
    if (vsflexGrid.Rows > vsflexGrid.FixedRows) {
        vsflexGrid.Cell(flexcpForeColor, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.SellLot), vsflexGrid.Rows - 1, vsflexGrid.ColIndex(interestSummaryGridColKey.SellLot)) = color_red;
        vsflexGrid.Cell(flexcpForeColor, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyLot), vsflexGrid.Rows - 1, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyLot)) = color_blue;
    }
}

function OutlineSelect_Onclick() {
    var selectedIndex = window.document.all._OutlineSelect.selectedIndex;
    //Instrument
    if (selectedIndex == 0) {
        window._OpenInterestSummaryGrid.Outline(0);
    }
    //Account Group
    else if (selectedIndex == 1) {
        window._OpenInterestSummaryGrid.Outline(1);
    }
    //Account
    else if (selectedIndex == 2) {
        window._OpenInterestSummaryGrid.Outline(2);
    }
    //Order
//    else { 
//        
    //    }
    var vsflexGrid = window._OpenInterestSummaryGrid;
    vsflexGrid.Redraw = false;
    SetOutline(false);
    vsflexGrid.Redraw = true;
}

function SetOutline(needCollapsed) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;

    for (var index = vsflexGrid.FixedRows,count=vsflexGrid.Rows; index < count; index++) {
        var summaryItem = vsflexGrid.RowData(index);
        if (!summaryItem.isGotNextData && summaryItem.openInterestSummaryCategory != OpenInterestSummaryCategory.Group && summaryItem.openInterestSummaryCategory != OpenInterestSummaryCategory.Order) {
            vsflexGrid.IsCollapsed(index) = flexOutlineCollapsed;
            summaryItem.setIsCollapsed(flexOutlineCollapsed);
        }
        else {
            var summaryItemOutline = GetFinallyOutline(summaryItem);
            //alert("count: " + count + ";" + summaryItem.code + ": " + summaryItemOutline);
            vsflexGrid.IsCollapsed(index) = summaryItemOutline;
        }
    }


//    //vsflexGrid.IsCollapsed(line) = flexOutlineCollapsed; // flexOutlineExpanded;
//    var count = _InstrumentSummaryItems.Count;
//    if (count <= 0) return;
//    var instrumentSummaryItems = (new VBArray(_InstrumentSummaryItems.Items())).toArray();
//    for (var index = 0; index < count; index++) {
//        var instrumentSummaryItem = instrumentSummaryItems[index];
//        var findRow = vsflexGrid.FindRow(instrumentSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
//        if (findRow > 0) {

////            var instrumentSummaryItemOutline = GetFinallyOutline(instrumentSummaryItem);
//            //            vsflexGrid.IsCollapsed(findRow) = instrumentSummaryItemOutline;

//        if (!instrumentSummaryItem.isGotNextData || needCollapsed) {
//            vsflexGrid.IsCollapsed(findRow) = flexOutlineCollapsed;
//            instrumentSummaryItem.setIsCollapsed(flexOutlineCollapsed);
//        }
//        else {
//            var instrumentSummaryItemOutline = GetFinallyOutline(instrumentSummaryItem);
//            alert(instrumentSummaryItemOutline);
//            vsflexGrid.IsCollapsed(findRow) = instrumentSummaryItemOutline;
//        }

//            //vsflexGrid.IsCollapsed(findRow) = (!instrumentSummaryItem.isGotNextData) ? flexOutlineCollapsed : flexOutlineExpanded;
////            vsflexGrid.IsCollapsed(findRow) = flexOutlineCollapsed;
//        }
//    }

}

//function AccountGroupOutlineRadio_Onclick() {
//    window.document.all._AccountOutlineRadio.checked = false;
//    window.document.all._OrderOutlineRadio.checked = false;
//    window._OpenInterestSummaryGrid.Outline(1);
//}

//function AccountOutlineRadio_Onclick() {
//    window.document.all._AccountGroupOutlineRadio.checked = false;
//    window.document.all._OrderOutlineRadio.checked = false;
//    window._OpenInterestSummaryGrid.Outline(2);
//}

//function OrderOutlineRadio_Onclick() {
//    window.document.all._AccountOutlineRadio.checked = false;
//    window.document.all._AccountGroupOutlineRadio.checked = false;
//}

function GetOutline() {
    //return window.document.all._AccountGroupOutlineRadio.checked ? 1 : 2;
//    return window.document.all._OutlineSelect.selectedIndex == 0 ? 1 : 2;

    var selectedIndex = window.document.all._OutlineSelect.selectedIndex;
    //Instrument
    if (selectedIndex == 0) {
        return 0;
    }
    //Account Group
    else if (selectedIndex == 1) {
        return 1;
    }
    else {
        return 2;
    }
}

function FillOrderListDataToSummaryGrid(accountSummaryItem) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;
    var findRow = vsflexGrid.FindRow(accountSummaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
    if (findRow > 0) {
        //var accountSummaryItemOutline = vsflexGrid.IsCollapsed(findRow);
        var accountSummaryItemOutline = GetFinallyOutline(accountSummaryItem);
        var line = findRow;

        //remove empty node
        if (findRow + 1 < vsflexGrid.Rows) {
            var summaryItem = vsflexGrid.RowData(findRow + 1);
            if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Empty) {
                vsflexGrid.RemoveItem(findRow + 1);
            }
        }
        FillOrderSummaryItem(vsflexGrid, interestSummaryGridColKey, accountSummaryItem, accountSummaryItemOutline, findRow);

        //refresh upline grid
        var instrumentSummaryItem = accountSummaryItem.parentSummaryItem.parentSummaryItem;
        RefreshSummaryGrid(instrumentSummaryItem, accountSummaryItem);
        if (!accountSummaryItem.exclude) {
            RefreshSummaryGrid(instrumentSummaryItem, accountSummaryItem.parentSummaryItem);
            RefreshSummaryGrid(instrumentSummaryItem, instrumentSummaryItem);
        }
    }
}

function FillOrderSummaryItem(vsflexGrid, interestSummaryGridColKey, accountSummaryItem, accountSummaryItemOutline, accountSummaryItemRow) {
    var line = accountSummaryItemRow;
    var orderSummaryItems = (new VBArray(accountSummaryItem.childSummaryItems.Items())).toArray();
    var count3 = orderSummaryItems.length;
    if (count3 > 0) {
        for (var index3 = 0; index3 < count3; index3++) {
            var orderSummaryItem = orderSummaryItems[index3];
            var findRow = vsflexGrid.FindRow(orderSummaryItem.id, line, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
            if (findRow <= 0) {
                line++;
                vsflexGrid.AddItem("", line);
            }
            else {
                line = findRow;
            }
            FillRow(vsflexGrid, line, orderSummaryItem, interestSummaryGridColKey);
        }
        vsflexGrid.Cell(flexcpForeColor, accountSummaryItemRow + 1, vsflexGrid.ColIndex(interestSummaryGridColKey.SellLot), accountSummaryItemRow + count3, vsflexGrid.ColIndex(interestSummaryGridColKey.SellLot)) = color_red;
        vsflexGrid.Cell(flexcpForeColor, accountSummaryItemRow + 1, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyLot), accountSummaryItemRow + count3, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyLot)) = color_blue;
        vsflexGrid.IsCollapsed(line) = accountSummaryItemOutline; // accountSummaryItemOutline == flexOutlineExpanded ? flexOutlineExpanded : flexOutlineSubtotals;
        accountSummaryItem.setIsCollapsed(accountSummaryItemOutline);
    }
}

function FillRow(vsflexGrid, line, summaryItem, interestSummaryGridColKey) {
    var prefixEmpty = "";
    var quotationFrm = GetQuotationFrm();
    var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
    if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Instrument) {
        prefixEmpty = "";
    }
    else if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Group) {
        prefixEmpty = "  ";
    }
    else if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account) {
        prefixEmpty = "    ";
    }
    else if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Order) {
        prefixEmpty = "      ";
    }
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.Key)) = summaryItem.GetKey();
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.Id)) = summaryItem.id;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.Code)) = prefixEmpty + summaryItem.code;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.SellLot)) = summaryItem.sellLot == 0.0 ? "" : GetFormatLot2(summaryItem.sellLot, true, lotDecimal);
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.SellAvgPrice)) = summaryItem.avgSellPriceValue == 0.0000 ? "" : summaryItem.avgSellPrice;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.SellContractSize)) = summaryItem.sellContractSize == 0.0000 ? "" : summaryItem.sellContractSize;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyLot)) = summaryItem.buyLot == 0.0 ? "" : GetFormatLot2(summaryItem.buyLot, true, lotDecimal);
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyAvgPrice)) = summaryItem.avgBuyPriceValue == 0.0000 ? "" : summaryItem.avgBuyPrice;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyContractSize)) = summaryItem.buyContractSize == 0.0000 ? "" : summaryItem.buyContractSize;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.NetLot)) = summaryItem.netLot == 0.0 ? "" : GetFormatLot2(summaryItem.netLot, true, lotDecimal);
    vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(interestSummaryGridColKey.NetLot)) = summaryItem.netLot >= 0.00 ? color_blue : color_red;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.NetAvgPrice)) = summaryItem.avgNetPriceValue == 0.0000 ? "" : summaryItem.avgNetPrice;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(interestSummaryGridColKey.NetContractSize)) = summaryItem.netContractSize == 0.0000 ? "" : summaryItem.netContractSize;
    vsflexGrid.Cell(flexcpChecked, line, vsflexGrid.ColIndex(interestSummaryGridColKey.Exclude)) = summaryItem.exclude ? flexChecked : flexUnchecked;
    vsflexGrid.RowData(line) = summaryItem;
}
//#endregion Update Summary Item Grid

//#region Update Summary Item
var _InstrumentSummaryItems = new ActiveXObject("Scripting.Dictionary"); //key=id value=SummaryItem
function FillOpenInterestInstrumentSummaryData(msXml) {
    _InstrumentSummaryItems = new ActiveXObject("Scripting.Dictionary"); //key=id value=SummaryItem
    if (msXml == null) return;
    if (msXml.childNodes.length <= 0) return;
    var instrumentsNode = msXml.childNodes.item(0);
    for (var i = 0, iCount = instrumentsNode.childNodes.length; i < iCount; i++) {
        var instrumentNode = instrumentsNode.childNodes.item(i);
        var instrumentSummaryItem = new SummaryItem();
        instrumentSummaryItem.UpdateByXmlNode2(OpenInterestSummaryCategory.Instrument, instrumentNode);
        instrumentSummaryItem.instrumentSummaryItemId = instrumentSummaryItem.id;
        _InstrumentSummaryItems.Add(instrumentSummaryItem.id, instrumentSummaryItem);
    }
//    var quotationFrm = GetQuotationFrm();
//    //For instrumentSummaryItem: Set Avage price
//    instrumentSummaryItem.setAvagePrice(quotationFrm);
}

function FillInstrumentDataToSummaryGrid() {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;
    var line = vsflexGrid.FixedRows - 1;
    var count = _InstrumentSummaryItems.Count;
    vsflexGrid.Rows = vsflexGrid.FixedRows + count;
    var instrumentSummaryItems = (new VBArray(_InstrumentSummaryItems.Items())).toArray();
    for (var index = 0; index < count; index++) {
        var instrumentSummaryItem = instrumentSummaryItems[index];
        //Summary
        line++;
        FillRow(vsflexGrid, line, instrumentSummaryItem, interestSummaryGridColKey);
        vsflexGrid.Cell(flexcpFontBold, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
        vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightyellow;
//        vsflexGrid.FrozenRows = line;

        vsflexGrid.IsSubtotal(line) = true;
        vsflexGrid.RowOutlineLevel(line) = 0;

        line++;
        vsflexGrid.AddItem("", line);
        FillRow(vsflexGrid, line, instrumentSummaryItem.getEmptySummaryItem(instrumentSummaryItem.id), interestSummaryGridColKey);
        vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(interestSummaryGridColKey.Code)) = color_red;
        //vsflexGrid.IsCollapsed(line) = flexOutlineCollapsed; // flexOutlineExpanded;
    }
    vsflexGrid.Outline(0);
    //vsflexGrid.Outline(GetOutline()); //...
    if (vsflexGrid.Rows > vsflexGrid.FixedRows) {
        vsflexGrid.Cell(flexcpForeColor, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.SellLot), vsflexGrid.Rows - 1, vsflexGrid.ColIndex(interestSummaryGridColKey.SellLot)) = color_red;
        vsflexGrid.Cell(flexcpForeColor, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyLot), vsflexGrid.Rows - 1, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyLot)) = color_blue;
    }
}

//var _InstrumentSummaryItem = null;
//var _AccountGroupSummarys = null;
function FillOpenInterestSummaryData(msXml, accountIDs, isModify, instrumentKey) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;
    var instrumentSummaryItem = null;
    if (_InstrumentSummaryItems.Exists(instrumentKey)) {
        instrumentSummaryItem = _InstrumentSummaryItems.Item(instrumentKey);        
    }
    if (instrumentSummaryItem == null) return;
    instrumentSummaryItem.isGotNextData = true;
    var findRow = vsflexGrid.FindRow(instrumentSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
    if (findRow > 0) {
//        var instrumentSummaryItemOutline = vsflexGrid.IsCollapsed(findRow);
        var line = findRow;

        //remove empty node
        if (findRow + 1 < vsflexGrid.Rows) {
            var summaryItem = vsflexGrid.RowData(findRow + 1);
            if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Empty) {
                vsflexGrid.RemoveItem(findRow + 1);
            }
        }
        //FillOrderSummaryItem(vsflexGrid, interestSummaryGridColKey, accountSummaryItem, accountSummaryItemOutline, findRow);
    }

    var accountGroupSummarys = instrumentSummaryItem.childSummaryItems;
    if (!isModify || accountGroupSummarys.Count <= 0) {
        instrumentSummaryItem.reset();
        accountGroupSummarys = new ActiveXObject("Scripting.Dictionary"); //key=id value=SummaryItem
        instrumentSummaryItem.childSummaryItems = accountGroupSummarys;
    }
    else {
        if (accountIDs != null) {
            for (var i = 0, iCount = accountIDs.length; i < iCount; i++) {
                var accountID = accountIDs[i];
                var accountGroupSummarys2 = (new VBArray(accountGroupSummarys.Items())).toArray();
                for (var index = 0, count = accountGroupSummarys2.length; index < count; index++) {
                    var accountGroupSummaryItem = accountGroupSummarys2[index];
                    if (accountGroupSummaryItem.childSummaryItems.Exists(accountID)) {
                        var accountSummaryItem = accountGroupSummaryItem.childSummaryItems.Item(accountID);
                        if (!accountSummaryItem.exclude) {
                            var accountGroupSummaryItem = accountSummaryItem.parentSummaryItem;
                            accountGroupSummaryItem.setItem(accountSummaryItem, false);
                            //For AccountGroupSummary: Set Avage price
                            accountGroupSummaryItem.setAvagePrice(quotationFrm);
                            //For instrumentSummaryItem: Set Item
                            instrumentSummaryItem.setItem(accountSummaryItem, false);
                            //For instrumentSummaryItem: Set Avage price
                            instrumentSummaryItem.setAvagePrice(quotationFrm);
                        }
                        accountGroupSummaryItem.childSummaryItems.Remove(accountID);
                        break;
                    } 
                }
            }
        }
    }

    if (msXml == null) return;
    if (msXml.childNodes.length <= 0) return;
    var oDealingConsole = quotationFrm.oDealingConsole;
    var accountsNode = msXml.childNodes.item(0);
    for (var i = 0, iCount = accountsNode.childNodes.length; i < iCount; i++) {
        var accountNode = accountsNode.childNodes.item(i);
        var accountSummaryItem = new SummaryItem();
        accountSummaryItem.UpdateByXmlNode(instrumentSummaryItem.id, OpenInterestSummaryCategory.Account, accountNode);

        //For _AccountGroupSummary: Set Item
        UpdateSummaryFromAccountToGroup(instrumentSummaryItem, accountSummaryItem, false);
    }

    instrumentSummaryItem.reset();
    accountGroupSummarys = instrumentSummaryItem.childSummaryItems;
    var accountGroupSummarys2 = (new VBArray(accountGroupSummarys.Items())).toArray();
    for (var index = 0, count = accountGroupSummarys2.length; index < count; index++) {
        var accountGroupSummaryItem = accountGroupSummarys2[index];
        //For AccountGroupSummary: Set Avage price
        accountGroupSummaryItem.setAvagePrice(quotationFrm);

        //For instrumentSummaryItem: Set Item
        UpdateSummaryFromGroupToRoot(instrumentSummaryItem, accountGroupSummaryItem, false);
    }
    //For instrumentSummaryItem: Set Avage price
    instrumentSummaryItem.setAvagePrice(quotationFrm);
}

function FillOpenInterestSummaryOrderListData(accountSummaryItem, msXml) {
    var instrumentSummaryItem = accountSummaryItem.parentSummaryItem.parentSummaryItem;
    accountSummaryItem.childSummaryItems = new ActiveXObject("Scripting.Dictionary"); //key=id value=SummaryItem

    if (msXml == null || msXml.childNodes.length <= 0) {
        accountSummaryItem.isGotNextData = true;
        RecalculateSummaryByOrders(accountSummaryItem);
        return;
    }
    var transactionsNode = msXml.childNodes.item(0);
    for (var i = 0, iCount = transactionsNode.childNodes.length; i < iCount; i++) {
        var transactionNode = transactionsNode.childNodes.item(i);
        var transactionId;
        var contractSize;
        var instrumentId;
        var executeTime;
        for (var index = 0, count = transactionNode.attributes.length; index < count; index++) {
            var attribute = transactionNode.attributes.item(index);
            var value = attribute.nodeValue;
            switch (attribute.nodeName) {
                case "ID":
                    transactionId = value;
                    break;
                case "ContractSize":
                    contractSize = XmlConvert.ToDecimal(value);
                    break;
                case "InstrumentID":
                    instrumentId = value;
                    break;
                case "ExecuteTime":
                    executeTime = value;
                    break;
            }
        }
        for (var j = 0, jCount = transactionNode.childNodes.length; j < jCount; j++) {
            var orderNode = transactionNode.childNodes.item(j);
            var id;
            var isBuy;
            var lotBalance;
            var executePrice;
            for (var k = 0, kCount = orderNode.attributes.length; k < kCount; k++) {
                var attribute = orderNode.attributes.item(k);
                var value = attribute.nodeValue;
                switch (attribute.nodeName) {
                    case "ID":
                        id = value;
                        break;
                    case "IsBuy":
                        isBuy = XmlConvert.ToBoolean(value);
                        break;
                    case "LotBalance":
                        lotBalance = XmlConvert.ToDecimal(value);
                        break;
                    case "ExecutePrice":
                        executePrice = value;
                        break;
                }
            }
            var orderSummaryItem = new SummaryItem();
            orderSummaryItem.Instance(instrumentSummaryItem.id, OpenInterestSummaryCategory.Order, id);
            orderSummaryItemSetItem(accountSummaryItem.type, orderSummaryItem, executePrice, lotBalance, isBuy, contractSize, executeTime);
            accountSummaryItem.AddSummaryItemRelation(orderSummaryItem);
        }
    }
    accountSummaryItem.isGotNextData = true;
    RecalculateSummaryByOrders(accountSummaryItem);
}

function RecalculateSummaryByOrders(accountSummaryItem) {
    var instrumentSummaryItem = accountSummaryItem.parentSummaryItem.parentSummaryItem;
    var quotationFrm = GetQuotationFrm();
    //Group/Summary -
    if (!accountSummaryItem.exclude) {
        var accountGroupSummaryItem = accountSummaryItem.parentSummaryItem;
        accountGroupSummaryItem.setItem(accountSummaryItem, false);
        //For AccountGroupSummary: Set Avage price
        accountGroupSummaryItem.setAvagePrice(quotationFrm);
        //For instrumentSummaryItem: Set Item
        instrumentSummaryItem.setItem(accountSummaryItem, false);
        //For instrumentSummaryItem: Set Avage price
        instrumentSummaryItem.setAvagePrice(quotationFrm);
    }
    accountSummaryItem.reset();
    
    //Sum Orders -> Account +
    var orderSummaryItems = (new VBArray(accountSummaryItem.childSummaryItems.Items())).toArray();
    for (var index = 0, count = orderSummaryItems.length; index < count; index++) {
        var orderSummaryItem = orderSummaryItems[index];
        if (accountSummaryItem.minNumeratorUnit > orderSummaryItem.minNumeratorUnit) {
            accountSummaryItem.minNumeratorUnit = orderSummaryItem.minNumeratorUnit;
        }
        if (accountSummaryItem.maxDenominator < orderSummaryItem.maxDenominator) {
            accountSummaryItem.maxDenominator = orderSummaryItem.maxDenominator;
        }
        accountSummaryItem.setItem(orderSummaryItem, true);
    }
    //For AccountSummary: Set Avage price
    accountSummaryItem.setAvagePrice(quotationFrm);

    //Group/Summary +
    if (!accountSummaryItem.exclude) {
        var accountGroupSummaryItem = accountSummaryItem.parentSummaryItem;
        if (accountGroupSummaryItem.minNumeratorUnit > accountSummaryItem.minNumeratorUnit) {
            accountGroupSummaryItem.minNumeratorUnit = accountSummaryItem.minNumeratorUnit;
        }
        if (accountGroupSummaryItem.maxDenominator < accountSummaryItem.maxDenominator) {
            accountGroupSummaryItem.maxDenominator = accountSummaryItem.maxDenominator;
        }
        accountGroupSummaryItem.setItem(accountSummaryItem, true);
        //For AccountGroupSummary: Set Avage price
        accountGroupSummaryItem.setAvagePrice(quotationFrm);
        //For instrumentSummaryItem: Set Item
        instrumentSummaryItem.setItem(accountSummaryItem, true);
        //For instrumentSummaryItem: Set Avage price
        instrumentSummaryItem.setAvagePrice(quotationFrm);
    }
}

function UpdateSummaryRecalculateFromGroupToRoot(accountGroupSummaryItem) {
    var instrumentSummaryItem = accountGroupSummaryItem.parentSummaryItem;
    var quotationFrm = GetQuotationFrm();
    var childSummaryItems = (new VBArray(accountGroupSummaryItem.childSummaryItems.Items())).toArray();
    for (var index = 0, count = childSummaryItems.length; index < count; index++) {
        var childSummaryItem = childSummaryItems[index];
        UpdateSummaryFromAccountToGroup(instrumentSummaryItem, childSummaryItem, true);
    }
    //For AccountGroupSummary: Set Avage price
    accountGroupSummaryItem.setAvagePrice(quotationFrm);
    //For instrumentSummaryItem: Set Item
    UpdateSummaryFromGroupToRoot(instrumentSummaryItem, accountGroupSummaryItem, false);
    //For instrumentSummaryItem: Set Avage price
    instrumentSummaryItem.setAvagePrice(quotationFrm);
}

function RefreshGridChildSummaryItemExclude(summaryItem, exclude) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;

    //Set child exclude
    if (summaryItem.childSummaryItems.Count > 0) {
        var childSummarys = (new VBArray(summaryItem.childSummaryItems.Items())).toArray();
        for (var index = 0, count = childSummarys.length; index < count; index++) {
            var childSummary = childSummarys[index];
            //Refresh Grid
            var findRow = vsflexGrid.FindRow(childSummary.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
            if (findRow > 0) {
                vsflexGrid.Cell(flexcpChecked, findRow, vsflexGrid.ColIndex(interestSummaryGridColKey.Exclude)) = childSummary.exclude ? flexChecked : flexUnchecked;
            }

            RefreshGridChildSummaryItemExclude(childSummary, exclude);
        }
    }
}

function UpdateSummary(summaryItem) {
    var quotationFrm = GetQuotationFrm();
    if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account) {
        var instrumentSummaryItem = summaryItem.parentSummaryItem.parentSummaryItem;
        UpdateSummaryFromAccountToGroup(instrumentSummaryItem, summaryItem, true);
        //For AccountGroupSummary: Set Avage price
        summaryItem.parentSummaryItem.setAvagePrice(quotationFrm);
        //For instrumentSummaryItem: Set Item
        UpdateSummaryFromChildToRoot(instrumentSummaryItem,summaryItem, true);
        //For instrumentSummaryItem: Set Avage price
        instrumentSummaryItem.setAvagePrice(quotationFrm);
    }
    else if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Group) {
        var instrumentSummaryItem = summaryItem.parentSummaryItem;
        //For AccountGroupSummary: Set Avage price
        summaryItem.setAvagePrice(quotationFrm);
        //For instrumentSummaryItem: Set Item
        UpdateSummaryFromGroupToRoot(instrumentSummaryItem, summaryItem, true);
        //For instrumentSummaryItem: Set Avage price
        instrumentSummaryItem.setAvagePrice(quotationFrm);
    }
}

function UpdateSummaryFromAccountToGroup(instrumentSummaryItem, accountSummaryItem, isModify) {
    //For _AccountGroupSummary: Set Item
    var accountGroupSummaryItem;
    if (accountSummaryItem.exclude) {
        if (isModify) {
            accountGroupSummaryItem = accountSummaryItem.parentSummaryItem;
            accountGroupSummaryItem.setItem(accountSummaryItem, false);
        }
    }
    else {
        var accountGroupSummarys = instrumentSummaryItem.childSummaryItems;
        if (accountGroupSummarys.Exists(accountSummaryItem.groupId)) {
            accountGroupSummaryItem = accountGroupSummarys.Item(accountSummaryItem.groupId);
            if (accountGroupSummaryItem.minNumeratorUnit > accountSummaryItem.minNumeratorUnit) {
                accountGroupSummaryItem.minNumeratorUnit = accountSummaryItem.minNumeratorUnit;
            }
            if (accountGroupSummaryItem.maxDenominator < accountSummaryItem.maxDenominator) {
                accountGroupSummaryItem.maxDenominator = accountSummaryItem.maxDenominator;
            }
        }
        else {
            accountGroupSummaryItem = new SummaryItem();
            accountGroupSummaryItem.Instance(instrumentSummaryItem.id, OpenInterestSummaryCategory.Group, accountSummaryItem.groupId);
            //accountGroupSummarys.Add(accountSummaryItem.groupId, accountGroupSummaryItem);
            accountGroupSummaryItem.code = accountSummaryItem.groupCode;
            accountGroupSummaryItem.minNumeratorUnit = accountSummaryItem.minNumeratorUnit;
            accountGroupSummaryItem.maxDenominator = accountSummaryItem.maxDenominator;

            instrumentSummaryItem.AddSummaryItemRelation(accountGroupSummaryItem);
        }
        accountGroupSummaryItem.setItem(accountSummaryItem, true);

        if (accountSummaryItem.parentSummaryItem == null) {
            accountGroupSummaryItem.AddSummaryItemRelation(accountSummaryItem);
        }
    }
}

function UpdateSummaryFromGroupToRoot(instrumentSummaryItem, summaryItem, isModify) {
    UpdateSummaryFromChildToRoot(instrumentSummaryItem, summaryItem, isModify);
}

function UpdateSummaryFromChildToRoot(instrumentSummaryItem, summaryItem, isModify) {
    //For instrumentSummaryItem: Set Item
    var isDecrease = true;
    if (summaryItem.exclude) {
        if (isModify && summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account && summaryItem.exclude == summaryItem.parentSummaryItem.exclude) {
            isDecrease = false;
        }
        else {
            isDecrease = true;
        }
    }
    else {
        if (isModify && summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account && summaryItem.exclude != summaryItem.parentSummaryItem.exclude) {
            isDecrease = true;
        }
        else {
            isDecrease = false;
        }
    }
    if (isDecrease) {
        instrumentSummaryItem.setItem(summaryItem, false);
    }
    else {
        if (instrumentSummaryItem.minNumeratorUnit > summaryItem.minNumeratorUnit) {
            instrumentSummaryItem.minNumeratorUnit = summaryItem.minNumeratorUnit;
        }
        if (instrumentSummaryItem.maxDenominator < summaryItem.maxDenominator) {
            instrumentSummaryItem.maxDenominator = summaryItem.maxDenominator;
        }
        instrumentSummaryItem.setItem(summaryItem, true);
    }
}

function AddOrderToOpenInterestSummaryGrid(quotationFrm, order) {    
    AddOrderToOpenInterestSummaryGridProcess(quotationFrm, order.id, order.blotterCode, order.isOpen, order.tran.phase, order.tran.instrumentID, order.tran.accountID, order.executePrice.ToString(), order.lotBalance, order.isBuy, order.tran.contractSize, Date2String(order.tran.executeTime), order.orderRelations);
}

function IsCorrespondingInstrumentID(quotationFrm,instrumentId) {
    var isSelectOriginCode = IsSelectOriginCode();
    if (isSelectOriginCode) {
        var instrument = quotationFrm.oDealingConsole.GetInstrumentById(instrumentId);
        if (instrument == null) return false;
        return _InstrumentSummaryItems.Exists(instrument.originCode);
    }
    else {
        return _InstrumentSummaryItems.Exists(instrumentId);
    }
}
//function IsCorrespondingInstrumentID(quotationFrm,instrumentId) {
//    var instrumentSelected = window._OpenInterestSummaryInstrumentSelectGrid.Cell(flexcpText, 0, 0);
//    if (instrumentSelected == null || instrumentSelected == "") {
//        return false;
//    }
//    return quotationFrm.oDealingConsole.existsInstrumentIdForOpenInterestSummary(instrumentSelected, IsSelectOriginCode(), instrumentId);
//}

function GetFinallyOutline(summaryItem) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;
    var findRow = -1;
    var flexOutline = flexOutlineCollapsed;
    if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Order) {
        //Account
        findRow = vsflexGrid.FindRow(summaryItem.parentSummaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow > 0) {
            flexOutline = summaryItem.parentSummaryItem.getIsCollapsed();
            //vsflexGrid.IsCollapsed(findRow);
            if (flexOutline == flexOutlineCollapsed) return flexOutlineCollapsed;
        }
        //Account Group
        findRow = vsflexGrid.FindRow(summaryItem.parentSummaryItem.parentSummaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow > 0) {
            if (summaryItem.parentSummaryItem.parentSummaryItem.getIsCollapsed() == flexOutlineCollapsed) return flexOutlineCollapsed;
            //if (vsflexGrid.IsCollapsed(findRow) == flexOutlineCollapsed) return flexOutlineCollapsed;
        }
        //instrumentSummaryItem
        findRow = vsflexGrid.FindRow(summaryItem.parentSummaryItem.parentSummaryItem.parentSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
        if (findRow > 0) {
            if (summaryItem.parentSummaryItem.parentSummaryItem.parentSummaryItem.getIsCollapsed() == flexOutlineCollapsed) return flexOutlineCollapsed;
            //if (vsflexGrid.IsCollapsed(findRow) == flexOutlineCollapsed) return flexOutlineCollapsed;
        }
    }

    if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Account) {
        //Account
        findRow = vsflexGrid.FindRow(summaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow > 0) {
            flexOutline = summaryItem.getIsCollapsed(); 
            //vsflexGrid.IsCollapsed(findRow);
            if (flexOutline == flexOutlineCollapsed) return flexOutlineCollapsed;
        }
        //Account Group
        findRow = vsflexGrid.FindRow(summaryItem.parentSummaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow > 0) {
            if (summaryItem.parentSummaryItem.getIsCollapsed() == flexOutlineCollapsed) return flexOutlineCollapsed;
            //if (vsflexGrid.IsCollapsed(findRow) == flexOutlineCollapsed) return flexOutlineCollapsed;
        }
        //instrumentSummaryItem
        findRow = vsflexGrid.FindRow(summaryItem.parentSummaryItem.parentSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
        if (findRow > 0) {
            if (summaryItem.parentSummaryItem.parentSummaryItem.getIsCollapsed() == flexOutlineCollapsed) return flexOutlineCollapsed;
            //if (vsflexGrid.IsCollapsed(findRow) == flexOutlineCollapsed) return flexOutlineCollapsed;
        }
    }

    if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Group) {
        //Account Group
        findRow = vsflexGrid.FindRow(summaryItem.GetKey(), vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow > 0) {
            flexOutline = summaryItem.getIsCollapsed(); 
            //flexOutline = vsflexGrid.IsCollapsed(findRow);
            if (flexOutline == flexOutlineCollapsed) return flexOutlineCollapsed;
        }
        //instrumentSummaryItem
        findRow = vsflexGrid.FindRow(summaryItem.parentSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
        if (findRow > 0) {
            if (summaryItem.parentSummaryItem.getIsCollapsed() == flexOutlineCollapsed) return flexOutlineCollapsed;
            //if (vsflexGrid.IsCollapsed(findRow) == flexOutlineCollapsed) return flexOutlineCollapsed;
        }
    }

    if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Instrument) {
        //instrumentSummaryItem
        findRow = vsflexGrid.FindRow(summaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
        if (findRow > 0) {
            flexOutline = summaryItem.getIsCollapsed(); 
            //flexOutline = vsflexGrid.IsCollapsed(findRow);
            if (flexOutline == flexOutlineCollapsed) return flexOutlineCollapsed;
        }
    }
    return flexOutline;
}
//function OpenInterestSummaryCategory() {
//    this.Empty = -1;
//    this.Instrument = 0;
//    this.Group = 1;
//    this.Account = 2;
//    this.Order = 3;
//}
function AddOrderToOpenInterestSummaryGridProcess(quotationFrm, id, blotterCode, isOpen, phase, instrumentId, accountID, executePrice, lotBalance, isBuy, contractSize, executeTime, orderRelations) {
    if (!InStringArray(blotterCode, blotterCodeSelectedsForSummary)) return;
    if (phase == TransPhase.Executed || phase == TransPhase.Completed) {
        //var quotationFrm = GetQuotationFrm();
        if (!IsCorrespondingInstrumentID(quotationFrm, instrumentId)) return;

        var isSelectOriginCode = IsSelectOriginCode();
        var instrumentSelected;
        if (isSelectOriginCode) {
            var instrument = quotationFrm.oDealingConsole.GetInstrumentById(instrumentId);
            if (instrument == null) return;
            instrumentSelected = instrument.originCode;
        }
        else {
            instrumentSelected = instrumentId;
        }
        if (_InstrumentSummaryItems.Exists(instrumentSelected)) {
            var instrumentSummaryItem2 = _InstrumentSummaryItems.Item(instrumentSelected);
            if (!instrumentSummaryItem2.isGotNextData) {
                QuerySummaryByInstrument(null, false, instrumentSelected);
                return;
            }
        }
        else {
            QuerySummary();
            return;
        }
        var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
        var vsflexGrid = window._OpenInterestSummaryGrid;
        var findRow = vsflexGrid.FindRow(instrumentSelected + "_" + accountID, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow <= 0) {            
            QuerySummaryByInstrument(new Array(accountID), true, instrumentSelected);
            return;
        }
        else {
            //var accountSummaryItemOutline = vsflexGrid.IsCollapsed(findRow);

            var accountSummaryItem = vsflexGrid.RowData(findRow);
            if (!accountSummaryItem.isGotNextData) {
                getAccountOpenOrders(findRow);
                return;
            }
            var accountSummaryItemOutline = GetFinallyOutline(accountSummaryItem);
            vsflexGrid.Redraw = false;
            var orderSummaryItem;
            if (isOpen) {
                if (accountSummaryItem.childSummaryItems.Exists(id)) {
                    orderSummaryItem = accountSummaryItem.childSummaryItems.Item(id);
                }
                else {
                    orderSummaryItem = new SummaryItem();
                    orderSummaryItem.Instance(accountSummaryItem.parentSummaryItem.parentSummaryItem.id, OpenInterestSummaryCategory.Order, id);
                    accountSummaryItem.AddSummaryItemRelation(orderSummaryItem);
                }

                orderSummaryItemSetItem(accountSummaryItem.type, orderSummaryItem, executePrice, lotBalance, isBuy, contractSize, executeTime);
                
                var line = vsflexGrid.FindRow(orderSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
                if (line <= 0) {
                    line = findRow + 1;
                    vsflexGrid.AddItem("", line);
                }
                FillRow(vsflexGrid, line, orderSummaryItem, interestSummaryGridColKey);
                vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(interestSummaryGridColKey.SellLot)) = color_red;
                vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(interestSummaryGridColKey.BuyLot)) = color_blue;
                
//              vsflexGrid.IsCollapsed(line) = accountSummaryItemOutline == flexOutlineExpanded ? flexOutlineExpanded : flexOutlineSubtotals;
                vsflexGrid.IsCollapsed(line) = accountSummaryItemOutline;
                accountSummaryItem.setIsCollapsed(accountSummaryItemOutline);
            }
            else {
                for (var i = 0, count = orderRelations.length; i < count; i++) {
                    var orderRelation = orderRelations[i];
                    if (accountSummaryItem.childSummaryItems.Exists(orderRelation.openOrderID)) {
                        orderSummaryItem = accountSummaryItem.childSummaryItems.Item(orderRelation.openOrderID);
                        var orderRelationExecutePrice, orderRelationLotBalance, orderRelationIsBuy, orderRelationContractSize, orderRelationExecuteTime;
                        orderRelationIsBuy = !isBuy;
                        orderRelationExecutePrice = orderRelationIsBuy ? orderSummaryItem.avgBuyPrice : orderSummaryItem.avgSellPrice;
                        orderRelationLotBalance = (orderRelationIsBuy ? orderSummaryItem.buyLot : orderSummaryItem.sellLot) - orderRelation.closedLot;
                        orderRelationContractSize = (orderRelationIsBuy ? orderSummaryItem.buyContractSize : orderSummaryItem.sellContractSize) / orderRelationLotBalance;
                        orderRelationExecuteTime = orderSummaryItem.code;
                        orderSummaryItemSetItem(accountSummaryItem.type, orderSummaryItem, orderRelationExecutePrice, orderRelationLotBalance, orderRelationIsBuy, orderRelationContractSize, orderRelationExecuteTime);
                        var line = vsflexGrid.FindRow(orderSummaryItem.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
                        if (line > 0) {
                            if (orderRelationLotBalance <= 0) {
                                accountSummaryItem.childSummaryItems.Remove(orderRelation.openOrderID);
                                if (accountSummaryItem.childSummaryItems.Count <= 0) {
                                    //remove empty node
                                    if (line + 1 < vsflexGrid.Rows) {
                                        var summaryItem = vsflexGrid.RowData(line + 1);
                                        if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Empty) {
                                            vsflexGrid.RemoveItem(line + 1);
                                        }
                                    }
                                }
                                vsflexGrid.RemoveItem(line);
                            }
                            else {
                                FillRow(vsflexGrid, line, orderSummaryItem, interestSummaryGridColKey);
                            }
                        }
                    }
                }
            }

            RecalculateSummaryByOrders(accountSummaryItem);

            //refresh upline grid
            var instrumentSummaryItem = accountSummaryItem.parentSummaryItem.parentSummaryItem;
            RefreshSummaryGrid(instrumentSummaryItem, accountSummaryItem);
            if (!accountSummaryItem.exclude) {
                RefreshSummaryGrid(instrumentSummaryItem, accountSummaryItem.parentSummaryItem);
                RefreshSummaryGrid(instrumentSummaryItem, instrumentSummaryItem);
            }
            vsflexGrid.Redraw = true;
        }
    }
}

function DeleteOrderFromOpenInterestSummaryGrid(quotationFrm, deletedOrderId, accountId, instrumentId) {
    var quotationFrm = GetQuotationFrm();
    var interestSummaryGridColKey = quotationFrm.interestSummaryGridColKey;
    var vsflexGrid = window._OpenInterestSummaryGrid;
    //for all option...

    var line = vsflexGrid.FindRow(deletedOrderId, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Id), true, true);
    if (line > 0) {
        var orderSummaryItem = vsflexGrid.RowData(line);
        var accountSummaryItem = orderSummaryItem.parentSummaryItem;
        if (accountSummaryItem.childSummaryItems.Exists(deletedOrderId)) {
            accountSummaryItem.childSummaryItems.Remove(deletedOrderId);

            RecalculateSummaryByOrders(accountSummaryItem);

            vsflexGrid.Redraw = false;
            try {
                //remove empty node
                if (line + 1 < vsflexGrid.Rows) {
                    var summaryItem = vsflexGrid.RowData(line + 1);
                    if (summaryItem.openInterestSummaryCategory == OpenInterestSummaryCategory.Empty) {
                        vsflexGrid.RemoveItem(line + 1);
                    }
                }
                vsflexGrid.RemoveItem(line);

                //refresh upline grid
                var instrumentSummaryItem = accountSummaryItem.parentSummaryItem.parentSummaryItem;
                RefreshSummaryGrid(instrumentSummaryItem, accountSummaryItem);
                if (!accountSummaryItem.exclude) {
                    RefreshSummaryGrid(instrumentSummaryItem, accountSummaryItem.parentSummaryItem);
                    RefreshSummaryGrid(instrumentSummaryItem, instrumentSummaryItem);
                }
            }
            catch (e)
            { }
            vsflexGrid.Redraw = true;
        }
    }
    else {
        if (!IsCorrespondingInstrumentID(quotationFrm, instrumentId)) return;
        var isSelectOriginCode = IsSelectOriginCode();
        var instrumentSelected;
        if (isSelectOriginCode) {
            var instrument = quotationFrm.oDealingConsole.GetInstrumentById(instrumentId);
            if (instrument == null) return;
            instrumentSelected = instrument.originCode;
        }
        else {
            instrumentSelected = instrumentId;
        }
        if (_InstrumentSummaryItems.Exists(instrumentSelected)) {
            var instrumentSummaryItem2 = _InstrumentSummaryItems.Item(instrumentSelected);
            if (!instrumentSummaryItem2.isGotNextData) {
                QuerySummaryByInstrument(null, false, instrumentSelected);
                return;
            }
        }
        else {
            QuerySummary();
            return;
        }
        var findRow = vsflexGrid.FindRow(instrumentSelected + "_" + accountId, vsflexGrid.FixedRows, vsflexGrid.ColIndex(interestSummaryGridColKey.Key), true, true);
        if (findRow <= 0) {
            QuerySummaryByInstrument(new Array(accountID), true, instrumentSelected);
            return;
        }
        else {
            getAccountOpenOrders(findRow);
            return;
        }
    }
}

function AffectOrderToOpenInterestSummaryGrid(quotationFrm, order) {
    AddOrderToOpenInterestSummaryGridProcess(quotationFrm, order.id, order.blotterCode, order.isOpen, order.tran.phase, order.tran.instrumentID, order.tran.accountID, order.executePrice.ToString(), order.lotBalance, order.isBuy, order.tran.contractSize, Date2String(order.tran.executeTime), order.orderRelations);
}

function orderSummaryItemSetItem(accountType, orderSummaryItem, executePrice, lotBalance, isBuy, contractSize, executeTime) {
    var executePriceValue = XmlConvert.ToDecimal(executePrice);
    var buyLot = isBuy ? lotBalance : 0.0;
    var sellLot = !isBuy ? lotBalance : 0.0;
    orderSummaryItem.code = executeTime;
    orderSummaryItem.buyLot = buyLot;
    orderSummaryItem.avgBuyPrice = isBuy ? executePrice : "0";
    orderSummaryItem.avgBuyPriceValue = isBuy ? executePriceValue : 0.00;
    orderSummaryItem.buyContractSize = buyLot * contractSize;
    orderSummaryItem.sellLot = sellLot;
    orderSummaryItem.avgSellPrice = !isBuy ? executePrice : "0";
    orderSummaryItem.avgSellPriceValue = !isBuy ? executePriceValue : 0.00;
    orderSummaryItem.sellContractSize = sellLot * contractSize;
    if (accountType == 2)  //Company
    {
        orderSummaryItem.netLot = sellLot - buyLot;
        orderSummaryItem.netContractSize = sellLot * contractSize - buyLot * contractSize;
    }
    else {
        orderSummaryItem.netLot = buyLot - sellLot;
        orderSummaryItem.netContractSize = buyLot * contractSize - sellLot * contractSize;
    }
    orderSummaryItem.avgNetPrice = isBuy ? executePrice : "-" + executePrice;
    orderSummaryItem.avgNetPriceValue = isBuy ? executePriceValue : 0.00 - executePriceValue;
    //orderSummaryItem.netContractSize = buyLot * contractSize - sellLot * contractSize;
}

//#endregion Update Summary Item

//#region Open Interest Summary Data Structure---------------------------------------
//AccountGroupId,AccountGroupCode,				BuyLot,AvgBuyPrice,BuyContractSize,SellLot,AvgSellPrice,SellContractSize,NetLot,AvgNetPrice,NetContractSize   Exclude
//AccountId,AccountCode,  					BuyLot,AvgBuyPrice,BuyContractSize,SellLot,AvgSellPrice,SellContractSize,NetLot,AvgNetPrice,NetContractSize   Exclude
//		Order: OrderId,AccountId, InstrumentId, Phase(2,3,4), IsBuy, ExecutePrice, ContractSize,LotBalance
//	
//SUMMARY								BuyLot,AvgBuyPrice,BuyContractSize,SellLot,AvgSellPrice,SellContractSize,NetLot,AvgNetPrice,NetContractSize

var OpenInterestSummaryCategory = new OpenInterestSummaryCategory();
function OpenInterestSummaryCategory() {
    this.Empty = -1;
    this.Instrument = 0;
    this.Group = 1;
    this.Account = 2;
    this.Order = 3;
}

function SummaryItem() {
    this.instrumentSummaryItemId;
    this.id;
    this.code;
    this.type = 0;  //AccountType, Only used AccountSummaryItem
    this.openInterestSummaryCategory;
    this.minNumeratorUnit = 1;
    this.maxDenominator = 1;
    this.buyLot = 0.0;
    this.avgBuyPrice = "0";
    this.buyContractSize = 0;
    this.sellLot = 0.0;
    this.avgSellPrice = "0";
    this.sellContractSize = 0;
    this.netLot = 0.0;
    this.avgNetPrice = "0";
    this.netContractSize = 0;

    this.groupId;
    this.groupCode;
    //this.originCode = null;

    this.avgBuyPriceValue = 0.0000;
    this.avgSellPriceValue = 0.0000;
    this.avgNetPriceValue = 0.0000;

    this.buyLotMultiplyAvgPriceSum = 0.0000;
    this.sellLotMultiplyAvgPriceSum = 0.0000;
    this.netLotMultiplyAvgPriceSum = 0.0000;

    this.exclude = false;
    this.parentSummaryItem = null;
    this.isGotNextData = false;
    this.isCollapsed = 2;   //flexOutlineCollapsed =2;

    this.setIsCollapsed = function(isCollapsed){
        this.isCollapsed = isCollapsed;
    };

    this.getIsCollapsed = function(){
        return this.isCollapsed;
    };

    this.GetKey = function()
    {
        return this.instrumentSummaryItemId + "_" + this.id;
    };

    this.setItem = function (childSummaryItem, increase) {
        if (increase) {
            this.buyLot += childSummaryItem.buyLot;
            this.buyLotMultiplyAvgPriceSum += childSummaryItem.buyLot * childSummaryItem.avgBuyPriceValue;
            this.sellLot += childSummaryItem.sellLot;
            this.sellLotMultiplyAvgPriceSum += childSummaryItem.sellLot * childSummaryItem.avgSellPriceValue;
            this.netLot += childSummaryItem.netLot;
            this.netLotMultiplyAvgPriceSum += childSummaryItem.netLot * childSummaryItem.avgNetPriceValue;
            this.buyContractSize += childSummaryItem.buyContractSize;
            this.sellContractSize += childSummaryItem.sellContractSize;
            this.netContractSize += childSummaryItem.netContractSize;
        }
        else {
            this.buyLot -= childSummaryItem.buyLot;
            this.buyLotMultiplyAvgPriceSum -= childSummaryItem.buyLot * childSummaryItem.avgBuyPriceValue;
            this.sellLot -= childSummaryItem.sellLot;
            this.sellLotMultiplyAvgPriceSum -= childSummaryItem.sellLot * childSummaryItem.avgSellPriceValue;
            this.netLot -= childSummaryItem.netLot;
            this.netLotMultiplyAvgPriceSum -= childSummaryItem.netLot * childSummaryItem.avgNetPriceValue;
            this.buyContractSize -= childSummaryItem.buyContractSize;
            this.sellContractSize -= childSummaryItem.sellContractSize;
            this.netContractSize -= childSummaryItem.netContractSize;
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

        var avgNetPriceValue = this.netLot != 0.0 ? this.netLotMultiplyAvgPriceSum / this.netLot : 0.00;
        price = quotationFrm.ObjectPool.GetPriceHelper(avgNetPriceValue, this.minNumeratorUnit, this.maxDenominator);
        this.avgNetPrice = price == null ? "0" : price.ToString();
        this.avgNetPriceValue = avgNetPriceValue;
    };

    this.setChildSummaryItemExclude = function (exclude) {
        var childSummaryItems = (new VBArray(this.childSummaryItems.Items())).toArray();
        for (var index = 0, count = childSummaryItems.length; index < count; index++) {
            var childSummaryItem = childSummaryItems[index];
            childSummaryItem.exclude = exclude;
            childSummaryItem.setChildSummaryItemExclude(exclude);
        }
    };

    this.setExclude = function (exclude) {
        this.exclude = exclude;
        this.setChildSummaryItemExclude(exclude);
    };

    this.reset = function()
    {
        this.buyLot = 0.0;
        this.avgBuyPrice = "0";
        this.buyContractSize = 0;
        this.sellLot = 0.0;
        this.avgSellPrice = "0";
        this.sellContractSize = 0;
        this.netLot = 0.0;
        this.avgNetPrice = "0";
        this.netContractSize = 0;

        this.avgBuyPriceValue = 0.0000;
        this.avgSellPriceValue = 0.0000;
        this.avgNetPriceValue = 0.0000;

        this.buyLotMultiplyAvgPriceSum = 0.0000;
        this.sellLotMultiplyAvgPriceSum = 0.0000;
        this.netLotMultiplyAvgPriceSum = 0.0000;
    };

    this.childSummaryItems = new ActiveXObject("Scripting.Dictionary"); //key=id value=SummaryItem

    this.AddSummaryItemRelation = function (summaryItem) {
        summaryItem.parentSummaryItem = this;
        this.childSummaryItems.Add(summaryItem.id, summaryItem);
    };

    this.getEmptySummaryItem = function (instrumentSummaryItemId) {
        var emptySummaryItem = new SummaryItem();
        emptySummaryItem.Instance(instrumentSummaryItemId, OpenInterestSummaryCategory.Empty, '00000000-0000-0000-0000-000000000000');
        emptySummaryItem.code = "Loading...";
        return emptySummaryItem;
    };
    
    this.Instance = function (instrumentSummaryItemId, openInterestSummaryCategory, id) {
        this.instrumentSummaryItemId = instrumentSummaryItemId;
        this.id = id;
        this.openInterestSummaryCategory = openInterestSummaryCategory;
    };

    this.UpdateByXmlNode = function (instrumentSummaryItemId, openInterestSummaryCategory, rowNode) {
        this.UpdateByXmlNode2(openInterestSummaryCategory, rowNode);
        this.instrumentSummaryItemId = instrumentSummaryItemId;
    };

    this.UpdateByXmlNode2 = function (openInterestSummaryCategory, rowNode) {
        this.openInterestSummaryCategory = openInterestSummaryCategory;

        for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
            var attribute = rowNode.attributes.item(index);
            var value = attribute.nodeValue;
            switch (attribute.nodeName) {
                case "ID":
                    this.id = value;
                    break;
                case "Code":
                    this.code = value;
                    break;
                case "Type":
                    this.type = XmlConvert.ToInt32(value);
                    break;
                case "MinNumeratorUnit":
                    this.minNumeratorUnit = XmlConvert.ToInt32(value);
                    break;
                case "MaxDenominator":
                    this.maxDenominator = XmlConvert.ToInt32(value);
                    break;
                case "BuyLot":
                    this.buyLot = XmlConvert.ToDecimal(value);
                    break;
                case "AvgBuyPrice":
                    this.avgBuyPrice = value;
                    this.avgBuyPriceValue = XmlConvert.ToDecimal(value);
                    break;
                case "BuyContractSize":
                    this.buyContractSize = XmlConvert.ToDecimal(value);
                    break;
                case "SellLot":
                    this.sellLot = XmlConvert.ToDecimal(value);
                    break;
                case "AvgSellPrice":
                    this.avgSellPrice = value;
                    this.avgSellPriceValue = XmlConvert.ToDecimal(value);
                    break;
                case "SellContractSize":
                    this.sellContractSize = XmlConvert.ToDecimal(value);
                    break;
                case "NetLot":
                    this.netLot = XmlConvert.ToDecimal(value);
                    break;
                case "AvgNetPrice":
                    this.avgNetPrice = value;
                    this.avgNetPriceValue = XmlConvert.ToDecimal(value);
                    break;
                case "NetContractSize":
                    this.netContractSize = XmlConvert.ToDecimal(value);
                    break;
                case "GroupId":
                    this.groupId = value;
                    break;
                case "GroupCode":
                    this.groupCode = value;
                    break;
                //case "OriginCode": 
                //    this.originCode = value; 
                //    break; 
            }
        }
    };

}

//#endregion Open Interest Summary Data Structure---------------------------------------