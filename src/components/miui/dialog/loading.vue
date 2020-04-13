<template>
    <div
        :class="{
            'miui-dialog-wrapper': true,
            'miui-dialog-wrapper_hidden': !isShow
        }"
    >
        <transition
            name="miui-dialog-translucent-background"
            @after-leave="onCloseAnimationEnd"
        >
            <div class="background" v-show="isShow"></div>
        </transition>
        <transition name="miui-dialog">
            <div class="dialog loading-dialog" v-show="isShow">
                <span class="loader circle-loader">
                    <CircleLoader :speed="0"/>
                </span>
                <span class="message">{{message}}</span>
            </div>
        </transition>
    </div>
</template>

<script>
import { callFunc } from '../utils'
import CircleLoader from '../loader/circle'

export default {
    name: 'MIUI-LoadingDialog',
    components: { CircleLoader },
    props: {
        message: [String, Number]
    },
    data() {
        return { isShow: false }
    },
    methods: {
        onCloseAnimationEnd() {
            callFunc(!this.isShow ? this.closed : this.opened)
        }
    },
    mounted() {
        this.isShow = true
    }
}
</script>
