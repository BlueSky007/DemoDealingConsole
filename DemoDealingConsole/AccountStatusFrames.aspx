<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AccountStatusFrames.aspx.cs" Inherits="iExchange.DealingConsole.AccountStatusFrames" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
	<frameset rows="80,*" framespacing="0" name="all" frameborder="no">
		<frame name="up" id="up" src="AccountStatusQuery.aspx">
		<frame name="down" id="down" scrolling="auto">
		<noframes>
			<body>
				<p>This page requires frames, but your browser does not support them.</p>
			</body>
		</noframes>
	</frameset>
</html>