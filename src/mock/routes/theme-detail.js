let { pickRandomItem, random } = require('../utils')

module.exports = {
    routeName: '/item/detail',
    method: 'get',
    handler(ctx) {
        let { type, id } = ctx.query
        let response = {}
        if (type === 'wallpaper') {
            let imgDirs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            let imgFile = pickRandomItem(imgDirs, random(3) || 1)
            response = {
                id,
                title: '壁纸',
                previewImgs: imgFile.map(img => require('../../assets/img/wallpaper/' + img + '.jpg'))
            }
        } else {
            let mock = {
                font: require('../mock-data/item-details/font.json'),
                default: require('../mock-data/item-details/theme.json')
            }
            let mockData = mock[type] || mock.default
            response = pickRandomItem(mockData, 1)[0]
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response)
            }, 500)
        })
    }
}
