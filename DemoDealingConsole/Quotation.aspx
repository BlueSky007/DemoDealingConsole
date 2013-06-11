<%@ Page Language="c#" Inherits="iExchange.DealingConsole.Quotation" CodeBehind="Quotation.aspx.cs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html xmlns:sdk>
<head>
    <style>
        sdk\:cacher
        {
            behavior: url(#default#userData);
        }
    </style>
    <title>Quotation</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 7.0" />
    <meta name="CODE_LANGUAGE" content="C#" />
    <meta name="vs_defaultClientScript" content="JavaScript" />
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5" />
      <%
        Response.Write( "<script>\r\n" );
        Response.Write("var ProcessErrorStr = \"");
        Response.Write(GetLanguage("ProcessError"));
        Response.Write("\";");
        Response.Write("var InitDataEmptyStr = \"");
        Response.Write(GetLanguage("InitDataEmpty"));
        Response.Write("\";");
        Response.Write( "</script>\r\n" );
        %>
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/colorConst.js"></script>
    <script language="jscript" src="JavaScript/EnumDefine.js"></script>
    <!--<SCRIPT language="jscript" src="JavaScript/clsPrice.js"></SCRIPT>-->
    <script language="jscript" src="Javascript/Common.js"></script>
    <script language="jscript" src="JavaScript/ObjectPool.js"></script>
    <script language="jscript" src="Javascript/Price.js"></script>
    <!--SCRIPT language="jscript" src="JavaScript/clsQuotationSource.js"></SCRIPT-->
    <script language="jscript" src="JavaScript/clsSourceInstrument.js"></script>
    <script language="jscript" src="Javascript/Quotation.js"></script>
    <script language="jscript" src="JavaScript/SlidingWindow.js"></script>
    <script language="jscript" src="JavaScript/clsEnquiry.js"></script>
    <script language="jscript" src="JavaScript/clsOrderRelation.js"></script>
    <script language="jscript" src="JavaScript/clsOrder.js"></script>
    <script language="jscript" src="JavaScript/clsDQOrder.js"></script>
    <script language="jscript" src="JavaScript/clsLMTOrder.js"></script>
    <script language="jscript" src="JavaScript/clsMKTOrder.js"></script>
    <script language="jscript" src="JavaScript/clsMOOOrder.js"></script>
    <script language="jscript" src="JavaScript/clsMOCOrder.js"></script>
    <script language="jscript" src="JavaScript/Group.js"></script>
    <script language="jscript" src="JavaScript/clsAccount.js"></script>
    <script language="jscript" src="JavaScript/clsCustomer.js"></script>
    <script language="jscript" src="JavaScript/clsEmployee.js"></script>
    <script language="jscript" src="JavaScript/clsTransaction.js"></script>
    <!--<SCRIPT language="jscript" src="JavaScript/clsQuote.js"></SCRIPT>-->
    <script language="jscript" src="JavaScript/clsQuotePolicy.js"></script>
    <script language="jscript" src="JavaScript/clsQuotePolicyDetail.js"></script>
    <script language="jscript" src="JavaScript/clsTradePolicy.js"></script>
    <script language="jscript" src="JavaScript/clsTradePolicyDetail.js"></script>
    <script language="jscript" src="JavaScript/clsDealingPolicyDetail.js"></script>
    <script language="jscript" src="JavaScript/clsDealerParameterGroupDetail.js"></script>
    <script language="jscript" src="JavaScript/clsInstrument.js"></script>
    <!--<SCRIPT language="jscript" src="JavaScript/clsScheduler.js"></SCRIPT>-->
    <script language="jscript" src="JavaScript/MD5.js"></script>
    <script language="jscript" src="JavaScript/clsIOProxy.js"></script>
    <script language="jscript" src="JavaScript/clsMaxMin.js"></script>
    <script language="jscript" src="JavaScript/clsTradeTime.js"></script>
    <script language="jscript" src="JavaScript/ColKeyAndLanguage.js"></script>
    <script language="jscript" src="JavaScript/Setting.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/InstrumentSortByCode.js"></script>
    <script language="jscript" src="JavaScript/UpdateHighLowBatchProcessInfo.js"></script>
    <script language="jscript" src="JavaScript/DealingConsole.js"></script>
    <script language="jscript" src="JavaScript/OrderTask.js"></script>
    <script language="jscript" src="JavaScript/QuotationTask.js"></script>
    <script language="jscript" src="JavaScript/Quotation2.js"></script>
    <%--<script language="jscript" src="JavaScript/History.js"></script>--%>
    <%--<script language="jscript" src="JavaScript/Property.js"></script>--%>
    <script language="jscript" src="JavaScript/ExecuteOrders.js"></script>
    <script language="jscript" src="JavaScript/MooMocProcess.js"></script>
    <script language="jscript" src="JavaScript/TradeDay.js"></script>
    <script language="jscript" src="JavaScript/CookieManagement.js"></script>
    <script language="jscript" src="JavaScript/FormQuotation.js"></script>
    <script event="DblClick" for="vsflexQuotation">
            VsflexQuotation_OnDblClick();			
    </script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="vsflexQuotation">
			OnQuotationBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);
    </script>
    <script event="StartEdit(row, col, cancel)" for="vsflexQuotation">
			OnQuotationStartEdit(row, col, cancel);
    </script>
    <script event="KeyPressEdit(row, col, keyAscii)" for="vsflexQuotation">
			OnQuotationKeyPressEdit(row, col, keyAscii);
    </script>
    <script event="AfterEdit(row, col, cancel)" for="vsflexQuotation">
			OnQuotationAfterEdit(row, col, cancel);
    </script>
    <script event="ValidateEdit(row, col, cancel)" for="vsflexQuotation">
			OnQuotationValidateEdit(row, col, cancel);
    </script>
    <script event="onkeydown" for="vsflexQuotation">
			FilterKey(event);
            VsflexQuotation_FilterKey2(event);
    </script>
    <script event="Click" for="vsflexQuotation">
			VsflexQuotation_OnClick();
    </script>
    <SCRIPT event="AfterMoveColumn(col, position) " for="vsflexQuotation">
        OnQuotationGridAfterMoveColumn(col, position);    
    </SCRIPT>
</head>
<body style="margin: 0px; overflow: show" tabindex="-1" onload="quotationPageOnLoad('<%=GetLoggedInfo()%>'); CheckCacher('<%=GetSystemTimeString()%>');"
    onbeforeunload="SystemLogout();" onkeydown="parent.quotationFrm.OnGridKeyUp(event)">
    <sdk:cacher id="cachetag"></sdk:cacher>
    <object id="vsflexQuotation" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;
        margin: 0px; width: 100%; padding-top: 0px; height: 100%; background-color: white"
        codebase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
        name="vsflexQuotation">
        <param name="_cx" value="18759">
        <param name="_cy" value="9684">
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
        <param name="Rows" value="1">
        <param name="Cols" value="1">
        <param name="FixedRows" value="1">
        <param name="FixedCols" value="1">
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
    <div id="Service" style="behavior: url(behaviors/webservice.htc)">
    </div>
    <!--OBJECT id="WebService" codeBase="./Cab/WebService.CAB" classid="clsid:71D67847-AD9F-4D54-99DD-B77ADFC60964" VIEWASTEXT>
		</OBJECT-->
    <bgsound id="Sound" src="" loop="1">
<OBJECT id="iGuid" codeBase="./Cab/WebTools.CAB" 
classid="clsid:13B340F2-4172-49DD-A9DA-F4B579E6FB02">
	</OBJECT>
	
<OBJECT id="iDataSet" codeBase="./CAB/Data.CAB" 
classid="clsid:450006A1-4FFB-48DC-8C2C-FD8C86BF3A00">
	</OBJECT>
	
<OBJECT id="vsflexOrderPrint" style="DISPLAY: none" 
codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="100%" width="100%" 
classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949">
	<PARAM NAME="_cx" VALUE="18759">
	<PARAM NAME="_cy" VALUE="9684">
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
    <input type="hidden" id="_NeedSendQuotationChangeAPSPHidden" name="_NeedSendQuotationChangeAPSPHidden" value="<%=NeedSendQuotationChangeAPSP()%>"
</body>
</html>
