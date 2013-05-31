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

    var UserDetail = Backbone.View.extend({
        template: userDetailTpl ,

        initialize: function( data ) {
            //通过 ajax 获取相应的用户数据
            //@todo  此处是否需要设置 user model 的 idAttribute 为 UserId ?
            var subjectUserId = data.userId;
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

        render: function() {
            $.ui.addOrUpdateDiv(
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

