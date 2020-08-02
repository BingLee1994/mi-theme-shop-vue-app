<script>

export default {
    name: 'SwiperActivityItem',
    props: {
        position: Number,
        visible: Boolean,
        extra: null
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
        this.index = this.position
    },
    mounted() {
        let width = this.$refs.itemWrapper.offsetWidth
        this.$refs.itemWrapper.style.width = width + 'px'
        this.$refs.itemWrapper.style.left = width * this.index + 'px'
    },
    render() {
        let child = this.$slots.default || []
        return (
            <div class="swiper-activity-item-wrapper" ref="itemWrapper">
                { /* if */ this.isVisible &&
                    child[0]
                }
            </div>
        )
    },
    methods: {
        setWidth(width) {
            this.$refs.itemWrapper.style.width = `${width}px`
            this.$refs.itemWrapper.style.left = (width * this.index) + 'px'
        },
        onShow() {
            let child = this.$slots.default || []
            if (child[0] && child[0].componentInstance && child[0].componentInstance.onShow) {
                child[0].componentInstance.onShow()
            }
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
