/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Metadata","sap/m/library","sap/m/OverflowToolbarLayoutData","sap/ui/core/IconPool"],function(t,e,o,n){"use strict";var i=e.ButtonType;var r=e.PlacementType;var s=e.semantic.SemanticRuleSetType;var a=e.OverflowToolbarPriority;var g=t.createClass("sap.m.semantic.SemanticConfiguration",{});g.prototype._PositionInPage={headerLeft:"headerLeft",headerRight:"headerRight",headerMiddle:"headerMiddle",footerLeft:"footerLeft",footerRight_IconOnly:"footerRight_IconOnly",footerRight_TextOnly:"footerRight_TextOnly",shareMenu:"shareMenu"};g._PageMode={display:"display",edit:"edit",multimode:"multimode"};g.isKnownSemanticType=function(t){return g.getConfiguration(t)!=undefined};g.getConfiguration=function(t){return g._oTypeConfigs[t]};g.getSettings=function(t){return g._oTypeConfigs[t].getSettings()};g.getPositionInPage=function(t){return g._oTypeConfigs[t].position};g.getSequenceOrderIndex=function(t){return g._oTypeConfigs[t].order};g.getAriaId=function(t){return g._oTypeConfigs[t].getSettings().ariaLabelledBy};g.getShareMenuConfig=function(t){switch(t){case s.Classic:return{baseButtonPlacement:r.Bottom,actionSheetPlacement:r.Top};case s.Optimized:return{baseButtonPlacement:r.Top,actionSheetPlacement:r.Bottom}}};g._oTypeConfigs=function(){var t={},e=sap.ui.getCore().getLibraryResourceBundle("sap.m");t["sap.m.semantic.MultiSelectAction"]={position:g.prototype._PositionInPage.headerRight,getSettings:function(){return{icon:n.getIconURI("multi-select"),tooltip:e.getText("SEMANTIC_CONTROL_MULTI_SELECT")}}};t["sap.m.semantic.MainAction"]={position:g.prototype._PositionInPage.footerRight_TextOnly,getSettings:function(){return{type:i.Emphasized,layoutData:new o({priority:a.NeverOverflow})}},order:0};t["sap.m.semantic.EditAction"]={position:g.prototype._PositionInPage.footerRight_TextOnly,triggers:g._PageMode.edit,getSettings:function(){return{text:e.getText("SEMANTIC_CONTROL_EDIT"),type:i.Emphasized,layoutData:new o({priority:a.NeverOverflow})}},order:1};t["sap.m.semantic.SaveAction"]={position:g.prototype._PositionInPage.footerRight_TextOnly,triggers:g._PageMode.display,getSettings:function(){return{text:e.getText("SEMANTIC_CONTROL_SAVE"),type:i.Emphasized,layoutData:new o({priority:a.NeverOverflow})}},order:3};t["sap.m.semantic.DeleteAction"]={position:g.prototype._PositionInPage.footerRight_TextOnly,triggers:g._PageMode.display,getSettings:function(){return{text:e.getText("SEMANTIC_CONTROL_DELETE"),layoutData:new o({priority:a.NeverOverflow})}},order:4};t["sap.m.semantic.PositiveAction"]={position:g.prototype._PositionInPage.footerRight_TextOnly,getSettings:function(){return{type:i.Accept,layoutData:new o({priority:a.NeverOverflow})}},order:5};t["sap.m.semantic.NegativeAction"]={position:g.prototype._PositionInPage.footerRight_TextOnly,getSettings:function(){return{type:i.Reject,layoutData:new o({priority:a.NeverOverflow})}},order:6};t["sap.m.semantic.CancelAction"]={position:g.prototype._PositionInPage.footerRight_TextOnly,triggers:g._PageMode.display,getSettings:function(){return{text:e.getText("SEMANTIC_CONTROL_CANCEL")}},order:7};t["sap.m.semantic.ForwardAction"]={position:g.prototype._PositionInPage.footerRight_TextOnly,getSettings:function(){return{text:e.getText("SEMANTIC_CONTROL_FORWARD")}},order:8};t["sap.m.semantic.OpenInAction"]={position:g.prototype._PositionInPage.footerRight_TextOnly,getSettings:function(){return{text:e.getText("SEMANTIC_CONTROL_OPEN_IN")}},order:9};t["sap.m.semantic.AddAction"]={position:g.prototype._PositionInPage.footerRight_IconOnly,triggers:g._PageMode.edit,getSettings:function(){return{icon:n.getIconURI("add"),text:e.getText("SEMANTIC_CONTROL_ADD"),tooltip:e.getText("SEMANTIC_CONTROL_ADD")}},order:0,constraints:"IconOnly"};t["sap.m.semantic.FavoriteAction"]={position:g.prototype._PositionInPage.footerRight_IconOnly,getSettings:function(){return{icon:n.getIconURI("favorite"),text:e.getText("SEMANTIC_CONTROL_FAVORITE"),tooltip:e.getText("SEMANTIC_CONTROL_FAVORITE")}},order:1,constraints:"IconOnly"};t["sap.m.semantic.FlagAction"]={position:g.prototype._PositionInPage.footerRight_IconOnly,getSettings:function(){return{icon:n.getIconURI("flag"),text:e.getText("SEMANTIC_CONTROL_FLAG"),tooltip:e.getText("SEMANTIC_CONTROL_FLAG")}},order:2,constraints:"IconOnly"};t["sap.m.semantic.ISort"]={position:g.prototype._PositionInPage.footerRight_IconOnly,order:3};t["sap.m.semantic.IFilter"]={position:g.prototype._PositionInPage.footerRight_IconOnly,order:4};t["sap.m.semantic.IGroup"]={position:g.prototype._PositionInPage.footerRight_IconOnly,order:5};t["sap.m.semantic.SortAction"]={position:g.prototype._PositionInPage.footerRight_IconOnly,getSettings:function(){return{icon:n.getIconURI("sort"),text:e.getText("SEMANTIC_CONTROL_SORT"),tooltip:e.getText("SEMANTIC_CONTROL_SORT")}},constraints:"IconOnly"};t["sap.m.semantic.SortSelect"]={position:g.prototype._PositionInPage.footerRight_IconOnly,getSettings:function(){return{icon:n.getIconURI("sort"),type:"IconOnly",autoAdjustWidth:true,tooltip:e.getText("SEMANTIC_CONTROL_SORT")}},getEventDelegates:function(t){return{onAfterRendering:function(){this.$().attr({"aria-haspopup":true})}.bind(t)}},constraints:"IconOnly"};t["sap.m.semantic.FilterAction"]={position:g.prototype._PositionInPage.footerRight_IconOnly,getSettings:function(){return{icon:n.getIconURI("filter"),text:e.getText("SEMANTIC_CONTROL_FILTER"),tooltip:e.getText("SEMANTIC_CONTROL_FILTER")}},constraints:"IconOnly"};t["sap.m.semantic.FilterSelect"]={position:g.prototype._PositionInPage.footerRight_IconOnly,getSettings:function(){return{icon:n.getIconURI("filter"),type:"IconOnly",autoAdjustWidth:true,tooltip:e.getText("SEMANTIC_CONTROL_FILTER")}},constraints:"IconOnly"};t["sap.m.semantic.GroupAction"]={position:g.prototype._PositionInPage.footerRight_IconOnly,getSettings:function(){return{icon:n.getIconURI("group-2"),text:e.getText("SEMANTIC_CONTROL_GROUP"),tooltip:e.getText("SEMANTIC_CONTROL_GROUP")}},constraints:"IconOnly"};t["sap.m.semantic.GroupSelect"]={position:g.prototype._PositionInPage.footerRight_IconOnly,getSettings:function(){return{icon:n.getIconURI("group-2"),type:"IconOnly",autoAdjustWidth:true}},getEventDelegates:function(t){return{onAfterRendering:function(){this.$().attr({"aria-haspopup":true})}.bind(t)}},constraints:"IconOnly"};t["saveAsTileAction"]={position:g.prototype._PositionInPage.shareMenu,order:0,constraints:"IconOnly"};t["pagingAction"]={position:g.prototype._PositionInPage.headerRight};t["sap.m.semantic.DiscussInJamAction"]={position:g.prototype._PositionInPage.shareMenu,getSettings:function(){return{icon:n.getIconURI("discussion-2"),text:e.getText("SEMANTIC_CONTROL_DISCUSS_IN_JAM")}},order:1,constraints:"IconOnly"};t["sap.m.semantic.ShareInJamAction"]={position:g.prototype._PositionInPage.shareMenu,getSettings:function(){return{icon:n.getIconURI("share-2"),text:e.getText("SEMANTIC_CONTROL_SHARE_IN_JAM")}},order:2,constraints:"IconOnly"};t["sap.m.semantic.SendMessageAction"]={position:g.prototype._PositionInPage.shareMenu,getSettings:function(){return{icon:n.getIconURI("discussion"),text:e.getText("SEMANTIC_CONTROL_SEND_MESSAGE")}},order:3,constraints:"IconOnly"};t["sap.m.semantic.SendEmailAction"]={position:g.prototype._PositionInPage.shareMenu,getSettings:function(){return{icon:n.getIconURI("email"),text:e.getText("SEMANTIC_CONTROL_SEND_EMAIL")}},order:4,constraints:"IconOnly"};t["sap.m.semantic.PrintAction"]={position:g.prototype._PositionInPage.shareMenu,getSettings:function(){return{icon:n.getIconURI("print"),text:e.getText("SEMANTIC_CONTROL_PRINT")}},order:5,constraints:"IconOnly"};t["sap.m.semantic.MessagesIndicator"]={position:g.prototype._PositionInPage.footerLeft,getSettings:function(){return{icon:n.getIconURI("message-popup"),text:{path:"message>/",formatter:function(t){return t.length||0}},tooltip:e.getText("SEMANTIC_CONTROL_MESSAGES_INDICATOR"),type:i.Emphasized,visible:{path:"message>/",formatter:function(t){return t&&t.length>0}},models:{message:sap.ui.getCore().getMessageManager().getMessageModel()},layoutData:new o({priority:a.NeverOverflow})}}};t["draftIndicator"]={position:g.prototype._PositionInPage.footerLeft,getSettings:function(){return{layoutData:new o({shrinkable:false})}},order:1};return t}();return g},false);