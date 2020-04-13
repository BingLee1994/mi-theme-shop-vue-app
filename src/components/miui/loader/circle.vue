<template>
    <svg
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        :width="size"
        :height="size"
        :viewBox="`0 0 ${c*2} ${c*2}`"
        xml:space="preserve">
        <circle
            :cx="c"
            :cy="c"
            :r="r"
            fill="none"
            opacity=".3"
            :stroke="color"
            :stroke-width="stroke"
        />
        <circle class="loading"
            stroke-dasharray="20 1000"
            :cx="c"
            :cy="c"
            :r="r"
            fill="none"
            :stroke="color"
            :stroke-width="stroke"
        >
            <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                :from="`0 ${c} ${c}`"
                :to="`360 ${c} ${c}`"
                :dur="speedVal"
                repeatCount="indefinite"
            >
            </animateTransform>
        </circle>
    </svg>
</template>

<script>
export default {
    name: 'MIUI-Circle-Loader',
    props: {
        speed: Number,
        color: {
            type: String,
            default: '#0099ff'
        },
        size: {
            type: [Number, String],
            default: '40px'
        },
        stroke: {
            type: Number,
            default: 6
        }
    },
    computed: {
        speedVal() {
            let { speed } = this.$props
            speed = String(speed)
            switch (speed) {
                case '0':
                    return '3.5s'
                case '1':
                    return '1.8s'
                default:
                    return '.9s'
            }
        },
        c() {
            let { stroke } = this.$props
            return 20 + stroke
        },
        r() {
            let { stroke } = this.$props
            return 20 + stroke / 2
        }
    }
}
</script>
