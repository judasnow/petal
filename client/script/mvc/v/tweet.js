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
        events: {
            "tap .submit_btn": "tweetIt"
        } ,

        initialize: function() {
            new MenuView();

            _.bindAll( 
                this , 
                "tweetIt" 
            );

            this.model = window.objectUser;
            this.render();
        } ,

        tweetIt: function() {
            var $tweetInput = this.$el.find( ".tweet_input" );
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
        } ,

        render: function() {
            this.$el = $.ui.addOrUpdateDiv( "tweet" , "" );
            $.ui.updateContentDiv( 
                "tweet" ,
                Mustache.to_html(
                    this.template ,
                    window.objectUser.toJSON()
                )
            );
            $.ui.loadContent( "#tweet/self" , false , false , "none" );
        }
    });

    return Tweet;
});

