/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,i=e.Severity,n=e.Audiences;var a=[1.5,2],s=3e3;function r(e,t){return new Promise(function(i,n){var a=e.getSrc(),r=e._generateSrcByDensity(a,t),o=document.createElement("IMG"),d=false;o.setAttribute("src",r);o.style.position="absolute";o.style.left="-10000px";o.style.top="-10000px";function u(){c();i(true)}function l(){c();i(false)}function c(){o.remove();d=true}o.addEventListener("load",u);o.addEventListener("error",l);document.body.appendChild(o);setTimeout(function(){if(!d){n()}},s)})}var o={id:"densityAwareImage",audiences:[n.Control],categories:[t.Usability],enabled:true,async:true,minversion:"1.60",title:"Image: Density awareness disabled",description:"We checked that your application provides high-density version(s) of the listed image(s). "+'However, the high-density version(s) will be ignored, because the "densityAware" property of this image is disabled. '+'Since UI5 1.60, the "densityAware" property is no longer enabled by default. You need to enable it explicitly.',resolution:'Enable the "densityAware" property of this image control',resolutionurls:[{text:"API Refrence for sap.m.Image",href:"https://sapui5.hana.ondemand.com/#/api/sap.m.Image"}],check:function(e,t,n,s){var o=[],d=[],u,l,c;n.getElementsByClassName("sap.m.Image").forEach(function(t){if(!t.getDensityAware()){a.forEach(function(n){u=r(t,n);o.push(u);u.then(function(n){if(!n){return}l=t.getId();if(d.indexOf(l)>-1){return}d.push(l);c=t.getMetadata().getElementName();e.addIssue({severity:i.Low,details:"Image '"+c+"' ("+l+") has 'densityAware' disabled even though high-density version is also available",context:{id:l}})}).catch(function(){})})}});Promise.all(o).then(s)}};return[o]},true);