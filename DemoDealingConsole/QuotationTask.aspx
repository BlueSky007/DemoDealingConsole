<%@ Page language="c#" Inherits="iExchange.DealingConsole.QuotationTask" Codebehind="QuotationTask.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
	<head>
		<TITLE>Quotation Task</TITLE>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<SCRIPT language="jscript" src="JavaScript/flexConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/colorConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/EnumDefine.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/GlobalFun.js"></SCRIPT>
		<!--<SCRIPT language="jscript" src="JavaScript/clsPrice.js"></SCRIPT>-->
		<SCRIPT language="jscript" src="JavaScript/QuotationTask.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/FormQuotationTask.js"></SCRIPT>
		<SCRIPT event="AfterRowColChange(oldRow, oldCol, newRow, newCol)" for="vsflexQuotationTask">
			OnQuoteTaskAfterRowColChange(oldRow, oldCol, newRow, newCol);
		</SCRIPT>
		<SCRIPT event="onactivate" for="vsflexQuotationTask">
            VsflexQuotationTask_OnActivate();			
		</SCRIPT>
		<SCRIPT event="onblur" for="vsflexQuotationTask">
            VsflexQuotationTask_OnBlur();			
		</SCRIPT>
		<SCRIPT event="ondeactivate" for="vsflexQuotationTask">
            VsflexQuotationTask_OnDeactivate();            
		</SCRIPT>
		<SCRIPT event="onmousemove" for="vsflexQuotationTask">
            VsflexQuotationTask_OnMouseMove();
		</SCRIPT>
        <SCRIPT event="Click" for="vsflexQuotationTask">
            VsflexQuotationTask_OnClick();
		</SCRIPT>
        <SCRIPT event="BeforeMoveColumn(col, position)" for="vsflexQuotationTask">
            VsflexQuotationTask_BeforeMoveColumn(col,position);
        </SCRIPT>
        <SCRIPT event="AfterUserResize(row, col)" for="vsflexQuotationTask">
            VsflexQuotationTask_AfterUserResize(row, col);
        </SCRIPT>
        <SCRIPT event="AfterMoveColumn(col, position) " for="vsflexQuotationTask">
            OnQuotationTaskGridAfterMoveColumn(col, position);    
        </SCRIPT>
	</head>
	<body onload="QuotationTaskPageOnload();" id="oBody" style="MARGIN: 0px; OVERFLOW: show" tabindex="-1" onkeydown="parent.quotationFrm.OnGridKeyUp(event)" onunload="OnUnload();">
		<div>
			<OBJECT id="vsflexQuotationTask" style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; WIDTH: 100%; PADDING-TOP: 0px; HEIGHT: 100%; BACKGROUND-COLOR: white" codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949" VIEWASTEXT>
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
		</div>
		<%--<DIV id="oDialog1" style="DISPLAY: none">
			<div id="div1" style="BACKGROUND: #cccccc; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%">
				<button id="btnSwitch" onclick="parent.OnSwitch(parent.vsflexQuotationTask.Row)" tabIndex="-1" type="button">
					Switch To Manual Way</button> <button id="btnCancel" onclick="parent.OnIgnore(parent.vsflexQuotationTask.Row)" tabIndex="-1" type="button">
					iGnore</button>
			</div>
		</DIV>--%>
		<DIV id="oDialog2" style="DISPLAY: none">
			<div id="div2" style="BACKGROUND: #cccccc; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%">
				<button id="btnAccept" onclick="parent.OnAccept(parent.vsflexQuotationTask.Row)" tabIndex="-1" type="button">
					accept(Y)</button> <button id="btnDiscard" onclick="parent.OnDiscard(parent.vsflexQuotationTask.Row)" tabIndex="-1" type="button">
					discard(N)</button>
			</div>
		</DIV>
		<DIV id="oDialog3" style="DISPLAY: none">
			<div id="div3" style="BACKGROUND: #cccccc; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%">
				<BUTTON id="btnAbandon" onclick="parent.OnAbandon(parent.vsflexQuotationTask.Row)" tabIndex="-1" type="button">
					aBandon</BUTTON> <button id="btnUpdate" onclick="parent.OnUpdate(parent.vsflexQuotationTask.Row)" tabIndex="-1" type="button">
					Update</button> <button id="btnModify" onclick="parent.OnModify(parent.vsflexQuotationTask.Row)" tabIndex="-1" type="button">
					Modify</button> <button id="btnSend" onclick="parent.OnSend(parent.vsflexQuotationTask.Row)" tabIndex="-1" type="button">
					Send</button>
			</div>
		</DIV>
		<DIV id="oDialog4" style="DISPLAY: none">
			<div id="div4" style="BACKGROUND: #cccccc; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%">
				<button id="btnModify2" onclick="parent.OnModify2(parent.vsflexQuotationTask.Row)" tabIndex="-1" type="button">
					Modify</button>
			</div>
		</DIV>
	</body>
</html>
