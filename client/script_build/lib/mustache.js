/*! petal_client 2013-07-13 */
!function(a,b){if("object"==typeof exports&&exports)b(exports);else{var c={};b(c),"function"==typeof define&&define.amd?define(c):a.Mustache=c}}(this,function(a){function b(a,b){return t.call(a,b)}function c(a){return!b(p,a)}function d(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function e(a){return String(a).replace(/[&<>"'\/]/g,function(a){return w[a]})}function f(a){this.string=a,this.tail=a,this.pos=0}function g(a,b){this.view=a||{},this.parent=b,this._cache={}}function h(){this.clearCache()}function i(b,c,d,e){for(var f,g,h,j="",k=0,l=b.length;l>k;++k)switch(f=b[k],g=f[1],f[0]){case"#":if(h=d.lookup(g),"object"==typeof h)if(v(h))for(var m=0,n=h.length;n>m;++m)j+=i(f[4],c,d.push(h[m]),e);else h&&(j+=i(f[4],c,d.push(h),e));else if("function"==typeof h){var o=null==e?null:e.slice(f[3],f[5]);h=h.call(d.view,o,function(a){return c.render(a,d)}),null!=h&&(j+=h)}else h&&(j+=i(f[4],c,d,e));break;case"^":h=d.lookup(g),(!h||v(h)&&0===h.length)&&(j+=i(f[4],c,d,e));break;case">":h=c.getPartial(g),"function"==typeof h&&(j+=h(d));break;case"&":h=d.lookup(g),null!=h&&(j+=h);break;case"name":h=d.lookup(g),null!=h&&(j+=a.escape(h));break;case"text":j+=g}return j}function j(a){for(var b,c=[],d=c,e=[],f=0,g=a.length;g>f;++f)switch(b=a[f],b[0]){case"#":case"^":e.push(b),d.push(b),d=b[4]=[];break;case"/":var h=e.pop();h[5]=b[2],d=e.length>0?e[e.length-1][4]:c;break;default:d.push(b)}return c}function k(a){for(var b,c,d=[],e=0,f=a.length;f>e;++e)b=a[e],b&&("text"===b[0]&&c&&"text"===c[0]?(c[1]+=b[1],c[3]=b[3]):(c=b,d.push(b)));return d}function l(a){return[new RegExp(d(a[0])+"\\s*"),new RegExp("\\s*"+d(a[1]))]}function m(b,e){function g(){if(z&&!A)for(;y.length;)delete x[y.pop()];else y=[];z=!1,A=!1}if(b=b||"",e=e||a.tags,"string"==typeof e&&(e=e.split(o)),2!==e.length)throw new Error("Invalid tags: "+e.join(", "));for(var h,i,m,p,t,u=l(e),v=new f(b),w=[],x=[],y=[],z=!1,A=!1;!v.eos();){if(h=v.pos,m=v.scanUntil(u[0]))for(var B=0,C=m.length;C>B;++B)p=m.charAt(B),c(p)?y.push(x.length):A=!0,x.push(["text",p,h,h+1]),h+=1,"\n"==p&&g();if(!v.scan(u[0]))break;if(z=!0,i=v.scan(s)||"name",v.scan(n),"="===i?(m=v.scanUntil(q),v.scan(q),v.scanUntil(u[1])):"{"===i?(m=v.scanUntil(new RegExp("\\s*"+d("}"+e[1]))),v.scan(r),v.scanUntil(u[1]),i="&"):m=v.scanUntil(u[1]),!v.scan(u[1]))throw new Error("Unclosed tag at "+v.pos);if(t=[i,m,h,v.pos],x.push(t),"#"===i||"^"===i)w.push(t);else if("/"===i){if(0===w.length)throw new Error('Unopened section "'+m+'" at '+h);var D=w.pop();if(D[1]!==m)throw new Error('Unclosed section "'+D[1]+'" at '+h)}else if("name"===i||"{"===i||"&"===i)A=!0;else if("="===i){if(e=m.split(o),2!==e.length)throw new Error("Invalid tags at "+h+": "+e.join(", "));u=l(e)}}var D=w.pop();if(D)throw new Error('Unclosed section "'+D[1]+'" at '+v.pos);return x=k(x),j(x)}var n=/\s*/,o=/\s+/,p=/\S/,q=/\s*=/,r=/\s*\}/,s=/#|\^|\/|>|\{|&|=|!/,t=RegExp.prototype.test,u=Object.prototype.toString,v=Array.isArray||function(a){return"[object Array]"===u.call(a)},w={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};f.prototype.eos=function(){return""===this.tail},f.prototype.scan=function(a){var b=this.tail.match(a);return b&&0===b.index?(this.tail=this.tail.substring(b[0].length),this.pos+=b[0].length,b[0]):""},f.prototype.scanUntil=function(a){var b,c=this.tail.search(a);switch(c){case-1:b=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:b="";break;default:b=this.tail.substring(0,c),this.tail=this.tail.substring(c),this.pos+=c}return b},g.make=function(a){return a instanceof g?a:new g(a)},g.prototype.push=function(a){return new g(a,this)},g.prototype.lookup=function(a){var b=this._cache[a];if(!b){if("."==a)b=this.view;else for(var c=this;c;){if(a.indexOf(".")>0){b=c.view;for(var d=a.split("."),e=0;b&&e<d.length;)b=b[d[e++]]}else b=c.view[a];if(null!=b)break;c=c.parent}this._cache[a]=b}return"function"==typeof b&&(b=b.call(this.view)),b},h.prototype.clearCache=function(){this._cache={},this._partialCache={}},h.prototype.compile=function(b,c){var d=this._cache[b];if(!d){var e=a.parse(b,c);d=this._cache[b]=this.compileTokens(e,b)}return d},h.prototype.compilePartial=function(a,b,c){var d=this.compile(b,c);return this._partialCache[a]=d,d},h.prototype.getPartial=function(a){return a in this._partialCache||!this._loadPartial||this.compilePartial(a,this._loadPartial(a)),this._partialCache[a]},h.prototype.compileTokens=function(a,b){var c=this;return function(d,e){if(e)if("function"==typeof e)c._loadPartial=e;else for(var f in e)c.compilePartial(f,e[f]);return i(a,c,g.make(d),b)}},h.prototype.render=function(a,b,c){return this.compile(a)(b,c)},a.name="mustache.js",a.version="0.7.2",a.tags=["{{","}}"],a.Scanner=f,a.Context=g,a.Writer=h,a.parse=m,a.escape=e;var x=new h;a.clearCache=function(){return x.clearCache()},a.compile=function(a,b){return x.compile(a,b)},a.compilePartial=function(a,b,c){return x.compilePartial(a,b,c)},a.compileTokens=function(a,b){return x.compileTokens(a,b)},a.render=function(a,b,c){return x.render(a,b,c)},a.to_html=function(b,c,d,e){var f=a.render(b,c,d);return"function"!=typeof e?f:(e(f),void 0)}});