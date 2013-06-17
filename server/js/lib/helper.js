var request = require( "superagent" )
    , thirdPartServer = require( "../config/third_part_server" )
    , needle = require( "needle" );

var req2hb123 = function( method , param , ok , error ) {
    //console.log( "request url:" + thirdPartServer.hb123Server + param );
    //@todo 多余的问号也会导致错误
    request[method](
        thirdPartServer.hb123Server + param ,
        function( data ) {
            try {
                //判断是否为非法的 json 串
                var dataObj = JSON.parse( data.text );
                //console.dir( data.text )
                if( dataObj.code === "200" ) {
                    ok( dataObj );
                } else {
                    console.log( "res code is not 200." );
                    typeof ok === "function" && error( data.text );
                }
            } catch ( e ) {
                console.log( "request huaban123.com api error." );
                console.dir( e );
                typeof error === "function" && error( data.text );
            }
        }
    );
}

//upload file
var uploadFile2hb123 = function( data ) {
    needle.post(
            thirdPartServer.hb123Server + "about=picture&action=upload" ,
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
};

var addExtraUserProp = function( userInfo ) {
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
}

exports.req2hb123 = req2hb123;
exports.uploadFile2hb123 = uploadFile2hb123;
exports.addExtraUserProp = addExtraUserProp;

