
function DealingPolicyDetail(DealingPolicyID, InstrumentID) 
{
    this.DealingPolicyID = DealingPolicyID;
    this.InstrumentID = InstrumentID;
    this.MaxDQLot;
    this.MaxOtherLot;
    this.DQQuoteMinLot;
    this.AutoDQMaxLot;
    this.AutoLmtMktMaxLot;
    this.AcceptDQVariation;
    this.AcceptLmtVariation;
    this.AcceptCloseLmtVariation;
    this.CancelLmtVariation;
    this.AutoDQDelay;
    this.AllowedNewTradeSides;
    this.AutoAcceptMaxLot;
    this.AutoCancelMaxLot;
    this.HitPriceVariationForSTP;
    this.DealingPolicyCode;
    this.InstrumentCode;
    this.NeedUpdate = false;

    this.OldMaxDQLot;
    this.OldMaxOtherLot;
    this.OldDQQuoteMinLot;
    this.OldAutoDQMaxLot;
    this.OldAutoLmtMktMaxLot;
    this.OldAcceptDQVariation;
    this.OldAcceptLmtVariation;
    this.OldAcceptCloseLmtVariation;
    this.OldCancelLmtVariation;
    this.OldAutoDQDelay;
    this.OldAllowAddNewPosition;
    this.OldAutoAcceptMaxLot;
    this.OldAutoCancelMaxLot;
    this.OldHitPriceVariationForSTP;

    this.IsValidAutoDQDelayValue = function (value) {
        return value >= 0 && value <= 10;
    };
    this.IsValidHitPriceVariationForSTPValue = function (value) {
        return value >=0 && value <= 9999;
    };

    this.AfterSavedProcess = function () {
        this.OldMaxDQLot = this.MaxDQLot;
        this.OldMaxOtherLot = this.MaxOtherLot;
        this.OldDQQuoteMinLot = this.DQQuoteMinLot;
        this.OldAutoDQMaxLot = this.AutoDQMaxLot;
        this.OldAutoLmtMktMaxLot = this.AutoLmtMktMaxLot;
        this.OldAcceptDQVariation = this.AcceptDQVariation;
        this.OldAcceptLmtVariation = this.AcceptLmtVariation;
        this.OldAcceptCloseLmtVariation = this.AcceptCloseLmtVariation;
        this.OldCancelLmtVariation = this.CancelLmtVariation;
        this.OldAutoDQDelay = this.AutoDQDelay;
        this.oldAllowedNewTradeSides = this.AllowedNewTradeSides;
        this.OldAutoAcceptMaxLot = this.AutoAcceptMaxLot;
        this.OldAutoCancelMaxLot = this.AutoCancelMaxLot;
        this.OldHitPriceVariationForSTP = this.HitPriceVariationForSTP;

        this.NeedUpdate = false;
    };

    this.UpdateByDataRow = function (row) {
        this.OldMaxDQLot = row("maxDQLot");
        this.OldMaxOtherLot = row("maxOtherLot");
        this.OldDQQuoteMinLot = row("dQQuoteMinLot");
        this.OldAutoDQMaxLot = row("autoDQMaxLot");
        this.OldAutoLmtMktMaxLot = row("autoLmtMktMaxLot");
        this.OldAcceptDQVariation = row("acceptDQVariation");
        this.OldAcceptLmtVariation = row("acceptLmtVariation");
        this.OldAcceptCloseLmtVariation = row("acceptCloseLmtVariation");
        this.OldCancelLmtVariation = row("cancelLmtVariation");
        this.OldAutoDQDelay = row("autoDQDelay");
        this.oldAllowedNewTradeSides = row("allowedNewTradeSides ");
        this.OldAutoAcceptMaxLot = row("autoAcceptMaxLot");
        this.OldAutoCancelMaxLot = row("autoCancelMaxLot");
        this.OldHitPriceVariationForSTP = row("hitPriceVariationForSTP");

        this.MaxDQLot = row("maxDQLot");
        this.MaxOtherLot = row("maxOtherLot");
        this.DQQuoteMinLot = row("dQQuoteMinLot");
        this.AutoDQMaxLot = row("autoDQMaxLot");
        this.AutoLmtMktMaxLot = row("autoLmtMktMaxLot");
        this.AcceptDQVariation = row("acceptDQVariation");
        this.AcceptLmtVariation = row("acceptLmtVariation");
        this.AcceptCloseLmtVariation = row("acceptCloseLmtVariation");
        this.CancelLmtVariation = row("cancelLmtVariation");
        this.AutoDQDelay = row("autoDQDelay");
        this.AllowedNewTradeSides = row("allowedNewTradeSides");
        this.AutoAcceptMaxLot = row("autoAcceptMaxLot");
        this.AutoCancelMaxLot = row("autoCancelMaxLot");
        this.HitPriceVariationForSTP = row("hitPriceVariationForSTP");
    };

    this.UpdateByXmlNode = function (rowNode) {
        for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
            var attribute = rowNode.attributes.item(index);
            var nodeValue = attribute.nodeValue;
            switch (attribute.nodeName) {
                case "DealingPolicyCode":
                    this.DealingPolicyCode = nodeValue;
                    break;
                case "InstrumentCode":
                    this.InstrumentCode = nodeValue;
                    break;
                case "MaxDQLot":
                    this.MaxDQLot = parseFloat(nodeValue);
                    this.OldMaxDQLot = parseFloat(nodeValue);
                    break;
                case "MaxOtherLot":
                    this.MaxOtherLot = parseFloat(nodeValue);
                    this.OldMaxOtherLot = parseFloat(nodeValue);
                    break;
                case "DQQuoteMinLot":
                    this.DQQuoteMinLot = parseFloat(nodeValue);
                    this.OldDQQuoteMinLot = parseFloat(nodeValue);
                    break;
                case "AutoDQMaxLot":
                    this.AutoDQMaxLot = parseFloat(nodeValue);
                    this.OldAutoDQMaxLot = parseFloat(nodeValue);
                    break;
                case "AutoLmtMktMaxLot":
                    this.AutoLmtMktMaxLot = parseFloat(nodeValue);
                    this.OldAutoLmtMktMaxLot = parseFloat(nodeValue);
                    break;
                case "AcceptDQVariation":
                    this.AcceptDQVariation = parseInt(nodeValue);
                    this.OldAcceptDQVariation = parseInt(nodeValue);
                    break;
                case "AcceptLmtVariation":
                    this.AcceptLmtVariation = parseInt(nodeValue);
                    this.OldAcceptLmtVariation = parseInt(nodeValue);
                    break;
                case "AcceptCloseLmtVariation":
                    this.AcceptCloseLmtVariation = parseInt(nodeValue);
                    this.OldAcceptCloseLmtVariation = parseInt(nodeValue);
                    break;
                case "CancelLmtVariation":
                    this.CancelLmtVariation = parseInt(nodeValue);
                    this.OldCancelLmtVariation = parseInt(nodeValue);
                    break;
                case "AutoDQDelay":
                    this.AutoDQDelay = parseInt(nodeValue);
                    this.OldAutoDQDelay = parseInt(nodeValue);
                    break;
                case "AllowedNewTradeSides":
                    this.AllowedNewTradeSides = parseInt(nodeValue);
                    this.oldAllowedNewTradeSides = parseInt(nodeValue);
                    break;
                case "AutoAcceptMaxLot":
                    this.AutoAcceptMaxLot = parseFloat(nodeValue);
                    this.OldAutoAcceptMaxLot = parseFloat(nodeValue);
                    break;
                case "AutoCancelMaxLot":
                    this.AutoCancelMaxLot = parseFloat(nodeValue);
                    this.OldAutoCancelMaxLot = parseFloat(nodeValue);
                    break;
                case "HitPriceVariationForSTP":
                    this.HitPriceVariationForSTP = parseFloat(nodeValue);
                    this.OldHitPriceVariationForSTP = parseFloat(nodeValue);
                    break;
            }
        }
    };
}