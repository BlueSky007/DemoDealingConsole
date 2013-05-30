using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace iExchange.DealingConsole
{
    public partial class SourceLevelAdjustment : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public string GetSourceLevelAdjustmentTimerInterval() 
        { 
            var sourceLevelAdjustmentTimerIntervalString = (string)System.Configuration.ConfigurationSettings.AppSettings["SourceLevelAdjustmentTimerInterval"];
            int sourceLevelAdjustmentTimerInterval = 0;
            if (string.IsNullOrEmpty(sourceLevelAdjustmentTimerIntervalString) || !int.TryParse(sourceLevelAdjustmentTimerIntervalString, out sourceLevelAdjustmentTimerInterval))
            {
                sourceLevelAdjustmentTimerIntervalString = "800";
            }
            return sourceLevelAdjustmentTimerIntervalString;
        }
    }
}