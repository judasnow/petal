define([] , 
function() {
    var interactWithServer = {};

    interactWithServer.sendGift = function( targetUserId , giftId , doneCallback , cancelCallback ) {
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
                    message: "礼物已经成功送出，是否继续赠送？",

                    cancelText: "不", 
                    cancelCallback: cancelCallback,

                    doneText: "继续",
                    doneCallback: doneCallback
                });
                $.ui.hideMask();
            } ,
            function() {
                alert( "失败" );
            }
        );
    };

    return interactWithServer;
});
