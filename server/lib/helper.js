var request = require( "superagent" )
    , needle = require( "needle" )
    , config = require( "../config/config" )["dev"]
    , _ = require( "underscore" );

//param 不能以 ? 开头 因为 hb123Server 已经设置了 ? 了 多余的 ? 会导致错误
//为了减少性能损失似乎就没有检测的必要了
var req2hb123 = function( method , param , ok , error ) {
//{{{
    if( _.indexOf( ["post" , "get"] , method ) === -1 ) {
        throw new Error( "The value of mathod must be GET or POST , but " + method + " was given." );
    }
    //尝试替换 param 开头的 ?
    param = param.replace( /\?/ , "" );
    console.log( "request url:" + config.hb123Server + param );

    request[method](
        config.hb123Server + param ,
        function( data ) {
            try {
                //判断是否为非法的 json 串
                var dataObj = JSON.parse( data.text );

                //注意此时的 json 并不能实现递归的解析
                if( dataObj.code === "200" ) {
                    ok( dataObj );
                } else {
                    console.log( "res code is " + dataObj.code + " not 200." );
                    typeof error === "function" && error( data.text );
                }
            } catch ( e ) {
                console.log( 
                    "request huaban123.com api error. request url:" + config.hb123Server + param 
                    + " res.text: " + data.text
                );
                console.dir( e );
                typeof error === "function" && error( data.text );
            }
        }
    );
};//}}}

//upload file
var uploadFile2hb123 = function( data ) {
//{{{
    needle.post(
            config.hb123Server + "about=picture&action=upload" ,
            data ,
            {
                multipart: true
            },
            function( error , resp , body ) {
                if( JSON.parse( body ).code === "200" ) {
                    res.json( ["ok"] );
                } else {
                    res.json( ["fail"] );
                }
            }
    );
};//}}}

var addExtraUserProp = function( userInfo ) {
//{{{
    var birthday = new Date( userInfo.CSRQ );
    var today = new Date();
    userInfo.age = today.getYear() - birthday.getYear();

    userInfo.isFemale = ( userInfo.Sex === "女" ? true : false );

    var areaDes = userInfo.AreaDes;
    if( typeof areaDes !== "undefined" && areaDes !== null ) {
        userInfo.location = (function( areaDesArray ) {
            return areaDesArray[0] + " " + areaDesArray[1];
        })( areaDes.replace( /\-/g , "," ).split( "," ) );
    }

    return userInfo;
}//}}}

//格式化由服务器传递过来的多样的用户信息
var formatUserInfo = function( rawUserInfo ) {
//{{{
    if( typeof rawUserInfo.BUserId !== "undefined" ) {
        //访问过得人 BUserId 
        //{{{
        //"UserId":2312,
        //"NickName":"ppppp",
        //"HeadPic":"",
        //"Sex":null,
        //"CSRQ":"",
        //"AreaDes":"",
        //"PSLevelFlag":"201005181658407812.gif",
        //"PSLevelName":"一级",
        //"VCLevelFlag":"201302050332283281.gif",
        //"VCLevelName":"1 级",
        //"MD":"",
        //"ZWJS":"",
        //"BUserId":2303,
        //"BrowseAt":"2013-06-22T15:24:11"
        //}}}
        delete rawUserInfo.BUserId;
    }
    if( typeof rawUserInfo.SUid !== "undefined" ) {
        //已经购买了联系方式的人SUid 
        //{{{
        //"BUid":2303,
        //"SUid":2311,
        //"SNickName":"aaa",
        //"SHeadPic":"201306/162210148770.png",
        //"SSex":"女",
        //"SCSRQ":"1988-1-1",
        //"SAreaDes":"北京,海淀",
        //"SMD":"异性朋友 基本纯友谊 精神恋人",
        //"SZWJS":"",
        //"IsXS":true,
        //"SQQ":"123123",
        //"SMSN":"3123123",
        //"IsXX":true,
        //"SPhone":"",
        //"SEmail":"2@123.com",
        //"CreateAt":"2013-06-22T14:48:43.747",
        //"ToSay":"请问儿请问儿"
        //}}}
        delete rawUserInfo.BUid;
        for( key in rawUserInfo ) {
            //已经查看联系方式的用户信息 
            //@todo 啊以尝试从缓存中获取一部分信息
            if( key.match( /^S/ ) ) {
                rawUserInfo[key.replace( /^S/ , "" )] = rawUserInfo[key];
                delete rawUserInfo[key];
            }
        }
        //已经查看联系方式的用户信息 中没有 UserId
        rawUserInfo["UserId"] = rawUserInfo.Uid;
        delete rawUserInfo.Uid;
    }
    //统一到 Sex 
    if( typeof rawUserInfo.UserSex !== "undefined" ) {
        rawUserInfo["Sex"] = rawUserInfo.UserSex;
        delete rawUserInfo.UserSex;
    }
    if( rawUserInfo["UserClass"] === 1 ) {
        rawUserInfo["isVip"] = true;
    }
    
    rawUserInfo["sex_in_english"] = rawUserInfo["Sex"] === "男" ? "male" : "female";

    return addExtraUserProp( rawUserInfo );
}//}}}

exports.req2hb123 = req2hb123;
exports.uploadFile2hb123 = uploadFile2hb123;
exports.addExtraUserProp = addExtraUserProp;
exports.formatUserInfo = formatUserInfo;

