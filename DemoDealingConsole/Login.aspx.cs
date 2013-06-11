//===========================================================================
// This file was modified as part of an ASP.NET 2.0 Web project conversion.
// The class name was changed and the class modified to inherit from the abstract base class 
// in file 'App_Code\Migrated\Stub_Login_aspx_cs.cs'.
// During runtime, this allows other classes in your web application to bind and access 
// the code-behind page using the abstract base class.
// The associated content page 'Login.aspx' was also modified to refer to the new class name.
// For more information on this code pattern, please refer to http://go.microsoft.com/fwlink/?LinkId=46995 
//===========================================================================
using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Configuration;
using System.Web.Security;
using iExchange.Common;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Globalization;

namespace iExchange.DealingConsole
{
	/// <summary>
	/// Summary description for Login.
	/// </summary>
	public partial class Login : Page
	{
		protected System.Web.UI.WebControls.Label Label4;
		protected System.Web.UI.WebControls.Label Label3;
		protected System.Web.UI.WebControls.Label Label2;
		protected System.Web.UI.WebControls.Label Label1;
		protected System.Web.UI.WebControls.TextBox Textbox3;
		protected System.Web.UI.WebControls.TextBox Textbox4;
	
		protected void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here
            this.SettingLanguage();
		}

		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: This call is required by the ASP.NET Web Form Designer.
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{    

		}
		#endregion

		private bool IsValidPasswordInput(string inputValue)
		{
			bool isValid = false;
			if ((inputValue).Length >= 8 && (inputValue).Length <= 16)
			{
				isValid = true;
			}
			return (isValid);
		}

		protected void btnOk_Click(object sender, System.EventArgs e)
		{
			lblLoginPrompt.Text = "";
			if (txtLoginID.Text == "")
			{
                lblLoginPrompt.Text = this.GetLanguage("LoginNameEmptyMsg");
				lblLoginPrompt.Visible=true;
				return;
			}

			bool isAdmin = string.Compare("Admin", txtLoginID.Text.Trim(), true) == 0 ||
				string.Compare("Administrator", txtLoginID.Text.Trim(), true) == 0;
			int maxTryLoginTimes = 0;
			#region get MaxTryLoginTimes
			if (this.Session["MaxTryLoginTimes"] != null)
			{
				maxTryLoginTimes = (int)this.Session["MaxTryLoginTimes"];
			}
			else
			{
				maxTryLoginTimes = this.GetMaxTryLoginTimes(ConfigurationSettings.AppSettings["ConnectionString"]);
				this.Session["MaxTryLoginTimes"] = maxTryLoginTimes;
			}
			#endregion

			int currentTryTimes = 0;
			if (this.Session["TryLoginTimes"] != null)
			{
				currentTryTimes = (int)this.Session["TryLoginTimes"];
			}

			if (currentTryTimes < maxTryLoginTimes)
			{
				#region 
				Service service = new Service();
				Guid userID = service.Login(txtLoginID.Text, txtPassword.Text);

				if (userID != Guid.Empty)
				{
					this.Session.Remove("TryLoginTimes");

					this.Session["LoginId"] = txtLoginID.Text;
					FormsAuthentication.RedirectFromLoginPage(userID.ToString(), false);

					//Used for kickout--Michael
					Hashtable sessionIDs = (Hashtable)this.Context.Application["SessionIDs"];
					sessionIDs = Hashtable.Synchronized(sessionIDs);
					sessionIDs[userID] = this.Context.Session.SessionID;
				}
				else
				{
					if (!isAdmin)
					{
						currentTryTimes++;
						this.Session["TryLoginTimes"] = currentTryTimes;
					}
					if (currentTryTimes >= maxTryLoginTimes)
					{
						this.ForceChangePassword(txtLoginID.Text, ConfigurationSettings.AppSettings["ConnectionString"]);

						txtPassword.Text = string.Empty;
                        lblLoginPrompt.Text = this.GetLanguage("MaxLoginTimes");
						lblLoginPrompt.Visible = true;
					}
					else
					{
						txtPassword.Text = string.Empty;
                        lblLoginPrompt.Text = this.GetLanguage("LoginFailedMsg");
						lblLoginPrompt.Visible = true;
					}

				} 
				#endregion
			}
			else
			{
				txtPassword.Text = string.Empty;
                lblLoginPrompt.Text = this.GetLanguage("MaxLoginTimes");
				lblLoginPrompt.Visible = true;
			}
		}

		private int GetMaxTryLoginTimes(string connectString)
		{
			int maxTryLoginTimes = 0;
			using (SqlConnection connection = new SqlConnection(connectString))
			{
				using (SqlCommand command = new SqlCommand("SELECT MaxTryLoginTimes FROM dbo.SystemParameter", connection))
				{
					command.CommandType = CommandType.Text;
					try
					{
						connection.Open();
						using (SqlDataReader reader = command.ExecuteReader())
						{
							if (reader.HasRows)
							{
								reader.Read();
								maxTryLoginTimes = reader.GetInt32(0);
							}
							else
							{
								throw new Exception("MaxTryLoginTimes doesn't config in dbo.SystemParameter");
							}
						}
					}
					catch (Exception e)
					{
						throw e;
					}
					finally
					{
						connection.Close();
					}
				}
			}
			return maxTryLoginTimes;
		}

		private void ForceChangePassword(string loginName, string connectString)
		{
			using (SqlConnection connection = new SqlConnection(connectString))
			{
				using (SqlCommand command = new SqlCommand("dbo.P_ForceChangePassword", connection))
				{
					command.CommandType = CommandType.StoredProcedure;
					command.Parameters.Add("@loginName", SqlDbType.NVarChar, 50);
					command.Parameters.Add("@password", SqlDbType.VarBinary, 128);

					command.Parameters["@loginName"].Value = loginName;
					command.Parameters["@password"].Value = this.HashMessage(Guid.NewGuid().ToString().Replace("-", "").Substring(8)); try
					{
						connection.Open();
						command.ExecuteNonQuery();
					}
					catch (Exception e)
					{
						throw e;
					}
					finally
					{
						connection.Close();
					}
				}
			}
		}

		private byte[] HashMessage(string Text)
		{
			//	byte[] signaturePassword = null;
			byte[] HashValue = null;
			try
			{
				//获得密码明文的Byte Array
				System.Text.Encoding encoding = System.Text.Encoding.Unicode;
				byte[] clearPassword = encoding.GetBytes(Text);
				//创建hash array
				SHA1Managed SHhash = new SHA1Managed();
				HashValue = SHhash.ComputeHash(clearPassword);
			}
			catch (CryptographicException ce)
			{
				string error = ce.Message;
				throw ce;
			}
			catch (Exception e)
			{
				string error = e.Message;
				throw e;
			}
			return HashValue;
		}



		protected void btnCancel_Click(object sender, System.EventArgs e)
		{
			this.OnUnload(e);		
		}

        protected void _LanguageDropDownList_SelectedIndexChanged(object sender, EventArgs e)
        {
            LanguageManager.CultureInfo = new CultureInfo(Convert.ToInt32(this._LanguageDropDownList.SelectedValue));
            this.Session["CultureInfor"] = LanguageManager.CultureInfo;
            this.Context.Response.Redirect("Login.aspx");
        }

        public string GetLanguage(string key)
        {
            if (((Hashtable)Session["LoginLanguage"]).ContainsKey(key))
            {
                return ((Hashtable)Session["LoginLanguage"])[key].ToString();
            }
            else
            {
                return key;
            }
        }

        private void SettingLanguage()
        {
            CultureInfo sesstionCultrueInfor = (CultureInfo)this.Session["CultureInfor"];
            LanguageHelper.BindDataListForLanguage(this._LanguageDropDownList, sesstionCultrueInfor);

            string filePath = this.MapPath(@"Language\" + LanguageManager.LanguageXml);

            this.Session["LanguageXml"] = LanguageHelper.GetLanguageXml(filePath);
            this.Session["LoginLanguage"] = LanguageHelper.GetLanguage(filePath, "Login");
            this.Session["TooBarPage"] = LanguageHelper.GetLanguage(filePath, "TooBarPage");
            this.Session["Common"] = LanguageHelper.GetLanguage(filePath, "Common");
            this.Session["AccountStatusLanguage"] = LanguageHelper.GetLanguage2(filePath, "AccountStatus");

            this.btnOk.Text = this.GetLanguage("Ok");
            this.btnCancel.Text = this.GetLanguage("Cancel");
   
        }
	}
	
}
