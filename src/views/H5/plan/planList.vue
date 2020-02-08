<template>
  <ul class="plan_list">
    <template v-if="planList.length > 0">
      <li class="plan_item" v-for="(item,i) in planList" :key="i">
        <div tag="div" @click="gotoUser(item.anchorSummaryInfo.anchorInfo.uid)" class="top_info" v-if="type != 'anchor'">
          <div class="avatar_info">
            <div class="avatar">
              <img v-lazy="item.anchorSummaryInfo.anchorInfo.avatarThumbnail">
            </div>
            <div class="info">
              <p class="user_name">{{item.anchorSummaryInfo.anchorInfo.username}}</p>
              <p class="prob">
                <span v-for="(items,ii) in item.anchorSummaryInfo.winLabelList" :key="'winLabelList' + ii">{{items.content}}</span>
              </p>
            </div>
          </div>
          <div class="win_rate" v-if="item.anchorSummaryInfo.winRate">胜率<span>{{item.anchorSummaryInfo.winRate}}%</span></div>
        </div>
        <div tag="div" @click="gotoPlan(item.planInfo.planId,item.anchorSummaryInfo)" class="title">{{item.planInfo.planTitle}}</div>
        <div tag="div" @click="gotoPlan(item.planInfo.planId,item.anchorSummaryInfo)" class="content" :class="item.planInfo.planStatus">
          <div class="match_time">
            <span class="round" :class="'play' + item.planInfo.playType" v-if="item.planInfo.playTypeContent">{{item.planInfo.playTypeContent}}</span>
            <span class="blue">{{item.planInfo.leagueMatch}}</span>
            <span class="time">{{item.planInfo.startTimestamp | formatTime}}</span>
          </div>
          <div class="text">{{item.planInfo.matchName}}</div>
        </div>
        <div class="last_time">{{item.planInfo.timeDistance}}</div>
        <div class="divide"></div>
      </li>
    </template>
    <div class="no_content" v-else>
      <div class="no_content_gif"></div>
      <p class="no_content_txt">暂未发布推单</p>
    </div>
  </ul>
</template>

<script>
export default {
  props:["type","planList"],
  data(){
    return{
      env:'H5'
    }
  },
  mounted(){
    // let nu = navigator.userAgent
    // if(nu.indexOf('kinglive') > -1){
    //   if(nu.indexOf('ios') > -1){
    //     this.env = 'iOS'
    //   }else{
    //     this.env = 'Android'
    //   }
    // }else{
    //   this.env = 'H5'
    // }
  },
  filters:{
    formatTime(t){
      t = new Date(t)
      return (t.getMonth() + 1).toString() + '月' + t.getDate().toString() + '日 ' + t.toTimeString().slice(0,5)
    }
  },
  methods:{
    gotoUser(uid){
      let data = {
        html_url: location.origin + "/H5/page/#/anchor?id=" + uid,
        title: '个人主页'
      }
      switch(this.env){
        case 'H5': 
        this.$router.push({
          path:'anchor',
          query:{id:uid}
        })
        break
        case 'iOS':
        window.webkit.messageHandlers.jsNewActivity.postMessage(JSON.stringify(data))
        break
        case 'Android':
        window.app.jsNewActivity(JSON.stringify(data))
        break
      }
    },
    gotoPlan(pid,info){
      let data = {
        html_url: location.origin + "/H5/page/#/plan?id=" + pid,
        title: '推单详情'
      }
      switch(this.env){
        case 'H5': 
        this.$router.push({
          path:'plan/'+pid,
          query:{winRate:info.winRate,winLabelList:info.winLabelList}
        })
        break
        case 'iOS':
        window.webkit.messageHandlers.jsNewActivity.postMessage(JSON.stringify(data))
        break
        case 'Android':
        window.app.jsNewActivity(JSON.stringify(data))
        break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.plan_list{
  position: relative;
  margin: 0;
  list-style: none;
  padding: 0;
  @include wh(100%,auto);
  background: #FFF;
  .plan_item{
    position: relative;
    @include wh(100%,auto);
    padding: p2r(20);
    border:1px solid rgba(238,238,238,1);
background:linear-gradient(0deg,rgba(246,246,246,1) 0%,rgba(255,255,255,1) 100%);
box-shadow:6px 6px 21px 0px rgba(0, 0, 0, 0.33);
border-radius:6px;
margin-bottom: ptr(30);
    &:last-child .divide{
      display: none;
    }
    .top_info{
      position: relative;
      @include wh(100%,auto);
      padding: 0 p2r(30);
      @include fs;
      .avatar_info{
        position: relative;
        flex: 1;
        height: auto;
        @include fs;
        .avatar{
          @include rwh(100,100);
          border-radius: 50%;
          overflow: hidden;
          @include fc;
          img{
            display: block;
            @include wh(100%,100%);
          }
        }
        .info{
          flex: 1;
          height: auto;
          margin-left: p2r(20);
          .user_name{
            position: relative;
            @include wh(100%,auto);
            line-height: p2r(50);
            word-break: break-all;
            font-size: p2r(28);
            color: rgba(48,48,48,1);;
            font-weight: 600;
            text-align: left;
          }
          .prob{
            position: relative;
            @include wh(100,auto);
            line-height: p2r(40);
            text-align: left;
            word-break: break-all;
            vertical-align: middle;
            span{
              display: inline-block;
              @include wh(auto,p2r(40));
              line-height: p2r(40);
              padding: 0 p2r(13);
              background: #ff3542;
              color: #FFF;
              font-size: p2r(28);
              margin-right: p2r(10);
              border-radius: 2px;
            }
          }
        }
      }
      .win_rate{
        @include wh(auto,auto);
        font-size: p2r(28);
        color: #666;
        span{
          display: inline-block;
          @include wh(auto,p2r(50));
          vertical-align: text-bottom;
          font-size: p2r(50);
          line-height: p2r(50);
          color: #ff3542;
          font-weight: bold;
          margin-left: p2r(5);
        }
      }
    }
    .title{
      position: relative;
      @include wh(100%,auto);
      padding: p2r(10) 0;
      font-size: p2r(32);
      color: #333;
      font-weight: 600;
      text-align: left;
      line-height: p2r(42);
      word-break: break-all;
    }
    .content{
      position: relative;
      @include wh(auto,auto);
      margin: 0 auto;
      background: rgba(235,235,235,1);
      border-radius: 4px;
      padding: p2r(10);
      font-size: ptr(32);
      font-weight: 600;
      &::after{
        content: "";
        position: absolute;
        right: p2r(10);
        top: 50%;
        @include rwh(100,100);
        margin-top: p2r(-50);
        background-repeat: no-repeat;
        background-size: 100% 300%;
        opacity: 0.9;
      }
      &.win::after{
        background-image: url('../../../../static/images/H5/plan_status.png');
        background-position: 0 0;
      }
      &.lose::after{
        background-image: url('../../../../static/images/H5/plan_status.png');
        background-position: 0 p2r(-100);
      }
      &.draw::after{
        background-image: url('../../../../static/images/H5/plan_status.png');
        background-position: 0 p2r(-200);
      }
      .match_time{
        position: relative;
        @include wh(100%,auto);
        word-break: break-all;
        .round{
          @include wh(auto,p2r(40));
          padding: 0 p2r(15);
          border-radius: p2r(20);
          border: p2r(2) solid #DDD;
          font-size: p2r(28);
          color: #FFF;
          line-height: p2r(38);
          margin-right: p2r(10);
          &.play1{
            color: #89D180;
          }
          &.play2{
            color: #6A62FF;
          }
          &.play3{
            color: #FBAB35;
          }
          &.play4{
            color: #9FA1BF;
          }
          &.play5{
            color: #6935FF;
          }
          &.play6{
            color: #FD4491;
          }
          &.play7{
            color: #6650AC;
          }
        }
        .blue{
          color: #0099FF;
          font-size: p2r(28);
          margin-right: p2r(10);
        }
        .time{
          color: #666;
          font-size: p2r(28);
        }
      }
      .text{
        position: relative;
        @include wh(100%,auto);
        font-size: p2r(30);
        color: #333;
        text-align: left;
        word-break: break-all;
        line-height: p2r(50);
      }
    }
    .last_time{
      position: relative;
      @include wh(100%,p2r(65));
      line-height: p2r(65);
      font-size: p2r(28);
      color: #666;
    }
    .divide{
      position: relative;
      @include wh(100%,p2r(18));
      background: #f6f6f6;
    }
  }
}
</style>