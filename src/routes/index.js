import WelcomeScreen from '@views/welcome'
import HomeScreen from '@views/home/index'
import SearchScreen from '@views/search/search'
import IntroHomeScreen from '@views/intro/index'
import NFD from '@views/404'
import introRoutes from './intro'
import homeRoutes from './home'
import ViewCategory from '@/views/view-category'
import ViewThemeItemScreen from '@views/view-theme-item'
import CommentsScreen from '@views/comments/comments'
import WriteCommentsScreen from '@views/comments/write-comment'
import LoginScreen from '@views/login'

export default [
    {
        path: '/',
        name: 'welcome',
        component: WelcomeScreen
    },

    {
        path: '/login',
        name: 'login',
        component: LoginScreen
    },

    {
        path: '/intro',
        name: 'intro',
        component: IntroHomeScreen,
        redirect: { name: 'appIntro' },
        children: introRoutes
    },

    {
        path: '/home',
        name: 'home',
        component: HomeScreen,
        children: homeRoutes,
        meta: {
            keepAlive: true
        },
        redirect: {
            name: 'gallery'
        }
    },

    {
        path: '/search',
        name: 'search',
        component: SearchScreen,
        beforeEnter(to, from, next) {
            console.log(to)
            let fromName = from.name
            to.meta.keepAlive = (fromName === 'viewComment' ||
            fromName === 'login' || fromName === 'viewItemEntry' || fromName === 'viewItem')
            next()
        },
        meta: {
            expectedEntry: ['home']
        }
    },

    {
        path: '/view/:id',
        name: 'viewItemEntry',
        component: ViewThemeItemScreen,
        redirect: to => {
            let { id } = to.params
            return { name: 'viewItem', params: { id, type: 'theme' } }
        },
        meta: {
            authenticate: true,
            authenticateReason: '登录以浏览或者购买商品',
            keepAlive: true,
            expectedEntry: ['search']
        }
    },

    {
        path: '/view/:type/:id',
        name: 'viewItem',
        component: ViewThemeItemScreen,
        meta: {
            authenticate: true,
            authenticateReason: '登录以浏览或者购买商品',
            keepAlive: true,
            expectedEntry: ['search']
        }
    },

    {
        path: '/comments/:itemId/:themeName',
        name: 'viewComment',
        component: CommentsScreen,
        meta: {
            expectedEntry: ['viewItem', 'viewItemEntry']
        }
    },

    {
        path: '/comments/write/:itemName',
        name: 'writeComment',
        component: WriteCommentsScreen,

        meta: {
            animated: true,
            animationDirection: 'top',
            authenticate: true,
            authenticateReason: '登录以发表评论',
            expectedEntry: ['viewComment']
        }
    },

    {
        path: '/view-category/:filter/:keyWord',
        name: 'viewCategory',
        component: ViewCategory
    },

    {
        path: '*',
        name: '404',
        component: NFD
    }
]
