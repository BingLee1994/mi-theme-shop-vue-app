module.exports = {
    routeName: '/data/trend',
    method: 'get',
    handler(ctx) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    topList: [
                        {
                            title: '程序员Fighting',
                            imgUrl: 'http://t5.market.mi-img.com/thumbnail/jpeg/w118/ThemeMarket/0a39485521d6a481639606898fa0d84c62e884173'
                        },
                        {
                            title: 'Android Q暗色省电',
                            imgUrl: 'http://t4.market.xiaomi.com/thumbnail/jpeg/w242/ThemeMarket/05b7a548420c5435001a7ea49d08caf1f5127d368'
                        },
                        {
                            title: '超炫IOS',
                            imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w118/ThemeMarket/022f6b53e54264ef716c9f8fcc770a605de63c533'
                        }
                    ],
                    newList: [
                        {
                            title: '浮世绘 海蓝时见鲸',
                            imgUrl: 'http://t5.market.xiaomi.com/thumbnail/jpeg/w118/ThemeMarket/0363e54ab1264709c5a7782ebdf5be6959c43dfb4'
                        },
                        {
                            title: '简白',
                            imgUrl: 'http://t1.market.xiaomi.com/thumbnail/jpeg/w118/ThemeMarket/06fceb4d3fb174cf70c38eacd4270b02e177f10e0'
                        },
                        {
                            title: '深蓝谷',
                            imgUrl: 'http://t5.market.xiaomi.com/thumbnail/jpeg/w118/ThemeMarket/0bc8750ad0e88049c8218d9bb719f9edca542aae3'
                        }
                    ]
                })
            }, 200)
        })
    }
}
