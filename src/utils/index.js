function random(len) {
    return Math.floor(Math.random() * len + 1)
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

export { random, pickRandomItem }
