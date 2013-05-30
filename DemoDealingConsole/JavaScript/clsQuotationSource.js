
//Modified by Michael on 2008-05-26
/*
function QuotationSource(sourceName)
{
	this.SourceName = sourceName;
	this.IsActive = false;
	
	this.UpdateByDataRow = function(row)
	{
		this.SourceName = row("SourceName");
		this.IsActive = row("IsActive");
	};

	this.UpdateByXmlNode = function (rowNode)
	{
		for(var index=0,count=rowNode.attributes.length;index<count;index++)
		{
			var attribute = rowNode.attributes.item(index);
			switch(attribute.nodeName)
			{
			case "SourceName":
				this.SourceName = attribute.nodeValue;
				break;
			case "IsActive":
				this.IsActive = (attribute.nodeValue.toLowerCase() == "true") ? true : false;
				break;
			}
		}
	};
}
*/