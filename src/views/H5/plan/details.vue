<template>
  <div class="plan_detail">
    <Header />
    <div class="head" @click="showAnchor(anchorInfo.uid)" v-if="loaded">
      <div class="avatar">
        <img v-lazy="anchorInfo.avatar" />
      </div>
      <div class="infos">
        <div class="win_rate" v-if="anchorInfo_winRate">
          胜率
          <span>{{anchorInfo_winRate}}%</span>
        </div>
        <div class="name">{{anchorInfo.username}}</div>
        <p class="prob">
          <span v-for="(item,ii) in winLabelList" :key="'winLabelList' + ii">{{item.content}}</span>
        </p>
      </div>
    </div>
    <div class="title">{{detail.planTitle}}</div>
    <p class="time">{{detail.timeDistance}}</p>
    <div class="divide"></div>

    <div class="content" style="border-top: 30px solid #f6f6f6;min-height:5rem;" v-if="loaded">
      <div class="content_top">
        <div class="infos">
          <span
            class="type"
            v-if="detail.playTypeContent"
            :class="'play' + detail.playType"
          >{{detail.playTypeContent}}</span>
          <span class="blue" v-if="detail.leagueMatch">{{detail.leagueMatch}}</span>
          <span class="time">{{detail.startTimestamp | formatTime}}</span>
        </div>
        <div class="against">
          <div class="team team_a">
            <div class="team_ico">
              <img v-lazy="detail.homeTeamLogoUrl" />
            </div>
            <div class="team_name">{{detail.homeTeam}}</div>
          </div>
          <div class="vs_icon">
            <span class="V">V</span>
            <span class="S">S</span>
          </div>
          <div class="team team_b">
            <div class="team_ico">
              <img v-lazy="detail.awayTeamLogoUrl" />
            </div>
            <div class="team_name">{{detail.awayTeam}}</div>
          </div>
        </div>
        <div class="commond" :class="detail.planStatus">
          <span class="commond_text">
            <img class="reco_icon" :src="'./static/images/h5/recormend.png'" alt />
          </span>
          <div class="content">{{detail.planContent}}</div>
        </div>
        <div class="commond_reason">
          <span class="title">推荐理由</span>
          <span class="dotted"></span>
        </div>
        <div
          class="text plan_detail_content"
          v-if="detail.planAnalysis && detail.planAnalysis != ''"
          v-html="detail.planAnalysis"
        ></div>
        <div class="no_commond_text" v-else-if="loaded">暂无推荐理由</div>
      </div>
    </div>
    <div class="comment_conn" v-if='loaded'>
      <div class="c_header"></div>
      <div class="comment_list"></div>
      <div class="comment_nodata">
        <img class="sofaIcon" :src="'./static/images/h5/sofa.png'" alt />
        <p>还没有人发表评论,赶快来抢占沙发吧！</p>
      </div>
      <div class="comment_short">
        <div class="c_write" @click="$toast('暂未开放，敬请期待')">
          <img :src="'./static/images/h5/write.png'" alt /> 写评论
        </div>
        <div class="c_count">
          <img :src="'./static/images/h5/pinglun.png'" alt />
          0
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/H5/components/planHeader.vue";
export default {
  components: {
    Header
  },
  data() {
    return {
      id: {
        type: String,
        default: "1"
      },
      anchorInfo_winRate: this.$route.query.winRate,
      winLabelList: JSON.parse(this.$route.query.winLabelList),
      anchorInfo: {},
      detail: {},
      focused: false,
      loaded: false
    };
  },
  watch: {
    $route() {
      this.id = this.$route.query.id;
      this.getPlanDetail();
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getPlanDetail();
  },
  methods: {
    getPlanDetail() {
      this.$indicator.open();
      this.$http
        .get("/live/api/news/plan/get_plan_details_info", {
          params: {
            planId: this.$route.params.id
          }
        })
        .then(res => {
          // console.log(res.data.data.anchorPlanDetailsInfo.planDetailsInfo.planAnalysis.indexOf('↵'))
          // res.data.data.anchorPlanDetailsInfo.planDetailsInfo.planAnalysis.replace('/\n/\r'/g,"<br>")
          this.$indicator.close();
          this.loaded = true;
          this.anchorInfo = res.data.anchorPlanDetailsInfo.anchorInfo;
          this.detail = res.data.anchorPlanDetailsInfo.planDetailsInfo;
          this.focused =
            res.data.anchorPlanDetailsInfo.attentionMark === 1 ? true : false;
        })
        .catch(err => {
          this.$indicator.close();
          this.loaded = true;
          console.log(err);
        });
    },
    showAnchor(id) {
      return;
      if (navigator.userAgent.indexOf("kinglive") > -1) {
        let data = {
          html_url: window.location.origin + "/H5/page/#/anchor?id=" + id,
          title: "个人主页"
        };
        if (navigator.userAgent.toLowerCase().indexOf("ios") > -1) {
          window.webkit.messageHandlers.jsNewActivity.postMessage(
            JSON.stringify(data)
          );
        } else {
          window.app.jsNewActivity(JSON.stringify(data));
        }
      } else {
        this.$router.push({
          path: "anchor",
          query: { id: id }
        });
      }
    }
  },
  filters: {
    formatTime(t) {
      t = new Date(t);
      return (
        (t.getMonth() + 1).toString() +
        "月" +
        t.getDate().toString() +
        "日 " +
        t.toTimeString().slice(0, 5)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";
.plan_detail {
  position: relative;
  @include wh(100%, auto);
  padding-top: p2r(20);
  .head {
    position: relative;
    @include wh(100%, auto);
    padding:  p2r(20);
    @include fs;
    align-items: flex-start;
    .avatar {
      @include rwh(100, 100);
      background: #f0f0f0;
      border-radius: 50%;
      @include fc;
      overflow: hidden;
      img {
        display: block;
        @include wh(100%, auto);
      }
    }
    .infos {
      position: relative;
      flex: 1;
      margin-left: p2r(20);
      .win_rate {
        @include wh(auto, auto);
        position: absolute;
        right: 0;
        font-size: p2r(28);
        color: #666;
        font: 1em sans-serif;
        span {
          display: inline-block;
          @include wh(auto, p2r(50));
          vertical-align: text-bottom;
          font-size: p2r(50);
          line-height: p2r(50);
          color: #ff3542;
          font-weight: bold;
          margin-left: p2r(5);
        }
      }
      .name {
        @include wh(auto, p2r(36));
        line-height: p2r(36);
        font-size: p2r(30);
        font-weight: 600;
        color: #131313;
      }
      .prob {
        position: relative;
        @include wh(100, auto);
        line-height: p2r(40);
        text-align: left;
        word-break: break-all;
        vertical-align: middle;
        margin-top: ptr(20);
        span {
          display: inline-block;
          @include wh(auto, p2r(40));
          line-height: p2r(40);
          padding: 0 p2r(13);
          background: #ff3542;
          color: #fff;
          font-size: p2r(28);
          margin-right: p2r(10);
          border-radius: 2px;
        }
      }
    }
    .focus {
      @include wh(auto, p2r(50));
      color: #fff;
      font-size: p2r(28);
      padding: 0 p2r(20);
      background: #ff3456;
      border-radius: p2r(25);
      &.focused {
        background: #999;
      }
    }
  }
  .title {
    position: relative;
    @include wh(100%, auto);
    padding: p2r(20);
    padding-bottom: 0;
    font-size: p2r(32);
    color: #333;
    font-weight: 400;
    text-align: left;
    word-break: break-all;
    line-height: p2r(50);
    font-weight: bold;
    color: rgba(50, 50, 50, 1);
  }
  .time {
    @include rule;
    line-height: p2r(40);
    font-size: p2r(24);
    color: #666;
    font-weight: 400;
    padding: 0 0 ptr(20) p2r(20);
    margin-bottom: ptr(20);
  }
  .content {
    @include rule;
    padding: p2r(20);
    font-size: p2r(30);
    line-height: p2r(46);
    .content_top {
      @include rule;
      .infos {
        @include rule;
        padding: 0 p2r(20) p2r(20) 0;
        // @include fc;
        // justify-content: flex-start;
        font-weight: 600;
        font-size: ptr(32);
        span.type {
          @include wh(auto, p2r(40));
          line-height: p2r(40);
          font-size: p2r(24);
          border-radius: p2r(20);
          padding: 0 p2r(20);
          border: 1px solid #ddd;
          margin-right: 5px;
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
        span.blue {
          @include wh(auto, p2r(40));
          line-height: p2r(40);
          font-size: p2r(24);
          color: #0099ff;
        }
        span.blue {
          @include wh(auto, p2r(40));
          line-height: p2r(40);
          font-size: p2r(24);
          color: #0099ff;
        }
      }
      .against {
        @include rule;
        @include fc;
        margin-bottom: p2r(20);
        .team {
          height: auto;
          flex: 1;
          max-width: 40%;
          @include fc;
          flex-direction: column;
          .team_ico {
            @include rwh(74, 74);
            border-radius: 50%;
            overflow: hidden;
            @include fc;
            img {
              display: block;
              @include wh(auto, 100%);
            }
          }
          .team_name {
            @include wh(100%, auto);
            text-align: center;
            font-size: ptr(28);
            @include omit(1);
            font-weight: bold;
            color: rgba(48, 48, 48, 1);
            line-height: 36px;
          }
        }
        .vs_icon {
          margin: 0 p2r(30);
          text-align: center;
          word-spacing: p2r(-18);
          span {
            font-size: p2r(50);
            font-weight: 600;
            &.V {
              color: #f76c32;
            }
            &.S {
              color: #70b6ff;
            }
          }
        }
      }
      .commond {
        position: relative;
        @include rule;
        background: #f6f6f6;
        border-radius: 2px;
        padding: p2r(40) p2r(10);
        @include fc;
        font-size: ptr(32);
        font-weight: 600;
        &::after {
          content: "";
          position: absolute;
          right: p2r(10);
          top: 50%;
          @include rwh(100, 100);
          margin-top: p2r(-50);
          background-repeat: no-repeat;
          background-size: 100% 300%;
          opacity: 0.9;
        }
        &.win::after {
          background-image: url("../../../../static/images/H5/plan_status.png");
          background-position: 0 0;
        }
        &.lose::after {
          background-image: url("../../../../static/images/H5/plan_status.png");
          background-position: 0 p2r(-100);
        }
        &.draw::after {
          background-image: url("../../../../static/images/H5/plan_status.png");
          background-position: 0 p2r(-200);
        }
        .commond_text {
          position: absolute;
          left: p2r(0);
          top: 0;
          @include wh(p2r(48), auto);
          svg {
            @include wh(100%, auto);
            path {
              fill: #ff3456;
            }
          }
          .reco_icon {
            @include wh(ptr(85), ptr(79));
          }
        }
        .content {
          @include wh(auto, auto);
          line-height: p2r(50);
          font-size: p2r(32);
          padding: 0;
          color: #ff3456;
          word-break: break-all;
        }
      }
      .commond_reason {
        position: relative;
        @include wh(100%, p2r(100));
        @include fc;
        background: #fff;
        font-size: ptr(36);
        .title {
          position: relative;
          @include wh(auto, auto);
          padding: 0 p2r(30);
          color: #333;
          font-size: p2r(32);
          font-weight: 400;
          background: #fff;
          z-index: 2;
        }
        .dotted {
          position: absolute;
          left: 0;
          top: p2r(48);
          @include wh(100%, 1px);
          border-top: 1px dotted #ddd;
          z-index: 1;
        }
      }
      .text {
        @include rule;
        white-space: pre-wrap;
        min-height: 9rem;
        img {
          max-width: 100% !important;
        }
        video {
          max-width: 100% !important;
        }
        iframe {
          max-width: 100% !important;
        }
      }
      .no_commond_text {
        @include rule;
        font-size: p2r(28);
        color: #999;
        text-align: center;
        line-height: p2r(60);
        min-height: 9rem;
      }
    }
  }

  .comment_conn {
    .comment_list {
    }
    .comment_nodata {
      text-align: center;
      margin: 30px auto;
      .sofaIcon {
        @include wh(ptr(137), ptr(85));
      }
      p {
        font-size: ptr(24);
        font-family: Lantinghei SC;
        font-weight: 200;
        line-height: ptr(48);
        color: rgba(148, 148, 148, 1);
      }
    }
    .comment_short {
      font-size: ptr(38);
      font-family: Lantinghei SC;
      font-weight: 600;
      color: rgba(65, 65, 65, 1);
      height: ptr(101);
      background: rgba(252, 252, 252, 1);
      border: 1px solid rgba(223, 223, 223, 1);
      box-shadow: 0px ptr(-8) ptr(29) 0px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      padding: 0 ptr(20);
      .c_write {
        display: flex;
        align-items: center;
        img {
          width: ptr(50);
          height: ptr(50);
          margin-right: ptr(20);
        }
      }
      .c_count {
        display: flex;
        align-items: center;
        img {
          width: ptr(50);
          height: ptr(50);
          margin-right: ptr(20);
        }
      }
    }
  }
}
</style>