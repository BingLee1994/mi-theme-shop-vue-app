let mounted = false

function checkShowIndicator() {
    if (window.orientation === 90 || window.orientation === -90) {
        document.body.classList.add('orientate-indicator')
    } else {
        document.body.classList.remove('orientate-indicator')
    }
}

module.exports = function() {
    checkShowIndicator()
    if (!mounted && window) {
        window.addEventListener('orientationchange', checkShowIndicator)
        mounted = true
    }
}
