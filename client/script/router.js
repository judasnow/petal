define([ 
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "m/object_user" ,
    "v/login" ,
    "v/stream" ,
    "v/search" ,
    'v/user_detail' ,
    "jqm" 
],
function( 
    $ ,
    _ ,
    Backbone ,
    ObjectUserModel ,
    LoginView ,
    StreamView ,
    SearchView ,
    UserDetailView
) {
    "use strict";

    var Router = Backbone.Router.extend({

        routes: {
        //{{{
            //默认页面
            "": "showStream",
            login: "showLogin",
            stream: "showStream",
            search: "showSearch",
            "user_detail/:userName": "showUserDetail"
        },//}}}

        initialize: function () {
        //{{{
            $( document ).bind( "pageinit" , function(){
                return;
                //解决滑动截断问题
                var maxHeight = $(window).height();
                $("div[data-role=content]")
                    .attr( "style" , "min-height:" + maxHeight + "px" );

                if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
                    $( "#main_panel" ).panel( "open" );
                }
            });

            _.bindAll( this , "showLogin" , "showStream" , "showSearch" );


        },//}}}

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

            this.changePage( new LoginView() );
        },//}}}

        showStream: function() {
        //{{{
            if( !this.haveLoggedIn() ) {
                // 没有登录还
                this.navigate( "login" , {trigger: true} );
                return;
            }

            this.changePage( new StreamView() );
        },//}}}

        showSearch: function() {
        //{{{
            if( !this.haveLoggedIn() ) {
                // 没有登录还
                this.navigate( "login" , {trigger: true} );
                return;
            }

            this.changePage( new SearchView() );
        },//}}}

        showUserDetail: function( userName ) {
        //{{{
            this.changePage( new UserDetailView( { userName: userName } ) );
        },//}}}

        //载入指定的 page 并按照 jqm 的要求添加
        //相应的属性 并初始化之
        changePage: function( page ) {
        //{{{
            //暴露 route 到 window
            window.route = this;

            page.render();
            page.$el.attr( "data-role" , "page" )
                .attr( "data-theme" , "a" );

            //@todo 此处的 $el 同 $el.html() 传入 append 有何区别?
            $( "body" ).append( page.$el );

            $.mobile.changePage(
                page.$el ,
                {
                    changeHash: false
                }
            );
            }//}}}
    });
    return Router;
});

