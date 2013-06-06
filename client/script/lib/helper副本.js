//
// 一些辅助函数
// @author <judasnow@gmail.com>
//
define( [
] , function( ){
        var helper = {
                //浮点数乘法
                FloatMul: function( arg1 , arg2 ){
                        var m=0,s1=arg1.toString(),s2=arg2.toString(); 
                        try{m+=s1.split(".")[1].length}catch(e){} 
                        try{m+=s2.split(".")[1].length}catch(e){} 
                        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
                },
                //浮点数加法
                FloatAdd: function( arg1 , arg2 ){   
                        var r1 , r2 , m;
                        try{
                                r1=arg1.toString().split(".")[1].length;
                        }catch(e){
                                r1=0; 
                        }
                        try{
                                r2=arg2.toString().split(".")[1].length;
                        }catch(e){
                                r2=0
                        }
                        m = Math.pow(10,Math.max(r1,r2));
                        return ( parseInt( this.FloatMul( arg1 , m ) ) + parseInt( this.FloatMul( arg2 , m ) ) ) / m;
                },
                count_length: function( text ){
                        var reg = new RegExp( '[^\x00-\xff]' );
                        var not_cc_count = 0;
                        var user_input_string_array = text.split( '' );
                        var length = 0;
                        for ( var i in user_input_string_array ){
                                if( reg.test( user_input_string_array[i] ) ? true : false ){
                                        //为汉字加1
                                        length++;
                                }else{
                                        //不为汉字 计数器加1
                                        not_cc_count++;	 
                                        if( not_cc_count == 2 ){
                                                length++;
                                                not_cc_count = 0;
                                        }
                                }
                        }
                        if( not_cc_count == 1 ){
                                length++;
                        } 
                        return length;
                }
        }
        return helper;
});
