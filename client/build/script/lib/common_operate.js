define(["underscore","mustache"],function(a,b){"use strict";var c={};return c.getUserContactInfo=function(a){var d=$("#contact_info_tpl").html();$.get("/api/should_display_contact_info/?object_user_id="+window.objectUser.get("UserId")+"&subject_user_id="+a.get("UserId"),$.proxy(function(e){try{var f=JSON.parse(e);if("true"===f.should)"buy_just_now"===f.reason&&window.updateSysNotice("金币 -"+window.costOfContact),"vip"===f.reason,$.ui.popup({title:"联系方式",message:b.to_html(d,a.toJSON()),cancelText:"关闭",cancelCallback:function(){},cancelOnly:!0});else switch(f.reason){case"insufficient_coin":c.insufficientCoinHandle()}}catch(g){window.updateSysNotice("查看联系方式失败，请稍后再试。"),console.dir("call getUserContactInfo error: "+g)}},this),function(a){alert("查看联系方式失败，请稍后再试。"),console.dir("call getUserContactInfo error( server return error ): "+a)})},c.sendGift=function(a,b,d){null!==a&&$.post("/api/send_gift/",{gift_id:b,target_user_id:a,from_user_id:window.objectUser.get("UserId")},function(a){var b=JSON.parse(a);"ok"===b.result?(window.updateSysNotice("金币 -"+d),$.ui.popup({title:"恭喜",message:"礼物已经成功送出，是否继续选取礼物？",cancelText:"不",cancelCallback:function(){$.ui.goBackWithDefault()},doneText:"继续",doneCallback:function(){},cancelOnly:!1})):c.insufficientCoinHandle()},function(){})},c.goDetailPage=function(a){return"undefined"==typeof a||isNaN(a)?(console.log("user_id invalid, should be a Number but '"+a+"' given"),void 0):(window.router.navigate("/#user_detail/"+a,{trigger:!0}),void 0)},c.insufficientCoinHandle=function(){window.updateSysNotice("金币余额不足"),window.router.navigate("/#buy_coin",{trigger:!0})},c.setDefaultLocationSelect=function(a,b,c){var d=a.split(" "),e=d[0],f=d[1];""!=e&&(b.val(e).trigger("change"),c.val(f))},c.goChatListPage=function(a){$.get("/api/get_exist_talk_betweet_two_users/?object_user_id="+window.objectUser.get("UserId")+"&subject_user_id="+a.get("UserId"),function(b){var c=JSON.parse(b);"ok"===c.result&&(window.localStorage.setItem("petal:root_msg_id",c.root_msg_id),window.localStorage.setItem("petal:send_msg_target_user_id",a.get("UserId")),window.router.navigate("/#chat_list",{trigger:!0}))},function(){window.localStorage.setItem("petal:root_msg_id",0),window.localStorage.setItem("petal:send_msg_target_user_id",that.model.get("UserId")),window.router.navigate("/#chat_list",{trigger:!0})})},c});