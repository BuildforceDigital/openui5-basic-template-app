/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,i=e.Severity,a=e.Audiences;var n={id:"exclusiveValueDateValueBindingRule",audiences:[a.Control],categories:[t.Bindings],enabled:true,minversion:"1.28",title:"DatePicker: Only one of the value or dateValue properties can be bound",description:"Only one of the value or dateValue properties can be bound",resolution:"Choose and bind one of the properties value or dateValue. They both serve the same purpose",resolutionurls:[{text:"SAP Fiori Design Guidelines: DatePicker",href:"https://experience.sap.com/fiori-design-web/date-picker/"}],check:function(e,t,a){a.getElementsByClassName("sap.m.DatePicker").forEach(function(t){if(t.getBinding("value")&&t.getBinding("dateValue")){var a=t.getId(),n=t.getMetadata().getElementName();e.addIssue({severity:i.High,details:"DatePicker '"+n+"' ("+a+") has both value and dataValue properties bound.",context:{id:a}})}})}};var s={id:"dateTimeBindingConstraintRule",audiences:[a.Control],categories:[t.Bindings],enabled:true,minversion:"1.28",title:"DatePicker: sap.ui.model.odata.type.DateTime value binding should use displayFormat:'Date' constraint",description:"sap.ui.model.odata.type.DateTime value binding should use displayFormat:'Date' constraint",resolution:"If you are using binding type sap.ui.model.odata.type.DateTime you also need to specify binding constraint like this:\n"+"value: {path : 'path_to_value', type : 'sap.ui.model.odata.type.DateTime', constraints : {displayFormat : 'Date'}}",resolutionurls:[{text:"SAP Fiori Design Guidelines: DatePicker",href:"https://experience.sap.com/fiori-design-web/date-picker/"}],check:function(e,t,a){a.getElementsByClassName("sap.m.DatePicker").forEach(function(t){var a=t.getBinding("value");if(a&&a.getType()instanceof sap.ui.model.odata.type.DateTime&&(!a.getType().oConstraints||!a.getType().oConstraints.isDateOnly)){var n=t.getId(),s=t.getMetadata().getElementName();e.addIssue({severity:i.High,details:"DatePicker '"+s+"' ("+n+") is bound to a model of type sap.ui.model.odata.type.DateTime and the displayFormat is not 'Date'",context:{id:n}})}})}};var o={id:"jsonValueBindingIsCorrect",audiences:[a.Control],categories:[t.Bindings],enabled:true,minversion:"1.28",title:"DatePicker: Binding type sap.ui.model.odata.type.Date is not correct for JSON binding",description:"sap.ui.model.odata.type.Date is not correct for JSON binding. The correct type is sap.ui.model.type.Date",resolution:"Use binding type sap.ui.model.type.Date for JSON binding",resolutionurls:[{text:"SAP Fiori Design Guidelines: DatePicker",href:"https://experience.sap.com/fiori-design-web/date-picker/"}],check:function(e,t,a){a.getElementsByClassName("sap.m.DatePicker").forEach(function(t){var a=t.getBinding("value");if(a&&t.getModel()instanceof sap.ui.model.json.JSONModel&&a.getType()instanceof sap.ui.model.odata.type.Date){var n=t.getId(),s=t.getMetadata().getElementName();e.addIssue({severity:i.Medium,details:"DatePicker '"+s+"' ("+n+") is bound to a model of type sap.ui.model.odata.type.Date but it should be sap.ui.model.type.Date",context:{id:n}})}})}};var r={id:"dateValueHasHoursMinutesSeconds",audiences:[a.Control],categories:[t.Usage],enabled:true,minversion:"1.28",title:"DatePicker: dateValue has hours, minutes or seconds",description:"The dateValue contains JS Date object with hours, minutes and seconds different than 0, 0, 0, local time - warхing.",resolution:"Do not set hours, minutes and seconds, when you set dateValue",resolutionurls:[{text:"SAP Fiori Design Guidelines: DatePicker",href:"https://experience.sap.com/fiori-design-web/date-picker/"}],check:function(e,t,a){a.getElementsByClassName("sap.m.DatePicker").forEach(function(t){var a=t.getDateValue();if(a&&(a.getHours()||a.getMinutes()||a.getSeconds())){var n=t.getId(),s=t.getMetadata().getElementName();e.addIssue({severity:i.Medium,details:"DatePicker '"+s+"' ("+n+")'s dateValue has hours, minutes or seconds set",context:{id:n}})}})}};return[n,s,o,r]},true);