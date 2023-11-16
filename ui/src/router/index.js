import {createRouter, createWebHistory} from 'vue-router'
import coreRoutes from "@/BubotCore/router"
import AppConst from "@/AppConst"

const routes = [
  ...coreRoutes,
  {
    path: '/scene',
    component: () => import('../components/Scene/Switch')
  },
]
const publicPath = `/${AppConst.appName}/ui/`
const router = createRouter({
  history: createWebHistory(publicPath),
  routes,
})

export default router
