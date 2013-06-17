var path = require( "path" )
    , rootPath = path.normalize( __dirname + "/.." );

module.exports = {
    dev: {
        rootPath: rootPath ,
        redisServer: "172.17.0.46" ,
        hb123Server: "http://172.17.0.32:1979/Mobile/Api.aspx?" ,
        port: 8800
    },
    production: {
        rootPath: rootPath ,
        redisServer: "127.0.0.1" ,
        hb123Server: "http://huaban123.com/Mobile/Api.aspx?" ,
        port: 8800
    }
}
