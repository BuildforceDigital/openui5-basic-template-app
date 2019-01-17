/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/message/MessageProcessor","sap/ui/thirdparty/jquery"],function(s,e){"use strict";var t=s.extend("sap.ui.core.message.ControlMessageProcessor",{constructor:function(){if(!t._instance){s.apply(this,arguments);t._instance=this}return t._instance},metadata:{}});t._instance=null;t.prototype.setMessages=function(s){this.mOldMessages=this.mMessages===null?{}:this.mMessages;this.mMessages=s||{};this.checkMessages();delete this.mOldMessages};t.prototype.checkMessages=function(){var s,t=this,a=e.extend(this.mMessages,{});e.each(this.mOldMessages,function(s){if(!(s in a)){a[s]=[]}});e.each(a,function(e){var a,i,n=e.split("/");if(!n[0]){n.shift()}i=sap.ui.getCore().byId(n[0]);if(!i){return}a=i.getBinding(n[1]);s=t.mMessages[e]?t.mMessages[e]:[];if(a){var r=a.getDataState();r.setControlMessages(s);a.checkDataState()}else{i.propagateMessages(n[1],s)}})};return t});