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
            var step = 2000;
            var formatTime = function( date ) {
                return date.getFullYear()
                    + "-" + (parseInt( date.getMonth() ) + 1)
                    + "-" + date.getDate()
                    + " " + date.getHours()
                    + ":" + date.getMinutes()
                    + ":" + date.getSeconds() 
                    + ":" + date.getMilliseconds();a
            }
            var intervalUpdate = function( type , urlPart ) {
                //保存在本地的最后更新时间
                var localLastUpdateKey = "petal:" + type + "_last_update_time";
                //保存在本地的最后数量
                var localCountKey = "petal:new_" + type + "_count";

                window[localLastUpdateKey] = window.localStorage.getItem( localLastUpdateKey ) || formatTime( new Date() );

                setInterval( function() {
                    $.get(
                        urlPart + window[localLastUpdateKey] , 
                        function( data ) {
                            var dataObj = JSON.parse( data );
                            var len = dataObj.length;
                            if( len > 0 ) {
                                //更新数量
                                var localCount = window.localStorage.getItem( localCountKey );
                                if( isNaN( localCount ) ) {
                                    localCount = 0;
                                    window.localStorage.setItem( localCountKey , 0 );
                                }

                                if( type === "msgs" ) {
                                    //是消息的话 如果是在 chat_list 页面 则需要即时的显示
                                    _.each( dataObj , function( msgItem ) {
                                        if( window.location.hash === "#chat_list" ) {
                                            //还需要判断是不是当前的对话
                                            if( parseInt(window.localStorage.getItem( "petal:root_msg_id" )) === msgItem.MBId ) {
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

                                //更新最后刷新时间
                                window[localLastUpdateKey] = formatTime( new Date() );
                                window.localStorage.setItem( localLastUpdateKey , window[localLastUpdateKey] );
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
            Backbone.history.start({
                pushState: true, 
                hashChange: true
            });

            //一些通用函数
            //获取用户联系方式
            window.getUserContactInfo = function() {
                var contactTpl = $( "#contact_info_tpl" ).html();
                $.get(
                    "/api/should_display_contact_info/?"
                    + "object_user_id=" + window.objectUser.get( "UserId" )
                    + "&subject_user_id=" + this.model.get( "UserId" ) ,

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
                                    window.updateSysNotice( "您是 vip 还可以查看 " + window.remain_count + " 次"  );
                                }
                                $.ui.popup({
                                    title: "联系方式",
                                    message: Mustache.to_html( contactTpl , this.model.toJSON() ),
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
                                        $.ui.popup({
                                            title: "" ,
                                            message: "账户金币不足,请购买金币" ,
                                            doneCallback: function() {
                                                window.router.navigate( "/#buy_coin" , {trigger: true} );
                                            }
                                        });
                                        break;
                                    default:
                                        //@todo 应该是一个异常
                                        break;
                                }
                            }
                        } catch( e ) {
                            alert( "查看联系方式失败，请稍后再试。" );
                            console.dir( "call getUserContactInfo error: " + e );
                        }
                    } , this ) ,
                    function( data ) {
                        alert( "查看联系方式失败，请稍后再试。" );
                        console.dir( "call getUserContactInfo error( server return error ): " + data );
                    }
                );
            }
        };

        return {
            initialize: init
        }
    });
