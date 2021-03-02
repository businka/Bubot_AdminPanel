import Vue from 'vue'
import VueRouter from 'vue-router'
import {coreRoutes} from '../BubotCore/router/index'

Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.concat(coreRoutes)
})

// router.beforeEach((to, from, next) => {
//   const whiteList = ['/login']
//   // if (to.query.mode){
//   //   Cookies.set('mode', to.query.mode)
//   // }
//   redirectToAuth(to, from, next, whiteList)
//   // console.log('router.beforeEach ', to.path)
// })

export default router
