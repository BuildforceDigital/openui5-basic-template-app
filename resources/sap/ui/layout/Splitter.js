/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","sap/ui/core/library","sap/ui/core/ResizeHandler","sap/ui/core/RenderManager","./SplitterRenderer","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,i,r,s,a,n,o){"use strict";var h=i.Orientation;var l=16;var u=e.extend("sap.ui.layout.Splitter",{metadata:{library:"sap.ui.layout",properties:{orientation:{type:"sap.ui.core.Orientation",group:"Behavior",defaultValue:h.Horizontal},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"}},defaultAggregation:"contentAreas",aggregations:{contentAreas:{type:"sap.ui.core.Control",multiple:true,singularName:"contentArea"}},events:{resize:{parameters:{id:{type:"string"},oldSizes:{type:"int[]"},newSizes:{type:"int[]"}}}},designtime:"sap/ui/layout/designtime/Splitter.designtime"}});var d=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout");u.prototype.init=function(){this._needsInvalidation=false;this._liveResize=true;this._keyboardEnabled=true;this._bHorizontal=true;this._calculatedSizes=[];this._move={};this._resizeTimeout=null;this._resizeCallback=this._delayedResize.bind(this);this._resizeHandlerId=null;this._autoResize=true;this.enableAutoResize();this._boundBarMoveEnd=this._onBarMoveEnd.bind(this);this._boundBarMove=this._onBarMove.bind(this);this._switchOrientation();this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._keyListeners={increase:this._onKeyboardResize.bind(this,"inc",20),decrease:this._onKeyboardResize.bind(this,"dec",20),increaseMore:this._onKeyboardResize.bind(this,"incMore",20),decreaseMore:this._onKeyboardResize.bind(this,"decMore",20),max:this._onKeyboardResize.bind(this,"max",20),min:this._onKeyboardResize.bind(this,"min",20)};this._enableKeyboardListeners();this._bUseIconForSeparator=true};u.prototype.exit=function(){this.disableAutoResize();delete this._resizeCallback;delete this._boundBarMoveEnd;delete this._boundBarMove;delete this._$SplitterOverlay;delete this._$SplitterOverlayBar};u.prototype.triggerResize=function(e){if(e){this._resize()}else{this._delayedResize()}};u.prototype.getCalculatedSizes=function(){return this._calculatedSizes};u.prototype.enableAutoResize=function(e){if(e&&!this._autoResize){return}this._autoResize=true;var t=this;sap.ui.getCore().attachInit(function(){t._resizeHandlerId=r.register(t,t._resizeCallback)});this._delayedResize()};u.prototype.disableAutoResize=function(e){r.deregister(this._resizeHandlerId);if(!e){this._autoResize=false}};u.prototype.enableLiveResize=function(){this._liveResize=true;this.$().toggleClass("sapUiLoSplitterAnimated",false)};u.prototype.disableLiveResize=function(){this._liveResize=false;this.$().toggleClass("sapUiLoSplitterAnimated",true)};u.prototype.enableKeyboardSupport=function(){var e=this.$().find(".sapUiLoSplitterBar");e.attr("tabindex","0");this._enableKeyboardListeners()};u.prototype.disableKeyboardSupport=function(){var e=this.$().find(".sapUiLoSplitterBar");e.attr("tabindex","-1");this._disableKeyboardListeners()};u.prototype.onBeforeRendering=function(){this._switchOrientation()};u.prototype.onAfterRendering=function(){this._$SplitterOverlay=this.$("overlay");this._$SplitterOverlayBar=this.$("overlayBar");this._$SplitterOverlay.detach();this._resize()};u.prototype.onLayoutDataChange=function(){this._delayedResize()};u.prototype.ontouchstart=function(e){if(this._ignoreTouch){return}var t=this.getId();if(!e.target.id||e.target.id.indexOf(t+"-splitbar")!=0){return}if(!e.changedTouches||!e.changedTouches[0]){return}this._ignoreMouse=true;this._onBarMoveStart(e.changedTouches[0],true)};u.prototype.onmousedown=function(e){if(this._ignoreMouse){return}var t=this.getId();if(!e.target.id||e.target.id.indexOf(t+"-splitbar")!=0){return}this._ignoreTouch=true;this._onBarMoveStart(e)};u.prototype._onBarMoveStart=function(e,t){var i=this.getId();this.disableAutoResize(true);var r=e[this._moveCord];var s=parseInt(e.target.id.substr((i+"-splitbar-").length));var a=o(e.target);var n=this.getCalculatedSizes();var h=this._bHorizontal?a.innerWidth():a.innerHeight();var l=this._getContentAreas();var u=l[s].getLayoutData();var d=l[s+1].getLayoutData();if(!u.getResizable()||!d.getResizable()){c(t);return}var p=0-h;for(var v=0;v<=s;++v){p+=n[v]+h}this._move={start:r,relStart:p,barNum:s,bar:o(e.target),c1Size:n[s],c1MinSize:u?parseInt(u.getMinSize()):0,c2Size:n[s+1],c2MinSize:d?parseInt(d.getMinSize()):0};if(t){document.addEventListener("touchend",this._boundBarMoveEnd);document.addEventListener("touchmove",this._boundBarMove)}else{document.addEventListener("mouseup",this._boundBarMoveEnd);document.addEventListener("mousemove",this._boundBarMove)}this._$SplitterOverlay.css("display","block");this._$SplitterOverlay.appendTo(this.getDomRef());this._$SplitterOverlayBar.css(this._sizeDirNot,"");this._move["bar"].css("visibility","hidden");this._onBarMove(e)};u.prototype._onBarMove=function(e){if(e.preventDefault){e.preventDefault()}var t=e;if(e.changedTouches&&e.changedTouches[0]){t=e.changedTouches[0]}var i=t[this._moveCord];var r=i-this._move.start;if(this.getOrientation()==h.Horizontal&&this._bRtl){r=-r}var s=this._move.c1Size+r;var a=this._move.c2Size-r;var n=s>=0&&a>=0&&s>=this._move.c1MinSize&&a>=this._move.c2MinSize;if(n){this._$SplitterOverlayBar.css(this._sizeDir,this._move.relStart+r);if(this._liveResize){var o=this._move["start"]-t[this._moveCord];if(this.getOrientation()==h.Horizontal&&this._bRtl){o=-o}this._resizeContents(this._move["barNum"],-o,false)}}};u.prototype._onBarMoveEnd=function(e){this._ignoreMouse=false;this._ignoreTouch=false;var t=e;if(e.changedTouches&&e.changedTouches[0]){t=e.changedTouches[0]}var i=t[this._moveCord];var r=this._move["start"]-i;if(this.getOrientation()==h.Horizontal&&this._bRtl){r=-r}this._resizeContents(this._move["barNum"],-r,true);this._move["bar"].css("visibility","");this._$SplitterOverlay.css("display","");document.removeEventListener("mouseup",this._boundBarMoveEnd);document.removeEventListener("mousemove",this._boundBarMove);document.removeEventListener("touchend",this._boundBarMoveEnd);document.removeEventListener("touchmove",this._boundBarMove);this.enableAutoResize(true);if(this._move.bar){this._move.bar.focus()}};u.prototype._resizeContents=function(e,t,i){if(isNaN(t)){n.warning("Splitter: Received invalid resizing values - resize aborted.");return}var r=this._getContentAreas();var s=r[e].getLayoutData();var a=r[e+1].getLayoutData();var o=s.getSize();var h=a.getSize();var l=this.$("content-"+e);var u=this.$("content-"+(e+1));var d=this._move.c1Size+t;var p=this._move.c2Size-t;var c=parseInt(s.getMinSize());var v=parseInt(a.getMinSize());var _;if(d<c){_=c-d;t+=_;d=c;p-=_}else if(p<v){_=v-p;t-=_;p=v;d-=_}if(i){if(o==="auto"&&h!=="auto"){a.setSize(p+"px")}else if(o!=="auto"&&h==="auto"){s.setSize(d+"px")}else{s.setSize(d+"px");a.setSize(p+"px")}}else{l.css(this._sizeType,d+"px");u.css(this._sizeType,p+"px")}};u.prototype._delayedResize=function(e){if(e===undefined){e=0}if(this.getDomRef()){clearTimeout(this._resizeTimeout);setTimeout(this["_resize"].bind(this),e)}};u.prototype._resizeBars=function(e){var t,i;var r=this.$();for(t=0;t<e.length-1;++t){i=this.$("splitbar-"+t);i.css(this._sizeTypeNot,"")}for(t=0;t<e.length-1;++t){i=this.$("splitbar-"+t);var s=this._bHorizontal?r.height():r.width();i.css(this._sizeType,"");i.css(this._sizeTypeNot,s+"px")}};u.prototype._resize=function(){var e=this.getDomRef();if(!e||s.getPreserveAreaRef().contains(e)){return}var t=0,i;var r=this._getContentAreas();this._resizeBars(r);var a=this.getCalculatedSizes();this._recalculateSizes();var n=this.getCalculatedSizes();var o=false;for(t=0;t<n.length;++t){if(n[t]!==0){o=true;break}}if(!o){this._delayedResize(100);return}var h=true;for(t=0;t<r.length;++t){var l=this.$("content-"+t);var u=r[t];l.css(this._sizeType,n[t]+"px");l.css(this._sizeTypeNot,"");var d=u.getLayoutData();var c=d&&d.getResizable();if(t>0){var v=c&&h;i=this.$("splitbar-"+(t-1));i.toggleClass("sapUiLoSplitterNoResize",!v);i.attr("tabindex",v&&this._keyboardEnabled?"0":"-1")}h=c}this._resizeBars(r);if(p(a,n)){this.fireResize({oldSizes:a,newSizes:n})}};u.prototype._calculateAvailableContentSize=function(e){var t=0;var i=this.$();var r=this._bHorizontal?i.innerWidth():i.innerHeight();var s=0;var a=false;for(t=0;t<e.length;++t){var n=e[t];if(n.indexOf("%")>-1){s++}if(e[t]=="auto"){a=true}}s+=a?1:0;r-=s;var o=e.length-1;var h=0;for(t=0;t<o;++t){h+=this._bHorizontal?this.$("splitbar-"+t).innerWidth():this.$("splitbar-"+t).innerHeight()}return Math.max(0,r-h)};u.prototype._recalculateSizes=function(){var e,t,i,r,s;var a=[];var o=this._getContentAreas();for(e=0;e<o.length;++e){i=o[e].getLayoutData();t=i?i.getSize():"auto";a.push(t)}this._calculatedSizes=[];var h=this._calculateAvailableContentSize(a);var u=[];var d=[];var p=[];var c=h;for(e=0;e<a.length;++e){t=a[e];var v;if(t.indexOf("rem")>-1){v=parseFloat(t)*l;c-=v;this._calculatedSizes[e]=v}else if(t.indexOf("px")>-1){v=parseInt(t);c-=v;this._calculatedSizes[e]=v}else if(t.indexOf("%")>-1){p.push(e)}else if(a[e]=="auto"){i=o[e].getLayoutData();if(i&&parseInt(i.getMinSize())!=0){d.push(e)}else{u.push(e)}}else{n.error("Illegal size value: "+a[e])}}var _=false;if(c<0){_=true;c=0}var g=p.length;for(e=0;e<g;++e){s=p[e];r=Math.floor(parseFloat(a[s])/100*h);this._calculatedSizes[s]=r;c-=r}h=c;if(h<0){_=true;h=0}r=Math.floor(h/(d.length+u.length),0);var f=d.length;for(e=0;e<f;++e){s=d[e];var z=parseInt(o[s].getLayoutData().getMinSize());if(z>r){this._calculatedSizes[s]=z;h-=z}else{this._calculatedSizes[s]=r;h-=r}}if(h<0){_=true;h=0}c=h;var y=u.length;r=Math.floor(h/y,0);for(e=0;e<y;++e){s=u[e];this._calculatedSizes[s]=r;c-=r}if(_){n.info("[Splitter] The set sizes and minimal sizes of the splitter contents are bigger "+"than the available space in the UI.")}};u.prototype._switchOrientation=function(){this._bHorizontal=this.getOrientation()===h.Horizontal;if(this._bHorizontal){this._sizeDirNot="top";this._sizeTypeNot="height";this._sizeType="width";this._moveCord="pageX";if(this._bRtl){this._sizeDir="right"}else{this._sizeDir="left"}}else{this._moveCord="pageY";this._sizeType="height";this._sizeTypeNot="width";this._sizeDir="top";this._sizeDirNot="left"}var e=this.$();e.toggleClass("sapUiLoSplitterH",this._bHorizontal);e.toggleClass("sapUiLoSplitterV",!this._bHorizontal)};u.prototype._onKeyboardResize=function(e,t,i){var r=this.getId()+"-splitbar-";if(!i||!i.target||!i.target.id||i.target.id.indexOf(r)!==0){return}var s=999999;var a=parseInt(i.target.id.substr(r.length));var o=this.getCalculatedSizes();this._move.c1Size=o[a];this._move.c2Size=o[a+1];var h=0;switch(e){case"inc":h=t;break;case"incMore":h=t*10;break;case"dec":h=0-t;break;case"decMore":h=0-t*10;break;case"max":h=s;break;case"min":h=0-s;break;default:n.warn("[Splitter] Invalid keyboard resize type");break}this._resizeContents(a,h,true)};u.prototype._enableKeyboardListeners=function(){this.onsapright=this._keyListeners.increase;this.onsapdown=this._keyListeners.increase;this.onsapleft=this._keyListeners.decrease;this.onsapup=this._keyListeners.decrease;this.onsappageup=this._keyListeners.decreaseMore;this.onsappagedown=this._keyListeners.increaseMore;this.onsapend=this._keyListeners.max;this.onsaphome=this._keyListeners.min;this._keyboardEnabled=true};u.prototype._disableKeyboardListeners=function(){delete this.onsapincreasemodifiers;delete this.onsapdecreasemodifiers;delete this.onsapendmodifiers;delete this.onsaphomemodifiers;this._keyboardEnabled=false};u.prototype._getText=function(e,t){return d?d.getText(e,t):e};function p(e,t){if(e===t){return false}if(!e||!t||e.length===undefined||t.length===undefined){return true}if(e.length!=t.length){return true}for(var i=0;i<e.length;++i){if(e[i]!==t[i]){return true}}return false}function c(e){var t=function(e){e.preventDefault()};var i=null;i=function(){document.removeEventListener("touchend",i);document.removeEventListener("touchmove",t);document.removeEventListener("mouseup",i);document.removeEventListener("mousemove",t)};if(e){this._ignoreMouse=true;document.addEventListener("touchend",i);document.addEventListener("touchmove",t)}else{document.addEventListener("mouseup",i);document.addEventListener("mousemove",t)}}function v(e){var t=e.getLayoutData();if(t&&(!t.getResizable||!t.getSize||!t.getMinSize)){n.warning('Content "'+e.getId()+'" for the Splitter contained wrong LayoutData. '+"The LayoutData has been replaced with default values.");t=null}if(!t){e.setLayoutData(new sap.ui.layout.SplitterLayoutData)}}u.prototype.invalidate=function(t){var i=t&&this.indexOfContentArea(t)!=-1||t&&t instanceof sap.ui.core.CustomData&&t.getWriteToDom()||t===undefined;if(i||this._needsInvalidation){this._needsInvalidation=false;e.prototype.invalidate.apply(this,arguments)}};u.prototype.setOrientation=function(e){var t=this.setProperty("orientation",e,true);this._switchOrientation();this._delayedResize();this.$().find(".sapUiLoSplitterBar").attr("aria-orientation",this._bHorizontal?"vertical":"horizontal");return t};u.prototype.setWidth=function(e){this.setProperty("width",e,true);this.$().css("width",this.getProperty("width"));return this};u.prototype.setHeight=function(e){this.setProperty("height",e,true);this.$().css("height",this.getProperty("height"));return this};u.prototype.addContentArea=function(e){this._needsInvalidation=true;v(e);return this.addAggregation("contentAreas",e)};u.prototype.removeContentArea=function(e){this._needsInvalidation=true;return this.removeAggregation("contentAreas",e)};u.prototype.removeAllContentArea=function(){this._needsInvalidation=true;return this.removeAllAggregation("contentAreas")};u.prototype.destroyContentArea=function(){this._needsInvalidation=true;return this.destroyAggregation("contentAreas")};u.prototype.insertContentArea=function(e,t){this._needsInvalidation=true;v(e);return this.insertAggregation("contentAreas",e,t)};u.prototype._getContentAreas=function(){return this.getContentAreas()};return u});