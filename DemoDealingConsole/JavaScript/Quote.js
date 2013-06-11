
var scanTimerId = null;
var instrumentEnquiryUnit = null;
var instrument = null;
var quotationFrm = null;

var instrumentEnquiryUnit2 = window.dialogArguments[1];
if(instrumentEnquiryUnit2 != null)
{
    if (instrumentEnquiryUnit2.instrument != null)
    {
        window.document.title = "QUOTE(" + instrumentEnquiryUnit2.instrument.code + ")";
    }
}
           
function OnLoad()
{
    window.ownerWindow = window.dialogArguments[0];
	window.ownerWindow.enquiryWindow = window;
	quotationFrm = window.ownerWindow.parent.quotationFrm;
	instrumentEnquiryUnit = window.dialogArguments[1];
	if(instrumentEnquiryUnit == null)
	{
		window.close();
		return;
	}
		
    EnquiryInit();
    
    quotationFrm.oDealingConsole.EnquiryManager.enquiryWindowManager.AddInstrumentEnquiryWindow(instrument.id,window);
}

function OnUnload()
{
    //because refresh main form will error, object was disposed    
    try
    {
        StopPriceTimer();
        
        quotationFrm.oDealingConsole.EnquiryManager.enquiryWindowManager.RemoveInstrumentEnquiryWindow(instrument.id);
        quotationFrm.oDealingConsole.EnquiryManager.Remove(instrument.id);
    }
    catch(e)
    {        
    }
}

function EnquiryInit()
{	
	var IsCustomerVisibleToDealer = dialogArguments[2];
	var lColIndex = 1;
	with (vsflexEnquiry)
	{
		//Fill ColKey
		Rows = 1;
		FixedRows = 1;
		FixedCols = 1;
		Cols = 9;
	    	    
		TextMatrix(0, lColIndex) = "Quote Policy";
		ColKey(lColIndex) = "QuotePolicy";
		ColWidth(lColIndex) = 1000;
		lColIndex ++;
	    
		TextMatrix(0, lColIndex) = "Auto Point";
		ColKey(lColIndex) = "AutoAdjustPoints";
		ColDataType(lColIndex) = flexDTLong;
		ColWidth(lColIndex) = 200;
		lColIndex ++;
	    
	    TextMatrix(0, lColIndex) = "Spread";
		ColKey(lColIndex) = "SpreadPoints";
		ColDataType(lColIndex) = flexDTLong;
		ColWidth(lColIndex) = 200;
		lColIndex ++;
		
	    TextMatrix(0, lColIndex) = "No. of query";
		ColKey(lColIndex) = "QueryCount";
		ColWidth(lColIndex) = 200;
		lColIndex ++;
		
		TextMatrix(0, lColIndex) = "Bid/Ask";
		ColKey(lColIndex) = "BidAsk";
		ColWidth(lColIndex) = 1200;
		lColIndex ++;
	    
		TextMatrix(0, lColIndex) = "Sell";
		ColKey(lColIndex) = "SellLot";
		ColWidth(lColIndex) = 200;
		lColIndex ++;
	    
		TextMatrix(0, lColIndex) = "Buy";
		ColKey(lColIndex) = "BuyLot";
		ColWidth(lColIndex) = 200;
		lColIndex ++;
	    
	    TextMatrix(0, lColIndex) = "Clients";
	    ColKey(lColIndex) = "CustomerCodes";
	    ColHidden(lColIndex) = !IsCustomerVisibleToDealer;
	    ColWidth(lColIndex) = 2500;
	    lColIndex ++;
	    
		ExtendLastCol = true;
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
		ExplorerBar = flexExSortAndMove;
		//Editable = flexEDKbdMouse;
		Editable = flexEDNone;
	}
		
	instrument = instrumentEnquiryUnit.instrument;
	
	window.document.title = "QUOTE(" + instrument.code + ")";
	LabelSource.innerText = "";
	if(instrument.lastQuotation)
	{
		LabelSource.innerText = (instrument.lastQuotation.origin!=null)?instrument.lastQuotation.origin.ToString():"";
		TextAdjust.value = LabelSource.innerText;
	}
	TextAdjust.focus();
	TextAdjust.select();
	
	var quotePolicyDetailEnquiries = (new VBArray(instrumentEnquiryUnit.quotePolicyDetailEnquiries.Items())).toArray();
	for(var index=0,count=quotePolicyDetailEnquiries.length;index<count;index++)
	{
		AddQuotePolicyDetailEnquiry(quotePolicyDetailEnquiries[index]);
	}
	
    FillFoot();
        
	vsflexEnquiry.AutoSize(0, vsflexEnquiry.Cols-1);
	
	OnPriceTimer();	
}

function FillFoot() {
    var quotationFrm = GetQuotationFrm();
    var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
    window.document.all.tdTotalQuery.innerText = instrumentEnquiryUnit.QueryCount();
    window.document.all.tdTotalSell.innerText = GetFormatLot2(instrumentEnquiryUnit.sumSellLots.toString(), false, lotDecimal);
    window.document.all.tdTotalBuy.innerText = GetFormatLot2(instrumentEnquiryUnit.sumBuyLots.toString(), false, lotDecimal);
}

function StopPriceTimer()
{
	if (scanTimerId != null) window.clearTimeout(scanTimerId);
}

function AddQuotePolicyDetailEnquiry(quotePolicyDetailEnquiry)
{
	vsflexEnquiry.AddItem("");
	var line = vsflexEnquiry.Rows-1;
		
	FillQuotePolicyDetailEnquiry(true, line, LabelSource.innerText, quotePolicyDetailEnquiry);
}

function RemoveQuotePolicyDetailEnquiry(quotePolicyDetailEnquiry)
{
	for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{
		var quotePolicyDetailEnquiry2 = vsflexEnquiry.RowData(line);
		if(quotePolicyDetailEnquiry2 == quotePolicyDetailEnquiry)
		{
			vsflexEnquiry.RemoveItem(line);
			break;
		}
	}
}

function OnEnquiryBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    var key = vsflexEnquiry.ColKey(newCol);
	switch(key)
	{
		case "AutoAdjustPoints":
		case "SpreadPoints":
		    vsflexEnquiry.Editable = (parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) ? flexEDKbdMouse : flexEDNone;
			break;
		default:
			vsflexEnquiry.Editable = flexEDNone;
			break;
	}
}

function GetXml(enquiry2s) {
    var oEnquiry = new Object();
    var sXml = null;
    var instrumentId = "";
    var instrumentCode = "";
    var eventMessages = "";
    for (var index in enquiry2s) {
        var enquiry2 = enquiry2s[index];
        if (!sXml) {
            instrumentId = enquiry2.instrument.id;
            instrumentCode = enquiry2.instrument.code;
            sXml = "<Instrument ID=\"" + enquiry2.instrument.id + "\"" +
				" Origin=\"" + enquiry2.origin + "\">";
        }
        sXml += "<Customer ID=\"" + enquiry2.customer.id + "\"" +
				" Ask=\"" + enquiry2.ask + "\"" +
				" Bid=\"" + enquiry2.bid + "\"" +
				" QuoteLot=\"" + enquiry2.sumLots().toString() +
				"\"/>";
        var eventMessage = "CustomerCode=" + enquiry2.customer.code
                + ",Instrument=" + enquiry2.instrument.code
                + ",Ask=" + enquiry2.ask
                + ",Bid=" + enquiry2.bid
                + ",QuoteLot=" + enquiry2.sumLots().toString();
        eventMessages += (eventMessages != "" ? ";\n" : "") + eventMessage;
    }
    if (sXml) {
        sXml += "</Instrument>";

        sXml = sXml.replace(/</g, "&lt;");
        sXml = sXml.replace(/>/g, "&gt;");
    }
    oEnquiry.instrumentId = instrumentId;
    oEnquiry.instrumentCode = instrumentCode;
    oEnquiry.eventMessages = eventMessages;
    oEnquiry.sXml = sXml;
    return oEnquiry;
}

function OnGridValidateEdit(row, col, cancel)
{
	var newValue = vsflexEnquiry.EditText;
	var colKey = vsflexEnquiry.ColKey(col);
	
	var regexExpression;	
	//if(colKey == instrumentColKey.AutoAdjustPoints)
		regexExpression = "(-?\\d+)";
	//else
	//	regexExpression = "(\\d+)";
		//Modified by Michael on 2005-04-11   will change
		//regexExpression = "(\\d+\\.{0,1}\\d{0,})";
	
	var regex = new RegExp(regexExpression,"i");
	if(regex.exec(newValue) != null)
		vsflexEnquiry.EditText = RegExp.$1;
	else
		vsflexEnquiry.EditText = vsflexEnquiry.TextMatrix(row, col);
}

function OnEnquiryAfterEdit(row, col)
{
    try
    {
        if (row < vsflexEnquiry.FixedRows) return;

        var quotePolicyDetailEnquiry = vsflexEnquiry.RowData(row);
        var quotePolicyDetail = quotePolicyDetailEnquiry.quotePolicyDetail;
        
        var key = vsflexEnquiry.ColKey(col);        
        switch(key)
	    {
	        case "SpreadPoints":
	            var newValue = parseInt(vsflexEnquiry.TextMatrix(row, col));
	            if (isNaN(newValue)) 
                {
                    alert("Please input integral numbers for Spread!");
                    vsflexEnquiry.TextMatrix(row, col) = "";
                    return;
                }
	            if (newValue > quotePolicyDetail.maxSpreadPoints) {
	                vsflexEnquiry.TextMatrix(row, col) = quotePolicyDetail.spreadPoints;
	            }
	            else {
	                quotePolicyDetail.spreadPointsTemp = newValue;
	                if (quotePolicyDetail.spreadPointsTemp != quotePolicyDetail.spreadPoints)
	                    quotationFrm.oIOProxy.SendQuotePolicyParam2(this, row, quotePolicyDetail, instrument.code, key, quotePolicyDetail.spreadPointsTemp);
	                else
	                    quotePolicyDetail.spreadPointsTemp = null;
	            }
	            break;
	        case "AutoAdjustPoints":
	            var newValue = parseInt(vsflexEnquiry.TextMatrix(row, col));
	            if (isNaN(newValue)) 
                {
                    alert("Please input integral numbers for Auto Point!");
                    vsflexEnquiry.TextMatrix(row, col) = "";
                    return;
                }
                if (newValue > quotePolicyDetail.maxAutoAdjustPoints) {
	                vsflexEnquiry.TextMatrix(row, col) = quotePolicyDetail.autoAdjustPoints;
	            }
	            else {
	                quotePolicyDetail.autoAdjustPointsTemp = newValue;
	                if (quotePolicyDetail.autoAdjustPointsTemp != quotePolicyDetail.autoAdjustPoints)
	                    quotationFrm.oIOProxy.SendQuotePolicyParam2(this, row, quotePolicyDetail, instrument.code, key, quotePolicyDetail.autoAdjustPointsTemp);
	                else
	                    quotePolicyDetail.autoAdjustPointsTemp = null;
	            }
                break;
        }
    }
    catch(e)
    {}
}

function SendQuotePolicyParam2Result(row)
{
    if (row < vsflexEnquiry.FixedRows) return;
    
    var quotePolicyDetailEnquiry = vsflexEnquiry.RowData(row);
    FillQuotePolicyDetailEnquiry(false, row, quotePolicyDetailEnquiry.origin, quotePolicyDetailEnquiry);
    SendEnquiryProcess(quotePolicyDetailEnquiry);
}

function SendEnquiryProcess(quotePolicyDetailEnquiry)
{
    var enquirys = new Array();
    if (quotePolicyDetailEnquiry.QueryCount() > 0)
    {
        var enquiries2 = (new VBArray(quotePolicyDetailEnquiry.enquiries.Items())).toArray();
        enquirys = enquirys.concat(enquiries2);
    }

    var oEnquiry = GetXml(enquirys);
    if (oEnquiry.sXml)
    {
        quotationFrm.oIOProxy.SendEnquiry2(oEnquiry.sXml, oEnquiry.instrumentId, oEnquiry.instrumentCode, oEnquiry.eventMessages);
    }
}

function ChangedParametersByOuter(quotePolicyDetail)    //return has updated
{
    if (quotePolicyDetail.instrumentID != instrument.id) return false;
    
    for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{
		var quotePolicyDetailEnquiry = vsflexEnquiry.RowData(line);
		if (quotePolicyDetail.quotePolicyID == quotePolicyDetailEnquiry.quotePolicyDetail.quotePolicyID)
		{
		    FillQuotePolicyDetailEnquiry(false, line, quotePolicyDetailEnquiry.origin, quotePolicyDetailEnquiry);
		    return true;
		}
    }
    return false;
}

//function OnQuotationKeyPressEdit(row, col, keyAscii)
function OnGridKeyDown(keyCode,shift)
{
/*
    if (vsflexEnquiry.Row < vsflexEnquiry.FixedRows) return;
    if (keyCode != 13) return;
     
    var key2 = vsflexEnquiry.ColKey(vsflexEnquiry.Col);
    switch(key2)
	{
		case "AutoAdjustPoints":
		case "SpreadPoints":		    
	        var points = parseInt(vsflexEnquiry.TextMatrix(vsflexEnquiry.Row, vsflexEnquiry.ColIndex(key2)));
            if (isNaN(points)) 
            {
                alert("Please input integral numbers for " + ((key2=="AutoAdjustPoints")?"Auto Point":"Spread") + "!");
                vsflexEnquiry.TextMatrix(vsflexEnquiry.Row, vsflexEnquiry.ColIndex(key2)) = "";
                return;
            }
            
	        var quotePolicyDetailEnquiry = vsflexEnquiry.RowData(vsflexEnquiry.Row);
		    FillQuotePolicyDetailEnquiry(false, vsflexEnquiry.Row, quotePolicyDetailEnquiry.origin, quotePolicyDetailEnquiry);
			
		     var enquirys = new Array();
		    if (quotePolicyDetailEnquiry.QueryCount() > 0)
            {
                var enquiries2 = (new VBArray(quotePolicyDetailEnquiry.enquiries.Items())).toArray();
                enquirys = enquirys.concat(enquiries2); 
            }
            var sXml = GetXml(enquirys);
            if (sXml)
            {
                quotationFrm.oIOProxy.SendEnquiry2(sXml);
            }
	    	break;
		default:			
			break;
	}
*/
}

function regInput(obj, reg, inputStr)
{
	var docSel = document.selection.createRange();
	if (docSel.parentElement().tagName != "INPUT") return false;
	oSel = docSel.duplicate();
	oSel.text = "";
	var srcRange = obj.createTextRange();
	oSel.setEndPoint("StartToStart", srcRange);
	var str = oSel.text + inputStr + srcRange.text.substr(oSel.text.length);
	return reg.test(str);
}

function OnEnquirySend()
{
	if(window.isProblematic)// || typeof(window.isProblematic)=="undefined")	//The input price is out of range.
	{
		TextAdjust.focus();
		TextAdjust.select();
	}
	else
	{
		var quotePolicyDetailEnquiries = new Array();
		for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
		{
			var quotePolicyDetailEnquiry = vsflexEnquiry.RowData(line);
			if(quotePolicyDetailEnquiry.origin && quotePolicyDetailEnquiry.bid && quotePolicyDetailEnquiry.ask)
			{
			    quotePolicyDetailEnquiries.push( quotePolicyDetailEnquiry ); 
			}
		}
		
		if(quotePolicyDetailEnquiries.length > 0)
		{
		    var enquirys = new Array();
		    
		    for(var index=0,count=quotePolicyDetailEnquiries.length;index<count;index++)
		    {
		        var quotePolicyDetailEnquiry = quotePolicyDetailEnquiries[index];
		        
		        if (quotePolicyDetailEnquiry.QueryCount() > 0)
		        {
		            var enquiries2 = (new VBArray(quotePolicyDetailEnquiry.enquiries.Items())).toArray();
		            enquirys = enquirys.concat(enquiries2); 
		        }
		    }
	        var oEnquiry = GetXml(enquirys);
	        if (oEnquiry.sXml) {
	            quotationFrm.oIOProxy.SendEnquiry2(oEnquiry.sXml, oEnquiry.instrumentId, oEnquiry.instrumentCode, oEnquiry.eventMessages);
	        }

		    TextAdjust.value = "";
		}
	}
}

function OnEnquiryAdjust()
{
	if(instrumentEnquiryUnit == null)
		return;
		
    var newValue = TextAdjust.value;
	var oldValue = LabelSource.innerText;
	if(oldValue)
	{
		var adjustPriceString = GetAdjustPrice(newValue, oldValue, instrument.numeratorUnit, instrument.denominator);
		var priceTemp = quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
		
		//Added by Michael on 2005-08-22
		window.isProblematic = false;
		if (priceTemp != null)
		{
			if (instrument.IsLimitedPriceByDailyMaxMove(priceTemp))
			{
				var sMsg = instrument.LimitedPriceByDailyMaxMovePrompt();
				window.showModalDialog("Alert.aspx", sMsg,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
				window.isProblematic=true;
				TextAdjust.focus();
				TextAdjust.select();
				return;
			}	
		}
		
		TextAdjust.value = (priceTemp == null)?"":priceTemp.ToString();
		if (!window.isProblematic) window.isProblematic = instrument.IsProblematic(priceTemp);
		
		if(window.isProblematic) {
		    var messageLanguage = quotationFrm.messageLanguage;
		    var args = new Array(messageLanguage["LMTProcessAlert"], messageLanguage["AlertAcceptButton"], messageLanguage["AlertRejectButton"]);
			window.isProblematic = !window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
		}
		if(!window.isProblematic)
			OnPriceChanged( TextAdjust.value );
		else
		{
			TextAdjust.focus();
			TextAdjust.select();
		}
	}
}

function OnPriceTimer()
{
    if(instrumentEnquiryUnit == null)
		return;
	
	try
	{	
	    if(instrument.lastQuotation)
	    {
	        var origin = (instrument.lastQuotation.origin!=null)?instrument.lastQuotation.origin.ToString():"";
	        if (origin==LabelSource.innerText)
	        {
	            scanTimerId = window.setTimeout("OnPriceTimer()", 1000);
	            return;
	        }
		    LabelSource.innerText = origin;
		    OnPriceChanged(LabelSource.innerText);
        }
    }
    catch(e)
    {}
    
    scanTimerId = window.setTimeout("OnPriceTimer()", 1000);
}

function OnPriceChanged(valueStr) {
    vsflexEnquiry.Redraw = false;
    for (var line = vsflexEnquiry.FixedRows; line < vsflexEnquiry.Rows; line++) {
        var quotePolicyDetailEnquiry = vsflexEnquiry.RowData(line);

        FillQuotePolicyDetailEnquiry(false, line, valueStr, quotePolicyDetailEnquiry);
    }
    vsflexEnquiry.Redraw = true;
}

function AddEnquiry(quotePolicyDetailEnquiry,enquiry)
{
    for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{	
	    var quotePolicyDetailEnquiry = vsflexEnquiry.RowData(line);
	    if (quotePolicyDetailEnquiry.quotePolicyDetail.code == quotePolicyDetailEnquiry.quotePolicyDetail.code) {
	        var quotationFrm = GetQuotationFrm();
	        var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
	        vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("CustomerCodes")) = quotePolicyDetailEnquiry.customerCodes;
            vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("QueryCount")) = quotePolicyDetailEnquiry.QueryCount();
            vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("SellLot")) = GetFormatLot2(quotePolicyDetailEnquiry.sumSellLots.toString(), false, lotDecimal);
            vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("BuyLot")) = GetFormatLot2(quotePolicyDetailEnquiry.sumBuyLots.toString(), false, lotDecimal);
            
            FillFoot();
            
	        return;
	    }
	}
	
    AddQuotePolicyDetailEnquiry(quotePolicyDetailEnquiry);
    FillFoot();
}

function RemoveEnquiry(quotePolicyDetailEnquiry,enquiry)
{
    for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{	
	    var quotePolicyDetailEnquiry = vsflexEnquiry.RowData(line);
	    if (quotePolicyDetailEnquiry.quotePolicyDetail.code == enquiry.quotePolicyDetail.code)
	    {
	        if (quotePolicyDetailEnquiry==null)
	        {
	            vsflexEnquiry.RemoveItem(line);
	            return;
	        }
	        else {
	            var quotationFrm = GetQuotationFrm();
	            var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
	            vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("CustomerCodes")) = quotePolicyDetailEnquiry.customerCodes;
                vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("QueryCount")) = quotePolicyDetailEnquiry.QueryCount();
                vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("SellLot")) = GetFormatLot2(quotePolicyDetailEnquiry.sumSellLots.toString(), false, lotDecimal);
                vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("BuyLot")) = GetFormatLot2(quotePolicyDetailEnquiry.sumBuyLots.toString(), false, lotDecimal);
            
                FillFoot();
            
                return;
	        }
	    }
	}
}

function FillQuotePolicyDetailEnquiry(isAdd, line, valueStr, quotePolicyDetailEnquiry)
{
    vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("CustomerCodes")) = quotePolicyDetailEnquiry.customerCodes;
    vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("QueryCount")) = quotePolicyDetailEnquiry.QueryCount();
    
    var quotePolicyDetail = quotePolicyDetailEnquiry.quotePolicyDetail;
	//if (isAdd)
	{
	    //vsflexEnquiry.Cell(flexcpForeColor, line,vsflexEnquiry.FixedCols,line,vsflexEnquiry.Cols-1) = enquiry.GetForColor();   
	    vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("QuotePolicy")) = quotePolicyDetail.code;			
        vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("AutoAdjustPoints")) = quotePolicyDetail.autoAdjustPoints;
        vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("SpreadPoints")) = quotePolicyDetail.spreadPoints;
	}
	
	var newPrice = quotationFrm.ObjectPool.GetPriceHelper(valueStr, instrument.numeratorUnit, instrument.denominator);	
	quotePolicyDetailEnquiry.Set_Origin((newPrice==null)?"":newPrice.ToString());
	
	var autoAdjustPoints = quotePolicyDetail.autoAdjustPoints;
	var spreadPoints = quotePolicyDetail.spreadPoints;
	/*
    var autoAdjustPoints = parseInt(vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("AutoAdjustPoints")));
    var spreadPoints = parseInt(vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("SpreadPoints")));
    
    if (isNaN(autoAdjustPoints))
    {
        alert("Please input integral numbers for Auto Point!");
	    vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("AutoAdjustPoints")) = "";
	    
	    return;
	}
	if (isNaN(spreadPoints))
	{
	    alert("Please input integral numbers for Spread!");
	    vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("SpreadPoints")) = "";
	    
	    return;
	}
	*/
	
	if (quotePolicyDetail.priceType == PriceType.Watch)
	{
		var diffValue = instrument.GetSourceAskBidDiffValue();
		
		var bid = newPrice;
		quotePolicyDetailEnquiry.Set_Bid(bid.ToString());
		
		var ask = bid.Add(diffValue);
		quotePolicyDetailEnquiry.Set_Ask(ask.ToString());
	}
	else if (quotePolicyDetail.priceType == PriceType.OriginEnable)
	{
	    var origin = quotationFrm.ObjectPool.GetCorrectPriceHelper(quotePolicyDetailEnquiry.origin, instrument.numeratorUnit, instrument.denominator);				
		
		var bid = origin.Add( autoAdjustPoints );
		
		quotePolicyDetailEnquiry.Set_Bid((bid.Add(0 - spreadPoints)).ToString());

		var diffValue = instrument.GetSourceAskBidDiffValue();
		var ask = bid.Add( Math.abs(diffValue) );
		quotePolicyDetailEnquiry.Set_Ask((ask.Add(spreadPoints)).ToString());
	}
	else
	{
		var bid = newPrice.Add( autoAdjustPoints );
		quotePolicyDetailEnquiry.Set_Bid(bid.ToString());

		var ask = bid.Add( spreadPoints );
		quotePolicyDetailEnquiry.Set_Ask(ask.ToString());
	}	
	vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("BidAsk")) = quotePolicyDetailEnquiry.bid + "/" + quotePolicyDetailEnquiry.ask;

	var quotationFrm = GetQuotationFrm();
	var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
	vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("SellLot")) = GetFormatLot2(quotePolicyDetailEnquiry.sumSellLots.toString(), false, lotDecimal);
	vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("BuyLot")) = GetFormatLot2(quotePolicyDetailEnquiry.sumBuyLots.toString(), false, lotDecimal);

	if (isAdd)
	{
	    vsflexEnquiry.RowData(line) = quotePolicyDetailEnquiry;	    
	}
}

function Onkeydown(altKey,keyCode)
{
	if (keyCode == 13 && window.event.srcElement.id == "TextAdjust")
	{	
	    OnEnquiryAdjust();
	    
        OnEnquirySend(); 
	 }
}