<%@ Page language="c#" Inherits="iExchange.DealingConsole.Calendar" Codebehind="Calendar.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML XMLNS:IE>
	<HEAD>
		<title>Calendar</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<STYLE> @media all{ IE\:Calendar{ behavior: url(behaviors/calendar.htc); width : 33%; }}
		</STYLE>
        <SCRIPT language="jscript" src="JavaScript/FormCalendar.js"></SCRIPT>
	</HEAD>
	<BODY id="oBody" onload="Body_onsize()" bgcolor="buttonface">
		<center>
			<TABLE id="Table1" height="344" cellSpacing="2" cellPadding="2" width="259" border="0" bgColor="buttonface">
				<TR>
					<TD height="39" align="middle" style="BORDER-RIGHT : black 2px solid; BORDER-TOP : black 2px solid; BORDER-LEFT : black 2px solid; BORDER-BOTTOM : black 2px solid" bgColor="gainsboro">
						<DIV style="DISPLAY: inline; FONT-WEIGHT: bold; WIDTH: 96px; HEIGHT: 19px">Set 
							Time:
						</DIV>
						<INPUT id="TextHour" type="text" size="1" name="Text1" style="WIDTH: 34px; HEIGHT: 22px">:
						<INPUT id="TextMinute" type="text" size="1" name="Text1" style="WIDTH: 34px; HEIGHT: 22px"></TD>
				</TR>
				<TR>
					<TD width="100%" height="132">
						<IE:Calendar id="Calendar" style="BORDER-RIGHT : black 1px solid; BORDER-TOP : black 1px solid; BORDER-LEFT : black 1px solid; WIDTH : 250px; BORDER-BOTTOM : black 1px solid; HEIGHT : 250px"></IE:Calendar><FONT face="system"></FONT></TD>
				</TR>
				<TR>
					<TD align="middle">
						<INPUT id="btnOK" type="submit" value="   OK   " name="Submit1" onclick="BtnOK_onclick();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
						&nbsp; <INPUT id="btnCancel" type="button" value="Cancel" name="Button1" onclick="self.close();" ACCESSKEY="C"></TD>
				</TR>
			</TABLE>
		</center>
	</BODY>
</HTML>
