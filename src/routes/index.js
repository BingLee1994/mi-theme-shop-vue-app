import WelcomeScreen from '@views/welcome'
import HomeScreen from '@views/home/index'
import SearchScreen from '@views/search/search'
import IntroHomeScreen from '@views/intro/index'
import NFD from '@views/404'
import introRoutes from './intro'
import homeRoutes from './home'
import ViewItemScreen from '@views/view-item'
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
        component: SearchScreen
    },

    {
        path: '/view/:id',
        name: 'viewItemEntry',
        component: ViewItemScreen,
        redirect: to => {
            let { id } = to.params
            return { name: 'viewItem', params: { id, type: 'theme' } }
        },
        meta: {
            authenticate: true,
            authenticateReason: '登录以浏览或者购买商品'
        }
    },

    {
        path: '/view/:type/:id',
        name: 'viewItem',
        component: ViewItemScreen,
        meta: {
            authenticate: true,
            authenticateReason: '登录以浏览或者购买商品'
        }
    },

    {
        path: '/comments/:itemId/:themeName',
        name: 'commentScreen',
        component: CommentsScreen
    },

    {
        path: '/comments/write/:itemName',
        name: 'writeComment',
        component: WriteCommentsScreen,

        meta: {
            animated: true,
            animationDirection: 'top',
            authenticate: true,
            authenticateReason: '登录以发表评论'
        }
    },

    {
        path: '*',
        name: '404',
        component: NFD
    }
]
