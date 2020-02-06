// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill" ; //es6语法
import 'proto-polyfill'  ; //Ie的__proto__不支持报错
// import Vue from 'vue'
import App from './App.vue';
  
import router from '@/router/index';

// import store from './store'
// import conf from "@/assets/js/conf.js";

// import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
// import 'swiper/dist/css/swiper.css'

// Vue.use(VueAwesomeSwiper, /* { default global options } */)

// import ElementUI from 'element-ui';

// import 'element-ui/lib/theme-chalk/index.css';
// import './element-variables.scss';
// import "./assets/main.css"
// import "./assets/nomalize.css"
import "./assets/css/common.scss";
// import "./assets/font/style.css"
// Vue.prototype.$axios = axios;

// import {cookie} from "@/assets/js/utils.js"
// window.cookie=cookie;
// Vue.prototype.$cookie=cookie;
import store from './store/index.js';
import http from "./assets/js/httpRequest.js";
Vue.prototype.$http = http;

// import bus from "@/components/bus.js"
// Vue.prototype.$bus=bus;
// import 'swiper/dist/css/swiper.css';

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import VueLazyload from "vue-lazyload";

//图片预览插件
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
// VueLazyload
import Vue from 'vue';;
// import { Button, Cell ,Lazyload} from 'mint-ui'
import MintUI from 'mint-ui';
// import App from './App.vue'
Vue.use(MintUI)

// Vue.component(Button.name, Button)
// Vue.component(Cell.name, Cell)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './static/imgs/ddefault.jpg',//这个是请求失败后显示的图片
  loading: './static/imgs/loading.gif',//这个是加载的loading过渡效果
  try: 1 // 这个是加载图片数量
})

Vue.config.productionTip = false;

// if(appInterface.isDebug||1){
//   var debuger=document.createElement('script');
//   debuger.src='./static/vconsole.min.js';
//   debuger.onload=function(){
//     var vConsole = new VConsole();
//   }
//   document.body.append(debuger);
// }

// Vue.use(ElementUI,{size: 'small', zIndex: 3000});

// 金额控制输入框
// import amount from "@/directives/amount.js"
// Vue.directive('amount',amount)



// 银行卡格式化
// Vue.filter("bankCardNo", function (str = '') {
//   if (str == null) {
//     str = ""
//   }
//   return str.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
// });

new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: {
    App
  }
});
