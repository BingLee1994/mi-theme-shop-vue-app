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
        <RingtoneList :items="ringtoneList"/>
    </div>
</template>

<script>
import Swiper from '@/components/app/swiper'
import QuickActions from '@/components/app/home/quick-actions'
import quickActionRecomend from '@/mixins/quick-action'
import RingtoneList from '@/components/app/list-view/ringtone-list/list'
import Loading from '@/components/app/loading'
import cacheUtil from '@/utils/cache'
import config from '@/config'

export default {
    name: 'RingtoneGallery',
    components: { Swiper, QuickActions, Loading, RingtoneList },
    mixins: [quickActionRecomend],
    data() {
        return {
            swiperItems: [],
            quickActionItems: [
                { text: '排行榜', routeLink: true, route: 'rank/all' },
                { text: '分类', routeLink: true, route: 'category' }
            ],
            ringtoneList: [],
            showLoading: false
        }
    },

    mounted() {
        this.getQuickActionRecommend().then(recommend => {
            recommend.forEach(r => {
                this.quickActionItems.push(r)
            })
        })
        this.getThemeList()
        this.getSwiperItems()
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
            let swiperCacheName = 'ringtone-swiper'
            let swiperCache = cacheUtil.get(swiperCacheName)
            if (!swiperCache) {
                this.$api.getSwiperItems('ringtone').then(list => {
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
            this.$api.getThemeList('ringtone').then(list => {
                this.ringtoneList = list
                this.showLoading = false
            })
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
