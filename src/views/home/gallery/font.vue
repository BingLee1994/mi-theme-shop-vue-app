<template>
    <div class="recommend-view" ref="container">
        <Swiper
            :items="swiperItems"
            :darkIndicator="true"
            :duration="5000"
            class="adv-swiper"
            name="recommend view"
        />
        <QuickActions
            :items="quickActionItems"
        />
        <Loading v-if="showLoading"/>
        <FontList class="pd-h15 mg-b30" :items="fontListItems"/>
    </div>
</template>

<script>
import Swiper from '@/components/app/swiper'
import QuickActions from '@/components/app/home/quick-actions'
import quickActionRecomend from '@/mixins/quick-action'
import FontList from '@/components/app/list-view/font-list/list'
import Loading from '@/components/app/loading'
import cacheUtil from '@/utils/cache'
import config from '@/config'

export default {
    name: 'FontGallery',
    components: { Swiper, Loading, QuickActions, FontList },
    mixins: [quickActionRecomend],
    data() {
        return {
            showLoading: false,
            quickActionItems: [
                { text: '排行榜', routeLink: true, route: 'rank/all' },
                { text: '分类', routeLink: true, route: 'category' }
            ],
            fontListItems: [],
            swiperItems: []
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

    activated() {
        if (this.$refs.container && this.savedScroll) {
            console.log('restore saved scroll')
            this.$refs.container.scrollTop = this.savedScroll
        }
    },

    deactivated() {
        if (this.$refs.container) {
            this.savedScroll = this.$refs.container.scrollTop
        }
    },

    methods: {
        getSwiperItems() {
            this.showLoading = true
            let swiperCacheName = 'font-swiper'
            let swiperCache = cacheUtil.get(swiperCacheName)
            if (!swiperCache) {
                this.$api.getSwiperItems('font').then(list => {
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
            setTimeout(() => {
                this.$api.getThemeList('font').then(list => {
                    this.fontListItems = list
                    this.showLoading = false
                })
            }, 200)
        }
    }
}
</script>

<style lang="scss" scoped>
 .recommend-view {
    height: 100%;
    overflow-y: auto;
 }
</style>
