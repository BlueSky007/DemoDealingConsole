function Form_OnLoad() {
    KeepMessageCountText.value = window.opener.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.KeepMessageCount;
    LengthPerMessageText.value = window.opener.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.LengthPerMessage;
}

function ClearMessage() {
    debugText.innerText = '';
    window.opener.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.Message = "";
}

function PrintMessage() {
    debugText.innerText = window.opener.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.FirstGetCommandResultMessage + window.opener.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.Message;
}


function ClearMessageForGetCommands2() {
    MessageForGetCommands2Textarea.innerText = '';
    window.opener.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.MessageForGetCommands2 = "";
}

function PrintMessageForGetCommands2() {
    MessageForGetCommands2Textarea.innerText = window.opener.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.MessageForGetCommands2;
}

function KeepMessageCountButton_onclick() {
    var keepMessageCount = parseInt(KeepMessageCountText.value);
    keepMessageCount = isNaN(keepMessageCount) ? 10 : keepMessageCount;
    window.opener.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.KeepMessageCount = keepMessageCount;

    var lengthPerMessage = parseInt(LengthPerMessageText.value);
    lengthPerMessage = isNaN(lengthPerMessage) ? 10 : lengthPerMessage;
    window.opener.parent.quotationFrm.oDealingConsole.mainWindow.oIOProxy.LengthPerMessage = lengthPerMessage;
}