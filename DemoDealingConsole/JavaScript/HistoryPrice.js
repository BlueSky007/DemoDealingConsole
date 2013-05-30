function flexHistoryPriceInit()
{
	var lColIndex = 0;
	with (vsflexHistoryPrice)
	{
		Cols = 11;
		Rows = 1;
		FixedRows = 1;
	      
		TextMatrix(0, lColIndex) = "NO";
		ColKey(lColIndex) = "Sequence";
		ColWidth(lColIndex) = 500;
		lColIndex ++;
	      
		TextMatrix(0, lColIndex) = "Item";
		ColKey(lColIndex) = "Item";
		ColWidth(lColIndex) = 795;
		MergeCol(lColIndex) = true;
		lColIndex ++;
	      
		TextMatrix(0, lColIndex) = "B/S";
		ColKey(lColIndex) = "IsBuy";
		ColWidth(lColIndex) = 500;
		MergeCol(lColIndex) = true;
		lColIndex ++;
	      
		TextMatrix(0, lColIndex) = "O/C";
		ColKey(lColIndex) = "OpenClose";
		ColWidth(lColIndex) = 500;
		MergeCol(lColIndex) = true;
		lColIndex ++;
	      
		TextMatrix(0, lColIndex) = "Lot";
		ColKey(lColIndex) = "Lot";
		ColWidth(lColIndex) = 600;
		lColIndex ++;
	      
		TextMatrix(0, lColIndex) = "OrderCode";
		ColKey(lColIndex) = "OrderCode";
		ColWidth(lColIndex) = 1005;
		lColIndex ++;
	      
		TextMatrix(0, lColIndex) = "A/C";
		ColKey(lColIndex) = "Account";
		ColWidth(lColIndex) = 795;
		MergeCol(lColIndex) = true;
		lColIndex ++;
	      
		TextMatrix(0, lColIndex) = "Price";
		ColKey(lColIndex) = "Price";
		ColWidth(lColIndex) = 800;
		lColIndex ++;
	      
		TextMatrix(0, lColIndex) = "Type";
		ColKey(lColIndex) = "Type";
		ColWidth(lColIndex) = 600;
		MergeCol(lColIndex) = true;
		lColIndex ++;

		TextMatrix(0, lColIndex) = "ExecuteTime";
		ColKey(lColIndex) = "ExecuteTime";
		ColWidth(lColIndex) = 2500;
		ColFormat(lColIndex) = "yyyy-MM-dd HH:mm:ss";
		ColDataType(lColIndex) = flexDTDate;
		lColIndex ++;
	      
		TextMatrix(0, lColIndex) = "Dealer";
		ColKey(lColIndex) = "Dealer";
		ColWidth(lColIndex) = 800;
		MergeCol(lColIndex) = true;
		lColIndex ++;
	   
		ExtendLastCol = true;
		AllowUserFreezing = flexFreezeBoth;
		AllowUserResizing = flexResizeBoth;
	    
		SelectionMode = flexSelectionFree;
		ExplorerBar = flexExSortAndMove;
		
		BackColorAlternate = color_aquamarine;    
	}
}
