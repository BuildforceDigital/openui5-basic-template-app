/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/base/Log","sap/base/util/isPlainObject","sap/ui/thirdparty/jquery"],function(e,t,a,i){"use strict";var n=e.extend("sap.m.SelectionDetailsItemLine",{metadata:{library:"sap.m",properties:{label:{type:"string",group:"Data"},value:{type:"any",group:"Data"},displayValue:{type:"string",defaultValue:null,group:"Data"},unit:{type:"string",defaultValue:null,group:"Data"},lineMarker:{type:"string",defaultValue:null,group:"Data"}}}});n.prototype._getValueToRender=function(){var e="",n=this.getValue();if(i.type(n)==="string"){e=n}else if(i.type(n)==="number"){e=n.toString()}else if(a(n)){if(n.day&&n.day.length>0){e=n.day}if(n.time&&n.time.length>0){e=e.length>0?n.time+" "+e:n.time}}else{t.warning("Value '"+n+"' is not supported. Expected type is a string, number or a plain object, including date and time properties of type string.")}return e};return n});