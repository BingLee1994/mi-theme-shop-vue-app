const state = {
    currentNavIndex: 0,
    navItems: [
        {
            text: '推荐',
            name: 'recommend'
        },
        {
            text: '主题',
            name: 'theme'
        },
        {
            text: '壁纸',
            name: 'wallpaper'
        },
        {
            text: '字体',
            name: 'font'
        },
        {
            text: '铃声',
            name: 'ringtone'
        }
    ]
}

export default {
    state,
    getters: {
        currentNavIndex(state) {
            return state.currentNavIndex
        },
        currentNavName({ navItems, currentNavIndex }) {
            return navItems[currentNavIndex].name
        },
        currentNav({ navItems, currentNavIndex }) {
            return navItems[currentNavIndex]
        },
        navItems(state) {
            return state.navItems
        }
    },

    actions: {
        selectNavByIndex(context, idx) {
            context.commit('setIndex', idx)
        },
        selectNavByName(context, name) {
            let { navItems } = context.state
            let idx = navItems.findIndex(n => n.name === name)
            context.commit('setIndex', idx)
        },
        hideNavItem(context, idx) {
            return context.commit('setHidden', { idx, flag: true })
        },
        showNavItem(context, idx) {
            return context.commit('setHidden', { idx, flag: false })
        }
    },

    mutations: {
        setIndex(state, idx = 0) {
            idx = Math.floor(idx)
            if (isNaN(idx)) return
            if (state.navItems[idx] && state.currentNavIndex !== idx) {
                state.currentNavIndex = idx
            }
        },
        setHidden(state, { idx, flag }) {
            let { navItems } = state
            if (navItems[idx].hidden !== flag) {
                navItems[idx].hidden = flag
                state.navItems = [...navItems]
            }
        }
    }
}
