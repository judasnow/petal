define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/chat_item" ,
    "c/chat_items" ,

    "v/chat_item" ,
    "v/sys_notice" ,

    "text!tpl/chat_list.html" 
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    ChatItem ,
    ChatItems ,

    ChatItemView ,
    SysNoticeView ,

    chatListTpl 
){
    "use strict";

    $.ui.addContentDiv( "#chat_list" , "" );


    var ChatList = Backbone.View.extend({
        template: chatListTpl ,
        className: "panel" ,

        initialize: function() {
        //{{{
            _.bindAll( 
                this , 
                "sendMsg" , "addOne" , "addAll" , "render" );

            $.ui.tryAddContentDiv( "chat_list" , this.template , true );
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
            var view = new ChatItemView({model: chatItem});
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
                $.post(
                    "/api/send_msg" ,
                    {
                        target_user_id: window.localStorage.getItem( "petal:send_msg_target_user_id" ),
                        object_user_id: window.objectUser.get( "UserId" ),
                        content: msg ,
                        root_msg_id: window.localStorage.getItem( "petal:root_msg_id" )
                    },
                    //send ok
                    $.proxy(function( data ) {
                        if( JSON.parse( data )[0] === "ok" ) {
                            window.updateSysNotice( "金币 -" + window.costOfSendMsg );
                            this.addOne(
                                new ChatItem({
                                    SrcUserId: window.objectUser.get( "UserId" ) ,
                                    SrcHeadPic: window.objectUser.get( "HeadPic" ) ,
                                    sex_in_english: window.objectUser.get( "sex_in_english" ) ,
                                    Content: msg
                                })
                            );
                        } else {
                            $.ui.popup({
                                title: "" ,
                                message: "金币不足,买金币或vip吧" ,
                                doneCallback: function() {
                                    window.router.navigate( "/#buy_coin" , {trigger: true} );
                                }
                            });
                        }
                    }, this) ,
                    function( data ) {
                        console.dir( data )
                    }
                );
            }
        }//}}}
    });

    return ChatList;
});

