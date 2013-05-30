function SystemExit(logoutServiceUrl,projectName) {
    try {
        if (logoutServiceUrl != null && logoutServiceUrl != "") {
            var xmlDoc2 = new ActiveXObject("Msxml2.DOMDocument");
            xmlDoc2.async = false;
            xmlDoc2.resolveExternals = false;
            xmlDoc2.load(logoutServiceUrl);
        }

        //alert(window.document.cookie);
        deleteCookie("ASP.NET_SessionId");
        deleteCookie(projectName);
    }
    catch (e) {
        alert("Unload Logout Error");
    }
}

function getCookie(sName) {
    // cookies are separated by semicolons
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
        // a name/value pair (a crumb) is separated by an equal sign
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }

    // a cookie with the requested name does not exist
    return null;
}

function setCookie(sName, vValue) {
    var argv = setCookie.arguments, argc = setCookie.arguments.length;
    var sExpDate = (argc > 2) ? "; expires=" + argv[2].toGMTString() : "";
    var sPath = (argc > 3) ? "; path=" + argv[3] : "";
    var sDomain = (argc > 4) ? "; domain=" + argv[4] : "";
    var sSecure = (argc > 5) && argv[5] ? "; secure" : "";
    document.cookie = sName + "=" + escape(vValue, 0) + sExpDate + sPath + sDomain + sSecure + ";";
}

function deleteCookie(sName) {
    document.cookie = sName + "=" + getCookie(sName) + "; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
}
