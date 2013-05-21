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
            login: "showLogin" ,
            stream: "showStream" ,
            search: "showSearch" ,
            "gift_list/:gift_class": "showGiftList" ,
            gift_list: "showGiftList" ,
            "user_detail/:userName": "showUserDetail" ,
            //不通过链接显示聊天对方信息比较好
            talk: "showTalkList" ,
            ":whatever"  : "notFound" ,
        },//}}}

        initialize: function () {
        //{{{
            $( document ).bind( "pageinit" , function(){
                return;
                var maxHeight = $(window).height();
                $("div[data-role=content]")
                    .attr( "style" , "min-height:" + maxHeight + "px" );

                if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
                    $( "#main_panel" ).panel( "open" );
                }
            });

            _.bindAll( this , "showLogin" , "showStream" , "showSearch" );
        },//}}}

        notFound: function() {
            alert( "404" );
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

        showLogin: function() {
        //{{{
            if( this.haveLoggedIn() ) {
                //已经登录
                this.navigate( "" , {trigger: true} );
                return;
            }

            var loginView = new LoginView();
            loginView.render();
            $.ui.loadContent( '#login' , false , false , 'fade' );
        },//}}}

        showStream: function() {
        //{{{
            if( !this.haveLoggedIn() ) {
                // 没有登录
                this.navigate( "login" , {trigger: true} );
                return;
            }

            var streamView = new StreamView();
            streamView.render();
            $.ui.loadContent( '#stream' , false , false , 'fade' );
        },//}}}

        showSearch: function() {
        //{{{
            if( !this.haveLoggedIn() ) {
                // 没有登录还
                this.navigate( "#login" , {trigger: true} );
                return;
            }

            this.changePage( new SearchView() );
        },//}}}

        showUserDetail: function( userName ) {
        //{{{
            this.changePage( new UserDetailView( { userName: userName } ) );
        },//}}}

        showGiftList: function( gift_class ) {
        //{{{
            var giftList = new GiftListView( { /*giftClass: gift_class*/ } );
            giftList.render();
            $.ui.loadContent( '#gift_list' , false , false , 'fade' );
        },//}}}

        showTalkList: function() {
        //{{{
            this.changePage( new TalkListView() );
        }//}}}
    });
    return Router;
});

