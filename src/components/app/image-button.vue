<template>
    <a
        v-on="$listeners"
        v-lazy:background="src"
        :class="['image-button cover', hasChildren? 'medium': '']"
    >
        <span
            :class="['title', darkMode? 'dark-mode': '', small? 'small-font': '']"
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
        small: Boolean
    },

    computed: {
        hasChildren() {
            console.log(this.$slots.default)
            return this.$slots.default
        }
    }
}
</script>

<style scoped lang="scss">
    .image-button {
        background-color: var(--miOrange);
        width: calc(50% - 10px);
        margin: 5px;
        height: 60px;
        border-radius: 6px;
        box-shadow: 0 0 0 1px var(--black05);
        box-sizing: border-box;
        display: inline-block;

        &.medium {
            padding: 10px;
            height: 80px;
        }

        .title {
            font-size: 1.4rem;
            &.dark-mode {
                color: var(--black80);
            }
        }

        & .small-font {
            font-size: 1.3rem;
        }
    }
</style>
