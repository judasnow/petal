//用户详细信息页面
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "m/user" ,

    "text!tpl/user_detail.html" ,
    "text!tpl/div/header.html" ,
    "text!tpl/div/footer.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,
    User ,

    userDetailTpl ,
    headerTpl ,
    footerTpl 
) {
    "use strict";

    var UserDetail = Backbone.View.extend({
        template: userDetailTpl ,

        initialize: function( data ) {
            //通过 ajax 获取相应的用户数据
            //@todo  此处是否需要设置 user model 的 idAttribute 为 UserId ?
            var subjectUserId = data.userId;
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
            //不能使用 add 这一点很重要!
            var funcName = "addContentDiv";
            if( $( "#user_detail" ).length !== 0 ) {
                funcName = "updateContentDiv";
            }
            $.ui[funcName](
                "user_detail" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( "#user_detail/" + this.model.get( "UserId" ) , false , false , "fade" );
            return this;
        }
    });

    return UserDetail;
});

