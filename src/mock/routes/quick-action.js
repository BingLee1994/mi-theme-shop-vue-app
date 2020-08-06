module.exports = {
    routeName: '/quick-action/recommend',
    method: 'post',
    handler(ctx) {
        let category = ctx.query.category || 'theme'
        let results = {
            theme: require('../mock-data/quick-action/theme/items.json'),
            font: require('../mock-data/quick-action/font/items.json'),
            ringtone: require('../mock-data/quick-action/ringtone/items.json')
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(results[category] || [])
            })
        })
    }
}
