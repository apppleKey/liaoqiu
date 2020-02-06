<template>
  <div class="pc_live_page">
    <div class="nav">
      <div class="main_type_list_wrap">
        <div class="main_type_list">
          <span
            class="type_item"
            :class="{curr:item.type==currentType}"
            v-for="(item,index) in mainTypes"
            :key="'maintype'+index"
            @click="changeType(item.type)"
          >{{item.label}}</span>
        </div>
      </div>
      <div class="child_type_list_wrap">
        <div class="child_type_list">
          <span
            class="type_item"
            :class="{curr:item.fullDate==currentFullDate}"
            v-for="(item,index) in dateList"
            :key="'datetype'+index"
            @click="changeDate(item.fullDate)"
          >
            <div>{{item.date}}</div>
            <div>{{item.week}}</div>
          </span>
        </div>
      </div>
    </div>
    <div class="live-body">
      <div class="thead">
        <span>赛事</span>
        <span>时间</span>
        <span>状态</span>
        <span>主队</span>
        <span>比分</span>
        <span>客队</span>
        <span>频道</span>
      </div>
      <div class="tbody">
        <div class="date">{{currentFullDate}}</div>
        <div
          class="matchitem"
          :class="{hot:item.hot}"
          v-for="item in mathList"
          :key="'matchitem'+item.mid"
        >
          <span>{{item.lname}}</span>
          <span>{{fomartTime(item.gameTime)}}</span>
          <span :class="{islive:item.gameStage}">{{item.gameStage||'未开始'}}</span>
          <span class="home-team">
            <div>
              <img v-lazy="item.hicon" alt />
            </div>
            <div class="team-name">{{item.hname}}</div>
          </span>
          <span class="score" :id="'eventsScore' + item.mid">
            <div>{{item.hTotalScore}} - {{item.aTotalScore}}</div>
            <dl class="layerScore">
              <dt>
                <strong class="masterTeam"><img :src="item.hicon||'./static/imgs/ddefault.jpg'" onerror="this.src='./static/imgs/ddefault.jpg'" alt /></strong>
                <span class="txtTip">技术统计</span>
                <strong class="customTeam"><img :src="item.licon ||'./static/imgs/ddefault.jpg'" onerror="this.src='./static/imgs/ddefault.jpg'" alt /></strong>
              </dt>
              <!-- 足球模块 -->
              <template v-if="item.sportId == 1">
                <template v-for="(subItem,subKey,subIndex) in item.extradata">
                  <template v-if="/^\+?[1-9][0-9]*$/.test(subKey)">
                    <dd>
                      <strong class="masterScore">
                        <a href="javascript:void(0)">{{subItem[0]}}</a>
                        <b><i :style="'width:'+ (subItem[0] / (subItem[0] + subItem[1])) * 70 +'px'"></i></b>
                      </strong>
                      <span class="txtTip">
                        <template v-if="subKey == 1">
                          进球
                        </template>
                        <template v-if="subKey == 2">
                          角球
                        </template>
                        <template v-if="subKey == 3">
                          黄牌
                        </template>
                        <template v-if="subKey == 4">
                          红牌
                        </template>
                        <template v-if="subKey == 5">
                          界外球
                        </template>
                        <template v-if="subKey == 6">
                          任意球
                        </template>
                        <template v-if="subKey == 7">
                          球门球
                        </template>
                        <template v-if="subKey == 8">
                          点球
                        </template>
                        <template v-if="subKey == 13">
                          半场比分
                        </template>
                        <template v-if="subKey == 15">
                          两黄变红
                        </template>
                        <template v-if="subKey == 16">
                          点球未进
                        </template>
                        <template v-if="subKey == 17">
                          乌龙球
                        </template>
                        <template v-if="subKey == 19">
                          伤停补时
                        </template>
                        <template v-if="subKey == 21">
                          射正
                        </template>
                        <template v-if="subKey == 22">
                          射偏
                        </template>
                        <template v-if="subKey == 23">
                          进攻
                        </template>
                        <template v-if="subKey == 24">
                          危险进攻
                        </template>
                        <template v-if="subKey == 25">
                          控球率
                        </template>
                      </span>
                      <strong class="customScore">
                        <a href="javascript:void(0)">{{subItem[1]}}</a>
                        <b><i :style="'width:'+ (subItem[1] / (subItem[0] + subItem[1])) * 70 +'px'"></i></b>
                      </strong>
                    </dd>
                  </template>
                </template>
              </template>
              <!-- 篮球模块 -->
              <template v-if="item.sportId == 2">
                <template v-for="(subItem,subKey,subIndex) in item.extradata">
                  <template v-if="/^\+?[1-9][0-9]*$/.test(subKey)">
                    <template v-if="subKey != 4 && subKey < 7">
                      <dd>
                        <strong class="masterScore">
                          <a href="javascript:void(0)">{{subItem[0]}}</a>
                          <b><i :style="'width:'+ (subItem[0] / (subItem[0] + subItem[1])) * 70 +'px'"></i></b>
                        </strong>
                        <span class="txtTip">
                          <template v-if="subKey == 1">
                            3分球
                          </template>
                          <template v-if="subKey == 2">
                            2分球
                          </template>
                          <template v-if="subKey == 3">
                            罚球进球数
                          </template>
                          <template v-if="subKey == 5">
                            犯规数
                          </template>
                          <template v-if="subKey == 6">
                            罚球命中率
                          </template>
                        </span>
                        <strong class="customScore">
                          <a href="javascript:void(0)">{{subItem[1]}}</a>
                          <b><i :style="'width:'+ (subItem[1] / (subItem[0] + subItem[1])) * 70 +'px'"></i></b>
                        </strong>
                      </dd>
                    </template>
                  </template>
                </template>
              </template>
            </dl>
          </span>
          <span>
            <div>
              <img v-lazy="item.licon" alt />
            </div>
            <div class="team-name">{{item.aname}}</div>
          </span>
          <span>
            <a
              class="play iconfont icon-bofang"
              :class="{islive:item.stream&&item.stream.status}"
              v-if="item.stream&&item.stream.m3u8"
              :href="'#/pc/live/'+item.mid+'?sinal=stream'"
            >&nbsp;直播1</a>
            <a
              class="play iconfont icon-bofang"
              :class="{islive:item.streamAmAli&&item.streamAmAli.status}"
              v-if="item.streamAmAli&&item.streamAmAli.m3u8"
              :href="'#/pc/live/'+item.mid+'?sinal=streamAmAli'"
            >&nbsp;直播2</a>
            <a
              class="play iconfont icon-bofang"
              :class="{islive:item.streamNa&&item.streamNa.live&&item.streamNa.live.status}"
              v-if="item.streamNa&&item.streamNa.live&&item.streamNa.live.m3u8"
              :href="'#/pc/live/'+item.mid+'?sinal=streamNa'"
            >&nbsp;直播3</a>
            <a 
              class="play iconfont icon-bofang"
              :class="{islive:item.streamNa&&item.streamNa.anim&&item.streamNa.anim.status}"
              v-if="item.streamNa&&item.streamNa.anim&&item.streamNa.anim.status"
              :href="'#/pc/live/animate/'+item.mid+'?sinal=streamAnimate&url='+enCode(item.streamNa.anim.anim)"
            >&nbsp;动画</a>
          </span>
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
import { enCode,deCode } from "@/assets/js/utils.js";
export default {
  components: {
    loading,
    flower
  },
  data() {
    return {
      enCode:enCode,
      loadingStatus: 0,
      mainTypes: [
        { label: "全部", iscurr: true, type: null },
        { label: "热门", type: "hot" },
        { label: "足球", type: 1 },
        { label: "篮球", type: 2 }
      ],
      //   childTypes: [
      //     { label: "全部", iscurr: true },
      //     { label: "热门" },
      //     { label: "非洲国家杯" },
      //     { label: "球会友谊赛" }
      //   ],
      mathList: [],
      dateList: [],
      currentFullDate: "",
      currentType: null,
      pagesize: 30,
      pagenum: 1,
      canMore: true
    };
  },
  created() {
    this.initDateList();
    this.getDate();
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
          this.mathList = res.data;
          this.loading = false;
          this.loadingStatus = 2;
          if (res.data.length < this.pagesize) {
            this.canMore = false;
            this.loadingStatus = 3;
          }
          if (res.data.length === 0) {
            this.canMore = false;
            this.loadingStatus = 4;
          }

          //   console.log(this.mathList);
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
    golive() {},
    loadMore() {
      if (!this.canMore) {
        return this.$alert("没有更多了哦~");
      } else {
        this.pagenum++;
        this.loadingStatus = 1;
        this.$http
          .get("/index.php?g=Wwapi&m=Shanmao&a=eventInfo", {
            params: {
              start: this.currentFullDate,
              end: this.currentFullDate,
              sportId: this.currentType,
              pagesize: this.pagesize,
              page: this.pagenum
            }
          })
          .then(res => {
            // this.mathList = res.data.slice(0, 10);
            this.mathList = this.mathList.concat(res.data);
            this.loadingStatus = 2;

            if (res.data.length < this.pagesize) {
              this.canMore = false;
              this.loadingStatus = 3;
            }
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

.pc_live_page {
  background-color: rgb(247, 247, 248);
  min-height: 800px;
  .nav {
    width: 100%;
    // height: 74px;
    background: rgba(255, 228, 230, 1);
    user-select: none;
    .main_type_list_wrap {
      background-color: #fff;
    }
    .main_type_list {
      width: 1140px;
      margin: 0 auto;
      padding: 16px 0;
      padding-left: 10px;
      text-align: left;
      .type_item {
        display: inline-block;
        height: 30px;
        cursor: pointer;
        margin-right: 20px;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        color: #6a6464;
        position: relative;
        display: inline-block;
        top: 0;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 4px;
        padding: 0 14px;

        &.curr {
          color: white;
          background-color: #ff505b;
          border-color: #ff505b;
        }

        &:hover {
          color: white;
          background-color: #ff505b;
          border-color: #ff505b;
        }
      }
    }
    .child_type_list_wrap {
      background: rgba(247, 247, 248, 1);
      text-align: left;
    }
    .child_type_list {
      width: 1140px;
      margin: 0 auto;
      // height: 37px;
      padding: 10px;
      margin: 0 auto;
      text-align: left;
      .type_item {
        width: 120px;
        height: 60px;
        text-align: center;
        border-radius: 4px;
        color: #6a6464;
        line-height: 23px;
        display: inline-block;
        border: 1px solid #6a64648f;
        padding-top: 6px;
        margin-right: 10px;
        cursor: pointer;
        &.curr {
          background: rgba(255, 242, 242, 1);
          border: 1px solid rgba(255, 88, 102, 1);
          color: rgba(255, 88, 102, 1);
        }
        &:hover {
          background: rgba(255, 242, 242, 1);
          border: 1px solid rgba(255, 88, 102, 1);
          color: rgba(255, 88, 102, 1);
        }
      }
    }
  }
  .live-body {
    width: 1140px;
    margin: 0 auto;
    .thead {
      height: 34px;
      background: rgba(255, 53, 67, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        padding: 0 10px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        &:nth-child(1) {
          width: 170px;
        }
        &:nth-child(2) {
          width: 60px;
        }
        &:nth-child(3) {
          width: 80px;
          text-align: center;
        }
        &:nth-child(4) {
          width: 110px;
          text-align: center;
        }
        &:nth-child(5) {
          width: 100px;
          padding: 0;
          text-align: center;
        }
        &:nth-child(6) {
          width: 110px;
          text-align: center;
        }
        &:nth-child(7) {
          width: 300px;
          padding: 0;
          //   flex: 1;
        }
      }
    }
    .tbody {
      .date {
        width: 1140px;
        height: 35px;
        line-height: 35px;
        padding: 0 16px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 53, 67, 1);
      }
      .matchitem {
        background-color: #fff;
        border-bottom: 1px solid rgba(128, 128, 128, 0.123);
        height: 73px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &.hot {
          background: linear-gradient(
            to right,
            rgb(254, 209, 212),
            white 50%,
            white
          );
        }
        span {
          padding: 0 10px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          // background-color: gray;
          .team-name {
            @include omit(2);
            @include omit(2);
          }
          &:nth-child(1) {
            width: 170px;
            font-weight: 700;
          }
          &:nth-child(2) {
            width: 60px;
          }
          &:nth-child(3) {
            width: 80px;
            color: #6c757d;
            text-align: center;
            &.islive {
              color: rgba(255, 53, 67, 1);
            }
          }
          &:nth-child(4) {
            width: 110px;
            text-align: center;

            img {
              width: 30px;
              height: 30px;
            }
          }
          &:nth-child(5) {
            width: 100px;
            height: 46px;
            line-height: 46px;
            cursor:pointer;
            text-align: center;
            font-size: 18px;
            font-weight: 700;
            padding: 0;
            position:relative;
            .layerScore{
              width:280px;
              height:auto;
              max-height:250px;
              padding:0 10px;
              background:rgba(0,0,0,.8);
              position:absolute;
              overflow:hidden;
              top:-10px;
              right:-260px;
              display:none;
              dt{
                padding:10px 0;
                overflow:hidden;
                position:relative;
                height:58px;
                .masterTeam{
                  font-weight:normal;
                  height:38px;
                  overflow:hidden;
                  display:block;
                  float:left;
                  img{
                    height:38px;
                    width:auto;
                  }
                }
                .txtTip{
                  position:absolute;
                  top:0;
                  left:0;
                  right:0;
                  bottom:0;
                  margin:auto;
                  width:100px;
                  height:38px;
                  line-height:38px;
                  display:block;
                  text-align:center;
                  color:#fff;
                }
                .customTeam{
                  font-weight:normal;
                  height:38px;
                  overflow:hidden;
                  display:block;
                  float:right;
                  img{
                    height:38px;
                    width:auto;
                  }
                }
              }
              dd{
                margin:0;
                border-top:1px solid #000;
                height:31px;
                position:relative;
                overflow:hidden;
                .masterScore{
                  width:100px;
                  height:30px;
                  display:block;
                  overflow:hidden;
                  font-weight:normal;
                  float:left;
                  a{
                    height:30px;
                    line-height:30px;
                    display:block;
                    float:left;
                    color:#fff;
                    font-size:12px;
                  }
                  b{
                    width:70px;
                    height:6px;
                    display:block;
                    background:#000;
                    border-top-left-radius:10px;
                    border-bottom-left-radius:10px;
                    overflow:hidden;
                    margin:12px 0 0;
                    float:right;
                    position:relative;
                    overflow:hidden;
                    i{
                      display:block;
                      position:absolute;
                      right:0;
                      height:6px;
                      width:0;
                      border-top-left-radius:10px;
                      border-bottom-left-radius:10px;
                      max-width:70px;
                      background:#FF3543;
                    }
                  }
                }
                .txtTip{
                  position:absolute;
                  top:0;
                  left:0;
                  right:0;
                  bottom:0;
                  margin:auto;
                  width:55px;
                  height:30px;
                  font-size:12px;
                  line-height:30px;
                  padding:0;
                  display:block;
                  text-align:center;
                  color:#fff;
                }
                .customScore{
                  width:100px;
                  height:30px;
                  display:block;
                  overflow:hidden;
                  font-weight:normal;
                  float:right;
                  a{
                    height:30px;
                    line-height:30px;
                    display:block;
                    float:right;
                    color:#fff;
                    font-size:12px;
                  }
                  b{
                    width:70px;
                    height:6px;
                    display:block;
                    background:#000;
                    border-top-right-radius:10px;
                    border-bottom-right-radius:10px;
                    overflow:hidden;
                    margin:12px 0 0;
                    float:left;
                    position:relative;
                    overflow:hidden;
                    i{
                      display:block;
                      position:absolute;
                      left:0;
                      height:6px;
                      width:0;
                      border-top-right-radius:10px;
                      border-bottom-right-radius:10px;
                      max-width:70px;
                      background:#FF3543;
                    }
                  }
                }
              }
            }
            &:hover .layerScore{
              display:block;
            }
          }
          &:nth-child(6) {
            width: 110px;
            text-align: center;
            img {
              width: 30px;
              height: 30px;
            }
          }
          &:nth-child(7) {
            width: 300px;
            padding: 0;
            // flex: 1;
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
            }
          }
        }
      }
    }
  }
}
</style>


