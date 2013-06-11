var setting;
var limit;
var copyFrom;

function OptionInit() {
    OptionInstrumentInit();
	//OptionPropertyInit();
	OptionParameterInit();
	OptionSoundInit();
	SetValueInit();
	
	setting = new Setting2();
	setting.Init();	
	
	limit = new Limit();
	limit.Init();
	
	SourceInstrumentInit();

	GetActiveSourceInstrument();

	copyFrom = new CopyFrom(setting);
	copyFrom.Init();
}

function Limit()
{
    this.Init = function () {
        window.txtSpreed.disabled = !(window.dialogArguments.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter("SpreadPoints"));

        selectGridInit(window.InstrumentSelectGrid);
        this.OnReset();
    };

    this.FillSelect = function (control, elementInnerText, elementValue) {
        var element = document.createElement("OPTION");
        control.add(element);
        element.innerText = elementInnerText;
        element.value = elementValue;
    };

    this.btnSaveLimit_OnClick = function () {
        //try
        {
            var settingsKey = window.InstrumentSelectGrid.Cell(flexcpText, 0, 0);
            if (settingsKey == "") {
                alert("Please select a item!");
                return;
            }
            var xml = this.GetXml();
            if (xml && xml != "") {
                window.dialogArguments.parent.quotationFrm.oDealingConsole.UpdateSettings(settingsKey, xml);
                //Save Data
                window.dialogArguments.parent.quotationFrm.oDealingConsole.UpdateSystemParameters3(xml, settingsKey);
            }
        }
        //catch(e)
        { }
    };

    this.GetXml = function () {
        var xml = "<Instrument ";
        xml += "Limit1=\"" + window.txtLimit1.value + "\" ";
        xml += "Limit2=\"" + window.txtLimit2.value + "\" ";
        xml += "Limit3=\"" + window.txtLimit3.value + "\" ";
        xml += "Spread=\"" + window.txtSpreed.value + "\" ";

        var parameter = "";
        var settingsKey = window.InstrumentSelectGrid.Cell(flexcpText, 0, 0);
        if (settingsKey == "") return "";
        if (window.dialogArguments.parent.quotationFrm.settings.Exists(settingsKey) == true) {
            parameter = window.dialogArguments.parent.quotationFrm.settings.Item(settingsKey).Parameter;
            if (parameter != "") {
                var msXml = new ActiveXObject("MSXML.DOMDocument");
                msXml.loadXML(parameter);
                if (!msXml) {
                    parameter = "";
                }
                else {
                    var nodeName;
                    var nodeValue;
                    var pNode = msXml.firstChild;
                    for (var j = 0; j < pNode.attributes.length; j++) {
                        nodeName = pNode.attributes.item(j).nodeName;
                        nodeValue = pNode.getAttribute(nodeName);
                        switch (nodeName) {
                            case "LimitLevel":
                                xml += "LimitLevel=\"" + nodeValue + "\" ";
                                break;
                            case "LimitTradeDay":
                                xml += "LimitTradeDay=\"" + nodeValue + "\" ";
                                break;
                        }
                    }
                }
            }
        }
        if (parameter == "") {
            xml += "LimitLevel=\"\" ";
            xml += "LimitTradeDay=\"\" ";
        }

        xml += ">";
        xml += "</Instrument>";

        return xml;
    };

    this.RefreshInstrumentListForLimit_OnClick = function () {
        window.dialogArguments.parent.quotationFrm.oDealingConsole.setInstrumentComboString();
        this.OnReset();
    };

    this.OnReset = function () {
        window.InstrumentSelectGrid.ColComboList(0) = window.dialogArguments.parent.quotationFrm.oDealingConsole.getInstrumentComboString(false, "", false);
        //window.InstrumentSelectGrid.focus();
        window.InstrumentSelectGrid.select(0, 0);
    };

    this.InstrumentSelectGridAfterEdit = function (row, col) {
        this.FillValue();

        window.txtPreviousClosePrice.value = "";
        var settingsKey = window.InstrumentSelectGrid.Cell(flexcpText, 0, 0);
        if (settingsKey == "") return;
        var quoteFrm = window.dialogArguments.parent.quotationFrm;
        if (!quoteFrm) return;
        if (quoteFrm.oInstruments.Exists(settingsKey)) {
            var previousClosePrice = quoteFrm.oInstruments.Item(settingsKey).previousClosePrice;
            window.txtPreviousClosePrice.value = (previousClosePrice == null) ? "" : previousClosePrice.ToString();
        }
    };

    this.FillDefaultValue = function () {
        window.txtLimit1.value = "";
        window.txtLimit2.value = "";
        window.txtLimit3.value = "";

        if (!window.txtSpreed.disabled) {
            window.txtSpreed.value = "";
        }
    };

    this.FillValue = function () {
        //try
        {
            var settingsKey = window.InstrumentSelectGrid.Cell(flexcpText, 0, 0);
            if (settingsKey == "") return;

            var parameter = "";
            var quoteFrm = window.dialogArguments.parent.quotationFrm;
            if (!quoteFrm) {
                this.FillDefaultValue();
                return;
            }
            if (quoteFrm.settings.Exists(settingsKey)) {
                parameter = quoteFrm.settings.Item(settingsKey).Parameter;
                if (parameter == "") {
                    this.FillDefaultValue();
                    return;
                }
                var msXml = new ActiveXObject("MSXML.DOMDocument");
                msXml.loadXML(parameter);
                if (!msXml) return;

                var nodeName;
                var nodeValue;
                var pNode = msXml.firstChild;
                for (var j = 0; j < pNode.attributes.length; j++) {
                    nodeName = pNode.attributes.item(j).nodeName;
                    nodeValue = pNode.getAttribute(nodeName);
                    switch (nodeName) {
                        case "Limit1":
                            window.txtLimit1.value = nodeValue;
                            break;
                        case "Limit2":
                            window.txtLimit2.value = nodeValue;
                            break;
                        case "Limit3":
                            window.txtLimit3.value = nodeValue;
                            break;
                        case "Spread":
                            window.txtSpreed.value = nodeValue;
                            break;
                    }
                }
            }
            else {
                this.FillDefaultValue();
            }
        }
        //catch(ex)
        { }
    };
	
}

function SetValueInit()
{
	var instrumentPropertyLanguage = window.dialogArguments.parent.quotationFrm.instrumentPropertyLanguage;
	
	window.document.all.lblOriginInactiveTime.innerText = instrumentPropertyLanguage.OriginInactiveTime;
	window.document.all.lblAlertVariation.innerText = instrumentPropertyLanguage.AlertVariation;
	window.document.all.lblNormalWaitTime.innerText = instrumentPropertyLanguage.NormalWaitTime;
	window.document.all.lblAlertWaitTime.innerText = instrumentPropertyLanguage.AlertWaitTime;
	window.document.all.lblMaxDQLot.innerText = instrumentPropertyLanguage.MaxDQLot;
	window.document.all.lblMaxOtherLot.innerText = instrumentPropertyLanguage.MaxOtherLot;
	window.document.all.lblDQQuoteMinLot.innerText = instrumentPropertyLanguage.DQQuoteMinLot;
	window.document.all.lblAutoDQMaxLot.innerText = instrumentPropertyLanguage.AutoDQMaxLot;
	window.document.all.lblAutoLmtMktMaxLot.innerText = instrumentPropertyLanguage.AutoLmtMktMaxLot;
	window.document.all.lblAcceptDQVariation.innerText = instrumentPropertyLanguage.AcceptDQVariation;
	window.document.all.lblAcceptLmtVariation.innerText = instrumentPropertyLanguage.AcceptLmtVariation;
	window.document.all.lblCancelLmtVariation.innerText = instrumentPropertyLanguage.CancelLmtVariation;
	window.document.all.lblMaxMinAdjust.innerText = instrumentPropertyLanguage.MaxMinAdjust;
	window.document.all.lblIsBetterPrice.innerText = instrumentPropertyLanguage.IsBetterPrice;
	window.document.all.lblAutoAcceptMaxLot.innerText = instrumentPropertyLanguage.AutoAcceptMaxLot;
	window.document.all.lblAutoCancelMaxLot.innerText = instrumentPropertyLanguage.AutoCancelMaxLot;
	window.document.all.lblAllowAddNewPosition.innerText = instrumentPropertyLanguage.AllowedNewTradeSides;	
	window.document.all.lblHitTimes.innerText = instrumentPropertyLanguage.HitTimes;
	window.document.all.lblPenetrationPoint.innerText = instrumentPropertyLanguage.PenetrationPoint;
	window.document.all.lblPriceValidTime.innerText = instrumentPropertyLanguage.PriceValidTime;
	window.document.all.lblLastAcceptTimeSpan.innerText = instrumentPropertyLanguage.LastAcceptTimeSpan;
	window.document.all.lblAutoDQDelay.innerText = instrumentPropertyLanguage.AutoDQDelay;
	window.document.all.lblAcceptCloseLmtVariation.innerText = instrumentPropertyLanguage.AcceptCloseLmtVariation;
	window.document.all.lblHitPriceVariationForSTP.innerText = instrumentPropertyLanguage.HitPriceVariationForSTP;

	SetDealerParameterEditable();
	
	FillDefaultValue();
}

//Grid init
function OptionInstrumentInit() {
    var commonLanguage = window.dialogArguments.parent.quotationFrm.commonLanguage;
    with (vsflexItemSource) {
        //Fill ColKey
        Rows = 1;
        FixedRows = 1;
        FixedCols = 0;
        Cols = 3;

        TextMatrix(0, 0) = commonLanguage["Select"]; //"Select";
        ColKey(0) = "Select";
        ColDataType(0) = flexDTBoolean;

        TextMatrix(0, 1) = commonLanguage["Instrument"]; //"Instrument";
        ColKey(1) = "Instrument";

        TextMatrix(0, 2) = "OriginCode";
        ColKey(2) = "OriginCode";
        ColHidden(2) = true;

        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSort;
    }
    with (vsflexItemSelected) {
        //Fill ColKey
        Rows = 1;
        FixedRows = 1;
        FixedCols = 0;
        Cols = 3;

        TextMatrix(0, 0) = commonLanguage["Select"]; //"Select";
        ColKey(0) = "Select";
        ColDataType(0) = flexDTBoolean;

        TextMatrix(0, 1) = commonLanguage["Instrument"]; //"Instrument";
        ColKey(1) = "Instrument";

        TextMatrix(0, 2) = "OriginCode";
        ColKey(2) = "OriginCode";
        ColHidden(2) = true;

        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExSort;
    }

    vsflexItemSelected.Redraw = false;
    var instrumentSortByCodes = (new VBArray(window.dialogArguments.parent.quotationFrm.oInstrumentList.Items())).toArray();
    for (var index = 0, count = instrumentSortByCodes.length; index < count; index++) {
        var instrumentSortByCode = instrumentSortByCodes[index];
        var s = "false" + "\t" + instrumentSortByCode.code + "\t" + instrumentSortByCode.originCode;
        vsflexItemSelected.AddItem(s);
        vsflexItemSelected.RowData(vsflexItemSelected.Rows - 1) = instrumentSortByCode.instrumentId;
    }
    vsflexItemSelected.Redraw = true;
}

//Added by Michael on 2008-05-23
function SourceInstrumentInit()
{
    var columnIndex = 0;
    with (SourceInstrumentGrid)
	{
		//Fill ColKey
		Rows = 1;
		FixedRows = 1;
		FixedCols = 0;
		Cols = 10;
	    
		TextMatrix(0, columnIndex) = "Code";
		ColKey(columnIndex) = "Code";
        ColWidth(columnIndex) = 1100;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		ColDataType(columnIndex) = flexDTString;
		columnIndex ++;
		
		TextMatrix(0, columnIndex) = "Sources";
		ColKey(columnIndex) = "Sources";
		//ColComboList(columnIndex) = "Source1|Source2|Source3|Source1,Source2|Source1,Source3|Source2,Source3|Source1,Source2,Source3";	    
		ColWidth(columnIndex) = 800;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		ColDataType(columnIndex) = flexDTString;
		ColHidden(columnIndex) = true;
	    columnIndex ++;
	    
	    TextMatrix(0, columnIndex) = "Active";
		ColKey(columnIndex) = "ActiveSource";		
	    ColComboList(columnIndex) = "#Source1;1|#Source2;2|#Source3;3";
	    ColWidth(columnIndex) = 1200;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		ColDataType(columnIndex) = flexDTString;
	    columnIndex ++;
	    
	    TextMatrix(0, columnIndex) = "Adjust 1";
		ColKey(columnIndex) = "Source1AdjustedPips";
		ColWidth(columnIndex) = 1050;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		columnIndex ++;
		
		TextMatrix(0, columnIndex) = "Adjust 2";
		ColKey(columnIndex) = "Source2AdjustedPips";
		ColWidth(columnIndex) = 1050;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		columnIndex ++;
		
		TextMatrix(0, columnIndex) = "Adjust 3";
		ColKey(columnIndex) = "Source3AdjustedPips";	
		ColWidth(columnIndex) = 1050;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		columnIndex++;

		TextMatrix(0, columnIndex) = "Adjust 4";
		ColKey(columnIndex) = "Source4AdjustedPips";
		ColWidth(columnIndex) = 1050;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		columnIndex++;

		TextMatrix(0, columnIndex) = "Adjust 5";
		ColKey(columnIndex) = "Source5AdjustedPips";
		ColWidth(columnIndex) = 1050;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		columnIndex++;
		
		TextMatrix(0, columnIndex) = "NumeratorUnit";
		ColKey(columnIndex) = "NumeratorUnit";	
		ColWidth(columnIndex) = 1050;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		ColHidden(columnIndex) = true;
		columnIndex ++;
		
		TextMatrix(0, columnIndex) = "Denominator";
		ColKey(columnIndex) = "Denominator";	
		ColWidth(columnIndex) = 1050;
		FixedAlignment(columnIndex) = flexAlignCenterCenter;
		ColAlignment(columnIndex) = flexAlignLeftCenter;
		ColHidden(columnIndex) = true;
		columnIndex ++;
		
		Cols = columnIndex;
		
		ExtendLastCol = true;
		//AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
		ExplorerBar = flexExSort;
		Editable = flexEDNone;
	}
	
	FillSourceInstrumentGrid();	
}

//Added by Michael on 2008-05-23
function FillSourceInstrumentGrid() {
    var quoteFrm = window.dialogArguments.parent.quotationFrm;
    if (!quoteFrm) return;
    SourceInstrumentGrid.Redraw = false;
    with (SourceInstrumentGrid) {
        var sourceInstruments = (new VBArray(quoteFrm.oSourceInstruments.Items())).toArray();
        var beginRowIndex = SourceInstrumentGrid.Rows;
        SourceInstrumentGrid.Rows += sourceInstruments.length;
        var endRowIndex = SourceInstrumentGrid.Rows;
        for (var i = beginRowIndex; i < endRowIndex; i++) {
            FillSourceInstrument(i, sourceInstruments[i - beginRowIndex]);
        }
    }
    SourceInstrumentGrid.Redraw = true;
}

//Added by Michael on 2008-05-23
function FillSourceInstrument(rowIndex, sourceInstrument)
{
    with (SourceInstrumentGrid)
	{
        TextMatrix(rowIndex,ColIndex("Code")) = sourceInstrument.Get_Code();
        TextMatrix(rowIndex,ColIndex("Sources")) = sourceInstrument.Get_Sources();
        TextMatrix(rowIndex,ColIndex("ActiveSource")) = sourceInstrument.Get_ActiveSource();
        TextMatrix(rowIndex,ColIndex("Source1AdjustedPips")) = sourceInstrument.Get_Source1AdjustedPips();
        TextMatrix(rowIndex,ColIndex("Source2AdjustedPips")) = sourceInstrument.Get_Source2AdjustedPips();
        TextMatrix(rowIndex, ColIndex("Source3AdjustedPips")) = sourceInstrument.Get_Source3AdjustedPips();
        TextMatrix(rowIndex, ColIndex("Source4AdjustedPips")) = sourceInstrument.Get_Source4AdjustedPips();
        TextMatrix(rowIndex, ColIndex("Source5AdjustedPips")) = sourceInstrument.Get_Source5AdjustedPips();
        TextMatrix(rowIndex,ColIndex("NumeratorUnit")) = sourceInstrument.Get_NumeratorUnit();
        TextMatrix(rowIndex, ColIndex("Denominator")) = sourceInstrument.Get_Denominator();

        RowData(rowIndex) = sourceInstrument;
    }
}

//Added by Michael on 2008-05-23
function OnSourceInstrumentGridBeforeRowColChange(oldRow, oldCol, newRow, newCol, cancel) {
    var key = SourceInstrumentGrid.ColKey(newCol);
	switch(key)
	{
		//case "Sources":
		case "ActiveSource":
		case "Source1AdjustedPips":
		case "Source2AdjustedPips":
		case "Source3AdjustedPips":
		case "Source4AdjustedPips":
		case "Source5AdjustedPips":
		    SourceInstrumentGrid.Editable = (window.dialogArguments.parent.quotationFrm.oDealingConsole.CanModifyDealerParameter(key)) ? flexEDKbdMouse : flexEDNone;
			//SourceInstrumentGrid.Editable = flexEDKbdMouse;
			break;			
		default:
			SourceInstrumentGrid.Editable = flexEDNone;
			break;
	}	
}

//Added by Michael on 2008-05-23
function OnSourceInstrumentGridValidateEdit(row, col, cancel)
{
	var newValue = SourceInstrumentGrid.EditText;
	var colKey = SourceInstrumentGrid.ColKey(col);
	switch(colKey)
	{
		//case "Code":
		//case "Sources":
		//case "ActiveSource":
		//    SourceInstrumentGrid.EditText = newValue;
		//    break;
		case "Source1AdjustedPips":
		case "Source2AdjustedPips":
		case "Source3AdjustedPips":
		case "Source4AdjustedPips":
		case "Source5AdjustedPips":
		    var regexExpression = "(-?\\d+)";				
			var regex = new RegExp(regexExpression,"i");
			if(regex.exec(newValue) != null)
			{
				SourceInstrumentGrid.EditText = RegExp.$1;
			}
			else
			{
				SourceInstrumentGrid.EditText = SourceInstrumentGrid.TextMatrix(row, col);
			}
		    break;
	}
}

//Added by Michael on 2008-05-26
function GetActiveSourceInstrument()
{
    window.dialogArguments.parent.quotationFrm.oIOProxy.GetSourceInstrument(this);
}

//Added by Michael on 2008-05-26
function UpdateSourceInstrument()
{
    SourceInstrumentInit();
}

//Added by Michael on 2008-05-23
function SetActiveSourceInstrument()
{
    var msXml = new ActiveXObject("MSXML.DOMDocument");
    var topNode = msXml.createElement("SourceInstruments");
    msXml.appendChild(topNode);

    var sourceXml = new ActiveXObject("MSXML.DOMDocument");
    var sourceTopNode = sourceXml.createElement("EventMessages");
    sourceXml.appendChild(sourceTopNode);
    
    with (SourceInstrumentGrid)
	{
	    for (var rowIndex = FixedRows, iCount = Rows; rowIndex < iCount; rowIndex++) {
	        var code = TextMatrix(rowIndex, ColIndex("Code"));
	        var activeSource = TextMatrix(rowIndex,ColIndex("ActiveSource"));
            var source1AdjustedPips = TextMatrix(rowIndex,ColIndex("Source1AdjustedPips"));
            var source2AdjustedPips = TextMatrix(rowIndex,ColIndex("Source2AdjustedPips"));
            var source3AdjustedPips = TextMatrix(rowIndex,ColIndex("Source3AdjustedPips"));
            var source4AdjustedPips = TextMatrix(rowIndex, ColIndex("Source4AdjustedPips"));
            var source5AdjustedPips = TextMatrix(rowIndex, ColIndex("Source5AdjustedPips"));

            //SourceInstrument	    
            var tempNode = msXml.createElement("SourceInstrument");	
            tempNode.setAttribute("Code", TextMatrix(rowIndex,ColIndex("Code")));
            tempNode.setAttribute("Sources", TextMatrix(rowIndex,ColIndex("Sources")));
            tempNode.setAttribute("ActiveSource", activeSource);
            tempNode.setAttribute("Source1AdjustedPips", source1AdjustedPips);
            tempNode.setAttribute("Source2AdjustedPips", source2AdjustedPips);
            tempNode.setAttribute("Source3AdjustedPips", source3AdjustedPips);
            tempNode.setAttribute("Source4AdjustedPips", source4AdjustedPips);
            tempNode.setAttribute("Source5AdjustedPips", source5AdjustedPips);
            tempNode.setAttribute("NumeratorUnit", TextMatrix(rowIndex,ColIndex("NumeratorUnit")));
            tempNode.setAttribute("Denominator", TextMatrix(rowIndex, ColIndex("Denominator")));
            topNode.appendChild(tempNode);

            var sourceInstrument = RowData(rowIndex);
            var eventMessage = "";
            if (activeSource != sourceInstrument.Get_ActiveSource()) {
                eventMessage += " Source= " + activeSource + " ";
            }
            if (source1AdjustedPips != sourceInstrument.Get_Source1AdjustedPips()) {
                eventMessage += "autopoint1 to " + source1AdjustedPips + " ";
            }
            if (source2AdjustedPips != sourceInstrument.Get_Source2AdjustedPips()) {
                eventMessage += "autopoint2 to " + source2AdjustedPips + " ";
            }
            if (source3AdjustedPips != sourceInstrument.Get_Source3AdjustedPips()) {
                eventMessage += "autopoint3 to " + source3AdjustedPips + " ";
            }
            if (source4AdjustedPips != sourceInstrument.Get_Source4AdjustedPips()) {
                eventMessage += "autopoint4 to " + source4AdjustedPips + " ";
            }
            if (source5AdjustedPips != sourceInstrument.Get_Source5AdjustedPips()) {
                eventMessage += "autopoint5 to " + source5AdjustedPips + " ";
            }
            if (eventMessage != "") {
                eventMessage = code + " sets " + eventMessage;

                var sourceNode = sourceXml.createElement("EventMessage");
                sourceNode.setAttribute("ObjectIDs", "PriceSource");
                sourceNode.setAttribute("EventMessage", eventMessage);
                sourceNode.setAttribute("TransactionCode", code);
                sourceTopNode.appendChild(sourceNode);
            }
        }
    }
    
    var sourceInstrumentXml = topNode.xml;
    msXml = null;

    if (sourceInstrumentXml != "")
    {
        window.dialogArguments.parent.quotationFrm.oIOProxy.SetActiveSourceInstrument(sourceInstrumentXml, sourceTopNode.xml);
    }
}


function OptionPropertyInit() {
    vsflexPropSelected.Redraw = false;
	with (vsflexPropSource)
	{
		//Fill ColKey
		Rows = 1;
		FixedRows = 1;
		FixedCols = 0;
		Cols = 2;
	    
		TextMatrix(0, 0) = "Select";
		ColKey(0) = "Select";
        ColDataType(0) = flexDTBoolean;

		TextMatrix(0, 1) = "Property";
		ColKey(1) = "Property";
	    
		ExtendLastCol = true;
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
		ExplorerBar = flexExSort;
	}
	with (vsflexPropSelected)
	{
		//Fill ColKey
		Rows = 1;
		FixedRows = 1;
		FixedCols = 0;
		Cols = 2;
	    
		TextMatrix(0, 0) = "Select";
		ColKey(0) = "Select";
        ColDataType(0) = flexDTBoolean;

		TextMatrix(0, 1) = "Property";
		ColKey(1) = "Property";
	    
		ExtendLastCol = true;
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
		ExplorerBar = flexExSort;
	}
	var vsflexGrid = window.dialogArguments.parent.quotationFrm.vsflexQuotation;
	for(var index=vsflexGrid.FixedCols; index < vsflexGrid.Cols; index++)
	{
		var colKeyValue = vsflexGrid.ColKey(index);
		if (colKeyValue != "NumeratorUnit" && colKeyValue != "Denominator")
		{
			var property = "\t" + vsflexGrid.TextMatrix(0, index);
			if(vsflexGrid.ColHidden(index) == true)
			{
				vsflexPropSource.AddItem(property);
				vsflexPropSource.RowData(vsflexPropSource.Rows-1) = vsflexGrid.ColKey(index);
			}
			else
			{
				vsflexPropSelected.AddItem(property);
				vsflexPropSelected.RowData(vsflexPropSelected.Rows-1) = vsflexGrid.ColKey(index);
			}
		}	
	}
    vsflexPropSelected.Redraw = true;

	/*
	var vsflexGrid = window.dialogArguments.parent.propertyFrm.vsFlexProperites;
	for(var index=vsflexGrid.FixedRows; index<vsflexGrid.Rows; index++)
	{
		var property = "\t" + vsflexGrid.TextMatrix(index, 0);
		if(vsflexGrid.RowHidden(index) == true)
		{
			vsflexPropSource.AddItem(property);
			vsflexPropSource.RowData(vsflexPropSource.Rows-1) = index; //save index in window.dialogArguments.parent.propertyFrm.vsFlexProperites
		}
		else
		{
			vsflexPropSelected.AddItem(property);
			vsflexPropSelected.RowData(vsflexPropSelected.Rows-1) = index; //save index in window.dialogArguments.parent.propertyFrm.vsFlexProperites
		}
	}
	
	for(var index=vsflexGrid.FixedRows; index<vsflexGrid.Rows; index++)
	{
		var property = "\t" + vsflexGrid.TextMatrix(index, 0);
		if(vsflexGrid.RowHidden(index) == true)
		{
			vsflexPropSource.AddItem(property);
			vsflexPropSource.RowData(vsflexPropSource.Rows-1) = vsflexGrid.RowData(index);
		}
		else
		{
			vsflexPropSelected.AddItem(property);
			vsflexPropSelected.RowData(vsflexPropSelected.Rows-1) = vsflexGrid.RowData(index);
		}
	}
	*/
}

function OptionParameterInit()
{
	var mainWnd = window.dialogArguments.parent.quotationFrm;
	textEnquiry.value = mainWnd.oEnquiryWaitTime;
	window.document.all._ApplyAutoAdjustPointsCheckbox.checked = mainWnd.oApplyAutoAdjustPoints;
	textInactive.value = mainWnd.oInactiveWaitTime;
	window.cmbPriceOrderSetting.value = mainWnd.oPriceOrderSetting;
	window.cmbDisablePopup.value = mainWnd.oDisablePopup;
	window.cmbAutoConfirm.value = mainWnd.oAutoConfirm;
	window.document.all._ApplyToDealingPolicyCheckbox.checked = mainWnd.ApplySetValueToDealingPolicy;
}

function OnInstrumentApply() {
    window.document.all.btnInstrumentApply.disabled = true;
	var vsflexGrid = window.dialogArguments.parent.quotationFrm.vsflexQuotation;
	window.dialogArguments.parent.quotationFrm.oInstrumentList.RemoveAll();
	//var instrumentIDXml = "";
	//var instrumentIDsString = "";
    var instrumentIDs = new Array();
	for(var index=vsflexItemSelected.FixedRows; index<vsflexItemSelected.Rows; index++)
	{
		var id = vsflexItemSelected.RowData(index);
		//instrumentIDXml += "<Item ID=\"" + id + "\" />";
		//instrumentIDsString = (instrumentIDsString == "" ? "" : instrumentIDsString + "|") + id;
		instrumentIDs.push(id);

		var code = vsflexItemSelected.TextMatrix(index, 1);
		var originCode = vsflexItemSelected.TextMatrix(index, 2);
        window.dialogArguments.parent.quotationFrm.oDealingConsole.InstrumentListAddItem(id, index - vsflexItemSelected.FixedRows, code, originCode);
	}
    //instrumentIDXml = "<Items>" + instrumentIDXml + "</Items>";
    //window.dialogArguments.parent.quotationFrm.oIOProxy.UpdateInstrumentSettingXml(this, instrumentIDXml);
    window.dialogArguments.parent.quotationFrm.oIOProxy.UpdateInstrumentSettingXml(this, instrumentIDs); //instrumentIDsString);
}

function UpdateInstrumentSettingResult() {
    window.document.all.btnInstrumentApply.disabled = false;
}

function OnPropertyApply()
{
	/*
	var hiddenPropertys = window.dialogArguments.parent.quotationFrm.oHiddenPropertys;
	hiddenPropertys.splice(0, hiddenPropertys.length);
	for(var index=vsflexPropSource.FixedRows; index<vsflexPropSource.Rows; index++)
	{
		var line = vsflexPropSource.RowData(index);
		var propName = vsflexPropSource.TextMatrix(index, vsflexPropSource.ColIndex("Property"));
		hiddenPropertys.push( new Array(propName,line) );
	}
	window.dialogArguments.parent.propertyFrm.OnSelectChanged( hiddenPropertys );
		
	window.dialogArguments.parent.quotationFrm.oDealingConsole.SaveSystemParameter();
	*/
	var colsArrangements = window.dialogArguments.parent.quotationFrm.oColsArrangements;
	colsArrangements.splice(0, colsArrangements.length);
	for(var index=vsflexPropSelected.FixedRows; index<vsflexPropSelected.Rows; index++)
	{
		//var propName = vsflexPropSelected.TextMatrix(index, vsflexPropSelected.ColIndex("Property"));
		var propName = vsflexPropSelected.RowData(index);
		colsArrangements.push(propName);
	}
	//window.dialogArguments.parent.quotationFrm.RefreshQuotationUIForSetting();
	//window.dialogArguments.parent.propertyFrm.OnSelectChanged( colsArrangements );
	
	window.dialogArguments.parent.quotationFrm.oDealingConsole.SaveSystemParameter();
}

function OnParamApply()
{
	var mainWnd = window.dialogArguments.parent.quotationFrm;
	var value = parseInt(textEnquiry.value);
	if(value > 0)
		mainWnd.oEnquiryWaitTime = value.toString();
	else
		textEnquiry.value = mainWnd.oEnquiryWaitTime;

	mainWnd.oApplyAutoAdjustPoints = window.document.all._ApplyAutoAdjustPointsCheckbox.checked;

	value = parseInt(textInactive.value);
	if(value > 0)
		mainWnd.oInactiveWaitTime = value.toString();
	else
		textInactive.value = mainWnd.oInactiveWaitTime;
		
	mainWnd.oPriceOrderSetting = window.cmbPriceOrderSetting.value;
	mainWnd.oDisablePopup = window.cmbDisablePopup.value;
	mainWnd.oAutoConfirm = window.cmbAutoConfirm.value;	
	//mainWnd.ApplySetValueToDealingPolicy = window.document.all._ApplyToDealingPolicyCheckbox.checked;

	window.dialogArguments.parent.quotationFrm.oDealingConsole.SaveSystemParameter();
	
	window.dialogArguments.parent.quotationFrm.oDealingConsole.UpdateEnquiryOutTime();
}

function OnSelectBeforeRowColChange(vsflexGrid, oldRow, oldCol, newRow, newCol, cancel)
{
	if(0 == newCol)
		vsflexGrid.Editable = flexEDKbdMouse;
	else
		vsflexGrid.Editable = flexEDNone;
}

function OnSelectAll(vsflexGrid1, vsflexGrid2) {
    vsflexGrid2.Redraw = false;
    for (var index = vsflexGrid1.FixedRows; index < vsflexGrid1.Rows; index++) {
        vsflexGrid2.AddItem("");
        vsflexGrid2.TextMatrix(vsflexGrid2.Rows - 1, 1) = vsflexGrid1.TextMatrix(index, 1);
        vsflexGrid2.TextMatrix(vsflexGrid2.Rows - 1, 2) = vsflexGrid1.TextMatrix(index, 2);
        vsflexGrid2.RowData(vsflexGrid2.Rows - 1) = vsflexGrid1.RowData(index);
    }
    vsflexGrid2.Redraw = true;
    vsflexGrid1.Rows = vsflexGrid1.FixedRows;
}

function OnSelect(vsflexGrid1, vsflexGrid2) {
    if (vsflexGrid1.Rows <= vsflexGrid1.FixedRows)
        return;

    //if no selected item then select current item
    var isSelected = false;
    for (var index = vsflexGrid1.FixedRows; index < vsflexGrid1.Rows; index++) {
        if (vsflexGrid1.Cell(flexcpChecked, index, 0) == flexChecked) {
            isSelected = true;
            break;
        }
    }
    if (isSelected == false) {
        vsflexGrid1.Cell(flexcpChecked, (vsflexGrid1.Row < 1 ? vsflexGrid1.FixedRows : vsflexGrid1.Row), vsflexGrid1.ColIndex("Select")) = flexChecked;
    }
    //Add selected item to vsflexGrid2
    vsflexGrid2.Redraw = false;
    for (index = vsflexGrid1.FixedRows; index < vsflexGrid1.Rows; index++) {
        if (vsflexGrid1.Cell(flexcpChecked, index, 0) == flexChecked) {
            vsflexGrid2.AddItem("");
            vsflexGrid2.TextMatrix(vsflexGrid2.Rows - 1, 1) = vsflexGrid1.TextMatrix(index, 1);
            vsflexGrid2.TextMatrix(vsflexGrid2.Rows - 1, 2) = vsflexGrid1.TextMatrix(index, 2);
            vsflexGrid2.RowData(vsflexGrid2.Rows - 1) = vsflexGrid1.RowData(index);
        }
    }
    vsflexGrid2.Redraw = true;
    //Remove Selected item

    for (index = vsflexGrid1.Rows - 1; index >= vsflexGrid1.FixedRows; index--) {
        if (vsflexGrid1.Cell(flexcpChecked, index, 0) == flexChecked) {
            vsflexGrid1.RemoveItem(index);
        }
    }
}

function OnUp(vsflexGrid) {
    vsflexGrid.Redraw = false;
    if (vsflexGrid.Row > vsflexGrid.FixedRows && vsflexGrid.Row < vsflexGrid.Rows) {
        var isChecked = vsflexGrid.Cell(flexcpChecked, vsflexGrid.Row, 0);
        var name = vsflexGrid.TextMatrix(vsflexGrid.Row, 1);
        var originCode = vsflexGrid.TextMatrix(vsflexGrid.Row, 2);
        var data = vsflexGrid.RowData(vsflexGrid.Row);

        vsflexGrid.Cell(flexcpChecked, vsflexGrid.Row, 0) = vsflexGrid.Cell(flexcpChecked, vsflexGrid.Row - 1, 0);
        vsflexGrid.TextMatrix(vsflexGrid.Row, 1) = vsflexGrid.TextMatrix(vsflexGrid.Row - 1, 1);
        vsflexGrid.TextMatrix(vsflexGrid.Row, 2) = vsflexGrid.TextMatrix(vsflexGrid.Row - 1, 2);
        vsflexGrid.RowData(vsflexGrid.Row) = vsflexGrid.RowData(vsflexGrid.Row - 1);

        vsflexGrid.Cell(flexcpChecked, vsflexGrid.Row - 1, 0) = isChecked;
        vsflexGrid.TextMatrix(vsflexGrid.Row - 1, 1) = name;
        vsflexGrid.TextMatrix(vsflexGrid.Row - 1, 2) = originCode;
        vsflexGrid.RowData(vsflexGrid.Row - 1) = data;

        vsflexGrid.Row = vsflexGrid.Row - 1;
    }
    vsflexGrid.Redraw = true;
}

function OnDown(vsflexGrid) {
    vsflexGrid.Redraw = false;
    if (vsflexGrid.Row >= vsflexGrid.FixedRows && vsflexGrid.Row < vsflexGrid.Rows - 1) {
        var isChecked = vsflexGrid.Cell(flexcpChecked, vsflexGrid.Row, 0);
        var name = vsflexGrid.TextMatrix(vsflexGrid.Row, 1);
        var originCode = vsflexGrid.TextMatrix(vsflexGrid.Row, 2);
        var data = vsflexGrid.RowData(vsflexGrid.Row);

        vsflexGrid.Cell(flexcpChecked, vsflexGrid.Row, 0) = vsflexGrid.Cell(flexcpChecked, vsflexGrid.Row + 1, 0);
        vsflexGrid.TextMatrix(vsflexGrid.Row, 1) = vsflexGrid.TextMatrix(vsflexGrid.Row + 1, 1);
        vsflexGrid.TextMatrix(vsflexGrid.Row, 2) = vsflexGrid.TextMatrix(vsflexGrid.Row + 1, 2);
        vsflexGrid.RowData(vsflexGrid.Row) = vsflexGrid.RowData(vsflexGrid.Row + 1);

        vsflexGrid.Cell(flexcpChecked, vsflexGrid.Row + 1, 0) = isChecked;
        vsflexGrid.TextMatrix(vsflexGrid.Row + 1, 1) = name;
        vsflexGrid.TextMatrix(vsflexGrid.Row + 1, 2) = originCode;
        vsflexGrid.RowData(vsflexGrid.Row + 1) = data;

        vsflexGrid.Row = vsflexGrid.Row + 1;
    }
    vsflexGrid.Redraw = true;
}

function OnSyn()
{
	window.dialogArguments.parent.quotationFrm.oIOProxy.GetInstrumentForSetting();
}
	
function DoInstrumentList(msXml)
{
	//clear the table
	vsflexItemSource.Rows = vsflexItemSource.FixedRows;
	//vsflexItemSelected.Rows = vsflexItemSource.FixedRows;
	
	var instrumentsNode = msXml.firstChild;
	for(var i=0,count=instrumentsNode.childNodes.length;i<count;i++)
	{
		var tempNode = instrumentsNode.childNodes.item(i);
		var id = tempNode.getAttribute("ID");
		var code = tempNode.getAttribute("Code");
		var originCode = tempNode.getAttribute("OriginCode");

		var isSelected = false;
		for(var j=vsflexItemSource.FixedRows; j<vsflexItemSelected.Rows; j++)
		{
			if(vsflexItemSelected.RowData(j) == id)
			{
				isSelected = true;
				break;
			}
		}
		
		if(!isSelected)
		{
			var line = vsflexItemSource.Rows;
			vsflexItemSource.AddItem("");
			vsflexItemSource.TextMatrix(line, vsflexItemSource.ColIndex("Instrument")) = code;
			vsflexItemSource.TextMatrix(line, vsflexItemSource.ColIndex("OriginCode")) = originCode;
			vsflexItemSource.RowData(line) = id;
		}
	}
}

function OptionSoundInit() {
    with (vsflexSound) {
        FixedRows = 1;
        FixedCols = 0;
        Rows = 1;
        Cols = 4;

        ColKey(0) = "Category";
        ColWidth(0) = 2000;
        ColKey(1) = "Sub";
        ColWidth(1) = 2000;
        ColKey(2) = "Item";
        ColWidth(2) = 2000;
        ColKey(3) = "FileName";

        /*	    MergeCells  = flexMergeRestrictAll;
        MergeCol(0) = true;
        MergeCol(1) = true;
        */
        GridLines = flexGridNone;
        ExtendLastCol = true;
        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExMove;
    }

    var quoteFrm = window.dialogArguments.parent.quotationFrm;
    if (!quoteFrm) return;

    FillSoundGrid(quoteFrm.oSoundOptions);
}

function FillSoundGrid(oSoundOptions) {
    vsflexSound.Redraw = false;
    vsflexSound.Rows = vsflexSound.FixedRows;

    vsflexSound.AddItem("DQTrade");
    for (var index = SoundOption.DQNewOrder; index <= SoundOption.DQAlertHiLo; index++) {
        var line = vsflexSound.Rows;
        var s = SoundOption.GetSoundOptionString(index);
        if (s) {
            vsflexSound.AddItem("\t" + s);
            vsflexSound.RowData(line) = index;
            vsflexSound.TextMatrix(line, vsflexSound.ColIndex("FileName")) = oSoundOptions.Item("" + index);
        }
    }

    vsflexSound.AddItem("LimitTrade");
    for (var index = SoundOption.LimitNewOrder; index <= SoundOption.LimitHit; index++) {
        var line = vsflexSound.Rows;
        var s = SoundOption.GetSoundOptionString(index);
        if (s) {
            vsflexSound.AddItem("\t" + s);
            vsflexSound.RowData(line) = index;
            vsflexSound.TextMatrix(line, vsflexSound.ColIndex("FileName")) = oSoundOptions.Item("" + index);
        }
    }

    vsflexSound.AddItem("SystemMessage");
    for (var index = SoundOption.OutOfRange; index <= SoundOption.Enquiry; index++) {
        var line = vsflexSound.Rows;
        var s = SoundOption.GetSoundOptionString(index);
        if (s) {
            vsflexSound.AddItem("\t" + s);
            vsflexSound.RowData(line) = index;
            vsflexSound.TextMatrix(line, vsflexSound.ColIndex("FileName")) = oSoundOptions.Item("" + index);
        }
    }

    vsflexSound.AutoSize(0, vsflexSound.Cols - 1);
    vsflexSound.Redraw = true;
}

function OnListen()
{
	try
	{
		window.dialogArguments.parent.quotationFrm.Sound.src = File1.value;
	}
	catch(e)
	{
	}
}

function OnSet() {
    vsflexSound.Redraw = false;
    var line = vsflexSound.Row;
    if (line >= vsflexSound.FixedRows && line < vsflexSound.Rows) {
        if (vsflexSound.RowData(line))
            vsflexSound.TextMatrix(line, vsflexSound.ColIndex("FileName")) = File1.value;
    }
    vsflexSound.Redraw = true;
}

function OnSoundApply()
{
	var quoteFrm = window.dialogArguments.parent.quotationFrm;
	if(!quoteFrm)	return;
	
	quoteFrm.oSoundOptions.RemoveAll();
	for(var index=vsflexSound.FixedRows; index<vsflexSound.Rows; index++)
	{
		var id = vsflexSound.RowData(index);
		if(id)
		{
			var fileName = vsflexSound.TextMatrix(index, vsflexSound.ColIndex("FileName"));
			if(fileName && fileName != "")
				quoteFrm.oSoundOptions.Item(""+id) = fileName;
		}
	}
		
	window.dialogArguments.parent.quotationFrm.oDealingConsole.SaveSystemParameter();
}

function FillDefaultValue()
{
	var instrumentColKey = window.dialogArguments.parent.quotationFrm.instrumentColKey;	
	var quoteFrm = window.dialogArguments.parent.quotationFrm;
	if (quoteFrm && quoteFrm.oSetValueOptions.Count > 0)
	{
		window.txtOriginInactiveTime.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.OriginInactiveTime);
		window.txtAlertVariation.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AlertVariation);
		window.txtNormalWaitTime.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.NormalWaitTime);
		window.txtAlertWaitTime.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AlertWaitTime);
		window.txtMaxDQLot.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxDQLot);
		window.txtMaxOtherLot.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxOtherLot);
		window.txtDQQuoteMinLot.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.DQQuoteMinLot);
		window.txtAutoDQMaxLot.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoDQMaxLot);
		window.txtAutoLmtMktMaxLot.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoLmtMktMaxLot);
		window.txtAcceptDQVariation.value =	quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptDQVariation);
		window.txtAcceptLmtVariation.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptLmtVariation);
		window.txtCancelLmtVariation.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.CancelLmtVariation);
		window.txtMaxMinAdjust.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxMinAdjust);
		window.cmbIsBetterPrice.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.IsBetterPrice);
		window.txtAutoAcceptMaxLot.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoAcceptMaxLot);
		window.txtAutoCancelMaxLot.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoCancelMaxLot);
		window.cmbAllowedNewTradeSides.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AllowedNewTradeSides);
		window.txtHitTimes.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.HitTimes);
		window.txtPenetrationPoint.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.PenetrationPoint);
		window.txtPriceValidTime.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.PriceValidTime);
		window.txtLastAcceptTimeSpan.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.LastAcceptTimeSpan);
		if (quoteFrm.oSetValueOptions.Exists(instrumentColKey.AutoDQDelay)) {
		    window.txtAutoDQDelay.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoDQDelay);
		}
		if (quoteFrm.oSetValueOptions.Exists(instrumentColKey.HitPriceVariationForSTP)) {
		    window.textHitPriceVariationForSTP.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.HitPriceVariationForSTP);
		}
		if (quoteFrm.oSetValueOptions.Exists(instrumentColKey.AcceptCloseLmtVariation)) {
		    window.textAcceptCloseLmtVariation.value = quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptCloseLmtVariation);
		}
	}
	else {
	    if (!window.txtOriginInactiveTime.disabled) window.txtOriginInactiveTime.value = "3000";
	    if (!window.txtAlertVariation.disabled) window.txtAlertVariation.value = "40";
	    if (!window.txtNormalWaitTime.disabled) window.txtNormalWaitTime.value = "0";
		if (!window.txtAlertWaitTime.disabled) window.txtAlertWaitTime.value = "15";
		if (!window.txtMaxDQLot.disabled) window.txtMaxDQLot.value = "30";
		if (!window.txtMaxOtherLot.disabled) window.txtMaxOtherLot.value = "30";
		if (!window.txtDQQuoteMinLot.disabled) window.txtDQQuoteMinLot.value = "1";
		if (!window.txtAutoDQMaxLot.disabled) window.txtAutoDQMaxLot.value = "0";
		if (!window.txtAutoLmtMktMaxLot.disabled) window.txtAutoLmtMktMaxLot.value = "0";
		if (!window.txtAcceptDQVariation.disabled) window.txtAcceptDQVariation.value = "100";
		if (!window.txtAcceptLmtVariation.disabled) window.txtAcceptLmtVariation.value = "10";
		if (!window.textAcceptCloseLmtVariation.disabled) window.textAcceptCloseLmtVariation.value = "10";
		if (!window.txtCancelLmtVariation.disabled) window.txtCancelLmtVariation.value = "10";
		if (!window.txtMaxMinAdjust.disabled) window.txtMaxMinAdjust.value = "0";
		if (!window.cmbIsBetterPrice.disabled) window.cmbIsBetterPrice.value = "";
		if (!window.txtAutoAcceptMaxLot.disabled) window.txtAutoAcceptMaxLot.value = "9999.00";
		if (!window.txtAutoCancelMaxLot.disabled) window.txtAutoCancelMaxLot.value = "9999.00";
		if (!window.cmbAllowedNewTradeSides.disabled) window.cmbAllowedNewTradeSides.value = 3;
		if (!window.txtHitTimes.disabled) window.txtHitTimes.value = "1";
		if (!window.txtPenetrationPoint.disabled) window.txtPenetrationPoint.value = "0";
		if (!window.txtPriceValidTime.disabled) window.txtPriceValidTime.value = "15";
		if (!window.txtLastAcceptTimeSpan.disabled) window.txtLastAcceptTimeSpan.value = "0";
		if (!window.txtAutoDQDelay.disabled) window.txtAutoDQDelay.value = "0";
		if (!window.textHitPriceVariationForSTP.disabled) window.textHitPriceVariationForSTP.value = "9999";	
	}
}
function CheckSetValue2(control, isInt, defaultValue) {
    var value;
    if (isInt) {
        value = parseInt(control.value);
        return isNaN(value) ? defaultValue : value;
    }
    else {
        value = parseFloat(control.value);
        return isNaN(value) ? defaultValue : control.value;
    }
}

function CheckSetValue(control)
{
	var intValue = parseInt(control.value);
	return isNaN(intValue) ? GetSetValueDefaultValue(control) : control.value;
}

function GetSetValueDefaultValue(control)
{
	return "";
	
//	var defaultValue = "0";
//	var isExistsoSetValueOptions = false;
//	var instrumentColKey = window.dialogArguments.parent.quotationFrm.instrumentColKey;	
//	var quoteFrm = window.dialogArguments.parent.quotationFrm;
//	if (quoteFrm && quoteFrm.oSetValueOptions.Count > 0)
//	{
//		defaultValue = quoteFrm.oSetValueOptions.Item(instrumentColKey.OriginInactiveTime);
//		isExistsoSetValueOptions = true;
//	}
//	switch (control.id)
//	{
//		case "txtOriginInactiveTime":	
//			defaultValue = (isExistsoSetValueOptions == false) ? "3000" : quoteFrm.oSetValueOptions.Item(instrumentColKey.OriginInactiveTime);
//			break;
//		case "txtAlertVariation":
//			defaultValue = (isExistsoSetValueOptions == false) ? "40" : quoteFrm.oSetValueOptions.Item(instrumentColKey.AlertVariation);
//			break;		
//		case "txtNormalWaitTime":
//			defaultValue = (isExistsoSetValueOptions == false) ? "0" : quoteFrm.oSetValueOptions.Item(instrumentColKey.NormalWaitTime);
//			break;		
//		case "txtAlertWaitTime":
//			defaultValue = (isExistsoSetValueOptions == false) ? "15" : quoteFrm.oSetValueOptions.Item(instrumentColKey.AlertWaitTime);
//			break;		
//		case "txtMaxDQLot":
//			defaultValue = (isExistsoSetValueOptions == false) ? "30" : quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxDQLot);
//			break;		
//		case "txtMaxOtherLot":
//			defaultValue = (isExistsoSetValueOptions == false) ? "30" : quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxOtherLot);
//			break;		
//		case "txtDQQuoteMinLot":
//			defaultValue = (isExistsoSetValueOptions == false) ? "0" : quoteFrm.oSetValueOptions.Item(instrumentColKey.DQQuoteMinLot);
//			break;		
//		case "txtAutoDQMaxLot":
//			defaultValue = (isExistsoSetValueOptions == false) ? "0" : quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoDQMaxLot);
//			break;	
//		case "txtAutoLmtMktMaxLot":
//			defaultValue = (isExistsoSetValueOptions == false) ? "0" : quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoLmtMktMaxLot);
//			break;	
//		case "txtAcceptDQVariation":
//			defaultValue = (isExistsoSetValueOptions == false) ? "100" : quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptDQVariation);
//			break;		
//		case "txtAcceptLmtVariation":
//			defaultValue = (isExistsoSetValueOptions == false) ? "10" : quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptLmtVariation);
//			break;		
//		case "txtCancelLmtVariation":
//			defaultValue = (isExistsoSetValueOptions == false) ? "10" : quoteFrm.oSetValueOptions.Item(instrumentColKey.CancelLmtVariation);
//			break;		
//		case "txtMaxMinAdjust":
//			defaultValue = (isExistsoSetValueOptions == false) ? "0" : quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxMinAdjust);
//			break;		
//		case "txtHitTimes":
//			defaultValue = (isExistsoSetValueOptions == false) ? "1" : quoteFrm.oSetValueOptions.Item(instrumentColKey.HitTimes);
//			break;		
//		case "txtPenetrationPoint":
//			defaultValue = (isExistsoSetValueOptions == false) ? "0" : quoteFrm.oSetValueOptions.Item(instrumentColKey.PenetrationPoint);
//			break;		
//		case "txtPriceValidTime":
//			defaultValue = (isExistsoSetValueOptions == false) ? "15" : quoteFrm.oSetValueOptions.Item(instrumentColKey.PriceValidTime);
//			break;		
//		case "txtLastAcceptTimeSpan":
//			defaultValue = (isExistsoSetValueOptions == false) ? "0" : quoteFrm.oSetValueOptions.Item(instrumentColKey.LastAcceptTimeSpan);
//			break;		
//	}
//	return defaultValue;
}

function onBlurEvent()
{
    window.txtOriginInactiveTime.value = CheckSetValue(window.txtOriginInactiveTime);
    if (window.txtOriginInactiveTime.value != "") {
        if (parseInt(window.txtOriginInactiveTime.value) <= 10) GetSetValueDefaultValue(window.txtOriginInactiveTime);
        if (parseInt(window.txtOriginInactiveTime.value) <= 10) window.txtOriginInactiveTime.value = "3000";
    }
	window.txtAlertVariation.value = CheckSetValue(window.txtAlertVariation);
	window.txtNormalWaitTime.value = CheckSetValue(window.txtNormalWaitTime);
	window.txtAlertWaitTime.value = CheckSetValue(window.txtAlertWaitTime);
	window.txtMaxDQLot.value = CheckSetValue(window.txtMaxDQLot);
	window.txtMaxOtherLot.value =  CheckSetValue(window.txtMaxOtherLot);
	window.txtDQQuoteMinLot.value = CheckSetValue(window.txtDQQuoteMinLot);
	window.txtAutoDQMaxLot.value = CheckSetValue(window.txtAutoDQMaxLot);
	window.txtAutoLmtMktMaxLot.value = CheckSetValue(window.txtAutoLmtMktMaxLot);
	
	window.txtAcceptDQVariation.value = CheckSetValue(window.txtAcceptDQVariation);
	if (window.txtAcceptDQVariation.value != "") {
	    if (parseInt(window.txtAcceptDQVariation.value) < 0) GetSetValueDefaultValue(window.txtAcceptDQVariation);
	    if (parseInt(window.txtAcceptDQVariation.value) < 0) window.txtAcceptDQVariation.value = "100";
	}
	
	window.txtAcceptLmtVariation.value = CheckSetValue2(window.txtAcceptLmtVariation,true,10);
	if (window.txtAcceptLmtVariation.value != "") {
	    if (parseInt(window.txtAcceptLmtVariation.value) <= 0) GetSetValueDefaultValue(window.txtAcceptLmtVariation);
	    if (parseInt(window.txtAcceptLmtVariation.value) <= 0) window.txtAcceptLmtVariation.value = "10";
	}

	window.textAcceptCloseLmtVariation.value = CheckSetValue2(window.textAcceptCloseLmtVariation,true,10);
	if (window.textAcceptCloseLmtVariation.value != "") {
	    if (parseInt(window.textAcceptCloseLmtVariation.value) <= 0) GetSetValueDefaultValue(window.textAcceptCloseLmtVariation);
	    if (parseInt(window.textAcceptCloseLmtVariation.value) <= 0) window.textAcceptCloseLmtVariation.value = "10";
	}

	window.txtCancelLmtVariation.value = CheckSetValue2(window.txtCancelLmtVariation,true,10);
	if (window.txtCancelLmtVariation.value != "") {
	    if (parseInt(window.txtCancelLmtVariation.value) <= 0) GetSetValueDefaultValue(window.txtCancelLmtVariation);
	    if (parseInt(window.txtCancelLmtVariation.value) <= 0) window.txtCancelLmtVariation.value = "10";
	}
	
	window.txtMaxMinAdjust.value = CheckSetValue(window.txtMaxMinAdjust);
	
	window.txtHitTimes.value = CheckSetValue(window.txtHitTimes);
	if (window.txtHitTimes.value != "")
	{
	    if (parseInt(window.txtHitTimes.value) < 1) GetSetValueDefaultValue(window.txtHitTimes); 
	    if (parseInt(window.txtHitTimes.value) < 1) window.txtHitTimes.value = "1";
	}
	
	window.txtPenetrationPoint.value = CheckSetValue(window.txtPenetrationPoint);
	window.txtPriceValidTime.value = CheckSetValue(window.txtPriceValidTime);
	window.txtLastAcceptTimeSpan.value = CheckSetValue(window.txtLastAcceptTimeSpan);
	window.txtAutoDQDelay.value = CheckSetValue(window.txtAutoDQDelay);
	window.textHitPriceVariationForSTP.value =CheckSetValue(window.textHitPriceVariationForSTP) != "" ? parseInt(CheckSetValue(window.textHitPriceVariationForSTP)):"9999";
}

/*
function FillProperty(instrument)
{
	if(!instrument)
	{
		FillDefaultValue();
		return;
	}
	//update properties about the current quotePolicyDetail		
	window.txtOriginInactiveTime.value = (instrument.originInactiveTimeTemp == null) ? instrument.originInactiveTime : instrument.originInactiveTimeTemp;
	window.txtAlertVariation.value = (instrument.alertVariationTemp == null) ? instrument.alertVariation : instrument.alertVariationTemp;
	window.txtNormalWaitTime.value = (instrument.normalWaitTimeTemp == null) ? instrument.normalWaitTime : instrument.normalWaitTimeTemp;
	window.txtAlertWaitTime.value = (instrument.alertWaitTimeTemp == null) ? instrument.alertWaitTime : instrument.alertWaitTimeTemp;
	window.txtMaxDQLot.value = (instrument.maxDQLotTemp == null) ? instrument.maxDQLot : instrument.maxDQLotTemp;
	window.txtMaxOtherLot.value = (instrument.maxOtherLotTemp == null) ? instrument.maxOtherLot :instrument.maxOtherLotTemp;
	window.txtDQQuoteMinLot.value = (instrument.dqQuoteMinLotTemp == null) ? instrument.dqQuoteMinLot : instrument.dqQuoteMinLotTemp;
	window.txtAutoDQMaxLot.value = (instrument.autoDQMaxLotTemp == null) ? instrument.autoDQMaxLot :instrument.autoDQMaxLotTemp;
	window.txtAutoLmtMktMaxLot.value = (instrument.autoLmtMktMaxLotTemp == null) ? instrument.autoLmtMktMaxLot : instrument.autoLmtMktMaxLotTemp;
	window.txtAcceptDQVariation.value = (instrument.acceptDQVariationTemp == null) ? instrument.acceptDQVariation : instrument.acceptDQVariationTemp;
	window.txtAcceptLmtVariation.value = (instrument.acceptLmtVariationTemp == null) ? instrument.acceptLmtVariation : instrument.acceptLmtVariationTemp;
	window.txtCancelLmtVariation.value = (instrument.cancelLmtVariationTemp == null) ? instrument.cancelLmtVariation : instrument.cancelLmtVariationTemp;
	window.txtMaxMinAdjust.value = (instrument.maxMinAdjustTemp == null) ? instrument.maxMinAdjust : instrument.maxMinAdjustTemp;
	window.cmbIsBetterPrice.value = (instrument.isBetterPriceTemp == null) ? instrument.isBetterPrice : instrument.isBetterPriceTemp;
	window.txtAutoAcceptMaxLot.value = (instrument.autoAcceptMaxLotTemp == null) ? instrument.autoAcceptMaxLot : instrument.autoAcceptMaxLotTemp;
	window.txtAutoCancelMaxLot.value = (instrument.autoCancelMaxLotTemp == null) ? instrument.autoCancelMaxLot : instrument.autoCancelMaxLotTemp;
    window.cmbAllowAddNewPosition.value = (instrument.allowedNewTradeSidesTemp == null) ? instrument.allowAddNewPosition : instrument.allowAddNewPositionTemp;
	window.txtHitTimes.value = (instrument.hitTimesTemp == null) ? instrument.hitTimes : instrument.hitTimesTemp;
	window.txtPenetrationPoint.value = (instrument.penetrationPointTemp == null) ? instrument.penetrationPoint : instrument.penetrationPointTemp;
	window.txtPriceValidTime.value = (instrument.priceValidTimeTemp == null) ? instrument.priceValidTime : instrument.priceValidTimeTemp;
	window.txtLastAcceptTimeSpan.value = (instrument.lastAcceptTimeSpanTemp == null) ? instrument.lastAcceptTimeSpan : instrument.lastAcceptTimeSpanTemp;
}
*/

function ApplySetValueForAll()
{
	ApplySetValue(true,null);
}

/*
function ApplySetValue2(control,instrument)
{
	var oIOProxy = window.dialogArguments.parent.quotationFrm.oIOProxy;	
	var instrumentColKey = window.dialogArguments.parent.quotationFrm.instrumentColKey;	
	switch(control.id)
	{
		//deal with all properties of instrument
		case "txtOriginInactiveTime":
			instrument.originInactiveTimeTemp = parseInt( window.txtOriginInactiveTime.value );
			if(instrument.originInactiveTimeTemp != instrument.originInactiveTime)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.OriginInactiveTime, instrument.originInactiveTimeTemp,false,false);
			else
				instrument.originInactiveTimeTemp = null;
			break;
		case "txtAlertVariation":
			instrument.alertVariationTemp = parseInt( window.txtAlertVariation.value );
			if(instrument.alertVariationTemp != instrument.alertVariation)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AlertVariation, instrument.alertVariationTemp,false,false);
			else
				instrument.alertVariationTemp = null;
			break;
		case "txtNormalWaitTime":
			instrument.normalWaitTimeTemp = parseInt( window.txtNormalWaitTime.value );
			if(instrument.normalWaitTimeTemp != instrument.normalWaitTime)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.NormalWaitTime, instrument.normalWaitTimeTemp,false,false);
			else
				instrument.normalWaitTimeTemp = null;
			break;
		case "txtAlertWaitTime":
			instrument.alertWaitTimeTemp = parseInt( window.txtAlertWaitTime.value );
			if(instrument.alertWaitTimeTemp != instrument.alertWaitTime)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AlertWaitTime, instrument.alertWaitTimeTemp,false,false);
			else
				instrument.alertWaitTimeTemp = null;
			break;
		case "txtMaxDQLot":
			//Modified by Michael on 2005-04-08
			//var newValue = parseInt( window.txtMaxDQLot.value );
			var newValue = parseFloat( window.txtMaxDQLot.value );
			
			if(newValue < instrument.dqQuoteMinLot)
			{
				vsflexQuotation.TextMatrix(row, col)  = instrument.maxDQLot;
			}
			else
			{
				instrument.maxDQLotTemp = newValue;
				if(instrument.maxDQLotTemp != instrument.maxDQLot)
					oIOProxy.SendInstrumentParam(instrument, instrumentColKey.MaxDQLot, instrument.maxDQLotTemp,false,false);
				else
					instrument.maxDQLotTemp = null;
			}
			break;
		case "txtMaxOtherLot":
			//Modified by Michael on 2005-04-08
			//instrument.maxOtherLotTemp = parseInt( window.txtMaxOtherLot.value );
			instrument.maxOtherLotTemp = parseFloat( window.txtMaxOtherLot.value );
			
			if(instrument.maxOtherLotTemp != instrument.maxOtherLot)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.MaxOtherLot, instrument.maxOtherLotTemp,false,false);
			else
				instrument.maxOtherLotTemp = null;
			break;
		case "txtDQQuoteMinLot":
			//Modified by Michael on 2005-04-08
			//var newValue = parseInt( window.txtDQQuoteMinLot.value )
			var newValue = parseFloat( window.txtDQQuoteMinLot.value )
			
			if(newValue > instrument.maxDQLot)
			{
				vsflexQuotation.TextMatrix(row, col)  = instrument.dqQuoteMinLot;
			}
			else
			{
				instrument.dqQuoteMinLotTemp = newValue;
				if(instrument.dqQuoteMinLotTemp != instrument.dqQuoteMinLot)
					oIOProxy.SendInstrumentParam(instrument, instrumentColKey.DQQuoteMinLot, instrument.dqQuoteMinLotTemp,false,false);
				else
					instrument.dqQuoteMinLotTemp = null;
			}
			break;
		case "txtAcceptDQVariation":
			instrument.acceptDQVariationTemp = parseInt( window.txtAcceptDQVariation.value );
			if(instrument.acceptDQVariationTemp != instrument.acceptDQVariation)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AcceptDQVariation, instrument.acceptDQVariationTemp,false,false);
			else
				instrument.acceptDQVariationTemp = null;
			break;
		case "txtAcceptLmtVariation":
			instrument.acceptLmtVariationTemp = parseInt( window.txtAcceptLmtVariation.value );
			if(instrument.acceptLmtVariationTemp != instrument.acceptLmtVariation)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AcceptLmtVariation, instrument.acceptLmtVariationTemp,false,false);
			else
				instrument.acceptLmtVariationTemp = null;
			break;
		case "txtCancelLmtVariation":
			instrument.cancelLmtVariationTemp = parseInt( window.txtCancelLmtVariation.value );
			if(instrument.cancelLmtVariationTemp != instrument.cancelLmtVariation)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.CancelLmtVariation, instrument.cancelLmtVariationTemp,false,false);
			else
				instrument.cancelLmtVariationTemp = null;
			break;
		case "txtMaxMinAdjust":
			instrument.maxMinAdjustTemp = parseInt( window.txtMaxMinAdjust.value );
			if(instrument.maxMinAdjustTemp != instrument.maxMinAdjust)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.MaxMinAdjust, instrument.maxMinAdjustTemp,false,false);
			else
				instrument.maxMinAdjustTemp = null;
			break;
		case "cmbIsBetterPrice":
			instrument.isBetterPriceTemp = window.cmbIsBetterPrice.value;
			if(instrument.isBetterPriceTemp != instrument.isBetterPrice)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.IsBetterPrice, instrument.isBetterPriceTemp,false,false);
			else
				instrument.isBetterPriceTemp = null;
			break;
		case "txtAutoAcceptMaxLot":
			instrument.autoAcceptMaxLotTemp = window.txtAutoAcceptMaxLot.value;
			if(instrument.autoAcceptMaxLotTemp != instrument.autoAcceptMaxLot)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AutoAcceptMaxLot, instrument.autoAcceptMaxLotTemp,false,false);
			else
				instrument.autoAcceptMaxLotTemp = null;
			break;	
		case "txtAutoCancelMaxLot":
			instrument.autoCancelMaxLotTemp = window.txtAutoCancelMaxLot.value;
			if(instrument.autoCancelMaxLotTemp != instrument.autoCancelMaxLot)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AutoCancelMaxLot, instrument.autoCancelMaxLotTemp,false,false);
			else
				instrument.autoCancelMaxLotTemp = null;
			break;	
        case "cmbAllowAddNewPosition":
			instrument.allowedNewTradeSidesTemp = window.cmbAllowAddNewPosition.value;
			if(instrument.allowAddNewPositionTemp != instrument.AllowedNewTradeSides)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.AllowedNewTradeSides, instrument.allowAddNewPositionTemp,false,false);
			else
				instrument.allowAddNewPositionTemp = null;
			break;
		case "txtHitTimes":
			instrument.hitTimesTemp = parseInt( window.txtHitTimes.value );
			if(instrument.hitTimesTemp != instrument.hitTimes)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.HitTimes, instrument.hitTimesTemp,false,false);
			else
				instrument.hitTimesTemp = null;
			break;
		case "txtPenetrationPoint":
			instrument.penetrationPointTemp = parseInt( window.txtPenetrationPoint.value );
			if(instrument.penetrationPointTemp != instrument.penetrationPoint)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.PenetrationPoint, instrument.penetrationPointTemp,false,false);
			else
				instrument.penetrationPointTemp = null;
			break;
		case "txtPriceValidTime":
			instrument.priceValidTimeTemp = parseInt( window.txtPriceValidTime.value );
			if(instrument.priceValidTimeTemp != instrument.priceValidTime)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.PriceValidTime, instrument.priceValidTimeTemp,false,false);
			else
				instrument.priceValidTimeTemp = null;
			break;
		case "txtLastAcceptTimeSpan":
			instrument.lastAcceptTimeSpanTemp = parseInt( window.txtLastAcceptTimeSpan.value );
			if(instrument.lastAcceptTimeSpanTemp != instrument.lastAcceptTimeSpan)
				oIOProxy.SendInstrumentParam(instrument, instrumentColKey.LastAcceptTimeSpan, instrument.lastAcceptTimeSpanTemp,false,false);
			else
				instrument.lastAcceptTimeSpanTemp = null;
			break;
		default:
			break;
	}
}
*/

function ApplySetValueBak(isAll,control)
{	
	/*	
	var instruments = (new VBArray(window.dialogArguments.parent.quotationFrm.oInstruments.Items())).toArray();	
	for(var index in instruments)
	{
		var instrument = instruments[index];
		
		var oIOProxy = window.dialogArguments.parent.quotationFrm.oIOProxy;		
		instrument.isDealerInput = false;
		
		if (isAll == true)
		{
			ApplySetValue2(window.txtOriginInactiveTime,instrument);
			ApplySetValue2(window.txtAlertVariation,instrument);
			ApplySetValue2(window.txtNormalWaitTime,instrument);
			ApplySetValue2(window.txtAlertWaitTime,instrument);
			ApplySetValue2(window.txtMaxDQLot.value,instrument);
			ApplySetValue2(window.txtMaxOtherLot,instrument);
			ApplySetValue2(window.txtDQQuoteMinLot,instrument);
			ApplySetValue2(window.txtAutoDQMaxLot,instrument);
			ApplySetValue2(window.txtAutoLmtMktMaxLot,instrument);
			ApplySetValue2(window.txtAcceptDQVariation,instrument);
			ApplySetValue2(window.txtAcceptLmtVariation,instrument);
			ApplySetValue2(window.txtCancelLmtVariation,instrument);
			ApplySetValue2(window.txtMaxMinAdjust,instrument);
			ApplySetValue2(window.cmbIsBetterPrice,instrument);
			ApplySetValue2(window.txtAutoAcceptMaxLot,instrument);
			ApplySetValue2(window.txtAutoCancelMaxLot,instrument);
            ApplySetValue2(window.cmbAllowAddNewPosition,instrument);
			ApplySetValue2(window.txtHitTimes.value,instrument);
			ApplySetValue2(window.txtPenetrationPoint,instrument);
			ApplySetValue2(window.txtPriceValidTime,instrument);
			ApplySetValue2(window.txtLastAcceptTimeSpan,instrument);
		}
		else
		{
			ApplySetValue2(control,instrument);
		}
		
		if (isAll == false && (control.id == "txtAutoDQMaxLot" || control.id == "txtAutoLmtMktMaxLot") )
		{
		}
		else
		{
			//Notify Quotation
			window.dialogArguments.parent.quotationFrm.OnQuotationPropertiesChanged(instrument);
			//Notify Property
			oIOProxy.mainWindow.OnPropertyInstrumentChanged(instrument);
		}
	}
	*/	
	
	var instrumentColKey = window.dialogArguments.parent.quotationFrm.instrumentColKey;	
	var quoteFrm = window.dialogArguments.parent.quotationFrm;
	if(!quoteFrm)	return;
	quoteFrm.oSetValueOptions.RemoveAll();
	
	if (window.txtOriginInactiveTime.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.OriginInactiveTime) = window.txtOriginInactiveTime.value;
	}
	if (window.txtAlertVariation.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AlertVariation) = window.txtAlertVariation.value;
	}
	if (window.txtNormalWaitTime.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.NormalWaitTime) = window.txtNormalWaitTime.value;
	}
	if (window.txtAlertWaitTime.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AlertWaitTime) = window.txtAlertWaitTime.value;
	}
	if (window.txtMaxDQLot.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxDQLot) = window.txtMaxDQLot.value;
	}
	if (window.txtMaxOtherLot.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxOtherLot) = window.txtMaxOtherLot.value;
	}
	if (window.txtDQQuoteMinLot.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.DQQuoteMinLot) = window.txtDQQuoteMinLot.value;
	}
	if (window.txtAutoDQMaxLot.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoDQMaxLot) = window.txtAutoDQMaxLot.value;
	}
	if (window.txtAutoLmtMktMaxLot.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoLmtMktMaxLot) = window.txtAutoLmtMktMaxLot.value;
	}
	if (window.txtAcceptDQVariation.value != "") {
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptDQVariation) = window.txtAcceptDQVariation.value;
	}
	if (window.txtAcceptLmtVariation.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptLmtVariation) = window.txtAcceptLmtVariation.value;
	}
	if (window.txtCancelLmtVariation.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.CancelLmtVariation) = window.txtCancelLmtVariation.value;
	}
	if (window.txtMaxMinAdjust.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxMinAdjust) = window.txtMaxMinAdjust.value;	
	}
	if (window.cmbIsBetterPrice.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.IsBetterPrice) = window.cmbIsBetterPrice.value;
	}
	if (window.txtAutoAcceptMaxLot.value != "") {
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoAcceptMaxLot) = window.txtAutoAcceptMaxLot.value;
	}
	if (window.txtAutoCancelMaxLot.value != "") {
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoCancelMaxLot) = window.txtAutoCancelMaxLot.value;
	}
	if (window.cmbAllowedNewTradeSides.value != "") {
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AllowedNewTradeSides) = window.cmbAllowedNewTradeSides.value;
	}
	if (window.txtHitTimes.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.HitTimes) = window.txtHitTimes.value;
	}
	if (window.txtPenetrationPoint.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.PenetrationPoint) = window.txtPenetrationPoint.value;
	}
	if (window.txtPriceValidTime.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.PriceValidTime) = window.txtPriceValidTime.value;
	}
	if ( window.txtLastAcceptTimeSpan.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.LastAcceptTimeSpan) = window.txtLastAcceptTimeSpan.value;
	}
	if (window.txtAutoDQDelay.value != "")
	{
	    quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoDQDelay) = window.txtAutoDQDelay.value;
	}
	
	window.dialogArguments.parent.quotationFrm.oDealingConsole.SaveSystemParameter();	
}



function ApplySetValue(isAll,control)
{		
	var instrumentColKey = window.dialogArguments.parent.quotationFrm.instrumentColKey;	
	var quoteFrm = window.dialogArguments.parent.quotationFrm;
	if(!quoteFrm)	return;
	quoteFrm.oSetValueOptions.RemoveAll();

	quoteFrm.oSetValueOptions.Item(instrumentColKey.OriginInactiveTime) = window.txtOriginInactiveTime.value;	
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AlertVariation) = window.txtAlertVariation.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.NormalWaitTime) = window.txtNormalWaitTime.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AlertWaitTime) = window.txtAlertWaitTime.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxDQLot) = window.txtMaxDQLot.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxOtherLot) = window.txtMaxOtherLot.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.DQQuoteMinLot) = window.txtDQQuoteMinLot.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoDQMaxLot) = window.txtAutoDQMaxLot.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoLmtMktMaxLot) = window.txtAutoLmtMktMaxLot.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptDQVariation) = window.txtAcceptDQVariation.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptLmtVariation) = window.txtAcceptLmtVariation.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AcceptCloseLmtVariation) = window.textAcceptCloseLmtVariation.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.CancelLmtVariation) = window.txtCancelLmtVariation.value;	
	quoteFrm.oSetValueOptions.Item(instrumentColKey.MaxMinAdjust) = window.txtMaxMinAdjust.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.IsBetterPrice) = window.cmbIsBetterPrice.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoAcceptMaxLot) = window.txtAutoAcceptMaxLot.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoCancelMaxLot) = window.txtAutoCancelMaxLot.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AllowedNewTradeSides) = window.cmbAllowedNewTradeSides.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.HitTimes) = window.txtHitTimes.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.PenetrationPoint) = window.txtPenetrationPoint.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.PriceValidTime) = window.txtPriceValidTime.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.LastAcceptTimeSpan) = window.txtLastAcceptTimeSpan.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.AutoDQDelay) = window.txtAutoDQDelay.value;
	quoteFrm.oSetValueOptions.Item(instrumentColKey.HitPriceVariationForSTP) = window.textHitPriceVariationForSTP.value;

	quoteFrm.ApplySetValueToDealingPolicy = window.document.all._ApplyToDealingPolicyCheckbox.checked;
	
	window.dialogArguments.parent.quotationFrm.oDealingConsole.SaveSystemParameter();
}

function regInput(obj, reg, inputStr)
{
	var docSel	= document.selection.createRange();
	if (docSel.parentElement().tagName != "INPUT")	return false;
	oSel = docSel.duplicate();
	oSel.text = "";
	var srcRange	= obj.createTextRange();
	oSel.setEndPoint("StartToStart", srcRange);
	var str = oSel.text + inputStr + srcRange.text.substr(oSel.text.length);
	return reg.test(str);
}

function onKeyPressEvent(obj)
{	
	return regInput(obj,	/^\d*\.?\d{0,2}$/,		String.fromCharCode(event.keyCode));
}

function onPasteEvent()
{
	return regInput(obj,	/^\d*\.?\d{0,2}$/,		window.clipboardData.getData('Text'));
}

function onDropEvent()
{
	return regInput(obj,	/^\d*\.?\d{0,2}$/,		event.dataTransfer.getData('Text'));
}

//Font
//Added Michael on 2005-06-30
function Setting2()
{
    this.FillSelect2 = function (control, elementInnerText, elementValue) {
        if (elementInnerText && elementValue) {
            this.FillSelect(control, elementInnerText, elementValue);
        }
    };

    this.FillSelect = function (control, elementInnerText, elementValue) {
        var element = document.createElement("OPTION");
        control.add(element);
        element.innerText = elementInnerText;
        element.value = elementValue;
    };

    this.SettingGridInit = function () {
        var commonLanguage = window.dialogArguments.parent.quotationFrm.commonLanguage;	
        var lColIndex = 0;
        with (window.SettingGrid) {
            Rows = 1;
            Cols = 4;
            FixedRows = 1;
            FixedCols = 0;

            TextMatrix(0, lColIndex) = "ColKey";
            ColKey(lColIndex) = "ColKey";
            ColWidth(lColIndex) = 1000;
            ColDataType(lColIndex) = flexDTString;
            ColHidden(lColIndex) = true;
            lColIndex++;

            TextMatrix(0, lColIndex) = commonLanguage["Column"]; // "Column";
            ColKey(lColIndex) = "Column";
            ColWidth(lColIndex) = 2500;
            lColIndex++;

            TextMatrix(0, lColIndex) = commonLanguage["ColWidth"];
            ColKey(lColIndex) = "ColWidth";
            ColWidth(lColIndex) = 800;
            lColIndex++;

            TextMatrix(0, lColIndex) = commonLanguage["ColHidden"]; ;
            ColKey(lColIndex) = "ColHidden";
            ColWidth(lColIndex) = 500;
            ColDataType(lColIndex) = flexDTBoolean;
            lColIndex++;

            Rows = 1;
            Cols = lColIndex;

            ExtendLastCol = true;
            AllowUserResizing = flexResizeBoth;
            ExplorerBar = flexExMove;
            SelectionMode = flexSelectionFree;
        }
    };

    this.Init = function () {
        this.FillGrid(window.cmbDoGrid);
        this.FillFontSize(window.cmbFontSize);
        this.FillFontName(window.cmbFontName);
        
        this.SettingGridInit();
        
    };

    this.GetQuotationSetting = function () {
        window.cmbDoGrid.selectedIndex = 0;
        this.cmbDoGrid_OnChange();
    }

    this.Setting_onClick = function () {
        window.setTimeout('setting.GetQuotationSetting()', 1000);
    }

    this.SettingGrid_Click = function () {
//        var optionGrid = window.dialogArguments.parent.quotationFrm.optionGrid;

//        with (window.SettingGrid) {
//            if (Row < FixedRows) { return; }
//            if (window.cmbDoGrid.value == optionGrid.PropertiesGrid) {
//                Editable = (Col == ColIndex("ColHidden")) ? flexEDKbdMouse : flexEDNone;
//            }
//            else
//                Editable = (Col == ColIndex("ColWidth") || Col == ColIndex("ColHidden")) ? flexEDKbdMouse : flexEDNone;
//        }
    };

    this.GetOperateVsflex = function (Direction) {
        var InsertRow;
        var RemoveRow;
        var CurrentRow;
        var IndexCol;
        var oDirection = new Object();
        oDirection.Up = 0;
        oDirection.Down = 1;

        with (window.SettingGrid) {
            if (Rows <= FixedRows + 1) return;
            Redraw = false;
            if (Row >= FixedRows) {
                if (Direction == oDirection.Up) {
                    if (Row == FixedRows) {
                        InsertRow = Rows;
                        RemoveRow = FixedRows;
                    }
                    else {
                        InsertRow = Row - 1;
                        RemoveRow = Row + 1;
                    }
                    AddItem("", InsertRow);
                    CurrentRow = InsertRow;
                    if (CurrentRow > RemoveRow) {
                        CurrentRow = InsertRow - 1;
                    }
                    //Modify
                    if (window.btnDown2.disabled == true)
                    { window.btnDown2.disabled = false; }
                    var optionGrid = window.dialogArguments.parent.quotationFrm.optionGrid;
                    if ((window.cmbDoGrid.value == optionGrid.OrderGrid && CurrentRow == 8)
                     || (window.cmbDoGrid.value == optionGrid.QuotationTaskGrid && CurrentRow == 5)) {
                        window.btnUp2.disabled = true;
                    }
                }
                else {
                    if (window.btnUp2.disabled == true)
                    { window.btnUp2.disabled = false; }
                    if (Row == Rows - 1) {
                        InsertRow = FixedRows;
                        AddItem("", InsertRow);
                        RemoveRow = Rows - 1;
                        CurrentRow = InsertRow;

                        var optionGrid = window.dialogArguments.parent.quotationFrm.optionGrid;
                        window.btnUp2.disabled = window.cmbDoGrid.value == optionGrid.OrderGrid ? true:false;
                    }
                    else {
                        InsertRow = Row + 2;
                        RemoveRow = Row;
                        AddItem("", Row + 2);
                        CurrentRow = InsertRow;
                        if (CurrentRow > RemoveRow) {
                            CurrentRow = InsertRow - 1;
                        }
                    }
                }

                for (IndexCol = FixedCols; IndexCol < Cols; IndexCol++) {
                    if (ColDataType(IndexCol) == flexDTBoolean) {
                        Cell(flexcpChecked, InsertRow, IndexCol) = Cell(flexcpChecked, RemoveRow, IndexCol);
                    }
                    else
                        TextMatrix(InsertRow, IndexCol) = TextMatrix(RemoveRow, IndexCol);
                }

                RemoveItem(RemoveRow);
                Row = CurrentRow;
                ScrollTrack = true;
            }
            Redraw = true;
        }
    };

    this.FillFontName = function (control) {
        control.options.length = 0;
        this.FillSelect(control, "Arial", "Arial");
        this.FillSelect(control, "Arial Black", "Arial Black");
        this.FillSelect(control, "Arial Narrow", "Arial Narrow");
        this.FillSelect(control, "Basemic", "Basemic");
        this.FillSelect(control, "Basemic Symbol", "Basemic Symbol");
        this.FillSelect(control, "Basemic Times", "Basemic Times");
        this.FillSelect(control, "Batang", "Batang");
        this.FillSelect(control, "BatangChe", "BatangChe");
        this.FillSelect(control, "Book Antiqua", "Book Antiqua");
        this.FillSelect(control, "Bookman Old Style", "Bookman Old Style");
        this.FillSelect(control, "Century Gothic", "Century Gothic");
        this.FillSelect(control, "Comic Sans MS", "Comic Sans MS");
        this.FillSelect(control, "Courier", "Courier");
        this.FillSelect(control, "Courier New", "Courier New");
        this.FillSelect(control, "Dotum", "Dotum");
        this.FillSelect(control, "DotumChe", "DotumChe");
        this.FillSelect(control, "Estrangelo Edessa", "Estrangelo Edessa");
        this.FillSelect(control, "Fixedsys", "Fixedsys");
        this.FillSelect(control, "Franklin Gothic Medium", "Franklin Gothic Medium");
        this.FillSelect(control, "Garamond", "Garamond");
        this.FillSelect(control, "Gautami", "Gautami");
        this.FillSelect(control, "Georgia", "Georgia");
        this.FillSelect(control, "Gulim", "Gulim");
        this.FillSelect(control, "GulimChe", "GulimChe");
        this.FillSelect(control, "Gungsuh", "Gungsuh");
        this.FillSelect(control, "GungsuhChe", "GungsuhChe");
        this.FillSelect(control, "Haettenschweiler", "Haettenschweiler");
        this.FillSelect(control, "Impact", "Impact");
        this.FillSelect(control, "Latha", "Latha");
        this.FillSelect(control, "Lucida Console", "Lucida Console");
        this.FillSelect(control, "Lucida Sans Regular", "Lucida Sans Regular");
        this.FillSelect(control, "Lucida Sans Unicode", "Lucida Sans Unicode");
        this.FillSelect(control, "Mangal", "Mangal");
        this.FillSelect(control, "Microsoft Sans Serif", "Microsoft Sans Serif");
        this.FillSelect(control, "MingLiU", "MingLiU");
        this.FillSelect(control, "Modern", "Modern");
        this.FillSelect(control, "MS Gothic", "MS Gothic");
        this.FillSelect(control, "MS Mincho", "MS Mincho");
        this.FillSelect(control, "MS PGothic", "MS PGothic");
        this.FillSelect(control, "MS PMincho", "MS PMincho");
        this.FillSelect(control, "MS Sans Serif", "MS Sans Serif");
        this.FillSelect(control, "MS Serif", "MS Serif");
        this.FillSelect(control, "MS UI Gothic", "MS UI Gothic");
        this.FillSelect(control, "MV Boli", "MV Boli");
        this.FillSelect(control, "Palatino Linotype", "Palatino Linotype");
        this.FillSelect(control, "PMingLiU", "PMingLiU");
        this.FillSelect(control, "Raavi", "Raavi");
        this.FillSelect(control, "Roman", "Roman");
        this.FillSelect(control, "Script", "Script");
        this.FillSelect(control, "Shruti", "Shruti");
        this.FillSelect(control, "Small Fonts", "Small Fonts");
        this.FillSelect(control, "Sylfaen", "Sylfaen");
        this.FillSelect(control, "System", "System");
        this.FillSelect(control, "Tahoma Bold", "Tahoma Bold");
        this.FillSelect(control, "Terminal", "Terminal");
        this.FillSelect(control, "Times New Roman", "Times New Roman");
        this.FillSelect(control, "Trebuchet MS", "Trebuchet MS");
        this.FillSelect(control, "Tunga", "Tunga");
        this.FillSelect(control, "Verdana", "Verdana");
    };

    this.FillGrid = function (control) {
        var optionGrid = window.dialogArguments.parent.quotationFrm.optionGrid;
        var optionGridLanguage = window.dialogArguments.parent.quotationFrm.optionGridLanguage;

        control.options.length = 0;
        this.FillSelect(control, optionGridLanguage.QuotationGrid, optionGrid.QuotationGrid);
        this.FillSelect(control, optionGridLanguage.QuotationTaskGrid, optionGrid.QuotationTaskGrid);
        this.FillSelect(control, optionGridLanguage.QuotePolicyGrid, optionGrid.QuotePolicyGrid);
        this.FillSelect(control, optionGridLanguage.SourceLevelAdjustmentGrid, optionGrid.SourceLevelAdjustmentGrid);
        this.FillSelect(control, optionGridLanguage.OrderGrid, optionGrid.OrderGrid);
        this.FillSelect(control, optionGridLanguage.HistoryGrid, optionGrid.HistoryGrid);
        //this.FillSelect(control,optionGridLanguage.PropertiesGrid,optionGrid.PropertiesGrid);
        this.FillSelect(control, optionGridLanguage.SearchGrid, optionGrid.SearchGrid);
        this.FillSelect(control, optionGridLanguage.SearchGridForCancelledOrder, optionGrid.SearchGridForCancelledOrder);
        //this.FillSelect(control, optionGridLanguage.InterestGrid, optionGrid.InterestGrid);
        this.FillSelect(control, optionGridLanguage.GroupNetPositionGrid, optionGrid.GroupNetPositionGrid);
        this.FillSelect(control, optionGridLanguage.InterestSummaryGrid, optionGrid.InterestSummaryGrid);
        this.FillSelect(control, optionGridLanguage.ExecutedGrid, optionGrid.ExecutedGrid);
        this.FillSelect(control, optionGridLanguage.ExecuteOrderSummaryGrid, optionGrid.ExecuteOrderSummaryGrid);
        this.FillSelect(control, optionGridLanguage.InstantOrderListGrid, optionGrid.InstantOrderListGrid);        
        this.FillSelect(control, optionGridLanguage.UnclosedOrderGrid, optionGrid.UnclosedOrderGrid);
        this.FillSelect(control, optionGridLanguage.DealingPolicyDetailGrid, optionGrid.DealingPolicyDetailGrid);
        this.FillSelect(control, optionGridLanguage.CustomerPolicyManagementGrid, optionGrid.CustomerPolicyManagementGrid);
        this.FillSelect(control, optionGridLanguage.BlotterSelectionGrid, optionGrid.BlotterSelectionGrid);
        this.FillSelect(control, optionGridLanguage.OrderPrintGrid, optionGrid.OrderPrintGrid);
    };

    this.FillFontSize = function (control) {
        control.options.length = 0;
        for (var i = 6; i < 25; i++) {
            this.FillSelect(control, i, i);
        }
    };

    this.GetGridProperty = function () {
        var gridProperty = new Object();
        gridProperty.colLanguage = null;
        gridProperty.grid = null;

        var quotationFrm = window.dialogArguments.parent.quotationFrm;

        var optionGrid = quotationFrm.optionGrid;
        switch (window.cmbDoGrid.value) {
            case optionGrid.QuotationGrid:
                gridProperty.colLanguage = quotationFrm.instrumentLanguage;
                gridProperty.grid = quotationFrm.vsflexQuotation;
                break;
            case optionGrid.QuotationTaskGrid:
                gridProperty.colLanguage = quotationFrm.quotationTaskGridLanguage;
                gridProperty.grid = window.dialogArguments.parent.quotationTaskFrm.vsflexQuotationTask;
                break;
            case optionGrid.QuotePolicyGrid:
                gridProperty.colLanguage = quotationFrm.quotePolicyGridLanguage;
                gridProperty.grid = window.dialogArguments.parent.QuotePolicyFrm.quotePolicyGrid;
                break;
            case optionGrid.SourceLevelAdjustmentGrid:
                gridProperty.colLanguage = quotationFrm.sourceLevelAdjustmentGridLanguage;
                gridProperty.grid = window.dialogArguments.parent.SourceLevelAdjustmentFrm.sourceLevelAdjustmentGrid;
                break;
            case optionGrid.OrderGrid:
                gridProperty.colLanguage = quotationFrm.orderGridLanguage;
                gridProperty.grid = window.dialogArguments.parent.orderTaskFrm.vsflexOrderTask;
                break;
            case optionGrid.HistoryGrid:
                gridProperty.colLanguage = quotationFrm.historyGridLanguage;
                gridProperty.grid = window.dialogArguments.parent.propertyFrm.vsFlexHistory;
                break;
            case optionGrid.PropertiesGrid:
                gridProperty.colLanguage = quotationFrm.instrumentPropertyLanguage;
                gridProperty.grid = window.dialogArguments.parent.propertyFrm.vsFlexProperites;
                break;
            case optionGrid.SearchGrid:
                gridProperty.colLanguage = quotationFrm.searchGridLanguage;
                if (window.dialogArguments.parent.toolBarFrm.oWndOrderSearch) {
                    if (window.dialogArguments.parent.toolBarFrm.oWndOrderSearch.vsflexOrderSearch.title == "SearchGrid") {
                        gridProperty.grid = window.dialogArguments.parent.toolBarFrm.oWndOrderSearch.vsflexOrderSearch;
                    }
                }
                break;
            case optionGrid.SearchGridForCancelledOrder:
                gridProperty.colLanguage = quotationFrm.searchGridLanguageForCancelledOrder;
                if (window.dialogArguments.parent.toolBarFrm.oWndOrderSearch) {
                    if (window.dialogArguments.parent.toolBarFrm.oWndOrderSearch.vsflexOrderSearch.title == "SearchGridForCancelledOrder") {
                        gridProperty.grid = window.dialogArguments.parent.toolBarFrm.oWndOrderSearch.vsflexOrderSearch;
                    }
                }
                break;
            case optionGrid.InterestGrid:
                gridProperty.colLanguage = quotationFrm.interestGridLanguage;
                if (window.dialogArguments.parent.toolBarFrm.oWndOpenInterest)
                    gridProperty.grid = window.dialogArguments.parent.toolBarFrm.oWndOpenInterest.vsflexOpenInterest;
                break;
            case optionGrid.GroupNetPositionGrid:
                gridProperty.colLanguage = quotationFrm.groupNetPositionGridLanguage;
                if (window.dialogArguments.parent.toolBarFrm.oWndOpenInterest)
                    gridProperty.grid = window.dialogArguments.parent.toolBarFrm.oWndOpenInterest._GroupNetPositionGrid;
                break;
            case optionGrid.InterestSummaryGrid:
                gridProperty.colLanguage = quotationFrm.interestSummaryGridLanguage;
                if (window.dialogArguments.parent.toolBarFrm.oWndOpenInterest)
                    gridProperty.grid = window.dialogArguments.parent.toolBarFrm.oWndOpenInterest._OpenInterestSummaryGrid;
                break;
            case optionGrid.ExecuteOrderSummaryGrid:
                gridProperty.colLanguage = quotationFrm.executeOrderSummaryGridLanguage;
                if (window.dialogArguments.parent.toolBarFrm.oWndExecuteOrders)
                    gridProperty.grid = window.dialogArguments.parent.toolBarFrm.oWndExecuteOrders._ExecuteOrderSummaryGrid;
                break;
            case optionGrid.InstantOrderListGrid:
                gridProperty.colLanguage = quotationFrm.instantOrderListGridLanguage;
                break;
            case optionGrid.DealingPolicyDetailGrid:
                gridProperty.colLanguage = quotationFrm.dealingPolicyDetailGridLanguage;
                var oWndDealingPolicy = window.dialogArguments.parent.toolBarFrm.oWndDealingPolicy;
                if (oWndDealingPolicy != null
                    && oWndDealingPolicy._DealingPolicyFormIFrame != null
                    && typeof (oWndDealingPolicy._DealingPolicyFormIFrame.dealingPolicyDetailPageLoaded) != 'undefined' && oWndDealingPolicy._DealingPolicyFormIFrame.dealingPolicyDetailPageLoaded == true
                    && oWndDealingPolicy._DealingPolicyFormIFrame._DealingPolicyDetailGrid != null
                    && oWndDealingPolicy._DealingPolicyFormIFrame._DealingPolicyDetailGrid.readyState == 4) {
                    gridProperty.grid = oWndDealingPolicy._DealingPolicyFormIFrame._DealingPolicyDetailGrid;
                }
                break;
            case optionGrid.CustomerPolicyManagementGrid:
                gridProperty.colLanguage = quotationFrm.customerPolicyManagementGridLanguage;
                var oWndDealingPolicy = window.dialogArguments.parent.toolBarFrm.oWndDealingPolicy;
                if (oWndDealingPolicy != null
                    && oWndDealingPolicy._CustomerPolicyManagementFormIframe != null
                    && typeof (oWndDealingPolicy._CustomerPolicyManagementFormIframe.customerPolicyManagementPageLoaded) != 'undefined' && oWndDealingPolicy._CustomerPolicyManagementFormIframe.customerPolicyManagementPageLoaded == true
                    && oWndDealingPolicy._CustomerPolicyManagementFormIframe._CustomerPolicyManagementGrid != null
                    && oWndDealingPolicy._CustomerPolicyManagementFormIframe._CustomerPolicyManagementGrid.readyState == 4) {
                    gridProperty.grid = oWndDealingPolicy._CustomerPolicyManagementFormIframe._CustomerPolicyManagementGrid;
                }
                break;
            case optionGrid.BlotterSelectionGrid:
                gridProperty.colLanguage = quotationFrm.blotterSelectionGridLanguage;
                break;
            case optionGrid.ExecutedGrid:
                gridProperty.colLanguage = quotationFrm.executedGridLanguage;
                if (window.dialogArguments.parent.toolBarFrm.oWndExecuteOrders)
                    gridProperty.grid = window.dialogArguments.parent.toolBarFrm.oWndExecuteOrders.vsflexExecuteOrders;
                break;
            case optionGrid.UnclosedOrderGrid:
                gridProperty.colLanguage = quotationFrm.unclosedOrderGridLanguage;
                break;
            case optionGrid.OrderPrintGrid:
                gridProperty.colLanguage = quotationFrm.orderPrintGridLanguage;
        }
        return gridProperty;
    };

    this.FillValue2 = function () {
        //try
        {
            var settingsKey = window.cmbDoGrid.value;
            var parameter = "";

            if (window.dialogArguments.parent.quotationFrm.settings.Exists(settingsKey)) {
                parameter = window.dialogArguments.parent.quotationFrm.settings.Item(settingsKey).Parameter;
                if (parameter == "") {
                    this.FillDefaultValue();
                    return;
                }
                var msXml = new ActiveXObject("MSXML.DOMDocument");
                msXml.loadXML(parameter);
                if (!msXml) return;

                this.FillByParameter(msXml);
            }
            else {
                this.FillDefaultValue();
            }
        }
        //catch(ex)
        { }
    };

    this.FillByParameter = function (msXml) {
        window.SettingGrid.Redraw = false;
        window.SettingGrid.Rows = window.SettingGrid.FixedRows;

        var gridProperty = this.GetGridProperty();
        var colLanguage = gridProperty.colLanguage;

        var nodeName;
        var nodeValue;
        var gridNode = msXml.firstChild;
        for (var j = 0, count = gridNode.attributes.length; j < count; j++) {
            nodeName = gridNode.attributes.item(j).nodeName;
            nodeValue = gridNode.getAttribute(nodeName);
            switch (nodeName) {
                case "FontName":
                    window.cmbFontName.value = nodeValue;
                    break;
                case "FontSize":
                    window.cmbFontSize.value = nodeValue;
                    break;
                case "RowHeight":
                    window.cmbRowHeight.value = nodeValue;
                    break;
            }
        }

        var columnsNode = gridNode.firstChild;
        for (var j = 0; columnsNode && j < columnsNode.childNodes.length; j++) {
            var columnNode = columnsNode.childNodes.item(j);
            var columnKey = columnNode.getAttribute("ColKey");
            var columnWidthValue = columnNode.getAttribute("ColWidth");
            var columnHiddenValue = (columnNode.getAttribute("ColHidden") == "1") ? flexChecked : flexUnchecked;

            with (window.SettingGrid) {
                AddItem("");
                var insertRow = Rows - 1;
                TextMatrix(insertRow, ColIndex("ColKey")) = columnKey;
                TextMatrix(insertRow, ColIndex("Column")) = colLanguage[columnKey];
                TextMatrix(insertRow, ColIndex("ColWidth")) = parseInt(columnWidthValue);

                Cell(flexcpChecked, insertRow, ColIndex("ColHidden")) = (columnHiddenValue == "1") ? flexChecked : flexUnchecked;

                if (colLanguage[columnKey] == "") {
                    RowHidden(insertRow) = true;
                    Cell(flexcpChecked, insertRow, ColIndex("ColHidden")) = flexChecked;
                }
            }
        }

        //Add column refresh
        for (prop in colLanguage) {
            with (window.SettingGrid) {
                var isExists = false;
                for (var k = FixedRows, kCount = Rows; k < kCount; k++) {
                    if (TextMatrix(k, ColIndex("ColKey")) == prop) {
                        isExists = true;
                        break;
                    }
                }
                if (!isExists) {
                    AddItem("");
                    TextMatrix(k, ColIndex("ColKey")) = prop;
                    TextMatrix(k, ColIndex("Column")) = colLanguage[prop];

                    //Fill Default Value........
                    TextMatrix(k, ColIndex("ColWidth")) = 1200;
                    Cell(flexcpChecked, k, ColIndex("ColHidden")) = flexUnchecked;

                    if (colLanguage[prop] == "") {
                        RowHidden(k) = true;
                        Cell(flexcpChecked, k, ColIndex("ColHidden")) = flexChecked;
                    }
                }
            }
        }
        window.SettingGrid.Redraw = true;
        if (window.SettingGrid.Rows > window.SettingGrid.FixedRows) return;
        this.GetCurrentValue();
    };

    this.cmbDoGrid_OnChange = function () {
        window.SettingGrid.Rows = window.SettingGrid.FixedRows;
        window.cmbFontSize.selectedIndex = 3;
        window.cmbFontName.selectedIndex = 0;
        window.cmbRowHeight.selectedIndex = 4;

        this.FillValue2();
    };

    this.FillDefaultValue = function () {
        this.GetCurrentValue();

        if (window.SettingGrid.Rows > window.SettingGrid.FixedRows) return;

        window.SettingGrid.Redraw = false;
        var gridProperty = this.GetGridProperty();
        var colLanguage = gridProperty.colLanguage;
        if (colLanguage) {
            var insertRow = window.SettingGrid.FixedRows;
            for (prop in colLanguage) {
                with (window.SettingGrid) {
                    AddItem("");
                    TextMatrix(insertRow, ColIndex("ColKey")) = prop;
                    TextMatrix(insertRow, ColIndex("Column")) = colLanguage[prop];

                    //Fill Default Value........
                    TextMatrix(insertRow, ColIndex("ColWidth")) = 1200;
                    Cell(flexcpChecked, insertRow, ColIndex("ColHidden")) = flexUnchecked;

                    if (colLanguage[prop] == "") {
                        RowHidden(insertRow) = true;
                        Cell(flexcpChecked, insertRow, ColIndex("ColHidden")) = flexChecked;
                    }
                    insertRow++;
                }
            }

        }
        window.SettingGrid.Redraw = true;
    };

    this.GetCurrentValue = function () {
        window.SettingGrid.Redraw = false;
        var gridProperty = this.GetGridProperty();
        var colLanguage = gridProperty.colLanguage;
        var grid = gridProperty.grid;

        if (grid != null && colLanguage) {
            window.SettingGrid.Rows = window.SettingGrid.FixedRows;

            var quotationFrm = window.dialogArguments.parent.quotationFrm;
            var optionGrid = quotationFrm.optionGrid;
            if (window.cmbDoGrid.value == optionGrid.GroupNetPositionGrid) {
                var groupNetPositionGridColKey = quotationFrm.groupNetPositionGridColKey;
                with (grid) {
                    var columnCount = 6 - FixedCols;
                    window.SettingGrid.Rows = window.SettingGrid.FixedRows + columnCount;
                    var insertRow = window.SettingGrid.FixedRows;
                    for (var lngCol = FixedCols; lngCol < Cols; lngCol++) {
                        if (insertRow >= window.SettingGrid.Rows) break;
                        var prop = ColKey(lngCol);
                        switch (prop) {
                            case groupNetPositionGridColKey.GroupCode:
                            case groupNetPositionGridColKey.Selected:
                            case groupNetPositionGridColKey.OIPercent:
                            case groupNetPositionGridColKey.GroupId:
                                window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColKey")) = prop;
                                window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("Column")) = colLanguage[prop];
                                window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColWidth")) = ColWidth(lngCol);
                                window.SettingGrid.Cell(flexcpChecked, insertRow, window.SettingGrid.ColIndex("ColHidden")) = ColHidden(lngCol);
                                if (colLanguage[prop] == "") {
                                    window.SettingGrid.RowHidden(insertRow) = true;
                                    window.SettingGrid.Cell(flexcpChecked, insertRow, window.SettingGrid.ColIndex("ColHidden")) = flexChecked;
                                }
                                insertRow++;
                                break;
                            default:
                                window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColKey")) = groupNetPositionGridColKey.LotBalance;
                                window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("Column")) = colLanguage[groupNetPositionGridColKey.LotBalance];
                                window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColWidth")) = ColWidth(lngCol);
                                window.SettingGrid.Cell(flexcpChecked, insertRow, window.SettingGrid.ColIndex("ColHidden")) = flexUnchecked;
                                insertRow++;
                                window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColKey")) = groupNetPositionGridColKey.Quantity;
                                window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("Column")) = colLanguage[groupNetPositionGridColKey.Quantity];
                                window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColWidth")) = ColWidth(lngCol);
                                window.SettingGrid.Cell(flexcpChecked, insertRow, window.SettingGrid.ColIndex("ColHidden")) = flexUnchecked;
                                insertRow++;                              
                                break;
                        }
                    }
                    if (insertRow < window.SettingGrid.Rows) {
                        window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColKey")) = groupNetPositionGridColKey.LotBalance;
                        window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("Column")) = colLanguage[groupNetPositionGridColKey.LotBalance];
                        window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColWidth")) = ColWidth(lngCol);
                        window.SettingGrid.Cell(flexcpChecked, insertRow, window.SettingGrid.ColIndex("ColHidden")) = flexChecked;
                        insertRow++;
                        window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColKey")) = groupNetPositionGridColKey.Quantity;
                        window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("Column")) = colLanguage[groupNetPositionGridColKey.Quantity];
                        window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColWidth")) = ColWidth(lngCol);
                        window.SettingGrid.Cell(flexcpChecked, insertRow, window.SettingGrid.ColIndex("ColHidden")) = flexChecked;
                    }
                }
            }
            else {
                with (grid) {
                    var columnCount = Cols - FixedCols;
                    window.SettingGrid.Rows = window.SettingGrid.FixedRows + columnCount;
                    var insertRow = window.SettingGrid.FixedRows;
                    for (var lngCol = FixedCols; lngCol < Cols; lngCol++) {
                        var prop = ColKey(lngCol);

                        window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColKey")) = prop;
                        window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("Column")) = colLanguage[prop];

                        window.SettingGrid.TextMatrix(insertRow, window.SettingGrid.ColIndex("ColWidth")) = ColWidth(lngCol);
                        window.SettingGrid.Cell(flexcpChecked, insertRow, window.SettingGrid.ColIndex("ColHidden")) = ColHidden(lngCol);

                        if (colLanguage[prop] == "") {
                            window.SettingGrid.RowHidden(insertRow) = true;
                            window.SettingGrid.Cell(flexcpChecked, insertRow, window.SettingGrid.ColIndex("ColHidden")) = flexChecked;
                        }

                        insertRow++;
                    }
                }
            }
        }
        window.SettingGrid.Redraw = true;
    };

    this.GetColumns = function () {
        var columns = "";
        with (window.SettingGrid) {
            for (var i = FixedRows; i < Rows; i++) {
                var columnKey = TextMatrix(i, ColIndex("ColKey"));
                var columnWidth = TextMatrix(i, ColIndex("ColWidth"));
                var columnWidthValue = parseInt(columnWidth);
                if (isNaN(columnWidthValue)) {
                    columnWidth = "1200";
                    TextMatrix(i, ColIndex("ColWidth")) = 1200;
                }

                var columnHidden  = (Cell(flexcpChecked, i, ColIndex("ColHidden")) == flexChecked) ? "1" : "0";

                columns += "<Col ";
                columns += "ColKey=\"" + columnKey + "\" ";
                columns += "ColWidth=\"" + columnWidth + "\" ";
                columns += "ColHidden=\"" + columnHidden + "\" ";
                columns += "></Col>";
            }
        }

        return columns;
    };

    this.GetXml = function () {
        var xml = "<Grid ";
        xml += "FontName=\"" + window.cmbFontName.value + "\" ";
        xml += "FontSize=\"" + window.cmbFontSize.value + "\" ";
        xml += "RowHeight=\"" + window.cmbRowHeight.value + "\" ";
        xml += ">";
        xml += "<Cols>";
        xml += this.GetColumns();
        xml += "</Cols>";
        xml += "</Grid>";

        return xml;
    };

    this.OK_OnClick = function () {
        //try
        {
            var xml = this.GetXml();
            if (xml != "") {
                var quotationFrm = window.dialogArguments.parent.quotationFrm;

                //Update settings
                var settingsKey = window.cmbDoGrid.value;
                quotationFrm.oDealingConsole.UpdateSettings(settingsKey, xml);

                //Refresh UI
                var gridProperty = this.GetGridProperty();
                var colLanguage = gridProperty.colLanguage;
                var grid = gridProperty.grid;
                if (grid != null) {
                    if (settingsKey == quotationFrm.optionGrid.GroupNetPositionGrid) {
                        var win = window.dialogArguments.parent.toolBarFrm.oWndOpenInterest;
                        if (win) {
                            //if (win._GroupNetPositionTBody.style.display == 'block') {
                            win.ReFillDataToGNPGrid();
                            //}
                        }
                    }
                    else {
                        quotationFrm.oDealingConsole.RefreshGridBySetting(grid, settingsKey, colLanguage);
                    }

                    switch (settingsKey) {
                        case quotationFrm.optionGrid.QuotationGrid:
                            quotationFrm.QuotationGridFontChanged();
                            window.dialogArguments.parent.propertyFrm.OnSelectChanged();
                            break;
                        case quotationFrm.optionGrid.QuotationTaskGrid:
                            window.dialogArguments.parent.quotationTaskFrm.QuotationTaskGridFontChanged();
                            break;
                        case quotationFrm.optionGrid.OrderGrid:
                            window.dialogArguments.parent.orderTaskFrm.OrderTaskGridFontChanged();
                            break;
                        case quotationFrm.optionGrid.QuotePolicyGrid:
                            window.dialogArguments.parent.QuotePolicyFrm.QuotePolicyGridFontChanged();
                            break;
                        case quotationFrm.optionGrid.HistoryGrid:
                            window.dialogArguments.parent.propertyFrm.HistoryGridFontChanged();
                            break;
                        //...
                    }
                }

                //Save Data
                if (window.document.all.chkSaveCurrentLayout.checked) {
                    quotationFrm.oDealingConsole.UpdateSystemParameters(xml, settingsKey);
                }
            }
        }
        //catch(e)
        { }
    };	
}

function SetLayout()
{
	if (window.document.all.chkSaveCurrentLayout.checked)
	{
		var defaultUi = window.dialogArguments.parent;
		
		var xml = "<Frameset ";
		xml += "OuterFrameset=\""+defaultUi.OuterFrameset.rows+"\" ";
		//xml += "InnerFrameset=\""+defaultUi.InnerFrameset.rows+"\" ";
		xml += "InnerFrameset2=\""+defaultUi.InnerFrameset2.cols+"\" ";
		xml += "QuotationFrameset=\""+defaultUi.QuotationFrameset.rows+"\" ";
		xml += ">";
		xml += "</Frameset>";
		
		var quotationFrm = defaultUi.quotationFrm;
		var optionGrid = quotationFrm.optionGrid;
		var settingsKey = optionGrid.Frameset;
		quotationFrm.oDealingConsole.UpdateSettings(settingsKey,xml);
		//Save Data
		quotationFrm.oDealingConsole.UpdateSystemParameters(xml,settingsKey);
	}
}

function ClearSetValueForAll() {
    if (!window.txtOriginInactiveTime.disabled) window.txtOriginInactiveTime.value = "";
    if (!window.txtAlertVariation.disabled) window.txtAlertVariation.value = "";
    if (!window.txtNormalWaitTime.disabled) window.txtNormalWaitTime.value = "";
    if (!window.txtAlertWaitTime.disabled) window.txtAlertWaitTime.value = "";
    if (!window.txtMaxDQLot.disabled) window.txtMaxDQLot.value = "";
    if (!window.txtMaxOtherLot.disabled) window.txtMaxOtherLot.value = "";
    if (!window.txtDQQuoteMinLot.disabled) window.txtDQQuoteMinLot.value = "";
    if (!window.txtAutoDQMaxLot.disabled) window.txtAutoDQMaxLot.value = "";
    if (!window.txtAutoLmtMktMaxLot.disabled) window.txtAutoLmtMktMaxLot.value = "";
    if (!window.txtAcceptDQVariation.disabled) window.txtAcceptDQVariation.value = "";
    if (!window.txtAcceptLmtVariation.disabled) window.txtAcceptLmtVariation.value = "";
    if (!window.textAcceptCloseLmtVariation.disabled) window.textAcceptCloseLmtVariation.value = "";
    if (!window.txtCancelLmtVariation.disabled) window.txtCancelLmtVariation.value = "";
    if (!window.txtMaxMinAdjust.disabled) window.txtMaxMinAdjust.value = "";
    if (!window.txtHitTimes.disabled) window.txtHitTimes.value = "";
    if (!window.txtPenetrationPoint.disabled) window.txtPenetrationPoint.value = "";
    if (!window.txtPriceValidTime.disabled) window.txtPriceValidTime.value = "";
    if (!window.txtLastAcceptTimeSpan.disabled) window.txtLastAcceptTimeSpan.value = "";
    if (!window.txtAutoDQDelay.disabled) window.txtAutoDQDelay.value = "";
    if (!window.cmbIsBetterPrice.disabled) window.cmbIsBetterPrice.value = "";
    if (!window.txtAutoAcceptMaxLot.disabled) window.txtAutoAcceptMaxLot.value = "";
    if (!window.txtAutoCancelMaxLot.disabled) window.txtAutoCancelMaxLot.value = "";
    if (!window.cmbAllowedNewTradeSides.disabled) window.cmbAllowedNewTradeSides.value = 3;
    if (!window.textHitPriceVariationForSTP.disabled) window.textHitPriceVariationForSTP.value = "";

    window.document.all._ApplyToDealingPolicyCheckbox.checked = false;
}

function SetDealerParameterEditable() {
    var quotationFrm = window.dialogArguments.parent.quotationFrm;
    var instrumentColKey = quotationFrm.instrumentColKey;
    var canEdit = true;
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.OriginInactiveTime));
    window.txtOriginInactiveTime.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AlertVariation));
    window.txtAlertVariation.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.NormalWaitTime));
    window.txtNormalWaitTime.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AlertWaitTime));
    window.txtAlertWaitTime.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.MaxDQLot));
    window.txtMaxDQLot.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.MaxOtherLot));
    window.txtMaxOtherLot.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.DQQuoteMinLot));
    window.txtDQQuoteMinLot.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AutoDQMaxLot));
    window.txtAutoDQMaxLot.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AutoLmtMktMaxLot));
    window.txtAutoLmtMktMaxLot.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AcceptDQVariation));
    window.txtAcceptDQVariation.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AcceptLmtVariation));
    window.txtAcceptLmtVariation.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AcceptCloseLmtVariation));
    window.textAcceptCloseLmtVariation.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.CancelLmtVariation));
    window.txtCancelLmtVariation.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.MaxMinAdjust));
    window.txtMaxMinAdjust.disabled = !canEdit;
        
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.HitTimes));
    window.txtHitTimes.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.PenetrationPoint));
    window.txtPenetrationPoint.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.PriceValidTime));
    window.txtPriceValidTime.disabled = !canEdit;
    
    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.LastAcceptTimeSpan));
    window.txtLastAcceptTimeSpan.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AutoDQDelay));
    window.txtAutoDQDelay.disabled = !canEdit;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.IsBetterPrice));
    window.cmbIsBetterPrice.disabled = canEdit ? false : true;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AutoAcceptMaxLot));
    window.txtAutoAcceptMaxLot.disabled = canEdit ? false : true;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AutoCancelMaxLot));
    window.txtAutoCancelMaxLot.disabled = canEdit ? false : true;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.AllowedNewTradeSides));
    window.cmbAllowedNewTradeSides.disabled = canEdit ? false : true;

    canEdit = (quotationFrm.oDealingConsole.CanModifyDealerParameter(instrumentColKey.HitPriceVariationForSTP));
    window.textHitPriceVariationForSTP.disabled = canEdit ? false : true;

    //window.document.all._ApplyToDealingPolicyCheckbox.checked = false;
}

function CopyFrom(setting){
    this.Setting = setting;
    this.oComboCodesForSound = new ActiveXObject("Scripting.Dictionary"); //key=Id value=ComboCode
    this.oComboCodesForGrid = new ActiveXObject("Scripting.Dictionary"); //key=Id value=ComboCode

    this.Init = function () {
        this.GetUserListForCopyFrom();
    };

    this.FillSelect = function (control, elementInnerText, elementValue) {
        var element = document.createElement("OPTION");
        control.add(element);
        element.innerText = elementInnerText;
        element.value = elementValue;
    };

    this.FillUserListForCopyFrom = function (oComboCodes, control) {
        control.options.length = 0;
        var comboCodes = (new VBArray(oComboCodes.Items())).toArray();
        for (var index = 0, count = comboCodes.length; index < count; index++) {
            this.FillSelect(control, comboCodes[index].GetCode(), comboCodes[index].GetId());
        }
    };

    this.GetUserListForCopyFrom = function () {
        window.dialogArguments.parent.quotationFrm.oIOProxy.GetUserListForCopyFrom(this);
    }

    this.GetUserListForCopyFromResult = function (dataSet) {
        if (!dataSet) return;
        if (dataSet.Tables.Count <= 0) return;

        var table = dataSet.Tables(0);
        for (var index = 0; table && index < table.Rows.Count; index++) {
            var row = table.Rows(index);
            var code = row("Code");
            var comboCode = new ComboCode();
            comboCode.UpdateByDataRow(row);

            this.oComboCodesForSound.Item(code) = comboCode;
        }

        table = dataSet.Tables(1);
        for (var index = 0; table && index < table.Rows.Count; index++) {
            var row = table.Rows(index);
            var code = row("Code");
            var comboCode = new ComboCode();
            comboCode.UpdateByDataRow(row);

            this.oComboCodesForGrid.Item(code) = comboCode;
        }

        this.FillUserListForCopyFrom(this.oComboCodesForSound, window.cmbCopyFromForSound);
        this.FillUserListForCopyFrom(this.oComboCodesForGrid, window.cmbCopyFromForGrid);
    };

    ///////////////////////////////////
    this.GetSoundSettingForCopyFrom = function () {
        var key = "Sound";
        var fromUserId = window.cmbCopyFromForSound.value;
        if (fromUserId == null || fromUserId == "") return;

        this.GetSettingForCopyFromProcess(key, fromUserId);
    };

    this.GetGridSettingForCopyFrom = function () {
        var key = window.cmbDoGrid.value;
        var fromUserId = window.cmbCopyFromForGrid.value;
        if (fromUserId == null || fromUserId == "") return;

        this.GetSettingForCopyFromProcess(key, fromUserId);
    };

    this.GetSettingForCopyFromProcess = function (key, fromUserId) {
        window.dialogArguments.parent.quotationFrm.oIOProxy.GetSettingForCopyFrom(this, key, fromUserId);
    };

    this.oSoundOptions = new ActiveXObject("Scripting.Dictionary"); //key=ID value=Sound File Name

    this.GetSettingForCopyFromResult = function (key, sXml) {
        if (sXml == null || sXml == "") return;

        var msXml = new ActiveXObject("MSXML.DOMDocument");
        msXml.loadXML(sXml);

        if (key == "Sound") {
            var settingsNode = msXml.firstChild;
            for (var i = 0, count = settingsNode.childNodes.length; settingsNode && i < count; i++) {
                var tempNode = settingsNode.childNodes.item(i);
                switch (tempNode.nodeName) {
                    case "Sound":
                        this.oSoundOptions.RemoveAll();
                        for (var j = 0, count2 = tempNode.childNodes.length; j < count2; j++) {
                            var tempChildNode = tempNode.childNodes[j];
                            var id = tempChildNode.attributes.getQualifiedItem("ID", "");
                            var fileName = tempChildNode.attributes.getQualifiedItem("FileName", "");
                            if (id && fileName) {
                                this.oSoundOptions.Item(id.value) = fileName.value;
                            }
                        }
                        window.FillSoundGrid(this.oSoundOptions);
                        break;
                }
            }
        }
        else {
            if (window.cmbDoGrid.value != key) return;
            this.Setting.FillByParameter(msXml);
        }
    };

}