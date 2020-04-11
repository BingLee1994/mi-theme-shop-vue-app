<style lang="scss">
    @import "~@miui/component-style/base-dialog";
</style>

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
                <div class="content-wrapper">
                    <p class="title bold">{{title}}</p>
                    <p class="message">{{message}}</p>
                    <div>
                        <slot></slot>
                    </div>
                </div>
                <div class="button-wrapper">
                    <Button
                        widen
                        :style="customizedButtonStyle"
                        v-if="this.secondaryButtonOption"
                        @click="onClickButton(false)"
                    >
                        {{secondaryButtonOption.text}}
                    </Button>
                    <span class="divider"></span>
                    <Button widen
                        :style="customizedButtonStyle"
                        v-if="this.primaryButtonOption"
                        primary
                        @click="onClickButton()"
                    >
                        {{primaryButtonOption.text}}
                    </Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { isNone, callFunc } from '../utils'
import Button from '../buttons/button'

const DEFAULT_BUTTON = { text: '完成' }

export default {
    name: 'MIUI-Dialog',
    components: { Button },
    props: {
        title: String,
        message: String,
        primaryButton: {
            validator() {
                return true
            }
        },
        secondaryButton: {
            validator() {
                return true
            }
        }
    },
    data() {
        return {
            customizedButtonStyle: {
                flex: 1,
                margin: 0
            },
            isShow: false
        }
    },
    computed: {
        primaryButtonOption() {
            return this._makeButtonOption(this.$props.primaryButton)
        },
        secondaryButtonOption() {
            return this._makeButtonOption(this.$props.secondaryButton, false)
        }
    },
    methods: {
        _makeButtonOption(option, isPrimaty = true) {
            if (isNone(option)) return isPrimaty ? DEFAULT_BUTTON : null
            let buttonOption = {
                primary: isPrimaty
            }

            if (typeof option === 'string' || typeof option === 'number') {
                buttonOption.text = option
            }
            if (typeof option === 'object') {
                buttonOption = Object.assign({}, option, buttonOption)
            }
            return buttonOption
        },
        onClickButton(isPrimary = true) {
            this.isShow = false
            if (isPrimary) {
                return callFunc(this.confirm, this.$props.primaryButton)
            }
            callFunc(this.cancel, this.$props.secondaryButton)
        },
        onCloseAnimationEnd() {
            callFunc(!this.isShow ? this.closed : this.opened)
        }
    },
    mounted() {
        this.isShow = true
    }
}
</script>
