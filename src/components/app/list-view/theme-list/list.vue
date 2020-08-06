<template>
    <div
        class="theme-list"
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
                :key="item.id"
                @click="onClick(item, index, $event)"
                :style="item.style"
                :item="item"
                :type="item.type"
                :isGotoDetailPage="isGotoDetailPage"
            />
        </div>
    </div>
</template>

<script>
import ListItem from '@/components/app/list-view/theme-list/list-item'

export default {
    name: 'ThemeList',
    components: { ListItem },
    props: {
        showLoading: Boolean,
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
        },

        isGotoDetailPage() {
            return !this.$listeners.clickItem
        }
    },

    methods: {
        onClick(item, index, e) {
            this.$emit('clickItem', item, index, e)
        }
    }
}
</script>

<style scoped lang="scss">
    .theme-list {
        $gapWidth: 15px;
        --colSize: 2;
        font-size: 1rem;
        display: flex;
        flex-wrap: wrap;
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
