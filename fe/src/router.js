import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

Vue.config.productionTip = false
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath
Vue.prototype.$axios = axios

const pageCheck = (to, from, next) => {
  // return next()
  console.log(apiRootPath)
  axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { authorization: localStorage.getItem('token') } })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      // console.error(e.message)
      next(`/block/${e.message}`)
    })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'lv0',
      component: () => import('./views/lv0'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv1',
      name: 'lv1',
      component: () => import('./views/lv1'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv2',
      name: 'lv2',
      component: () => import('./views/lv2'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv3',
      name: 'lv3',
      component: () => import('./views/lv3'),
      beforeEnter: pageCheck
    },
    {
      path: '/user',
      name: '사용자',
      component: () => import('./views/user')
    },
    {
      path: '/page',
      name: '페이지',
      component: () => import('./views/page')
    },
    {
      path: '/block/:msg',
      name: '차단',
      component: () => import('./views/block')
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import('./views/sign')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404')
    }
  ]
})
