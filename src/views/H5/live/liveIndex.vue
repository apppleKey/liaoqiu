<template>
  <div class="h5-live-page">
    <div class="navbar">
      <we-header />
      <div class="type-list">
        <div
          class="type_item"
          :class="{curr:item.type==currentType}"
          v-for="(item,index) in mainTypes"
          :key="'maintype'+index"
          @click="changeType(item.type)"
        >{{item.label}}</div>
      </div>
      <div class="date_list">
        <span
          class="date_item"
          :class="{curr:item.fullDate==currentFullDate}"
          v-for="(item,index) in dateList"
          :key="'datetype'+index"
          @click="changeDate(item.fullDate)"
        >{{item.date}}</span>
      </div>
    </div>
    <div class="_blank"></div>
    <div class="live_list_wrap">
      <div class="live_list">
        <div class="list_date">{{currentFullDate}}</div>

        <div
          class="live_item"
          :class="{hot:item.hot,'lookSkill':item.isShowSkill}"
          v-for="item in mathList"
          :key="'matchitem'+item.mid"
          @click="item.isShowSkill = !item.isShowSkill"
        >
          <div class="lengend">{{item.lname}}</div>
          <div class="time">{{fomartTime(item.gameTime)}}</div>
          <div class="teams">
            <div class="team">
              <img class="team_icon" v-lazy="item.hicon" alt />
              <div class="teamname">{{item.hname}}</div>
            </div>
            <div>
              <div :class="{islive:item.gameStage,status:true}">{{item.gameStage||'未开始'}}</div>

              <div class="score">{{item.hTotalScore}} - {{item.aTotalScore}}</div>
            </div>
            <div class="team">
              <img class="team_icon" v-lazy="item.licon" alt />
              <div class="teamname">{{item.aname}}</div>
            </div>
          </div>
          <div click.stop class="rooms">
            <a
              class="play iconfont icon-bofang"
              :class="{islive:item.stream&&item.stream.status}"
              v-if="item.stream&&item.stream.m3u8"
              :href="'#/h5/liveAnim/'+item.mid+'?sinal=stream&video='+(item.stream&&item.stream.m3u8)"
              target="_self"
            >&nbsp; 直播1</a>
            <a
              class="play iconfont icon-bofang"
              :class="{islive:item.streamAmAli&&item.streamAmAli.status}"
              v-if="item.streamAmAli&&item.streamAmAli.m3u8"
              :href="'#/h5/liveAnim/'+item.mid+'?sinal=streamAmAli&video='+(item.streamAmAli&&item.streamAmAli.m3u8)"
              target="_self"
            >&nbsp;直播2</a>
            <a
              class="play iconfont icon-bofang"
              :class="{islive:item.streamNa&&item.streamNa.live&&item.streamNa.live.status}"
              v-if="item.streamNa&&item.streamNa.live&&item.streamNa.live.m3u8"
              :href="'#/h5/liveAnim/'+item.mid+'?sinal=streamNa&video='+(item.streamNa&&item.streamNa.live&&item.streamNa.live.m3u8)"
              target="_self"
            >&nbsp;直播3</a>
            <a
              class="play iconfont icon-bofang"
              :class="{islive:item.streamNa&&item.streamNa.anim&&item.streamNa.anim.status}"
              v-if="item.streamNa&&item.streamNa.anim&&item.streamNa.anim.anim"
              :href="'#/h5/liveAnim/'+item.mid+'?sinal=streamNaAnimate&src='+(item.streamNa&&item.streamNa.anim&&item.streamNa.anim.anim)"
              target="_self"
            >&nbsp;动画</a>
          </div>
          <!-- 足球 -->
          <div v-if="item.isShowSkill&&item.sportId==1" click.stop class="skillRes">
            <div class="skillTop">
              <div class="skillTitle">技术统计</div>
              <template v-for="(subItem,subKey) in item.extradata">
                <template v-if="/^\+?[1-9][0-9]*$/.test(subKey)">
                  <div class="skillContent">
                    <span class="txtTip">
                      <template v-if="subKey == 1">进球</template>
                      <template v-if="subKey == 2">角球</template>
                      <template v-if="subKey == 3">黄牌</template>
                      <template v-if="subKey == 4">红牌</template>
                      <template v-if="subKey == 5">界外球</template>
                      <template v-if="subKey == 6">任意球</template>
                      <template v-if="subKey == 7">球门球</template>
                      <template v-if="subKey == 8">点球</template>
                      <template v-if="subKey == 13">半场比分</template>
                      <template v-if="subKey == 15">两黄变红</template>
                      <template v-if="subKey == 16">点球未进</template>
                      <template v-if="subKey == 17">乌龙球</template>
                      <template v-if="subKey == 19">伤停补时</template>
                      <template v-if="subKey == 21">射正</template>
                      <template v-if="subKey == 22">射偏</template>
                      <template v-if="subKey == 23">进攻</template>
                      <template v-if="subKey == 24">危险进攻</template>
                      <template v-if="subKey == 25">控球率</template>
                    </span>
                    <div class="skillNum">
                      <strong class="line">
                        <b>
                          <i :style="'width:'+ (subItem[0] / (subItem[0] + subItem[1])) * 70 +'px'"></i>
                        </b>
                      </strong>
                      <a href="javascript:void(0)" class="leftNum">{{subItem[0]}}</a>
                      <strong class="line rightLine">
                        <b>
                          <i :style="'width:'+ (subItem[1] / (subItem[0] + subItem[1])) * 70 +'px'"></i>
                        </b>
                        <a href="javascript:void(0)" class="rightName">{{subItem[1]}}</a>
                      </strong>
                    </div>
                  </div>
                </template>
              </template>
            </div>
            <div class="closeSkill" click.stop @click.stop="item.isShowSkill=false">
              收起
              <i class="iconfont icon-shouqi"></i>
            </div>
          </div>
          <!-- 蓝球 -->
          <div v-if="item.isShowSkill&&item.sportId==2" click.stop class="skillRes">
            <div class="skillTop">
              <div class="skillTitle">技术统计</div>
              <template v-for="(subItem,subKey) in item.extradata">
                <template v-if="/^\+?[1-9][0-9]*$/.test(subKey)">
                  <template v-if="subKey != 4 && subKey < 7">
                    <div class="skillContent">
                      <span class="txtTip">
                        <template v-if="subKey == 1">3分球</template>
                        <template v-if="subKey == 2">2分球</template>
                        <template v-if="subKey == 3">罚球进球数</template>
                        <template v-if="subKey == 5">犯规数</template>
                        <template v-if="subKey == 6">罚球命中率</template>
                      </span>
                      <div class="skillNum">
                        <strong class="line">
                          <b>
                            <i
                              :style="'width:'+ (subItem[0] / (subItem[0] + subItem[1])) * 70 +'px'"
                            ></i>
                          </b>
                        </strong>
                        <a href="javascript:void(0)" class="leftNum">{{subKey == 6?subItem[0]+'%':subItem[0]}}</a>
                        <strong class="line rightLine">
                          <b>
                            <i
                              :style="'width:'+ (subItem[1] / (subItem[0] + subItem[1])) * 70 +'px'"
                            ></i>
                          </b>
                          <a href="javascript:void(0)" class="rightName">{{subKey == 6?subItem[1]+'%':subItem[1]}}</a>
                        </strong>
                      </div>
                    </div>
                  </template>
                </template>
              </template>
            </div>
            <div class="closeSkill" click.stop @click.stop="item.isShowSkill=false">
              收起
              <i class="iconfont icon-shouqi"></i>
            </div>
          </div>
        </div>
        <loading :loadingStatus="loadingStatus" @loadmore="loadMore" />
      </div>
    </div>
    <flower :loading="loading" />
  </div>
</template>
<script>
import loading from "@/componets/loading.vue";
import flower from "@/componets/flower.vue";
import weHeader from "@/componets/header.vue";

export default {
  components: {
    loading,
    flower,
    weHeader
  },
  data() {
    return {
      loadingStatus: 0,
      loading: false,
      mainTypes: [
        { label: "全部", iscurr: true, type: null },
        { label: "热门", type: "hot" },
        { label: "足球", type: 1 },
        { label: "篮球", type: 2 }
      ],
      mathList: [],
      dateList: [],
      currentFullDate: "",
      currentType: null,
      pagesize: 30,
      pagenum: 1,
      canMore: true,
      isShowSkill: false
    };
  },
  created() {
    this.initDateList();
    this.getDate();
  },
  mounted() {
    // console.log(0);
    $("html,body").height("100%");
    $(".h5-live-page").css({ overflow: "scroll" });
    $(".h5-live-page").on("scroll", function() {
      // console.log($(".live_list_wrap").offset().top)
      if ($(".live_list_wrap").offset().top < 0) {
        $(".navbar").addClass("fixed");
        // $('._blank').height($('.navbar').height()).show();
      } else {
        $(".navbar").removeClass("fixed");
        // $('._blank').height(0);
      }
    });
  },
  methods: {
    fomartTime(str) {
      if (str) {
        return str.slice(11, 16);
      } else {
        return "--";
      }
    },
    getDate() {
      this.mathList = [];
      this.loadingStatus = 0;
      this.loading = true;
      var params = {
        start: this.currentFullDate,
        end: this.currentFullDate,
        pagesize: this.pagesize,
        page: this.pagenum
      };
      if (this.currentType == "hot") {
        params.hot = 1;
      } else {
        params.sportId = this.currentType;
      }
      this.$http
        .get("/index.php?g=Wwapi&m=Shanmao&a=eventInfo", {
          params
        })
        .then(res => {
          // this.mathList = res.data.slice(0, 10);
          res.data.forEach(item => {
            item.isShowSkill = false;
          });
          this.mathList = res.data;
          this.loadingStatus = 2;
          this.loading = false;
          if (res.data.length < this.pagesize) {
            this.canMore = false;
            this.loadingStatus = 3;
          }
          if (res.data.length === 0) {
            this.canMore = false;
            this.loadingStatus = 4;
          }
        })
        .catch(err => {
          //   console.log(err);
          this.loading = false;
          this.loadingStatus = 0;
        });
    },
    initDateList() {
      var dateList = [];

      var weekList = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      for (var i = 0; i < 3; i++) {
        var date = new Date();
        date = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
        var m = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var d = date.getDate(); //获取当前日(1-31)
        var w = weekList[date.getDay()]; //获取当前星期X(0-6,0代表星期天)
        if (m < 10) {
          m = "0" + m;
        }
        if (d < 10) {
          d = "0" + d;
        }
        if (i == 0) {
          dateList.push({
            week: w,
            date: "今天",
            fullDate: date.getFullYear() + "-" + m + "-" + d
          });
        } else {
          dateList.push({
            week: w,
            date: m + "-" + d,
            fullDate: date.getFullYear() + "-" + m + "-" + d
          });
        }
      }
      this.currentFullDate = dateList[0].fullDate;
      this.dateList = dateList;
    },
    changeType(type) {
      this.pagenum = 1;
      this.canMore = true;
      this.currentType = type;
      this.getDate();
    },
    changeDate(fullDate) {
      this.pagenum = 1;
      this.canMore = true;
      this.currentFullDate = fullDate;
      this.getDate();
    },
    loadMore() {
      if (!this.canMore) {
        return this.$alert("没有更多了哦~");
      } else {
        this.pagenum++;
        this.loadingStatus = 1;
        var params = {
          start: this.currentFullDate,
          end: this.currentFullDate,
          pagesize: this.pagesize,
          page: this.pagenum
        };
        if (this.currentType == "hot") {
          params.hot = 1;
        } else {
          params.sportId = this.currentType;
        }
        this.$http
          .get("/index.php?g=Wwapi&m=Shanmao&a=eventInfo", {
            params
          })
          .then(res => {
            // this.mathList = res.data.slice(0, 10);
            res.data.forEach(item => {
              item.isShowSkill = false;
            });
            this.mathList = this.mathList.concat(res.data);
            this.loadingStatus = 2;

            if (res.data.length < this.pagesize) {
              this.canMore = false;
              this.loadingStatus = 3;
            }
            console.log(this.mathList);
          })
          .catch(err => {
            console.log(err);
            this.loadingStatus = 0;
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.h5-live-page {
  //   background-color: gray;
  height: 100%;
  //  overflow: scroll;
  .navbar {
    background-color: #fff;
    padding-bottom: ptr(20);
    z-index: 5;
    position: fixed;
    top: ptr(0);
    left: 0;
    right: 0;
    &.fixed {
      box-shadow: 0 0 10px gray;
    }
  }
  .type-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: p2r(20) p2r(48);
    color: rgba(73, 73, 73, 1);
    font-size: p2r(30);
    .type_item {
      background-color: #fff;
      width: 23%;
      &.curr {
        color: $main;
      }
      &:active {
        color: $main;
      }
    }
  }

  .date_list {
    padding-left: p2r(40);
    .date_item {
      display: inline-block;
      font-size: p2r(30);
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(73, 73, 73, 1);
      margin-right: p2r(48);
      line-height: p2r(60);
      height: p2r(60);
      &.curr {
        color: $main;
        position: relative;
      }
      &.curr:after {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: $main;
        content: "";
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
  .live_list_wrap {
    padding-top: p2r(320);
    .list_date {
      color: #8c8c8c;
      font-size: p2r(28);
      background-color: rgb(247, 247, 248);
      // height: p2r(106);
      line-height: p2r(80);
      padding-left: p2r(40);
      font-family: Microsoft YaHei;
      font-weight: 400;
    }

    .live_list {
      .live_item {
        position: relative;
        // height: p2r(240);
        background: rgba(255, 255, 255, 1);
        text-align: center;
        padding: ptr(20) 0;
        border-bottom: 1px solid rgba(194, 192, 192, 0.322);
        &.hot {
          background: linear-gradient(
            to right,
            rgb(254, 209, 212),
            white 50%,
            white
          );
        }
        .lengend {
          position: absolute;
          left: ptr(20);
          top: ptr(20);
          color: #797979;
          font-size: ptr(24);
          max-width: 30%;
          height: ptr(30);
          @include omit(1);
        }
        .time {
          color: #181818;
          font-size: ptr(28);
          padding: 0 ptr(20);
        }
        .teams {
          display: flex;
          margin-top: ptr(20);
          justify-content: space-between;
          font-size: ptr(24);
          padding: 0 ptr(20);

          .team {
            width: ptr(280);
          }
          .team_icon {
            height: p2r(67);
          }

          .teamname {
            width: 100%;
            color: #181818;
            font-size: ptr(24);
            @include omit(1);
          }
          .score {
            font-size: p2r(28);
            font-weight: 700;
          }
          .status {
            color: green;
            &.islive {
              color: $main;
            }
          }
        }

        .skillRes {
          .skillTop {
            background-color: #fff;
            padding: ptr(30) ptr(40);
            color: #565656;
            font-size: ptr(24);
            text-align: left;
            .skillContent {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: ptr(50);
              .txtTip {
                width: ptr(130);
              }
              .skillNum {
                flex: 1;
                display: flex;
                justify-content: space-between;
                .line {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;

                  b {
                    width: ptr(180);
                    height: ptr(6);
                    background-color: #d3d3d3;
                    position: relative;
                    i {
                      position: absolute;
                      top: 0;
                      left: 0;
                      bottom: 0;
                      background-color: #ff3543;
                      margin: 0 !important;
                    }
                  }
                  a {
                    text-align: right;
                    // padding-left: ptr(10);
                    color: #565656;
                    font-size: ptr(24);
                    font-weight: normal;
                  }
                }
                .leftNum {
                  flex: 1;
                  text-align: left;
                  padding-left: ptr(20);
                  color: #565656;
                  font-size: ptr(24);
                  font-weight: normal;
                }
                .rightLine {
                  width: ptr(255);
                }
              }
            }
          }
          .closeSkill {
            height: ptr(60);
            background-color: #ffe8e8;
            color: #ff5655;
            font-size: ptr(24);
            line-height: ptr(60);
          }
        }
        .rooms {
          margin-bottom:p2r(20);
          .play {
            width: ptr(150);
            height: ptr(56);
            display: inline-block;
            text-decoration: none;
            margin-right: 2px;
            background: rgba(253, 253, 253, 1);
            color: #6c757d;
            border: 1px solid #6c757d;
            border-radius: 4px;
            line-height: ptr(56);
            text-align: center;
            user-select: none;
            font-size: p2r(25);
            margin-top: p2r(10);
            &:hover {
              cursor: not-allowed;
            }
            &.islive {
              border: 1px solid rgba(255, 53, 67, 1);
              color: rgba(255, 53, 67, 1);
              cursor: pointer;
              &:hover {
                color: white;
                background-color: rgba(255, 53, 67, 1);
              }
            }
          }
        }
      }
      .lookSkill {
        background: linear-gradient(to right, #fed1d4, #fff 50%, #fff);
        i {
          font-size: ptr(24);
          margin-left: ptr(10);
        }
      }
    }
  }
}
</style>

