<%@ Page language="c#" Inherits="iExchange.DealingConsole.Login" codePage="65001" Codebehind="Login.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Login</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<link href="style.css" rel="stylesheet" type="text/css">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<script language="javascript">
		
		function OnLoad()
		{
			window.document.all.SetupComponents.href =	"./Components/" + "DealingConsole.exe";		
		}</script>
	</HEAD>
	<body onload="OnLoad();window.document.all('txtLoginID').focus();" text="black">
		<form id="Login1" method="post" runat="server">
			<p><FONT face="system"></FONT><FONT face="system"></FONT><br>
				<br>
				<br>
			</p>
			<p>
			</p>
			<div align="center">
				<center>
					<table border="0" width="50%" cellspacing="3" cellpadding="2">
						<tr>
							<td width="100%"><img border="0" src="Images/Dealing.jpg" width="400" height="40"><br>
								<br>
							</td>
						</tr>
						<tr>
							<td width="100%">
								<div align="left">
									<table border="1" width="90%" bgcolor="#dfefe3" bordercolorlight="#479933" cellspacing="0"
										bordercolordark="#ffffff">
										<tr>
											<td width="38%"><b><font face="Times New Roman" color="#008000">User Name:</font></b></td>
											<td width="62%"><asp:TextBox id="txtLoginID" class="input" runat="server" accessKey="u"></asp:TextBox><b><font face="Times New Roman" color="#008000">*</font></b></td>
										</tr>
										<tr>
											<td width="38%"><b><font face="Times New Roman" color="#008000">Password:</font></b></td>
											<td width="62%"><asp:TextBox id="txtPassword" runat="server" TextMode="Password" MaxLength="16" class="input"
													accessKey="p"></asp:TextBox><b><font face="Times New Roman" color="#008000">*</font></b></td>
										</tr>
										<tr>
											<td colspan="2">
												<asp:Label id="lblLoginPrompt" runat="server" Width="100%" ForeColor="Green" Visible="False"></asp:Label>
											</td>
										</tr>
									</table>
								</div>
							</td>
						</tr>
						<tr>
							<td width="100%">
								<p align="center"><asp:Button id="btnOk" runat="server" Text="Logon" class="button" onclick="btnOk_Click"></asp:Button>
									<asp:Button id="btnCancel" class="button" runat="server" Text="Cancel" onclick="btnCancel_Click"></asp:Button>
								</p>
							</td>
						</tr>
						<tr>
							<td width="100%"><SPAN id="Label5" style="FONT-SIZE: x-small; WIDTH: 100%; HEIGHT: 65px"><font face="Tahoma"><span style="FONT-SIZE: x-small">&nbsp;</span></font></SPAN></td>
						</tr>
					</table>
				</center>
			</div>
			<div align="center">
				<center>
					<hr>
					<DIV align="center" style="DISPLAY: inline"><FONT face="System"><A href="#" id="SetupComponents">
						Download</A>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</FONT></DIV>
				</center>
			</div>
		</form>
	</body>
</HTML>
