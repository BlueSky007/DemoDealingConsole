////Will Delete

//// priceStyle1 : 17590 17592
//// priceStyle2 : 127.08 127.09
//// priceStyle3 : 127.8/16  127.9/16
//// priceStyle4 : 12700 12705 12710
//function Price(normalizedPrice,normalizedValue,numeratorUnit,denominator)
//{
//	//property
//	this.normalizedPrice = normalizedPrice;
//	this.normalizedValue = normalizedValue;
//	this.numeratorUnit = numeratorUnit;
//	this.denominator = denominator;

////	var _regexExpression = "\\b(?<WholePart>\\d+)(\\.(?<Numerator>\\d+)(/(?<Denominator>\\d+)|)|)\\b";
//	var _regexExpression = "(\\d+)(?:\\.(\\d+)(?:/(\\d+)|)|)";
//	this.regex = new RegExp(_regexExpression,"i");
//	
//	//method
//	this.Clone = function () {
//	    return new Price(this.normalizedPrice, this.normalizedValue, this.numeratorUnit, this.denominator);
//	};

//	this.ToString = function () {
//	    return this.normalizedPrice;
//	};

//	this.ToDouble = function () {
//	    return this.normalizedValue;
//	};

//	this.Add = function (points) {
//	    var temp = this.Clone();
//	    temp.normalizedValue = temp.normalizedValue + points / temp.denominator;
//	    temp.Normalize(temp.normalizedValue.toString(), temp.numeratorUnit, temp.denominator);
//	    return temp;
//	};

//	this.SubStract = function (price1) {
//	    /*if(!price1 || price1.numeratorUnit!=this.numeratorUnit || price1.denominator!=this.denominator)
//	    {
//	    //throw new ArgumentException("Prices is not the same type");
//	    return parseInt( Math.round(this.normalizedValue) );
//	    }*/

//	    return parseInt(Math.round((this.normalizedValue - price1.normalizedValue) * this.denominator));
//	};

//	this.Avg = function (prices) {
//	    if (prices.length <= 0)
//	        return null;

//	    var temp = this.Clone();
//	    var varPrices = prices; //(new VBArray(prices)).toArray();   // Get the items.

//	    temp.normalizedValue = 0;
//	    for (var index = 0, count = varPrices.length; index < count; index++) {
//	        temp.normalizedValue += varPrices[index].normalizedValue;
//	    }
//	    temp.normalizedValue /= prices.length;
//	    temp.Normalize(temp.normalizedValue.toString(), temp.numeratorUnit, temp.denominator);
//	    return temp;
//	};

//	this.More = function (price1) {
//	    if (!price1)
//	        return true;
//	    else
//	        return this.normalizedValue > price1.normalizedValue;
//	};

//	this.Less = function (price1) {
//	    if (!price1)
//	        return true;
//	    else
//	        return this.normalizedValue < price1.normalizedValue;
//	};

//	this.Equal = function (price1) {
//	    if (!price1)
//	        return true;
//	    else
//	        return this.normalizedValue == price1.normalizedValue;
//	};

//	this.MoreEqual = function (price1) {
//	    if (!price1)
//	        return true;
//	    else
//	        return this.normalizedValue >= price1.normalizedValue;
//	};

//	this.LessEqual = function (price1) {
//	    if (!price1)
//	        return true;
//	    else
//	        return this.normalizedValue <= price1.normalizedValue;
//	};
//	
//	//Added by Michael on 2005-03-23
//	this.FormatFloat = function (s, decimalDigits) {
//	    var retStr = null;
//	    var regexExpression = "(\\d+\\.{0,1}\\d{0,})";
//	    var regex = new RegExp(regexExpression, "i");
//	    if (regex.exec(s) != null) {
//	        retStr = RegExp.$1;
//	        var pointPos = retStr.indexOf(".");
//	        var decimalFraction = "";
//	        if (pointPos > -1) {
//	            //patch decimalFraction with "0"
//	            var decimalFractionStr = (Math.pow(10, decimalDigits + 1)).toString();
//	            retStr = retStr + decimalFractionStr.substr(1);

//	            decimalFraction = "1" + retStr.substr(pointPos + 1, decimalDigits) + "." + retStr.substr(pointPos + 1 + decimalDigits, 1);
//	            decimalFractionStr = (Math.round(decimalFraction)).toString();
//	            retStr = retStr.substr(0, pointPos + 1) + decimalFractionStr.substr(1);
//	        }
//	        else {
//	            var decimalFractionStr = (Math.pow(10, decimalDigits)).toString();
//	            retStr = retStr + "." + decimalFractionStr.substr(1);
//	        }
//	    }
//	    return retStr;
//	};
//	
//	//Added by Michael on 2005-03-23
//	this.CastPriceToNum = function (strPrice, numeratorUnit, denominator) {
//	    //...Rewrite
//	    //var setPrice = parseFloat(strPrice);				
//	    //setPrice = (isNaN(setPrice))?0:setPrice;
//	    //return (setPrice);

//	    var fPoint = 0;
//	    var PriceLeftPart = "";
//	    var PriceNumeratorPart = 0;
//	    var PriceIntPart = 0;
//	    var Denominator = 0;
//	    var a = 0;
//	    var numberAfterCast = 0;

//	    if (strPrice == null || strPrice == "") {
//	        numberAfterCast = 0;
//	        return (numberAfterCast);
//	    }
//	    fPoint = strPrice.indexOf(".");
//	    if (fPoint > 0) {
//	        a = strPrice.indexOf("/");
//	        if (a > 0) {
//	            Denominator = parseFloat(strPrice.substr(a + 1, strPrice.length - a));
//	            PriceLeftPart = strPrice.substr(0, a);
//	            PriceNumeratorPart = parseFloat("0" + PriceLeftPart.substring(PriceLeftPart.indexOf(".") + 1, PriceLeftPart.length));
//	            PriceIntPart = parseFloat("0" + strPrice.substr(0, fPoint));
//	            numberAfterCast = PriceIntPart + PriceNumeratorPart / Denominator;
//	        }
//	        else
//	            numberAfterCast = parseFloat(strPrice);
//	    }
//	    else
//	        numberAfterCast = parseFloat(strPrice);

//	    numberAfterCast = (isNaN(numberAfterCast)) ? 0 : numberAfterCast;
//	    return (numberAfterCast);
//	};	
//	
//	//Modified by Michael on 2005-03-23
//	this.Normalize = function (price, numeratorUnit, denominator) {
//	    if (price == null)// || price.Trim()=="0") 
//	        return null;

//	    var searchResult = this.regex.exec(price);
//	    if (searchResult == null)
//	        return null;

//	    var wholePart = parseInt(RegExp.$1);

//	    this.numeratorUnit = numeratorUnit;
//	    this.denominator = denominator;
//	    if (numeratorUnit >= denominator)  // priceStyle1,priceStyle4
//	    {
//	        //normalize wholePart to multiple of _numeratorUnit
//	        wholePart = Math.round(price);
//	        this.normalizedValue = (wholePart / numeratorUnit) * numeratorUnit;
//	        this.normalizedPrice = this.normalizedValue.toString();
//	    }
//	    else {
//	        //process decimal part
//	        var numeratorString = RegExp.$2;
//	        var denominatorString = RegExp.$3;
//	        var numerator = ((numeratorString == "") ? 0 : parseInt(numeratorString));
//	        var decimalPart;

//	        if (denominatorString != "") {
//	            //"127.015/16" is invalid but 127.000/16 is valid 
//	            if (numerator != 0 && numeratorString.substring(0, 1) == "0")
//	                return null;
//	            decimalPart = numerator / parseFloat(denominatorString);
//	        }
//	        else {
//	            decimalPart = parseFloat("0." + numeratorString);
//	        }

//	        //handle convertion and calculation error
//	        //numerator= parseInt(decimalPart*denominator+0.15);
//	        //numerator = parseInt(decimalPart * denominator + numeratorUnit * 0.5);

//	        numerator = Math.round(decimalPart * denominator * Math.pow(10, numeratorUnit.toString().length - 1));        // 1, 1000,  0.1125,    0.1149, 10, 1000
//	        numerator = Math.round(numerator / Math.pow(10, numeratorUnit.toString().length - 1));
//	        var roundValue = Math.round(numerator / numeratorUnit) * numeratorUnit;
//	        var intValue = parseInt(numerator / numeratorUnit) * numeratorUnit;
//	        var decimalValue = parseFloat(decimalPart) * denominator;
//	        numerator = (roundValue - decimalValue > decimalValue - intValue ? intValue : roundValue);

//	        if (numerator < denominator) {
//	            //normalize numerator to multiple of _numeratorUnit
//	            numerator = parseInt(numerator / numeratorUnit) * numeratorUnit;
//	            //this.normalizedValue = wholePart + parseFloat(numerator) / denominator;
//	            this.normalizedValue = (wholePart * denominator + parseFloat(numerator)) / denominator;

//	            //Denominator is 10,100....
//	            var power10 = Math.log(denominator) / Math.log(10);
//	            if (Math.pow(10, Math.round(power10)) == denominator) {
//	                this.normalizedPrice = FormatFloat(this.normalizedValue.toString(), Math.round(power10));
//	            }
//	            else {
//	                if (numerator == 0) {
//	                    this.normalizedPrice = wholePart.toString();
//	                }
//	                else {
//	                    this.normalizedPrice = wholePart.toString() + "." + numerator.toString() + "/" + denominator.toString();
//	                }
//	            }
//	        }
//	        else {
//	            wholePart = wholePart + 1;
//	            var power10 = Math.log(denominator) / Math.log(10);
//	            if (Math.pow(10, Math.round(power10)) == denominator) {
//	                this.normalizedPrice = wholePart.toString() + "." + denominator.toString().substr(1, Math.round(power10));
//	            }
//	            else {
//	                this.normalizedPrice = wholePart.toString();
//	            }
//	        }
//	    }
//	    return (this.normalizedPrice == "0" ? null : this.normalizedPrice);
//	};
//	
//	/*
//	//Old
//	this.Normalize = function (price,numeratorUnit,denominator)
//	{
//		if(price==null)// || price.Trim()=="0") 
//			return;

//		var searchResult = this.regex.exec(price);
//		if(searchResult == null)
//			return;

//		var wholePart = parseInt( RegExp.$1 );

//		this.numeratorUnit = numeratorUnit;
//		this.denominator = denominator;
//		if(numeratorUnit >= denominator)  // priceStyle1,priceStyle4
//		{
//			//normalize wholePart to multiple of _numeratorUnit
//			this.normalizedValue = (wholePart/numeratorUnit)*numeratorUnit;
//			this.normalizedPrice = this.normalizedValue.toString();
//		}
//		else
//		{
//			//process decimal part
//			var numeratorString = RegExp.$2;
//			var denominatorString = RegExp.$3;
//			var numerator=((numeratorString=="") ? 0 : parseInt(numeratorString));
//			var decimalPart;

//			if(denominatorString!="")
//			{
//				//"127.015/16" is invalid but 127.000/16 is valid 
//				if(numerator!=0 && numeratorString.substring(0,1)=="0") 
//					return;
//				decimalPart=numerator/parseFloat(denominatorString);
//			}
//			else
//			{
//				decimalPart=parseFloat("0."+numeratorString);
//			}
//			
//			//handle convertion and calculation error
//			//numerator= parseInt(decimalPart*denominator+0.15);

//            numerator = Math.round(decimalPart * denominator * Math.pow(10, numeratorUnit.toString().length - 1));        // 1, 1000,  0.1125,    0.1149, 10, 1000
//            numerator = Math.round(numerator / Math.pow(10, numeratorUnit.toString().length - 1));
//            var roundValue = Math.round(numerator / numeratorUnit) * numeratorUnit;
//            var intValue = parseInt(numerator / numeratorUnit) * numeratorUnit;
//            var decimalValue = parseFloat(decimalPart) * denominator;
//            numerator = (roundValue - decimalValue > decimalValue - intValue ? intValue : roundValue);

//			if(numerator<denominator)
//			{
//				//normalize numerator to multiple of _numeratorUnit
//				numerator=(numerator/numeratorUnit)*numeratorUnit;
//				this.normalizedValue=wholePart+parseFloat(numerator)/denominator;

//				//Denominator is 10,100....
//				var power10=Math.log(denominator)/Math.log(10);
//				if(Math.pow(10,Math.round(power10)) == denominator)
//				{
//					this.normalizedPrice = FormatFloat(this.normalizedValue.toString(), Math.round(power10));
//				}
//				else
//				{
//					if(numerator==0)
//					{
//						this.normalizedPrice = wholePart.toString();
//					}
//					else
//					{
//						this.normalizedPrice = wholePart.toString()+"."+numerator.toString()+"/"+denominator.toString();
//					}
//				}
//			}
//		}
//		return (this.normalizedPrice=="0" ? null : this.normalizedPrice);
//	};
//	*/

//}
