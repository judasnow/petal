define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,
    "v/menu" ,

    "text!tpl/add_new_diary.html" ,

    "lib/helper" ,
    "lib/common_operate"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    User ,
    MenuView ,

    addNewDiaryTpl ,

    helper ,
    commonOperate
) {
    "use strict";

    var AddNewDiaryView = Backbone.View.extend({
        template: addNewDiaryTpl ,

        events: {
            "tap .add_new": "addNewDiary"
        },

        initialize: function() {
            _.bindAll( this , "addNewDiary" );

            new MenuView();

            this.model = new User();
            //this.listenTo( this.model , "change" , this.render );

            this.$el = $.ui.addOrUpdateDiv( "add_new_diary" , "" );
            this.render();
        } ,

        addNewDiary: function() {
            var title = this.$title.val();
            var content = this.$content.val();

            commonOperate.addOrUpdateDiaryInfo({
                title: title ,
                content: content
            });
        } ,

        render: function() {
        //{{{
            this.$el.html( 
                Mustache.to_html( 
                    this.template , 
                    this.model.toJSON() 
                ) 
            );
            $.ui.loadContent( 
                "#add_new_diary" ,
                false ,
                false ,

                "none" 
            );
            this.$title = this.$el.find( ".title" );
            this.$content = this.$el.find( ".content" );
            return this;
        }//}}}

    });

    return AddNewDiaryView;
});

