import Toast from './toast.vue'
import Vue from 'vue'

const ToastConstructor = Vue.extend(Toast)
const DURATION_LONG = 1
const DURATION_SHORT = 0

let toastIsShowing = false
let toastQueue = []
let curToast = null

function mount(msg, duration = DURATION_SHORT) {
    if (!toastIsShowing) {
        let toast = new ToastConstructor({
            propsData: { duration }
        })
        toast.$slots.default = [msg]
        toast.closed = () => {
            toastIsShowing = false
            showNextToastIfNeed()
        }

        let el = document.createElement('div')
        document.body.appendChild(el)
        toast.$mount(el)
        toastIsShowing = true
        curToast = toast
    } else {
        toastQueue.push({ msg, duration })
    }
}

function unmount() {
    if (!toastIsShowing && curToast) {
        curToast.$destroy()
        curToast.$el.parentElement.removeChild(curToast.$el)
        curToast = null
    }
}

function showNextToastIfNeed() {
    unmount()
    if (toastQueue.length > 0) {
        let { msg, duration } = toastQueue.shift()
        mount(msg, duration)
    }
}

export { DURATION_LONG, DURATION_SHORT }

export default {
    install(Vue) {
        Vue.prototype.$toast = {
            DURATION_LONG,
            DURATION_SHORT,
            show(msg, duration) {
                mount(msg, duration)
            }
        }
    }
}
