/*! petal_client 2013-07-08 */
define(["underscore","backbone","mustache","text!tpl/sys_notice.html"],function(a,b,c,d){"use strict";var e=b.View.extend({template:d,initialize:function(b){this.content=b.content||"",a.bindAll(this,"render")},render:function(){return this.$el,this.$el.html(c.to_html(this.template,{content:this.content})),this}});return e});