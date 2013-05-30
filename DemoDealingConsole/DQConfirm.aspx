<%@ Page Language="C#" AutoEventWireup="true" Inherits="DQConfirm" Codebehind="DQConfirm.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>confirm</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<SCRIPT language="jscript" src="JavaScript/FormDQConfirm.js"></SCRIPT>
	</HEAD>
	<BODY id="oBodyConfirm" onload="OnConfirmLoad()">
		<TABLE id="Table1" height="128" cellSpacing="4" cellPadding="2" width="216" border="0" bgColor="buttonface">
		    <TR id="trSetPrice">
				<TD id="TD22" vAlign="center" align="right">Set Price:</TD>
				<TD id="tdSetPrice" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD5" width="10">&nbsp;</TD>
			</TR>
		    <TR id="trDQMaxMovePrice">
		        <td vAlign="center" align="right">
		            Execute Price: 
		        </td>
				<TD id="TD1" vAlign="center" align="middle" colSpan="1" rowSpan="1" style="height: 30px; text-align: right">
				    <input onfocus="textDQMaxMovePrice_Onfocus();" onblur="textDQMaxMovePrice_Onblur();" id="textDQMaxMovePrice" name="textDQMaxMovePrice" onblur="CheckDQMaxMovePrice();" value="" maxlength="10" size="6" />
				</TD>
				<TD id="TD4" width="10">&nbsp;</TD>
			</TR>
			<TR id="trRange">
				<TD id="tdRange" colspan="2" vAlign="center" align="right">&nbsp;</TD>
				<TD id="TD3" width="10">&nbsp;</TD>
			</TR>
			<TR>			    
				<TD colspan="2" id="labelInput" vAlign="center" align="middle" colSpan="1" rowSpan="1" style="height: 19px; text-align: center"><FONT face="system"></FONT></TD>
				<TD id="TD2" width="10">&nbsp;</TD>
			</TR>
			<TR>
				<TD colspan="2" align="middle" style="height: 31px; text-align: center">
				    <FONT face="system"> 
				        <INPUT id="Button1" type="submit" value="   Yes   " name="Button1" onclick="Submit();">&nbsp;
						<INPUT id="Button2" type="button" value="   No   " name="Button2" onclick="window.close();">
					</FONT>
				</TD>
				<TD id="TD30" width="10">&nbsp;</TD>
			</TR>
		</TABLE>
		&nbsp;
	</BODY>
</HTML>
