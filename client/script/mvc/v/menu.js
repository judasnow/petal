define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/menu.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    menuTpl
){
    "use strict";

    var MenuView = Backbone.View.extend({
        template: menuTpl ,
        events: {

        } ,

        initialize: function() {
            //使用 object_user_info 渲染之
            //可以执行到此处 应该是断言已经登录的了 因此 
            //window.object_user_info 应该是已经设置了的
            var objUserInfo = window.objectUserInfo;
            if( objUserInfo === null ) {
                //@todo 弹出登录窗口
                window.route.navigate( "#login" , {trigger: true} );
                return false;
            } else {
                $.ui.updateSideMenu( 
                    Mustache.to_html( 
                        this.template ,
                        JSON.parse( objUserInfo )
                    ) 
                );
            }
        },

        render: function() {
            return this;
        }
    });

    return MenuView;
});
