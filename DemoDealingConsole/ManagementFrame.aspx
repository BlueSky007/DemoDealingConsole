<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManagementFrame.aspx.cs" Inherits="iExchange.DealingConsole.ManagementFrame" %>

<html>
<head>
    <title>Management</title>
    <meta content="False" name="vs_showGrid">
    <meta content="Microsoft Visual Studio 7.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <script language="jscript" src="JavaScript/FormManagementFrame.js"></script>
</head>
<body style="MARGIN: 0px; OVERFLOW: show; height: 100%; width: 100%;" bgcolor="buttonface" onunload="ManagementFrame_Onunload();">
    <table id="Table1" cellspacing="0" cellpadding="0" align="center" bgcolor="buttonface"
        border="1" style="width: 100%; height: 100%;">
        <tr>
            <td nowrap align="left" style="width: 100%; height: 6%;">
                <input type="button" id="_DealingPolicyButton" name="_DealingPolicyButton" onclick="DealingPolicyButton_Onclick();" value="Dealing Policy" style="font-weight:bold;width:150px;" />
                &nbsp;&nbsp;<input type="button" id="_CustomerManagementButton" name="_CustomerManagementButton" onclick="CustomerManagement_Onclick();" value="Customer Management" style="font-weight:normal;width:150px;"/>
            </td>
        </tr>
    <tr>
        <td nowrap colspan="2" style="width: 100%; height: 94%;">
            <iframe id="_DealingPolicyFormIFrame" src="DealingPolicyForm.aspx" style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px; WIDTH: 100%; HEIGHT: 100%; BACKGROUND-COLOR: buttonface; display:block;"></iframe>
            <iframe id="_CustomerPolicyManagementFormIframe" src="CustomerPolicyManagementForm.aspx" style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px; WIDTH: 100%; HEIGHT: 100%; BACKGROUND-COLOR: buttonface;display:none;"></iframe>
        </td>
    </tr>
    </table>
</body>
</html>
