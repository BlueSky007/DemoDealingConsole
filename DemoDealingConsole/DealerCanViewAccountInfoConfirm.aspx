<%@ Page Language="C#" AutoEventWireup="true" Inherits="DealerCanViewAccountInfoConfirm" Codebehind="DealerCanViewAccountInfoConfirm.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>confirm</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<SCRIPT language="jscript" src="JavaScript/flexConst.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/EnumDefine.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/FormDealerCanViewAccountInfoConfirm.js"></SCRIPT>
	</HEAD>
	<BODY id="oBodyConfirm" onload="OnConfirmLoad()">		
		<TABLE id="Table1" height="128" cellSpacing="4" cellPadding="2" border="0" bgColor="buttonface" style="width: 352px">
		    <TR>
				<TD id="TD26" vAlign="center" align="right"><%=GetLanguage("BL")%>:</TD>
				<TD id="TD29" vAlign="center" align="right">&nbsp;<input type="checkbox" id="_BlackListCheckbox" name="_BlackListCheckbox"  enableviewstate="false" disabled="disabled" /></TD>
				<TD id="TD31" width="10">&nbsp;</TD>
			</TR>
			<TR>
				<TD id="TD1" vAlign="center" align="right"><%=GetLanguage("Balance")%>:</TD>
				<TD id="TD2" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD15" width="10">&nbsp;</TD>
			</TR>
			<TR>
				<TD id="TD3" vAlign="center" align="right"><%=GetLanguage("Equity")%>:</TD>
				<TD id="TD4" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD16" width="10">&nbsp;</TD>
			</TR>
			<TR>
				<TD id="TD5" vAlign="center" align="right"><%=GetLanguage("Necessary")%>:</TD>
				<TD id="TD6" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD17" width="10">&nbsp;</TD>
			</TR>
			<TR>
				<TD id="TD7" vAlign="center" align="right"><%=GetLanguage("Usable")%>:</TD>
				<TD id="TD8" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD18" width="10">&nbsp;</TD>
			</TR>
			<TR>
				<TD id="TD9" vAlign="center" align="right"><%=GetLanguage("TotalBuy")%>:</TD>
				<TD id="TD10" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD19" width="10">&nbsp;</TD>
			</TR>
			<TR>
				<TD id="TD11" vAlign="center" align="right"><%=GetLanguage("TotalSell")%>:</TD>
				<TD id="TD12" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD20" width="10">&nbsp;</TD>
			</TR>
			<TR>
				<TD id="TD13" vAlign="center" align="right"><%=GetLanguage("Net")%>:</TD>
				<TD id="TD14" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD21" width="10">&nbsp;</TD>
			</TR>
			<TR id="trSetPrice">
				<TD id="TD22" vAlign="center" align="right"><%=GetLanguage("SetPrice")%>:</TD>
				<TD id="tdSetPrice" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD27" width="10">&nbsp;</TD>
			</TR>
			<TR id="trDQMaxMovePrice">
			    <TD id="TD23" vAlign="center" align="right"><%=GetLanguage("ExecutePrice")%>:</TD>
				<TD id="TD24" vAlign="center" align="right"><input onfocus="textDQMaxMovePrice_Onfocus();" onblur="textDQMaxMovePrice_Onblur();" id="textDQMaxMovePrice" name="textDQMaxMovePrice" onblur="CheckDQMaxMovePrice();" value="" maxlength="10" size="6" /></TD>
				<TD id="TD25" width="10">&nbsp;</TD>
			</TR>
			<TR id="trRange">
				<TD id="TD28" vAlign="center" align="right">&nbsp;</TD>
				<TD id="tdRange" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD30" width="10">&nbsp;</TD>
			</TR>			
			
			<TR id="trLot">
			    <TD id="TD32" vAlign="center" align="right"><%=GetLanguage("Lot")%>:</TD>
				<TD id="TD33" vAlign="center" align="right"><input id="textLot" name="textLot" onblur="CheckLot();" value="" maxlength="10" size="6" /></TD>
				<TD id="TD34" width="10">&nbsp;</TD>
			</TR>
			
			<TR>
				<TD id="labelInput" vAlign="center" align="middle" colSpan="3" style="height: 30px"><FONT face="system">&nbsp;</FONT></TD>
			</TR>
			<TR>
				<TD align="center" rowSpan="2" colspan="2">
					<INPUT id="Button1" type="submit" value="<%=GetLanguage("Ok")%>" name="Button1" onclick="Submit();">&nbsp;&nbsp;
					<INPUT id="Button2" type="button" value="<%=GetLanguage("Cancel")%>" name="Button2" onclick="window.close();">
				</TD>
			</TR>			
		</TABLE>
		<br />
	</BODY>
</HTML>
