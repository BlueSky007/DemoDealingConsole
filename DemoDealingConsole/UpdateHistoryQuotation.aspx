<%@ Page Language="C#" AutoEventWireup="true" Inherits="UpdateHistoryQuotation" CodeBehind="UpdateHistoryQuotation.aspx.cs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html xmlns:mpc>
<head runat="server">
    <title>Modify History Quotation</title>
    <meta content="Microsoft Visual Studio 7.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <style>
        @media All
        {
            mpc\:container
            {
                behavior: url(behaviors/mpc.htc);
            }
            mpc\:page
            {
                behavior: url(behaviors/mpc.htc);
            }
        }
    </style>
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="javascript" src="JavaScript/colorConst.js"></script>
    <script language="javascript" src="JavaScript/GlobalFun.js"></script>
    <script language="javascript" src="JavaScript/updateHistoryQuotation.js"></script>
    <script event="BeforeRowColChange(oldRow,oldCol,newRow,newCol)" for="_HighLowHistoryGrid">
			OnHighLowHistoryGridBeforeRowColChange(oldRow, oldCol, newRow, newCol);
    </script>
    <script event="ValidateEdit(row, col, cancel)" for="_HighLowHistoryGrid">
			OnHighLowHistoryQuotationValidateEdit(row, col, cancel);
    </script>
    <script event="BeforeRowColChange(oldRow,oldCol,newRow,newCol)" for="_AskBidHistoryGrid">
			OnAskBidHistoryGridBeforeRowColChange(oldRow, oldCol, newRow, newCol);
    </script>
    <script event="ValidateEdit(row, col, cancel)" for="_AskBidHistoryGrid">
			OnAskBidHistoryQuotationValidateEdit(row, col, cancel);
    </script>
</head>
<body id="oBody" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px;
    padding-top: 2px; margin: 2px; overflow: show; text-align: justify; background-color: ButtonFace"
    tabindex="-1" bgcolor="buttonface" onload="Page_Onload();">
    <font face="system"></font><font style="background-color: #ffffff" face="system">
    </font><font style="background-color: #ffffff" face="system"></font>
    <br>
    <input type="hidden" id="_CurrentTradeDateTime2" name="_CurrentTradeDateTime2" value="<%=GetCurrentTradeDateTime2() %>" />
    <!--input type="hidden" id="_CurrentTradeDateTime" name="_CurrentTradeDateTime" value="<%=GetCurrentTradeDateTime() %>" /-->
    <mpc:container id="_UpdateQuotationHistoryContainer" style="display: block; width: 408px;
        height: 2752px">
		<mpc:page id="_UpdateAskBidHistoryPage" TABTEXT="Ask/Bid" TABTITLE="Ask/Bid">
		    <DIV id="_UpdateAskBidHistoryDiv" style="WIDTH: 424px; POSITION: relative; HEIGHT: 382px">
		        <table style="width: 100%; height: 90%">
		            <tr>
			            <td style="height: 14px; width: 829px;">
				            <div style="width: 831px; font-size: small;" align="left">
                                Begin Date Time:<input style="width: 107px; height: 21px" id="_BeginDateTimeText" tabindex="3"
						            type="text" onblur="OnSetBeginDateTime(event);" value="<%=GetCurrentTradeDateTime() %>" />
					            &nbsp;&nbsp;Select Instrument:<select id="_InstrumentForAskBidSelect" style="width: 117px">
					            </select><input id="_RefreshInstrumentForAskBidButton" type="button" value="Refresh" onclick="return RefreshInstrumentForAskBidButton_onclick()" style="width: 57px" />&nbsp;
					            Origin:<input id="_OriginPriceForAskBidText" style="width: 63px" type="text" />
					            <input id="_RefreshAskBidButton" type="button" value="Refresh" onclick="return RefreshAskBidButton_onclick()" style="width: 57px" />&nbsp;
					            <input id="_AddAskBidButton" type="button" value="Add" onclick="return AddAskBidButton_onclick()" />
					            <input id="_DeleteButton" style="display:<%if (GetAllowDeleteOverridedQuotation()=="TRUE"){ %>inline<%} else {%>none<%}%>;" type="button" value="Delete" onclick="return DeleteAskBidButton_onclick()" />
					            </div>					            
			            </td>
		            </tr>
		            <tr>
			            <td style="height: 320px; width: 829px;">
				            <div>
					            <object id="_AskBidHistoryGrid" style="padding: 0px; margin: 0px; width: 100%; height: 320px; 
						            background-color: white" codebase="../Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
						            viewastext>
						            <param name="_cx" value="13335">
						            <param name="_cy" value="5080">
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
						            <param name="AutoResize" value="0">
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
				            </div>
			            </td>
		            </tr>
		            <tr>
			            <td style="height: 15px; width: 829px;">
			            <div align="center" style="width: 826px">
                            Restore before:
                            <select id="_RestoreHighLowSelect" name="_RestoreHighLowSelect" onchange="RestoreHighLowSelect_Onchange();">
                            </select>
                            <input type="button" id="_RefreshRestoreHighLowInfoButton" value="Refresh" onclick="RefreshRestoreHighLowInfoButton_Onclick();" />
                            &nbsp;&nbsp;<input type="button" id="_RestoreHighLowButton" value="Restore" onclick="RestoreHighLowButton_Onclick();"/>
				             </div>
			            </td>
		            </tr>
                     <tr>
			            <td style="height: 15px; width: 829px;">
			            <div align="center" style="width: 826px"><input id="_ConfirmAskBidButton"
					            type="button" value="Confirm" onclick="return ConfirmAskBidButton_onclick()" />
				            </div>
			            </td>
		            </tr>
		         </table>
		    </div>
		</mpc:page>
        <mpc:page id="_UpdateHighLowHistoryPage" TABTEXT="High/Low" TABTITLE="High/Low" style="display:none;">
            <DIV id="_UpdateHighLowHistoryDiv" style="WIDTH: 424px; POSITION: relative; HEIGHT: 382px">
	            <table style="width: 100%; height: 98%">
		            <tr>
			            <td style="height: 14px; width: 829px;">
				            <div style="width: 831px; font-size: small;" align="left">
                                TradeDay:<input style="width: 107px; height: 21px" id="_TradeDayText" tabindex="3"
						            type="text" onblur="OnSetTradeDay();" value="<%=GetCurrentTradeDay() %>" />
					            &nbsp;&nbsp;Select Instrument:<select id="_InstrumentForHighLowSelect" style="width: 117px">
					            </select><input id="_RefreshInstrumentForHighLowButton" type="button" value="Refresh" onclick="return RefreshInstrumentForHighLowButton_onclick()" style="width: 57px" />&nbsp;
					            Origin:<input id="_OriginPriceForHighLowText" style="width: 63px" type="text" />
					            <input id="_RefreshHighLowButton" type="button" value="Refresh" onclick="return RefreshHighLowButton_onclick()" style="width: 57px" />&nbsp;
					            <span id="_IsLowSpan">
					                <input id="_IsLowCheckbox" type="checkbox" onclick="RefreshHighLowButton_onclick()" />IsLow &nbsp; 
					            </span>
					            <input id="_AddHighLowButton" type="button" value="Add" onclick="return AddHighLowButton_onclick()" /></div>
			            </td>
		            </tr>
		            <tr>
			            <td style="height: 320px; width: 829px;">
				            <div>
					            <object id="_HighLowHistoryGrid" style="padding: 0px; margin: 0px; width: 100%; height: 320px; 
						            background-color: white" codebase="../Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
						            viewastext>
						            <param name="_cx" value="13335">
						            <param name="_cy" value="5080">
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
						            <param name="AutoResize" value="0">
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
				            </div>
			            </td>
		            </tr>
		            <tr>
			            <td style="height: 15px; width: 829px;">
			            <div align=center style="width: 826px">
				            <input id="_ConfirmHighLowButton"
					            type="button" value="Confirm" onclick="return ConfirmHighLowButton_onclick()" />
				            </div>
			            </td>
		            </tr>
		         </table>
		     </div>
		  </mpc:page>
		</mpc:container>
    <div id="service" style="behavior: url(Behaviors/webservice.htc)" />
</body>
</html>
