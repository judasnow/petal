var crypto = require( "crypto" )
    , _ = require( "underscore" )
    , fs = require( "fs" ) 
    , redis = require( "redis" );

module.exports = function( config , app ) {

var helper = require( "../lib/helper" )( config )
    , AlipayNpm = require( "alipay" ).Alipay
    , alipay = {};

var aliapyNpm = new AlipayNpm( config.alipay );
aliapyNpm.route( app );

//return 验证失败
aliapyNpm.on( 
    "verify_fail" , 
    function() {
        console.log( "emit verify_fail123" );
    }
);

//支付成功 等待发货
//无论是何种手段 return notify 都会触发这个事件
aliapyNpm.on(
    "trade_create_by_buyer_wait_seller_send_goods" , 
    function( out_trade_no, trade_no ) {
        //执行发货操作 其实就是修改 huaban123 上的订单状态 
        //没有文档中那么复杂 就是将 支付宝交易号码写入 就行了
        var data = {
            trade_no : trade_no ,
            logistics_name : "" ,
            invoice_no : "" ,
            transport_type : "EXPRESS",
        };
        aliapyNpm.send_goods_confirm_by_platform( data );
    }
);

aliapyNpm.on( 
    "send_goods_confirm_by_platform_success" ,
    function() {
    
    }
);

aliapyNpm.on( 
    "send_goods_confirm_by_platform_fail" ,
    function() {
    
    }
);


//生成新的订单并跳转到支付宝付款页面
alipay.initTrade = function( req , res ) {
    var userId = req.param( "user_id" , "" );
    var payMoney = req.param( "pay_money" , 0 );
    var payValue = req.param( "pay_value" , 0 );

    var ok = function( dataObj ) {
        if( dataObj.code === "200" && !isNaN( dataObj.out_trade_no ) ) {
            //成功获取交易号之后 生成收款链接 
            var data = {
                out_trade_no : dataObj.out_trade_no ,
                subject : "花瓣网充值" ,
                price : payMoney ,
                quantity : 1 ,
                logistics_fee : 0 ,
                logistics_type : "EXPRESS" ,
                logistics_payment : "SELLER_PAY" ,
                body : "花瓣网充值",
                show_url : "http://m.huaban123.com/#buy_coin" ,
                receive_name : "无需收货人" ,
                receive_address : "无需收货地址",
                receive_zip : "无需邮编",
                receive_phone : "无需电话" ,
                receive_mobile :"无需电话" 
            }

            aliapyNpm.create_partner_trade_by_buyer( data , res ); 
        }
    };

    helper.req2hb123(
        "post" ,
        "about=pay&action=get_out_trade_no&user_id=" + userId 
            + "&pay_money=" + payMoney 
            + "&pay_value=" + payValue ,
        ok
    );
};

//支付宝服务器异步通知页面 防止跳单
alipay.notifyUrl = function( req , res ) {
    res.json( {"name": "notify"} )
};

//支付宝页面跳转同步通知页面
alipay.returnUrl = function( req , res ) {
    res.json( {"name": "return"} )
};

return alipay;

}
