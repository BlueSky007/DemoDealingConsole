
function IOProxy()
{
	var IOType_Instrument = 1;
	var IOType_QuotePolicy = 2;
	var IOType_Order = 3;
	this.Url = null;
	this.mainWindow = null;
	this.SlidingWindow=null;
    //this.LastSequence = 0;
    
	this.Calls = new ActiveXObject("Scripting.Dictionary");

	this.ReplaceSpecialChar = function (str) {
	    if (str == null) return str;
	    str = str.replace(/&/g, "&amp;");
	    return str;
	};

	this.ProcessCommands = function (object) {
	    if (object.childNodes.length > 0)
	        oDealingConsole.GetCommands(object);
	    //oIOProxy.mainWindow.oDealingConsole.GetCommands(object);
	};

	this.Retry = function (beginSequence, endSequence) {
	    oIOProxy.SetMessageForGetCommands2("Before GetCommands2: ", oIOProxy.SlidingWindow.ToString());

	    Service.SrvTest.callService(oIOProxy.GetCommandsResult, "GetCommands2", beginSequence, endSequence);
	};
	
	this.Initialize = function()
	{
		Service.useService(this.Url,"SrvTest");
	}

	this.Initialize2 = function (serviceWsdl) {
	    Service.useService2(this.Url, "SrvTest", serviceWsdl);
	};

	this.ProcessError = function (result, messageNotify) {
	    if (result.errorDetail && typeof (result.errorDetail.raw) == "string") {
	        try {
	            if (result.errorDetail.raw.indexOf("<title>Login</title>") != -1) {
	                oDealingConsole.RedirectCount++;
	                if (oDealingConsole.RedirectCount == 8) {
	                    oDealingConsole.Exited = true;

	                    try {
	                        //may be able to not alert for different OS
	                        alert("You have been signed out of the system, because:\n" +
								"-  you may sign in at other location; or \n" +
								"-  the server is refreshing its connection with you!");
	                        top.close();
	                    }
	                    catch (e)
						{ }

	                    top.location.reload(true);
	                    oDealingConsole.RedirectCount = 0;
	                }
	            }
	            else {
	                var message = "result.errorDetail: " + "\r\n";
	                if (result.errorDetail.code)
	                    message += " .code--" + result.errorDetail.code + "\r\n";
	                if (result.errorDetail.string)
	                    message += " .string--" + result.errorDetail.string + "\r\n";
	                if (result.errorDetail.raw)
	                    message += " .raw--" + result.errorDetail.raw + "\r\n";

	                oIOProxy.Debug2("ProcessError", message);
	            }
	        }
	        catch (e) {
	            oIOProxy.Debug2("ProcessError", result.errorDetail.raw);
	        }
	    }
	    else {
	        if (typeof (result.errorDetail.raw) == "object" && result.errorDetail.raw != null && result.errorDetail.raw.xml != null) {
	            oIOProxy.Debug2("ProcessError", result.errorDetail.raw.xml);
	        }
	        else {
	            oIOProxy.Debug2("ProcessError", "Unknown SOAP ERROR!");
	        }
	    }
	};

	this.GetInitDataXml3 = function () {
	    oIOProxy.LoadSystemParameters();

	    //	    var bt = new Date();
	    var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
	    xmlDoc.async = false;
	    xmlDoc.resolveExternals = false;
	    xmlDoc.load("Service.asmx/GetInitDataXml3");
	    if (xmlDoc.parseError.errorCode != 0) {
	        alert(xmlDoc.parseError.reason);
	        //oIOProxy.ProcessError(result, "GetInitDataResult");
	        return;
	    }
	    else {
	        if (xmlDoc == null) {
	            alert("Init Data is empty!");
	            return;
	        }
	        if (xmlDoc.getElementsByTagName("Exception") != null && xmlDoc.getElementsByTagName("Exception").length > 0) {
	            alert(xmlDoc.getElementsByTagName("Exception")[0].attributes[0].value);
	            return;
	        }

	        var mainWindow = oIOProxy.mainWindow;
	        var commandSequence;
	        var userID;
	        var xmlData = oIOProxy.GetDataRootInDataSetXml(xmlDoc);
	        var commandInfo = oDealingConsole.InitData_Xml(xmlData, true);
	        oIOProxy.SlidingWindow.Reset(commandInfo.commandSequence);
	        oIOProxy.mainWindow.oUserID = commandInfo.userID;

	        oDealingConsole.ScheduleStart();
	    }
	    xmlDoc = null;
	};

//	this.GetInitData = function () {
//	    var iCallID = Service.SrvTest.callService(GetInitDataResult, "GetInitData");
//	};	
//	function GetInitDataResult(result)
//	{
//		var mainWindow = oIOProxy.mainWindow;
//		if(result.error)
//		{
//		    oIOProxy.SetMessageForGetCommands2("GetInitDataResult:result.error ", oIOProxy.SlidingWindow.ToString());
//		
//			oIOProxy.ProcessError(result,"GetInitDataResult");
//		}
//		else
//		{
//		    oIOProxy.SetMessageForGetCommands2("GetInitDataResult Begin: ", oIOProxy.SlidingWindow.ToString());
//		
//			//oIOProxy.SlidingWindow.NextSequence=result.value.commandSequence;		
//			oIOProxy.SlidingWindow.Reset(result.value.commandSequence);
//			oIOProxy.Debug2("GetInitDataResult", "Reset SlidingWindow with sequence = " + result.value.commandSequence);
//			
//			oIOProxy.SetMessageForGetCommands2("GetInitDataResult Temp: ", oIOProxy.SlidingWindow.ToString());

//			mainWindow.oUserID = result.value.userID;
//			//load sysstem parameters
//			oIOProxy.LoadSystemParameters();
//			
//			var dataSet = new ActiveXObject("DATA.DataSet");
//			dataSet.Site = window.document;
//			dataSet.ReadXml(result.value.GetInitDataResult.xml);
//			oDealingConsole.InitData(dataSet,true);

//			oIOProxy.SetMessageForGetCommands2("GetInitDataResult End: ", oIOProxy.SlidingWindow.ToString());

//			dataSet = null;
//		}
//		//mainWindow.OnQuotePolicyChanged(mainWindow.oCurrentQuotePolicyDetailID);
//		oDealingConsole.ScheduleStart();
//	}
	
	//Added by Michael on 2008-05-26
	this.GetSourceInstrument = function (callWin) {
	    var iCallID = Service.SrvTest.callService(GetSourceInstrumentResult, "GetSourceInstrument");
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	//Added by Michael on 2008-05-26
	function GetSourceInstrumentResult(result)
	{
	    var oParameters = oIOProxy.Calls.Item(result.id);
		var callWin = oParameters.callWin;
		
	    if(result.error)
		{
		    oIOProxy.ProcessError(result, "GetSourceInstrumentResult");
		}
		else {
		    if (result.value && result.value.xml) {
		        var dataSet = new ActiveXObject("DATA.DataSet");
		        dataSet.Site = window.document;
		        dataSet.ReadXml(result.value.xml);
		        oDealingConsole.GetSourceInstrumentResult(dataSet);

		        dataSet = null;
		    }
			if (!(callWin == null || callWin.closed == true))	
			    callWin.UpdateSourceInstrument();
		}
		oIOProxy.Calls.Remove(result.id);
	}

	this.GetCommands = function () {
	    if (this.exited) return;

	    oIOProxy.SlidingWindow.RetryIfNeed();

	    this.DoGetCommands();
	};

	this.DoGetCommands = function () {
	    var callObj = new Object();
	    callObj.funcName = "GetCommands";      // Name of the remote function.
	    //callObj.portName = "ServiceSoap";    // Name of the port.
	    callObj.async = true;         // A Boolean that specifies the type of call
	    callObj.timeout = 2;         // Timeout for the method call (seconds)
	    callObj.isHTTP = true;

	    var iCallID = Service.SrvTest.callService(oIOProxy.GetCommandsResult, callObj);
	};

	this.GetCommandsResult = function (result) {
	    if (oDealingConsole.exited) return;

	    if (result.error) {
	        oIOProxy.SetFirstGetCommandResultMessage("result.error");

	        oIOProxy.ProcessError(result, "GetCommandsResult");
	    }
	    else {
	        var msXml;
	        if (result.value && result.value.firstChild && result.value.firstChild.nodeName == "Commands") {
	            msXml = result.value.firstChild;
	        }
	        else if (result.raw && result.raw.nodeName == "Commands") {
	            msXml = result.raw;
	        }

	        if (msXml) {
	            var firstSequence = parseInt(msXml.getAttribute("FirstSequence"));
	            var lastSequence = parseInt(msXml.getAttribute("LastSequence"));

	            oIOProxy.SetFirstGetCommandResultMessage("oIOProxy.SlidingWindow.NextSequence: " + oIOProxy.SlidingWindow.NextSequence + "," + msXml.xml);

	            if (isNaN(firstSequence) || isNaN(lastSequence)) {
	                oIOProxy.Debug2("GetCommandsResult--Error", msXml.xml);
	            }
	            else {
	                //Test
	                /*oIOProxy.Debug2("GetCommandsResult",msXml.xml);
	                if (firstSequence > oIOProxy.SlidingWindow.NextSequence)
	                {
	                oIOProxy.Debug2("GetCommandsResult", "firstSequence = " + firstSequence + "; SlidingWindow.NextSequence = " + oIOProxy.SlidingWindow.NextSequence);
	                oIOProxy.Debug2("SlidingWindow", oIOProxy.SlidingWindow.ToString());
	                alert("GET COMMANDS ERROR! ");
	                }*/

	                oIOProxy.SlidingWindow.ObjectArrived(firstSequence, lastSequence, msXml);
	            }

	            //				if (isNaN(firstSequence) || isNaN(lastSequence)) 
	            //				{
	            //					oIOProxy.Debug2("GetCommandsResult",msXml.xml);
	            //				}
	            //				else
	            //				{
	            //				    if (firstSequence <= lastSequence)
	            //			        {
	            //			            if (lastSequence == oIOProxy.LastSequence)
	            //			            {
	            //			            }
	            //			            else
	            //			            {
	            //			                oIOProxy.LastSequence = lastSequence;
	            //			            }
	            //			            oIOProxy.SlidingWindow.ObjectArrived(firstSequence,lastSequence,msXml);			            
	            //			        }
	            //				}
	        }
	        else {
	            oIOProxy.SetFirstGetCommandResultMessage("msXml == null");

	            oIOProxy.Debug2("GetCommandsResult", "msXml == null");
	        }
	    }
	};
	
	this.Message = "";
	this.KeepMessageCount = 100;
	this.LengthPerMessage = 100;
	this.Format = function (d) {
	    var s = "";
	    var c = ":";
	    s += d.getHours() + c;
	    s += d.getMinutes() + c;
	    s += d.getSeconds() + c;
	    s += d.getMilliseconds();

	    return (s);
	};
    
    this.Debug = function (message) {
	    this.Debug2(message, "");
	};

	this.Debug2 = function (message, value) {
	    try {
	        if (oIOProxy.mainWindow.parent.toolBarFrm.oWndDebug) {
	            this.Message += "--" + this.Format(new Date()) + " " + message + "\t" + value + "\r\n";
	            var length = this.Message.length;
	            var beginIndex = length - this.KeepMessageCount * this.LengthPerMessage;
	            if (beginIndex < 0) {
	                beginIndex = 0;
	            }
	            this.Message = this.Message.substring(beginIndex, length);
	        }
	    }
	    catch (e)
		{ }
	};
	
	//For Test
	this.MessageForGetCommands2 = "";
	this.SetMessageForGetCommands2 = function (message, value) {
	    this.MessageForGetCommands2 += "--" + this.Format(new Date()) + " " + message + "\t" + value + "\r\n";
	    var length = this.MessageForGetCommands2.length;
	    var beginIndex = length - this.KeepMessageCount * this.LengthPerMessage;
	    if (beginIndex < 0) {
	        beginIndex = 0;
	    }
	    this.MessageForGetCommands2 = this.MessageForGetCommands2.substring(beginIndex, length);
	};
	
	//For Test
	this.FirstGetCommandResultMessage = "";
	this.SetFirstGetCommandResultMessage = function (value) {
	    if (this.FirstGetCommandResultMessage == "") {
	        this.FirstGetCommandResultMessage = "--" + this.Format(new Date()) + " FirstGetCommandResultMessage: \t" + value + "\r\n\r\n";
	    }
	};

	this.WriteLog = function (objectIDs, eventMessage, transactionID, transactionCode) {
	    var iCallID = Service.SrvTest.callService(WriteLogResult, "WriteLog", objectIDs, oIOProxy.ReplaceSpecialChar(eventMessage), transactionID, transactionCode);
	};
	function WriteLogResult(result) {
	    if (result.error) oIOProxy.ProcessError(result, "WriteLogResult");
	}

	this.SendOverrideQuote = function (instrumentID, quote, acceptOutOfRangePrice, eventMessage) {
	    var s = instrumentID + Delimiter.Col +
				Date2String(quote.timestamp) + Delimiter.Col +
				quote.origin.ToString() + Delimiter.Col +
				quote.high.ToString() + Delimiter.Col +
				quote.low.ToString();
	    var iCallID = Service.SrvTest.callService(SendOverrideQuoteResult, "SetQuotation", s, instrumentID, acceptOutOfRangePrice, oIOProxy.ReplaceSpecialChar(eventMessage));
	};
	function SendOverrideQuoteResult(result)
	{
		if(result.error) oIOProxy.ProcessError(result,"SendOverrideQuoteResult");
	}

    //isSetValue used: InstrumentLimit(set to false); isRefreshUi & isChangeProperty not used
	this.SendInstrumentParam = function (instrument, property, value, isSetValue, isRefreshUi, isChangeProperty) {
	    var iCallID = Service.SrvTest.callService(UpdateInstrumentResult, "UpdateInstrument", instrument.id, oIOProxy.ReplaceSpecialChar(instrument.code), property, value);
	    var oParameters = new Object();
	    oParameters.instrument = instrument;
	    oParameters.property = property;
	    oParameters.value = value;
	    oParameters.isSetValue = isSetValue;
	    oParameters.isRefreshUi = isRefreshUi;
	    oParameters.isChangeProperty = isChangeProperty;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};	
	function UpdateInstrumentResult(result)	
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		var instrument = oParameters.instrument;
		var property = oParameters.property;
		var value = oParameters.value;
		var isSetValue = oParameters.isSetValue;
		var isRefreshUi = oParameters.isRefreshUi;
		var isChangeProperty = oParameters.isChangeProperty;
		
		if (result.error) 
		{
		    alert("Failed to Update Instrument!");
		    
		    oIOProxy.ProcessError(result,"UpdateInstrumentResult");
		}

		if (typeof (isChangeProperty) != 'undefined' && !isChangeProperty) {
		    oIOProxy.Debug("return without invoking OnPropertyInstrumentChanged UI for isChangeProperty is false");
		    return;
		}
		var isAccept = (result.value && !result.error);
		if (isAccept == false)
		{
		    alert("Failed to Update Instrument!");
		}
		
		instrument.ConfirmParamValue(property, value, isAccept,isSetValue);
		if (typeof (isRefreshUi) != 'undefined' && isRefreshUi) {
		    oIOProxy.mainWindow.OnQuotationPropertiesChanged(instrument, false);
//		    if (property == "AutoAdjustPoints" || property == "SpreadPoints") {
//		        oIOProxy.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument,false);
//		    }
		    var oCurrentInstrumentID = oIOProxy.mainWindow.oCurrentInstrumentID;
		    if (oCurrentInstrumentID == instrument.id) {
		        oIOProxy.mainWindow.OnPropertyInstrumentChanged(instrument);
		        if (property == "AutoAdjustPoints" || property == "SpreadPoints") {
		            oIOProxy.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
		        }
		    }
		    else {
		        oIOProxy.Debug("return without invoking OnPropertyInstrumentChanged UI for the instrument is not the current instrument");
		    }
		}
		else {
		    oIOProxy.Debug("return without invoking OnPropertyInstrumentChanged UI for isRefreshUi is undefined or false");
		}
		oIOProxy.Calls.Remove(result.id);
	}	
	
	//For ResetToSetValue,ResetToPrevious,OnSwitch(set DQQuoteMinLot=1.0,AutoDQMaxLot=0.0,AutoLmtMktMaxLot=0.0)
//	this.UpdateInstrument2 = function (instrumentXml) {	
//		instrumentXml = instrumentXml.replace(/</g, "&lt;");
//		instrumentXml = instrumentXml.replace(/>/g, "&gt;");
//		var iCallID = Service.SrvTest.callService(UpdateInstrument2Result, "UpdateInstrument2", instrumentXml);
//	}
//	function UpdateInstrument2Result(result)	
//	{
//		if(result.error) oIOProxy.ProcessError(result,"UpdateInstrument2Result");
//	}
	this.UpdateInstrument2 = function (instrumentXml, objectIDs, eventMessages, instrumentID, instrumentCode) {
	    instrumentXml = instrumentXml.replace(/</g, "&lt;");
	    instrumentXml = instrumentXml.replace(/>/g, "&gt;");
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    callObj.funcName = "UpdateInstrument2";

	    var result = Service.SrvTest.callService(callObj, instrumentXml, objectIDs, oIOProxy.ReplaceSpecialChar(eventMessages), instrumentID, oIOProxy.ReplaceSpecialChar(instrumentCode));
	    if (result.error) oIOProxy.ProcessError(result, "UpdateInstrument2Result");
	    if (!result.error && result.value) {
	        return result.value == true;
	    }
	    else {
	        alert("Failed to Update Instrument Parameter");
	    }
	    return false;
	    //var iCallID = Service.SrvTest.callService(UpdateInstrument2Result, "UpdateInstrument2", instrumentXml);
	};

	this.SuspendOrResume = function (isResume) {
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    callObj.funcName = "SuspendOrResume";

	    var result = Service.SrvTest.callService(callObj, isResume);
	    if (result.error) oIOProxy.ProcessError(result, "SuspendOrResumeResult");
	    if (!result.error) {
	        if (result.value == 0) {
	            return true;
	        }
	        else if (result.value == -2) {
	            alert("Not data is effected!");
	        }
	        else {
	            alert("Failed to " + (isResume ? "Resume" : "Suspend"));
	        }
	    }
	    else {
	        alert("Failed to " + (isResume ? "Resume" : "Suspend"));
	    }
	    return false;
	};

	this.SuspendOrResumeForInstrument = function (isResume, instrumentID) {
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    callObj.funcName = "SuspendOrResumeForInstrument";

	    var result = Service.SrvTest.callService(callObj, isResume, instrumentID);
	    if (result.error) oIOProxy.ProcessError(result, "SuspendOrResumeForInstrumentResult");
	    if (!result.error) {
	        if (result.value == 0) {
	            return true;
	        }
	        else if (result.value == -2) {
	            //alert("Not data is effected!");
	        }
	        else {
	            alert("Failed to " + (isResume ? "Resume" : "Suspend"));
	        }
	    }
	    else {
	        alert("Failed to " + (isResume ? "Resume" : "Suspend"));
	    }
	    return false;
	};

	this.MassAllowLMT = function (allow) {
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    callObj.funcName = "MassAllowLMT";

	    var result = Service.SrvTest.callService(callObj, allow);
	    if (result.error) oIOProxy.ProcessError(result, "MassAllowLMTResult");
	    if (!result.error) {
	        if (result.value == 0) {
	            return true;
	        }
	        else if (result.value == -2) {
	            alert("Not data is effected!");
	            return true;
	        }
	        else {
	            alert("Failed to " + (allow ? "Allow Limit" : "Disallow Limit"));
	        }
	    }
	    else {
	        alert("Failed to " + (allow ? "Allow Limit" : "Disallow Limit"));
	    }
	    return false;
	};

	this.AllowLMT = function (allow, instrumentID) {
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    callObj.funcName = "AllowLMT";

	    var result = Service.SrvTest.callService(callObj, allow, instrumentID);
	    if (result.error) oIOProxy.ProcessError(result, "AllowLMTResult");
	    if (!result.error) {
	        if (result.value == 0) {
	            return false;// true;
	        }
	        else if (result.value == -2) {
	            //alert("Not data is effected!");
	            return true;
	        }
	        else {
	            alert("Failed to " + (allow ? "Allow Limit" : "Disallow Limit"));
	        }
	    }
	    else {
	        alert("Failed to " + (allow ? "Allow Limit" : "Disallow Limit"));
	    }
	    return false;
	};


	this.UpdateInstrumentForAutoToManual = function () {
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    callObj.funcName = "UpdateInstrumentForAutoToManual";

	    var result = Service.SrvTest.callService(callObj);
	    if (result.error) oIOProxy.ProcessError(result, "UpdateInstrumentForAutoToManualResult");
	    if (!result.error) {
	        if (result.value == 0) {
	            return true;
	        }
	        else if (result.value == -2) {
	            alert("Not data is effected!");
	        }
	        else {
	            alert("Failed to From Auto To Manual");
            }
	    }
	    else {
	        alert("Failed to From Auto To Manual");
	    }
	    return false;
	};
	
//	this.UpdateInstrumentForAutoToManual = function()
//	{
//		var iCallID = Service.SrvTest.callService(UpdateInstrumentForAutoToManualResult, "UpdateInstrumentForAutoToManual");
//	};
//	function UpdateInstrumentForAutoToManualResult(result)
//	{
//		if(result.error) oIOProxy.ProcessError(result,"UpdateInstrumentForAutoToManualResult");
//	}
		
	//Added by Michael on 2006-10-08
	this.UpdateInstrumentForAutoToManual2 = function (instrument) {
	    var iCallID = Service.SrvTest.callService(UpdateInstrumentForAutoToManual2Result, "UpdateInstrumentForAutoToManual2", instrument.id, instrument.code);
	    var oParameters = new Object();
	    oParameters.instrument = instrument;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	//Added by Michael on 2006-10-08
	function UpdateInstrumentForAutoToManual2Result(result)
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		if (typeof(oParameters) == 'undefined' || oParameters==null) return;	//because system data be able to refresh...
		var instrument = oParameters.instrument;
		if (typeof(instrument) == 'undefined' || instrument==null) return;	//because system data be able to refresh...
		
		if(result.error) 
		{
			oIOProxy.ProcessError(result,"UpdateInstrumentForAutoToManual2Result");
		}
		else
		{
			instrument.UpdateInstrumentForAutoToManual2Result();
		}
		oIOProxy.Calls.Remove(result.id);
	}

	this.UpdateQuotePolicyResultErrorProcess = function (functionName, result) {
	    var message = "";
	    if (result.error) {
	        message = "Failed to Update QuotePolicyDetail!";
	    }
	    else {
	        if (result.value) {
	            if (result.value.errorLine == -2) {
	                message = "AutoPoints/Spread should not be greater than the MaxAutoPoints/MaxSpreadPoints";
	            }
	            else {
	                if (result.value.errorLine != 0) message = "Failed to Update QuotePolicyDetail!";
	            }
	        }
	    }
	    if (message != "") {
	        oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", message, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
	    }
	};

	this.SendQuotePolicyParam = function (quotePolicy, instrumentCode, property, value, eventMessage) {
	    var iCallID = Service.SrvTest.callService(UpdateQuotePolicyResult, "UpdateQuotePolicy", quotePolicy.quotePolicyID, quotePolicy.code, quotePolicy.instrumentID, oIOProxy.ReplaceSpecialChar(instrumentCode), property, value, "QP", oIOProxy.ReplaceSpecialChar(eventMessage));
	    var oParameters = new Object();
	    oParameters.quotePolicy = quotePolicy;
	    oParameters.property = property;
	    oParameters.value = value;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};	
	function UpdateQuotePolicyResult(result)	
	{
		if(result.error) oIOProxy.ProcessError(result,"UpdateQuotePolicyResult");
		
		var oParameters = oIOProxy.Calls.Item(result.id);
		var quotePolicy = oParameters.quotePolicy;
		var property = oParameters.property;
		var value = oParameters.value;

		var isAccept = (result.value && !result.error && result.value.errorLine == 0);
		quotePolicy.ConfirmParamValue(property, value, isAccept);
		if(oInstruments.Exists(quotePolicy.instrumentID) == true)
		{
			var instrument = oInstruments.Item(quotePolicy.instrumentID);
			oIOProxy.mainWindow.OnQuotationQuotePolicyDetailChanged(instrument);
			oIOProxy.mainWindow.OnPropertyInstrumentChanged(instrument);
			if (property == "AutoAdjustPoints" || property == "SpreadPoints") {
			    oIOProxy.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument, true);			    
			}
			var oCurrentInstrumentID = oIOProxy.mainWindow.oCurrentInstrumentID;
			if (oCurrentInstrumentID == instrument.id) {
			    if (property == "AutoAdjustPoints" || property == "SpreadPoints") {
			        oIOProxy.mainWindow.OnQuotePolicyInstrumentChanged(instrument);			        
			    }
			}

			if (property == "AutoAdjustPoints" || property == "SpreadPoints")
			{
			    oDealingConsole.EnquiryManager.enquiryWindowManager.ChangedParametersByOuter(quotePolicy);
			}

			if (property == "AutoAdjustPoints" && oIOProxy.mainWindow.oCurrentQuotePolicyDetailID == quotePolicy.quotePolicyID) {
			    oIOProxy.mainWindow.parent.SourceLevelAdjustmentFrm.UpdateReferenceAutoAdjustPoints(instrument);
			}
		}

		oIOProxy.Calls.Remove(result.id);

		oIOProxy.UpdateQuotePolicyResultErrorProcess("SendQuotePolicyParam", result);
	}

	this.SendQuotePolicyParam2 = function (callWin, row, quotePolicy, instrumentCode, property, value) {
	    var iCallID = Service.SrvTest.callService(UpdateQuotePolicyResult2, "UpdateQuotePolicy", quotePolicy.quotePolicyID, quotePolicy.code, quotePolicy.instrumentID, oIOProxy.ReplaceSpecialChar(instrumentCode), property, value, "QP", "");
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oParameters.row = row;
	    oParameters.quotePolicy = quotePolicy;
	    oParameters.property = property;
	    oParameters.value = value;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function UpdateQuotePolicyResult2(result)	
	{
		if(result.error) oIOProxy.ProcessError(result,"UpdateQuotePolicyResult");
		
		var oParameters = oIOProxy.Calls.Item(result.id);
		var callWin = oParameters.callWin;
		var row = oParameters.row;
		var quotePolicy = oParameters.quotePolicy;
		var property = oParameters.property;
		var value = oParameters.value;

		var isAccept = (result.value && !result.error && result.value.errorLine == 0);
		quotePolicy.ConfirmParamValue(property, value, isAccept);
		if(oInstruments.Exists(quotePolicy.instrumentID) == true)
		{
			var instrument = oInstruments.Item(quotePolicy.instrumentID);
			oIOProxy.mainWindow.OnQuotationQuotePolicyDetailChanged(instrument);
			oIOProxy.mainWindow.OnPropertyInstrumentChanged(instrument);
			if (property == "AutoAdjustPoints" || property == "SpreadPoints") {
			    oIOProxy.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument,true);
			}
			var oCurrentInstrumentID = oIOProxy.mainWindow.oCurrentInstrumentID;
			if (oCurrentInstrumentID == instrument.id) {
			    if (property == "AutoAdjustPoints" || property == "SpreadPoints") {
			        oIOProxy.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
			    }
			}

			if (!(callWin == null || callWin.closed == true))
			{
			    try
			    {
			        callWin.SendQuotePolicyParam2Result(row);
			    }
			    catch(e)
			    {}
			}
		}
		oIOProxy.Calls.Remove(result.id);

		oIOProxy.UpdateQuotePolicyResultErrorProcess("SendQuotePolicyParam2", result);
	}

	this.SendQuotePolicyParameters = function (quotePolicyXmls, needSendOverridedQuotation) {
	    quotePolicyXmls = quotePolicyXmls.replace(/</g, "&lt;");
	    quotePolicyXmls = quotePolicyXmls.replace(/>/g, "&gt;");

	    var iCallID = Service.SrvTest.callService(SendQuotePolicyParametersResult, "SendQuotePolicyParameters", quotePolicyXmls);
	    var oParameters = new Object();
	    oParameters.quotePolicyXmls = quotePolicyXmls;
	    oParameters.needSendOverridedQuotation = needSendOverridedQuotation;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function SendQuotePolicyParametersResult(result) {
	    if (result.error) oIOProxy.ProcessError(result, "SendQuotePolicyParametersResult");

	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var quotePolicyXmls = oParameters.quotePolicyXmls;
	    var needSendOverridedQuotation = oParameters.needSendOverridedQuotation;

	    var isAccept = (result.value && !result.error && result.value.errorLine == 0);
	    var msXml = new ActiveXObject("MSXML.DOMDocument");
	    quotePolicyXmls = quotePolicyXmls.replace(/&lt;/g, "<");
	    quotePolicyXmls = quotePolicyXmls.replace(/&gt;/g, ">");
	    msXml.loadXML(quotePolicyXmls);
	    if (!msXml || !msXml.firstChild) {
	        oIOProxy.Calls.Remove(result.id);
	        return;
	    }

	    var needUpdateInstruments = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=Instrument
	    var needUpdateSourceLevelAdjustmentInstruments = new ActiveXObject("Scripting.Dictionary"); //key=InstrumentID value=Instrument

	    var quotePoliciesNode = msXml.firstChild;
	    var iCount = quotePoliciesNode.childNodes.length;
	    for (var i = 0; i < iCount; i++) {
	        var quotePolicyNode = quotePoliciesNode.childNodes.item(i);
	        var quotePolicyID = quotePolicyNode.getAttribute("QuotePolicyID");
	        var instrumentID = quotePolicyNode.getAttribute("InstrumentID");
	        var spreadPoints = parseInt(quotePolicyNode.getAttribute("SpreadPoints"));
	        var autoAdjustPoints = parseInt(quotePolicyNode.getAttribute("AutoAdjustPoints"));

	        if (oInstruments.Exists(instrumentID)) {
	            var instrument = oInstruments.Item(instrumentID);
	            if (instrument.quotePolicyDetails.Exists(quotePolicyID)) {
	                var quotePolicyDetail = instrument.quotePolicyDetails.Item(quotePolicyID);
	                if (isNaN(spreadPoints) == false) quotePolicyDetail.ConfirmParamValue("SpreadPoints", spreadPoints, isAccept);
	                if (isNaN(autoAdjustPoints) == false) quotePolicyDetail.ConfirmParamValue("AutoAdjustPoints", autoAdjustPoints, isAccept);

	                if (isNaN(spreadPoints) == false || isNaN(autoAdjustPoints) == false) {
                        oDealingConsole.EnquiryManager.enquiryWindowManager.ChangedParametersByOuter(quotePolicyDetail);
	                }

	                if (!needUpdateInstruments.Exists(instrumentID)) {
	                    needUpdateInstruments.Add(instrumentID, instrument);
	                }
	                if (isNaN(autoAdjustPoints) == false && oIOProxy.mainWindow.oCurrentQuotePolicyDetailID == quotePolicyID) {
	                    if (!needUpdateSourceLevelAdjustmentInstruments.Exists(instrumentID)) {
	                        needUpdateSourceLevelAdjustmentInstruments.Add(instrumentID, instrument);
	                    }
	                }
	            }
	        }
	    }
	    if (needUpdateInstruments.Count > 0) {
            var needUpdateInstruments2 = (new VBArray(needUpdateInstruments.Items())).toArray();
            for (var index = 0, iCount = needUpdateInstruments2.length; index < iCount; index++) {
                var instrument = needUpdateInstruments2[index];

                oIOProxy.mainWindow.OnQuotationQuotePolicyDetailChanged(instrument);
                oIOProxy.mainWindow.OnPropertyInstrumentChanged(instrument);
                oIOProxy.mainWindow.RefreshAskBidWhenChangedAutoAdjustPointsAndSpreadPoints(instrument, needSendOverridedQuotation);
                var oCurrentInstrumentID = oIOProxy.mainWindow.oCurrentInstrumentID;
                if (oCurrentInstrumentID == instrument.id) {
                    oIOProxy.mainWindow.OnQuotePolicyInstrumentChanged(instrument);
                }
            }
	    }

	    if (needUpdateSourceLevelAdjustmentInstruments.Count > 0) {
	        var needUpdateSourceLevelAdjustmentInstruments2 = (new VBArray(needUpdateSourceLevelAdjustmentInstruments.Items())).toArray();
	        for (var index = 0, iCount = needUpdateSourceLevelAdjustmentInstruments2.length; index < iCount; index++) {
	            var instrument = needUpdateSourceLevelAdjustmentInstruments2[index];
	            oIOProxy.mainWindow.parent.SourceLevelAdjustmentFrm.UpdateReferenceAutoAdjustPoints(instrument);
	        }
        }

	    oIOProxy.Calls.Remove(result.id);

	    oIOProxy.UpdateQuotePolicyResultErrorProcess("SendQuotePolicyParameters", result);
	}

	this.CancelTransaction = function (tran) {
	    var eventMessageArray = tran.GetEventMessageArray("Cancel", "DealerCanceled");
	    var iCallID = Service.SrvTest.callService(CancelTransactionResult, "Cancel", tran.id, "DealerCanceled", "Cancel", tran.code, eventMessageArray);
	    var oParameters = new Object();
	    oParameters.tran = tran;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function CancelTransactionResult(result)
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		var tran = oParameters.tran;
		
		if(result.error || result.value != "OK")
		{
		    var sMsg = "";
		    if (result.error) {
		        oIOProxy.ProcessError(result, "CancelTransactionResult");
		    }
		    else {
		        if (result.value == "TransactionNotExists") {
		            sMsg = "The order is canceled already";
		            oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
		            tran.Cancel();
		            return;
		        }
		    }

		    if (oIOProxy.mainWindow.oDisablePopup == 0) {
		        if (result.error) {
		            sMsg = "Failed to cancel order! " + tran.code;
		        }
		        else {
		            sMsg = oDealingConsole.GetCancelMessage(tran, result.value);
		        }
			    var isOK = oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
			}
		}
		tran.Cancel();
		
		oIOProxy.Calls.Remove(result.id);
	}

	//Dealer confirm: Customer request cancel Limit,MOC,MOO order
	this.ComfirmCancelTransaction = function (tran, cancelType) {
	    var eventMessageArray = tran.GetEventMessageArray("AcceptCustomerCancelLmtOrder", "CustomerCanceled");
	    var iCallID = Service.SrvTest.callService(ComfirmCancelTransactionResult, "Cancel", tran.id, "CustomerCanceled", "AcceptCustomerCancelLmtOrder", tran.code, eventMessageArray);
	    var oParameters = new Object();
	    oParameters.tran = tran;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function ComfirmCancelTransactionResult(result)
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		var tran = oParameters.tran;
		
		if(result.error || result.value != "OK") {
		    if (result.error) {
		        oIOProxy.ProcessError(result, "ComfirmCancelTransactionResult");
		    }

		    if (oIOProxy.mainWindow.oDisablePopup == 0) {
		        var sMsg = "";
		        if (result.error) {
		            sMsg = "Failed to send order to cancel! " + tran.code;
		        }
		        else {
		            sMsg = oDealingConsole.GetCancelMessage(tran, result.value);
		        }
		        var isOK = oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
		    }
		}
		tran.Cancel();
		
		oIOProxy.Calls.Remove(result.id);
	}
	
	//Added by Michael on 2005-04-06
	this.RejectCancelLmtOrder = function (tran) {
	    var eventMessageArray = tran.GetEventMessageArray("RejectCancelLmtOrder", "");
	    var iCallID = Service.SrvTest.callService(GetRejectCancelLmtOrderResult, "RejectCancelLmtOrder", tran.id, tran.accountID, "RejectCustomerCancelLmtOrder", tran.code, eventMessageArray);
	    var oParameters = new Object();
	    oParameters.tran = tran;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	//Modified by Michael on 2006-09-28
	function GetRejectCancelLmtOrderResult(result)
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		var tran = oParameters.tran;
		
		if (result.error || result.value != "OK")
		{
			if (result.error)
			{
				oIOProxy.ProcessError(result,"GetRejectCancelLmtOrderResult");
			}
			else
			{
				alert("Failed to Reject Cancel Lmt Order!");
			}
		}
		else
		{
			tran.GetRejectCancelLmtOrderResult();
			if(oIOProxy.mainWindow.oDisablePopup == 0)
			    alert("Succeed to Reject Cancel Lmt Order!");			
		}
	}

	this.ExecuteTransaction = function (tran2, order2, buyPrice, sellPrice, lot) {
	    var eventMessage = order2.GetEventMessage("Execute", "");
	    eventMessage += ",buyPrice=" + (buyPrice == null ? "NULL" : buyPrice);
	    eventMessage += ",sellPrice=" + (sellPrice == null ? "NULL" : sellPrice);
	    if (lot == null || isNaN(lot)) lot = "";
	    var iCallID = Service.SrvTest.callService(ExecuteTransactionResult, "Execute", tran2.id, buyPrice, sellPrice, lot, order2.id, order2.code, eventMessage);
	    var oParameters = new Object();
	    oParameters.tran2 = tran2;
	    oParameters.order2 = order2;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function ExecuteTransactionResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var tran2 = oParameters.tran2;
	    var order2 = oParameters.order2;

	    if (result.error || result.value.ExecuteResult != "OK") {
	        //Notify user with sound
	        //oDealingConsole.PlaySound(tran2.orderType== OrderType.SpotTrade ? SoundOption.DQCancelOrder : SoundOption.LimitCancelOrder);
	        oDealingConsole.PlaySound(tran2.orderType == OrderType.SpotTrade ? SoundOption.DQTradeFailed : SoundOption.LimitTradeFailed);

	        if (result.error) {
	            oIOProxy.ProcessError(result, "ExecuteTransactionResult");
	        }

	        if (oIOProxy.mainWindow.oDisablePopup == 0) {
	            var sMsg = "";
	            if (result.error) {
	                sMsg = "Failed to send order to execute! " + tran2.code;
	            }
	            else {
	                sMsg = oDealingConsole.GetCancelMessage(order2.tran, result.value.ExecuteResult);
	            }
	            var isOK = oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
	        }
	        tran2.Cancel();
	    }
	    else {
	        //Notify user with sound
	        //			oDealingConsole.PlaySound(tran2.orderType== OrderType.SpotTrade ? SoundOption.DQTradeSucceed : SoundOption.LimitTradeSucceed);
	        var msXml = result.value.xmlNode;
	        //msXml.loadXML(result.value.xmlNode.xml);
	        tran2.Success(msXml, oDealingConsole);

	        //Add
	        //			var relationsByCloseOrderIDs = "";
	        //for(var index in tran2.orders)
	        for (var index = 0, iCount = tran2.orders.length; index < iCount; index++) {
	            var order = tran2.orders[index];
	            //				if (order.isOpen == 0) {
	            //				    relationsByCloseOrderIDs += "<CloseOrderID ID='" + order.id + "'></CloseOrderID>";
	            //				}
	            //				else {
	            if (order.isOpen) {
	                if (order.mainWindow.oOpenIdToCloseId.Exists(order.id)) {
	                    var closeIds = order.mainWindow.oOpenIdToCloseId.Item(order.id);
	                    var closeIds2 = (new VBArray(closeIds.Keys())).toArray();
	                    for (var index = 0, count = closeIds2.length; index < count; index++) {
	                        var closeId = closeIds2[index];
	                        var closeOrder = order.mainWindow.GetOrderById(closeId);
	                        if (closeOrder != null) {
	                            //order.mainWindow.parent.orderTaskFrm.AddLmtMktOrderToGrid(closeOrder);
	                            closeOrder.CheckWhenOrderArrive(true);
	                        }
	                    }
	                }
	            }
	        }
	        //			if (relationsByCloseOrderIDs != "")
	        //			{
	        //				oDealingConsole.GetRelationsByCloseOrderID(relationsByCloseOrderIDs);
	        //			}
	    }
	    oIOProxy.Calls.Remove(result.id);
	}

//    //unused
//	this.UpdateOrder = function (orders) {
//	    var iCallID = Service.SrvTest.callService(UpdateOrderResult, "UpdateOrder", orders);
//	};
//	function UpdateOrderResult(result)
//	{
//		if(result.error) oIOProxy.ProcessError(result,"UpdateOrderResult");
//	}

	this.SendEnquiry = function (enquirys) {
	    var sXml = null;
	    var instrumentId = "";
	    var instrumentCode = "";
	    var eventMessages = "";
	    for (var index in enquirys) {
	        var enquiry2 = enquirys[index];
	        if (!sXml) {
	            instrumentId = enquiry2.instrument.id;
	            instrumentCode = enquiry2.instrument.code;
	            sXml = "<Instrument ID=\"" + instrumentId + "\"" +
					" Origin=\"" + enquiry2.origin + "\">";
	        }
	        sXml += "<Customer ID=\"" + enquiry2.customer.id + "\"" +
					" Ask=\"" + enquiry2.ask + "\"" +
					" Bid=\"" + enquiry2.bid + "\"" +
					" QuoteLot=\"" + enquiry2.lot + "\"" +
					" AnswerLot=\"" + enquiry2.answerLot +
					"\"/>";
	        var eventMessage = "CustomerCode=" + enquiry2.customer.code
                + ",Instrument=" + enquiry2.instrument.code
                + ",Ask=" + enquiry2.ask
                + ",Bid=" + enquiry2.bid
                + ",AnswerLot=" + enquiry2.answerLot;
	        eventMessages += (eventMessages != "" ? ";\n" : "") + eventMessage;
	    }
	    if (sXml) {
	        sXml += "</Instrument>";

	        sXml = sXml.replace(/</g, "&lt;");
	        sXml = sXml.replace(/>/g, "&gt;");
	        var iCallID = Service.SrvTest.callService(AnswerResult, "Answer", sXml, instrumentId, instrumentCode, eventMessages);
	    }
	};

	this.SendEnquiry2 = function (sXml, instrumentId, instrumentCode, eventMessages) {
	    var iCallID = Service.SrvTest.callService(AnswerResult, "Answer", sXml, instrumentId, instrumentCode, eventMessages);
	};
	
	function AnswerResult(result)
	{
		if(result.error) oIOProxy.ProcessError(result,"AnswerResult");
	}
		
	this.lastGetSystemTime;
	this.systemTimeSpan = 0;
	this.GetSystemTime = function () {
	    var now = new Date();
	    //Modified by Michael on 2003-09-30
	    if (!this.mainWindow.oSystemTime || !this.lastGetSystemTime || now - this.lastGetSystemTime > 900000)	//1000*60*15
	    {
	        var iCallID = Service.SrvTest.callService(GetSystemTimeResult, "GetSystemTime");
	    }
	    else {
	        this.mainWindow.oSystemTime = new Date(now.valueOf() - this.systemTimeSpan);
	        var displayTime = this.mainWindow.oSystemTime;
	        this.mainWindow.parent.status = this.mainWindow._LoggedInfo + "   Now: " + displayTime.toLocaleString();
	    }
	};
	function GetSystemTimeResult(result) {	    
		var mainWindow = oIOProxy.mainWindow;
		if(result.error || !result.value)
		{
			if (result.error) oIOProxy.ProcessError(result,"GetSystemTimeResult");
			if(!mainWindow.oSystemTime) oIOProxy.GetSystemTime();
		}
		else
		{
		    oIOProxy.lastGetSystemTime = new Date();
		    mainWindow.oSystemTime = new Date(result.value);
			oIOProxy.systemTimeSpan = (new Date()).valueOf() - mainWindow.oSystemTime.valueOf();
			var displayTime = mainWindow.oSystemTime;
			mainWindow.parent.status = mainWindow._LoggedInfo + "   Now: " + displayTime.toLocaleString();
			if(mainWindow.IsReGetInitData == true)
			{
				mainWindow.IsReGetInitData = false;
				//oIOProxy.GetInitData();
				oIOProxy.GetInitDataXml3();
			}
		}
	}

	this.Logout = function () {
	    var iCallID = Service.SrvTest.callService(GetLogoutResult, "Logout");
	};
	function GetLogoutResult(result)
	{
		//if (result.error) oIOProxy.ProcessError(result,"GetLogoutResult");
	}

	this.SyncGetAccount = function (id) {
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    //callObj.params = new Array();
	    //callObj.params.id = id;
	    callObj.funcName = "GetAccount";
	    //callObj.SOAPHeader = new Array();
	    //callObj.SOAPHeader[0] = new Object();

	    var result = Service.SrvTest.callService(callObj, id);

	    if (!result.error && result.value && result.value.xml) {
	        var msXml = result.value;
	        oDealingConsole.AddAccount(msXml);
	    } 
//        else {
//	        alert("Soap not available!");
//	    }
	};

	this.GetAccount = function (id) {
	    var iCallID = Service.SrvTest.callService(GetAccountResult, "GetAccount", id);
	};
	function GetAccountResult(result)
	{
		if(result.error)
		{
			oIOProxy.ProcessError(result,"GetAccountResult");
		}
		else
		{
			if(result.value && result.value.xml)
			{
				var msXml = result.value;
				oDealingConsole.GetAccount(msXml);
			}
		}
	}

	this.SyncGetCustomer = function (id) {
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    //callObj.params = new Array();
	    //callObj.params.id = id;
	    callObj.funcName = "GetCustomer";
	    //callObj.SOAPHeader = new Array();
	    //callObj.SOAPHeader[0] = new Object();

	    var result = Service.SrvTest.callService(callObj, id);

	    if (!result.error && result.value && result.value.xml) {
	        var msXml = result.value;
	        oDealingConsole.AddCustomer(msXml);
	    }
	};

	this.GetCustomer = function (id) {
	    var iCallID = Service.SrvTest.callService(GetCustomerResult, "GetCustomer", id);
	};
	
	function GetCustomerResult(result)
	{
		if(result.error)
		{
			oIOProxy.ProcessError(result,"GetCustomerResult");
		}
		else
		{
			if(result.value && result.value.xml)
			{
				var msXml = result.value;
				oDealingConsole.GetCustomer(msXml);
			}
		}
	}

	this.GetInstrumentForSetting = function () {
	    var iCallID = Service.SrvTest.callService(GetInstrumentForSettingResult, "GetInstrumentForSetting");
	};
	function GetInstrumentForSettingResult(result)
	{
		var optionWnd = oIOProxy.mainWindow.parent.toolBarFrm.oWndOption;
		if(result.error)
		{
			oIOProxy.ProcessError(result,"GetInstrumentForSettingResult");
			
			if (optionWnd == null || optionWnd.closed == true) optionWnd = oIOProxy.mainWindow.parent;
			optionWnd.showModalDialog("Alert.aspx", "GetInstrumentSetting error!","status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
		}
		else
		{
			if(result.value && result.value.xml)
			{
				if (optionWnd == null || optionWnd.closed == true)	return;
				var msXml = result.value;
				optionWnd.DoInstrumentList(msXml);
			}
		}
	}

	this.UpdateInstrumentSettingXml = function (callWin, instrumentIDs) {
	    var iCallID = Service.SrvTest.callService(SetUpdateInstrumentSettingXmlResult, "SetUpdateInstrumentSettingXml", instrumentIDs);
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};

	function SetUpdateInstrumentSettingXmlResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    oIOProxy.Calls.Remove(result.id);

	    if (result.error) {
	        oIOProxy.ProcessError(result, "SetUpdateInstrumentSettingXmlResult");
	        var optionWnd = callWin; //  oIOProxy.mainWindow.parent.toolBarFrm.oWndOption;
	        if (optionWnd == null || optionWnd.closed == true)
	            optionWnd = oIOProxy.mainWindow.parent;
	        optionWnd.showModalDialog("Alert.aspx", "UpdateInstrumentSetting error!", "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
	    }
	    else {
	        oIOProxy.GetDataUpdateInstrumentSettingXml(callWin);
	    }
	    if (!(callWin == null || callWin.closed == true)) {
	        callWin.UpdateInstrumentSettingResult();
	    }
	}

	this.GetDataUpdateInstrumentSettingXml = function (callWin) {
	    var xmlData = null;
	    var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
	    xmlDoc.async = false;
	    xmlDoc.resolveExternals = false;
	    xmlDoc.load("Service.asmx/GetDataUpdateInstrumentSettingXml");
	    if (xmlDoc.parseError.errorCode != 0) {
	        //	        //alert(xmlDoc.parseError.reason);
	        //	        //oIOProxy.ProcessError(result, "UpdateInstrumentSettingXmlResult");
	        //	        var optionWnd = callWin; //  oIOProxy.mainWindow.parent.toolBarFrm.oWndOption;
	        //	        if (optionWnd == null || optionWnd.closed == true) {
	        //	            optionWnd = oIOProxy.mainWindow.parent;
	        //	        }
	        //	        optionWnd.showModalDialog("Alert.aspx", "UpdateInstrumentSettingXml error:" + xmlDoc.parseError.reason, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
	    }
	    else {
	        if (xmlDoc != null) {
	            xmlData = oIOProxy.GetDataRootInDataSetXml(xmlDoc);
	        }
	    }
	    xmlDoc = null;
	    oDealingConsole.UpdateInstrumentSettingXml(xmlData);
	};

//	this.UpdateInstrumentSetting = function (callWin, instrumentIDs) {
//	    var iCallID = Service.SrvTest.callService(UpdateInstrumentSettingResult, "UpdateInstrumentSetting", instrumentIDs);
//	    var oParameters = new Object();
//	    oParameters.callWin = callWin;
//	    oIOProxy.Calls.Add(iCallID, oParameters);
//	};
//	function UpdateInstrumentSettingResult(result) {
//	    var oParameters = oIOProxy.Calls.Item(result.id);
//	    var callWin = oParameters.callWin;

//	    if (result.error) {
//	        oIOProxy.ProcessError(result, "UpdateInstrumentSettingResult");

//	        var optionWnd = callWin;//  oIOProxy.mainWindow.parent.toolBarFrm.oWndOption;
//	        if (optionWnd == null || optionWnd.closed == true)
//	            optionWnd = oIOProxy.mainWindow.parent;
//	        optionWnd.showModalDialog("Alert.aspx", "UpdateInstrumentSetting error!", "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
//	    }
//	    else {
//	        var dataSet = null;
//	        if (result.value && result.value.xml) {
//	            dataSet = new ActiveXObject("DATA.DataSet");
//	            dataSet.Site = window.document;
//	            dataSet.ReadXml(result.value.xml);
//	        }
//	        oDealingConsole.UpdateInstrumentSetting(dataSet);
//	        dataSet = null;
//	    }
//	    if (!(callWin == null || callWin.closed == true)) {
//	        callWin.UpdateInstrumentSettingResult();
//	    }
//	    oIOProxy.Calls.Remove(result.id);
//	}

	this.GetUserListForCopyFrom = function (callWin) {
	    var iCallID = Service.SrvTest.callService(GetUserListForCopyFromResult, "GetUserListForCopyFrom");
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	//Added by Michael on 2008-05-26
	function GetUserListForCopyFromResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;

	    if (result.error) {
	        oIOProxy.ProcessError(result, "GetUserListForCopyFromResult");
	    }
	    else {
	        if (!(callWin == null || callWin.closed == true)) {
	            if (result.value && result.value.xml) {
	                var dataSet = new ActiveXObject("DATA.DataSet");
	                dataSet.Site = window.document;
	                dataSet.ReadXml(result.value.xml);
                    callWin.GetUserListForCopyFromResult(dataSet);
	                dataSet = null;
	            }
	        }
	    }
	    oIOProxy.Calls.Remove(result.id);
	}

	//Include all grid setting, sound setting
	this.GetSettingForCopyFrom = function (callWin, key, fromUserId) {
	    var iCallID = Service.SrvTest.callService(GetSettingForCopyFromResult, "GetSettingForCopyFrom", key, fromUserId);
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oParameters.key = key;
	    oIOProxy.Calls.Add(iCallID, oParameters);

	    //        var callObj = Service.createCallOptions();
	    //        callObj.async = false;
	    //        callObj.funcName = "GetSettingForCopyFrom";

	    //        var result = Service.SrvTest.callService(callObj, key, fromUserId);

	    //        if (!result.error && result.value) {
	    //            if (!(callWin == null || callWin.closed == true)) {
	    //                var msXml = result.value;
	    //                callWin.GetSettingForCopyFromResult(key, msXml);
	    //            }
	    //        }
	    //        else {
	    //            alert("No Data for selected user!");
	    //        }
	};
	function GetSettingForCopyFromResult(result) {	    
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    var key = oParameters.key;
	    
	    if (result.error) {
	        oIOProxy.ProcessError(result, "GetSettingForCopyFromResult");
	    }
	    else {	        
	        if (!(callWin == null || callWin.closed == true))
	            callWin.GetSettingForCopyFromResult(key, result.value);
	    }
	    oIOProxy.Calls.Remove(result.id);
	}

//	this.LoadSystemParameters = function ()
//	{
//		var iCallID = Service.SrvTest.callService(LoadSystemParametersResult, "LoadSystemParameters");
//	};
//	function LoadSystemParametersResult(result)
//	{
//		if(result.error)
//		{
//			oIOProxy.ProcessError(result,"LoadSystemParametersResult");
//		}
//		else
//		{
//			oDealingConsole.LoadSystemParameter(result.value);
//		}
//    }

	this.LoadSystemParameters = function () {
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    callObj.funcName = "LoadSystemParameters";

	    var result = Service.SrvTest.callService(callObj);

	    if (!result.error && result.value) {
	        var msXml = result.value;
	        oDealingConsole.LoadSystemParameter(msXml);
	    }
	};

	this.UpdateSystemParameters = function (sXml) {
	    oIOProxy.Debug2("UpdateSystemParameters", sXml);

	    sXml = sXml.replace(/</g, "&lt;");
	    sXml = sXml.replace(/>/g, "&gt;");
	    var iCallID = Service.SrvTest.callService(UpdateSystemParametersResult, "UpdateSystemParameters", sXml);
	};
	function UpdateSystemParametersResult(result)
	{
		if(result.error || result.value == false)
		{
			if(result.error) oIOProxy.ProcessError(result,"UpdateSystemParametersResult");			
			alert("UpdateSystemParameters Failed!");
		}
	}

	this.UpdateEnquiryOutTime = function (enquiryOutTime) {
	    var iCallID = Service.SrvTest.callService(UpdateEnquiryOutTimeResult, "UpdateEnquiryOutTime", enquiryOutTime);
	};
	function UpdateEnquiryOutTimeResult(result)
	{
		if(result.error || result.value == false)
		{
			if(result.error) oIOProxy.ProcessError(result,"UpdateEnquiryOutTimeResult");			
			alert("UpdateEnquiryOutTime Failed!");
		}
	}

	this.DiscardOriginQuotation = function (instrumentID, eventMessage) {
	    var iCallID = Service.SrvTest.callService(DiscardOriginQuotationResult, "DiscardQuotation", instrumentID, oIOProxy.ReplaceSpecialChar(eventMessage));
	};
	function DiscardOriginQuotationResult(result)
	{
		if(result.error) oIOProxy.ProcessError(result,"DiscardOriginQuotationResult");
	}

	this.DiscardTaskCountTimerTimeoutWriteLog = function (instrumentID, eventMessage) {
	    var iCallID = Service.SrvTest.callService(DiscardTaskCountTimerTimeoutWriteLogResult, "DiscardTaskCountTimerTimeoutWriteLog", instrumentID, oIOProxy.ReplaceSpecialChar(eventMessage));
	};
	function DiscardTaskCountTimerTimeoutWriteLogResult(result) {
	    if (result.error) oIOProxy.ProcessError(result, "DiscardTaskCountTimerTimeoutWriteLogResult");
    }

    this.GetRelationsByCloseOrderID = function (relationsByCloseOrderIDs) {
        relationsByCloseOrderIDs = relationsByCloseOrderIDs.replace(/</g, "&lt;");
        relationsByCloseOrderIDs = relationsByCloseOrderIDs.replace(/>/g, "&gt;");
        var iCallID = Service.SrvTest.callService(GetRelationsByCloseOrderIDResult, "GetRelationsByCloseOrderID", relationsByCloseOrderIDs);
    };
	function GetRelationsByCloseOrderIDResult(result)
	{
		if(result.error)
		{
			oIOProxy.ProcessError(result,"GetRelationsByCloseOrderIDResult");
		}
		else
		{
			if (result.value && result.value.xml)
			{
				dataSet = new ActiveXObject("DATA.DataSet");
				dataSet.ReadXml(result.value.xml);
				oDealingConsole.GetRelationsByCloseOrderIDResult(dataSet);
			}	
		}
	}

	this.GetAverageOpenPriceByCloseOrderID = function (callWin, relationsByCloseOrderIDs) {
	    relationsByCloseOrderIDs = relationsByCloseOrderIDs.replace(/</g, "&lt;");
	    relationsByCloseOrderIDs = relationsByCloseOrderIDs.replace(/>/g, "&gt;");
	    var iCallID = Service.SrvTest.callService(GetAverageOpenPriceByCloseOrderIDResult, "GetAverageOpenPriceByCloseOrderID", relationsByCloseOrderIDs);
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function GetAverageOpenPriceByCloseOrderIDResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    oIOProxy.Calls.Remove(result.id);

	    if (result.error) {
	        oIOProxy.ProcessError(result, "GetAverageOpenPriceByCloseOrderIDResult");
	    }
	    else {
	        if (result.value && result.value.xml) {
	            dataSet = new ActiveXObject("DATA.DataSet");
	            dataSet.ReadXml(result.value.xml);
	            if (!(callWin == null || callWin.closed == true)) {
	                callWin.GetAverageOpenPriceByCloseOrderIDResult(dataSet);
                }
	        }
	    }
	}

	this.GetExecutedOrderByInstrument = function (orderSearchUI, instrumentID, orderType, fromDate, tromDate, accountGroupId) {
	    var iCallID = Service.SrvTest.callService(GetExecutedOrderByInstrumentResult, "GetExecutedOrderByInstrument", instrumentID, orderType, fromDate, tromDate, accountGroupId);
	    var oParameters = new Object();
	    oParameters.orderSearchUI = orderSearchUI;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function GetExecutedOrderByInstrumentResult(result)
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		var orderSearchUI = oParameters.orderSearchUI;
		
		if(result.error)
		{
			oIOProxy.ProcessError(result,"GetExecutedOrderByInstrumentResult");
		}
		else {
		    if (!(orderSearchUI == null || orderSearchUI.closed == true)) {
		        if (result.value && result.value.xml) {
		            dataSet = new ActiveXObject("DATA.DataSet");
		            dataSet.Site = window.document;
		            dataSet.ReadXml(result.value.xml);
		            orderSearchUI.GetExecutedOrderByInstrumentResult(dataSet);
		        }
		    }	
		}
		oIOProxy.Calls.Remove(result.id);
	}

	this.GetCancelledOrderByInstrument = function (orderSearchUI, instrumentID, orderType, fromDate, tromDate, accountGroupId) {
	    var iCallID = Service.SrvTest.callService(GetCancelledOrderByInstrumentResult, "GetCancelledOrderByInstrument", instrumentID, orderType, fromDate, tromDate,accountGroupId);
	    var oParameters = new Object();
	    oParameters.orderSearchUI = orderSearchUI;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function GetCancelledOrderByInstrumentResult(result)
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		var orderSearchUI = oParameters.orderSearchUI;
		
		if(result.error)
		{
			oIOProxy.ProcessError(result,"GetCancelledOrderByInstrumentResult");
		}
		else {
		    if (!(orderSearchUI == null || orderSearchUI.closed == true)) {
		        if (result.value && result.value.xml) {
		            dataSet = new ActiveXObject("DATA.DataSet");
		            dataSet.Site = window.document;
		            dataSet.ReadXml(result.value.xml);
		            orderSearchUI.GetCancelledOrderByInstrumentResult(dataSet);
		        }
		    }
		}
		oIOProxy.Calls.Remove(result.id);
	}
	
//	//Added by Michael on 2003-12-05
//	this.CheckOpenOrderWetherLiquidated = function(orderID)
//	{
//		var iCallID = Service.SrvTest.callService(GetCheckOpenOrderWetherLiquidatedResult, "CheckOpenOrderWetherLiquidated", orderID);
//	};
//	function GetCheckOpenOrderWetherLiquidatedResult(result)
//	{
//		if(result.error)
//		{
//			oIOProxy.ProcessError(result,"GetCheckOpenOrderWetherLiquidatedResult");
//		}
//		else
//		{
//			if (result.value) oDealingConsole.GetCheckOpenOrderWetherLiquidatedResult(result.value);
//		}
//	}
	
//	//Added by Michael on 2003-12-05
//	this.Cancel3 = function (tran) {
//	    var iCallID = Service.SrvTest.callService(Cancel3Result, "Cancel", tran.id);
//	    var oParameters = new Object();
//	    oParameters.tran = tran;
//	    oIOProxy.Calls.Add(iCallID, oParameters);
//	};
//	function Cancel3Result(result) {
//	    var oParameters = oIOProxy.Calls.Item(result.id);
//	    var tran = oParameters.tran;

//	    if (result.error || result.value != "OK") {
//	        if (result.error) {
//	            oIOProxy.ProcessError(result, "Cancel3Result");
//	        }
//	        if (oIOProxy.mainWindow.oDisablePopup == 0) {
//	            var sMsg = "";
//	            if (result.error) {
//	                sMsg = "Failed to cancel order! " + tran.code;
//	            }
//	            else {
//	                sMsg = oDealingConsole.GetCancelMessage(tran, result.value);
//	            }
//	            var isOK = oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", sMsg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
//	        }
//	    }
//	    tran.Cancel();

//	    oIOProxy.Calls.Remove(result.id);
//	}

	//Modified by Michael on 2008-05-26
	/*
	this.SetActiveSource = function(callWin,quotationSource)
	{
		var iCallID = Service.SrvTest.callService(SetActiveSourceResult, "SetActiveSource", quotationSource);
		var oParameters = new Object();
		oParameters.callWin= callWin;
		oParameters.quotationSource= quotationSource;
		oIOProxy.Calls.Add(iCallID,oParameters);	
	};
	function SetActiveSourceResult(result)
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		var callWin = oParameters.callWin;
		var quotationSource = oParameters.quotationSource;
		
		if (result.error) 
			oIOProxy.ProcessError(result,"SetActiveSourceResult");
		else			
		{
			if (!result.value)
			{
				if (callWin) callWin.FillQuotationSources();
			}
		}
			
		oIOProxy.Calls.Remove(result.id);
	}
	*/
	
	//Added by Michael on 2008-05-23
	this.SetActiveSourceInstrument = function (sourceInstrumentXml, eventMessageXml) {
	    var sourceInstrumentXml2 = sourceInstrumentXml.replace(/</g, "&lt;");
	    sourceInstrumentXml2 = sourceInstrumentXml2.replace(/>/g, "&gt;");

	    var eventMessageXml2 = eventMessageXml.replace(/</g, "&lt;");
	    eventMessageXml2 = eventMessageXml2.replace(/>/g, "&gt;");

	    var iCallID = Service.SrvTest.callService(SetActiveSourceInstrumentResult, "SetActiveSourceInstrument", sourceInstrumentXml2, eventMessageXml2);
	    var oParameters = new Object();
	    oParameters.sourceInstrumentXml = sourceInstrumentXml;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	//Added by Michael on 2008-05-23
	function SetActiveSourceInstrumentResult(result)
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		var sourceInstrumentXml = oParameters.sourceInstrumentXml;
		
		if (result.error) 
		{
			oIOProxy.ProcessError(result,"SetActiveSourceInstrumentResult");
			sMsg = "Failed to Set Active Source!";
		}
		else			
		{
		    sMsg = (result.value ? "Succeed " : "Failed ") + "to Set Active Source!";
		    if (result.value)
		    {
			    oDealingConsole.SetActiveSourceInstrumentResult(sourceInstrumentXml);
			}
		}
		//if(oIOProxy.mainWindow.oDisablePopup == 0)
		{
			oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", sMsg,"status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
		}
			
		oIOProxy.Calls.Remove(result.id);
    }
	
	//Added by Michael on 2009-01-13
    this.UpdateDealingPolicyDetail = function (callWin, sXml, eventMessages) {
        sXml = sXml.replace(/</g, "&lt;");
        sXml = sXml.replace(/>/g, "&gt;");
        var iCallID = Service.SrvTest.callService(UpdateDealingPolicyDetailResult, "UpdateDealingPolicyDetail", sXml, "DP", oIOProxy.ReplaceSpecialChar(eventMessages));
        var oParameters = new Object();
        oParameters.callWin = callWin;
        oIOProxy.Calls.Add(iCallID, oParameters);
    };
	//Added by Michael on 2009-01-13
	function UpdateDealingPolicyDetailResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    oIOProxy.Calls.Remove(result.id);

        if (result.error || result.value == false) {
            if (result.error) oIOProxy.ProcessError(result, "UpdateDealingPolicyDetailResult");
            if (!(callWin == null || callWin.closed == true)) {
                callWin.AfterSavedProcess(false);
            }
            else {
                alert("Failed to Update Dealing Policy Detail!");
            }
        }
        else {
            if (!(callWin == null || callWin.closed == true)) {
                callWin.AfterSavedProcess(true);
            }
            else {
                alert("Succeed to Update Dealing Policy Detail!");
            }
        }
	}

	this.UpdatePolicyProcess = function (callWin, customerPolicyXml, employeePolicyXml) {
	    customerPolicyXml = customerPolicyXml.replace(/</g, "&lt;");
	    customerPolicyXml = customerPolicyXml.replace(/>/g, "&gt;");
	    employeePolicyXml = employeePolicyXml.replace(/</g, "&lt;");
	    employeePolicyXml = employeePolicyXml.replace(/>/g, "&gt;");
	    var iCallID = Service.SrvTest.callService(UpdatePolicyProcessResult, "UpdatePolicyProcess", customerPolicyXml, employeePolicyXml);
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function UpdatePolicyProcessResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    oIOProxy.Calls.Remove(result.id);

	    if (result.error || result.value == false) {
	        if (result.error) oIOProxy.ProcessError(result, "UpdateCustomerPolicyResult");
	        if (!(callWin == null || callWin.closed == true)) {
	            callWin.AfterSavedProcess(false);
	        }
	        else {
	            alert("Failed to Update Policy Detail!");
	        }
	    }
	    else {
	        if (!(callWin == null || callWin.closed == true)) {
	            callWin.AfterSavedProcess(true);
	        }
	        else {
	            alert("Succeed to Update Policy Detail!");
	        }
	    }
	};

	//Added by Michael on 2009-01-13
	this.UpdateDealingPolicyDetailForSetValue = function (sXml) {
	    sXml = sXml.replace(/</g, "&lt;");
	    sXml = sXml.replace(/>/g, "&gt;");
	    var iCallID = Service.SrvTest.callService(UpdateDealingPolicyDetailForSetValueResult, "UpdateDealingPolicyDetailForSetValue", sXml);
	};
	//Added by Michael on 2009-01-13
	function UpdateDealingPolicyDetailForSetValueResult(result) {
	    if (result.error || result.value == false) {
	        if (result.error) oIOProxy.ProcessError(result, "UpdateDealingPolicyDetailForSetValueResult");
	        alert("Failed to Update Dealing Policy Detail For Set Value!");
	    }
	    else {
	        //alert("Succeed to Update Dealing Policy Detail For Set Value!");
	    }
	}

	this.UpdateSystemParameters2 = function (sXml, objectID) {
	    sXml = sXml.replace(/</g, "&lt;");
	    sXml = sXml.replace(/>/g, "&gt;");
	    var iCallID = Service.SrvTest.callService(GetUpdateSystemParameters2Result, "UpdateSystemParameters2", sXml, objectID);
	};
	function GetUpdateSystemParameters2Result(result)
	{
		if(result.error || result.value == false)
		{
			if(result.error) oIOProxy.ProcessError(result,"GetUpdateSystemParameters2Result");
			alert("UpdateSystemParameters Failed!");
		}
	}

	this.UpdateSystemParameters3 = function (sXml, objectID) {
	    sXml = sXml.replace(/</g, "&lt;");
	    sXml = sXml.replace(/>/g, "&gt;");
	    var iCallID = Service.SrvTest.callService(GetUpdateSystemParameters3Result, "UpdateSystemParameters3", sXml, objectID);
	};
	function GetUpdateSystemParameters3Result(result)
	{
		if(result.error || result.value == false)
		{
			if(result.error) oIOProxy.ProcessError(result,"GetUpdateSystemParameters3Result");
			alert("UpdateSystemParameters Failed!");
		}
	}

	this.ResetHit = function (orderIDs, eventMessageArray, needPrompt) {
	    var iCallID = Service.SrvTest.callService(GetResetHitResult, "ResetHit", orderIDs, eventMessageArray);
	    var oParameters = new Object();
	    oParameters.needPrompt = needPrompt;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function GetResetHitResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var needPrompt = oParameters.needPrompt;

	    if (result.error)// || result.value == false)
	    {
	        if (result.error) oIOProxy.ProcessError(result, "GetResetHitResult");
	        if (needPrompt) alert("Failed to reset hit!");
	    }
	    oIOProxy.Calls.Remove(result.id);
	}
	
	//Added by Michael on 2006-09-28
	this.AcceptPlace = function (tran) {
	    var eventMessageArray = tran.GetEventMessageArray("AcceptPlace", "");
	    var iCallID = Service.SrvTest.callService(GetAcceptPlaceResult, "AcceptPlace", tran.id, tran.code, eventMessageArray);
	    var oParameters = new Object();
	    oParameters.tran = tran;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function GetAcceptPlaceResult(result)
	{
		var oParameters = oIOProxy.Calls.Item(result.id);
		var tran = oParameters.tran;
		
		if(result.error)// || result.value == false)
		{
			oIOProxy.ProcessError(result,"GetAcceptPlaceResult");
			oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", "GetAcceptPlaceResult--RuntimeError","status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
		}
		else
		{
			if (result.value=="OK")
			{
				tran.GetAcceptPlaceResult();
			}
			else
			{
			    if (oIOProxy.mainWindow.oDisablePopup == 0) {
			        var msg = "Failed to AcceptPlace";
			        if (result.value == "InvalidTransactionPhase") {
			            msg = "Order should be accepted or executed";
			            tran.GetAcceptPlaceResult();
			        }
			        else if (result.value == "TransactionNotExists") {
			            msg = "Order should be rejected or canceled";
			            tran.Cancel();
			        }
			        else {
			            msg += " " + result.value;
                    }
			        oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", msg, "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");				
			    }				
			}	
		}
		oIOProxy.Calls.Remove(result.id);
	}

	this.GetAccountComboList = function (callWin, needInitUI) {
	    var iCallID = Service.SrvTest.callService(GetAccountComboListResult, "GetAccountComboList");
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oParameters.needInitUI = needInitUI;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};

	function GetAccountComboListResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    var needInitUI = oParameters.needInitUI;
	    oIOProxy.Calls.Remove(result.id);

	    if (result.error) {
	        oIOProxy.ProcessError(result, "GetAccountComboListResult");
	    }
	    else {
	            if (result.value) {
	                var xmlDoc = new ActiveXObject("MsXml.DOMDocument");
	                xmlDoc.async = false;
	                var succeed = xmlDoc.loadXML(result.value);
	                if (!succeed) {
	                    //alert(xmlDoc.parseError.reason);
	                }
	                else {
	                    var xmlData = oIOProxy.GetDataRootInDataSetXml(xmlDoc);
	                    oDealingConsole.GetAccountComboListResult(xmlData);
	                    if (callWin && !callWin.closed) {
	                        callWin.GetAccountComboListResult(needInitUI);
	                    }
	                }
	                xmlDoc = null;
	            }
	    }
	}

	this.GetDataRootInDataSetXml = function (xmlDoc) {
	    if (!xmlDoc) return null;

	    var node = null;
	    var nodes = xmlDoc.getElementsByTagName("NewDataSet")
	    if (nodes) {
	        node = nodes[0];
	    }
	    return node;
	};

	this.GetUnclosedOrder = function (callWin, accountId) {
	    var iCallID = Service.SrvTest.callService(GetUnclosedOrderResult, "GetUnclosedOrder", accountId);
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oParameters.accountId = accountId;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
	function GetUnclosedOrderResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    var accountId = oParameters.accountId;

	    if (result.error) {
	        oIOProxy.ProcessError(result, "GetUnclosedOrderResult");
	    }
	    else {
	        if (!(callWin == null || callWin.closed == true)) {
	            if (result.value && result.value.xml) {
	                var dataSet = new ActiveXObject("DATA.DataSet");
	                dataSet.Site = window.document;
	                dataSet.ReadXml(result.value.xml);
	                callWin.GetUnclosedOrderResult(accountId,dataSet);

	                dataSet = null;
	            }
	        }
	    }
	    oIOProxy.Calls.Remove(result.id);
	}

	//Added by Michael on 2006-09-28
	this.GetAcountInfo = function (callWin, tran) {

	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    callObj.timeout = 3;
	    callObj.funcName = "GetAcountInfo";

	    var result = Service.SrvTest.callService(callObj, tran.id);

	    if (result.error)// || result.value == false)
	    {
	        oIOProxy.ProcessError(result, "GetAcountInfoResult");
	        oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", "GetAcountInfoResult--RuntimeError", "status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");
	    }
	    else {
	        if (result.value != null) {
	            if (!(callWin == null || callWin.closed == true))
	                callWin.GetAcountInfoResult(tran, result.value);
	        }
	    }
	    //	  
	    //	    var callObj = new Object();
	    //	    callObj.funcName = "GetAcountInfo";      // Name of the remote function.
	    //	    //callObj.portName = "ServiceSoap";    // Name of the port.
	    //	    callObj.async = false;         // A Boolean that specifies the type of call
	    //	    callObj.timeout = 3;         // Timeout for the method call (seconds)
	    //	    callObj.isHTTP = true;
	    //	    callObj.params = tran.id;
	    //	    
	    //	    //var iCallID = Service.SrvTest.callService(GetAcountInfoResult, "GetAcountInfo", tran.id);
	    //	    var iCallID = Service.SrvTest.callService(oIOProxy.GetAcountInfoResult, callObj);

	    //	    var oParameters = new Object();
	    //	    oParameters.callWin = callWin;
	    //	    oParameters.tran = tran;
	    //	    oIOProxy.Calls.Add(iCallID, oParameters);
	};
//	function GetAcountInfoResult(result) {	
//	
//		var oParameters = oIOProxy.Calls.Item(result.id);
//		var callWin = oParameters.callWin;
//		var tran = oParameters.tran;
//		
//		if(result.error)// || result.value == false)
//		{
//			oIOProxy.ProcessError(result,"GetAcountInfoResult");	
//			oIOProxy.mainWindow.parent.showModalDialog("Alert.aspx", "GetAcountInfoResult--RuntimeError","status:no;help:no; resizable:no; scroll:no; center:yes; dialogWidth:200px;dialogHeight:200px");	
//		}
//		else
//		{		
//			if (result.value!=null)
//			{
//				if (!(callWin == null || callWin.closed == true))
//				    callWin.GetAcountInfoResult(tran,result.value);
//			}			
//		}
//		oIOProxy.Calls.Remove(result.id);
	//	}

	this.GetUpdateHighLowBatchProcessInfos = function(callWin)
	{
	    var iCallID = Service.SrvTest.callService(GetUpdateHighLowBatchProcessInfosResult, "GetUpdateHighLowBatchProcessInfos");
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};

	function GetUpdateHighLowBatchProcessInfosResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    oIOProxy.Calls.Remove(result.id);

	    if (result.error) {
	        oIOProxy.ProcessError(result, "GetUpdateHighLowBatchProcessInfosResult");
	    }
	    else {
	        if (result.value) {
	            var xmlDoc = new ActiveXObject("MsXml.DOMDocument");
	            xmlDoc.async = false;
	            var succeed = xmlDoc.loadXML(result.value);
	            if (!succeed) {
	                alert(xmlDoc.parseError.reason);
	            }
	            else {
	                var xmlData = oIOProxy.GetDataRootInDataSetXml(xmlDoc);
	                oDealingConsole.GetUpdateHighLowBatchProcessInfosResult(xmlData);
	                if (callWin && !callWin.closed) {
	                    callWin.GetUpdateHighLowBatchProcessInfosResult(xmlData);
	                }
	            }
	            xmlDoc = null;
	        }
	    }
	}

	this.UpdateHighLow = function (callWin, instrumentId, isOriginHiLo, newInput, isUpdateHigh, instrument, newInputPrice, adjustPrice2, oldValue) {
	    var iCallID = Service.SrvTest.callService(UpdateHighLowResult, "UpdateHighLow", instrumentId, isOriginHiLo, newInput, isUpdateHigh);
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oParameters.instrumentId = instrumentId;
	    oParameters.isOriginHiLo = isOriginHiLo;
	    oParameters.newInput = newInput;
	    oParameters.isUpdateHigh = isUpdateHigh;
	    oParameters.instrument = instrument;
	    oParameters.newInputPrice = newInputPrice;
	    oParameters.adjustPrice2 = adjustPrice2;
	    oParameters.oldValue = oldValue;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};

	function UpdateHighLowResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    var instrumentId = oParameters.instrumentId;
	    var isOriginHiLo = oParameters.isOriginHiLo;
	    var newInput = oParameters.newInput;
	    var isUpdateHigh = oParameters.isUpdateHigh;
	    var instrument = oParameters.instrument;
	    var newInputPrice = oParameters.newInputPrice;
	    var adjustPrice2 = oParameters.adjustPrice2;
	    var oldValue = oParameters.oldValue;
	    oIOProxy.Calls.Remove(result.id);

	    var isSucceed = false;
	    if (result.error) {
	        oIOProxy.ProcessError(result, "UpdateHighLowResult");
	    }
	    else {
	        if (result.value) {	            
	            var returnValue = result.value.returnValue;
	            var errorMessage = result.value.errorMessage;
	            if (returnValue != 0) {
	                alert(errorMessage);
	            }
	            else {
	                var batchProcessId = result.value.batchProcessId; //1
	                var instrumentCode = result.value.instrumentCode; //"CHF/JPY"
	                var highBid = result.value.highBid; //true
	                var lowBid = result.value.lowBid; //true	            
	                var updateTime = result.value.updateTime; //Tue Nov 8 09:57:02 UTC+0800 2011
	                var alertMessage = "Succeed to Update " + (isUpdateHigh ? "High" : "Low") + "! InstrumentCode: " + instrumentCode + ", Price at " + newInput;
                    if (!isOriginHiLo) { 
                        oDealingConsole.UpdateHighLowResult(batchProcessId, instrumentId, instrumentCode, newInput, isUpdateHigh, highBid, lowBid, updateTime);
	                
	                    if (oIOProxy.mainWindow.parent.toolBarFrm.onWndUpdateHistoryQuotation && !oIOProxy.mainWindow.parent.toolBarFrm.onWndUpdateHistoryQuotation.closed) {
	                        oIOProxy.mainWindow.parent.toolBarFrm.onWndUpdateHistoryQuotation.FillRestoreHighLowSelect();
	                    }
	                    alertMessage += ", BatchProcessId: " + batchProcessId.toString();
	                }

	                isSucceed = true;
	                alert(alertMessage);
	            }
	        }
	    }
	    if (callWin && !callWin.closed) {
	        callWin.UpdateHighLowResult(isSucceed, instrument, newInput, isUpdateHigh, newInputPrice, adjustPrice2, oldValue, result);
	    }
	}
    
    //Receive Update QuotePolicy Notify.....
	this.GetQuotePolicyTotalBuySellLot = function (callWin, instrument) {
	    var iCallID = Service.SrvTest.callService(GetQuotePolicyTotalBuySellLotResult, "GetQuotePolicyTotalBuySellLot", instrument.id);
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
	    oParameters.instrument = instrument;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};

	function GetQuotePolicyTotalBuySellLotResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
	    var instrument = oParameters.instrument;
	    oIOProxy.Calls.Remove(result.id);

	    var isSucceed = false;
	    if (result.error) {
	        oIOProxy.ProcessError(result, "GetQuotePolicyTotalBuySellLotResult");
	    }
	    else {
	        if (result.value) {
	            var xmlDoc = new ActiveXObject("MsXml.DOMDocument");
	            xmlDoc.async = false;
	            var succeed = xmlDoc.loadXML(result.value);
	            if (!succeed) {
	                alert(xmlDoc.parseError.reason);
	            }
	            else {
	                var xmlData = oIOProxy.GetDataRootInDataSetXml(xmlDoc);
	                oDealingConsole.GetQuotePolicyTotalBuySellLotResult(instrument, xmlData);
	                if (callWin && !callWin.closed) {
	                    callWin.GetQuotePolicyTotalBuySellLotResult(instrument, xmlData);
	                }
	            }
	            xmlDoc = null;
	        }
	    }
	}

	//public int RestoreHighLow(int batchProcessId, out Guid instrumentId, out string instrumentCode, out string newInput, out bool isUpdateHigh, out string highBid, out string lowBid, out string errorMessage)
	this.RestoreHighLow = function(callWin, batchProcessId) {
	    var iCallID = Service.SrvTest.callService(RestoreHighLowResult, "RestoreHighLow",batchProcessId);
	    var oParameters = new Object();
	    oParameters.callWin = callWin;
        oParameters.batchProcessId = batchProcessId;
	    oIOProxy.Calls.Add(iCallID, oParameters);
	};

	function RestoreHighLowResult(result) {
	    var oParameters = oIOProxy.Calls.Item(result.id);
	    var callWin = oParameters.callWin;
        var batchProcessId = oParameters.batchProcessId;
	    oIOProxy.Calls.Remove(result.id);

	    var isSucceed = false;
	    if (result.error) {
	        oIOProxy.ProcessError(result, "RestoreHighLowResult");
	    }
	    else {
	        if (result.value) {
	            var returnValue = result.value.returnValue;
	            var errorMessage = result.value.errorMessage;
	            if (returnValue != 0) {
	                alert(errorMessage);
	            }
	            else {
	                var instrumentId = result.value.instrumentId;
	                var instrumentCode = result.value.instrumentCode;
	                var newInput = result.value.newInput;
	                var isUpdateHigh = result.value.isUpdateHigh;
	                var highBid = result.value.highBid;
	                var lowBid = result.value.lowBid;
	                oDealingConsole.RestoreHighLowResult(batchProcessId, instrumentId);

	                //oDealingConsole.mainWindow.RestoreHighLowResult(batchProcessId, instrumentId, newInput, isUpdateHigh, highBid, lowBid, result);

	                isSucceed = true;
	                alert("Succeed to Restore " + (isUpdateHigh ? "High" : "Low") + "! InstrumentCode: " + instrumentCode + ", BatchProcessId: " + batchProcessId.toString());
	            }
	        }
	    }
	    if (callWin && !callWin.closed) {
	        callWin.RestoreHighLowResult(isSucceed, batchProcessId, result);
	    }
	}

	this.SyncGetHasAccountPermission = function (accountId) {
	    var callObj = Service.createCallOptions();
	    callObj.async = false;
	    callObj.funcName = "HasAccountPermission";

	    var result = Service.SrvTest.callService(callObj, accountId);

	    if (!result.error && result.value) {
	        return result.value;
	    }
	    else {
	        return false;
	    }
	};
}
