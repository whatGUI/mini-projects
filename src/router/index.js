import Vue from 'vue'
import VueRouter from 'vue-router'
import pages from './importPages.js'

Vue.use(VueRouter)


const Home = () => import('@/views/home/Home.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

routes.push(...pages)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'Home' && savedPosition) {
      return savedPosition
    }
    else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
