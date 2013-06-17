//后台同 huaban123.com 通信 获取最新的 msg 
var redis = require( "redis" )
    , fs = require( "fs" )
    , helper = require( "./helper.js" );


require( "date-utils" );

module.exports = function( config ) {
    var redisClient = redis.createClient( "6379" , "172.17.0.46" )

    var ok = function( dataObj ) {
        (function( msgList ){
            var len = msgList.length;
            if( len > 0 ) {
                for( var i = 0 ; i < len ; i++ ) {
                    var msgString = JSON.stringify( msgList[i] );
                    redisClient.publish( "new_msg" , msgString );
                    redisClient.hset( "msg" , msgList[i].MsgId + ":" + msgList[i].AcceptUserId , msgString )
                    console.log( "publish a msg" );
                }
            }
        })( JSON.parse( dataObj.msg_list ) );
    };

    //总是以当前时间进行查询 则总是返回空
    //应该维护一个最后更新时间
    var timeStep = 5000;
    var lastUpdateDate = new Date();
    //减少同数据库服务器的时间差
    lastUpdateDate.addSeconds( -5 );
    var id = setInterval( function() {
        var beginTime = lastUpdateDate.toFormat( "YYYY-MM-D HH24:MI:SS" );
        lastUpdateDate = lastUpdateDate.addSeconds( (timeStep/1000) );
        req2hb123(
            "get" ,
            "about=msg&action=get_latest_msg_list&p=1&begin_time=" + beginTime ,

            ok
        );
    } , timeStep );
}

