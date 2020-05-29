import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'
import adminRouter from './admin'

Vue.use(VueRouter)



const router = new VueRouter({
  hash: 'history',
  // base: process.env.BASE_URL,
  base: 'miao',
  routes:[
    movieRouter,
    mineRouter,
    cinemaRouter,
    adminRouter,
    {
      path:'/*',
      redirect:'/movie',
    }
  ],
})

export default router
