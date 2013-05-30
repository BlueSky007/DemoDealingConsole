function OnAlertLoad() {
    if (dialogArguments)
        labelInput.innerHTML = dialogArguments;

    var titleHeight = parseInt(window.dialogHeight) - oBodyAlert.clientHeight;
    window.dialogHeight = Table1.clientHeight + titleHeight + "px";
    window.dialogWidth = Table1.clientWidth + "px";
    window.dialogTop = (parseInt(window.screen.height) - Table1.clientHeight) / 2 + "px";
    window.dialogLeft = (parseInt(window.screen.width) - Table1.clientWidth) / 2 + "px";
}