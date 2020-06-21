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
        align-items: center;
        box-shadow: 0px -1px 6px var(--black05);
        padding: 1rem;

        .tab-item {
            text-align: center;
            font-size: 1rem;

            .icon {
                display: block;
                width: 2.5rem;
                height: 2.5rem;
                margin: 0 auto;
                margin-bottom: 2px;
                @include bg-center(1.8rem 1.8rem);
            }

            .label {
                line-height: 1;
            }
        }
    }
</style>
