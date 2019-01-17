/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/library","./library","./ListItemBase","./ColumnListItemRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(t,e,i,o,n,s){"use strict";var r=i.ListType;var a=e.VerticalAlign;var p=o.extend("sap.m.ColumnListItem",{metadata:{library:"sap.m",properties:{vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:a.Inherit}},defaultAggregation:"cells",aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell",bindable:"bindable"}}}});var l=t.extend("sap.m.TablePopin",{ontap:function(t){if(t.isMarked()||o.detectTextSelection(this.getDomRef())){return t.stopImmediatePropagation(true)}if(t.srcControl===this||!s(t.target).is(":sapFocusable")){this.getParent().focus()}}});p.prototype.TagName="tr";p.prototype.init=function(){o.prototype.init.call(this);this._bNeedsTypeColumn=false;this._aClonedHeaders=[]};p.prototype.onAfterRendering=function(){o.prototype.onAfterRendering.call(this);this._checkTypeColumn()};p.prototype.exit=function(){o.prototype.exit.call(this);this._checkTypeColumn(false);this._destroyClonedHeaders();if(this._oPopin){this._oPopin.destroy(true);this._oPopin=null}};p.prototype.setVisible=function(t){o.prototype.setVisible.call(this,t);if(!t&&this.hasPopin()){this.removePopin()}return this};p.prototype.getTable=function(){var t=this.getParent();if(t&&t.isA("sap.m.Table")){return t}};p.prototype.getPopin=function(){if(!this._oPopin){this._oPopin=new l({id:this.getId()+"-sub"}).addEventDelegate({ontouchstart:this.ontouchstart,ontouchmove:this.ontouchmove,ontap:this.ontap,ontouchend:this.ontouchend,ontouchcancel:this.ontouchcancel,onsaptabnext:this.onsaptabnext,onsaptabprevious:this.onsaptabprevious,onsapup:this.onsapup,onsapdown:this.onsapdown,oncontextmenu:this.oncontextmenu},this).setParent(this,null,true)}return this._oPopin};p.prototype.$Popin=function(){return this.$("sub")};p.prototype.hasPopin=function(){return this._oPopin};p.prototype.removePopin=function(){this._oPopin&&this.$Popin().remove()};p.prototype.getTabbables=function(){return this.$().add(this.$Popin()).find(":sapTabbable")};p.prototype.getAccessibilityType=function(t){return t.getText("ACC_CTR_TYPE_ROW")};p.prototype.getContentAnnouncement=function(t){var e=this.getTable();if(!e){return}var i="",n=this.getCells(),s=e.getColumns(true);s.forEach(function(t){var e=n[t.getInitialOrder()];if(!e||!t.getVisible()||t.isHidden()&&!t.isPopin()){return}var s=t.getHeader();if(s&&s.getVisible()){i+=o.getAccessibilityText(s)+" "}i+=o.getAccessibilityText(e,true)+" "});return i};p.prototype.updateSelectedDOM=function(t,e){o.prototype.updateSelectedDOM.apply(this,arguments);if(this.hasPopin()){this.$Popin().attr("aria-selected",t)}};p.prototype.onfocusin=function(t){if(t.isMarked()||t.srcControl!==this){return}this.$().children(".sapMListTblCellDup").find(":sapTabbable").attr("tabindex",-1);o.prototype.onfocusin.apply(this,arguments)};p.prototype._checkTypeColumn=function(t){if(t==undefined){t=this._needsTypeColumn()}if(this._bNeedsTypeColumn!=t){this._bNeedsTypeColumn=t;this.informList("TypeColumnChange",t)}};p.prototype._needsTypeColumn=function(){var t=this.getType();return this.getVisible()&&(t==r.Detail||t==r.Navigation||t==r.DetailAndActive)};p.prototype._addClonedHeader=function(t){return this._aClonedHeaders.push(t)};p.prototype._destroyClonedHeaders=function(){if(this._aClonedHeaders.length){this._aClonedHeaders.forEach(function(t){t.destroy("KeepDom")});this._aClonedHeaders=[]}};p.prototype._activeHandlingInheritor=function(){this._toggleActiveClass(true)};p.prototype._inactiveHandlingInheritor=function(){this._toggleActiveClass(false)};p.prototype._toggleActiveClass=function(t){if(this.hasPopin()){this.$Popin().toggleClass("sapMLIBActive",t)}};return p});