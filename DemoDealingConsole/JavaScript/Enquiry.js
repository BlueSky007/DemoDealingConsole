var lotAdjusted = false;
function EnquiryInit() {
    window.document.all._IncreaseNumeratorUnitPointText.style.backgroundColor = color_royalblue;
    window.document.all._DecreaseNumeratorUnitPointText.style.backgroundColor = color_indianred;

	var titleHeight = parseInt(window.dialogHeight) - oBodyEnquiry.clientHeight;
	window.dialogHeight = Table1.clientHeight+titleHeight+"px";
	window.dialogWidth = Table1.clientWidth+"px";
	window.dialogTop = (parseInt(window.screen.height) - Table1.clientHeight)/2 + "px"; 
	window.dialogLeft = (parseInt(window.screen.width) - Table1.clientWidth)/2 + "px"; 

	var w = btnSelectAll.style.width;
	var l = btnSelectAll.style.left;
	btnSimiliar.style.width = w;
	btnQuantity.style.width = w;
	btnClearAll.style.width = w;
	btnSend.style.width = w;
	btnCancel.style.width = w;
	btnUpdate.style.width = w;
	btnSimiliar.style.left = l;
	btnQuantity.style.left = l;
	btnClearAll.style.left = l;
	btnSend.style.left = l;
	btnCancel.style.left = l;
	btnUpdate.style.left = l;
	
	var IsCustomerVisibleToDealer = dialogArguments[2];
	var lColIndex = 0;
	with (vsflexEnquiry)
	{
		//Fill ColKey
		Rows = 1;
		FixedRows = 1;
		FixedCols = 0;
		Cols = 8;
	    
		TextMatrix(0, lColIndex) = "Select";
		ColKey(lColIndex) = "Select";
		ColWidth(lColIndex) = 800;
        ColDataType(lColIndex) = flexDTBoolean;
		lColIndex ++;
	    
		TextMatrix(0, lColIndex) = "Client";
		ColKey(lColIndex) = "ClientCode";
		ColHidden(lColIndex) = !IsCustomerVisibleToDealer;
		ColWidth(lColIndex) = 1000;
		lColIndex ++;
	    
	    TextMatrix(0, lColIndex) = "BS";
		ColKey(lColIndex) = "BSStatus";
		ColWidth(lColIndex) = 1000;
		lColIndex ++;
	    
		TextMatrix(0, lColIndex) = "QuotePolicy";
		ColKey(lColIndex) = "QuotePolicy";
		ColWidth(lColIndex) = 1000;
		lColIndex ++;
	    
		TextMatrix(0, lColIndex) = "Bid";
		ColKey(lColIndex) = "Bid";
		ColWidth(lColIndex) = 1000;
		lColIndex ++;
	    
		TextMatrix(0, lColIndex) = "Ask";
		ColKey(lColIndex) = "Ask";
		ColWidth(lColIndex) = 1000;
		lColIndex ++;

		TextMatrix(0, lColIndex) = "Enquire Lot";
		ColKey(lColIndex) = "Lot";
		ColWidth(lColIndex) = 1000;
		lColIndex++;

		TextMatrix(0, lColIndex) = "Answer Lot";
		ColKey(lColIndex) = "AnswerLot";
		ColWidth(lColIndex) = 200;
		lColIndex++;
	    
		ExtendLastCol = true;
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
		ExplorerBar = flexExSortAndMove;
		Editable = flexEDKbdMouse;
	}
	
	window.ownerWindow = window.dialogArguments[0];
	window.ownerWindow.enquiryWindow = window;
	
	var enquirys = window.dialogArguments[1];
	if(!enquirys || !enquirys.length)
		return;
		
	window.instrument = enquirys[0].instrument;
	LabelItem.innerText = instrument.code;
	LabelSource.innerText = "";
	if(instrument.lastQuotation)
	{
		LabelSource.innerText = (instrument.lastQuotation.origin!=null)?instrument.lastQuotation.origin.ToString():"";
		TextAdjust.value = LabelSource.innerText;
	}
	TextAdjust.focus();
	TextAdjust.select();

	var maxLot = 0;
	for(var index=0,count=enquirys.length;index<count;index++)
	{
	    var enquiry = enquirys[index];
	    AddEnquiry(enquirys[index]);
	    maxLot = maxLot > enquiry.lot ? maxLot : enquiry.lot;
	}
	LotText.value = maxLot.toString();
	
	vsflexEnquiry.AutoSize(0, vsflexEnquiry.Cols-1);
	//OnPriceChanged( LabelSource.innerText );
}

function AddEnquiry(enquiry)
{
	vsflexEnquiry.AddItem("");
	var line = vsflexEnquiry.Rows-1;	
	vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("ClientCode")) = enquiry.customer.code;
	vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("BSStatus")) = enquiry.GetBSStatusPrompt();
	vsflexEnquiry.Cell(flexcpForeColor, line,vsflexEnquiry.FixedCols,line,vsflexEnquiry.Cols-1) = enquiry.GetForColor();
	var instrument = enquiry.instrument;
	var quotePolicyID;
	if(instrument.quotePolicyDetails.Exists(enquiry.customer.privateQuotePolicyID) == true)
		quotePolicyID = enquiry.customer.privateQuotePolicyID;
	else if(instrument.quotePolicyDetails.Exists(enquiry.customer.publicQuotePolicyID) == true)
		quotePolicyID = enquiry.customer.publicQuotePolicyID;
	if(quotePolicyID)
	{
		var quotePolicyDetail = instrument.quotePolicyDetails.Item(quotePolicyID);
		if(quotePolicyDetail)
			vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("QuotePolicy")) = quotePolicyDetail.code;

		//var newPrice = new Price();
		//newPrice.Normalize(LabelSource.innerText, instrument.numeratorUnit, instrument.denominator);
		var newPrice = window.ownerWindow.parent.quotationFrm.ObjectPool.GetPriceHelper(LabelSource.innerText, instrument.numeratorUnit, instrument.denominator);
		
		enquiry.origin = (newPrice==null)?"":newPrice.ToString();

		//Modified by Michael on 2004-10-11
		//Old
		/*
		var bid = newPrice.Add( quotePolicyDetail.autoAdjustPoints );
		enquiry.bid = bid.ToString();
		vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("Bid")) = bid.ToString();

		var ask = bid.Add( quotePolicyDetail.spreadPoints );
		enquiry.ask = ask.ToString();		
		vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("Ask")) = ask.ToString();
		*/
		//New
		if (quotePolicyDetail.priceType == PriceType.Watch)
		{
			var diffValue = instrument.GetSourceAskBidDiffValue();
			
			var bid = newPrice;
			enquiry.bid = bid.ToString();
			
			var ask = bid.Add(diffValue);
			enquiry.ask = ask.ToString();
		}
		else if (quotePolicyDetail.priceType == PriceType.OriginEnable)
		{
			//var origin = new Price();
			//origin.Normalize(enquiry.origin, instrument.numeratorUnit, instrument.denominator);				
		    var origin = window.ownerWindow.parent.quotationFrm.ObjectPool.GetCorrectPriceHelper(enquiry.origin, instrument.numeratorUnit, instrument.denominator);				
			
			var bid = origin.Add( quotePolicyDetail.autoAdjustPoints );
			
			enquiry.bid = (bid.Add(0 - quotePolicyDetail.spreadPoints)).ToString();

			var diffValue = instrument.GetSourceAskBidDiffValue();
			var ask = bid.Add( Math.abs(diffValue) );
			enquiry.ask = (ask.Add(quotePolicyDetail.spreadPoints)).ToString();
		}
		else
		{
			var bid = newPrice.Add( quotePolicyDetail.autoAdjustPoints );
			enquiry.bid = bid.ToString();

			var ask = bid.Add( quotePolicyDetail.spreadPoints );
			enquiry.ask = ask.ToString();					
		}
		vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("Bid")) = enquiry.bid;
		vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("Ask")) = enquiry.ask;
	
		
	}
	vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("Lot")) = enquiry.lot;
	if (lotAdjusted && LotText.value != null) {
	    var answerLot = parseFloat(LotText.value);
	    if (enquiry.answerLot > answerLot) enquiry.answerLot = answerLot;
	}
	vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("AnswerLot")) = enquiry.answerLot;
	//Modified by Michael on 2006-05-12
	//if(line == vsflexEnquiry.FixedRows)
		vsflexEnquiry.Cell(flexcpChecked, line, vsflexEnquiry.ColIndex("Select")) = flexChecked;

	vsflexEnquiry.RowData(line) = enquiry;
	if (!lotAdjusted && LotText.value != null) {
	    var answerLot = parseFloat(LotText.value);
	    if (enquiry.answerLot > answerLot) LotText.value = enquiry.answerLot.toString();
	}
}

function RemoveEnquiry(enquiry)
{
	for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{
		var tempEnquiry = vsflexEnquiry.RowData(line);
		if(tempEnquiry == enquiry)
		{
		    vsflexEnquiry.RemoveItem(line);
		    if (!lotAdjusted && LotText.value != null) {
		        var answerLot = parseFloat(LotText.value);
		        var maxEnquireLot = this.GetMaxEnquireLot();
		        if (answerLot > maxEnquireLot) LotText.value = maxEnquireLot.toString();
		    }
			break;
		}
	}
}

function OnEnquiryBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)
{
	switch(vsflexEnquiry.ColKey(newCol))
	{
		case "Select":
			vsflexEnquiry.Editable = flexEDKbdMouse;
			break;
		default:
			vsflexEnquiry.Editable = flexEDNone;
			break;
	}
}

function OnEnquirySelectAll()
{
	for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{
		vsflexEnquiry.Cell(flexcpChecked, line, vsflexEnquiry.ColIndex("Select")) = flexChecked;
	}
}

function OnEnquirySimiliar()
{
	var colSelect = vsflexEnquiry.ColIndex("Select");
	var colQuotePolicy = vsflexEnquiry.ColIndex("QuotePolicy");
	for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{
		if(vsflexEnquiry.Cell(flexcpChecked, line, colSelect) == flexChecked)
		{
			for(var line2=vsflexEnquiry.FixedRows; line2<vsflexEnquiry.Rows; line2++)
			{
				if(vsflexEnquiry.Cell(flexcpChecked, line2, colSelect) != flexChecked)
				{
					if(vsflexEnquiry.TextMatrix(line2, colQuotePolicy) == vsflexEnquiry.TextMatrix(line, colQuotePolicy))
						vsflexEnquiry.Cell(flexcpChecked, line2, colSelect) = flexChecked;
				}
			}
		}
	}
}

function OnEnquiryQuantity()
{
	//Modified by Michael on 2005-04-08
	//var newValue = parseInt(TextLot.value);
	var newValue = parseFloat(TextLot.value);
	
	var isAbove = RadioAbove.checked;
	for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{
		var enquiry = vsflexEnquiry.RowData(line);
		var isSelected;
		if(isAbove == true)
			isSelected = (enquiry.lot >= newValue) ? flexChecked : flexUnchecked;
		else
			isSelected = (enquiry.lot <= newValue) ? flexChecked : flexUnchecked;
		vsflexEnquiry.Cell(flexcpChecked, line, vsflexEnquiry.ColIndex("Select")) = isSelected;
	}
}

function OnEnquiryClearAll()
{
	for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{
		vsflexEnquiry.Cell(flexcpChecked, line, vsflexEnquiry.ColIndex("Select")) = flexUnchecked;
	}
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
		window.returnValue = new Array();
		var colSelect = vsflexEnquiry.ColIndex("Select");
		for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
		{
			if(vsflexEnquiry.Cell(flexcpChecked, line, colSelect) == flexChecked)
			{
				var enquiry = vsflexEnquiry.RowData(line);
				if(enquiry.origin && enquiry.bid && enquiry.ask)
					window.returnValue.push( enquiry ); 
			}
		}
		if(window.returnValue.length)
			window.close();
	}
}

function OnEnquiryCancel()
{
	window.ownerWindow.enquiryWindow = null;
	window.close();
}

function OnEnquiryUpdate()
{
	var enquiry = vsflexEnquiry.RowData(vsflexEnquiry.FixedRows);
	var instrument = enquiry.instrument;
	if(instrument.lastQuotation)
	{
		LabelSource.innerText = (instrument.lastQuotation.origin!=null)?instrument.lastQuotation.origin.ToString():"";
		OnPriceChanged( LabelSource.innerText );
	}
}

function OnLotAdjust() {
    if (LotText.value == null) return;
    
    lotAdjusted = true;

    var answerLot = parseFloat(LotText.value);
    var maxEnquireLot = this.GetMaxEnquireLot();
    if (answerLot >= maxEnquireLot) {
        LotText.value = maxEnquireLot.toString();
        return;
    }
    
    var enquirys = window.dialogArguments[1];
    for (var line = vsflexEnquiry.FixedRows; line < vsflexEnquiry.Rows; line++) {
        var enquiry = vsflexEnquiry.RowData(line);
        if (enquiry.lot > answerLot) {
            enquiry.answerLot = answerLot;
            vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("AnswerLot")) = enquiry.answerLot;
        }
    }
}

function GetMaxEnquireLot() {
    var maxLot = 0;
    for (var line = vsflexEnquiry.FixedRows; line < vsflexEnquiry.Rows; line++) {
        var tempEnquiry = vsflexEnquiry.RowData(line);
        maxLot = tempEnquiry.lot > maxLot ? tempEnquiry.lot : maxLot;
    }
    return maxLot;
}

function IncreaseNumeratorUnitPointText_OnClick() {
    AdjustNumeratorUnitPoint(true);
    OnEnquiryAdjust();
}

function DecreaseNumeratorUnitPointText_OnClick() {
    AdjustNumeratorUnitPoint(false);
    OnEnquiryAdjust();
}

function AdjustNumeratorUnitPoint(isIncrease) {
    var enquiry = vsflexEnquiry.RowData(vsflexEnquiry.FixedRows);
    var instrument = enquiry.instrument;
    var quotationFrm = window.ownerWindow.parent.quotationFrm;
    var adjustPriceString = GetAdjustPrice(TextAdjust.value, TextAdjust.value, instrument.numeratorUnit, instrument.denominator);
    var adjustPrice = quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
    if (adjustPrice != null) {
        var points = isIncrease ? instrument.numeratorUnit : -instrument.numeratorUnit;
        adjustPrice = adjustPrice.Add(points);
    }
    if (adjustPrice != null) {
        TextAdjust.value = adjustPrice.ToString();
    }
}

function OnEnquiryAdjust()
{
	var enquiry = vsflexEnquiry.RowData(vsflexEnquiry.FixedRows);
	var instrument = enquiry.instrument;
	var newValue = TextAdjust.value;
	var oldValue = LabelSource.innerText;
	if(oldValue)
	{
		var quotationFrm = window.ownerWindow.parent.quotationFrm;
		var adjustPriceString = GetAdjustPrice(newValue, oldValue, instrument.numeratorUnit, instrument.denominator);
		//var priceTemp = new Price();
		//priceTemp.Normalize(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
		var priceTemp = quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
		
		//Added by Michael on 2005-08-22
		window.isProblematic = false;
		if (priceTemp != null)
		{
			//window.isProblematic = instrument.IsLimitedPriceByDailyMaxMove(priceTemp);
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
		
		if(window.isProblematic)
		{
			var args = new Array("Out of Range, accept the price?", "Accept", "Reject");
			window.isProblematic = !window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
		}
		
		if (!window.isProblematic) {
		    OnPriceChanged(TextAdjust.value);
		}
		else {
		    TextAdjust.focus();
		    TextAdjust.select();
		}
	}
}

function OnPriceChanged(valueStr)
{
	var newPrice;
	for(var line=vsflexEnquiry.FixedRows; line<vsflexEnquiry.Rows; line++)
	{
		var enquiry = vsflexEnquiry.RowData(line);
		var instrument = enquiry.instrument;
		var quotePolicyID;
		if(instrument.quotePolicyDetails.Exists(enquiry.customer.privateQuotePolicyID) == true)
			quotePolicyID = enquiry.customer.privateQuotePolicyID;
		else if(instrument.quotePolicyDetails.Exists(enquiry.customer.publicQuotePolicyID) == true)
			quotePolicyID = enquiry.customer.publicQuotePolicyID;
		if(!quotePolicyID)
			continue;
		var quotePolicyDetail = instrument.quotePolicyDetails.Item(quotePolicyID);
		
		if(!newPrice)
		{
			//newPrice = new Price();
			//newPrice.Normalize(valueStr, instrument.numeratorUnit, instrument.denominator);
			newPrice = window.ownerWindow.parent.quotationFrm.ObjectPool.GetPriceHelper(valueStr, instrument.numeratorUnit, instrument.denominator);
			
		}
		enquiry.origin = (newPrice==null)?"":newPrice.ToString();

		//Modified by Michael on 2004-10-11
		//Old
		/*
		var bid = newPrice.Add( quotePolicyDetail.autoAdjustPoints );
		enquiry.bid = bid.ToString();
		vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("Bid")) = bid.ToString();

	    var ask = bid.Add( quotePolicyDetail.spreadPoints );
		enquiry.ask = ask.ToString();
		vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("Ask")) = ask.ToString();
		*/
		if (quotePolicyDetail.priceType == PriceType.Watch)
		{
			var diffValue = instrument.GetSourceAskBidDiffValue();
			
			var bid = newPrice;
			enquiry.bid = bid.ToString();
			
			var ask = bid.Add(diffValue);
			enquiry.ask = ask.ToString();
		}
		else if (quotePolicyDetail.priceType == PriceType.OriginEnable)
		{
			//var origin = new Price();
			//origin.Normalize(enquiry.origin, instrument.numeratorUnit, instrument.denominator);				
		    var origin = window.ownerWindow.parent.quotationFrm.ObjectPool.GetCorrectPriceHelper(enquiry.origin, instrument.numeratorUnit, instrument.denominator);				
			
			var bid = origin.Add( quotePolicyDetail.autoAdjustPoints );
			
			enquiry.bid = (bid.Add(0 - quotePolicyDetail.spreadPoints)).ToString();

			var diffValue = instrument.GetSourceAskBidDiffValue();
			var ask = bid.Add( Math.abs(diffValue) );
			enquiry.ask = (ask.Add(quotePolicyDetail.spreadPoints)).ToString();
		}
		else
		{
			var bid = newPrice.Add( quotePolicyDetail.autoAdjustPoints );
			enquiry.bid = bid.ToString();

			var ask = bid.Add( quotePolicyDetail.spreadPoints );
			enquiry.ask = ask.ToString();
		}	
		vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("Bid")) = enquiry.bid;
		vsflexEnquiry.TextMatrix(line, vsflexEnquiry.ColIndex("Ask")) = enquiry.ask;		
	}
}