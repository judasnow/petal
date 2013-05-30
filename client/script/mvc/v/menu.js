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
            "tap #object_user_info>.gravatar": "showObjectUserHome" ,
            "tap .stream_same_city": "showSameCityStream" ,
            "tap .search": "showSearch" 
        } ,

        initialize: function() {

            _.bindAll( 
                this , 
                "render" , "showObjectUserHome" , "showSameCityStream" , "showSearch" );
            this.model = new User();
            this.model.on( "change" , this.render );

            //使用 object_user_info 渲染之
            this.model.set( window.objectUser.toJSON() );
        } ,

        showObjectUserHome: function() {
            window.router.navigate( "#user_detail/self" , {trigger: true} );
        } ,

        showSearch: function() {
            window.router.navigate( "#search" , {trigger: true} );
        } ,

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
