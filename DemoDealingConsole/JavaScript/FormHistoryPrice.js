var searchDate;
function onLoad() {
    flexHistoryPriceInit();

    var quoteFrm = window.opener.parent.quotationFrm;
    var instruments = (new VBArray(quoteFrm.oInstruments.Items())).toArray();
    for (var index = 0, count = instruments.length; index < count; index++) {
        var oOption = document.createElement("OPTION");
        oOption.text = instruments[index].code;
        oOption.value = instruments[index].id;
        oOption.selected = (index == "0");
        Select1.add(oOption);
    }
    searchDate = new Date();
    TextTime.value = Date2String(searchDate);
    TextTime.disabled = true;

    OnInstrumentChange();

    onSize();
}

function onSize() {
    //vsflexHistoryPrice.style.posHeight = Body1.clientHeight - Table1.clientHeight;
    //vsflexHistoryPrice.style.posWidth = Body1.clientWidth;
    //Table1.style.posWidth = Body1.clientWidth;
}

function OnInstrumentChange() {
    while (Select2.length)
        Select2.remove(0);

    var quoteFrm = window.opener.parent.quotationFrm;
    var instruments = quoteFrm.oInstruments;
    if (instruments.Exists(Select1.value) == true) {
        var instrument = instruments.Item(Select1.value);
        var quotePolicys = (new VBArray(instrument.quotePolicyDetails.Items())).toArray();
        for (var index = 0, count = quotePolicys.length; index < count; index++) {
            var oOption = document.createElement("OPTION");
            oOption.text = quotePolicys[index].code;
            oOption.value = quotePolicys[index].quotePolicyID;
            oOption.selected = (index == "0");
            Select2.add(oOption);
        }
    }
}
function BtnTime_onclick() {
    var newDate = window.showModalDialog("Calendar.aspx", searchDate, "center:yes;status:no;help:no; center:yes;resizable:yes; scroll:no; dialogWidth:375px;dialogHeight:385px");
    if (newDate) {
        searchDate = new Date(newDate);
        TextTime.value = Date2String(searchDate);
    }
}