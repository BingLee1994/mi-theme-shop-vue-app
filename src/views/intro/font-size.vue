<style lang="scss">
    @import "@style/views/intro.scss";
</style>

<template>
    <div>
        请选择字体颜色
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
    mounted() {
        console.log('mounted')
    },
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
