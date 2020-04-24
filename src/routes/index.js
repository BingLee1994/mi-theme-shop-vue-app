import Welcome from '@views/welcome'
import Home from '@views/home/index'
import SearchView from '@views/search/search'
import IntroHome from '@views/intro/index'
import NFD from '@views/404'
import introRoutes from './intro'
import homeRoutes from './home'

export default [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    },

    {
        path: '/intro',
        name: 'intro',
        component: IntroHome,
        redirect: { name: 'appIntro' },
        children: introRoutes
    },

    {
        path: '/home',
        name: 'home',
        component: Home,
        children: homeRoutes,
        meta: {
            keepAlive: true
        }
    },

    {
        path: '/search',
        name: 'search',
        component: SearchView
    },

    {
        path: '*',
        name: '404',
        component: NFD
    }
]
