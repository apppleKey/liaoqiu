webpackJsonp([5],{"4Sc0":function(t,e,a){"use strict";function i(t){a("OJpB")}var n=a("y+7e"),o=a("dXP6"),c=a("C7Lr"),s=i,r=c(n.a,o.a,!1,s,"data-v-70980cc8",null);e.a=r.exports},"5O3m":function(t,e,a){"use strict";var i,n=a("a3Yh"),o=a.n(n);i={loadedAll:0,text:"隐藏",loading:1},o()(i,"text","加载中..."),o()(i,"loaded",2),o()(i,"text","下拉加载"),o()(i,"loadedAll",3),o()(i,"text","没有更多");e.a={props:["loadingStatus","text"],data:function(){return{}},methods:{loadmore:function(){console.log("loadmore"),this.$emit("loadmore")}}}},"67S0":function(t,e,a){e=t.exports=a("UTlt")(!1),e.push([t.i,".pageComponent button{margin:0 5px;background-color:#f4f4f5;color:#606266;outline:none;border-radius:2px;padding:0 4px;vertical-align:top;display:inline-block;font-size:13px;min-width:35.5px;height:28px;line-height:28px;cursor:pointer;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;text-align:center;border:0}.pageComponent button[disabled]{color:#c0c4cc;cursor:not-allowed}.pageComponent button.active{cursor:not-allowed;background-color:#fe5661;color:#fff}.pageComponent input{width:50px;height:28px;border:1px solid #fe566156;padding-left:3px}.pageComponent input:focus{border:1px solid #fe5661;outline:none}",""])},Fv5A:function(t,e,a){t.exports=a.p+"static/img/new_loading.cbf5b5d.png"},Gc0V:function(t,e,a){var i=a("dpOj");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("FIqI")("e24d5654",i,!0,{})},L4zZ:function(t,e){t.exports=function(t){return"string"!=typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)?'"'+t.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':t)}},OJpB:function(t,e,a){var i=a("n8M6");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("FIqI")("74347250",i,!0,{})},PMwA:function(t,e,a){var i=a("YmYK");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("FIqI")("7c35879b",i,!0,{})},Rspt:function(t,e,a){"use strict";var i=a("pHNN"),n=a("t2gX"),o=a("4Sc0");e.a={components:{pagenation:i.a,weloading:n.a,loadingflower:o.a},data:function(){return{loadingStatus:4,topicList:[],loading:!0,pageConfig:{pageSize:20,pageNo:1,total:1,pageTotal:2},page:1,size:30}},created:function(){this.getTopicList(1)},methods:{getTopicList:function(t){var e=this;this.loadingStatus=1,this.topicList.length=0,this.showFlower=!0,this.$http.get("/index.php?g=Wwapi&m=Topic&a=topic_hot",{params:{page:this.page-1,size:this.size}}).then(function(t){e.showFlower=!1,e.loadingStatus=2;var a=t.data.lenth;console.log(t.total),0==t.data.length&&(e.loadingStatus=3),t.total<=a&&(e.loadingStatus=3),e.topicList=t.data}).catch(function(t){e.showFlower=!1,console.log(t),e.loadingStatus=4,e.$toast(t)})},loadmore:function(){var t=this;1!=this.loadingStatus&&(this.loadingStatus=1,this.page+=1,this.$http.get("/index.php?g=Wwapi&m=Topic&a=topic_hot",{params:{page:this.page-1,size:this.size}}).then(function(e){t.loadingStatus=2,t.topicList=t.topicList.concat(e.data);var a=t.topicList.length;e.total<=a&&(t.loadingStatus=3),console.log(e.total,a)}).catch(function(e){console.log(e),t.loadingStatus=4,t.$toast(e)}))},changeCurrentPage:function(t){console.log(t),this.getTopicList(t)}}}},"So+H":function(t,e,a){var i=a("67S0");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("FIqI")("7ff33a89",i,!0,{})},Uy5v:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"topic_index_page"},[a("div",{staticClass:"topic_index_wrap"},[t._m(0),t._v(" "),a("div",{staticClass:"listTabel"},[t._m(1),t._v(" "),t._l(t.topicList,function(e,i){return a("div",{key:"topic"+i,staticClass:"list-item"},[a("span",{staticClass:"topic_index"},[t._v(t._s((t.pageConfig.pageNo-1)*t.pageConfig.pageSize+i+1))]),t._v(" "),a("router-link",{attrs:{to:"/PC/todayTopic/"+e.id}},[a("span",{staticClass:"topic_title"},[t._v(t._s(e.title))])]),t._v(" "),a("span",{staticClass:"topic_comment"},[t._v(t._s(e.view))])],1)}),t._v(" "),a("weloading",{attrs:{loadingStatus:t.loadingStatus},on:{loadmore:t.loadmore}})],2)]),t._v(" "),a("loadingflower",{attrs:{loading:t.showFlower}})],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nav"},[a("div",{staticClass:"nav-item"},[t._v("热门话题")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"list-title"},[a("span",{staticClass:"topic_index"},[t._v("序号")]),t._v(" "),a("span",{staticClass:"topic_title"},[t._v("关键词")]),t._v(" "),a("span")])}],o={render:i,staticRenderFns:n};e.a=o},YmYK:function(t,e,a){e=t.exports=a("UTlt")(!1),e.push([t.i,".topic_index_page[data-v-4a3d7a5c]{min-height:100%;background-color:#ededed;padding:20px 0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.topic_index_page .topic_index_wrap[data-v-4a3d7a5c]{background-color:#f9f9f9;min-height:80%;width:1220px;margin:20px auto}.topic_index_page .topic_index_wrap .nav[data-v-4a3d7a5c]{width:200px;float:left;padding-top:31px}.topic_index_page .topic_index_wrap .nav .nav-item[data-v-4a3d7a5c]{height:60px;line-height:60px;text-align:center;background-color:#fff;color:#333;font-size:16px}.topic_index_page .topic_index_wrap .listTabel[data-v-4a3d7a5c]{margin-left:200px;padding:0 32px 20px;background-color:#fff;min-height:600px}.topic_index_page .topic_index_wrap .listTabel .list-title[data-v-4a3d7a5c]{height:54px;line-height:54px;color:#5a5a5a;border-bottom:1px solid #eee;position:relative}.topic_index_page .topic_index_wrap .listTabel .list-title .topic_index[data-v-4a3d7a5c]{float:left;width:50px;text-align:center;position:absolute;top:0;left:0}.topic_index_page .topic_index_wrap .listTabel .list-title .topic_title[data-v-4a3d7a5c]{display:block;width:100%;padding-left:50px;padding-right:100px}.topic_index_page .topic_index_wrap .listTabel .loading[data-v-4a3d7a5c]{text-align:center;margin-top:200px;color:gray}.topic_index_page .topic_index_wrap .listTabel .loading .loading-spinner[data-v-4a3d7a5c]{position:relative;width:28px;display:inline-block;vertical-align:-8px;margin-right:10px;color:#fe5661!important}.topic_index_page .topic_index_wrap .listTabel .list-item[data-v-4a3d7a5c]{height:54px;line-height:54px;border-bottom:1px solid #eee;position:relative}.topic_index_page .topic_index_wrap .listTabel .list-item .topic_index[data-v-4a3d7a5c]{color:#fe5661;float:left;width:50px;text-align:center;position:absolute;top:0;left:0}.topic_index_page .topic_index_wrap .listTabel .list-item .topic_title[data-v-4a3d7a5c]{display:block;color:#7db0ff;width:100%;padding-left:50px;padding-right:100px;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical}.topic_index_page .topic_index_wrap .listTabel .list-item .topic_comment[data-v-4a3d7a5c]{color:#888585;width:100px;position:absolute;top:0;right:0}.topic_index_page .pagenation_conn[data-v-4a3d7a5c]{background-color:#fff;height:40px;padding-top:5px;padding-right:20px}.topic_index_page .pagenation_conn .pagenation[data-v-4a3d7a5c]{float:right}",""])},audT:function(t,e,a){"use strict";e.a={name:"pageComponent",props:{pageConfig:{type:Object,require:!0,default:function(){return{pageSize:10,pageNo:1,total:1,pageTotal:1}}}},data:function(){return{showPageNo:8,currentPage:1,jumpPage:"",isInited:!1}},mounted:function(){var t=this;this.$nexTick(function(){t.isInited=!0})},watch:{$props:{handler:function(t,e){this.currentPage=t.pageConfig.pageNo,console.log("watcher---",t.pageConfig.pageTotal)},immediate:!0,deep:!0}},methods:{prePage:function(){this.$emit("changeCurrentPage",this.currentPage-1)},nextPage:function(){this.$emit("changeCurrentPage",this.currentPage+1)},changeCurrentPage:function(t){this.$emit("changeCurrentPage",t)},jumpTo:function(){if(this.jumpPage&&/[1-9][0-9]*/.test(this.jumpPage)){var t=parseInt(this.jumpPage);t>0&&t<=this.pageTotal?this.$emit("changeCurrentPage",t):this.jumpPage=""}else this.jumpPage=""}},computed:{pageTotal:function(){var t=this.pageConfig;return t.pageTotal?t.pageTotal:t.pageSize&&t.total?Math.ceil(t.total/t.pageSize):0}},created:function(){this.currentPage=this.pageConfig.pageNo||1}}},dXP6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"loading"})},n=[],o={render:i,staticRenderFns:n};e.a=o},dpOj:function(t,e,a){e=t.exports=a("UTlt")(!1),e.push([t.i,".we-loading-component[data-v-081d16b8]{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.we-loading-component .loadingStatus[data-v-081d16b8]{text-align:center;margin:10px}.we-loading-component .loading-spinner[data-v-081d16b8]{display:inline-block;vertical-align:-7px;margin-right:10px}.we-loading-component .loading_text[data-v-081d16b8]{line-height:28px;font-size:12px;color:gray}",""])},g5Jz:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"we-loading-component"},[1==t.loadingStatus?a("div",{staticClass:"loadingStatus"},[a("mt-spinner",{staticClass:"loading-spinner",attrs:{type:3}}),t._v(" "),a("span",{staticClass:"loading_text"},[t._v("加载中...")])],1):t._e(),t._v(" "),2==t.loadingStatus?a("div",{staticClass:"loadingStatus",on:{click:t.loadmore}},[a("span",{staticClass:"loading_text"},[t._v("加载更多")])]):t._e(),t._v(" "),3==t.loadingStatus?a("div",{staticClass:"loadingStatus"},[a("span",{staticClass:"loading_text"},[t._v("没有更多啦~")])]):t._e(),t._v(" "),4==t.loadingStatus?a("div",{staticClass:"loadingStatus"},[a("span",{staticClass:"loading_text"},[t._v(t._s(t.text||"暂无数据"))])]):t._e()])},n=[],o={render:i,staticRenderFns:n};e.a=o},n8M6:function(t,e,a){var i=a("L4zZ");e=t.exports=a("UTlt")(!1),e.push([t.i,".loading[data-v-70980cc8]{position:fixed;left:50%;top:50%;width:70px;height:70px;margin-left:-35px;margin-top:-35px;background-image:url("+i(a("Fv5A"))+");background-repeat:no-repeat;background-size:2000% 100%;-webkit-animation:changload-data-v-70980cc8 steps(20) 1.5s infinite;animation:changload-data-v-70980cc8 steps(20) 1.5s infinite;z-index:2000}.loading .load_text[data-v-70980cc8]{position:absolute;left:50%;bottom:-1.92rem;width:120px;height:auto;margin-left:-60px;background:rgba(0,0,0,.6);color:#fff;font-size:.74667rem;line-height:1.44rem;padding:0 .53333rem;text-align:center;word-break:break-all}@-webkit-keyframes changload-data-v-70980cc8{0%{background-position:0 0}to{background-position:-1400px}}@keyframes changload-data-v-70980cc8{0%{background-position:0 0}to{background-position:-1400px 0}}",""])},pHNN:function(t,e,a){"use strict";function i(t){a("So+H")}var n=a("audT"),o=a("qFEn"),c=a("C7Lr"),s=i,r=c(n.a,o.a,!1,s,null,null);e.a=r.exports},qFEn:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.pageConfig.pageTotal>1&&t.isInited?a("div",{staticClass:"pageComponent"},[a("button",{attrs:{disabled:1===t.currentPage},on:{click:t.prePage}},[t._v("上一页")]),t._v(" "),t.pageTotal<=t.showPageNo?t._l(t.pageTotal,function(e){return a("button",{key:e,class:{active:e===t.currentPage},on:{click:function(a){return t.changeCurrentPage(e)}}},[t._v(t._s(e))])}):t.currentPage<4?[t._l(6,function(e){return a("button",{key:e,class:{active:e===t.currentPage},on:{click:function(a){return t.changeCurrentPage(e)}}},[t._v(t._s(e))])}),t._v(" "),a("button",{attrs:{disabled:!0}},[t._v("···")]),t._v(" "),a("button",{on:{click:function(e){return t.changeCurrentPage(t.pageTotal)}}},[t._v(t._s(t.pageTotal))])]:t.currentPage>t.pageTotal-4?[a("button",{on:{click:function(e){return t.changeCurrentPage(1)}}},[t._v("1")]),t._v(" "),a("button",{attrs:{disabled:!0}},[t._v("···")]),t._v(" "),t._l(6,function(e){return a("button",{key:e,class:{active:e+(t.pageTotal-6)===t.currentPage},on:{click:function(a){t.changeCurrentPage(e+(t.pageTotal-6))}}},[t._v(t._s(e+(t.pageTotal-6)))])})]:[a("button",{on:{click:function(e){return t.changeCurrentPage(1)}}},[t._v("1")]),t._v(" "),a("button",{attrs:{disabled:!0}},[t._v("···")]),t._v(" "),a("button",{on:{click:function(e){return t.changeCurrentPage(t.currentPage-2)}}},[t._v(t._s(t.currentPage-2))]),t._v(" "),a("button",{on:{click:function(e){return t.changeCurrentPage(t.currentPage-1)}}},[t._v(t._s(t.currentPage-1))]),t._v(" "),a("button",{staticClass:"active"},[t._v(t._s(t.currentPage))]),t._v(" "),a("button",{on:{click:function(e){return t.changeCurrentPage(t.currentPage+1)}}},[t._v(t._s(t.currentPage+1))]),t._v(" "),a("button",{on:{click:function(e){return t.changeCurrentPage(t.currentPage+2)}}},[t._v(t._s(t.currentPage+2))]),t._v(" "),a("button",{attrs:{disabled:!0}},[t._v("···")]),t._v(" "),a("button",{on:{click:function(e){return t.changeCurrentPage(t.pageTotal)}}},[t._v(t._s(t.pageTotal))])],t._v(" "),a("button",{attrs:{disabled:t.currentPage===t.pageTotal},on:{click:t.nextPage}},[t._v("下一页")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.jumpPage,expression:"jumpPage"}],attrs:{type:"text"},domProps:{value:t.jumpPage},on:{input:function(e){e.target.composing||(t.jumpPage=e.target.value)}}}),t._v(" "),a("button",{on:{click:t.jumpTo}},[t._v("跳转")])],2):t._e()},n=[],o={render:i,staticRenderFns:n};e.a=o},t2gX:function(t,e,a){"use strict";function i(t){a("Gc0V")}var n=a("5O3m"),o=a("g5Jz"),c=a("C7Lr"),s=i,r=c(n.a,o.a,!1,s,"data-v-081d16b8",null);e.a=r.exports},uSNJ:function(t,e,a){"use strict";function i(t){a("PMwA")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("Rspt"),o=a("Uy5v"),c=a("C7Lr"),s=i,r=c(n.a,o.a,!1,s,"data-v-4a3d7a5c",null);e.default=r.exports},"y+7e":function(t,e,a){"use strict";e.a={props:["loading"]}}});
//# sourceMappingURL=5.4b27fcf4cb981d940f2b.js.map