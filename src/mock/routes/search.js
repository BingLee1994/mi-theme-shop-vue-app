const { pickRandomItem } = require('../utils')

module.exports = {
    routeName: '/search',
    method: 'post',
    handler(ctx) {
        let type = ctx.query.type || 'theme'
        let results = {
            theme: pickRandomItem(require('../mock-data/search/result.json'), 12),
            font: pickRandomItem(require('../mock-data/items/font/items.json'), 12),
            ringtone: pickRandomItem(require('../mock-data/items/ringtone/items.json'), 12)
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(results[type] || [])
            })
        })
    }
}
