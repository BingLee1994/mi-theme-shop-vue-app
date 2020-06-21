import api from '@/api'

function encrypt(val, token) {
    // 模拟密码加密
    console.log('加密成功')
    return val
}

function validate(user) {
    // 校验Response
}

export default {
    namespaced: true,

    state: {
        userContext: null,
        attemptRoute: null,
        accessToken: '',
        refreshToken: ''
    },

    getters: {
        userContext(state) {
            return state.userContext
        },
        userName({ userContext }) {
            return userContext.username
        },
        userDisplayName({ userContext }) {
            return userContext.displayName
        },
        avatar({ userContext }) {
            return userContext.avatar
        },
        authenticated(state) {
            return state.userContext !== null
        },
        attemptRoute(state) {
            return state.attemptRoute
        }
    },

    actions: {
        async authenticate(ctx, payload) {
            let { username, password } = payload
            let { token } = await api.initLogin()
            password = encrypt(password, token)

            let { user, accessToken, refreshToken } = await api.login(username, password)

            validate(user) // id, displayName, gender, region, avatar

            ctx.commit('setUserContext', user)
            ctx.commit('setAccessToken', accessToken)
            ctx.commit('setRefreshToken', refreshToken)
        }
    },

    mutations: {
        setUserContext(state, ctx = {}) {
            state.userContext = ctx
        },

        setAttemptRoute(state, route) {
            state.attemptRoute = route
        },

        setAccessToken(state, token) {
            state.accessToken = token
        },

        setRefreshToken(state, token) {
            state.refreshToken = token
        },

        invalidate(stat) {
            stat.userContext = null
            stat.accessToken = ''
            stat.refreshToken = ''
        }
    }
}
