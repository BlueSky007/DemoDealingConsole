
function TradeTime()
{
	this.instrumentID;
	this.beginTime;
	this.endTime;

	this.UpdateByDataRow = function (row) {
	    this.instrumentID = row("instrumentID");
	    this.beginTime = new Date(row("beginTime"));
	    this.endTime = new Date(row("endTime"));
	};

	this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
	    this.instrumentID = xmlNodeRow.getAttribute("InstrumentID");
	    this.beginTime = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("BeginTime"));
	    this.endTime = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("EndTime"));
	};
}


