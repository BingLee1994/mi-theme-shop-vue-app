import stu from '../utils/storage'
import api from '../api'

const EXPIRE_IN = 60 * 2 * 1000
const CATEGOTY = ['theme', 'font', 'ringtone', 'wallpaper']

function isExpire(date) {
    return Date.now() - date >= EXPIRE_IN
}

let history = stu.get('searchHistory', [])

function validateResponse(data) {
    if (!data) {
        throw new Error('invalid')
    }
    return true
}

const state = {}

CATEGOTY.forEach(c => {
    state[c] = {
        recommendations: [],
        adviertisements: [],
        styles: [],
        lastUpdate: 0
    }
})

state.history = history
state.category = CATEGOTY[0]

export default {
    state,
    getters: {
        recommendations(state) {
            let { category } = state
            return state[category].recommendations || []
        },
        adviertisements(state) {
            let { category } = state
            console.log(state[category].adviertisements)
            return state[category].adviertisements || []
        },
        styles(state) {
            let { category } = state
            return state[category].styles || []
        },
        history(state) {
            return state.history
        }
    },

    actions: {
        async fetchSearchScreenData({ state, commit }) {
            let { category } = state
            let categoryData = state[category]
            if (isExpire(categoryData.lastUpdate)) {
                let response = await api.fetchSearchScreenData(category)
                let data = response.data
                validateResponse(data)
                commit('update', data)
            }
        },
        updateAdv(context, type) {
            console.log('api adv')
        },
        updateStyle(context, type) {
            console.log('api styl')
        },
        updateRecommends(context, type) {
            console.log('api styl')
        }
    },

    mutations: {
        update(state, data) {
            let { category } = state
            state[category] = data
            state[category].lastUpdate = Date.now()
        },
        setCategory(state, c) {
            if (CATEGOTY.indexOf(c) === -1) {
                c = CATEGOTY[0]
            }
            state.category = c
        },
        addHistory(state, type) {
            let { history } = state
            if (history.indexOf(type) === -1) {
                history.push(type)
                state.history = history
                stu.set('searchHistory', history)
            }
        },
        removeHistory(state, type) {
            let { history } = state
            let index = history.indexOf(type)
            if (index !== -1) {
                history.splice(index, 1)
                state.history = history
                stu.set('searchHistory', history)
            }
        },
        clearHistory(state) {
            state.history = []
            stu.remove('searchHistory')
        }
    }
}
