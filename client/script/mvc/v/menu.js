//用户主目录
define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "m/user" ,

    "text!tpl/menu.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,
    User ,

    menuTpl
){
    "use strict";

    var MenuView = Backbone.View.extend({
        template: menuTpl ,
        
        el: $( "#menu" ) ,

        events: {
            "tap .stream_same_city": "showSameCityStream" ,
            "tap .search": "showSearch"
        } ,

        initialize: function() {

            _.bindAll( this , "render" , "showSameCityStream" , "showSearch" );
            this.model = new User();
            this.model.on( "change" , this.render );

            //使用 object_user_info 渲染之
            //可以执行到此处 应该是断言已经登录的了 因此 
            //window.object_user_info 应该是已经设置了的
            var objUserInfo = window.objectUserInfo;
            if( objUserInfo === null ) {
                //@todo 弹出登录窗口
                alert( "还没有登录系统" );
                return false;
            } else {
                this.model.set( JSON.parse( objUserInfo ) );
            }
        } ,

        showSearch: function() {
            window.router.navigate( "#search" , {trigger: true} );
        },

        showSameCityStream: function() {
            window.router.navigate( "#stream" , {trigger: true} );
        } ,

        render: function() {
            $.ui.updateSideMenu(
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                ) 
            );

            return this;
        }
    });

    return MenuView;
});
