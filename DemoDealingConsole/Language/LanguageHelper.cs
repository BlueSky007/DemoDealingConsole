using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using iExchange.Common;
using System.Xml;
using System.Globalization;
using System.Threading;
using System.Web.UI.WebControls;

namespace iExchange.DealingConsole
{
    public class LanguageHelper
    {
        private LanguageHelper()
        { }

        public static XmlDocument GetLanguageXml(string filePath)
        {
            XmlDocument xmlDocument = new XmlDocument();
            xmlDocument.Load(filePath);
            return (xmlDocument);
        }

        public static Hashtable GetLanguage(string filePath, string chilNodeName)
        {
            Hashtable languageHash = new Hashtable();
            try 
            {
                var xrs = new XmlReaderSettings();
                xrs.IgnoreComments = true;
                xrs.IgnoreWhitespace = true;
                using (var languageReader = XmlReader.Create(filePath, xrs))
                {
                    languageReader.ReadToFollowing(chilNodeName);
                    XmlReader subreader = languageReader.ReadSubtree();
                    while (subreader.Read())
                    {
                        if (subreader.NodeType == XmlNodeType.Element && subreader.Name == "Item")
                            languageHash.Add(subreader.GetAttribute("key"), subreader.GetAttribute("value"));
                    }
                }
            }
            catch (System.Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.LanguageHelper.GetLanguage", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return languageHash;
        }

        public static Hashtable GetLanguage2(string filePath, string childNodeName)
        {
            Hashtable language = new Hashtable();
            try
            {
                XmlDocument xmlDocument = new XmlDocument();
                xmlDocument.Load(filePath);
                XmlNode xmlNode = xmlDocument["Languages"][childNodeName];
                foreach (XmlNode xmlNode2 in xmlNode.ChildNodes)
                {
                    language[xmlNode2.Name] = xmlNode2.InnerText;
                    //language[xmlNode2.Name] = xmlNode2.InnerXml;
                }
                return language;
            }
            catch (System.Exception exception)
            {
                AppDebug.LogEvent("DealingConsole.Language.GetLanguage", exception.ToString(), System.Diagnostics.EventLogEntryType.Error);
            }
            return language;
        }

        public static void BindDataListForLanguage(DropDownList dropDownList, CultureInfo sesstionCultureInfo)
        {
            string selectedValue = string.Empty;
            LanguageManager.CultureInfo = (sesstionCultureInfo == null) ? new CultureInfo("en") : sesstionCultureInfo;
            if (LanguageManager.CultureInfo != null && (LanguageManager.CultureInfo.LCID.ToString() != dropDownList.SelectedValue))
            {
                selectedValue = (dropDownList.SelectedValue == string.Empty) ? LanguageManager.CultureInfo.LCID.ToString() : dropDownList.SelectedValue;
            }

            dropDownList.Items.Clear();
            ListItem listItem = new ListItem("English", new CultureInfo("en").LCID.ToString());
            dropDownList.Items.Add(listItem);
            listItem = new ListItem("繁體中文", new CultureInfo("zh-CHT").LCID.ToString());
            dropDownList.Items.Add(listItem);
            listItem = new ListItem("简体中文", new CultureInfo("zh-CHS").LCID.ToString());
            dropDownList.Items.Add(listItem);

            if (selectedValue != string.Empty)
            {
                if (dropDownList.Items.FindByValue(selectedValue) != null)
                {
                    dropDownList.SelectedValue = selectedValue;
                }
            }
        }
    }

    public class LanguageManager
    { 
        private static CultureInfo _CultureInfo = null;

        public static string LanguageXml
        {
            get
            {
                if (LanguageManager._CultureInfo == null) return "Language.xml";
                if (LanguageManager._CultureInfo.LCID == (new CultureInfo("zh-CHT")).LCID)
                {
                    return "Language.zh-CHT.xml";
                }
                else if (LanguageManager._CultureInfo.LCID == (new CultureInfo("zh-CHS")).LCID)
                {
                    return "Language.zh-CHS.xml";
                }
                return "/Language.xml";
            }
        }

        public static CultureInfo CultureInfo
        {
            get { return LanguageManager._CultureInfo; }
            set { LanguageManager._CultureInfo = value; }
        }

        public static void SetCurrentUICulture()
        {
            if (LanguageManager._CultureInfo == null)
            {
                LanguageManager._CultureInfo = LanguageManager.GetDefaultCultureInfo();
            }
            Thread.CurrentThread.CurrentUICulture = LanguageManager._CultureInfo;

            LanguageManager.SaveCultureInfo();
        }
        public static CultureInfo GetDefaultCultureInfo()
        {
            //若存盘则默认值将从Database获取, 用Common.Get_UserID获取LanguageManager._CultureInfo.LCID
            return new CultureInfo("en");
        }
        private static void SaveCultureInfo()
        {
            //是否要存盘? Common.Get_UserID, LanguageManager._CultureInfo.LCID
            //...
        }
    }
}