<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="InstantOrderList.aspx.cs"
    Inherits="iExchange.DealingConsole.InstantOrderList" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<head>
    <title>Instant Order List</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 7.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <%--<link href="Common/Setting.css" type="text/css" rel="stylesheet">--%>
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/colorConst.js"></script>
    <script language="jscript" src="JavaScript/EnumDefine.js"></script>
    <script language="jscript" src="JavaScript/Price.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/InstantOrderList.js"></script>
   <%-- <script event="AfterEdit(row, col, cancel)" for="_InstrumentSelectGrid">
		InstrumentSelectGrid_AfterEdit(row, col, cancel);
    </script>--%>
    <%--<script language="jscript" for="_InstantOrderListGrid" event="CellButtonClick()">			
		InstantOrderListGrid_CellButtonClick(); 
    </script>--%>
    <script language="jscript" for="_InstantOrderListGrid" event="Click">			
		InstantOrderListGrid_Click(); 
    </script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="_InstantOrderListGrid">
		InstantOrderListGrid_OnBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);			
    </script>
</head>
<body style="MARGIN: 0px; OVERFLOW: show; height: 100%; width: 100%;" bgcolor="buttonface" onload="InstantOrderOnload();"
    onunload="InstantOrderOnunload();">
    <table id="Table1" cellspacing="0" cellpadding="0" align="center" bgcolor="buttonface"
        border="0" style="width: 100%; height: 6%;">
        <tr>
            <td nowrap style="width: 100px;" align="left">
                <select id="_InstrumentSelect" name="_InstrumentSelect" onchange="InstrumentSelect_Onchange();" style="WIDTH: 100px; POSITION: relative;" ></select>
               <%-- <object id="_InstrumentSelectGrid" style="padding-right: 0px; padding-left: 0px;
                    padding-bottom: 0px; margin: 0px; width: 100%; padding-top: 0px; height: 20px;
                    background-color: activeborder;" accesskey="a" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160"
                    classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949" name="_InstrumentSelectGrid">
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
                </object>--%>
            </td>
            <td nowrap align="left" style="display: none;">
                <img title="Refresh" onclick="RefreshInstrumentComboData();" src="images\\Refresh.gif"
                    pressedsrc="images\\Refresh.gif" hoversrc="images\\Refresh.gif" designtimedragdrop="148">
            </td>
            <td nowrap align="left">
                <select id="_BuySellSelect" name="_BuySellSelect" style="width: 50px;" onchange="BuySellSelect_Onchange();">
                    <option id="_BuySellSelectAllOption" value="-1" selected>All</option>
                    <option id="_BuySellSelectBuyOption" value="1">Buy</option>
                    <option id="_BuySellSelectSellOption" value="0">Sell</option>
                </select>
                <select id="_NewCloseSelect" name="_NewCloseSelect" style="width: 50px;" onchange="NewCloseSelect_Onchange();">
                    <option id="_NewCloseSelectAllOption" value="-1" selected>All</option>
                    <option id="_NewCloseSelectNewOption" value="1">New</option>
                    <option id="_NewCloseSelectCloseOption" value="0">Close</option>
                </select>
                <input type="button" id="_QueryButton" name="_QueryButton" onclick="QueryButton_Onclick();"
                    value="GO" style="width: 30px;" accesskey="g" />
            </td>
            <td id="_MarketOriginPriceDivTd1" nowrap align="right">
            </td>
            <td id="_MarketOriginPriceDivTd2" nowrap align="left">
                <div id="_MarketOriginPriceDiv" style="width: 80px; height: 25px; border: 1; border-color: Yellow;
                    background-color: Silver; font-size: 20px; font-weight: bold; vertical-align: middle;
                    text-align: center;">
                </div>
            </td>
            <td id="_VariationTextTd" nowrap align="left">
                Variation:
                <input id="_VariationText" onblur="onBlurEvent();" maxlength="19" style="width: 38px;
                    text-align: right" type="text" value="0" />
                <input type="button" id="_IncreaseAutoPointsButton" name="_IncreaseAutoPointsButton"
                    value="+" onclick="IncreaseAutoPoints();" />
                <input type="button" id="_DecreaseAutoPointsButton" name="_DecreaseAutoPointsButton"
                    value="-" onclick="DecreaseAutoPoints();" />
            </td>
            <td id="_ExecuteAllTd" nowrap align="left">
                <input type="button" id="_ExecuteAllButton" name="_ExecuteAllButton" onclick="ExecuteAll_Onclick();"
                    value="Execute All" accesskey="e" style="width: 80px;" />
            </td>
        </tr>
    </table>
    <object id="_InstantOrderListGrid" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160"
        style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px; margin: 0px;
        width: 100%; padding-top: 0px; height: 92%; background-color: white" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
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
</body>
</html>
