<template>
    <div class="swiper-activity-item-wrapper" ref="itemWrapper">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'SwiperActivity',
    props: {
        position: Number
    },
    created() {
        if (
            !this.$parent ||
            !this.$parent._isVue ||
            this.$parent.$options.name !== 'SwiperActivity'
        ) {
            throw new Error('SwiperActivityItem can only be the child node of SwiperActivity.')
        }
        // let containerWidth = this.$parent.getWidth()
    },
    mounted() {
    },
    updated() {
    },
    methods: {
        _setPosition(idx = 0) {
            this.$refs.itemWrapper.style.left = 1
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
