var helper = require( "../lib/helper" )
    , crypto = require( "crypto" )
    , fs = require( "fs" ) 
    , redis = require( "redis" )
    , config = require( "../config/config" )["dev"]

    , redisClient = redis.createClient( "6379" , config.redisServer );

//user
//为了实现weixin注册之后的自动登录 需要根据用户提供的 weixin_id 
//从 r2d2 的 redis 中获取相应用户的 username (密码是默认的 huaban123)
exports.getUsernameByWxId = function( req , res ) {
//{{{
    var wx_id = req.param( "wx_id" , "" );
    if( wx_id !== "" ) {
        redisClient.get( wx_id , function( err , userInfo ) {
            var userInfo = {};
            var wxRedisClient = redis.createClient( "6379" , "m.huaban123.com" );
            wxRedisClient.auth( "erlang/otp" , function() {
                wxRedisClient.hget( wx_id , "username" , function( error , data ) {
                    userInfo.username = data;
                    if( typeof userInfo.username === "undefined" || userInfo.username === "" ) {
                        res.json( ["fail"] );
                    } else {
                        //返回用户名即可
                        res.json( ["ok" , {username: userInfo.username}] );
                    }
                });
            });
        });
    } else {
        res.json( ["fail"] );
    }
};//}}}

exports.doLogin = function( req , res ) {
//{{{
    var username = req.param( "username" , null );
    var password = req.param( "password" , null );

    var ok = function( dataObj ) {
        res.json( ["ok" , dataObj.user_info] );
    };
    var error = function() {
        res.json( ["fail"] );
    }
    helper.req2hb123( 
        "post" ,
         "about=user&action=login&username=" 
            + username + "&password="
            + crypto.createHash( "md5" ).update( password ).digest( "hex" ) ,

        ok ,
        error
    );
};//}}}

//获取多用户信息
exports.getUserList = function( req , res ) {
//{{{
    var page = req.param( "p" , 1 );
    var q = req.param( "q" , "{}" );

    var qObj = JSON.parse( q );
    var what = (typeof qObj.what !== "undefined" ? qObj.what : "search");
    var object_user_id = (typeof qObj.object_user_id !== "undefined" ? qObj.object_user_id  : null);
    var _case = (typeof qObj._case !== "undefined" ?  qObj._case  : null);

    //获取不同的访问类型 url 
    var what2url = {
        search: "about=user&action=search&p=" + page + '&q=' + q ,
        visitors: "about=user&action=visitors_list&p=" + page + "&user_id=" + object_user_id ,
        had_bought_contact_info: "about=user&action=had_bought_contact_info_list&p=" + page + "&user_id=" + object_user_id ,
        contacts: "about=user&action=contacts_" + _case + "&p=" + page + "&user_id=" + object_user_id 
    }

    var ok = function( dataObj ) {
        var userList = JSON.parse( dataObj.user_list );

        var i = 0;
        var len = userList.length;
        for( ; i < len ; i = i + 1 ) {
            if( typeof userList[i].SUid !== "undefined" || typeof userList[i].BUserId !== "undefined" ) {
                var userInfo = userList[i];
                for( key in userInfo ) {
                    // 1 已经查看联系方式的用户信息 
                    // 2 当前登录用户联系过的人 需要对其信息进行规范化 (真蛋疼)
                    //@todo 可以尝试从缓存中获取一部分信息
                    if( key.match( /^[S|B]/ ) ) {
                        userInfo[key.replace( /^[S|B]/ , "" )] = userInfo[key];
                        delete userInfo[key];
                    }
                }
                //已经查看联系方式的用户信息 中没有 UserId
                if( typeof userInfo.UserId === "undefined" ) {
                    userInfo.UserId = userInfo.Uid;
                }
                delete userInfo.BUid;
            }
            userList[i] = helper.addExtraUserProp( userList[i] );

            if( what === "search" ) {
                userList[i].needsFunc = true;
            }
        }
        res.json( userList );
    };

    helper.req2hb123( "get" , what2url[what] , ok );
};
//}}}

exports.uploadFiles = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var uploadFile = req.files.user_upload_picture;

    var fileNewPath = __dirname + "/uploads/" + uploadFile.name;
    fs.writeFile(
        fileNewPath ,
        fs.readFileSync( uploadFile.path ) ,
        function( err ) {
            //写文件成功之后 上传到 hb123 服务器
            //连带其他的数据一起
            var data = {
                user_id: userId ,
                image: { 
                    file: fileNewPath ,
                    content_type: uploadFile.type 
                }
            }
        
        }
    );
};//}}}

exports.updateUser = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var area_id = req.param( "area_id" , "" );
    var birthday = req.param( "birthday" , "" );
    var zwms = req.param( "zwms" , "" );
    var looks = req.param( "looks" , "" );

    //保存其他信息
    var ok = function( dataObj ) {
        res.json( ["ok"] );
    }
    helper.req2hb123(
        "post" , 
        "about=user&action=update_info&user_id=" + userId + 
        "&birthday=" + birthday + 
        "&zwms=" + zwms + 
        "&looks=" + looks +
        "&area_id=" + area_id ,

        ok
    );
};//}}}

//获取单条用户信息
exports.getUser = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , null );

    var ok = function( dataObj ) {
        //发送来的 json 是一个数组 现在需要合并之 (到 userInfo 中)
        var userInfo = JSON.parse( dataObj.user_info );

        userInfo = helper.addExtraUserProp( userInfo );
        userInfo.wantedGiftList = JSON.parse(dataObj.wanted_gift_list);
        userInfo.pictureList = JSON.parse(dataObj.picture_list);
        userInfo.receivedGiftList = JSON.parse(dataObj.received_gift_list);

        res.json( userInfo );
    };
    helper.req2hb123( "get" , "about=user&action=get_info&user_id=" + userId , ok );
};//}}}

//@todo should be put, but I hava not enought time .... so sad I am.
exports.tweetIt = function( req , res ) {
//{{{
    var userId = req.param( "user_id" );
    var tweetContent = req.param( "content" );

    var ok = function( dataObj ) {
        res.json( ["ok"] );
    }
    helper.req2hb123( 
        "post" , 
        "about=user&action=update_to_say&content=" + tweetContent + 
        "&user_id=" + userId ,

        ok
    );
};//}}}

exports.shouldDisplayContactInfo = function( req , res ) {
    //{{{
    var type = req.param( "type" );
    var objUserId = req.param( "object_user_id" );
    var subUserId = req.param( "subject_user_id" );

    var ok = function( dataObj ) {
        console.dir( dataObj )
        res.json( dataObj );
    };
    helper.req2hb123( 
        "get" , 
        "about=user&action=should_display_contact_info&type=" + type + 
        "&object_user_id=" + objUserId + 
        "&subject_user_id=" + subUserId ,

        ok
    );
};//}}}

//gift
//获取礼物列表
exports.getGiftList = function( req , res ) {
    //{{{
    var page = req.param( "p" , 1 );
    var q = req.param( "q" , "{}" );

    //解析 q
    var qObj = JSON.parse( q );
    var what = (typeof qObj.what !== "undefined" ? qObj.what : "all");
    var object_user_id = (typeof qObj.object_user_id !== "undefined" ?  qObj.object_user_id  : null);

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.gift_list ) );
    };
    //根据不同的 what 访问不同的 api
    var what2url = {
        all: "about=gift&action=get_all&p=" + page ,
        sended: "about=gift&action=sended_list&p=" + page + "&user_id=" + object_user_id ,
        received: "about=gift&action=received_list&p=" + page + "&user_id=" + object_user_id 
    };
    helper.req2hb123( "get" , what2url[what] , ok );
};
//}}}

//送礼物给指定的用户
exports.sendGift = function( req , res ) {
//{{{
    var giftId = req.param( "gift_id" );
    var targetUserId = req.param( "target_user_id" );
    var fromUserId = req.param( "from_user_id" );

    var ok = function( dataObj ) {
        res.json( [ "ok" ] );
    };
    var error = function( dataObj ) {
        res.json( [ "fail" ] );
    }
    helper.req2hb123( 
        "get" , 
        "about=gift&action=send&gift_id=" + giftId + 
        "&target_user_id=" + targetUserId + 
        "&from_user_id=" + fromUserId , 

        ok ,
        error
    );
};//}}}

//payment 
//交易记录
exports.getPaymentRecordList = function( req , res ) {
//{{{
    var page = req.param( "p" , 1 );
    var q = req.param( "q" , "{}" );

    var qObj = JSON.parse( q );
    var object_user_id = (typeof qObj.object_user_id !== "undefined" ?  qObj.object_user_id  : null);

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.record_list ) );
    }
    helper.req2hb123( 
        "get" , 
        "about=user&action=payment_record&p=" + page + "&user_id=" + object_user_id ,

        ok 
    );
};//}}}

//msg
exports.getMsgList = function( req , res ) {
//{{{
    var page = req.param( "p" , 1 );
    var q = req.param( "q" , "{}" );

    var qObj = JSON.parse( q );
    var userId = (typeof qObj.user_id !== "undefined" ?  qObj.user_id  : null);

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.msg_list ) );
    }

    helper.req2hb123( 
        "get" , 
        "about=msg&action=get_list&user_id=" + userId + "&p=" + page , 

        ok 
    );
};//}}}

exports.getMsgListByGroup = function( req , res ) {
//{{{
    var rootMsgId = req.param( "root_msg_id" , 0 );
    var userId = req.param( "user_id" , "" );

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.msg_list ).reverse() );
    }

    helper.req2hb123(
        "get" ,
        "about=msg&action=get_list_by_group&root_msg_id=" + rootMsgId +
            "&user_id=" + userId ,

        ok
    )
};//}}}

exports.sendMsg = function( req , res ) {
//{{{
    var msg = {};
    msg.rootMsgId = req.param( "root_msg_id" , 0 );
    msg.content = req.param( "content" , "" );
    msg.objectUserId = req.param( "object_user_id" , "" );
    msg.targetUserId = req.param( "target_user_id" , "" );

    var ok = function( dataObj ) {
        redisClient.publish( "msg" , JSON.stringify( msg ) );
        redisClient.set( "msg:" + msg.rootMsgId , JSON.stringify( msg ) );
        res.json( [ "ok" ] );
    };

    var error = function( dataObj ) {
        res.json( [ "fail" ] );
    };

    helper.req2hb123( 
        "post" ,
        "about=msg&action=send&title=&content=" + msg.content +
            "&root_msg_id=" + msg.rootMsgId +
            "&object_user_id=" + msg.objectUserId +
            "&target_user_id=" + msg.targetUserId ,

        ok , 
        error
    );
};//}}}

exports.setBankAccount = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var bank_name = req.param( "bank_name" , "" );
    var account_name = req.param( "account_name" , "" );
    var account_No = req.param( "account_No" , "" );

    var ok = function( dataObj ) {
        res.json( [ "ok" ] );
    };

    helper.req2hb123( 
        "post" ,
        "about=user&action=update_bank_account_info&user_id=" + userId +
            "&bank_name=" + bank_name + 
            "&account_No=" + account_No + 
            "&account_name=" + account_name ,

        ok
    );
};//}}}

exports.withdrawCash = function( req , res ){
//{{{
    var userId = req.param( "user_id" , "" );
    var amount = req.param( "amount" , 0 );

    var ok = function() {
        res.json( [ "ok" ] );
    }

    helper.req2hb123( 
        "post" ,
        "about=user&action=withdraw_cash&user_id=" + userId +
            "&amount=" + amount ,

        ok
    );
};//}}}

