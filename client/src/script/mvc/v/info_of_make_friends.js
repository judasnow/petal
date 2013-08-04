define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/info_of_make_friends.html" ,

    "lib/helper"
],
function( 
    _ ,
    Backbone ,
    Mustache ,

    User ,

    infoOfMakeFirendsTpl ,

    helper
){
    "use strict";

    var InfoOfMakeFirends = Backbone.View.extend({
        template: infoOfMakeFirendsTpl ,

        events: {
            "tap .purpose .label": "editPurpose" ,
            "tap .looks .label": "editLooks" ,
            "tap .character .label": "editCharacter" ,
            "tap .sex_idea .label": "editSexIdea" ,
            "tap .interest .label": "editInterest"
        } ,
 
        initialize: function() {
            this.$el = $.ui.addOrUpdateDiv( "info_of_make_friends" , "" );

            _.bindAll( this , "render" , "_setDefaultAttr" );

            this.model = new User();
            this.listenTo( this.model , "change" , this.render );
            this.model.fetch({
                data:{ 
                    user_id: window.objectUser.get( "UserId" )
                }
            });
        } ,

        editPurpose: function( event ) {
            var $label = $( event.currentTarget );
            var $i = $label.find( "i" );
            var $div = $label.parent();

            helper.reverseCheck( $i );
        } ,

        editLooks: function( event ) {
        //{{{
            var $label = $( event.currentTarget );
            var $i = $label.find( "i" );
            var $div = $label.parent();

            helper.reverseCheck( $i );
        } ,//}}}

        editCharacter: function( event ) {
        //{{{
            var $label = $( event.currentTarget );
            var $i = $label.find( "i" );
            var $div = $label.parent();

            helper.reverseCheck( $i );
        } ,//}}}
        
        editSexIdea: function( event ) {
        //{{{
            var $label = $( event.currentTarget );
            var $i = $label.find( "i" );
            var $div = $label.parent();

            helper.reverseCheck( $i );
        } ,//}}}

        editInterest: function( event ){
        //{{{
            var $label = $( event.currentTarget );
            var $i = $label.find( "i" );
            var $div = $label.parent();

            helper.reverseCheck( $i );
        } ,//}}}

        _setDefaultAttr: function() {
            var $purposeItem = this.$el.find( ".purpose" );
            var purposeArray = this.model.get( "MD" ).split( " " );
            helper.setCheckByValue( $purposeItem , purposeArray );

            var $looksItem = this.$el.find( ".looks" );
            var looksArray = this.model.get( "WM" ).split( " " );
            helper.setCheckByValue( $looksItem , looksArray );

            var $characterItem = this.$el.find( ".character" );
            var characterArray = this.model.get( "GX" ).split( " " );
            helper.setCheckByValue( $characterItem , characterArray );

            var $sexIdeaItem = this.$el.find( ".sex_idea" );
            var sexIdeaArray = this.model.get( "XA" ).split( " " );
            helper.setCheckByValue( $sexIdeaItem , sexIdeaArray );

            var $interestItem = this.$el.find( ".interest" );
            var interestArray = this.model.get( "XQ" ).split( " " );
            helper.setCheckByValue( $interestItem , interestArray );

            var $zwmsItem = this.$el.find( ".zwms" );
            var zwms = this.model.get( "ZWMS" );
            if( typeof zwms !== "undefined" ) {
                $zwmsItem.find( ".zwms_input" ).val( zwms );
            }
        } ,

        render: function () {
        //{{{
            $.ui.updateContentDiv(
                "info_of_make_friends" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( 
                "#info_of_make_friends" ,
                false ,
                false ,

                "none" 
            );

            this._setDefaultAttr();

            return this;
        }//}}}
    });

    return InfoOfMakeFirends;
});


