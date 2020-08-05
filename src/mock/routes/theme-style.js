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
                            imgUrl: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3526437225,234417928&fm=26&gp=0.jpg'
                        },
                        {
                            text: '小清新',
                            imgUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3332150105,91398645&fm=26&gp=0.jpg'
                        },
                        {
                            text: '萌萌哒',
                            imgUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2092472179,4028442751&fm=26&gp=0.jpg'
                        }
                    ],
                    features: [
                        {
                            text: '炫酷锁屏',
                            imgUrl: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2904759560,812468500&fm=26&gp=0.jpg'
                        },
                        {
                            text: '百变壁纸',
                            imgUrl: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3920614899,2455797870&fm=26&gp=0.jpg'
                        },
                        {
                            text: '彩虹电池',
                            imgUrl: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1066621466,3788683652&fm=26&gp=0.jpg'
                        }
                    ]
                })
            }, 200)
        })
    }
}
