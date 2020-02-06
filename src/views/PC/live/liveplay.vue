<template>
  <div class="pc_live_play">
    <div class="containner">
      <div class="left">
        <!-- 赛事信息 -->
        <div class="live_info">
          <div class="corner">
            <div class="sinals">
              <span
                class="play iconfont icon-bofang"
                :class="{islive:liveInfo.stream&&liveInfo.stream.status,isplay:sinal=='stream'}"
                v-if="liveInfo.stream&&liveInfo.stream.m3u8"
                @click="changeSinal('stream')"
                :href="'#/pc/live/'+liveInfo.mid+'?sinal=stream'"
                target="_self"
              >&nbsp; 直播1</span>
              <span
                class="play iconfont icon-bofang"
                :class="{islive:liveInfo.streamAmAli&&liveInfo.streamAmAli.status,isplay:sinal=='streamAmAli'}"
                v-if="liveInfo.streamAmAli&&liveInfo.streamAmAli.m3u8"
                @click="changeSinal('streamAmAli')"
                :href="'#/pc/live/'+liveInfo.mid+'?sinal=streamAmAli'"
                target="_self"
              >&nbsp;直播2</span>
              <span
                class="play iconfont icon-bofang"
                :class="{islive:liveInfo.streamNa&&liveInfo.streamNa.live&&liveInfo.streamNa.live.status,isplay:sinal=='streamNa'}"
                v-if="liveInfo.streamNa&&liveInfo.streamNa.live&&liveInfo.streamNa.live.m3u8"
                @click="changeSinal('streamNa')"
                :href="'#/pc/live/'+liveInfo.mid+'?sinal=streamNa'"
                target="_self"
              >&nbsp;直播3</span>
              <a class="play iconfont icon-bofang"
                :class="{islive:liveInfo.streamNa&&liveInfo.streamNa.anim&&liveInfo.streamNa.anim.status,isplay:sinal=='streamAnimate'}"
                v-if="liveInfo.streamNa&&liveInfo.streamNa.anim&&liveInfo.streamNa.anim.status"
                :href="'#/pc/live/animate/'+liveInfo.mid+'?sinal=streamAnimate&url='+enCode(liveInfo.streamNa.anim.anim)"
                target="_self">&nbsp;动画</a>
            </div>
            <div class="others_info">
              <div class="lname">{{liveInfo.lname}}</div>
              <div
                class="match_stage"
                :class="liveInfo.gameStage=='完场'?'green':''"
              >{{liveInfo.gameStage}}</div>
              <div class="game_time">{{fomartTime(liveInfo.gameTime)}}</div>
            </div>
          </div>

          <div class="team_info">
            <div class="hometeam">
              <div>
                <img v-lazy="liveInfo.hicon" alt />
              </div>
              <div class="team-name">{{liveInfo.hname}}</div>
            </div>
            <div class="score">{{liveInfo.hTotalScore}} - {{liveInfo.aTotalScore}}</div>
            <div class="awayteam">
              <div class="team-name">{{liveInfo.aname}}</div>
              <div>
                <img v-lazy="liveInfo.licon" alt />
              </div>
            </div>
          </div>
        </div>
        <!-- 播放器 -->
        <div class="myplayer" v-if="isShowPlayer">
          <div id="dplayer" ><dplayer :option="playerOption"/> </div>
        </div>
        <div class="now_list">
          <div class="list_title">
            <span class="iconfont icon-jinri"></span>今日直播
          </div>
          <div class="list_body">
            <livelist :item="item" v-for="item in nowList" :key="'livelist'+item.mid" />
            <loading :loadingStatus="loadingStatus" @loadmore="getData" />

            <!-- <div class="list_item" v-for="(iten,index) in nowList" :key="'liveItem'+index"></div> -->
          </div>
        </div>
      </div>
      <div class="right">
        <a href="/topic/PC/appDownload/index.html" target="_blank">
          <img :src="'./static/imgs/suprise.png'" alt />
        </a>
        <div class="slide-container">
          <slideInfo :leisuId="mid" :startTime="startTime" v-if="startTime" />
        </div>
      </div>
    </div>
    <flower :loading="loading" />
  </div>
</template>
<script>
import flower from "@/componets/flower.vue";
import slideInfo from "@/componets/slideInfo.vue";
import livelist from "./live_item.vue";
import loading from "@/componets/loading.vue";
import dplayer from './dplayer2.vue';
import { enCode,deCode } from "@/assets/js/utils.js";
export default {
  components: {
    flower,
    livelist,
    loading,
    dplayer,
    slideInfo,
    playerOption:{}
  },
  data() {
    return {
      startTime:null,
      enCode:enCode,
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
      isShowPlayer:false,
    };
  },
  created() {
    this.mid = this.$route.params.id;
    this.getVideoInfo();
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
    getVideoInfo() {
      this.loading = true;
      this.$http
        .get("/index.php?g=Wwapi&m=Shanmao&a=eventDetail&mid=" + this.mid)
        .then(res => {
          // console.log(res);
          this.getData();
          this.loading = false;
          this.liveInfo = res.data[0] || {};
          switch(this.sinal){
            case 'stream':
            this.playerOption=this.liveInfo[this.sinal];break;
            case 'streamAmAli':
            this.playerOption=this.liveInfo[this.sinal];break;
            case 'streamNa':
            this.playerOption=this.liveInfo[this.sinal].live;break;
            
          }
          let startTime = res.data[0].gameTime;
          this.startTime = startTime.split('T')[0];
          this.isShowPlayer=this.playerOption.status;
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    getData() {
      if (!this.canMore) {
        return this.$alert("没有更多了哦~");
      } else {
        this.pagenum++;
        this.loadingStatus = 1;
        var todayString = this.todayString();
        this.$http
          .get("/index.php?g=Wwapi&m=Shanmao&a=eventInfo", {
            params: {
              start: todayString,
              end: todayString,
              pagesize: this.pagesize,
              page: this.pagenum
            }
          })
          .then(res => {
            // this.mathList = res.data.slice(0, 10);
            this.nowList = this.nowList.concat(res.data);
            this.loadingStatus = 2;
            
            if (res.data.length < this.pagesize) {
              this.canMore = false;
              this.loadingStatus = 3;
            }
            // console.log(this.mathList);
          })
          .catch(err => {
            console.log(err);
            this.loadingStatus = 0;
          });
      }
    },
    changeSinal(sinal){
      this.sinal=sinal;
        switch(this.sinal){
            case 'stream':
            this.playerOption=this.liveInfo[this.sinal];break;
            case 'streamAmAli':
            this.playerOption=this.liveInfo[this.sinal];break;
            case 'streamNa':
            this.playerOption=this.liveInfo[this.sinal].live;break;
          }
    }
  }
};
</script>
<style lang="scss" scoped>
.pc_live_play {
  background-color: #f3f4f9;
  min-height: 100%;
  overflow: hidden;
  .containner {
    // background-color: #fff;
    padding-right: 310px;
    min-height: 729px;
    min-width: 966px;
    margin: 10px 300px;
    // background-color: #fff;
    padding-right: 310px;
    position: relative;
    .left {
      //   width: 1099px;
      .live_info {
        height: 100px;
        position: relative;
        background-color: #fff;
        .corner {
          display: flex;
          align-items: center;
          position: relative;
          &::after {
            position: absolute;
          }
          .sinals {
            height: 40px;
            min-width: 80px;
            background: repeating-linear-gradient(-75deg,#fff,#fff 11px,#ffe4e6 0,#ffe4e6 1000px);
            padding: 6px 15px 6px 10px;
            .play {
              width: 70px;
              height: 28px;
              display: inline-block;
              text-decoration: none;
              margin-right: 2px;
              font-size: 14px;
              background: rgba(253, 253, 253, 1);
              color: #6c757d;
              border: 1px solid #6c757d;
              border-radius: 4px;
              line-height: 28px;
              text-align: center;
              user-select: none;
              // &:hover {
              //   cursor: not-allowed;
              // }
              &.islive {
                border: 1px solid rgba(255, 53, 67, 1);
                color: rgba(255, 53, 67, 1);
                cursor: pointer;
                &:hover {
                  color: white;
                  background-color: rgba(255, 53, 67, 1);
                }
              }
              &.isplay {
                color: white;
                background-color: rgba(255, 53, 67, 1);
                border: rgba(255, 53, 67, 1);
              }
            }
          }
          .others_info {
            flex: 1;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            font-size: 14px;
            align-items: center;
            .lname {
              font-weight: 700;
            }
            .match_stage {
              color: rgba(255, 53, 67, 1);
              &.green {
                color: green;
              }
            }
            .game_time {
              color: gray;
            }
          }
        }
        .team_info {
          display: flex;
          padding: 0 20px;
          margin-top: 10px;
          justify-content: space-between;
          align-items: center;
          .score {
            font-size: 18px;
            font-weight: 700;
          }
          .hometeam,
          .awayteam {
            display: flex;
            font-size: 14x;
            justify-content: space-between;
            align-items: center;
            img {
              max-width: 33px;
              max-height: 33px;
              margin: 0 20px;
            }
          }
        }
      }
      .myplayer {
        margin-top: 10px;
        min-height: 400px;
        #dplayer {
          background-color: #fff;
          width: 100%;
          height: 100%;
        }
      }
      .now_list {
        .list_title {
          .icon-jinri {
            font-size: 19px;
            color: #fe4b57;
            margin-right: 10px;
          }
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(61, 61, 61, 1);
          line-height: 40px;
        }
      }
    }
  }
  .right {
    width: 300px;
    min-height: 300px;
    // background-color: #fff;
    float: right;
    position: absolute;
    right: 0;
    top: 0;
    .slide-container{
      margin-top: 5px;
      height: auto;
      overflow:hidden;
    }
  }
}
</style>

