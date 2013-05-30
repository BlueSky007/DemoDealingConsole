function OnGridKeyUp(theEvent) {
    FilterKey(theEvent);

    var vsflexGrid = parent.quotationTaskFrm.vsflexQuotationTask;
    var lineQuote = vsflexGrid.Rows > vsflexGrid.FixedRows ? vsflexGrid.FixedRows : -1;
    vsflexGrid = parent.orderTaskFrm.vsflexOrderTask;
    var lineOrder = vsflexGrid.Rows > vsflexGrid.FixedRows ? vsflexGrid.FixedRows : -1;
    switch (String.fromCharCode(theEvent.keyCode)) {
        //QuotationTask Function 
//        case "W":
//            parent.quotationTaskFrm.OnSwitch(lineQuote);
//            break;
//        case "G":
//            parent.quotationTaskFrm.OnIgnore(lineQuote);
//            break;
        case "Y":
            parent.quotationTaskFrm.OnAccept(lineQuote);
            break;
        case "N":
            parent.quotationTaskFrm.OnDiscard(lineQuote);
            break;
        case "B":
            parent.quotationTaskFrm.OnAbandon(lineQuote);
            break;
        case "U":
            parent.quotationTaskFrm.OnUpdate(lineQuote);
            break;
        case "M":
            parent.quotationTaskFrm.OnModify(lineQuote);
            break;
        case "S":
            parent.quotationTaskFrm.OnSend(lineQuote);
            break;
        //OrderTask Function 
        case "D":
            parent.orderTaskFrm.OnOrderDetail(lineOrder);
            break;
        case "E":
            parent.orderTaskFrm.OnOrderExecute(lineOrder);
            break;
        case "I":
            parent.orderTaskFrm.OnOrderWait(lineOrder);
            break;
        case "F":
            parent.orderTaskFrm.OnOrderModify(lineOrder);
            break;
        case "P":
            parent.orderTaskFrm.OnOrderUpdate(lineOrder);
            break;
        case "A":
            parent.orderTaskFrm.OnOrderAccept(lineOrder);
            break;
        case "R":
            parent.orderTaskFrm.OnOrderReject(lineOrder);
            break;
        case "C":
            parent.orderTaskFrm.OnOrderCancel(lineOrder);
            break;
    }
}

function SystemLogout() {
    //Added by Michael on 2008-08-21
    if (isAllowLoginUser) {
        ClearCacher();
    }

    SystemExit("Service.asmx/Logout", ".iExchange_DealingConsole");

    try {
        if (oDealingConsole != null) {
            oDealingConsole.CloseAllEnquiryWindow();
        }

//        if (window.quotePolicyWindow && !window.quotePolicyWindow.closed) {
//            window.quotePolicyWindow.close();
//        }
    }
    catch (e) {
        alert("Unload Logout Error");
    }
}

//Added by Michael on 2008-08-21 BEGIN
var isAllowLoginUser = false;

function CheckCacher(systemTimeString) {
    var systemTime = new Date(systemTimeString.replace(/-/g, "/"));

    if (systemTime == null) return;

    isAllowLoginUser = !IsExistsLogin(systemTime);
    if (!isAllowLoginUser) {
        window.parent.location.href = "Kickout.aspx";

        //win.document.body.background="";
        //win.document.body.bgColor="white";
        //var bodyInnerHtml = "Another instance is running, initialization failed!";
        //bodyInnerHtml += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=button value ='Close' id=btnClose onclick='window.close();'>";
        //win.document.body.innerHTML=bodyInnerHtml;
        return;
    }
    else {
        SaveCacher(systemTime);
    }
}

var casherAttribute = null; //"sPersist"
function ClearCacher() {
    cachetag.setAttribute(CasherAttribute(), "");
    cachetag.save("cache");
}

//per 1 minute save
function SaveCacher(systemTime) {
    cachetag.setAttribute(CasherAttribute(), systemTime);
    cachetag.save("cache");
}

function IsExistsLogin(systemTime) {
    try {
        cachetag.load("cache");
        cachetag.value = cachetag.getAttribute(CasherAttribute());
        if (cachetag.value == null || typeof (cachetag.value) == 'undefined' || cachetag.value == "") return false;
        return (new Date(systemTime) - new Date(cachetag.value) < 120000);
    }
    catch (e) {
        return false;
    }
}

function CasherAttribute() {
    return GetCasherAttribute(window.location.host);
}

function GetCasherAttribute(url) {
    if (casherAttribute == null) {
        casherAttribute = "Dealer" + hex_md5(url);
    }
    return casherAttribute;
}
//Added by Michael on 2008-08-21 END

function VsflexQuotation_OnDblClick() {
//    if (window.quotePolicyWindow && !window.quotePolicyWindow.closed) {
//        window.quotePolicyWindow.focus();
//    }
//    else {
//        if (vsflexQuotation.MouseRow != -1) {
//            var data = vsflexQuotation.RowData(vsflexQuotation.MouseRow);
//            if (data) {
//                var args = new Array(window, data.object, window);
//                window.quotePolicyWindow = showModelessDialog("QuotePolicy.aspx", args, "status:no;help:no; resizable:yes; scroll:no; center:yes; dialogWidth:600px;dialogHeight:380px");
//            }
//        }
//    }
}