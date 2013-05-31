define([

],
function(

){
    //用户资料的选项信息
    var userProfileBaseInfo = {
        minAge: 18 ,
        maxAge: 60 ,
        areaList: [
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
        ]
    };

    return userProfileBaseInfo;
});

