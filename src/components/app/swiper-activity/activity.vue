<template>
    <div class="swiper-activity-wrapper" ref="wrapper">
        <div class="sub-wrapper" ref="subWrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
const MOVE_LEFT = 0
const MOVE_RIGHT = 1
const ANI_DURATION = 0.25
const MOVE_THRESHOLD = 0.2
const RESIZE_DEBOUNCE_TIMER = 200

export default {
    name: 'SwiperActivity',
    props: {
        selected: Number
    },
    watch: {
        selected(index, oldIndex) {
            if (index !== oldIndex) {
                let selected = Math.floor(this.$props.selected)
                if (selected >= 0 && selected < this.length) {
                    this.swipeTo(index)
                }
            }
        }
    },
    created() {
        let slots = this.$slots.default
        let validChild = []
        this.items = []
        if (slots) {
            slots.forEach(s => {
                // 这里是VNode，在created里，此时组件实例还未完成
                if (s.componentOptions && s.componentOptions.Ctor.options.name === 'SwiperActivityItem') {
                    validChild.push(s)
                }
            })
        }
        validChild.map((c, idx) => {
            // 这里可以对propsData进行修改， propsData就是父组件传入的props，此时还未创建indtance
            let originProps = c.componentOptions.propsData
            c.componentOptions.propsData = Object.assign(
                originProps,
                {
                    position: idx,
                    visible: false
                }
            )
        })
        this.$slots.default = validChild
        this.length = validChild.length
    },

    mounted() {
        if (this.$slots.default) {
            // 这里是VNode中的instance已经创建
            this.$slots.default.forEach(s => this.items.push(s.componentInstance))
        }
        this.index = 0
        this.position = 0
        this.animationPlaying = false

        this._setSize()

        let selected = Math.floor(this.$props.selected)
        if (selected >= 0 && selected < this.length) {
            this.position = (-1 * this.width * selected)
            this.index = selected
            this._translateSubWrapper()
        }

        this._enableSwipeListener()
        this._showItem(false)
        window.addEventListener('resize', this._adjustSwiperUIonResize)
    },

    methods: {
        _setSize() {
            let { offsetWidth, offsetHeight } = this.$refs.wrapper
            this.width = offsetWidth
            this.$refs.subWrapper.style.width = offsetWidth * this.length + 'px'
            this.$refs.subWrapper.style.height = offsetHeight + 'px'
            this.rightBoundary = (-1 * offsetWidth * (Math.max(this.length, 1) - 1))
        },

        _adjustSwiperUIonResize() {
            clearTimeout(this.resizeDebounceTimer)
            this.resizeDebounceTimer = setTimeout(() => {
                this._setSize()
                this.items.forEach(item => {
                    item.setWidth(this.width)
                })
                if (this.animationPlaying) {
                    this.$refs.subWrapper.transition = ''
                }
                this.position = -1 * this.index * this.width
                this._translateSubWrapper()
            }, RESIZE_DEBOUNCE_TIMER)
        },

        _enableSwipeListener() {
            let { wrapper } = this.$refs
            let startX = 0
            let startY = 0
            let startPosition = this.position
            let delta = 0
            let isScolling = false
            let lock = false // scroll锁，防止水平移动误触scroll
            let passive = { passive: false }
            let stop = e => {
                if (e.cancelable) {
                    e.preventDefault()
                }
                e.stopPropagation()
            }

            wrapper.addEventListener('touchstart', e => {
                delta = 0
                isScolling = false
                lock = false
                startX = e.touches[0].clientX
                startY = e.touches[0].clientY
                startPosition = this.position
            }, passive)

            wrapper.addEventListener('touchmove', e => {
                if (this.animationPlaying) return
                e.stopPropagation()
                // let { index } = this

                delta = e.touches[0].clientX - startX
                let deltaY = Math.abs(e.touches[0].clientY - startY)

                // 此时还未判定是否是scroll
                if (!lock) {
                    /* let whichActivityEl = this.$refs.subWrapper.children[index]
                    if (whichActivityEl) {
                        let { scrollHeight, offsetHeight } = whichActivityEl
                        if (scrollHeight <= offsetHeight) {
                            // 元素根本就没有滚动条，从而不存在滚动行为
                            isScolling = false
                            lock = true
                            return
                        }
                    } */
                    setTimeout(() => {
                        // 判断垂直滑动距离是否大于水平滑动距离
                        if (deltaY >= delta && deltaY >= 5) {
                            if (!lock) {
                                // 如果是的话，认定为scroll，且在此事件中禁止修改
                                isScolling = true
                            }
                        }
                        lock = true
                    })
                    return
                }

                if ((lock && isScolling)) {
                    // 已经锁定了scroll，直接return，即不处理水平移动
                    delta = 0
                    return
                }

                stop(e)

                let newPosition = startPosition + delta
                if (newPosition <= 0 && newPosition >= this.rightBoundary) {
                    this.position = newPosition
                    this._translateSubWrapper()
                } else {
                    delta = 0
                }
            }, passive)

            let stopTouch = e => {
                if (delta === 0 || this.animationPlaying) return
                lock = false
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
                this._swipeTo(targetIndex, targetPosition)
            }

            wrapper.addEventListener('touchend', stopTouch, passive)
            wrapper.addEventListener('touchcancel', stopTouch, passive)
        },

        _swipeTo(index, position) {
            this.position = position

            this.$refs.subWrapper.style.transition = `transform ${ANI_DURATION}s ease`
            this.animationPlaying = true
            this._translateSubWrapper()

            setTimeout(() => {
                this.animationPlaying = false
                this.$refs.subWrapper.style.transition = ''
                if (this.index !== index) {
                    this.index = index
                    this._showItem()
                }
            }, ANI_DURATION * 1000)
        },

        _showItem(emit = true) {
            let { index, items } = this
            index = Math.abs(index)
            let curItem = items[Math.abs(index)]
            // 不可以直接修改prop
            if (curItem) {
                if (!curItem.isVisible) {
                    curItem.isVisible = true
                } else {
                    curItem.onShow()
                }
            }
            let extraData = curItem.$props ? curItem.$props.extra : null
            emit && this.$emit('indexChange', index, extraData)
        },

        _translateSubWrapper() {
            this.$refs.subWrapper.style.transform = `translateX(${this.position}px)`
        },

        swipeTo(index) {
            index = Math.floor(index)
            if (isNaN(index)) return
            if (index >= 0 && index < this.length && index !== this.index) {
                let targetPosition = -index * this.width
                this._swipeTo(index, targetPosition)
            }
        }
    },

    destroyed() {
        window.removeEventListener('resize', this._adjustSwiperUIonResize)
    }
}
</script>

<style scoped lang="scss">
    .swiper-activity-wrapper {
        width: 100%;
        min-width: 200px;
        min-height: 200px;
        position: relative;
        -webkit-overflow-scrolling: auto;
        box-sizing: border-box;
        overflow: hidden;
        touch-action: pan-x;
    }
</style>
