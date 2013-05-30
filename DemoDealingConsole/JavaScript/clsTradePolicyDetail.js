
function TradePolicyDetail(instrumentID)
{
	this.instrumentID = instrumentID;
	this.tradePolicyID;
	
	this.contractSize;
	this.quotationMask;

	this.UpdateByDataRow = function (row) {
	    this.tradePolicyID = row("tradePolicyID");
	    this.contractSize = row("contractSize");
	    this.quotationMask = row("QuotationMask");
	};

	this.UpdateByXmlNode = function (rowNode) {
	    for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
	        var attribute = rowNode.attributes.item(index);
	        switch (attribute.nodeName) {
	            case "InstrumentID":
	                this.instrumentID = attribute.nodeValue;
	                break;
	            case "TradePolicyID":
	                this.tradePolicyID = attribute.nodeValue;
	                break;
	            case "ContractSize":
	                this.contractSize = parseFloat(attribute.nodeValue);
	                break;
	            case "QuotationMask":
	                this.quotationMask = parseInt(attribute.nodeValue);
	                break;
	        }
	    }
	};

	this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
	    //this.instrumentID = xmlNodeRow.getAttribute("InstrumentID");
	    this.tradePolicyID = xmlNodeRow.getAttribute("TradePolicyID");
	    this.contractSize = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("ContractSize"));
	    this.quotationMask = XmlConvert.ToInt32(xmlNodeRow.getAttribute("QuotationMask"));
	};
}
