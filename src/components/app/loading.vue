<style lang="scss">
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.loading-layer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 99;

    .loader {
        --width: 20px;
        --color: var(--black80);
        width: var(--width);
        height: var(--width);
        border: 2px solid var(--color);
        box-sizing: border-box;
        border-radius: calc(var(--width) / 2);
        position: relative;
        animation: rotate 1.5s linear;
        animation-iteration-count: infinite;
        margin-bottom: 10px;

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
    }

    .loader-text {
        font-size: 1.5rem;
    }
}
</style>

<template>
    <div v-full-screen class="loading-layer">
        <div class="loader">
        </div>
        <span class="loader-text">{{text}}</span>
    </div>
</template>

<script>

export default {
    name: 'LoadingLayer',
    props: {
        text: {
            type: String,
            default: '拼命加载中...'
        }
    }
}
</script>
