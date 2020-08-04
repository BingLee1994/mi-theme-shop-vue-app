<template>
    <ul
        ref="list"
        class="font-preview-list-wrapper"
        v-flex.wrap
        :style="`padding: ${padding}px; padding-right: 0;`"
    >
        <FontPreviewCard
            :item="item"
            v-for="(item, idx) in items"
            :key="item.id"
            :style="{
                width: cardWidth + 'px',
                marginRight: padding + 'px',
                marginBottom: padding + 'px'
            }"
            @click="onClickItem(item, idx)"
        />
    </ul>
</template>

<script>
import FontPreviewCard from './font-preview-card'

export default {
    name: 'FontFacePreviewList',
    components: { FontPreviewCard },

    props: {
        items: Array
    },
    data() {
        return {
            padding: 15,
            cardWidth: ''
        }
    },

    created() {
        this.setCardSize = this.setCardSize.bind(this)
    },

    mounted() {
        this.setCardSize()
        window.addEventListener('resize', this.setCardSize)
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.setCardSize)
    },

    methods: {
        setCardSize() {
            let cardWidth = (this.$refs.list.offsetWidth - this.padding * 4) / 3
            this.cardWidth = cardWidth
        },

        onClickItem(item, idx) {
            this.$emit('clickItem', { ...item }, idx)
        }
    }
}
</script>

<style lang="scss" scoped>
    .font-preview-list-wrapper {
        box-sizing: border-box;
    }
</style>
