
function QuotePolicy(quotePolicyID)
{
	this.quotePolicyDetails = new ActiveXObject("Scripting.Dictionary"); //key=instrumentID value=quotePolicyDetails
	
	this.id = quotePolicyID;
	this.code;
	this.description;
	this.isDefault;

	this.UpdateByDataRow = function (row) {
	    this.code = row("code");
	    this.description = row("description");
	    this.isDefault = row("isDefault");
	};

	this.UpdateByXmlNode = function (rowNode) {
	    var quotePolicyDetails = (new VBArray(this.quotePolicyDetails.items())).toArray();
	    for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
	        var attribute = rowNode.attributes.item(index);
	        switch (attribute.nodeName) {
	            case "Code":
	                this.code = attribute.nodeValue;
	                for (var index2 = 0, count = quotePolicyDetails.length; index2 < count; index2++) {
	                    quotePolicyDetails[index2].code = this.code;
	                }
	                break;
	            case "Description":
	                this.description = attribute.nodeValue;
	                for (var index2 = 0, count = quotePolicyDetails.length; index2 < count; index2++) {
	                    quotePolicyDetails[index2].description = this.description;
	                }
	                break;
	            case "IsDefault":
	                this.isDefault = attribute.nodeValue.toLowerCase() == "true" ? true : false;
	                for (var index2 = 0, count = quotePolicyDetails.length; index2 < count; index2++) {
	                    quotePolicyDetails[index2].isDefault = this.isDefault;
	                }
	                break;
	        }
	    }
	};

	this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
	    //this.id = xmlNodeRow.getAttribute("ID");
	    this.code = xmlNodeRow.getAttribute("Code");
	    this.description = xmlNodeRow.getAttribute("Description");
	    this.isDefault = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsDefault"));
	};
}

