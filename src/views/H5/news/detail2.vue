<template>
  <div class="list" :class="!app ? 'pt' : ''">
    <Head class="header" v-if="!app" :title="newsTitle" />
    <anchorInfo :title="newsTitle" :anchorInfo="anchorInfo" :userInfo="userInfo" />
    <article-content :content="newsDetail" :hits="hits" />
    <review-list :userInfo="userInfo" />
  </div>
</template>
<script>
import anchorInfo from "@/views/H5/components/news/anchorInfo.vue"
import articleContent from "@/views/H5/components/news/article.vue"
import reviewList from "@/views/H5/components/news/review.vue"
export default {
  // props:['userInfo'],
  data() {
    return {
      userInfo:{},
      newsTitle:'',
      newsDetail:'',
      anchorInfo:{},
      hits:'',
      app:false
    };
  },
  components: {
    anchorInfo,
    articleContent,
    reviewList
  },
  mounted() {
    if(navigator.userAgent.toLowerCase().indexOf('kinglive') > -1) {this.app = true}
    this.getNewsDetail()
  },
  watch:{
    $route(){
      Object.assign(this.$data, this.$options.data())
      this.getNewsDetail()
    }
  },
  methods: {
    getNewsDetail(){
      this.$indicator.open()
      this.$http({
        url:'/index.php?g=H5&m=News&a=newsDetail&id=' + this.$route.params.id,
        method:'GET',
      }).then(res => {
              this.$indicator.close()
        console.log(res)
        this.anchorInfo = {
          isattention:res.data.detail.isattention,
          avatar:res.data.detail.avatar,
          uid:res.data.detail.uid,
          user_nicename:res.data.detail.user_nicename,
          signnature:res.data.detail.signature,
          hits:res.data.detail.post_hits_initial
        }
        this.newsTitle = res.data.data.detail.post_title
        this.newsDetail = res.data.data.detail.post_content
        this.hits = res.data.data.detail.post_hits_initial
      }).catch(err=>{
        console.log(err);
      this.$indicator.close()

      })
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.list {
  position: relative;
  @include wh(100%, auto);
  overflow-x: hidden;
  &.pt{
    padding-top: 2rem;
  }
  .header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 101;
  }
}
</style>