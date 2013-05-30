define([
    "underscore" ,
    "backbone"
],
function( 
    _ ,
    Backbone
){
    "use strict";

    var Search = Backbone.Model.extend({

        defaults: {
            minAge: 18 ,
            maxAge: 60 ,
            areaList: [
            //{{{
                {
                    province: "四川" ,
                    classname: "sichuan" ,
                    cities: [
                        {cityname: "成都"} ,
                        {cityname: "自贡"}
                    ]
                } ,
                {
                    province: "吉林",
                    classname: "hunan" ,
                    cities: [
                        {cityname: "长春"} 
                    ]
                }
            ]//}}}
        } ,

        initialize: function() {
            this.set( "ageRange" , (function( minAge , maxAge ) {
                var i = minAge;
                var ageRange = [];
                while( i <= maxAge ) {
                    ageRange.push( {age: i} );
                    i = i+1;
                }
                return ageRange;
            })( this.get( "minAge" ) , this.get( "maxAge" ) ) );
        }
    });

    return Search;
});


