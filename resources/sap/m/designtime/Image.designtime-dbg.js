/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.Image control
sap.ui.define([], function() {
	"use strict";

	return {
		name : {
			singular : "IMAGE_NAME",
			plural : "IMAGE_NAME_PLURAL"
		},
		palette : {
			group : "DISPLAY",
			icons : {
				svg : "sap/m/designtime/Image.icon.svg"
			}
		},
		aggregations : {
			detailBox : {
				ignore : true
			}
		},
		actions : {
			remove : {
				changeType : "hideControl"
			},
			reveal : {
				changeType : "unhideControl"
			}
		},
		templates: {
			create: "sap/m/designtime/Image.create.fragment.xml"
		}
	};
}, /* bExport= */false);
