webpackJsonp([3],{"+4Tl":function(t,a,n){"use strict";var e=n("t2gX"),i=n("f3T9"),o=n("bd5S");a.a={components:{loading:e.a,Header:i.a,Footer:o.a},data:function(){return{bannerOpt:[{src:"./static/images/p1.png",href:"/1"},{src:"./static/images/p2.png",href:"/2"},{src:"./static/images/p3.png",href:"/3"}],swiperOption:{navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},autoplay:{delay:3e3,stopOnLastSlide:!1,disableOnInteraction:!1},disableOnInteraction:!0,loop:!0},newsLoadingStatus:4,newsPage:1,newsList:[],newsPagesize:10,planPage:0,planLoadingStatus:0,planList:[],planPagesize:10,loaded:!1}},created:function(){this.getNews(),this.getPlan()},methods:{getNews:function(){var t=this;this.newsLoadingStatus=1,this.$http.get("/index.php?g=H5&m=News&a=getAllArticle&uid=false",{params:{page:this.newsPage,size:this.newsPagesize}}).then(function(a){t.loaded=!0,t.newsLoadingStatus=2,t.newsList=a.data.list||[],0==t.newsList.length?t.newsLoadingStatus=4:t.newsList.length<t.newsPagesize?t.newsLoadingStatus=3:t.newsLoadingStatus=2}).catch(function(a){t.loaded=!0,t.newsLoadingStatus=10,console.log(a)})},getMoreNews:function(){var t=this;this.newsLoadingStatus=1,this.newsPage+=1,this.$http.get("/index.php?g=H5&m=News&a=getAllArticle&uid=false",{params:{page:this.newsPage,size:this.newsPagesize}}).then(function(a){t.loaded=!0;var n=a.data.list||[],e=n.length;0==e?t.newsLoadingStatus=4:e<t.newsPagesize?(t.newsList=t.newsList.concat(n),t.newsLoadingStatus=3):(t.newsList=t.newsList.concat(n),t.newsLoadingStatus=2)}).catch(function(a){t.loaded=!0,t.newsLoadingStatus=10,t.newsPage-=1,console.log(a)})},getPlan:function(){var t=this;this.planLoadingStatus=1,this.$http.post("/live/api/news/plan/query_plan_list",{queryId:0,pageSize:this.planPagesize}).then(function(a){t.planLoadingStatus=2,t.planList=a.data.anchorPlanInfoList||[],0==t.planList.length?t.planLoadingStatus=4:t.planList.length<t.planPagesize?(t.planLoadingStatus=3,t.planPage=t.planList[t.planList.length-1].planInfo.planId):(t.planLoadingStatus=2,t.planPage=t.planList[t.planList.length-1].planInfo.planId)}).catch(function(a){t.planLoadingStatus=10,console.log(a)})},getMorePlan:function(){var t=this;this.planLoadingStatus=1,this.$http.post("/live/api/news/plan/query_plan_list",{queryId:this.planPage,pageSize:this.planPagesize}).then(function(a){var n=a.data.anchorPlanInfoList||[],e=n.length;0==n.length?t.planLoadingStatus=4:e<t.planPagesize?(t.planPage=n[n.length-1].planInfo.planId,t.planList=t.planList.concat(n),t.planLoadingStatus=3):(t.planPage=n[n.length-1].planInfo.planId,t.planList=t.planList.concat(n),t.planLoadingStatus=2)}).catch(function(a){t.planLoadingStatus=10,console.log(a)})},dateFormatCustom:function(t){var a=null!=t?new Date(t):new Date,n=(a.getFullYear(),a.getMonth()+1),e=a.getDate(),i=a.getHours(),o=a.getMinutes(),l=a.getSeconds();return n=n<10?"0"+n:n,e=e<10?"0"+e:e,i=i<10?"0"+i:i,o=o<10?"0"+o:o,l=l<10?"0"+l:l,n+"月"+e+"日 "+i+":"+o}}}},"5O3m":function(t,a,n){"use strict";var e,i=n("a3Yh"),o=n.n(i);e={loadedAll:0,text:"隐藏",loading:1},o()(e,"text","加载中..."),o()(e,"loaded",2),o()(e,"text","下拉加载"),o()(e,"loadedAll",3),o()(e,"text","没有更多");a.a={props:["loadingStatus","text"],data:function(){return{}},methods:{loadmore:function(){console.log("loadmore"),this.$emit("loadmore")}}}},EMKX:function(t,a,n){t.exports=n.p+"static/img/lang.f91d2c0.png"},L4zZ:function(t,a){t.exports=function(t){return"string"!=typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)?'"'+t.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':t)}},O4Iy:function(t,a,n){var e=n("L4zZ");a=t.exports=n("UTlt")(!1),a.push([t.i,".header_blank[data-v-746f4e96]{height:169px}.header_blank .header[data-v-746f4e96]{height:169px;position:fixed;left:0;top:0;right:0;z-index:5000;background:#181818}.header_blank .header .nav[data-v-746f4e96]{height:169px;width:1452px;margin:0 auto;background:#181818 url("+e(n("EMKX"))+") no-repeat 690px top/607px 251px}.header_blank .header .nav .logo[data-v-746f4e96]{margin-top:54px;width:553px;height:80px}.header_blank .header .nav .userlogin[data-v-746f4e96]{float:right;width:230px;height:50px;background:#464646;text-align:center;line-height:50px;font-size:22px;font-weight:600;color:#fff;cursor:pointer}.header_blank .header .nav .userlogin .loginlogo[data-v-746f4e96]{width:20px;height:20px;margin-left:10px}",""])},UhFU:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"footer"},[n("div",{staticClass:"banxin copyright"},[t._v("\n    Copyright ©2020 liaoqiu8.com\n  ")])])}],o={render:e,staticRenderFns:i};a.a=o},WW51:function(t,a,n){var e=n("a0a/");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("FIqI")("6a66d6bf",e,!0,{})},ZQME:function(t,a,n){a=t.exports=n("UTlt")(!1),a.push([t.i,".pc_container .banxin[data-v-b113ac00]{width:1280px;margin:0 auto}.pc_container .banner_conn[data-v-b113ac00]{background:#181818;overflow:hidden}.pc_container .banner[data-v-b113ac00]{width:1280px;height:576px;margin:0 auto;overflow:hidden}.pc_container .friendLinks[data-v-b113ac00]{width:1280px;margin:30px auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.pc_container .friendLinks a[data-v-b113ac00]{width:411px;height:180px}.pc_container .friendLinks a img[data-v-b113ac00]{width:100%;height:100%}.pc_container .lanmu[data-v-b113ac00]{margin-bottom:40px}.pc_container .lanmu .lanmu_header[data-v-b113ac00]{padding:63px 0 58px}.pc_container .lanmu .lanmu_header .lanmu_name[data-v-b113ac00]{font-size:46px;font-family:Lantinghei SC;font-weight:600;color:#0c0c0c;float:left}.pc_container .lanmu .lanmu_header .lanmu_asyn[data-v-b113ac00]{margin-left:107px;border-bottom:4px solid #cfa972;font-size:28px;font-family:Lantinghei SC;font-weight:600;line-height:54px;color:#4e4e4e}.pc_container .lanmu .lanmu_body .lanmu_list[data-v-b113ac00]{margin-bottom:20px}.pc_container .lanmu .lanmu_body .lanmu_list .lanmu_item[data-v-b113ac00]{display:inline-block;margin-right:40px;margin-bottom:40px;width:617px;height:320px;border:2px solid #eee;background:-webkit-gradient(linear,left bottom,left top,from(#f6f6f6),to(#fff));background:-webkit-linear-gradient(bottom,#f6f6f6,#fff);background:-o-linear-gradient(bottom,#f6f6f6 0,#fff 100%);background:linear-gradient(0deg,#f6f6f6,#fff);padding:30px 40px 40px}.pc_container .lanmu .lanmu_body .lanmu_list .lanmu_item[data-v-b113ac00]:nth-child(2n){margin-right:0}.pc_container .lanmu .lanmu_body .lanmu_list .li_title[data-v-b113ac00]{height:90px;line-height:39px;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-weight:600;font-size:28px;font-weight:700;color:#323232;line-height:50px}.pc_container .lanmu .lanmu_body .lanmu_list .li_info[data-v-b113ac00]{margin-top:21px}.pc_container .lanmu .lanmu_body .lanmu_list .li_info .info_img[data-v-b113ac00]{width:210px;height:140px;float:left}.pc_container .lanmu .lanmu_body .lanmu_list .li_info .info_txt[data-v-b113ac00]{float:right;width:308px;height:132px;font-size:24px;font-family:Lantinghei SC;font-weight:700;color:#999;line-height:36px;height:140px;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical}.pc_container .adj[data-v-b113ac00]{height:400px;overflow:hidden;background:#181818}.pc_container .adj .banxin[data-v-b113ac00]{margin-top:75px}.pc_container .lanmu.tuidan[data-v-b113ac00]{overflow:hidden;padding:0 20px 30px}.pc_container .lanmu.tuidan .lanmu_asyn[data-v-b113ac00]{margin-left:207px}.pc_container .lanmu.tuidan .recommendItem[data-v-b113ac00]{padding:0 0 25px;border-bottom:1px dotted #e5e5e5;overflow:hidden;margin-top:25px;padding:19px 50px;min-height:320px;border:2px solid #eee;background:-webkit-gradient(linear,left bottom,left top,from(#f6f6f6),to(#fff));background:-webkit-linear-gradient(bottom,#f6f6f6,#fff);background:-o-linear-gradient(bottom,#f6f6f6 0,#fff 100%);background:linear-gradient(0deg,#f6f6f6,#fff)}.pc_container .lanmu.tuidan .itemAnchor[data-v-b113ac00]{width:290px;float:left;overflow:hidden;text-align:center}.pc_container .lanmu.tuidan .itemAnchor dt[data-v-b113ac00]{overflow:hidden;text-align:center}.pc_container .lanmu.tuidan .itemAnchor dt img[data-v-b113ac00]{width:161px;height:161px;border-radius:50%;overflow:hidden;display:block;margin:0 auto 10px}.pc_container .lanmu.tuidan .itemAnchor dt strong[data-v-b113ac00]{display:block;overflow:hidden;height:40px;line-height:40px;margin-bottom:10px}.pc_container .lanmu.tuidan .itemAnchor dt strong a[data-v-b113ac00]{font-size:14px;color:#333;display:block;font-weight:400}.pc_container .lanmu.tuidan .itemAnchor dt strong a[data-v-b113ac00]:hover{color:#ff454f}.pc_container .lanmu.tuidan .itemAnchor dd[data-v-b113ac00]{display:inline-block;height:40px;font-size:24px;padding:0 20px;color:#ff454f;text-align:center;line-height:36px;overflow:hidden;margin:10px;border:2px solid #fd4754;border-radius:4px}.pc_container .lanmu.tuidan .itemMain[data-v-b113ac00]{margin-left:297px;overflow:hidden}.pc_container .lanmu.tuidan .itemTitle[data-v-b113ac00]{font-size:24px;min-height:36px;line-height:36px;overflow:hidden;margin-bottom:4px}.pc_container .lanmu.tuidan .itemTitle a[data-v-b113ac00]{display:block;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;color:#333;font-size:36px;line-height:48px;overflow:hidden}.pc_container .lanmu.tuidan .itemTitle a[data-v-b113ac00]:hover{color:#ff454f}.pc_container .lanmu.tuidan .itemContant[data-v-b113ac00]{background:#f1f1f1;border-radius:4px;padding:20px;margin:10px 0;overflow:hidden}.pc_container .lanmu.tuidan .itemOther[data-v-b113ac00]{overflow:hidden;margin-bottom:5px}.pc_container .lanmu.tuidan .itemLeagueMatch[data-v-b113ac00]{font-size:32px;font-family:Lantinghei SC;font-weight:400;color:#1a9cfc;line-height:36px;float:left;margin:0 20px}.pc_container .lanmu.tuidan .itemEventTag[data-v-b113ac00]{border:1px solid #ddd;height:40px;line-height:40px;padding:0 10px;color:#6a62ff;display:block;float:left;font-weight:400;border-radius:20px;font-size:24px;margin-right:10px}.pc_container .lanmu.tuidan .itemEventTag_1[data-v-b113ac00]{color:#58c14b}.pc_container .lanmu.tuidan .itemEventTag_2[data-v-b113ac00]{color:#6a62ff}.pc_container .lanmu.tuidan .itemEventTag_3[data-v-b113ac00]{color:#fba423}.pc_container .lanmu.tuidan .itemEventTag_4[data-v-b113ac00]{color:#9fa1bf}.pc_container .lanmu.tuidan .itemEventTag_5[data-v-b113ac00]{color:#6935ff}.pc_container .lanmu.tuidan .itemEventTag_6[data-v-b113ac00]{color:#ff2d84}.pc_container .lanmu.tuidan .itemEventTag_7[data-v-b113ac00]{color:#614aa9}.pc_container .lanmu.tuidan .itemEventTag_8[data-v-b113ac00]{color:#6a62ff}.pc_container .lanmu.tuidan .itemEventName[data-v-b113ac00]{color:#09f;font-size:16px;overflow:hidden;height:20px;line-height:20px;display:block;float:left;margin-right:10px}.pc_container .lanmu.tuidan .itemEventTimer[data-v-b113ac00]{display:block;float:left;line-height:20px;font-size:32px;font-weight:400;color:#6a6a6a;line-height:36px}.pc_container .lanmu.tuidan .itemDesc[data-v-b113ac00]{font-size:16px;color:#333;display:block;overflow:hidden;min-height:36px;height:auto;font-size:32px;font-weight:400;color:#303030;line-height:36px}.pc_container .lanmu.tuidan .itemDesc[data-v-b113ac00]:hover{color:#ff454f}.pc_container .lanmu.tuidan .itemTimer[data-v-b113ac00]{margin-top:5px;font-size:24px;font-weight:400;color:#999;line-height:36px}",""])},"a0a/":function(t,a,n){a=t.exports=n("UTlt")(!1),a.push([t.i,".we-loading-component[data-v-9ce2cf16]{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.we-loading-component .loadingStatus[data-v-9ce2cf16]{text-align:center;width:100%;height:80px;line-height:80px;font-size:32px;font-weight:700;color:#323232;line-height:50px;border:2px solid #eee;background:#fff}.we-loading-component .loadingStatus.nodata[data-v-9ce2cf16]{color:gray;border:none}.we-loading-component .loadingStatus.nodata .loading_text[data-v-9ce2cf16]{color:gray}.we-loading-component .loading-spinner[data-v-9ce2cf16]{display:inline-block;-webkit-transform:scale(1.5);-ms-transform:scale(1.5);transform:scale(1.5);margin-right:10px}.we-loading-component .loading_text[data-v-9ce2cf16]{line-height:80px;color:#323232}",""])},bd5S:function(t,a,n){"use strict";function e(t){n("qu2+")}var i=n("UhFU"),o=n("C7Lr"),l=e,s=o(null,i.a,!1,l,"data-v-68114c2d",null);a.a=s.exports},cKvq:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"we-loading-component"},[1==t.loadingStatus?n("div",{staticClass:"loadingStatus"},[n("mt-spinner",{staticClass:"loading-spinner",attrs:{type:3}}),t._v(" "),n("span",{staticClass:"loading_text"},[t._v("加载中...")])],1):t._e(),t._v(" "),2==t.loadingStatus?n("div",{staticClass:"loadingStatus",on:{click:t.loadmore}},[n("span",{staticClass:"loading_text"},[t._v("加载更多...")])]):t._e(),t._v(" "),3==t.loadingStatus?n("div",{staticClass:"loadingStatus"},[n("span",{staticClass:"loading_text"},[t._v("没有更多啦~")])]):t._e(),t._v(" "),4==t.loadingStatus?n("div",{staticClass:"loadingStatus nodata"},[n("span",{staticClass:"loading_text"},[t._v(t._s(t.text||"暂无数据"))])]):t._e(),t._v(" "),10==t.loadingStatus?n("div",{staticClass:"loadingStatus nodata",on:{click:t.loadmore}},[n("span",{staticClass:"loading_text"},[t._v(t._s(t.text||"加载错误"))])]):t._e()])},i=[],o={render:e,staticRenderFns:i};a.a=o},f3T9:function(t,a,n){"use strict";function e(t){n("umoI")}var i=n("z2Ti"),o=n("C7Lr"),l=e,s=o(null,i.a,!1,l,"data-v-746f4e96",null);a.a=s.exports},iK7d:function(t,a,n){"use strict";function e(t){n("v33V")}Object.defineProperty(a,"__esModule",{value:!0});var i=n("+4Tl"),o=n("v/zg"),l=n("C7Lr"),s=e,r=l(i.a,o.a,!1,s,"data-v-b113ac00",null);a.default=r.exports},"qu2+":function(t,a,n){var e=n("uhJx");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("FIqI")("7270ef20",e,!0,{})},t2gX:function(t,a,n){"use strict";function e(t){n("WW51")}var i=n("5O3m"),o=n("cKvq"),l=n("C7Lr"),s=e,r=l(i.a,o.a,!1,s,"data-v-9ce2cf16",null);a.a=r.exports},uhJx:function(t,a,n){a=t.exports=n("UTlt")(!1),a.push([t.i,".footer[data-v-68114c2d]{height:200px;overflow:hidden;background:#181818}.footer .copyright[data-v-68114c2d]{margin:0 auto;font-size:16px;font-family:Lantinghei SC;font-weight:700;color:#919191;line-height:200px;text-align:center}",""])},umoI:function(t,a,n){var e=n("O4Iy");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("FIqI")("1177db90",e,!0,{})},"v/zg":function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"pc_container"},[n("Header"),t._v(" "),n("div",{staticClass:"banner_conn"},[n("div",{staticClass:"banner"},[n("swiper",{attrs:{options:t.swiperOption}},[t._l(t.bannerOpt,function(t,a){return n("swiper-slide",{key:a,staticClass:"swiper-slide"},[n("a",{attrs:{href:t.href,target:"_blank"}},[n("img",{attrs:{src:t.src}})])])}),t._v(" "),n("div",{staticClass:"swiper-button-prev swiper-button-white",staticStyle:{"background-color":"rgba(0,0,0,.8)",left:"0",width:"60px","margin-top":"-60px",height:"120px"},attrs:{slot:"button-prev"},slot:"button-prev"}),t._v(" "),n("div",{staticClass:"swiper-button-next swiper-button-white",staticStyle:{"background-color":"rgba(0,0,0,.8)",right:"0",width:"60px","margin-top":"-60px",height:"120px"},attrs:{slot:"button-prev"},slot:"button-prev"})],2)],1),t._v(" "),n("div",{staticClass:"friendLinks"},[n("a",{attrs:{href:"https://zhibo18.live",target:"_blank"}},[n("img",{attrs:{src:"./static/images/wzzb.png",alt:"",title:"王者体育直播"}})]),t._v(" "),n("a",{attrs:{href:"https://m.dp18.me/#/",target:"_blank"}},[n("img",{attrs:{src:"./static/images/bcd.png",alt:"",title:"B_C点评"}})]),t._v(" "),n("a",{attrs:{href:"https://www.fire18.tv",target:"_blank"}},[n("img",{attrs:{src:"./static/images/fire18.png",alt:"",title:"烽火电竞"}})])])]),t._v(" "),n("div",{staticClass:"lanmu banxin"},[t._m(0),t._v(" "),n("div",{staticClass:"lanmu_body"},[n("div",{staticClass:"lanmu_list"},t._l(t.newsList,function(a){return n("a",{key:a.pid,staticClass:"lanmu_item",attrs:{href:"#/PC/news/"+a.pid}},[n("div",{staticClass:"li_title"},[t._v(t._s(a.post_title))]),t._v(" "),n("div",{staticClass:"li_info"},[n("img",{staticClass:"info_img",attrs:{src:a.smeta.thumb,alt:""}}),t._v(" "),n("div",{staticClass:"info_txt"},[t._v(t._s(a.post_title))])])])}),0),t._v(" "),n("loading",{attrs:{loadingStatus:t.newsLoadingStatus},on:{loadmore:t.getMoreNews}})],1)]),t._v(" "),n("div",{staticClass:"adj"},[n("div",{staticClass:"banxin"},[n("img",{attrs:{src:"./static/images/lpl.png",alt:""}})])]),t._v(" "),n("div",{staticClass:"lanmu tuidan banxin"},[t._m(1),t._v(" "),n("div",{staticClass:"lanmu_body"},[n("div",{staticClass:"lanmu_list"},t._l(t.planList,function(a){return n("li",{key:a.planInfo.planId,staticClass:"recommendItem"},[n("dl",{staticClass:"itemAnchor"},[n("dt",[n("a",{attrs:{target:"_blank",href:"#/PC/plan/"+a.planInfo.planId}},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.anchorSummaryInfo.anchorInfo.avatar,expression:"item.anchorSummaryInfo.anchorInfo.avatar"}]})])]),t._v(" "),t._l(a.anchorSummaryInfo.winLabelList,function(a,e){return n("dd",{key:"hh"+e},[t._v(t._s(a.content))])})],2),t._v(" "),n("div",{staticClass:"itemMain"},[n("div",{staticClass:"itemTitle"},[n("a",{attrs:{href:"#/PC/plan/"+a.planInfo.planId,target:"_blank"}},[t._v(t._s(a.planInfo.planTitle))])]),t._v(" "),n("div",{staticClass:"itemContant"},[n("div",{staticClass:"itemOther"},[n("strong",{class:"itemEventTag itemEventTag_"+a.planInfo.playType},[t._v(t._s(a.planInfo.playTypeContent))]),t._v(" "),n("span",{staticClass:"itemLeagueMatch"},[t._v(t._s(a.planInfo.leagueMatch))]),t._v(" "),n("b",{staticClass:"itemEventTimer"},[t._v(t._s(t.dateFormatCustom(a.planInfo.startTimestamp)))])]),t._v(" "),n("a",{staticClass:"itemDesc",attrs:{href:"#/PC/plan/"+a.planInfo.planId,target:"_blank"}},[t._v(t._s(a.planInfo.matchName))])]),t._v(" "),n("div",{staticClass:"itemTimer"},[t._v(t._s(a.planInfo.timeDistance))])])])}),0),t._v(" "),n("loading",{attrs:{loadingStatus:t.planLoadingStatus},on:{loadmore:t.getMorePlan}})],1)]),t._v(" "),t.loaded?n("Footer"):t._e()],1)},i=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"lanmu_header"},[n("div",{staticClass:"lanmu_name"},[t._v("资讯")]),t._v(" "),n("div",{staticClass:"lanmu_asyn"},[n("span",[t._v("NEWS")])])])},function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"lanmu_header"},[n("div",{staticClass:"lanmu_name"},[t._v("百家推单")]),t._v(" "),n("div",{staticClass:"lanmu_asyn"},[n("span",[t._v("BETTING")])])])}],o={render:e,staticRenderFns:i};a.a=o},v33V:function(t,a,n){var e=n("ZQME");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("FIqI")("73fa6b32",e,!0,{})},z2Ti:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"header_blank"},[n("div",{staticClass:"header"},[n("div",{staticClass:"nav"},[n("a",{attrs:{href:"/",target:"_self"}},[n("img",{staticClass:"logo",attrs:{src:"./static/images/logo.png",alt:""}})]),t._v(" "),n("div",{staticClass:"userlogin"},[t._v("\n        登录 | 注册\n        "),n("img",{staticClass:"loginlogo",attrs:{src:"./static/images/login.png",alt:""}})])])])])},i=[],o={render:e,staticRenderFns:i};a.a=o}});
//# sourceMappingURL=3.a6f5b8bf6e6e893c33b5.js.map