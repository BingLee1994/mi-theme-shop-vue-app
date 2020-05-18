const flexContainer = {
    name: 'flex',
    option: {
        // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        // el的parent是null
        bind(el, { arg, value, modifiers }) {
            let flexDirection = 'row'
            let centerX = modifiers.centerX === true
            let centerY = modifiers.centerY === true
            let isInline = modifiers.inline === true
            if (arg === 'direction' && value) {
                flexDirection = value
            }

            if (arg === 'overflow' && value) {
                el.style.overflow = value
            }

            if (modifiers.column) {
                flexDirection = 'column'
            }

            el.style.display = isInline ? 'inline-flex' : 'flex'
            el.style.flexDirection = flexDirection
            centerX && (el.style.justifyContent = 'center')
            centerY && (el.style.alighItems = 'center')

            if (modifiers.unwrap) {
                el.style.flexWrap = 'no-wrap'
            }
        }
    }
}

const flexItem = {
    name: 'flex-item',
    option: {
        // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        // el的parent是null
        bind(el, { arg, value, modifiers }) {
            value = String(value)

            if (modifiers['1']) {
                el.style.flex = '1'
            }

            if (modifiers.scrollY) {
                el.style.overflowY = 'auto'
            }

            if ((!arg || arg === 'flex') && value) {
                el.style.flex = value
            }

            if (arg === 'grow' && value) {
                el.style.flexGrow = value
            }

            if (arg === 'shrink' && value) {
                el.style.flexShrink = value
            }

            if (arg === 'basis' && value) {
                el.style.flexBasis = value
            }

            if (arg === 'overflow' && value) {
                el.style.overflow = value
            }
        }
    }
}

export { flexContainer, flexItem }
