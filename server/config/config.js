var path = require( "path" )
    , rootPath = path.normalize( __dirname + "/.." );

module.exports = {
    dev: {
        rootPath: rootPath ,
        redisServer: "192.168.1.109" ,
        mongodServer: "mongodb://172.17.0.46/petal" ,
        wxRedisServer: "192.168.1.109" ,
        hb123Server: "http://127.0.0.1:1979/Mobile/Api.aspx?" ,
        port: 8800
    },
    production: {
        rootPath: rootPath ,
        redisServer: "127.0.0.1" ,
        mongodServer: "127.0.0.1" ,
        wxRedisServer: "127.0.0.1" ,
        hb123Server: "http://huaban123.com/Mobile/Api.aspx?" ,
        port: 8800
    }
}
