// priceStyle1 : 17590 17592
// priceStyle2 : 127.08 127.09
// priceStyle3 : 127.8/16  127.9/16
// priceStyle4 : 12700 12705 12710

//static
//var _regexExpression = "(\\d+)(\\.(\\d+)(/(\\d+)|)|)";
var priceRegexExpression = "(\\d+)(?:\\.(\\d+)(?:/(\\d+)|)|)";
var PriceRegex = new RegExp(priceRegexExpression, "i");
PriceRegex.compile(priceRegexExpression, "i");

function NormalizePrice() {
    this.PriceString = null; //string
    this.PriceValue = null;  //double

    this.Clear = function () {
        this.PriceString = null;
        this.PriceValue = null;
    };
}

function Price() {
    //property
    this.numeratorUnit = null;
    this.denominator = null;
    this.normalizedPrice = null;
    this.normalizedValue = null;

    //method
    this.Clear = function () {
        this.numeratorUnit = null;
        this.denominator = null;
        this.normalizedPrice = null;
        this.normalizedValue = null;
    };

    this.Parse = function (priceString, numeratorUnit, denominator) {
        this.numeratorUnit = numeratorUnit;
        this.denominator = denominator;

        var normalizePrice = this.Normalize(priceString, numeratorUnit, denominator);
        if (normalizePrice != null) {
            this.normalizedPrice = normalizePrice.PriceString;
            this.normalizedValue = normalizePrice.PriceValue;

            ObjectPool.ReleaseNormalizePrice(normalizePrice);
        }
    };

    this.CorrectPriceParse = function (priceString, numeratorUnit, denominator) {
        this.numeratorUnit = numeratorUnit;
        this.denominator = denominator;

        var normalizePrice = this.CorrectPriceNormalize(priceString, numeratorUnit, denominator);
        if (normalizePrice != null) {
            this.normalizedPrice = normalizePrice.PriceString;
            this.normalizedValue = normalizePrice.PriceValue;

            ObjectPool.ReleaseNormalizePrice(normalizePrice);
        }
    };

    this.Clone = function () {
        var price = ObjectPool.GetPrice();

        price.numeratorUnit = this.numeratorUnit;
        price.denominator = this.denominator;
        price.normalizedPrice = this.normalizedPrice;
        price.normalizedValue = this.normalizedValue;

        return price;
    };

    this.ToString = function () {
        return (this.normalizedPrice == null) ? "" : this.normalizedPrice;
    };

    this.ToDouble = function () {
        return this.normalizedValue;
    };

    this.IsSameType = function (price, price2) {
        var isSameType = true;

        if (price == null || price2 == null) return false;

        if (price.numeratorUnit != price2.numeratorUnit || price.denominator != price2.denominator) {
            alert("Prices are not belong to the same instrument");
            isSameType = false;
        }

        return isSameType;
    };

    this.Add = function (points) {
        var normalizedValue = this.normalizedValue + points / this.denominator;
        var price = ObjectPool.GetPriceHelper(normalizedValue.toString(), this.numeratorUnit, this.denominator);

        return price;
    };

    this.SubStract2 = function (points) {
        var normalizedValue = this.normalizedValue - points / this.denominator;
        var price = ObjectPool.GetPriceHelper(normalizedValue.toString(), this.numeratorUnit, this.denominator);

        return price;
    };

    this.SubStract = function (price) {
        if (this.IsSameType(this, price) == false) return null;

        return parseInt(Math.round((this.normalizedValue - price.normalizedValue) * this.denominator));
    };

    this.Avg = function (prices) {
        if (prices.length <= 0) return null;
        var total = 0.0000;
        var iCount = prices.length;

        var price = prices[0];
        for (var i = 0; i < iCount; i++) {
            price2 = prices[i];

            if (this.IsSameType(price, price2) == false) return null;

            total += price2.normalizedValue;
        }

        var mean = total / iCount;
        var meanPrice = ObjectPool.GetPriceHelper(mean.toString(), this.numeratorUnit, this.denominator);

        return meanPrice;
    };

    this.CompareTo = function (price) {
        var error = 0.0000001;
        if ((this.normalizedValue - price.normalizedValue) < -error) {
            return -1;
        }
        else if ((this.normalizedValue - price.normalizedValue) > error) {
            return 1;
        }
        else {
            return 0;
        }
    };

    this.More = function (price) {
        if (this.IsSameType(this, price) == false) return false;

        if (!price)
            return true;
        else
            return this.normalizedValue > price.normalizedValue;
    };

    this.Less = function (price) {
        if (this.IsSameType(this, price) == false) return false;

        if (!price)
            return true;
        else
            return this.normalizedValue < price.normalizedValue;
    };

    this.Equal = function (price) {
        if (this.IsSameType(this, price) == false) return false;

        if (!price)
            return true;
        else
            return this.normalizedValue == price.normalizedValue;
    };

    this.MoreEqual = function (price) {
        if (this.IsSameType(this, price) == false) return false;

        if (!price)
            return true;
        else
            return this.normalizedValue >= price.normalizedValue;
    };

    this.LessEqual = function (price) {
        if (this.IsSameType(this, price) == false) return null;

        if (!price)
            return true;
        else
            return this.normalizedValue <= price.normalizedValue;
    };

    this.CorrectPriceNormalize = function (priceString, numeratorUnit, denominator) {
        var normalizedPrice = null;
        var normalizedValue = 0;
        if (priceString == null || priceString == ""/* || priceString == "0"*/) return null;

        var normalizePrice = ObjectPool.GetNormalizePrice();
        normalizePrice.PriceString = priceString;
        normalizePrice.PriceValue = parseFloat(priceString);
        return normalizePrice;
    };

    this.Normalize = function (priceString, numeratorUnit, denominator) {
        var normalizedPrice = null;
        var normalizedValue = 0;
        if (priceString == null || priceString == ""/* || priceString == "0"*/) return null;

        priceString = priceString.toString();
        var prefix = priceString.charAt(0);

        var searchResult = null;
        try {
            searchResult = PriceRegex.exec(priceString);
        }
        catch (e) {
            //alert("There is a not valid price: " + priceString);
        }

        if (searchResult == null) return null;

        var wholePart = parseInt(RegExp.$1);

        if (numeratorUnit >= denominator)  // priceStyle1,priceStyle4
        {
            wholePart = Math.round(parseInt(parseFloat(priceString) * 10, 10) / 10);
            normalizedValue = Math.round((wholePart / numeratorUnit) * numeratorUnit);
            normalizedPrice = normalizedValue.toString();
        }
        else {
            //process decimal part
            var numeratorString = RegExp.$2;
            var denominatorString = RegExp.$3;
            //NOTE: parseInt("08") = 0
            var numerator = ((numeratorString == "") ? 0 : parseFloat(numeratorString));
            var decimalPart;

            if (denominatorString != "") {
                var denominatorValue = parseInt(denominatorString);
                if (denominatorValue == 0) return null;

                //"127.015/16" is invalid but 127.000/16 is valid 
                if (numerator != 0 && numeratorString.substring(0, 1) == "0") return null;
                decimalPart = numerator / denominatorValue;
            }
            else {

                decimalPart = parseFloat("0." + numeratorString);
            }

            //handle convertion and calculation error
            //numerator = parseInt(decimalPart * denominator + 0.15);
            //numerator = parseInt(decimalPart * denominator + numeratorUnit * 0.5);

            numerator = Math.round(decimalPart * denominator * Math.pow(10, numeratorUnit.toString().length - 1));        // 1, 1000,  0.1125,    0.1149, 10, 1000
            numerator = Math.round(numerator / Math.pow(10, numeratorUnit.toString().length - 1));
            var roundValue = Math.round(numerator / numeratorUnit) * numeratorUnit;
            var intValue = parseInt(numerator / numeratorUnit) * numeratorUnit;
            var decimalValue = parseFloat(decimalPart) * denominator;
            numerator = (roundValue - decimalValue > decimalValue - intValue ? intValue : roundValue);

            if (numerator < denominator) {
                //normalize numerator to multiple of _numeratorUnit
                numerator = Math.round(numerator / numeratorUnit) * numeratorUnit;
                //normalizedValue = wholePart + parseFloat(numerator) / denominator;
                normalizedValue = (wholePart * denominator + parseFloat(numerator)) / denominator;

                //Denominator is 10,100....
                if (denominator == 10 || denominator == 100 || denominator == 1000 || denominator == 10000
								|| denominator == 100000 || denominator == 1000000 || denominator == 10000000 || denominator == 100000000)
                //var power10=Math.log(denominator)/Math.log(10);
                //if(Math.pow(10,Math.round(power10)) == denominator)
                {
                    var iCount = (denominator.toString()).length - 1;
                    normalizedPrice = Format2(normalizedValue, iCount);
                    normalizedValue = parseFloat(normalizedPrice);
                }
                else {
                    if (numerator == 0) {
                        normalizedPrice = wholePart.toString();
                        normalizedValue = parseFloat(normalizedPrice);
                    }
                    else {
                        normalizedPrice = wholePart.toString() + "." + numerator.toString() + "/" + denominator.toString();
                    }
                }
            }
            else {
                wholePart = wholePart + 1;
                var power10 = Math.log(denominator) / Math.log(10);
                if (Math.pow(10, Math.round(power10)) == denominator) {
                    normalizedPrice = wholePart.toString() + "." + denominator.toString().substr(1, Math.round(power10));
                }
                else {
                    normalizedPrice = wholePart.toString();
                }
                normalizedValue = parseFloat(normalizedPrice);
            }
        }

        //if (normalizedValue==0) return null;

        var normalizePrice = ObjectPool.GetNormalizePrice();
        if (prefix == '-') {
            normalizePrice.PriceString = "-" + normalizedPrice;
            normalizePrice.PriceValue = normalizedValue * -1;
        }
        else {
            normalizePrice.PriceString = normalizedPrice;
            normalizePrice.PriceValue = normalizedValue;
        }

        return normalizePrice;
    };

//    this.ToString2 = function(normalizedValue, numeratorUnit, denominator){
//        var priceString;
//        if (denominator == 1)
//        {
//            priceString = normalizedValue.toString();
//        }
//        else
//        {
//            var integralPart = parseInt(normalizedValue,10);
//            var numerator = Math.abs(parseInt(Math.round((normalizedValue - integralPart) * denominator),10));
//            var power10 = Math.log(denominator) / Math.log(10);
//            if (Math.pow(10, Math.round(power10)) == denominator) {
////            var decimalDigits = Math.log(denominator);
////            if (decimalDigits == (uint)decimalDigits) {
//                //10,100,1000
//                var numerator2 = numerator / denominator;
//                var num = new Number(normalizedValue);
//                num.toFixed(power10);

//                priceString = integralPart.toString() + numerator2.toString("F" + (uint)decimalDigits).substring(1);
//            }
//            else
//            {
//                if (numerator == 0)
//                {
//                    priceString = integralPart.toString();
//                }
//                else
//                {
//                    NumberFormatInfo numberFormatInfo = NumberFormatInfo.GetInstance(null);
//                    priceString = integralPart.ToString() + numberFormatInfo.NumberDecimalSeparator
//                        + numerator.ToString() + "/" + denominator.ToString();
//                }
//            }
//        }

//        if (normalizedValue < 0 && priceString[0] != '-') priceString = "-" + priceString;
//        return priceString;
//    };
}