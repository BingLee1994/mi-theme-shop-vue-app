<template>
    <div class="recommend-view" ref="container">
        <Swiper
            :items="swiperItems"
            :darkIndicator="true"
            :duration="4000"
            class="adv-swiper"
            name="recommend view"
            @clickItem = "handleSwiperClick"
        />
        <QuickActions
            :items="quickActionItems"
        />
        <ThemeList
            style="padding: 0 15px"
            type="theme"
            :items="themeListItems"
            :showRefreshLoading="showRefreshLoading"
            :enableSwipeToLoadMore="true"
            @willLoadMore="reload"
            scrollObserveTarget=".recommend-view"
        />
        <Loading v-if="showLoading"/>
    </div>
</template>

<script>
import Swiper from '@/components/app/swiper'
import QuickActions from '@/components/app/home/quick-actions'
import quickActionRecomend from '@/mixins/quick-action'
import ThemeList from '@/components/app/list-view'
import Loading from '@/components/app/loading'
import cacheUtil from '@/utils/cache'
import config from '@/config'

const swiperHandler = {
    category(item, vm) {
        let { keyWord, filter } = item
        vm.$router.push({
            name: 'viewCategory',
            params: { keyWord, filter }
        })
    },
    theme(item, vm) {
        vm.$router.push({
            name: 'viewItem',
            params: {
                type: 'theme',
                id: item.id
            }
        })
    },
    external(item) {
        window.open(item.url)
    }
}

export default {
    name: 'ThemeWallpaperGallery',
    components: { Swiper, QuickActions, ThemeList, Loading },
    mixins: [quickActionRecomend],
    data() {
        return {
            showLoading: false,
            swiperItems: [],
            quickActionItems: [
                { text: '排行榜', routeLink: true, route: 'rank/all' },
                { text: '分类', routeLink: true, route: 'category' }
            ],
            themeListItems: [],
            showRefreshLoading: false
        }
    },

    created() {
        this.savedScroll = 0
    },

    mounted() {
        this.getQuickActionRecommend().then(recommend => {
            recommend.forEach(r => {
                this.quickActionItems.push(r)
            })
        })

        this.getSwiperItems()
        this.getThemeList()
    },

    activated() {
        if (this.$refs.container && this.savedScroll) {
            console.log('restore saved scroll')
            this.$refs.container.scrollTop = this.savedScroll
        }
    },

    deactivated() {
        console.log('theme gallety hidden!')
        if (this.$refs.container) {
            this.savedScroll = this.$refs.container.scrollTop
        }
    },

    methods: {
        getSwiperItems() {
            this.showLoading = true
            let swiperCacheName = 'theme-swiper'
            let swiperCache = cacheUtil.get(swiperCacheName)
            if (!swiperCache) {
                this.$api.getSwiperItems('theme').then(list => {
                    this.swiperItems = list
                    this.showLoading = false
                    cacheUtil.update(swiperCacheName, list, config.sliderImageExpiredTime)
                })
            } else {
                this.swiperItems = swiperCache
            }
        },

        getThemeList() {
            this.showLoading = true
            return this.$api.getThemeList('theme').then(list => {
                this.themeListItems = list.map(eachItem => {
                    let { price, type, count } = eachItem
                    let description = ''
                    if (type === 'theme') {
                        description = price > 0 ? price + '米币' : '免费'
                    }
                    if (type === 'wallpaper') {
                        description = count > 0 ? count + '张壁纸' : ''
                    }
                    eachItem.description = description
                    return eachItem
                })
                this.showLoading = false
            })
        },

        handleSwiperClick(item) {
            let handler = swiperHandler[item.type]
            if (handler) {
                handler(item, this)
            }
        },

        reload() {
            this.showRefreshLoading = true
            this.$api.getThemeList('theme').then(list => {
                this.themeListItems = list.map(eachItem => {
                    let { price, type, count } = eachItem
                    let description = ''
                    if (type === 'theme') {
                        description = price > 0 ? price + '米币' : '免费'
                    }
                    if (type === 'wallpaper') {
                        description = count > 0 ? count + '张壁纸' : ''
                    }
                    eachItem.description = description
                    return eachItem
                })
                this.showRefreshLoading = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .recommend-view {
        padding-top: 15px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
    }
</style>
