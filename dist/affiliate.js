!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Affiliate=e():t.Affiliate=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(o){if(s[o])return s[o].exports;var r=s[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var s={};return e.m=t,e.c=s,e.d=function(t,s,o){e.o(t,s)||Object.defineProperty(t,s,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,s){"use strict";var o=s(1),r=[],i=function(t,e){t?console.error("Affiliate: ",e):console.log("Affiliate: ",e)};t.exports=function(t){var e=new function(t){t=Object.assign({log:!1,tags:[]},t);var e=[];for(var s in t.tags)t.tags[s]=Object.assign({hosts:[],query:{},replace:[]},t.tags[s]),e=e.concat(t.tags[s].hosts);var r=!0,n=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;void 0===n&&(r=!1);var a=function(e){t.log&&i(!1,"Traversing DOM...");var s=[].slice.call(e.getElementsByTagName("a"));t.log&&i(!1,s);for(var o in s)h(s[o])},h=function(s){if(s&&s.getAttribute("href")){var r=o(s.getAttribute("href")||"",!0);if(-1!==e.indexOf(r.host))for(var i in t.tags)-1!==t.tags[i].hosts.indexOf(r.host)&&c(r,s,t.tags[i])}},c=function(e,s,o){if(!s.dataset||"true"!==s.dataset.modified){var r=e.href;if(t.log&&i(!1,"Discovered URL: "+e.href),e.set("query",Object.assign(e.query,o.query)),"function"==typeof o.modifyPath)try{e.set("pathname",o.modifyPath(e.pathname))}catch(t){i(!0,t)}if("function"==typeof o.modifyHost)try{e.set("host",o.modifyHost(e.host))}catch(t){i(!0,t)}var n=e.href;for(var a in o.replace)n=n.replace(o.replace[a].from,o.replace[a].to);s.setAttribute("href",n),s.dataset&&(s.dataset.originalHref=r,s.dataset.modified="true")}};r&&(this.observer=new n(function(t){i(!1,"DOM Mutation");for(var e in t)t[e].attributeName&&"href"!==t[e].attributeName||a(t[e].target)})),this.attach=function(){if("complete"!==document.readyState&&"interactive"!==document.readyState)return document.addEventListener("DOMContentLoaded",this.attach);a(document.body),r?this.observer.observe(document.body,{childList:!0,subtree:!0,attributes:!0,characterData:!0}):t.log&&i(!0,"Browser does not support MutationObserver.")}.bind(this),this.detach=function(){r?(i(!1,"Observer disconnected."),this.observer.disconnect()):t.log&&i(!0,"Nothing to detach.")}.bind(this)}(t);return r.push(e),e},t.exports.instances=function(){return[].concat(r)},t.exports.detachAll=function(){for(var t in r)r[t].detach()},t.exports.revert=function(){for(var t in r)r[t].detach();var e=[].slice.call(document.body.getElementsByTagName("a"));for(var t in e)e[t].dataset&&"true"===e[t].dataset.modified&&(e[t].setAttribute("href",e[t].dataset.originalHref),delete e[t].dataset.originalHref,delete e[t].dataset.modified)}},function(t,e,s){"use strict";(function(e){function o(t){var s,o={},r=typeof(t=t||e.location||{});if("blob:"===t.protocol)o=new i(unescape(t.pathname),{});else if("string"===r){o=new i(t,{});for(s in u)delete o[s]}else if("object"===r){for(s in t)s in u||(o[s]=t[s]);void 0===o.slashes&&(o.slashes=c.test(t.href))}return o}function r(t){var e=h.exec(t);return{protocol:e[1]?e[1].toLowerCase():"",slashes:!!e[2],rest:e[3]}}function i(t,e,s){if(!(this instanceof i))return new i(t,e,s);var h,c,u,l,p,d,m=f.slice(),v=typeof e,g=0;for("object"!==v&&"string"!==v&&(s=e,e=null),s&&"function"!=typeof s&&(s=a.parse),e=o(e),h=!(c=r(t||"")).protocol&&!c.slashes,this.slashes=c.slashes||h&&e.slashes,this.protocol=c.protocol||e.protocol||"",t=c.rest,c.slashes||(m[2]=[/(.*)/,"pathname"]);g<m.length;g++)u=(l=m[g])[0],d=l[1],u!=u?this[d]=t:"string"==typeof u?~(p=t.indexOf(u))&&("number"==typeof l[2]?(this[d]=t.slice(0,p),t=t.slice(p+l[2])):(this[d]=t.slice(p),t=t.slice(0,p))):(p=u.exec(t))&&(this[d]=p[1],t=t.slice(0,p.index)),this[d]=this[d]||(h&&l[3]?e[d]||"":""),l[4]&&(this[d]=this[d].toLowerCase());s&&(this.query=s(this.query)),h&&e.slashes&&"/"!==this.pathname.charAt(0)&&(""!==this.pathname||""!==e.pathname)&&(this.pathname=function(t,e){for(var s=(e||"/").split("/").slice(0,-1).concat(t.split("/")),o=s.length,r=s[o-1],i=!1,n=0;o--;)"."===s[o]?s.splice(o,1):".."===s[o]?(s.splice(o,1),n++):n&&(0===o&&(i=!0),s.splice(o,1),n--);return i&&s.unshift(""),"."!==r&&".."!==r||s.push(""),s.join("/")}(this.pathname,e.pathname)),n(this.port,this.protocol)||(this.host=this.hostname,this.port=""),this.username=this.password="",this.auth&&(l=this.auth.split(":"),this.username=l[0]||"",this.password=l[1]||""),this.origin=this.protocol&&this.host&&"file:"!==this.protocol?this.protocol+"//"+this.host:"null",this.href=this.toString()}var n=s(3),a=s(4),h=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,c=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,f=[["#","hash"],["?","query"],["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d+)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],u={hash:1,query:1};i.prototype={set:function(t,e,s){switch(t){case"query":"string"==typeof e&&e.length&&(e=(s||a.parse)(e)),this[t]=e;break;case"port":this[t]=e,n(e,this.protocol)?e&&(this.host=this.hostname+":"+e):(this.host=this.hostname,this[t]="");break;case"hostname":this[t]=e,this.port&&(e+=":"+this.port),this.host=e;break;case"host":this[t]=e,/:\d+$/.test(e)?(e=e.split(":"),this.port=e.pop(),this.hostname=e.join(":")):(this.hostname=e,this.port="");break;case"protocol":this.protocol=e.toLowerCase(),this.slashes=!s;break;case"pathname":case"hash":if(e){var o="pathname"===t?"/":"#";this[t]=e.charAt(0)!==o?o+e:e}else this[t]=e;break;default:this[t]=e}for(var r=0;r<f.length;r++){var i=f[r];i[4]&&(this[i[1]]=this[i[1]].toLowerCase())}return this.origin=this.protocol&&this.host&&"file:"!==this.protocol?this.protocol+"//"+this.host:"null",this.href=this.toString(),this},toString:function(t){t&&"function"==typeof t||(t=a.stringify);var e,s=this.protocol;s&&":"!==s.charAt(s.length-1)&&(s+=":");var o=s+(this.slashes?"//":"");return this.username&&(o+=this.username,this.password&&(o+=":"+this.password),o+="@"),o+=this.host+this.pathname,(e="object"==typeof this.query?t(this.query):this.query)&&(o+="?"!==e.charAt(0)?"?"+e:e),this.hash&&(o+=this.hash),o}},i.extractProtocol=r,i.location=o,i.qs=a,t.exports=i}).call(e,s(2))},function(t,e){var s;s=function(){return this}();try{s=s||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(s=window)}t.exports=s},function(t,e,s){"use strict";t.exports=function(t,e){if(e=e.split(":")[0],!(t=+t))return!1;switch(e){case"http":case"ws":return 80!==t;case"https":case"wss":return 443!==t;case"ftp":return 21!==t;case"gopher":return 70!==t;case"file":return!1}return 0!==t}},function(t,e,s){"use strict";function o(t){return decodeURIComponent(t.replace(/\+/g," "))}var r=Object.prototype.hasOwnProperty;e.stringify=function(t,e){var s=[];"string"!=typeof(e=e||"")&&(e="?");for(var o in t)r.call(t,o)&&s.push(encodeURIComponent(o)+"="+encodeURIComponent(t[o]));return s.length?e+s.join("&"):""},e.parse=function(t){for(var e,s=/([^=?&]+)=?([^&]*)/g,r={};e=s.exec(t);r[o(e[1])]=o(e[2]));return r}}])});