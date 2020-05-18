<style lang="scss">
    @import "@style/views/intro.scss";
</style>

<template>
    <div v-flex.column>
        <div v-flex-item.1>请选择字体颜色</div>
        <div class="miui-button-group">
            <Button @click='previous'>上一步</Button>
            <Button @click='next'>开始使用</Button>
        </div>
    </div>
</template>

<script>
import Button from '@miui/buttons/button'
export default {
    name: 'FontSizeIntro',
    components: { Button },
    methods: {
        next() {
            this.$router.push({ name: 'home' })
        },
        previous() {
            this.$router.push({ name: 'darkModeIntro' })
        }
    }
}
</script>
