<template>
    <div class="swiper-activity-item-wrapper" ref="itemWrapper">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'SwiperActivityItem',
    props: {
        position: Number,
        visible: Boolean
    },
    data() {
        return {
            isVisible: this.$props.visible
        }
    },
    created() {
        if (
            !this.$parent ||
            !this.$parent._isVue ||
            this.$parent.$options.name !== 'SwiperActivity'
        ) {
            throw new Error('SwiperActivityItem can only be the child node of SwiperActivity.')
        }
        this.child = this.$slots.default
        this.$slots.default = []
        this.childMounted = false
    },
    mounted() {
        let width = this.$refs.itemWrapper.offsetWidth
        this.$refs.itemWrapper.style.width = width + 'px'
        this.$refs.itemWrapper.style.left = width * this.position + 'px'

        if (this.isVisible) {
            this._mountChild()
        }
    },
    methods: {
        _mountChild() {
            this.$slots.default = this.child
            this.childMounted = true
            this.$forceUpdate()
        }
    }
}
</script>

<style scoped lang="scss">
    .swiper-activity-item-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: hidden auto;
    }
</style>
