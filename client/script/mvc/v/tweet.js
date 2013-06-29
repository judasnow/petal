define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "v/menu" ,

    "text!tpl/tweet.html" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    MenuView ,

    tweetTpl
) {
    "use strict";

    var Tweet = Backbone.View.extend({
        template: tweetTpl ,

        initialize: function() {
            new MenuView();

            this.model = window.objectUser;

            $.ui.tryAddContentDiv( "tweet" , "" );
            this.$el = $( "#tweet" );

            $.ui.updateContentDiv( 
                "tweet" ,
                Mustache.to_html(
                    this.template ,
                    window.objectUser.toJSON()
                )
            );

            $.ui.loadContent( "#tweet/self" , false , false , "none" );

            var self = this;
            window.tweetIt = function() {
                var $tweetInput = self.$el.find( ".tweet_input" );
                if( $tweetInput.val() !== null ) {
                    $.post( 
                        "/api/tweet_it/" ,
                        {
                            user_id: window.objectUser.get( "UserId" ) ,
                            content: $tweetInput.val()
                        } ,
                        function( data ) {
                            if( JSON.parse(data)[0] === "ok" ) {
                                window.router.navigate( "/#stream" , {trigger: true} );
                            }
                        }
                    )
                }
            }
        }
    });

    return Tweet;
});

