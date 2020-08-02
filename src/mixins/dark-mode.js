import { callFunc } from '../components/miui/utils'
import store from '@/store'

function handleDarkModeChange(_this) {
    let { darkModeClass } = _this
    if (_this.darkMode) {
        if (darkModeClass) {
            _this.$el.classList.add(darkModeClass)
        }
        callFunc(_this.onDarkMode)
    } else {
        if (darkModeClass) {
            _this.$el.classList.remove(darkModeClass)
        }
        callFunc(_this.onLightMode)
    }
}

export default {
    computed: {
        darkMode: {
            get() {
                return store.state.preference.darkMode
            },
            set(value) {
                store.commit('setDarkMode', value)
            }
        }
    },
    mounted() {
        handleDarkModeChange(this)
    },
    updated() {
        handleDarkModeChange(this)
    }
}
