<template>
    <div class="recommend-view">
        <Swiper
            :items="swiperItems"
            :darkIndicator="true"
            :duration="4000"
            class="adv-swiper"
            name="recommend view"
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
    mounted() {
        this.getQuickActionRecommend().then(recommend => {
            recommend.forEach(r => {
                this.quickActionItems.push(r)
            })
        })

        this.getSwiperItems()
        this.getThemeList()
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
