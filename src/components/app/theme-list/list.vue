<template>
    <div>
        <div
            class="theme-list-warapper"
            :style="{
                '--colSize': column
            }"
        >
            <div
                class="sub-wrapper"
                v-for="(col, index) in columnData"
                :key="index"
            >
                <ListItem
                    v-for="(item, index) in col"
                    :class="['list-item', item.className]"
                    :key="index"
                    @click="onClick(item, index, $event)"
                    :style="item.style"
                    :item="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
// const BG_COLOR = ['#E8F6F6', '#EFF1FE', '#FFF5EC', '#FAFEF0', '#FFECFD']
import ListItem from '@/components/app/theme-list/list-item'

export default {
    name: 'ThemeList',
    components: { ListItem },
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        },
        column: {
            type: [Number, String],
            default: 2,
            validator(val) {
                val = parseInt(val)
                return val >= 2 && val <= 5
            }
        }
    },

    computed: {
        columnData() {
            let result = []
            let { column, items } = this
            let columnSize = Math.min(items.length, column)
            while ((columnSize--) > 0) {
                result.push([])
            }
            items.forEach((item, idx) => {
                let columnIdx = idx % column
                result[columnIdx].push(item)
            })
            return result
        }
    },

    methods: {
        onClick(item, index, e) {
            this.$emit('click', item, index, e)
        }
    }
}
</script>

<style scoped lang="scss">
    .theme-list-warapper {
        --colSize: 2;
        $gapWidth: 15px;
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        box-sizing: border-box;
        justify-content: space-between;

        .sub-wrapper {
            width: calc(100% / var(--colSize) - #{$gapWidth} / var(--colSize));
            box-sizing: border-box;
            &.left-wrapper {
                margin-right: $gapWidth;
            }
        }
    }
</style>
