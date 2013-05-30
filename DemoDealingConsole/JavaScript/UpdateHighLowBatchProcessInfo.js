function UpdateHighLowBatchProcessInfo() {
    this.batchProcessId;
    this.instrumentId;
    this.instrumentCode;
    this.newInput;
    this.isUpdateHigh;
    this.highBid;
    this.lowBid;
    this.updateTime;

    this.id = "";
    this.code = "";

    this.getId = function () {
        if (this.id == "") {
            this.id = this.instrumentId + "_" + this.batchProcessId.toString();
        }
        return this.id;
    };

    this.getCode = function () {
        if (this.code == "") {
            this.code = this.instrumentCode + " at " + GetDateTimeString(this.updateTime, "DateTime") +" Modify " + (this.isUpdateHigh ? "High" : "Low") + " New Input: " + this.newInput + "(Batch:" + this.batchProcessId.toString() + ")";
        }
        return this.code;
    };

    this.sortKey = function () {
        return this.instrumentCode + GetDateTimeString(this.updateTime, "DateTime");
    };

    this.Instance = function (batchProcessId, instrumentId, instrumentCode, newInput, isUpdateHigh, highBid, lowBid, updateTime) {
        this.batchProcessId = batchProcessId;
        this.instrumentId = instrumentId;
        this.instrumentCode = instrumentCode;
        this.newInput = newInput;
        this.isUpdateHigh = isUpdateHigh;
        this.highBid = highBid;
        this.lowBid = lowBid;
        this.updateTime = new Date(updateTime);
    };

    this.UpdateByXmlRow = function (xmlRow) {
        var xmlRowColumns = xmlRow.childNodes;
        for (var i = 0, length = xmlRowColumns.length; i < length; i++) {
            var column = xmlRowColumns.item(i);
            this.SetFieldValue(column.tagName, column.text);
        }
    };

    this.SetFieldValue = function (fieldName, value) {
        switch (fieldName) {
            case "BatchProcessId":
                this.batchProcessId = XmlConvert.ToInt32(value);
                break;
            case "InstrumentId":
                this.instrumentId = value;
                break;
            case "InstrumentCode":
                this.instrumentCode = value;
                break;
            case "NewInput":
                this.newInput = value;
                break;
            case "IsUpdateHigh":
                this.isUpdateHigh = XmlConvert.ToBoolean(value);
                break;
            case "HighBid":
                this.highBid = value;
                break;
            case "LowBid":
                this.lowBid = value;
                break;
            case "UpdateTime":
                this.updateTime = XmlConvert.ToDateTime(value);
                break;
        }
    };

}