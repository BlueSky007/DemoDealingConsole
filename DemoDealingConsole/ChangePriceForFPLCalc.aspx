<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ChangePriceForFPLCalc.aspx.cs" Inherits="iExchange.DealingConsole.ChangePriceForFPLCalc" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title><%=GetLanguage("ChangePriceForFPLCalcPage")%></title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	</HEAD>
	<body bgcolor="buttonface">
		<form id="Form1" method="post" runat="server">
			<TABLE id="Table1" style="Z-INDEX: 101; LEFT: 8px; WIDTH: 366px; POSITION: absolute; TOP: 0px; HEIGHT: 352px"
				cellSpacing="1" cellPadding="1" width="366" border="0">
				<TR>
					<TD>
						<asp:Label id="_ChangePriceTitle" runat="server" Height="16px" Width="360px" Font-Size="Small" Font-Bold="True">Prices for Floating P/L Calculation</asp:Label></TD>
				</TR>
				<TR>
					<TD style="HEIGHT: 235px"><FONT><asp:datagrid id="grid" runat="server" GridLines="None" AutoGenerateColumns="False" AllowSorting="True"
								CellPadding="3" BackColor="White" BorderWidth="1px" BorderStyle="None" BorderColor="White" Height="312px" Width="352px"
								Font-Size="X-Small" CellSpacing="1" Font-Names="system" HorizontalAlign="Left" AllowPaging="True"
								PageSize="20">
								<SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="#008A8C"></SelectedItemStyle>
								<AlternatingItemStyle BackColor="Gainsboro"></AlternatingItemStyle>
								<ItemStyle Font-Size="X-Small" ForeColor="Black" BackColor="#EEEEEE"></ItemStyle>
								<HeaderStyle Font-Bold="True" ForeColor="White" BackColor="#000084"></HeaderStyle>
								<FooterStyle ForeColor="Black" BackColor="#CCCCCC"></FooterStyle>
								<Columns>
									<asp:BoundColumn Visible="False" DataField="InstrumentID" HeaderText="InstrumentID" FooterText="InstrumentID">
										<HeaderStyle Width="10px"></HeaderStyle>
									</asp:BoundColumn>
									<asp:BoundColumn DataField="Code" HeaderText="Item" FooterText="Item">
										<HeaderStyle HorizontalAlign="Center" Width="50px"></HeaderStyle>
									</asp:BoundColumn>
									<asp:BoundColumn DataField="Bid" HeaderText="Bid" FooterText="Bid">
										<HeaderStyle HorizontalAlign="Center" Width="50px"></HeaderStyle>
										<ItemStyle HorizontalAlign="Right"></ItemStyle>
									</asp:BoundColumn>
									<asp:BoundColumn DataField="Ask" ReadOnly="True" HeaderText="Ask" FooterText="Ask">
										<HeaderStyle HorizontalAlign="Center" Width="50px"></HeaderStyle>
										<ItemStyle HorizontalAlign="Right"></ItemStyle>
									</asp:BoundColumn>
									<asp:BoundColumn DataField="SpreadPoints" HeaderText="Spread" FooterText="Spread">
										<HeaderStyle HorizontalAlign="Center" Width="50px"></HeaderStyle>
										<ItemStyle HorizontalAlign="Center"></ItemStyle>
									</asp:BoundColumn>
									<asp:EditCommandColumn UpdateText="Update" HeaderText="Operation" FooterText="Operation"
										CancelText="Cancel" EditText="Modify">
										<HeaderStyle HorizontalAlign="Center" Width="50px"></HeaderStyle>
										<ItemStyle HorizontalAlign="Center" ForeColor="Red"></ItemStyle>
									</asp:EditCommandColumn>
								</Columns>
								<PagerStyle HorizontalAlign="Center" ForeColor="Black" BackColor="#999999" Mode="NumericPages"></PagerStyle>
							</asp:datagrid></FONT></TD>
				</TR>
			</TABLE>
			<TABLE id="Table2" style="Z-INDEX: 106; LEFT: 376px; WIDTH: 160px; POSITION: absolute; TOP: 24px; HEIGHT: 115px"
				cellSpacing="1" cellPadding="1" width="160" border="0">
				<TR>
					<TD><FONT face="system"><%=GetLanguage("Instrument")%></FONT></TD>
					<TD>
						<asp:TextBox id="CodeTextBox" runat="server" Height="24px" Width="104px" Enabled="False"></asp:TextBox></TD>
				</TR>
				<TR>
					<TD><FONT face="system"><%=GetLanguage("Bid")%></FONT></TD>
					<TD>
						<asp:TextBox id="BidTextBox" runat="server" Height="24px" Width="104px"></asp:TextBox></TD>
				</TR>
				<TR>
					<TD><FONT face="system"><%=GetLanguage("Spread")%></FONT></TD>
					<TD><FONT face="system">
							<asp:TextBox id="SpreadPointsTextBox" runat="server" Height="24px" Width="104px"></asp:TextBox></FONT></TD>
				</TR>
				<TR>
					<TD align="center" colSpan="2">
						<asp:Button id="saveButton" runat="server" Width="64px" Text="Save" onclick="saveButton_Click"></asp:Button></TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
