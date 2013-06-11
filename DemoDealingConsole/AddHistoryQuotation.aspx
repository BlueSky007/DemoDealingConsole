<%@ Page Language="C#" AutoEventWireup="true"
	Inherits="AddHistoryQuotation" Codebehind="AddHistoryQuotation.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title><%=GetLanguage("AddHistoryQuotatoinPage")%></title>
    <script language="javascript" src="JavaScript/GlobalFun.js"></script>
	<script language="javascript" src="JavaScript/updateHistoryQuotation.js">
	</script>

    <style type="text/css">
        #_OverridedQuotationLastTimestampDiv
        {
            width: 174px;
            height: 22px;
        }
        #_OkAddButton
        {
            width: 73px;
        }
        #_CancelAddButton
        {
            width: 62px;
        }
    </style>

</head>
<body style="background-color: buttonface" 
    onload="AddHistoryQutoationInitialize();" bgcolor="White">
	<form id="form1" runat="server" style="background-color: ButtonFace">
		<table style="width: 311px; left: 60px; position: absolute; top: 34px;" 
            align="center">
			<tr>
				<td style="width: 85px; height: 24px;">
					&nbsp;<%=GetLanguage("Instrument")%></td>
				<td style="width: 162px; height: 24px;">
					<select id="_InstrumentAddSelect" style="width: 181px" onchange="InstrumentAddSelect_Onchange()">
					</select>
				</td>
			</tr>
			<tr>
				<td style="width: 85px">
					<%=GetLanguage("Timestamp")%>:</td>
				<td style="width: 162px" nowrap="nowrap">
					<input id="_TimestampText" onblur="OnSetDateTime();" type="text" style="width: 175px" />
                    <br /><%=GetLanguage("ValueLessThan")%><div id="_OverridedQuotationLastTimestampDiv"></div></td>
				
			</tr>
			<tr>
				<td style="width: 85px">
					<%=GetLanguage("Origin")%>:</td>
				<td style="width: 162px">
					<input id="_OriginText" type="text" style="width: 175px"  onchange="OnSetPrice(event);"/>
				</td>
			</tr>
			<tr>
				<td colspan="2" valign="middle" align="center"><input id="_OkAddButton" type="button" value="<%=GetLanguage("Ok")%>" onclick="return OkAddButton_onclick()" />
			<input id="_CancelAddButton" type="button" value="<%=GetLanguage("Cancel")%>" onclick="return CancelAddButton_onclick()" />
					</td>
			</tr>
		</table>			
	</form>
</body>
</html>
