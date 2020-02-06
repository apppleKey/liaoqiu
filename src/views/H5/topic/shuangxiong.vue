<template>
  <div class="topic_shuangxiong">
    <!-- <mt-header title="NBA" style="background:red">
      <div slot="left" @click="back">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>-->
    <div class="top" v-if="isShowTop">
      <mt-header
        :title="$route.meta.title"
        style="background-image: linear-gradient(-142deg, #fe2953 0%, #ff2725 100%);"
      >
        <div slot="left" @click="back">
          <mt-button icon="back">返回</mt-button>
        </div>
      </mt-header>
    </div>
    <div class="area1"></div>
    <div class="area2">
      <div class="download" @click="goToDownload"></div>
    </div>
    <div class="area3">
      <div class="links">
        <div
          class="link"
          v-for="(item,index) in anchorList "
          :key="'anchor'+index"
          :data-ss='item.uid'
          @click="goToPlay(item,index)"
        ></div>
      </div>
    </div>
    <div class="area4"></div>
  </div>
</template>
<script>
import { appInterface } from "@/assets/js/utils.js";
// import Swiper from "swiper";
export default {
  data() {
    return {
      loadingStatus: 0,
      anchorList: [
        { uid: "25741" },
        { uid: "27387" },
        { uid: "23799" },
        { uid: "25017" }
      ],
      isShowTop: false
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
          "/index.php?g=Wwapi&m=Anchor&a=getAnchorByUid&uid=[25741, 27387, 23799, 25017]"
        )
        .then(res => {
          this.loadingStatus = 0;
          var data=res.data;
         this.anchorList.map((item,i) => {
            for (var j = 0; j < data.length; j++) {
              if (item.uid == data[j].uid) {
               this.anchorList[i] = data[j];
                break;
              }
            }
          });
          this.$forceUpdate();
        })
        .catch(err => {
          this.loadingStatus = 4;
          console.log(err)
        });
    },
    back() {
      history.go(-1);
    },
    goToDownload() {
      if (appInterface.isApp) {
        appInterface.jsOpenBrower(JSON.stringify({ url: "https://zb18.me/d" }));
      } else {
        location.href = "https://zb18.me/d";
      }
    },
    goToPlay(item, index) {
      const uid = item.uid;
      console.log(uid,item.pullm3u8)
      if (!uid || !item.pullm3u8) return this.$toast("尚未开播哦~");
      if (appInterface.isApp) {
        var params = {
          pull_url: item.pullm3u8,
          html_url:
            location.origin +
            "/app/components/anchorPlay/app-index.html?id=" +
            uid,
          title: item.title || item.user_nicename,
           roomId:uid,
          videoType:1 
        };
        appInterface.jsPlay(JSON.stringify(params));
      } else {
        location.href = "/index.php?g=H5&m=Anchor&a=play&uid=" + uid;
      }
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
.topic_shuangxiong {
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
  .area1 {
    width: ptr(750);
    height: ptr(1207);
    background: url("../../../../static/imgs/shuangxiong/m1.jpg") no-repeat
      center center / 100% 100%;
  }
  .area2 {
    width: ptr(750);
    height: ptr(1519);
    background: url("../../../../static/imgs/shuangxiong/m2.jpg") no-repeat
      center center / 100% 100%;
    position: relative;

    .download {
      position: absolute;
      top: ptr(460);
      left: 50%;
      transform: translateX(-50%);
      //   background-color: rgba(180, 60, 60, 0.425);
      width: ptr(380);
      height: ptr(100);
      border-radius: ptr(50);
    }
  }
  .area3 {
    width: ptr(750);
    height: ptr(1250);
    background: url("../../../../static/imgs/shuangxiong/m3.jpg") no-repeat
      center center / 100% 100%;
    position: relative;
    .links {
      position: absolute;
      bottom: ptr(40);
      // background-color: rgba(255, 255, 255, 0.774);
      width: ptr(500);
      height: ptr(520);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      .link {
        width: ptr(230);
        height: ptr(230);
        // background-color: rgba(231, 17, 17, 0.644);
      }
    }
  }
  .area4 {
    width: ptr(750);
    height: ptr(1276);
    background: url("../../../../static/imgs/shuangxiong/m4.jpg") no-repeat
      center center / 100% 100%;
  }
}
</style>

