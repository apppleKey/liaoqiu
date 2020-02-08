<template>
  <div class="footer">
    <div class="banxin copyright">
      Copyright ©2020 liaoqiu8.com
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.footer {
  height: ptr(200);
  overflow: hidden;
  background: rgba(24, 24, 24, 1);
  .copyright {
    color: #919191;
    font-size: ptr(32);
    font-family: Lantinghei SC;
    font-weight: bold;
    color: rgba(145, 145, 145, 1);
    line-height:ptr(200);
    text-align: center;
  }
}
</style>