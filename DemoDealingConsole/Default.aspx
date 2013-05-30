<%@ Page language="c#" Inherits="iExchange.DealingConsole.Default" Codebehind="Default.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>DealingConsole</TITLE>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	</HEAD>
	<frameset id="OuterFrameset" name="OuterFrameset" framespacing="0" rows="28,*" tabindex="1">
		<frame name="ToolBar" id="toolBarFrm" src="ToolBar.aspx" noResize scrolling="no">
		<%--<frameset framespacing="1" id="InnerFrameset" name="InnerFrameset" rows="*">--%>
			<frameset framespacing="1" id="InnerFrameset2" name="InnerFrameset2" cols="74%,*" frameBorder="1">
				<frameset framespacing="1" id="QuotationFrameset" name="QuotationFrameset" rows="40%,30%,*">
					<frameset framespacing="1" id="QuotationAndQuotePolicyFrameset" name="QuotationAndQuotePolicyFrameset" cols="56%,*">
                        <frame name="Quotation" id="quotationFrm" src="Quotation.aspx" scrolling="no">
                        <frame name="QuotePolicy" id="QuotePolicyFrm" src="QuotePolicy.aspx" scrolling="no">
                    </frameset>
                    <frameset framespacing="1" id="AdjustFrameset" name="AdjustFrameset" cols="80%,*">
					    <frame name="QuotationTask" id="quotationTaskFrm" src="QuotationTask.aspx" scrolling="no">
                        <frame name="SourceLevelAdjustmentFrm" id="SourceLevelAdjustmentFrm" src="SourceLevelAdjustment.aspx" scrolling="no">
                    </frameset>
			        <frame name="OrderTask" id="orderTaskFrm" src="OrderTask.aspx" scrolling="no">
				</frameset>
				<frame name="Property" id="propertyFrm" src="Property.aspx" scrolling="no">
			</frameset>
		<%--</frameset>--%>
        </frame>
		<noframes>
			<p>This page requires frames, but your browser does not support them.</p>
		</noframes>
	</frameset>
</HTML>
