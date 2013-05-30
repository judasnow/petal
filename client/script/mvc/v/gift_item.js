define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "text!tpl/gift_item.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    giftItemTpl
){
    "use strict";

    var GiftItem = Backbone.View.extend({
        className: "item",
        template: giftItemTpl ,

        events: {
            "tap": "sendGift"
        },

        initialize: function() {
            _.bindAll( this , "sendGift" );
        },

        sendGift: function( event ) {
            event.stopImmediatePropagation();
            var targetUserId = window.localStorage.getItem( "send_gift_target_user_id" );
            if( targetUserId === null ) {
                alert( "没有选择目标用户，将仅仅只是购买该礼物" );
            } else {
                //购买并赠送该礼物给指定的用户
                var giftId = this.model.get( "GId" );
                $.ui.showMask();
                $.post(
                    "/api/send_gift/" ,
                    {
                        gift_id: giftId ,
                        target_user_id: targetUserId ,
                        from_user_id: window.objectUser.get( "UserId" )
                    } ,
                    function() {
                        $.ui.popup({ 
                            title: "恭喜",
                            message: "礼物已经成功送出，是否继续选取礼物？",
                            cancelText: "不", 
                            cancelCallback: function() {
                                $.ui.goBack();
                            },
                            doneText: "继续",
                            doneCallback: function() {

                            },
                            cancelOnly:false
                        });
                        $.ui.hideMask();
                    } ,
                    function() {
                        alert( "操作失败" );
                    }
                )
            }
        },

        render: function() {
            this.$el.html( 
                    Mustache.to_html( 
                        this.template , 
                        this.model.toJSON() 
                        ) 
                    );
            return this;
        }
    });

    return GiftItem;
});
