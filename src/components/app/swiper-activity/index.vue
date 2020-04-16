<template>
    <div class="swiper-activity-wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'SwiperActivity',
    created() {
        this.$slots.default[0].componentOptions.propsData.position = { position: 1 }
    },
    mounted() {
    },
    updated() {
    },
    methods: {
    }
}
</script>

<style scoped lang="scss">
    .swiper-activity-wrapper {
        width: 100%;
        height: 100%;
        min-width: 200px;
        min-height: 200px;
        position: relative;
        -webkit-overflow-scrolling: auto;
        border: 1px solid black;
        box-sizing: border-box;
    }
</style>
