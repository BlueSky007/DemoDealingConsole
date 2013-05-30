function onLoad() {
    //var lInterval = 10;
    //var lTabHeadHeight = 26;
    /*
    window.resizeTo(divCommodity.offsetWidth, divCommodity.offsetHeight + btnApply.offsetHeight + lInterval + lTabHeadHeight + 20);
			
    mpcOption.style.visibility='visible';
    mpcOption.style.posLeft = 0;
    mpcOption.style.posHeight = (oBodyOption.clientHeight - lTabHeadHeight) - (btnApply.clientHeight + lInterval);
    mpcOption.style.posWidth = oBodyOption.clientWidth;
			
    btnApply.style.posLeft = (oBodyOption.clientWidth - btnApply.clientWidth - btnExit.clientWidth - lInterval)/2;
    btnApply.style.posTop = (oBodyOption.clientHeight - lTabHeadHeight) - lInterval/2;
    btnExit.style.posLeft = btnApply.style.posLeft + btnApply.clientWidth + lInterval;
    btnExit.style.posTop = btnApply.style.posTop;
    */
    //document.all.oBody.innerHTML="Loading..";

    //window.resizeTo(divCommodity.offsetWidth, divCommodity.offsetHeight + lTabHeadHeight + 20);
    //mpcOption.style.posLeft = 0;
    //mpcOption.style.posHeight = oBodyOption.clientHeight - lTabHeadHeight;
    //mpcOption.style.posWidth = oBodyOption.clientWidth;
    //mpcOption.style.visibility='visible';

    OptionInit();
    //document.all.oBody.innerHTML = OptionInit();
}
function onSize() {

    //var lInterval = 10;
    var lTabHeadHeight = 26;
    /*
    mpcOption.style.posHeight = (oBodyOption.clientHeight - lTabHeadHeight) - (btnApply.clientHeight + lInterval);
    mpcOption.style.posWidth = oBodyOption.clientWidth;
			
    btnApply.style.posLeft = (oBodyOption.clientWidth - btnApply.clientWidth - btnExit.clientWidth - lInterval)/2;
    btnApply.style.posTop = (oBodyOption.clientHeight - lTabHeadHeight) - lInterval/2;
    btnExit.style.posLeft = btnApply.style.posLeft + btnApply.clientWidth + lInterval;
    btnExit.style.posTop = btnApply.style.posTop;*/

    mpcOption.style.posHeight = oBodyOption.clientHeight - lTabHeadHeight;
    mpcOption.style.posWidth = oBodyOption.clientWidth;

    if (oBodyOption.clientWidth - 60 > 376) {
        vsflexSound.style.posWidth = oBodyOption.clientWidth - 60;
    }
    else {
        vsflexSound.style.posWidth = 376;
    }
}

function SettingGrid_OnClick() {
    var row = window.SettingGrid.Row;
    var newCol = window.SettingGrid.Col;
    if (row < window.SettingGrid.FixedRows) return;

    var optionGrid = window.dialogArguments.parent.quotationFrm.optionGrid;
    with (window.SettingGrid) {
        if (window.cmbDoGrid.value == optionGrid.OrderGrid) {
            this.SettingUpDownStaus(SettingGrid, row, newCol, 8);
        }
        else if (window.cmbDoGrid.value == optionGrid.QuotationTaskGrid) {
            this.SettingUpDownStaus(SettingGrid, row, newCol, 5);
        }
        else {
            window.btnUp2.disabled = false;
            window.btnDown2.disabled = false;
        }  
    }
}

function SettingGrid_FilterKey2(theEvent) {
    if (theEvent.keyCode == 13) {
        //VsflexQuotation_OnClick();
    }
}
function SettingUpDownStaus(vsflexGrid, newRow,newCol, index) {
    if (newRow < index) {
        vsflexGrid.Cell(flexcpChecked, newRow, vsflexGrid.ColIndex("ColHidden")) = flexUnchecked;
        vsflexGrid.Editable = (newCol == vsflexGrid.ColIndex("ColWidth")) ? flexEDKbdMouse : flexEDNone;
        window.btnUp2.disabled = true;
        window.btnDown2.disabled = true;
    }
    else if (newRow == index) {
        window.btnUp2.disabled = true;
        window.btnDown2.disabled = false;
    }
    else if (newRow == vsflexGrid.Rows - 1) {
        window.btnUp2.disabled = false;
        window.btnDown2.disabled = true;
    }
    else {
        window.btnUp2.disabled = false;
        window.btnDown2.disabled = false;
    }
}

function OnSettingGridBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    var optionGrid = window.dialogArguments.parent.quotationFrm.optionGrid;
    with (window.SettingGrid) {
        if (newRow < FixedRows) { return; }
        Editable = (newCol == ColIndex("ColWidth") || newCol == ColIndex("ColHidden")) ? flexEDKbdMouse : flexEDNone;

        if (window.cmbDoGrid.value == optionGrid.OrderGrid) {
            this.SettingUpDownStaus(SettingGrid, newRow,newCol, 8);
        }
        else if (window.cmbDoGrid.value == optionGrid.QuotationTaskGrid) {
            this.SettingUpDownStaus(SettingGrid, newRow,newCol, 5);
        }
        else {
            if (window.cmbDoGrid.value == optionGrid.PropertiesGrid) {
                Editable = (newCol == ColIndex("ColHidden")) ? flexEDKbdMouse : flexEDNone;
            }
            window.btnUp2.disabled = false;
            window.btnDown2.disabled = false;
        }
    }
}
