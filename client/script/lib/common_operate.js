define([
    "underscore" ,
    "mustache"
],
function( 
    _ ,
    Mustache
) {
    "use strict";

    var commonOperate = {};

    //获取用户联系方式
    //@param objectUser is a model 
    commonOperate.getUserContactInfo = function( objectUser ) {
    //{{{
        var contactTpl = $( "#contact_info_tpl" ).html();
        $.get(
            "/api/should_display_contact_info/?"
                + "object_user_id=" + window.objectUser.get( "UserId" )
                + "&subject_user_id=" + objectUser.get( "UserId" ) ,

            $.proxy( function( data ) {
                try {
                    var res = JSON.parse( data );
                    if( res.should === "true" ) {
                        //根据可以显示的原因确定相应操作 一共存在 3 种
                        //1 had_bought 之前已经购买
                        //2 vip 因为他是 vip
                        //3 buy_just_now 刚刚购买 
                        if( res.reason === "buy_just_now" ) {
                            window.updateSysNotice( "金币 -" + window.costOfContact );
                        }
                        if( res.reason === "vip" ) {
                            //@todo 需要判断 remain_count 是否是有效的数字
                            //window.updateSysNotice( "您是 vip 还可以查看 " + window.remain_count + " 次"  );
                        }
                        $.ui.popup({
                            title: "联系方式",
                            message: Mustache.to_html( contactTpl , objectUser.toJSON() ),
                            cancelText: "关闭",
                            cancelOnly: true 
                        });
                    } else {
                        //不能看情况也分两种
                        //1 excess_vip_count vip 查看次数用完了
                        //2 insufficient_coin 没有足够的金币进行购买操作 
                        //但是 vip 用完机会之后会直接尝试购买 因此也只能算一种
                        switch( res.reason ) {
                            case "insufficient_coin": 
                                commonOperate.insufficientCoinHandle();
                                break;
                            default:
                                //@todo 应该是一个异常
                                break;
                        }
                    }
                } catch( err ) {
                    alert( "查看联系方式失败，请稍后再试。" );
                    console.dir( "call getUserContactInfo error: " + err );
                }
            } , this ) ,

            function( data ) {
                alert( "查看联系方式失败，请稍后再试。" );
                console.dir( "call getUserContactInfo error( server return error ): " + data );
            }
        );
    }//}}}

    //访问指定用户的主页
    commonOperate.goDetailPage = function( userId ) {
    //{{{
        if( typeof userId === "undefined" || isNaN( userId ) ) {
            console.log( "user_id invalid, should be a Number but '" + userId + "' given" );
            return;
        } else {
            window.router.navigate(
                "/#user_detail/" + userId,
                {
                    trigger: true
                }
            );
        }
    };//}}}

    //用户金币不足时提示用户充值
    commonOperate.insufficientCoinHandle = function() {
    //{{{
        window.updateSysNotice( "金币余额不足" );
        window.router.navigate( "/#buy_coin" , { trigger: true } );
    };//}}}

    //根据用户的信息初始化页面上的地址选项
    //@param LocationString like "四川 成都"
    commonOperate.setDefaultLocationSelect = function( locationString , $province , $cityname ) {
    //{{{
        var locationArray = locationString.split( " " );
        var province = locationArray[0];
        var cityname = locationArray[1];
        if( province != "" ) {
            $province.val( province ).trigger( "change" );
            $cityname.val( cityname );
        }
    }//}}}

    return commonOperate;

});