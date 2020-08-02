const Koa = require('koa')
const KoaRouter = require('koa-router')
const BodyParser = require('koa-bodyparser')
const logger = require('./middlewares/logger')
const allowCORS = require('./middlewares/allow-cors')
const Static = require('koa-static')
let mountRoute = require('./routes/install')
const path = require('path')
const serverConfig = require('./config.json')

const App = new Koa()

let staticImage = Static(
    path.join(__dirname, './mock-data/images/'),
    {
        maxage: 60
    }
)

const router = new KoaRouter()
mountRoute(router)

App.use(staticImage)
App.use(logger)
App.use(allowCORS)
App.use(BodyParser())
App.use(router.routes())

App.listen(serverConfig.port, () => {
    console.log(`Server is running at http://localhost:${serverConfig.port}`)
})
