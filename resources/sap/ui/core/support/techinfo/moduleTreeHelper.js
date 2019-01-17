/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{set:function(e,t,i,n){t=t==="/"?"":t;var r=t.split("/"),s=r.length,o;if(s>0){for(o=0;e&&o<s-1;o++){if(!e[r[o]]){e[r[o]]={}}if(e[r[o]]){e=e[r[o]]}}if(typeof e[r[s-1]]!=="undefined"||r[s-1]===""||n){if(typeof e[r[s-1]]!=="object"){e[r[s-1]]=i}else{e[r[s-1]][""]=i}}}},get:function(e,t){t=t==="/"?"":t;var i=t.split("/"),n=i.length,r;if(n>0){for(r=0;e&&r<n-1;r++){if(!e[i[r]]){return false}e=e[i[r]]}return e[i[n-1]]}},modulesToHierarchy:function(e,t){var i=e.modules,n=window["sap-ui-debug"];jQuery.each(i,function(e){this.set(t,e,false,true)}.bind(this));if(n===true||n==="x"||n==="X"){this.set(t,"/",true)}else if(n&&typeof n==="string"){n.split(/,/).forEach(function(e){if(/\*/.test(e)){var n=new RegExp("^(?:"+this.makeRegExp(e)+")");var r={};Object.keys(i).forEach(function(e){var t=e.split("/").slice(0,-1).join("/")+"/";r[t]=""});for(var s in i){r[s]=i[s]}jQuery.each(r,function(e){if(n.test(e)){this.set(t,e,true)}}.bind(this))}else{this.set(t,e,true)}}.bind(this))}},toTreeModel:function(e){var t={},i={text:"All"},n;this.modulesToHierarchy(e,t);n=this.setTreeNode(t,i,0,window["sap-ui-debug"]===true);if(!n){n=0}return{tree:i,depth:n}},setTreeNode:function(e,t,i,n){var r,s;n=e===true||e[""]||n;t.nodes=[];t.selected=n;if(n){r=i}for(var o in e){if(o===""){continue}var f={text:o};s=this.setTreeNode(e[o],f,i+1,n);if(s>r||!r){r=s}t.nodes.push(f)}return r},toHierarchy:function(e){var t={};e.selected=this.isNodeSelected(e);this.setHierarchyNode(t,e);return t},isNodeSelected:function(e){var t=0,i;for(var n=0;n<e.nodes.length;n++){i=e.nodes[n];if(i.nodes.length){i.selected=this.isNodeSelected(i)}if(i.selected){t++}}return t===e.nodes.length},setHierarchyNode:function(e,t){if(t.selected){e[""]=true}for(var i=0;i<t.nodes.length;i++){e[t.nodes[i].text]={};if(t.nodes[i].nodes.length){this.setHierarchyNode(e[t.nodes[i].text],t.nodes[i])}else{e[t.nodes[i].text]=t.nodes[i].selected}}},toDebugInfo:function(e,t){var i=this.toHierarchy(e),n=[];function r(e,t){var i,s;if(typeof t==="object"){if(t[""]){n.push(e+"/");return}i=Object.keys(t);s=i.length}if(s){i.forEach(function(i){if(i===""){return}if(t[i]===true){n.push((e?e+"/":"")+i)}else if(typeof t[i]==="object"){r((e?e+"/":"")+i,t[i])}})}}if(this.get(i,"/")){return true}r("",i);return n.length>0?n.join(t||","):false},makeRegExp:function(e){if(!/\/\*\*\/$/.test(e)){e=e.replace(/\/$/,"/**/")}return e.replace(/\*\*\/|\*|[[\]{}()+?.\\^$|]/g,function(e){switch(e){case"**/":return"(?:[^/]+/)*";case"*":return"[^/]*";default:return"\\"+e}})},getSelectionCount:function(e){var t=this.toDebugInfo(e);if(t===true){return 1}else if(t){return t.split(",").length}return 0},recursiveSelect:function(e,t){e.selected=t;for(var i=0;i<e.nodes.length;i++){this.recursiveSelect(e.nodes[i],t)}}}});