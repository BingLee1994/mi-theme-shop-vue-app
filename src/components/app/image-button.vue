<template>
    <a
        v-on="$listeners"
        v-lazy:background="src"
        :style="`background-color:${backgroundColor}`"
        :class="['image-button cover', medium? 'medium': '', small? 'small': '']"
    >
        <span
            :class="['title', darkMode? 'dark-mode': '', textAlignV, textAlignH]"
            :style="{ color: color }"
        >
            <slot></slot>
        </span>
    </a>
</template>

<script>
export default {
    name: 'ImageButton',
    props: {
        src: String,
        darkMode: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'var(--white80)'
        },
        small: Boolean,
        medium: Boolean,
        textAlign: {
            type: String,
            default: ''
        },
        backgroundColor: String
    },

    computed: {
        textAlignV() {
            let { textAlign } = this
            if (textAlign.includes(' ')) {
                let textAlignV = textAlign.split(' ')[1] || ''
                return textAlignV
            }
            return ''
        },

        textAlignH() {
            let { textAlign } = this
            return textAlign.split(' ')[0] || ''
        }
    }
}
</script>

<style scoped lang="scss">
    .image-button {
        --padding: 10px;
        background-color: var(--miOrange);
        width: calc(50% - 10px);
        margin: 5px;
        height: 60px;
        border-radius: 6px;
        box-shadow: 0 0 0 1px var(--black05);
        box-sizing: border-box;
        display: inline-block;
        font-size: 1.4rem;
        position: relative;

        &.medium {
            height: 80px;
        }

        .title {
            font-size: inherit;
            margin: 0;
            &.dark-mode {
                color: var(--black80);
            }
            position: absolute;
            left: var(--padding);
            right: var(--padding);
            top: var(--padding);

            &.center {
                text-align: center;
            }

            &.right {
                text-align: right;
            }

            &.bottom {
                top: initial;
                bottom: var(--padding);
            }

            &.middle {
                top: 50%;
                transform: translateY(-50%);
            }
        }

        &.small {
            width: calc(100% / 3 - 10px);
            font-size: .9rem;
        }
    }
</style>
