function Group() {
    this.id;
    this.code;

    this.UpdateByDataRow = function (dataRow) {
        this.id = dataRow("GroupID");
        this.code = dataRow("GroupCode");
    };

    this.UpdateByXmlRow = function (xmlRow) {
        var xmlRowColumns = xmlRow.childNodes;
        for (var index = 0, length = xmlRowColumns.length; index < length; index++) {
            var column = xmlRowColumns.item(index);
            this.SetFieldValue(column.tagName, column.text);
        }
    };

    this.UpdateByXmlNode = function (xmlNode) {
        for (var index = 0, length = xmlNode.attributes.length; index < length; index++) {
            var attribute = xmlNode.attributes.item(index);
            this.SetFieldValue(attribute.nodeName, attribute.nodeValue);
        }
    };

    this.SetFieldValue = function (fieldName, value) {
        switch (fieldName) {
            case "GroupID":
                this.id = value;
                break;
            case "GroupCode":
                this.code = value;
                break;
        }
    };

    this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
        this.id = xmlNodeRow.getAttribute("GroupID");
        this.code = xmlNodeRow.getAttribute("GroupCode");
    };
}