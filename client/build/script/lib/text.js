define(["module"],function(a){"use strict";var b,c,d,e,f=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],g=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,h=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,i="undefined"!=typeof location&&location.href,j=i&&location.protocol&&location.protocol.replace(/\:/,""),k=i&&location.hostname,l=i&&(location.port||void 0),m=[],n=a.config&&a.config()||{};return b={version:"2.0.6",strip:function(a){if(a){a=a.replace(g,"");var b=a.match(h);b&&(a=b[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:n.createXhr||function(){var a,b,c;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(b=0;3>b;b+=1){c=f[b];try{a=new ActiveXObject(c)}catch(d){}if(a){f=[c];break}}return a},parseName:function(a){var b,c,d,e=!1,f=a.indexOf("."),g=0===a.indexOf("./")||0===a.indexOf("../");return-1!==f&&(!g||f>1)?(b=a.substring(0,f),c=a.substring(f+1,a.length)):b=a,d=c||b,f=d.indexOf("!"),-1!==f&&(e="strip"===d.substring(f+1),d=d.substring(0,f),c?c=d:b=d),{moduleName:b,ext:c,strip:e}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,c,d,e){var f,g,h,i=b.xdRegExp.exec(a);return i?(f=i[2],g=i[3],g=g.split(":"),h=g[1],g=g[0],!(f&&f!==c||g&&g.toLowerCase()!==d.toLowerCase()||(h||g)&&h!==e)):!0},finishLoad:function(a,c,d,e){d=c?b.strip(d):d,n.isBuild&&(m[a]=d),e(d)},load:function(a,c,d,e){if(e.isBuild&&!e.inlineText)return d(),void 0;n.isBuild=e.isBuild;var f=b.parseName(a),g=f.moduleName+(f.ext?"."+f.ext:""),h=c.toUrl(g),m=n.useXhr||b.useXhr;!i||m(h,j,k,l)?b.get(h,function(c){b.finishLoad(a,f.strip,c,d)},function(a){d.error&&d.error(a)}):c([g],function(a){b.finishLoad(f.moduleName+"."+f.ext,f.strip,a,d)})},write:function(a,c,d){if(m.hasOwnProperty(c)){var e=b.jsEscape(m[c]);d.asModule(a+"!"+c,"define(function () { return '"+e+"';});\n")}},writeFile:function(a,c,d,e,f){var g=b.parseName(c),h=g.ext?"."+g.ext:"",i=g.moduleName+h,j=d.toUrl(g.moduleName+h)+".js";b.load(i,d,function(){var c=function(a){return e(j,a)};c.asModule=function(a,b){return e.asModule(a,j,b)},b.write(a,i,c,f)},f)}},"node"===n.env||!n.env&&"undefined"!=typeof process&&process.versions&&process.versions.node?(c=require.nodeRequire("fs"),b.get=function(a,b){var d=c.readFileSync(a,"utf8");0===d.indexOf("﻿")&&(d=d.substring(1)),b(d)}):"xhr"===n.env||!n.env&&b.createXhr()?b.get=function(a,c,d,e){var f,g=b.createXhr();if(g.open("GET",a,!0),e)for(f in e)e.hasOwnProperty(f)&&g.setRequestHeader(f.toLowerCase(),e[f]);n.onXhr&&n.onXhr(g,a),g.onreadystatechange=function(){var b,e;4===g.readyState&&(b=g.status,b>399&&600>b?(e=new Error(a+" HTTP status: "+b),e.xhr=g,d(e)):c(g.responseText),n.onXhrComplete&&n.onXhrComplete(g,a))},g.send(null)}:"rhino"===n.env||!n.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?b.get=function(a,b){var c,d,e="utf-8",f=new java.io.File(a),g=java.lang.System.getProperty("line.separator"),h=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f),e)),i="";try{for(c=new java.lang.StringBuffer,d=h.readLine(),d&&d.length()&&65279===d.charAt(0)&&(d=d.substring(1)),c.append(d);null!==(d=h.readLine());)c.append(g),c.append(d);i=String(c.toString())}finally{h.close()}b(i)}:("xpconnect"===n.env||!n.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(d=Components.classes,e=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),b.get=function(a,b){var c,f,g={},h=new FileUtils.File(a);try{c=d["@mozilla.org/network/file-input-stream;1"].createInstance(e.nsIFileInputStream),c.init(h,1,0,!1),f=d["@mozilla.org/intl/converter-input-stream;1"].createInstance(e.nsIConverterInputStream),f.init(c,"utf-8",c.available(),e.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),f.readString(c.available(),g),f.close(),c.close(),b(g.value)}catch(i){throw new Error((h&&h.path||"")+": "+i)}}),b});