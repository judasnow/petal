define( 
    [ "jquery" , "underscore" , "backbone" , "v/login" , "v/stream" , "v/search" , "jqm" ],
    //没有使用首字母大写 是因为首字母大写需要额外的
    //没有必要的运算
    function( $ , _ , Backbone , loginView , streamView , searchView ) {
        "use strict";

        //可能的路由
        var rawRoutes = ["login" , "search" , "stream" ];

        var Router = Backbone.Router.extend({

            initialize: function () {
                var commonRouteHander = function(){
                    this.changePage( (function( viewName , route ){
                        return eval( "new " + viewName + "( route )" );
                    })( routeName + "View" , this ));
                };

                _.bind( this , commonRouteHander );

                //根据 map 生成 routes 以及相应的处理函数
                //相应的函数名称为 [:route]Show
                var routes = {"": "loginShow"};
                for( var index in rawRoutes ) {
                    var routeName = rawRoutes[index];
                    var funcName = routeName + "Show";
                    routes[routeName] = funcName;

                    this[funcName] = commonRouteHander;
                }
                this.routes = routes;
                this.loginShow();
            },
            //载入指定的 page 并按照 jqm 的要求添加
            //相应的属性 并初始化之
            changePage: function( page ) {
                page.render();
                page.$el.attr( "data-role" , "page" )
                    .attr( "data-theme" , "a" );

                //@todo 此处的 $el 同 $el.html() 传入 append 有何区别?
                $( "body" ).append( page.$el );

                var transition = $.mobile.defaultPageTransition;
                $.mobile.changePage(
                    page.$el ,
                    {
                        changeHash: false, 
                        transition: transition
                    }
                );
            }
        });
        return Router;
});
