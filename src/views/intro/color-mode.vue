<style lang="scss">
    @import "@style/views/intro.scss";
</style>

<template>
    <div v-flex.column>
        <p class="sub-title">请选择颜色模式（可于稍后在设置里更改）</p>
        <main v-flex-item.1 v-flex class="c-mode-card-wrapper mg-t10">
            <div class="c-mode-card" style="margin-right: 25px" v-flex-item.1>
                <Checkbox :checked="isDarkMode" @change="toggleDarkMode(true)" label="暗色"/>
                <p class="mg-v10">适合夜间使用</p>
                <div class="preview-card dark">

                </div>
            </div>
            <div class="c-mode-card" v-flex-item.1>
                <Checkbox :checked="!isDarkMode" @change="toggleDarkMode(false)" label="亮色"/>
                <p class="mg-v10">更专注于内容</p>
                <div class="preview-card">

                </div>
            </div>
        </main>
        <div class="miui-button-group">
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
    created() {
        this.setCardHeight = this.setCardHeight.bind(this)
    },
    mounted() {
        this.setCardHeight()
        window.addEventListener('resize', this.setCardHeight)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setCardHeight)
    },
    methods: {
        setCardHeight() {
            let previewCard = document.querySelectorAll('.preview-card')
            Array.prototype.forEach.call(previewCard, card => {
                card.style.height = (card.offsetWidth) / 9 * 16 + 'px'
            })
        },
        toggleDarkMode(darkMode = true) {
            if (this.isDarkMode !== darkMode) {
                this.isDarkMode = darkMode
            }
        },
        next() {
            this.$router.push({ name: 'permissionIntro' })
        },
        previous() {
            this.$router.push({ name: 'appIntro' })
        }
    }
}
</script>

<style lang="scss" scoped>
    .sub-title {
        text-align: center;
        font-size: 1.6rem;
        margin: 15px 0;
    }

    .preview-card {
        width: 100%;
        height: 320px;
        border: 1px solid var(--black30);
        border-radius: 10px;
        background-image: url(../../assets/img/c-preview-card.png);
        background-size: contain;
        background-color: white;
        background-repeat: no-repeat;

        &.dark {
            background-color: black;
        }

        @include iphone5se {
            height: 250px !important;
        }
    }
</style>
