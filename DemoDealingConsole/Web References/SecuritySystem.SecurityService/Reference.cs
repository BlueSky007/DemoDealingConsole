﻿//------------------------------------------------------------------------------
// <autogenerated>
//     This code was generated by a tool.
//     Runtime Version: 1.0.3705.288
//
//     Changes to this file may cause incorrect behavior and will be lost if 
//     the code is regenerated.
// </autogenerated>
//------------------------------------------------------------------------------

// 
// This source code was auto-generated by Microsoft.VSDesigner, Version 1.0.3705.288.
// 
namespace iExchange.DealingConsole.SecurityServices
{
	using System.Diagnostics;
	using System.Xml.Serialization;
	using System;
	using System.Web.Services.Protocols;
	using System.ComponentModel;
	using System.Web.Services;


	/// <remarks/>
	[System.Diagnostics.DebuggerStepThroughAttribute()]
	[System.ComponentModel.DesignerCategoryAttribute("code")]
	[System.Web.Services.WebServiceBindingAttribute(Name = "SecurityServicesSoap", Namespace = "http://tempuri.org/")]
	public class SecurityServices : System.Web.Services.Protocols.SoapHttpClientProtocol
	{

		/// <remarks/>
		public SecurityServices()
		{
			string urlSetting = System.Configuration.ConfigurationSettings.AppSettings["iExchange.DealingConsole.SecurityServices.SecurityServices"];
			if ((urlSetting != null))
			{
				this.Url = string.Concat(urlSetting, "");
			}
			else
			{
				this.Url = "http://webserver/SecuritySystem/Web/Service/SecurityServices.asmx";
			}
		}

		/// <remarks/>
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetRequestPermissionSettingSchma", RequestNamespace = "http://tempuri.org/", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		public System.Data.DataSet GetRequestPermissionSettingSchma(System.Guid loginUserID)
		{
			object[] results = this.Invoke("GetRequestPermissionSettingSchma", new object[] {
                        loginUserID});
			return ((System.Data.DataSet)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginGetRequestPermissionSettingSchma(System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("GetRequestPermissionSettingSchma", new object[] {
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public System.Data.DataSet EndGetRequestPermissionSettingSchma(System.IAsyncResult asyncResult)
		{
			object[] results = this.EndInvoke(asyncResult);
			return ((System.Data.DataSet)(results[0]));
		}

		/// <remarks/>
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetPermissionSettingByParticipant", RequestElementName = "GetPermissionSettingByParticipant", RequestNamespace = "http://tempuri.org/", ResponseElementName = "GetPermissionSettingByParticipantResponse", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		[return: System.Xml.Serialization.XmlElementAttribute("GetPermissionSettingByParticipantResult")]
		public System.Data.DataSet GetPermissionSetting(System.Guid participantID, string participantName, System.Guid loginUserID)
		{
			object[] results = this.Invoke("GetPermissionSetting", new object[] {
                        participantID,
                        participantName,
                        loginUserID});
			return ((System.Data.DataSet)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginGetPermissionSetting(System.Guid participantID, string participantName, System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("GetPermissionSetting", new object[] {
                        participantID,
                        participantName,
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public System.Data.DataSet EndGetPermissionSetting(System.IAsyncResult asyncResult)
		{
			object[] results = this.EndInvoke(asyncResult);
			return ((System.Data.DataSet)(results[0]));
		}

		/// <remarks/>
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetPermissionSettingByObjectID", RequestNamespace = "http://tempuri.org/", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		public System.Data.DataSet GetPermissionSettingByObjectID(System.Guid objectID, System.Guid loginUserID)
		{
			object[] results = this.Invoke("GetPermissionSettingByObjectID", new object[] {
                        objectID,
                        loginUserID});
			return ((System.Data.DataSet)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginGetPermissionSettingByObjectID(System.Guid objectID, System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("GetPermissionSettingByObjectID", new object[] {
                        objectID,
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public System.Data.DataSet EndGetPermissionSettingByObjectID(System.IAsyncResult asyncResult)
		{
			object[] results = this.EndInvoke(asyncResult);
			return ((System.Data.DataSet)(results[0]));
		}

		/// <remarks/>
		[System.Web.Services.WebMethodAttribute(MessageName = "GetPermissionSetting1")]
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetPermissionSetting", RequestElementName = "GetPermissionSetting", RequestNamespace = "http://tempuri.org/", ResponseElementName = "GetPermissionSettingResponse", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		[return: System.Xml.Serialization.XmlElementAttribute("GetPermissionSettingResult")]
		public System.Data.DataSet GetPermissionSetting(System.Guid participantID, System.Guid objectID, string participantName, System.Guid loginUserID)
		{
			object[] results = this.Invoke("GetPermissionSetting1", new object[] {
                        participantID,
                        objectID,
                        participantName,
                        loginUserID});
			return ((System.Data.DataSet)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginGetPermissionSetting1(System.Guid participantID, System.Guid objectID, string participantName, System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("GetPermissionSetting1", new object[] {
                        participantID,
                        objectID,
                        participantName,
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public System.Data.DataSet EndGetPermissionSetting1(System.IAsyncResult asyncResult)
		{
			object[] results = this.EndInvoke(asyncResult);
			return ((System.Data.DataSet)(results[0]));
		}

		/// <remarks/>
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/UpdatePermissionSettingByDataSet", RequestElementName = "UpdatePermissionSettingByDataSet", RequestNamespace = "http://tempuri.org/", ResponseElementName = "UpdatePermissionSettingByDataSetResponse", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		[return: System.Xml.Serialization.XmlElementAttribute("UpdatePermissionSettingByDataSetResult")]
		public bool UpdatePermissionSetting(System.Data.DataSet permissionSettings, System.Guid loginUserID, out string message)
		{
			object[] results = this.Invoke("UpdatePermissionSetting", new object[] {
                        permissionSettings,
                        loginUserID});
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginUpdatePermissionSetting(System.Data.DataSet permissionSettings, System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("UpdatePermissionSetting", new object[] {
                        permissionSettings,
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public bool EndUpdatePermissionSetting(System.IAsyncResult asyncResult, out string message)
		{
			object[] results = this.EndInvoke(asyncResult);
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/CreatePermissionSetting", RequestNamespace = "http://tempuri.org/", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		public bool CreatePermissionSetting(System.Guid participantID, System.Guid objectID, System.Guid permissionID, string participantName, string permissionName, string setting, System.Guid loginUserID, out string message)
		{
			object[] results = this.Invoke("CreatePermissionSetting", new object[] {
                        participantID,
                        objectID,
                        permissionID,
                        participantName,
                        permissionName,
                        setting,
                        loginUserID});
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginCreatePermissionSetting(System.Guid participantID, System.Guid objectID, System.Guid permissionID, string participantName, string permissionName, string setting, System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("CreatePermissionSetting", new object[] {
                        participantID,
                        objectID,
                        permissionID,
                        participantName,
                        permissionName,
                        setting,
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public bool EndCreatePermissionSetting(System.IAsyncResult asyncResult, out string message)
		{
			object[] results = this.EndInvoke(asyncResult);
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		[System.Web.Services.WebMethodAttribute(MessageName = "UpdatePermissionSetting1")]
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/UpdatePermissionSetting", RequestElementName = "UpdatePermissionSetting", RequestNamespace = "http://tempuri.org/", ResponseElementName = "UpdatePermissionSettingResponse", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		[return: System.Xml.Serialization.XmlElementAttribute("UpdatePermissionSettingResult")]
		public bool UpdatePermissionSetting(System.Guid participantID, System.Guid objectID, System.Guid permissionID, string participantName, string permissionName, string setting, System.Guid loginUserID, out string message)
		{
			object[] results = this.Invoke("UpdatePermissionSetting1", new object[] {
                        participantID,
                        objectID,
                        permissionID,
                        participantName,
                        permissionName,
                        setting,
                        loginUserID});
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginUpdatePermissionSetting1(System.Guid participantID, System.Guid objectID, System.Guid permissionID, string participantName, string permissionName, string setting, System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("UpdatePermissionSetting1", new object[] {
                        participantID,
                        objectID,
                        permissionID,
                        participantName,
                        permissionName,
                        setting,
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public bool EndUpdatePermissionSetting1(System.IAsyncResult asyncResult, out string message)
		{
			object[] results = this.EndInvoke(asyncResult);
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/DeletePermissionSetting", RequestNamespace = "http://tempuri.org/", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		public bool DeletePermissionSetting(System.Guid participantID, System.Guid objectID, System.Guid permissionID, string participantName, string permissionName, System.Guid loginUserID, out string message)
		{
			object[] results = this.Invoke("DeletePermissionSetting", new object[] {
                        participantID,
                        objectID,
                        permissionID,
                        participantName,
                        permissionName,
                        loginUserID});
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginDeletePermissionSetting(System.Guid participantID, System.Guid objectID, System.Guid permissionID, string participantName, string permissionName, System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("DeletePermissionSetting", new object[] {
                        participantID,
                        objectID,
                        permissionID,
                        participantName,
                        permissionName,
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public bool EndDeletePermissionSetting(System.IAsyncResult asyncResult, out string message)
		{
			object[] results = this.EndInvoke(asyncResult);
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/CheckPermission", RequestNamespace = "http://tempuri.org/", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		public bool CheckPermission(System.Guid participantID, System.Guid objectID, System.Guid permissionID, string permissionName, string participantName, System.Guid loginUserID, out string message)
		{
			object[] results = this.Invoke("CheckPermission", new object[] {
                        participantID,
                        objectID,
                        permissionID,
                        permissionName,
                        participantName,
                        loginUserID});
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginCheckPermission(System.Guid participantID, System.Guid objectID, System.Guid permissionID, string permissionName, string participantName, System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("CheckPermission", new object[] {
                        participantID,
                        objectID,
                        permissionID,
                        permissionName,
                        participantName,
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public bool EndCheckPermission(System.IAsyncResult asyncResult, out string message)
		{
			object[] results = this.EndInvoke(asyncResult);
			message = ((string)(results[1]));
			return ((bool)(results[0]));
		}

		/// <remarks/>
		[System.Web.Services.WebMethodAttribute(MessageName = "CheckPermission1")]
		[System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/CheckPermissionByDataSet", RequestElementName = "CheckPermissionByDataSet", RequestNamespace = "http://tempuri.org/", ResponseElementName = "CheckPermissionByDataSetResponse", ResponseNamespace = "http://tempuri.org/", Use = System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle = System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
		[return: System.Xml.Serialization.XmlElementAttribute("CheckPermissionByDataSetResult")]
		public System.Data.DataSet CheckPermission(System.Data.DataSet permissionSettings, System.Guid loginUserID)
		{
			object[] results = this.Invoke("CheckPermission1", new object[] {
                        permissionSettings,
                        loginUserID});
			return ((System.Data.DataSet)(results[0]));
		}

		/// <remarks/>
		public System.IAsyncResult BeginCheckPermission1(System.Data.DataSet permissionSettings, System.Guid loginUserID, System.AsyncCallback callback, object asyncState)
		{
			return this.BeginInvoke("CheckPermission1", new object[] {
                        permissionSettings,
                        loginUserID}, callback, asyncState);
		}

		/// <remarks/>
		public System.Data.DataSet EndCheckPermission1(System.IAsyncResult asyncResult)
		{
			object[] results = this.EndInvoke(asyncResult);
			return ((System.Data.DataSet)(results[0]));
		}
	}
}
