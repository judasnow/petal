define([
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "text!tpl/user_detail.html" ,
    "text!tpl/div/header.html" ,
    "text!tpl/div/footer.html" ,
] ,
function(
    _ ,
    Backbone ,
    Mustache ,
    userDetailTpl ,
    headerTpl ,
    footerTpl 
) {
    "use strict";

    var UserDetail = Backbone.View.extend({
        template: userDetailTpl ,

        initialize: function( data ) {
            //此处要考虑到本页面在其他情况下的访问
            //是否存在可能行
            var subjectUserName = data.userName;
            var subjectUserInfoJson = window.localStorage.getItem( "user_info:" + subjectUserName );
            var subjectUserInfo = {};
            if( subjectUserInfoJson !== null ) {
                subjectUserInfo = JSON.parse( subjectUserInfoJson );
            } else {
                //@todo 尝试重新获取?
                //还是显示错误信息?
                alert( "subject user info is empty" );
                return;
            }
            this.$el.append(
                Mustache.to_html(
                    this.template ,
                    {
                        header: headerTpl,
                        footer: footerTpl,
                        userInfo: subjectUserInfo
                    }
                )
            );
        },

        render: function(){
            return this;
        }
    });
    return UserDetail;
});

