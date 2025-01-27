sap.ui.define([
		"./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"sap/m/MessageBox",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/m/MessageToast"
	],

	function (BaseController, JSONModel, History, MessageBox, Filter, FilterOperator, MessageToast) {
		"use strict";
		return BaseController.extend("com.swcc.Template.controller.FinaceCreateRequest", {
			onInit: function () {

				this.oRouter = this.getRouter();
				this.getRouter().getRoute("FinanceCreateRequest").attachPatternMatched(this._onObjectMatched, this);

			},
			_onObjectMatched: function () {
				//var sValue = jQuery.sap.getUriParameters().get("param");

				this._createItemDataModel();
				this.getModel().setSizeLimit(1000);
				var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local),
					sServiceProductLocalVal = oStorage.get("sSubServiceType");
				var sServiceProduct = sServiceProductLocalVal.split("_")[0];
				var sServiceDescription = sServiceProductLocalVal.split("_")[1];
				this.getModel().setProperty("/FinanceAppVisible/", sServiceProduct);
				// this.getModel().setProperty("/PMCreateRequest/Header/Material", sServiceProduct);
				this.getModel().setProperty("/ServiceDescription", sServiceDescription);
				var sUserPlant = this.handlegetlocalStorage("userPlant");
				this.getModel().setProperty("/PlantF4", sUserPlant);

			},
			_createItemDataModel: function () {
				this.getModel().setData({
					busy: false,
					FinanceAppVisible: null,
					CompanycodeF4: "1000- SWCC",
					PlantF4: "",
					DepreciationF4: "01- Book Depreciation IFRS - Local (01)",
					PostingF4: "1000- SWCC posting Period (1000)",
					CurrencytypeF4: "10- Company code currency (10)",
					LedgerF4: "0L- Leading Ledger (0L)",
					ChartofaccountF4: "1000- SWCC Chart of Account(1000)",
					LanguageF4: "EN- English (EN)",
					FmareaF4: "1000- SWCC (1000)",
					InsuranceF4: null,
					Assestsupernumber: "",
					CashJournalF4: "",
					GLAccountf4: "",
					UploadedData: [],
					ManagePettyCashData: {
						Header: {
							CompanyCode: "1000"
						},
						itemData: []
					},
					FinancialReviewGeneralClose: {

						FinancialClose: {
							Header: {
								PostPerVariant: "1000",
								quantity: "1"
							},
							ItemData: []
						},
						PeriodEndReconcilation: {
							Header: {
								quantity: "1",
								GLAccount: ""
							},
							ItemData: []
						},
						PrepareReviewTrail: {
							Header: {
								quantity: "1",
								ChartOfAccounts: "1000",
								CurrencyRole: 10,
								Ledger: "0L",
								GLAccount: "",
								CompanyCode: "1000"
							},
							ItemData: []
						},
						IssueFinancialStatement: {
							Header: {
								quantity: "1",
								ChartOfAccounts: "1000",
								CurrencyRole: 10,
								Ledger: "0L",
								GLAccount: "",
								LanguageCode: "EN",
								CompanyCode: "1000"
							},
							ItemData: []
						},
						MaintainChart: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"
							},
							ItemData: []
						},
						IssueGovernment: {
							Header: {
								quantity: "1",
								FinancialManagementArea: "1000"

							},
							ItemData: []
						},
					},
					AssetLifecycle: {
						DepreciationProcess: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							ItemData: []
						},
						PerfomAsset: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							ItemData: []
						},
						RecordAsset: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							ItemData: []
						},
						SaleofAssets: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							ItemData: []
						},
						RetirementofAssets: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							ItemData: []
						},
						TransferofAssets: {
							Header: {
								quantity: "1",
								CompanyCode: "1000",
								SubNumber: 0

							},
							ItemData: []
						},
						ProjectCaptilization: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							ItemData: []
						},

					},
					AccountsReceivable: {
						Manageandprocess: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							itemData: []
						},
						Billing: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							itemData: []
						},

					},
					InsuranceandClaim: {
						CreateInsurance: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							ItemData: []
						},
						MarineTransportation: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							itemData: [],
							NewClaimItemData: []
						},
						ShipHulls: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							itemData: [],
							NewClaimItemData: []
						},
						Vehicle: {
							Header: {

								CompanyCode: "1000"

							},
							CarDetails: {},
							itemData: [],
							NewClaimItemData: []
						},
						Property: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							itemData: [],
							NewClaimItemData: []
						}

					},
					AccountPayable: {
						RecordProcess: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							itemData: []
						},
						ManagePettyCash: {
							Header: {
								quantity: "1",
								CompanyCode: "1000"

							},
							itemData: []
						},

					},
					RecordandProcessInvoice: {
						itemData: []
					}
				});
			},

			/* Value help request */
			onValueHelpRequest: function (oEve) {
				debugger;
				var iIndex = oEve.getSource().getBindingContext() ? parseInt(oEve.getSource().getBindingContext().getPath().split("/")[3]) : "";
				this.getModel().setProperty("/itemIndex", iIndex);
				var sValuehelpCheck = this.handleItemValuehelps(iIndex, oEve.getSource().getAriaLabelledBy()[0].split("-")[6]);
				this.getModel().setProperty("/valueHelpName", oEve.getSource().getAriaLabelledBy()[0].split("-")[6]);
				var sEntity = oEve.getSource().getAriaLabelledBy()[0].split("-")[3];
				var sEntityPath = oEve.getSource().getAriaLabelledBy()[0].split("-")[4];
				var sFragName = oEve.getSource().getAriaLabelledBy()[0].split("-")[5];
				var sFragModel = sValuehelpCheck === "" ? oEve.getSource().getAriaLabelledBy()[0].split("-")[6] : sValuehelpCheck;
				this.getModel().setProperty("/FragModel", sFragModel);
				this.handleFiltersForValueHelp(this.getModel().getProperty("/FragModel"));
				var customData = oEve.getSource().getCustomData();
				var aColumns = [];

				// Iterate through custom data and dynamically add columns
				for (var i = 0; i < customData.length; i++) {
					var columnLabel = customData[i].getValue();
					var columnTemplate = customData[i].getKey();

					// Add column only if label and template are available
					if (columnLabel && columnTemplate) {
						aColumns.push({
							label: columnLabel,
							template: columnTemplate,
							// You can add other properties as needed
						});
					}
				}
				this.getModel().setProperty("/dynamicColumns", aColumns);
				var aColumns = aColumns;
				var oModel = this.getOwnerComponent().getModel(sEntity);

				this.onHandleValueHelpRequest(oModel, aColumns, sEntityPath, sFragName);

			},

			handleItemValuehelps: function (iIndex, valuehelpModel) {
				if (iIndex === "") {
					this.getModel().setProperty("/HeaderValueHelp", true);
					return "";
				}

				this.getModel().setProperty("/HeaderValueHelp", false)
				var sModelPath;
				// Procurement: Computer devices and accessories Screen
				sModelPath = this.getModel().getProperty("/ITAppVisible/") === "SSA-IT-4001-2" && this.getModel().getProperty(
					"/ITProcurement/itemData").length !== 0 ? `/ITProcurement/itemData/${iIndex}${valuehelpModel}` : sModelPath;
				sModelPath = this.getModel().getProperty("/ITAppVisible/") === "SSA-IT-4003-2" && this.getModel().getProperty(
					"/ITProcurement/itemData").length !== 0 ? `/ITProcurement/itemData/${iIndex}${valuehelpModel}` : sModelPath;
				// Procurement: Conferencing Screen
				sModelPath = this.getModel().getProperty("/ITAppVisible/") === "SSA-IT-4003-3" && this.getModel().getProperty(
					"/ITProcurement/itemData").length !== 0 ? `/ITProcurement/itemData/${iIndex}${valuehelpModel}` : sModelPath;
				// Procurement: IP telephone Screen
				sModelPath = this.getModel().getProperty("/ITAppVisible/") === "SSA-IT-4003-1" && this.getModel().getProperty(
					"/ITProcurement/itemData").length !== 0 ? `/ITProcurement/itemData/${iIndex}${valuehelpModel}` : sModelPath;

				return sModelPath;
			},
			onValueHelpOkPress: function (oEvent) {

				var dynamicColumns = this.getModel().getProperty("/dynamicColumns");
				var sModelPath = this.getModel().getProperty("/FragModel");
				var tokens = oEvent.getParameter("tokens"); // Pass the tokens you want to process
				var sKeyProperty = dynamicColumns[0].template; // Property name to set in the model
				var textProperty = dynamicColumns[1].template; // Property name for the token text
				var yourModel = this.getModel(); // Pass your model here
				var sModelPath = sModelPath;

				this.onHandleValueHelpOkPress(yourModel, sModelPath, tokens, sKeyProperty, textProperty, this.getModel().getProperty(
					"/FinanceAppVisible/"));
				this.setDependentFilterData();

			},
			setDependentFilterData: function () {
				if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3005-3A" && this.getModel().getProperty("/HeaderValueHelp") &&
					this.getModel().getProperty("/valueHelpName") ===
					"/costF4/") {
					var filters = [{
							path: "CostCenter",
							value: this.getModel().getProperty("/costF4") ? this.getModel().getProperty(
								"/costF4").split("-")[0] : "",
							group: "RecordAssetFilter"
						}

					];

					var dynamicFilters = this.getFilters(filters);
					this.callDependentFilterAPI("ZSSP_FI_SRV", "/ZCDSV_COSTCTRVH",
						dynamicFilters.RecordAssetFilter, "/AssetLifecycle/RecordAsset/Header/ProfitCentr/")
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3006-1" && this.getModel().getProperty(
						"/HeaderValueHelp") && this.getModel().getProperty("/valueHelpName") ===
					"/POF4/") {
					var filters = [{
							path: "PurchaseOrder",
							value: this.getModel().getProperty("/POF4") ? this.getModel().getProperty(
								"/POF4").split("-")[0] : "",
							group: "POFilter"
						}

					];

					var dynamicFilters = this.getFilters(filters);
					this.callDependentFilterAPI("ZSSP_FI_SRV", "/ZCDSV_FI_POVH2",
						dynamicFilters.POFilter, "/InsuranceandClaim/CreateInsurance/Header/ZzinsurAmount/")
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-1" && this.getModel().getProperty(
						"/HeaderValueHelp") && this.getModel().getProperty("/valueHelpName") ===
					"/InsuranceF4/") {
					var filters = [{

							path: "Zzinspono",
							value: this.getModel().getProperty("/InsuranceF4/") ? this.getModel().getProperty("/InsuranceF4/").split(":")[0] : "",
							group: "InsuranceFilter"
						},

					];

					var dynamicFilters = this.getFilters(filters);
					this.callDependentFilterAPI("ZSSP_FI_SRV", "/ZCDSV_INSURANCEVH",
						dynamicFilters.InsuranceFilter, "/InsuranceandClaim/MarineTransportation/NewClaimItemData/")
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-2" && this.getModel().getProperty(
						"/HeaderValueHelp") && this.getModel().getProperty("/valueHelpName") ===
					"/InsuranceF4/") {
					var filters = [{

							path: "Zzinspono",
							value: this.getModel().getProperty("/InsuranceF4/") ? this.getModel().getProperty("/InsuranceF4/").split(":")[0] : "",
							group: "InsuranceFilter"
						},

					];

					var dynamicFilters = this.getFilters(filters);
					this.callDependentFilterAPI("ZSSP_FI_SRV", "/ZCDSV_INSURANCEVH",
						dynamicFilters.InsuranceFilter, "/InsuranceandClaim/ShipHulls/NewClaimItemData/")
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-3" && this.getModel().getProperty(
						"/HeaderValueHelp") && this.getModel().getProperty("/valueHelpName") ===
					"/InsuranceF4/") {
					var filters = [{

							path: "Zzinspono",
							value: this.getModel().getProperty("/InsuranceF4/") ? this.getModel().getProperty("/InsuranceF4/").split(":")[0] : "",
							group: "InsuranceFilter"
						},

					];

					var dynamicFilters = this.getFilters(filters);
					this.callDependentFilterAPI("ZSSP_FI_SRV", "/ZCDSV_INSURANCEVH",
						dynamicFilters.InsuranceFilter, "/InsuranceandClaim/Vehicle/NewClaimItemData/")
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-4" && this.getModel().getProperty(
						"/HeaderValueHelp") && this.getModel().getProperty("/valueHelpName") ===
					"/InsuranceF4/") {
					var filters = [{

							path: "Zzinspono",
							value: this.getModel().getProperty("/InsuranceF4/") ? this.getModel().getProperty("/InsuranceF4/").split(":")[0] : "",
							group: "InsuranceFilter"
						},

					];

					var dynamicFilters = this.getFilters(filters);
					this.callDependentFilterAPI("ZSSP_FI_SRV", "/ZCDSV_INSURANCEVH",
						dynamicFilters.InsuranceFilter, "/InsuranceandClaim/Property/NewClaimItemData/")
				}

			},

			callDependentFilterAPI: function (entity, path, filter, model) {

				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataACRUDAPICall(
					this.getOwnerComponent().getModel(entity), 'GET', path, null, filter, null
				).then(function (oResponse) {

					this.handleDependentFilterResponse(oResponse.results, `${model}`);
					this.getModel().setProperty("/busy", false);

				}.bind(this)).catch(function (error) {
					MessageBox.error(error.responseText);
					this.getModel().setProperty("/busy", false);
				}.bind(this));
			},
			handleDependentFilterResponse: function (aData, oModel) {
				if (!aData[0]) {
					return;
				}
				var spath = this.getModel().setProperty("/HeaderValueHelp", true) ? oModel : oModel.replace(/\/[^/]+\/$/, '/');
				// var spath =  oModel.replace(/\/[^/]+\/$/, '/');
				debugger;
				if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3006-1") {
					this.getModel().setProperty(`${spath}`, aData[0].NetAmount);
					this.getModel().setProperty(`/InsuranceandClaim/CreateInsurance/Header/currency/`, aData[0].DocumentCurrency);

				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3005-3A") {
					this.getModel().setProperty(`${spath}`, aData[0].ProfitCenter);

				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-1") {
					this.getModel().setProperty(`${spath}`, aData);

				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-2") {
					this.getModel().setProperty(`${spath}`, aData);

				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-3") {
					this.getModel().setProperty(`${spath}`, aData);

				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-4") {
					this.getModel().setProperty(`${spath}`, aData);

				}

			},
			onValueHelpCancelPress: function () {
				this.onHandleValueHelpCancelPress();
			},
			onFilterBarSearch: function (oEvent) {

				var dynamicColumns = this.getModel().getProperty("/dynamicColumns");
				var afilterBar = oEvent.getParameter("selectionSet");
				var filters = [{
						path: dynamicColumns[0].template,
						value: afilterBar[0].getValue(),
						group: "DynamicF4SearchFilter"

					}, {
						path: dynamicColumns[1].template,
						value: afilterBar[1].getValue(),
						operator: sap.ui.model.FilterOperator.Contains,
						group: "DynamicF4SearchFilter"
					}

				];
				var dynamicFilters = this.getFilters(filters);

				this._filterTable(
					dynamicFilters.DynamicF4SearchFilter
				);
			},
			handleFiltersForValueHelp: function (F4) {

				var filters = [{
						path: "CompanyCode",
						value: "1000",
						group: "GLF4Filter"
					}, {
						path: "FiscalYear",
						value: this.getModel().getProperty("/AccountPayable/ManagePettyCash/Header/FiscalYear") ? this.getModel().getProperty(
							"/AccountPayable/ManagePettyCash/Header/FiscalYear") : "",
						group: "CashJrnlF4Filter"
					}, {
						path: "Supplier",
						value: this.getModel().getProperty("/VendorF4") ? this.getModel().getProperty(
							"/VendorF4").split("-")[0] : "",
						group: "POF4Filter"
					}, {
						path: "Zzinspono",
						value: this.getModel().getProperty("/InsuranceF4") ? this.getModel().getProperty(
							"/InsuranceF4").split("-")[0] : "",
						group: "PONumberF4Filter"
					}

				];

				var dynamicFilters = this.getFilters(filters);
				var aFilter;

				if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3003-4" && F4 === "/GlaccountF4/") {
					aFilter = this._getfilterforControl(dynamicFilters.GLF4Filter);
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3003-1" && F4 === "/GlaccountF4/") {
					aFilter = this._getfilterforControl(dynamicFilters.GLF4Filter);
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3003-2" && F4 === "/GlaccountF4/") {
					aFilter = this._getfilterforControl(dynamicFilters.GLF4Filter);
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3002-1" && F4 === "/GlaccountF4/") {
					aFilter = this._getfilterforControl(dynamicFilters.GLF4Filter);
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3001-2" && F4 === "/CashJornalF4/") {
					aFilter = this._getfilterforControl(dynamicFilters.CashJrnlF4Filter);
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3006-1" && F4 === "/POF4/") {

					aFilter = this._getfilterforControl(dynamicFilters.POF4Filter);
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-1" && F4 === "/POF4/") {

					aFilter = this._getfilterforControl(dynamicFilters.PONumberF4Filter);
				} else if (this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-2" && F4 === "/POF4/") {

					aFilter = this._getfilterforControl(dynamicFilters.PONumberF4Filter);
				} else {
					// Default case if none of the conditions are met
					aFilter = [];
				}

				this.getModel().setProperty("/DynamicValuehelpFilter", aFilter.length == 0 ? [] : aFilter);

			},
			onValueHelpAfterOpen: function () {

				//   apply filter before value help open 
				var aFilter = this.getModel().getProperty("/DynamicValuehelpFilter");
				this._filterTable(aFilter, "Control");
			},
			_getfilterforControl: function (aFilter) {

				if (!aFilter) {
					return [];
				}
				return aFilter;

				//	return dynamicFilters.PlantFilter;
			},

			_filterTable: function (oFilter, sType) {

				this.handleVHFilterTable(oFilter, sType);
			},

			onSearchFinanceRequest: function () {

				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return;
				debugger;
				var filters = [{
						path: "CompanyCode",
						value: this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						group: "ManagePettyCashFilter",
						useOR: true
					}, {
						path: "FiscalYear",
						value: this.getModel().getProperty("/AccountPayable/ManagePettyCash/Header/FiscalYear"),
						group: "ManagePettyCashFilter",
						useOR: true
					}, {
						path: "PostingNo",
						value: this.getModel().getProperty("/CashJornalF4") ? this.getModel().getProperty("/CashJornalF4").split("-")[0] : "",
						group: "ManagePettyCashFilter"
					}, {
						path: "CompanyCode",
						value: this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						group: "ManageRecordInvoiceFilter",
						useOR: true
					}, {
						path: "FiscalYear",
						value: this.getModel().getProperty("/AccountPayable/RecordProcess/Header/FiscalYear"),
						group: "ManageRecordInvoiceFilter",
						useOR: true
					},

					{
						path: "PostingDate",
						value: this.getModel().getProperty("/AccountsReceivable/Billing/Header/PostingDate/") ? this.handleOdataDateFormat(this.getModel()
							.getProperty("/AccountsReceivable/Billing/Header/PostingDate/")) : "",
						group: "BillingRequestFilter",
						useOR: true
					},

					{
						path: "CompanyCode",
						value: this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						group: "BillingRequestFilter",
						useOR: true
					},

					{
						path: "CustomerCode",
						value: this.getModel().getProperty("/customercodeF4/") ? this.getModel().getProperty("/customercodeF4/").split("-")[0] : "",
						group: "BillingRequestFilter"
					}, {
						path: "CompanyCode",
						value: this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						group: "ManageProcessCollectionFilter",
						useOR: true
					},

					{
						path: "CustomerCode",
						value: this.getModel().getProperty("/customercodeF4/") ? this.getModel().getProperty("/customercodeF4/").split("-")[0] : "",
						group: "ManageProcessCollectionFilter"

					},

					{
						path: "zzinspono",
						value: this.getModel().getProperty("/InsuranceF4/") ? this.getModel().getProperty("/InsuranceF4/").split(":")[0] : "",
						group: "MarineTransporationFilter"
					}, {
						path: "zzinspono",
						value: this.getModel().getProperty("/InsuranceF4/") ? this.getModel().getProperty("/InsuranceF4/").split(":")[0] : "",
						group: "ShipHullsFilter"
					}, {

						path: "zzinspono",
						value: this.getModel().getProperty("/InsuranceF4/") ? this.getModel().getProperty("/InsuranceF4/").split(":")[0] : "",
						group: "VehiclesFilter"
					}, {
						path: "zzinspono",
						value: this.getModel().getProperty("/InsuranceF4/") ? this.getModel().getProperty("/InsuranceF4/").split(":")[0] : "",
						// 		value: this.getModel().getProperty("/InsuranceF4/") ? this.getModel().getProperty("/InsuranceF4/").split("-")[0] : "",
						group: "PropertyFilter"
					}

				];
				var dynamicFilters = this.getFilters(filters);

				// Accounts Payable
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3001-1" ? this.callCommonFinanceSearchRequest("/PettyInvoicesSet/",
					"GET", dynamicFilters.ManageRecordInvoiceFilter, null,
					"/AccountPayable/RecordProcess/itemData/") : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3001-2" ? this.callCommonFinanceSearchRequest("/PettyCashSet/",
					"GET",
					dynamicFilters.ManagePettyCashFilter, null, "/AccountPayable/ManagePettyCash/itemData/") : null;

				// Accounts Recievable
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3002-2" ? this.callCommonFinanceSearchRequest(
					"/AccReceivableBillingSet/",
					"GET",
					dynamicFilters.BillingRequestFilter, null, "/AccountsReceivable/Billing/itemData/") : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3002-1" ? this.callCommonFinanceSearchRequest(
					"/ArCollectionProcessSet/",
					"GET",
					dynamicFilters.ManageProcessCollectionFilter, null, "/AccountsReceivable/Manageandprocess/itemData/") : null;

				//Insurance-Marine Transportation

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-1" ? this.callCommonFinanceSearchRequest(
					"/ZCDSV_INSURANCE_CLMVH/",
					"GET",
					dynamicFilters.MarineTransporationFilter, null, "/InsuranceandClaim/MarineTransportation/itemData") : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-2" ? this.callCommonFinanceSearchRequest(
					"/ZCDSV_INSURANCE_CLMVH/",
					"GET",
					dynamicFilters.ShipHullsFilter, null, "/InsuranceandClaim/ShipHulls/itemData") : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-3" ? this.callCommonFinanceSearchRequest(
					"/ZCDSV_INSURANCE_CLMVH/",
					"GET",
					dynamicFilters.VehiclesFilter, null, "/InsuranceandClaim/Vehicle/itemData") : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-3" ? this.callCommonFinanceSearchRequest(
					"/ZCDSV_INSURANCE_DTVH/",
					"GET",
					dynamicFilters.VehiclesFilter, null, "/InsuranceandClaim/Vehicle/CarDetails/") : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-4" ? this.callCommonFinanceSearchRequest(
					"/ZCDSV_INSURANCE_CLMVH/",
					"GET",
					dynamicFilters.PropertyFilter, null, "/InsuranceandClaim/Property/itemData") : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-4" ? this.callCommonFinanceSearchRequest(
					"/ZCDSV_INSURANCE_DTVH/",
					"GET",
					dynamicFilters.PropertyFilter, null, "/InsuranceandClaim/Property/PropertyDetails") : null;

			},
			callCommonFinanceSearchRequest: function (Entity, operation, Filters, oPayload, oModelSet) {

				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataACRUDAPICall(this.getOwnerComponent().getModel("ZSSP_FI_SRV"), operation, Entity, null, Filters)
					.then(function (oResponse) {
						debugger;
						this.getModel().setProperty(`${oModelSet}`, oResponse.results);
						this.getModel().setProperty("/busy", false);
					}.bind(this)).catch(function (error) {
						MessageBox.error(error.responseText);
						this.getModel().setProperty("/busy", false);
					}.bind(this));
			},

			onProceed: function (oEve) {
				debugger;

				//-------------------------------------------Accounts Payable----------------------------------------------------------------------
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3001-1" ? this.FinanceCreateRecordInvoiceRequest(this.getModel().getProperty(
					"/AccountPayable/RecordProcess/Header/"), this.getModel().getProperty("/AccountPayable/RecordProcess/customItemData/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3001-2" ? this.FinanceCreateManangePettyCashRequest(this.getModel()
						.getProperty(
							"/AccountPayable/ManagePettyCash/Header/"), this.getModel().getProperty("/AccountPayable/ManagePettyCash/customItemData/")) :
					null;

				//-------------------------------------------Accounts Recievable-------------------------------------------------------------	

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3002-1" ? this.FinanceCreateManageProcessRequest(this.getModel().getProperty(
					"/AccountsReceivable/Manageandprocess/Header/"), this.getModel().getProperty(
					"/AccountsReceivable/Manageandprocess/customItemData/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3002-2" ? this.FinanceCreateBillingRequest(this.getModel().getProperty(
					"/AccountsReceivable/Billing/Header/"), this.getModel().getProperty(
					"/AccountsReceivable/Billing/customItemData/")) : null;

				//---------------------------------------- Financial Review & General Ledger Close------------------------------------------

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3003-3" ? this.FinanceCreateFinancialCLoseRequest(this.getModel().getProperty(
					"/FinancialReviewGeneralClose/FinancialClose/Header/")) : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3003-4" ? this.FinanceCreatePeriodEndReconclRequest(this.getModel()
					.getProperty(
						"/FinancialReviewGeneralClose/PeriodEndReconcilation/Header/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3003-1" ? this.FinanceCreatePrepareReviewBalanceRequest(this.getModel()
					.getProperty(
						"/FinancialReviewGeneralClose/PrepareReviewTrail/Header/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3003-2" ? this.FinanceCreateIssueFinancialStmntsRequest(this.getModel()
					.getProperty(
						"/FinancialReviewGeneralClose/IssueFinancialStatement/Header/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3003-5" ? this.FinanceCreateMaintainChartofAccRequest(this.getModel()
					.getProperty(
						"/FinancialReviewGeneralClose/MaintainChart/Header/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3004-1" ? this.FinanceCreateIssueGovStatmntRequest(this.getModel()
					.getProperty(
						"/FinancialReviewGeneralClose/IssueGovernment/Header/")) : null;

				//   -----------------------------------Asset LifeCycle--------------------------------------------------------------------
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3005-1" ? this.FinanceDepreciationProcessRequest(this.getModel()
					.getProperty(
						"/AssetLifecycle/DepreciationProcess/Header/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3005-2" ? this.FinancePerformAsstInventoryRequest(this.getModel()
					.getProperty(
						"/AssetLifecycle/PerfomAsset/Header/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3005-3A" ? this.FinanceRecordAssetRequest(this.getModel()
					.getProperty(
						"/AssetLifecycle/RecordAsset/Header/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3005-3B" ? this.FinanceSaleofAssetRequest(this.getModel()
					.getProperty(
						"/AssetLifecycle/SaleofAssets/Header/")) : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3005-3C" ? this.FinanceRetirementofAssetRequest(this.getModel()
					.getProperty(
						"/AssetLifecycle/RetirementofAssets/Header/")) : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3005-4" ? this.FinanceTransferofAssetRequest(this.getModel()
					.getProperty(
						"/AssetLifecycle/TransferofAssets/Header/")) : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3005-5" ? this.FinanceProjectCapitalizationRequest(this.getModel()
					.getProperty(
						"/AssetLifecycle/ProjectCaptilization/Header/")) : null;

				//   -----------------------------------Insurance Claim Management --------------------------------------------------------------------
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3006-1" ? this.FinanceInsuranceRegistrationRequest(this.getModel()
					.getProperty(
						"/InsuranceandClaim/CreateInsurance/Header/")) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-1" ? this.FinanceMarineTransportationRequest(this.getModel()
					.getProperty(
						"/InsuranceandClaim/MarineTransportation/Header/"), this.getModel()
					.getProperty(
						"/InsuranceandClaim/MarineTransportation/itemData"), oEve.getSource().getText()) : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-2" ? this.FinanceShipHullsRequest(this.getModel()
					.getProperty(
						"/InsuranceandClaim/ShipHulls/Header/"), this.getModel()
					.getProperty(
						"/InsuranceandClaim/ShipHulls/itemData"), oEve.getSource().getText()) : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-3" ? this.FinanceVehicleRequest(this.getModel()
					.getProperty(
						"/InsuranceandClaim/Vehicle/Header"), this.getModel()
					.getProperty(
						"/InsuranceandClaim/Vehicle/itemData"), oEve.getSource().getText()) : null;

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-4" ? this.FinancePropertyRequest(this.getModel()
					.getProperty(
						"/InsuranceandClaim/Property/Header"), this.getModel()
					.getProperty(
						"/InsuranceandClaim/Property/itemData"), oEve.getSource().getText()) : null;

			},

			FinanceCreateManangePettyCashRequest: function (oPayloadHeader, aItem) {

				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/")) || !this.handleItemValidation(this.getModel()
						.getProperty("/FinanceAppVisible/"),
						this.getModel().getProperty("/AccountPayable/ManagePettyCash/customItemData/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"Gjahr": oPayloadHeader.FiscalYear,
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : ""
					},

					"ServiceHeadertoItem": aItem.map(
						function (items) {
							return {
								PostingNumber: items.PostingNo,
								Budat: items.PostingDate,

							};
						}
					)

				};
				this.FinanceCreateRequestAPI(oPayload);
			},
			FinanceCreateRecordInvoiceRequest: function (oPayloadHeader, aItem) {

				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/")) || !this.handleItemValidation(this.getModel()
						.getProperty("/FinanceAppVisible/"),
						this.getModel().getProperty("/AccountPayable/RecordProcess/customItemData"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"Gjahr": oPayloadHeader.FiscalYear,
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : ""
					},

					"ServiceHeadertoItem": aItem.map(
						function (items) {
							return {
								Belnr: items.InvoiceNo,
								Budat: items.PostingDate,

							};
						}
					)

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceCreateManageProcessRequest: function (oPayloadHeader, aItem) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/")) || !this.handleItemValidation(this.getModel()
						.getProperty("/FinanceAppVisible/"),
						this.getModel().getProperty("/AccountsReceivable/Manageandprocess/customItemData"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"Gjahr": oPayloadHeader.FiscalYear,
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : ""
					},

					"ServiceHeadertoItem": aItem.map(
						function (items) {
							return {
								Vbeln: items.InvoiceNo,
								Budat: items.PostingDate,

							};
						}
					)

				};
				this.FinanceCreateRequestAPI(oPayload);
			},
			FinanceCreateBillingRequest: function (oPayloadHeader, aItem) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/")) || !this.handleItemValidation(this.getModel()
						.getProperty("/FinanceAppVisible/"),
						this.getModel().getProperty("/AccountsReceivable/Billing/customItemData/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"Gjahr": oPayloadHeader.FiscalYear,
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : ""
					},

					"ServiceHeadertoItem": aItem.map(
						function (items) {
							return {
								Vbeln: items.InvoiceNo,
								Budat: items.PostingDate,

							};
						}
					)

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceCreateFinancialCLoseRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"BukrsPp": this.getModel().getProperty("/PostingF4/") ? this.getModel().getProperty("/PostingF4/").split("-")[0] : ""
					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceCreatePeriodEndReconclRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"Saknr": this.getModel().getProperty("/GlaccountF4/") ? this.getModel().getProperty("/GlaccountF4/").split("-")[0] : "",
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						"Allgstid": this.handleOdataDateFormat(oPayloadHeader.OpenDate)
					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceCreatePrepareReviewBalanceRequest: function (oPayloadHeader) {

				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"Saknr": this.getModel().getProperty("/GlaccountF4/") ? this.getModel().getProperty("/GlaccountF4/").split("-")[0] : "",
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						"Gjahr": oPayloadHeader.FiscalYear,
						"Curtp": this.getModel().getProperty("/CurrencytypeF4/") ? this.getModel().getProperty("/CurrencytypeF4/").split("-")[0] : "",
						"Ktopl": this.getModel().getProperty("/ChartofaccountF4/") ? this.getModel().getProperty("/ChartofaccountF4/").split("-")[0] : "",
						"Rldnr": this.getModel().getProperty("/LedgerF4/") ? this.getModel().getProperty("/LedgerF4/").split("-")[0] : "",
						"BilabmonFrom": oPayloadHeader.BilabmonFrom,
						"BilabmonTo": oPayloadHeader.BilabmonTo,

					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceCreateIssueFinancialStmntsRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"Saknr": this.getModel().getProperty("/GlaccountF4/") ? this.getModel().getProperty("/GlaccountF4/").split("-")[0] : "",
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						"Gjahr": oPayloadHeader.Gjahr,
						"Zzyearofmanf": oPayloadHeader.Zzyearofmanf,
						"Curtp": this.getModel().getProperty("/CurrencytypeF4/") ? this.getModel().getProperty("/CurrencytypeF4/").split("-")[0] : "",
						"Ktopl": this.getModel().getProperty("/ChartofaccountF4/") ? this.getModel().getProperty("/ChartofaccountF4/").split("-")[0] : "",
						"Rldnr": this.getModel().getProperty("/LedgerF4/") ? this.getModel().getProperty("/LedgerF4/").split("-")[0] : "",
						"BilabmonFrom": oPayloadHeader.BilabmonFrom,
						"BilabmonTo": oPayloadHeader.BilabmonTo,
						"BilavmonFrom": oPayloadHeader.BilavmonFrom,
						"BilavmonTo": oPayloadHeader.BilavmonTo,
						"Versn": this.getModel().getProperty("/FinancialstatmentF4/") ? this.getModel().getProperty("/FinancialstatmentF4/").split("-")[
							0] : "",
						"Dspra": this.getModel().getProperty("/LanguageF4/") ? this.getModel().getProperty("/LanguageF4/").split("-")[0] : ""

					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},
			FinanceCreateMaintainChartofAccRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				const aUploadData = this.getModel().getProperty("/UploadedData").length === 0 ? [] : this.getModel().getProperty("/UploadedData").map(
					({
						Filesize,
						...rest
					}) => rest);
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : ""

					},

					"ServiceHeadertoItem": [],
					"Attachments": aUploadData

				};
				this.FinanceCreateRequestAPI(oPayload);
			},
			FinanceCreateIssueGovStatmntRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Fikrs": this.getModel().getProperty("/FmareaF4/") ? this.getModel().getProperty("/FmareaF4/").split("-")[0] : "",
						"Gjahr": oPayloadHeader.FiscalYear,
						"Poper": oPayloadHeader.Poper,
						"PosNum1": this.getModel().getProperty("/HeadofaccountingF4/") ? this.getModel().getProperty("/HeadofaccountingF4/").split("-")[
							0] : "",
						"PosNum2": this.getModel().getProperty("/DirectorfmF4/") ? this.getModel().getProperty("/DirectorfmF4/").split("-")[0] : "",
						"PosNum3": this.getModel().getProperty("/FinancialauditorF4/") ? this.getModel().getProperty("/FinancialauditorF4/").split("-")[
							0] : "",
						"PosNum4": this.getModel().getProperty("/AuthorityF4/") ? this.getModel().getProperty("/AuthorityF4/").split("-")[0] : ""

					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceDepreciationProcessRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						"AccPrinciple": this.getModel().getProperty("/AccountingprincipalF4/") ? this.getModel().getProperty("/AccountingprincipalF4/").split(
							"-")[0] : "",
						"Gjahr": oPayloadHeader.FiscalYear,
						"Poper": oPayloadHeader.Poper

					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinancePerformAsstInventoryRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						"Kostl": this.getModel().getProperty("/costF4/") ? this.getModel().getProperty("/costF4/").split(
							"-")[0] : "",
						"Brdatu": this.handleOdataDateFormat(oPayloadHeader.Brdatu),
						"Afabe1": this.getModel().getProperty("/DepreciationF4/") ? this.getModel().getProperty("/DepreciationF4/").split("-")[0] : "",

					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},
			FinanceRecordAssetRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				const aUploadData = this.getModel().getProperty("/UploadedData").length === 0 ? [] : this.getModel().getProperty("/UploadedData").map(
					({
						Filesize,
						...rest
					}) => rest);
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity.toString(),
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						"Anlkl": this.getModel().getProperty("/AssestclassF4/") ? this.getModel().getProperty("/AssestclassF4/").split("-")[0] : "",
						"Anln2": this.getModel().getProperty("/AssestF4/") ? this.getModel().getProperty("/AssestF4/").split(
							"-")[0] : "",
						"Txt50": oPayloadHeader.Txt50,
						"Anlhtxt": oPayloadHeader.Txt50,
						"Invnr": oPayloadHeader.Invnr,
						"Invzu": oPayloadHeader.Invzu,
						"Bzdat": this.handleOdataDateFormat(oPayloadHeader.Aktiv),
						"Werks": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/").split("-")[0] : "",
						"Kostl": this.getModel().getProperty("/costF4/") ? this.getModel().getProperty("/costF4/").split("-")[0] : "",
						"Prctr": oPayloadHeader.ProfitCentr ? oPayloadHeader.ProfitCentr[0].ProfitCenter : "",
						"Ord41": this.getModel().getProperty("/AreaF4/") ? this.getModel().getProperty("/AreaF4/").split("-")[0] : "",
						"Ord42": this.getModel().getProperty("/UnitF4/") ? this.getModel().getProperty("/UnitF4/").split("-")[0] : "",
						"Ord43": this.getModel().getProperty("/SystemF4/") ? this.getModel().getProperty("/SystemF4/").split("-")[0] : "",
						"Anlue": this.getModel().getProperty("/AssestsupernumberF4/") ? this.getModel().getProperty("/AssestsupernumberF4/").split("-")[
							0] : "",
						"Gdlgrp": this.getModel().getProperty("/AssestnontechF4/") ? this.getModel().getProperty("/AssestnontechF4/").split("-")[
							0] : "",

					},

					"ServiceHeadertoItem": [],
					"Attachments": aUploadData

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceSaleofAssetRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				const aUploadData = this.getModel().getProperty("/UploadedData").length === 0 ? [] : this.getModel().getProperty("/UploadedData").map(
					({
						Filesize,
						...rest
					}) => rest);
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity,
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Bldat": this.handleOdataDateFormat(oPayloadHeader.Budat),
						"Budat": this.handleOdataDateFormat(oPayloadHeader.Budat),
						"Bzdat": this.handleOdataDateFormat(oPayloadHeader.Bzdat),
						"Erlbt": `${oPayloadHeader.Erlbt}.00`,
						"Anln1": this.getModel().getProperty("/AssestF4/") ? this.getModel().getProperty("/AssestF4/").split("-")[0] : "",
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						"AccPrinciple": this.getModel().getProperty("/AccountingprincipalF4/") ? this.getModel().getProperty("/AccountingprincipalF4/").split(
							"-")[0] : "",
						"Afabe1": this.getModel().getProperty("/DepreciationF4/") ? this.getModel().getProperty("/DepreciationF4/").split(
							"-")[0] : ""

					},

					"ServiceHeadertoItem": [],
					"Attachments": aUploadData

				};
				this.FinanceCreateRequestAPI(oPayload);
			},
			FinanceRetirementofAssetRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity,
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Bldat": this.handleOdataDateFormat(oPayloadHeader.Budat),
						"Budat": this.handleOdataDateFormat(oPayloadHeader.Budat),
						"Bzdat": this.handleOdataDateFormat(oPayloadHeader.Bzdat),
						"Anln1": this.getModel().getProperty("/AssestF4/") ? this.getModel().getProperty("/AssestF4/").split("-")[0] : "",
						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						"Afabe1": this.getModel().getProperty("/DepreciationF4/") ? this.getModel().getProperty("/DepreciationF4/").split("-")[0] : "",
						"AccPrinciple": this.getModel().getProperty("/AccountingprincipalF4/") ? this.getModel().getProperty("/AccountingprincipalF4/").split(
							"-")[0] : "",
						"Anbtr": oPayloadHeader.Anbtr,

					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},
			FinanceTransferofAssetRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity,
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Bukrs": this.getModel().getProperty("/CompanycodeF4/") ? this.getModel().getProperty("/CompanycodeF4/").split("-")[0] : "",
						"Kostl": this.getModel().getProperty("/costF4/") ? this.getModel().getProperty("/costF4/").split("-")[0] : "",
						"Anln1": this.getModel().getProperty("/AssestF4/") ? this.getModel().getProperty("/AssestF4/").split("-")[0] : "",
						"Anln2": this.getModel().getProperty("/AssestF4/") ? this.getModel().getProperty("/AssestF4/").split("-")[0] : ""

					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceProjectCapitalizationRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity,
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Posid": this.getModel().getProperty("/WBSElementF4/") ? this.getModel().getProperty("/WBSElementF4/").split("-")[0] : "",
						"Nplnr": this.getModel().getProperty("/NetworkF4/") ? this.getModel().getProperty("/NetworkF4/").split("-")[0] : "",
						"Poper": oPayloadHeader.Poper,
						"Gjahr": oPayloadHeader.FiscalYear,
						"Pspid": this.getModel().getProperty("/ProjectNtwrkF4/") ? this.getModel().getProperty("/ProjectNtwrkF4/").split("-")[0] : ""

					},

					"ServiceHeadertoItem": []

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceInsuranceRegistrationRequest: function (oPayloadHeader) {
				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"))) return false;
				const aUploadData = this.getModel().getProperty("/UploadedData").length === 0 ? [] : this.getModel().getProperty("/UploadedData").map(
					({
						Filesize,
						...rest
					}) => rest);
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity,
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						// 		"Zzinspono": oPayloadHeader.Zzinspono,
						"Zzvendor": this.getModel().getProperty("/VendorF4/") ? this.getModel().getProperty("/VendorF4/").split("-")[0] : "",
						"Zzinsurper": oPayloadHeader.Zzinsurper,
						"ZzpolicyType": this.getModel().getProperty("/PolicyTypeF4/") ? this.getModel().getProperty("/PolicyTypeF4/").split("-")[0] : "",
						"ZzinsurAmount": oPayloadHeader.ZzinsurAmount,
						"Ebeln": this.getModel().getProperty("/POF4/") ? this.getModel().getProperty("/POF4/").split("-")[0] : "",
						"Zzdeprate": parseInt(oPayloadHeader.Zzdeprate).toFixed(2),
						"ZzpolicyStatus": "New"
							// 		"ZzinsStrtDat": this.handleOdataDateFormat(oPayloadHeader.ZzinsStrtDat),
							// 		"ZzinsStrtDat": this.handleOdataDateFormat(oPayloadHeader.ZzinsStrtDat)

					},

					"ServiceHeadertoItem": [],
					"Attachments": aUploadData

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceMarineTransportationRequest: function (oPayloadHeader, aItem, action) {
				debugger;

				// if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"), this.getModel().getProperty(
				// 		"/InsuranceandClaim/MarineTransportation/Header"))) return;

				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/")) || !this.handleItemValidation(this.getModel()
						.getProperty("/FinanceAppVisible/"),
						this.getModel().getProperty("/InsuranceandClaim/MarineTransportation/itemData"), action)) return false;

				const aUploadData = this.getModel().getProperty("/UploadedData").length === 0 ? [] : this.getModel().getProperty("/UploadedData").map(
					({
						Filesize,
						...rest
					}) => rest);

				var aCustomDataEntry = aItem.filter(function (element) {
					return element.New === true;
				});
				debugger;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity,
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Zzinspono": aCustomDataEntry[0].zzinspono,
						"Ebeln": aCustomDataEntry[0].ebeln,
						"ClaimValue": aCustomDataEntry[0].claim_value,
						"Zzinsclaimstat": aCustomDataEntry[0].ClaimStatus,
						"Expense": aCustomDataEntry[0].expense,
						"Zzaccdntdate": this.handleReturnDateonly1(aCustomDataEntry[0].AccidentDate),
						"Zzinsdateclaim": this.handleReturnDateonly1(aCustomDataEntry[0].ClaimRecDate),

					},

					"ServiceHeadertoItem": [],
					"Attachments": aUploadData

				};
				this.FinanceCreateRequestAPI(oPayload);

			},

			FinanceShipHullsRequest: function (oPayloadHeader, aItem, action) {

				// if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"), this.getModel().getProperty(
				// 		"/InsuranceandClaim/ShipHulls/Header"))) return;

				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/")) || !this.handleItemValidation(this.getModel()
						.getProperty("/FinanceAppVisible/"),
						this.getModel().getProperty("/InsuranceandClaim/ShipHulls/itemData"), action)) return false;

				const aUploadData = this.getModel().getProperty("/UploadedData").length === 0 ? [] : this.getModel().getProperty("/UploadedData").map(
					({
						Filesize,
						...rest
					}) => rest);
				var aCustomDataEntry = aItem.filter(function (element) {
					return element.New === true;
				});
				debugger;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity,
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Zzinspono": aCustomDataEntry[0].zzinspono,
						"Ebeln": aCustomDataEntry[0].ebeln,
						"ClaimValue": aCustomDataEntry[0].claim_value,
						"Zzinsclaimstat": aCustomDataEntry[0].ClaimStatus,
						"Expense": aCustomDataEntry[0].expense,
						"Zzaccdntdate": this.handleReturnDateonly1(aCustomDataEntry[0].AccidentDate),
						"Zzinsdateclaim": this.handleReturnDateonly1(aCustomDataEntry[0].ClaimRecDate),

					},

					"ServiceHeadertoItem": [],
					"Attachments": aUploadData

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinanceVehicleRequest: function (oPayloadHeader, aItem, action) {

				// if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"), this.getModel().getProperty(
				// 		"/InsuranceandClaim/Vehicle/Header"))) return;

				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/")) || !this.handleItemValidation(this.getModel()
						.getProperty("/FinanceAppVisible/"),
						this.getModel().getProperty("/InsuranceandClaim/Vehicle/itemData"), action)) return false;

				const aUploadData = this.getModel().getProperty("/UploadedData").length === 0 ? [] : this.getModel().getProperty("/UploadedData").map(
					({
						Filesize,
						...rest
					}) => rest);
				var aCustomDataEntry = aItem.filter(function (element) {
					return element.New === true;
				});
				debugger;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity,
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {

						"Zzinspono": aCustomDataEntry[0].zzinspono,
						"ClaimValue": aCustomDataEntry[0].claim_value,
						"Zzinsclaimstat": aCustomDataEntry[0].ClaimStatus,
						"PayDate": this.handleReturnDateonly1(aCustomDataEntry[0].PaymentDate),
						"Zzaccdntdate": this.handleReturnDateonly1(aCustomDataEntry[0].AccidentDate),
						"Zzinsdateclaim": this.handleReturnDateonly1(aCustomDataEntry[0].ClaimRecDate),

					},

					"ServiceHeadertoItem": [],
					"Attachments": aUploadData

				};
				this.FinanceCreateRequestAPI(oPayload);
			},

			FinancePropertyRequest: function (oPayloadHeader, aItem, action) {

				if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/")) || !this.handleItemValidation(this.getModel()
						.getProperty("/FinanceAppVisible/"),
						this.getModel().getProperty("/InsuranceandClaim/Property/itemData"), action)) return false;

				// if (!this.handleHeaderValidation(this.getModel().getProperty("/FinanceAppVisible/"), this.getModel().getProperty(
				// 		"/InsuranceandClaim/Property/Header"))) return;
				const aUploadData = this.getModel().getProperty("/UploadedData").length === 0 ? [] : this.getModel().getProperty("/UploadedData").map(
					({
						Filesize,
						...rest
					}) => rest);
				var aCustomDataEntry = aItem.filter(function (element) {
					return element.New === true;
				});
				debugger;
				var oPayload = {
					"Username": this.getCurrentUserLoggedIn(),
					"Material": this.getModel().getProperty("/FinanceAppVisible/"),
					"MaterialQty": oPayloadHeader.quantity,
					"Plant": this.getModel().getProperty("/PlantF4/") ? this.getModel().getProperty("/PlantF4/") : "",
					"Descript": oPayloadHeader.Descript,
					"NotifText": oPayloadHeader.NotifText,
					"ZHeaderExtra": {
						"Zzinspono": aCustomDataEntry[0].zzinspono,
						"ClaimValue": aCustomDataEntry[0].claim_value,
						"Zzinsclaimstat": aCustomDataEntry[0].ClaimStatus,
						"Zzaccdntdate": this.handleReturnDateonly1(aCustomDataEntry[0].AccidentDate),
						"Zzinsdateclaim": this.handleReturnDateonly1(aCustomDataEntry[0].ClaimRecDate),
						"PayDate": this.handleReturnDateonly1(aCustomDataEntry[0].PayDate),
						"DeductVal": aCustomDataEntry[0].DeductVal,
						"NetPay": aCustomDataEntry[0].NetPay,
						"Zzaccdntdate": this.handleReturnDateonly1(aCustomDataEntry[0].AccidentDate),
						"Zzinsdateclaim": this.handleReturnDateonly1(aCustomDataEntry[0].ClaimRecDate),

					},

					"ServiceHeadertoItem": [],
					"Attachments": aUploadData

				};
				this.FinanceCreateRequestAPI(oPayload);
			},
			FinanceCreateRequestAPI: function (oPayload) {
				debugger;
				this.getModel().setProperty("/busy", true);
				this.getAPI.oDataACRUDAPICall(this.getOwnerComponent().getModel("ZSSP_COMMON_SRV"), 'POST', '/ServNotificationSet',
						oPayload)
					.then(function (oResponse) {
						this._handleMessageBoxProceed(`Service Request has been created : ${oResponse.Notificat}`);
						this.getModel().setProperty("/busy", false);
					}.bind(this)).catch(function (error) {
						// 		MessageBox.error(error.responseText);
						this._handleError(error);
						this.getModel().setProperty("/busy", false);
					}.bind(this));

			},

			handleBackPress: function () {
				this.navigationBack();

			},
			handleBackHomePress: function () {
				this.getRouter().navTo("HomePage", {}, true);
			},

			_handleMessageBoxProceed: function (sMessage) {
				var params = {
					sMessage: sMessage
				};

				this.createMessageBoxHandler(this.onPresshomepage.bind(this))(params);
			},
			onTableSelectionChange: function (oEvent) {
				var oTable = oEvent.getSource();
				var aSelectedItems = oTable.getSelectedItems();

				// Access data from selected items
				var aSelectedData = aSelectedItems.map(function (oItem) {
					return oItem.getBindingContext().getObject();
				});
				if (aSelectedData.length >= 10) {
					this.onDeselectItems(oTable);
					MessageBox.error("Please Select only 10 items");
					return false;
				}
				this.setSelectedItemData(aSelectedData);

				// Update the count in the input field
				this.updateSelectedRowCount(aSelectedData.length);
			},
			setSelectedItemData: function (aSelectedData) {
				// Accounts Payable
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3001-1" ? this.getModel().setProperty(
					"/AccountPayable/RecordProcess/customItemData", aSelectedData) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3001-2" ? this.getModel().setProperty(
					"/AccountPayable/ManagePettyCash/customItemData", aSelectedData) : null;
				// Accounts Recievable
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3002-1" ? this.getModel().setProperty(
					"/AccountsReceivable/Manageandprocess/customItemData", aSelectedData) : null;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3002-2" ? this.getModel().setProperty(
					"/AccountsReceivable/Billing/customItemData", aSelectedData) : null;

			},
			updateSelectedRowCount: function (iCount) {
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3001-1" ? this.getModel().setProperty(
					"/AccountPayable/RecordProcess/Header/quantity/", iCount) : "";
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3002-2" ? this.getModel().setProperty(
					"/AccountsReceivable/Billing/Header/quantity/", iCount) : "";
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3002-1" ? this.getModel().setProperty(
					"/AccountsReceivable/Manageandprocess/Header/quantity/", iCount) : "";
				// Assuming you have a model named 'selectedItemsModel'

			},
			onDeselectItems: function (oTable) {
				var aSelectedItems = oTable.getSelectedItems();

				aSelectedItems.forEach(function (oSelectedItem) {
					oSelectedItem.setSelected(false); // Deselect each selected item
				});
			},

			onPresshomepage: function () {
				this.getOwnerComponent().getRouter().navTo("HomePage");
			},
			onAddItemsPress: function (oEvent) {
				debugger;
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-1" && this.handleHeaderValidation(this.getModel().getProperty(
					"/FinanceAppVisible/")) && this.handleItemValidation(this.getModel().getProperty(
					"/FinanceAppVisible/"), this.getModel().getProperty(
					"/InsuranceandClaim/MarineTransportation/itemData"), oEvent.getSource().getText()) ? this.updateItemAddModel(this.getModel().getProperty(
					"/InsuranceandClaim/MarineTransportation/itemData"), {

					InsStartDate: this.getModel().getProperty("/InsuranceandClaim/MarineTransportation/NewClaimItemData")[0].ZzinsStrtDat,
					InsExpiryDate: this.getModel().getProperty("/InsuranceandClaim/MarineTransportation/NewClaimItemData")[0].ZzinsurExpyDat,
					zzplant: this.getModel().getProperty("/InsuranceandClaim/MarineTransportation/NewClaimItemData")[0].Zzplant,
					ebeln: this.getModel().getProperty("/InsuranceandClaim/MarineTransportation/NewClaimItemData")[0].Ebeln,
					claim_value: this.getModel().getProperty("/InsuranceandClaim/MarineTransportation/NewClaimItemData")[0].claim_value,
					zzinspono: this.getModel().getProperty("/InsuranceandClaim/MarineTransportation/NewClaimItemData")[0].Zzinspono,
					ClaimStatus: "",
					TotalPremium: this.getModel().getProperty("/InsuranceandClaim/MarineTransportation/NewClaimItemData")[0].ZzinsurAmount,
					expense: this.getModel().getProperty("/InsuranceandClaim/MarineTransportation/NewClaimItemData")[0].expense,
					AccidentDate: null,
					ClaimRecDate: null,
					New: true

				}, "/InsuranceandClaim/MarineTransportation/itemData") : "";

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-2" && this.handleHeaderValidation(this.getModel().getProperty(
					"/FinanceAppVisible/")) && this.handleItemValidation(this.getModel().getProperty(
					"/FinanceAppVisible/"), this.getModel().getProperty(
					"/InsuranceandClaim/ShipHulls/itemData"), oEvent.getSource().getText()) ? this.updateItemAddModel(this.getModel().getProperty(
					"/InsuranceandClaim/ShipHulls/itemData"), {

					InsStartDate: this.getModel().getProperty("/InsuranceandClaim/ShipHulls/NewClaimItemData")[0].ZzinsStrtDat,
					InsExpiryDate: this.getModel().getProperty("/InsuranceandClaim/ShipHulls/NewClaimItemData")[0].ZzinsurExpyDat,
					zzplant: this.getModel().getProperty("/InsuranceandClaim/ShipHulls/NewClaimItemData")[0].Zzplant,
					ebeln: this.getModel().getProperty("/InsuranceandClaim/ShipHulls/NewClaimItemData")[0].Ebeln,
					claim_value: this.getModel().getProperty("/InsuranceandClaim/ShipHulls/NewClaimItemData")[0].claim_value,
					zzinspono: this.getModel().getProperty("/InsuranceandClaim/ShipHulls/NewClaimItemData")[0].Zzinspono,
					ClaimStatus: "",
					TotalPremium: this.getModel().getProperty("/InsuranceandClaim/ShipHulls/NewClaimItemData")[0].ZzinsurAmount,
					expense: this.getModel().getProperty("/InsuranceandClaim/ShipHulls/NewClaimItemData")[0].expense,
					AccidentDate: null,
					ClaimRecDate: null,
					New: true

				}, "/InsuranceandClaim/ShipHulls/itemData") : "";

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-3" && this.handleHeaderValidation(this.getModel().getProperty(
					"/FinanceAppVisible/")) && this.handleItemValidation(this.getModel().getProperty(
					"/FinanceAppVisible/"), this.getModel().getProperty(
					"/InsuranceandClaim/Vehicle/itemData"), oEvent.getSource().getText()) ? this.updateItemAddModel(this.getModel().getProperty(
					"/InsuranceandClaim/Vehicle/itemData"), {

					InsStartDate: this.getModel().getProperty("/InsuranceandClaim/Vehicle/NewClaimItemData")[0].ZzinsStrtDat,
					InsExpiryDate: this.getModel().getProperty("/InsuranceandClaim/Vehicle/NewClaimItemData")[0].ZzinsurExpyDat,
					zzplant: this.getModel().getProperty("/InsuranceandClaim/Vehicle/NewClaimItemData")[0].Zzplant,
					ebeln: this.getModel().getProperty("/InsuranceandClaim/Vehicle/NewClaimItemData")[0].Ebeln,
					claim_value: this.getModel().getProperty("/InsuranceandClaim/Vehicle/NewClaimItemData")[0].claim_value,
					zzinspono: this.getModel().getProperty("/InsuranceandClaim/Vehicle/NewClaimItemData")[0].Zzinspono,
					ClaimStatus: "",
					TotalPremium: this.getModel().getProperty("/InsuranceandClaim/Vehicle/NewClaimItemData")[0].ZzinsurAmount,
					expense: this.getModel().getProperty("/InsuranceandClaim/Vehicle/NewClaimItemData")[0].expense,
					AccidentDate: null,
					ClaimRecDate: null,
					New: true

				}, "/InsuranceandClaim/Vehicle/itemData") : "";

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-4" && this.handleHeaderValidation(this.getModel().getProperty(
					"/FinanceAppVisible/")) && this.handleItemValidation(this.getModel().getProperty(
					"/FinanceAppVisible/"), this.getModel().getProperty(
					"/InsuranceandClaim/Property/itemData"), oEvent.getSource().getText()) ? this.updateItemAddModel(this.getModel().getProperty(
					"/InsuranceandClaim/Property/itemData"), {

					InsStartDate: this.getModel().getProperty("/InsuranceandClaim/Property/NewClaimItemData")[0].ZzinsStrtDat,
					InsExpiryDate: this.getModel().getProperty("/InsuranceandClaim/Property/NewClaimItemData")[0].ZzinsurExpyDat,
					zzplant: this.getModel().getProperty("/InsuranceandClaim/Property/NewClaimItemData")[0].Zzplant,
					ebeln: this.getModel().getProperty("/InsuranceandClaim/Property/NewClaimItemData")[0].Ebeln,
					claim_value: this.getModel().getProperty("/InsuranceandClaim/Property/NewClaimItemData")[0].claim_value,
					zzinspono: this.getModel().getProperty("/InsuranceandClaim/Property/NewClaimItemData")[0].Zzinspono,
					ClaimStatus: "",
					TotalPremium: this.getModel().getProperty("/InsuranceandClaim/Property/NewClaimItemData")[0].ZzinsurAmount,
					expense: this.getModel().getProperty("/InsuranceandClaim/Property/NewClaimItemData")[0].expense,
					AccidentDate: null,
					ClaimRecDate: null,
					New: true

				}, "/InsuranceandClaim/Property/itemData") : "";

			},

			handleHeaderValidation: function (service) {
				var isValid = true;
				var validationProperties;

				if (service === "SSA-FIN-3001-2") {
					validationProperties = [{
							path: "/AccountPayable/ManagePettyCash/Header/FiscalYear",
							condition: true
						}, {
							path: "/CashJornalF4/",
							condition: true
						}, {
							path: "/AccountPayable/ManagePettyCash/Header/Descript/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3001-1") {

					validationProperties = [{
							path: "/AccountPayable/RecordProcess/Header/Descript/",
							condition: true,
							errorMessage: "Please enter Description."
						}, {
							path: "/AccountPayable/RecordProcess/Header/FiscalYear",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3002-1") {

					validationProperties = [{
							path: "/GlaccountF4/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						}, {
							path: "/customercodeF4/",
							condition: true
						}, {
							path: "/AccountsReceivable/Manageandprocess/Header/PostingDate/",
							condition: true
						}, {
							path: "/AccountsReceivable/Manageandprocess/Header/Descript/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3002-2") {

					validationProperties = [{
							path: "/AccountsReceivable/Billing/Header/Descript/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						}, {
							path: "/customercodeF4/",
							condition: true
						}, {
							path: "/AccountsReceivable/Billing/Header/PostingDate/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3003-1") {

					validationProperties = [{
							path: "/CurrencytypeF4/",
							condition: true
						}, {
							path: "/FinancialReviewGeneralClose/PrepareReviewTrail/Header/FiscalYear/",
							condition: true
						}, {
							path: "/ChartofaccountF4/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						}, {
							path: "/FinancialReviewGeneralClose/PrepareReviewTrail/Header/Descript/",
							condition: true
						}, {
							path: "/FinancialReviewGeneralClose/PrepareReviewTrail/Header/FiscalYear/",
							condition: true
						}, {
							path: "/LedgerF4/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3003-2") {

					validationProperties = [{
							path: "/CurrencytypeF4/",
							condition: true
						}, {
							path: "/FinancialReviewGeneralClose/IssueFinancialStatement/Header/Descript/",
							condition: true
						}, {
							path: "/ChartofaccountF4/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						}, {
							path: "/LedgerF4/",
							condition: true
						},

						{
							path: "/FinancialReviewGeneralClose/IssueFinancialStatement/Header/Gjahr/",
							condition: true
						}, {
							path: "/FinancialReviewGeneralClose/IssueFinancialStatement/Header/Zzyearofmanf/",
							condition: true
						}, {
							path: "/FinancialstatmentF4/",
							condition: true
						}, {
							path: "/LanguageF4/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3003-3") {

					validationProperties = [{
							path: "/PostingF4/",
							condition: true
						}, {
							path: "/FinancialReviewGeneralClose/FinancialClose/Header/Descript/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3003-4") {

					validationProperties = [{
							path: "/GlaccountF4/",
							condition: true
						}, {
							path: "/FinancialReviewGeneralClose/PeriodEndReconcilation/Header/Descript/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						},

						{
							path: "/FinancialReviewGeneralClose/PeriodEndReconcilation/Header/OpenDate/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3003-5") {

					validationProperties = [{
							path: "/FinancialReviewGeneralClose/MaintainChart/Header/Descript/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3004-1") {

					validationProperties = [{
							path: "/FinancialReviewGeneralClose/IssueGovernment/Header/Descript/",
							condition: true
						}, {
							path: "/FmareaF4/",
							condition: true
						}, {
							path: "/FinancialReviewGeneralClose/IssueGovernment/Header/FiscalYear",
							condition: true
						}, {
							path: "/FinancialReviewGeneralClose/IssueGovernment/Header/Poper",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3005-1") {

					validationProperties = [{
							path: "/AssetLifecycle/DepreciationProcess/Header/Descript/",
							condition: true
						}, {
							path: "/AssetLifecycle/DepreciationProcess/Header/Poper/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						}, {
							path: "/AssetLifecycle/DepreciationProcess/Header/FiscalYear/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3005-2") {

					validationProperties = [{
							path: "/AssetLifecycle/PerfomAsset/Header/Descript/",
							condition: true
						}, {
							path: "/AssetLifecycle/PerfomAsset/Header/Brdatu/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						}, {
							path: "/DepreciationF4/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3005-3A") {

					validationProperties = [{
							path: "/costF4/",
							condition: true
						}, {
							path: "/AssestclassF4/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						},

						{
							path: "/AssetLifecycle/RecordAsset/Header/Descript/",
							condition: true
						}, {
							path: "/AssetLifecycle/RecordAsset/Header/Txt50/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3005-3B") {

					validationProperties = [{
							path: "/CompanycodeF4/",
							condition: true
						},

						{
							path: "/AssetLifecycle/SaleofAssets/Header/Descript/",
							condition: true
						}, {
							path: "/AssestF4/",
							condition: true
						},

						{
							path: "/AssetLifecycle/SaleofAssets/Header/Budat/",
							condition: true
						},

						{
							path: "/DepreciationF4/",
							condition: true
						}, {
							path: "/AssetLifecycle/SaleofAssets/Header/Bzdat/",
							condition: true
						},

						{
							path: "/AssetLifecycle/SaleofAssets/Header/Erlbt/",
							condition: true
						}
					];

				} else if (service === "SSA-FIN-3005-3C") {

					validationProperties = [{
							path: "/AssetLifecycle/RetirementofAssets/Header/Descript/",
							condition: true
						}, {
							path: "/CompanycodeF4/",
							condition: true
						},

						{
							path: "/AssetLifecycle/RetirementofAssets/Header/Budat/",
							condition: true
						},

						{
							path: "/AssetLifecycle/RetirementofAssets/Header/Bzdat/",
							condition: true
						},

						{
							path: "/AssetLifecycle/RetirementofAssets/Header/Anbtr/",
							condition: true
						}, {
							path: "/AccountingprincipalF4/",
							condition: true
						}, {
							path: "/AssestF4/",
							condition: true
						},

						{
							path: "/DepreciationF4/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3005-4") {

					validationProperties = [{
							path: "/CompanycodeF4/",
							condition: true
						},

						{
							path: "/AssestF4/",
							condition: true
						},

						{
							path: "/costF4/",
							condition: true
						}, {
							path: "/AssetLifecycle/TransferofAssets/Header/Descript/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3005-5") {

					validationProperties = [{
							path: "/AssetLifecycle/ProjectCaptilization/Header/Descript/",
							condition: true
						}, {
							path: "/AssetLifecycle/ProjectCaptilization/Header/FiscalYear/",
							condition: true
						}, {
							path: "/AssetLifecycle/ProjectCaptilization/Header/Poper/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3007-3") {

					validationProperties = [{
							path: "/InsuranceF4/",
							condition: true
						}

					];

				} else if (service === "SSA-FIN-3006-1") {
					validationProperties = [{

							path: "/InsuranceandClaim/CreateInsurance/Header/Descript/",
							condition: true
						}, {
							path: "/InsuranceandClaim/CreateInsurance/Header/Zzdeprate/",
							condition: true
						},

						{
							path: "/PolicyTypeF4/",
							condition: true
						},

						{
							path: "/InsuranceandClaim/CreateInsurance/Header/Zzinsurper/",
							condition: true
						}

					];
				} else if (service === "SSA-FIN-3007-1") {
					validationProperties = [{
							path: "/InsuranceF4/",
							condition: true
						}

					];
				} else if (service === "SSA-FIN-3007-2") {
					validationProperties = [{
							path: "/InsuranceF4/",
							condition: true
						}

					];
				} else if (service === "SSA-FIN-3007-4") {
					validationProperties = [{
							path: "/InsuranceF4/",
							condition: true
						}

					];
				}
				if (!validationProperties) return true;

				validationProperties.forEach(property => {
					var propertyValue = this.getModel().getProperty(property.path);

					if (!propertyValue || (property.condition && !property.condition)) {
						this.getModel().setProperty(property.path, "");
						this.getModel().setProperty("/ValidationFlag/", true);
						isValid = false;

					}
				});

				if (!isValid) {
					MessageToast.show("Please Enter all Mandatory Fields");
				}

				return isValid;
			},

			handleItemValidation: function (service, aData, action) {
				debugger;
				var isValid = true;

				if (service === "SSA-FIN-3001-2") {
					var itemCheck = !aData || aData.length === 0 ? false : true;

					if (!itemCheck) {
						MessageToast.show("item Data is required to Submit the request");
						isValid = false;
						return isValid;
					}

				} else if (service === "SSA-FIN-3001-1") {
					var itemCheck = !aData || aData.length === 0 ? false : true;

					if (!itemCheck) {
						MessageToast.show("item Data is required to Submit the request");
						isValid = false;
						return isValid;
					}
				} else if (service === "SSA-FIN-3002-1") {
					var itemCheck = !aData || aData.length === 0 ? false : true;

					if (!itemCheck) {
						MessageToast.show("item Data is required to Submit the request");
						isValid = false;
						return isValid;
					}
				} else if (service === "SSA-FIN-3002-2") {
					var itemCheck = !aData || aData.length === 0 ? false : true;

					if (!itemCheck) {
						MessageToast.show("item Data is required to Submit the request");
						isValid = false;
						return isValid;
					}
				} else if (service === "SSA-FIN-3007-1") {

					var itemCheck = aData && aData.length > 0;
					var hasNewClaim = aData.some(element => element.New === true);
					if (action === 'Add' && hasNewClaim) {
						MessageToast.show("Only one claim can be added");
						isValid = false;
						return isValid;
					} else if (!aData.length && action === 'Submit') {
						MessageToast.show("Claim Data Required to Submit");
						isValid = false;
						return isValid;
					} else if (!hasNewClaim && aData.length === 3) {
						MessageToast.show("Please add at least one claim");
						isValid = false;
						return isValid;
					}

				} else if (service === "SSA-FIN-3007-2") {
					var itemCheck = aData && aData.length > 0;
					var hasNewClaim = aData.some(element => element.New === true);
					if (action === 'Add' && hasNewClaim) {
						MessageToast.show("Only one claim can be added");
						isValid = false;
						return isValid;
					} else if (!aData.length && action === 'Submit') {
						MessageToast.show("Claim Data Required to Submit");
						isValid = false;
						return isValid;
					} else if (!hasNewClaim && aData.length === 3) {
						MessageToast.show("Please add at least one claim");
						isValid = false;
						return isValid;
					}

				} else if (service === "SSA-FIN-3007-3") {
					var itemCheck = aData && aData.length > 0;
					var hasNewClaim = aData.some(element => element.New === true);
					if (action === 'Add' && hasNewClaim) {
						MessageToast.show("Only one claim can be added");
						isValid = false;
						return isValid;
					} else if (!aData.length && action === 'Submit') {
						MessageToast.show("Claim Data Required to Submit");
						isValid = false;
						return isValid;
					} else if (!hasNewClaim && aData.length === 3) {
						MessageToast.show("Please add at least one claim");
						isValid = false;
						return isValid;
					}

				} else if (service === "SSA-FIN-3007-4") {
					var itemCheck = aData && aData.length > 0;
					var hasNewClaim = aData.some(element => element.New === true);
					if (action === 'Add' && hasNewClaim) {
						MessageToast.show("Only one claim can be added");
						isValid = false;
						return isValid;
					} else if (!aData.length && action === 'Submit') {
						MessageToast.show("Claim Data Required to Submit");
						isValid = false;
						return isValid;
					} else if (!hasNewClaim && aData.length === 3) {
						MessageToast.show("Please add at least one claim");
						isValid = false;
						return isValid;
					}

				}

				return isValid;
			},

			updateItemAddModel: function (oModel, obj, path) {

				var oItems = oModel.map(function (oItem) {
					return Object.assign({}, oItem);
				});
				oItems.push(obj);
				this.getModel().setProperty(`${path}`, oItems);
			},
			onDeleteItemPress: function (oEvent) {
				var iRowNumberToDelete = this.extractIndexFromPath(oEvent.getSource().getBindingContext().getPath());
				// var iRowNumberToDelete = parseInt(oEvent.getSource().getBindingContext().getPath().split("/")[3]);
				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-1" ? this.updateItemDeleteModel(iRowNumberToDelete, this.getModel()
					.getProperty(
						"/InsuranceandClaim/MarineTransportation/itemData")) : "";

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-3" ? this.updateItemDeleteModel(iRowNumberToDelete, this.getModel()
					.getProperty(
						"/InsuranceandClaim/Vehicle/itemData")) : "";

				this.getModel().getProperty("/FinanceAppVisible/") === "SSA-FIN-3007-2" ? this.updateItemDeleteModel(iRowNumberToDelete, this.getModel()
					.getProperty(
						"/InsuranceandClaim/ShipHulls/itemData")) : "";

			},
			updateItemDeleteModel: function (index, oModel) {
				oModel.splice(index, 1);
				this.getModel().refresh();
			},
			onFileAdded: function (oEvent) {
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

			},

			_addData: function (Filecontent, Filename, Filetype, Filesize) {
				var oModel = this.getModel().getProperty("/UploadedData");

				if (oModel.length >= 5) {
					MessageToast.show("Upto 5 Documents are allowed to upload");
					return false;
				}
				var oItems = oModel.map(function (oItem) {
					return Object.assign({}, oItem);
				});
				oItems.push({
					Filename: Filename,
					Mimetype: Filetype,
					Value: Filecontent,
					Filesize: Filesize

				});
				this.getModel().setProperty("/UploadedData", oItems);

			},

			onDeleteAttachment: function (oEvent) {
				var iRowNumberToDelete = parseInt(oEvent.getSource().getBindingContext().getPath().split("/")[3]);
				var aTableData = this.getModel().getProperty("/UploadedData");
				aTableData.splice(iRowNumberToDelete, 1);
				this.getModel().refresh();

			},
			handleMissmatch: function () {
				this.handleFileMissmatch();
			},
			onFileSizeExceed: function () {

				this.handleFileSizeExceed();
			},
			onCancel: function () {
				this.navigationBack();
			}

		})
	})