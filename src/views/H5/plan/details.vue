<template>
  <div class="plan_detail">
    <div class="head" @click="showAnchor(anchorInfo.uid)">
      <div class="avatar">
        <img v-lazy="anchorInfo.avatar" />
      </div>
      <div class="infos">
        <div class="name">
          {{anchorInfo.username}}
          <div class="win_rate" v-if="anchorInfo.winRate">
            胜率
            <span>{{anchorInfo.winRate}}%</span>
          </div>
        </div>
        <div class="introduce" v-if="false">{{anchorInfo.introduction}}</div>
      </div>
    </div>
    <div class="title">{{detail.planTitle}}</div>
    <p class="time">{{detail.timeDistance}}</p>
    <div class="divide"></div>
    <div class="content">
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
            <svg
              t="1578040157121"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2743"
            >
              <path
                d="M121.173333 17.066667v979.626666L512 831.146667l390.826667 165.546666V17.066667H121.173333z m184.32 232.106666c23.893333 1.706667 44.373333 1.706667 59.733334 1.706667h59.733333c0-13.653333 0-29.013333-1.706667-46.08H462.506667c-1.706667 17.066667-1.706667 32.426667-1.706667 46.08h112.64c0-13.653333 0-29.013333-1.706667-46.08h39.253334c-1.706667 17.066667-1.706667 32.426667-1.706667 46.08h61.44c15.36 0 37.546667 0 64.853333-1.706667v35.84c-25.6-1.706667-47.786667-1.706667-64.853333-1.706666h-61.44c0 6.826667 0 18.773333 1.706667 37.546666h-39.253334c1.706667-15.36 1.706667-29.013333 1.706667-37.546666H460.8c0 8.533333 0 22.186667 1.706667 37.546666H423.253333c1.706667-17.066667 1.706667-29.013333 1.706667-37.546666h-59.733333c-15.36 0-34.133333 0-59.733334 1.706666v-35.84zM426.666667 662.186667h-40.96c1.706667-23.893333 1.706667-47.786667 1.706666-71.68v-102.4l-3.413333 3.413333C363.52 512 344.746667 529.066667 324.266667 546.133333c-3.413333 3.413333-8.533333 6.826667-11.946667 10.24-6.826667-11.946667-17.066667-23.893333-29.013333-35.84 0 0 1.706667 0 1.706666-1.706666 27.306667-15.36 54.613333-34.133333 80.213334-56.32 6.826667-5.12 11.946667-11.946667 17.066666-17.066667 18.773333-18.773333 35.84-37.546667 51.2-58.026667h-61.44c-17.066667 0-39.253333 0-64.853333 1.706667v-35.84h1.706667v-1.706667c23.893333 1.706667 42.666667 1.706667 59.733333 1.706667h87.04c8.533333-15.36 17.066667-30.72 22.186667-47.786667 0 0 0-1.706667 1.706666-1.706666 15.36 8.533333 30.72 13.653333 47.786667 17.066666l-1.706667 1.706667c-1.706667 1.706667-5.12 3.413333-6.826666 5.12-6.826667 6.826667-13.653333 15.36-18.773334 23.893333h155.306667c20.48 0 44.373333 0 71.68-1.706666v35.84h-1.706667v1.706666c-27.306667-1.706667-51.2-1.706667-71.68-1.706666H479.573333c-15.36 18.773333-32.426667 40.96-52.906666 64.853333v138.24c0 23.893333 0 47.786667 1.706666 71.68H426.666667v1.706667z m310.613333-117.76c-23.893333-1.706667-47.786667-1.706667-71.68-1.706667h-47.786667v75.093333c0 17.066667-6.826667 29.013333-18.773333 34.133334-13.653333 5.12-35.84 10.24-66.56 11.946666h-1.706667c0-10.24-6.826667-23.893333-17.066666-40.96h1.706666c22.186667 1.706667 39.253333 1.706667 47.786667 1.706667 10.24 0 15.36-6.826667 15.36-22.186667v-59.733333h-73.386667-52.906666-1.706667v-35.84h1.706667c18.773333 1.706667 37.546667 1.706667 56.32 1.706667h69.973333c0-8.533333 0-17.066667-1.706667-25.6 18.773333-8.533333 35.84-17.066667 51.2-29.013334h-90.453333c-20.48 0-40.96 0-63.146667 1.706667h-1.706666v-35.84h1.706666c22.186667 1.706667 44.373333 1.706667 66.56 1.706667H708.266667v30.72c-15.36 3.413333-29.013333 8.533333-42.666667 15.36-13.653333 8.533333-29.013333 17.066667-46.08 27.306666v13.653334H665.6c23.893333 0 47.786667 0 71.68-1.706667v37.546667z"
                p-id="2744"
              />
            </svg>
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
        <div class="no_commond_text" v-else>暂无推荐理由</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: {
        type: String,
        default: "1"
      },
      anchorInfo: {},
      detail: {},
      focused: false
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
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            planId: this.$route.params.id
          }
        })
        .then(res => {
          // console.log(res.data.data.anchorPlanDetailsInfo.planDetailsInfo.planAnalysis.indexOf('↵'))
          // res.data.data.anchorPlanDetailsInfo.planDetailsInfo.planAnalysis.replace('/\n/\r'/g,"<br>")
          this.$indicator.close();

          this.anchorInfo = res.data.anchorPlanDetailsInfo.anchorInfo;
          this.detail = res.data.anchorPlanDetailsInfo.planDetailsInfo;
          this.focused =
            res.data.anchorPlanDetailsInfo.attentionMark === 1 ? true : false;
        })
        .catch(err => {
          this.$indicator.close();
          console.log(err);
        });
    },
    showAnchor(id) {
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
    padding: 0 p2r(20);
    @include fs;
    align-items: flex-start;
    .avatar {
      @include rwh(80, 80);
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
      .name {
        @include wh(auto, p2r(36));
        line-height: p2r(36);
        font-size: p2r(30);
        color: #131313;
      }
      .introduce {
        @include wh(auto, auto);
        line-height: p2r(44);
        font-size: p2r(28);
        color: #999;
        word-break: break-all;
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
  }
  .time {
    @include rule;
    line-height: p2r(40);
    font-size: p2r(24);
    color: #666;
    font-weight: 400;
    padding: 0 p2r(20) p2r(20) p2r(20);
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
        padding: p2r(20) 0;
        // @include fc;
        // justify-content: flex-start;
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
            @include omit(1);
          }
        }
        .vs_icon {
          margin: 0 p2r(30);
          text-align: center;
          word-spacing: p2r(30);
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
          left: p2r(20);
          top: 0;
          @include wh(p2r(48), auto);
          svg {
            @include wh(100%, auto);
            path {
              fill: #ff3456;
            }
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
      }
    }
  }
}
</style>