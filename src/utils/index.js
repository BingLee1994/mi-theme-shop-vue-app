function random(len) {
    return Math.floor(Math.random() * len + 1)
}

function parseTranslate(transform) {
    if (!transform || transform === 'none') {
        return {
            x: 0, y: 0
        }
    }
    let matrix = transform.split(',')
    return {
        x: parseFloat(matrix[4]),
        y: parseFloat(matrix[5])
    }
}

export function arrayRemove(arr, item) {
    let length = arr.length
    for (let i = length - 1; i >= 0; i--) {
        if (arr[i] === item) {
            return arr.splice(i, 1)
        }
    }
    return null
}

function pickRandomItem(arr, len, cb) {
    let result = []
    arr = arr.concat()
    for (let i = 0; i < len; i++) {
        let length = arr.length
        if (length === 1) {
            result.push(arr[0])
            break
        }
        let idx = random(length - 1)
        let item = arr[idx]
        arr.splice(idx, 1)
        cb && cb(item)
        result.push(item)
    }
    arr = null
    return result
}

export { random, pickRandomItem, parseTranslate }

export function debounce(cb, timeout) {
    let timerid = null
    return function() {
        clearTimeout(timerid)
        let args = arguments

        timerid = setTimeout(function() {
            if (typeof cb === 'function') {
                cb.apply(null, args)
            }
        }, timeout)
    }
}

export function dateMD(val, divider = '') {
    let date = new Date(Number(val))
    return `${date.getMonth()}月${divider}${date.getDate()}日`
}

export function isUndefined(val) {
    return typeof val === 'undefined'
}

export function assert(condition, msg) {
    if (!condition) {
        throw new Error(msg)
    }
}
