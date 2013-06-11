function MooMocInit()
{
    var titleHeight = parseInt(window.dialogHeight) - oBodyMooMoc.clientHeight;
    this.owner = dialogArguments[1];
    var limitProcessGridLanguage = this.owner.parent.quotationFrm.limitProcessGridLanguage;
    var commonLanguage = this.owner.parent.quotationFrm.commonLanguage;
	window.dialogHeight = window.Table1.clientHeight+titleHeight+"px";
	window.dialogWidth = window.Table1.clientWidth+"px";
	window.dialogTop = (parseInt(window.screen.height) - window.Table1.clientHeight)/2 + "px"; 
	window.dialogLeft = (parseInt(window.screen.width) - window.Table1.clientWidth)/2 + "px"; 
	
	var lColIndex = 0;
	with (vsflexMooMoc)
	{
		//Fill ColKey
		Rows = 1;
		FixedRows = 1;
		FixedCols = 0;
		Cols = 17;

		TextMatrix(0, lColIndex) = limitProcessGridLanguage["Unconfirm"];
		ColKey(lColIndex) = "Unconfirm";
		ColWidth(lColIndex) = 800;
        ColDataType(lColIndex) = flexDTBoolean;
		lColIndex ++;

		TextMatrix(0, lColIndex) = limitProcessGridLanguage["Account"];
		ColKey(lColIndex) = "Account";
		ColWidth(lColIndex) = 1000;
		lColIndex ++;

		TextMatrix(0, lColIndex) = limitProcessGridLanguage["OrderDate"];
		ColKey(lColIndex) = "OrderDate";
		ColWidth(lColIndex) = 2400;
		ColDataType(lColIndex) = flexDTDate;
        ColFormat(lColIndex) = "yyyy-MM-dd HH:mm:ss";
		lColIndex ++;

		TextMatrix(0, lColIndex) = limitProcessGridLanguage["OpenClose"];
		ColKey(lColIndex) = "OpenClose";
		ColWidth(lColIndex) = 600;
		lColIndex ++;

		TextMatrix(0, lColIndex) = limitProcessGridLanguage["BuyLot"];
		ColKey(lColIndex) = "BuyLot";
		ColWidth(lColIndex) = 900;
		lColIndex ++;

		TextMatrix(0, lColIndex) = limitProcessGridLanguage["SellLot"];
		ColKey(lColIndex) = "SellLot";
		ColWidth(lColIndex) = 900;
		lColIndex ++;

		TextMatrix(0, lColIndex) = limitProcessGridLanguage["QuotePolicyCode"];
		ColKey(lColIndex) = "QuotePolicyCode";
		ColWidth(lColIndex) = 1410;
		lColIndex ++;

		TextMatrix(0, lColIndex) = limitProcessGridLanguage["Price"];
		ColKey(lColIndex) = "Price";
		ColWidth(lColIndex) = 1000;
		lColIndex ++;

		TextMatrix(0, lColIndex) = limitProcessGridLanguage["Message"];
		ColKey(lColIndex) = "Message";
		ColWidth(lColIndex) = 1000;
		lColIndex ++;
	    
	    Cols = lColIndex;
	    
		ExtendLastCol = true;
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
		ExplorerBar = flexExSortAndMove;
		Editable = flexEDKbdMouse;
        SelectionMode = flexSelectionFree;
	}	
	
	var orders = dialogArguments[0];
	window.instrument = orders[0].GetInstrument();
	for(var index=0,count=orders.length;index<count;index++)
	{
		var account = orders[index].GetAccount();
		
		var line = vsflexMooMoc.Rows;
		vsflexMooMoc.AddItem("");
		vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("Account")) = account ? account.code : orders[index].accountID;
		vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("OrderDate")) = GetDateTimeString(orders[index].tran.submitTime, "DateTime"); //.getVarDate();
		vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("OpenClose")) = orders[index].isOpen ? commonLanguage["Open"] : commonLanguage["Close"];
		if(orders[index].isBuy == true)
			vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("BuyLot")) = orders[index].GetFormatLot2(orders[index].lot);
		else
			vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("SellLot")) = orders[index].GetFormatLot2(orders[index].lot);
		//vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("Price")) = orders[index].setPrice.ToString();
		vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("QuotePolicyCode")) = orders[index].GetQuotePolicyCode();
		if(instrument.lastQuotation)
		{
			if(instrument.isNormal == orders[index].isBuy)
				vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("Price")) = instrument.lastQuotation.ask.ToString();
			else
				vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("Price")) = instrument.lastQuotation.bid.ToString();
		}
vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("Message")) = OrderStatus.GetOrderStatusString(orders[index].status, commonLanguage);
		vsflexMooMoc.RowData(line) = orders[index];
		
		SetRowForeColor(vsflexMooMoc, line, orders[index].isBuy ? color_blue : color_red);
		this.isActive = (orders[index].status == OrderStatus.TimeArrived);
	}
	
	if(instrument.lastQuotation)
	{
		window.labelSource.innerText = instrument.lastQuotation.origin.ToString();
		window.textBid.value = instrument.lastQuotation.bid.ToString();
		window.textAsk.value = instrument.lastQuotation.ask.ToString();
	}
	window.document.all.labelItem.innerText = instrument.code;
	window.labelSell.innerText = commonLanguage["TotalSell"] + ":" + GetTotalLot(orders, true);
	window.labelBuy.innerText = commonLanguage["TotalBuy"] + ":" + GetTotalLot(orders, false);
	
	this.orderType = orders[0].tran.orderType;
	dialogArguments[1].mooMocDialog = this;
	this.btnApply.disabled = !this.isActive;
	this.btnExecute.disabled = !this.isActive;
	this.textBid.disabled = !this.isActive;
	this.textAsk.disabled = !this.isActive;
	
}

function MooMocFinish()
{
	this.owner.mooMocDialog = null;
}

function OnMooMocBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)
{
	switch(vsflexMooMoc.ColKey(newCol))
	{
		case "Unconfirm":
		case "Price":
			if(this.isActive == true)
			{
				vsflexMooMoc.Editable = flexEDKbdMouse;
				break;
			}
		default:
			vsflexMooMoc.Editable = flexEDNone;
			break;
	}
}

function OnMooMocValidateEdit(row, col, cancel)
{
	switch(vsflexMooMoc.ColKey(col))
	{
		case "Unconfirm":
			{
				var order = vsflexMooMoc.RowData(row);
				for(var line=vsflexMooMoc.FixedRows; line<vsflexMooMoc.Rows; line++)
				{
					var orderTemp = vsflexMooMoc.RowData(line);
					if(order.tran.id == orderTemp.tran.id)
						vsflexMooMoc.Cell(flexcpChecked, line, col) = vsflexMooMoc.Cell(flexcpChecked, row, col);
				}
			}
			break;
		case "Price":
			{
				var order = vsflexMooMoc.RowData(row);
				var instrument = order.GetInstrument();
				var newValue = vsflexMooMoc.EditText;
				var source = vsflexMooMoc.TextMatrix(row, col);
				var adjustPriceString = GetAdjustPrice(newValue, source, instrument.numeratorUnit, instrument.denominator);
				//var adjustPrice = new Price(); 
				//adjustPrice.Normalize(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
				var adjustPrice = this.owner.parent.quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
				vsflexMooMoc.EditText = (adjustPrice==null)?"":adjustPrice.ToString();
			}
			break;
		default:
			break;
	}
}

function OnMooMocApply()
{
	var bid = null;
	var ask = null;
	var instrument = null;
	
	for(var line=vsflexMooMoc.FixedRows; line<vsflexMooMoc.Rows; line++)
	{
		var order = vsflexMooMoc.RowData(line);
		if(!instrument)
			instrument = order.GetInstrument();
		if(!bid)
		{
			var newValue = textBid.value;
			//var oldValue = instrument.lastQuotation.ToString();
			var oldValue = (instrument.lastQuotation.bid ==null)?"":instrument.lastQuotation.bid.ToString();
			var adjustPriceString = GetAdjustPrice(newValue, oldValue, instrument.numeratorUnit, instrument.denominator);
			//bid = new Price();
			//bid.Normalize(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
			bid = this.owner.parent.quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
		}
		if(!ask)
		{
			var newValue = textAsk.value;
			//var oldValue = instrument.lastQuotation.ToString();
			var oldValue = (instrument.lastQuotation.ask ==null)?"":instrument.lastQuotation.ask.ToString();
			var adjustPriceString = GetAdjustPrice(newValue, oldValue, instrument.numeratorUnit, instrument.denominator);
			//ask = new Price();
			//ask.Normalize(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
			ask = this.owner.parent.quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, instrument.numeratorUnit, instrument.denominator);
		}
		
		if(instrument.isNormal == order.isBuy)
			vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("Price")) = ask.ToString();
		else
			vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("Price")) = bid.ToString();
	}
}

function OnMooMocExecute() {    
	var instrument = null;
	var orders = new Array();
	for(var line=vsflexMooMoc.FixedRows; line<vsflexMooMoc.Rows; line++)
	{
		var order = vsflexMooMoc.RowData(line);
		if(!instrument)
		    instrument = order.GetInstrument();

		var canExecute = false;
		if (order.tran.orderType == OrderType.MarketOnOpen) 
		{
		    canExecute = (instrument.dayOpenTime != null 
		        && order.tran.beginTime.valueOf() == instrument.dayOpenTime.valueOf());
		}
		else if (order.tran.orderType == OrderType.MarketOnClose) {
		//Since order.tran.beginTime may be the MOCTime of last trade day,
		//and there are no way to get the MOCTime of last trade day, so don't check here
		    canExecute = true;  /*(instrument.mocTime != null &&
		    			(order.tran.beginTime.valueOf() == instrument.mocTime.valueOf()
		    			    || (order.tran.beginTime.valueOf() + 24 * 60 * 60 * 1000) == instrument.mocTime.valueOf()))//24 hour instrument, beginTime of the MOC order is the MOCTime of previous TradeDay		    			 */
		}
		if (canExecute) {
		    var priceStr = vsflexMooMoc.TextMatrix(line, vsflexMooMoc.ColIndex("Price"));
		    var isUnconfirm = (vsflexMooMoc.Cell(flexcpChecked, line, vsflexMooMoc.ColIndex("Unconfirm")) == flexChecked) ? true : false;
		    if (!isUnconfirm) {
		        orders.push(new Array(order, priceStr, isUnconfirm));		        
		    }
		}
		else {
		    vsflexMooMoc.Cell(flexcpChecked, line, vsflexMooMoc.ColIndex("Unconfirm")) = flexUnchecked;
		}
	}
	window.returnValue = orders;
	window.close();
}

function ComfirmCancel()
{
	if (vsflexMooMoc.Row < vsflexMooMoc.FixedRows) return;
	var order = vsflexMooMoc.RowData(vsflexMooMoc.Row);
	order.DealerCancel();
}

function OnMooMocReject() {
    if (vsflexMooMoc.Row < vsflexMooMoc.FixedRows) return;
    var order = vsflexMooMoc.RowData(vsflexMooMoc.Row);
    var setPrice = vsflexMooMoc.TextMatrix(vsflexMooMoc.Row, vsflexMooMoc.ColIndex("Price"));
    if (order.status == OrderStatus.WaitAcceptRejectPlace) {
        var args = new Array("Are you sure?", "Yes", "No", order.GetMooMocDescription() + setPrice.toString());
        isOK = window.showModalDialog("Confirm.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
        if (isOK) {
            order.DoReject();
        }
    }
}

function OnMooMocAccept() {
    if (vsflexMooMoc.Row < vsflexMooMoc.FixedRows) return;
    var order = vsflexMooMoc.RowData(vsflexMooMoc.Row);
    if (order.status == OrderStatus.WaitAcceptRejectPlace) {
        order.DoAcceptPlace();
        vsflexMooMoc.RemoveItem(vsflexMooMoc.Row);
        //parent.vsflexOrderTask.RemoveItem(vsflexMooMoc.Row);
        var object = window.dialogArguments;
        var line = object[2];
        var vsflexGrid = object[1].vsflexOrderTask;
        this.RemoveOrderFromGrid2(order, vsflexGrid);
    }
}

function RemoveOrderFromGrid2(order, vsflexGrid) {
    vsflexGrid.Redraw = false;
    for (var line = vsflexGrid.FixedRows, count = vsflexGrid.Rows; line < count; line++) {
        var data = vsflexGrid.RowData(line);
        if (data && data.object && data.type == order.tran.orderType) {
            if (data.type == OrderType.MarketOnOpen || data.type == OrderType.MarketOnClose) {
                var orders = data.object;
                for (var index in orders) {
                    if (orders[index].id == order.id) {
                        orders.splice(index, 1);
                        this.RemoveOrderFromMooMocGrid(order, orders);
                        break;
                    }
                }
                if (orders.length > 0) {
                    var totalLot = GetTotalLot(orders, order.isBuy);
                    if (order.isBuy)
                        vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("BuyLot")) = order.GetFormatLot2(totalLot);
                    else
                        vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("SellLot")) = order.GetFormatLot2(totalLot);
                    for (var index in orders) {
                        var order2 = orders[index];
                        data.relationObject = order2.tran;
                        var account = order2.GetAccount();
                        vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Account")) = account ? account.code : order2.tran.accountID;
                        break;
                    }                    
                }
                else {
                    vsflexGrid.RemoveItem(line);
                    break;
                }
            }
            else if (data.object.id == order.id) {
                vsflexGrid.RemoveItem(line);
                break;
            }
        }
    }
    vsflexGrid.Redraw = true;
}

function AddOrderToMooMocGrid(order, orders)
{
	if(window.instrument.id != order.tran.instrumentID ||
		window.orderType != order.tran.orderType)
		return;
	
	var account = order.GetAccount();
	
	var vsflexGrid = window.vsflexMooMoc;
	var line = vsflexGrid.Rows;
	vsflexGrid.AddItem("");
	vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Account")) = account ? account.code : order.tran.accountID;
	vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("OrderDate")) = GetDateTimeString(order.tran.submitTime, "DateTime"); //.getVarDate();
	vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("OpenClose")) = order.isOpen ? "O" : "C";
	if(order.isBuy == true)
		vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("BuyLot")) = order.GetFormatLot2(order.lot);
	else
		vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("SellLot")) = order.GetFormatLot2(order.lot);
	vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Message")) = OrderStatus.GetOrderStatusString(order.status, this.owner.parent.quotationFrm.commonLanguage);
	vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("QuotePolicyCode")) = order.GetQuotePolicyCode();
	var instrument = order.GetInstrument();	
	if(instrument.lastQuotation)
	{
		if(instrument.isNormal == order.isBuy)
			vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Price")) = instrument.lastQuotation.ask.ToString();
		else
			vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Price")) = instrument.lastQuotation.bid.ToString();
	}
	vsflexGrid.RowData(line) = order;
	
	SetRowForeColor(vsflexGrid, line, order.isBuy ? color_blue : color_red);
	
	window.labelSell.innerText = "Tatol sell: " + GetTotalLot(orders, true);
	window.labelBuy.innerText = "Tatol buy: " + GetTotalLot(orders, false);
}

function RemoveOrderFromMooMocGrid(order, orders)
{
	if(window.instrument.id != order.tran.instrumentID ||
		window.orderType != order.tran.orderType)
		return;

	var vsflexGrid = window.vsflexMooMoc;
	for(var line=vsflexGrid.FixedRows; line<vsflexGrid.Rows; line++)
	{
		var orderTemp = vsflexGrid.RowData(line);
		if(orderTemp == order)
		{
			vsflexGrid.RemoveItem(line);
			break;
		}
	}
	
	if(vsflexGrid.Rows > vsflexGrid.FixedRows)
	{
		window.labelSell.innerText = "Tatol sell: " + GetTotalLot(orders, true);
		window.labelBuy.innerText = "Tatol buy: " + GetTotalLot(orders, false);
	}
	else
	{
		window.close();	
		this.owner.mooMocDialog = null;
	}
}

function ChangeStatusOfMooMocGrid(order, isActive)
{
	if(window.instrument.id != order.tran.instrumentID ||
		window.orderType != order.tran.orderType)
		return;

	var vsflexGrid = window.vsflexMooMoc;
	window.isActive = isActive;
	window.btnApply.disabled = !isActive;
	window.btnExecute.disabled = !isActive;
	window.textBid.disabled = !isActive;
	window.textAsk.disabled = !isActive;

	//we conside all the orders is same status for MOO & MOC
	for(var line=vsflexGrid.FixedRows; line<vsflexGrid.Rows; line++)
	{
	    vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Message")) = OrderStatus.GetOrderStatusString(order.status, this.owner.parent.quotationFrm.commonLanguage);
	}
}
