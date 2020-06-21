<template>
    <div class="me-screen">
        <div
            class="login-alert"
            v-if="!hasLogin"
        >
            <p>登录更精彩</p>
            <router-link :to="{ name: 'login' }">去登陆</router-link>
        </div>
        <main class="preference-list-wrapper" v-else>
            <section
                class="avatar-wrapper"
                v-flex:direction.wrap.centerY="'column'"
            >
                <div class="avatar" v-lazy:background="avatar"></div>
                <p>{{userName}}</p>
                <p class="secondary has-next">我的关注</p>
            </section>

            <section
                class="img-button-wrapper"
                v-flex.wrap
            >
                <div
                    v-for="(count, name)  in purchased"
                    :key="name"
                    class="img-button"
                >
                    <div :class="[name, 'icon']"></div>
                    <p>{{name | mapLabel}}</p>
                    <p>{{count}}</p>
                </div>
            </section>

            <div class="divider"></div>

            <section class="preference-list">
                <router-link
                    tag="div"
                    :to="{ name: 'viewOrder', params: {type: 'favorite'} }"
                    class="list-item has-next"
                >
                    <Icon width="15px" type="favorite"/>
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

const label = {
    theme: '主题壁纸',
    ringtone: '铃声',
    font: '字体'
}

export default {
    name: 'Me',
    components: { Icon },

    data() {
        return {
            showLoading: false,
            purchased: {},
            liked: '',
            fav: '',
            order: ''
        }
    },

    computed: {
        authenticated() {
            return this.$store.getters['authenticator/authenticated']
        },

        ...mapGetters({
            hasLogin: 'authenticator/authenticated',
            user: 'authenticator/userContext',
            userName: 'authenticator/userDisplayName',
            avatar: 'authenticator/avatar'
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
    }
}
</script>

<style lang="scss">
.me-screen {
    font-size: 1.3rem;

    @include iphone5se {
        font-size: 1.1rem;
    }

    .login-alert {
        width: 200px;
        height: 250px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        background: {
            position: center;
            repeat: no-repeat;
            size: contain;
            image: url('../../../assets/img/cover.png');
        };
    }

    .preference-list-wrapper {
        --border-color: var(--black05);
        border-top: 1px s0lid var(--border-color);
        background: url('../../../assets/img/me-bg.png') var(--white);
        @include bg-center();
        background-position: top center;
        overflow-x: hidden;
        overflow-y: auto;

        .secondary {
            opacity: .5;
        }

        .avatar-wrapper {
            min-height: 150px;
            --avatar-size: 60px;

            p {
                margin: 5px 0;
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
                .icon {
                    width: 50px;
                    height: 50px;
                }
                font-size: 1.2rem;
                border-radius: 10px;
                padding: 15px 5px;
                box-shadow: 0 0 12px var(--black10);
                margin: 10px;
                text-align: center;
                line-height: 1.5;
                width: 70px;
            }
        }

        .preference-list {
            .list-item {
                padding: 17px;
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
                    padding-right: 25px !important;
                    &::after{
                        right: 10px;
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
