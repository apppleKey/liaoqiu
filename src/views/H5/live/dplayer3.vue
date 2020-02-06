<template>
  <div id="dplayer" style='width:100%; ' class="h5_dplayer">
  </div>
</template>
<script>
import "dplayer/dist/DPlayer.min.css";

export default {

  data() {
    return {
      mid: this.$route.params.id,
    };
  },
  props: ["option"],
  created() {
    this.config;
    // console.log(111111111111, this.$props.option);
  },
  mounted() {
    //  this.player= new VueDPlayer(this.config)
    this.$nextTick(()=>{

      document.getElementById('dplayer').style.height=document.documentElement.clientWidth/16*9 +'px',
      console.log(document.getElementById('dplayer'))
      this.initVdeo()
    })
  },
  methods: {
     initVdeo () {
      const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        live: true, // 是否直播
        autoplay: true, // 是否自动播放
        theme: '#FADFA3', // 主题色
        loop: false, // 是否循环播放
        lang: 'zh-cn', // 语言类型 可选值: 'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否开启截图，如果开启，视频和视频封面需要允许跨域
        hotkey: false, // 开启热键，支持快进、快退、音量控制、播放暂停
        preload: 'auto', // 视频预加载，可选值: 'none', 'metadata', 'auto'
        logo: './static/imgs/video_logo.png', // 在左上角展示一个 logo，你可以通过 CSS 调整它的大小和位置
        volume: 0.7, // 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
        mutex: true, // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
        video: {
          url: this.$props.option.m3u8,
          type: 'auto'
        }
      })
    },
  }
};
</script>
<style lang="scss">
.h5_dplayer .dplayer-logo{
left:unset;
 right:20px;
 width: 200px;
 height: 300px;
 max-width: 100px;
 
}
</style>

