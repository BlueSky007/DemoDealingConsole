function OnConfirmLoad() {
    if (dialogArguments[0])
        labelInput.innerHTML = dialogArguments[0];
    else
        labelInput.innerHTML = "Are you sure?";
    if (dialogArguments[1])
        Button1.value = dialogArguments[1];
    if (dialogArguments[2])
        Button2.value = dialogArguments[2];
    var order = dialogArguments[3];
    order.tran.GetAcountInfo(this, order);

    var allowModifyOrderLot = order.mainWindow.oDealingConsole.AllowModifyOrderLot;

    window.trSetPrice.style.display = "none";
    window.trDQMaxMovePrice.style.display = "none";
    window.trRange.style.display = "none";

    if (allowModifyOrderLot) {
        window.trLot.style.display = "inline";
        window.textLot.value = order.lot.toString();
    }
    else {
        window.trLot.style.display = "none";
    }

    if (order.dQMaxMove > 0) {
        window.trSetPrice.style.display = "inline";
        window.trDQMaxMovePrice.style.display = "inline";
        window.trRange.style.display = "inline";
        window.document.all.tdSetPrice.innerText = order.setPrice.ToString();

        window.textDQMaxMovePrice.value = order.GetDefaultDQMaxMovePrice().ToString();
        window.document.all.tdRange.innerText = "(" + order.setPrice.ToString() + " - " + order.GetDQMaxMovePrice().ToString() + ")";
        window.textDQMaxMovePrice.focus();
    }
    else {
        Button1.focus();
    }

    var titleHeight = parseInt(window.dialogHeight) - oBodyConfirm.clientHeight;
    window.dialogHeight = Table1.clientHeight + titleHeight + "px";
    window.dialogWidth = Table1.clientWidth + "px";
    window.dialogTop = (parseInt(window.screen.height) - Table1.clientHeight) / 2 + "px";
    window.dialogLeft = (parseInt(window.screen.width) - Table1.clientWidth) / 2 + "px";
    var account = order.GetAccount();
    if (account && account.type == AccountType.BlackList) {
        window.document.all._BlackListCheckbox.checked = true;
    }
}

/// <returns>		
///		<Account ID="" Balance="" Equity="" Necessary="">
///			<Instrument ID="" BuyLotBalanceSum="" SellLotBalanceSum="" />
///		</Account>
/// </returns>
function GetAcountInfoResult(tran, msXml) {
    if (msXml == null) return;
    if (msXml.childNodes.length <= 0) return;

    var accountId = null;
    var balance = "";
    var equity = "";
    var necessary = "";
    var accountInfoNode = msXml.childNodes.item(0);
    if (accountInfoNode.baseName == "TransactionCanceledOrCannotExecute") {
        var sMsg = "Order is canceled or executed already";
        window.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
        tran.Cancel();
        window.close();
        return;
    }
    for (var i = 0, count = accountInfoNode.attributes.length; i < count; i++) {
        var nodeName = accountInfoNode.attributes.item(i).nodeName;
        var nodeValue = accountInfoNode.attributes.item(i).nodeValue;
        if (nodeName == "ID") {
            accountId = nodeValue;
        }
        else if (nodeName == "Balance") {
            balance = nodeValue;
        }
        else if (nodeName == "Equity") {
            equity = nodeValue;
        }
        else if (nodeName == "Necessary") {
            necessary = nodeValue;
        }
    }

    var instrumentId = null;
    var buyLotBalanceSum = "";
    var sellLotBalanceSum = "";
    for (var j = 0, count2 = accountInfoNode.childNodes.length; j < count2; j++) {
        var instrumentNode = accountInfoNode.childNodes.item(j);
        for (var k = 0, count3 = instrumentNode.attributes.length; k < count3; k++) {
            var nodeName = instrumentNode.attributes.item(k).nodeName;
            var nodeValue = instrumentNode.attributes.item(k).nodeValue;
            if (nodeName == "ID") {
                instrumentId = nodeValue;
            }
            else if (nodeName == "BuyLotBalanceSum") {
                buyLotBalanceSum = nodeValue;
            }
            else if (nodeName == "SellLotBalanceSum") {
                sellLotBalanceSum = nodeValue;
            }
        }
    }
    var usable = parseFloat(equity) - parseFloat(necessary);
    var net = parseFloat(buyLotBalanceSum) - parseFloat(sellLotBalanceSum);
    window.document.all.TD2.innerText = new Number(balance);
    window.document.all.TD4.innerText = new Number(equity);
    window.document.all.TD6.innerText = new Number(necessary);
    window.document.all.TD8.innerText = new Number(usable);
    window.document.all.TD10.innerText = new Number(buyLotBalanceSum);
    window.document.all.TD12.innerText = new Number(sellLotBalanceSum);
    window.document.all.TD14.innerText = new Number(net);
}

function Submit() {
    CheckDQMaxMovePrice();
    CheckLot();

    var order = dialogArguments[3];
    if (order.dQMaxMove > 0) {
        order.executePrice = order.ToPrice(window.textDQMaxMovePrice.value);
    }

    var allowModifyOrderLot = order.mainWindow.oDealingConsole.AllowModifyOrderLot;
    if (allowModifyOrderLot) {
        var newLot = parseFloat(window.textLot.value);
        if (newLot != order.lot) {
            order.lot = newLot;
            order.lotChanged = true;
        }
    }

    returnValue = true;
    window.close();
}

function CheckDQMaxMovePrice() {
    var order = dialogArguments[3];
    if (order.IsNeedDQMaxMove()) {
        var price = order.GetModifiedDQMaxMovePrice(window.textDQMaxMovePrice.value);
        if (price != null) {
            window.textDQMaxMovePrice.value = price.ToString();
        }
    }
}

function CheckLot() {
    var order = dialogArguments[3];
    var allowModifyOrderLot = order.mainWindow.oDealingConsole.AllowModifyOrderLot;
    if (allowModifyOrderLot) {
        var newLot = parseFloat(window.textLot.value);
        if (isNaN(newLot) || newLot <= 0 || newLot > order.lot) {
            window.textLot.value = order.lot.toString();
        }
    }
}

function textDQMaxMovePrice_Onblur() {
    CheckDQMaxMovePrice();
}

function textDQMaxMovePrice_Onfocus() {
    var e = event.srcElement;
    var r = e.createTextRange();
    var pointPosition = e.value.lastIndexOf(".");
    pointPosition = (pointPosition == -1) ? 0 : pointPosition + 1;
    r.moveStart("character", pointPosition);
    r.select();
}