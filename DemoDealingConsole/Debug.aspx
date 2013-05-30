<%@ Page Language="c#" Inherits="iExchange.DealingConsole.Debug" Codebehind="Debug.aspx.cs" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>Debug</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT language="jscript" src="JavaScript/FormDebug.js"></SCRIPT>    
</head>
<body onload="Form_OnLoad();">
    &nbsp;<table style="width: 749px; height: 605px;">
        <tr>
            <td style="width: 66px; height: 276px;">
                <textarea id="debugText" name="debugText" rows="35" style="width: 665px; height: 359px;">
	            </textarea>
	        </td>
            <td style="width: 106px; height: 276px;" align="left" valign="top">
                <input id="PrintButton" onclick="PrintMessage();" accesskey="p" type="button" value="Print"
                    style="width: 94px">
                <br />
                <br />
                <input id="ClearButton" accesskey="c" onclick="ClearMessage();" type="button" value="Clear"
                    style="width: 94px">
                <br />
                <br />
                Keep Length:<input id="KeepMessageCountText" style="width: 93px" type="text" maxlength="5"
                    value="100" />
                <br />
                Length/Message:<input id="LengthPerMessageText" maxlength="5" style="width: 93px"
                    type="text" value="100" />
                <input id="KeepMessageCountButton" accesskey="o" style="width: 94px" type="button"
                    value="OK" onclick="return KeepMessageCountButton_onclick()" />
           </td>
        </tr>
        <tr>
            <td style="width: 66px; height: 363px;">
                <textarea id="MessageForGetCommands2Textarea" name="MessageForGetCommands2Textarea" style="width: 664px; height: 359px;">
	            </textarea>
	        </td>
            <td style="width: 106px; height: 363px;" align="left" valign="top">
                GetCommands2:<input id="Button1" onclick="PrintMessageForGetCommands2();" accesskey="p" type="button" value="Print"
                    style="width: 94px">
                <input id="Button2" accesskey="c" onclick="ClearMessageForGetCommands2();" type="button" value="Clear"
                    style="width: 94px">
            </td>
        </tr>
    </table>
</body>
</html>
