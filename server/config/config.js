var path = require( "path" )
    , rootPath = path.normalize( __dirname + "/.." );

module.exports = {
    dev: {
        rootPath: rootPath ,
        qiniuACCESS_KEY: "TE_-Yqi7633MjIo3haNx4uF-WJaLqatk1SjduHcY" ,
        qiniuSECRET_KEY: "tygGSrdMLIpgTie26eqYH41aKd9Rd3S6CRac92Uz" ,
        redisServer: { 
            address: "172.17.0.46" ,
            port: "6379"
        } ,
        mongodServer: "mongodb://172.17.0.46/petal" ,
        wxRedisServer: {
            address: "172.17.0.46" ,
            port: "6380"
        } ,
        hb123Server: "http://172.17.0.20:1979/Mobile/Api.aspx?" ,
        hb123WxServer: "http://172.17.0.20:1979/action/weixinmpapi.aspx?" ,
        appPort: 8800 ,
        alipay: {
            //合作身份者id，以2088开头的16位纯数字
            partner: "2088302808428418", 
            //安全检验码，以数字和字母组成的32位字符
            key: "luzyp6klpga6yijpyt8aq2pnhwnupc42",
            //卖家支付宝帐户 必填
            seller_email: "huaban1989@163.com" ,
            host: "http://172.17.0.46/",
            //ca证书路径地址，用于curl中ssl校验 
            cacert: rootPath + "/config/cacert.pem",
            //访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
            transport: "https" ,
            //字符编码格式 目前支持 gbk 或 utf-8
            input_charset: "utf-8" ,
            trade_create_by_buyer_notify_url: "/alipay/notify_url" ,
            trade_create_by_buyer_return_url: "/alipay/return_url" 
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
        appPort: 8800
    }
}
