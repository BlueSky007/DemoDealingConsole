function QuotePolicyDetail(instrumentID)
{
	this.instrumentID = instrumentID;
	this.quotePolicyID;
	
	this.code;
	this.description;
	this.isDefault;
	
	this.priceType;
	this.autoAdjustPoints;
	this.autoAdjustPoints2;
	this.autoAdjustPoints3;
	this.autoAdjustPoints4;
	this.spreadPoints;
	this.spreadPoints2;
	this.spreadPoints3;
	this.spreadPoints4;
	this.isOriginHiLo;
	this.maxAutoAdjustPoints;
	this.maxSpreadPoints;
	//this.autoDQDelay;
	
	this.priceTypeTemp = null;
	this.autoAdjustPointsTemp = null;
	this.autoAdjustPoints2Temp = null;
	this.autoAdjustPoints3Temp = null;
	this.autoAdjustPoints4Temp = null;
	this.spreadPointsTemp = null;
	this.spreadPoints2Temp = null;
	this.spreadPoints3Temp = null;
	this.spreadPoints4Temp = null;
	this.isOriginHiLoTemp = null;
	this.maxAutoAdjustPointsTemp = null;
	this.maxSpreadPointsTemp = null;

	this.buyLot = 0.0;
	this.sellLot = 0.0;

	this.ConfirmParamValue = function (property, value, isAccept) {
	    switch (property) {
	        case "SpreadPoints":
	            if (isAccept)
	                this.spreadPoints = value;
	            this.spreadPointsTemp = null;
	            break;
	        case "SpreadPoints2":
	            if (isAccept)
	                this.spreadPoints2 = value;
	            this.spreadPoints2Temp = null;
	            break;
	        case "SpreadPoints3":
	            if (isAccept)
	                this.spreadPoints3 = value;
	            this.spreadPoints3Temp = null;
	            break;
	        case "SpreadPoints4":
	            if (isAccept)
	                this.spreadPoints4 = value;
	            this.spreadPoints4Temp = null;
	            break;
	        case "AutoAdjustPoints":
	            if (isAccept)
	                this.autoAdjustPoints = value;
	            this.autoAdjustPointsTemp = null;
	            break;
	        case "AutoAdjustPoints2":
	            if (isAccept)
	                this.autoAdjustPoints2 = value;
	            this.autoAdjustPoints2Temp = null;
	            break;
	        case "AutoAdjustPoints3":
	            if (isAccept)
	                this.autoAdjustPoints3 = value;
	            this.autoAdjustPoints3Temp = null;
	            break;
	        case "AutoAdjustPoints4":
	            if (isAccept)
	                this.autoAdjustPoints4 = value;
	            this.autoAdjustPoints4Temp = null;
	            break;
	        case "IsOriginHiLo":
	            if (isAccept)
	                this.isOriginHiLo = value;
	            this.isOriginHiLoTemp = null;
	            break;
	        case "PriceType":
	            if (isAccept)
	                this.priceType = value;
	            this.priceTypeTemp = null;
	            break;
	        case "MaxAutoAdjustPoints":
	            if (isAccept)
	                this.maxAutoAdjustPoints = value;
	            this.maxAutoAdjustPointsTemp = null;
	            break;
	        case "MaxSpreadPoints":
	            if (isAccept)
	                this.maxSpreadPoints = value;
	            this.maxSpreadPointsTemp = null;
	            break;
	        default:
	            break;
	    }
	};

	this.UpdateByDataRow = function (row) {
	    this.quotePolicyID = row("quotePolicyID");
	    this.priceType = row("priceType");
	    this.autoAdjustPoints = row("autoAdjustPoints");
	    this.autoAdjustPoints2 = row("autoAdjustPoints2");
	    this.autoAdjustPoints3 = row("autoAdjustPoints3");
	    this.autoAdjustPoints4 = row("autoAdjustPoints4");
	    this.spreadPoints = row("spreadPoints");
	    this.spreadPoints2 = row("spreadPoints2");
	    this.spreadPoints3 = row("spreadPoints3");
	    this.spreadPoints4 = row("spreadPoints4");
	    this.isOriginHiLo = row("isOriginHiLo");
	    this.maxAutoAdjustPoints = row("maxAutoAdjustPoints");
	    this.maxSpreadPoints = row("maxSpreadPoints");
	    this.buyLot = row("buyLot");
	    this.sellLot = row("sellLot");
	};

	this.UpdateByXmlNode = function (rowNode) {
	    for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
	        var attribute = rowNode.attributes.item(index);
	        switch (attribute.nodeName) {
	            case "QuotePolicyID":
	                this.quotePolicyID = attribute.nodeValue;
	                break;
	            case "InstrumentID":
	                this.instrumentID = attribute.nodeValue;
	                break;
	            case "PriceType":
	                this.priceType = parseInt(attribute.nodeValue);
	                break;
	            case "AutoAdjustPoints":
	                this.autoAdjustPoints = parseInt(attribute.nodeValue);
	                break;
	            case "AutoAdjustPoints2":
	                this.autoAdjustPoints2 = attribute.nodeValue;
	                break;
	            case "AutoAdjustPoints3":
	                this.autoAdjustPoints3 = attribute.nodeValue;
	                break;
	            case "AutoAdjustPoints4":
	                this.autoAdjustPoints4 = attribute.nodeValue;
	                break;
	            case "SpreadPoints":
	                this.spreadPoints = parseInt(attribute.nodeValue);
	                break;
	            case "SpreadPoints2":
	                this.spreadPoints2 = attribute.nodeValue;
	                break;
	            case "SpreadPoints3":
	                this.spreadPoints3 = attribute.nodeValue;
	                break;
	            case "SpreadPoints4":
	                this.spreadPoints4 = attribute.nodeValue;
	                break;
	            case "IsOriginHiLo":
	                this.isOriginHiLo = attribute.nodeValue.toLowerCase() == "true" ? true : false;
	                break;
	            case "MaxAutoAdjustPoints":
	                this.maxAutoAdjustPoints = parseInt(attribute.nodeValue);
	                break;
	            case "MaxSpreadPoints":
	                this.maxSpreadPoints = parseInt(attribute.nodeValue);
	                break;
	            case "BuyLot":
	                this.buyLot = parseFloat(attribute.nodeValue);
	                break;
	            case "SellLot":
	                this.sellLot = parseFloat(attribute.nodeValue);
	                break;
	        }
	    }
	};

	this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
	    this.quotePolicyID = xmlNodeRow.getAttribute("QuotePolicyID");
	    this.instrumentID = xmlNodeRow.getAttribute("InstrumentID");
	    this.priceType = XmlConvert.ToInt32(xmlNodeRow.getAttribute("PriceType"));
	    this.autoAdjustPoints = XmlConvert.ToInt32(xmlNodeRow.getAttribute("AutoAdjustPoints"));
	    this.autoAdjustPoints2 = xmlNodeRow.getAttribute("AutoAdjustPoints2");
	    this.autoAdjustPoints3 = xmlNodeRow.getAttribute("AutoAdjustPoints3");
	    this.autoAdjustPoints4 = xmlNodeRow.getAttribute("AutoAdjustPoints4");
        this.spreadPoints = XmlConvert.ToInt32(xmlNodeRow.getAttribute("SpreadPoints"));
	    this.spreadPoints2 = xmlNodeRow.getAttribute("SpreadPoints2");
	    this.spreadPoints3 = xmlNodeRow.getAttribute("SpreadPoints3");
	    this.spreadPoints4 = xmlNodeRow.getAttribute("SpreadPoints4");
	    this.isOriginHiLo = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsOriginHiLo"));
	    this.maxAutoAdjustPoints = XmlConvert.ToInt32(xmlNodeRow.getAttribute("MaxAutoAdjustPoints"));
	    this.maxSpreadPoints = XmlConvert.ToInt32(xmlNodeRow.getAttribute("MaxSpreadPoints"));
	    this.buyLot = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("BuyLot"));
	    this.sellLot = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("SellLot"));
	};
}
