define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/diary.html" ,

    "lib/helper"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    diaryTpl ,

    helper
) {
    "use strict";

    var diaryView = Backbone.View.extend({
        className: "item" ,
        template: diaryTpl ,

        events: {
        
        },

        initialize: function() {
            
        } ,

        
        render: function() {
        //{{{
            this.$el.html( 
                Mustache.to_html( 
                    this.template , 
                    this.model.toJSON() 
                ) 
            );
            helper.showImage( this.$el.find( "img" ) );
            return this;
        }//}}}

    });

    return diaryView;
});

