const name = 'lazy'
const option = {
    // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    // el的parent是null
    bind(el, binding) {
    },

    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted(el, binding) {
        let { value } = binding
        let { once } = binding.modifiers
        el._dataSrc = value

        el.__d_observer = new IntersectionObserver(function(e) {
            let { target, intersectionRatio } = e[0]
            if (intersectionRatio >= 0.3) {
                target._visible = true
                if (binding.arg === 'background') {
                    target.style.backgroundImage = `url(${target._dataSrc})`
                } else if (target.tagName.toUpperCase() === 'IMG') {
                    target.setAttribute('src', target._dataSrc)
                }
                if (once && target.__d_observer) {
                    target.__d_observer.disconnect()
                    target.__d_observer = null
                    delete target.__d_observer
                }
            } else {
                target._visible = false
            }
        }, {
            threshold: [0.3]
        })
        el.__d_observer.observe(el)
    },

    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
    update(el, { arg, value }) {
        el._dataSrc = value
        if (el._visible) {
            if (arg === 'background') {
                el.style.backgroundImage = `url(${value})`
            } else if (value) {
                el.setAttribute('src', value)
            }
        }
    },

    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    componentUpdated(el, binding) {
    },

    // 只调用一次，指令与元素解绑时调用。
    unbind(el) {
        if (el.__d_observer) {
            el.__d_observer.disconnect()
            el.__d_observer = null
            delete el.__d_observer
        }
    }
}

export const lazyImg = { name, option }
