
function TradePolicy(tradePolicyID)
{
	this.tradePolicyDetails = new ActiveXObject("Scripting.Dictionary"); //key=instrumentID value=tradePolicyDetail
	
	this.id = tradePolicyID;
	this.code;
	this.description;

	this.UpdateByDataRow = function (row) {
	    /*this.code = row("code");
	    this.description = row("description");*/
	};

	this.UpdateByXmlNode = function (rowNode) {
	    /*for(var index=0,count=rowNode.attributes.length;index<count;index++)
	    {
	    var attribute = rowNode.attributes.item(index);
	    switch(attribute.nodeName)
	    {
	    case "Code":
	    this.code = attribute.nodeValue;
	    break;
	    case "Description":
	    this.description = attribute.nodeValue;
	    break;
	    }
	    }*/
	};

	this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
	    //this.id = xmlNodeRow.getAttribute("ID");
	    //this.code = xmlNodeRow.getAttribute("Code");
	};
}
