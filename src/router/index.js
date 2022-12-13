import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout';
import store from "../store";
import {subAppRouter} from '@/config';

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: {
      notRequireAuth: true,
    },
  },
  {
    path: `/${subAppRouter}/*`,
    component: Layout,
    meta: {
      title: 'app'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/errorPage/404.vue'),
    meta: {
      notRequireAuth: true
    }
  },
  {
    path: '/*',
    redirect: '404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  // todo: 504需要加入
  if (to.meta.notRequireAuth) {
    next();
  }else {
    // 确认是否已登录
    const userInfo = store.getters.userInfo;
    //1.未登录
    if (!userInfo || !userInfo.userName) {
      return router.replace({
        path: "/login",
      });
    }else {
      next();
    }
  }
})
export default router
