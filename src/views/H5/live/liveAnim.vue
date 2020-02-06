<template>
  <div class="liveAnim">
    <!-- 赛事信息 -->
    <div class="top" v-if="isAnimate||isShowPlayer">
      <mt-header
        :title="liveInfo.hname+'VS'+liveInfo.aname"
        style="background-image: linear-gradient(-142deg, #fe2953 0%, #ff2725 100%);"
      >
        <div slot="left" @click="back">
          <mt-button icon="back">返回</mt-button>
        </div>
      </mt-header>
    </div>
    <!-- 动画 -->
    <iframe
      frameborder="false"
      v-if="isAnimate"
      :src="animSrc"
      id="animate"
      style="width:100%;height:185px;"
      scrolling="no"
    ></iframe>
    <!-- 播放器 -->
    <div :class="isAnimate?'':'myplayer'" class="playing">
      <dplayer :option="playerOption" v-if="isShowPlayer&&!isAnimate" />
    </div>
    <!-- 房间 -->
    <div class="rooms" v-if="isAnimate||isShowPlayer">
      <span
        class="play iconfont icon-bofang"
        :class="{islive:liveInfo.stream&&liveInfo.stream.status,isPlay:sinal=='stream'}"
        v-if="liveInfo.stream&&liveInfo.stream.m3u8"
        @click="changeRoom('stream')"
      >&nbsp; 直播1</span>
      <span
        class="play iconfont icon-bofang"
        :class="{islive:liveInfo.streamAmAli&&liveInfo.streamAmAli.status,isPlay:sinal=='streamAmAli'}"
        v-if="liveInfo.streamAmAli&&liveInfo.streamAmAli.m3u8"
        @click="changeRoom('streamAmAli')"
      >&nbsp;直播2</span>
      <span
        class="play iconfont icon-bofang"
        :class="{islive:liveInfo.streamNa&&liveInfo.streamNa.live&&liveInfo.streamNa.live.status,isPlay:sinal=='streamNa'}"
        v-if="liveInfo.streamNa&&liveInfo.streamNa.live&&liveInfo.streamNa.live.m3u8"
        @click="changeRoom('streamNa')"
      >&nbsp;直播3</span>
      <span
        class="play iconfont icon-bofang"
        :class="{islive:liveInfo.streamNa&&liveInfo.streamNa.anim&&liveInfo.streamNa.anim.status,isPlay:sinal=='streamNaAnimate'}"
        v-if="liveInfo.streamNa&&liveInfo.streamNa.anim&&liveInfo.streamNa.anim.anim"
        @click="changeRoom('streamNaAnimate')"
      >&nbsp;动画</span>
    </div>
    <!-- 比分 -->
    <div class="live_info" v-if="isShowPlayer||isAnimate">
      <div class="info1">
        <span>{{liveInfo.lname}}</span>
        <span :class="{islive:liveInfo.gameStage,status:true}">{{liveInfo.gameStage||'未开始'}}</span>
        <span>{{fomartTime(liveInfo.gameTime)}}</span>
      </div>
      <div class="info2">
        <div class="teaminfo tal">
          <img class="team_icon" v-lazy="liveInfo.hicon" style="margin-right:10px;" alt />
          <span class="teamname">{{liveInfo.hname}}</span>
        </div>
        <div class="match_score">{{liveInfo.hTotalScore}}-{{liveInfo.aTotalScore}}</div>
        <div class="teaminfo tar">
          <span class="teamname">{{liveInfo.aname}}</span>
          <img class="team_icon" style="margin-left:10px;" v-lazy="liveInfo.licon" alt />
        </div>
      </div>
    </div>
    <!-- 推荐主播 -->
    <div class="recommend">
      <p class="recommendTitle">光直播没解说不过瘾，可以点击下方主播进行观看哦</p>
      <div class="anchor">
        <span>本场主播：</span>
        <ul class="anchrName" v-if="userInfoList&&userInfoList.length > 0">
          <li v-for="(item,index) in userInfoList" :key="index">
            <a
              class="itemUserName"
              :href="'/index.php?g=H5&m=Anchor&a=play&uid=' + item.uid"
              target="_blank"
            >{{item.username}}</a>
          </li>
        </ul>
        <span style="color:gray;" v-else-if="hasLoadedOtherData">暂无相关主播~</span> 
      </div>
    </div>
    <!-- 推单 -->
    <div class="pushSheet">
      <p>本场推单</p>
      <template v-if="planList&&planList.length > 0">
        <div class="plan_item" v-for="(item,index) in planList" :key="index">
          <div tag="div" class="top_info">
            <div class="avatar_info">
              <div class="avatar">
                <a
                  class="itemAvatar"
                  :href="'/H5/page/#/anchor?id=' + item.anchorSummaryInfo.anchorInfo.uid"
                  target="_blank"
                >
                  <img :src="item.anchorSummaryInfo.anchorInfo.avatar" />
                </a>
              </div>
              <div class="info">
                <p class="user_name">
                  <a
                    :href="'/H5/page/#/anchor?id=' + item.anchorSummaryInfo.anchorInfo.uid"
                    target="_blank"
                  >{{item.anchorSummaryInfo.anchorInfo.username}}</a>
                </p>

                <p class="prob">
                  <span
                    v-for="(subItem,idx) in item.anchorSummaryInfo.winLabelList"
                    :key="idx"
                  >{{item.content}}</span>
                </p>
              </div>
            </div>
            <div class="win_rate" v-if='item.anchorSummaryInfo.winRate!=undefined'>
              胜率
              <span>{{item.anchorSummaryInfo.winRate}}%</span>
            </div>
          </div>
          <div tag="div" class="title">
            <a
              class="itemTitle"
              :href="'/H5/page/#/plan?id=' + item.planInfo.planId"
              target="_blank"
            >{{item.planInfo.planTitle}}</a>
          </div>
          <a tag="div"  :href="'/H5/page/#/plan?id=' + item.planInfo.planId" class="content">
            <div class="match_time">
              <span
                class="round"
                :class="'play'+item.planInfo.playType"
              >{{item.planInfo.playTypeContent}}</span>
              <span class="blue">{{item.planInfo.leagueMatch}}</span>
              <span class="time">{{formatDate(item.planInfo.startTimestamp)}}</span>
            </div>
            <div class="text">{{item.planInfo.planContent}}</div>
          </a>
          <div class="last_time">{{item.planInfo.timeDistance}}</div>
          <!-- <div class="divide">8</div> -->
        </div>
      </template>
      <div style="color:gray;font-size:14px;text-align:center;margin-top:30px;" v-else-if="hasLoadedOtherData==true">暂无相关推单~</div> 

    </div>
    <flower :loading="loading" />
  </div>
</template>

<script>
import flower from "@/componets/flower.vue";
import loading from "@/componets/loading.vue";
import dplayer from "./dplayer3.vue";

export default {
  components: {
    flower,
    loading,
    dplayer
  },
  data() {
    return {
      animSrc: null,
      liveInfo: {},
      playerOption: {},
      mid: this.$route.params.id,
      sinal: this.$route.query.sinal,
      isShowPlayer: false, //播放器
      loading: false,
      isAnimate: false, //动画
      planList: null, //推单
      userInfoList: null, //本场主播
      leisuId: null,
      startTime: null, 
      hasLoadedOtherData:false
    };
  },
  created() {
    this.getVideoInfo();
    if (!this.$store.state.userinfo.token) {
      this.$store.dispatch("freshToken");
    }
    this.isAnimate =
      this.$route.query.sinal == "streamNaAnimate" ? true : false;
    this.isShowPlayer = !this.isAnimate;
  },
  methods: {
    fomartTime(str) {
      if (str) {
        return str.slice(11, 16);
      } else {
        return "--";
      }
    },
    back() {
      history.go(-1);
    },
    getVideoInfo() {
      this.loading = true;
      this.$http
        .get("/index.php?g=Wwapi&m=Shanmao&a=eventDetail&mid=" + this.mid)
        .then(res => {
          this.loading = false;
          this.liveInfo = res.data[0] || {};
          this.animSrc = this.liveInfo.streamNa.anim.anim;
          // this.isAnimate = this.liveInfo.streamNa.anim.status;
          this.leisuId = this.liveInfo.leisuId;
          var startTime = this.liveInfo.gameTime;
          this.startTime = startTime.split('T')[0];
          this.getList();
          switch (this.sinal) {
            case "stream":
              this.playerOption = this.liveInfo[this.sinal];
              break;
            case "streamAmAli":
              this.playerOption = this.liveInfo[this.sinal];
              break;
            case "streamNa":
              this.playerOption = this.liveInfo[this.sinal].live;
              break;
          }
          this.isShowPlayer = this.playerOption.status;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    changeRoom(sinal) {
      if (sinal == this.sinal) {
        return;
      } else {
        switch (sinal) {
          case "stream":
            if (!(this.liveInfo.stream && this.liveInfo.stream.status)) {
              return;
            }
            break;
          case "streamAmAli":
            if (
              !(this.liveInfo.streamAmAli && this.liveInfo.streamAmAli.status)
            ) {
              return;
            }
            break;
          case "streamNa":
            if (
              !(
                this.liveInfo.streamNa &&
                this.liveInfo.streamNa.live &&
                this.liveInfo.streamNa.live.status
              )
            ) {
              return;
            }
            break;
          case "streamNaAnimate":
            if (
              !(
                this.liveInfo.streamNa &&
                this.liveInfo.streamNa.anim &&
                this.liveInfo.streamNa.anim.status
              )
            ) {
              return;
            }
            break;
        }

        this.sinal = sinal;
        // this.isShowPlayer = false;
        this.$nextTick(() => {
          switch (this.sinal) {
            case "stream":
              this.playerOption = this.liveInfo[this.sinal];
              this.isAnimate = false;
              this.isShowPlayer = true;

              break;
            case "streamAmAli":
              this.playerOption = this.liveInfo[this.sinal];
              this.isAnimate = false;
              this.isShowPlayer = true;

              break;
            case "streamNa":
              this.playerOption = this.liveInfo[this.sinal].live;
              this.isAnimate = false;
              this.isShowPlayer = true;

              break;
            case "streamNaAnimate":
              this.isAnimate = true;
              this.isShowPlayer = false;

              break;
          }
          console.log(this.playerOption);
        });
      }
    },
    getList() {
      let that = this;
      this.hasLoadedOtherData=false;
      axios
        .get(`/live/api/schedule/plan/get_current_plan_by_ls_id?dataId=${this.leisuId}&beginTime=${this.startTime}`) //
        .then(function(res) {
          that.hasLoadedOtherData = true;
          that.planList = res.data.data.anchorPlanInfoDTOList||[];
          that.userInfoList = res.data.data.userInfoList||[];
        })
        .catch(function(error) {
          console.log(error)
          that.hasLoadedOtherData=true;

        });
    },
    formatDate(date) {
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
      return y + "年" + M + "月" + d + "日 " + h + ":" + m;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";
.liveAnim {
  min-height: 100vh;
  background-color: rgb(246, 246, 246);
  padding-top: p2r(80);
  padding-bottom: p2r(20);
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.myplayer {
  width: 100%;
  min-height: ptr(424);
  background: url("../../../../static/imgs/beforeloading.png") no-repeat center
      center / 200px,
    url("../../../../static/imgs/zb.png") repeat, #0d0d0d;
  transition: fadein 3s;
  opacity: 1;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.rooms {
  height: ptr(80);
  background-color: #ffe4e6;
  text-align: center;
  padding-top: ptr(15);
  .play {
    width: ptr(150);
    height: ptr(50);
    display: inline-block;
    text-decoration: none;
    margin-right: 2px;
    background: rgba(253, 253, 253, 1);
    color: #6c757d;
    border: 1px solid #6c757d;
    border-radius: 4px;
    line-height: ptr(50);
    text-align: center;
    user-select: none;
    font-size: p2r(26);
    &:hover {
      cursor: not-allowed;
    }
    &.islive {
      border: 1px solid rgba(255, 53, 67, 1);
      color: rgba(255, 53, 67, 1);
      cursor: pointer;
    }
    &.isPlay {
      color: white;
      background-color: rgba(255, 53, 67, 1);
    }
  }
}
.live_info {
  // height: ptr(150);
  width: 100%;
  padding: ptr(19) ptr(30);
  background: rgba(247, 247, 248, 1);
  position: relative;
  .info1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ptr(28);
    .status {
      color: green;
      &.islive {
        color: $main;
      }
    }
  }
  .info2 {
    display: flex;
    margin-top: ptr(20);
    justify-content: space-between;
    align-items: center;
    font-size: ptr(26);
    img {
      height: ptr(40);
    }
    .match_score {
      font-weight: 700;
      color: #212529;
      font-size: ptr(30);
    }
    .tal,
    .tar {
      display: flex;
      width: 40%;
      align-items: center;
      .teamname {
        width: 100%;
      }
    }
  }
  &:before {
    content: "";
    width: 45%;
    height: 2px;
    background-color: #ff3442;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  &:after {
    content: "";
    width: 45%;
    height: 2px;
    background-color: #3683cb;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
.recommend {
  .recommendTitle {
    width: 100%;
    height: ptr(60);
    background-color: #ffe8e8;
    padding: 0 ptr(30);
    color: #ff3543;
    line-height: ptr(60);
    font-size: ptr(24);
  }
  .anchor {
    display: flex;
    background-color: #fff;
    padding: ptr(30) ptr(30) ptr(10);
    span {
      color: #ff3543;
      font-size: ptr(24);
      line-height: ptr(50);
    }
    .anchrName {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      padding: 0 !important;
      margin: 0 !important;
      li {
        height: ptr(50);
        min-width: ptr(100);
        padding: 0 ptr(30);
        background: #ff3543;
        color: white;
        font-size: ptr(24);
        line-height: ptr(50);
        margin-right: ptr(20);
        margin-bottom: ptr(20);
        border-radius: ptr(10);
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          text-decoration: none;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }
    }
  }
}
.pushSheet {
  p {
    width: 100%;
    height: ptr(60);
    padding: 0 ptr(30);
    color: #2b2b2b;
    line-height: ptr(60);
    font-size: ptr(28);
  }
  .plan_item {
    position: relative;
    @include wh(100%, auto);
    padding-top: p2r(20);
    background-color: #fff;
    margin-bottom: p2r(20);
    &:last-child .divide {
      display: none;
    }
    .top_info {
      position: relative;
      @include wh(100%, auto);
      padding: 0 p2r(30);
      @include fs;
      .avatar_info {
        position: relative;
        flex: 1;
        height: auto;
        @include fs;
        .avatar {
          @include rwh(80, 80);
          border-radius: 50%;
          overflow: hidden;
          @include fc;
          .itemAvatar {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          img {
            display: block;
            @include wh(auto, 100%);
            border-radius: 50%;
          }
        }
        .info {
          flex: 1;
          height: auto;
          margin-left: 0;
          .user_name {
            position: relative;
            @include wh(100%, auto);
            line-height: p2r(50);
            word-break: break-all;
            font-size: p2r(28);
            color: #131313;
            text-align: left;
            a {
              color: #131313;
            }
          }
          .prob {
            position: relative;
            @include wh(100, auto);
            line-height: p2r(30);
            text-align: left;
            word-break: break-all;
            vertical-align: middle;
            span {
              display: inline-block;
              @include wh(auto, p2r(30));
              line-height: p2r(30);
              padding: 0 p2r(10);
              background: #ff3542;
              color: #fff;
              font-size: p2r(24);
              margin-right: p2r(10);
              border-radius: 2px;
            }
          }
        }
      }
      .win_rate {
        @include wh(p2r(180), ptr(60));
        font-size: p2r(24);
        color: #666;
        border: 1px solid #ddd;
        border-radius: p2r(10);
        line-height: p2r(60);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        text-align: center;
        padding-left: p2r(18);
        span {
          display: inline-block;
          @include wh(p2r(90), p2r(58));
          vertical-align: text-bottom;
          font-size: p2r(30);
          line-height: p2r(60);
          background: #ff3542;
          color: white;
          font-weight: bold;
          margin-left: p2r(5);
          border-top-right-radius: p2r(10);
          border-bottom-right-radius: p2r(10);
        }
      }
    }
    .title {
      position: relative;
      @include wh(100%, auto);
      padding: p2r(10) p2r(30);
      font-size: p2r(32);
      color: #333;
      text-align: left;
      line-height: p2r(42);
      word-break: break-all;
      a {
        color: #333;
      }
    }
    .content {
      -webkit-tap-highlight-color: transparent;
      display: block;
      position: relative;
      @include wh(p2r(690), auto);
      margin: 0 auto;
      background: #f6f6f6;
      border-radius: 4px;
      padding: p2r(10);
      // &.win{
      //   background: url('~@/images/plan_status.png') no-repeat right top/auto 300%,#f6f6f6;
      // }
      // &.lose{
      //   background: url('~@/images/plan_status.png') no-repeat right center/auto 300%,#f6f6f6;
      // }
      // &.draw{
      //   background: url('~@/images/plan_status.png') no-repeat right bottom/auto 300%,#f6f6f6;
      // }
      .match_time {
        position: relative;
        @include wh(100%, auto);
        word-break: break-all;
        .round {
          @include wh(auto, p2r(40));
          padding: 0 p2r(15);
          border-radius: p2r(20);
          border: p2r(2) solid #ddd;
          font-size: p2r(28);
          color: #6a62ff;
          line-height: p2r(38);
          margin-right: p2r(10);
          font-size: p2r(24);
          &.play1 {
            color: #89d180;
          }
          &.play2 {
            color: #6a62ff;
          }
          &.play3 {
            color: #fbab35;
          }
          &.play4 {
            color: #9fa1bf;
          }
          &.play5 {
            color: #6935ff;
          }
          &.play6 {
            color: #fd4491;
          }
          &.play7 {
            color: #6650ac;
          }
        }
        .blue {
          color: #0099ff;
          font-size: p2r(24);
          margin-right: p2r(10);
        }
        .time {
          color: #666;
          font-size: p2r(24);
        }
      }
      .text {
        position: relative;
        @include wh(100%, auto);
        font-size: p2r(30);
        color: #333;
        text-align: left;
        word-break: break-all;
        line-height: p2r(50);
      }
    }
    .last_time {
      position: relative;
      @include wh(100%, p2r(65));
      line-height: p2r(65);
      font-size: p2r(28);
      color: #666;
      text-indent: p2r(30);
    }
    .divide {
      position: relative;
      @include wh(100%, p2r(18));
      background: #f6f6f6;
    }
  }
}
</style>