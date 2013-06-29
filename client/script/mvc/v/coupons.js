define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "v/menu" ,

    "text!tpl/coupons.html" 
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    User ,

    MenuView ,

    couponsTpl
) {
    "use strict";

    $.ui.addContentDiv( "coupons" , "" );

    var Coupons = Backbone.View.extend({
        template: couponsTpl ,
        el: "#coupons" ,
        events: {
            "click .set_bank_account": "showBankAccountSelect" ,
            "click .withdraw": "doWithdraw"
        },

        initialize: function() {
            new MenuView();

            _.bindAll( this , "showBankAccountSelect" , "setBankAccount" , "doWithdraw" );

            this.model = new User();
            this.listenTo( this.model , "change" , this.render );

            this.model.set( window.objectUser.toJSON() );

            this.setBankAccountTpl = this.$el.find( "#set_bank_account_tpl" ).html();
        } ,

        showBankAccountSelect: function() {
            $.ui.popup({
                title: "设置提现银行信息" ,
                message: this.setBankAccountTpl ,
                doneCallback: this.setBankAccount
            });
        } ,

        setBankAccount: function() {
            (function( bank_name , account_No , account_name ){
                if( bank_name === "" || account_No === "" || account_name === "" ) {
                    alert( "信息不完整" );
                    return;
                } else {
                    $.post(
                        "/api/set_back_account" , 
                        {
                            user_id: window.objectUser.get( "UserId" ) ,
                            bank_name: bank_name ,
                            account_No: account_No ,
                            account_name: account_name
                        },
                        function( data ) {
                            //更新当前 objectUser model
                            alert( "设置成功" );
                        }
                    );
                }
            })( 
                $( ".jqPopup .bank_name" ).val(), 
                $( ".jqPopup .account_No" ).val() , 
                $( ".jqPopup .account_name" ).val()
            );
        } ,

        doWithdraw: function() {
            (function( amount ) {
                if( amount === "" || isNaN( amount ) ) {
                    return;
                } else {
                    $.post( "/api/withdraw_cash" , 
                        {
                            user_id: window.objectUser.get( "UserId" ) ,
                            amount: amount
                        } ,
                        function( data ) {
                            alert( "提现信息已经等级,请耐心等待管理员审核" );
                        },
                        function( data ) {
                            alert( "提现操作失败" );
                        }
                    );
                }
            })( this.$el.find( ".amount" ).val() );
        } ,

        render: function() {
             $.ui.updateContentDiv( 
                "coupons" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( "#coupons/self" , false , false , "none" );
        }
    });

    return Coupons;
});

