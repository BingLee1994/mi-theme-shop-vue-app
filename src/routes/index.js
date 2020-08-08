import SplashActivity from '@views/splash-activity'
import HomeScreen from '@views/home/index'
import SearchScreen from '@views/search/search'
import RankScreen from '@views/rank'
import IntroHomeScreen from '@views/intro/index'
import NFD from '@views/404'
import introRoutes from './intro'
import homeRoutes from './home'
import ViewCategoryScreen from '@/views/view-category'
import ViewThemeItemScreen from '@views/view-theme-item'
import CommentsScreen from '@views/comments/comments'
import WriteCommentsScreen from '@views/comments/write-comment'
import LoginScreen from '@views/login'
import SettingScreen from '@views/setting'
import ViewOrderScreen from '@views/my-order'
import ViewWallpaperScreen from '@views/wallpaper-viewer'
import FollowArtistScreen from '@views/my-follow-artist.vue'

export default [
    {
        path: '/',
        name: 'entry',
        component: SplashActivity
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
        redirect: { name: 'darkModeIntro' },
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
        path: '/rank/:type',
        name: 'rank',
        component: RankScreen,
        meta: {
            expectedEntry: ['home', 'category']
        }
    },

    {
        path: '/search',
        name: 'search',
        component: SearchScreen,
        beforeEnter(to, from, next) {
            let fromName = from.name
            to.meta.keepAlive = (fromName === 'viewComment' ||
            fromName === 'login' || fromName === 'viewItemEntry' || fromName === 'viewItem')
            next()
        },
        meta: {
            keepAlive: true,
            expectedEntry: ['home']
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
            expectedEntry: ['search', 'home', 'rank', 'viewCategory', 'category', 'viewOrder']
        }
    },

    {
        path: '/view-wallpaper/:id',
        name: 'viewWallpaperItem',
        component: ViewWallpaperScreen,
        meta: {
            expectedEntry: ['home']
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
        component: ViewCategoryScreen,
        meta: {
            expectedEntry: ['viewFollowArtist', 'home', 'search']
        }
    },

    {
        path: '/setting',
        name: 'setting',
        component: SettingScreen,
        meta: {
            expectedEntry: ['me'],
            keepAlive: false
        }
    },

    {
        path: '/order/:type',
        name: 'viewOrder',
        component: ViewOrderScreen,
        meta: {
            authenticate: true,
            authenticateReason: '登录以查看订单详情',
            expectedEntry: ['me']
        }
    },

    {
        path: '/follow-artist',
        name: 'viewFollowArtist',
        component: FollowArtistScreen,
        meta: {
            authenticate: true,
            authenticateReason: '登录以查看您的关注列表',
            expectedEntry: ['me']
        }
    },

    {
        path: '*',
        name: '404',
        component: NFD
    }
]
