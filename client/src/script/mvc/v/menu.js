define([ 
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user" ,

    "text!tpl/menu.html" ,

    "lib/helper"
],
function( 
    _ , 
    Backbone ,
    Mustache ,

    User ,

    menuTpl ,

    helper 
){
    "use strict";

    var MenuView = Backbone.View.extend({
        template: menuTpl ,

        el: "#menu" ,

        events: {
            "tap #object_user_info": "showObjectUserHome" ,
            "tap .stream_same_city": "showSameCityStream" ,
            "tap .search": "showSearch" ,
            "tap .diary": "showDiary" ,
            "tap .gifts": "showGifts" ,
            "tap .had_bought_contact_info": "showHadBoughtContactInfo" ,
            "tap .msgs": "showMsgs" ,
            "tap .visitors": "showVisitors" ,
            "tap .buy_coin": "showBuyCoin" ,
            "tap .payment_record": "showPatmentRecord" ,
            "tap .coupons": "showCoupons" ,
            "tap .service": "showService"
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
            window.router.navigate( "user_detail/" + window.objectUser.get( "UserId" ) , {trigger: true} );
        } ,

        showSearch: function() {
            window.router.navigate( "search" , {trigger: true} );
        } ,

        showSameCityStream: function() {
            window.router.navigate( "stream" , {trigger: true} );
        } ,

        showDiary: function() {
            window.router.navigate( "diaries" , {trigger: true} );
        } ,

        showGifts: function() {
            window.localStorage.setItem( "petal:new_gifts_count" , "0" );
            window.router.navigate( "gifts/self/received" , {trigger: true} );
        } ,

        showVisitors: function() {
            window.localStorage.setItem( "petal:new_visitors_count" , "0" );
            window.router.navigate( "stream/visitors/self/" , {trigger: true} );
        } ,

        showHadBoughtContactInfo: function() {
            window.router.navigate( "stream/had_bought_contact_info/self" , {trigger: true} );
        },

        //消费记录
        showPatmentRecord: function() {
            window.router.navigate( "payment_record/self" , {trigger: true}  );
        },

        showCoupons: function() {
            window.router.navigate( "coupons/self" , {trigger: true} );
        },

        showBuyCoin: function() {
            window.router.navigate( "buy_coin" , {trigger: true} );
        },

        showMsgs: function() {
            //清空新消息的计数
            window.localStorage.setItem( "petal:new_msgs_count" , "0" );
            window.router.navigate( "msgs" , {trigger: true} );
        },

        showService: function() {
            window.router.navigate( "service" , {trigger: true} );
        },

        render: function() {
            $.ui.updateSideMenu(
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            helper.showImage( this.$el.find( "img" ) );
            window.updateMenuNotice();
            return this;
        }
    });

    return MenuView;
});
