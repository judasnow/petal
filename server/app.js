//{{{
var cluster = require( "cluster" )
    , os = require( "os" )
    , _ = require( "underscore" )
    
    , express = require( "express" )

    , config = require( "./config/config" )["dev"]
    , helper = require( "./lib/helper" );
//}}}

//if (cluster.isMaster) {
//    for( var i = 0 ; i < os.cpus().length ; i++ ) {
//        cluster.fork();
//    }
//    cluster.on( "exit" , function( worker , code , signal ) {
//        console.log( "workes " + worker.process.pid + " died" );
//    });
//} else {
    var app = express()
        , server = require( "http" ).createServer( app )
        , io = require( "socket.io" ).listen( server )
        , redis = require( "redis" );
    server.listen( config.port || 8800 );

    var redisClient = redis.createClient( "6379" , config.redisServer );

    io.sockets.on( "connection" , function ( socket ) {

        //用户初次访问 获取未读的 msg 
        //@todo 最好是可以带上 object_user_id 不然每次都要遍历全部信息
        redisClient.hgetall( "unread_msg" , function( error , msgs ) {
            _.each( msgs , function( msg ) {
                var msgObj = JSON.parse( msg );
                socket.emit( "new_msg:" + msgObj.AcceptUserId , msgObj );
            });
        });
        //获取新收到的礼物 似乎只需要一个数量即可 除非用户就在 礼物中心页面
        redisClient.hgetall( "new_send_gift" , function( error , gifts ) {
            //{{{
            // "ID_BA39C0CE-819A-435C-81B2-84406CB448A0": 7,
            // "RId": 311,
            // "GId": 15,
            // "GTitle": "男士衬衫",
            // "GPrice": 550,
            // "GPicName": "201003121236357031.jpg",
            // "IsVirtual": true,
            // "AUid": 2303,
            // "SUid": 459,
            // "SNickName": "午夜梦回",
            // "SHeadPic": "201303/071444353430.jpg",
            // "SSex": "男",
            // "SCSRQ": "birthday",
            // "SVcLevel": "201302050335584843.gif",
            // "SAreaDes": "吉林,长春",
            // "CurState": 3,
            // "StateAt": "2013-06-08T09:48:52.233",
            // "SendAt": "2013-06-08T09:48:52.233",
            // "CreateAt": "2013-06-08T09:48:52.17",
            // "BZ": "110"
            // }}}
            _.each( gifts , function( gift ) {
                var giftObj = JSON.parse( gift );
                socket.emit( "new_gift:" + giftObj.AUid , giftObj );
            });
        });
        //获取最近访问过自己的人
        redisClient.hgetall( "new_visitors" , function( error , visitorses ) {
            //{{{
            // "UserId": 2310,
            // "NickName": "uuu",
            // "HeadPic": "201306/010132402970.jpg",
            // "Sex": "女",
            // "CSRQ": "birthday",
            // "AreaDes": "四川,成都",
            // "PSLevelFlag": "201005181658407812.gif",
            // "PSLevelName": "一级",
            // "VCLevelFlag": "201302050332283281.gif",
            // "VCLevelName": "1 级",
            // "MD": "红粉知己",
            // "ZWJS": "请用最恰当的语言描述自己，尽情展示自己！全面、详细的介绍才能获得更多关注和吸引哦！",
            // "BrowseAt": "2013-06-23T23:34:09",
            // "sex_in_english": "female",
            // "age": null,
            // "isFemale": true,
            // "location": "四川 成都"
            //}}}
            _.each( visitorses , function( visitors ) {
                var visitorsObj = JSON.parse( visitors );
                socket.emit( "new_visitors:" + visitorsObj.BUserId , visitorsObj );
            });
        });

        require( "./worker/msg_worker" )( config , socket , redisClient );

        //用户已经那个查看该条信息 删除之
        socket.on( "msg_received", function ( data ) {
            redisClient.hdel( "unread_msg" , data.key );
            console.dir( "user success receive a msg" );
        });
        socket.on( "gift_checked", function ( data ) {
            redisClient.hdel( "new_send_gift" , data.key );
            console.dir( "user success check a gift: " + data.key  );
        });
        socket.on( "visitors_checked", function ( data ) {
            redisClient.hdel( "new_visitors" , data.key );
            console.dir( "user success check a visitors: " + data.key  );
        });
    });

//middlewares
//{{{
app.use( express.bodyParser() );
//}}}

require( "./config/express" )( app , config );
require( "./config/routes" )( app );
//}}}

exports = module.exports = app;
