import staticJsonRoute from './routes/static-json-route'
import allRoutes from './routes/install'

const router = {
    routes: {},
    handle(path, args) {
        let options = {
            method: args.method,
            path,
            query: args.params || {},
            request: args
        }

        if (!path.startsWith('/')) {
            path = '/' + path
        }

        console.log('api is: ', ...arguments)

        if (this.routes[path]) {
            return this.routes[path].call(path, options)
        }

        return Promise.reject(new Error('api not found'))
    }
}

staticJsonRoute(router)
allRoutes(router)

export default function(api) {
    if (!api) {
        return
    }
    api.get = function(path, args) {
        args.method = 'get'
        return router.handle(path, args)
    }
    api.post = function(path, args = {}) {
        args.method = 'post'
        return router.handle(path, args)
    }
}
