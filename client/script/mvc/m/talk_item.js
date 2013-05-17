define([
    "jquery" ,
    "underscore" ,
    "backbone"
],
function( 
    $ ,
    _ ,
    Backbone
){
    "use strict";

    var TalkItem = Backbone.Model.extend({
        url: "talk_item",

        initialize: function(){
            
        }
    });

    return TalkItem;
});


