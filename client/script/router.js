define([ 
    "underscore" ,
    "backbone" ,
    "m/object_user" ,
    "v/login" ,
    "v/stream" ,
    "v/search" ,
    "v/user_detail" ,
    "v/gift_list" ,
    "v/talk_list"
],
function(
    _ ,
    Backbone ,
    ObjectUserModel ,
    LoginView ,
    StreamView ,
    SearchView ,
    UserDetailView ,
    GiftListView ,
    TalkListView
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
            "gift_list/:giftClass": "showGiftList" ,
            gift_list: "showGiftList" ,
            "user_detail/:userId": "showUserDetail" ,
            //不通过链接显示聊天对方信息比较好
            talk: "showTalkList" ,
            ":whatever"  : "notFound" 
        },//}}}

        initialize: function () {
        //{{{
            _.bindAll( this , "showStream" , "showSearch" , "showSearchResultStream" );
        },//}}}

        notFound: function() {
            alert( 404 )
        },

        //判断用户是否已经登录系统 
        //@todo 方案还有改进的余地
        haveLoggedIn: function() {
        //{{{
            var objectUserInfo = window.localStorage.getItem( "petal:object_user_info" );

            if( objectUserInfo !== null ) {
                //已登录
                window.objectUserModel = new ObjectUserModel( JSON.parse( objectUserInfo ) );
                return true;
            } else {
                //未登录
                return false;
            }
        },//}}}

        //默认显示附近的人 也就是以用户当前所在地作为查询条件
        showStream: function() {
        //{{{
            var q = JSON.stringify( {location: ""} );
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
            var q = window.localStorage.getItem( "q:users" );
            if( q === null ) {
                q = "{}";
            }
            new StreamView({
                q: q ,
                hash: "#stream/search"
            });
        },

        showUserDetail: function( userId ) {
        //{{{
            new UserDetailView( {userId: userId} );
        },//}}}

        showGiftList: function( giftClass ) {
        //{{{
            new GiftListView( { /*giftClass: gift_class*/ } );
        },//}}}

        showTalkList: function() {
        //{{{
            new TalkListView();
        }//}}}
    });

    return Router;
});

