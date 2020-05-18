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
                    <p class="message" v-if="message">{{message}}</p>
                    <div>
                        <slot></slot>
                    </div>
                </div>
                <div class="button-wrapper">
                    <Button
                        widen
                        :style="customizedButtonStyle"
                        v-if="secondaryButtonOption"
                        @click="onClickButton(false)"
                        :disabled="disableSecondaryButton"
                    >
                        {{secondaryButtonOption.text}}
                    </Button>
                    <span class="divider"></span>
                    <Button widen
                        :style="customizedButtonStyle"
                        v-if="primaryButtonOption"
                        primary
                        @click="onClickButton()"
                        :disabled="disablePrimaryButton"
                    >
                        {{primaryButtonOption.text}}
                    </Button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { isNone, callFunc, isFunc } from '../utils'
import Button from '../buttons/button'
import darkMode from '@/mixins/dark-mode'

const DEFAULT_BUTTON = { text: '完成' }

export default {
    name: 'MIUI-Dialog',
    components: { Button },
    mixins: [darkMode],
    props: {
        title: [String, Number],
        message: [String, Number],
        primaryButton: [String, Object],
        secondaryButton: [String, Object]
    },
    data() {
        let { primaryButton, secondaryButton } = this.$props
        return {
            customizedButtonStyle: {
                flex: 1,
                margin: 0
            },
            isShow: false,
            disablePrimaryButton: !isNone(primaryButton) && primaryButton.disabled,
            disableSecondaryButton: !isNone(secondaryButton) && secondaryButton.disabled
        }
    },
    computed: {
        darkModeClass() {
            return 'dark-mode'
        },
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
                primary: isPrimaty,
                disabled: false
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
            if (isFunc(this.beforeConfirm) && isPrimary) {
                let proceed = this.beforeConfirm(this.$props.primaryButton)
                if (proceed === false) return
            }

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
