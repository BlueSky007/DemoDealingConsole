
function HistoryInit()
{
    with (vsFlexHistory) {
        Rows = 1;
        FixedRows = 1;
        FixedCols = 0;
        Cols = 5;

        var quotationFrm = window.parent.quotationFrm;
        var historyGridColKey = quotationFrm.historyGridColKey;
        var historyGridLanguage = quotationFrm.historyGridLanguage;

        var parameter = quotationFrm.oDealingConsole.InitGrid(window.vsFlexHistory, quotationFrm.optionGrid.HistoryGrid, historyGridLanguage);
        if (parameter == "") GridColumnsDefaultFormatForHistory(window.vsFlexHistory, historyGridColKey);

        var columnIndex = ColIndex(historyGridColKey.Time);
        ColFormat(columnIndex) = "HH:mm:ss";

        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExNone;
    }
    _HistoryGridColIndexs = new HistoryGridColIndexs();
}

//Added Michael on 2005-06-30
function GridColumnsDefaultFormatForHistory(grid,gridColKey)
{
	with (grid)
	{
		ColWidth(ColIndex(gridColKey.Bid)) = 980;
		ColWidth(ColIndex(gridColKey.Ask)) = 980;
		ColWidth(ColIndex(gridColKey.Time)) = 1200; 
		//ColWidth(ColIndex(gridColKey.Source)) = 980;
	}
}

function OnHistoryGridAfterMoveColumn(col, position) {
    _HistoryGridColIndexs = new HistoryGridColIndexs();
}

function HistoryGridFontChanged() {
    _HistoryGridColIndexs = new HistoryGridColIndexs();
}

var _HistoryGridColIndexs = null;
function HistoryGridColIndexs() {
    this.Bid = vsFlexHistory.ColIndex("Bid");
    this.Ask = vsFlexHistory.ColIndex("Ask");
    this.Time = vsFlexHistory.ColIndex("Time");
    this.Key = vsFlexHistory.ColIndex("Key");
    //this.Source = vsFlexHistory.ColIndex("Source");
}

function UpdateQuotationHistory(instrument)
{
	if(instrument == null) return;

	var quotationFrm = window.parent.quotationFrm;
	var oCurrentInstrumentID = quotationFrm.oCurrentInstrumentID;
	if(oCurrentInstrumentID == instrument.id)
	{
	    //var vsflexGrid = parent.propertyFrm.vsFlexHistory;
	    var vsflexGrid = vsFlexHistory;
		var historyGridColKey = quotationFrm.historyGridColKey;
	
		var oCurrentQuotePolicyDetailID = quotationFrm.oCurrentQuotePolicyDetailID;
		var historyQuotess = instrument.historyQuotess;
		if(historyQuotess.Exists( oCurrentQuotePolicyDetailID ))
		{
			var historyQuotes = historyQuotess.Item( oCurrentQuotePolicyDetailID );
			var count = historyQuotes.length;
			if(count > 0) {
			    var rowHeightValue = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.HistoryGrid);
				with (vsflexGrid)
				{
//					Redraw = false;
					var fRows = FixedRows;
                    
					//Get Last Quotation History from UI
					var keyValue = -1;
					if (Rows > fRows) {
					    keyValue = parseInt(TextMatrix(fRows, _HistoryGridColIndexs.Key));
					}
					var needRedraw = false;
                    var insertPosition = fRows;
					for (var i = count - 1; i >= 0; i--) {
					    var quote = historyQuotes[i];
					    if (quote[4] > keyValue) {
					        if (!needRedraw) Redraw = false;
                            needRedraw = true;
					        
					        AddItem("\t", insertPosition);

					        RowHeight(insertPosition) = rowHeightValue;

					        TextMatrix(insertPosition, _HistoryGridColIndexs.Time) = GetDateTimeString(quote[0], "DateTime"); //.getVarDate(); //.TimeString();
					        TextMatrix(insertPosition, _HistoryGridColIndexs.Bid) = quote[2]; //.bid.ToString();
					        TextMatrix(insertPosition, _HistoryGridColIndexs.Ask) = quote[3]; //.ask.ToString();
					        //TextMatrix(insertPosition, _HistoryGridColIndexs.Source) = quote[1];//.origin.ToString();
					        TextMatrix(insertPosition, _HistoryGridColIndexs.Key) = quote[4];
					        if (Rows > fRows + quotationFrm.oMaxHistoryCount) RemoveItem(Rows - 1);
					        insertPosition++;
					    }
					    else {
					        break;
                        }
					}

//					var quote = historyQuotes[count - 1];
//					if (quote) {
//					    AddItem("\t", fRows);

//					    RowHeight(fRows) = rowHeightValue;

//					    TextMatrix(fRows, _HistoryGridColIndexs.Time) = GetDateTimeString(quote[0], "DateTime"); //.getVarDate(); //.TimeString();
//					    TextMatrix(fRows, _HistoryGridColIndexs.Bid) = quote[2]; //.bid.ToString();
//					    TextMatrix(fRows, _HistoryGridColIndexs.Ask) = quote[3]; //.ask.ToString();
//					    //TextMatrix(fRows, _HistoryGridColIndexs.Source) = quote[1];//.origin.ToString();
//					    TextMatrix(fRows, _HistoryGridColIndexs.Key) = quote[4];
//					    if (Rows > fRows + quotationFrm.oMaxHistoryCount) RemoveItem(Rows - 1);
//					}
					if (needRedraw) Redraw = true;
				}
			}
		}
	}
}

function OnHistoryInstrumentChanged(instrument)
{
    if (!instrument) return;
    //var vsflexGrid = parent.propertyFrm.vsFlexHistory;
    var vsflexGrid = vsFlexHistory;
	if(!vsflexGrid) return;
	vsflexGrid.Rows = vsflexGrid.FixedRows;

	var quotationFrm = window.parent.quotationFrm;
	var oCurrentInstrumentID = quotationFrm.oCurrentInstrumentID;
	if(oCurrentInstrumentID == instrument.id)
	{
		var historyGridColKey = quotationFrm.historyGridColKey;
		
		var oCurrentQuotePolicyDetailID = quotationFrm.oCurrentQuotePolicyDetailID;
		var historyQuotess = instrument.historyQuotess;
		if(historyQuotess.Exists( oCurrentQuotePolicyDetailID ))
		{
			var historyQuotes = historyQuotess.Item( oCurrentQuotePolicyDetailID );
			var count = historyQuotes.length;
			if(count > 0) {
			    var rowHeightValue = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.HistoryGrid);
				with (vsflexGrid)
				{
					Redraw = false;
					var fRows = FixedRows;

					var begin = (count >= quotationFrm.oMaxHistoryCount) ? (count - quotationFrm.oMaxHistoryCount) : 0;
					var end = count;
					for(var index=begin; index<end; index++)
					{
						var quote = historyQuotes[index];
						if(quote)
						{
							AddItem("\t", fRows);

							RowHeight(fRows) = rowHeightValue;

							TextMatrix(fRows, _HistoryGridColIndexs.Time) = GetDateTimeString(quote[0], "DateTime"); //.getVarDate();//quote.TimeString();
							TextMatrix(fRows, _HistoryGridColIndexs.Bid) = quote[2];//.bid.ToString();
							TextMatrix(fRows, _HistoryGridColIndexs.Ask) = quote[3];//.ask.ToString();
							//TextMatrix(fRows, _HistoryGridColIndexs.Source) = quote[1];//.origin.ToString();
							TextMatrix(fRows, _HistoryGridColIndexs.Key) = quote[4]; 
							if (Rows > fRows + quotationFrm.oMaxHistoryCount)
								RemoveItem(Rows-1);
						}
					}
					Redraw = true;
				}	
			}
		}
	}
	//vsflexGrid.AutoSize(0, vsflexGrid.Cols-1);
}
