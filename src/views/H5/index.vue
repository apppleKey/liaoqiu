<template>
    <!-- <Header v-if="isShowHeader" /> -->
    <div class="router">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <!-- <Footer v-if="isShowFooter" /> -->
</template>
<script>
// import Header from "@/views/H5/components/header.vue";
// import Footer from "@/views/H5/components/footer.vue";

export default {
  // components: { Header, Footer },
  data() {
    return {
      isNext: false,
      isShowHeader: false,
      isShowFooter: false
    };
  },
  created() {
    // debugger
    // this.$store.dispatch("freshToken")
  },
  mounted() {
    // console.log(this.$route.meta.keepAlive,'isalive')
  //   if (this.$route.meta.needHeaderFooter) {
  //     this.isShowHeader = true;
  //     this.isShowFooter = true;
  //     this.$nextTick(() => {
  //       $(".router").css({
  //         "padding-top": $("#header").height() + "px",
  //         // "min-height": "800px"
  //       });
  //     });
  //   } else {
  //     this.isNext = true;
  //   }
  }
};
</script>
<style lang="scss" scoped>
</style>


