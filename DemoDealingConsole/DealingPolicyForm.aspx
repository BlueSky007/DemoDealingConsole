<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DealingPolicyForm.aspx.cs"
    Inherits="iExchange.DealingConsole.DealingPolicyForm" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title><%=GetLanguage("DealingPolicyPage")%></title>
    <style>
        #_SaveButton
        {
            width: 92px;
        }
        #Button1
        {
            width: 91px;
        }
        #_DealingPolicySelect
        {
            width: 128px;
        }
        #_InstrumentSelect
        {
            width: 126px;
        }
        #_QueryButton
        {
            width: 43px;
        }
        #_QueryButton0
        {
            width: 86px;
        }
        .style1
        {
            width: 93%;
            height: 430px;
        }
        .style5
        {
            height: 287px;
        }
        .style6
        {
            height: 7px;
        }
        #_Query2Button
        {
            width: 43px;
        }
        .style8
        {
            width: 224px;
        }
        .style10
        {
            width: 224px;
            height: 11px;
        }
        .style12
        {
            height: 11px;
        }
        .style15
        {
            width: 60px;
        }
        .style16
        {
            width: 60px;
            height: 11px;
        }
        #_MaxDQLotAddButton
        {
            width: 65px;
        }
        #_MaxOtherLotAddButton
        {
            width: 64px;
        }
        .style17
        {
            width: 48px;
        }
        .style18
        {
            height: 11px;
            width: 48px;
        }
        .style19
        {
            width: 58px;
        }
        .style20
        {
            width: 58px;
            height: 11px;
        }
        #_MaxDQLotAddButton0
        {
            width: 65px;
        }
        #_MaxDQLotAddButton1
        {
            width: 64px;
        }
        #_MaxDQLotAddButton2
        {
            width: 64px;
        }
        #_MaxOtherLotAddButton0
        {
            width: 64px;
        }
        #_MaxOtherLotAddButton1
        {
            width: 63px;
        }
        #_MaxOtherLotAddButton2
        {
            width: 64px;
        }
        .style23
        {
            width: 88px;
        }
        .style24
        {
            width: 88px;
            height: 11px;
        }
        .style27
        {
            width: 53px;
        }
        .style28
        {
            width: 13px;
            height: 11px;
        }
        .style29
        {
            width: 13px;
        }
        .style30
        {
            width: 7px;
        }
        .style31
        {
            height: 11px;
            width: 7px;
        }
        .style32
        {
            width: 182px;
        }
        .style33
        {
            width: 182px;
            height: 11px;
        }
    </style>
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/colorConst.js"></script>
    <script language="jscript" src="JavaScript/EnumDefine.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/clsDealingPolicyDetail.js"></script>
    <script language="jscript" src="JavaScript/DealingPolicyForm.js"></script>
    <script event="AfterEdit(row, col, cancel)" for="_DealingPolicyDetailGrid">
			OnDealingPolicyDetailGridAfterEdit(row, col, cancel);
    </script>
    <script event="ValidateEdit(row, col, cancel)" for="_DealingPolicyDetailGrid">
			OnDealingPolicyDetailGridValidateEdit(row, col, cancel);
    </script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="_DealingPolicyDetailGrid">
			OnDealingPolicyDetailGridBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);
    </script>
</head>
<body style="height: 100%; width: 97%;" bgcolor="buttonface" onload="OnLoad();" onunload="Onunload();">
    <table id="Table1" cellspacing="0" cellpadding="0" align="center" bgcolor="buttonface"
        border="0" style="width: 100%; height: 20%; font-family: Arial; font-size: 12px;margin-left:3px;">
        <tr>
            <td>
                <input type="radio" id="_DealingPolicyRadio" value="V1" name="_Category" checked="checked"
                    onclick="ChangeBy();" /><%=GetLanguage("ByDealingPolicy")%>
            </td>
            <td colspan="2">
                <select id="_DealingPolicySelect" name="_DealingPolicySelect" style="text-align: right;
                    width: 162px;">
                    <%=GetDealingPolicyOptions()%>
                </select>
            </td>
            <td colspan="6" align="left">
                <input type="button" id="_QueryButton" value="<%=GetLanguage("Query") %>" onclick="QueryButton_OnClick();" style="width: 70px;"/>
            </td>
        </tr>
        <tr>
            <td>
                <input type="radio" id="_InstrumentRadio" value="V1" name="_Category" onclick="ChangeBy();" />
                <%=GetLanguage("ByInstrument")%>
            </td>
            <td colspan="2">
                <select id="_InstrumentSelect" name="_InstrumentSelect" style="text-align: right;
                    width: 162px;">
                </select>
            </td>
            <td colspan="6" align="left">
                <input type="button" id="_Query2Button" value="<%=GetLanguage("Query") %>" onclick="QueryButton_OnClick();" style="width: 70px;"/>
            </td>
        </tr>
        <%--</table>
    <table class="style1" style="font-size: smaller; border=1">--%>
        <tr>
            <td class="style6" colspan="9" style="font-weight: bold">
               <%=GetLanguage("BatchProcess")%>:
            </td>
        </tr>
        <tr>
            <td class="style32">
                <%=GetLanguage("MaxDQLot")%>:
            </td>
            <td class="style23">
                <input type="text" id="_MaxDQLotText" name="_MaxDQLotText" value="100" style="text-align: right;
                    width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style15">
                <input type="button" id="_MaxDQLotAddButton" name="_MaxDQLotAddButton" style="width: 70px;"
                    onclick="MaxDQLotAdd();" value="<%=GetLanguage("Add")%>" />
            </td>
            <td class="style29">
                <input type="button" id="_MaxDQLotReplaceButton" name="_MaxDQLotReplaceButton" onclick="MaxDQLotReplace();"
                    value="<%=GetLanguage("Replace")%>" />
            </td>
            <td class="style30">
                &nbsp;
            </td>
            <td class="style8">
                <%=GetLanguage("MaxOtherLot")%>:
            </td>
            <td class="style19">
                <input type="text" id="_MaxOtherLotText" name="_MaxOtherLotText" value="100" style="text-align: right;
                    width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style17">
                <input type="button" id="_MaxOtherLotAddButton" name="_MaxOtherLotAddButton" style="width: 70px"
                    onclick="MaxOtherLotAdd();" value="<%=GetLanguage("Add")%>" />
            </td>
            <td class="style27">
                <input type="button" id="_MaxOtherLotReplaceButton" name="_MaxOtherLotReplaceButton"
                    onclick="MaxOtherLotReplace();" value="<%=GetLanguage("Replace")%>" />
            </td>
        </tr>
        <tr>
            <td class="style32">
                <%=GetLanguage("DQQuoteMinLot")%>:
            </td>
            <td class="style23">
                <input type="text" id="_DQQuoteMinLotText" name="_DQQuoteMinLotText" value="1" style="text-align: right;
                    width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style15">
                <input type="button" id="_DQQuoteMinLotAddButton" name="_DQQuoteMinLotAddButton" style="width: 70px"
                    onclick="DQQuoteMinLotAdd();" value="<%=GetLanguage("Add")%>" />
            </td>
            <td class="style29">
                <input type="button" id="_DQQuoteMinLotReplaceButton" name="_DQQuoteMinLotReplaceButton"
                    onclick="DQQuoteMinLotReplace();" value="<%=GetLanguage("Replace")%>" />
            </td>
            <td class="style30">
                &nbsp;
            </td>
            <td class="style8">
                <%=GetLanguage("AutoDQMaxLot")%>:
            </td>
            <td class="style19">
                <input type="text" id="_AutoDQMaxLotText" name="_AutoDQMaxLotText" value="1" style="text-align: right;
                    width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style17">
                <input type="button" id="_AutoDQMaxLotAddButton" name="_AutoDQMaxLotAddButton" style="width: 70px" onclick="AutoDQMaxLotAdd();"
                    value="<%=GetLanguage("Add")%>" />
            </td>
            <td>
                <input type="button" id="_AutoDQMaxLotReplaceButton" name="_AutoDQMaxLotReplaceButton"
                    onclick="AutoDQMaxLotReplace();" value="<%=GetLanguage("Replace")%>" />
            </td>
        </tr>
        <tr>
            <td class="style32">
                <%=GetLanguage("AutoLmtMktMaxLot")%>:
            </td>
            <td class="style23">
                <input type="text" id="_AutoLmtMktMaxLotText" name="_AutoLmtMktMaxLotText" value="1"
                    style="text-align: right; width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style15">
                <input type="button" id="_AutoLmtMktMaxLotAddButton" name="_AutoLmtMktMaxLotAddButton" style="width: 70px"
                    onclick="AutoLmtMktMaxLotAdd();" value="<%=GetLanguage("Add")%>" />
            </td>
            <td class="style29">
                <input type="button" id="_AutoLmtMktMaxLotReplaceButton" name="_AutoLmtMktMaxLotReplaceButton"
                    onclick="AutoLmtMktMaxLotReplace();" value="<%=GetLanguage("Replace")%>" />
            </td>
            <td class="style30">
                &nbsp;
            </td>
            <td class="style8">
                <%=GetLanguage("AcceptDQVariation")%>:
            </td>
            <td class="style19">
                <input type="text" id="_AcceptDQVariationText" name="_AcceptDQVariationText" value="50"
                    style="text-align: right; width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style17">
                <input type="button" id="_AcceptDQVariationAddButton" name="_AcceptDQVariationAddButton" style="width: 70px"
                    onclick="AcceptDQVariationAdd();" value="<%=GetLanguage("Add")%>" />
            </td>
            <td>
                <input type="button" id="_AcceptDQVariationReplaceButton" name="_AcceptDQVariationReplaceButton"
                    onclick="AcceptDQVariationReplace();" value="<%=GetLanguage("Replace")%>" />
            </td>
        </tr>
        <tr>
            <td class="style32">
                <%=GetLanguage("AcceptLmtVariation")%>:
            </td>
            <td class="style23">
                <input type="text" id="_AcceptLmtVariationText" name="_AcceptLmtVariationText" value="10"
                    style="text-align: right; width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style15">
                <input type="button" id="_AcceptLmtVariationAddButton" name="_AcceptLmtVariationAddButton" style="width: 70px"
                    onclick="AcceptLmtVariationAdd();" value="<%=GetLanguage("Add")%>" />
            </td>
            <td class="style29">
                <input type="button" id="_AcceptLmtVariationReplaceButton" name="_AcceptLmtVariationReplaceButton"
                    onclick="AcceptLmtVariationReplace();" value="<%=GetLanguage("Replace")%>" />
            </td>
            <td class="style30">
                &nbsp;
            </td>
            <td class="style8">
                <%=GetLanguage("CancelLmtVariation")%>:
            </td>
            <td class="style19">
                <input type="text" id="_CancelLmtVariationText" name="_CancelLmtVariationText" value="10"
                    style="text-align: right; width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style17">
                <input type="button" id="_CancelLmtVariationAddButton" name="_CancelLmtVariationAddButton" style="width: 70px"
                    onclick="CancelLmtVariationAdd();" value="<%=GetLanguage("Add")%>" />
            </td>
            <td>
                <input type="button" id="_CancelLmtVariationReplaceButton" name="_CancelLmtVariationReplaceButton"
                    onclick="CancelLmtVariationReplace();" value="<%=GetLanguage("Replace")%>" />
            </td>
        </tr>
        <tr>
            <td class="style32">
                <%=GetLanguage("AutoDQDelay")%>:
            </td>
            <td class="style23">
                <input type="text" id="_AutoDQDelayText" name="_AutoDQDelayText" value="1" style="text-align: right;
                    width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style15">
                <input type="button" id="_AutoDQDelayAddButton" name="_AutoDQDelayAddButton" onclick="AutoDQDelayAdd();"
                    value="<%=GetLanguage("Add")%>" style="width: 70px" />
            </td>
            <td class="style29">
                <input type="button" id="_AutoDQDelayReplaceButton" name="_AutoDQDelayReplaceButton" onclick="AutoDQDelayReplace();"
                    value="<%=GetLanguage("Replace")%>" />
            </td>
            <td class="style30">
                &nbsp;
            </td>
            <td class="style8">
                <%=GetLanguage("AllowedNewTradeSides")%>:
            </td>
            <td class="style19">
            <select id="_AllowedNewTradeSidesCmb" name="_AllowedNewTradeSidesCmb" style="text-align: right;width:98px;">
                <option value="0"><%=GetLanguage("AllowedNewTradeSidesCombo1")%></option>
                <option value="1"><%=GetLanguage("AllowedNewTradeSidesCombo2")%></option>
                <option value="2"><%=GetLanguage("AllowedNewTradeSidesCombo3")%></option>
                <option value="3" selected="selected" ><%=GetLanguage("AllowedNewTradeSidesCombo4")%></option>
            </select>
            </td>
            <td>
                &nbsp;
            </td>
            <td class="style17">
                <input type="button" id="_AllowedNewTradeSidesReplaceButton" name="_AllowedNewTradeSidesReplaceButton" onclick="AllowedNewTradeSidesReplace();"
                    value="<%=GetLanguage("Replace")%>" />
            </td>
        </tr>

        <tr>
            <td class="style32">
                <%=GetLanguage("AutoAcceptMaxLot")%>:
            </td>
            <td class="style23">
                <input type="text" id="_AutoAcceptMaxLotText" name="_AutoAcceptMaxLotText" value="1" style="text-align: right;
                    width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style15">
                <input type="button" id="_AutoAcceptMaxLotAddButton" name="_AutoAcceptMaxLotAddButton" onclick="AutoAcceptMaxLotAdd();"
                        value="<%=GetLanguage("Add")%>" style="width: 70px" />
                
            </td>
            <td class="style29">
                <input type="button" id="_AutoAcceptMaxLotReplaceButton" name="_AutoAcceptMaxLotReplaceButton" onclick="AutoAcceptMaxLotReplace();"
                    value="<%=GetLanguage("Replace")%>" />
            </td>
            <td class="style30">
                &nbsp;
            </td>
            <td class="style8">
                <%=GetLanguage("AutoCancelMaxLot")%>:
            </td>
            <td class="style19">
                <input type="text" id="_AutoCancelMaxLotText" name="_AutoCancelMaxLotText" value="10"
                    style="text-align: right; width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style17">
                <input type="button" id="_AutoCancelMaxLotAddButton" name="_AutoCancelMaxLotAddButton" style="width: 70px"
                    onclick="AutoCancelMaxLotAdd();" value="<%=GetLanguage("Add")%>" />                
            </td>
            <td>
                <input type="button" id="_AutoCancelMaxLotReplaceButton" name="_AutoCancelMaxLotReplaceButton" onclick="AutoCancelMaxLotReplace();"
                    value="<%=GetLanguage("Replace")%>" />
            </td>
        </tr>
        <tr>
            <td class="style32">
                <%=GetLanguage("AcceptCloseLmtVariation")%>:
            </td>
            <td class="style23">
                <input type="text" id="_AcceptCloseLmtVariationText" name="_AcceptCloseLmtVariationText" value="10"
                    style="text-align: right; width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style15">
                <input type="button" id="_AcceptCloseLmtVariationAddButton" name="_AcceptCloseLmtVariationAddButton" style="width: 70px"
                    onclick="AcceptCloseLmtVariationAdd();" value="<%=GetLanguage("Add")%>" />
            </td>
            <td class="style29">
                <input type="button" id="_AcceptCloseLmtVariationReplaceButton" name="_AcceptCloseLmtVariationReplaceButton"
                    onclick="AcceptCloseLmtVariationReplace();" value="<%=GetLanguage("Replace")%>" />
            </td>
            <td class="style30">
                &nbsp;
            </td>
            <td class="style10">
                <%=GetLanguage("HitPriceVariationForSTP")%>:
            </td>
            <td class="style20">
               <input type="text" id="_HitPriceVariationForSTPText" name="_HitPriceVariationForSTPText" value="0" 
                style="text-align: right; width: 89px;" onblur="onBlurEvent();" />
            </td>
            <td class="style18">
                <input type="button" id="_HitPriceVariationForSTPAddButton" name="_HitPriceVariationForSTPAddButton" style="width: 70px"
                    onclick="HitPriceVariationForSTPAdd();" value="<%=GetLanguage("Add")%>" />     
            </td>
            <td class="style12">
               <input type="button" id="_HitPriceVariationForSTPReplaceButton" name="_HitPriceVariationForSTPReplaceButton" onclick="HitPriceVariationForSTPReplace();"
                    value="<%=GetLanguage("Replace")%>" />
            </td>
        </tr>
        <tr>
            <td>
                <input type="button" name="_SaveButton" id="_SaveButton" value="<%=GetLanguage("SaveButton")%>" onclick="DealingPolicyDetail_Save();" />
            </td>
            <td class="style24">
                &nbsp;
            </td>
            <td class="style16">
                &nbsp;
            </td>
            <td class="style28">
                &nbsp;
            </td>
            <td class="style31">
                &nbsp;
            </td>
             <td class="style10">
                &nbsp;
            </td>
            <td class="style20">
                &nbsp;
            </td>
            <td class="style18">
                 &nbsp;   
            </td>
            <td class="style12">
                &nbsp;
            </td>
        </tr>
        <%--<tr>
            <td class="style5" colspan="9">
                
                </td>
        </tr>--%>
    </table>
    <object id="_DealingPolicyDetailGrid" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160"
        style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px; margin: 0px;
        width: 100%; padding-top: 0px; height: 60%; background-color: white" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
        viewastext>
        <param name="_cx" value="3810">
        <param name="_cy" value="7964">
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
        <param name="GridLines" value="5">
        <param name="GridLinesFixed" value="2">
        <param name="GridLineWidth" value="1">
        <param name="Rows" value="0">
        <param name="Cols" value="0">
        <param name="FixedRows" value="0">
        <param name="FixedCols" value="0">
        <param name="RowHeightMin" value="0">
        <param name="RowHeightMax" value="0">
        <param name="ColWidthMin" value="0">
        <param name="ColWidthMax" value="0">
        <param name="ExtendLastCol" value="0">
        <param name="FormatString" value="(Format)&#11;3&#11;600&#9;4&#9;4&#9;&#9;&#9;&#9;11&#9;0&#9;Select&#9;0&#9;&#11;1140&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;0&#9;ItemSubCode&#9;0&#9;&#11;960&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;-1&#9;ItemID&#9;0&#9;&#11;(Text)&#11;Select&#9;ItemSubCode&#9;ItemID&#9;&#11;">
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
        <param name="ExplorerBar" value="7">
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
</body>
</html>
