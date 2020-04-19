<template>
    <button
        :class="{
            'colorful-button': true,
            'dark-mode': darkmode
        }"
        v-on="$listeners"
        ref="button"
    >
        <slot></slot>
    </button>
</template>

<script>
const defaultColor = ['#d1d3eb', '#a9a4f1', '#9fd0cf', '#e3c8ab', '#efb7e9', '#bbcaa1', '#ffafaf', '#a1c9a9']

export default {
    name: 'ColorfulButton',
    props: {
        darkmode: Boolean,
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
            if (this.$props.color) {
                this.$refs.button.style.setProperty('--color', this.$props.color)
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .colorful-button {
        --color: rgb(160, 208, 208);
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        padding: 0 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0 1px inset var(--color);
        box-sizing: border-box;
        color: rgba(0,0,0,.7);
        font-size: 1.4rem;
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
            background: var(--color);
            z-index: -1;
            filter: brightness(1.3) saturate(40%);
        }
        &:active {
            &::before {
                filter: brightness(1.2) saturate(40%);
            }
        }
    }
    .dark-mode {
        color: rgba(255,255,255,.9);
    }
</style>
