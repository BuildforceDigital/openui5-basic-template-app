/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ClientContextBinding","./ClientListBinding","./ClientPropertyBinding","./ClientTreeBinding","./Model","sap/ui/thirdparty/jquery"],function(e,t,n,i,r,s){"use strict";var a=r.extend("sap.ui.model.ClientModel",{constructor:function(e){r.apply(this,arguments);this.bCache=true;this.aPendingRequestHandles=[];this.mUnsupportedFilterOperators={Any:true,All:true};if(typeof e=="string"){this.loadData(e)}},metadata:{publicMethods:["loadData","setData","getData","setProperty","forceNoCache"]}});a.prototype.getData=function(){return this.oData};a.prototype.createBindingContext=function(e,t,n,i){if(typeof t=="function"){i=t;t=null}if(typeof n=="function"){i=n;n=null}var r=this.resolve(e,t),s=r==undefined?undefined:this.getContext(r?r:"/");if(!s){s=null}if(i){i(s)}return s};a.prototype._ajax=function(e){var t=this;if(this.bDestroyed){return}function n(e){return function(){if(t.aPendingRequestHandles){var n=t.aPendingRequestHandles.indexOf(i);if(n>-1){t.aPendingRequestHandles.splice(n,1)}}if(!(i&&i.bSuppressErrorHandlerCall)){e.apply(this,arguments)}}}e.success=n(e.success);e.error=n(e.error);var i=s.ajax(e);if(e.async){this.aPendingRequestHandles.push(i)}};a.prototype.destroy=function(){r.prototype.destroy.apply(this,arguments);if(this.aPendingRequestHandles){for(var e=this.aPendingRequestHandles.length-1;e>=0;e--){var t=this.aPendingRequestHandles[e];if(t&&t.abort){t.bSuppressErrorHandlerCall=true;t.abort()}}delete this.aPendingRequestHandles}};a.prototype.destroyBindingContext=function(e){};a.prototype.bindContext=function(t,n,i){var r=new e(this,t,n,i);return r};a.prototype.updateBindings=function(e){this.checkUpdate(e)};a.prototype.forceNoCache=function(e){this.bCache=!e};return a});