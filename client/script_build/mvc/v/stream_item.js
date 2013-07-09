/*! petal_client 2013-07-08 */
define(["underscore","backbone","mustache","m/user","text!tpl/stream_item.html","lib/helper","lib/common_operate"],function(a,b,c,d,e,f,g){"use strict";var h=b.View.extend({className:"item",events:{"tap .display_contact_info":"displayContactInfo","tap .send_msg":"sendMsg","tap .send_gift":"sendGift",tap:"goDetailPage"},template:e,initialize:function(){a.bindAll(this,"displayContactInfo","sendMsg","sendGift","goDetailPage"),this.model.get("UserId")!==window.objectUser.get("UserId")&&this.model.set("needsFunc",!0)},displayContactInfo:function(){event.stopImmediatePropagation(),g.getUserContactInfo(this.model)},sendMsg:function(a){a.stopImmediatePropagation(),g.goChatListPage(this.model)},sendGift:function(a){a.stopImmediatePropagation(),window.localStorage.setItem("petal:send_gift_target_user_id",this.model.get("UserId")),window.router.navigate("/#gift_list",{trigger:!0})},goDetailPage:function(){var a=this.model.get("UserId");window.router.navigate("/#user_detail/"+a,{trigger:!0})},render:function(){return this.$el.html(c.to_html(this.template,this.model.toJSON())),f.showImage(this.$el.find("img"),"男"===this.model.get("Sex")?"male":"female"),this}});return h});