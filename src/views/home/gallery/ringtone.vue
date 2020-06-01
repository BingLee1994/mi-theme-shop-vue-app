<template>
    <div style="width:100%">
        铃声广场
        <Swiper
            :items="swiperItems"
            :darkIndicator="true"
            :duration="8000"
            class="adv-swiper"
            name="theme view"
        />
        <QuickActions
            :items="quickActionItems"
            @click="onClickQuickAction"
        />
    </div>
</template>

<script>
import Swiper from '@/components/app/swiper'
import QuickActions from '@/components/app/home/quick-actions'
import quickActionRecomend from '@/mixins/quick-action'

export default {
    name: 'ThemeGallery',
    components: { Swiper, QuickActions },
    mixins: [quickActionRecomend],
    mounted() {
        console.log('theme 渲染')
        this.getQuickActionRecommend().then(recommend => {
            recommend.forEach(r => {
                this.quickActionItems.push(r)
            })
        })
    },

    data() {
        let list = []
        for (let i = 0; i < 100; i++) {
            list.push({ text: 'item', id: i })
        }
        return {
            list,
            swiperItems: [],
            quickActionItems: [
                { text: '排行榜', routeLink: true, route: 'rank/theme' },
                { text: '分类', routeLink: true, route: 'category' }
            ]
        }
    },

    methods: {
        onClickQuickAction(item) {
            console.log('customer click action')
        }
    }
}
</script>
