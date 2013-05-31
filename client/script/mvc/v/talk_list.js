//可以理解为最近联系人
define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "c/talk_items" ,
    "v/talk_item" ,

    "text!tpl/talk_list.html" 
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    TalkItems ,
    TalkItemView ,

    talkListTpl 
){
    "use strict";

    var MsgList = Backbone.View.extend({
        template: talkListTpl ,

        initialize: function() {
            this.$el.html(
                Mustache.to_html( 
                    this.template ,
                    {
                        header: headerTpl ,
                        footer: footerTpl
                    }
                )
            );
        },

        addAll: function() {
            this.gifts.each( this.addOne );
        },

        addOne: function( gift ) {
            var giftView = new GiftItemView({ model: gift });
            this.$itemsEl.append( giftView.render().el );
        },

        showMore: function() {
            this.pageNo = this.pageNo + 1;
            this.gifts.fetch({
                data: {
                    p: this.pageNo
                },
                success: function() {

                },
                error: function() {

                }
            });
        },

        render: function() {
            return this;
        }
    });

    return MsgList;
});

