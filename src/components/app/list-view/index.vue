<template>
    <div class="theme-list-warapper" ref="listWrapper">
        <div class="swipe-to-load" ref="loader">
            <LoadingLoaderIcon small v-if="showRefreshLoading">{{loadMoreLoadingMessage}}</LoadingLoaderIcon>
            <span v-else>松手以刷新</span>
        </div>
        <component ref="list" :is="componentName" v-bind="$attrs" v-on="$listeners"/>
    </div>
</template>

<script>
import Loading from '@/components/app/loading'
import { parseTranslate } from '../../../utils'
import LoadingLoaderIcon from '@/components/app/loading-icon'
import ThemeList from './theme-list/list'
import FontList from '@/components/app/list-view/font-list/list'
import RingtoneList from '@/components/app/list-view/ringtone-list/list'

const componentMap = {
    theme: 'ThemeList',
    font: 'FontList',
    ringtone: 'RingtoneList'
}

export default {
    inheritAttrs: false,
    name: 'MIUIThemeList',
    components: { ThemeList, FontList, RingtoneList, Loading, LoadingLoaderIcon },
    props: {
        scrollObserveTarget: [Object, String],
        showRefreshLoading: {
            type: Boolean,
            default: false
        },
        type: String,
        enableSwipeToLoadMore: {
            type: Boolean,
            default: false
        },
        loadMoreLoadingMessage: {
            type: String,
            default: '加载中...'
        }
    },

    computed: {
        componentName() {
            return componentMap[this.$props.type] || ''
        }
    },

    mounted() {
        if (this.enableSwipeToLoadMore) {
            this.enableSwipeToLoadMoreListener()
        }
        this.loaderHeight = this.$refs.loader.offsetHeight * 1.5
        this.$refs.loader.style.top = `-${this.loaderHeight}px`
        this.touchMoveThreshold = this.loaderHeight * 2
        this.maxTouchMoveThreshold = this.loaderHeight * 2.5

        this.isAnimationPlaying = false
    },

    watch: {
        showRefreshLoading(show) {
            if (!show) {
                this.transitionBack()
            }
        }
    },

    methods: {
        isCanSwipe() {
            return !(
                !this.enableSwipeToLoadMore ||
                this.isAnimationPlaying ||
                this.showRefreshLoading
            )
        },
        getScrollObserveTarget() {
            let { scrollObserveTarget } = this
            let target = this.$refs.listWrapper
            let overflow = 'auto'
            if (typeof scrollObserveTarget === 'string') {
                let el = document.querySelector(scrollObserveTarget)
                if (el) {
                    target = el
                }
            }
            if (scrollObserveTarget instanceof HTMLElement) {
                target = scrollObserveTarget
            }
            if (target !== this.$refs.listWrapper) {
                overflow = ''
            }
            this.$refs.listWrapper.style.overflowY = overflow
            return target
        },

        transitionBack() {
            let elList = this.$refs.list.$el
            let elLoader = this.$refs.loader
            elList.style.transition = 'transform .25s ease'
            elList.style.transform = 'none'
            elLoader.style.transition = 'transform .25s ease'
            elLoader.style.transform = 'none'
            this.isAnimationPlaying = true
            setTimeout(() => {
                elList.style.transition = 'none'
                elLoader.style.transition = 'none'
                this.isAnimationPlaying = false
            }, 250)
        },

        enableSwipeToLoadMoreListener() {
            if (!this.loadMoreListenerEEnabled) {
                let scrollObserveTarget = null
                let elListWrapper = this.$refs.listWrapper
                let elList = this.$refs.list.$el
                let elLoader = this.$refs.loader
                let startY = 0
                let startX = 0
                let startPos = 0
                let moveDis = 0
                let isCanReload = false
                let isScrolling = false
                let isScrollingDown = false
                let touchDirectionLocked = false

                elListWrapper.addEventListener('touchstart', e => {
                    if (this.isCanSwipe()) {
                        startY = e.touches[0].pageY
                        startX = e.touches[0].pageX
                        startPos = parseTranslate(getComputedStyle(elList).transform).y
                        touchDirectionLocked = false
                        isScrolling = false
                        scrollObserveTarget = this.getScrollObserveTarget()
                        isCanReload = false
                    }
                })

                // swip down
                elListWrapper.addEventListener('touchmove', e => {
                    if (this.showRefreshLoading) {
                        console.log('阻止默认事件，否则会误触原生下拉刷新')
                        e.preventDefault()
                        e.stopPropagation()
                    }
                    if (this.isCanSwipe()) {
                        let curY = e.touches[0].pageY
                        let deltaY = startY - curY
                        let curX = e.touches[0].pageX
                        let deltaX = startX - curX
                        moveDis = deltaY
                        if (scrollObserveTarget.scrollTop > 0) {
                            moveDis = 0
                            return
                        }
                        if (!touchDirectionLocked) {
                            isScrolling = Math.abs(deltaY) > Math.abs(deltaX)
                            touchDirectionLocked = true
                            isScrollingDown = deltaY > 0
                            console.log(isScrollingDown, deltaY, deltaY > 0)
                        }
                        if (scrollObserveTarget.scrollTop <= 0 && !isScrollingDown) {
                            console.log('阻止默认事件，否则会误触原生下拉刷新')
                            e.preventDefault()
                            e.stopPropagation()
                        }
                        if (!this.showRefreshLoading &&
                            !this.isAnimationPlaying &&
                            deltaY < 0 &&
                            isScrolling &&
                            Math.abs(moveDis) <= this.maxTouchMoveThreshold &&
                            !isScrollingDown
                        ) {
                            let translateY = startPos - deltaY
                            let { touchMoveThreshold } = this
                            elList.style.transform = `translateY(${translateY}px)`
                            elLoader.style.transform = `translateY(${translateY >= touchMoveThreshold ? touchMoveThreshold : translateY}px)`
                            isCanReload = Math.abs(moveDis) >= touchMoveThreshold
                        }
                    }
                })

                elListWrapper.addEventListener('touchend', e => {
                    if (this.isCanSwipe()) {
                        if (
                            Math.abs(moveDis) >= this.touchMoveThreshold &&
                            moveDis < 0 &&
                            isCanReload
                        ) {
                            this.$emit('willLoadMore', this.$props.type)
                        } else {
                            this.transitionBack()
                        }
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .theme-list-warapper {
        $gapWidth: 15px;
        position: relative;
        overflow: hidden;

        .swipe-to-load {
            position: absolute;
            top: -30px;
            left: 0;
            width: 100%;
            text-align: center;
            color: var(--black50);
            font-size: 1.3rem;
        }

        .sub-wrapper {
            width: calc(100% / var(--colSize) - #{$gapWidth} / var(--colSize));
            box-sizing: border-box;
            &.left-wrapper {
                margin-right: $gapWidth;
            }
        }
    }
</style>
