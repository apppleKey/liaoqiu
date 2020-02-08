<template>
<div class="header" id="header">
        <div class="nav">
        <a href="/" target="_self">
          <img class="logo" :src="'./static/images/h5/logo.png'" alt />
        </a>
        <div class="userlogin">
          登录 | 注册
        </div>
      </div>
</div>
  
</template>
<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.header{
     background: #181818;
     position: fixed;
     left: 0;
     top: 0;
     right: 0;
     z-index: 5000;
     padding: 0 ptr(27);


    .nav {
      height: ptr(121);
      width: 100%;
      margin: 0 auto;
   
      .logo {
        margin-top:ptr(30);
        width: ptr(213);
        height: ptr(60);
      }
      .userlogin {
        float: right;
        height: ptr(121);
        text-align: center;
        line-height: ptr(121);
        font-size:ptr(32);
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
       
      }
    }
}
  
</style>