
function PropertyInit()
{
	flexPropertyInit();
}
	
//Added Michael on 2005-06-30
function flexPropertyInit()
{
	with (vsFlexProperites)
	{
		Rows = 42;
		FixedRows = 1;
		FixedCols = 1;
		Cols = 2;
		    
		TextMatrix(0, 0) = "Name";
		ColKey(0) = "PropertyKey";
		ColWidth(0) = 2000;
		    
		TextMatrix(0, 1) = "Value";
		ColKey(1) = "PropertyValue";
		ColWidth(1) = 2000;
		    
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
		ExplorerBar = flexExNone;
		//Editable = flexEDKbdMouse;
		Editable = flexEDNone;
	}
	
	var quotationFrm = window.parent.quotationFrm;
	var colsArrangements = quotationFrm.oColsArrangements;
	var instrumentPropertyColKey = quotationFrm.instrumentPropertyColKey;
	var instrumentPropertyLanguage = quotationFrm.instrumentPropertyLanguage; 
	
	var parameter = quotationFrm.oDealingConsole.InitGridForSingleRecord(window.vsFlexProperites,quotationFrm.optionGrid.QuotationGrid,instrumentPropertyLanguage);
	
	/*
	var index;
	var propName;
	if (colsArrangements && colsArrangements.length > 0)
	{
		with (vsFlexProperites)
		{
			for(index=0; index<colsArrangements.length; index++)
			{
				propName = colsArrangements[index];
				for (prop in instrumentPropertyColKey)
				{
					if (prop == propName)
					{
						AddItem(instrumentPropertyLanguage[prop]);
						RowData(Rows - 1) = prop;	//ColKey
						RowHidden(Rows - 1) = false;
						break;
					}
				}
			}
			for (prop in instrumentPropertyColKey)
			{
				var isExists = false;
				for(index=0; index<colsArrangements.length; index++)
				{
					propName = colsArrangements[index];
					if (prop == propName)
					{
						isExists = true;
						break;	
					}
				}
				if (isExists == false)
				{
					AddItem(instrumentPropertyLanguage[prop]);
					RowData(Rows - 1) = prop;	//ColKey
					RowHidden(Rows - 1) = true;
				}
			}
		}
	}
	else
	{
		with (vsFlexProperites)
		{			
			for (prop in instrumentPropertyColKey)
			{
				AddItem(instrumentPropertyLanguage[prop]);
				RowData(Rows - 1) = prop;	//ColKey
				RowHidden(Rows - 1) = false;
			}
		}
	}
	*/
}

function OnPropertyBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {    
	var instrumentPropertyColKey = parent.quotationFrm.instrumentPropertyColKey;
	var priceTypeRow = -1;
	with (vsFlexProperites)
	{
		for (var i = FixedRows;i < Rows; i++)
		{
			if (vsFlexProperites.RowData(i) ==	instrumentPropertyColKey.PriceType)
			{
				priceTypeRow = i;
				break;	
			}	
		}
	}
	if (priceTypeRow == -1) return;
	//Modified by Michael on 2004-10-11
	//var canEdit = (vsFlexProperites.TextMatrix(priceTypeRow, 1) != "Watch Only");
	//vsFlexProperites.Editable = (canEdit ? flexEDKbdMouse : flexEDNone);
	if (newRow == -1) return;
	var key = vsFlexProperites.RowData(newRow);
	switch(key) {
	    case instrumentPropertyColKey.MaxSpreadPoints:
		case instrumentPropertyColKey.SpreadPoints:
		case instrumentPropertyColKey.SpreadPoints2:
		case instrumentPropertyColKey.SpreadPoints3:
		case instrumentPropertyColKey.SpreadPoints4:
		case instrumentPropertyColKey.MaxAutoAdjustPoints:
		case instrumentPropertyColKey.AutoAdjustPoints:
		case instrumentPropertyColKey.AutoAdjustPoints2:
		case instrumentPropertyColKey.AutoAdjustPoints3:
		case instrumentPropertyColKey.AutoAdjustPoints4:
		case instrumentPropertyColKey.IsOriginHiLo:
		case instrumentPropertyColKey.PriceType:
		case instrumentPropertyColKey.OriginType:
		case instrumentPropertyColKey.AllowedSpotTradeOrderSides:
		    var canEdit = (vsFlexProperites.TextMatrix(priceTypeRow, 1) != "Watch Only");
		    if (!parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) canEdit = false;
		    vsFlexProperites.Editable = (canEdit ? flexEDKbdMouse : flexEDNone);
		    break;
		default:
		    vsFlexProperites.Editable = (parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) ? flexEDKbdMouse : flexEDNone;
			break;
	}
}

function OnProperitesValidateEdit(row, col, cancel) {
    var instrumentPropertyColKey = parent.quotationFrm.instrumentPropertyColKey;
	var newValue = vsFlexProperites.EditText;
	var rowDataValue = vsFlexProperites.RowData(row);
	//switch(vsFlexProperites.TextMatrix(row, 0))
	switch(rowDataValue)
	{
		case instrumentPropertyColKey.SpreadPoints2:
		case instrumentPropertyColKey.SpreadPoints3:
		case instrumentPropertyColKey.SpreadPoints4:
		case instrumentPropertyColKey.AutoAdjustPoints2:
		case instrumentPropertyColKey.AutoAdjustPoints3:
		case instrumentPropertyColKey.AutoAdjustPoints4:
			//Require modify
			/*
			var regexExpression = "(\\d+)";
			var regex = new RegExp(regexExpression,"i");
			if(regex.exec(newValue) != null)			
				vsFlexProperites.EditText = RegExp.$1;
			else
				vsFlexProperites.EditText = vsFlexProperites.TextMatrix(row, col);
			*/	
			vsFlexProperites.EditText = newValue;
			break;        case instrumentPropertyColKey.MaxDQLot:
        case instrumentPropertyColKey.MaxOtherLot:
        case instrumentPropertyColKey.DQQuoteMinLot:
        case instrumentPropertyColKey.AutoDQMaxLot:
        case instrumentPropertyColKey.AutoLmtMktMaxLot:
        case instrumentPropertyColKey.AutoAcceptMaxLot:
        case instrumentPropertyColKey.AutoCancelMaxLot:
            var regexExpression = "(\\d+((\\.\\d{1})|))"; //"(\\d+\\.{0,1})";
            var regex = new RegExp(regexExpression, "i");
            if (regex.exec(newValue) != null)
                vsFlexProperites.EditText = RegExp.$1;
            else
                vsFlexProperites.EditText = vsFlexProperites.TextMatrix(row, col);
            break;
        default:
            {
                var regexExpression;
                //if(vsFlexProperites.TextMatrix(row, 0) == "Auto pts")
                if (vsFlexProperites.RowData(row) == instrumentPropertyColKey.AutoAdjustPoints)
                    regexExpression = "(-?\\d+)";
                else
                    regexExpression = "(\\d+)";
                //Modified by Michael on 2005-04-11   will change
                //regexExpression = "(\\d+\\.{0,1}\\d{0,})";

                var regex = new RegExp(regexExpression, "i");
                if (regex.exec(newValue) != null) {
                    //Modify by Erric
                    if (vsFlexProperites.RowData(row) == instrumentPropertyColKey.AcceptLmtVariation
                        && parseInt(vsFlexProperites.EditText) < 0) {
                        var instrument = vsFlexProperites.RowData(0);
                        vsFlexProperites.EditText = instrument.acceptLmtVariation;
                    }
                    else if (vsFlexProperites.RowData(row) == instrumentPropertyColKey.CancelLmtVariation
                        && parseInt(vsFlexProperites.EditText) < 0) {
                        var instrument = vsFlexProperites.RowData(0);
                        vsFlexProperites.EditText = instrument.cancelLmtVariation;
                    }
                    else if (vsFlexProperites.RowData(row) == instrumentPropertyColKey.AcceptCloseLmtVariation
                        && parseInt(vsFlexProperites.EditText) < 0) {
                        var instrument = vsFlexProperites.RowData(0);
                        vsFlexProperites.EditText = instrument.acceptCloseLmtVariation;
                    }
                    else {
                        vsFlexProperites.EditText = RegExp.$1;
                    }
                }
                else {
                    vsFlexProperites.EditText = vsFlexProperites.TextMatrix(row, col);
                }

                //Added by Michael on 20008-02-15
                if (rowDataValue == instrumentPropertyColKey.HitTimes) {
                    var hitTimes = parseInt(vsFlexProperites.EditText);
                    if (isNaN(hitTimes) || hitTimes < 1) {
                        var hitTimes2 = parseInt(vsFlexProperites.TextMatrix(row, col));
                        vsFlexProperites.EditText = (isNaN(hitTimes2) || hitTimes2 < 1) ? "1" : vsFlexProperites.TextMatrix(row, col);
                    }
                }

                var instrument = vsFlexProperites.RowData(0);
                if (!instrument) return;
                if (!instrument.quotePolicyDetails.Exists(parent.quotationFrm.oCurrentQuotePolicyDetailID))
                    return;
                var quotePolicyDetail = instrument.quotePolicyDetails.Item(parent.quotationFrm.oCurrentQuotePolicyDetailID);

                if (rowDataValue == instrumentPropertyColKey.SpreadPoints) {
                    var spreadPoints = parseInt(vsFlexProperites.EditText);
                    if (spreadPoints > quotePolicyDetail.maxSpreadPoints) {
                        vsFlexProperites.EditText = vsFlexProperites.TextMatrix(row, col);
                    }
                }

                if (rowDataValue == instrumentPropertyColKey.MaxSpreadPoints) {
                    var maxSpreadPoints = parseInt(vsFlexProperites.EditText);
                    if (maxSpreadPoints < quotePolicyDetail.spreadPoints) {
                        vsFlexProperites.EditText = vsFlexProperites.TextMatrix(row, col);
                    }
                }

                if (rowDataValue == instrumentPropertyColKey.AutoAdjustPoints) {
                    var autoAdjustPoints = parseInt(vsFlexProperites.EditText);
                    if (autoAdjustPoints > quotePolicyDetail.maxAutoAdjustPoints) {
                        vsFlexProperites.EditText = vsFlexProperites.TextMatrix(row, col);
                    }
                }

                if (rowDataValue == instrumentPropertyColKey.MaxAutoAdjustPoints) {
                    var maxAutoAdjustPoints = parseInt(vsFlexProperites.EditText);
                    if (maxAutoAdjustPoints < quotePolicyDetail.autoAdjustPoints) {
                        vsFlexProperites.EditText = vsFlexProperites.TextMatrix(row, col);
                    }
                }
            }
            break;
	}
}

/*
function OnPropertyInstrumentChanged(instrument)
{
	var vsflexGrid = parent.propertyFrm.vsFlexProperites;
	if(!vsflexGrid)
		return;
		
	if(!instrument)
	{
		vsflexGrid.RowData(0) = null;
		for(var line=vsflexGrid.FixedRows; line<vsflexGrid.Rows; line++)
			vsflexGrid.TextMatrix(line, 1) = "";
		return;
	}
		
	var quotationFrm = parent.quotationFrm;
	if(quotationFrm.oCurrentInstrumentID == instrument.id)
	{
		var isTrue;
		vsflexGrid.RowData(0) = instrument;
		var line = vsflexGrid.FixedRows;
		var col = vsflexGrid.FixedCols;
		//update properties about the current quotePolicyDetail
		if(instrument.quotePolicyDetails.Exists( quotationFrm.oCurrentQuotePolicyDetailID ) == true)
		{
			var quotePolicyDetail = instrument.quotePolicyDetails.Item( quotationFrm.oCurrentQuotePolicyDetailID );
			if(quotePolicyDetail)
			{
				vsflexGrid.TextMatrix(line, col) = 
					(quotePolicyDetail.spreadPointsTemp == null) ? quotePolicyDetail.spreadPoints : quotePolicyDetail.spreadPointsTemp;
				line ++;
				
				vsflexGrid.TextMatrix(line, col) = 
					(quotePolicyDetail.autoAdjustPointsTemp == null) ? quotePolicyDetail.autoAdjustPoints : quotePolicyDetail.autoAdjustPointsTemp;
				line ++;
				
				isTrue = (quotePolicyDetail.isOriginHiLoTemp == null) ? quotePolicyDetail.isOriginHiLo : quotePolicyDetail.isOriginHiLoTemp;
				vsflexGrid.TextMatrix(line, col) = isTrue;
				vsflexGrid.Cell(flexcpChecked, line, col) = isTrue ? flexChecked : flexUnchecked;
				line ++;
				
				vsflexGrid.TextMatrix(line, col) = 
					(quotePolicyDetail.priceTypeTemp == null) ? PriceType.GetPriceTypeString( quotePolicyDetail.priceType ) : PriceType.GetPriceTypeString( quotePolicyDetail.priceTypeTemp );
				line ++;
				
				var canEdit = (vsflexGrid.TextMatrix(4, 1) != "Watch Only");
				vsflexGrid.Editable = (canEdit ? flexEDKbdMouse : flexEDNone);
			}
		}
		//update properties of the instrument
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.originTypeTemp == null) ? OriginType.GetOriginTypeString( instrument.originType ) : OriginType.GetOriginTypeString( instrument.originTypeTemp );
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.originInactiveTimeTemp == null) ? instrument.originInactiveTime : instrument.originInactiveTimeTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.alertVariationTemp == null) ? instrument.alertVariation : instrument.alertVariationTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.normalWaitTimeTemp == null) ? instrument.normalWaitTime : instrument.normalWaitTimeTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.alertWaitTimeTemp == null) ? instrument.alertWaitTime : instrument.alertWaitTimeTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.maxDQLotTemp == null) ? instrument.maxDQLot : instrument.maxDQLotTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.maxOtherLotTemp == null) ? instrument.maxOtherLot :instrument.maxOtherLotTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.dqQuoteMinLotTemp == null) ? instrument.dqQuoteMinLot : instrument.dqQuoteMinLotTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.autoDQMaxLotTemp == null) ? instrument.autoDQMaxLot :instrument.autoDQMaxLotTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.autoLmtMktMaxLotTemp == null) ? instrument.autoLmtMktMaxLot : instrument.autoLmtMktMaxLotTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.acceptDQVariationTemp == null) ? instrument.acceptDQVariation : instrument.acceptDQVariationTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.acceptLmtVariationTemp == null) ? instrument.acceptLmtVariation : instrument.acceptLmtVariationTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.cancelLmtVariationTemp == null) ? instrument.cancelLmtVariation : instrument.cancelLmtVariationTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.maxMinAdjustTemp == null) ? instrument.maxMinAdjust : instrument.maxMinAdjustTemp;
		line ++;
		
		isTrue = (instrument.isBetterPriceTemp == null) ? instrument.isBetterPrice : instrument.isBetterPriceTemp;
		vsflexGrid.TextMatrix(line, col) = isTrue;
		vsflexGrid.Cell(flexcpChecked, line, col) = isTrue ? flexChecked : flexUnchecked;
		line ++;
		
        vsflexGrid.TextMatrix(line, col) = (instrument.autoAcceptMaxLotTemp == null) ? instrument.autoAcceptMaxLot : instrument.autoAcceptMaxLotTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = (instrument.autoCancelMaxLotTemp == null) ? instrument.autoCancelMaxLot : instrument.autoCancelMaxLotTemp;
		line ++;

		isTrue = (instrument.allowAddNewPositionTemp == null) ? instrument.allowAddNewPosition : instrument.allowAddNewPositionTemp;
		vsflexGrid.TextMatrix(line, col) = isTrue;
		vsflexGrid.Cell(flexcpChecked, line, col) = isTrue ? flexChecked : flexUnchecked;
		line ++;

		vsflexGrid.TextMatrix(line, col) = 
			(instrument.hitTimesTemp == null) ? instrument.hitTimes : instrument.hitTimesTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.penetrationPointTemp == null) ? instrument.penetrationPoint : instrument.penetrationPointTemp;
		line ++;

		vsflexGrid.TextMatrix(line, col) = 
			(instrument.priceValidTimeTemp == null) ? instrument.priceValidTime : instrument.priceValidTimeTemp;
		line ++;
		
		vsflexGrid.TextMatrix(line, col) = 
			(instrument.lastAcceptTimeSpanTemp == null) ? instrument.lastAcceptTimeSpan : instrument.lastAcceptTimeSpanTemp;
		line ++;
		
	}
	//vsflexGrid.AutoSize(0, vsflexGrid.Cols-1);
}
*/

function OnPropertyInstrumentChanged(instrument)
{
    //var vsflexGrid = parent.propertyFrm.vsFlexProperites;
    var vsflexGrid = vsFlexProperites;
	if(!vsflexGrid)	return;
		
	if(!instrument)
	{
		vsflexGrid.RowData(0) = null;
		for(var line=vsflexGrid.FixedRows,count=vsflexGrid.Rows; line<count; line++)
			vsflexGrid.TextMatrix(line, 1) = "";
		return;
	}
		
	var quotationFrm = parent.quotationFrm;
	if(quotationFrm.oCurrentInstrumentID == instrument.id)
	{
		var isTrue;
		vsflexGrid.RowData(0) = instrument;
		var line = vsflexGrid.FixedRows;
		var column = vsflexGrid.FixedCols;
		//update properties about the current quotePolicyDetail
		var instrumentPropertyColKey = parent.quotationFrm.instrumentPropertyColKey;
		
		vsflexGrid.Redraw = false;
		
		with (vsflexGrid)
		{
			var rowHeightValue = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.QuotationGrid);
			for (var index = line;index < Rows; index++)
			{
				RowHeight(index) = rowHeightValue;
				
				var rowDataValue = RowData(index);
				switch (rowDataValue) {
				    case instrumentPropertyColKey.MaxSpreadPoints:
					case instrumentPropertyColKey.SpreadPoints:
					case instrumentPropertyColKey.SpreadPoints2:
					case instrumentPropertyColKey.SpreadPoints3:
					case instrumentPropertyColKey.SpreadPoints4:
					case instrumentPropertyColKey.MaxAutoAdjustPoints:
					case instrumentPropertyColKey.AutoAdjustPoints:
					case instrumentPropertyColKey.AutoAdjustPoints2:
					case instrumentPropertyColKey.AutoAdjustPoints3:
					case instrumentPropertyColKey.AutoAdjustPoints4:
					case instrumentPropertyColKey.IsOriginHiLo:
					case instrumentPropertyColKey.PriceType:
					    if (instrument.quotePolicyDetails.Exists(quotationFrm.oCurrentQuotePolicyDetailID) == true) {
					        var quotePolicyDetail = instrument.quotePolicyDetails.Item(quotationFrm.oCurrentQuotePolicyDetailID);
					        if (quotePolicyDetail) {
					            if (rowDataValue == instrumentPropertyColKey.MaxSpreadPoints) {
					                TextMatrix(index, column) = (quotePolicyDetail.maxSpreadPointsTemp == null) ? quotePolicyDetail.maxSpreadPoints : quotePolicyDetail.maxSpreadPointsTemp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.SpreadPoints) {
					                TextMatrix(index, column) = (quotePolicyDetail.spreadPointsTemp == null) ? quotePolicyDetail.spreadPoints : quotePolicyDetail.spreadPointsTemp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.SpreadPoints2) {
					                TextMatrix(index, column) = (quotePolicyDetail.spreadPoints2Temp == null) ? quotePolicyDetail.spreadPoints2 : quotePolicyDetail.spreadPoints2Temp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.SpreadPoints3) {
					                TextMatrix(index, column) = (quotePolicyDetail.spreadPoints3Temp == null) ? quotePolicyDetail.spreadPoints3 : quotePolicyDetail.spreadPoints3Temp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.SpreadPoints4) {
					                TextMatrix(index, column) = (quotePolicyDetail.spreadPoints4Temp == null) ? quotePolicyDetail.spreadPoints4 : quotePolicyDetail.spreadPoints4Temp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.MaxAutoAdjustPoints) {
					                TextMatrix(index, column) = (quotePolicyDetail.maxAutoAdjustPointsTemp == null) ? quotePolicyDetail.maxAutoAdjustPoints : quotePolicyDetail.maxAutoAdjustPointsTemp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.AutoAdjustPoints) {
					                TextMatrix(index, column) = (quotePolicyDetail.autoAdjustPointsTemp == null) ? quotePolicyDetail.autoAdjustPoints : quotePolicyDetail.autoAdjustPointsTemp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.AutoAdjustPoints2) {
					                TextMatrix(index, column) = (quotePolicyDetail.autoAdjustPoints2Temp == null) ? quotePolicyDetail.autoAdjustPoints2 : quotePolicyDetail.autoAdjustPoints2Temp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.AutoAdjustPoints3) {
					                TextMatrix(index, column) = (quotePolicyDetail.autoAdjustPoints3Temp == null) ? quotePolicyDetail.autoAdjustPoints3 : quotePolicyDetail.autoAdjustPoints3Temp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.AutoAdjustPoints4) {
					                TextMatrix(index, column) = (quotePolicyDetail.autoAdjustPoints4Temp == null) ? quotePolicyDetail.autoAdjustPoints4 : quotePolicyDetail.autoAdjustPoints4Temp;
					            }
					            if (rowDataValue == instrumentPropertyColKey.IsOriginHiLo) {
					                isTrue = (quotePolicyDetail.isOriginHiLoTemp == null) ? quotePolicyDetail.isOriginHiLo : quotePolicyDetail.isOriginHiLoTemp;
					                TextMatrix(index, column) = isTrue;
					                Cell(flexcpChecked, index, column) = isTrue ? flexChecked : flexUnchecked;
					            }
					            if (rowDataValue == instrumentPropertyColKey.PriceType) {
					                TextMatrix(index, column) = (quotePolicyDetail.priceTypeTemp == null) ? PriceType.GetPriceTypeString(quotePolicyDetail.priceType) : PriceType.GetPriceTypeString(quotePolicyDetail.priceTypeTemp);

					                var canEdit = (vsflexGrid.TextMatrix(index, 1) != "Watch Only");
					                //if (!quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentPropertyColKey.PriceType)) canEdit = false;
					                //vsflexGrid.Editable = (canEdit ? flexEDKbdMouse : flexEDNone);
					            }
					        }
					    }
					    break;
					case instrumentPropertyColKey.OriginType://update properties of the instrument
						TextMatrix(index, column) = (instrument.originTypeTemp == null) ? OriginType.GetOriginTypeString( instrument.originType ) : OriginType.GetOriginTypeString( instrument.originTypeTemp );
						break;
		            case instrumentPropertyColKey.AllowedSpotTradeOrderSides: //update properties of the instrument
		                TextMatrix(index, column) = (instrument.allowedSpotTradeOrderSidesTemp == null) ? AllowedOrderSides.GetAllowedOrderSidesString(instrument.allowedSpotTradeOrderSides) : AllowedOrderSides.GetAllowedOrderSidesString(instrument.allowedSpotTradeOrderSidesTemp);
		                break;
					case instrumentPropertyColKey.OriginInactiveTime:	
						vsflexGrid.TextMatrix(index, column) = (instrument.originInactiveTimeTemp == null) ? instrument.originInactiveTime : instrument.originInactiveTimeTemp;
						break;
					case instrumentPropertyColKey.AlertVariation:	
						vsflexGrid.TextMatrix(index, column) = (instrument.alertVariationTemp == null) ? instrument.alertVariation : instrument.alertVariationTemp;
						break;
					case instrumentPropertyColKey.NormalWaitTime:		
						vsflexGrid.TextMatrix(index, column) = (instrument.normalWaitTimeTemp == null) ? instrument.normalWaitTime : instrument.normalWaitTimeTemp;
						break;
					case instrumentPropertyColKey.AlertWaitTime:		
						vsflexGrid.TextMatrix(index, column) = (instrument.alertWaitTimeTemp == null) ? instrument.alertWaitTime : instrument.alertWaitTimeTemp;
						break;				
					case instrumentPropertyColKey.MaxDQLot:			
						vsflexGrid.TextMatrix(index, column) = (instrument.maxDQLotTemp == null) ? instrument.maxDQLot : instrument.maxDQLotTemp;
						break;				
					case instrumentPropertyColKey.MaxOtherLot:			
						vsflexGrid.TextMatrix(index, column) = (instrument.maxOtherLotTemp == null) ? instrument.maxOtherLot :instrument.maxOtherLotTemp;
						break;						
					case instrumentPropertyColKey.DQQuoteMinLot:			
						vsflexGrid.TextMatrix(index, column) = (instrument.dqQuoteMinLotTemp == null) ? instrument.dqQuoteMinLot : instrument.dqQuoteMinLotTemp;
						break;		
					case instrumentPropertyColKey.AutoDQMaxLot:				
						vsflexGrid.TextMatrix(index, column) = (instrument.autoDQMaxLotTemp == null) ? instrument.autoDQMaxLot :instrument.autoDQMaxLotTemp;
						break;				
					case instrumentPropertyColKey.AutoLmtMktMaxLot:	
						vsflexGrid.TextMatrix(index, column) = (instrument.autoLmtMktMaxLotTemp == null) ? instrument.autoLmtMktMaxLot : instrument.autoLmtMktMaxLotTemp;
						break;	
					case instrumentPropertyColKey.AcceptDQVariation:	
						vsflexGrid.TextMatrix(index, column) = (instrument.acceptDQVariationTemp == null) ? instrument.acceptDQVariation : instrument.acceptDQVariationTemp;
						break;				
					case instrumentPropertyColKey.AcceptLmtVariation:	
						vsflexGrid.TextMatrix(index, column) = (instrument.acceptLmtVariationTemp == null) ? instrument.acceptLmtVariation : instrument.acceptLmtVariationTemp;
						break;
		            case instrumentPropertyColKey.AcceptCloseLmtVariation:
		                vsflexGrid.TextMatrix(index, column) = (instrument.acceptCloseLmtVariationTemp == null) ? instrument.acceptCloseLmtVariation : instrument.acceptCloseLmtVariationTemp;
		                break;			
					case instrumentPropertyColKey.CancelLmtVariation:	
						vsflexGrid.TextMatrix(index, column) = (instrument.cancelLmtVariationTemp == null) ? instrument.cancelLmtVariation : instrument.cancelLmtVariationTemp;
						break;				
					case instrumentPropertyColKey.MaxMinAdjust:	
						vsflexGrid.TextMatrix(index, column) = (instrument.maxMinAdjustTemp == null) ? instrument.maxMinAdjust : instrument.maxMinAdjustTemp;
						break;				
					case instrumentPropertyColKey.IsBetterPrice:	
						isTrue = (instrument.isBetterPriceTemp == null) ? instrument.isBetterPrice : instrument.isBetterPriceTemp;
						vsflexGrid.TextMatrix(index, column) = isTrue;
						vsflexGrid.Cell(flexcpChecked, index, column) = isTrue ? flexChecked : flexUnchecked;
						break;
		            case instrumentPropertyColKey.AutoAcceptMaxLot:
		                vsflexGrid.TextMatrix(index, column) = (instrument.autoAcceptMaxLotTemp == null) ? instrument.autoAcceptMaxLot  : instrument.autoAcceptMaxLotTemp;
		                break;
		            case instrumentPropertyColKey.AutoCancelMaxLot:
		                vsflexGrid.TextMatrix(index, column) = (instrument.autoCancelMaxLotTemp == null) ? instrument.autoCancelMaxLot : instrument.autoCancelMaxLotTemp;
						break;
		            case instrumentPropertyColKey.AllowedNewTradeSides:
		                vsflexGrid.TextMatrix(index, column) = (instrument.allowedNewTradeSidesTemp == null) ? AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeStr(instrument.allowedNewTradeSides) : AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeStr(instrument.allowedNewTradeSidesTemp);
		                break;	
					case instrumentPropertyColKey.HitTimes:	
						vsflexGrid.TextMatrix(index, column) = (instrument.hitTimesTemp == null) ? instrument.hitTimes : instrument.hitTimesTemp;
						break;				
					case instrumentPropertyColKey.PenetrationPoint:	
						vsflexGrid.TextMatrix(index, column) = (instrument.penetrationPointTemp == null) ? instrument.penetrationPoint : instrument.penetrationPointTemp;
						break;
					case instrumentPropertyColKey.PriceValidTime:	
						vsflexGrid.TextMatrix(index, column) = (instrument.priceValidTimeTemp == null) ? instrument.priceValidTime : instrument.priceValidTimeTemp;
						break;				
					case instrumentPropertyColKey.LastAcceptTimeSpan:	
						vsflexGrid.TextMatrix(index, column) = (instrument.lastAcceptTimeSpanTemp == null) ? instrument.lastAcceptTimeSpan : instrument.lastAcceptTimeSpanTemp;
						break;
		            case instrumentPropertyColKey.IsAutoEnablePrice:
		                isTrue = (instrument.isAutoEnablePriceTemp == null) ? instrument.isAutoEnablePrice : instrument.isAutoEnablePriceTemp;
		                vsflexGrid.TextMatrix(index, column) = isTrue;
		                vsflexGrid.Cell(flexcpChecked, index, column) = isTrue ? flexChecked : flexUnchecked;
		                break;

		            case instrumentPropertyColKey.IsAutoFill:
		                isTrue = (instrument.isAutoFillTemp == null) ? instrument.isAutoFill : instrument.isAutoFillTemp;
		                vsflexGrid.TextMatrix(index, column) = isTrue;
		                vsflexGrid.Cell(flexcpChecked, index, column) = isTrue ? flexChecked : flexUnchecked;
		                break;
		            case instrumentPropertyColKey.IsPriceEnabled:
		                isTrue = (instrument.isPriceEnabledTemp == null) ? instrument.isPriceEnabled : instrument.isPriceEnabledTemp;
		                vsflexGrid.TextMatrix(index, column) = isTrue;
		                vsflexGrid.Cell(flexcpChecked, index, column) = isTrue ? flexChecked : flexUnchecked;
		                break;
		            case instrumentPropertyColKey.AutoDQDelay:
		                vsflexGrid.TextMatrix(index, column) = (instrument.autoDQDelayTemp == null) ? instrument.autoDQDelay : instrument.autoDQDelayTemp;
		                break;
		            case instrumentPropertyColKey.HitPriceVariationForSTP:
		                vsflexGrid.TextMatrix(index, column) = (instrument.hitPriceVariationForSTPTemp == null) ? instrument.hitPriceVariationForSTP : instrument.hitPriceVariationForSTPTemp;
		                break;
		        }
			}
		}
		vsflexGrid.Redraw = true;		
	}
}

function OnProperitesBeforeEdit(row, col, cancel) {
	var instrumentPropertyColKey = parent.quotationFrm.instrumentPropertyColKey;
	
	if(vsFlexProperites.RowData(row) == instrumentPropertyColKey.PriceType)
	{
		//vsFlexProperites.ComboList = "Reference|Deal|Origin Enable";
		vsFlexProperites.ComboList = "One price|BidAsk";
	}	
	else if(vsFlexProperites.RowData(row) == instrumentPropertyColKey.OriginType)
	    vsFlexProperites.ComboList = "Ask|Bid|(Bid+Ask)/2";
	else if (vsFlexProperites.RowData(row) == instrumentPropertyColKey.AllowedSpotTradeOrderSides)
	    vsFlexProperites.ComboList = "None|Buy|Sell|All";
	else if (vsFlexProperites.RowData(row) == instrumentPropertyColKey.AllowedNewTradeSides)
        vsFlexProperites.ComboList = "Disallow add New|Allow add new Buy only|Allow add new Sell only|Allow add new";
	else
		vsFlexProperites.ComboList = "";
	
	/*
	if(vsFlexProperites.TextMatrix(row, 0) == "PriceType")
		vsFlexProperites.ComboList = "Reference|Deal";
	else if(vsFlexProperites.TextMatrix(row, 0) == "OriginType")
		vsFlexProperites.ComboList = "Ask|Bid|(Bid+Ask)/2";
	else
		vsFlexProperites.ComboList = "";
	*/	
}

function OnProperitesAfterEdit(row, col){
	var quotationFrm = parent.quotationFrm;
	var instrument = vsFlexProperites.RowData(0);
	if(!instrument)	return;
	if(!instrument.quotePolicyDetails.Exists( parent.quotationFrm.oCurrentQuotePolicyDetailID ))
		return;
		
	var quotePolicyDetail = instrument.quotePolicyDetails.Item( parent.quotationFrm.oCurrentQuotePolicyDetailID );

	var isQuotePolicyProperty = false;	
	var instrumentPropertyColKey = parent.quotationFrm.instrumentPropertyColKey;
	//switch(vsFlexProperites.TextMatrix(row, 0))
	var rowDataValue = vsFlexProperites.RowData(row);
	switch(rowDataValue)
	{
	    case instrumentPropertyColKey.MaxSpreadPoints:
	        var newValue = parseInt(vsFlexProperites.TextMatrix(row, col));
	        if (newValue < quotePolicyDetail.spreadPoints) {
	            vsFlexProperites.TextMatrix(row, col) = quotePolicyDetail.maxSpreadPoints;
	        }
	        else {
	            quotePolicyDetail.maxSpreadPointsTemp = newValue;
	            if (quotePolicyDetail.maxSpreadPointsTemp != quotePolicyDetail.maxSpreadPoints)
	                quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.maxSpreadPointsTemp, "");
	            else
	                quotePolicyDetail.maxSpreadPointsTemp = null;
	        }
	        isQuotePolicyProperty = true;
	        break;
	    case instrumentPropertyColKey.SpreadPoints:
	        var newValue = parseInt(vsFlexProperites.TextMatrix(row, col));
	        if (newValue > quotePolicyDetail.maxSpreadPoints) {
	            vsFlexProperites.TextMatrix(row, col) = quotePolicyDetail.spreadPoints;
	        }
	        else {
	            quotePolicyDetail.spreadPointsTemp = newValue;
	            if (quotePolicyDetail.spreadPointsTemp != quotePolicyDetail.spreadPoints) {
	                var eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetail.code + " " + instrument.code + " with spread = " + quotePolicyDetail.spreadPointsTemp;// +" and autopoint = " + quotePolicyDetail.autoAdjustPoints;
	                quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.spreadPointsTemp, eventMessage);
	            }
	            else
	                quotePolicyDetail.spreadPointsTemp = null;
	        }
	        isQuotePolicyProperty = true;
	        break;
		case instrumentPropertyColKey.SpreadPoints2:
			var spreadPoints2 = vsFlexProperites.TextMatrix(row, col);
			if (spreadPoints2 != "" && isNaN(parseInt(spreadPoints2))) spreadPoints2 = "";
			quotePolicyDetail.spreadPoints2Temp = spreadPoints2;
			if(quotePolicyDetail.spreadPoints2Temp != quotePolicyDetail.spreadPoints2)
			    quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.spreadPoints2Temp, "");
			else
				quotePolicyDetail.spreadPoints2Temp = null;
			isQuotePolicyProperty = true;
			break;	
		case instrumentPropertyColKey.SpreadPoints3:
			var spreadPoints3 = vsFlexProperites.TextMatrix(row, col);
			if (spreadPoints3 != "" && isNaN(parseInt(spreadPoints3))) spreadPoints3 = "";
			quotePolicyDetail.spreadPoints3Temp = spreadPoints3;
			if(quotePolicyDetail.spreadPoints3Temp != quotePolicyDetail.spreadPoints3)
			    quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.spreadPoints3Temp, "");
			else
				quotePolicyDetail.spreadPoints3Temp = null;
			isQuotePolicyProperty = true;
			break;	
		case instrumentPropertyColKey.SpreadPoints4:
			var spreadPoints4 = vsFlexProperites.TextMatrix(row, col);
			if (spreadPoints4 != "" && isNaN(parseInt(spreadPoints4))) spreadPoints4 = "";
			quotePolicyDetail.spreadPoints4Temp = spreadPoints4;
			if(quotePolicyDetail.spreadPoints4Temp != quotePolicyDetail.spreadPoints4)
			    quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.spreadPoints4Temp, "");
			else
				quotePolicyDetail.spreadPoints4Temp = null;
			isQuotePolicyProperty = true;
			break;        case instrumentPropertyColKey.MaxAutoAdjustPoints:
            var newValue = parseInt(vsFlexProperites.TextMatrix(row, col));
            if (newValue < quotePolicyDetail.autoAdjustPoints) {
                vsFlexProperites.TextMatrix(row, col) = quotePolicyDetail.maxAutoAdjustPoints;
	        }
	        else {
	            quotePolicyDetail.maxAutoAdjustPointsTemp = newValue;
	            if (quotePolicyDetail.maxAutoAdjustPointsTemp != quotePolicyDetail.maxAutoAdjustPoints)
	                quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.maxAutoAdjustPointsTemp, "");
	            else
	                quotePolicyDetail.maxAutoAdjustPointsTemp = null;
	        }
			isQuotePolicyProperty = true;
			break;
        case instrumentPropertyColKey.AutoAdjustPoints:            var newValue = parseInt(vsFlexProperites.TextMatrix(row, col));            if (newValue > quotePolicyDetail.maxAutoAdjustPoints) {                vsFlexProperites.TextMatrix(row, col) = quotePolicyDetail.autoAdjustPoints;            }            else {                quotePolicyDetail.autoAdjustPointsTemp = newValue;                if (quotePolicyDetail.autoAdjustPointsTemp != quotePolicyDetail.autoAdjustPoints) {                    var eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetail.code + " " + instrument.code + " with autopoint = " + quotePolicyDetail.autoAdjustPointsTemp;                    quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.autoAdjustPointsTemp, eventMessage);                }                else                    quotePolicyDetail.autoAdjustPointsTemp = null;            }            isQuotePolicyProperty = true;            break;
		case instrumentPropertyColKey.AutoAdjustPoints2:
			var autoAdjustPoints2 = vsFlexProperites.TextMatrix(row, col);
			if (autoAdjustPoints2 != "" && isNaN(parseInt(autoAdjustPoints2))) autoAdjustPoints2 = "";
			quotePolicyDetail.autoAdjustPoints2Temp = autoAdjustPoints2;
			if(quotePolicyDetail.autoAdjustPoints2Temp != quotePolicyDetail.autoAdjustPoints2)
			    quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.autoAdjustPoints2Temp, "");
			else
				quotePolicyDetail.autoAdjustPoints2Temp = null;
			isQuotePolicyProperty = true;
			break;
		case instrumentPropertyColKey.AutoAdjustPoints3:
			var autoAdjustPoints3 = vsFlexProperites.TextMatrix(row, col);
			if (autoAdjustPoints3 != "" && isNaN(parseInt(autoAdjustPoints3))) autoAdjustPoints3 = "";
			quotePolicyDetail.autoAdjustPoints3Temp = autoAdjustPoints3;
			if(quotePolicyDetail.autoAdjustPoints3Temp != quotePolicyDetail.autoAdjustPoints3)
			    quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.autoAdjustPoints3Temp, "");
			else
				quotePolicyDetail.autoAdjustPoints3Temp = null;
			isQuotePolicyProperty = true;
			break;	
		case instrumentPropertyColKey.AutoAdjustPoints4:
			var autoAdjustPoints4 = vsFlexProperites.TextMatrix(row, col);
			if (autoAdjustPoints4 != "" && isNaN(parseInt(autoAdjustPoints4))) autoAdjustPoints4 = "";
			quotePolicyDetail.autoAdjustPoints4Temp = autoAdjustPoints4;
			if(quotePolicyDetail.autoAdjustPoints4Temp != quotePolicyDetail.autoAdjustPoints4)
			    quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.autoAdjustPoints4Temp, "");
			else
				quotePolicyDetail.autoAdjustPoints4Temp = null;
			isQuotePolicyProperty = true;
			break;        case instrumentPropertyColKey.IsOriginHiLo:
            if (!parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentPropertyColKey.IsOriginHiLo)) {
                vsFlexProperites.Cell(flexcpChecked, row, col) = (quotePolicyDetail.isOriginHiLo) ? flexChecked : flexUnchecked;
                break;
            }
			quotePolicyDetail.isOriginHiLoTemp = (vsFlexProperites.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;
			if(quotePolicyDetail.isOriginHiLoTemp != quotePolicyDetail.isOriginHiLo)
			{
				vsFlexProperites.TextMatrix(row, col) = quotePolicyDetail.isOriginHiLoTemp;
				quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.isOriginHiLoTemp, "");
			}
			else
				quotePolicyDetail.isOriginHiLoTemp = null;
			isQuotePolicyProperty = true;
			break;
		case instrumentPropertyColKey.PriceType:
			quotePolicyDetail.priceTypeTemp = PriceType.GetPriceTypeValue( vsFlexProperites.TextMatrix(row, col) );
			if(quotePolicyDetail.priceTypeTemp != quotePolicyDetail.priceType)
			{
				var priceType2 = parseInt(quotePolicyDetail.priceTypeTemp);
				priceType2 = isNaN(priceType2)?PriceType.Reference:priceType2;
				priceType2 = (priceType2==PriceType.Watch)?PriceType.Reference:priceType2;
				quotePolicyDetail.priceTypeTemp = priceType2;
				quotationFrm.oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, rowDataValue, quotePolicyDetail.priceTypeTemp, "");
			}
			else
				quotePolicyDetail.priceTypeTemp = null;
			isQuotePolicyProperty = true;
			break;
		//deal with all properties of instrument
		case instrumentPropertyColKey.OriginType:
			instrument.originTypeTemp = OriginType.GetOriginTypeValue( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.originTypeTemp != instrument.originType)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.originTypeTemp, false, true);
			else
				instrument.originTypeTemp = null;
            break;
        case instrumentPropertyColKey.AllowedSpotTradeOrderSides:
            instrument.allowedSpotTradeOrderSidesTemp = AllowedOrderSides.GetAllowedOrderSides(vsFlexProperites.TextMatrix(row, col));
            if (instrument.allowedSpotTradeOrderSidesTemp != instrument.allowedSpotTradeOrderSides)
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.allowedSpotTradeOrderSidesTemp, false, true);
            else
                instrument.allowedSpotTradeOrderSidesTemp = null;
            break;
		case instrumentPropertyColKey.OriginInactiveTime:
		    instrument.originInactiveTimeTemp = parseInt(vsFlexProperites.TextMatrix(row, col));
		    if (instrument.originInactiveTimeTemp <= 10) {
		        instrument.originInactiveTimeTemp = instrument.originInactiveTime;
		        vsFlexProperites.TextMatrix(row, col) = instrument.originInactiveTime;
			}
			if(instrument.originInactiveTimeTemp != instrument.originInactiveTime)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.originInactiveTimeTemp, false, true);
			else
				instrument.originInactiveTimeTemp = null;
			break;
		case instrumentPropertyColKey.AlertVariation:
			instrument.alertVariationTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.alertVariationTemp != instrument.alertVariation)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.alertVariationTemp, false, true);
			else
				instrument.alertVariationTemp = null;
			break;
		case instrumentPropertyColKey.NormalWaitTime:
			instrument.normalWaitTimeTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.normalWaitTimeTemp != instrument.normalWaitTime)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.normalWaitTimeTemp, false, true);
			else
				instrument.normalWaitTimeTemp = null;
			break;
		case instrumentPropertyColKey.AlertWaitTime:
			instrument.alertWaitTimeTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.alertWaitTimeTemp != instrument.alertWaitTime)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.alertWaitTimeTemp, false, true);
			else
				instrument.alertWaitTimeTemp = null;
			break;
		case instrumentPropertyColKey.MaxDQLot:
			//Modified by Michael on 2005-04-08
			//var newValue = parseInt( vsFlexProperites.TextMatrix(row, col) );			
			var newValue = parseFloat( vsFlexProperites.TextMatrix(row, col) );
			
			if(newValue < instrument.dqQuoteMinLot)
			{
				vsFlexProperites.TextMatrix(row, col) = instrument.maxDQLot;
			}
			else
			{
				instrument.maxDQLotTemp = newValue;
				if(instrument.maxDQLotTemp != instrument.maxDQLot)
				    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.maxDQLotTemp, false, true);
				else
					instrument.maxDQLotTemp = null;
			}
			break;
		case instrumentPropertyColKey.MaxOtherLot:
			//Modified by Michael on 2005-04-08
			//instrument.maxOtherLotTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			instrument.maxOtherLotTemp = parseFloat( vsFlexProperites.TextMatrix(row, col) );
			
			if(instrument.maxOtherLotTemp != instrument.maxOtherLot)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.maxOtherLotTemp, false, true);
			else
				instrument.maxOtherLotTemp = null;
			break;
		case instrumentPropertyColKey.DQQuoteMinLot:
			//Modified by Michael on 2005-04-08
			//var newValue = parseInt( vsFlexProperites.TextMatrix(row, col) );
			var newValue = parseFloat( vsFlexProperites.TextMatrix(row, col) );
			
			if(newValue > instrument.maxDQLot)
			{
				vsFlexProperites.TextMatrix(row, col) = instrument.dqQuoteMinLot;
			}
			else
			{
				instrument.dqQuoteMinLotTemp = newValue;
				if(instrument.dqQuoteMinLotTemp != instrument.dqQuoteMinLot)
				    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.dqQuoteMinLotTemp, false, true);
				else
					instrument.dqQuoteMinLotTemp = null;
			}
			break;
		case instrumentPropertyColKey.AutoDQMaxLot:
			//Modified by Michael on 2005-04-08
			//instrument.autoDQMaxLotTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			instrument.autoDQMaxLotTemp = parseFloat( vsFlexProperites.TextMatrix(row, col) );
			
			if(instrument.autoDQMaxLotTemp != instrument.autoDQMaxLot)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.autoDQMaxLotTemp, false, true);
			else
				instrument.autoDQMaxLotTemp = null;
			break;        case instrumentPropertyColKey.HitPriceVariationForSTP:
            instrument.hitPriceVariationForSTPTemp = parseFloat(vsFlexProperites.TextMatrix(row, col));

            if (instrument.hitPriceVariationForSTPTemp != instrument.hitPriceVariationForSTP)
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.hitPriceVariationForSTPTemp, false, true);
            else
                instrument.hitPriceVariationForSTPTemp = null;
            break;
		case instrumentPropertyColKey.AutoLmtMktMaxLot:
			//Modified by Michael on 2005-04-08
			//instrument.autoLmtMktMaxLotTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			instrument.autoLmtMktMaxLotTemp = parseFloat( vsFlexProperites.TextMatrix(row, col) );
			
			if(instrument.autoLmtMktMaxLotTemp != instrument.autoLmtMktMaxLot)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.autoLmtMktMaxLotTemp, false, true);
			else				
				instrument.autoLmtMktMaxLotTemp = null;
			break;
        case instrumentPropertyColKey.AcceptDQVariation:
            instrument.acceptDQVariationTemp = parseInt(vsFlexProperites.TextMatrix(row, col));
            if (instrument.acceptDQVariationTemp < 0) {
                instrument.acceptDQVariationTemp = instrument.acceptDQVariation;
                vsFlexProperites.TextMatrix(row, col) = instrument.acceptDQVariation;            }
            if (instrument.acceptDQVariationTemp != instrument.acceptDQVariation)
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.acceptDQVariationTemp, false, true);
            else
                instrument.acceptDQVariationTemp = null;
            break;
        case instrumentPropertyColKey.AcceptLmtVariation:
            instrument.acceptLmtVariationTemp = parseInt(vsFlexProperites.TextMatrix(row, col));
            if (instrument.acceptLmtVariationTemp <= 0) {
                instrument.acceptLmtVariationTemp = instrument.acceptLmtVariation;
                vsFlexProperites.TextMatrix(row, col) = instrument.acceptLmtVariation;
            }
            if (instrument.acceptLmtVariationTemp != instrument.acceptLmtVariation)
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.acceptLmtVariationTemp, false, true);
            else
                instrument.acceptLmtVariationTemp = null;
            break;
        case instrumentPropertyColKey.AcceptCloseLmtVariation:
            instrument.acceptCloseLmtVariationTemp = parseInt(vsFlexProperites.TextMatrix(row, col));
            if (instrument.acceptCloseLmtVariationTemp <= 0) {
                instrument.acceptCloseLmtVariationTemp = instrument.acceptCloseLmtVariation;
                vsFlexProperites.TextMatrix(row, col) = instrument.acceptCloseLmtVariation;
            }
            if (instrument.acceptCloseLmtVariationTemp != instrument.acceptCloseLmtVariation)
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.acceptCloseLmtVariationTemp, false, true);
            else
                instrument.acceptLmtVariationTemp = null;
            break;
        case instrumentPropertyColKey.CancelLmtVariation:
            instrument.cancelLmtVariationTemp = parseInt(vsFlexProperites.TextMatrix(row, col));
            if (instrument.cancelLmtVariationTemp <= 0) {
                instrument.cancelLmtVariationTemp = instrument.cancelLmtVariation;
                vsFlexProperites.TextMatrix(row, col) = instrument.cancelLmtVariation;
            }
            if (instrument.cancelLmtVariationTemp != instrument.cancelLmtVariation)
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.cancelLmtVariationTemp, false, true);
            else
                instrument.cancelLmtVariationTemp = null;
            break;
		case instrumentPropertyColKey.MaxMinAdjust:
			instrument.maxMinAdjustTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.maxMinAdjustTemp != instrument.maxMinAdjust)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.maxMinAdjustTemp, false, true);
			else
				instrument.maxMinAdjustTemp = null;
			break;
        case instrumentPropertyColKey.IsBetterPrice:
            if (!parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentPropertyColKey.IsBetterPrice)) {
                vsFlexProperites.Cell(flexcpChecked, row, col) = (instrument.isBetterPrice) ? flexChecked : flexUnchecked;
                break;
            }
			instrument.isBetterPriceTemp = (vsFlexProperites.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;
			if(instrument.isBetterPriceTemp != instrument.isBetterPrice)
			{
				vsFlexProperites.TextMatrix(row, col) = instrument.isBetterPriceTemp;
				quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.isBetterPriceTemp, false, true);
			}
			else
				instrument.isBetterPriceTemp = null;
            break;
        case instrumentPropertyColKey.AutoAcceptMaxLot:
            if (!parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentPropertyColKey.AutoAcceptMaxLot)) {
                vsFlexProperites.TextMatrix(row, col) = instrument.autoAcceptMaxLot;
                break;
            }
			instrument.autoAcceptMaxLotTemp = parseFloat( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.autoAcceptMaxLotTemp != instrument.autoAcceptMaxLot)
			{
				vsFlexProperites.TextMatrix(row, col) = instrument.autoAcceptMaxLotTemp;
				quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.autoAcceptMaxLotTemp, false, true);
			}
			else
				instrument.autoAcceptMaxLotTemp = null;
            break;
        case instrumentPropertyColKey.AutoCancelMaxLot:
            if (!parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentPropertyColKey.AutoCancelMaxLot)) {
                vsFlexProperites.TextMatrix(row, col) = (instrument.autoCancelMaxLot);
                break;
            }
            instrument.autoCancelMaxLotTemp = parseFloat( vsFlexProperites.TextMatrix(row, col) );
            if (instrument.autoCancelMaxLotTemp != instrument.autoCancelMaxLot) {
                vsFlexProperites.TextMatrix(row, col) = instrument.autoCancelMaxLotTemp;
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.autoCancelMaxLotTemp, false, true);
            }
            else
                instrument.autoCancelMaxLotTemp = null;
            break;
        case instrumentPropertyColKey.AllowedNewTradeSides:
            if (!parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentPropertyColKey.AllowedNewTradeSides)) {
                vsFlexProperites.TextMatrix(row, col) = AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeStr(instrument.allowedNewTradeSides);
                break;
            }
            instrument.allowedNewTradeSidesTemp = AllowedNewTradeSidesType.GetAllowedNewTradeSidesTypeValue(vsFlexProperites.TextMatrix(row, col));
            if (instrument.allowedNewTradeSidesTemp != instrument.allowedNewTradeSides) {
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.allowedNewTradeSidesTemp, false, true);
            }
            else
                instrument.allowedNewTradeSidesTemp = null;
            break;	
		case instrumentPropertyColKey.HitTimes:
			instrument.hitTimesTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.hitTimesTemp != null && instrument.hitTimesTemp != instrument.hitTimes)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.hitTimesTemp, false, true);
			else
				instrument.hitTimesTemp = null;
			break;
		case instrumentPropertyColKey.PenetrationPoint:
			instrument.penetrationPointTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.penetrationPointTemp != instrument.penetrationPoint)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.penetrationPointTemp, false, true);
			else
				instrument.penetrationPointTemp = null;
			break;
		case instrumentPropertyColKey.PriceValidTime:
			instrument.priceValidTimeTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.priceValidTimeTemp != instrument.priceValidTime)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.priceValidTimeTemp, false, true);
			else
				instrument.priceValidTimeTemp = null;
			break;
		case instrumentPropertyColKey.LastAcceptTimeSpan:
			instrument.lastAcceptTimeSpanTemp = parseInt( vsFlexProperites.TextMatrix(row, col) );
			if(instrument.lastAcceptTimeSpanTemp != instrument.lastAcceptTimeSpan)
			    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.lastAcceptTimeSpanTemp, false, true);
			else
				instrument.lastAcceptTimeSpanTemp = null;
            break;


        case instrumentPropertyColKey.IsAutoEnablePrice:
            instrument.isAutoEnablePriceTemp = (vsFlexProperites.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;

            quotationFrm.oIOProxy.Debug("New value of IsAutoEnablePrice = " + instrument.isAutoEnablePriceTemp);
        
            if (instrument.isAutoEnablePriceTemp != instrument.isAutoEnablePrice) {
                vsFlexProperites.TextMatrix(row, col) = instrument.isAutoEnablePriceTemp;

                quotationFrm.oIOProxy.Debug("Begin SendInstrumentParam");

                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.isAutoEnablePriceTemp, false, true);

                quotationFrm.oIOProxy.Debug("End SendInstrumentParam");
            }
            else
                instrument.isAutoEnablePriceTemp = null;
            break;

        case instrumentPropertyColKey.IsAutoFill:
            instrument.isAutoFillTemp = (vsFlexProperites.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;
            if (instrument.isAutoFillTemp != instrument.isAutoFill) {
                    vsFlexProperites.TextMatrix(row, col) = instrument.isAutoFillTemp;
                    quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.isAutoFillTemp, false, true);
                }
            else
                instrument.isAutoFillTemp = null;
            break;

        case instrumentPropertyColKey.IsPriceEnabled:
            instrument.isPriceEnabledTemp = (vsFlexProperites.Cell(flexcpChecked, row, col) == flexChecked) ? true : false;
            if (instrument.isPriceEnabledTemp != instrument.isPriceEnabled) {
                vsFlexProperites.TextMatrix(row, col) = instrument.isPriceEnabledTemp;
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.isPriceEnabledTemp, false, true);
            }
            else
                instrument.isPriceEnabledTemp = null;
            break;            
			
        case instrumentPropertyColKey.AutoDQDelay:
            instrument.autoDQDelayTemp = parseInt(vsFlexProperites.TextMatrix(row, col));
            if (instrument.autoDQDelayTemp < 0 || instrument.autoDQDelayTemp > 10) {
                instrument.autoDQDelayTemp = instrument.autoDQDelay;
                vsFlexProperites.TextMatrix(row, col) = instrument.autoDQDelay;
            }
            if (instrument.autoDQDelayTemp != instrument.autoDQDelay)
                quotationFrm.oIOProxy.SendInstrumentParam(instrument, rowDataValue, instrument.autoDQDelayTemp, false, true);
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
	
	if(isQuotePolicyProperty == true)
		quotationFrm.OnQuotationQuotePolicyDetailChanged(instrument);
	else
		quotationFrm.OnQuotationPropertiesChanged(instrument,false);
		
	quotationFrm.oDealingConsole.EnquiryManager.enquiryWindowManager.ChangedParametersByOuter(quotePolicyDetail);
}

/*
function OnSelectChanged( hiddenPropertys )
{
	var vsflexGrid = vsFlexProperites;
	for(var line=vsflexGrid.FixedRows; line<vsflexGrid.Rows; line++)
	{
		vsflexGrid.RowHidden(line) = false;
	}
	
	for(var index=0,count=hiddenPropertys.length;index<count;index++)
	{
		var line = hiddenPropertys[index][1];
		vsflexGrid.RowHidden(line) = true;
	}
}
*/

function OnSelectChanged()// colsArrangements )
{
	flexPropertyInit();
	var vsflexQuotation = parent.quotationFrm.vsflexQuotation;
	if (vsflexQuotation.Row != -1)
	{
		var data = vsflexQuotation.RowData(vsflexQuotation.Row);
		if(data && data.object)
		{
			var instrument = data.object;
			if (parent.quotationFrm.oCurrentInstrumentID == instrument.id) OnPropertyInstrumentChanged(instrument);
		}	
	}	
}



