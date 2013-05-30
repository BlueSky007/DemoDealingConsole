var propertyPageLoaded = false;
function PropertyPageOnLoad() {
    propertyPageLoaded = true;

    //PropertyInit();
    //HistoryInit();

    PropertyPageOnSize();
}

function PropertyPageOnSize() {
    oMpc.style.posLeft = 0;
    oMpc.style.posHeight = oBody.offsetHeight - 26;
    oMpc.style.posWidth = oBody.offsetWidth;
}

function InstantOrderMPCPage_Onclick() {
    if (window._InstantOrderByInstrumentIFrame == null
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame1 == null
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame2 == null
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame3 == null
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame4 == null
        || !PageLoaded(window._InstantOrderByInstrumentIFrame._InstantOrderListFrame1.instantOrderListPageLoaded)
        || !PageLoaded(window._InstantOrderByInstrumentIFrame._InstantOrderListFrame2.instantOrderListPageLoaded)
        || !PageLoaded(window._InstantOrderByInstrumentIFrame._InstantOrderListFrame3.instantOrderListPageLoaded)
        || !PageLoaded(window._InstantOrderByInstrumentIFrame._InstantOrderListFrame4.instantOrderListPageLoaded)
//        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame1._InstrumentSelectGrid == null
//        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame1._InstrumentSelectGrid.readyState != 4
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame1._InstantOrderListGrid == null
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame1._InstantOrderListGrid.readyState != 4
//        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame2._InstrumentSelectGrid == null
//        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame2._InstrumentSelectGrid.readyState != 4
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame2._InstantOrderListGrid == null
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame2._InstantOrderListGrid.readyState != 4
//        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame3._InstrumentSelectGrid == null
//        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame3._InstrumentSelectGrid.readyState != 4
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame3._InstantOrderListGrid == null
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame3._InstantOrderListGrid.readyState != 4
//        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame4._InstrumentSelectGrid == null
//        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame4._InstrumentSelectGrid.readyState != 4
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame4._InstantOrderListGrid == null
        || window._InstantOrderByInstrumentIFrame._InstantOrderListFrame4._InstantOrderListGrid.readyState != 4
        ) {
        alert("UI is loading, please try again for a moment!");
        return;
    }
    window._InstantOrderByInstrumentIFrame._InstantOrderListFrame1.InstantOrderListInit();
    window._InstantOrderByInstrumentIFrame._InstantOrderListFrame2.InstantOrderListInit();
    window._InstantOrderByInstrumentIFrame._InstantOrderListFrame3.InstantOrderListInit();
    window._InstantOrderByInstrumentIFrame._InstantOrderListFrame4.InstantOrderListInit();
}

function PageLoaded(pageFlag) {
    return typeof (pageFlag) != 'undefined' && pageFlag == true;
}