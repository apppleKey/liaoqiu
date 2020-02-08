<template>
  <div class="pc_container">
    <Header v-if='isShowHeader'/>
    <div class="router">
      <router-view />
    </div>
    <Footer v-if="isShowFooter"/>
  </div>
</template>
<script>
import Header from "@/views/PC/components/header.vue";
import Footer from "@/views/PC/components/footer.vue";

export default {
  components:{Header,Footer},
  data() {
    return {
      isNext:false,
      isShowHeader:false,
      isShowFooter:false
    };
  },
  created() {
    // debugger
      // this.$store.dispatch("freshToken")
  },
  mounted() {
    if (this.$route.meta.needHeaderFooter) {
      $(".router").css({
        "padding-top": "169px",
        'min-height': "900px"
      });
      this.isShowHeader=true;
      this.isShowFooter=true;
    }else{
        this.isNext=true
    }
  }
};
</script>
<style lang="scss" scoped>
.pc_container{
    // background-color: red;
}
</style>


