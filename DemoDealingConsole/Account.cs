using System;
using System.Xml;
using System.Data;

namespace iExchange.DealingConsole
{
    /// <summary>
    /// Summary description for Account.
    /// </summary>
    public class Account
    {
        private Guid id;
        private string code;
        private int type;
        private Guid customerID;
        private Guid tradePolicyID;
        private decimal rateLotMin;
        private decimal rateLotMultiplier;
        private decimal rateDefaultLot;
        private Guid groupID;
        private string groupCode;

        public Account(DataRow row)
        {
            this.Update(row);
        }

        public void Update(DataRow row)
        {
            this.ID = (Guid)row["ID"];
            if (row["Code"] == DBNull.Value)
                this.Code = null;
            else
                this.Code = (string)row["Code"];
            this.Type = (int)row["Type"];
            this.CustomerID = (Guid)row["CustomerID"];
            this.TradePolicyID = (Guid)row["TradePolicyID"];
            this.RateLotMin = (decimal)row["RateLotMin"];
            this.RateLotMultiplier = (decimal)row["RateLotMultiplier"];
            this.RateDefaultLot = (decimal)row["RateDefaultLot"];
            this.GroupID = (Guid)row["GroupID"];
            if (row["GroupCode"] == DBNull.Value)
                this.GroupCode = null;
            else
                this.GroupCode = (string)row["GroupCode"];
        }

        public Account(XmlNode node)
        {
            foreach (XmlAttribute attribute in node.Attributes)
            {
                switch (attribute.Name)
                {
                    case "ID":
                        this.ID = XmlConvert.ToGuid(attribute.Value);
                        break;
                    case "Code":
                        this.Code = attribute.Value;
                        break;
                    case "Type":
                        this.Type = XmlConvert.ToInt32(attribute.Value);
                        break;
                    case "CustomerID":
                        this.CustomerID = XmlConvert.ToGuid(attribute.Value);
                        break;
                    case "TradePolicyID":
                        this.TradePolicyID = XmlConvert.ToGuid(attribute.Value);
                        break;                    
                    case "RateLotMin":
                        this.RateLotMin = XmlConvert.ToDecimal(attribute.Value);
                        break;
                    case "RateLotMultiplier":
                        this.RateLotMultiplier = XmlConvert.ToDecimal(attribute.Value);
                        break;
                    case "RateDefaultLot":
                        this.RateDefaultLot = XmlConvert.ToDecimal(attribute.Value);
                        break;
                    case "GroupID":
                        this.GroupID = XmlConvert.ToGuid(attribute.Value);
                        break;
                    case "GroupCode":
                        this.GroupCode = attribute.Value;
                        break;
                }
            }
        }

        public bool Update(XmlNode node)
        {
            foreach (XmlAttribute attribute in node.Attributes)
            {
                switch (attribute.Name)
                {
                    /*case "ID":
                        this.ID = XmlConvert.ToGuid(attribute.Value);
                        break;*/
                    case "Code":
                        this.Code = attribute.Value;
                        break;
                    case "Type":
                        this.Type = XmlConvert.ToInt32(attribute.Value);
                        break;
                    case "CustomerID":
                        this.CustomerID = XmlConvert.ToGuid(attribute.Value);
                        break;
                    case "TradePolicyID":
                        this.TradePolicyID = XmlConvert.ToGuid(attribute.Value);
                        break;
                    case "RateLotMin":
                        this.RateLotMin = XmlConvert.ToDecimal(attribute.Value);
                        break;
                    case "RateLotMultiplier":
                        this.RateLotMultiplier = XmlConvert.ToDecimal(attribute.Value);
                        break;
                    case "RateDefaultLot":
                        this.RateDefaultLot = XmlConvert.ToDecimal(attribute.Value);
                        break;
                    case "GroupID":
                        this.GroupID = XmlConvert.ToGuid(attribute.Value);
                        break;
                    case "GroupCode":
                        this.GroupCode = attribute.Value;
                        break;
                }
            }
            return true;
        }

        #region Properties
        public Guid ID
        {
            get
            {
                return id;
            }
            set
            {
                id = value;
            }
        }

        public string Code
        {
            get
            {
                return code;
            }
            set
            {
                code = value;
            }
        }

        public int Type
        {
            get
            {
                return type;
            }
            set
            {
                type = value;
            }
        }

        public Guid TradePolicyID
        {
            get
            {
                return tradePolicyID;
            }
            set
            {
                tradePolicyID = value;
            }
        }

        public Guid CustomerID
        {
            get
            {
                return customerID;
            }
            set
            {
                customerID = value;
            }
        }
        
        public decimal RateLotMin
		{
			get
			{
                return rateLotMin;
			}
			set
			{
                rateLotMin = value;
			}
		}

        public decimal RateLotMultiplier
        {
            get
            {
                return rateLotMultiplier;
            }
            set
            {
                rateLotMultiplier = value;
            }
        }

        public decimal RateDefaultLot
        {
            get
            {
                return rateDefaultLot;
            }
            set
            {
                rateDefaultLot = value;
            }
        }

        public Guid GroupID
        {
            get
            {
                return groupID;
            }
            set
            {
                groupID = value;
            }
        }
        public string GroupCode
        {
            get
            {
                return groupCode;
            }
            set
            {
                groupCode = value;
            }
        }
		#endregion

        public XmlNode ToXmlNode()
        {
            XmlDocument doc = new XmlDocument();
            XmlElement accountNode = doc.CreateElement("Account");

            accountNode.SetAttribute("ID", ID.ToString());
            accountNode.SetAttribute("Code", Code);
            accountNode.SetAttribute("Type", Type.ToString());
            accountNode.SetAttribute("TradePolicyID", TradePolicyID.ToString());
            accountNode.SetAttribute("CustomerID", CustomerID.ToString());
            accountNode.SetAttribute("RateLotMin", RateLotMin.ToString());
            accountNode.SetAttribute("RateLotMultiplier", RateLotMultiplier.ToString());
            accountNode.SetAttribute("RateDefaultLot", RateDefaultLot.ToString());
            accountNode.SetAttribute("GroupID", GroupID.ToString());
            accountNode.SetAttribute("GroupCode", (string.IsNullOrWhiteSpace(GroupCode)) ? string.Empty : GroupCode);

            return accountNode;
        }
    }
}
