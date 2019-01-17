/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Dialog","./ComboBoxTextField","./Toolbar","./Button","./Bar","./Text","./Title","sap/ui/core/InvisibleText","sap/ui/core/IconPool","sap/ui/core/ValueStateSupport","sap/base/Log","./library","sap/ui/Device","sap/ui/core/library","./ComboBoxBaseRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/base/strings/escapeRegExp"],function(t,e,i,s,n,o,r,a,l,u,p,h,c,d,f,g,y,m,I,b){"use strict";var S=h.PlacementType;var v=d.ValueState;var P=e.extend("sap.m.ComboBoxBase",{metadata:{library:"sap.m",abstract:true,defaultAggregation:"items",properties:{showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"}},events:{loadItems:{}}}});P.DEFAULT_TEXT_FILTER=function(t,e,i){var s,n,o;if(!e[i]){return false}s=e[i]().toLowerCase();n=t.toLowerCase();o=new RegExp("(\\b"+b(n)+").*","gi");return o.test(s)};P.prototype.updateItems=function(t){this.bItemsUpdated=false;this.destroyItems();this.updateAggregation("items");this.bItemsUpdated=true;if(this.hasLoadItemsEventListeners()){this.onItemsLoaded()}};P.prototype.setFilterFunction=function(t){if(t===null||t===undefined){this.fnFilter=null;return this}if(typeof t!=="function"){p.warning("Passed filter is not a function and the default implementation will be used")}else{this.fnFilter=t}return this};P.prototype.highLightList=function(t,e){var i=t.length,t=t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),s=new RegExp("\\b"+t,"gi"),n;e.forEach(function(t){n=m(t.ref);n.html(this._boldItemRef.call(this,t.text,s,i))},this)};P.prototype._boldItemRef=function(t,e,i){e.lastIndex=0;var s,n=e.exec(t);if(n===null){return I(t)}var o=n.index;var r="<b>"+I(t.slice(o,o+i))+"</b>";var a=t.split(e);if(a.length===1){s=I(t)}else{s=a.map(function(t){return I(t)}).join(r)}return s};P.prototype.refreshItems=function(){this.bItemsUpdated=false;this.refreshAggregation("items")};P.prototype.loadItems=function(t,e){var i=typeof t==="function";if(this.hasLoadItemsEventListeners()&&this.getItems().length===0){this._bOnItemsLoadedScheduled=false;if(i){e=m.extend({action:t,busyIndicator:true,busyIndicatorDelay:300},e);this.aMessageQueue.push(e);if(this.iLoadItemsEventInitialProcessingTimeoutID===-1&&e.busyIndicator){this.iLoadItemsEventInitialProcessingTimeoutID=setTimeout(function t(){this.setInternalBusyIndicatorDelay(0);this.setInternalBusyIndicator(true)}.bind(this),e.busyIndicatorDelay)}}if(!this.bProcessingLoadItemsEvent){this.bProcessingLoadItemsEvent=true;this.fireLoadItems()}}else if(i){t.call(this)}};P.prototype.onItemsLoaded=function(){this.bProcessingLoadItemsEvent=false;clearTimeout(this.iLoadItemsEventInitialProcessingTimeoutID);if(this.bInitialBusyIndicatorState!==this.getBusy()){this.setInternalBusyIndicator(this.bInitialBusyIndicatorState)}if(this.iInitialBusyIndicatorDelay!==this.getBusyIndicatorDelay()){this.setInternalBusyIndicatorDelay(this.iInitialBusyIndicatorDelay)}for(var t=0,e,i,s;t<this.aMessageQueue.length;t++){e=this.aMessageQueue.shift();t--;s=t+1===this.aMessageQueue.length;i=s?null:this.aMessageQueue[t+1];if(typeof e.action==="function"){if(e.name==="input"&&!s&&i.name==="input"){continue}e.action.call(this)}}};P.prototype.hasLoadItemsEventListeners=function(){return this.hasListeners("loadItems")};P.prototype._scheduleOnItemsLoadedOnce=function(){if(!this._bOnItemsLoadedScheduled&&!this.isBound("items")&&this.hasLoadItemsEventListeners()&&this.bProcessingLoadItemsEvent){this._bOnItemsLoadedScheduled=true;setTimeout(this.onItemsLoaded.bind(this),0)}};P.prototype.getPickerInvisibleTextId=function(){return a.getStaticId("sap.m","COMBOBOX_AVAILABLE_OPTIONS")};P.prototype.init=function(){e.prototype.init.apply(this,arguments);this.setPickerType(c.system.phone?"Dialog":"Dropdown");this.createPicker(this.getPickerType());this.bItemsUpdated=false;this.bOpenedByKeyboardOrButton=false;this._bShouldClosePicker=false;this._oPickerValueStateText=null;this.bProcessingLoadItemsEvent=false;this.iLoadItemsEventInitialProcessingTimeoutID=-1;this.aMessageQueue=[];this.bInitialBusyIndicatorState=this.getBusy();this.iInitialBusyIndicatorDelay=this.getBusyIndicatorDelay();this._bOnItemsLoadedScheduled=false;this._bDoTypeAhead=true;this.getIcon().addEventDelegate({onmousedown:function(t){this._bShouldClosePicker=this.isOpen()}},this);this.getIcon().attachPress(function(t){var e;if(!this.getEnabled()||!this.getEditable()){return}if(this._bShouldClosePicker){this._bShouldClosePicker=false;this.close();return}this.loadItems();this.bOpenedByKeyboardOrButton=true;if(this.isPlatformTablet()){e=this.getPicker();e.setInitialFocus(e)}this.open()},this);this.fnFilter=null};P.prototype.onBeforeRendering=function(){var t=this.getValueState()===v.None;e.prototype.onBeforeRendering.apply(this,arguments);if(!this.isPickerDialog()&&t){this._showValueStateText(false)}};P.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this.getList()){this.getList().destroy();this._oList=null}if(this._oPickerValueStateText){this._oPickerValueStateText.destroy()}clearTimeout(this.iLoadItemsEventInitialProcessingTimeoutID);this.aMessageQueue=null;this.fnFilter=null};P.prototype.onsapshow=function(t){if(!this.getEnabled()||!this.getEditable()){return}t.setMarked();if(t.keyCode===y.F4){this.onF4(t)}if(this.isOpen()){this.close();return}this.selectText(0,this.getValue().length);this.loadItems();this.bOpenedByKeyboardOrButton=true;this.open()};P.prototype.onF4=function(t){t.preventDefault()};P.prototype.onsapescape=function(t){if(this.getEnabled()&&this.getEditable()&&this.isOpen()){t.setMarked();t.preventDefault();this.close()}else{e.prototype.onsapescape.apply(this,arguments)}};P.prototype.onsaphide=P.prototype.onsapshow;P.prototype.onsapfocusleave=function(t){if(!t.relatedControlId){e.prototype.onsapfocusleave.apply(this,arguments);return}var i=sap.ui.getCore().byId(t.relatedControlId);if(i===this){return}var s=this.getAggregation("picker"),n=i&&i.getFocusDomRef();if(s&&g(s.getFocusDomRef(),n)){return}e.prototype.onsapfocusleave.apply(this,arguments)};P.prototype.getPopupAnchorDomRef=function(){return this.getDomRef()};P.prototype.addContent=function(t){};P.prototype.getList=function(){if(this.bIsDestroyed){return null}return this._oList};P.prototype.setPickerType=function(t){this._sPickerType=t};P.prototype.getPickerType=function(){return this._sPickerType};P.prototype.setValueState=function(t){var i,s=this.getValueStateText(),n=t===v.None?false:this.getShowValueStateMessage();this._sOldValueState=this.getValueState();e.prototype.setValueState.apply(this,arguments);this._showValueStateText(n);if(s){this._setValueStateText(s)}else{i=u.getAdditionalText(this);this._setValueStateText(i)}this._alignValueStateStyles();return this};P.prototype.setValueStateText=function(t){e.prototype.setValueStateText.apply(this,arguments);this._setValueStateText(this.getValueStateText());return this};P.prototype.setShowValueStateMessage=function(t){e.prototype.setShowValueStateMessage.apply(this,arguments);this._showValueStateText(this.getShowValueStateMessage());return this};P.prototype._showValueStateText=function(t){var e;if(this.isPickerDialog()){if(this._oPickerValueStateText){this._oPickerValueStateText.setVisible(t)}}else{e=this._getPickerCustomHeader();if(e){e.setVisible(t)}}};P.prototype._setValueStateText=function(t){var e;if(this.isPickerDialog()){this._oPickerValueStateText=this.getPickerValueStateText();this._oPickerValueStateText.setText(t)}else{e=this._getPickerCustomHeader();if(e){e.getContentLeft()[0].setText(t)}}};P.prototype._getPickerCustomHeader=function(){var t,e,i=this.getPicker(),s=this.getRenderer().CSS_CLASS_COMBOBOXBASE+"PickerTitle";if(!i){return null}if(i.getCustomHeader()){return i.getCustomHeader()}t=new r({textAlign:"Left"}).addStyleClass(s);e=new n({visible:false,contentLeft:t});i.setCustomHeader(e);return e};P.prototype._alignValueStateStyles=function(){var t=this._sOldValueState,e=this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Picker",i=e+"ValueState",s=e+t+"State",n=e+this.getValueState()+"State",o;if(this.isPickerDialog()&&this._oPickerValueStateText){this._oPickerValueStateText.addStyleClass(i);this._oPickerValueStateText.removeStyleClass(s);this._oPickerValueStateText.addStyleClass(n)}else{o=this._getPickerCustomHeader();if(o){o.addStyleClass(i);o.removeStyleClass(s);o.addStyleClass(n)}}};P.prototype.shouldValueStateMessageBeOpened=function(){var t=e.prototype.shouldValueStateMessageBeOpened.apply(this,arguments);return t&&!this.isOpen()};P.prototype.onPropertyChange=function(t,e){var i=t.getParameter("newValue"),s=t.getParameter("name"),n="set"+s.charAt(0).toUpperCase()+s.slice(1),o=e&&e.srcControl||this.getPickerTextField();if(/\bvalue\b|\benabled\b|\bname\b|\bplaceholder\b|\beditable\b|\btextAlign\b|\btextDirection\b|\bvalueState\b/.test(s)&&o&&typeof o[n]==="function"){o[n](i)}};P.prototype.isPickerDialog=function(){return this.getPickerType()==="Dialog"};P.prototype.isPlatformTablet=function(){var t=!c.system.combi,e=c.system.tablet&&t;return e};P.prototype.getDropdownSettings=function(){return{showArrow:false,placement:S.VerticalPreferredBottom,offsetX:0,offsetY:0,bounce:false,ariaLabelledBy:this.getPickerInvisibleTextId()||undefined}};P.prototype.getPickerValueStateText=function(){var t=this.getPicker();if(!this._oPickerValueStateText){this._oPickerValueStateText=new o({width:"100%"});t.insertContent(this._oPickerValueStateText,0)}return this._oPickerValueStateText};P.prototype.createPicker=function(t){};P.prototype.onBeforeClose=function(){this.bOpenedByKeyboardOrButton=false};P.prototype.getPicker=function(){if(this.bIsDestroyed){return null}return this.createPicker(this.getPickerType())};P.prototype.getPickerTextField=function(){var t=this.getPicker(),e=t.getSubHeader();return e&&e.getContent()[0]||null};P.prototype.getPickerTitle=function(){var t=this.getPicker(),e=t&&t.getCustomHeader();if(this.isPickerDialog()&&e){return e.getContentMiddle()[0]}return null};P.prototype.createDialog=function(){var e=this,s=this.createPickerTextField(),n=s._handleEvent;s._handleEvent=function(t){n.apply(this,arguments);if(/keydown|sapdown|sapup|saphome|sapend|sappagedown|sappageup|input/.test(t.type)){e._handleEvent(t)}};return new t({stretch:true,customHeader:e.createPickerHeader(),buttons:this.createPickerCloseButton(),subHeader:new i({content:s}),beforeOpen:function(){e.updatePickerHeaderTitle()},afterClose:function(){e.focus();h.closeKeyboard()},ariaLabelledBy:e.getPickerInvisibleTextId()||undefined})};P.prototype.createPickerHeader=function(){var t=this,e=l.getIconURI("decline");return new n({contentMiddle:new r,contentRight:new s({icon:e,press:function(){t.close();t.revertSelection()}})})};P.prototype.revertSelection=function(){};P.prototype.updatePickerHeaderTitle=function(){var t=this.getPicker(),e=sap.ui.getCore().getLibraryResourceBundle("sap.m"),i,s;if(!t){return}s=this.getLabels();if(s.length){i=s[0];if(i&&typeof i.getText==="function"){this.getPickerTitle().setText(i.getText())}}else{this.getPickerTitle().setText(e.getText("COMBOBOX_PICKER_TITLE"))}};P.prototype.createPickerCloseButton=function(){var t=this,e,i=sap.ui.getCore().getLibraryResourceBundle("sap.m");return new s({text:i.getText("COMBOBOX_CLOSE_BUTTON"),press:function(){e=t.getPickerTextField();t.updateDomValue(e.getValue());t.onChange();t.close()}})};P.prototype.hasContent=function(){return this.getItems().length>0};P.prototype.findFirstEnabledItem=function(t){var e=this.getList();return e?e.findFirstEnabledItem(t):null};P.prototype.findLastEnabledItem=function(t){var e=this.getList();return e?e.findLastEnabledItem(t):null};P.prototype.open=function(){var t=this.getPicker();if(t){t.open()}return this};P.prototype.getVisibleItems=function(){var t=this.getList();return t?t.getVisibleItems():[]};P.prototype.isItemSelected=function(){};P.prototype.getKeys=function(t){t=t||this.getItems();for(var e=0,i=[];e<t.length;e++){i[e]=t[e].getKey()}return i};P.prototype.getSelectableItems=function(){var t=this.getList();return t?t.getSelectableItems():[]};P.prototype.findItem=function(t,e){var i=this.getList();return i?i.findItem(t,e):null};P.prototype.getItemByText=function(t){return this.findItem("text",t)};P.prototype.scrollToItem=function(t){var e=this.getPicker(),i=e.getDomRef("cont"),s=t&&t.getDomRef();if(!e||!i||!s){return}var n=i.scrollTop,o=s.offsetTop,r=i.clientHeight,a=s.offsetHeight;if(n>o){i.scrollTop=o}else if(o+a>n+r){i.scrollTop=Math.ceil(o+a-r)}};P.prototype.clearFilter=function(){for(var t=0,e=this.getItems();t<e.length;t++){e[t].bVisible=true}};P.prototype.onItemChange=function(t){};P.prototype.clearSelection=function(){};P.prototype.setInternalBusyIndicator=function(t){this.bInitialBusyIndicatorState=this.getBusy();return this.setBusy.apply(this,arguments)};P.prototype.setInternalBusyIndicatorDelay=function(t){this.iInitialBusyIndicatorDelay=this.getBusyIndicatorDelay();return this.setBusyIndicatorDelay.apply(this,arguments)};P.prototype.addItem=function(t){this.addAggregation("items",t);if(t){t.attachEvent("_change",this.onItemChange,this)}this._scheduleOnItemsLoadedOnce();return this};P.prototype.insertItem=function(t,e){this.insertAggregation("items",t,e,true);if(t){t.attachEvent("_change",this.onItemChange,this)}this._scheduleOnItemsLoadedOnce();return this};P.prototype.getItemAt=function(t){return this.getItems()[+t]||null};P.prototype.getFirstItem=function(){return this.getItems()[0]||null};P.prototype.getLastItem=function(){var t=this.getItems();return t[t.length-1]||null};P.prototype.getEnabledItems=function(t){var e=this.getList();return e?e.getEnabledItems(t):[]};P.prototype.getItemByKey=function(t){var e=this.getList();return e?e.getItemByKey(t):null};P.prototype.isOpen=function(){var t=this.getAggregation("picker");return!!(t&&t.isOpen())};P.prototype.close=function(){var t=this.getAggregation("picker");if(t){t.close()}return this};P.prototype.removeItem=function(t){t=this.removeAggregation("items",t);if(t){t.detachEvent("_change",this.onItemChange,this)}return t};P.prototype.removeAllItems=function(){var t=this.removeAllAggregation("items");this.clearSelection();for(var e=0;e<t.length;e++){t[e].detachEvent("_change",this.onItemChange,this)}return t};P.prototype.intersectItems=function(t,e){return t.filter(function(t){return e.map(function(t){return t.getId()}).indexOf(t.getId())!==-1})};return P});