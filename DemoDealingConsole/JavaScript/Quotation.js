
function Quotation()
{
	this.origin = null;
	this.timestamp = null;
	this.ask = null;
	this.bid = null;
	this.high = null;
	this.low = null;
	this.quotePolicyID = null;
	this.isAccepted = false;
	this.isProblematic = false;

	this.GetBuy = function (instrument) {
	    return (instrument.IsNormal == true) ? this.bid : this.ask;
	};

	this.GetSell = function (instrument) {
	    return (instrument.IsNormal == true) ? this.ask : this.bid;
	};

	this.Clear = function () {
	    this.Dispose();

	    this.origin = null;
	    this.timestamp = null;
	    this.ask = null;
	    this.bid = null;
	    this.high = null;
	    this.low = null;
	    this.quotePolicyID = null;
	    this.isAccepted = false;
	    this.isProblematic = false;
	};

	this.Clone = function () {
	    var quotation = ObjectPool.GetQuotation();

	    if (this.origin) quotation.origin = this.origin.Clone();
	    quotation.timestamp = this.timestamp;
	    if (this.ask) quotation.ask = this.ask.Clone();
	    if (this.bid) quotation.bid = this.bid.Clone();
	    if (this.high) quotation.high = this.high.Clone();
	    if (this.low) quotation.low = this.low.Clone();
        quotation.quotePolicyID = this.quotePolicyID;
        quotation.isAccepted = this.isAccepted;
        quotation.isProblematic = this.isProblematic;

	    return quotation;
	};

	this.Dispose = function () {
	    if (this.origin != null) ObjectPool.ReleasePrice(this.origin);
	    if (this.ask != null) ObjectPool.ReleasePrice(this.ask);
	    if (this.bid != null) ObjectPool.ReleasePrice(this.bid);
	    if (this.high != null) ObjectPool.ReleasePrice(this.high);
	    if (this.low != null) ObjectPool.ReleasePrice(this.low);
	};

	this.Parse2 = function (instrument, dataRow) {
	    var numeratorUnit = instrument.numeratorUnit;
	    var denominator = instrument.denominator;

	    this.id = dataRow("InstrumentID");
	    this.timestamp = new Date(dataRow("timestamp"));
	    var data = dataRow("origin");
	    if (data != ""/* && data != "0"*/) {
	        this.origin = ObjectPool.GetPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = dataRow("ask");
	    if (data != "" /* && data != "0"*/) {
	        this.ask = ObjectPool.GetCorrectPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = dataRow("bid");
	    if (data != "" /* && data != "0"*/) {
	        this.bid = ObjectPool.GetCorrectPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = dataRow("high");
	    if (data != "" /* && data != "0"*/) {
	        this.high = ObjectPool.GetCorrectPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = dataRow("low");
	    if (data != "" /* && data != "0"*/) {
	        this.low = ObjectPool.GetCorrectPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = dataRow("quotePolicyID");
	    if (data) {
	        this.quotePolicyID = data;
	    }
	};

	this.Parse3 = function (instrument, xmlNodeRow) {
	    var numeratorUnit = instrument.numeratorUnit;
	    var denominator = instrument.denominator;

	    this.id = xmlNodeRow.getAttribute("InstrumentID");
	    this.timestamp = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("Timestamp"));
	    var data = xmlNodeRow.getAttribute("Origin");
	    if (data != null && data != ""/* && data != "0"*/) {
	        this.origin = ObjectPool.GetPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = xmlNodeRow.getAttribute("Ask");
	    if (data != null && data != "" /* && data != "0"*/) {
	        this.ask = ObjectPool.GetCorrectPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = xmlNodeRow.getAttribute("Bid");
	    if (data != null && data != "" /* && data != "0"*/) {
	        this.bid = ObjectPool.GetCorrectPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = xmlNodeRow.getAttribute("High");
	    if (data != null && data != "" /* && data != "0"*/) {
	        this.high = ObjectPool.GetCorrectPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = xmlNodeRow.getAttribute("Low");
	    if (data != null && data != "" /* && data != "0"*/) {
	        this.low = ObjectPool.GetCorrectPriceHelper(data, numeratorUnit, denominator);
	    }
	    data = xmlNodeRow.getAttribute("QuotePolicyID");
	    if (data != null) {
	        this.quotePolicyID = data;
	    }
	};

	this.Parse = function (instrument, quotationString, isOrigin) {
	    for (var i = 0, iCount = quotationString.length; i < iCount; i++) {
	        var quotationItem = quotationString[i];
	        var numeratorUnit = instrument.numeratorUnit;
	        var denominator = instrument.denominator;
	        if (isOrigin) {
	            switch (i) {
	                case 0:
	                    this.id = quotationItem;
	                    continue;
	                case 1:
	                    this.timestamp = new Date(quotationItem.replace(/-/g, "/"));
	                    continue;
	                case 2:
	                    if (quotationItem != "") {
	                        this.ask = ObjectPool.GetCorrectPriceHelper(quotationItem, numeratorUnit, denominator);
	                    }
	                    continue;
	                case 3:
	                    if (quotationItem != "") {
	                        this.bid = ObjectPool.GetCorrectPriceHelper(quotationItem, numeratorUnit, denominator);
	                    }
	                    continue;
	                case 4:
	                    if (quotationItem != "") {
	                        this.high = ObjectPool.GetCorrectPriceHelper(quotationItem, numeratorUnit, denominator);
	                    }
	                    continue;
	                case 5:
	                    if (quotationItem != "") {
	                        this.low = ObjectPool.GetCorrectPriceHelper(quotationItem, numeratorUnit, denominator);
	                    }
	                    continue;
	                case 6:
	                    if (quotationItem != "") {
	                        this.isProblematic = quotationItem == "true" ? true : false;
	                    }
	                    continue;
	                case 7:
	                    var dealerID = quotationString[7];
	                    this.isAccepted = dealerID != "00000000-0000-0000-0000-000000000000";
	                    continue;
	            }
	        }
	        else {
	            switch (i) {
	                case 1:
	                    this.quotePolicyID = quotationItem;
	                    continue;
	                case 2:
	                    this.timestamp = new Date(quotationItem.replace(/-/g, "/"));
	                    continue;
	                case 3:
	                    if (quotationItem != "") {
	                        this.ask = ObjectPool.GetCorrectPriceHelper(quotationItem, numeratorUnit, denominator);
	                    }
	                    continue;
	                case 4:
	                    if (quotationItem != "") {
	                        this.bid = ObjectPool.GetCorrectPriceHelper(quotationItem, numeratorUnit, denominator);
	                    }
	                    continue;
	                case 5:
	                    if (quotationItem != "") {
	                        this.high = ObjectPool.GetCorrectPriceHelper(quotationItem, numeratorUnit, denominator);
	                    }
	                    continue;
	                case 6:
	                    if (quotationItem != "") {
	                        this.low = ObjectPool.GetCorrectPriceHelper(quotationItem, numeratorUnit, denominator);
	                    }
	                    continue;
	            }
	        }
	    }
	};

	this.Merge = function (quotation) {
	    this.timestamp = quotation.timestamp;
	    if (quotation.origin != null) this.origin = quotation.origin.Clone();
	    if (quotation.ask != null) this.ask = quotation.ask.Clone();
	    if (quotation.bid != null) this.bid = quotation.bid.Clone();
	    if (quotation.high != null) this.high = quotation.high.Clone();
	    if (quotation.low != null) this.low = quotation.low.Clone();
	};

	this.SetOrigin = function (newOrigin) {
	    this.origin = newOrigin.Clone();
	    if (this.origin) {
	        if (this.origin.More(this.high))
	            this.high = (this.origin).Clone();
	        if (this.origin.Less(this.low))
	            this.low = (this.origin).Clone();
	    }
	};

	this.TimeString = function () {
	    if (this.timestamp) {
	        var s = "";
	        var value = this.timestamp.getHours();
	        if (value < 10)
	            s = "0";
	        s += value.toString();
	        s += ":";

	        value = this.timestamp.getMinutes();
	        if (value < 10)
	            s += "0";
	        s += value.toString();
	        s += ":";

	        value = this.timestamp.getSeconds();
	        if (value < 10)
	            s += "0";
	        s += value.toString();
	        return s;
	    }
	    else
	        return "00:00:00";
	};

	this.ToString = function () {
	    var s;
	    if (this.origin)
	        s = this.origin.ToString();
	    else
	        s = " ";
	    if (this.ask)
	        s = s + " " + this.ask.ToString();
	    else
	        s = s + " ";
	    if (this.bid)
	        s = s + " " + this.bid.ToString();
	    else
	        s = s + " ";
	    if (this.high)
	        s = s + " " + this.high.ToString();
	    else
	        s = s + " ";
	    if (this.low)
	        s = s + " " + this.low.ToString();
	    else
	        s = s + " ";
	    if (this.timestamp)
	        s = s + " " + this.timestamp.toString();
	    else
	        s = s + " ";
	    return s;
	};
}