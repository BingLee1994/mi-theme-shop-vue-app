<style lang="scss">
    @import "@style/views/welcome.scss";
</style>

<template>
    <div>欢迎使用</div>
</template>

<script>
export default {
    name: 'Welcome',
    mounted() {
        let appVersion = this.$store.state.preference.appVersion
        let nextScreen = 'home'

        if (!appVersion) {
            nextScreen = 'intro'
        }

        setTimeout(() => {
            this.$router.push(nextScreen)
        }, 100)
    }
}
</script>
