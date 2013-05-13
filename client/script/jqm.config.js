define(
    [ "jquery" ],
    function( $ ) {
        "use strict";
        console.log( "bind configure jqm" );
        $(document).bind( "mobileinit", function () {
            console.log( "configure jqm" );
            $.mobile.ajaxEnabled = false;
            $.mobile.linkBindingEnabled = false;
            $.mobile.hashListeningEnabled = false;
            $.mobile.pushStateEnabled = false;
            $.mobile.defaultPageTransition = "none";
            //$('div[data-role="page"]').live('pagehide', function (event, ui) {
            //    $(event.currentTarget).remove();
            //});
        });
    }
);
