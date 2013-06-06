//出现在送礼记录中的列表信息
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/gift_record.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    giftRecordTpl
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
            return this;
        }
    });

    return GiftRecord;
});
