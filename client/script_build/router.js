/*! petal_client 2013-07-08 */
define(["underscore","backbone","m/object_user","v/stream","v/search","v/user_detail","v/update_self_profile","v/gift_list","v/chat_list","v/tweet","v/gifts","v/buy_coin","v/payment_record","v/coupons","v/had_bought_contact_info","v/visitors","v/msgs","v/service"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){"use strict";var s=b.Router.extend({routes:{"":"showStream",stream:"showStream","stream/search":"showSearchResultStream",search:"showSearch","gift_list/:giftClass":"showGiftList",gift_list:"showGiftList","user_detail/:userId":"showUserDetail",update_self_profile:"showUpdateSelfProfile","tweet/self":"showSelfTweet","gifts/self/received":"showSelfReceivedGifts","stream/had_bought_contact_info/self":"showSelfHadBoughtContactInfo","stream/visitors/self/":"showSelfVisitors","message/self":"showSelfMessage","payment_record/self":"showSelfPaymentRecord","coupons/self":"showSelfCoupons",buy_coin:"showBuyCoin",chat_list:"showChatList",msgs:"showMsgs",service:"showService",":whatever":"notFound"},initialize:function(){},notFound:function(){$.ui.loadContent("404.html",!1,!1,"fade")},showStream:function(){var a=JSON.stringify({location:window.objectUser.get("AreaDes")});new d({q:a,hash:"#stream"})},showSearch:function(){new e},showSearchResultStream:function(){var a=window.localStorage.getItem("q:users");null===a&&(a="{}"),new d({q:a,hash:"#stream/search"})},showUserDetail:function(a){new f({subjectUserId:a})},showUpdateSelfProfile:function(){new g},showSelfTweet:function(){new j},showSelfReceivedGifts:function(){new k({q:JSON.stringify({what:"received",object_user_id:window.objectUser.get("UserId")}),hash:"#gifts/self/received"})},showGiftList:function(){new h({q:"",hash:"#gift_list"})},showChatList:function(){new i},showBuyCoin:function(){new l},showBuyVip:function(){new BuyVipView},showSelfPaymentRecord:function(){new m({q:JSON.stringify({object_user_id:window.objectUser.get("UserId")}),hash:"#payment_record/self"})},showSelfCoupons:function(){new n},showSelfHadBoughtContactInfo:function(){new o({q:JSON.stringify({what:"had_bought_contact_info",object_user_id:window.objectUser.get("UserId")}),hash:"#stream/had_bought_contact_info/self"})},showSelfVisitors:function(){new p({q:JSON.stringify({what:"visitors",object_user_id:window.objectUser.get("UserId")}),hash:"#stream/visitors/self/"})},showMsgs:function(){new q({q:JSON.stringify({user_id:window.objectUser.get("UserId")}),hash:"#msgs"})},showService:function(){new r}});return s});