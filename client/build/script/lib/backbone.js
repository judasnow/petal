!function(){var a,b=this,c=b.Backbone,d=[],e=d.push,f=d.slice,g=d.splice;a="undefined"!=typeof exports?exports:b.Backbone={},a.VERSION="1.0.0";var h=b._;h||"undefined"==typeof require||(h=require("underscore")),a.$=b.jQuery||b.Zepto||b.ender||b.$,a.noConflict=function(){return b.Backbone=c,this},a.emulateHTTP=!1,a.emulateJSON=!1;var i=a.Events={on:function(a,b,c){if(!k(this,"on",a,[b,c])||!b)return this;this._events||(this._events={});var d=this._events[a]||(this._events[a]=[]);return d.push({callback:b,context:c,ctx:c||this}),this},once:function(a,b,c){if(!k(this,"once",a,[b,c])||!b)return this;var d=this,e=h.once(function(){d.off(a,e),b.apply(this,arguments)});return e._callback=b,this.on(a,e,c)},off:function(a,b,c){var d,e,f,g,i,j,l,m;if(!this._events||!k(this,"off",a,[b,c]))return this;if(!a&&!b&&!c)return this._events={},this;for(g=a?[a]:h.keys(this._events),i=0,j=g.length;j>i;i++)if(a=g[i],f=this._events[a]){if(this._events[a]=d=[],b||c)for(l=0,m=f.length;m>l;l++)e=f[l],(b&&b!==e.callback&&b!==e.callback._callback||c&&c!==e.context)&&d.push(e);d.length||delete this._events[a]}return this},trigger:function(a){if(!this._events)return this;var b=f.call(arguments,1);if(!k(this,"trigger",a,b))return this;var c=this._events[a],d=this._events.all;return c&&l(c,b),d&&l(d,arguments),this},stopListening:function(a,b,c){var d=this._listeners;if(!d)return this;var e=!b&&!c;"object"==typeof b&&(c=this),a&&((d={})[a._listenerId]=a);for(var f in d)d[f].off(b,c,this),e&&delete this._listeners[f];return this}},j=/\s+/,k=function(a,b,c,d){if(!c)return!0;if("object"==typeof c){for(var e in c)a[b].apply(a,[e,c[e]].concat(d));return!1}if(j.test(c)){for(var f=c.split(j),g=0,h=f.length;h>g;g++)a[b].apply(a,[f[g]].concat(d));return!1}return!0},l=function(a,b){var c,d=-1,e=a.length,f=b[0],g=b[1],h=b[2];switch(b.length){case 0:for(;++d<e;)(c=a[d]).callback.call(c.ctx);return;case 1:for(;++d<e;)(c=a[d]).callback.call(c.ctx,f);return;case 2:for(;++d<e;)(c=a[d]).callback.call(c.ctx,f,g);return;case 3:for(;++d<e;)(c=a[d]).callback.call(c.ctx,f,g,h);return;default:for(;++d<e;)(c=a[d]).callback.apply(c.ctx,b)}},m={listenTo:"on",listenToOnce:"once"};h.each(m,function(a,b){i[b]=function(b,c,d){var e=this._listeners||(this._listeners={}),f=b._listenerId||(b._listenerId=h.uniqueId("l"));return e[f]=b,"object"==typeof c&&(d=this),b[a](c,d,this),this}}),i.bind=i.on,i.unbind=i.off,h.extend(a,i);var n=a.Model=function(a,b){var c,d=a||{};b||(b={}),this.cid=h.uniqueId("c"),this.attributes={},h.extend(this,h.pick(b,o)),b.parse&&(d=this.parse(d,b)||{}),(c=h.result(this,"defaults"))&&(d=h.defaults({},d,c)),this.set(d,b),this.changed={},this.initialize.apply(this,arguments)},o=["url","urlRoot","collection"];h.extend(n.prototype,i,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(){return h.clone(this.attributes)},sync:function(){return a.sync.apply(this,arguments)},get:function(a){return this.attributes[a]},escape:function(a){return h.escape(this.get(a))},has:function(a){return null!=this.get(a)},set:function(a,b,c){var d,e,f,g,i,j,k,l;if(null==a)return this;if("object"==typeof a?(e=a,c=b):(e={})[a]=b,c||(c={}),!this._validate(e,c))return!1;f=c.unset,i=c.silent,g=[],j=this._changing,this._changing=!0,j||(this._previousAttributes=h.clone(this.attributes),this.changed={}),l=this.attributes,k=this._previousAttributes,this.idAttribute in e&&(this.id=e[this.idAttribute]);for(d in e)b=e[d],h.isEqual(l[d],b)||g.push(d),h.isEqual(k[d],b)?delete this.changed[d]:this.changed[d]=b,f?delete l[d]:l[d]=b;if(!i){g.length&&(this._pending=!0);for(var m=0,n=g.length;n>m;m++)this.trigger("change:"+g[m],this,l[g[m]],c)}if(j)return this;if(!i)for(;this._pending;)this._pending=!1,this.trigger("change",this,c);return this._pending=!1,this._changing=!1,this},unset:function(a,b){return this.set(a,void 0,h.extend({},b,{unset:!0}))},clear:function(a){var b={};for(var c in this.attributes)b[c]=void 0;return this.set(b,h.extend({},a,{unset:!0}))},hasChanged:function(a){return null==a?!h.isEmpty(this.changed):h.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?h.clone(this.changed):!1;var b,c=!1,d=this._changing?this._previousAttributes:this.attributes;for(var e in a)h.isEqual(d[e],b=a[e])||((c||(c={}))[e]=b);return c},previous:function(a){return null!=a&&this._previousAttributes?this._previousAttributes[a]:null},previousAttributes:function(){return h.clone(this._previousAttributes)},fetch:function(a){a=a?h.clone(a):{},void 0===a.parse&&(a.parse=!0);var b=this,c=a.success;return a.success=function(d){return b.set(b.parse(d,a),a)?(c&&c(b,d,a),b.trigger("sync",b,d,a),void 0):!1},L(this,a),this.sync("read",this,a)},save:function(a,b,c){var d,e,f,g=this.attributes;if(null==a||"object"==typeof a?(d=a,c=b):(d={})[a]=b,!(!d||c&&c.wait||this.set(d,c)))return!1;if(c=h.extend({validate:!0},c),!this._validate(d,c))return!1;d&&c.wait&&(this.attributes=h.extend({},g,d)),void 0===c.parse&&(c.parse=!0);var i=this,j=c.success;return c.success=function(a){i.attributes=g;var b=i.parse(a,c);return c.wait&&(b=h.extend(d||{},b)),h.isObject(b)&&!i.set(b,c)?!1:(j&&j(i,a,c),i.trigger("sync",i,a,c),void 0)},L(this,c),e=this.isNew()?"create":c.patch?"patch":"update","patch"===e&&(c.attrs=d),f=this.sync(e,this,c),d&&c.wait&&(this.attributes=g),f},destroy:function(a){a=a?h.clone(a):{};var b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};if(a.success=function(e){(a.wait||b.isNew())&&d(),c&&c(b,e,a),b.isNew()||b.trigger("sync",b,e,a)},this.isNew())return a.success(),!1;L(this,a);var e=this.sync("delete",this,a);return a.wait||d(),e},url:function(){var a=h.result(this,"urlRoot")||h.result(this.collection,"url")||K();return this.isNew()?a:a+("/"===a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},isValid:function(a){return this._validate({},h.extend(a||{},{validate:!0}))},_validate:function(a,b){if(!b.validate||!this.validate)return!0;a=h.extend({},this.attributes,a);var c=this.validationError=this.validate(a,b)||null;return c?(this.trigger("invalid",this,c,h.extend(b||{},{validationError:c})),!1):!0}});var p=["keys","values","pairs","invert","pick","omit"];h.each(p,function(a){n.prototype[a]=function(){var b=f.call(arguments);return b.unshift(this.attributes),h[a].apply(h,b)}});var q=a.Collection=function(a,b){b||(b={}),b.url&&(this.url=b.url),b.model&&(this.model=b.model),void 0!==b.comparator&&(this.comparator=b.comparator),this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,h.extend({silent:!0},b))},r={add:!0,remove:!0,merge:!0},s={add:!0,merge:!1,remove:!1};h.extend(q.prototype,i,{model:n,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},sync:function(){return a.sync.apply(this,arguments)},add:function(a,b){return this.set(a,h.defaults(b||{},s))},remove:function(a,b){a=h.isArray(a)?a.slice():[a],b||(b={});var c,d,e,f;for(c=0,d=a.length;d>c;c++)f=this.get(a[c]),f&&(delete this._byId[f.id],delete this._byId[f.cid],e=this.indexOf(f),this.models.splice(e,1),this.length--,b.silent||(b.index=e,f.trigger("remove",f,this,b)),this._removeReference(f));return this},set:function(a,b){b=h.defaults(b||{},r),b.parse&&(a=this.parse(a,b)),h.isArray(a)||(a=a?[a]:[]);var c,d,f,i,j,k=b.at,l=this.comparator&&null==k&&b.sort!==!1,m=h.isString(this.comparator)?this.comparator:null,n=[],o=[],p={};for(c=0,d=a.length;d>c;c++)(f=this._prepareModel(a[c],b))&&((i=this.get(f))?(b.remove&&(p[i.cid]=!0),b.merge&&(i.set(f.attributes,b),l&&!j&&i.hasChanged(m)&&(j=!0))):b.add&&(n.push(f),f.on("all",this._onModelEvent,this),this._byId[f.cid]=f,null!=f.id&&(this._byId[f.id]=f)));if(b.remove){for(c=0,d=this.length;d>c;++c)p[(f=this.models[c]).cid]||o.push(f);o.length&&this.remove(o,b)}if(n.length&&(l&&(j=!0),this.length+=n.length,null!=k?g.apply(this.models,[k,0].concat(n)):e.apply(this.models,n)),j&&this.sort({silent:!0}),b.silent)return this;for(c=0,d=n.length;d>c;c++)(f=n[c]).trigger("add",f,this,b);return j&&this.trigger("sort",this,b),this},reset:function(a,b){b||(b={});for(var c=0,d=this.models.length;d>c;c++)this._removeReference(this.models[c]);return b.previousModels=this.models,this._reset(),this.add(a,h.extend({silent:!0},b)),b.silent||this.trigger("reset",this,b),this},push:function(a,b){return a=this._prepareModel(a,b),this.add(a,h.extend({at:this.length},b)),a},pop:function(a){var b=this.at(this.length-1);return this.remove(b,a),b},unshift:function(a,b){return a=this._prepareModel(a,b),this.add(a,h.extend({at:0},b)),a},shift:function(a){var b=this.at(0);return this.remove(b,a),b},slice:function(a,b){return this.models.slice(a,b)},get:function(a){return null==a?void 0:this._byId[null!=a.id?a.id:a.cid||a]},at:function(a){return this.models[a]},where:function(a,b){return h.isEmpty(a)?b?void 0:[]:this[b?"find":"filter"](function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},findWhere:function(a){return this.where(a,!0)},sort:function(a){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return a||(a={}),h.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(h.bind(this.comparator,this)),a.silent||this.trigger("sort",this,a),this},sortedIndex:function(a,b,c){b||(b=this.comparator);var d=h.isFunction(b)?b:function(a){return a.get(b)};return h.sortedIndex(this.models,a,d,c)},pluck:function(a){return h.invoke(this.models,"get",a)},fetch:function(a){a=a?h.clone(a):{},void 0===a.parse&&(a.parse=!0);var b=a.success,c=this;return a.success=function(d){var e=a.reset?"reset":"set";c[e](d,a),b&&b(c,d,a),c.trigger("sync",c,d,a)},L(this,a),this.sync("read",this,a)},create:function(a,b){if(b=b?h.clone(b):{},!(a=this._prepareModel(a,b)))return!1;b.wait||this.add(a,b);var c=this,d=b.success;return b.success=function(e){b.wait&&c.add(a,b),d&&d(a,e,b)},a.save(null,b),a},parse:function(a){return a},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(a,b){if(a instanceof n)return a.collection||(a.collection=this),a;b||(b={}),b.collection=this;var c=new this.model(a,b);return c._validate(a,b)?c:(this.trigger("invalid",this,a,b),!1)},_removeReference:function(a){this===a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"!==a&&"remove"!==a||c===this)&&("destroy"===a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],null!=b.id&&(this._byId[b.id]=b)),this.trigger.apply(this,arguments))}});var t=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];h.each(t,function(a){q.prototype[a]=function(){var b=f.call(arguments);return b.unshift(this.models),h[a].apply(h,b)}});var u=["groupBy","countBy","sortBy"];h.each(u,function(a){q.prototype[a]=function(b,c){var d=h.isFunction(b)?b:function(a){return a.get(b)};return h[a](this.models,d,c)}});var v=a.View=function(a){this.cid=h.uniqueId("view"),this._configure(a||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},w=/^(\S+)\s*(.*)$/,x=["model","collection","el","id","attributes","className","tagName","events"];h.extend(v.prototype,i,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(b,c){return this.$el&&this.undelegateEvents(),this.$el=b instanceof a.$?b:a.$(b),this.el=this.$el[0],c!==!1&&this.delegateEvents(),this},delegateEvents:function(a){if(!a&&!(a=h.result(this,"events")))return this;this.undelegateEvents();for(var b in a){var c=a[b];if(h.isFunction(c)||(c=this[a[b]]),c){var d=b.match(w),e=d[1],f=d[2];c=h.bind(c,this),e+=".delegateEvents"+this.cid,""===f?this.$el.on(e,c):this.$el.on(e,f,c)}}return this},undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},_configure:function(a){this.options&&(a=h.extend({},h.result(this,"options"),a)),h.extend(this,h.pick(a,x)),this.options=a},_ensureElement:function(){if(this.el)this.setElement(h.result(this,"el"),!1);else{var b=h.extend({},h.result(this,"attributes"));this.id&&(b.id=h.result(this,"id")),this.className&&(b["class"]=h.result(this,"className"));var c=a.$("<"+h.result(this,"tagName")+">").attr(b);this.setElement(c,!1)}}}),a.sync=function(b,c,d){var e=y[b];h.defaults(d||(d={}),{emulateHTTP:a.emulateHTTP,emulateJSON:a.emulateJSON});var f={type:e,dataType:"json"};if(d.url||(f.url=h.result(c,"url")||K()),null!=d.data||!c||"create"!==b&&"update"!==b&&"patch"!==b||(f.contentType="application/json",f.data=JSON.stringify(d.attrs||c.toJSON(d))),d.emulateJSON&&(f.contentType="application/x-www-form-urlencoded",f.data=f.data?{model:f.data}:{}),d.emulateHTTP&&("PUT"===e||"DELETE"===e||"PATCH"===e)){f.type="POST",d.emulateJSON&&(f.data._method=e);var g=d.beforeSend;d.beforeSend=function(a){return a.setRequestHeader("X-HTTP-Method-Override",e),g?g.apply(this,arguments):void 0}}"GET"===f.type||d.emulateJSON||(f.processData=!1),"PATCH"!==f.type||!window.ActiveXObject||window.external&&window.external.msActiveXFilteringEnabled||(f.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});var i=d.xhr=a.ajax(h.extend(f,d));return c.trigger("request",c,i,d),i};var y={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};a.ajax=function(){return a.$.ajax.apply(a.$,arguments)};var z=a.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},A=/\((.*?)\)/g,B=/(\(\?)?:\w+/g,C=/\*\w+/g,D=/[\-{}\[\]+?.,\\\^$|#\s]/g;h.extend(z.prototype,i,{initialize:function(){},route:function(b,c,d){h.isRegExp(b)||(b=this._routeToRegExp(b)),h.isFunction(c)&&(d=c,c=""),d||(d=this[c]);var e=this;return a.history.route(b,function(f){var g=e._extractParameters(b,f);d&&d.apply(e,g),e.trigger.apply(e,["route:"+c].concat(g)),e.trigger("route",c,g),a.history.trigger("route",e,c,g)}),this},navigate:function(b,c){return a.history.navigate(b,c),this},_bindRoutes:function(){if(this.routes){this.routes=h.result(this,"routes");for(var a,b=h.keys(this.routes);null!=(a=b.pop());)this.route(a,this.routes[a])}},_routeToRegExp:function(a){return a=a.replace(D,"\\$&").replace(A,"(?:$1)?").replace(B,function(a,b){return b?a:"([^/]+)"}).replace(C,"(.*?)"),new RegExp("^"+a+"$")},_extractParameters:function(a,b){var c=a.exec(b).slice(1);return h.map(c,function(a){return a?decodeURIComponent(a):null})}});var E=a.History=function(){this.handlers=[],h.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},F=/^[#\/]|\s+$/g,G=/^\/+|\/+$/g,H=/msie [\w.]+/,I=/\/$/;E.started=!1,h.extend(E.prototype,i,{interval:50,getHash:function(a){var b=(a||this).location.href.match(/#(.*)$/);return b?b[1]:""},getFragment:function(a,b){if(null==a)if(this._hasPushState||!this._wantsHashChange||b){a=this.location.pathname;var c=this.root.replace(I,"");a.indexOf(c)||(a=a.substr(c.length))}else a=this.getHash();return a.replace(F,"")},start:function(b){if(E.started)throw new Error("Backbone.history has already been started");E.started=!0,this.options=h.extend({},{root:"/"},this.options,b),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var c=this.getFragment(),d=document.documentMode,e=H.exec(navigator.userAgent.toLowerCase())&&(!d||7>=d);this.root=("/"+this.root+"/").replace(G,"/"),e&&this._wantsHashChange&&(this.iframe=a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(c)),this._hasPushState?a.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!e?a.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=c;var f=this.location,g=f.pathname.replace(/[^\/]$/,"$&/")===this.root;return this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!g?(this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&g&&f.hash&&(this.fragment=this.getHash().replace(F,""),this.history.replaceState({},document.title,this.root+this.fragment+f.search)),this.options.silent?void 0:this.loadUrl())},stop:function(){a.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),E.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();return a===this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe))),a===this.fragment?!1:(this.iframe&&this.navigate(a),this.loadUrl()||this.loadUrl(this.getHash()),void 0)},loadUrl:function(a){var b=this.fragment=this.getFragment(a),c=h.any(this.handlers,function(a){return a.route.test(b)?(a.callback(b),!0):void 0});return c},navigate:function(a,b){if(!E.started)return!1;if(b&&b!==!0||(b={trigger:b}),a=this.getFragment(a||""),this.fragment!==a){this.fragment=a;var c=this.root+a;if(this._hasPushState)this.history[b.replace?"replaceState":"pushState"]({},document.title,c);else{if(!this._wantsHashChange)return this.location.assign(c);this._updateHash(this.location,a,b.replace),this.iframe&&a!==this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,a,b.replace))}b.trigger&&this.loadUrl(a)}},_updateHash:function(a,b,c){if(c){var d=a.href.replace(/(javascript:|#).*$/,"");a.replace(d+"#"+b)}else a.hash="#"+b}}),a.history=new E;var J=function(a,b){var c,d=this;c=a&&h.has(a,"constructor")?a.constructor:function(){return d.apply(this,arguments)},h.extend(c,d,b);var e=function(){this.constructor=c};return e.prototype=d.prototype,c.prototype=new e,a&&h.extend(c.prototype,a),c.__super__=d.prototype,c};n.extend=q.extend=z.extend=v.extend=E.extend=J;var K=function(){throw new Error('A "url" property or function must be specified')},L=function(a,b){var c=b.error;b.error=function(d){c&&c(a,d,b),a.trigger("error",a,d,b)}}}.call(this);