<%@ Page Language="c#" Inherits="iExchange.DealingConsole.ToolBar" CodeBehind="ToolBar.aspx.cs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html xmlns:mymenu>
<head>
    <title>ToolBar</title>
    <meta content="False" name="vs_showGrid">
    <meta content="Microsoft Visual Studio 7.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <!--?IMPORT namespace="myMenu" implementation="behaviors/menu.htc"-->
    <style>
        .Rollover
        {
            behavior: url(behaviors/imageRollover_js.htc);
        }
    </style>
     <%
        Response.Write( "<script>\r\n" );
        Response.Write("var ResumeStr = \"");
        Response.Write(GetLanguage("Resume"));
        Response.Write("\";");
        Response.Write("var SuspendStr = \"");
        Response.Write(GetLanguage("Suspend"));
        Response.Write("\";");
        Response.Write("var AllowLMTStr = \"");
        Response.Write(GetLanguage("AllowLMT"));
        Response.Write("\";");
        Response.Write("var DisAllowLMTStr = \"");
        Response.Write(GetLanguage("DisAllowLMT"));
        Response.Write("\";");
        Response.Write("var LogoutButtonStr = \"");
        Response.Write(GetLanguage("LogoutButton"));
        Response.Write("\";");
        Response.Write("var GoButtonStr = \"");
        Response.Write(GetLanguage("GoButton"));
        Response.Write("\";");
        
        Response.Write( "</script>\r\n" );
        %>
    <script language="jscript" src="JavaScript/FormToolBar.js"></script>
</head>
<body onload="ToolBarPageOnLoad();" onkeydown="parent.quotationFrm.OnGridKeyUp(event)"
    style="margin: 1px" tabindex="-1" bgcolor="#c6c3c6" onunload="window_onunload()">
    <sup title="<% =GetLanguage("QutoPolicy")%>"><% =GetLanguage("QutoPolicy")%></sup>
    <select id="Select1" style="width: 100px; position: relative; top: -5px" onchange="MenuSelected(Select1.value)">
    </select>
    <sup title="<% =GetLanguage("Source")%>"><% =GetLanguage("Source")%></sup>
    <select id="SelectPriceSource" style="width: 72px; position: relative; top: -5px"
        onchange="SelectPriceSource_OnChange();">
        <option value="Source1" selected>1</option>
        <option value="Source2">2</option>
        <option value="Source3">3</option>
        <option value="Source4">4</option>
        <option value="Source5">5</option>
    </select>
    <sup title="<% =GetLanguage("Parameter")%>"><% =GetLanguage("Parameter")%></sup>
    <select id="SelectQuotePolicyParameters" name="SelectQuotePolicyParameters" style="width: 72px;
        position: relative; top: -5px">
        <option value="0" selected></option>
        <option value="2">1</option>
        <option value="3">2</option>
        <option value="4">3</option>
    </select>
    <input type="button" id="GoButton" name="GoButton" value="Go" style="position: relative;
        top: -5px" onclick="GoButton_OnClick();">
    <img class="Rollover" title="<% =GetLanguage("ReferencePrice")%>" style="width: 25px; height: 24px" onclick="btnRefPrice_Onclick()"
        height="24" src="images\\RefPrice1.gif" width="25" pressedsrc="images\\RefPrice2.gif"
        hoversrc="images\\RefPrice2.gif">
    <img class="Rollover" title="<% =GetLanguage("ChangePassword")%>" style="width: 25px; height: 24px" onclick="Password_click()"
        height="24" src="images\\Password1.jpg" width="25" pressedsrc="images\\Password3.jpg"
        hoversrc="images\\Password2.jpg">
    <img class="Rollover" title="<% =GetLanguage("SearchOrder")%>" style="width: 25px; height: 24px" onclick="OrderSearch_click()"
        height="24" src="images\\Search1.jpg" width="25" pressedsrc="images\\Search3.jpg"
        hoversrc="images\\Search2.jpg">
    <img class="Rollover" title="<% =GetLanguage("OpenInterest")%>" style="width: 25px; height: 24px" onclick="OpenInterest_click()"
        height="24" src="images\\OpenInt1.jpg" width="25" pressedsrc="images\\OpenInt3.jpg"
        hoversrc="images\\OpenInt2.jpg">
    <img class="Rollover" title="<% =GetLanguage("ExecuteOrder")%>" style="width: 25px; height: 24px" onclick="ExecuteOrders_click()"
        height="24" src="images\\ExOrder1.jpg" width="25" pressedsrc="images\\ExOrder3.jpg"
        hoversrc="images\\ExOrder2.jpg">
    <img class="Rollover" title="<% =GetLanguage("LMTProcess")%>" style="display=<%=Page.Session["LMTProcessDisplay"]%> WIDTH: 25px;
        height: 24px" onclick="LMTProcess_click()" height="24" src="images\\LMTProcess1.jpg"
        width="25" pressedsrc="images\\LMTProcess3.jpg" hoversrc="images\\LMTProcess2.jpg">
    <img class="Rollover" title="<% =GetLanguage("Option")%>" style="width: 25px; height: 24px" onclick="Option_click()"
        height="24" src="images\\Option1.jpg" width="25" pressedsrc="images\\Option3.jpg"
        hoversrc="images\\Option2.jpg">&nbsp;&nbsp;
    <img class="Rollover" title="<% =GetLanguage("ResetParameter")%>" style="width: 25px; height: 24px;
        display: none;" onclick="ResetToPrevious_onclick()" height="24" src="images\\ResetToPrevious1.gif"
        width="25" pressedsrc="images\\ResetToPrevious2.gif" hoversrc="images\\ResetToPrevious2.gif">
    <img class="Rollover" title="<% =GetLanguage("ChangeAutoToMenual")%>" style="width: 25px; height: 24px"
        onclick="ChangeAutoToManual_onclick()" height="24" src="images\\ChangeAutoToManual1.gif"
        width="25" pressedsrc="images\\ChangeAutoToManual2.gif" hoversrc="images\\ChangeAutoToManual2.gif">
    <img class="Rollover" title="<% =GetLanguage("ResetParameter")%>" style="width: 25px; height: 24px"
        onclick="ResetToSetValue_onclick()" height="24" src="images\\ResetToSetValue1.gif"
        width="25" pressedsrc="images\\ResetToSetValue2.gif" hoversrc="images\\ResetToSetValue2.gif">
    <img class="Rollover" title="<% =GetLanguage("ModifyHistory")%>" style="width: 25px; height: 24px"
        onclick="UpdateHistoryPrice_onclick()" src="images\\ExOrder1.jpg" pressedsrc="images\\ExOrder3.jpg"
        hoversrc="images\\ExOrder2.jpg" />
    <img class="Rollover" title="<% =GetLanguage("DealingPolicy")%>" style="width: 25px; height: 24px" onclick="DealingPolicyEdit_Onclick()"
        src="images\\DealingPolicy1.gif" pressedsrc="images\\DealingPolicy1.gif" hoversrc="images\\DealingPolicy2.gif" />
    <img class="Rollover" title="<% =GetLanguage("CustomerPolicyManagement")%>" style="width: 25px; height: 24px;
        display: none;" onclick="ShowCustomerPolicyManagementForm();" height="24" src="images\\Policy.png"
        width="25" pressedsrc="images\\Policy.png" hoversrc="images\\Policy.png">
    <img class="Rollover" title="Debug" style="width: 25px; height: 24px; display: none;"
        onclick="Debug();" height="24" src="images\\Option1.jpg" width="25" pressedsrc="images\\Option3.jpg"
        hoversrc="images\\Option2.jpg">
    <input type="button" id="_ResumeOrSuspend" name="_ResumeOrSuspend" value="Resume2" onclick="ResumeOrSuspend_Onclick();" style="color:Green;border-style: groove;position: relative; top: -5px;" />
    <input type="button" id="_MassAllowLMT" name="_MassAllowLMT" value="AllowLMT" onclick="MassAllowLMT_Onclick();" style="color:Green;border-style: groove;position: relative; top: -5px;" />
    <input type="button" id="_LogoutButton" name="_LogoutButton" value="Log out" onclick="LogoutButton_Onclick();"
        style="border-style: groove;position: relative; top: -5px" />
</body>
</html>
