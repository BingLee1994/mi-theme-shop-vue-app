let { readFileAsJSON, pickRandomItem, random } = require('../utils')
const path = require('path')
const fs = require('fs')
const imgFilePath = '../mock-data/images/thumbs'

module.exports = {
    routeName: '/item/detail',
    method: 'get',
    handler(ctx) {
        let { type, id } = ctx.request.query
        let response = {}
        if (type === 'wallpaper') {
            let imgDirs = fs.readdirSync(path.resolve(__dirname, imgFilePath, 'wallpaper'))
            let imgFile = pickRandomItem(imgDirs, random(3) || 1)
            response = {
                id,
                title: '壁纸',
                previewImgs: imgFile.map(img => ['http://localhost:4201', 'thumbs', 'wallpaper', img].join('/'))
            }
        } else {
            let mock = {
                font: readFileAsJSON(path.resolve(__dirname, '../mock-data/item-details/font.json')),
                default: readFileAsJSON(path.resolve(__dirname, '../mock-data/item-details/theme.json'))
            }
            let mockData = mock[type] || mock.default
            response = pickRandomItem(mockData, 1)[0]
        }

        ctx.body = response
    }
}
