//global window var
var mainUIReadyCheckTimeOutId = null;
var mainUIReadyCheckTimeOutCheckTimes = 0;
function MainUIReadyCheck() {
    try {
        mainUIReadyCheckTimeOutCheckTimes++;
        if (mainUIReadyCheckTimeOutCheckTimes >= 100) {
            if (mainUIReadyCheckTimeOutId) {
                window.clearTimeout(mainUIReadyCheckTimeOutId);
                mainUIReadyCheckTimeOutId = null;
            }
            alert("UI is loading or load faulture, please check and try again!");
            return;
        }
        if (!PageLoaded(window.quotationPageLoaded)
            || window.vsflexQuotation == null
            || window.vsflexQuotation.readyState != 4

            || window.parent == null

            || window.parent.toolBarFrm == null
            || !PageLoaded(window.parent.toolBarFrm.toolBarPageLoaded)

            || window.parent.quotationTaskFrm == null
            || !PageLoaded(window.parent.quotationTaskFrm.quotationTaskPageLoaded)
            || window.parent.quotationTaskFrm.vsflexQuotationTask == null
            || window.parent.quotationTaskFrm.vsflexQuotationTask.readyState != 4

            || window.parent.QuotePolicyFrm == null
            || !PageLoaded(window.parent.QuotePolicyFrm.quotePolicyPageLoaded)
            || window.parent.QuotePolicyFrm.quotePolicyGrid == null
            || window.parent.QuotePolicyFrm.quotePolicyGrid.readyState != 4

            || window.parent.SourceLevelAdjustmentFrm == null
            || !PageLoaded(window.parent.SourceLevelAdjustmentFrm.sourceLevelAdjustmentPageLoaded)
            || window.parent.SourceLevelAdjustmentFrm.sourceLevelAdjustmentGrid == null
            || window.parent.SourceLevelAdjustmentFrm.sourceLevelAdjustmentGrid.readyState != 4
            
            || window.parent.orderTaskFrm == null
            || !PageLoaded(window.parent.orderTaskFrm.orderTaskPageLoaded)
            || window.parent.orderTaskFrm.vsflexOrderTask == null
            || window.parent.orderTaskFrm.vsflexOrderTask.readyState != 4

            || window.parent.propertyFrm == null
            || !PageLoaded(window.parent.propertyFrm.propertyPageLoaded)
            || window.parent.propertyFrm.vsFlexProperites == null
            || window.parent.propertyFrm.vsFlexProperites.readyState != 4
            || window.parent.propertyFrm.vsFlexHistory == null
            || window.parent.propertyFrm.vsFlexHistory.readyState != 4

            || window.parent.propertyFrm._InstantOrderByInstrumentIFrame == null
            || window.parent.propertyFrm._InstantOrderByInstrumentIFrame._InstantOrderListFrame1 == null
            || window.parent.propertyFrm._InstantOrderByInstrumentIFrame._InstantOrderListFrame2 == null
            || window.parent.propertyFrm._InstantOrderByInstrumentIFrame._InstantOrderListFrame3 == null
            || window.parent.propertyFrm._InstantOrderByInstrumentIFrame._InstantOrderListFrame4 == null
            || !PageLoaded(window.parent.propertyFrm._InstantOrderByInstrumentIFrame._InstantOrderListFrame1.instantOrderListPageLoaded)
            || !PageLoaded(window.parent.propertyFrm._InstantOrderByInstrumentIFrame._InstantOrderListFrame2.instantOrderListPageLoaded)
            || !PageLoaded(window.parent.propertyFrm._InstantOrderByInstrumentIFrame._InstantOrderListFrame3.instantOrderListPageLoaded)
            || !PageLoaded(window.parent.propertyFrm._InstantOrderByInstrumentIFrame._InstantOrderListFrame4.instantOrderListPageLoaded)
            ) {
            if (mainUIReadyCheckTimeOutId) {
                window.clearTimeout(mainUIReadyCheckTimeOutId);
                mainUIReadyCheckTimeOutId = null;
            }
            mainUIReadyCheckTimeOutId = window.setTimeout(MainUIReadyCheck, 50);
        }
        else {
            if (mainUIReadyCheckTimeOutId) {
                window.clearTimeout(mainUIReadyCheckTimeOutId);
                mainUIReadyCheckTimeOutId = null;
            }

            oIOProxy.mainWindow = window;

            //useService function must call only once
            //Service.useService("Service.asmx?WSDL","SrvTest");

            //var oIOProxy2 = this.mainWindow.oIOProxy;
            oIOProxy.Url = "Service.asmx?WSDL";
            //var serviceWsdl = window.parent.quotationFrm.window.document.all.ServiceWsdl;
            //oIOProxy2.Initialize2(serviceWsdl);
            oIOProxy.Initialize();

            oIOProxy.GetSystemTime();

            return;
        }
    }
    catch (ex) {
        alert("UI load faulture, please check and try again!");
        return;
    }
}

function PageLoaded(pageFlag) {
    return typeof (pageFlag) != 'undefined' && pageFlag == true;
}

var oInstruments = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=Instrument
var NeedUpdateUIInstruments = new ActiveXObject("Scripting.Dictionary"); //key=id value=Instrument
var oQuotePolicys = new ActiveXObject("Scripting.Dictionary"); //key=QuotePolicyID value=QuotePolicy
var oTradePolicys = new ActiveXObject("Scripting.Dictionary"); //key=TradePolicyID value=TradePolicy
var oAccounts = new ActiveXObject("Scripting.Dictionary"); //key=AccountID value=Account
var oAccountGroups = new ActiveXObject("Scripting.Dictionary"); //key=id value=Group
var AccountComboString = "";
var AccountNameComboString = "";
var AccountCodeList = new ActiveXObject("Scripting.Dictionary"); //key=AccountCode value=AccountId
var AccountIdList = new ActiveXObject("Scripting.Dictionary"); //key=AccountId value=AccountCode
var InstrumentOriginCodeComboString = "";
var InstrumentCodeComboString = "";
var oUpdateHighLowBatchProcessInfos = new ActiveXObject("Scripting.Dictionary"); //key=id value=UpdateHighLowBatchProcessInfo
var oDealerParameterGroupDetails = new ActiveXObject("Scripting.Dictionary"); //key=name value=DealerParameterGroupDetail
var oCustomers = new ActiveXObject("Scripting.Dictionary"); //key=CustomerID value=Customer
var oTransactions = new ActiveXObject("Scripting.Dictionary"); //key=TransactionID value=Transaction
var oPendingOrders = new ActiveXObject("Scripting.Dictionary"); //key=OrderID value=Order
var oDeformityOrders = new ActiveXObject("Scripting.Dictionary"); //key=OrderID value=Order
var oExecutedOrders = new ActiveXObject("Scripting.Dictionary"); //key=OrderID value=Order
var oOpenIdToCloseId = new ActiveXObject("Scripting.Dictionary"); //key=OpenOrderID value=CloseOrderID
var oCloseIdToOpenId = new ActiveXObject("Scripting.Dictionary"); //key=CloseOrderID value=OpenOrderID

var oSourceOrderIdToMatchedLot = new ActiveXObject("Scripting.Dictionary"); //key=SourceOrderID value=MatchedLot
var oCanceledOrCuttedTransactionIds = new ActiveXObject("Scripting.Dictionary"); //key=CanceledTransactionId value=null

var oPrintingOrders = new ActiveXObject("Scripting.Dictionary"); //key=OrderID value=Order
//var oQuotationSources = new ActiveXObject("Scripting.Dictionary"); //key=SourceName value=QuotationSource
//Added by Michael on 2008-05-23
var oSourceInstruments = new ActiveXObject("Scripting.Dictionary"); //key=Code value=SourceInstrument

var oIOProxy = new IOProxy();
oIOProxy.SlidingWindow = new SlidingWindow(2);
oIOProxy.SlidingWindow.ProcessObject = oIOProxy.ProcessCommands;
oIOProxy.SlidingWindow.Retry = oIOProxy.Retry;

var oDealingConsole = new DealingConsole();
var IsReGetInitData = true;
var oSystemTime = null;
//var oHiddenPropertys = new Array();
var oColsArrangements = new Array();

//var oScheduler = new Scheduler(oDealingConsole);

var oInstrumentList = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=InstrumentSortByCode(instrumentId,order,code)
var oDeformityEnquiry = new Array();
var oDeformityEnquiry2 = new Array();
var oSoundOptions = new ActiveXObject("Scripting.Dictionary"); //key=ID value=Sound File Name
var oSetValueOptions = new ActiveXObject("Scripting.Dictionary");
var oPreviousParameters = new ActiveXObject("Scripting.Dictionary");
var settings = new ActiveXObject("Scripting.Dictionary");

var oUserID;
var oCurrentQuotePolicyDetailID = null;
var oDisplayQuotePolicyDetailID = null;
var oCurrentInstrumentID = null;

//system params
var IsCustomerVisibleToDealer = false;
var CanDealerViewAccountInfo = false;
var MooMocAcceptDuration;
var LotDecimal = 2.00;
var MooMocCancelDuration;
var QuotePolicyDetailID = "";
var currentTradeDay;
var tradeDayBeginTime;
var tradeDayEndTime;

var ConfirmRejectDQOrder = false;
var AllowModifyOrderLot = false;

var oMaxHistoryCount = 20;
var oFlashPriceTime = 3;
var quotationHistoryCount = 0;

var oInactiveWaitTime = 10;
var oEnquiryWaitTime = 10;
var oApplyAutoAdjustPoints = true;
var oPriceOrderSetting = 0;
var oDisablePopup = 0;
var oAutoConfirm = 0;
var ApplySetValueToDealingPolicy = false;

var updateUITimerTickRunning = false;

var instrumentColKey = new InstrumentColKey();
var instrumentLanguage = new InstrumentLanguage();

var instrumentPropertyColKey = new InstrumentPropertyColKey();

var instrumentPropertyLanguage = new InstrumentPropertyLanguage();

var optionGrid = new OptionGrid();
var optionGridLanguage = new OptionGridLanguage();

var quotationTaskGridColKey = new QuotationTaskGridColKey();
var quotationTaskGridLanguage = new QuotationTaskGridLanguage();

var quotePolicyGridColKey = new QuotePolicyGridColKey();
var quotePolicyGridLanguage = new QuotePolicyGridLanguage();

var sourceLevelAdjustmentGridColKey = new SourceLevelAdjustmentGridColKey();
var sourceLevelAdjustmentGridLanguage = new SourceLevelAdjustmentGridLanguage();

var orderGridColKey = new OrderGridColKey();
var orderGridLanguage = new OrderGridLanguage();

var historyGridColKey = new HistoryGridColKey();
var historyGridLanguage = new HistoryGridLanguage();

var searchGridColKey = new SearchGridColKey();
var searchGridLanguage = new SearchGridLanguage();

var searchGridColKeyForCancelledOrder = new SearchGridColKeyForCancelledOrder();
var searchGridLanguageForCancelledOrder = new SearchGridLanguageForCancelledOrder();

var interestGridColKey = new InterestGridColKey();
var interestGridLanguage = new InterestGridLanguage();

var groupNetPositionGridColKey = new GroupNetPositionGridColKey();
var groupNetPositionGridLanguage = new GroupNetPositionGridLanguage();

var interestSummaryGridColKey = new InterestSummaryGridColKey();
var interestSummaryGridLanguage = new InterestSummaryGridLanguage();

var executeOrderSummaryGridColKey = new ExecuteOrderSummaryGridColKey();
var executeOrderSummaryGridLanguage = new ExecuteOrderSummaryGridLanguage();

var instantOrderListGridColKey = new InstantOrderListGridColKey();
var instantOrderListGridLanguage = new InstantOrderListGridLanguage();

var executedGridColKey = new ExecutedGridColKey();
var executedGridLanguage = new ExecutedGridLanguage();

var unclosedOrderGridColKey = new UnclosedOrderGridColKey();
var unclosedOrderGridLanguage = new UnclosedOrderGridLanguage();

var orderPrintGridColKey = new OrderPrintGridColKey();
var orderPrintGridLanguage = new OrderPrintGridLanguage();

var dealingPolicyDetailGridColKey = new DealingPolicyDetailGridColKey();
var dealingPolicyDetailGridLanguage = new DealingPolicyDetailGridLanguage();

var customerPolicyManagementGridColKey = new CustomerPolicyManagementGridColKey();
var customerPolicyManagementGridLanguage = new CustomerPolicyManagementGridLanguage();

var blotterSelectionGridColKey = new BlotterSelectionGridColKey();
var blotterSelectionGridLanguage = new BlotterSelectionGridLanguage();

//Add by Erric Common Language List
var limitProcessGridLanguage = new LimitProcessGridLanguage();
var commonLanguage = new CommonLanguage();
var messageLanguage = new MessageLanguage();
var comboListLanguage = new ComboListLanguage();

var quotationTaskFrm = null;
var vsflexQuotationTask = null;
var vsflexOrderTask = null;

//#region NeedUpdateUIInstruments Process
function AddNeedUpdateUIInstrument(instrument) {
    if (!NeedUpdateUIInstruments.Exists(instrument.id)) {
        NeedUpdateUIInstruments.Add(instrument.id, instrument);
    }
}

function RemoveNeedUpdateUIInstrument(instrumentID) {
    if (NeedUpdateUIInstruments.Exists(instrumentID)) {
        NeedUpdateUIInstruments.Remove(instrumentID);
    }
}

function UpdateUITimerTick() {
    updateUITimerTickRunning = true;
    window.vsflexQuotation.Redraw = false;
    var instruments = (new VBArray(NeedUpdateUIInstruments.Items())).toArray();
    for (var index = instruments.length - 1; index >= 0; index--) {
        var instrument = instruments[index];
        UpdateQuotation2UITimerTick(instrument);

        NeedUpdateUIInstruments.Remove(instrument.id);
    }
    window.vsflexQuotation.Redraw = true;
    updateUITimerTickRunning = false;
}
//#endregion NeedUpdateUIInstruments Process

//Added by Michael on 2005-08-05
function TradeDayReset() {
    //Checking.....

    var mainWindow = oDealingConsole.mainWindow;

    oInstruments = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=Instrument
    NeedUpdateUIInstruments = new ActiveXObject("Scripting.Dictionary"); //key=id value=Instrument
    oQuotePolicys = new ActiveXObject("Scripting.Dictionary"); //key=QuotePolicyID value=QuotePolicy
    oTradePolicys = new ActiveXObject("Scripting.Dictionary"); //key=TradePolicyID value=TradePolicy
    oAccounts = new ActiveXObject("Scripting.Dictionary"); //key=AccountID value=Account
    oAccountGroups = new ActiveXObject("Scripting.Dictionary"); //key=id value=Group
    AccountComboString = "";
    AccountNameComboString = "";
    AccountCodeList = new ActiveXObject("Scripting.Dictionary"); //key=AccountCode value=AccountId
    AccountIdList = new ActiveXObject("Scripting.Dictionary"); //key=AccountId value=AccountCode
    InstrumentOriginCodeComboString = "";
    InstrumentCodeComboString = "";
    oUpdateHighLowBatchProcessInfos = new ActiveXObject("Scripting.Dictionary"); //key=id value=UpdateHighLowBatchProcessInfo
    oDealerParameterGroupDetails = new ActiveXObject("Scripting.Dictionary"); //key=name value=DealerParameterGroupDetail
    oCustomers = new ActiveXObject("Scripting.Dictionary"); //key=CustomerID value=Customer
    oTransactions = new ActiveXObject("Scripting.Dictionary"); //key=TransactionID value=Transaction
    oPendingOrders = new ActiveXObject("Scripting.Dictionary"); //key=OrderID value=Order
    oDeformityOrders = new ActiveXObject("Scripting.Dictionary"); //key=OrderID value=Order
    oExecutedOrders = new ActiveXObject("Scripting.Dictionary"); //key=OrderID value=Order
    oPrintingOrders = new ActiveXObject("Scripting.Dictionary"); //key=OrderID value=Order
    //oQuotationSources = new ActiveXObject("Scripting.Dictionary"); 
    //Added by Michael on 2008-05-23
    oSourceInstruments = new ActiveXObject("Scripting.Dictionary"); //key=Code value=SourceInstrument

    oIOProxy = new IOProxy();
    oIOProxy.SlidingWindow = new SlidingWindow(2);
    oIOProxy.SlidingWindow.ProcessObject = oIOProxy.ProcessCommands;
    oIOProxy.SlidingWindow.Retry = oIOProxy.Retry;

    oDealingConsole.CloseAllEnquiryWindow();

    oDealingConsole = new DealingConsole();
    IsReGetInitData = true;
    oSystemTime = null;
    // oHiddenPropertys = new Array();
    oColsArrangements = new Array();

    // oScheduler = new Scheduler(oDealingConsole);

    oInstrumentList = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=InstrumentSortByCode(instrumentId,order,code)
    oDeformityEnquiry = new Array();
    oDeformityEnquiry2 = new Array();
    oSoundOptions = new ActiveXObject("Scripting.Dictionary"); //key=ID value=Sound File Name
    oSetValueOptions = new ActiveXObject("Scripting.Dictionary");
    oPreviousParameters = new ActiveXObject("Scripting.Dictionary");
    settings = new ActiveXObject("Scripting.Dictionary");

    oUserID = null;
    oCurrentQuotePolicyDetailID = null;
    oDisplayQuotePolicyDetailID = null;
    oCurrentInstrumentID = null;

    quotationHistoryCount = 0;

    //system params
    IsCustomerVisibleToDealer = false;
    CanDealerViewAccountInfo = false;
    MooMocAcceptDuration = null;
    LotDecimal = 2.00;
    LanguageString = "en";
    MooMocCancelDuration = null;
    QuotePolicyDetailID = "";
    currentTradeDay = null;
    tradeDayBeginTime = null;
    tradeDayEndTime = null;

    oInactiveWaitTime = 10;
    oEnquiryWaitTime = 10;
    oApplyAutoAdjustPoints = true;
    oPriceOrderSetting = 0;
    oDisablePopup = 0;
    oAutoConfirm = 0;
    ApplySetValueToDealingPolicy = false;

    updateUITimerTickRunning = false;

    oDealingConsole.started = false;

    oDealingConsole.InitApp(mainWindow);
}

var commandsTimerID = null;
var scanTimerID = null;
var countTimerID = null;
var updateUITimerID = null;
function Run() {
    GetCommandsTimer();
    ScanTimer();
    CountTimer();
    UpdateUITimer();
}

function GetOrderById(orderId) {
    if (this.oPendingOrders.Exists(orderId)) return this.oPendingOrders.Item(orderId);
    var transactions = (new VBArray(this.oTransactions.Items())).toArray();
    for (var index = 0, count = transactions.length; index < count; index++) {
        var transaction = transactions[index];
        for (var index2 = 0, count2 = transaction.orders.length; index2 < count2; index2++) {
            var order = transaction.orders[index2];
            if (order.id == orderId) return order;
        }
    }
    return null;
}

function GetOrderByAssigningOrderIdAndSubType(assigningOrderId, subType) {
    var transactions = (new VBArray(this.oTransactions.Items())).toArray();
    for (var index = 0, count = transactions.length; index < count; index++) {
        var transaction = transactions[index];
        if (transaction.subType == subType && transaction.assigningOrderId == assigningOrderId) {
            return transaction.orders[0];
        }
    }
    return null;
}

function Stop() {
    if (commandsTimerID) {
        window.clearTimeout(commandsTimerID);
        commandsTimerID = null;
    }
    if (scanTimerID) {
        window.clearTimeout(scanTimerID); 
        scanTimerID = null;
    }
    if (countTimerID) {
        window.clearTimeout(countTimerID);
        countTimerID = null;
    }
    if (updateUITimerID) {
        window.clearTimeout(updateUITimerID);
        updateUITimerID = null;
    }
}

function GetCommandsTimer() {
    if (oDealingConsole.reseting) return;

    oIOProxy.GetCommands();

    if (commandsTimerID) window.clearTimeout(commandsTimerID);
    commandsTimerID = window.setTimeout("GetCommandsTimer()", 600);
}

function QuotationCountTimer() {
    var instruments = (new VBArray(oInstruments.Items())).toArray();
    for (var index = 0, count = instruments.length; index < count; index++) {
        var instrument = instruments[index];
        instrument.QuotationCountTimer();
        instrument.SynTradingTime2(oSystemTime);
    }
}

var _ScanTimerCount2 = -1;
function CountTimer() {
    _ScanTimerCount2++;
    if (_ScanTimerCount2 >= 1) {
        _ScanTimerCount2 = 0;
        if (typeof (quotationTaskFrm) == 'undefined' || quotationTaskFrm == null) quotationTaskFrm = window.parent.quotationTaskFrm;
        if (typeof (vsflexQuotationTask) == 'undefined' || vsflexQuotationTask == null) vsflexQuotationTask = quotationTaskFrm.vsflexQuotationTask;
        vsflexQuotationTask.Redraw = false;
        quotationTaskFrm.TaskCountTimer();
        vsflexQuotationTask.Redraw = true;
    }
    if (countTimerID) window.clearTimeout(countTimerID);
    countTimerID = window.setTimeout("CountTimer()", 1000);
}

var _ScanTimerCount3 = -2;
function UpdateUITimer() {
    _ScanTimerCount3++;
    if (_ScanTimerCount3 >= 1) {
        _ScanTimerCount3 = 0;
        updateUITimerTickCount++;
        if (updateUITimerTickCount == 1 && !updateUITimerTickRunning) {
            updateUITimerTickCount = 0;
            UpdateUITimerTick();
        }
        else if (updateUITimerTickCount >= 45 && updateUITimerTickRunning) {
            updateUITimerTickRunning = false;
        }
    }

    if (updateUITimerID) window.clearTimeout(updateUITimerID);
    updateUITimerID = window.setTimeout("UpdateUITimer()", 800);
}

var _ScanTimerCount = 0;
var count0 = 0;
var count1 = 0;
//var _Count2 = 0;
var _Count3 = 0;
var saveCacherCount = 0;
var updateUITimerTickCount = 0;
function ScanTimer() {
    _ScanTimerCount++;
    if (_ScanTimerCount >= 1) {
        _ScanTimerCount = 0;

        if (oDealingConsole.reseting) return;

        oIOProxy.GetSystemTime();

        //Added by Michael on 2008-08-21
        saveCacherCount++;
        if (saveCacherCount >= 70) {
            saveCacherCount = 0;
            SaveCacher(oSystemTime);
        }

//        if (typeof (quotationTaskFrm) == 'undefined' || quotationTaskFrm == null) quotationTaskFrm = window.parent.quotationTaskFrm;
//        if (typeof (vsflexQuotationTask) == 'undefined' || vsflexQuotationTask == null) vsflexQuotationTask = quotationTaskFrm.vsflexQuotationTask;
//        vsflexQuotationTask.Redraw = false;
//        quotationTaskFrm.TaskCountTimer();
//        vsflexQuotationTask.Redraw = true;

//        vsflexQuotation.Redraw = false;
        QuotationCountTimer();
//        vsflexQuotation.Redraw = true;
        
        count0++;
        if (count0 >= 8) {
            count0 = 0;
            if (tradeDayEndTime == null) {
                return;
            }
            var endTimeValue = tradeDayEndTime.valueOf();
            var serverTimeValue = oSystemTime.valueOf();
            if (serverTimeValue >= (endTimeValue + oDealingConsole.GetRandom() * 1000) &&
			serverTimeValue <= (endTimeValue + 30000)) {
                if (oDealingConsole.reseting == false) {
                    oDealingConsole.reseting = true;
                    //Modified by Michael on 2005-08-05
                    TradeDayReset();
                    //oIOProxy.GetInitData();
                    return;
                }
            }
            else {
                oDealingConsole.reseting = false;
            }
        }

        count1++;
        if (count1 >= 13) {
            count1 = 0;

            if (vsflexOrderTask == null) vsflexOrderTask = window.parent.orderTaskFrm.vsflexOrderTask;
            vsflexOrderTask.Redraw = false;
            oDealingConsole.CheckOrdersTime();
            vsflexOrderTask.Redraw = true;
        }

//        _Count2++;
//        if (_Count2 >= 9) {
//            _Count2 = 0;

//            vsflexQuotation.Redraw = false;
//            oDealingConsole.CheckInstrumentsTradingtime();
//            vsflexQuotation.Redraw = true;
//        }

        //	count2++;
        //	if (count2 >= 15)
        //	{
        //		count2 = 0;
        //		
        //		oDealingConsole.CheckOriginInactiveTimeout();
        //	}

        oDealingConsole.EnquiryManager.DecreaseTick();
    }

//    _ScanTimerCount2++;
//    if (_ScanTimerCount2 >= 5) {
//        _ScanTimerCount2 = 0;
//        if (typeof (quotationTaskFrm) == 'undefined' || quotationTaskFrm == null) quotationTaskFrm = window.parent.quotationTaskFrm;
//        if (typeof (vsflexQuotationTask) == 'undefined' || vsflexQuotationTask == null) vsflexQuotationTask = quotationTaskFrm.vsflexQuotationTask;
//        vsflexQuotationTask.Redraw = false;
//        quotationTaskFrm.TaskCountTimer();
//        vsflexQuotationTask.Redraw = true;
//    }

//    _ScanTimerCount3++;
//    if (_ScanTimerCount3 >= 4) {
//        _ScanTimerCount3 = 0;
//        updateUITimerTickCount++;
//        if (updateUITimerTickCount == 1 && !updateUITimerTickRunning) {
//            updateUITimerTickCount = 0;
//            UpdateUITimerTick();
//        }
//        else if (updateUITimerTickCount >= 180 && updateUITimerTickRunning) {
//            updateUITimerTickRunning = false;
//        }
//    }

    if (scanTimerID) window.clearTimeout(scanTimerID);
    scanTimerID = window.setTimeout("ScanTimer()", 1000);
}

function PrintOrders(order) {
    window.open("OrderPrint.aspx?OrderCode=" + order.code, "", "scrollbars=no,status=no,help=no,resizable=yes,width=400px,height=250px");
}

function DealingConsole() {
    //Added by Michael on 2005-03-22
    this.RiskMonitorDelete = "The system has deleted the order. If you find query, please contact our Customer Service!";
    this.AccountResetFailed = "The system has failed to prepare the account for coming trade day. Please contact the system administrator";
    this.DealerCanceled = "The order has been cancelled by the Trading Desk!";
    this.RejectDQByDealer = "Price time out, please try again!";
    this.NecessaryIsNotWithinThreshold = "The trading quantity exceeds the limit allowed for the account, order was not accepted!";
    this.MarginIsNotEnough = "Account's usable margin is not sufficient, order was not accepted!";
    this.AccountIsNotTrading = "Account allowed for trading is not available, please contact our Customer Service for details!";
    this.InstrumentIsNotAccepting = "The instrument is not available for trading, please contact our Customer Service for details!";
    this.TimingIsNotAcceptable = "The order is out of the trading time accepted, order was cancelled!";
    this.OrderTypeIsNotAcceptable = "The select order type is not available for the instrument!";
    this.HasNoAccountsLocked = "The agent account has not been granted with control over the other accounts, please select appropriate accounts and try later!";
    this.IsLockedByAgent = "The account has been occupied by its Agent!";
    this.IsNotLockedByAgent = "The trading account has not been controlled by Agent!";
    this.InvalidPrice = "Price is not in a valid format, please try later!";
    this.LossExecutedOrderInOco = "The other end of the OCO has not been found!";
    this.ExceedOpenLotBalance = "Close order quantity exceeds the quantity of the open order";
    this.OneCancelOtherPrompt = "This is a cancel OCO order.";
    this.HasUnassignedOvernightOrders = "There are orders in the agent account, please assign the order to appropriate accounts!";
    this.CustomerCanceled = "The order has been cancelled by the Customer";
    this.DbOperationFailed = "Unexpected error has occured when locating the account's information";
    this.TransactionAlreadyExists = "Unexpected error has occured when locating the order";
    this.HasNoOrders = "The order does not exist";
    this.InvalidRelation = "Unexpected error has occured when locating the corresponding open order";
    this.InvalidLotBalance = "Unexpected error has occured with the open trading quantity";
    this.ExceedAssigningLotBalance = "The order has exceeded the quantity of the assigning order";
    this.OrderLotExceedMaxLot = "The order has exceeded the permitted trading quantity of the account";
    this.OpenOrderNotExists = "The corresponding open order does not exist, order cancelled.";
    this.AssigningOrderNotExists = "The assigning order does not exist any more, order cancelled";
    this.TransactionNotExists = "Unexpected error for the transaction has occured";
    this.TransactionCannotBeCanceled = "The order cannot be cancelled";
    this.TransactionCannotBeExecuted = "Unexpected error occurred, failed to executed the order";
    this.OrderCannotBeDeleted = "The order cannot be cancelled";
    this.IsNotAccountOwner = "User is not authorized to trade for the account";
    this.InvalidOrderRelation = "The system fails to execute the order due to the missing of open order";
    this.TradePolicyIsNotActive = "The trading policy for the account has been inactivated, please contact our Customer Service for details!";
    this.SetPriceTooCloseToMarket = "The order was rejected because being too close to the market!";
    this.HasNoQuotationExists = "There is no price available for the execution, please try again";
    this.AccountIsInAlerting = "The Account is in margin call position, the order was rejected";

    this.EnquiryManager = new EnquiryManager(this);

    this.mainWindow = null;
    this.RedirectCount = 0;
    this.LotDecimal = 2.00;
    this.LanguageString = "en";

    this.CloseAllEnquiryWindow = function () {
        if (this.EnquiryManager != null) {
            this.EnquiryManager.enquiryWindowManager.CloseAllWindow();
        }
    };

    this.InitApp = function (window) {

        /*simulator data
        for(var i=0,count=10;i<count;i++)
        {
        var customer = new Customer(i.toString());
        customer.code = "Customer" + i.toString();
        customer.privateQuotePolicyID = i.toString();
        customer.publicQuotePolicyID = i.toString();
        oCustomers.Add(i.toString(), customer);
			
        var account = new Account(i.toString());
        account.code = "Account" + i.toString();
        account.customerID = i.toString();
        oAccounts.Add(i.toString(), account);
        }
		
        for(var i=0,count=10;i<count;i++)
        {
        var quotePolicy = new QuotePolicy(i.toString());
        quotePolicy.code = "QuotePolicy" + i.toString();
        quotePolicy.description = "description" + i.toString();
        quotePolicy.isDefault = false;
			
        oQuotePolicys.Add(i.toString(), quotePolicy);
			
        for(var j=i; j<10; j++)
        {
        var quotePolicyDetail = new QuotePolicyDetail(j.toString());
        quotePolicyDetail.quotePolicyID = i.toString();
        quotePolicyDetail.code = quotePolicy.code;
        quotePolicyDetail.description = quotePolicy.description;
        quotePolicyDetail.isDefault = quotePolicy.isDefault;
        quotePolicyDetail.priceType = PriceType.Deal;
        quotePolicyDetail.autoAdjustPoints = 4+i+j;
        quotePolicyDetail.spreadPoints = 5+i+j;
        quotePolicyDetail.isOriginHiLo = true;
        quotePolicy.quotePolicyDetails.Add(j.toString(), quotePolicyDetail);
        }
        }
		
        for(var l=1; l<5; l++)
        {
        var instrument = new Instrument(l.toString());
        instrument.mainWindow = window;
        oInstruments.Add(l.toString(), instrument);
        instrument.code = "Instrument" + l.toString();
        instrument.originType = OriginType.Ask;
        instrument.numeratorUnit = 1;
        instrument.denominator = 100;

        AddInstrumentToGrid(instrument,true);
			
        instrument.SyncQuotePolicyDetails( oQuotePolicys );
        instrument.SyncTradePolicyDetails( oTradePolicys );
			
        }
		
        oCurrentQuotePolicyDetailID = "0";
        OnQuotePolicyChanged(oCurrentQuotePolicyDetailID);
        */
        this.mainWindow = window;
        //        window.mainUIReadyCheckTimeOutCheckTimes = 0;
        //this.MainUIReadyCheck(this.mainWindow);
        window.MainUIReadyCheck();

        //        oIOProxy.mainWindow = window;

        //        //useService function must call only once
        //        //Service.useService("Service.asmx?WSDL","SrvTest");

        //        //var oIOProxy2 = this.mainWindow.oIOProxy;
        //        oIOProxy.Url = "Service.asmx?WSDL";
        //        //var serviceWsdl = window.parent.quotationFrm.window.document.all.ServiceWsdl;
        //        //oIOProxy2.Initialize2(serviceWsdl);
        //        oIOProxy.Initialize();


        //        oIOProxy.GetSystemTime();
    };

    this.ScheduleStart = function () {
        this.reseting = false;

        if (this.started)
            return;
        else
            this.started = true;

        Run();

        //this.mainWindow.oScheduler.AddSchedule(this, "Run", null, false, null, null, null, 500);

        //simulated data
        //this.mainWindow.oScheduler.AddSchedule(this, "QuationFeed", null, false, null, null, null, 200);
        //this.mainWindow.oScheduler.AddSchedule(this, "EnquiryFeed", null, false, null, null, null, 10000);
        //this.mainWindow.oScheduler.AddSchedule(this, "OrderFeed", null, false, null, null, null, 5000);
        //this.mainWindow.oScheduler.AddSchedule(this, "CheckOrdersTime", null, false, null, null, null, 1000);
    };

    this.GetRandom = function () {
        var randomValue = parseInt((Math.random() * 100 + 30) / 3);
        if (randomValue > 30) {
            randomValue = this.GetRandom();
            return (randomValue);
        }
        return (randomValue);
    };

    this.CanModifyDealerParameter = function (parameterName) {
        //exclude fields:
        var parameterNameLower = parameterName.toLowerCase();
        if (parameterNameLower == "IsAutoEnablePrice".toLowerCase()
            || parameterNameLower == "IsAutoFill".toLowerCase()
            || parameterNameLower == "IsPriceEnabled".toLowerCase()
            || parameterNameLower == "High".toLowerCase()
            || parameterNameLower == "Low".toLowerCase()) {
            return true;
        }

        if (oDealerParameterGroupDetails.Count <= 0) return true;
        return !oDealerParameterGroupDetails.Exists(parameterName);
    };

//    //unused
//    this.UpdateOrder = function () {
//        var sendOrders = new Array();
//        var orders = (new VBArray(this.mainWindow.oPendingOrders.Items())).toArray();
//        for (var index = 0, count = orders.length; index < count; index++) {
//            if ((orders[index].tran.orderType == OrderType.Limit ||
//				orders[index].tran.orderType == OrderType.Market) &&
//				orders[index].status == OrderStatus.WaitNextPrice) {
//                sendOrders.push(orders[index].id, orders[index].hitCount, (orders[index].bestPrice == null) ? "" : orders[index].bestPrice.ToString(), Date2String(orders[index].bestTime));
//            }
//        }

//        if (sendOrders.length) {
//            oIOProxy.UpdateOrder(sendOrders);
//        }
//    };

    //    this.CheckOriginInactiveTimeout = function() {
    //        var vsflexQuotation = this.mainWindow.vsflexQuotation;
    //        vsflexQuotation.Redraw = false;
    //        var instruments = (new VBArray(this.mainWindow.oInstruments.Items())).toArray();
    //        for (var index = 0, count = instruments.length; index < count; index++) {
    //            instruments[index].OriginInactiveTimeout();
    //        }
    //        vsflexQuotation.Redraw = true;
    //    };

//    this.CheckInstrumentsTradingtime = function () {
//        //use server's time
//        var now = this.mainWindow.oSystemTime; //new Date();

//        var instruments = (new VBArray(this.mainWindow.oInstruments.Items())).toArray();
//        for (var index = 0, count = instruments.length; index < count; index++) {
//            instruments[index].SynTradingTime2(now);
//        }
//    };

    this.CheckOrdersTime = function () {
        //use server's time
        var now = this.mainWindow.oSystemTime; //new Date();

        var orders = (new VBArray(this.mainWindow.oPendingOrders.Items())).toArray();
        for (var index = 0, count = orders.length; index < count; index++) {
            if (typeof (orders[index]) == 'undefined' || orders[index] == null) continue;

            orders[index].CheckTimeOut(now);
            orders[index].CheckTimeArrive(now);
        }

        var orders = (new VBArray(this.mainWindow.oDeformityOrders.Items())).toArray();
        for (var index = 0, count = orders.length; index < count; index++) {
            orders[index].CheckTimeOut(now);
        }
    };

    //Added by Michael on 2008-05-28
    this.BatchSetSourceInstrument = function (callWin, source) {
        var msXml = new ActiveXObject("MSXML.DOMDocument");
        var topNode = msXml.createElement("SourceInstruments");
        msXml.appendChild(topNode);

        var sourceInstruments = (new VBArray(oSourceInstruments.Items())).toArray();
        for (var i = 0; i < sourceInstruments.length; i++) {
            var sourceInstrument = sourceInstruments[i];

            var tempNode = msXml.createElement("SourceInstrument");    //+rowIndex); 
            tempNode.setAttribute("Code", sourceInstrument.Get_Code());
            tempNode.setAttribute("Sources", sourceInstrument.Get_Sources());
            tempNode.setAttribute("ActiveSource", source);
            tempNode.setAttribute("Source1AdjustedPips", sourceInstrument.Get_Source1AdjustedPips());
            tempNode.setAttribute("Source2AdjustedPips", sourceInstrument.Get_Source2AdjustedPips());
            tempNode.setAttribute("Source3AdjustedPips", sourceInstrument.Get_Source3AdjustedPips());
            tempNode.setAttribute("Source4AdjustedPips", sourceInstrument.Get_Source4AdjustedPips());
            tempNode.setAttribute("Source5AdjustedPips", sourceInstrument.Get_Source5AdjustedPips());
            tempNode.setAttribute("NumeratorUnit", sourceInstrument.Get_NumeratorUnit());
            tempNode.setAttribute("Denominator", sourceInstrument.Get_Denominator());
            topNode.appendChild(tempNode);
        }

        var sourceInstrumentXml = topNode.xml;
        msXml = null;

        if (sourceInstrumentXml != "") {
            var sourceXml = new ActiveXObject("MSXML.DOMDocument");
            var sourceTopNode = sourceXml.createElement("EventMessages");
            sourceXml.appendChild(sourceTopNode);
            var sourceNode = sourceXml.createElement("EventMessage");
            sourceNode.setAttribute("ObjectIDs", "SourceChange");
            sourceNode.setAttribute("EventMessage", "Price Source = " + source);
            sourceNode.setAttribute("TransactionCode", "");
            sourceTopNode.appendChild(sourceNode);

            oIOProxy.SetActiveSourceInstrument(sourceInstrumentXml, sourceTopNode.xml);
        }
    };

    //Added by Michael on 2008-05-26
    this.GetSourceInstrumentResult = function (dataSet) {
        oSourceInstruments.RemoveAll();
        if (!dataSet) return;
        if (dataSet.Tables.Count <= 0) return;

        var table = dataSet.Tables(0);
        for (var index = 0; table && index < table.Rows.Count; index++) {
            var row = table.Rows(index);
            var code = row("Code");
            //if(!oSourceInstruments.Exists(code))
            {
                var sourceInstrument = new SourceInstrument();
                sourceInstrument.UpdateByDataRow(row);

                oSourceInstruments.Item(code) = sourceInstrument;
            }
        }
    };

    //----------------------------------------------------------------------------------
    this.SettingGridLanguage = function (obj, languageXml, gridNodeName, isDeletedNode) {
        var xmlNodeTable = languageXml.getElementsByTagName(gridNodeName)[0];
        if (xmlNodeTable == null) return languageXml;

        for (prop in obj) {
            if (obj[prop] == "") continue;
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[i];
                var key = xmlNodeRow.getAttribute("key");
                if (key == prop) {
                    var caption = xmlNodeRow.getAttribute("value");
                    obj[prop] = caption;
                    if (isDeletedNode) {
                        xmlNodeTable.removeChild(xmlNodeRow);
                    }
                    break;
                }
            }
        }
        if (isDeletedNode) {
            languageXml.removeChild(xmlNodeTable);
        }
        return languageXml;
    };
    //Add by Erric
    this.InitLanguageXml = function (xmlData) {

        var languageXml = xmlData.getElementsByTagName("Languages")[0];
        if (languageXml == null) return;

        languageXml = this.SettingGridLanguage(instrumentPropertyLanguage, languageXml, "InstrumentPropertyGrid", true);
        languageXml = this.SettingGridLanguage(instrumentLanguage, languageXml, "QuotationGrid", true);
        for (var prop in instrumentPropertyLanguage) {
            instrumentLanguage[prop] = instrumentPropertyLanguage[prop];
        }
        languageXml = this.SettingGridLanguage(optionGridLanguage, languageXml, "OptionGrid", true);
        languageXml = this.SettingGridLanguage(quotationTaskGridLanguage, languageXml, "QuotationTaskGrid", true);
        languageXml = this.SettingGridLanguage(quotePolicyGridLanguage, languageXml, "QuotePolicyGrid");
        languageXml = this.SettingGridLanguage(sourceLevelAdjustmentGridLanguage, languageXml, "SourceLevelAdjustmentGrid", true);
        languageXml = this.SettingGridLanguage(orderGridLanguage, languageXml, "OrderGrid", true);
        languageXml = this.SettingGridLanguage(historyGridLanguage, languageXml, "HistoryGrid", true);
        languageXml = this.SettingGridLanguage(searchGridLanguage, languageXml, "SearchGrid", false);
        languageXml = this.SettingGridLanguage(searchGridLanguageForCancelledOrder, languageXml, "SearchGrid", true);
        languageXml = this.SettingGridLanguage(interestGridLanguage, languageXml, "InterestGrid", true);
        languageXml = this.SettingGridLanguage(groupNetPositionGridLanguage, languageXml, "GroupNetPositionGrid", true);
        languageXml = this.SettingGridLanguage(interestSummaryGridLanguage, languageXml, "InterestSummaryGrid", true);
        languageXml = this.SettingGridLanguage(executeOrderSummaryGridLanguage, languageXml, "ExecuteOrderSummaryGrid", true);
        languageXml = this.SettingGridLanguage(instantOrderListGridLanguage, languageXml, "InstantOrderListGrid", true);
        languageXml = this.SettingGridLanguage(executedGridLanguage, languageXml, "ExecutedGrid", true);
        languageXml = this.SettingGridLanguage(unclosedOrderGridLanguage, languageXml, "UnclosedOrderGrid", true);
        languageXml = this.SettingGridLanguage(orderPrintGridLanguage, languageXml, "OrderPrintGrid", true);
        languageXml = this.SettingGridLanguage(dealingPolicyDetailGridLanguage, languageXml, "DealingPolicyDetailGrid", true);
        languageXml = this.SettingGridLanguage(customerPolicyManagementGridLanguage, languageXml, "CustomerPolicyManagementGrid", true);
        languageXml = this.SettingGridLanguage(blotterSelectionGridLanguage, languageXml, "BlotterSelectionGrid", true);
        languageXml = this.SettingGridLanguage(limitProcessGridLanguage, languageXml, "LimitProcessGrid", true);
        languageXml = this.SettingGridLanguage(commonLanguage, languageXml, "Common", true);
        languageXml = this.SettingGridLanguage(messageLanguage, languageXml, "Message", true);
        languageXml = this.SettingGridLanguage(comboListLanguage, languageXml, "ComboList", true);
        
    };
    this.InitCommandInfo = function (xmlData) {
        var commandInfo = new Object();
        commandInfo.commandSequence = 0;
        commandInfo.userID = null;

        var xmlNodeTable = xmlData.getElementsByTagName("CommandInfos")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                commandInfo.commandSequence = XmlConvert.ToInt32(xmlNodeRow.getAttribute("CommandSequence"));
                commandInfo.userID = xmlNodeRow.getAttribute("UserID");

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
        return commandInfo;
    };

    this.InitSourceInstrument = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("SourceInstruments")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var sourceInstrument = new SourceInstrument();
                sourceInstrument.UpdateByXmlRowAttribute(xmlNodeRow);
                oSourceInstruments.Item(sourceInstrument._Code) = sourceInstrument;

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }        
    };

    this.InitSettings = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("Settingss")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var objectID = xmlNodeRow.getAttribute("ObjectID");
                var parameter = xmlNodeRow.getAttribute("Parameter");
                var parameter2 = this.GetField(parameter, "");
                if (settings.Exists(objectID)) {
                    settings.Item(objectID).Parameter = parameter2;
                }
                else {
                    settings.Item(objectID) = new Setting(objectID, parameter2);
                }

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitSystemParameter = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("SystemParameters")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                IsCustomerVisibleToDealer = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("IsCustomerVisibleToDealer"));
                CanDealerViewAccountInfo = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("CanDealerViewAccountInfo"));
                MooMocAcceptDuration = XmlConvert.ToInt32(xmlNodeRow.getAttribute("MooMocAcceptDuration"));
                MooMocCancelDuration = XmlConvert.ToInt32(xmlNodeRow.getAttribute("MooMocCancelDuration"));
                QuotePolicyDetailID = xmlNodeRow.getAttribute("QuotePolicyDetailID");
                LotDecimal = XmlConvert.ToInt32(xmlNodeRow.getAttribute("LotDecimal"));
                this.LotDecimal = LotDecimal;

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitTradeDay = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("TradeDays")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                currentTradeDay = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("TradeDay"));
                tradeDayBeginTime = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("BeginTime"));
                tradeDayEndTime = XmlConvert.ToDateTime(xmlNodeRow.getAttribute("EndTime"));
                
                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitDealerParameterGroupDetail = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("DealerParameterGroupDetails")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var name = xmlNodeRow.getAttribute("Name");
                var id = xmlNodeRow.getAttribute("ID");
                if (!oDealerParameterGroupDetails.Exists(name)) {
                    var dealerParameterGroupDetail = new DealerParameterGroupDetail(id, name);
                    oDealerParameterGroupDetails.Item(name) = dealerParameterGroupDetail;
                }
                
                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitCustomer = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("Customers")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var id = xmlNodeRow.getAttribute("ID");
                var customer = new Customer(id);
                customer.UpdateByXmlRowAttribute(xmlNodeRow);
                oCustomers.Item(id) = customer;

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitAccountGroup = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("AccountGroups")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var accountGroup = new Group();
                accountGroup.UpdateByXmlRowAttribute(xmlNodeRow);
                oAccountGroups.Item(accountGroup.id) = accountGroup;

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitAccount = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("Accounts")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var id = xmlNodeRow.getAttribute("ID");
                var account = new Account(id);
                account.UpdateByXmlRowAttribute(xmlNodeRow);
                oAccounts.Item(id) = account;

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitQuotePolicy = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("QuotePolicys")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var id = xmlNodeRow.getAttribute("ID");
                var quotePolicy = new QuotePolicy(id);
                quotePolicy.UpdateByXmlRowAttribute(xmlNodeRow);
                oQuotePolicys.Item(id) = quotePolicy;
                if (oCurrentQuotePolicyDetailID == -1)
                    oCurrentQuotePolicyDetailID = id;

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitQuotePolicyDetail = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("QuotePolicyDetails")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var instrumentID = xmlNodeRow.getAttribute("InstrumentID");
                var quotePolicyDetail = new QuotePolicyDetail(instrumentID);
                quotePolicyDetail.UpdateByXmlRowAttribute(xmlNodeRow);
                if (oQuotePolicys.Exists(quotePolicyDetail.quotePolicyID)) {
                    var quotePolicy = oQuotePolicys.Item(quotePolicyDetail.quotePolicyID);
                    quotePolicyDetail.code = quotePolicy.code;
                    quotePolicyDetail.description = quotePolicy.description;
                    quotePolicyDetail.isDefault = quotePolicy.isDefault;
                    quotePolicy.quotePolicyDetails.Item(instrumentID) = quotePolicyDetail;
                }

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };
    
    this.InitTradePolicy = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("TradePolicys")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var id = xmlNodeRow.getAttribute("ID");
                var tradePolicy = new TradePolicy(id);
                tradePolicy.UpdateByXmlRowAttribute(xmlNodeRow);
                oTradePolicys.Item(id) = tradePolicy;

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitTradePolicyDetail = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("TradePolicyDetails")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var instrumentID = xmlNodeRow.getAttribute("InstrumentID");
                var tradePolicyDetail = new TradePolicyDetail(instrumentID);
                tradePolicyDetail.UpdateByXmlRowAttribute(xmlNodeRow);
                if (oTradePolicys.Exists(tradePolicyDetail.tradePolicyID)) {
                    var tradePolicy = oTradePolicys.Item(tradePolicyDetail.tradePolicyID);
                    tradePolicy.tradePolicyDetails.Item(instrumentID) = tradePolicyDetail;
                }

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitInstrument = function (xmlData) {
        var pendingInstruments = new ActiveXObject("Scripting.Dictionary"); //key=id value=Instrument
        var xmlNodeTable = xmlData.getElementsByTagName("Instruments")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var id = xmlNodeRow.getAttribute("ID");
                var instrument = new Instrument(id, this.mainWindow);
                instrument.UpdateByXmlRowAttribute(xmlNodeRow);
                instrument.tradeTimes.RemoveAll();
                instrument.quotePolicyDetails.RemoveAll();
                instrument.tradePolicyDetails.RemoveAll();
                var parameter = "";
                if (settings.Exists(id)) {
                    parameter = settings.Item(id).Parameter;
                }
                instrument._LimitParameter.SetParameter(parameter);
                instrument.lastQuotation = new Quotation();
                pendingInstruments.Add(id, instrument);

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }

        var quotePolicys = (new VBArray(oQuotePolicys.Items())).toArray();
        for (var index1 = 0, count1 = quotePolicys.length; index1 < count1; index1++) {
            var quotePolicy = quotePolicys[index1];
            var quotePolicyDetails = (new VBArray(quotePolicy.quotePolicyDetails.Items())).toArray();
            for (var index2 = 0, count2 = quotePolicyDetails.length; index2 < count2; index2++) {
                var quotePolicyDetail = quotePolicyDetails[index2];
                if (pendingInstruments.Exists(quotePolicyDetail.instrumentID)) {
                    var instrument = pendingInstruments.Item(quotePolicyDetail.instrumentID);
                    instrument.quotePolicyDetails.Add(quotePolicyDetail.quotePolicyID, quotePolicyDetail);
                    if (quotePolicy.isDefault) instrument.defaultQuotePolicyID = quotePolicy.id;
                }
            }
        }

        var tradePolicys = (new VBArray(oTradePolicys.Items())).toArray();   // Get the items.
        for (var index1 = 0, count1 = tradePolicys.length; index1 < count1; index1++) {
            var tradePolicy = tradePolicys[index1];
            var tradePolicyDetails = (new VBArray(tradePolicy.tradePolicyDetails.Items())).toArray();
            for (var index2 = 0, count2 = tradePolicyDetails.length; index2 < count2; index2++) {
                var tradePolicyDetail = tradePolicyDetails[index2];
                if (pendingInstruments.Exists(tradePolicyDetail.instrumentID)) {
                    var instrument = pendingInstruments.Item(tradePolicyDetail.instrumentID);
                    instrument.tradePolicyDetails.Add(tradePolicyDetail.tradePolicyID, tradePolicyDetail);
                }
            }
        }

        var quotationFrm = this.mainWindow.parent.quotationFrm;
        var rowHeight = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.QuotationGrid);
        var pendingInstruments2 = (new VBArray(pendingInstruments.Items())).toArray();
        for (var index = 0, count = pendingInstruments2.length; index < count; index++) {
            var instrument = pendingInstruments2[index];
            var id = instrument.id;
            if (!oInstruments.Exists(id)) {
                this.mainWindow.AddInstrumentToGrid(instrument, false, quotationFrm, rowHeight);
            }

            oInstruments.Item(id) = instrument;

            if (!oInstrumentList.Exists(id)) {
                this.InstrumentListAddItem(id, oInstrumentList.Count, instrument.code, instrument.originCode);
            }
        }

        return pendingInstruments;
    };

    this.InitTradingTime = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("TradingTimes")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var tradeTime = new TradeTime();
                tradeTime.UpdateByXmlRowAttribute(xmlNodeRow);
                if (oInstruments.Exists(tradeTime.instrumentID)) {
                    var instrument = oInstruments.Item(tradeTime.instrumentID);
                    instrument.tradeTimes.Item(tradeTime.beginTime) = tradeTime;
                }

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitOriginQuotation = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("OriginQuotations")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var instrumentID = xmlNodeRow.getAttribute("InstrumentID");
                var instrument = this.mainWindow.oInstruments.Item(instrumentID);
                var quotation = ObjectPool.GetQuotation();
                quotation.Parse3(instrument, xmlNodeRow);
                instrument.SetOriginQuotation(quotation);

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitOverridedQuotation = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("OverridedQuotations")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var instrumentID = xmlNodeRow.getAttribute("InstrumentID");
                var instrument = this.mainWindow.oInstruments.Item(instrumentID);
                var quotation = ObjectPool.GetQuotation();
                quotation.Parse3(instrument, xmlNodeRow);

                var instrument = this.mainWindow.oInstruments.Item(instrumentID);
                var quotation = ObjectPool.GetQuotation();
                quotation.Parse3(instrument, xmlNodeRow);
                instrument.SetOverridedQuotation(quotation);

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitOrder = function (xmlData) {
        var transactions = new ActiveXObject("Scripting.Dictionary");
        var xmlNodeTable = xmlData.getElementsByTagName("Orders")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var tranID = xmlNodeRow.getAttribute("TransactionID");
                var tran;
                var transactions2 = this.mainWindow.oTransactions;
                if (transactions2.Exists(tranID))
                    tran = transactions2.Item(tranID);
                else {
                    tran = new Transaction(tranID);
                    transactions2.Add(tranID, tran);
                }
                tran.UpdateByXmlRowAttribute(xmlNodeRow);
                transactions.Item(tran.id) = tran;
                var id = xmlNodeRow.getAttribute("ID");
                var order = null;
                switch (tran.orderType) {
                    case OrderType.SpotTrade:
                        order = new DQOrder(id);
                        break;
                    case OrderType.Limit:
                        order = new LMTOrder(id);
                        break;
                    case OrderType.Market:
                        order = new MKTOrder(id);
                        break;
                    case OrderType.MarketOnOpen:
                        order = new MOOOrder(id);
                        break;
                    case OrderType.MarketOnClose:
                        order = new MOCOrder(id);
                        break;
                    case OrderType.Risk:
                        order = new Order(id);
                        break;
                }
                if (order) {
                    order.mainWindow = this.mainWindow;
                    order.tran = tran;
                    tran.orders.push(order);

                    order.UpdateByXmlRowAttribute(xmlNodeRow);
                }

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
        return transactions;
    };

    this.InitOrderRelation = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("OrderRelations")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                var openOrderId = xmlNodeRow.getAttribute("OpenOrderId");
                var closeOrderId = xmlNodeRow.getAttribute("CloseOrderId");
                var closeIds = null;
                if (!this.mainWindow.oOpenIdToCloseId.Exists(openOrderId)) {
                    closeIds = new ActiveXObject("Scripting.Dictionary");
                    this.mainWindow.oOpenIdToCloseId.Add(openOrderId, closeIds);
                }
                else {
                    closeIds = this.mainWindow.oOpenIdToCloseId.Item(openOrderId);
                }
                if (!closeIds.Exists(closeOrderId)) closeIds.Add(closeOrderId, null);
                if (!this.mainWindow.oCloseIdToOpenId.Exists(closeOrderId)) this.mainWindow.oCloseIdToOpenId.Add(closeOrderId, openOrderId);

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };

    this.InitAppendParameters = function (xmlData) {
        var xmlNodeTable = xmlData.getElementsByTagName("AppendParameterss")[0];
        if (xmlNodeTable != null) {
            var xmlRows = xmlNodeTable.childNodes;
            for (var i = 0, length = xmlRows.length; i < length; i++) {
                var xmlNodeRow = xmlRows[0];

                this.ConfirmRejectDQOrder = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("ConfirmRejectDQOrder"));
                this.AllowModifyOrderLot = XmlConvert.ToBoolean(xmlNodeRow.getAttribute("AllowModifyOrderLot"));

                xmlNodeTable.removeChild(xmlNodeRow);
            }
            xmlData.removeChild(xmlNodeTable);
        }
    };


    this.InitData_Xml = function (xmlData, isInitUi) {
        this.LanguageString = xmlData.getAttribute("Language");
        var commandInfo = new Object();
        commandInfo.commandSequence = 0;
        commandInfo.userID = null;
        quotationTaskFrm = window.parent.quotationTaskFrm;
        vsflexQuotationTask = quotationTaskFrm.vsflexQuotationTask;
        vsflexOrderTask = this.mainWindow.parent.orderTaskFrm.vsflexOrderTask;

        vsflexQuotation.Redraw = false;
        vsflexQuotationTask.Redraw = false;
        vsflexOrderTask.Redraw = false;

        var xmlNodeTable;
        //Add by Erric

        this.InitLanguageXml(xmlData);


        commandInfo = this.InitCommandInfo(xmlData);
        this.InitSourceInstrument(xmlData);
        if (window.parent.toolBarFrm) {
            window.parent.toolBarFrm.FillSelectPriceSource();
        }
        this.InitSettings(xmlData);
        if (isInitUi) this.ApplySettings();
        this.InitSystemParameter(xmlData);
        this.InitTradeDay(xmlData);
        this.InitDealerParameterGroupDetail(xmlData);
        this.InitCustomer(xmlData);
        this.InitAccountGroup(xmlData);
        this.InitAccount(xmlData);
        oCurrentQuotePolicyDetailID = -1;
        this.InitQuotePolicy(xmlData);
        this.InitQuotePolicyDetail(xmlData);
        this.InitTradePolicy(xmlData);
        this.InitTradePolicyDetail(xmlData);
        var pendingInstruments = this.InitInstrument(xmlData);
        this.mainWindow.parent.orderTaskFrm.FillInstrumentSelect();
        //        this.mainWindow.parent.SourceLevelAdjustmentFrm.FillSourceLevelAdjustmentGrid();
        var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
        instantOrderByInstrumentIFrame._InstantOrderListFrame1.RefreshInstrumentComboData();
        instantOrderByInstrumentIFrame._InstantOrderListFrame2.RefreshInstrumentComboData();
        instantOrderByInstrumentIFrame._InstantOrderListFrame3.RefreshInstrumentComboData();
        instantOrderByInstrumentIFrame._InstantOrderListFrame4.RefreshInstrumentComboData();
        this.InitTradingTime(xmlData);
        var now = this.mainWindow.oSystemTime;
        var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
        var instruments = (new VBArray(pendingInstruments.Items())).toArray();
        for (var index = 0, count = instruments.length; index < count; index++) {
            var instrument = instruments[index];
            instrument.SynTradingTime2(now);
            this.mainWindow.OnQuotationPropertiesChanged(instrument, isInitUi);
            if (oCurrentInstrumentID == instrument.id) {
                this.mainWindow.OnPropertyInstrumentChanged(instrument);
                this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
            }
        }
        this.InitOriginQuotation(xmlData);
        this.InitOverridedQuotation(xmlData);
        var transactions = this.InitOrder(xmlData);
        this.InitOrderRelation(xmlData);
        var trans = (new VBArray(transactions.Items())).toArray();
        for (var index = 0, count = trans.length; index < count; index++) {
            var tran = trans[index];
            tran.Begin();
            var phase = tran.phase;
            var orderType = tran.orderType;
            //            for (var index2 in tran.orders) {
            for (var index2 = 0, count2 = tran.orders.length; index2 < count2; index2++) {
                var order = tran.orders[index2];
                if (orderType == OrderType.Limit || orderType == OrderType.Market || orderType == OrderType.SpotTrade) {
                    order.Hit2(false);
                }
            }
        }
        if (isInitUi) {
            this.InitAppendParameters(xmlData);
        }
        if (window.parent.toolBarFrm) window.parent.toolBarFrm.QuotePolicySelectInit();

        vsflexQuotation.Redraw = true;
        vsflexQuotationTask.Redraw = true;
        vsflexOrderTask.Redraw = true;

        return commandInfo;
    };

//    this.InitData = function (dataSet, isInitUi) {
//        if (!dataSet) return;

//        quotationTaskFrm = window.parent.quotationTaskFrm;
//        vsflexQuotationTask = quotationTaskFrm.vsflexQuotationTask;
//        vsflexOrderTask = this.mainWindow.parent.orderTaskFrm.vsflexOrderTask;

//        vsflexQuotation.Redraw = false;
//        vsflexQuotationTask.Redraw = false;
//        vsflexOrderTask.Redraw = false;

//        //Added by Michael on 2008-05-23
//        //SourceInstruments
//        var table = dataSet.Tables("SourceInstrument");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var code = row("Code");
//            if (!oSourceInstruments.Exists(code)) {
//                var sourceInstrument = new SourceInstrument();
//                sourceInstrument.UpdateByDataRow(row);

//                oSourceInstruments.Item(code) = sourceInstrument;
//            }
//        }
//        if (window.parent.toolBarFrm) {
//            window.parent.toolBarFrm.FillSelectPriceSource();
//        }

//        //Settings
//        var table = dataSet.Tables("Settings");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var id = row("ObjectID");
//            if (settings.Exists(id) == true) {
//                settings.Item(id).Parameter = this.GetField(row("Parameter"), "");
//            }
//            else {
//                settings.Item(id) = new Setting(id, this.GetField(row("Parameter"), ""));
//            }
//        }

//        if (isInitUi) this.ApplySettings();

//        //Modified by Michael on 2008-05-26
//        /*
//        var table = dataSet.Tables("QuotationSource");
//        for(var index=0; table && index<table.Rows.Count; index++)
//        {
//        var row = table.Rows(index);
//        var quotationSource = new QuotationSource(row("SourceName"));
//        quotationSource.UpdateByDataRow(row);
//			
//        oQuotationSources.Item(quotationSource.SourceName) = quotationSource;
//        }
//        */

//        var table = dataSet.Tables("SystemParameter");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            IsCustomerVisibleToDealer = row("IsCustomerVisibleToDealer");
//            CanDealerViewAccountInfo = row("CanDealerViewAccountInfo");
//            MooMocAcceptDuration = row("MooMocAcceptDuration");
//            MooMocCancelDuration = row("MooMocCancelDuration");
//            QuotePolicyDetailID = row("QuotePolicyDetailID");
//            LotDecimal = row("LotDecimal");
//            this.LotDecimal = row("LotDecimal");
//            break;
//        }

//        var table = dataSet.Tables("TradeDay");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            currentTradeDay = row("TradeDay");
//            tradeDayBeginTime = row("BeginTime");
//            tradeDayEndTime = new Date(row("EndTime"));
//        }

//        var table = dataSet.Tables("DealerParameterGroupDetail");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);

//            if (!oDealerParameterGroupDetails.Exists(row("name"))) {
//                var dealerParameterGroupDetail = new DealerParameterGroupDetail(row("id"), row("name"));

//                oDealerParameterGroupDetails.Item(dealerParameterGroupDetail.name) = dealerParameterGroupDetail;
//            }
//        }

//        var table = dataSet.Tables("Customer");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);

//            if (!oCustomers.Exists(row("id"))) {
//                var customer = new Customer(row("id"));
//                customer.UpdateByDataRow(row);

//                oCustomers.Item(customer.id) = customer;
//            }
//        }

//        var table = dataSet.Tables("AccountGroup");
//        for (var index = 0, iCount = (table ? table.Rows.Count : 0); index < iCount; index++) {
//            var row = table.Rows(index);
//            var accountGroup = new Group();
//            accountGroup.UpdateByDataRow(row);
//            oAccountGroups.Item(accountGroup.id) = accountGroup;
//        }

//        var table = dataSet.Tables("Account");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            if (!oAccounts.Exists(row("id"))) {
//                var account = new Account(row("id"));
//                account.UpdateByDataRow(row);

//                oAccounts.Item(account.id) = account;
//            }
//        }

//        oCurrentQuotePolicyDetailID = -1;
//        var table = dataSet.Tables("QuotePolicy");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var quotePolicy = new QuotePolicy(row("id"));
//            quotePolicy.UpdateByDataRow(row);

//            oQuotePolicys.Item(quotePolicy.id) = quotePolicy;
//            if (oCurrentQuotePolicyDetailID == -1)
//                oCurrentQuotePolicyDetailID = quotePolicy.id;
//        }

//        var table = dataSet.Tables("QuotePolicyDetail");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var quotePolicyDetail = new QuotePolicyDetail(row("instrumentID"));
//            quotePolicyDetail.UpdateByDataRow(row);

//            if (oQuotePolicys.Exists(quotePolicyDetail.quotePolicyID)) {
//                var quotePolicy = oQuotePolicys.Item(quotePolicyDetail.quotePolicyID);

//                quotePolicyDetail.code = quotePolicy.code;
//                quotePolicyDetail.description = quotePolicy.description;
//                quotePolicyDetail.isDefault = quotePolicy.isDefault;

//                quotePolicy.quotePolicyDetails.Item(quotePolicyDetail.instrumentID) = quotePolicyDetail;
//            }
//        }

//        var table = dataSet.Tables("TradePolicy");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var tradePolicy = new TradePolicy(row("id"));
//            tradePolicy.UpdateByDataRow(row);

//            oTradePolicys.Item(tradePolicy.id) = tradePolicy;
//        }

//        var table = dataSet.Tables("TradePolicyDetail");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var tradePolicyDetail = new TradePolicyDetail(row("instrumentID"));
//            tradePolicyDetail.UpdateByDataRow(row);
//            if (oTradePolicys.Exists(tradePolicyDetail.tradePolicyID)) {
//                var tradePolicy = oTradePolicys.Item(tradePolicyDetail.tradePolicyID);

//                tradePolicy.tradePolicyDetails.Item(tradePolicyDetail.instrumentID) = tradePolicyDetail;
//            }
//        }

//        this.mainWindow.vsflexQuotation.Redraw = false;
//        var table = dataSet.Tables("Instrument");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var instrument = new Instrument(row("id"));
//            instrument.UpdateByDataRow(row);

//            instrument.tradeTimes.RemoveAll();
//            instrument.SyncQuotePolicyDetails(oQuotePolicys);
//            instrument.SyncTradePolicyDetails(oTradePolicys);
//            instrument.mainWindow = this.mainWindow;

//            instrument.lastQuotation = new Quotation();

//            if (!oInstruments.Exists(instrument.id))
//                this.mainWindow.AddInstrumentToGrid(instrument, false);

//            oInstruments.Item(instrument.id) = instrument;

//            if (!oInstrumentList.Exists(instrument.id)) {
//                this.InstrumentListAddItem(instrument.id, oInstrumentList.Count, instrument.code, instrument.originCode);
//            }
//        }
//        this.mainWindow.vsflexQuotation.Redraw = true;
//        this.mainWindow.parent.orderTaskFrm.FillInstrumentSelect();
//        //        this.mainWindow.parent.SourceLevelAdjustmentFrm.FillSourceLevelAdjustmentGrid();
//        var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
//        instantOrderByInstrumentIFrame._InstantOrderListFrame1.RefreshInstrumentComboData();
//        instantOrderByInstrumentIFrame._InstantOrderListFrame2.RefreshInstrumentComboData();
//        instantOrderByInstrumentIFrame._InstantOrderListFrame3.RefreshInstrumentComboData();
//        instantOrderByInstrumentIFrame._InstantOrderListFrame4.RefreshInstrumentComboData();

//        var table = dataSet.Tables("TradingTime");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var tradeTime = new TradeTime();
//            tradeTime.UpdateByDataRow(row);

//            if (oInstruments.Exists(tradeTime.instrumentID)) {
//                var instrument = oInstruments.Item(tradeTime.instrumentID);
//                var tradeTimes = instrument.tradeTimes;
//                tradeTimes.Item(tradeTime.beginTime) = tradeTime;
//            }
//        }

//        //this.CheckInstrumentsTradingtime();

//        //Added by Michael on 2004-04-02
//        var now = this.mainWindow.oSystemTime;
//        //oIOProxy.UpdateInstrumentForAutoToManual();
//        var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
//        if (isInitUi) {
//            var instruments = (new VBArray(this.mainWindow.oInstruments.Items())).toArray();
//            for (var index = 0, count = instruments.length; index < count; index++) {
//                var instrument = instruments[index];

//                instrument.SynTradingTime2(now);

//                this.mainWindow.OnQuotationPropertiesChanged(instrument, isInitUi);
//                if (oCurrentInstrumentID == instrument.id) {
//                    this.mainWindow.OnPropertyInstrumentChanged(instrument);
//                    this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
//                }
//            }
//        }
//        else {
//            var instruments = this.mainWindow.oInstruments;
//            var table = dataSet.Tables("Instrument");
//            for (var index = 0; table && index < table.Rows.Count; index++) {
//                var row = table.Rows(index);
//                var instrument = instruments.Item(row("id"));
//                instrument.SynTradingTime2(now);
//                this.mainWindow.OnQuotationPropertiesChanged(instrument, isInitUi);
//                //                this.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument,false);
//                if (oCurrentInstrumentID == instrument.id) {
//                    this.mainWindow.OnPropertyInstrumentChanged(instrument);
//                    this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
//                }
//            }
//        }

//        /*backup
//        var table = dataSet.Tables("OverridedQuotation");
//        for(var index=0; table && index<table.Rows.Count; index++)
//        {
//        var row = table.Rows(index);
//        var quotePolicyID = row("quotePolicyID");
//        var instrumentID = row("instrumentID");
//        var _timestamp = row("timestamp");
//        var _origin = row("origin");
//        var _ask = row("ask");
//        var _bid = row("bid");
//        var _high = row("high");
//        var _low = row("low");
//			
//        if(!this.mainWindow.oInstruments.Exists(instrumentID))
//        continue;
//        var instrument = this.mainWindow.oInstruments.Item(instrumentID);
//        var timestamp = new Date(_timestamp);
//        var origin = new Price(_origin,parseFloat(_origin),instrument.numeratorUnit,instrument.denominator);
//        var ask = new Price(_ask,parseFloat(_ask),instrument.numeratorUnit,instrument.denominator);
//        var bid = new Price(_bid,parseFloat(_bid),instrument.numeratorUnit,instrument.denominator);
//        var high = new Price(_high,parseFloat(_high),instrument.numeratorUnit,instrument.denominator);
//        var low = new Price(_low,parseFloat(_low),instrument.numeratorUnit,instrument.denominator);

//        var quotation = new Quote(null, ask, bid, high, low, timestamp);
//        instrument.UpdateQuotationHistory(quotation);//, quotePolicyID);

//        var originQuote = new Quote(null, origin, origin, origin, origin, timestamp);
//        instrument.SetOriginQuotation(originQuote);
//        }
//		
//        var table = dataSet.Tables("OriginQuotation");
//        for(var index=0; table && index<table.Rows.Count; index++)
//        {
//        var row = table.Rows(index);
//        var instrumentID = row("instrumentID");
//        var _timestamp = row("timestamp");
//        var _ask = row("ask");
//        var _bid = row("bid");
//        var _high = row("high");
//        var _low = row("low");
//			
//        if(!this.mainWindow.oInstruments.Exists(instrumentID))
//        continue;
//        var instrument = this.mainWindow.oInstruments.Item(instrumentID);
//        var timestamp = new Date(_timestamp);
//        var ask = new Price(_ask,parseFloat(_ask),instrument.numeratorUnit,instrument.denominator);
//        var bid = new Price(_bid,parseFloat(_bid),instrument.numeratorUnit,instrument.denominator);
//        var high = new Price(_high,parseFloat(_high),instrument.numeratorUnit,instrument.denominator);
//        var low = new Price(_low,parseFloat(_low),instrument.numeratorUnit,instrument.denominator);
//        var quotation = new Quote(null, ask, bid, high, low, timestamp);
//        instrument.SetOriginQuotation(quotation);
//        }
//        */

//        var table = dataSet.Tables("OriginQuotation");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var dataRow = table.Rows(index);
//            var instrumentID = dataRow("instrumentID");
//            var instrument = this.mainWindow.oInstruments.Item(instrumentID);
//            var quotation = ObjectPool.GetQuotation();
//            quotation.Parse2(instrument, dataRow);

//            instrument.SetOriginQuotation(quotation);
//        }

//        var table = dataSet.Tables("OverridedQuotation");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var dataRow = table.Rows(index);

//            var instrumentID = dataRow("instrumentID");
//            var instrument = this.mainWindow.oInstruments.Item(instrumentID);
//            var quotation = ObjectPool.GetQuotation();
//            quotation.Parse2(instrument, dataRow);

//            //instrument.UpdateQuotationHistory(quotation);

//            /*John ??????????????????????
//            var originQuotation = quotation;//ObjectPool.GetQuotation();
//            //originQuotation.id = quotation.id;
//            originQuotation.timestamp = quotation.timestamp;
//            originQuotation.ask = quotation.origin.Clone();
//            originQuotation.bid = quotation.origin.Clone();
//            originQuotation.high = quotation.origin.Clone();
//            originQuotation.low = quotation.origin.Clone();	
//            originQuotation.origin = null;		
//            //var originQuote = new Quote(null, origin, origin, origin, origin, timestamp);
//            instrument.SetOriginQuotation(originQuotation);
//            */
//            //instrument.SetOriginQuotation(quotation);

//            instrument.SetOverridedQuotation(quotation);
//        }

//        var transactions = new ActiveXObject("Scripting.Dictionary");

//        var table = dataSet.Tables("Order");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var tranID = row("transactionID");

//            var tran;
//            var transactions2 = this.mainWindow.oTransactions;
//            if (transactions2.Exists(tranID))
//                tran = transactions2.Item(tranID);
//            else {
//                tran = new Transaction(tranID);
//                transactions2.Add(tranID, tran);
//            }
//            tran.UpdateByDataRow(row);

//            transactions.Item(tran.id) = tran;

//            var order = null;
//            switch (tran.orderType) {
//                case OrderType.SpotTrade:
//                    order = new DQOrder(row("id"));
//                    break;
//                case OrderType.Limit:
//                    order = new LMTOrder(row("id"));
//                    break;
//                case OrderType.Market:
//                    order = new MKTOrder(row("id"));
//                    break;
//                case OrderType.MarketOnOpen:
//                    order = new MOOOrder(row("id"));
//                    break;
//                case OrderType.MarketOnClose:
//                    order = new MOCOrder(row("id"));
//                    break;
//                case OrderType.Risk:
//                    order = new Order(row("id"));
//                    break;
//            }

//            if (order) {
//                order.mainWindow = this.mainWindow;
//                order.tran = tran;
//                tran.orders.push(order);

//                order.UpdateByDataRow(row);
//            }
//        }

//        var table = dataSet.Tables("OrderRelation");
//        for (var index = 0; table && index < table.Rows.Count; index++) {
//            var row = table.Rows(index);
//            var openOrderId = row("OpenOrderId");
//            var closeOrderId = row("CloseOrderId");

//            var closeIds = null;
//            if (!this.mainWindow.oOpenIdToCloseId.Exists(openOrderId)) {
//                closeIds = new ActiveXObject("Scripting.Dictionary");
//                this.mainWindow.oOpenIdToCloseId.Add(openOrderId, closeIds);
//            }
//            else {
//                closeIds = this.mainWindow.oOpenIdToCloseId.Item(openOrderId);
//            }
//            if (!closeIds.Exists(closeOrderId)) closeIds.Add(closeOrderId, null);
//            if (!this.mainWindow.oCloseIdToOpenId.Exists(closeOrderId)) this.mainWindow.oCloseIdToOpenId.Add(closeOrderId, openOrderId);
//        }

//        //        var relationsByCloseOrderIDs = "";
//        var trans = (new VBArray(transactions.Items())).toArray();
//        for (var index = 0, count = trans.length; index < count; index++) {
//            var tran = trans[index];

//            tran.Begin();

//            var phase = tran.phase;

//            //Added by Michael on 2005-03-16
//            for (var index2 in tran.orders) {
//                var order = tran.orders[index2];

//                //Modified by Michael on 2006-09-30
//                if (order.tran.orderType == OrderType.Limit)// || order.tran.orderType == OrderType.Market)
//                {
//                    //???????????????
//                    //if (isValidateAutoAcceptOthers)
//                    {
//                        order.Hit2();
//                    }
//                }
//                if (order.tran.orderType == OrderType.Market || order.tran.orderType == OrderType.SpotTrade) {
//                    order.Hit2();
//                }

//                //                if (phase == TransPhase.Executed && order.isOpen == 0) {
//                //                    relationsByCloseOrderIDs += "<CloseOrderID ID=\'" + order.id + "\'></CloseOrderID>";
//                //                }
//            }
//        }


//        if (isInitUi) {
//            var table = dataSet.Tables("AppendParameters");
//            var row = table.Rows(0);
//            this.ConfirmRejectDQOrder = row("ConfirmRejectDQOrder");
//            this.AllowModifyOrderLot = row("AllowModifyOrderLot");
//        }

//        if (window.parent.toolBarFrm.QuotePolicySelectInit)
//            window.parent.toolBarFrm.QuotePolicySelectInit();

//        //Modified by Michael on 2008-05-26
//        /*
//        if(window.parent.toolBarFrm.FillQuotationSources)
//        window.parent.toolBarFrm.FillQuotationSources();
//        */

//        //        this.GetRelationsByCloseOrderID(relationsByCloseOrderIDs);

//        vsflexQuotation.Redraw = true;
//        vsflexQuotationTask.Redraw = true;
//        vsflexOrderTask.Redraw = true;
//    };

    this.InstrumentListAddItem = function (instrumentId, order, code, originCode) {
        oInstrumentList.Add(instrumentId, new InstrumentSortByCode(instrumentId, order, code, originCode));
    };

    this.InstrumentLimit = function (instrument, quotation) {
        //use origin quotation only
        if (quotation == null) return;
        if (instrument.previousClosePrice == null) return;
        if (!instrument._LimitParameter.hasLimit) return;

        //        var id = instrument.id;
        //        if (settings.Exists(id) == false) return;
        //        var parameter = settings.Item(id).Parameter;
        //        if (parameter == "") return;

        //        var msXml = new ActiveXObject("Msxml2.DOMDocument");
        //        msXml.loadXML(parameter);
        //        if (!msXml) {
        //            return;
        //        }
        //        var limit1 = "";
        //        var limit2 = "";
        //        var limit3 = "";
        //        var limit = 0;
        //        var spread = 0;
        //        var limitTradeDay = "";
        //        var limitLevel = "";

        //        var sNodeName;
        //        var sNodeValue;
        //        var pNode = msXml.firstChild;
        //        for (var j = 0; j < pNode.attributes.length; j++) {
        //            sNodeName = pNode.attributes.item(j).nodeName;
        //            sNodeValue = pNode.getAttribute(sNodeName);
        //            switch (sNodeName) {
        //                case "Limit1":
        //                    limit1 = sNodeValue;
        //                    break;
        //                case "Limit2":
        //                    limit2 = sNodeValue;
        //                    break;
        //                case "Limit3":
        //                    limit3 = sNodeValue;
        //                    break;
        //                case "Spread":
        //                    spread = sNodeValue;
        //                    break;
        //                case "LimitLevel":
        //                    limitLevel = sNodeValue;
        //                    break;
        //                case "LimitTradeDay":
        //                    limitTradeDay = sNodeValue;
        //                    break;
        //            }
        //        }

        //        limit1 = parseFloat(limit1);
        //        limit1 = isNaN(limit1) ? 0 : limit1;

        //        limit2 = parseFloat(limit2);
        //        limit2 = isNaN(limit2) ? 0 : limit2;

        //        limit3 = parseFloat(limit3);
        //        limit3 = isNaN(limit3) ? 0 : limit3;

        var limitParameter = instrument._LimitParameter;
        var limit1 = limitParameter.limit1;
        var limit2 = limitParameter.limit2;
        var limit3 = limitParameter.limit3;
        var limit = 0;
        var spread = 0;
        var limitLevel = limitParameter.limitLevel;
        if (limitParameter.limitTradeDay == null || limitParameter.limitTradeDay != new Date(currentTradeDay).valueOf()) {
            limitLevel = "";
        }
        var currentLimitLevel = parseInt(limitLevel);
        currentLimitLevel = isNaN(currentLimitLevel) ? 0 : currentLimitLevel;
        switch (currentLimitLevel) {
            case 0:
                limit = limit1;
                break;
            case 1:
                limit = limit2;
                break;
            case 2:
                limit = limit3;
                break;
            default:
                break;
        }
        if (limit <= 0) return;

        var mktAskPrice = quotation.ask;
        var mktAskPriceValue = mktAskPrice.ToDouble();
        if (mktAskPriceValue == null) mktAskPriceValue = 0;
        var mktBidPrice = quotation.bid;
        var mktBidPriceValue = mktBidPrice.ToDouble();
        if (mktBidPriceValue == null) mktBidPriceValue = 0;
        var denominator = instrument.denominator;

        var previousClosePriceValue = instrument.previousClosePrice.ToDouble();
        if ((mktAskPriceValue != 0 && (mktAskPriceValue >= (previousClosePriceValue + limit / denominator))) ||
			(mktBidPriceValue != 0 && (mktBidPriceValue <= (previousClosePriceValue - limit / denominator)))) {
            var spread = parseInt(spread);
            spread = isNaN(spread) ? 0 : spread;

            var xml = "<Instrument ";
            xml += "Limit1=\"" + limit1 + "\" ";
            xml += "Limit2=\"" + limit2 + "\" ";
            xml += "Limit3=\"" + limit3 + "\" ";
            xml += "Spread=\"" + spread + "\" ";
            xml += "LimitLevel=\"" + (currentLimitLevel + 1) + "\" ";
            xml += "LimitTradeDay=\"" + this.GetDateString(new Date(currentTradeDay)) + "\" ";
            xml += ">";
            xml += "</Instrument>";
            if (xml && xml != "") {
                //Update Settings
                this.UpdateSettings(instrument.id, xml);
                //Save Data
                this.UpdateSystemParameters3(xml, instrument.id);
            }

            //var oIOProxy = this.mainWindow.parent.quotationFrm.oIOProxy;	
            var instrumentColKey = this.mainWindow.parent.quotationFrm.instrumentColKey;

            var currentQuotePolicyDetailID = this.mainWindow.parent.quotationFrm.oCurrentQuotePolicyDetailID;
            if (currentQuotePolicyDetailID.toUpperCase() == QuotePolicyDetailID.toUpperCase())	//For DEF use only
            {
                var quotePolicyDetail = instrument.quotePolicyDetails.Item(this.mainWindow.parent.quotationFrm.oCurrentQuotePolicyDetailID);
                var instrumentPropertyColKey = this.mainWindow.parent.quotationFrm.instrumentPropertyColKey;
                if (spread != quotePolicyDetail.spreadPoints && spread <= quotePolicyDetail.maxSpreadPoints) {
                    var eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetail.code + " " + instrument.code + " with spread = " + spread; // +" and autopoint = " + quotePolicyDetail.autoAdjustPoints;
                    oIOProxy.SendQuotePolicyParam(quotePolicyDetail, instrument.code, instrumentPropertyColKey.SpreadPoints, spread, eventMessage);
                }
            }

            //var dqQuoteMinLot = 1;
            var dqQuoteMinLot = 0;
            if (dqQuoteMinLot > instrument.maxDQLot) {
                //vsflexQuotation.TextMatrix(row, col)  = instrument.dqQuoteMinLot;
            }
            else {
                if (dqQuoteMinLot != instrument.dqQuoteMinLot) {
                    oIOProxy.SendInstrumentParam(instrument, instrumentColKey.DQQuoteMinLot, dqQuoteMinLot, false);
                }
            }

            var autoDQMaxLot = 0.0;
            if (autoDQMaxLot != instrument.autoDQMaxLot) {
                oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AutoDQMaxLot, autoDQMaxLot, false);
            }
            //Sound
            this.PlaySound2(0);
        }
    };

    this.GetDateString = function (date) {
        if (date) {
            var s = "";
            var value;
            value = date.getFullYear();
            if (value < 10)
                s = "0";
            s += value.toString();
            s += "/";

            value = date.getMonth() + 1;
            if (value < 10)
                s += "0";
            s += value.toString();
            s += "/";

            value = date.getDate();
            if (value < 10)
                s += "0";
            s += value.toString();

            return s;
        }
    };

    this.UpdateSettings = function (id, xml) {
        if (xml && xml != "") {
            //Update settings
            var parameter = this.GetField(xml, "");
            if (settings.Exists(id) == true) {
                settings.Item(id).Parameter = parameter;
            }
            else {
                settings.Item(id) = new Setting(id, parameter);
            }
            if (oInstruments.Exists(id)) {
                oInstruments.Item(id)._LimitParameter.SetParameter(parameter);
            }
        }
    };

    this.IsValidField = function (field) {
        return (!(typeof (field) == 'undefined' || field == null));
    };

    this.GetField = function (field, defaultValue) {
        return (this.IsValidField(field)) ? field : defaultValue;
    };

    this.GetCommands = function (commandNode) {
        //var s = "GetCommands BEGIN---------------";	
        //var beginTime = new Date();
        //var beginTime1 = beginTime;

        //s += "commandNode:" + commandNode.xml;
        var includeQuotationAndExecute = commandNode.xml.indexOf("Quotation") != -1 && commandNode.xml.indexOf("Execute") != -1;
        var quotationNode = null;
        if (includeQuotationAndExecute) oIOProxy.Debug2("Quotation and Execute in same command:  " + commandNode.xml);

        for (var i = 0, count = commandNode.childNodes.length; i < count; i++) {
            var tempNode = commandNode.childNodes.item(i);
            //s += this.enterLine + tempNode.nodeName + (new Date() - beginTime).toString() + this.enterLine;
            //beginTime = new Date();	

            switch (tempNode.nodeName) {
                case "Quotation":
                    if (includeQuotationAndExecute) {
                        oIOProxy.Debug2("Delay to handle quotation");
                        quotationNode = tempNode;
                    }
                    else {
                        oIOProxy.Debug2("Begin SetQuotation");
                        this.SetQuotation(tempNode);
                        oIOProxy.Debug2("End SetQuotation");
                    }
                    break;
                case "Quote":
                    this.Quote(tempNode);
                    break;
                case "Quote2":
                    this.Quote2(tempNode);
                    break;
                case "CancelQuote2":
                    this.CancelQuote2(tempNode);
                    break;
                case "Place":
                    this.Place(tempNode);
                    break;
                case "Cancel":
                    this.Cancel(tempNode);
                    break;
                case "Cut":
                    this.Cut(tempNode);
                    break;
                case "Delete":
                    this.Delete(tempNode);
                    break;
                case "Execute2":
                    this.Execute2(tempNode);
                    break;
                case "Update":
                    this.Update(tempNode);
                    break;
                //Added by Michael on 2005-03-14               
                case "Hit":
                    this.Hit(tempNode);
                    break;
                case "Execute":
//                    if (includeQuotationAndExecute) oIOProxy.Debug2("Begin Execute")
                    this.Execute(tempNode);
//                    if (includeQuotationAndExecute) oIOProxy.Debug2("End Execute")
                    break;
                case "Parameters":
                    if (tempNode.attributes.length > 0) {
                        var dataSet = new ActiveXObject("DATA.DataSet");
                        var sXml = tempNode.getAttribute("DataSet");

                        dataSet.ReadXml(sXml);
                        this.GetParametersResult(dataSet);
                    }
                    break;
                //Modified by Michael on 2008-05-26               
                //case "QuotationSource":               
                //	this.SetQuotationSource(tempNode);               
                //	break;               
                //Added by Michael on 2008-05-23               
                case "SourceInstruments":
                    this.UpdateSourceInstrument(tempNode);
                    break;

                //Added by Michael on 2008-06-27               
                case "InstrumentUpdateCommand":
                    this.InstrumentUpdateCommand(tempNode);
                    break;
            }
        }
        if (includeQuotationAndExecute) {
            oIOProxy.Debug2("Begin delay SetQuotation");
            this.SetQuotation(quotationNode);
            oIOProxy.Debug2("End delay SetQuotation");
        }
        //s += "GetCommands--" + (new Date() - beginTime1).toString() + this.enterLine;

        //oIOProxy.Debug2("GetCommands ENDB---------------",s);		
    };

    //Added by Michael on 2008-06-27
    this.InstrumentUpdateCommand = function (tempNode) {
        //<Orders><Order ID="" AutoLimitPrice="" AutoStopPrice=""></Order></Orders>
        if (tempNode) {
            for (var j = 0; j < tempNode.childNodes.length; j++) {
                var orderNode = tempNode.childNodes.item(j);
                var id = orderNode.getAttribute("ID");
                if (oExecutedOrders.Exists(id)) {
                    var order = oExecutedOrders.Item(id);
                    order.UpdateByXmlNode(orderNode);

                    //Refresh UI
                    //??? OpenInterestGrid
                }
            }
        }
    };

    //Added by Michael on 2008-05-23
    this.SetActiveSourceInstrumentResult = function (sourceInstrumentXml) {
        oSourceInstruments.RemoveAll();
        if (!sourceInstrumentXml) return;

        var sourceInstrumentNode = new ActiveXObject("MSXML.DOMDocument");
        sourceInstrumentNode.loadXML(sourceInstrumentXml);

        var nodes = sourceInstrumentNode.firstChild;
        for (var i = 0, count = nodes.childNodes.length; nodes && i < count; i++) {
            var rowNode = nodes.childNodes.item(i);
            switch (rowNode.nodeName) {
                case "SourceInstrument":
                    var sourceInstrument = new SourceInstrument();
                    sourceInstrument.UpdateByXmlNode(rowNode);
                    oSourceInstruments.Item(sourceInstrument.Get_Code()) = sourceInstrument;
                    break;
            }
        }

        if (window.parent.toolBarFrm) {
            window.parent.toolBarFrm.FillSelectPriceSource();
        }
    };

    //Added by Michael on 2008-05-23
    this.UpdateSourceInstrument = function (nodes) {
        if (!nodes) return;

        //var nodes = sourceInstrumentNode.firstChild;
        for (var i = 0, count = nodes.childNodes.length; i < count; i++) {
            var rowNode = nodes.childNodes.item(i);
            switch (rowNode.nodeName) {
                case "SourceInstrument":
                    var code = "";
                    for (var index = 0, count2 = rowNode.attributes.length; index < count2; index++) {
                        var attribute = rowNode.attributes.item(index);
                        if (attribute.nodeName == "Code") {
                            code = attribute.nodeValue;
                            break;
                        }
                    }
                    if (code != "") {
                        //var code = rowNode.attributes.item("Code").nodeValue;
                        if (oSourceInstruments.Exists(code)) {
                            oSourceInstruments.Item(code).UpdateByXmlNode(rowNode);
                        }
                    }
                    break;
            }
        }

        if (window.parent.toolBarFrm) {
            window.parent.toolBarFrm.FillSelectPriceSource();
        }
    };

    //Added by Michael on 2008-05-28
    this.GetBatchActiveSource = function () {
        var batchActiveSource = "";
        var sourceInstruments = (new VBArray(oSourceInstruments.Items())).toArray();
        for (var i = 0; i < sourceInstruments.length; i++) {
            if (batchActiveSource == "") {
                batchActiveSource = sourceInstruments[i].Get_ActiveSource();
            }
            else {
                if (batchActiveSource != sourceInstruments[i].Get_ActiveSource()) {
                    return "Source1";
                }
            }
        }
        return (batchActiveSource == "") ? "Source1" : batchActiveSource;
    };

    //Modified by Michael on 2008-05-26
    /*
    this.SetQuotationSource = function(tempNode)
    {
    if (tempNode)
    {
    var sourceName = tempNode.getAttribute("SourceName")
			
    var quotationSources2 = (new VBArray(oQuotationSources.Items())).toArray();
    for(var index=0,iCount=quotationSources2.length;index<iCount;index++)
    {
    var qs = quotationSources2[index];
    qs.IsActive = false;				
    }
    oQuotationSources.Item(sourceName).IsActive = true;
    //Refresh UI
    if(window.parent.toolBarFrm.FillQuotationSources)
    window.parent.toolBarFrm.FillQuotationSources();
    }
    };
    */

    this.GetParametersResult = function (dataSet) {
        if (!dataSet) return;

        var table = dataSet.Tables("Customer");
        for (var index = 0; table && index < table.Rows.Count; index++) {
            var row = table.Rows(index);

            if (!oCustomers.Exists(row("id"))) {
                var customer = new Customer(row("id"));
                customer.UpdateByDataRow(row);

                oCustomers.Item(customer.id) = customer;
            }
        }

        var table = dataSet.Tables("Account");
        for (var index = 0; table && index < table.Rows.Count; index++) {
            var row = table.Rows(index);
            if (!oAccounts.Exists(row("id"))) {
                var account = new Account(row("id"));
                account.UpdateByDataRow(row);

                oAccounts.Item(account.id) = account;
            }
        }
    };

    //Added by Michael on 2005-03-14
    this.Hit = function (tempNode) {
        if (tempNode) {
            this.mainWindow.parent.orderTaskFrm.vsflexOrderTask.Redraw = false;
            for (var i = 0, count = tempNode.childNodes.length; i < count; i++) {
                var ordersNode = tempNode.childNodes.item(i);
                var orderID = ordersNode.getAttribute("ID");
                if (oPendingOrders.Exists(orderID)) {
                    var order = oPendingOrders.Item(orderID);
                    order.Hit(ordersNode, false);
                }

                if (oDeformityOrders.Exists(orderID)) {
                    var order = oDeformityOrders.Item(orderID);
                    order.Hit(ordersNode, false);
                }
            }
            this.mainWindow.parent.orderTaskFrm.vsflexOrderTask.Redraw = true;
        }
    };

    //Added by Michael on 2005-03-22
    this.GetCancelMessage = function (tran, errorCode) {
        var s = "<Table border = 0 width=90%>";
        var account = null;
        var instrument = null;
        //for(var index in tran.orders)
        for (var index = 0, iCount = tran.orders.length; index < iCount; index++) {
            var order = tran.orders[index];
            if (!account) account = order.GetAccount();
            if (!instrument) instrument = order.GetInstrument();

            s += this.GetCancelMessage2(account, instrument, order, errorCode);
        }

        s += "</Table>";

        return s;
    };

    //Added by Michael on 2005-03-21
    this.GetCancelMessage2 = function (account, instrument, order, errorCode) {
        var s = "<TR>";
        s += "<TD Align = left>";
        s += "<b>Account Code: </b>";
        s += "</TD>";
        s += "<TD Align = Right>";
        s += (account) ? account.code : "";
        s += "</TD>";
        s += "</TR>";
        s += "<TR>";
        s += "<TD Align = left>";
        s += "<b>B/S: </b>";
        s += "</TD>";
        s += "<TD Align = Right>";
        s += (order.isBuy ? "Buy" : "Sell");
        s += "</TD>";
        s += "</TR>";
        s += "<TR>";
        s += "<TD Align = left>";
        s += "<b>Instrument: </b>";
        s += "</TD>";
        s += "<TD Align = Right>";
        s += (instrument) ? instrument.code : "";
        s += "</TD>";
        s += "</TR>";
        s += "<TR>";
        s += "<TD Align = left>";
        s += "<b>Lot: </b>";
        s += "</TD>";
        s += "<TD Align = Right>";
        s += order.lot;
        s += "</TD>";
        s += "</TR>";
        s += "<TR>";
        s += "<TD colspan = 2>";
        s += this.GetMessageForOrder(errorCode);
        s += "</TD>";
        s += "</TR>";
        s += "<TR>";
        s += "<TD colspan = 2>";
        s += "</TD>";
        s += "</TR>";

        return s;
    };

    //Added by Michael on 2005-03-22
    this.GetMessageForOrder = function (errorCode) {
        var message = errorCode;
        switch (errorCode) {
            case "RiskMonitorDelete":
                message = this.RiskMonitorDelete;
                break;
            case "AccountResetFailed":
                message = this.AccountResetFailed;
                break;
            case "DealerCanceled":
                message = this.DealerCanceled;
                break;
            case "RejectDQByDealer":
                message = this.RejectDQByDealer;
                break;
            case "NecessaryIsNotWithinThreshold":
                message = this.NecessaryIsNotWithinThreshold;
                break;
            case "MarginIsNotEnough":
                message = this.MarginIsNotEnough;
                break;
            case "AccountIsNotTrading":
                message = this.AccountIsNotTrading;
                break;
            case "InstrumentIsNotAccepting":
                message = this.InstrumentIsNotAccepting;
                break;
            case "TimingIsNotAcceptable":
                message = this.TimingIsNotAcceptable;
                break;
            case "OrderTypeIsNotAcceptable":
                message = this.OrderTypeIsNotAcceptable;
                break;
            case "HasNoAccountsLocked":
                message = this.HasNoAccountsLocked;
                break;
            case "IsLockedByAgent":
                message = this.IsLockedByAgent;
                break;
            case "IsNotLockedByAgent":
                message = this.IsNotLockedByAgent;
                break;
            case "InvalidPrice":
                message = this.InvalidPrice;
                break;
            case "LossExecutedOrderInOco":
                message = this.LossExecutedOrderInOco;
                break;
            case "ExceedOpenLotBalance":
                message = this.ExceedOpenLotBalance;
                break;
            case "OneCancelOther":
                message = this.OneCancelOtherPrompt;
                break;
            case "HasUnassignedOvernightOrders":
                message = this.HasUnassignedOvernightOrders;
                break;
            case "CustomerCanceled":
                message = this.CustomerCanceled;
                break;
            case "DbOperationFailed":
                message = this.DbOperationFailed;
                break;
            case "TransactionAlreadyExists":
                message = this.TransactionAlreadyExists;
                break;
            case "HasNoOrders":
                message = this.HasNoOrders;
                break;
            case "InvalidRelation":
                message = this.InvalidRelation;
                break;
            case "InvalidLotBalance":
                message = this.InvalidLotBalance;
                break;
            case "ExceedAssigningLotBalance":
                message = this.ExceedAssigningLotBalance;
                break;
            case "OrderLotExceedMaxLot":
                message = this.OrderLotExceedMaxLot;
                break;
            case "OpenOrderNotExists":
                message = this.OpenOrderNotExists;
                break;
            case "AssigningOrderNotExists":
                message = this.AssigningOrderNotExists;
                break;
            case "TransactionNotExists":
                message = this.TransactionNotExists;
                break;
            case "TransactionCannotBeCanceled":
                message = this.TransactionCannotBeCanceled;
                break;
            case "TransactionCannotBeExecuted":
                message = this.TransactionCannotBeExecuted;
                break;
            case "OrderCannotBeDeleted":
                message = this.OrderCannotBeDeleted;
                break;
            case "IsNotAccountOwner":
                message = this.IsNotAccountOwner;
                break;
            case "InvalidOrderRelation":
                message = this.InvalidOrderRelation;
                break;
            case "TradePolicyIsNotActive":
                message = this.TradePolicyIsNotActive;
                break;
            case "SetPriceTooCloseToMarket":
                message = this.SetPriceTooCloseToMarket;
                break;
            case "HasNoQuotationExists":
                message = this.HasNoQuotationExists;
                break;
            case "AccountIsInAlerting":
                message = this.AccountIsInAlerting;
                break;
        }
        return (message);
    };

    //Added by Michael on 2005-03-14
    this.Execute = function (tempNode) {
        if (tempNode) {
            var transNode = tempNode.getElementsByTagName("Transaction")[0];
            //var transNode = tempNode.childNodes.item(i);
            //for(var i=0,count=tempNode.childNodes.length;i<count;i++)
            {
                //var transNode = tempNode.childNodes.item(i);
                var transactionID = transNode.getAttribute("ID");
                var errorCode = transNode.getAttribute("ErrorCode");
                if (errorCode) {
                    //var isCancel = false;
                    //var sMsg = errorCode;
                    //this.mainWindow.parent.showModalDialog("Alert.aspx", sMsg,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");

                    var order = null;
                    var orders = (new VBArray(this.mainWindow.oPendingOrders.Items())).toArray();
                    for (var index = 0, count = orders.length; index < count; index++) {
                        if (orders[index].tran.id == transactionID) {
                            order = orders[index];
                            //orders[index].tran.Cancel();
                            //isCancel = true;
                            break;
                        }
                    }
                    if (order == null) {
                        var orders = (new VBArray(this.mainWindow.oDeformityOrders.Items())).toArray();
                        for (var index = 0, count = orders.length; index < count; index++) {
                            if (orders[index].tran.id == transactionID) {
                                order = orders[index];
                                //orders[index].tran.Cancel();
                                break;
                            }
                        }
                    }

                    var sMsg = "";
                    if (order == null) {
                        sMsg = "the transaction is not exists! (" + errorCode + ")";
                    }
                    else {
                        sMsg = this.GetCancelMessage(order.tran, errorCode);
                        order.tran.Cancel();
                    }
                    if (this.mainWindow.oDisablePopup == 0)
                        this.mainWindow.parent.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
                }
                else {
                    var tran = null;
                    var order = null;

                    for (var j = 0, count2 = transNode.childNodes.length; j < count2; j++) {
                        var orderNode = transNode.childNodes.item(j);

                        var orders = (new VBArray(this.mainWindow.oPendingOrders.Items())).toArray();
                        for (var index = 0, count3 = orders.length; index < count3; index++) {
                            if (orders[index].id == orderNode.getAttribute("ID")) {
                                order = orders[index];
                                break;
                            }
                        }

                        if (order == null) {
                            var orders2 = (new VBArray(this.mainWindow.oDeformityOrders.Items())).toArray();
                            for (var index = 0, count4 = orders2.length; index < count4; index++) {
                                if (orders2[index].id == orderNode.getAttribute("ID")) {
                                    order = orders2[index];
                                    break;
                                }
                            }
                        }

                        if (!order) break;
                    }

                    if (order == null) {
                        this.Place(tempNode, true); //maybe the order is auto executed, in this case, dealer doesn't receive place command befor execut command
                    }

                    for (var j = 0, count2 = transNode.childNodes.length; j < count2; j++) {
                        var orderNode = transNode.childNodes.item(j);

                        var orders = (new VBArray(this.mainWindow.oPendingOrders.Items())).toArray();
                        for (var index = 0, count3 = orders.length; index < count3; index++) {
                            if (orders[index].id == orderNode.getAttribute("ID")) {
                                order = orders[index];
                                break;
                            }
                        }

                        if (order == null) {
                            var orders2 = (new VBArray(this.mainWindow.oDeformityOrders.Items())).toArray();
                            for (var index = 0, count4 = orders2.length; index < count4; index++) {
                                if (orders2[index].id == orderNode.getAttribute("ID")) {
                                    order = orders2[index];
                                    break;
                                }
                            }
                        }

                        //if (!order) break;
                        if (order != null) {
                            tran = order.tran;
                            order.UpdateByXmlNode(orderNode);
                            order.ChangeStatus(OrderStatus.WaitServerResponse, true);
                        }
                    }

//                    if (order != null) {
//                        tran = order.tran;


//                        order.UpdateByXmlNode(orderNode);
//                        order.ChangeStatus(OrderStatus.WaitServerResponse);
//                    }

                    if (tran != null) {
                        //tran.UpdateByXmlNode(transNode);
                        //tran.phase = TransPhase.Executed;

                        //Notify user with sound
                        var account = order.GetAccount();
                        if (account && account.type == AccountType.BlackList) {
                            this.PlaySound2(3);
                        }
                        else {
                            this.PlaySound((tran.orderType == OrderType.SpotTrade) ? SoundOption.DQTradeSucceed : SoundOption.LimitTradeSucceed);
                        }

                        tran.Success2(transNode, this);

                        //                        var relationsByCloseOrderIDs = "";
                        //for(var index in tran.orders)
                        for (var index = 0, iCount = tran.orders.length; index < iCount; index++) {
                            var order = tran.orders[index];
                            //                            if (order.isOpen == 0) {
                            //                                relationsByCloseOrderIDs += "<CloseOrderID ID='" + order.id + "'></CloseOrderID>";
                            //                            }
                            //                            else {
                            if (order.isOpen) {
                                if (order.mainWindow.oOpenIdToCloseId.Exists(order.id)) {
                                    var closeIds = order.mainWindow.oOpenIdToCloseId.Item(order.id);
                                    var closeIds2 = (new VBArray(closeIds.Keys())).toArray();
                                    for (var index = 0, count = closeIds2.length; index < count; index++) {
                                        var closeId = closeIds2[index];
                                        var closeOrder = order.mainWindow.GetOrderById(closeId);
                                        if (closeOrder != null) {
                                            //order.mainWindow.parent.orderTaskFrm.AddLmtMktOrderToGrid(closeOrder);                                            
                                            closeOrder.CheckWhenOrderArrive(true);
                                        }
                                    }
                                }
                            }
                        }
                        //                        if (relationsByCloseOrderIDs != "") {
                        //                            this.GetRelationsByCloseOrderID(relationsByCloseOrderIDs);
                        //                        }
                    }
                }
            }
        }
    };

    this.Cut = function (tempNode) {
        if (tempNode)
            this.Execute2(tempNode);
        return;

        /*
        for(var i=0,count=tempNode.childNodes.length;i<count;i++)
        {
        var accountNode = tempNode.childNodes.item(i);
        */
        /*var accountID = accountNode.getAttribute("ID");
        if(!Accounts.Exists(accountID))	continue;
        var account = Accounts.Item(accountID);
        account.UpdateByXmlNode(accountNode);*/
        /*
        for(var j=0,count=accountNode.childNodes.length;j<count;j++)
        {
        var tempChildNode = accountNode.childNodes.item(j);
        switch(tempChildNode.nodeName)
        {
        */
        /*case "Currency":
        var currencyID = tempChildNode.getAttribute("ID");
        if(!Currencies.Exists(currencyID))	continue;
        var currency = Currencies.Item(currencyID);
        currency.UpdateByXmlNode(tempChildNode);
        break;*/
        /*	case "Transaction":
        for(var x=0,count=tempChildNode.childNodes.length;x<count;x++)
        {
        var tranNode = tempChildNode.childNodes.item(x);
        this.Execute2(tranNode);
        }
        break;
        }
        }
        }*/
    };

    /*
    1. Delete open order
    <Delete xmlns="">
    <DeletedOrder ID="93ef2699-3f8c-4b28-93f4-9332e781fb2b"/>
    </Delete>
    2. Delete close order
    <Delete xmlns="">
    <DeletedOrder ID="93ef2699-3f8c-4b28-93f4-9332e781fb2b"/>
    <AffectedOrders xmlns="">
    <Transaction ID="ccd6484e-78f1-4112-9741-7d37439baaa5" Code="ABC110913SP00039" Type="0" SubType="0" Phase="2" OrderType="0" ContractSize="10.0000" AccountID="cbcdb06f-141a-415f-bdda-a676bd5759b7" InstrumentID="ab98797c-0b0c-427f-8d1b-0de006d153a1" BeginTime="2011-09-14 08:56:06" EndTime="2011-09-14 08:59:06" ExpireType="3" SubmitTime="2011-09-14 08:56:08" ExecuteTime="2011-09-14 08:56:08" SubmitorID="79eb2fa2-4ced-4d0e-a283-85adc0136d05" ApproverID="00000000-0000-0000-0000-000000000000">
    <Order ID="cb062a79-d4ee-4c84-9e6a-86b4de214d97" Code="ABC2011091300039" Phase="2" TradeOption="0" IsOpen="true" IsBuy="true" SetPrice="97.15" ExecutePrice="97.15" Lot="1.0000" OriginalLot="1.0000" LotBalance="1.0000" CommissionSum="1.0000" LevySum="2.0000" InterestPerLot="0.0000000000000" StoragePerLot="0.0000000000000" LivePrice="96.20" InterestPLFloat="0" StoragePLFloat="0" TradePLFloat="-0.07" InterestPLNotValued="0" StoragePLNotValued="0" TradePLNotValued="0"/>
    </Transaction>
    </AffectedOrders>
    </Delete>
    */
    this.Delete = function (tempNode) {
        var deletedOrderId = null;
        for (var i = 0, count = tempNode.childNodes.length; i < count; i++) {
            var xmlNode = tempNode.childNodes.item(i);
            switch (xmlNode.nodeName) {
                case "DeletedOrder":
                    deletedOrderId = xmlNode.getAttribute("ID");
                    var accountId = xmlNode.getAttribute("AccountID");
                    var instrumentId = xmlNode.getAttribute("InstrumentID");
                    if (oExecutedOrders.Exists(deletedOrderId)) {
                        var order = oExecutedOrders.Item(deletedOrderId);
                        order.status = OrderStatus.Deleted;
                        order.lastStatus = OrderStatus.Deleted;

                        var instrument = order.GetInstrument();
                        if (instrument != null) {
                            instrument.DeleteOrderProcessBuySellLot(order);
                            //Refresh UI...
                            this.mainWindow.UpdateTotalBuySellLot(instrument);
                            this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
                        }

                        //add this order to ExecuteGrid
                        try {
                            var wndExecuteOrders = parent.toolBarFrm.oWndExecuteOrders;
                            if (wndExecuteOrders && wndExecuteOrders.closed == false) {
                                wndExecuteOrders.DeleteOrderFromExecuteOrderGrid(this.mainWindow, deletedOrderId, accountId, instrumentId);
                            }
                        }
                        catch (ex)
					    { }
                    }
                    try {
                        var wndOpenInterest = parent.toolBarFrm.oWndOpenInterest;
                        if (wndOpenInterest && wndOpenInterest.closed == false) {
                            wndOpenInterest.DeleteOrderFromOpenInterestGrid(this.mainWindow, deletedOrderId, accountId, instrumentId, order);
                        }
                    }
                    catch (ex)
		            { }
                    break;
                case "AffectedOrders":
                    try {
                        var wndOpenInterest = parent.toolBarFrm.oWndOpenInterest;
                        var wndExecuteOrders = parent.toolBarFrm.oWndExecuteOrders;
                        if ((wndOpenInterest && wndOpenInterest.closed == false)
                            || (wndExecuteOrders && wndExecuteOrders.closed == false)) {
                            for (var l = 0, lCount = xmlNode.childNodes.length; l < lCount; l++) {
                                var tranNode = xmlNode.childNodes.item(l);
                                //Tran
                                var tran = new Transaction();
                                tran.UpdateByXmlNode(tranNode);
                                //Order
                                for (var j = 0, countj = tranNode.childNodes.length; j < countj; j++) {
                                    var orderNode = tranNode.childNodes.item(j);
                                    var order = new Order();
                                    order.mainWindow = this.mainWindow;
                                    order.status = OrderStatus.Executed;
                                    order.lastStatus = OrderStatus.Executed;
                                    order.tran = tran;
                                    tran.orders.push(order);
                                    order.UpdateByXmlNode(orderNode);
                                    if (!order.isOpen) {
                                        for (var k = 0, kCount = orderNode.childNodes.length; k < kCount; k++) {
                                            var orderRelation = new OrderRelation();
                                            orderRelation.UpdateByXmlNode(orderNode.childNodes.item(k));
                                            order.orderRelations.push(orderRelation);
                                        }
                                    }
                                    oExecutedOrders.Item(order.id) = order;
                                    var instrument = order.GetInstrument();
                                    if (instrument != null) {
                                        instrument.AffectOrderProcessBuySellLot(order);
                                        //Refresh UI...
                                        this.mainWindow.UpdateTotalBuySellLot(instrument);
                                        this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
                                    }

                                    if (wndOpenInterest && wndOpenInterest.closed == false) {
                                        wndOpenInterest.AffectOrderToOpenInterestGrid(this.mainWindow, order, deletedOrderId);
                                    }
                                    if (wndExecuteOrders && wndExecuteOrders.closed == false) {
                                        wndExecuteOrders.AffectOrderToExecuteOrderGrid(this.mainWindow, order, deletedOrderId);
                                    }
                                }
                            }
                        }
                    }
                    catch (ex)
		            { }
                    break;
            }
        }

        //Modified by Michael on 2005-11-03
        //this.GetRelationsByCloseOrderID(true);
    };

    this.AddNewOrder = function (tran, orderNode)	//For make order when IsAutoClose
    {
        var order;
        switch (tran.orderType) {
            case OrderType.SpotTrade:
                order = new DQOrder();
                break;
            case OrderType.Limit:
                order = new LMTOrder();
                break;
            case OrderType.Market:
                order = new MKTOrder();
                break;
            case OrderType.MarketOnOpen:
                order = new MOOOrder();
                break;
            case OrderType.MarketOnClose:
                order = new MOCOrder();
                break;
            default:
                order = new Order();
                break;
        }
        order.mainWindow = this.mainWindow;
        order.tran = tran;
        tran.orders.push(order);

        //var orderNode = transNode.childNodes.item(j);				
        order.UpdateByXmlNode(orderNode);

        order.account = order.GetAccount();
        order.customer = order.GetCustomer();
        order.status = OrderStatus.WaitServerResponse;
        order.lastStatus = OrderStatus.WaitServerResponse;
    };

    this.Execute2 = function (tempNode) {
        //        var relationsByCloseOrderIDs = "";
        for (var i = 0, count = tempNode.childNodes.length; i < count; i++) {
            var transNode = tempNode.childNodes.item(i);

            var instrumentID = transNode.getAttribute("InstrumentID");
            if (!oInstruments.Exists(instrumentID)) continue; //this Dealer can't do this instrument

            var tran = null;
            var transactionID = transNode.getAttribute("ID");
            if (oTransactions.Exists(transactionID)) {
                tran = oTransactions.item(transactionID);
            }
            else {
                tran = new Transaction();
            }

            tran.UpdateByXmlNode(transNode);
            tran.phase = TransPhase.Executed;

            //PlaySound
            if (tran.orderType == OrderType.Risk) {
                //                if (tran.approverID == "00000000-0000-0000-0000-000000000000") {
                //                    this.PlaySound2(1);
                //                }
                //                else {
                //                    this.PlaySound2(2);
                //                }
                this.PlaySound(SoundOption.DQTradeSucceed);
            }

            for (var j = 0, count2 = transNode.childNodes.length; j < count2; j++) {
                var order;
                switch (tran.orderType) {
                    case OrderType.SpotTrade:
                        order = new DQOrder();
                        break;
                    case OrderType.Limit:
                        order = new LMTOrder();
                        break;
                    case OrderType.Market:
                        order = new MKTOrder();
                        break;
                    case OrderType.MarketOnOpen:
                        order = new MOOOrder();
                        break;
                    case OrderType.MarketOnClose:
                        order = new MOCOrder();
                        break;
                    default:
                        order = new Order();
                        break;
                }
                order.mainWindow = this.mainWindow;
                order.tran = tran;
                tran.orders.push(order);

                var orderNode = transNode.childNodes.item(j);
                order.UpdateByXmlNode(orderNode);

                if (!order.isOpen) {
                    for (var k = 0, kCount = orderNode.childNodes.length; k < kCount; k++) {
                        var orderRelation = new OrderRelation();
                        orderRelation.UpdateByXmlNode(orderNode.childNodes.item(k));
                        order.orderRelations.push(orderRelation);
                    }
                }

                if (tran.subType == TransSubType.Match) {//When matching, PlaceCommand may arrives after cutCommand,
                    //so cache Cutted lot(Matched lot) here and use them to get correct lot in handling PlaceCommand

                    if (!oCanceledOrCuttedTransactionIds.Exists(transactionID)) oCanceledOrCuttedTransactionIds.Add(transactionID, null);

                    var assigningOrderId = "";
                    if (typeof (tran.assigningOrderId) != 'undefined' && tran.assigningOrderId != null && tran.assigningOrderId != "") {
                        assigningOrderId = tran.assigningOrderId;
                    }
                    else {
                        assigningOrderId = order.id; //When order is matched entirely, no assigningOrderId info
                        //use order id as assigningOrderId for coding consistency in this case 
                    }

                    var assigningOrder = null;
                    var orders = (new VBArray(this.mainWindow.oPendingOrders.Items())).toArray();
                    for (var index = 0, count3 = orders.length; index < count3; index++) {
                        if (orders[index].id == assigningOrderId) {
                            assigningOrder = orders[index];
                            break;
                        }
                    }
                    if (assigningOrder == null) {
                        var orders = (new VBArray(this.mainWindow.oDeformityOrders.Items())).toArray();
                        for (var index = 0, count3 = orders.length; index < count3; index++) {
                            if (orders[index].id == assigningOrderId) {
                                assigningOrder = orders[index];
                                break;
                            }
                        }
                    }
                    if (assigningOrder != null) {
                        assigningOrder.lot -= order.lot;
                        if (assigningOrder.lot <= 0) {
                            this.mainWindow.parent.orderTaskFrm.RemoveOrderFromGrid(assigningOrder);
                            var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
                            instantOrderByInstrumentIFrame._InstantOrderListFrame1.RemoveOrderFromGrid(assigningOrder);
                            instantOrderByInstrumentIFrame._InstantOrderListFrame2.RemoveOrderFromGrid(assigningOrder);
                            instantOrderByInstrumentIFrame._InstantOrderListFrame3.RemoveOrderFromGrid(assigningOrder);
                            instantOrderByInstrumentIFrame._InstantOrderListFrame4.RemoveOrderFromGrid(assigningOrder);

                            if (this.mainWindow.oPendingOrders.Exists(assigningOrder.id)) {
                                this.mainWindow.oPendingOrders.Remove(assigningOrder.id);
                            }
                            else if (this.mainWindow.oDeformityOrders.Exists(assigningOrder.id)) {
                                this.mainWindow.oDeformityOrders.Remove(assigningOrder.id);
                            }
                            continue;
                        }

                        for (var row = vsflexOrderTask.Rows - 1, fRow = vsflexOrderTask.FixedRows; row >= fRow; row--) {
                            var data = vsflexOrderTask.RowData(row);
                            if (!data || !data.object) continue;
                            var type = data.type;
                            if (data.object == assigningOrder) {
                                if (assigningOrder.isBuy) {
                                    vsflexOrderTask.TextMatrix(row, vsflexOrderTask.ColIndex("BuyLot")) = assigningOrder.GetFormatLot2(assigningOrder.lot);
                                }
                                else {
                                    vsflexOrderTask.TextMatrix(row, vsflexOrderTask.ColIndex("SellLot")) = assigningOrder.GetFormatLot2(assigningOrder.lot);
                                }
                                break;
                            }
                        }
                    }
                    else {
                        var matchedLot = order.lot;
                        if (oSourceOrderIdToMatchedLot.Exists(tran.assigningOrderId)) {
                            matchedLot += oSourceOrderIdToMatchedLot.Item(tran.assigningOrderId);
                            oSourceOrderIdToMatchedLot.Remove(tran.assigningOrderId);
                        }
                        oSourceOrderIdToMatchedLot.Add(tran.assigningOrderId, matchedLot);
                    }
                }

                //Modified by Michael on 2005-11-11	
                //tran.Begin();

                ////add this order to ExecuteGrid
                //var wndExecuteOrders = parent.toolBarFrm.oWndExecuteOrders;
                //if(wndExecuteOrders && (wndExecuteOrders.closed == false) && wndExecuteOrders.AddOrderToExecuteOrderGrid)
                //	wndExecuteOrders.AddOrderToExecuteOrderGrid(order);

                //                if (order.isOpen == 0) {
                //                    relationsByCloseOrderIDs += "<CloseOrderID ID='" + order.id + "'></CloseOrderID>";
                //                }
            }

            //Modified by Michael on 2005-11-11
            tran.Begin();

            for (var indexExecute in tran.orders) {
                var instrument = tran.orders[indexExecute].GetInstrument();
                if (instrument != null) {
                    instrument.AddOrderProcessBuySellLot(tran.orders[indexExecute]);
                    //Refresh UI...
                    this.mainWindow.UpdateTotalBuySellLot(instrument);
                    this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
                }
            }

            //add this order to ExecuteGrid
            try {
                var wndExecuteOrders = parent.toolBarFrm.oWndExecuteOrders;
                if (wndExecuteOrders && wndExecuteOrders.closed == false) {
                    for (var indexExecute in tran.orders) {
                        wndExecuteOrders.AddOrderToExecuteOrderGrid(this.mainWindow, tran.orders[indexExecute]);
                    }
                }
            }
            catch (ex)
			{ }
            try {
                var wndOpenInterest = parent.toolBarFrm.oWndOpenInterest;
                if (wndOpenInterest && wndOpenInterest.closed == false) {
                    for (var indexExecute in tran.orders) {
                        wndOpenInterest.AddOrderToOpenInterestGrid(this.mainWindow, tran.orders[indexExecute]);
                    }
                }
            }
            catch (ex)
			{ }

            try {
                for (var indexExecute in tran.orders) {
                    var order2 = tran.orders[indexExecute];
                    var account = order2.GetAccount();
                    if (account && account.type == AccountType.BlackList) {
                        this.PlaySound2(3);
                        break;
                    }
                }
            }
            catch (ex)
			{ }

            for (var indexExecute in tran.orders) {
                var order2 = tran.orders[indexExecute];
                order2.ExecuteOrderOutput();
            }
        }

        //        if (relationsByCloseOrderIDs != "") this.GetRelationsByCloseOrderID(relationsByCloseOrderIDs);
    };

    this.Place = function (tempNode) {
        this.Place(tempNode, false);
    };

    this.Place = function (tempNode, isExecuted) {
        for (var i = 0, counti = tempNode.childNodes.length; i < counti; i++) {
            var transNode = tempNode.childNodes.item(i);
            if (transNode.nodeName != "Transaction") continue;
            var transactionID = transNode.getAttribute("ID");

            if (oCanceledOrCuttedTransactionIds.Exists(transactionID)) {
                oCanceledOrCuttedTransactionIds.Remove(transactionID);
                continue;
            }

            var instrumentID = transNode.getAttribute("InstrumentID");
            if (!oInstruments.Exists(instrumentID)) continue; //this Dealer can't do this instrument

            var tran = new Transaction(transactionID);
            if (oTransactions.Exists(tran.id)) oTransactions.Remove(tran.id);
            oTransactions.Add(tran.id, tran);
            tran.UpdateByXmlNode(transNode);

            //Remarked by Michael on 2009-02-09
            //			tran.phase = TransPhase.Placing;
            //			var isValidateAutoAcceptOthers = tran.ValidateAutoAcceptOthers(oInstruments.Item(instrumentID));
            //			if (isValidateAutoAcceptOthers)
            //			{
            //				tran.phase = TransPhase.Placed;
            //			}
            //			else
            ////		{
            //	        this.PlaySound(SoundOption.LimitNewOrder);
            //			}

            /*tran.code = transNode.getAttribute("Code");
            tran.type = parseInt( transNode.getAttribute("Type") );
            tran.orderType = parseInt( transNode.getAttribute("OrderType") );
            tran.accountID = transNode.getAttribute("AccountID");
            tran.instrumentID = transNode.getAttribute("InstrumentID");
            tran.beginTime = new Date( transNode.getAttribute("BeginTime").replace(/-/g, "/") );
            tran.endTime = new Date( transNode.getAttribute("EndTime").replace(/-/g, "/") );
            tran.submitTime = new Date( transNode.getAttribute("SubmitTime").replace(/-/g, "/") );
            tran.approverID = transNode.getAttribute("ApproverID");*/

            for (var j = 0, countj = transNode.childNodes.length; j < countj; j++) {
                var order;
                switch (tran.orderType) {
                    case OrderType.SpotTrade:
                        this.PlaySound(SoundOption.DQNewOrder);
                        order = new DQOrder();
                        break;
                    case OrderType.Limit:
                        this.PlaySound(SoundOption.LimitNewOrder);
                        order = new LMTOrder();
                        break;
                    case OrderType.Market:
                        this.PlaySound(SoundOption.LimitNewOrder);
                        order = new MKTOrder();
                        break;
                    case OrderType.MarketOnOpen:
                        this.PlaySound(SoundOption.LimitNewOrder);
                        order = new MOOOrder();
                        break;
                    case OrderType.MarketOnClose:
                        this.PlaySound(SoundOption.LimitNewOrder);
                        order = new MOCOrder();
                        break;
                    default:
                        this.PlaySound(SoundOption.DQNewOrder);
                        order = new Order();
                        break;
                }
                order.mainWindow = this.mainWindow;
                order.tran = tran;
                tran.orders.push(order);

                var instrument = order.GetInstrument();
                if (!instrument) continue;

                //Added by Michael on 2005-04-08
                //set order.contractSize
                if (!tran.contractSize) {
                    var account = order.GetAccount();
                    if (account) {
                        var tradePolicyDetail = instrument.GetTradePolicyDetail(account.tradePolicyID);
                        if (tradePolicyDetail)
                            order.tran.contractSize = tradePolicyDetail.contractSize;
                    }
                }

                var orderNode = transNode.childNodes.item(j);
                order.UpdateByXmlNode(orderNode);

                if (oSourceOrderIdToMatchedLot.Exists(order.id)) {
                    var matchedLot = oSourceOrderIdToMatchedLot.Item(order.id);
                    oSourceOrderIdToMatchedLot.Remove(order.id);
                    order.lot -= matchedLot;
                    if (order.lot <= 0) return;
                }

                if (!order.isOpen) {
                    var relationNode = orderNode.childNodes.item(0);
                    var openOrderID = relationNode.getAttribute("OpenOrderID");

                    var assigningOrderID = transNode.getAttribute("AssigningOrderID");
                    if (assigningOrderID != null && oCloseIdToOpenId.Exists(assigningOrderID)) oCloseIdToOpenId.Remove(assigningOrderID);
                    if (!oCloseIdToOpenId.Exists(order.id)) oCloseIdToOpenId.Add(order.id, openOrderID);
                    var closeIds = null;
                    if (!oOpenIdToCloseId.Exists(openOrderID)) {
                        closeIds = new ActiveXObject("Scripting.Dictionary");
                        oOpenIdToCloseId.Add(openOrderID, closeIds);
                    }
                    else {
                        closeIds = oOpenIdToCloseId.Item(openOrderID);
                    }
                    if (!closeIds.Exists(order.id)) closeIds.Add(order.id, null);
                    if (assigningOrderID != null && closeIds.Exists(assigningOrderID)) closeIds.Remove(assigningOrderID);
                }
                /*order.id = orderNode.getAttribute("ID");
                order.code = orderNode.getAttribute("Code");
                order.lot = parseInt( orderNode.getAttribute("Lot") );
                order.isOpen = (orderNode.getAttribute("IsOpen").toLowerCase() == "true") ? true : false;
                order.isBuy = (orderNode.getAttribute("IsBuy").toLowerCase() == "true") ? true : false;
                var setPrice = orderNode.getAttribute("SetPrice");
                order.setPrice = new Price();
                order.setPrice.Normalize(setPrice, instrument.numeratorUnit, instrument.denominator);
                order.tradeOption = parseInt( orderNode.getAttribute("TradeOption") );
				
                var account = order.GetAccount();
                if(account)
                {
                var tradePolicyDetail = instrument.GetTradePolicyDetail( account.tradePolicyID );
                if(tradePolicyDetail)
                order.tran.contractSize = tradePolicyDetail.contractSize;
                }*/
            }

            tran.Begin(isExecuted);
            this.RemoveLimitOrderChangedToOCO(tran);
        }
    };

    this.RemoveLimitOrderChangedToOCO = function (tran) {
        if (tran.orderType == OrderType.Limit
	    	    && !(typeof (tran.assigningOrderId) == 'undefined' || tran.assigningOrderId == null)
        /*&& oPendingOrders.Exists(tran.assigningOrderId)*/) {
            var assigningOrder = null;
            if (tran.subType == TransactionSubType.IfDone) {
                assigningOrder = GetOrderByAssigningOrderIdAndSubType(tran.assigningOrderId, TransactionSubType.IfDone);
            }
            else {
                assigningOrder = GetOrderById(tran.assigningOrderId);
            }
            if (assigningOrder != null && !assigningOrder.isOpen && tran.id != assigningOrder.tran.id) {
                assigningOrder.Remove();
            }
        }
    };

    //    this.ConvertDateTimeFormat = function(strDateTime) {
    //        var dateTimeValue = strDateTime.replace(/-/g, "/");

    //        //Trim Millisecond		
    //        if (dateTimeValue.length > 4 && dateTimeValue.substr(dateTimeValue.length - 4, 1) == ".")
    //            dateTimeValue = dateTimeValue.substring(0, dateTimeValue.length - 4);
    //        return (dateTimeValue);
    //    };

    this.ConvertDateTimeFormat = function (dateTimeString) {
        var dateTimeValue = dateTimeString.replace(/-/g, "/");

        //Trim Millisecond		
        //if (dateTimeValue.length > 4 && dateTimeValue.substr(dateTimeValue.length-4,1) == ".")
        //	dateTimeValue = dateTimeValue.substring(0,dateTimeValue.length-4);		
        var position = dateTimeValue.lastIndexOf(".");
        if (position > 0) {
            dateTimeValue = dateTimeValue.substring(0, position);
        }

        return (dateTimeValue);
    };

    this.Update = function (tempNode) {
        var isDeleteDealingConsoleInstrumet = false;
        var isRefreshGroupNetPosition = false;

        for (var methodIndex = 0, count = tempNode.childNodes.length; methodIndex < count; methodIndex++) {
            var methodNode = tempNode.childNodes.item(methodIndex);
            for (var rowIndex = 0, count2 = methodNode.childNodes.length; rowIndex < count2; rowIndex++) {
                var rowNode = methodNode.childNodes.item(rowIndex);
                switch (rowNode.nodeName) {
                    case "PrivateDailyQuotation":
                        var id = rowNode.getAttribute("InstrumentID");
                        if (!id) break;
                        else if (methodNode.nodeName == "Modify" || methodNode.nodeName == "Add") {
                            if (!oInstruments.Exists(id)) break;
                            var instrument = oInstruments.Item(id);

                            var tradeDay = new Date(this.ConvertDateTimeFormat(rowNode.getAttribute("TradeDay")));
                            if (tradeDay.valueOf() < new Date(currentTradeDay).valueOf()) {
                                instrument.UpdateByXmlNode(rowNode);
                                //Is require calculate???
                            }
                        }
                        break;
                    case "SystemParameter":
                        for (var index = 0, count3 = rowNode.attributes.length; index < count3; index++) {
                            var attribute = rowNode.attributes.item(index);
                            switch (attribute.nodeName) {
                                case "IsCustomerVisibleToDealer":
                                    IsCustomerVisibleToDealer = (attribute.nodeValue.toLowerCase() == "true" ? true : false);
                                    break;
                                case "CanDealerViewAccountInfo":
                                    CanDealerViewAccountInfo = (attribute.nodeValue.toLowerCase() == "true" ? true : false);
                                    break;
                                case "MooMocAcceptDuration":
                                    MooMocAcceptDuration = parseInt(attribute.nodeValue);
                                    break;
                                case "LotDecimal":
                                    LotDecimal = parseInt(attribute.nodeValue);
                                    break;
                                case "MooMocCancelDuration":
                                    MooMocCancelDuration = parseInt(attribute.nodeValue);
                                    break;
                                case "QuotePolicyDetailID":
                                    QuotePolicyDetailID = attribute.nodeValue;
                                    break;
                            }
                        }
                        break;
                    case "Instruments":
                        for (var instrumentIndex = 0, count3 = rowNode.childNodes.length; instrumentIndex < count3; instrumentIndex++) {
                            var instrumentNode = rowNode.childNodes.item(instrumentIndex);

                            var id = instrumentNode.getAttribute("ID");
                            if (!id) continue;
                            if (methodNode.nodeName == "Delete") {
                                if (oInstruments.Exists(id)) {
                                    var instrument = oInstruments.Item(id);
                                    this.RemoveInstrument(instrument);
                                }
                            }
                            else if (methodNode.nodeName == "Modify") {
                                if (!oInstruments.Exists(id)) continue;
                                var instrument = oInstruments.Item(id);
                                instrument.UpdateByXmlNode(instrumentNode);
                                instrument.clearTempValues();
                                this.mainWindow.OnQuotationPropertiesChanged(instrument, false);
                                var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
                                if (oCurrentInstrumentID == instrument.id) this.mainWindow.OnPropertyInstrumentChanged(instrument);
                            }
                            else if (methodNode.nodeName == "Add") {
                            }
                        }
                        break;
                    case "Instrument":

                        var id = rowNode.getAttribute("ID");
                        if (!id) break;
                        if (methodNode.nodeName == "Delete") {
                            if (oInstruments.Exists(id)) {
                                var instrument = oInstruments.Item(id);
                                this.RemoveInstrument(instrument);
                            }
                        }
                        else if (methodNode.nodeName == "Modify") {
                            if (!oInstruments.Exists(id)) break;
                            var instrument = oInstruments.Item(id);

                            //--------------Modify by Erric for OpenIntests----------
                            var wndOpenInterest = parent.toolBarFrm.oWndOpenInterest;
                            var oldSummaryUnit = instrument.summaryUnit;
                            var oldSummaryQuantity = instrument.summaryQuantity;
                            var currentSummaryUnit = rowNode.getAttribute("SummaryUnit");
                            var currentSummaryQuantity = rowNode.getAttribute("SummaryQuantity");
                            if ((oldSummaryUnit != currentSummaryUnit || parseFloat(oldSummaryQuantity) != parseFloat(currentSummaryQuantity))
                                && (wndOpenInterest && wndOpenInterest.closed == false)
                                && isRefreshGroupNetPosition == false) {
                                wndOpenInterest.RefreshGroupNetPositionGridData();
                                isRefreshGroupNetPosition = true;
                            }
                            //---------------------------------------------------------

                            instrument.UpdateByXmlNode(rowNode);
                            instrument.clearTempValues();
                            this.mainWindow.OnQuotationPropertiesChanged(instrument, false);
                            var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
                            if (oCurrentInstrumentID == instrument.id) this.mainWindow.OnPropertyInstrumentChanged(instrument);
                        }
                        else if (methodNode.nodeName == "Add") {
                        }
                        break;
                    case "Account":
                        var id = rowNode.getAttribute("ID");
                        if (!id) break;
                        if (methodNode.nodeName == "Delete") {
                            if (oAccounts.Exists(id)) {
                                oAccounts.Remove(id);
                            }
                            if (AccountIdList.Exists(id)) {
                                AccountIdList.Remove(id);
                            }
                        }
                        else if (methodNode.nodeName == "Modify") {
                            if (!oAccounts.Exists(id)) break;
                            var account = oAccounts.Item(id);
                            var oldCode = account.code;
                            var groupIDOld = account.groupID;
                            var groupCodeOld = account.groupCode;
                            account.UpdateByXmlNode(rowNode);

                            if (groupIDOld != account.groupID) {
                                var accountGroup = new Group();
                                //accountGroup.UpdateByXmlNode(rowNode);
                                accountGroup.id = account.groupID;
                                accountGroup.code = account.groupCode;
                                oAccountGroups.Item(accountGroup.id) = accountGroup;
                            }
                            if (oldCode != account.code) {
                                this.mainWindow.parent.orderTaskFrm.UpdateAccount(account);
                            }
                        }
                        else if (methodNode.nodeName == "Add") {
                            var account = new Account(id);
                            account.UpdateByXmlNode(rowNode);
                            oAccounts.Add(account.id, account);

                            if (!oAccountGroups.Exists(account.groupID)) {
                                var accountGroup = new Group();
                                accountGroup.id = account.groupID;
                                accountGroup.code = account.groupCode;
                                oAccountGroups.Item(accountGroup.id) = accountGroup;
                            }
                            else {
                                oAccountGroups.Item(account.groupID).code = account.groupCode;
                            }
                        }
                        break;
                    case "Customers":
                        for (var customerIndex = 0, count3 = rowNode.childNodes.length; customerIndex < count3; customerIndex++) {
                            var customerNode = rowNode.childNodes.item(customerIndex);

                            var id = customerNode.getAttribute("ID");
                            if (!id) break;
                            if (methodNode.nodeName == "Delete") {
                                if (oCustomers.Exists(id)) {
                                    oCustomers.Remove(id);
                                }
                            }
                            else if (methodNode.nodeName == "Modify") {
                                if (!oCustomers.Exists(id)) break;
                                var customer = oCustomers.Item(id);
                                customer.UpdateByXmlNode(customerNode);
                            }
                            else if (methodNode.nodeName == "Add") {
                                var customer = new Customer(id);
                                customer.UpdateByXmlNode(customerNode);
                                oCustomers.Add(customer.id, customer);
                            }
                        }
                        break;
                    case "Customer":
                        var id = rowNode.getAttribute("ID");
                        if (!id) break;
                        if (methodNode.nodeName == "Delete") {
                            if (oCustomers.Exists(id)) {
                                oCustomers.Remove(id);
                            }
                        }
                        else if (methodNode.nodeName == "Modify") {
                            if (!oCustomers.Exists(id)) break;
                            var customer = oCustomers.Item(id);
                            customer.UpdateByXmlNode(rowNode);
                        }
                        else if (methodNode.nodeName == "Add") {
                            var customer = new Customer(id);
                            customer.UpdateByXmlNode(rowNode);
                            oCustomers.Add(customer.id, customer);
                        }
                        break;
                    case "QuotePolicy":
                        var id = rowNode.getAttribute("ID");
                        if (!id) break;
                        if (methodNode.nodeName == "Delete") {
                            if (oQuotePolicys.Exists(id)) {
                                var quotePolicy = oQuotePolicys.Item(id);
                                oQuotePolicys.Remove(id);
                                var quotePolicyDetails = (new VBArray(quotePolicy.quotePolicyDetails.Items())).toArray();
                                for (var index = 0, count4 = quotePolicyDetails.length; index < count4; index++) {
                                    var quotePolicyDetail = quotePolicyDetails[index];
                                    if (oInstruments.Exists(quotePolicyDetail.instrumentID)) {
                                        var instrument = oInstruments.Item(quotePolicyDetail.instrumentID);
                                        instrument.DeleteQuotePolicyDetail(quotePolicyDetail);
                                    }
                                }
                            }
                        }
                        else if (methodNode.nodeName == "Modify") {
                            if (!oQuotePolicys.Exists(id)) break;
                            var quotePolicy = oQuotePolicys.Item(id);
                            quotePolicy.UpdateByXmlNode(rowNode);
                        }
                        else if (methodNode.nodeName == "Add") {
                            var quotePolicy = new QuotePolicy(id);
                            quotePolicy.UpdateByXmlNode(rowNode);
                            if (!oQuotePolicys.Exists(quotePolicy.id))
                                oQuotePolicys.Add(quotePolicy.id, quotePolicy);
                        }
                        break;
                    case "QuotePolicyDetails":
                        var needUpdateInstruments = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=Instrument
                        var needUpdateSourceLevelAdjustmentInstruments = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=Instrument

                        for (var quotePolicyDetailIndex = 0, count3 = rowNode.childNodes.length; quotePolicyDetailIndex < count3; quotePolicyDetailIndex++) {
                            var quotePolicyDetailNode = rowNode.childNodes.item(quotePolicyDetailIndex);

                            var instrumentID = quotePolicyDetailNode.getAttribute("InstrumentID");
                            var quotePolicyID = quotePolicyDetailNode.getAttribute("QuotePolicyID");
                            if (!instrumentID || !quotePolicyID) break;
                            if (methodNode.nodeName == "Delete") {
                                if (oQuotePolicys.Exists(quotePolicyID)) {
                                    var quotePolicys = oQuotePolicys.Item(quotePolicyID);
                                    if (quotePolicys.quotePolicyDetails.Exists(instrumentID)) {
                                        var quotePolicyDetail = quotePolicys.quotePolicyDetails.Item(instrumentID);
                                        quotePolicys.quotePolicyDetails.Remove(instrumentID);
                                        if (oInstruments.Exists(instrumentID)) {
                                            var instrument = oInstruments.Item(instrumentID);
                                            instrument.DeleteQuotePolicyDetail(quotePolicyDetail);

                                            if (!needUpdateInstruments.Exists(instrumentID)) {
                                                needUpdateInstruments.Add(instrumentID, instrument);
                                            }
                                            if (this.mainWindow.oCurrentQuotePolicyDetailID == quotePolicyID) {
                                                if (!needUpdateSourceLevelAdjustmentInstruments.Exists(instrumentID)) {
                                                    needUpdateSourceLevelAdjustmentInstruments.Add(instrumentID, instrument);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else if (methodNode.nodeName == "Modify") {
                                if (oQuotePolicys.Exists(quotePolicyID)) {
                                    var quotePolicys = oQuotePolicys.Item(quotePolicyID);
                                    var oldInstrumentID = instrumentID;
                                    if (quotePolicyDetailNode.firstChild)
                                        oldInstrumentID = quotePolicyDetailNode.firstChild.getAttribute("InstrumentID");
                                    if (oldInstrumentID == "")
                                        oldInstrumentID = instrumentID;
                                    if (quotePolicys.quotePolicyDetails.Exists(oldInstrumentID)) {
                                        var quotePolicyDetail = quotePolicys.quotePolicyDetails.Item(oldInstrumentID);

                                        if (oInstruments.Exists(oldInstrumentID)) {
                                            var instrument = oInstruments.Item(oldInstrumentID);
                                            instrument.DeleteQuotePolicyDetail(quotePolicyDetail);
                                        }
                                        if (oInstruments.Exists(instrumentID)) {
                                            var instrument = oInstruments.Item(instrumentID);
                                            instrument.AddQuotePolicyDetail(quotePolicyDetail);

                                            quotePolicyDetail.UpdateByXmlNode(quotePolicyDetailNode);
                                            if (!needUpdateInstruments.Exists(instrumentID)) {
                                                needUpdateInstruments.Add(instrumentID, instrument);
                                            }
                                            if (this.mainWindow.oCurrentQuotePolicyDetailID == quotePolicyID) {
                                                if (!needUpdateSourceLevelAdjustmentInstruments.Exists(instrumentID)) {
                                                    needUpdateSourceLevelAdjustmentInstruments.Add(instrumentID, instrument);
                                                }
                                            }
                                            //                                            this.mainWindow.OnQuotationQuotePolicyDetailChanged(instrument);
                                            //                                            //                                        this.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument,false);
                                            //                                            var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
                                            //                                            if (oCurrentInstrumentID == instrumentID) {
                                            //                                                this.mainWindow.OnPropertyInstrumentChanged(instrument);
                                            //                                                this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
                                            //                                            }

                                            this.EnquiryManager.enquiryWindowManager.ChangedParametersByOuter(quotePolicyDetail);
                                        }
                                        //quotePolicyDetail.UpdateByXmlNode(quotePolicyDetailNode);
                                    }
                                }
                            }
                            else if (methodNode.nodeName == "Add") {
                                var quotePolicyDetail = new QuotePolicyDetail(instrumentID);
                                quotePolicyDetail.UpdateByXmlNode(quotePolicyDetailNode);
                                if (oQuotePolicys.Exists(quotePolicyDetail.quotePolicyID)) {
                                    var quotePolicy = oQuotePolicys.Item(quotePolicyDetail.quotePolicyID);
                                    if (!quotePolicy.quotePolicyDetails.Exists(quotePolicyDetail.instrumentID)) {
                                        quotePolicyDetail.code = quotePolicy.code;
                                        quotePolicyDetail.description = quotePolicy.description;
                                        quotePolicyDetail.isDefault = quotePolicy.isDefault;

                                        quotePolicy.quotePolicyDetails.Add(quotePolicyDetail.instrumentID, quotePolicyDetail);
                                    }
                                    if (oInstruments.Exists(instrumentID)) {
                                        var instrument = oInstruments.Item(instrumentID);
                                        instrument.AddQuotePolicyDetail(quotePolicyDetail);

                                        if (!needUpdateInstruments.Exists(instrumentID)) {
                                            needUpdateInstruments.Add(instrumentID, instrument);
                                        }
                                        if (this.mainWindow.oCurrentQuotePolicyDetailID == quotePolicyDetail.quotePolicyID) {
                                            if (!needUpdateSourceLevelAdjustmentInstruments.Exists(instrumentID)) {
                                                needUpdateSourceLevelAdjustmentInstruments.Add(instrumentID, instrument);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (needUpdateInstruments.Count > 0) {
                            var needUpdateInstruments2 = (new VBArray(needUpdateInstruments.Items())).toArray();
                            for (var index = 0, iCount = needUpdateInstruments2.length; index < iCount; index++) {
                                var instrument = needUpdateInstruments2[index];

                                this.mainWindow.OnQuotationQuotePolicyDetailChanged(instrument);
                                this.mainWindow.OnPropertyInstrumentChanged(instrument);
                                //this.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument, needSendOverridedQuotation);
                                var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
                                if (oCurrentInstrumentID == instrument.id) {
                                    this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
                                }
                            }
                        }

                        if (needUpdateSourceLevelAdjustmentInstruments.Count > 0) {
                            var needUpdateSourceLevelAdjustmentInstruments2 = (new VBArray(needUpdateSourceLevelAdjustmentInstruments.Items())).toArray();
                            for (var index = 0, iCount = needUpdateSourceLevelAdjustmentInstruments2.length; index < iCount; index++) {
                                var instrument = needUpdateSourceLevelAdjustmentInstruments2[index];
                                this.mainWindow.parent.SourceLevelAdjustmentFrm.UpdateReferenceAutoAdjustPoints(instrument);
                            }
                        }
                        break;
                    case "QuotePolicyDetail":
                        var needUpdateInstruments = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=Instrument
                        var needUpdateSourceLevelAdjustmentInstruments = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=Instrument

                        var instrumentID = rowNode.getAttribute("InstrumentID");
                        var quotePolicyID = rowNode.getAttribute("QuotePolicyID");
                        if (!instrumentID || !quotePolicyID) break;
                        if (methodNode.nodeName == "Delete") {
                            if (oQuotePolicys.Exists(quotePolicyID)) {
                                var quotePolicys = oQuotePolicys.Item(quotePolicyID);
                                if (quotePolicys.quotePolicyDetails.Exists(instrumentID)) {
                                    var quotePolicyDetail = quotePolicys.quotePolicyDetails.Item(instrumentID);
                                    quotePolicys.quotePolicyDetails.Remove(instrumentID);
                                    if (oInstruments.Exists(instrumentID)) {
                                        var instrument = oInstruments.Item(instrumentID);
                                        instrument.DeleteQuotePolicyDetail(quotePolicyDetail);

                                        if (!needUpdateInstruments.Exists(instrumentID)) {
                                            needUpdateInstruments.Add(instrumentID, instrument);
                                        }
                                        if (this.mainWindow.oCurrentQuotePolicyDetailID == quotePolicyID) {
                                            if (!needUpdateSourceLevelAdjustmentInstruments.Exists(instrumentID)) {
                                                needUpdateSourceLevelAdjustmentInstruments.Add(instrumentID, instrument);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else if (methodNode.nodeName == "Modify") {
                            if (oQuotePolicys.Exists(quotePolicyID)) {
                                var quotePolicys = oQuotePolicys.Item(quotePolicyID);
                                var oldInstrumentID = instrumentID;
                                if (rowNode.firstChild)
                                    oldInstrumentID = rowNode.firstChild.getAttribute("InstrumentID");
                                if (oldInstrumentID == "")
                                    oldInstrumentID = instrumentID;
                                if (quotePolicys.quotePolicyDetails.Exists(oldInstrumentID)) {
                                    var quotePolicyDetail = quotePolicys.quotePolicyDetails.Item(oldInstrumentID);

                                    if (oInstruments.Exists(oldInstrumentID)) {
                                        var instrument = oInstruments.Item(oldInstrumentID);
                                        instrument.DeleteQuotePolicyDetail(quotePolicyDetail);
                                    }
                                    if (oInstruments.Exists(instrumentID)) {
                                        var instrument = oInstruments.Item(instrumentID);
                                        instrument.AddQuotePolicyDetail(quotePolicyDetail);

                                        quotePolicyDetail.UpdateByXmlNode(rowNode);
                                        if (!needUpdateInstruments.Exists(instrumentID)) {
                                            needUpdateInstruments.Add(instrumentID, instrument);
                                        }
                                        if (this.mainWindow.oCurrentQuotePolicyDetailID == quotePolicyID) {
                                            if (!needUpdateSourceLevelAdjustmentInstruments.Exists(instrumentID)) {
                                                needUpdateSourceLevelAdjustmentInstruments.Add(instrumentID, instrument);
                                            }
                                        }
                                        //                                        this.mainWindow.OnQuotationQuotePolicyDetailChanged(instrument);
                                        //                                        //                                        this.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument,false);
                                        //                                        var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
                                        //                                        if (oCurrentInstrumentID == instrumentID) {
                                        //                                            this.mainWindow.OnPropertyInstrumentChanged(instrument);
                                        //                                            this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
                                        //                                        }

                                        this.EnquiryManager.enquiryWindowManager.ChangedParametersByOuter(quotePolicyDetail);
                                    }
                                    //quotePolicyDetail.UpdateByXmlNode(rowNode);
                                }
                            }
                        }
                        else if (methodNode.nodeName == "Add") {
                            var quotePolicyDetail = new QuotePolicyDetail(instrumentID);
                            quotePolicyDetail.UpdateByXmlNode(rowNode);
                            if (oQuotePolicys.Exists(quotePolicyDetail.quotePolicyID)) {
                                var quotePolicy = oQuotePolicys.Item(quotePolicyDetail.quotePolicyID);
                                if (!quotePolicy.quotePolicyDetails.Exists(quotePolicyDetail.instrumentID)) {
                                    quotePolicyDetail.code = quotePolicy.code;
                                    quotePolicyDetail.description = quotePolicy.description;
                                    quotePolicyDetail.isDefault = quotePolicy.isDefault;

                                    quotePolicy.quotePolicyDetails.Add(quotePolicyDetail.instrumentID, quotePolicyDetail);
                                }
                                if (oInstruments.Exists(instrumentID)) {
                                    var instrument = oInstruments.Item(instrumentID);
                                    instrument.AddQuotePolicyDetail(quotePolicyDetail);

                                    if (!needUpdateInstruments.Exists(instrumentID)) {
                                        needUpdateInstruments.Add(instrumentID, instrument);
                                    }
                                    if (this.mainWindow.oCurrentQuotePolicyDetailID == quotePolicyDetail.quotePolicyID) {
                                        if (!needUpdateSourceLevelAdjustmentInstruments.Exists(instrumentID)) {
                                            needUpdateSourceLevelAdjustmentInstruments.Add(instrumentID, instrument);
                                        }
                                    }
                                }
                            }
                        }
                        if (needUpdateInstruments.Count > 0) {
                            var needUpdateInstruments2 = (new VBArray(needUpdateInstruments.Items())).toArray();
                            for (var index = 0, iCount = needUpdateInstruments2.length; index < iCount; index++) {
                                var instrument = needUpdateInstruments2[index];

                                this.mainWindow.OnQuotationQuotePolicyDetailChanged(instrument);
                                this.mainWindow.OnPropertyInstrumentChanged(instrument);
                                //this.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument, needSendOverridedQuotation);
                                var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
                                if (oCurrentInstrumentID == instrument.id) {
                                    this.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
                                }
                            }
                        }

                        if (needUpdateSourceLevelAdjustmentInstruments.Count > 0) {
                            var needUpdateSourceLevelAdjustmentInstruments2 = (new VBArray(needUpdateSourceLevelAdjustmentInstruments.Items())).toArray();
                            for (var index = 0, iCount = needUpdateSourceLevelAdjustmentInstruments2.length; index < iCount; index++) {
                                var instrument = needUpdateSourceLevelAdjustmentInstruments2[index];
                                this.mainWindow.parent.SourceLevelAdjustmentFrm.UpdateReferenceAutoAdjustPoints(instrument);
                            }
                        }
                        break;
                    case "TradePolicy":
                        var id = rowNode.getAttribute("ID");
                        if (!id) break;
                        if (methodNode.nodeName == "Delete") {
                            if (oTradePolicys.Exists(id)) {
                                var tradePolicy = oTradePolicys.Item(id);
                                oTradePolicys.Remove(id);
                                var tradePolicyDetails = (new VBArray(tradePolicy.tradePolicyDetails.Items())).toArray();
                                for (var index = 0, count4 = tradePolicyDetails.length; index < count4; index++) {
                                    var tradePolicyDetail = tradePolicyDetails[index];
                                    if (oInstruments.Exists(tradePolicyDetail.instrumentID)) {
                                        var instrument = oInstruments.Item(tradePolicyDetail.instrumentID);
                                        instrument.DeleteTradePolicyDetail(tradePolicyDetail);
                                    }
                                }
                            }
                        }
                        else if (methodNode.nodeName == "Modify") {
                            if (!oTradePolicys.Exists(id)) break;
                            var tradePolicy = oTradePolicys.Item(id);
                            tradePolicy.UpdateByXmlNode(rowNode);
                        }
                        else if (methodNode.nodeName == "Add") {
                            var tradePolicy = new TradePolicy(id);
                            tradePolicy.UpdateByXmlNode(rowNode);
                            if (!oTradePolicys.Exists(tradePolicy.id))
                                oTradePolicys.Add(tradePolicy.id, tradePolicy);
                        }
                        break;
                    case "TradePolicyDetail":
                        var instrumentID = rowNode.getAttribute("InstrumentID");
                        var tradePolicyID = rowNode.getAttribute("TradePolicyID");
                        if (!instrumentID || !tradePolicyID) break;
                        if (methodNode.nodeName == "Delete") {
                            if (oTradePolicys.Exists(tradePolicyID)) {
                                var tradePolicys = oTradePolicys.Item(tradePolicyID);
                                if (tradePolicys.tradePolicyDetails.Exists(instrumentID)) {
                                    var tradePolicyDetail = tradePolicys.tradePolicyDetails.Item(instrumentID);
                                    tradePolicys.tradePolicyDetails.Remove(instrumentID);
                                    if (oInstruments.Exists(instrumentID)) {
                                        var instrument = oInstruments.Item(instrumentID);
                                        instrument.DeleteTradePolicyDetail(tradePolicyDetail);
                                    }
                                }
                            }
                        }
                        else if (methodNode.nodeName == "Modify") {
                            if (oTradePolicys.Exists(tradePolicyID)) {
                                var oldInstrumentID = instrumentID;
                                if (rowNode.firstChild)
                                    oldInstrumentID = rowNode.firstChild.getAttribute("InstrumentID");
                                if (oldInstrumentID == "")
                                    oldInstrumentID = instrumentID;
                                var tradePolicys = oTradePolicys.Item(tradePolicyID);
                                if (tradePolicys.tradePolicyDetails.Exists(oldInstrumentID)) {
                                    var tradePolicyDetail = tradePolicys.tradePolicyDetails.Item(oldInstrumentID);

                                    if (oInstruments.Exists(oldInstrumentID)) {
                                        var instrument = oInstruments.Item(oldInstrumentID);
                                        instrument.DeleteTradePolicyDetail(tradePolicyDetail);
                                    }
                                    if (oInstruments.Exists(instrumentID)) {
                                        var instrument = oInstruments.Item(instrumentID);
                                        instrument.AddTradePolicyDetail(tradePolicyDetail);
                                    }

                                    tradePolicyDetail.UpdateByXmlNode(rowNode);
                                }
                            }
                        }
                        else if (methodNode.nodeName == "Add") {
                            var tradePolicyDetail = new TradePolicyDetail(instrumentID);
                            tradePolicyDetail.UpdateByXmlNode(rowNode);
                            if (oTradePolicys.Exists(tradePolicyDetail.tradePolicyID)) {
                                var tradePolicy = oTradePolicys.Item(tradePolicyDetail.tradePolicyID);
                                if (!tradePolicy.tradePolicyDetails.Exists(tradePolicyDetail.instrumentID))
                                    tradePolicy.tradePolicyDetails.Add(tradePolicyDetail.instrumentID, tradePolicyDetail);
                                if (oInstruments.Exists(instrumentID)) {
                                    var instrument = oInstruments.Item(instrumentID);
                                    instrument.AddTradePolicyDetail(tradePolicyDetail);
                                }
                            }
                        }
                        break;
                    case "TradePolicyDetails":
                        for (var tradePolicyDetailIndex = 0, count3 = rowNode.childNodes.length; tradePolicyDetailIndex < count3; tradePolicyDetailIndex++) {
                            var tradePolicyDetailNode = rowNode.childNodes.item(tradePolicyDetailIndex);

                            var instrumentID = tradePolicyDetailNode.getAttribute("InstrumentID");
                            var tradePolicyID = tradePolicyDetailNode.getAttribute("TradePolicyID");
                            if (!instrumentID || !tradePolicyID) break;
                            if (methodNode.nodeName == "Delete") {
                                if (oTradePolicys.Exists(tradePolicyID)) {
                                    var tradePolicys = oTradePolicys.Item(tradePolicyID);
                                    if (tradePolicys.tradePolicyDetails.Exists(instrumentID)) {
                                        var tradePolicyDetail = tradePolicys.tradePolicyDetails.Item(instrumentID);
                                        tradePolicys.tradePolicyDetails.Remove(instrumentID);
                                        if (oInstruments.Exists(instrumentID)) {
                                            var instrument = oInstruments.Item(instrumentID);
                                            instrument.DeleteTradePolicyDetail(tradePolicyDetail);
                                        }
                                    }
                                }
                            }
                            else if (methodNode.nodeName == "Modify") {
                                if (oTradePolicys.Exists(tradePolicyID)) {
                                    var oldInstrumentID = instrumentID;
                                    if (tradePolicyDetailNode.firstChild)
                                        oldInstrumentID = tradePolicyDetailNode.firstChild.getAttribute("InstrumentID");
                                    if (oldInstrumentID == "")
                                        oldInstrumentID = instrumentID;
                                    var tradePolicys = oTradePolicys.Item(tradePolicyID);
                                    if (tradePolicys.tradePolicyDetails.Exists(oldInstrumentID)) {
                                        var tradePolicyDetail = tradePolicys.tradePolicyDetails.Item(oldInstrumentID);

                                        if (oInstruments.Exists(oldInstrumentID)) {
                                            var instrument = oInstruments.Item(oldInstrumentID);
                                            instrument.DeleteTradePolicyDetail(tradePolicyDetail);
                                        }
                                        if (oInstruments.Exists(instrumentID)) {
                                            var instrument = oInstruments.Item(instrumentID);
                                            instrument.AddTradePolicyDetail(tradePolicyDetail);
                                        }

                                        tradePolicyDetail.UpdateByXmlNode(tradePolicyDetailNode);
                                    }
                                }
                            }
                            else if (methodNode.nodeName == "Add") {
                                var tradePolicyDetail = new TradePolicyDetail(instrumentID);
                                tradePolicyDetail.UpdateByXmlNode(tradePolicyDetailNode);
                                if (oTradePolicys.Exists(tradePolicyDetail.tradePolicyID)) {
                                    var tradePolicy = oTradePolicys.Item(tradePolicyDetail.tradePolicyID);
                                    if (!tradePolicy.tradePolicyDetails.Exists(tradePolicyDetail.instrumentID))
                                        tradePolicy.tradePolicyDetails.Add(tradePolicyDetail.instrumentID, tradePolicyDetail);
                                    if (oInstruments.Exists(instrumentID)) {
                                        var instrument = oInstruments.Item(instrumentID);
                                        instrument.AddTradePolicyDetail(tradePolicyDetail);
                                    }
                                }
                            }
                        }
                        break;
                    case "DealingConsoleInstrument":
                        isDeleteDealingConsoleInstrumet = true;

                        var instrumentID = rowNode.getAttribute("InstrumentID");
                        if (methodNode.nodeName == "Delete") {
                            if (oInstrumentList.Exists(instrumentID)) {
                                oInstrumentList.Remove(instrumentID);
                            }
                        }
                        break;
                }
            }
        }

        if (isDeleteDealingConsoleInstrumet) {
            //var instrumentIDXml = "";
            var instrumentIDs = new Array();
            var instruments = (new VBArray(oInstrumentList.Keys())).toArray();
            for (var index = 0, count3 = instruments.length; index < count3; index++) {
                var id = instruments[index];
                //instrumentIDXml += "<Item ID=\"" + id + "\" />";
                instrumentIDs.push(id);
            }
            //            instrumentIDXml = "<Items>" + instrumentIDXml + "</Items>";
            //            oIOProxy.UpdateInstrumentSettingXml(null, instrumentIDXml); //instruments.join("|"));
            oIOProxy.UpdateInstrumentSettingXml(null, instrumentIDs); //instruments.join("|"));
        }
    };

    //this.message = "";	
    this.enterLine = "\t\n";
    this.SetQuotation = function (quotation) {
        //var beginTime = new Date();
        //var beginTime1 = beginTime;
        //this.message="";

        if (!quotation) { return; }

        if (typeof (vsflexQuotationTask) == 'undefined' || vsflexQuotationTask == null) vsflexQuotationTask = this.mainWindow.parent.quotationTaskFrm.vsflexQuotationTask;
        vsflexQuotation.Redraw = false;
        vsflexQuotationTask.Redraw = false;

        var originQs = quotation.getAttribute("Origin");
        var overridedQs = quotation.getAttribute("Overrided");
        if (originQs && originQs != "") {
            this.SetOriginQuotation(originQs);
            //this.message += this.enterLine + "SetOriginQuotation--" + (new Date() - beginTime).toString() + this.enterLine;
            //beginTime = new Date();			
        }
        if (overridedQs && overridedQs != "") {
            this.SetOverridedQuotation(overridedQs);
            //this.message += "SetOverridedQuotation--" + (new Date() - beginTime).toString() + this.enterLine;			
            //beginTime = new Date();						
        }

        vsflexQuotation.Redraw = true;
        vsflexQuotationTask.Redraw = true;

        //this.message += "SetQuotation--" + (new Date() - beginTime1).toString() + this.enterLine;

        //oIOProxy.Debug2("Quotation--",this.message);

    };

    this.SetOriginQuotation = function (quotations) {
        var quotationStrings = quotations.split(Delimiter.Row);
        for (i = 0, iCount = quotationStrings.length; i < iCount; i++) {
            var quotationString = quotationStrings[i].split(Delimiter.Col);

            var instrumentID = quotationString[0];
            if (!this.mainWindow.oInstruments.Exists(instrumentID)) continue;
            var instrument = this.mainWindow.oInstruments.Item(instrumentID);
            var quotation = ObjectPool.GetQuotation();
            quotation.Parse(instrument, quotationString, true);

            //var beginTime = new Date();			

            instrument.SetOriginQuotation2(quotation);

            //this.message += instrument.message + this.enterLine + this.enterLine;
            //this.message += "SetOriginQuotation2--" + (new Date() - beginTime).toString() + this.enterLine;	

            ObjectPool.ReleaseQuotation(quotation);
        }
        //this.message += "SetOriginQuotation2.quotations.Count--" + quotationStrings.length.toString() + this.enterLine;
    };

    this.SetOverridedQuotation = function (quotations) {
        var quotationStrings = quotations.split(Delimiter.Row);
        for (i = 0, iCount = quotationStrings.length; i < iCount; i++) {
            var quotationString = quotationStrings[i].split(Delimiter.Col);

            var instrumentID = quotationString[0];
            if (!this.mainWindow.oInstruments.Exists(instrumentID)) continue;
            var instrument = this.mainWindow.oInstruments.Item(instrumentID);

            var quotation = ObjectPool.GetQuotation();
            quotation.Parse(instrument, quotationString, false);

            instrument.SetOverridedQuotation(quotation);
            ObjectPool.ReleaseQuotation(quotation);
        }
        //this.message += "SetOverridedQuotation.quotations.Count--" + quotationStrings.length.toString();		
    };

    this.Quote = function (tempNode) {
        var customerID = tempNode.getAttribute("CustomerID");
        var instrumentID = tempNode.getAttribute("InstrumentID");
        //Modified by Michael on 2005-04-08
        //var quoteLot = parseInt(tempNode.getAttribute("QuoteLot"));
        var quoteLot = parseFloat(tempNode.getAttribute("QuoteLot"));

        var bsStatus = parseInt(tempNode.getAttribute("BSStatus"));
        var enquiry = new Enquiry(instrumentID, customerID, quoteLot, bsStatus);

        var instrument;
        var customer;
        if (this.mainWindow.oInstruments.Exists(instrumentID))
            enquiry.instrument = this.mainWindow.oInstruments.Item(instrumentID);
        if (this.mainWindow.oCustomers.Exists(customerID)) {
            enquiry.customer = this.mainWindow.oCustomers.Item(customerID);
        }
        else {
            this.mainWindow.oDeformityEnquiry.push(enquiry);
            oIOProxy.GetCustomer(customerID);
        }

        if (enquiry.instrument && enquiry.customer && enquiry.lot) {
            this.mainWindow.parent.quotationTaskFrm.AddTaskEnquiry(enquiry);
        }
    };

    this.Quote2 = function (tempNode) {
        var customerID = tempNode.getAttribute("CustomerID");
        var instrumentID = tempNode.getAttribute("InstrumentID");
        //Modified by Michael on 2005-04-08
        var buyQuoteLot = parseFloat(tempNode.getAttribute("BuyQuoteLot"));
        var sellQuoteLot = parseFloat(tempNode.getAttribute("SellQuoteLot"));
        var tick = parseInt(tempNode.getAttribute("Tick"));
        var enquiry = new Enquiry2(instrumentID, customerID, buyQuoteLot, sellQuoteLot, tick);

        var instrument;
        var customer;
        if (this.mainWindow.oInstruments.Exists(instrumentID))
            enquiry.instrument = this.mainWindow.oInstruments.Item(instrumentID);
        if (this.mainWindow.oCustomers.Exists(customerID)) {
            enquiry.customer = this.mainWindow.oCustomers.Item(customerID);
        }
        else {
            this.mainWindow.oDeformityEnquiry2.push(enquiry);
            oIOProxy.GetCustomer(customerID);
        }

        if (enquiry.instrument && enquiry.customer) {
            enquiry.SetQuotePolicyDetail();
            if (enquiry.quotePolicyDetailCode == "") return;

            //enquiry.Set_Tick(oEnquiryWaitTime);
            this.EnquiryManager.AddEnquiry(enquiry);
        }
    };

    this.RefreshUiForAddEnquiry2 = function (enquiry) {
        var instrumentEnquiryUnit = this.EnquiryManager.GetInstrumentEnquiryUnit(enquiry.instrumentID);
        var quotePolicyDetailEnquiry = null;
        if (instrumentEnquiryUnit != null) {
            quotePolicyDetailEnquiry = instrumentEnquiryUnit.GetQuotePolicyDetailEnquiry(enquiry.quotePolicyDetailCode);
        }
        this.mainWindow.parent.quotationTaskFrm.AddTaskEnquiry2(instrumentEnquiryUnit, quotePolicyDetailEnquiry, enquiry);
    };

    //Added by Michael on 2007-07-16
    this.CancelQuote2 = function (tempNode) {
        var customerID = tempNode.getAttribute("CustomerID");
        var instrumentID = tempNode.getAttribute("InstrumentID");
        //Modified by Michael on 2005-04-08
        var buyQuoteLot = parseFloat(tempNode.getAttribute("BuyQuoteLot"));
        var sellQuoteLot = parseFloat(tempNode.getAttribute("SellQuoteLot"));
        var tick = parseInt(tempNode.getAttribute("Tick"));
        var enquiry = new Enquiry2(instrumentID, customerID, buyQuoteLot, sellQuoteLot, tick);

        var instrument;
        var customer;
        if (this.mainWindow.oInstruments.Exists(instrumentID))
            enquiry.instrument = this.mainWindow.oInstruments.Item(instrumentID);
        if (this.mainWindow.oCustomers.Exists(customerID)) {
            enquiry.customer = this.mainWindow.oCustomers.Item(customerID);
        }
        else {
            return;
        }

        if (enquiry.instrument && enquiry.customer) {
            enquiry.SetQuotePolicyDetail();
            if (enquiry.quotePolicyDetailCode == "") return;

            this.EnquiryManager.RemoveEnquiry(enquiry);
        }
    };

    this.RefreshUiForRemoveEnquiry2 = function (enquiry) {
        var instrumentEnquiryUnit = this.EnquiryManager.GetInstrumentEnquiryUnit(enquiry.instrumentID);
        var quotePolicyDetailEnquiry = null;
        if (instrumentEnquiryUnit != null) {
            quotePolicyDetailEnquiry = instrumentEnquiryUnit.GetQuotePolicyDetailEnquiry(enquiry.quotePolicyDetailCode);
        }
        this.mainWindow.parent.quotationTaskFrm.RemoveTaskEnquiry2(instrumentEnquiryUnit, quotePolicyDetailEnquiry, enquiry);
    };

    //Modified by Michael on 2006-09-29
    this.Cancel = function (tempNode) {
        var orderType;
        var isCancel = false;
        var transactionID = tempNode.getAttribute("TransactionID");
        var errorCode = tempNode.getAttribute("ErrorCode");
        var cancelType = tempNode.getAttribute("CancelType");

        //alert(errorCode);

        var orders = (new VBArray(this.mainWindow.oPendingOrders.Items())).toArray();
        for (var index = 0, count = orders.length; index < count; index++) {
            if (orders[index].tran.id == transactionID) {
                //orders[index].tran.Cancel();
                if (errorCode == 0) {//0 = OK, means the order is canceled
                    if (orders[index].tran.type == TransType.OCO) {
                        orders[index].tran.Cancel();
                    }
                    else {
                        orders[index].Cancel();
                    }
                }
                else {
                    orders[index].ComfirmCancel(cancelType);
                }

                orderType = orders[index].tran.orderType;
                isCancel = true;
                break;
            }
        }

        if (!isCancel) {
            var orders = (new VBArray(this.mainWindow.oDeformityOrders.Items())).toArray();
            for (var index = 0, count = orders.length; index < count; index++) {
                if (orders[index].tran.id == transactionID) {
                    //orders[index].tran.Cancel();
                    if (errorCode == 0) {//0 = OK, means the order is canceled
                        if (orders[index].tran.type == TransType.OCO) {
                            orders[index].tran.Cancel();
                        }
                        else {
                            orders[index].Cancel();
                        }
                    }
                    else {
                        orders[index].ComfirmCancel(cancelType);
                    }
                    orderType = orders[index].tran.orderType;
                    //isCancel = true;
                    break;
                }
            }
        }
        if (!isCancel && !oCanceledOrCuttedTransactionIds.Exists(transactionID)) oCanceledOrCuttedTransactionIds.Add(transactionID, null);
        //this.PlaySound(orderType == OrderType.SpotTrade ? SoundOption.DQTradeFailed : SoundOption.LimitTradeFailed);
    };

    this.AddAccount = function (msXml) {
        var commandNode = msXml.firstChild;
        var account = new Account(commandNode.getAttribute("ID"));
        account.UpdateByXmlNode(commandNode);
        //        //account.id = commandNode.getAttribute("ID");
        //        account.code = commandNode.getAttribute("Code");
        //        account.type = commandNode.getAttribute("Type");
        //        account.tradePolicyID = commandNode.getAttribute("TradePolicyID");
        //        account.customerID = commandNode.getAttribute("CustomerID");

        if (this.mainWindow.oAccounts.Exists(account.id))
            this.mainWindow.oAccounts.Remove(account.id);
        this.mainWindow.oAccounts.Add(account.id, account);
    };

    this.GetInstrumentById = function (id) {
        if (oInstruments.Exists(id)) {
            return oInstruments.Item(id);
        }
        return null;
    };

    this.GetAccountById = function (id) {
        if (oAccounts.Exists(id)) {
            return oAccounts.Item(id);
        }
        return null;
    };

    this.GetAccount = function (msXml) {
        var commandNode = msXml.firstChild;
        var account = new Account(commandNode.getAttribute("ID"));
        account.UpdateByXmlNode(commandNode);
        //        //account.id = commandNode.getAttribute("ID");
        //        account.code = commandNode.getAttribute("Code");
        //        account.type = commandNode.getAttribute("Type");
        //        account.tradePolicyID = commandNode.getAttribute("TradePolicyID");
        //        account.customerID = commandNode.getAttribute("CustomerID");
        //        //account.rateLotMultiplier = parseFloat(commandNode.getAttribute("RateLotMultiplier"));

        if (this.mainWindow.oAccounts.Exists(account.id))
            this.mainWindow.oAccounts.Remove(account.id);
        this.mainWindow.oAccounts.Add(account.id, account);

        var wndExecuteOrders = parent.toolBarFrm.oWndExecuteOrders;
        if (wndExecuteOrders && (wndExecuteOrders.closed == false) && wndExecuteOrders.UpdateAccount)
            wndExecuteOrders.UpdateAccount(account);

        if (!this.mainWindow.oCustomers.Exists(account.customerID))
            oIOProxy.GetCustomer(account.customerID);
        else {
            var orders = (new VBArray(this.mainWindow.oDeformityOrders.Items())).toArray();
            for (var index = 0, count = orders.length; index < count; index++) {
                var order = orders[index];
                if (order.tran.accountID == account.id) {
                    //set order.contractSize
                    var instrument = order.GetInstrument();
                    if (instrument) {
                        var tradePolicyDetail = instrument.GetTradePolicyDetail(account.tradePolicyID);
                        if (tradePolicyDetail)
                            order.tran.contractSize = tradePolicyDetail.contractSize;
                    }

                    if (this.mainWindow.oDeformityOrders.Exists(order.id))
                        this.mainWindow.oDeformityOrders.Remove(order.id);

                    this.mainWindow.oPendingOrders.Add(order.id, order);

                    //Modified by Michael on 2009-02-09
                    //					//Modified by Michael on 2006-09-30
                    //					var isValidateAutoAcceptOthers = order.tran.ValidateAutoAcceptOthers(instrument);
                    //					if (isValidateAutoAcceptOthers)
                    //					{
                    //						order.CheckWhenOrderArrive();
                    //					}
                    //					else
                    //					{
                    //						order.SetWaitAcceptRejectPlace();
                    //		            }
                    if (order.tran.IsPlacing()) {
                        order.SetWaitAcceptRejectPlace();
                    }
                    else {
                        order.CheckWhenOrderArrive(true);
                    }
                }
            }
        }
    };

    this.AddCustomer = function (msXml) {
        var commandNode = msXml.firstChild;
        var customer = new Customer();
        customer.UpdateByXmlNode(commandNode);
        /*customer.id = commandNode.getAttribute("ID");
        customer.code = commandNode.getAttribute("Code");
        customer.privateQuotePolicyID = commandNode.getAttribute("PrivateQuotePolicyID");*/
        if (this.mainWindow.oCustomers.Exists(customer.id))
            this.mainWindow.oCustomers.Remove(customer.id);
        this.mainWindow.oCustomers.Add(customer.id, customer);
    };

    this.GetCustomer = function (msXml) {
        var commandNode = msXml.firstChild;
        var customer = new Customer();
        customer.UpdateByXmlNode(commandNode);
        /*customer.id = commandNode.getAttribute("ID");
        customer.code = commandNode.getAttribute("Code");
        customer.privateQuotePolicyID = commandNode.getAttribute("PrivateQuotePolicyID");*/
        if (this.mainWindow.oCustomers.Exists(customer.id))
            this.mainWindow.oCustomers.Remove(customer.id);
        this.mainWindow.oCustomers.Add(customer.id, customer);

        var orders = (new VBArray(this.mainWindow.oDeformityOrders.Items())).toArray();
        for (var index = 0, count = orders.length; index < count; index++) {
            var order = orders[index];
            var account = order.GetAccount();
            if (!account)
                oIOProxy.GetAccount(order.tran.accountID);
            else {
                //if(order.tran.accountID == account.id)
                if (order.GetCustomer()) //Modified by jethro
                {
                    if (this.mainWindow.oDeformityOrders.Exists(order.id)) {
                        this.mainWindow.oDeformityOrders.Remove(order.id);
                    }

                    if (!this.mainWindow.oPendingOrders.Exists(order.id)) {
                        this.mainWindow.oPendingOrders.Add(order.id, order);
                    }

                    //Modified by Michael on 2009-02-09
                    //	                //Modified by Michael on 2006-09-30
                    //	                var isValidateAutoAcceptOthers = order.tran.ValidateAutoAcceptOthers(order.GetInstrument());
                    //	                if (isValidateAutoAcceptOthers) {
                    //	                    order.CheckWhenOrderArrive();
                    //	                }
                    //	                else {
                    //	                    order.SetWaitAcceptRejectPlace();
                    //	                }
                    if (order.tran.IsPlacing()) {
                        order.SetWaitAcceptRejectPlace();
                    }
                    else {
                        order.CheckWhenOrderArrive(true);
                    }
                }
            }
        }
        var enquirys = this.mainWindow.oDeformityEnquiry; //(new VBArray(this.mainWindow.oDeformityEnquiry.Items())).toArray();
        for (var index = enquirys.length - 1; index >= 0; index--) {
            var enquiry = enquirys[index];
            if (enquiry.customerID == customer.id) {
                this.mainWindow.oDeformityEnquiry.splice(index, 1);
                enquiry.customer = customer;

                this.mainWindow.parent.quotationTaskFrm.AddTaskEnquiry(enquiry);
            }
        }

        enquirys = this.mainWindow.oDeformityEnquiry2; //(new VBArray(this.mainWindow.oDeformityEnquiry2.Items())).toArray();
        for (var index = enquirys.length - 1; index >= 0; index--) {
            var enquiry = enquirys[index];
            if (enquiry.customerID == customer.id) {
                this.mainWindow.oDeformityEnquiry2.splice(index, 1);
                enquiry.customer = customer;

                enquiry.SetQuotePolicyDetail();
                if (enquiry.quotePolicyDetailCode == "") return;

                //enquiry.Set_Tick(oEnquiryWaitTime);
                this.EnquiryManager.AddEnquiry(enquiry);
            }
        }
    };

    this.UpdateInstrumentSettingXml = function (xmlData) {
        var hasRecord = xmlData != null;
        if (hasRecord) {
            this.InitData_Xml(xmlData, false);
        }

        this.mainWindow.vsflexQuotation.Redraw = false;
        this.mainWindow.SortByImstrumentList();

        var instruments = (new VBArray(this.mainWindow.oInstruments.Items())).toArray();
        for (var index = 0, count = instruments.length; index < count; index++) {
            var instrument = instruments[index];
            if (!this.mainWindow.oInstrumentList.Exists(instrument.id)) {
                this.RemoveInstrument(instrument);
            }
        }
        this.mainWindow.vsflexQuotation.Redraw = true;

        if (hasRecord) {
            this.mainWindow.parent.orderTaskFrm.FillInstrumentSelect();
            this.mainWindow.parent.SourceLevelAdjustmentFrm.FillSourceLevelAdjustmentGrid();
            var instantOrderByInstrumentIFrame = this.mainWindow.parent.propertyFrm._InstantOrderByInstrumentIFrame;
            instantOrderByInstrumentIFrame._InstantOrderListFrame1.RefreshInstrumentComboData();
            instantOrderByInstrumentIFrame._InstantOrderListFrame2.RefreshInstrumentComboData();
            instantOrderByInstrumentIFrame._InstantOrderListFrame3.RefreshInstrumentComboData();
            instantOrderByInstrumentIFrame._InstantOrderListFrame4.RefreshInstrumentComboData();
        }

        InstrumentOriginCodeComboString = "";
        InstrumentCodeComboString = "";
    };

    this.SaveSystemParameter = function () {
        var msXml = new ActiveXObject("MSXML.DOMDocument");
        var topNode = msXml.createElement("Settings");
        msXml.appendChild(topNode);

        //system parameter
        var tempNode = msXml.createElement("Parameter");
        tempNode.setAttribute("InactiveWaitTime", oInactiveWaitTime);
        tempNode.setAttribute("EnquiryWaitTime", oEnquiryWaitTime);
        tempNode.setAttribute("ApplyAutoAdjustPoints", oApplyAutoAdjustPoints ? "true" : "false");
        tempNode.setAttribute("PriceOrderSetting", oPriceOrderSetting);
        tempNode.setAttribute("DisablePopup", oDisablePopup);
        tempNode.setAttribute("AutoConfirm", oAutoConfirm);
        tempNode.setAttribute("ApplySetValueToDealingPolicy", ApplySetValueToDealingPolicy ? "true" : "false");
        topNode.appendChild(tempNode);

        //property
        tempNode = msXml.createElement("Property");

        for (var index = 0, count = oColsArrangements.length; index < count; index++) {
            var propName = oColsArrangements[index];
            tempNode.setAttribute(propName.replace(" ", "_"), "");
        }
        if (tempNode.attributes.length > 0)
            topNode.appendChild(tempNode);

        //sound
        tempNode = msXml.createElement("Sound");
        var IDs = new VBArray(oSoundOptions.Keys()).toArray();
        for (var index = 0, count = IDs.length; index < count; index++) {
            var tempChildNode = msXml.createElement("Sound" + index);
            var id = IDs[index];
            var fileName = oSoundOptions.Item(id);
            tempChildNode.setAttribute("ID", id);
            tempChildNode.setAttribute("FileName", fileName);
            tempNode.appendChild(tempChildNode);
        }
        if (tempNode.childNodes.length > 0)
            topNode.appendChild(tempNode);

        //SetValue
        tempNode = msXml.createElement("SetValue");
        var names = new VBArray(oSetValueOptions.Keys()).toArray();
        for (var index = 0, count = names.length; index < count; index++) {
            var tempChildNode = msXml.createElement("SetValue" + index);
            var name = names[index];
            var value = oSetValueOptions.Item(name);
            tempChildNode.setAttribute("Name", name);
            tempChildNode.setAttribute("Value", value);
            tempNode.appendChild(tempChildNode);
        }
        if (tempNode.childNodes.length > 0)
            topNode.appendChild(tempNode);

        var sXml = topNode.xml;
        msXml = null;

        oIOProxy.UpdateSystemParameters(sXml);

    };

    this.UpdateEnquiryOutTime = function () {
        var enquiryOutTime = parseInt(oEnquiryWaitTime);
        enquiryOutTime = isNaN(enquiryOutTime) ? 10 : enquiryOutTime;
        enquiryOutTime = (enquiryOutTime <= 0) ? 10 : enquiryOutTime;
        oIOProxy.UpdateEnquiryOutTime(enquiryOutTime);
    };

    this.LoadSystemParameter = function (sXml) {
        if (!sXml) return;

        var msXml = new ActiveXObject("MSXML.DOMDocument");
        msXml.loadXML(sXml);

        var settingsNode = msXml.firstChild;
        for (var i = 0, count = settingsNode.childNodes.length; settingsNode && i < count; i++) {
            var tempNode = settingsNode.childNodes.item(i);
            switch (tempNode.nodeName) {
                case "Sound":
                    oSoundOptions.RemoveAll();
                    for (var j = 0, count2 = tempNode.childNodes.length; j < count2; j++) {
                        var tempChildNode = tempNode.childNodes[j];
                        var id = tempChildNode.attributes.getQualifiedItem("ID", "");
                        var fileName = tempChildNode.attributes.getQualifiedItem("FileName", "");
                        if (id && fileName)
                            oSoundOptions.Item(id.value) = fileName.value;
                    }
                    break;
                case "SetValue":
                    oSetValueOptions.RemoveAll();
                    for (var j = 0, count2 = tempNode.childNodes.length; j < count2; j++) {
                        var tempChildNode = tempNode.childNodes[j];
                        var name = tempChildNode.attributes.getQualifiedItem("Name", "");
                        var value = tempChildNode.attributes.getQualifiedItem("Value", "");
                        if (name && value)
                            oSetValueOptions.Item(name.value) = value.value;
                    }
                    break;
                case "Parameter":
                    var temmpValue = tempNode.getAttribute("InactiveWaitTime");
                    if (temmpValue)
                        oInactiveWaitTime = parseInt(temmpValue);
                    temmpValue = tempNode.getAttribute("EnquiryWaitTime");
                    if (temmpValue)
                        oEnquiryWaitTime = parseInt(temmpValue);
                    temmpValue = tempNode.getAttribute("PriceOrderSetting");
                    if (temmpValue)
                        oPriceOrderSetting = parseInt(temmpValue);
                    temmpValue = tempNode.getAttribute("DisablePopup");
                    if (temmpValue)
                        oDisablePopup = parseInt(temmpValue);
                    temmpValue = tempNode.getAttribute("AutoConfirm");
                    if (temmpValue)
                        oAutoConfirm = parseInt(temmpValue);
                    temmpValue = tempNode.getAttribute("ApplySetValueToDealingPolicy");
                    if (temmpValue)
                        ApplySetValueToDealingPolicy = (temmpValue.toLowerCase() == "true") ? true : false;
                    temmpValue = tempNode.getAttribute("ApplyAutoAdjustPoints");
                    if (temmpValue)
                        oApplyAutoAdjustPoints = (temmpValue.toLowerCase() == "true") ? true : false;
                    break;
                case "Property":
                    var colsArrangements = this.mainWindow.oColsArrangements;
                    colsArrangements.splice(0, colsArrangements.length);
                    for (var j = 0, count2 = tempNode.attributes.length; j < count2; j++) {
                        var propName = tempNode.attributes[j].name;
                        colsArrangements.push(propName.replace("_", " "));
                    }
                    break;
            }
        }
        msXml = null;
    };

    this.RemoveInstrument = function (instrument) {
        RemoveNeedUpdateUIInstrument(instrument.id);
        this.mainWindow.oInstruments.Remove(instrument.id);
        this.mainWindow.RemoveInstrumentFromGrid(instrument);

        if (this.mainWindow.oInstrumentList.Exists(instrument.id)) {
            this.mainWindow.oInstrumentList.Remove(instrument.id);

            //            var value = 0;
            //            var instrumentSortByCodes = (new VBArray(this.mainWindow.oInstrumentList.Items())).toArray();
            //            for (var index = 0, count = instrumentSortByCodes.length; index < count; index++) {
            //                instrumentSortByCodes[index].order = value++;
            //            }

            //            var list = (new VBArray(this.mainWindow.oInstrumentList.Items())).toArray();
            //            for (var index = 0, count = list.length; index < count; index++) {
            //                list[index] = value++;
            //            }
        }

        var orders = (new VBArray(this.mainWindow.oPendingOrders.Items())).toArray();
        for (var index1 = 0, count = orders.length; index1 < count; index1++) {
            var order = orders[index1];
            if (order.tran.instrumentID == instrument.id) {
                order.Cancel();
            }
        }

        var orders = (new VBArray(this.mainWindow.oDeformityOrders.Items())).toArray();
        for (var index1 = 0, count = orders.length; index1 < count; index1++) {
            var order = orders[index1];
            if (order.tran.instrumentID == instrument.id) {
                order.Cancel();
            }
        }

        var orders = (new VBArray(this.mainWindow.oExecutedOrders.Items())).toArray();
        for (var index1 = 0, count = orders.length; index1 < count; index1++) {
            var order = orders[index1];
            if (order.tran.instrumentID == instrument.id) {
                this.mainWindow.oExecutedOrders.Remove(order.id);
            }
        }
    };

    //if InstrumentLimit then Sound0.wav(type==0)
    //when execute order by riskmonitor,
    //if order.tran.approverID == "00000000-0000-0000-0000-000000000000"
    //then play sound1.wav (type==1)
    //else play sound2.wav (type==2)

    //if (account.type == AccountType.BlackList) then play Ringin.wav (type==3)
    this.PlaySound2 = function (type) {
        try {
            var soundFile = "Sound/";
            if (type == 0) soundFile += "Sound0.wav";
            if (type == 1) soundFile += "Sound1.wav";
            if (type == 2) soundFile += "Sound2.wav";
            if (type == 3) soundFile += "Ringin.wav";

            Sound.src = soundFile;
        }
        catch (e)
		{ }
    };

    this.PlaySound = function (soundID) {
        try {
            var fileName = oSoundOptions.Item("" + soundID);
            if (fileName) {
                Sound.src = fileName;
            }
        }
        catch (e) {
        }
    };

    this.SuspendOrResume = function (isResume) {
        var isSucceed = oIOProxy.SuspendOrResume(isResume);
        if (isSucceed) {
            var setValue = isResume ? true : false;
            var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
            for (var e = new Enumerator(oInstruments); !e.atEnd(); e.moveNext()) {
                var key = e.item();
                var instrument = oInstruments.Item(key);
                instrument.isAutoEnablePrice = setValue;
                instrument.isPriceEnabled = setValue;

                this.mainWindow.OnQuotationPropertiesChangedForSuspendOrResume(instrument);
                if (oCurrentInstrumentID == instrument.id) this.mainWindow.OnPropertyInstrumentChanged(instrument);
            }
        }
    };

    this.SuspendOrResumeForInstrument = function (isResume, instrumentID) {
        var isSucceed = oIOProxy.SuspendOrResumeForInstrument(isResume, instrumentID);
        if (isSucceed) {
            var setValue = isResume ? true : false;
            if (oInstruments.Exists(instrumentID)) {
                var instrument = oInstruments.Item(instrumentID);
                instrument.isAutoEnablePrice = setValue;
                instrument.isPriceEnabled = setValue;

                this.mainWindow.OnQuotationPropertiesChangedForSuspendOrResume(instrument);

                var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
                if (oCurrentInstrumentID == instrumentID) this.mainWindow.OnPropertyInstrumentChanged(instrument);
            }            
        }
    };

    this.MassAllowLMT = function (allow) {
        var needChangeDirection = oIOProxy.MassAllowLMT(allow);
        return needChangeDirection;
    };

    this.AllowLMT = function (allow, instrumentID) {
        var needChangeDirection = oIOProxy.AllowLMT(allow, instrumentID);
        return needChangeDirection;
    };

    //Added by Michael on 2003-11-19
    this.ChangeAutoToManual = function () {
        var isSucceed = oIOProxy.UpdateInstrumentForAutoToManual();
        if (isSucceed) {
            var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
            for (var e = new Enumerator(oInstruments); !e.atEnd(); e.moveNext()) {
                var key = e.item();
                var instrument = oInstruments.Item(key);
                //instrument.autoDQMaxLot = 0.0;
                //instrument.autoLmtMktMaxLot = 0.0;
                instrument.isAutoFill = false;

                this.mainWindow.OnQuotationPropertiesChangedForAutoToManual(instrument);
                if (oCurrentInstrumentID == instrument.id) this.mainWindow.OnPropertyInstrumentChanged(instrument);
            }
        }
    };

    this.ChangeQuotePolicyParameters = function (quotePolicyParameters) {
        if (quotePolicyParameters == "0") return;

        var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
        var quotePolicyXmls = "";
        for (var e = new Enumerator(oInstruments); !e.atEnd(); e.moveNext()) {
            var key = e.item();
            var instrument = oInstruments.Item(key);
            var quotePolicyDetails = instrument.quotePolicyDetails;
            var quotePolicyDetails2 = (new VBArray(quotePolicyDetails.Items())).toArray();
            for (var index = 0, count = quotePolicyDetails2.length; index < count; index++) {
                var quotePolicyDetail = quotePolicyDetails2[index];
                var spreadPoints = "spreadPoints" + quotePolicyParameters;
                var autoAdjustPoints = "autoAdjustPoints" + quotePolicyParameters;
                var spreadPointsValue = quotePolicyDetail[spreadPoints];
                var autoAdjustPointsValue = quotePolicyDetail[autoAdjustPoints];

                var isSaveSpreadPoints = (isNaN(parseInt(spreadPointsValue)) == false)
					&& (quotePolicyDetail.spreadPoints != parseInt(spreadPointsValue));
                var isSaveAutoAdjustPoints = (isNaN(parseInt(autoAdjustPointsValue)) == false)
					&& (quotePolicyDetail.autoAdjustPoints != parseInt(autoAdjustPointsValue));
                if (isSaveSpreadPoints || isSaveAutoAdjustPoints) {
                    var objectIDs = "";
                    var eventMessage = "";
                    var instrumentCode = this.ReplaceSpecialChar(instrument.code);
                    var quotePolicyDetailCode = this.ReplaceSpecialChar(quotePolicyDetail.code);
                    if (isSaveSpreadPoints && !isSaveAutoAdjustPoints) {
                        objectIDs = "Spread";
                        eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetailCode + " " + instrumentCode + " with spread = " + spreadPointsValue;
                    }
                    else if (!isSaveSpreadPoints && isSaveAutoAdjustPoints) {
                        objectIDs = "Autopoint";
                        eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetailCode + " " + instrumentCode + " with autopoint = " + autoAdjustPointsValue;
                    }
                    else if (isSaveSpreadPoints && isSaveAutoAdjustPoints) {
                        objectIDs = "Spread and Autopoint";
                        eventMessage = "Dealer adjust quotepolicy of " + quotePolicyDetailCode + " " + instrumentCode + " with spread = " + spreadPointsValue + " and autopoint = " + autoAdjustPointsValue;
                    }
                    var quotePolicyXml = "<QuotePolicyDetail QuotePolicyID=\"" + quotePolicyDetail.quotePolicyID + "\" ";
                    quotePolicyXml += "InstrumentID=\"" + key + "\" ";
                    if (isSaveSpreadPoints) quotePolicyXml += instrumentColKey.SpreadPoints + "=\"" + spreadPointsValue + "\" ";
                    if (isSaveAutoAdjustPoints) quotePolicyXml += instrumentColKey.AutoAdjustPoints + "=\"" + autoAdjustPointsValue + "\" ";
                    quotePolicyXml += "ObjectIDs=\"" + objectIDs + "\" ";
                    quotePolicyXml += "InstrumentCode=\"" + instrumentCode + "\" ";
                    quotePolicyXml += "EventMessage=\"" + eventMessage + "\" ";
                    quotePolicyXml += ">";
                    quotePolicyXml += "</QuotePolicyDetail>";

                    quotePolicyXmls += quotePolicyXml;
                }
            }
        }
        if (quotePolicyXmls != "") {
            quotePolicyXmls = "<QuotePolicyDetails>" + quotePolicyXmls + "</QuotePolicyDetails>";
            oIOProxy.SendQuotePolicyParameters(quotePolicyXmls, true);
        }
    };

    this.ReplaceSpecialChar = function (str) {
        if (str == null) return str;
        str = str.replace(/&/g, "&amp;");
        return str;
    };

    this.SendOverridedQuotation = function (originCode) {
        for (var e = new Enumerator(oInstruments); !e.atEnd(); e.moveNext()) {
            var key = e.item();
            var instrument = oInstruments.Item(key);
            if (instrument.originCode.toLowerCase() != originCode.toLowerCase()) continue;
            this.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument, true);
        }
    };

    this.SourceLevelAdjustment = function (originCode, isIncrease, needSendOverridedQuotation) {
        var quotePolicyXmls = "";
        for (var e = new Enumerator(oInstruments); !e.atEnd(); e.moveNext()) {
            var key = e.item();
            var instrument = oInstruments.Item(key);
            if (instrument.originCode.toLowerCase() != originCode.toLowerCase()) continue;

            var quotePolicyDetails = instrument.quotePolicyDetails;
            var quotePolicyDetails2 = (new VBArray(quotePolicyDetails.Items())).toArray();
            for (var index = 0, count = quotePolicyDetails2.length; index < count; index++) {
                var quotePolicyDetail = quotePolicyDetails2[index];
                var autoAdjustPointsValue = quotePolicyDetail.autoAdjustPoints + (isIncrease ? instrument.numeratorUnit : 0.00 - instrument.numeratorUnit);

                var objectIDs = "Autopoint";
                var instrumentCode = this.ReplaceSpecialChar(instrument.code);
                var quotePolicyDetailCode = this.ReplaceSpecialChar(quotePolicyDetail.code);
                var eventMessage = "Dealer adjust(SourceLevelAdjustment) quotepolicy of " + quotePolicyDetailCode + " " + instrumentCode + " with autopoint = " + autoAdjustPointsValue;
                var quotePolicyXml = "<QuotePolicyDetail QuotePolicyID=\"" + quotePolicyDetail.quotePolicyID + "\" ";
                quotePolicyXml += "InstrumentID=\"" + key + "\" ";
                quotePolicyXml += instrumentColKey.AutoAdjustPoints + "=\"" + autoAdjustPointsValue + "\" ";
                quotePolicyXml += "ObjectIDs=\"" + objectIDs + "\" ";
                quotePolicyXml += "InstrumentCode=\"" + instrumentCode + "\" ";
                quotePolicyXml += "EventMessage=\"" + eventMessage + "\" ";
                quotePolicyXml += ">";
                quotePolicyXml += "</QuotePolicyDetail>";

                quotePolicyXmls += quotePolicyXml;
            }
        }
        if (quotePolicyXmls != "") {
            quotePolicyXmls = "<QuotePolicyDetails>" + quotePolicyXmls + "</QuotePolicyDetails>";
            oIOProxy.SendQuotePolicyParameters(quotePolicyXmls, needSendOverridedQuotation);
        }
    };

    this.ResetToPrevious = function () {
        var instrumentXmls = "<Instruments>";
        var eventMessages = "";
        var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
        for (var e = new Enumerator(oInstruments); !e.atEnd(); e.moveNext()) {
            var key = e.item();
            var instrument = oInstruments.Item(key);
            var instrumentXml = "";
            var eventMessage = "";

            instrumentXml += "<Instrument ID=\"" + instrument.id + "\" ";
            eventMessage += "ResetToPrevious: Code=" + instrument.code;
            instrument.originInactiveTime = (instrument.originInactiveTimeTemp2 == null) ? instrument.originInactiveTime : instrument.originInactiveTimeTemp2;
            instrumentXml += instrumentColKey.OriginInactiveTime + "=\"" + instrument.originInactiveTime + "\" ";
            eventMessage += instrumentColKey.OriginInactiveTime + "=" + instrument.originInactiveTime + ",";

            instrument.alertVariation = (instrument.alertVariationTemp2 == null) ? instrument.alertVariation : instrument.alertVariationTemp2;
            instrumentXml += instrumentColKey.AlertVariation + "=\"" + instrument.alertVariation + "\" ";
            eventMessage += instrumentColKey.AlertVariation + "=" + instrument.alertVariation + ",";

            instrument.normalWaitTime = (instrument.normalWaitTimeTemp2 == null) ? instrument.normalWaitTime : instrument.normalWaitTimeTemp2;
            instrumentXml += instrumentColKey.NormalWaitTime + "=\"" + instrument.normalWaitTime + "\" ";
            eventMessage += instrumentColKey.NormalWaitTime + "=" + instrument.normalWaitTime + ",";

            instrument.alertWaitTime = (instrument.alertWaitTimeTemp2 == null) ? instrument.alertWaitTime : instrument.alertWaitTimeTemp2;
            instrumentXml += instrumentColKey.AlertWaitTime + "=\"" + instrument.alertWaitTime + "\" ";
            eventMessage += instrumentColKey.AlertWaitTime + "=" + instrument.alertWaitTime + ",";

            instrument.maxDQLot = (instrument.maxDQLotTemp2 == null) ? instrument.maxDQLot : instrument.maxDQLotTemp2;
            instrumentXml += instrumentColKey.MaxDQLot + "=\"" + instrument.maxDQLot + "\" ";
            eventMessage += instrumentColKey.MaxDQLot + "=" + instrument.maxDQLot + ",";

            instrument.maxOtherLot = (instrument.maxOtherLotTemp2 == null) ? instrument.maxOtherLot : instrument.maxOtherLotTemp2;
            instrumentXml += instrumentColKey.MaxOtherLot + "=\"" + instrument.maxOtherLot + "\" ";
            eventMessage += instrumentColKey.MaxOtherLot + "=" + instrument.maxOtherLot + ",";

            instrument.dqQuoteMinLot = (instrument.dqQuoteMinLotTemp2 == null) ? instrument.dqQuoteMinLot : instrument.dqQuoteMinLotTemp2;
            instrumentXml += instrumentColKey.DQQuoteMinLot + "=\"" + instrument.dqQuoteMinLot + "\" ";
            eventMessage += instrumentColKey.DQQuoteMinLot + "=" + instrument.dqQuoteMinLot + ",";

            instrument.autoDQMaxLot = (instrument.autoDQMaxLotTemp2 == null) ? instrument.autoDQMaxLot : instrument.autoDQMaxLotTemp2;
            instrumentXml += instrumentColKey.AutoDQMaxLot + "=\"" + instrument.autoDQMaxLot + "\" ";
            eventMessage += instrumentColKey.AutoDQMaxLot + "=" + instrument.autoDQMaxLot + ",";

            instrument.autoLmtMktMaxLot = (instrument.autoLmtMktMaxLotTemp2 == null) ? instrument.autoLmtMktMaxLot : instrument.autoLmtMktMaxLotTemp2;
            instrumentXml += instrumentColKey.AutoLmtMktMaxLot + "=\"" + instrument.autoLmtMktMaxLot + "\" ";
            eventMessage += instrumentColKey.AutoLmtMktMaxLot + "=" + instrument.autoLmtMktMaxLot + ",";

            instrument.acceptDQVariation = (instrument.acceptDQVariationTemp2 == null) ? instrument.acceptDQVariation : instrument.acceptDQVariationTemp2;
            instrumentXml += instrumentColKey.AcceptDQVariation + "=\"" + instrument.acceptDQVariation + "\" ";
            eventMessage += instrumentColKey.AcceptDQVariation + "=" + instrument.acceptDQVariation + ",";

            instrument.acceptLmtVariation = (instrument.acceptLmtVariationTemp2 == null) ? instrument.acceptLmtVariation : instrument.acceptLmtVariationTemp2;
            instrumentXml += instrumentColKey.AcceptLmtVariation + "=\"" + instrument.acceptLmtVariation + "\" ";
            eventMessage += instrumentColKey.AcceptLmtVariation + "=" + instrument.acceptLmtVariation + ",";

            instrument.acceptCloseLmtVariation = (instrument.acceptCloseLmtVariationTemp2 == null) ? instrument.acceptCloseLmtVariation : instrument.acceptCloseLmtVariationTemp2;
            instrumentXml += instrumentColKey.AcceptCloseLmtVariation + "=\"" + instrument.acceptCloseLmtVariation + "\" ";
            eventMessage += instrumentColKey.AcceptCloseLmtVariation + "=" + instrument.acceptCloseLmtVariation + ",";

            instrument.cancelLmtVariation = (instrument.cancelLmtVariationTemp2 == null) ? instrument.cancelLmtVariation : instrument.cancelLmtVariationTemp2;
            instrumentXml += instrumentColKey.CancelLmtVariation + "=\"" + instrument.cancelLmtVariation + "\" ";
            eventMessage += instrumentColKey.CancelLmtVariation + "=" + instrument.cancelLmtVariation + ",";

            instrument.maxMinAdjust = (instrument.maxMinAdjustTemp2 == null) ? instrument.maxMinAdjust : instrument.maxMinAdjustTemp2;
            instrumentXml += instrumentColKey.MaxMinAdjust + "=\"" + instrument.maxMinAdjust + "\" ";
            eventMessage += instrumentColKey.MaxMinAdjust + "=" + instrument.maxMinAdjust + ",";

            instrument.isBetterPrice = (instrument.isBetterPriceTemp2 == null) ? instrument.isBetterPrice : instrument.isBetterPriceTemp2;
            instrumentXml += instrumentColKey.IsBetterPrice + "=\"" + instrument.isBetterPrice + "\" ";
            eventMessage += instrumentColKey.IsBetterPrice + "=" + instrument.isBetterPrice + ",";

            instrument.autoAcceptMaxLot = (instrument.autoAcceptMaxLotTemp2 == null) ? instrument.autoAcceptMaxLot : instrument.autoAcceptMaxLotTemp2;
            instrumentXml += instrumentColKey.AutoAcceptMaxLot + "=\"" + instrument.autoAcceptMaxLot + "\" ";
            eventMessage += instrumentColKey.AutoAcceptMaxLot + "=" + instrument.autoAcceptMaxLot + ",";

            instrument.autoCancelMaxLot = (instrument.autoCancelMaxLotTemp2 == null) ? instrument.autoCancelMaxLot : instrument.autoCancelMaxLotTemp2;
            instrumentXml += instrumentColKey.AutoCancelMaxLot + "=\"" + instrument.autoCancelMaxLot + "\" ";
            eventMessage += instrumentColKey.AutoCancelMaxLot + "=" + instrument.autoCancelMaxLot + ",";

            instrument.allowedNewTradeSides = (instrument.allowedNewTradeSidesTemp2 == null) ? instrument.allowedNewTradeSides : instrument.allowedNewTradeSidesTemp2;
            instrumentXml += instrumentColKey.AllowedNewTradeSides + "=\"" + instrument.allowedNewTradeSides + "\" ";
            eventMessage += instrumentColKey.AllowedNewTradeSides + "=" + instrument.allowedNewTradeSides + ",";

            instrument.hitTimes = (instrument.hitTimesTemp2 == null) ? instrument.hitTimes : instrument.hitTimesTemp2;
            instrumentXml += instrumentColKey.HitTimes + "=\"" + instrument.hitTimes + "\" ";
            eventMessage += instrumentColKey.HitTimes + "=" + instrument.hitTimes + ",";

            instrument.penetrationPoint = (instrument.penetrationPointTemp2 == null) ? instrument.penetrationPoint : instrument.penetrationPointTemp2;
            instrumentXml += instrumentColKey.PenetrationPoint + "=\"" + instrument.penetrationPoint + "\" ";
            eventMessage += instrumentColKey.PenetrationPoint + "=" + instrument.penetrationPoint + ",";

            instrument.priceValidTime = (instrument.priceValidTimeTemp2 == null) ? instrument.priceValidTime : instrument.priceValidTimeTemp2;
            instrumentXml += instrumentColKey.PriceValidTime + "=\"" + instrument.priceValidTime + "\" ";
            eventMessage += instrumentColKey.PriceValidTime + "=" + instrument.priceValidTime + ",";

            instrument.lastAcceptTimeSpan = (instrument.lastAcceptTimeSpanTemp2 == null) ? instrument.lastAcceptTimeSpan : instrument.lastAcceptTimeSpanTemp2;
            instrumentXml += instrumentColKey.LastAcceptTimeSpan + "=\"" + instrument.lastAcceptTimeSpan + "\" ";
            eventMessage += instrumentColKey.LastAcceptTimeSpan + "=" + instrument.lastAcceptTimeSpan + ",";

            instrument.autoDQDelay = (instrument.autoDQDelayTemp2 == null) ? instrument.autoDQDelay : instrument.autoDQDelayTemp2;
            instrumentXml += instrumentColKey.AutoDQDelay + "=\"" + instrument.autoDQDelay + "\" ";
            eventMessage += instrumentColKey.AutoDQDelay + "=" + instrument.autoDQDelay;

            instrument.hitPriceVariationForSTP = (instrument.hitPriceVariationForSTPTemp2 == null) ? instrument.hitPriceVariationForSTP : instrument.hitPriceVariationForSTPTemp2;
            instrumentXml += instrumentColKey.HitPriceVariationForSTP + "=\"" + instrument.hitPriceVariationForSTP + "\" ";
            eventMessage += instrumentColKey.HitPriceVariationForSTP + "=" + instrument.hitPriceVariationForSTP;

            instrumentXml += "/>";
            instrumentXmls += instrumentXml;
            eventMessages += (eventMessages != "" ? "\n" : "") + eventMessage;

            this.mainWindow.OnQuotationPropertiesChanged(instrument, false);
            if (oCurrentInstrumentID == instrument.id) this.mainWindow.OnPropertyInstrumentChanged(instrument);
        }
        instrumentXmls += "</Instruments>";

        oIOProxy.UpdateInstrument2(instrumentXmls, "Instruments", eventMessages, "", "");
    };

    this.ResetToSetValue = function () {
        var instrumentXmls = "<Instruments>";
        var eventMessages = "";
        var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
        for (var e = new Enumerator(oInstruments); !e.atEnd(); e.moveNext()) {
            if (oSetValueOptions.Count > 0) {
                var key = e.item();
                var instrument = oInstruments.Item(key);
                var instrumentXml = "";
                var eventMessage = "";

                var originInactiveTime = oSetValueOptions.Item(instrumentColKey.OriginInactiveTime)
                if (originInactiveTime != "") {
                    instrument.originInactiveTimeTemp = parseInt(originInactiveTime);
                    if (instrument.originInactiveTimeTemp != instrument.originInactiveTime) {
                        instrument.originInactive = instrument.originInactiveTime;
                        instrumentXml += instrumentColKey.OriginInactiveTime + "=\"" + instrument.originInactiveTimeTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.OriginInactiveTime + "=" + instrument.originInactiveTimeTemp;
                    }
                    else
                        instrument.originInactiveTimeTemp = null;
                }

                var alertVariation = oSetValueOptions.Item(instrumentColKey.AlertVariation)
                if (alertVariation != "") {
                    instrument.alertVariationTemp = parseInt(alertVariation);
                    if (instrument.alertVariationTemp != instrument.alertVariation) {
                        instrument.alertVariation = instrument.alertVariationTemp;
                        instrumentXml += instrumentColKey.AlertVariation + "=\"" + instrument.alertVariationTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AlertVariation + "=" + instrument.alertVariationTemp;
                    }
                    else
                        instrument.alertVariationTemp = null;
                }

                var normalWaitTime = oSetValueOptions.Item(instrumentColKey.NormalWaitTime)
                if (normalWaitTime != "") {
                    instrument.normalWaitTimeTemp = parseInt(normalWaitTime);
                    if (instrument.normalWaitTimeTemp != instrument.normalWaitTime) {
                        instrument.normalWaitTime = instrument.normalWaitTimeTemp;
                        instrumentXml += instrumentColKey.NormalWaitTime + "=\"" + instrument.normalWaitTimeTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.NormalWaitTime + "=" + instrument.normalWaitTimeTemp;
                    }
                    else
                        instrument.normalWaitTimeTemp = null;
                }

                var alertWaitTime = oSetValueOptions.Item(instrumentColKey.AlertWaitTime)
                if (alertWaitTime != "") {
                    instrument.alertWaitTimeTemp = parseInt(alertWaitTime);
                    if (instrument.alertWaitTimeTemp != instrument.alertWaitTime) {
                        instrument.alertWaitTime = instrument.alertWaitTimeTemp;
                        instrumentXml += instrumentColKey.AlertWaitTime + "=\"" + instrument.alertWaitTimeTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AlertWaitTime + "=" + instrument.alertWaitTimeTemp;
                    }
                    else
                        instrument.alertWaitTimeTemp = null;
                }

                var maxDQLot = oSetValueOptions.Item(instrumentColKey.MaxDQLot)
                if (maxDQLot != "") {
                    if (maxDQLot < instrument.dqQuoteMinLot) {
                        //vsflexQuotation.TextMatrix(row, col)  = instrument.maxDQLot;
                    }
                    else {
                        //Modified by Michael on 2005-04-08
                        //instrument.maxDQLotTemp = parseInt(maxDQLot);
                        instrument.maxDQLotTemp = parseFloat(maxDQLot);

                        if (instrument.maxDQLotTemp != instrument.maxDQLot) {
                            instrument.maxDQLot = instrument.maxDQLotTemp;
                            instrumentXml += instrumentColKey.MaxDQLot + "=\"" + instrument.maxDQLotTemp + "\" ";
                            eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.MaxDQLot + "=" + instrument.maxDQLotTemp;
                        }
                        else
                            instrument.maxDQLotTemp = null;
                    }
                }

                var maxOtherLot = oSetValueOptions.Item(instrumentColKey.MaxOtherLot)
                if (maxOtherLot != "") {
                    //Modified by Michael on 2005-04-08
                    //instrument.maxOtherLotTemp = parseInt(maxOtherLot);
                    instrument.maxOtherLotTemp = parseFloat(maxOtherLot);

                    if (instrument.maxOtherLotTemp != instrument.maxOtherLot) {
                        instrument.maxOtherLot = instrument.maxOtherLotTemp;
                        instrumentXml += instrumentColKey.MaxOtherLot + "=\"" + instrument.maxOtherLotTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.MaxOtherLot + "=" + instrument.maxOtherLotTemp;
                    }
                    else
                        instrument.maxOtherLotTemp = null;
                }

                var dqQuoteMinLot = oSetValueOptions.Item(instrumentColKey.DQQuoteMinLot)
                if (dqQuoteMinLot != "") {
                    if (dqQuoteMinLot > instrument.maxDQLot) {
                        //vsflexQuotation.TextMatrix(row, col)  = instrument.dqQuoteMinLot;
                    }
                    else {
                        //Modified by Michael on 2005-04-08
                        //instrument.dqQuoteMinLotTemp = parseInt(dqQuoteMinLot);
                        instrument.dqQuoteMinLotTemp = parseFloat(dqQuoteMinLot);

                        if (instrument.dqQuoteMinLotTemp != instrument.dqQuoteMinLot) {
                            instrument.dqQuoteMinLot = instrument.dqQuoteMinLotTemp;
                            instrumentXml += instrumentColKey.DQQuoteMinLot + "=\"" + instrument.dqQuoteMinLotTemp + "\" ";
                            eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.DQQuoteMinLot + "=" + instrument.dqQuoteMinLotTemp;
                        }
                        else
                            instrument.dqQuoteMinLotTemp = null;
                    }
                }

                var autoDQMaxLot = oSetValueOptions.Item(instrumentColKey.AutoDQMaxLot)
                if (autoDQMaxLot != "") {
                    //Modified by Michael on 2005-04-08
                    //instrument.autoDQMaxLotTemp = parseInt(autoDQMaxLot);
                    instrument.autoDQMaxLotTemp = parseFloat(autoDQMaxLot);

                    if (instrument.autoDQMaxLotTemp != instrument.autoDQMaxLot) {
                        instrument.autoDQMaxLot = instrument.autoDQMaxLotTemp;
                        instrumentXml += instrumentColKey.AutoDQMaxLot + "=\"" + instrument.autoDQMaxLotTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AutoDQMaxLot + "=" + instrument.autoDQMaxLotTemp;
                    }
                    else
                        instrument.autoDQMaxLotTemp = null;
                }

                var autoLmtMktMaxLot = oSetValueOptions.Item(instrumentColKey.AutoLmtMktMaxLot)
                if (autoLmtMktMaxLot != "") {
                    //Modified by Michael on 2005-04-08
                    //instrument.autoLmtMktMaxLotTemp = parseInt(autoLmtMktMaxLot);
                    instrument.autoLmtMktMaxLotTemp = parseFloat(autoLmtMktMaxLot);

                    if (instrument.autoLmtMktMaxLotTemp != instrument.autoLmtMktMaxLot) {
                        instrument.autoLmtMktMaxLot = instrument.autoLmtMktMaxLotTemp;
                        instrumentXml += instrumentColKey.AutoLmtMktMaxLot + "=\"" + instrument.autoLmtMktMaxLotTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AutoLmtMktMaxLot + "=" + instrument.autoLmtMktMaxLotTemp;
                    }
                    else
                        instrument.autoLmtMktMaxLotTemp = null;
                }

                var acceptDQVariation = oSetValueOptions.Item(instrumentColKey.AcceptDQVariation)
                if (acceptDQVariation != "") {
                    instrument.acceptDQVariationTemp = parseInt(acceptDQVariation);
                    if (instrument.acceptDQVariationTemp != instrument.acceptDQVariation) {
                        instrument.acceptDQVariation = instrument.acceptDQVariationTemp;
                        instrumentXml += instrumentColKey.AcceptDQVariation + "=\"" + instrument.acceptDQVariationTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AcceptDQVariation + "=" + instrument.acceptDQVariationTemp;
                    }
                    else
                        instrument.acceptDQVariationTemp = null;
                }

                var acceptLmtVariation = oSetValueOptions.Item(instrumentColKey.AcceptLmtVariation)
                if (acceptLmtVariation != "") {
                    instrument.acceptLmtVariationTemp = parseInt(acceptLmtVariation);
                    if (instrument.acceptLmtVariationTemp != instrument.acceptLmtVariation) {
                        instrument.acceptLmtVariation = instrument.acceptLmtVariationTemp;
                        instrumentXml += instrumentColKey.AcceptLmtVariation + "=\"" + instrument.acceptLmtVariationTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AcceptLmtVariation + "=" + instrument.acceptLmtVariationTemp;
                    }
                    else
                        instrument.acceptLmtVariationTemp = null;
                }

                var acceptCloseLmtVariation = oSetValueOptions.Item(instrumentColKey.AcceptCloseLmtVariation)
                if (acceptCloseLmtVariation != "") {
                    instrument.acceptCloseLmtVariationTemp = parseInt(acceptCloseLmtVariation);
                    if (instrument.acceptCloseLmtVariationTemp != instrument.acceptCloseLmtVariation) {
                        instrument.acceptCloseLmtVariation = instrument.acceptCloseLmtVariationTemp;
                        instrumentXml += instrumentColKey.AcceptCloseLmtVariation + "=\"" + instrument.acceptCloseLmtVariationTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AcceptCloseLmtVariation + "=" + instrument.acceptCloseLmtVariationTemp;
                    }
                    else
                        instrument.acceptCloseLmtVariationTemp = null;
                }

                var cancelLmtVariation = oSetValueOptions.Item(instrumentColKey.CancelLmtVariation)
                if (cancelLmtVariation != "") {
                    instrument.cancelLmtVariationTemp = parseInt(cancelLmtVariation);
                    if (instrument.cancelLmtVariationTemp != instrument.cancelLmtVariation) {
                        instrument.cancelLmtVariation = instrument.cancelLmtVariationTemp;
                        instrumentXml += instrumentColKey.CancelLmtVariation + "=\"" + instrument.cancelLmtVariationTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.CancelLmtVariation + "=" + instrument.cancelLmtVariationTemp;
                    }
                    else
                        instrument.cancelLmtVariationTemp = null;
                }

                var maxMinAdjust = oSetValueOptions.Item(instrumentColKey.MaxMinAdjust)
                if (maxMinAdjust != "") {
                    instrument.maxMinAdjustTemp = parseInt(maxMinAdjust);
                    if (instrument.maxMinAdjustTemp != instrument.maxMinAdjust) {
                        instrument.maxMinAdjust = instrument.maxMinAdjustTemp;
                        instrumentXml += instrumentColKey.MaxMinAdjust + "=\"" + instrument.maxMinAdjustTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.MaxMinAdjust + "=" + instrument.maxMinAdjustTemp;
                    }
                    else
                        instrument.maxMinAdjustTemp = null;
                }

                var isBetterPrice = oSetValueOptions.Item(instrumentColKey.IsBetterPrice)
                if (isBetterPrice != "") {
                    instrument.isBetterPriceTemp = (isBetterPrice == "1"); // ? 1 : 0;
                    if (instrument.isBetterPriceTemp != instrument.isBetterPrice) {
                        instrument.isBetterPrice = instrument.isBetterPriceTemp;
                        instrumentXml += instrumentColKey.IsBetterPrice + "=\"" + instrument.isBetterPriceTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.IsBetterPrice + "=" + instrument.isBetterPriceTemp;
                    }
                    else
                        instrument.isBetterPriceTemp = null;
                }

                var autoAcceptMaxLot = oSetValueOptions.Item(instrumentColKey.AutoAcceptMaxLot)
                if (autoAcceptMaxLot != "") {
                    instrument.autoAcceptMaxLotTemp = autoAcceptMaxLot;
                    if (instrument.autoAcceptMaxLotTemp != instrument.autoAcceptMaxLot) {
                        instrument.autoAcceptMaxLot = instrument.autoAcceptMaxLotTemp;
                        instrumentXml += instrumentColKey.AutoAcceptMaxLot + "=\"" + instrument.autoAcceptMaxLotTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AutoAcceptMaxLot + "=" + instrument.autoAcceptMaxLotTemp;
                    }
                    else
                        instrument.autoAcceptMaxLotTemp = null;
                }

                var autoCancelMaxLot = oSetValueOptions.Item(instrumentColKey.AutoCancelMaxLot)
                if (autoCancelMaxLot != "") {
                    instrument.autoCancelMaxLotTemp = autoCancelMaxLot;
                    if (instrument.autoCancelMaxLotTemp != instrument.autoCancelMaxLot) {
                        instrument.autoCancelMaxLot = instrument.autoCancelMaxLotTemp;
                        instrumentXml += instrumentColKey.AutoCancelMaxLot + "=\"" + instrument.autoCancelMaxLotTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AutoCancelMaxLot + "=" + instrument.autoCancelMaxLotTemp;
                    }
                    else
                        instrument.autoCancelMaxLotTemp = null;
                }

                var allowedNewTradeSides = oSetValueOptions.Item(instrumentColKey.AllowedNewTradeSides)
                if (allowedNewTradeSides != "") {
                    instrument.allowedNewTradeSidesTemp = allowedNewTradeSides; // ? 1 : 0;
                    if (instrument.allowedNewTradeSidesTemp != instrument.allowedNewTradeSides) {
                        instrument.allowedNewTradeSides = instrument.allowedNewTradeSidesTemp;
                        instrumentXml += instrumentColKey.AllowedNewTradeSides + "=\"" + instrument.allowedNewTradeSidesTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AllowedNewTradeSides + "=" + instrument.allowedNewTradeSidesTemp;
                    }
                    else
                        instrument.allowedNewTradeSidesTemp = null;
                }
                var hitPriceVariationForSTP = oSetValueOptions.Item(instrumentColKey.HitPriceVariationForSTP);
                if (hitPriceVariationForSTP != "") {
                    instrument.hitPriceVariationForSTPTemp = hitPriceVariationForSTP;
                    if (instrument.hitPriceVariationForSTPTemp != instrument.hitPriceVariationForSTP) {
                        instrument.hitPriceVariationForSTP = instrument.hitPriceVariationForSTPTemp;
                        instrumentXml += instrumentColKey.HitPriceVariationForSTP + "=\"" + instrument.hitPriceVariationForSTPTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.HitPriceVariationForSTP + "=" + instrument.hitPriceVariationForSTPTemp;
                    }
                    else {
                        instrument.hitPriceVariationForSTPTemp = null;
                    }
                }

                var hitTimes = oSetValueOptions.Item(instrumentColKey.HitTimes)
                if (hitTimes != "") {
                    instrument.hitTimesTemp = parseInt(hitTimes);
                    if (instrument.hitTimesTemp != instrument.hitTimes) {
                        instrument.hitTimes = instrument.hitTimesTemp;
                        instrumentXml += instrumentColKey.HitTimes + "=\"" + instrument.hitTimesTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.HitTimes + "=" + instrument.hitTimesTemp;
                    }
                    else
                        instrument.hitTimesTemp = null;
                }

                var penetrationPoint = oSetValueOptions.Item(instrumentColKey.PenetrationPoint)
                if (penetrationPoint != "") {
                    instrument.penetrationPointTemp = parseInt(penetrationPoint);
                    if (instrument.penetrationPointTemp != instrument.penetrationPoint) {
                        instrument.penetrationPoint = instrument.penetrationPointTemp;
                        instrumentXml += instrumentColKey.PenetrationPoint + "=\"" + instrument.penetrationPointTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.PenetrationPoint + "=" + instrument.penetrationPointTemp;
                    }
                    else
                        instrument.penetrationPointTemp = null;
                }

                var priceValidTime = oSetValueOptions.Item(instrumentColKey.PriceValidTime)
                if (priceValidTime != "") {
                    instrument.priceValidTimeTemp = parseInt(priceValidTime);
                    if (instrument.priceValidTimeTemp != instrument.priceValidTime) {
                        instrument.priceValidTime = instrument.priceValidTimeTemp;
                        instrumentXml += instrumentColKey.PriceValidTime + "=\"" + instrument.priceValidTimeTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.PriceValidTime + "=" + instrument.priceValidTimeTemp;
                    }
                    else
                        instrument.priceValidTimeTemp = null;
                }

                var lastAcceptTimeSpan = oSetValueOptions.Item(instrumentColKey.LastAcceptTimeSpan)
                if (lastAcceptTimeSpan != "") {
                    instrument.lastAcceptTimeSpanTemp = parseInt(lastAcceptTimeSpan);
                    if (instrument.lastAcceptTimeSpanTemp != instrument.lastAcceptTimeSpan) {
                        instrument.lastAcceptTimeSpan = instrument.lastAcceptTimeSpanTemp;
                        instrumentXml += instrumentColKey.LastAcceptTimeSpan + "=\"" + instrument.lastAcceptTimeSpanTemp + "\" ";
                        eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.LastAcceptTimeSpan + "=" + instrument.lastAcceptTimeSpanTemp;
                    }
                    else
                        instrument.lastAcceptTimeSpanTemp = null;
                }

                if (oSetValueOptions.Exists(instrumentColKey.AutoDQDelay)) {
                    var autoDQDelay = oSetValueOptions.Item(instrumentColKey.AutoDQDelay)
                    if (autoDQDelay != "") {
                        instrument.autoDQDelayTemp = parseInt(autoDQDelay);
                        if (instrument.autoDQDelayTemp != instrument.autoDQDelay) {
                            instrument.autoDQDelay = instrument.autoDQDelayTemp;
                            instrumentXml += instrumentColKey.AutoDQDelay + "=\"" + instrument.autoDQDelayTemp + "\" ";
                            eventMessage += (eventMessage != "" ? "," : "") + instrumentColKey.AutoDQDelay + "=" + instrument.autoDQDelayTemp;
                        }
                        else
                            instrument.autoDQDelayTemp = null;
                    }
                }

                if (instrumentXml != "") {
                    instrumentXml = "<Instrument ID=\"" + instrument.id + "\" " + instrumentXml + "/>";
                    instrumentXmls += instrumentXml;
                }
                if (eventMessage != "") {
                    eventMessage = "Code=" + instrument.code + ": " + eventMessage;
                    eventMessages += (eventMessages != "" ? "\n" : "") + eventMessage;
                }

                this.mainWindow.OnQuotationPropertiesChanged(instrument, false);
                if (oCurrentInstrumentID == instrument.id) this.mainWindow.OnPropertyInstrumentChanged(instrument);
            }
        }
        instrumentXmls += "</Instruments>";
        if (eventMessages != "") {
            eventMessages = "ResetToSetValue: " + eventMessages;
        }
        if (instrumentXmls != "<Instruments></Instruments>") oIOProxy.UpdateInstrument2(instrumentXmls, "Instruments", eventMessages, "", "");

        //Added by Michael on 2009-01-13
        if (ApplySetValueToDealingPolicy == true) {
            this.UpdateDealingPolicyDetailForSetValue();
        }
    };

    //Added by Michael on 2009-01-13
    this.UpdateDealingPolicyDetailForSetValue = function () {
        var dealingPolicyDetailXmls = "";
        var maxDQLot = oSetValueOptions.Item(instrumentColKey.MaxDQLot)
        if (maxDQLot != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.MaxDQLot + "=\"" + parseFloat(maxDQLot) + "\" ";
        }
        var maxOtherLot = oSetValueOptions.Item(instrumentColKey.MaxOtherLot)
        if (maxOtherLot != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.MaxOtherLot + "=\"" + parseFloat(maxOtherLot) + "\" ";
        }
        var dqQuoteMinLot = oSetValueOptions.Item(instrumentColKey.DQQuoteMinLot)
        if (dqQuoteMinLot != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.DQQuoteMinLot + "=\"" + parseFloat(dqQuoteMinLot) + "\" ";
        }
        var autoDQMaxLot = oSetValueOptions.Item(instrumentColKey.AutoDQMaxLot)
        if (autoDQMaxLot != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.AutoDQMaxLot + "=\"" + parseFloat(autoDQMaxLot) + "\" ";
        }
        var autoLmtMktMaxLot = oSetValueOptions.Item(instrumentColKey.AutoLmtMktMaxLot)
        if (autoLmtMktMaxLot != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.AutoLmtMktMaxLot + "=\"" + parseFloat(autoLmtMktMaxLot) + "\" ";
        }
        var acceptDQVariation = oSetValueOptions.Item(instrumentColKey.AcceptDQVariation)
        if (acceptDQVariation != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.AcceptDQVariation + "=\"" + parseInt(acceptDQVariation) + "\" ";
        }
        var acceptLmtVariation = oSetValueOptions.Item(instrumentColKey.AcceptLmtVariation)
        if (acceptLmtVariation != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.AcceptLmtVariation + "=\"" + parseInt(acceptLmtVariation) + "\" ";
        }
        var acceptCloseLmtVariation = oSetValueOptions.Item(instrumentColKey.AcceptCloseLmtVariation)
        if (acceptCloseLmtVariation != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.AcceptCloseLmtVariation + "=\"" + parseInt(acceptCloseLmtVariation) + "\" ";
        }
        var cancelLmtVariation = oSetValueOptions.Item(instrumentColKey.CancelLmtVariation)
        if (cancelLmtVariation != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.CancelLmtVariation + "=\"" + parseInt(cancelLmtVariation) + "\" ";
        }
        if (oSetValueOptions.Exists(instrumentColKey.AutoDQDelay)) {
            var autoDQDelay = oSetValueOptions.Item(instrumentColKey.AutoDQDelay)
            if (autoDQDelay != "") {
                dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.AutoDQDelay + "=\"" + parseInt(autoDQDelay) + "\" ";
            }
        }
        var allowedNewTradeSides = oSetValueOptions.Item(instrumentColKey.AllowedNewTradeSides)
        if (allowedNewTradeSides != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.AllowedNewTradeSides + "=\"" + allowedNewTradeSides + "\" ";
        }
        var autoAcceptMaxLot = oSetValueOptions.Item(instrumentColKey.AutoAcceptMaxLot)
        if (autoAcceptMaxLot != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.AutoAcceptMaxLot + "=\"" + autoAcceptMaxLot + "\" ";
        }
        var autoCancelMaxLot = oSetValueOptions.Item(instrumentColKey.AutoCancelMaxLot)
        if (autoCancelMaxLot != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.AutoCancelMaxLot + "=\"" + autoCancelMaxLot + "\" ";
        }

        var hitPriceVariationForSTP = oSetValueOptions.Item(instrumentColKey.HitPriceVariationForSTP);
        if (hitPriceVariationForSTP != "") {
            dealingPolicyDetailXmls += dealingPolicyDetailGridColKey.HitPriceVariationForSTP + "=\"" + hitPriceVariationForSTP + "\" ";
        }

        if (dealingPolicyDetailXmls != "") {
            dealingPolicyDetailXmls = "<SetValue " + dealingPolicyDetailXmls + "/>";
            oIOProxy.UpdateDealingPolicyDetailForSetValue(dealingPolicyDetailXmls);
        }
    };

    //    //Added by Michael on 2003-12-05
    //    this.GetCheckOpenOrderWetherLiquidatedResult = function(transactionIDs) {
    //        if (transactionIDs != "") {
    //            var tranID = "";
    //            var n = 0;
    //            while (38 * n < transactionIDs.length) {
    //                tranID = transactionIDs.substr(38 * n + 1, 36).toLowerCase();
    //                var orders = (new VBArray(this.mainWindow.oPendingOrders.Items())).toArray();
    //                for (var index = 0, count = orders.length; index < count; index++) {
    //                    if (orders[index].tran.id == tranID) {
    //                        if (orders[index].tran.phase == TransPhase.Placing
    //							|| orders[index].tran.phase == TransPhase.Placed) {
    //                            oIOProxy.Cancel3(orders[index].tran);
    //                            break;
    //                        }
    //                    }
    //                }
    //                n++;
    //            }
    //        }
    //    };

    this.GetOrderRelations = function () {
        var relationsByCloseOrderIDs = "";
        var orders = (new VBArray(oExecutedOrders.Items())).toArray();
        for (var index = 0, count = orders.length; index < count; index++) {
            var order = orders[index];
            if (order.tran.phase == TransPhase.Executed && order.isOpen == 0 && order.RelationString == "") {
                relationsByCloseOrderIDs += "<CloseOrderID ID=\'" + order.id + "\'></CloseOrderID>";
            }
        }

        this.GetRelationsByCloseOrderID(relationsByCloseOrderIDs);
    };

    //CloseOrderIDs/CloseOrderID
    this.GetRelationsByCloseOrderID = function (relationsByCloseOrderIDs) {
        if (relationsByCloseOrderIDs == "") return;
        relationsByCloseOrderIDs = "<CloseOrderIDs>" + relationsByCloseOrderIDs + "</CloseOrderIDs>";
        oIOProxy.GetRelationsByCloseOrderID(relationsByCloseOrderIDs);
    };

    this.GetRelationsByCloseOrderIDResult = function (dataSet) {
        if (!dataSet) return;
        if (dataSet.Tables.Count <= 0) return;
        var table = dataSet.Tables(0);
        for (var index = 0; table && index < table.Rows.Count; index++) {
            var row = table.Rows(index);
            var id = row("ID");
            if (oExecutedOrders.Exists(id)) {
                oExecutedOrders.Item(id).RelationString = row("RelationString");
            }
        }

        var wndExecuteOrders = parent.toolBarFrm.oWndExecuteOrders;
        if (wndExecuteOrders && (wndExecuteOrders.closed == false))
            wndExecuteOrders.GetRelationsByCloseOrderIDResult(dataSet);
    };

    /*
    this.GetRelationsByCloseOrderID2 = function(isRefresh)
    {
    var closeOrderIDs = new Array();

    var i = 0;
    var orders = (new VBArray(this.mainWindow.oExecutedOrders.Items())).toArray();
    for(var index=0,count=orders.length;index<count;index++)
    {
    if (isRefresh==true)
    {
    if (orders[index].isOpen==0)
    {
    closeOrderIDs[i] = "{" + orders[index].id + "}";
    i++;
    }
    }
    else if (orders[index].isOpen==0 && orders[index].RelationString == "")
    {
    closeOrderIDs[i] = "{" + orders[index].id + "}";
    i++;
    }
    }
    if (i > 0)
    {
    oIOProxy.GetRelationsByCloseOrderID(closeOrderIDs,isRefresh);
    }
    };
    */

    /*
    this.GetRelationsByCloseOrderIDResult = function(dataSet,isRefresh)
    {
		
    if(!dataSet)	return;
    if (isRefresh == true)
    {
    var orders = (new VBArray(this.mainWindow.oExecutedOrders.Items())).toArray();
    for(var index=0,count=orders.length;index<count;index++)
    {	
    if(orders[index].isOpen == 0)
    {
    orders[index].RelationString = "";
    }
    }	
    }
    var table = dataSet.Tables(0);
    for(var index=0; table && index<table.Rows.Count; index++)
    {
    var row = table.Rows(index);
    var orders = (new VBArray(this.mainWindow.oExecutedOrders.Items())).toArray();
    for(var j=0,count2=orders.length;j<count2;j++)
    {	
    if(orders[j].id == row("ID"))
    {
    orders[j].RelationString = row("RelationString");
    break;
    }
    }	 
    }
    var wndExecuteOrders = parent.toolBarFrm.oWndExecuteOrders;
    if(wndExecuteOrders && (wndExecuteOrders.closed == false))
    wndExecuteOrders.GetRelationsByCloseOrderIDResult();		
    };
    */

    this.UpdateSystemParameters = function (sXml, objectID) {
        oIOProxy.UpdateSystemParameters2(sXml, objectID);
    };

    this.UpdateSystemParameters3 = function (sXml, objectID) {
        oIOProxy.UpdateSystemParameters3(sXml, objectID);
    };

    this.GetFormatLot = function (lot, isSplitLot) {
        return GetFormatLot(lot, isSplitLot);
    };
    this.GetFormatLot2 = function (lot, isSplitLot) {
        return GetFormatLot2(lot, isSplitLot, LotDecimal);
    };

    //Added by Michael on 2009-01-13
    this.UpdateDealingPolicyDetail = function (callWin, xml, eventMessages) {
        oIOProxy.UpdateDealingPolicyDetail(callWin, xml, eventMessages);
    };

    this.UpdatePolicyProcess = function (callWin, customerPolicyXml, employeePolicyXml) {
        oIOProxy.UpdatePolicyProcess(callWin, customerPolicyXml, employeePolicyXml);
    };

    //Setting
    this.ApplySettings = function () {
        this.mainWindow.parent.quotationFrm.FlexQuotationInit();
        this.mainWindow.parent.orderTaskFrm.OrderTaskInit();
        this.mainWindow.parent.quotationTaskFrm.QuotationTaskInit();
        //this.mainWindow.parent.QuotePolicyFrm.SettingLanguage();
        this.mainWindow.parent.QuotePolicyFrm.QuotePolicyInit();
        this.mainWindow.parent.SourceLevelAdjustmentFrm.SourceLevelAdjustmentInit();
        this.mainWindow.parent.propertyFrm.HistoryInit();
        this.mainWindow.parent.propertyFrm.flexPropertyInit();

        this.InitFrameset(optionGrid.Frameset);
    };

    this.InitFrameset = function (settingsKey) {
        if (!settings.Exists(settingsKey)) return;

        var setting = settings.Item(settingsKey);
        var parameter = setting.Parameter;
        if (parameter != "") {
            var msXml = new ActiveXObject("MSXML.DOMDocument");
            msXml.loadXML(parameter);

            var sNodeName;
            var sNodeValue;
            var gridNode = msXml.firstChild;
            try {
                for (var j = 0; j < gridNode.attributes.length; j++) {
                    sNodeName = gridNode.attributes.item(j).nodeName;
                    sNodeValue = gridNode.getAttribute(sNodeName);
                    switch (sNodeName) {
                        case "OuterFrameset":
                            window.parent.OuterFrameset.rows = sNodeValue;
                            break;
                        case "InnerFrameset":
                            //Repair exists setting
                            //window.parent.InnerFrameset.rows = sNodeValue;
                            window.parent.OuterFrameset.rows = "25,*";
                            window.parent.InnerFrameset2.cols = "74%,*";
                            window.parent.QuotationFrameset.rows = "40%,30%,*";
                            window.parent.QuotationAndQuotePolicyFrameset.cols = "56%,*";
                            window.parent.AdjustFrameset.cols = "80%,*";
                            return;
                            break;
                        case "InnerFrameset2":
                            window.parent.InnerFrameset2.cols = sNodeValue;
                            break;
                        case "QuotationFrameset":
                            window.parent.QuotationFrameset.rows = sNodeValue;
                            break;
                        case "QuotationAndQuotePolicyFrameset":
                            window.parent.QuotationAndQuotePolicyFrameset.cols = sNodeValue;
                            break;
                        case "AdjustFrameset":
                            window.parent.AdjustFrameset.cols = sNodeValue;
                            break;
                    }
                }
            }
            catch (e) {
                window.parent.OuterFrameset.rows = "25,*";
                window.parent.InnerFrameset2.cols = "74%,*";
                window.parent.QuotationFrameset.rows = "40%,30%,*";
                window.parent.QuotationAndQuotePolicyFrameset.cols = "56%,*";
                window.parent.AdjustFrameset.cols = "80%,*";
            }
        }
    };

    //Added Michael on 2005-06-30
    this.InitGridForSingleRecord = function (grid, settingsKey, languages) {
        var parameter = "";
        with (grid) {
            var rowIndex = FixedRows;
            if (settings.Exists(settingsKey)) {
                var setting = settings.Item(settingsKey);
                parameter = setting.Parameter;
                if (parameter != "") {
                    var msXml = new ActiveXObject("MSXML.DOMDocument");
                    msXml.loadXML(parameter);

                    var sNodeName;
                    var sNodeValue;
                    var gridNode = msXml.firstChild;

                    for (var j = 0; j < gridNode.attributes.length; j++) {
                        sNodeName = gridNode.attributes.item(j).nodeName;
                        sNodeValue = gridNode.getAttribute(sNodeName);
                        switch (sNodeName) {
                            case "FontName":
                            case "FontSize":
                                grid[sNodeName] = sNodeValue;
                                break;
                        }
                    }

                    var columnsNode = gridNode.firstChild;
                    var iCount = columnsNode.childNodes.length;

                    for (var j = 0; j < iCount; j++) {
                        var columnNode = columnsNode.childNodes.item(j);

                        var sRowKey = columnNode.getAttribute("ColKey");
                        var sRowHidden = (columnNode.getAttribute("ColHidden") == "1") ? true : false;

                        if (typeof (languages[sRowKey]) != 'undefined') {
                            TextMatrix(rowIndex, 0) = languages[sRowKey];
                            RowData(rowIndex) = sRowKey; //ColKey
                            RowHidden(rowIndex) = sRowHidden;

                            if (languages[sRowKey] == "") RowHidden(rowIndex) = true;

                            rowIndex++;
                        }
                    }
                    if (rowIndex < Rows) {
                        for (var sRowKey in languages) {
                            var isExistsRowKey = false;
                            for (var iRow = FixedRows; iRow < Rows; iRow++) {
                                if (RowData(iRow) == sRowKey) {
                                    isExistsRowKey = true;
                                    break;
                                }
                            }

                            if (isExistsRowKey == false) {
                                TextMatrix(rowIndex, 0) = languages[sRowKey];
                                RowData(rowIndex) = sRowKey; //ColKey
                                RowHidden(rowIndex) = (languages[sRowKey] == "") ? true : false;

                                rowIndex++;
                            }
                        }
                    }
                }
            }
            if (parameter == "") {
                for (var sRowKey in languages) {
                    TextMatrix(rowIndex, 0) = languages[sRowKey];
                    RowData(rowIndex) = sRowKey; //ColKey
                    RowHidden(rowIndex) = (languages[sRowKey] == "") ? true : false;

                    rowIndex++;
                }
            }
        }

        //Fill Default Value: GridColumnsDefaultFormat(grid,gridColKey);
        return parameter;
    };

    this.FixColKeyBug = function (grid) {
        var cols = grid.Cols;
        grid.Cols = grid.FixedCols;
        grid.Cols = cols;

        var frozenCols = grid.FrozenCols;
        grid.FrozenCols = 0;
        grid.FrozenCols = frozenCols;
    };

    //Added Michael on 2005-06-30
    this.InitGrid = function (grid, settingsKey, languages) {
        this.FixColKeyBug(grid);
        var parameter = "";
        with (grid) {
            var columnIndex = FixedCols;
            if (settings.Exists(settingsKey)) {
                var setting = settings.Item(settingsKey);
                parameter = setting.Parameter;
                if (parameter != "") {
                    var msXml = new ActiveXObject("MSXML.DOMDocument");
                    msXml.loadXML(parameter);

                    var sNodeName;
                    var sNodeValue;
                    var gridNode = msXml.firstChild;

                    for (var j = 0; j < gridNode.attributes.length; j++) {
                        sNodeName = gridNode.attributes.item(j).nodeName;
                        sNodeValue = gridNode.getAttribute(sNodeName);
                        switch (sNodeName) {
                            case "FontName":
                            case "FontSize":
                                grid[sNodeName] = sNodeValue;
                                break;
                        }
                    }

                    var columnsNode = gridNode.firstChild;
                    var jCount = columnsNode.childNodes.length;
                    for (var j = 0; j < jCount; j++) {
                        var columnNode = columnsNode.childNodes.item(j);

                        var columnKey = columnNode.getAttribute("ColKey");
                        var columnWidth = columnNode.getAttribute("ColWidth");
                        var columnHidden = (columnNode.getAttribute("ColHidden") == "1") ? true : false;

                        if (columnIndex >= Cols) {
                            Cols++;
                        }

                        ColKey(columnIndex) = columnKey;
                        TextMatrix(0, columnIndex) = languages[columnKey];
                        ColWidth(columnIndex) = columnWidth;
                        ColHidden(columnIndex) = columnHidden;

                        if (languages[columnKey] == "") ColHidden(columnIndex) = true;

                        columnIndex++;
                    }
                    if (columnIndex < Cols) {
                        for (var columnKey in languages) {
                            if (ColIndex(columnKey) == -1) {
                                if (columnIndex >= Cols) {
                                    Cols++;
                                }
                                ColKey(columnIndex) = columnKey;
                                TextMatrix(0, columnIndex) = languages[columnKey];
                                //if (languages[columnKey] == "") ColHidden(columnIndex) = true;
                                ColHidden(columnIndex) = (languages[columnKey] == "") ? true : false;

                                columnIndex++;
                            }
                        }
                    }
                }
            }
            if (parameter == "") {
                for (var columnKey in languages) {
                    ColKey(columnIndex) = columnKey;
                    TextMatrix(0, columnIndex) = languages[columnKey];
                    if (languages[columnKey] == "") ColHidden(columnIndex) = true;

                    columnIndex++;
                }
            }
        }

        //Fill Default Value: GridColumnsDefaultFormat(grid,gridColKey);
        return parameter;
    };

    this.SpecialInitGrid = function (grid, settingsKey, languages) {
        this.FixColKeyBug(grid);
        var parameters = new Object();
        parameters.specialColumnParameters = new ActiveXObject("Scripting.Dictionary"); //key=colKey value=ColumnParameter
        var parameter = "";

        with (grid) {
            var columnIndex = FixedCols;
            if (settings.Exists(settingsKey)) {
                var setting = settings.Item(settingsKey);
                parameter = setting.Parameter;
                if (parameter != "") {
                    var msXml = new ActiveXObject("MSXML.DOMDocument");
                    msXml.loadXML(parameter);

                    var sNodeName;
                    var sNodeValue;
                    var gridNode = msXml.firstChild;

                    for (var j = 0; j < gridNode.attributes.length; j++) {
                        sNodeName = gridNode.attributes.item(j).nodeName;
                        sNodeValue = gridNode.getAttribute(sNodeName);
                        switch (sNodeName) {
                            case "FontName":
                            case "FontSize":
                                grid[sNodeName] = sNodeValue;
                                break;
                        }
                    }

                    var columnsNode = gridNode.firstChild;
                    var jCount = columnsNode.childNodes.length;
                    for (var j = 0; j < jCount; j++) {
                        var columnNode = columnsNode.childNodes.item(j);

                        var columnKey = columnNode.getAttribute("ColKey");
                        var columnWidth = columnNode.getAttribute("ColWidth");
                        var columnHidden = (columnNode.getAttribute("ColHidden") == "1") ? true : false;

//                        if (columnIndex >= Cols) {
//                            Cols++;
//                        }
                        if (settingsKey == optionGrid.GroupNetPositionGrid) {
                            switch (columnKey) {
                                case groupNetPositionGridColKey.GroupCode:
                                case groupNetPositionGridColKey.Selected:
                                case groupNetPositionGridColKey.OIPercent:
                                case groupNetPositionGridColKey.GroupId:
                                    ColKey(columnIndex) = columnKey;
                                    TextMatrix(0, columnIndex) = languages[columnKey];
                                    ColWidth(columnIndex) = columnWidth;
                                    ColHidden(columnIndex) = columnHidden;
                                    if (languages[columnKey] == "") ColHidden(columnIndex) = true;
                                    columnIndex++;
                                    break;
                                default:
                                    parameters.specialColumnParameters.Add(columnKey, new ColumnParameter(columnKey, columnWidth, columnHidden));
                                    break;
                            }
                        }
                    }
                }
            }
            if (parameter == "") {
                for (var columnKey in languages) {
                    if (settingsKey == optionGrid.GroupNetPositionGrid) {
                        switch (columnKey) {
                            case groupNetPositionGridColKey.GroupCode:
                            case groupNetPositionGridColKey.Selected:
                            case groupNetPositionGridColKey.OIPercent:
                            case groupNetPositionGridColKey.GroupId:
                                ColKey(columnIndex) = columnKey;
                                TextMatrix(0, columnIndex) = languages[columnKey];
                                if (languages[columnKey] == "") ColHidden(columnIndex) = true;
                                columnIndex++;
                                break;
                            default:
                                parameters.specialColumnParameters.Add(columnKey, new ColumnParameter(columnKey, 750, false));
                                break;
                        }
                    }
                }
            }
        }

        parameters.parameter = parameter;
        return parameters;
    };

    //Added Michael on 2005-06-30
    this.RefreshGridBySetting = function (grid, settingsKey, languages) {
        with (grid) {
            var columnIndex = FixedCols;

            if (settings.Exists(settingsKey)) {
                var setting = settings.Item(settingsKey);
                parameter = setting.Parameter;
                if (parameter != "") {
                    var msXml = new ActiveXObject("MSXML.DOMDocument");
                    msXml.loadXML(parameter);

                    var sNodeName;
                    var sNodeValue;
                    var gridNode = msXml.firstChild;

                    for (var j = 0; j < gridNode.attributes.length; j++) {
                        sNodeName = gridNode.attributes.item(j).nodeName;
                        sNodeValue = gridNode.getAttribute(sNodeName);
                        switch (sNodeName) {
                            case "FontName":
                            case "FontSize":
                                grid[sNodeName] = sNodeValue;
                                break;
                            case "RowHeight":
                                var rowHeightValue = parseInt(sNodeValue);
                                this.RefreshRowHeightStore(settingsKey, rowHeightValue);
                                for (var k = FixedRows, iCountK = Rows; k < iCountK; k++)
                                    RowHeight(k) = rowHeightValue;
                                break;
                        }
                    }

                    var columnsNode = gridNode.firstChild;
                    var iCount = columnsNode.childNodes.length;
                    for (var j = 0; j < iCount; j++) {
                        var columnNode = columnsNode.childNodes.item(j);

                        var columnKey = columnNode.getAttribute("ColKey");
                        var columnWidth = columnNode.getAttribute("ColWidth");
                        var columnHidden = (columnNode.getAttribute("ColHidden") == "1") ? true : false;
                        if (columnIndex >= Cols) Cols++;
                        ColPosition(ColIndex(columnKey)) = columnIndex;
                        ColWidth(columnIndex) = columnWidth;
                        ColHidden(columnIndex) = columnHidden;

                        if (languages[columnKey] == "") ColHidden(columnIndex) = true;

                        columnIndex++;
                    }
                }
            }
        }
    };

    this.RefreshRowHeightStore = function (settingsKey, rowHeight) {
        switch (settingsKey) {
            case optionGrid.QuotationGrid:
                this.QuotationGridRowHeight = rowHeight;
                break;
            case optionGrid.QuotationTaskGrid:
                this.QuotationTaskGridRowHeight = rowHeight;
                break;
            case optionGrid.QuotePolicyGrid:
                this.QuotePolicyGridRowHeight = rowHeight;
                break;
            case optionGrid.SourceLevelAdjustmentGrid:
                this.SourceLevelAdjustmentGridRowHeight = rowHeight;
                break;
            case optionGrid.OrderGrid:
                this.OrderGridRowHeight = rowHeight;
                break;
            case optionGrid.HistoryGrid:
                this.HistoryGridRowHeight = rowHeight;
                break;
            case optionGrid.PropertiesGrid:
                this.PropertiesGridRowHeight = rowHeight;
                break;
            case optionGrid.SearchGrid:
                this.SearchGridRowHeight = rowHeight;
                break;
            case optionGrid.SearchGridForCancelledOrder:
                this.SearchGridForCancelledOrderRowHeight = rowHeight;
                break;
            case optionGrid.InterestGrid:
                this.InterestGridRowHeight = rowHeight;
                break;
            case optionGrid.GroupNetPositionGrid:
                this.GroupNetPositionGridRowHeight = rowHeight;
                break;
            case optionGrid.InterestSummaryGrid:
                this.InterestSummaryGridRowHeight = rowHeight;
                break;
            case optionGrid.ExecuteOrderSummaryGrid:
                this.ExecuteOrderSummaryGridRowHeight = rowHeight;
                break;
            case optionGrid.InstantOrderListGrid:
                this.InstantOrderListGridRowHeight = rowHeight;
                break;
            case optionGrid.DealingPolicyDetailGrid:
                this.DealingPolicyDetailGridRowHeight = rowHeight;
                break;
            case optionGrid.CustomerPolicyManagementGrid:
                this.CustomerPolicyManagementGridRowHeight = rowHeight;
                break;
            case optionGrid.BlotterSelectionGrid:
                this.BlotterSelectionGridRowHeight = rowHeight;
                break;
            case optionGrid.ExecutedGrid:
                this.ExecutedGridRowHeight = rowHeight;
                break;
            case optionGrid.UnclosedOrderGrid:
                this.UnclosedOrderGridRowHeight = rowHeight;
                break;
            case optionGrid.OrderPrintGrid:
                this.OrderPrintGridRowHeight = rowHeight;
                break;
        }
    };

    this.QuotationGridRowHeight = null;
    this.QuotationTaskGridRowHeight = null;
    this.QuotePolicyGridRowHeight = null;
    this.SourceLevelAdjustmentGridRowHeight = null;
    this.OrderGridRowHeight = null;
    this.HistoryGridRowHeight = null;
    this.PropertiesGridRowHeight = null;
    this.SearchGridRowHeight = null;
    this.SearchGridForCancelledOrderRowHeight = null;
    this.InterestGridRowHeight = null;
    this.GroupNetPositionGridRowHeight = null;
    this.InterestSummaryGridRowHeight = null;
    this.DealingPolicyDetailGridRowHeight = null;
    this.CustomerPolicyManagementGridRowHeight = null;
    this.BlotterSelectionGridRowHeight = null
    this.ExecutedGridRowHeight = null;
    this.ExecuteOrderSummaryGridRowHeight = null;
    this.InstantOrderListGridRowHeight = null;
    this.UnclosedOrderGridRowHeight = null;
    this.OrderPrintGridRowHeight = null;
    this.GetRowHeight = function (settingsKey) {
        var rowHeight = null;
        switch (settingsKey) {
            case optionGrid.QuotationGrid:
                rowHeight = this.QuotationGridRowHeight;
                break;
            case optionGrid.QuotationTaskGrid:
                rowHeight = this.QuotationTaskGridRowHeight;
                break;
            case optionGrid.QuotePolicyGrid:
                rowHeight = this.QuotePolicyGridRowHeight;
                break;
            case optionGrid.SourceLevelAdjustmentGrid:
                rowHeight = this.SourceLevelAdjustmentGridRowHeight;
                break;
            case optionGrid.OrderGrid:
                rowHeight = this.OrderGridRowHeight;
                break;
            case optionGrid.HistoryGrid:
                rowHeight = this.HistoryGridRowHeight;
                break;
            case optionGrid.PropertiesGrid:
                rowHeight = this.PropertiesGridRowHeight;
                break;
            case optionGrid.SearchGrid:
                rowHeight = this.SearchGridRowHeight;
                break;
            case optionGrid.SearchGridForCancelledOrder:
                rowHeight = this.SearchGridForCancelledOrderRowHeight;
                break;
            case optionGrid.InterestGrid:
                rowHeight = this.InterestGridRowHeight;
                break;
            case optionGrid.GroupNetPositionGrid:
                rowHeight = this.GroupNetPositionGridRowHeight;
                break;
            case optionGrid.InterestSummaryGrid:
                rowHeight = this.InterestSummaryGridRowHeight;
                break;
            case optionGrid.InstantOrderListGrid:
                rowHeight = this.InstantOrderListGridRowHeight;
                break;
            case optionGrid.ExecuteOrderSummaryGrid:
                rowHeight = this.ExecuteOrderSummaryGridRowHeight;
                break;
            case optionGrid.DealingPolicyDetailGrid:
                rowHeight = this.DealingPolicyDetailGridRowHeight;
                break;
            case optionGrid.CustomerPolicyManagementGrid:
                rowHeight = this.CustomerPolicyManagementGridRowHeight;
                break;
            case optionGrid.BlotterSelectionGrid:
                rowHeight = this.BlotterSelectionGridRowHeight;
                break;
            case optionGrid.ExecutedGrid:
                rowHeight = this.ExecutedGridRowHeight;
                break;
            case optionGrid.UnclosedOrderGrid:
                rowHeight = this.UnclosedOrderGridRowHeight;
                break;
            case optionGrid.OrderPrintGrid:
                rowHeight = this.OrderPrintGridRowHeight;
                break;
        }
        if (rowHeight != null) return rowHeight;
        if (settings.Exists(settingsKey)) {
            var setting = settings.Item(settingsKey);
            parameter = setting.Parameter;
            if (parameter != "") {
                var msXml = new ActiveXObject("MSXML.DOMDocument");
                msXml.loadXML(parameter);

                var sNodeName;
                var sNodeValue;
                var gridNode = msXml.firstChild;

                for (var j = 0, iCount = gridNode.attributes.length; j < iCount; j++) {
                    sNodeName = gridNode.attributes.item(j).nodeName;
                    sNodeValue = gridNode.getAttribute(sNodeName);
                    if (sNodeName == "RowHeight") {
                        rowHeight = parseInt(sNodeValue);
                        this.RefreshRowHeightStore(settingsKey, rowHeight);
                        break;
                    }
                }
            }
        }

        return (rowHeight == null) ? 300 : rowHeight;
    };

    this.UpdateInstrumentParameterByDealingPolicyForm = function (callWin, instrumentParameterXmls, eventMessages, instrumentID, instrumentCode) {
        var succeed = oIOProxy.UpdateInstrument2(instrumentParameterXmls, "Instruments", eventMessages, instrumentID, instrumentCode);
        if (succeed) {
            if (!oInstruments.Exists(instrumentID)) return;
            var instrument = oInstruments.Item(instrumentID);
            var msXml = new ActiveXObject("MSXML.DOMDocument");
            msXml.loadXML(instrumentParameterXmls);
            var xmlNodes = msXml.firstChild;
            if (xmlNodes == null) return;
            for (var i = 0, count = xmlNodes.childNodes.length; i < count; i++) {
                var xmlNode = xmlNodes.childNodes.item(i);
                for (var j = 0, iCount = xmlNode.attributes.length; j < iCount; j++) {
                    var sNodeName = xmlNode.attributes.item(j).nodeName;
                    var sNodeValue = xmlNode.getAttribute(sNodeName);
                    if (sNodeName == "MaxDQLot") {
                        instrument.maxDQLot = parseFloat(sNodeValue);
                    }
                    else if (sNodeName == "MaxOtherLot") {
                        instrument.maxOtherLot = parseFloat(sNodeValue);
                    }
                    else if (sNodeName == "DQQuoteMinLot") {
                        instrument.dqQuoteMinLot = parseFloat(sNodeValue);
                    }
                    else if (sNodeName == "AutoDQMaxLot") {
                        instrument.autoDQMaxLot = parseFloat(sNodeValue);
                    }
                    else if (sNodeName == "AutoLmtMktMaxLot") {
                        instrument.autoLmtMktMaxLot = parseFloat(sNodeValue);
                    }
                    else if (sNodeName == "AcceptDQVariation") {
                        instrument.acceptDQVariation = parseInt(sNodeValue);
                    }
                    else if (sNodeName == "AcceptLmtVariation") {
                        instrument.acceptLmtVariation = parseInt(sNodeValue);
                    }
                    else if (sNodeName == "AcceptCloseLmtVariation") {
                        instrument.acceptCloseLmtVariation = parseInt(sNodeValue);
                    }
                    else if (sNodeName == "CancelLmtVariation") {
                        instrument.cancelLmtVariation = parseInt(sNodeValue);
                    }
                    else if (sNodeName == "AutoDQDelay") {
                        instrument.autoDQDelay = parseInt(sNodeValue);
                    }
                    else if (sNodeName == "AllowedNewTradeSides") {
                        instrument.allowedNewTradeSides = parseInt(sNodeValue);
                    }
                    else if (sNodeName == "AutoAcceptMaxLot") {
                        instrument.autoAcceptMaxLot = parseFloat(sNodeValue);
                    }
                    else if (sNodeName == "AutoCancelMaxLot") {
                        instrument.autoCancelMaxLot = parseFloat(sNodeValue);
                    }
                    else if (sNodeName == "HitPriceVariationForSTP") {
                        instrument.hitPriceVariationForSTP = parseInt(sNodeValue);
                    }
                }

                var oCurrentInstrumentID = this.mainWindow.oCurrentInstrumentID;
                this.mainWindow.OnQuotationPropertiesChanged(instrument, false);
                if (oCurrentInstrumentID == instrumentID) this.mainWindow.OnPropertyInstrumentChanged(instrument);
            }

        }
        if (!(callWin == null || callWin.closed == true)) {
            callWin.AfterSavedInstrumentParameterProcess(succeed);
        }
    };

    this.getInstrumentComboString = function (includeAllOption, allOptionCaption, isOriginCode) {
        var comboString = (isOriginCode) ? InstrumentOriginCodeComboString : InstrumentCodeComboString;
        if (comboString == "") {
            this.setInstrumentComboString();
            comboString = (isOriginCode) ? InstrumentOriginCodeComboString : InstrumentCodeComboString;
        }
        if (includeAllOption) {
            var allOption = "#;" + allOptionCaption;
            comboString = allOption + ((comboString == "") ? "" : "|") + comboString;
        }
        return comboString;
    };

    this.setInstrumentComboString = function () {
        InstrumentCodeComboString = "";
        var instrumentOriginCodes = new ActiveXObject("Scripting.Dictionary"); //key=OriginCode value=OriginCode
        var instrumentSortByCodes = (new VBArray(oInstrumentList.Items())).toArray();
        //instrumentSortByCodes = instrumentSortByCodes.sort(CompareCodeSort);
        for (var index = 0, iCount = instrumentSortByCodes.length; index < iCount; index++) {
            var instrumentSortByCode = instrumentSortByCodes[index];
            InstrumentCodeComboString += ((InstrumentCodeComboString == "") ? "" : "|") + instrumentSortByCode.getComboCodeItem();
            var comboOriginCodeItem = instrumentSortByCode.getComboOriginCodeItem();
            if (!instrumentOriginCodes.Exists(comboOriginCodeItem)) {
                instrumentOriginCodes.Add(comboOriginCodeItem, comboOriginCodeItem);
            }
        }

        InstrumentOriginCodeComboString = "";
        var instrumentOriginCodes2 = (new VBArray(instrumentOriginCodes.Items())).toArray();
        instrumentOriginCodes2 = instrumentOriginCodes2.sort(CompareOriginCodeSort);
        for (var index = 0, iCount = instrumentOriginCodes2.length; index < iCount; index++) {
            InstrumentOriginCodeComboString += ((InstrumentOriginCodeComboString == "") ? "" : "|") + instrumentOriginCodes2[index];
        }
    };

    this.getAccountComboString = function (includeAllOption,isShowCode) {
        var comboString = isShowCode ? AccountComboString : AccountNameComboString;
        if (includeAllOption) {
            var allOption = "#;" + "All";
            comboString = allOption + ((comboString == "") ? "" : "|") + comboString;
        }
        return comboString;
    };

    this.existsInstrumentIdForOpenInterestSummary = function (instrumentSelected, isSelectOriginCode, instrumentId) {
        if (instrumentSelected == "All") return true;
        if (!isSelectOriginCode && instrumentSelected.length >= 36) {
            return instrumentSelected.toLowerCase() == instrumentId.toLowerCase();
        }
        var instruments = (new VBArray(this.mainWindow.oInstruments.Items())).toArray();
        for (var index = 0, count = instruments.length; index < count; index++) {
            if (instruments[index].originCode == instrumentSelected) {
                if (instruments[index].id.toLowerCase() == instrumentId.toLowerCase()) {
                    return true;
                }
            }
        }
        return false;
    };

    this.getInstrumentIdsForOpenInterestSummary = function (instrumentSelected, isSelectOriginCode) {
        if (instrumentSelected != "All" && !isSelectOriginCode && instrumentSelected.length >= 36) {
            return new Array(instrumentSelected);
        }

        var instrumentIDs = new Array();
        var i = 0;
        var instruments = (new VBArray(this.mainWindow.oInstruments.Items())).toArray();
        for (var index = 0, count = instruments.length; index < count; index++) {
            if (instrumentSelected == "All" || (isSelectOriginCode && instruments[index].originCode == instrumentSelected)) {
                instrumentIDs[i] = instruments[index].id;
                i++;
            }
        }
        return instrumentIDs;
    };

    this.GetUpdateHighLowBatchProcessInfosResult = function (xmlData) {
        oUpdateHighLowBatchProcessInfos = new ActiveXObject("Scripting.Dictionary"); //key=id value=UpdateHighLowBatchProcessInfo        
        if (xmlData == null) return;

        var xmlRows = xmlData.childNodes;
        for (var i = 0, length = xmlRows.length; i < length; i++) {
            var xmlRow = xmlRows.item(i);
            var updateHighLowBatchProcessInfo = new UpdateHighLowBatchProcessInfo();
            updateHighLowBatchProcessInfo.UpdateByXmlRow(xmlRow);

            oUpdateHighLowBatchProcessInfos.Add(updateHighLowBatchProcessInfo.getId(), updateHighLowBatchProcessInfo);
        }
    };

    this.RestoreHighLowResult = function (batchProcessId, instrumentId) {
        var updateHighLowBatchProcessInfoId = instrumentId + "_" + batchProcessId.toString();
        if (oUpdateHighLowBatchProcessInfos.Exists(updateHighLowBatchProcessInfoId)) {
            oUpdateHighLowBatchProcessInfos.Remove(updateHighLowBatchProcessInfoId);
        }
    };

    this.UpdateHighLowResult = function (batchProcessId, instrumentId, instrumentCode, newInput, isUpdateHigh, highBid, lowBid, updateTime) {
        var updateHighLowBatchProcessInfo = new UpdateHighLowBatchProcessInfo();
        updateHighLowBatchProcessInfo.Instance(batchProcessId, instrumentId, instrumentCode, newInput, isUpdateHigh, highBid, lowBid, updateTime);

        oUpdateHighLowBatchProcessInfos.Add(updateHighLowBatchProcessInfo.getId(), updateHighLowBatchProcessInfo);
    };

    this.GetAccountComboListResult = function (xmlData) {
        AccountCodeList = new ActiveXObject("Scripting.Dictionary");
        AccountIdList = new ActiveXObject("Scripting.Dictionary"); 
        AccountComboString = "";
        AccountNameComboString = "";
        if (xmlData == null) return;

        var xmlRows = xmlData.childNodes;
        for (var i = 0, length = xmlRows.length; i < length; i++) {
            var xmlRow = xmlRows.item(i);
            var xmlRowColumns = xmlRow.childNodes;
            var id = null;
            var code;
            var name;
            for (var index2 = 0, length2 = xmlRowColumns.length; index2 < length2; index2++) {
                var column = xmlRowColumns.item(index2);
                var fieldName = column.tagName;
                var value = column.text;
                switch (fieldName) {
                    case "ID":
                        id = value;
                        break;
                    case "Code":
                        code = value;
                        break;
                    case "Name":
                        name = value;
                        break;

                }
            }
            if (id != null) {
                AccountComboString += ((AccountComboString == "") ? "" : "|") + "#" + id + ";" + code;
                AccountNameComboString += ((AccountNameComboString == "") ? "" : "|") + "#" + id + ";" + name;

                if (!AccountCodeList.Exists(code)) {
                    AccountCodeList.Add(code,id);
                    AccountIdList.Add(id,code); 
                }
            }
        }
    };
}

function CompareCodeSort(objA, objB) {
    if (objA.code > objB.code)
        return 1;
    else if (objA.code < objB.code)
        return -1;
    else
        return 0;
}

function CompareOriginCodeSort(objA, objB) {
    if (objA > objB)
        return 1;
    else if (objA < objB)
        return -1;
    else
        return 0;
}
