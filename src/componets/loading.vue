<template>
  <div class="we-loading-component">
    <div v-if="loadingStatus==1" class="loadingStatus">
      <mt-spinner :type="3" class="loading-spinner" ></mt-spinner>
      <span class="loading_text">加载中...</span>
    </div>
    <div v-if="loadingStatus==2" class="loadingStatus" @click="loadmore">
      <span class="loading_text">加载更多</span>
    </div>
    <div v-if="loadingStatus==3" class="loadingStatus">
      <span class="loading_text">没有更多啦~</span>
    </div>
    <div v-if="loadingStatus==4" class="loadingStatus">
      <span class="loading_text">{{text||'暂无数据'}}</span>
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
  props: ["loadingStatus","text"],
  data() {
    return {
    };
  },
  methods: {
    loadmore(){
      console.log('loadmore');
      this.$emit('loadmore');
    }
  }
};
</script>

<style lang="scss" scoped>
.we-loading-component {
  cursor: pointer;
  user-select: none;
  .loadingStatus{
    text-align: center;
    margin: 10px;
  }
  .loading-spinner {
    display: inline-block;
    vertical-align: -7px;
    margin-right: 10px;
  }
  .loading_text {
    line-height: 28px;
    font-size: 12px;
    color: gray;
  }
}
</style>

