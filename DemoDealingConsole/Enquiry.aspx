<%@ Page language="c#" Inherits="iExchange.DealingConsole.Enquiry" Codebehind="Enquiry.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>Enquiry</TITLE>
		<meta content="Microsoft Visual Studio 7.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<SCRIPT language="jscript" src="JavaScript/flexConst.js"></SCRIPT>
        <SCRIPT language="jscript" src="JavaScript/colorConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/EnumDefine.js"></SCRIPT>
        <SCRIPT language="jscript" src="JavaScript/Enquiry.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/GlobalFun.js"></SCRIPT>
		<SCRIPT event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="vsflexEnquiry">
			OnEnquiryBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);			
		</SCRIPT>
	    <style type="text/css">
            #Table1
            {
                height: 365px;
                width: 578px;
            }
            .style1
            {
                height: 21px;
            }
            .style2
            {
                font-size: xx-small;
            }
            .style3
            {
                font-size: x-small;
            }
        </style>
	</HEAD>
	<BODY id="oBodyEnquiry" onload="EnquiryInit()" onbeforeunload="OnEnquiryCancel()" onkeydown="FilterKey(event);">		
		<TABLE id="Table1" cellSpacing="2" cellPadding="2" align="center" 
            bgColor="buttonface" border="0">
			<TR>
				<TD noWrap align="middle" width="150" colSpan="1" height="26" rowSpan="1">
					<DIV id="LabelItem" style="DISPLAY: inline; FONT-WEIGHT: bold; WIDTH: 70px; HEIGHT: 15px"><%=GetLanguage("Instrument") %></DIV>
				</TD>
				<TD vAlign="baseline" align="right" width="100%" rowSpan="13">
					<OBJECT id="vsflexEnquiry" codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949">
						<PARAM NAME="_cx" VALUE="15050">
						<PARAM NAME="_cy" VALUE="10122">
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
			<TR>
				<TD noWrap align="middle" width="150" height="2">
					<DIV id="LabelSource" style="DISPLAY: inline; FONT-WEIGHT: bold; WIDTH: 70px; COLOR: red; HEIGHT: 15px">source</DIV>
				</TD>
				<TD height="2"></TD>
			</TR>
			<TR>
				<TD noWrap width="150" colSpan="1" height="16" rowSpan="1">
                    <table style="width:100%;">
                        <tr>
                            <td align="left" class="style2"><span class="style3"><%=GetLanguage("Adjust")%></span>:</td>
                            <td noWrap align="right" style="width:100%">
                                <INPUT id="TextAdjust" type="text" onchange="OnEnquiryAdjust()" size="6" name="Text2">
                                <input id="_IncreaseNumeratorUnitPointText" type="button" 
                                    name="_IncreaseNumeratorUnitPointText" 
                                    onclick="IncreaseNumeratorUnitPointText_OnClick()" size="1" value="+" 
                                    accesskey="=" />
                                <input id="_DecreaseNumeratorUnitPointText" type="button" 
                                    name="_DecreaseNumeratorUnitPointText" 
                                    onclick="DecreaseNumeratorUnitPointText_OnClick()" size="1" value="-" 
                                    accesskey="-" />
                            </td>
                        </tr>
                    </table>
                </TD>
				<TD height="16"></TD>
			</TR>
			<TR>
				<TD noWrap width="150" colSpan="1" height="16" rowSpan="1" align="left">				
				    <table style="width:100%;">
                        <tr>
                            <td align="left" class="style3"><%=GetLanguage("Lot")%>:</td>
                            <td align="right"><INPUT id="LotText" type="text" onchange="OnLotAdjust()" size="12" name="Text3"></td>
                        </tr>
                    </table>
                </TD>
				<TD height="16"></TD>
			</TR>
			<TR>
				<TD vAlign="baseline" noWrap align="left" width="150" colSpan="1" height="5" rowSpan="1">
				    <INPUT id="RadioAbove" type="radio" value="Radio1" name="RadioGroup">
					<span class="style3"><%=GetLanguage("Above")%>
					</span>
					<INPUT id="RadioBelow" type="radio" CHECKED value="Radio1" name="RadioGroup">
					<span class="style3"><%=GetLanguage("Below")%></span>
				</TD>
				<TD height="5"></TD>
			</TR>
			<TR>
				<TD width="150"><INPUT id="TextLot" type="text" size="12" name="Text1"><%=GetLanguage("Units")%></TD>
				<TD></TD>
			</TR>
			<TR>
				<TD align="middle" width="150" colSpan="1" height="12" rowSpan="1"><INPUT id="btnUpdate" style="WIDTH: 92px; HEIGHT: 24px" onclick="OnEnquiryUpdate()" accesskey="U" type="button" value="<%=GetLanguage("Update") %>" name="Button1"></TD>
				<TD height="12"></TD>
			</TR>
			<TR>
				<TD align="middle" width="150"><INPUT id="btnSelectAll" style="WIDTH: 92px; HEIGHT: 24px" onclick="OnEnquirySelectAll()" accesskey="A" type="button" value="<%=GetLanguage("SelectAll") %>" name="Button1"></TD>
				<TD></TD>
			</TR>
			<TR>
				<TD align="middle" width="150" colSpan="1" rowSpan="1"><INPUT id="btnSimiliar" style="WIDTH: 92px; HEIGHT: 24px" onclick="OnEnquirySimiliar()" accesskey="M" type="button" value="<%=GetLanguage("siMiliar") %>" name="Button1"></TD>
				<TD></TD>
			</TR>
			<TR>
				<TD align="middle" width="150" colSpan="1" rowSpan="1"><INPUT id="btnQuantity" style="WIDTH: 92px; HEIGHT: 24px" onclick="OnEnquiryQuantity()" accesskey="Q" type="button" value="<%=GetLanguage("Quantity") %>" name="Button1"></TD>
				<TD></TD>
			</TR>
			<TR>
				<TD align="middle" width="150" colSpan="1" rowSpan="1"><INPUT id="btnClearAll" style="WIDTH: 92px; HEIGHT: 24px" accessKey="C" onclick="OnEnquiryClearAll()" type="button" value="<%=GetLanguage("ClearAll") %>" name="Button1"></TD>
				<TD></TD>
			</TR>
			<TR>
				<TD align="middle" width="150" class="style1"><INPUT id="btnSend" style="WIDTH: 92px; HEIGHT: 24px" onclick="OnEnquirySend()" accessKey="S" type= "submit" value="<%=GetLanguage("Send") %>" name="Button1"></TD>
				<TD class="style1"></TD>
			</TR>
			<TR>
				<TD align="middle" width="150" colSpan="1" rowSpan="1"><INPUT id="btnCancel" style="WIDTH: 92px; HEIGHT: 24px" accessKey="X" onclick="OnEnquiryCancel()" type="button" value="<%=GetLanguage("eXitButton") %>" name="Button1"></TD>
				<TD></TD>
			</TR>
		</TABLE>
	    </form>
	</BODY>
</HTML>
