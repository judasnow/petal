define([
    "underscore" ,
    "backbone" ,

    "m/user_profile_base_info"
],
function( 
    _ ,
    Backbone ,

    userProfileBaseInfo
){
    "use strict";

    var Search = Backbone.Model.extend({

        defaults: userProfileBaseInfo ,

        initialize: function() {
            this.set( "ageRange" , (function( minAge , maxAge ) {
                var i = minAge;
                var ageRange = [];
                while( i <= maxAge ) {
                    ageRange.push( {age: i} );
                    i = i+1;
                }
                return ageRange;
            })( this.get( "minAge" ) , this.get( "maxAge" ) ) );
        }
    });

    return Search;
});


