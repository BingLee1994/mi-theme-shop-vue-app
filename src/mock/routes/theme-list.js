import { pickRandomItem } from '../utils'

export default {
    routeName: '/theme-list',
    method: 'get',
    handler(ctx) {
        let { type } = ctx.query
        let mock = {
            font: require('../mock-data/items/font/items.json'),
            ringtone: require('../mock-data/items/ringtone/items.json'),
            default: require('../mock-data/search/result.json')
        }
        let response = mock[type] || mock.default
        response = pickRandomItem(response, 1)

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response.map(r => {
                    r.id = parseInt(Math.random * 10000)
                    return r
                }))
            }, 500)
        })
    }
}
