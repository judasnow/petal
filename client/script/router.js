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
    UpdateSelfProfileView ,
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

            "user_detail/self": "showObjectUserDetail" ,
            "user_detail/:userId": "showUserDetail" ,
            "update_self_profile": "showUpdateSelfProfile" ,

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
            var q = window.localStorage.getItem( "q:users" );
            if( q === null ) {
                q = "{}";
            }
            new StreamView({
                q: q ,
                hash: "#stream/search"
            });
        },

        showObjectUserDetail: function() {
            new UserDetailView( {userId: window.objectUser.get( "UserId" ) , objectUserPage: true} );
        } ,

        //当前登录用户修改资料页面
        showUpdateSelfProfile: function() {
            new UpdateSelfProfileView();
        } ,

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
        }//}}}
    });

    return Router;
});

