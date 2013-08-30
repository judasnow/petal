define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,
    "v/menu" ,

    "text!tpl/add_new_diary.html" ,

    "lib/helper"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    User ,
    MenuView ,

    addNewDiaryTpl ,

    helper
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

            if( typeof title === "undefined" || title === "" ) {
                window.updateSysNotice( "标题不能是空" );
                return;
            }

            if( typeof content === "undefined" || content === "" ) {
                window.updateSysNotice( "日志内容不能是空" );
                return;
            }

            $.post(
                "/api/diary" ,
                {
                    user_id: window.objectUser.get( "UserId" ) ,
                    title: title ,
                    content: content 
                } ,
                function( data ) {
                    var dataObj = JSON.parse( data );
                    console.dir( data )
                    if( dataObj.code === "200" ) {
                        alert( "ok" )
                    }
                }
            );
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

