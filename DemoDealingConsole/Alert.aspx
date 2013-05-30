<%@ Page language="c#" Inherits="iExchange.DealingConsole.Alert" Codebehind="Alert.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>confirm</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<SCRIPT language="jscript" src="JavaScript/FormAlert.js"></SCRIPT>
	</HEAD>
	<BODY id="oBodyAlert" onload="OnAlertLoad()">
		<TABLE id="Table1" height="128" cellSpacing="4" cellPadding="2" width="216" border="0" bgColor="buttonface">
			<TR>
				<TD id="labelInput" height="70" vAlign="center" align="middle" colSpan="1" rowSpan="1"><FONT face="system"></FONT></TD>
			</TR>
			<TR>
				<TD align="middle"><FONT face="system"> <INPUT id="Button1" type="submit" value="OK" name="Button1" onclick="returnValue=true; window.close();" style="WIDTH: 61px; HEIGHT: 24px">
					</FONT>
				</TD>
			</TR>
		</TABLE>
		&nbsp;
	</BODY>
</HTML>
