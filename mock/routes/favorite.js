let { readFileAsJSON, pickRandomItem } = require('../utils')
const path = require('path')

module.exports = {
    routeName: '/favorite',
    method: 'post',
    handler(ctx) {
        let { type } = ctx.request.body
        let mock = []
        if (type === 'font') {
            mock = readFileAsJSON(path.resolve(__dirname, '../mock-data/items/font/items.json'))
        } else if (type === 'ringtone') {
            mock = readFileAsJSON(path.resolve(__dirname, '../mock-data/items/ringtone/items.json'))
        } else {
            mock = readFileAsJSON(path.resolve(__dirname, '../mock-data/search/result.json'))
        }
        mock = pickRandomItem(mock, 15)
        ctx.body = mock
    }
}
