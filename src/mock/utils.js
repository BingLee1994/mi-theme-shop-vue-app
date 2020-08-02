const fs = require('fs')

function random(len) {
    return Math.floor(Math.random() * len + 1)
}

function pickRandomItem(arr, len, cb) {
    let result = []
    arr = [...arr]
    if (arr.length === 1) {
        return [arr[0]]
    }
    if (len >= arr.length) {
        return arr
    }
    for (let i = 0; i < len; i++) {
        let length = arr.length
        let idx = random(length - 1)
        let item = arr[idx]
        arr.splice(idx, 1)
        cb && cb(item)
        result.push(item)
    }
    arr = null
    return result
}

function readFileAsJSON(path) {
    let data = fs.readFileSync(path).toString()
    return JSON.parse(data)
}

module.exports = {
    random,
    pickRandomItem,
    readFileAsJSON
}
