
function LMTInit() {
    this.quotationFrm = dialogArguments[2];
    var limitProcessGridLanguage = quotationFrm.limitProcessGridLanguage;

    var titleHeight = parseInt(window.dialogHeight) - oBodyLMT.clientHeight;
    window.dialogHeight = window.Table1.clientHeight + titleHeight + "px";
    window.dialogWidth = window.Table1.clientWidth + "px";
    window.dialogTop = (parseInt(window.screen.height) - window.Table1.clientHeight) / 2 + "px";
    window.dialogLeft = (parseInt(window.screen.width) - window.Table1.clientWidth) / 2 + "px";

    var lColIndex = 0;
    with (vsflexLMT) {
        //Fill ColKey
        Rows = 1;
        FixedRows = 1;
        FixedCols = 0;
        Cols = 17;

        TextMatrix(0, lColIndex) = limitProcessGridLanguage["Unconfirm"];
        ColKey(lColIndex) = "Unconfirm";
        ColWidth(lColIndex) = 800;
        ColDataType(lColIndex) = flexDTBoolean;
        lColIndex++;

        TextMatrix(0, lColIndex) = limitProcessGridLanguage["Account"];
        ColKey(lColIndex) = "Account";
        ColWidth(lColIndex) = 1000;
        lColIndex++;

        TextMatrix(0, lColIndex) = limitProcessGridLanguage["OrderDate"];
        ColKey(lColIndex) = "OrderDate";
        ColWidth(lColIndex) = 1000;
        ColDataType(lColIndex) = flexDTDate;
        ColFormat(lColIndex) = "yyyy-MM-dd HH:mm:ss";
        lColIndex++;

        TextMatrix(0, lColIndex) = limitProcessGridLanguage["OpenClose"];
        ColKey(lColIndex) = "OpenClose";
        ColWidth(lColIndex) = 1000;
        lColIndex++;

        TextMatrix(0, lColIndex) = limitProcessGridLanguage["BuyLot"];
        ColKey(lColIndex) = "BuyLot";
        ColWidth(lColIndex) = 1000;
        lColIndex++;

        TextMatrix(0, lColIndex) = limitProcessGridLanguage["SellLot"];
        ColKey(lColIndex) = "SellLot";
        ColWidth(lColIndex) = 1000;
        lColIndex++;

        TextMatrix(0, lColIndex) = limitProcessGridLanguage["QuotePolicyCode"];
        ColKey(lColIndex) = "QuotePolicyCode";
        ColWidth(lColIndex) = 1410;
        lColIndex++;

        TextMatrix(0, lColIndex) = limitProcessGridLanguage["Price"];
        ColKey(lColIndex) = "Price";
        ColWidth(lColIndex) = 1000;
        lColIndex++;

        TextMatrix(0, lColIndex) = limitProcessGridLanguage["Message"];
        ColKey(lColIndex) = "Message";
        ColWidth(lColIndex) = 1000;
        ColHidden(lColIndex) = true;
        lColIndex++;

        Cols = lColIndex;

        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSortAndMove;
        Editable = flexEDKbdMouse;
        SelectionMode = flexSelectionFree;
    }
    this.toolBarFrm = dialogArguments[0];
    this.orderTaskFrm = dialogArguments[1];
    
    this.oDealingConsole = dialogArguments[3];

    FillSelectInstrument();
    window.SelectLMTProcess.selectedIndex = 0;
    ResetUI();

}

function ResetUI() {
    //window.SelectLMTProcess.selectedIndex = 0;
    this.isActive = false;
    InitControlStatus();
    vsflexLMT.Rows = vsflexLMT.FixedRows;
}


//Added by Michael on 2005-03-21	
function FillSelectInstrument() {
    try {
        var control = window.SelectLMTProcess;
        var oInstruments = this.oDealingConsole.mainWindow.oInstruments;

        control.clearAttributes();
        while (control.options.length != 0) {
            control.options.remove(0);
        }
        var messageLanguage = this.quotationFrm.messageLanguage;
        FillSelect(control, messageLanguage["SelectInstrumentAlert"], "");
        if (oInstruments != null) {
            var instruments = (new VBArray(oInstruments.Items())).toArray();
            for (var index = 0, count = instruments.length; index < count; index++) {
                FillSelect(control, instruments[index].code, instruments[index].id);
            }
        }
        control.selectIndex = 0;
    }
    catch (e)
	{ }
}


//Added by Michael on 2005-03-21	
function FillSelect(control, elementInnerText, elementValue) {
    var element = document.createElement("OPTION");
    control.add(element);
    element.innerText = elementInnerText;
    element.value = elementValue;
}

//Added by Michael on 2005-03-21
function InitControlStatus() {
    this.btnApply.disabled = !this.isActive;
    this.btnExecute.disabled = !this.isActive;
    this.textBid.disabled = !this.isActive;
    this.textAsk.disabled = !this.isActive;
}

function Fill(orders) {
    GetInstrument();
    if (!window.instrument) return;
    var commonLanguage = this.quotationFrm.commonLanguage;
    for (var index in orders) {
        var account = orders[index].GetAccount();

        var line = vsflexLMT.Rows;
        vsflexLMT.AddItem("");
        vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Account")) = account ? account.code : orders[index].accountID;
        vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("OrderDate")) = GetDateTimeString(orders[index].tran.submitTime, "DateTime"); //.getVarDate();
        vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("OpenClose")) = orders[index].isOpen ? commonLanguage["Open"] : commonLanguage["Close"];
        if (orders[index].isBuy == true)
            vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("BuyLot")) = orders[index].GetFormatLot2(orders[index].lot);
        else
            vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("SellLot")) = orders[index].GetFormatLot2(orders[index].lot);
        //vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Price")) = orders[index].setPrice.ToString();
        /*
        if(window.instrument.lastQuotation)
        {
        if(window.instrument.isNormal == orders[index].isBuy)
        vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Price")) = window.instrument.lastQuotation.ask.ToString();
        else
        vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Price")) = window.instrument.lastQuotation.bid.ToString();
        }
        */
        vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("QuotePolicyCode")) = orders[index].GetQuotePolicyCode();
        if (window.instrument.overrideQuotation) {
            if (window.instrument.isNormal == orders[index].isBuy) {
                if (window.instrument.overrideQuotation.ask)
                    vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Price")) = window.instrument.overrideQuotation.ask.ToString();
            }
            else {
                if (window.instrument.overrideQuotation.bid)
                    vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Price")) = window.instrument.overrideQuotation.bid.ToString();
            }
        }

        vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Message")) = OrderStatus.GetOrderStatusString(orders[index].status, this.quotationFrm.commonLanguage);
        vsflexLMT.RowData(line) = orders[index];

        SetRowForeColor(vsflexLMT, line, orders[index].isBuy ? color_blue : color_red);

        this.isActive = true; //(orders[index].status == OrderStatus.TimeArrived);
    }

    /*
    if(window.instrument.lastQuotation)
    {
    window.labelSource.innerText = window.instrument.lastQuotation.origin.ToString();
    window.textBid.value = window.instrument.lastQuotation.bid.ToString();
    window.textAsk.value = window.instrument.lastQuotation.ask.ToString();
    }
    */

    if (window.instrument.overrideQuotation) {
        if (window.instrument.overrideQuotation.origin)
            window.labelSource.innerText = window.instrument.overrideQuotation.origin.ToString();
        if (window.instrument.overrideQuotation.bid)
            window.textBid.value = window.instrument.overrideQuotation.bid.ToString();
        if (window.instrument.overrideQuotation.ask)
            window.textAsk.value = window.instrument.overrideQuotation.ask.ToString();
    }

    window.labelSell.innerText = commonLanguage["TotalSell"] + ":" + GetTotalLot(orders, true);
    window.labelBuy.innerText = commonLanguage["TotalBuy"] + ":" + GetTotalLot(orders, false);

    //this.orderType = orders[0].tran.orderType;
    //this.owner = dialogArguments[1];
    //dialogArguments[1].LMTDialog = this;

    this.isActive = true;
    InitControlStatus();
}

//Added by Michael on 2005-03-21	
function GetInstrument() {
    var instrumentID = window.SelectLMTProcess.value;
    if (instrumentID != "")
        var oInstruments = this.oDealingConsole.mainWindow.oInstruments;
    if (typeof (oInstruments) != "undefined")           //add by Sam,Fixed when select 'Please select a item!' occur 'object is undefined' error
    {
        if (oInstruments.Exists(instrumentID)) {
            window.instrument = oInstruments.Item(instrumentID);
        }
    }
}

//Modified by Michael on 2005-03-21	
function LMTProcess_click() {
    ResetUI();
    GetInstrument();
    //window.instrument = window.SelectLMTProcess.value;
    if (!window.instrument) {
        alert("Please select an item!");
        return;
    }
    var orders = this.orderTaskFrm.GetLMTOrdersToExecute(window.instrument.id);
    if (orders != null) {
        Fill(orders);
    }
}

function LMTFinish() {
    //this.owner.LMTDialog = null;
}

function OnLMTBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    switch (vsflexLMT.ColKey(newCol)) {
        case "Unconfirm":
        case "Price":
            if (this.isActive == true) {
                vsflexLMT.Editable = flexEDKbdMouse;
                break;
            }
        default:
            vsflexLMT.Editable = flexEDNone;
            break;
    }
}

function OnLMTValidateEdit(row, col, cancel) {
    switch (vsflexLMT.ColKey(col)) {
        case "Unconfirm":
            {
                var order = vsflexLMT.RowData(row);
                for (var line = vsflexLMT.FixedRows; line < vsflexLMT.Rows; line++) {
                    var orderTemp = vsflexLMT.RowData(line);
                    if (order.tran.id == orderTemp.tran.id)
                        vsflexLMT.Cell(flexcpChecked, line, col) = vsflexLMT.Cell(flexcpChecked, row, col);
                }
            }
            break;
        case "Price":
            {
                var order = vsflexLMT.RowData(row);
                //var window.instrument = order.GetInstrument();
                GetInstrument();
                if (!window.instrument) return;
                var newValue = vsflexLMT.EditText;
                var source = vsflexLMT.TextMatrix(row, col);
                var adjustPriceString = GetAdjustPrice(newValue, source, window.instrument.numeratorUnit, window.instrument.denominator);
                //var adjustPrice = new Price(); 
                //adjustPrice.Normalize(adjustPriceString, window.instrument.numeratorUnit, window.instrument.denominator);
                var quotationFrm = dialogArguments[2];
                var adjustPrice = quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, window.instrument.numeratorUnit, window.instrument.denominator);

                vsflexLMT.EditText = (adjustPrice == null) ? "" : adjustPrice.ToString();
            }
            break;
        default:
            break;
    }
}

function OnLMTApply() {
    //var window.instrument = null;
    GetInstrument();
    if (!window.instrument) return;

    var bid = null;
    var ask = null;
    //if(!window.instrument)
    //	window.instrument = order.GetInstrument();
    if (!bid) {
        var newValue = textBid.value;

        //var oldValue = window.instrument.lastQuotation.ToString();
        //var oldValue = window.instrument.overrideQuotation.ToString();
        var oldValue = (instrument.overrideQuotation.bid == null) ? "" : instrument.overrideQuotation.bid.ToString();

        var adjustPriceString = GetAdjustPrice(newValue, oldValue, window.instrument.numeratorUnit, window.instrument.denominator);
        //bid = new Price();
        //bid.Normalize(adjustPriceString, window.instrument.numeratorUnit, window.instrument.denominator);
        var quotationFrm = dialogArguments[2];
        bid = quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, window.instrument.numeratorUnit, window.instrument.denominator);
    }
    if (!ask) {
        var newValue = textAsk.value;

        //var oldValue = window.instrument.lastQuotation.ToString();
        //var oldValue = window.instrument.overrideQuotation.ToString();
        var oldValue = (instrument.overrideQuotation.ask == null) ? "" : instrument.overrideQuotation.ask.ToString();

        var adjustPriceString = GetAdjustPrice(newValue, oldValue, window.instrument.numeratorUnit, window.instrument.denominator);
        //ask = new Price();
        //ask.Normalize(adjustPriceString, window.instrument.numeratorUnit, window.instrument.denominator);
        var quotationFrm = dialogArguments[2];
        ask = quotationFrm.ObjectPool.GetCorrectPriceHelper(adjustPriceString, window.instrument.numeratorUnit, window.instrument.denominator);
    }

    var isProblematic = false;
    for (var line = vsflexLMT.FixedRows; line < vsflexLMT.Rows; line++) {
        var order = vsflexLMT.RowData(line);
        if (window.instrument.isNormal == order.isBuy) {
            if (!isProblematic) {
                isProblematic = window.instrument.IsProblematic(ask);
                if (isProblematic) break;
            }
        }
        else {
            if (!isProblematic) {
                isProblematic = window.instrument.IsProblematic(bid);
                if (isProblematic) break;
            }
        }
    }
    if (isProblematic) {
        var quotationFrm = dialogArguments[2];
        var messageLanguage = quotationFrm.messageLanguage;
        var args = new Array(messageLanguage["LMTProcessAlert"], messageLanguage["AlertAcceptButton"], messageLanguage["AlertRejectButton"]);
        isProblematic = !window.showModalDialog("Confirm.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
    }
    if (!isProblematic) {
        for (var line = vsflexLMT.FixedRows; line < vsflexLMT.Rows; line++) {
            var order = vsflexLMT.RowData(line);
            if (window.instrument.isNormal == order.isBuy) {
                vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Price")) = ask.ToString();
            }
            else {
                vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Price")) = bid.ToString();
            }
        }
    }
}

function OnLMTExecute() {
    GetInstrument();
    if (!window.instrument) return;
    //var window.instrument = null;
    var isProblematic = false;
    var outArgs = null;
    for (var line = vsflexLMT.FixedRows; line < vsflexLMT.Rows; line++) {
        var order = vsflexLMT.RowData(line);
        var priceStr = vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Price"));
        var isUnconfirm = (vsflexLMT.Cell(flexcpChecked, line, vsflexLMT.ColIndex("Unconfirm")) == flexChecked) ? true : false;
        if (!isUnconfirm) {
            var price = quotationFrm.ObjectPool.GetCorrectPriceHelper(priceStr, window.instrument.numeratorUnit, window.instrument.denominator);
            if (!isProblematic) {
                isProblematic = window.instrument.IsProblematic(price);
                if (isProblematic) break;
            }

            //			if (outArgs == null) outArgs = new Array();
            //			outArgs.push( new Array(order, priceStr, isUnconfirm) );
        }
    }
    if (isProblematic) {
        var messageLanguage = quotationFrm.messageLanguage;
        var args = new Array(messageLanguage["LMTProcessAlert"], messageLanguage["AlertAcceptButton"], messageLanguage["AlertRejectButton"]);
        isProblematic = !window.showModalDialog("Confirm.aspx", args, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
    }
    if (!isProblematic) {
        for (var line = vsflexLMT.FixedRows; line < vsflexLMT.Rows; line++) {
            var order = vsflexLMT.RowData(line);
            var priceStr = vsflexLMT.TextMatrix(line, vsflexLMT.ColIndex("Price"));
            var isUnconfirm = (vsflexLMT.Cell(flexcpChecked, line, vsflexLMT.ColIndex("Unconfirm")) == flexChecked) ? true : false;
            if (!isUnconfirm) {
                if (outArgs == null) outArgs = new Array();
                outArgs.push(new Array(order, priceStr, isUnconfirm));
            }
        }
    }

    //window.returnValue = outArgs;
    //window.close();
    if (outArgs != null) {
        this.orderTaskFrm.ExecuteLMTOrders(outArgs);

        window.SelectLMTProcess.selectedIndex = 0;
        ResetUI();
    }
}

/*
function AddOrderToLMTGrid(order, orders)
{
if(window.instrument.id != order.tran.instrumentID ||
window.orderType != order.tran.orderType)
return;
	
var account = order.GetAccount();
	
var vsflexGrid = window.vsflexLMT;
var line = vsflexGrid.Rows;
vsflexGrid.AddItem("");
vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Account")) = account ? account.code : order.tran.accountID;
vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("OrderDate")) = order.tran.submitTime.getVarDate();
vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("OpenClose")) = order.isOpen ? "O" : "C";
if(order.isBuy == true)
vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("BuyLot")) = order.lot;
else
vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("SellLot")) = order.lot;
vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Message")) = OrderStatus.GetOrderStatusString( order.status, this.quotationFrm.commonLanguage );
var window.instrument = order.GetInstrument();
if(window.instrument.lastQuotation)
{
if(window.instrument.isNormal == order.isBuy)
vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Price")) = window.instrument.lastQuotation.ask.ToString();
else
vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Price")) = window.instrument.lastQuotation.bid.ToString();
}
vsflexGrid.RowData(line) = order;
	
SetRowForeColor(vsflexGrid, line, order.isBuy ? color_blue : color_red);
	
window.labelSell.innerText = "Tatol sell: " + GetTotalLot(orders, true);
window.labelBuy.innerText = "Tatol buy: " + GetTotalLot(orders, false);
}
*/
/*
function RemoveOrderFromLMTGrid(order, orders)
{
if(window.instrument.id != order.tran.instrumentID ||
window.orderType != order.tran.orderType)
return;

var vsflexGrid = window.vsflexLMT;
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
this.owner.LMTDialog = null;
}
}
*/

/*
function ChangeStatusOfLMTGrid(order, isActive)
{
if(window.instrument.id != order.tran.instrumentID ||
window.orderType != order.tran.orderType)
return;

var vsflexGrid = window.vsflexLMT;
window.isActive = isActive;
window.btnApply.disabled = !isActive;
window.btnExecute.disabled = !isActive;
window.textBid.disabled = !isActive;
window.textAsk.disabled = !isActive;

//we conside all the orders is same status for LMT
for(var line=vsflexGrid.FixedRows; line<vsflexGrid.Rows; line++)
{
vsflexGrid.TextMatrix(line, vsflexGrid.ColIndex("Message")) = OrderStatus.GetOrderStatusString( order.status, this.quotationFrm.commonLanguage );
}
}
*/