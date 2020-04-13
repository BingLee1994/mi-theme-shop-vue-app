import stu from '../utils/storage'

const state = {
    darkMode: stu.get('darkMode', false),
    appVersion: stu.get('appVersion', null),
    fontSize: stu.get('fontSize', null)
}

export default {
    state,
    mutations: {
        setDarkMode(state, flag) {
            stu.set('darkMode', state.darkMode = Boolean(flag))
        }
    }
}
