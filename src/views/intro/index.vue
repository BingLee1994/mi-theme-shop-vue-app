<style lang="scss">
    @import "@style/views/intro.scss";
</style>

<template>
    <div
        v-full-screen
        v-flex.column
        class="intro-screen"
    >
        <p class="title">欢迎使用主题商店</p>
        <router-view v-flex-item.1 class="intro-body"></router-view>
    </div>
</template>

<script>

export default {
    name: 'Intro'
}
</script>

<style scoped lang="scss">
    .intro-screen {
        padding: 20px;
        box-sizing: border-box;
        background: var(--white) url(../../assets/img/me-bg.png) no-repeat top;
        background-size: cover;

        .title {
            margin: 20px 15px;
            margin-bottom: 5px;
            font-size: 2rem;
            text-align: center;
            color: var(black);
        }
    }
</style>
