
function Transaction(transactionID)
{
	this.id = transactionID;
	this.code;
	this.type;
	this.phase;
	this.orderType;
	this.accountID;
	this.instrumentID;
	this.beginTime;
	this.endTime;
	this.submitTime;
	this.executeTime;
	this.approverID;
	this.contractSize;
	this.assigningOrderId;
	
	this.orders = new Array();

	this.UpdateByDataRow = function (row) {
	    this.phase = row("phase");
	    this.accountID = row("accountID");
	    this.instrumentID = row("instrumentID");
	    this.code = row("transactionCode");
	    this.type = row("transactionType");
	    this.subType = row("transactionSubType");
	    this.orderType = row("orderTypeID");
	    this.beginTime = new Date(row("beginTime"));
	    this.endTime = new Date(row("endTime"));
	    this.submitTime = new Date(row("submitTime"));
	    this.executeTime = new Date(row("executeTime"));
	    this.approverID = row("ApproverID");
	    this.contractSize = row("contractSize");
	};

	this.UpdateByXmlNode = function (xmlNode) {
	    for (var index = 0, count = xmlNode.attributes.length; index < count; index++) {
	        var attribute = xmlNode.attributes.item(index);
	        switch (attribute.nodeName) {
	            case "ID":
	                this.id = attribute.nodeValue;
	                break;
	            case "AssigningOrderID":
	                this.assigningOrderId = attribute.nodeValue;
	                break;
	            case "Code":
	                this.code = attribute.nodeValue;
	                break;
	            //Added by Michael on 2005-03-14 
	            case "Phase":
	                this.phase = parseInt(attribute.nodeValue);
	                break;
	            case "ApproverID":
	                this.approverID = attribute.nodeValue;
	                break;

	            case "Type":
	                this.type = parseInt(attribute.nodeValue);
	                break;
	            case "SubType":
	                this.subType = parseInt(attribute.nodeValue);
	                break;
	            case "OrderType":
	                this.orderType = parseInt(attribute.nodeValue);
	                break;
	            case "AccountID":
	                this.accountID = attribute.nodeValue;
	                break;
	            case "InstrumentID":
	                this.instrumentID = attribute.nodeValue;
	                break;
	            case "BeginTime":
	                this.beginTime = new Date(attribute.nodeValue.replace(/-/g, "/"));
	                break;
	            case "EndTime":
	                this.endTime = new Date(attribute.nodeValue.replace(/-/g, "/"));
	                break;
	            case "SubmitTime":
	                this.submitTime = new Date(attribute.nodeValue.replace(/-/g, "/"));
	                break;
	            case "ExecuteTime":
	                this.executeTime = new Date(attribute.nodeValue.replace(/-/g, "/"));
	                break;
	            case "SubmitorID":
	                this.submitorID = attribute.nodeValue;
	                break;
	            case "ContractSize":
	                this.contractSize = parseFloat(attribute.nodeValue);
	                break;
	        }
	    }
	};

	this.Begin = function () {
	    this.Begin(false);
	};

	this.Begin = function (isExecuted) {
	    for (var index in this.orders) {
	        var order = this.orders[index];
	        var account = order.GetAccount();

	        switch (this.phase) {
	            //Added by Michael on 2006-09-29    
	            case TransPhase.Placing:
	                //Remarked by Michael on 2009-02-09		
	                //					var isValidateAutoAcceptOthers = this.ValidateAutoAcceptOthers(order.GetInstrument());
	                //					if (isValidateAutoAcceptOthers)
	                //					{
	                //						this.phase = TransPhase.Placed;
	                //						
	                //						if(account)
	                //						{
	                //							order.mainWindow.oPendingOrders.Item(order.id)  = order;							
	                //							order.CheckWhenOrderArrive();
	                //							if(order.status == OrderStatus.WaitServerResponse)
	                //								return;
	                //						}
	                //						else
	                //						{
	                //							order.mainWindow.oDeformityOrders.Item(order.id) = order;
	                //							order.mainWindow.oIOProxy.GetAccount(order.tran.accountID);
	                //						}
	                //					}
	                //					else
	                //					{
	                if (account) {
	                    order.mainWindow.oPendingOrders.Item(order.id) = order;

	                    order.SetWaitAcceptRejectPlace();

	                    //order.CheckWhenOrderArrive();							
	                    if (order.status == OrderStatus.WaitServerResponse)
	                        return;
	                }
	                else {
	                    order.mainWindow.oDeformityOrders.Item(order.id) = order;
	                    order.mainWindow.oIOProxy.GetAccount(order.tran.accountID);
	                }
	                //		            }

	                break;
	            case TransPhase.Placed:
	                if (account) {
	                    order.mainWindow.oPendingOrders.Item(order.id) = order;
	                    order.CheckWhenOrderArrive(true);
	                    if (order.status == OrderStatus.WaitServerResponse)
	                        return;
	                }
	                else {
	                    order.mainWindow.oDeformityOrders.Item(order.id) = order;
	                    order.mainWindow.oIOProxy.GetAccount(order.tran.accountID);
	                }
	                break;
	            case TransPhase.Executed:
	                if (isExecuted) {
	                    if (account) {
	                        order.mainWindow.oPendingOrders.Item(order.id) = order;
	                    }
	                    else {
	                        order.mainWindow.oDeformityOrders.Item(order.id) = order;
	                    }
	                }
	                order.status = OrderStatus.Executed;
	                order.lastStatus = OrderStatus.Executed;

	                order.mainWindow.oExecutedOrders.Item(order.id) = order;

	                if (!account) {
	                    order.mainWindow.oIOProxy.GetAccount(order.tran.accountID);
	                }
	                break;
	            case TransPhase.Canceled:
	                order.status = OrderStatus.Canceled;
	                order.lastStatus = OrderStatus.Canceled;
	                break;
	            case TransPhase.Deleted:
	                order.status = OrderStatus.Deleted;
	                order.lastStatus = OrderStatus.Deleted;
	                break;
	            case TransPhase.Completed:
	                break;
	        }
	    }
	};

	this.Commit = function (order, executePrice, lot) {
	    order.ChangeStatus(OrderStatus.WaitServerResponse, true);

	    var buyPrice = null;
	    var sellPrice = null;
	    //Modified by Michael on 2005-03-23
	    //var executePrice = order.setPrice.Clone();
	    var executePrice = (executePrice) ? executePrice : order.setPrice.Clone();

	    if (order.isBuy)
	        buyPrice = (executePrice == null) ? "" : executePrice.ToString();
	    else
	        sellPrice = (executePrice == null) ? "" : executePrice.ToString();

	    switch (this.type) {
	        case TransType.Single:
	            for (var index in this.orders) {
	                var orderTemp = this.orders[index];
	                if (orderTemp.id != order.id)
	                    orderTemp.ChangeStatus(OrderStatus.WaitServerResponse, true);
	            }
	            break;
	        case TransType.Pair:
	            for (var index in this.orders) {
	                var orderTemp = this.orders[index];
	                if (orderTemp.id != order.id) {
	                    orderTemp.ChangeStatus(OrderStatus.WaitServerResponse, true);

	                    executePrice = orderTemp.setPrice.Clone();

	                    if (orderTemp.isBuy)
	                        buyPrice = (executePrice == null) ? "" : executePrice.ToString();
	                    else
	                        sellPrice = (executePrice == null) ? "" : executePrice.ToString();
	                    break;
	                }
	            }
	            break;
	        case TransType.OCO:
	            for (var index in this.orders) {
	                var orderTemp = this.orders[index];
	                if (orderTemp.id != order.id)
	                    orderTemp.ChangeStatus(OrderStatus.Deleting, true);
	            }
	            break;
	    }
	    if (!order.id) alert("The order is not valid!");
	    order.mainWindow.oIOProxy.ExecuteTransaction(this, order, buyPrice, sellPrice, lot);
	};

	this.Reject = function (order) {
	    for (var index in this.orders) {
	        var orderTemp = this.orders[index];
	        orderTemp.ChangeStatus(OrderStatus.Deleting, true);
	    }
	    order.mainWindow.oIOProxy.CancelTransaction(this);
	};

	//Dealer confirm: Customer request cancel Limit,MOC,MOO order
	this.ComfirmCancel = function (order, cancelType) {
	    for (var index in this.orders) {
	        var orderTemp = this.orders[index];
	        orderTemp.ChangeStatus(OrderStatus.Deleting, true);
	    }

	    order.mainWindow.oIOProxy.ComfirmCancelTransaction(this, cancelType);
	};

	//Remarked by Michael on 2009-02-09	
//	//Added by Michael on 2006-09-29
//	this.ValidateAutoAcceptOthers = function(instrument)
//	{
//		if (this.phase==TransPhase.Placing)
//		{
	//			if (!instrument.autoAcceptMaxLot
//				&& (this.orderType==OrderType.Limit	
//					|| this.orderType==OrderType.OneCancelOther))//include LMT/STP/OCO
//			{
//				return false;
//			}
//		}
//		return true;
//	};

	//Added by Michael on 2009-02-09
	this.IsPlacing = function () {
	    return this.phase == TransPhase.Placing;
	};
	
	//Added by Michael on 2006-09-29
	this.GetAcountInfo = function (callWin, order) {
	    order.mainWindow.oIOProxy.GetAcountInfo(callWin, this);
	};
	
	//Added by Michael on 2006-09-28
	this.AcceptPlace = function (order) {
	    order.ChangeStatus(OrderStatus.WaitServerResponse, true);
	    for (var index in this.orders) {
	        var orderTemp = this.orders[index];

	        orderTemp.ChangeStatus(OrderStatus.WaitServerResponse, true);
	    }
	    order.mainWindow.oIOProxy.AcceptPlace(this);
	};
	
	//Added by Michael on 2006-09-28
	this.GetAcceptPlaceResult = function () {
	    this.phase = TransPhase.Placed;
	    this.Begin();


	    /*
	    for(var index in this.orders)
	    {
	    var orderTemp = this.orders[index];
	    orderTemp.CheckWhenOrderArrive();			
	    }
	    */
	};

	//Added by Michael on 2005-04-06
	this.RejectCancelLmtOrder = function (order) {
	    order.mainWindow.oIOProxy.RejectCancelLmtOrder(this);
	    //RestoreStatus????
	};
	
	//Added by Michael on 2006-09-28
	this.GetRejectCancelLmtOrderResult = function () {
	    for (var index in this.orders) {
	        var orderTemp = this.orders[index];
	        //orderTemp.RestoreStatus();

	        //Modified by Michael on 2009-02-09
	        //	        var isValidateAutoAcceptOthers = this.ValidateAutoAcceptOthers(orderTemp.GetInstrument());
	        //	        if (isValidateAutoAcceptOthers) {
	        //	            orderTemp.CheckWhenOrderArrive();
	        //	        }
	        //	        else {
	        //	            orderTemp.SetWaitAcceptRejectPlace();
	        //	        }
	        if (this.IsPlacing()) {
	            orderTemp.SetWaitAcceptRejectPlace(false);
	        }
	        else {
	            orderTemp.CheckWhenOrderArrive(false);
	        }

	        orderTemp.mainWindow.oDealingConsole.PlaySound(SoundOption.LimitCancelOrderRequest);
	    }
	};

	this.Cancel = function () {
	    for (var index in this.orders)
	        this.orders[index].Cancel();
	};

	this.Finish = function () {
	    for (var index in this.orders) {
	        var orderTemp = this.orders[index];
	        orderTemp.Finish();
	    }
	};

	this.Success = function (msXml, oDealingConsole) {
	    var transNode = msXml.firstChild;
	    this.Success2(transNode, oDealingConsole);
	};

	this.Success2 = function (transNode, oDealingConsole) {
	    //	    oDealingConsole.PlaySound(this.orderType == OrderType.SpotTrade ? SoundOption.DQTradeSucceed : SoundOption.LimitTradeSucceed);

	    this.phase = parseInt(transNode.getAttribute("Phase"));
	    this.approverID = transNode.getAttribute("ApproverID");
	    this.executeTime = new Date(transNode.getAttribute("ExecuteTime").replace(/-/g, "/"));

	    for (var i = 0, count = transNode.childNodes.length; i < count; i++) {
	        var orderNode = transNode.childNodes.item(i);
	        var id = orderNode.getAttribute("ID");
	        var isFoundOrder = false;
	        for (var index in this.orders) {
	            var order = this.orders[index];
	            if (order.id == id) {
	                isFoundOrder = true;

	                order.code = orderNode.getAttribute("Code");
	                var executePrice = orderNode.getAttribute("ExecutePrice");
	                var instrument = order.GetInstrument();
	                //order.executePrice = new Price();
	                //order.executePrice.Normalize(executePrice, instrument.numeratorUnit, instrument.denominator);
	                order.executePrice = ObjectPool.GetCorrectPriceHelper(executePrice, instrument.numeratorUnit, instrument.denominator);

	                //For make order when IsAutoClose
	                order.isOpen = (orderNode.getAttribute("IsOpen").toLowerCase() == "true") ? true : false;
	                order.lot = parseFloat(orderNode.getAttribute("Lot"));

	                //if (this.type != TransType.OCO) break;

	                if (!order.isOpen) {
	                    for (var k = 0, kCount = orderNode.childNodes.length; k < kCount; k++) {
	                        var orderRelation = new OrderRelation();
	                        orderRelation.UpdateByXmlNode(orderNode.childNodes.item(k));
	                        order.orderRelations.push(orderRelation);
	                    }
	                }
	            }
	            //Added by Michael on 2004-09-13
	            else {
	                if (this.type == TransType.OCO) {
	                    isFoundOrder = true;

	                    order.ChangeStatus(OrderStatus.Deleting, false);
	                }
	            }
	        }

	        //Create new order	//For make order when IsAutoClose
	        if (!isFoundOrder) oDealingConsole.AddNewOrder(this, orderNode);
	    }

	    this.Finish();
	};

	this.GetEventMessageArray = function (eventType, postscript) {
	    var eventMessageArray = new Array();
	    for (var index in this.orders) {
	        var orderTemp = this.orders[index];
	        var eventMessage = orderTemp.GetEventMessage(eventType, postscript);
	        eventMessageArray.push(eventMessage);
	    }
	    return eventMessageArray;
	};

	this.UpdateByXmlRowAttribute = function (xmlNodeRow) {
	    this.phase = XmlConvert.ToInt32(xmlNodeRow.getAttribute("Phase"));
	    this.accountID = xmlNodeRow.getAttribute("AccountID");
	    this.instrumentID = xmlNodeRow.getAttribute("InstrumentID");
	    this.code = xmlNodeRow.getAttribute("TransactionCode");
	    this.subType = XmlConvert.ToInt32(xmlNodeRow.getAttribute("TransactionType"));
	    this.type = XmlConvert.ToInt32(xmlNodeRow.getAttribute("TransactionSubType"));
	    this.orderType = XmlConvert.ToInt32(xmlNodeRow.getAttribute("OrderTypeID"));
	    this.beginTime = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("BeginTime"));
	    this.endTime = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("EndTime"));
	    this.submitTime = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("SubmitTime"));
	    this.executeTime = (xmlNodeRow.getAttribute("ExecuteTime") != null) ? XmlConvert.ToDateTime(xmlNodeRow.getAttribute("ExecuteTime")) : null;
	    this.approverID = xmlNodeRow.getAttribute("ApproverID");
	    this.contractSize = XmlConvert.ToDecimal(xmlNodeRow.getAttribute("ContractSize"));
	};

}
