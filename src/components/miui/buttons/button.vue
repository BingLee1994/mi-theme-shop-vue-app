<style lang="scss">
    @import "~@miui/component-style/button";
</style>

<script>
import { warn } from '../utils'
import darkMode from '@/mixins/dark-mode'

let expectedChildTag = ['span', 'font']

export default {
    name: 'MIUI-Button',
    mixins: [darkMode],
    props: {
        title: String,
        widen: Boolean,
        primary: Boolean,
        disabled: Boolean,
        medium: Boolean,
        small: Boolean,
        selected: Boolean
    },
    data() {
        return {
            darkModeClass: 'miui-button-dark'
        }
    },
    methods: {
        onClick(e) {
            if (this.$props.disabled) return
            this.$emit('click', e)
        },
        onTouchStart(e) {
            this.touchedTime = Date.now()
        },
        filterChildren() {
            let slots = this.$slots.default
            if (!slots) return ''
            let validChildren = []

            slots.forEach(child => {
                if (expectedChildTag.some(t => t === child.tag) ||
                    child.tag === undefined
                ) {
                    validChildren.push(child)
                } else {
                    let componentTag = child.componentOptions && child.componentOptions.tag
                    warn(`Invalid child of Button, expect text, <${expectedChildTag.join('>, <')}> as child. but got <${componentTag || child.tag}>.`, this)
                }
            })
            return validChildren
        }
    },
    render() {
        let classNames = ['miui-button']
        let { widen, primary, disabled, small, medium, selected } = this.$props
        widen && classNames.push('miui-button_widden')
        primary && classNames.push('miui-button_primary')
        disabled && classNames.push('miui-button_disabled')
        medium && classNames.push('miui-button_medium')
        small && classNames.push('miui-button_small')
        selected && classNames.push('miui-button_selected')

        return (
            <button
                disabled={this.$props.disabled}
                title={this.$props.title}
                class={classNames.join(' ')}
                onClick={this.onClick}
                onTouchDtart={this.onTouchStart}
            >
                <span>
                    {this.filterChildren()}
                </span>
            </button>
        )
    }
}
</script>
