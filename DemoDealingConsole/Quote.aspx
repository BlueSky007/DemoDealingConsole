<%@ Page Language="C#" AutoEventWireup="true" Inherits="iExchange.DealingConsole.Quote" Codebehind="Quote.aspx.cs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >

<html>
    <head>
        <title>QUOTE</title>
        <SCRIPT language="jscript" src="JavaScript/flexConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/colorConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/EnumDefine.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/GlobalFun.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/Quote.js"></SCRIPT>	
		<SCRIPT event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="vsflexEnquiry">
			OnEnquiryBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);
		</SCRIPT>
		<SCRIPT language="javascript" event="KeyDown(keyCode,shift)" for="vsflexEnquiry">
			OnGridKeyDown(keyCode,shift);
        </SCRIPT>
        <SCRIPT event="AfterEdit(row, col)" for="vsflexEnquiry">
			OnEnquiryAfterEdit(row, col);
		</SCRIPT>
        <SCRIPT event="ValidateEdit(row, col, cancel)" for="vsflexEnquiry">
			OnGridValidateEdit(row, col, cancel);
		</SCRIPT>
    </head>
    <body onload="OnLoad();" onunload="OnUnload();" onkeydown="Onkeydown(window.event.altKey,window.event.keyCode);">
        <TABLE id="Table1" cellSpacing="2" cellPadding="2" width="100%" align="center" bgColor="buttonface" border="0" style="height: 300px">
            <tr>   
                <TD style="width: 69px; height: 5px">
                    Source: </TD>
		        <TD noWrap align="left" width="160" height="2">
					<DIV id="LabelSource" style="DISPLAY: inline; FONT-WEIGHT: bold; WIDTH: 70px; COLOR: red; HEIGHT: 15px">source</DIV>
				</TD>
                <TD style="width: 69px; height: 5px">
                    Adjust:</TD>
                 <TD style="height: 5px; width: 32px;">
                    <input id="TextAdjust"
                    onkeypress = "return regInput(this, /^\d*\.?\d{0,6}$/, String.fromCharCode(event.keyCode))"
                    onpaste = "return regInput(this, /^\d*\.?\d{0,6}$/, window.clipboardData.getData('Text'))"
                    ondrop = "return regInput(this, /^\d*\.?\d{0,6}$/, event.dataTransfer.getData('Text'))"
                    style="width: 111px" type="text" value="" />
                  </TD>
                  <td colspan="4" style="height: 5px">
                    &nbsp;
                </td>
		    </TR>
		    <TR>
		        <TD colspan=9 style="height: 250px">
			       <OBJECT id="vsflexEnquiry" style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; WIDTH: 100%; PADDING-TOP: 0px; HEIGHT: 100%; BACKGROUND-COLOR: white" codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949" VIEWASTEXT>
				<PARAM NAME="_cx" VALUE="13335">
				<PARAM NAME="_cy" VALUE="5080">
				<PARAM NAME="_ConvInfo" VALUE="1">
				<PARAM NAME="Appearance" VALUE="1">
				<PARAM NAME="BorderStyle" VALUE="1">
				<PARAM NAME="Enabled" VALUE="-1">
				<PARAM NAME="Font" VALUE="Times New Roman">
				<PARAM NAME="MousePointer" VALUE="0">
				<PARAM NAME="BackColor" VALUE="-2147483643">
				<PARAM NAME="ForeColor" VALUE="-2147483640">
				<PARAM NAME="BackColorFixed" VALUE="-2147483633">
				<PARAM NAME="ForeColorFixed" VALUE="-2147483630">
				<PARAM NAME="BackColorSel" VALUE="-2147483635">
				<PARAM NAME="ForeColorSel" VALUE="-2147483634">
				<PARAM NAME="BackColorBkg" VALUE="-2147483636">
				<PARAM NAME="BackColorAlternate" VALUE="-2147483643">
				<PARAM NAME="GridColor" VALUE="-2147483633">
				<PARAM NAME="GridColorFixed" VALUE="-2147483632">
				<PARAM NAME="TreeColor" VALUE="-2147483632">
				<PARAM NAME="FloodColor" VALUE="192">
				<PARAM NAME="SheetBorder" VALUE="-2147483642">
				<PARAM NAME="FocusRect" VALUE="1">
				<PARAM NAME="HighLight" VALUE="1">
				<PARAM NAME="AllowSelection" VALUE="-1">
				<PARAM NAME="AllowBigSelection" VALUE="-1">
				<PARAM NAME="AllowUserResizing" VALUE="0">
				<PARAM NAME="SelectionMode" VALUE="0">
				<PARAM NAME="GridLines" VALUE="1">
				<PARAM NAME="GridLinesFixed" VALUE="2">
				<PARAM NAME="GridLineWidth" VALUE="1">
				<PARAM NAME="Rows" VALUE="1">
				<PARAM NAME="Cols" VALUE="1">
				<PARAM NAME="FixedRows" VALUE="1">
				<PARAM NAME="FixedCols" VALUE="1">
				<PARAM NAME="RowHeightMin" VALUE="0">
				<PARAM NAME="RowHeightMax" VALUE="0">
				<PARAM NAME="ColWidthMin" VALUE="0">
				<PARAM NAME="ColWidthMax" VALUE="0">
				<PARAM NAME="ExtendLastCol" VALUE="-1">
				<PARAM NAME="FormatString" VALUE="">
				<PARAM NAME="ScrollTrack" VALUE="0">
				<PARAM NAME="ScrollBars" VALUE="3">
				<PARAM NAME="ScrollTips" VALUE="0">
				<PARAM NAME="MergeCells" VALUE="0">
				<PARAM NAME="MergeCompare" VALUE="0">
				<PARAM NAME="AutoResize" VALUE="0">
				<PARAM NAME="AutoSizeMode" VALUE="0">
				<PARAM NAME="AutoSearch" VALUE="0">
				<PARAM NAME="AutoSearchDelay" VALUE="2">
				<PARAM NAME="MultiTotals" VALUE="-1">
				<PARAM NAME="SubtotalPosition" VALUE="1">
				<PARAM NAME="OutlineBar" VALUE="0">
				<PARAM NAME="OutlineCol" VALUE="0">
				<PARAM NAME="Ellipsis" VALUE="0">
				<PARAM NAME="ExplorerBar" VALUE="0">
				<PARAM NAME="PicturesOver" VALUE="0">
				<PARAM NAME="FillStyle" VALUE="0">
				<PARAM NAME="RightToLeft" VALUE="0">
				<PARAM NAME="PictureType" VALUE="0">
				<PARAM NAME="TabBehavior" VALUE="0">
				<PARAM NAME="OwnerDraw" VALUE="0">
				<PARAM NAME="Editable" VALUE="0">
				<PARAM NAME="ShowComboButton" VALUE="1">
				<PARAM NAME="WordWrap" VALUE="0">
				<PARAM NAME="TextStyle" VALUE="0">
				<PARAM NAME="TextStyleFixed" VALUE="0">
				<PARAM NAME="OleDragMode" VALUE="0">
				<PARAM NAME="OleDropMode" VALUE="0">
				<PARAM NAME="ComboSearch" VALUE="3">
				<PARAM NAME="AutoSizeMouse" VALUE="-1">
				<PARAM NAME="FrozenRows" VALUE="0">
				<PARAM NAME="FrozenCols" VALUE="0">
				<PARAM NAME="AllowUserFreezing" VALUE="0">
				<PARAM NAME="BackColorFrozen" VALUE="0">
				<PARAM NAME="ForeColorFrozen" VALUE="0">
				<PARAM NAME="WallPaperAlignment" VALUE="9">
			</OBJECT>
		        </TD>
	        </TR>
	        <TR>
	            <TD style="width: 69px; height: 11px;">TOTAL</TD>
                 <TD style="height: 11px;">                       
                    &nbsp;                    
                </TD>
                <TD style="height: 11px; width: 104px;" align=right>Query:</TD>
                 <TD style="height: 11px; width: 49px;" align="left" valign="left" id="tdTotalQuery"></TD>
                <TD style="height: 11px; width: 104px;" align=right>
                    Sell:</TD>
                <TD style="height: 11px; width: 49px; color: red;" align="right" id="tdTotalSell">
                    </TD>
                <td style="height: 11px; width: 104px;" align=right>
                    Buy:</td>
                <td style="width: 2px; height: 11px;" align="left">
                </td>				    
                <td align="left" style="height: 11px; color: blue; width: 49px;" id="tdTotalBuy">
                    </td>
	        </TR>
        </TABLE>
    </body>
</html>
