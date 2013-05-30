define([
    "underscore" ,
    "backbone" ,
    "mustache" ,
    "m/search" ,

    "text!tpl/search.html"
] ,
function(
    _ ,
    Backbone ,
    Mustache ,
    SearchModel ,

    searchTpl 
){
    "use strict";

    var Search = Backbone.View.extend({
        template: searchTpl ,

        initialize: function() {
            this.model = new SearchModel();
            _.bindAll( this , "render" , "provinceChange" , "doSearch" );

            //因为对应的 model 是静态的 因此需要手动触发 render
            this.render();

            this.$el = $( "#search" );

            //area 选择下拉菜单
            this.$province = this.$el.find( ".province" );
            this.$cityname = this.$el.find( ".cityname" );

            //待选列表
            this.$citylist = this.$el.find( ".citylist" );

            this.$nickName = this.$el.find( ".nickname" );
            this.$ageMin = this.$el.find( ".age_min" );
            this.$ageMax = this.$el.find( ".age_max" );
            this.$sex = this.$el.find( ".sex" );

            //手动调用一次
            this.provinceChange();
            this.$province.change( this.provinceChange );

            //权宜之计 
            window.doSearch = this.doSearch;
        } ,

        //每次都删除全部 option 之后添加合适的新的元素 
        provinceChange: function( event ) {
            var classname =
                $( this.$province.find( "option" )[ this.$province.get(0).selectedIndex ] ).attr( "class" );
            this.$cityname.find( "option" ).remove();

            this.$cityname.html( this.$citylist.find( "." + classname ).html() );
        } ,

        doSearch: function() {
            var nickName = this.$nickName.val();
            var sex = this.$sex.val();
            var ageMin = this.$ageMin.val();
            var ageMax = this.$ageMax.val();
            var cityname = this.$cityname.val();

            if( ageMin >= ageMax ) {
                var tmp = ageMax;
                ageMax = ageMin;
                ageMin = tmp;
            }

            //保存搜索条件
            window.localStorage.setItem(
                "q:users" ,
                JSON.stringify(
                    {
                        nickName: nickName ,
                        sex: sex ,
                        ageMin: ageMin ,
                        ageMax: ageMax ,
                        location: cityname
                    }
                )
            );

            //转到 #stream 显示之
            window.router.navigate( "#stream/search" , {trigger: true} );
        },

        render: function() {
            $.ui.addOrUpdateDiv(
                "search" ,
                Mustache.to_html(
                    this.template ,
                    this.model.toJSON()
                )
            );
            $.ui.loadContent( "#search" , false , false , "fade" );
            return this;
        }
    });
    return Search;
});

