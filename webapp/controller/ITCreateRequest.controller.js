sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"sap/m/MessageBox"
	],

	function (BaseController, JSONModel, History, MessageBox) {
		"use strict";
		return BaseController.extend("com.swcc.Template.controller.ITCreateRequest", {
			onInit: function () {

				this.oRouter = this.getRouter();
				this.getRouter().getRoute("ITCreateRequest").attachPatternMatched(this._onObjectMatched, this);

			},
			_onObjectMatched: function () {
				debugger;
				this._createItemDataModel();
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local),
					sServiceProductLocalVal = oStorage.get("sSubServiceType");
				var sServiceProduct = sServiceProductLocalVal.split("_")[0];
				var sServiceDescription = sServiceProductLocalVal.split("_")[1];
				this.getModel().setProperty("/ITAppVisible/", sServiceProduct);
				this.getModel().setProperty("/ServiceDescription", sServiceDescription);

			},
			_createItemDataModel: function () {
				this.getModel().setData({
					busy: false,
					recognitionAlreadyStarted: false,

					ITProcurement: {
						Header: {},
						itemData: []
					}
				});
			},
			handleBackPress: function () {
				this.navigationBack();

			},

			onback: function () {
				this.getOwnerComponent().getTargets().display("LandingView");

			},
			onProceed: function () {
				//	this.getOwnerComponent().getTargets().display("DetailView");
				this._handleMessageBoxProceed("Your Service Request has been generated : 12111099");
			},

			_handleMessageBoxProceed: function (sMessage) {
				var that = this;
				sap.m.MessageBox.success(sMessage, {
					icon: MessageBox.Icon.SUCCESS,
					title: "Success",
					actions: [MessageBox.Action.OK],
					emphasizedAction: MessageBox.Action.YES,
					onClose: function (oAction) {
						if (oAction == "OK") {

							that.getRouter().navTo("FinanceRequestView", {}, true);
						}
					},
				});

			},
			onAddItemsPress: function (oEvent) {
				var oModel = this.getModel().getProperty("/ITProcurement/itemData");
				var oItems = oModel.map(function (oItem) {
					return Object.assign({}, oItem);
				});
				oItems.push({
					Material: "",
					Description: "",
					StorageLocation: "",
					Quantity: "",
					BaseUnit: "",
					Batch: "",
					M: true,
					// UnloadPoint: "",
					AvailableQty: null,
					PopupItems: null,
					IsBOQApplicable: ""
				});
				this.getModel().setProperty("/ITProcurement/itemData", oItems);

			},
			onDeleteItemPress: function (oEvent) {
				var iRowNumberToDelete = parseInt(oEvent.getSource().getBindingContext().getPath().split("/")[3]);
				var aTableData = this.getModel().getProperty("/ITProcurement/itemData");
				aTableData.splice(iRowNumberToDelete, 1);
				this.getModel().refresh();
			},
			onProceed: function () {
				this.getOwnerComponent().getTargets().display("HRRequest");
			},

			onSearch: function () {

				this.oRouter.navTo("LandingView");

			}
		})
	})