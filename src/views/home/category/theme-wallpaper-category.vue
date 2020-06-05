<template>
    <div>
        <section>
            <div class="top-rank-list-wrapper">
                <p class="title">人气榜单</p>
                <div v-flex class="rank-list">
                    <p class="sub-title">人气爆款，好看经典</p>
                    <ThemeListItem
                        v-for="item in topThemeList"
                        :key="item.name"
                        :item="item"
                        width="90px"
                        style="margin-right: 10px"
                    />
                    <div class="more-button">
                        <a>更多</a>
                    </div>
                </div>
            </div>
            <div class="top-rank-list-wrapper">
                <p class="title">人气榜单</p>
                <div v-flex class="rank-list">
                    <p class="sub-title">人气爆款，好看经典</p>
                    <ThemeListItem
                        v-for="item in newThemeList"
                        :key="item.name"
                        :item="item"
                        width="90px"
                        style="margin-right: 10px"
                    />
                    <div class="more-button">
                        <a>更多</a>
                    </div>
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
.top-rank-list-wrapper {
    border-bottom: 1px solid var(--black03);
    .title {
        font-size: 1.7rem;
        color: var(--black);
        margin: 10px;
    }
    .sub-title {
        -webkit-writing-mode: vertical-lr;
        margin: 10px 15px;
        line-height: 1;
        letter-spacing: 5px;
    }
    .rank-list {
        overflow-x: auto;
        .more-button {
            flex-basis: 50px;
            width: 50px;
            display: block;
            flex-shrink: 0;
        }
    }
  }
</style>
