<template>
<div class="header">
        <div class="nav">
        <a href="/" target="_self">
          <img class="logo" :src="'./static/images/logo.png'" alt />
        </a>
        <div class="userlogin">
          登录 | 注册
          <img class="loginlogo" :src="'./static/images/login.png'" alt />
        </div>
      </div>
</div>
  
</template>
<style lang="scss" scoped>
.header{
     background: #181818;
     position: fixed;
     left: 0;
     top: 0;
     right: 0;
     z-index: 5000;

    .nav {
      height: 169px;
      width: 1452px;
      margin: 0 auto;
      background: url("../../../../static/images/lang.png") no-repeat 690px top /
        607px 251px;
      .logo {
        margin-top: 54px;
        width: 553px;
        height: 80px;
      }
      .userlogin {
        float: right;
        width: 230px;
        height: 50px;
        background: rgba(70, 70, 70, 1);
        text-align: center;
        line-height: 50px;
        font-size: 22px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
        .loginlogo {
          width: 20px;
          height: 20px;
          margin-left: 10px;
        }
      }
    }
}
  
</style>