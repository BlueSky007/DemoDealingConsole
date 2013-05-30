function OnConfirmLoad() {
    if (dialogArguments[0])
        labelInput.innerHTML = dialogArguments[0];
    else
        labelInput.innerHTML = "Are you sure?";
    if (dialogArguments[1])
        Button1.value = dialogArguments[1];
    if (dialogArguments[2])
        Button2.value = dialogArguments[2];

    if (dialogArguments[3])
        labelMore.innerHTML = dialogArguments[3];

    Button1.focus();

    var titleHeight = parseInt(window.dialogHeight) - oBodyConfirm.clientHeight;
    window.dialogHeight = Table1.clientHeight + titleHeight + "px";
    window.dialogWidth = Table1.clientWidth + "px";
    window.dialogTop = (parseInt(window.screen.height) - Table1.clientHeight) / 2 + "px";
    window.dialogLeft = (parseInt(window.screen.width) - Table1.clientWidth) / 2 + "px";
}