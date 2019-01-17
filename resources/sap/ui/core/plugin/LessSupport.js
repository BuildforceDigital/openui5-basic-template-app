/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";function e(){sap.ui.define("sap/ui/core/plugin/LessSupport",["sap/ui/thirdparty/jquery","sap/ui/core/Core","sap/ui/core/ThemeCheck","sap/base/Log","sap/base/util/UriParameters"],function(e,t,i,s,r){var o="library.source";var n="library";var a=function(){};a.prototype.startPlugin=function(t,o){s.info("Starting LessSupport plugin.");s.warning("  NOT FOR PRODUCTIVE USAGE! LessSupport is an experimental feature which might change in future!");var n=new r(window.location.href);var a=n.get("sap-ui-xx-noless");if(a){a=a.toLowerCase()}try{if(a!=="false"&&(window.top.JsUnit||window.sap.ui.test&&window.sap.ui.test.qunit)){s.info("  LessSupport has been deactivated for JSUnit Testrunner or QUnit.");return}}catch(e){}if(a&&a!=="false"){s.info("  LessSupport has been deactivated by URL parameter.");return}else{s.info('  LessSupport can be deactivated by adding the following parameter to your URL: "sap-ui-xx-noless=X".')}window.less=window.less||{env:"development",relativeUrls:true,errorReporting:function(e,t,i){if(e==="add"&&window.console){window.console.error("Failed to parse: "+i,t)}}};sap.ui.requireSync("sap/ui/thirdparty/less");this.oCore=t;this.bActive=true;this.oCore.includeLibraryTheme=e.proxy(this.includeLibraryTheme,this);this.oCore.applyTheme=e.proxy(this.applyTheme,this);var d=this,u=false;var p=[];e("link[id^=sap-ui-theme-]").each(function(){var e=d.initLink(this);u=e||u;if(e){p.push(this.id.substr(13))}});this.refreshLess(u);var h=0;function l(){var r=true;var o;for(var n=0;n<p.length;n++){o=i.checkStyle("less:"+p[n],true);if(o){e(document.getElementById("sap-ui-theme-"+p[n])).attr("data-sap-ui-ready","true")}r=r&&o}h++;if(h>100){r=true;s.warning("LessSupport: Max theme check cycles reached.")}if(r){i.themeLoaded=true;setTimeout(function(){t.fireThemeChanged({theme:t.sTheme})},0)}else{d.iCheckThemeAppliedTimeout=setTimeout(l,100)}}if(u){this.iCheckThemeAppliedTimeout=setTimeout(l,100)}};a.prototype.stopPlugin=function(){s.info("Stopping LessSupport plugin.");if(this.bActive){clearTimeout(this.iCheckThemeAppliedTimeout);delete this.iCheckThemeAppliedTimeout;e("link[id^=sap-ui-theme-]").each(function(){var t=this.id.substr(13);e(document.getElementById("less:"+t)).remove()});delete this.oCore.includeLibraryTheme;delete this.oCore.applyTheme;this.oCore=null}};a.prototype.initLink=function(t){var i=this.updateLink(t);e("<style>").attr("id","less:"+t.id.substr(13)).attr("type","text/css").attr("media",this.media||"screen").insertAfter(t);return i};a.prototype.updateLink=function(e){var t=e.id.substr(13);var i;if((i=t.indexOf("-["))>0){t=t.substr(0,i)}var r=this.oCore._getThemePath(t,this.oCore.sTheme);var a=this.getLastModified(r+o+".less");var d=this.getLastModified(r+n+".css");var u=a==0&&d>0||a>d;if(!u){var p=this.oCore._getThemePath(t,"base");var h=this.getLastModified(p+o+".less");var l=this.getLastModified(p+n+".css");u=h==0&&l>0||h>l}var c=u?o:n;s.debug("LessSupport.updateLink: "+r+c+": "+(u?"LESS":"CSS"));if(!u){if(e.title){delete e.title}e.rel="stylesheet";e.href=r+c+".css";this.unregisterLink(e);return false}e.title=t;e.rel="stylesheet/less";e.href=r+c+".less";this.registerLink(e);return true};a.prototype.getLastModified=function(t){var i;e.ajax({url:t,type:"HEAD",async:false,success:function(e,t,s){var r=s.getResponseHeader("Last-Modified");i=r?Date.parse(r):0},error:function(e,t,s){i=-1}});s.debug("CSS/LESS head-check: "+t+"; last-modified: "+i);return i};a.prototype.applyTheme=function(t,i){sap.ui.core.Core.prototype.applyTheme.apply(this.oCore,arguments);var s=this,r=false;e("link[id^=sap-ui-theme-]").each(function(){r=s.updateLink(this)||r});this.refreshLess(r)};a.prototype.includeLibraryTheme=function(t){sap.ui.core.Core.prototype.includeLibraryTheme.apply(this.oCore,arguments);var i=this,s=false;e("link[id='sap-ui-theme-"+t+"']").each(function(){s=i.initLink(this)||s});this.refreshLess(s)};a.prototype.registerLink=function(e){if(window.less&&window.less.sheets){var t=window.less.sheets.indexOf(e);if(t===-1){window.less.sheets.push(e)}}};a.prototype.unregisterLink=function(t){if(window.less&&window.less.sheets){var i=t.id.substr(13);var s=window.less.sheets.indexOf(t);if(s>=0){window.less.sheets.splice(s,1);e(document.getElementById("less:"+i)).html("")}}};a.prototype.refreshLess=function(t){if(t){if(!document.getElementById("sap-ui-ide-less-mode")){e("<span>").attr("id","sap-ui-ide-less-mode").css("position","absolute").css("right","10px").css("bottom","10px").css("padding","10px").css("border","3px solid red").css("border-radius","10px").css("opacity","0.75").css("color","black").css("background-color","white").css("font-weight","bold").css("z-index","99999").append(e("<span>").text("LESS MODE").css({display:"block","text-align":"center"})).append(e("<a>").attr("href","#").text("Deactivate").attr("title","Less mode is active. Click to deactivate it (requires page refresh).").css({float:"left",clear:"left","font-size":"0.75em","text-decoration":"underline","margin-right":"0.5em"}).bind("click",function(e){e.preventDefault();if(window.confirm("Deactivating the Less Mode refreshes the page. Do you want to proceed?")){var t=window.location.search;window.location.search=(t.charAt(0)==="?"?t+"&":"?")+"sap-ui-xx-noless=true"}})).append(e("<a>").attr("href","#").text("Hide").attr("title","Less mode is active. Click to hide this information.").css({float:"right","font-size":"0.75em","text-decoration":"underline"}).bind("click",function(t){t.preventDefault();e(this).parent().css("display","none")})).appendTo(window.document.body)}}else{e("#sap-ui-ide-less-mode").remove()}if(window.less&&window.less.refresh&&window.less.sheets.length>0){var i={};var r={};e(window.less.sheets).each(function(){r[this.href]=e(this).attr("id").substr(13)});var o=window.less.tree.Rule.prototype.eval;window.less.tree.Rule.prototype.eval=function(e){if(this.variable&&typeof this.name==="string"&&this.name.indexOf("@_PRIVATE_")!==0){var t=r[this.currentFileInfo.rootFilename];if(!t){s.warning("LessSupport: could not find libary ("+this.currentFileInfo.rootFilename+")")}var n=i[t];if(!n){n=i[t]={}}try{n[this.name.substr(1)]=this.value.eval(e).toCSS(e)}catch(e){}}return o.apply(this,arguments)};window.less.refresh();var n=sap.ui.requireSync("sap/ui/core/theming/Parameters");n._setOrLoadParameters(i);window.less.tree.Rule.prototype.eval=o}};var d=new a;sap.ui.getCore().registerPlugin(d);a.refresh=function(){d.refreshLess(true);if(d.oCore.oThemeCheck){d.oCore.oThemeCheck.fireThemeChangedEvent(false)}};return a},true)}if(!(window.sap&&window.sap.ui&&window.sap.ui.define)){var t=function(){document.removeEventListener("DOMContentLoaded",t,false);e()};document.addEventListener("DOMContentLoaded",t,false)}else{e()}})();