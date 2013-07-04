//backbone 没有接管之前的初始化
(function() {
//{{{
//setInterval( function(){
//    window.localStorage.setItem( "http://172.17.0.46/style/less/main.less:timestamp" , "" );
//}, 5000 );
//less.env = "development";
//less.watch();
//}}}

//jqmobi init
//{{{
$.ui.isAjaxApp = false;
$.ui.openLinksNewTab = false;
$.ui.resetScrollers = false;
//$.ui.nativeTouchScroll = false;
$.ui.autoLaunch = false;
$.ui.showBackbutton = false;
$.ui.customClickHandler = function() { return true;}
//}}}

//加载 main.js 
//{{{
$.ui.ready( function() {
    var oHead = document.getElementsByTagName( "HEAD" ).item( 0 ); 
    var oScript= document.createElement( "script" ); 
    oScript.setAttribute( "data-main" , "/script/main.js" )
    oScript.src = "/script/lib/require.js";
    oHead.appendChild( oScript );
});//}}}

//jqmobi 初始化完成之后的操作
var onDeviceReady = function() {
//{{{
    AppMobi.device.setRotateOrientation( "portrait" );
    AppMobi.device.setAutoRotate( false );
    webRoot = AppMobi.webRoot + "/";
    AppMobi.device.hideSplashScreen();
    $.ui.blockPageScroll();
};//}}}
document.addEventListener( "appMobi.device.ready" , onDeviceReady , false );

//只所以使用 z-index 而不直接 hide 是因为
//似乎 hide 的 元素无法正确的获取 width 值
window.updateSysNotice = function( content ) {
//{{{

    //提前获取元素 会因为 dom 未加载完而出错
    window.$sysNotice = window.$sysNotice || $( "#system_notice_box" );

    //window.$sysNotice.attr( "style" , "z-index: -9999" );
    window.$sysNotice.text( content )
        .attr( "style" , "margin-left: -" + ( window.$sysNotice.width() / 2 ) + "px;z-index: 9999" );

    setTimeout( function() {
        window.$sysNotice.attr( "style" , "z-index: -9999" );
    } , 2000 );

};//}}}

//初始化将在本地存储的数据
var initLocalData = function() {
    window.localStorage.setItem( "petal:object_user_info" , "" );
    window.localStorage.setItem( "petal:is_new_login" , "true" );
    window.localStorage.setItem( "petal:root_msg_id" , "0" );
    window.localStorage.setItem( "petal:send_msg_target_user_id" , "" );
};

//成功后的操作都一样 只有失败的时候不同
var login = function( username , password , failCallback ) {
//{{{
    $.post( 
        "/api/do_login" ,
        {
            username: username ,
            password: password
        } ,
        function( data ) {
            try {
                var dataObj = JSON.parse( data );
                if( dataObj.result === "ok" ) {
                    var object_user_info = JSON.stringify( dataObj.user_info );
                    if( typeof object_user_info === "undefined" ) {
                        throw new Error( "json stringify user_info error" );
                    }
                    //登录成功 且返回数据有效
                    initLocalData();
                    window.location.hash = "";
                    window.localStorage.setItem( "petal:object_user_info" , object_user_info );
                    window.localStorage.setItem( "petal:is_new_login" , "true" );
                    $.ui.launch();
                    //ios 有问题要手动 reload
                    window.location.reload();
                } else {
                    logging = false;
                    failCallback();
                }
            } catch ( err ) {
                console.log( "登录时发生异常" );
                console.dir( err.stack )
                logging = false;
                failCallback();
            }
        }
    );
};//}}}

var wx_login = function() {
//{{{
    $.get(
        "/api/get_username_by_wx_id?wx_id=" +  window.location.hash.replace( /^\#/ , "" ) ,
        function( data ) {
            var dataObj = JSON.parse( data );
            if( dataObj[0] === "ok" ) {
                login( dataObj[1].username , "huaban123" , function() {
                    window.location.hash = "";
                    window.location.reload();
                });
            }
        }
    );
};//}}}

var init = function() {
//{{{
    var $splashscreenEl = $( "#splashscreen" ).hide();

    //判断当前用户是否已经登录系统
    var localObjectUserInfo = window.localStorage.getItem( "petal:object_user_info" );

    //@todo 判断是否登录的条件有可能会发生改变
    if( localObjectUserInfo === null || localObjectUserInfo === "" ) {
        //未登录
        if( window.location.hash !== "" ) {
            //weixin
            wx_login();
        } else {
            var $loginEl = $( "#login" ).show();
            var $usernameEl = $loginEl.find( ".username" );
            var $passwordEl = $loginEl.find( ".password" );

            $loginEl.find( ".do_login" ).click( 
                function() {
                    login( $usernameEl.val() , $passwordEl.val() , function() {
                        window.updateSysNotice( "用户名或密码错误" );
                    });
                }
            );
        }
    } else {
        //已经登录系统
        $.ui.launch();
    }
}//}}}

document.addEventListener( "DOMContentLoaded" , init , false );

//解决 id 相同的元素更新问题 
//也就是说如果已经有了相同 id 的元素则不进行任何操作
$.ui.addOrUpdateDiv = function( id , content , showFooter ) {
    if( $( "#" + id ).length === 0 ) {
        $.ui.addContentDiv (
            id ,
            content ,
            true ,
            true 
        );
    } else {
        $.ui.updateContentDiv(
            id ,
            content
        );
    }
    var $el = $( "#" + id );
    if( typeof showFooter === "undefined" || showFooter === false ) {
        $el.attr( "data-footer" , "none" );
    }
    return $el.unbind();
    //$el.attr( "style", "overflow:hidden" );
}

//jqmobi 的 goBack() 仅仅跳转到相应的 page
$.ui.goBackWithDefault = function() {
    if( $.ui.history.length === 1 ) {
        window.router.navigate( "/#stream" , {trigger: true} );
    } else {
        $.ui.goBack();
        //读取当前的 hash 并且 trigger it
        //var hash = window.location.hash;
        //window.router.navigate( "/" + hash , {trigger: true} );
    }
};

})();
