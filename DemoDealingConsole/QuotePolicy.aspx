<%@ Page Language="c#" Inherits="iExchange.DealingConsole.QuotePolicy" CodeBehind="QuotePolicy.aspx.cs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>QuotePolicy</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 7.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/colorConst.js"></script>
    <script language="jscript" src="JavaScript/EnumDefine.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/Quotation2.js"></script>
    <script language="jscript" src="JavaScript/QuotePolicy.js"></script>
    <script language="jscript" src="JavaScript/clsQuote.js"></script>
    <script language="jscript" src="JavaScript/clsQuotePolicyDetail.js"></script>
    <SCRIPT language="jscript" src="JavaScript/FormQuotePolicy.js"></SCRIPT>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="quotePolicyGrid">
			OnQuotePolicyBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);
    </script>
    <script event="onkeydown" for="quotePolicyGrid">
			FilterKey(event);
            FilterKey2(event);
    </script>
    <script event="ValidateEdit(row, col, cancel)" for="quotePolicyGrid">
			OnQuotePolicyValidateEdit(row, col, cancel);
    </script>
    <script event="AfterEdit(row, col, cancel)" for="quotePolicyGrid">
			OnQuotePolicyAfterEdit(row, col, cancel);
    </script>
    <script event="Click" for="quotePolicyGrid">
			OnQuotePolicyClick();
    </script>
    <SCRIPT event="AfterMoveColumn(col, position) " for="quotePolicyGrid">
        OnQuotePolicyGridAfterMoveColumn(col, position);    
    </SCRIPT>
</head>
<body style="MARGIN: 0px; OVERFLOW: show; height: 100%; width: 100%;" id="oBodyQuotePolicy" onload="QuotePolicyPageOnLoad();" bgcolor="buttonface">
    <table cellspacing="0" cellpadding="0" align="center"border="0" style="width: 100%; height: 100%;">
        <tr>
            <td style="width: 100%; height:80%;" colspan="8" nowrap>
                <object style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; WIDTH: 100%; PADDING-TOP: 0px; HEIGHT: 100%; BACKGROUND-COLOR: white" id="quotePolicyGrid" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160"
                    classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949" name="quotePolicyGrid">
                    <param name="_cx" value="12435">
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
                    <param name="Cols" value="10">
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
                    <param name="ShowComboButton" value="-1">
                    <param name="WordWrap" value="0">
                    <param name="TextStyle" value="0">
                    <param name="TextStyleFixed" value="0">
                    <param name="OleDragMode" value="0">
                    <param name="OleDropMode" value="0">
                    <param name="DataMode" value="0">
                    <param name="VirtualData" value="-1">
                    <param name="DataMember" value="">
                    <param name="ComboSearch" value="3">
                    <param name="AutoSizeMouse" value="-1">
                    <param name="FrozenRows" value="0">
                    <param name="FrozenCols" value="0">
                    <param name="AllowUserFreezing" value="0">
                    <param name="BackColorFrozen" value="0">
                    <param name="ForeColorFrozen" value="0">
                    <param name="WallPaperAlignment" value="9">
                </object>
            </td>
        </tr>
        <tr>
            <td style="height: 30px;" nowrap>
                &nbsp;AP:
            </td>
            <td nowrap>
                <input type="button" id="_IncreaseAutoPointsButton" name="_IncreaseAutoPointsButton"
                    value="  +  " onclick="IncreaseAutoPoints();" />
                <input type="button" id="_DecreaseAutoPointsButton" name="_DecreaseAutoPointsButton"
                    value="  -  " onclick="DecreaseAutoPoints();" />

                
            </td>
            <td nowrap style="width:15px;">
                <input id="_AutoPointsAddButton" onclick="AddAutoPoints();" accesskey="a" style="display:none;"
                    type="button" value="Add" />
            </td>
            <td nowrap>
                <input id="_AutoPointsText" onblur="onBlurEvent();" maxlength="19" style="width: 38px;
                    text-align: right" type="text" value="0" />
                <input id="_AutoPointsReplaceButton" onclick="ReplaceAutoPoints();" accesskey="r"
                    type="button" value="Rep" style="width: 57px" />
            </td>
            <td style="width:40px;">
                &nbsp;
            </td>
            <td nowrap colspan="3" style="width:60%;" align="left">
                <input id="Button6" type="button" value="Undo" name="btnCancel"
                        accesskey="U" onclick="Undo();" style="width: 66px">
            </td>
         </tr>
         <tr>
            <td nowrap>
                &nbsp;SP:
            </td>
            <td nowrap>
                <input type="button" id="_IncreaseSpreadButton" name="_IncreaseSpreadButton" value="  +  "
                    onclick="IncreaseSpread();" />
                <input type="button" id="_DecreaseSpreadButton" name="_DecreaseSpreadButton" value="  -  "
                    onclick="DecreaseSpread();" />
            </td>
            <td nowrap style="width:15px;">
                <input id="_SpreadAddButton" onclick="AddSpread();" accesskey="d" style="display:none;"
                    type="button" value="Add" />
            </td>
            <td nowrap>
                <input id="_SpreadText" onblur="onBlurEvent();" maxlength="19" style="width: 38px;
                    height: 22px; text-align: right" type="text" value="0" />
                <input id="_SpreadReplaceButton" onclick="ReplaceSpread();" accesskey="l" type="button"
                    value="Rep" style="width: 57px" />
            </td>
            <td style="width:40px;">
                &nbsp;
            </td>
            <td nowrap colspan="3" style="width:60%;" align="left">
                <input id="Button5" type="button" value="Ok" name="btnOk" accesskey="O" onclick="OnOk()"
                    style="width: 66px">
            </td>
        </tr>
    </table>
    <input type="hidden" id="_NeedSendQuotationChangeAPSPHidden" name="_NeedSendQuotationChangeAPSPHidden" value="<%=NeedSendQuotationChangeAPSP()%>"
</body>
</html>
