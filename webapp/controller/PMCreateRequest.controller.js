<<<<<<< HEAD
=======
sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"sap/m/MessageBox",
		"sap/ui/core/Fragment",
		"sap/ui/Device",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	],

	function (BaseController, JSONModel, History, MessageBox, Fragment, Device, Filter, FilterOperator) {
		"use strict";
		return BaseController.extend("com.swcc.Template.controller.PMCreateRequest", {

			onInit: function () {

				this.oRouter = this.getRouter();
				this.getRouter().getRoute("PMCreateServiceRequest").attachPatternMatched(this._onObjectMatched, this);

			},
			_onObjectMatched: function () {
				debugger;
				this._createItemDataModel();
				this.PlantF4();
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local),
					sServiceProductLocalVal = oStorage.get("sSubServiceType");
				var sServiceProduct = sServiceProductLocalVal.split("_")[0];
				var sServiceDescription = sServiceProductLocalVal.split("_")[1];
				var sBaseUnit = sServiceProductLocalVal.split("_")[3];
				this.getModel().setProperty("/PMCreateRequest/Header/Material", sServiceProduct);
				this.getModel().setProperty("/ServiceDescription", sServiceDescription);
				this.getModel().setProperty("/PMCreateRequest/CustomDisplayData/BaseUnit", sBaseUnit);

			},
			_createItemDataModel: function () {
				this.getModel().setData({
					busy: false,
					PMCreateRequest: {
						UploadedData: [],
						Header: {},
						CustomDisplayData: {},
						Attachment: [],
						PlantF4: [],
						WorkCenterF4: []
					}
				});
			},

			PlantF4: function () {
				this.getModel().setProperty("/busy", true);
				this.CallValueHelpAPI('/A_Plant/')
					.then(function (oResponse) {
						this.getModel().setProperty("/busy", false);
						this.getModel().setProperty("/PMCreateRequest/PlantF4/", oResponse.results);
					}.bind(this)).catch(function (error) {
						this.getModel().setProperty("/busy", false);
						MessageBox.error(error.responseText);
					}.bind(this));

			},

			WorkCenterF4: function (sKey) {
				var filters = [{
						path: "Plant",
						value: sKey,
						group: "WorkCntrFilter"
					}, {
						path: "ServiceProduct",
						value: this.getModel().getProperty("/PMCreateRequest/Header/Material"),
						group: "WorkCntrFilter"
					}

				];

				var dynamicFilters = this.getFilters(filters);
				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataACRUDAPICall(
					this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"),
					'GET',
					'/ZCDSV_WORKCENTERVH',
					null,
					dynamicFilters.WorkCntrFilter,
					null
				).then(function (oResponse) {

					this.getModel().setProperty("/PMCreateRequest/WorkCenterF4/", oResponse.results);
					this.getModel().setProperty("/busy", false);

				}.bind(this)).catch(function (error) {
					MessageBox.error(error.responseText);
					this.getModel().setProperty("/busy", false);
				}.bind(this));
			},
			onSelectPlant: function (oEve) {
				var sKey = oEve.getSource().getSelectedKey();
				this.WorkCenterF4(sKey);

			},
			onCheckPlantVal: function (oEve) {

				oEve.getSource().getSelectedKey() === "" ? oEve.getSource().setValue(null) : "";

			},

			onValueHelpRequest: async function (oEvent) {
				try {
					const sPlantFilter = new sap.ui.model.Filter({
						path: "MaintenancePlanningPlant",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: this.getModel().getProperty("/PMCreateRequest/Header/Plant/")
					});

				var aCols = this.oColModel.getData().cols;

				this._oValueHelpDialog = sap.ui.xmlfragment(
					"com.swcc.Template.fragments.PMModule.EquipmentF4",
					this
				);
				this.getView().addDependent(this._oValueHelpDialog);

				this._oValueHelpDialog.getTableAsync().then(
					function (oTable) {
						//		oTable.setModel(this.oProductsModel);
						oTable.setModel(this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"));
						oTable.setModel(this.oColModel, "columns");

						if (oTable.bindRows) {
							oTable.bindAggregation("rows", {
								path: "/ZCDSV_EQUIPMENTVH",
								events: {
									dataReceived: function () {
										this._oValueHelpDialog.update();
									}.bind(this)
								}
							})
						}

						if (oTable.bindItems) {
							oTable.bindAggregation("items", "/ZCDSV_EQUIPMENTVH", function () {
								return new sap.m.ColumnListItem({
									cells: aCols.map(function (column) {
										return new sap.m.Label({
											text: "{" + column.template + "}",
										});
									}),
								});
							});
						}
						oTable.setSelectionMode("Single");
						this._oValueHelpDialog.update();
					}.bind(this)
				);

				//	this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
				this._oValueHelpDialog.open();
			},
			onValueHelpOkPress: function (oEvent) {
				var oData = [];
				var xUnique = new Set();
				var aTokens = oEvent.getParameter("tokens");

				aTokens.forEach(function (ele) {
					if (xUnique.has(ele.getKey()) == false) {
						oData.push({
							EquipmentName: ele.getText(),
							Equipment: ele.getKey(),
						});
						xUnique.add(ele.getKey());
					}
				});
				//  this._oMultiInput.setTokens(aTokens);
				this.getModel().setProperty("/PMCreateRequest/Header/Equipment/", oData[0].EquipmentName);
				this._oValueHelpDialog.close();
			},

			onValueHelpAfterOpen: function () {

				//   apply filter before value help open 
				var aFilter = this._getfilterforControl();
				this._filterTable(aFilter, "Control");
			},
			_getfilterforControl: function () {
				debugger;
				if (!this.getModel().getProperty("/PMCreateRequest/Header/Plant/")) {
					return [];

				}

				var filters = [{
						path: "MaintenancePlanningPlant",
						value: this.getModel().getProperty("/PMCreateRequest/Header/Plant/"),
						group: "PlantFilter"
					}

				];

				var dynamicFilters = this.getFilters(filters);
				if ((dynamicFilters.length == 0)) {
					return [];
				}
				return new Filter({
					filters: dynamicFilters.PlantFilter,
					and: true,
				});

				//	return dynamicFilters.PlantFilter;
			},

			_filterTable: function (oFilter, sType) {
				var oValueHelpDialog = this._oValueHelpDialog;

				oValueHelpDialog.getTableAsync().then(function (oTable) {
					if (oTable.bindRows) {
						oTable.getBinding("rows").filter(oFilter, sType || "Application");
					}

					if (oTable.bindItems) {
						oTable
							.getBinding("items")
							.filter(oFilter, sType || "Application");
					}

					oValueHelpDialog.update();
				});
			},

			onSearchEquipment: function (oEvent) {
				var sValue = oEvent.getParameter("value");
				var oFilter = new sap.ui.model.Filter(
					[
						new sap.ui.model.Filter({
							path: "Equipment",
							operator: "Contains",
							value1: sValue.trim()
						})
					],
					false
				);

				oEvent.getSource().getBinding("items").filter([oFilter]);
			},
			PMCreateaRequestAPI: function (oPayload) {
				var oPayload = this.getModel().getProperty("/PMCreateRequest/Header/");
				oPayload.Username = "WT_POWER";
				oPayload.ServiceHeadertoItem = [];
				const aUploadData = this.getModel().getProperty("/PMCreateRequest/UploadedData").map(({
					Filesize,
					...rest
				}) => rest);
				oPayload.Attachments = aUploadData;
				debugger;
				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataACRUDAPICall(this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"), 'POST', '/ServNotificationSet',
						oPayload)
					.then(function (oResponse) {
						this._handleMessageBoxProceed(`Service Request has been created : ${oResponse.Notificat} `);
						this.getModel().setProperty("/PMCreateRequest/Header", oResponse.results);
						this.getModel().setProperty("/busy", false);
					}.bind(this)).catch(function (error) {
						MessageBox.error(error.responseText);
						this.getModel().setProperty("/busy", false);
					}.bind(this));

			},
			_handleMessageBoxProceed: function (sMessage) {
				var params = {
					sMessage: sMessage
				};

				this.createMessageBoxHandler(this.onPresshomepage.bind(this))(params);

			},
			onPresshomepage: function () {
				this.getOwnerComponent().getRouter().navTo("HomePage");
			},
			handleBackPress: function () {
				var oHistory, sPreviousHash;
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("ModuleSelect", {}, true);
				}
			},
			onCancel: function () {
				var oHistory, sPreviousHash;
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("ModuleSelect", {}, true);
				}
			},
			onSaveRequest: function () {
				debugger;
				var oPayload = this.getModel().getProperty("/PMCreateRequest/Header/");
				this.PMCreateaRequestAPI(oPayload);

			},
			onback: function () {
				this.getOwnerComponent().getTargets().display("ModuleSelect");

			},
			onProceed: function () {

				this._handleMessageBoxProceed("Your Service Request has been generated : 1945676");
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

							that.getRouter().navTo("HomePage", {}, true);
						}
					},
				});

			},
			onAddItemsPress: function (oEvent) {
				var oModel = this.getModel().getProperty("/MarineTransportation/itemData");
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
				this.getModel().setProperty("/MarineTransportation/itemData", oItems);

			},
			onDeleteItemPress: function (oEvent) {
				var iRowNumberToDelete = parseInt(oEvent.getSource().getBindingContext().getPath().split("/")[3]);
				var aTableData = this.getModel().getProperty("/MarineTransportation/itemData");
				aTableData.splice(iRowNumberToDelete, 1);
				this.getModel().refresh();
			},
			onFileAdded: function (oEvent) {
				debugger;
				var that = this;
				var oFileUploader = oEvent.getSource();
				var aFiles = oEvent.getParameter("files");

				if (aFiles.length === 0)
					return;

				var Filename = aFiles[0].name,
					Filetype = aFiles[0].type,
					Filedata = aFiles[0],
					Filesize = aFiles[0].size;

				//code for base64/binary array 
				this._getImageData((Filedata), function (Filecontent) {
					that._addData(Filecontent, Filename, Filetype, Filesize);
				});
				// var oUploadSet = this.byId("UploadSet");
				// oUploadSet.getDefaultFileUploader().setEnabled(false);

			},
			_getImageData: function (url, callback, fileName) {
				var reader = new FileReader();

				reader.onloadend = function (evt) {
					if (evt.target.readyState === FileReader.DONE) {

						var binaryString = evt.target.result,
							base64file = btoa(binaryString);

						callback(base64file);
					}
				};
				reader.readAsBinaryString(url);
			},
			_addData: function (Filecontent, Filename, Filetype, Filesize) {

				debugger;
				var oModel = this.getModel().getProperty("/PMCreateRequest/UploadedData");
				var oItems = oModel.map(function (oItem) {
					return Object.assign({}, oItem);
				});
				oItems.push({
					Filename: Filename,
					Mimetype: Filetype,
					Value: Filecontent,
					//Filesize: Filesize

				});
				this.getModel().setProperty("/PMCreateRequest/UploadedData", oItems);

			},
			handleMissmatch: function () {
				this.handleFileMissmatch();
			},
			onFileSizeExceed: function () {

				this.handleFileSizeExceed();
			}
		})
	})
>>>>>>> refs/remotes/origin/feature/srikanth
