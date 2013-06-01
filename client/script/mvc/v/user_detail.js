//用户详细信息页面
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/user_detail.html" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,
    User ,

    userDetailTpl 
) {
    "use strict";

    $.ui.addContentDiv( "user_detail" );

    var UserDetail = Backbone.View.extend({
        template: userDetailTpl ,
        el: "#user_detail" ,
        events: {
            "click .report_is_user": "showReportSelect"
        } ,

        initialize: function( data ) {
            _.bindAll( this , "doReport" , "showReportSelect" );

            var subjectUserId = data.subjectUserId;

            //需要判断是否是当前登录用户自己的主页
            this.objectUserPage = (typeof data.objectUserPage !== "undefined" ? data.objectUserPage : false );
            this.model = new User();

            _.bindAll( this , "render" );
            this.model.on( "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: subjectUserId
                }
            });
        } ,

        //展示举报选项
        showReportSelect: function() {
            $.ui.popup({
                title: "确认举报内容" ,
                message: $( "#report_select_tpl" ).html() ,
                cancelText: "算了", 
                doneText: "提交",
                doneCallback: this.doReport
            });
        },

        doReport: function() {
            //利用同一时间只能有一个 .jqPopup 可以由此来获取
            //用户填写的值
            var subjectUserId = this.model.get( "UserId" );
            (function( $jqPopup ) {
                var reasonNo = $jqPopup.find( "input[name=report_reason]:checked" ).val();
                var reasonDetail = $jqPopup.find( "input[name=report_detail]" ).val();
                if( typeof reasonNo !== "undefind" ) {
                //举报类型是必选的
                    $.post( 
                        "/api/report_user/" , 
                        {
                            subject_user_id: subjectUserId ,
                            object_user_id: window.objectUser.get( "UserId" ) ,
                            reason_no: reasonNo ,
                            reason_detail: reasonDetail
                        },
                        function( data ) {
                            alert( "举报成功" )
                        }
                    );
                }
            })( $( ".jqPopup" ) );
        } ,

        render: function() {
            $.ui.updateContentDiv(
                "user_detail" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            if( this.objectUserPage === true ) {
                //若为用户个人主页 则需要进行一些特殊的处理
                //显示编辑按钮 用户点击之后需要变成保存按钮
                $( "header>.update_self_profile" ).show();
                $( "header>h1" ).html( "我的主页" );
            }
            $.ui.loadContent(
                "#user_detail/" +
                ( this.objectUserPage === true ? "self" : this.model.get( "UserId" ) ) , 
                false , 
                false , 
                "fade" 
            );
            return this;
        }
    });

    return UserDetail;
});

