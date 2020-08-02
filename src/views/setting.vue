<template>
    <Screen
        class="setting-screen"
        title="设置"
    >
        <template slot="main">
            <ul class="preference-list">
                <li class="list-item">
                    <div class="content">
                        <p class="title">暗色模式</p>
                    </div>
                    <Toggle v-model="darkMode" @click="toggleDarkMode"/>
                </li>
                <li class="list-item">
                    <div class="content">
                        <p class="title">应用主题时应用铃声</p>
                    </div>
                    <Toggle v-model="applyRingtone"/>
                </li>
                <li class="list-item">
                    <div class="content">
                        <p class="title">流量保护</p>
                        <p class="sub-title">在使用流量下载较大文件时发出警告</p>
                    </div>
                    <Toggle :checked="dataProtection" @change="alertDataProtection"/>
                </li>
                <li class="list-item">
                    <div class="content">
                        <p class="title">个性化推荐</p>
                        <p class="sub-title">开启后将推荐您喜欢的内容</p>
                    </div>
                    <Toggle v-model="adv"/>
                </li>
                <li class="list-item" @click="about">
                    <div class="content">
                        <p class="title">关于主题壁纸</p>
                    </div>
                </li>
                <li class="list-item">
                    <div class="content">
                        <a class="title" href=mailto:791188716@qq.com>联系作者</a>
                    </div>
                </li>
            </ul>
        </template>
    </Screen>
</template>

<script>
import Screen from '@/components/app/base-activity'
import Toggle from '@miui/toggle'
import darkMode from '@/mixins/dark-mode'

export default {
    components: { Screen, Toggle },
    mixins: [darkMode],
    data() {
        return {
            applyRingtone: true,
            dataProtection: false,
            adv: false
        }
    },

    methods: {
        about() {
            this.$dialog.alert('关于此应用', '此应用仅供学习和交流使用！我是一名Vue自学者，如果你也喜欢Vue开发，希望能与你交流探讨。')
        },
        async alertDataProtection(e) {
            if (this.dataProtection) {
                await this.$dialog.confirm({
                    title: '警告',
                    message: '关闭流量保护可能会引起扣费，是否继续？'
                })
                this.dataProtection = false
            } else {
                this.dataProtection = !this.dataProtection
            }
        }
    }
}
</script>

<style lang="scss">
.setting-screen {
    .preference-list {
        & .list-item {
            display: flex;
            padding: 15px 5px;
            line-height: 1.5;

            & .content {
                flex: 1;
            }

            & .title {
                color: var(--black);
                font-size: 1.5rem;
            }

            & .sub-title {
                color: var(--black40);
                font-size: 1.1rem;
            }
        }
    }
}
</style>
