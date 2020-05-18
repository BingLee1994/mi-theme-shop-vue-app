<template>
    <div
        class="swiper-wrapper"
        ref="wrapper"
    >
        <div
            class="sub-wrapper"
            ref="subWrapper"
            :style="{
                transform: `translateX(${position}px)`,
                width: `${width*length}px`,
                height: `${height}px`
            }"
        >
            <a
                class="item"
                v-for="(item, index) in swiperItems"
                :key="item.id"
                :style="{
                    left: `${index*width}px`,
                    width: `${width}px`
                }"
            >
                <img :ref="`img_${index}`"/>
            </a>
        </div>
        <p
            :class="{
                'indicator-wrapper': true,
                'indicator-wrapper_dark': darkIndicator
            }"
        >
            <span
                v-for="count in indicatorLength"
                :class="{
                    indicator: true,
                    'indicator_focused': (count-1) === actualIndex
                }"
                :key="count"
                :style="{
                    backgroundColor: indicatorColor
                }"
            >
            </span>
        </p>
    </div>
</template>

<script>
import { pickRandomItem } from '@/utils'
const MOVE_LEFT = 0
const MOVE_RIGHT = 1
const ANI_DURATION = 0.25
const MOVE_THRESHOLD = 20 / 100
const DEFAULT_INTERVAL_DURATION = 3 * 1000
const DEFAULT_MAX_INTERVAL_DURATION = 10 * 1000
const BG_COLOR = ['#E8F6F6', '#EFF1FE', '#FFF5EC', '#FAFEF0', '#FFECFD']
const VISIBILITY_THRESHOLD = 0.5
const TYPE_DATA_CHANGE = 0
const TYPE_WIDTH_CHANGE = 1
const RESIZE_DEBOUNCE_TIMER = 200

export default {
    name: 'Swiper',
    props: {
        name: String,
        items: {
            type: Array,
            default: () => [],
            required: true
        },
        duration: {
            type: Number,
            default: DEFAULT_INTERVAL_DURATION,
            validator(val) {
                if (val < DEFAULT_INTERVAL_DURATION || val > DEFAULT_MAX_INTERVAL_DURATION) {
                    throw new Error('Invalid duration, the duration must be in [3s, 10s].')
                }
                return true
            }
        },
        darkIndicator: Boolean,
        indicatorColor: String
    },

    data() {
        return {
            position: 0,
            width: 0,
            height: 0,
            length: this.$props.items.length,
            index: 0
        }
    },

    computed: {
        enableCircle() {
            return this.$props.items.length >= 2
        },

        indicatorLength() {
            return this.$props.items.length
        },

        swiperItems() {
            let swiperItems = []
            let length = this.$props.items.length
            for (let i = 0; i < length; i++) {
                swiperItems.push(this.items[i])
            }
            if (length >= 2) {
                swiperItems.push(this.items[0])
                swiperItems.unshift(this.items[length - 1])
            }
            return swiperItems
        },

        isIndexAtCircleEdge() {
            return this.enableCircle && (
                this.index === this.$props.items.length + 1 ||
                this.index === 0
            )
        },

        actualIndex() {
            let { index, swiperItems } = this
            if (this.enableCircle) {
                index = index - 1
                index = index === swiperItems.length - 2 ? 0 : index
            }
            return index
        }
    },

    watch: {
        actualIndex() {
            this.$emit('change', this.actualIndex)
        },

        items(newProp, oldProp) {
            this.requireReorder = newProp.length !== oldProp.length
        }
    },

    created() {
        if (this.enableCircle) {
            this.index = 1
            this.length = this.swiperItems.length
        }
    },

    mounted() {
        this.animationPlaying = false
        this.autoPlayTimerId = null

        this._setSize()

        this.$refs.wrapper.style.width = this.width + 'px'
        if (this.enableCircle) {
            this.position = -this.width
        }

        this._lazyLoadImgIfNeed()
        this._enabledTouchListener()
        this._startAutoPlayIfNeed()
        this._genRandomColorfulBg()
        this._enableWrapperIntersectionObserver()

        document.addEventListener('visibilitychange', e => {
            this._handleComponentVisibility(document.visibilityState === 'visible')
        })

        window.addEventListener('resize', this._adjustSwiperUIonResize)
    },

    updated() {
        if (this.requireReorder) {
            this.length = this.swiperItems.length
            this._adjustSwiperUI(TYPE_DATA_CHANGE)
            this.requireReorder = false
        }
    },

    methods: {
        _setSize() {
            this.$refs.wrapper.style.width = ''
            let { offsetWidth, offsetHeight } = this.$refs.wrapper
            this.width = offsetWidth
            this.height = offsetHeight
            this.rightBoundary = (-1 * offsetWidth * (Math.max(this.length, 1) - 1))
            this.$refs.wrapper.style.width = this.width + 'px'
        },

        _adjustSwiperUIonResize() {
            clearTimeout(this.resizeDebounceTimer)
            this.resizeDebounceTimer = setTimeout(() => {
                this._adjustSwiperUI(TYPE_WIDTH_CHANGE)
            }, RESIZE_DEBOUNCE_TIMER)
        },

        async _adjustSwiperUI(changeType) {
            this._stopAutoPlay()
            switch (changeType) {
                case TYPE_DATA_CHANGE:
                    this.index = 0
                    this.position = 0
                    if (this.enableCircle) {
                        this.index = 1
                        this.position = -this.width
                    }
                    break
                case TYPE_WIDTH_CHANGE: {
                    if (this.animationPlaying) {
                        this.$refs.subWrapper.style.transition = ''
                    }
                    this._setSize()
                    this.position = -this.width * this.index
                    break
                }
            }
            this.rightBoundary = (-1 * this.width * (Math.max(this.length, 1) - 1))
            this._lazyLoadImgIfNeed()
            this._genRandomColorfulBg()
            this._startAutoPlayIfNeed()
        },

        _enabledTouchListener() {
            let { wrapper } = this.$refs
            let startX = 0
            let startPosition = this.position
            let delta = 0
            let passive = { passive: false }

            wrapper.addEventListener('touchstart', e => {
                delta = 0
                startX = e.touches[0].clientX
                startPosition = this.position
                this._stopAutoPlay()
            }, passive)

            wrapper.addEventListener('touchmove', e => {
                if (this.animationPlaying) return

                delta = e.touches[0].clientX - startX
                let newPosition = startPosition + delta

                if (newPosition <= 0 && newPosition >= this.rightBoundary) {
                    this.position = newPosition
                } else {
                    delta = 0
                }
                e.stopPropagation()
                e.preventDefault()
            }, passive)

            let stopTouch = e => {
                if (delta === 0 || this.animationPlaying) return

                let { index, width } = this
                let direction = MOVE_RIGHT
                let targetPosition = startPosition
                let targetIndex = index

                if (delta > 0) {
                    direction = MOVE_LEFT
                }

                if (Math.abs(delta) > this.width * MOVE_THRESHOLD) {
                    let next = direction === MOVE_RIGHT ? 1 : -1
                    targetIndex = (index + next)
                    targetPosition = -1 * targetIndex * width
                }
                this._swipeToWithAnimation(targetIndex, targetPosition).then(_ => {
                    this._startAutoPlayIfNeed()
                })
            }

            wrapper.addEventListener('touchend', stopTouch, passive)
            wrapper.addEventListener('touchcancel', stopTouch, passive)
            this.touchListenerEnabled = true
        },

        _enableWrapperIntersectionObserver() {
            let wrapper = this.$refs.wrapper
            let option = {
                threshold: VISIBILITY_THRESHOLD
            }
            let handleChange = e => {
                let { intersectionRatio } = e[0]
                this._handleComponentVisibility(intersectionRatio >= VISIBILITY_THRESHOLD)
            }
            this.observer = new IntersectionObserver(handleChange, option)
            this.observer.observe(wrapper)
        },

        _handleComponentVisibility(visible) {
            if (visible) {
                this._startAutoPlayIfNeed()
            } else {
                this._stopAutoPlay()
            }
        },

        _genRandomColorfulBg() {
            let { subWrapper } = this.$refs
            let children = subWrapper.children
            Array.prototype.forEach.call(children, item => {
                let color = pickRandomItem(BG_COLOR, 1)[0]
                item.style.backgroundColor = color
            })
        },

        _startAutoPlayIfNeed() {
            if (!this.autoPlayTimerId && this.length >= 2) {
                this.autoPlayTimerId = setInterval(this._autoPlayTimer.bind(this), this.duration)
            }
        },

        _stopAutoPlay() {
            clearInterval(this.autoPlayTimerId)
            this.autoPlayTimerId = null
        },

        _autoPlayTimer() {
            let { index } = this
            this._swipeTo(++index)
        },

        _quickShift() {
            let { index, swiperItems } = this
            let targetIndx = index === swiperItems.length - 1 ? 0 + 1 : swiperItems.length - 1 - 1
            this.index = targetIndx
            this.position = -1 * targetIndx * this.width
        },

        async _swipeToWithAnimation(targetIndex, targetPosition) {
            await this._playTransitionAnimation(targetIndex, targetPosition)
            this._lazyLoadImgIfNeed()
            if (this.isIndexAtCircleEdge) {
                this._quickShift()
            }
            return true
        },

        _playTransitionAnimation(targetIndex, targetPosition) {
            return new Promise(resolve => {
                if (!this.$refs.subWrapper) {
                    return this._stopAutoPlay()
                }
                this.$refs.subWrapper.style.transition = `transform ${ANI_DURATION}s ease`
                this.animationPlaying = true
                this.position = targetPosition

                setTimeout(() => {
                    this.animationPlaying = false
                    this.$refs.subWrapper.style.transition = ''
                    if (this.index !== targetIndex) {
                        this.index = targetIndex
                    }
                    resolve()
                }, ANI_DURATION * 1000)
            })
        },

        _lazyLoadImgIfNeed() {
            let { index, length, swiperItems: items, $refs } = this
            if (length === 0) return
            index = Math.abs(index)
            let curImg = $refs[`img_${index}`][0]
            let currentBg = curImg.style.backgroundImage
            if (!currentBg) {
                curImg.style.backgroundImage = `url(${items[index].imgUrl})`
                curImg.style.opacity = 1
            }
        },

        _swipeTo(index) {
            index = Math.floor(index)
            if (isNaN(index)) return
            if (index >= 0 && index < this.length && index !== this.index) {
                let targetPosition = -index * this.width
                this._swipeToWithAnimation(index, targetPosition)
            }
        }
    },

    destroyed() {
        this._stopAutoPlay()
        if (this.observer) {
            this.observer.disconnect(this.$refs.wrapper)
            this.observer = null
        }
        window.removeEventListener('resize', this._adjustSwiperUIonResize)
    }
}
</script>

<style scoped lang="scss">
    .swiper-wrapper {
        min-width: 200px;
        min-height: 100px;
        position: relative;
        -webkit-overflow-scrolling: auto;
        box-sizing: border-box;
        overflow: hidden;
        touch-action: pan-x;

        .item {
            display: inline-block;
            text-align: center;
            overflow: hidden;
            position: absolute;
            width: 375px;
            height: 100%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                transition: opacity .2s ease;
                opacity: 0;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        }
        .indicator-wrapper {
            --background-color: white;
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            text-align: center;
            overflow: auto hidden;
            &_dark {
                --background-color: black;
            }
            .indicator {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 3px;
                background-color:var(--background-color);
                opacity: .3;
                margin: 0 3px;

                &_focused {
                    opacity: .8 !important;
                }
            }
        }
    }
</style>
