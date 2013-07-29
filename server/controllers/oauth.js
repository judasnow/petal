var crypto = require( "crypto" )
    , _ = require( "underscore" )
    , fs = require( "fs" ) 
    , needle = require( "needle" )
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

    var authUrl = "https://api.weibo.com/oauth2/authorize?client_id=" + oauthConfig.appkey 
        + "&response_type=code&redirect_uri=" + oauthConfig.redirect_uri;

    res.redirect( authUrl );
};

//用户授权之后的回调
oauth.redirect = function( req , res ) {
    var code = req.param( "code" , "" );
    var type = this.type = req.param( "type" , "" );
    if( type === "" || typeof config.oauth[type] === "undefinded" ) {
        throw new Error( "type is empty or config is not set." );
    }
    console.log( "authorize ok" );
    var oauthConfig = config.oauth["weibo"];

    //如果 code 没有设置 则视为用户拒绝授权 否则请求指定的 url
    //获取 token
    var tokenUrl = "https://api.weibo.com/oauth2/access_token";

    needle.post(
        tokenUrl , 
        {
            client_id: oauthConfig.appkey ,
            client_secret: oauthConfig.appsecret ,
            grant_type: "authorization_code" ,
            redirect_uri: oauthConfig.redirect_uri ,
            code: code
        } ,
        function( err , postRes , body ) {
            if( err !== null ) {
                throw new Error( "fetch token err" );
            }
            var postResObj  = JSON.parse( body );
            var userId = postResObj.uid;
            var accessToken = postResObj.access_token;
            needle.get(
                "https://api.weibo.com/2/users/show.json?access_token=" + accessToken + "&uid=" + userId , 
                function( err , getRes , body ) {
                    console.dir( body );
                }
            );
        }
    );
};

return oauth;

}
