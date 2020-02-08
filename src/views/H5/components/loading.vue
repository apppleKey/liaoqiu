<template>
  <div class="we-loading-component">
    <div v-if="loadingStatus==1" class="loadingStatus" style="border:none;">
      <mt-spinner :type="3" class="loading-spinner"></mt-spinner>
      <span class="loading_text">加载中...</span>
    </div>
    <div v-if="loadingStatus==2" class="loadingStatus" @click="loadmore">
      <span class="loading_text">加载更多...</span>
    </div>
    <div v-if="loadingStatus==3" class="loadingStatus">
      <span class="loading_text">没有更多啦~</span>
    </div>
    <div v-if="loadingStatus==4" class="loadingStatus nodata">
      <span class="loading_text">{{text||'暂无数据'}}</span>
    </div>
    <div v-if="loadingStatus==10" class="loadingStatus nodata" @click="loadmore">
      <span class="loading_text">{{text||'加载错误'}}</span>
    </div>
  </div>
</template>
<script>
const status = {
  loadedAll: 0,
  text: "隐藏",
  loading: 1,
  text: "加载中...",
  loaded: 2,
  text: "下拉加载",
  loadedAll: 3,
  text: "没有更多"
};
export default {
  props: ["loadingStatus", "text"],
  data() {
    return {};
  },
  methods: {
    loadmore() {
      console.log("loadmore");
      this.$emit("loadmore");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.we-loading-component {
  cursor: pointer;
  user-select: none;
  .loadingStatus {
    text-align: center;
    // width: 100%;
    margin: 0 ptr(20);
    height: ptr(80);
    line-height: ptr(80);
    font-size: ptr(32);
    font-weight: bold;
    color: rgba(50, 50, 50, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    background: rgba(255, 255, 255, 1);
    &.nodata {
      color: gray;
      border: none;
      .loading_text {
        color: gray;
      }
    }
  }

  .loading-spinner {
    display: inline-block;
    vertical-align: ptr(-14);
    margin-right: ptr(10);
  }
  .loading_text {
    line-height: ptr(80);
    // font-size: 12px;
    color: #323232;
  }
}
</style>

