/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Element","./library","sap/ui/events/F6Navigation","sap/base/Log"],function(t,e,a,i){"use strict";var r=e.ID;var u=t.extend("sap.ui.core.CustomData",{metadata:{library:"sap.ui.core",properties:{key:{type:"string",group:"Data",defaultValue:null},value:{type:"any",group:"Data",defaultValue:null},writeToDom:{type:"boolean",group:"Data",defaultValue:false}},designtime:"sap/ui/core/designtime/CustomData.designtime"}});u.prototype.setValue=function(t){this.setProperty("value",t,true);var e=this.getParent();if(e&&e.getDomRef()){var a=this._checkWriteToDom(e);if(a){e.$().attr(a.key,a.value)}}return this};u.prototype._checkWriteToDom=function(t){if(!this.getWriteToDom()){return null}var e=this.getKey();var u=this.getValue();if(typeof u!="string"){i.error("CustomData with key "+e+" should be written to HTML of "+t+" but the value is not a string.");return null}if(!r.isValid(e)||e.indexOf(":")!=-1){i.error("CustomData with key "+e+" should be written to HTML of "+t+" but the key is not valid (must be a valid sap.ui.core.ID without any colon).");return null}if(e==a.fastNavigationKey){u=/^\s*(x|true)\s*$/i.test(u)?"true":"false"}else if(e.indexOf("sap-ui")==0){i.error("CustomData with key "+e+" should be written to HTML of "+t+" but the key is not valid (may not start with 'sap-ui').");return null}return{key:"data-"+e,value:u}};return u});