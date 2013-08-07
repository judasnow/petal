//应用程序入口
define([
    "backbone" ,
    "router" ,
    "mustache" ,
    "underscore" ,

    "m/user"
],
function( 
    Backbone ,
    Router ,
    Mustache ,
    _ ,

    User
    ) {
        "use strict";

        //进行系统的初始化
        var init = function() {
            //一些系统常量
            //查看资料花费金币
            window.costOfContact = 2;
            //发信息花费金币 
            window.costOfSendMsg = 1;

            //objectUserInfo -> objectUserModel
            window.objectUser = new User( JSON.parse( window.localStorage.getItem( "petal:object_user_info" ) ) );

            //更新动态提示
            window.updateMenuNotice = function( justThisKey ) {
                _.each( [ "msgs" , "gifts" , "visitors" ] , function( className ) {
                    if( typeof justThisKey !== "undefined" ) {
                        //如果设置了 justThisKey 就只更新指定的动态
                        if( className !== justThisKey ) {
                            return false;
                        }
                    }
                    var notice_count = window.localStorage.getItem( "petal:new_" + className + "_count" );
                    if( notice_count !== null && notice_count != "null" && notice_count !== "0" ) {
                        $.ui.updateBadge( "#menu ." + className , notice_count );
                    } else {
                        $.ui.removeBadge( "#menu ." + className );
                    }
                })
            };

            //轮询获取最新动态
            var step = 15000;

            var formatTime = function( date ) {
                return date.getFullYear()
                    + "-" + (parseInt( date.getMonth() ) + 1)
                    + "-" + date.getDate()
                    + " " + date.getHours()
                    + ":" + date.getMinutes()
                    + ":" + date.getSeconds() 
                    + ":" + date.getMilliseconds();
            }

            //只要保存一下最后一次获取的信息 进行一个比对就可以 基本解决
            //重复显示的问题
            //@TODO 但是一次获取很多信息很多的时候就可能会影响性能 到时可以将这个操作
            //     放到服务器上来进行
            var intervalUpdate = function( type , urlPart ) {

                //保存在本地的最后更新时间
                var localLastUpdateKey = "petal:" + type + "_last_update_time";

                //保存在本地的最后数量
                var localCountKey = "petal:new_" + type + "_count";

                //上一次获取的数据
                var lastDataObj = {};

                window[localLastUpdateKey] = window.localStorage.getItem( localLastUpdateKey ) || formatTime( new Date() );

                setInterval( function() {
                    $.get(
                        urlPart + window[localLastUpdateKey] ,

                        function( data ) {
                            var dataObj = JSON.parse( data );

                            //从当前获取的数据中剔除之前已经获取的重复数据
                            dataObj 
                                = _.filter( dataObj , function( dataObjItem ) {
                                        return typeof _.find( lastDataObj , function( lastDataObjItem ) {
                                            return _.isEqual( lastDataObjItem , dataObjItem );
                                        }) === "undefined";
                                    }
                                );

                            if( _.isEmpty( dataObj ) ) {
                                //如果获取的有效结果为空 则没有过滤以及保存的必要
                                return;
                            }

                            lastDataObj = dataObj;

                            var len = dataObj.length;
                            if( len > 0 ) {
                                //console.dir( urlPart + window[localLastUpdateKey]  );
                                //console.dir( dataObj );

                                //更新最后刷新时间
                                window[localLastUpdateKey] = formatTime( new Date() );
                                window.localStorage.setItem( localLastUpdateKey , window[localLastUpdateKey] );

                                //更新数量
                                var localCount = window.localStorage.getItem( localCountKey );
                                if( localCount === null || isNaN( localCount ) ) {
                                    localCount = 0;
                                    window.localStorage.setItem( localCountKey , 0 );
                                }

                                //需要特殊处理
                                if( type === "msgs" ) {

                                    //是消息的话 如果是在 chat_list 页面 则需要即时的显示
                                    _.each( dataObj , function( msgItem ) {
                                        if( window.location.hash === "#chat_list" ) {
                                            //还需要判断是不是当前的对话
                                            if( parseInt( window.localStorage.getItem( "petal:root_msg_id" ) ) === msgItem.MBId ) {
                                                $( "#chat_list" ).trigger( "new_msg" , msgItem );
                                                //有效长度减去 1
                                                len = len - 1;
                                            }
                                        }
                                    });
                                }

                                var newCount = len;
                                newCount = parseInt(newCount) + parseInt(localCount);
                                window.localStorage.setItem( localCountKey , newCount );

                                window.updateMenuNotice( type );

                            }
                        }
                    );
                }, step);
            };

            _.each( ["gifts" , "msgs" , "visitors"] , function( type ) {
                intervalUpdate(
                    type ,
                    "/api/new_" + type + "/?user_id=" + window.objectUser.get( "UserId" ) + "&&last_update_time=" 
                );
            });

            //backbone router
            var router = new Router();
            window.router = router;
            Backbone.history.start();

            //到这里加载完成
            console.log( "after router" );
            $.ui.hideMask();
        };

        return {
            initialize: init
        }
});
