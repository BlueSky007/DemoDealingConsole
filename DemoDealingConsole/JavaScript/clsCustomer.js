
function Customer(customerID)
{
	this.id = customerID;
	this.code;
	this.privateQuotePolicyID;
	this.publicQuotePolicyID;
	this.dealingPolicyID;

	this.UpdateByDataRow = function (row) {
	    this.code = row("code");
	    this.privateQuotePolicyID = row("privateQuotePolicyID");
	    this.publicQuotePolicyID = row("publicQuotePolicyID");
	    this.dealingPolicyID = row("dealingPolicyID");
	};

	this.UpdateByXmlNode = function (rowNode) {
	    for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
	        var attribute = rowNode.attributes.item(index);
	        switch (attribute.nodeName) {
	            case "ID":
	                this.id = attribute.nodeValue;
	                break;
	            case "Code":
	                this.code = attribute.nodeValue;
	                break;
	            case "PrivateQuotePolicyID":
	                this.privateQuotePolicyID = attribute.nodeValue;
	                break;
	            case "PublicQuotePolicyID":
	                this.publicQuotePolicyID = attribute.nodeValue;
	                break;
	            case "DealingPolicyID":
	                this.dealingPolicyID = attribute.nodeValue;
	                break;
	        }
	    }
	};

	this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
	    //this.id = xmlNodeRow.getAttribute("ID");
	    this.code = xmlNodeRow.getAttribute("Code");
	    this.publicQuotePolicyID = xmlNodeRow.getAttribute("PublicQuotePolicyID");
	    this.privateQuotePolicyID = xmlNodeRow.getAttribute("PrivateQuotePolicyID");
	    this.dealingPolicyID = xmlNodeRow.getAttribute("DealingPolicyID");
	};
}



