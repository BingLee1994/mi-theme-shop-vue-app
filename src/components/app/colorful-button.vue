<template>
    <button
        :class="{
            'colorful-button': true,
            'dark-mode': darkmode,
            'plain': plain,
            'small': small,
            'tiny': tiny
        }"
        v-on="$listeners"
        ref="button"
    >
        <slot></slot>
    </button>
</template>

<script>
const defaultColor = ['#d1d3eb', '#a9a4f1', '#9fd0cf', '#e3c8ab', '#efb7e9', '#bbcaa1', '#ffafaf', '#a1c9a9']
const tinyScale = 0.8

export default {
    name: 'ColorfulButton',
    props: {
        plain: Boolean,
        darkmode: Boolean,
        small: Boolean,
        tiny: Boolean,
        color: {
            type: String,
            default() {
                return defaultColor[Math.floor(Math.random() * defaultColor.length + 1)]
            }
        }
    },
    mounted() {
        this._setColor()
    },
    updated() {
        this._setColor()
    },
    methods: {
        _setColor() {
            let elButton = this.$refs.button
            if (this.$props.color) {
                elButton.style.setProperty('--accent-color', this.$props.color)
            }
            if (this.$props.tiny) {
                let { offsetWidth, offsetHeight } = elButton
                elButton.style.transform = `scale(${tinyScale})`
                elButton.style.marginRight = `${3 + offsetWidth * (tinyScale - 1)}px`
                elButton.style.transform = `${3 + offsetHeight * (tinyScale - 1)}px`
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .colorful-button {
        $normalHeight: 3rem;
        $smallHeight:2.5rem;

        --accent-color: rgb(160, 208, 208);
        transform-origin: left top;
        height: $normalHeight;
        line-height: 1;
        text-align: center;
        padding: 0 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0 1px var(--accent-color);
        box-sizing: border-box;
        color: rgba(0,0,0,.7);
        font-size: 1.3rem;
        position: relative;
        overflow: hidden;
        margin: 3px;
        &::before {
            content: '';
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background: var(--accent-color);
            z-index: -1;
            filter: brightness(1.3) saturate(70%);
        }
        &:active {
            &::before {
                filter: saturate(60%) brightness(1); // brightness(1.2) saturate(40%);
            }
        }
        &.plain {
            background: none;
            color: var(--accent-color) !important;
            &::before {
                display: none;
            }
            &:active {
                background: var(--black05);
            }
        }
        &.small {
            height: $smallHeight;
            font-size: 1.2rem;
        }
        &.dark-mode {
            color: rgba(255,255,255,.9);
        }
        &.tiny {
            padding: 3px;
            border: 3px;
            font-size: 1.2rem;
            height: initial;
        }
    }
</style>
