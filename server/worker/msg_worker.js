//同步获取最新用户动态
var fs = require( "fs" )
    , _ = require( "underscore" )
    , helper = require( "../lib/helper" )
    , config = require( "../config/config" );

require( "date-utils" );

module.exports = function( config , socket , redisClient ) {
    //保存获取的最新消息到 redis
    var get_msg_ok = function( dataObj ) {
        (function( msgList ){
            var len = msgList.length;
            if( len > 0 ) {
                for( var i = 0 ; i < len ; i++ ) {
                    var msgItem = msgList[i];
                    //因为使用了 msgId 作为键 因此不会出现重复的情况
                    //@todo 为了方便 是否应该考虑在 key 中加入收信人的 id
                    //@todo 使用 hmset
                    redisClient.hset(
                        "unread_msg" ,
                        msgItem.MsgId + ":" + msgItem.AcceptUserId ,
                        JSON.stringify( msgItem )
                    );
                    socket.emit( "new_msg:" + msgItem.AcceptUserId , msgItem );
                }
            }
        })( JSON.parse( dataObj.msg_list ) );
    };

    var get_gift_ok = function( dataObj ) {
        (function( giftList ){
            var len = giftList.length;
            if( len > 0 ) {
                for( var i = 0 ; i < len ; i++ ) {
                    var giftItem = giftList[i];
                    redisClient.hset(
                        "new_send_gift" ,
                        giftItem.RId + ":" + giftItem.AUid,
                        JSON.stringify( giftItem )
                    );
                    socket.emit( "new_gift:" + giftItem.AUid , giftItem );
                }
            }
        })( JSON.parse( dataObj.gift_list ) );
    };

    var get_visitors_ok = function( dataObj ) {
        (function( userList ){
            var len = userList.length;
            if( len > 0 ) {
                for( var i = 0 ; i < len ; i++ ) {
                    var userItem = userList[i];
                    redisClient.hset(
                        "new_visitors" ,
                        userItem.BUserId + ":" + userItem.BrowseAt ,
                        JSON.stringify( userItem )
                    );
                    socket.emit( "new_visitors:" + userItem.BUserId , userItem );
                }
            }
        })( JSON.parse( dataObj.user_list ) );
    };

    //总是以当前时间进行查询 则总是返回空
    //应该维护一个最后更新时间
    var timeStep = 5000;
    var lastUpdateDate = new Date();

    //减少同数据库服务器的时间差
    lastUpdateDate.addSeconds( -5 );
    setInterval( function() {

        var beginTime = lastUpdateDate.toFormat( "YYYY-MM-D HH24:MI:SS" );
        lastUpdateDate = lastUpdateDate.addSeconds( (timeStep/1000) );
        helper.req2hb123(
            "get" ,
            "about=msg&action=get_latest_msg_list&p=1&begin_time=" + beginTime ,

            get_msg_ok
        );

        helper.req2hb123(
            "get" ,
            "about=gift&action=new_send_gift_list&begin_send_time=" + beginTime ,

            get_gift_ok
        );

        helper.req2hb123(
            "get" ,
            "about=user&action=new_visitors_list&begin_browse_time=" + beginTime ,

            get_visitors_ok
        );

    } , timeStep );
}

