/*! petal_client 2013-07-13 */
require.config({baseUrl:"script/",paths:{app:"app",text:"lib/text",underscore:"lib/underscore",backbone:"lib/backbone",mustache:"lib/mustache",date_utils:"lib/date-utils",router:"router",tpl:"mvc/tpl",v:"mvc/v",m:"mvc/m",c:"mvc/c"},shim:{backbone:{deps:["underscore"],exports:"Backbone",init:function(){Backbone.$=window.$}},underscore:{exports:"_"},mustache:{exports:"Mustache"},date_utils:{exports:"date_utils"}}}),require(["app"],function(a){console.log("call app"),a.initialize()});