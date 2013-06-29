//用户信息流中的一条信息
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "v/menu" ,

    "text!tpl/stream_item.html" ,

    "lib/helper"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    UserView ,

    MenuView ,

    hadBoughtContactInfoStreamItemTpl ,

    helper
){
    "use strict";

    var HadBoughtContactInfoStreamItem = Backbone.View.extend({
        className: "item" ,
        
        events: {
            "tap": "goDetailPage"
        } ,

        template: hadBoughtContactInfoStreamItemTpl ,

        initialize: function() {
            _.bindAll( this , "render" , "goDetailPage" );
        } ,

        goDetailPage: function( event ) {
        //{{{
            //保存本用户信息 到本地 
            var userId = this.model.get( "UserId" );
            window.router.navigate(
                "/#user_detail/" + userId,
                {
                    trigger: true
                }
            );
        },//}}}

        render: function() {
            new MenuView();
            this.$el.html(
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );

            //显示默认图片
            helper.showImage( this.$el.find( "img" ) , this.model.get( "Sex" ) === "男" ? "male" : "female" );

            return this;
        }
    });

    return HadBoughtContactInfoStreamItem;
});

