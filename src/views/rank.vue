<template>
    <Screen
        :title="title"
        screenClassName="rank-screen"
        darkMode
    >
        <template slot="main">
            <div class="bg-divider"></div>
            <div class="top-rank-list">
                <div :class="`top-items ${$route.params.type}`" v-if="topList && topList.length">
                    <div
                        v-for="(topItem, idx) in topList"
                        :class="`${$route.params.type} top-item top-item${idx + 1}`"
                        :key="idx"
                        @click="gotoDetail(topItem)"
                    >
                        <span :class="`number number${idx + 1}`">{{idx + 1}}</span>
                        <img class="preview-img" v-show="topItem.imgUrl" :src="topItem.imgUrl"/>
                        <p class="title">{{topItem.title}}</p>
                    </div>
                </div>
                <div :class="`secondary-list ${$route.params.type}`">
                    <div
                        v-for="(item, idx) in rankList"
                        :class="`${$route.params.type} item`"
                        :key="idx"
                        @click="gotoDetail(item)"
                    >
                        <img class="preview-img" v-show="item.imgUrl" :src="item.imgUrl"/>
                        <p class="title">{{item.title}}</p>
                    </div>
                </div>
            </div>
            <Loading v-show="showLoading"/>
        </template>
    </Screen>
</template>

<script>
import Loading from '@/components/app/loading'
import Screen from '@/components/app/base-activity'

export default {
    components: { Loading, Screen },
    data() {
        return {
            showLoading: false,
            topList: [],
            rankList: []
        }
    },

    computed: {
        title() {
            let titles = {
                theme: '主题排行',
                font: '字体排行',
                ringtone: '铃声排行'
            }
            return titles[this.$route.params.type] || '排行榜'
        }
    },

    async mounted() {
        this.getRank()
    },

    methods: {
        async gotoDetail(item) {
            try {
                await this.$router.push({
                    name: 'viewItem', params: { id: item.itemId, type: item.type || 'theme' }
                })
            } catch (err) {
            }
        },

        async getRank() {
            this.showLoading = true
            let response = await this.$api.getRankData(this.$route.params.type)
            let { top1, top2, top3 } = response
            let topList = [top1, top2, top3]
            this.topList = topList.filter(item => item)
            this.rankList = response.rankList
            this.showLoading = false
        }
    }
}
</script>

<style lang="scss">
.rank-screen {
    background: url(../assets/img/cup2.svg) #FA6E52;
    background-color: #FA6E52 !important;
    background-position: center 100px;
    background-size: 150px 150px;
    background-repeat: no-repeat;

    .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .bg-divider {
        height: 200px;
    }

    .top-rank-list {
        --radius: 5px;
        margin: 0 .5rem;
        --topMargin: 3rem;
        --itemHeight: 18rem;
        --itemWidth: 100%;

        .top-items {
            position: relative;
            width: var(--itemWidth);
            margin: 0 auto;

            &.theme {
                height: calc(var(--itemHeight) + var(--topMargin));
            }

            .top-item {
                background: white;
                padding: 1rem;
                transform: scale(1);
                position: relative;

                &.theme {
                    padding-top: 1.5rem;
                    text-align: center;
                    box-sizing: border-box;
                    width: calc(var(--itemWidth)/3);
                    position: absolute;
                    top: var(--topMargin);
                    height: var(--itemHeight);

                    &.top-item1 {
                        top: 0;
                        left: calc(var(--itemWidth)/3);
                        border-top-right-radius: var(--radius);
                        border-top-left-radius: var(--radius);
                        height: calc(var(--itemHeight) + var(--topMargin));
                        box-shadow: 1px -6px 6px var(--black10);
                        z-index: 3;
                    }
                    &.top-item2 {
                        left: 0;
                        border-top-left-radius: var(--radius);
                    }
                    &.top-item3 {
                        right: 0;
                        border-top-right-radius: var(--radius);
                    }

                    .number {
                        position: absolute;
                    }
                }

                &.font {
                    display: flex;
                    align-items: center;
                    padding:1.5rem;
                    overflow: hidden;

                    &.top-item1 {
                        border-top-right-radius: var(--radius);
                        border-top-left-radius: var(--radius);
                    }

                    .number {
                        margin: 0;
                    }

                    .preview-img {
                        width: calc(100% - 5rem);
                        margin: 0 1.5rem
                    }
                }

                .number {
                    $size: 2.2rem;
                    flex: 0 0 auto;
                    width: $size;
                    height: $size;
                    border-radius: $size / 2;
                    text-align: center;
                    line-height: $size;
                    color: white;
                    background-color: violet;
                    left: 50%;
                    top: -#{$size / 2};
                    margin-left: -#{$size / 2};
                    display: inline-block;

                    &.number1 {
                        background-color: #F9DB0A
                    }
                    &.number2 {
                       background-color: #b0b7b8
                    }
                    &.number3 {
                        background-color: #EAC08F
                    }
                }

                .preview-img {
                    display: inline-block;
                    object-fit: contain;
                    height: 80%;
                }
            }
        }

        .secondary-list {
            background: white;
            margin-bottom: 2rem;
            border-bottom-left-radius: var(--radius);
            border-bottom-right-radius: var(--radius);
            display: flex;

            &.font {
                align-items: flex-start;
                flex-direction: column;
                text-align: center;
            }

            .item {
                .preview-img{
                    display: inline-block;
                }
                &.theme {
                    width: calc(100% / 3);
                    flex-basis: auto;
                    padding: 1rem;
                    box-sizing: border-box;
                    overflow: hidden;
                    text-align: center;

                    .preview-img{
                        width: 100%;
                        border-radius: .5rem;
                    }
                }

                &.font {
                    height: 3rem;
                    text-align: center;
                    box-sizing: content-box;
                    padding: 2rem;
                    overflow: hidden;

                    .preview-img{
                        object-fit: contain;
                        height: 100%;
                        border-radius: .5rem;
                    }
                }
            }
        }
    }
}
</style>
