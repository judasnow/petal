/*! petal_client 2013-07-08 */
define(["underscore","backbone","mustache","m/user","v/menu","text!tpl/user_detail.html","lib/helper","lib/common_operate"],function(a,b,c,d,e,f,g,h){"use strict";var i=b.View.extend({template:f,events:{"tap .get_contaces_info":"getContacesInfo","tap .send_gift":"sendGift","tap .send_msg":"sendMsg","tap .wanted_gift_list .gravatar":"sendThatGift","tap .visitors_list>.sub_item":"goDetailPage"},initialize:function(b){new e,this.subjectUserId=b.subjectUserId,this.divId="user_detail-"+this.subjectUserId,this.$el=$.ui.addOrUpdateDiv(this.divId,""),this.subjectUserId==window.objectUser.get("UserId")&&(this.isSelfPage=!0),a.bindAll(this,"sendMsg","sendGift","getContacesInfo","sendThatGift","render"),this.model=new d,this.listenTo(this.model,"change",this.render),this.model.fetch({data:{user_id:this.subjectUserId}})},sendMsg:function(){h.goChatListPage(this.model)},sendGift:function(){window.localStorage.setItem("send_gift_target_user_id",this.model.get("UserId")),window.router.navigate("/#gift_list",{trigger:!0})},sendThatGift:function(a){var b=$(a.target).parent().parent(),c=b.find(".gift_id").text(),d=b.find(".price b").text(),e=this.model.get("UserId");h.sendGift(e,c,d)},getContacesInfo:function(){h.getUserContactInfo(this.model)},goDetailPage:function(a){a.stopImmediatePropagation();var b=$(a.target).attr("data-user_id");isNaN(b)||window.router.navigate("/#user_detail/"+b,{trigger:!0})},render:function(){return this.isSelfPage===!0&&this.model.set("isSelfPage",!0),$.ui.updateContentDiv(this.divId,c.to_html(this.template,this.model.toJSON())),$.ui.loadContent(this.divId,!1,!1,"none"),g.showImage(this.$el.find("img")),this.isSelfPage===!0?$("header>h1").html("我的主页"):$.get("/api/update_brower_status/?object_user_id="+window.objectUser.get("UserId")+"&&subject_user_id="+this.subjectUserId),this}});return i});