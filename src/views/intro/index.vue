<style lang="scss">
    @import "@style/views/intro.scss";
</style>

<template>
    <div
        v-full-screen
        v-flex.column
        class="intro-screen"
    >
        欢迎使用
        <router-view v-flex-item.1 class="intro-body"></router-view>
    </div>
</template>

<script>
export default {
    name: 'Intro'
}
</script>

<style scoped>
    .intro-screen {
        padding: 15px;
        box-sizing: border-box;
    }
</style>
