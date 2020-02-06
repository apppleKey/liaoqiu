<template>
  <div class="matchitem">
    <span>{{$props.item.lname}}</span>
    <span>{{fomartTime($props.item.gameTime)}}</span>
    <span :class="{islive:$props.item.gameStage}">{{$props.item.gameStage||'未开始'}}</span>
    <span class="home-team">
      <div>
        <img v-lazy="$props.item.hicon" alt />
      </div>
      <div class="team-name">{{$props.item.hname}}</div>
    </span>
    <span class="score">
      <div>{{$props.item.hTotalScore}} - {{$props.item.aTotalScore}}</div>
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
        <img v-lazy="$props.item.licon" alt />
      </div>
      <div class="team-name">{{$props.item.aname}}</div>
    </span>
    <span>
      <a
        class="play iconfont icon-bofang"
        :class="{islive:$props.item.stream&&$props.item.stream.status}"
        v-if="$props.item.stream&&$props.item.stream.m3u8"
        :href="'#/pc/live/'+$props.item.mid+'?sinal=stream'"
      >&nbsp;直播1</a>
      <a
        class="play iconfont icon-bofang"
        :class="{islive:$props.item.streamAmAli&&$props.item.streamAmAli.status}"
        v-if="$props.item.streamAmAli&&$props.item.streamAmAli.m3u8"
        :href="'#/pc/live/'+$props.item.mid+'?sinal=streamAmAli'"
      >&nbsp;直播2</a>
      <a
        class="play iconfont icon-bofang"
        :class="{islive:$props.item.streamNa&&$props.item.streamNa.live&&$props.item.streamNa.live.status}"
        v-if="$props.item.streamNa&&$props.item.streamNa.live&&$props.item.streamNa.live.m3u8"
        :href="'#/pc/live/'+$props.item.mid+'?sinal=streamNa'"
      >&nbsp;直播3</a>
      <a 
        class="play iconfont icon-bofang"
        :class="{islive:$props.item.streamNa&&$props.item.streamNa.anim&&$props.item.streamNa.anim.status}"
        v-if="$props.item.streamNa&&$props.item.streamNa.anim&&$props.item.streamNa.anim.status"
        :href="'#/pc/live/animate/'+$props.item.mid+'?sinal=streamAnimate&url='+enCode($props.item.streamNa.anim.anim)"
      >&nbsp;动画</a>
    </span>
  </div>
</template>
<script>
import { enCode,deCode } from "@/assets/js/utils.js";
export default {
  props: ["item"],
  data() {
    return {
      enCode:enCode
    };
  },
  created() {
  },
  methods: {
    fomartTime(str) {
      if (str) {
        return str.slice(11, 16);
      } else {
        return "--";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";
.matchitem {
  background-color: #fff;
  border-bottom: 1px solid rgba(128, 128, 128, 0.123);
  height: 73px;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
      padding:0;
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
</style>
