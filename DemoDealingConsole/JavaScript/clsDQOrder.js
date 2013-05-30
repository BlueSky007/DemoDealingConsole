//DQ---------------------------------------------------------------------------------------------------------------------------------------------------//
function DQOrder(OrderID) {
    //inherited properties and methods
    var base = new Order(OrderID);
    for (prop in base) {
        this[prop] = base[prop];
    };

    this.SetWaitAcceptRejectPlace = function () {
        this.SetWaitAcceptRejectPlace(true);
    };

    //Added by Michael on 2009-02-09
    this.SetWaitAcceptRejectPlace = function (needPlaySound) {
        //Notify user with sound
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.DQNewOrder);   //...
        }

        //Add to Transaction List
        this.mainWindow.parent.orderTaskFrm.AddDQOrderToGrid(this);
        //Waiting for Dealer Accept/Reject
        this.ChangeStatus(OrderStatus.WaitAcceptRejectPlace,false);

        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.DQDealerIntervene);
        }
        var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
        instantOrderByInstrumentIFrame._InstantOrderListFrame1.AddDQOrderToGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame2.AddDQOrderToGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame3.AddDQOrderToGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame4.AddDQOrderToGrid(this);
    };

    this.CheckWhenOrderArrive = function () {
        this.CheckWhenOrderArrive(true);
    };

    this.CheckWhenOrderArrive = function (needPlaySound) {
        if (this.IsNeedDQMaxMove()) {
            this.CheckWhenOrderArriveForNeedMaxMove(this.GetDQMaxMovePrice(), needPlaySound);
        }
        else {
            this.CheckWhenOrderArriveForNormal(this.setPrice, needPlaySound);
        }
    };

    this.CheckWhenOrderArriveForNormal = function (price, needPlaySound) {
        //Notify user with sound
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.DQNewOrder);
        }

        var instrument = this.GetInstrument();
        if (!instrument) {
            this.tran.Reject(this);
            return;
        }

        var isExceed = this.IsPriceExceedMaxMin(price);
        //Remove Auto Execute --Added by Michael on 2009-01-15
        //		if(this.lot <= instrument.autoDQMaxLot)	//auto execute
        //		{
        //			if(this.IsExceedAcceptDQVariation(price) == true || isExceed == true)
        //			{
        //				//Reject Transaction
        //				this.tran.Reject(this);
        //			}
        //			else
        //			{
        //				//Commit Transaction
        //				this.tran.Commit(this);
        //			}
        //		}
        //		else	//menu execute
        //		{
        //Add to Transaction List
        this.mainWindow.parent.orderTaskFrm.AddDQOrderToGrid(this);
        if (isExceed == true) {
            //Waiting for Dealer Accept/Reject
            this.ChangeStatus(OrderStatus.WaitOutPriceDQ, true);
        }
        else {
            //Waiting for Dealer Confirm/Reject
            this.ChangeStatus(OrderStatus.WaitOutLotDQ, true);
        }
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.DQDealerIntervene);
        }
        var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
        instantOrderByInstrumentIFrame._InstantOrderListFrame1.AddDQOrderToGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame2.AddDQOrderToGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame3.AddDQOrderToGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame4.AddDQOrderToGrid(this);
        //		}
    };

    //Added by Michael on 2008-01-02
    this.CheckWhenOrderArriveForNeedMaxMove = function (price, needPlaySound) {
        //Notify user with sound
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.DQNewOrder);
        }

        var instrument = this.GetInstrument();
        if (!instrument) {
            this.tran.Reject(this);
            return;
        }

        var isExceed = this.IsPriceExceedMaxMin(price);
        //Remove Auto Execute --Added by Michael on 2009-01-15
        //		if(this.lot <= instrument.autoDQMaxLot)	//auto execute
        //		{
        //		    this.mainWindow.parent.orderTaskFrm.AddDQOrderToGrid(this);
        //		    this.ChangeStatus(OrderStatus.WaitAutoExecuteDQ);
        //		    
        ////			if(this.IsExceedAcceptDQVariation(price) == true || isExceed == true)
        ////			{
        ////				//Reject Transaction
        ////				this.tran.Reject(this);
        ////			}
        ////			else
        ////			{
        ////				//Commit Transaction
        ////				this.tran.Commit(this);
        ////			}
        //		}
        //		else	//menu execute
        //		{
        //Add to Transaction List
        this.mainWindow.parent.orderTaskFrm.AddDQOrderToGrid(this);

        if (isExceed == true) {
            //Waiting for Dealer Accept/Reject
            this.ChangeStatus(OrderStatus.WaitOutPriceDQ, true);
        }
        else {
            //Waiting for Dealer Confirm/Reject
            this.ChangeStatus(OrderStatus.WaitOutLotDQ, true);
        }
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.DQDealerIntervene);
        }
        var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
        instantOrderByInstrumentIFrame._InstantOrderListFrame1.AddDQOrderToGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame2.AddDQOrderToGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame3.AddDQOrderToGrid(this);
        instantOrderByInstrumentIFrame._InstantOrderListFrame4.AddDQOrderToGrid(this);
        //		}
    };

}