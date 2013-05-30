//用户详细信息页面
define([
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "m/user" ,

    "text!tpl/update_self_profile.html" ,
    "text!tpl/div/header.html" ,
    "text!tpl/div/footer.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,
    User ,

    updateSelfProfileTpl ,
    headerTpl ,
    footerTpl 
) {
    "use strict";

    var UpdateSelfProfile = Backbone.View.extend({
        template: updateSelfProfileTpl ,

        initialize: function() {
            this.model = new User();

            _.bindAll( this , "render" );
            this.model.on( "change" , this.render );
            this.model.fetch({
                data: {
                    user_id: window.objectUser.get( "UserId" )
                }
            });
        } ,

        render: function() {
            $.ui.addOrUpdateDiv(
                "update_self_profile" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent(
                "#update_self_profile" ,
                false , 
                false , 
                "fade" 
            );
            return this;
        }
    });

    return UpdateSelfProfile;
});

