<template>
  <div class="h5_live_play">
    <!-- 赛事信息 -->
    <div class="top" v-if="isShowTop &&isShowPlayer" >
      <mt-header
        :title="liveInfo.hname+'VS'+liveInfo.aname"
        style="background-image: linear-gradient(-142deg, #fe2953 0%, #ff2725 100%);"
      >
        <div slot="left" @click="back">
          <mt-button icon="back">返回</mt-button>
        </div>
      </mt-header>
    </div>
    <!-- 播放器 -->
    <div class="myplayer">
      <dplayer :option="playerOption" v-if="isShowPlayer" />
    </div>
    <div class="rooms" v-show="isShowPlayer">
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
    </div>

    <div class="live_info"  v-if="isShowPlayer" >
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
    <div class="chat">
      <chat v-show='isShowChat'/>
    </div>
    <flower :loading="loading"/>
  </div>
</template>
<script>
import flower from "@/componets/flower.vue";
import chat from "@/componets/chatbox_h5.vue";
import loading from "@/componets/loading.vue";
import dplayer from "./dplayer3.vue";
export default {
  components: {
    flower,
    // livelist,
    loading,
    dplayer,
    chat
  },
  data() {
    return {
      mid: this.$route.params.id,
      sinal: this.$route.query.sinal,
      loadingStatus: 0,
      loading: false,
      liveInfo: {},
      nowList: [],
      currentFullDate: "",
      currentType: null,
      pagesize: 30,
      pagenum: 0,
      canMore: true,
      isShowPlayer: false,
      playerOption: {},
      isShowTop: true,
      isShowChat:false
    };
  },
  created() {
    this.getVideoInfo();
    if(!this.$store.state.userinfo.token){
      this.$store.dispatch('freshToken')
    }
  },
  methods: {
    fomartTime(str) {
      if (str) {
        return str.slice(11, 16);
      } else {
        return "--";
      }
    },
    todayString() {
      var i = 0;
      var date = new Date();
      date = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
      var m = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var d = date.getDate(); //获取当前日(1-31)
      //获取当前星期X(0-6,0代表星期天)
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      return date.getFullYear() + "-" + m + "-" + d;
    },

    //计算聊天容器应有的高度
    calcChatBoxHeight() {
      var leaveHight =
        $(".h5_live_play").height() -
        $(".top").outerHeight(true) -
        $(".myplayer").outerHeight(true) -
        $(".rooms").outerHeight(true) -
        $(".live_info").outerHeight(true);
        // console.log($(".h5_live_play").outerHeight(true));
        // console.log($(".top").outerHeight(true));
        // console.log($(".myplayer").outerHeight(true));
        // console.log($(".rooms").outerHeight(true) );
        // console.log($(".live_info").outerHeight());
        // console.log(leaveHight);
      $(".chat").css("height", leaveHight + "px");
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
        }
        this.sinal = sinal;
        this.isShowPlayer = false;
        this.$nextTick(() => {
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
          this.isShowPlayer = true;
        });
      }
    },
    getVideoInfo() {
      this.loading = true;
      this.$http
        .get("/index.php?g=Wwapi&m=Shanmao&a=eventDetail&mid=" + this.mid)
        .then(res => {
          console.log(res);
          this.loading = false;
          this.liveInfo = res.data[0] || {};
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
          this.isShowChat=true;
          this.$nextTick(() => {
            setTimeout(()=>{

              this.calcChatBoxHeight();
            },100)
          });
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    back() {
      history.go(-1);
    },
 
  
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";
.h5_live_play {
  height: 100%;
 
  .myplayer {
    width: 100%;
    min-height: ptr(424);
    background: url("../../../../static/imgs/beforeloading.png") no-repeat
        center center / 200px,
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
  .source-selsetor {
    height: ptr(80);
    background: rgba(255, 228, 230, 1);
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
}
</style>

