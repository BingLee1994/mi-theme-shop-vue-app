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

export default {
    name: 'SwiperActivity',
    created() {
        let slots = this.$slots.default
        let validChild = []
        this.items = []
        if (slots) {
            slots.forEach(s => {
                // 这里是VNode哦，在created里，此时组件实例还未完成
                if (s.componentOptions && s.componentOptions.Ctor.options.name === 'SwiperActivityItem') {
                    validChild.push(s)
                }
            })
        }
        validChild.map((c, idx) => {
            c.componentOptions.propsData = {
                position: idx,
                visible: idx === 0
            }
        })
        this.$slots.default = validChild
        this.length = validChild.length
    },
    mounted() {
        if (this.$slots.default) {
            // 这里是VNode中的instance已经创建
            this.$slots.default.forEach(s => this.items.push(s.componentInstance))
        }
        let { offsetWidth, offsetHeight } = this.$refs.wrapper
        this.width = offsetWidth
        this.index = 0
        this.position = 0
        this.animationPlaying = false

        this.$refs.subWrapper.style.width = offsetWidth * this.length + 'px'
        this.$refs.subWrapper.style.height = offsetHeight + 'px'

        this.rightBoundary = (-1 * offsetWidth * (Math.max(this.length, 1) - 1))
        this._enableSwipeListener()
    },
    methods: {
        _enableSwipeListener() {
            let { wrapper } = this.$refs
            let startX = 0
            let startY = 0
            let startPosition = this.position
            let delta = 0

            wrapper.addEventListener('touchstart', e => {
                if (this.animationPlaying) return
                delta = 0
                startX = e.touches[0].clientX
                startY = e.touches[0].clientY
                startPosition = this.position
            })

            wrapper.addEventListener('touchmove', e => {
                if (this.animationPlaying) return

                delta = e.touches[0].clientX - startX
                let deltaY = Math.abs(e.touches[0].clientY - startY)
                let newPosition = startPosition + delta

                if (newPosition <= 0 && newPosition >= this.rightBoundary) {
                    if (Math.abs(delta) > deltaY) {
                        this.position = newPosition
                        this._translateSubWrapper()
                    }
                } else {
                    if (Math.abs(delta) > deltaY) {
                        e.preventDefault()
                    }
                    delta = 0
                }
                e.stopPropagation()
                if (Math.abs(delta) > deltaY) {
                    e.preventDefault()
                }
            })

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
                    let next = direction === MOVE_RIGHT ? -1 : 1
                    targetIndex = (index + next)
                    targetPosition = targetIndex * width
                }
                this._swipeTo(targetIndex, targetPosition)
            }

            wrapper.addEventListener('touchend', stopTouch)
            wrapper.addEventListener('touchcancel', stopTouch)
        },

        _swipeTo(index, position) {
            this.position = position

            this.$refs.subWrapper.style.transition = `transform ${ANI_DURATION}s ease`
            this._translateSubWrapper()
            this.animationPlaying = true

            setTimeout(() => {
                this.animationPlaying = false
                this.$refs.subWrapper.style.transition = ''
                if (this.index !== index) {
                    this.index = index
                    this._notifyIndexChange()
                }
            }, ANI_DURATION * 1000)
        },

        _notifyIndexChange() {
            let { index, items } = this
            let curItem = items[-index]
            // 不可以直接修改prop
            if (!curItem.isVisible) {
                curItem._mountChild()
                curItem.isVisible = true
            }
            this.$emit('indexChange', index, curItem.$attrs.name)
        },

        _translateSubWrapper() {
            this.$refs.subWrapper.style.transform = `translateX(${this.position}px)`
        },

        swipeTo(index) {
            index = Math.floor(index)
            if (isNaN(index)) return
            if (index >= 0 && index < this.length && index !== this.index) {
                let targetPosition = -index * this.width
                this._swipeTo(-index, targetPosition)
            }
        }
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
        box-sizing: border-box;
        overflow: hidden;
        touch-action: pan-x;
    }
</style>
