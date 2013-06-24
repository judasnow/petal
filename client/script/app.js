//应用程序入口
define([
    "backbone" ,
    "router" ,
    "mustache" ,

    "m/user"
],
function( 
    Backbone ,
    Router ,
    Mustache ,

    User
    ) {
        "use strict";

        //进行系统的初始化
        var init = function() {
            //一些系统常量
            window.socketServer = "http://172.17.0.47:8800";
            //查看资料花费金币
            window.costOfContact = 2;
            //发信息花费金币 
            window.costOfSendMsg = 1;

            //objectUserInfo -> objectUserModel
            window.objectUser = new User( JSON.parse( window.localStorage.getItem( "petal:object_user_info" ) ) );

            //初始化 socketio
            window.socket = io.connect( window.socketServer );
            socket.on( "error" , function() {
                console.log( "socket connect fail" );
            });
            socket.on( "disconnect" , function() {
                console.log( "socket disconnected" );
            });

            //绑定 socketio 相关的事件
            window.socket.on( "new_msg:" + window.objectUser.get( "UserId" )  , function( msg ) {
                //当前登录用户收到新的 msg 时 
                var newMsgCount = (function( lastCount ) {
                    if( isNaN( lastCount ) ) {
                        return 1;
                    } else {
                        return parseInt( lastCount ) + 1;
                    }
                })( $( "#menu .msgs .jq-badge" ).text() );

                $.ui.updateBadge( "#menu .msgs" , newMsgCount );

                $( "#chat_list" ).trigger( "new_msg" , msg );
                //返回一个hash key MsgId:AcceptUserId 没有必要再返回 data
                $( "#menu .msgs" ).on( "tap" , function() {
                    window.socket.emit( "msg_received" , {key: msg.MsgId + ":" + msg.AcceptUserId} );
                });
            });

            window.socket.on( "new_gift:" + window.objectUser.get( "UserId" ) , function( new_gift ) {
                var newGiftCount = (function( lastCount ) {
                    if( isNaN( lastCount ) ) {
                        return 1;
                    } else {
                        return parseInt( lastCount ) + 1;
                    }
                })( $( "#menu .gifts .jq-badge" ).text() );

                $.ui.updateBadge( "#menu .gifts" , newGiftCount );
                $( "#menu .gifts" ).on( "tap" , function() {
                    window.socket.emit( "gift_checked" , {key: new_gift.RId + ":" + new_gift.AUid} );
                });
            });

            window.socket.on( "new_visitors:" + window.objectUser.get( "UserId" ) , function( visitors ) {
                var newVistitorCount = (function( lastCount ) {
                    if( isNaN( lastCount ) ) {
                        return 1;
                    } else {
                        return parseInt( lastCount ) + 1;
                    }
                })( $( "#menu .visitors .jq-badge" ).text() );
 
                $.ui.updateBadge( "#menu .visitors" , newVistitorCount );
                $( "#menu .visitors" ).on( "tap" , function() {
                    window.socket.emit( "visitors_checked" , {key: visitors.BUserId + ":" + visitors.BrowseAt} );
                });
            });

            //backbone router
            var router = new Router();
            window.router = router;
            Backbone.history.start({
                pushState: true, 
                hashChange: true
            });

            //一些通用函数
            //{{{
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
            //}}}

        };

        return {
            initialize: init
        }
    });
