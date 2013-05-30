//MOO---------------------------------------------------------------------------------------------------------------------------------------------------//
function MOOOrder(OrderID) {
    //inherited properties and methods
    var base = new Order(OrderID);
    for (prop in base) {
        this[prop] = base[prop];
    }

    this.IsWithinAcceptTimeSpan = function () {
        return true;

        var endTime = this.mainWindow.tradeDayBeginTime;
        var beginTime = endTime.setSeconds(endTime.getSeconds() - this.mainWindow.MooMocAcceptDuration * 60);

        return (this.tran.submitTime >= beginTime && this.tran.submitTime <= endTime);
    };

    this.IsWithinCancelTimeSpan = function () {
        //Modified by Michael on 2006-04-21--Begin
        var instrument = this.GetInstrument();
        var now = this.mainWindow.oSystemTime;
        var beginTime = instrument.beginTime;
        var endTime = instrument.endTime;
        return (now >= beginTime &&
				now <= endTime.setSeconds(endTime.getSeconds() - this.mainWindow.MooMocCancelDuration * 60));
        /*
        //Modified by Michael on 2003-12-12
        var instrument = this.GetInstrument();
		
        var now = this.mainWindow.oSystemTime;
        return (now >= this.tran.beginTime && this.tran.endTime > now);
        */
        //Modified by Michael on 2006-04-21--End



        /*			
        var beginTime = instrument.currentTradeTime.beginTime;
        var endTime = beginTime.setSeconds( beginTime.getSeconds() - this.mainWindow.MooMocCancelDuration * 60 );
        return (this.tran.submitTime >= this.mainWindow.tradeDayBeginTime && 
        this.tran.submitTime <= endTime);
        */

        /*
        var endTime = this.mainWindow.tradeDayBeginTime;
        var beginTime = endTime.setSeconds( endTime.getSeconds() - this.mainWindow.MooMocCancelDuration * 60 );

        return (this.tran.submitTime >= beginTime && this.tran.submitTime <= endTime);
        */
    };

    this.SetWaitAcceptRejectPlace = function () {
        this.SetWaitAcceptRejectPlace(true);
    };

    //Added by Michael on 2009-02-09
    this.SetWaitAcceptRejectPlace = function (needPlaySound) {
        //Notify user with sound
        if (needPlaySound) {
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitNewOrder);   //...
        }

        //Add to Transaction List
        this.mainWindow.parent.orderTaskFrm.AddMooMocOrderToGrid(this);

        //Waiting for Dealer Accept/Reject
        this.ChangeStatus(OrderStatus.WaitAcceptRejectPlace, true);
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

        if (this.IsWithinAcceptTimeSpan() == true) {
            this.ChangeStatus(OrderStatus.WaitTime, true);

            this.CheckTimeArrive(this.mainWindow.oSystemTime);
            //Add to Transaction List
            this.mainWindow.parent.orderTaskFrm.AddMooMocOrderToGrid(this);

            //            if (needPlaySound) {
            //                this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitDealerIntervene);
            //            }
        }
        else {
            this.tran.Reject(this);
        }
    };

    this.ComfirmCancel = function (cancelType) {
        if (this.IsWithinCancelTimeSpan() == true) {
            this.tran.ComfirmCancel(this, cancelType);

            //Notify user with sound
            this.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitCancelOrder);
        }
    };

    //Dealer cancel MOO Order
    this.ComfirmCancel = function () {
        var cancelType = 1;
        this.tran.ComfirmCancel(this, cancelType);
    };

    //Added by Michael on 2008-08-22
    this.DealerCancel = function () {
        this.tran.Reject(this);
    };
}