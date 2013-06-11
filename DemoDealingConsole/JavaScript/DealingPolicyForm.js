//Added Michael on 2009-01-13
function GetIsByDealingPolicy() {
    return window._DealingPolicyRadio.checked;
}

var quotationFrm = null;
var dealingPolicyDetailPageLoaded = false;
function OnLoad() {
    //quotationFrm = window.dialogArguments.parent.quotationFrm;
    quotationFrm = window.top.opener.parent.quotationFrm;

    ChangeBy();
    FillInstrumentSelect();
    DealingPolicyDetailGridInit();

    SetDealerParameterEditable();

    dealingPolicyDetailPageLoaded = true;
}

function Onunload() {
    //    if (window.dialogArguments && window.dialogArguments.oWndDealingPolicy)
    //        window.dialogArguments.oWndDealingPolicy = null;

    //    if (window.top.opener && window.top.opener.oWndDealingPolicy)
    //        window.top.opener.oWndDealingPolicy = null;
}

function SetDealerParameterEditable() {
    var dealingPolicyDetailGridColKey = quotationFrm.dealingPolicyDetailGridColKey;
    var canEdit = true;
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.MaxDQLot));
    window._MaxDQLotText.disabled = !canEdit;
    window._MaxDQLotAddButton.disabled = !canEdit;
    window._MaxDQLotReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.MaxOtherLot));
    window._MaxOtherLotText.disabled = !canEdit;
    window._MaxOtherLotAddButton.disabled = !canEdit;
    window._MaxOtherLotReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.DQQuoteMinLot));
    window._DQQuoteMinLotText.disabled = !canEdit;
    window._DQQuoteMinLotAddButton.disabled = !canEdit;
    window._DQQuoteMinLotReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.AutoDQMaxLot));
    window._AutoDQMaxLotText.disabled = !canEdit;
    window._AutoDQMaxLotAddButton.disabled = !canEdit;
    window._AutoDQMaxLotReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.AutoLmtMktMaxLot));
    window._AutoLmtMktMaxLotText.disabled = !canEdit;
    window._AutoLmtMktMaxLotAddButton.disabled = !canEdit;
    window._AutoLmtMktMaxLotReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.AcceptDQVariation));
    window._AcceptDQVariationText.disabled = !canEdit;
    window._AcceptDQVariationAddButton.disabled = !canEdit;
    window._AcceptDQVariationReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.AcceptLmtVariation));
    window._AcceptLmtVariationText.disabled = !canEdit;
    window._AcceptLmtVariationAddButton.disabled = !canEdit;
    window._AcceptLmtVariationReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.AcceptCloseLmtVariation));
    window._AcceptCloseLmtVariationText.disabled = !canEdit;
    window._AcceptCloseLmtVariationAddButton.disabled = !canEdit;
    window._AcceptCloseLmtVariationReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.CancelLmtVariation));
    window._CancelLmtVariationText.disabled = !canEdit;
    window._CancelLmtVariationAddButton.disabled = !canEdit;
    window._CancelLmtVariationReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.AutoDQDelay));
    window._AutoDQDelayText.disabled = !canEdit;
    window._AutoDQDelayAddButton.disabled = !canEdit;
    window._AutoDQDelayReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.AllowedNewTradeSides));
    window._AllowedNewTradeSidesCmb.disabled = !canEdit;
    window._AllowedNewTradeSidesReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.AutoAcceptMaxLot));
    window._AutoAcceptMaxLotText.disabled = !canEdit;
    window._AutoAcceptMaxLotAddButton.disabled = !canEdit;
    window._AutoAcceptMaxLotReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.AutoCancelMaxLot));
    window._AutoCancelMaxLotText.disabled = !canEdit;
    window._AutoCancelMaxLotAddButton.disabled = !canEdit;
    window._AutoCancelMaxLotReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(dealingPolicyDetailGridColKey.HitPriceVariationForSTP));
    window._HitPriceVariationForSTPText.disabled = !canEdit;
    window._HitPriceVariationForSTPAddButton.disabled = !canEdit;
    window._HitPriceVariationForSTPReplaceButton.disabled = !canEdit;
}

function ChangeBy() {
    if (GetIsByDealingPolicy()) {
        window._DealingPolicySelect.style.display = "inline";
        window._InstrumentSelect.style.display = "none";
        window._QueryButton.style.display = "inline";
        window._Query2Button.style.display = "none";
        
    }
    else {
        window._DealingPolicySelect.style.display = "none";
        window._InstrumentSelect.style.display = "inline";
        window._QueryButton.style.display = "none";
        window._Query2Button.style.display = "inline";        
    }
}

function DealingPolicyDetailGridInit() {
    window._DealingPolicyDetailGrid.Redraw = false;
    var grid = window._DealingPolicyDetailGrid;
    with (grid) {
        Cols = 17;
        Rows = 1;
        FixedRows = 1;
        FixedCols = 1;

        var dealingPolicyDetailGridColKey = quotationFrm.dealingPolicyDetailGridColKey;
        var dealingPolicyDetailGridLanguage = quotationFrm.dealingPolicyDetailGridLanguage;

        var parameter = quotationFrm.oDealingConsole.InitGrid(grid, quotationFrm.optionGrid.DealingPolicyDetailGrid, dealingPolicyDetailGridLanguage);
        var comboListLanguage = quotationFrm.comboListLanguage;
        if (parameter == "") GridColumnsDefaultFormatForDealingPolicyDetail(grid,dealingPolicyDetailGridColKey);

//        ColFormat(ColIndex(dealingPolicyDetailGridColKey.MaxDQLot)) = "#######.0";
//        ColFormat(ColIndex(dealingPolicyDetailGridColKey.MaxOtherLot)) = "#######.0";
//        ColFormat(ColIndex(dealingPolicyDetailGridColKey.DQQuoteMinLot)) = "#######.0";
//        ColFormat(ColIndex(dealingPolicyDetailGridColKey.AutoDQMaxLot)) = "#######.0";
//        ColFormat(ColIndex(dealingPolicyDetailGridColKey.AutoLmtMktMaxLot)) = "#######.0";
        ColFormat(ColIndex(dealingPolicyDetailGridColKey.AcceptDQVariation)) = "#######";
        ColFormat(ColIndex(dealingPolicyDetailGridColKey.AcceptLmtVariation)) = "#######";
        ColFormat(ColIndex(dealingPolicyDetailGridColKey.AcceptCloseLmtVariation)) = "#######";
        ColFormat(ColIndex(dealingPolicyDetailGridColKey.CancelLmtVariation)) = "#######";
        ColFormat(ColIndex(dealingPolicyDetailGridColKey.AutoDQDelay)) = "#######";
        ColComboList(ColIndex(dealingPolicyDetailGridColKey.AllowedNewTradeSides)) = comboListLanguage["AllowedNewTradeSidesTypeComboList"]; //"Disallow add New|Allow add new Buy only|Allow add new Sell only|Allow add new";
//        ColFormat(ColIndex(dealingPolicyDetailGridColKey.AutoAcceptMaxLot)) = "#######.00";
//        ColFormat(ColIndex(dealingPolicyDetailGridColKey.AutoCancelMaxLot)) = "#######.00";
        ColFormat(ColIndex(dealingPolicyDetailGridColKey.HitPriceVariationForSTP)) = "#######";
        //Editable = flexEDKbdMouse;

        ColWidth(0) = 1600;

        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;

        SelectionMode = flexSelectionFree;
        ExplorerBar = flexExSortAndMove;
        Editable = flexEDNone;
    }
    window._DealingPolicyDetailGrid.Redraw = true;
}

function GridColumnsDefaultFormatForDealingPolicyDetail(grid,gridColKey) {
    with (grid) {
        ColWidth(0) = 1600;
        ColWidth(ColIndex(gridColKey.MaxDQLot)) = 1100;
        ColWidth(ColIndex(gridColKey.MaxOtherLot)) = 1100;
        ColWidth(ColIndex(gridColKey.DQQuoteMinLot)) = 1100;
        ColWidth(ColIndex(gridColKey.AutoDQMaxLot)) = 1100;
        ColWidth(ColIndex(gridColKey.AutoLmtMktMaxLot)) = 1100;
        ColWidth(ColIndex(gridColKey.AcceptDQVariation)) = 1100;
        ColWidth(ColIndex(gridColKey.AcceptLmtVariation)) = 1100;
        ColWidth(ColIndex(gridColKey.AcceptCloseLmtVariation)) = 1100;
        ColWidth(ColIndex(gridColKey.CancelLmtVariation)) = 1100;
        ColWidth(ColIndex(gridColKey.AutoDQDelay)) = 1100;
        ColWidth(ColIndex(gridColKey.AllowedNewTradeSides)) = 1500;
        ColWidth(ColIndex(gridColKey.AutoAcceptMaxLot)) = 1100;
        ColWidth(ColIndex(gridColKey.AutoCancelMaxLot)) = 1100;
        ColWidth(ColIndex(gridColKey.HitPriceVariationForSTP)) = 1100;
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

function FillInstrumentSelect() {
    window._InstrumentSelect.options.length = 0;

    var instruments = (new VBArray(quotationFrm.oInstruments.Items())).toArray();
    instruments = instruments.sort(CompareSort);
    for (var index = 0, count = instruments.length; index < count; index++) {
        var oOption = document.createElement("OPTION");
        oOption.text = instruments[index].code;
        oOption.value = instruments[index].id;
        window._InstrumentSelect.add(oOption);
    }
}

function QueryButton_OnClick() {
    if (GetIsByDealingPolicy()) {
        QueryByDealingPolicy();
    }
    else {
        QueryByInstrument();
    }
}

function QueryByDealingPolicy() {
    var dealingPolicyID;
    dealingPolicyID = window._DealingPolicySelect.value;
    if (dealingPolicyID == "") {
        alert("Please select a Dealing Policy!");
        return;
    }
    try {
        var xmlDoc2 = new ActiveXObject("Msxml2.DOMDocument");
        xmlDoc2.async = false;
        xmlDoc2.resolveExternals = false;

        xmlDoc2.load("Service.asmx/GetDealingPolicyDetailForDealingPolicy?DealingPolicyID=" + dealingPolicyID);
        if (xmlDoc2) 
        {
            var rowNode = xmlDoc2.getElementsByTagName("DealingPolicyDetails")[0];
            FillDealingPolicyDetailGrid(rowNode);            
        }
    }
    catch (ex) 
    {
        alert("Failed to Get Dealing Policy Detail Data!");
    }
}

function QueryByInstrument() {
    var instrumentID;
    instrumentID = window._InstrumentSelect.value;
    if (instrumentID == "") {
        alert("Please select an instrument!");
        return;
    }
    try {
        var xmlDoc2 = new ActiveXObject("Msxml2.DOMDocument");
        xmlDoc2.async = false;
        xmlDoc2.resolveExternals = false;

        xmlDoc2.load("Service.asmx/GetDealingPolicyDetailForInstrument?InstrumentID=" + instrumentID);
        if (xmlDoc2) 
        {
            var rowNode = xmlDoc2.getElementsByTagName("DealingPolicyDetails")[0];
            FillDealingPolicyDetailGrid(rowNode);
        }
    }
    catch (ex) {
        alert("Failed to Get Dealing Policy Detail Data!");
    }
}

var _DealingPolicyDetails;

function SetDealingPolicyDetails(rowNode) 
{
    _DealingPolicyDetails = new ActiveXObject("Scripting.Dictionary"); //key=DealingPolicyID,InstrumentID value=DealingPolicyDetail
    if (!rowNode) return;

    for (var index = 0; index < rowNode.childNodes.length; index++) 
    {
        var rowNode2 = rowNode.childNodes[index];
        var dealingPolicyID = rowNode2.getAttribute("DealingPolicyID");
        var instrumentID = rowNode2.getAttribute("InstrumentID");
        var dealingPolicyDetail = new DealingPolicyDetail(dealingPolicyID, instrumentID);
        dealingPolicyDetail.UpdateByXmlNode(rowNode2);
        _DealingPolicyDetails.Add(dealingPolicyID + instrumentID,dealingPolicyDetail);
    }
}

function FillDealingPolicyDetailGrid(rowNode) {
    SetDealingPolicyDetails(rowNode);
    DealingPolicyDetailGridInit();
    if (_DealingPolicyDetails == null || _DealingPolicyDetails.Count <= 0) return;
    var dealingPolicyDetailGridColKey = quotationFrm.dealingPolicyDetailGridColKey;
    window._DealingPolicyDetailGrid.Redraw = false;
    var grid = window._DealingPolicyDetailGrid;
    grid.Rows = grid.FixedRows + _DealingPolicyDetails.Count;
    var insertRow = grid.FixedRows;
    var isByDealingPolicy = GetIsByDealingPolicy();
    var dealingPolicyDetails = (new VBArray(_DealingPolicyDetails.Items())).toArray();
    for (var index = 0, count = dealingPolicyDetails.length; index < count; index++) 
    {
        var dealingPolicyDetail = dealingPolicyDetails[index];
        with (grid) 
        {
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.DealingPolicyID)) = dealingPolicyDetail.DealingPolicyID;
            TextMatrix(insertRow, 0) = (isByDealingPolicy) ? dealingPolicyDetail.InstrumentCode : dealingPolicyDetail.DealingPolicyCode;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.InstrumentID)) = dealingPolicyDetail.InstrumentID;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.MaxDQLot)) = dealingPolicyDetail.MaxDQLot;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.MaxOtherLot)) = dealingPolicyDetail.MaxOtherLot;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.DQQuoteMinLot)) = dealingPolicyDetail.DQQuoteMinLot;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.AutoDQMaxLot)) = dealingPolicyDetail.AutoDQMaxLot;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.AutoLmtMktMaxLot)) = dealingPolicyDetail.AutoLmtMktMaxLot;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.AcceptDQVariation)) = dealingPolicyDetail.AcceptDQVariation;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.AcceptLmtVariation)) = dealingPolicyDetail.AcceptLmtVariation;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.AcceptCloseLmtVariation)) = dealingPolicyDetail.AcceptCloseLmtVariation;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.CancelLmtVariation)) = dealingPolicyDetail.CancelLmtVariation;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.AutoDQDelay)) = dealingPolicyDetail.AutoDQDelay;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.HitPriceVariationForSTP)) = dealingPolicyDetail.HitPriceVariationForSTP;
            //Cell(flexcpChecked, insertRow, ColIndex(dealingPolicyDetailGridColKey.AllowedNewTradeSides)) =  ? flexChecked : flexUnchecked;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.AllowedNewTradeSides)) = AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeStr(dealingPolicyDetail.AllowedNewTradeSides);
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.AutoAcceptMaxLot)) = dealingPolicyDetail.AutoAcceptMaxLot;
            TextMatrix(insertRow, ColIndex(dealingPolicyDetailGridColKey.AutoCancelMaxLot)) = dealingPolicyDetail.AutoCancelMaxLot;

            RowData(insertRow) = dealingPolicyDetail;

            if (dealingPolicyDetail.DealingPolicyID == "00000000-0000-0000-0000-000000000000") {
                SetRowBackColor(grid, insertRow, color_lightskyblue);
            }
            
            insertRow++;
        }
    }
    window._DealingPolicyDetailGrid.Redraw = true;
}

var timeOutId = null;
function DealingPolicyDetail_Save(grid) {
    var xmls = GetDealingPolicyDetailXmlNode();
    if (xmls == null) 
    {
        alert("Not Exists record to update!");
        return;
    }
    _SaveButton
    window._SaveButton.disabled = true;
    timeOutId = window.setTimeout(PolicyTimeOut, 5000);
    

    if (xmls.dealingPolicyDetailXmls != "") {
        quotationFrm.oDealingConsole.UpdateDealingPolicyDetail(window, xmls.dealingPolicyDetailXmls, xmls.dealingPolicyDetailEventMessages);
    }
    if (xmls.instrumentParameterXmls != "") {
        quotationFrm.oDealingConsole.UpdateInstrumentParameterByDealingPolicyForm(window, xmls.instrumentParameterXmls, xmls.instrumentParameterEventMessages, xmls.instrumentID, xmls.instrumentCode);
    }
    
    function PolicyTimeOut() {
        window._SaveButton.disabled = false;
        if (timeOutId) { window.clearTimeout(timeOutId); }
    }
}

function AfterSavedProcess(isSucceed) {
    window._SaveButton.disabled = false;
    var messageLanguage = quotationFrm.messageLanguage;
    if (timeOutId) { window.clearTimeout(timeOutId); }
    if (isSucceed) {
        var dealingPolicyDetails = (new VBArray(_DealingPolicyDetails.Items())).toArray();
        for (var index = 0, count = dealingPolicyDetails.length; index < count; index++) {
            var dealingPolicyDetail = dealingPolicyDetails[index];
            if (dealingPolicyDetail.DealingPolicyID != "00000000-0000-0000-0000-000000000000") {
                dealingPolicyDetail.AfterSavedProcess();
            }
        }
        alert(messageLanguage["UpdateDealingPolicyDetailMsg"]);
    }
    else {
        alert(messageLanguage["UpdateDealingPolicyDetailAlert"]);
    }
}

function AfterSavedInstrumentParameterProcess(isSucceed) {
    window._SaveButton.disabled = false;
    if (timeOutId) { window.clearTimeout(timeOutId); }
    if (isSucceed) {
        var dealingPolicyDetails = (new VBArray(_DealingPolicyDetails.Items())).toArray();
        for (var index = 0, count = dealingPolicyDetails.length; index < count; index++) {
            var dealingPolicyDetail = dealingPolicyDetails[index];
            if (dealingPolicyDetail.DealingPolicyID == "00000000-0000-0000-0000-000000000000") {
                dealingPolicyDetail.AfterSavedProcess();
                break;
            }
        }
        //alert("Succeed to Update Instrument Parameter!");
    }
//    else {
//        alert("Failed to Update Instrument Parameter!");
//    }
}

function GetDealingPolicyDetailXmlNode() 
{
    if (_DealingPolicyDetails == null || _DealingPolicyDetails.Count <= 0) return null;
    var dealingPolicyDetailXmls = "";
    var instrumentParameterXmls = "";
    var dealingPolicyDetailEventMessages = "";
    var instrumentParameterEventMessages = "";
    var instrumentID = "";
    var instrumentCode = "";

    var dealingPolicyDetailGridColKey = quotationFrm.dealingPolicyDetailGridColKey;
    var dealingPolicyDetails = (new VBArray(_DealingPolicyDetails.Items())).toArray();
    for (var index = 0, count = dealingPolicyDetails.length; index < count; index++) 
    {
        var dealingPolicyDetail = dealingPolicyDetails[index];
        if (dealingPolicyDetail.NeedUpdate == true) {
            if (dealingPolicyDetail.DealingPolicyID == "00000000-0000-0000-0000-000000000000") {
                var instrumentParameterXml = "";
                var instrumentParameterEventMessage = "";
                if (dealingPolicyDetail.MaxDQLot != dealingPolicyDetail.OldMaxDQLot) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.MaxDQLot + "=\"" + dealingPolicyDetail.MaxDQLot + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.MaxDQLot + "=" + dealingPolicyDetail.MaxDQLot;
                }
                if (dealingPolicyDetail.MaxOtherLot != dealingPolicyDetail.OldMaxOtherLot) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.MaxOtherLot + "=\"" + dealingPolicyDetail.MaxOtherLot + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.MaxOtherLot + "=" + dealingPolicyDetail.MaxOtherLot;
                }
                if (dealingPolicyDetail.DQQuoteMinLot != dealingPolicyDetail.OldDQQuoteMinLot) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.DQQuoteMinLot + "=\"" + dealingPolicyDetail.DQQuoteMinLot + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.DQQuoteMinLot + "=" + dealingPolicyDetail.DQQuoteMinLot;
                }
                if (dealingPolicyDetail.AutoDQMaxLot != dealingPolicyDetail.OldAutoDQMaxLot) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.AutoDQMaxLot + "=\"" + dealingPolicyDetail.AutoDQMaxLot + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.AutoDQMaxLot + "=" + dealingPolicyDetail.AutoDQMaxLot;
                }
                if (dealingPolicyDetail.AutoLmtMktMaxLot != dealingPolicyDetail.OldAutoLmtMktMaxLot) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.AutoLmtMktMaxLot + "=\"" + dealingPolicyDetail.AutoLmtMktMaxLot + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.AutoLmtMktMaxLot + "=" + dealingPolicyDetail.AutoLmtMktMaxLot;
                }
                if (dealingPolicyDetail.AcceptDQVariation != dealingPolicyDetail.OldAcceptDQVariation) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.AcceptDQVariation + "=\"" + dealingPolicyDetail.AcceptDQVariation + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.AcceptDQVariation + "=" + dealingPolicyDetail.AcceptDQVariation;
                }
                if (dealingPolicyDetail.AcceptLmtVariation != dealingPolicyDetail.OldAcceptLmtVariation) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.AcceptLmtVariation + "=\"" + dealingPolicyDetail.AcceptLmtVariation + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.AcceptLmtVariation + "=" + dealingPolicyDetail.AcceptLmtVariation;
                }
                if (dealingPolicyDetail.AcceptCloseLmtVariation != dealingPolicyDetail.OldAcceptCloseLmtVariation) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.AcceptCloseLmtVariation + "=\"" + dealingPolicyDetail.AcceptCloseLmtVariation + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.AcceptCloseLmtVariation + "=" + dealingPolicyDetail.AcceptCloseLmtVariation;
                }
                if (dealingPolicyDetail.CancelLmtVariation != dealingPolicyDetail.OldCancelLmtVariation) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.CancelLmtVariation + "=\"" + dealingPolicyDetail.CancelLmtVariation + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.CancelLmtVariation + "=" + dealingPolicyDetail.CancelLmtVariation;
                }
                if (dealingPolicyDetail.AutoDQDelay != dealingPolicyDetail.OldAutoDQDelay) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.AutoDQDelay + "=\"" + dealingPolicyDetail.AutoDQDelay + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.AutoDQDelay + "=" + dealingPolicyDetail.AutoDQDelay;
                }
                if (dealingPolicyDetail.AllowedNewTradeSides != dealingPolicyDetail.oldAllowedNewTradeSides) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.AllowedNewTradeSides + "=\"" + dealingPolicyDetail.AllowedNewTradeSides + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.AllowedNewTradeSides + "=" + dealingPolicyDetail.AllowedNewTradeSides;
                }
                if (dealingPolicyDetail.AutoAcceptMaxLot != dealingPolicyDetail.OldAutoAcceptMaxLot) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.AutoAcceptMaxLot + "=\"" + dealingPolicyDetail.AutoAcceptMaxLot + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.AutoAcceptMaxLot + "=" + dealingPolicyDetail.AutoAcceptMaxLot;
                }
                if (dealingPolicyDetail.AutoCancelMaxLot != dealingPolicyDetail.OldAutoCancelMaxLot) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.AutoCancelMaxLot + "=\"" + dealingPolicyDetail.AutoCancelMaxLot + "\" ";
                    if (instrumentParameterEventMessage != "") instrumentParameterEventMessage = instrumentParameterEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.AutoCancelMaxLot + "=" + dealingPolicyDetail.AutoCancelMaxLot;
                }
                if (dealingPolicyDetail.HitPriceVariationForSTP != dealingPolicyDetail.OldHitPriceVariationForSTP) {
                    instrumentParameterXml += dealingPolicyDetailGridColKey.HitPriceVariationForSTP + "=\"" + dealingPolicyDetail.HitPriceVariationForSTP + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    instrumentParameterEventMessage += dealingPolicyDetailGridColKey.HitPriceVariationForSTP + "=" + dealingPolicyDetail.HitPriceVariationForSTP;
                }

                if (instrumentParameterXml != "") {
                    instrumentParameterXmls = "<Instruments>";
                    instrumentParameterXmls += "<Instrument ID=\"" + dealingPolicyDetail.InstrumentID + "\" ";
                    instrumentParameterXmls += instrumentParameterXml;
                    instrumentParameterXmls += "/>";
                    instrumentParameterXmls += "</Instruments>";
                }

                instrumentID = dealingPolicyDetail.InstrumentID;
                instrumentCode = dealingPolicyDetail.InstrumentCode;
                if (instrumentParameterEventMessage != "") {
                    instrumentParameterEventMessages = "DP: \n Code=" + instrumentCode + ": ";
                    instrumentParameterEventMessages += instrumentParameterEventMessage;
                }
            }
            else {
                var dealingPolicyDetailXml = "";
                var dealingPolicyDetailEventMessage = "";
                if (dealingPolicyDetail.MaxDQLot != dealingPolicyDetail.OldMaxDQLot) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.MaxDQLot + "=\"" + dealingPolicyDetail.MaxDQLot + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.MaxDQLot + "=" + dealingPolicyDetail.MaxDQLot;
                }
                if (dealingPolicyDetail.MaxOtherLot != dealingPolicyDetail.OldMaxOtherLot) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.MaxOtherLot + "=\"" + dealingPolicyDetail.MaxOtherLot + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.MaxOtherLot + "=" + dealingPolicyDetail.MaxOtherLot;
                }
                if (dealingPolicyDetail.DQQuoteMinLot != dealingPolicyDetail.OldDQQuoteMinLot) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.DQQuoteMinLot + "=\"" + dealingPolicyDetail.DQQuoteMinLot + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.DQQuoteMinLot + "=" + dealingPolicyDetail.DQQuoteMinLot;
                }
                if (dealingPolicyDetail.AutoDQMaxLot != dealingPolicyDetail.OldAutoDQMaxLot) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.AutoDQMaxLot + "=\"" + dealingPolicyDetail.AutoDQMaxLot + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.AutoDQMaxLot + "=" + dealingPolicyDetail.AutoDQMaxLot;
                }
                if (dealingPolicyDetail.AutoLmtMktMaxLot != dealingPolicyDetail.OldAutoLmtMktMaxLot) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.AutoLmtMktMaxLot + "=\"" + dealingPolicyDetail.AutoLmtMktMaxLot + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.AutoLmtMktMaxLot + "=" + dealingPolicyDetail.AutoLmtMktMaxLot;
                }
                if (dealingPolicyDetail.AcceptDQVariation != dealingPolicyDetail.OldAcceptDQVariation) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.AcceptDQVariation + "=\"" + dealingPolicyDetail.AcceptDQVariation + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.AcceptDQVariation + "=" + dealingPolicyDetail.AcceptDQVariation;
                }
                if (dealingPolicyDetail.AcceptLmtVariation != dealingPolicyDetail.OldAcceptLmtVariation) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.AcceptLmtVariation + "=\"" + dealingPolicyDetail.AcceptLmtVariation + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.AcceptLmtVariation + "=" + dealingPolicyDetail.AcceptLmtVariation;
                }
                if (dealingPolicyDetail.AcceptCloseLmtVariation != dealingPolicyDetail.OldAcceptCloseLmtVariation) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.AcceptCloseLmtVariation + "=\"" + dealingPolicyDetail.AcceptCloseLmtVariation + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.AcceptCloseLmtVariation + "=" + dealingPolicyDetail.AcceptCloseLmtVariation;
                }
                if (dealingPolicyDetail.CancelLmtVariation != dealingPolicyDetail.OldCancelLmtVariation) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.CancelLmtVariation + "=\"" + dealingPolicyDetail.CancelLmtVariation + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.CancelLmtVariation + "=" + dealingPolicyDetail.CancelLmtVariation;
                }
                if (dealingPolicyDetail.AutoDQDelay != dealingPolicyDetail.OldAutoDQDelay) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.AutoDQDelay + "=\"" + dealingPolicyDetail.AutoDQDelay + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.AutoDQDelay + "=" + dealingPolicyDetail.AutoDQDelay;
                }
                if (dealingPolicyDetail.AllowedNewTradeSides != dealingPolicyDetail.oldAllowedNewTradeSides) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.AllowedNewTradeSides + "=\"" + dealingPolicyDetail.AllowedNewTradeSides + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.AllowedNewTradeSides + "=" + dealingPolicyDetail.AllowedNewTradeSides;
                }
                if (dealingPolicyDetail.AutoAcceptMaxLot != dealingPolicyDetail.OldAutoAcceptMaxLot) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.AutoAcceptMaxLot + "=\"" + dealingPolicyDetail.AutoAcceptMaxLot + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.AutoAcceptMaxLot + "=" + dealingPolicyDetail.AutoAcceptMaxLot;
                }
                if (dealingPolicyDetail.AutoCancelMaxLot != dealingPolicyDetail.OldAutoCancelMaxLot) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.AutoCancelMaxLot + "=\"" + dealingPolicyDetail.AutoCancelMaxLot + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.AutoCancelMaxLot + "=" + dealingPolicyDetail.AutoCancelMaxLot;
                }
                if (dealingPolicyDetail.HitPriceVariationForSTP != dealingPolicyDetail.OldHitPriceVariationForSTP) {
                    dealingPolicyDetailXml += dealingPolicyDetailGridColKey.HitPriceVariationForSTP + "=\"" + dealingPolicyDetail.HitPriceVariationForSTP + "\" ";
                    if (dealingPolicyDetailEventMessage != "") dealingPolicyDetailEventMessage = dealingPolicyDetailEventMessage + ",";
                    dealingPolicyDetailEventMessage += dealingPolicyDetailGridColKey.HitPriceVariationForSTP + "=" + dealingPolicyDetail.HitPriceVariationForSTP;
                }
                if (dealingPolicyDetailXml != "") {
                    dealingPolicyDetailXml = "<DealingPolicyDetail "
                        + dealingPolicyDetailGridColKey.DealingPolicyID + "=\"" + dealingPolicyDetail.DealingPolicyID + "\" "
                        + dealingPolicyDetailGridColKey.InstrumentID + "=\"" + dealingPolicyDetail.InstrumentID + "\" "
                        + dealingPolicyDetailXml
                        + "/>";
                    dealingPolicyDetailXmls += dealingPolicyDetailXml;
                }

                if (dealingPolicyDetailEventMessage != "") {
                    if (dealingPolicyDetailEventMessages != "") dealingPolicyDetailEventMessages += "\n";
                    dealingPolicyDetailEventMessages += "DP=" + dealingPolicyDetail.DealingPolicyCode + ", Item=" + dealingPolicyDetail.InstrumentCode + ": ";
                    dealingPolicyDetailEventMessages += dealingPolicyDetailEventMessage;
                }
            }
        }
    }
    if (dealingPolicyDetailXmls != "") 
    {
        dealingPolicyDetailXmls = "<DealingPolicyDetails>" + dealingPolicyDetailXmls + "</DealingPolicyDetails>";
    }
    if (dealingPolicyDetailEventMessages != "") {
        dealingPolicyDetailEventMessages = "DP: " + dealingPolicyDetailEventMessages;
    }

    var returnObject = new Object();
    returnObject.dealingPolicyDetailXmls = dealingPolicyDetailXmls;
    returnObject.instrumentParameterXmls = instrumentParameterXmls;
    returnObject.dealingPolicyDetailEventMessages = dealingPolicyDetailEventMessages;
    returnObject.instrumentParameterEventMessages = instrumentParameterEventMessages;
    returnObject.instrumentID = instrumentID;
    returnObject.instrumentCode = instrumentCode;
    return returnObject;        
}

function OnDealingPolicyDetailGridBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    if (newRow == -1) return;
    var grid = window._DealingPolicyDetailGrid;
    var key = grid.ColKey(newCol);
    grid.Editable = (quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) ? flexEDKbdMouse : flexEDNone;
}

function OnDealingPolicyDetailGridValidateEdit(row, col, cancel) {
    var dealingPolicyDetailGridColKey = quotationFrm.dealingPolicyDetailGridColKey;
    var grid = window._DealingPolicyDetailGrid;
    var newValue = grid.EditText;
    var colKey = grid.ColKey(col);
    switch (colKey) {
        case dealingPolicyDetailGridColKey.MaxDQLot:
        case dealingPolicyDetailGridColKey.MaxOtherLot:
        case dealingPolicyDetailGridColKey.DQQuoteMinLot:
        case dealingPolicyDetailGridColKey.AutoDQMaxLot:
        case dealingPolicyDetailGridColKey.AutoLmtMktMaxLot:
            var regexExpression = "(\\d+((\\.\\d{4})|))"; //"(\\d+\\.{0,1})";
            var regex = new RegExp(regexExpression, "i");
            if (regex.exec(newValue) != null)
                grid.EditText = RegExp.$1;
            else
                grid.EditText = grid.TextMatrix(row, col);

            break;
        case dealingPolicyDetailGridColKey.AcceptDQVariation:
            var regexExpression = "(\\d+)";
            //var regexExpression = "^([1-9]\d*|(0|[1-9]\d*)\.\d*[1-9])$";
            var regex = new RegExp(regexExpression, "i");
            if (regex.exec(newValue) != null) {
                var value = parseInt(RegExp.$1);
                if (isNaN(value)) {
                    grid.EditText = grid.TextMatrix(row, col);
                }
                else {
                    grid.EditText = (value < 0) ? grid.TextMatrix(row, col) : RegExp.$1;
                }
            }
            else {
                grid.EditText = grid.TextMatrix(row, col);
            }
            break;
        case dealingPolicyDetailGridColKey.AcceptLmtVariation:
        case dealingPolicyDetailGridColKey.AcceptCloseLmtVariation:
        case dealingPolicyDetailGridColKey.CancelLmtVariation:
            var regexExpression = "(\\d+)";
            //var regexExpression = "^([1-9]\d*|(0|[1-9]\d*)\.\d*[1-9])$";
            var regex = new RegExp(regexExpression, "i");
            if (regex.exec(newValue) != null) {
                var value = parseInt(RegExp.$1);
                if (isNaN(value)) {
                    grid.EditText = grid.TextMatrix(row, col);
                }
                else {
                    grid.EditText = (newValue <= 0) ? grid.TextMatrix(row, col) : RegExp.$1;
                }
            }
            else {
                grid.EditText = grid.TextMatrix(row, col);
            }
            break;
        case dealingPolicyDetailGridColKey.AutoDQDelay:
            var regexExpression = "(\\d+)";
            var regex = new RegExp(regexExpression, "i");
            if (regex.exec(newValue) != null) {
                var value = parseInt(RegExp.$1);
                if (isNaN(value)) {
                    grid.EditText = grid.TextMatrix(row, col);
                }
                else {
                    grid.EditText = (value >= 0 && value <= 10) ? value : grid.TextMatrix(row, col);
                }
            }
            else {
                grid.EditText = grid.TextMatrix(row, col);
            }
            break;
        case dealingPolicyDetailGridColKey.HitPriceVariationForSTP:
            var regexExpression = "(\\d+)";
            var regex = new RegExp(regexExpression, "i");
            if (regex.exec(newValue) != null) {
                var value = parseInt(RegExp.$1);
                if (isNaN(value)) {
                    grid.EditText = grid.TextMatrix(row, col);
                }
                else {
                    grid.EditText = (value >= 0 && value <= 9999) ? value : grid.TextMatrix(row, col);
                }
            }
            else {
                grid.EditText = grid.TextMatrix(row, col);
            }
            break;
        default:
            grid.EditText = newValue;            
            break;
    }
}


//1
//2
//10
//0
//100
//-1
//-2 
//hh
//100
//10.2


function OnDealingPolicyDetailGridAfterEdit(row, col, cancel) {
    var dealingPolicyDetailGridColKey = quotationFrm.dealingPolicyDetailGridColKey;
    var grid = window._DealingPolicyDetailGrid;
    var dealingPolicyDetail = grid.RowData(row);
    if (dealingPolicyDetail) {
        switch (grid.ColKey(col)) {
            case dealingPolicyDetailGridColKey.MaxDQLot:                
                var newValue = parseFloat(grid.TextMatrix(row, col));
                if (newValue < dealingPolicyDetail.DQQuoteMinLot) {
                    grid.TextMatrix(row, col) = dealingPolicyDetail.MaxDQLot;
                }
                else {
                    dealingPolicyDetail.MaxDQLot = newValue;
                    dealingPolicyDetail.NeedUpdate = true;
                }
                break;
            case dealingPolicyDetailGridColKey.MaxOtherLot:
                dealingPolicyDetail.MaxOtherLot = parseFloat(grid.TextMatrix(row, col));
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.DQQuoteMinLot:
                var newValue = parseFloat(grid.TextMatrix(row, col));
                if (newValue > dealingPolicyDetail.MaxDQLot) {
                    grid.TextMatrix(row, col) = dealingPolicyDetail.DQQuoteMinLot;
                }
                else {
                    dealingPolicyDetail.DQQuoteMinLot = newValue;
                    dealingPolicyDetail.NeedUpdate = true;
                }
                break;
            case dealingPolicyDetailGridColKey.AutoDQMaxLot:
                dealingPolicyDetail.AutoDQMaxLot = parseFloat(grid.TextMatrix(row, col));
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AutoLmtMktMaxLot:
                dealingPolicyDetail.AutoLmtMktMaxLot = parseFloat(grid.TextMatrix(row, col));
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AcceptDQVariation:
                dealingPolicyDetail.AcceptDQVariation = parseInt(grid.TextMatrix(row, col));
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AcceptLmtVariation:
                dealingPolicyDetail.AcceptLmtVariation = parseInt(grid.TextMatrix(row, col));
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AcceptCloseLmtVariation:
                dealingPolicyDetail.AcceptCloseLmtVariation = parseInt(grid.TextMatrix(row, col));
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.CancelLmtVariation:
                dealingPolicyDetail.CancelLmtVariation = parseInt(grid.TextMatrix(row, col));
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AutoDQDelay:
                var newValue = parseInt(grid.TextMatrix(row, col));
                if (dealingPolicyDetail.IsValidAutoDQDelayValue(newValue)) {
                    dealingPolicyDetail.AutoDQDelay = newValue;
                    dealingPolicyDetail.NeedUpdate = true;
                }
                break;
            case dealingPolicyDetailGridColKey.AllowedNewTradeSides:
                if (!quotationFrm.oDealingConsole.CanModifyDealerParameter(grid.ColKey(col))) {
                    grid.TextMatrix(row, col) = dealingPolicyDetail.AllowedNewTradeSides;
                    break;
                }
                else {
                    var newAllowedTradeSidesTypeValue = AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeValue(grid.TextMatrix(row, col));
                    if (newAllowedTradeSidesTypeValue != dealingPolicyDetail.AllowedNewTradeSides) {
                        dealingPolicyDetail.AllowedNewTradeSides = newAllowedTradeSidesTypeValue;
                        dealingPolicyDetail.NeedUpdate = true;
                    }
                }
                break;
            case dealingPolicyDetailGridColKey.AutoAcceptMaxLot:
                if (!quotationFrm.oDealingConsole.CanModifyDealerParameter(grid.ColKey(col))) {
                    grid.TextMatrix(row, col) = dealingPolicyDetail.AutoAcceptMaxLot;
                }
                else {
                    dealingPolicyDetail.AutoAcceptMaxLot = parseFloat(grid.TextMatrix(row, col));
                    dealingPolicyDetail.NeedUpdate = true;
                }
                break;
            case dealingPolicyDetailGridColKey.AutoCancelMaxLot:
                if (!quotationFrm.oDealingConsole.CanModifyDealerParameter(grid.ColKey(col))) {
                    grid.TextMatrix(row, col) = dealingPolicyDetail.AutoCancelMaxLot;
                }
                else {
                    dealingPolicyDetail.AutoCancelMaxLot = parseFloat(grid.TextMatrix(row, col));
                    dealingPolicyDetail.NeedUpdate = true;
                }
                break;
            case dealingPolicyDetailGridColKey.HitPriceVariationForSTP:
                var newValue = parseInt(grid.TextMatrix(row, col));
                if (dealingPolicyDetail.IsValidHitPriceVariationForSTPValue(newValue)) {
                    dealingPolicyDetail.HitPriceVariationForSTP = newValue;
                    dealingPolicyDetail.NeedUpdate = true;
                }
                break;
            default:
                break;
        }
    }
}

//Unused
function Reset() {
    window._MaxDQLotText.value = "";
    window._MaxOtherLotText.value = "";
    window._DQQuoteMinLotText.value = "";
    window._AutoDQMaxLotText.value = "";
    window._AutoLmtMktMaxLotText.value = "";
    window._AcceptDQVariationText.value = "";
    window._AcceptLmtVariationText.value = "";
    window._CancelLmtVariationText.value = "";
    window._AutoDQDelayText.value = "";
    window._AllowAddNewPositionCheckbox.checked = true;
    window._AutoAcceptMaxLotText.value = "";
    window._AutoCancelMaxLotText.value = "";
}
 
 //Unused
function SetToDefaul() {
    window._MaxDQLotText.value = 100;
    window._MaxOtherLotText.value = 100;
    window._DQQuoteMinLotText.value = 1;
    window._AutoDQMaxLotText.value = 1;
    window._AutoLmtMktMaxLotText.value = 1;
    window._AcceptDQVariationText.value = 50;
    window._AcceptLmtVariationText.value = 10;
    window._CancelLmtVariationText.value = 10;
    window._AutoDQDelayText.value = 0;
    window._AllowAddNewPositionCheckbox.checked = true;
    window._AutoAcceptMaxLotText.value = 9999.00;
    window._AutoCancelMaxLotText.value = 9999.00;
}

//Unused
function Apply() {
    var dealingPolicyDetailGridColKey = quotationFrm.dealingPolicyDetailGridColKey;
    var grid = window._DealingPolicyDetailGrid;
    for (var row = grid.FixedRows, count = grid.Rows; row < count; row++) {
        var dealingPolicyDetail = grid.RowData(row);
        if (dealingPolicyDetail) {
            for (var col = grid.FixedCols, count2 = grid.Cols; col < count2; col++) {
                switch (grid.ColKey(col)) {
                    case dealingPolicyDetailGridColKey.MaxDQLot:
                        if (window._MaxDQLotText.value == "") continue;
                        var newValue = parseFloat(window._MaxDQLotText.value);
                        if (newValue < dealingPolicyDetail.DQQuoteMinLot) {
                            grid.TextMatrix(row, col) = dealingPolicyDetail.MaxDQLot;
                        }
                        else {
                            dealingPolicyDetail.MaxDQLot = newValue;
                            grid.TextMatrix(row, col) = newValue;
                            dealingPolicyDetail.NeedUpdate = true;
                        }
                        break;
                    case dealingPolicyDetailGridColKey.MaxOtherLot:
                        if (window._MaxOtherLotText.value == "") continue;
                        var newValue = parseFloat(window._MaxOtherLotText.value);
                        dealingPolicyDetail.MaxOtherLot = newValue;
                        grid.TextMatrix(row, col) = newValue;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    case dealingPolicyDetailGridColKey.DQQuoteMinLot:
                        if (window._DQQuoteMinLotText.value == "") continue;
                        var newValue = parseFloat(window._DQQuoteMinLotText.value);
                        if (newValue > dealingPolicyDetail.MaxDQLot) {
                            grid.TextMatrix(row, col) = dealingPolicyDetail.DQQuoteMinLot;
                        }
                        else {
                            dealingPolicyDetail.DQQuoteMinLot = newValue;
                            grid.TextMatrix(row, col) = newValue;
                            dealingPolicyDetail.NeedUpdate = true;
                        }
                        break;
                    case dealingPolicyDetailGridColKey.AutoDQMaxLot:
                        if (window._AutoDQMaxLotText.value == "") continue;
                        var newValue = parseFloat(window._AutoDQMaxLotText.value);
                        dealingPolicyDetail.AutoDQMaxLot = newValue;
                        grid.TextMatrix(row, col) = newValue;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    case dealingPolicyDetailGridColKey.AutoLmtMktMaxLot:
                        if (window._AutoLmtMktMaxLotText.value == "") continue;
                        var newValue = parseFloat(window._AutoLmtMktMaxLotText.value);
                        dealingPolicyDetail.AutoLmtMktMaxLot = newValue;
                        grid.TextMatrix(row, col) = newValue;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    case dealingPolicyDetailGridColKey.AcceptDQVariation:
                        if (window._AcceptDQVariationText.value == "") continue;
                        var newValue = parseInt(window._AcceptDQVariationText.value);
                        dealingPolicyDetail.AcceptDQVariation = newValue;
                        grid.TextMatrix(row, col) = newValue;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    case dealingPolicyDetailGridColKey.AcceptLmtVariation:
                        if (window._AcceptLmtVariationText.value == "") continue;
                        var newValue = parseInt(window._AcceptLmtVariationText.value);
                        dealingPolicyDetail.AcceptLmtVariation = newValue;
                        grid.TextMatrix(row, col) = newValue;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    case dealingPolicyDetailGridColKey.AcceptCloseLmtVariation:
                        if (window._AcceptCloseLmtVariationText.value == "") continue;
                        var newValue = parseInt(window._AcceptCloseLmtVariationText.value);
                        dealingPolicyDetail.AcceptCloseLmtVariation = newValue;
                        grid.TextMatrix(row, col) = newValue;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    case dealingPolicyDetailGridColKey.CancelLmtVariation:
                        if (window._CancelLmtVariationText.value == "") continue;
                        var newValue = parseInt(window._CancelLmtVariationText.value);
                        dealingPolicyDetail.CancelLmtVariation = newValue;
                        grid.TextMatrix(row, col) = newValue;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    case dealingPolicyDetailGridColKey.AutoDQDelay:
                        if (window._AutoDQDelayText.value == "") continue;
                        var newValue = parseInt(window._AutoDQDelayText.value);
                        if (dealingPolicyDetail.IsValidAutoDQDelayValue(newValue)) {
                            dealingPolicyDetail.AutoDQDelay = newValue;
                            grid.TextMatrix(row, col) = newValue;
                            dealingPolicyDetail.NeedUpdate = true;
                        }
                        break;
                    case dealingPolicyDetailGridColKey.AllowedNewTradeSides:
                        var newValue = window.document.all._AllowAddNewPositionCheckbox.checked;
                        dealingPolicyDetail.AllowedNewTradeSides = newValue;
                        grid.Cell(flexcpChecked, row, col) = newValue ? flexChecked : flexUnchecked;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    case dealingPolicyDetailGridColKey.AutoAcceptMaxLot:
                        if (window._AutoAcceptMaxLotText.value == "") continue;
                        var newValue = parseFloat(window._AutoAcceptMaxLotText.value);
                        dealingPolicyDetail.AutoAcceptMaxLot = newValue;
                        grid.TextMatrix(row, col) = newValue;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    case dealingPolicyDetailGridColKey.AutoCancelMaxLot:
                        if (window._AutoCancelMaxLotText.value == "") continue;
                        var newValue = parseFloat(window._AutoCancelMaxLotText.value);
                        dealingPolicyDetail.AutoCancelMaxLot = newValue;
                        grid.TextMatrix(row, col) = newValue;
                        dealingPolicyDetail.NeedUpdate = true;
                        break;
                    default:
                        break;
                } 
            }            
        }
    }
}

function onBlurEvent() {
    window._MaxDQLotText.value = CheckSetValue(window._MaxDQLotText,false,100);
    window._MaxOtherLotText.value = CheckSetValue(window._MaxOtherLotText, false, 100);
    window._DQQuoteMinLotText.value = CheckSetValue(window._DQQuoteMinLotText, false, 1);
    window._AutoDQMaxLotText.value = CheckSetValue(window._AutoDQMaxLotText, false, 1);
    window._AutoLmtMktMaxLotText.value = CheckSetValue(window._AutoLmtMktMaxLotText, false, 1);
    window._AcceptDQVariationText.value = CheckSetValue(window._AcceptDQVariationText, true, 50);
    var inputValue = CheckSetValue(window._AcceptLmtVariationText, true, 10);
    window._AcceptLmtVariationText.value = inputValue <= 0 ? 10 : inputValue;
    var inputValue = CheckSetValue(window._AcceptCloseLmtVariationText, true, 10);
    window._AcceptCloseLmtVariationText.value = inputValue <= 0 ? 10 : inputValue;
    var inputValue = CheckSetValue(window._CancelLmtVariationText, true, 10);
    window._CancelLmtVariationText.value = inputValue <= 0 ? 10 : inputValue;
    var inputValue = CheckSetValue(window._AutoDQDelayText, true, 0);
    window._AutoDQDelayText.value = inputValue < 0 ? 0 : inputValue;
    window._AutoAcceptMaxLotText.value = CheckSetValue(window._AutoAcceptMaxLotText, true, 9999.00);
    window._AutoCancelMaxLotText.value = CheckSetValue(window._AutoCancelMaxLotText, true, 9999.00);
    var inputValue = CheckSetValue(window._HitPriceVariationForSTPText, true, 10);
    window._HitPriceVariationForSTPText.value = inputValue <= 0 ?10:inputValue;
}

function CheckSetValue(control,isInt,defaultValue) {
    var value;
    if (isInt) {
        value = parseInt(control.value);
        return isNaN(value) ? defaultValue : value;
    }
    else {
        value = parseFloat(control.value);
        return isNaN(value) ? defaultValue : control.value;
    }    
}

//function regInput(obj, reg, inputStr) {
//    var docSel = document.selection.createRange();
//    if (docSel.parentElement().tagName != "INPUT") return false;
//    oSel = docSel.duplicate();
//    oSel.text = "";
//    var srcRange = obj.createTextRange();
//    oSel.setEndPoint("StartToStart", srcRange);
//    var str = oSel.text + inputStr + srcRange.text.substr(oSel.text.length);
//    return reg.test(str);
//}

//function onKeyPressEvent(obj) {
//    return regInput(obj, /^\d*\.?\d{0,2}$/, String.fromCharCode(event.keyCode));
//}

//function onPasteEvent() {
//    return regInput(obj, /^\d*\.?\d{0,2}$/, window.clipboardData.getData('Text'));
//}

//function onDropEvent() {
//    return regInput(obj, /^\d*\.?\d{0,2}$/, event.dataTransfer.getData('Text'));
//}

function UpdateData(grid, line, colIndex, newValue) {
    var dealingPolicyDetailGridColKey = quotationFrm.dealingPolicyDetailGridColKey;
    
    var dealingPolicyDetail = grid.RowData(line);
    if (dealingPolicyDetail) {
        switch (grid.ColKey(colIndex)) {
            case dealingPolicyDetailGridColKey.MaxDQLot:
                if (newValue >= dealingPolicyDetail.DQQuoteMinLot) {
                    dealingPolicyDetail.MaxDQLot = newValue;
                    grid.TextMatrix(line, colIndex) = newValue;
                    dealingPolicyDetail.NeedUpdate = true;
                }
                break;
            case dealingPolicyDetailGridColKey.MaxOtherLot:
                dealingPolicyDetail.MaxOtherLot = newValue;
                grid.TextMatrix(line, colIndex) = newValue;
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.DQQuoteMinLot:
                if (newValue <= dealingPolicyDetail.MaxDQLot) {
                    dealingPolicyDetail.DQQuoteMinLot = newValue;
                    grid.TextMatrix(line, colIndex) = newValue;
                    dealingPolicyDetail.NeedUpdate = true;
                }
                break;
            case dealingPolicyDetailGridColKey.AutoDQMaxLot:
                dealingPolicyDetail.AutoDQMaxLot = newValue;
                grid.TextMatrix(line, colIndex) = newValue;
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AutoLmtMktMaxLot:
                dealingPolicyDetail.AutoLmtMktMaxLot = newValue;
                grid.TextMatrix(line, colIndex) = newValue;
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AcceptDQVariation:
                dealingPolicyDetail.AcceptDQVariation = newValue;
                grid.TextMatrix(line, colIndex) = newValue;
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AcceptLmtVariation:
                dealingPolicyDetail.AcceptLmtVariation = newValue;
                grid.TextMatrix(line, colIndex) = newValue;
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AcceptCloseLmtVariation:
                dealingPolicyDetail.AcceptCloseLmtVariation = newValue;
                grid.TextMatrix(line, colIndex) = newValue;
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.CancelLmtVariation:
                dealingPolicyDetail.CancelLmtVariation = newValue;
                grid.TextMatrix(line, colIndex) = newValue;
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AutoDQDelay:
                if (dealingPolicyDetail.IsValidAutoDQDelayValue(newValue)) {
                    dealingPolicyDetail.AutoDQDelay = newValue;
                    grid.TextMatrix(line, colIndex) = newValue;
                    dealingPolicyDetail.NeedUpdate = true;
                }
                break;
            case dealingPolicyDetailGridColKey.AllowedNewTradeSides:
                dealingPolicyDetail.AllowedNewTradeSides = newValue;
                grid.TextMatrix(line, colIndex) = AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeStr(newValue);
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AutoAcceptMaxLot:
                dealingPolicyDetail.AutoAcceptMaxLot = newValue;
                grid.TextMatrix(line, colIndex) =AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeStr(newValue);
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.AutoCancelMaxLot:
                dealingPolicyDetail.AutoCancelMaxLot = newValue;
                grid.TextMatrix(line, colIndex) = newValue;
                dealingPolicyDetail.NeedUpdate = true;
                break;
            case dealingPolicyDetailGridColKey.HitPriceVariationForSTP:
                dealingPolicyDetail.HitPriceVariationForSTP = newValue;
                grid.TextMatrix(line, colIndex) = newValue;
                dealingPolicyDetail.NeedUpdate = true;
                break;
            default:
                break;
        }
    }
}

function AddPoints(colIndex, value, allowNegative, allowZero, isInt) {
    var grid = window._DealingPolicyDetailGrid;

    var addedPoints = 0;
    if (isInt) {
        addedPoints = parseInt(value);
    }
    else {
        addedPoints = parseFloat(value);
    }
    if (isNaN(addedPoints)) {
        addedPoints = 0;
    }
    if (addedPoints == 0) return;

    for (var line = grid.FixedRows; line < grid.Rows; line++) {
        var points = 0;
        if (isInt) {
            points = parseInt(grid.TextMatrix(line, colIndex));
         }
         else {
             points = parseFloat(grid.TextMatrix(line, colIndex));
        }
        if (isNaN(points)) {
            points = 0;
        }

        if ((addedPoints + points) < 0 && !allowNegative) continue;
        if ((addedPoints + points) == 0 && !allowZero) continue;
        
        var newValue = addedPoints + points;
        UpdateData(grid, line, colIndex, newValue);
    }
}

function ReplacePoints(colIndex, value, allowNegative, allowZero, isInt) {
    var grid = window._DealingPolicyDetailGrid;
    
    var replacedPoints = 0;
    if (isInt) {
        replacedPoints = parseInt(value);
     }
     else {
         replacedPoints = parseFloat(value);
    }
    if (isNaN(replacedPoints)) {
        replacedPoints = 0;
    }

    if (replacedPoints < 0 && !allowNegative) return;
    if (replacedPoints == 0 && !allowZero) return;
    
    for (var line = grid.FixedRows; line < grid.Rows; line++) {
        UpdateData(grid, line, colIndex, replacedPoints);
    }
}

function MaxDQLotAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("MaxDQLot");
    AddPoints(colIndex, window.document.all._MaxDQLotText.value, false, true, false);
}

function MaxDQLotReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("MaxDQLot");
    ReplacePoints(colIndex, window.document.all._MaxDQLotText.value, false, true, false);
}

function MaxOtherLotAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("MaxOtherLot");
    AddPoints(colIndex, window.document.all._MaxOtherLotText.value, false, true, false);
}

function MaxOtherLotReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("MaxOtherLot");
    ReplacePoints(colIndex, window.document.all._MaxOtherLotText.value, false, true, false);
}

function DQQuoteMinLotAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("DQQuoteMinLot");
    AddPoints(colIndex, window.document.all._DQQuoteMinLotText.value, false, true, false);
}

function DQQuoteMinLotReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("DQQuoteMinLot");
    ReplacePoints(colIndex, window.document.all._DQQuoteMinLotText.value, false, true, false);
}

function AutoDQMaxLotAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoDQMaxLot");
    AddPoints(colIndex, window.document.all._AutoDQMaxLotText.value, false, true, false);
}

function AutoDQMaxLotReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoDQMaxLot");
    ReplacePoints(colIndex, window.document.all._AutoDQMaxLotText.value, false, true, false);
}

function AutoLmtMktMaxLotAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoLmtMktMaxLot");
    AddPoints(colIndex, window.document.all._AutoLmtMktMaxLotText.value, false, true, false);
}

function AutoLmtMktMaxLotReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoLmtMktMaxLot");
    ReplacePoints(colIndex, window.document.all._AutoLmtMktMaxLotText.value, false, true, false);
}

function AcceptDQVariationAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AcceptDQVariation");
    AddPoints(colIndex, window.document.all._AcceptDQVariationText.value, false, false, true);
}

function AcceptDQVariationReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AcceptDQVariation");
    ReplacePoints(colIndex, window.document.all._AcceptDQVariationText.value, false, true, true);
}

function AcceptLmtVariationAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AcceptLmtVariation");
    AddPoints(colIndex, window.document.all._AcceptLmtVariationText.value, false, false, true);
}

function AcceptLmtVariationReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AcceptLmtVariation");
    ReplacePoints(colIndex, window.document.all._AcceptLmtVariationText.value, false, false, true);
}

function AcceptCloseLmtVariationAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AcceptCloseLmtVariation");
    AddPoints(colIndex, window.document.all._AcceptCloseLmtVariationText.value, false, false, true);
}

function AcceptCloseLmtVariationReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AcceptCloseLmtVariation");
    ReplacePoints(colIndex, window.document.all._AcceptCloseLmtVariationText.value, false, false, true);
}

function CancelLmtVariationAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("CancelLmtVariation");
    AddPoints(colIndex, window.document.all._CancelLmtVariationText.value, false, false, true);
}

function CancelLmtVariationReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("CancelLmtVariation");
    ReplacePoints(colIndex, window.document.all._CancelLmtVariationText.value, false, false, true);
}

function AutoDQDelayAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoDQDelay");
    AddPoints(colIndex, window.document.all._AutoDQDelayText.value, false, false, true);
}

function AutoDQDelayReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoDQDelay");
    ReplacePoints(colIndex, window.document.all._AutoDQDelayText.value, false, true, true);
}

function ReplaceBooleanValue(colIndex, value) {
    var grid = window._DealingPolicyDetailGrid;
    for (var line = grid.FixedRows; line < grid.Rows; line++) {
        UpdateData(grid, line, colIndex, value);
    }
}

function AllowedNewTradeSidesReplace() {
//Erric
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AllowedNewTradeSides");
    var newValue = this._AllowedNewTradeSidesCmb.value;
    ReplaceBooleanValue(colIndex, newValue);
}

function AutoAcceptMaxLotAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoAcceptMaxLot");
    AddPoints(colIndex, window.document.all._AutoAcceptMaxLotText.value, false, false, true);
}

function AutoAcceptMaxLotReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoAcceptMaxLot");
    ReplacePoints(colIndex, window.document.all._AutoAcceptMaxLotText.value, false, true, true);
}

function AutoCancelMaxLotAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoCancelMaxLot");
    AddPoints(colIndex, window.document.all._AutoCancelMaxLotText.value, false, false, true);
}

function AutoCancelMaxLotReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("AutoCancelMaxLot");
    ReplacePoints(colIndex, window.document.all._AutoCancelMaxLotText.value, false, true, true);
}
function HitPriceVariationForSTPAdd() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("HitPriceVariationForSTP");
    AddPoints(colIndex, window.document.all._HitPriceVariationForSTPText.value, false, false, true);
}
function HitPriceVariationForSTPReplace() {
    var colIndex = window._DealingPolicyDetailGrid.ColIndex("HitPriceVariationForSTP");
    ReplacePoints(colIndex, window.document.all._HitPriceVariationForSTPText.value, false, true, true);
};