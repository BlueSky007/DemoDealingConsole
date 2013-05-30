function Body_onsize() {
    var dateTemp = window.dialogArguments;
    if (!dateTemp)
        dateTemp = new Date();

    TextHour.value = dateTemp.getHours();
    TextMinute.value = dateTemp.getMinutes();
    Calendar.year = dateTemp.getFullYear();
    Calendar.month = dateTemp.getMonth() + 1;
    Calendar.day = dateTemp.getDate();

    TextHour.focus();
    TextHour.select();

    /*
    var titleHeight = parseInt(window.dialogHeight) - oBody.clientHeight;
    var spanWidth = parseInt(window.dialogWidth) - oBody.clientWidth;
    window.dialogHeight = Table1.clientHeight + titleHeight + "px";
    window.dialogWidth = Table1.clientWidth + spanWidth + "px";
    window.dialogTop = (parseInt(window.screen.height) - Table1.clientHeight)/2 + "px"; 
    window.dialogLeft = (parseInt(window.screen.width) - Table1.clientWidth)/2 + "px"; 
    */
}
function BtnOK_onclick() {
    var hour = parseInt(TextHour.value);
    var minute = parseInt(TextMinute.value);
    if (isNaN(hour) || hour < 0 || hour > 23) {
        TextHour.focus();
        TextHour.select();
    }
    else if (isNaN(minute) || minute < 0 || minute > 59) {
        TextMinute.focus();
        TextMinute.select();
    }
    else {
        window.returnValue = (new Date(Calendar.year, Calendar.month - 1, Calendar.day, hour, minute)).toString();
        window.close();
    }
}