var request = require( "superagent" )
    , needle = require( "needle" )
    , _ = require( "underscore" );

module.exports = function( config ) {

var helper = {};

//param 不能以 ? 开头 因为 hb123Server 已经设置了 ? 了 多余的 ? 会导致错误
//为了减少性能损失似乎就没有检测的必要了
helper.req2hb123 = function( method , param , ok , error ) {
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
                    typeof error === "function" && error( dataObj );
                }
            } catch ( err ) {
                console.log( 
                    "request huaban123.com api error. request url:" + config.hb123Server + param 
                    + " res.text: " + data.text
                );
                console.dir( err.stack );

                //这里可能出现无法解析json的情况
                typeof error === "function" && error( data.text );
            }
        }
    );
};//}}}

//upload file
helper.uploadFile2hb123 = function( data ) {
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

var addExtraUserProp = function( rawUserInfoObj ) {
//{{{
    var birthday = new Date( rawUserInfoObj.CSRQ );
    var today = new Date();
    rawUserInfoObj.age = today.getYear() - birthday.getYear();

    //两者都是有必要的
    rawUserInfoObj["sexInEnglish"] = rawUserInfoObj["Sex"] === "男" ? "male" : "female";
    rawUserInfoObj.isFemale = ( rawUserInfoObj.sexInEnglish === "female" ? true : false );

    var areaDes = rawUserInfoObj.AreaDes;
    if( typeof areaDes !== "undefined" && areaDes !== null ) {
        rawUserInfoObj.location = (function( areaDesArray ) {
            return areaDesArray[0] + " " + areaDesArray[1];
        })( areaDes.replace( /\-/g , "," ).split( "," ) );
    }

    return rawUserInfoObj;
}//}}}

//格式化由服务器传递过来的多样的用户信息
helper.formatUserInfo = function( rawUserInfoObj , what ) {
//{{{
    if( typeof what === "undefined" ) {
        what = "normal";
    }

    rawUserInfoObj["type"] = what;

    if( what === "search" ) {
        //普通的查询结果
    }

    //最近访问过自己的
    if( what === "visitors" ) {
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
        delete rawUserInfoObj.BUserId;
    }//}}}

    //购买过联系方式的
    //{{{
    if( what === "had_bought_contact_info" ) {
        //已经购买了联系方式的人SUid 
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
        delete rawUserInfoObj.BUid;
        for( key in rawUserInfoObj ) {
            //已经查看联系方式的用户信息 
            //@todo 啊以尝试从缓存中获取一部分信息
            if( key.match( /^S/ ) ) {
                rawUserInfoObj[key.replace( /^S/ , "" )] = rawUserInfoObj[key];
                delete rawUserInfoObj[key];
            }
        }
        //已经查看联系方式的用户信息 中没有 UserId
        rawUserInfoObj["UserId"] = rawUserInfoObj.Uid;
        delete rawUserInfoObj.Uid;
    }//}}}

    //统一到 Sex 
    if( typeof rawUserInfoObj.UserSex !== "undefined" ) {
        rawUserInfoObj["Sex"] = rawUserInfoObj.UserSex;
        delete rawUserInfoObj.UserSex;
    }

    if( rawUserInfoObj["UserClass"] === 1 ) {
        rawUserInfoObj["isVip"] = true;
    }

    return addExtraUserProp( rawUserInfoObj );
}//}}}

return helper;

}
