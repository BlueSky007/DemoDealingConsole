<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CustomerPolicyManagementForm.aspx.cs"
    Inherits="iExchange.DealingConsole.CustomerPolicyManagementForm" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title><%=GetLanguage("PolicyManagementPage")%></title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 7.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Common/Setting.css" type="text/css" rel="stylesheet">
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/colorConst.js"></script>
    <script language="jscript" src="JavaScript/EnumDefine.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/CustomerPolicyManagement.js"></script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="_CustomerPolicyManagementGrid">
		CustomerPolicyManagementGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);			
    </script>
    <script event="DblClick" for="_CustomerPolicyManagementGrid">
        CustomerPolicyManagementGrid_DblClick();
    </script>
    <script language="javascript" event="KeyDown(keyCode,shift)" for="_CustomerPolicyManagementGrid">
		CustomerPolicyManagementGrid_KeyDown(keyCode , shift);
    </script>
    <script event="AfterCollapse(row,state)" for="_CustomerPolicyManagementGrid">
        CustomerPolicyManagementGrid_AfterCollapse(row,state);
    </script>
    <script event="BeforeSort(col,order)" for="_CustomerPolicyManagementGrid">
		CustomerPolicyManagementGrid_BeforeSort(col,order);
    </script>
    <script event="AfterEdit(row, col, cancel)" for="_CustomerPolicyManagementGrid">
		CustomerPolicyManagementGrid_OnAfterEdit(row, col, cancel);
    </script>
</head>
<body style="height: 100%; width: 100%; background-color:ButtonFace;" bgcolor="buttonface"
    onload="CustomerPolicyManagementForm_Onload();" onunload="CustomerPolicyManagementForm_Onunload();">
    <table id="Table1" cellspacing="0" cellpadding="0" align="center" bgcolor="buttonface"
        border="0" style="width: 100%; height: 20%;">
        <tr>
            <td nowrap>
                <%=GetLanguage("AccountGroup")%>:
            </td>
            <td align="left">
                <select id="_AccountGroupSelect" name="_AccountGroupSelect" style="width: 200px;">
                <option id="_AccountGroupOptionAll" value="">&lt;All&gt;</option>
                    <%=GetAccountGroupOptions()%>
                </select>
            </td>
            <td colspan="4" align="left">
                <input type="button" id="_QueryByAccountGroupButton" name="_QueryByAccountGroupButton"
                    onclick="QueryByAccountGroupButton_Onclick();" value="<%=GetLanguage("Query") %>"  style="width: 60px;" />
            </td>
        </tr>
        <tr>
            <td nowrap>
                 <%=GetLanguage("BlackListOnly")%>:
            </td>
            <td align="left">
                <input type="checkbox" id="Checkbox1" name="_BlackListCheckBox" checked />
            </td>
            <td colspan="4" align="left">
                <input type="button" id="Button1" name="_QueryByBlackListAccountButton"
                    onclick="QueryByBlackListAccountButton_Onclick();" value="<%=GetLanguage("Query") %>" style="width: 60px;" />
            </td>
            
        </tr>
        <tr>
            <td nowrap>
                <%=GetLanguage("QutoPolicy")%>:
            </td>
            <td>
                <select id="_QuotePolicySelect" name="_QuotePolicySelect" style="width: 200px;">
                </select>
            </td>
            <td align="left">
                <input type="button" id="_QueryByQuotePolicyButton" name="_QueryByQuotePolicyButton"
                    onclick="QueryByQuotePolicyButton_Onclick();" value="<%=GetLanguage("Query") %>" style="width: 60px;" />
            </td>
            <td>
                <%=GetLanguage("ReplaceWith")%>:
            </td>
            <td>
                <select id="_ReplaceWithQuotePolicySelect" name="_ReplaceWithQuotePolicySelect" style="width: 200px;">
                </select>
            </td>
            <td>
                <input type="button" id="_ReplaceWithQuotePolicyButton" name="_ReplaceWithQuotePolicyButton"
                    onclick="ReplaceWithQuotePolicyButton_Onclick();" value="<%=GetLanguage("GoSelectedButton") %>" style="width: 110px;" />
            </td>
        </tr>
        <tr>
            <td nowrap>
                <%=GetLanguage("DealingPolicy")%>:
            </td>
            <td>
                <select id="_DealingPolicySelect" name="_DealingPolicySelect" style="width: 200px;">
                    <option id="_AllDealingPolicyOption" value="00000000-0000-0000-0000-000000000000">&lt;NULL&gt;</option>
                    <%=GetDealingPolicyOptions()%>
                </select>
            </td>
            <td align="left">
                <input type="button" id="_QueryByDealingPolicyButton" name="_QueryByDealingPolicyButton"
                    onclick="QueryByDealingPolicyButton_Onclick();" value="<%=GetLanguage("Query") %>" style="width: 60px;" />
            </td>
            <td>
                <%=GetLanguage("ReplaceWith")%>:
            </td>
            <td>
                <select id="_ReplaceWithDealingPolicySelect" name="_ReplaceWithDealingPolicySelect"
                    style="width: 200px;">
                    <option id="Option1" value="00000000-0000-0000-0000-000000000000">&lt;NULL&gt;</option>
                    <%=GetDealingPolicyOptions()%>
                </select>
            </td>
            <td>
                <input type="button" id="_ReplaceWithDealingPolicyButton" name="_ReplaceWithDealingPolicyButton"
                    onclick="ReplaceWithDealingPolicyButton_Onclick();" value="<%=GetLanguage("GoSelectedButton") %>" style="width: 110px;" />
            </td>
        </tr>
        <tr>
            <td>
                 <%=GetLanguage("SortingOn")%>:
            </td>
            <td nowrap colspan="5" align="left">
                <select id="_OutlineSelect" name="_OutlineSelect" onchange="OutlineSelect_Onclick();"
                    style="width: 80px;">
                    <option id="_AccountGroupOutlineOption" value="0" selected><%=GetLanguage("SortingOnCombo1")%></option>
                    <option id="_DetailOutlineOption" value="1"><%=GetLanguage("SortingOnCombo2")%></option>
                </select>
            </td>
        </tr>
        <tr>
            <td colspan="3" align="left">
                <input type="button" id="_SaveButton" name="_SaveButton" onclick="SaveButton_Onclick();"
                    value="<%=GetLanguage("SaveButton") %>" accesskey="s" style="width: 110px;" />
            </td>
            <td align="left">
                <input type="checkbox" id="_IsApplyEmployChk" />
                <%=GetLanguage("ApplyEmployee")%>
               <%-- <asp:Label runat="server" Text="Apply Employee" />--%>
            </td>
        </tr>
    </table>
    <object id="_CustomerPolicyManagementGrid" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160"
        style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px; margin: 0px;
        width: 100%; padding-top: 0px; height: 75%; background-color: white" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
        viewastext>
        <param name="_cx" value="21669">
        <param name="_cy" value="11536">
        <param name="_ConvInfo" value="1">
        <param name="Appearance" value="1">
        <param name="BorderStyle" value="1">
        <param name="Enabled" value="-1">
        <param name="Font" value="Times New Roman">
        <param name="MousePointer" value="0">
        <param name="BackColor" value="-2147483643">
        <param name="ForeColor" value="-2147483640">
        <param name="BackColorFixed" value="-2147483633">
        <param name="ForeColorFixed" value="-2147483630">
        <param name="BackColorSel" value="-2147483635">
        <param name="ForeColorSel" value="-2147483634">
        <param name="BackColorBkg" value="-2147483636">
        <param name="BackColorAlternate" value="-2147483643">
        <param name="GridColor" value="-2147483633">
        <param name="GridColorFixed" value="-2147483632">
        <param name="TreeColor" value="-2147483632">
        <param name="FloodColor" value="192">
        <param name="SheetBorder" value="-2147483642">
        <param name="FocusRect" value="1">
        <param name="HighLight" value="1">
        <param name="AllowSelection" value="-1">
        <param name="AllowBigSelection" value="-1">
        <param name="AllowUserResizing" value="0">
        <param name="SelectionMode" value="0">
        <param name="GridLines" value="1">
        <param name="GridLinesFixed" value="2">
        <param name="GridLineWidth" value="1">
        <param name="Rows" value="50">
        <param name="Cols" value="8">
        <param name="FixedRows" value="1">
        <param name="FixedCols" value="1">
        <param name="RowHeightMin" value="0">
        <param name="RowHeightMax" value="0">
        <param name="ColWidthMin" value="0">
        <param name="ColWidthMax" value="0">
        <param name="ExtendLastCol" value="0">
        <param name="FormatString" value="">
        <param name="ScrollTrack" value="0">
        <param name="ScrollBars" value="3">
        <param name="ScrollTips" value="0">
        <param name="MergeCells" value="0">
        <param name="MergeCompare" value="0">
        <param name="AutoResize" value="-1">
        <param name="AutoSizeMode" value="0">
        <param name="AutoSearch" value="0">
        <param name="AutoSearchDelay" value="2">
        <param name="MultiTotals" value="-1">
        <param name="SubtotalPosition" value="1">
        <param name="OutlineBar" value="0">
        <param name="OutlineCol" value="0">
        <param name="Ellipsis" value="0">
        <param name="ExplorerBar" value="0">
        <param name="PicturesOver" value="0">
        <param name="FillStyle" value="0">
        <param name="RightToLeft" value="0">
        <param name="PictureType" value="0">
        <param name="TabBehavior" value="0">
        <param name="OwnerDraw" value="0">
        <param name="Editable" value="0">
        <param name="ShowComboButton" value="1">
        <param name="WordWrap" value="0">
        <param name="TextStyle" value="0">
        <param name="TextStyleFixed" value="0">
        <param name="OleDragMode" value="0">
        <param name="OleDropMode" value="0">
        <param name="ComboSearch" value="3">
        <param name="AutoSizeMouse" value="-1">
        <param name="FrozenRows" value="0">
        <param name="FrozenCols" value="0">
        <param name="AllowUserFreezing" value="0">
        <param name="BackColorFrozen" value="0">
        <param name="ForeColorFrozen" value="0">
        <param name="WallPaperAlignment" value="9">
    </object>
    <div id="Service" style="display: none; behavior: url(behaviors/webservice.htc)">
    </div>
</body>
</html>
