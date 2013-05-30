var timerID = null;
var _Instrument = null;
var quotePolicyPageLoaded = false;

function QuotePolicyPageOnLoad() {
    //    QuotePolicyPageOnSize();
    quotePolicyPageLoaded = true;
}

function Undo()
{
    QuotePolicyInit();
    OnQuotePolicyInstrumentChanged(_Instrument);
}

function QuotePolicyInit() {
    with (quotePolicyGrid) {
	    Rows = 1;
	    Cols = 12;
	    FixedRows = 1;
	    FixedCols = 1;

	    var quotationFrm = window.parent.quotationFrm;
	    var quotePolicyGridColKey = quotationFrm.quotePolicyGridColKey;
	    var quotePolicyGridLanguage = quotationFrm.quotePolicyGridLanguage;
	    var parameter = quotationFrm.oDealingConsole.InitGrid(quotePolicyGrid, quotationFrm.optionGrid.QuotePolicyGrid, quotePolicyGridLanguage);
	    if (parameter == "") GridColumnsDefaultFormatForQuotePolicy(quotePolicyGrid, quotePolicyGridColKey);

	    FixedAlignment(ColIndex(quotePolicyGridColKey.IncreaseAutoAdjustPoints)) = flexAlignCenterCenter;
	    ColAlignment(ColIndex(quotePolicyGridColKey.IncreaseAutoAdjustPoints)) = flexAlignCenterCenter;
	    ColAlignment(ColIndex(quotePolicyGridColKey.DecreaseAutoAdjustPoints)) = flexAlignCenterCenter;
	    FixedAlignment(ColIndex(quotePolicyGridColKey.DecreaseAutoAdjustPoints)) = flexAlignCenterCenter;
	    FixedAlignment(ColIndex(quotePolicyGridColKey.IncreaseSpreadPoints)) = flexAlignCenterCenter;
	    ColAlignment(ColIndex(quotePolicyGridColKey.IncreaseSpreadPoints)) = flexAlignCenterCenter;
	    ColAlignment(ColIndex(quotePolicyGridColKey.DecreaseSpreadPoints)) = flexAlignCenterCenter;
	    FixedAlignment(ColIndex(quotePolicyGridColKey.DecreaseSpreadPoints)) = flexAlignCenterCenter;

	    //FrozenCols = 1;
	    ExtendLastCol = false;
	    AllowUserFreezing = flexFreezeBoth;
	    AllowUserResizing = flexResizeBoth;
	    ExplorerBar = flexExSortAndMove;
	    //Editable = flexEDKbdMouse;
	    Editable = flexEDNone;
	}
	_QuotePolicyGridColIndexs = new QuotePolicyGridColIndexs();
}

function GridColumnsDefaultFormatForQuotePolicy(grid, gridColKey) {
    with (grid) {
        ColWidth(ColIndex(gridColKey.Item)) = 1200;
        ColWidth(ColIndex(gridColKey.Bid)) = 880;
        ColWidth(ColIndex(gridColKey.Ask)) = 880;
        ColWidth(ColIndex(gridColKey.AutoAdjustPoints)) = 450;
        ColWidth(ColIndex(gridColKey.IncreaseAutoAdjustPoints)) = 300;
        ColWidth(ColIndex(gridColKey.DecreaseAutoAdjustPoints)) = 300;
        ColWidth(ColIndex(gridColKey.SpreadPoints)) = 450;
        ColWidth(ColIndex(gridColKey.IncreaseSpreadPoints)) = 300;
        ColWidth(ColIndex(gridColKey.DecreaseSpreadPoints)) = 300;
        ColWidth(ColIndex(gridColKey.BuyLot)) = 500;
        ColWidth(ColIndex(gridColKey.SellLot)) = 500;
    }
}

function OnQuotePolicyGridAfterMoveColumn(col, position) {
    _QuotePolicyGridColIndexs = new QuotePolicyGridColIndexs();
}

function QuotePolicyGridFontChanged() {
    _QuotePolicyGridColIndexs = new QuotePolicyGridColIndexs();
}

var _QuotePolicyGridColIndexs = null;
function QuotePolicyGridColIndexs() {
    this.Item = quotePolicyGrid.ColIndex("Item");
    this.Bid = quotePolicyGrid.ColIndex("Bid");
    this.Ask = quotePolicyGrid.ColIndex("Ask");
    this.AutoAdjustPoints = quotePolicyGrid.ColIndex("AutoAdjustPoints");
    this.IncreaseAutoAdjustPoints = quotePolicyGrid.ColIndex("IncreaseAutoAdjustPoints");
    this.DecreaseAutoAdjustPoints = quotePolicyGrid.ColIndex("DecreaseAutoAdjustPoints");
    this.SpreadPoints = quotePolicyGrid.ColIndex("SpreadPoints");
    this.IncreaseSpreadPoints = quotePolicyGrid.ColIndex("IncreaseSpreadPoints");
    this.DecreaseSpreadPoints = quotePolicyGrid.ColIndex("DecreaseSpreadPoints");
    this.BuyLot = quotePolicyGrid.ColIndex("BuyLot");
    this.SellLot = quotePolicyGrid.ColIndex("SellLot");
}

function OnQuotePolicyInstrumentChanged(instrument) {
    if (!quotePolicyPageLoaded) return;

    quotePolicyGrid.Redraw = false;
    var quotationFrm = window.parent.quotationFrm;
    var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
    var quotePolicyGridColKey = quotationFrm.quotePolicyGridColKey;
    if (_Instrument && instrument && instrument.id.toLowerCase() == _Instrument.id.toLowerCase()) {
        quotePolicyGrid.TextMatrix(0, 0) = _Instrument.code;
        var quotePolicyDetails = (new VBArray(_Instrument.quotePolicyDetails.Items())).toArray();
        quotePolicyDetails = quotePolicyDetails.sort(CompareSortCode);
        for (var index = 0, count = quotePolicyDetails.length; index < count; index++) {
            var quotePolicyDetail = quotePolicyDetails[index];

            var line = quotePolicyGrid.FindRow(quotePolicyDetail.quotePolicyID, quotePolicyGrid.FixedRows, _QuotePolicyGridColIndexs.Item, true, true);
            if (line > 0) {
                quotePolicyGrid.RowData(line) = quotePolicyDetail;
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.AutoAdjustPoints) = quotePolicyDetail.autoAdjustPoints.toString();
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.SpreadPoints) = quotePolicyDetail.spreadPoints.toString();

                var oldBuyLot = parseFloat(quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.BuyLot)).toFixed(2);;
                oldBuyLot = isNaN(oldBuyLot) ? 0.00 : oldBuyLot;
                var newBuyLot = parseFloat(quotePolicyDetail.buyLot).toFixed(2);

                if (newBuyLot > oldBuyLot) {
                    quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.BuyLot) = color_royalblue;
                }
                else if (newBuyLot < oldBuyLot) {
                    quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.BuyLot) = color_red;
                }

                //quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.BuyLot) = (newBuyLot > oldBuyLot) ? color_red : color_royalblue;

                var oldSellLot = parseFloat(quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.SellLot)).toFixed(2);
                oldSellLot = isNaN(oldSellLot) ? 0.00 : oldSellLot;
                var newSellLot = parseFloat(quotePolicyDetail.sellLot).toFixed(2);

                if (newSellLot > oldSellLot) {
                    quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.SellLot) = color_royalblue; 
                }
                else if (newSellLot < oldSellLot) {
                    quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.SellLot) = color_red;
                }

                //quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.SellLot) = (newSellLot > oldSellLot) ? color_red : color_royalblue;

                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.BuyLot) = GetFormatLot2(quotePolicyDetail.buyLot, true, lotDecimal);
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.SellLot) = GetFormatLot2(quotePolicyDetail.sellLot, true, lotDecimal);
            }
            else {
                quotePolicyGrid.AddItem("");
                var line = quotePolicyGrid.Rows - 1;
                quotePolicyGrid.RowData(line) = quotePolicyDetail;
                quotePolicyGrid.TextMatrix(line, 0) = quotePolicyDetail.code;
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.Item) = quotePolicyDetail.quotePolicyID;
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.Bid) = "";
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.Ask) = "";
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.AutoAdjustPoints) = quotePolicyDetail.autoAdjustPoints.toString();
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.IncreaseAutoAdjustPoints) = "+";
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.DecreaseAutoAdjustPoints) = "-";
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.SpreadPoints) = quotePolicyDetail.spreadPoints.toString();
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.IncreaseSpreadPoints) = "+";
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.DecreaseSpreadPoints) = "-";
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.BuyLot) = GetFormatLot2(quotePolicyDetail.buyLot, true, lotDecimal);
                quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.SellLot) = GetFormatLot2(quotePolicyDetail.sellLot, true, lotDecimal);
                                                 
                quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.IncreaseSpreadPoints) = color_royalblue;
                quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.DecreaseSpreadPoints) = color_indianred;
                quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.IncreaseAutoAdjustPoints) = color_royalblue;
                quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.DecreaseAutoAdjustPoints) = color_indianred;
            }
        }
        //quotePolicyGrid.ColSort(_QuotePolicyGridColIndexs.Item) = flexSortUseColSort;
        //quotePolicyGrid.Sort = flexSortUseColSort;

        OnQuoteChange(_Instrument,false);

        SetDealerParameterEditable();
    }
    else {
        _Instrument = instrument;
        QuotePolicyInit();
        if (!instrument) return;

        quotePolicyGrid.TextMatrix(0, 0) = _Instrument.code;
        var quotePolicyDetails = (new VBArray(_Instrument.quotePolicyDetails.Items())).toArray();
        quotePolicyDetails = quotePolicyDetails.sort(CompareSortCode);
        for (var index = 0, count = quotePolicyDetails.length; index < count; index++) {
            var quotePolicyDetail = quotePolicyDetails[index];
            quotePolicyGrid.AddItem("");
            var line = quotePolicyGrid.Rows - 1;
            quotePolicyGrid.RowData(line) = quotePolicyDetail;
            quotePolicyGrid.TextMatrix(line, 0) = quotePolicyDetail.code;
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.Item) = quotePolicyDetail.quotePolicyID;
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.Bid) = "";
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.Ask) = "";
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.AutoAdjustPoints) = quotePolicyDetail.autoAdjustPoints.toString();
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.IncreaseAutoAdjustPoints) = "+";
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.DecreaseAutoAdjustPoints) = "-";
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.SpreadPoints) = quotePolicyDetail.spreadPoints.toString();
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.IncreaseSpreadPoints) = "+";
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.DecreaseSpreadPoints) = "-";
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.BuyLot) = GetFormatLot2(quotePolicyDetail.buyLot, true, lotDecimal);
            quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.SellLot) = GetFormatLot2(quotePolicyDetail.sellLot, true, lotDecimal);
                                             
            quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.IncreaseSpreadPoints) = color_royalblue;
            quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.DecreaseSpreadPoints) = color_indianred;
            quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.IncreaseAutoAdjustPoints) = color_royalblue;
            quotePolicyGrid.Cell(flexcpBackColor, line, _QuotePolicyGridColIndexs.DecreaseAutoAdjustPoints) = color_indianred;
        }
        //quotePolicyGrid.ColSort(_QuotePolicyGridColIndexs.Item) = flexSortUseColSort;
        //quotePolicyGrid.Sort = flexSortUseColSort;

        OnQuoteChange(_Instrument,false);

        SetDealerParameterEditable();
    }
    quotePolicyGrid.Redraw = true;
}

function CompareSortCode(objA, objB) {
    if (objA.code.toLowerCase() > objB.code.toLowerCase())
        return 1;
    else if (objA.code.toLowerCase() < objB.code.toLowerCase())
        return -1;
    else
        return 0;
}

function SetDealerParameterEditable() {
    var quotationFrm = window.parent.quotationFrm;
    var canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter("AutoAdjustPoints"));
    window.document.all._AutoPointsText.disabled = !canEdit;
    window.document.all._IncreaseAutoPointsButton.disabled = !canEdit;
    window.document.all._DecreaseAutoPointsButton.disabled = !canEdit;
    window.document.all._AutoPointsAddButton.disabled = !canEdit;
    window.document.all._AutoPointsReplaceButton.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter("SpreadPoints"));
    window.document.all._SpreadText.disabled = !canEdit;
    window.document.all._IncreaseSpreadButton.disabled = !canEdit;
    window.document.all._DecreaseSpreadButton.disabled = !canEdit;
    window.document.all._SpreadAddButton.disabled = !canEdit;
    window.document.all._SpreadReplaceButton.disabled = !canEdit;
}

function OnQuoteChange(instrument,needRestoreBuySellLotColor) {
    if (_Instrument == null) return;
    if (instrument.id.toLowerCase() != _Instrument.id.toLowerCase()) return;
	
	var origin;
	if (_Instrument.originQuotation && _Instrument.originQuotation.origin)
	    origin = _Instrument.originQuotation.origin;
	if(!origin)
	{
	    if (_Instrument.lastQuotation && _Instrument.lastQuotation.origin)
	        origin = _Instrument.lastQuotation.origin;
	}
	if(!origin)	return;

	var quotePolicyDetails = (new VBArray(_Instrument.quotePolicyDetails.Items())).toArray();
	for(var line=quotePolicyGrid.FixedRows; line<quotePolicyGrid.Rows; line++)
	{
		var quotePolicyDetail = quotePolicyGrid.RowData(line);

		//		ChangeCellColor(quotePolicyGrid, line, _QuotePolicyGridColIndexs.Source, origin.ToString());
		
		//Remarked by Michael on 2008-08-12
		//var bid = origin.Add( quotePolicyDetail.autoAdjustPoints );
		//ChangeCellColor(quotePolicyGrid, line, _QuotePolicyGridColIndexs.Bid, bid.ToString());
		
	    //var ask = bid.Add( quotePolicyDetail.spreadPoints );
		//ChangeCellColor(quotePolicyGrid, line, _QuotePolicyGridColIndexs.Ask, ask.ToString());
		
		//Added by Michael on 2008-08-12
		var bid;
		var ask;
		if (quotePolicyDetail.priceType == PriceType.OriginEnable)
		{
		    bid = origin.Add( quotePolicyDetail.autoAdjustPoints );
			bid = bid.Add(0 - quotePolicyDetail.spreadPoints);

			var diffValue = _Instrument.GetSourceAskBidDiffValue();
			ask = bid.Add( Math.abs(diffValue) );
			ask = ask.Add(quotePolicyDetail.spreadPoints);
		}
		else
		{
			bid = origin.Add( quotePolicyDetail.autoAdjustPoints );
			ask = bid.Add( quotePolicyDetail.spreadPoints );
		}	
		ChangeCellColor(quotePolicyGrid, line, _QuotePolicyGridColIndexs.Bid, bid.ToString());
		ChangeCellColor(quotePolicyGrid, line, _QuotePolicyGridColIndexs.Ask, ask.ToString());

		if (needRestoreBuySellLotColor) {
		    col = _QuotePolicyGridColIndexs.BuyLot;
		    quotePolicyGrid.Cell(flexcpBackColor, line, col) = color_white;

		    col = _QuotePolicyGridColIndexs.SellLot;
		    quotePolicyGrid.Cell(flexcpBackColor, line, col) = color_white;
		}
	}
	if(window.timerID)
		window.clearTimeout(window.timerID);
	window.timerID = window.setTimeout(RestoreGridColor, 3000);
}

function ChangeCellColor(vsflexGrid, line, col, valueNew)
{
	var valueOld = vsflexGrid.TextMatrix(line, col);
	if(valueNew == valueOld)
		return;
		
	vsflexGrid.TextMatrix(line, col) = valueNew;
	if(valueNew > valueOld)
		vsflexGrid.Cell(flexcpForeColor, line, col) = color_blue;
	else if(valueNew < valueOld)
		vsflexGrid.Cell(flexcpForeColor, line, col) = color_red;
}

function RestoreGridColor()
{
	for(var line=quotePolicyGrid.FixedRows; line<quotePolicyGrid.Rows; line++)
	{
	    //		var col = _QuotePolicyGridColIndexs.Source;
//		quotePolicyGrid.Cell(flexcpForeColor, line, col) = color_black;
		var col = _QuotePolicyGridColIndexs.Bid;
		quotePolicyGrid.Cell(flexcpForeColor, line, col) = color_black;
		col = _QuotePolicyGridColIndexs.Ask;
		quotePolicyGrid.Cell(flexcpForeColor, line, col) = color_black;
	}
	window.timerID = null;
}

function OnQuotePolicyBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    var quotationFrm = window.parent.quotationFrm;
    var key = quotePolicyGrid.ColKey(newCol);
	switch(key)
	{
		case "AutoAdjustPoints":
		case "SpreadPoints":
		    //		case "IsOriginHiLo":
		    var canEdit = true; // (quotePolicyGrid.TextMatrix(newRow, _QuotePolicyGridColIndexs.PriceType) != "Watch Only");
		    if (!quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) canEdit = false;
		    quotePolicyGrid.Editable = (canEdit ? flexEDKbdMouse : flexEDNone);
		    break;
		//case "PriceType":
		//	var canEdit = (quotePolicyGrid.TextMatrix(newRow, _QuotePolicyGridColIndexs.PriceType) != "Watch Only"); 
		//	quotePolicyGrid.Editable = (canEdit ? flexEDKbdMouse : flexEDNone);
		//	break;
		default:
			quotePolicyGrid.Editable = flexEDNone;
			break;
	}
}

function OnQuotePolicyValidateEdit(row, col, cancel)
{
/*	switch(quotePolicyGrid.ColKey(col))
	{
		case "AutoAdjustPoints":
		case "SpreadPoints":
			var autoAdjustPoints;
			var spreadPoints;
			if(quotePolicyGrid.ColKey(col) == "AutoAdjustPoints")
			{
				autoAdjustPoints = parseInt( quotePolicyGrid.EditText );
				spreadPoints = parseInt( quotePolicyGrid.TextMatrix(row, _QuotePolicyGridColIndexs.SpreadPoints) );
			}
			else
			{
				autoAdjustPoints = parseInt( quotePolicyGrid.TextMatrix(row, _QuotePolicyGridColIndexs.AutoAdjustPoints) );
				spreadPoints = parseInt( quotePolicyGrid.EditText );
			}
			var bid = this.originQuote.Add( autoAdjustPoints );
			quotePolicyGrid.TextMatrix(row, _QuotePolicyGridColIndexs.Bid) = bid.ToString();

			var ask = bid.Add( spreadPoints );
			quotePolicyGrid.TextMatrix(row, _QuotePolicyGridColIndexs.Ask) = ask.ToString();
			break;
		default:
			break;
	}*/
    var newValue = quotePolicyGrid.EditText;
    var colKey = quotePolicyGrid.ColKey(col);
    switch (colKey)
	{
	    default:
	        {
	            var regexExpression;
	            if (colKey == "AutoAdjustPoints")
	                regexExpression = "(-?\\d+)";
	            else
	                regexExpression = "(\\d+)";
	            //Modified by Michael on 2005-04-11   will change
	            //regexExpression = "(\\d+\\.{0,1}\\d{0,})";

	            var regex = new RegExp(regexExpression, "i");
	            if (regex.exec(newValue) != null)
	                quotePolicyGrid.EditText = RegExp.$1;
	            else
	                quotePolicyGrid.EditText = quotePolicyGrid.TextMatrix(row, col);

	            var quotePolicyDetail = quotePolicyGrid.RowData(row);
	            if (quotePolicyDetail) {
	                if (colKey == "SpreadPoints") {
	                    var spreadPoints = parseInt(quotePolicyGrid.EditText);
	                    if (spreadPoints > quotePolicyDetail.maxSpreadPoints) {
	                        quotePolicyGrid.EditText = quotePolicyGrid.TextMatrix(row, col);
	                    }
	                }
	                
	                if (colKey == "AutoAdjustPoints") {
	                    var autoAdjustPoints = parseInt(quotePolicyGrid.EditText);
	                    if (autoAdjustPoints > quotePolicyDetail.maxAutoAdjustPoints) {
	                        quotePolicyGrid.EditText = quotePolicyGrid.TextMatrix(row, col);
	                    }
	                }
	            }
	        }
	        break;
	}
}

function OnQuotePolicyAfterEdit(row, col, cancel) {
//    var quotePolicyDetail = quotePolicyGrid.RowData(row);
//    if (quotePolicyDetail) {
//        switch (quotePolicyGrid.ColKey(col)) {
//            case "IsOriginHiLo":
//                var quotationFrm = window.parent.quotationFrm;
//                if (!quotationFrm.oDealingConsole.CanModifyDealerParameter("IsOriginHiLo")) {
//                    quotePolicyGrid.Cell(flexcpChecked, row, col) = (quotePolicyDetail.isOriginHiLo) ? flexChecked : flexUnchecked;
//                }
//                break;
//        }
//    }    
}

function ReplaceSpecialChar(str) {
    if (str == null) return str;
    str = str.replace(/&/g, "&amp;");
    return str;
}

function OnOk() {
    if (_Instrument == null) return;
    var quotationFrm = window.parent.quotationFrm;
    var quotePolicyXmls = "";
	for (var line = quotePolicyGrid.FixedRows; line < quotePolicyGrid.Rows; line++) {
	    var quotePolicyDetail = quotePolicyGrid.RowData(line);
	    if (quotePolicyDetail) {
	        var quotePolicyXml = "";
	        var objectIDs = "";
	        var eventMessage = "";
	        var instrumentCode = ReplaceSpecialChar(_Instrument.code);
	        var quotePolicyDetailCode = ReplaceSpecialChar(quotePolicyDetail.code);
	        var isSaveSpreadPoints = false;
	        var isSaveAutoAdjustPoints = false;
            var temp = parseInt(quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.SpreadPoints));
	        if (quotePolicyDetail.spreadPoints != temp) {
	            quotePolicyDetail.spreadPointsTemp = temp;
	            isSaveSpreadPoints = true;
	            //var eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetail.code + " " + _Instrument.code + " with spread = " + quotePolicyDetail.spreadPointsTemp; //  + " and autopoint = " + quotePolicyDetail.autoAdjustPoints;
	            //quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, _Instrument.code, "SpreadPoints", quotePolicyDetail.spreadPointsTemp, eventMessage);
	        }
	        temp = parseInt(quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.AutoAdjustPoints));
	        if (quotePolicyDetail.autoAdjustPoints != temp) {
	            quotePolicyDetail.autoAdjustPointsTemp = temp;
	            isSaveAutoAdjustPoints = true;
//	            var eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetail.code + " " + _Instrument.code + " with autopoint = " + quotePolicyDetail.autoAdjustPointsTemp;
//	            quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, _Instrument.code, "AutoAdjustPoints", quotePolicyDetail.autoAdjustPointsTemp, eventMessage);
	        }

	        if (isSaveSpreadPoints && !isSaveAutoAdjustPoints) {
	            objectIDs = "Spread";
	            eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetailCode + " " + instrumentCode + " with spread = " + quotePolicyDetail.spreadPointsTemp;
	        }
	        else if (!isSaveSpreadPoints && isSaveAutoAdjustPoints) {
	            objectIDs = "Autopoint";
	            eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetailCode + " " + instrumentCode + " with autopoint = " + quotePolicyDetail.autoAdjustPointsTemp;
	        }
	        else if (isSaveSpreadPoints && isSaveAutoAdjustPoints) {
	            objectIDs = "Spread and Autopoint";
	            eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetailCode + " " + instrumentCode + " with spread = " + quotePolicyDetail.spreadPointsTemp + " and autopoint = " + quotePolicyDetail.autoAdjustPointsTemp;
	        }
	        if (isSaveSpreadPoints || isSaveAutoAdjustPoints) {
	            quotePolicyXml = "<QuotePolicyDetail QuotePolicyID=\"" + quotePolicyDetail.quotePolicyID + "\" ";
	            quotePolicyXml += "InstrumentID=\"" + quotePolicyDetail.instrumentID + "\" ";
	            if (isSaveSpreadPoints) quotePolicyXml += "SpreadPoints" + "=\"" + quotePolicyDetail.spreadPointsTemp + "\" ";
	            if (isSaveAutoAdjustPoints) quotePolicyXml += "AutoAdjustPoints" + "=\"" + quotePolicyDetail.autoAdjustPointsTemp + "\" ";
	            quotePolicyXml += "ObjectIDs=\"" + objectIDs + "\" ";
	            quotePolicyXml += "InstrumentCode=\"" + instrumentCode + "\" ";
	            quotePolicyXml += "EventMessage=\"" + eventMessage + "\" ";
	            quotePolicyXml += ">";
	            quotePolicyXml += "</QuotePolicyDetail>";

	            quotePolicyXmls += quotePolicyXml;
	        }

//            quotationFrm.oDealingConsole.EnquiryManager.enquiryWindowManager.ChangedParametersByOuter(quotePolicyDetail);
	    }
	}
//	quotationFrm.OnQuotationQuotePolicyDetailChanged(_Instrument);
//	quotationFrm.OnPropertyInstrumentChanged(_Instrument);
	if (quotePolicyXmls != "") {
	    quotePolicyXmls = "<QuotePolicyDetails>" + quotePolicyXmls + "</QuotePolicyDetails>";
        quotationFrm.oIOProxy.SendQuotePolicyParameters(quotePolicyXmls, true);
    }
}

function OnOkOld() {
    if (_Instrument == null) return;
    var quotationFrm = window.parent.quotationFrm;
	for (var line = quotePolicyGrid.FixedRows; line < quotePolicyGrid.Rows; line++) {
	    var quotePolicyDetail = quotePolicyGrid.RowData(line);
	    if (quotePolicyDetail) {
	        var temp = parseInt(quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.SpreadPoints));
	        if (quotePolicyDetail.spreadPoints != temp) {
	            quotePolicyDetail.spreadPointsTemp = temp;
	            var eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetail.code + " " + _Instrument.code + " with spread = " + quotePolicyDetail.spreadPointsTemp; //  + " and autopoint = " + quotePolicyDetail.autoAdjustPoints;
	            quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, _Instrument.code, "SpreadPoints", quotePolicyDetail.spreadPointsTemp, eventMessage);
	        }
	        temp = parseInt(quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.AutoAdjustPoints));
	        if (quotePolicyDetail.autoAdjustPoints != temp) {
	            quotePolicyDetail.autoAdjustPointsTemp = temp;
	            var eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetail.code + " " + _Instrument.code + " with autopoint = " + quotePolicyDetail.autoAdjustPointsTemp;
	            quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, _Instrument.code, "AutoAdjustPoints", quotePolicyDetail.autoAdjustPointsTemp, eventMessage);
	        }

//	        var quotationFrm = window.parent.quotationFrm;
//	        if (!quotationFrm.oDealingConsole.CanModifyDealerParameter("IsOriginHiLo")) {
	        //	            quotePolicyGrid.Cell(flexcpChecked, line, _QuotePolicyGridColIndexs.IsOriginHiLo) = (quotePolicyDetail.isOriginHiLo) ? flexChecked : flexUnchecked;
//	        }
//	        else {
	        //	            temp = (quotePolicyGrid.Cell(flexcpChecked, line, _QuotePolicyGridColIndexs.IsOriginHiLo) == flexChecked) ? true : false;
//	            if (quotePolicyDetail.isOriginHiLo != temp) {
//	                quotePolicyDetail.isOriginHiLoTemp = temp;
	        //	                quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, _Instrument.code, "IsOriginHiLo", quotePolicyDetail.isOriginHiLoTemp, "");
//	            }
//	        }

	        //	        temp = PriceType.GetPriceTypeValue(quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.PriceType));
//	        if (quotePolicyDetail.priceType != temp) {
//	            var priceType2 = parseInt(temp);
//	            priceType2 = isNaN(priceType2) ? PriceType.Reference : priceType2;
//	            priceType2 = (priceType2 == PriceType.Watch) ? PriceType.Reference : priceType2;
//	            quotePolicyDetail.priceTypeTemp = priceType2;
	        //	            quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, _Instrument.code, "PriceType", quotePolicyDetail.priceTypeTemp, "");
//	        }

	        quotationFrm.oDealingConsole.EnquiryManager.enquiryWindowManager.ChangedParametersByOuter(quotePolicyDetail);
	    }
	}
	quotationFrm.OnQuotationQuotePolicyDetailChanged(_Instrument);
	quotationFrm.OnPropertyInstrumentChanged(_Instrument);

//    quotationFrm.oDealingConsole.EnquiryManager.enquiryWindowManager.ChangedParametersByOuter(quotePolicyDetail);
}

//Added by Michael on 2008-07-28
function onBlurEvent()
{
	window.document.all._AutoPointsText.value = CheckSetValue(window.document.all._AutoPointsText);
	window.document.all._SpreadText.value = CheckSetValue(window.document.all._SpreadText);
}

//Added by Michael on 2008-07-28
function CheckSetValue(control)
{
	var intValue = parseInt(control.value);
	return isNaN(intValue) ? "0" : intValue;
}

//Added by Michael on 2008-07-28
function AddPoints(colIndex,value,allowNegative)
{
    var addedPoints = parseInt(value); 
    if (isNaN(addedPoints))
    {
        addedPoints = 0;
    }
    if (addedPoints == 0) return;

    AddPointsRefreshUI(colIndex, addedPoints, allowNegative);
}

function AddPointsRefreshUI(colIndex, addedPoints, allowNegative) {
    for(var line=quotePolicyGrid.FixedRows; line<quotePolicyGrid.Rows; line++)
	{
	    //        var canEdit = (quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.PriceType) != "Watch Only");
//	    if (!canEdit) continue;
	    
	    var points = parseInt( quotePolicyGrid.TextMatrix(line, colIndex) );
	    if (isNaN(points))
	    {
	        points = 0;
	    }	    
	    
	    if ((addedPoints + points) < 0 && !allowNegative) continue;
	    
	    quotePolicyGrid.TextMatrix(line, colIndex) = addedPoints + points;
	}
}

//Added by Michael on 2008-07-28
function ReplacePoints(colIndex,value,allowNegative)
{
    var replacedPoints = parseInt(value); 
    if (isNaN(replacedPoints))
    {
        replacedPoints = 0;
    }
    
    if (replacedPoints < 0 && !allowNegative) return;
    
    for(var line=quotePolicyGrid.FixedRows; line<quotePolicyGrid.Rows; line++)
	{
	    //	    var canEdit = (quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.PriceType) != "Watch Only");
//	    if (!canEdit) continue;
	    
	    quotePolicyGrid.TextMatrix(line, colIndex) = replacedPoints;
	}
}

//Added by Michael on 2008-07-28
function AddAutoPoints()
{
    var colIndex = _QuotePolicyGridColIndexs.AutoAdjustPoints;
    AddPoints(colIndex,window.document.all._AutoPointsText.value,true);
}

//Added by Michael on 2008-07-28
function ReplaceAutoPoints()
{
    var colIndex = _QuotePolicyGridColIndexs.AutoAdjustPoints;
    ReplacePoints(colIndex,window.document.all._AutoPointsText.value,true);
}

//Added by Michael on 2008-07-28
function AddSpread()
{
    var colIndex = _QuotePolicyGridColIndexs.SpreadPoints;
    AddPoints(colIndex,window.document.all._SpreadText.value,false);
}

//Added by Michael on 2008-07-28
function ReplaceSpread()
{
    var colIndex = _QuotePolicyGridColIndexs.SpreadPoints;
    ReplacePoints(colIndex,window.document.all._SpreadText.value,false);
}

function AdjustPoints(line, colIndex, value, allowNegative) {
    var addedPoints = parseInt(value);
    if (isNaN(addedPoints)) {
        addedPoints = 0;
    }
    if (addedPoints == 0) return;

    //    var canEdit = (quotePolicyGrid.TextMatrix(line, _QuotePolicyGridColIndexs.PriceType) != "Watch Only");
//    if (!canEdit) return;

    var points = parseInt(quotePolicyGrid.TextMatrix(line, colIndex));
    if (isNaN(points)) {
        points = 0;
    }

    if ((addedPoints + points) < 0 && !allowNegative) return;

    quotePolicyGrid.TextMatrix(line, colIndex) = addedPoints + points;
}

function FilterKey2(theEvent) {
    if (theEvent.keyCode == 13) {
        OnQuotePolicyClick();
    }
}

function CanEdit(key,row) {
    var quotationFrm = window.parent.quotationFrm;
    var canEdit = true; // (quotePolicyGrid.TextMatrix(row, _QuotePolicyGridColIndexs.PriceType) != "Watch Only");
    if (!quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) canEdit = false;
    return canEdit;
}

function OnQuotePolicyClick() {
    var currentRow = quotePolicyGrid.Row;
    if (currentRow < quotePolicyGrid.FixedRows) return;
    var currentCol = quotePolicyGrid.Col;
    var numeratorUnit = _Instrument.numeratorUnit;
    var colIndex;
    if (currentCol == _QuotePolicyGridColIndexs.IncreaseSpreadPoints) {
        if (CanEdit("SpreadPoints", currentRow)) {
            colIndex = _QuotePolicyGridColIndexs.SpreadPoints;
            AdjustPoints(currentRow, colIndex, numeratorUnit, false);
        }
        quotePolicyGrid.Col = 0;
    }
    else if (currentCol == _QuotePolicyGridColIndexs.DecreaseSpreadPoints) {
        if (CanEdit("SpreadPoints", currentRow)) {
            colIndex = _QuotePolicyGridColIndexs.SpreadPoints;
            AdjustPoints(currentRow, colIndex, -numeratorUnit, false);
        }
        quotePolicyGrid.Col = 0;
    }
    else if (currentCol == _QuotePolicyGridColIndexs.IncreaseAutoAdjustPoints) {
        if (CanEdit("AutoAdjustPoints", currentRow)) {
            colIndex = _QuotePolicyGridColIndexs.AutoAdjustPoints;
            AdjustPoints(currentRow, colIndex, numeratorUnit, true);
        }
        quotePolicyGrid.Col = 0;
    }
    else if (currentCol == _QuotePolicyGridColIndexs.DecreaseAutoAdjustPoints) {
        if (CanEdit("AutoAdjustPoints", currentRow)) {
            colIndex = _QuotePolicyGridColIndexs.AutoAdjustPoints;
            AdjustPoints(currentRow, colIndex, -numeratorUnit, true);
        }
        quotePolicyGrid.Col = 0;
    }
}

function IncreaseAutoPoints() {
//    var points = parseInt(window.document.all._AutoPointsText.value);
//    if (isNaN(points) || points == 0) points = 0;
//    window.document.all._AutoPointsText.value = points + _Instrument.numeratorUnit;

    var colIndex = _QuotePolicyGridColIndexs.AutoAdjustPoints;
    AddPointsRefreshUI(colIndex, _Instrument.numeratorUnit, true);
}

function DecreaseAutoPoints() {
//    var points = parseInt(window.document.all._AutoPointsText.value);
//    if (isNaN(points)) points = 0;
//    window.document.all._AutoPointsText.value = points - _Instrument.numeratorUnit;

    var colIndex = _QuotePolicyGridColIndexs.AutoAdjustPoints;
    AddPointsRefreshUI(colIndex, 0 - _Instrument.numeratorUnit, true);
}

function IncreaseSpread() {
//    var points = parseInt(window.document.all._SpreadText.value);
//    if (isNaN(points)) points = 0;
//    var addedPoints = _Instrument.numeratorUnit;
//    //if ((points + addedPoints) < 0) return;
//    window.document.all._SpreadText.value = points + addedPoints;

    var colIndex = _QuotePolicyGridColIndexs.SpreadPoints;
    AddPointsRefreshUI(colIndex, _Instrument.numeratorUnit, false);
}

function DecreaseSpread() {
//    var points = parseInt(window.document.all._SpreadText.value);
//    if (isNaN(points)) points = 0;
//    var addedPoints = _Instrument.numeratorUnit;
//    //if ((points - addedPoints) < 0) return;
//    window.document.all._SpreadText.value = points - addedPoints;

    var colIndex = _QuotePolicyGridColIndexs.SpreadPoints;
    AddPointsRefreshUI(colIndex, 0 - _Instrument.numeratorUnit, false);
}