/*! petal_client 2013-07-08 */
define(["underscore","backbone","lib/helper","date_utils"],function(a,b,c){"use strict";var d=b.Model.extend({initialize:function(){this.set("time",c.resetTime(this.get("CreateAt"))),this.set("PvMsg",this.get("PvMsg").replace(/<[^>].*?>/g,""))}});return d});