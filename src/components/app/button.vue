<style lang="scss">
button.button {
    border: 1px solid var(--miOrange);
    padding: 8px 15px;
    border-radius: 1.5rem;
    justify-self: center;
    align-self: center;
    font-size: 1.3rem;
    line-height: 1;
    background-color: var(--miOrange);
    color: var(--white) !important;
    &.plain {
        color: var(--miOrange) !important;
        background-color: transparent;
    }

    &:active {
        opacity: .9;
    }

    &.disabled {
        opacity: .5;
    }
}
</style>

<script>

let expectedChildTag = ['span', 'font']

export default {
    name: 'Button',
    props: {
        title: String,
        plain: Boolean,
        disabled: Boolean
    },
    methods: {
        onClick(e) {
            if (this.$props.disabled) return
            this.$emit('click', e)
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
                    console.warn(`Invalid child of Button, expect text, <${expectedChildTag.join('>, <')}> as child. but got <${componentTag || child.tag}>.`, this)
                }
            })
            return validChildren
        }
    },

    render() {
        let classNames = ['button']
        let { plain, disabled } = this.$props
        plain && classNames.push('plain')
        disabled && classNames.push('disabled')

        return (
            <button
                disabled={this.$props.disabled}
                title={this.$props.title}
                class={classNames.join(' ')}
                onClick={this.onClick}
                ref="button"
            >
                <span>
                    {this.filterChildren()}
                </span>
            </button>
        )
    },

    mounted() {
        let buttonEl = this.$refs.button
        let height = buttonEl.offsetHeight
        buttonEl.style.borderRadius = height / 2 + 'px'
    }
}
</script>
