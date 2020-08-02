const { pickRandomItem } = require('../utils')

module.exports = {
    routeName: '/search/index',
    method: 'get',
    handler(ctx) {
        let { category } = ctx.query
        let recMock = require('../mock-data/search/recommend.json')[category]
        let advMock = require('../mock-data/search/adv.json')[category]
        let styMock = require('../mock-data/search/style.json')[category]

        let response = {
            recommendations: pickRandomItem(recMock, 10),
            adviertisements: pickRandomItem(advMock, 2),
            styles: pickRandomItem(styMock, 4)
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response)
            }, 500)
        })
    }
}
