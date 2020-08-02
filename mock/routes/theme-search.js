const routeName = '/search/index'
const methodName = 'get'
const path = require('path')
let { readFileAsJSON, pickRandomItem } = require('../utils')

module.exports = {
    install(router) {
        router[methodName](routeName, ctx => {
            let { category } = ctx.query
            let recMock = readFileAsJSON(path.resolve(__dirname, '../mock-data/search/recommend.json'))[category]
            let advMock = readFileAsJSON(path.resolve(__dirname, '../mock-data/search/adv.json'))[category]
            let styMock = readFileAsJSON(path.resolve(__dirname, '../mock-data/search/style.json'))[category]

            ctx.body = {
                recommendations: pickRandomItem(recMock, 10),
                adviertisements: pickRandomItem(advMock, 2),
                styles: pickRandomItem(styMock, 4)
            }
        })
    }
}
