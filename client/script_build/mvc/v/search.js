/*! petal_client 2013-07-08 */
define(["underscore","backbone","mustache","m/user_profile_base_info","v/menu","text!tpl/search.html","text!tpl/div/location_select.html","lib/common_operate"],function(a,b,c,d,e,f,g,h){"use strict";var i=b.View.extend({template:f,el:"#search",events:{"change .province":"provinceChange","click .do_search":"doSearch","click .select_box":"handleClickSelectSexBox"},initialize:function(){new e,this.$el=$.ui.addOrUpdateDiv("search",""),a.bindAll(this,"render","provinceChange","doSearch","findEls"),this.render(),this.provinceChange()},handleClickSelectSexBox:function(a){var b=$(a.target);this.changeSearchSex(b)},changeSearchSex:function(a){var b=a.parent();b.find(".select_box").removeClass("select_box_action"),a.addClass("select_box_action"),this.$sex.val(a.text())},findEls:function(){this.$province=this.$el.find(".province"),this.$cityname=this.$el.find(".cityname"),this.$citylist=this.$el.find(".citylist"),this.$nickName=this.$el.find(".nickname"),this.$sexSelect=this.$el.find(".sex_select"),this.$sex=this.$el.find(".sex")},provinceChange:function(){var a=$(this.$province.find("option")[this.$province.get(0).selectedIndex]).attr("class");this.$cityname.find("option").remove(),this.$cityname.html(this.$citylist.find("."+a).html())},doSearch:function(){var a=this.$nickName.val(),b=this.$sex.val();"不限"===b&&(b="");var c=this.$province.val(),d=this.$cityname.val(),e=d;"不限"===d&&(e=c),window.localStorage.setItem("q:users",JSON.stringify({nickName:a,sex:b,location:e})),window.router.navigate("/#stream/search",{trigger:!0})},render:function(){$.ui.updateContentDiv("search",c.to_html(this.template,{},{location_select:c.to_html(g,d)})),$.ui.loadContent("#search",!1,!1,"none"),this.findEls(),h.setDefaultLocationSelect(window.objectUser.get("location"),this.$province,this.$cityname);var a=window.objectUser.get("sexInEnglish");return"female"===a&&(this.$sex.val("男"),this.changeSearchSex(this.$sexSelect.find(".male"))),"male"===a&&(this.$sex.val("女"),this.changeSearchSex(this.$sexSelect.find(".female"))),this}});return i});