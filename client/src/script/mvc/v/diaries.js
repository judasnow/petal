define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "c/diaries" ,

    "v/menu" ,
    "v/stream_base" ,
    "v/diary" ,

    "text!tpl/diaries.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    Diaries ,

    MenuView ,
    StreamBase ,
    DiaryView ,

    diariesTpl
) {
    "use strict";

    var DiariesView = StreamBase.extend({

        initialize: function( args ) {
            new MenuView();
            var diaries = new Diaries();
            this.baseInitialize( "diaries" , diariesTpl , DiaryView , diaries , args.q , args.hash );
        }
    });

    return DiariesView;
});

