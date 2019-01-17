/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_GroupLock","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(t,e,n,i,o){"use strict";var r,s=-9007199254740991;function h(t,e,n,o){var r,s=[t.fetchValue(e,null,o)],h=t.getPath(e);if(n){s.push(t.oModel.getMetaModel().fetchUI5Type(h))}return i.all(s).then(function(t){var e=t[1],i=t[0];if(i&&typeof i==="object"){r=new Error("Accessed value is not primitive: "+h);r.isNotPrimitive=true;throw r}return n?e.formatValue(i,"string"):i})}var u=o.extend("sap.ui.model.odata.v4.Context",{constructor:function(t,e,n,r,s){o.call(this,t,n);this.oBinding=e;this.oCreatePromise=s&&Promise.resolve(s).then(function(){});this.oSyncCreatePromise=s&&i.resolve(s);this.iIndex=r}}),a="sap.ui.model.odata.v4.Context";u.prototype._delete=function(t){var e=this;if(this.isTransient()){return this.oBinding._delete(t,"n/a",this)}return this.fetchCanonicalPath().then(function(n){return e.oBinding._delete(t,n.slice(1),e)})};u.prototype.checkUpdate=function(){return i.all(this.oModel.getDependentBindings(this).map(function(t){return t.checkUpdate()}))};u.prototype.created=function(){return this.oCreatePromise};u.prototype.delete=function(t){var e,n=this;this.oBinding.checkSuspended();this.oModel.checkGroupId(t);e=this.oModel.lockGroup(t,true,this);return this._delete(e).catch(function(t){e.unlock(true);n.oModel.reportError("Failed to delete "+n,a,t);throw t})};u.prototype.destroy=function(){this.oModel.getDependentBindings(this).forEach(function(t){t.setContext(undefined)});this.oBinding=undefined;this.oModel=undefined;o.prototype.destroy.apply(this)};u.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this)};u.prototype.fetchValue=function(t,n,o){if(this.iIndex===s){return i.resolve()}return this.oBinding.fetchValue(t&&t[0]==="/"?t:e.buildPath(this.sPath,t),n,o)};u.prototype.getBinding=function(){return this.oBinding};u.prototype.getCanonicalPath=e.createGetMethod("fetchCanonicalPath",true);u.prototype.getGroupId=function(){return this.oBinding.getGroupId()};u.prototype.getIndex=function(){if(this.oBinding.aContexts&&this.oBinding.aContexts[-1]){return this.iIndex+1}return this.iIndex};u.prototype.getObject=function(t){return e.publicClone(this.getValue(t))};u.prototype.getProperty=function(t,e){var i,o;this.oBinding.checkSuspended();o=h(this,t,e,true);if(o.isRejected()){o.caught();i=o.getResult();if(i.isNotPrimitive){throw i}else if(!i.$cached){n.warning(i.message,t,a)}}return o.isFulfilled()?o.getResult():undefined};u.prototype.getQueryOptionsForPath=function(t){return this.oBinding.getQueryOptionsForPath(t)};u.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId()};u.prototype.getValue=function(t){var e,n=this;this.oBinding.checkSuspended();e=this.fetchValue(t,null,true).catch(function(t){if(!t.$cached){n.oModel.reportError("Unexpected error",a,t)}});if(e.isFulfilled()){return e.getResult()}};u.prototype.hasPendingChanges=function(){return this.oModel.getDependentBindings(this).some(function(t){return t.hasPendingChanges()})};u.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};u.prototype.patch=function(t){return this.withCache(function(e,n){e.patch(n,t)},"")};u.prototype.refresh=function(t,e){this.oModel.checkGroupId(t);this.oBinding.checkSuspended();if(this.oBinding.hasPendingChangesForPath(this.getPath())||this.oBinding.hasPendingChangesInDependents(this)){throw new Error("Cannot refresh entity due to pending changes: "+this)}if(this.oBinding.refreshSingle){if(!this.oBinding.isRefreshable()){throw new Error("Binding is not refreshable; cannot refresh entity: "+this)}this.oBinding.refreshSingle(this,this.oModel.lockGroup(t,true,this),e)}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+e)}if(!this.oBinding.refreshReturnValueContext(this,t)){this.oBinding.refresh(t)}}};u.prototype.requestCanonicalPath=e.createRequestMethod("fetchCanonicalPath");u.prototype.requestObject=function(t){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(t)).then(e.publicClone)};u.prototype.requestProperty=function(t,e){this.oBinding.checkSuspended();return Promise.resolve(h(this,t,e))};u.prototype.requestSideEffects=function(t){var e=this.oBinding.oCachePromise.getResult(),n;this.oBinding.checkSuspended();if(!e||!e.requestSideEffects){throw new Error("Unsupported context: "+this)}if(!t||!t.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions")}n=t.map(function(t){if(t&&typeof t==="object"){if(t.$PropertyPath){return t.$PropertyPath}if("$NavigationPropertyPath"in t){return t.$NavigationPropertyPath}}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(t))});return Promise.resolve(this.oBinding.requestSideEffects(this.getUpdateGroupId(),n,this)).then(function(){})};u.prototype.setIndex=function(t){this.iIndex=t};u.prototype.toString=function(){var t="";if(this.iIndex!==undefined){t="["+this.iIndex+(this.isTransient()?"|transient":"")+"]"}return this.sPath+t};u.prototype.withCache=function(t,n){if(this.iIndex===s){return i.resolve()}return this.oBinding.withCache(t,n[0]==="/"?n:e.buildPath(this.sPath,n))};r={create:function(t,e,n,i,o){if(n[0]!=="/"){throw new Error("Not an absolute path: "+n)}if(n.slice(-1)==="/"){throw new Error("Unsupported trailing slash: "+n)}return new u(t,e,n,i,o)}};Object.defineProperty(r,"VIRTUAL",{value:s});return r},false);