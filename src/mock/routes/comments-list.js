let { pickRandomItem } = require('../utils')

module.exports = {
    routeName: '/comments/list',
    method: 'get',
    handler() {
        let mock = require('../mock-data/comments/data.json')

        let response = pickRandomItem(mock, 1)[0]
        response.comments = response.comments.sort((p, n) => n.date - p.date)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response)
            }, 500)
        })
    }
}
