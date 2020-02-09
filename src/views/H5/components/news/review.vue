<template>
  <div class="review_box">
    <div class="review_list" v-if="reviewList.length > 0">
      <ul class="review">
        <li class="list_item" v-for="item in reviewList" :key="item.id">
          <div class="review_content">
            <div class="avatar">
              <img :src="item.avatar" />
            </div>
            <div class="content">
              <div class="user">
                <p class="name">{{item.user_nicename}}</p>
                <!-- <div class="like">
                  <span class="ico">
                    <svg t="1570090392396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9794" width="100%" height="100%">
                      <path d="M931.84 334.54c-39.936-10.444-133.837-10.24-271.258-13.926 6.554-30.003 7.988-57.036 7.988-104.96C668.672 100.966 585.114 0 511.18 0c-52.223 0-95.231 42.7-95.846 95.13-0.716 64.307-20.48 175.41-127.795 231.833-7.885 4.096-30.31 15.155-33.587 16.691l1.638 1.434a101.376 101.376 0 0 0-63.897-25.6H95.846A95.949 95.949 0 0 0 0 415.334V926.72c0 52.838 43.008 95.846 95.846 95.846h95.847a94.72 94.72 0 0 0 85.299-55.193l1.434 0.41 7.68 2.047c0.512 0 0.819 0.103 1.433 0.308 18.432 4.608 53.863 13.004 129.536 30.412 16.384 3.687 101.99 22.016 190.874 22.016h174.694c53.248 0 92.672-19.865 114.381-61.644 21.3-37.07 125.542-236.032 125.44-516.506 0-40.346-27.955-91.853-90.624-109.773zM223.642 926.72c0 17.613-14.336 31.949-31.95 31.949H95.847a31.949 31.949 0 0 1-31.948-31.949V415.334c0-17.612 14.336-31.948 31.948-31.948h95.847c17.715 0 31.949 14.336 31.949 31.948V926.72zM957.85 464.486c-13.312 321.024-117.146 466.33-117.146 466.33-9.728 17.408-25.19 27.853-58.163 27.853H607.949c-87.757 0-174.797-19.866-177.05-20.48-132.71-30.515-139.673-32.87-147.968-35.226l4.608-469.504c0-48.537 1.024-36.25 0-35.635C433.562 337.408 478.003 204.8 479.232 95.949A32.051 32.051 0 0 1 511.181 64c33.792 0 93.491 67.789 93.491 151.757 0 75.776-3.072 88.78-29.594 167.731 319.488 0 317.338 4.608 345.498 11.98 35.02 10.036 37.888 38.913 37.888 48.948 0 10.957-0.205 9.42-0.614 20.07z" fill="#666666" p-id="9795" />
                    </svg>
                  </span>46
                </div> -->
              </div>
              <div class="text" v-html="item.content">{{item.content}}</div>
              <div class="info">
                <div class="time">{{item.createtime | formateTime}}</div>
                <!-- <div class="review_user" @click="reReview(item.id,i)">回复TA</div> -->
              </div>
            </div>
          </div>
          <template v-if="item.replyList">
            <ul class="re_review_list">
              <li class="list_item" v-for="items in item.replyList" :key="items.id">
                <div class="avatar">
                  <img v-lazy="items.avatar" />
                </div>
                <div class="content">
                  <div class="user">
                    <p class="name">{{items.user_nicename}} @ {{item.user_nicename}}</p>
                    <!-- <div class="like">
                      <span class="ico">
                        <svg t="1570090392396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9794" width="100%" height="100%">
                          <path d="M931.84 334.54c-39.936-10.444-133.837-10.24-271.258-13.926 6.554-30.003 7.988-57.036 7.988-104.96C668.672 100.966 585.114 0 511.18 0c-52.223 0-95.231 42.7-95.846 95.13-0.716 64.307-20.48 175.41-127.795 231.833-7.885 4.096-30.31 15.155-33.587 16.691l1.638 1.434a101.376 101.376 0 0 0-63.897-25.6H95.846A95.949 95.949 0 0 0 0 415.334V926.72c0 52.838 43.008 95.846 95.846 95.846h95.847a94.72 94.72 0 0 0 85.299-55.193l1.434 0.41 7.68 2.047c0.512 0 0.819 0.103 1.433 0.308 18.432 4.608 53.863 13.004 129.536 30.412 16.384 3.687 101.99 22.016 190.874 22.016h174.694c53.248 0 92.672-19.865 114.381-61.644 21.3-37.07 125.542-236.032 125.44-516.506 0-40.346-27.955-91.853-90.624-109.773zM223.642 926.72c0 17.613-14.336 31.949-31.95 31.949H95.847a31.949 31.949 0 0 1-31.948-31.949V415.334c0-17.612 14.336-31.948 31.948-31.948h95.847c17.715 0 31.949 14.336 31.949 31.948V926.72zM957.85 464.486c-13.312 321.024-117.146 466.33-117.146 466.33-9.728 17.408-25.19 27.853-58.163 27.853H607.949c-87.757 0-174.797-19.866-177.05-20.48-132.71-30.515-139.673-32.87-147.968-35.226l4.608-469.504c0-48.537 1.024-36.25 0-35.635C433.562 337.408 478.003 204.8 479.232 95.949A32.051 32.051 0 0 1 511.181 64c33.792 0 93.491 67.789 93.491 151.757 0 75.776-3.072 88.78-29.594 167.731 319.488 0 317.338 4.608 345.498 11.98 35.02 10.036 37.888 38.913 37.888 48.948 0 10.957-0.205 9.42-0.614 20.07z" fill="#666666" p-id="9795" />
                        </svg>
                      </span>46
                    </div> -->
                  </div>
                  <div class="text" v-html="items.content"></div>
                  <div class="info">
                    <div class="time">{{items.createtime | formateTime}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </template>
        </li>
      </ul>
      <div class="load_more_review" v-if="moreReview" @click="showMoreReview">加载更多评论</div>
    </div>
    <div class="no_review" v-else>
      <div class="soft">
        <svg t="1566542025168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2364" width="100%" height="100%">
          <path d="M241.40288 574.73536c4.532224-100.75648-41.708544-138.85952-102.218752-159.377408C102.56384 79.98464 710.279168 84.296704 838.633472 242.7136c30.831616 38.06208 48.279552 107.389952 48.410624 172.644352-60.94336 19.961856-111.186944 53.141504-102.20544 159.377408C784.83968 574.73536 521.464832 438.924288 241.40288 574.73536zM214.244352 614.576128c40.603648-176.791552-137.980928-215.12192-150.649856-73.034752-9.3184 104.409088 44.407808 225.890304 75.314176 278.893568 5.198848 1.634304 10.2656 3.392512 15.622144 4.847616l18.993152 0 0 33.585152c0 15.1552 16.8448 27.460608 37.609472 27.460608 20.779008 0 37.629952-12.306432 37.629952-27.460608l0-33.585152 527.059968 0 0 33.585152c0 15.1552 16.857088 27.460608 37.643264 27.460608 20.793344 0 37.63712-12.306432 37.63712-27.460608l0-33.585152 16.982016 0c6.832128-3.090432 11.961344-8.281088 18.676736-11.495424 32.410624-70.453248 93.861888-188.025856 69.986304-298.821632-16.1024-74.374144-122.523648-89.926656-145.301504 0-10.080256 39.88992 15.753216 63.490048-10.76736 106.256384C800.68096 621.222912 532.547584 461.048832 214.244352 614.576128z" p-id="2365"/>
        </svg>
      </div>还没有人发表评论，赶快来抢占沙发吧！
    </div>
    <div class="write_review">
      <div class="left" v-if="!userInfo.uid">
        <div class="app" @click="AppLogin">登录</div>
      </div>
      <div class="left" v-else @click="reviewBoxShow">
        <div class="write_svg">
          <svg t="1566542400485" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3134" width="100%" height="100%">
            <path d="M978.7422368 187.3853088l-44.58777067 44.2854176L785.66973547 84.0996032l44.58777066-44.22320106c16.3630752-16.30194987 42.1569408-17.15661547 57.48524907-1.88615787l92.8256064 92.2176256C995.95779413 145.4750528 995.105312 171.0866336 978.7422368 187.3853088L978.7422368 187.3853088zM584.93144213 578.76745707L436.44780267 431.1941504l326.65461973-324.58617706 148.48582293 147.5722144L584.93144213 578.76745707 584.93144213 578.76745707zM564.25028693 599.32745174l-207.8539552 59.00247146 59.37031574-206.57796053L564.25028693 599.32745174 564.25028693 599.32745174zM218.18832427 150.52663894c-51.34104533 0-92.88673173 41.5456864-92.88673174 92.8256064l0 557.19704746c0 51.2668224 41.55987627 92.8277888 92.8277888 92.8277888l557.31820694 0c51.2679136 0 92.82997227-41.56096747 92.82997226-92.82997226L868.27756053 429.0645824l92.88454827-92.82997226 0 495.2758336c0 85.46653333-69.28465173 154.75009387-154.75009387 154.75009386L187.16604693 986.2605376c-85.46653333 0-154.75009387-69.28465173-154.75009386-154.75009386L32.41595307 212.3889088c0-85.46653333 69.28465173-154.75009387 154.75009386-154.75009386l495.39808534 0-92.88891414 92.88891413L218.18832427 150.52773014 218.18832427 150.52663894z" p-id="3135" />
          </svg>
        </div>
        <p class="write_txt">写评论</p>
      </div>
      <div class="right">
        <div class="review_nums" @click="showView">
          <div class="review_svg">
            <svg t="1566542483656" class="icon" viewBox="0 0 1092 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3868" width="100%" height="100%">
              <path d="M983.04 108.817067H109.226667v611.5328h755.131733l118.6816 83.626666V108.817067zM0 0h1092.266667v1014.237867l-262.621867-185.070934H0V0z m208.042667 430.4896c0-37.410133 30.446933-67.720533 67.9936-67.720533s67.959467 30.3104 67.959466 67.720533a67.857067 67.857067 0 0 1-67.959466 67.754667c-37.546667 0-67.9936-30.344533-67.9936-67.754667z m257.706666 0c0-37.410133 30.378667-67.720533 67.925334-67.720533s67.9936 30.3104 67.9936 67.720533a67.857067 67.857067 0 0 1-67.959467 67.754667c-37.546667 0-67.9936-30.344533-67.9936-67.754667z m261.2224 0c0-37.410133 30.446933-67.720533 67.9936-67.720533s67.959467 30.3104 67.959467 67.720533a67.857067 67.857067 0 0 1-67.959467 67.754667c-37.546667 0-67.9936-30.344533-67.9936-67.754667z" p-id="3869" />
            </svg>
          </div>
          <p class="review_txt">{{reviewCount}}</p>
        </div>
        <div class="like_review" v-if="false">
          <div class="like_svg">
            <svg t="1566784750046" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2142" width="100%" height="100%">
              <path d="M884.875894 423.143253L646.970506 423.143253c92.185562-340.464205-63.516616-357.853247-63.516616-357.853247-65.993017 0-52.312436 52.182476-57.3031 60.881602 0 166.502152-176.849824 296.971645-176.849824 296.971645l0 472.171899c0 46.607504 63.516616 63.393819 88.433098 63.393819l357.452111 0c33.641191 0 61.036122-88.224344 61.036122-88.224344 88.434122-300.70569 88.434122-390.177444 88.434122-390.177444C944.657442 418.179195 884.875894 423.143253 884.875894 423.143253L884.875894 423.143253 884.875894 423.143253zM884.875894 423.143253" p-id="2143" />
              <path d="M251.671415 423.299819L109.214912 423.299819c-29.420053 0-29.873378 28.89612-29.873378 28.89612l29.420053 476.202703c0 30.309306 30.361495 30.309306 30.361495 30.309306L262.420223 958.707948c25.686009 0 25.458835-20.049638 25.458835-20.049638L287.879058 459.411271C287.879058 422.837284 251.671415 423.299819 251.671415 423.299819L251.671415 423.299819 251.671415 423.299819zM251.671415 423.299819" p-id="2144" />
            </svg>
          </div>
          <p class="like_nums">7</p>
        </div>
      </div>
    </div>
    <transition name="fade">
    <div class="review_write" v-if="writeReviewBox" @click.self="reviewBoxShow">
      <div class="review_panel">
        <textarea name="offerComment" ref="offerComment" maxlength="200" id="offerComment" v-model="content" placeholder="填写您的评价或者意见"></textarea>
        <div class="actions">
          <input class="submit_review" :class="content.length >= 5 ? 'has_content' : ''" type="button" @click="submitReview" value="发表"/>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
// import {getStore,getCookie} from '@/config/unit.js'
// import { setTimeout } from 'timers';
export default {
  // props:['userInfo'],
  data(){
    return{
      userInfo:{},
      reviewList:[],
      page:1,
      content:'',
      writeReviewBox:false,
      moreReview:false,
      commentid:'',
      origin: btoa(encodeURI(window.location.href)),
      reviewCount:0,
      app:false,
    }
  },
  watch:{
    $route(){
      Object.assign(this.$data, this.$options.data())
      if(navigator.userAgent.toLowerCase().indexOf('kinglive') > -1){
        this.app = true
      }
      this.getReviewList()
    }
  },
  mounted(){
    this.getReviewList()
  },
  methods:{
    getReviewList(){
      this.$http({
        url:'/index.php?g=Wwapi&m=News&a=getCommentList',
        method:'GET',
        params:{
          page:this.page,
          pagesize:10,
          id:this.$route.query.id,
          uid:this.userInfo.uid,
          token:this.userInfo.token
        }
      }).then(res => {
        // console.log(res)
        if(res.status != 200){
          this.$toast('获取评论失败！')
          return
        }
        if(res.data.status === 200){
          if(res.data.totalPage > this.page){
            this.moreReview = true
          }else{
            this.moreReview = false
          }
          if(this.page === 1){
            this.reviewList = res.data.data
          }else{
            this.reviewList = this.reviewList.concat(res.data.data)
          }
          this.reviewCount = Number(res.data.count) || 0
        }
      })
    },
    submitReview(){
      if(!this.userInfo.uid){
        this.content = ''
        this.writeReviewBox = false
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
      if(this.content === ''){
        this.$toast('评论内容必填！')
        return false
      }
      this.$indicator.open()
      this.$http({
        url:'/index.php?g=H5&m=News&a=comment',
        method:'GET',
        params:{
          vid:this.$route.query.id,
          content:this.content,
          commentid:this.commentid,
          uid:this.userInfo.uid,
          token:this.userInfo.token
        }
      }).then(res => {
      this.$indicator.open()
        if(res.data.status == 'unlogin'){
          this.$toast('您还未登录，无法提交评论哦！')
          return
        }
          document.documentElement.scrollTop = document.body.scrollTop = 0
          this.$toast('评论成功！')
          this.content = ''
          this.writeReviewBox = false
          this.getReviewList()
      })
    },
    reviewBoxShow(){
      this.writeReviewBox = !this.writeReviewBox
      if(!this.writeReviewBox) {this.commentid = ''}
      else{
        setTimeout(()=>{
          this.$refs.offerComment.focus()
          document.querySelector('#offerComment').focus()
        },500)
      }
    },
    reReview(id){
      if(!this.userInfo.uid){
        this.$toast('登录后才能回复别人哦！')
        return
      }
      this.commentid = id
      this.writeReviewBox = true
      setTimeout(()=>{
        this.$refs.offerComment.focus()
        document.querySelector('#offerComment').focus()
      },500)
    },
    showMoreReview(){
      this.page += this.page
      this.getReviewList()
    },
    showView(){
      document.documentElement.scrollTop  = document.querySelector('.article').clientHeight + document.querySelector('.anchor_info').clientHeight
    },
    AppLogin(){
      if(!this.app){
        location.href = '/index.php?g=H5&m=User&a=login&url=' + this.origin
        return false
      }
      if(navigator.userAgent.includes("kinglive-ios")){
        window.webkit.messageHandlers.jsLogin.postMessage()
      }else{
        window.app.jsLogin()
      }
    },
  },
  filters:{
    formateTime(t){
      return t.substring(5).slice(0,-3)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.review_box {
  position: relative;
  @include wh(100%, auto);
  padding-bottom: p2r(105);
  .review_list{
    position: relative;
    @include wh(100%,auto);
    .load_more_review{
      position: relative;
      @include wh(100%,p2r(50));
      line-height: p2r(50);
      text-align: center;
      font-size: p2r(28);
      color: #ff6a78;
      text-decoration: underline;
    }
  }
  .review {
    position: relative;
    @include wh(100%, auto);
    padding: 0 p2r(30);
    background: #fff;
    .list_item {
      position: relative;
      @include wh(100%, auto);
      margin: p2r(20) 0 p2r(30) 0;
      .review_content {
        position: relative;
        @include wh(100%, auto);
        @include fs;
        align-items: flex-start;
      }
      .re_review_list {
        position: relative;
        @include wh(90%, auto);
        margin-left: 10%;
        background: #f6f6f6;
        .list_item {
          @include fs;
          align-items: flex-start;
          padding: p2r(10);
          margin-bottom: p2r(5);
        }
      }
      .avatar {
        @include rwh(80, 80);
        background: #f6f6f6;
        border-radius: 50%;
        overflow: hidden;
        margin-right: p2r(20);
        img {
          display: block;
          @include wh(100%, 100%);
        }
      }
      .content {
        flex: 1;
        height: auto;
        .user {
          position: relative;
          @include wh(100%, auto);
          @include fs;
          .name {
            flex: 1;
            height: auto;
            line-height: p2r(40);
            color: #3a9bff;
            font-size: p2r(24);
            margin-right: p2r(20);
            text-align: left;
          }
          .like {
            @include wh(auto, auto);
            @include fs;
            font-size: p2r(24);
            color: #333;
            .ico {
              @include rwh(30, 30);
              @include fc;
              margin-right: p2r(5);
            }
          }
        }
        .text {
          position: relative;
          @include wh(100%, auto);
          text-align: left;
          line-height: p2r(36);
          font-size: p2r(24);
          color: #333;
        }
        .info {
          position: relative;
          @include wh(100%, auto);
          text-align: left;
          line-height: p2r(36);
          font-size: p2r(24);
          color: #333;
          @include fs;
          justify-content: flex-start;
          .time {
            margin-right: p2r(15);
          }
        }
      }
    }
  }
  .no_review {
    position: relative;
    @include wh(100%, 4rem);
    font-size: 0.6rem;
    color: #999;
    text-align: center;
    .soft {
      @include rwh(100, 100);
      margin: 0 auto;
      svg path{
        fill: #999;
      }
    }
  }
  .write_review {
    position: fixed;
    left: 0;
    bottom: 0;
    @include wh(100%, p2r(105));
    padding: 0 p2r(30);
    @include fs;
    z-index: 100;
    background: #fff;
    border-top: 1px solid #f3f3f3;
    .left {
      height: 100%;
      flex: 1;
      @include fs;
      justify-content: flex-start;
      font-size: p2r(28);
      color: #999;
      .app{
        font-size: p2r(28);
        color: #ff6a78;
        padding: 0 p2r(10);
      }
      a{
        font-size: p2r(28);
        color: #ff6a78;
        padding: 0 p2r(10);
      }
      .write_svg {
        @include rwh(40, 40);
        svg path {
          fill: #ff6a78;
        }
      }
      .write_txt {
        font-size: p2r(28);
        color: #333;
        margin-left: p2r(10);
      }
    }
    .right {
      position: relative;
      @include wh(auto, auto);
      @include fc;
      .review_nums,
      .like_review {
        position: relative;
        @include wh(auto, auto);
        margin: 0 p2r(10);
        @include fc;
        .review_svg,
        .like_svg {
          @include rwh(40, 40);
          svg path {
            fill: #b2b2b2;
          }
        }
        p {
          font-size: p2r(28);
          color: #333;
          margin-left: p2r(10);
        }
      }
    }
  }
  .review_write {
    position: fixed;
    top: 0;
    left: 0;
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.3);
    z-index: 101;
    .review_panel {
      position: absolute;
      bottom: 0;
      left: 0;
      @include wh(100%, p2r(222));
      padding: p2r(20) p2r(20);
      padding-bottom: 0;
      background: #fff;
      #offerComment {
        position: relative;
        display: block;
        @include wh(100%, p2r(107));
        background: #efefef;
        color: #333;
        font-size: p2r(28);
        line-height: p2r(42);
        padding: p2r(5) p2r(15);
      }
      .actions {
        position: relative;
        @include wh(100%, p2r(95));
        @include fc;
        justify-content: flex-end;
        .left {
          position: relative;
          @include wh(auto, auto);
          @include fc;
          font-size: p2r(28);
          color: #555;
          #isAnonymous {
            margin-left: p2r(5);
          }
        }
        .submit_review {
          position: relative;
          @include rwh(135, 55);
          background: #eee;
          color: #555;
          border-radius: p2r(25.25);
          font-size: p2r(28);
          &.has_content {
            background: #ff6a78;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
