//
// 需要注意的是 修改日志 以及添加一篇新的日志都是使用这样
// 的一个 view
//
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/diary" ,
    "v/menu" ,

    "text!tpl/edit_diary.html" ,
    "text!tpl/add_new_diary.html" ,

    "lib/helper"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    Diary ,
    MenuView ,

    editDiaryTpl ,
    addNewDiaryTpl ,

    helper
) {
    "use strict";

    var EditDiaryView = Backbone.View.extend({
        events: {
        
        },

        initialize: function( args ) {
            new MenuView();

            this.model = new Diary();
            this.listenTo( this.model , "change" , this.render );

            //@XXX 这里使用 yeild 可能会更优雅一点
            if( typeof args !== "undefined" && !isNaN( args.diary_id ) ) {
                //修改
                var diaryId = args.diary_id;
                this.template = editDiaryTpl;
                this.divIdName = "edit_diary";

                this.model.fetch({
                    data: {
                        diary_id: diaryId
                    }
                });
                this.$el = $.ui.addOrUpdateDiv( this.divIdName , "" );
            } else {
                //新日志
                this.template = addNewDiaryTpl;
                this.divIdName = "add_new_diary";
                this.$el = $.ui.addOrUpdateDiv( this.divIdName , "" );

                this.render();
            }
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
                "#" + this.divIdName ,
                false ,
                false , 

                "none" 
            );
            return this;
        }//}}}

    });

    return EditDiaryView;
});

