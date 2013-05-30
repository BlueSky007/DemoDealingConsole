var vsflexGrid;
var quotationFrm;
var customerPolicyManagementGridColKey;
var customerPolicyManagementGridLanguage;
var getDataComplete = false;
var initTimeOutId = null;
function Init() {
    initTimeOutId = window.setTimeout(InitTimeOut, 10);
}

function InitTimeOut() {
    if (initTimeOutId) { window.clearTimeout(initTimeOutId); initTimeOutId = null; }

    QuotePolicySelectInit(window._QuotePolicySelect, false);
    QuotePolicySelectInit(window._ReplaceWithQuotePolicySelect, false);
    GridInit();
    customerPolicyManagementPageLoaded = true;
}

function GridInit() {
    vsflexGrid.Redraw = false;
    with (vsflexGrid) {
        Cols = 12;
        Rows = 1;
        FixedRows = 1;
        FixedCols = 0;

        var parameter = quotationFrm.oDealingConsole.InitGrid(vsflexGrid, quotationFrm.optionGrid.CustomerPolicyManagementGrid, customerPolicyManagementGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForCustomerPolicyManagement(vsflexGrid, customerPolicyManagementGridColKey);

        ColDataType(ColIndex(customerPolicyManagementGridColKey.Select)) = flexDTBoolean;
        FrozenCols = 3;
        ColAlignment(ColIndex(customerPolicyManagementGridColKey.Code)) = flexAlignLeftCenter;
        ColAlignment(ColIndex(customerPolicyManagementGridColKey.CustomerCode)) = flexAlignLeftCenter;
        ColAlignment(ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode)) = flexAlignLeftCenter;
        ColAlignment(ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode)) = flexAlignLeftCenter;

        ColDataType(ColIndex(customerPolicyManagementGridColKey.SaleSelect)) = flexDTBoolean;
        ColAlignment(ColIndex(customerPolicyManagementGridColKey.SalesCode)) = flexAlignLeftCenter;
        ColAlignment(ColIndex(customerPolicyManagementGridColKey.SalesQuotePolicyCode)) = flexAlignLeftCenter;
        ColAlignment(ColIndex(customerPolicyManagementGridColKey.SalesDealingPolicyCode)) = flexAlignLeftCenter;
        
        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSortAndMove; // flexExMove;
        SelectionMode = flexSelectionByRow;
        OutlineBar = flexOutlineBarComplete;
        Editable = flexEDNone;
        Ellipsis = flexEllipsisEnd;

        ColComboList(ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode)) = GetQuotePolicyComboString();
        ColComboList(ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode)) = GetDealingPolicyComboString();
        ColComboList(ColIndex(customerPolicyManagementGridColKey.SalesQuotePolicyCode)) = GetQuotePolicyComboString();
        ColComboList(ColIndex(customerPolicyManagementGridColKey.SalesDealingPolicyCode)) = GetDealingPolicyComboString();
    }    
    vsflexGrid.Redraw = true;
}

function GridColumnsDefaultFormatForCustomerPolicyManagement(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.Code)) = 1800;
        ColWidth(ColIndex(gridColKey.CustomerCode)) = 1800;
        ColWidth(ColIndex(gridColKey.Select)) = 600;
        ColWidth(ColIndex(gridColKey.QuotePolicyCode)) = 1800;
        ColWidth(ColIndex(gridColKey.DealingPolicyCode)) = 1800;
        ColWidth(ColIndex(gridColKey.SaleSelect)) = 600;
        ColWidth(ColIndex(gridColKey.SalesCode)) = 1800;
        ColWidth(ColIndex(gridColKey.SalesQuotePolicyCode)) = 1800;
        ColWidth(ColIndex(gridColKey.SalesDealingPolicyCode)) = 1800;
    }
}

function GetQuotePolicyComboString() {
    var comboString = "";
    var quotePolicys = quotationFrm.oQuotePolicys;
    if (quotePolicys) {
        var quotePolicys = (new VBArray(quotePolicys.Items())).toArray();
        for (var index = 0, count = quotePolicys.length; index < count; index++) {
            var quotePolicy = quotePolicys[index];
            comboString += ((comboString == "") ? "" : "|") + "#" + quotePolicy.id + ";" + quotePolicy.code;
        }
    }    
    return comboString;
}

function GetDealingPolicyComboString() {
    var comboString = "";
    for (var index = 0, count = window._DealingPolicySelect.options.length; index < count; index++) {
        var dealingPolicyOption = window._DealingPolicySelect.options[index];
        comboString += ((comboString == "") ? "" : "|") + "#" + dealingPolicyOption.value + ";" + dealingPolicyOption.text;
    }
//    var allOption = "#00000000-0000-0000-0000-000000000000;" + "<NULL>";
//    comboString = allOption + ((comboString == "") ? "" : "|") + comboString;

    return comboString;
}

function CustomerPolicyManagementGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    switch (vsflexGrid.ColKey(newCol)) {
        case customerPolicyManagementGridColKey.Select:
        case customerPolicyManagementGridColKey.SaleSelect:
        case customerPolicyManagementGridColKey.QuotePolicyCode:
        case customerPolicyManagementGridColKey.DealingPolicyCode:
        case customerPolicyManagementGridColKey.SalesQuotePolicyCode:
        case customerPolicyManagementGridColKey.SalesDealingPolicyCode:
            vsflexGrid.Editable = flexEDKbdMouse;
            break;
        default:
            vsflexGrid.Editable = flexEDNone;
            break;
    }
}

function CustomerPolicyManagementGrid_DblClick() {
    Collapse();
}
//Erric
function SetTheSameSalesCheckStatus(SelectedRow) {
    var currentRowData = vsflexGrid.RowData(SelectedRow); 
    for (var line = vsflexGrid.FixedRows; line < vsflexGrid.Rows; line++) {
        var item = vsflexGrid.RowData(line);
        if (line != SelectedRow && item.salesID == currentRowData.salesID) {
            item.setSalesSelected(false);
            vsflexGrid.Redraw = false;
            RefreshGrid(item);
            vsflexGrid.Redraw = true;
        }
    }
};

function CustomerPolicyManagementGrid_OnAfterEdit(row, col, cancel) {
    if (row < vsflexGrid.FixedRows || col < vsflexGrid.FixedCols) return;

    vsflexGrid.Redraw = false;
    var item = vsflexGrid.RowData(row);
    if (col == vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Select)) {
        if (item.category == Category.Detail || item.category == Category.Group) {
            var selected = vsflexGrid.Cell(flexcpChecked, row, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Select)) == flexChecked;
            if (item.selected != selected) {
                //Data process
                item.setSelected(selected);
                //Refresh Grid
                vsflexGrid.Redraw = false;
                RefreshGrid(item);
                RefreshGridChildItemSelect(item, selected);
                vsflexGrid.Redraw = true;

                
            }
        }
        else if (item.category == Category.Root) {
            var selected = vsflexGrid.Cell(flexcpChecked, row, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Select)) == flexChecked;
            SetSelected(selected);
        }
    }
    else if (col == vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SaleSelect)) {
        if (item.category == Category.Detail || item.category == Category.Group) {
            var salesSelected = vsflexGrid.Cell(flexcpChecked, row, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SaleSelect)) == flexChecked;

            if (item.salesSelected != salesSelected) {
                //Data process
                item.setSalesSelected(salesSelected);
                //Refresh Grid
                vsflexGrid.Redraw = false;
                RefreshGrid(item);
                RefreshGridChildItemSelect(item, salesSelected);
                vsflexGrid.Redraw = true;

                if (item.category == Category.Detail && salesSelected) {
                    SetTheSameSalesCheckStatus(row);
                }
            }
        }
        else if (item.category == Category.Root) {
            var salesSelected = vsflexGrid.Cell(flexcpChecked, row, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SaleSelect)) == flexChecked;
            SetSaleSelected(salesSelected);
        }
    }
    else if (col == vsflexGrid.ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode)) {
        var quotePolicyId = vsflexGrid.TextMatrix(row, col);
        var quotePolicyCode = vsflexGrid.EditText;
        item.trySetQuotePolicyCode(quotePolicyId, quotePolicyCode);
        if (item.modifyQuotePolicyId) {
            vsflexGrid.Cell(flexcpBackColor, row, col) = color_lightskyblue;

            TheSameCustomerEffectProcess(item, customerPolicyManagementGridColKey.QuotePolicyCode, "", true);
        }
        else {
            vsflexGrid.Cell(flexcpBackColor, row, col) = color_white;
            TheSameCustomerEffectProcess(item, customerPolicyManagementGridColKey.QuotePolicyCode, "", false);
        }
    }
    else if (col == vsflexGrid.ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode)) {
        var dealingPolicyId = vsflexGrid.TextMatrix(row, col);
        var dealingPolicyCode = vsflexGrid.EditText;
        item.trySetDealingPolicyCode(dealingPolicyId, dealingPolicyCode);
        if (item.modifyDealingPolicyId) {
            vsflexGrid.Cell(flexcpBackColor, row, col) = color_lightskyblue;

            TheSameCustomerEffectProcess(item, customerPolicyManagementGridColKey.DealingPolicyCode, "", true);
        }
        else {
            vsflexGrid.Cell(flexcpBackColor, row, col) = color_white;
            TheSameCustomerEffectProcess(item, customerPolicyManagementGridColKey.DealingPolicyCode, "", false);
        }
    }
    else if (col == vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesQuotePolicyCode)) {
        var salesQuotePolicyId = vsflexGrid.TextMatrix(row, col);
        var salesQuotePolicyCode = vsflexGrid.EditText;
        item.trySetSalesQuotePolicyCode(salesQuotePolicyId, salesQuotePolicyCode);
        if (item.modifySalesQuotePolicyId) {
            vsflexGrid.Cell(flexcpBackColor, row, col) = color_lightskyblue;

            TheSameSalesEffectProcess(item, customerPolicyManagementGridColKey.SalesQuotePolicyCode, "", true);
        }
        else {
            vsflexGrid.Cell(flexcpBackColor, row, col) = color_white;
            TheSameSalesEffectProcess(item, customerPolicyManagementGridColKey.SalesQuotePolicyCode, "", false);
        }
    }
    else if (col == vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesDealingPolicyCode)) {
        var salesDealingPolicyId = vsflexGrid.TextMatrix(row, col);
        var salesDealingPolicyCode = vsflexGrid.EditText;
        item.trySetSalesDealingPolicyCode(salesDealingPolicyId, salesDealingPolicyCode);
        if (item.modifySalesDealingPolicyId) {
            vsflexGrid.Cell(flexcpBackColor, row, col) = color_lightskyblue;

            TheSameSalesEffectProcess(item, customerPolicyManagementGridColKey.SalesDealingPolicyCode, "", true);
        }
        else {
            vsflexGrid.Cell(flexcpBackColor, row, col) = color_white;
            TheSameSalesEffectProcess(item, customerPolicyManagementGridColKey.SalesDealingPolicyCode, "", false);
        }
    }
    vsflexGrid.Redraw = true;
}

function TheSameSalesEffectProcess(settedDetailItem, modifyFieldName1, modifyFieldName2, needUpdateModifyStatus) {
    var quotePolicyCodeColIndex = vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesQuotePolicyCode);
    var dealingPolicyCodeColIndex = vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesDealingPolicyCode);
    var idColIndex = vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Id);

    var groupItems = (new VBArray(_GroupItems.Items())).toArray();
    for (var index = 0, count = groupItems.length; index < count; index++) {
        var groupItem = groupItems[index];
        var childItems = (new VBArray(groupItem.childItems.Items())).toArray();
        var count2 = childItems.length;
        if (count2 > 0) {
            for (var index2 = 0; index2 < count2; index2++) {
                var childItem = childItems[index2];
                if (settedDetailItem.primaryKey2.substring(0, 36) == childItem.primaryKey2.substring(0, 36)) {
                    var findRow = vsflexGrid.FindRow(childItem.primaryKey, vsflexGrid.FixedRows, idColIndex, true, true);
                    if (findRow > 0) {
                        if (modifyFieldName1 == customerPolicyManagementGridColKey.SalesQuotePolicyCode || modifyFieldName2 == customerPolicyManagementGridColKey.SalesQuotePolicyCode) {
                            if (needUpdateModifyStatus) {
                                childItem.trySetSalesQuotePolicyCode(settedDetailItem.salesQuotePolicyId, settedDetailItem.salesQuotePolicyCode);
                                if (childItem.modifySalesQuotePolicyId) {
                                    vsflexGrid.TextMatrix(findRow, quotePolicyCodeColIndex) = settedDetailItem.salesQuotePolicyId;
                                    vsflexGrid.Cell(flexcpBackColor, findRow, quotePolicyCodeColIndex) = color_lightskyblue;
                                }
                                else {
                                    vsflexGrid.Cell(flexcpBackColor, findRow, quotePolicyCodeColIndex) = color_white;
                                }
                            }
                            else {
                                childItem.setSalesQuotePolicyCodeUnchangeStatus(settedDetailItem.oldSalesQuotePolicyId, settedDetailItem.oldSalesQuotePolicyCode);
                                vsflexGrid.TextMatrix(findRow, quotePolicyCodeColIndex) = settedDetailItem.oldSalesQuotePolicyId;
                                vsflexGrid.Cell(flexcpBackColor, findRow, quotePolicyCodeColIndex) = color_white;
                            }
                        }
                        if (modifyFieldName1 == customerPolicyManagementGridColKey.SalesDealingPolicyCode || modifyFieldName2 == customerPolicyManagementGridColKey.SalesDealingPolicyCode) {
                            if (needUpdateModifyStatus) {
                                childItem.trySetSalesDealingPolicyCode(settedDetailItem.salesDealingPolicyId, settedDetailItem.salesDealingPolicyCode);
                                if (childItem.modifySalesDealingPolicyId) {
                                    vsflexGrid.TextMatrix(findRow, dealingPolicyCodeColIndex) = settedDetailItem.salesDealingPolicyId;
                                    vsflexGrid.Cell(flexcpBackColor, findRow, dealingPolicyCodeColIndex) = color_lightskyblue;
                                }
                                else {
                                    vsflexGrid.Cell(flexcpBackColor, findRow, dealingPolicyCodeColIndex) = color_white;
                                }
                            }
                            else {
                                childItem.setSalesDealingPolicyCodeUnchangeStatus(settedDetailItem.oldSalesDealingPolicyId, settedDetailItem.oldSalesDealingPolicyCode);
                                vsflexGrid.TextMatrix(findRow, dealingPolicyCodeColIndex) = settedDetailItem.oldSalesDealingPolicyId;
                                vsflexGrid.Cell(flexcpBackColor, findRow, dealingPolicyCodeColIndex) = color_white;
                            }
                        }
                    }
                }
            }
        }
    }
}

function TheSameCustomerEffectProcess(settedDetailItem, modifyFieldName1, modifyFieldName2, needUpdateModifyStatus) {
    var quotePolicyCodeColIndex = vsflexGrid.ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode);
    var dealingPolicyCodeColIndex = vsflexGrid.ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode);
    var idColIndex = vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Id);

    var groupItems = (new VBArray(_GroupItems.Items())).toArray();
    for (var index = 0, count = groupItems.length; index < count; index++) {
        var groupItem = groupItems[index];
        var childItems = (new VBArray(groupItem.childItems.Items())).toArray();
        var count2 = childItems.length;
        if (count2 > 0) {
            for (var index2 = 0; index2 < count2; index2++) {
                var childItem = childItems[index2];
                if (settedDetailItem.primaryKey.substring(0, 36) == childItem.primaryKey.substring(0, 36)) {
                    var findRow = vsflexGrid.FindRow(childItem.primaryKey, vsflexGrid.FixedRows, idColIndex, true, true);
                    if (findRow > 0) {
                        if (modifyFieldName1 == customerPolicyManagementGridColKey.QuotePolicyCode || modifyFieldName2 == customerPolicyManagementGridColKey.QuotePolicyCode) {
                            if (needUpdateModifyStatus) {
                                childItem.trySetQuotePolicyCode(settedDetailItem.quotePolicyId, settedDetailItem.quotePolicyCode);
                                if (childItem.modifyQuotePolicyId) {
                                    vsflexGrid.TextMatrix(findRow, quotePolicyCodeColIndex) = settedDetailItem.quotePolicyId;
                                    vsflexGrid.Cell(flexcpBackColor, findRow, quotePolicyCodeColIndex) = color_lightskyblue;
                                }
                                else {
                                    vsflexGrid.Cell(flexcpBackColor, findRow, quotePolicyCodeColIndex) = color_white;
                                }
                            }
                            else {
                                childItem.setQuotePolicyCodeUnchangeStatus(settedDetailItem.oldQuotePolicyId, settedDetailItem.oldQuotePolicyCode);
                                vsflexGrid.TextMatrix(findRow, quotePolicyCodeColIndex) = settedDetailItem.oldQuotePolicyId;
                                vsflexGrid.Cell(flexcpBackColor, findRow, quotePolicyCodeColIndex) = color_white;
                            }
                        }
                        if (modifyFieldName1 == customerPolicyManagementGridColKey.DealingPolicyCode || modifyFieldName2 == customerPolicyManagementGridColKey.DealingPolicyCode) {
                            if (needUpdateModifyStatus) {
                                childItem.trySetDealingPolicyCode(settedDetailItem.dealingPolicyId, settedDetailItem.dealingPolicyCode);
                                if (childItem.modifyDealingPolicyId) {
                                    vsflexGrid.TextMatrix(findRow, dealingPolicyCodeColIndex) = settedDetailItem.dealingPolicyId;
                                    vsflexGrid.Cell(flexcpBackColor, findRow, dealingPolicyCodeColIndex) = color_lightskyblue;
                                }
                                else {
                                    vsflexGrid.Cell(flexcpBackColor, findRow, dealingPolicyCodeColIndex) = color_white;
                                }
                            }
                            else {
                                childItem.setDealingPolicyCodeUnchangeStatus(settedDetailItem.oldDealingPolicyId, settedDetailItem.oldDealingPolicyCode);
                                vsflexGrid.TextMatrix(findRow, dealingPolicyCodeColIndex) = settedDetailItem.oldDealingPolicyId;
                                vsflexGrid.Cell(flexcpBackColor, findRow, dealingPolicyCodeColIndex) = color_white;
                            }
                        }
                    }
                }
            }
        }        
    }
}

//childItem.modifySelected = false;
//childItem.modifyQuotePolicyId = false;
//childItem.modifyDealingPolicyId = false;

//vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode)) = color_white;
//vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode)) = color_white;



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
        case "CustomerCode":
            objASortValue = objA.customerCode;
            objBSortValue = objB.customerCode;
            break;
        case "QuotePolicyCode":
            objASortValue = objA.quotePolicyCode;
            objBSortValue = objB.quotePolicyCode;
            break;
        case "DealingPolicyCode":
            objASortValue = objA.dealingPolicyCode;
            objBSortValue = objB.dealingPolicyCode;
            break;
        case "Select":
            objASortValue = objA.selected;
            objBSortValue = objB.selected;
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

function CustomerPolicyManagementGrid_BeforeSort(col, order) {
    if (window.document.all._OutlineSelect.selectedIndex == 1) return;
    if (col < vsflexGrid.FixedCols) return;

    sortedColKey = vsflexGrid.ColKey(col);
    sortedOrder = (order == 1) ? "ASC" : "DESC";

    vsflexGrid.Redraw = false;
    FillGroupDataToGrid();
    vsflexGrid.Redraw = true;
}

function CustomerPolicyManagementGrid_AfterCollapse(row, state) {
    if (state != 0) return;
    GetDetails(row);
}

function CustomerPolicyManagementGrid_KeyDown(keyCode, shift) {
    if (keyCode == 13) {
        Collapse();
    }
    return (false);
}

function Collapse() {
    with (vsflexGrid) {
        if (Col < FixedCols) return false;
        if (Row < FixedRows) return false;
        if (Col == ColIndex(customerPolicyManagementGridColKey.Code)) {
            if (IsCollapsed(Row) == flexOutlineCollapsed) {
                IsCollapsed(Row) = flexOutlineExpanded;
            }
            else {
                IsCollapsed(Row) = flexOutlineCollapsed;
            }
            return true;
        }
        else if (Col == ColIndex(customerPolicyManagementGridColKey.Select)) {
            return true;
        }
    }
    return false;
}

function IsSelectBlackListAccount() {
    return window._BlackListCheckBox.checked;
}

var timeOutId = null;
var listCalls = new ActiveXObject("Scripting.Dictionary");
function Query(queryType) {
    getDataComplete = false;
    vsflexGrid.Rows = vsflexGrid.FixedRows;
    var quotePolicyId = null;
    var dealingPolicyId = null;
    var accountGroupId = null;
    var isSelectBlackListAccount = false;
    if (queryType == 0) {
        isSelectBlackListAccount = IsSelectBlackListAccount();
    }
    else if (queryType == 1) {
        if (window._QuotePolicySelect.value != "") {
            quotePolicyId = window._QuotePolicySelect.value;
        }
    }
    else if (queryType == 2) {
        if (window._DealingPolicySelect.value != "") {
            dealingPolicyId = window._DealingPolicySelect.value;
        }
    }
    else {
        if (window._AccountGroupSelect.value != "") {
            accountGroupId = window._AccountGroupSelect.value;
        }
    }
    Service.useService("Service.asmx?WSDL", "service");
    var listCallID = Service.service.callService(GetAccountGroupByPolicyIdResult, "GetAccountGroupByPolicyId", quotePolicyId, dealingPolicyId, accountGroupId, isSelectBlackListAccount, queryType);
    var oParameters = new Object();
    oParameters.quotePolicyId = quotePolicyId;
    oParameters.dealingPolicyId = dealingPolicyId;
    oParameters.accountGroupId = accountGroupId;
    oParameters.isSelectBlackListAccount = isSelectBlackListAccount;
    oParameters.queryType = queryType;
    listCalls.Add(listCallID, oParameters);

    window._QueryByBlackListAccountButton.disabled = true;
    window._QueryByQuotePolicyButton.disabled = true;
    window._QueryByDealingPolicyButton.disabled = true;
    window._QueryByAccountGroupButton.disabled = true;
    timeOutId = window.setTimeout(PolicyTimeOut, 5000);

    function PolicyTimeOut() {
        window._QueryByBlackListAccountButton.disabled = false;
        window._QueryByQuotePolicyButton.disabled = false;
        window._QueryByDealingPolicyButton.disabled = false;
        window._QueryByAccountGroupButton.disabled = false;
        if (timeOutId) { window.clearTimeout(timeOutId); }
    }
}

function GetAccountGroupByPolicyIdResult(result) {
    var oParameters = listCalls.Item(result.id);
    var quotePolicyId = oParameters.quotePolicyId;
    var dealingPolicyId = oParameters.dealingPolicyId;
    var accountGroupId = oParameters.accountGroupId;
    var isSelectBlackListAccount = oParameters.isSelectBlackListAccount;
    var queryType = oParameters.queryType;
    listCalls.Remove(result.id);

    window._QueryByBlackListAccountButton.disabled = false;
    window._QueryByQuotePolicyButton.disabled = false;
    window._QueryByDealingPolicyButton.disabled = false;
    window._QueryByAccountGroupButton.disabled = false;
    if (queryType == 0 && isSelectBlackListAccount != IsSelectBlackListAccount()) return;
    if (queryType == 1 && (window._QuotePolicySelect.value == "" ? null : window._QuotePolicySelect.value) != quotePolicyId) return;
    if (queryType == 2 && (window._DealingPolicySelect.value == "" ? null : window._DealingPolicySelect.value) != dealingPolicyId) return;
    if (queryType == 3 && (window._AccountGroupSelect.value == "" ? null : window._AccountGroupSelect.value) != accountGroupId) return;
    if (timeOutId) { window.clearTimeout(timeOutId); }
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
                FillGroupData(xmlData, quotePolicyId, dealingPolicyId, isSelectBlackListAccount, queryType);
            }
            xmlDoc = null;
        }

        vsflexGrid.Redraw = false;
        vsflexGrid.MousePointer = flexHourglass;
        try {
            FillGroupDataToGrid();
        }
        catch (e)
        { }
        vsflexGrid.MousePointer = flexDefault;
        vsflexGrid.Redraw = true;
    }
    getDataComplete = true;
}

function GetDetails(row) {
    if (getDataComplete) {
        if (row > vsflexGrid.FixedRows) {
            var item = vsflexGrid.RowData(row);
            if (item.category == Category.Group) {
                //if (!item.isGotNext){
                if (item.childItems.Count <= 0) {
                    var groupId = item.id;
                    var quotePolicyId = item.queryConditionQuotePolicyId;
                    var dealingPolicyId = item.queryConditionDealingPolicyId;
                    var isSelectBlackListAccount = item.queryConditionIsSelectBlackListAccount;
                    var queryType = item.queryConditionQueryType;
                    Service.useService("Service.asmx?WSDL", "service");
                    var listCallID = Service.service.callService(GetPolicyListResult, "GetPolicyList", groupId, quotePolicyId, dealingPolicyId, isSelectBlackListAccount, queryType);
                    var oParameters = new Object();
                    oParameters.quotePolicyId = quotePolicyId;
                    oParameters.dealingPolicyId = dealingPolicyId;
                    oParameters.isSelectBlackListAccount = isSelectBlackListAccount;
                    oParameters.queryType = queryType;
                    oParameters.groupItem = item;
                    listCalls.Add(listCallID, oParameters);
                }
            }
        }
    }
}

function GetPolicyListResult(result) {
    var oParameters = listCalls.Item(result.id);
    var quotePolicyId = oParameters.quotePolicyId;
    var dealingPolicyId = oParameters.dealingPolicyId;
    var isSelectBlackListAccount = oParameters.isSelectBlackListAccount;
    var queryType = oParameters.queryType;
    var groupItem = oParameters.groupItem;
    listCalls.Remove(result.id);

    if (result.error) {
        alert("Failed to get detail data!");
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
                FillDetailData(groupItem, xmlData);
            }
            xmlDoc = null;
        }
        groupItem.isGotNext = true;
        vsflexGrid.Redraw = false;
        vsflexGrid.MousePointer = flexHourglass;
        try {
            FillDetailDataToGrid(groupItem);
        }
        catch (e)
        { }
        vsflexGrid.MousePointer = flexDefault;
        vsflexGrid.Redraw = true;
    }
}

//#region Update Item Grid
function RefreshGrid(item) {
    if (item.category == Category.Detail) {
        //Detail
        var findRow = vsflexGrid.FindRow(item.primaryKey, vsflexGrid.FixedRows, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Id), true, true);
        if (findRow > 0) {
            FillRow(vsflexGrid, findRow, item, customerPolicyManagementGridColKey);
        }
        //Account Group
        findRow = vsflexGrid.FindRow(item.parentItem.primaryKey, vsflexGrid.FixedRows, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Id), true, true);
        if (findRow > 0) {
            FillRow(vsflexGrid, findRow, item.parentItem, customerPolicyManagementGridColKey);
        }
    }
    else if (item.category == Category.Group) {
        //Account Group
        var findRow = vsflexGrid.FindRow(item.primaryKey, vsflexGrid.FixedRows, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Id), true, true);
        if (findRow > 0) {
            FillRow(vsflexGrid, findRow, item, customerPolicyManagementGridColKey);
        }
    }
}

function FillGroupDataToGrid() {
    if (_GroupItems == null) return;

    var line = vsflexGrid.FixedRows - 1;

    //Root
    vsflexGrid.Rows = vsflexGrid.FixedRows + 1;
    line++;
    FillRow(vsflexGrid, line, _Root, customerPolicyManagementGridColKey);
    vsflexGrid.Cell(flexcpFontBold, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
    vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightyellow;
    vsflexGrid.FrozenRows = line;

    vsflexGrid.IsSubtotal(line) = true;
    vsflexGrid.RowOutlineLevel(line) = 0;

    //Account Group
    var groupItems = (new VBArray(_GroupItems.Items())).toArray();
    if (window.document.all._OutlineSelect.selectedIndex == 0) {
        groupItems = groupItems.sort(CompareGridSort);
    }
    var count = groupItems.length;
    if (count > 0) {
        vsflexGrid.Rows += count;
        for (var index = 0; index < count; index++) {
            var groupItem = groupItems[index];
            line++;
            FillRow(vsflexGrid, line, groupItem, customerPolicyManagementGridColKey);
            vsflexGrid.Cell(flexcpFontBold, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
            vsflexGrid.Cell(flexcpFontItalic, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = true;
            vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightblue;

            vsflexGrid.IsSubtotal(line) = true;
            vsflexGrid.RowOutlineLevel(line) = 1;

            //Detail
            if (groupItem.isGotNext) {
                var groupItemOutline = vsflexGrid.IsCollapsed(line);
                line = FillDetailItem(vsflexGrid, customerPolicyManagementGridColKey, groupItem, groupItemOutline, line);
            }
            else {
                line++;
                vsflexGrid.AddItem("", line);
                FillRow(vsflexGrid, line, groupItem.getEmptyItem(), customerPolicyManagementGridColKey);
                vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Code)) = color_red;
                vsflexGrid.IsCollapsed(line) = flexOutlineCollapsed; // flexOutlineExpanded;
            }

//            //Detail
//            var childItems = (new VBArray(groupItem.childItems.Items())).toArray();
//            if (window.document.all._OutlineSelect.selectedIndex == 1) {
//                childItems = childItems.sort(CompareGridSort);
//            }
//            var count2 = childItems.length;
//            if (count2 > 0) {
//                vsflexGrid.Rows += count2;
//                for (var index2 = 0; index2 < count2; index2++) {
//                    var childItem = childItems[index2];

//                    line++;
//                    FillRow(vsflexGrid, line, childItem, customerPolicyManagementGridColKey);
//                    vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.FixedCols, line, vsflexGrid.Cols - 1) = color_lightcyan;

//                    vsflexGrid.IsSubtotal(line) = true;
//                    vsflexGrid.RowOutlineLevel(line) = 1;

//                    if (groupItem.isGotNext) {
//                        var groupItemOutline = vsflexGrid.IsCollapsed(line);
//                        line = FillDetailItem(vsflexGrid, customerPolicyManagementGridColKey, childItem, groupItemOutline, line);
//                    }
//                    else {
//                        line++;
//                        vsflexGrid.AddItem("", line);
//                        FillRow(vsflexGrid, line, groupItem.getEmptyItem(), customerPolicyManagementGridColKey);
//                        vsflexGrid.Cell(flexcpForeColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Code)) = color_red;
//                        vsflexGrid.IsCollapsed(line) = flexOutlineCollapsed; // flexOutlineExpanded;
//                    }
//                }
//            }
        }
        vsflexGrid.Outline(GetOutline());
    }
}

function OutlineSelect_Onclick() {
    var selectedIndex = window.document.all._OutlineSelect.selectedIndex;
    //Account Group
    if (selectedIndex == 0) {
        vsflexGrid.Outline(1);
    }
}

function GetOutline() {
    return window.document.all._OutlineSelect.selectedIndex == 0 ? 1 : 0;
}

function FillDetailDataToGrid(groupItem) {
    var findRow = vsflexGrid.FindRow(groupItem.primaryKey, vsflexGrid.FixedRows, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Id), true, true);
    if (findRow > 0) {
        var groupItemOutline = vsflexGrid.IsCollapsed(findRow);
        var line = findRow;

        //remove empty node
        if (findRow + 1 <= vsflexGrid.Rows) {
            var item = vsflexGrid.RowData(findRow + 1);
            if (item.category == Category.Empty) {
                vsflexGrid.RemoveItem(findRow + 1);
            }
        }
        FillDetailItem(vsflexGrid, customerPolicyManagementGridColKey, groupItem, groupItemOutline, findRow);
    }
}

function FillDetailItem(vsflexGrid, customerPolicyManagementGridColKey, groupItem, groupItemOutline, groupItemRow) {
    var line = groupItemRow;
    var childItems = (new VBArray(groupItem.childItems.Items())).toArray();
    var count3 = childItems.length;
    if (count3 > 0) {
        for (var index3 = 0; index3 < count3; index3++) {
            var childItem = childItems[index3];
            line++;
            vsflexGrid.AddItem("", line);
            FillRow(vsflexGrid, line, childItem, customerPolicyManagementGridColKey);
        }
        
        vsflexGrid.IsCollapsed(line) = groupItemOutline == flexOutlineExpanded ? flexOutlineExpanded : flexOutlineSubtotals;
    }
    return line;
}

function FillRow(vsflexGrid, line, item, customerPolicyManagementGridColKey) {
    var prefixEmpty = "";
    if (item.category == Category.Root) {
        prefixEmpty = "";
    }
    else if (item.category == Category.Group) {
        prefixEmpty = "  ";
    }
    else if (item.category == Category.Detail) {
        prefixEmpty = "    ";
    }
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Id)) = item.primaryKey;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Code)) = prefixEmpty + item.code;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.CustomerId)) = item.customerId == null ? "" : item.customerId;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.CustomerCode)) = item.customerCode;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode)) = item.quotePolicyCode;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode)) = item.dealingPolicyCode;
    vsflexGrid.Cell(flexcpChecked, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Select)) = item.selected ? flexChecked : flexUnchecked;

    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesId)) = item.salesId == null ? "" : item.salesId;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesCode)) = item.salesCode;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesQuotePolicyCode)) = item.salesQuotePolicyCode;
    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesDealingPolicyCode)) = item.salesDealingPolicyCode;
    vsflexGrid.Cell(flexcpChecked, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SaleSelect)) = item.salesSelected ? flexChecked : flexUnchecked; ;
    vsflexGrid.RowData(line) = item;
    vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode)) = (item.modifyQuotePolicyId) ? color_lightskyblue : color_white;
    vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode)) = (item.modifyDealingPolicyId) ? color_lightskyblue : color_white;
    vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesQuotePolicyCode)) = (item.modifySalesQuotePolicyId) ? color_lightskyblue : color_white;
    vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesDealingPolicyCode)) = (item.modifySalesDealingPolicyId) ? color_lightskyblue : color_white;

}
//#endregion Update Item Grid

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

var _Root = null;
var _GroupItems = null;
function FillGroupData(xmlData, queryConditionQuotePolicyId, queryConditionDealingPolicyId, queryConditionIsSelectBlackListAccount, queryConditionQueryType) {
    _Root = new Item();
    _Root.Instance(Category.Root, queryConditionQuotePolicyId, queryConditionDealingPolicyId, queryConditionIsSelectBlackListAccount, queryConditionQueryType, "10000000-0000-0000-0000-100000000001");
    _Root.code = "Root";
    
    _GroupItems = new ActiveXObject("Scripting.Dictionary"); //key=id value=Item

    if (xmlData == null) return;
    var xmlRows = xmlData.childNodes;
    for (var i = 0, length = xmlRows.length; i < length; i++) {
        var xmlRow = xmlRows.item(i);
        var item = new Item();
        item.UpdateByXmlNode(null,Category.Group, queryConditionQuotePolicyId, queryConditionDealingPolicyId, queryConditionIsSelectBlackListAccount,queryConditionQueryType, xmlRow);
        _GroupItems.Add(item.primaryKey, item);
    }
}

function FillDetailData(groupItem, xmlData) {
    if (xmlData == null) return;
    var xmlRows = xmlData.childNodes;
    for (var i = 0, length = xmlRows.length; i < length; i++) {
        var xmlRow = xmlRows.item(i);
        var item = new Item();
        item.UpdateByXmlNode(groupItem, Category.Detail, groupItem.queryConditionQuotePolicyId, groupItem.queryConditionDealingPolicyId, groupItem.queryConditionIsSelectBlackListAccount, groupItem.queryConditionQueryType, xmlRow);
        groupItem.AddItemRelation(item);
    }
}

function RefreshGridChildItemSelect(item, selected) {
    //Set child selected
    if (item.childItems.Count > 0) {
        var childItems = (new VBArray(item.childItems.Items())).toArray();
        for (var index = 0, count = childItems.length; index < count; index++) {
            var childItem = childItems[index];
            //Refresh Grid
            var findRow = vsflexGrid.FindRow(childItem.primaryKey, vsflexGrid.FixedRows, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Id), true, true);
            if (findRow > 0) {
                vsflexGrid.Cell(flexcpChecked, findRow, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Select)) = childItem.selected ? flexChecked : flexUnchecked;
                vsflexGrid.Cell(flexcpChecked, findRow, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SaleSelect)) = childItem.salesSelected ? flexChecked : flexUnchecked;
            }

            RefreshGridChildItemSelect(childItem, selected);
        }
    }
}
//#endregion Update Item

//#region Data Structure---------------------------------------
//AccountGroupId, AccountGroupCode
//CustomerId,    AccountCode+CustomerCode, Select, QuotePolicyCode, DealingPolicyCode

var Category = new Category();
function Category() {
    this.Empty = -1;
    this.Root = 0;
    this.Group = 1;
    this.Detail = 2;
}

function Item() {
    this.id;    //For Group: GroupID, For Detail: AccountID
    this.code;  //For Group: GroupCode, For Detail: AccountCode
    this.customerId = null;
    this.customerCode = "";
    //add by Erric
    this.salesID = null;
    this.salesCode = "";
    this.category;

    this.quotePolicyId = null;
    this.quotePolicyCode = "";
    this.dealingPolicyId = null;
    this.dealingPolicyCode = "";

    this.oldQuotePolicyId = null;
    this.oldQuotePolicyCode = "";
    this.oldDealingPolicyId = null;
    this.oldDealingPolicyCode = "";

    //add by Erric
    this.salesQuotePolicyId = null;
    this.salesQuotePolicyCode = "";
    this.salesDealingPolicyId = null;
    this.salesDealingPolicyCode = "";

    this.oldSalesQuotePolicyId = null;
    this.oldSalesQuotePolicyCode = "";
    this.oldSalesDealingPolicyId = null;
    this.oldSalesDealingPolicyCode = "";
    //-------

    this.queryConditionQuotePolicyId = null;
    this.queryConditionDealingPolicyId = null;
    this.queryConditionIsSelectBlackListAccount = true;
    this.queryConditionQueryType;

    this.selected = true;
    this.salesSelected = false;
    this.isGotNext = false;
    this.parentItem = null;
    this.childItems = new ActiveXObject("Scripting.Dictionary"); //key=id value=Item
    this.salesChildItems = new ActiveXObject("Scripting.Dictionary"); //key=id value=Item

    this.modifySelected = false;
    this.modifySalesSelected = false;
    this.modifyQuotePolicyId = false;
    this.modifySalesQuotePolicyId = false;
    this.modifyDealingPolicyId = false;
    this.modifySalesDealingPolicyId = false;


    this.primaryKey;
    this.primaryKey2;
    this.setPrimaryKey = function () {
        if (this.category == Category.Detail) {
            this.primaryKey = this.customerId + "-" + this.id + "-" + this.parentItem.id;
        }
        else {
            this.primaryKey = this.id;
        }
    };
    this.setPrimaryKey2 = function () {
        if (this.category == Category.Detail) {
            this.primaryKey2 = this.salesID + "-" + this.id + "-" + this.parentItem.id;
        }
        else {
            this.primaryKey2 = this.id;
        }
    };

    this.modified = function () {
        return this.selected && (this.modifyQuotePolicyId || this.modifyDealingPolicyId);
    };
    this.modifySalesPolicy = function(){
       return this.salesSelected && (this.modifySalesQuotePolicyId || this.modifySalesDealingPolicyId);
    };
    this.resetStatus = function () {
        this.modifySelected = false;
        this.modifyQuotePolicyId = false;
        this.modifySalesQuotePolicyId = false;
        this.modifySalesDealingPolicyId = false;
        this.modifyDealingPolicyId = false;
        this.oldQuotePolicyId = this.quotePolicyId;
        this.oldQuotePolicyCode = this.quotePolicyCode;
        this.oldDealingPolicyId = this.dealingPolicyId;
        this.oldDealingPolicyCode = this.dealingPolicyCode;
        this.oldSalesQuotePolicyId = this.salesQuotePolicyId;
        this.oldSalesQuotePolicyCode = this.salesQuotePolicyCode;
        this.oldSalesDealingPolicyId = this.salesDealingPolicyId;
        this.oldSalesDealingPolicyCode = this.salesDealingPolicyCode;
    };

    this.setQuotePolicyCodeUnchangeStatus = function (quotePolicyId, quotePolicyCode) {
        this.quotePolicyId = quotePolicyId;
        this.quotePolicyCode = quotePolicyCode;
        this.oldQuotePolicyId = quotePolicyId;
        this.oldQuotePolicyCode = quotePolicyCode;
        this.modifyQuotePolicyId = false;
    };
    this.setSalesQuotePolicyCodeUnchangeStatus = function (salesQuotePolicyId, salesQuotePolicyCode) {
        this.salesQuotePolicyId = salesQuotePolicyId;
        this.salesQuotePolicyCode = salesQuotePolicyCode;
        this.oldSalesQuotePolicyId = salesQuotePolicyId;
        this.oldSalesQuotePolicyCode = salesQuotePolicyCode;
        this.modifySalesQuotePolicyId = false;
    };
    this.trySetSalesQuotePolicyCode = function (salesQuotePolicyId, salesQuotePolicyCode) {
        if (this.oldSalesQuotePolicyId.toLowerCase() != salesQuotePolicyId.toLowerCase()) {
            this.salesQuotePolicyId = salesQuotePolicyId;
            this.salesQuotePolicyCode = salesQuotePolicyCode;
            this.modifySalesQuotePolicyId = true;
        }
        else {
            this.modifySalesQuotePolicyId = false;
        }
    };

    this.trySetQuotePolicyCode = function (quotePolicyId, quotePolicyCode) {
        if (this.oldQuotePolicyId.toLowerCase() != quotePolicyId.toLowerCase()) {
            this.quotePolicyId = quotePolicyId;
            this.quotePolicyCode = quotePolicyCode;
            this.modifyQuotePolicyId = true;
        }
        else {
            this.modifyQuotePolicyId = false;
        }
    };

    this.setDealingPolicyCodeUnchangeStatus = function (dealingPolicyId, dealingPolicyCode) {
        this.dealingPolicyId = dealingPolicyId;
        this.dealingPolicyCode = dealingPolicyCode;
        this.oldDealingPolicyId = this.dealingPolicyId;
        this.oldDealingPolicyCode = this.dealingPolicyCode;
        this.modifyDealingPolicyId = false;
    };
    this.setSalesDealingPolicyCodeUnchangeStatus = function (salesDealingPolicyId, salesDealingPolicyCode) {
        this.salesDealingPolicyId = salesDealingPolicyId;
        this.salesDealingPolicyCode = salesDealingPolicyCode;
        this.oldSalesDealingPolicyId = this.salesDealingPolicyId;
        this.oldSalesDealingPolicyCode = this.salesDealingPolicyCode;
        this.modifySalesDealingPolicyId = false;
    };
    this.trySetSalesDealingPolicyCode = function (salesDealingPolicyId, salesDealingPolicyCode) {
        if (this.oldSalesDealingPolicyId.toLowerCase() != salesDealingPolicyId.toLowerCase()) {
            this.salesDealingPolicyId = salesDealingPolicyId;
            this.salesDealingPolicyCode = salesDealingPolicyCode;
            this.modifySalesDealingPolicyId = true;
        }
        else {
            this.modifySalesDealingPolicyId = false;
        }
    };
    this.trySetDealingPolicyCode = function (dealingPolicyId, dealingPolicyCode) {
        if (this.oldDealingPolicyId.toLowerCase() != dealingPolicyId.toLowerCase()) {
            this.dealingPolicyId = dealingPolicyId;
            this.dealingPolicyCode = dealingPolicyCode;
            this.modifyDealingPolicyId = true;
        }
        else {
            this.modifyDealingPolicyId = false;
        }
    };

    this.setChildItemSelected = function (selected) {
        var childItems = (new VBArray(this.childItems.Items())).toArray();
        for (var index = 0, count = childItems.length; index < count; index++) {
            var childItem = childItems[index];
            childItem.setSelected(selected);
        }
    };
    this.setSalesChildItemSelected = function (selected) {
        var childItems = (new VBArray(this.childItems.Items())).toArray();
        for (var index = 0, count = childItems.length; index < count; index++) {
            var childItem = childItems[index];
            childItem.setSalesSelected(selected);
        }
    };
    this.setSalesSelected = function (selected) {
        this.salesSelected = selected;
        this.modifySalesSelected = true;
        this.setSalesChildItemSelected(selected);
    };
    this.setSelected = function (selected) {
        this.selected = selected;
        this.modifySelected = true;
        this.setChildItemSelected(selected);
    };
    
    this.AddItemRelation = function (item) {
        this.childItems.Add(item.primaryKey, item);
        this.salesChildItems.Add(item.primaryKey2, item);
    };

    this.getEmptyItem = function () {
        var emptyItem = new Item();
        emptyItem.Instance(Category.Empty, this.queryConditionQuotePolicyId, this.queryConditionDealingPolicyId, this.queryConditionIsSelectBlackListAccount,this.queryConditionQueryType, '00000000-0000-0000-0000-000000000000');
        emptyItem.code = "Loading...";
        return emptyItem;
    };

    this.Instance = function (category, queryConditionQuotePolicyId, queryConditionDealingPolicyId, queryConditionIsSelectBlackListAccount, queryConditionQueryType, id) {
        this.id = id;
        this.category = category;
        this.SetQueryCondition(queryConditionQuotePolicyId, queryConditionDealingPolicyId, queryConditionIsSelectBlackListAccount, queryConditionQueryType);
        this.setPrimaryKey();
        this.setPrimaryKey2();
    };

    this.SetQueryCondition = function (queryConditionQuotePolicyId, queryConditionDealingPolicyId, queryConditionIsSelectBlackListAccount, queryConditionQueryType) {
        this.queryConditionQuotePolicyId = queryConditionQuotePolicyId;
        this.queryConditionDealingPolicyId = queryConditionDealingPolicyId;
        this.queryConditionIsSelectBlackListAccount = queryConditionIsSelectBlackListAccount;
        this.queryConditionQueryType = queryConditionQueryType;
    };

    this.UpdateByXmlNode = function (parentItem, category, queryConditionQuotePolicyId, queryConditionDealingPolicyId, queryConditionIsSelectBlackListAccount, queryConditionQueryType, xmlRow) {
        this.category = category;
        this.SetQueryCondition(queryConditionQuotePolicyId, queryConditionDealingPolicyId, queryConditionIsSelectBlackListAccount, queryConditionQueryType);
        this.parentItem = parentItem;

        var xmlRowColumns = xmlRow.childNodes;
        for (var i = 0, length = xmlRowColumns.length; i < length; i++) {
            var column = xmlRowColumns.item(i);
            var fieldName = column.tagName;
            var value = column.text;
            switch (fieldName) {
                case "ID":
                    this.id = value;
                    break;
                case "CustomerID":
                    this.customerId = value;
                    break;
                case "CustomerCode":
                    this.customerCode = value;
                    break;
                case "Code":
                    this.code = value;
                    break;
                case "QuotePolicyId":
                    this.quotePolicyId = value;
                    this.oldQuotePolicyId = value;
                    break;
                case "QuotePolicyCode":
                    this.quotePolicyCode = value;
                    this.oldQuotePolicyCode = value;
                    break;
                case "DealingPolicyId":
                    this.dealingPolicyId = value;
                    this.oldDealingPolicyId = value;
                    break;
                case "DealingPolicyCode":
                    this.dealingPolicyCode = value;
                    this.oldDealingPolicyCode = value;
                    break;
                case "SalesID":
                    this.salesID = value;
                    break;
                case "SalesCode":
                    this.salesCode = value;
                    break;
                case "SalesQuotePolicyId":
                    this.salesQuotePolicyId = value;
                    this.oldSalesQuotePolicyId = value;
                    break;
                case "SalesQuotePolicyCode":
                    this.salesQuotePolicyCode = value;
                    this.oldSalesQuotePolicyCode = value;
                    break;
                case "SalesDealingPolicyId":
                    this.salesDealingPolicyId = value;
                    this.oldSalesDealingPolicyId = value;
                    break;
                case "SalesDealingPolicyCode":
                    this.salesDealingPolicyCode = value;
                    this.oldSalesDealingPolicyCode = value;
                    break;
            }
        }
        this.setPrimaryKey();
        this.setPrimaryKey2();
    };
}

//#endregion Data Structure---------------------------------------

function GetQuotationFrm() {
    //return window.dialogArguments.parent.quotationFrm;
    return window.top.opener.parent.quotationFrm;
}

var customerPolicyManagementPageLoaded = false;
function CustomerPolicyManagementForm_Onload() {
    vsflexGrid = window._CustomerPolicyManagementGrid;
    quotationFrm = GetQuotationFrm();
    customerPolicyManagementGridColKey = quotationFrm.customerPolicyManagementGridColKey;
    customerPolicyManagementGridLanguage = quotationFrm.customerPolicyManagementGridLanguage;

    Init();    
}

function CustomerPolicyManagementForm_Onunload() {
    //    if (window.dialogArguments && window.dialogArguments.oWndCustomerPolicyManagement)
    //        window.dialogArguments.oWndCustomerPolicyManagement = null;
    //    if (window.top.opener && window.top.opener.oWndCustomerPolicyManagement)
    //        window.top.opener.oWndCustomerPolicyManagement = null;
}

function QuotePolicySelectInit(control,needAll) {
    control.clearAttributes();
    control.options.length = 0;
    var oOption;
    if (needAll) {
        oOption = document.createElement("OPTION");
        oOption.text = "All";
        oOption.value = "";
        oOption.selected = 0;
        control.add(oOption);
    }

    var quotePolicys = quotationFrm.oQuotePolicys;
    if (quotePolicys) {
        var quotePolicys = (new VBArray(quotePolicys.Items())).toArray();
        for (var index = 0, count = quotePolicys.length; index < count; index++) {
            var quotePolicy = quotePolicys[index];
            oOption = document.createElement("OPTION");
            oOption.text = quotePolicy.code;
            oOption.value = quotePolicy.id;
            if (quotePolicy.isDefault && !needAll) {
                control.add(oOption, 0);
                oOption.selected = true;
            }
            else
                control.add(oOption);
        }
    }
}

function SortFun(objA, objB) {
    if (objA.code > objB.code)
        return 1;
    else if (objA.code < objB.code)
        return -1;
    else
        return 0;
}

function QueryByBlackListAccountButton_Onclick() {
    Query(0);
}

function QueryByQuotePolicyButton_Onclick() {
    if (window._QuotePolicySelect.value == "") {
        alert("Please select Quote Policy to query.");
        return;
    }
    Query(1);
}

function ReplaceWithQuotePolicyButton_Onclick() {
    if (_GroupItems == null) return;
    var selectedIndex = window._ReplaceWithQuotePolicySelect.selectedIndex;
    if (selectedIndex < 0) return;
    var replaceWithQuotePolicyIdSelect = window._ReplaceWithQuotePolicySelect.value;
    var replaceWithQuotePolicyCodeSelect = window._ReplaceWithQuotePolicySelect.options[selectedIndex].text;

    vsflexGrid.Redraw = false;
    var groupItems = (new VBArray(_GroupItems.Items())).toArray();
    for (var index = 0, count = groupItems.length; index < count; index++) {
        var groupItem = groupItems[index];
        var childItems = (new VBArray(groupItem.childItems.Items())).toArray();
        var count2 = childItems.length;
        if (count2 > 0) {
            for (var index2 = 0; index2 < count2; index2++) {
                var childItem = childItems[index2];
                if (childItem.selected) {
                    childItem.trySetQuotePolicyCode(replaceWithQuotePolicyIdSelect, replaceWithQuotePolicyCodeSelect);
                    if (childItem.modifyQuotePolicyId) {
                        TheSameCustomerEffectProcess(childItem, customerPolicyManagementGridColKey.QuotePolicyCode, "", true);
                    }
                    else {
                        TheSameCustomerEffectProcess(childItem, customerPolicyManagementGridColKey.QuotePolicyCode, "", false);
                    }        
                }
                if (childItem.salesSelected && window.document.all._IsApplyEmployChk.checked) {
                    childItem.trySetSalesQuotePolicyCode(replaceWithQuotePolicyIdSelect, replaceWithQuotePolicyCodeSelect);
                    if (childItem.modifySalesQuotePolicyId) {
                        TheSameSalesEffectProcess(childItem, customerPolicyManagementGridColKey.SalesQuotePolicyCode, "", true);
                    }
                    else {
                        TheSameSalesEffectProcess(childItem, customerPolicyManagementGridColKey.SalesQuotePolicyCode, "", false);
                    }
                }
            }
        }
    }

    for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
        var item = vsflexGrid.RowData(line);
        if (item.category == Category.Detail && item.selected) {
            vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode)) = replaceWithQuotePolicyCodeSelect; // replaceWithQuotePolicyIdSelect;
            vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode)) = (item.modifyQuotePolicyId) ? color_lightskyblue : color_white;
        }
        if (item.category == Category.Detail && item.salesSelected && window.document.all._IsApplyEmployChk.checked) {
            vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesQuotePolicyCode)) = replaceWithQuotePolicyCodeSelect; // replaceWithQuotePolicyIdSelect;
            vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesQuotePolicyCode)) = (item.modifySalesQuotePolicyId) ? color_lightskyblue : color_white;
        }
    }
    vsflexGrid.Redraw = true;
}

function QueryByDealingPolicyButton_Onclick() {
    if (window._DealingPolicySelect.value == "") {
        alert("Please select Dealing Policy to query.");
        return;
    }
    Query(2);
}

function QueryByAccountGroupButton_Onclick() {
//    if (window._AccountGroupSelect.value == "") {
//        alert("Please select Account Group to query.");
//        return;
//    }
    Query(3);
}

function ReplaceWithDealingPolicyButton_Onclick() {
    if (_GroupItems == null) return;
    var selectedIndex = window._ReplaceWithDealingPolicySelect.selectedIndex;
    if (selectedIndex < 0) return;
    var replaceWithDealingPolicyIdSelect = window._ReplaceWithDealingPolicySelect.value;
    var replaceWithDealingPolicyCodeSelect = window._ReplaceWithDealingPolicySelect.options[selectedIndex].text;

    vsflexGrid.Redraw = false;
    var groupItems = (new VBArray(_GroupItems.Items())).toArray();
    for (var index = 0, count = groupItems.length; index < count; index++) {
        var groupItem = groupItems[index];
        var childItems = (new VBArray(groupItem.childItems.Items())).toArray();
        var count2 = childItems.length;
        if (count2 > 0) {
            for (var index2 = 0; index2 < count2; index2++) {
                var childItem = childItems[index2];
                if (childItem.selected) {
                    childItem.trySetDealingPolicyCode(replaceWithDealingPolicyIdSelect, replaceWithDealingPolicyCodeSelect);
                    if (childItem.modifyDealingPolicyId) {
                        TheSameCustomerEffectProcess(childItem, customerPolicyManagementGridColKey.DealingPolicyCode, "", true);
                    }
                    else {
                        TheSameCustomerEffectProcess(childItem, customerPolicyManagementGridColKey.DealingPolicyCode, "", false);
                    }
                }
                //add 2013-02-22
                if (childItem.salesSelected && window.document.all._IsApplyEmployChk.checked) {
                    childItem.trySetSalesDealingPolicyCode(replaceWithDealingPolicyIdSelect, replaceWithDealingPolicyCodeSelect);
                    if (childItem.modifySalesDealingPolicyId) {
                        TheSameSalesEffectProcess(childItem, customerPolicyManagementGridColKey.SalesDealingPolicyCode, "", true);
                    }
                    else {
                        TheSameSalesEffectProcess(childItem, customerPolicyManagementGridColKey.SalesDealingPolicyCode, "", false);
                    }
                }
            }
        }
    }

    for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
        var item = vsflexGrid.RowData(line);
        if (item.category == Category.Detail && item.selected) {
            vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode)) = replaceWithDealingPolicyCodeSelect; // replaceWithDealingPolicyIdSelect;
            vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode)) = (item.modifyDealingPolicyId) ? color_lightskyblue : color_white;
        }
        if (item.category == Category.Detail && item.salesSelected && window.document.all._IsApplyEmployChk.checked) {
            vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesDealingPolicyCode)) = replaceWithDealingPolicyCodeSelect; // replaceWithQuotePolicyIdSelect;
            vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesDealingPolicyCode)) = (item.modifySalesDealingPolicyId) ? color_lightskyblue : color_white;
        }
    }
    vsflexGrid.Redraw = true;
}
function SetSaleSelected(selected) {
    if (_GroupItems == null) return;
    var groupItems = (new VBArray(_GroupItems.Items())).toArray();
    for (var index = 0, count = groupItems.length; index < count; index++) {
        var groupItem = groupItems[index];
        groupItem.setSalesSelected(selected);

    }
    vsflexGrid.Redraw = false;
    for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
        var item = vsflexGrid.RowData(line);
        vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SaleSelect)) = selected;
    }
    vsflexGrid.Redraw = true;
};

function SetSelected(selected) {
    if (_GroupItems == null) return;
    var groupItems = (new VBArray(_GroupItems.Items())).toArray();
    for (var index = 0, count = groupItems.length; index < count; index++) {
        var groupItem = groupItems[index];
        groupItem.setSelected(selected);
        
//        var childItems = (new VBArray(groupItem.childItems.Items())).toArray();
//        var count2 = childItems.length;
//        if (count2 > 0) {
//            for (var index2 = 0; index2 < count2; index2++) {
//                var childItem = childItems[index2];
//                childItem.selected = selected;
//                childItem.modifySelected = true;
//            }
//        }
    }
    vsflexGrid.Redraw = false;
    for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
        var item = vsflexGrid.RowData(line);
        vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.Select)) = selected;
    }
    vsflexGrid.Redraw = true;
}

function SaveButton_Onclick() {
    if (_GroupItems == null) {
        alert("No data to update!");
        return;
    }
    var customerXmls = "";
    var employeeXmls = "";
    var groupItems = (new VBArray(_GroupItems.Items())).toArray();
    var customerIDs = new ActiveXObject("Scripting.Dictionary"); //key=id value="";
    var employeeIDs = new ActiveXObject("Scripting.Dictionary"); //key=id value="";
    for (var index = 0, count = groupItems.length; index < count; index++) {
        var groupItem = groupItems[index];
        var childItems = (new VBArray(groupItem.childItems.Items())).toArray();
        var count2 = childItems.length;
        if (count2 > 0) {
            for (var index2 = 0; index2 < count2; index2++) {
                var childItem = childItems[index2];
                if (childItem.modified() && !customerIDs.Exists(childItem.customerId)) {
                   
                    var xml = "<Customer ";
                    xml += "ID" + "=\"" + childItem.customerId + "\" ";
                    if (childItem.modifyQuotePolicyId) {
                        xml += "PrivateQuotePolicyID" + "=\"" + childItem.quotePolicyId + "\" ";
                    }
                    if (childItem.modifyDealingPolicyId) {
                        xml += "DealingPolicyID" + "=\"" + (childItem.dealingPolicyId == "00000000-0000-0000-0000-000000000000" ? "" : childItem.dealingPolicyId) + "\" ";
                    }
                    xml += "/>";
                    customerXmls += xml;
                    customerIDs.Add(childItem.customerId,"");
                }
                if (childItem.modifySalesPolicy() && !employeeIDs.Exists(childItem.salesID)) {
                    //For Employee
                    var employeeXml = "<Employee ";
                    employeeXml += "ID" + "=\"" + childItem.salesID + "\" ";
                    if (childItem.modifySalesQuotePolicyId) {
                        employeeXml += "EmployeeQuotePolicyID" + "=\"" + childItem.salesQuotePolicyId + "\" ";
                    }
                    if (childItem.modifySalesDealingPolicyId) {
                        employeeXml += "EmployeeDealingPolicyID" + "=\"" + (childItem.salesDealingPolicyId == "00000000-0000-0000-0000-000000000000" ? "" : childItem.salesDealingPolicyId) + "\" ";
                    }
                    employeeXml += "/>";
                    employeeXmls += employeeXml;
                    employeeIDs.Add(childItem.salesID, "");
                }
            }
        }
    }
    if (customerXmls != "") {
        customerXmls = "<Customers>" + customerXmls + "</Customers>";
    }
    if (employeeXmls != "") {
        employeeXmls = "<Employees>" + employeeXmls + "</Employees>";
    }
    if (customerXmls != "" || employeeXmls != "") {
        quotationFrm.oDealingConsole.UpdatePolicyProcess(window, customerXmls, employeeXmls);
    }
    else {
        alert("No data to update!");
        return;
    }
}

function AfterSavedProcess(isSucceed) {
    if (isSucceed) {
        if (_GroupItems == null) return;
        vsflexGrid.Redraw = false;
        var groupItems = (new VBArray(_GroupItems.Items())).toArray();
        for (var index = 0, count = groupItems.length; index < count; index++) {
            var groupItem = groupItems[index];
            var childItems = (new VBArray(groupItem.childItems.Items())).toArray();
            var count2 = childItems.length;
            if (count2 > 0) {
                for (var index2 = 0; index2 < count2; index2++) {
                    var childItem = childItems[index2];
                    if (childItem.modified()) {
                        childItem.resetStatus();

                        TheSameCustomerEffectProcess(childItem, customerPolicyManagementGridColKey.QuotePolicyCode, customerPolicyManagementGridColKey.DealingPolicyCode, false);
                    }
                    if (childItem.modifySalesPolicy()) {
                        childItem.resetStatus();
                        TheSameSalesEffectProcess(childItem, customerPolicyManagementGridColKey.SalesQuotePolicyCode, customerPolicyManagementGridColKey.SalesDealingPolicyCode, false);
                    }

                }
            }
        }

        for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
            var item = vsflexGrid.RowData(line);
            if (item.category == Category.Detail && item.selected) {
                vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.QuotePolicyCode)) = color_white;
                vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.DealingPolicyCode)) = color_white;
                vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesQuotePolicyCode)) = color_white;
                vsflexGrid.Cell(flexcpBackColor, line, vsflexGrid.ColIndex(customerPolicyManagementGridColKey.SalesDealingPolicyCode)) = color_white;
            }
        }
        vsflexGrid.Redraw = true;

        alert("Succeed to Update Policy!");
    }
    else {
        alert("Failed to Update Policy!");
    }
}