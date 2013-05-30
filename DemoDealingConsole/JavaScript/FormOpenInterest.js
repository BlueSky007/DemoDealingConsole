
function GetQuotationFrm() {
    //return window.dialogArguments.parent.quotationFrm;
    return window.opener.parent.quotationFrm;    
}

function OpenInterestOnload() {
    GroupNetPositionInit();
//    OpenInterestListInit();
    OpenInterestSummaryInit();
//    OpenInterestListShow();
    GroupNetPositionShow();
}

function OpenInterestOnunload() {
//    if (window.dialogArguments && window.dialogArguments.oWndOpenInterest) {
//        window.dialogArguments.oWndOpenInterest = null;
//    }
    if (window.opener && window.opener.oWndOpenInterest) {
        window.opener.oWndOpenInterest = null;
    }
}

function GroupNetPositionShow() {
    window.document.all._GroupNetPositionButton0.style.fontWeight = "bold";
    window.document.all._GroupNetPositionButton1.style.fontWeight = "bold";
    window.document.all._GroupNetPositionButton2.style.fontWeight = "bold";
    window.document.all._GroupNetPositionTBody.style.display = 'block';

    window.document.all._OpenInterestSummaryButton0.style.fontWeight = "normal";
    window.document.all._OpenInterestSummaryButton1.style.fontWeight = "normal";
    window.document.all._OpenInterestSummaryButton2.style.fontWeight = "normal";
    window.document.all._OpenInterestSummaryTBody.style.display = 'none';

//    window.document.all._OpenInterestListButton0.style.fontWeight = "normal";
//    window.document.all._OpenInterestListButton1.style.fontWeight = "normal";
//    window.document.all._OpenInterestListButton2.style.fontWeight = "normal";
    window.document.all._OpenInterestListTBody.style.display = 'none';
}

function OpenInterestListShow() {
    window.document.all._GroupNetPositionButton0.style.fontWeight = "normal";
    window.document.all._GroupNetPositionButton1.style.fontWeight = "normal";
    window.document.all._GroupNetPositionButton2.style.fontWeight = "normal";
    window.document.all._GroupNetPositionTBody.style.display = 'none';

//    window.document.all._OpenInterestListButton0.style.fontWeight = "bold";
//    window.document.all._OpenInterestListButton1.style.fontWeight = "bold";
//    window.document.all._OpenInterestListButton2.style.fontWeight = "bold";
    window.document.all._OpenInterestListTBody.style.display = 'block';

    window.document.all._OpenInterestSummaryButton0.style.fontWeight = "normal";
    window.document.all._OpenInterestSummaryButton1.style.fontWeight = "normal";
    window.document.all._OpenInterestSummaryButton2.style.fontWeight = "normal";
    window.document.all._OpenInterestSummaryTBody.style.display = 'none';
}

function OpenInterestSummaryShow() {
    window.document.all._GroupNetPositionButton0.style.fontWeight = "normal";
    window.document.all._GroupNetPositionButton1.style.fontWeight = "normal";
    window.document.all._GroupNetPositionButton2.style.fontWeight = "normal";
    window.document.all._GroupNetPositionTBody.style.display = 'none';

//    window.document.all._OpenInterestListButton0.style.fontWeight = "normal";
//    window.document.all._OpenInterestListButton1.style.fontWeight = "normal";
//    window.document.all._OpenInterestListButton2.style.fontWeight = "normal";
    window.document.all._OpenInterestListTBody.style.display = 'none';

    window.document.all._OpenInterestSummaryButton0.style.fontWeight = "bold";
    window.document.all._OpenInterestSummaryButton1.style.fontWeight = "bold";
    window.document.all._OpenInterestSummaryButton2.style.fontWeight = "bold";
    window.document.all._OpenInterestSummaryTBody.style.display = 'block';
}

var _RepairNewOrderMultiNotifyOrders = new ActiveXObject("Scripting.Dictionary"); //key=id value=null
function AddOrderToOpenInterestGrid(quotationFrm, order) {
    if (_RepairNewOrderMultiNotifyOrders.Exists(order.id)) {
        //_RepairNewOrderMultiNotifyOrders.Remove(order.id);
        return;
    }
    else {
        _RepairNewOrderMultiNotifyOrders.Add(order.id, order.id);
    }
    AddOrderToOpenInterestListGrid(quotationFrm, order);
    AddOrderToOpenInterestSummaryGrid(quotationFrm, order);
    AddOrderToGroupNetPositionGrid(quotationFrm, order);
}

function RefreshGroupNetPositionGridData() {
    RefreshDataForGroupNetPositionGrid();
}

function DeleteOrderFromOpenInterestGrid(quotationFrm, deletedOrderId, accountId, instrumentId, order) {
    DeleteOrderFromOpenInterestListGrid(quotationFrm, deletedOrderId, accountId, instrumentId);
    DeleteOrderFromOpenInterestSummaryGrid(quotationFrm, deletedOrderId, accountId, instrumentId);
    DeleteOrderFromGroupNetPositionGrid(quotationFrm, deletedOrderId, accountId, instrumentId, order);
}

function AffectOrderToOpenInterestGrid(quotationFrm, order, deletedOrderId) {
    AffectOrderToOpenInterestListGrid(quotationFrm, order);
    AffectOrderToOpenInterestSummaryGrid(quotationFrm, order);
    AffectOrderToGroupNetPositionGrid(quotationFrm, order);
}