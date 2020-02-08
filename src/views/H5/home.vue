<template>
  <div class="h5_container">
    <div class="banner_conn">
      <div class="banner">
        <swiper :options="swiperOption">
          <swiper-slide class="swiper-slide" v-for="(item,index) in bannerOpt" :key="index">
            <a :href="item.href" target="_blank">
              <img :src="item.src" />
            </a>
          </swiper-slide>
          <!-- 分页器 -->
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <!-- 左右箭头 -->
          <div
            class="swiper-button-prev swiper-button-white"
            style="background-color:rgba(0,0,0,.8);left:0; width:1.6rem;height:3.2rem;"
            slot="button-prev"
          ></div>
          <div
            class="swiper-button-next swiper-button-white"
            style="background-color:rgba(0,0,0,.8);right:0;width:1.6rem;height:3.2rem;"
            slot="button-prev"
          ></div>
        </swiper>
      </div>
      <div class="friendLinks">
        <a href="https://zhibo18.live" target="_blank">
          <img :src="'./static/images/h5/wzzb.png'" alt title="王者体育直播" />
        </a>
        <a href="https://m.dp18.me/#/" target="_blank">
          <img :src="'./static/images/h5/bcd.png'" alt title="B_C点评" />
        </a>
        <a href="https://www.fire18.tv" target="_blank">
          <img :src="'./static/images/h5/fire18.png'" alt title="烽火电竞" />
        </a>
      </div>
    </div>

    <div class="lanmu banxin">
      <div class="lanmu_header">
        <div class="lanmu_name">资讯</div>
      </div>
      <div class="lanmu_body">
        <div class="lanmu_list">
          <a
            :href="'#/H5/news/'+item.pid"
            class="lanmu_item"
            v-for="item in newsList"
            :key="item.pid"
          >
            <img class="info_img" :src="item.smeta.thumb" alt />
            <div class="li_info">
              <div class="li_title">{{item.post_title}}</div>
              <div class="info_txt">{{item.post_title}}</div>
            </div>
          </a>
        </div>
        <loading :loadingStatus="newsLoadingStatus" @loadmore="getMoreNews" />
      </div>
    </div>

    <div class="adj">
      <img :src="'./static/images/lpl.png'" alt />
    </div>
    <div class="lanmu tuidan banxin">
      <div class="lanmu_header">
        <div class="lanmu_name">百家推单</div>
      </div>
      <div class="lanmu_body">
        <div class="lanmu_list">
          <Planlist :planList='planList'/>
          <!-- <div class="lanmu_item" v-for="item in newsList" :key="item.pid">
              <div class="li_title">{{item.post_title}}</div>
              <div class="li_info">
                <img class="info_img" :src="item.smeta.thumb" alt />
                <div class="info_txt">{{item.post_title}}</div>
              </div>
          </div>-->
        </div>
        <loading :loadingStatus="planLoadingStatus" @loadmore="getMorePlan" />
      </div>
    </div>
  </div>
</template>
<script>
import loading from "@/views/H5/components/loading.vue";
import Planlist from "@/views/H5/plan/planList.vue";
export default {
  components: { loading ,Planlist},
  data() {
    return {
      bannerOpt: [
        { src: "./static/images/p1.png", href: "/1" },
        { src: "./static/images/p2.png", href: "/2" },
        { src: "./static/images/p3.png", href: "/3" }
      ],
      swiperOption: {
        // //显示分页
        // pagination: {
        //   el: ".swiper-pagination"
        // },
        // //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //自动轮播
        // speed: 1000,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },

        disableOnInteraction: true,
        //开启循环模式
        loop: true
      },
      newsLoadingStatus: 0,
      newsPage: 1,
      newsList: [],
      newsPagesize: 10,
      planPage: 0,
      planLoadingStatus: 0,
      planList: [],
      planPagesize: 10
    };
  },
  created() {
    //   this.$store.dispatch("freshToken")
    // this.getNews();
    this.getPlan();
  },
  methods: {
    //资讯列表
    getNews() {
      this.newsLoadingStatus = 1;
      this.$http
        .get("/index.php?g=H5&m=News&a=getAllArticle&uid=false", {
          params: { page: this.newsPage, size: this.newsPagesize }
        })
        .then(res => {
          this.newsLoadingStatus = 2;
          //   console.log(1111111, res.data.list);
          this.newsList = res.data.list || [];

          if (this.newsList.length == 0) {
            this.newsLoadingStatus = 4; //暂无数据
          } else if (this.newsList.length < this.newsPagesize) {
            this.newsLoadingStatus = 3; //没有更多
          } else {
            this.newsLoadingStatus = 2; //加载
          }
        })
        .catch(err => {
          this.newsLoadingStatus = 10; //加载错误
          console.log(err);
        });
    },
    //加载更多资讯
    getMoreNews() {
      this.newsLoadingStatus = 1;
      this.newsPage += 1;
      this.$http
        .get("/index.php?g=H5&m=News&a=getAllArticle&uid=false", {
          params: { page: this.newsPage, size: this.newsPagesize }
        })
        .then(res => {
          var list = res.data.list || [];
          var length = list.length;
          if (length == 0) {
            this.newsLoadingStatus = 4; //暂无数据
          } else if (length < this.newsPagesize) {
            this.newsList = this.newsList.concat(list);
            this.newsLoadingStatus = 3; //没有更多list
          } else {
            this.newsList = this.newsList.concat(list);
            this.newsLoadingStatus = 2; //加载更多
          }
        })
        .catch(err => {
          this.newsLoadingStatus = 10;
          this.newsPage -= 1;
          console.log(err);
        });
    },
    //推单列表
    getPlan() {
      this.planLoadingStatus = 1;
      this.$http
        .post("/live/api/news/plan/query_plan_list", {
          queryId: 0,
          pageSize: this.planPagesize
        })
        .then(res => {
          this.planLoadingStatus = 2;
          //   console.log(1111111, res.data.list);
          this.planList = res.data.anchorPlanInfoList || [];

          if (this.planList.length == 0) {
            this.planLoadingStatus = 4; //暂无数据Plan
          } else if (this.planList.length < this.planPagesize) {
            this.planLoadingStatus = 3; //没有更多
            this.planPage = this.planList[
              this.planList.length - 1
            ].planInfo.planId;
          } else {
            this.planLoadingStatus = 2; //加载更多
            this.planPage = this.planList[
              this.planList.length - 1
            ].planInfo.planId;
          }
        })
        .catch(err => {
          this.planLoadingStatus = 10; //加载错误
          console.log(err);
        });
    },
    //加载更多推单
    getMorePlan() {
      this.planLoadingStatus = 1;
      this.$http
        .post("/live/api/news/plan/query_plan_list", {
          queryId: this.planPage,
          pageSize: this.planPagesize
        })
        .then(res => {
          var list = res.data.anchorPlanInfoList || [];
          var length = list.length;
          if (list.length == 0) {
            this.planLoadingStatus = 4; //暂无数据
          } else if (length < this.planPagesize) {
            this.planPage = list[list.length - 1].planInfo.planId;
            this.planList = this.planList.concat(list);
            this.planLoadingStatus = 3; //没有更多
          } else {
            this.planPage = list[list.length - 1].planInfo.planId;
            this.planList = this.planList.concat(list);
            this.planLoadingStatus = 2; //加载更多
          }
        })
        .catch(err => {
          this.planLoadingStatus = 10;
          console.log(err);
        });
    },
    //时间转换
    dateFormatCustom(date) {
      var timer = date != null ? new Date(date) : new Date();
      var y = timer.getFullYear();
      var M = timer.getMonth() + 1;
      var d = timer.getDate();
      var h = timer.getHours();
      var m = timer.getMinutes();
      var s = timer.getSeconds();
      M = M < 10 ? "0" + M : M;
      d = d < 10 ? "0" + d : d;
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return M + "月" + d + "日 " + h + ":" + m;
    }
  }
};
</script>
<style lang="scss" >
.h5_container {
  .swiper-button-next.swiper-button-white,
  .swiper-button-prev.swiper-button-white {
    background-size: 56%;
  }
}
</style>
<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.h5_container {
  // background-color: red;
  .banxin {
    width: 100%;
    margin: 0 auto;
  }
  .banner_conn {
    background: #181818;
    overflow: hidden;
  }
  .banner {
    width: 100%;
    height: ptr(400);
    margin: 0 auto;
    overflow: hidden;
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .friendLinks {
    margin: ptr(19) auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ptr(11);
    a {
      width: 32%;
      height: ptr(160);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .lanmu {
    margin-bottom: 20px;
    .lanmu_header {
      padding: 0 ptr(20);
      height: ptr(103);
      line-height: ptr(103);
      .lanmu_name {
        font-size: ptr(42);
        font-family: Lantinghei SC;
        font-weight: 600;
        color: rgba(12, 12, 12, 1);
        float: left;
      }
    }
    .lanmu_body {
      padding: 0 ptr(20);
      .lanmu_list {
        margin-bottom: 20px;
        .lanmu_item {
          display: inline-block;
          margin-bottom: ptr(40);
          width: 100%;
          height: ptr(290);
          border: 1px solid rgba(238, 238, 238, 1);
          padding: ptr(31) ptr(22);
          box-shadow: 4px 5px 5px #e4e2e2;
          background: linear-gradient(
            0deg,
            rgba(246, 246, 246, 1) 0%,
            rgba(255, 255, 255, 1) 100%
          );
        }
        .info_img {
          width: ptr(220);
          height: ptr(220);
          float: left;
        }
        .li_info {
          margin-left: ptr(240);
          .li_title {
            height: ptr(90);
            line-height: ptr(49);
            @include omit(2);
            font-weight: 400;
            font-size: ptr(32);
            font-weight: bold;
            color: rgba(50, 50, 50, 1);
            line-height: ptr(50);
          }
          .info_txt {
            width: 100%;
            height: ptr(110);
            margin-top: ptr(27);
            font-size: ptr(26);
            font-family: Lantinghei SC;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
            line-height: ptr(36);
            @include omit(3);
          }
        }
      }
    }
  }

  .adj {
    height: ptr(180);
    overflow: hidden;
    background: rgba(24, 24, 24, 1);
    img {
      width: 100%;
      height: 100%;
    }
  }

  .lanmu.tuidan {
    overflow: hidden;
    .recommendItem {
      padding: 0 0 25px;
      border-bottom: 1px dotted #e5e5e5;
      overflow: hidden;
      margin-top: 25px;
      //   height: 320px;
      padding: 19px 50px;
      min-height: 320px;
      border: 2px solid rgba(238, 238, 238, 1);
      background: linear-gradient(
        0deg,
        rgba(246, 246, 246, 1) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }
    .itemAnchor {
      width: 290px;
      float: left;
      overflow: hidden;
      text-align: center;
    }
    .itemAnchor dt {
      overflow: hidden;
      text-align: center;
    }
    .itemAnchor dt img {
      width: 161px;
      height: 161px;
      border-radius: 50%;
      overflow: hidden;
      display: block;
      margin: 0 auto 10px;
    }
    .itemAnchor dt strong {
      display: block;
      overflow: hidden;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    .itemAnchor dt strong a {
      font-size: 14px;
      color: #333333;
      display: block;
      font-weight: normal;
    }
    .itemAnchor dt strong a:hover {
      color: #ff454f;
    }
    .itemAnchor dd {
      //   width: 58px;
      display: inline-block;
      height: 40px;
      font-size: 24px;
      padding: 0 20px;
      color: #ff454f;
      text-align: center;
      line-height: 36px;
      overflow: hidden;
      margin: 10px;
      border: 2px solid rgba(253, 71, 84, 1);
      border-radius: 4px;
    }
    .itemMain {
      margin-left: 297px;
      overflow: hidden;
    }
    .itemTitle {
      font-size: 24px;
      min-height: 36px;
      line-height: 36px;
      overflow: hidden;
      margin-bottom: 4px;
    }
    .itemTitle a {
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;
      font-size: 36px;
      line-height: 48px;
      overflow: hidden;
    }
    .itemTitle a:hover {
      color: #ff454f;
    }
    .itemContant {
      background: #f1f1f1;
      border-radius: 4px;
      padding: 20px;
      margin: 10px 0;
      overflow: hidden;
    }
    .itemOther {
      overflow: hidden;
      margin-bottom: 5px;
    }
    .itemLeagueMatch {
      font-size: 32px;
      font-family: Lantinghei SC;
      font-weight: 400;
      color: rgba(26, 156, 252, 1);
      line-height: 36px;
      float: left;
      margin: 0 20px;
    }
    .itemEventTag {
      border: 1px solid #ddd;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      color: #6a62ff;
      display: block;
      float: left;
      font-weight: normal;
      border-radius: 20px;
      font-size: 24px;
      margin-right: 10px;
    }
    .itemEventTag_1 {
      color: #58c14b;
    }
    .itemEventTag_2 {
      color: #6a62ff;
    }
    .itemEventTag_3 {
      color: #fba423;
    }
    .itemEventTag_4 {
      color: #9fa1bf;
    }
    .itemEventTag_5 {
      color: #6935ff;
    }
    .itemEventTag_6 {
      color: #ff2d84;
    }
    .itemEventTag_7 {
      color: #614aa9;
    }
    .itemEventTag_8 {
      color: #6a62ff;
    }
    .itemEventName {
      color: #0099ff;
      font-size: 16px;
      margin-right: 10px;
      overflow: hidden;
      height: 20px;
      line-height: 20px;
      display: block;
      float: left;
      margin-right: 10px;
    }
    .itemEventTimer {
      display: block;
      color: #6a6a6a;
      float: left;
      line-height: 20px;
      font-weight: normal;
      font-size: 32px;
      font-weight: 400;
      color: rgba(106, 106, 106, 1);
      line-height: 36px;
    }
    .itemDesc {
      font-size: 16px;
      color: #333;
      display: block;
      overflow: hidden;
      min-height: 36px;
      height: auto;
      font-size: 32px;
      font-weight: 400;
      color: rgba(48, 48, 48, 1);
      line-height: 36px;
    }
    .itemDesc:hover {
      color: #ff454f;
    }
    .itemTimer {
      margin-top: 5px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 36px;
    }
  }
  .footer {
    height: 200px;
    overflow: hidden;
    background: rgba(24, 24, 24, 1);
    .banxin {
      margin-top: 45px;
      color: #919191;
      font-size: 16px;
      font-family: Lantinghei SC;
      font-weight: bold;
      color: rgba(145, 145, 145, 1);
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>


