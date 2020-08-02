const fs = require('fs')

module.exports = function mountRoute(router) {
    let allRouteFiles = fs.readdirSync(__dirname)

    allRouteFiles.forEach(eachFile => {
        if (!__filename.endsWith(`/${eachFile}`)) {
            let routeModule = require(`./${eachFile}`)
            let { install, method, routeName, handler } = routeModule

            if (typeof install === 'function') {
                return install.call(routeModule, router)
            }
            if (method && routeName && handler) {
                return router[method](routeName, handler)
            }
        }
    })
}
