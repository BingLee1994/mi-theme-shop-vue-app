<template>
    <Screen
        class="order-screen"
        :title="title"
        mainClassName="screen-body"
    >
        <template slot="main">
            <div class="tabs">
                <NavBar
                    :navItems="tabs"
                    :selectedNav="currentTabIndex"
                    @clickNavItem="onTabChange"
                    class="nav-list-wrapper"
                />
            </div>
            <SwiperActivity
                ref="swiper"
                @indexChange="onChangeOrder"
                :selected="currentTabIndex"
                v-flex-item.1
            >
                <Item extra="theme">
                    <ThemeList
                        class="order-list-wrapper"
                        :items="orderList.theme"
                        column="3"
                        type="theme"
                        @click="viewDetail"
                        :showRefreshLoading="loadMoreloading === 'theme'"
                        @willLoadMore="requestMoreItem"
                    />
                </Item>

                <Item extra="font">
                    <ThemeList
                        type="font"
                        :showRefreshLoading="loadMoreloading === 'font'"
                        class="order-list-wrapper"
                        :items="orderList.font"
                        @click="viewDetail"
                        @loadMore="loadMoreFont"
                        @willLoadMore="requestMoreItem"
                    />
                </Item>

                <Item extra="ringtone">
                    <ThemeList
                        type="ringtone"
                        :showRefreshLoading="loadMoreloading === 'ringtone'"
                        class="order-list-wrapper"
                        :items="orderList.ringtone"
                        @click="viewDetail"
                        @willLoadMore="requestMoreItem"
                    />
                </Item>
            </SwiperActivity>
            <Loading v-show="showLoading"/>
        </template>
    </Screen>
</template>

<script>
import Loading from '@/components/app/loading'
import SwiperActivity from '@/components/app/swiper-activity/activity'
import Item from '@/components/app/swiper-activity/item'
import ThemeList from '@/components/app/list-view'
import Screen from '@/components/app/base-activity'
import NavBar from '@/components/app/nav-bar'

export default {
    components: { ThemeList, Loading, Screen, NavBar, SwiperActivity, Item },
    data() {
        return {
            loadMoreloading: -1,
            showLoading: false,
            tabs: [
                { text: '主题壁纸', type: 'theme' },
                { text: '字体', type: 'font' },
                { text: '铃声', type: 'ringtone' }
            ],
            currentTabIndex: 0,
            orderList: {
                theme: [],
                font: [],
                ringtone: []
            }
        }
    },

    computed: {
        title() {
            let titles = {
                favorite: '我的收藏',
                order: '我的订单',
                default: '我的项目'
            }
            return titles[this.$route.params.type]
        }
    },

    async mounted() {
        this.getOrderItem(this.tabs[0].type)
    },

    methods: {
        async viewDetail(item) {
            try {
                await this.$router.push({
                    name: 'viewItem', params: { id: item.itemId, type: item.type || 'theme' }
                })
            } catch (err) {

            }
        },

        async getOrderItem(type) {
            this.showLoading = true
            let response = await this.$api.getFavorite(type)
            if (type === 'theme') {
                response = response.map(theme => {
                    return {
                        imgUrl: theme.imgUrl,
                        id: theme.id,
                        name: theme.name,
                        type: 'theme'
                    }
                })
            }
            this.orderList[type] = response
            this.showLoading = false
        },

        requestMoreItem(type) {
            this.loadMoreloading = type
            setTimeout(() => {
                this.loadMoreloading = -1
            }, 1000)
        },

        onTabChange(idx) {
            this.onChangeOrder(idx, this.tabs[idx].type)
        },

        onChangeOrder(idx, orderType) {
            if (idx === this.currentTabIndex) {
                return
            }
            let orderList = this.orderList[orderType]
            if (orderList.length === 0) {
                this.getOrderItem(orderType)
            }
            this.currentTabIndex = idx
        },

        loadMoreFont() {
            console.log('loadMoreFont')
        }
    }
}
</script>

<style lang="scss">
.order-screen {
    .tabs {
        padding: 0 10px;
    }

    & .screen-body {
        display: flex;
        height: 100%;
        flex-direction: column;
        padding: 0 !important;
    }

    .order-list-wrapper {
        padding: 15px;
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
    }
}
</style>
