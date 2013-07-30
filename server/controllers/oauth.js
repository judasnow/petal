var crypto = require( "crypto" )
    , _ = require( "underscore" )
    , fs = require( "fs" ) 
    , needle = require( "needle" )
    , querystring = require( "querystring" )
    , redis = require( "redis" );

module.exports = function( config ) {
var helper = require( "../lib/helper" )( config )
    , oauth = {};

//生成请求授权的 url 并跳转之
oauth.authorize = function( req , res ) {
    //根据不同的应用调用不同的 url
    //指明了具体的接入网站
    var type = this.type = req.param( "type" , "" );
    if( type === "" || typeof config.oauth[type] === "undefinded" ) {
        throw new Error( "type is empty or config is not set." );
    }
    var oauthConfig = config.oauth[type];

    var authUrl = oauthConfig.authUrl + "client_id=" + oauthConfig.appkey 
        + "&response_type=code&redirect_uri=" + encodeURIComponent( oauthConfig.redirect_uri );

    if( type === "qq" ) {
        authUrl = authUrl + "&state=test";
    }

    res.redirect( authUrl );
};

//用户授权之后的回调 
//目的就是获取当前授权用户的信息 之后跳转到 reg 页面
//@TODO 如果关联之后 也要做相应的处理
oauth.redirect = function( req , res ) {
    var code = req.param( "code" , "" );
    var type = this.type = req.param( "type" , "" );
    if( type === "" || typeof config.oauth[type] === "undefinded" ) {
        throw new Error( "type is empty or config is not set." );
    }
    var oauthConfig = config.oauth[type];

    console.log( "authorize ok" );

    //如果 code 没有设置 则视为用户拒绝授权 否则请求指定的 url
    //获取 token
    needle.post(
        oauthConfig.tokenUrl , 
        {
            client_id: oauthConfig.appkey ,
            client_secret: oauthConfig.appsecret ,
            grant_type: "authorization_code" ,
            redirect_uri: oauthConfig.redirect_uri ,
            code: code
        } ,

        function( err , postRes , body ) {
            //@XXX renren 成功返回时 err 也不是 null needle 的一个 bug?
            //应该是 renren 的返回信息中 avata 中有 object 信息
            if( err !== null && type !== "renren" ) {
                throw new Error( "fetch openid error" );
            }

            //如果是 qq 则会多出获取 openid 的一步
            if( type === "qq" ) {
                var postResObj = querystring.parse( body );
                var accessToken = postResObj.access_token;

                needle.get(
                    //@XXX 这里使用 wap 版的 url 要方便一些 直接返回的是一个 querystring
                    //而 pc 版的 url 返回的是一个奇葩的回调函数
                    "https://graph.z.qq.com/moc2/me?access_token=" + accessToken ,
                    function( err , getRes , body ) {
                        if( err !== null ) {
                            throw new Error( "fetch openid error" );
                        }
                        var getResObj = querystring.parse( body );
                        var openid = getResObj.openid;

                        //@TODO 判断是否成功 获取用户信息
                        needle.get(
                            oauthConfig.userInfoUrl + "access_token=" 
                                + accessToken + "&openid=" + openid 
                                + "&appid=" + oauthConfig.appkey ,

                            function( err , getRes , body ) {
                                if( err !== null ) {
                                    throw new Error( "fetch user_info error" );
                                }
                                var userInfo = JSON.parse( body );
                            }
                        )
                    }
                );
            }

            if( type === "weibo" ) {
                var postResObj = JSON.parse( body );
                var accessToken = postResObj.access_token;
                var userId = postResObj.uid;
                needle.get(
                    oauthConfig.userInfoUrl + "access_token=" + accessToken + "&uid=" + userId , 
                    function( err , getRes , body ) {
                       console.dir( body );
                    }
                );
            }

            if( type === "renren" ) {
                var postResObj = JSON.parse( body );
                console.dir( postResObj )
            }

        }
    );
};

return oauth;

}
