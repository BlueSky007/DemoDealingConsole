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

    window.trSetPrice.style.display = "none";
    window.trDQMaxMovePrice.style.display = "none";
    window.trRange.style.display = "none";
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
}

function Submit() {
    CheckDQMaxMovePrice();

    var order = dialogArguments[3];
    if (order.dQMaxMove > 0) {
        order.executePrice = order.ToPrice(window.textDQMaxMovePrice.value);
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