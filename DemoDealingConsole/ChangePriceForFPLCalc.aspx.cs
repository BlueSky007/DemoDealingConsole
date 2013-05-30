using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using iExchange.Common;
using System.Configuration;

namespace iExchange.DealingConsole
{
    public partial class ChangePriceForFPLCalc : System.Web.UI.Page
    {
        private static string currentInstrumentID;
        protected void Page_Load(object sender, EventArgs e)
        {
            //string filePath = this.MapPath(Application["ReportXMLPosition"].ToString() + LanguageManager.LanguageXml);
            //this.Session["ChangePriceForFPLCalcLanguage"] = Language.GetLanguage(filePath, "ChangePriceForFPLCalc");
            this.grid.Columns[0].HeaderText = "Item";
            this.grid.Columns[1].HeaderText = "Code";
            this.grid.Columns[2].HeaderText = "Bid";
            this.grid.Columns[3].HeaderText = "Ask";
            this.grid.Columns[4].HeaderText = "SpreadPoints";
            this.grid.Columns[5].HeaderText = "Operation";
            this.saveButton.Text = "Save";

            // Put user code to initialize the page here
            if (Page.IsPostBack) return;
            this.DataBind();
        }

        protected void saveButton_Click(object sender, System.EventArgs e)
        {
            if (currentInstrumentID == string.Empty) return;
            try
            {
                System.Data.DataSet ds = new DataSet();
                using (SqlConnection sqlConnection = new SqlConnection(ConnectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand("dbo.P_RptInstrumentForFPLCalc_Upd", sqlConnection);
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.CommandTimeout = 60000;
                    SqlParameter sqlParameter = sqlCommand.Parameters.Add("@InstrumentID", SqlDbType.UniqueIdentifier);
                    sqlParameter.Value = new Guid(currentInstrumentID);
                    sqlParameter = sqlCommand.Parameters.Add("@Bid", SqlDbType.NVarChar, 10);
                    sqlParameter.Value = this.BidTextBox.Text;
                    sqlParameter = sqlCommand.Parameters.Add("@SpreadPoints", SqlDbType.Int);
                    sqlParameter.Value = this.SpreadPointsTextBox.Text;

                    sqlCommand.ExecuteNonQuery();
                }

                this.DataBind();
            }
            catch (System.Exception ex)
            {
            }
            finally
            {
            }
        }

        private DataTable GetData()
        {
            System.Data.DataTable dt = new DataTable();
            try
            {
                System.Data.DataSet ds = new DataSet();
                using (SqlConnection sqlConnection = new SqlConnection(ConnectionString))
                {
                    sqlConnection.Open();

                    SqlCommand sqlCommand = new SqlCommand("dbo.P_RptGetInstrumentForFloatingPLCalc", sqlConnection);
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.CommandTimeout = 60000;
                    SqlParameter sqlParameter = sqlCommand.Parameters.Add("@userID", SqlDbType.UniqueIdentifier);
                    Guid userID = ((Token)Session["Token"]).UserID;
                    sqlParameter.Value = userID;
                    sqlParameter = sqlCommand.Parameters.Add("@userType", SqlDbType.Int);
                    sqlParameter.Value = 0;

                    SqlDataAdapter dataAdapter = new SqlDataAdapter();
                    dataAdapter.SelectCommand = sqlCommand;
                    dataAdapter.Fill(ds);
                    dt = ds.Tables[0];

                }
            }
            catch (System.Exception ex)
            {
            }
            finally
            {
            }

            return dt;
        }

        public override void DataBind()
        {
            System.Data.DataTable dt = this.GetData();
            dt.DefaultView.Sort = "Code";
            this.grid.DataSource = dt.DefaultView;
            this.grid.DataBind();
        }

        private void grid_PageIndexChanged(object source, System.Web.UI.WebControls.DataGridPageChangedEventArgs e)
        {
            this.grid.CurrentPageIndex = e.NewPageIndex;
            this.DataBind();
        }

        private void grid_EditCommand(object source, System.Web.UI.WebControls.DataGridCommandEventArgs e)
        {
            currentInstrumentID = e.Item.Cells[0].Text;
            if (currentInstrumentID != string.Empty)
            {
                this.CodeTextBox.Text = e.Item.Cells[1].Text;
                this.BidTextBox.Text = ((e.Item.Cells[2].Text == "&nbsp;") ? string.Empty : e.Item.Cells[2].Text);
                this.SpreadPointsTextBox.Text = e.Item.Cells[4].Text;
            }
        }

        protected string ConnectionString
        {
            get
            {
                return ConfigurationSettings.AppSettings["ConnectionString"]; ;
            }
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
            this.grid.PageIndexChanged += new System.Web.UI.WebControls.DataGridPageChangedEventHandler(this.grid_PageIndexChanged);
            this.grid.EditCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.grid_EditCommand);

        }
        #endregion
    }
}