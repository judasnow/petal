//测试 huaban123.com 提供的各种 api 以及
//用户访问api的函数
var assert = require( "assert" );
var request = require( "superagent" );
var req_to_hb123 = require( "../server/helper" ).req_to_hb123;

describe( "API" , function(){
    describe( "?about=user&action=search" , function(){
        it( "返回非空列表时", function( done ){
        //{{{
            var p = 1;
            var q = JSON.stringify({
                location: "成都"
            });
            req_to_hb123( "get" , "about=user&action=search&p=" + p + "&q=" + q , function( dataObj ) {
                done();
            },
            function() {
                console.log( "request api error" );
                done();
            });
        });//}}}

        it( "查询不存在的地方", function( done ) {
        //{{{
            var p = 1;
            var q = JSON.stringify({
                location: "那美克星"
            });
            req_to_hb123( "get" , "about=user&action=search&p=" + p + "&q=" + q , 
                function( dataObj ) {
                    console.dir( dataObj )
                    done();
                },
                function( dataText ) {
                    console.dir( typeof dataText );
                    console.log( "request api error" );
                    done();
                }
            );
        });//}}}

        it( "地址完全的情况(省+市)", function( done ) {
        //{{{
            var p = 1;
            var q = JSON.stringify({
                location: "四川-成都"
            });
            req_to_hb123( "get" , "about=user&action=search&p=" + p + "&q=" + q , 
                function( dataObj ) {
                    done();
                },
                function( dataText ) {
                    console.dir( typeof dataText );
                    console.log( "request api error" );
                    done();
                }
            );
        });//}}}

        //it( "昵称搜索", function( done ) {
        ////{{{
        //    var p = 1;
        //    var q = JSON.stringify({
        //        "nickName": "uutest"
        //    });
        //    req_to_hb123( "get" , "about=user&action=search&p=" + p + "&q=" + q , 
        //        function( dataObj ) {
        //            done();
        //        },
        //        function( dataText ) {
        //            console.dir( typeof dataText );
        //            console.log( "request api error" );
        //            done();
        //        }
        //    );
        //});//}}}
    });
    describe( "?about=user&action=should_display_contact_info" , function() {
        //查看用户线上的联系方式
        it( "线上联系方式", function( done ) {
        //{{{
            var type = "online";
            var objUserId = 2303;
            var subUserId = 1; 
            req_to_hb123( "get" , "about=user&action=should_display_contact_info&type=" + type + "&object_user_id=" + objUserId + "&subject_user_id=" + subUserId, 
                function( dataObj ) {
                    console.dir( dataObj )
                    done();
                },
                function( dataText ) {
                    console.log( "request api error" );
                    done();
                }
            );
        });//}}}
    });
})

