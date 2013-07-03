define([
    "underscore" ,
    "backbone" ,
    "mustache" ,

    "m/user_profile_base_info" ,

    "v/menu" ,

    "text!tpl/search.html" ,
    "text!tpl/div/location_select.html" ,

    "lib/common_operate"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,

    UserProfileBaseInfo ,

    MenuView ,

    searchTpl ,
    locationSelectTpl ,

    commonOperate
){
    "use strict";

    var Search = Backbone.View.extend({
        template: searchTpl ,

        el: "#search" ,

        events: {
            "change .province": "provinceChange" ,
            "click .do_search": "doSearch" ,
            "click .select_box": "handleClickSelectSexBox"
        } ,

        initialize: function() {
        //{{{
            new MenuView();

            $.ui.tryAddContentDiv( "search" , "" );

            _.bindAll( 
                this , 
                "render" , 
                "provinceChange" ,
                "doSearch" ,
                "findEls"
             );

            //因为对应的 model 是静态的 因此需要手动触发 render
            this.render();

            //手动调用一次
            this.provinceChange();
        } ,//}}}

        handleClickSelectSexBox: function( event ) {
            var $el = $( event.target );
            this.changeSearchSex( $el );
        } ,

        changeSearchSex: function( $el ) {
            var $parent = $el.parent();

            $parent.find( ".select_box" ).removeClass( "select_box_action" );
            $el.addClass( "select_box_action" );
            this.$sex.val( $el.text() );
        } ,

        findEls: function() {
        //{{{
            //area 选择下拉菜单
            this.$province = this.$el.find( ".province" );
            this.$cityname = this.$el.find( ".cityname" );

            //待选列表
            this.$citylist = this.$el.find( ".citylist" );

            this.$nickName = this.$el.find( ".nickname" );

            this.$sexSelect = this.$el.find( ".sex_select" );
            this.$sex = this.$el.find( ".sex" );
        } ,//}}}

        //每次都删除全部 option 之后添加合适的新的元素
        provinceChange: function() {
        //{{{
            var classname =
                $( this.$province.find( "option" )[ this.$province.get(0).selectedIndex ] ).attr( "class" );
            this.$cityname.find( "option" ).remove();

            this.$cityname.html( this.$citylist.find( "." + classname ).html() );
        } ,//}}}

        doSearch: function() {
        //{{{
            var nickName = this.$nickName.val();
            var sex = this.$sex.val();

            var province = this.$province.val();
            var cityname = this.$cityname.val();
            var location = cityname;
            if( cityname === "不限" ) {
                location = province;
            }

            //保存搜索条件
            window.localStorage.setItem(
                "q:users" ,
                JSON.stringify(
                    {
                        nickName: nickName ,
                        sex: sex ,
                        location: location
                    }
                )
            );

            //转到 #stream 显示之
            window.router.navigate( "/#stream/search" , {trigger: true} );
        },//}}}

        render: function() {
        //{{{
            $.ui.updateContentDiv(
                "search" ,
                Mustache.to_html(
                    this.template ,
                    {} ,
                    {
                        location_select: Mustache.to_html( locationSelectTpl , UserProfileBaseInfo ) 
                    }
                )
            );
            $.ui.loadContent( "#search" , false , false , "none" );
            this.$el = $( "#search" );
            this.findEls();

            //设置默认值
            commonOperate.setDefaultLocationSelect( window.objectUser.get( "location" ) , this.$province , this.$cityname );

            //设置目标性别为当前用户相反
            var sexInEnglish = window.objectUser.get( "sexInEnglish" );

            //这里就可以体现出来 事件处理于逻辑处理的区别
            if( sexInEnglish === "female" ) {
                this.$sex.val( "男" );
                this.changeSearchSex( this.$sexSelect.find( ".male" ) );
            }
            if( sexInEnglish === "male" ) {
                this.$sex.val( "女" );
                this.changeSearchSex( this.$sexSelect.find( ".female" ) );
            }

            return this;
        }//}}}
    });
    return Search;
});

