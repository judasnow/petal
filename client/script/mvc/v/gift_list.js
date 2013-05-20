define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "c/gifts" ,
    "v/gift_item" ,
    "v/get_more" ,

    "text!tpl/gift_list.html" ,
    "text!tpl/div/header.html" ,
    "text!tpl/div/footer.html"
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    Gifts ,
    GiftItemView ,
    GetMoreView ,

    giftListTpl ,
    headerTpl ,
    footerTpl 
){
    "use strict";

    var GiftList = Backbone.View.extend({
        template: giftListTpl ,

        //目前的这种情况(也就是不直接指定el)是因为所有的页面
        //都是动态获取的 似乎没有办法事前的将占位符写到 dom 中
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
            this.$itemsEl = this.$el.find( ".items" );
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

            this.$el.find( "#head_left_btn" )
                .attr( "data-icon" , "arrow-l" )
                .click( 
                    function() {
                        window.history.back();
                    });
            this.$el.find( "#head_right_btn" ).hide();
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

    return GiftList;
});

