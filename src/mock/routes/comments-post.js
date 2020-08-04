module.exports = {
    routeName: '/comments/post',
    method: 'post',
    handler(ctx) {
        // let reqBody = ctx.request.body
        // let commentText = reqBody.comment.text
        // let point = reqBody.comment.point
        // let userName = reqBody.userContext.displayName
        // let date = Date.now()

        // let commentsList = require('../mock-data/comments/data.json')
        // commentsList.forEach(c => {
        //     c.comments.push({
        //         id: date,
        //         userName: userName,
        //         comment: commentText,
        //         point: point,
        //         date: date,
        //         version: '1.0',
        //         likes: 0
        //     })
        // })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            })
        })
    }
}
