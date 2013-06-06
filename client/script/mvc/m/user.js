define([
    "underscore" ,
    "backbone"
],
function( 
    _ ,
    Backbone
){
    "use strict";

    var User = Backbone.Model.extend({

        url: "/api/user/",

        initialize: function() {
            var birthday = new Date( this.get( "CSRQ" ) );
            var today = new Date();
            this.set( "Age" , today.getYear() - birthday.getYear() );

            this.set( "isFamale" , this.get( "Sex" ) === "女" ? true : false );
        }
    });

    return User;
});


