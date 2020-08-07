import axios from 'axios'
import { nanoid } from 'nanoid'
import { GeneralException } from './error'
import getBaseRequestContext from './requestContext'
import useMock from '../mock/install'

let Env = {
    host: '192.168.1.7',
    port: '4201',
    // serviceName: 'api'
    serviceName: ''
}

let { host, port, serviceName } = Env
const timeout = 5 * 1000
const baseURL = `http://${host}:${port}`

let service = {
    get: {
        search: {
            type: 'search',
            recommend: 'search/recommend',
            suggestion: 'search/suggestion',
            style: 'search/style',
            adv: 'search/adviertisement',
            index: 'search/index',
            search: 'search'
        },
        quickAction: {
            recommend: 'quick-action/recommend'
        },
        item: {
            detail: 'item/detail',
            recommand: 'item/recommand'
        },
        comments: {
            list: 'comments/list',
            detail: 'comments/detail'
        },
        theme: {
            list: 'theme-list',
            swiperItems: 'swiper'
        },
        data: {
            style: 'data/style',
            trend: 'data/trend',
            rank: '/data/rank'
        }
    },
    post: {
        login: '/login',
        userProfile: '/profile',
        favorite: '/favorite',
        comments: {
            post: 'comments/post'
        },
        user: {
            followArtist: '/follow-artist'
        }
    }
}

function handleMiuiRequest(request) {
    if (request.url) {
        let random = `${Date.now()}${nanoid(2)}`
        if (!request.params) {
            request.url += `?_=${Date.now()}${nanoid(2)}`
        } else {
            request.params._ = random
        }
    }
    if (request.method === 'post') {
        let data = request.data || {}
        let baseRequestContext = getBaseRequestContext()

        data = Object.assign(data, baseRequestContext)
        request.data = data
    }
    return request
}

function validateResponse(response) {
    let { data } = response
    let { errorCode, errorMessage } = data
    if (errorCode) {
        throw new GeneralException(errorMessage)
    }
    return data
}

function handleMiuiException(exception) {
    // TODO handle the biz error
    throw exception
}

const api = axios.create({
    baseURL: serviceName ? [baseURL, serviceName].join('/') : baseURL,
    timeout: timeout
})

api.interceptors.request.use(handleMiuiRequest)
api.interceptors.response.use(validateResponse, handleMiuiException)

const server = {
    getSwiperItems(type) {
        return api.get(service.get.theme.swiperItems, { params: { type } })
    },

    getThemeList(type, filter) {
        return api.get(service.get.theme.list, { params: { type, filter } })
    },
    getQuickActionRecommend(category) {
        return api.get(service.get.quickAction.recommend, { params: { category } })
    },
    fetchSearchScreenData(category) {
        return api.get(service.get.search.index, { params: { category } })
    },

    getSearchRecommend(category = 'theme') {
        return api.get(service.get.search.recommend, { params: { category } })
    },

    getSearchSuggestion(category = 'theme') {
        return api.get(service.get.search.suggestion, { params: { category } })
    },

    getSearchStyle(category = 'theme') {
        return api.get(service.get.search.style, { params: { category } })
    },

    getSearchAdv(category = 'theme') {
        return api.get(service.get.search.adv, { params: { category } })
    },

    search(keyword, type = 'theme') {
        return api.get(service.get.search.search, { params: { keyword, type } })
    },

    getItemDetail(id, type = 'theme') {
        return api.get(service.get.item.detail, { params: { id, type } })
    },

    getReconmandList(id, type = 'theme') {
        return api.get(service.get.item.recommand, { params: { id, type } })
    },

    getItemChangeLog(id) {
        // MOCK
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        version: '3.1',
                        change: '主题率先适配MIUI12，喜欢的小伙伴多多分享给更多好友哦，给设计师一点动力保持更新！',
                        date: 1589331607796
                    },
                    {
                        version: '3.0',
                        change: '修复锁屏动画卡顿，适配超多第三方图标！',
                        date: 1589331506796
                    },
                    {
                        version: '2.1',
                        change: '适配部分图标，修复锁屏解锁后，锁屏页面元素位置未还原。',
                        date: 1589331405796
                    },
                    {
                        version: '1.0',
                        change: '主题已上架，欢迎大家支持',
                        date: 1589331307796
                    }
                ])
            }, 1000)
        })
    },

    getFollowArtist() {
        return api.post(service.post.user.followArtist)
    },

    getOrderStatus(id, purchased) {
        // MOCK
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (purchased) {
                    resolve({ status: 1, downloadUrl: '' })
                    return
                }
                let now = Date.now()
                if (now % 2 === 0) {
                    resolve({ price: 6, status: -1, downloadUrl: '' })
                } else {
                    reject(new Error(-1))
                }
            }, 1000)
        })
    },

    makeOrder(id) {
        // MOCK
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ id: '***', price: 6, itemName: 'MIUI主题包' })
            }, 1000)
        })
    },

    purchaseItem(orderId) {
        // MOCK
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ status: 1, downloadUrl: '' })
            }, 1000)
        })
    },

    updateFollowStatus(artistId, newStatus) {
        // MOCK
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 500)
        })
    },

    initLogin() {
        // MOCK
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ token: '1231321323' })
            }, 1000)
        })
    },

    login(encryptedUsn, encrypedPwd) {
        return api.post(service.post.login, { username: encryptedUsn, password: encrypedPwd })
    },

    getUserProfile() {
        return api.post(service.post.userProfile)
    },

    getComments(id) {
        return api.get(service.get.comments.list, { params: { id } })
    },

    likeIt(commentId) {
        // MOCK
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 200)
        })
    },

    submitComment(commentText, point, itemId) {
        return api.post(
            service.post.comments.post,
            {
                comment: {
                    id: itemId,
                    text: commentText,
                    point
                }
            }
        )
    },

    getFavorite(type) {
        return api.post(service.post.favorite, { type })
    },

    getTrend(type) {
        return api.get(service.get.data.trend, { type })
    },

    getStyle(type) {
        return api.get(service.get.data.style, { type })
    },

    getRankData(type) {
        return api.get(service.get.data.rank, { type })
    }
}

function isGeneralException(err) {
    return err instanceof GeneralException
}

window.server = api

function install(Vue) {
    Vue.prototype.$api = server
}

useMock(api)

export { api, service, baseURL, isGeneralException, install }
export default server
