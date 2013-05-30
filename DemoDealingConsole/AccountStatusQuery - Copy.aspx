<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AccountStatusQuery.aspx.cs"
    Inherits="iExchange.DealingConsole.AccountStatusQuery" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>Account Status Query</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 7.0">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Common/Setting.css" type="text/css" rel="stylesheet">
    <script language="jscript" src="JavaScript/colorConst.js"></script>
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/AccountStatusQuery.js"></script>
    <script language="javascript" event="AfterEdit(Row,Col)" for="AccountNameSelectGrid">
		    AccountNameSelectGrid_AfterEdit(Row,Col);		
    </script>
    <script language="javascript" event="AfterEdit(Row,Col)" for="AccountSelectGrid">
		    AccountSelectGrid_AfterEdit(Row,Col);		
    </script>
</head>
<body onload="AccountStatusQueryOnLoad();" onunload="AccountStatusQueryOnUnload();"
    topmargin="0">
    <table border="0" cellsapcing="0" cellpadding="0" width="80%" align="center">
        <tr>
            <td class="Desc" align="middle" width="100%" height="15px">
                <b>&nbsp;&nbsp;&nbsp;Account Status Query</b>
            </td>
        </tr>
    </table>
    <p>
    </p>
    <table border="0" cellsapcing="0" cellpadding="0" width="100%" align="center">
        <tr>
            <td style="width: 67px; height: 28px; " align="right">
                Account
            </td>
            <td style="width: 100px; height: 30px" valign="middle" align="left">
                <object id="AccountSelectGrid" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;
                    margin: 0px; width: 100%; padding-top: 0px; height: 20px; background-color: activeborder;"
                    accesskey="a" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
                    name="AccountSelectGrid">
                    <param name="_cx" value="3810">
                    <param name="_cy" value="635">
                    <param name="_ConvInfo" value="1">
                    <param name="Appearance" value="1">
                    <param name="BorderStyle" value="0">
                    <param name="Enabled" value="-1">
                    <param name="Font" value="Times New Roman">
                    <param name="MousePointer" value="0">
                    <param name="BackColor" value="-2147483643">
                    <param name="ForeColor" value="-2147483640">
                    <param name="BackColorFixed" value="10386532">
                    <param name="ForeColorFixed" value="-2147483630">
                    <param name="BackColorSel" value="13680821">
                    <param name="ForeColorSel" value="0">
                    <param name="BackColorBkg" value="16777215">
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
                    <param name="GridLines" value="3">
                    <param name="GridLinesFixed" value="0">
                    <param name="GridLineWidth" value="1">
                    <param name="Rows" value="1">
                    <param name="Cols" value="1">
                    <param name="FixedRows" value="0">
                    <param name="FixedCols" value="0">
                    <param name="RowHeightMin" value="0">
                    <param name="RowHeightMax" value="0">
                    <param name="ColWidthMin" value="0">
                    <param name="ColWidthMax" value="0">
                    <param name="ExtendLastCol" value="-1">
                    <param name="FormatString" value="">
                    <param name="ScrollTrack" value="0">
                    <param name="ScrollBars" value="3">
                    <param name="ScrollTips" value="0">
                    <param name="MergeCells" value="0">
                    <param name="MergeCompare" value="0">
                    <param name="AutoResize" value="-1">
                    <param name="AutoSizeMode" value="1">
                    <param name="AutoSearch" value="1">
                    <param name="AutoSearchDelay" value="2">
                    <param name="MultiTotals" value="-1">
                    <param name="SubtotalPosition" value="1">
                    <param name="OutlineBar" value="0">
                    <param name="OutlineCol" value="0">
                    <param name="Ellipsis" value="1">
                    <param name="ExplorerBar" value="0">
                    <param name="PicturesOver" value="0">
                    <param name="FillStyle" value="0">
                    <param name="RightToLeft" value="0">
                    <param name="PictureType" value="0">
                    <param name="TabBehavior" value="0">
                    <param name="OwnerDraw" value="0">
                    <param name="Editable" value="0">
                    <param name="ShowComboButton" value="1">
                    <param name="WordWrap" value="-1">
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
            </td>
            <td style="width: 100px; height: 30px" valign="middle" align="left">
                <object id="AccountNameSelectGrid" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;
                    margin: 0px; width: 100%; padding-top: 0px; height: 20px; background-color: activeborder;"
                    accesskey="a" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
                    name="AccountNameSelectGrid">
                    <param name="_cx" value="3810">
                    <param name="_cy" value="635">
                    <param name="_ConvInfo" value="1">
                    <param name="Appearance" value="1">
                    <param name="BorderStyle" value="0">
                    <param name="Enabled" value="-1">
                    <param name="Font" value="Times New Roman">
                    <param name="MousePointer" value="0">
                    <param name="BackColor" value="-2147483643">
                    <param name="ForeColor" value="-2147483640">
                    <param name="BackColorFixed" value="10386532">
                    <param name="ForeColorFixed" value="-2147483630">
                    <param name="BackColorSel" value="13680821">
                    <param name="ForeColorSel" value="0">
                    <param name="BackColorBkg" value="16777215">
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
                    <param name="GridLines" value="3">
                    <param name="GridLinesFixed" value="0">
                    <param name="GridLineWidth" value="1">
                    <param name="Rows" value="1">
                    <param name="Cols" value="1">
                    <param name="FixedRows" value="0">
                    <param name="FixedCols" value="0">
                    <param name="RowHeightMin" value="0">
                    <param name="RowHeightMax" value="0">
                    <param name="ColWidthMin" value="0">
                    <param name="ColWidthMax" value="0">
                    <param name="ExtendLastCol" value="-1">
                    <param name="FormatString" value="">
                    <param name="ScrollTrack" value="0">
                    <param name="ScrollBars" value="3">
                    <param name="ScrollTips" value="0">
                    <param name="MergeCells" value="0">
                    <param name="MergeCompare" value="0">
                    <param name="AutoResize" value="-1">
                    <param name="AutoSizeMode" value="1">
                    <param name="AutoSearch" value="1">
                    <param name="AutoSearchDelay" value="2">
                    <param name="MultiTotals" value="-1">
                    <param name="SubtotalPosition" value="1">
                    <param name="OutlineBar" value="0">
                    <param name="OutlineCol" value="0">
                    <param name="Ellipsis" value="1">
                    <param name="ExplorerBar" value="0">
                    <param name="PicturesOver" value="0">
                    <param name="FillStyle" value="0">
                    <param name="RightToLeft" value="0">
                    <param name="PictureType" value="0">
                    <param name="TabBehavior" value="0">
                    <param name="OwnerDraw" value="0">
                    <param name="Editable" value="0">
                    <param name="ShowComboButton" value="1">
                    <param name="WordWrap" value="-1">
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
            </td>
            <td style="width: 67px; height: 28px; " align="right">
                <input type="text" id = "_AccountCodeText" />
            </td>
            <td style="width: 20px;" align="left">
                <img title="Refresh" onclick="RefreshAccountList_OnClick()" src="images\\Refresh.gif"
                    pressedsrc="images\\Refresh.gif" hoversrc="images\\Refresh.gif" designtimedragdrop="148">
            </td>
            <td style="height: 30px" valign="middle" align="left">
                <%--<select id="_AccountSelect" name="_AccountSelect">
                    <option value='0'>Please select Account to query.</option>
                </select>--%>
                <input type="checkbox" id="_RealtimeCalculateCheckbox" name="_RealtimeCalculateCheckbox"
                    onchange="RealtimeCalculateCheckbox_OnChange();" checked />Realtime Calculate
                &nbsp;Interval:<input type="text" id="_IntervalText" name="_IntervalText" value="15" size="6" maxlength="5" />(unit: second)&nbsp;<input type="button" id="QueryButton" name="QueryButton" onclick="btnQuery_onclick();"
                    value="Query" style="width: 166px">
            </td>
        </tr>
    </table>
</body>
</html>
