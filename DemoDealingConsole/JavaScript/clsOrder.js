
function Order(OrderID) {
    //property
    this.id = OrderID;
    this.code;
    this.tradeOption;
    this.isOpen;
    this.isBuy;
    this.blotterCode = null;
    this.setPrice;
    this.executePrice;
    this.lot;
    this.lotBalance;
    this.lotChanged = false;
    this.hitCount = 0;
    this.bestPrice;
    this.bestTime;
    this.dQMaxMove = 0;
    this.submitorID = null;

    /*OrderID,OrderCode,Phase,TransactionID,TransactionCode,TransactionType,AssigningOrderID,TradeType,TradeOption,IsOpen,IsBuy,AccountID,InstrumentID,ContractSize, BeginTime, EndTime,SubmitTime, ExecuteTime, SetPrice, Price, Lot, LotBalance,CommissionSum, LevySum, ApplicantID, RatifierID, NextPromptPrice,HitCount, BestPrice, BestTime, ModifyPersonID, ModifyDTime,InterestDate, InterestPerLot*/

    //
    this.tran = null;
    this.mainWindow = null;
    this.instrument = null;
    this.account = null;
    this.customer = null;
    this.preBestPrice;
    this.preBestTime;
    this.status = OrderStatus.Placing;
    this.lastStatus = OrderStatus.Placing;

    this.RelationString = "";

    //Added by Michael on 2008-06-27
    this.AutoLimitPrice = null;
    this.AutoStopPrice = null;

    this.printed = false;//avoid re-printing

    this.orderRelations = new Array();

    //method

    this.UpdateByXmlNode = function (xmlNode) {
        for (var index = 0, count = xmlNode.attributes.length; index < count; index++) {
            var attribute = xmlNode.attributes.item(index);
            switch (attribute.nodeName) {
                case "ID":
                    this.id = attribute.nodeValue;
                    break;
                case "Code":
                    this.code = attribute.nodeValue;
                    break;
                case "TradeOption":
                    this.tradeOption = parseInt(attribute.nodeValue);
                    break;
                case "IsOpen":
                    this.isOpen = (attribute.nodeValue.toLowerCase() == "true") ? true : false;
                    break;
                case "IsBuy":
                    this.isBuy = (attribute.nodeValue.toLowerCase() == "true") ? true : false;
                    break;
                case "BlotterCode":
                    this.blotterCode = attribute.nodeValue;
                    break;
                case "SetPrice":
                    {
                        var instrument = this.GetInstrument();
                        //this.setPrice = new Price(attribute.nodeValue,parseFloat(attribute.nodeValue),
                        //								instrument.numeratorUnit,instrument.denominator);
                        this.setPrice = ObjectPool.GetCorrectPriceHelper(attribute.nodeValue, instrument.numeratorUnit, instrument.denominator);
                    }
                    break;
                case "ExecutePrice":
                    {
                        var instrument = this.GetInstrument();
                        //this.executePrice = new Price(attribute.nodeValue,parseFloat(attribute.nodeValue),
                        //								instrument.numeratorUnit,instrument.denominator);
                        this.executePrice = ObjectPool.GetCorrectPriceHelper(attribute.nodeValue, instrument.numeratorUnit, instrument.denominator);
                    }
                    break;
                case "Lot":
                    //Modified by Michael on 2005-04-08
                    this.lot = parseFloat(attribute.nodeValue);
                    //this.lot = parseInt(attribute.nodeValue);
                    break;
                case "LotBalance":
                    this.lotBalance = parseFloat(attribute.nodeValue);
                    break;
                case "DQMaxMove":
                    this.dQMaxMove = parseInt(attribute.nodeValue);
                    break;
                case "SubmitorID":
                    this.submitorID = attribute.nodeValue;
                    break;

                //Added by Michael on 2008-06-27    
                case "AutoLimitPrice":
                    if (attribute.nodeValue == "") {
                        this.AutoLimitPrice = null;
                    }
                    else {
                        var instrument = this.GetInstrument();
                        this.AutoLimitPrice = ObjectPool.GetCorrectPriceHelper(attribute.nodeValue, instrument.numeratorUnit, instrument.denominator);
                    }
                    break;
                case "AutoStopPrice":
                    if (attribute.nodeValue == "") {
                        this.AutoStopPrice = null;
                    }
                    else {
                        var instrument = this.GetInstrument();
                        this.AutoStopPrice = ObjectPool.GetCorrectPriceHelper(attribute.nodeValue, instrument.numeratorUnit, instrument.denominator);
                    }
                    break;

            }
        }
    };

    this.GetInstrument = function () {
        if (!this.instrument) {
            if (oInstruments.Exists(this.tran.instrumentID) == true)
                this.instrument = oInstruments.Item(this.tran.instrumentID);
        }
        return this.instrument;
    };

    this.GetAccount = function () {
        if (!this.account) {
            if (oAccounts.Exists(this.tran.accountID) == true)
                this.account = oAccounts.Item(this.tran.accountID);
        }

        if (!this.account) {
            oIOProxy.SyncGetAccount(this.tran.accountID);
        }
        this.account = oAccounts.Item(this.tran.accountID);

        return this.account;
    };

    this.GetCustomer = function () {
        if (!this.customer) {
            /*var submitorID2 = this.submitorID;
            if (!submitorID2) submitorID2 = this.tran.submitorID;

            if (submitorID2) {
            if (!oCustomers.Exists(submitorID2) || !oCustomers.Item(submitorID2)) {
            oIOProxy.SyncGetCustomer(submitorID2);
            }
            this.customer = oCustomers.Item(submitorID2);
            }
            else {
            var account = this.GetAccount();
            if (account) {
            if (!oCustomers.Exists(account.customerID) == true){
            oIOProxy.SyncGetCustomer(account.customerID);
            }
            this.customer = oCustomers.Item(account.customerID);
            }
            }*/
            var account = this.GetAccount();
            if (account) {
                if (!oCustomers.Exists(account.customerID) == true) {
                    oIOProxy.SyncGetCustomer(account.customerID);
                }
                this.customer = oCustomers.Item(account.customerID);
            }
        }
        return this.customer;
    };

    //Added by Michael on 2005-05-24
    this.GetQuotePolicyDetail = function () {
        var instrument = this.GetInstrument();
        var customer = this.GetCustomer();
        if (!instrument || !customer) return null;

        var quotePolicyDetail = instrument.GetQuotePolicyDetail(customer.privateQuotePolicyID);
        if (!quotePolicyDetail)
            quotePolicyDetail = instrument.GetQuotePolicyDetail(customer.publicQuotePolicyID);

        return quotePolicyDetail;
    };

    this.quotePolicyCode = "";
    this.GetQuotePolicyCode = function () {
        if (this.quotePolicyCode == "") {
            var quotePolicyDetail = this.GetQuotePolicyDetail();
            if (quotePolicyDetail) {
                this.quotePolicyCode = quotePolicyDetail.code;
            }
        }
        return this.quotePolicyCode;
    };

    this.GetRefPriceAndPriceDifString = function () {
        var oPrice = new Object();
        oPrice.refPrice = null;
        oPrice.priceDif = null;

        var lastQuotation;
        var instrument = this.GetInstrument();
        var account = this.GetAccount();
        var customer = this.GetCustomer();
        var tradePolicyDetail = instrument.GetTradePolicyDetail(account.tradePolicyID);
        var quotePolicyDetail = instrument.GetQuotePolicyDetail(customer.privateQuotePolicyID);
        if (!quotePolicyDetail)
            quotePolicyDetail = instrument.GetQuotePolicyDetail(customer.publicQuotePolicyID);
        if (instrument && account && customer && tradePolicyDetail && quotePolicyDetail) {
            //Modified by Michael on 20008-02-15
            //old enable quotation mask
            /*
            var isUsingOrigin = true;
            if(tradePolicyDetail && (this.tran.orderType == OrderType.Limit))// || this.tran.orderType == OrderType.Market))
            isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2,parseInt(this.tran.orderType))))==Math.pow(2,parseInt(this.tran.orderType));
				
            var lastQuotation;
            if(isUsingOrigin)
            {
            lastQuotation = instrument.lastQuotation;
            }
            else
            {
            if(instrument.lastOverrideQuotations.Exists( customer.privateQuotePolicyID ))
            lastQuotation = instrument.lastOverrideQuotations.Item( customer.privateQuotePolicyID );
            else if(instrument.lastOverrideQuotations.Exists( customer.publicQuotePolicyID ))
            lastQuotation = instrument.lastOverrideQuotations.Item( customer.publicQuotePolicyID );
            }
            */

            //new disenable quotation mask
            //var isUsingOrigin = true;
            //if(tradePolicyDetail && (this.tran.orderType == OrderType.Limit))// || this.tran.orderType == OrderType.Market))
            //	isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2,parseInt(this.tran.orderType))))==Math.pow(2,parseInt(this.tran.orderType));

            var lastQuotation;
            //if(isUsingOrigin)
            //{
            //	lastQuotation = instrument.lastQuotation;
            //}
            //else
            //{
            if (instrument.lastOverrideQuotations.Exists(customer.privateQuotePolicyID))
                lastQuotation = instrument.lastOverrideQuotations.Item(customer.privateQuotePolicyID);
            else if (instrument.lastOverrideQuotations.Exists(customer.publicQuotePolicyID))
                lastQuotation = instrument.lastOverrideQuotations.Item(customer.publicQuotePolicyID);
            //}


            if (instrument) {
                var priceDif = null;

                var lastAsk = (lastQuotation) ? lastQuotation.ask : null;
                var lastBid = (lastQuotation) ? lastQuotation.bid : null;
                if (instrument.isNormal ^ this.isBuy) {
                    if (lastBid) {
                        oPrice.refPrice = lastBid;
                        priceDif = Math.abs(lastBid.SubStract(this.setPrice));
                        //oPrice.priceDif = new Price(priceDif,parseFloat(priceDif),instrument.numeratorUnit,instrument.denominator).ToString();
                        var price = ObjectPool.GetPriceHelper(priceDif, instrument.numeratorUnit, instrument.denominator);
                        oPrice.priceDif = (price == null) ? "" : price.ToString();
                    }

                }
                else {
                    if (lastAsk) {
                        oPrice.refPrice = lastAsk;
                        priceDif = Math.abs(this.setPrice.SubStract(lastAsk));
                        //oPrice.priceDif = new Price(priceDif,parseFloat(priceDif),instrument.numeratorUnit,instrument.denominator).ToString();

                        var price = ObjectPool.GetPriceHelper(priceDif, instrument.numeratorUnit, instrument.denominator);
                        oPrice.priceDif = (price == null) ? "" : price.ToString();
                    }

                }
            }
        }
        return oPrice;
    };

    this.IsExceedAcceptDQVariation = function (price) {
        /*
        IsNormal IsBuy      DQVariation
        TRUE     TRUE     LastAsk - Order.SetPrice
        FALSE    FALSE    LastAsk - Order.SetPrice
        TRUE     FALSE    Order.SetPrice - LastBid
        FALSE    TRUE     Order.SetPrice - LastBid*/
        var isExceed = true;
        var instrument = this.GetInstrument();
        var customer = this.GetCustomer();
        var lastQuotation;
        if (instrument.lastOverrideQuotations.Exists(customer.privateQuotePolicyID))
            lastQuotation = instrument.lastOverrideQuotations.Item(customer.privateQuotePolicyID);
        else if (instrument.lastOverrideQuotations.Exists(customer.publicQuotePolicyID))
            lastQuotation = instrument.lastOverrideQuotations.Item(customer.publicQuotePolicyID);
        if (instrument && lastQuotation) {
            var dqVariation = 0;
            var lastAsk = lastQuotation.ask;
            var lastBid = lastQuotation.bid;
            if (instrument.isNormal == this.isBuy) {
                if (lastAsk)//lastBid)
                {
                    dqVariation = lastAsk.SubStract(price); //lastBid.SubStract( this.setPrice );
                }
            }
            else {
                if (lastBid)//lastAsk)
                {
                    dqVariation = price.SubStract(lastBid); //lastAsk );
                }
            }
            isExceed = (dqVariation > instrument.acceptDQVariation);
        }
        return isExceed;
    };
        
    this.IsPriceExceedMaxMin = function (price) {
        /*(IsNormal  XOR IsBuy)    Condition
        False    NOT( MaxAsk > Price > (MinAsk+ MaxMinAdjust))  
        True      NOT( (MaxBid - MaxMinAdjust) > Price > MinBid)*/
        var isExceed = true;
        var instrument = this.GetInstrument();
        if (instrument.maxMinAdjust == 0) return false; //This is a operation's logic

        var account = this.GetAccount();
        var customer = this.GetCustomer();
        var tradePolicyDetail = instrument.GetTradePolicyDetail(account.tradePolicyID);

        var quotePolicyDetail = null;
        if ((typeof (customer.privateQuotePolicyID) != "undefined") && (customer.privateQuotePolicyID != null)) {
            quotePolicyDetail = instrument.GetQuotePolicyDetail(customer.privateQuotePolicyID);
        }

        if (quotePolicyDetail == null)
            quotePolicyDetail = instrument.GetQuotePolicyDetail(customer.publicQuotePolicyID);

        if (instrument && account && customer && tradePolicyDetail && quotePolicyDetail) {
            var maxMin;
            var maxAsk;
            var minAsk;
            var maxBid;
            var minBid;
            var isUsingOrigin = true;
            //Remarked by Michael on 2009-02-12
            //if (this.tran.orderType == OrderType.Limit || this.tran.orderType == OrderType.Market)
            //isUsingOrigin = (tradePolicyDetail.quotationMask & (1 << this.tran.orderType)) ? true : false;
            isUsingOrigin = quotePolicyDetail.isOriginHiLo;
            if (isUsingOrigin == true) {
                maxMin = instrument.maxMin;
            }
            else {
                if (instrument.maxMins.Exists(customer.privateQuotePolicyID))
                    maxMin = instrument.maxMins.Item(customer.privateQuotePolicyID);
                else if (instrument.maxMins.Exists(customer.publicQuotePolicyID))
                    maxMin = instrument.maxMins.Item(customer.publicQuotePolicyID);
            }
            if (!maxMin) return true;

            maxAsk = maxMin.maxAsk;
            minAsk = maxMin.minAsk;
            maxBid = maxMin.maxBid;
            minBid = maxMin.minBid;

            if (instrument.isNormal ^ this.isBuy) {
                if (maxBid && minBid)
                    isExceed = price.More(maxBid.Add(0 - instrument.maxMinAdjust)) || price.Less(minBid);
            }
            else {
                if (maxAsk && minAsk)
                    isExceed = price.More(maxAsk) || price.Less(minAsk.Add(instrument.maxMinAdjust));
            }
        }
        return isExceed;
    };

    this.IsExceedAcceptLmtVariation = function () {
        //Modified by Michael on 2003-12-05
        return true;

        /*IsNormal IsBuy      LmtVariation
        TRUE     TRUE   ABS(Order.SetPrice - LastAsk)
        FALSE    FALSE  ABS(Order.SetPrice - LastAsk)
        TRUE     FALSE  ABS(Order.SetPrice - LastBid)
        FALSE    TRUE   ABS(Order.SetPrice - LastBid)*/
        //Remarked by Michael on 2009-02-12        
        //        var isExceed = true;
        //        var instrument = this.GetInstrument();
        //        var account = this.GetAccount();
        //        var customer = this.GetCustomer();

        //        var isUsingOrigin = true;
        //        var tradePolicyDetail = instrument.GetTradePolicyDetail(account.tradePolicyID);
        //        if (tradePolicyDetail &&
        //			(this.tran.orderType == OrderType.Limit || this.tran.orderType == OrderType.Market))
        //            isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2, parseInt(this.tran.orderType)))) == Math.pow(2, parseInt(this.tran.orderType));
        //        //isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2,parseInt(this.orderType))))==Math.pow(2,parseInt(this.orderType));

        //        var lastQuotation;
        //        if (isUsingOrigin) {
        //            lastQuotation = instrument.lastQuotation;
        //        }
        //        else {
        //            if (instrument.lastOverrideQuotations.Exists(customer.privateQuotePolicyID))
        //                lastQuotation = instrument.lastOverrideQuotations.Item(customer.privateQuotePolicyID);
        //            else if (instrument.lastOverrideQuotations.Exists(customer.publicQuotePolicyID))
        //                lastQuotation = instrument.lastOverrideQuotations.Item(customer.publicQuotePolicyID);
        //        }

        //        if (instrument) {
        //            var lmtVariation = -1;
        //            var lastAsk = (lastQuotation) ? lastQuotation.ask : null;
        //            var lastBid = (lastQuotation) ? lastQuotation.bid : null;
        //            if (instrument.isNormal ^ this.isBuy) {
        //                if (lastBid) {
        //                    lmtVariation = Math.abs(lastBid.SubStract(this.setPrice));
        //                }

        //            }
        //            else {
        //                if (lastAsk) {
        //                    lmtVariation = Math.abs(this.setPrice.SubStract(lastAsk));
        //                }

        //            }
        //            isExceed = (lmtVariation > instrument.acceptLmtVariation);
        //        }
        //        return isExceed;
    };

    //Check by Server
    this.IsExceedCancelLmtVariation = function () {
        return true;

        //        var isExceed = true;
        //        var instrument = this.GetInstrument();
        //        var account = this.GetAccount();
        //        var customer = this.GetCustomer();

        //        var isUsingOrigin = true;
        //        var tradePolicyDetail = instrument.GetTradePolicyDetail(account.tradePolicyID);
        //        if (tradePolicyDetail &&
        //			(this.tran.orderType == OrderType.Limit || this.tran.orderType == OrderType.Market))
        //            isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2, parseInt(this.tran.orderType)))) == Math.pow(2, parseInt(this.tran.orderType));
        //        //isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2,parseInt(this.orderType))))==Math.pow(2,parseInt(this.orderType));

        //        var lastQuotation;
        //        if (isUsingOrigin) {
        //            lastQuotation = instrument.lastQuotation;
        //        }
        //        else {
        //            if (instrument.lastOverrideQuotations.Exists(customer.privateQuotePolicyID))
        //                lastQuotation = instrument.lastOverrideQuotations.Item(customer.privateQuotePolicyID);
        //            else if (instrument.lastOverrideQuotations.Exists(customer.publicQuotePolicyID))
        //                lastQuotation = instrument.lastOverrideQuotations.Item(customer.publicQuotePolicyID);
        //        }

        //        if (instrument) {
        //            var lmtVariation = -1;
        //            var lastAsk = (lastQuotation) ? lastQuotation.ask : null;
        //            var lastBid = (lastQuotation) ? lastQuotation.bid : null;
        //            if (instrument.isNormal ^ this.isBuy) {
        //                if (lastBid) {
        //                    lmtVariation = Math.abs(lastBid.SubStract(this.setPrice));
        //                }

        //            }
        //            else {
        //                if (lastAsk) {
        //                    lmtVariation = Math.abs(this.setPrice.SubStract(lastAsk));
        //                }

        //            }
        //            isExceed = (lmtVariation > instrument.cancelLmtVariation);
        //        }
        //        return isExceed;
    };
    
    //Added by Michael on 2009-02-09
    this.SetWaitAcceptRejectPlace = function () {
    };

    this.SetWaitAcceptRejectPlace = function (needPlaySound) {
    };

    this.CheckWhenOrderArrive = function () {
    };

    this.CheckWhenOrderArrive = function (needPlaySound) {
    };

//    this.CheckWhenQuoteArrive = function (quote, isOrigin, quotePolicyID) {
//    };


    this.CheckTimeArrive = function (now) {
        if ((this.tran.orderType == OrderType.MarketOnOpen || this.tran.orderType == OrderType.MarketOnClose) &&
			this.status == OrderStatus.WaitTime) {
            //We must use server time at here
            //var now = this.mainWindow.oSystemTime;//new Date();
            if (now >= this.tran.beginTime && this.tran.endTime > now) {
                this.ChangeStatus(OrderStatus.TimeArrived, true);
                this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
                //update MooMocGrid
                var mooMocDialog = this.mainWindow.parent.orderTaskFrm.mooMocDialog;
                if (mooMocDialog)
                    mooMocDialog.ChangeStatusOfMooMocGrid(this, true);
            }
        }
    };

    this.CheckTimeOut = function (now) {
        //We must use server time at here
        //var now = this.mainWindow.oSystemTime;//new Date();
        if (this.tran.endTime <= now) {
            this.ChangeStatus(OrderStatus.Deleted, true);

            this.mainWindow.parent.orderTaskFrm.RemoveOrderFromGrid(this);
            var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
            instantOrderByInstrumentIFrame._InstantOrderListFrame1.RemoveOrderFromGrid(this);
            instantOrderByInstrumentIFrame._InstantOrderListFrame2.RemoveOrderFromGrid(this);
            instantOrderByInstrumentIFrame._InstantOrderListFrame3.RemoveOrderFromGrid(this);
            instantOrderByInstrumentIFrame._InstantOrderListFrame4.RemoveOrderFromGrid(this);

            //remove this order from this.mainWindow.oPendingOrders
            if (this.mainWindow.oPendingOrders.Exists(this.id) == true)
                this.mainWindow.oPendingOrders.Remove(this.id);
        }
    };

    this.Remove = function () {
        this.ChangeStatus(OrderStatus.Deleted, true);

        this.mainWindow.parent.orderTaskFrm.RemoveOrderFromGrid(this);
        var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
        instantOrderByInstrumentIFrame._InstantOrderListFrame1.RemoveOrderFromGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame2.RemoveOrderFromGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame3.RemoveOrderFromGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame4.RemoveOrderFromGrid(this);

        //remove this order from this.mainWindow.oPendingOrders
        if (this.mainWindow.oPendingOrders.Exists(this.id) == true)
            this.mainWindow.oPendingOrders.Remove(this.id);
    };

    this.ChangeStatus = function (newStatus, needRedraw) {
        this.lastStatus = this.status;
        this.status = newStatus;
        this.mainWindow.parent.orderTaskFrm.UpdateOrderStatus(this, needRedraw);
    };

    this.RestoreStatus = function () {
        var oldStatus = this.status;
        this.status = this.lastStatus;
        this.lastStatus = oldStatus;
        this.mainWindow.parent.orderTaskFrm.UpdateOrderStatus(this,true);
    };

    //Added by Michael on 2006-09-29
    this.DoAcceptPlace = function () {
        if (this.status == OrderStatus.WaitAcceptRejectPlace) {
            this.tran.AcceptPlace(this);
        }
    };
    //Added by Michael on 2006-09-29
    this.DoCancelPlace = function () {
        if (this.status == OrderStatus.WaitAcceptRejectPlace) {
            //Modified by Michael on 2008-08-22
            //var cancelType = 1;			
            //this.tran.ComfirmCancel(this,cancelType);
            this.tran.Reject(this);
        }
    };
    //Added by Michael on 2006-09-29
    this.DoAcceptCancel = function () {
        if (this.status == OrderStatus.WaitAcceptRejectCancel) {
            var cancelType = 1;
            this.ComfirmAcceptCancel(cancelType);
            //this.tran.ComfirmCancel(this,cancelType);
        }
        else {
            var sMsg = "The order is canceled or executed already";
            oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
        }
    };
    //Added by Michael on 2006-09-29
    this.DoRejectCancel = function () {
        if (this.status == OrderStatus.WaitAcceptRejectCancel) {
            this.tran.RejectCancelLmtOrder(this);
        }
        else {
            var sMsg = "The order is canceled or executed already";
            oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
        }
    };

    this.DoAccept = function () {
        if (this.status == OrderStatus.WaitOutPriceDQ || this.status == OrderStatus.WaitOutLotDQ) {
            var lot = "";
            if (this.lotChanged) lot = this.lot.toString();
            if (this.IsNeedDQMaxMove()) {
                this.tran.Commit(this, this.executePrice, lot);
            }
            else {
                this.tran.Commit(this, null, lot);
            }
        }
    };

    //Modified by Michael on 2006-09-30
    this.DoReject = function () {
        if (this.status == OrderStatus.WaitAcceptRejectPlace
			|| this.status == OrderStatus.WaitAcceptRejectCancel

			|| this.status == OrderStatus.WaitOutPriceDQ
			|| this.status == OrderStatus.WaitOutLotDQ
			|| (this.status == OrderStatus.WaitNextPrice && this.tran.orderType == OrderType.Limit)) {
            this.tran.Reject(this);
        }
        else {
            var sMsg = "The order is canceled or executed already";
            oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
        }
    };

    this.DoExecute = function () {
        if (this.tran.subType == TransSubType.Match) {
            var lot = "";
            this.tran.Commit(this, null, lot);
        }
        else {
            if (this.status == OrderStatus.WaitOutPriceLMT || this.status == OrderStatus.WaitOutLotLMT
			|| this.status == OrderStatus.WaitOutLotLMTOrigin) {
                if (this.IsPriceExceedMaxMin(this.bestPrice) == true && this.status == OrderStatus.WaitOutLotLMT) {
                    //Waiting for Dealer Accept/Reject
                    this.ChangeStatus(OrderStatus.WaitOutPriceLMT, true);
                    //this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
                }
                else {
                    if (this.tran.orderType == OrderType.Market)
                        this.setPrice = this.bestPrice.Clone();
                    //Commit Transaction
                    var lot = "";
                    if (this.lotChanged) lot = this.lot.toString();
                    this.tran.Commit(this, null, lot);
                }
            }
        }
    };

    this.DoWait = function () {
        if (this.status == OrderStatus.WaitOutPriceLMT || this.status == OrderStatus.WaitOutLotLMT
			|| this.status == OrderStatus.WaitOutLotLMTOrigin) {
            this.ChangeStatus(OrderStatus.WaitNextPrice, true);

            //this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
        }
    };

    this.DoUpdate = function () {
        //update setprice with Overrided.LastPrice
        //the below 2 lines were taken out when the Origin used for order execution, 
        //if(this.status != OrderStatus.WaitOutLotLMT)
        //	return;

        var instrument = this.GetInstrument();
        var customer = this.GetCustomer();
        if (instrument && customer) {
            //if(instrument.lastQuotation)
            var quotePolicyID;
            if (instrument.lastOverrideQuotations.Exists(customer.privateQuotePolicyID))
                quotePolicyID = customer.privateQuotePolicyID;
            else if (instrument.lastOverrideQuotations.Exists(customer.publicQuotePolicyID))
                quotePolicyID = customer.publicQuotePolicyID;
            if (quotePolicyID) {
                //use override quotation caculate by me.
                //var quote = instrument.CalculateOverrideQuotation(instrument.lastQuotation, oCurrentQuotePolicyDetailID);

                //use override quotation got from QuotationServer.
                var quote = instrument.lastOverrideQuotations.Item(quotePolicyID);
                if (quote) {
                    if (instrument.isNormal ^ this.isBuy)
                        this.bestPrice = quote.bid.Clone();
                    else
                        this.bestPrice = quote.ask.Clone();

                    if (this.tran.orderType == OrderType.Limit)
                        this.setPrice = this.bestPrice.Clone();

                    this.mainWindow.parent.orderTaskFrm.UpdateOrderPrice(this,true);
                }
            }
        }
    };

    this.Cancel = function () {
        this.ChangeStatus(OrderStatus.Canceled, true);

        this.mainWindow.parent.orderTaskFrm.RemoveOrderFromGrid(this);
        var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
        instantOrderByInstrumentIFrame._InstantOrderListFrame1.RemoveOrderFromGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame2.RemoveOrderFromGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame3.RemoveOrderFromGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame4.RemoveOrderFromGrid(this);

        //remove this order from this.mainWindow.oPendingOrders
        if (this.mainWindow.oPendingOrders.Exists(this.id) == true)
            this.mainWindow.oPendingOrders.Remove(this.id);

        //remove this order from this.mainWindow.oDeformityOrders
        if (this.mainWindow.oDeformityOrders.Exists(this.id) == true)
            this.mainWindow.oDeformityOrders.Remove(this.id);
    };

    this.Finish = function () {
        if (this.status == OrderStatus.Deleting || this.lastStatus == OrderStatus.Deleting) {
            this.ChangeStatus(OrderStatus.Deleted, true);
            this.mainWindow.parent.orderTaskFrm.RemoveOrderFromGrid(this);
            var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
            instantOrderByInstrumentIFrame._InstantOrderListFrame1.RemoveOrderFromGrid(this);
            instantOrderByInstrumentIFrame._InstantOrderListFrame2.RemoveOrderFromGrid(this);
            instantOrderByInstrumentIFrame._InstantOrderListFrame3.RemoveOrderFromGrid(this);
            instantOrderByInstrumentIFrame._InstantOrderListFrame4.RemoveOrderFromGrid(this);

            //remove this order from this.mainWindow.oPendingOrders
            if (this.mainWindow.oPendingOrders.Exists(this.id) == true)
                this.mainWindow.oPendingOrders.Remove(this.id);

            if (this.mainWindow.oDeformityOrders.Exists(this.id) == true)
                this.mainWindow.oDeformityOrders.Remove(this.id);
        }
        else if (this.status == OrderStatus.WaitServerResponse || this.lastStatus == OrderStatus.WaitServerResponse) {
            this.ChangeStatus(OrderStatus.Executed, true);

            //Modified by Michael on 209-01-16
            //this.mainWindow.oExecutedOrders.Add(this.id, this);
            this.mainWindow.oExecutedOrders.Item(this.id) = this;

            //remove this order from this.mainWindow.oPendingOrders
            if (this.mainWindow.oPendingOrders.Exists(this.id) == true)
                this.mainWindow.oPendingOrders.Remove(this.id);

            if (this.mainWindow.oDeformityOrders.Exists(this.id) == true)
                this.mainWindow.oDeformityOrders.Remove(this.id);

            this.mainWindow.parent.orderTaskFrm.RemoveOrderFromGrid(this);
            var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
            instantOrderByInstrumentIFrame._InstantOrderListFrame1.RemoveOrderFromGrid(this);
            instantOrderByInstrumentIFrame._InstantOrderListFrame2.RemoveOrderFromGrid(this);
            instantOrderByInstrumentIFrame._InstantOrderListFrame3.RemoveOrderFromGrid(this);
            instantOrderByInstrumentIFrame._InstantOrderListFrame4.RemoveOrderFromGrid(this);

            var instrument = this.GetInstrument();
            if (instrument != null) {
                instrument.AddOrderProcessBuySellLot(this);
                //Refresh UI...
                this.mainWindow.UpdateTotalBuySellLot(instrument);
                this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
            }

            //add this order to ExecuteGrid
            //Modify by Erric
            if (this.lot > 0 || this.tran.orderType == 8) {
                try {
                    var wndExecuteOrders = parent.toolBarFrm.oWndExecuteOrders;
                    if (wndExecuteOrders && wndExecuteOrders.closed == false) {
                        wndExecuteOrders.AddOrderToExecuteOrderGrid(this.mainWindow, this);
                    }
                }
                catch (ex) {
                }
                try {
                    var wndOpenInterest = parent.toolBarFrm.oWndOpenInterest;
                    if (wndOpenInterest && wndOpenInterest.closed == false) {
                        wndOpenInterest.AddOrderToOpenInterestGrid(this.mainWindow, this);
                    }
                }
                catch (ex) {
                }
            }

            //            //Added by Michael on 2003-12-05
            //            //if (this.isOpen == false && this.tran.type != TransType.OCO)	//IsAutoClose will new change to close
            //            if (this.tran.type != TransType.OCO) {
            //                this.mainWindow.oIOProxy.CheckOpenOrderWetherLiquidated(this.id);
            //            }

            /*
            if (this.isOpen==0) 
            {
            var relationsByCloseOrderIDs += "<CloseOrderID ID='"+this.id+"'></CloseOrderID>";
            this.mainWindow.oDealingConsole.GetRelationsByCloseOrderID(relationsByCloseOrderIDs);
            }
            */

            this.ExecuteOrderOutput();
        }
    };

    this.ExecuteOrderOutput = function () {
        if (this.lot > 0 && !this.printed
                       && (this.mainWindow.oPriceOrderSetting == 1 || this.mainWindow.oPriceOrderSetting == 2)) {
            this.printed = true;

            if (!this.mainWindow.oPrintingOrders.Exists(this.code)) {
                this.mainWindow.oPrintingOrders.Add(this.code, this);
                if (this.mainWindow.oPriceOrderSetting == 1) {
                    this.mainWindow.PrintOrders(this);
                }
                else if (this.mainWindow.oPriceOrderSetting == 2) {
                    this.DirectPrint();
                }
            }
        }
    };

    this.DirectPrint = function () {
        with (vsflexOrderPrint) {
            Rows = 8;
            FixedRows = 0;
            FixedCols = 0;
            Cols = 2;

            ColKey(0) = "PropertyKey";
            ColWidth(0) = 2100;
            ColAlignment(0) = flexAlignRightCenter;

            ColKey(1) = "PropertyValue";
            ColWidth(1) = 2800;
            ColAlignment(1) = flexAlignLeftCenter;

            AllowUserFreezing = flexFreezeBoth;
            AllowUserResizing = flexResizeBoth;
            ExplorerBar = flexExNone;
            Editable = flexEDKbdMouse;
        }

        var quotationFrm = this.mainWindow;
        var orderPrintGridColKey = quotationFrm.orderPrintGridColKey;
        var orderPrintGridLanguage = quotationFrm.orderPrintGridLanguage;

        var parameter = quotationFrm.oDealingConsole.InitGridForSingleRecord(window.vsflexOrderPrint, quotationFrm.optionGrid.OrderPrintGrid, orderPrintGridLanguage);

        var order = this;
        var instrument = this.GetInstrument();
        var account = this.GetAccount();

        var propertyKeyColumn = vsflexOrderPrint.ColIndex("PropertyKey");
        var propertyValueColumn = vsflexOrderPrint.ColIndex("PropertyValue");
        with (vsflexOrderPrint) {
            var rowHeightValue = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.OrderPrintGrid);
            for (var index = propertyKeyColumn, count = Rows; index < count; index++) {
                RowHeight(index) = rowHeightValue;

                var rowDataValue = RowData(index);
                switch (rowDataValue) {
                    case orderPrintGridColKey.TranCode:
                        TextMatrix(index, propertyValueColumn) = order.tran.code;
                        break;
                    case orderPrintGridColKey.Instrument:
                        TextMatrix(index, propertyValueColumn) = instrument.code;
                        break;
                    case orderPrintGridColKey.Account:
                        TextMatrix(index, propertyValueColumn) = (account ? account.code : order.tran.accountID);
                        break;
                    case orderPrintGridColKey.IsOpen:
                        TextMatrix(index, propertyValueColumn) = (order.isOpen ? "New" : "Close");
                        break;
                    case orderPrintGridColKey.IsBuy:
                        TextMatrix(index, propertyValueColumn) = (order.isBuy ? "Buy" : "Sell");
                        break;
                    case orderPrintGridColKey.Lot:
                        TextMatrix(index, propertyValueColumn) = order.GetFormatLot2(order.lot);
                        break;
                    case orderPrintGridColKey.ExecutePrice:
                        TextMatrix(index, propertyValueColumn) = (order.executePrice).ToString();
                        break;
                    case orderPrintGridColKey.ExecuteTime:
                        TextMatrix(index, propertyValueColumn) = Date2String(order.tran.executeTime);
                        break;
                }
                ForeColor = order.isBuy ? color_blue : color_red;
            }
        }
        try {
            //window.vsflexOrderPrint.PrintGrid();
            window.vsflexOrderPrint.PrintGrid("", false, 0, 0, 0);
        }
        catch (e) {
            alert("Printer's I/O was error! please check your printer.");
        }
    };

    /*
    this.DirectPrintBak = function()
    {
    var order = this;
    var instrument = this.GetInstrument();
    var account = this.GetAccount();
		
		with (window.vsflexOrderPrint)
    {
    //Fill ColKey
    Rows = 0;
    Cols = 2;
    FixedRows = 0;
    FixedCols = 0;

			ColWidth(0) = 1200;
    ColAlignment(0) = flexAlignRightCenter;
			
    ColWidth(1) = 1800;
    ColAlignment(1) = flexAlignLeftCenter;
			    
    GridLines = flexGridNone;
    GridLinesFixed = flexGridNone;
    AllowUserFreezing = flexFreezeNone;
    AllowUserResizing = flexResizeBoth;
    ExplorerBar = flexExSortAndMove;
			
    var s = "TransCode: \t" + order.tran.code;
    AddItem(s);
			
    s = "Instrument: \t" + instrument.code;
    AddItem(s);
			
    s = "A/C: \t" + (account ? account.code : order.tran.accountID);
    AddItem(s);
			
    s = "O/C: \t" + (order.isOpen ? "New" : "Close");
    AddItem(s);
			
    s = "B/S: \t" + (order.isBuy ? "Buy" : "Sell");
    AddItem(s);
			
    s = "Lot: \t" + this.GetFormatLot(order.lot);
    AddItem(s);
			
    s = "Price: \t" + (order.executePrice).ToString();
    AddItem(s);
			
    s = "Time: \t" + Date2String(order.tran.executeTime);
    AddItem(s);
			
    ForeColor = order.isBuy ? color_blue : color_red;
			
    try
    {
    //window.vsflexOrderPrint.PrintGrid();
    window.vsflexOrderPrint.PrintGrid("",true,0,0,0);
    }
    catch(e)
    {
    alert("Printer's I/O was error! please check your printer.");
    }
    }
    };
    */

    this.UpdateByDataRow = function (row) {
        this.code = row("code");
        this.tradeOption = row("tradeOption");
        this.isOpen = row("isOpen");
        this.isBuy = row("isBuy");
        //...has error when blotterCode from none Null change to Null
        if (row("blotterCode") != null) {
            this.blotterCode = row("blotterCode");
        }
        var setPrice = row("setPrice");
        var executePrice = row("executePrice");
        this.lot = row("lot");
        this.hitCount = row("hitCount");
        var bestPrice = row("bestPrice");
        this.bestTime = row("bestTime");
        this.submitorID = row("SubmitorID");
        if (row("DQMaxMove") != null) {
            this.dQMaxMove = row("DQMaxMove");
        }

        var instrument = this.GetInstrument();
        if (!instrument) return;

        //this.setPrice = new Price();
        //this.setPrice.Normalize(setPrice, instrument.numeratorUnit, instrument.denominator);
        this.setPrice = ObjectPool.GetCorrectPriceHelper(setPrice, instrument.numeratorUnit, instrument.denominator);

        //this.executePrice = new Price();
        //this.executePrice.Normalize(executePrice, instrument.numeratorUnit, instrument.denominator);
        this.executePrice = ObjectPool.GetCorrectPriceHelper(executePrice, instrument.numeratorUnit, instrument.denominator);

        //this.bestPrice = new Price();
        //this.bestPrice.Normalize(bestPrice, instrument.numeratorUnit, instrument.denominator);
        this.bestPrice = ObjectPool.GetCorrectPriceHelper(bestPrice, instrument.numeratorUnit, instrument.denominator);

        var account = this.GetAccount();
        if (account) {
            var tradePolicyDetail = instrument.GetTradePolicyDetail(account.tradePolicyID);
            if (tradePolicyDetail)
                this.tran.contractSize = tradePolicyDetail.contractSize;
        }
    };

    this.GetFormatLot = function (lot) {
        var strLot = lot.toString();
        var isSplitLot = false;
        if (!this.account)
            this.GetAccount();
        if (this.account)
            isSplitLot = this.account.isSplitLot;
        return this.mainWindow.oDealingConsole.GetFormatLot(strLot, isSplitLot);
    };
    this.GetFormatLot2 = function (lot) {
        var strLot = lot.toString();
        var isSplitLot = false;
        if (!this.account)
            this.GetAccount();
        if (this.account)
            isSplitLot = this.account.isSplitLot;
        return this.mainWindow.oDealingConsole.GetFormatLot2(strLot, isSplitLot);
    };

    //Added by Michael on 2008-01-02
    this.GetDQMaxMovePrice = function () {
        var instrument = this.GetInstrument();
        if (instrument.isNormal == this.isBuy) {
            return this.setPrice.Add(this.dQMaxMove);
        }
        else {
            return this.setPrice.SubStract2(this.dQMaxMove);
        }
    };

    //Added by Michael on 2008-01-03
    this.GetDefaultDQMaxMovePrice = function () {
        var instrument = this.GetInstrument();
        if (instrument.isNormal == this.isBuy) {
            var marketPrice = instrument.overrideQuotation.ask;
            var maxMovePrice = this.setPrice.Add(this.dQMaxMove);
            if (marketPrice.More(this.setPrice) && marketPrice.Less(maxMovePrice)) {
                return marketPrice;
            }
            else if (!marketPrice.Less(maxMovePrice)) {
                return maxMovePrice;
            }
            else {
                return this.setPrice;
            }
        }
        else {
            var marketPrice = instrument.overrideQuotation.bid;
            var maxMovePrice = this.setPrice.SubStract2(this.dQMaxMove);
            if (marketPrice.More(maxMovePrice) && marketPrice.Less(this.setPrice)) {
                return marketPrice;
            }
            else if (!marketPrice.Less(this.setPrice)) {
                return this.setPrice;
            }
            else {
                return maxMovePrice;
            }
        }
    };

    //Added by Michael on 2008-01-02
    this.IsNeedDQMaxMove = function () {
        return this.tran.orderType == OrderType.SpotTrade && this.dQMaxMove > 0;
    };

    //Added by Michael on 2005-03-14
    //Auto execute process by server,manual execute process by dealer
    this.Hit = function (xmlNode, needRedraw) {
        //<Order ID="" HitCount="" BestPrice="" BestTime="" />
        var instrument = this.GetInstrument();
        if (!instrument) return;
        this.hitCount = parseInt(xmlNode.getAttribute("HitCount"));
        if (xmlNode.getAttribute("BestPrice") != null) {
            this.bestPrice = ObjectPool.GetCorrectPriceHelper(xmlNode.getAttribute("BestPrice"), instrument.numeratorUnit, instrument.denominator);
        }
        if (xmlNode.getAttribute("BestTime") != null) {
            this.bestTime = new Date(xmlNode.getAttribute("BestTime").replace(/-/g, "/"));
        }

        if (this.tran.orderType == OrderType.Market) {
            this.setPrice = this.bestPrice;
        }
        else if (this.IsNeedDQMaxMove()) {
            //if (this.hitCount > 0)
            {
                var price = this.GetDQMaxMovePrice();
                if (instrument.isNormal == this.isBuy) {
                    this.tran.executePrice = (this.bestPrice.More(price)) ? price : this.bestPrice;
                }
                else {
                    this.tran.executePrice = (this.bestPrice.Less(price)) ? price : this.bestPrice;
                }
            }
        }

        //Notify user with sound
        this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitHit);

        this.Hit2(needRedraw);
    };

    //Added by Michael on 2005-03-16
    this.Hit2 = function (needRedraw) {
        if (this.tran.orderType == OrderType.Limit || this.tran.orderType == OrderType.Market) {
            this.mainWindow.parent.orderTaskFrm.UpdateOrderPrice(this, needRedraw);

            var instrument = this.GetInstrument();
            if (!instrument) return;

            if (this.tran.orderType == OrderType.Market && this.bestPrice != null) this.ChangeStatus(OrderStatus.WaitOutLotLMT, needRedraw);

            //if(this.lot>instrument.autoLmtMktMaxLot && this.hitCount > 0)
            if (this.bestPrice == null || this.setPrice == null) return;
            //if ((this.hitCount >= instrument.hitTimes)
            //    || (this.tran.orderType == OrderType.Limit && !instrument.mit && instrument.penetrationPoint > 0 && Math.abs(this.bestPrice.SubStract(this.setPrice)) >= instrument.penetrationPoint))

            //if ((this.tran.orderType == OrderType.Limit && !instrument.mit && instrument.penetrationPoint > 0 && Math.abs(this.bestPrice.SubStract(this.setPrice)) >= instrument.penetrationPoint))
            if (this.hitCount > 0
			    || (this.tran.orderType == OrderType.Limit && !instrument.mit && instrument.penetrationPoint >= 0 && Math.abs(this.bestPrice.SubStract(this.setPrice)) >= instrument.penetrationPoint)) {
                //var tradePolicyDetail = instrument.GetTradePolicyDetail( account.tradePolicyID );

                //if(tradePolicyDetail)
                {
                    //	var isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2,parseInt(this.tran.orderType))))==Math.pow(2,parseInt(this.tran.orderType));

                    //	if(isUsingOrigin == false)
                    {
                        //Waiting for Dealer AdjustPrice/ExecuteOrder
                        this.ChangeStatus(OrderStatus.WaitOutLotLMT, needRedraw);
                        this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
                    }
                    //	else	//Waiting For New Origin Quotation
                    {
                        //		this.ChangeStatus(OrderStatus.WaitOutLotLMTOrigin);
                    }
                }
            }
        }
        else if (this.IsNeedDQMaxMove()) {
            var instrument = this.GetInstrument();
            if (!instrument) return;
            this.mainWindow.parent.orderTaskFrm.UpdateOrderPrice(this, needRedraw);
            //if (this.hitCount > 0)
            {
                var isExceed = this.IsPriceExceedMaxMin(this.tran.executePrice);
                //Remove Auto Execute --Added by Michael on 2009-01-15
                //			    if(this.lot <= instrument.autoDQMaxLot)	//auto execute
                //		        {
                //			        if(this.IsExceedAcceptDQVariation(this.tran.executePrice) == true || isExceed == true)
                //			        {
                //				        //Reject Transaction
                //				        this.tran.Reject(this);
                //			        }
                //			        else
                //			        {
                //				        //Commit Transaction
                //				        this.tran.Commit(this,this.tran.executePrice);
                //			        }
                //			    }
                //			    else	//menu execute
                //		        {
                if (isExceed == true) {
                    //Waiting for Dealer Accept/Reject
                    this.ChangeStatus(OrderStatus.WaitOutPriceDQ, needRedraw);
                }
                else {
                    //Waiting for Dealer Confirm/Reject
                    this.ChangeStatus(OrderStatus.WaitOutLotDQ, needRedraw);
                }
                this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
                //		        }
            }
            //else if (this.hitCount < 0)
            //{
            //Reject Transaction
            //	this.tran.Reject(this);
            //}
        }
    };

    //Added by Michael on 2005-03-15
    this.ResetHit = function (needPrompt) {
        this.hitCount = 0;
//        this.bestPrice = null;
//        this.bestTime = new Date("1900/01/01");

        var eventMessage = this.GetEventMessage("ResetHit", "");
        this.mainWindow.oIOProxy.ResetHit(new Array(this.id), new Array(eventMessage), needPrompt);
        this.mainWindow.parent.orderTaskFrm.UpdateOrderPrice(this,true);
    };

    //Added by Michael on 2008-01-02
    this.ToPrice = function (str) {
        var instrument = this.GetInstrument();
        if (!instrument) return null;

        return ObjectPool.GetPriceHelper(str, instrument.numeratorUnit, instrument.denominator);
    };

    //Added by Michael on 2008-01-02
    this.GetModifiedDQMaxMovePrice = function (str) {
        var defaultPrice = this.GetDefaultDQMaxMovePrice();
        var price = this.ToPrice(str);
        if (price == null) return defaultPrice;

        var instrument = this.GetInstrument();
        if (instrument.isNormal == this.isBuy) {
            var maxMovePrice = this.setPrice.Add(this.dQMaxMove);
            if (price.More(maxMovePrice)
		        || price.Less(this.setPrice)) {
                return defaultPrice;
            }
        }
        else {
            var maxMovePrice = this.setPrice.SubStract2(this.dQMaxMove);
            if (price.More(this.setPrice)
    	        || price.Less(maxMovePrice)) {
                return defaultPrice;
            }
        }
        return price;
    };

    this.GetDescription = function () {
        return this.GetAccount().code + (this.isBuy ? " buy " : " sell ") + this.GetFormatLot2(this.lot) + " " + this.GetInstrument().code + " at " + this.setPrice.ToString();
    };

    this.GetMooMocDescription = function () {
        return this.GetAccount().code + (this.isBuy ? " buy " : " sell ") + this.GetFormatLot2(this.lot) + " " + this.GetInstrument().code + " at ";
    };

    this.GetEventMessage = function (eventType, postscript) {
        var instrument = this.GetInstrument();
        var bidString = "";
        var askString = "";
        if (instrument.overrideQuotation != null) {
            if (instrument.overrideQuotation.bid != null) {
                bidString = instrument.overrideQuotation.bid.ToString();
            }
            if (instrument.overrideQuotation.ask != null) {
                askString = instrument.overrideQuotation.ask.ToString();
            }
        }
        //        var executePriceString = "";
        //        if (this.executePrice != null) {
        //            executePriceString = this.executePrice.ToString();
        //        }
        var setPriceString = "";
        if (this.setPrice != null) {
            setPriceString = this.setPrice.ToString();
        }
        var priceString = setPriceString; // (eventType == "Execute") ? executePriceString : setPriceString;
        var eventMessage = "TransactionCode=" + this.tran.code
            + ",InstrumentCode=" + instrument.code
            + ",AccountCode=" + this.GetAccount().code
            + ",OrderTypeId=" + this.tran.orderType
            + ",Lot=" + this.lot
            + ",SetPrice=" + priceString
            + ",B/S=" + (this.isBuy ? "B" : "S")
            + ",Bid/Ask=" + bidString + "/" + askString;
        //if (eventType == "Cancel") {
        if (postscript != null && postscript != "") {
            eventMessage = postscript + ": " + eventMessage;
        }
        //}
        return this.ReplaceSpecialChar(eventMessage);
    };

    this.ReplaceSpecialChar = function (str) {
        if (str == null) return str;
        str = str.replace(/&/g, "&amp;");
        return str;
    };

    this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
        this.id = xmlNodeRow.getAttribute("ID");
        this.code = xmlNodeRow.getAttribute("Code");
        this.tradeOption = XmlConvert.ToInt32(xmlNodeRow.getAttribute("TradeOption"));
        this.isOpen = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsOpen"));
        this.isBuy = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsBuy"));
        if (xmlNodeRow.getAttribute("blotterCode") != null) {
            this.blotterCode = xmlNodeRow.getAttribute("blotterCode");
        }
        var setPrice = xmlNodeRow.getAttribute("SetPrice");
        var executePrice = xmlNodeRow.getAttribute("ExecutePrice");
        this.lot = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("Lot"));
        this.hitCount = XmlConvert.ToInt32(xmlNodeRow.getAttribute("HitCount"));
        var bestPrice = xmlNodeRow.getAttribute("BestPrice");
        this.bestTime = (xmlNodeRow.getAttribute("BestTime") != null) ? XmlConvert.ToDateTime(xmlNodeRow.getAttribute("BestTime")) : null;
        this.submitorID = xmlNodeRow.getAttribute("SubmitorID");
        if (xmlNodeRow.getAttribute("DQMaxMove") != null) {
            this.dQMaxMove = xmlNodeRow.getAttribute("DQMaxMove");
        }
        var instrument = this.GetInstrument();
        if (!instrument) return;
        this.setPrice = ObjectPool.GetCorrectPriceHelper(setPrice, instrument.numeratorUnit, instrument.denominator);
        this.executePrice = ObjectPool.GetCorrectPriceHelper(executePrice, instrument.numeratorUnit, instrument.denominator);
        this.bestPrice = ObjectPool.GetCorrectPriceHelper(bestPrice, instrument.numeratorUnit, instrument.denominator);
        var account = this.GetAccount();
        if (account) {
            var tradePolicyDetail = instrument.GetTradePolicyDetail(account.tradePolicyID);
            if (tradePolicyDetail)
                this.tran.contractSize = tradePolicyDetail.contractSize;
        }
    };
}