<%@ Page language="c#" Inherits="iExchange.DealingConsole.HistoryPrice" Codebehind="HistoryPrice.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>HistoryPrice</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<SCRIPT language="jscript" src="JavaScript/flexConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/colorConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/GlobalFun.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/HistoryPrice.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/FormHistoryPrice.js"></SCRIPT>
	</HEAD>
	<BODY id="Body1" onresize="onSize();" onload="onLoad()" STYLE="MARGIN: 0px" bgColor="buttonface">
		<TABLE id="Table1" cellSpacing="2" cellPadding="2" width="100%" border="0" align="center" bgColor="buttonface" height="100%">
			<TR width="100%" align="middle" valign="center">
				<TD width="100%" noWrap align="left"><FONT face="system">Instrument: </FONT>
					<SELECT id="Select1" name="Select1" onchange="OnInstrumentChange()">
					</SELECT><FONT face="system">QuotePolicy:</FONT>
					<SELECT id="Select2" name="Select2">
					</SELECT><FONT face="system"> Time:</FONT> <INPUT id="TextTime" type="text" name="Text2" size="13">
					<INPUT id="btnTime" type="button" value="..." name="Button3" onclick="return BtnTime_onclick()"><FONT face="system">
						<INPUT id="Button1" type="button" value="Query" name="Button1" style="WIDTH: 54px; HEIGHT: 24px"></FONT>
					<INPUT id="btnPrint" type="button" value="Print" name="Button2" style="WIDTH: 54px; HEIGHT: 24px"></TD>
			</TR>
			<TR width="100%" align="middle" valign="center">
				<td height="100%" width="100%" align="middle" valign="center">
					<OBJECT id="vsflexHistoryPrice" codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="100%" width="100%" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949" VIEWASTEXT>
						<PARAM NAME="_cx" VALUE="19050">
						<PARAM NAME="_cy" VALUE="13388">
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
						<PARAM NAME="Rows" VALUE="50">
						<PARAM NAME="Cols" VALUE="10">
						<PARAM NAME="FixedRows" VALUE="1">
						<PARAM NAME="FixedCols" VALUE="1">
						<PARAM NAME="RowHeightMin" VALUE="0">
						<PARAM NAME="RowHeightMax" VALUE="0">
						<PARAM NAME="ColWidthMin" VALUE="0">
						<PARAM NAME="ColWidthMax" VALUE="0">
						<PARAM NAME="ExtendLastCol" VALUE="0">
						<PARAM NAME="FormatString" VALUE="">
						<PARAM NAME="ScrollTrack" VALUE="0">
						<PARAM NAME="ScrollBars" VALUE="3">
						<PARAM NAME="ScrollTips" VALUE="0">
						<PARAM NAME="MergeCells" VALUE="0">
						<PARAM NAME="MergeCompare" VALUE="0">
						<PARAM NAME="AutoResize" VALUE="-1">
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
				</td>
			</TR>
		</TABLE>
	</BODY>
</HTML>
