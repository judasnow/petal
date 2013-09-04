define([ 
    "underscore" ,
    "backbone" ,

    "m/object_user" ,

    "v/stream" ,
    "v/search" ,
    "v/user_detail" ,

    "v/update_self_profile" ,
    "v/info_of_make_friends" ,
    "v/upload_picture" ,

    "v/gift_list" ,
    "v/chat_list" ,
    "v/gifts" ,
    "v/buy_coin" ,
    "v/payment_record" ,
    "v/coupons" ,
    "v/had_bought_contact_info" ,
    "v/visitors" ,
    "v/msgs" ,
    "v/service" ,

    "v/diaries" ,
    "v/add_new_diary" ,
    "v/diary_detail" ,
    "v/modify_diary",

    "text!tpl/error404.html"
] ,
function(
    _ ,
    Backbone ,
    ObjectUserModel ,

    StreamView ,
    SearchView ,
    UserDetailView ,
    UpdateSelfProfileView ,
    InfoOfMakeFriendsView ,
    UploadPictureView ,

    GiftListView ,
    ChatListView ,
    GiftsView ,
    BuyCoinView ,
    PaymentRecordView ,
    CouponsView ,
    HadBoughtContactInfoView ,
    VisitorsView ,
    MsgsView ,
    ServiceView ,

    DiariesView ,
    AddNewDiaryView ,
    DiaryDetailView ,
    ModifyDiaryView ,

    error404Tpl
) {
    "use strict";

    var Router = Backbone.Router.extend({

        routes: {
        //{{{
            //默认页面
            "": "showStream" ,
            "stream": "showStream" ,
            "stream/search": "showSearchResultStream" ,

            "search": "showSearch" ,

            "gift_list/:giftClass": "showGiftList" ,
            "gift_list": "showGiftList" ,

            "user_detail/:userId": "showUserDetail" ,

            "update_self_profile": "showUpdateSelfProfile" ,
            "marital_status": "showMaritalStatus" ,
            "career": "showCareer" ,
            "offer": "showOffer" ,
            "want": "showWant" ,
            "info_of_make_friends": "showInfoOfMakeFriends" ,
            "upload_picture": "showUploadPicture" ,

            "diaries/:user_id": "showDiaries" ,
            "diaries": "showDiaries" ,
            "add_new_diary": "showAddNewDiary" ,
            "modify_diary/:id": "showModifyDiary" ,
            "diary_detail/:id": "showDiaryDetail" ,

            "gifts/self/received": "showSelfReceivedGifts" ,

            "stream/had_bought_contact_info/self": "showSelfHadBoughtContactInfo",
            "stream/visitors/self/": "showSelfVisitors" ,

            "message/self": "showSelfMessage" ,
            "payment_record/self": "showSelfPaymentRecord" ,
            "coupons/self": "showSelfCoupons" ,
            "buy_coin": "showBuyCoin" ,

            "chat_list": "showChatList" ,

            "msgs": "showMsgs" ,

            "service": "showService" ,

            ":whatever"  : "notFound" 

        },//}}}

        initialize: function () {
        //{{{
            //_.bindAll( this , "showStream" , "showSearch" , "showSearchResultStream" );
        },//}}}

        notFound: function() {
        //{{{
            $.ui.addOrUpdateDiv( "error404" , error404Tpl );
            $.ui.loadContent( "error404" , false , false , "" );
        },//}}}

        //默认显示附近的人 也就是以用户当前所在地作为查询条件
        showStream: function() {
        //{{{
            var q = JSON.stringify( {location: window.objectUser.get( "AreaDes" )} );
            new StreamView({
                q: q ,
                hash: "#stream"
            });
        },//}}}

        showSearch: function() {
        //{{{
            new SearchView();
        },//}}}

        //显示查询结果 在 localstore 中读取
        showSearchResultStream: function() {
        //{{{
            var q = window.localStorage.getItem( "q:users" );
            if( q === null ) {
                q = "{}";
            }
            new StreamView({
                q: q ,
                hash: "#stream/search"
            });
        },//}}}

        //用户主页
        showUserDetail: function( userId ) {
        //{{{
            new UserDetailView({
                subjectUserId: userId
            });
        },//}}}

        //当前登录用户修改资料页面
        showUpdateSelfProfile: function() {
        //{{{
            new UpdateSelfProfileView();
        } ,//}}}

        //diary
        showDiaries: function( userId ) {
        //{{{
            if( typeof userId === "undefined" || userId === "" ) {
                userId = window.objectUser.get( "UserId" );
            }
            new DiariesView({
                    q: JSON.stringify({ user_id: userId }) ,
                    hash: "#diaries/" + userId
            });
        },//}}}

        showAddNewDiary: function() {
        //{{{
            new AddNewDiaryView();  
        },//}}}

        showModifyDiary: function( id ) {
        //{{{
            new ModifyDiaryView({ diary_id: id });
        },//}}}

        showDiaryDetail: function( id ) {
        //{{{
            new DiaryDetailView({ diary_id: id });
        } ,//}}}

        showMaritalStatus: function() {
        //{{{
            new MaritalStatusView();
        } ,//}}}

        showCareer: function() {
        //{{{
            new CareerView();
        } ,//}}}

        showWant: function() {
        //{{{
            new WantView();
        } ,//}}}

        showOffer: function() {
        //{{{
            new OfferView();
        } ,//}}}

        showInfoOfMakeFriends: function() {
        //{{{
            new InfoOfMakeFriendsView();
        } ,//}}}

        showUploadPicture: function() {
        //{{{
            new UploadPictureView();
        } ,//}}}

        showSelfReceivedGifts: function() {
        //{{{
            new GiftsView(
                {
                    q: JSON.stringify(
                           {
                                "what": "received" ,
                                "object_user_id": window.objectUser.get( "UserId" )
                           }
                        ) ,
                    hash: ( "#gifts/self/received" )
                }
            );
        },//}}}

        showGiftList: function( giftClass ) {
        //{{{
            new GiftListView(
            {
                q: "" ,
                hash: "#gift_list"
            });
        },//}}}

        showChatList: function() {
        //{{{
            new ChatListView();
        },//}}}

        showBuyCoin: function() {
        //{{{
            new BuyCoinView();
        },//}}}

        showBuyVip: function() {
        //{{{
            new BuyVipView();
        },//}}}

        showSelfPaymentRecord: function() {
        //{{{ContacesView
            new PaymentRecordView({
                q:  JSON.stringify(
                   {
                        "object_user_id": window.objectUser.get( "UserId" )
                   }
                ) ,
                hash: "#payment_record/self"
            });
        },//}}}

        showSelfCoupons: function() {
        //{{{i
            new CouponsView();
        },//}}}

        //本人已经购买了联系方式的用户列表
        showSelfHadBoughtContactInfo: function() {
        //{{{
            new HadBoughtContactInfoView({
                q: JSON.stringify(
                    {
                        what: "had_bought_contact_info" ,
                        "object_user_id": window.objectUser.get( "UserId" )
                    }
                ) ,
                hash: "#stream/had_bought_contact_info/self"
            });
        } ,//}}}

        //访问过当前用户的用户列表
        showSelfVisitors: function() {
        //{{{
            new VisitorsView({
                q: JSON.stringify(
                    {
                        what: "visitors" ,
                        "object_user_id": window.objectUser.get( "UserId" )
                    }
                ) ,
                hash: "#stream/visitors/self/"
            });
        } ,//}}}

        //@todo 需要区分列出各种信息
        showMsgs: function() {
        //{{{
            new MsgsView({
                q: JSON.stringify({
                    "user_id": window.objectUser.get( "UserId" )
                }) ,
                hash: "#msgs"
            });
        },//}}}

        showService: function() {
        //{{{
            new ServiceView();
        }//}}}
    });

    return Router;
});

