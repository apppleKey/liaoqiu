<template>
  <div class="topic_NBA">
    <!-- <mt-header title="NBA" style="background:red">
      <div slot="left" @click="back">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>-->
    <div class="top" v-if="isShowTop">
      <mt-header
        title="NBA"
        style="background-image: linear-gradient(-142deg, #fe2953 0%, #ff2725 100%);"
      >
        <div slot="left" @click="back">
          <mt-button icon="back">返回</mt-button>
        </div>
      </mt-header>
    </div>
    <swiper :options="mainSwiperOption" ref="mainSwiper" style="height:100%;">
      <swiper-slide style="overflow:hidden;">
        <div class="banner">
          <img :src="'./static/imgs/NBA/banner.png'" alt />
        </div>
        <div class="anchor">
          <!-- <div class="anchor_title_bg"> -->
          <div class="anchor_title"></div>
          <!-- </div> -->
          <div class="anchor-list-wrap banxin">
            <div class="anchor-list" v-if="anchorList.length">
              <swiper :options="anchorSwiperOption" ref="mySwiper">
                <swiper-slide
                  :class="'anchor-list-item '+(item.islive==1?'live':'')"
                  v-for="(item,index) in anchorList"
                  :key="'anchor'+index"
                >
                  <a :href="'/index.php?g=H5&m=Anchor&a=play&uid='+item.uid" class="an-logo">
                    <img v-lazy="item.avatar" alt />
                  </a>
                  <div class="an-name omit">{{item.user_nicename}}</div>
                  <a href="javascript:void(0)" @click="goToPlay(item)" class="an-room">直播间</a>
                  <a href="javascript:void(0)" @click="goToZone(item)" class="an-pagecenter">进入个人主页</a>
                </swiper-slide>
              </swiper>

              <!-- <div class="anchor-list-item swiper-slide" v-for='(item,index) in anchorList' :key="'anchor'+index">
            <a href="#" class="an-logo">
              <img src="//vender.itech8.net/public/front/images/ddefault.jpg" alt />
            </a>
            <div class="an-name omit">北冥</div>
            <a href="#" class="an-room">直播间</a>
            <a href="#" class="an-pagecenter">进入个人主页</a>
              </div>-->
            </div>
            <weloading :loadingStatus="loadingStatus" />
          </div>
        </div>
        <!-- <div class="schedu_enter">
          <div class="title"></div>
        </div>-->
        <div class="next-page icon-arrow-down iconfont"></div>
      </swiper-slide>
      <swiper-slide class="schedu_slide">
        <div class="schedu_enter">
          <div class="title"></div>
        </div>
        <div class="up icon-arrow-up iconfont" @click.stop="mainSlideTo(0)"></div>

        <iframe src="https://www.zhibo899.com/#/NBA" frameborder="0" class="schedu_iframe"></iframe>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import weloading from "@/componets/loading.vue";
import { appInterface } from "@/assets/js/utils.js";
import Swiper from "swiper";
export default {
  components: { weloading },
  data() {
    return {
      loadingStatus: 0,
      anchorList: [
        { uid: 27992 },
        { uid: 25741 },
        { uid: 22156 },
        { uid: 26885 },
        { uid: 22171 },
        { uid: 25017 },
        { uid: 22390 },
        { uid: 24313 },
        { uid: 22331 },
        { uid: 25555 }
      ],
      isShowTop: false,
      anchorSwiperOption: {
        slidesPerView: 2.7,
        auto: true
      },
      mainSwiperOption: {
        direction: "vertical"
      }
    };
  },

  created() {
    // 初始化顶部栏
    // console.log(appInterface);
    if (navigator.userAgent.indexOf("kinglive") > -1) {
      this.isShowTop = false;
      this.$nextTick(() => {
        $(".topic_NBA").css({ "padding-top": "0rem" });
      });
    } else {
      this.isShowTop = true;
      this.$nextTick(() => {
        $(".topic_NBA").css({ "padding-top": "2rem" });
      });
    }
    this.countRem();
    this.getAnchor();
  },
  mounted() {},
  methods: {
    getAnchor() {
      this.loadingStatus = 1;
      this.$http
        .get(
          "/index.php?g=Wwapi&m=Anchor&a=getAnchorByUid&uid=[27992,25555,22331,26885,22171,22156,25741,22390,24313,25017]"
        )
        .then(res => {
          this.loadingStatus = 0;
          var data = res.data || [];
          for (var i = 0; i < this.anchorList.length; i++) {
            for (var j = 0; j < data.length; j++) {
              if (this.anchorList[i].uid == data[j].uid) {
                this.anchorList[i] = data[j];
                break;
              }
            }
          }
          this.$forceUpdate();
        })
        .catch(err => {
          this.loadingStatus = 4;
          console.log(err)
        });
    },
    back() {
      // if (this.$refs.mainSwiper.swiper.realIndex == 1) {
      //   this.mainSlideTo(0);
      //   return;
      // }
      history.go(-1);
    },
    goToPlay(item) {
      if (appInterface.isApp) {
        var params = {
          pull_url: item.pullm3u8,
          html_url:
            location.origin +
            "/app/components/anchorPlay/app-index.html?id=" +
            item.uid,
          title: item.title || item.user_nicename,
          roomId:item.uid,
          videoType:1 //1 代表有主播直播,2,代表无主播直播,3,代表回放视频或者短视频
        };
        appInterface.jsPlay(JSON.stringify(params));
      } else {
        location.href = "/index.php?g=H5&m=Anchor&a=play&uid=" + item.uid;
      }
    },
    goToZone(item) {
      if (appInterface.isApp) {
        appInterface.jsNewActivity(
          location.origin + "/H5/page/#/anchor?id=" + item.uid
        );
      } else {
        location.href = location.origin + "/H5/page/#/anchor?id=" + item.uid;
      }
    },
    mainSlideTo(index) {
      this.$refs.mainSwiper.swiper.slideTo(index);
    },
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
.topic_NBA {
  height: 100%;
  width: 100%;
  // padding-top: ptr(75);
  //   background-color: red;
  .top {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: ptr(75);
    background-image: linear-gradient(-142deg, #fe2953 0%, #ff2725 100%);
    font-size: 1rem;
    line-height: ptr(75);
    text-align: center;
    font-weight: 600;
    z-index: 5;
    color: #fff;
    .back1 {
      position: absolute;
      left: 0.8533333333rem;
      top: 0;
      width: auto;
      font-size: ptr(60);
      transform: scaleY(1.4);
      height: 80.4%;
      line-height: ptr(70);
      background: no-repeat left center/.64rem 0.9066666667rem;
      font-weight: 400;
      color: #fff;
    }
  }
  .banner {
    height: ptr(620);
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  //   主播
  .anchor {
    border: 1px solid transparent;
    //   .anchor_title_bg{
    position: relative;
    margin: ptr(-136) auto 0;
    // margin: 0 auto;
    background: url("../../../../static/imgs/NBA/bg_round.png") no-repeat center
      top / ptr(728) ptr(230);
    //   width: ptr(728);
    //   height: ptr(230);
    z-index: 1;
    padding-top: ptr(20);
    .anchor_title {
      width: ptr(510);
      height: ptr(90);
      margin: ptr(20) auto ptr(0);
      background: url("../../../../static/imgs/NBA/title_o.png") no-repeat
        center center / 100% 100%;
    }
    // }
    .anchor-list-wrap {
      text-align: center;
      //   overflow-x: auto;
      width: 100%;

      .anchor-list {
        // display: inline-block;
        // overflow: hidden;
        width: 100%;
        .no-data {
          padding: 40px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.555);
        }
        .anchor-list-item {
          &.live {
            background: url("../../../../static/imgs/NBA/zbj_bg.png") no-repeat
              center center/100% 100%;
            opacity: 1;
            .an-room {
              background: #fff;
              color: #4883ff;
              border: 1px solid #fff;
            }
          }

          float: left;
          width: ptr(270);
          height: ptr(378);

          background: url("../../../../static/imgs/NBA/zbj_bg_n.png") no-repeat
            center center/100% 100%;
          opacity: 0.8;
          padding: ptr(45) ptr(30);
          .an-logo {
            text-align: center;
            height: ptr(113);
            display: block;

            img {
              width: ptr(113);
              height: ptr(113);
              border-radius: 50%;
            }
          }

          .an-name {
            font-size: ptr(24);
            font-family: PingFang SC;
            font-weight: 300;
            color: rgba(255, 255, 255, 1);
            line-height: ptr(26);
            width: 83%;
            margin: ptr(15) auto 0;
          }

          .an-room {
            display: block;
            width: ptr(141);
            height: ptr(45);

            border-radius: 4px;
            font-weight: 500;
            line-height: ptr(45);
            margin: ptr(10) auto ptr(20);
            font-size: ptr(30);
            border: 1px solid #fff;
            background: transparent;
            color: white;
            box-shadow: ptr(4) ptr(7) ptr(6) ptr(2) rgba(30, 23, 98, 0.19);
          }

          .an-pagecenter {
            display: block;
            font-size: ptr(30);
            color: white;
          }
        }
      }
    }
  }
  .next-page {
    color: rgba(255, 41, 41, 0.685);
    width: ptr(75);
    position: absolute;
    font-size: ptr(80);
    bottom: 0;
    left: 50%;
    margin-left: ptr(-38);
    transform: translateY(0px) scaleX(1.2);
    animation: 1s arrow infinite;
    z-index: 10;
  }
  @keyframes arrow {
    from {
      transform: translateY(ptr(-30)) scaleX(1.2);
    }
    to {
      transform: translateY(0px) scaleX(1.2);
    }
  }

  .schedu_enter {
    padding-top: ptr(37);
    .title {
      //   width: ptr(513);
      height: ptr(93);
      background: url("../../../../static/imgs/NBA/title_round_t.png") no-repeat
        center top / ptr(513) ptr(93);
    }
  }
  .schedu_slide {
    position: relative;
    padding-top: ptr(130);
    .schedu_enter {
      padding-top: ptr(0);
      position: absolute;
      width: 100%;
      top: ptr(20);
    }
    .up {
      position: absolute;
      width: ptr(70);
      height: ptr(70);
      line-height: ptr(70);
      text-align: center;
      border-radius: 50%;
      font-size: ptr(40);
      background-color: rgba(252, 33, 33, 0.767);
      font-weight: bold;
      right: ptr(50);
      bottom: 50px;
      z-index: 1000;
      box-shadow: 0 0 6px #eb413e;
      color: #fff;
      transition: all 0.5s;
    }
    .schedu_iframe {
      height: 100%;
      width: 100%;
      // background-color: rgba(0, 255, 98, 0.863);
    }
  }
}
</style>

