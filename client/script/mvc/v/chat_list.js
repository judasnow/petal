//最近联系人的信息记录
define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "c/chat_items" ,
    "v/chat_item" ,

    "text!tpl/chat_list.html" 
],
function( 
    _ ,
    Backbone ,
    Mustache ,
    ChatItems ,
    ChatItemView ,

    chatListTpl 
){
    "use strict";
    $.ui.addContentDiv( "#chat_list" , "" );

    var ChatList = Backbone.View.extend({
        template: chatListTpl ,

        el: "#chat_list" ,

        initialize: function() {
            this.render();

            this.$items = this.$el.find( ".items" );

            this.chatItems = new ChatItems();
            this.chatItems.bind(
                {
                    "change": this.render ,
                    "add": this.addOne ,
                    "refresh": this.addAll 
                }
            );

            _.bindAll( this , "sendMsg" );

            this.chatItems.fetch({
                data: {
                    userId: window.objectUser.get( "UserId" )
                },
                success: function() {
                    //footer 部分必须 render 之后才可以
                    this.$inputAreaBox = $( "#input_area_box" );
                    this.$sendBtn = this.$inputAreaBox.find( ".submit" );
                    this.$chatInput = this.$inputAreaBox.find( ".chat_input" );

                    this.$sendBtn.on( "click" , this.sendMsg );
                }
            });
        },

        addOne: function( chatItem ) {
            var view = new ChatItemView( chatItem );
            //往上加 还是往下加 似乎不一定
            this.$items.append( view.render().el );
        },

        addAll: function() {
            this.ChatItems.each( this.addOne );
        },

        render: function() {
            $.ui.updateContentDiv( "chat_list" , this.template );
            $.ui.loadContent( "#chat_list" , false , false , "fade" );
            return this;
        },

        //发送信息的事件
        sendMsg: function() {
            var msg = this.$chatInput.val();
            if( msg !== "" ) {
                
            }
        }
    });

    return ChatList;
});

