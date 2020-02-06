
<template>
  <div>
    <h3>DEBUG</h3>
    <mt-field label="开启DEBUG调试工具" class="form-item">
      <mt-switch v-model="isDebug"></mt-switch>
    </mt-field>
    <mt-field label="开启用户mock" class="form-item">
      <mt-switch v-model="isMock"></mt-switch>
    </mt-field>
    <!-- <mt-field label="开启token Mock"   class="form-item" ><mt-switch v-model="isMock"></mt-switch></mt-field>  -->
    <mt-field label="TOKEN" class="form-item" placeholder="请输入token" v-model="token"></mt-field>
    <mt-field label="用户ID" class="form-item" v-model="uid" placeholder="请输入uid"></mt-field>
    <mt-field label="token Mock" class="form-item">
      <mt-button type="primary" @click="recover" size="small">恢复默认</mt-button>
    </mt-field>

    <div class="opt">
      <mt-button size="small" type="default" @click="submit" style="margin-right:2rem">确 定</mt-button>
      <mt-button size="small" type="danger" @click="$router.go(-1)">返 回</mt-button>
    </div>
  </div>
</template>

<script>
import { getStore, setStore, Keys } from "@/assets/js/utils.js";

export default {
  data() {
    return {
      resData: {
        list: []
      },
      page: 1,
      isDebug: getStore(Keys.isDebug) ? true : false,

      uid: getStore(Keys.uid),
      token: getStore(Keys.token),
      isMock: getStore(Keys.isMock) ? true : false
    };
  },
  computed: {},
  created() {
    //   console.log(getStore('isDebug'),this.isDebug);
    (function(doc, win) {
      var docEl = doc.documentElement;
      var resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize";
      function recalc() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= 750) {
          docEl.style.fontSize = "100px";
        } else {
          docEl.style.fontSize = clientWidth / 37.5 + "px";
        }
      }
      recalc();
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc, false);
    })(document, window);
  },
  methods: {
    relogin() {
      this.$router.push(getStore("lastpage") || "/");
    },
    recover() {
      this.uid = "25635";
      this.token = "ff575e31108a16c14d4c8c3805e7117b";
    },
    submit() {
      setStore(Keys.isDebug, this.isDebug ? 1 : "");
      setStore(Keys.isMock, this.isMock ? 1 : "");
      setStore(Keys.uid, this.uid);
      setStore(Keys.token, this.token);
      this.$toast("保存成功");
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }
};
</script>

<style scoped>
h3 {
  text-align: center;
}
.form-item {
  /* border-bottom: 1px solid rgba(141, 141, 141, 0.267); */
}
.opt {
  margin-top: 200px;
  text-align: center;
}
</style>

