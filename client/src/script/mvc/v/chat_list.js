define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/chat_item" ,

    "c/chat_items" ,

    "v/chat_item" ,
    "v/sys_notice" ,

    "text!tpl/chat_list.html" ,

    "lib/common_operate"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    ChatItem ,
    ChatItems ,

    ChatItemView ,
    SysNoticeView ,

    chatListTpl ,

    commonOperate
){
    "use strict";

    var ChatList = Backbone.View.extend({
        template: chatListTpl ,

        initialize: function() {
        //{{{
            _.bindAll( 
                this , 
                "sendMsg" , "addOne" , "addAll" , "render" );

            this.$el = $.ui.addOrUpdateDiv( "chat_list" , this.template , true );
            $.ui.loadContent( "#chat_list" , false , false , "none" );

            var streamView = this;
            var scroll = this.$el.scroller();
            scroll.refresh = false;
            this.scroll = scroll;

            this.$items = this.$el.find( ".items" );
            this.$inputAreaBox = $( "#input_area_box" );
            this.$sendBtn = this.$inputAreaBox.find( ".submit" );
            this.$chatInput = this.$inputAreaBox.find( ".chat_input" );
            this.$sendBtn.on( "click" , this.sendMsg );

            this.chatItems = new ChatItems();
            this.chatItems.bind( "change", this.render );
            this.chatItems.bind( "add" , this.addOne );
            this.chatItems.bind( "reset" , this.addAll );

            this.$el.on( "new_msg" , $.proxy(function( event ) {
                this.addOne( new ChatItem( event.data ) );
            },this));

            this.chatItems.fetch({
                data: {
                    user_id: window.objectUser.get( "UserId" ) ,
                    root_msg_id: window.localStorage.getItem( "petal:root_msg_id" ) 
                }
            });
        } ,//}}}

        addOne: function( chatItem ) {
        //{{{
            var view = new ChatItemView({ model: chatItem });
            this.$items.append( view.render().el );
        } ,//}}}

        addAll: function() {
        //{{{
            this.chatItems.each( this.addOne );
        } ,//}}}

        render: function() {
        //{{{
            return this;
        } ,//}}}

        sendMsg: function() {
        //{{{
            var msg = this.$chatInput.val();

            if( msg !== "" ) {
                var targetUserId = window.localStorage.getItem( "petal:send_msg_target_user_id" );
                var rootMsgId = window.localStorage.getItem( "petal:root_msg_id" );
                $.post(
                    "/api/send_msg" ,
                    {
                        target_user_id: targetUserId ,
                        object_user_id: window.objectUser.get( "UserId" ) ,
                        content: msg ,
                        root_msg_id: rootMsgId
                    } ,

                    //send ok
                    $.proxy(function( data ) {
                        var dataObj = JSON.parse( data );

                        if( dataObj.result === "ok" ) {
                            //删除已经发送的内容
                            this.$chatInput.val( "" );

                            if( dataObj.need_pay === "True" ) {
                                window.updateSysNotice( "金币 -" + window.costOfSendMsg );
                            }

                            this.addOne(
                                new ChatItem({
                                    SrcUserId: window.objectUser.get( "UserId" ) ,
                                    SrcHeadPic: window.objectUser.get( "HeadPic" ) ,
                                    sexInEnglish: window.objectUser.get( "sexInEnglish" ) ,
                                    Content: msg
                                })
                            );
                        } else {
                            commonOperate.insufficientCoinHandle();
                        }
                    }, this) ,
                    function( data ) {
                        console.dir( data )
                    }
                );
            } else {
                window.updateSysNotice( "信息内容不能为空" );
            }
        }//}}}
    });

    return ChatList;
});

