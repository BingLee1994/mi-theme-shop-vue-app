<template>
    <div class="recommend-view">
        <Swiper
            :items="swiperItems"
            :darkIndicator="true"
            indicatorColor="red"
            :duration="5000"
            class="adv-swiper"
            name="recommend view"
        />
        <QuickActions
            :items="quickActionItems"
        />
        <RingtoneList :items="ringtoneList"/>
    </div>
</template>

<script>
import Swiper from '@/components/app/swiper'
import QuickActions from '@/components/app/home/quick-actions'
import quickActionRecomend from '@/mixins/quick-action'
import RingtoneList from '@/components/app/list-view/ringtone-list/list'

export default {
    name: 'FontGallery',
    components: { Swiper, QuickActions, RingtoneList },
    mixins: [quickActionRecomend],
    mounted() {
        console.log('gallery recommend')
        this.getQuickActionRecommend().then(recommend => {
            recommend.forEach(r => {
                this.quickActionItems.push(r)
            })
        })
        this.swiperItems = [
            {
                imgUrl: 'http://file.market.xiaomi.com/download/ThemeMarket/0c14b462253ff7ae2e032e52d6bf320a5c842d0b8'
            },
            {
                imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587358827235&di=f4c2a18daee87a808ed233421c6e7234&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn19%2F684%2Fw421h263%2F20180602%2F947e-hcikcew8814085.jpg'
            },
            {
                imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587358929000&di=5b8ea8f9be19ba177470f196799e9ad7&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F82%2F77%2F835c48037821257.jpg'
            },
            {
                imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w242/ThemeMarket/061074f72179d01fb5cb97cd2b9f4a5670842c74e'
            }
        ]
    },
    data() {
        let list = []
        for (let i = 0; i < 100; i++) {
            list.push({ text: 'qeqwe', id: i })
        }
        return {
            list,
            swiperItems: [],
            quickActionItems: [
                { text: '排行榜', routeLink: true, route: 'rank/all' },
                { text: '分类', routeLink: true, route: 'category' }
            ],
            ringtoneList: [
                {
                    title: 'test',
                    description: '免费',
                    keywords: ['123', '456'],
                    imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w242/ThemeMarket/061074f72179d01fb5cb97cd2b9f4a5670842c74e'
                },
                {
                    title: 'test',
                    description: '免费',
                    imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w242/ThemeMarket/061074f72179d01fb5cb97cd2b9f4a5670842c74e'
                },
                {
                    title: 'test',
                    description: '免费',
                    imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w242/ThemeMarket/061074f72179d01fb5cb97cd2b9f4a5670842c74e'
                },
                {
                    title: 'test',
                    description: '免费',
                    imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w242/ThemeMarket/061074f72179d01fb5cb97cd2b9f4a5670842c74e'
                },
                {
                    title: 'test',
                    description: '免费',
                    imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w242/ThemeMarket/061074f72179d01fb5cb97cd2b9f4a5670842c74e'
                },
                {
                    title: 'test',
                    description: '免费',
                    imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w242/ThemeMarket/061074f72179d01fb5cb97cd2b9f4a5670842c74e'
                },
                {
                    title: 'test',
                    description: '免费',
                    imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w242/ThemeMarket/061074f72179d01fb5cb97cd2b9f4a5670842c74e'
                }
            ]
        }
    },
    methods: {
        testClick() {
            alert(123)
        }
    }
}
</script>
