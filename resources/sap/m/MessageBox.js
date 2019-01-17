/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./Dialog","./Text","./FormattedText","./Link","./VBox","sap/ui/core/IconPool","sap/ui/core/ElementMetadata","sap/ui/core/library","sap/ui/core/Control","sap/m/library","sap/ui/thirdparty/jquery"],function(e,t,i,n,s,o,a,r,l,c,u,d){"use strict";var f=u.DialogType;var g=l.TextDirection;var O={};O.Action={OK:"OK",CANCEL:"CANCEL",YES:"YES",NO:"NO",ABORT:"ABORT",RETRY:"RETRY",IGNORE:"IGNORE",CLOSE:"CLOSE",DELETE:"DELETE"};O.Icon={NONE:undefined,INFORMATION:"INFORMATION",WARNING:"WARNING",ERROR:"ERROR",SUCCESS:"SUCCESS",QUESTION:"QUESTION"};(function(){var l=O.Action,u=O.Icon,I={INFORMATION:"sapMMessageBoxInfo",WARNING:"sapMMessageBoxWarning",ERROR:"sapMMessageBoxError",SUCCESS:"sapMMessageBoxSuccess",QUESTION:"sapMMessageBoxQuestion",STANDARD:"sapMMessageBoxStandard"},S={INFORMATION:a.getIconURI("message-information"),WARNING:a.getIconURI("message-warning"),ERROR:a.getIconURI("message-error"),SUCCESS:a.getIconURI("message-success"),QUESTION:a.getIconURI("question-mark")};var T=function(){if(O._rb!==sap.ui.getCore().getLibraryResourceBundle("sap.m")){O._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m")}};O.show=function(a,C){var R,E,N,p=null,x=[],y,M,A,b,L,_,h,B={id:r.uid("mbox"),initialFocus:null,textDirection:g.Inherit,verticalScrolling:true,horizontalScrolling:true,details:"",contentWidth:null};T();if(typeof C==="string"||arguments.length>2){M=arguments[1];A=arguments[2];b=arguments[3];L=arguments[4];_=arguments[5];h=arguments[6];C={icon:M,title:A,actions:b,onClose:L,id:_,styleClass:h}}if(C&&C.hasOwnProperty("details")){B.icon=u.INFORMATION;B.actions=[l.OK,l.CANCEL];C=d.extend({},B,C)}C=d.extend({},B,C);if(typeof C.actions!=="undefined"&&!Array.isArray(C.actions)){C.actions=[C.actions]}if(!C.actions||C.actions.length===0){C.actions=[l.OK]}function F(t){var i;if(O.Action.hasOwnProperty(t)){i=O._rb.getText("MSGBOX_"+t)}var n=new e({id:r.uid("mbox-btn-"),text:i||t,press:function(){p=t;R.close()}});return n}for(y=0;y<C.actions.length;y++){x.push(F(C.actions[y]))}function w(e,t){var i,a,r=new o({items:[t]});if(!e.details){return r}if(typeof e.details=="object"){e.details="<pre>"+JSON.stringify(e.details,null,"\t").replace(/{/gi,"\\{")+"</pre>"}i=(new n).setVisible(false).setHtmlText(e.details);a=new s({text:O._rb.getText("MSGBOX_LINK_TITLE"),press:function(){var e=R.getInitialFocus();R.addAriaLabelledBy(i);i.setVisible(true);a.setVisible(false);if(e&&e!==a.getId()){R._setInitialFocus()}else{x[0].focus()}}});a.addStyleClass("sapMMessageBoxLinkText");i.addStyleClass("sapMMessageBoxDetails");r.addItem(a);r.addItem(i);return r}function v(){if(typeof C.onClose==="function"){C.onClose(p)}R.detachAfterClose(v);R.destroy()}function m(){var e=0;var t=null;if(C.initialFocus){if(C.initialFocus instanceof c){t=C.initialFocus}if(typeof C.initialFocus==="string"){for(e=0;e<x.length;e++){if(O.Action.hasOwnProperty(C.initialFocus)){if(O._rb.getText("MSGBOX_"+C.initialFocus).toLowerCase()===x[e].getText().toLowerCase()){t=x[e];break}}else{if(C.initialFocus.toLowerCase()===x[e].getText().toLowerCase()){t=x[e];break}}}}}return t}if(typeof a==="string"){N=new i({textDirection:C.textDirection}).setText(a).addStyleClass("sapMMsgBoxText");E=N}else if(a instanceof c){N=a.addStyleClass("sapMMsgBoxText")}if(C&&C.hasOwnProperty("details")&&C.details!==""){N=w(C,N)}function G(){if(sap.ui.getCore().getConfiguration().getAccessibility()){R.$().attr("role","alertdialog")}}R=new t({id:C.id,type:f.Message,title:C.title,content:N,icon:S[C.icon],initialFocus:m(),verticalScrolling:C.verticalScrolling,horizontalScrolling:C.horizontalScrolling,afterOpen:G,afterClose:v,buttons:x,ariaLabelledBy:E?E.getId():undefined,contentWidth:C.contentWidth});if(I[C.icon]){R.addStyleClass(I[C.icon])}else{R.addStyleClass(I.STANDARD)}if(C.styleClass){R.addStyleClass(C.styleClass)}R.open()};O.alert=function(e,t){T();var i={icon:u.NONE,title:O._rb.getText("MSGBOX_TITLE_ALERT"),actions:l.OK,id:r.uid("alert"),initialFocus:null},n,s,o,a;if(typeof t==="function"||arguments.length>2){n=arguments[1];s=arguments[2];o=arguments[3];a=arguments[4];t={onClose:n,title:s,id:o,styleClass:a}}t=d.extend({},i,t);return O.show(e,t)};O.confirm=function(e,t){T();var i={icon:u.QUESTION,title:O._rb.getText("MSGBOX_TITLE_CONFIRM"),actions:[l.OK,l.CANCEL],id:r.uid("confirm"),initialFocus:null},n,s,o,a;if(typeof t==="function"||arguments.length>2){n=arguments[1];s=arguments[2];o=arguments[3];a=arguments[4];t={onClose:n,title:s,id:o,styleClass:a}}t=d.extend({},i,t);return O.show(e,t)};O.error=function(e,t){T();var i={icon:u.ERROR,title:O._rb.getText("MSGBOX_TITLE_ERROR"),actions:[l.CLOSE],id:r.uid("error"),initialFocus:null};t=d.extend({},i,t);return O.show(e,t)};O.information=function(e,t){T();var i={icon:u.INFORMATION,title:O._rb.getText("MSGBOX_TITLE_INFO"),actions:[l.OK],id:r.uid("info"),initialFocus:null};t=d.extend({},i,t);return O.show(e,t)};O.warning=function(e,t){T();var i={icon:u.WARNING,title:O._rb.getText("MSGBOX_TITLE_WARNING"),actions:[l.OK],id:r.uid("warning"),initialFocus:null};t=d.extend({},i,t);return O.show(e,t)};O.success=function(e,t){T();var i={icon:u.SUCCESS,title:O._rb.getText("MSGBOX_TITLE_SUCCESS"),actions:[l.OK],id:r.uid("success"),initialFocus:null};t=d.extend({},i,t);return O.show(e,t)}})();return O},true);