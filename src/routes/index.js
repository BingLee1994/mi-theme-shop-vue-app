import Welcome from '@views/welcome'
import Home from '@views/home'
import IntroHome from '@views/intro/index'
import introRoutes from './intro'

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
        component: Home
    }

    // {
    //     path: '/about',
    //     name: 'About',
    //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    // {
    //     path: '/article',
    //     name: 'article',
    //     component: () => import(/* webpackChunkName: "article" */ './views/Article.vue')
    // },
    // {
    //     path: '/article/:id',
    //     name: 'article-view',
    //     component: () => import(/* webpackChunkName: "article" */ './views/Article.vue')
    // },
    // {
    //     path: '/article/:id/comment/:comment_id',
    //     name: 'article-view-comment',
    //     component: () => import(/* webpackChunkName: "article" */ './views/Article.vue')
    // },
    // {
    //     path: '/user/:name',
    //     name: 'User',
    //     component: () => import(/* webpackChunkName: "user" */ './views/user/User.vue'),
    //     children: [
    //         {
    //             name: 'fav-list',
    //             path: 'fav/:id',
    //             component: Fav
    //         },
    //         {
    //             name: 'productin-list',
    //             path: 'prd/:id',
    //             component: Prd
    //         }
    //     ]
    // },
    // {
    //     path: '*',
    //     name: '404',
    //     component: () => import(/* webpackChunkName: "about" */ './views/404.vue')
    // }
]
