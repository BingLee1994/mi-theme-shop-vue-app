module.exports = {
    routeName: '/swiper',
    method: 'get',
    handler(ctx) {
        let { type } = ctx.query
        let mock = []
        for (let i = 1; i <= 4; i++) {
            let img = require('../../assets/img/sliders/' + type + '/s' + i + '.jpg')
            if (type === 'theme') {
                let item = {
                    imgUrl: img
                }
                if (i === 1) {
                    item.type = 'category'
                    item.keyWord = '米粉推荐'
                    item.filter = 'theme'
                }
                if (i === 2) {
                    item.type = 'category'
                    item.keyWord = '吾皇万岁'
                    item.filter = 'theme'
                }
                if (i === 3) {
                    item.type = 'theme'
                    item.id = '#####'
                }
                if (i === 4) {
                    item.type = 'external'
                    item.url = 'https://www.baidu.com/link?url=DlbumkNxxBt0E3K7010p0PLmB0AtzWiQT4HFKGNWGgQ8VEUQdpxBpC_pCydrHadS&ck=3753.1.151.256.182.261.178.220&shh=www.baidu.com&sht=02003390_43_hao_pg&wd=&eqid=e65fdb25000029d3000000035f280abb'
                }
                mock.push(item)
            } else {
                mock.push(img)
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mock)
            }, 500)
        })
    }
}
