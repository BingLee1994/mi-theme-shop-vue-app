module.exports = {
    routeName: '/data/style',
    method: 'get',
    handler(ctx) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    styles: [
                        {
                            text: '中国风',
                            imgUrl: 
                        },
                        {
                            text: '小清新'
                        },
                        {
                            text: '萌萌哒'
                        }
                    ],
                    features: [
                        {
                            text: '炫酷锁屏'
                        },
                        {
                            text: '百变壁纸'
                        },
                        {
                            text: '彩虹电池'
                        }
                    ]
                })
            }, 200)
        })
    }
}
