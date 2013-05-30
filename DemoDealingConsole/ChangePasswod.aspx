<%@ Page language="c#" Inherits="iExchange.DealingConsole.ChangePasswod" codePage="65001" Codebehind="ChangePasswod.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>ChangePasswod</title>
		<META http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<link href="style.css" rel="stylesheet" type="text/css">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	</HEAD>
	<body>
	<br><br>
		<form method="post" runat="server">
		<div align="center">
			<center>
				<table border="0" width="78%" height="131">
					<tr>
						<td width="100%" bgcolor="#d5d5d5" height="16">
							<p align="center"><b><font color="#000033" size="4">User Passwords Change</font></b></p>
						</td>
					</tr>
					<tr>
						<td width="100%" height="103"><div align="center">
								<center>
									<table  border="1" width="100%" bordercolorlight="#242424" bordercolordark="#FFFFFF"  cellspacing="0">
										<tr>
											<td width="32%" height="20" bgcolor="#f7f7f7">Current Passwords</td>
											<td width="68%" height="20" bgcolor="#f7f7f7">
												<asp:TextBox id="txtOldPassword" runat="server" class="input" MaxLength="16" TextMode="Password"></asp:TextBox>
											</td>
										</tr>
										<tr>
											<td width="32%" height="16">New Password</td>
											<td width="68%" height="16">
												<asp:TextBox id="txtNewPassword" class="input" runat="server" MaxLength="16" TextMode="Password"></asp:TextBox>
											</td>
										</tr>
										<tr>
											<td width="32%" height="20" bgcolor="#f7f7f7"><nobr>Confirm Passwords</td>
											<td width="68%" height="20" bgcolor="#f7f7f7">
												<asp:TextBox id="txtConfirmPassword" class="input" runat="server" MaxLength="16" TextMode="Password"></asp:TextBox>
											</td>
										</tr>
										<tr>
											<td  height="16" colspan=2>
												<font color=red>*</font>The new passwords should contains 8 - 16  combination of digits and letters.											
											</td>
										</tr>
										<tr>
											<td colspan=2 bgcolor="#f7f7f7"><asp:Label id="lblChangePasswordPrompt" runat="server" Width="281px" Visible="false"></asp:Label></td>
										</tr>
									</table>
								</center>
							</div>
						</td>
					</tr>
				</table>
				<br>
				<asp:Button id="btnOk" class="button" runat="server" Text="   Ok   " onclick="btnOk_Click"></asp:Button>
				<asp:Button id="btnCancel" class="button" runat="server" Text="Cancel" onclick="btnCancel_Click"></asp:Button>
			</center>
		</div>
	 </form>
	</body>
</HTML>
