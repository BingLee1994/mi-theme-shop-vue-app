const allTheme = require('./mock/all-theme.json')
const http = require('http')
const URL = require("url");

function random(len) {
    return Math.floor(Math.random() * len + 1)
}

function pickRandomItem(arr, len, cb) {
    let result = []
    arr = [...arr]
    for (let i = 0; i < len; i++) {
        let length = arr.length
        if (length === 1) {
            result.push(arr[0])
            break
        }
        let idx = random(length - 1)
        let item = arr[idx]
        arr.splice(idx, 1)
        cb && cb(item)
        result.push(item)
    }
    arr = null
    return result
}

function before(app) {
    app.get('/seatch/theme', function(req, res) {
        let { baseImgUrl, list } = allTheme
        let data = pickRandomItem(list, 15, item => {
            item.previewImage = baseImgUrl + item.previewImage
        })
        res.json(data)
    })
    app.get('/category/theme', function(req, res) {
        res.json({ custom: 'response' })
    })
}

var app = http.createServer((req, res) => {
    let url = req.url
    console.log(url)
    res.json = function(d) {
        this.writeHead(
            200,
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        )
        this.write(JSON.stringify(d))

    }
    if (url.includes('/search/theme')) {
        let { baseImgUrl, list } = allTheme
        let data = pickRandomItem(list, 15, item => {
            item.previewImage = baseImgUrl + item.previewImage
        })
        res.json(data)

    } else if (url.includes('/category/theme')) {
        res.json({ custom: 'response' })

    } else if (url.includes('/search/recommend/theme')) {
        let mock = require('./mock/theme-search-recommend.json')
        let data = pickRandomItem(mock, 2)
        res.json(data)

    } else if (url.includes('search/index')) {
        let { category } = URL.parse(req.url, true).query
        let recMock = require('./mock/search/recommend.json')[category]
        let advMock = require('./mock/search/adv.json')[category]
        let styMock = require('./mock/search/style.json')[category]

        res.json({
            recommendations: pickRandomItem(recMock, 10),
            adviertisements: pickRandomItem(advMock, 2),
            styles: pickRandomItem(styMock, 4)
        })

    } else {
        res.writeHead(404)
        res.write('not found fd')
    }
    res.end()
})
app.listen(4201)
console.log('running at http://localhost:4201')

module.exports = before
