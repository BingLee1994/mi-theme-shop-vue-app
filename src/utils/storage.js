const util = {
    get(key, defaultVal) {
        let val = localStorage.getItem(key)
        return val === null ? defaultVal : JSON.parse(val)
    },
    set(key, val) {
        if (key && typeof key === 'object') {
            for (let name in key) {
                util.set(name, key[name])
            }
            return
        }
        if (arguments.length !== 2) return
        val = JSON.stringify(val)
        localStorage.setItem(key, val)
    },
    remove(key) {
        localStorage.removeItem(key)
    },
    empty() {
        localStorage.clear()
    },
    each(cb) {
        var len = localStorage.length
        for (let i = 0; i < len; i++) {
            let key = localStorage.key(i)
            let val = localStorage.getItem(key)
            typeof cb === 'function' && cb(key, val)
        }
    },
    list() {
        var keys = []
        util.each(key => keys.push(key))
        return keys
    }
}

window.stu = util

export default util
