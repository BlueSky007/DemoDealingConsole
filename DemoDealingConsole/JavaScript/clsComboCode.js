
function ComboCode() {
    this._Id;          //PRIMARY KEY
    this._Code;

    this.GetId = function () {
        return this._Id;
    };

    this.SetId = function (value) {
        this._Id = value;
    };

    this.GetCode = function () {
        return this._Code;
    };

    this.SetCode = function (value) {
        this._Code = value;
    };

    this.UpdateByDataRow = function (row) {
        this._Id = row("Id");
        this._Code = row("Code");
    };

    this.UpdateByXmlNode = function (rowNode) {
        for (var index = 0, count = rowNode.attributes.length; index < count; index++) {
            var attribute = rowNode.attributes.item(index);
            switch (attribute.nodeName) {
                case "Id":
                    this._Id = attribute.nodeValue;
                    break;
                case "Code":
                    this._Code = attribute.nodeValue;
                    break;
            }
        }
    };
}
