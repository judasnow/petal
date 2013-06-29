define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/object_user" ,

    "text!tpl/login.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    ObjectUserModel ,

    loginTpl 
){
    "use strict";

    var LoginView = Backbone.View.extend({
        template: loginTpl,

        events: {
            "click #do_login": "doLogin"
        } ,

        initialize: function() {
            $.ui.toggleHeaderMenu( false ); 
            _.bindAll( this , "doLogin" , "loginOk" , "loginFail" );
        } ,

        doLogin: function() {
            //错误提示信息
            this.$alertPositionHolder.removeClass( "alert" ).text( "" );

            var $username = this.$el.find( "#username" );
            var $password = this.$el.find( "#password" );
            var username = $username.val();
            var password = $password.val();

            if( username === "" || password === "" ) {
                this.$alertPositionHolder.addClass( "alert" ).text( "请输入完整的用户和密码" );
            } else {
            }
        } ,

        loginOk: function( data ) {
            //@todo 返回的就一定是 json ? 
            //另外 是否需要保存该信息

            //直接保存 json string 
            window.localStorage.setItem( "petal:object_user_info" , data.object_user_info );
            window.route.navigate( "stream" , {trigger : true} );
        } ,

        loginFail: function( data ) {
            this.$alertPositionHolder.addClass( "alert" ).text( "用户名或密码错误" );
        } ,

        render: function() {
            this.$el.append( this.template );
            $.ui.addContentDiv( "login" , this.$el.html() );
            return this;
        }
    });

    return LoginView;
});
