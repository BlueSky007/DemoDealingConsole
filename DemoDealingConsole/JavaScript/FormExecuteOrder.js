
function GetQuotationFrm() {
    //return window.dialogArguments.parent.quotationFrm;
    return window.opener.parent.quotationFrm;
}

function ExecuteOrderOnload() {
    ExecuteOrdersInit();
    ExecuteOrderSummaryInit();
    ExecuteOrderListShow();
}

function ExecuteOrderOnunload() {
//    if (window.dialogArguments && window.dialogArguments.oWndExecuteOrders) {
//        window.dialogArguments.oWndExecuteOrders = null;
//    }
    if (window.opener && window.opener.oWndExecuteOrders) {
        window.opener.oWndExecuteOrders = null;
    }
}

function ExecuteOrderSummaryShow() {
    window.document.all._ExecuteOrderListTBody.style.display = 'none';
    window.document.all._ExecuteOrderListTR.style.display = 'none';
    window.document.all._ExecuteOrderSummaryButton1.style.fontWeight = "bold";
    window.document.all._ExecuteOrderSummaryButton2.style.fontWeight = "bold";
    window.document.all._ExecuteOrderSummaryTBody.style.display = 'block';
    window.document.all._ExecuteOrderSummaryTR.style.display = 'block';
    window.document.all._ExecuteOrderListButton1.style.fontWeight = "normal";
    window.document.all._ExecuteOrderListButton2.style.fontWeight = "normal";
}

function ExecuteOrderListShow() {
    window.document.all._ExecuteOrderListTBody.style.display = 'block';
    window.document.all._ExecuteOrderListTR.style.display = 'block';
    window.document.all._ExecuteOrderSummaryButton1.style.fontWeight = "normal";
    window.document.all._ExecuteOrderSummaryButton2.style.fontWeight = "normal";
    window.document.all._ExecuteOrderSummaryTBody.style.display = 'none';
    window.document.all._ExecuteOrderSummaryTR.style.display = 'none';
    window.document.all._ExecuteOrderListButton1.style.fontWeight = "bold";
    window.document.all._ExecuteOrderListButton2.style.fontWeight = "bold";
}

var _RepairNewOrderMultiNotifyOrders = new ActiveXObject("Scripting.Dictionary"); //key=id value=null
function AddOrderToExecuteOrderGrid(quotationFrm, order) {
    if (_RepairNewOrderMultiNotifyOrders.Exists(order.id)) {
        //_RepairNewOrderMultiNotifyOrders.Remove(order.id);
        return;
    }
    else {
        _RepairNewOrderMultiNotifyOrders.Add(order.id, order.id);
    }
    AddOrderToExecuteOrderListGrid(quotationFrm, order);
    AddOrderToExecuteOrderSummaryGrid(quotationFrm, order);
}

function DeleteOrderFromExecuteOrderGrid(quotationFrm, deletedOrderId, accountId, instrumentId) {
    DeleteOrderFromExecuteOrderListGrid(quotationFrm, deletedOrderId, accountId, instrumentId);
    DeleteOrderFromExecuteOrderSummaryGrid(quotationFrm, deletedOrderId, accountId, instrumentId);
}

function AffectOrderToExecuteOrderGrid(quotationFrm, order, deletedOrderId) {
    AffectOrderToExecuteOrderListGrid(quotationFrm, order);
    AffectOrderToExecuteOrderSummaryGrid(quotationFrm, order);
}