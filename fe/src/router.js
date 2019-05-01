import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: '사용자관리',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/user.vue')
    },
    {
      path: '/header',
      name: '헤더',
      component: () => import(/* webpackChunkName: "about" */ './views/header.vue')
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import(/* webpackChunkName: "about" */ './views/sign.vue')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404.vue')
    }
  ]
})
