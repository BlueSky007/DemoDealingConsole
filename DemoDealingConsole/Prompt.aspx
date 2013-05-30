<%@ Page language="c#" Inherits="iExchange.DealingConsole.Prompt" Codebehind="prompt.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>prompt</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		
		<SCRIPT language="jscript" src="JavaScript/GlobalFun.js"></SCRIPT>
		<SCRIPT language="jscript" src="JavaScript/FormPrompt.js"></SCRIPT>
	</HEAD>
	<BODY id="oBodyPrompt" onload="OnPromptLoad()" onkeydown="FilterKey(event)">
		<TABLE id="Table1" height="96" cellSpacing="2" cellPadding="2" width="176" border="0" bgColor="buttonface" style="WIDTH: 176px; HEIGHT: 96px">
			<TR>
				<TD align="left"><FONT face="system">
						<DIV id="labelInput" style="DISPLAY: inline; WIDTH: 168px; HEIGHT: 16px"></DIV>
					</FONT>
				</TD>
			</TR>
			<TR>
				<TD align="middle"><INPUT id="Text1" type="text" size="15" name="Text1"></TD>
			</TR>
			<TR>
				<TD align="middle">
					<INPUT id="Button1" type="submit" value="OK" name="Button1" onclick="returnValue=Text1.value; window.close();"><FONT face="system">&nbsp;
					</FONT><INPUT id="Button2" type="button" value="Cancel" name="Button2" onclick="window.close();"></TD>
			</TR>
		</TABLE>
	</BODY>
</HTML>
