const allTheme = require('./mock/all-theme.json')
const http = require('http')
const URL = require("url")
const fs = require('fs')
const path = require('path')

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

var app = http.createServer((req, res) => {
    let url = req.url
    console.log(url)
    res.json = function(d) {
        this.writeHead(
            200,
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        )
        this.write(JSON.stringify(d))
        res.end()
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

    } else if (url.includes('/search?keyword=')) {
        let mock = require('./mock/search/result.json')
        res.json(pickRandomItem(mock, 12))

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

    } else if (url.includes('quick-action/recommend')) {
        let mock = require('./mock/quick-action/recommend.json')
        let { category } = URL.parse(req.url, true).query
        res.json(mock[category])

    } else if (url.includes('item/detail')) {
        let mock = require('./mock/items/theme/data.json')
        let { id } = URL.parse(req.url, true).query
        //res.json(mock[category])
        console.log(id)
        res.json(pickRandomItem(mock, 1)[0])

    } else if (url.includes('comments/list')) {
        let mock = fs.readFileSync('./mock/comments/data.json').toString()
        mock = JSON.parse(mock)
        let { id } = URL.parse(req.url, true).query
        let data = pickRandomItem(mock, 1)[0]
        data.comments = data.comments.sort((p, n) => n.date - p.date)
        res.json(data)

    } else if (url.includes('/login')) {
        res.json({
            user: {
                username: '791188716@qq.com',
                id: '456131',
                displayName: '悄悄一角落',
                gender: '男',
                region: '中国',
                avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589111305614&di=d693e7d52549a956ce0e12f9a594b2ec&imgtype=0&src=http%3A%2F%2Fp4.so.qhmsg.com%2Ft010db0264294c7a369.jpg'
            },
            accessToken: '218736ts7d67f789832ud878328e76r832y',
            refreshToken: '87fdh376ds7tf32788dsfhi1298d7f'
        });
    }  else if (url.includes('/comments/post')) {
        if (req.method === 'OPTIONS') {
            res.json({})
            return
        }
        let reqBody = ''
        req.on('data', function(chunk) {
            reqBody += chunk
        })
        req.on('end', () => {
            reqBody = JSON.parse(reqBody)
            let commentText = reqBody.comment.text
            let point = reqBody.comment.point
            let userName = reqBody.userContext.displayName
            let date = Date.now()
            let mock = fs.readFileSync(path.resolve('./mock/comments/data.json')).toString()
            let commentsList = JSON.parse(mock)
            commentsList.forEach(c => {
                c.comments.push({
                    "id": date,
                    "userName": userName,
                    "comment": commentText,
                    "point": point,
                    "date": date,
                    "version": "1.0",
                    "likes": 0
                })
            })
            fs.writeFileSync(
                path.resolve('./mock/comments/data.json'),
                JSON.stringify(commentsList, null, 2)
            )
            res.json({})
        })
    } else {
        res.writeHead(404, {
            'Access-Control-Allow-Origin': '*'
        })
        res.write('not found fd')
    }
})
app.listen(4201)
console.log('running at http://localhost:4201')
