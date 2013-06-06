//用户主目录
define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "m/user" ,

    "text!tpl/menu.html" 
],
function( 
    _ , 
    Backbone ,
    Mustache ,
    User ,

    menuTpl
){
    "use strict";

    var MenuView = Backbone.View.extend({
        template: menuTpl ,

        el: "#menu" ,

        events: {
            "tap #object_user_info": "showObjectUserHome" ,

            "tap .stream_same_city": "showSameCityStream" ,
            "tap .search": "showSearch" ,
            "tap .tweet": "showTweet" ,
            "tap .gifts": "showGifts" ,
            //"tap .visitors": "showVisitors" ,
            "tap .had_bought_contact_info": "showHadBoughtContactInfo" ,
            "tap .msgs": "showMsgs" ,
            "tap .contacts": "showContacts" ,
            "tap .buy_coin": "showBuyCoin" ,
            //"tap .buy_vip": "showBuyVip" ,
            "tap .payment_record": "showPatmentRecord" ,
            "tap .coupons": "showCoupons"
        } ,

        initialize: function() {

            _.bindAll( 
                this , 
                "render" , "showObjectUserHome" , "showSameCityStream" , "showSearch" );
            this.model = new User();
            this.model.on( "change" , this.render );

            //使用 object_user_info 渲染之
            this.model.set( window.objectUser.toJSON() );
        } ,

        showObjectUserHome: function() {
            window.router.navigate( "#user_detail/self" , {trigger: true} );
        } ,

        showSearch: function() {
            window.router.navigate( "#search" , {trigger: true} );
        } ,

        showSameCityStream: function() {
            window.router.navigate( "#stream" , {trigger: true} );
        } ,

        //发表今日说说
        showTweet: function() {
            window.router.navigate( "#tweet/self" , {trigger: true} );
        } ,

        showGifts: function() {
            window.router.navigate( "#gifts/self/received" , {trigger: true} );
        } ,

        //showVisitors: function() {
        //    window.router.navigate( "#stream/visitors/self" , {trigger: true} );
        //} ,

        showHadBoughtContactInfo: function() {
            window.router.navigate( "#stream/had_bought_contact_info/self" , {trigger: true} );
        },

        //最近的消息
        showMessage: function() {
            window.router.navigate( "#message/self" , {trigger: true} );
        },

        //最近联系人
        showContacts: function() {
            window.router.navigate( "#stream/contacts/self/object" , {trigger: true} );
        },

        //消费记录
        showPatmentRecord: function() {
            window.router.navigate( "#payment_record/self" , {trigger: true}  );
        },

        showCoupons: function() {
            window.router.navigate( "#coupons/self" , {trigger: true} );
        },

        showBuyCoin: function() {
            window.router.navigate( "#buy_coin" , {trigger: true} );
        },

        //showBuyVip: function() {
        //    window.router.navigate( "#buy_vip" , {trigger: true} );
        //},

        showMsgs: function() {
            window.router.navigate( "#msgs" , {trigger: true} );
        },

        render: function() {
            $.ui.updateSideMenu(
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                ) 
            );

            return this;
        }
    });

    return MenuView;
});
