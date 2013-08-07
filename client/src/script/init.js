(function() {

//backbone 没有接管之前的初始化
//因此配置文件也是独立的

//{{{
setInterval( function(){
    window.localStorage.setItem( "http://172.17.0.46/src/style/less/main.less:timestamp" , "" );
}, 3000 );
less.env = "development";
less.watch();
//}}}

//appCache
//{{{
//window.addEventListener( "load" , function(e) {
//    window.applicationCache.addEventListener( "updateready" , function(e) {
//        if( window.applicationCache.status == window.applicationCache.UPDATEREADY ) {
//            window.applicationCache.swapCache();
//            console.dir( "new cache" )
//            window.location.reload();
//        } else {
//
//       }
//    }, false );
//}, false );

//var handleCacheEvent = function() {
//    console.log( "cached fire" );
//    window.localStorage.setItem( "petal:app_cached" , "true" );
//};
//window.applicationCache.addEventListener( "cached" , handleCacheEvent , false );
//}}}

//jqmobi init
//{{{
$.ui.isAjaxApp = false;
$.ui.openLinksNewTab = false;
$.ui.resetScrollers = false;
$.ui.nativeTouchScroll = false;
$.ui.autoLaunch = false;
$.ui.showBackbutton = false;
$.ui.customClickHandler = function() { return true; }
//}}}

//加载 main.js 最花时间的地方
var addRequirejs = function() {
//{{{
    var oHead = document.getElementsByTagName( "HEAD" ).item( 0 ); 
    var oScript= document.createElement( "script" );
    //oScript.setAttribute( "data-main" , "/build/script/rquirejs_main_build.js" );
    //oScript.src = "/build/script/lib/require.js";
    oScript.setAttribute( "data-main" , "/src/script/main.js" );
    oScript.src = "/src/script/lib/require.js";
    oHead.appendChild( oScript );

    $.ui.showMask();
};//}}}

//初始化将在本地存储的数据
var initLocalData = function() {
//{{{
    window.localStorage.setItem( "petal:object_user_info" , "" );
    window.localStorage.setItem( "petal:is_new_login" , "true" );
    window.localStorage.setItem( "petal:root_msg_id" , "0" );
    window.localStorage.setItem( "petal:send_msg_target_user_id" , "" );
};//}}}

//系统通知
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

//解决 id 相同的元素更新问题 
//也就是说如果已经有了相同 id 的元素则不进行任何操作
$.ui.addOrUpdateDiv = function( id , content , showFooter ) {
//{{{
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
}//}}}

//jqmobi 的 goBack() 仅仅跳转到相应的 page
$.ui.goBackWithDefault = function() {
//{{{
    if( $.ui.history.length === 1 ) {
        window.router.navigate( "/#stream" , {trigger: true} );
    } else {
        $.ui.goBack();
        //读取当前的 hash 并且 trigger it
        //var hash = window.location.hash;
        //window.router.navigate( "/" + hash , {trigger: true} );
    }
};//}}}

//callback of $.ui.launch()
//{{{
$.ui.ready( function() {
    console.log( "ui ready" );

    addRequirejs();
});//}}}

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
                } else {
                    logging = false;
                    failCallback();
                }
            } catch ( err ) {
                console.log( "登录时发生异常" );
                logging = false;
                failCallback();
            }
        }
    );
};//}}}

var wx_login = function() {
//{{{
    var username =  window.location.hash.replace( /^\#/ , "" ).replace( /^\!/ , "" );
    login( 
        username ,
        "huaban123" , 
        function() {

            //登录失败
            window.location.hash = "";
            $( "#login" ).show();
        }
    );
};//}}}

//jqmobi 初始化完成之后的操作
var onDeviceReady = function() {
//{{{
    console.log( "appMobi.device.ready fire" );

    AppMobi.device.setRotateOrientation( "portrait" );
    AppMobi.device.setAutoRotate( false );
    webRoot = AppMobi.webRoot + "/";
    AppMobi.device.hideSplashScreen();
    $.ui.blockPageScroll();
};//}}}

//邮箱地址补全
//@param $targetInputEl 绑定到 input 元素
var autocompleteEmail = function( $targetInputEl ) {
    if( typeof $targetInputEl === "undefined" || $targetInputEl === null ) {
        return;
    }

    //获取下拉列表模板
    var listTpl = $( "#email_address_list" ).html();
    $( listTpl ).insertAfter( $targetInputEl );
    var $emailAddressList = $targetInputEl.parent().find( ".email_address_list" );
    var listItemTpl = $( "#email_address_list_item" ).html();

    $emailAddressList.on(
        "click" , 
        ".item" , 
        function() {
            var $this = $( this )

            $targetInputEl.val( $this.text() );
            $emailAddressList.hide();
        }
    );

    var emailSuffixList = [ "gmail.com" , "qq.com" , "163.com" , "sina.com" , "126.com" , "vip.sina.com" , "139.com" , "189.com" , "wo.com.cn" ];
    var emailSuffixListLength = emailSuffixList.length;

    $targetInputEl.on( "input" , function() {
        var currValue = $targetInputEl.val();

        //用户首次输入满足邮箱地址前一部分(@及之前部分)时 若下拉菜单不可见 则显示之
        //@XXX 这里的正则需要修改加强
        if( currValue.match( /@$/ ) || currValue.match( /^(\w)+(\.\w+)*@(\w)+((\.|\w+)+)$/ ) ) {
            if( $emailAddressList.css( "display" ) === "none" ) {
                $emailAddressList.show();
            }
        }

        //将用户已经输入的信息 由第一个 @ 分开 用后面的一部分匹配
        //如果列表为空 则隐藏
        if( $emailAddressList.css( "display" ) !== "none" ) {

            $emailAddressList.html( "" );

            var userInputSuffix = currValue.split( "@" )[1];
            var emailSuffixListFilted = [];
            var emailSuffixListFiltedLength = 0;

            if( typeof userInputSuffix === "undefined" || userInputSuffix === "" ) {
                emailSuffixListFilted = emailSuffixList;
            } else {
                //根据用户的输入过滤需要显示的内容
                for( var i = 0 ; i <= emailSuffixListLength ; i = i + 1 ) {
                    var listItem = emailSuffixList[i];
                    var re = new RegExp( "^" + userInputSuffix );

                    //如果用户输入的信息和列表中的相等（用户已经输入完全） 就没有显示的必要了
                    if( userInputSuffix === emailSuffixList[i] ) {
                        break;
                    }

                    if( re.test( listItem ) ) {
                        emailSuffixListFilted.push( emailSuffixList[i] );
                    }
                }
            }

            emailSuffixListFiltedLength = emailSuffixListFilted.length;
            if( emailSuffixListFiltedLength === 0 ) {
                $emailAddressList.hide();
            } else {
                for( var i = 0 ; i < emailSuffixListFiltedLength ; i = i + 1 ) {
                    var $listItem = $( listItemTpl );
                    var userInput = $targetInputEl.val().split( "@" )[0];

                    if( typeof userInput === "undefined" || userInput === "" ) {
                        throw new Error( "获取用户输入邮箱地址有误 断言 @ 之前不能为空" );
                    }

                    $listItem.html( userInput + "@" + emailSuffixListFilted[i] );
                    $emailAddressList.append( $listItem );
                }
            }
        }
    });
};

//dom 加载完成 就会调用这个初始化方法
var init = function() {
//{{{
    $( "#splashscreen" ).hide();

    //判断当前用户是否已经登录系统
    var localObjectUserInfo = window.localStorage.getItem( "petal:object_user_info" );

    //@todo 判断是否登录的条件有可能会发生改变
    if( localObjectUserInfo === null || localObjectUserInfo === "" ) {

        //未登录
        var locationLocal = window.location;
        var $login = $( "#login" );
        var $reg = $( "#reg" );

        var routeByHash = function() {
            var hash = locationLocal.hash;

            if( hash.match( /^#login.*/ ) ) {
                //显示登录页面
                $login.show();
                $reg.hide();
            } else if( hash.match( /^#reg.*/ ) ) {
                if( hash !== "#reg" ) {
                    var hashArray = hash.split( "/" );
                    var userId = hashArray[1];
                    var nickname = hashArray[2];
                    $reg.find( ".user_id" ).val( userId );
                    $reg.find( ".nickname" ).val( decodeURIComponent( nickname ) );
                }

                $login.hide();
                $reg.show();

            } else {
                //尝试 wx 登录
                wx_login();
            }
        };

        autocompleteEmail( $login.find( ".email" ) );
        autocompleteEmail( $reg.find( ".email" ) );

        //跳转到注册页面
        $login.on( "click" , ".go_to_reg" , 
            function() {
                window.location.hash = "reg";
            }
        );

        $reg.on( "click" , ".go_to_login" , 
            function() {
                window.location.hash = "login";
            }
        );

        //登录事件
        $login.on( 
            "click" , 
            ".do_login" ,
            function() {
                var $email = $login.find( ".email" );
                var $password = $login.find( ".password" );

                login( $email.val() , $password.val() , function() {
                    window.updateSysNotice( "用户名或密码错误" );
                });
            }
        );

        //注册事件
        $reg.on( 
            "click" , 
            ".do_reg" ,
            function() {
                var $nickname = $reg.find( ".nickname" );
                var $email = $reg.find( ".email" );
                var $password = $reg.find( ".password" );
                var $userId = $reg.find( ".user_id" );

                var currEmailValue = $email.val();
                var currNicknameValue = $nickname.val();
                var currPasswordValue = $password.val();

                if( currNicknameValue === "" ) {
                    window.updateSysNotice( "昵称不能为空" );
                    return false;
                }

                if( currEmailValue === "" ) {
                    window.updateSysNotice( "邮箱地址不能为空" );
                    return false;
                } else {
                    if( !currEmailValue.match( /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/  ) ) {
                        window.updateSysNotice( "请填写格式正确的邮箱地址" );
                        return;
                    }
                }

                if( currPasswordValue === "" ) {
                    window.updateSysNotice( "密码不能为空" );
                    return false;
                }

                //执行
                //@XXX 我觉得有必要将所有的这些 url 放到一起
                $.post( 
                    "/api/reg/" ,
                    {
                        user_id: $userId.val() ,
                        nickname: currNicknameValue ,
                        username: currEmailValue ,
                        password: currPasswordValue
                    } ,
                    function( data ) {
                        var dataObj = JSON.parse( data );
                            if( typeof dataObj.user_id !== "undefined" && dataObj.user_id  !== "" ) {
                            //注册成功 拼接 userinfo 对象存放到用户浏览器中
                            var userInfo = {
                                UserId: dataObj.user_id ,
                                UserName: currEmailValue ,
                                NickName: currNicknameValue 
                            };
                            window.localStorage.setItem( "petal:object_user_info" , JSON.stringify( userInfo ) );

                            //重定向到首页
                            window.location.href = "/";
                        } else {
                            window.updateSysNotice( "注册失败，请稍后再试一次" );
                        }
                    }
                );
            }
        );

        window.onhashchange = routeByHash;

        if( locationLocal.hash === "" ) {
            locationLocal.hash = "login";
        }
        routeByHash();

    } else {
        //已经登录

        //如果 hash 也被设置了 就判断下有没有可能是 weixin 传来的用户名
        //以 ! 开头 则去除 hash 
        if( window.location.hash.indexOf( "!" ) === 1 ) {
            window.location.hash = "";
        }
        $.ui.launch();
    }
}//}}}

document.addEventListener( "appMobi.device.ready" , onDeviceReady , false );
document.addEventListener( "DOMContentLoaded" , init , false );

})();
