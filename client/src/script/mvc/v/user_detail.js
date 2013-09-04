define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "v/menu" ,

    "text!tpl/user_detail.html" ,

    "lib/helper" ,
    "lib/common_operate"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    User ,

    MenuView ,

    userDetailTpl ,

    helper ,
    commonOperate
) {
    "use strict";

    var UserDetail = Backbone.View.extend({
        template: userDetailTpl ,

        events: {
            "tap .get_contaces_info": "getContacesInfo" ,
            "tap .send_gift": "sendGift" ,
            "tap .send_msg": "sendMsg" ,
            "tap .wanted_gift_list .gravatar": "sendThatGift" ,
            "tap .visitors_list .sub_item": "goDetailPage" ,
            "tap .user_picture": "showAlbum" ,
            "tap .diaries_list .sub_item": "goToDiaryDetail"
        } ,

        initialize: function( data ) {
        //{{{
            new MenuView();
            this.subjectUserId = data.subjectUserId;

            //为了 history 可以正常使用 必须使用不同的 id
            this.divId = "user_detail-" + this.subjectUserId;

            this.$el = $.ui.addOrUpdateDiv( this.divId , "" );

            //需要判断是否是当前登录用户自己的主页
            if( this.subjectUserId == window.objectUser.get( "UserId" ) ) {
                this.isSelfPage = true;
            }

            _.bindAll(
                this , 
                "sendMsg" , "sendGift" , "getContacesInfo" , "sendThatGift" , "showAlbum" , "goToDiaryDetail" , "render" );

            this.model = new User();
            this.listenTo( this.model , "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: this.subjectUserId
                },
                success: function( m ) {
                    console.dir( m )
                }
            });
        } ,//}}}

        sendMsg: function() {
        //{{{
            if( !helper.isInfoPercentFullfill() ) {
                helper.goToFillInfo();
                return false;
            }

            commonOperate.goChatListPage( this.model );
        } ,//}}}

        sendGift: function() {
        //{{{
            if( !helper.isInfoPercentFullfill() ) {
                helper.goToFillInfo();
                return false;
            }

            window.localStorage.setItem( "petal:send_gift_target_user_id" , this.model.get( "UserId" ) );
            window.router.navigate( "/#gift_list" , {trigger: true} );
        } ,//}}}

        //赠送其想收到的礼物
        sendThatGift: function( event ) {
        //{{{
            if( !helper.isInfoPercentFullfill() ) {
                helper.goToFillInfo();
                return false;
            }

            var $subItem = $( event.target ).parent().parent();
            var giftId = $subItem.find( ".gift_id" ).text();
            var price = $subItem.find( ".price b" ).text();
            var targetUserId = this.model.get( "UserId" );

            commonOperate.sendGift( targetUserId , giftId , price );
        } ,//}}}

        getContacesInfo: function() {
        //{{{
            if( !helper.isInfoPercentFullfill() ) {
                helper.goToFillInfo();
                return false;
            }

            commonOperate.getUserContactInfo( this.model );
        } ,//}}}

        goDetailPage: function( event ) {
        //{{{
            event.stopImmediatePropagation();

            var userId = $( event.target ).attr( "data-user_id" );
            if( !isNaN( userId ) ) {
                window.router.navigate( "user_detail/" + userId , {trigger: true} );
            }
        } ,//}}}

        goToDiaryDetail: function( event ) {
        //{{{
            var diaryId = $( event.target ).find( ".diary_id" ).text();

            if( !isNaN( diaryId ) ) {
                window.router.navigate( "diary_detail/" + diaryId , {trigger: true} );
            }
        } ,//}}}

        //相当于一个相册的插件 每次只需要传递
        //给该插件一个相片地址的数组 并将其设置为
        //可见就可以了
        showAlbum: function( event ) {
        //{{{
            var $target = $( event.target );
            var targetSrc = $target.attr( "origin_src" );
            var $albumSlider = $( "#album_slider" );
            var $albumSliderPicture = $albumSlider.find( ".picture_item" );

            //获取用户所有图片的列表 并将其 src 组装成一个 array
            var $userPictureList = this.$el.find( ".user_album .user_picture" );
            var pictureSrcList = _.reduce(
                $userPictureList , 
                function( memo , picture ) {
                    var $picture = $( picture );
                    memo.push( $picture.attr( "origin_src" ) );

                    return memo;
                } ,
                []
            );
            var pictureSrcListSize = pictureSrcList.length;

            //脚标
            var pictureSrcListIndex = pictureSrcListSize - 1;

            //定位当前图片
            var currIndex = _.indexOf( pictureSrcList , targetSrc );

            helper.showImage( $albumSliderPicture );
            $albumSliderPicture.bind( 
                "load" ,
                function() { 
                    $.ui.hideMask(); 
                }
            );

            //加载当前图片
            $albumSliderPicture.attr( "src" , pictureSrcList[currIndex] );
            if( pictureSrcListSize > 1 ) {
                //显示下一张
                var showNextImg = function() {
                    $.ui.showMask();
                    currIndex = currIndex + 1;
                    if( currIndex > ( pictureSrcListSize - 1 ) ) {
                        //到达最后一张 返回第一张
                        currIndex = 0;
                    }
                    $albumSliderPicture.attr( "src" , pictureSrcList[currIndex] );
                };

                //显示上一张
                var showPrevImg = function() {
                    $.ui.showMask();
                    currIndex = currIndex - 1;
                    if( currIndex < 0 ) {
                        currIndex = pictureSrcListSize - 1;
                    }
                    $albumSliderPicture.attr( "src" , pictureSrcList[currIndex] );
                };

                $albumSlider.on( "swipeLeft" , showPrevImg );
                $albumSlider.on( "swipeRight" , showNextImg );
            }

            $albumSlider.show();
            $albumSlider.on(
                "tap" ,
                function() {
                    $.ui.hideMask();
                    $albumSlider.hide();
                    $albumSliderPicture.attr( "src" , "" );
                } 
            );
        } ,//}}}

        render: function() {
        //{{{
            console.dir( this.model.toJSON() )
            if( this.isSelfPage === true ) {
                this.model.set( "isSelfPage" , true );
            }

            $.ui.updateContentDiv(
                this.divId ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );

            $.ui.loadContent(
                this.divId ,
                false , 
                false , 
 
                "none" 
            );

            helper.showImage( this.$el.find( "img" ) );

            if( this.isSelfPage === true ) {
                $( "header>h1" ).html( "我的主页" );
            } else {
                $.get(
                    "/api/update_brower_status/?object_user_id=" 
                        + window.objectUser.get( "UserId" )
                        + "&&subject_user_id=" + this.subjectUserId
                );
            }

            return this;
        }
    });//}}}

    return UserDetail;
});

