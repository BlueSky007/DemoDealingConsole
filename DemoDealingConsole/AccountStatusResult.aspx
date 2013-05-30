<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AccountStatusResult.aspx.cs" Inherits="iExchange.DealingConsole.AccountStatusResult" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Account Status Query Result</title>
		<LINK href="Common/Setting.css" type="text/css" rel="stylesheet">
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
        <%
            Response.Write("<script>\r\n");
            Response.Write("var LanguagePrinterError = \"" + this.GetLanguage("PrinterError") + "\";");
            Response.Write("</script>\r\n");
		%>
        <script language="jscript" src="JavaScript/FormAccountStatusResult.js"></script>
	</HEAD>
	<body topmargin="0" leftmargin="0">
		<table border="0" cellspacing="0" cellpadding="0" width="100%">
			<tr>
				<td align="right"><input type="button" value="<%=this.GetLanguage("Print")%>" id="btnPrint" onclick="Print();"></td>
			</tr>
		</table>
		<table id="Table1" cellSpacing="2" cellPadding="0" width="100%" border="0">
			<tr>
				<td align="center" id="config" style="HEIGHT: 2px">
                    <div id="top" runat="server"><FONT face="system"></FONT>
					</div>
				</td>
			</tr>
			<tr>
                <td valign="top">
                    <%--<input type="button" id="_OpenListButton" name="_OpenListButton" onclick="ShowOpenList();" value="<%=this.GetLanguage("OpenList")%>" />
                    <input type="button" id="_CurrentTradeDayOrderListButton" name="_CurrentTradeDayOrderListButton" onclick="ShowCurrentTradeDayOrderList();" value="<%=this.GetLanguage("CurrentTradeDayOrderList")%>" />--%>
                    <div style="border:1;margin-left:5px;font-family: Arial; font-size: 15px; font-weight: bold; color: #008080; background-color: #E4E4E4;">Open Position:</div>
                </td>
            </tr>
			<tr>
				<td valign="top">
                    <div id="OpenListDiv" runat="server" style="margin-top:5px;"></div>
                    <div style="border:1;margin-left:5px;font-family: Arial; font-size: 15px; font-weight: bold; color: #008080; background-color: #E4E4E4;">Current TradeDay Order List:</div>
                    <div id="_CurrentTradeDayOrderListDiv" runat="server"></div> 
                    <div style="border:1;margin-left:5px;font-family: Arial; font-size: 15px; font-weight: bold; color: #008080; background-color: #E4E4E4;">LMT Order:</div>
                    <div id="_UnExcuteOrderListDiv" runat="server"></div>                           
				</td>
			</tr>
		</table>
	</body>
</HTML>
