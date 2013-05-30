
//Added by Michael

function EnquiryManager(dealingConsole)
{
    this.dealingConsole = dealingConsole;
    
    this.enquiryWindowManager = new EnquiryWindowManager();
    
    this.instrumentEnquiryUnits = new ActiveXObject("Scripting.Dictionary"); //InstrumentID,InstrumentEnquiryUnit

    this.Remove = function (instrumentID) {
        if (this.instrumentEnquiryUnits.Exists(instrumentID)) {
            return this.instrumentEnquiryUnits.Remove(instrumentID);
        }
    };

    this.GetInstrumentEnquiryUnit = function (instrumentID) {
        if (this.instrumentEnquiryUnits.Exists(instrumentID)) {
            return this.instrumentEnquiryUnits.Item(instrumentID);
        }
        return null;
    };

    this.AddEnquiry = function (enquiry) {
        var instrumentEnquiryUnit = null;
        var instrumentID = enquiry.instrumentID;
        if (!this.instrumentEnquiryUnits.Exists(instrumentID)) {
            instrumentEnquiryUnit = new InstrumentEnquiryUnit(enquiry.instrument);
            this.instrumentEnquiryUnits.Add(instrumentID, instrumentEnquiryUnit);
        }
        else {
            instrumentEnquiryUnit = this.instrumentEnquiryUnits.Item(instrumentID);
        }
        instrumentEnquiryUnit.AddEnquiry(enquiry);

        this.dealingConsole.RefreshUiForAddEnquiry2(enquiry);
    };

    this.RemoveEnquiry = function (enquiry) {
        var instrumentID = enquiry.instrumentID;
        if (this.instrumentEnquiryUnits.Exists(instrumentID)) {
            var instrumentEnquiryUnit = this.instrumentEnquiryUnits.Item(instrumentID);
            instrumentEnquiryUnit.RemoveEnquiry(enquiry);
            if (instrumentEnquiryUnit.QueryCount() <= 0) {
                this.instrumentEnquiryUnits.Remove(instrumentID);
            }
        }
        this.dealingConsole.RefreshUiForRemoveEnquiry2(enquiry);
    };

    this.DecreaseTick = function () {
        var instrumentEnquiryUnits = (new VBArray(this.instrumentEnquiryUnits.Items())).toArray();
        for (var count = instrumentEnquiryUnits.length, index = count - 1; index >= 0; index--) {
            var instrumentEnquiryUnit = instrumentEnquiryUnits[index];
            instrumentEnquiryUnit.DecreaseTick(this);
        }
    };
}

function InstrumentEnquiryUnit(instrument)
{
    this.instrument = instrument;
    
    this.quotePolicyDetailEnquiries = new ActiveXObject("Scripting.Dictionary"); //quotePolicyDetailCode,QuotePolicyDetailEnquiry    (same Instrument)
    
    this.sumBuyLots = 0.0;
    this.sumSellLots = 0.0;

    this.Get_Tick = function () {
        var tick = 0;
        var quotePolicyDetailEnquiries = (new VBArray(this.quotePolicyDetailEnquiries.Items())).toArray();
        for (var count = quotePolicyDetailEnquiries.length, index = count - 1; index >= 0; index--) {
            var quotePolicyDetailEnquiry = quotePolicyDetailEnquiries[index];
            var tick2 = quotePolicyDetailEnquiry.Get_Tick();
            if (tick2 > tick) {
                tick = tick2;
            }
        }
        return tick;
    };

    this.sumLots = function () {
        return this.sumBuyLots + this.sumSellLots;
    };

    this.DecreaseTick = function (enquiryManager) {
        var quotePolicyDetailEnquiries = (new VBArray(this.quotePolicyDetailEnquiries.Items())).toArray();
        for (var count = quotePolicyDetailEnquiries.length, index = count - 1; index >= 0; index--) {
            var quotePolicyDetailEnquiry = quotePolicyDetailEnquiries[index];
            quotePolicyDetailEnquiry.DecreaseTick(enquiryManager);
        }
    };

    this.QueryCount = function () {
        var queryCount = 0;

        var quotePolicyDetailEnquiries = (new VBArray(this.quotePolicyDetailEnquiries.Items())).toArray();
        for (var index = 0, count = quotePolicyDetailEnquiries.length; index < count; index++) {
            var quotePolicyDetailEnquiry = quotePolicyDetailEnquiries[index];
            queryCount += quotePolicyDetailEnquiry.QueryCount();
        }
        return queryCount;
    };

    this.GetQuotePolicyDetailEnquiry = function (quotePolicyDetailCode) {
        if (this.quotePolicyDetailEnquiries.Exists(quotePolicyDetailCode)) {
            return this.quotePolicyDetailEnquiries.Item(quotePolicyDetailCode);
        }
        return null;
    };

    this.AddEnquiry = function (enquiry) {
        var quotePolicyDetailCode = enquiry.quotePolicyDetailCode;
        var quotePolicyDetailEnquiry = null;
        if (!this.quotePolicyDetailEnquiries.Exists(quotePolicyDetailCode)) {
            quotePolicyDetailEnquiry = new QuotePolicyDetailEnquiry(this.instrument, enquiry.quotePolicyDetail);
            this.quotePolicyDetailEnquiries.Add(quotePolicyDetailCode, quotePolicyDetailEnquiry);
        }
        else {
            quotePolicyDetailEnquiry = this.quotePolicyDetailEnquiries.Item(quotePolicyDetailCode);
            this.sumBuyLots = this.sumBuyLots - quotePolicyDetailEnquiry.sumBuyLots;
            this.sumSellLots = this.sumSellLots - quotePolicyDetailEnquiry.sumSellLots;
        }
        quotePolicyDetailEnquiry.AddEnquiry(enquiry);
        this.sumBuyLots = this.sumBuyLots + quotePolicyDetailEnquiry.sumBuyLots;
        this.sumSellLots = this.sumSellLots + quotePolicyDetailEnquiry.sumSellLots;
    };

    this.RemoveEnquiry = function (enquiry) {
        var quotePolicyDetailCode = enquiry.quotePolicyDetailCode;
        if (this.quotePolicyDetailEnquiries.Exists(quotePolicyDetailCode)) {
            var quotePolicyDetailEnquiry = this.quotePolicyDetailEnquiries.Item(quotePolicyDetailCode);
            this.sumBuyLots = this.sumBuyLots - quotePolicyDetailEnquiry.sumBuyLots;
            this.sumSellLots = this.sumSellLots - quotePolicyDetailEnquiry.sumSellLots;
            quotePolicyDetailEnquiry.RemoveEnquiry(enquiry);
            if (quotePolicyDetailEnquiry.QueryCount() <= 0) {
                this.quotePolicyDetailEnquiries.Remove(quotePolicyDetailCode);
            }
            else {
                this.sumBuyLots = this.sumBuyLots + quotePolicyDetailEnquiry.sumBuyLots;
                this.sumSellLots = this.sumSellLots + quotePolicyDetailEnquiry.sumSellLots;
            }
        }
    };
}

function QuotePolicyDetailEnquiry(instrument,quotePolicyDetail)
{
    this.instrument = instrument;
    this.quotePolicyDetail = quotePolicyDetail;
    
    this.enquiries = new ActiveXObject("Scripting.Dictionary"); //customerId,Enquries    (same Instrument)
    
    this.sumBuyLots = 0.0;
    this.sumSellLots = 0.0;
    this.customerCodes = "";
    
    this.origin;
	this.bid;
	this.ask;

	this.Get_Tick = function () {
	    var tick = 0;
	    var enquiries = (new VBArray(this.enquiries.Items())).toArray();
	    for (var count = enquiries.length, index = count - 1; index >= 0; index--) {
	        var enquiry = enquiries[index];
	        var tick2 = enquiry.Get_Tick();
	        if (tick2 > tick) {
	            tick = tick2;
	        }
	    }
	    return tick;
	};

	this.DecreaseTick = function (enquiryManager) {
	    var enquiries = (new VBArray(this.enquiries.Items())).toArray();
	    for (var count = enquiries.length, index = count - 1; index >= 0; index--) {
	        var enquiry = enquiries[index];
	        enquiry.DecreaseTick(enquiryManager);
	    }
	};

	this.Set_Origin = function (value) {
	    this.origin = value;

	    var enquiries = (new VBArray(this.enquiries.Items())).toArray();
	    for (var index = 0, count = enquiries.length; index < count; index++) {
	        var enquiry = enquiries[index];
	        enquiry.Set_Origin(value);
	    }
	};

	this.Set_Bid = function (value) {
	    this.bid = value;

	    var enquiries = (new VBArray(this.enquiries.Items())).toArray();
	    for (var index = 0, count = enquiries.length; index < count; index++) {
	        var enquiry = enquiries[index];
	        enquiry.Set_Bid(value);
	    }
	};

	this.Set_Ask = function (value) {
	    this.ask = value;

	    var enquiries = (new VBArray(this.enquiries.Items())).toArray();
	    for (var index = 0, count = enquiries.length; index < count; index++) {
	        var enquiry = enquiries[index];
	        enquiry.Set_Ask(value);
	    }
	};

	this.QueryCount = function () {
	    return this.enquiries.Count;
	};

	this.GetCustomerCodes = function () {
	    this.customerCodes = "";
	    var enquiries = (new VBArray(this.enquiries.Items())).toArray();
	    for (var index = 0, count = enquiries.length; index < count; index++) {
	        var enquiry = enquiries[index];
	        if (this.customerCodes == "") {
	            this.customerCodes = enquiry.customer.code;
	        }
	        else {
	            this.customerCodes += "," + enquiry.customer.code;
	        }
	    }
	};

	this.AddEnquiry = function (enquiry) {
	    var customerID = enquiry.customerID;
	    if (!this.enquiries.Exists(customerID)) {
	        this.enquiries.Add(customerID, enquiry);
	        this.sumBuyLots += enquiry.buyLot;
	        this.sumSellLots += enquiry.sellLot;

	        if (this.customerCodes == "") {
	            this.customerCodes = enquiry.customer.code;
	        }
	        else {
	            this.customerCodes += "," + enquiry.customer.code;
	        }
	    }
	    else {
	        var enquiry2 = this.enquiries.Item(customerID);
	        this.sumBuyLots -= enquiry2.buyLot;
	        this.sumSellLots -= enquiry2.sellLot;

	        this.enquiries.Item(customerID) = enquiry;

	        this.sumBuyLots += enquiry.buyLot;
	        this.sumSellLots += enquiry.sellLot;
	    }
	};

	this.RemoveEnquiry = function (enquiry) {
	    var customerID = enquiry.customerID;
	    if (this.enquiries.Exists(customerID)) {
	        var enquiry2 = this.enquiries.Item(customerID);

	        this.sumBuyLots -= enquiry2.buyLot;
	        this.sumSellLots -= enquiry2.sellLot;

	        this.enquiries.Remove(customerID);

	        this.GetCustomerCodes();
	    }
	};
}

function Enquiry2(instrumentID, customerID, buyLot,sellLot,tick)
{
	this.instrumentID = instrumentID;
	this.customerID = customerID;
	this.buyLot = buyLot;
	this.sellLot = sellLot;
	this.tick = tick;
	this.timestamp = new Date();
	
	this.instrument;
	this.customer;
	this.origin;
	this.bid;
	this.ask;
			
	this.quotePolicyDetailCode = "";
	this.quotePolicyDetail = null;

	this.DecreaseTick = function (enquiryManager) {
	    this.tick -= 1;
	    if (this.tick <= 0) {
	        enquiryManager.RemoveEnquiry(this);
	    }
	};

	this.sumLots = function () {
	    return this.buyLot + this.sellLot;
	};

	this.Get_Tick = function () {
	    return this.tick;
	};
    
	//this.Set_Tick = function(value)
	//{
	//   this.tick = value;
	//};

	this.Set_Origin = function (value) {
	    this.origin = value;

	};

	this.Set_Bid = function (value) {
	    this.bid = value;

	};

	this.Set_Ask = function (value) {
	    this.ask = value;

	};

	this.GetForColor = function () {
	    var forColor = color_black;
	    if (buyLot > 0 && sellLot > 0) {
	        forColor = color_black;
	    }
	    else if (sellLot > 0) {
	        forColor = color_red;
	    }
	    else {
	        forColor = color_blue;
	    }
	    return forColor;
	};

	this.GetBSStatusPrompt = function () {
	    var BSStatusPrompt = "";
	    if (buyLot > 0 && sellLot > 0) {
	        BSStatusPrompt = "Mix";
	    }
	    else if (sellLot > 0) {
	        BSStatusPrompt = "Sell";
	    }
	    else {
	        BSStatusPrompt = "Buy";
	    }
	    return BSStatusPrompt;
	};

	this.SetQuotePolicyDetail = function () {
	    var quotePolicyID;
	    if (this.instrument.quotePolicyDetails.Exists(this.customer.privateQuotePolicyID) == true)
	        quotePolicyID = this.customer.privateQuotePolicyID;
	    else if (this.instrument.quotePolicyDetails.Exists(this.customer.publicQuotePolicyID) == true)
	        quotePolicyID = this.customer.publicQuotePolicyID;

	    if (!quotePolicyID) {
	        this.quotePolicyDetail = null;
	        this.quotePolicyDetailCode = "";
	    }
	    else {
	        this.quotePolicyDetail = this.instrument.quotePolicyDetails.Item(quotePolicyID);
	        this.quotePolicyDetailCode = this.quotePolicyDetail.code;
	    }
	};
	
}

function EnquiryWindowManager()
{
    this.instrumentEnquiryWindows = new ActiveXObject("Scripting.Dictionary"); //InstrumentID,instrumentEnquiryWindow

    this.AddInstrumentEnquiryWindow = function (instrumentID, instrumentEnquiryWindow) {
        if (this.instrumentEnquiryWindows.Exists(instrumentID)) {
            this.instrumentEnquiryWindows.Remove(instrumentID);
        }

        this.instrumentEnquiryWindows.Add(instrumentID, instrumentEnquiryWindow);
    };

    this.RemoveInstrumentEnquiryWindow = function (instrumentID) {
        if (this.instrumentEnquiryWindows.Exists(instrumentID)) {
            this.instrumentEnquiryWindows.Remove(instrumentID);
        }
    };

    this.GetInstrumentEnquiryWindow = function (instrumentID) {
        if (this.instrumentEnquiryWindows.Exists(instrumentID)) {
            return this.instrumentEnquiryWindows.Item(instrumentID);
        }
        return null;
    };

    this.CloseAllWindow = function () {
        var instrumentEnquiryWindows = (new VBArray(this.instrumentEnquiryWindows.Items())).toArray();
        for (var index = 0, count = instrumentEnquiryWindows.length; index < count; index++) {
            var instrumentEnquiryWindow = instrumentEnquiryWindows[index];
            if (instrumentEnquiryWindow != null) {
                if (!instrumentEnquiryWindow.closed) {
                    try {
                        instrumentEnquiryWindow.close();
                    }
                    catch (e)
		            { }
                }
            }
        }
        this.instrumentEnquiryWindows = new ActiveXObject("Scripting.Dictionary");
    };

    this.ChangedParametersByOuter = function (quotePolicyDetail) {
        var instrumentEnquiryWindows = (new VBArray(this.instrumentEnquiryWindows.Items())).toArray();
        for (var index = 0, count = instrumentEnquiryWindows.length; index < count; index++) {
            var instrumentEnquiryWindow = instrumentEnquiryWindows[index];
            if (instrumentEnquiryWindow != null) {
                if (!instrumentEnquiryWindow.closed) {
                    try {
                        var hasUpdated = instrumentEnquiryWindow.ChangedParametersByOuter(quotePolicyDetail);
                        if (hasUpdated == true) return;
                    }
                    catch (e)
		            { }
                }
            }
        }
    };
}



function Enquiry(instrumentID, customerID, lot, bsStatus)
{
	this.instrumentID = instrumentID;
	this.customerID = customerID;
	this.lot = lot;
	this.answerLot = lot;
	this.timestamp = new Date();
	this.BSStatus = bsStatus;	//0:Sell 1:Buy 2:Mix
	
	this.instrument;
	this.customer;
	this.origin;
	this.bid;
	this.ask;
	this.tick = 0;

	this.Set_Origin = function (value) {
	    this.origin = value;
	};

	this.Set_Bid = function (value) {
	    this.bid = value;
	};

	this.Set_Ask = function (value) {
	    this.ask = value;
	};

	this.GetForColor = function () {
	    var forColor = color_black;
	    switch (this.BSStatus) {
	        case 0:
	            forColor = color_red;
	            break;
	        case 1:
	            forColor = color_blue;
	            break;
	    }
	    return forColor;
	};

	this.GetBSStatusPrompt = function () {
	    var BSStatusPrompt = "";
	    switch (this.BSStatus) {
	        case 0:
	            BSStatusPrompt = "Sell";
	            break;
	        case 1:
	            BSStatusPrompt = "Buy";
	            break;
	        case 2:
	            BSStatusPrompt = "Mix";
	            break;
	    }
	    return BSStatusPrompt;
	};
}