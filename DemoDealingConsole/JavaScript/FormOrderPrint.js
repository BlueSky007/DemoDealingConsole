function OnOrderPrintLoad(orderCode) {

    with (vsflexOrderPrint) {
        Rows = 8;
        FixedRows = 0;
        FixedCols = 0;
        Cols = 2;

        ColKey(0) = "PropertyKey";
        ColWidth(0) = 2100;
        ColAlignment(0) = flexAlignRightCenter;

        ColKey(1) = "PropertyValue";
        ColWidth(1) = 2800;
        ColAlignment(1) = flexAlignLeftCenter;

        AllowUserFreezing = flexFreezeBoth;
        AllowUserResizing = flexResizeBoth;
        ExplorerBar = flexExNone;
        Editable = flexEDKbdMouse;
    }

    var oPrintingOrders = window.opener.oPrintingOrders;
    var order = oPrintingOrders.Item(orderCode);

    var quotationFrm = order.mainWindow.parent.quotationFrm;

    var orderPrintGridColKey = quotationFrm.orderPrintGridColKey;
    var orderPrintGridLanguage = quotationFrm.orderPrintGridLanguage;
    var parameter = quotationFrm.oDealingConsole.InitGridForSingleRecord(window.vsflexOrderPrint, quotationFrm.optionGrid.OrderPrintGrid, orderPrintGridLanguage);
    var instrument = order.GetInstrument();
    var account = order.GetAccount();

    var propertyKeyColumn = vsflexOrderPrint.ColIndex("PropertyKey");
    var propertyValueColumn = vsflexOrderPrint.ColIndex("PropertyValue");
    vsflexOrderPrint.Redraw = false;
    with (vsflexOrderPrint) {
        var rowHeightValue = quotationFrm.oDealingConsole.GetRowHeight(quotationFrm.optionGrid.OrderPrintGrid);
        for (var index = propertyKeyColumn, count = Rows; index < count; index++) {
            RowHeight(index) = rowHeightValue;

            var rowDataValue = RowData(index);
            switch (rowDataValue) {
                case orderPrintGridColKey.TranCode:
                    TextMatrix(index, propertyValueColumn) = order.tran.code;
                    break;
                case orderPrintGridColKey.Instrument:
                    TextMatrix(index, propertyValueColumn) = instrument.code;
                    break;
                case orderPrintGridColKey.Account:
                    TextMatrix(index, propertyValueColumn) = (account ? account.code : order.tran.accountID);
                    break;
                case orderPrintGridColKey.IsOpen:
                    TextMatrix(index, propertyValueColumn) = (order.isOpen ? "New" : "Close");
                    break;
                case orderPrintGridColKey.IsBuy:
                    TextMatrix(index, propertyValueColumn) = (order.isBuy ? "Buy" : "Sell");
                    break;
                case orderPrintGridColKey.Lot:
                    TextMatrix(index, propertyValueColumn) = order.GetFormatLot2(order.lot);
                    break;
                case orderPrintGridColKey.ExecutePrice:
                    TextMatrix(index, propertyValueColumn) = (order.executePrice).ToString();
                    break;
                case orderPrintGridColKey.ExecuteTime:
                    TextMatrix(index, propertyValueColumn) = Date2String(order.tran.executeTime);
                    break;
            }
            ForeColor = order.isBuy ? color_blue : color_red;
        }
    }
    vsflexOrderPrint.Redraw = true;

    //if (oPrintingOrders.Exists(order.id)) oPrintingOrders.Remove(order.id);

    Button1.focus();
}

function Print() {
    try {
        window.vsflexOrderPrint.PrintGrid("", false, 0, 0, 0);
        window.close();
    }
    catch (e) {
        alert("Printer's I/O was error! please check your printer.");
    }
}

function OnOrderPrintUnload(orderCode) {
    var oPrintingOrders = window.opener.oPrintingOrders;
    oPrintingOrders.Remove(orderCode);
}