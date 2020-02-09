<template>
  <div class="article">
    <p class="amounts">{{hits}}阅读</p>
    <div class="content" v-html="content"></div>
  </div>
</template>
<script>
export default {
  props:['content','hits'],
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.article {
  position: relative;
  @include wh(100%, auto);
  padding: 0 p2r(30);
  .content {
    text-align: left;
    margin: p2r(20) 0;
    img {
      max-width: 100% !important;
      height: auto;
    }
  }
  .amounts {
    font-size: p2r(24);
    color: #8e8b8b;
    text-align: left;
    margin-bottom: p2r(20);
  }
}
</style>