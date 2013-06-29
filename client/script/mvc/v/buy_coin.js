define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "v/menu" ,

    "text!tpl/buy_coin.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    User ,

    MenuView ,

    buyCoinTpl
){
    "use strict";

    var BuyCoin = Backbone.View.extend({
        template: buyCoinTpl ,

        events: {
            "click .sub_item_inner": "activeIt"
        } ,

        initialize: function() {
            new MenuView();

            //@todo 注意这里是一个权宜 不应该需要新建立一个
            //user model 的
            this.model = new User();
            this.listenTo( this.model , "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: window.objectUser.get( "UserId" )
                }
            });

            _.bindAll( this , "render" , "unactiveOthers" , "activeIt" );
            
            $.ui.tryAddContentDiv( "buy_coin" , "" );
            this.$el = $( "#buy_coin" );
            this.$el.find( ".sub_item" ).bind( "tap" , function( e ) {
                $( this ).find( "input" )[0].checked = true;
            });
        } ,

        unactiveOthers: function() {
            _.each(
                this.$el.find( ".sub_item_inner" ) , 
                function( el ) {
                    $( el ).removeClass( "active" )
                        .find( "input" ).attr( "checked" , false );
                }
            )
        } ,

        activeIt: function( event ) {
            this.unactiveOthers();

            var $el = $( event.target );
            if( $el.hasClass( "des" ) ) {
                $el = $el.parent();
            }
            if( $el.hasClass( "num" ) ) {
                $el = $el.parent().parent();
            }
            $el.find( "input" ).attr( "checked" , true );
            if( $el.hasClass( "active" ) ) {
                $el.removeClass( "active" );
            } else {
                $el.addClass( "active" );
            }
        } ,

        render: function() {
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
        }
    });

    return BuyCoin;
});
