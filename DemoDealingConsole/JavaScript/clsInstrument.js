
function Instrument(InstrumentID, mainWindow)
{
	this.mainWindow = mainWindow;
	this.quotePolicyDetails = new ActiveXObject("Scripting.Dictionary"); //key=QuotePolicyID value=quotePolicyDetail
	this.tradePolicyDetails = new ActiveXObject("Scripting.Dictionary"); //key=TradePolicyID value=tradePolicyDetail
	this.historyQuotess = new ActiveXObject("Scripting.Dictionary"); //key=QuotePolicyID value=Array(HistoryQuotes) 
	this.lastOverrideQuotations = new ActiveXObject("Scripting.Dictionary"); //key=QuotePolicyID value=overrideQuotation 
	this.maxMins = new ActiveXObject("Scripting.Dictionary"); //key=QuotePolicyID value=maxMin
	this.tradeTimes = new ActiveXObject("Scripting.Dictionary"); //key=beginTime value=tradeTime 
	
	this.defaultQuotePolicyID = null;
	this.currentTradeTime = null;
	this.originQuotation = null;
	this.backQuotation = null;
	this.lastQuotation = null;
	this.nextQuotation = null;
	this.overrideQuotation = null;
	this.isInstrumentActive = false;//this.priceType = PriceType.Deal; //set it with this.quotePolicyDetails in SyncQuotePolicyDetails
	this.isDealerInput = false;
	this.isOutOfRange = false;
	this.isWaiting = false;
	this.lastOriginActiveTime = null;
	this.maxMin = new MaxMin();
	this.isTrading = false;
	this.autoAcceptMaxLot = true;
	this.autoCancelMaxLot = true;
	this.allowedNewTradeSides = 3;

	this.nextDayOpenTime = null;
	this.mocTime = null;
	
	this.mit = false;
    
	//Added by Edward on 2009-01-22
	this.isAutoEnablePrice = true;
	this.isAutoFill = true;
	this.isPriceEnabled = true;
	this.autoDQDelay = 0;
	this.hitPriceVariationForSTP = 9999;
	
	//property
	this.id = InstrumentID;

	this.originTypeTemp = null;
	this.allowedSpotTradeOrderSidesTemp = null;
	this.originInactiveTimeTemp = null;
	this.alertVariationTemp = null;
	this.normalWaitTimeTemp = null;
	this.alertWaitTimeTemp = null;

	this.maxDQLotTemp = null;
	this.maxOtherLotTemp = null;
	this.dqQuoteMinLotTemp = null;
	this.autoDQMaxLotTemp = null;
	this.autoLmtMktMaxLotTemp = null;
	this.acceptDQVariationTemp = null;
	this.acceptLmtVariationTemp = null;
	this.acceptCloseLmtVariationTemp = null;
	this.cancelLmtVariationTemp = null;
	this.maxMinAdjustTemp = null;
	this.isBetterPriceTemp = null;
	this.autoAcceptMaxLotTemp = null;
	this.autoCancelMaxLotTemp = null;
	this.allowedNewTradeSidesTemp = null;
	this.hitTimesTemp = null;
	this.penetrationPointTemp = null;
	this.priceValidTimeTemp = null;
	this.lastAcceptTimeSpanTemp = null;

	//Added by Edward on 2009-01-22
	this.isAutoEnablePriceTemp = null;
	this.isAutoFillTemp = null;
	this.isPriceEnabledTemp = null;
	this.autoDQDelayTemp = null;
	this.hitPriceVariationForSTPTemp = null;
	
	//Added by Michael on 2003-11-19
	this.originInactiveTimeTemp2 = null;
	this.alertVariationTemp2 = null;
	this.normalWaitTimeTemp2 = null;
	this.alertWaitTimeTemp2 = null;
	this.maxDQLotTemp2 = null;
	this.maxOtherLotTemp2 = null;
	this.dqQuoteMinLotTemp2 = null;
	this.autoDQMaxLotTemp2 = null;
	this.autoLmtMktMaxLotTemp2 = null;
	this.acceptDQVariationTemp2 = null;
	this.acceptLmtVariationTemp2 = null;
	this.acceptCloseLmtVariationTemp2 = null;
	this.cancelLmtVariationTemp2 = null;
	this.maxMinAdjustTemp2 = null;
	this.isBetterPriceTemp2 = null;
	this.autoAcceptMaxLotTemp2 = null;
	this.autoCancelMaxLotTemp2 = null;
	this.allowedNewTradeSidesTemp2 = null;
	this.hitTimesTemp2 = null;
	this.penetrationPointTemp2 = null;
	this.priceValidTimeTemp2 = null;
	this.lastAcceptTimeSpanTemp2 = null;

	//Added by Edward on 2009-01-24
	this.isAutoEnablePriceTemp2 = null;
	this.isAutoFillTemp2 = null;
	this.isPriceEnabledTemp2 = null;
	this.autoDQDelayTemp2 = null;
	this.hitPriceVariationForSTPTemp2 = null;
	
	//Added by Michael on 2004-04-22
	this.beforeModifyHigh = null;
	this.beforeModifyLow = null;

	this.summaryGroupId = null;
	this.summaryGroupCode = "";
	this.summaryUnit = 1.00;
	this.summaryQuantity = 1.00;

	this.buyLot = 0.00;
	this.sellLot = 0.00;
	this.lastLot = 0.00;
	this.lastSales = "";
	this.isBuy = "";
	
    this._LimitParameter = new LimitParameter();

	this.allowLMT = function () {
	    return (this.orderTypeMask & 2) == 2;
	};

	this.clearTempValues = function () {
	    this.originTypeTemp = null;
	    this.allowedSpotTradeOrderSidesTemp = null;
	    this.originInactiveTimeTemp = null;
	    this.alertVariationTemp = null;
	    this.normalWaitTimeTemp = null;
	    this.alertWaitTimeTemp = null;

	    this.maxDQLotTemp = null;
	    this.maxOtherLotTemp = null;
	    this.dqQuoteMinLotTemp = null;
	    this.autoDQMaxLotTemp = null;
	    this.autoLmtMktMaxLotTemp = null;
	    this.acceptDQVariationTemp = null;
	    this.acceptLmtVariationTemp = null;
	    this.acceptCloseLmtVariationTemp = null;
	    this.cancelLmtVariationTemp = null;
	    this.maxMinAdjustTemp = null;
	    this.isBetterPriceTemp = null;
	    this.autoAcceptMaxLotTemp = null;
	    this.autoCancelMaxLotTemp = null;
	    this.allowedNewTradeSidesTemp = null;
	    this.hitTimesTemp = null;
	    this.penetrationPointTemp = null;
	    this.priceValidTimeTemp = null;
	    this.lastAcceptTimeSpanTemp = null;

	    //Added by Edward on 2009-01-22
	    this.isAutoEnablePriceTemp = null;
	    this.isAutoFillTemp = null;
	    this.isPriceEnabledTemp = null;
	    this.autoDQDelayTemp = null;
	    this.hitPriceVariationForSTPTemp = null;
	};
	//method
	this.UpdateByDataRow = function (row) {
	    this.code = row("code");
	    this.summaryGroupId = row("summaryGroupId");
	    this.summaryGroupCode = (row("summaryGroupCode") == null) ? "" : row("summaryGroupCode");
	    this.summaryUnit = row("summaryUnit");
	    this.summaryQuantity = row("summaryQuantity");
	    this.originCode = row("originCode");
	    this.isActive = row("isActive");
	    this.autoCancelMaxLot = row("autoCancelMaxLot");
	    this.autoAcceptMaxLot = row("autoAcceptMaxLot");
	    this.allowedNewTradeSides = row("allowedNewTradeSides");
	    this.beginTime = new Date(row("beginTime"));
	    this.endTime = new Date(row("endTime"));
	    this.numeratorUnit = row("numeratorUnit");
	    this.denominator = row("denominator");
	    this.isSinglePrice = row("isSinglePrice");
	    this.isNormal = row("isNormal");
	    this.originType = row("originType");
	    this.allowedSpotTradeOrderSides = row("allowedSpotTradeOrderSides");
	    this.originInactiveTime = row("originInactiveTime");
	    this.alertVariation = row("alertVariation");
	    this.normalWaitTime = row("normalWaitTime");
	    this.alertWaitTime = row("alertWaitTime");
	    this.maxDQLot = row("maxDQLot");
	    this.maxOtherLot = row("maxOtherLot");
	    this.dqQuoteMinLot = row("dqQuoteMinLot");

	    this.orderTypeMask = row("OrderTypeMask");

	    //Modified by Michael on 2003-11-19
	    this.autoDQMaxLot = row("autoDQMaxLot");
	    this.autoLmtMktMaxLot = row("autoLmtMktMaxLot");

	    this.originInactiveTimeTemp2 = row("originInactiveTime");
	    this.alertVariationTemp2 = row("alertVariation");
	    this.normalWaitTimeTemp2 = row("normalWaitTime");
	    this.alertWaitTimeTemp2 = row("alertWaitTime");
	    this.maxDQLotTemp2 = row("maxDQLot");
	    this.maxOtherLotTemp2 = row("maxOtherLot");
	    this.dqQuoteMinLotTemp2 = row("dqQuoteMinLot");
	    this.autoDQMaxLotTemp2 = row("autoDQMaxLot");
	    this.autoLmtMktMaxLotTemp2 = row("autoLmtMktMaxLot");
	    this.acceptDQVariationTemp2 = row("acceptDQVariation");
	    this.acceptLmtVariationTemp2 = row("acceptLmtVariation");
	    this.acceptCloseLmtVariationTemp2 = row("acceptCloseLmtVariation");
	    this.cancelLmtVariationTemp2 = row("cancelLmtVariation");
	    this.maxMinAdjustTemp2 = row("maxMinAdjust");
	    this.isBetterPriceTemp2 = row("isBetterPrice");
	    this.autoAcceptMaxLotTemp2 = row("autoAcceptMaxLot");
	    this.autoCancelMaxLotTemp2 = row("autoCancelMaxLot");
	    this.allowedNewTradeSidesTemp2 = row("allowedNewTradeSides");
	    this.hitTimesTemp2 = row("hitTimes");
	    this.penetrationPointTemp2 = row("penetrationPoint");
	    this.priceValidTimeTemp2 = row("priceValidTime");
	    this.lastAcceptTimeSpanTemp2 = row("lastAcceptTimeSpan");

	    this.acceptDQVariation = row("acceptDQVariation");
	    this.acceptLmtVariation = row("acceptLmtVariation");
	    this.acceptCloseLmtVariation = row("acceptCloseLmtVariation");
	    this.cancelLmtVariation = row("cancelLmtVariation");
	    this.maxMinAdjust = row("maxMinAdjust");
	    this.isBetterPrice = row("isBetterPrice");
	    this.autoAcceptMaxLot = row("autoAcceptMaxLot");
	    this.autoCancelMaxLot = row("autoCancelMaxLot");
	    this.allowedNewTradeSides = row("allowedNewTradeSides");
	    this.hitTimes = row("hitTimes");
	    this.penetrationPoint = row("penetrationPoint");
	    this.priceValidTime = row("priceValidTime");
	    this.dailyMaxMove = row("dailyMaxMove");
	    this.lastAcceptTimeSpan = row("lastAcceptTimeSpan");
	    this.previousClosePrice = (row("Close") == null) ? null : ObjectPool.GetCorrectPriceHelper(row("Close").toString(), this.numeratorUnit, this.denominator);
	    this.nextDayOpenTime = (row("NextDayOpenTime") == null) ? null : new Date(row("NextDayOpenTime"));
	    this.dayOpenTime = (row("DayOpenTime") == null) ? null : new Date(row("DayOpenTime"));
	    this.mocTime = (row("MOCTime") == null) ? null : new Date(row("MOCTime"));
	    this.mit = row("mit");

	    this.isAutoEnablePrice = row("IsAutoEnablePrice");
	    this.isAutoFill = row("IsAutoFill");
	    this.isPriceEnabled = row("IsPriceEnabled");
	    this.autoDQDelay = row("AutoDQDelay");
	    this.hitPriceVariationForSTP = row("HitPriceVariationForSTP");

	    this.isAutoEnablePriceTemp2 = row("IsAutoEnablePrice");
	    this.isAutoFillTemp2 = row("IsAutoFill");
	    this.isPriceEnabledTemp2 = row("IsPriceEnabled");
	    this.autoDQDelayTemp2 = row("AutoDQDelay");
	    this.hitPriceVariationForSTPTemp2 = row("HitPriceVariationForSTP");

	    this.buyLot = row("BuyLot");
	    this.sellLot = row("SellLot");

	    this.lastLot = 0.00;
	    this.lastSales = "";
	};

	this.UpdateByXmlNode = function (rowNode) {
	    for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
	        var attribute = rowNode.attributes.item(index);
	        switch (attribute.nodeName) {
	            case "Code":
	                this.code = attribute.nodeValue;
	                break;
	            case "SummaryGroupId":
	                if (attribute.nodeValue == "") {
	                    this.summaryGroupId = null;
	                    this.summaryGroupCode = "";
	                }
	                else {
	                    this.summaryGroupId = attribute.nodeValue;
	                }
	                break;
	            case "SummaryGroupCode":
	                this.summaryGroupCode = attribute.nodeValue;
	                break;
	            case "SummaryUnit":
	                this.summaryUnit = parseFloat(attribute.nodeValue);
	                break;
	            case "SummaryQuantity":
	                this.summaryQuantity = parseFloat(attribute.nodeValue);
	                break;
	            case "OriginCode":
	                this.originCode = attribute.nodeValue;
	                break;
	            case "AutoAcceptMaxLot":
	                this.autoAcceptMaxLot = parseFloat(attribute.nodeValue);
	                break;
	            case "AutoCancelMaxLot":
	                this.autoCancelMaxLot = parseFloat(attribute.nodeValue);
	                break;
	            case "AllowedNewTradeSides":
	                this.allowedNewTradeSides = parseInt(attribute.nodeValue);
	                break;
	            case "IsActive":
	                this.isActive = attribute.nodeValue.toLowerCase() == "true" ? true : false;
	                break;
	            case "NumeratorUnit":
	                this.numeratorUnit = parseInt(attribute.nodeValue);
	                break;
	            case "Denominator":
	                this.denominator = parseInt(attribute.nodeValue);
	                break;
	            case "IsSinglePrice":
	                this.isSinglePrice = attribute.nodeValue.toLowerCase() == "true" ? true : false;
	                break;
	            case "IsNormal":
	                this.isNormal = attribute.nodeValue.toLowerCase() == "true" ? true : false;
	                break;
	            case "OriginType":
	                this.originType = parseInt(attribute.nodeValue);
	                break;
	            case "AllowedSpotTradeOrderSides":
	                this.allowedSpotTradeOrderSides = parseInt(attribute.nodeValue);
	                break;
	            case "OriginInactiveTime":
	                this.originInactiveTime = parseInt(attribute.nodeValue);
	                this.originInactiveTimeTemp2 = this.originInactiveTime;
	                break;
	            case "AlertVariation":
	                this.alertVariation = parseInt(attribute.nodeValue);
	                this.alertVariationTemp2 = this.alertVariation;
	                break;
	            case "NormalWaitTime":
	                this.normalWaitTime = parseInt(attribute.nodeValue);
	                this.normalWaitTimeTemp2 = this.normalWaitTime;
	                break;
	            case "AlertWaitTime":
	                this.alertWaitTime = parseInt(attribute.nodeValue);
	                this.alertWaitTimeTemp2 = this.alertWaitTime;
	                break;
	            case "MaxDQLot":
	                //Modified by Michael on 2005-04-08
	                //this.maxDQLot = parseInt(attribute.nodeValue);
	                this.maxDQLot = parseFloat(attribute.nodeValue);

	                this.maxDQLotTemp2 = this.maxDQLot;
	                break;
	            case "MaxOtherLot":
	                //Modified by Michael on 2005-04-08
	                //this.maxOtherLot = parseInt(attribute.nodeValue);
	                this.maxOtherLot = parseFloat(attribute.nodeValue);

	                this.maxOtherLotTemp2 = this.maxOtherLot;
	                break;
	            case "DQQuoteMinLot":
	                //Modified by Michael on 2005-04-08
	                //this.dqQuoteMinLot = parseInt(attribute.nodeValue);
	                this.dqQuoteMinLot = parseFloat(attribute.nodeValue);

	                this.dqQuoteMinLotTemp2 = this.dqQuoteMinLot;
	                break;
	            case "OrderTypeMask":
	                this.orderTypeMask = parseInt(attribute.nodeValue);
	                break;
	            case "AutoDQMaxLot":
	                //Modified by Michael on 2005-04-08
	                //this.autoDQMaxLot = parseInt(attribute.nodeValue);
	                this.autoDQMaxLot = parseFloat(attribute.nodeValue);

	                //Added by Michael on 2003-11-19
	                this.autoDQMaxLotTemp2 = this.autoDQMaxLot;
	                break;
	            case "AutoLmtMktMaxLot":
	                //Modified by Michael on 2005-04-08
	                //this.autoLmtMktMaxLot = parseInt(attribute.nodeValue);
	                this.autoLmtMktMaxLot = parseFloat(attribute.nodeValue);

	                //Added by Michael on 2003-11-19
	                this.autoLmtMktMaxLotTemp2 = this.autoLmtMktMaxLot;
	                break;
	            case "AcceptDQVariation":
	                this.acceptDQVariation = parseInt(attribute.nodeValue);
	                this.acceptDQVariationTemp2 = this.acceptDQVariation;
	                break;
	            case "AcceptLmtVariation":
	                this.acceptLmtVariation = parseInt(attribute.nodeValue);
	                this.acceptLmtVariationTemp2 = this.acceptLmtVariation;
	                break;
	            case "AcceptCloseLmtVariation":
	                this.acceptCloseLmtVariation = parseInt(attribute.nodeValue);
	                this.acceptCloseLmtVariationTemp2 = this.acceptCloseLmtVariation;
	                break;
	            case "CancelLmtVariation":
	                this.cancelLmtVariation = parseInt(attribute.nodeValue);
	                this.cancelLmtVariationTemp2 = this.cancelLmtVariation;
	                break;
	            case "MaxMinAdjust":
	                this.maxMinAdjust = parseInt(attribute.nodeValue);
	                this.maxMinAdjustTemp2 = this.maxMinAdjust;
	                break;
	            case "IsBetterPrice":
	                this.isBetterPrice = attribute.nodeValue.toLowerCase() == "true";
	                this.isBetterPriceTemp2 = this.isBetterPrice;
	                break;
	            case "AutoAcceptMaxLot":
	                this.autoAcceptMaxLot = parseFloat(attribute.nodeValue);
	                this.autoAcceptMaxLotTemp2 = this.autoAcceptMaxLot;
	                break;
	            case "AutoCancelMaxLot":
	                this.autoCancelMaxLot = parseFloat(attribute.nodeValue);
	                this.autoCancelMaxLotTemp2 = this.autoCancelMaxLot;
	                break;
	            case "AllowedNewTradeSides":
	                this.allowedNewTradeSides = parseInt(attribute.nodeValue);
	                this.allowedNewTradeSidesTemp2 = this.allowedNewTradeSides;
	                break;
	            case "HitTimes":
	                this.hitTimes = parseInt(attribute.nodeValue);
	                this.hitTimesTemp2 = this.hitTimes;
	                break;
	            case "PenetrationPoint":
	                this.penetrationPoint = parseInt(attribute.nodeValue);
	                this.penetrationPointTemp2 = this.penetrationPoint;
	                break;
	            case "PriceValidTime":
	                this.priceValidTime = parseInt(attribute.nodeValue);
	                this.priceValidTimeTemp2 = this.priceValidTime;
	                break;
	            case "DailyMaxMove":
	                this.dailyMaxMove = parseInt(attribute.nodeValue);
	                this.dailyMaxMove = isNaN(this.dailyMaxMove) ? null : this.dailyMaxMove;
	                break;
	            case "LastAcceptTimeSpan":
	                this.lastAcceptTimeSpan = parseInt(attribute.nodeValue);
	                this.lastAcceptTimeSpanTemp2 = this.lastAcceptTimeSpan;
	                break;

	            case "Close":
	                this.previousClosePrice = ObjectPool.GetCorrectPriceHelper(attribute.nodeValue, this.numeratorUnit, this.denominator);
	                break;
	            case "NextDayOpenTime":
	                this.nextDayOpenTime = new Date(attribute.nodeValue.replace(/-/g, "/"));
	                break;
	            case "DayOpenTime":
	                this.dayOpenTime = new Date(attribute.nodeValue.replace(/-/g, "/"));
	                break;
	            case "MOCTime":
	                this.mocTime = new Date(attribute.nodeValue.replace(/-/g, "/"));
	                break;
	            case "Mit":
	                this.mit = attribute.nodeValue.toLowerCase() == "true";
	                break;
	            case "IsAutoEnablePrice":
	                this.isAutoEnablePrice = attribute.nodeValue.toLowerCase() == "true";
	                this.isAutoEnablePriceTemp2 = this.isAutoEnablePrice;
	                break;
	            case "IsAutoFill":
	                this.isAutoFill = attribute.nodeValue.toLowerCase() == "true";
	                this.isAutoFillTemp2 = this.isAutoFill;
	                break;
	            case "IsPriceEnabled":
	                if (attribute.nodeValue.toLowerCase() != "true") {
	                    this.mainWindow.oDealingConsole.PlaySound(SoundOption.Inactive);
	                }
	                this.isPriceEnabled = attribute.nodeValue.toLowerCase() == "true" ? true : false;
	                this.isPriceEnabledTemp2 = this.isPriceEnabled;
	                break;
	            case "AutoDQDelay":
	                this.autoDQDelay = this.autoDQDelayTemp2 = parseInt(attribute.nodeValue);
	                break;
	            case "HitPriceVariationForSTP":
	                this.hitPriceVariationForSTP = this.hitPriceVariationForSTPTemp2 = parseInt(attribute.nodeValue);
	                break;
	            case "BuyLot":
	                this.buyLot = parseFloat(attribute.nodeValue);
	                break;
	            case "SellLot":
	                this.sellLot = parseFloat(attribute.nodeValue);
	                break;
	            case "LastLot":
	                this.lastLot = parseFloat(attribute.nodeValue);
	                break;
	        }
	    }

	    this.RefreshBackColor();
	};
    
	this.AddQuotePolicyDetail = function (quotePolicyDetail) {
	    if (this.id != quotePolicyDetail.instrumentID) return;

	    this.quotePolicyDetails.Item(quotePolicyDetail.quotePolicyID) = quotePolicyDetail;
	};

	this.DeleteQuotePolicyDetail = function (quotePolicyDetail) {
	    if (this.id != quotePolicyDetail.instrumentID) return;

	    if (this.quotePolicyDetails.Exists(quotePolicyDetail.quotePolicyID))
	        this.quotePolicyDetails.Remove(quotePolicyDetail.quotePolicyID);
	};

	this.AddTradePolicyDetail = function (tradePolicyDetail) {
	    if (this.id != tradePolicyDetail.instrumentID) return;

	    this.tradePolicyDetails.Item(tradePolicyDetail.tradePolicyID) = tradePolicyDetail;
	};

	this.DeleteTradePolicyDetail = function (tradePolicyDetail) {
	    if (this.id != tradePolicyDetail.instrumentID) return;

	    if (this.tradePolicyDetails.Exists(tradePolicyDetail.tradePolicyID))
	        this.tradePolicyDetails.Remove(tradePolicyDetail.tradePolicyID);
	};
	
	//Added by Michael on 2003-10-23
	/*
	this.GetRightCurrentTradeTime = function(serverTime)
	{
		if (this.tradeTimes.Count > 0)
		{
			var minDiff = null;
			var tradeTime = null;
			for (var e = new Enumerator(this.tradeTimes);!e.atEnd();e.moveNext())  
			{
				var key = e.item();
				if (!key) break;
				if (!minDiff)
				{
					if ((this.tradeTimes.Item(key).endTime.valueOf() - serverTime.valueOf()) > 0)
					{
						minDiff = this.tradeTimes.Item(key).endTime.valueOf() - serverTime.valueOf();
						tradeTime = this.tradeTimes.Item(key);
					}	
				}
				else
				{
					var currentDiff = this.tradeTimes.Item(key).endTime.valueOf() - serverTime.valueOf();
					if (currentDiff > 0 && currentDiff < minDiff)
					{
						minDiff = currentDiff;
						tradeTime = this.tradeTimes.Item(key);
					}
				}	
			}
			if (!tradeTime)
			{
				minDiff = null;
				for (var e = new Enumerator(this.tradeTimes);!e.atEnd();e.moveNext())  
				{
					var key = e.item();
					if (!key) break;
					if (!minDiff)
					{
						if (serverTime.valueOf() - this.tradeTimes.Item(key).endTime.valueOf() > 0)
						{
							minDiff = serverTime.valueOf() - this.tradeTimes.Item(key).endTime.valueOf();
							tradeTime = this.tradeTimes.Item(key);
						}	
					}
					else
					{
						var currentDiff = serverTime.valueOf() - this.tradeTimes.Item(key).endTime.valueOf();
						if (currentDiff > 0 && currentDiff < minDiff)
						{
							minDiff = currentDiff;
							tradeTime = this.tradeTimes.Item(key);
						}
					}	
				}
			}
		}
		return (tradeTime);
	};
	*/
	
	//Too slowly
	//var tradingTimeScheduleID = null;
	//this.TradingTimeAddSchedule = function()
	//{
	//	if (tradingTimeScheduleID) this.oScheduler.RemoveSchedule(tradingTimeScheduleID);
	//	tradingTimeScheduleID = this.mainWindow.oScheduler.AddSchedule(this, "SynTradingTime2", null, false, null, this.mainWindow.oSystemTime, null, 2000);
	//};
	
	//Added by Michael on 2003-10-23
	/*
	this.IsRefreshGrid = true;
	//this.SynTradingTime = function(serverTime)
	
	this.SynTradingTime = function()
	{
		var serverTime = this.mainWindow.oSystemTime;
		if (this.tradeTimes.Count > 0)
		{
			for (var e = new Enumerator(this.tradeTimes);!e.atEnd();e.moveNext())  
			{
				var key = e.item();
				if (!key) break;
				var beginTime = this.tradeTimes.Item(key).beginTime;
				var endTime = this.tradeTimes.Item(key).endTime;
				if (serverTime >= beginTime && serverTime <= endTime)
				{	
					var oldBeginTime = null;
					if(this.currentTradeTime)
						oldBeginTime = this.currentTradeTime.beginTime;
					this.currentTradeTime = this.tradeTimes.Item(key);
					
					//this.tradeTimes.Remove(key);
					
					if (!oldBeginTime || this.currentTradeTime.beginTime != oldBeginTime)
					{	
						this.isTrading = true;
						if (this.isActive == false) this.isTrading = false;
						this.mainWindow.UpdateTradeTime(this);
						this.IsRefreshGrid = true;	
					}	
					break;
				}
			}
			if(!this.currentTradeTime)
			{
				this.currentTradeTime = this.GetRightCurrentTradeTime(serverTime);
			}
			if(!this.currentTradeTime)
			{
				if (this.IsRefreshGrid == true)
				{
					this.isTrading = false;
					this.mainWindow.UpdateTradeTime(this);
					this.IsRefreshGrid = false;
				}	
				return;
			}	
			var isTrading = (serverTime >= this.currentTradeTime.beginTime && serverTime <= this.currentTradeTime.endTime);
			if(isTrading != this.isTrading)
			{
				this.currentTradeTime = this.GetRightCurrentTradeTime(serverTime);
				if(this.currentTradeTime)
					isTrading = (serverTime >= this.currentTradeTime.beginTime && serverTime <= this.currentTradeTime.endTime);
				this.isTrading = isTrading;
				if (this.isActive == false) this.isTrading = false;
				this.mainWindow.UpdateTradeTime(this);
			}
			if (isTrading == false)
			{
				if (this.isActive == false) isTrading = false;
				if (this.IsRefreshGrid == true)
				{
					this.mainWindow.UpdateTradeTime(this);
					this.IsRefreshGrid = false;
				}	
			}	
		}
	};
	*/

	this.SynTradingTime2 = function (now) {
	    //var now = this.mainWindow.oSystemTime;
	    if (this.currentTradeTime) {
	        var isTrading = (now >= this.currentTradeTime.beginTime && now < this.currentTradeTime.endTime);
	        if (isTrading != this.isTrading)	//Trade status has changed
	        {
	            this.isTrading = isTrading;
	            //this.mainWindow.UpdateTradeTime(this);
	            this.SetIsUpdateTradingTime();

	            //Added by Michael on 2006-10-08
	            //this.ChangeAutoToManual();
	        }
	        else
	            return;
	    }

	    var tradeTimes = (new VBArray(this.tradeTimes.Items())).toArray();
	    for (var index = 0, count = tradeTimes.length; index < count; index++) {
	        var tradeTime = tradeTimes[index];
	        if (!this.currentTradeTime)
	            this.currentTradeTime = tradeTime;

	        if (tradeTime.endTime > now) {
	            this.currentTradeTime = tradeTime;
	            break;
	        }
	    }

	    this.isTrading = (this.currentTradeTime && now >= this.currentTradeTime.beginTime && now < this.currentTradeTime.endTime);
	    //this.mainWindow.UpdateTradeTime(this);
	    this.SetIsUpdateTradingTime();
	};
	
	//Added by Michael on 2006-10-08
	this.ChangeAutoToManual = function () {
	    //		if(this.mainWindow.oAutoConfirm == 1)
	    //		{
	    this.mainWindow.oIOProxy.UpdateInstrumentForAutoToManual2(this);
	    //		}
	};

	this.UpdateInstrumentForAutoToManual2Result = function () {
	    //		this.autoDQMaxLot = 0.0;
	    //		this.autoLmtMktMaxLot = 0.0;
	    this.isAutoFill = false;
	    this.mainWindow.OnQuotationPropertiesChangedForAutoToManual(this);
	    if (this.mainWindow.oCurrentInstrumentID == this.id) this.mainWindow.OnPropertyInstrumentChanged(this);
	};

	this.ConfirmParamValue = function (property, value, isAccept, isSetValue) {
	    switch (property) {
	        case "OriginType":
	            if (isAccept)
	                this.originType = value;
	            this.originTypeTemp = null;
	            break;
	        case "AllowedSpotTradeOrderSides":
	            if (isAccept)
	                this.allowedSpotTradeOrderSides = value;
	            this.allowedSpotTradeOrderSidesTemp = null;
	            break;
	        case "OriginInactiveTime":
	            if (isAccept) {
	                this.originInactiveTime = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.originInactiveTimeTemp2 = value;
	                }
	            }
	            this.originInactiveTimeTemp = null;
	            break;
	        case "AlertVariation":
	            if (isAccept) {
	                this.alertVariation = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.alertVariationTemp2 = value;
	                }
	            }
	            this.alertVariationTemp = null;
	            break;
	        case "NormalWaitTime":
	            if (isAccept) {
	                this.normalWaitTime = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.normalWaitTimeTemp2 = value;
	                }
	            }
	            this.normalWaitTimeTemp = null;
	            break;
	        case "AlertWaitTime":
	            if (isAccept) {
	                this.alertWaitTime = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.alertWaitTimeTemp2 = value;
	                }
	            }
	            this.alertWaitTimeTemp = null;
	            break;
	        case "MaxDQLot":
	            if (isAccept) {
	                this.maxDQLot = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.maxDQLotTemp2 = value;
	                }
	            }
	            this.maxDQLotTemp = null;
	            break;
	        case "MaxOtherLot":
	            if (isAccept) {
	                this.maxOtherLot = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.maxOtherLotTemp2 = value;
	                }
	            }
	            this.maxOtherLotTemp = null;
	            break;
	        case "DQQuoteMinLot":
	            if (isAccept) {
	                this.dqQuoteMinLot = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.dqQuoteMinLotTemp2 = value;
	                }
	            }
	            this.dqQuoteMinLotTemp = null;
	            break;
	        case "AutoDQMaxLot":
	            if (isAccept) {
	                //Added by Michael on 2003-11-19
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.autoDQMaxLotTemp2 = value;
	                }

	                this.autoDQMaxLot = value;
	            }
	            this.autoDQMaxLotTemp = null;
	            break;
	        case "AutoLmtMktMaxLot":
	            if (isAccept) {
	                //Added by Michael on 2003-11-19
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.autoLmtMktMaxLotTemp2 = value;
	                }

	                this.autoLmtMktMaxLot = value;
	            }
	            this.autoLmtMktMaxLotTemp = null;
	            break;
	        case "AcceptDQVariation":
	            if (isAccept) {
	                this.acceptDQVariation = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.acceptDQVariationTemp2 = value;
	                }
	            }
	            this.acceptDQVariationTemp = null;
	            break;
	        case "AcceptLmtVariation":
	            if (isAccept) {
	                this.acceptLmtVariation = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.acceptLmtVariationTemp2 = value;
	                }
	            }
	            this.acceptLmtVariationTemp = null;
	            break;
	        case "AcceptCloseLmtVariation":
	            if (isAccept) {
	                this.acceptCloseLmtVariation = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.acceptCloseLmtVariationTemp2 = value;
	                }
	            }
	            this.acceptCloseLmtVariationTemp = null;
	            break;
	        case "CancelLmtVariation":
	            if (isAccept) {
	                this.cancelLmtVariation = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.cancelLmtVariationTemp2 = value;
	                }
	            }
	            this.cancelLmtVariationTemp = null;
	            break;
	        case "MaxMinAdjust":
	            if (isAccept) {
	                this.maxMinAdjust = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.maxMinAdjustTemp2 = value;
	                }
	            }
	            this.maxMinAdjustTemp = null;
	            break;
	        case "IsBetterPrice":
	            if (isAccept) {
	                this.isBetterPrice = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.isBetterPriceTemp2 = value;
	                }
	            }
	            this.isBetterPriceTemp = null;
	            break;
	        case "AutoAcceptMaxLot":
	            if (isAccept) {
	                this.autoAcceptMaxLot = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.autoAcceptMaxLotTemp2 = value;
	                }
	            }
	            this.autoAcceptMaxLotTemp = null;
	            break;
	        case "AutoCancelMaxLot":
	            if (isAccept) {
	                this.autoCancelMaxLot = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.autoCancelMaxLotTemp2 = value;
	                }
	            }
	            this.autoCancelMaxLotTemp = null;
	            break;
	        case "AllowedNewTradeSides":
	            if (isAccept) {
	                this.allowedNewTradeSides = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.allowedNewTradeSidesTemp2 = value;
	                }
	            }
	            this.allowedNewTradeSidesTemp = null;
	            break;
	        case "HitTimes":
	            if (isAccept) {
	                this.hitTimes = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.hitTimesTemp2 = value;
	                }
	            }
	            this.hitTimesTemp = null;
	            break;
	        case "PenetrationPoint":
	            if (isAccept) {
	                this.penetrationPoint = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.penetrationPointTemp2 = value;
	                }
	            }
	            this.penetrationPointTemp = null;
	            break;
	        case "PriceValidTime":
	            if (isAccept) {
	                this.priceValidTime = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.priceValidTimeTemp2 = value;
	                }
	            }
	            this.priceValidTimeTemp = null;
	            break;
	        case "LastAcceptTimeSpan":
	            if (isAccept) {
	                this.lastAcceptTimeSpan = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.lastAcceptTimeSpanTemp2 = value;
	                }
	            }
	            this.lastAcceptTimeSpanTemp = null;
	            break;

	        case "IsAutoEnablePrice":
	            if (isAccept) {
	                this.isAutoEnablePrice = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.isAutoEnablePriceTemp2 = value;
	                }
	            }
	            this.isAutoEnablePriceTemp = null;
	            break;

	        case "IsAutoFill":
	            if (isAccept) {
	                this.isAutoFill = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.isAutoFillTemp2 = value;
	                }
	            }
	            this.isAutoFillTemp = null;
	            break;

	        case "IsPriceEnabled":
	            if (isAccept) {
	                if (value == false && this.isPriceEnabled == true) {
	                    this.mainWindow.oDealingConsole.PlaySound(SoundOption.Inactive);
	                }
	                this.isPriceEnabled = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.isPriceEnabledTemp2 = value;
	                }
	            }
	            this.isPriceEnabledTemp = null;
	            break;

	        case "AutoDQDelay":
	            if (isAccept) {
	                this.autoDQDelay = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.autoDQDelayTemp2 = value;
	                }
	            }
	            this.autoDQDelayTemp = null;
	            break;
	        case "HitPriceVariationForSTP":
	            if (isAccept) {
	                this.hitPriceVariationForSTP = value;
	                if (typeof (isSetValue) == 'undefined' || isSetValue == false) {
	                    this.hitPriceVariationForSTPTemp2 = value;
	                }
	            }
	            this.hitPriceVariationForSTPTemp = null;
	            break;
	        default:
	            break;
	    }

	    this.RefreshBackColor();
	    //	    var vsflexGrid = this.mainWindow.vsflexQuotation;
	    //	    var line = vsflexGrid.FindRow(this.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(instrumentColKey.ID), true, true);
	    //	    SetInstrumentBackColor(this, vsflexGrid, line);	    
	};

	this.RefreshBackColor = function () {
	    var vsflexGrid = this.mainWindow.vsflexQuotation;
	    var line = vsflexGrid.FindRow(this.id, vsflexGrid.FixedRows, vsflexGrid.ColIndex(instrumentColKey.ID), true, true);
	    SetInstrumentBackColor(this, vsflexGrid, line);
	};

//	this.OriginInactiveTimeout = function() {

//	    oIOProxy.Debug("OriginInactiveTimeout");

//	    if (!this.isTrading || !this.isActive) {
//	        oIOProxy.Debug("OriginInactiveTimeout return for !this.isTrading || !this.isActive");
//	        return;
//	    }

//	    if (this.originInactiveTime <= 0) {
//	        oIOProxy.Debug("OriginInactiveTimeout return for this.originInactiveTime <= 0");
//	        return;
//	    }

//	    var now = this.mainWindow.oSystemTime; //new Date();
//	    if (now > this.beginTime && now <= this.endTime) {
//	        oIOProxy.Debug("OriginInactiveTimeout, now > this.beginTime && now <= this.endTime");

//	        if (!this.isDealerInput && !this.isOutOfRange && this.lastOriginActiveTime) {
//	        
//	            oIOProxy.Debug("OriginInactiveTimeout, this.originInactiveTime <= 0");
//	            
//	            //if(this.autoDQMaxLot > 0 || this.autoLmtMktMaxLot > 0 || this.dqQuoteMinLot > 1)
//	            if (this.autoDQMaxLot > 0)// || this.autoLmtMktMaxLot > 0)
//	            {
//	                oIOProxy.Debug("OriginInactiveTimeout, this.autoDQMaxLot > 0");
//	                
//	                var last = this.lastOriginActiveTime;
//	                if (this.lastQuotation && this.lastQuotation.timestamp != null) {
//	                    //Modified by Michael on 2005-09-08
//	                    if (this.lastQuotation.timestamp.getTime() > last.getTime())
//	                        last = this.lastQuotation.timestamp;
//	                }

//	                if ((now.getTime() - last.getTime()) / 1000 >= this.originInactiveTime) {
//	                    oIOProxy.Debug("OriginInactiveTimeout, (now.getTime() - last.getTime()) / 1000 >= this.originInactiveTime");
//	                    this.lastOriginActiveTime = now;
//	                    this.lastOriginActiveTime.setSeconds(now.getSeconds() + oInactiveWaitTime);
//	                    //alert dealer for OriginActiveTimeout
//	                    this.mainWindow.parent.quotationTaskFrm.AddTaskInactive(this);
//	                }
//	            }
//	        }
//	        else {
//	            this.lastOriginActiveTime = now;
//	        }
//	    }
//	};
	
//this.enterLine = "\t\n";
//this.message = "";
	this.SetOriginQuotation2 = function (newQuotation) {
	    //this.lastQuotation.timestamp = newQuotation.timestamp;

	    /*
	    var isGetLastQuotationHigh = false;
	    if (newQuotation.high != null && this.beforeModifyHigh)
	    {
	    if (newQuotation.high.Equal(this.beforeModifyHigh))
	    {
	    isGetLastQuotationHigh = true;
	    //newQuotation.high = this.lastQuotation.high.Clone();
	    newQuotation.high = MergePrice(newQuotation.high,this.lastQuotation.high);
	    }
	    }
	    else if (this.lastQuotation.high != null)		
	    {
	    isGetLastQuotationHigh = true;
	    //newQuotation.high = this.lastQuotation.high.Clone();
	    newQuotation.high = MergePrice(newQuotation.high,this.lastQuotation.high);
	    }
		
	    var isGetLastQuotationLow = false;
	    if (newQuotation.low != null)
	    {
	    if (this.beforeModifyLow && newQuotation.low.Equal(this.beforeModifyLow))
	    {
	    isGetLastQuotationLow = true;
	    //newQuotation.low = this.lastQuotation.low.Clone();
	    newQuotation.low = MergePrice(newQuotation.low,this.lastQuotation.low);
	    }
	    }
	    else if (this.lastQuotation.low != null)		
	    {
	    isGetLastQuotationLow = true;
	    //newQuotation.low = this.lastQuotation.low.Clone();
	    newQuotation.low = MergePrice(newQuotation.low,this.lastQuotation.low);
	    }
	    */

	    //var isGetLastQuotationHigh = false;
//	    if (newQuotation.high != null)// && this.beforeModifyHigh)
//	    {
//	        //newQuotation.high = MergePrice(this.lastQuotation.high,newQuotation.high);

//	        //	isGetLastQuotationHigh = true;			
//	    }
//	    else 
        if (this.lastQuotation.high != null) {
	        //	isGetLastQuotationHigh = true;
	        newQuotation.high = this.lastQuotation.high.Clone();
	        //newQuotation.high = MergePrice(newQuotation.high,this.lastQuotation.high);
	    }

//	    //var isGetLastQuotationLow = false;
//	    if (newQuotation.low != null) {
//	        //	isGetLastQuotationLow = true;						
//	    }
//	    else 
        if (this.lastQuotation.low != null) {
	        //	isGetLastQuotationLow = true;
	        newQuotation.low = this.lastQuotation.low.Clone();
	        //newQuotation.low = MergePrice(newQuotation.low,this.lastQuotation.low);
	    }

	    var origin = this.CalculateOrigin(newQuotation.ask, newQuotation.bid);
	    if (origin == null) {
	        //????
	        this.lastQuotation.timestamp = newQuotation.timestamp;

	        //	if (!isGetLastQuotationHigh && newQuotation.high != null)
	        //	{
	        //		//this.lastQuotation.high = newQuotation.high.Clone();
	        //		this.lastQuotation.high = MergePrice(this.lastQuotation.high,newQuotation.high);
	        //	}

	        //	if (!isGetLastQuotationLow && newQuotation.low != null)
	        //	{
	        //		//this.lastQuotation.low = newQuotation.low.Clone();
	        //		this.lastQuotation.low = MergePrice(this.lastQuotation.low,newQuotation.low);
	        //	}

	        if (newQuotation.bid != null) {
	            this.lastQuotation.bid = MergePrice(this.lastQuotation.bid, newQuotation.bid);
	        }
	        if (newQuotation.ask != null) {
	            this.lastQuotation.ask = MergePrice(this.lastQuotation.ask, newQuotation.ask);
	        }

	        this.nextQuotation = null;
	        if (this.isOutOfRange) {
	            this.mainWindow.parent.quotationTaskFrm.RemoveTaskOutOfRange(this);
	            this.ResetOriginQuotation();
	        }
	        this.SetOriginQuotation(newQuotation);
	    }
	    else {
	        if (!this.isDealerInput)// && !this.isOutOfRange)// && !this.isWaiting)
	        {
	            this.nextQuotation = null;
	            if (this.isOutOfRange) {
	                this.mainWindow.parent.quotationTaskFrm.RemoveTaskOutOfRange(this);
	                this.ResetOriginQuotation();
	            }
	            this.SetOriginQuotation(newQuotation);
	        }
	        else {
	            //this.nextQuotation = newQuotation.Clone();
	            this.nextQuotation = MergeQuotation(this.nextQuotation, newQuotation);
	        }
	    }
	    this.mainWindow.oDealingConsole.InstrumentLimit(this, newQuotation);
	};

	this.SetOriginQuotation = function (quotation) {
	    if (!quotation) return;
	    var needRegisterUpdatedInstrument = false;
	    //var bt = new Date();

	    //finish last Quotation Process
	    if (!this.isDealerInput && !this.isOutOfRange) {
	        this.CalculateAllOverrideQuotation(false);
	        //this.message += "instrument.SetOriginQuotation.CalculateAllOverrideQuotation--" + (new Date() - bt).toString() + this.enterLine;	
	        //bt = new Date();	

	    }

	    //this.originQuotation = quotation.Clone();
	    this.originQuotation = MergeQuotation(this.originQuotation, quotation);

	    /*if(this.priceType == PriceType.Watch)
	    {
	    //update UI for Quotation
	    this.mainWindow.UpdateOriginQuotation(this);
	    return;
	    }
	    else*/
	    {
	        if (!this.isDealerInput) {
	            this.CalculateOriginQuotation();

	            //backup this.originQuotation
	            //this.backQuotation = this.originQuotation.Clone();
	            this.backQuotation = MergeQuotation(this.backQuotation, this.originQuotation);
	            this.SetFlashSourceBidPriceCount(this.mainWindow.oFlashPriceTime, false);
	            this.SetNeedUpdateOriginQuotation(false);
	            needRegisterUpdatedInstrument = true;
	            //	            this.mainWindow.UpdateOriginQuotation(this);
	            //	            var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
	            //	            instantOrderByInstrumentIFrame._InstantOrderListFrame1.UpdateOriginQuotation(this);
	            //	            instantOrderByInstrumentIFrame._InstantOrderListFrame2.UpdateOriginQuotation(this);
	            //	            instantOrderByInstrumentIFrame._InstantOrderListFrame3.UpdateOriginQuotation(this);
	            //	            instantOrderByInstrumentIFrame._InstantOrderListFrame4.UpdateOriginQuotation(this);
	        }

	        this.ResetWaitTime(false);
	        needRegisterUpdatedInstrument = true;
	        //this.mainWindow.ResetWaitTime(this);

	        var quotePolicyID = this.mainWindow.oCurrentQuotePolicyDetailID;
	        var quotePolicyDetail = this.GetQuotePolicyDetail(quotePolicyID);

	        //this.message += "instrument.SetOriginQuotation.GetQuotePolicyDetail--" + (new Date() - bt).toString() + this.enterLine;	
	        //bt = new Date();			

	        if (quotePolicyDetail && quotePolicyDetail.priceType != PriceType.Watch) {
	            this.overrideQuotation = this.CalculateOverrideQuotation(this.originQuotation, quotePolicyDetail); //quotePolicyID);

	            //update UI for OverrideQuotation
	            this.SetFlashBidPriceCount(this.mainWindow.oFlashPriceTime, false);
	            this.SetNeedUpdateOverrideQuotationByOriginArrived(false);
	            needRegisterUpdatedInstrument = true;
	            //this.mainWindow.UpdateOverrideQuotation(this, true);

	            //this.message += "instrument.SetOriginQuotation.UpdateOverrideQuotation--" + (new Date() - bt).toString() + this.enterLine;	
	            //bt = new Date();				
	        }

	        //Modified by Michael on 2008-03-14, dealer input originQuotation.timestamp???
	        if (this.currentTradeTime == null || this.IsFirstOriginQuotation() || (!this.isDealerInput && this.originQuotation.timestamp <= this.currentTradeTime.beginTime)) {
	            this.lastQuotation = MergeQuotation(this.lastQuotation, this.originQuotation);
	            this.ResetOriginQuotation();
	        }
	        else {
	            if (this.IsProblematic()) {
	                if (this.isDealerInput) {
	                    this.SetFlashSourceBidPriceCount(this.mainWindow.oFlashPriceTime, false);
	                    this.SetNeedUpdateOriginQuotation(false);
	                    needRegisterUpdatedInstrument = true;
	                    //                        this.mainWindow.UpdateOriginQuotation(this);
	                    //	                    var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
	                    //	                    instantOrderByInstrumentIFrame._InstantOrderListFrame1.UpdateOriginQuotation(this);
	                    //	                    instantOrderByInstrumentIFrame._InstantOrderListFrame2.UpdateOriginQuotation(this);
	                    //	                    instantOrderByInstrumentIFrame._InstantOrderListFrame3.UpdateOriginQuotation(this);
	                    //	                    instantOrderByInstrumentIFrame._InstantOrderListFrame4.UpdateOriginQuotation(this);
	                }
	                if (this.GetWaitTime() > 0) this.mainWindow.parent.quotationTaskFrm.AddTaskOutOfRange(this);

	                //this.message += "instrument.SetOriginQuotation.UpdateOriginQuotation--" + (new Date() - bt).toString() + this.enterLine;	
	                //bt = new Date();					
	            }
	            else {
	                //Modified by Michael on 2008-03-14
	                if (this.currentTradeTime != null && !this.isDealerInput && this.lastQuotation.timestamp <= this.currentTradeTime.beginTime) {
	                    this.CalculateAllOverrideQuotation(true);
	                    this.lastQuotation = MergeQuotation(this.lastQuotation, this.originQuotation);
	                    this.ResetOriginQuotation();
	                }
	                else {

	                    //old method
	                    if (this.GetWaitTime() == 0 || this.isDealerInput) {
	                        this.CalculateAllOverrideQuotation(this.isDealerInput);

	                        //this.message += "instrument.SetOriginQuotation.CalculateAllOverrideQuotation--" + (new Date() - bt).toString() + this.enterLine;	
	                    }

	                }
	            }
	        }
	    }
	    if (needRegisterUpdatedInstrument) {
	        this.mainWindow.AddNeedUpdateUIInstrument(this);
        }
	};

	this.IsFirstOriginQuotation = function () {
	    return this.lastQuotation == null || this.lastQuotation.timestamp == null;
	};

	//#region UpdateUIParameter
	this._UpdateUIParameter = new UpdateUIParameter(this.mainWindow.oFlashPriceTime);

	this.UpdateOverridedQuoatationParameter = function (overridedQuotationTimestamp, overridedQuotationQuotePolicyID) {
	    this._UpdateUIParameter.UpdateOverridedQuoatationParameter(overridedQuotationTimestamp);
        if (this.mainWindow.oCurrentQuotePolicyDetailID == overridedQuotationQuotePolicyID) {
            this._UpdateUIParameter.UpdateOverridedQuoatationQuotePolicyIDParameter(overridedQuotationQuotePolicyID);
	    }
	    this.mainWindow.AddNeedUpdateUIInstrument(this);
	};

	this.SetNeedUpdateOriginQuotation = function (needRegisterUpdatedInstrument) {
	    this._UpdateUIParameter.SetNeedUpdateOriginQuotation();
	    if (needRegisterUpdatedInstrument) {
	        this.mainWindow.AddNeedUpdateUIInstrument(this);
	    }
	};

	this.SetNeedUpdateOverrideQuotationByOriginArrived = function (needRegisterUpdatedInstrument) {
	    this._UpdateUIParameter.SetNeedUpdateOverrideQuotationByOriginArrived();
	    if (needRegisterUpdatedInstrument) {
	        this.mainWindow.AddNeedUpdateUIInstrument(this);
	    }
	};

	this.SetFlashSourceBidPriceCount = function (value, needRegisterUpdatedInstrument) {
	    this._UpdateUIParameter.SetFlashSourceBidPriceCount(value);
	    if (needRegisterUpdatedInstrument) {
	        this.mainWindow.AddNeedUpdateUIInstrument(this);
	    }
	};

	this.SetFlashBidPriceCount = function (value, needRegisterUpdatedInstrument) {
	    this._UpdateUIParameter.SetFlashBidPriceCount(value);
	    if (needRegisterUpdatedInstrument) {
	        this.mainWindow.AddNeedUpdateUIInstrument(this);
	    }
	};

	this.SetWaitTimeCount = function (value, needRegisterUpdatedInstrument) {
	    this._UpdateUIParameter.SetWaitTimeCount(value);
	    if (needRegisterUpdatedInstrument) {
	        this.mainWindow.AddNeedUpdateUIInstrument(this);
	    }
	};

	this.SetIsUpdateTradingTime = function () {
	    this._UpdateUIParameter.SetIsUpdateTradingTime();
	    this.mainWindow.AddNeedUpdateUIInstrument(this);
	};

	this.SetNeedSingleUpdateOverrideQuotation = function () {
	    this._UpdateUIParameter.SetNeedSingleUpdateOverrideQuotation();
	    this.mainWindow.AddNeedUpdateUIInstrument(this);
	};

	this.SetNeedSingleUpdateQuotationHistorySnap = function () {
	    this._UpdateUIParameter.SetNeedSingleUpdateQuotationHistorySnap();
	    this.mainWindow.AddNeedUpdateUIInstrument(this);
	};
	//#endregion UpdateUIParameter

	this.SetOverridedQuotation = function (newQuotation) {
	    this.UpdateQuotationHistory(newQuotation); //, quotePolicyID);	   
	    this.UpdateOverridedQuoatationParameter(newQuotation.timestamp, newQuotation.quotePolicyID);	    
	    //this.mainWindow.UpdateAdjustTime(this, newQuotation.timestamp);
	};

	this.QuotationCountTimer = function () {
	    var needRegisterUpdatedInstrument = false;
	    if (this._UpdateUIParameter.flashSourceBidPriceCount > 0) {
	        this.SetFlashSourceBidPriceCount(this._UpdateUIParameter.flashSourceBidPriceCount - 1, false);
	        if (this._UpdateUIParameter.flashSourceBidPriceCount == 0) needRegisterUpdatedInstrument = true;
	    }

	    if (this._UpdateUIParameter.flashBidPriceCount > 0) {
	        this.SetFlashBidPriceCount(this._UpdateUIParameter.flashBidPriceCount - 1, false);
	        if (this._UpdateUIParameter.flashBidPriceCount == 0) needRegisterUpdatedInstrument = true;
	    }

	    if (this._UpdateUIParameter.waitTimeCount > 0) {
	        if (!this.isWaiting) {
	            this.SetWaitTimeCount(0, false);
	            needRegisterUpdatedInstrument = true;
	        }
	        else if (this._UpdateUIParameter.waitTimeCount > 0) {
	            this.SetWaitTimeCount(this._UpdateUIParameter.waitTimeCount - 1, false);
	            needRegisterUpdatedInstrument = true;
	        }
	        if (this._UpdateUIParameter.waitTimeCount <= 0) {
	            this.isWaiting = false;
	            if (!this.isDealerInput && !this.isOutOfRange) {
	                this.CalculateAllOverrideQuotation(false);
	            }
	        }
	    }
	    if (needRegisterUpdatedInstrument) {
	        this.mainWindow.AddNeedUpdateUIInstrument(this);
	    }
	};

	this.ResetWaitTime = function (needRegisterUpdatedInstrument) {
	    var waitTime = this.GetWaitTime();
	    this.isWaiting = (waitTime > 0);
	    this.SetWaitTimeCount(waitTime, needRegisterUpdatedInstrument);
	}

	this.ResetOriginQuotation = function () {
    //........???????????????
	    //this.originQuotation = null;

	    if (!this.isDealerInput) {
	        this.isWaiting = false;
	    }
	    this.isDealerInput = false;
	    this.isOutOfRange = false;
	    //this.isWaiting = false;

	    if (this.nextQuotation) {
	        //var quotation = this.nextQuotation;
	        //this.nextQuotation = null;
	        //this.SetOriginQuotation(quotation);

	        var quotation = this.nextQuotation.Clone();
	        this.nextQuotation = null;
	        this.SetOriginQuotation(quotation);
	    }
	};

	this.DiscardOriginQuotationEventMessage = function () {
	    var eventMessage = "";
	    if (this.originQuotation != null && this.originQuotation.origin != null) {
	        eventMessage = "Price Adjust - Dealer add " + this.code + " price at " + this.originQuotation.origin.ToString();
	    }
	    return eventMessage;
	};

	this.DiscardTaskCountTimerTimeoutWriteLog = function () {
	    var eventMessage = this.DiscardOriginQuotationEventMessage();
	    if (eventMessage != "") {
	        this.mainWindow.oIOProxy.DiscardTaskCountTimerTimeoutWriteLog(this.id, eventMessage);
	    }
	};

	this.DiscardOriginQuotation = function () {
	    var eventMessage = this.DiscardOriginQuotationEventMessage();
	    this.mainWindow.oIOProxy.DiscardOriginQuotation(this.id, eventMessage);
	    this.ResetOriginQuotation();
	}

	this.IsProblematic = function (price) {
	    var isAccepted = false;
	    if (!price && this.originQuotation) {
	        if (this.originQuotation.isProblematic && !this.originQuotation.isAccepted) return true;
	        price = this.originQuotation.origin;
	        isAccepted = this.originQuotation.isAccepted;
	    }

	    //Modified by Michael on 2008-03-12		
	    //return ((!price || !this.lastQuotation) ? 
	    //			false : Math.abs( price.SubStract(this.lastQuotation.origin) ) >= this.alertVariation);

	    if (!price || !this.lastQuotation) {
	        return false;
	    }
	    else {
	        if (this.currentTradeTime != null && !this.isDealerInput && this.lastQuotation.timestamp <= this.currentTradeTime.beginTime) {
	            return false;
	        }
	        else {
	            return Math.abs(price.SubStract(this.lastQuotation.origin)) >= this.alertVariation && !isAccepted;
	        }
	    }
	};

	this.GetWaitTime = function () {
	    if (!this.lastQuotation)
	        return 0;
	    else
	        return (this.IsProblematic() ? this.alertWaitTime : this.normalWaitTime);
	};

//	this.SyncQuotePolicyDetails = function (quotePolicys) {
//	    if (!quotePolicys)
//	        return;

//	    this.quotePolicyDetails = new ActiveXObject("Scripting.Dictionary"); //key=QuotePolicyID value=quotePolicyDetail

//	    var _quotePolicys = (new VBArray(quotePolicys.Items())).toArray();   // Get the items.
//	    for (var index1 = 0, count = _quotePolicys.length; index1 < count; index1++) {
//	        var _quotePolicyDetails = (new VBArray(_quotePolicys[index1].quotePolicyDetails.Items())).toArray();
//	        for (var index2 = 0, count2 = _quotePolicyDetails.length; index2 < count2; index2++) {
//	            if (_quotePolicyDetails[index2].instrumentID == this.id/* || _quotePolicys[index1].isDefault*/) {
//	                this.quotePolicyDetails.Item(_quotePolicyDetails[index2].quotePolicyID) = _quotePolicyDetails[index2];

//	                if (_quotePolicys[index1].isDefault)
//	                    this.defaultQuotePolicyID = _quotePolicys[index1].id;
//	                //this.priceType = _quotePolicyDetails[index2].priceType;	//set default _priceType for this Instrument
//	                break;
//	            }
//	        }
//	    }
//	};

//	this.SyncTradePolicyDetails = function (tradePolicys) {
//	    if (!tradePolicys)
//	        return;

//	    this.tradePolicyDetails = new ActiveXObject("Scripting.Dictionary"); //key=TradePolicyID value=tradePolicyDetail

//	    var _tradePolicys = (new VBArray(tradePolicys.Items())).toArray();   // Get the items.
//	    for (var index1 = 0, count = _tradePolicys.length; index1 < count; index1++) {
//	        var _tradePolicyDetails = (new VBArray(_tradePolicys[index1].tradePolicyDetails.Items())).toArray();
//	        for (var index2 = 0, count2 = _tradePolicyDetails.length; index2 < count2; index2++) {
//	            if (_tradePolicyDetails[index2].instrumentID == this.id) {
//	                this.tradePolicyDetails.Add(_tradePolicyDetails[index2].tradePolicyID, _tradePolicyDetails[index2])
//	                break;
//	            }
//	        }
//	    }
//	};
	
	//Added by Jethro on 2003-11-14
	this.CalculateOrigin = function (ask, bid) {
	    var origin = null;
	    if (this.isSinglePrice) {
	        origin = ((ask == null) ? bid : ask);
	    }
	    else {
	        switch (this.originType) {
	            case OriginType.Ask:
	                origin = ask;
	                break;
	            case OriginType.Bid:
	                origin = bid;
	                break;
	            case OriginType.Avg:
	                var prices = null;
	                if (this.originQuotation) {
	                    prices = new Array(this.originQuotation.ask, this.originQuotation.bid);
	                }
	                else {
	                    prices = new Array(ask, bid);
	                }
	                origin = ask.Avg(prices);
	                break;
	        }
	    }

	    return origin;
	};

	this.CalculateOriginQuotation = function () {
	    //var bt = new Date();

	    var originQuotation = this.originQuotation;

	    originQuotation.origin = null;
	    if (this.isSinglePrice) {
	        originQuotation.origin = (originQuotation.ask == null) ? ((originQuotation.bid == null) ? null : originQuotation.bid.Clone()) : originQuotation.ask.Clone();
	        //originQuotation.origin = 
	        //originQuotation.ask.Equal(null) ? originQuotation.bid.Clone() : originQuotation.ask.Clone();
	    }
	    else {
	        switch (this.originType) {
	            case OriginType.Ask:
	                originQuotation.origin = MergePrice(originQuotation.origin, originQuotation.ask);
	                break;
	            case OriginType.Bid:
	                originQuotation.origin = MergePrice(originQuotation.origin, originQuotation.bid);
	                break;
	            case OriginType.Avg:
	                var values = new Array(originQuotation.ask, originQuotation.bid);
	                if (originQuotation.ask != null) originQuotation.origin = originQuotation.ask.Avg(values);
	                break;
	        }
	    }

	    if (!originQuotation.high) originQuotation.high = originQuotation.origin.Clone();
	    if (!originQuotation.low) originQuotation.low = originQuotation.origin.Clone();

	    var quotePolicyDetail = this.GetQuotePolicyDetail(this.defaultQuotePolicyID);

	    //Modified by Michael on 2004-10-11
	    //Old
	    if (quotePolicyDetail == null) return;

	    var spreadPoints = quotePolicyDetail.spreadPoints;

	    this.maxMin.maxAsk = MergePrice(this.maxMin.maxAsk, originQuotation.high);
	    if (this.maxMin.maxAsk != null) this.maxMin.maxBid = this.maxMin.maxAsk.SubStract2(spreadPoints);

	    //this.message += "instrument.CalculateOriginQuotation.originQuotation.maxMin.max--" + (new Date() - bt).toString() + this.enterLine;		
	    //bt = new Date();			
	    this.maxMin.minBid = MergePrice(this.maxMin.minBid, originQuotation.low);
	    if (this.maxMin.minBid != null) this.maxMin.minAsk = this.maxMin.minBid.Add(spreadPoints);

	    //this.message += "instrument.CalculateOriginQuotation.originQuotation.maxMin.min--" + (new Date() - bt).toString() + this.enterLine;		


	    /*
	    //New	
	    if (quotePolicyDetail.priceType == PriceType.Watch)
	    {
	    var diffValue = this.GetSourceAskBidDiffValue();
		
	    this.maxMin.maxAsk = originQuotation.high.Clone();
	    this.maxMin.maxBid = this.maxMin.maxAsk.Add( 0-diffValue );
				
	    this.maxMin.minBid = originQuotation.low.Clone();
	    this.maxMin.minAsk = this.maxMin.minBid.Add( diffValue );
	    }
	    else
	    {	
	    this.maxMin.maxAsk = originQuotation.high.Clone();
	    this.maxMin.maxBid = this.maxMin.maxAsk.Add( 0-quotePolicyDetail.spreadPoints );
				
	    this.maxMin.minBid = originQuotation.low.Clone();
	    this.maxMin.minAsk = this.maxMin.minBid.Add( quotePolicyDetail.spreadPoints );
	    }	
	    */
	};

	this.CalculateOverrideQuotation = function (originQuotation, quotePolicyDetail)// quotePolicyID)
	{
	    var overrideQuotation = null;
	    if (quotePolicyDetail != null)
	    //if(this.quotePolicyDetails.Exists(quotePolicyID) == true)
	    {
	        //var quotePolicyDetail = this.quotePolicyDetails.Item(quotePolicyID);
	        //overrideQuotation = new Quote();
	        overrideQuotation = (this.overrideQuotation == null) ? ObjectPool.GetQuotation() : this.overrideQuotation;
	        overrideQuotation.origin = MergePrice(overrideQuotation.origin, originQuotation.origin);

	        //Modified by Michael on 2004-10-11
	        //Old
	        //Modified by Michael on 2004-12-24
	        var autoAdjustPoints = quotePolicyDetail.autoAdjustPoints;
	        var spreadPoints = quotePolicyDetail.spreadPoints;
	        if (originQuotation != null && quotePolicyDetail.priceType == PriceType.OriginEnable) {
	            if (!this.isDealerInput) {
	                if (originQuotation.bid != null) overrideQuotation.bid = originQuotation.bid.Add(autoAdjustPoints);
	                if (originQuotation.ask != null) overrideQuotation.ask = originQuotation.ask.Add(autoAdjustPoints);
	            }
	            else {
	                if (overrideQuotation.origin != null) overrideQuotation.bid = overrideQuotation.origin.Add(autoAdjustPoints);
	                if (overrideQuotation.bid != null && originQuotation.ask != null) overrideQuotation.ask = overrideQuotation.bid.Add(Math.abs(originQuotation.ask.SubStract(originQuotation.bid)));
	            }
	            if (overrideQuotation.bid != null) overrideQuotation.bid = overrideQuotation.bid.SubStract2(spreadPoints);
	            if (overrideQuotation.ask != null) overrideQuotation.ask = overrideQuotation.ask.Add(spreadPoints);
	        }
	        else {
	            if (overrideQuotation.origin != null) overrideQuotation.bid = overrideQuotation.origin.Add(autoAdjustPoints);
	            if (overrideQuotation.bid != null) overrideQuotation.ask = overrideQuotation.bid.Add(spreadPoints);
	        }
	        /*
	        //New
	        if (quotePolicyDetail.priceType == PriceType.Watch)
	        {
	        var diffValue = this.GetSourceAskBidDiffValue();
				
	        overrideQuotation.bid = overrideQuotation.origin;
	        overrideQuotation.ask = overrideQuotation.bid.Add( diffValue );
	        }
	        else
	        {
	        overrideQuotation.bid = overrideQuotation.origin.Add( quotePolicyDetail.autoAdjustPoints );
	        overrideQuotation.ask = overrideQuotation.bid.Add( quotePolicyDetail.spreadPoints );
	        }
	        */

	        /*if(!quotePolicyDetail.high || overrideQuotation.ask.More( quotePolicyDetail.high ))
	        quotePolicyDetail.high = overrideQuotation.ask.Clone();
	        if(!quotePolicyDetail.low || overrideQuotation.bid.Less( quotePolicyDetail.low ))
	        quotePolicyDetail.low = overrideQuotation.bid.Clone();*/

	        if (quotePolicyDetail.isOriginHiLo) {
	            overrideQuotation.high = MergePrice(overrideQuotation.high, originQuotation.high);
	            overrideQuotation.low = MergePrice(overrideQuotation.low, originQuotation.low);
	        }
	        else {
	            if (quotePolicyDetail.high == null || ((overrideQuotation.ask != null) && overrideQuotation.ask.More(quotePolicyDetail.high)))
	                overrideQuotation.high = MergePrice(overrideQuotation.high, overrideQuotation.ask);
	            else
	                overrideQuotation.high = MergePrice(overrideQuotation.high, quotePolicyDetail.high);

	            if (quotePolicyDetail.low == null || ((overrideQuotation.bid != null) && overrideQuotation.bid.Less(quotePolicyDetail.low)))
	                overrideQuotation.low = MergePrice(overrideQuotation.low, overrideQuotation.bid);
	            else
	                overrideQuotation.low = MergePrice(overrideQuotation.low, quotePolicyDetail.low);
	        }
	    }

	    return overrideQuotation;
	};

	this.CalculateAllOverrideQuotation = function (isDealerConfirm, acceptOutOfRangePrice) {
	    if (!this.originQuotation || !this.originQuotation.origin) return;

	    /*var quotePolicyDetails = (new VBArray(this.quotePolicyDetails.Items())).toArray();   // Get the items.
	    for(var index=0,count=quotePolicyDetails.length;index<count;index++)
	    {
	    var quotePolicyDetail = quotePolicyDetails[index];
	    if(quotePolicyDetail.priceType == PriceType.Watch)
	    continue;

	    var tempQuotation = new Quote();
	    tempQuotation.timestamp = new Date();
	    tempQuotation.origin = this.originQuotation.origin;
	    tempQuotation.bid = tempQuotation.origin.Add( quotePolicyDetail.autoAdjustPoints );
	    tempQuotation.ask = tempQuotation.bid.Add( quotePolicyDetail.spreadPoints );

	    if(tempQuotation.ask.More( quotePolicyDetail.high ))
	    quotePolicyDetail.high = tempQuotation.ask;
	    if(tempQuotation.bid.Less( quotePolicyDetail.low ))
	    quotePolicyDetail.low = tempQuotation.bid;
				
	    if(quotePolicyDetail.isOriginHiLo)
	    {
	    tempQuotation.high = this.originQuotation.high;
	    tempQuotation.low = this.originQuotation.low;
	    }
	    else
	    {
	    tempQuotation.high = quotePolicyDetail.high;
	    tempQuotation.low = quotePolicyDetail.low;
	    }
			
	    quotePolicyDetail.maxAsk = tempQuotation.high.Clone();
	    quotePolicyDetail.maxBid = quotePolicyDetail.maxAsk.Add( 0-quotePolicyDetail.spreadPoints );
				
	    quotePolicyDetail.minBid = tempQuotation.low.Clone();
	    quotePolicyDetail.minAsk = quotePolicyDetail.minBid.Add( quotePolicyDetail.spreadPoints );
				
	    //this.UpdateQuotationHistory(tempQuotation, quotePolicyDetail.quotePolicyID);
	    }*/

	    //add overrideQuotation to outputQuotes for sending to Quotation Server, only send problem quote

	    //if(isDealerConfirm == true)
	    if (isDealerConfirm == true && this.isTrading == true && this.isActive == true) {
	        var eventMessage = "";
	        var acceptOutOfRangePrice2 = false;
	        if (typeof (acceptOutOfRangePrice) != 'undefined' && acceptOutOfRangePrice) {
	            acceptOutOfRangePrice2 = true;
	            var diff = (this.originQuotation.origin != null) ? this.originQuotation.origin.SubStract(this.lastQuotation.origin) : 0;
	            eventMessage = this.code + " new update at " + this.originQuotation.origin.ToString() + " ,diff = " + ((diff == null) ? "" : diff.toString());
	        }
	        this.mainWindow.oIOProxy.SendOverrideQuote(this.id, this.originQuotation, acceptOutOfRangePrice2, eventMessage);
	    }

	    //end of the process of the Quotation
	    //this.lastQuotation = this.originQuotation.Clone();
	    if (typeof (acceptOutOfRangePrice) == 'undefined' || !acceptOutOfRangePrice) {
            this.lastQuotation = MergeQuotation(this.lastQuotation, this.originQuotation);

	        this.ResetOriginQuotation();
	    }
	};

	this.GetFirstQuotePolicyDetail = function () {
	    var quotePolicyDetails2 = (new VBArray(this.quotePolicyDetails.Items())).toArray();
	    for (var index = 0, count = quotePolicyDetails2.length; index < count; index++) {
	        return quotePolicyDetails2[index];
	    }
	};

	this.GetQuotePolicyDetail = function (quotePolicyDetailID) {
	    var quotePolicyDetail = null;
	    if (this.quotePolicyDetails.Exists(quotePolicyDetailID) == true) {
	        quotePolicyDetail = this.quotePolicyDetails.Item(quotePolicyDetailID);
	    }
	    return quotePolicyDetail;
	};

	this.GetTradePolicyDetail = function (tradePolicyDetailID) {
	    var tradePolicyDetail = null;
	    if (this.tradePolicyDetails.Exists(tradePolicyDetailID) == true) {
	        tradePolicyDetail = this.tradePolicyDetails.Item(tradePolicyDetailID);
	    }
	    return tradePolicyDetail;
	};

	this.UpdateQuotationHistory = function (quotation)//, quotePolicyID)
	{
	    var quotePolicyID = quotation.quotePolicyID;
	    if (this.lastOverrideQuotations.Exists(quotePolicyID)) {
	        this.lastOverrideQuotations.Item(quotePolicyID) = quotation.Clone();
	    }
	    else {
	        this.lastOverrideQuotations.Add(quotePolicyID, quotation.Clone());
	    }

	    //calculate quotePolicyDetail's high, low, maxAsk, minAsk, maxBid, minBid
	    if (this.quotePolicyDetails.Exists(quotePolicyID)) {
	        var quotePolicyDetail = this.quotePolicyDetails.Item(quotePolicyID);
	        var maxMin;
	        if (this.maxMins.Exists(quotePolicyID))
	            maxMin = this.maxMins.Item(quotePolicyID);
	        else {
	            maxMin = new MaxMin();
	            this.maxMins.Item(quotePolicyID) = maxMin;
	        }

	        //Modified by Michael on 2011-11-11
	        if (quotation.ask == null && quotation.bid == null) {
	            this.beforeModifyHigh = this.backQuotation.high.Clone();
	            this.beforeModifyLow = this.backQuotation.low.Clone();

	            if (quotation.high) {
	                this.backQuotation.high = quotation.high.Clone();
	                this.maxMin.high = quotation.high.Clone();
	                this.maxMin.maxAsk = quotation.high.Clone();
	            }
	            if (quotation.low) {
	                this.backQuotation.low = quotation.low.Clone();
	                this.maxMin.low = quotation.low.Clone();
	                this.maxMin.minBid = quotation.low.Clone();
	            }
	        }
	        else {
	            if (quotation.ask && quotation.ask.More(maxMin.high))
	                maxMin.high = quotation.ask.Clone();
	            if (quotation.bid && quotation.bid.Less(maxMin.low))
	                maxMin.low = quotation.bid.Clone();
	        }

	        //Modified by Michael on 2004-10-11
	        //Old

	        if (quotation.high) maxMin.maxAsk = quotation.high.Clone();
	        if (maxMin.maxAsk) maxMin.maxBid = maxMin.maxAsk.Add(0 - quotePolicyDetail.spreadPoints);

	        if (quotation.low) maxMin.minBid = quotation.low.Clone();
	        if (maxMin.minBid) maxMin.minAsk = maxMin.minBid.Add(quotePolicyDetail.spreadPoints);
	        /*
	        //New
	        if (quotePolicyDetail.priceType == PriceType.Watch)
	        {
	        var diffValue = this.GetSourceAskBidDiffValue();
				
	        maxMin.maxAsk = quotation.high.Clone();
	        maxMin.maxBid = maxMin.maxAsk.Add( 0-diffValue );
					
	        maxMin.minBid = quotation.low.Clone();
	        maxMin.minAsk = maxMin.minBid.Add( diffValue );
	        }
	        else
	        {
	        maxMin.maxAsk = quotation.high.Clone();
	        maxMin.maxBid = maxMin.maxAsk.Add( 0-quotePolicyDetail.spreadPoints );
					
	        maxMin.minBid = quotation.low.Clone();
	        maxMin.minAsk = maxMin.minBid.Add( quotePolicyDetail.spreadPoints );
	        }	
	        */

	        if (!quotePolicyDetail.isOriginHiLo) {
	            if (this.maxMins.Exists(quotePolicyID)) {
	                var maxMin = this.maxMins.Item(quotePolicyID);
	                if (quotation.high) maxMin.maxAsk = quotation.high.Clone();
	                if (quotation.low) maxMin.minBid = quotation.low.Clone();
	            }
	        }
	    }

	    if (!this.historyQuotess.Exists(quotePolicyID))
	        this.historyQuotess.Add(quotePolicyID, new Array());
	    var historyQuotes = this.historyQuotess.Item(quotePolicyID);
	    if (historyQuotes) {
	        if (quotation.bid && quotation.ask) {
	            this.mainWindow.quotationHistoryCount++;
	            historyQuotes.push(new Array(quotation.timestamp,
												"", //quotation.origin.ToString(),
												quotation.bid.ToString(),
												quotation.ask.ToString(),
                                                this.mainWindow.quotationHistoryCount));
	        }
	        if (historyQuotes.length > this.mainWindow.oMaxHistoryCount) {
	            historyQuotes.shift();
	        }
	    }

	    //        if (quotePolicyID == this.mainWindow.oCurrentQuotePolicyDetailID)// &&
	    //	    //this.id == this.mainWindow.oCurrentInstrumentID)
	    //	    {
	    //	        if (this.id == this.mainWindow.oCurrentInstrumentID) {
	    //	            //update UI for quotation history
	    //	            this.mainWindow.parent.propertyFrm.UpdateQuotationHistory(this);
	    //	        }
	    //	        //Update QuotationUI
	    //	        this.mainWindow.UpdateQuotationHistorySnap(this, true);
	    //	    }
	};
	
	//Modified by Michael on 2004-10-11
	this.GetSourceAskBidDiffValue = function () {
	    var diffValue = 0;

	    if (this.lastQuotation && this.lastQuotation.ask && this.lastQuotation.bid) {
	        diffValue = this.lastQuotation.ask.SubStract(this.lastQuotation.bid);
	        //diffValue = ( this.lastQuotation.ask.ToDouble() - this.lastQuotation.bid.ToDouble() ) * this.denominator;
	    }
	    return diffValue;
	};

	this.IsLimitedPriceByDailyMaxMove = function (adjustPrice) {
	    var isLimited = false;

	    if (adjustPrice == null || this.previousClosePrice == null || this.dailyMaxMove == null || this.dailyMaxMove == 0)
	        isLimited = false;
	    else
	        isLimited = (adjustPrice.More(this.previousClosePrice.Add(this.dailyMaxMove))
				|| adjustPrice.Less(this.previousClosePrice.SubStract2(this.dailyMaxMove)));

	    return isLimited;
	};

	this.LimitedPriceByDailyMaxMovePrompt = function () {
	    return "Out of daily max move,previous close price is " + this.previousClosePrice.ToString();
	};

	this.GetSourceLevelAdjustmentReferenceAutoAdjustPoints = function (currentQuotePolicyID) {
	    if (currentQuotePolicyID == null || currentQuotePolicyID == -1) return "";
	    var quotePolicyDetail = this.GetQuotePolicyDetail(currentQuotePolicyID);
	    if (quotePolicyDetail == null) return ""; // return this.code + ":,";
	    return quotePolicyDetail.autoAdjustPoints.toString();
	};

	var _RepairNewOrderMultiNotifyOrders = new ActiveXObject("Scripting.Dictionary"); //key=id value=null
    //5555
	this.AddOrderProcessBuySellLot = function (order) {
	    if (_RepairNewOrderMultiNotifyOrders.Exists(order.id)) {
	        //_RepairNewOrderMultiNotifyOrders.Remove(order.id);
	        return;
	    }
	    else {
	        _RepairNewOrderMultiNotifyOrders.Add(order.id, order.id);
	    }

	    var isOpen, phase, lotBalance, isBuy, orderRelations;
	    phase = order.tran.phase;
	    lotBalance = order.lotBalance;
	    isOpen = order.isOpen;
	    isBuy = order.isBuy;
	    orderRelations = order.orderRelations;
	    if (phase == TransPhase.Executed || phase == TransPhase.Completed) {
	        this.lastLot = order.lot;
	        this.lastSales = (isBuy ? "B" : "S") + order.executePrice.normalizedValue.toString();
	        this.isBuy = isBuy ? "B" : "S";

	        var quotePolicyDetail = order.GetQuotePolicyDetail();
	        if (isOpen) {
	            this.buyLot += isBuy ? lotBalance : 0.00;
	            this.sellLot += !isBuy ? lotBalance : 0.00;
	            if (quotePolicyDetail != null) {
	                quotePolicyDetail.buyLot += isBuy ? lotBalance : 0.00;
	                quotePolicyDetail.sellLot += !isBuy ? lotBalance : 0.00;
	            }
	        }
	        else {
	            for (var i = 0, count = orderRelations.length; i < count; i++) {
	                var orderRelation = orderRelations[i];
	                var orderRelationIsBuy = !isBuy;
	                this.buyLot -= orderRelationIsBuy ? orderRelation.closedLot : 0.0;
	                this.sellLot -= !orderRelationIsBuy ? orderRelation.closedLot : 0.0;

	                if (quotePolicyDetail != null) {
	                    quotePolicyDetail.buyLot -= orderRelationIsBuy ? orderRelation.closedLot : 0.0;
	                    quotePolicyDetail.sellLot -= !orderRelationIsBuy ? orderRelation.closedLot : 0.0;
	                }
	            }
	        }
	    }
	};

	this.DeleteOrderProcessBuySellLot = function (deletedOrder) {
	    var lotBalance = deletedOrder.lotBalance;
	    var isBuy = deletedOrder.isBuy;

	    this.buyLot -= isBuy ? lotBalance : 0.0;
	    this.sellLot -= !isBuy ? lotBalance : 0.0;

	    var quotePolicyDetail = deletedOrder.GetQuotePolicyDetail();
	    if (quotePolicyDetail != null) {
	        quotePolicyDetail.buyLot -= isBuy ? lotBalance : 0.0;
	        quotePolicyDetail.sellLot -= !isBuy ? lotBalance : 0.0;
        }
	};

	this.AffectOrderProcessBuySellLot = function (order) { 
        this.AddOrderProcessBuySellLot(order);
    };

    this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
        //this.id = xmlNodeRow.getAttribute("ID");
        this.code = xmlNodeRow.getAttribute("Code");
        this.originCode = xmlNodeRow.getAttribute("OriginCode");
        this.isActive = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsActive"));
        this.beginTime = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("BeginTime"));
        this.endTime = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("EndTime"));
        this.numeratorUnit = XmlConvert.ToInt32(xmlNodeRow.getAttribute("NumeratorUnit"));
        this.denominator = XmlConvert.ToInt32(xmlNodeRow.getAttribute("Denominator"));
        this.isSinglePrice = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsSinglePrice"));
        this.isNormal = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsNormal"));
        this.originType = XmlConvert.ToInt32(xmlNodeRow.getAttribute("OriginType"));
        this.allowedSpotTradeOrderSides = XmlConvert.ToInt32(xmlNodeRow.getAttribute("AllowedSpotTradeOrderSides"));
        this.originInactiveTime = this.originInactiveTimeTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("OriginInactiveTime"));
        this.alertVariation = this.alertVariationTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("AlertVariation"));
        this.normalWaitTime = this.normalWaitTimeTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("NormalWaitTime"));
        this.alertWaitTime = this.alertWaitTimeTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("AlertWaitTime"));
        this.maxDQLot = this.maxDQLotTemp2 = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("MaxDQLot"));
        this.maxOtherLot = this.maxOtherLotTemp2 = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("MaxOtherLot"));
        this.dqQuoteMinLot = this.dqQuoteMinLotTemp2 = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("DQQuoteMinLot"));
        this.autoDQMaxLot = this.autoDQMaxLotTemp2 = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("AutoDQMaxLot"));
        this.autoLmtMktMaxLot = this.autoLmtMktMaxLotTemp2 = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("AutoLmtMktMaxLot"));
        this.acceptDQVariation = this.acceptDQVariationTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("AcceptDQVariation"));
        this.acceptLmtVariation = this.acceptLmtVariationTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("AcceptLmtVariation"));
        this.acceptCloseLmtVariation = this.acceptCloseLmtVariationTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("AcceptCloseLmtVariation"));
        this.cancelLmtVariation = this.cancelLmtVariationTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("CancelLmtVariation"));
        this.maxMinAdjust = this.maxMinAdjustTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("MaxMinAdjust"));
        this.isBetterPrice = this.isBetterPriceTemp2 = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsBetterPrice"));
        this.hitTimes = this.hitTimesTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("HitTimes"));
        this.penetrationPoint = this.penetrationPointTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("PenetrationPoint"));
        this.priceValidTime = this.priceValidTimeTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("PriceValidTime"));
        this.dailyMaxMove = (xmlNodeRow.getAttribute("DailyMaxMove") != null) ? XmlConvert.ToInt32(xmlNodeRow.getAttribute("DailyMaxMove")) : null;
        this.lastAcceptTimeSpan = this.lastAcceptTimeSpanTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("LastAcceptTimeSpan"));
        this.orderTypeMask = XmlConvert.ToInt32(xmlNodeRow.getAttribute("OrderTypeMask"));
        this.previousClosePrice = (xmlNodeRow.getAttribute("Close") != null) ? ObjectPool.GetCorrectPriceHelper(xmlNodeRow.getAttribute("Close"), this.numeratorUnit, this.denominator) : null;
        this.autoCancelMaxLot = this.autoCancelMaxLotTemp2 = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("AutoCancelMaxLot"));
        this.autoAcceptMaxLot = this.autoAcceptMaxLotTemp2 = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("AutoAcceptMaxLot"));
        this.allowedNewTradeSides = this.allowedNewTradeSidesTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("AllowedNewTradeSides"));
        this.mit = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("Mit"));
        this.isAutoEnablePrice = this.isAutoEnablePriceTemp2 = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsAutoEnablePrice"));
        this.isAutoFill = this.isAutoFillTemp2 = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsAutoFill"));
        this.isPriceEnabled = this.isPriceEnabledTemp2 = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsPriceEnabled"));
        this.nextDayOpenTime = (xmlNodeRow.getAttribute("NextDayOpenTime") != null) ? XmlConvert.ToDateTime(xmlNodeRow.getAttribute("NextDayOpenTime")) : null;
        this.mocTime = (xmlNodeRow.getAttribute("MOCTime") != null) ? XmlConvert.ToDateTime(xmlNodeRow.getAttribute("MOCTime")) : null;
        this.dayOpenTime = (xmlNodeRow.getAttribute("DayOpenTime") != null) ? XmlConvert.ToDateTime(xmlNodeRow.getAttribute("DayOpenTime")) : null;
        this.autoDQDelay = this.autoDQDelayTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("AutoDQDelay"));
        this.summaryGroupId = xmlNodeRow.getAttribute("SummaryGroupId");
        this.summaryGroupCode = (xmlNodeRow.getAttribute("SummaryGroupCode") == null) ? "" : xmlNodeRow.getAttribute("SummaryGroupCode");
        this.summaryUnit = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("SummaryUnit"));
        this.summaryQuantity = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("SummaryQuantity"));
        this.buyLot = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("BuyLot"));
        this.sellLot = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("SellLot"));
        this.hitPriceVariationForSTP = this.hitPriceVariationForSTPTemp2 = XmlConvert.ToInt32(xmlNodeRow.getAttribute("HitPriceVariationForSTP"));
        this.lastLot = 0.00;
        this.lastSales = "";
    };
}

function ConvertDateTimeFormat2(dateTimeString) {
    var dateTimeValue = dateTimeString.replace(/-/g, "/");

    //Trim Millisecond		
    //if (dateTimeValue.length > 4 && dateTimeValue.substr(dateTimeValue.length-4,1) == ".")
    //	dateTimeValue = dateTimeValue.substring(0,dateTimeValue.length-4);		
    var position = dateTimeValue.lastIndexOf(".");
    if (position > 0) {
        dateTimeValue = dateTimeValue.substring(0, position);
    }

    return (dateTimeValue);
}

function LimitParameter() {
    this.hasLimit = false;
    this.limit1 = 0;
    this.limit2 = 0;
    this.limit3 = 0;
    this.limit = 0;
    this.spread = 0;
    this.limitTradeDay = null;
    this.limitLevel = "";

    this.Reset = function () {
        this.hasLimit = false;
        this.limit1 = 0;
        this.limit2 = 0;
        this.limit3 = 0;
        this.spread = 0;
        this.limitTradeDay = null;
        this.limitLevel = "";
    };
    
    this.ParseLimit = function (str) {
        var value = parseFloat(str);
        return isNaN(value) ? 0 : value;
    };

    this.SetParameter = function (parameter) {
        this.Reset();
        if (parameter == "") return;
        var msXml = new ActiveXObject("Msxml2.DOMDocument");
        msXml.loadXML(parameter);
        if (!msXml) return;
        var pNode = msXml.firstChild;
        for (var j = 0; j < pNode.attributes.length; j++) {
            var sNodeName = pNode.attributes.item(j).nodeName;
            var sNodeValue = pNode.getAttribute(sNodeName);
            switch (sNodeName) {
                case "Limit1":
                    this.limit1 = this.ParseLimit(sNodeValue);
                    break;
                case "Limit2":
                    this.limit2 = this.ParseLimit(sNodeValue);
                    break;
                case "Limit3":
                    this.limit3 = this.ParseLimit(sNodeValue);
                    break;
                case "Spread":
                    var spread = parseInt(sNodeValue);
                    spread = isNaN(spread) ? 0 : spread;
                    this.spread = spread;
                    break;
                case "LimitLevel":
                    this.limitLevel = sNodeValue;
                    break;
                case "LimitTradeDay":
                    if (sNodeValue != "") {
                        this.limitTradeDay = new Date(ConvertDateTimeFormat2(sNodeValue)).valueOf();
                    }
                    break;
            }
        }
        this.hasLimit = true;
    };
}

function UpdateUIParameter(flashPriceTime) {
    //this.flashPriceTime = flashPriceTime;
    //1. OverridedQuotation
    this.isUpdateOverridedQuotation = false;
    this.overridedQuotationTimestamp = null;
    this.overridedQuotationQuotePolicyID = null;
    this.UpdateOverridedQuoatationParameter = function (overridedQuotationTimestamp){//, overridedQuotationQuotePolicyID) {
        this.overridedQuotationTimestamp = overridedQuotationTimestamp;
        //this.overridedQuotationQuotePolicyID = overridedQuotationQuotePolicyID;
        this.isUpdateOverridedQuotation = true;
    };
    this.UpdateOverridedQuoatationQuotePolicyIDParameter = function (overridedQuotationQuotePolicyID) {
        this.overridedQuotationQuotePolicyID = overridedQuotationQuotePolicyID;
    };
    //2. OriginQuotation
    this.isUpdateOriginQuotation = false;
    this.needUpdateOriginQuotation = false;
    this.needUpdateOverrideQuotationByOriginArrived = false;
    this.SetNeedUpdateOriginQuotation = function () {
        this.isUpdateOriginQuotation = true;
        this.needUpdateOriginQuotation = true;
    };
    this.SetNeedUpdateOverrideQuotationByOriginArrived = function () {
        this.isUpdateOriginQuotation = true;
        this.needUpdateOverrideQuotationByOriginArrived = true;
    };

    //3. flashSourceBidPriceCount
    this.isUpdateFlashSourceBidPriceCount = false;
    this.flashSourceBidPriceCount = flashPriceTime;
    this.SetFlashSourceBidPriceCount = function (value) {
        this.flashSourceBidPriceCount = value;
        if (value == 0){// || value == this.flashPriceTime) {
            this.isUpdateFlashSourceBidPriceCount = true;
        }
    };
    //4. flashBidPriceCount
    this.isUpdateFlashBidPriceCount = false;
    this.flashBidPriceCount = flashPriceTime;
    this.SetFlashBidPriceCount = function (value) {
        this.flashBidPriceCount = value;
        if (value == 0){// || value == this.flashPriceTime) {
            this.isUpdateFlashBidPriceCount = true;
        }
    };
    //5. waitTime Count
    this.isUpdateWaitTimeCount = false;
    this.waitTimeCount = 0;
    this.SetWaitTimeCount = function (value) {
        this.waitTimeCount = value;
        this.isUpdateWaitTimeCount = true;
    };
    //6. Trading Time
    this.isUpdateTradingTime = false;
    this.SetIsUpdateTradingTime = function () {
        this.isUpdateTradingTime = true;
    };
    //7. SingleUpdateOverrideQuotation
    this.needSingleUpdateOverrideQuotation = false;
    this.SetNeedSingleUpdateOverrideQuotation = function () {
        this.needSingleUpdateOverrideQuotation = true;
    };
    //8. SingleUpdateQuotationHistorySnap
    this.needSingleUpdateQuotationHistorySnap = false;
    this.SetNeedSingleUpdateQuotationHistorySnap = function () {
        this.needSingleUpdateQuotationHistorySnap = true;
    };
}