import {
  getStore,
  setStore,
  appInterface,
  getAgent
} from "@/assets/js/utils.js";

import store from '@/store/index.js'
const newVue = new Vue()
const router = new VueRouter({
  // mode: 'history',
  routes: [{
      path: '/',
      redirect: '/PC/index'
    },
    {
      path: "/H5",
      name: "h5_index",
      component: resolve => require(['@/views/H5/index.vue'], resolve),
      meta: {
        needLogin: false
      },
      children: [{
        path: "index",
        name: "h5-home",
        component: resolve => require(['@/views/H5/home.vue'], resolve),
        meta: {
          needLogin: false,
          needHeaderFooter: true,
          keepAlive: true

        }

      }, , {
        path: "plan/:id",
        name: "h5_planDetails",
        component: resolve => require(['@/views/H5/plan/details.vue'], resolve),
        meta: {
          needLogin: false,
          needHeaderFooter: false
        }
      }, {
        path: "news/:id",
        name: "h5_newsDetails",
        component: resolve => require(['@/views/H5/news/details.vue'], resolve),
        meta: {
          needLogin: false,
          needHeaderFooter: false
        }
      }]
    },
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
          needHeaderFooter: true,
          keepAlive: true

        }
      }, {
        path: "news/:id",
        name: "newsDetails",
        component: resolve => require(['@/views/PC/news/details.vue'], resolve),
        meta: {
          needLogin: false,
          needHeaderFooter: true
        }
      }, , {
        path: "plan/:id",
        name: "planDetails",
        component: resolve => require(['@/views/PC/plan/details.vue'], resolve),
        meta: {
          needLogin: false,
          needHeaderFooter: true
        }
      }]
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
  if(getAgent()==='H5'&&/PC/.test(to.path)){
    return router.replace(to.path.replace('PC','H5'))
  }else if(getAgent()==='PC'&&/H5/.test(to.path)){
    return router.replace(to.path.replace('H5','PC'))
  }
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
