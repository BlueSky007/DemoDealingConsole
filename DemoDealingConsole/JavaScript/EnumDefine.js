var OriginType = new OriginType();
function OriginType()
{
	this.Ask = 0;
	this.Bid = 1;
	this.Avg = 2;

	this.GetOriginTypeValue = function (originTypeStr) {
	    if (originTypeStr.toLowerCase() == "Bid".toLowerCase())
	        return this.Bid;
	    else if (originTypeStr.toLowerCase() == "Ask".toLowerCase())
	        return this.Ask;
	    else if (originTypeStr.toLowerCase() == "(Bid+Ask)/2".toLowerCase())
	        return this.Avg;
	};
	this.GetOriginTypeString = function (originTypeValue) {
	    if (originTypeValue == this.Bid)
	        return "Bid";
	    else if (originTypeValue == this.Ask)
	        return "Ask";
	    else if (originTypeValue == this.Avg)
	        return "(Bid+Ask)/2";
	};
}

var AllowedOrderSides = new AllowedOrderSides();
function AllowedOrderSides() {
    this.None = 0;
    this.Buy = 1;
    this.Sell = 2;
    this.All = 3;

    this.GetAllowedOrderSides = function (allowedOrderSidesStr) {
        if (allowedOrderSidesStr.toLowerCase() == "None".toLowerCase())
            return this.None;
        else if (allowedOrderSidesStr.toLowerCase() == "Buy".toLowerCase())
            return this.Buy;
        else if (allowedOrderSidesStr.toLowerCase() == "Sell".toLowerCase())
            return this.Sell;
        else if (allowedOrderSidesStr.toLowerCase() == "All".toLowerCase())
            return this.All;
    };
    this.GetAllowedOrderSidesString = function (allowedOrderSides) {
        if (allowedOrderSides == this.None)
            return "None";
        else if (allowedOrderSides == this.Buy)
            return "Buy";
        else if (allowedOrderSides == this.Sell)
            return "Sell";
        else if (allowedOrderSides == this.All)
            return "All";
    };
}

var PriceType = new PriceType();
function PriceType()
{
	this.Watch = 0;
	this.Reference = 1;
	this.Deal = 2;
	this.OriginEnable = 3;
	
	/*
	this.GetPriceTypeValue = function (priceTypeStr)
	{
		if(priceTypeStr.toLowerCase() == "Watch Only".toLowerCase())
			return this.Watch;
		else if(priceTypeStr.toLowerCase() == "Reference".toLowerCase())
			return this.Reference;
		else if(priceTypeStr.toLowerCase() == "Deal".toLowerCase())
			return this.Deal;
		else if(priceTypeStr.toLowerCase() == "Origin Enable".toLowerCase())
			return this.OriginEnable;	
	};
	this.GetPriceTypeString = function (priceTypeValue)
	{
		if(priceTypeValue == this.Watch)
			return "Watch Only";
		else if(priceTypeValue == this.Reference)
			return "Reference";
		else if(priceTypeValue == this.Deal)
			return "Deal";
		else if(priceTypeValue == this.OriginEnable)
			return "Origin Enable";	
	};
	*/

	this.GetPriceTypeValue = function (priceTypeStr) {
	    if (priceTypeStr.toLowerCase() == "Watch Only".toLowerCase())
	        return this.Watch;
	    else if (priceTypeStr.toLowerCase() == "One Price".toLowerCase())
	        return this.Reference;
	    else if (priceTypeStr.toLowerCase() == "Deal".toLowerCase())
	        return this.Deal;
	    else if (priceTypeStr.toLowerCase() == "BidAsk".toLowerCase())
	        return this.OriginEnable;
	};
	this.GetPriceTypeString = function (priceTypeValue) {
	    if (priceTypeValue == this.Watch)
	        return "Watch Only";
	    else if (priceTypeValue == this.Reference)
	        return "One Price";
	    else if (priceTypeValue == this.Deal)
	        return "Deal";
	    else if (priceTypeValue == this.OriginEnable)
	        return "BidAsk";
	};
}

var TransactionSubType = new TransactionSubType();
function TransactionSubType() {
    this.None = 0;
    this.Amend = 1;
    this.IfDone = 2;
}

var OrderType = new OrderType();
function OrderType()
{
	this.SpotTrade = 0;
	this.Limit = 1;
	this.Market = 2;
	this.MarketOnOpen = 3;
	this.MarketOnClose = 4;
	this.OneCancelOther = 5;
	this.Risk = 6;

	this.GetOrderTypeString = function (orderType) {
	    var orderTypeString = "";
	    switch (orderType) {
	        case this.SpotTrade:
	            orderTypeString = "SPT";
	            break;
	        case this.Limit:
	            orderTypeString = "LMT";
	            break;
	        case this.Market:
	            orderTypeString = "MKT";
	            break;
	        case this.MarketOnOpen:
	            orderTypeString = "MOO";
	            break;
	        case this.MarketOnClose:
	            orderTypeString = "MOC";
	            break;
	        case this.OneCancelOther:
	            orderTypeString = "OCO";
	            break;
	        case this.Risk:
	            orderTypeString = "RSK";
	            break;
	    }
	    return orderTypeString;
	};
}

var TransPhase = new TransPhase()
function TransPhase()
{
	this.Placing = 255;
	this.Placed = 0;
	this.Canceled = 1;
	this.Executed = 2;
	this.Completed = 3;
	this.Deleted = 4;
}

var TransType = new TransType()
function TransType()
{
	this.Single = 0;
	this.Pair = 1;
	this.OCO = 2;
	this.Assign = 100;
}

var TransSubType = new TransSubType()
function TransSubType() {    
    this.Match = 3;
}

var TradeOption = new TradeOption()
function TradeOption()
{
	this.Invalid = 0;
	this.Stop = 1;
	this.Better = 2;
}

var OrderStatus = new OrderStatus();
function OrderStatus()
{
	this.Placing = 255;
	this.Placed = 0;
	this.Canceled = 1;
	this.Executed = 2;
	this.Completed = 3;
	this.Deleted = 4;
	
	this.WaitOutPriceDQ = 5;
	this.WaitOutPriceLMT = 6;
	this.WaitServerResponse = 7;
	this.Deleting = 8;
	this.WaitOutLotDQ = 9;
	this.WaitOutLotLMT = 10;
	this.WaitOutLotLMTOrigin = 11;
	this.SendFailed = 12;
	this.WaitNextPrice = 13;
	this.WaitTime = 14;
	this.TimeArrived = 15;
	this.WaitAcceptRejectPlace = 16;
	this.WaitAcceptRejectCancel = 17;
	
	this.WaitAutoExecuteDQ = 18;

	this.GetOrderStatusString = function (status) {
	    var statusStr = "";
	    switch (status) {
	        case this.Placing:
	            statusStr = "Placing";
	            break;
	        case this.Placed:
	            statusStr = "Pending";
	            break;
	        case this.Canceled:
	            statusStr = "Canceled";
	            break;
	        case this.Executed:
	            statusStr = "Executed";
	            break;
	        case this.Completed:
	            statusStr = "Completed";
	            break;
	        case this.Deleted:
	            statusStr = "Deleted";
	            break;
	        case this.WaitServerResponse:
	            statusStr = "Wait server response";
	            break;
	        case this.Deleting:
	            statusStr = "Deleting";
	            break;
	        case this.WaitOutPriceDQ:
	            statusStr = "Out of HiLo, Accept or Reject?";
	            break;
	        case this.WaitOutLotDQ:
	            statusStr = "Accept or Reject?";
	            break;
	        case this.WaitOutPriceLMT:
	            statusStr = "Out of HiLo, Wait or Execute?";
	            break;
	        case this.WaitOutLotLMTOrigin:
	            statusStr = "Update, Wait or Execute?";
	            break;
	        case this.WaitOutLotLMT:
	            statusStr = "Update, Modify, Wait or Execute?";
	            break;
	        case this.SendFailed:
	            statusStr = "Send failed.";
	            break;
	        case this.WaitNextPrice:
	            statusStr = "Wait for price.";
	            break;
	        case this.WaitTime:
	            statusStr = "Wait time arrive.";
	            break;
	        case this.TimeArrived:
	            statusStr = "Time arrived, wait response.";
	            break;
	        case this.WaitAcceptRejectPlace:
	            statusStr = "Accept or Reject Place?";
	            break;
	        case this.WaitAcceptRejectCancel:
	            statusStr = "Accept or Reject Cancel?";
	            break;
	        case this.WaitAutoExecuteDQ:
	            statusStr = "Wait for price.";
	            break;
	    }
	    return statusStr;
	};
}

var QuotationType = new QuotationType();
function QuotationType()
{
	this.Normal = "Normal";
	this.Flash = "Flash";
}

var QuoteTaskType = new QuoteTaskType();
function QuoteTaskType()
{
	this.Inactive = "Inactive";
	this.OutOfRange = "Out of range";
	this.Enquiry = "Enquiry";
	this.Enquiry2 = "Enquiry 2";
}

var Delimiter = new Delimiter();
function Delimiter()
{
	this.Col = "\t";
	this.Row = "\n";
}

var AccountType = new AccountType();
function AccountType()
{
	this.Common = 0;
	this.Agent = 1;
	this.Company = 2;
	this.Transit = 3;
	this.BlackList = 4;
}

var SoundOption = new SoundOption();
function SoundOption()
{
	var index = 1;

	this.DQNewOrder = index++;
	this.DQDealerIntervene = index++;		
	this.DQCancelOrder = index++;
	this.DQTradeSucceed = index++;
	this.DQTradeFailed = index++;
	this.DQAlertHiLo = index++;

	this.LimitNewOrder = index++;
	this.LimitDealerIntervene = index++;
	this.LimitCancelOrderRequest = index++;
	this.LimitCancelOrder = index++;
	this.LimitTradeSucceed = index++;
	this.LimitTradeFailed = index++;
	this.LimitHit = index++;

	this.OutOfRange = index++;
	this.Inactive = index++;
	this.Enquiry = index++;

	this.GetSoundOptionString = function (soundOption) {
	    switch (soundOption) {
	        case this.DQDealerIntervene: return "DQ Order Action Alert";
	        case this.DQNewOrder: return "DQNewOrder";
	        case this.DQCancelOrder: return "DQCancelOrder";
	        case this.DQTradeSucceed: return "DQTradeSucceed";
	        case this.DQTradeFailed: return "DQTradeFailed";
	        case this.DQAlertHiLo: return "DQAlertHiLo";

	        case this.LimitDealerIntervene: return "Limit Order Action Alert";
	        case this.LimitNewOrder: return "LimitNewOrder";
	        case this.LimitCancelOrderRequest: return "LimitCancelOrderRequest";
	        case this.LimitCancelOrder: return "LimitCancelOrder";
	        case this.LimitTradeSucceed: return "LimitTradeSucceed";
	        case this.LimitTradeFailed: return "LimitTradeFailed";
	        case this.LimitHit: return "LimitHit";

	        case this.OutOfRange: return "OutOfRange";
	        case this.Inactive: return "Inactive";
	        case this.Enquiry: return "Enquiry";
	    }
	    return null;
	};
}
var ActionEnum = new ActionEnum();
function ActionEnum() {
    this.None = -1;
    this.OnOrderAccept = 0;
    this.OnOrderReject = 1;
    this.OnOrderDetail = 2;
    this.OnOrderAcceptPlace = 3;
    this.OnOrderRejectPlace = 4;
    this.OnOrderAcceptCancel = 5;
    this.OnOrderRejectCancel = 6;
    this.OnOrderUpdate = 7;
    this.OnOrderModify = 8;
    this.OnOrderWait = 9;
    this.OnOrderExecute = 10;
    this.OnOrderCancel = 11;
}

var QuotationActionEnum = new QuotationActionEnum();
function QuotationActionEnum() {
    this.None = -1;
//    this.OnSwitch = 0;
//    this.OnIgnore = 1;
    this.OnAccept = 2;
    this.OnDiscard = 3;
    this.OnAbandon = 4;
    this.OnUpdate = 5;
    this.OnModify = 6;
    this.OnSend = 7;
    this.OnModify2 = 8;
}


var AllowedNewTradeSidesType = new AllowedNewTradeSidesType();
function AllowedNewTradeSidesType() {
    this.DisallowNone = 0;
    this.AllowAddBuy = 1;
    this.AllowAddSell = 2;
    this.AllowAddNew = 3;

    this.GetAllowedNewTradeSidesTypeValue = function (allowedNewTradeSidesTypeStr) {
        if (allowedNewTradeSidesTypeStr.toLowerCase() == "Disallow add New".toLowerCase())
            return this.DisallowNone;
        else if (allowedNewTradeSidesTypeStr.toLowerCase() == "Allow add new Buy only".toLowerCase())
            return this.AllowAddBuy;
        else if (allowedNewTradeSidesTypeStr.toLowerCase() == "Allow add new Sell only".toLowerCase())
            return this.AllowAddSell;
        else if (allowedNewTradeSidesTypeStr.toLowerCase() == "Allow add new".toLowerCase())
            return this.AllowAddNew;
    };
    this.GetAllowedNewTradeSidesTypeStr = function (allowedNewTradeSidesTypeValue) {
        if (allowedNewTradeSidesTypeValue == this.DisallowNone)
            return "Disallow add New";
        else if (allowedNewTradeSidesTypeValue == this.AllowAddBuy)
            return "Allow add new Buy only";
        else if (allowedNewTradeSidesTypeValue == this.AllowAddSell)
            return "Allow add new Sell only";
        else if (allowedNewTradeSidesTypeValue == this.AllowAddNew)
            return "Allow add new";
    }
}

