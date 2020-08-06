import { assert } from './index'
import stu from './storage'

const hasProp = Object.hasOwnProperty
const cacheKeyPrefix = '_mi_cache_'

const onCacheChangeHandler = {
    set(cacheObj, cacheName, cacheOption) {
        cacheObj[cacheName] = cacheOption
        stu.set(cacheKeyPrefix + cacheName, cacheOption)
        return true
    },
    deleteProperty(_, cacheName, value) {
        stu.remove(cacheKeyPrefix + cacheName, value)
    }
}

let caches = {}
stu.each((key, val) => {
    if (key.startsWith(cacheKeyPrefix)) {
        key = key.replace(cacheKeyPrefix, '')
        caches[key] = JSON.parse(val)
    }
})

caches = new Proxy(caches, onCacheChangeHandler)

const cacheUtil = {
    add(cacheName, value, expiredTime) {
        assert(value, 'The cache value is required.')
        assert(value, 'The cache expire time is required.')
        caches[cacheName] = {
            value,
            lasUpdated: Date.now(),
            expiredIn: expiredTime
        }
    },

    update(cacheName, value, expiredTime) {
        if (!cacheUtil.has(cacheName)) {
            return cacheUtil.add(...arguments)
        }
        let newCache = caches[cacheName]
        Object.assign(newCache, {
            value,
            lasUpdated: Date.now()
        })
        if (expiredTime) {
            newCache.expiredIn = expiredTime
        }
        caches[cacheName] = newCache
    },

    remove(cacheName) {
        delete caches[cacheName]
    },

    has(cacheName) {
        return hasProp.call(caches, cacheName)
    },

    get(cacheName) {
        if (!cacheUtil.has(cacheName)) {
            return
        }
        let { lasUpdated, expiredIn, value } = caches[cacheName]
        if (Date.now() - lasUpdated <= expiredIn) {
            return value
        }
    },

    isExpired(cacheName) {
        if (!cacheUtil.has(cacheName)) {
            return true
        }
        let { lasUpdated, expiredIn } = caches[cacheName]
        return Date.now() - lasUpdated >= expiredIn
    }
}

export default cacheUtil
