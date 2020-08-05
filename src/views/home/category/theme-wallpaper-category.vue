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
                </div>
            </div>
            <div class="top-rank-list-wrapper">
                <p class="title">新品榜单</p>
                <div v-flex class="rank-list">
                    <p class="sub-title">优质新品，等你发现</p>
                    <ThemeListItem
                        v-for="item in newThemeList"
                        :key="item.name"
                        :item="item"
                        width="90px"
                        style="margin:0 10px"
                    />
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
            styles: [],
            features: [],
            topThemeList: [],
            newThemeList: []
        }
    },

    mounted() {
        this.getData()
    },

    methods: {
        async getData() {
            try {
                let trend = await this.$api.getTrend('theme')
                let styleAndFeature = await this.$api.getStyle('theme')

                this.topThemeList = trend.topList
                this.newThemeList = trend.newList

                this.styles = styleAndFeature.styles
                this.features = styleAndFeature.features
            } catch (err) {
                console.log(err)
                this.$toast.show('服务期初小差了！请稍后再试（模拟）')
            }
        }
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
            font-size: 1.6rem;
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
            align-items: flex-start;
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
