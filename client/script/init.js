//backbone 没有接管之前的初始化
(function() {
//less
//{{{
setInterval( function(){
    window.localStorage.setItem( "http://172.17.0.46/style/less/main.less:timestamp" , "" );
}, 5000 );
less.env = "development";
less.watch();
//}}}

//jqmobi init
//{{{
$.ui.isAjaxApp = true;
$.ui.openLinksNewTab = false;
$.ui.resetScrollers = false;
$.ui.nativeTouchScroll = false;
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

window.updateSysNotice = function( content ) {
    //提前获取元素 会因为 dom 未加载完而出错
    window.$sysNotice = window.$sysNotice || $( "#system_notice_box" );
    window.$sysNotice.text( content ).show();
    setTimeout( function() {
        window.$sysNotice.hide();
    } , 1000 );
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
        function( res ) {
            if( res[0] === "ok" ) {
                //登录成功
                window.location.hash = "";
                window.localStorage.setItem( "petal:object_user_info" , res[1] );
                window.localStorage.setItem( "petal:is_new_login" , "true" );
                $.ui.launch();
            } else {
                logging = false;
                failCallback();
            }
        } ,
        "json"
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
    //初始化 socketio
    //此处对于 js 的异步事件模型有一个疑问 connection 事件我是在 connent 调用之后进行的绑定
    //connection 事件如何会成功的执行呢？也就是说 绑定事件的时候其可能已经触发了该事件
    window.socketServer = "http://172.17.0.47:8800";
    window.petalServer = "172.17.0.46";

    window.socket = io.connect( window.socketServer );

    socket.on( "error" , function() {
        console.log( "socket connect fail" );
    });

    socket.on( "disconnect" , function() {
        console.log( "socket disconnected" );
    });

    socket.on( "connect" , function() {
        console.log( "socket connected" );
        //判断当前用户是否已经登录系统
        var $splashscreenEl = $( "#splashscreen" ).hide();
        if( window.localStorage.getItem( "petal:object_user_info" ) === null ) {
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
            $.ui.launch();
        }
    });
}
//}}}
document.addEventListener( "DOMContentLoaded" , init , false );
})();
