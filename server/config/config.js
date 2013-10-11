var path = require( "path" )
    , rootPath = path.normalize( __dirname + "/.." );

module.exports = {
    dev: {
        rootPath: rootPath ,
        qiniuACCESS_KEY: "TE_-Yqi7633MjIo3haNx4uF-WJaLqatk1SjduHcY" ,
        qiniuSECRET_KEY: "tygGSrdMLIpgTie26eqYH41aKd9Rd3S6CRac92Uz" ,
        redisServer: { 
            address: "172.17.0.202" ,
            port: "6379"
        } ,
        mongodServer: "mongodb://172.17.0.202/petal" ,
        wxRedisServer: {
            address: "172.17.0.202" ,
            port: "6380"
        } ,
        hb123Server: "http://172.17.0.232:1979/Mobile/Api.aspx?" ,
        hb123WxServer: "http://172.17.0.232:1979/action/weixinmpapi.aspx?" ,
        appPort: 8800 ,
        alipay: {
            //合作身份者id，以2088开头的16位纯数字
            partner: "2088302808428418", 
            //安全检验码，以数字和字母组成的32位字符
            key: "luzyp6klpga6yijpyt8aq2pnhwnupc42",
            //卖家支付宝帐户 必填
            seller_email: "huaban1989@163.com" ,
            host: "http://221.10.10.2",
            //ca证书路径地址，用于curl中ssl校验 
            cacert: rootPath + "/config/cacert.pem",
            //访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
            transport: "https" ,
            //字符编码格式 目前支持 gbk 或 utf-8
            input_charset: "utf-8" ,
            trade_create_by_buyer_notify_url: "/alipay/notify_url" ,
            trade_create_by_buyer_return_url: "/alipay/return_url" 
        },
        oauth: {
            weibo: {
                appkey: "3460536411" ,
                appsecret: "f1652f2aec69d0258372c3e019900a4e" ,
                authUrl: "https://api.weibo.com/oauth2/authorize?display=mobile&" ,
                tokenUrl: "https://api.weibo.com/oauth2/access_token" ,
                userInfoUrl: "https://api.weibo.com/2/users/show.json?" ,
                //最后一个 segment 会被解释为 type 也就是接入网站的种类
                redirect_uri: "http://798bin.tk/oauth/redirect/weibo/"
            },
            qq: {
                appkey: "100491089" ,
                appsecret: "24e2264ef3ab63c03921fcf2d9277f95" ,
                authUrl: "https://graph.qq.com/oauth2.0/authorize?display=mobile&" ,
                tokenUrl: "https://graph.qq.com/oauth2.0/token" ,
                //参数 oauth_consumer_key(appid) & access_token & openid || format
                userInfoUrl: "https://graph.qq.com/user/get_user_info?" ,
                redirect_uri: "http://798bin.tk/oauth/redirect/qq/"
            },
            renren: {
                appkey: "16fde6784b214a54b674d3c73bf925b2" ,
                appsecret: "80bff71f6a3d40e09e08f2d2647d0fcd" ,
                authUrl: "https://graph.renren.com/oauth/authorize?display=mobile&" ,
                tokenUrl: "https://graph.renren.com/oauth/token?" ,
                //参数为 access_token & userId 
                userInfoUrl: "https://api.renren.com/v2/user/get?" ,
                //最后一个 segment 会被解释为 type 也就是接入网站的种类
                redirect_uri: "http://798bin.tk/oauth/redirect/renren/"
            }

        }
    },
    prod: {
        rootPath: rootPath ,
        redisServer: {
            address: "127.0.0.1" , 
            port: "6379"
        } ,
        mongodServer: "mongodb://127.0.0.1/petal" ,
        qiniuACCESS_KEY: "TE_-Yqi7633MjIo3haNx4uF-WJaLqatk1SjduHcY" ,
        qiniuSECRET_KEY: "tygGSrdMLIpgTie26eqYH41aKd9Rd3S6CRac92Uz" ,
        wxRedisServer: {
            address: "127.0.0.1" ,
            port: "6379"
        } ,
        hb123Server: "http://test.huaban123.com/Mobile/Api.aspx?" ,
        hb123WxServer: "http://www.huaban123.com/action/weixinmpapi.aspx?" ,
        appPort: 8800 ,
                alipay: {
            //合作身份者id，以2088开头的16位纯数字
            partner: "2088302808428418", 
            //安全检验码，以数字和字母组成的32位字符
            key: "luzyp6klpga6yijpyt8aq2pnhwnupc42",
            //卖家支付宝帐户 必填
            seller_email: "huaban1989@163.com" ,
            host: "http://m.huaban123.com",
            //ca证书路径地址，用于curl中ssl校验 
            cacert: rootPath + "/config/cacert.pem",
            //访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
            transport: "https" ,
            //字符编码格式 目前支持 gbk 或 utf-8
            input_charset: "utf-8" ,
            trade_create_by_buyer_notify_url: "/alipay/notify_url" ,
            trade_create_by_buyer_return_url: "/alipay/return_url" 
        }
    }
}
