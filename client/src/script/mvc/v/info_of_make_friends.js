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
            "tap .interest .label": "editInterest" ,

            "tap .do_update": "doUpdate"
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

        doUpdate: function() {
            var purpose = helper.getCheckLabel( this.$purposeItem );
            var looks = helper.getCheckLabel( this.$looksItem );
            var character = helper.getCheckLabel( this.$characterItem );
            var sexIdea = helper.getCheckLabel( this.$sexIdeaItem );
            var interest = helper.getCheckLabel( this.$interestItem );
            var zwms = this.$zwmsInput.val();

            $.post(
                "/api/user/" ,
                {
                    user_id: window.objectUser.get( "UserId" ) ,
                    purpose: purpose ,
                    looks: looks ,
                    character: character ,
                    sex_idea: sexIdea ,
                    interest: interest ,
                    zwms: zwms
                } ,
                function( data ) {
                    console.dir( data )
                }
            );
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

        //@XXX 重复需要修改
        _setDefaultAttr: function() {
            var $purposeItem = this.$el.find( ".purpose" );
            this.$purposeItem = $purposeItem;
            var purpose = this.model.get( "MD" );
            helper.setCheckByValue( $purposeItem , purpose );

            var $looksItem = this.$el.find( ".looks" );
            this.$looksItem = $looksItem;
            var looks = this.model.get( "WM" );
            helper.setCheckByValue( $looksItem , looks );

            var $characterItem = this.$el.find( ".character" );
            this.$characterItem = $characterItem;
            var character = this.model.get( "GX" );
            helper.setCheckByValue( $characterItem , character );

            var $sexIdeaItem = this.$el.find( ".sex_idea" );
            this.$sexIdeaItem = $sexIdeaItem;
            var sexIdea = this.model.get( "XA" );
            helper.setCheckByValue( $sexIdeaItem , sexIdea );

            var $interestItem = this.$el.find( ".interest" );
            this.$interestItem = $interestItem;
            var interest = this.model.get( "XQ" );
            helper.setCheckByValue( $interestItem , interest );

            var $zwmsItem = this.$el.find( ".zwms" );
            var $zwmsInput = $zwmsItem.find( ".zwms_input" );
            this.$zwmsInput = $zwmsInput;
            var zwms = this.model.get( "ZWMS" );
            if( typeof zwms !== "undefined" ) {
                $zwmsInput.val( zwms );
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


