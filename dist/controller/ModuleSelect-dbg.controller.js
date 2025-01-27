sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"sap/m/MessageBox"
	],

	function (BaseController, JSONModel, History, MessageBox) {
		"use strict";
		return BaseController.extend("com.swcc.Template.controller.ModuleSelect", {
			onInit: function () {

				this.oRouter = this.getRouter();
				this.getRouter().getRoute("ModuleSelect").attachPatternMatched(this._onObjectMatched, this);

			},
			_onObjectMatched: function (oEve) {
				this._createHeaderModel();

				var sUrlOrderID = oEve.getParameter("arguments").orderId,
					param2 = oEve.getParameter("arguments").param2,
					sUrlOrderID = sUrlOrderID ? this.handleRedirection(sUrlOrderID, param2) : this.handleNormalFlow();

			},
			handleRedirection: function (param1, param2) {
				this.handleSetLocalStaorage("OrderID", param1);
				this.handleSetLocalStaorage("EquipmentNo", param2);
				this.byId("idService").setSelectedKey("ZSSM");
				this.getServiceTypeDD();

			},
			handleNormalFlow: function () {
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
				var sModuleType = oStorage.get("sMouleType");
				this.handleSetLocalStaorage("OrderID", "");
				this.handleSetLocalStaorage("EquipmentNo", "");
				this.byId("idService").setSelectedKey(sModuleType);
				this.getServiceTypeDD();
			},

			_createHeaderModel: function () {
				this.getModel().setData({
					busy: false,
					ModuleSearch: {
						Header: {},
						SelectServiceType: [],
						SelectSubServiceType: []
					}
				});
			},
			getServiceTypeDD: function () {

				var filters = [{
						path: "ProductType",
						value: this.byId("idService").getSelectedKey(),
						group: "ServiceTypeFilter"
					}

				];
				// Define your sorting parameters
				var sortParams = [{
					sPath: "ProductGroup", // Replace with your actual property
					bDescending: false // true for descending, false for ascending
				}];
				var dynamicFilters = this.getFilters(filters);

				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataACRUDAPICall(this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"), 'GET', '/ZCDSV_PRODUCTTYPEVH/', null,
						dynamicFilters.ServiceTypeFilter, null, sortParams)
					.then(function (oResponse) {
						this.getModel().setProperty("/ModuleSearch/SelectServiceType/", oResponse.results);
						this.getModel().setProperty("/busy", false);
					}.bind(this)).catch(function (error) {
						// 		MessageBox.error(error.responseText);
						this._handleError(error);
						this.getModel().setProperty("/busy", false);
					}.bind(this));

			},
			onSelectServiceTypeDD: function () {

				var filters = [{
						path: "ProductGroup",
						value: this.getModel().getProperty("/ModuleSearch/Header/ServiceTypeKey/"),
						group: "ServiceTypeFilter"
					}

				];
				// Define your sorting parameters
				var sortParams = [{
					sPath: "Product", // Replace with your actual property
					bDescending: false // true for descending, false for ascending
				}];
				var dynamicFilters = this.getFilters(filters);

				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataACRUDAPICall(this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"), 'GET', '/ZCDSV_SUBSERVICEVH/', null,
						dynamicFilters.ServiceTypeFilter, null, sortParams)
					.then(function (oResponse) {
						this.getModel().setProperty("/ModuleSearch/SelectSubServiceType/", oResponse.results);
						this.getModel().setProperty("/busy", false);

					}.bind(this)).catch(function (error) {
						// 		MessageBox.error(error.responseText);
						this._handleError(error);
						this.getModel().setProperty("/busy", false);
					}.bind(this));
			},

			handleBackPress: function () {
				var oHistory, sPreviousHash;
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("AppHomePage", {}, true);
				}

			},
			handleBackHomePress: function () {
				this.getRouter().navTo("HomePage", {}, true);
			},

			onSearch: function () {

				this.InputValidation() !== true ?
					"" : this.onNavigation();

				// this.getModel().setProperty("/VisibleManagePttyCash", true);
				// this.getModel().setProperty("/VisibleRecordProcessInvoice", true);

			},

			onNavigation: function () {
				var sSubServiveType = this.getModel().getProperty("/ModuleSearch/Header/SUbServiceKey/");
				this.setDataLocalStaorage(sSubServiveType);
				this.getModel().setProperty("/ServiceProduct/", sSubServiveType);
				var sModuleType = this.byId("idService").getSelectedKey();
				var sTargetRoute = sModuleType === "ZSSH" ? "HRCreateRequest" : sModuleType === "ZSSI" ? "ITCreateRequest" : sModuleType ===
					"ZSSF" ?
					"FinanceCreateRequest" : sModuleType === "ZSSS" ?
					"SCMCreateRequest" :
					sModuleType === "ZSSM" ? "PMCreateServiceRequest" : "";

				this.oRouter.navTo(sTargetRoute);
			},
			InputValidation: function () {
				var bValid = true;
				if (!this.getModel().getProperty("/ModuleSearch/Header/ServiceTypeKey/")) {
					this.getModel().setProperty("/ModuleSearch/Header/ServiceTypeKey/", "")

					bValid = false;
				}

				if (!this.getModel().getProperty("/ModuleSearch/Header/SUbServiceKey/")) {
					this.getModel().setProperty("/ModuleSearch/Header/SUbServiceKey/", "")

					bValid = false;
				}
				return bValid;
			},

			setDataLocalStaorage: function (sVal) {
				// Get access to local storage
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

				// Define your data object
				// var payloadObject = {
				// 	"UserName": "JohnDoe123",
				// 	"P2_Represen": "JaneSmith456",
				// 	"P2_Rep_Pos": "Representative",
				// 	"P2_CorName": "CorporationX",
				// 	// ... rest of your payload
				// };

				// Convert the object to string before storing
				//		var jsonString = JSON.stringify(payloadObject);

				// Store the data
				oStorage.put("sSubServiceType", sVal);

				// Retrieve the data
				//	var retrievedData = oStorage.get("myDataKey");

				// If you want to parse the retrieved data back to an object
				// if (retrievedData) {
				// 	var parsedData = JSON.parse(retrievedData);
				// 	// Use the parsedData object as needed
				// }
			},
			onSelectSubServiceTypeDD: function (oEve) {
				var sKey = oEve.getSource().getSelectedKey();
				var sDesc = sKey.split("_")[2],
					sDesc = sDesc === "" ? "" : sDesc;

				this.getModel().setProperty("/ModuleSearch/Header/Desc/", sDesc);
				this.getModel().setProperty("/ModuleSearch/Header/SLA/", sKey.split("_")[4]);
				this.getModel().setProperty("/ModuleSearch/Header/Price/", sKey.split("_")[5]);

			}

		})
	})