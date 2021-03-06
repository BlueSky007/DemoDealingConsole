<%@ Page language="c#" Inherits="iExchange.DealingConsole.OrderTask" Codebehind="OrderTask.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
	<head>
		<TITLE>Order Task</TITLE>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<SCRIPT language="jscript" src="JavaScript/flexConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/colorConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/EnumDefine.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/GlobalFun.js"></SCRIPT>
		<!--<SCRIPT language="jscript" src="JavaScript/clsPrice.js"></SCRIPT>-->
		<SCRIPT language="jscript" src="JavaScript/OrderTask.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/MooMocProcess.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/FormOrderTask.js"></SCRIPT>
		<SCRIPT event="AfterRowColChange(oldRow, oldCol, newRow, newCol)" for="vsflexOrderTask">
			OnOrderTaskAfterRowColChange(oldRow, oldCol, newRow, newCol);
		</SCRIPT>
		<SCRIPT event="onactivate" for="vsflexOrderTask">
            VsflexOrderTask_OnActivate();            
		</SCRIPT>
		<SCRIPT event="ondeactivate" for="vsflexOrderTask">
            VsflexOrderTask_OnDeactivate();            
		</SCRIPT>
		<SCRIPT event="onmousemove" for="vsflexOrderTask">
            VsflexOrderTask_OnMouseMove(); 
		</SCRIPT>
<%--        <SCRIPT event="onmouseover" for="vsflexOrderTask">
            VsflexOrderTask_OnMouseOver(); 
		</SCRIPT>--%>
        <SCRIPT language="javascript" event="Click" for="vsflexOrderTask">
			VsflexOrderTask_OnClick();
        </SCRIPT>
        <SCRIPT event="BeforeMoveColumn(col, position)" for="vsflexOrderTask">
            VsflexOrderTask_BeforeMoveColumn(col,position);
        </SCRIPT>
        <SCRIPT event="AfterUserResize(row, col)" for="vsflexOrderTask">
            VsflexOrderTask_AfterUserResize(row, col);
        </SCRIPT>
        <SCRIPT event="AfterMoveColumn(col, position) " for="vsflexOrderTask">
            OnOrderTaskGridAfterMoveColumn(col, position);    
        </SCRIPT>
	</head>
	<body onload="OrderTaskPageOnLoad();" STYLE="MARGIN: 0px; OVERFLOW: show" bgColor="#c6c3c6" tabindex="-1" onkeydown="parent.quotationFrm.OnGridKeyUp(event)">
		<div>
            <select id="_InstrumentSelect" name="_InstrumentSelect" onchange="InstrumentSelect_Onchange();" style="WIDTH: 100px; POSITION: relative;" ></select>
            <input type="button" id="_OpenPriceButton" name="_OpenPriceButton" onclick="OpenPriceButton_OnClick();" value="<%=GetLanguage("OpenPriceButton")%>" />
			<OBJECT id="vsflexOrderTask" style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; WIDTH: 100%; PADDING-TOP: 0px; HEIGHT: 90%; BACKGROUND-COLOR: white" codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949" name="vsflexConfirmationTask" VIEWASTEXT>
				<PARAM NAME="_cx" VALUE="19341">
				<PARAM NAME="_cy" VALUE="10874">
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
		</div>
		<DIV id="oDialog1" style="DISPLAY: none">
			<div id="div1" style="BACKGROUND: #cccccc; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%">
				<button id="btnDetail" onclick="parent.OnOrderDetail(parent.vsflexOrderTask.Row)" tabIndex="-1" type="button">
					Detail</button>
			</div>
		</DIV>
		<DIV id="oDialog2" style="DISPLAY: none">
			<div id="Div2" style="BACKGROUND: #cccccc; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%">
				<button id="btnAccept" onclick="parent.OnOrderAccept(parent.vsflexOrderTask.Row)" tabIndex="-1" type="button">Accept</button> 
				<button id="btnReject" onclick="parent.OnOrderReject(parent.vsflexOrderTask.Row)" tabIndex="-1" type="button">Reject</button> 						
			</div>
		</DIV>		
		<div id="oDialogForAcceptPlace" style="display: none">
			<div id="Div6" style="background: #cccccc; left: 0px; width: 100%; position: absolute; top: 0px; height: 100%">
				<button style="background-color:Blue" id="btnAcceptPlace" onclick="parent.OnOrderAcceptPlace(parent.vsflexOrderTask.Row)" tabindex="-1" type="button">
					Accept</button>
				<button style="background-color:Blue" id="btnRejectPlace" onclick="parent.OnOrderRejectPlace(parent.vsflexOrderTask.Row)" tabindex="-1" type="button">
					Reject</button>
			</div>
		</div>
		<div id="oDialogForAcceptCancel" style="display: none">
			<div id="Div7" style="background: #cccccc; left: 0px; width: 100%; position: absolute; top: 0px; height: 100%">
				<button style="background-color:Red" id="btnAcceptCancel" onclick="parent.OnOrderAcceptCancel(parent.vsflexOrderTask.Row)" tabindex="-1" type="button">
					Accept</button>
				<button style="background-color:Red" id="btnRejectCancel" onclick="parent.OnOrderRejectCancel(parent.vsflexOrderTask.Row)" tabindex="-1" type="button">
					Reject</button>
			</div>
		</div>
		<DIV id="oDialog3" style="DISPLAY: none">
			<div id="Div3" style="BACKGROUND: #cccccc; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%">
				<button id="btnUpdate" onclick="parent.OnOrderUpdate(parent.vsflexOrderTask.Row)" tabIndex="-1" type="button">
					uPdate</button> <button id="btnModify" onclick="parent.OnOrderModify(parent.vsflexOrderTask.Row)" tabIndex="-1" type="button">
					modiFy</button> <button id="btnWait" onclick="parent.OnOrderWait(parent.vsflexOrderTask.Row)" tabIndex="-1" type="button">
					waIt</button> <button id="btnExecute" onclick="parent.OnOrderExecute(parent.vsflexOrderTask.Row)" tabIndex="-1" type="button">
					Execute</button>
			</div>
		</DIV>
		<DIV id="oDialog4" style="DISPLAY: none">
			<div id="div4" style="BACKGROUND: #cccccc; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%">
				<button id="btnCancel" onclick="parent.OnOrderCancel(parent.vsflexOrderTask.Row)" tabIndex="-1" type="button">
					Cancel</button>
			</div>
		</DIV>
	</body>
</html>
