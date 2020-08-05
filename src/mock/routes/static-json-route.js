let { pickRandomItem } = require('../utils')

const mockDataMapping = {
    get: {
        '/search/theme': [require('../mock-data/items/theme/all-theme.json'), 15],
        '/search/recommend/theme': [require('../mock-data/items/theme/all-theme.json'), 2],
        '/search/font': [require('../mock-data/search/result.json'), 12],
        '/item/recommand': [require('../mock-data/items/theme/all-theme.json'), 7]
    },
    post: {
        '/profile': require('../mock-data/user/profile.json'),
        '/login': require('../mock-data/user/user.json'),
        '/follow-artist': [require('../mock-data/user/follow-artist.json')]
    }
}

const handler = request => {
    let method = request.method.toLowerCase()
    let pathname = request.path
    if (!pathname.startsWith('/')) {
        pathname = '/' + pathname
    }
    let mockDataPath = mockDataMapping[method] ? mockDataMapping[method][pathname] : null

    if (!mockDataPath) {
        throw new Error(`Service not found for ${pathname}`)
    }

    let response = null
    let length = 0
    if (mockDataPath instanceof Array) {
        [mockDataPath, length] = mockDataPath
    }
    let mockData = mockDataPath

    if (Array.isArray(mockData) && length > 0) {
        response = pickRandomItem(mockData, length)
    } else {
        response = mockData
    }

    console.log(response)
    return Promise.resolve(response)
}

export default function install(router) {
    let get = Object.keys(mockDataMapping.get || {})
    let post = Object.keys(mockDataMapping.post || {})

    get.forEach(url => {
        router.routes[url] = handler
    })

    post.forEach(url => {
        router.routes[url] = handler
    })
}
