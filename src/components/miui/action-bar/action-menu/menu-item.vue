<style lang="scss">
    @import "~@miui/component-style/action-bar/action-menu/menu-item.scss";
</style>

<script>
export default {
    name: 'MIUI-ActionMenuItem',
    props: {
        text: [String, Number],
        disabled: Boolean,
        divider: Boolean,
        iconClass: String
    },

    methods: {
        onClick(e) {
            if (this.$props.disabled) return
            this.$emit('click', e)
        }
    },

    render() {
        let { text, disabled, divider, iconClass } = this.$props
        return (
            <div class={divider ? 'menu-item-divider' : 'menu-item-wrapper'}>
                { /* if */ !divider &&
                    <p
                        onClick={this.onClick}
                        class={`menu-item ${disabled ? 'menu-item_disabled' : ''}`}>
                        { /* if */ iconClass &&
                            <span class={`icon ${iconClass}`}></span>
                        }
                        <span class='text'>{text}</span>
                    </p>
                }
            </div>
        )
    }
}
</script>
