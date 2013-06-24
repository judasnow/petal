//出现在送礼记录中的列表信息
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/gift_record.html" ,

    "lib/helper"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    giftRecordTpl ,

    helper
){
    "use strict";

    var GiftRecord = Backbone.View.extend({
        className: "item",
        template: giftRecordTpl ,

        initialize: function() {

        },

        render: function() {
            this.$el.html( 
                    Mustache.to_html( 
                        this.template , 
                        this.model.toJSON() 
                    ) 
                );
            helper.showImage( this.$el.find( "img" ) );
            return this;
        }
    });

    return GiftRecord;
});
