let { readFileAsJSON, pickRandomItem } = require('../utils')
const path = require('path')

module.exports = {
    routeName: '/comments/list',
    method: 'get',
    handler(ctx) {
        let mock = readFileAsJSON(path.resolve(__dirname, '../mock-data/comments/data.json'))

        let response = pickRandomItem(mock, 1)[0]
        response.comments = response.comments.sort((p, n) => n.date - p.date)
        ctx.body = response
    }
}
