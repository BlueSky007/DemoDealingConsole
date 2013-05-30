//object DataOfRow
function DataOfRow(type, scheduleID,relationObject, object)
{
	this.type = type;
	this.scheduleID = scheduleID;
	this.relationObject = relationObject,
	this.object = object;
}

function Round(number, decimalUnit) {
    return Math.round(number * Math.pow(10, decimalUnit)) / Math.pow(10, decimalUnit);
}

function Round2(number, decimalUnit) {
    //return  Math.round(number*Math.pow(10,decimalUnit))/Math.pow(10,decimalUnit);	
    var strnumber = number.toString();
    return FormatNumberString(strnumber, decimalUnit);
}

function FormatNumberString(numberString, DecimalDigits) {
    var fValue = FormateNumberStringWithoutSymbol(numberString, DecimalDigits);
    return (CastStrWithSymbol(fValue));
}

function FormateNumberStringWithoutSymbol(numberString, DecimalDigits) {
    var fValue = isNaN(parseFloat(numberString)) ? 0 : parseFloat(numberString);
    //var numberRound = this.Round(fValue,DecimalDigits);
    var numberRound = Math.round(fValue * Math.pow(10, DecimalDigits)) / Math.pow(10, DecimalDigits);
    return CastStrWithDecimal(numberRound.toString(), DecimalDigits);
}

function CastStrWithDecimal(strValue, nNumber) {
    if (strValue == "") return strValue;
    var nNum = strValue.indexOf(".");
    var nZero2Add = 0;
    if (nNum > -1) {
        nNum = strValue.length - nNum - 1;
        nZero2Add = nNumber - nNum;
    }
    else {
        nZero2Add = nNumber;
        if (nNumber != 0)
            strValue += ".";
    }

    for (var i = 0; i < nZero2Add; i++) {
        strValue += "0";
    }
    return (strValue);
}

function CastStrWithSymbol(str) {
    try {
        var newStr = this.Trim(str);
        if (newStr.length == 0) { return (newStr); }
        var symbolPN = "";
        var firstChar = str.substr(0, 1);
        if (firstChar == "+" || firstChar == "-") {
            symbolPN = firstChar;
            if (newStr.length > 1)
                newStr = newStr.substr(1, newStr.length - 1);
        }
        var pointPosition = newStr.lastIndexOf(".");
        var strAfterCastIntPart = "";
        var decimalPart = "";

        if (pointPosition != -1) {
            decimalPart = newStr.substr(pointPosition, newStr.length - pointPosition);
            newStr = newStr.substr(0, pointPosition);
        }
        if (newStr.length <= 3) {
            strAfterCastIntPart = newStr;
        }
        else {
            while (newStr.length > 3) {

                strAfterCastIntPart = "," + newStr.substr(newStr.length - 3, 3) + strAfterCastIntPart;
                newStr = newStr.substr(0, newStr.length - 3);
                if (newStr.length <= 3) {
                    strAfterCastIntPart = newStr + strAfterCastIntPart;
                }
            }
        }
        return (symbolPN + strAfterCastIntPart + decimalPart);
    }
    catch (e) {
        return (str);
    }
}

function Trim( strSrc )
{
	return ( RTrim( LTrim( strSrc ) ) );
}

function LTrim( strSrc )
{
	if(!strSrc)	return null;
	
	var nStart = 0;
	var nLength = strSrc.length;
	for ( var i=0; i<nLength; i++ )
	{
		if ( strSrc.charAt(i) == " " )
		{
			nStart++;
		}
		else
		{
			break;
		}
	}
	return strSrc.substring( nStart, nLength );
}

function RTrim( strSrc )
{
	if(!strSrc)	return null;
	
	var nEnd = strSrc.lastIndexOf( " " );
	if ( nEnd == -1 ) return strSrc;

	for ( ; nEnd>0; nEnd-- )
	{
		if ( strSrc.charAt( nEnd ) != " " ) break;
	}

	if ( strSrc.charAt( nEnd ) != " " ) nEnd += 1;
	return strSrc.substr( 0, nEnd );
}

//generate the SourcePrice when dealer's adjusting 
//parameters:adjust,source,numeratorUnit,denominator
//return:the generated SourcePrice Old Name is SourcePrice
function GetAdjustPrice(adjust, source, numeratorUnit, denominator) {
    var returnVal = "";
    var IntPart;
    var NumPart;
    var IntPartAdjust;
    var NumPartAdjust;
    var IntPartSource;
    var NumPartSource;
    var NumPartSourceReal;
    var PointPos;
    var LinePos;
    var Diff; //the difference of the numeric part of the adjust and the numeric part of the source

    LinePos = source.indexOf("/");
    PointPos = adjust.indexOf(".");
    //GetIntNumPartFmAdjust(adjust, IntPartAdjust, NumPartAdjust);
    {
        var pointPosTemp = adjust.indexOf(".");
        if (pointPosTemp == -1)
            IntPartAdjust = "";
        else {
            IntPartAdjust = adjust.substr(0, pointPosTemp);
        }
        NumPartAdjust = adjust.substr(pointPosTemp + 1);
    }

    //GetIntNumPartFmSource(source, IntPartSource, NumPartSource);
    {
        var pointPosTemp = source.indexOf(".");
        if (pointPosTemp == -1) {
            IntPartSource = source;
            NumPartSource = "";
        }
        else {
            IntPartSource = source.substr(0, pointPosTemp);
            NumPartSource = source.substr(pointPosTemp + 1);
        }
    }

    if (NumPartSource.length == 0) {
        //NumPartAdjust = parseInt(adjust, 10);
        NumPartAdjust = Math.round(parseInt(adjust * 10, 10) / 10).toString();
        Diff = NumPartAdjust.length - IntPartSource.length;
        if (Diff < 0) {
            IntPart = IntPartSource.substr(0, Math.abs(Diff)) + NumPartAdjust;
            IntPart = ((parseInt(IntPart) / numeratorUnit + (parseInt(IntPart) % numeratorUnit < numeratorUnit / 2 ? 0 : 1)) * numeratorUnit).toString();
        } else {
            IntPart = NumPartAdjust; //(parseInt(NumPartSource) / numeratorUnit) * numeratorUnit;
        }
        returnVal = IntPart;
    }
    else {
        if (LinePos == -1) {
            var decimalPart;
            Diff = NumPartAdjust.length - NumPartSource.length;
            if (PointPos == -1) {
                if (Diff > 0) {
                    //NumPart = NumPartAdjust.substr(0, NumPartSource.length);

                    //NumPart = Math.round(NumPartAdjust.substr(0, NumPartSource.length + 1) / 10);
                    decimalPart = "0." + NumPartAdjust.substr(0, NumPartSource.length + 1);
                } else {
                    //NumPart = NumPartSource.substr(0, Math.abs(Diff)) + NumPartAdjust;
                    decimalPart = "0." + NumPartSource.substr(0, Math.abs(Diff)) + NumPartAdjust;
                }
                IntPart = IntPartSource;
            }
            else {
                if (Diff > 0) {
                    //NumPart = NumPartAdjust.substr(0, NumPartSource.length);

                    //NumPart = Math.round(NumPartAdjust.substr(0, NumPartSource.length + 1) / 10);
                    decimalPart = "0." + NumPartAdjust.substr(0, NumPartSource.length + 1);

                } else {
                    //NumPart = NumPartAdjust.substr(0, NumPartSource.length) + NumPartSource.substr(NumPartSource.length - Math.abs(Diff));
                    decimalPart = "0." + NumPartAdjust.substr(0, NumPartSource.length) + NumPartSource.substr(NumPartSource.length - Math.abs(Diff));
                }
                Diff = IntPartAdjust.length - IntPartSource.length;
                if (Diff >= 0) {
                    IntPart = IntPartAdjust;
                } else {
                    IntPart = IntPartSource.substr(0, Math.abs(Diff)) + IntPartAdjust;
                }
            }
            NumPart = Math.round(decimalPart * denominator * Math.pow(10, numeratorUnit.toString().length - 1));        // 1, 1000,  0.1125,    0.1149, 10, 1000
            NumPart = Math.round(NumPart / Math.pow(10, numeratorUnit.toString().length - 1));
            var roundValue = Math.round(NumPart / numeratorUnit) * numeratorUnit;
            var intValue = parseInt(NumPart / numeratorUnit) * numeratorUnit;
            var decimalValue = parseFloat(decimalPart) * denominator;
            NumPart = (roundValue - decimalValue > decimalValue - intValue ? intValue : roundValue);

            //            NumPart = Math.round(NumPart / numeratorUnit) * numeratorUnit;
            //            normalizedValue = wholePart + parseFloat(numerator) / denominator;

            //returnVal = IntPart + "." + NumPart;

            if (NumPart < denominator) {
                //normalize numerator to multiple of _numeratorUnit
                NumPart = Math.round(NumPart / numeratorUnit) * numeratorUnit;
                //var normalizedValue = parseInt(IntPart) + parseFloat(NumPart) / denominator;

                //Denominator is 10,100....
                if (denominator == 10 || denominator == 100 || denominator == 1000 || denominator == 10000
								|| denominator == 100000 || denominator == 1000000 || denominator == 10000000 || denominator == 100000000)
                //var power10=Math.log(denominator)/Math.log(10);
                //if(Math.pow(10,Math.round(power10)) == denominator)
                {
                    var iCount = (denominator.toString()).length - 1;
                    returnVal = FormatAdjustPrice(parseInt(IntPart) + parseFloat(NumPart) / denominator, iCount);
                    //normalizedValue = parseFloat(normalizedPrice);
                }
                else {
                    if (parseFloat(NumPart) == 0) {
                        returnVal = IntPart;
                        //normalizedValue = parseFloat(normalizedPrice);
                    }
                    else {
                        returnVal = IntPart + "." + NumPart.toString() + "/" + denominator.toString();
                    }
                }
            }
            else {
                IntPart = parseInt(IntPart) + 1;
                var power10 = Math.log(denominator) / Math.log(10);
                if (Math.pow(10, Math.round(power10)) == denominator) {
                    returnVal = IntPart + "." + denominator.toString().substr(1, Math.round(power10));
                }
                else {
                    returnVal = IntPart;
                }
                //normalizedValue = parseFloat(normalizedPrice);
            }

        }
        else {
            NumPartSourceReal = NumPartSource.substr(0, NumPartSource.indexOf("/"));
            if (PointPos == -1) {
                if (parseInt(NumPartAdjust) >= denominator) {
                    returnVal = "";
                    return returnVal;
                }
                else {
                    if (NumPartAdjust.length < NumPartSourceReal.length) {
                        NumPart = Trim(NumPartSourceReal.substr(0, NumPartSourceReal.length - NumPartAdjust.length) + NumPartAdjust);
                    }
                    else {
                        NumPart = NumPartAdjust;
                    }
                }
                IntPart = IntPartSource;
            }
            else {
                if (parseInt(NumPartAdjust.substr(0, (denominator.toString()).length - 1)) >= denominator) {
                    returnVal = "";
                    return returnVal;
                }
                else {
                    if (NumPartSourceReal.length > NumPartAdjust.length) {
                        if (parseInt(NumPartAdjust + NumPartSourceReal.substr(NumPartSourceReal.length - NumPartAdjust.length)) > denominator) {
                            returnVal = ""
                            return returnVal;
                        }
                        else {
                            if (NumPartAdjust.length < NumPartSourceReal.length) {
                                NumPart = Trim(NumPartAdjust + NumPartSourceReal.substr(NumPartSourceReal.length - NumPartAdjust.length));
                            }
                            else {
                                NumPart = NumPartAdjust;
                            }
                        }
                    }
                    else {
                        NumPart = NumPartAdjust.substr(0, (denominator.toString()).length - 1);
                    }
                }
                Diff = IntPartAdjust.length - IntPartSource.length;
                if (Diff >= 0) {
                    IntPart = IntPartAdjust;
                }
                else {
                    IntPart = IntPartSource.substr(0, Math.abs(Diff)) + IntPartAdjust;
                }
            }
            if (parseInt(NumPart) > denominator) {
                returnVal = "";
                return returnVal;
            }

            if (parseInt(NumPart) % numeratorUnit > numeratorUnit / 2) {
                NumPart = ((parseInt(NumPart) / numeratorUnit + 1) * numeratorUnit).toString() + "/" + denominator.toString();
            }
            else {
                NumPart = ((parseInt(NumPart) / numeratorUnit) * numeratorUnit).toString() + "/" + denominator.toString();
            }
            returnVal = IntPart + "." + NumPart;
        }
        //returnVal = IntPart + "." + NumPart;
    }

    returnVal = GetAdjustPriceResult(Trim(returnVal));

    return returnVal;
}


function DuplicateZeroAdjustPrice(count) {
    var zeroString = "00000000";
    return zeroString.substring(0, count);
}

function RoundAdjustPrice(value, decimalDigits) {
    var multiple = Math.pow(10, decimalDigits);

    return Math.round(value * multiple) / multiple;
}

function FormatAdjustPrice(value, decimalDigits) {
    value = RoundAdjustPrice(value, decimalDigits);
    var valueString = value.toString();
    var index = valueString.indexOf(".");
    var padZero = 0;
    if (index > -1) {
        padZero = decimalDigits - (valueString.length - index - 1);
    }
    else {
        padZero = decimalDigits;
        valueString += ".";
    }

    return valueString.concat(DuplicateZeroAdjustPrice(padZero));
}

function GetAdjustPriceResult(priceVal)
{
	if ( priceVal.length >= 1 )
	{
		if ( priceVal.charAt(0) == "0" )
		{
			priceVal = priceVal.substr(1);
			priceVal = GetAdjustPriceResult(priceVal);
		}
		else if (  priceVal.charAt(0) == "." )
		{
			priceVal = "0" + Trim(priceVal);
		}
	}
	return priceVal;
}

function FormatFloat(s, decimalDigits)
{
	var retStr = null;
	var regexExpression = "(\\d+\\.{0,1}\\d{0,})";
	var regex = new RegExp(regexExpression,"i");
	if(regex.exec(s) != null)
	{
		retStr = RegExp.$1;
		var pointPos = retStr.indexOf(".");
		var decimalFraction = "";
		if(pointPos > -1)
		{
			//patch decimalFraction with "0"
			var decimalFractionStr = (Math.pow(10, decimalDigits+1)).toString();
			retStr = retStr + decimalFractionStr.substr(1); 
			
			decimalFraction = "1" + retStr.substr(pointPos+1, decimalDigits) + "." + retStr.substr(pointPos+1+decimalDigits, 1);
			decimalFractionStr = ( Math.round(decimalFraction) ).toString();
			retStr = retStr.substr(0, pointPos+1) + decimalFractionStr.substr(1);
		}
		else
		{
			var decimalFractionStr = (Math.pow(10, decimalDigits)).toString();
			retStr = retStr + "." + decimalFractionStr.substr(1); 
		}
	}
	return retStr;
}

function Date2TimeString(date)
{
	if(date)
	{
		var s = "";
		var value = date.getHours();
		if(value < 10)
			s = "0";
		s += value.toString();
		s += ":";

		value = date.getMinutes();
		if(value < 10)
			s += "0";
		s += value.toString();
		s += ":";

		value = date.getSeconds();
		if(value < 10)
			s += "0";
		s += value.toString();
		return s;
	}
	else
		return "00:00:00";
}

function Date2DateString(date)
{
	var s = "";
	if(date)
	{
		var value = date.getFullYear();
		s += value.toString();
		s += "-";

		value = date.getMonth() + 1;
		if(value < 10)
			s += "0";
		s += value.toString();
		s += "-";

		value = date.getDate();
		if(value < 10)
			s += "0";
		s += value.toString();
	}
	return s;
}

function Date2String(date)
{
    	var s = Date2DateString(date);
    	if(s != "") 
    		s += " ";
    	s += Date2TimeString(date)
    	return  s;
}

function GetDateTimeString(date, format) {
    if (date) {
        var s = "";
        var value = date.getFullYear();
        s += value.toString();
        s += "-";
        value = date.getMonth() + 1;
        if (value < 10)
            s += "0";
        s += value.toString();
        s += "-";
        value = date.getDate();
        if (value < 10)
            s += "0";
        s += value.toString();
        if (format == "DateTime" || format == "DateTimeMillionSeconds") {
            s += " ";
            value = date.getHours();
            if (value < 10)
                s += "0";
            s += value.toString();
            s += ":";
            value = date.getMinutes();
            if (value < 10)
                s += "0";
            s += value.toString();
            s += ":";
            value = date.getSeconds();
            if (value < 10)
                s += "0";
            s += value.toString();
            if (format == "DateTimeMillionSeconds") {
                s += ".";
                try {
                    value = date.getMilliseconds();
                }
                catch (e) {
                    value = 0;
                }
                if (value < 10)
                    s += "00";
                else if (value < 100)
                    s += "0";
                s += value.toString();
            }
        }
        return s;
    }
    else
        return "00:00:00";
}

function SetRowForeColor(vsflexGrid, line, color)
{
	vsflexGrid.Cell(flexcpForeColor,line,vsflexGrid.FixedCols,line,vsflexGrid.Cols-1) = color;
}

function SetRowBackColor(vsflexGrid, line, color)
{
	vsflexGrid.Cell(flexcpBackColor,line,vsflexGrid.FixedCols,line,vsflexGrid.Cols-1) = color;
}

function SetInstrumentBackColor(instrument, vsflexGrid, line) {
    if (!instrument.isTrading) {
        SetRowBackColor(vsflexGrid, line, color_lightgrey);
    }
    else if (!instrument.isPriceEnabled) {
        SetRowBackColor(vsflexGrid, line, color_lightblue);
    }
    else if (!instrument.allowLMT()) {
        SetRowBackColor(vsflexGrid, line, color_lightgreen);
    }
    else if (!instrument.isAutoFill) {
        SetRowBackColor(vsflexGrid, line, color_lightyellow);
    }
    else if (instrument.isAutoFill && instrument.isPriceEnabled) {
        SetRowBackColor(vsflexGrid, line, color_white);
    }
}

function GetTotalLot(orders, isBuy)
{
	var totalLot = 0;
	for(var index in orders)
	{
		if(orders[index].isBuy == isBuy)
		{
			totalLot += orders[index].lot;
		}
	}
	return totalLot;
}

function FilterKey(theEvent)
{ 
 	var keyCode = theEvent.keyCode;
	//alert(keyCode + "-" + String.fromCharCode(keyCode));
	
	if(theEvent.shiftKey && (keyCode>=48 && keyCode<=57))
		theEvent.returnValue = false;
	else if( (keyCode>=48 && keyCode<=57) ||	//0-9
		(keyCode>=186 && keyCode<=191) ||	//: =  , - . /
		(keyCode>=96 && keyCode<=105) ||	//0-9
		(keyCode>=109 && keyCode<=111) ||	//. /
		(keyCode>=32 && keyCode<=40) ||	//Space PgUp PgDn End Home Left Up Right Down
		(keyCode>=45 && keyCode<=46) ||	//Ins Del
		(keyCode>=16 && keyCode<=18) ||	//Shift Ctrl Atl
		(keyCode>=8 && keyCode<=9) ||	//BackSpace Tab
		keyCode == 13)	//enter
		theEvent.returnValue = true;
	else
		theEvent.returnValue = false;
}
//Modify by Erric
function GetEmptySuffix(lotDicimal) {
    var returnValue = ".";
    for (var i = 0; i < lotDicimal; i++) {
        returnValue += "0";
    }
    return returnValue;
}


function GetFormatLot2(lotString, isSplitLot, lotDecimal) {
    var decimalDigits = isSplitLot ? lotDecimal : 0;
    var lot = parseFloat(lotString);
    var lot = Math.round(lot * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits);

    lotString = lot.toString();
    if (lotString.length > 0 && lotString.substring(0, 1) == ".") {
        lotString = "0" + lotString;
    }
    var returnResult = lotString;
    if (isSplitLot == true) {
        if (lotString.indexOf(".") > 0) {
            lotString += "0000000000";
            returnResult = lotString.substring(0, lotString.indexOf(".")) + "." + lotString.substr(lotString.indexOf(".") + 1, decimalDigits);
        }
        else {
            // returnResult = lotString + ".00";
            returnResult = lotString + GetEmptySuffix(decimalDigits);
        }
    }
    else {
        if (lotString.indexOf(".") > 0) {
            returnResult = lotString.substring(0, lotString.indexOf("."));
        }
    }
    return (returnResult);
}

//Added by Michael on 2005-04-11
function GetFormatLot(lotString,isSplitLot)
{
    var decimalDigits = isSplitLot? GetDecimalPlaces(lotString) : 0;
    //var lot = parseFloat(lotString);
    var lot = lotString;
    lot = Math.round(lot*Math.pow(10,decimalDigits))/Math.pow(10,decimalDigits);
    	
	lotString = lot.toString();
	if (lotString.length > 0 && lotString.substring(0,1)==".")
	{
		lotString = "0" + lotString;
	}	
	var returnResult = lotString;
	if (isSplitLot == true)
	{
		if (lotString.indexOf(".") > 0)
		{
		    returnResult = lotString.substring(0, lotString.indexOf(".")) + "." + lotString.substr(lotString.indexOf(".") + 1, decimalDigits);
		}
		else
		{
			returnResult = lotString + ".0";
		}
	}
	else
	{
		if (lotString.indexOf(".") > 0)
		{
			returnResult = lotString.substring(0,lotString.indexOf("."));
		}
	}
	return(returnResult);
}

function GetDecimalPlaces(lot) {
    var lotString = lot.toString();
    var decimals = lotString.length - lotString.indexOf(".") - 1;
    return decimals > 2 ? 2 : decimals;
}

function GetEditDateTime(sDateTime) {
    try {
        var arrDateTime = sDateTime.split(" ");
        if (arrDateTime[0].length > 10) {
            var arrDateTime = sDateTime.split("T");
        }
        sDate = arrDateTime[0];
        sTime = arrDateTime[1];
        arrDate = sDate.split("-");
        arrTime = sTime.split(":");

        sYear = arrDate[0];
        sMonth = arrDate[1];
        sDay = arrDate[2];
        if (sMonth.length == 1)
            sMonth = "0" + sMonth;
        if (sDay.length == 1)
            sDay = "0" + sDay;

        sHour = arrTime[0];
        sMinute = arrTime[1];
        sSecond = arrTime[2];
        if (sHour.length == 1)
            sHour = "0" + sHour;
        if (sMinute.length == 1)
            sMinute = "0" + sMinute;
        if (sSecond.length == 1)
            sSecond = "0" + sSecond;
        sSecond = sSecond.substring(0, 2);
        return sYear + "-" + sMonth + "-" + sDay + " " + sHour + ":" + sMinute + ":" + sSecond;
    }
    catch (e) { }
}

function selectGridInit(selectGrid) {
    with (selectGrid) {
        Rows = 1;
        Cols = 1;
        FixedRows = 0;
        FixedCols = 0;
        Editable = flexEDKbdMouse;
        ExtendLastCol = true;
        //RowHeight(0) = "230";
        SetRowBackColor(selectGrid, 0, color_linen);
    }
}

function InStringArray(value, stringArray) {
    if (stringArray == null) return true;
    for (var index = 0, length = stringArray.length; index < length; index++) {
        if (value == null && stringArray[index] == null) return true;
        if (!((value == null && stringArray[index] != null)
            || (value != null && stringArray[index] == null))) {
            if (value.toLowerCase() == stringArray[index].toLowerCase()) {
                return true;
            }
        }
    }
    return false;
}

////#region Convert value From XML Result
function XmlConvert()
{ }

XmlConvert.HasValue = function (sValue) {
    return typeof (sValue) != 'undefined' && sValue != null;
}

XmlConvert.ToBoolean = function (sValue) {
    return (sValue.toLowerCase() == "true") ? true : false;
}

XmlConvert.ToByte = function (sValue) {
    return sValue;
}

XmlConvert.ToChar = function (sValue) {
    return sValue;
}

XmlConvert.ToDateTime = function (sValue) {
    var dateTime;
    try {
        var arrDateTime = sValue.split(" ");
        if (arrDateTime[0].length > 10) {
            var arrDateTime = sValue.split("T");
        }
        sDate = arrDateTime[0];
        sTime = arrDateTime[1];
        arrDate = sDate.split("-");
        arrTime = sTime.split(":");

        sYear = arrDate[0];
        sMonth = arrDate[1];
        sDay = arrDate[2]
        if (sMonth.length == 1)
            sMonth = "0" + sMonth;
        if (sDay.length == 1)
            sDay = "0" + sDay;

        sHour = arrTime[0];
        sMinute = arrTime[1];
        sSecond = arrTime[2];
        if (sHour.length == 1)
            sHour = "0" + sHour;
        if (sMinute.length == 1)
            sMinute = "0" + sMinute;
        if (sSecond.length == 1)
            sSecond = "0" + sSecond;

        sValue = sYear + "-" + sMonth + "-" + sDay + " " + sHour + ":" + sMinute + ":" + sSecond;
        dateTime = new Date(sValue.substring(0, 4) + "/" + (sValue.substring(5, 7)) + "/" + sValue.substring(8, 10) + " " + sValue.substring(11, 13) + ":" + sValue.substring(14, 16) + ":" + sValue.substring(17, 19));
        if (isNaN(dateTime)) {
            dateTime = null;
        }
        else {
            if (sValue.length > 20) {
                dateTime.setMilliseconds(parseFloat(sValue.substring(20, 23)));     //fix parseInt("030"),use parseFloat
            }
        }
    }
    catch (e) {
        dateTime = null;
    }

    if (typeof (dateTime) == 'undefined' || isNaN(dateTime)) {
        dateTime = null;
    }
    return dateTime;
}

XmlConvert.ToDateTimeOffset = function (sValue) {
    return XmlConvert.ToDateTime(sValue);
}

XmlConvert.ToDecimal = function (sValue) {
    var value = parseFloat(sValue);
    return isNaN(value) ? null : value;
}

XmlConvert.ToDouble = function (sValue) {
    var value = parseFloat(sValue);
    return isNaN(value) ? null : value;
}

XmlConvert.ToGuid = function (sValue) {
    return sValue;
}

XmlConvert.ToInt16 = function (sValue) {
    var value = parseInt(sValue);
    return isNaN(value) ? null : value;
}

XmlConvert.ToInt32 = function (sValue) {
    var value = parseInt(sValue);
    return isNaN(value) ? null : value;
}

XmlConvert.ToInt64 = function (sValue) {
    var value = parseInt(sValue);
    return isNaN(value) ? null : value;
}

XmlConvert.ToSByte = function (sValue) {
    return sValue;
}

XmlConvert.ToSingle = function (sValue) {
    var value = parseFloat(sValue);
    return isNaN(value) ? null : value;
}

XmlConvert.ToString = function (sValue) {
    return sValue;
}

XmlConvert.ToTimeSpan = function (sValue) {
    return sValue;
}

XmlConvert.ToUInt16 = function (sValue) {
    var value = parseInt(sValue);
    return isNaN(value) ? null : value;
}

XmlConvert.ToUInt32 = function (sValue) {
    var value = parseInt(sValue);
    return isNaN(value) ? null : value;
}

XmlConvert.ToUInt64 = function (sValue) {
    var value = parseInt(sValue);
    return isNaN(value) ? null : value;
}
////#endregion Convert value From XML Result