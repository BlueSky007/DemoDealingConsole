//MKT---------------------------------------------------------------------------------------------------------------------------------------------------//
function MKTOrder(OrderID) {
    //inherited properties and methods
    var base = new Order(OrderID);
    for (prop in base) {
        this[prop] = base[prop];
    }

    this.SetWaitAcceptRejectPlace = function () {
        this.SetWaitAcceptRejectPlace(true);
    };

    //Added by Michael on 2009-02-09
    this.SetWaitAcceptRejectPlace = function (needPlaySound) {
        //Notify user with sound
        this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitNewOrder);   //...

        //Add to Transaction List
        this.mainWindow.parent.orderTaskFrm.AddLmtMktOrderToGrid(this);

        //Waiting for Dealer Accept/Reject
        this.ChangeStatus(OrderStatus.WaitAcceptRejectPlace, true);
        this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
    };

    this.CheckWhenOrderArrive = function () {
        this.CheckWhenOrderArrive(true);
    };

    this.CheckWhenOrderArrive = function (needPlaySound) {
        //Notify user with sound
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitNewOrder);
        }

        //Add to Transaction List
        this.mainWindow.parent.orderTaskFrm.AddLmtMktOrderToGrid(this);
        this.ChangeStatus(OrderStatus.WaitNextPrice, true);
        //        if (needPlaySound) {
        //            this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
        //        }
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
//        //		if(!account)	return

//        //		var customer = this.GetCustomer();
//        //		if(!customer)	return;
//        //		
//        //		//if(!isOrigin && quotePolicyID != customer.privateQuotePolicyID && quotePolicyID != customer.publicQuotePolicyID)	//bad quotePolicyID
//        //		//	return;
//        //		
//        //		/*Modified by Michael on 2004-08-13
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
//        //		var tradePolicyDetail = instrument.GetTradePolicyDetail( account.tradePolicyID );
//        //		if(!tradePolicyDetail)	return;
//        //		
//        //		var isUsingOrigin = true;
//        //		if(tradePolicyDetail && 
//        //			(this.tran.orderType == OrderType.Limit || this.tran.orderType == OrderType.Market))
//        //			isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2,parseInt(this.tran.orderType))))==Math.pow(2,parseInt(this.tran.orderType));
//        //			//isUsingOrigin = (instrument.orderTypeMask & tradePolicyDetail.quotationMask & parseInt(Math.pow(2,parseInt(this.orderType))))==Math.pow(2,parseInt(this.orderType));
//        //		
//        //		if(isOrigin != isUsingOrigin)	//bad quote type
//        //			return;
//        //		
//        //		var isSatisfied = false;
//        //		if(instrument.isNormal ^ this.isBuy)
//        //		{
//        //			this.setPrice = quoteTemp.bid.Clone();
//        //			this.preBestPrice = quoteTemp.bid.Clone();
//        //		}
//        //		else
//        //		{
//        //			this.setPrice = quoteTemp.ask.Clone();
//        //			this.preBestPrice = quoteTemp.ask.Clone();
//        //		}
//        //		this.hitCount ++;
//        //		this.preBestTime = this.mainWindow.oSystemTime;//new Date();
//        //		isSatisfied = true;
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
//        //			oDealingConsole.PlaySound(SoundOption.LimitHit);
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
//        //			if(this.hitCount >= instrument.hitTimes)/* || 
//        //				Math.abs(this.bestPrice.SubStract(this.setPrice)) >= instrument.penetrationPoint)*/
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
//        //						this.setPrice = this.bestPrice.Clone();
//        //						//Commit Transaction
//        //						this.tran.Commit(this);
//        //					}
//        //				}
//        //				else*/
//        //				{
//        //					this.setPrice = this.bestPrice.Clone();
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
}
