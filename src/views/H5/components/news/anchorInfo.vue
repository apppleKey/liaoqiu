<template>
  <div class="anchor_info">
    <div class="news_title">{{title}}</div>
    <div class="anchor" v-if="anchorInfo.uid">
      <div class="left" @click="showAnchor(anchorInfo.uid)">
        <div class="avatar"><img :src="anchorInfo.avatar" @error="setDefaultAvatar($event)" /></div>
        <div class="infos">
          <div class="anchor_name">{{anchorInfo.user_nicename}}</div>
          <div class="describe">{{anchorInfo.signnature}}</div>
        </div>
      </div>
      <input type="button" :value="anchorInfo.isattention == 1 ? '已关注' : '关注'" class="right" :class="anchorInfo.isattention == 1 ? 'focused' : ''" @click.stop="focusOn($event)" />
    </div>
  </div>
</template>
<script>
export default {
  props:['title','anchorInfo','userInfo'],
  data(){
    return{
      uid:'',
      app:false,
    }
  },
  mounted(){
    this.uid = this.userInfo.uid
    if(navigator.userAgent.toLowerCase().indexOf('kinglive') > -1){
      this.app = true
    }
  },
  methods:{
    focusOn(e){
      if(!this.uid){
        let _this = this
        this.$layer.confirm('提示','登录后才能关注哦，是否跳转到登录页？',function(b){
          if(b){
            if(_this.app){
              if(window.hasOwnProperty('app') && window.app.jsIsLogin){
                window.app.jsIsLogin()
              }else{
                window.webkit.messageHandlers.jsIsLogin_iOS.postMessage({})
              }
            }else{
              window.location.href = window.location.origin + '/index.php?g=h5&m=user&a=login&url=' + btoa(window.location.href)
            }
          }
        })
        return
      }
      this.$http({
        url:'/api/public/?service=User.setAttent',
        method:'GET',
        params:{
          touid:this.anchorInfo.uid,
          uid:this.uid
        }
      }).then(res => {
        // console.log('huashd',res)
        if(res.status == 200){
          if(res.data.code == 0){
            if(res.data.info[0].isattent === '1'){
              e.target.className = 'right focused'
              e.target.value = '已关注'
            }else{
              e.target.className = 'right'
              e.target.value = '关注'
            }
          }else{
            this.$layer.tip(res.data.msg)
          }
        }
      })
    },
    showAnchor(id){
      if(this.app){
        let data = {
          html_url: window.location.origin + '/H5/page/#/anchor?id=' + id,
          title: '个人主页'
        }
        if(window.app.jsNewActivity){
          window.app.jsNewActivity(JSON.stringify(data))
        }else{
          window.webkit.messageHandlers.jsNewActivity.postMessage(JSON.stringify(data))
        }
        return
      }
      this.$router.push('/anchor?id=' + id)
    },
    setDefaultAvatar(e){
      e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAFVBMVEXm5ubT09PY2Njc3Nzh4eHj4+Pe3t6gXRiMAAAC6ElEQVRo3u2XPXOjMBCGlw+l5hXGNTK+1ODJpbYS52rI3F2Nk8n9/59wWgknLrObKjM8BaIwD6vVroRpZWVlZWXlu9HS18i3XxQ4kJLbMQZg/awUDDYG0GSVUlDEyfvKa5NQ1nEKjetJiY0CxMGcTiTlETNnAnEGN2GQkgF3pwGwIyckXKWUWNiwTbEUBhe6fyenKgbz5/TqkPhNcg673e7+7W9S3Kq6gLHdgQdFMbzgiprEPOAaxaaQ4j+aXwMCR3UV7LkkYRUbkX1K06hHeoaVR5B655lj4EHb0hne4jgoltFz7fjl1YU8hDLGPqQK4ptZ+Lzb3cU3v4ewIRUeGInMk3p3v0lF6KwLowqgCdcJkMzBdm8fp8OmS7mAlfRx/SFoCgo6WT9MdrwSGPJHOos6Mks/fb0P73RVEG5iEhqpIAe6EUGQYQz3gmKcOAXmZ8mZQ8Wm6kaUxTEeh7677EUFaoOAoHxqviDSx7sRmCTb0sOP9135OHJjtQ5Pon56INpPaJ8B6llQOfS+Fe+qFfma7vmQ2w5oi88KTB8HxwLT0oEF9hyy+VnBDf+wZ0F8YmABhmD7bBI51HxbXs4zd+TZOEEh5i0VsB7AGAVzEIjaOd8fLgciR43eSAVYCJHwGralUJAhYUNX9JTrBS2Z0BRT6CSFIAVwDuUf1q+QCmznYgAvANdAk5Ii+U6Lr6SB1yEPgkwqMG73GKo/RjEEwQRwWQqPZYvAXPLkz7wZCA/HYcljxgIH5FyWEhBp4qZSB1MhOVeutrMCiW2ZzhppNZNHojGpGYW1ZM1HV6AVCw6wYUj0YVeQCmwO68KwfGfuSCpol/o7p7bYkzSJYxLMPu0so0xQhGemmMc4VIpPoyoJNpSp/iwYzEnQxpIgOY6SYGZBrRA8LoKYz4pUZGn9Cg5DRZ7Wj/tQR5E+i0rtV3I8UhsW9KTERYGxpGWKAtqoBWUSzKTGL/nTM2y/KDAdraysrKysfC/+A8yWY0oMj7JbAAAAAElFTkSuQmCC'
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.anchor_info{
  position: relative;
  @include wh(100%,auto);
  padding: 0 p2r(30);
  .news_title {
    position: relative;
    @include wh(100%, auto);
    font-size: p2r(30);
    font-weight: 600;
    color: #222;
    line-height: p2r(50);
    text-align: left;
    margin: p2r(20) 0;
    word-break: break-all;
  }
  .anchor {
    position: relative;
    @include wh(100%, auto);
    background: #f6f6f6;
    border-radius: 2px;
    @include fs;
    padding: p2r(10);
    .left {
      position: relative;
      flex: 1;
      height: auto;
      @include fs;
      margin-right: p2r(20);
      .avatar {
        @include rwh(100, 100);
        border-radius: 50%;
        background: #e0e2e1;
        overflow: hidden;
        img {
          display: block;
          @include wh(100%, 100%);
        }
      }
      .infos {
        flex: 1;
        height: auto;
        margin-left: p2r(30);
        @include fs;
        flex-direction: column;
        text-align: left;
        font-size: p2r(24);
        .anchor_name {
          text-align: left;
          @include wh(100%, auto);
          color: #222;
          font-size: p2r(28);
          line-height: p2r(50);
          @include omit(1);
        }
        .describe,
        .fans {
          text-align: left;
          @include wh(100%, auto);
          color: #666;
          line-height: p2r(36);
          @include omit(1);
        }
      }
    }
    .right {
      @include wh(auto, p2r(40));
      padding: 0 p2r(20);
      background: #ff3441;
      border-radius: 2px;
      color: #fff;
      font-size: p2r(28);
      &.focused{
        background: #666;
        color: #FFF;
      }
      &:active {
        background: hotpink;
      }
    }
  }
}
</style>