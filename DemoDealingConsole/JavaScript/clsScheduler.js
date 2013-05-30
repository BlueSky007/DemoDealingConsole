//Scheduler------------------------------------------------------------------------------
function ScheduleEntry(id,object,action,actionArgs,isOneTime,occurTime,beginTime,endTime,interval)
{
	this.id=id;
	this.object=object;
	this.action=action;
	this.actionArgs=actionArgs;
	this.isOneTime=isOneTime;
	this.occurTime=occurTime;
	this.beginTime=beginTime;
	this.endTime=endTime;
	this.interval=interval;
}

//oScheduler = new Scheduler();
//Scheduler object 
function Scheduler(oDealingConsole)
{
	this.oDealingConsole = oDealingConsole;
	this.timeoutID;
	this.scheduleEntries = new Array();
	//this.guid = new ActiveXObject("WebTools.Guid");
	this.guid = 0;
	//this.guid = Math.random();

	this.AddSchedule = function (object, action, actionArgs, isOneTime, occurTime, beginTime, endTime, interval) {
	    //Precondition
	    if (action == null) {
	        return null;
	    }

	    //var now = new Date();
	    var now = this.oDealingConsole.mainWindow.oSystemTime;
	    if (!now) now = new Date();
	    if (isOneTime) {
	        if (occurTime == null)
	            occurTime = now;
	        if (occurTime < now)
	            return null;
	    }
	    else {
	        if (beginTime == null)
	            beginTime = now;
	        if (endTime == null)
	            endTime = new Date(2099, 12, 31);

	        if (beginTime >= endTime)
	            return null;
	        if (interval < 100)
	            interval = 100;

	        occurTime = new Date(beginTime.toString());
	        occurTime.setMilliseconds(occurTime.getMilliseconds() + interval);
	    }

	    //var guid = this.guid.NewGuid();
	    //var scheduleID=guid.ToString(0x9);	

	    this.guid++;
	    //this.guid = Math.random();
	    var scheduleID = this.guid;
	    var scheduleEntry = new ScheduleEntry(scheduleID, object, action, actionArgs, isOneTime, occurTime, beginTime, endTime, interval);

	    this.scheduleEntries[this.scheduleEntries.length] = scheduleEntry;
	    this.scheduleEntries.sort(CompareTo);


	    //if ( add to first entry then refresh timer
	    if (this.scheduleEntries.length == 1) {
	        this.RefreshTimer();
	    }
	    return scheduleID;
	};

	this.RemoveSchedule = function (scheduleID) {
	    for (var index = 0; index < this.scheduleEntries.length; index++) {
	        if (this.scheduleEntries[index].id == scheduleID) {
	            //this.scheduleEntries.splice(index, 1);
	            var arrHead = this.scheduleEntries.slice(0, index);
	            var arrTail = this.scheduleEntries.slice(index + 1, this.scheduleEntries.length);
	            this.scheduleEntries = arrHead.concat(arrTail);
	            break;
	        }
	    }

	    //if ( remove first entry then refresh timer
	    if (this.scheduleEntries.length == 1) {
	        this.RefreshTimer();
	    }
	};

	this.RefreshTimer = function () {
	    window.clearInterval(this.timeoutID)
	    if (this.scheduleEntries.length > 0) {
	        //var now = new Date();
	        var now = this.oDealingConsole.mainWindow.oSystemTime;
	        if (!now) now = new Date();
	        var scheduleEntry = this.scheduleEntries[0];
	        var interval = scheduleEntry.occurTime - now;
	        if (interval < 200)
	            interval = 200;
	        this.timeoutID = window.setInterval(timer_Elapsed, interval);

	    }
	};
}

function timer_Elapsed()
{
	var oScheduler =  window.oDealingConsole.mainWindow.oScheduler;
	
	while(true)
	{
		//var now = new Date();
		var now = window.oDealingConsole.mainWindow.oSystemTime;
		if (!now) now = new Date();
		var scheduleEntry = oScheduler.scheduleEntries[0];
		if (!scheduleEntry || scheduleEntry.occurTime>now)
		{
			break;
		}
		
		if(!scheduleEntry.isOneTime)
		{
			scheduleEntry.occurTime.setMilliseconds( scheduleEntry.occurTime.getMilliseconds() + scheduleEntry.interval);
			
			if(scheduleEntry.occurTime < scheduleEntry.endTime)
				oScheduler.scheduleEntries.sort(CompareTo);
			else	//at end time of this schedule, so remove it.
			{
				if (oScheduler.scheduleEntries.length > 1)
					oScheduler.scheduleEntries = oScheduler.scheduleEntries.slice( 1, oScheduler.scheduleEntries.length );
				else
					oScheduler.scheduleEntries = new Array();
				//oScheduler.scheduleEntries.shift();
			}	
		}
		else	//at end time of this schedule, so remove it.
		{
			if (oScheduler.scheduleEntries.length > 1)
				oScheduler.scheduleEntries = oScheduler.scheduleEntries.slice( 1, oScheduler.scheduleEntries.length );
			else
				oScheduler.scheduleEntries = new Array();
			//oScheduler.scheduleEntries.shift();
		}
			
		if(scheduleEntry.actionArgs == null)
		{
			if(scheduleEntry.object)
				scheduleEntry.object[scheduleEntry.action]();
			else
				scheduleEntry.action();
		}
		else
		{
			var args = scheduleEntry.actionArgs;
			switch(args.length)
			{
				case 1:
					if(scheduleEntry.object)
						scheduleEntry.object[scheduleEntry.action](args[0]);
					else
						scheduleEntry.action(args[0]);
					break;
				case 2:
					if(scheduleEntry.object)
						scheduleEntry.object[scheduleEntry.action](args[0],args[1]);
					else
						scheduleEntry.action(args[0],args[1]);
					break;
				case 3:
					if(scheduleEntry.object)
						scheduleEntry.object[scheduleEntry.action](args[0],args[1],args[2]);
					else
						scheduleEntry.action(args[0],args[1],args[2]);
					break;
				case 4:
					if(scheduleEntry.object)
						scheduleEntry.object[scheduleEntry.action](args[0],args[1],args[2],args[3]);
					else
						scheduleEntry.action(args[0],args[1],args[2],args[3]);
					break;
			}
		}
	}
	oScheduler.RefreshTimer();
}

function CompareTo(objA, objB)
{
	if(objA.occurTime > objB.occurTime)
		return 1;
	else if(objA.occurTime < objB.occurTime)
		return -1;
	else
		return 0;
}
