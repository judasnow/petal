/*! petal_client 2013-07-12 */
if(!window.af||"function"!=typeof af){var af=function(a){"use strict";function b(a,b){return"number"!=typeof b||E[a.toLowerCase()]?b:b+"px"}function c(a,b,c){var d=w.createDocumentFragment();if(c){for(var e=a.length-1;e>=0;e--)d.insertBefore(a[e],d.firstChild);b.insertBefore(d,b.firstChild)}else{for(var f=0;f<a.length;f++)d.appendChild(a[f]);b.appendChild(d)}d=null}function d(a){return a in z?z[a]:z[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function e(a){for(var b=0;b<a.length;b++)a.indexOf(a[b])!=b&&(a.splice(b,1),b--);return a}function f(a,b){var c=[];if(a==v)return c;for(;a;a=a.nextSibling)1==a.nodeType&&a!==b&&c.push(a);return c}function g(a,b){try{return b.querySelectorAll(a)}catch(c){return[]}}function h(a,b){if(a=a.trim(),"#"===a[0]&&-1==a.indexOf(".")&&-1===a.indexOf(" ")&&-1===a.indexOf(">"))b==w?i(b.getElementById(a.replace("#","")),this):i(g(a,b),this);else if("<"===a[0]&&">"===a[a.length-1]||-1!==a.indexOf("<")&&-1!==a.indexOf(">")){var c=w.createElement("div");F?MSApp.execUnsafeLocalFunction(function(){c.innerHTML=a.trim()}):c.innerHTML=a.trim(),i(c.childNodes,this)}else i(g(a,b),this);return this}function i(a,b){if(a){if(a.nodeType)return b[b.length++]=a,void 0;for(var c=0,d=a.length;d>c;c++)b[b.length++]=a[c]}}function j(){}function k(b,c){b.os={},b.os.webkit=c.match(/WebKit\/([\d.]+)/)?!0:!1,b.os.android=c.match(/(Android)\s+([\d.]+)/)||c.match(/Silk-Accelerated/)?!0:!1,b.os.androidICS=b.os.android&&c.match(/(Android)\s4/)?!0:!1,b.os.ipad=c.match(/(iPad).*OS\s([\d_]+)/)?!0:!1,b.os.iphone=!b.os.ipad&&c.match(/(iPhone\sOS)\s([\d_]+)/)?!0:!1,b.os.ios7=c.match(/(iPhone\sOS)\s([7_]+)/)?!0:!1,b.os.webos=c.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)?!0:!1,b.os.touchpad=b.os.webos&&c.match(/TouchPad/)?!0:!1,b.os.ios=b.os.ipad||b.os.iphone,b.os.playbook=c.match(/PlayBook/)?!0:!1,b.os.blackberry=b.os.playbook||c.match(/BlackBerry/)?!0:!1,b.os.blackberry10=b.os.blackberry&&c.match(/Safari\/536/)?!0:!1,b.os.chrome=c.match(/Chrome/)?!0:!1,b.os.opera=c.match(/Opera/)?!0:!1,b.os.fennec=c.match(/fennec/i)?!0:c.match(/Firefox/)?!0:!1,b.os.ie=c.match(/MSIE 10.0/i)?!0:!1,b.os.ieTouch=b.os.ie&&c.toLowerCase().match(/touch/i)?!0:!1,b.os.supportsTouch=a.DocumentTouch&&w instanceof a.DocumentTouch||"ontouchstart"in a,b.feat={};var d=w.documentElement.getElementsByTagName("head")[0];b.feat.nativeTouchScroll="undefined"!=typeof d.style["-webkit-overflow-scrolling"]&&b.os.ios,b.feat.cssPrefix=b.os.webkit?"Webkit":b.os.fennec?"Moz":b.os.ie?"ms":b.os.opera?"O":"",b.feat.cssTransformStart=b.os.opera?"(":"3d(",b.feat.cssTransformEnd=b.os.opera?")":",0)",b.os.android&&!b.os.webkit&&(b.os.android=!1)}function l(a){return a._afmid||(a._afmid=J++)}function m(a,b,c,d){if(b=n(b),b.ns)var e=o(b.ns);return(I[l(a)]||[]).filter(function(a){return!(!a||b.e&&a.e!=b.e||b.ns&&!e.test(a.ns)||c&&a.fn!=c&&("function"!=typeof a.fn||"function"!=typeof c||""+a.fn!=""+c)||d&&a.sel!=d)})}function n(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function o(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function p(a,b,c){H.isObject(a)?H.each(a,c):a.split(/\s/).forEach(function(a){c(a,b)})}function q(a,b,c,d,e){var f=l(a),g=I[f]||(I[f]=[]);p(b,c,function(b,c){var f=e&&e(c,b),h=f||c,i=function(b){var c=h.apply(a,[b].concat(b.data));return c===!1&&b.preventDefault(),c},j=H.extend(n(b),{fn:c,proxy:i,sel:d,del:f,i:g.length});g.push(j),a.addEventListener(j.e,i,!1)})}function r(a,b,c,d){var e=l(a);p(b||"",c,function(b,c){m(a,b,c,d).forEach(function(b){delete I[e][b.i],a.removeEventListener(b.e,b.proxy,!1)})})}function s(a){var b=H.extend({originalEvent:a},a);return H.each(M,function(c,d){b[c]=function(){return this[d]=K,"stopImmediatePropagation"!=c&&"stopPropagation"!=c||(a.cancelBubble=!0,a[c])?a[c].apply(a,arguments):void 0},b[d]=L}),b}function t(a,b){if(b&&a.dispatchEvent){var c=H.Event("destroy",{bubbles:!1});a.dispatchEvent(c)}var d=l(a);if(d&&I[d]){for(var e in I[d])a.removeEventListener(I[d][e].e,I[d][e].proxy,!1);delete I[d]}}function u(a,b){if(a){var c=a.childNodes;if(c&&c.length>0)for(var d;d<c.length;d++)u(c[d],b);t(a,b)}}var v,w=a.document,x=[],y=x.slice,z={},A=1,B=/^\s*<(\w+)[^>]*>/,C={},D={},E={columncount:!0,fontweight:!0,lineheight:!0,"column-count":!0,"font-weight":!0,"line-height":!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,"z-index":!0,zoom:!0},F="object"==typeof MSApp,G=function(a,b){if(this.length=0,!a)return this;if(a instanceof G&&b==v)return a;if(af.isFunction(a))return af(w).ready(a);if(af.isArray(a)&&a.length!=v){for(var c=0;c<a.length;c++)this[this.length++]=a[c];return this}if(af.isObject(a)&&af.isObject(b)){if(a.length==v)a.parentNode==b&&(this[this.length++]=a);else for(var d=0;d<a.length;d++)a[d].parentNode==b&&(this[this.length++]=a[d]);return this}if(af.isObject(a)&&b==v)return this[this.length++]=a,this;if(b!==v){if(b instanceof G)return b.find(a)}else b=w;return this.selector(a,b)},H=function(a,b){return new G(a,b)};H.is$=function(a){return a instanceof G},H.map=function(a,b){var c,d,e,f=[];if(H.isArray(a))for(d=0;d<a.length;d++)c=b(a[d],d),c!==v&&f.push(c);else if(H.isObject(a))for(e in a)a.hasOwnProperty(e)&&(c=b(a[e],e),c!==v&&f.push(c));return af([f])},H.each=function(a,b){var c,d;if(H.isArray(a)){for(c=0;c<a.length;c++)if(b(c,a[c])===!1)return a}else if(H.isObject(a))for(d in a)if(a.hasOwnProperty(d)&&b(d,a[d])===!1)return a;return a},H.extend=function(a){if(a==v&&(a=this),1===arguments.length){for(var b in a)this[b]=a[b];return this}return y.call(arguments,1).forEach(function(b){for(var c in b)a[c]=b[c]}),a},H.isArray=function(a){return a instanceof Array&&a.push!=v},H.isFunction=function(a){return"function"==typeof a&&!(a instanceof RegExp)},H.isObject=function(a){return"object"==typeof a},H.fn=G.prototype={constructor:G,forEach:x.forEach,reduce:x.reduce,push:x.push,indexOf:x.indexOf,concat:x.concat,selector:h,oldElement:void 0,slice:x.slice,length:0,setupOld:function(a){return a==v?H():(a.oldElement=this,a)},map:function(a){var b,c,d=[];for(c=0;c<this.length;c++)b=a(c,this[c]),b!==v&&d.push(b);return H([d])},each:function(a){return this.forEach(function(b,c){a.call(b,c,b)}),this},ready:function(a){return"complete"===w.readyState||"loaded"===w.readyState||!H.os.ie&&"interactive"===w.readyState?a():w.addEventListener("DOMContentLoaded",a,!1),this},find:function(a){if(0===this.length)return this;for(var b,c=[],d=0;d<this.length;d++){b=H(a,this[d]);for(var f=0;f<b.length;f++)c.push(b[f])}return H(e(c))},html:function(a,b){if(0===this.length)return this;if(a===v)return this[0].innerHTML;for(var c=0;c<this.length;c++)b!==!1&&H.cleanUpContent(this[c],!1,!0),F?MSApp.execUnsafeLocalFunction(function(){this[c].innerHTML=a}):this[c].innerHTML=a;return this},text:function(a){if(0===this.length)return this;if(a===v)return this[0].textContent;for(var b=0;b<this.length;b++)this[b].textContent=a;return this},css:function(c,d,e){var f=e!=v?e:this[0];if(0===this.length)return this;if(d==v&&"string"==typeof c)return a.getComputedStyle(f),f.style[c]?f.style[c]:a.getComputedStyle(f)[c];for(var g=0;g<this.length;g++)if(H.isObject(c))for(var h in c)this[g].style[h]=b(h,c[h]);else this[g].style[c]=b(c,d);return this},vendorCss:function(a,b,c){return this.css(H.feat.cssPrefix+a,b,c)},cssTranslate:function(a){return this.vendorCss("Transform","translate"+H.feat.cssTransformStart+a+H.feat.cssTransformEnd)},computedStyle:function(b){return 0!==this.length&&b!=v?a.getComputedStyle(this[0],"")[b]:void 0},empty:function(){for(var a=0;a<this.length;a++)H.cleanUpContent(this[a],!1,!0),this[a].textContent="";return this},hide:function(){if(0===this.length)return this;for(var a=0;a<this.length;a++)"none"!=this.css("display",null,this[a])&&(this[a].setAttribute("afmOldStyle",this.css("display",null,this[a])),this[a].style.display="none");return this},show:function(){if(0===this.length)return this;for(var a=0;a<this.length;a++)"none"==this.css("display",null,this[a])&&(this[a].style.display=this[a].getAttribute("afmOldStyle")?this[a].getAttribute("afmOldStyle"):"block",this[a].removeAttribute("afmOldStyle"));return this},toggle:function(b){for(var c=b===!0?!0:!1,d=0;d<this.length;d++)"none"!==a.getComputedStyle(this[d]).display||b!=v&&c===!1?(this[d].setAttribute("afmOldStyle",this[d].style.display),this[d].style.display="none"):(this[d].style.display=this[d].getAttribute("afmOldStyle")!=v?this[d].getAttribute("afmOldStyle"):"block",this[d].removeAttribute("afmOldStyle"));return this},val:function(a){if(0===this.length)return a===v?void 0:this;if(a==v)return this[0].value;for(var b=0;b<this.length;b++)this[b].value=a;return this},attr:function(a,b){if(0===this.length)return b===v?void 0:this;if(b===v&&!H.isObject(a)){var c=this[0].afmCacheId&&C[this[0].afmCacheId][a]?this[0].afmCacheId&&C[this[0].afmCacheId][a]:this[0].getAttribute(a);return c}for(var d=0;d<this.length;d++)if(H.isObject(a))for(var e in a)H(this[d]).attr(e,a[e]);else H.isArray(b)||H.isObject(b)||H.isFunction(b)?(this[d].afmCacheId||(this[d].afmCacheId=H.uuid()),C[this[d].afmCacheId]||(C[this[d].afmCacheId]={}),C[this[d].afmCacheId][a]=b):null===b&&b!=v?(this[d].removeAttribute(a),this[d].afmCacheId&&C[this[d].afmCacheId][a]&&delete C[this[d].afmCacheId][a]):this[d].setAttribute(a,b);return this},removeAttr:function(a){for(var b=this,c=0;c<this.length;c++)a.split(/\s+/g).forEach(function(d){b[c].removeAttribute(d),b[c].afmCacheId&&C[b[c].afmCacheId][a]&&delete C[b[c].afmCacheId][a]});return this},prop:function(a,b){if(0===this.length)return b===v?void 0:this;if(b===v&&!H.isObject(a)){var c,d=this[0].afmCacheId&&D[this[0].afmCacheId][a]?this[0].afmCacheId&&D[this[0].afmCacheId][a]:!(c=this[0][a])&&a in this[0]?this[0][a]:c;return d}for(var e=0;e<this.length;e++)if(H.isObject(a))for(var f in a)H(this[e]).prop(f,a[f]);else H.isArray(b)||H.isObject(b)||H.isFunction(b)?(this[e].afmCacheId||(this[e].afmCacheId=H.uuid()),D[this[e].afmCacheId]||(D[this[e].afmCacheId]={}),D[this[e].afmCacheId][a]=b):null===b&&void 0!==b?H(this[e]).removeProp(a):this[e][a]=b;return this},removeProp:function(a){for(var b=this,c=0;c<this.length;c++)a.split(/\s+/g).forEach(function(d){b[c][d]&&(b[c][d]=void 0),b[c].afmCacheId&&D[b[c].afmCacheId][a]&&delete D[b[c].afmCacheId][a]});return this},remove:function(a){var b=H(this).filter(a);if(b==v)return this;for(var c=0;c<b.length;c++)H.cleanUpContent(b[c],!0,!0),b[c].parentNode.removeChild(b[c]);return this},addClass:function(a){if(a==v)return this;for(var b=0;b<this.length;b++){var c=this[b].className,d=[],e=this;a.split(/\s+/g).forEach(function(a){e.hasClass(a,e[b])||d.push(a)}),this[b].className+=(c?" ":"")+d.join(" "),this[b].className=this[b].className.trim()}return this},removeClass:function(a){if(a==v)return this;for(var b=0;b<this.length;b++){if(a==v)return this[b].className="",this;var c=this[b].className;a.split(/\s+/g).forEach(function(a){c=c.replace(d(a)," ")}),this[b].className=c.length>0?c.trim():""}return this},replaceClass:function(a,b){if(a==v||b==v)return this;for(var c=0;c<this.length;c++)if(a!=v){var e=this[c].className;a.split(/\s+/g).concat(b.split(/\s+/g)).forEach(function(a){e=e.replace(d(a)," ")}),e=e.trim(),this[c].className=e.length>0?(e+" "+b).trim():b}else this[c].className=b;return this},hasClass:function(a,b){return 0===this.length?!1:(b||(b=this[0]),d(a).test(b.className))},append:function(b,d){if(b&&b.length!=v&&0===b.length)return this;(H.isArray(b)||H.isObject(b))&&(b=H(b));var e;for(e=0;e<this.length;e++)if(b.length&&"string"!=typeof b)b=H(b),c(b,this[e],d);else{var f=B.test(b)?H(b):void 0;(f==v||0===f.length)&&(f=w.createTextNode(b)),f.nodeName==v||"script"!=f.nodeName.toLowerCase()||f.type&&"text/javascript"!==f.type.toLowerCase()?f instanceof G?c(f,this[e],d):d!=v?this[e].insertBefore(f,this[e].firstChild):this[e].appendChild(f):a.eval(f.innerHTML)}return this},appendTo:function(a){var b=H(a);return b.append(this),this},prependTo:function(a){var b=H(a);return b.append(this,!0),this},prepend:function(a){return this.append(a,1)},insertBefore:function(a,b){if(0===this.length)return this;if(a=H(a).get(0),!a)return this;for(var c=0;c<this.length;c++)b?a.parentNode.insertBefore(this[c],a.nextSibling):a.parentNode.insertBefore(this[c],a);return this},insertAfter:function(a){this.insertBefore(a,!0)},get:function(a){return a=a==v?0:a,0>a&&(a+=this.length),this[a]?this[a]:void 0},offset:function(){var b;return 0===this.length?this:this[0]==a?{left:0,top:0,right:0,bottom:0,width:a.innerWidth,height:a.innerHeight}:(b=this[0].getBoundingClientRect(),{left:b.left+a.pageXOffset,top:b.top+a.pageYOffset,right:b.right+a.pageXOffset,bottom:b.bottom+a.pageYOffset,width:b.right-b.left,height:b.bottom-b.top})},height:function(b){if(0===this.length)return this;if(b!=v)return this.css("height",b);if(this[0]==this[0].window)return a.innerHeight;if(this[0].nodeType==this[0].DOCUMENT_NODE)return this[0].documentElement.offsetheight;var c=this.css("height").replace("px","");return c?c:this.offset().height},width:function(b){if(0===this.length)return this;if(b!=v)return this.css("width",b);if(this[0]==this[0].window)return a.innerWidth;if(this[0].nodeType==this[0].DOCUMENT_NODE)return this[0].documentElement.offsetwidth;var c=this.css("width").replace("px","");return c?c:this.offset().width},parent:function(a,b){if(0===this.length)return this;for(var c=[],d=0;d<this.length;d++)for(var f=this[d];f.parentNode&&f.parentNode!=w&&(c.push(f.parentNode),f.parentNode&&(f=f.parentNode),b););return this.setupOld(H(e(c)).filter(a))},parents:function(a){return this.parent(a,!0)},children:function(a){if(0===this.length)return this;for(var b=[],c=0;c<this.length;c++)b=b.concat(f(this[c].firstChild));return this.setupOld(H(b).filter(a))},siblings:function(a){if(0===this.length)return this;for(var b=[],c=0;c<this.length;c++)this[c].parentNode&&(b=b.concat(f(this[c].parentNode.firstChild,this[c])));return this.setupOld(H(b).filter(a))},closest:function(a,b){if(0===this.length)return this;var c=this[0],d=H(a,b);if(0===d.length)return H();for(;c&&-1==d.indexOf(c);)c=c!==b&&c!==w&&c.parentNode;return H(c)},filter:function(a){if(0===this.length)return this;if(a==v)return this;for(var b=[],c=0;c<this.length;c++){var d=this[c];d.parentNode&&H(a,d.parentNode).indexOf(d)>=0&&b.push(d)}return this.setupOld(H(e(b)))},not:function(a){if(0===this.length)return this;for(var b=[],c=0;c<this.length;c++){var d=this[c];d.parentNode&&-1==H(a,d.parentNode).indexOf(d)&&b.push(d)}return this.setupOld(H(e(b)))},data:function(a,b){return this.attr("data-"+a,b)},end:function(){return this.oldElement!=v?this.oldElement:H()},clone:function(a){if(a=a===!1?!1:!0,0===this.length)return this;for(var b=[],c=0;c<this.length;c++)b.push(this[c].cloneNode(a));return H(b)},size:function(){return this.length},serialize:function(){if(0===this.length)return"";for(var a=[],b=0;b<this.length;b++)this.slice.call(this[b].elements).forEach(function(b){var c=b.getAttribute("type");if("fieldset"!=b.nodeName.toLowerCase()&&!b.disabled&&"submit"!=c&&"reset"!=c&&"button"!=c&&("radio"!=c&&"checkbox"!=c||b.checked)&&b.getAttribute("name"))if("select-multiple"==b.type)for(var d=0;d<b.options.length;d++)b.options[d].selected&&a.push(b.getAttribute("name")+"="+encodeURIComponent(b.options[d].value));else a.push(b.getAttribute("name")+"="+encodeURIComponent(b.value))});return a.join("&")},eq:function(a){return H(this.get(a))},index:function(a){return a?this.indexOf(H(a)[0]):this.parent().children().indexOf(this[0])},is:function(a){return!!a&&this.filter(a).length>0}},H.ajaxSettings={type:"GET",beforeSend:j,success:j,error:j,complete:j,context:void 0,timeout:0,crossDomain:null},H.jsonP=function(b){if(F)return b.type="get",b.dataType=null,H.get(b);var c,d="jsonp_callback"+ ++A,e="",f=w.createElement("script");return a[d]=function(g){clearTimeout(e),H(f).remove(),delete a[d],b.success.call(c,g)},f.src=b.url.replace(/=\?/,"="+d),b.error&&(f.onerror=function(){clearTimeout(e),b.error.call(c,"","error")}),H("head").append(f),b.timeout>0&&(e=setTimeout(function(){b.error.call(c,"","timeout")},b.timeout)),{}},H.ajax=function(b){var c;try{var d=b||{};for(var e in H.ajaxSettings)"undefined"==typeof d[e]&&(d[e]=H.ajaxSettings[e]);if(d.url||(d.url=a.location),d.contentType||(d.contentType="application/x-www-form-urlencoded"),d.headers||(d.headers={}),"async"in d&&d.async===!1||(d.async=!0),d.dataType)switch(d.dataType){case"script":d.dataType="text/javascript, application/javascript";break;case"json":d.dataType="application/json";break;case"xml":d.dataType="application/xml, text/xml";break;case"html":d.dataType="text/html";break;case"text":d.dataType="text/plain";break;default:d.dataType="text/html";break;case"jsonp":return H.jsonP(b)}else d.dataType="text/html";if(H.isObject(d.data)&&(d.data=H.param(d.data)),"get"===d.type.toLowerCase()&&d.data&&(d.url+=-1===d.url.indexOf("?")?"?"+d.data:"&"+d.data),/=\?/.test(d.url))return H.jsonP(d);null===d.crossDomain&&(d.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(d.url)&&RegExp.$2!=a.location.host),d.crossDomain||(d.headers=H.extend({"X-Requested-With":"XMLHttpRequest"},d.headers));var f,g=d.context,h=/^([\w-]+:)\/\//.test(d.url)?RegExp.$1:a.location.protocol;c=new a.XMLHttpRequest,c.onreadystatechange=function(){var a=d.dataType;if(4===c.readyState){clearTimeout(f);var b,e=!1;if(c.status>=200&&c.status<300||0===c.status&&"file:"==h){if("application/json"!==a||/^\s*$/.test(c.responseText))"application/xml, text/xml"===a?b=c.responseXML:"text/html"==a?(b=c.responseText,H.parseJS(b)):b=c.responseText;else try{b=JSON.parse(c.responseText)}catch(i){e=i}0===c.status&&0===b.length&&(e=!0),e?d.error.call(g,c,"parsererror",e):d.success.call(g,b,"success",c)}else e=!0,d.error.call(g,c,"error");d.complete.call(g,c,e?"error":"success")}},c.open(d.type,d.url,d.async),d.withCredentials&&(c.withCredentials=!0),d.contentType&&(d.headers["Content-Type"]=d.contentType);for(var i in d.headers)c.setRequestHeader(i,d.headers[i]);if(d.beforeSend.call(g,c,d)===!1)return c.abort(),!1;d.timeout>0&&(f=setTimeout(function(){c.onreadystatechange=j,c.abort(),d.error.call(g,c,"timeout")},d.timeout)),c.send(d.data)}catch(k){console.log(k),d.error.call(g,c,"error",k)}return c},H.get=function(a,b){return this.ajax({url:a,success:b})},H.post=function(a,b,c,d){return"function"==typeof b&&(c=b,b={}),d===v&&(d="html"),this.ajax({url:a,type:"POST",data:b,dataType:d,success:c})},H.getJSON=function(a,b,c){return"function"==typeof b&&(c=b,b={}),this.ajax({url:a,data:b,success:c,dataType:"json"})},H.param=function(a,b){var c=[];if(a instanceof G)a.each(function(){var a=b?b+"["+this.id+"]":this.id,d=this.value;c.push(a+"="+encodeURIComponent(d))});else for(var d in a)if(!H.isFunction(a[d])){var e=b?b+"["+d+"]":d,f=a[d];c.push(H.isObject(f)?H.param(f,e):e+"="+encodeURIComponent(f))}return c.join("&")},H.parseJSON=function(a){return JSON.parse(a)},H.parseXML=function(a){return F?(MSApp.execUnsafeLocalFunction(function(){return(new DOMParser).parseFromString(a,"text/xml")}),void 0):(new DOMParser).parseFromString(a,"text/xml")},k(H,navigator.userAgent),H.__detectUA=k,H.uuid=function(){var a=function(){return(0|65536*(1+Math.random())).toString(16).substring(1)};return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()},H.getCssMatrix=function(b){if(H.is$(b)&&(b=b.get(0)),b==v)return a.WebKitCSSMatrix||a.MSCSSMatrix||{a:0,b:0,c:0,d:0,e:0,f:0};try{if(a.WebKitCSSMatrix)return new WebKitCSSMatrix(a.getComputedStyle(b).webkitTransform);if(a.MSCSSMatrix)return new MSCSSMatrix(a.getComputedStyle(b).transform);var c=a.getComputedStyle(b)[H.feat.cssPrefix+"Transform"].replace(/[^0-9\-.,]/g,"").split(",");return{a:+c[0],b:+c[1],c:+c[2],d:+c[3],e:+c[4],f:+c[5]}}catch(d){return{a:0,b:0,c:0,d:0,e:0,f:0}}},H.create=function(a,b){var c,d=new G;if(b||"<"!==a[0]){b.html&&(b.innerHTML=b.html,delete b.html),c=w.createElement(a);for(var e in b)c[e]=b[e];d[d.length++]=c}else c=w.createElement("div"),F?MSApp.execUnsafeLocalFunction(function(){c.innerHTML=selector.trim()}):c.innerHTML=a,i(c.childNodes,d);return d},H.query=function(a,b){if(!a)return new G;b=b||w;var c=new G;return c.selector(a,b)};var I={},J=1;H.event={add:q,remove:r},H.fn.bind=function(a,b){for(var c=0;c<this.length;c++)q(this[c],a,b);return this},H.fn.unbind=function(a,b){for(var c=0;c<this.length;c++)r(this[c],a,b);return this},H.fn.one=function(a,b){return this.each(function(c,d){q(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return r(d,b,a),c}})})};var K=function(){return!0},L=function(){return!1},M={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};H.fn.delegate=function(a,b,c){for(var d=0;d<this.length;d++){var e=this[d];q(e,b,c,a,function(b){return function(c){var d,f=H(c.target).closest(a,e).get(0);return f?(d=H.extend(s(c),{currentTarget:f,liveFired:e}),b.apply(f,[d].concat([].slice.call(arguments,1)))):void 0}})}return this},H.fn.undelegate=function(a,b,c){for(var d=0;d<this.length;d++)r(this[d],b,c,a);return this},H.fn.on=function(a,b,c){return b===v||H.isFunction(b)?this.bind(a,b):this.delegate(b,a,c)},H.fn.off=function(a,b,c){return b===v||H.isFunction(b)?this.unbind(a,b):this.undelegate(b,a,c)},H.fn.trigger=function(a,b,c){"string"==typeof a&&(a=H.Event(a,c)),a.data=b;for(var d=0;d<this.length;d++)this[d].dispatchEvent(a);return this},H.Event=function(a,b){var c=w.createEvent("Events"),d=!0;if(b)for(var e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c},H.bind=function(a,b,c){if(a){a.__events||(a.__events={}),H.isArray(b)||(b=[b]);for(var d=0;d<b.length;d++)a.__events[b[d]]||(a.__events[b[d]]=[]),a.__events[b[d]].push(c)}},H.trigger=function(a,b,c){if(a){var d=!0;if(!a.__events)return d;H.isArray(b)||(b=[b]),H.isArray(c)||(c=[]);for(var e=0;e<b.length;e++)if(a.__events[b[e]])for(var f=a.__events[b[e]],g=0;g<f.length;g++)H.isFunction(f[g])&&f[g].apply(a,c)===!1&&(d=!1);return d}},H.unbind=function(a,b,c){if(a.__events){H.isArray(b)||(b=[b]);for(var d=0;d<b.length;d++)if(a.__events[b[d]])for(var e=a.__events[b[d]],f=0;f<e.length;f++)if(c==v&&delete e[f],e[f]==c){e.splice(f,1);break}}},H.proxy=function(a,b,c){return function(){return c?a.apply(b,c):a.apply(b,arguments)}};var N=function(a,b){for(var c=0;c<a.length;c++)u(a[c],b)};H.cleanUpContent=function(a,b,c){if(a){var d=a.childNodes;d&&d.length>0&&H.asap(N,{},[y.apply(d,[0]),c]),b&&t(a,c)}};var O=[],P=[],Q=[];H.asap=function(b,c,d){if(!H.isFunction(b))throw"$.asap - argument is not a valid function";O.push(b),P.push(c?c:{}),Q.push(d?d:[]),a.postMessage("afm-asap","*")},a.addEventListener("message",function(b){b.source==a&&"afm-asap"==b.data&&(b.stopPropagation(),O.length>0&&O.shift().apply(P.shift(),Q.shift()))},!0);var R={};return H.parseJS=function(b){if(b){if("string"==typeof b){var c=w.createElement("div");F?MSApp.execUnsafeLocalFunction(function(){c.innerHTML=b}):c.innerHTML=b,b=c}var d=b.getElementsByTagName("script");b=null;for(var e=0;e<d.length;e++)if(d[e].src.length>0&&!R[d[e].src]&&!F){var f=w.createElement("script");f.type=d[e].type,f.src=d[e].src,w.getElementsByTagName("head")[0].appendChild(f),R[d[e].src]=1,f=null}else a.eval(d[e].innerHTML)}},["click","keydown","keyup","keypress","submit","load","resize","change","select","error"].forEach(function(a){H.fn[a]=function(b){return b?this.bind(a,b):this.trigger(a)}}),["focus","blur"].forEach(function(a){H.fn[a]=function(b){if(0!==this.length){if(b)this.bind(a,b);else for(var c=0;c<this.length;c++)try{this[c][a]()}catch(d){}return this}}}),H}(window);window.jq=af,"$"in window||(window.$=af),"function"==typeof define&&define.amd?define("appframework",[],function(){return af}):"undefined"!=typeof module&&module.exports&&(module.exports.af=af,module.exports.$=af),window.numOnly||(window.numOnly=function(a){if(void 0===a||""===a)return 0;if(isNaN(parseFloat(a))){if(!a.replace)return 0;a=a.replace(/[^0-9.-]/g,"")}return parseFloat(a)})}