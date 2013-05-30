
function Account(accountID)
{
	this.id = accountID;
	this.code;
	this.groupID;
	this.groupCode = "";
	this.type;
	this.tradePolicyID;
	this.customerID;
//	this.rateLotMultiplier;
	this.isSplitLot = true;
/*AccountID,AccountCode,CurrencyID,CurrencyCode,IsAgentAccount,IsSplitLot,IsAutoClose,RateMarginD,RateMarginLockD,AgentID,LockedByID,LockedByNames,Balance,AlertLevel,PLInterestNotCut,PLTradeNotCut,NecessaryMargin*/

	this.UpdateByDataRow = function (row) {
	    this.groupID = row("GroupID");
        this.groupCode = row("GroupCode");
	    this.code = row("code");
	    this.type = row("type");
	    this.customerID = row("customerID");
	    this.tradePolicyID = row("tradePolicyID");
	    //this.rateLotMultiplier = row("rateLotMultiplier");
	};

	this.UpdateByXmlNode = function (rowNode) {
	    for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
	        var attribute = rowNode.attributes.item(index);
	        var value = attribute.nodeValue;
	        switch (attribute.nodeName) {
	            case "GroupID":
	                this.groupID = value;
	                break;
	            case "GroupCode":
	                this.groupCode = value;
	                break;
	            case "Code":
	                this.code = value;
	                break;
	            case "Type":
	                this.type = parseInt(value);
	                break;
	            case "CustomerID":
	                this.customerID = value;
	                break;
	            case "TradePolicyID":
	                this.tradePolicyID = value;
	                break;
//	            case "RateLotMultiplier":
//	                this.rateLotMultiplier = parseFloat(value);
//	                break;
	        }
	    }
	};

	this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
	    //this.id = xmlNodeRow.getAttribute("ID");
	    this.code = xmlNodeRow.getAttribute("Code");
	    this.groupID = xmlNodeRow.getAttribute("GroupID");
	    this.groupCode = xmlNodeRow.getAttribute("GroupCode");
	    this.type = XmlConvert.ToInt32(xmlNodeRow.getAttribute("Type"));
	    this.tradePolicyID = xmlNodeRow.getAttribute("TradePolicyID");
	    this.customerID = xmlNodeRow.getAttribute("CustomerID");
//	    this.rateLotMultiplier = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("RateLotMultiplier"));
	};
}


