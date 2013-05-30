//static
var ObjectPool = new ObjectPool();

function ObjectPool()
{
    this.Assert = function (callerName, array, object) {
        var assertResult = false;
        for (var i = 0, count = array.length; i < count; i++) {
            if (array[i] == object) {
                assertResult = true;
                alert(callerName + ",Release a same object multi-times!");
                break;
            }
        }
        return assertResult;
    };
	
	//Dictionary
	this.dictionaryPool = new Array();
	this.GetDictionary = function () {
	    var dictionary;
	    var iCount = this.dictionaryPool.length;
	    if (iCount > 0) {
	        dictionary = this.dictionaryPool[iCount - 1];

	        this.dictionaryPool.length = iCount - 1;
	    }
	    else {
	        dictionary = new ActiveXObject("Scripting.Dictionary");
	    }
	    return dictionary;
	};
	this.ReleaseDictionary = function (dictionary) {
	    if (this.Assert("ReleaseDictionary", this.dictionaryPool, dictionary)) return;

	    dictionary.RemoveAll();

	    this.dictionaryPool[this.dictionaryPool.length] = dictionary;
	};

	//SequenceObject
	this.sequenceObjectPool = new Array();
	this.GetSequenceObject = function (beginSequence, endSequence, object) {
	    var sequenceObject;
	    var iCount = this.sequenceObjectPool.length;
	    if (iCount > 0) {
	        sequenceObject = this.sequenceObjectPool[iCount - 1];

	        sequenceObject.BeginSequence = beginSequence;
	        sequenceObject.EndSequence = endSequence;
	        sequenceObject.Object = object;

	        this.sequenceObjectPool.length = iCount - 1;
	    }
	    else {
	        sequenceObject = new SequenceObject();

	        sequenceObject.BeginSequence = beginSequence;
	        sequenceObject.EndSequence = endSequence;
	        sequenceObject.Object = object;
	    }
	    return sequenceObject;
	};
	this.ReleaseSequenceObject = function (sequenceObject) {
	    if (this.Assert("ReleaseSequenceObject", this.sequenceObjectPool, sequenceObject)) return;

	    this.sequenceObjectPool[this.sequenceObjectPool.length] = sequenceObject;
	};
	
	//normalizePricePool
	this.normalizePricePool = new Array();
	this.GetNormalizePrice = function () {
	    var normalizePrice;
	    var iCount = this.normalizePricePool.length;
	    if (iCount > 0) {
	        normalizePrice = this.normalizePricePool[iCount - 1];
	        normalizePrice.Clear();

	        this.normalizePricePool.length = iCount - 1;
	    }
	    else {
	        normalizePrice = new NormalizePrice();
	    }
	    return normalizePrice;
	};
	this.ReleaseNormalizePrice = function (normalizePrice) {
	    if (this.Assert("ReleaseNormalizePrice", this.normalizePricePool, normalizePrice)) return;

	    this.normalizePricePool[this.normalizePricePool.length] = normalizePrice;
	};
	
	//pricePool
	this.pricePool = new Array();
	this.GetPrice = function () {
	    var price;
	    var iCount = this.pricePool.length;
	    if (iCount > 0) {
	        price = this.pricePool[iCount - 1];
	        price.Clear();

	        this.pricePool.length = iCount - 1;
	    }
	    else {
	        price = new Price();
	    }
	    return price;
	};
	this.ReleasePrice = function (price) {
	    if (this.Assert("ReleasePrice", this.pricePool, price)) return;

	    this.pricePool[this.pricePool.length] = price;
	};
	this.GetPriceHelper = function (priceString, numeratorUnit, denominator) {
	    var price = this.GetPrice();
	    price.Parse(priceString, numeratorUnit, denominator);

	    if (price.normalizedPrice == null) price = null;
	    return price;
	};
	this.GetCorrectPriceHelper = function (priceString, numeratorUnit, denominator) {
	    var price = this.GetPrice();
	    price.CorrectPriceParse(priceString, numeratorUnit, denominator);

	    if (price.normalizedPrice == null) price = null;
	    return price;
	};

	//TradingItem
	this.tradingItemPool = new Array();
	this.GetTradingItem = function () {
	    var tradingItem;
	    var iCount = this.tradingItemPool.length;
	    if (iCount > 0) {
	        tradingItem = this.tradingItemPool[iCount - 1];
	        tradingItem.Clear();

	        this.tradingItemPool.length = iCount - 1;
	    }
	    else {
	        tradingItem = new TradingItem();
	    }
	    return tradingItem;
	};
	this.ReleaseTradingItem = function (tradingItem) {
	    if (this.Assert("ReleaseTradingItem", this.tradingItemPool, tradingItem)) return;

	    this.tradingItemPool[this.tradingItemPool.length] = tradingItem;
	};
	
	//QuotationPool
	this.quotationPool = new Array();
	this.GetQuotation = function () {
	    var quotation;
	    var iCount = this.quotationPool.length;
	    if (iCount > 0) {
	        quotation = this.quotationPool[iCount - 1];
	        quotation.Clear();

	        this.quotationPool.length = iCount - 1;
	    }
	    else {
	        quotation = new Quotation();
	    }
	    return quotation;
	};
	this.ReleaseQuotation = function (quotation) {
	    if (this.Assert("ReleaseQuotation", this.quotationPool, quotation)) return;

	    this.quotationPool[this.quotationPool.length] = quotation;
	};
	
}

