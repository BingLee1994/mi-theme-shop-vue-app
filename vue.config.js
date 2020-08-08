const path = require('path')
const resolve = p => path.join(__dirname, p)

module.exports = {
    chainWebpack: config => {
        config.output
            .filename('[name][hash:6].js')

        config
            .module
            .rule('images')
            .use('url-loader')
                .loader('url-loader')
                .tap(options => Object.assign(options, { limit: 2 }))
        config.devtool('cheap-eval-source-map')
            .resolve
            .alias
            .set('@', resolve('src'))
            .set('@miui', resolve('src/components/miui'))
            .set('@views', resolve('src/views'))
            .set('@style', resolve('src/style'))
            .set('@assets', resolve('src/assets'))
            .set('~@miui/component-style', resolve('src/style/miui/components'))

            config.plugin('define')
            .tap(args => {
                args[0] = {
                    ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
                    VERSION: JSON.stringify(process.env.APP_VERSION)
                }
                return args
            })
    },
    pages: {
        index: {
            entry: 'src/main.js', // page 的入口
            template: 'public/index.html', // 模板来源
            filename: 'index.html', // 在 dist/index.html 的输出
            title: 'MEUI主题商店' // 当使用 title 选项时，标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            // chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
        }
    },
    css: {
        loaderOptions: {
            sass: {
                // 新版叫prependData
                data: `
                    @import "~@/style/miui/vars.scss";
                    @import "~@/style/miui/mixin.scss";
                `
            }
        }
    }
}
