//function ManagementFrame_Onload() {
//    DealingPolicyButton_Onclick();
//}

function ManagementFrame_Onunload() {
//    if (window.dialogArguments && window.dialogArguments.oWndDealingPolicy)
//        window.dialogArguments.oWndDealingPolicy = null;
    if (window.top.opener && window.top.opener.oWndDealingPolicy)
        window.top.opener.oWndDealingPolicy = null;
}

function DealingPolicyButton_Onclick() {
    window.document.all._DealingPolicyFormIFrame.style.display = "block";
    window.document.all._CustomerPolicyManagementFormIframe.style.display = "none";
    window.document.all._DealingPolicyButton.style.fontWeight = "bold";
    window.document.all._CustomerManagementButton.style.fontWeight = "normal";
}

function CustomerManagement_Onclick() {
    window.document.all._DealingPolicyFormIFrame.style.display = "none";
    window.document.all._CustomerPolicyManagementFormIframe.style.display = "block";
    window.document.all._DealingPolicyButton.style.fontWeight = "normal";
    window.document.all._CustomerManagementButton.style.fontWeight = "bold";
}