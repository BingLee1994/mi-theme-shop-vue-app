module.exports = {
    routeName: '/swiper',
    method: 'get',
    handler(ctx) {
        let { type } = ctx.query
        let mock = []
        for (let i = 1; i <= 4; i++) {
            mock.push(require('../../assets/img/sliders/' + type + '/s' + i + '.jpg'))
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mock)
            }, 500)
        })
    }
}
