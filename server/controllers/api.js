var crypto = require( "crypto" )
    , _ = require( "underscore" )
    , fs = require( "fs" ) 
    , needle = require( "needle" )
    , redis = require( "redis" );

module.exports = function( config ) {

var helper = require( "../lib/helper" )( config )
    , api = {};

//user
api.doLogin = function( req , res ) {
//{{{
    var username = req.param( "username" , "" );
    var password = req.param( "password" , "" );

    var ok = function( dataObj ) {
        var userInfoObj = JSON.parse( dataObj.user_info );
        //req.session.object_user_id = userInfoObj.UserId;

        res.json(
            {
                result: "ok", 
                user_info: helper.formatUserInfo( userInfoObj )
            }
        );
    };

    var error = function() {
        res.json( {result: "fail"} );
    };

    helper.req2hb123( 
        "post" ,
         "about=user&action=login&username=" + 
            username + "&password=" + 
            crypto.createHash( "md5" ).update( password ).digest( "hex" ) ,

        ok ,
        error
    );
};//}}}

//获取多用户信息
api.getUserList = function( req , res ) {
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
        had_bought_contact_info: "about=user&action=had_bought_contact_info_list&p=" + page + "&user_id=" + object_user_id 
    }

    var ok = function( dataObj ) {
        try {
            var userList = JSON.parse( dataObj.user_list );
            userList = _.map(
                userList ,
                function( user ) {
                    return helper.formatUserInfo( user , what );
                }
            );
        } catch ( err ) {
            console.log( "fetch user list with what:" + what + " error" );
            console.log( err.stack );
            userList = [];
        } finally {
            res.json( userList );
        }
    };

    helper.req2hb123( "get" , what2url[what] , ok );
};
//}}}

//获取单条用户信息
api.getUser = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , null );

    var ok = function( dataObj ) {
        //发送来的 json 是一个数组 现在需要合并之 (到 userInfo 中)
        try {
            var userInfoObj = JSON.parse( dataObj.user_info );

            //为了统一处理需要设置 what
            userInfoObj = helper.formatUserInfo( userInfoObj , "detail" );

            userInfoObj.visitorsList = JSON.parse( dataObj.visitors_list );
            userInfoObj.wantedGiftList = JSON.parse( dataObj.wanted_gift_list );
            userInfoObj.pictureList = JSON.parse( dataObj.picture_list );
            userInfoObj.receivedGiftList = JSON.parse( dataObj.received_gift_list );

        } catch( err ) {
            console.log( "fetch user info with user_id:" + userId + " error" );
            userInfoObj = [];
        } finally {
            res.json( userInfoObj );
        }
    };
    helper.req2hb123( "get" , "about=user&action=get_info&user_id=" + userId , ok );
};//}}}

api.uploadFiles = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var uploadFile = req.files.user_upload_picture;

    //@todo 设置 roopath
    var fileNewPath = __dirname + "/../uploads/" + uploadFile.name;
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
            needle.post( 
                config.hb123WxServer + "action=uploadImg" , 
                data ,
                {
                    multipart: true 
                },
                function( err , result , body ) {
                    var bodyObj = JSON.parse( body );
                    if( bodyObj.type === "success"  ) {
                        res.json(["ok"]);
                        console.log( "upload img ok" );
                    } else {
                        console.log( "upload img error" + body );
                    }
                }
            ); 
        }
    );
};//}}}

api.updateUser = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var area_id = req.param( "area_id" , "" );
    var nickName = req.param( "nickname" , "" );
    var birthday = req.param( "birthday" , "" );
    var zwms = req.param( "zwms" , "" );
    var looks = req.param( "looks" , "" );
    var want = req.param( "want" , "" );
    var offer = req.param( "offer" , "" );
    var sex = req.param( "sex" , "" );
    var height = req.param( "height" , "" );
    var weight = req.param( "weight" , "" );
    var marutal_status = req.param( "marital_status" , "123" );
    var age = req.param( "age" , "" );
    var career = req.param( "career" , "" );
    var purpose = req.param( "purpose" , "" );
    var character = req.param( "character" , "" );
    var sexIdea = req.param( "sex_idea" , "" );
    var interest = req.param( "interest" , "" );

    //保存其他信息
    var ok = function( dataObj ) {
        if( dataObj.code === "200" ) {
            res.json( {result: "ok"} );
        }
    };

    var error = function( dataObj ) {
        res.json( {result: "fail"} );
    };

    helper.req2hb123(
        "post" , 
        "about=user&action=update_info&user_id=" + userId + 
        "&birthday=" + birthday + 
        "&nickname=" + nickName +
        "&zwms=" + zwms + 
        "&looks=" + looks +
        "&area_id=" + area_id +
        "&age=" + age + 
        "&height=" + height +
        "&weight=" + weight +
        "&marutal_status=" + marutal_status.trim() +
        "&offer=" + offer.trim() +
        "&career=" + career.trim() +
        "&sex=" + sex.trim() + 
        "&character=" + character.trim() +
        "&purpose=" + purpose.trim() +
        "&sex_idea=" + sexIdea.trim() +
        "&interest=" + interest.trim() +
        "&want=" + want.trim() ,

        ok ,
        error
    );
};//}}}

//@todo should be put, but I hava not enought time .... so sad I am.
api.tweetIt = function( req , res ) {
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

api.shouldDisplayContactInfo = function( req , res ) {
//{{{
    var objUserId = req.param( "object_user_id" );
    var subUserId = req.param( "subject_user_id" );

    var ok = function( dataObj ) {
        res.json( dataObj );
    };

    helper.req2hb123( 
        "get" , 
        "about=user&action=should_display_contact_info" + 
        "&object_user_id=" + objUserId + 
        "&subject_user_id=" + subUserId ,

        ok
    );
};//}}}

api.updateBrowerStatus = function( req , res ) {
//{{{
    var objUserId = req.param( "object_user_id" );
    var subUserId = req.param( "subject_user_id" );

    var ok = function( dataObj ) {
        res.json( dataObj );
    };
    helper.req2hb123( 
            "get" , 
            "about=user&action=update_brower_status" + 
            "&object_user_id=" + objUserId + 
            "&subject_user_id=" + subUserId ,

            ok
        );
};//}}}

//gift
//获取礼物列表
api.getGiftList = function( req , res ) {
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
api.sendGift = function( req , res ) {
//{{{
    var giftId = req.param( "gift_id" , "" );
    var targetUserId = req.param( "target_user_id" , "" );
    var fromUserId = req.param( "from_user_id" , "" );

    var ok = function( dataObj ) {
        if( dataObj.code === "200" ) {
            res.json({
                result: "ok"
            });
        } else {
            res.json({
                result: "fail",
                msg: dataObj.msg
            });
        }
    };
    var error = function( dataObj ) {
        res.json({
            result: "fail"
        });
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
api.getPaymentRecordList = function( req , res ) {
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
api.getExistTalkBetweetTwoUsers = function( req , res ) {
//{{{

    var objectUserId = req.param( "object_user_id" , "" );
    var subjectUserId = req.param( "subject_user_id" , "" );

    var ok = function( dataObj ) {
        if( dataObj.code === "200" ) {
            res.json({ result: "ok" , root_msg_id: dataObj.root_msg_id });
        } else {
            res.json({ result: "fail" , root_msg_id: 0 });
        }
    }

    helper.req2hb123( 
        "get" ,
        "about=msg&action=get_exist_talk_between_two_users&object_user_id=" + objectUserId + "&subject_user_id=" + subjectUserId , 

        ok
    );
};//}}}

api.getMsgList = function( req , res ) {
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

api.getMsgListByGroup = function( req , res ) {
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

api.sendMsg = function( req , res ) {
//{{{
    var msgObj = {};
    msgObj.rootMsgId = req.param( "root_msg_id" , 0 );
    msgObj.content = req.param( "content" , "" );
    msgObj.objectUserId = req.param( "object_user_id" , "" );
    msgObj.targetUserId = req.param( "target_user_id" , "" );

    var ok = function( dataObj ) {
        res.json( {result: "ok" , need_pay: dataObj.need_pay} );
    };

    var error = function( dataObj ) {
        res.json({result: "fail"});
    };

    helper.req2hb123( 
        "post" ,
        "about=msg&action=send&title=&content=" + msgObj.content +
            "&root_msg_id=" + msgObj.rootMsgId +
            "&object_user_id=" + msgObj.objectUserId +
            "&target_user_id=" + msgObj.targetUserId ,

        ok , 
        error
    );
};//}}}

api.setBankAccount = function( req , res ) {
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

//提现
api.withdrawCash = function( req , res ){
//{{{
    var userId = req.param( "user_id" , "" );
    var amount = req.param( "amount" , 0 );

    var ok = function( dataObj ) {
        if( dataObj.code === "200" ) {
            res.json({result: "ok"});
        }
    }

    var fail = function( dataObj ) {
        var fail_msg = "提现失败请稍后再试";
        console.dir( dataObj.origin_msg );
        if( typeof dataObj.origin_msg !== "undefined" && dataObj.origin_msg !== null ) {
            fail_msg = dataObj.origin_msg;
        }
        res.json( {result: "fail", "msg": fail_msg} );
    }

    helper.req2hb123( 
        "post" ,
        "about=user&action=withdraw_cash&user_id=" + userId +
            "&amount=" + amount ,

        ok,
        fail
    );
};//}}}

//status 
api.getNewMsgs = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var lastUpdateTime = req.param( "last_update_time" , "" );

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.msg_list ) );
    }

    helper.req2hb123(
        "get" ,
        "about=msg&action=get_latest_msg_list&p=1&begin_time=" + lastUpdateTime 
            + "&user_id=" + userId ,

        ok
    );
}//}}}

api.getNewGifts = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var lastUpdateTime = req.param( "last_update_time" , "" );

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.gift_list ) );
    }

    helper.req2hb123(
        "get" ,
        "about=gift&action=new_send_gift_list&p=1&begin_time=" + lastUpdateTime 
            + "&user_id=" + userId ,

        ok
    );
}//}}}

api.getNewVisitors = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var lastUpdateTime = req.param( "last_update_time" , "" );

    var ok = function( dataObj ) {
        res.json( JSON.parse( dataObj.user_list ) );
    }

    helper.req2hb123(
        "get" ,
        "about=user&action=new_visitors_list&p=1&begin_time=" + lastUpdateTime 
            + "&user_id=" + userId ,

        ok
    );
}//}}}

//检查  email 是否可用
//检查 nickname 是否可用

api.reg = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var username = req.param( "username" , "" );
    var nickname = req.param( "nickname" , "" );
    var password = req.param( "password" , "" );

    var ok = function( dataObj ) {
        if( dataObj.code === "200" ) {
            res.json( {user_id: dataObj.user_id } );
        }
    };

    helper.req2hb123(
        "post" ,
        "about=user&action=reg&username=" + username +
            "&nickname=" + nickname +
            "&password=" + password +
            "&user_id=" + userId ,

        ok
    );
};//}}}

return api;

}
