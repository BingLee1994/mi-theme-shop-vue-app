<style lang="scss">
.loading-layer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 99;
    background: var(--white);
}

.retry-button {
    text-decoration: underline;
}
</style>

<template>
    <div v-full-screen class="loading-layer">
        <LoadingLoaderIcon v-if="!showRetry">
            {{loadingMessage}}
        </LoadingLoaderIcon>
        <div v-else>
            <span>{{retryMessage}}</span>
            <button class="retry-button" @click="$emit('clickRetry')">{{retryButton}}</button>
        </div>
    </div>
</template>

<script>
import LoadingLoaderIcon from './loading-icon'

export default {
    name: 'LoadingLayer',
    components: { LoadingLoaderIcon },
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
