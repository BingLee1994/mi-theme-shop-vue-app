<style lang="scss">
    @import "@style/views/welcome.scss";
</style>

<template>
    <div class="welcome screen">
        <div class="title">主题商店</div>
    </div>
</template>

<script>
export default {
    name: 'Entry',
    mounted() {
        let appVersion = this.$store.state.preference.appVersion
        let nextScreen = 'home'

        if (!appVersion) {
            nextScreen = 'intro'
        }

        setTimeout(() => {
            this.$router.push(nextScreen)
        }, 4000)
    }
}
</script>

<style lang="scss" scoped>
.welcome {
    background: var(--white) url(../assets/img/welcome.png);
    background-size: cover;
    background-repeat: no-repeat;
    .title {
        position: fixed;
        bottom: 50px;
        width: 100vw;
        text-align: center;
        font-size: 2rem;
        font-weight: 300;
        color: var(--white);
    }
}
</style>
