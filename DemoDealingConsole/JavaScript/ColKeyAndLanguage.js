function ColumnParameter(colKey, colWidth, colHidden) {
    this.ColKey = colKey;
    this.ColWidth = colWidth;
    this.ColHidden = colHidden;
}

function OptionGrid() {
    this.QuotationGrid = "QuotationGrid";
    this.QuotationTaskGrid = "QuotationTaskGrid";
    this.QuotePolicyGrid = "QuotePolicyGrid";
    this.SourceLevelAdjustmentGrid = "SourceLevelAdjustmentGrid";
    this.OrderGrid = "OrderGrid";
    this.HistoryGrid = "HistoryGrid";
    this.PropertiesGrid = "PropertiesGrid";
    this.SearchGrid = "SearchGrid";
    this.SearchGridForCancelledOrder = "SearchGridForCancelledOrder";
    this.InterestGrid = "InterestGrid";
    this.GroupNetPositionGrid = "GroupNetPositionGrid";
    this.InterestSummaryGrid = "InterestSummaryGrid";
    this.ExecutedGrid = "ExecutedGrid";
    this.ExecuteOrderSummaryGrid = "ExecuteOrderSummaryGrid";
    this.InstantOrderListGrid = "InstantOrderListGrid";
    this.UnclosedOrderGrid = "UnclosedOrderGrid";
    this.DealingPolicyDetailGrid = "DealingPolicyDetailGrid";
    this.CustomerPolicyManagementGrid = "CustomerPolicyManagementGrid";
    this.BlotterSelectionGrid = "BlotterSelectionGrid";
    this.OrderPrintGrid = "OrderPrintGrid";
    this.Frameset = "Frameset";
}

function OptionGridLanguage() {
    this.QuotationGrid = "Quotation";
    this.QuotationTaskGrid = "Quotation Task";
    this.QuotePolicyGrid = "QuotePolicyGrid";
    this.SourceLevelAdjustmentGrid = "SourceLevelAdjustmentGrid";
    this.OrderGrid = "Order";
    this.HistoryGrid = "History";
    this.PropertiesGrid = "Properties";
    this.SearchGrid = "SearchGrid";
    this.SearchGridForCancelledOrder = "SearchGridForCancelledOrder";
    this.InterestGrid = "InterestGrid";
    this.GroupNetPositionGrid = "GroupNetPositionGrid";
    this.InterestSummaryGrid = "InterestSummaryGrid";
    this.ExecutedGrid = "ExecutedGrid";
    this.ExecuteOrderSummaryGrid = "ExecuteOrderSummaryGrid";
    this.InstantOrderListGrid = "InstantOrderListGrid";
    this.UnclosedOrderGrid = "UnclosedOrderGrid";
    this.DealingPolicyDetailGrid = "DealingPolicyDetailGrid";
    this.CustomerPolicyManagementGrid = "CustomerPolicyManagementGrid";
    this.BlotterSelectionGrid = "BlotterSelectionGrid";
    this.OrderPrintGrid = "OrderPrintGrid";
}

function InstrumentPropertyColKey() {
    this.MaxSpreadPoints = "MaxSpreadPoints";
    this.SpreadPoints = "SpreadPoints";
    this.SpreadPoints2 = "SpreadPoints2";
    this.SpreadPoints3 = "SpreadPoints3";
    this.SpreadPoints4 = "SpreadPoints4";
    this.MaxAutoAdjustPoints = "MaxAutoAdjustPoints";
    this.AutoAdjustPoints = "AutoAdjustPoints";
    this.AutoAdjustPoints2 = "AutoAdjustPoints2";
    this.AutoAdjustPoints3 = "AutoAdjustPoints3";
    this.AutoAdjustPoints4 = "AutoAdjustPoints4";
    this.IsOriginHiLo = "IsOriginHiLo";
    this.PriceType = "PriceType";
    this.OriginType = "OriginType";
    this.AllowedSpotTradeOrderSides = "AllowedSpotTradeOrderSides";
    this.OriginInactiveTime = "OriginInactiveTime";
    this.AlertVariation = "AlertVariation";
    this.NormalWaitTime = "NormalWaitTime";
    this.AlertWaitTime = "AlertWaitTime";
    this.MaxDQLot = "MaxDQLot";
    this.MaxOtherLot = "MaxOtherLot";
    this.DQQuoteMinLot = "DQQuoteMinLot";
    this.AutoDQMaxLot = "AutoDQMaxLot";
    this.AutoLmtMktMaxLot = "AutoLmtMktMaxLot";
    this.AcceptDQVariation = "AcceptDQVariation";
    this.AcceptLmtVariation = "AcceptLmtVariation";
    this.AcceptCloseLmtVariation = "AcceptCloseLmtVariation";
    this.CancelLmtVariation = "CancelLmtVariation";
    this.MaxMinAdjust = "MaxMinAdjust";
    this.IsBetterPrice = "IsBetterPrice";
    this.AutoAcceptMaxLot = "AutoAcceptMaxLot";
    this.AutoCancelMaxLot = "AutoCancelMaxLot";
    this.AllowedNewTradeSides = "AllowedNewTradeSides";
    this.HitTimes = "HitTimes";
    this.PenetrationPoint = "PenetrationPoint";
    this.PriceValidTime = "PriceValidTime";
    this.LastAcceptTimeSpan = "LastAcceptTimeSpan";
    //
    this.IsAutoEnablePrice = "IsAutoEnablePrice";
    this.IsAutoFill = "IsAutoFill";
    this.IsPriceEnabled = "IsPriceEnabled";
    this.AutoDQDelay = "AutoDQDelay";
    this.HitPriceVariationForSTP = "HitPriceVariationForSTP";
}

function InstrumentPropertyLanguage() {
    this.MaxSpreadPoints = "Max Spread";
    this.SpreadPoints = "Spread";
    this.SpreadPoints2 = "Spread1";
    this.SpreadPoints3 = "Spread2";
    this.SpreadPoints4 = "Spread3";
    this.MaxAutoAdjustPoints = "Max Auto pts"
    this.AutoAdjustPoints = "Auto pts";
    this.AutoAdjustPoints2 = "Auto pts1";
    this.AutoAdjustPoints3 = "Auto pts2";
    this.AutoAdjustPoints4 = "Auto pts3";
    this.IsOriginHiLo = "Origin Hi Lo";
    this.PriceType = "Price type";
    this.OriginType = "Origin type";
    this.AllowedSpotTradeOrderSides = "AllowedSpotTradeOrderSides";
    this.OriginInactiveTime = "Inactive time";
    this.AlertVariation = "Alert pts";
    this.NormalWaitTime = "Normal wait time";
    this.AlertWaitTime = "Alert wait time";
    this.MaxDQLot = "Max DQ lot";
    this.MaxOtherLot = "Max Other lot";
    this.DQQuoteMinLot = "DQ Quote Min Lot";
    this.AutoDQMaxLot = "Auto DQ max lot";
    this.AutoLmtMktMaxLot = "Auto Lmt/Mkt max lot";
    this.AcceptDQVariation = "Accept DQ variation";
    this.AcceptLmtVariation = "Add Net Position Accept Lmt Variation";
    this.AcceptCloseLmtVariation = "Reduce Net Position Accept Lmt Variation";
    this.CancelLmtVariation = "Cancel Lmt variation";
    this.MaxMinAdjust = "Max/min adjust";
    this.IsBetterPrice = "Is better price";
    this.AutoAcceptMaxLot = "Auto Accept Lmt Max Lot";
    this.AutoCancelMaxLot = "Auto Cancel Lmt Max Lot";
    this.AllowedNewTradeSides = "New Trade side allowed";
    this.HitTimes = "Hit times";
    this.PenetrationPoint = "Penetration point";
    this.PriceValidTime = "Price valid time";
    this.LastAcceptTimeSpan = "Last accept time span";
    //
    this.IsAutoEnablePrice = "IsAutoEnablePrice";
    this.IsAutoFill = "IsAutoFill";
    this.IsPriceEnabled = "IsPriceEnabled";
    this.AutoDQDelay = "Auto DQ Delay";
    this.HitPriceVariationForSTP = "HitPrice Variation ForSTP";
}

function InstrumentColKey() {
    this.Sequence = "Sequence";
    this.ID = "ID";
    this.Item = "Item";
    this.Time = "Time";
    this.SourceBid = "SourceBid";
    this.SourceAsk = "SourceAsk";
    this.Source = "Source";
    this.Adjust = "Adjust";
    this.Bid = "Bid";
    this.Ask = "Ask";
    this.HistoryBid = "HistoryBid";
    this.HistoryAsk = "HistoryAsk";
    this.High = "High";
    this.Low = "Low";
    this.Count = "Count";
    this.OpenTime = "OpenTime";
    this.CloseTime = "CloseTime";
    this.NumeratorUnit = "NumeratorUnit";
    this.Denominator = "Denominator";
    this.BuyLot = "BuyLot";
    this.SellLot = "SellLot";
    this.LastLot = "LastLot";
    this.LastSales = "LastSales";
    this.ResumeOrSuspend = "ResumeOrSuspend";
    this.AllowOrRejectLMT = "AllowOrRejectLMT";

    var base = new InstrumentPropertyColKey();
    for (var prop in base) {
        this[prop] = base[prop];
    }
}

function InstrumentLanguage() {
    this.ID = "";
    this.Item = "Item";
    this.Time = "Time";
    this.SourceBid = "Bid Source";
    this.SourceAsk = "Ask Source";
    this.Source = "Source";
    this.Adjust = "Adjust";
    this.Bid = "Bid";
    this.Ask = "Ask";
    this.HistoryBid = "History Bid";
    this.HistoryAsk = "History Ask";
    this.High = "High";
    this.Low = "Low";
    this.Count = "Count";
    this.OpenTime = "Open Time";
    this.CloseTime = "Close Time";
    this.NumeratorUnit = "";
    this.Denominator = "";
    this.BuyLot = "Total Buy";
    this.SellLot = "Total Sell";
    this.LastLot = "Last Lot";
    this.LastSales = "Last Sales";
    this.ResumeOrSuspend = "Suspend/Resume";
    this.AllowOrRejectLMT = "Limit";

    var base = new InstrumentPropertyLanguage();
    for (var prop in base) {
        this[prop] = base[prop];
    }
}

function SourceLevelAdjustmentGridColKey()
{
    this.OriginCode = "OriginCode";
    this.IncreaseAutoAdjustPoints = "IncreaseAutoAdjustPoints";
    this.DecreaseAutoAdjustPoints = "DecreaseAutoAdjustPoints";
    this.ReferenceAutoAdjustPoints = "ReferenceAutoAdjustPoints";
    this.InstrumentCodes = "InstrumentCodes";
}

function SourceLevelAdjustmentGridLanguage() {
    this.OriginCode = "Auto Pts";
    this.IncreaseAutoAdjustPoints = "Up";
    this.DecreaseAutoAdjustPoints = "Dn";
    this.ReferenceAutoAdjustPoints = "Ref Auto Pts";
    this.InstrumentCodes = "";
}

function QuotePolicyGridColKey() {
    this.Item = "Item";
    this.Bid = "Bid";
    this.Ask = "Ask";
    this.AutoAdjustPoints = "AutoAdjustPoints";
    this.IncreaseAutoAdjustPoints = "IncreaseAutoAdjustPoints";
    this.DecreaseAutoAdjustPoints = "DecreaseAutoAdjustPoints";
    this.SpreadPoints = "SpreadPoints";
    this.IncreaseSpreadPoints = "IncreaseSpreadPoints";
    this.DecreaseSpreadPoints = "DecreaseSpreadPoints";
    this.BuyLot = "BuyLot";
    this.SellLot = "SellLot";
}

function QuotePolicyGridLanguage() {
    this.Item = "";
    this.Bid = "Bid";
    this.Ask = "Ask";
    this.AutoAdjustPoints = "AP";
    this.IncreaseAutoAdjustPoints = "+";
    this.DecreaseAutoAdjustPoints = "-";
    this.SpreadPoints = "SP";
    this.IncreaseSpreadPoints = "+";
    this.DecreaseSpreadPoints = "-";
    this.BuyLot = "Buy";
    this.SellLot = "Sell";
}

function QuotationTaskGridColKey() {
    this.QuotationButtonA = "QuotationButtonA";
    this.QuotationButtonB = "QuotationButtonB";
    this.QuotationButtonC = "QuotationButtonC";
    this.QuotationButtonD = "QuotationButtonD";
    this.Quotation = "Quotation";
    this.Item = "Item";
    this.Time = "Time";
    this.Count = "Count";
    this.Source = "Source";
    this.Last = "Last";
    this.Diff = "Diff";
    this.Bid = "Bid";
    this.Ask = "Ask";
    this.Lot = "Lot";
    this.ClientCode = "ClientCode";
    this.Key = "Key";
}

function QuotationTaskGridLanguage() {
    this.QuotationButtonA = "Action";
    this.QuotationButtonB = "Action";
    this.QuotationButtonC = "Action";
    this.QuotationButtonD = "Action";
    this.Quotation = "Quotation";
    this.Item = "Item";
    this.Time = "Time";
    this.Count = "Count";
    this.Source = "Source";
    this.Last = "Last";
    this.Diff = "Diff";
    this.Bid = "Bid";
    this.Ask = "Ask";
    this.Lot = "Lot";
    this.ClientCode = "Client";
    this.Key = "";
}

function OrderGridColKey() {
    this.DQAccept = "DQAccept";
    this.DQReject = "DQReject";
    this.OrderPlacing = "OrderPlacing";
    this.OrderPending = "OrderPending";
    this.OrderCanceled = "OrderCanceled";
    this.OrderExecuted = "OrderExecuted";
    this.Order = "Order";
    this.Item = "Item";
    this.Time = "Time";
    this.SubmitTime = "SubmitTime";
    this.Account = "Account";
    this.BuyLot = "BuyLot";  //Show BuySell
    this.SellLot = "SellLot"; //Show Lot
    this.OpenClose = "OpenClose";
    this.TradeOption = "TradeOption";
    this.QuotePolicyCode = "QuotePolicyCode";
    this.SetPrice = "SetPrice";
    this.BestPrice = "BestPrice";
    this.RefPrice = "RefPrice";
    this.PriceDif = "PriceDif";
    this.DQMaxMove = "DQMaxMove";
    this.HitCount = "HitCount";
    this.BestTime = "BestTime";
    this.TransactionCode = "TransactionCode";
    this.ContractSize = "ContractSize";
    this.Type = "Type";
    this.ExpireTime = "ExpireTime";
    this.OpenPrice = "OpenPrice";
    this.Key = "Key";
}

function OrderGridLanguage() {
    this.DQAccept = "DQ Order";
    this.DQReject = "DQ Order";
    this.OrderPlacing = "LMT Order";
    this.OrderPending = "LMT Order";
    this.OrderCanceled = "LMT Order";
    this.OrderExecuted = "LMT Order";
    this.Order = "";
    this.Item = "Item";
    this.Time = "Time";
    this.SubmitTime = "Submit Time";
    this.Account = "Account";
    this.BuyLot = "B/S";   //Show BuySell
    this.SellLot = "Lot";  //Show Lot
    this.OpenClose = "O/C";
    this.TradeOption = "Option";
    this.QuotePolicyCode = "Quote Policy";
    this.SetPrice = "Set Price";
    this.BestPrice = "Best Price";
    this.RefPrice = "Ref Price";
    this.PriceDif = "Price Dif";
    this.DQMaxMove = "Max Move";
    this.HitCount = "Hit";
    this.BestTime = "Best Time";
    this.TransactionCode = "Tran Code";
    this.ContractSize = "Size";
    this.Type = "Type";
    this.ExpireTime = "Expire";
    this.OpenPrice = "Open Price";
    this.Key = "";
}

function HistoryGridColKey() {
    this.Bid = "Bid";
    this.Ask = "Ask";
    this.Time = "Time";
    this.Source = "Source";
    this.Key = "Key";
}

function HistoryGridLanguage() {
    this.Bid = "Bid";
    this.Ask = "Ask";
    this.Time = "Time";
    this.Source = "";
    this.Key = "";
}

function SearchGridColKey() {
    this.Sequence = "Sequence";
    this.Item = "Item";
    this.IsBuy = "IsBuy";
    this.OpenClose = "OpenClose";
    this.Lot = "Lot";
    this.OrderCode = "OrderCode";
    this.Account = "Account";
    this.Price = "Price";
    this.Type = "Type";
    this.ExecuteTime = "ExecuteTime";
    this.Relation = "Relation";
    this.Dealer = "Dealer";
}

function SearchGridLanguage() {
    this.Item = "Item";
    this.IsBuy = "B/S";
    this.OpenClose = "O/C";
    this.Lot = "Lot";
    this.OrderCode = "Order Code";
    this.Account = "A/C";
    this.Price = "Price";
    this.Type = "Type";
    this.ExecuteTime = "Execute Time";
    this.Relation = "Relation";
    this.Dealer = "Dealer";
}

function SearchGridColKeyForCancelledOrder() {
    this.Sequence = "Sequence";
    this.Item = "Item";
    this.IsBuy = "IsBuy";
    this.OpenClose = "OpenClose";
    this.Lot = "Lot";
    this.OrderCode = "OrderCode";
    this.Account = "Account";
    this.Price = "Price";
    this.Type = "Type";
    this.Relation = "Relation";
    this.Reason = "Reason";
}

function SearchGridLanguageForCancelledOrder() {
    this.Item = "Item";
    this.IsBuy = "B/S";
    this.OpenClose = "O/C";
    this.Lot = "Lot";
    this.OrderCode = "Order Code";
    this.Account = "A/C";
    this.Price = "Price";
    this.Type = "Type";
    this.Relation = "Relation";
    this.Reason = "Reason";
}

function InterestGridColKey() {
    this.Sequence = "Sequence";
    this.Code = "Code";
    this.AccountID = "AccountID";
    this.AccountCode = "AccountCode";
    this.BS = "BS";
    this.ContractSize = "ContractSize";
    this.ExecuteTime = "ExecuteTime";
    this.ExecutePrice = "ExecutePrice";
    this.LotBalance = "LotBalance";
    this.AutoLimitPrice = "AutoLimitPrice";
    this.AutoStopPrice = "AutoStopPrice";
    this.Id = "Id";
}

function InterestGridLanguage() {
    this.Code = "Code";
    this.AccountID = "";
    this.AccountCode = "Account";
    this.BS = "B/S";
    this.ContractSize = "Size";
    this.ExecuteTime = "Execute Time";
    this.ExecutePrice = "Price";
    this.LotBalance = "Lot";
    this.AutoLimitPrice = "Auto Limit Price";
    this.AutoStopPrice = "Auto Stop Price";
    this.Id = "";
}

function GroupNetPositionGridColKey() {
    this.GroupCode = "GroupCode";
    this.Selected = "Selected";
    this.OIPercent = "OIPercent";
    this.GroupId = "GroupId";
    this.LotBalance = "LotBalance";
    this.Quantity = "Quantity";
}

function GroupNetPositionGridLanguage() {
    this.GroupCode = "Group";
    this.Selected = "X";
    this.OIPercent = "%";
    this.GroupId = "";
    this.LotBalance = "Lot";
    this.Quantity = "Quantity";
}

function ExecuteOrderSummaryGridColKey() {
    this.Range = "Range";
    this.OrderCount = "OrderCount";
    this.SellAvgPrice = "SellAvgPrice";
    this.SellLot = "SellLot";
    this.BuyAvgPrice = "BuyAvgPrice";
    this.BuyLot = "BuyLot";
    this.Id = "Id";
}

function ExecuteOrderSummaryGridLanguage() {
    this.Range = "Range";
    this.OrderCount = "Order Count";
    this.SellAvgPrice = "Average Sell";
    this.SellLot = "Sell Lot";
    this.BuyAvgPrice = "Average Buy";
    this.BuyLot = "Buy Lot";
    this.Id = "";
}

function InterestSummaryGridColKey() {
    this.Code = "Code";
    this.SellLot = "SellLot";
    this.SellAvgPrice = "SellAvgPrice";
    this.SellContractSize = "SellContractSize";
    this.BuyLot = "BuyLot";
    this.BuyAvgPrice = "BuyAvgPrice";
    this.BuyContractSize = "BuyContractSize";
    this.NetLot = "NetLot";
    this.NetAvgPrice = "NetAvgPrice";
    this.NetContractSize = "NetContractSize";
    this.Exclude = "Exclude";
    this.Id = "Id";
    this.Key = "Key";
}

function InterestSummaryGridLanguage() {
    this.Code = "Code";
    this.SellLot = "Total Sell";
    this.SellAvgPrice = "Average Price";
    this.SellContractSize = "Sell Size";
    this.BuyLot = "Total Buy";
    this.BuyAvgPrice = "Average Price";
    this.BuyContractSize = "Buy Size";
    this.NetLot = "Net";
    this.NetAvgPrice = "";
    this.NetContractSize = "Net Size";
    this.Exclude = "Exclude";
    this.Id = "";
    this.Key = "";
}

function InstantOrderListGridColKey() {
    this.Status = "Status";
    this.AcceptAction = "AcceptAction";
    this.DiffPrice = "DiffPrice";
    this.RejectAction = "RejectAction";
    this.SubmitTime = "SubmitTime";
    this.AccountCode = "AccountCode";
    this.SetPrice = "SetPrice";
    this.Lot = "Lot";
    this.IsOpen = "IsOpen";
    this.QuotePolicyCode = "QuotePolicyCode";
    this.DQMaxMove = "DQMaxMove";
    this.TransactionCode = "TransactionCode";
    this.ContractSize = "ContractSize";
    this.Id = "Id";
}

function InstantOrderListGridLanguage() {
    this.Status = "";
    this.AcceptAction = "Accept";
    this.DiffPrice = "Diff";
    this.RejectAction = "Reject";
    this.SubmitTime = "";
    this.AccountCode = "";
    this.SetPrice = "Price";
    this.Lot = "Lot";
    this.IsOpen = "O/C";
    this.QuotePolicyCode = "QuotePolicy";
    this.DQMaxMove = "";
    this.TransactionCode = "";
    this.ContractSize = "";
    this.Id = "";
}

function ExecutedGridColKey() {
    this.Sequence = "Sequence";
    this.OrderID = "OrderID";
    this.Item = "Item";
    this.IsBuy = "IsBuy";
    this.OpenClose = "OpenClose";
    this.Lot = "Lot";
    this.OrderCode = "OrderCode";
    this.Account = "Account";
    this.Blacklist = "Blacklist";
    this.QuotePolicyCode = "QuotePolicyCode";
    this.Price = "Price";
    this.Type = "Type";
    this.ExecuteTime = "ExecuteTime";
    this.RelationString = "RelationString";
    this.Dealer = "Dealer";
}

function ExecutedGridLanguage() {
    this.OrderID = "";
    this.Item = "Item";
    this.IsBuy = "B/S";
    this.OpenClose = "O/C";
    this.Lot = "Lot";
    this.OrderCode = "OrderCode";
    this.Account = "A/C";
    this.Blacklist = "BL";
    this.QuotePolicyCode = "Quote Policy";
    this.Price = "Price";
    this.Type = "Type";
    this.ExecuteTime = "Execute Time";
    this.RelationString = "Relation";
    this.Dealer = "Dealer";
}

function UnclosedOrderGridColKey() {
    this.Sequence = "Sequence";
    this.InstrumentCode = "InstrumentCode";
    this.IsBuy = "IsBuy";
    this.ContractSize = "ContractSize";
    this.LotBalance = "LotBalance";
    this.OrderCode = "OrderCode";
    this.ExecutePrice = "ExecutePrice";
    this.OrderTypeID = "OrderTypeID";
    this.ExecuteTime = "ExecuteTime";
}

function UnclosedOrderGridLanguage() {
    this.InstrumentCode = "Item";
    this.IsBuy = "B/S";
    this.ContractSize = "Size";
    this.LotBalance = "Lot Balance";
    this.OrderCode = "Code";
    this.ExecutePrice = "Execute Price";
    this.OrderTypeID = "Type";
    this.ExecuteTime = "Execute Time";
}

function OrderPrintGridColKey() {
    this.TranCode = "TranCode";
    this.Instrument = "Instrument";
    this.Account = "Account";
    this.IsOpen = "IsOpen";
    this.IsBuy = "IsBuy";
    this.Lot = "Lot";
    this.ExecutePrice = "ExecutePrice";
    this.ExecuteTime = "ExecuteTime";
}

function OrderPrintGridLanguage() {
    this.TranCode = "TransCode:";
    this.Instrument = "Instrument:";
    this.Account = "A/C:";
    this.IsOpen = "O/C:";
    this.IsBuy = "B/S:";
    this.Lot = "Lot:";
    this.ExecutePrice = "Price:";
    this.ExecuteTime = "Time:";
}

function DealingPolicyDetailGridColKey() {
    this.DealingPolicyID = "DealingPolicyID";
    this.InstrumentID = "InstrumentID";
    this.MaxDQLot = "MaxDQLot";
    this.MaxOtherLot = "MaxOtherLot";
    this.DQQuoteMinLot = "DQQuoteMinLot";
    this.AutoDQMaxLot = "AutoDQMaxLot";
    this.AutoLmtMktMaxLot = "AutoLmtMktMaxLot";
    this.AcceptDQVariation = "AcceptDQVariation";
    this.AcceptLmtVariation = "AcceptLmtVariation";
    this.AcceptCloseLmtVariation = "AcceptCloseLmtVariation";
    this.CancelLmtVariation = "CancelLmtVariation";
    this.AutoDQDelay = "AutoDQDelay";
    this.AllowedNewTradeSides = "AllowedNewTradeSides";
    this.AutoAcceptMaxLot = "AutoAcceptMaxLot";
    this.AutoCancelMaxLot = "AutoCancelMaxLot";
    this.HitPriceVariationForSTP = "HitPriceVariationForSTP";
}

function DealingPolicyDetailGridLanguage() {
    this.DealingPolicyID = "";
    this.InstrumentID = "";
    this.MaxDQLot = "Max DQ Lot";
    this.MaxOtherLot = "Max Other Lot";
    this.DQQuoteMinLot = "DQ Quote Min Lot";
    this.AutoDQMaxLot = "Auto DQ Max Lot";
    this.AutoLmtMktMaxLot = "Auto Lmt Mkt Max Lot";
    this.AcceptDQVariation = "Accept DQ Variation";
    this.AcceptLmtVariation = "Add Net Position Accept Lmt Variation";
    this.AcceptCloseLmtVariation = "Reduce Net Position Accept Lmt Variation";
    this.CancelLmtVariation = "Cancel Lmt Variation";
    this.AutoDQDelay = "Auto DQ Delay";
    this.AllowedNewTradeSides = "New Trade side allowed";
    this.AutoAcceptMaxLot = "Auto Accept Lmt Max Lot";
    this.AutoCancelMaxLot = "Auto Cancel Lmt Max Lot";
    this.HitPriceVariationForSTP = "Hit Price Variation For STP";
}

function BlotterSelectionGridColKey() {
    this.Select = "Select";
    this.Code = "Code";
    this.Id = "Id";
}

function BlotterSelectionGridLanguage() {
    this.Select = "Select";
    this.Code = "Code";
    this.Id = "";
}

function CustomerPolicyManagementGridColKey() {
    this.Code = "Code";
    this.Select = "Select";
    this.CustomerCode = "CustomerCode";
    this.QuotePolicyCode = "QuotePolicyCode";
    this.DealingPolicyCode = "DealingPolicyCode";
    this.CustomerId = "CustomerId";
    this.Id = "Id";
    this.SalesId = "SalesId";
    this.SaleSelect = "SaleSelect";
    this.SalesCode = "SalesCode";
    this.SalesQuotePolicyCode = "SalesQuotePolicyCode";
    this.SalesDealingPolicyCode = "SalesDealingPolicyCode";
}

function CustomerPolicyManagementGridLanguage() {
    this.Code = "Code";
    this.Select = "Select";
    this.CustomerCode = "Customer Code";
    this.QuotePolicyCode = "Quote Policy";
    this.DealingPolicyCode = "Dealing Policy";
    this.CustomerId = "";
    this.Id = "";
    this.SalesId = "";
    this.SaleSelect = "Select";
    this.SalesCode = "Sales Code";
    this.SalesQuotePolicyCode = "Sales Quote Policy";
    this.SalesDealingPolicyCode = "Sales Dealing Policy";
}