/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBase","./library","sap/ui/core/IconPool","sap/m/ObjectNumber","sap/ui/core/library","./ObjectListItemRenderer"],function(t,e,r,i,o,s){"use strict";var a=e.ObjectMarkerType;var n=e.ImageHelper;var u=o.TextAlign;var l=o.TextDirection;var g=o.ValueState;var p=t.extend("sap.m.ObjectListItem",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},number:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},intro:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},markFavorite:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},markFlagged:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},showMarkers:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},numberState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:g.None},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:l.Inherit},introTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:l.Inherit},numberTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:l.Inherit},markLocked:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.m.ObjectAttribute",multiple:true,singularName:"attribute"},firstStatus:{type:"sap.m.ObjectStatus",multiple:false},secondStatus:{type:"sap.m.ObjectStatus",multiple:false},markers:{type:"sap.m.ObjectMarker",multiple:true,singularName:"marker"},_objectNumber:{type:"sap.m.ObjectNumber",multiple:false,visibility:"hidden"}},designtime:"sap/m/designtime/ObjectListItem.designtime"}});p.prototype.init=function(t){this._generateObjectNumber()};p.prototype.exit=function(e){if(this._oImageControl){this._oImageControl.destroy()}if(this._oTitleText){this._oTitleText.destroy();this._oTitleText=undefined}t.prototype.exit.apply(this)};p.prototype.onAfterRendering=function(){var t=this.getAggregation("_objectNumber"),e=sap.ui.getCore().getConfiguration().getRTL(),r=e?u.Left:u.Right;if(t&&t.getNumber()){t.setTextAlign(r)}};p.prototype._generateObjectNumber=function(){var t=this.getNumber(),e=this.getNumberUnit(),r=this.getNumberState(),o=this.getNumberTextDirection();this.setAggregation("_objectNumber",new i(this.getId()+"-ObjectNumber",{number:t,unit:e,state:r,textDirection:o}),true)};p.prototype._hasAttributes=function(){var t=this.getAttributes();if(t.length>0){for(var e=0;e<t.length;e++){if(!t[e]._isEmpty()){return true}}}return false};p.prototype._hasStatus=function(){return this.getFirstStatus()&&!this.getFirstStatus()._isEmpty()||this.getSecondStatus()&&!this.getSecondStatus()._isEmpty()};p.prototype._hasBottomContent=function(){return this._hasAttributes()||this._hasStatus()||this.getShowMarkers()||this.getMarkLocked()||this.getMarkers().length>0};p.prototype._getImageControl=function(){var t=this.getId()+"-img";var e="2.5rem";var i;if(r.isIconURI(this.getIcon())){i={src:this.getIcon(),height:e,width:e,size:e,useIconTooltip:false,densityAware:this.getIconDensityAware()}}else{i={src:this.getIcon(),useIconTooltip:false,densityAware:this.getIconDensityAware()}}var o=["sapMObjLIcon"];this._oImageControl=n.getImageControl(t,this._oImageControl,this,i,o);return this._oImageControl};p.prototype._activeHandlingInheritor=function(){var t=this.getActiveIcon();if(!!this._oImageControl&&!!t){this._oImageControl.setSrc(t)}};p.prototype._inactiveHandlingInheritor=function(){var t=this.getIcon();if(!!this._oImageControl){this._oImageControl.setSrc(t)}};p.prototype.setNumber=function(t){this.setProperty("number",t,true);this.getAggregation("_objectNumber").setNumber(t);return this};p.prototype.setNumberUnit=function(t){this.setProperty("numberUnit",t,true);this.getAggregation("_objectNumber").setUnit(t);return this};p.prototype.setNumberTextDirection=function(t){this.setProperty("numberTextDirection",t,true);this.getAggregation("_objectNumber").setTextDirection(t);return this};p.prototype.setNumberState=function(t){this.setProperty("numberState",t,true);this.getAggregation("_objectNumber").setState(t);return this};p.prototype.setMarkFavorite=function(t){return this._setOldMarkers(a.Favorite,t)};p.prototype.setMarkFlagged=function(t){return this._setOldMarkers(a.Flagged,t)};p.prototype.setMarkLocked=function(t){return this._setOldMarkers(a.Locked,t)};p.prototype.setShowMarkers=function(t){var e;var r=this.getMarkers();this.setProperty("showMarkers",t,false);for(var i=0;i<r.length;i++){e=r[i].getType();if(e===a.Flagged&&this.getMarkFlagged()||e===a.Favorite&&this.getMarkFavorite()||e===a.Locked&&this.getMarkLocked()){r[i].setVisible(t)}}return this};p.prototype._setOldMarkers=function(t,e){var r=this.getMarkers();var i=false;var o={Flagged:"-flag",Favorite:"-favorite",Locked:"-lock"};this.setProperty("mark"+t,e,false);if(!this.getShowMarkers()){e=false}for(var s=0;s<r.length;s++){if(r[s].getType()===t){i=true;r[s].setVisible(e);break}}if(!i){this.insertAggregation("markers",new sap.m.ObjectMarker({id:this.getId()+o[t],type:t,visible:e}))}return this};p.prototype._getTitleText=function(){if(!this._oTitleText){this._oTitleText=new sap.m.Text(this.getId()+"-titleText",{maxLines:2});this._oTitleText.setParent(this,null,true)}return this._oTitleText};return p});