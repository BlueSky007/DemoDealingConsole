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

using System.Web.Security;
using iExchange.Common;

namespace iExchange.DealingConsole
{
	/// <summary>
	/// Summary description for ChangePasswod.
	/// </summary>
	public partial class ChangePasswod : System.Web.UI.Page
	{
		protected System.Web.UI.WebControls.Label Label1;
		protected System.Web.UI.WebControls.Label Label2;
		protected System.Web.UI.WebControls.Label Label3;
		protected System.Web.UI.WebControls.Label Label5;
		protected System.Web.UI.WebControls.Label Label6;
		protected System.Web.UI.WebControls.Label Label7;
		protected System.Web.UI.WebControls.Label Label8;
		protected System.Web.UI.WebControls.Label Label4;
	
		protected void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here
            this.btnOk.Text = this.GetLanguage("Ok");
            this.btnCancel.Text = this.GetLanguage("Cancel");
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

        public bool UpdatePassword(string loginId, string oldPassword, string newPassword, out string message)
        {
            message = "";
            ParticipantServices.ParticipantServices ParticipantServices = (ParticipantServices.ParticipantServices)Application["ParticipantServices"];
            Guid userId = ParticipantServices.Login(loginId, oldPassword);
            if (userId != Guid.Empty)
            {
                Token token = (Token)Session["Token"];
                return ParticipantServices.UpdatePassword(userId, newPassword, userId, out message);
            }
            return false;
        }

		protected void btnOk_Click(object sender, System.EventArgs e)
		{
			if (IsValidPasswordInput(txtOldPassword.Text) == true &&
				IsValidPasswordInput(txtNewPassword.Text) == true && 
				IsValidPasswordInput(txtConfirmPassword.Text) == true)
			{
				if (txtNewPassword.Text == txtConfirmPassword.Text)
				{
					bool isSucced = false;
#if(PERMISSION)
	//				ParticipantServices.ParticipantServices ParticipantServices = (ParticipantServices.ParticipantServices)Application["ParticipantServices"];
	//				Token token=(Token)Session["Token"];
	//				Guid userID = token.UserID;
					string message = "";
					//isSucced = ParticipantServices.UpdatePassword(userID, txtNewPassword.Text, userID, out message);
                    isSucced = this.UpdatePassword(this.Session["LoginId"].ToString(),txtOldPassword.Text,txtNewPassword.Text,out message);
#else
					byte[] oldPassword = CryptHelper.ComputeHash(txtOldPassword.Text);	
					byte[] newPassword = CryptHelper.ComputeHash(txtNewPassword.Text);	
					Service service=new Service();
					isSucced = service.ChangePassword(oldPassword,newPassword);
#endif
                    lblChangePasswordPrompt.Text = (isSucced == true) ? this.GetLanguage("SuccedChangePassword") : this.GetLanguage("FailedChangePassword");
					lblChangePasswordPrompt.Visible=true;
				}
				else
				{
                    lblChangePasswordPrompt.Text = this.GetLanguage("InvalidPassword");
					lblChangePasswordPrompt.Visible=true;
				}
			}
			else
			{
                lblChangePasswordPrompt.Text = this.GetLanguage("IsValidPasswordInputMsg");
				lblChangePasswordPrompt.Visible=true;
			}
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

		protected void btnCancel_Click(object sender, System.EventArgs e)
		{
			this.OnUnload(e);
		}

	}
}
