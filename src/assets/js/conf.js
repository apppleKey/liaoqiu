
var typeList=[
    { "name": "全部", "index": 0, "icon": "1.png" },
    { "name": "足球", "index": 2, "icon": "1.png" },
    { "name": "篮球", "index": 1, "icon": "5.png" },
{ "name": "电竞", "index": 3, "icon": "9.png" },
{ "name": "排球", "index": 4, "icon": "7.png" },
{ "name": "网球", "index": 5, "icon": "4.png" },
{ "name": "斯诺克", "index": 6, "icon": "3.png" },
{ "name": "羽毛球", "index": 7, "icon": "8.png" },
{ "name": "橄榄球", "index": 8, "icon": "6.png" },
{ "name": "棒球", "index": 9, "icon": "2.png" },
{ "name": "其他", "index": 10, "icon": "10.png" }];

var typeMapIcon={};
typeList.map(v=>{
    typeMapIcon[v.name]=v.icon;
})
var typeMapName={};
typeList.map(v=>{
    typeMapName[v.index]=v.name;
})
var cooperate = {
    'bojiu': {
      id:'bojiu',
      token: '3cdfb1cb9b61ebbbf07b6acfe85c5558',
      name: '博9',
      anthorList: [
        { uid: 23210, user_nicename: "哈儿" },
        { uid: 23209, user_nicename: "小筑" },
        { uid: 23208, user_nicename: "安娜" },
        { uid: 23874, user_nicename: "安安" },
        { uid: 24055, user_nicename: "星儿" },
        { uid: 26887, user_nicename: "白白" },
        { uid: 26888, user_nicename: "麦麦" },
        { uid: 29449, user_nicename: "Wayne" },
        { uid: 30933, user_nicename: "BeeBee" }
      ]
    },
    '109': {
      id:'109',
      token: '83f33bdc5f2aa47ca8a86f85a53412b8',
      name:'109',
      anthorList:[
        { uid:30175,user_nicename: '拳打幼儿园'},
        { uid:30176,user_nicename: '白雪公主'},
        { uid:30177,user_nicename: '蛋爷'},
        { uid:30178,user_nicename: '小马宝莉'},
        { uid:30179,user_nicename: '熊二赞'},
        { uid:30180,user_nicename: '光头强'},
        { uid:30181,user_nicename: '苏菲亚'},
        { uid:30182,user_nicename: '我是一杯水'},
        { uid:30183,user_nicename: '木之本樱'},
        { uid:30185,user_nicename: '总有美人想害朕丶'}
      ]
    }, //109
  }


const user={
  userid:'USERID',
  token:'TOKEN'
}
export default {
    typeList,
    typeMapIcon,
    typeMapName,
    cooperate,
    user
}

