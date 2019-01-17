/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/util/MockServer', 'sap/ui/model/odata/ODataModel'],
	function(MockServer, ODataModel) {
		"use strict";
		return {

			parse: function(oMetadata, sMetadata) {
				if (!this._index) {
					this._index = 0;
				}
				var sUri = "/annotationhandler" + this._index++ + "/";
				var oMockStub = new MockServer({
					rootUri: sUri,
					requests: [{
						method: "GET",
						path: new RegExp("\\$metadata"),
						response: function(oXhr) {
							oXhr.respond(200, {
								"Content-Type": "application/xml;charset=utf-8"
							}, sMetadata);
						}
					}]
				});
				oMockStub.start();

				var mModelOptions = {
					annotationURI: [
						sUri + "$metadata"
					],
					json: true
				};

				var oModel = new ODataModel(sUri, mModelOptions);
				var oAnnotations = oModel.getServiceAnnotations();
				oMockStub.destroy();
				return oAnnotations;
			}
		};

	}, /* bExport= */ true);