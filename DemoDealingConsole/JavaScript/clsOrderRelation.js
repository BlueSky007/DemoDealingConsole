function OrderRelation() {
    this.openOrderID;
    this.closedLot;

    this.UpdateByXmlNode = function (xmlNode) {
        for (var index = 0, count = xmlNode.attributes.length; index < count; index++) {
            var attribute = xmlNode.attributes.item(index);
            switch (attribute.nodeName) {
                case "OpenOrderID":
                    this.openOrderID = attribute.nodeValue;
                    break;
                case "ClosedLot":
                    this.closedLot = parseFloat(attribute.nodeValue);
                    break;
            }
        }
    }
}