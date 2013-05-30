function InstrumentSortByCode(instrumentId, order, code, originCode) {
    this.instrumentId = instrumentId;
    this.order = order;
    this.code = code;
    this.originCode = originCode;

    this.getComboCodeItem = function () {
        return "#" + this.instrumentId + ";" + this.code;
    };

    this.getComboOriginCodeItem = function () {
        return "#" + this.originCode + ";" + this.originCode;
    };
}