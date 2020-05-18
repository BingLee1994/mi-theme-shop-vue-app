export const fullScreen = {
    name: 'full-screen',
    option: {
        // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        // el的parent是null
        bind(el, { modifiers }) {
            el.style.position = 'fixed'
            el.style.left = '0'
            el.style.right = '0'
            el.style.top = '0'
            el.style.bottom = '0'
            if (modifiers.hiddenX) {
                el.style.overflow = 'hidden auto'
            }
            if (modifiers.hiddenY) {
                el.style.overflow = 'auto hidden'
            }
            if (modifiers.hidden) {
                el.style.overflow = 'hidden'
            }
        }
    }
}
