  <template>
  <!-- <mt-button @click.native="handleClick">按钮</mt-button> -->
  <div class="search-page">

    <!-- 搜索结果 ----------------->
    <div class="header-tool">
      <div class="search-box">
        <div class="search-input-box">
          <div class="icon--1 search-btn"></div>

          <input
            type="text"
            class="search-input"
            id="keyWords"
            placeholder="主播/赛事/球队"
            v-model="keyword_show"
            @keyup.13="changeType('')"
          />
        </div>
        <span class="cancel-search">
          <a href="javascript:void(0)" onclick="history.go(-1);return false;" style="color: white;">取消</a>
        </span>
      </div>
      <div class="search-tab-header" v-show="keyword_request!=''">
        <span class="search-tab-header-item" :class="{curr:type==''}" @click="changeType('')">全部</span>
        <span
          class="search-tab-header-item"
          :class="{curr:type=='anchor'}"
          @click="changeType('anchor')"
        >主播</span>
        <span class="search-tab-header-item" :class="{curr:type=='live'}" @click="changeType('live')">直播间</span>
        <span class="search-tab-header-item" :class="{curr:type=='fans'}" @click="changeType('fans')">个人主页</span>
        <span class="search-tab-header-item" :class="{curr:type=='news'}" @click="changeType('news')">资讯</span>
      </div>
    </div>
    <div class="search-tab-body"  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="notLoadingMore"
  infinite-scroll-distance="10">
      <div class="search-tab-body-item" v-if="keyword_request==''" >
        <div class="history-key">
        <div class="history-key-title">历史记录</div>
        <div class="history-key-list"> 
          <span class="history-key-item"  v-for='item in keywords' :key="'keywords'+item.id"
          
          @click="shortSearch(item.keyword)"
         >
        {{item.keyword}}</span>
       <weloading loadingStatus="1"  v-show='keywordsLoding'/>
          <div class="no-data" v-if='keywords.length==0&&keywordsLoding==false'>没有历史记录~</div>
      </div>
       <div class="hot-key">
        <div class="hot-key-title">热门搜索</div>
        <div class="hot-key-list">
         <div class="hot-key-item hot"  v-for='item in hotkeywords' :key="'hotkeywords'+item.id"
          @click="shortSearch(item.keyword)"
         >
        {{item.keyword}}</div>
          <div class="no-data" v-if='hotkeywords.length==0&&hotkeywordsLoding==false'>没有找到哦~</div>
        <!-- <div class="hot-key-item" v=for>世界杯1/2决赛</div>  -->
      <!-- 
        <div class="hot-key-item hot">世界杯1/2决赛</div> 
        <div class="hot-key-item new">欧冠比赛精彩时刻</div>
      <div class="hot-key-item up">NBA星秀</div>
      <div class="hot-key-item down">王者直播最新女主播</div> -->
        </div>
      </div>
      </div>
      </div>
      
      <div class="search-tab-body-item " v-else>
        <div class="anchor-result" v-show="type=='anchor'||type==''">
          <div class="result-header" v-show='type==""'>
            主播
            <span class="fr">
              <div  style="color: #999;" @click="changeType('anchor')" >{{anchorTotal}} 》</div>

            </span>
          </div>
          <div class="result-list">
            
             
                <div class="result-list-item"   v-for="(item,index) in anchorList "
              :key="'anchorid'+index"
              v-show="anchorList.length">
                  <a class="anchor-avanda" target='_blank' :href="'/index.php?g=H5&m=Anchor&a=play&uid='+item.uid">
                    <img v-lazy="item.avatar"  />
                    <div class="anchor-is-live" v-if="item.islive=='1'">LIVE</div>
                  </a>
                  <div class="anchor-info">
                    <div class="nice-name" v-html="item.user_nicename"></div>
                  <div class="line-time omit">{{item.signature||'--'}}</div>
                    <div class="fans">粉丝：{{item.fansnum||0}}</div>
                </div>
                     <div :class="'attention_btn '+ (item.isatten==1?'attentioned':'')"
                      @click="doAttention(item)">{{item.isatten==1?'已关注':'+ 关注'}}</div> </div>
              
            
            <div class="no-data" v-show="anchorList.length==0&&loadingStatus!=1">没有找到相关结果</div>
          </div>
        </div>

        <div class="live-result " v-show="type=='live'||type==''">
          <div class="result-header" v-show='type==""'>
            直播间
            <span class="fr">
              <div  style="color: #999;" @click="changeType('live')" >{{liveTotal}} 》</div>

            </span>
          </div>
          <div class="result-list">
            <a
              class="result-list-item"
             target='_blank' :href="'/index.php?g=H5&m=Anchor&a=play&uid='+item.uid"
                     
              v-for="(item,index) in liveList"
              :key="'liveid'+index"
              v-show="liveList.length"
            >
                <div class="live-avanda">
                  <img v-lazy="item.thumb"  />
                </div>
                <div class="live-info">
                  <div class="live-anchor" > <img v-lazy="item.avatar"  alt=""></div>
                  <div class="live-other">

                  <div class="nice-title" v-html="item.title||'--'"></div>
                  <div class="fans"> 
                        <div class="user_nicename fl" v-html="item.user_nicename"></div>
                        <span class="icon-eye fr" >{{item.pageview}}</span>
                     </div>
                  </div>
                </div>
                <div class="tag" v-if='item.zbtypeName'>{{item.zbtypeName}}</div>
            </a>
            <div class="no-data" v-show="liveList.length==0&&loadingStatus!=1">没有找到相关结果</div>
          </div>
        </div>

        <div class="anchor-result" v-show="type=='fans'||type==''">
          <div class="result-header" v-show='type==""'>
            个人主页
            <span class="fr">
              <div  style="color: #999;" @click="changeType('fans')" >{{fansTotal}} 》</div>

            </span>
          </div>
          <div class="result-list" >
            <a v-for="(item,index) in fansList " class="result-list-item" :key="'fansid'+index"
           target='_blank' :href="'/H5/page/#/anchor?id='+item.uid" 
            
            v-show="fansList.length">
           
                  <div class="anchor-avanda">
                    <img v-lazy="item.avatar" />
                  </div>
                  <div class="anchor-info">
                    <div class="nice-name">{{item.user_nicename}}</div>
                    <div class="line-time omit">{{item.signature||'--'}}</div>
                    <div class="fans">粉丝：{{item.fansnum||0}}</div>
                  </div>
                  <div class="his_page">进入TA的主页</div>
            </a>
            <div class="no-data" v-show="fansList.length==0&&loadingStatus!=1">没有找到相关结果</div>
          </div>
        </div>

        <div class="anchor-result news" v-show="type=='news'||type==''">
          <div class="result-header" v-show='type==""'>
            资讯
            <span class="fr">
              <div  style="color: #999;" @click="changeType('news')">{{newsTotal}} 》</div>
            </span>
          </div>
          <div class="result-list news_listes" >
            <div
              v-for="(item,index) in newsList "
              :key="'newsid'+index"
              v-show="newsList.length"
              class="news_liste"
            >
              <div class="news_liste_a">
               
                <div class="liste_a_right">
                  <a
                   target='_blank' :href="'/H5/page/#/detail?id='+item.id"
                    
                    class="a_right_title"
                    v-html="item.title"
                  ></a>
                  <!-- <a
                    class="a_right_exp"
                    v-html="item.content"
                  ></a> -->
                  <div class="a_right_bottom clearfix">
                    <p class="intro_info_left ">时间：{{item.publishtime}}</p>
                      <p class="news_watch  ff3441" style="margin-left:5px;">
                        <span class="icon-eye"></span> {{counHits(item)}}
                      </p>
                  </div>
                </div>

                 <a class="liste_a_left" target='_blank' :href="'/H5/page/#/detail?id='+item.id" >
                  <img
                    v-lazy="item.smeta_data?item.smeta_data.thumb:''"
                  />
                </a>
              </div>
            </div>
            <div class="no-data" v-show="newsList.length==0&&loadingStatus!=1">没有找到相关结果</div>
          </div>
        </div>
      </div>
      <weloading :loadingStatus="loadingStatus"/>
    </div>
  </div>
</template>
  <script>

import weloading from '@/componets/loading.vue'
export default {
  components:{
    weloading
  },
  computed:{
  //  userinfo () {
  //   return this.$store.state.userinfo
  //  },
    
    ...Vuex.mapState(['userinfo'])
  },
  data() {
    return {
      // userinfo:{},
      type: "",
      loadingStatus:0,
      keywords:[],//关键字列表
      keywordsLoding:false,
      hotkeywords:[],//热门关键字列表
      hotkeywordsLoding:false,
      keyword_show: "",
      keyword_request:'',
      anchorList: [],
      liveList: [],
      fansList: [],
      newsList: [],
      anchorTotal:0,
      liveTotal:0,
      fansTotal:0,
      newsTotal:0,
      notLoadingMore:true,//是否可以加载更多
      loadMoreIsLock:true,//防止下拉加载第一次自动加载
      item: 0,
      hotkeyClass:[''],
      config: {
        anchor: {
          pageSize: 10,
          minPageSize: 3, //搜索首页最多展示个数
          pageTotal: 1,
          page: 1,
          hasInitPage: false,
          api: "/index.php?g=Wwapi&m=Anchor&a=search"
        },
        live: {
          pageSize: 20,
          minPageSize: 6,
          pageTotal: 1,
          page: 1,
          hasInitPage: false,
          api: "/index.php?g=Wwapi&m=UserLIve&a=search"
        },
        fans: {
          pageSize: 12,
          minPageSize: 3,
          pageTotal: 1,
          page: 1,
          hasInitPage: false,
          // api: "/index.php?g=Wwapi&m=User&a=search"
          api: "/index.php?g=Wwapi&m=Anchor&a=search"

        },
        news: {
          pageSize: 15,
          minPageSize: 3,
          pageTotal: 1,
          page: 1,
          hasInitPage: false,
          api: "/index.php?g=Wwapi&m=News&a=search"
        }
      }
    };
  },
  beforeCreate() {},
  created() {
    // console.log(this.$store)
    // var share=document.createElement('script')
    // share.src='./static/js/nativeShare.js';
    // document.body.appendChild(share)
    this.countRem();
    if(this.$route.query.keyword){
      this.keyword_show=this.$route.query.keyword;
      this.type=this.$route.query.type||'';
      this.changeType(this.type);
        this.$nextTick(()=>{
          var toolHeight=$('.header-tool').offset().height;
          $('.search-page').css({'padding-top':toolHeight+'px'})
         })
    }else{
      this.getHistory();
    }
  
    this.getHot();
    // console.log(this.$route.query)
  },
  watch:{
    keyword_show:{
      handler:function(newV,oldV){
      //  console.log(newV)
          // this.$router.push({path:'/h5/search',query:{keyword:newV,type:this.type}});
        if(newV===''){
          this.keyword_request='';
          this.getHistory();
          this.$nextTick(()=>{
          var toolHeight=$('.header-tool').offset().height;
          $('.search-page').css({'padding-top':toolHeight+'px'})
         })
        }
      }
    }
  },
  methods: {
      counHits(item) {
      return (parseInt(item.hits) || 0) + (parseInt(item.post_hits_initial) || 0)
    },
    //快捷搜索
    shortSearch(keyword){
      this.keyword_show=keyword;
      this.changeType('');
    },
    //历史记录
    getHistory(){
        this.keywords=[];
        this.keywordsLoding=true;
        this.$http.get('/index.php?g=Wwapi&m=Search&a=getHistoryKeyword',{params:{uid:this.userinfo.uid,token:this.userinfo.token}}).then((res)=>{
          // console.log(res)
          this.keywordsLoding=false;
          this.keywords=res.data;
        }).catch((err)=>{
          console.log(err);
          this.keywordsLoding=false;
        })

        
    },
    //热门搜索
    getHot(){
    
        this.hotkeywordsLoding=true;
        this.$http.get('/index.php?g=Wwapi&m=Search&a=gethotkeyword&pageSize=4').then((res)=>{
          // console.log(res)
        this.hotkeywordsLoding=false;
            this.hotkeywords=res.data;
        }).catch((err)=>{
          console.log(err);
          this.hotkeywordsLoding=false;
        })

        
    },
    //下拉加载
    loadMore: function() {
       if(this.loadMoreIsLock){
          //  this.$toast("infinity已锁");
          return;
       }else{
          //  this.$toast("触发infinity");
       }
      if(this.type==''){
        return
      }
      this.notLoadingMore=true;
      this.loadingStatus=1;
      if ((this.keyword_request == "")) {
            this.$toast("请输入搜索关键字");
            return
          }
          var listkey = this.type + "List";
          var currConf=this.config[this.type];
          currConf.page++;
          try {
            this.$http
              .get(this.config[this.type].api, { params: { keyword: this.keyword_request,
              pageSize: currConf.pageSize,page: currConf.page,} })
              .then(res => {
                if (res.status == 200) {
                  console.log(res)
                // this.notLoadingMore=false;
                this.loadingStatus=0;
                var totalNum=res.data.count;
                var pageTotal=Math.ceil(res.data.count/currConf.pageSize);
                currConf.pageTotal=pageTotal;
                if(currConf.page>=pageTotal){
                this.notLoadingMore=true;
                  if(currConf.pageTotal>1) {this.loadingStatus=3;}
                }
                else{
                this.notLoadingMore=false;
                }
                   res.data.data.map((item)=>{
                     
                     this[listkey].push(item)
                  });
                } else {
                  this[listkey] = [];
                }
              })
              .catch(err => {
                this.loadingStatus=0
                this.$toast(err.message || err.msg || err);
                console.log(err);
              });
          } catch (err) {
            console.log(err)
            this.$indicator.close();
          }
    },
    //点击关注
    doAttention(item){
      this.$indicator.open({
            spinnerType: "fading-circle"
          });
          axios.get(
            '/index.php?g=Front&m=show&a=attention',
            {params:{roomnum:item.uid}}).then((res)=>{
              this.$indicator.close();
              // console.log(res)
            if(res.data.error==0){
              // console.log(res.data.msg)
                if(res.data.msg=="+关注"){
                  item.isatten=0;
                }else{
                  item.isatten=1;
                }
                // this.$forceUpdate();
              }else{
                  res.data&&res.data.msgthis.$toast(res.data.msg)
              }
            }).catch(err=>{
              this.$indicator.close();

        })
    },
    //全量搜索
    searchAll() {
      this.type='';
      $('#keyWords').blur();
      if ((this.keyword_request == "")) {
        this.$toast("请输入搜索关键字");
        return
      }
 
        this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.loadingStatus=0;
      try {
        this.$http
          .get('/index.php?g=Wwapi&m=Search&a=search', { params: { keyword: this.keyword_request} })
          .then(res => {
            this.$indicator.close();
            if (res.status == 200) {
              this.anchorList=(res.data.anchor||[]).slice(0,this.config.anchor.minPageSize);
              this.newsList=(res.data.article||[]).slice(0,this.config.news.minPageSize);
              this.liveList=(res.data.live||[]).slice(0,this.config.live.minPageSize);
              this.fansList=(res.data.person||[]).slice(0,this.config.fans.minPageSize);
              this.anchorTotal= parseInt(res.data.count.anchor)||0;
              this.newsTotal=parseInt(res.data.count.news) ||0;
              this.liveTotal=parseInt(res.data.count.live)||0;
              this.fansTotal=parseInt(res.data.count.fans)||0;
            } else {
             this.anchorList=[];
              this.newsList=[];
              this.liveList=[];
              this.fansList=[];
              this.anchorTotal= 0;
              this.newsTotal=0;
              this.liveTotal=0;
              this.fansTotal=0;
            }
            // console.log(listkey, this[listkey]);
          })
          .catch(err => {
            this.$indicator.close();
            this.$toast(err.message || err.msg || err);
            console.log(err);
          });
      } catch (err) {
        console.log(err);
        this.$indicator.close();
      }
      
    },

    //选项卡切换
    changeType(type){
      
      this.keyword_request=this.keyword_show;
      this.tabType=type;
      // this.$router.push({path:'/h5/search',query:{keyword:this.keyword_request,type:this.tabType}});

      if(type==""){
        this.notLoadingMore=true;
        this.searchAll()
         this.$nextTick(()=>{
           setTimeout(()=>{
             var toolHeight=$('.header-tool').outerHeight();
              $('.search-page').css({'padding-top':toolHeight+'px'})
           },100)
         })
      }else{
        this.loadMoreIsLock=true;
         this.notLoadingMore=false;
         this.resetConf(type);
         this[type+'List']=[];
         this.type=type;
          this.getData(type)
      }
      return false;
    },

    //清除之前的页码状态
    resetConf(type){
      type=type||this.type;
      this.config[type].pageTotal=1;
      this.config[type].page=1;
    },

    //获取对应选项卡数据
    getData(type) {
        if ((this.keyword_request == "")) {
        this.$toast("请输入搜索关键字");
        this.getHistory();
        return
      }
        this.notLoadingMore=true;
        this.loadingStatus=1;
  //  console.log(type)
      var listkey = type + "List";
      try {
        this.$http
          .get(this.config[type].api, { params: { keyword: this.keyword_request,page:this.config[type].page,pageSize:this.config[type].pageSize } })
          .then(res => {
            // console.log(res);
            setTimeout(()=>{
              this.loadMoreIsLock=false;
            },1000)
            // if
            console.log(this.fansList)
          var currConf=this.config[this.type];
              
              this.loadingStatus=0;
             var totalNum=res.data.count;
                var pageTotal=Math.ceil(res.data.count/currConf.pageSize);
                currConf.pageTotal=pageTotal;
                if(currConf.page>=pageTotal){
                 this.notLoadingMore=true;
                  if(currConf.pageTotal>1) {this.loadingStatus=3;}
                }
                else{
                this.notLoadingMore=false;
                }
          
            

            if (res.status == 200) {
              this[listkey] = res.data.data;
            } else {
              this[listkey] = [];
            }
            // console.log(listkey, this[listkey]);
          })
          .catch(err => {
            this.$indicator.close();
            this.$toast(err.message || err.msg || err);
            // console.log(err);
          });
      } catch (err) {
        this.notLoadingMore=false;
         setTimeout(()=>{
              this.loadMoreIsLock=false;
            },1000)
        // console.log(err)
      }
    },

    // 计算页面REM
    countRem() {
      (function(doc, win) {
        var docEl = doc.documentElement;
        var resizeEvt =
          "orientationchange" in window ? "orientationchange" : "resize";
        function recalc() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (clientWidth > 850) {
            docEl.style.fontSize = "100px";
          } else {
            docEl.style.fontSize = clientWidth / 20 + "px";
          }
        }
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener("DOMContentLoaded", recalc, false);
      })(document, window);
    }
  }
};
</script>
  <style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";
.search-page {
  padding-top: p2r(112);
  // background-color: rgb(240, 242, 245);
  background: #fff;
  font-size: ptr(45);
  position: relative;
  height: 100%;
  // overflow: scroll;
  // 搜索页面
  .history-key {
    font-size: p2r(36);
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
    padding: p2r(20);

    .history-key-list {
      overflow: hidden;

      .history-key-item {
        float: left;
        padding: 0 p2r(40);
        font-size: p2r(25);
        font-weight: 500;
        line-height: p2r(60);
        margin-right: p2r(30);
        background: rgba(238, 238, 238, 1);
        border-radius: p2r(30);
        margin-bottom: p2r(20);
      }
    }
  }

  .hot-key {
    font-size: p2r(36);
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
    // padding: p2r(20);
    .hot-key-title{
      font-size: ptr(36);
    }
    .hot-key-list {
      overflow: hidden;

      .hot-key-item {
        font-size: p2r(25);
        font-weight: 500;
        line-height: p2r(104);
        border-bottom: 1px solid rgba(161, 161, 161, 0.055);
        position: relative;
        &.hot,
        &.new,
        &.up,
        &.down {
          padding-left: p2r(40);

          &:after {
            position: absolute;
            top: p2r(40);
            left: 0;
            line-height: p2r(32);
            text-align: center;
            width: p2r(32);
            height: p2r(32);
          }
        }

        &.hot:after {
          content: "热";
          background-color: red;
          color: white;
        }

        &.new:after {
          content: "新";
          background-color: rgba(232, 160, 16, 1);
          color: white;
        }

        &.down:after {
          content: "↓";
          color: gray;
        }

        &.up:after {
          content: "↑";
          color: gray;
        }
      }
    }
  }
// img[lazy=loading] {
//   height: 100px;
//   margin: auto;
//   background: url("../../../../static/imgs/default.jpg") no-repeat fixed center;
// }
  //搜索结果
  .header-tool {
    width: p2r(750);
    // height: p2r(230);
    padding: p2r(20) p2r(32);
    background: linear-gradient(
      142deg,
      rgba(254, 41, 83, 1) 0%,
      rgba(255, 39, 37, 1) 100%
    );
    position: absolute;
    top: 0;
    .search-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .search-input-box {
        width: p2r(590);
        height: p2r(70);
        position: relative;

        .search-input {
          display: block;
          width: p2r(590);
          height: p2r(70);
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          padding-left: p2r(60);
          outline: none;
          font-size: 0.8rem;
          color: #333;
        }

        .search-btn {
          height: 100%;
          position: absolute;
          left: 0;
          left: 0;

          &:before {
            //   content: '\e901';
            position: absolute;
            z-index: 2;
            width: p2r(40);
            height: p2r(70);
            line-height: p2r(70);
            left: p2r(10);
            top: 0;
            color: red;
          }
        }
      }

      .cancel-search {
        color: white;
        font-size: p2r(32);
        line-height: p2r(70);
      }
    }
  }

  .search-tab-header {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .search-tab-header-item {
      color: rgba(255, 255, 255, 0.596);
      margin-top: p2r(20);
      line-height: p2r(60);
      font-size: p2r(30);

      &.curr {
        position: relative;
        color: white;

        &:before {
          position: absolute;
          content: "";
          width: 100%;
          height: p2r(5);
          background-color: #fff;
          bottom: 0;
        }
      }
    }
  }
  .search-tab-body {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    height: 100%;
  }
  .no-data {
    font-size: p2r(25);
    color: rgba(128, 128, 128, 0.63);
    width: 100%;
    // background-color: #fff;
    padding: p2r(20) 0;
    line-height: p2r(40);
    text-align: center;
  }
  .more {
    font-weight: 500;
    color: rgba(242, 71, 36, 1);
  }
  .anchor-result {margin-left: ptr(30);
    .result-header {
      background-color: #fff;
      font-size: p2r(36);
      padding: p2r(30) p2r(30) p2r(30) 0;
     
      font-weight: bold;
      color:#333;

      .fr {
        color: rgba(242, 71, 36, 1);
      font-size: p2r(30);
      font-weight:300;
      }
    }

    .result-list-item {
      padding-top: p2r(30);
      padding: 0 p2r(30) 0 0;
      border-bottom: 1px solid rgba(104, 103, 103, 0.185);
      height: p2r(146);
      display: flex;
      background-color: #fff;
      @include fs;
      &:nth-last-child(2){
        border-bottom: 1px solid transparent;
     
     }
      .anchor-avanda {
        width: p2r(122);
        height: p2r(122);
        margin-right: p2r(18);
        position: relative;

        // overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .anchor-is-live {
          width: p2r(80);
          height: 16px;
          margin-left: -20px;
          border-radius: 8px;
          background: #ff505b;
          -webkit-box-shadow: 0 0 6px 0 #ff505b;
          box-shadow: 0 0 6px 0 #ff505b;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
          color: #fff;
          position: absolute;
          top: p2r(85);
          left: 50%;
          z-index: 1;
        }
      }

      .anchor-info {
        flex: 1;
         overflow: hidden;
        .nice-name {
          // height:p2r(20);
          font-size: p2r(30);
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: p2r(40);
        }

        .line-time {
          font-size: p2r(24);
          font-weight: 400;
          color: rgba(194, 194, 194, 1);
          line-height: p2r(43);
          @include omit(1);
        }
      }

      .fans {
        font-size: p2r(24);
        font-weight: 400;
        color: rgba(95, 95, 95, 1);
        line-height: p2r(33);
      }
        .attention_btn{
            width:p2r(118);
            height:p2r(50);
            line-height: p2r(50);
            font-size: p2r(24);
            background:rgba(254,85,95,1);
            border-radius:p2r(25);
            color: #fff;
            text-align: center;
            margin-left: ptr(20);
            &.attentioned{
              background-color: #ccc;
            }
          }
          .his_page{
            width:p2r(200);
            height:p2r(50);
            line-height: p2r(50);
            font-size: p2r(24);
            border-radius:p2r(25);
border:1px solid rgba(151,151,151,1);
            color: #000;
            text-align: center;
            margin-left: ptr(20);
          }
    }
  }

  // 直播
  .live-result {
    background-color: #fff;
     .result-header {
      background-color: #fff;
      font-size: p2r(36);
      padding: p2r(30) p2r(30) 0;
      font-weight: bold;
      color:#333;
      .fr {
        color: rgba(242, 71, 36, 1);
      font-size: p2r(30);
      font-weight:300;
      }
    }

    .result-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      padding: ptr(40) p2r(30) 0;
    }

    .result-list-item {
      margin-bottom: p2r(30);
      border-radius: 2px;
      position: relative;
      height: p2r(250);
      width: p2r(320);
      box-shadow: 0 2px 5px rgba(128, 128, 128, 0.192);
   
      .live-avanda {
        width: 100%;
        height: p2r(183);
        margin-right: p2r(18);

        img {
          width: 100%;
          height: 100%;
        }
      }

      .live-info {
        width: 100%;
        height: p2r(67);
        padding: p2r(2) p2r(10);
        display: flex;
      justify-content: flex-start;
      align-items: center;
        .live-anchor{
          width: ptr(50);
          height: ptr(50);
          overflow: hidden;
          margin-right: ptr(15);
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .live-other{

          flex: 1;
          
        }
        .nice-title {
          // height:p2r(20);
          font-size: p2r(18);
          width: 100%;
          height: ptr(30);
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          display: -webkit-box;//省略号
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: p2r(30);
        }

        .fans {
          font-size: p2r(14);
          font-weight: 400;
          color: rgba(95, 95, 95, 1);
          line-height: p2r(33);
          .user_nicename{
            width: 50%;
            @include omit(1);
          }
          .icon-eye{
            margin-top: ptr(6);
            max-width: 50%;
            @include omit(1);

          }
        }
      }

      .tag {
        position: absolute;
        left: 0;
        top: p2r(20);
        padding: 0 p2r(20);
        color: white;
        max-width: 100%;
        line-height: p2r(40);
        font-size: p2r(25);
        background: rgba(147, 147, 147, 1)
          linear-gradient(
            321deg,
            rgba(255, 94, 0, 1) 0%,
            rgba(255, 26, 26, 1) 100%
          );
        border-radius: p2r(4) 0px p2r(19) 0px;
      }
    }
  }

  .news .news_listes {
    width: 100%;
    height: auto;
  }

  .news .news_listes .news_liste {
    width: 100%;
    height: auto;
    padding: ptr(19)  ptr(20)   ptr(32) 0;

    background-color: #fff;
    margin-top: 2px;
    border-bottom: 1px solid rgba(129, 129, 129, 0.062);
  }

  .news_listes .news_liste .news_liste_a {
    display: flex;
    // width: ptr(127);
    height: 4rem;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .news_liste .news_liste_a .liste_a_left {
    width: p2r(218);
    height: p2r(152);
    margin-right: 0.242rem;
    img{
      width: 100%;
      height: 100%;
    }
  }

  .news_liste .news_liste_a .liste_a_right {
    flex: 1;
    height: 100%;
    display: flex;
    margin-right: p2r(16);
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .news_liste_a .liste_a_right .a_right_title {
    width: 100%;
    height:ptr(70);
    font-size: ptr(24);
    line-height: ptr(35);
    font-weight: 600;
    word-break: break-word;
   
    color: #393939;
    @include omit(2)
  }

  .news_liste_a .liste_a_right .a_right_exp {
    height: 2rem;
    width: 100%;
    font-size: 0.62rem;
    line-height: 1rem;
    max-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #696969;
    word-break: break-all;
  }

  .news_liste_a .liste_a_right .a_right_bottom {
    width: 100%;
    // height: 0.78rem;
    font-size: 0.58rem;
    line-height: 0.78rem;
    color: #696969;
  }

  .liste_a_right .a_right_bottom .news_reco .news_reco_txt,
  .liste_a_right .a_right_bottom .news_reco .news_reco_num {
    background: #e5e5e5;
    vertical-align: middle;
    width: auto;
    height: 0.78rem;
    padding: 0 5px;
    text-align: center;
    line-height: 0.78rem;
    font-size: 0.58rem;
    margin: 0;
  }

  .liste_a_right .a_right_bottom .news_reco .news_reco_txt {
    margin: 0 2px;
  }

  .news_detail {
    width: 100%;
    height: auto;
  }

  .news_detail .news_title {
    width: 100%;
    height: auto;
    line-height: 0.97rem;
    font-size: 0.872rem;
    font-weight: 600;
    color: #595959;
    padding: 0.5rem;
    text-align: center;
  }

  .news_detail .news_content {
    width: 100%;
    height: auto;
    border-top: 1px solid #d0d0d0;
    border-bottom: 1px solid #d0d0d0;
    padding: 0.5rem;
  }

  .news_detail .news_content .content_top {
    width: 100%;
    height: 0.58rem;
    margin-bottom: 0.5rem;
    font-size: 0.58rem;
    line-height: 0.58rem;
    vertical-align: middle;
  }

  .news_detail .news_content .content_top .content_share {
    color: #4d4d4d;
  }
}
</style>

  
 