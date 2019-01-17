/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","./MessageProcessor","sap/base/util/uid","sap/base/Log"],function(e,t,s,o){"use strict";var i=e.extend("sap.ui.core.message.Message",{constructor:function(t){e.apply(this,arguments);t=t||{};this.id=t.id?t.id:s();this.message=t.message;this.description=t.description;this.descriptionUrl=t.descriptionUrl;this.additionalText=t.additionalText;this.setType(t.type||sap.ui.core.MessageType.None);this.code=t.code;this.target=t.target;this.processor=t.processor;this.persistent=t.persistent||false;this.technical=t.technical||false;this.references=t.references||{};this.validation=!!t.validation;this.date=t.date||Date.now();this.controlIds=[]}});i.prototype.getId=function(){return this.id};i.prototype.setMessage=function(e){this.message=e};i.prototype.getMessage=function(){return this.message};i.prototype.getControlId=function(){return this.controlIds[this.controlIds.length-1]};i.prototype.addControlId=function(e){if(this.controlIds.indexOf(e)==-1){this.controlIds.push(e)}};i.prototype.removeControlId=function(e){var t=this.controlIds.indexOf(e);if(t!=-1){this.controlIds.splice(t,1)}};i.prototype.getControlIds=function(){return this.controlIds};i.prototype.setDescription=function(e){this.description=e};i.prototype.getDescription=function(){return this.description};i.prototype.setAdditionalText=function(e){this.additionalText=e};i.prototype.getAdditionalText=function(){return this.additionalText};i.prototype.getDescriptionUrl=function(){return this.descriptionUrl};i.prototype.setDescriptionUrl=function(e){this.descriptionUrl=e};i.prototype.setType=function(e){if(e in sap.ui.core.MessageType){this.type=e}else{o.error("MessageType must be of type sap.ui.core.MessageType")}};i.prototype.getType=function(){return this.type};i.prototype.setTarget=function(e){this.target=e};i.prototype.getTarget=function(){return this.target};i.prototype.setMessageProcessor=function(e){if(e instanceof t){this.processor=e}else{o.error("MessageProcessor must be an instance of sap.ui.core.message.MessageProcessor")}};i.prototype.getMessageProcessor=function(){return this.processor};i.prototype.setCode=function(e){this.code=e};i.prototype.getCode=function(){return this.code};i.prototype.setPersistent=function(e){this.persistent=e};i.prototype.getPersistent=function(){return this.persistent};i.prototype.setTechnical=function(e){this.technical=e};i.prototype.getTechnical=function(){return this.technical};i.prototype.addReference=function(e,t){if(!e){return}if(!this.references[e]){this.references[e]={properties:{}}}if(!this.references[e].properties[t]){this.references[e].properties[t]=true}};i.prototype.removeReference=function(e,t){if(!e){return}if(e in this.references){if(!t){delete this.references[e]}else if(this.references[e].properties[t]){delete this.references[e].properties[t]}}};i.prototype.setDate=function(e){this.date=e};i.prototype.getDate=function(){return this.date};return i});