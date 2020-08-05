<template>
    <div class="login-view">
        <div class="title">登录大米账号</div>
        <form class="login-form" @submit.prevent="authenticate">
            <div class="input-item">
                <input type="text" v-model="username" placeholder="邮箱/手机号/大米ID"/>
            </div>
            <div class="input-item password">
                <input
                    :type="isShowPassword ? 'text' : 'password'"
                    v-model="password"
                    placeholder="请输入密码"
                />
                <span :class="{
                    'icon-password': true,
                    'toggle-button': true,
                    'on': isShowPassword
                }" @click="togglePassword"></span>
            </div>
            <button :class="{
                'login-button': true,
                'disabled': !shouldEnableLoginButton
            }">登录</button>
        </form>
        <div class="footer">
            <a class="link" @click="open('http://zhuti.xiaomi.com/agreement')">常见问题</a>
            <a class="link" @click="open('https://privacy.mi.com/miaccount/zh_CN/')">隐私政策</a>
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
    computed: {
        shouldEnableLoginButton() {
            return this.username && this.password
        }
    },
    methods: {
        togglePassword() {
            this.isShowPassword = !this.isShowPassword
        },

        open(url) {
            window.open(url, 'blank')
        },

        async authenticate() {
            let { username, password } = this

            if (username && password) {
                try {
                    await this.$store.dispatch('authenticator/authenticate', { username, password })
                    console.log(this.$store.getters)
                    let attemptRoute = this.$store.getters['authenticator/attemptRoute']
                    if (attemptRoute) {
                        this.$router.replace(attemptRoute)
                        this.$store.commit('authenticator/setAttemptRoute', null)
                    } else {
                        this.$router.replace({ name: 'home' })
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
            border-bottom: 1px solid var(--black10);
            padding:10px 0;

            input {
                border: none;
                padding: 10px;
                width: 100%;
                box-sizing: border-box;
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
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 20px 20px;
                    background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNy42NSAyMC41NyI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6Izk5OTt9LmJ7ZmlsbDpub25lO3N0cm9rZTojOTk5O3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDoycHg7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT7otYTmupAgMTwvdGl0bGU+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMy44MiwxNS43MWE1LjE0LDUuMTQsMCwwLDAsMS43Ny0uMyw3LjY1LDcuNjUsMCwwLDAtLjUzLDIuNzd2LjU5bC0xLjI0LjA2YTE0LjY4LDE0LjY4LDAsMCwxLTguNDQtMi42NUExNS4xMSwxNS4xMSwwLDAsMSwwLDkuNDEsMTUuMDgsMTUuMDgsMCwwLDEsNS4zOCwyLjY1YTE0Ljc4LDE0Ljc4LDAsMCwxLDE2Ljg5LDAsMTUuMDgsMTUuMDgsMCwwLDEsNS4zOCw2Ljc2LDExLjM0LDExLjM0LDAsMCwxLTEuMTgsMi4zLDcuOTIsNy45MiwwLDAsMC0zLjg4LTEuMDYsNy4zNiw3LjM2LDAsMCwwLTIuNzYuNTMsNS4zOSw1LjM5LDAsMCwwLC4yOS0xLjc3LDYuMjgsNi4yOCwwLDEsMC02LjMsNi4zWiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTMuODIsNS42NWEzLjc4LDMuNzgsMCwwLDEsMi42NSwxLjEyLDMuNTUsMy41NSwwLDAsMSwxLjA2LDIuNjQsMy42MiwzLjYyLDAsMCwxLTMuNzEsMy43MSwzLjYyLDMuNjIsMCwwLDEtMy43LTMuNzEsMy41NSwzLjU1LDAsMCwxLDEuMDYtMi42NEEzLjc4LDMuNzgsMCwwLDEsMTMuODIsNS42NVoiLz48bGluZSBjbGFzcz0iYiIgeDE9IjE4LjMxIiB5MT0iMTMuMzYiIHgyPSIyNC44MSIgeTI9IjE5Ljg2Ii8+PGxpbmUgY2xhc3M9ImIiIHgxPSIyNC44MSIgeTE9IjEzLjM2IiB4Mj0iMTguMzEiIHkyPSIxOS44NiIvPjwvc3ZnPg==");

                    &.on {
                        background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOC4yNCAyMS45NCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmNjgwMTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPui1hOa6kCAyPC90aXRsZT48cGF0aCBjbGFzcz0iYSIgZD0iTTEzLjgyLDE1LjcxYTUuMTQsNS4xNCwwLDAsMCwxLjc3LS4zLDcuNjUsNy42NSwwLDAsMC0uNTMsMi43N3YuNTlsLTEuMjQuMDZhMTQuNjgsMTQuNjgsMCwwLDEtOC40NC0yLjY1QTE1LjExLDE1LjExLDAsMCwxLDAsOS40MSwxNS4wOCwxNS4wOCwwLDAsMSw1LjM4LDIuNjVhMTQuNzgsMTQuNzgsMCwwLDEsMTYuODksMCwxNS4wOCwxNS4wOCwwLDAsMSw1LjM4LDYuNzYsMTEuMzQsMTEuMzQsMCwwLDEtMS4xOCwyLjMsNy45Miw3LjkyLDAsMCwwLTMuODgtMS4wNiw3LjM2LDcuMzYsMCwwLDAtMi43Ni41Myw1LjM5LDUuMzksMCwwLDAsLjI5LTEuNzcsNi4yOCw2LjI4LDAsMSwwLTYuMyw2LjNabTAtMTAuMDZhMy43OCwzLjc4LDAsMCwxLDIuNjUsMS4xMiwzLjU1LDMuNTUsMCwwLDEsMS4wNiwyLjY0LDMuNjIsMy42MiwwLDAsMS0zLjcxLDMuNzEsMy42MiwzLjYyLDAsMCwxLTMuNy0zLjcxLDMuNTUsMy41NSwwLDAsMSwxLjA2LTIuNjRBMy43OCwzLjc4LDAsMCwxLDEzLjgyLDUuNjVaTTI4LjI0LDE1LjcxLDIyLDIxLjk0bC00LjQxLTQuMzUsMS44OC0xLjg4TDIyLDE4LjE4bDQuMzYtNC4zNloiLz48L3N2Zz4=");
                    }
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

        &.disabled {
            opacity: .5;
            filter: saturate(0);
       }
    }

    .footer {
        position: fixed;
        bottom: 40px;
        background: var(--white);
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
