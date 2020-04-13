import ActionMenu from './menu'
import Vue from 'vue'
import { callFunc, isNone } from '../../utils'
import '~@miui/component-style//action-bar/action-menu/menu-popup-container.scss'

let currentMenu = null
const DISMISS_ERROR = new Error('DISMISSED')

function getMenuOption(options) {
    let { menuItems, position = {}, mounted, onSelectMenuItem, closed } = options
    const ActionMenuPopup = {
        data: {
            isShow: false,
            positionX: position.x || 0,
            positionY: position.y || 0
        },
        render() {
            let className = ['miui-action-menu-container']
            if (!this.isShow) className.push('miui-action-menu-container_hidden')
            return (
                <div
                    class={className}
                    onTransitionend={this.onTransitionEnd}
                    onClick={this.closeMenu}
                >
                    <ActionMenu
                        ref='menu'
                        style={{
                            position: 'fixed',
                            left: this.positionX + 'px',
                            top: this.positionY + 'px',
                            transformOrigin: `${this.animationOrigin.join(' ')}`
                        }}
                        menuItems={menuItems}
                        onClickMenuItem={this.onClickMenuItem}
                    />
                </div>
            )
        },
        methods: {
            _updatePosition() {
                let { positionX: x, positionY: y, elMenu } = this
                let screenWidth = window.innerWidth

                let { offsetWidth: elMenuWidth } = elMenu

                let boundaryLeft = 0
                let boundaryRight = screenWidth - elMenuWidth

                if (x < boundaryLeft) {
                    x = boundaryLeft
                }

                if (x > boundaryRight) {
                    x = Math.abs(x - elMenuWidth)
                    this.animationOrigin[0] = 'right'
                }

                this.positionX = x
                this.positionY = y
            },
            closeMenu() {
                this.isShow = false
            },
            onClickMenuItem(item, e) {
                callFunc(onSelectMenuItem, item, e)
                this.isShow = false
            },
            onTransitionEnd() {
                if (!this.isShow) {
                    callFunc(closed)
                }
            }
        },
        created() {
            this.animationOrigin = ['left', 'top']
        },
        mounted() {
            this.elMenu = this.$refs.menu.$el
            this._updatePosition()
            this.$nextTick(() => {
                this.isShow = true
            })
            callFunc(mounted)
        }
    }
    return ActionMenuPopup
}

function unmountMenu(cb) {
    if (currentMenu) {
        currentMenu.$destroy()
        document.body.removeChild(currentMenu.$el)
        currentMenu = null
        callFunc(cb)
    }
}

export { DISMISS_ERROR }

export default function showMenu(options) {
    if (!isNone(currentMenu)) return Promise.reject(DISMISS_ERROR)

    return new Promise((resolve, reject) => {
        let itemClicked = false
        let resolveData = null
        let onClickMenuItem = item => {
            itemClicked = true
            resolveData = item
        }
        let destroyed = () => {
            if (itemClicked) {
                resolve(resolveData)
            } else {
                reject(DISMISS_ERROR)
            }
        }
        let { menuItems, position } = options
        let onMenuClosed = () => unmountMenu(destroyed)

        let menuOption = getMenuOption({ menuItems, position, onClickMenuItem, closed: onMenuClosed })
        let menuInstance = new Vue(menuOption)
        let elMenuContainer = document.createElement('div')

        document.body.appendChild(elMenuContainer)

        currentMenu = menuInstance
        menuInstance.$mount(elMenuContainer)
    })
}
