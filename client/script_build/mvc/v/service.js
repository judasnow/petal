/*! petal_client 2013-07-08 */
define(["underscore","backbone","mustache","v/menu","text!tpl/service.html"],function(a,b,c,d,e){"use strict";var f=b.View.extend({template:e,initialize:function(){new d,a.bindAll(this,"render"),this.$el=$.ui.addOrUpdateDiv("service",""),this.render()},render:function(){return $.ui.updateContentDiv("service",this.template),$.ui.loadContent("#service",!1,!1,"none"),this}});return f});