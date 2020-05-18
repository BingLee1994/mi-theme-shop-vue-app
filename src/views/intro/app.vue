<style lang="scss">
    @import "@style/views/intro.scss";
</style>

<template>
    <div v-flex.column>
        <div v-flex-item.1>介绍</div>
        <div class="miui-button-group">
            <Button @click="next">下一步</Button>
        </div>
    </div>
</template>

<script>
import Button from '@miui/buttons/button'
export default {
    name: 'AppIntro',
    components: { Button },
    methods: {
        next() {
            this.$router.push({ name: 'darkModeIntro' })
        }
    }
}
</script>
