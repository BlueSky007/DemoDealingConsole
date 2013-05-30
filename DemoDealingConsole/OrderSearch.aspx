<%@ Page language="c#" Inherits="iExchange.DealingConsole.OrderSearch" Codebehind="OrderSearch.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Order Search</title>
		<meta content="Microsoft Visual Studio 7.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<SCRIPT language="jscript" src="JavaScript/flexConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/colorConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/GlobalFun.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/OrderSearch.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/FormOrderSearch.js"></SCRIPT>
	</HEAD>
	<BODY id="Body1" onresize="onSize();" style="MARGIN: 0px" bgColor="buttonface" onload="onLoad()" onunload="Onunload();">
		<TABLE id="Table1" height="100%" cellSpacing="2" cellPadding="2" width="100%" align="center" bgColor="buttonface" border="0">
			<TR>
				<td style="HEIGHT: 55px" vAlign="center" align="middle">
					<TABLE id="Table2" height="100%" cellSpacing="2" cellPadding="2" width="100%" align="center" bgColor="buttonface" border="0">
						<TR>
							<TD style="WIDTH: 90px" noWrap align="right"><FONT face="system">Query Type: </FONT>
							</TD>
							<TD style="WIDTH: 120px" noWrap align="right" width="190">
								<SELECT id="QueryTypeSelect" style="WIDTH: 100%" name="QueryTypeSelect">
									<option value="0" selected>Executed</option>
									<option value="1">Cancelled</option>
								</SELECT></TD>
							<TD style="WIDTH: 80px" noWrap align="right"><FONT face="system">Instrument: </FONT>
							</TD>
							<TD style="WIDTH: 120px" noWrap align="right"><SELECT id="Select1" style="WIDTH: 100%" name="Select1"></SELECT></TD>
							<TD style="WIDTH: 80px" noWrap align="right" ><FONT face="system">Trade Time: </FONT>
							</TD>
							<TD noWrap align="left"><INPUT id="TextStart" type="text" size="15" name="Text2"><FONT face="system"></FONT>
								<INPUT id="Button4" onclick="BtnStartTime_onclick()" type="button" value="..." name="Button4"></TD>
							<TD noWrap align="left"><INPUT style="width:90px" id="btnQuery" accessKey="q" onclick="Query();" type="button" value="Query" name="btnQuery"></TD>
						</TR>
						<TR>
							<TD style="WIDTH: 90px" noWrap align="right"><FONT face="system">AC Group:</FONT></TD>
							<TD style="WIDTH: 120px" noWrap align="right">
                            <SELECT id="_AccountGroupSelect" style="WIDTH: 100%" name="_AccountGroupSelect">
                            <option id="_AccountGroupOptionAll" value="">&lt;All&gt;</option>
                                <%=GetAccountGroupOptions()%>
                            </select></SELECT></TD>
							<TD style="WIDTH: 80px" noWrap align="right"><FONT face="system">Order Type:</FONT></TD>
							<TD style="WIDTH: 120px" noWrap align="right"><SELECT id="Select2" style="WIDTH: 100%" name="Select2"></SELECT></FONT></TD>
							<TD style="WIDTH: 80px" noWrap align="right" ><FONT face="system">To:</FONT>
							</TD>
							<TD noWrap align="left"><INPUT id="TextEnd" type="text" size="15" name="Text1">
								<INPUT id="Button3" style="WIDTH: 21px" onclick="BtnEndTime_onclick()" type="button" value="..." name="Button3"></FONT></TD>
							<TD noWrap align="left"><INPUT style="width:90px" id="btnPrint" accessKey="p" onclick="Print();" type="button" value="Print" name="btnPrint"></TD>
						</TR>
					</TABLE>
				</td>
			</TR>
			<tr>
				<td vAlign="center" align="middle" width="100%" height="100%">
					<OBJECT id="vsflexOrderSearch" codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="100%" width="100%" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949" VIEWASTEXT>
						<PARAM NAME="_cx" VALUE="19103">
						<PARAM NAME="_cy" VALUE="12409">
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
						<PARAM NAME="Ellipsis" VALUE="1">
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
			</tr>
		</TABLE>
	</BODY>
</HTML>
