<script>
import { genID } from '@miui/utils'

export default {
    name: 'Navbar',
    props: {
        navItems: {
            type: Array,
            default() {
                return []
            }
        },
        selectedNav: {
            type: Number,
            default: 0
        }
    },

    render() {
        return (
            <ul
                class='nav-bar'
            >{ /* v-for */
                this.$props.navItems.map((n, idx) => {
                    let selected = idx === this.selectedNav
                    let index = idx
                    let classNames = ['nav-item']
                    if (selected) {
                        classNames.push('nav-item_selected')
                    }
                    if (n.hidden) {
                        classNames.push('nav-item_hidden')
                    }
                    return (
                        <li
                            class={classNames.join(' ')}
                            key={genID()}
                            onClick={e => this.onClickItem(e, n, index)}
                        >
                            <span class="label">{n.text || n || ''}</span>
                        </li>
                    )
                })
            }</ul>
        )
    },

    methods: {
        onClickItem(e, item, index) {
            if (item.hidden) return
            this.$emit('clickNavItem', index, item, e)
        }
    }
}
</script>

<style scoped lang="scss">
    .nav-bar {
        font-size: 1.4rem;
        display: flex;
        justify-content: flex-start;
        padding: 1rem;

        .nav-item {
            margin-right: 1.5rem;
            padding: 5px 0;
            &_selected {
                color: var(--black);
                font-size: 1.5rem;
                border-bottom: 2px solid var(--miOrange);
                font-weight: bold;
            }
            &_hidden {
                display: none;
            }
        }
    }
</style>
