<template>
    <div class="theme-categiry-screen">
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
                        style="margin:0 10px"
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
                        style="margin:0 10px"
                    />
                    <div class="more-button">
                        <a>更多</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="category-wrapper">
            <p class="title">你想要什么风格？</p>
            <ImageButton
                v-for="item in styles"
                :key="item.id"
                @click="onClick(item)"
                :src="item.imgUrl"
                small
            >
                {{item.text}}
            </ImageButton>
        </section>

        <section class="category-wrapper">
            <p class="title">你想要什么功能？</p>
            <ImageButton
                v-for="item in features"
                :key="item.id"
                @click="onClick(item)"
                :src="item.imgUrl"
                small
                textAlign="center bottom"
            >
                {{item.text}}
            </ImageButton>
        </section>
    </div>
</template>

<script>
import ThemeListItem from '@/components/app/list-view/theme-list/list-item'
import ImageButton from '@/components/app/image-button'

export default {
    name: 'ThemeWallpaperCategory',
    components: { ThemeListItem, ImageButton },

    data() {
        return {
            styles: [
                {
                    text: '中国风'
                },
                {
                    text: '小清新'
                },
                {
                    text: '萌萌哒'
                }
            ],
            features: [
                {
                    text: '炫酷锁屏'
                },
                {
                    text: '百变壁纸'
                },
                {
                    text: '彩虹电池'
                }
            ],
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
.theme-categiry-screen {
    .top-rank-list-wrapper {
        border-bottom: 1px solid var(--black03);
        padding: 15px 10px;
        padding-bottom: 0;

        & > .title {
            font-size: 1.5rem;
            color: var(--black);
            margin: 15px 10px;
            line-height: 1;
        }

        .sub-title {
            margin: 10px 15px;
            font-size: 1.2rem;
            width: 13px;
            height: 100%;
            word-break: break-word;
            color: var(--black60);
        }

        .rank-list {
            overflow-x: auto;
            align-items: center;
            padding-bottom: 15px;
            .more-button {
                flex-basis: 50px;
                width: 50px;
                display: block;
                flex-shrink: 0;
            }
        }
    }

    .category-wrapper {
        padding: 10px;

        & > .title {
            margin: 10px;
            margin-top: 15px;
        }
    }
}
</style>
