//最近联系人的信息记录
define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/chat_item" ,
    "c/chat_items" ,
    "v/chat_item" ,

    "text!tpl/chat_list.html" 
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    ChatItem ,
    ChatItems ,
    ChatItemView ,

    chatListTpl 
){
    "use strict";
    $.ui.addContentDiv( "#chat_list" , "" );

    var ChatList = Backbone.View.extend({
        template: chatListTpl ,
        className: "panel" ,

        initialize: function() {
            _.bindAll( this , "sendMsg" , "addOne" , "addAll" , "render" );

            $.ui.addOrUpdateDiv( "chat_list" , this.template );
            $.ui.loadContent( "#chat_list" , false , false , "fade" );

            this.$el = $( "#chat_list" );

            this.$items = this.$el.find( ".items" );
            this.$inputAreaBox = $( "#input_area_box" );
            this.$sendBtn = this.$inputAreaBox.find( ".submit" );
            this.$chatInput = this.$inputAreaBox.find( ".chat_input" );
            this.$sendBtn.on( "click" , this.sendMsg );


            this.chatItems = new ChatItems();
            this.chatItems.bind( "change", this.render );
            this.chatItems.bind( "add" , this.addOne );
            this.chatItems.bind( "reset" , this.addAll );

            this.chatItems.fetch({
                data: {
                    user_id: window.objectUser.get( "UserId" ) ,
                    root_msg_id: window.localStorage.getItem( "target_msg_id" ) 
                }
            });
        },

        addOne: function( chatItem ) {
            var view = new ChatItemView({model: chatItem});
            this.$items.append( view.render().el );
        },

        addAll: function() {
            this.chatItems.each( this.addOne );
        },

        render: function() {
            return this;
        },

        //发送信息的事件
        sendMsg: function() {
            var msg = this.$chatInput.val();
            if( msg !== "" ) {
                $.post(
                    "/api/send_msg" ,
                    {
                        subject_user_id: window.localStorage.getItem( "send_gift_target_user_id" ),
                        object_user_id: window.objectUser.get( "UserId" ),
                        content: msg ,
                        root_msg_id: window.localStorage.getItem( "root_msg_id" )
                    },
                    $.proxy(function() {
                        this.addOne(
                            new ChatItem({
                                SrcUserId: window.objectUser.get( "UserId" ),
                                time: 123, 
                                Content: msg
                            })
                        );
                    }, this)
                );
            }
        }
    });

    return ChatList;
});

