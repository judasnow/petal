var path = require( "path" )
    , rootPath = path.normalize( __dirname + "/.." );

module.exports = {
    development: {
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
        appPort: 8800
    },
    production: {
        rootPath: rootPath ,
        redisServer: { 
            address: "127.0.0.1" , 
            port: "6380" 
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
