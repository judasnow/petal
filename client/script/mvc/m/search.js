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
            
        }
    });

    return Search;
});


