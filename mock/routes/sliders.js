const path = require('path')
const serverConfig = require('../config.json')
const fs = require('fs')
const baseImgPath = '../mock-data/images/thumbs/sliders/'
const baseUrl = 'thumbs/sliders'

module.exports = {
    routeName: '/swiper',
    method: 'get',
    handler(ctx) {
        let { type } = ctx.request.query
        let mock = []
        if (!fs.existsSync(path.join(__dirname, baseImgPath + type))) {
            type = 'theme' // default
        }
        let imgFilaPath = path.join(__dirname, baseImgPath + type)

        mock = fs.readdirSync(imgFilaPath)
        mock = mock.map(eachFile => {
            return [`http://localhost:${serverConfig.port}`, baseUrl, type, eachFile].join('/')
        })
        ctx.body = mock
    }
}
