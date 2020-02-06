<template>
  <div class="pc_container">
    <div  id='header'></div>
    <div class="router">
      <router-view />
    </div>
    <div  id='footer'></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isNext:false
    };
  },
  created() {
      this.$store.dispatch("freshToken")
  },
  mounted() {
    if (this.$route.meta.needHeaderFooter) {
      $(".router").css({
        "pading-top": "80px",
        height: "100%"
      });
      var headerTag=this.$route.meta.headerTag
      axios
        .get("/index.php?g=Front&m=Index&a=getHeaderFooter&module=")
        .then(result => {
          $('#header').replaceWith(result.data.header) ;
          $('#footer').replaceWith(result.data.footer) ;
            $('#header_'+headerTag).attr('class','curr');
          
        });
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


