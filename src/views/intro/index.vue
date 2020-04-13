<style lang="scss">
    @import "@style/views/intro.scss";
</style>

<template>
    <div>
        欢迎使用
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Intro',
    mounted() {
        console.log('mounted')
    }
}
</script>
