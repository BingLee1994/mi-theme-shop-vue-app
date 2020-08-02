import commentsList from './comments-list'
import commentsPost from './comments-post'
import fav from './favorite'
import slider from './sliders'
import themeDetail from './theme-detail'
import themeList from './theme-list'
import themeSearch from './theme-search'

const allRoutes = [
    commentsList,
    commentsPost,
    fav,
    slider,
    themeDetail,
    themeList,
    themeSearch
]

export default function mountRoute(router) {
    allRoutes.forEach(route => {
        router.routes[route.routeName] = route.handler
    })
}
