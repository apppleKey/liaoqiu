<template>
  <div class="header" id="header">
    <mt-button
      icon="back"
      @click.native="$router.go(-1)"
      size="small"
      style="border:none;color:white;background-color: transparent;box-shadow: none;"
    >返回</mt-button>
    <a href="/" class="logo" target="_self">
      <img :src="'./static/images/h5/logo.png'" alt />
    </a>
    <div class="userlogin">登录 | 注册</div>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.header {
  background: #181818;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 5001;
  padding: 0 ptr(27) 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ptr(121);

  .logo {
    width: ptr(213);
    height: ptr(60);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .userlogin {
    height: ptr(121);
    text-align: center;
    line-height: ptr(121);
    font-size: ptr(32);
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
}
</style>