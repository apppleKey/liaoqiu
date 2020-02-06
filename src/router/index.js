import {
  getStore,
  setStore,
  appInterface
} from "@/assets/js/utils.js";

import store from '@/store/index.js'
const newVue = new Vue()
const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: "/h5",
      name: "app",
      component: resolve => require(['@/views/H5/index.vue'], resolve),
      meta: {
        needLogin: false
      },
      children:[ {
        path: "search",
        name: "h5-search",
        component: resolve => require(['@/views/H5/search/search.vue'], resolve),
        meta: {
          needLogin: false
        }
    }]},
    {
      path: "/PC",
      name: "PC",
      component: resolve => require(['@/views/PC/index.vue'], resolve),
      meta: {
        needLogin: false
      },
      children: [{
          path: "index",
          name: "home",
          component: resolve => require(['@/views/PC/home.vue'], resolve),
          meta: {
            needLogin: false,
            needHeaderFooter: false
          }
        }
      ]
    },
    {
      path: "*",
      name: "notfound",
      component: resolve => require(['@/views/notFound.vue'], resolve),
      meta: {
        needLogin: false
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    const token = store.state.userinfo.token || '';

    // console.log(store);
    if (!token) {
      store.dispatch('freshToken').then((res) => {
        // console.log(store.state.userData.uid, store.state.userData.token);
        // newVue.$toast('登录成功')
        next();
      }).catch(err => {
        console.log('router', err);
        setStore('lastpage', to.path);
        newVue.$toast('请先登录')
        // next();
      })
    } else {
      next();
    }
  } else {
    next();
  }

});
export default router
