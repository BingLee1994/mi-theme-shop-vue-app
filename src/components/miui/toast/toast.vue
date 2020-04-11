<style lang="scss">
    @import "~@miui/component-style/toast";
</style>

<template>
    <transition
        name="miui-toast-ani"
        @after-leave="closed"
    >
        <div
            class="miui-toast"
            v-if="isShow"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import { callFunc } from '../utils'
const DURATION_SHORT = 1.5
const DURATION_LONG = 3

export default {
    name: 'MIUI-Toast',
    props: {
        duration: Number
    },
    data() {
        return {
            isShow: false
        }
    },
    mounted() {
        this.isShow = true
        let duration = this.$props.duration === 1 ? DURATION_LONG : DURATION_SHORT
        setTimeout(() => {
            this.isShow = false
        }, duration * 1000)
    },
    methods: {
        closed() {
            callFunc(this.closed)
        }
    }
}
</script>
