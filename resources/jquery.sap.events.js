/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/events/ControlEvents","sap/ui/events/PseudoEvents","sap/ui/events/checkMouseEnterOrLeave","sap/ui/events/isSpecialKey","sap/ui/events/isMouseEventDelayed","sap/ui/events/F6Navigation","sap/ui/events/jquery/EventExtension","sap/ui/events/jquery/EventSimulation","sap/ui/events/KeyCodes","sap/base/util/defineCoupledProperty"],function(e,n,s,a,t,u,i,o,r,p,v){"use strict";e.sap.PseudoEvents=s.events;e.sap.ControlEvents=n.events;e.sap.disableTouchToMouseHandling=r.disableTouchToMouseHandling;v(e.sap,"touchEventMode",r,"touchEventMode");e.sap.bindAnyEvent=n.bindAnyEvent;e.sap.unbindAnyEvent=n.unbindAnyEvent;e.sap.checkMouseEnterOrLeave=a;e.sap.isSpecialKey=function(e){if(e.key){return t(e)}function n(e){var n=e.which;return n===p.SHIFT||n===p.CONTROL||n===p.ALT||n===p.CAPS_LOCK||n===p.NUM_LOCK}function s(e){var n=e.which,s=n>=37&&n<=40;switch(e.type){case"keydown":case"keyup":return s;case"keypress":return n===0;default:return false}}var a=e.which,u=n(e)||s(e)||a>=33&&a<=36||a>=44&&a<=46||a>=112&&a<=123||a===p.BREAK||a===p.BACKSPACE||a===p.TAB||a===p.ENTER||a===p.ESCAPE||a===p.SCROLL_LOCK;switch(e.type){case"keydown":case"keyup":return u;case"keypress":return a===0||a===p.BACKSPACE||a===p.ESCAPE||a===p.ENTER||false;default:return false}};e.sap.handleF6GroupNavigation=function(e,n){if(!e.key&&e.keyCode===p.F6){e.key="F6"}return i.handleF6GroupNavigation(e,n)};e.sap._FASTNAVIGATIONKEY=i.fastNavigationKey;e.sap._refreshMouseEventDelayedFlag=function(n){e.sap.isMouseEventDelayed=u.apply(this,arguments)};e.sap._refreshMouseEventDelayedFlag(navigator);return e});