var crypto = require( "crypto" )
    , _ = require( "underscore" )
    , fs = require( "fs" ) 
    , redis = require( "redis" );

module.exports = function( config , app ) {

var helper = require( "../lib/helper" )( config )
    , AlipayNpm = require( "alipay" ).Alipay
    , alipayLib = require( "../lib/alipay" )( config )
    , alipay = {};

var aliapyNpm = new AlipayNpm( config.alipay );
aliapyNpm.route( app );

//return 验证失败
aliapyNpm.on(
//{{{
    "verify_fail" ,
    function() {
        console.log( "verify_fail" );
    }
);//}}}

//用户选择及时到帐 就会直接跳转到这个状态 
//不需要发货 直接尝试写入充值记录便可
aliapyNpm.on(
//{{{
    "trade_create_by_buyer_trade_finished" ,
    function( type , out_trade_no , trade_no , res ) {
        console.log( "trade_create_by_buyer_trade_finished by " + type );
        alipay.tradeSuccess( type , out_trade_no , trade_no , res );
    }
);//}}}

//支付成功 等待发货
//无论是何种手段 return notify 都会触发这个事件
aliapyNpm.on(
//{{{
    "trade_create_by_buyer_wait_seller_send_goods" ,
    function( type , out_trade_no, trade_no , res ) {
        //执行发货操作 其实就是修改 huaban123 上的订单状态
        //没有文档中那么复杂 就是将 支付宝交易号码写入相应
        //的记录就行了 之后需要通知 支付宝
        var data = {
            trade_no : trade_no ,
            logistics_name : "无" ,
            invoice_no : "无" ,
            transport_type : "EXPRESS",
        };

        console.log( "trade_create_by_buyer_wait_seller_send_goods by " + type );
        aliapyNpm.send_goods_confirm_by_platform( data );
        alipay.tradeSuccess( type , out_trade_no , trade_no , res );
    }
);//}}}

aliapyNpm.on(
//{{{
    "send_goods_confirm_by_platform_success" ,
    function() {
        
    }
);//}}}

aliapyNpm.on(
//{{{
    "send_goods_confirm_by_platform_fail" ,
    function() {
        
    }
);//}}}

//完成相应的订单 即在用户账户上进行充值
alipay.tradeSuccess = function( type , out_trade_no , trade_no , res ) {
//{{{
    var ok = function( dataObj ) {
        console.log( "ok by " + type );

        //将 alipayNpm 中的成功通知 移动到了这里
        if( type === "notify" ) {
            res.send( "success" );
        } else {
            res.redirect( "http://m.huaban123.com/" );
        }
    };

    var error = function( dataObj ) {
        console.log( "fail by " + type );
        if( type === "notify" ) {
            res.send( "fail" );
        } else {
            res.redirect( "http://m.huaban123.com/" );
        }
    };

    helper.req2hb123(
        "post" ,
        "about=pay&action=success&out_trade_no=" + out_trade_no 
            + "&trade_no=" + trade_no ,

        ok ,
        error
    );
};//}}}

//生成新的订单并跳转到支付宝付款页面
alipay.initTrade = function( req , res ) {
//{{{
    var userId = req.param( "user_id" , "" );
    var payMoney = req.param( "pay_money" , 0 );
    var payValue = req.param( "pay_value" , 0 );

    var ok = function( dataObj ) {
        if( dataObj.code === "200" && !isNaN( dataObj.out_trade_no ) ) {
            //成功获取交易号之后 生成收款链接 
            var data = {
                out_trade_no : dataObj.out_trade_no ,
                subject : "花瓣网充值" ,
                price : payMoney,
                quantity : "1" ,
                logistics_fee : "0" ,
                logistics_type : "EXPRESS" ,
                logistics_payment : "SELLER_PAY" ,
                body : "花瓣网充值",
                show_url : "http://m.huaban123.com/" ,
                receive_name : "无需收货人" ,
                receive_address : "无需收货地址",
                receive_zip : "无需邮编",
                receive_phone : "无需电话" ,
                receive_mobile :"无需电话" 
            }

            aliapyNpm.trade_create_by_buyer( data , res );
        }
    };

    helper.req2hb123(
        "post" ,
        "about=pay&action=get_out_trade_no&user_id=" + userId 
            + "&pay_money=" + payMoney 
            + "&pay_value=" + payValue ,
        ok
    );
};//}}}

return alipay;

}
