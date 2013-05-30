using System;
using System.Xml;
using System.Data;

namespace iExchange.DealingConsole
{
	/// <summary>
	/// Summary description for Customer.
	/// </summary>
	public class Customer
	{
		private Guid id;
		private string code;
		private Guid privateQuotePolicyID;
		private Guid publicQuotePolicyID;
        private Guid? dealingPolicyID = null;

		public Customer(DataRow row)
		{
			this.ID = (Guid)row["ID"];
            if (row["Code"]==DBNull.Value)
                this.Code = null;
            else
                this.Code = (string)row["Code"];
			this.PrivateQuotePolicyID = (Guid)row["PrivateQuotePolicyID"];
			this.PublicQuotePolicyID = (Guid)row["PublicQuotePolicyID"];
            if (row["DealingPolicyID"] == DBNull.Value)
                this.dealingPolicyID = null;
            else
                this.dealingPolicyID = (Guid)row["DealingPolicyID"];
		}

		public Customer(XmlNode node)
		{
			foreach(XmlAttribute attribute in node.Attributes)
			{
                var value = attribute.Value;
				switch(attribute.Name)
				{
					case "ID":
                        this.ID = XmlConvert.ToGuid(value);
						break;
					case "Code":
                        this.Code = value;
						break;
					case "PrivateQuotePolicyID":
                        this.PrivateQuotePolicyID = XmlConvert.ToGuid(value);
						break;
					case "PublicQuotePolicyID":
                        this.PublicQuotePolicyID = XmlConvert.ToGuid(value);
						break;
                    case "DealingPolicyID":
                        if (!string.IsNullOrWhiteSpace(value))
                        {
                            this.dealingPolicyID = XmlConvert.ToGuid(value);
                        }
                        break;
				}
			}
		}

		public bool Update(XmlNode node)
		{
			foreach(XmlAttribute attribute in node.Attributes)
			{
                var value = attribute.Value;
				switch(attribute.Name)
				{
					/*case "ID":
						this.ID = XmlConvert.ToGuid(value);
						break;*/
					case "Code":
                        this.Code = value;
						break;
					case "PrivateQuotePolicyID":
                        this.PrivateQuotePolicyID = XmlConvert.ToGuid(value);
						break;
					case "PublicQuotePolicyID":
                        this.PublicQuotePolicyID = XmlConvert.ToGuid(value);
						break;
                    case "DealingPolicyID":
                        if (!string.IsNullOrWhiteSpace(value))
                        {
                            this.dealingPolicyID = XmlConvert.ToGuid(value);
                        }
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

		public Guid PrivateQuotePolicyID
		{
			get
			{
				return privateQuotePolicyID;
			}
			set
			{
				privateQuotePolicyID = value;
			}
		}

		public Guid PublicQuotePolicyID
		{
			get
			{
				return publicQuotePolicyID;
			}
			set
			{
				publicQuotePolicyID = value;
			}
		}
        public Guid? DealingPolicyID
        {
            get
            {
                return dealingPolicyID;
            }
            set
            {
                dealingPolicyID = value;
            }
        }
		#endregion

		public XmlNode ToXmlNode()
		{
			XmlDocument doc = new XmlDocument();
			XmlElement customerNode = doc.CreateElement("Customer");

			customerNode.SetAttribute("ID", ID.ToString());
			customerNode.SetAttribute("Code",Code);
			customerNode.SetAttribute("PrivateQuotePolicyID", PrivateQuotePolicyID.ToString());
			customerNode.SetAttribute("PublicQuotePolicyID", PublicQuotePolicyID.ToString());
            if (DealingPolicyID != null)
            {
                customerNode.SetAttribute("DealingPolicyID", DealingPolicyID.ToString());
            }
			return customerNode;
		}
	}
}
