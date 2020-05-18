<style lang="scss">
    @import "@style/views/intro.scss";
</style>

<template>
    <div v-flex.column>
        <p>请选择颜色模式</p>
        <div v-flex-item.1>
            <Checkbox v-model="isDarkMode" label="暗色"/>
            <Checkbox :checked="!isDarkMode" label="亮色"/>
        </div>
        <div></div>
        <div class="miui-button-group">
            <Button @click="previous">上一步</Button>
            <Button @click="next">下一步</Button>
        </div>
    </div>
</template>

<script>
import Button from '@miui/buttons/button'
import Checkbox from '@miui/checkbox'

export default {
    name: 'DarkModeIntro',
    components: { Button, Checkbox },
    computed: {
        isDarkMode: {
            get() {
                return this.$store.state.preference.darkMode
            },
            set(value) {
                this.$store.commit('setDarkMode', value)
            }
        }
    },
    methods: {
        next() {
            this.$router.push({ name: 'fontSizeIntro' })
        },
        previous() {
            this.$router.push({ name: 'appIntro' })
        }
    }
}
</script>
