<template>
    <span
        class="lazy-img-wrapper"
        :style="{
            backgroundColor: placeholder,
            display: block? 'block': ''
        }"
        ref="placeholder"
        v-on="$listeners"
    >
        <img
            class="lazy-img"
            ref="img"
            @load="onImgLoaded"
            :style="{
                objectFit: fitContain? 'contain': (fitCover? 'cover': ''),
                transitionDuration: transitionDuration + 's',
                display: block? 'block': ''
            }"
        />
    </span>
</template>

<script>
const THRESHOLD = 0.5
const BG_COLOR = ['#E8F6F6', '#EFF1FE', '#FFF5EC', '#FAFEF0', '#FFECFD']
const transitionDuration = 0.2

export default {
    name: 'SimpleLazyLoadImg',
    props: {
        fitCover: Boolean,
        fitContain: Boolean,
        src: {
            type: String,
            required: true
        },
        root: [HTMLElement, String],
        margin: Number,
        threshold: {
            type: Number,
            default: THRESHOLD,
            validator(val) {
                return val >= 0 && val <= 1
            }
        },
        block: Boolean
    },

    data() {
        let random = Math.floor(Math.random() * BG_COLOR.length)
        return {
            placeholder: BG_COLOR[random],
            transitionDuration
        }
    },

    watch: {
        src(newVal) {
            let { img } = this.$refs
            if (this.visible) {
                img.setAttribute('src', newVal)
            } else {
                img.removeAttribute('src')
            }
        }
    },

    mounted() {
        let { root, margin, $refs: { img }, threshold } = this
        if (typeof root === 'string') {
            root = document.querySelector(root)
        }
        let option = {
            root,
            margin,
            threshold
        }
        this.visible = false
        this.observer = new IntersectionObserver(this.onIntersectionChange, option)
        this.observer.observe(img)
    },

    methods: {
        onImgLoaded({ target }) {
            target.style.opacity = 1
            this.$refs.placeholder && (this.$refs.placeholder.style.backgroundColor = '')
        },

        onIntersectionChange(e) {
            let current = e[0]
            let { target: el, intersectionRatio } = current
            this.sizeWarn(el)
            let { threshold } = this
            this.visible = intersectionRatio >= threshold
            if (this.visible &&
                !el.getAttribute('src') &&
                this.$props.src
            ) {
                el.setAttribute('src', this.$props.src)
            }
        },

        sizeWarn(el) {
            let { offsetWidth, offsetHeight } = el
            if (offsetWidth === 0 || offsetHeight === 0) {
                console.warn('The width or height of the image is 0, it may always be visible in the container, you may set a specific width or height for the image.')
            }
        }
    },

    destroyed() {
        this.observer.disconnect()
        this.observer = null
    }
}
</script>

<style scoped lang="scss">
    .lazy-img-wrapper {
        display: inline-block;
        overflow: hidden;
    }
    .lazy-img {
        opacity: 0;
        transition: opacity .2s ease;
        width: 100%;
        height: 100%;

        &[src=""], &:not([src]){
            opacity:0;
        }
    }
</style>
