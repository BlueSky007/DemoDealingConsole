<%@ Page Language="c#" Inherits="iExchange.DealingConsole.OpenInterest" CodeBehind="OpenInterest.aspx.cs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>Open Interest</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 7.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <style type="text/css">
        .style1
        {
            width: 309px;
        }
        .style2
        {
            width: 297px;
        }
    </style>
    <link href="Common/Setting.css" type="text/css" rel="stylesheet">
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/colorConst.js"></script>
    <script language="jscript" src="JavaScript/EnumDefine.js"></script>
    <script language="jscript" src="JavaScript/Price.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/GroupNetPosition.js"></script>
    <script language="jscript" src="JavaScript/OpenInterest.js"></script>
    <script language="jscript" src="JavaScript/OpenInterestSummary.js"></script>
    <script language="jscript" src="JavaScript/FormOpenInterest.js"></script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="_GroupNetPositionGrid">
		GroupNetPositionGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);			
    </script>
    <script event="AfterEdit(row, col, cancel)" for="_GroupNetPositionGrid">
		GroupNetPositionGrid_OnAfterEdit(row, col, cancel);
    </script>
    <script event="DblClick" for="vsflexOpenInterest">
            vsflexOpenInterest_DblClick();
    </script>
    <script event="DblClick" for="_OpenInterestSummaryGrid">
            OpenInterestSummaryGrid_DblClick();
    </script>
    <script language="javascript" event="KeyDown(keyCode,shift)" for="_OpenInterestSummaryGrid">
		 OpenInterestSummaryGrid_KeyDown(keyCode , shift);
    </script>
    <script event="AfterCollapse(row,state)" for="_OpenInterestSummaryGrid">
        OpenInterestSummaryGrid_AfterCollapse(row,state);
    </script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="_OpenInterestSummaryGrid">
		OpenInterestSummaryGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);			
    </script>
    <script event="AfterEdit(row, col, cancel)" for="_OpenInterestSummaryGrid">
		OpenInterestSummaryGrid_OnAfterEdit(row, col, cancel);
    </script>
    <script event="BeforeSort(col,order)" for="_OpenInterestSummaryGrid">
		OpenInterestSummaryGrid_BeforeSort(col,order);
    </script>
</head>
<body id="Body1" style="margin: 0px" bgcolor="buttonface" onload="OpenInterestOnload();"
    onunload="OpenInterestOnunload();">
    <table id="Table1" cellspacing="2" cellpadding="2" width="100%" align="center" bgcolor="buttonface"
        border="0" style="width: 100%; height: 100%">
        <tbody id="_GroupNetPositionTBody">
            <tr id="_GroupNetPositionTR">
                <td nowrap colspan="1">
                    <%--<input type="button" id="_OpenInterestListButton0" name="_OpenInterestListButton0"
                        style="width: 80px;" value="    List    " accesskey="l" onclick="OpenInterestListShow();" />--%>
                    <input type="button" id="_GroupNetPositionButton0" name="_GroupNetPositionButton0"
                        style="width: 130px;" value="    Group Net Position    " accesskey="g" onclick="GroupNetPositionShow();" />
                    <input type="button" id="_OpenInterestSummaryButton0" name="_OpenInterestSummaryButton0"
                        style="width: 80px;" value="Summary" accesskey="s" onclick="OpenInterestSummaryShow();" />
                </td>
                <td>
                    |
                </td>
                <td nowrap colspan="5" align="left" style="width: 80%;">
                    <input type="checkbox" id="_ShowActualQuantityCheckbox" name="_ShowActualQuantityCheckbox" checked="checked" onclick="HideQuantityCol();"/>Show Actual Quantity&nbsp;
                    <input type="button" id="_ShowBlotterSelectionGroupNetPositionButton" name="_ShowBlotterSelectionGroupNetPositionButton" value="Blotter Selection" onclick="ShowBlotterSelectionGroupNetPositionButton_Onclick();" />
                    <input type="button"  id="btnQueryGroupNetPosition" name="btnQueryGroupNetPosition" onclick="QueryGroupNetPosition(false);"
                        value=" Go " />
                    <input type="button" style="width:20px;visibility:hidden;" id="HideQuantity" name="btnHideQuantity" onclick="HideQuantityCol();"
                    value=" Go " />
                    &nbsp;&nbsp;&nbsp;<input id="btnPrintGroupNetPosition" onclick="PrintGroupNetPosition();" style="width: 100px;"
                        accesskey="p" type="button" value="Print" name="btnPrintGroupNetPosition">
                    &nbsp;&nbsp;&nbsp;<input type="button" id="Button6" name="_ShowAccountStatus"
                        onclick="ShowAccountStatusGNP();" value="Account Status" />
                </td>
            </tr>
            <tr>
                <td colspan="7" width="100%" height="100%">
                    <object id="_GroupNetPositionGrid" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160" style="padding-right: 0px;
                        padding-left: 0px; padding-bottom: 0px; margin: 0px; width: 100%; padding-top: 0px;
                        height: 95%; background-color: white" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
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
                </td>
            </tr>
        </tbody>
        <tbody id="_OpenInterestListTBody">
            <tr id="_OpenInterestListInstrumentSelectTR">
                <td nowrap colspan="1">
                    <%--<input type="button" id="_OpenInterestListButton1" name="_OpenInterestListButton1"
                        style="width: 80px;" value="    List    " accesskey="l" onclick="OpenInterestListShow();" />--%>
                    <input type="button" id="_GroupNetPositionButton1" name="_GroupNetPositionButton1"
                        style="width: 130px;" value="    Group Net Position    " accesskey="g" onclick="GroupNetPositionShow();" />
                    <input type="button" id="_OpenInterestSummaryButton1" name="_OpenInterestSummaryButton1"
                        style="width: 80px;" value="Summary" accesskey="s" onclick="OpenInterestSummaryShow();" />
                </td>
                <td>
                    |
                </td>
                <td colspan="1" nowrap style="width: 160px;" align="right">
                    <object id="InstrumentSelectGrid" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;
                        margin: 0px; width: 100%; padding-top: 0px; height: 20px; background-color: activeborder;"
                        accesskey="a" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
                        name="InstrumentSelectGrid">
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
                    <img title="Refresh" onclick="RefreshInstrumentList_OnClick()" src="images\\Refresh.gif"
                        pressedsrc="images\\Refresh.gif" hoversrc="images\\Refresh.gif" designtimedragdrop="148">
                </td>
                <td nowrap colspan="3" align="left" style="width: 80%;">
                    <input type="button" id="_ShowBlotterSelectionListButton" name="_ShowBlotterSelectionListButton" value="Blotter Selection" onclick="ShowBlotterSelectionListButton_Onclick();" />
                    <input type="button" id="btnQueryList" name="btnQueryList" onclick="QueryList();"
                        value=" Go " />
                    &nbsp;&nbsp;&nbsp;<input id="btnPrint" onclick="PrintList();" style="width: 100px;"
                        accesskey="p" type="button" value="Print" name="btnPrint">
                    &nbsp;&nbsp;&nbsp;<input type="button" id="_ShowAccountStatus" name="_ShowAccountStatus"
                        onclick="vsflexOpenInterest_DblClick();" value="Account Status" />
                </td>
            </tr>
            <tr>
                <td colspan="7" width="100%" height="100%">
                    <object id="vsflexOpenInterest" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160" style="padding-right: 0px;
                        padding-left: 0px; padding-bottom: 0px; margin: 0px; width: 100%; padding-top: 0px;
                        height: 95%; background-color: white" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
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
                </td>
            </tr>
            <tr>
                <td colspan="7" width="100%" height="100%">
                    <table id="Table2" cellspacing="2" cellpadding="2" width="100%" align="center" bgcolor="buttonface"
                        border="0" style="width: 100%; height: 100%">
                        <tr>
                            <td id="buyLotTD2" class="style1">
                                <font face="system">Buy Lot: 0</font>
                            </td>
                            <td id="buyAveTD2" class="style2">
                                <font face="system">Buy Ave Price: 0</font>
                            </td>
                            <td id="NetLotTD" rowspan="2" style="font-family: System; font-size: large;">
                                NET: 0
                            </td>
                        </tr>
                        <tr>
                            <td id="sellLotTD2" class="style1">
                                <font face="system"><font face="system">Sell Lot: 0</font></font>
                            </td>
                            <td id="sellAveTD2" class="style2">
                                <font face="system"><font face="system">Sell Ave Price: 0</font></font>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </tbody>
        <tbody id="_OpenInterestSummaryTBody">
            <tr id="_OpenInterestSummaryInstrumentSelectTR">
                <td nowrap colspan="1">
                    <%--<input type="button" id="_OpenInterestListButton2" name="_OpenInterestListButton2"
                        style="width: 80px;" value="    List    " accesskey="l" onclick="OpenInterestListShow();" />--%>
                    <input type="button" id="_GroupNetPositionButton2" name="_GroupNetPositionButton2"
                        style="width: 130px;" value="    Group Net Position    " accesskey="g" onclick="GroupNetPositionShow();" />
                    <input type="button" id="_OpenInterestSummaryButton2" name="_OpenInterestSummaryButton2"
                        style="width: 80px;" value="Summary" accesskey="s" onclick="OpenInterestSummaryShow();" />
                </td>
                
                <td nowrap colspan="1" align="left">
                    Sorting on:
                    <select id="_OutlineSelect" name="_OutlineSelect" onchange="OutlineSelect_Onclick();"
                        style="width: 80px;">
                         <option id="_InstrumentOutlineOption" value="0">Instrument</option>
                        <option id="_AccountGroupOutlineOption" value="1" selected>Group</option>
                        <option id="_AccountOutlineOption" value="2">Account</option>
                        <option id="_OrderOutlineOption" value="3">Order</option>
                    </select>
                    <%--<input type="radio" id="_AccountGroupOutlineRadio" name="_AccountGroupOutlineRadio" value="1" checked onclick="AccountGroupOutlineRadio_Onclick();" />Group
                    <input type="radio" id="_AccountOutlineRadio" name="_AccountOutlineRadio" value="2" onclick="AccountOutlineRadio_Onclick();" />Account
                    <input type="radio" id="_OrderOutlineRadio" name="_OrderOutlineRadio" value="3" onclick="OrderOutlineRadio_Onclick();" />Content--%>
                </td>
                <td>
                    |
                </td>
                <td id="Td1" nowrap style="width: 10%;" align="left">
                    <input type="radio" id="_SelectCodeCheckbox" name="_SelectEitherCodeOrOrignCodeCheckbox"
                        checked onclick="SelectEitherCodeOrOrignCodeCheckboxOnclick();" />Code
                    <input type="radio" id="_SelectOriginCodeCheckbox" name="_SelectEitherCodeOrOrignCodeCheckbox"
                        onclick="SelectEitherCodeOrOrignCodeCheckboxOnclick();" />Origin Code
                </td>
                <%--<td nowrap style="width: 160px;" align="right">
                    <object id="_OpenInterestSummaryInstrumentSelectGrid" style="padding-right: 0px;
                        padding-left: 0px; padding-bottom: 0px; margin: 0px; width: 100%; padding-top: 0px;
                        height: 20px; background-color: activeborder;" accesskey="a" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160"
                        classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949" name="_OpenInterestSummaryInstrumentSelectGrid">
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
                <td nowrap colspan="3" align="left">
                    <input type="button" id="_ShowBlotterSelectionSummaryButton" name="_ShowBlotterSelectionSummaryButton" value="Blotter Selection" onclick="ShowBlotterSelectionSummaryButton_Onclick();" />
                    <input type="button" id="btnQuerySummary" name="btnQuerySummary" onclick="QuerySummary();"
                        value=" Go " />
                    <%--<input type="button" id="_RecalculateButton" name="_RecalculateButton" onclick="Recalculate();" value="Recalculate" />--%>
                    &nbsp;&nbsp;&nbsp;<input id="Button2" onclick="PrintSummary();" style="width: 100px;"
                        accesskey="p" type="button" value="Print" name="btnPrint">
                    &nbsp;&nbsp;&nbsp;<input type="button" id="Button3" name="_ShowAccountStatus" onclick="ShowAccountStatus(true);"
                        value="Account Status" />
                </td>
            </tr>
            <tr>
                <td colspan="7" width="100%" height="100%">
                    <object id="_OpenInterestSummaryGrid" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160"
                        style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px; margin: 0px;
                        width: 100%; padding-top: 0px; height: 95%; background-color: white" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
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
                </td>
            </tr>
        </tbody>
    </table>
    <div id="Service" style="display: none; behavior: url(behaviors/webservice.htc)">
    </div>
</body>
</html>
