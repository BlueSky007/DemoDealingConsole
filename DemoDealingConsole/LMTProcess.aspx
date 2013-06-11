<%@ Page language="c#" Inherits="iExchange.DealingConsole.LMTProcess" Codebehind="LMTProcess.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title><%=GetLanguage("LimitProcessPage")%></title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<SCRIPT language="jscript" src="JavaScript/flexConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/colorConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/EnumDefine.js"></SCRIPT>
		<!--<SCRIPT language="jscript" src="JavaScript/clsPrice.js"></SCRIPT>-->
		<SCRIPT language="jscript" src="JavaScript/GlobalFun.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/LMTProcess.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/OrderTask.js"></SCRIPT>
		<SCRIPT event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="vsflexLMT">
			OnLMTBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);
		</SCRIPT>
		<SCRIPT event="ValidateEdit(row, col, cancel)" for="vsflexLMT">
			OnLMTValidateEdit(row, col, cancel);			
		</SCRIPT>
	</HEAD>
	<BODY id="oBodyLMT" onload="LMTInit()" onunload="LMTFinish()" onkeydown="FilterKey(event)">
		<TABLE id="Table1" height="346" cellSpacing="2" cellPadding="2" width="629" align="center"
			border="0" bgColor="buttonface" style="WIDTH: 629px; HEIGHT: 346px">
			<TR>
				<TD vAlign="middle" noWrap align="center" width="111" colSpan="1" height="7" rowSpan="1">
					<SELECT id="SelectLMTProcess" style="WIDTH: 72px; POSITION: relative; TOP: -5px" onchange="LMTProcess_click();">
					</SELECT>
				</TD>
				<TD id="labelSell" width="128" height="7"><%=GetLanguage("TotalSell")%>: 0</TD>
				<TD id="labelBuy" width="132" height="7"><%=GetLanguage("TotalBuy")%>: 0</TD>
				<TD align="center" height="7"><INPUT id="btnApply" onclick="OnLMTApply()" type="button" value="<%=GetLanguage("Apply")%>" name="btnApply"
						ACCESSKEY="A" style="WIDTH: 73px; HEIGHT: 24px"></TD>
			</TR>
			<TR>
				<TD vAlign="middle" noWrap align="right" width="111" height="7" style="HEIGHT: 7px"><%=GetLanguage("SourcePrice")%></TD>
				<TD id="labelSource" width="128" height="7" style="HEIGHT: 7px"><FONT face="system"></FONT></TD>
				<TD width="132" height="7" style="HEIGHT: 7px"></TD>
				<TD align="center" colSpan="1" height="7" rowSpan="1" style="HEIGHT: 7px"><INPUT id="btnExecute" onclick="OnLMTExecute()" type="button" value="<%=GetLanguage("Execute")%>" name="btnExec"
						ACCESSKEY="E" style="WIDTH: 73px"></TD>
			</TR>
			<TR>
				<TD vAlign="middle" noWrap align="right" width="111" colSpan="1" height="2" rowSpan="1"
					style="HEIGHT: 2px"><%=GetLanguage("MarketPrice")%></TD>
				<TD width="128" height="2" style="HEIGHT: 2px">
					<P><%=GetLanguage("Bid")%>: <INPUT id="textBid" type="text" size="6" name="Text1" style="COLOR: blue"></P>
				</TD>
				<TD width="132" height="2" style="HEIGHT: 2px"><%=GetLanguage("Ask")%>: <INPUT id="textAsk" type="text" size="6" name="Text2" style="COLOR: red">
				</TD>
				<TD vAlign="baseline" noWrap align="center" colSpan="1" height="2" rowSpan="1" style="HEIGHT: 2px"><INPUT id="btnExit" onclick="self.close();" type="button" value="<%=GetLanguage("Exit")%>" name="btnExit" ACCESSKEY="X"
						style="WIDTH: 73px; HEIGHT: 24px"></TD>
			</TR>
			<TR>
				<TD vAlign="baseline" noWrap align="right" width="100%" colSpan="4">
					<OBJECT id="vsflexLMT" codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" width="98.56%" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
						VIEWASTEXT vAlign="baseline">
						<PARAM NAME="_cx" VALUE="16166">
						<PARAM NAME="_cy" VALUE="6562">
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
				</TD>
			</TR>
		</TABLE>
	</BODY>
</HTML>
