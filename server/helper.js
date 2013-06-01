var request = require( "superagent" );

var req2hb123 = function( method , param , ok , error ) {
    //@todo 多余的问号也会导致错误
    var HB123_SERVER = "http://172.17.0.20:1979/Mobile/Api.aspx?";
    request[method](
        HB123_SERVER + param,
        function( data ) {
            console.log( "request url:" + HB123_SERVER + param );
            try {
                //判断是否为非法的 json 串
                var dataObj = JSON.parse( data.text );
                if( dataObj.code === "200" ) {
                    ok( dataObj );
                } else {
                    console.log( "request error, res code is not 200." );
                    typeof error === "function" && error( data.text );
                }
            } catch ( e ) {
                console.log( "request huaban123.com api error." );
                console.dir( e );
                typeof error === "function" && error( data.text );
            }
        }
    );
}

exports.req2hb123 = req2hb123;

