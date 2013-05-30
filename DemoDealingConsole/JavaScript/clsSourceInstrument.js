
//Added by Michael on 2008-05-23

function SourceInstrument()
{
    this._Code;          //PRIMARY KEY
    this._Sources = "Source1|Source2|Source3|Source4|Source5";
    this._ActiveSource = "Source1";
    this._Source1AdjustedPips = 0;
    this._Source2AdjustedPips = 0;
    this._Source3AdjustedPips = 0;
    this._Source4AdjustedPips = 0;
    this._Source5AdjustedPips = 0;
    this._NumeratorUnit = 1;
	this._Denominator = 1;

	this.Get_Code = function () {
	    return this._Code;
	};
	this.Set_Code = function (value) {
	    this._Code = value;
	};

	this.Get_Sources = function () {
	    return this._Sources;
	};
	this.Set_Sources = function (value) {
	    this._Sources = value;
	};

	this.Get_ActiveSource = function () {
	    return this._ActiveSource;
	};
	this.Set_ActiveSource = function (value) {
	    this._ActiveSource = value;
	};

	this.Get_Source1AdjustedPips = function () {
	    return this._Source1AdjustedPips;
	};
	this.Set_Source1AdjustedPips = function (value) {
	    this._Source1AdjustedPips = value;
	};

	this.Get_Source2AdjustedPips = function () {
	    return this._Source2AdjustedPips;
	};
    this.Set_Source2AdjustedPips = function (value) {
        this._Source2AdjustedPips = value;
    };

    this.Get_Source3AdjustedPips = function () {
        return this._Source3AdjustedPips;
    };
    this.Set_Source3AdjustedPips = function (value) {
        this._Source3AdjustedPips = value;
    };

    this.Get_Source4AdjustedPips = function () {
        return this._Source4AdjustedPips;
    };
    this.Set_Source4AdjustedPips = function (value) {
        this._Source4AdjustedPips = value;
    };

    this.Get_Source5AdjustedPips = function () {
        return this._Source5AdjustedPips;
    };
    this.Set_Source5AdjustedPips = function (value) {
        this._Source5AdjustedPips = value;
    };

    this.Get_NumeratorUnit = function () {
        return this._NumeratorUnit;
    };

    this.Get_Denominator = function () {
        return this._Denominator;
    };

    this.UpdateByDataRow = function (row) {
        this._Code = row("Code");
        this._Sources = row("Sources");
        this._ActiveSource = row("ActiveSource");
        this._Source1AdjustedPips = row("Source1AdjustedPips");
        this._Source2AdjustedPips = row("Source2AdjustedPips");
        this._Source3AdjustedPips = row("Source3AdjustedPips");
        this._Source4AdjustedPips = row("Source4AdjustedPips");
        this._Source5AdjustedPips = row("Source5AdjustedPips");
        this._NumeratorUnit = row("NumeratorUnit");
        this._Denominator = row("Denominator");
    };

    this.UpdateByXmlNode = function (rowNode) {
        for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
            var attribute = rowNode.attributes.item(index);
            switch (attribute.nodeName) {
                case "Code":
                    this._Code = attribute.nodeValue;
                    break;
                case "Sources":
                    this._Sources = attribute.nodeValue;
                    break;
                case "ActiveSource":
                    this._ActiveSource = attribute.nodeValue;
                    break;
                case "Source1AdjustedPips":
                    this._Source1AdjustedPips = parseInt(attribute.nodeValue);
                    break;
                case "Source2AdjustedPips":
                    this._Source2AdjustedPips = parseInt(attribute.nodeValue);
                    break;
                case "Source3AdjustedPips":
                    this._Source3AdjustedPips = parseInt(attribute.nodeValue);
                    break;
                case "Source4AdjustedPips":
                    this._Source4AdjustedPips = parseInt(attribute.nodeValue);
                    break;
                case "Source5AdjustedPips":
                    this._Source5AdjustedPips = parseInt(attribute.nodeValue);
                    break;
                case "NumeratorUnit":
                    this._NumeratorUnit = parseInt(attribute.nodeValue);
                    break;
                case "Denominator":
                    this._Denominator = parseInt(attribute.nodeValue);
                    break;
            }
        }
    };

    this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
        this._Code = xmlNodeRow.getAttribute("Code");
        this._Sources = xmlNodeRow.getAttribute("Sources");
        this._ActiveSource = xmlNodeRow.getAttribute("ActiveSource");
        this._Source1AdjustedPips = XmlConvert.ToInt32(xmlNodeRow.getAttribute("Source1AdjustedPips"));
        this._Source2AdjustedPips = XmlConvert.ToInt32(xmlNodeRow.getAttribute("Source2AdjustedPips"));
        this._Source3AdjustedPips = XmlConvert.ToInt32(xmlNodeRow.getAttribute("Source3AdjustedPips"));
        this._Source4AdjustedPips = XmlConvert.ToInt32(xmlNodeRow.getAttribute("Source4AdjustedPips"));
        this._Source5AdjustedPips = XmlConvert.ToInt32(xmlNodeRow.getAttribute("Source5AdjustedPips"));
        this._NumeratorUnit = XmlConvert.ToInt32(xmlNodeRow.getAttribute("NumeratorUnit"));
        this._Denominator = XmlConvert.ToInt32(xmlNodeRow.getAttribute("Denominator"));
    };
}
