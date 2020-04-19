<script>
import { genID } from '@miui/utils'
const MAX_LENGTH = 6

export default {
    name: 'TabBar',
    props: {
        tabs: {
            type: Array,
            default() {
                return []
            }
        },
        selectedTab: {
            type: Number,
            default: 0
        }
    },
    render() {
        return (
            <div
                class='tab-bar'
            >{ /* v-for */
                this.$props.tabs.slice(0, MAX_LENGTH).map((t, idx) => {
                    let selected = idx === this.selectedTab
                    let index = idx
                    let classNames = ['tab-item']
                    if (selected && t.activeClass) {
                        classNames.push(t.activeClass)
                    }
                    return (
                        <a
                            class={classNames.join(' ')}
                            key={genID()}
                            onClick={e => this.onClickItem(e, t, index)}
                        >
                            <span class={`icon ${t.iconClass || ''}`}></span>
                            <span class="label">{t.text || ''}</span>
                        </a>
                    )
                })
            }</div>
        )
    },
    methods: {
        onClickItem(e, item, index) {
            this.$emit('clickTab', index, item, e)
        }
    }
}
</script>

<style scoped lang="scss">
    .tab-bar {
        display: flex;
        justify-content: space-evenly;
        box-shadow: 0px -2px 4px var(--black10);
        padding: 1rem;

        .tab-item {
            text-align: center;
            font-size: 1.3rem;

            .icon {
                display: block;
                width: 3rem;
                height: 3rem;
                border: 1px solid green;
                margin: 0 auto;
                margin-bottom: 2px;
            }
        }
    }
</style>
