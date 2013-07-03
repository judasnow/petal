define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/chat_item.html" ,

    "lib/helper" ,
    "lib/common_operate" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    chatItemTpl ,

    helper ,
    commonOperate
){
    "use strict";

    var ChatItem = Backbone.View.extend({
        className: "item" ,
        template: chatItemTpl ,

        events: {
            "tap .gravatar": "handleTap"
        } ,

        initialize: function() {
            _.bindAll( this , 
                "handleTap" , "render"
            );
        } ,

        handleTap: function() {
            commonOperate.goDetailPage( this.model.get( "SrcUserId" ) );
        } ,

        render: function() {
            this.$el.html( Mustache.to_html( this.template , this.model.toJSON() ) );

            helper.showImage( this.$el.find( "img" ) );
            return this;
        }
    });

    return ChatItem;
});
