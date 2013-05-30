var _FormatFloatDecimal = 2;
var _RootGNPId = "10000000-0000-0000-0000-100000000001";
var _EmptyGNPSummaryGroupId = '00000000-0000-0000-0000-000000000000';
var _EmptyGNPSummaryGroupCode = 'Other Group';   //FOR SORT

function GroupNetPositionInit() {
    GroupNetPositionGridInit();
    QueryGroupNetPositionForModifySetTimeout();
}

function GroupNetPositionGridInit() {
    var columnIndex = 0;

    with (window._GroupNetPositionGrid) {
        FixedCols = 0;
        FixedRows = 2;
        Cols = 4;
        Rows = FixedRows;

        ColKey(columnIndex) = "GroupCode";
        ColWidth(columnIndex) = 1500;
        FixedAlignment(columnIndex) = flexAlignCenterCenter;
        ColAlignment(columnIndex) = flexAlignLeftCenter;
        TextMatrix(0, columnIndex) = "Group";
        TextMatrix(1, columnIndex) = "Group";
        columnIndex++;

        ColKey(columnIndex) = "Selected";
        ColWidth(columnIndex) = 400;
        FixedAlignment(columnIndex) = flexAlignCenterCenter;
        ColAlignment(columnIndex) = flexAlignCenterCenter;
        TextMatrix(0, columnIndex) = "X";
        TextMatrix(1, columnIndex) = "X";
        columnIndex++;

        ColKey(columnIndex) = "OIPercent";
        ColWidth(columnIndex) = 400;
        FixedAlignment(columnIndex) = flexAlignCenterCenter;
        ColAlignment(columnIndex) = flexAlignCenterCenter;
        TextMatrix(0, columnIndex) = "%";
        TextMatrix(1, columnIndex) = "%";
        columnIndex++;

        ColKey(columnIndex) = "GroupId";
        ColWidth(columnIndex) = 1500;
        FixedAlignment(columnIndex) = flexAlignCenterCenter;
        ColAlignment(columnIndex) = flexAlignRightCenter;
        TextMatrix(0, columnIndex) = "GroupId";
        TextMatrix(1, columnIndex) = "GroupId";
        ColHidden(columnIndex) = true;
        columnIndex++;

        Cols = columnIndex;

        FrozenCols = 4;
        ExtendLastCol = false;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSortAndMove; // flexExMove;
        SelectionMode = flexSelectionFree;
        OutlineBar = flexOutlineBarComplete;
        Editable = flexEDNone;
        Ellipsis = flexEllipsisEnd;

        MergeCells = flexMergeFixedOnly;
        MergeCol(colIndex("GroupCode")) = true;
        MergeCol(colIndex("Selected")) = true;
        MergeCol(colIndex("OIPercent")) = true;
        MergeRow(0) = true;
    }
}

function GroupNetPositionGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    var vsflexGrid = window._GroupNetPositionGrid;
    if (newRow < vsflexGrid.FixedRows || newCol < vsflexGrid.FixedCols) return;

    switch (vsflexGrid.ColKey(newCol)) {
        case "Selected":
        case "OIPercent":
            var groupingGNP = vsflexGrid.RowData(newRow);
            if (groupingGNP.id != _RootGNPId && groupingGNP.groupingGNPType == GroupingGNPType.AccountGroup) {
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

function GroupNetPositionGrid_OnAfterEdit(row, col, cancel) {
    var vsflexGrid = window._GroupNetPositionGrid;
    if (row < vsflexGrid.FixedRows || col < vsflexGrid.FixedCols) return;

    var groupingGNP = vsflexGrid.RowData(row);
    if (groupingGNP.id != _RootGNPId && groupingGNP.groupingGNPType == GroupingGNPType.AccountGroup) {
        vsflexGrid.Redraw = false;
        if (col == vsflexGrid.ColIndex("Selected")) {
            var selected = vsflexGrid.Cell(flexcpChecked, row, col) == flexChecked;
            if (groupingGNP.selected != selected) {
                groupingGNP.selected = selected;
                CalculateOIPercentQuantity(groupingGNP, groupingGNP.oiPercent, "Selected");
                UpdateRootGNPToGrid(vsflexGrid);
            }
        }
        else if (col == vsflexGrid.ColIndex("OIPercent")) {
            var oiPercent = parseFloat(vsflexGrid.TextMatrix(row, col));
            oiPercent = isNaN(oiPercent) ? 100 : oiPercent;
            if (oiPercent > 100) oiPercent = 100;
            if (oiPercent < 0) oiPercent = 0;
            vsflexGrid.TextMatrix(row, col) = oiPercent;
            if (groupingGNP.oiPercent != oiPercent) {
                var oldOIPercent = groupingGNP.oiPercent;
                groupingGNP.oiPercent = oiPercent / 100;
                CalculateOIPercentQuantity(groupingGNP, oldOIPercent, "OIPercent");
                UpdateRootGNPToGrid(vsflexGrid);
            }
        }
        vsflexGrid.Redraw = true;
    }
}

function CalculateOIPercentQuantity(groupingGNP, oldOIPercent, field) {
    var summaryGroupGNPs = (new VBArray(groupingGNP.summaryGroupGNPs.Items())).toArray();
    for (var index = 0, count = summaryGroupGNPs.length; index < count; index++) {
        var summaryGroupGNP = summaryGroupGNPs[index];
        var summaryGroupGNPForRootGNP = groupingGNP.rootGNP.summaryGroupGNPs.Item(summaryGroupGNP.id);
        if (field == "Selected") {
            if (!groupingGNP.selected) {
                summaryGroupGNPForRootGNP.subtractQuantity(summaryGroupGNP.quantity * oldOIPercent);
            }
            else {
                summaryGroupGNPForRootGNP.addQuantity(summaryGroupGNP.quantity * groupingGNP.oiPercent);
            }
            var instrumentGNPs = (new VBArray(summaryGroupGNP.instrumentGNPs.Items())).toArray();
            for (var index2 = 0, count2 = instrumentGNPs.length; index2 < count2; index2++) {
                var instrumentGNP = instrumentGNPs[index2];
                if (!groupingGNP.selected) {
                    summaryGroupGNPForRootGNP.instrumentGNPs.Item(instrumentGNP.id).subtractQuantity(instrumentGNP.quantity * oldOIPercent);
                }
                else {
                    summaryGroupGNPForRootGNP.instrumentGNPs.Item(instrumentGNP.id).addQuantity(instrumentGNP.quantity * groupingGNP.oiPercent);
                }
            }
        }
        else {
            if (groupingGNP.selected) {
                summaryGroupGNPForRootGNP.subtractQuantity(summaryGroupGNP.quantity * oldOIPercent);
                summaryGroupGNPForRootGNP.addQuantity(summaryGroupGNP.quantity * groupingGNP.oiPercent);
                var instrumentGNPs = (new VBArray(summaryGroupGNP.instrumentGNPs.Items())).toArray();
                for (var index2 = 0, count2 = instrumentGNPs.length; index2 < count2; index2++) {
                    var instrumentGNP = instrumentGNPs[index2];
                    summaryGroupGNPForRootGNP.instrumentGNPs.Item(instrumentGNP.id).subtractQuantity(instrumentGNP.quantity * oldOIPercent);
                    summaryGroupGNPForRootGNP.instrumentGNPs.Item(instrumentGNP.id).addQuantity(instrumentGNP.quantity * groupingGNP.oiPercent);
                }
            }
        }
    }
}

function ShowAccountStatusGNP() {
    var accountId = "";
    var accountCode = "";
    var quotationFrm = GetQuotationFrm();
    var transferObject = new Object();
    transferObject.quotationFrm = quotationFrm;
    transferObject.accountId = accountId;
    transferObject.accountCode = accountCode;
    window.showModalDialog("AccountStatusFrames.aspx", transferObject, "scroll:no;resizable:yes;help:no;status:no;dialogWidth:1200px;dialogHeight:600px");
}

function PrintGroupNetPosition() {
    try {
        if (window._GroupNetPositionGrid) {
            //window._GroupNetPositionGrid.PrintGrid();
            window._GroupNetPositionGrid.PrintGrid("", true, 0, 0, 0);
        }
    }
    catch (e) {
        alert("Printer's I/O was error! please check your printer.");
    }
}

var blotterCodeSelectedsForGNP = null;
var blotterCodeSelectedsForGNPTemp = null;
var showActualQuantity = false;
var showActualQuantityTemp = false;
function ShowBlotterSelectionGroupNetPositionButton_Onclick() {
    var args = new Object();
    args.quotationFrm = GetQuotationFrm();
    args.blotterCodeSelecteds = blotterCodeSelectedsForGNP;
    blotterCodeSelectedsForGNPTemp = window.showModalDialog("BlotterSelection.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:300px;dialogHeight:300px");
}

var queryGroupNetPositionForModifyTimeoutID = null;
function QueryGroupNetPositionForModifySetTimeout() {
    QueryGroupNetPositionForModifyClearTimeout();
    queryGroupNetPositionForModifyTimeoutID = window.setTimeout(QueryGroupNetPositionForModifyTimeout, 2000);
}
function QueryGroupNetPositionForModifyClearTimeout() {
    if (queryGroupNetPositionForModifyTimeoutID) { window.clearTimeout(queryGroupNetPositionForModifyTimeoutID); queryGroupNetPositionForModifyTimeoutID = null; }
}
function QueryGroupNetPositionForModifyTimeout() {
    QueryGroupNetPositionForModifyClearTimeout();
    //...
    //QueryGroupNetPosition(true);
    QueryGroupNetPosition(false);
}

var gnpTimeOutID = null;
var gnpCallID = null;
var listCalls = new ActiveXObject("Scripting.Dictionary");
function QueryGroupNetPosition(isModify) {

    QueryGroupNetPositionForModifyClearTimeout();
    QueryGroupNetPosition2(null, null, isModify);
}

function QueryGroupNetPosition2(accountIDs, instrumentIDs, isModify) {
    //debugger
    QueryGroupNetPositionForModifyClearTimeout();
    //window._GroupNetPositionGrid.Rows = window._GroupNetPositionGrid.FixedRows;
    GroupNetPositionGridInit();
    showActualQuantityTemp = window._ShowActualQuantityCheckbox.checked;
    Service.useService("Service.asmx?WSDL", "service");
    var listCallID = Service.service.callService(GetGroupNetPositionResult, "GetGroupNetPosition", accountIDs, instrumentIDs, showActualQuantityTemp, blotterCodeSelectedsForGNPTemp);
    var oParameters = new Object();
    oParameters.accountIDs = accountIDs;
    oParameters.instrumentIDs = instrumentIDs;
    oParameters.isModify = isModify;
    oParameters.showActualQuantityTemp = showActualQuantityTemp;
    oParameters.blotterCodeSelectedsForGNPTemp = blotterCodeSelectedsForGNPTemp;
    listCalls.Add(listCallID, oParameters);

    window.btnQueryGroupNetPosition.disabled = true;
    window.HideQuantity.disabled = true;
    gnpTimeOutID = window.setTimeout(GNPTimeOut, 5000);

    function GNPTimeOut() {
        window.btnQueryGroupNetPosition.disabled = false;
        window.HideQuantity.disabled = false;
        if (gnpTimeOutID) { window.clearTimeout(gnpTimeOutID); }
    }
}

function GetGroupNetPositionResult(result) {
    debugger
    var oParameters = listCalls(result.id);
    var accountIDs = oParameters.accountIDs;
    var instrumentIDs = oParameters.instrumentIDs;
    var isModify = oParameters.isModify;
    var showActualQuantityTemp = oParameters.showActualQuantityTemp;
    var blotterCodeSelectedsForGNPTemp = oParameters.blotterCodeSelectedsForGNPTemp;
    listCalls.Remove(result.id);

    window.btnQueryGroupNetPosition.disabled = false;
    window.HideQuantity.disabled = false;

    if (gnpTimeOutID) { window.clearTimeout(gnpTimeOutID); }
    if (result.error) {
        alert("Failed to get Group Net Position data!");
    }
    else {
        blotterCodeSelectedsForGNP = blotterCodeSelectedsForGNPTemp;
        showActualQuantity = showActualQuantityTemp;
        FillGNPData(result.value, isModify);
        window._GroupNetPositionGrid.Redraw = false;
        window._GroupNetPositionGrid.MousePointer = flexHourglass;
        try {
            GroupNetPositionGridInit();
            FillDataToGNPGrid(null);
        }
        catch (e)
        { }
        window._GroupNetPositionGrid.MousePointer = flexDefault;
        window._GroupNetPositionGrid.Redraw = true;
    }
}

//<Instrument ID="" Quantity="" BuyQuantity="" BuyAveragePrice="" BuyMultiplyValue="" SellQuantity="" SellAveragePrice="" SellMultiplyValue="" />
function QueryGroupNetPositionInstrument(instrumentGNPForDetailGNP, accountId, instrumentId) {
    Service.useService("Service.asmx?WSDL", "service");
    var callObj = Service.createCallOptions();
    callObj.async = false;
    callObj.funcName = "GetGroupNetPositionInstrument";
    var result = Service.service.callService(callObj, accountId, instrumentId);

    if (!result.error && result.value && result.value.xml) {
        FillDetailGNPData(instrumentGNPForDetailGNP, result.value);
    }
}

//#region Update GNP Item
//Get Data FROM Server first
//Format:
//<Groups>
//    <Group ID="" Code="">
//        <Accounts>
//            <Account ID="" Code="" Type="">
//                  <Instruments>
//                      <Instrument ID="" Quantity="" BuyQuantity="" BuyAveragePrice="" BuyMultiplyValue="" SellQuantity="" SellAveragePrice="" SellMultiplyValue="" />
//                  </Instruments>
//             </Account>
//        </Accounts>
//    </Group>
//</Groups>
var _RootGNP = null;
function FillGNPData(msXml, isModify) {
    if (!isModify || _RootGNP == null || _RootGNP.accountGroupGNPs.Count <= 0) {
        _RootGNP = new RootGNP();
        _RootGNP.id = _RootGNPId;
        _RootGNP.code = "Total";
    }
    if (msXml == null) return;
    if (msXml.childNodes.length <= 0) return;
    var quotationFrm = GetQuotationFrm();
    //AccountGroups
    var accountGroupsNode = msXml.childNodes.item(0);
    for (var i = 0, iCount = accountGroupsNode.childNodes.length; i < iCount; i++) {
        //AccountGroup
        var accountGroupNode = accountGroupsNode.childNodes.item(i);
        var accountGroupGNP = UpdateAccountGroupGNP(_RootGNP, accountGroupNode);

        //Accounts
        var accountsNode = accountGroupNode.childNodes.item(0);
        for (var j = 0, jCount = accountsNode.childNodes.length; j < jCount; j++) {
            //Account
            var accountNode = accountsNode.childNodes.item(j);
            var accountGNP = UpdateAccountGNP(accountGroupGNP, accountNode);

            //Instruments
            var instrumentsNode = accountNode.childNodes.item(0);
            for (var k = 0, kCount = instrumentsNode.childNodes.length; k < kCount; k++) {
                //Instrument
                var instrumentNode = instrumentsNode.childNodes.item(k);
                var instrumentGNPId = instrumentNode.getAttribute("ID");
                var instrumentGNPLotBalance = parseFloat(instrumentNode.getAttribute("LotBalance"));
                var instrumentGNPQuantity = parseFloat(instrumentNode.getAttribute("Quantity"));
                var instrument = quotationFrm.oDealingConsole.GetInstrumentById(instrumentGNPId);

                if (instrument == null) continue;
                //SummaryGroupGNP For AccountGNP.detailGNP
                var summaryGroupGNPForDetailGNP = UpdateSummaryGroupGNP(accountGNP.detailGNP, instrument, instrumentGNPQuantity, instrumentGNPLotBalance);
                //InstrumentGNP For AccountGNP.detailGNP
                UpdateInstrumentGNP(summaryGroupGNPForDetailGNP, instrument, instrumentNode, quotationFrm);

                if (isModify) {
                    SubtractQuantity(accountGNP, instrumentGNPId);
                }

                //SummaryGroupGNP For AccountGNP
                var summaryGroupGNP = UpdateSummaryGroupGNP(accountGNP, instrument, instrumentGNPQuantity, instrumentGNPLotBalance);
                //InstrumentGNP For AccountGNP
                UpdateInstrumentGNP(summaryGroupGNP, instrument, instrumentNode, quotationFrm);

                //SummaryGroupGNP For AccountGroupGNP
                summaryGroupGNP = UpdateSummaryGroupGNP(accountGroupGNP, instrument, instrumentGNPQuantity, instrumentGNPLotBalance);
                //InstrumentGNP For AccountGroupGNP
                UpdateInstrumentGNP(summaryGroupGNP, instrument, instrumentNode, quotationFrm);

                //SummaryGroupGNP For RootGNP
                summaryGroupGNP = UpdateSummaryGroupGNP(_RootGNP, instrument, instrumentGNPQuantity, instrumentGNPLotBalance);
                //InstrumentGNP For RootGNP
                UpdateInstrumentGNP(summaryGroupGNP, instrument, instrumentNode, quotationFrm);
            }
        }
    }
}

function FillDetailGNPData(FillDetailGNPData, msXml) {
    if (msXml == null) return;
    if (msXml.childNodes.length <= 0) return;
    var quotationFrm = GetQuotationFrm();
    var instrumentNode = msXml.childNodes.item(0);
    FillDetailGNPData.UpdateByXmlNode(instrumentNode, false, quotationFrm);
    FillDetailGNPData.setAvagePrice(quotationFrm);
}

function UpdateAccountGroupGNP(rootGNP, node) {
    var id = node.getAttribute("ID");
    var gnp = null;
    if (rootGNP.accountGroupGNPs.Exists(id)) {
        gnp = rootGNP.accountGroupGNPs.Item(id);
    }
    else {
        gnp = new AccountGroupGNP();
        rootGNP.accountGroupGNPs.Add(id, gnp);
        gnp.rootGNP = rootGNP;
    }
    gnp.UpdateByXmlNode(node);
    return gnp;
}

function UpdateAccountGNP(groupingGNP, node) {
    var id = node.getAttribute("ID");
    var gnp = null;
    if (groupingGNP.accountGNPs.Exists(id)) {
        gnp = groupingGNP.accountGNPs.Item(id);
    }
    else {
        gnp = new AccountGNP();
        groupingGNP.accountGNPs.Add(id, gnp);
        gnp.groupingGNP = groupingGNP;

        var detailGNP = new DetailGNP();
        detailGNP.id = id + "_Detail";
        detailGNP.code = "";
        detailGNP.accountGNP = gnp;
        gnp.detailGNP = detailGNP;
    }
    gnp.UpdateByXmlNode(node);
    return gnp;
}
//feige
function SubtractQuantity(accountGNP, instrumentGNPId) {
    debugger
    var instrument = GetQuotationFrm().oDealingConsole.GetInstrumentById(instrumentGNPId);
    if (instrument == null) return;
    var summaryGroupId = instrument.summaryGroupId == null ? _EmptyGNPSummaryGroupId : instrument.summaryGroupId;
    if (accountGNP.summaryGroupGNPs.Exists(summaryGroupId)) {
        var summaryGroupGNP = accountGNP.summaryGroupGNPs.Item(summaryGroupId);
        if (accountGNP.groupingGNPType != GroupingGNPType.Detail) {
            if (summaryGroupGNP.instrumentGNPs.Exists(instrumentGNPId)) {
                var accountInstrumentQuantity = summaryGroupGNP.instrumentGNPs.Item(instrumentGNPId);
                if (accountGNP.groupingGNP.selected) {
                    accountGNP.groupingGNP.rootGNP.summaryGroupGNPs.Item(summaryGroupId).subtractLotBalace(accountInstrumentQuantity.lotBalance);
                    accountGNP.groupingGNP.rootGNP.summaryGroupGNPs.Item(summaryGroupId).subtractQuantity(accountInstrumentQuantity * instrument.summaryUnit * accountGNP.groupingGNP.oiPercent);
                    accountGNP.groupingGNP.rootGNP.summaryGroupGNPs.Item(summaryGroupId).instrumentGNPs.Item(instrumentGNPId).subtractQuantity(accountInstrumentQuantity * accountGNP.groupingGNP.oiPercent);
                }

                accountGNP.groupingGNP.summaryGroupGNPs.Item(summaryGroupId).subtractQuantity(accountInstrumentQuantity * instrument.summaryUnit);
                accountGNP.groupingGNP.summaryGroupGNPs.Item(summaryGroupId).instrumentGNPs.Item(instrumentGNPId).subtractQuantity(accountInstrumentQuantity);

                summaryGroupGNP.subtractQuantity(accountInstrumentQuantity * instrument.summaryUnit);
                summaryGroupGNP.subtractLotBalace(accountInstrumentQuantity.lotBalance);
                summaryGroupGNP.instrumentGNPs.Item(instrumentGNPId).subtractQuantity(accountInstrumentQuantity);
            }
        }
    }
}
//Add
function UpdateSummaryGroupGNP(groupingGNP, instrument, instrumentGNPQuantity, instrumentGNPLotBalance) {
    var instrumentGNPId = instrument.id;
    var summaryGroupGNP = null;
    var summaryGroupId = instrument.summaryGroupId == null ? _EmptyGNPSummaryGroupId : instrument.summaryGroupId;
    var summaryGroupCode = instrument.summaryGroupId == null ? _EmptyGNPSummaryGroupCode : instrument.summaryGroupCode;
    if (groupingGNP.summaryGroupGNPs.Exists(summaryGroupId)) {
        summaryGroupGNP = groupingGNP.summaryGroupGNPs.Item(summaryGroupId);
        if (groupingGNP.groupingGNPType != GroupingGNPType.Detail) {
            summaryGroupGNP.addLotBalace(instrumentGNPLotBalance);
            summaryGroupGNP.addQuantity(instrumentGNPQuantity * instrument.summaryUnit); //need Round?
        }
    }
    else {
        summaryGroupGNP = new SummaryGroupGNP();
        summaryGroupGNP.Instance(summaryGroupId, summaryGroupCode, instrument.summaryUnit);
        if (groupingGNP.groupingGNPType != GroupingGNPType.Detail) {
            summaryGroupGNP.addLotBalace(instrumentGNPLotBalance);
            summaryGroupGNP.addQuantity(instrumentGNPQuantity * instrument.summaryUnit); //need Round?
        }
        summaryGroupGNP.groupingGNP = groupingGNP;
        groupingGNP.summaryGroupGNPs.Add(summaryGroupGNP.id, summaryGroupGNP);
    }
    return summaryGroupGNP;
}

function UpdateInstrumentGNP(summaryGroupGNP, instrument, instrumentNode, quotationFrm) {
    var instrumentGNPId = instrumentNode.getAttribute("ID");
    var instrumentGNP = null;
    if (summaryGroupGNP.instrumentGNPs.Exists(instrumentGNPId)) {
        instrumentGNP = summaryGroupGNP.instrumentGNPs.Item(instrumentGNPId);
        instrumentGNP.UpdateByXmlNode(instrumentNode, true, quotationFrm);
    }
    else {
        instrumentGNP = new InstrumentGNP();
        instrumentGNP.instrument = instrument;
        instrumentGNP.summaryGroupGNP = summaryGroupGNP;
        instrumentGNP.UpdateByXmlNode(instrumentNode, false, quotationFrm);
        summaryGroupGNP.instrumentGNPs.Add(instrumentGNP.id, instrumentGNP);
    }
    return instrumentGNP;
}

function UpdateInstrumentGNPByAddOrder(summaryGroupGNP, instrument, order, orderQuantity, quotationFrm) {
    var instrumentGNPId = instrument.id;
    var instrumentGNP = null;
    if (summaryGroupGNP.instrumentGNPs.Exists(instrumentGNPId)) {
        instrumentGNP = summaryGroupGNP.instrumentGNPs.Item(instrumentGNPId);
        instrumentGNP.AddOrder(order, orderQuantity, quotationFrm);
    }
    else {
        instrumentGNP = new InstrumentGNP();
        instrumentGNP.instrument = instrument;
        instrumentGNP.summaryGroupGNP = summaryGroupGNP;
        instrumentGNP.AddOrder(order, orderQuantity, quotationFrm);
        summaryGroupGNP.instrumentGNPs.Add(instrumentGNP.id, instrumentGNP);
    }
}

function UpdateInstrumentGNPByCloseOrder(summaryGroupGNP, instrument, openOrder, closedQuantity, quotationFrm) {
    var instrumentGNPId = instrument.id;
    var instrumentGNP = null;
    if (summaryGroupGNP.instrumentGNPs.Exists(instrumentGNPId)) {
        instrumentGNP = summaryGroupGNP.instrumentGNPs.Item(instrumentGNPId);
        instrumentGNP.CloseOrder(openOrder, closedQuantity, quotationFrm);
    }
    return instrumentGNP;
}

function FillDataToGNPGrid(appointedAccountGroupGNPId) {
    var vsflexGrid = window._GroupNetPositionGrid;
    //vsflexGrid.Rows = vsflexGrid.FixedRows;
    if (_RootGNP == null) return;
    var line = vsflexGrid.Rows - 1;
    with (vsflexGrid) {
        //Total
        var findRow2 = FindRow(_RootGNP.id, FixedRows, ColIndex("GroupId"), true, true);
        if (findRow2 > 0) {
            line = findRow2;
        }
        else {
            AddItem("", line + 1);
            line++;
        }
        UpdateRootGNPNodeTextToGrid(vsflexGrid, _RootGNP, line);
        UpdateSummaryGroupGNPsToGrid(vsflexGrid, _RootGNP, line);
        FrozenRows = 1;
        Cell(flexcpFontBold, line, FixedCols, line, Cols - 1) = true;
        Cell(flexcpBackColor, line, FixedCols, line, Cols - 1) = color_lightyellow;

        //Account Group
        var accountGroupGNPs = (new VBArray(_RootGNP.accountGroupGNPs.Items())).toArray();
        var count = accountGroupGNPs.length;
        if (count <= 0) return;
        //Rows += count;
        var rootGNPLine = line;

        for (var index = 0; index < count; index++) {
            var accountGroupGNP = accountGroupGNPs[index];
            if (appointedAccountGroupGNPId == null || (appointedAccountGroupGNPId != null && accountGroupGNP.id == appointedAccountGroupGNPId)) {
                findRow2 = FindRow(accountGroupGNP.id, FixedRows, ColIndex("GroupId"), true, true);
                if (findRow2 <= 0) {
                    AddItem("", rootGNPLine + 1);
                    line = rootGNPLine + 1;
                }
                else {
                    line = findRow2;
                }
                UpdateAccountGroupGNPNodeTextToGrid(vsflexGrid, accountGroupGNP, line);
                UpdateSummaryGroupGNPsToGrid(vsflexGrid, accountGroupGNP, line);
                Cell(flexcpFontBold, line, FixedCols, line, Cols - 1) = true;
                Cell(flexcpFontItalic, line, FixedCols, line, Cols - 1) = true;
                Cell(flexcpBackColor, line, FixedCols, line, Cols - 1) = color_lightblue;

                //Account
                var accountGNPs = (new VBArray(accountGroupGNP.accountGNPs.Items())).toArray();
                var accountGroupGNPLine = line;
                var count2 = accountGNPs.length;
                //Rows += count;
                for (var index2 = 0; index2 < count2; index2++) {
                    var accountGNP = accountGNPs[index2];
                    findRow2 = FindRow(accountGNP.id, FixedRows, ColIndex("GroupId"), true, true);
                    if (findRow2 <= 0) {
                        AddItem("", accountGroupGNPLine + 1);
                        line = accountGroupGNPLine + 1;
                    }
                    else {
                        line = findRow2;
                    }
                    UpdateAccountGNPNodeTextToGrid(vsflexGrid, accountGNP, line);
                    UpdateSummaryGroupGNPsToGrid(vsflexGrid, accountGNP, line);
                    Cell(flexcpBackColor, line, FixedCols, line, Cols - 1) = color_lightcyan;

                    //Detail
                    findRow2 = FindRow(accountGNP.detailGNP.id, FixedRows, ColIndex("GroupId"), true, true);
                    if (findRow2 <= 0) {
                        AddItem("", line + 1);
                        line = line + 1;
                    }
                    else {
                        line = findRow2;
                    }
                    UpdateDetailGNPNodeTextToGrid(vsflexGrid, accountGNP.detailGNP, line);
                    UpdateSummaryGroupGNPsToGrid(vsflexGrid, accountGNP.detailGNP, line);
                    IsCollapsed(line) = flexOutlineCollapsed; // flexOutlineExpanded;
                }
            }
        }

        Cell(flexcpBackColor, FixedRows, ColIndex("Selected"), Rows - 1, ColIndex("Selected")) = color_lightblue;
        Cell(flexcpBackColor, FixedRows, ColIndex("OIPercent"), Rows - 1, ColIndex("OIPercent")) = color_lightblue;
        Cell(flexcpFontBold, FixedRows, ColIndex("GroupCode"), Rows - 1, ColIndex("GroupCode")) = true;

        if (appointedAccountGroupGNPId == null) {
            Outline(1);
        }
    }
    SetSummaryGroupGNPFont(vsflexGrid);
}

//region NodeTextToGrid
function UpdateRootGNPNodeTextToGrid(vsflexGrid, groupingGNP, line) {
    with (vsflexGrid) {
        TextMatrix(line, ColIndex("GroupId")) = groupingGNP.id;
        TextMatrix(line, ColIndex("GroupCode")) = groupingGNP.code;
        RowData(line) = groupingGNP;

        IsSubtotal(line) = true;
        RowOutlineLevel(line) = 0;
    }
}

function UpdateAccountGroupGNPNodeTextToGrid(vsflexGrid, groupingGNP, line) {
    with (vsflexGrid) {
        Cell(flexcpChecked, line, ColIndex("Selected")) = groupingGNP.selected ? flexChecked : flexUnchecked;
        TextMatrix(line, ColIndex("OIPercent")) = groupingGNP.oiPercent * 100;
        TextMatrix(line, ColIndex("GroupId")) = groupingGNP.id;
        TextMatrix(line, ColIndex("GroupCode")) = groupingGNP.code;
        RowData(line) = groupingGNP;

        IsSubtotal(line) = true;
        RowOutlineLevel(line) = 1;
    }
}

function UpdateAccountGNPNodeTextToGrid(vsflexGrid, accountGNP, line) {
    with (vsflexGrid) {
        TextMatrix(line, ColIndex("GroupId")) = accountGNP.id;
        TextMatrix(line, ColIndex("GroupCode")) = accountGNP.code;
        RowData(line) = accountGNP;

        IsSubtotal(line) = true;
        RowOutlineLevel(line) = 2;
    }
}

function UpdateDetailGNPNodeTextToGrid(vsflexGrid, detailGNP, line) {
    with (vsflexGrid) {
        TextMatrix(line, ColIndex("GroupId")) = detailGNP.id;
        TextMatrix(line, ColIndex("GroupCode")) = detailGNP.code;
        RowData(line) = detailGNP;

        //        IsSubtotal(line) = true;
        //        RowOutlineLevel(line) = 3;
    }
}
//endregion NodeTextToGrid

function UpdateRootGNPToGrid(vsflexGrid) {
    var line = vsflexGrid.FindRow(_RootGNPId, vsflexGrid.FixedRows, vsflexGrid.ColIndex("GroupId"), true, true);
    if (line <= 0) return;
    UpdateRootGNPNodeTextToGrid(vsflexGrid, _RootGNP, line);
    UpdateSummaryGroupGNPsToGrid(vsflexGrid, _RootGNP, line);
}
//5555
function UpdateSummaryGroupGNPsToGrid(vsflexGrid, groupingGNP, line) {
    var summaryGroupGNPs = (new VBArray(groupingGNP.summaryGroupGNPs.Items())).toArray();
    summaryGroupGNPs = summaryGroupGNPs.sort(CompareGNPGridSort);
    for (var index2 = 0, count2 = summaryGroupGNPs.length; index2 < count2; index2++) {
        var summaryGroupGNP = summaryGroupGNPs[index2];
        //Instrument
        var instrumentGNPs = (new VBArray(summaryGroupGNP.instrumentGNPs.Items())).toArray();
        for (var index3 = 0, count3 = instrumentGNPs.length; index3 < count3; index3++) {
            var instrumentGNP = instrumentGNPs[index3];
            UpdateInstrumentGNPToGrid(vsflexGrid, instrumentGNP, line);
        }
        //SummaryGroup
        UpdateSummaryGroupGNPToGrid(vsflexGrid, summaryGroupGNP, line);
    }
}
//6666
function UpdateSummaryGroupGNPToGrid(vsflexGrid, summaryGroupGNP, line) {
    showActualQuantityTemp = window._ShowActualQuantityCheckbox.checked;
    with (vsflexGrid) {
        //        if (summaryGroupGNP.id != _EmptyGNPSummaryGroupId) {
        var columnIndex = FindCol(vsflexGrid, summaryGroupGNP.id);
        if (columnIndex == -1) {
            vsflexGrid.Cols = vsflexGrid.Cols + 2;
            columnIndex = vsflexGrid.Cols - 2;
            ColKey(columnIndex) = summaryGroupGNP.id;
            ColWidth(columnIndex) = 1500;
            ColWidth(columnIndex + 1) = 1500;
            FixedAlignment(columnIndex) = flexAlignCenterCenter;
            FixedAlignment(columnIndex + 1) = flexAlignCenterCenter;
            ColAlignment(columnIndex) = flexAlignRightCenter;
            TextMatrix(0, columnIndex) = !summaryGroupGNP.code ? "" : summaryGroupGNP.code;
            TextMatrix(1, columnIndex) = "Sum LotBalance";
            TextMatrix(0, columnIndex + 1) = !summaryGroupGNP.code ? "" : summaryGroupGNP.code;
            TextMatrix(1, columnIndex + 1) = "Sum Quantity";
        }
        if (summaryGroupGNP.groupingGNP.groupingGNPType != GroupingGNPType.Detail) {
            TextMatrix(line, columnIndex) = FormateNumberStringWithoutSymbol(summaryGroupGNP.lotBalance, _FormatFloatDecimal);
            TextMatrix(line, columnIndex + 1) = FormateNumberStringWithoutSymbol(summaryGroupGNP.quantity, _FormatFloatDecimal);
            Cell(flexcpForeColor, line, columnIndex) = summaryGroupGNP.lotBalance >= 0 ? color_blue : color_red;
            Cell(flexcpForeColor, line, columnIndex + 1) = summaryGroupGNP.quantity >= 0 ? color_blue : color_red;
            //Cell(flexcpBackColor, line, columnIndex) = color_lightblue;  
            if (!showActualQuantityTemp) ColHidden(columnIndex + 1) = true;
        }
        //        }
    }
}

function HideQuantityCol() {
    showActualQuantityTemp = window._ShowActualQuantityCheckbox.checked;
    var vsflexGrid = window._GroupNetPositionGrid;
    if (_RootGNP == null) return;
    var summaryGroupGNPs = (new VBArray(_RootGNP.summaryGroupGNPs.Items())).toArray();
    summaryGroupGNPs = summaryGroupGNPs.sort(CompareGNPGridSort);
    for (var index = 0, count = summaryGroupGNPs.length; index < count; index++) {
        var summaryGroupGNP = summaryGroupGNPs[index];
        with (vsflexGrid) {
            var columnIndex = FindCol(vsflexGrid, summaryGroupGNP.id);
            if (columnIndex != -1) {
                Cell(flexcpBackColor, FixedRows, columnIndex, Rows - 1, columnIndex) = color_lightgreen;
                showActualQuantityTemp ? vsflexGrid.ColHidden(columnIndex + 1) = true : vsflexGrid.ColHidden(columnIndex + 1) = false;
            }
        }
    }
}
//12345
function UpdateInstrumentGNPToGrid(vsflexGrid, instrumentGNP, line) {
    with (vsflexGrid) {
        //Instrument
        var columnIndex = FindCol(vsflexGrid, instrumentGNP.id);
        if (columnIndex == -1) {
            vsflexGrid.Cols++;
            columnIndex = vsflexGrid.Cols - 1;
            ColKey(columnIndex) = instrumentGNP.id;
            ColWidth(columnIndex) = 2400;
            FixedAlignment(columnIndex) = flexAlignCenterCenter;
            ColAlignment(columnIndex) = flexAlignRightCenter;
            TextMatrix(0, columnIndex) = instrumentGNP.instrument.code;
            TextMatrix(1, columnIndex) = "Lot";
        }
        if (instrumentGNP.summaryGroupGNP.groupingGNP.groupingGNPType == GroupingGNPType.Detail) {
            TextMatrix(line, columnIndex) = instrumentGNP.detailDisplay();
        }
        else {
            TextMatrix(line, columnIndex) = FormateNumberStringWithoutSymbol(instrumentGNP.lotBalance, _FormatFloatDecimal);
            Cell(flexcpForeColor, line, columnIndex) = instrumentGNP.lotBalance >= 0 ? color_blue : color_red;
        }
    }
}

function SetSummaryGroupGNPFont(vsflexGrid) {
    if (_RootGNP == null) return;
    var summaryGroupGNPs = (new VBArray(_RootGNP.summaryGroupGNPs.Items())).toArray();
    summaryGroupGNPs = summaryGroupGNPs.sort(CompareGNPGridSort);
    for (var index = 0, count = summaryGroupGNPs.length; index < count; index++) {
        var summaryGroupGNP = summaryGroupGNPs[index];
        with (vsflexGrid) {
            var columnIndex = FindCol(vsflexGrid, summaryGroupGNP.id);
            if (columnIndex != -1) {
                Cell(flexcpBackColor, FixedRows, columnIndex, Rows - 1, columnIndex) = color_lightgreen;
                Cell(flexcpBackColor, FixedRows, columnIndex + 1, Rows - 1, columnIndex + 1) = color_lightgreen; // color_lightsteelblue;
            }
        }
    }
}

function FindCol(vsflexGrid, foundColKey) {
    for (var index = vsflexGrid.FixedCols, count = vsflexGrid.Cols; index < count; index++) {
        if (vsflexGrid.ColKey(index).toLowerCase() == foundColKey.toLowerCase()) {
            return index;
        }
    }
    return -1;
}
//#endregion Update GNP Item
//12345
//Add
function AddOrderToGroupNetPositionGrid(quotationFrm, order) {
    if (!InStringArray(order.blotterCode, blotterCodeSelectedsForGNP)) return;
    if (order.tran.phase == TransPhase.Executed || order.tran.phase == TransPhase.Completed) {
        var vsflexGrid = window._GroupNetPositionGrid;
        var accountId = order.tran.accountID;
        var findRow = vsflexGrid.FindRow(accountId, vsflexGrid.FixedRows, vsflexGrid.ColIndex("GroupId"), true, true);
        if (findRow <= 0) {
            //need to check account permission
            if (!quotationFrm.oDealingConsole.mainWindow.oIOProxy.SyncGetHasAccountPermission(accountId)) {
                return;
            }
        }

        if (_RootGNP == null || _RootGNP.accountGroupGNPs == null) {
            QueryGroupNetPositionForModifySetTimeout();
            return;
        }

        var accountGroupGNP = null;
        var groupId = null;
        var account = order.GetAccount();
        var instrument = order.GetInstrument();
        if (account == null || instrument == null) {
            QueryGroupNetPositionForModifySetTimeout();
            //QueryGroupNetPosition2(new Array(accountId), new Array(order.tran.instrumentID),true);
            return;
        }
        if (order.isOpen) {
            //AccountGroup
            if (_RootGNP.accountGroupGNPs.Exists(account.groupID)) {
                accountGroupGNP = _RootGNP.accountGroupGNPs.Item(account.groupID);
            }
            else {
                accountGroupGNP = new AccountGroupGNP();
                accountGroupGNP.Instance(account.groupID, account.groupCode);
                _RootGNP.accountGroupGNPs.Add(accountGroupGNP.id, accountGroupGNP);
                accountGroupGNP.rootGNP = _RootGNP;
            }
            //Account
            var accountGNP = null;
            if (accountGroupGNP.accountGNPs.Exists(accountId)) {
                accountGNP = accountGroupGNP.accountGNPs.Item(accountId);
            }
            else {
                accountGNP = new AccountGNP();
                accountGroupGNP.accountGNPs.Add(accountId, accountGNP);
                accountGNP.groupingGNP = accountGroupGNP;
                accountGNP.Instance(accountId, account.code);

                var detailGNP = new DetailGNP();
                detailGNP.id = accountId + "_Detail";
                detailGNP.code = "";
                detailGNP.accountGNP = accountGNP;
                accountGNP.detailGNP = detailGNP;
            }
            //Order
            //var orderQuantity = showActualQuantity ? order.lotBalance * order.tran.contractSize : order.lotBalance;
            var orderQuantity = order.lotBalance * order.tran.contractSize;
            //"#0;Common|#1;Agent|#2;Company|#3;Transit|#4;BlackList"
            if ((account.type != 2 && !order.isBuy) || (account.type == 2 && order.isBuy)) {
                orderQuantity = 0.00 - orderQuantity;
            }

            //SummaryGroupGNP For AccountGNP.detailGNP
            var summaryGroupGNPForDetailGNP = UpdateSummaryGroupGNP(accountGNP.detailGNP, instrument, orderQuantity, order.lotBalance);
            //InstrumentGNP For AccountGNP.detailGNP
            UpdateInstrumentGNPByAddOrder(summaryGroupGNPForDetailGNP, instrument, order, orderQuantity, quotationFrm);

            //SummaryGroupGNP For AccountGNP
            var summaryGroupGNP = UpdateSummaryGroupGNP(accountGNP, instrument, orderQuantity, order.lotBalance);
            //InstrumentGNP For AccountGNP
            UpdateInstrumentGNPByAddOrder(summaryGroupGNP, instrument, order, orderQuantity, quotationFrm);

            //SummaryGroupGNP For AccountGroupGNP
            summaryGroupGNP = UpdateSummaryGroupGNP(accountGroupGNP, instrument, orderQuantity, order.lotBalance);
            //InstrumentGNP For AccountGroupGNP
            UpdateInstrumentGNPByAddOrder(summaryGroupGNP, instrument, order, orderQuantity, quotationFrm);

            if (accountGroupGNP.selected) {
                orderQuantity = orderQuantity * accountGroupGNP.oiPercent;
                //SummaryGroupGNP For RootGNP
                summaryGroupGNP = UpdateSummaryGroupGNP(_RootGNP, instrument, orderQuantity, order.lotBalance);
                //InstrumentGNP For RootGNP
                UpdateInstrumentGNPByAddOrder(summaryGroupGNP, instrument, order, orderQuantity, quotationFrm);
            }
        }
        else {
            //Update Data
            if (showActualQuantity) {
                QueryGroupNetPositionForModifySetTimeout();
                //QueryGroupNetPosition2(new Array(order.tran.accountID), new Array(order.tran.instrumentID),true);
                return;
            }
            else {
                if (_RootGNP.accountGroupGNPs.Exists(account.groupID)) {
                    //AccountGroup
                    accountGroupGNP = _RootGNP.accountGroupGNPs.Item(account.groupID);
                    //Account
                    var accountGNP = null;
                    if (accountGroupGNP.accountGNPs.Exists(accountId)) {
                        accountGNP = accountGroupGNP.accountGNPs.Item(accountId);
                    }
                    else {
                        return;
                    }

                    //Order
                    var sumClosedOrderQuantity = 0.00;
                    for (var i = 0, count = order.orderRelations.length; i < count; i++) {
                        var orderRelation = order.orderRelations[i];

                        var closedOrderQuantity = orderRelation.closedLot;
                        if ((account.type != 2 && !order.isBuy) || (account.type == 2 && order.isBuy)) {
                            closedOrderQuantity = 0.00 - closedOrderQuantity;
                        }
                        sumClosedOrderQuantity += closedOrderQuantity;
                    }

                    //SummaryGroupGNP For AccountGNP.detailGNP
                    var summaryGroupGNPForDetailGNP = UpdateSummaryGroupGNP(accountGNP.detailGNP, instrument, sumClosedOrderQuantity, orderRelation.closedLot);
                    //InstrumentGNP For AccountGNP.detailGNP
                    var instrumentGNPForDetailGNP = UpdateInstrumentGNPByCloseOrder(summaryGroupGNPForDetailGNP, instrument, order, sumClosedOrderQuantity, quotationFrm);
                    if (instrumentGNPForDetailGNP != null && (instrumentGNPForDetailGNP.buyQuantity != 0.00 || instrumentGNPForDetailGNP.sellQuantity != 0.00)) {
                        QueryGroupNetPositionInstrument(instrumentGNPForDetailGNP, accountId, instrument.id);
                    }

                    //SummaryGroupGNP For AccountGNP
                    var summaryGroupGNP = UpdateSummaryGroupGNP(accountGNP, instrument, sumClosedOrderQuantity, orderRelation.closedLot);
                    //InstrumentGNP For AccountGNP
                    UpdateInstrumentGNPByCloseOrder(summaryGroupGNP, instrument, order, sumClosedOrderQuantity, quotationFrm);

                    //SummaryGroupGNP For AccountGroupGNP
                    summaryGroupGNP = UpdateSummaryGroupGNP(accountGroupGNP, instrument, sumClosedOrderQuantity, orderRelation.closedLot);
                    //InstrumentGNP For AccountGroupGNP
                    UpdateInstrumentGNPByCloseOrder(summaryGroupGNP, instrument, order, sumClosedOrderQuantity, quotationFrm);

                    if (accountGroupGNP.selected) {
                        sumClosedOrderQuantity = sumClosedOrderQuantity * accountGroupGNP.oiPercent;
                        //SummaryGroupGNP For RootGNP
                        summaryGroupGNP = UpdateSummaryGroupGNP(_RootGNP, instrument, sumClosedOrderQuantity, orderRelation.closedLot);
                        //InstrumentGNP For RootGNP
                        UpdateInstrumentGNPByCloseOrder(summaryGroupGNP, instrument, order, sumClosedOrderQuantity, quotationFrm);
                    }
                }
                else {
                    return;
                }
            }
        }

        //Update Grid
        vsflexGrid.Redraw = false;
        if (vsflexGrid.Rows <= vsflexGrid.FixedRows) {
            GroupNetPositionGridInit();
        }
        FillDataToGNPGrid(accountGroupGNP.id);
        vsflexGrid.Redraw = true;
    }
}

function DeleteOrderFromGroupNetPositionGrid(quotationFrm, deletedOrderId, accountId, instrumentId) {
    QueryGroupNetPositionForModifySetTimeout();
    //QueryGroupNetPosition2(new Array(accountId), new Array(instrumentId),true);
}

function AffectOrderToGroupNetPositionGrid(quotationFrm, order) {
    //AddOrderToGroupNetPositionGrid(quotationFrm, order);
}

var sortedOrder = "ASC";
function CompareGNPGridSort(objA, objB) {
    var objASortValue = null;
    var objBSortValue = null;
    switch (sortedColKey) {
        case "Code":
            objASortValue = objA.code;
            objBSortValue = objB.code;
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

//#region Data Structure
/*
RootGNP
--AccountGroupGNPs
--AccountGroupGNP
--AccountGNPs
--AccountGNP
--DetailGNP
*/
function RootGNP() {
    var base = new GroupingGNP(GroupingGNPType.Root);
    for (prop in base) {
        this[prop] = base[prop];
    }
    this.accountGroupGNPs = new ActiveXObject("Scripting.Dictionary"); //key=id value=AccountGroupGNP   //base:GroupingGNP
}

function AccountGroupGNP() {
    var base = new GroupingGNP(GroupingGNPType.AccountGroup);
    for (prop in base) {
        this[prop] = base[prop];
    }
    this.selected = true;   //For AccountGroupGNP only
    this.oiPercent = 1.00;  //For AccountGroupGNP only
    this.rootGNP = null;
    this.accountGNPs = new ActiveXObject("Scripting.Dictionary"); //key=id value=AccountGNP //base:GroupingGNP
}

function AccountGNP() {
    var base = new GroupingGNP(GroupingGNPType.Account);
    for (prop in base) {
        this[prop] = base[prop];
    }
    this.type;
    this.groupingGNP = null;
    this.detailGNP = null;
}

function DetailGNP() {
    var base = new GroupingGNP(GroupingGNPType.Detail);
    for (prop in base) {
        this[prop] = base[prop];
    }
    this.accountGNP = null;
}

/*
GroupingGNP[GroupingGNPType]
--SummaryGroupGNPs
--SummaryGroupGNP
--InstrumentGNPs
--InstrumentGNP
*/
var GroupingGNPType = new GroupingGNPType();
function GroupingGNPType() {
    this.Root = 0;
    this.AccountGroup = 1;
    this.Account = 2;
    this.Detail = 3;
}

function GroupingGNP(groupingGNPType) {
    this.summaryGroupGNPs = new ActiveXObject("Scripting.Dictionary"); //key=id value=SummaryGroupGNP

    this.groupingGNPType = groupingGNPType;
    this.id;
    this.code = "";

    this.Instance = function (id, code) {
        this.id = id;
        this.code = code;
    };

    this.UpdateByXmlNode = function (rowNode) {
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
            }
        }
    };
}

function SummaryGroupGNP() {
    this.groupingGNP = null;
    this.instrumentGNPs = new ActiveXObject("Scripting.Dictionary"); //key=id value=InstrumentGNP

    this.id;
    this.code;
    this.lotBalance = 0.00;
    this.quantity = 0.00;
    this.summaryUnit = 1.00;

    this.Instance = function (id, code, summaryUnit) {
        this.id = id;
        this.code = code;
        this.summaryUnit = summaryUnit;
    };

    this.subtractQuantity = function (value) {
        this.quantity -= value;
    };
    this.subtractLotBalace = function (value) {
        this.lotBalance -= value;
    };
    this.addLotBalace = function (value) {
        this.lotBalance += value;
    };
    this.addQuantity = function (value) {
        this.quantity += value;
    };
}

function InstrumentGNP() {
    this.summaryGroupGNP = null;

    this.id;
    this.lotBalance = 0.00;
    this.quantity = 0.00;

    //For Instrument in Detail only
    this.buyQuantity = 0.00;
    this.buyAveragePrice = "";
    this.buyAveragePriceValue = 0.00;
    this.buyMultiplyValue = 0.00;
    this.sellQuantity = 0.00;
    this.sellAveragePrice = "";
    this.sellAveragePriceValue = 0.00;
    this.sellMultiplyValue = 0.00;

    this.instrument = null;

    this.detailDisplay = function () {
        var detail = "";
        if (this.sellQuantity != 0.00) {
            detail = GetFormatLot(this.sellQuantity, true) + "S x " + this.sellAveragePrice;
        }
        if (this.buyQuantity != 0.00) {
            detail += ((detail == "") ? "" : "/") + GetFormatLot(this.buyQuantity, true) + "B x " + this.buyAveragePrice;
        }
        if (detail == "") detail = "--";
        return detail;
    };

    this.Instance = function (id) {
        this.id = id;
    };

    this.subtractQuantity = function (value) {
        this.quantity -= value;
    };
    this.subtractLotBalace = function (value) {
        this.lotBalance -= value;
    };
    this.addLotBalace = function (value) {
        this.lotBalance += value;
    };
    this.addQuantity = function (value) {
        this.quantity += value;
    };

    this.setAvagePrice = function (quotationFrm) {
        var price = null;

        var buyAveragePriceValue = this.buyQuantity != 0.0 ? this.buyMultiplyValue / this.buyQuantity : 0.00;
        price = quotationFrm.ObjectPool.GetPriceHelper(buyAveragePriceValue, this.instrument.numeratorUnit, this.instrument.denominator);
        this.buyAveragePrice = price == null ? "0" : price.ToString();
        this.buyAveragePriceValue = buyAveragePriceValue;

        var sellAveragePriceValue = this.sellQuantity != 0.0 ? this.sellMultiplyValue / this.sellQuantity : 0.00;
        price = quotationFrm.ObjectPool.GetPriceHelper(sellAveragePriceValue, this.instrument.numeratorUnit, this.instrument.denominator);
        this.sellAveragePrice = price == null ? "0" : price.ToString();
        this.sellAveragePriceValue = sellAveragePriceValue;
    };

    this.UpdateByXmlNode = function (rowNode, add, quotationFrm) {
        for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
            var attribute = rowNode.attributes.item(index);
            var value = attribute.nodeValue;
            switch (attribute.nodeName) {
                case "ID":
                    this.id = value;
                    break;
                case "LotBalance":
                    if (add) {
                        this.lotBalance += parseFloat(value);
                    }
                    else {
                        this.lotBalance = parseFloat(value);
                    }
                case "Quantity":
                    if (add) {
                        this.quantity += parseFloat(value);
                    }
                    else {
                        this.quantity = parseFloat(value);
                    }
                    break;
                case "BuyQuantity":
                    if (add) {
                        this.buyQuantity += parseFloat(value);
                    }
                    else {
                        this.buyQuantity = parseFloat(value);
                    }
                    break;
                case "BuyAveragePrice":
                    this.buyAveragePrice = value;
                    break;
                case "BuyMultiplyValue":
                    if (add) {
                        this.buyMultiplyValue += parseFloat(value);
                    }
                    else {
                        this.buyMultiplyValue = parseFloat(value);
                    }
                    break;
                case "SellQuantity":
                    if (add) {
                        this.sellQuantity += parseFloat(value);
                    }
                    else {
                        this.sellQuantity = parseFloat(value);
                    }
                    break;
                case "SellAveragePrice":
                    this.sellAveragePrice = value;
                    break;
                case "SellMultiplyValue":
                    if (add) {
                        this.sellMultiplyValue += parseFloat(value);
                    }
                    else {
                        this.sellMultiplyValue = parseFloat(value);
                    }
                    break;
            }
        }
        if (add) {
            this.setAvagePrice(quotationFrm);
        }
    };
    //123
    this.AddOrder = function (order, orderQuantity, quotationFrm) {
        this.id = order.tran.instrumentID;
        this.quantity += orderQuantity;
        this.lotBalance += order.lotBalance;
        this.DoOrderProcess(order, Math.abs(orderQuantity), quotationFrm, order.isBuy);
    };
    //123456
    this.CloseOrder = function (openOrder, closedQuantity, quotationFrm) {
        this.quantity += closedQuantity;
        this.lotBalance += closedQuantity;
        this.DoOrderProcess(openOrder, 0.00 - Math.abs(closedQuantity), quotationFrm, !openOrder.isBuy);
    };

    this.DoOrderProcess = function (order, orderQuantity, quotationFrm, isBuy) {
        var executePriceValue = order.executePrice.ToDouble();
        if (isBuy) {
            this.buyQuantity += orderQuantity;
            this.buyMultiplyValue += orderQuantity * executePriceValue;
            //Repair close last order
            if (this.buyQuantity == 0.00) {
                this.buyMultiplyValue = 0.00;
            }
        }
        else {
            this.sellQuantity += orderQuantity;
            this.sellMultiplyValue += orderQuantity * executePriceValue;
            //Repair close last order
            if (this.sellQuantity == 0.00) {
                this.sellMultiplyValue = 0.00;
            }
        }

        this.setAvagePrice(quotationFrm);
    };

}
//#endregion Data Structure

