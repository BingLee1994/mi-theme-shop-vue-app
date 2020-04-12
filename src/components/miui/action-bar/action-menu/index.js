import ActionMenu from './menu'
import Vue from 'vue'
import { callFunc } from '../../utils'
import '../../../../style/miui/components/action-bar/action-menu/menu-popup-container.scss'

// const MenuConstructor = Vue.extend(ActionMenu)
// const h = new Vue().$createElement

function getOption(menuItems, position = {}, mounted) {
    let ActionMenuPopup = {
        data: {
            isShow: false,
            positionX: position.x || 0,
            positionY: position.y || 0
        },
        render() {
            let className = ['miui-action-menu-container']
            if (!this.isShow) className.push('miui-action-menu-container_hide')
            return (
                <div
                    class={className}
                >
                    <ActionMenu
                        ref='menu'
                        style={{
                            position: 'fixed',
                            left: this.positionX + 'px',
                            top: this.positionY + 'px',
                            visibility: !this.isShow ? 'hidden' : '',
                            transformOrigin: `${this.animationOrigin.join(' ')}`
                        }}
                        menuItems={menuItems}
                    />
                </div>
            )
        },
        methods: {
            _updatePosition() {
                let { positionX: x, positionY: y, elMenu } = this
                let screenWidth = window.innerWidth
                let screenHeight = window.innerHeight

                let { offsetWidth: elMenuWidth, offsetHeight: elMenuHeight } = elMenu

                let boundaryLeft = 0
                let boundaryRight = screenWidth - elMenuWidth

                console.log(elMenuHeight, screenHeight)

                if (x < boundaryLeft) {
                    x = boundaryLeft
                }

                if (x > boundaryRight) {
                    x = Math.abs(x - elMenuWidth)
                    this.animationOrigin[0] = 'right'
                }

                this.positionX = x
                this.positionY = y
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

let currentMenu = null

export default {
    showMenu(options) {
        let { menuItems, position, onClickMenuItem } = options
        console.log(menuItems, onClickMenuItem)

        let menuInstance = new Vue(getOption(menuItems, position))
        let elMenuContainer = document.createElement('div')

        document.body.appendChild(elMenuContainer)

        currentMenu = menuInstance
        console.log(currentMenu)
        menuInstance.$mount(elMenuContainer)
    },

    hideMenu(options) {
    }
}
