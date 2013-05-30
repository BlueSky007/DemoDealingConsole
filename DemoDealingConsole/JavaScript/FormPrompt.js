function OnPromptLoad() {
    if (dialogArguments[0])
        labelInput.innerHTML = dialogArguments[0] + " " + labelInput.innerHTML;
    else
        labelInput.innerHTML = "Input: " + labelInput.innerHTML;
    Text1.value = dialogArguments[1];
    window.focus();
    Text1.focus();
    Text1.select();

    var titleHeight = parseInt(window.dialogHeight) - oBodyPrompt.clientHeight;
    window.dialogHeight = Table1.clientHeight + titleHeight + "px";
    window.dialogWidth = Table1.clientWidth + "px";
    window.dialogTop = (parseInt(window.screen.height) - Table1.clientHeight) / 2 + "px";
    window.dialogLeft = (parseInt(window.screen.width) - Table1.clientWidth) / 2 + "px";
}