define([ 
    "underscore" ,
    "backbone" ,
    "mustache" 
],
function( 
    _ , 
    Backbone ,
    Mustache 
){
    "use strict";

    var MenuView = Backbone.View.extend({
        el: $( "#main_panel" ) ,
        events: {

        },

        initialize: function() {
            //使用 object_user_info 渲染之
            alert( this.$el.html() )
        },

        render: function() {
            this.$el.append( this.template );
            return this;
        }
    });

    return MenuView;
});
