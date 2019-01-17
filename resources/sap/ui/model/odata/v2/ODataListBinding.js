/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/Context","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/odata/ODataUtils","sap/ui/model/odata/CountMode","sap/ui/model/odata/Filter","sap/ui/model/odata/OperationMode","sap/ui/model/ChangeReason","sap/ui/model/Filter","sap/ui/model/FilterProcessor","sap/ui/model/Sorter","sap/ui/model/SorterProcessor","sap/base/util/array/diff","sap/base/util/uid","sap/base/util/deepEqual","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery"],function(t,e,s,i,a,n,r,h,o,l,u,d,f,p,g,c,y,b){"use strict";var m=s.extend("sap.ui.model.odata.v2.ODataListBinding",{constructor:function(t,e,i,n,r,h){s.apply(this,arguments);this.sFilterParams=null;this.sSortParams=null;this.sRangeParams=null;this.sCustomParams=this.oModel.createCustomParams(this.mParameters);this.iStartIndex=0;this.iLength=0;this.bPendingChange=false;this.aAllKeys=null;this.aKeys=[];this.sCountMode=h&&h.countMode||this.oModel.sDefaultCountMode;this.sOperationMode=h&&h.operationMode||this.oModel.sDefaultOperationMode;this.bCreatePreliminaryContext=h&&h.createPreliminaryContext||t.bPreliminaryContext;this.bUsePreliminaryContext=h&&h.usePreliminaryContext||t.bPreliminaryContext;this.bRefresh=false;this.bNeedsUpdate=false;this.bDataAvailable=false;this.bIgnoreSuspend=false;this.bPendingRefresh=false;this.sGroupId=undefined;this.sRefreshGroupId=undefined;this.bLengthRequested=false;this.bUseExtendedChangeDetection=true;this.bFaultTolerant=h&&h.faultTolerant;this.bLengthFinal=false;this.iLastEndIndex=0;this.aLastContexts=null;this.aLastContextData=null;this.bInitial=true;this.mRequestHandles={};this.oCountHandle=null;this.bSkipDataEvents=false;this.bUseExpandedList=false;this.oCombinedFilter=null;this.oModel.checkFilterOperation(this.aApplicationFilters);if(h&&(h.batchGroupId||h.groupId)){this.sGroupId=h.groupId||h.batchGroupId}this.iThreshold=h&&h.threshold||0;this.bThresholdRejected=false;if(this.sCountMode==a.None){this.bThresholdRejected=true}var o=this.checkExpandedList();if(!o){this.resetData()}},metadata:{publicMethods:["getLength"]}});m.prototype.getContexts=function(t,e,s){if(this.bInitial){return[]}if(!this.bLengthFinal&&this.sOperationMode==r.Auto&&(this.sCountMode==a.Request||this.sCountMode==a.Both)){if(!this.bLengthRequested){this._getLength();this.bLengthRequested=true}return[]}if(!this.bLengthFinal&&!this.bPendingRequest&&!this.bLengthRequested){this._getLength();this.bLengthRequested=true}this.iLastLength=e;this.iLastStartIndex=t;this.iLastThreshold=s;if(!t){t=0}if(!e){e=this.oModel.iSizeLimit;if(this.bLengthFinal&&this.iLength<e){e=this.iLength}}if(!s){s=0}if(this.sOperationMode==r.Auto){if(this.iThreshold>=0){s=Math.max(this.iThreshold,s)}}var i=true,n=this._getContexts(t,e),h=[],o;if(this.useClientMode()){if(!this.aAllKeys&&!this.bPendingRequest&&this.oModel.getServiceMetadata()){this.loadData();n.dataRequested=true}}else{o=this.calculateSection(t,e,s,n);i=n.length!==e&&!(this.bLengthFinal&&n.length>=this.iLength-t);if(this.oModel.getServiceMetadata()){if(!this.bPendingRequest&&o.length>0&&(i||e<o.length)){this.loadData(o.startIndex,o.length);n.dataRequested=true}}}if(this.bRefresh){this.bRefresh=false}else{for(var l=0;l<n.length;l++){h.push(this.getContextData(n[l]))}if(this.bUseExtendedChangeDetection){if(this.aLastContexts&&t<this.iLastEndIndex){n.diff=f(this.aLastContextData,h)}}this.iLastEndIndex=t+e;this.aLastContexts=n.slice(0);this.aLastContextData=h.slice(0)}return n};m.prototype.getCurrentContexts=function(){return this.aLastContexts||[]};m.prototype.getEntryKey=function(t){return t.getPath()};m.prototype.getEntryData=function(t){return JSON.stringify(t.getObject(this.mParameters))};m.prototype._getContexts=function(t,e){var s=[],i,a;if(!t){t=0}if(!e){e=this.oModel.iSizeLimit;if(this.bLengthFinal&&this.iLength<e){e=this.iLength}}for(var n=t;n<t+e;n++){a=this.aKeys[n];if(!a){break}i=this.oModel.getContext("/"+a);s.push(i)}return s};m.prototype.calculateSection=function(t,e,s,i){var a,n,r,h,o,l={},u;n=t;a=0;for(var d=t;d>=Math.max(t-s,0);d--){u=this.aKeys[d];if(!u){h=d+1;break}}for(var f=t+e;f<t+e+s;f++){u=this.aKeys[f];if(!u){r=f;break}}o=t-h;if(h&&t>s&&o<s){if(i.length!==e){n=t-s}else{n=h-s}a=s}n=Math.max(n,0);if(n===t){n+=i.length}if(i.length!==e){a+=e-i.length}o=r-t-e;if(o===0){a+=s}if(r&&o<s&&o>0){if(n>t){n=r;a+=s}}if(this.bLengthFinal&&this.iLength<a+n){a=this.iLength-n}l.startIndex=n;l.length=a;return l};m.prototype.setContext=function(e){var s,i=e&&e.bCreated,a=e&&e.isRefreshForced(),n=e&&e.isUpdated(),r=e&&e.isPreliminary();if(this.bInitial||!this.isRelative()){return}if(r&&!this.bUsePreliminaryContext){return}if(n&&this.bUsePreliminaryContext){this._fireChange({reason:h.Context});return}if(t.hasChanged(this.oContext,e)){this.oContext=e;s=this.oModel.resolve(this.sPath,this.oContext);if(!this._checkPathType()){c.error("List Binding is not bound against a list for "+s)}if(!s||i){if(this.aAllKeys||this.aKeys.length>0||this.iLength>0){this.aAllKeys=null;this.aKeys=[];this.iLength=0;this.bLengthFinal=true;this._fireChange({reason:h.Context})}return}this._initSortersFilters();if(this.checkExpandedList()&&!a){this._fireChange({reason:h.Context})}else{this._refresh()}}};m.prototype.checkExpandedList=function(t){var e=!!this.oModel.resolve(this.sPath,this.oContext),s=this.oModel._getObject(this.sPath,this.oContext);if(!e||s===undefined||this.sOperationMode===r.Server&&(this.aApplicationFilters.length>0||this.aFilters.length>0||this.aSorters.length>0)){this.bUseExpandedList=false;this.aExpandRefs=undefined;return false}else{this.bUseExpandedList=true;if(Array.isArray(s)){if(!t&&(this.oModel._isReloadNeeded("/"+s[0],this.mParameters)||this.oModel._isReloadNeeded("/"+s[s.length-1],this.mParameters))){this.bUseExpandedList=false;this.aExpandRefs=undefined;return false}this.aExpandRefs=s;this.aAllKeys=s;this.iLength=s.length;this.bLengthFinal=true;this.bDataAvailable=true;this.applyFilter();this.applySort()}else{this.aExpandRefs=undefined;this.aAllKeys=null;this.aKeys=[];this.iLength=0;this.bLengthFinal=true;this.bDataAvailable=true}return true}};m.prototype.updateExpandedList=function(t){if(this.aExpandRefs){for(var e=0;e<t.length;e++){this.aExpandRefs[e]=t[e]}this.aExpandRefs.length=t.length}};m.prototype.useClientMode=function(){return this.sOperationMode===r.Client||this.sOperationMode===r.Auto&&!this.bThresholdRejected||this.sOperationMode!==r.Server&&this.bUseExpandedList};m.prototype.loadData=function(t,e){var s=this,i=false,n=p(),o;if(t||e){this.sRangeParams="$skip="+t+"&$top="+e;this.iStartIndex=t}else{t=this.iStartIndex}var l=[];if(this.sRangeParams&&!this.useClientMode()){l.push(this.sRangeParams)}if(this.sSortParams){l.push(this.sSortParams)}if(this.sFilterParams&&!this.useClientMode()){l.push(this.sFilterParams)}if(this.sCustomParams){l.push(this.sCustomParams)}if(this.sCountMode==a.InlineRepeat||!this.bLengthFinal&&(this.sCountMode===a.Inline||this.sCountMode===a.Both)){l.push("$inlinecount=allpages");i=true}function u(a){if(i&&a.__count!==undefined){s.iLength=parseInt(a.__count);s.bLengthFinal=true;if(s.sOperationMode==r.Auto){if(s.iLength<=s.mParameters.threshold){s.bThresholdRejected=false}else{s.bThresholdRejected=true;delete s.mRequestHandles[n];s.bPendingRequest=false;s.bNeedsUpdate=true;return}}}if(s.useClientMode()){s.aKeys=[];b.each(a.results,function(t,e){s.aKeys[t]=s.oModel._getKey(e)});s.updateExpandedList(s.aKeys);s.aAllKeys=s.aKeys.slice();s.iLength=s.aKeys.length;s.bLengthFinal=true;s.applyFilter();s.applySort()}else{if(a.results.length>0){b.each(a.results,function(e,i){s.aKeys[t+e]=s.oModel._getKey(i)});if(s.iLength<t+a.results.length){s.iLength=t+a.results.length;s.bLengthFinal=false}if(!a.__next&&(a.results.length<e||e===undefined)){s.iLength=t+a.results.length;s.bLengthFinal=true}}else{if(s.bFaultTolerant&&a.__next){s.iLength=t;s.bLengthFinal=true}if(t===0){s.iLength=0;s.aKeys=[];s.bLengthFinal=true}if(t===s.iLength){s.bLengthFinal=true}}}delete s.mRequestHandles[n];s.bPendingRequest=false;s.bNeedsUpdate=true;s.bIgnoreSuspend=true;s.oModel.callAfterUpdate(function(){s.fireDataReceived({data:a})})}function d(t){var e=t.statusCode==0;delete s.mRequestHandles[n];s.bPendingRequest=false;if(s.bFaultTolerant){s.iLength=s.aKeys.length;s.bLengthFinal=true;s.bDataAvailable=true}else if(!e){s.aKeys=[];s.aAllKeys=[];s.iLength=0;s.bLengthFinal=true;s.bDataAvailable=true;s._fireChange({reason:h.Change})}if(!s.bSkipDataEvents){s.fireDataReceived()}}var f=this.sPath,g=this.oContext;if(this.isRelative()){f=this.oModel.resolve(f,g)}if(f){this.bPendingRequest=true;if(!this.bSkipDataEvents){this.fireDataRequested()}this.bSkipDataEvents=false;o=this.sRefreshGroup?this.sRefreshGroup:this.sGroupId;this.mRequestHandles[n]=this.oModel.read(f,{groupId:o,urlParameters:l,success:u,error:d})}};m.prototype.isLengthFinal=function(){return this.bLengthFinal};m.prototype.getLength=function(){if(this.bLengthFinal||this.iLength==0){return this.iLength}else{var t=this.iLastThreshold||this.iLastLength||10;return this.iLength+t}};m.prototype._getLength=function(){var t=this;var e;if(this.sCountMode!==a.Request&&this.sCountMode!==a.Both){return}var s=[];if(this.sFilterParams&&this.sOperationMode!=r.Auto){s.push(this.sFilterParams)}if(this.mParameters&&this.mParameters.custom){var i={custom:{}};b.each(this.mParameters.custom,function(t,e){i.custom[t]=e});s.push(this.oModel.createCustomParams(i))}function n(e){t.iLength=parseInt(e);t.bLengthFinal=true;t.bLengthRequested=true;t.oCountHandle=null;if(t.sOperationMode==r.Auto){if(t.iLength<=t.mParameters.threshold){t.bThresholdRejected=false}else{t.bThresholdRejected=true}t._fireChange({reason:h.Change})}}function o(e){delete t.mRequestHandles[l];var s="Request for $count failed: "+e.message;if(e.response){s+=", "+e.response.statusCode+", "+e.response.statusText+", "+e.response.body}c.warning(s)}var l=this.oModel.resolve(this.sPath,this.oContext);if(l){l=l+"/$count";e=this.sRefreshGroup?this.sRefreshGroup:this.sGroupId;this.oCountHandle=this.oModel.read(l,{withCredentials:this.oModel.bWithCredentials,groupId:e,urlParameters:s,success:n,error:o})}};m.prototype.refresh=function(t,e){if(typeof t==="string"){e=t;t=false}this.sRefreshGroup=e;this._refresh(t);this.sRefreshGroup=undefined};m.prototype._refresh=function(t,e,s){var i=false,a=this.isRelative()&&this.oContext&&this.oContext.bCreated;if(a){return}this.bPendingRefresh=false;if(!t){if(s){var n=this.oModel.resolve(this.sPath,this.oContext);if(n){var r=this.oModel.oMetadata._getEntityTypeByPath(n);if(r&&r.entityType in s){i=true}}}if(e&&!i){b.each(this.aKeys,function(t,s){if(s in e){i=true;return false}})}if(!e&&!s){i=true}}if(t||i){if(this.bSuspended&&!this.bIgnoreSuspend&&!t){this.bPendingRefresh=true;return}this.abortPendingRequest(true);this.resetData();this._fireRefresh({reason:h.Refresh})}};m.prototype._fireRefresh=function(t){if(this.oModel.resolve(this.sPath,this.oContext)){this.bRefresh=true;this.fireEvent("refresh",t)}};m.prototype._checkPathType=function(){var t=this.oModel.resolve(this.sPath,this.oContext);if(t){if(!this._mPathType||!this._mPathType[t]){this._mPathType={};var e=t.lastIndexOf("/");var s,i;if(e>1){i=this.oModel.oMetadata._getEntityTypeByPath(t.substring(0,e));if(i){s=this.oModel.oMetadata._getEntityAssociationEnd(i,t.substring(e+1));if(s&&s.multiplicity==="*"){this._mPathType[t]=true}}}else if(e===0){var a,n=t.substring(1);a=this.oModel.oMetadata._findEntitySetByName(n);if(a){this._mPathType[t]=true}else{var r=this.oModel.oMetadata._getFunctionImportMetadataByName(n);for(var h=0;h<r.length;h++){var o=r[h];if(o.entitySet){a=this.oModel.oMetadata._findEntitySetByName(o.entitySet);if(a){this._mPathType[t]=true}}}}}}return!!this._mPathType[t]}return true};m.prototype.initialize=function(){var t=this.isRelative()&&this.oContext&&this.oContext.bCreated;if(this.oModel.oMetadata&&this.oModel.oMetadata.isLoaded()&&this.bInitial&&!t){if(!this._checkPathType()){c.error("List Binding is not bound against a list for "+this.oModel.resolve(this.sPath,this.oContext))}this.bInitial=false;this._initSortersFilters();if(!this.bSuspended){if(this.bDataAvailable){this._fireChange({reason:h.Change})}else{this._fireRefresh({reason:h.Refresh})}}}return this};m.prototype.checkUpdate=function(t,e){var s=this.sChangeReason?this.sChangeReason:h.Change,i=false,a,n=this,r;if(this.bSuspended&&!this.bIgnoreSuspend&&!t||this.bPendingRequest){return false}this.bIgnoreSuspend=false;if(this.bPendingRequest){return}if(!t&&!this.bNeedsUpdate){r=this.aExpandRefs;var o=this.aKeys.slice();var l=this.checkExpandedList(true);if(!l&&this.useClientMode()){this.applyFilter();this.applySort()}if(!g(r,this.aExpandRefs)){i=true}else if(e){if(this.aKeys.length!==o.length){i=true}else{for(var u in e){if(this.aKeys.indexOf(u)>-1||o.indexOf(u)>-1){i=true;break}}}}else{i=true}if(i&&this.aLastContexts){i=false;var d=this._getContexts(this.iLastStartIndex,this.iLastLength,this.iLastThreshold);if(this.aLastContexts.length!==d.length){i=true}else{b.each(this.aLastContextData,function(t,e){a=n.getContextData(d[t]);if(e!==a){i=true;return false}})}}}if(t||i||this.bNeedsUpdate){this.bNeedsUpdate=false;this._fireChange({reason:s})}this.sChangeReason=undefined};m.prototype.resetData=function(){this.aKeys=[];this.aAllKeys=null;this.iLength=0;this.bLengthFinal=false;this.sChangeReason=undefined;this.bDataAvailable=false;this.bLengthRequested=false;this.bThresholdRejected=false;if(this.sCountMode==a.None){this.bThresholdRejected=true}};m.prototype.abortPendingRequest=function(t){if(!b.isEmptyObject(this.mRequestHandles)){this.bSkipDataEvents=true;b.each(this.mRequestHandles,function(t,e){e.abort()});if(t&&this.oCountHandle){this.oCountHandle.abort()}this.mRequestHandles={};this.bPendingRequest=false}};m.prototype.getDownloadUrl=function(t){var e=[],s;if(t){e.push("$format="+encodeURIComponent(t))}if(this.sSortParams){e.push(this.sSortParams)}if(this.sFilterParams){e.push(this.sFilterParams)}if(this.sCustomParams){e.push(this.sCustomParams)}s=this.oModel.resolve(this.sPath,this.oContext);if(s){return this.oModel._createRequestUrl(s,null,e)}};m.prototype.sort=function(t,e){var s=false;this.bIgnoreSuspend=true;if(!t){t=[]}if(t instanceof u){t=[t]}this.aSorters=t;if(!this.useClientMode()){this.createSortParams(t)}if(!this.bInitial){this.addComparators(t,true);if(this.useClientMode()){if(this.aAllKeys){if(t.length==0){this.applyFilter()}else{this.applySort()}this._fireChange({reason:h.Sort})}else{this.sChangeReason=h.Sort}}else{this.aKeys=[];this.abortPendingRequest(false);this.sChangeReason=h.Sort;this._fireRefresh({reason:this.sChangeReason})}this._fireSort({sorter:t});s=true}if(e){return s}else{return this}};m.prototype.addComparators=function(t,e){var s,a,n=this.oEntityType,r;if(!n){c.warning("Cannot determine sort/filter comparators, as entitytype of the collection is unkown!");return}t.forEach(function(t){if(t.aFilters){this.addComparators(t.aFilters)}else if(!t.fnCompare){s=this.oModel.oMetadata._getPropertyMetadata(n,t.sPath);a=s&&s.type;y(s,"PropertyType for property "+t.sPath+" of EntityType "+n.name+" not found!");r=i.getComparator(a);if(e){t.fnCompare=C(r)}else{t.fnCompare=r;L(a,t)}}}.bind(this))};function C(t){return function(e,s){if(e===s){return 0}if(e===null){return-1}if(s===null){return 1}return t(e,s)}}function L(t,e){switch(t){case"Edm.Decimal":case"Edm.Int64":if(typeof e.oValue1=="number"){e.oValue1=e.oValue1.toString()}if(typeof e.oValue2=="number"){e.oValue2=e.oValue2.toString()}break;case"Edm.Byte":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":if(typeof e.oValue1=="string"){e.oValue1=parseInt(e.oValue1)}if(typeof e.oValue2=="string"){e.oValue2=parseInt(e.oValue2)}break;case"Edm.Float":case"Edm.Single":case"Edm.Double":if(typeof e.oValue1=="string"){e.oValue1=parseFloat(e.oValue1)}if(typeof e.oValue2=="string"){e.oValue2=parseFloat(e.oValue2)}break;default:}}m.prototype.applySort=function(){var t=this,e;this.aKeys=d.apply(this.aKeys,this.aSorters,function(s,i){e=t.oModel.getContext("/"+s);return t.oModel.getProperty(i,e)})};m.prototype.createSortParams=function(t){this.sSortParams=i.createSortParams(t)};m.prototype.filter=function(t,s,i){var a=false;this.bIgnoreSuspend=true;if(!t){t=[]}if(t instanceof o){t=[t]}this.oModel.checkFilterOperation(t);if(s===e.Application){this.aApplicationFilters=t}else{this.aFilters=t}if(!this.aFilters||!Array.isArray(this.aFilters)){this.aFilters=[]}if(!this.aApplicationFilters||!Array.isArray(this.aApplicationFilters)){this.aApplicationFilters=[]}this.convertFilters();this.oCombinedFilter=l.combineFilters(this.aFilters,this.aApplicationFilters);if(!this.useClientMode()){this.createFilterParams(this.oCombinedFilter)}if(!this.bInitial){this.addComparators(this.aFilters);this.addComparators(this.aApplicationFilters);if(this.useClientMode()){if(this.aAllKeys){this.applyFilter();this.applySort();this._fireChange({reason:h.Filter})}else{this.sChangeReason=h.Filter}}else{this.resetData();this.abortPendingRequest(true);this.sChangeReason=h.Filter;this._fireRefresh({reason:this.sChangeReason})}if(s===e.Application){this._fireFilter({filters:this.aApplicationFilters})}else{this._fireFilter({filters:this.aFilters})}a=true}if(i){return a}else{return this}};m.prototype.convertFilters=function(){this.aFilters=this.aFilters.map(function(t){return t instanceof n?t.convert():t});this.aApplicationFilters=this.aApplicationFilters.map(function(t){return t instanceof n?t.convert():t})};m.prototype.applyFilter=function(){var t=this,e;this.oCombinedFilter=l.combineFilters(this.aFilters,this.aApplicationFilters);this.aKeys=l.apply(this.aAllKeys,this.oCombinedFilter,function(s,i){e=t.oModel.getContext("/"+s);return t.oModel.getProperty(i,e)});this.iLength=this.aKeys.length};m.prototype.createFilterParams=function(t){this.sFilterParams=i.createFilterParams(t,this.oModel.oMetadata,this.oEntityType)};m.prototype._initSortersFilters=function(){var t=this.oModel.resolve(this.sPath,this.oContext);if(!t){return}this.oEntityType=this._getEntityType();this.addComparators(this.aSorters,true);this.addComparators(this.aFilters);this.addComparators(this.aApplicationFilters);this.convertFilters();this.oCombinedFilter=l.combineFilters(this.aFilters,this.aApplicationFilters);if(!this.useClientMode()){this.createSortParams(this.aSorters);this.createFilterParams(this.oCombinedFilter)}};m.prototype._getEntityType=function(){var t=this.oModel.resolve(this.sPath,this.oContext);if(t){var e=this.oModel.oMetadata._getEntityTypeByPath(t);y(e,"EntityType for path "+t+" could not be found!");return e}return undefined};m.prototype.resume=function(){this.bIgnoreSuspend=false;this.bSuspended=false;if(this.bPendingRefresh){this._refresh()}else{this.checkUpdate()}};m.prototype.suspend=function(){if(this.bInitial){this.bPendingRefresh=true}s.prototype.suspend.apply(this,arguments)};return m});