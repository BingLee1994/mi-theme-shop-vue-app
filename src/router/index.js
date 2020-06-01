import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../routes/index'
import authenticateRoute from './authenticate'
import routeHistory from './route-history'
import handleTransition from './transition'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach(function(to, from, next) {
  let targetRoute = authenticateRoute(to, from, next)
  handleTransition(targetRoute, from, next, router)
})

router.afterEach(to => {
  routeHistory.push({
    fullPath: to.fullPath,
    name: to.name
  })
})

/* let superGo = router.go
let superPush = router.push

router.go = function() {
  let step = arguments[0]
  router.isBacking = step < 0
  if (step < 0) {
    console.log('backing')
    console.log(routeHistory)
  }
  return superGo.call(router, ...arguments)
}

router.push = function(to, from) {
  router.isBacking = false
  return superPush.call(router, ...arguments)
} */

router.routeHistory = routeHistory

export default router
