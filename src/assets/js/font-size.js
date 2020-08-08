(function() {
    let config = [
        {
            minWidth: 375,
            size: 1
        },
        {
            minWidth: 480,
            size: 1.3
        },
        {
            minWidth: 640,
            size: 1.4
        },
        {
            minWidth: 767,
            size: 1.6
        },
        {
            minWidth: 1024,
            size: 1.8
        }
    ]
    let { documentElement: htmlDom } = document
    let htmlFontSize = getComputedStyle(htmlDom).fontSize

    function setRem() {
        let screenW = window.innerWidth
        let normalSize = (10 / parseFloat(htmlFontSize) * 100)

        for (let i = config.length - 1; i >= 0; i--) {
            let { minWidth, size } = config[i]
            if (screenW >= minWidth) {
                htmlDom.style.fontSize = (normalSize * size) + '%'
                return
            }
        }

        htmlDom.style.fontSize = normalSize + '%'
    }

    setRem()

    window.addEventListener('resize', setRem)
})()
