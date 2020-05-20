import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes/index'
import authenticate from './authenticate'
import routeHistory from './route-history'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach(authenticate)
router.routeHistory = routeHistory

router.afterEach((to, from) => {
  let lastRouteName = from.name
  routeHistory.push({
    lastRouteName,
    name: to.name
  })
})

export default router
