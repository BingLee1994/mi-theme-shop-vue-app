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
    }
}

window.stu = util

export default util
