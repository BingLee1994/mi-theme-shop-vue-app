let { readFileAsJSON } = require('../utils')
const fs = require('fs')
const path = require('path')

module.exports = {
    routeName: '/comments/post',
    method: 'post',
    handler(ctx) {
        let reqBody = ctx.request.body
        let commentText = reqBody.comment.text
        let point = reqBody.comment.point
        let userName = reqBody.userContext.displayName
        let date = Date.now()

        let commentsList = readFileAsJSON(path.resolve(__dirname, '../mock-data/comments/data.json'))
        commentsList.forEach(c => {
            c.comments.push({
                id: date,
                userName: userName,
                comment: commentText,
                point: point,
                date: date,
                version: '1.0',
                likes: 0
            })
        })
        fs.writeFileSync(
            path.resolve('../mock-data/comments/data.json'),
            JSON.stringify(commentsList, null, 2)
        )
        ctx.body = ''
    }
}
