<style lang="scss">
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.loader {
    display: flex;
    justify-content: center;
    align-items: center;

    &-icon {
        --width: 20px;
        --color: var(--black80);
        --border-width: 2px;
        width: var(--width);
        height: var(--width);
        border: var(--border-width) solid var(--color);
        box-sizing: border-box;
        border-radius: calc(var(--width) / 2);
        position: relative;
        animation: rotate 1.5s linear;
        animation-iteration-count: infinite;
        display: inline-block;
        margin: 0 10px;

        &::before {
            content: '';
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background: var(--color);
            position: absolute;
            transform-origin: 10px 10px;
            left: 2px;
            top: 2px;
        }

        &.small {
            --width: 15px;
            --color: var(--black80);
            --border-width: 1px;
            margin: 0 5px;

            &-text {
                font-size: 1.3rem;
            }
        }
    }

    &-text {
        font-size: 1.4rem;
        &.small {
            font-size: 1.3rem;
        }
    }
}
</style>

<template>
    <div class="loader">
        <span :class="['loader-icon', small? 'small': '']"></span>
        <span :class="['loader-text', small? 'small': '']"><slot></slot></span>
    </div>
</template>

<script>

export default {
    name: 'LoadingLoaderIcon',
    props: {
        small: Boolean
    }
}
</script>
