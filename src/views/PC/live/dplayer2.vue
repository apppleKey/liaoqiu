<template>
  <div class="my_dplayer pc_dplayer" >
    <div
      id="player"
      ref="player"
      v-if="option.status==true"
     
      style="width:100%;height:100%;background-color:black;"
    ></div>
    <!-- <img :src="'./static/imgs/video_logo.png'" alt=""> -->
    <!-- <div >直播源获取:{{option}}</div>
    <div style='color:red'>{{option.flv}}</div> -->
  </div>
</template>
<script>
import "dplayer/dist/DPlayer.min.css";

export default {
  
  components: {
  },
  data() {
    return {
      mid: this.$route.params.id,
      // config: {
      //   container: document.getElementById("player"),
      //   live: true, //是否直播
      //   autoplay: true, //是否自动播放
      //   theme: "#fe5a65", //主题色
      //   loop: false, //是否循环播放
      //   lang: "zh-cn", //语言类型 可选值: 'en', 'zh-cn', 'zh-tw'
      //   screenshot: false, //是否开启截图，如果开启，视频和视频封面需要允许跨域
      //   hotkey: true, //开启热键，支持快进、快退、音量控制、播放暂停
      //   preload: "auto", //视频预加载，可选值: 'none', 'metadata', 'auto'
      //   logo: "", //在左上角展示一个 logo，你可以通过 CSS 调整它的大小和位置
      //   volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
      //   mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
      //   logo: './static/imgs/video_logo.png',
      //   logo: 'http://static.yixinwulian.com/data/upload/20190311/5c863012d4a82.jpg?imageView2/2/w/600/h/600',
      //   //视频信息
      //   video: {
      //     url:  this.$props.option.flv,
      //     type: "auto"
      //     // defaultQuality: 0,
      //     //pic: 'dplayer.png',  //视频封面
      //     //thumbnails: 'dplayer.png', //视频缩略图，可以使用 DPlayer-thumbnails 生成
      //   }
      // }
    };
  },
  props: ["option"],
  watch:{
    option:{
      handler:function(){
        if(!this.option.status)return;
        console.log(this.option.flv)
        this.play()
      },
      deep:true
    }
  },
  created() {
    this.config;
    // console.log(111111111111, this.$props.option);
  },
  mounted() {
    //  this.player= new VueDPlayer(this.config)
    this.$nextTick(()=>{
      if(document.getElementById("player")){
        this.play();
      }
    })
  },
  methods: {
    play() {
      new DPlayer(  {
        container: document.getElementById("player"),
        live: true, //是否直播
        autoplay: true, //是否自动播放
        theme: "#fe5a65", //主题色
        loop: false, //是否循环播放
        lang: "zh-cn", //语言类型 可选值: 'en', 'zh-cn', 'zh-tw'
        screenshot: false, //是否开启截图，如果开启，视频和视频封面需要允许跨域
        hotkey: true, //开启热键，支持快进、快退、音量控制、播放暂停
        preload: "auto", //视频预加载，可选值: 'none', 'metadata', 'auto'
        logo: "", //在左上角展示一个 logo，你可以通过 CSS 调整它的大小和位置
        volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
        mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
        logo: './static/imgs/video_logo.png',
        // logo: 'http://static.yixinwulian.com/data/upload/20190311/5c863012d4a82.jpg?imageView2/2/w/600/h/600',
        //视频信息
        video: {
          url:  this.option.flv,
          type: "auto",
          // defaultQuality: 0,
          // pic: './static/imgs/logo.png',  //视频封面
          //thumbnails: 'dplayer.png', //视频缩略图，可以使用 DPlayer-thumbnails 生成
        }
      })
    }
  }
};
</script>
<style lang="scss">
.pc_dplayer .dplayer-logo{
left:unset;
 right:20px;
 width: 200px;
 height: 300px;
 max-width: 200px;
 
}
</style>

<style lang="scss" scoped>
</style>

