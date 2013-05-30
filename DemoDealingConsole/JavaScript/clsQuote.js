//Not use

function Quote(origin, ask, bid, high, low, timestamp)
{	
	this.origin = origin;
	this.ask = ask;
	this.bid = bid;
	this.high = high;
	this.low = low;
	this.timestamp = new Date(timestamp);

	this.SetOrigin = function (newOrigin) {
	    this.origin = newOrigin;
	    if (this.origin) {
	        if (this.origin.More(this.high))
	            this.high = (this.origin).Clone();
	        if (this.origin.Less(this.low))
	            this.low = (this.origin).Clone();
	    }
	};

	this.Clone = function () {
	    var tempQuote = new Quote();
	    if (this.origin)
	        tempQuote.origin = this.origin.Clone();
	    if (this.ask)
	        tempQuote.ask = this.ask.Clone();
	    if (this.bid)
	        tempQuote.bid = this.bid.Clone();
	    if (this.high)
	        tempQuote.high = this.high.Clone();
	    if (this.low)
	        tempQuote.low = this.low.Clone();
	    if (this.timestamp)
	        tempQuote.timestamp = new Date(this.timestamp);
	    else
	        tempQuote.timestamp = new Date();
	    tempQuote.quotePolicyID = this.quotePolicyID;
	    return tempQuote;
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

}
