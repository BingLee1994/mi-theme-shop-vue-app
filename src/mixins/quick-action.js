import stu from '@/utils/storage'
import server from '@/api'

const EXPIRED_AT = 10 * 60 * 1000

export default {
    methods: {
        async getQuickActionRecommend(category = 'theme') {
            let cache = this.__cacheFor(category)
            let isExpired = this.__isExpired(cache)
            if (isExpired) {
                try {
                    let data = await server.getQuickActionRecommend(category)
                    this.__storeCache(category, data)
                    cache = data
                } catch (e) {
                }
            }
            return cache || []
        },

        __isExpired(cache) {
            if (!cache) return true
            let lastUpdate = cache.lastUpdate || 0
            return Date.now() - lastUpdate >= EXPIRED_AT
        },

        __cacheFor(name) {
            let cache = stu.get(`auick_action_cache_${name}`, null)
            if (cache) {
                return cache.data
            }
            return null
        },

        __storeCache(name, data) {
            let cache = {
                lastUpdate: Date.now(),
                data
            }
            stu.set(`auick_action_cache_${name}`, cache)
        }
    }
}
