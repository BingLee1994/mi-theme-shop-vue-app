(function() {
    let { documentElement: htmlDom } = document
    let htmlFontSize = getComputedStyle(htmlDom).fontSize
    htmlDom.style.fontSize = (10 / parseFloat(htmlFontSize) * 100) + '%'
})()
