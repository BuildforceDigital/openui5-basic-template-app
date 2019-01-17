/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Label","./library","sap/ui/Device","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/EnabledPropagator","sap/ui/core/library","./CheckBoxRenderer","sap/ui/thirdparty/jquery"],function(e,t,i,a,r,s,o,l,n){"use strict";var p=o.ValueState;var u=o.TextAlign;var h=o.TextDirection;var c=a.extend("sap.m.CheckBox",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{selected:{type:"boolean",group:"Data",defaultValue:false},partiallySelected:{type:"boolean",group:"Data",defaultValue:false},enabled:{type:"boolean",group:"Behavior",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:null},text:{type:"string",group:"Appearance",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:h.Inherit},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:u.Begin},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},useEntireWidth:{type:"boolean",group:"Appearance",defaultValue:false},activeHandling:{type:"boolean",group:"Misc",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:p.None},displayOnly:{type:"boolean",group:"Behavior",defaultValue:false},wrapping:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{_label:{type:"sap.m.Label",group:"Behavior",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{parameters:{selected:{type:"boolean"}}}},designtime:"sap/m/designtime/CheckBox.designtime"}});s.call(c.prototype);c.prototype.init=function(){this.addActiveState(this);r.insertFontFaceStyle()};c.prototype.exit=function(){this._oLabel=null;delete this._iTabIndex};c.prototype.setSelected=function(e){if(e===this.getSelected()){return this}this.$("CbBg").toggleClass("sapMCbMarkChecked",!!e);var t=this.getDomRef("CB");if(t){e?t.setAttribute("checked","checked"):t.removeAttribute("checked")}this.setProperty("selected",e,true);this.$().attr("aria-checked",this._getAriaChecked());return this};c.prototype.setPartiallySelected=function(e){if(e===this.getPartiallySelected()){return this}this.setProperty("partiallySelected",e,true);this.$("CbBg").toggleClass("sapMCbMarkPartiallyChecked",e);this.$().attr("aria-checked",this._getAriaChecked());return this};c.prototype.setText=function(e){var t=this._getLabel(),i=!!e;this.setProperty("text",e,true);t.setText(e);this.$().toggleClass("sapMCbHasLabel",i);return this};c.prototype.setWidth=function(e){this.setProperty("width",e,true);this._setWidth();return this};c.prototype.setUseEntireWidth=function(e){this.setProperty("useEntireWidth",e,true);this._setWidth();return this};c.prototype.setTextDirection=function(e){var t=this._getLabel();this.setProperty("textDirection",e,true);t.setTextDirection(e);return this};c.prototype.setTextAlign=function(e){var t=this._getLabel();this.setProperty("textAlign",e,true);t.setTextAlign(e);return this};c.prototype.setWrapping=function(e){var t=this._getLabel();this.setProperty("wrapping",e,true);t.setWrapping(e);this.$().toggleClass("sapMCbWrapped",e);return this};c.prototype.addActiveState=function(e){if(i.os.blackberry){e.addDelegate({ontouchstart:function(t){n(e.getDomRef()).addClass("sapMActive")},ontouchend:function(t){n(e.getDomRef()).removeClass("sapMActive")}})}};c.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true};c.prototype.ontap=function(e){var t;if(this.getEnabled()&&this.getEditable()&&!this.getDisplayOnly()){this.$().focus();t=this._getSelectedState();this.setSelected(t);this.setPartiallySelected(false);this.fireSelect({selected:t});e&&e.setMarked()}};c.prototype.onsapspace=function(e){this.ontap(e);if(e){e.preventDefault();e.stopPropagation()}};c.prototype.onsapenter=function(e){this.ontap(e)};c.prototype.setTabIndex=function(e){this._iTabIndex=e;this.$("CbBg").attr("tabindex",e);return this};c.prototype.getTabIndex=function(){if(this.hasOwnProperty("_iTabIndex")){return this._iTabIndex}return this.getEnabled()&&!this.getDisplayOnly()?0:-1};c.prototype._getLabel=function(){if(!this._oLabel){this._oLabel=new e(this.getId()+"-label",{labelFor:this.getId()}).addStyleClass("sapMCbLabel");this.setAggregation("_label",this._oLabel,true)}return this.getAggregation("_label")};c.prototype._setWidth=function(){var e=this._getLabel(),t=this.$(),i=this.getWidth();if(this.getUseEntireWidth()){e.setWidth("");t.outerWidth(i)}else{t.outerWidth("");e.setWidth(i)}};c.prototype._getSelectedState=function(){var e=this.getSelected(),t=this.getPartiallySelected();return e===t||!e&&t};c.prototype._getAriaChecked=function(){var e=this.getSelected();if(this.getPartiallySelected()&&e){return"mixed"}return e};c.prototype.getAccessibilityInfo=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");return{role:"checkbox",type:e.getText("ACC_CTR_TYPE_CHECKBOX"),description:(this.getText()||"")+(this.getSelected()?" "+e.getText("ACC_CTR_STATE_CHECKED"):""),focusable:this.getEnabled()&&!this.getDisplayOnly(),enabled:this.getEnabled(),editable:this.getEditable()}};c.prototype.getFormDoNotAdjustWidth=function(){return this.getText()?false:true};return c});