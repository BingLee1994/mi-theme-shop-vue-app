export const navItemsData = () => [
    {
        text: '推荐',
        name: 'recommend'
    },
    {
        text: '主题',
        name: 'theme'
    },
    {
        text: '壁纸',
        name: 'wallpaper'
    },
    {
        text: '字体',
        name: 'font'
    },
    {
        text: '铃声',
        name: 'ringtone'
    }
]

export const tabsData = () => [
    {
        text: '广场',
        iconClass: 'gallery',
        activeClass: 'gallery-selected',
        route: {
            name: 'gallery',
            params: { navId: 0 }
        }
    },
    {
        text: '分类',
        iconClass: 'category',
        activeClass: 'category-selected',
        route: {
            name: 'category',
            params: { navId: 0 }
        }
    },
    {
        text: '我',
        iconClass: 'me',
        activeClass: 'me-selected',
        route: { name: 'me' }
    }
]
