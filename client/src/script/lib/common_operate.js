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
                    var dataObj = JSON.parse( data );
                    if( dataObj.should === "true" ) {
                        //根据可以显示的原因确定相应操作 一共存在 3 种
                        //1 had_bought 之前已经购买
                        //2 vip 因为他是 vip
                        //3 buy_just_now 刚刚购买 
                        if( dataObj.reason === "buy_just_now" ) {
                            window.updateSysNotice( "金币 -" + window.costOfContact );
                        }
                        if( dataObj.reason === "vip" ) {
                            //@todo 需要判断 remain_count 是否是有效的数字
                            //window.updateSysNotice( "您是 vip 还可以查看 " + window.remain_count + " 次"  );
                        }
                        $.ui.popup({
                            title: "联系方式",
                            message: Mustache.to_html( contactTpl , objectUser.toJSON() ),
                            cancelText: "关闭",
                            cancelCallback: function() {
                                //删除模板中的信息
                            } ,
                            cancelOnly: true 
                        });
                    } else {
                        //不能看情况也分两种
                        //1 excess_vip_count vip 查看次数用完了
                        //2 insufficient_coin 没有足够的金币进行购买操作 
                        //但是 vip 用完机会之后会直接尝试购买 因此也只能算一种
                        switch( dataObj.reason ) {
                            case "insufficient_coin": 
                                commonOperate.insufficientCoinHandle();
                                break;
                            default:
                                //@todo 应该是一个异常
                                break;
                        }
                    }
                } catch( err ) {
                    window.updateSysNotice( "查看联系方式失败，请稍后再试。" );
                    console.dir( "call getUserContactInfo error: " + err );
                }
            } , this ) ,

            function( data ) {
                alert( "查看联系方式失败，请稍后再试。" );
                console.dir( "call getUserContactInfo error( server return error ): " + data );
            }
        );
    }//}}}

    //送礼物
    commonOperate.sendGift = function( targetUserId , giftId , price ) {
    //{{{
        //@todo 需要对 targetUserId 有效性进行判断
        if( targetUserId !== null ) {
            //购买并赠送该礼物给指定的用户
            $.post(
                "/api/send_gift/" ,
                {
                    gift_id: giftId ,
                    target_user_id: targetUserId ,
                    from_user_id: window.objectUser.get( "UserId" )
                } ,
                function( data ) {
                    var dataObj = JSON.parse( data );
                    if( dataObj.result === "ok" ) {
                        window.updateSysNotice( "金币 -" + price );
                        $.ui.popup({
                            title: "恭喜",
                            message: "礼物已经成功送出，是否继续选取礼物？",
                            cancelText: "不",
                            cancelCallback: function() {
                                $.ui.goBackWithDefault();
                            },
                            doneText: "继续",
                            doneCallback: function() {

                            },
                            cancelOnly:false
                        });
                    } else {
                        commonOperate.insufficientCoinHandle();
                    }
                } ,
                function() {
                    //opt fail
                }
            )
        }
    };//}}}

    //访问指定用户的主页
    commonOperate.goDetailPage = function( userId ) {
    //{{{
        if( typeof userId === "undefined" || isNaN( userId ) ) {
            console.log( "user_id invalid, should be a Number but '" + userId + "' given" );
            return;
        } else {
            window.router.navigate(
                "user_detail/" + userId,
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
        window.router.navigate( "buy_coin" , { trigger: true } );
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

    //定向到聊天记录页面
    commonOperate.goChatListPage = function( objectUser ) {
    //{{{
        //判断是否有存在的对话 如果有 将其设置为 root_msg_id
        $.get(
             "/api/get_exist_talk_betweet_two_users/?object_user_id="
                + window.objectUser.get( "UserId" )
                + "&subject_user_id=" + objectUser.get( "UserId" ) ,

             function( data ) {
                 var dataObj = JSON.parse( data );
                 if( dataObj.result === "ok" ) {
                     window.localStorage.setItem( "petal:root_msg_id" , dataObj.root_msg_id );
                     window.localStorage.setItem( "petal:send_msg_target_user_id" , objectUser.get( "UserId" ) );

                     window.router.navigate( "chat_list" , {trigger: true} );
                 }
             },

             function() {
                 window.localStorage.setItem( "petal:root_msg_id" , 0 );
                 window.localStorage.setItem( "petal:send_msg_target_user_id" , that.model.get( "UserId" ) );

                 window.router.navigate( "chat_list" , {trigger: true} );
             }
        );
    };//}}}

    var _addNewDiary = function( diaryInfo ) {
    //{{{
        var diary_id = diaryInfo.diary_id;
        var title = diaryInfo.title;
        var content = diaryInfo.content;

        $.post(
            "/api/diary" ,
            {
                user_id: window.objectUser.get( "UserId" ) ,
                title: title ,
                content: content 
            } ,
            function( data ) {
                var dataObj = JSON.parse( data );

                if( dataObj.result === "ok" ) {
                    window.updateSysNotice( "发表日志成功" );

                    setTimeout( function() {
                        window.router.navigate( 'diaries' , {trigger: true});
                    }, 1000)
                }
            }
        );
    };//}}}

    var _updateDiary = function( diaryInfo ) {
    //{{{
        var diary_id = diaryInfo.diary_id;
        var title = diaryInfo.title;
        var content = diaryInfo.content;

        $.post(
            "/api/update_diary" ,
            {
                diary_id: diary_id ,
                user_id: window.objectUser.get( "UserId" ) ,
                title: title ,
                content: content 
            } ,
            function( data ) {
                var dataObj = JSON.parse( data );

                if( dataObj.result === "ok" ) {
                    window.updateSysNotice( "发表日志成功" );
                    setTimeout( function() {
                        window.router.navigate( 'diaries' , {trigger: true});
                    }, 1000)
                }
            }
        );
    };//}}}

    //提交日志信息
    commonOperate.addOrUpdateDiaryInfo = function( diaryInfo ) {
        //{{{
        var diary_id = diaryInfo.diary_id;
        var title = diaryInfo.title;
        var content = diaryInfo.content;

        if( typeof title === "undefined" || title === "" ) {
            window.updateSysNotice( "标题不能是空" );
            return;
        }

        if( typeof content === "undefined" || content === "" ) {
            window.updateSysNotice( "日志内容不能是空" );
            return;
        }

        if( typeof diary_id !== "undefined" ) {
            //修改
            _updateDiary( diaryInfo );
        } else {
            //提交新的日志信息
            _addNewDiary( diaryInfo );
        }

    };//}}}

    return commonOperate;

});
