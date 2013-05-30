
//Added Michael on 2005-06-30
function flexOrderSearchInit(QueryType)
{
	if (QueryType=="0")
	{
		flexOrderSearchInitForExecutedOrder();
	}
	else
	{
		flexOrderSearchInitForCancelledOrder();
	}
}

function flexOrderSearchInitForExecutedOrder()
{
	with (vsflexOrderSearch)
	{
		title = "SearchGrid";
		
		Cols = 12;
		Rows = 1;
		FixedRows = 1;
	    FixedCols = 1;

	    //var quotationFrm = window.opener.parent.quotationFrm;
	    var quotationFrm = window.dialogArguments.parent.quotationFrm;
		var searchGridColKey = quotationFrm.searchGridColKey;
		var searchGridLanguage = quotationFrm.searchGridLanguage;
	    
	    ColKey(0) = searchGridColKey.Sequence;
		TextMatrix(0,0) = "NO";
		ColWidth(ColIndex(searchGridColKey.Sequence)) = 500; 
		
		var parameter = quotationFrm.oDealingConsole.InitGrid(window.vsflexOrderSearch,quotationFrm.optionGrid.SearchGrid,searchGridLanguage);
		if (parameter == "") GridColumnsDefaultFormatForOrderSearch(window.vsflexOrderSearch,searchGridColKey);
		
		var columnIndex = ColIndex(searchGridColKey.Item);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.IsBuy);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.OpenClose);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.Account);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.Type);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.Relation);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.Dealer);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.ExecuteTime);
		ColDataType(columnIndex) = flexDTDate;
		ColFormat(columnIndex) = "yyyy-MM-dd HH:mm:ss";
	      
		ExtendLastCol = true;
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
	    
		SelectionMode = flexSelectionFree;
		ExplorerBar = flexExSortAndMove;
		
	}
}

//Added Michael on 2005-06-30
function GridColumnsDefaultFormatForOrderSearch(grid,gridColKey)
{
	with (grid)
	{
		ColWidth(ColIndex(gridColKey.Item)) = 795;
		ColWidth(ColIndex(gridColKey.IsBuy)) = 500;
		ColWidth(ColIndex(gridColKey.OpenClose)) = 500;
		ColWidth(ColIndex(gridColKey.Lot)) = 600; 
		ColWidth(ColIndex(gridColKey.OrderCode)) = 1005;
		ColWidth(ColIndex(gridColKey.Account)) = 795;
		ColWidth(ColIndex(gridColKey.Price)) = 800;
		ColWidth(ColIndex(gridColKey.Type)) = 600; 
		ColWidth(ColIndex(gridColKey.ExecuteTime)) = 2500;
		ColWidth(ColIndex(gridColKey.Relation)) = 2500;
		ColWidth(ColIndex(gridColKey.Dealer)) = 800;
	}
}	



//Added Michael on 2005-06-30
function flexOrderSearchInitForCancelledOrder()
{
	with (vsflexOrderSearch)
	{
		title = "SearchGridForCancelledOrder";
		
		Cols = 11;
		Rows = 1;
		FixedRows = 1;
	    FixedCols = 1;

	    //var quotationFrm = window.opener.parent.quotationFrm;
	    var quotationFrm = window.dialogArguments.parent.quotationFrm;
		var searchGridColKey = quotationFrm.searchGridColKeyForCancelledOrder;
		var searchGridLanguage = quotationFrm.searchGridLanguageForCancelledOrder;
	    
	    ColKey(0) = searchGridColKey.Sequence;
		TextMatrix(0,0) = "NO";
		ColWidth(ColIndex(searchGridColKey.Sequence)) = 500; 
		
		var parameter = quotationFrm.oDealingConsole.InitGrid(window.vsflexOrderSearch,quotationFrm.optionGrid.SearchGridForCancelledOrder,searchGridLanguage);
		if (parameter == "") GridColumnsDefaultFormatForCancelledOrderSearch(window.vsflexOrderSearch,searchGridColKey);
		
		var columnIndex = ColIndex(searchGridColKey.Item);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.IsBuy);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.OpenClose);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.Account);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.Type);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.Relation);
		MergeCol(columnIndex) = true;
		columnIndex = ColIndex(searchGridColKey.Reason);
		MergeCol(columnIndex) = true;
		  
		ExtendLastCol = true;
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
	    
		SelectionMode = flexSelectionFree;
		ExplorerBar = flexExSortAndMove;
		
	}
}

//Added Michael on 2005-06-30
function GridColumnsDefaultFormatForCancelledOrderSearch(grid,gridColKey)
{
	with (grid)
	{
		ColWidth(ColIndex(gridColKey.Item)) = 795;
		ColWidth(ColIndex(gridColKey.IsBuy)) = 500;
		ColWidth(ColIndex(gridColKey.OpenClose)) = 500;
		ColWidth(ColIndex(gridColKey.Lot)) = 600; 
		ColWidth(ColIndex(gridColKey.OrderCode)) = 1005;
		ColWidth(ColIndex(gridColKey.Account)) = 795;
		ColWidth(ColIndex(gridColKey.Price)) = 800;
		ColWidth(ColIndex(gridColKey.Type)) = 600; 
		ColWidth(ColIndex(gridColKey.Relation)) = 2500;
		ColWidth(ColIndex(gridColKey.Reason)) = 2500;
	}
}	