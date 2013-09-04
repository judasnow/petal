define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/diary" ,
    "m/diary_comment" ,
    "v/menu" ,

    "c/diary_comments" ,

    "text!tpl/diary_detail.html" ,
    "text!tpl/diary_comment.html" ,

    "lib/helper" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    Diary ,
    DiaryComment ,
    MenuView ,

    DiaryComments ,

    diaryDetailTpl ,
    diaryCommentTpl ,

    helper
) {
    "use strict";

    var DiaryDetailView = Backbone.View.extend({
        template: diaryDetailTpl ,

        events: {
            
        },

        initialize: function( args ) {
        //{{{
            new MenuView();
            this.$el = $.ui.addOrUpdateDiv( "diary_detail" , "" );

            _.bindAll( this , 
                "render" , 
                "renderComments" , 
                "enableInputComment" , 
                "_appendComment" , 
                "_addCommentEvent" 
            );

            if( typeof args.diary_id === "undefined" || isNaN( args.diary_id ) ) {
                throw new Error( "try show diary detail with invalid diary_id" );
            }

            var diaryId = args.diary_id;

            this.model = new Diary();
            this.listenTo( this.model , "change" , this.render );
            this.model.fetch({
                data: {
                    diary_id: diaryId
                }
            });
        } ,//}}}

        _addCommentEvent: function( $btn ) {
        //{{{
            var that = this;
            $( $btn ).on( "click" , function() { 
                var $this = $( this );
                //var $item = $this.parent().parent();
                var $nickName = $this.parent().parent().find( ".nickname" );
                var nickname = $nickName.text();

                if( typeof nickname === "undefined" || nickname === "" ) {
                    throw new Error( "comment user nickname is invalid" );
                } else {
                    that.$commentInput.val( "@" + nickname + " " );
                }
            });
        },//}}}

        //向列表中添加新的评论信息
        //@param commentInfo 为一 json 数组
        _appendComment: function( commentInfo ) {
        //{{{
            var commentHtml = Mustache.to_html( diaryCommentTpl , commentInfo );
            this.$commentsContent.prepend( commentHtml );

            this._addCommentEvent( this.$commentsContent.find( ".sub_item .comment" )[0] );

            helper.showImage( this.$commentsContent.find( "img" ) );
        } ,//}}}

        renderComments: function() {
        //{{{
            var diaryId = this.model.get( "DId" );
            var diary_comments = new DiaryComments();
            this.$commentsContent = this.$el.find( ".comments .content" );
            var that = this;

            diary_comments.fetch({
                data: {
                    diary_id: diaryId
                } ,
                success: function( coll ) {
                    if( coll.length > 0 ) {
                        //分条渲染 comment
                        coll.each(
                            function( item ) {
                                that._appendComment( item.toJSON() );
                            }
                        );
                    }
                    helper.showImage( that.$commentsContent.find( "img" ) );
                }
            });
        },//}}}

        enableInputComment: function() {
        //{{{
            $.ui.toggleNavMenu();

            var that = this; 
            var $narbar = $( "#navbar" );
            var $submit = $narbar.find( ".submit" );
            var $commentInput = $narbar.find( ".comment_input" );
            this.$commentInput = $commentInput;

            $submit.on( "click" , function() {
                var comment = $commentInput.val();

                if( typeof comment === "undefined" || comment === "" ) {
                    window.updateSysNotice( "评论内容不能为空" );
                    return;
                }

                var newComment =  {
                    user_id: window.objectUser.get( "UserId" ) ,
                    nickname: window.objectUser.get( "NickName" ) ,
                    comment: comment ,
                    target_user_id: that.model.get( "UserId" ) ,
                    diary_id: that.model.get( "DId" ) 
                };

                $.post(
                    "/api/add_new_comment" ,

                    newComment ,

                    function( data ) {
                        var dataObj = JSON.parse( data );
                        if( dataObj.result === "ok" ) {
                            //评论成功
                            //转换为可以进行渲染的对象
                            var newCommentItem = new DiaryComment({
                                HeadPic: window.objectUser.get( "HeadPic" ) ,
                                Comment: newComment.comment ,
                                NickName: newComment.nickname
                            });
                            that._appendComment( newCommentItem.toJSON() );
                            window.updateSysNotice( "添加评论成功" );
                        }
                    }
                );
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
                "#diary_detail" ,
                false ,
                false ,

                "none" 
            );

            helper.showImage( this.$el.find( "img" ) );

            //注意顺序
            //添加新评论部分功能
            this.enableInputComment();

            //主题部分渲染完成之后 自动的进行评论内容发的渲染
            this.renderComments();

            return this;
        }//}}}

    });

    return DiaryDetailView;
});

