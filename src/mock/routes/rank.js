module.exports = {
    routeName: '/data/rank',
    method: 'get',
    handler(ctx) {
        let type = ctx.request.type || 'theme'
        let mock = {
            theme: {
                top1: {
                    title: '程序员Fighting',
                    imgUrl: 'http://t5.market.mi-img.com/thumbnail/jpeg/w118/ThemeMarket/0a39485521d6a481639606898fa0d84c62e884173'
                },
                top2: {
                    title: 'Android Q暗色省电',
                    imgUrl: 'http://t4.market.xiaomi.com/thumbnail/jpeg/w242/ThemeMarket/05b7a548420c5435001a7ea49d08caf1f5127d368'
                },
                top3: {
                    title: '超炫IOS',
                    imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w118/ThemeMarket/022f6b53e54264ef716c9f8fcc770a605de63c533'
                },
                rankList: [
                    {
                        title: '浮世绘 海蓝时见鲸',
                        imgUrl: 'http://t2.market.xiaomi.com/thumbnail/jpeg/w118/ThemeMarket/0b7f0c488fd134de117eb48f5866b192e7b8dd7e9'
                    },
                    {
                        title: '简白',
                        imgUrl: 'http://t4.market.xiaomi.com/thumbnail/jpeg/w118/ThemeMarket/0ed7fe52cf2d1405d29218af13fb7da599295103e'
                    },
                    {
                        title: '深蓝谷',
                        imgUrl: 'http://t4.market.mi-img.com/thumbnail/jpeg/w118/ThemeMarket/0463649c892318851b685d65bc97458f1e341dc55'
                    }
                ]
            },
            font: {
                top1: {
                    imgUrl: 'http://t2.market.mi-img.com/thumbnail/png/w250/ThemeMarket/04f4b48130f08b1242a2d47f5085bdf082443eb87'
                },
                top2: {
                    imgUrl: 'http://t3.market.xiaomi.com/thumbnail/png/w250/ThemeMarket/0517aa4ff7960423a3d8300bb1ff85087822c5176'
                },
                top3: {
                    imgUrl: 'http://t4.market.xiaomi.com/thumbnail/png/w250/ThemeMarket/06109645536224fd70102a1df4a6c730f76d96070'
                },
                rankList: [
                    {
                        imgUrl: 'http://t5.market.mi-img.com/thumbnail/png/w250/ThemeMarket/04109645536324fde010281df4a6c73ff76d66070'
                    },
                    {
                        imgUrl: 'http://t3.market.xiaomi.com/thumbnail/png/w250/ThemeMarket/0617aa5ff7950423e3d83c0bb19f850f782225176'
                    },
                    {
                        imgUrl: 'http://t5.market.xiaomi.com/thumbnail/png/w250/ThemeMarket/0717aa5ff796042383d8360bb15f850a7822d5176'
                    }
                ]
            },
            ringtone: {
                top1: {
                    title: '曾经最美'
                },
                top2: {
                    title: '回忆总想哭'
                },
                top3: {
                    title: '炸山姑娘(抖音版)'
                },
                rankList: [
                    {
                        title: 'Are you OK'
                    },
                    {
                        title: '用心爱你你不懂(完整版)'
                    },
                    {
                        title: '发了疯的想拼了命的忘'
                    }
                ]
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let res = mock[type]
                res.rankList = res.rankList.map(a => {
                    a.id = parseInt(Math.random() * 10000)
                    a.type = type
                    return a
                })
                resolve(res)
            }, 200)
        })
    }
}
