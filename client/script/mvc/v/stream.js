define([
    "jquery" ,
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "socketioinit" ,

    "text!tpl/stream.html" ,
    "text!tpl/main_panel.html" ,
    "text!tpl/div/header.html" ,
    "text!tpl/div/footer.html" ,
    "text!tpl/stream_show_more.html" ,

    "v/main_panel",
    "c/users",
    "v/stream_item"
] ,
function(
    $ ,
    _ ,
    Backbone ,
    Mustache ,
    socket ,

    streamTpl ,
    mainPanelTpl ,
    headerTpl ,
    footerTpl ,
    streamShowMoreTpl ,

    MainPanelView ,
    Users,
    StreamItemView
){
    "use strict";

    //这里的 Stream.$el 指代整个 stream 页面
    //而非 div#stream
    var Stream = MainPanelView.extend({
        template: streamTpl ,

        initialize: function( route ) {
            this.baseInitialize( route );

            this.events = $.extend({
                
            }, this.baseEvents );

            _.bindAll( this , "addOne" , "addAll" );

            this.route = route;

            this.$el.append(
                Mustache.to_html(
                    this.template ,
                    {
                        header: headerTpl,
                        footer: footerTpl,
                        main_panel: mainPanelTpl
                    }
                )
            );

            this.$streamEl = this.$el.find( ".stream" );

            var users = new Users();
            users.fetch({
                success: function( coll , res ){
                    
                },
                error: function( coll , res ) {
                    console.log( "fetch users error" + res );
                }
            });
            users.bind( "add" , this.addOne );
            users.bind( "reset" , this.addAll );
        },

        addOne: function( item ) {
            var streamItemView = new StreamItemView( {model: item} );
            this.$streamEl.append( streamItemView.render().el );
        },

        addAll: function() {
            users.each( this.addOne );
        },

        render: function(){
            return this;
        }
    });

    return Stream;
});

