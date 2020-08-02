let { readFileAsJSON, pickRandomItem } = require('../utils')
const path = require('path')

module.exports = {
    routeName: '/theme-list',
    method: 'get',
    handler(ctx) {
        let { type } = ctx.request.query
        let mock = {
            font: readFileAsJSON(path.resolve(__dirname, '../mock-data/items/font/items.json')),
            ringtone: readFileAsJSON(path.resolve(__dirname, '../mock-data/items/ringtone/items.json')),
            default: readFileAsJSON(path.resolve(__dirname, '../mock-data/search/result.json'))
        }
        let response = mock[type] || mock.default
        response = pickRandomItem(response, 15)

        ctx.body = response
    }
}
