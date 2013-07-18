define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "v/menu" ,

    "text!tpl/buy_coin.html" ,

    "lib/common_operate"
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    User ,

    MenuView ,

    buyCoinTpl ,

    commonOperate
){
    "use strict";

    var BuyCoin = Backbone.View.extend({
        template: buyCoinTpl ,

        events: {
            "tap .sub_item_inner": "activeIt" ,
            "tap .do_submit": "doSubmit" 
        } ,

        initialize: function() {
        //{{{
            new MenuView();
            this.$el = $.ui.addOrUpdateDiv( "buy_coin" , "" );

            //@TODO 注意这里是一个权宜 不应该需要新建立一个
            //user model 的 但是每一次访问本页用户的金币数量都
            //需要刷新这一点是肯定的
            this.model = new User();
            this.listenTo( this.model , "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: window.objectUser.get( "UserId" )
                }
            });

            _.bindAll( this , "render" , "unactiveOthers" , "activeIt" );
        } ,//}}}

        //提交订单
        doSubmit: function() {
        //{{{
            var $input = this.$el.find( "input[name='buy_coin']:checked" );
            var payArgArray = $input.val().split( ":" );
            var payMoney = payArgArray[0];
            var payValue = payArgArray[1];

            //直接重定向到 init_trade 生成一笔交易
            window.location.href = "/alipay/init_trade/?pay_money=" + payMoney 
                + "&pay_value="
                + payValue + "&user_id=" + window.objectUser.get( "UserId" );
        } ,//}}}

        unactiveOthers: function() {
        //{{{
            _.each(
                this.$el.find( ".sub_item_inner" ) , 
                function( el ) {
                    $( el ).removeClass( "active" )
                        .find( "input" ).attr( "checked" , false );
                }
            )
        } ,//}}}

        activeIt: function( event ) {
        //{{{
            this.unactiveOthers();

            var $el = $( event.target );

            if( $el.hasClass( "des" ) ) {
                $el = $el.parent();
            }

            if( $el.hasClass( "num" ) ) {
                $el = $el.parent().parent();
            }

            $el.find( "input" )[0].checked = true;

            if( $el.hasClass( "active" ) ) {
                $el.removeClass( "active" );
            } else {
                $el.addClass( "active" );
            }
        } ,//}}}

        render: function() {
        //{{{
            $.ui.updateContentDiv(
                "buy_coin" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( 
                "#buy_coin" ,
                false ,
                false , 

                "none" 
            );
            return this;
        }//}}}
    });

    return BuyCoin;
});
