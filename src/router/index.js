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
          needLogin: true
        }
      },{
        path: "topic/NBA",
        name: "h5-topic-NBA",
        component: resolve => require(['@/views/H5/topic/NBA.vue'], resolve),
        meta: {
          needLogin: false
        }
      },  {
        path: "topic/shuangxiong",
        name: "h5-topic-shuangxiong",
        component: resolve => require(['@/views/H5/topic/shuangxiong.vue'], resolve),
        meta: {
          title: '王者+乐动强强联手送好礼',
          needLogin: false
        }
      },{
        path: "live",
        name: "h5-live",
        component: resolve => require(['@/views/H5/live/liveIndex.vue'], resolve),
        meta: {
          title: '直播列表',
          needLogin: false
        }
      },{
        path: "live/:id",
        name: "h5-live-play",
        component: resolve => require(['@/views/H5/live/livePlay.vue'], resolve),
        meta: {
          title: '直播列表',
          needLogin: false
        }
      },{
        path: "liveAnim/:id",
        name: "h5-live-anim",
        component: resolve => require(['@/views/H5/live/liveAnim.vue'], resolve),
        meta: {
          title: '直播列表',
          needLogin: false
        }
      },]
    },
    {
      path: "/debug",
      name: "debug",
      component: resolve => require(['@/views/H5/debug.vue'], resolve),
      meta: {
        needLogin: false
      }
    },
    {
      path: "/PC",
      name: "PC",
      component: resolve => require(['@/views/PC/index.vue'], resolve),
      meta: {
        needLogin: false
      },
      children: [{
          path: "todayTopic/:id",
          name: "topicDetails",
          component: resolve => require(['@/views/PC/todayTopic/topicDetails.vue'], resolve),
          meta: {
            needLogin: false,
            needHeaderFooter: true
          }
        }, {
          path: "todayTopic",
          name: "todayTopic",
          component: resolve => require(['@/views/PC/todayTopic/topicIndex.vue'], resolve),
          meta: {
            needLogin: false,
            needHeaderFooter: true
          }
        }, {
          path: "live",
          name: "pcLive",
          component: resolve => require(['@/views/PC/live/liveIndex.vue'], resolve),
          meta: {
            needLogin: false,
            needHeaderFooter: true,
            headerTag: 'live' //php顶部选中
          }
        },
        {
          path: "live/:id",
          name: "pcLivePlay",
          component: resolve => require(['@/views/PC/live/livePlay.vue'], resolve),
          meta: {
            needLogin: false,
            needHeaderFooter: true,
            headerTag: 'live'
          }
        },
        {
          path: "live/animate/:id",
          name: "pcLiveAnimatePlay",
          component: resolve => require(['@/views/PC/live/animateplay.vue'], resolve),
          meta: {
            needLogin: false,
            needHeaderFooter: true,
            headerTag: 'live'
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
