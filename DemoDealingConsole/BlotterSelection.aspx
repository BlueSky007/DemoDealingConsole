<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BlotterSelection.aspx.cs"
    Inherits="iExchange.DealingConsole.BlotterSelection" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>Blotter Selection</title>
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/FormBlotterSelection.js"></script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="_BlotterSelectionGrid">
		BlotterSelectionGrid_BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);
    </script>
</head>
<body style="margin: 0px; overflow: show; height: 100%; width: 100%;" bgcolor="buttonface"
    onload="BlotterSelectionForm_Onload();" onunload="BlotterSelectionForm_Onunload();"
    tabindex="-1">
    <object id="_BlotterSelectionGrid" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160"
        style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px; margin: 0px;
        width: 100%; padding-top: 0px; height: 90%; background-color: white" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
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
    <table border="0">
        <tr>
        <td align="left" nowrap>
            <input type="button" id="_SelectAllButton" name="_SelectAllButton" value="  Select All  " accesskey="a" onclick="SelectAllButton_Click();" style="width:70px;" />
            <input type="button" id="_ClearAllButton" name="_ClearAllButton" value="  Clear All  " accesskey="r" onclick="ClearAllButton_Click();" style="width:70px;" />        
        </td>
        <td align="right" nowrap>
            <input type="button" id="_OkButton" name="_OkButton" value="  OK  " onclick="OkButton_Click();" accesskey="o" style="width:70px;" />
            <input type="button" id="_CancelButton" name="_CancelButton" value="  Cancel  " onclick="CancelButton_Click();" accesskey="c" style="width:70px;" />
        </td>
        </tr>
    </table>
</body>
</html>
