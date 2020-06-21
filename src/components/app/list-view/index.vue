<template>
    <div class="theme-list-warapper" ref="listWrapper">
        <div class="swipe-to-load" ref="loader">
            <LoadingLoaderIcon small v-if="showLoadMoreLoading">{{loadMoreLoadingMessage}}</LoadingLoaderIcon>
            <span v-else>松手以加载更多</span>
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
    name: 'MIUIThemeList',
    components: { ThemeList, FontList, RingtoneList, Loading, LoadingLoaderIcon },
    props: {
        showLoadMoreLoading: {
            type: Boolean,
            default: false
        },
        type: String,
        enableSwipeToLoadMore: {
            type: Boolean,
            default: true
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
        this.enableSwipeToLoadMoreListener()
        this.loaderHeight = this.$refs.loader.offsetHeight
        this.$refs.loader.style.top = `-${this.loaderHeight}px`
        this.touchMoveThreshold = this.loaderHeight * 2

        this.isAnimationPlaying = false
    },

    watch: {
        showLoadMoreLoading(show) {
            if (!show) {
                this.transitionBack()
            }
        }
    },

    methods: {
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
                let elListWrapper = this.$refs.listWrapper
                let elList = this.$refs.list.$el
                let elLoader = this.$refs.loader
                let startY = 0
                let startX = 0
                let startPos = 0
                let moveDis = 0
                let isScrolling = false
                let touchDirectionLocked = false

                elListWrapper.addEventListener('touchstart', e => {
                    startY = e.touches[0].pageY
                    startX = e.touches[0].pageX
                    startPos = parseTranslate(getComputedStyle(elList).transform).y
                    touchDirectionLocked = false
                    isScrolling = false
                })

                elListWrapper.addEventListener('touchmove', e => {
                    if (!this.enableSwipeToLoadMore) {
                        return
                    }
                    let curY = e.touches[0].pageY
                    let deltaY = startY - curY
                    let curX = e.touches[0].pageX
                    let deltaX = startX - curX
                    moveDis = Math.abs(deltaY)
                    if (!touchDirectionLocked) {
                        isScrolling = Math.abs(deltaY) > Math.abs(deltaX)
                        touchDirectionLocked = true
                    }
                    if (elListWrapper.scrollTop === 0 &&
                        !this.showLoadMoreLoading &&
                        !this.isAnimationPlaying &&
                        isScrolling
                    ) {
                        if (moveDis <= this.touchMoveThreshold) {
                            let translateY = startPos - deltaY
                            elList.style.transform = `translateY(${translateY}px)`
                            elLoader.style.transform = `translateY(${translateY}px)`
                        }
                    }
                })

                elListWrapper.addEventListener('touchend', e => {
                    if (!this.enableSwipeToLoadMore) {
                        return
                    }
                    if (moveDis >= this.touchMoveThreshold) {
                        this.$emit('willLoadMore', this.$props.type)
                    } else {
                        this.transitionBack()
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
        overflow: hidden auto;

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
