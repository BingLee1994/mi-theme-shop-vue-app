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
    background: var(--white);

    .loader {
        display: flex;
        justify-content: center;

        &-icon {
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
            display: inline-block;
            margin: 0 5px;

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

        &-text {
            font-size: 1.5rem;
        }
    }
}

.retry-button {
    text-decoration: underline;
}
</style>

<template>
    <div v-full-screen class="loading-layer">
        <div v-if="!showRetry" class="loader">
            <span class="loader-icon">
            </span>
            <span class="loader-text">{{loadingMessage}}</span>
        </div>
        <div v-else>
            <span>{{retryMessage}}</span>
            <button class="retry-button" @click="$emit('clickRetry')">{{retryButton}}</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LoadingLayer',
    props: {
        showRetry: {
            type: Boolean,
            default: false
        },
        loadingMessage: {
            type: String,
            default: '拼命加载中...'
        },
        retryMessage: {
            type: String,
            default: '网络错误！'
        },
        retryButton: {
            type: String,
            default: '再试一次'
        }
    }
}
</script>
