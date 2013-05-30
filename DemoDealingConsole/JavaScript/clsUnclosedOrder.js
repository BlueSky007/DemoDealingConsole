function UnclosedOrder() {
    this.orderId;          //PRIMARY KEY
    this.instrumentCode;
    this.isBuy;
    this.lotBalance;
    this.orderCode;
    this.executePrice;
    this.orderTypeID;
    this.executeTime;
    this.contractSize;

    this.UpdateByDataRow = function (row) {
        this.orderId = row("orderId");
        this.instrumentCode = row("InstrumentCode");
        this.isBuy = row("IsBuy");
        this.lotBalance = row("LotBalance");
        this.orderCode = row("OrderCode");
        this.executePrice = row("ExecutePrice");
        this.orderTypeID = row("OrderTypeID");
        this.executeTime = row("ExecuteTime");
        this.contractSize = row("ContractSize");
    };
}
