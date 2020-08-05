<style lang="scss">
    @import "@style/views/intro.scss";
</style>

<template>
    <div v-flex.column>
        <div class="main pd-h30 mg-t35" v-flex-item.1>
            <p>
                要继续使用主题商店，您需要允许此应用使用如下所有权限。我们将严格遵守
                <a class="link" @click="showTNC">用户隐私协议</a>
                。
            </p>
            <p>
                此demo仅供学习交流！
            </p>
            <div class="mg-t25" v-flex>
                <div class="f-l sys-icn icn-storage mg-r20"></div>
                <div v-flex-item.1>
                    <p class="bold">存储权限</p>
                    <p>用于将下载主题至本地，以及加载本地主题</p>
                </div>
            </div>
            <div class="mg-t25" v-flex>
                <div class="f-l sys-icn icn-setting mg-r20"></div>
                <div v-flex-item.1>
                    <p class="bold">系统设置</p>
                    <p>用于设定系统铃声</p>
                </div>
            </div>
        </div>
        <div class="miui-button-group">
            <Button @click='previous'>上一步</Button>
            <Button @click='next'>{{permissionAllowed ? '开始使用' : '授权'}}</Button>
        </div>
    </div>
</template>

<script>
import Button from '@miui/buttons/button'
export default {
    name: 'permissionIntro',
    components: { Button },
    data() {
        return {
            storagePermissionGranted: false,
            settingPermissionGranted: false
        }
    },
    computed: {
        permissionAllowed() {
            return this.storagePermissionGranted && this.settingPermissionGranted
        }
    },
    methods: {
        next() {
            let tasks = []
            if (!this.storagePermissionGranted) {
                let stPermissionDialog = this.$dialog.popup({
                    title: '权限管理（模拟）',
                    children: (
                        <div>
                            <div class="f-l sys-icn icn-storage mg-r20"></div>
                            <div>
                                允许主题商店读写您的存储设备？您的隐私可能被泄露。
                            </div>
                        </div>
                    ),
                    secondaryButton: '禁止',
                    primaryButton: {
                        text: '允许',
                        name: 'setting'
                    }
                })
                tasks.push(stPermissionDialog)
            }
            if (!this.settingPermissionGranted) {
                let settingPermissionDialog = this.$dialog.popup({
                    title: '权限管理（模拟）',
                    children: (
                        <div>
                            <div class="f-l sys-icn icn-setting mg-r20"></div>
                            <p>允许主题商店修改系统设置？</p>
                        </div>
                    ),
                    secondaryButton: '禁止',
                    primaryButton: {
                        text: '允许',
                        name: 'storage'
                    }
                })
                tasks.push(settingPermissionDialog)
            }

            let results = []
            new Promise(resolve => {
                tasks.forEach(task => {
                    task.then(result => {
                        if (result.name === 'setting') {
                            this.settingPermissionGranted = true
                        }
                        if (result.name === 'storage') {
                            this.storagePermissionGranted = true
                        }
                        results.push(true)
                        if (results.length === tasks.length) {
                            resolve(results)
                        }
                    })
                    .catch(() => {
                        results.push(false)
                        if (results.length === tasks.length) {
                            resolve(results)
                        }
                    })
                })
            })
            .then(() => {
                if (!results.some(r => !r)) {
                    this.$router.push({ name: 'home' })
                } else {
                    if (!this.settingPermissionGranted) {
                        this.$toast.show('请允许应用修改设置！')
                    }
                    if (!this.storagePermissionGranted) {
                        this.$toast.show('请允许应用读写存储！')
                    }
                }
            })
        },
        showTNC() {
            this.$dialog.popup({
                title: '隐私协议（模拟）',
                children: (
                    <div>
                        <div>    以下隐私协议是本游戏对用户隐私保护的许诺，请您务必仔细阅读本协议，以了解我们关于管理您个人信息的情况。本隐私协议的全部条款属于本软件用户服务协议的重要部份之一。
为了给您提供更准确、更有针对性的服务，本软件可能会以如下方式，使用您提交的个人信息。但本软件会以高度的勤勉义务对待这些信息，在未征得您许可的情况下，不会将这些信息对外公开或向第三方提供。
</div>
                        <ul class="mg-t20">
                        <li>    当您使用本软件的服务时，服务器会自动记录一些信息，包括手机型号、IP地址等。
                        在如下情况下，本软件会遵照您的意愿或法律的规定披露您的个人信息，由此引发的问题将由您个人承担：</li>
                        <li class="mg-t15">（1）事先获得您的授权；</li>
                        <li class="mg-t5">（2）只有透露你的个人资料，才能提供你所要求的产品和服务；</li>
                        <li class="mg-t5">（3）根据有关的法律法规要求；</li>
                        <li class="mg-t5">（4）按照相关政府主管部门的要求；</li>
                        <li class="mg-t5">（5）为维护本软件的合法权益。</li>
                        <li class="mg-t5">（6）您同意让第三方共享资料。</li>
                        </ul>
                    </div>
                ),
                primaryButton: '我已了解并同意'
            })
        },
        previous() {
            this.$router.push({ name: 'darkModeIntro' })
        }
    }
}
</script>
