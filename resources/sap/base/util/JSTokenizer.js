/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";
/*
	 * The following code has been taken from the component JSON in JavaScript
	 * from Douglas Crockford which is licensed under Public Domain
	 * (http://www.json.org/ > JavaScript > json-2). The code contains
	 * local modifications.
	 *
	 * Git URL: https://github.com/douglascrockford/JSON-js/blob/42c18c621a411c3f39a81bb0a387fc50dcd738d9/json_parse.js
	 */var t=function(){this.at;this.ch;this.escapee={'"':'"',"'":"'","\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"};this.text};t.prototype.error=function(t){throw{name:"SyntaxError",message:t,at:this.at,text:this.text}};t.prototype.next=function(t){if(t&&t!==this.ch){this.error("Expected '"+t+"' instead of '"+this.ch+"'")}this.ch=this.text.charAt(this.at);this.at+=1;return this.ch};t.prototype.number=function(){var t,i="";if(this.ch==="-"){i="-";this.next("-")}while(this.ch>="0"&&this.ch<="9"){i+=this.ch;this.next()}if(this.ch==="."){i+=".";while(this.next()&&this.ch>="0"&&this.ch<="9"){i+=this.ch}}if(this.ch==="e"||this.ch==="E"){i+=this.ch;this.next();if(this.ch==="-"||this.ch==="+"){i+=this.ch;this.next()}while(this.ch>="0"&&this.ch<="9"){i+=this.ch;this.next()}}t=+i;if(!isFinite(t)){this.error("Bad number")}else{return t}};t.prototype.string=function(){var t,i,h="",e,s;if(this.ch==='"'||this.ch==="'"){e=this.ch;while(this.next()){if(this.ch===e){this.next();return h}if(this.ch==="\\"){this.next();if(this.ch==="u"){s=0;for(i=0;i<4;i+=1){t=parseInt(this.next(),16);if(!isFinite(t)){break}s=s*16+t}h+=String.fromCharCode(s)}else if(typeof this.escapee[this.ch]==="string"){h+=this.escapee[this.ch]}else{break}}else{h+=this.ch}}}this.error("Bad string")};t.prototype.name=function(){var t="",i=function(t){return t==="_"||t==="$"||t>="0"&&t<="9"||t>="a"&&t<="z"||t>="A"&&t<="Z"};if(i(this.ch)){t+=this.ch}else{this.error("Bad name")}while(this.next()){if(this.ch===" "){this.next();return t}if(this.ch===":"){return t}if(i(this.ch)){t+=this.ch}else{this.error("Bad name")}}this.error("Bad name")};t.prototype.white=function(){while(this.ch&&this.ch<=" "){this.next()}};t.prototype.word=function(){switch(this.ch){case"t":this.next("t");this.next("r");this.next("u");this.next("e");return true;case"f":this.next("f");this.next("a");this.next("l");this.next("s");this.next("e");return false;case"n":this.next("n");this.next("u");this.next("l");this.next("l");return null}this.error("Unexpected '"+this.ch+"'")};t.prototype.array=function(){var t=[];if(this.ch==="["){this.next("[");this.white();if(this.ch==="]"){this.next("]");return t}while(this.ch){t.push(this.value());this.white();if(this.ch==="]"){this.next("]");return t}this.next(",");this.white()}}this.error("Bad array")};var i=function(){var t,i={};if(this.ch==="{"){this.next("{");this.white();if(this.ch==="}"){this.next("}");return i}while(this.ch){if(this.ch>="0"&&this.ch<="9"){t=this.number()}else if(this.ch==='"'||this.ch==="'"){t=this.string()}else{t=this.name()}this.white();this.next(":");if(Object.hasOwnProperty.call(i,t)){this.error('Duplicate key "'+t+'"')}i[t]=this.value();this.white();if(this.ch==="}"){this.next("}");return i}this.next(",");this.white()}}this.error("Bad object")};t.prototype.value=function(){this.white();switch(this.ch){case"{":return i.call(this);case"[":return this.array();case'"':case"'":return this.string();case"-":return this.number();default:return this.ch>="0"&&this.ch<="9"?this.number():this.word()}};t.prototype.getIndex=function(){return this.at-1};t.prototype.getCh=function(){return this.ch};t.prototype.init=function(t,i){this.text=t;this.at=i||0;this.ch=" "};t.prototype.setIndex=function(t){if(t<this.at-1){throw new Error("Must not set index "+t+" before previous index "+(this.at-1))}this.at=t;this.next()};t.parseJS=function(i,h){var e=new t;var s;e.init(i,h);s=e.value();if(isNaN(h)){e.white();if(e.getCh()){e.error("Syntax error")}return s}else{return{result:s,at:e.getIndex()}}};return t});