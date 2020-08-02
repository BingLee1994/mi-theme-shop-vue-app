const path = require('path')
let { pickRandomItem, readFileAsJSON } = require('../utils')

const mockDataMapping = {
    get: {
        '/search/theme': ['../mock-data/items/theme/all-theme.json', 15],
        '/search/recommend/theme': ['../mock-data/theme-search-recommend.json', 2],
        '/search': ['../mock-data/search/result.json', 12],
        '/item/recommand': ['../mock-data/items/theme/all-theme.json', 7]
    },
    post: {
        '/profile': '../mock-data/user/profile.json',
        '/login': '../mock-data/user/user.json'
    }
}

const handler = ctx => {
    let { request } = ctx
    let method = request.method.toLowerCase()
    let pathname = ctx.routerPath
    let mockDataPath = mockDataMapping[method] ? mockDataMapping[method][pathname] : null

    if (!mockDataPath) {
        throw new Error(`Service not found for ${pathname}`)
    }

    let response = null
    let length = 0
    if (mockDataPath instanceof Array) {
        [mockDataPath, length] = mockDataPath
    }

    mockDataPath = path.join(__dirname, mockDataPath)
    let mockData = readFileAsJSON(mockDataPath)

    if (Array.isArray(mockData) && length > 0) {
        response = pickRandomItem(mockData, length)
    } else {
        response = mockData
    }

    ctx.body = response
}

module.exports = {
    install(router) {
        let get = Object.keys(mockDataMapping.get || {})
        let post = Object.keys(mockDataMapping.post || {})

        get.forEach(url => {
            router.get(url, handler)
        })

        post.forEach(url => {
            router.post(url, handler)
        })
    }
}
