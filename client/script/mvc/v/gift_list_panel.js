define([ 
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "socketioinit" ,
    "c/gifts" ,
    "v/gift_item" 
],
function( 
    $ ,
    _ ,
    Backbone ,
    Mustache ,
    socket ,
    Gifts ,
    GiftItemView 
){
    "use strict";

    //需要完成的工作就是渲染完成之后 添加到 gift_list_panel 
    //容器中
    var GiftListPanel = Backbone.View.extend({
        initialize: function() {
            this.$giftListEl = this.$el.find( ".gift_list" );
            this.gifts = new Gifts();

            _.bindAll( this , "addOne" , "addAll" , "render" , "showMore" );

            this.gifts.bind( "add" , this.addOne );
            this.gifts.bind( "reset" , this.addAll );

            this.pageNo = 1;
            this.gifts.fetch({
                data: {
                    p: this.pageNo
                },
                success: function( coll , res ) {
                    
                },
                error: function() {
                    alert( "获取礼物列表失败" )
                }
            });

            this.$showMoreEl = this.$el.find( ".show_more" );
            this.$showMoreEl.bind( "click" , this.showMore );
        },

        addAll: function() {
            this.gifts.each( this.addOne );
        },

        addOne: function( gift ) {
            var giftView = new GiftItemView({ model: gift });
            this.$giftListEl.append( giftView.render().el );
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

    return GiftListPanel;
});

