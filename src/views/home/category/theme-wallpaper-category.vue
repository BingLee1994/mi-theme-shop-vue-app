<template>
    <div>
        <section>
            <div class="top-rank-list">
                <p class="title">人气榜单</p>
                <div v-flex>
                    <p class="sub-title">人气爆款，好看经典</p>
                    <ThemeListItem
                        v-for="item in topThemeList"
                        :key="item.name"
                        :item="item"
                    />
                </div>
            </div>
            <div class="top-rank-list">
                <p class="title">人气榜单</p>
                <div v-flex>
                    <p class="sub-title">人气爆款，好看经典</p>
                    <ThemeListItem
                        v-for="item in newThemeList"
                        :key="item.name"
                        :item="item"
                    />
                </div>
            </div>
        </section>

        <section>
        </section>
    </div>
</template>

<script>
import ThemeListItem from '@/components/app/theme-list/list-item'

export default {
    name: 'ThemeWallpaperCategory',
    components: { ThemeListItem },

    data() {
        return {
            topThemeList: [
                {
                    title: '超炫IOS',
                    imgUrl: 'http://file.market.xiaomi.com/download/ThemeMarket/0c14b462253ff7ae2e032e52d6bf320a5c842d0b8'
                },
                {
                    title: '超炫IOS',
                    imgUrl: 'http://file.market.xiaomi.com/download/ThemeMarket/0c14b462253ff7ae2e032e52d6bf320a5c842d0b8'
                },
                {
                    title: '超炫IOS',
                    imgUrl: 'http://file.market.xiaomi.com/download/ThemeMarket/0c14b462253ff7ae2e032e52d6bf320a5c842d0b8'
                }
            ],
            newThemeList: [
                {
                    title: '超炫IOS',
                    imgUrl: 'http://file.market.xiaomi.com/download/ThemeMarket/0c14b462253ff7ae2e032e52d6bf320a5c842d0b8'
                },
                {
                    title: '超炫IOS',
                    imgUrl: 'http://file.market.xiaomi.com/download/ThemeMarket/0c14b462253ff7ae2e032e52d6bf320a5c842d0b8'
                },
                {
                    title: '超炫IOS',
                    imgUrl: 'http://file.market.xiaomi.com/download/ThemeMarket/0c14b462253ff7ae2e032e52d6bf320a5c842d0b8'
                }
            ]
        }
    },

    methods: {
    }
}
</script>

<style lang="scss">
.top-rank-list {
    .sub-title {
        -webkit-writing-mode: vertical-lr;
    }
  }
</style>
