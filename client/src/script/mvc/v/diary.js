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
            "tap .modify": "goToModify",
            "tap": "goToDetail"
        },

        initialize: function() {
        //{{{
            _.bindAll( this , "goToDetail" , "goToModify" );
        } ,//}}}

        goToDetail: function() {
        //{{{
            window.router.navigate( "diary_detail/" + this.model.get( "DId" ) , {trigger: true} );
        } ,//}}}

        goToModify: function() {
        //{{{
            event.stopImmediatePropagation();

            window.router.navigate( "modify_diary/" + this.model.get( "DId" ) , {trigger: true} );
        } ,//}}}
        
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

