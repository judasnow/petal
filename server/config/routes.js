var  config = require( "../config/config" )["dev"]
    , api = require( "../controllers/api" );

module.exports = function( app ) {
    //api routes
    //user
    app.get( "/api/get_username_by_wx_id" , api.getUsernameByWxId );
    app.post( "/api/do_login" , api.doLogin );
    app.get( "/api/users/" , api.getUserList );
    app.post( "/api/upload_files" , api.uploadFiles );
    app.post( "/api/user/" , api.updateUser );
    app.get( "/api/user/" , api.getUser );
    app.post( "/api/tweet_it/" , api.tweetIt );
    app.get( "/api/should_display_contact_info/" , api.shouldDisplayContactInfo );

    //gift
    app.get( "/api/gifts/" , api.getGiftList );
    app.post( "/api/send_gift/" , api.sendGift );

    //payment_recoreds
    app.get( "/api/payment_recoreds/" , api.getPaymentRecordList );

    //msg
    app.get( "/api/msgs/" , api.getMsgList );
    app.get( "/api/chat_items" , api.getMsgListByGroup );
    app.post( "/api/send_msg" , api.sendMsg );
    app.post( "/api/set_back_account" , api.setBankAccount );
    app.post( "/api/withdraw_cash" , api.withdrawCash );

    app.get( "/api/new_msgs/" , api.getNewMsgs );
}
