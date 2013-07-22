//测试 huaban123.com 提供的各种 api
var assert = require( "assert" )
    , req2hb123 = require( "../lib/helper" ).req2hb123
    , crypto = require( "crypto" );

describe( "about=user" , function(){
    describe( "action=search" , function(){
        it( "返回非空列表时", function( done ){
        //{{{
            var p = 1;
            var q = JSON.stringify({
                location: "成都"
            });

            req2hb123( 
                "get" ,
                "about=user&action=search&p=" + p + "&q=" + q , 

                function( dataObj ) {
                    assert.equal( "200" , dataObj.code );
                    assert.ok( 
                        JSON.parse( dataObj.user_list ).length > 0 , 
                        "查询结果应该大于0(当然这建立在数据库中存在相应记录的情况)" 
                    );
                    done();
                }
            );
        });//}}}

        it.skip( "使用非 POST or GET 方法时(断言抛出异常)", function( done ){
        //{{{
            var p = 1;
            var q = JSON.stringify({
                location: "成都"
            });
            assert.throws(
                req2hb123(
                    //使用 put 方法断言报错
                    "put" , 
                    "about=user&action=search&p=" + p + "&q=" + q
                )
            );
        });//}}}

        it.skip( "param 值以 ? 开头的情况下(断言自动删除先导的 ?)", function( done ){
        //{{{
            var p = 1;
            var q = JSON.stringify({
                location: "成都"
            });
            req2hb123( 
                "get" ,
                "?about=user&action=search&p=" + p + "&q=" + q , 

                function( dataObj ) {
                    assert.equal( "200" , dataObj.code );
                    assert.ok(
                        dataObj.user_list.length > 0 , 
                        "查询结果应该大于0(当然这建立在数据库中存在相应记录的情况)" );
                    done();
                }
            );
        });//}}}

        it( "搜不存在的位置的时候断言返回中 user_list 为空", function( done ){
        //{{{
            var p = 1;
            var q = JSON.stringify({
                location: "那美克星"
            });
            req2hb123( 
                "get" ,
                "?about=user&action=search&p=" + p + "&q=" + q , 

                function( dataObj ) {
                    assert.equal( "200" , dataObj.code );
                    assert.ok(
                        JSON.parse( dataObj.user_list ).length === 0 , 
                        "see it" );
                    done();
                }
            );
        });//}}}

        it( "测试用户登录行为 ok 的情况" , function( done ) {
        //{{{
            //正确的登录
            var usr = "uutest";
            var psw = "uutest";

            req2hb123(
                "post" ,
                "about=user&action=login&username=" + 
                usr + "&password=" + crypto.createHash( "md5" ).update( psw ).digest( "hex" ) ,

                function( dataObj ) {
                    done();
                    assert.equal( "200" , dataObj.code );
                    //返回了登录用户的信息
                    assert.ok( JSON.parse(dataObj.user_info).UserName === "uutest" );
                }
            );
        });//}}}

        it( "测试用户登录行为 fail 的情况" , function( done ) {
            
        });

        //这个测试有副作用 fuck !
        it.skip( "测试查看联系方式" , function() {
            var objUserId = "2303";
            var subUserId = "555";

            var ok = function( dataObj ) {
                res.json( dataObj );
                done();
            };
            req2hb123( 
                "get" , 
                "about=user&action=should_display_contact_info&"+ 
                "&object_user_id=" + objUserId + 
                "&subject_user_id=" + subUserId ,

                ok
            );
        });
    });
})

