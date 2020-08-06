<template>
    <Screen
        :title="title"
        screenClassName="rank-screen"
        darkMode
    >
        <template slot="main">
            <div class="bg-divider"></div>
            <div class="top-rank-list">
                <div class="top-items">
                    <div class="top-item top-item1">
                        <span class="number">1</span>
                        <img class="preview-img" src="http://t4.market.xiaomi.com/thumbnail/jpeg/w118/ThemeMarket/05b35844191c84c8d26577245569a17275da499b3"/>
                        <span>asdasdasdas</span>
                    </div>
                    <div class="top-item top-item2">
                        <span class="number">1</span>
                        <img class="preview-img"  src="http://t4.market.xiaomi.com/thumbnail/jpeg/w118/ThemeMarket/05b35844191c84c8d26577245569a17275da499b3"/>
                        <span>asdasdasdas</span>
                    </div>
                    <div class="top-item top-item3">
                        <span class="number">1</span>
                        <img class="preview-img"  src="http://t4.market.xiaomi.com/thumbnail/jpeg/w118/ThemeMarket/05b35844191c84c8d26577245569a17275da499b3"/>
                        <span>asdasdasdas</span>
                    </div>
                </div>
                <div class="secondary-list"></div>
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
        this.getRank(this.tabs[0].type)
    },

    methods: {
        async viewDetail(item) {
            try {
                await this.$router.push({
                    name: 'viewItem', params: { id: item.itemId, type: item.type || 'theme' }
                })
            } catch (err) {
            }
        },

        async getRank(type) {
            this.showLoading = true
            let response = await this.$api.getFavorite(type)
            if (type === 'theme') {
                response = response.map(theme => {
                    return {
                        imgUrl: theme.imgUrl,
                        id: theme.id,
                        name: theme.name,
                        type: 'theme'
                    }
                })
            }
            this.orderList[type] = response
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
            height: calc(var(--itemHeight) + var(--topMargin));
            .top-item {
                width: calc(var(--itemWidth)/3);
                position: absolute;
                top: var(--topMargin);
                height: var(--itemHeight);
                background: white;
                padding: 1rem;
                padding-top: 1.5rem;
                text-align: center;
                box-sizing: border-box;
                transform: scale(1);

                .number {
                    position: absolute;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 1rem;
                    text-align: center;
                    line-height: 2rem;
                    color: white;
                    background-color: violet;
                    left: 50%;
                    top: -1rem;
                    margin-left: -1rem;
                }

                .preview-img {
                    display: inline-block;
                    object-fit: contain;
                    height: 80%;
                    background: gray;
                }

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
            }
        }

        .secondary-list {
            background: white;
            height: 500px;
            margin-bottom: 2rem;
            border-bottom-left-radius: var(--radius);
            border-bottom-right-radius: var(--radius);
        }
    }
}
</style>
