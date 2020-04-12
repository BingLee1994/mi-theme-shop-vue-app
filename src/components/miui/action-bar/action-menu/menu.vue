<style lang="scss">
    @import "~@miui/component-style/action-bar/action-menu/menu.scss";
</style>

<script>
import MenuItem from './menu-item'
import { genID, callFunc } from '../../utils'

export default {
    name: 'MIUI-ActionMenu',
    props: {
        menuItems: Array
    },

    methods: {
        handleItemClick(item) {
            return e => {
                this.$emit('clickMenuItem', item, e)
                callFunc(this.onClickMenuItem, item, e)
            }
        }
    },

    render() {
        let { menuItems } = this.$props
        return (
            <div class='miui-action-menu-wrapper'>
                {
                    menuItems.map(item => {
                        return (
                            <MenuItem
                                key={genID()}
                                text={item.text}
                                disabled={item.disabled}
                                divider={item.divider}
                                iconClass={item.iconClass}
                                onClick={this.handleItemClick(item)}
                            />
                        )
                    })
                }
            </div>
        )
    }
}
</script>
