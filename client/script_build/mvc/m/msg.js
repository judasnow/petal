/*! petal_client 2013-07-08 */
define(["underscore","backbone","lib/helper"],function(a,b,c){"use strict";var d=b.Model.extend({url:"/api/msg",initialize:function(){new Date(this.get("CreateAt")),this.set("time",c.resetTime(this.get("CreateAt"))),"undefined"==typeof this.get("sexInEnglish")&&this.set("sexInEnglish","男"===this.get("SrcSex")?"male":"female"),this.set("Content",this.get("Content").replace(/<[^>].*?>/g,"")),this.set("summary",function(a){return a.length>20?a.substring(0,20)+"...":a}(this.get("Content")))}});return d});