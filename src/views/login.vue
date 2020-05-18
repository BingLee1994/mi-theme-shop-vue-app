<template>
    <div class="login-view">
        <div class="title">登录小米账号登录</div>
        <form class="login-form" @submit.prevent="authenticate">
            <div class="input-item">
                <input type="text" v-model="username" placeholder="邮箱/手机号/小米ID"/>
            </div>
            <div class="input-item password">
                <input
                    :type="isShowPassword ? 'text' : 'password'"
                    v-model="password"
                    placeholder="请输入密码"
                />
                <span class="icon-password toggle-button" @click="togglePassword">关</span>
            </div>
            <button class="login-button">登录</button>
        </form>
        <div class="footer">
            <a class="link">常见问题</a>
            <a class="link">隐私政策</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            isShowPassword: false
        }
    },
    methods: {
        togglePassword() {
            this.isShowPassword = !this.isShowPassword
        },

        async authenticate() {
            let { username, password } = this

            if (username && password) {
                try {
                    await this.$store.dispatch('authenticator/authenticate', { username, password })
                    console.log(this.$store.getters)
                    let attemptRoute = this.$store.getters['authenticator/attemptRoute']
                    if (attemptRoute) {
                        this.$router.push(attemptRoute)
                        this.$store.commit('authenticator/setAttemptRoute', null)
                    } else {
                        this.$router.push({ name: 'home' })
                    }
                } catch (e) {
                    this.$toast.show('登录失败，请稍后再试！')
                }
            } else {
                this.$toast.show('请输入用户名或者密码！')
            }
        }
    }
}
</script>

<style lang="scss">
.login-view {
    padding: 15px;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;

    .title {
        font-size: 1.8rem;
        text-align: center;
        margin: 30px 0 20px 0;
    }

    .login-form {
        .input-item {
            position: relative;
            border-bottom: 1px solid rgba(0,0,0,.1);
            padding:10px 0;

            input {
                border: none;
                padding: 10px;
                width: 100%;
            }

            &.password {
                input {
                    padding-right: 50px;
                }
                .toggle-button {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    top: 50%;
                    margin-top: -15px;
                    right: 10px;
                }
            }
        }
    }

    .login-button {
        display: block;
        width: 100%;
        height: 44px;
        border-radius: 4px;
        background: #FF6801;
        color: white;
        font-size: 1.4rem;
        margin: 20px 0;

        &:active {
            opacity: .9;
        }
    }

    .footer {
        position: fixed;
        bottom: 40px;
        background: white;
        left: 0;
        width: 100vw;
        display: flex;
        justify-content: center;

        .link {
            font-size: 1.4rem;
            padding:0 20px;
            line-height: 1;
            color: var(--black50);
            border-right: 1px solid var(--black50);

            &:last-of-type {
                border: none;
            }
        }
    }
}
</style>
