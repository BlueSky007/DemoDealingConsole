//Added Michael on 2005-06-30
function FlexQuotationInit() {
    with (vsflexQuotation) {
        Rows = 1;
        Cols = 66;
        FixedRows = 1;
        FixedCols = 1;
        FrozenCols = 3;

        var quotationFrm = window.parent.quotationFrm;
        var instrumentColKey = quotationFrm.instrumentColKey;
        var instrumentLanguage = quotationFrm.instrumentLanguage;
        var comboListLanguage = window.parent.quotationFrm.comboListLanguage;

        var columnIndex;
        ColKey(0) = instrumentColKey.Sequence;
        columnIndex = ColIndex(instrumentColKey.Sequence);
        TextMatrix(0, columnIndex) = " ";
        ColWidth(columnIndex) = 200;

        ColKey(Cols - 1) = instrumentColKey.ID;
        columnIndex = ColIndex(instrumentColKey.ID);
        TextMatrix(0, columnIndex) = "";
        ColHidden(columnIndex) = true;
        ColWidth(columnIndex) = 2000;

        var parameter = quotationFrm.oDealingConsole.InitGrid(window.vsflexQuotation, quotationFrm.optionGrid.QuotationGrid, instrumentLanguage);
        if (parameter == "") GridColumnsDefaultFormatForQuotation(window.vsflexQuotation, instrumentColKey);

        columnIndex = ColIndex(instrumentColKey.Time);
        ColFormat(columnIndex) = "HH:mm:ss";
        columnIndex = ColIndex(instrumentColKey.Adjust);
        ColDataType(columnIndex) = flexDTCurrency;
        columnIndex = ColIndex(instrumentColKey.IsOriginHiLo);
        ColDataType(columnIndex) = flexDTBoolean;
        columnIndex = ColIndex(instrumentColKey.PriceType);
        //ColComboList(columnIndex) = "Reference|Deal|Origin Enable";
        ColComboList(columnIndex) = comboListLanguage["PriceTypeComboList"]; //"One Price|BidAsk";
        columnIndex = ColIndex(instrumentColKey.OpenTime);
        ColFormat(columnIndex) = "HH:mm:ss";
        columnIndex = ColIndex(instrumentColKey.CloseTime);
        ColFormat(columnIndex) = "HH:mm:ss";
        columnIndex = ColIndex(instrumentColKey.OriginType);
        ColComboList(columnIndex) = comboListLanguage["OriginTypeComboList"];
        columnIndex = ColIndex(instrumentColKey.AllowedSpotTradeOrderSides);
        ColComboList(columnIndex) = comboListLanguage["AllowedOrderSidesComboList"]; 
        columnIndex = ColIndex(instrumentColKey.IsBetterPrice);
        ColDataType(columnIndex) = flexDTBoolean;
        columnIndex = ColIndex(instrumentColKey.AutoAcceptMaxLot);
        columnIndex = ColIndex(instrumentColKey.AutoCancelMaxLot);
        columnIndex = ColIndex(instrumentColKey.AllowedNewTradeSides);
        ColComboList(columnIndex) = comboListLanguage["AllowedNewTradeSidesTypeComboList"];
        //ColDataType(columnIndex) = flexDTBoolean;

        columnIndex = ColIndex(instrumentColKey.IsAutoEnablePrice);
        ColDataType(columnIndex) = flexDTBoolean;
        columnIndex = ColIndex(instrumentColKey.IsAutoFill);
        ColDataType(columnIndex) = flexDTBoolean;
        columnIndex = ColIndex(instrumentColKey.IsPriceEnabled);
        ColDataType(columnIndex) = flexDTBoolean;

        FixedAlignment(ColIndex(instrumentColKey.ResumeOrSuspend)) = flexAlignCenterCenter;
        ColAlignment(ColIndex(instrumentColKey.ResumeOrSuspend)) = flexAlignCenterCenter;

        FixedAlignment(ColIndex(instrumentColKey.AllowOrRejectLMT)) = flexAlignCenterCenter;
        ColAlignment(ColIndex(instrumentColKey.AllowOrRejectLMT)) = flexAlignCenterCenter;

        ExtendLastCol = false;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExMove;
        SelectionMode = flexSelectionFree;
        focus();
    }
    _QuotationGridColIndexs = new QuotationGridColIndexs();
}

//Added Michael on 2005-06-30
function GridColumnsDefaultFormatForQuotation(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.Item)) = 750;
        ColWidth(ColIndex(gridColKey.Time)) = 1000;
        ColWidth(ColIndex(gridColKey.SourceBid)) = 750;
        ColWidth(ColIndex(gridColKey.SourceAsk)) = 750;
        ColWidth(ColIndex(gridColKey.Source)) = 750;
        ColWidth(ColIndex(gridColKey.Adjust)) = 750;
        ColWidth(ColIndex(gridColKey.Bid)) = 750;
        ColWidth(ColIndex(gridColKey.Ask)) = 750;
        ColWidth(ColIndex(gridColKey.HistoryBid)) = 750;
        ColWidth(ColIndex(gridColKey.HistoryAsk)) = 750;
        ColWidth(ColIndex(gridColKey.High)) = 750;
        ColWidth(ColIndex(gridColKey.Low)) = 750;
        ColWidth(ColIndex(gridColKey.Count)) = 700;
        ColWidth(ColIndex(gridColKey.OpenTime)) = 1000;
        ColWidth(ColIndex(gridColKey.CloseTime)) = 1000;
        ColWidth(ColIndex(gridColKey.MaxSpreadPoints)) = 750;
        ColWidth(ColIndex(gridColKey.SpreadPoints)) = 750;
        ColWidth(ColIndex(gridColKey.SpreadPoints2)) = 750;
        ColWidth(ColIndex(gridColKey.SpreadPoints3)) = 750;
        ColWidth(ColIndex(gridColKey.SpreadPoints4)) = 750;
        ColWidth(ColIndex(gridColKey.MaxAutoAdjustPoints)) = 750;
        ColWidth(ColIndex(gridColKey.AutoAdjustPoints)) = 750;
        ColWidth(ColIndex(gridColKey.AutoAdjustPoints2)) = 750;
        ColWidth(ColIndex(gridColKey.AutoAdjustPoints3)) = 750;
        ColWidth(ColIndex(gridColKey.AutoAdjustPoints4)) = 750;
        ColWidth(ColIndex(gridColKey.IsOriginHiLo)) = 500;
        ColWidth(ColIndex(gridColKey.PriceType)) = 1000;
        ColWidth(ColIndex(gridColKey.OriginType)) = 1000;
        ColWidth(ColIndex(gridColKey.AllowedSpotTradeOrderSides)) = 1000;
        ColWidth(ColIndex(gridColKey.OriginInactiveTime)) = 750;
        ColWidth(ColIndex(gridColKey.AlertVariation)) = 750;
        ColWidth(ColIndex(gridColKey.NormalWaitTime)) = 750;
        ColWidth(ColIndex(gridColKey.AlertWaitTime)) = 750;
        ColWidth(ColIndex(gridColKey.MaxDQLot)) = 750;
        ColWidth(ColIndex(gridColKey.MaxOtherLot)) = 750;
        ColWidth(ColIndex(gridColKey.DQQuoteMinLot)) = 750;
        ColWidth(ColIndex(gridColKey.AutoDQMaxLot)) = 750;
        ColWidth(ColIndex(gridColKey.AutoLmtMktMaxLot)) = 750;
        ColWidth(ColIndex(gridColKey.AcceptDQVariation)) = 750;
        ColWidth(ColIndex(gridColKey.AcceptLmtVariation)) = 750;
        ColWidth(ColIndex(gridColKey.AcceptCloseLmtVariation)) = 750;
        ColWidth(ColIndex(gridColKey.CancelLmtVariation)) = 750;
        ColWidth(ColIndex(gridColKey.MaxMinAdjust)) = 750;
        ColWidth(ColIndex(gridColKey.IsBetterPrice)) = 750;
        ColWidth(ColIndex(gridColKey.AutoAcceptMaxLot)) = 750;
        ColWidth(ColIndex(gridColKey.AutoCancelMaxLot)) = 750;
        ColWidth(ColIndex(gridColKey.AllowedNewTradeSides)) = 750;
        ColWidth(ColIndex(gridColKey.HitTimes)) = 750;
        ColWidth(ColIndex(gridColKey.PenetrationPoint)) = 750;
        ColWidth(ColIndex(gridColKey.PriceValidTime)) = 750;
        ColWidth(ColIndex(gridColKey.LastAcceptTimeSpan)) = 750;
        ColWidth(ColIndex(gridColKey.IsAutoEnablePrice)) = 500;
        ColWidth(ColIndex(gridColKey.IsAutoFill)) = 500;
        ColWidth(ColIndex(gridColKey.IsPriceEnabled)) = 500;
        ColWidth(ColIndex(gridColKey.AutoDQDelay)) = 500;
        ColWidth(ColIndex(gridColKey.HitPriceVariationForSTP)) = 500;
        ColWidth(ColIndex(gridColKey.BuyLot)) = 750;
        ColWidth(ColIndex(gridColKey.SellLot)) = 750;
        ColWidth(ColIndex(gridColKey.LastLot)) = 750;
        ColWidth(ColIndex(gridColKey.LastSales)) = 750;
        ColWidth(ColIndex(gridColKey.ResumeOrSuspend)) = 2500;
        ColWidth(ColIndex(gridColKey.AllowOrRejectLMT)) = 2500;
    }
}

function OnQuotationGridAfterMoveColumn(col, position) {
    _QuotationGridColIndexs = new QuotationGridColIndexs();
}

function QuotationGridFontChanged() {
    _QuotationGridColIndexs = new QuotationGridColIndexs();
}

var _QuotationGridColIndexs = null;
function QuotationGridColIndexs() {
    this.Sequence = vsflexQuotation.ColIndex("Sequence");
    this.ID = vsflexQuotation.ColIndex("ID");
    this.Item = vsflexQuotation.ColIndex("Item");
    this.Time = vsflexQuotation.ColIndex("Time");
    this.SourceBid = vsflexQuotation.ColIndex("SourceBid");
    this.SourceAsk = vsflexQuotation.ColIndex("SourceAsk");
    this.Source = vsflexQuotation.ColIndex("Source");
    this.Adjust = vsflexQuotation.ColIndex("Adjust");
    this.Bid = vsflexQuotation.ColIndex("Bid");
    this.Ask = vsflexQuotation.ColIndex("Ask");
    this.HistoryBid = vsflexQuotation.ColIndex("HistoryBid");
    this.HistoryAsk = vsflexQuotation.ColIndex("HistoryAsk");
    this.High = vsflexQuotation.ColIndex("High");
    this.Low = vsflexQuotation.ColIndex("Low");
    this.Count = vsflexQuotation.ColIndex("Count");
    this.OpenTime = vsflexQuotation.ColIndex("OpenTime");
    this.CloseTime = vsflexQuotation.ColIndex("CloseTime");
    this.NumeratorUnit = vsflexQuotation.ColIndex("NumeratorUnit");
    this.Denominator = vsflexQuotation.ColIndex("Denominator");
    this.BuyLot = vsflexQuotation.ColIndex("BuyLot");
    this.SellLot = vsflexQuotation.ColIndex("SellLot");
    this.LastLot = vsflexQuotation.ColIndex("LastLot");
    this.LastSales = vsflexQuotation.ColIndex("LastSales");
    this.ResumeOrSuspend = vsflexQuotation.ColIndex("ResumeOrSuspend");
    this.AllowOrRejectLMT = vsflexQuotation.ColIndex("AllowOrRejectLMT");
    this.MaxSpreadPoints = vsflexQuotation.ColIndex("MaxSpreadPoints");
    this.SpreadPoints = vsflexQuotation.ColIndex("SpreadPoints");
    this.SpreadPoints2 = vsflexQuotation.ColIndex("SpreadPoints2");
    this.SpreadPoints3 = vsflexQuotation.ColIndex("SpreadPoints3");
    this.SpreadPoints4 = vsflexQuotation.ColIndex("SpreadPoints4");
    this.MaxAutoAdjustPoints = vsflexQuotation.ColIndex("MaxAutoAdjustPoints");
    this.AutoAdjustPoints = vsflexQuotation.ColIndex("AutoAdjustPoints");
    this.AutoAdjustPoints2 = vsflexQuotation.ColIndex("AutoAdjustPoints2");
    this.AutoAdjustPoints3 = vsflexQuotation.ColIndex("AutoAdjustPoints3");
    this.AutoAdjustPoints4 = vsflexQuotation.ColIndex("AutoAdjustPoints4");
    this.IsOriginHiLo = vsflexQuotation.ColIndex("IsOriginHiLo");
    this.PriceType = vsflexQuotation.ColIndex("PriceType");
    this.OriginType = vsflexQuotation.ColIndex("OriginType");
    this.AllowedSpotTradeOrderSides = vsflexQuotation.ColIndex("AllowedSpotTradeOrderSides");
    this.OriginInactiveTime = vsflexQuotation.ColIndex("OriginInactiveTime");
    this.AlertVariation = vsflexQuotation.ColIndex("AlertVariation");
    this.NormalWaitTime = vsflexQuotation.ColIndex("NormalWaitTime");
    this.AlertWaitTime = vsflexQuotation.ColIndex("AlertWaitTime");
    this.MaxDQLot = vsflexQuotation.ColIndex("MaxDQLot");
    this.MaxOtherLot = vsflexQuotation.ColIndex("MaxOtherLot");
    this.DQQuoteMinLot = vsflexQuotation.ColIndex("DQQuoteMinLot");
    this.AutoDQMaxLot = vsflexQuotation.ColIndex("AutoDQMaxLot");
    this.AutoLmtMktMaxLot = vsflexQuotation.ColIndex("AutoLmtMktMaxLot");
    this.AcceptDQVariation = vsflexQuotation.ColIndex("AcceptDQVariation");
    this.AcceptLmtVariation = vsflexQuotation.ColIndex("AcceptLmtVariation");
    this.AcceptCloseLmtVariation = vsflexQuotation.ColIndex("AcceptCloseLmtVariation");
    this.CancelLmtVariation = vsflexQuotation.ColIndex("CancelLmtVariation");
    this.MaxMinAdjust = vsflexQuotation.ColIndex("MaxMinAdjust");
    this.IsBetterPrice = vsflexQuotation.ColIndex("IsBetterPrice");
    this.AutoAcceptMaxLot = vsflexQuotation.ColIndex("AutoAcceptMaxLot");
    this.AutoCancelMaxLot = vsflexQuotation.ColIndex("AutoCancelMaxLot");
    this.AllowedNewTradeSides = vsflexQuotation.ColIndex("AllowedNewTradeSides");
    this.HitTimes = vsflexQuotation.ColIndex("HitTimes");
    this.PenetrationPoint = vsflexQuotation.ColIndex("PenetrationPoint");
    this.PriceValidTime = vsflexQuotation.ColIndex("PriceValidTime");
    this.LastAcceptTimeSpan = vsflexQuotation.ColIndex("LastAcceptTimeSpan");
    this.IsAutoEnablePrice = vsflexQuotation.ColIndex("IsAutoEnablePrice");
    this.IsAutoFill = vsflexQuotation.ColIndex("IsAutoFill");
    this.IsPriceEnabled = vsflexQuotation.ColIndex("IsPriceEnabled");
    this.AutoDQDelay = vsflexQuotation.ColIndex("AutoDQDelay");
    this.HitPriceVariationForSTP = vsflexQuotation.ColIndex("HitPriceVariationForSTP");
}

var _LoggedInfo = "";
var quotationPageLoaded = false;
function quotationPageOnLoad(loggedInfo) {
    quotationPageLoaded = true;
    _LoggedInfo = loggedInfo;
    QuotationInit();
}

function QuotationInit() {
    //FlexQuotationInit();

    oDealingConsole.InitApp(window);
}

function OnQuotationBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    var data = vsflexQuotation.RowData(oldRow);
    if (data) {
        var instrument = data.object;
        instrument.isDealerInput = false;
    }
    var key = vsflexQuotation.ColKey(newCol);
    switch (key) {
        case instrumentColKey.ID:
        case instrumentColKey.Item:
        case instrumentColKey.Time:
        case instrumentColKey.SourceBid:
        case instrumentColKey.SourceAsk:
        case instrumentColKey.Source:
        case instrumentColKey.Bid:
        case instrumentColKey.Ask:
        case instrumentColKey.Count:
        case instrumentColKey.OpenTime:
        case instrumentColKey.CloseTime:
        case instrumentColKey.BuyLot:
        case instrumentColKey.SellLot:
        case instrumentColKey.LastLot:
        case instrumentColKey.LastSales:
        case instrumentColKey.ResumeOrSuspend:
        case instrumentColKey.AllowOrRejectLMT:
            vsflexQuotation.Editable = flexEDNone;
            break;
        case instrumentColKey.High:
        case instrumentColKey.Low:
            var canEdit = (vsflexQuotation.TextMatrix(newRow, _QuotationGridColIndexs.PriceType) != "Watch Only");
            if (!window.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) canEdit = false;
            vsflexQuotation.Editable = (canEdit ? flexEDKbdMouse : flexEDNone);
            break;
        case instrumentColKey.Adjust:
        case instrumentColKey.MaxSpreadPoints:
        case instrumentColKey.SpreadPoints:
        case instrumentColKey.SpreadPoints2:
        case instrumentColKey.SpreadPoints3:
        case instrumentColKey.SpreadPoints4:
        case instrumentColKey.MaxAutoAdjustPoints:
        case instrumentColKey.AutoAdjustPoints:
        case instrumentColKey.AutoAdjustPoints2:
        case instrumentColKey.AutoAdjustPoints3:
        case instrumentColKey.AutoAdjustPoints4:
        case instrumentColKey.IsOriginHiLo:
        case instrumentColKey.PriceType:
        case instrumentColKey.OriginType:
        case instrumentColKey.AllowedSpotTradeOrderSides:
            var canEdit = (vsflexQuotation.TextMatrix(newRow, _QuotationGridColIndexs.PriceType) != "Watch Only");
            if (!window.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) canEdit = false;
            vsflexQuotation.Editable = (canEdit ? flexEDKbdMouse : flexEDNone);
            break;
        default:
            vsflexQuotation.Editable = (window.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) ? flexEDKbdMouse : flexEDNone;
            break;
    }

    //instrument or quotePolicy changed
    if (newRow != oldRow || oDisplayQuotePolicyDetailID != oCurrentQuotePolicyDetailID) {
        var instrument = null;
        var data = vsflexQuotation.RowData(newRow);
        if (data) {
            instrument = data.object;
            oCurrentInstrumentID = instrument.id;
        }
        OnHistoryInstrumentChanged(instrument);
        OnPropertyInstrumentChanged(instrument);
        OnQuotePolicyInstrumentChanged(instrument);

        if (oDisplayQuotePolicyDetailID != oCurrentQuotePolicyDetailID) {
            OnQuotationQuotePolicyChanged();
            oDisplayQuotePolicyDetailID = oCurrentQuotePolicyDetailID;
        }
    }
}

function OnQuotationStartEdit(row, col, cancel) {
    if (_QuotationGridColIndexs.Adjust == col) {
        var data = vsflexQuotation.RowData(row);
        var instrument = data.object;
        instrument.isDealerInput = true;
    }
}

function AdjustOriginQuotationEventMessage(instrument, quotation) {
    var eventMessage = "";
    if (quotation != null && quotation.origin != null) {
        eventMessage = "Input " + instrument.code + " price at " + quotation.origin.ToString();
    }
    return eventMessage;
}

function OnQuotationKeyPressEdit(row, col, keyAscii) {
    var quotationFrm = window.parent.quotationFrm;

    var newValue = vsflexQuotation.EditText;
    switch (vsflexQuotation.ColKey(col)) {
        case instrumentColKey.Adjust:
            if (keyAscii == 13) {
                var data = vsflexQuotation.RowData(row);
                var instrument = data.object;

                var regexExpression = "(\\d+\\.{0,1}\\d{0,})";
                var regex = new RegExp(regexExpression, "i");
                if (regex.exec(newValue) != null) {
                    newValue = RegExp.$1;
                    var colSource = _QuotationGridColIndexs.Source;
                    var source = (instrument.lastQuotation ? ((instrument.lastQuotation.origin == null) ? "" : instrument.lastQuotation.origin.ToString()) : null);
                    var colTemp = _QuotationGridColIndexs.NumeratorUnit;
                    var numeratorUnit = parseInt(vsflexQuotation.TextMatrix(row, colTemp));
                    colTemp = _QuotationGridColIndexs.Denominator;
                    var denominator = parseInt(vsflexQuotation.TextMatrix(row, colTemp));
                    if (source) {
                        var adjustPriceString = GetAdjustPrice(newValue, source, numeratorUnit, denominator);
                        //var adjustPrice = new Price(); 
                        //adjustPrice.Normalize(adjustPriceString, numeratorUnit, denominator);
                        var adjustPrice = quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, numeratorUnit, denominator);

                        //Added by Michael on 2005-08-22
                        if (adjustPrice != null) {
                            if (instrument.IsLimitedPriceByDailyMaxMove(adjustPrice)) {
                                var sMsg = instrument.LimitedPriceByDailyMaxMovePrompt();
                                window.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
                                return;
                            }
                        }

                        var editTextString = (adjustPrice == null) ? "" : adjustPrice.ToString();
                        //vsflexQuotation.EditText = editTextString;
                        if (editTextString != "" && editTextString != "0")
                        //if(vsflexQuotation.EditText.length > 0 && vsflexQuotation.EditText != "0")
                        {
                            //	                        var countCol = _QuotationGridColIndexs.Count;
                            //	                        vsflexQuotation.TextMatrix(row, countCol) = "";
                            instrument.SetWaitTimeCount(0, true);
                            parent.quotationTaskFrm.RemoveTaskOutOfRange(instrument);

                            //???
                            //instrument.isWaiting = false;

                            //Modified by Michael on 2003-11-25
                            var isOriginHiLo = (vsflexQuotation.Cell(flexcpChecked, row, _QuotationGridColIndexs.IsOriginHiLo) == flexChecked) ? true : false;
                            if (isOriginHiLo == true) {
                                //var highPrice = new Price(); 
                                var high = vsflexQuotation.TextMatrix(row, _QuotationGridColIndexs.High);
                                //highPrice.Normalize(high, numeratorUnit, denominator);
                                var highPrice = quotationFrm.ObjectPool.GetPriceHelper(high, numeratorUnit, denominator);
                                //var lowPrice = new Price(); 
                                var low = vsflexQuotation.TextMatrix(row, _QuotationGridColIndexs.Low);
                                //lowPrice.Normalize(low, numeratorUnit, denominator);
                                var lowPrice = quotationFrm.ObjectPool.GetPriceHelper(low, numeratorUnit, denominator);

                                //Added by Michael on 2004-04-22
                                instrument.beforeModifyHigh = instrument.backQuotation.high.Clone();
                                instrument.beforeModifyLow = instrument.backQuotation.low.Clone();

                                instrument.backQuotation.high = highPrice.Clone();
                                instrument.backQuotation.low = lowPrice.Clone();

                                instrument.maxMin.high = highPrice.Clone();
                                instrument.maxMin.low = lowPrice.Clone();
                                instrument.maxMin.maxAsk = highPrice.Clone();
                                instrument.maxMin.minBid = lowPrice.Clone();
                            }

                            var quotation = instrument.backQuotation.Clone();
                            quotation.SetOrigin(adjustPrice);
                            var eventMessage = AdjustOriginQuotationEventMessage(instrument, quotation);
                            quotation.isAccepted = false;
                            instrument.isDealerInput = true;
                            instrument.SetOriginQuotation(quotation);
                            instrument.isDealerInput = false;

                            oIOProxy.WriteLog("Adjust Price", eventMessage, instrument.id, "");
                        }
                    }
                }
            }
            break;
        //Added by Michael on 2003-11-25	 
        case instrumentColKey.High:
        case instrumentColKey.Low:
            if (keyAscii == 13) {
                var isOriginHiLo = (vsflexQuotation.Cell(flexcpChecked, row, _QuotationGridColIndexs.IsOriginHiLo) == flexChecked) ? true : false;
                //		        if (isOriginHiLo == true) {
                var data = vsflexQuotation.RowData(row);
                var instrument = data.object;

                var regexExpression = "(\\d+\\.{0,1}\\d{0,})";
                var regex = new RegExp(regexExpression, "i");
                if (regex.exec(newValue) != null) {
                    newValue = RegExp.$1;
                    var colSource = _QuotationGridColIndexs.Source;
                    var source = (instrument.lastQuotation ? ((instrument.lastQuotation.origin == null) ? "" : instrument.lastQuotation.origin.ToString()) : null);
                    var colTemp = _QuotationGridColIndexs.NumeratorUnit;
                    var numeratorUnit = parseInt(vsflexQuotation.TextMatrix(row, colTemp));
                    colTemp = _QuotationGridColIndexs.Denominator;
                    var denominator = parseInt(vsflexQuotation.TextMatrix(row, colTemp));
                    if (source) {
                        var adjustPriceString = GetAdjustPrice(newValue, source, numeratorUnit, denominator);

                        //var adjustPrice2 = new Price();
                        //adjustPrice2.Normalize(adjustPriceString2, numeratorUnit, denominator);
                        //??????????????????????							
                        var adjustPriceString2 = GetAdjustPrice("", source, numeratorUnit, denominator);
                        var adjustPrice2 = quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString2, numeratorUnit, denominator);

                        //var adjustPrice = new Price(); 
                        //adjustPrice.Normalize(adjustPriceString, numeratorUnit, denominator);
                        var adjustPrice = quotationFrm.ObjectPool.GetPriceHelper(adjustPriceString, numeratorUnit, denominator);

                        vsflexQuotation.EditText = (adjustPrice == null) ? "" : adjustPrice.ToString();

                        if (vsflexQuotation.EditText.length > 0 && vsflexQuotation.EditText != "0") {
                            if (!isOriginHiLo) {
                                if (vsflexQuotation.ColKey(col) == instrumentColKey.High) {
                                    //only allow adjust to upline value
                                    var oldValue = vsflexQuotation.TextMatrix(row, _QuotationGridColIndexs.High);
                                    var oldPrice = quotationFrm.ObjectPool.GetPriceHelper(oldValue, numeratorUnit, denominator);
                                    if (adjustPrice == null || (!isOriginHiLo && adjustPrice != null && adjustPrice.MoreEqual(oldPrice))) {
                                        vsflexQuotation.EditText = oldValue;
                                        return;
                                    }
                                    else {
                                        oIOProxy.UpdateHighLow(this, instrument.id, isOriginHiLo, adjustPrice.ToString(), true, instrument, adjustPrice, adjustPrice2, oldValue);
                                        return;
                                    }
                                }
                                if (vsflexQuotation.ColKey(col) == instrumentColKey.Low) {
                                    //only allow adjust to downline value
                                    var oldValue = vsflexQuotation.TextMatrix(row, _QuotationGridColIndexs.Low);
                                    var oldPrice = quotationFrm.ObjectPool.GetPriceHelper(oldValue, numeratorUnit, denominator);
                                    if (adjustPrice == null || (!isOriginHiLo && adjustPrice != null && adjustPrice.LessEqual(oldPrice))) {
                                        vsflexQuotation.EditText = oldValue;
                                        return;
                                    }
                                    else {
                                        oIOProxy.UpdateHighLow(this, instrument.id, isOriginHiLo, adjustPrice.ToString(), false, instrument, adjustPrice, adjustPrice2, oldValue);
                                        return;
                                    }
                                }
                            }
                            else {
                                var high = "";
                                if (vsflexQuotation.ColKey(col) == instrumentColKey.High) {
                                    high = (adjustPrice == null) ? "" : adjustPrice.ToString();
                                }
                                else {
                                    high = vsflexQuotation.TextMatrix(row, _QuotationGridColIndexs.High);
                                }
                                var highPrice = quotationFrm.ObjectPool.GetPriceHelper(high, numeratorUnit, denominator);
                                //var lowPrice = new Price(); 
                                var low = "";

                                if (vsflexQuotation.ColKey(col) == instrumentColKey.Low) {
                                    low = (adjustPrice == null) ? "" : adjustPrice.ToString();
                                }
                                else {
                                    low = vsflexQuotation.TextMatrix(row, _QuotationGridColIndexs.Low);
                                }
                                var lowPrice = quotationFrm.ObjectPool.GetPriceHelper(low, numeratorUnit, denominator);

                                instrument.beforeModifyHigh = instrument.backQuotation.high.Clone();
                                instrument.beforeModifyLow = instrument.backQuotation.low.Clone();

                                instrument.backQuotation.high = highPrice.Clone();
                                instrument.backQuotation.low = lowPrice.Clone();

                                instrument.maxMin.high = highPrice.Clone();
                                instrument.maxMin.low = lowPrice.Clone();
                                instrument.maxMin.maxAsk = highPrice.Clone();
                                instrument.maxMin.minBid = lowPrice.Clone();

                                var quotation = instrument.backQuotation.Clone();
                                quotation.SetOrigin(adjustPrice2);
                                var eventMessage = AdjustOriginQuotationEventMessage(instrument, quotation);
                                //quotation.SetOrigin( adjustPrice);
                                instrument.isDealerInput = true;
                                instrument.SetOriginQuotation(quotation);
                                instrument.isDealerInput = false;

                                oIOProxy.WriteLog("Adjust " + vsflexQuotation.ColKey(col), eventMessage, instrument.id, "");
                            }
                        }
                    }
                }
                //		        }
            }
            break;
        default:
            break;
    }
}

function VsflexQuotation_FilterKey2(theEvent) {
    if (theEvent.keyCode == 13) {
        VsflexQuotation_OnClick();
    }
}

function SuspendOrResumeForInstrument(row, col) {
    var data = vsflexQuotation.RowData(row);
    var instrument = data.object;

    var resumeOrSuspend = vsflexQuotation.TextMatrix(row, col);
    var comboListLanguage = window.parent.quotationFrm.comboListLanguage;

    var resumeLanguageStr = comboListLanguage["Resume"];
    var suspendLanguageStr = comboListLanguage["Suspend"];
    var isResume = resumeOrSuspend == resumeLanguageStr;
    window.parent.quotationFrm.oDealingConsole.SuspendOrResumeForInstrument(isResume, instrument.id);
    vsflexQuotation.Cell(flexcpForeColor, row, col) = isResume ? color_red : color_green;
    vsflexQuotation.TextMatrix(row, col) = isResume ? suspendLanguageStr : resumeLanguageStr;
}

function VsflexQuotation_OnClick() {
    if (vsflexQuotation.Row < vsflexQuotation.FixedRows
        || vsflexQuotation.Col < vsflexQuotation.FixedCols) return;
    if (vsflexQuotation.Col == _QuotationGridColIndexs.ResumeOrSuspend) {
        SuspendOrResumeForInstrument(vsflexQuotation.Row, vsflexQuotation.Col);
    }
    else if (vsflexQuotation.Col == _QuotationGridColIndexs.AllowOrRejectLMT) {
        AllowLMT(vsflexQuotation.Row, vsflexQuotation.Col);
    }
}

function AllowLMT(row, col) {
    var data = vsflexQuotation.RowData(row);
    var instrument = data.object;

    var allowOrReject = vsflexQuotation.TextMatrix(row, col);
    var comboListLanguage = window.parent.quotationFrm.comboListLanguage;
    var isAllowStr = comboListLanguage["AllowLMT"];
    var allow = allowOrReject.toLowerCase() == isAllowStr; // "allow";
    var needChangeDirection = window.parent.quotationFrm.oDealingConsole.AllowLMT(allow, instrument.id);
    if (needChangeDirection) {
        vsflexQuotation.Cell(flexcpForeColor, row, col) = allow ? color_red : color_green;
        vsflexQuotation.TextMatrix(row, col) = allow ? comboListLanguage["Reject"] : comboListLanguage["AllowLMT"];
    }
}

function UpdateHighLowResult(isSucceed, instrument, newInput, isUpdateHigh, newInputPrice, adjustPrice2, oldValue, result) {
    var vsflexGrid = vsflexQuotation;
    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    if (line >= vsflexGrid.FixedRows) {
        if (!isSucceed) {
            if (isUpdateHigh) {
                vsflexQuotation.TextMatrix(line, _QuotationGridColIndexs.High) = oldValue;
            }
            else {
                vsflexQuotation.TextMatrix(line, _QuotationGridColIndexs.Low) = oldValue;
            }
        }
    }
}

function OnQuotationValidateEdit(row, col, cancel) {
    var newValue = vsflexQuotation.EditText;
    var colKey = vsflexQuotation.ColKey(col);
    switch (colKey) {
        case instrumentColKey.Adjust:
            //Added by Michael on 2003-11-25
        case instrumentColKey.High:
        case instrumentColKey.Low:
            break;
        case instrumentColKey.SpreadPoints2:
        case instrumentColKey.SpreadPoints3:
        case instrumentColKey.SpreadPoints4:
        case instrumentColKey.AutoAdjustPoints2:
        case instrumentColKey.AutoAdjustPoints3:
        case instrumentColKey.AutoAdjustPoints4:
            vsflexQuotation.EditText = newValue;
            break;
        case instrumentColKey.MaxDQLot:
        case instrumentColKey.MaxOtherLot:
        case instrumentColKey.DQQuoteMinLot:
        case instrumentColKey.AutoDQMaxLot:
        case instrumentColKey.AutoLmtMktMaxLot:
            var regexExpression = "(\\d+((\\.\\d{1})|))"; //"(\\d+\\.{0,1})";
            var regex = new RegExp(regexExpression, "i");
            if (regex.exec(newValue) != null)
                vsflexQuotation.EditText = RegExp.$1;
            else
                vsflexQuotation.EditText = vsflexQuotation.TextMatrix(row, col);
            break;
        default:
            {
                var regexExpression;
                if (colKey == instrumentColKey.AutoAdjustPoints)
                    regexExpression = "(-?\\d+)";
                else
                    regexExpression = "(\\d+)";
                //Modified by Michael on 2005-04-11   will change
                //regexExpression = "(\\d+\\.{0,1}\\d{0,})";

                var regex = new RegExp(regexExpression, "i");
                if (regex.exec(newValue) != null)
                    vsflexQuotation.EditText = RegExp.$1;
                else
                    vsflexQuotation.EditText = vsflexQuotation.TextMatrix(row, col);

                //Added by Michael on 20008-02-15
                if (colKey == instrumentColKey.HitTimes) {
                    var hitTimes = parseInt(vsflexQuotation.EditText);
                    if (isNaN(hitTimes) || hitTimes < 1) {
                        var hitTimes2 = parseInt(vsflexQuotation.TextMatrix(row, col));
                        vsflexQuotation.EditText = (isNaN(hitTimes2) || hitTimes2 < 1) ? "1" : vsflexQuotation.TextMatrix(row, col);
                    }
                }

                var data = vsflexQuotation.RowData(row);
                if (!(data && data.object)) return;
                var instrument = data.object;
                var quotePolicyDetail = instrument.quotePolicyDetails.Item(oCurrentQuotePolicyDetailID);

                if (colKey == instrumentColKey.SpreadPoints) {
                    var spreadPoints = parseInt(vsflexQuotation.EditText);
                    if (spreadPoints > quotePolicyDetail.maxSpreadPoints) {
                        vsflexQuotation.EditText = vsflexQuotation.TextMatrix(row, col);
                    }
                }

                if (colKey == instrumentColKey.MaxSpreadPoints) {
                    var maxSpreadPoints = parseInt(vsflexQuotation.EditText);
                    if (maxSpreadPoints < quotePolicyDetail.spreadPoints) {
                        vsflexQuotation.EditText = vsflexQuotation.TextMatrix(row, col);
                    }
                }

                if (colKey == instrumentColKey.AutoAdjustPoints) {
                    var autoAdjustPoints = parseInt(vsflexQuotation.EditText);
                    if (autoAdjustPoints > quotePolicyDetail.maxAutoAdjustPoints) {
                        vsflexQuotation.EditText = vsflexQuotation.TextMatrix(row, col);
                    }
                }

                if (colKey == instrumentColKey.MaxAutoAdjustPoints) {
                    var maxAutoAdjustPoints = parseInt(vsflexQuotation.EditText);
                    if (maxAutoAdjustPoints < quotePolicyDetail.autoAdjustPoints) {
                        vsflexQuotation.EditText = vsflexQuotation.TextMatrix(row, col);
                    }
                }

            }
            break;
    }
}

function OnQuotationAfterEdit(row, col, cancel) {
    var data = vsflexQuotation.RowData(row);
    if (data && data.object) {
        var instrument = data.object;
        instrument.isDealerInput = false;

        var quotePolicyDetail = instrument.quotePolicyDetails.Item(oCurrentQuotePolicyDetailID);
        switch (vsflexQuotation.ColKey(col)) {
            case instrumentColKey.MaxSpreadPoints:
                var newValue = parseInt(vsflexQuotation.TextMatrix(row, col));

                if (newValue < quotePolicyDetail.spreadPoints) {
                    vsflexQuotation.TextMatrix(row, col) = quotePolicyDetail.maxSpreadPoints;
                }
                else {
                    quotePolicyDetail.maxSpreadPointsTemp = newValue;
                    if (quotePolicyDetail.maxSpreadPointsTemp != quotePolicyDetail.maxSpreadPoints)
                        oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.MaxSpreadPoints, quotePolicyDetail.maxSpreadPointsTemp, "");
                    else
                        quotePolicyDetail.maxSpreadPointsTemp = null;
                }
                break;
            case instrumentColKey.SpreadPoints:
                var newValue = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (newValue > quotePolicyDetail.maxSpreadPoints) {
                    vsflexQuotation.TextMatrix(row, col) = quotePolicyDetail.spreadPoints;
                }
                else {
                    quotePolicyDetail.spreadPointsTemp = newValue;
                    if (quotePolicyDetail.spreadPointsTemp != quotePolicyDetail.spreadPoints) {
                        var eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetail.code + " " + instrument.code + " with spread = " + quotePolicyDetail.spreadPointsTemp; // +" and autopoint = " + quotePolicyDetail.autoAdjustPoints;
                        oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.SpreadPoints, quotePolicyDetail.spreadPointsTemp, eventMessage);
                    }
                    else
                        quotePolicyDetail.spreadPointsTemp = null;
                }
                break;
            case instrumentColKey.SpreadPoints2:
                var spreadPoints2 = vsflexQuotation.TextMatrix(row, col);
                if (spreadPoints2 != "" && isNaN(parseInt(spreadPoints2))) spreadPoints2 = "";
                quotePolicyDetail.spreadPoints2Temp = spreadPoints2;
                if (quotePolicyDetail.spreadPoints2Temp != quotePolicyDetail.spreadPoints2)
                    oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.SpreadPoints2, quotePolicyDetail.spreadPoints2Temp, "");
                else
                    quotePolicyDetail.spreadPoints2Temp = null;
                break;
            case instrumentColKey.SpreadPoints3:
                var spreadPoints3 = vsflexQuotation.TextMatrix(row, col);
                if (spreadPoints3 != "" && isNaN(parseInt(spreadPoints3))) spreadPoints3 = "";
                quotePolicyDetail.spreadPoints3Temp = spreadPoints3;
                if (quotePolicyDetail.spreadPoints3Temp != quotePolicyDetail.spreadPoints3)
                    oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.SpreadPoints3, quotePolicyDetail.spreadPoints3Temp, "");
                else
                    quotePolicyDetail.spreadPoints3Temp = null;
                break;
            case instrumentColKey.SpreadPoints4:
                var spreadPoints4 = vsflexQuotation.TextMatrix(row, col);
                if (spreadPoints4 != "" && isNaN(parseInt(spreadPoints4))) spreadPoints4 = "";
                quotePolicyDetail.spreadPoints4Temp = spreadPoints4;
                if (quotePolicyDetail.spreadPoints4Temp != quotePolicyDetail.spreadPoints4)
                    oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.SpreadPoints4, quotePolicyDetail.spreadPoints4Temp, "");
                else
                    quotePolicyDetail.spreadPoints4Temp = null;
                break;
            case instrumentColKey.MaxAutoAdjustPoints:
                var newValue = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (newValue < quotePolicyDetail.autoAdjustPoints) {
                    vsflexQuotation.TextMatrix(row, col) = quotePolicyDetail.maxAutoAdjustPoints;
                }
                else {
                    quotePolicyDetail.maxAutoAdjustPointsTemp = newValue;
                    if (quotePolicyDetail.maxAutoAdjustPointsTemp != quotePolicyDetail.maxAutoAdjustPoints)
                        oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.MaxAutoAdjustPoints, quotePolicyDetail.maxAutoAdjustPointsTemp, "");
                    else
                        quotePolicyDetail.maxAutoAdjustPointsTemp = null;
                }
                break;
            case instrumentColKey.AutoAdjustPoints:
                var newValue = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (newValue > quotePolicyDetail.maxAutoAdjustPoints) {
                    vsflexQuotation.TextMatrix(row, col) = quotePolicyDetail.autoAdjustPoints;
                }
                else {
                    quotePolicyDetail.autoAdjustPointsTemp = newValue;
                    if (quotePolicyDetail.autoAdjustPointsTemp != quotePolicyDetail.autoAdjustPoints) {
                        var eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetail.code + " " + instrument.code + " with autopoint = " + quotePolicyDetail.autoAdjustPointsTemp;
                        oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.AutoAdjustPoints, quotePolicyDetail.autoAdjustPointsTemp, eventMessage);
                    }
                    else
                        quotePolicyDetail.autoAdjustPointsTemp = null;
                }
                break;
            case instrumentColKey.AutoAdjustPoints2:
                var autoAdjustPoints2 = vsflexQuotation.TextMatrix(row, col);
                if (autoAdjustPoints2 != "" && isNaN(parseInt(autoAdjustPoints2))) autoAdjustPoints2 = "";
                quotePolicyDetail.autoAdjustPoints2Temp = autoAdjustPoints2;
                if (quotePolicyDetail.autoAdjustPoints2Temp != quotePolicyDetail.autoAdjustPoints2)
                    oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.AutoAdjustPoints2, quotePolicyDetail.autoAdjustPoints2Temp, "");
                else
                    quotePolicyDetail.autoAdjustPoints2Temp = null;
                break;
            case instrumentColKey.AutoAdjustPoints3:
                var autoAdjustPoints3 = vsflexQuotation.TextMatrix(row, col);
                if (autoAdjustPoints3 != "" && isNaN(parseInt(autoAdjustPoints3))) autoAdjustPoints3 = "";
                quotePolicyDetail.autoAdjustPoints3Temp = autoAdjustPoints3;
                if (quotePolicyDetail.autoAdjustPoints3Temp != quotePolicyDetail.autoAdjustPoints3)
                    oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.AutoAdjustPoints3, quotePolicyDetail.autoAdjustPoints3Temp, "");
                else
                    quotePolicyDetail.autoAdjustPoints3Temp = null;
                break;
            case instrumentColKey.AutoAdjustPoints4:
                var autoAdjustPoints4 = vsflexQuotation.TextMatrix(row, col);
                if (autoAdjustPoints4 != "" && isNaN(parseInt(autoAdjustPoints4))) autoAdjustPoints4 = "";
                quotePolicyDetail.autoAdjustPoints4Temp = autoAdjustPoints4;
                if (quotePolicyDetail.autoAdjustPoints4Temp != quotePolicyDetail.autoAdjustPoints4)
                    oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.AutoAdjustPoints4, quotePolicyDetail.autoAdjustPoints4Temp, "");
                else
                    quotePolicyDetail.autoAdjustPoints4Temp = null;
                break;
            case instrumentColKey.IsOriginHiLo:
                if (!window.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.IsOriginHiLo)) {
                    vsflexQuotation.Cell(flexcpChecked, row, col) = (quotePolicyDetail.isOriginHiLo) ? flexChecked : flexUnchecked;
                    break;
                }
                quotePolicyDetail.isOriginHiLoTemp = (vsflexQuotation.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;
                if (quotePolicyDetail.isOriginHiLoTemp != quotePolicyDetail.isOriginHiLo)
                    oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.IsOriginHiLo, quotePolicyDetail.isOriginHiLoTemp, "");
                else
                    quotePolicyDetail.isOriginHiLoTemp = null;
                break;
            case instrumentColKey.PriceType:
                var comboListLanguage = window.parent.quotationFrm.comboListLanguage;
                quotePolicyDetail.priceTypeTemp = PriceType.GetPriceTypeValue(vsflexQuotation.TextMatrix(row, col), comboListLanguage);
                if (quotePolicyDetail.priceTypeTemp != quotePolicyDetail.priceType) {
                    var priceType2 = parseInt(quotePolicyDetail.priceTypeTemp);
                    priceType2 = isNaN(priceType2) ? PriceType.Reference : priceType2;
                    priceType2 = (priceType2 == PriceType.Watch) ? PriceType.Reference : priceType2;
                    quotePolicyDetail.priceTypeTemp = priceType2;
                    oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentColKey.PriceType, quotePolicyDetail.priceTypeTemp, "");
                }
                else
                    quotePolicyDetail.priceTypeTemp = null;
                break;
            //deal with all properties of instrument 
            case instrumentColKey.OriginType:
                instrument.originTypeTemp = OriginType.GetOriginTypeValue(vsflexQuotation.TextMatrix(row, col));
                if (instrument.originTypeTemp != instrument.originType)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.OriginType, instrument.originTypeTemp);
                else
                    instrument.originTypeTemp = null;
                break;
            case instrumentColKey.AllowedSpotTradeOrderSides:
                instrument.allowedSpotTradeOrderSidesTemp = AllowedOrderSides.GetAllowedOrderSides(vsflexQuotation.TextMatrix(row, col));
                if (instrument.allowedSpotTradeOrderSidesTemp != instrument.allowedSpotTradeOrderSides)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AllowedSpotTradeOrderSides, instrument.allowedSpotTradeOrderSidesTemp);
                else
                    instrument.allowedSpotTradeOrderSidesTemp = null;
                break;
            case instrumentColKey.OriginInactiveTime:
                instrument.originInactiveTimeTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.originInactiveTimeTemp <= 10) {
                    instrument.originInactiveTimeTemp = instrument.originInactiveTime;
                    vsflexQuotation.TextMatrix(row, col) = instrument.originInactiveTime;
                }
                if (instrument.originInactiveTimeTemp != instrument.originInactiveTime)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.OriginInactiveTime, instrument.originInactiveTimeTemp);
                else
                    instrument.originInactiveTimeTemp = null;
                break;
            case instrumentColKey.AlertVariation:
                instrument.alertVariationTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.alertVariationTemp != instrument.alertVariation)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AlertVariation, instrument.alertVariationTemp);
                else
                    instrument.alertVariationTemp = null;
                break;
            case instrumentColKey.NormalWaitTime:
                instrument.normalWaitTimeTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.normalWaitTimeTemp != instrument.normalWaitTime)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.NormalWaitTime, instrument.normalWaitTimeTemp);
                else
                    instrument.normalWaitTimeTemp = null;
                break;
            case instrumentColKey.AlertWaitTime:
                instrument.alertWaitTimeTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.alertWaitTimeTemp != instrument.alertWaitTime)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AlertWaitTime, instrument.alertWaitTimeTemp);
                else
                    instrument.alertWaitTimeTemp = null;
                break;
            case instrumentColKey.MaxDQLot:
                //Modified by Michael on 2005-04-08
                //var newValue = parseInt( vsflexQuotation.TextMatrix(row, col) );
                var newValue = parseFloat(vsflexQuotation.TextMatrix(row, col));

                if (newValue < instrument.dqQuoteMinLot) {
                    vsflexQuotation.TextMatrix(row, col) = instrument.maxDQLot;
                }
                else {
                    instrument.maxDQLotTemp = newValue;
                    if (instrument.maxDQLotTemp != instrument.maxDQLot)
                        oIOProxy.SendInstrumentParam(instrument, instrumentColKey.MaxDQLot, instrument.maxDQLotTemp);
                    else
                        instrument.maxDQLotTemp = null;
                }
                break;
            case instrumentColKey.MaxOtherLot:
                //Modified by Michael on 2005-04-08
                //instrument.maxOtherLotTemp = parseInt( vsflexQuotation.TextMatrix(row, col) );
                instrument.maxOtherLotTemp = parseFloat(vsflexQuotation.TextMatrix(row, col));

                if (instrument.maxOtherLotTemp != instrument.maxOtherLot)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.MaxOtherLot, instrument.maxOtherLotTemp);
                else
                    instrument.maxOtherLotTemp = null;
                break;
            case instrumentColKey.DQQuoteMinLot:
                //Modified by Michael on 2005-04-08
                //var newValue = parseInt( vsflexQuotation.TextMatrix(row, col) );
                var newValue = parseFloat(vsflexQuotation.TextMatrix(row, col));

                if (newValue > instrument.maxDQLot) {
                    vsflexQuotation.TextMatrix(row, col) = instrument.dqQuoteMinLot;
                }
                else {
                    instrument.dqQuoteMinLotTemp = newValue;
                    if (instrument.dqQuoteMinLotTemp != instrument.dqQuoteMinLot)
                        oIOProxy.SendInstrumentParam(instrument, instrumentColKey.DQQuoteMinLot, instrument.dqQuoteMinLotTemp);
                    else
                        instrument.dqQuoteMinLotTemp = null;
                }
                break;
            case instrumentColKey.AutoDQMaxLot:
                //Modified by Michael on 2005-04-08
                //instrument.autoDQMaxLotTemp = parseInt( vsflexQuotation.TextMatrix(row, col) );
                instrument.autoDQMaxLotTemp = parseFloat(vsflexQuotation.TextMatrix(row, col));

                if (instrument.autoDQMaxLotTemp != instrument.autoDQMaxLot)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AutoDQMaxLot, instrument.autoDQMaxLotTemp);
                else
                    instrument.autoDQMaxLotTemp = null;
                break;
            case instrumentColKey.AutoLmtMktMaxLot:
                //Modified by Michael on 2005-04-08
                //instrument.autoLmtMktMaxLotTemp = parseInt( vsflexQuotation.TextMatrix(row, col) );
                instrument.autoLmtMktMaxLotTemp = parseFloat(vsflexQuotation.TextMatrix(row, col));

                if (instrument.autoLmtMktMaxLotTemp != instrument.autoLmtMktMaxLot)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AutoLmtMktMaxLot, instrument.autoLmtMktMaxLotTemp);
                else
                    instrument.autoLmtMktMaxLotTemp = null;
                break;
            case instrumentColKey.AcceptDQVariation:
                instrument.acceptDQVariationTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.acceptDQVariationTemp < 0) {
                    instrument.acceptDQVariationTemp = instrument.acceptDQVariation;
                    vsflexQuotation.TextMatrix(row, col) = instrument.acceptDQVariation;
                }
                if (instrument.acceptDQVariationTemp != instrument.acceptDQVariation)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AcceptDQVariation, instrument.acceptDQVariationTemp);
                else
                    instrument.acceptDQVariationTemp = null;
                break;
            case instrumentColKey.AcceptLmtVariation:
                instrument.acceptLmtVariationTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.acceptLmtVariationTemp <= 0) {
                    instrument.acceptLmtVariationTemp = instrument.acceptLmtVariation;
                    vsflexQuotation.TextMatrix(row, col) = instrument.acceptLmtVariation;
                }
                if (instrument.acceptLmtVariationTemp != instrument.acceptLmtVariation)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AcceptLmtVariation, instrument.acceptLmtVariationTemp);
                else
                    instrument.acceptLmtVariationTemp = null;
                break;
            case instrumentColKey.AcceptCloseLmtVariation:
                instrument.acceptCloseLmtVariationTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.acceptCloseLmtVariationTemp <= 0) {
                    instrument.acceptCloseLmtVariationTemp = instrument.acceptCloseLmtVariation;
                    vsflexQuotation.TextMatrix(row, col) = instrument.acceptCloseLmtVariation;
                }
                if (instrument.acceptCloseLmtVariationTemp != instrument.acceptCloseLmtVariation)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AcceptCloseLmtVariation, instrument.acceptCloseLmtVariationTemp);
                else
                    instrument.acceptCloseLmtVariationTemp = null;
                break;
            case instrumentColKey.CancelLmtVariation:
                instrument.cancelLmtVariationTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.cancelLmtVariationTemp <= 0) {
                    instrument.cancelLmtVariationTemp = instrument.cancelLmtVariation;
                    vsflexQuotation.TextMatrix(row, col) = instrument.cancelLmtVariation;
                }
                if (instrument.cancelLmtVariationTemp != instrument.cancelLmtVariation)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.CancelLmtVariation, instrument.cancelLmtVariationTemp);
                else
                    instrument.cancelLmtVariationTemp = null;
                break;
            case instrumentColKey.MaxMinAdjust:
                instrument.maxMinAdjustTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.maxMinAdjustTemp != instrument.maxMinAdjust)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.MaxMinAdjust, instrument.maxMinAdjustTemp);
                else
                    instrument.maxMinAdjustTemp = null;
                break;
            case instrumentColKey.IsBetterPrice:
                if (!window.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.IsBetterPrice)) {
                    vsflexQuotation.Cell(flexcpChecked, row, col) = (instrument.isBetterPrice) ? flexChecked : flexUnchecked;
                    break;
                }
                instrument.isBetterPriceTemp = (vsflexQuotation.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;
                if (instrument.isBetterPriceTemp != instrument.isBetterPrice)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.IsBetterPrice, instrument.isBetterPriceTemp);
                else
                    instrument.isBetterPriceTemp = null;
                break;
            case instrumentColKey.AutoAcceptMaxLot:
                if (!window.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AutoAcceptMaxLot)) {
                    vsflexQuotation.TextMatrix(row, col) = instrument.autoAcceptMaxLot;
                    break;
                }
                instrument.autoAcceptMaxLotTemp = parseFloat(vsflexQuotation.TextMatrix(row, col));
                if (instrument.autoAcceptMaxLotTemp != instrument.autoAcceptMaxLot)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AutoAcceptMaxLot, instrument.autoAcceptMaxLotTemp);
                else
                    instrument.autoAcceptMaxLotTemp = null;
                break;
            case instrumentColKey.AutoCancelMaxLot:
                if (!window.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AutoCancelMaxLot)) {
                    vsflexQuotation.TextMatrix(row, col) = instrument.autoCancelMaxLot;
                    break;
                }
                instrument.autoCancelMaxLotTemp = parseFloat(vsflexQuotation.TextMatrix(row, col));
                if (instrument.autoCancelMaxLotTemp != instrument.autoCancelMaxLot)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AutoCancelMaxLot, instrument.autoCancelMaxLotTemp);
                else
                    instrument.autoCancelMaxLotTemp = null;
                break;
            case instrumentColKey.AllowedNewTradeSides:
                if (!window.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AllowedNewTradeSides)) {
                    vsflexQuotation.TextMatrix(row, col) = instrument.allowedNewTradeSides;
                    break;
                }
                instrument.allowedNewTradeSidesTemp = AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeValue(vsflexQuotation.TextMatrix(row, col));
                if (instrument.allowedNewTradeSidesTemp != instrument.allowedNewTradeSides)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AllowedNewTradeSides, instrument.allowedNewTradeSidesTemp);
                else
                    instrument.allowedNewTradeSidesTemp = null;
                break;
            case instrumentColKey.HitTimes:
                instrument.hitTimesTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.hitTimesTemp != null && instrument.hitTimesTemp != instrument.hitTimes)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.HitTimes, instrument.hitTimesTemp);
                else
                    instrument.hitTimesTemp = null;
                break;
            case instrumentColKey.PenetrationPoint:
                instrument.penetrationPointTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.penetrationPointTemp != instrument.penetrationPoint)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.PenetrationPoint, instrument.penetrationPointTemp);
                else
                    instrument.penetrationPointTemp = null;
                break;
            case instrumentColKey.PriceValidTime:
                instrument.priceValidTimeTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.priceValidTimeTemp != instrument.priceValidTime)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.PriceValidTime, instrument.priceValidTimeTemp);
                else
                    instrument.priceValidTimeTemp = null;
                break;
            case instrumentColKey.LastAcceptTimeSpan:
                instrument.lastAcceptTimeSpanTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.lastAcceptTimeSpanTemp != instrument.lastAcceptTimeSpan)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.LastAcceptTimeSpan, instrument.lastAcceptTimeSpanTemp);
                else
                    instrument.lastAcceptTimeSpanTemp = null;
                break;

            case instrumentColKey.IsAutoEnablePrice:
                instrument.isAutoEnablePriceTemp = (vsflexQuotation.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;
                if (instrument.isAutoEnablePriceTemp != instrument.isAutoEnablePrice)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.IsAutoEnablePrice, instrument.isAutoEnablePriceTemp);
                else
                    instrument.isAutoEnablePriceTemp = null;
                break;

            case instrumentColKey.IsAutoFill:
                instrument.isAutoFillTemp = (vsflexQuotation.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;
                if (instrument.isAutoFillTemp != instrument.isAutoFill)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.IsAutoFill, instrument.isAutoFillTemp);
                else
                    instrument.isAutoFillTemp = null;
                break;


            case instrumentColKey.IsPriceEnabled:
                instrument.isPriceEnabledTemp = (vsflexQuotation.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;
                if (instrument.isPriceEnabledTemp != instrument.isPriceEnabled)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.IsPriceEnabled, instrument.isPriceEnabledTemp);
                else
                    instrument.isPriceEnabledTemp = null;
                break;

            case instrumentColKey.AutoDQDelay:
                instrument.autoDQDelayTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.autoDQDelayTemp < 0 || instrument.autoDQDelayTemp > 10) {
                    instrument.autoDQDelayTemp = instrument.autoDQDelay;
                    vsflexQuotation.TextMatrix(row, col) = instrument.autoDQDelay;
                }
                if (instrument.autoDQDelayTemp != instrument.autoDQDelay)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AutoDQDelay, instrument.autoDQDelayTemp);
                else
                    instrument.autoDQDelayTemp = null;
                break;
            case instrumentColKey.HitPriceVariationForSTP:
                instrument.hitPriceVariationForSTPTemp = parseInt(vsflexQuotation.TextMatrix(row, col));
                if (instrument.hitPriceVariationForSTPTemp < 0 || instrument.hitPriceVariationForSTPTemp > 9999) {
                    instrument.hitPriceVariationForSTPTemp = instrument.hitPriceVariationForSTP;
                    vsflexQuotation.TextMatrix(row, col) = instrument.hitPriceVariationForSTP;
                }
                if (instrument.hitPriceVariationForSTPTemp != instrument.hitPriceVariationForSTP)
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.HitPriceVariationForSTP, instrument.hitPriceVariationForSTPTemp);
                else
                    instrument.hitPriceVariationForSTPTemp = null;
                break;
            default:
                break;
        }
        OnPropertyInstrumentChanged(instrument);
        OnQuotePolicyInstrumentChanged(instrument);
        OnQuotePolicyInstrumentChanged(instrument);
    }
}
//12345
function AddInstrumentToGrid(instrument, needRedraw, quotationFrm, rowHeight) {
    var vsflexGrid = vsflexQuotation;
    if (needRedraw) vsflexGrid.Redraw = false;
    //	var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    //	if (line < 0)
    //	{
    line = vsflexGrid.Rows;
    vsflexGrid.AddItem("");

    var comboListLanguage = window.parent.quotationFrm.comboListLanguage;
    vsflexGrid.RowHeight(line) = rowHeight; // quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.QuotationGrid);

    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.ResumeOrSuspend) = comboListLanguage["Resume"];
    vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.ResumeOrSuspend) = color_green;

    var allowLMT = instrument.allowLMT();
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AllowOrRejectLMT) = allowLMT ? comboListLanguage["DisAllowLMT"] : comboListLanguage["AllowLMT"];
    vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.AllowOrRejectLMT) = allowLMT ? color_red : color_green;
    //    }
    var lotDecimal = window.parent.quotationFrm.oDealingConsole.LotDecimal;
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.Item) = instrument.code;
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.ID) = instrument.id;
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.BuyLot) = GetFormatLot2(instrument.buyLot, true, lotDecimal);
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.SellLot) = GetFormatLot2(instrument.sellLot, true, lotDecimal);
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.LastLot) = GetFormatLot2(instrument.lastLot, true, lotDecimal);
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.LastSales) = instrument.lastSales;

    //12345
    var data = new DataOfRow(QuotationType.Normal, null, null, instrument);
    vsflexGrid.RowData(line) = data;

    UpdateProperties(line, false);
    UpdateQuotePolicyDetail(line, needRedraw);

    //	SetInstrumentBackColor(instrument, vsflexGrid, line);
    if (needRedraw) vsflexGrid.Redraw = true;

    if (!instrument.isPriceEnabled) window.parent.quotationFrm.oDealingConsole.PlaySound(SoundOption.Inactive);
}

function RemoveInstrumentFromGrid(instrument) {
    var vsflexGrid = vsflexQuotation;
    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    if (line > 0) {
        vsflexGrid.RemoveItem(line);
        //move to next
        if (vsflexGrid.Rows > vsflexGrid.FixedRows) {
            var line1 = vsflexGrid.Row;
            if (line1 < vsflexGrid.FixedRows) {
                line1 = vsflexGrid.FixedRows;
            }
            var data = vsflexGrid.RowData(line1);
            var instrument1 = data ? data.object : null;
            oCurrentInstrumentID = instrument1 ? instrument1.id : null;
            OnHistoryInstrumentChanged(instrument1);
            OnPropertyInstrumentChanged(instrument1);
            OnQuotePolicyInstrumentChanged(instrument1);
        }
    }
}

function UpdateQuotation2UITimerTick(instrument) {
    var line = vsflexQuotation.FindRow(instrument.id, vsflexQuotation.FixedRows, _QuotationGridColIndexs.ID, true, true);
    if (line < vsflexQuotation.FixedRows) return;

    var updateUIParameter = instrument._UpdateUIParameter;
    //1. OverridedQuotation
    if (updateUIParameter.isUpdateOverridedQuotation) {
        updateUIParameter.isUpdateOverridedQuotation = false;
        if (updateUIParameter.overridedQuotationQuotePolicyID == oCurrentQuotePolicyDetailID) {
            if (instrument.id == oCurrentInstrumentID) {
                //update UI for quotation history
                parent.propertyFrm.UpdateQuotationHistory(instrument);
            }
            //Update QuotationUI
            UpdateQuotationHistorySnap(instrument, line, false);
        }
        var timestamp = updateUIParameter.overridedQuotationTimestamp;
        var s = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + "/" + timestamp.getFullYear();
        var col = _QuotationGridColIndexs.Time;
        if (vsflexQuotation.TextMatrix(line, col) != "" && timestamp.valueOf() > new Date(s + " " + vsflexQuotation.TextMatrix(line, col)).valueOf() + 1000) {
            vsflexQuotation.TextMatrix(line, col) = TimeString(timestamp);
        }
    }

    //2. OriginQuotation
    if (updateUIParameter.isUpdateOriginQuotation) {
        updateUIParameter.isUpdateOriginQuotation = false;
        if (updateUIParameter.needUpdateOriginQuotation) {
            updateUIParameter.needUpdateOriginQuotation = false;
            UpdateOriginQuotation(instrument, line);
            var instantOrderByInstrumentIFrame = parent.propertyFrm._InstantOrderByInstrumentIFrame;
            instantOrderByInstrumentIFrame._InstantOrderListFrame1.UpdateOriginQuotation(instrument);
            instantOrderByInstrumentIFrame._InstantOrderListFrame2.UpdateOriginQuotation(instrument);
            instantOrderByInstrumentIFrame._InstantOrderListFrame3.UpdateOriginQuotation(instrument);
            instantOrderByInstrumentIFrame._InstantOrderListFrame4.UpdateOriginQuotation(instrument);
        }
        if (updateUIParameter.needUpdateOverrideQuotationByOriginArrived) {
            updateUIParameter.needUpdateOverrideQuotationByOriginArrived = false;
            UpdateOverrideQuotation(instrument, line, true);
        }
    }

    //3. flashSourceBidPriceCount
    if (updateUIParameter.isUpdateFlashSourceBidPriceCount) {// && updateUIParameter.flashSourceBidPriceCount == 0) {
        updateUIParameter.isUpdateFlashSourceBidPriceCount = false;
        RestorePriceColor(null, line, true);
    }

    //4. flashBidPriceCount
    if (updateUIParameter.isUpdateFlashBidPriceCount) {// && updateUIParameter.flashBidPriceCount == 0) {
        updateUIParameter.isUpdateFlashBidPriceCount = false;
        RestorePriceColor(null, line, false);
    }

    //5. waitTime Count
    if (updateUIParameter.isUpdateWaitTimeCount && !instrument.isDealerInput) {
        updateUIParameter.isUpdateWaitTimeCount = false;
        vsflexQuotation.TextMatrix(line, _QuotationGridColIndexs.Count) = updateUIParameter.waitTimeCount > 0 ? updateUIParameter.waitTimeCount : "";
    }

    //6. Trading Time
    if (updateUIParameter.isUpdateTradingTime) {
        updateUIParameter.isUpdateTradingTime = false;
        if (instrument.currentTradeTime) {
            vsflexQuotation.TextMatrix(line, _QuotationGridColIndexs.OpenTime) = GetDateTimeString(instrument.currentTradeTime.beginTime, "DateTime");
            vsflexQuotation.TextMatrix(line, _QuotationGridColIndexs.CloseTime) = GetDateTimeString(instrument.currentTradeTime.endTime, "DateTime");
        }
        SetInstrumentBackColor(instrument, vsflexQuotation, line);
    }

    //7. SingleUpdateOverrideQuotation
    if (updateUIParameter.needSingleUpdateOverrideQuotation) {
        updateUIParameter.needSingleUpdateOverrideQuotation = false;
        UpdateOverrideQuotation(instrument, line, true);
    }

    //8. SingleUpdateQuotationHistorySnap
    if (updateUIParameter.needSingleUpdateQuotationHistorySnap) {
        updateUIParameter.needSingleUpdateQuotationHistorySnap = false;
        UpdateQuotationHistorySnap(instrument, line, false);
    }
}

//function QuotationCountTimer() {
//    var vsflexGrid = vsflexQuotation;
//    vsflexGrid.Redraw = false;
//    for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
//        var flashPriceCount = vsflexGrid.Cell(flexcpData, line, _QuotationGridColIndexs.SourceBid);
//        if (flashPriceCount >= 0) {
//            vsflexGrid.Cell(flexcpData, line, _QuotationGridColIndexs.SourceBid) = (flashPriceCount - 1);
//            if (flashPriceCount == 0)
//                RestorePriceColor(null, line, true);
//        }

//        var flashPriceCount = vsflexGrid.Cell(flexcpData, line, _QuotationGridColIndexs.Bid);
//        if (flashPriceCount >= 0) {
//            vsflexGrid.Cell(flexcpData, line, _QuotationGridColIndexs.Bid) = (flashPriceCount - 1);
//            if (flashPriceCount == 0)
//                RestorePriceColor(null, line, false);
//        }

//        var countStr = vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.Count);
//        if (countStr == "")
//            continue;

//        var data = vsflexGrid.RowData(line);
//        var instrument = data.object;
//        if (instrument.isDealerInput)
//            continue;

//        var countInt = parseInt(countStr) - 1;
//        if (countInt > 0 && instrument.isWaiting == true) {
//            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.Count) = countInt.toString();
//        }
//        else	//wait count is over
//        {
//            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.Count) = "";

//            instrument.isWaiting = false;
//            if (instrument.isDealerInput == false && instrument.isOutOfRange == false) {
//                instrument.CalculateAllOverrideQuotation(false);
//            }
//        }
//    }
//    vsflexGrid.Redraw = true;
//}

////Added by Michael on 2003-11-27
//function UpdateAdjustTime(instrument,timestamp)
//{
//	try
//	{
//		var vsflexGrid = vsflexQuotation;
//		var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
//		if (line < vsflexGrid.FixedRows) return;
//	
//		//for(var line=vsflexGrid.FixedRows; line<vsflexGrid.Rows; line++)
//		//{
//		//	var rowData = vsflexGrid.RowData(line);
//		//	if(rowData.object.id == instrument.id)
//		//	{
//				var col = _QuotationGridColIndexs.Time;
//				
//				var s = "";
//				s += (timestamp.getMonth() + 1) + "/";
//				s += timestamp.getDate() + "/";
//				s += timestamp.getFullYear();

//				if (vsflexGrid.TextMatrix(line, col) != "" && timestamp.valueOf() > new Date(s + " " + vsflexGrid.TextMatrix(line, col)).valueOf() + 1000)
//					vsflexGrid.TextMatrix(line, col) = TimeString(timestamp);
//		//		break;
//		//	}
//		//}
//	}
//	catch(e)
//	{
//	}	
//}

//Added by Michael on 2003-11-27
function TimeString(timestamp) {
    if (timestamp) {
        var s = "";
        var value = timestamp.getHours();
        if (value < 10)
            s = "0";
        s += value.toString();
        s += ":";

        value = timestamp.getMinutes();
        if (value < 10)
            s += "0";
        s += value.toString();
        s += ":";

        value = timestamp.getSeconds();
        if (value < 10)
            s += "0";
        s += value.toString();
        return s;
    }
    else
        return "00:00:00";
}

//function ResetWaitTime(instrument) {
//    var vsflexGrid = vsflexQuotation;

//    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
//    if (line < vsflexGrid.FixedRows) return;
//    var col = _QuotationGridColIndexs.Count;
//    var waitTime = instrument.GetWaitTime();
//    instrument.isWaiting = (waitTime > 0);
//    vsflexGrid.TextMatrix(line, col) = (waitTime > 0) ? waitTime : "";
//}

function UpdateOriginQuotation(instrument, line) {
    var vsflexGrid = vsflexQuotation;

    //    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    //    if (line < vsflexGrid.FixedRows) return;
    //    vsflexGrid.Redraw = false;

    //var count = vsflexGrid.Rows;
    //for(var line=vsflexGrid.FixedRows; line<count; line++)
    //{
    //	var rowData = vsflexGrid.RowData(line);
    //	if(rowData.object.id == instrument.id)
    //	{
    //			var col = _QuotationGridColIndexs.Count;
    //			var waitTime = instrument.GetWaitTime();
    //			instrument.isWaiting = (waitTime > 0);
    //			vsflexGrid.TextMatrix(line, col) = (waitTime > 0)?waitTime:"";

    var col = _QuotationGridColIndexs.Time;
    vsflexGrid.TextMatrix(line, col) = instrument.originQuotation.TimeString();

    if (instrument.originQuotation.bid) {
        UpdatePrice(vsflexGrid, line, _QuotationGridColIndexs.SourceBid, color_blue, instrument.originQuotation.bid, true);
    }
    if (instrument.originQuotation.ask) {
        UpdatePrice(vsflexGrid, line, _QuotationGridColIndexs.SourceAsk, color_red, instrument.originQuotation.ask, true);
    }
    if (instrument.originQuotation.origin) {
        UpdatePrice(vsflexGrid, line, _QuotationGridColIndexs.Source, color_cornflowerblue, instrument.originQuotation.origin, true);
    }

    UpdateHighLow(instrument, line);
    //    FlashPriceColor(line, true);
    //		break;
    //	}
    //}
    //    vsflexGrid.Redraw = true;
}

function UpdateQuotationHistorySnap(instrument, line, needRedraw) {
    if (instrument == null) return;
    var vsflexGrid = vsflexQuotation;
    var historyQuotess = instrument.historyQuotess;
    if (historyQuotess.Exists(oCurrentQuotePolicyDetailID)) {
        var historyQuotes = historyQuotess.Item(oCurrentQuotePolicyDetailID);
        var count = historyQuotes.length;
        if (count <= 0) return;
        var quote = historyQuotes[count - 1];
        if (quote) {
            //            var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
            //            if (line < vsflexGrid.FixedRows) return;
            with (vsflexGrid) {
                //                if (needRedraw) Redraw = false;
                //TextMatrix(line, _QuotationGridColIndexs.HistoryBid) = quote[2];
                UpdatePrice(vsflexGrid, line, _QuotationGridColIndexs.HistoryBid, color_yellow, quote[2], false);

                //TextMatrix(line, _QuotationGridColIndexs.HistoryAsk) = quote[3];
                UpdatePrice(vsflexGrid, line, _QuotationGridColIndexs.HistoryAsk, color_yellow, quote[3], false);

                //Added by Michael on 2008-03-17
                UpdateHighLow(instrument, line);
                //                if (needRedraw) Redraw = true;
            }
        }
    }
}

function UpdateOverrideQuotation(instrument, line, needRedraw) {
    if (!instrument.overrideQuotation) return;

    var vsflexGrid = vsflexQuotation;

    //    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    //    if (line < vsflexGrid.FixedRows) return;
    //    if (needRedraw) vsflexGrid.Redraw = false;

    //if(!line || line < vsflexGrid.FixedRows) line=vsflexGrid.FixedRows;
    //for(; line<count; line++)
    //{
    //	var rowData = vsflexGrid.RowData(line);
    //	if(rowData.object.id == instrument.id)
    //	{
    if (instrument.overrideQuotation.bid) {
        UpdatePrice(vsflexGrid, line, _QuotationGridColIndexs.Bid, color_yellow, instrument.overrideQuotation.bid, true);
    }
    if (instrument.overrideQuotation.ask) {
        UpdatePrice(vsflexGrid, line, _QuotationGridColIndexs.Ask, color_green, instrument.overrideQuotation.ask, true);
    }

    UpdateHighLow(instrument, line);
    //    FlashPriceColor(line, false);

    //update price of quotePolicyWindow
    try {
        window.parent.QuotePolicyFrm.OnQuoteChange(instrument, true);
        //if (window.quotePolicyWindow && !window.quotePolicyWindow.closed && window.quotePolicyWindow.OnQuoteChange) {
        //    window.quotePolicyWindow.OnQuoteChange(instrument);
        //}
    }
    catch (ex)
			{ }
    //		break;
    //	}
    //}
    //    if (needRedraw) vsflexGrid.Redraw = true;
}

function UpdateHighLow(instrument, line) {
    var vsflexGrid = vsflexQuotation;

    var quotePolicyDetail = instrument.GetQuotePolicyDetail(oCurrentQuotePolicyDetailID);
    if (!quotePolicyDetail) return;

    var high = null;
    var low = null;
    if (quotePolicyDetail.isOriginHiLo) {
        if (instrument.maxMin.maxAsk) high = instrument.maxMin.maxAsk;
        if (instrument.maxMin.minBid) low = instrument.maxMin.minBid;
    }
    else {
        var maxMin;
        if (instrument.maxMins.Exists(oCurrentQuotePolicyDetailID))
            maxMin = instrument.maxMins.Item(oCurrentQuotePolicyDetailID);
        if (maxMin && maxMin.maxAsk) high = maxMin.maxAsk;
        if (maxMin && maxMin.minBid) low = maxMin.minBid;
    }
    UpdatePrice(vsflexGrid, line, _QuotationGridColIndexs.High, color_cornflowerblue, high, true);
    UpdatePrice(vsflexGrid, line, _QuotationGridColIndexs.Low, color_cornflowerblue, low, true);
}
//12345
function UpdateTotalBuySellLot(instrument) {
    var vsflexGrid = vsflexQuotation;

    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    if (line < vsflexGrid.FixedRows) return;

    var buyLot = parseFloat(vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.BuyLot)).toFixed(2) - parseFloat(instrument.buyLot).toFixed(2);
    buyLot = isNaN(buyLot) ? 0.00 : buyLot;
    var sellLot = parseFloat(vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.SellLot)).toFixed(2) - parseFloat(instrument.sellLot).toFixed(2);
    sellLot = isNaN(sellLot) ? 0.00 : sellLot;
    vsflexGrid.Redraw = false;
    if (buyLot < 0) {
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.BuyLot) = color_blue;
    }
    else if (buyLot > 0) {
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.BuyLot) = color_red;
    }
    if (sellLot < 0) {
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.SellLot) = color_blue;
    }
    else if (sellLot > 0) {
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.SellLot) = color_red;
    }
    var lotDecimal = window.parent.quotationFrm.oDealingConsole.LotDecimal;
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.BuyLot) = GetFormatLot2(instrument.buyLot, true, lotDecimal);
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.SellLot) = GetFormatLot2(instrument.sellLot, true, lotDecimal);

    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.LastLot) = GetFormatLot2(instrument.lastLot, true, lotDecimal);
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.LastSales) = instrument.lastSales;

    vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.LastLot) = (instrument.isBuy == "B") ? color_blue : color_red;
    vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.LastSales) = (instrument.isBuy == "B") ? color_blue : color_red;
    vsflexGrid.Redraw = true;
}

//function FlashPriceColor(line, isSource)
//{
//	var vsflexGrid = vsflexQuotation;
//	var col = isSource ? _QuotationGridColIndexs.SourceBid : _QuotationGridColIndexs.Bid;
//	vsflexGrid.Cell(flexcpData, line, col) = oFlashPriceTime;
//}

function RestorePriceColor(colData, line, isSource) {
    var vsflexGrid = vsflexQuotation;

    //	var col = isSource ? _QuotationGridColIndexs.SourceBid : _QuotationGridColIndexs.Bid;
    //	vsflexGrid.Cell(flexcpData, line, col) = null;

    if (isSource) {
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.SourceBid) = color_black;
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.SourceAsk) = color_black;
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.Source) = color_black;
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.BuyLot) = color_black;
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.SellLot) = color_black;
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.LastLot) = color_black;
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.LastSales) = color_black;
    }
    else {
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.Bid) = color_black;
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.Ask) = color_black;
    }

    var rowData = vsflexGrid.RowData(line);
    var instrument = rowData.object;
    var quotePolicyDetail = instrument.GetQuotePolicyDetail(oCurrentQuotePolicyDetailID);
    if (quotePolicyDetail && quotePolicyDetail.isOriginHiLo == isSource) {
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.High) = color_black;
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.Low) = color_black;
    }
}

function UpdatePrice(vsflexGrid, line, col, color, newPrice, isCast) {
    var valueOld = vsflexGrid.TextMatrix(line, col);
    var valueNew = "";
    if (isCast) {
        valueNew = (newPrice == null) ? "" : newPrice.ToString();
    }
    else {
        valueNew = newPrice;
    }
    if (valueNew == valueOld) {
        vsflexGrid.Cell(flexcpForeColor, line, col) = color_black;
        return;
    }
    vsflexGrid.TextMatrix(line, col) = valueNew;
    vsflexGrid.Cell(flexcpForeColor, line, col) = (valueNew > valueOld) ? color_blue : color_red;
}

function OnQuotePolicyChanged(newQuotePolicyID) {
    var quotePolicys = oQuotePolicys;
    if (quotePolicys.Exists(newQuotePolicyID) == true) {
        oCurrentQuotePolicyDetailID = newQuotePolicyID;

        var row = 0;
        var vsflexGrid = vsflexQuotation;
        vsflexGrid.Redraw = false;
        var count = vsflexGrid.FixedRows;
        for (var line = vsflexGrid.Rows - 1; line >= count; line--) {
            var data = vsflexGrid.RowData(line);
            if (data) {
                var instrument = data.object;
                var quotePolicyDetail = null;
                var isExists = instrument.quotePolicyDetails.Exists(newQuotePolicyID);
                if (isExists) quotePolicyDetail = instrument.quotePolicyDetails.Item(newQuotePolicyID);
                vsflexGrid.RowHidden(line) = (!isExists);
                if (isExists) {
                    row = line;
                    var quote = instrument.backQuotation;
                    if (quote) {
                        instrument.overrideQuotation = instrument.CalculateOverrideQuotation(quote, quotePolicyDetail); // newQuotePolicyID);
                        instrument.SetFlashBidPriceCount(oFlashPriceTime, true);
                        //UpdateOverrideQuotation(instrument, line, false);
                        instrument.SetNeedSingleUpdateOverrideQuotation();
                        //UpdateQuotationHistorySnap(instrument, line, false);
                        instrument.SetNeedSingleUpdateQuotationHistorySnap();
                        RestorePriceColor(null, line, false);
                        RestorePriceColor(null, line, true);
                    }
                }
            }
        }

        //fire event OnQuotationBeforeRowColChange of vsflexQuotation
        if (row < vsflexGrid.FixedRows) {
            oCurrentInstrumentID = null;
            OnHistoryInstrumentChanged(null);
            OnPropertyInstrumentChanged(null);
            OnQuotePolicyInstrumentChanged(null);
        }
        else {
            vsflexGrid.Select(row, 2);
            vsflexGrid.Select(row, 1);
        }
        vsflexGrid.Redraw = true;

        window.parent.SourceLevelAdjustmentFrm.FillSourceLevelAdjustmentGrid();
    }
}

function OnQuotationQuotePolicyChanged() {
    var vsflexGrid = vsflexQuotation;
    var count = vsflexGrid.Rows;
    for (var line = vsflexGrid.FixedRows; line < count; line++) {
        var data = vsflexGrid.RowData(line);
        if (data) {
            var instrument = data.object;
            if (instrument.quotePolicyDetails.Exists(oCurrentQuotePolicyDetailID) == true) {
                var quotePolicyDetail = instrument.quotePolicyDetails.Item(oCurrentQuotePolicyDetailID);
                if (quotePolicyDetail) {
                    var col = _QuotationGridColIndexs.MaxSpreadPoints;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.maxSpreadPointsTemp == null) ? quotePolicyDetail.maxSpreadPoints : quotePolicyDetail.maxSpreadPointsTemp;
                    col = _QuotationGridColIndexs.SpreadPoints;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.spreadPointsTemp == null) ? quotePolicyDetail.spreadPoints : quotePolicyDetail.spreadPointsTemp;
                    col = _QuotationGridColIndexs.SpreadPoints2;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.spreadPoints2Temp == null) ? quotePolicyDetail.spreadPoints2 : quotePolicyDetail.spreadPoints2Temp;
                    col = _QuotationGridColIndexs.SpreadPoints3;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.spreadPoints3Temp == null) ? quotePolicyDetail.spreadPoints3 : quotePolicyDetail.spreadPoints3Temp;
                    col = _QuotationGridColIndexs.SpreadPoints4;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.spreadPoints4Temp == null) ? quotePolicyDetail.spreadPoints4 : quotePolicyDetail.spreadPoints4Temp;

                    col = _QuotationGridColIndexs.MaxAutoAdjustPoints;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.maxAutoAdjustPointsTemp == null) ? quotePolicyDetail.maxAutoAdjustPoints : quotePolicyDetail.maxAutoAdjustPointsTemp;
                    col = _QuotationGridColIndexs.AutoAdjustPoints;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.autoAdjustPointsTemp == null) ? quotePolicyDetail.autoAdjustPoints : quotePolicyDetail.autoAdjustPointsTemp;
                    col = _QuotationGridColIndexs.AutoAdjustPoints2;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.autoAdjustPoints2Temp == null) ? quotePolicyDetail.autoAdjustPoints2 : quotePolicyDetail.autoAdjustPoints2Temp;
                    col = _QuotationGridColIndexs.AutoAdjustPoints3;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.autoAdjustPoints3Temp == null) ? quotePolicyDetail.autoAdjustPoints3 : quotePolicyDetail.autoAdjustPoints3Temp;
                    col = _QuotationGridColIndexs.AutoAdjustPoints4;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.autoAdjustPoints4Temp == null) ? quotePolicyDetail.autoAdjustPoints4 : quotePolicyDetail.autoAdjustPoints4Temp;

                    col = _QuotationGridColIndexs.IsOriginHiLo;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.isOriginHiLoTemp == null) ? quotePolicyDetail.isOriginHiLo : quotePolicyDetail.isOriginHiLoTemp;
                    col = _QuotationGridColIndexs.PriceType;
                    vsflexGrid.TextMatrix(line, col) =
						(quotePolicyDetail.priceTypeTemp == null) ? PriceType.GetPriceTypeString(quotePolicyDetail.priceType) : PriceType.GetPriceTypeString(quotePolicyDetail.priceTypeTemp);
                }
            }
        }
    }
}

function OnQuotationQuotePolicyDetailChanged(instrument) {
    var vsflexGrid = vsflexQuotation;
    var quotePolicyDetailID = oCurrentQuotePolicyDetailID;

    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    if (line < vsflexGrid.FixedRows) return;

    //for(var line=vsflexGrid.FixedRows; line<vsflexGrid.Rows; line++)
    //{
    //	var data = vsflexGrid.RowData(line);
    //	if(data)
    //	{
    //		if(instrument.id == data.object.id)
    //		{
    UpdateQuotePolicyDetail(line, true);
    //			break;
    //		}
    //	}
    //}
}

function UpdateQuotePolicyDetail(line, needRedraw) {
    var vsflexGrid = vsflexQuotation;
    if (needRedraw) vsflexGrid.Redraw = false;
    var data = vsflexGrid.RowData(line);
    if (data && data.object) {
        var instrument = data.object;
        var quotePolicyDetailID = oCurrentQuotePolicyDetailID;
        if (instrument.quotePolicyDetails.Exists(quotePolicyDetailID) == true) {
            var quotePolicyDetail = instrument.quotePolicyDetails.Item(quotePolicyDetailID);
            if (quotePolicyDetail) {
                var col = _QuotationGridColIndexs.MaxSpreadPoints;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.maxSpreadPointsTemp == null) ? quotePolicyDetail.maxSpreadPoints : quotePolicyDetail.maxSpreadPointsTemp;
                col = _QuotationGridColIndexs.SpreadPoints;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.spreadPointsTemp == null) ? quotePolicyDetail.spreadPoints : quotePolicyDetail.spreadPointsTemp;
                col = _QuotationGridColIndexs.SpreadPoints2;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.spreadPoints2Temp == null) ? quotePolicyDetail.spreadPoints2 : quotePolicyDetail.spreadPoints2Temp;
                col = _QuotationGridColIndexs.SpreadPoints3;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.spreadPoints3Temp == null) ? quotePolicyDetail.spreadPoints3 : quotePolicyDetail.spreadPoints3Temp;
                col = _QuotationGridColIndexs.SpreadPoints4;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.spreadPoints4Temp == null) ? quotePolicyDetail.spreadPoints4 : quotePolicyDetail.spreadPoints4Temp;

                col = _QuotationGridColIndexs.MaxAutoAdjustPoints;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.maxAutoAdjustPointsTemp == null) ? quotePolicyDetail.maxAutoAdjustPoints : quotePolicyDetail.maxAutoAdjustPointsTemp;
                col = _QuotationGridColIndexs.AutoAdjustPoints;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.autoAdjustPointsTemp == null) ? quotePolicyDetail.autoAdjustPoints : quotePolicyDetail.autoAdjustPointsTemp;
                col = _QuotationGridColIndexs.AutoAdjustPoints2;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.autoAdjustPoints2Temp == null) ? quotePolicyDetail.autoAdjustPoints2 : quotePolicyDetail.autoAdjustPoints2Temp;
                col = _QuotationGridColIndexs.AutoAdjustPoints3;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.autoAdjustPoints3Temp == null) ? quotePolicyDetail.autoAdjustPoints3 : quotePolicyDetail.autoAdjustPoints3Temp;
                col = _QuotationGridColIndexs.AutoAdjustPoints4;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.autoAdjustPoints4Temp == null) ? quotePolicyDetail.autoAdjustPoints4 : quotePolicyDetail.autoAdjustPoints4Temp;

                col = _QuotationGridColIndexs.IsOriginHiLo;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.isOriginHiLoTemp == null) ? quotePolicyDetail.isOriginHiLo : quotePolicyDetail.isOriginHiLoTemp;
                col = _QuotationGridColIndexs.PriceType;
                vsflexGrid.TextMatrix(line, col) =
					(quotePolicyDetail.priceTypeTemp == null) ? PriceType.GetPriceTypeString(quotePolicyDetail.priceType) : PriceType.GetPriceTypeString(quotePolicyDetail.priceTypeTemp);
            }
        }
    }
    if (needRedraw) vsflexGrid.Redraw = true;
}

function OnQuotationPropertiesChangedForSuspendOrResume(instrument) {
    var vsflexGrid = vsflexQuotation;
    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    if (line < vsflexGrid.FixedRows) return;
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsAutoEnablePrice) = instrument.isAutoEnablePrice;
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsPriceEnabled) = instrument.isPriceEnabled;
}

function OnQuotationPropertiesChangedForAutoToManual(instrument) {
    var vsflexGrid = vsflexQuotation;
    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    if (line < vsflexGrid.FixedRows) return;
    //	vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoDQMaxLot) = instrument.autoDQMaxLot;
    //	vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoLmtMktMaxLot) = instrument.autoLmtMktMaxLot;
    vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsAutoFill) = instrument.isAutoFill;
}

function OnQuotationPropertiesChanged(instrument, isInit) {
    var vsflexGrid = vsflexQuotation;
    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
    if (line < vsflexGrid.FixedRows) return;
    vsflexGrid.Redraw = false;
    //for(var line=vsflexGrid.FixedRows; line<vsflexGrid.Rows; line++)
    //{
    //	var data = vsflexGrid.RowData(line);
    //	if(data && instrument.id == data.object.id)
    //	{
    UpdateProperties(line, isInit);
    //		break;
    //	}
    //}
    vsflexGrid.Redraw = true;
}

function UpdateProperties(line, isInit) {
    var vsflexGrid = vsflexQuotation;
    var data = vsflexGrid.RowData(line);
    if (data && data.object) {
        var instrument = data.object;

        //Modified by Michael on 2004-04-01
        if (instrument.currentTradeTime != null) {
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.OpenTime) = GetDateTimeString(instrument.currentTradeTime.beginTime, "DateTime"); //instrument.beginTime.getVarDate();
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.CloseTime) = GetDateTimeString(instrument.currentTradeTime.endTime, "DateTime"); //instrument.endTime.getVarDate();
        }
        else {
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.OpenTime) = GetDateTimeString(instrument.beginTime, "DateTime"); //instrument.beginTime.getVarDate();
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.CloseTime) = GetDateTimeString(instrument.endTime, "DateTime"); //instrument.endTime.getVarDate();
        }

        vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.NumeratorUnit) = instrument.numeratorUnit;
        vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.Denominator) = instrument.denominator;

        var allowLMT = instrument.allowLMT();
        if (isInit) {
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.OriginType) = instrument.originType;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AllowedSpotTradeOrderSides) = AllowedOrderSides.GetAllowedOrderSidesString(instrument.allowedSpotTradeOrderSides);
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.OriginInactiveTime) = instrument.originInactiveTime;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AlertVariation) = instrument.alertVariation;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.NormalWaitTime) = instrument.normalWaitTime;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AlertWaitTime) = instrument.alertWaitTime;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.MaxDQLot) = instrument.maxDQLot;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.MaxOtherLot) = instrument.maxOtherLot;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.DQQuoteMinLot) = instrument.dqQuoteMinLot;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoDQMaxLot) = instrument.autoDQMaxLot;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoLmtMktMaxLot) = instrument.autoLmtMktMaxLot;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AcceptDQVariation) = instrument.acceptDQVariation;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AcceptLmtVariation) = instrument.acceptLmtVariation;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AcceptCloseLmtVariation) = instrument.acceptCloseLmtVariation;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.CancelLmtVariation) = instrument.cancelLmtVariation;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.MaxMinAdjust) = instrument.maxMinAdjust;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsBetterPrice) = instrument.isBetterPrice;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoAcceptMaxLot) = instrument.autoAcceptMaxLot;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoCancelMaxLot) = instrument.autoCancelMaxLot;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AllowedNewTradeSides) = AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeStr(instrument.allowedNewTradeSides);
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.HitTimes) = instrument.hitTimes;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.PenetrationPoint) = instrument.penetrationPoint;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.PriceValidTime) = instrument.priceValidTime;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.LastAcceptTimeSpan) = instrument.lastAcceptTimeSpan;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsAutoEnablePrice) = instrument.isAutoEnablePrice;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsAutoFill) = instrument.isAutoFill;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsPriceEnabled) = instrument.isPriceEnabled;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoDQDelay) = instrument.autoDQDelay;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.HitPriceVariationForSTP) = instrument.hitPriceVariationForSTP;
        }
        else {
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.OriginType) =
				(instrument.originTypeTemp == null) ? instrument.originType : instrument.originTypeTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AllowedSpotTradeOrderSides) =
				(instrument.allowedSpotTradeOrderSidesTemp == null) ? AllowedOrderSides.GetAllowedOrderSidesString(instrument.allowedSpotTradeOrderSides) : AllowedOrderSides.GetAllowedOrderSidesString(instrument.allowedSpotTradeOrderSidesTemp);
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.OriginInactiveTime) =
				(instrument.originInactiveTimeTemp == null) ? instrument.originInactiveTime : instrument.originInactiveTimeTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AlertVariation) =
				(instrument.alertVariationTemp == null) ? instrument.alertVariation : instrument.alertVariationTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.NormalWaitTime) =
				(instrument.normalWaitTimeTemp == null) ? instrument.normalWaitTime : instrument.normalWaitTimeTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AlertWaitTime) =
				(instrument.alertWaitTimeTemp == null) ? instrument.alertWaitTime : instrument.alertWaitTimeTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.MaxDQLot) =
				(instrument.maxDQLotTemp == null) ? instrument.maxDQLot : instrument.maxDQLotTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.MaxOtherLot) =
				(instrument.maxOtherLotTemp == null) ? instrument.maxOtherLot : instrument.maxOtherLotTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.DQQuoteMinLot) =
				(instrument.dqQuoteMinLotTemp == null) ? instrument.dqQuoteMinLot : instrument.dqQuoteMinLotTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoDQMaxLot) =
				(instrument.autoDQMaxLotTemp == null) ? instrument.autoDQMaxLot : instrument.autoDQMaxLotTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoLmtMktMaxLot) =
				(instrument.autoLmtMktMaxLotTemp == null) ? instrument.autoLmtMktMaxLot : instrument.autoLmtMktMaxLotTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AcceptDQVariation) =
				(instrument.acceptDQVariationTemp == null) ? instrument.acceptDQVariation : instrument.acceptDQVariationTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AcceptLmtVariation) =
				(instrument.acceptLmtVariationTemp == null) ? instrument.acceptLmtVariation : instrument.acceptLmtVariationTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AcceptCloseLmtVariation) =
				(instrument.acceptCloseLmtVariationTemp == null) ? instrument.acceptCloseLmtVariation : instrument.acceptCloseLmtVariationTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.CancelLmtVariation) =
				(instrument.cancelLmtVariationTemp == null) ? instrument.cancelLmtVariation : instrument.cancelLmtVariationTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.MaxMinAdjust) =
				(instrument.maxMinAdjustTemp == null) ? instrument.maxMinAdjust : instrument.maxMinAdjustTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsBetterPrice) =
				(instrument.isBetterPriceTemp == null) ? instrument.isBetterPrice : instrument.isBetterPriceTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoAcceptMaxLot) =
				(instrument.autoAcceptMaxLotTemp == null) ? instrument.autoAcceptMaxLot : instrument.autoAcceptMaxLotTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoCancelMaxLot) =
				(instrument.autoCancelMaxLotTemp == null) ? instrument.autoCancelMaxLot : instrument.autoCancelMaxLotTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AllowedNewTradeSides) =
                (instrument.allowedNewTradeSidesTemp == null) ? AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeStr(instrument.allowedNewTradeSides) : AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeStr(instrument.allowedNewTradeSidesTemp);
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.HitTimes) =
				(instrument.hitTimesTemp == null) ? instrument.hitTimes : instrument.hitTimesTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.PenetrationPoint) =
				(instrument.penetrationPointTemp == null) ? instrument.penetrationPoint : instrument.penetrationPointTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.PriceValidTime) =
				(instrument.priceValidTimeTemp == null) ? instrument.priceValidTime : instrument.priceValidTimeTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.LastAcceptTimeSpan) =
				(instrument.lastAcceptTimeSpanTemp == null) ? instrument.lastAcceptTimeSpan : instrument.lastAcceptTimeSpanTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.LastAcceptTimeSpan) =
				(instrument.lastAcceptTimeSpanTemp == null) ? instrument.lastAcceptTimeSpan : instrument.lastAcceptTimeSpanTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsAutoEnablePrice) =
				(instrument.isAutoEnablePriceTemp == null) ? instrument.isAutoEnablePrice : instrument.isAutoEnablePriceTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsAutoFill) =
				(instrument.isAutoFillTemp == null) ? instrument.isAutoFill : instrument.isAutoFillTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.IsPriceEnabled) =
				(instrument.isPriceEnabledTemp == null) ? instrument.isPriceEnabled : instrument.isPriceEnabledTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AutoDQDelay) =
				(instrument.autoDQDelayTemp == null) ? instrument.autoDQDelay : instrument.autoDQDelayTemp;
            vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.HitPriceVariationForSTP) =
				(instrument.hitPriceVariationForSTPTemp == null) ? instrument.hitPriceVariationForSTP : instrument.hitPriceVariationForSTPTemp;

            //if (instrument.isPriceEnabledTemp != null && instrument.isPriceEnabledTemp == false && instrument.isPriceEnabledTemp != instrument.isPriceEnabled) { 
            //    window.parent.quotationFrm.oDealingConsole.PlaySound(SoundOption.Inactive);
            //} 
        }

        vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.AllowOrRejectLMT) = allowLMT ? comboListLanguage["DisAllowLMT"] : comboListLanguage["AllowLMT"];
        vsflexGrid.Cell(flexcpForeColor, line, _QuotationGridColIndexs.AllowOrRejectLMT) = allowLMT ? color_red : color_green;
        SetInstrumentBackColor(instrument, vsflexGrid, line);
    }
}

function SortByImstrumentList() {
    var vsflexGrid = vsflexQuotation;
    //remove the hidden lines
    for (var line = vsflexGrid.Rows - 1; line >= vsflexGrid.FixedRows; line--) {
        var data = vsflexGrid.RowData(line);
        var instrument = data.object;
        if (!oInstrumentList.Exists(instrument.id))
            vsflexGrid.RemoveItem(line);
    }

    var row;
    for (var line = vsflexGrid.FixedRows; line < vsflexGrid.Rows; line++) {
        for (var line1 = line; line1 < vsflexGrid.Rows; line1++) {
            var data = vsflexGrid.RowData(line1);
            var instrument = data.object;
            if (!row)
                row = line;
            var index = oInstrumentList.Item(instrument.id).order;
            if (index + vsflexGrid.FixedRows == line && line1 != line) {
                SwapRow(vsflexGrid, line, line1);
                break;
            }
        }
    }
    var instrument = null;
    if (row) {
        var data = vsflexGrid.RowData(row);
        instrument = data.object;
        oCurrentInstrumentID = instrument.id;
        vsflexGrid.Select(row, 1);
    }
    OnHistoryInstrumentChanged(instrument);
    OnPropertyInstrumentChanged(instrument);
    OnQuotePolicyInstrumentChanged(instrument);
}

function SwapRow(vsflexGrid, line1, line2) {
    var textArray = new Array();
    //	var dataArray = new Array();
    var data = vsflexGrid.RowData(line1);
    for (var col = vsflexGrid.FixedCols; col < vsflexGrid.Cols; col++) {
        textArray.push(vsflexGrid.TextMatrix(line1, col));
        //		dataArray.push(vsflexGrid.Cell(flexcpData, line1, col));
    }

    vsflexGrid.RowData(line1) = vsflexGrid.RowData(line2);
    for (var col = vsflexGrid.FixedCols; col < vsflexGrid.Cols; col++) {
        vsflexGrid.TextMatrix(line1, col) = vsflexGrid.TextMatrix(line2, col);
        //		vsflexGrid.Cell(flexcpData, line1, col) = vsflexGrid.Cell(flexcpData, line2, col);
    }

    vsflexGrid.RowData(line2) = data;
    for (var col = vsflexGrid.FixedCols; col < vsflexGrid.Cols; col++) {
        vsflexGrid.TextMatrix(line2, col) = textArray[col - vsflexGrid.FixedCols];
        //		vsflexGrid.Cell(flexcpData, line2, col) = dataArray[col-vsflexGrid.FixedCols];
    }
}

//function UpdateTradeTime(instrument) {
//    var vsflexGrid = vsflexQuotation;

//    var line = vsflexGrid.FindRow(instrument.id, vsflexGrid.FixedRows, _QuotationGridColIndexs.ID, true, true);
//    if (line < vsflexGrid.FixedRows) return;
//    vsflexGrid.Redraw = false;

//    //if(!line || line < vsflexGrid.FixedRows || line >= vsflexGrid.Rows)
//    //	line=vsflexGrid.FixedRows;
//    //for(; line<vsflexGrid.Rows; line++)
//    //{
//    //	var rowData = vsflexGrid.RowData(line);
//    //	if(rowData.object.id == instrument.id)
//    //	{
//    if (instrument.currentTradeTime) {
//        vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.OpenTime) = GetDateTimeString(instrument.currentTradeTime.beginTime, "DateTime");
//        vsflexGrid.TextMatrix(line, _QuotationGridColIndexs.CloseTime) = GetDateTimeString(instrument.currentTradeTime.endTime, "DateTime");
//    }
//    SetRowBackColor(vsflexGrid, line, instrument.isTrading ? color_white : color_lightgrey);
//    //		break;
//    //	}
//    //}
//    vsflexGrid.Redraw = true;
//}

function OnPropertyInstrumentChanged(instrument) {
    parent.propertyFrm.OnPropertyInstrumentChanged(instrument);
}

function OnHistoryInstrumentChanged(instrument) {
    if (instrument != null && oCurrentInstrumentID == instrument.id) {
        parent.propertyFrm.OnHistoryInstrumentChanged(instrument);
    }
}

function OnQuotePolicyInstrumentChanged(instrument) {
    if (instrument != null && oCurrentInstrumentID == instrument.id) {
        parent.QuotePolicyFrm.OnQuotePolicyInstrumentChanged(instrument);
    }
}

function RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument, needSendOverridedQuotation) {
    if (window.document.all._NeedSendQuotationChangeAPSPHidden.value.toLowerCase() == "false") return;

    if (instrument.originQuotation && instrument.originQuotation.origin) {
        if (needSendOverridedQuotation) {
            instrument.isDealerInput = true;
            instrument.SetOriginQuotation(instrument.originQuotation);
            instrument.isDealerInput = false;
        }
        else {
            instrument.SetOriginQuotation(instrument.originQuotation);
        }
    }
    else {
        if (instrument.lastQuotation && instrument.lastQuotation.origin) {
            if (needSendOverridedQuotation) {
                instrument.isDealerInput = true;
                instrument.SetOriginQuotation(instrument.lastQuotation);
                instrument.isDealerInput = false;
            }
            else {
                instrument.SetOriginQuotation(instrument.originQuotation);
            }
        }
    }
}