
import store from '@/store'

const _super = Array.prototype
const routeHistory = {
    length: 0,
    push(route) {
        let hasLogin = store.getters['authenticator/authenticated']
        _super.push.call(this, route)
        if (hasLogin) {
            this._removeLoginRouteIfNeed()
        }
    },
    get(idx) {
        if (idx < 0) {
            return this[this.length + idx]
        }
        return this[idx]
    },
    back(idx) {
        return this.splice(this.length - idx, idx)
    },
    remove(idx) {
        return this.splice(idx, 1)
    },
    _removeLoginRouteIfNeed() {
        let i = this.length - 1
        while (i >= 0) {
            let route = this[i]
            if (route.name === 'login') {
                this.splice(i, 1)
            }
            i--
        }
    }
}

Object.setPrototypeOf(routeHistory, _super)

Object.defineProperty(routeHistory, 'currentRoute', {
    get() {
        return this[this.length - 1]
    }
})

Object.defineProperty(routeHistory, 'lastRoute', {
    get() {
        return this[this.length - 2]
    }
})

export default routeHistory
