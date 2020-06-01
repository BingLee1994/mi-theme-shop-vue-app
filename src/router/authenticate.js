import store from '@/store'
import Vue from 'vue'
import routeHistory from './route-history'

export default function beforeEach(to, from, next) {
    let { meta } = to
    let hasLogin = store.getters['authenticator/authenticated']
    let targetRoute = to
    if (meta.authenticate && to.name !== 'login' && !hasLogin) {
        store.commit('authenticator/setAttemptRoute', to)
        targetRoute = {
            name: 'login'
        }
        let { authenticateReason } = meta
        if (authenticateReason) {
            Vue.prototype.$toast.show(authenticateReason)
        }
    } else if (to.name === 'login' && hasLogin) {
        let lastRouteBeforeLogin = routeHistory.lastRoute || { name: 'home' }
        if (lastRouteBeforeLogin.name !== 'login') {
            targetRoute = lastRouteBeforeLogin
        }
    }
    if (targetRoute !== to) {
        next(targetRoute)
    } else {
        next()
    }
    return targetRoute
}
