<%@ Page Language="c#" Inherits="iExchange.DealingConsole.ExecuteOrders" CodeBehind="ExecuteOrders.aspx.cs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title><%=GetLanguage("ExecutedOrdersPage")%></title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 7.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/colorConst.js"></script>
    <script language="jscript" src="JavaScript/EnumDefine.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/ExecuteOrders.js"></script>
    <script language="jscript" src="JavaScript/ExecuteOrderSummary.js"></script>
    <script language="jscript" src="JavaScript/FormExecuteOrder.js"></script>
    <script event="DblClick" for="vsflexExecuteOrders">
            VsflexExecuteOrders_DblClick();
    </script>
    <SCRIPT event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="vsflexExecuteOrders">
            ExecuteOrderGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);
    </script>
    <SCRIPT event="AfterRowColChange(oldRow, oldCol, newRow, newCol)" for="vsflexExecuteOrders">
			ExecuteOrderGrid_OnAfterRowColChange(oldRow, oldCol, newRow, newCol);
		</SCRIPT>
    <script language="jscript" for="vsflexExecuteOrders" event="CellButtonClick()">			
			ExecuteOrderGrid_CellButtonClick(); 
		</script>
</head>
<body style="margin: 0px" onload="ExecuteOrderOnload();" onunload="ExecuteOrderOnunload();">
    <table id="Table1" cellspacing="2" cellpadding="2" width="100%" align="center" bgcolor="buttonface"
        border="0" style="width: 100%; height: 100%">
        <tr id="_ExecuteOrderListTR">
            <td nowrap colspan="1">
                <input type="button" id="_ExecuteOrderListButton1" name="_ExecuteOrderListButton1" style="width: 100px;"
                    value="<%=GetLanguage("List")%>" accesskey="l" onclick="ExecuteOrderListShow();" />
                <input type="button" id="_ExecuteOrderSummaryButton1" name="_ExecuteOrderSummaryButton1" style="width: 100px;"
                    value="<%=GetLanguage("Summary")%>" accesskey="s" onclick="ExecuteOrderSummaryShow();" />
            </td>
            <td>|</td>
            <TD style="width:auto" align="right"><asp:Label ID="AccountGroupLable" Width="130px" runat="server" Text="Account Group:" /></TD>
            <td>
            <select id="_AccountGroupSelect" style="WIDTH: 100px" name="_AccountGroupSelect" onchange = "AccountGroupSelect_OnChanged()">
                            <option id="_AccountGroupOptionAll" value="">&lt;All&gt;</option>
                                <%=GetAccountGroupOptions()%></select></td>
            <td style="height: 9px" nowrap colspan="1" align="left" style="width: 80%;">
                <input type="button" value="<%=GetLanguage("PrintButton")%>" onclick="Print();" id="btnPrint" style="width: 100px;"
                    accesskey="p" name="btnPrint">
                &nbsp;&nbsp;&nbsp;<input type="button" id="_ShowAccountStatus" name="_ShowAccountStatus"
                    onclick="ShowAccountStatus();" value="<%=GetLanguage("AccountStatus")%>" />
            </td>
        </tr>
        <tr id="_ExecuteOrderSummaryTR">
            <td nowrap colspan="1">
                <input type="button" id="_ExecuteOrderListButton2" name="_ExecuteOrderListButton2" style="width: 100px;"
                    value="<%=GetLanguage("List")%>" accesskey="l" onclick="ExecuteOrderListShow();" />
                <input type="button" id="_ExecuteOrderSummaryButton2" name="_ExecuteOrderSummaryButton2" style="width: 100px;"
                    value="<%=GetLanguage("Summary")%>" accesskey="s" onclick="ExecuteOrderSummaryShow();" />
            </td>
            <td>|</td>
            <%--<td colspan="1" nowrap style="width: 160px;" align="right">
                <object id="_ExecuteOrderSummaryInstrumentSelectGrid" style="padding-right: 0px;
                    padding-left: 0px; padding-bottom: 0px; margin: 0px; width: 100%; padding-top: 0px;
                    height: 20px; background-color: activeborder;" accesskey="a" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160"
                    classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949" name="_ExecuteOrderSummaryInstrumentSelectGrid">
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
            <td align="left">
                <img title="Refresh" onclick="RefreshInstrumentSummary_OnClick()" src="images\\Refresh.gif"
                    pressedsrc="images\\Refresh.gif" hoversrc="images\\Refresh.gif" designtimedragdrop="148">
            </td>--%>
            <td align="left" colspan="1" nowrap>
                <input type="radio" id="_QueryOnTimeRadio" name="_QueryOnTimeRadio" checked onclick="QueryOnTimeRadio_Onclick();" />
                <%=GetLanguage("TimeRange")%>
                <input type="text" id="_TimeRangeText" name="_TimeRangeText" maxlength="10" size="5"
                    value="10" onblur="TimeRangeText_Onblur();" />
                &nbsp;<%=GetLanguage("Minutes")%> &nbsp;&nbsp;<input type="radio" id="_QueryOnPriceRadio" name="_QueryOnPriceRadio"
                    onclick="QueryOnPriceRadio_Onclick();" /><%=GetLanguage("PriceRange")%>:
                <input type="text" id="_PriceRangeText" name="_PriceRangeText" maxlength="10" size="5"
                    value="100" onblur="PriceRangeText_Onblur();" />
                &nbsp;<%=GetLanguage("Pips")%> &nbsp;&nbsp;<input type="button" id="_QuerySummaryButton" name="_QuerySummaryButton"
                    value="<%=GetLanguage("Query")%>" style="width: 100px;" accesskey="q" onclick="QuerySummaryButton_Onclick();" />
                &nbsp;&nbsp;<input type="button" value="<%=GetLanguage("PrintButton")%>" onclick="ExecuteOrderSummaryPrint();"
                    id="_ExecuteOrderSummaryPrintButton" style="width: 100px;" accesskey="p" name="_ExecuteOrderSummaryPrintButton">
            </td>
        </tr>
        <tbody id="_ExecuteOrderListTBody">
            <tr>
                <td colspan="5" width="100%" height="100%">
                    <object id="vsflexExecuteOrders" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;
                        margin: 0px; width: 100%; padding-top: 0px; height: 100%; background-color: white"
                        codebase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
                        name="vsflexQuotation" viewastext>
                        <param name="_cx" value="15346">
                        <param name="_cy" value="8361">
                        <param name="_ConvInfo" value="1">
                        <param name="Appearance" value="1">
                        <param name="BorderStyle" value="1">
                        <param name="Enabled" value="-1">
                        <param name="Font" value="system">
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
                        <param name="Rows" value="1">
                        <param name="Cols" value="1">
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
                        <param name="ExplorerBar" value="7">
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
                </td>
            </tr>
        </tbody>
        <tbody id="_ExecuteOrderSummaryTBody">
            <tr>
                <td colspan="3" width="100%" height="100%">
                    <object id="_ExecuteOrderSummaryGrid" style="padding-right: 0px; padding-left: 0px;
                        padding-bottom: 0px; margin: 0px; width: 100%; padding-top: 0px; height: 100%;
                        background-color: white" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
                        name="_ExecuteOrderSummaryGrid" viewastext>
                        <param name="_cx" value="15346">
                        <param name="_cy" value="8361">
                        <param name="_ConvInfo" value="1">
                        <param name="Appearance" value="1">
                        <param name="BorderStyle" value="1">
                        <param name="Enabled" value="-1">
                        <param name="Font" value="system">
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
                        <param name="Rows" value="1">
                        <param name="Cols" value="1">
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
                        <param name="ExplorerBar" value="7">
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
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
