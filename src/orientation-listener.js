let mounted = false

module.exports = function() {
    if (!mounted && window) {
        window.addEventListener('orientationchange', () => {
            if (window.orientation === 90 || window.orientation === -90) {
                // 横屏
                alert('请旋转转屏')
                document.body.classList.add('orientate-indicator')
            } else {
                document.body.classList.remove('orientate-indicator')
            }
        })
        mounted = true
    }
}
