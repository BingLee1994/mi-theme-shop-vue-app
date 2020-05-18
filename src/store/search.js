import stu from '../utils/storage'
import api, { isGeneralException } from '@/api'

const EXPIRE_IN = 60 * 2 * 1000
const CATEGOTY = ['theme', 'font', 'ringtone', 'wallpaper']

function isExpire(date) {
    return Date.now() - date >= EXPIRE_IN
}

let history = stu.get('searchHistory', [])

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
                try {
                    let response = await api.fetchSearchScreenData(category)
                    commit('update', response)
                } catch (err) {
                    if (isGeneralException(err)) {
                        this._vm.$toast.show(err.errorMessage, 1)
                    }
                }
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
            state[category] = data || []
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
        removeHistory(state, name) {
            let { history } = state
            let index = history.indexOf(name)
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
