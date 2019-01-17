/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepEqual","sap/base/strings/hash"],function(e,i){"use strict";var n=function(n,l,t){var s={},f=[],u=[],r,o,d,h=0,a=0,g,p,y,b,C=[];if(n===l||e(n,l)){return C}t=t||function(e){if(typeof e!=="string"){e=JSON.stringify(e)||""}return i(e)};for(var O=0;O<l.length;O++){o=t(l[O]);d=s[o];if(!d){d=s[o]={iNewCount:0,iOldCount:0}}d.iNewCount++;u[O]={symbol:d}}for(var O=0;O<n.length;O++){o=t(n[O]);d=s[o];if(!d){d=s[o]={iNewCount:0,iOldCount:0}}d.iOldCount++;d.iOldLine=O;f[O]={symbol:d}}for(var O=0;O<u.length;O++){d=u[O].symbol;if(d.iNewCount===1&&d.iOldCount===1){u[O].line=d.iOldLine;f[d.iOldLine].line=O}}for(var O=0;O<u.length-1;O++){r=u[O].line;if(r!==undefined&&r<f.length-1){if(f[r+1].symbol===u[O+1].symbol){f[r+1].line=O+1;u[O+1].line=r+1}}}for(var O=u.length-1;O>0;O--){r=u[O].line;if(r!==undefined&&r>0){if(f[r-1].symbol===u[O-1].symbol){f[r-1].line=O-1;u[O-1].line=r-1}}}while(h<n.length||a<l.length){p=f[h]&&f[h].line;g=u[a]&&u[a].line;if(h<n.length&&(p===undefined||p<a)){C.push({index:a,type:"delete"});h++}else if(a<l.length&&(g===undefined||g<h)){C.push({index:a,type:"insert"});a++}else if(a===p){a++;h++}else{b=p-a;y=g-h;if(b<=y){C.push({index:a,type:"insert"});a++}else{C.push({index:a,type:"delete"});h++}}}return C};return n});