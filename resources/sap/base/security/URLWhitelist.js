/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert"],function(a){"use strict";var t={};function e(a,t,e,f){if(a){this.protocol=a.toUpperCase()}if(t){this.host=t.toUpperCase()}this.port=e;this.path=f}var f=[];t.clear=function(){f.splice(0,f.length)};t.add=function(a,t,r,i){var s=new e(a,t,r,i);var n=f.length;f[n]=s};t.delete=function(a){f.splice(f.indexOf(a),1)};t.entries=function(){return f.slice()};t.validate=function(t){var r=/^(?:([^:\/?#]+):)?((?:\/\/((?:\[[^\]]+\]|[^\/?#:]+))(?::([0-9]+))?)?([^?#]*))(?:\?([^#]*))?(?:#(.*))?$/.exec(t);if(!r){return false}var i=r[1],s=r[2],n=r[3],l=r[4],o=r[5],p=r[6],u=r[7];var v=/^([a-z0-9-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*$/i;var h=/^([a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*$/i;var c=h;var $=/^([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+(?:\.([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;var z=/^([0-9]{1,3}\.){3}[0-9]{1,3}$/;var g=/^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;var d=/^\[[^\]]+\]$/;var x=/^\[(((([0-9a-f]{1,4}:){6}|(::([0-9a-f]{1,4}:){5})|(([0-9a-f]{1,4})?::([0-9a-f]{1,4}:){4})|((([0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::([0-9a-f]{1,4}:){3})|((([0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::([0-9a-f]{1,4}:){2})|((([0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:)|((([0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::))(([0-9a-f]{1,4}:[0-9a-f]{1,4})|(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])))|((([0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4})|((([0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::))\]$/i;var C=/^([a-z0-9]([a-z0-9\-]*[a-z0-9])?\.)*[a-z0-9]([a-z0-9\-]*[a-z0-9])?$/i;if(i){i=i.toUpperCase();if(f.length<=0){if(!/^(https?|ftp)/i.test(i)){return false}}}if(n){if(z.test(n)){if(!g.test(n)){return false}}else if(d.test(n)){if(!x.test(n)){return false}}else if(!C.test(n)){return false}n=n.toUpperCase()}if(o){if(i==="MAILTO"){var U=s.split(",");for(var _=0;_<U.length;_++){if(!$.test(U[_])){return false}}}else{var w=o.split("/");for(var _=0;_<w.length;_++){if(!v.test(w[_])){return false}}}}if(p){if(!h.test(p)){return false}}if(u){if(!c.test(u)){return false}}if(f.length>0){var b=false;for(var _=0;_<f.length;_++){a(f[_]instanceof e,"whitelist entry type wrong");if(!i||!f[_].protocol||i==f[_].protocol){var y=false;if(n&&f[_].host&&/^\*/.test(f[_].host)){var E=f[_].host.slice(1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");var O=RegExp(E+"$");if(O.test(n)){y=true}}else if(!n||!f[_].host||n==f[_].host){y=true}if(y){if(!n&&!l||!f[_].port||l==f[_].port){if(f[_].path&&/\*$/.test(f[_].path)){var R=f[_].path.slice(0,-1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");var O=RegExp("^"+R);if(O.test(o)){b=true}}else if(!f[_].path||o==f[_].path){b=true}}}}if(b){break}}if(!b){return false}}return true};return t});