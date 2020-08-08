<template>
    <div class="me-screen">
        <div
            class="login-alert"
            v-if="!hasLogin"
        >
            <div class="wallpaper"></div>
            <p>登录后即可体验更多功能</p>
            <Button class="mg-t20" @click="gotoLogin">去登陆</Button>
        </div>
        <main class="preference-list-wrapper" v-else>
            <section
                class="avatar-wrapper"
                v-flex:direction.wrap.centerY="'column'"
            >
                <!-- <div class="avatar" v-lazy:background="avatar"></div> -->
                <div class="avatar" v-lazy:background="avatar"></div>
                <p>{{userName}}</p>
                <router-link
                    tag="p"
                    to="/follow-artist"
                    class="secondary has-next"
                >我的关注</router-link>
            </section>

            <section
                class="img-button-wrapper"
                v-flex.wrap
            >
                <router-link
                    v-for="(count, name)  in purchased"
                    :key="name"
                    class="img-button"
                    tag="div"
                    :to="{ name: 'viewOrder', params: {type: 'favorite'} }"
                >
                    <div :class="[name, 'category-icon']"></div>
                    <p class="title">{{name | mapLabel}}</p>
                    <p class="sub-title">{{count}}</p>
                </router-link>
            </section>

            <div class="divider"></div>

            <section class="preference-list">
                <router-link
                    tag="div"
                    :to="{ name: 'viewOrder', params: {type: 'favorite'} }"
                    class="list-item has-next"
                >
                    <Icon width="1.5rem" type="favorite"/>
                    我的点赞与收藏
                    <span class="right-label secondary">{{liked}}</span>
                </router-link>
                <router-link
                    tag="div"
                    class="list-item has-next"
                    :to="{ name: 'viewOrder', params: {type: 'order'} }"
                >
                    <Icon type="order"/>
                    我的所有订单
                    <span class="right-label secondary">{{order}}</span>
                </router-link>
            </section>

            <div class="divider"></div>

            <section class="preference-list">
                <router-link
                    tag="div"
                    :to="{ name: 'setting' }"
                    class="list-item has-next"
                >
                    <Icon type="setting"/>
                    应用设置
                </router-link>
                <router-link
                    tag="div"
                    :to="{ name: 'thank-you' }"
                    class="list-item has-next"
                >
                    <Icon type="order"/>
                    作者的一封信
                </router-link>
            </section>
        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from '@/components/app/icons'
import Button from '@/components/app/button'

const label = {
    theme: '主题壁纸',
    ringtone: '铃声',
    font: '字体'
}

export default {
    name: 'Me',
    components: { Icon, Button },

    data() {
        return {
            showLoading: false,
            purchased: {},
            liked: '',
            fav: '',
            order: '',
            avatar: require('../../../assets/img/destiny.png')
        }
    },

    computed: {
        authenticated() {
            return this.$store.getters['authenticator/authenticated']
        },

        ...mapGetters({
            hasLogin: 'authenticator/authenticated',
            user: 'authenticator/userContext',
            userName: 'authenticator/userDisplayName'
        })
    },

    async mounted() {
        // if (this.hasLogin) {
            try {
                this.showLoading = true
                let response = await this.$api.getUserProfile()
                this.purchased = response.purchased
                this.liked = response.liked
                this.fav = response.favorite
                this.order = response.orderCount
            } catch (err) {
            }
        // }
    },
    filters: {
        mapLabel(type) {
            return label[type] || ''
        }
    },

    methods: {
        gotoLogin() {
            this.$router.push({ name: 'login' })
        }
    }
}
</script>

<style lang="scss">
.me-screen {
    font-size: 1.3rem;
    background: url('../../../assets/img/me-bg.png') var(--white) no-repeat;
    background-position: top;
    background-size: contain;

    @include iphone5se {
        font-size: 1.1rem;
    }

    .login-alert {
        width: 200px;
        height: 250px;
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        transform: translate(-50%, -50%);

        .wallpaper {
            width: 150px;
            height: 150px;
            display: inline-block;
            filter: saturate(0.9) brightness(1.05);

            background: {
                position: center;
                repeat: no-repeat;
                size: contain;
                image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzkgMzkiPjxkZWZzPjxzdHlsZT4uYXtpc29sYXRpb246aXNvbGF0ZTt9LmJ7b3BhY2l0eTowLjE7bWl4LWJsZW5kLW1vZGU6bXVsdGlwbHk7fS5jLC5me2ZpbGw6I2Y3ZjdmNzt9LmQsLmt7ZmlsbDojYzhjOWNhO30uZXtmaWxsOiNkZDRmNDM7fS5me3N0cm9rZTojYzhjOWNhO30uZiwuaCwua3tzdHJva2UtbWl0ZXJsaW1pdDoxMDt9Lmd7ZmlsbDojZmY5ZjEyO30uaHtmaWxsOiNlZWVlZWY7c3Ryb2tlOiNkYmRjZGM7fS5pe2ZpbGw6IzM4NmJkNzt9Lmp7ZmlsbDojNjNjOTM5O30ua3tzdHJva2U6IzcxNzA3MTtzdHJva2Utd2lkdGg6MC4xcHg7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT7otYTmupAgMjwvdGl0bGU+PGcgY2xhc3M9ImEiPjxpbWFnZSBjbGFzcz0iYiIgd2lkdGg9IjIxIiBoZWlnaHQ9IjM2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEpIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJVQUFBQWtDQVlBQUFCbU1YR2VBQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBQk5rbEVRVlJJUyszV1FVckRRQmhBNFc5cXJZcWlRaFVMMXBVaTZBVmNlbi94R0swdVJOQ1Z0clVkRjVQQk5HcGFKY3M4Q0UxSTV1VlBzdWdMTVVabFFnZ2g3MXFQQ0xFa0NubS9rSFhReFJZMnJSWkh6RERCTE1hNG9KQ0dFRHFTWkJkOURMQXYzZUEzY2NRSFhqREdFOTVpakl0UUxOckVFUzV3aFd1Y1NCUFg4WTRSN25DUEIweTd4Y2x0bk9FV056akhnWFN6T3FhU0NCN3hySkFHNlRIN3VKU21IS0JuOVR1ZEY3OURYME9FUEduNW5lNUp3bzJxNFJkNktoKzJVem9aS3R0ZldMcStMRzJNVnRvOHJiUjVXbW56dE5MbWFhWE5VNVV1MTlyNkxLM0wvL3ZsMEpyNmlvUlZ6S1hySjlMNlNKSm00YXZVUlRsamV0OGQzOGpaTTVMV3p4RHpwQk9wM082SzQ2SFVWNnNvQjlwWThpeWw1QTZPY1lwRDlSbEpYVXFXb2pmMzFMckJTMTMwWnY2UjV2eVE1NThoWEdzOTFZOHl5d0FBQUFCSlJVNUVya0pnZ2c9PSIvPjxwYXRoIGNsYXNzPSJjIiBkPSJNNC4zNSwzMi4xMmExLjkxLDEuOTEsMCwwLDEtMS45MS0xLjl2LTUuN2wxNC40NC4wNS0uMDUsNS42NWExLjksMS45LDAsMCwxLTEuOSwxLjlaIi8+PHBhdGggY2xhc3M9ImQiIGQ9Ik0xNi43OCwyNC42MnY1LjZhMS44NSwxLjg1LDAsMCwxLTEuODUsMS44NUg0LjM1QTEuODUsMS44NSwwLDAsMSwyLjUsMzAuMjJ2LTUuNkgxNi43OG0uMS0uMUgyLjR2NS43YTIsMiwwLDAsMCwxLjk1LDJIMTQuOTNhMiwyLDAsMCwwLDEuOTUtMnYtNS43WiIvPjxwYXRoIGNsYXNzPSJlIiBkPSJNMi40LDI0LjUyVjUuODlBMiwyLDAsMCwxLDQuMzUsMy45NEgxNC45M2EyLDIsMCwwLDEsMS45NSwxLjk1VjI0LjUyWiIvPjxjaXJjbGUgY2xhc3M9ImYiIGN4PSI5LjY0IiBjeT0iMjguMzUiIHI9IjEuMzQiLz48aW1hZ2UgY2xhc3M9ImIiIHdpZHRoPSIzMyIgaGVpZ2h0PSIzNyIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDRUFBQUFsQ0FZQUFBRE1kWUI1QUFBQUNYQklXWE1BQUFzU0FBQUxFZ0hTM1g3OEFBQURURWxFUVZSWVI3WFkyMjhiUlJRRzhOOGtUa3JpQ0NndGhYSkpGUWxRKzBBbFFDcTg4c0Fmem1zRlBCU3A0VklVaFd0SUdxQlNjMjNyNWVITXhPdU43ZXc2N2lldDFySThNOTk4NTN4bnpqaFZWZVV5U0NtbDhoRVZWQjBuVFIxL1A0S1UwZ0tXY0FXTGVJRVRQTWVnTFptWlNhU1VGckdDTi9FTytqakUzL2dIQjNpbUJabVpTTlFJdklkUDgzTWQvK0ZIL0l4ZnNZK25lRlpWMVdEOGJET1F5Q0ZZRlFUdTRVdDhncXRDaWQ4RmllL3hFN2F3aXlNVFZPbEVJaWZoTXQ3RkYvZ0tud3RDcjRpY09CQUtiR01UOS9FQWY4bXFhSkRwNllZRnJHRkRMUDZaSUxBcUVyTW5FcldQTi9BMnJ1Vm5VeEI3aklPVTBsbUlXcFBJS2l5SkNUL0NIZHcwSkVEWWRGR1FYUkxxOUFXWjIwS1JoM2lFeDVsSTFacUVvUXEzOEhGK3IrWHZteWhrVmtYb1hoT0tyUXMzblJpR3BwMFNPUmxYeE03dkNDV3VpZDJXWWpVT0N5S0hYaGVFbHZFdnZoVnJKMVRqZGpHQ1doaHU0SzV3eEliSktqUlJWRmtXWS9waXZyT3hiU2FwSitNOVFlU0dpMVZvSWhuK2ZtVGNWQkpUa25GRnV3M1VNUkE1Y0pMZlp4YTlhS0lGSVYrYlpKeUdBWTZ4aHoveFJJM0l4TWthS255UW56YkoyRVFsRnR3VlZmUTcvQ0VVd2ZRZGpiTmsvNEl4NHpBUWR0d3lySjU3NGp5WnJNUWxMTmxFVVdGZm5DT2JvbndmMVErMGN5VG1ZTWs2QnVJczJSYWgyQmFxakp5bzR5YWRseVhyS2p6S3o3NWFHQXBHU0x3RVN6NDFxc0tCaGdxY24zaWVsandTOGQ4VStUQldCV3FUdnlSTFBoQ08yREltRndycU94eW53cndzdVd1Q0N1UUZzZ285MFlqTVE0V3BsbXlpdnNzcmhzM0h1dGxWdU5DU1RaUkZTajY4aXJmeSt6SXFUTFZrRS9XZGxwQXNHYlpyWGREYWtrM1VTWlNqOWxBTVBoWGRjNXQydkpNbG15anRYU1d1YmlXaHJnb1MxMFdkR09tRUd1aHN5U2JxUGVZeGZzUFg0cFM3SzZybWhpamJwV28yODZTekpadm9FYmZvbEZKUjRoZzcrRVdVN1hKKzNEU3FTaktqSlpzNFU2S3Fxa0ZLNlZTRTVWQmNhbmZFQXZ1QzBDMVJQL3A1Yk9WOE1yWU9ROEZJeTUvbGU1RlNLa2w2TEpKMEJ6K0lTdm9oM2hjMnJzVE9IK3FZakhWTXZZdlcvbjlZRXdxc0N4SzNSWjVVb2xXN2oyOUUvM2c2VnhLY2xmUkNwbjdITEVvOEVVVDJkTXlGZ2d0SkZOVEk5RVNKTDZGOExyZnhzeENnQTRtQ1RJYWhWU3U2LzA5VngvK0VqNEM1bXh6MXlRQUFBQUJKUlU1RXJrSmdnZz09Ii8+PHBhdGggY2xhc3M9ImMiIGQ9Ik0xNCwzNC42MWEyLDIsMCwwLDEtLjk1LS4yNUwzLjkyLDI5LjA1YTEuOTIsMS45MiwwLDAsMS0uNjktMi42bDIuODYtNC45M0wxOC41NiwyOC44bC0yLjg4LDQuODZBMS45LDEuOSwwLDAsMSwxNCwzNC42MVoiLz48cGF0aCBjbGFzcz0iZCIgZD0iTTYuMDgsMjEuNjNsMTIuMzYsNy4xNi0yLjgsNC44NWExLjg1LDEuODUsMCwwLDEtMi41My42N0w0LDI5YTEuODYsMS44NiwwLDAsMS0uNjgtMi41NGwyLjgxLTQuODRtMC0uMTRMMy4xOSwyNi40MmEyLDIsMCwwLDAsLjcxLDIuNjdsOS4xNiw1LjMxYTEuODgsMS44OCwwLDAsMCwxLC4yNiwyLDIsMCwwLDAsMS42OS0xbDIuODYtNC45M0w2LDIxLjQ5WiIvPjxwYXRoIGNsYXNzPSJnIiBkPSJNNiwyMS40OSwxNS4zOSw1LjM3YTIsMiwwLDAsMSwyLjY2LS43MUwyNy4yMSwxMGExLjk0LDEuOTQsMCwwLDEsLjcxLDIuNjZMMTguNTgsMjguNzZaIi8+PGNpcmNsZSBjbGFzcz0iaCIgY3g9IjEwLjQiIGN5PSIyOC40MyIgcj0iMS4zNCIvPjxpbWFnZSBjbGFzcz0iYiIgd2lkdGg9IjM3IiBoZWlnaHQ9IjMzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyIDYpIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNVQUFBQWhDQVlBQUFCZUQySVZBQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBREowbEVRVlJZUjgyWTMwOFRRUlNGdjF0YUVFRUpGb2hnSXNFQUVSTjVNSVlYL2VkOTlSR05HTUEwWUZDREZIK2tVR2hMeDRjejA5MHUyNlhkdG9rbjJXeVRUbWUvUGZmc25kbWFjNDcvVGNXN0J1U1ZtVm40bVBqS0FiZ01OMndjVHBsWkFTZ0JVLzRjd05wQUM3Z0NXczY1ZHVydlJ3bmwzU2tBMDhBaThBU1lJNnBJRTZnQ1gvMjVrZWJZU01vWGd5a0JzOEF5c0EyOEFsYUFlNmhzRjhBKzhBN3ZGbkNUbkc4b3FBVE1ERkFHVm9FdFlBZDRpUndySWFnYU1BLzhCSDRBbDJiV1RycVZHeXFXbTFrRTh4VFlRQ0Nid0Jxd2hGd3FJS2hab09ISGZFRWxiSkp3YTJDb1JHNlcwTVUzMFlVMkVGd1pBWlQ4MktCSllNR1BXd2VPZ0l1a1czMURaZVJtQjVWckZjSE1FTUVrMjBIQmY3K0tidUlRT0NmaDFwMVFmZVJtR3dIR25VbkNCSmtmVTBidWJxRnNYWm5aWldnUm1WQUQ1R2FhYkppNENtaStOWFJUVmZSVW5waFp3em5uVXFHR3pNMWRDbTR0SVplcnlLMC93Ry9ncGd0cVJMbnBSK0dHbDRIbndCNXdETlRNck4yQlNpbFYzdHowcXhENkZWU0pNbktzVVlRT1VDalZNNkpTNWMzTklMTFlBVURSbHl6VStEWHdCbmhCVktvOHVlbEhEcmdHemxEcHFxaXhkcDYrS2JSNDdnQnZFZEFvU3hXWFE3dUZCZ3IzZCtERWYyNkZwODhRM0J3Q1d5WmEyY2NCMDBRdDRBd3ROWjhRV04yUHVkV25qSlFhajBBQnBvYktkSXgyQ3g4UTFESGFOWFNnSE5wQy9BVk8vWGtlbUdCNHNPQk9IYzFkSVlJNVFEQm55TGxXV1ArQ1U5Zm9jZnlNMnNBQ3l0TUUrUlF2VlEyVlp4ZDRqM3JTRVZFbmJ3TGRDN0p6enBsWkN5Mk1oLzVZUlQxazBKQW5jMU5GQUhzSWFCY0Ixa2lCQ1FwT3RmMGtSOGphZGRRT0JuRXJMVGNIYUw1OVZMcFRWTXBVbUtBaTZNM0N6TUwrZVZDMytzbE5GZTlPcjVlRnVPSlBYNXBiaitqdDFsQzV5VklIS3VIV1BwcjRNZHJPM2lmcTZDUEpUWmFTZmFxTkpxdWdDNFFkd1FyYXlqcTZZWExuSmt0ZFVERzNUdEVkenlPd1NlQUJBanFuR3laWGJySjBhNVBubkd1YldSMzRoaTY2aU5hcE1tcXNGZUFqM1RBRDV5Wkx2YmJEb1l3SHFHUVZCUFVMZ1l3Rkpxam5hM3RzMHpjRFBFUmhyeU8zeGdJVGxQbGZRbXg3UE9HUEczK01CU2FvN3o4NHpNekdDUkxYUDN4bGlGTnJ1Z2JjQUFBQUFFbEZUa1N1UW1DQyIvPjxwYXRoIGNsYXNzPSJjIiBkPSJNMTEuNDMsMzYuMDVhMS45LDEuOSwwLDAsMS0xLjY1LS45NUw0LjUxLDI1LjkyYTEuODksMS44OSwwLDAsMSwuNy0yLjU5bDQuOTQtMi44NEwxNy4zLDMzLDEyLjM4LDM1LjhBMS44OCwxLjg4LDAsMCwxLDExLjQzLDM2LjA1WiIvPjxwYXRoIGNsYXNzPSJkIiBkPSJNMTAuMDksMjAuNTgsMTcuMjEsMzNsLTQuODYsMi43OWExLjg3LDEuODcsMCwwLDEtMi41My0uNjlMNC41NSwyNS45YTEuODYsMS44NiwwLDAsMSwuNjgtMi41M2w0Ljg2LTIuNzltMC0uMTRMNS4xOCwyMy4yOEEyLDIsMCwwLDAsNC40NiwyNmw1LjI4LDkuMTdhMS45NCwxLjk0LDAsMCwwLDEuNjksMSwxLjkxLDEuOTEsMCwwLDAsMS0uMjZMMTcuMzQsMzMsMTAuMTIsMjAuNDRaIi8+PHBhdGggY2xhc3M9ImkiIGQ9Ik0xMC4xMiwyMC40NGwxNi4xNi05LjI4YTEuOTQsMS45NCwwLDAsMSwyLjY2LjcybDUuMjgsOS4xN2EyLDIsMCwwLDEtLjcyLDIuNjdMMTcuMzQsMzNaIi8+PGNpcmNsZSBjbGFzcz0iaCIgY3g9IjEwLjQyIiBjeT0iMjguNjMiIHI9IjEuMzQiLz48aW1hZ2UgY2xhc3M9ImIiIHdpZHRoPSIzNSIgaGVpZ2h0PSIyMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCAxOCkiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ01BQUFBVkNBWUFBQURNK2xmcEFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFCRTBsRVFWUklTKzNXdlU3RE1CUkE0Yzl0U21GQXNNQlFlQXpVbVRkbloyU0FIUUViQ0FSSWxKYVl3YlpTQ1NLQmxMUWRlcVRJK2JWUDdvMXliNGd4S29RUVF0bTFHaUxFTEJHS1RBaGhnQkhHZWV4YnFNWUNIMWpFR09zUVl5d2llempDQ1E1UjZVOG80aE5QdU1VajVsVk96UWpIT01NVXA5aHRtYWdMSXQ1d2pRdThZMTdsaTJNcElsT2NZNEtkbjNOMFJvMW5TZXBLemtKSnhRZ0hVa1FtVXJxR3Y4L1RDWFVlOTZXMUJ5UWpHcUd4RkpGaHVhRkhCdEs2WWZuRU1uMTlzSCtpNzdmL0YxdVpOcll5Yld5MFRGUEMxMEQ1NlVYTU1aTUsyRmZyRTkxUTV5MWFDa0NsRVhuQkhSN3l0VlhVcGxkcDdab21NalBjNHpJZnI2cHEzMGp0d3dKeG8vcVp6ZXYwQ3V2dWdiOEJyRHRnVW9RWGc5TUFBQUFBU1VWT1JLNUNZSUk9Ii8+PHBhdGggY2xhc3M9ImMiIGQ9Ik04LjcyLDM2LjUxYTEuOTEsMS45MSwwLDAsMS0xLjkxLTEuOVYyNGExLjkyLDEuOTIsMCwwLDEsMS45MS0xLjkxaDUuN2wtLjA1LDE0LjM5WiIvPjxwYXRoIGNsYXNzPSJkIiBkPSJNMTQuMzIsMjIuMTdWMzYuNDZIOC43MmExLjg1LDEuODUsMCwwLDEtMS44Ni0xLjg1VjI0YTEuODYsMS44NiwwLDAsMSwxLjg2LTEuODZoNS42bS4xLS4xSDguNzJhMiwyLDAsMCwwLTIsMlYzNC42MWEyLDIsMCwwLDAsMiwyaDUuN1YyMi4wN1oiLz48cGF0aCBjbGFzcz0iaiIgZD0iTTE0LjQyLDIyLjA3SDMzLjA1YTIsMiwwLDAsMSwyLDJWMzQuNjFhMiwyLDAsMCwxLTIsMkgxNC40MloiLz48Y2lyY2xlIGNsYXNzPSJrIiBjeD0iMTAuNTkiIGN5PSIyOS4zMiIgcj0iMS4zNCIvPjwvZz48L3N2Zz4=");
            };
        }
    }

    .preference-list-wrapper {
        --border-color: var(--black05);
        border-top: 1px s0lid var(--border-color);
        @include bg-center();
        background-position: top center;
        overflow-x: hidden;
        overflow-y: auto;

        .secondary {
            opacity: .5;
        }

        .avatar-wrapper {
            min-height: 150px;
            --avatar-size: 6rem;

            p {
                margin: .5rem 0;
            }

            .avatar {
                width: var(--avatar-size);
                height: var(--avatar-size);
                margin: 10px;
                margin-top: 80px;
                border-radius: calc(var(--avatar-size) / 2);
                background: {
                    position: center;
                    repeat: no-repeat;
                    size: cover;
                };
                filter: drop-shadow(0 0 1px, var(--black10));
                box-sizing: border-box;

                @include iphone5se {
                    margin-top: 40px;
                }
            }
        }

        .img-button-wrapper {
            padding: 0 10px;
            .img-button {
                font-size: 1.2rem;
                border-radius: 10px;
                padding: 15px 5px;
                box-shadow: 0 0 12px var(--black10);
                margin: 10px;
                text-align: center;
                line-height: 1.5;
                width: 7rem;

                .category-icon {
                    --icn-size: 35px;
                    width: var(--icn-size);
                    height: var(--icn-size);
                    background-size: cover;
                    background-repeat: no-repeat;
                    display: inline-block;
                    border-radius: 8px;
                    margin-bottom: 10px;
                    background-position-x: 0;

                    &.font {
                        background-image: url('../../../assets/img/category-icn.jpg');
                        background-position-y: 0;
                    }

                    &.ringtone {
                        background-image: url('../../../assets/img/category-icn.jpg');
                        background-position-y: calc(0px - var(--icn-size));
                    }

                    &.theme {
                        background-image: url('../../../assets/img/category-icn.jpg');
                        background-position-y: calc(0px - var(--icn-size) * 2);
                    }
                }

                .sub-title {
                    opacity: .7;
                }
            }
        }

        .preference-list {
            .list-item {
                padding: 1.7rem;
                display: flex;
                align-items: center;

                @include iphone5se {
                    padding: 14px 17px;
                }

                & .right-label {
                    float: right;
                    margin-left: auto;
                }

                & .pre-icon {
                    float: left;
                    width: 13px;
                    height: 13px;
                    background: {
                        position: center;
                        repeat: no-repeat;
                        size: cover;
                    };
                }

                &.has-next {
                    padding-right: 2.5rem !important;
                    &::after{
                        right: 1rem;
                    }
                }
            }
        }

        .divider {
            margin: 5px 0 5px 17px;
            height: 1px;
            background: var(--black05);

            @include iphone5se {
                margin: 2px 0 2px 17px;
            }
        }
    }
}
</style>
