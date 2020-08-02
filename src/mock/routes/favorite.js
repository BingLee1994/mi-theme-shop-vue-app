let { pickRandomItem } = require('../utils')

module.exports = {
    routeName: '/favorite',
    method: 'post',
    handler(ctx) {
        let { type } = ctx.request
        let mock = []
        if (type === 'font') {
            mock = require('../mock-data/items/font/items.json')
        } else if (type === 'ringtone') {
            mock = require('../mock-data/items/ringtone/items.json')
        } else {
            mock = require('../mock-data/search/result.json')
        }
        mock = pickRandomItem(mock, 15)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mock)
            }, 500)
        })
    }
}
