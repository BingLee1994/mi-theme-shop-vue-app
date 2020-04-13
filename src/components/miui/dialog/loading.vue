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
            <div class="dialog" v-show="isShow">
                <span class="loader"></span>
                <span class="message">{{message}}</span>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'MIUI-LoadingDialog',
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
