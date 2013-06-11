
var QuotationTaskInited = false;
var timerID = null;

//Added Michael on 2005-06-30
function QuotationTaskInit()
{
	with (vsflexQuotationTask)
	{
		FixedRows = 1;
		FixedCols = 0;
		Rows = 1;
		Cols = 16;
		FrozenCols = 3;
		
		var quotationFrm = window.parent.quotationFrm;
		var quotationTaskGridColKey = quotationFrm.quotationTaskGridColKey;
		var quotationTaskGridLanguage = quotationFrm.quotationTaskGridLanguage;
		   
		var parameter = quotationFrm.oDealingConsole.InitGrid(window.vsflexQuotationTask,quotationFrm.optionGrid.QuotationTaskGrid,quotationTaskGridLanguage);
		if (parameter == "") GridColumnsDefaultFormatForQuotationTask(window.vsflexQuotationTask,quotationTaskGridColKey);
		
		var columnIndex = ColIndex(quotationTaskGridColKey.Time);
		ColFormat(columnIndex) = "HH:mm:ss";
			
		ExtendLastCol = false;
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
		ExplorerBar = flexExMove;
		SelectionMode = flexSelectionFree;
		ColAlignment(ColIndex("Bid")) = flexAlignCenterCenter;
		ColAlignment(ColIndex("Ask")) = flexAlignCenterCenter;

		hideFocus = true;

		MergeCells = flexMergeFree;
		MergeRow(0) = true;
	}
  
    _QuotationTaskGridColIndexs = new QuotationTaskGridColIndexs();
	QuotationTaskInited = true;
}

//Added Michael on 2005-06-30
function GridColumnsDefaultFormatForQuotationTask(grid,gridColKey)
{
	with (grid) {
	    ColWidth(ColIndex(gridColKey.QuotationButtonA)) = 600;
	    ColWidth(ColIndex(gridColKey.QuotationButtonB)) = 600;
	    ColWidth(ColIndex(gridColKey.QuotationButtonC)) = 600;
	    ColWidth(ColIndex(gridColKey.QuotationButtonD)) = 600;
		ColWidth(ColIndex(gridColKey.Quotation)) = 2000;
		ColWidth(ColIndex(gridColKey.Item)) = 1000; 
		ColWidth(ColIndex(gridColKey.Time)) = 1100;
		ColWidth(ColIndex(gridColKey.Count)) = 650;
		ColWidth(ColIndex(gridColKey.Source)) = 980;
		ColWidth(ColIndex(gridColKey.Last)) = 980;
		ColWidth(ColIndex(gridColKey.Diff)) = 980;
		ColWidth(ColIndex(gridColKey.Bid)) = 980;
		ColWidth(ColIndex(gridColKey.Ask)) = 980;
		ColWidth(ColIndex(gridColKey.Lot)) = 600;
		ColWidth(ColIndex(gridColKey.ClientCode)) = 980;
	}
}

function OnQuotationTaskGridAfterMoveColumn(col, position) {
    _QuotationTaskGridColIndexs = new QuotationTaskGridColIndexs();
}

function QuotationTaskGridFontChanged() {
    _QuotationTaskGridColIndexs = new QuotationTaskGridColIndexs();
}

var _QuotationTaskGridColIndexs = null;
function QuotationTaskGridColIndexs() {
    this.QuotationButtonA = vsflexQuotationTask.ColIndex("QuotationButtonA");
    this.QuotationButtonB = vsflexQuotationTask.ColIndex("QuotationButtonB");
    this.QuotationButtonC = vsflexQuotationTask.ColIndex("QuotationButtonC");
    this.QuotationButtonD = vsflexQuotationTask.ColIndex("QuotationButtonD");
    this.Quotation = vsflexQuotationTask.ColIndex("Quotation");
    this.Item = vsflexQuotationTask.ColIndex("Item");
    this.Time = vsflexQuotationTask.ColIndex("Time");
    this.Count = vsflexQuotationTask.ColIndex("Count");
    this.Source = vsflexQuotationTask.ColIndex("Source");
    this.Last = vsflexQuotationTask.ColIndex("Last");
    this.Diff = vsflexQuotationTask.ColIndex("Diff");
    this.Bid = vsflexQuotationTask.ColIndex("Bid");
    this.Ask = vsflexQuotationTask.ColIndex("Ask");
    this.Lot = vsflexQuotationTask.ColIndex("Lot");
    this.ClientCode = vsflexQuotationTask.ColIndex("ClientCode");
    this.Key = vsflexQuotationTask.ColIndex("Key");
}

function OnUnload()
{
}

function OnQuoteTaskAfterRowColChange(oldRow, oldCol, newRow, newCol)
{
	//if(oldRow != newRow)
	{
	    ShowQuoteCellButtons(vsflexQuotationTask.Row,true);
	}
}

function OnQuoteUpdateButtons(isMust,needRedraw)
{
	with(parent.quotationTaskFrm)
	{
		if(oPopup.isOpen || isMust)
		{
		    ShowQuoteCellButtons(vsflexQuotationTask.Row, needRedraw);
		}
	}
}

//function OnSwitch(line) {
//    var vsflexGrid = vsflexQuotationTask;
//    vsflexGrid.Redraw = false;
//    var quotationFrm = parent.quotationFrm;

//    if (line >= vsflexGrid.FixedRows) {
//        var data = vsflexGrid.RowData(line);
//        if (data && data.object && (data.type == QuoteTaskType.Inactive)) {
//            var instrument = data.object;
//            //instrument.SwitchToManualWay();
//            /*instrument.dqQuoteMinLotTemp = 1;
//            if(instrument.dqQuoteMinLotTemp != instrument.dqQuoteMinLot)
//            {
//            //quotationFrm.oIOProxy.SendInstrumentParam(instrument, "DQQuoteMinLot", instrument.dqQuoteMinLotTemp,false,true,true);
//            //Modified by Michael on 2005-09-08
//            instrument.dqQuoteMinLot = 1;
//            }	
//            else
//            instrument.dqQuoteMinLotTemp = null;

//            instrument.autoDQMaxLotTemp = 0;
//            if(instrument.autoDQMaxLotTemp != instrument.autoDQMaxLot)
//            {
//            //quotationFrm.oIOProxy.SendInstrumentParam(instrument, "AutoDQMaxLot", instrument.autoDQMaxLotTemp,false,true,true);
//            //Modified by Michael on 2005-09-08
//            instrument.autoDQMaxLot = 0;
//            }	
//            else
//            instrument.autoDQMaxLotTemp = null;

//            instrument.autoLmtMktMaxLotTemp = 0;
//            if(instrument.autoLmtMktMaxLotTemp != instrument.autoLmtMktMaxLot)
//            {
//            //quotationFrm.oIOProxy.SendInstrumentParam(instrument, "AutoLmtMktMaxLot", instrument.autoLmtMktMaxLotTemp,false,true,true);
//            //Modified by Michael on 2005-09-08
//            instrument.autoLmtMktMaxLot = 0;
//            }	
//            else				
//            instrument.autoLmtMktMaxLotTemp = null;

//            //Added by Michael on 2005-11-22
//            var instrumentXmls = "<Instruments>";
//            var instrumentXml = "";
//            instrumentXml += "<Instrument ID=\"" + instrument.id + "\" ";
//            instrumentXml += "DQQuoteMinLot=\"1.0\" ";
//            instrumentXml += "AutoDQMaxLot=\"0.0\" ";
//            //instrumentXml += "AutoLmtMktMaxLot=\"0.0\" ";
//            instrumentXml += "/>";
//            instrumentXmls += instrumentXml;
//            instrumentXmls += "</Instruments>";			
//            quotationFrm.oIOProxy.UpdateInstrument2(instrumentXmls);*/

//            //instrument.priceType = PriceType.Reference;
//            var quotePolicyDetails = (new VBArray(instrument.quotePolicyDetails.Items())).toArray();
//            for (var index = 0, count = quotePolicyDetails.length; index < count; index++) {
//                var quotePolicyDetail = quotePolicyDetails[index];
//                //quotePolicyDetails.priceType = PriceType.Reference;

//                //Remarked by Michael on 2008-08-14
//                //quotePolicyDetail.priceTypeTemp = PriceType.Reference;
//                //Modified by Michael on 2008-08-14
//                if (quotePolicyDetail.priceTypeTemp != null && quotePolicyDetail.priceTypeTemp != quotePolicyDetail.priceType) {
//                    var priceType2 = parseInt(quotePolicyDetail.priceTypeTemp);
//                    priceType2 = isNaN(priceType2) ? PriceType.Reference : priceType2;
//                    priceType2 = (priceType2 == PriceType.Watch) ? PriceType.Reference : priceType2;
//                    quotePolicyDetail.priceTypeTemp = priceType2;
//                    quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, "PriceType", quotePolicyDetail.priceTypeTemp, "");
//                }
//                else
//                    quotePolicyDetail.priceTypeTemp = null;
//            }

//            //quotationFrm.UpdateProperties(line,false,needRedraw);
//            quotationFrm.OnQuotationPropertiesChanged(instrument, false);
//            if (quotationFrm.oCurrentInstrumentID == instrument.id) quotationFrm.OnPropertyInstrumentChanged(instrument);

//            vsflexGrid.RemoveItem(line);
//            OnQuoteUpdateButtons(true);
//        }
//    }
//    vsflexGrid.Redraw = true;
//}

//function OnIgnore(line) {
//    var vsflexGrid = vsflexQuotationTask;
//    vsflexGrid.Redraw = false;
//    if (line >= vsflexGrid.FixedRows) {
//        var data = vsflexGrid.RowData(line);
//        if (data && data.object && (data.type == QuoteTaskType.Inactive)) {
//            vsflexGrid.RemoveItem(line);
//            OnQuoteUpdateButtons(true);

//            var instrument = data.object;
//            instrument.lastOriginActiveTime = instrument.mainWindow.oSystemTime;
//        }
//    }
//    vsflexGrid.Redraw = true;
//}

function OnAccept(line) {
    var vsflexGrid = vsflexQuotationTask;
    vsflexGrid.Redraw = false;
    if (line >= vsflexGrid.FixedRows) {
        var data = vsflexGrid.RowData(line);
        if (data && data.object && (data.type == QuoteTaskType.OutOfRange)) {
            vsflexGrid.RemoveItem(line);
            OnQuoteUpdateButtons(true,false);

            var instrument = data.object;
            instrument.isOutOfRange = false;
            instrument.CalculateAllOverrideQuotation(true, true);
        }
    }
    vsflexGrid.Redraw = true;
}

function OnDiscard(line) {
    var vsflexGrid = vsflexQuotationTask;
    vsflexGrid.Redraw = false;
    if (line >= vsflexGrid.FixedRows) {
        var data = vsflexGrid.RowData(line);
        if (data && data.object && (data.type == QuoteTaskType.OutOfRange)) {
            vsflexGrid.RemoveItem(line);
            OnQuoteUpdateButtons(true,false);
            var instrument = data.object;
            instrument.DiscardOriginQuotation();
        }
    }
    vsflexGrid.Redraw = true;
}

function OnAbandon(line) {
    var vsflexGrid = vsflexQuotationTask;
    vsflexGrid.Redraw = false;
    if (line >= vsflexGrid.FixedRows) {
        var data = vsflexGrid.RowData(line);
        if (data && data.object && (data.type == QuoteTaskType.Enquiry)) {
            vsflexGrid.RemoveItem(line);
            OnQuoteUpdateButtons(true,false);
        }
    }
    vsflexGrid.Redraw = true;
}

function OnUpdate(line) {
    var vsflexGrid = vsflexQuotationTask;
    vsflexGrid.Redraw = false;
    if (line >= vsflexGrid.FixedRows) {
        var data = vsflexGrid.RowData(line);
        if (data && data.object && (data.type == QuoteTaskType.Enquiry)) {
            var enquiry = data.object[0];
            var instrument = enquiry.instrument;

            //Modified by Michael on 2004-12-31
            /*
            if(instrument.lastQuotation)
            {
            if(instrument.lastQuotation.origin)
            vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Source) = instrument.lastQuotation.origin.ToString();
            if(instrument.lastQuotation.bid)
            vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Bid) = instrument.lastQuotation.bid.ToString();
            if(instrument.lastQuotation.ask)
            vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Ask) = instrument.lastQuotation.ask.ToString();
            }
            */
            if (instrument.overrideQuotation) {
                if (instrument.overrideQuotation.origin)
                    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Source) = instrument.overrideQuotation.origin.ToString();
                if (instrument.overrideQuotation.bid)
                    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Bid) = instrument.overrideQuotation.bid.ToString();
                if (instrument.overrideQuotation.ask)
                    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Ask) = instrument.overrideQuotation.ask.ToString();
            }
        }
    }
    vsflexGrid.Redraw = true;
}

function OnModify(line)
{
	var quotationFrm = parent.quotationFrm;
	var vsflexGrid = vsflexQuotationTask;

	if(line >= vsflexGrid.FixedRows)
	{
		oPopup.hide(); 
		var data = vsflexGrid.RowData(line);
		if(data && data.object && (data.type == QuoteTaskType.Enquiry))
		{
			vsflexGrid.RemoveItem(line);

			var args = new Array();
			args.push(window);
			args.push(data.object);
			args.push(quotationFrm.IsCustomerVisibleToDealer);
			var outArg = window.showModalDialog("Enquiry.aspx",args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:450px;dialogHeight:300px");
			if(outArg)
			{
				var enquirys = outArg;
				quotationFrm.oIOProxy.SendEnquiry(enquirys);
			}
			else
			{
				window.focus();
				vsflexGrid.focus();
			}
			
			OnQuoteUpdateButtons(true,true);
		}
	}
}

function OnSend(line)
{
	var vsflexGrid = vsflexQuotationTask;
	var quotationFrm = window.parent.quotationFrm;

	if(line >= vsflexGrid.FixedRows)
	{
		var data = vsflexGrid.RowData(line);
		if(data && data.object && (data.type == QuoteTaskType.Enquiry))
		{
			var priceSource = vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Source);
			if(line < vsflexGrid.Rows)
				vsflexGrid.RemoveItem(line);
			if(!priceSource)	return;
			
			var priceOrigin;
			var enquirys = data.object;
			for(var index in enquirys)
			{
				var enquiry = enquirys[index];
				var instrument = enquiry.instrument;
				var quotePolicyID;
				if(instrument.quotePolicyDetails.Exists(enquiry.customer.privateQuotePolicyID) == true)
					quotePolicyID = enquiry.customer.privateQuotePolicyID;
				else if(instrument.quotePolicyDetails.Exists(enquiry.customer.publicQuotePolicyID) == true)
					quotePolicyID = enquiry.customer.publicQuotePolicyID;
				if(!quotePolicyID)
					continue;
				var quotePolicyDetail = instrument.quotePolicyDetails.Item(quotePolicyID);
				
				if(!priceOrigin)
				{
					//priceOrigin = new Price();
					//priceOrigin.Normalize(priceSource, instrument.numeratorUnit, instrument.denominator);
				    priceOrigin = quotationFrm.ObjectPool.GetCorrectPriceHelper(priceSource, instrument.numeratorUnit, instrument.denominator);
					
					var isProblematic = instrument.IsProblematic(priceOrigin);
					if(isProblematic) {
					    var messageLanguage = window.parent.quotationFrm.messageLanguage;
					    var args = new Array(messageLanguage["LMTProcessAlert"], messageLanguage["AlertAcceptButton"], messageLanguage["AlertRejectButton"]);
						isProblematic = !window.showModalDialog("Confirm.aspx", args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
					}
					if(isProblematic)
						return;
				}
				enquiry.origin = priceOrigin.ToString();

				//Modified by Michael on 2004-10-11
				//Old
				/*
				var bid = priceOrigin.Add( quotePolicyDetail.autoAdjustPoints );
				enquiry.bid = bid.ToString();

				var ask = bid.Add( quotePolicyDetail.spreadPoints );
				enquiry.ask = ask.ToString();
				*/
				
				//New
				if (quotePolicyDetail.priceType == PriceType.Watch)
				{
					var diffValue = instrument.GetSourceAskBidDiffValue();
					
					var bid = priceOrigin;
					enquiry.bid = bid.ToString();

					var ask = bid.Add( diffValue );
					enquiry.ask = ask.ToString();
				}				
				else if (quotePolicyDetail.priceType == PriceType.OriginEnable)
				{
				    var origin = quotationFrm.ObjectPool.GetCorrectPriceHelper(enquiry.origin, instrument.numeratorUnit, instrument.denominator);
					//var origin = new Price();
					//origin.Normalize(enquiry.origin, instrument.numeratorUnit, instrument.denominator);				
					var bid = origin.Add( quotePolicyDetail.autoAdjustPoints );
					
					enquiry.bid = (bid.Add(0 - quotePolicyDetail.spreadPoints)).ToString();
	
					var diffValue = instrument.GetSourceAskBidDiffValue();
					var ask = bid.Add( Math.abs(diffValue) );
					enquiry.ask = (ask.Add(quotePolicyDetail.spreadPoints)).ToString();
				}
				else
				{
					var bid = priceOrigin.Add( quotePolicyDetail.autoAdjustPoints );
					enquiry.bid = bid.ToString();

					var ask = bid.Add( quotePolicyDetail.spreadPoints );
					enquiry.ask = ask.ToString();
				}
				
				
			}
			quotationFrm.oIOProxy.SendEnquiry(enquirys);

			OnQuoteUpdateButtons(true,true);
		}
	}
}

//function AddTaskInactive(instrument)
//{
	/*var vsflexGrid = vsflexQuotationTask;
	var count = vsflexGrid.Rows;
	var quotationFrm = window.parent.quotationFrm;
	for(var line=vsflexGrid.FixedRows; line<count; line++)
	{
		var dataTemp = vsflexGrid.RowData(line);
		if(dataTemp.type == QuoteTaskType.Inactive && dataTemp.object == instrument)	//alerting dealer now
			return;
	}
	
	vsflexGrid.AddItem("");
	//line = vsflexGrid.Rows - 1;
	line = count;
	
	vsflexGrid.RowHeight(line) = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.QuotationTaskGrid);
	
	vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Quotation) = QuoteTaskType.Inactive;
	vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Item) = instrument.code;
	vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Time) = GetDateTimeString(quotationFrm.oSystemTime,"DateTime");//.getVarDate();
	vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Count) = quotationFrm.oInactiveWaitTime.toString();

	SetRowForeColor(vsflexGrid, line, color_darkcyan);
	
	var data = new DataOfRow(QuoteTaskType.Inactive, null,null, instrument);
	vsflexGrid.RowData(line) = data;

	OnQuoteUpdateButtons(false);*/

//    //Notify user with sound
//    var quotationFrm = window.parent.quotationFrm;
//	quotationFrm.oDealingConsole.PlaySound(SoundOption.Inactive);
//}

function AddTaskOutOfRange(instrument) {
	instrument.isOutOfRange = true;
	var vsflexGrid = vsflexQuotationTask;
	var quotationFrm = window.parent.quotationFrm;
	var commonLanguage = quotationFrm.commonLanguage;
	with (vsflexGrid) {
	    Redraw = false;
		var line = FindRow(QuoteTaskType.OutOfRange + instrument.id, FixedRows, _QuotationTaskGridColIndexs.Key, true, true);
		if (line <= 0) {
            line = Rows;
			AddItem("");
			RowHeight(line) = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.QuotationTaskGrid);
		}        TextMatrix(line, _QuotationTaskGridColIndexs.Key) = QuoteTaskType.OutOfRange + instrument.id;
        TextMatrix(line, _QuotationTaskGridColIndexs.Quotation) = commonLanguage["OutOfRange"]; //QuoteTaskType.OutOfRange;
		TextMatrix(line, _QuotationTaskGridColIndexs.Item) = instrument.code;
		TextMatrix(line, _QuotationTaskGridColIndexs.Time) = GetDateTimeString(quotationFrm.oSystemTime, "DateTime"); //.getVarDate();
		TextMatrix(line, _QuotationTaskGridColIndexs.Count) = instrument.alertWaitTime;//parent.quotationFrm.oOutOfRangeWaitTime.toString();
		TextMatrix(line, _QuotationTaskGridColIndexs.Source) = (instrument.originQuotation.origin!=null)?instrument.originQuotation.origin.ToString():"";
		TextMatrix(line, _QuotationTaskGridColIndexs.Last) = (instrument.lastQuotation.origin!=null)?instrument.lastQuotation.origin.ToString():"";
		var diff = (instrument.originQuotation.origin!=null)?instrument.originQuotation.origin.SubStract( instrument.lastQuotation.origin ):0;
		TextMatrix(line, _QuotationTaskGridColIndexs.Diff) = (diff==null)?"":diff.toString();
		if(instrument.originQuotation.bid != null)
			TextMatrix(line, _QuotationTaskGridColIndexs.Bid) = " " + instrument.originQuotation.bid.ToString();
		if(instrument.originQuotation.ask != null)
			TextMatrix(line, _QuotationTaskGridColIndexs.Ask) = instrument.originQuotation.ask.ToString();
		
		SetRowForeColor(vsflexGrid, line, color_darkblue);
		
		var oData = new DataOfRow(QuoteTaskType.OutOfRange, null,null, instrument);
		RowData(line) = oData;
        ShowQuoteCellButtons(line,false);
		Redraw = true;
	}
	//Notify user with sound
	quotationFrm.oDealingConsole.PlaySound(SoundOption.OutOfRange);
}

function AddTaskEnquiry(enquiry) {
	var vsflexGrid = vsflexQuotationTask;
	var quotationFrm = window.parent.quotationFrm;
	var commonLanguage = quotationFrm.commonLanguage;
	var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
	var line = vsflexGrid.FindRow(QuoteTaskType.Enquiry + enquiry.instrumentID, vsflexGrid.FixedRows, _QuotationTaskGridColIndexs.Key, true, true);
	if (line > 0) {
	    var dataTemp = vsflexGrid.RowData(line);
	    enquiry.tick = quotationFrm.oEnquiryWaitTime;

	    var isExist = false;
	    for (var index = 0, count = dataTemp.object.length; index < count; index++) {
	        var enquiry2 = dataTemp.object[index];
	        if (enquiry2.customerID == enquiry.customerID) {
	            enquiry2 = enquiry; //.tick = quotationFrm.oEnquiryWaitTime;
	            isExist = true;
	            break;
	        }
	    }
	    if (!isExist) {
	        dataTemp.object.push(enquiry);
	    }
	    vsflexGrid.Redraw = false;
	    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Count) = quotationFrm.oEnquiryWaitTime.toString();
	    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Lot) = GetFormatLot2(SumEnquiryLots(dataTemp.object).toString(), true, lotDecimal);

	    if (quotationFrm.IsCustomerVisibleToDealer) {
	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.ClientCode) = enquiry.customer.code;
	    }
	    vsflexGrid.Redraw = true;
	}
	else {
	    vsflexGrid.Redraw = false;
	    var instrument = enquiry.instrument;
	    var line = vsflexGrid.Rows;
	    vsflexGrid.AddItem("");
	    vsflexGrid.RowHeight(line) = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.QuotationTaskGrid);

	    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Key) = QuoteTaskType.Enquiry + enquiry.instrument.id;
	    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Quotation) = commonLanguage["Enquiry"]; //QuoteTaskType.Enquiry;
	    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Item) = enquiry.instrument.code;
	    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Time) = GetDateTimeString(quotationFrm.oSystemTime, "DateTime"); //.getVarDate();
	    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Count) = quotationFrm.oEnquiryWaitTime.toString();
	    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Lot) = GetFormatLot2(enquiry.lot.toString(), true, lotDecimal);
	    if (quotationFrm.IsCustomerVisibleToDealer) {
	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.ClientCode) = enquiry.customer.code;
	    }

	    if (instrument.overrideQuotation) {
	        if (instrument.overrideQuotation.origin)
	            vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Source) = instrument.overrideQuotation.origin.ToString();
	        if (instrument.overrideQuotation.bid)
	            vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Bid) = instrument.overrideQuotation.bid.ToString();
	        if (instrument.overrideQuotation.ask)
	            vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Ask) = instrument.overrideQuotation.ask.ToString();
	    }

	    SetRowForeColor(vsflexGrid, line, color_darkgreen);

	    enquiry.tick = quotationFrm.oEnquiryWaitTime;
	    var enquirys = new Array();
	    enquirys.push(enquiry);
	    /*if(window.enquiryWindow && 
	    window.enquiryWindow.instrument == enquiry.instrument)
	    window.enquiryWindow.AddEnquiry(enquiry);*/
	    var data = new DataOfRow(QuoteTaskType.Enquiry, null, null, enquirys);
	    vsflexGrid.RowData(line) = data;

	    //OnQuoteUpdateButtons(false);
	    ShowQuoteCellButtons(line,false);
	    vsflexGrid.Redraw = true;
	}
	//Notify user with sound
	quotationFrm.oDealingConsole.PlaySound(SoundOption.Enquiry);
}

function SumEnquiryLots(enquirys)
{
    var lots = 0;
    for (var index = 0, iCount = enquirys.length; index < iCount; index++) {
        lots += enquirys[index].lot;
    }
	return lots;
}

function TaskCountTimer() {
    var instrument = null;
    var lotDecimal = window.parent.quotationFrm.oDealingConsole.LotDecimal;
    var vsflexGrid = vsflexQuotationTask;
    vsflexGrid.Redraw = false;
    var count = vsflexGrid.Rows;
    for (var line = count - 1, fRows = vsflexGrid.FixedRows; line >= fRows; line--) {
        var data = vsflexGrid.RowData(line);
        if (data && data.object) {            
            if (data.type == QuoteTaskType.OutOfRange) {
                instrument = data.object;
                if (instrument.isDealerInput)
                    continue;
            }
            else if (data.type == QuoteTaskType.Enquiry) {
                var enquirys = data.object;
                for (var index = enquirys.length - 1; index >= 0; index--) {
                    var enquiry = enquirys[index];
                    enquiry.tick--;
                    if (enquiry.tick <= 0)	//The enquiry is timeout, so remove it
                    {
                        enquirys.splice(index, 1);
                    }
                }

                vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Lot) = GetFormatLot2(SumEnquiryLots(enquirys).toString(), true, lotDecimal);
            }
            else if (data.type == QuoteTaskType.Enquiry2) {
                var instrumentEnquiryUnit = data.object;
                vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Lot) = GetFormatLot2(instrumentEnquiryUnit.sumLots().toString(), true, lotDecimal);
            }
        }

//        var col = _QuotationTaskGridColIndexs.Count;
        //var countStr = vsflexGrid.TextMatrix(line, col);
        //var countInt = parseInt(countStr) - 1;
        var countInt = vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Count) - 1;
        if (countInt > 0) {
            vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Count) = countInt; //.toString();
        }
        else {
            if (data.type == QuoteTaskType.OutOfRange) {
                if (instrument) {
                    instrument.DiscardTaskCountTimerTimeoutWriteLog();
                    instrument.ResetOriginQuotation();
                }
            }
//            else if (data.type == QuoteTaskType.Inactive) {
//                OnSwitch(line);
//                continue;
//            }
            vsflexGrid.RemoveItem(line);

            OnQuoteUpdateButtons(false,false);
        }
    }
    vsflexGrid.Redraw = true;
}

//function RemoveTaskInactive(instrument) {
//    var vsflexGrid = vsflexQuotationTask;
//    vsflexGrid.Redraw = false;
//    var count = vsflexGrid.Rows;
//    for (var line = vsflexGrid.FixedRows; line < count; line++) {
//        var dataTemp = vsflexGrid.RowData(line);
//        if (dataTemp.type == QuoteTaskType.Inactive && dataTemp.object == instrument)	//alerting dealer now
//        {
//            vsflexGrid.RemoveItem(line);
//            break;
//        }
//    }
//    vsflexGrid.Redraw = true;
//}

function RemoveTaskOutOfRange(instrument) {
    var vsflexGrid = vsflexQuotationTask;
//    vsflexGrid.Redraw = false;
    var line = vsflexGrid.FindRow(QuoteTaskType.OutOfRange + instrument.id, vsflexGrid.FixedRows, _QuotationTaskGridColIndexs.Key, true, true);
    if (line > 0) {
        vsflexGrid.RemoveItem(line);
        instrument.isOutOfRange = false;
    }
//    vsflexGrid.Redraw = true;
}

//function RemoveTaskEnquiry(enquiry) {
//    var vsflexGrid = vsflexQuotationTask;
//    vsflexGrid.Redraw = false;
//    var line = vsflexGrid.FindRow(QuoteTaskType.Enquiry + enquiry.instrument.id, vsflexGrid.FixedRows, _QuotationTaskGridColIndexs.Key, true, true);
//    if (line > 0) {
//        vsflexGrid.RemoveItem(line);
//    }
//    vsflexGrid.Redraw = true;
//}

//new Quote
function GetEnquiryWindowManager()
{
//alert(parent.quotationFrm);
//alert(parent.quotationFrm.oDealingConsole.EnquiryManager);
    return parent.quotationFrm.oDealingConsole.EnquiryManager.enquiryWindowManager;
}

function OnModify2(line)
{
	var quotationFrm = parent.quotationFrm;
	var vsflexGrid = vsflexQuotationTask;

	if(line >= vsflexGrid.FixedRows)
	{
		oPopup.hide(); 
		var data = vsflexGrid.RowData(line);
		if(data && data.object && (data.type == QuoteTaskType.Enquiry2))
		{
			vsflexGrid.RemoveItem(line);
            
			var args = new Array();
			args.push(window);
			args.push(data.object);
			args.push(quotationFrm.IsCustomerVisibleToDealer);
			
			var instrumentEnquiryWindow = GetEnquiryWindowManager().GetInstrumentEnquiryWindow(data.object.instrument.id);
			if (instrumentEnquiryWindow != null)
			{
			    if (!instrumentEnquiryWindow.closed)
		        {
		            instrumentEnquiryWindow.close();
		        }
			}
			//showModelessDialog,showModalDialog
			window.showModelessDialog("Quote.aspx",args,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:615px;dialogHeight:355px");
		}
	}
}

function AddTaskEnquiry2(instrumentEnquiryUnit, quotePolicyDetailEnquiry, enquiry) {
    var isExistsInstrumentEnquiryWindow = false;
    var instrumentEnquiryWindow = GetEnquiryWindowManager().GetInstrumentEnquiryWindow(enquiry.instrumentID);
    if (instrumentEnquiryWindow != null)
    {
        if (!instrumentEnquiryWindow.closed)
        {
            isExistsInstrumentEnquiryWindow = true;
        }
    }
    if (isExistsInstrumentEnquiryWindow)
    {
        instrumentEnquiryWindow.AddEnquiry(quotePolicyDetailEnquiry,enquiry);
    }
    else
    {
        var vsflexGrid = vsflexQuotationTask;
        var quotationFrm = window.parent.quotationFrm;
        var commonLanguage = quotationFrm.commonLanguage;
	    var lotDecimal = quotationFrm.oDealingConsole.LotDecimal;
	    var line = vsflexGrid.FindRow(QuoteTaskType.Enquiry2 + instrumentEnquiryUnit.instrument.id, vsflexGrid.FixedRows, _QuotationTaskGridColIndexs.Key, true, true);
	    if (line > 0)	//alerting dealer now
	    {
	        //???
	        //enquiry.tick = quotationFrm.oEnquiryWaitTime;
	        vsflexGrid.Redraw = false;
	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Count) = instrumentEnquiryUnit.Get_Tick().toString();   //quotationFrm.oEnquiryWaitTime.toString();
	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Lot) = GetFormatLot2(instrumentEnquiryUnit.sumLots().toString(), true, lotDecimal);

	        if (quotationFrm.IsCustomerVisibleToDealer)
	            vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.ClientCode) = enquiry.customer.code;
	        vsflexGrid.Redraw = true;
	    }
	    else {
	        vsflexGrid.Redraw = false;
	        var instrument = enquiry.instrument;
	        var line = vsflexGrid.Rows;
	        vsflexGrid.AddItem("");
	        vsflexGrid.RowHeight(line) = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.QuotationTaskGrid);

	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Key) = QuoteTaskType.Enquiry2 + enquiry.instrument.id;
	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Quotation) = commonLanguage["Enquiry2"];//  QuoteTaskType.Enquiry2;
	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Item) = enquiry.instrument.code;
	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Time) = GetDateTimeString(quotationFrm.oSystemTime, "DateTime"); //.getVarDate();
	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Count) = instrumentEnquiryUnit.Get_Tick().toString();   //quotationFrm.oEnquiryWaitTime.toString();
	        vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Lot) = GetFormatLot2(instrumentEnquiryUnit.sumLots().toString(), true, lotDecimal);
	        if (quotationFrm.IsCustomerVisibleToDealer)
	            vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.ClientCode) = enquiry.customer.code;

	        if (instrument.overrideQuotation) {
	            if (instrument.overrideQuotation.origin)
	                vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Source) = instrument.overrideQuotation.origin.ToString();
	            if (instrument.overrideQuotation.bid)
	                vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Bid) = instrument.overrideQuotation.bid.ToString();
	            if (instrument.overrideQuotation.ask)
	                vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Ask) = instrument.overrideQuotation.ask.ToString();
	        }

	        SetRowForeColor(vsflexGrid, line, color_darkgreen);

	        //???
	        //enquiry.tick = quotationFrm.oEnquiryWaitTime;

	        var data = new DataOfRow(QuoteTaskType.Enquiry2, null, null, instrumentEnquiryUnit);
	        vsflexGrid.RowData(line) = data;
	        OnQuoteUpdateButtons(false,false);
	        vsflexGrid.Redraw = true;
	    }
	}
	//Notify user with sound
	window.parent.quotationFrm.oDealingConsole.PlaySound(SoundOption.Enquiry);
}

function RemoveTaskEnquiry2(instrumentEnquiryUnit, quotePolicyDetailEnquiry, enquiry) {
    var isExistsInstrumentEnquiryWindow = false;
    var instrumentEnquiryWindow = GetEnquiryWindowManager().GetInstrumentEnquiryWindow(enquiry.instrumentID);
    if (instrumentEnquiryWindow != null) {
        if (!instrumentEnquiryWindow.closed) {
            isExistsInstrumentEnquiryWindow = true;
        }
    }

    if (isExistsInstrumentEnquiryWindow) {
        if (instrumentEnquiryUnit == null) {
            instrumentEnquiryWindow.close();
        }
        else {
            instrumentEnquiryWindow.RemoveEnquiry(quotePolicyDetailEnquiry, enquiry);
        }
    }

    //else
    {
        var vsflexGrid = vsflexQuotationTask;
        vsflexGrid.Redraw = false;
        var instrumentID = (instrumentEnquiryUnit == null) ? enquiry.instrumentID : instrumentEnquiryUnit.instrument.id;
        var line = vsflexGrid.FindRow(QuoteTaskType.Enquiry2 + instrumentID, vsflexGrid.FixedRows, _QuotationTaskGridColIndexs.Key, true, true); //alerting dealer now
        if (line > 0) {
            if (instrumentEnquiryUnit == null) {
                vsflexGrid.RemoveItem(line);
            }
            else {
                vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Count) = instrumentEnquiryUnit.Get_Tick().toString();
                vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.Lot) = GetFormatLot2(instrumentEnquiryUnit.sumLots().toString(), true, window.parent.quotationFrm.oDealingConsole.LotDecimal);

                if (window.parent.quotationFrm.IsCustomerVisibleToDealer)
                    vsflexGrid.TextMatrix(line, _QuotationTaskGridColIndexs.ClientCode) = ""; //enquiry.customer.code;	
            }
        }
        vsflexGrid.Redraw = true;
    }
}
