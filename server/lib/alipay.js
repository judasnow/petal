//
// 支付宝标准双接口
// 变量名采用支付宝示例中的变量名
// 默认签名模式 md5 默认编码 utf-8
//
// @author <judasnow@gmail.com>
//
var _ = require( "underscore" )
    , async = require( "async" )
    , crypto = require( "crypto" )
    , url = require( 'url' )
    //调用发货接口时 支付宝会返回 xml
    , DOMParser = require( "xmldom" ).DOMParser;

module.exports = function( config ) {

var alipay = {};

//通用配置
_config = {
//{{{
    //支付网关
    alipay_gateway_new: "https://mapi.alipay.com/gateway.do?" ,

    //合作身份者id 必填
    partner: "2088302808428418",

    //安全检验码 必填
    key: "luzyp6klpga6yijpyt8aq2pnhwnupc42",

    //卖家支付宝帐户 必填
    seller_email: "huaban1989@163.com" ,

    //CA证书路径地址 用于curl中ssl校验
    cacert: "./config/cacert.pem",

    //访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
    transport: "https" ,

    //字符编码格式 目前支持 gbk 或 utf-8
    input_charset: "utf-8" ,
};//}}}

//除去参数中的 空值 以及 签名本身
_paraFilter = function( para ) {
//{{{
    var para_filter = new Object();

    for( var key in para ) {
        if( key == 'sign' || key == 'sign_type' || para[key] == '' ) {
            continue;
        }
        else{
            para_filter[key] = para[key];
        }
    }

    return para_filter;
}//}}}

//按字母排序
_argSort = function(para){
//{{{
    var result = new Object();
    var keys = Object.keys(para).sort();
    for (var i = 0; i < keys.length; i++){
        var k = keys[i];
        result[k] = para[k];
    }
    return result;
};//}}}

//生成 url 参数
_createLinkstring = function(para) {
//{{{
    var ls = '';
    for( var k in para ) {
        ls = ls + k + '=' + para[k] + '&';
    }

    ls = ls.substring( 0 , ls.length - 1 );
    return ls;
}//}}}

//生成要请求给支付宝的参数数组
_buildRequestMysign = function( para_sort ){
//{{{
    //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
    var prestr = alipay.createLinkstring( para_sort );
    return alipay.md5Sign( prestr , alipay.config.key );
};//}}}

//生成要请求给支付宝的参数数组
_buildRequestPara = function( para_temp ){
//{{{
    //除去待签名参数数组中的空值和签名参数
    var para_filter = alipay.paraFilter( para_temp );

    //对待签名参数数组排序
    var para_sort = alipay.argSort( para_filter );

    //生成签名结果
    var mysign = this.buildRequestMysign( para_sort );

    //签名结果与签名方式加入请求提交参数组中
    para_sort['sign'] = mysign;
    para_sort['sign_type'] = "MD5";

    return para_sort;
};//}}}

//构造跳转表单
_buildRequestForm = function( paraTemp ) {
//{{{
    //待请求参数dataObj数组
    var para = this.buildRequestPara( paraTemp );

    var sHtml = "<form id='alipaysubmit' name='alipaysubmit' action='"
            + alipay.config.alipay_gateway_new 
            +  "_input_charset='utf-8'"
            + "' method='GET'>";

    for( var key in para ) {
        var val = para[key];
        sHtml += "<input type='hidden' name='" + key + "' value='" + val + "'/>";
    }

    //submit按钮控件请不要含有 name 属性
    sHtml = sHtml+ "<input type='submit' value='正在跳转到支付宝收银台...'></form>";
    sHtml = sHtml + "<script>document.forms['alipaysubmit'].submit();</script>";

    return sHtml;
};//}}}

//md5 类型的 hash 
//把 私钥 直接拼接到 待签名字符串 后面
//@param @key 私钥
//@param @prestr 待签名字符串
_md5Sign = function( prestr , key ) {
//{{{
    return crypto
        .createHash( "md5" )
        .update( prestr + key , "utf8" )
        .digest( "hex" ); 
};//}}}

//验证服务器 ATN
//使用 https
_checkATNbyHttps = function() {
//{{{
    var https_verify_url = "https://mapi.alipay.com/gateway.do?service=notify_verify&";
    var parsed_url = url.parse( https_verify_url );

    var veryfy_url = veryfy_url + "partner=" + partner +  "&notify_id=" + notify_id;

    var options = {
        hostname: parsed_url.host,
        port: 443,
        path: parsed_url.path,
        method: "GET",
        cert:fs.readFileSync( cacert_url ),
    };

    var req = https.request(options, function(res) {
        var responseText = '';
        res.on( 'data' , function(chunk){
            responseText += chunk;
        });
        res.on( 'end' , function(){
           callback && callback( responseText );
        });
    });

    req.on('error', function(err) {
        console.dir( err )
    });

    req.end();
};//}}}

//生成并返回请求表单
//@param data 订单信息
alipay.createOrderForm = function( data ) {
//{{{
    var parameter = {
        //双接口 service 名称 必填
        service : "trade_create_by_buyer",
        partner : alipay.config.partner,

        //魔数 不需要改
        payment_type: "1",
        notify_url : "http://221.10.10.2/alipay/notify_url",
        return_url : "http://221.10.10.2/alipay/return_url",
        seller_email : alipay.config.seller_email,
        _input_charset  : alipay.config.input_charset,

        //订单信息
        out_trade_no : data.out_trade_no,
        subject : data.subject,
        price : data.price,
        quantity : data.quantity,
        logistics_fee : data.logistics_fee,
        logistics_type : data.logistics_type,
        logistics_payment : data.logistics_payment,
        body : data.body,
        show_url : data.show_url,
        receive_name : data.receive_name,
        receive_address : data.receive_address,
        receive_zip : data.receive_zip,
        receive_phone : data.receive_phone,
        receive_mobile : data.receive_mobile
    };

    var html_text = alipay.buildRequestForm( parameter );
    return html_text;
};//}}}

//验证支付宝异步通知信息
//需要验证两部分内容 
//其一 签名 验证本机生成的 hash 和 支付宝 url 传递过来的是否相同
//其二 ATN 验证请求是否是由支付宝发送而来
alipay.checkAsyncNotify = function( postData , callback ) {
//{{{
     if( Object.keys( postData ).length === 0 ) {
        return false;
     } else {
        //验证签名
        //就是本机生成签名 和 支付宝传递过来的 sign 做比较
        var sign = ( alipay.md5Sign( prestr , key ) === postData.sign );
        if( sign !== true ) {
            callback( false );
        }

        //验证支付宝远程服务器ATN
        if( postData.notify_id !== null ) {
            
        }
     };
};//}}}

return alipay;//验证服务器 ATN
//使用 https
_checkATNbyHttps = function() {
//{{{
    var https_verify_url = "https://mapi.alipay.com/gateway.do?service=notify_verify&";
    var parsed_url = url.parse( https_verify_url );

    var veryfy_url = veryfy_url + "partner=" + partner +  "&notify_id=" + notify_id;

    var options = {
        hostname: parsed_url.host,
        port: 443,
        path: parsed_url.path,
        method: "GET",
        cert:fs.readFileSync( cacert_url ),
    };

    var req = https.request(options, function(res) {
        var responseText = '';
        res.on( 'data' , function(chunk){
            responseText += chunk;
        });
        res.on( 'end' , function(){
           callback && callback( responseText );
        });
    });

    req.on('error', function(err) {
        console.dir( err )
    });

    req.end();
};//}}}


}
