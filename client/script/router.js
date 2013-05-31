define([ 
    "underscore" ,
    "backbone" ,

    "m/object_user" ,

    "v/login" ,
    "v/stream" ,
    "v/search" ,
    "v/user_detail" ,
    "v/update_self_profile" ,
    "v/gift_list" ,
    "v/talk_list" ,
    "v/tweet" ,
    "v/gifts" ,
    "v/buy_coin" ,
    "v/buy_vip" ,
    "v/payment_record" ,
    "v/coupons" ,
    "v/visitors" ,
    "v/had_bought_contact_info" ,
    "v/contaces"
] ,
function(
    _ ,
    Backbone ,
    ObjectUserModel ,
    LoginView ,
    StreamView ,
    SearchView ,
    UserDetailView ,
    UpdateSelfProfileView ,
    GiftListView ,
    TalkListView ,
    TweetView ,
    GiftsView ,
    BuyCoinView ,
    BuyVipView ,
    PaymentRecordView ,
    CouponsView ,
    VisitorsView ,
    HadBoughtContactInfoView ,
    ContacesView
) {
    "use strict";

    var Router = Backbone.Router.extend({

        routes: {
        //{{{
            //默认页面
            "": "showStream" ,
            stream: "showStream" ,
            "stream/search": "showSearchResultStream" ,

            search: "showSearch" ,

            "gift_list/:giftClass": "showSelfGifts" ,
            gift_list: "showGiftList" ,

            //self = ObjectUser
            "user_detail/self": "showObjectUserDetail" ,
            "user_detail/:userId": "showUserDetail" ,
            "update_self_profile": "showUpdateSelfProfile" ,
    
            "tweet/self": "showSelfTweet" ,

            "gifts/self/:what": "showSelfGifts" ,

            "stream/visitors/self": "showSelfVisitors" ,
            "stream/had_bought_contact_info/self": "showSelfHadBoughtContactInfo",
            "stream/contacts/self/:_case": "showSelfContacts" ,

            "message/self": "showSelfMessage" ,
            "payment_record/self": "showSelfPaymentRecord" ,
            "coupons/self": "showSelfCoupons" ,

            "buy_vip": "showBuyVip" ,
            "buy_coin": "showBuyCoin" ,

            //不通过链接显示聊天对方信息比较好
            talk: "showTalkList" ,

            ":whatever"  : "notFound" 
        },//}}}

        initialize: function () {
        //{{{
            //_.bindAll( this , "showStream" , "showSearch" , "showSearchResultStream" );
        },//}}}

        notFound: function() {
            alert( 404 )
        },

        //默认显示附近的人 也就是以用户当前所在地作为查询条件
        showStream: function() {
        //{{{
            var q = JSON.stringify( {location: window.objectUser.get( "AreaDes" )} );
            new StreamView({
                q: q ,
                hash: "#stream"
            });
        },//}}}

        showSearch: function() {
        //{{{
            new SearchView();
        },//}}}

        //显示查询结果 在 localstore 中读取
        showSearchResultStream: function() {
        //{{{
            var q = window.localStorage.getItem( "q:users" );
            if( q === null ) {
                q = "{}";
            }
            new StreamView({
                q: q ,
                hash: "#stream/search"
            });
        },//}}}

        showObjectUserDetail: function() {
        //{{{
            new UserDetailView( {userId: window.objectUser.get( "UserId" ) , objectUserPage: true} );
        } ,//}}}

        //当前登录用户修改资料页面
        showUpdateSelfProfile: function() {
        //{{{
            new UpdateSelfProfileView();
        } ,//}}}

        showSelfTweet: function() {
        //{{{
            new TweetView();
        },//}}}

        //个人礼物中心
        showSelfGifts: function( what ) {
        //{{{
            new GiftsView(
                {
                    q: JSON.stringify(
                           {
                                "what": what ,
                                "object_user_id": window.objectUser.get( "UserId" )
                           }
                        ) ,
                    hash: ("#gifts/self" + (typeof what !== "undefined" ? "/" + what : "") )
                }
            );
        },//}}}

        showUserDetail: function( userId ) {
        //{{{
            new UserDetailView( {userId: userId} );
        },//}}}

        showGiftList: function( giftClass ) {
        //{{{
            new GiftListView(
            {
                q: "" ,
                hash: "#gift_list"
            });
        },//}}}

        showTalkList: function() {
        //{{{
            new TalkListView();
        },//}}}

        showBuyCoin: function() {
        //{{{
            new BuyCoinView();
        },//}}}

        showBuyVip: function() {
        //{{{
            new BuyVipView();
        },//}}}

        showSelfPaymentRecord: function() {
        //{{{ContacesView
            new PaymentRecordView({
                q:  JSON.stringify(
                   {
                        "object_user_id": window.objectUser.get( "UserId" )
                   }
                ) ,
                hash: "#payment_record/self"
            });
        },//}}}

        showSelfCoupons: function() {
        //{{{i
            new CouponsView();
        },//}}}

        showSelfVisitors: function() {
        //{{{
            new VisitorsView({
                q: JSON.stringify(
                    {
                        what: "visitors" ,
                        "object_user_id": window.objectUser.get( "UserId" )
                    }
                ) ,
                hash: "#stream/visitors/self"
            });
        },//}}}

        showSelfHadBoughtContactInfo: function() {
        //{{{
            new HadBoughtContactInfoView({
                q: JSON.stringify(
                    {
                        what: "had_bought_contact_info" ,
                        "object_user_id": window.objectUser.get( "UserId" )
                    }
                ) ,
                hash: "#stream/had_bought_contact_info/self"
            });
        },//}}}

        showSelfContacts: function( _case ) {
            new ContacesView({
                q: JSON.stringify(
                    {
                        _case: _case ,
                        what: "contacts" ,
                        "object_user_id": window.objectUser.get( "UserId" )
                    }
                ) ,
                hash: "#stream/contacts/self/" + _case
            });
        }
    });

    return Router;
});

