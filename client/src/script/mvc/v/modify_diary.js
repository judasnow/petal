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

    "text!tpl/modify_diary.html" ,

    "lib/helper" ,
    "lib/common_operate"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    Diary ,
    MenuView ,

    modifyDiaryTpl ,

    helper ,
    commonOperate
) {
    "use strict";

    var ModifyDiaryView = Backbone.View.extend({
        template: modifyDiaryTpl ,

        events: {
            "tap .save": "doSave"
        },

        initialize: function( args ) {
            new MenuView();

            _.bindAll( this , "doSave" , "render" );

            this.model = new Diary();
            this.listenTo( this.model , "change" , this.render );

            //@XXX 这里使用 yeild 可能会更优雅一点
            if( typeof args !== "undefined" && !isNaN( args.diary_id ) ) {

                //修改
                var diaryId = args.diary_id;
                this.divIdName = "edit_diary";

                this.model.fetch({
                    data: {
                        diary_id: diaryId
                    }
                });

                this.$el = $.ui.addOrUpdateDiv( "modify_diary" ,  "" );
            } else {
                //没有提供 diaryId 跳转到 add_new_diary
                window.router.navigate( "add_new_diary" , {trigger: true} );
            }
        } ,

        doSave: function() {
        //{{{
            var title = this.$title.val();
            var content = this.$content.val();

            commonOperate.addOrUpdateDiaryInfo({
                diary_id: this.model.get( "DId" ) ,
                title: title ,
                content: content
            });
        } ,//}}}

        render: function() {
        //{{{
            this.$el.html( 
                Mustache.to_html( 
                    this.template , 
                    this.model.toJSON() 
                )
            );

            $.ui.loadContent( 
                "#modify_diary",
                false ,
                false , 

                "none" 
            );

            this.$title = this.$el.find( ".title" );
            this.$content = this.$el.find( ".content" );

            return this;
        }//}}}

    });

    return ModifyDiaryView;
});

