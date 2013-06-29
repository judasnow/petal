define([

],
function(

){
    //用户资料的选项信息
    var userProfileBaseInfo = {
        minAge: 18 ,
        maxAge: 60 ,
        areaListWithId: {
        //{{{
    "北京": 131,
    "上海": 130,
    "重庆": 105,
    "合肥": 1115,
    "安庆": 1122,
    "蚌埠": 1117,
    "亳州": 1129,
    "巢湖": 1116,
    "滁州": 1124,
    "阜阳": 1125,
    "淮北": 1120,
    "黄山": 1123,
    "六安": 1128,
    "马鞍山": 1119,
    "宿州": 1126,
    "铜陵": 1121,
    "芜湖": 1116,
    "宣城": 1131,
    "福州": 1132,
    "龙岩": 1139,
    "南平": 1138,
    "宁德": 1140,
    "莆田": 1134,
    "泉州": 1136,
    "三明": 1135,
    "厦门": 1133,
    "漳州": 1137,
    "兰州": 1258,
    "白银": 1261,
    "定西": 1268,
    "甘南": 1271,
    "金昌": 1260,
    "酒泉": 1266,
    "临夏": 1270,
    "平凉": 1265,
    "天水": 1262,
    "武威": 1263,
    "嘉峪关": 1259,
    "张掖": 1264,
    "庆阳": 1267,
    "陇南": 1269,
    "广州": 1218,
    "潮州": 1236,
    "东莞": 1234,
    "佛山": 1223,
    "河源": 1231,
    "惠州": 1228,
    "江门": 1224,
    "揭阳": 1237,
    "茂名": 1226,
    "梅州": 1229,
    "清远": 1233,
    "汕头": 1221,
    "汕尾": 1230,
    "韶关": 1222,
    "深圳": 1219,
    "阳江": 1232,
    "云浮": 1238,
    "湛江": 1225,
    "肇庆": 1227,
    "中山": 1235,
    "珠海": 1220,
    "南宁": 1321,
    "百色": 1326,
    "北海": 1334,
    "桂林": 1322,
    "防城港": 1333,
    "河池": 1323,
    "贺州": 1324,
    "柳州": 1325,
    "来宾": 1327,
    "钦州": 1332,
    "梧州": 1328,
    "贵港": 1329,
    "玉林": 1330,
    "崇左": 1331,
    "贵阳": 1000,
    "安顺": 1003,
    "毕节": 1005,
    "六盘水": 1001,
    "铜仁": 1004,
    "遵义": 1002,
    "黔西南": 1006,
    "黔东南": 1007,
    "黔南": 1008,
    "海口": 1239,
    "三亚": 1240,
    "五指山": 1241,
    "琼海": 1242,
    "儋州": 1243,
    "文昌": 1244,
    "万宁": 1247,
    "东方": 1246,
    "定安": 1247,
    "屯昌": 1247,
    "澄迈": 1247,
    "临高": 1247,
    "白沙黎族": 1247,
    "昌江黎族": 1247,
    "乐东黎族": 1247,
    "陵水黎族": 1247,
    "保亭黎族": 1247,
    "琼中黎族": 1247,
    "西沙群岛": 1247,
    "南沙群岛": 1247,
    "中沙群岛": 1247,
    "石家庄": 984,
    "保定": 1301,
    "沧州": 1304,
    "承德": 1303,
    "邯郸": 1299,
    "衡水": 1306,
    "廊坊": 1305,
    "秦皇岛": 1298,
    "唐山": 1297,
    "邢台": 1300,
    "张家口": 1302,
    "哈尔滨": 1089,
    "大庆": 1094,
    "大兴安岭": 1101,
    "鹤岗": 1092,
    "黑河": 1099,
    "佳木斯": 1096,
    "鸡西": 1091,
    "牡丹江": 1098,
    "齐齐哈尔": 1090,
    "七台河": 1097,
    "双鸭山": 1093,
    "绥化": 1100,
    "伊春": 1095,
    "郑州": 1170,
    "鹤壁": 1175,
    "焦作": 1174,
    "开封": 1171,
    "漯河": 1180,
    "洛阳": 1172,
    "南阳": 1182,
    "平顶山": 1173,
    "濮阳": 1178,
    "三门峡": 1181,
    "商丘": 1183,
    "新乡": 1176,
    "信阳": 1184,
    "许昌": 1179,
    "周口": 1185,
    "驻马店": 1186,
    "香港": 1309,
    "九龙": 1307,
    "新界": 1308,
    "武汉": 1187,
    "恩施": 1199,
    "鄂州": 1194,
    "黄冈": 1196,
    "黄石": 1188,
    "荆门": 1193,
    "荆州": 1191,
    "潜江": 1201,
    "十堰": 1190,
    "随州": 1198,
    "仙桃": 1200,
    "咸宁": 1197,
    "襄樊": 1189,
    "孝感": 1195,
    "宜昌": 1192,
    "长沙": 1204,
    "常德": 1210,
    "郴州": 1213,
    "衡阳": 1207,
    "怀化": 1215,
    "娄底": 1216,
    "邵阳": 1208,
    "湘潭": 1206,
    "益阳": 1212,
    "岳阳": 1209,
    "永州": 1214,
    "张家界": 1211,
    "株洲": 1205,
    "湘西": 1218,
    "南京": 1102,
    "常州": 1105,
    "淮安": 1109,
    "连云港": 1108,
    "南通": 1107,
    "宿迁": 1114,
    "苏州": 1106,
    "泰州": 1113,
    "无锡": 1103,
    "徐州": 1104,
    "盐城": 1110,
    "扬州": 1111,
    "镇江": 1112,
    "南昌": 1141,
    "抚州": 1150,
    "赣州": 1147,
    "吉安": 1148,
    "景德镇": 1142,
    "九江": 1144,
    "萍乡": 1143,
    "上饶": 1151,
    "新余": 1145,
    "宜春": 1149,
    "鹰潭": 1146,
    "长春": 1080,
    "白城": 1087,
    "白山": 1085,
    "辽源": 1083,
    "吉林": 1081,
    "四平": 1082,
    "松原": 1086,
    "通化": 1084,
    "延边": 1088,
    "沈阳": 1066,
    "鞍山": 1068,
    "本溪": 1070,
    "朝阳": 1078,
    "大连": 1067,
    "丹东": 1071,
    "抚顺": 1069,
    "阜新": 1074,
    "葫芦岛": 1079,
    "锦州": 1072,
    "辽阳": 1075,
    "盘锦": 1076,
    "铁岭": 1077,
    "营口": 1073,
    "澳门": 569,
    "呼和浩特": 1054,
    "包头": 1055,
    "鄂尔多斯": 1059,
    "乌海": 1056,
    "乌兰察布": 1062,
    "通辽": 1058,
    "赤峰": 1057,
    "巴彦淖尔": 1061,
    "锡林郭勒": 1064,
    "呼伦贝尔": 1060,
    "兴安盟": 1063,
    "阿拉善": 1065,
    "银川": 1281,
    "固原": 1284,
    "中卫": 1285,
    "石嘴山": 1282,
    "吴忠": 1283,
    "西宁": 1272,
    "海东": 1274,
    "玉树": 1279,
    "海北": 1275,
    "黄南": 1276,
    "海南": 1277,
    "果洛": 1278,
    "海西": 1280,
    "济南": 1152,
    "滨州": 1167,
    "德州": 1165,
    "东营": 1156,
    "菏泽": 1168,
    "济宁": 1160,
    "莱芜": 1163,
    "聊城": 1166,
    "临沂": 1164,
    "青岛": 1153,
    "日照": 1162,
    "泰安": 1161,
    "潍坊": 1158,
    "威海": 1159,
    "烟台": 1157,
    "枣庄": 1155,
    "淄博": 1154,
    "太原": 1043,
    "长治": 1046,
    "大同": 1044,
    "晋城": 1047,
    "临汾": 1052,
    "朔州": 1048,
    "忻州": 1051,
    "阳泉": 1045,
    "运城": 1050,
    "晋中": 1049,
    "吕梁": 1053,
    "西安": 1248,
    "安康": 1256,
    "宝鸡": 1250,
    "汉中": 1254,
    "渭南": 1252,
    "铜川": 1249,
    "咸阳": 1251,
    "延安": 1253,
    "榆林": 1255,
    "商洛": 1257,
    "成都": 546,
    "巴中": 845,
    "达州": 843,
    "德阳": 831,
    "广安": 842,
    "广元": 835,
    "乐山": 838,
    "泸州": 834,
    "绵阳": 830,
    "眉山": 840,
    "南充": 839,
    "内江": 837,
    "攀枝花": 833,
    "遂宁": 836,
    "雅安": 844,
    "宜宾": 841,
    "自贡": 832,
    "资阳": 846,
    "阿坝": 847,
    "甘孜": 848,
    "台北": 1311,
    "基隆": 1312,
    "台南": 1314,
    "台中": 1313,
    "新竹": 1315,
    "嘉义": 1316,
    "天津": 128,
    "乌鲁木齐": 1286,
    "阿克苏": 1291,
    "阿勒泰": 1294,
    "哈密": 1289,
    "和田": 1290,
    "喀什": 1292,
    "克拉玛依": 1287,
    "石河子": 1295,
    "塔城": 1293,
    "吐鲁番": 1288,
    "拉萨": 1025,
    "昌都": 1026,
    "林芝": 1031,
    "那曲": 1029,
    "日喀则": 1028,
    "山南": 1027,
    "昆明": 1009,
    "保山": 1012,
    "楚雄": 1020,
    "大理": 1021,
    "临沧": 1016,
    "丽江": 1014,
    "曲靖": 1010,
    "红河": 1018,
    "文山": 1017,
    "西双版纳": 1019,
    "玉溪": 1011,
    "昭通": 1013,
    "普洱": 1015,
    "德宏": 1022,
    "怒江": 1023,
    "迪庆": 1024,
    "杭州": 723,
    "嘉兴": 761,
    "金华": 788,
    "丽水": 820,
    "宁波": 737,
    "衢州": 798,
    "绍兴": 775,
    "台州": 810,
    "温州": 749,
    "舟山": 805,
    "湖州": 769,
    "重庆市区": 133,
    "忠县": 713,
    "开县": 714,
    "綦江县": 702,
    "潼南县": 703,
    "铜梁县": 704,
    "大足县": 705,
    "荣昌县": 706,
    "璧山县": 707,
    "梁平县": 708,
    "城口县": 709,
    "丰都县": 710,
    "垫江县": 711,
    "武隆县": 712,
    "云阳县": 715,
    "奉节县": 716,
    "巫山县": 717,
    "巫溪县": 718,
    "石柱县": 719,
    "秀山县": 720,
    "酉阳县": 721,
    "彭水县": 722,
    "海淀": 469,
    "东城": 641,
    "西城": 642,
    "朝阳": 643,
    "丰台": 644,
    "房山": 647,
    "通州": 648,
    "顺义": 649,
    "昌平": 650,
    "大兴": 651,
    "怀柔": 652,
    "平谷": 653,
    "密云县": 654,
    "延庆县": 655,
    "石景山": 645,
    "门头沟": 646,
    "黄浦": 672,
    "卢湾": 673,
    "徐汇": 674,
    "长宁": 675,
    "静安": 676,
    "普陀": 677,
    "闸北": 678,
    "虹口": 679,
    "杨浦": 680,
    "闵行": 681,
    "宝山": 682,
    "嘉定": 683,
    "浦东": 684,
    "金山": 685,
    "松江": 686,
    "青浦": 687,
    "奉贤": 688,
    "崇明": 689
    //}}}
        },
        areaList: [
        {
        //{{{
        province: "上海" ,
        classname: "shanghai",
        cities: [
            //{{{
            { cityname: "黄浦" } ,
            { cityname: "卢湾" } ,
            { cityname: "徐汇" } ,
            { cityname: "长宁" } ,
            { cityname: "静安" } ,
            { cityname: "普陀" } ,
            { cityname: "闸北" } ,
            { cityname: "虹口" } ,
            { cityname: "杨浦" } ,
            { cityname: "闵行" } ,
            { cityname: "宝山" } ,
            { cityname: "嘉定" } ,
            { cityname: "浦东" } ,
            { cityname: "金山" } ,
            { cityname: "松江" } ,
            { cityname: "青浦" } ,
            { cityname: "奉贤" } ,
            { cityname: "崇明" } 
            ]//}}}
        },
        {
            province: "北京" ,
            classname: "beijing" ,
            cities: [
            //{{{
                { cityname: "海淀" }, 
                { cityname: "东城" },
                { cityname: "西城" },
                { cityname: "朝阳" },
                { cityname: "丰台" },
                { cityname: "房山" },
                { cityname: "通州" },
                { cityname: "顺义" },
                { cityname: "昌平" },
                { cityname: "大兴" },
                { cityname: "怀柔" },
                { cityname: "平谷" },
                { cityname: "密云县" },
                { cityname: "延庆县" },
                { cityname: "石景山" },
                { cityname: "门头沟" }
            ]//}}}
        },
        {
            province: '重庆',
            classname: 'chongqing',
            cities: [
            //{{{
                { cityname: "重庆市区" } ,
                { cityname: "忠县" } ,
                { cityname: "开县" } ,
                { cityname: "綦江县" }, 
                { cityname: "潼南县" },
                { cityname: "铜梁县" },
                { cityname: "大足县" },
                { cityname: "荣昌县" },
                { cityname: "璧山县" },
                { cityname: "梁平县" },
                { cityname: "城口县" },
                { cityname: "丰都县" },
                { cityname: "垫江县" },
                { cityname: "武隆县" },
                { cityname: "云阳县" },
                { cityname: "奉节县" },
                { cityname: "巫山县" },
                { cityname: "巫溪县" },
                { cityname: "石柱县" },
                { cityname: "秀山县" },
                { cityname: "酉阳县" },
                { cityname: "彭水县" } 
            ]
        },//}}}
        {
            province: '安徽',
            classname: "anhui",
            cities: [
            //{{{
                {
                    cityname: '合肥'
                },
                {
                    cityname: '安庆'
                },
                {
                    cityname: '蚌埠'
                },
                {
                    cityname: '亳州'
                },
                {
                    cityname: '巢湖'
                },
                {
                    cityname: '滁州'
                },
                {
                    cityname: '阜阳'
                },
                {
                    cityname: '贵池'
                },
                {
                    cityname: '淮北'
                },
                {
                    cityname: '淮化'
                },
                {
                    cityname: '淮南'
                },
                {
                    cityname: '黄山'
                },
                {
                    cityname: '九华山'
                },
                {
                    cityname: '六安'
                },
                {
                    cityname: '马鞍山'
                },
                {
                    cityname: '宿州'
                },
                {
                    cityname: '铜陵'
                },
                {
                    cityname: '屯溪'
                },
                {
                    cityname: '芜湖'
                },
                {
                    cityname: '宣城'
                }
            ]//}}}
        },
        {
            province: '福建',
            classname: "fujian",
            cities: [
            //{{{
                {
                    cityname: '福州'
                },
                {
                    cityname: '福安'
                },
                {
                    cityname: '龙岩'
                },
                {
                    cityname: '南平'
                },
                {
                    cityname: '宁德'
                },
                {
                    cityname: '莆田'
                },
                {
                    cityname: '泉州'
                },
                {
                    cityname: '三明'
                },
                {
                    cityname: '邵武'
                },
                {
                    cityname: '石狮'
                },
                {
                    cityname: '晋江'
                },
                {
                    cityname: '永安'
                },
                {
                    cityname: '武夷山'
                },
                {
                    cityname: '厦门'
                },
                {
                    cityname: '漳州'
                }
            ]//}}}
        },
        {
            province: '甘肃',
            classname: "gansu",
            cities: [
            //{{{
                {
                    cityname: '兰州'
                },
                {
                    cityname: '白银'
                },
                {
                    cityname: '定西'
                },
                {
                    cityname: '敦煌'
                },
                {
                    cityname: '甘南'
                },
                {
                    cityname: '金昌'
                },
                {
                    cityname: '酒泉'
                },
                {
                    cityname: '临夏'
                },
                {
                    cityname: '平凉'
                },
                {
                    cityname: '天水'
                },
                {
                    cityname: '武都'
                },
                {
                    cityname: '武威'
                },
                {
                    cityname: '西峰'
                },
                {
                    cityname: '嘉峪关'
                },
                {
                    cityname: '张掖'
                }
            ]//}}}
        },
        {
            province: '广东',
            classname: "guangdong",
            cities: [
            //{{{
                {
                    cityname: '广州'
                },
                {
                    cityname: '潮阳'
                },
                {
                    cityname: '潮州'
                },
                {
                    cityname: '澄海'
                },
                {
                    cityname: '东莞'
                },
                {
                    cityname: '佛山'
                },
                {
                    cityname: '河源'
                },
                {
                    cityname: '惠州'
                },
                {
                    cityname: '江门'
                },
                {
                    cityname: '揭阳'
                },
                {
                    cityname: '开平'
                },
                {
                    cityname: '茂名'
                },
                {
                    cityname: '梅州'
                },
                {
                    cityname: '清远'
                },
                {
                    cityname: '汕头'
                },
                {
                    cityname: '汕尾'
                },
                {
                    cityname: '韶关'
                },
                {
                    cityname: '深圳'
                },
                {
                    cityname: '顺德'
                },
                {
                    cityname: '阳江'
                },
                {
                    cityname: '英德'
                },
                {
                    cityname: '云浮'
                },
                {
                    cityname: '增城'
                },
                {
                    cityname: '湛江'
                },
                {
                    cityname: '肇庆'
                },
                {
                    cityname: '中山'
                },
                {
                    cityname: '珠海'
                }
            ]//}}}
        },
        {
            province: '广西',
            classname: "guangxi",
            cities: [
            //{{{
                {
                    cityname: '南宁'
                },
                {
                    cityname: '百色'
                },
                {
                    cityname: '北海'
                },
                {
                    cityname: '桂林'
                },
                {
                    cityname: '防城港'
                },
                {
                    cityname: '河池'
                },
                {
                    cityname: '贺州'
                },
                {
                    cityname: '柳州'
                },
                {
                    cityname: '来宾'
                },
                {
                    cityname: '钦州'
                },
                {
                    cityname: '梧州'
                },
                {
                    cityname: '贵港'
                },
                {
                    cityname: '玉林'
                }
            ]//}}}
        },
        {
            province: '贵州',
            classname: "guizhou",
            cities: [
            //{{{
                {
                    cityname: '贵阳'
                },
                {
                    cityname: '安顺'
                },
                {
                    cityname: '毕节'
                },
                {
                    cityname: '都匀'
                },
                {
                    cityname: '凯里'
                },
                {
                    cityname: '六盘水'
                },
                {
                    cityname: '铜仁'
                },
                {
                    cityname: '兴义'
                },
                {
                    cityname: '玉屏'
                },
                {
                    cityname: '遵义'
                }
            ]//}}}
        },
        {
            province: '海南',
            classname: "hainan",
            cities: [
            //{{{
                {
                    cityname: '海口'
                },
                {
                    cityname: '三亚'
                },
                {
                    cityname: '五指山'
                },
                {
                    cityname: '琼海'
                },
                {
                    cityname: '儋州'
                },
                {
                    cityname: '文昌'
                },
                {
                    cityname: '万宁'
                },
                {
                    cityname: '东方'
                },
                {
                    cityname: '定安'
                },
                {
                    cityname: '屯昌'
                },
                {
                    cityname: '澄迈'
                },
                {
                    cityname: '临高'
                },
                {
                    cityname: '万宁'
                },
                {
                    cityname: '白沙黎族'
                },
                {
                    cityname: '昌江黎族'
                },
                {
                    cityname: '乐东黎族'
                },
                {
                    cityname: '陵水黎族'
                },
                {
                    cityname: '保亭黎族'
                },
                {
                    cityname: '琼中黎族'
                },
                {
                    cityname: '西沙群岛'
                },
                {
                    cityname: '南沙群岛'
                },
                {
                    cityname: '中沙群岛'
                }
            ]//}}}
        },
        {
            province: '河北',
            classname: "hebei",
            cities: [
            //{{{
                {
                    cityname: '石家庄'
                },
                {
                    cityname: '保定'
                },
                {
                    cityname: '北戴河'
                },
                {
                    cityname: '沧州'
                },
                {
                    cityname: '承德'
                },
                {
                    cityname: '丰润'
                },
                {
                    cityname: '邯郸'
                },
                {
                    cityname: '衡水'
                },
                {
                    cityname: '廊坊'
                },
                {
                    cityname: '南戴河'
                },
                {
                    cityname: '秦皇岛'
                },
                {
                    cityname: '唐山'
                },
                {
                    cityname: '新城'
                },
                {
                    cityname: '邢台'
                },
                {
                    cityname: '张家口'
                }
            ]//}}}
        },
        {
            province: '黑龙江',
            classname: "heilongjiang",
            cities: [
            //{{{
                {
                    cityname: '哈尔滨'
                },
                {
                    cityname: '北安'
                },
                {
                    cityname: '大庆'
                },
                {
                    cityname: '大兴安岭'
                },
                {
                    cityname: '鹤岗'
                },
                {
                    cityname: '黑河'
                },
                {
                    cityname: '佳木斯'
                },
                {
                    cityname: '鸡西'
                },
                {
                    cityname: '牡丹江'
                },
                {
                    cityname: '齐齐哈尔'
                },
                {
                    cityname: '七台河'
                },
                {
                    cityname: '双鸭山'
                },
                {
                    cityname: '绥化'
                },
                {
                    cityname: '伊春'
                }
            ]//}}}
        },
        {
            province: '河南',
            classname: "henan",
            cities: [
            //{{{
                {
                    cityname: '郑州'
                },
                {
                    cityname: '安阳'
                },
                {
                    cityname: '鹤壁'
                },
                {
                    cityname: '潢川'
                },
                {
                    cityname: '焦作'
                },
                {
                    cityname: '济源'
                },
                {
                    cityname: '开封'
                },
                {
                    cityname: '漯河'
                },
                {
                    cityname: '洛阳'
                },
                {
                    cityname: '南阳'
                },
                {
                    cityname: '平顶山'
                },
                {
                    cityname: '濮阳'
                },
                {
                    cityname: '三门峡'
                },
                {
                    cityname: '商丘'
                },
                {
                    cityname: '新乡'
                },
                {
                    cityname: '信阳'
                },
                {
                    cityname: '许昌'
                },
                {
                    cityname: '周口'
                },
                {
                    cityname: '驻马店'
                }
            ]//}}}
        },
        {
            province: '湖北',
            classname: "hubei",
            cities: [
            //{{{
                {
                    cityname: '武汉'
                },
                {
                    cityname: '恩施'
                },
                {
                    cityname: '鄂州'
                },
                {
                    cityname: '黄冈'
                },
                {
                    cityname: '黄石'
                },
                {
                    cityname: '荆门'
                },
                {
                    cityname: '荆州'
                },
                {
                    cityname: '潜江'
                },
                {
                    cityname: '十堰'
                },
                {
                    cityname: '随州'
                },
                {
                    cityname: '武穴'
                },
                {
                    cityname: '仙桃'
                },
                {
                    cityname: '咸宁'
                },
                {
                    cityname: '襄阳'
                },
                {
                    cityname: '襄樊'
                },
                {
                    cityname: '孝感'
                },
                {
                    cityname: '宜昌'
                }
            ]//}}}
        },
        {
            province: '湖南',
            classname: "hunan",
            cities: [
            //{{{
                {
                    cityname: '长沙'
                },
                {
                    cityname: '常德'
                },
                {
                    cityname: '郴州'
                },
                {
                    cityname: '衡阳'
                },
                {
                    cityname: '怀化'
                },
                {
                    cityname: '吉首'
                },
                {
                    cityname: '娄底'
                },
                {
                    cityname: '邵阳'
                },
                {
                    cityname: '湘潭'
                },
                {
                    cityname: '益阳'
                },
                {
                    cityname: '岳阳'
                },
                {
                    cityname: '永州'
                },
                {
                    cityname: '张家界'
                },
                {
                    cityname: '株洲'
                }
            ]//}}}
        },
        {
            province: '江苏',
            classname: "jiangsu",
            cities: [
            //{{{
                {
                    cityname: '南京'
                },
                {
                    cityname: '常熟'
                },
                {
                    cityname: '常州'
                },
                {
                    cityname: '海门'
                },
                {
                    cityname: '淮安'
                },
                {
                    cityname: '江都'
                },
                {
                    cityname: '江阴'
                },
                {
                    cityname: '昆山'
                },
                {
                    cityname: '连云港'
                },
                {
                    cityname: '南通'
                },
                {
                    cityname: '启东'
                },
                {
                    cityname: '沭阳'
                },
                {
                    cityname: '宿迁'
                },
                {
                    cityname: '苏州'
                },
                {
                    cityname: '太仓'
                },
                {
                    cityname: '泰州'
                },
                {
                    cityname: '同里'
                },
                {
                    cityname: '无锡'
                },
                {
                    cityname: '徐州'
                },
                {
                    cityname: '盐城'
                },
                {
                    cityname: '扬州'
                },
                {
                    cityname: '宜兴'
                },
                {
                    cityname: '仪征'
                },
                {
                    cityname: '张家港'
                },
                {
                    cityname: '镇江'
                },
                {
                    cityname: '周庄'
                }
            ]//}}}
        },
        {
            province: '江西',
            classname: "jiangxi",
            cities: [
            //{{{
                {
                    cityname: '南昌'
                },
                {
                    cityname: '抚州'
                },
                {
                    cityname: '赣州'
                },
                {
                    cityname: '吉安'
                },
                {
                    cityname: '景德镇'
                },
                {
                    cityname: '井冈山'
                },
                {
                    cityname: '九江'
                },
                {
                    cityname: '庐山'
                },
                {
                    cityname: '萍乡'
                },
                {
                    cityname: '上饶'
                },
                {
                    cityname: '新余'
                },
                {
                    cityname: '宜春'
                },
                {
                    cityname: '鹰潭'
                }
            ]//}}}
        },
        {
            province: '吉林',
            classname: "jilin",
            cities: [
            //{{{
                {
                    cityname: '长春'
                },
                {
                    cityname: '白城'
                },
                {
                    cityname: '白山'
                },
                {
                    cityname: '珲春'
                },
                {
                    cityname: '辽源'
                },
                {
                    cityname: '梅河'
                },
                {
                    cityname: '吉林'
                },
                {
                    cityname: '四平'
                },
                {
                    cityname: '松原'
                },
                {
                    cityname: '通化'
                },
                {
                    cityname: '延吉'
                }
            ]//}}}
        },
        {
            province: '辽宁',
            classname: "liaoning",
            cities: [
            //{{{
                {
                    cityname: '沈阳'
                },
                {
                    cityname: '鞍山'
                },
                {
                    cityname: '本溪'
                },
                {
                    cityname: '朝阳'
                },
                {
                    cityname: '大连'
                },
                {
                    cityname: '丹东'
                },
                {
                    cityname: '抚顺'
                },
                {
                    cityname: '阜新'
                },
                {
                    cityname: '葫芦岛'
                },
                {
                    cityname: '锦州'
                },
                {
                    cityname: '辽阳'
                },
                {
                    cityname: '盘锦'
                },
                {
                    cityname: '铁岭'
                },
                {
                    cityname: '营口'
                }
            ]//}}}
        },
        {
            province: '内蒙古',
            classname: "neimenggu",
            cities: [
            //{{{
                {
                    cityname: '呼和浩特'
                },
                {
                    cityname: '包头'
                },
                {
                    cityname: '鄂尔多斯'
                },
                {
                    cityname: '乌海'
                },
                {
                    cityname: '乌兰察布盟'
                },
                {
                    cityname: '通辽'
                },
                {
                    cityname: '赤峰'
                },
                {
                    cityname: '巴彦淖尔'
                },
                {
                    cityname: '锡林郭勒盟'
                },
                {
                    cityname: '呼伦贝尔'
                },
                {
                    cityname: '兴安盟'
                },
                {
                    cityname: '阿拉善盟'
                }
            ]//}}}
        },
        {
            province: '宁夏',
            classname: "ningxia",
            cities: [
            //{{{
                {
                    cityname: '银川'
                },
                {
                    cityname: '固原'
                },
                {
                    cityname: '中卫'
                },
                {
                    cityname: '石嘴山'
                },
                {
                    cityname: '吴忠'
                }
            ]//}}}
        },
        {
            province: '山东',
            classname: "shandong",
            cities: [
            //{{{
                {
                    cityname: '济南'
                },
                {
                    cityname: '滨州'
                },
                {
                    cityname: '兖州'
                },
                {
                    cityname: '德州'
                },
                {
                    cityname: '东营'
                },
                {
                    cityname: '菏泽'
                },
                {
                    cityname: '济宁'
                },
                {
                    cityname: '莱芜'
                },
                {
                    cityname: '聊城'
                },
                {
                    cityname: '临沂'
                },
                {
                    cityname: '蓬莱'
                },
                {
                    cityname: '青岛'
                },
                {
                    cityname: '曲阜'
                },
                {
                    cityname: '日照'
                },
                {
                    cityname: '泰安'
                },
                {
                    cityname: '潍坊'
                },
                {
                    cityname: '威海'
                },
                {
                    cityname: '烟台'
                },
                {
                    cityname: '枣庄'
                },
                {
                    cityname: '淄博'
                }
            ]//}}}
        },
        {
            province: '山西',
            classname: "shan1xi",
            cities: [
            //{{{
                {
                    cityname: '太原'
                },
                {
                    cityname: '长治'
                },
                {
                    cityname: '大同'
                },
                {
                    cityname: '候马'
                },
                {
                    cityname: '晋城'
                },
                {
                    cityname: '离石'
                },
                {
                    cityname: '临汾'
                },
                {
                    cityname: '宁武'
                },
                {
                    cityname: '朔州'
                },
                {
                    cityname: '忻州'
                },
                {
                    cityname: '阳泉'
                },
                {
                    cityname: '榆次'
                },
                {
                    cityname: '运城'
                }
            ]//}}}
        },
        {
            province: '陕西',
            classname: "shan4xi",
            cities: [
            //{{{
                {
                    cityname: '西安'
                },
                {
                    cityname: '安康'
                },
                {
                    cityname: '宝鸡'
                },
                {
                    cityname: '汉中'
                },
                {
                    cityname: '渭南'
                },
                {
                    cityname: '商州'
                },
                {
                    cityname: '绥德'
                },
                {
                    cityname: '铜川'
                },
                {
                    cityname: '咸阳'
                },
                {
                    cityname: '延安'
                },
                {
                    cityname: '榆林'
                }
            ]//}}}
        },
        {
            province: '台湾',
            classname: "taiwuan",
            cities: [
            //{{{
                {
                    cityname: '台北'
                },
                {
                    cityname: '基隆'
                },
                {
                    cityname: '台南'
                },
                {
                    cityname: '台中'
                },
                {
                    cityname: '高雄'
                },
                {
                    cityname: '屏东'
                },
                {
                    cityname: '南投'
                },
                {
                    cityname: '云林'
                },
                {
                    cityname: '新竹'
                },
                {
                    cityname: '彰化'
                },
                {
                    cityname: '苗栗'
                },
                {
                    cityname: '嘉义'
                },
                {
                    cityname: '花莲'
                },
                {
                    cityname: '桃园'
                },
                {
                    cityname: '宜兰'
                },
                {
                    cityname: '台东'
                },
                {
                    cityname: '金门'
                },
                {
                    cityname: '马祖'
                },
                {
                    cityname: '澎湖'
                },
                {
                    cityname: '其它'
                }
            ]//}}}
        },
        {
            province: '西藏',
            classname: "xizang",
            cities: [
            //{{{
                {
                    cityname: '拉萨'
                },
                {
                    cityname: '阿里'
                },
                {
                    cityname: '昌都'
                },
                {
                    cityname: '林芝'
                },
                {
                    cityname: '那曲'
                },
                {
                    cityname: '日喀则'
                },
                {
                    cityname: '山南'
                }
            ]//}}}
        },
        {
            province: '青海',
            classname: "qinghai",
            cities: [
            //{{{
                {
                    cityname: '西宁'
                },
                {
                    cityname: '德令哈'
                },
                {
                    cityname: '格尔木'
                },
                {
                    cityname: '共和'
                },
                {
                    cityname: '海东'
                },
                {
                    cityname: '海晏'
                },
                {
                    cityname: '玛沁'
                },
                {
                    cityname: '同仁'
                },
                {
                    cityname: '玉树'
                }
            ]//}}}
        },
        {
            province: '四川',
            classname: "sichuan",
            cities: [
            //{{{
                {
                    cityname: '成都'
                },
                {
                    cityname: '巴中'
                },
                {
                    cityname: '达州'
                },
                {
                    cityname: '德阳'
                },
                {
                    cityname: '都江堰'
                },
                {
                    cityname: '峨眉山'
                },
                {
                    cityname: '涪陵'
                },
                {
                    cityname: '广安'
                },
                {
                    cityname: '广元'
                },
                {
                    cityname: '九寨沟'
                },
                {
                    cityname: '康定'
                },
                {
                    cityname: '乐山'
                },
                {
                    cityname: '泸州'
                },
                {
                    cityname: '马尔康'
                },
                {
                    cityname: '绵阳'
                },
                {
                    cityname: '眉山'
                },
                {
                    cityname: '南充'
                },
                {
                    cityname: '内江'
                },
                {
                    cityname: '攀枝花'
                },
                {
                    cityname: '遂宁'
                },
                {
                    cityname: '汶川'
                },
                {
                    cityname: '西昌'
                },
                {
                    cityname: '雅安'
                },
                {
                    cityname: '宜宾'
                },
                {
                    cityname: '自贡'
                },
                {
                    cityname: '资阳'
                },
                {
                    cityname: '阿坝'
                },
                {
                    cityname: '甘孜'
                }
            ]//}}}
        },
        {
            province: '天津',
            classname: "tianjin",
            cities: [
            //{{{
                {
                    cityname: '天津'
                },
                {
                    cityname: '和平'
                },
                {
                    cityname: '东丽'
                },
                {
                    cityname: '河东'
                },
                {
                    cityname: '西青'
                },
                {
                    cityname: '河西'
                },
                {
                    cityname: '津南'
                },
                {
                    cityname: '南开'
                },
                {
                    cityname: '北辰'
                },
                {
                    cityname: '河北'
                },
                {
                    cityname: '武清'
                },
                {
                    cityname: '红挢'
                },
                {
                    cityname: '塘沽'
                },
                {
                    cityname: '汉沽'
                },
                {
                    cityname: '大港'
                },
                {
                    cityname: '宁河'
                },
                {
                    cityname: '静海'
                },
                {
                    cityname: '宝坻'
                },
                {
                    cityname: '蓟县'
                }
            ]//}}}
        },
        {
            province: '新疆',
            classname: "xinjiang",
            cities: [
            //{{{    
                {
                    cityname: '乌鲁木齐'
                },
                {
                    cityname: '阿克苏'
                },
                {
                    cityname: '阿勒泰'
                },
                {
                    cityname: '阿图什'
                },
                {
                    cityname: '博乐'
                },
                {
                    cityname: '昌吉'
                },
                {
                    cityname: '东山'
                },
                {
                    cityname: '哈密'
                },
                {
                    cityname: '和田'
                },
                {
                    cityname: '喀什'
                },
                {
                    cityname: '克拉玛依'
                },
                {
                    cityname: '库车'
                },
                {
                    cityname: '库尔勒'
                },
                {
                    cityname: '奎屯'
                },
                {
                    cityname: '石河子'
                },
                {
                    cityname: '塔城'
                },
                {
                    cityname: '吐鲁番'
                },
                {
                    cityname: '伊宁'
                }
            ]//}}}
        },
        {
            province: '云南',
            classname: "yunnan",
            cities: [
            //{{{
                {
                    cityname: '昆明'
                },
                {
                    cityname: '大理'
                },
                {
                    cityname: '保山'
                },
                {
                    cityname: '楚雄'
                },
                {
                    cityname: '大理'
                },
                {
                    cityname: '东川'
                },
                {
                    cityname: '个旧'
                },
                {
                    cityname: '景洪'
                },
                {
                    cityname: '开远'
                },
                {
                    cityname: '临沧'
                },
                {
                    cityname: '丽江'
                },
                {
                    cityname: '六库'
                },
                {
                    cityname: '潞西'
                },
                {
                    cityname: '曲靖'
                },
                {
                    cityname: '思茅'
                },
                {
                    cityname: '文山'
                },
                {
                    cityname: '西双版纳'
                },
                {
                    cityname: '玉溪'
                },
                {
                    cityname: '中甸'
                },
                {
                    cityname: '昭通'
                }
            ]//}}}
        },
        {
            province: '浙江',
            classname: "zhejiang",
            cities: [
            //{{{
                {
                    cityname: '杭州'
                },
                {
                    cityname: '安吉'
                },
                {
                    cityname: '慈溪'
                },
                {
                    cityname: '定海'
                },
                {
                    cityname: '奉化'
                },
                {
                    cityname: '海盐'
                },
                {
                    cityname: '黄岩'
                },
                {
                    cityname: '湖州'
                },
                {
                    cityname: '嘉兴'
                },
                {
                    cityname: '金华'
                },
                {
                    cityname: '临安'
                },
                {
                    cityname: '临海'
                },
                {
                    cityname: '丽水'
                },
                {
                    cityname: '宁波'
                },
                {
                    cityname: '瓯海'
                },
                {
                    cityname: '平湖'
                },
                {
                    cityname: '千岛湖'
                },
                {
                    cityname: '衢州'
                },
                {
                    cityname: '江山'
                },
                {
                    cityname: '瑞安'
                },
                {
                    cityname: '绍兴'
                },
                {
                    cityname: '嵊州'
                },
                {
                    cityname: '台州'
                },
                {
                    cityname: '温岭'
                },
                {
                    cityname: '温州'
                },
                {
                    cityname: '余姚'
                },
                {
                    cityname: '舟山'
                }
            ]//}}}
        }
        ],//}}}

        looks_male: { looks_items: [
        //{{{
            { value:"英俊", des:"英俊" }, 
            //{ value:"帅气", des:"帅气"}, 
            { value:"健壮", des:"健壮"},
           // { "消瘦": "消瘦"},
           // { "肥胖": "肥胖"},
            { value: "高大", des: "高大"},
           // { "儒雅": "儒雅"},
           // { "威严": "威严"},
           // { "亲切": "亲切"},
           // { "黝黑": "黝黑"},
           // { "沧桑": "沧桑"},
           // { "健康": "健康"},
           // { "普通": "普通"},
           // { "阳光": "阳光"},
           // { "精明": "精明"},
            { value: "瘦高", des: "瘦高"},
           // { "威严": "威严"},
           // { "亲切": "亲切"},
           // { "肤白": "肤白"},
           // { "刚毅": "刚毅"},
            { value: "儒雅气质", des: "儒雅气质"},
           // {"小白脸":"小白脸"},
            { value: "有风度", des: "有风度"},
           // {"高大威猛": "高大威猛"},
           // {"血性汉子":"血性汉子"},
           // {"绅士气质":"绅士气质"},
           // {"精力旺盛":"精力旺盛"},
           // {"玉树临风":"玉树临风"},
            { value:"肌肉发达", des:"肌肉发达" }
        ]},//}}}
        looks_famale: { looks_items: [
        //{{{
            //{ vlaue: "美丽", des:"美丽"} ,
            //{ value: "苗条", des:"苗条"} ,
            { value: "性感", des: "性感" } ,
            { value: "抚媚", des: "抚媚" } ,
            { value: "漂亮", des: "漂亮" } ,
            { value: "时尚", des: "时尚" } ,
            { value: "青春", des: "青春" } ,
            { value: "身材高挑", des: "身材高挑" } ,
            { value: "迷人双眼", des: "迷人双眼" }
        ]},//}}}

        //每次都删除全部 option 之后添加合适的新的元素
        provinceChange: function() {
        //{{{
            var $province = this.$el.find( ".province" );
            var classname =
                $( $province.find( "option" )[ $province.get(0).selectedIndex ] ).attr( "class" );
            this.$el.find( ".cityname option" ).remove();

            this.$el.find( ".cityname" ).html( this.$el.find( ".citylist" ).find( "." + classname ).html() );
        } ,//}}}

        getAreaIdFromCityName: function( cityName ) {
            return typeof this.areaListWithId[cityName] !== "undefined" ? this.areaListWithId[cityName] : "";
        }
    };

    return userProfileBaseInfo;
});

