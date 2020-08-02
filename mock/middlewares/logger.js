module.exports = async(ctx, next) => {
    console.log(`Handling ${ctx.request.method} ${ctx.url} ...`)
    await next()
}
