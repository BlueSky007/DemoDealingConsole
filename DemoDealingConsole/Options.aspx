<%@ Page Language="c#" Inherits="iExchange.DealingConsole.Options" CodeBehind="Options.aspx.cs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html xmlns:mpc>
<head>
    <title><%=GetLanguage("OptionsPage")%></title>
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
        #cmbCopyFromForGrid
        {
            width: 116px;
        }
    </style>
    <script language="jscript" src="JavaScript/colorConst.js"></script>
    <script language="jscript" src="JavaScript/flexConst.js"></script>
    <script language="jscript" src="JavaScript/EnumDefine.js"></script>
    <script language="jscript" src="JavaScript/GlobalFun.js"></script>
    <script language="jscript" src="JavaScript/Setting.js"></script>
    <script language="jscript" src="JavaScript/clsComboCode.js"></script>
    <script language="jscript" src="JavaScript/option.js"></script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="vsflexItemSource">
			OnSelectBeforeRowColChange(vsflexItemSource, oldRow, oldCol, newRow, newCol, cancel);
    </script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="vsflexItemSelected">
			OnSelectBeforeRowColChange(vsflexItemSelected, oldRow, oldCol, newRow, newCol, cancel);
    </script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="vsflexPropSource">
			OnSelectBeforeRowColChange(vsflexPropSource, oldRow, oldCol, newRow, newCol, cancel);
    </script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="vsflexPropSelected">
			OnSelectBeforeRowColChange(vsflexPropSelected, oldRow, oldCol, newRow, newCol, cancel);
    </script>
    <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="SourceInstrumentGrid">
			OnSourceInstrumentGridBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);
    </script>
    <script event="ValidateEdit(row, col, cancel)" for="SourceInstrumentGrid">
			OnSourceInstrumentGridValidateEdit(row, col, cancel);
    </script>
    <script language="javascript" event="Click" for="SettingGrid">	
			if (setting) setting.SettingGrid_Click();
            SettingGrid_OnClick();
    </script>
    <script language="jscript" for="InstrumentSelectGrid" event="AfterEdit(iRow, iCol)">			
			if (limit) limit.InstrumentSelectGridAfterEdit(row,col); 
    </script>
     <script event="BeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel)" for="SettingGrid">
			OnSettingGridBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel);
    </script>
    <script language="jscript" src="JavaScript/FormOptions.js"></script>
</head>
<body id="oBodyOption" onresize="onSize();" bgcolor="buttonface" onload="onLoad();">
    <font face="system"></font><font style="background-color: #ffffff" face="system">
    </font><font style="background-color: #ffffff" face="system"></font>
    <br>
    <div id="oBody">
        <mpc:container id="mpcOption" style="display: block; width: 408px; height: 2700px">
        <mpc:page id="Instruments" TABTEXT="<%=GetLanguage("InstrumentsTab")%>" TABTITLE="<%=GetLanguage("InstrumentsTab")%>">
					<DIV id="divCommodity" style="WIDTH: 424px; POSITION: relative; HEIGHT: 382px">
						<DIV id="DIV1" style="Z-INDEX: 100; LEFT: 256px; WIDTH: 136px; POSITION: absolute; TOP: 8px; HEIGHT: 20px"><%=GetLanguage("SelectedInstruments")%>
						</DIV>
						<DIV style="Z-INDEX: 101; LEFT: 30px; WIDTH: 73px; POSITION: absolute; TOP: 9px; HEIGHT: 20px"><%=GetLanguage("InstrumentSource")%>
						</DIV>
						<INPUT id="btnSelectAll" style="Z-INDEX: 102; LEFT: 182px; WIDTH: 49px; POSITION: absolute; TOP: 30px; HEIGHT: 24px"
							onclick="OnSelectAll(vsflexItemSource, vsflexItemSelected)" type="button" value=">>"
							name="btnSelectAll">
						<OBJECT id="vsflexItemSource" style="Z-INDEX: 103; LEFT: 24px; WIDTH: 144px; POSITION: absolute; TOP: 32px; HEIGHT: 301px"
							codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="301" width="135" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949">
							<PARAM NAME="_cx" VALUE="3810">
							<PARAM NAME="_cy" VALUE="7964">
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
							<PARAM NAME="GridLines" VALUE="5">
							<PARAM NAME="GridLinesFixed" VALUE="2">
							<PARAM NAME="GridLineWidth" VALUE="1">
							<PARAM NAME="Rows" VALUE="1">
							<PARAM NAME="Cols" VALUE="3">
							<PARAM NAME="FixedRows" VALUE="1">
							<PARAM NAME="FixedCols" VALUE="1">
							<PARAM NAME="RowHeightMin" VALUE="0">
							<PARAM NAME="RowHeightMax" VALUE="0">
							<PARAM NAME="ColWidthMin" VALUE="0">
							<PARAM NAME="ColWidthMax" VALUE="0">
							<PARAM NAME="ExtendLastCol" VALUE="0">
							<PARAM NAME="FormatString" VALUE="(Format)&#11;3&#11;600&#9;4&#9;4&#9;&#9;&#9;&#9;11&#9;0&#9;Select&#9;0&#9;&#11;1140&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;0&#9;ItemSubCode&#9;0&#9;&#11;960&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;-1&#9;ItemID&#9;0&#9;&#11;(Text)&#11;Select&#9;ItemSubCode&#9;ItemID&#9;&#11;">
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
							<PARAM NAME="ExplorerBar" VALUE="7">
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
						<OBJECT id="vsflexItemSelected" style="Z-INDEX: 104; LEFT: 248px; WIDTH: 152px; POSITION: absolute; TOP: 32px; HEIGHT: 301px"
							codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="301" width="136" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949">
							<PARAM NAME="_cx" VALUE="4022">
							<PARAM NAME="_cy" VALUE="7964">
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
							<PARAM NAME="GridLines" VALUE="5">
							<PARAM NAME="GridLinesFixed" VALUE="2">
							<PARAM NAME="GridLineWidth" VALUE="1">
							<PARAM NAME="Rows" VALUE="1">
							<PARAM NAME="Cols" VALUE="3">
							<PARAM NAME="FixedRows" VALUE="1">
							<PARAM NAME="FixedCols" VALUE="1">
							<PARAM NAME="RowHeightMin" VALUE="0">
							<PARAM NAME="RowHeightMax" VALUE="0">
							<PARAM NAME="ColWidthMin" VALUE="0">
							<PARAM NAME="ColWidthMax" VALUE="0">
							<PARAM NAME="ExtendLastCol" VALUE="0">
							<PARAM NAME="FormatString" VALUE="(Format)&#11;3&#11;600&#9;4&#9;4&#9;&#9;&#9;&#9;11&#9;0&#9;Select&#9;0&#9;&#11;1140&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;0&#9;ItemSubCode&#9;0&#9;&#11;960&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;-1&#9;ItemID&#9;0&#9;&#11;(Text)&#11;Select&#9;ItemSubCode&#9;ItemID&#9;&#11;">
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
							<PARAM NAME="ExplorerBar" VALUE="7">
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
						<INPUT id="btnSelect" style="Z-INDEX: 105; LEFT: 182px; WIDTH: 49px; POSITION: absolute; TOP: 76px; HEIGHT: 24px"
							onclick="OnSelect(vsflexItemSource, vsflexItemSelected)" type="button" value=">" name="btnSelect"><INPUT id="btnUnselect" style="Z-INDEX: 106; LEFT: 182px; WIDTH: 49px; POSITION: absolute; TOP: 122px; HEIGHT: 24px"
							onclick="OnSelect(vsflexItemSelected, vsflexItemSource)" type="button" value="<" name="btnUnselect"><INPUT id="btnUnselectAll" style="Z-INDEX: 107; LEFT: 182px; WIDTH: 49px; POSITION: absolute; TOP: 168px; HEIGHT: 24px"
							onclick="OnSelectAll(vsflexItemSelected, vsflexItemSource)" type="button" value="<<" name="btnUnselectAll"><INPUT id="btnUp" style="Z-INDEX: 108; LEFT: 182px; WIDTH: 49px; POSITION: absolute; TOP: 214px; HEIGHT: 24px"
							onclick="OnUp(vsflexItemSelected)" type="button" value="<%=GetLanguage("MoveUp")%>" name="btnUp"><INPUT id="btnDown" style="Z-INDEX: 109; LEFT: 182px; WIDTH: 49px; POSITION: absolute; TOP: 260px; HEIGHT: 24px"
							onclick="OnDown(vsflexItemSelected)" type="button" value="<%=GetLanguage("MoveDown")%>" name="btnDown"><INPUT id="btnSyn" style="Z-INDEX: 110; LEFT: 182px; WIDTH: 49px; POSITION: absolute; TOP: 308px; HEIGHT: 24px"
							onclick="OnSyn()" type="button" value="<%=GetLanguage("Syn")%>" name="Button7"><INPUT id="btnInstrumentApply" style="Z-INDEX: 111; LEFT: 320px; WIDTH: 75px; POSITION: absolute; TOP: 344px; HEIGHT: 24px"
							onclick="OnInstrumentApply()" type="button" value="<%=GetLanguage("Apply")%>" name="btnInstrumentApply">
					</DIV>
				</mpc:page>
				<mpc:page id="Parameters" TABTEXT="<%=GetLanguage("ParametersTab")%>" TABTITLE="<%=GetLanguage("ParametersTab")%>">
					<DIV style="WIDTH: 424px; POSITION: relative; HEIGHT: 382px"><FONT face="system">&nbsp;
						</FONT>
						<DIV style="Z-INDEX: 101; LEFT: 32px; WIDTH: 176px; POSITION: absolute; TOP: 32px; HEIGHT: 16px"><%=GetLanguage("EnquiryTimeOut")%>:
						</DIV>
						<INPUT id="textEnquiry" style="Z-INDEX: 102; LEFT: 224px; WIDTH: 171px; POSITION: absolute; TOP: 32px; HEIGHT: 22px"
							type="text" size="23" name="Text1">
                        
                        <DIV style="Z-INDEX: 101; LEFT: 32px; WIDTH: 176px; POSITION: absolute; TOP: 72px; HEIGHT: 16px"><%=GetLanguage("ApplyAutoPts")%>:
						</DIV>
                        <INPUT type="checkbox" id="_ApplyAutoAdjustPointsCheckbox" name="_ApplyAutoAdjustPointsCheckbox" style="Z-INDEX: 102; LEFT: 224px; WIDTH: 171px; POSITION: absolute; TOP: 72px; HEIGHT: 22px" />

                        <DIV  style="display:none" id="DIV2" style="Z-INDEX: 103; LEFT: 32px; WIDTH: 176px; POSITION: absolute; TOP: 72px; HEIGHT: 16px"><%=GetLanguage("InactiveTimeOut")%>:
						</DIV>
						<INPUT style="display:none" id="textInactive" style="Z-INDEX: 104; LEFT: 224px; WIDTH: 171px; POSITION: absolute; TOP: 72px; HEIGHT: 22px"
							type="text" size="23" name="Text1">
						<DIV id="DIV3" style="Z-INDEX: 105; LEFT: 32px; WIDTH: 175px; POSITION: absolute; TOP: 112px; HEIGHT: 22px"><%=GetLanguage("PrintExecutedOrder")%>:
						</DIV>
						<INPUT id="btnParamApply" style="Z-INDEX: 111; LEFT: 320px; WIDTH: 75px; POSITION: absolute; TOP: 344px; HEIGHT: 24px"
							onclick="OnParamApply()" type="button" value="<%=GetLanguage("Apply")%>" name="btnPramApply">&nbsp;
						<SELECT id="cmbPriceOrderSetting" style="Z-INDEX: 110; LEFT: 224px; WIDTH: 176px; POSITION: absolute; TOP: 112px; HEIGHT: 208px"
							accessKey="p">
							<OPTION value="0" selected><%=GetLanguage("PrintOrderCombo1")%></OPTION>
							<OPTION value="1"><%=GetLanguage("PrintOrderCombo2")%></OPTION>
							<OPTION value="2"><%=GetLanguage("PrintOrderCombo3")%></OPTION>
						</SELECT>
						<DIV id="DIV3" style="Z-INDEX: 105; LEFT: 32px; WIDTH: 175px; POSITION: absolute; TOP: 152px; HEIGHT: 22px"><%=GetLanguage("DisablePopup")%>:
						</DIV>
						<SELECT id="cmbDisablePopup" style="Z-INDEX: 110; LEFT: 224px; WIDTH: 176px; POSITION: absolute; TOP: 152px; HEIGHT: 208px"
							accessKey="p">
							<OPTION value="0" selected><%=GetLanguage("NoDisableCombo")%></OPTION>
							<OPTION value="1"><%=GetLanguage("DisableCombo")%></OPTION>
						</SELECT>
						<DIV style="display:inline;" id="DIV4" style="Z-INDEX: 105; LEFT: 32px; WIDTH: 175px; POSITION: absolute; TOP: 192px; HEIGHT: 22px"><%=GetLanguage("DisableOrderReconfirmDialog")%>:
						</DIV>
						<select style="display:inline;" id="cmbAutoConfirm" name="cmbAutoConfirm" accesskey="a" style="z-index: 110; left: 224px; width: 176px; position: absolute; top: 192px; height: 208px">
							<option selected="selected" value="0"><%=GetLanguage("NoDisableCombo")%></option>
							<option value="1"><%=GetLanguage("DisableCombo")%></option>
						</select>
					</DIV>
				</mpc:page>
				<mpc:page id="Sound" TABTEXT="<%=GetLanguage("SoundTab")%>" TABTITLE="<%=GetLanguage("SoundTab")%>">
					<DIV style="WIDTH: 424px; POSITION: relative; HEIGHT: 382px">
						<OBJECT id="vsflexSound" style="Z-INDEX: 100; LEFT: 24px; WIDTH: 376px; POSITION: absolute; TOP: 16px; HEIGHT: 284px"
							codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="284" width="376" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949">
							<PARAM NAME="_cx" VALUE="9948">
							<PARAM NAME="_cy" VALUE="7514">
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
                        <DIV style="Z-INDEX: 103; LEFT: 24px; POSITION: absolute; TOP: 319px; height: 11px; width: 100px;">
                        <%=GetLanguage("CopyFrom")%>:&nbsp;</DIV>
                        <select name="cmbCopyFromForSound" id="cmbCopyFromForSound" 
                            style="Z-INDEX: 103; LEFT: 106px; POSITION: absolute; TOP: 319px; width: 137px;" />
                        <input type="button" id="CopyFromForSoundButton" name="CopyFromForSoundButton" value="<%=GetLanguage("Go")%>" style="Z-INDEX: 103; LEFT: 240px; POSITION: absolute; TOP: 319px"onclick="copyFrom.GetSoundSettingForCopyFrom();" />
						<label id="Label1" style="Z-INDEX: 106; LEFT: 24px; POSITION: absolute; TOP: 351px">
							<%=GetLanguage("File")%></label><INPUT id="File1" style="Z-INDEX: 102; LEFT: 55px; WIDTH: 224px; POSITION: absolute; TOP: 350px; HEIGHT: 22px"
							type="file" size="18" name="File1"> <INPUT id="btnTest" style="Z-INDEX: 103; LEFT: 280px; POSITION: absolute; TOP: 350px" onclick="OnListen()"
							type="button" value="<%=GetLanguage("TestButton")%>" name="Button5"> <INPUT id="btnSet" style="Z-INDEX: 103; LEFT: 325px; POSITION: absolute; TOP: 350px" onclick="OnSet()"
							type="button" value="<%=GetLanguage("SetButton")%>" name="Button5"> <INPUT id="btnSoundApply" style="Z-INDEX: 103; LEFT: 382px; POSITION: absolute; TOP: 350px"
							onclick="OnSoundApply()" type="button" value="<%=GetLanguage("Apply")%>" name="btnPramApply">                            
					</DIV>
				</mpc:page>
				<mpc:page id="SetValue" TABTEXT="<%=GetLanguage("SetValueTab")%>" TABTITLE="<%=GetLanguage("SetValueTab")%>">
					<DIV style="WIDTH: 424px; POSITION: relative; HEIGHT: 385px" align="center">
						<TABLE style="WIDTH: 383px; HEIGHT: 370px" cellSpacing="1" cellPadding="1" width="385"
							border="0">
							<TR>
								<TD style="WIDTH: 1px"><FONT face="system"></FONT></TD>
								<TD style="WIDTH: 175px">
										<DIV id="lblOriginInactiveTime" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">InactiveTime</DIV>									
								</TD>
								<TD style="WIDTH: 51px"><FONT face="system"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
											id="txtOriginInactiveTime" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
											type="text" size="2" value="3000"></FONT>
								</TD>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblAcceptDQVariation" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">AcceptDQVariation</DIV>
								</TD>
								<TD><FONT face="system"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
											id="txtAcceptDQVariation" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
											type="text" size="2" value="100"></FONT></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 1px"><FONT face="system"></FONT></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblAlertVariation" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">AlertVariation</DIV>
								</TD>
								<TD style="WIDTH: 51px"><FONT face="system"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
											id="txtAlertVariation" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
											type="text" size="2" value="40"></FONT></TD>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblAcceptLmtVariation" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">Add Net Position Accept Lmt Variation </DIV>
								</TD>
								<TD><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtAcceptLmtVariation" onblur="onBlurEvent();" ondrop="return onDropEvent(this);"
										style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right" type="text" size="2" value="10"></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblNormalWaitTime" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">NormalWaitTime</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtNormalWaitTime" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="0"></TD>
								<TD style="WIDTH: 1px"><FONT face="system"></FONT></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblCancelLmtVariation" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">CancelLmtVariation</DIV>
								</TD>
								<TD><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtCancelLmtVariation" onblur="onBlurEvent();" ondrop="return onDropEvent(this);"
										style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right" type="text" size="2" value="10"></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblAlertWaitTime" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">AlertWaitTime</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtAlertWaitTime" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="15"></TD>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblMaxMinAdjust" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">MaxMinAdjust</DIV>
								</TD>
								<TD><FONT face="system"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
											id="txtMaxMinAdjust" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
											type="text" size="2" value="0"></FONT></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblMaxDQLot" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">MaxDQLot</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtMaxDQLot" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="30"></TD>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblIsBetterPrice" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">IsBetterPrice</DIV>
								</TD>
								<TD><SELECT id="cmbIsBetterPrice" style="WIDTH: 50px">
										<OPTION value="" selected>None</OPTION>
										<OPTION value="1">True</OPTION>
										<OPTION value="0">False</OPTION>
									</SELECT></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblAutoAcceptMaxLot" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">Auto Accept Max Lot</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
									id="txtAutoAcceptMaxLot" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
									type="text" size="2" value="9999.00" maxlength="18"></TD>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblAutoCancelMaxLot" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">Auto Cancel Max Lot</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
									id="txtAutoCancelMaxLot" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
									type="text" size="2" value="9999.00" maxlength="18"></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblMaxOtherLot" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">MaxOtherLot</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtMaxOtherLot" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="30"></TD>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblHitTimes" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">HitTimes</DIV>
								</TD>
								<TD><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtHitTimes" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="1"></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblDQQuoteMinLot" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">DQQuoteMinLot</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtDQQuoteMinLot" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="1"></TD>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblPenetrationPoint" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">PenetrationPoint</DIV>
								</TD>
								<TD><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtPenetrationPoint" onblur="onBlurEvent();" ondrop="return onDropEvent(this);"
										style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right" type="text" size="2" value="0"></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 1px; HEIGHT: 21px"></TD>
								<TD style="WIDTH: 165px; HEIGHT: 21px">
									<DIV id="lblAutoDQMaxLot" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">AutoDQMaxLot</DIV>
								</TD>
								<TD style="WIDTH: 51px; HEIGHT: 21px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtAutoDQMaxLot" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="0"></TD>
								<TD style="WIDTH: 1px; HEIGHT: 21px"></TD>
								<TD style="WIDTH: 141px; HEIGHT: 21px">
									<DIV id="lblPriceValidTime" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">PriceValidTime</DIV>
								</TD>
								<TD style="HEIGHT: 21px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtPriceValidTime" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="15"></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblAutoLmtMktMaxLot" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">AutoLmtMktMaxLot</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtAutoLmtMktMaxLot" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="0"></TD>
								<TD style="WIDTH: 1px"><FONT face="system"></FONT></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblLastAcceptTimeSpan" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">LastAcceptTimeSpan</DIV>
								</TD>
								<TD><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtLastAcceptTimeSpan" onblur="onBlurEvent();" ondrop="return onDropEvent(this);"
										style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right" type="text" size="2"></TD>
							</TR>
                            <TR>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblAutoDQDelay" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">AutoDQDelay</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="txtAutoDQDelay" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="0"></TD>

                                <TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblAllowAddNewPosition" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">AllowedNewTradeSides</DIV>
								</TD>
								<TD>
                                <select id="cmbAllowedNewTradeSides" name="cmbAllowedNewTradeSides" style="WIDTH: 50px">
                                    <option value="0">Disallow add New</option>
                                    <option value="1">Allow add new Buy only</option>
                                    <option value="2">Allow add new Sell only</option>
                                    <option value="3" selected="selected" >Allow add new</option>
                                </select>
							</TR>
							<TR>
								<TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="lblAcceptCloseLmtVariation" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">Reduce Net Position Accept Lmt Variation</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="textAcceptCloseLmtVariation" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="10"></TD>
                                <TD style="WIDTH: 1px"><FONT face="system"></FONT></TD>
								<TD style="WIDTH: 141px">
									<DIV id="lblHitPriceVariationForSTP" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px">Hit Price Variation For STP</DIV>
								</TD>
								<TD style="WIDTH: 51px"><INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
										id="textHitPriceVariationForSTP" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="WIDTH: 46px; HEIGHT: 26px; TEXT-ALIGN: right"
										type="text" size="2" value="9999"></TD>
							</TR>
                            <tr>
                                 <TD style="WIDTH: 1px"></TD>
								<TD style="WIDTH: 165px">
									<DIV id="DIV8" style="DISPLAY: inline; FONT-SIZE: 10pt; WIDTH: 95%; HEIGHT: 15px"><b><%=GetLanguage("ApplyDealingPolicy")%></b></DIV>
								</TD>
                                <TD style="WIDTH: 51px"><INPUT type="checkbox" id="_ApplyToDealingPolicyCheckbox" name="_ApplyToDealingPolicyCheckbox" style="TEXT-ALIGN:center" /></TD>
								<TD style="WIDTH: 1px"><FONT face="system"></FONT></TD>
                            </tr>
							<TR>
								<TD style="WIDTH: 1px"></TD>
								<TD align="center" colSpan="5"><INPUT id="btnSaveSetValue" accessKey="s" onclick="ApplySetValueForAll();" type="button"
										value="<%=GetLanguage("SaveButton")%>" style="width:76px;">
										<INPUT id="btnClearSetValue" accessKey="c" onclick="ClearSetValueForAll();" type="button"
										value="<%=GetLanguage("ClearButton")%>" style="width:76px;">
										</TD>
							</TR>
						</TABLE>
					</DIV>
				</mpc:page>
				<mpc:page id="Limit" TABTEXT="<%=GetLanguage("LimitTab")%>" TABTITLE="<%=GetLanguage("LimitTab")%>">
					<DIV style="WIDTH: 424px; POSITION: relative; HEIGHT: 382px"></FONT>&nbsp;&nbsp;&nbsp;
						<INPUT id="txtPreviousClosePrice" style="Z-INDEX: 101; LEFT: 176px; WIDTH: 200px; POSITION: absolute; TOP: 264px; HEIGHT: 26px; TEXT-ALIGN: right"
							readOnly type="text" maxLength="19" size="28"> <INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
							id="txtLimit3" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="Z-INDEX: 101; LEFT: 176px; WIDTH: 200px; POSITION: absolute; TOP: 136px; HEIGHT: 26px; TEXT-ALIGN: right"
							type="text" maxLength="19" size="28" value="150"> <INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
							id="txtSpreed" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="Z-INDEX: 101; LEFT: 176px; WIDTH: 200px; POSITION: absolute; TOP: 176px; HEIGHT: 26px; TEXT-ALIGN: right"
							type="text" maxLength="19" size="28" value="0"> <INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
							id="txtLimit2" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="Z-INDEX: 102; LEFT: 176px; WIDTH: 200px; POSITION: absolute; TOP: 96px; HEIGHT: 26px; TEXT-ALIGN: right"
							type="text" maxLength="19" size="28" value="100">
                            <%--<SELECT id="cmbInstrument" style="Z-INDEX: 103; LEFT: 176px; WIDTH: 200px; POSITION: absolute; TOP: 24px"
							    onchange="limit.cmbInstrument_OnChange();" name="cmbInstrument">
							    <OPTION selected></OPTION>
						    </SELECT>--%>
                            <object id="InstrumentSelectGrid" style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px; z-index:103;
                    margin: 0px; width: 200px; padding-top: 0px; top:24px; left:176px; height: 20px; position:absolute; background-color: activeborder;"
                    accesskey="a" codebase="./Cab/vsflex7.CAB#Version=7,0,1,160" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949"
                    name="InstrumentSelectGrid">
                    <param name="_cx" value="3810">
                    <param name="_cy" value="635">
                    <param name="_ConvInfo" value="1">
                    <param name="Appearance" value="1">
                    <param name="BorderStyle" value="0">
                    <param name="Enabled" value="-1">
                    <param name="Font" value="Times New Roman">
                    <param name="MousePointer" value="0">
                    <param name="BackColor" value="-2147483643">
                    <param name="ForeColor" value="-2147483640">
                    <param name="BackColorFixed" value="10386532">
                    <param name="ForeColorFixed" value="-2147483630">
                    <param name="BackColorSel" value="13680821">
                    <param name="ForeColorSel" value="0">
                    <param name="BackColorBkg" value="16777215">
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
                    <param name="GridLines" value="3">
                    <param name="GridLinesFixed" value="0">
                    <param name="GridLineWidth" value="1">
                    <param name="Rows" value="1">
                    <param name="Cols" value="1">
                    <param name="FixedRows" value="0">
                    <param name="FixedCols" value="0">
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
                    <param name="AutoSizeMode" value="1">
                    <param name="AutoSearch" value="1">
                    <param name="AutoSearchDelay" value="2">
                    <param name="MultiTotals" value="-1">
                    <param name="SubtotalPosition" value="1">
                    <param name="OutlineBar" value="0">
                    <param name="OutlineCol" value="0">
                    <param name="Ellipsis" value="1">
                    <param name="ExplorerBar" value="0">
                    <param name="PicturesOver" value="0">
                    <param name="FillStyle" value="0">
                    <param name="RightToLeft" value="0">
                    <param name="PictureType" value="0">
                    <param name="TabBehavior" value="0">
                    <param name="OwnerDraw" value="0">
                    <param name="Editable" value="0">
                    <param name="ShowComboButton" value="1">
                    <param name="WordWrap" value="-1">
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
                        <img title="Refresh" onclick="limit.RefreshInstrumentListForLimit_OnClick();" src="images\\Refresh.gif"
                    pressedsrc="images\\Refresh.gif" hoversrc="images\\Refresh.gif" designtimedragdrop="148" style="Z-INDEX: 103; LEFT: 378px; POSITION: absolute;TOP: 24px; ">
                        <INPUT onkeypress="return onKeyPressEvent(this);" onpaste="return onPasteEvent(this);"
							id="txtLimit1" onblur="onBlurEvent();" ondrop="return onDropEvent(this);" style="Z-INDEX: 104; LEFT: 176px; WIDTH: 200px; POSITION: absolute; TOP: 56px; HEIGHT: 26px; TEXT-ALIGN: right"
							type="text" maxLength="19" size="28" value="50">
						<DIV id="lblPreviousClosePrice" style="DISPLAY: inline; FONT-SIZE: 10pt; Z-INDEX: 105; LEFT: 64px; WIDTH: 96px; POSITION: absolute; TOP: 272px; HEIGHT: 18px"><%=GetLanguage("ClosePriceRef")%>.</DIV>
						<DIV id="lblSpreed" style="DISPLAY: inline; FONT-SIZE: 10pt; Z-INDEX: 105; LEFT: 64px; POSITION: absolute; TOP: 184px; HEIGHT: 15px"><%=GetLanguage("Spread")%></DIV>
						<DIV id="lblLimit3" style="DISPLAY: inline; FONT-SIZE: 10pt; Z-INDEX: 105; LEFT: 64px; POSITION: absolute; TOP: 144px; HEIGHT: 15px"><%=GetLanguage("Limit")%> 3</DIV>
						<DIV id="lblLimit2" style="DISPLAY: inline; FONT-SIZE: 10pt; Z-INDEX: 106; LEFT: 64px; POSITION: absolute; TOP: 104px; HEIGHT: 15px"><%=GetLanguage("Limit")%> 2</DIV>
						<DIV id="lblLimit1" style="DISPLAY: inline; FONT-SIZE: 10pt; Z-INDEX: 107; LEFT: 64px; POSITION: absolute; TOP: 64px; HEIGHT: 15px"><%=GetLanguage("Limit")%> 1</DIV>
						<DIV id="lblInstrument" style="DISPLAY: inline; FONT-SIZE: 10pt; Z-INDEX: 108; LEFT: 64px; POSITION: absolute; TOP: 24px; HEIGHT: 15px"><%=GetLanguage("Instrument")%></DIV>
						<input id="btnSaveLimit" style="Z-INDEX: 109; LEFT: 312px; POSITION: absolute; TOP: 328px"
							onclick="limit.btnSaveLimit_OnClick();" type="button" value="<%=GetLanguage("SetLimitButton")%>" name="btnSaveLimit"></DIV>
				</mpc:page>
				<mpc:page id="Font" TABTEXT="<%=GetLanguage("FontTab")%>" TABTITLE="<%=GetLanguage("FontTab")%>" onclick="setting.Setting_onClick()">
					<br>
					<DIV style="WIDTH: 424px; POSITION: relative; HEIGHT: 365px" align="center">
						<TABLE id="Table1" cellSpacing="1" cellPadding="1" width="325" border="0" style="WIDTH: 325px; HEIGHT: 300px">
							<TR>
								<TD vAlign="top" style="WIDTH: 67px"><%=GetLanguage("Grid")%></TD>
								<TD vAlign="top" style="WIDTH: 163px"><SELECT id="cmbDoGrid" onchange="setting.cmbDoGrid_OnChange();" name="cmbGrid" style="WIDTH: 133px">
										<OPTION selected></OPTION>
									</SELECT></TD>
								<TD vAlign="top" style="WIDTH: 109px" align="right"><%=GetLanguage("Height")%></TD>
								<TD vAlign="top">
									<SELECT id="cmbRowHeight" name="cmbRowHeight" style="WIDTH: 65px">
										<OPTION value="100" selected>100</OPTION>
										<OPTION value="150">150</OPTION>
										<OPTION value="200">200</OPTION>
										<OPTION value="250">250</OPTION>
										<OPTION value="300">300</OPTION>
										<OPTION value="350">350</OPTION>
										<OPTION value="400">400</OPTION>
										<OPTION value="450">450</OPTION>
										<OPTION value="500">500</OPTION>
										<OPTION value="550">550</OPTION>
									</SELECT></TD>
							</TR>
							<TR>
								<TD vAlign="top" style="WIDTH: 67px"><FONT face="system"><%=GetLanguage("Font")%></FONT>
								</TD>
								<TD vAlign="top" style="WIDTH: 163px"><SELECT id="cmbFontName" name="cmbFontName" style="WIDTH: 132px">
										<OPTION selected></OPTION>
									</SELECT></TD>
								<TD vAlign="top" style="WIDTH: 109px" align="right"><FONT face="system"><%=GetLanguage("Size")%></FONT>
								</TD>
								<TD vAlign="top"><SELECT id="cmbFontSize" name="cmbFontSize" style="WIDTH: 65px">
										<OPTION selected></OPTION>
									</SELECT><FONT face="system">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></TD>
							</TR>
							<TR>
								<TD noWrap align="center" colSpan="4" style="WIDTH: 77px; HEIGHT: 204px">
									<table style="WIDTH: 376px; HEIGHT: 195px">
										<tr>
											<td>
												<P style="BACKGROUND-COLOR: white" align="center">
													<OBJECT id="SettingGrid" style="Z-INDEX: 103; LEFT: 24px; WIDTH: 290px; POSITION: absolute; TOP: 68px; HEIGHT: 186px"
														codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="186" width="290" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949">
														<PARAM NAME="_cx" VALUE="7673">
														<PARAM NAME="_cy" VALUE="4921">
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
														<PARAM NAME="GridLines" VALUE="5">
														<PARAM NAME="GridLinesFixed" VALUE="2">
														<PARAM NAME="GridLineWidth" VALUE="1">
														<PARAM NAME="Rows" VALUE="1">
														<PARAM NAME="Cols" VALUE="3">
														<PARAM NAME="FixedRows" VALUE="1">
														<PARAM NAME="FixedCols" VALUE="1">
														<PARAM NAME="RowHeightMin" VALUE="0">
														<PARAM NAME="RowHeightMax" VALUE="0">
														<PARAM NAME="ColWidthMin" VALUE="0">
														<PARAM NAME="ColWidthMax" VALUE="0">
														<PARAM NAME="ExtendLastCol" VALUE="0">
														<PARAM NAME="FormatString" VALUE="(Format)&#11;3&#11;600&#9;4&#9;4&#9;&#9;&#9;&#9;11&#9;0&#9;Select&#9;0&#9;&#11;1140&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;0&#9;ItemSubCode&#9;0&#9;&#11;960&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;0&#9;ItemID&#9;0&#9;&#11;(Text)&#11;Select&#9;ItemSubCode&#9;ItemID&#9;&#11;">
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
														<PARAM NAME="ExplorerBar" VALUE="7">
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
												</P>
											</td>
											<td style="WIDTH: 286px"></td>
											<td>
												<P><INPUT language="javascript" id="btnUp2" style="WIDTH: 72px; HEIGHT: 24px" accessKey="u"
														onclick="setting.GetOperateVsflex(0)" type="button" value="<%=GetLanguage("MoveUp")%>" name="btnUp2"></P>
												<P><INPUT language="javascript" id="btnDown2" style="WIDTH: 73px; HEIGHT: 24px" accessKey="d"
														onclick="setting.GetOperateVsflex(1)" type="button" value="<%=GetLanguage("MoveDown")%>" name="btnDown2"></P>
												<P><INPUT language="javascript" id="btnGetValueFromGrid" style="WIDTH: 73px; HEIGHT: 24px"
														accessKey="g" onclick="setting.GetCurrentValue()" type="button" value="<%=GetLanguage("GetWidth")%>"
														name="btnGetValueFromGrid"></P>                                                
											</td>
										</tr>
									</table>
								</TD>
							</TR>
							<TR>
								<TD style="WIDTH: 264px" noWrap align="left" colSpan="4"><INPUT id="chkSaveCurrentLayout" type="checkbox" name="chkSaveCurrentLayout" CHECKED>
									<DIV id="lblLayout" style="DISPLAY: inline; WIDTH: 201px; HEIGHT: 20px" align="left"><%=GetLanguage("Layout")%></DIV>
								</TD>
							</TR>
                            <tr>
                                <TD style="WIDTH: 264px" noWrap align="left" colSpan="4">
									<%=GetLanguage("CopyFrom")%>:&nbsp;<select name="cmbCopyFromForGrid" id="cmbCopyFromForGrid" />
                                    <input type="button" id="CopyFromForGridButton" name="CopyFromForGridButton" value="<%=GetLanguage("Go")%>" onclick="copyFrom.GetGridSettingForCopyFrom();" />
								</TD>
                            </tr>
						</TABLE>                        
						<INPUT id="btnOK" style="Z-INDEX: 102; LEFT: 304px; WIDTH: 88px; POSITION: absolute; TOP: 312px; HEIGHT: 24px"
							accessKey="o" onclick="setting.OK_OnClick();SetLayout();" type="button" value="<%=GetLanguage("Ok")%>"
							name="btnOK">
					</DIV>
				</mpc:page>
				<mpc:page id="SourceInstrumentPage" TABTEXT="Source" TABTITLE="Source" style="display:none;">
					<br>
					    <OBJECT id="SourceInstrumentGrid" style="Z-INDEX: 103; LEFT: 24px; WIDTH: 370px; POSITION: absolute; TOP: 24px; HEIGHT: 276px"
										    codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="276" width="370" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949">
										    <PARAM NAME="_cx" VALUE="7673">
										    <PARAM NAME="_cy" VALUE="4921">
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
										    <PARAM NAME="GridLines" VALUE="5">
										    <PARAM NAME="GridLinesFixed" VALUE="2">
										    <PARAM NAME="GridLineWidth" VALUE="1">
										    <PARAM NAME="Rows" VALUE="1">
										    <PARAM NAME="Cols" VALUE="3">
										    <PARAM NAME="FixedRows" VALUE="1">
										    <PARAM NAME="FixedCols" VALUE="1">
										    <PARAM NAME="RowHeightMin" VALUE="0">
										    <PARAM NAME="RowHeightMax" VALUE="0">
										    <PARAM NAME="ColWidthMin" VALUE="0">
										    <PARAM NAME="ColWidthMax" VALUE="0">
										    <PARAM NAME="ExtendLastCol" VALUE="0">
										    <PARAM NAME="FormatString" VALUE="(Format)&#11;3&#11;600&#9;4&#9;4&#9;&#9;&#9;&#9;11&#9;0&#9;Select&#9;0&#9;&#11;1140&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;0&#9;ItemSubCode&#9;0&#9;&#11;960&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;0&#9;ItemID&#9;0&#9;&#11;(Text)&#11;Select&#9;ItemSubCode&#9;ItemID&#9;&#11;">
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
										    <PARAM NAME="ExplorerBar" VALUE="7">
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
						<INPUT id="Button5" style="Z-INDEX: 102; LEFT: 154px; WIDTH: 88px; POSITION: absolute; TOP: 312px; HEIGHT: 24px"
							accessKey="s" onclick="GetActiveSourceInstrument();" type="button" value="Synchronize"
							name="btnGetSourceInstrument">
						<INPUT id="Button8" style="Z-INDEX: 102; LEFT: 304px; WIDTH: 88px; POSITION: absolute; TOP: 312px; HEIGHT: 24px"
							accessKey="o" onclick="SetActiveSourceInstrument();" type="button" value="OK"
							name="btnOK">
				</mpc:page>
				<mpc:page style="DISPLAY: none" id="Properties" TABTEXT="Properties" TABTITLE="Properties">
					<DIV style="WIDTH: 424px; POSITION: relative; HEIGHT: 382px">
						<DIV style="Z-INDEX: 101; LEFT: 24px; WIDTH: 53px; POSITION: absolute; TOP: 8px; HEIGHT: 20px">Source
						</DIV>
						<DIV id="DIV1" style="Z-INDEX: 102; LEFT: 248px; WIDTH: 133px; POSITION: absolute; TOP: 8px; HEIGHT: 20px">Selected Properties
						</DIV>
						<OBJECT id="vsflexPropSource" style="Z-INDEX: 103; LEFT: 24px; WIDTH: 144px; POSITION: absolute; TOP: 32px; HEIGHT: 301px"
							codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="301" width="144" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949">
							<PARAM NAME="_cx" VALUE="3810">
							<PARAM NAME="_cy" VALUE="7964">
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
							<PARAM NAME="GridLines" VALUE="5">
							<PARAM NAME="GridLinesFixed" VALUE="2">
							<PARAM NAME="GridLineWidth" VALUE="1">
							<PARAM NAME="Rows" VALUE="1">
							<PARAM NAME="Cols" VALUE="3">
							<PARAM NAME="FixedRows" VALUE="1">
							<PARAM NAME="FixedCols" VALUE="1">
							<PARAM NAME="RowHeightMin" VALUE="0">
							<PARAM NAME="RowHeightMax" VALUE="0">
							<PARAM NAME="ColWidthMin" VALUE="0">
							<PARAM NAME="ColWidthMax" VALUE="0">
							<PARAM NAME="ExtendLastCol" VALUE="0">
							<PARAM NAME="FormatString" VALUE="(Format)&#11;3&#11;600&#9;4&#9;4&#9;&#9;&#9;&#9;11&#9;0&#9;Select&#9;0&#9;&#11;1140&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;0&#9;ItemSubCode&#9;0&#9;&#11;960&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;-1&#9;ItemID&#9;0&#9;&#11;(Text)&#11;Select&#9;ItemSubCode&#9;ItemID&#9;&#11;">
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
							<PARAM NAME="ExplorerBar" VALUE="7">
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
						<OBJECT id="vsflexPropSelected" style="Z-INDEX: 104; LEFT: 248px; WIDTH: 152px; POSITION: absolute; TOP: 32px; HEIGHT: 301px"
							codeBase="./Cab/vsflex7.CAB#Version=7,0,1,160" height="301" width="152" classid="clsid:C0A63B86-4B21-11d3-BD95-D426EF2C7949">
							<PARAM NAME="_cx" VALUE="4022">
							<PARAM NAME="_cy" VALUE="7964">
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
							<PARAM NAME="GridLines" VALUE="5">
							<PARAM NAME="GridLinesFixed" VALUE="2">
							<PARAM NAME="GridLineWidth" VALUE="1">
							<PARAM NAME="Rows" VALUE="1">
							<PARAM NAME="Cols" VALUE="3">
							<PARAM NAME="FixedRows" VALUE="1">
							<PARAM NAME="FixedCols" VALUE="1">
							<PARAM NAME="RowHeightMin" VALUE="0">
							<PARAM NAME="RowHeightMax" VALUE="0">
							<PARAM NAME="ColWidthMin" VALUE="0">
							<PARAM NAME="ColWidthMax" VALUE="0">
							<PARAM NAME="ExtendLastCol" VALUE="0">
							<PARAM NAME="FormatString" VALUE="(Format)&#11;3&#11;600&#9;4&#9;4&#9;&#9;&#9;&#9;11&#9;0&#9;Select&#9;0&#9;&#11;1140&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;0&#9;ItemSubCode&#9;0&#9;&#11;960&#9;9&#9;9&#9;&#9;&#9;&#9;0&#9;-1&#9;ItemID&#9;0&#9;&#11;(Text)&#11;Select&#9;ItemSubCode&#9;ItemID&#9;&#11;">
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
							<PARAM NAME="ExplorerBar" VALUE="7">
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
						<INPUT id="Button1" style="Z-INDEX: 105; LEFT: 184px; WIDTH: 49px; POSITION: absolute; TOP: 32px; HEIGHT: 24px"
							onclick="OnSelectAll(vsflexPropSource, vsflexPropSelected)" type="button" value=">>"
							name="btnSelectAll"><INPUT id="Button2" style="Z-INDEX: 106; LEFT: 184px; WIDTH: 49px; POSITION: absolute; TOP: 80px; HEIGHT: 24px"
							onclick="OnSelect(vsflexPropSource, vsflexPropSelected)" type="button" value=">" name="btnSelect"><INPUT id="Button3" style="Z-INDEX: 107; LEFT: 184px; WIDTH: 49px; POSITION: absolute; TOP: 128px; HEIGHT: 24px"
							onclick="OnSelect(vsflexPropSelected, vsflexPropSource)" type="button" value="<" name="btnUnselect"/><INPUT id="Button4" style="Z-INDEX: 108; LEFT: 184px; WIDTH: 49px; POSITION: absolute; TOP: 176px; HEIGHT: 24px"
							onclick="OnSelectAll(vsflexPropSelected, vsflexPropSource)" type="button" value="<<" name="btnUnselectAll"/>
						<INPUT id="btnUpProp" style="Z-INDEX: 109; LEFT: 182px; WIDTH: 49px; POSITION: absolute; TOP: 224px; HEIGHT: 24px"
							onclick="OnUp(vsflexPropSelected)" type="button" value="Up" name="btnUp"/><INPUT id="btnDownProp" style="Z-INDEX: 110; LEFT: 182px; WIDTH: 49px; POSITION: absolute; TOP: 272px; HEIGHT: 24px"
							onclick="OnDown(vsflexPropSelected)" type="button" value="Down" name="btnDown"/>
						<INPUT id="btnPropApply" style="Z-INDEX: 111; LEFT: 320px; WIDTH: 75px; POSITION: absolute; TOP: 344px; HEIGHT: 24px"
							onclick="OnPropertyApply()" type="button" value="Apply" name="btnPropApply"/>
					</DIV>
				</mpc:page>                
			</mpc:container>
    </div>
</body>
</html>
