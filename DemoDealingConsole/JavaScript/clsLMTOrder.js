
//LMT---------------------------------------------------------------------------------------------------------------------------------------------------//
function LMTOrder(OrderID) {
    //inherited properties and methods
    var base = new Order(OrderID);
    for (prop in base) {
        this[prop] = base[prop];
    }

    this.SetWaitAcceptRejectPlace = function () {
        this.SetWaitAcceptRejectPlace(true);
    };

    //Added by Michael on 2006-09-30
    this.SetWaitAcceptRejectPlace = function (needPlaySound) {
        //Notify user with sound
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitNewOrder);
        }

        //Add to Transaction List
        this.mainWindow.parent.orderTaskFrm.AddLmtMktOrderToGrid(this);

        //Waiting for Dealer Accept/Reject
        this.ChangeStatus(OrderStatus.WaitAcceptRejectPlace,true);
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
        }
    };

    this.CheckWhenOrderArrive = function () {
        this.CheckWhenOrderArrive(true);
    };

    this.CheckWhenOrderArrive = function (needPlaySound) {
        //Notify user with sound
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitNewOrder);
        }

        if (this.IsExceedAcceptLmtVariation() == false) {
            //Reject Transaction
            this.tran.Reject(this);
        }
        else {
            //Add to Transaction List
            this.mainWindow.parent.orderTaskFrm.AddLmtMktOrderToGrid(this);
            this.ChangeStatus(OrderStatus.WaitNextPrice, true);
            //            if (needPlaySound) {
            //                this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
            //            }
            //this.ResetHit(false);
        }
    };

//    this.CheckWhenQuoteArrive = function (quote, isOrigin, quotePolicyID) {
//        //Added by Michael on 2005-03-15
//        //Auto execute by server,manual notify by server (hit)
//        return;

//        //		if(!quote)	return;
//        //		var quoteTemp = quote;	
//        //		
//        //		var instrument = this.GetInstrument();
//        //		if(!instrument)		return;
//        //		
//        //		var account = this.GetAccount();
//        //		if(!account)	return;

//        //		var customer = this.GetCustomer();
//        //		if(!customer)	return;
//        //		
//        //		//Modified by Michael on 2004-08-13
//        //		if(!isOrigin)
//        //		{
//        //			var quotePolicyDetail = instrument.GetQuotePolicyDetail( customer.privateQuotePolicyID );
//        //			if(quotePolicyDetail)
//        //			{
//        //				if(quotePolicyID != customer.privateQuotePolicyID)
//        //					return;
//        //			}
//        //			else
//        //			{	
//        //				if(quotePolicyID != customer.publicQuotePolicyID)
//        //					return;
//        //			}
//        //		
//        //		}
//        //		
//        //		/*
//        //		if(!isOrigin)
//        //		{
//        //			if(customer.privateQuotePolicyID)
//        //			{
//        //				if(quotePolicyID != customer.privateQuotePolicyID)
//        //					return;
//        //			}
//        //			else
//        //			{
//        //				if(quotePolicyID != customer.publicQuotePolicyID)
//        //					return;
//        //			}
//        //		}
//        //		*/
//        //					
//        //		var tradePolicyDetail = instrument.GetTradePolicyDetail( account.tradePolicyID );
//        //		if(!tradePolicyDetail)	return;
//        //		
//        //		var isUsingOrigin = true;
//        //		if(tradePolicyDetail && 
//        //			(this.tran.orderType == OrderType.Limit || this.tran.orderType == OrderType.Market))
//        //			isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2,parseInt(this.tran.orderType))))==Math.pow(2,parseInt(this.tran.orderType));
//        //			//isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2,parseInt(this.orderType))))==Math.pow(2,parseInt(this.orderType));
//        //		if(isOrigin != isUsingOrigin)	//bad quote type
//        //			return;
//        //			
//        //		var isSatisfied = false;
//        //		//(IsNormal  XOR  IsBuy) PreBestPrice   IsBetter   Judge_Condition
//        //		//False                   Ask           True       ( PreBestPrice<= setprice )    
//        //		//False                   Ask           False      ( PreBestPrice>= setprice )
//        //		//True                    Bid           True       ( PreBestPrice >= setprice )
//        //		//True                    Bid           False      ( PreBestPrice <= setprice )
//        //		if(instrument.isNormal ^ this.isBuy)
//        //			this.preBestPrice = quoteTemp.bid.Clone();
//        //		else
//        //			this.preBestPrice = quoteTemp.ask.Clone();
//        //			
//        //		if((instrument.isNormal ^ this.isBuy) ^ (this.tradeOption == TradeOption.Better))
//        //			isSatisfied = this.preBestPrice.LessEqual( this.setPrice );
//        //		else
//        //			isSatisfied = this.preBestPrice.MoreEqual( this.setPrice );
//        //		if(isSatisfied == true)
//        //		{
//        //			this.hitCount ++;
//        //			this.preBestTime = this.mainWindow.oSystemTime;//new Date();
//        //		}
//        //		else
//        //			return;	//Waiting For New Overrided Quotation
//        //			
//        //		var isNewBest = true;
//        //		if(instrument.isBetterPrice == true)
//        //		{
//        //			if(instrument.isNormal ^ this.isBuy)
//        //				isNewBest = this.preBestPrice.Less( this.bestPrice );
//        //			else
//        //				isNewBest = this.preBestPrice.More( this.bestPrice );
//        //		}
//        //		if(isNewBest == true)
//        //		{
//        //			this.bestPrice = this.preBestPrice.Clone();
//        //			this.bestTime = this.preBestTime;
//        //		}
//        //		
//        //		//if has new best price or bestPrice == preBestPrice
//        //		if(isNewBest || (isSatisfied && this.bestPrice))
//        //		{
//        //			//Notify user with sound
//        //			this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitHit);
//        //			//update order with hitCount, BestPrice, BestTime
//        //			var order = new Array();
//        //			order.push(this.id);
//        //			order.push(this.hitCount);
//        //			order.push((this.bestPrice==null)?"":this.bestPrice.ToString());
//        //			order.push( Date2String(this.bestTime) );
//        //			
//        //			var orders = new Array();
//        //			orders.push(order);
//        //			this.mainWindow.oIOProxy.UpdateOrder(orders);
//        //			
//        //			this.mainWindow.parent.orderTaskFrm.UpdateOrderPrice(this);
//        //		}

//        //		if(this.lot <= instrument.autoLmtMktMaxLot )
//        //		{
//        //			if(this.hitCount >= instrument.hitTimes || 
//        //				Math.abs(this.bestPrice.SubStract(this.setPrice)) >= instrument.penetrationPoint)
//        //			{
//        //				/*if(this.IsPriceExceedMaxMin( this.bestPrice ) == true)
//        //				{
//        //					//if(isUsingOrigin == false)
//        //					if(this.hitCount <= 1)	//first hit
//        //					{
//        //						//Waiting for Dealer Accept/Reject
//        //						this.ChangeStatus(OrderStatus.WaitOutPriceLMT);
//        //					}
//        //					else
//        //					{
//        //						//Commit Transaction
//        //						this.tran.Commit(this);
//        //					}
//        //				}
//        //				else*/
//        //				{
//        //					//Commit Transaction
//        //					this.tran.Commit(this);
//        //				}
//        //			}
//        //		}
//        //		else
//        //		{
//        //			if(isUsingOrigin == false)
//        //			{
//        //				//Waiting for Dealer AdjustPrice/ExecuteOrder
//        //				this.ChangeStatus(OrderStatus.WaitOutLotLMT);
//        //			}
//        //			else	//Waiting For New Origin Quotation
//        //			{
//        //				this.ChangeStatus(OrderStatus.WaitOutLotLMTOrigin);
//        //			}
//        //		}
//    };

    //Added by Michael on 2006-09-29
    this.ValidateAutoAcceptCancelOthers = function () {
        var instrument = this.GetInstrument();
        if (!instrument.autoCancelMaxLot
			&& (this.tran.orderType == OrderType.Limit
				|| this.tran.orderType == OrderType.OneCancelOther))//include LMT/STP/OCO
        //|| this.type==TransType.OCO))	//?
        {
            return false;
        }
        return true;
    };

    this.ComfirmCancel = function (cancelType) {
        //Remove Auto Execute --Added by Michael on 2009-01-15
        //		if (this.ValidateAutoAcceptCancelOthers())
        //		{
        //			if( this.IsExceedCancelLmtVariation() == true &&
        //				!(this.status == OrderStatus.WaitOutPriceLMT ||
        //				this.status == OrderStatus.WaitOutLotLMTOrigin || 
        //				this.status == OrderStatus.WaitOutLotLMT) )
        //			{
        //				this.tran.ComfirmCancel(this,cancelType);

        //				//Notify user with sound
        //				this.mainWindow.oDealingConsole.PlaySound(SoundOption.DQCancelOrder);
        //			}
        //			else	//Added by Michael on 2005-04-06
        //			{
        //				this.tran.RejectCancelLmtOrder(this);
        //			}
        //		}
        //		else
        //		{
        //Waiting for Dealer Accept/Reject			
        this.ChangeStatus(OrderStatus.WaitAcceptRejectCancel, true);
        this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
        //this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitCancelOrderRequest);
        //		}
    };

    //Modified by Michael on 2006-09-30
    this.ComfirmAcceptCancel = function (cancelType) {
        if (this.IsExceedCancelLmtVariation() == true &&
				!(this.status == OrderStatus.WaitOutPriceLMT ||
				this.status == OrderStatus.WaitOutLotLMTOrigin ||
				this.status == OrderStatus.WaitOutLotLMT)) {
            this.tran.ComfirmCancel(this, cancelType);

            //Notify user with sound
            //this.mainWindow.oDealingConsole.PlaySound(SoundOption.DQCancelOrder);
            this.mainWindow.oDealingConsole.PlaySound(this.tran.orderType == OrderType.SpotTrade ? SoundOption.DQCancelOrder : SoundOption.LimitCancelOrder);
        }
        else {
            alert("Not accept cancel order currently!");
        }
    };
}
