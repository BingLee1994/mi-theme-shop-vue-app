<template>
    <div>
        <RankList
            class="top-rank-wrapper"
            accentColor="#FC565E"
            title="热销榜单"
            :list="rankList.bestSeller">
            <template slot="titleIcon">
                <span class="rank-icon mg-r5 bg-contain"></span>
            </template>
            <span slot="titleTailIcon" class="bg-contain rank-tail-icon mg-l5"></span>
            <template slot="rankNumber" slot-scope="rank">
                <span :class="`rank-number rank-number-${rank.rankNumber}`">{{rank.rankNumber}}</span>
            </template>
        </RankList>
        <RankList
            accentColor="#9B51FE"
            title="新品榜单"
            :list="rankList.newSeller">
        </RankList>

        <p class="pd-h20 mg-b5 mg-t25">字体集</p>
        <FontPreviewList
            @clickItem="gotoDetail"
            :items="fontCollection"
        />
    </div>
</template>

<script>
import RankList from './component/font-rak-list'
import FontPreviewList from './component/font-preview-card-list'

export default {
    name: 'ThemeWallpaperCategory',
    components: { RankList, FontPreviewList },
    data() {
        return {
            rankList: {
                bestSeller: [
                    { imgUrl: 'http://t3.market.xiaomi.com/thumbnail/png/w250/ThemeMarket/0517aa4ff7960423a3d8300bb1ff85087822c5176', id: 1 },
                    { imgUrl: 'http://t2.market.xiaomi.com/thumbnail/png/w250/ThemeMarket/01d6345b4f4ac433b1510fc80c7ec67f3bc731266', id: 2 },
                    { imgUrl: 'http://t4.market.xiaomi.com/thumbnail/png/w250/ThemeMarket/00251d5569ebf41ec2bae7302aeacb1612b2c5eb1', id: 3 }
                ],
                newSeller: [
                    { imgUrl: 'http://t5.market.mi-img.com/thumbnail/png/w250/ThemeMarket/0546a5917a858cbd14f330e6cb2ccf545684134c4', id: 4 },
                    { imgUrl: 'http://t5.market.xiaomi.com/thumbnail/png/w250/ThemeMarket/0dea547e12d86eb19071d2c4205c0ee4d8b418c3c', id: 5 },
                    { imgUrl: 'http://t3.market.xiaomi.com/thumbnail/png/w250/ThemeMarket/0617aa5ff7950423e3d83c0bb19f850f782225176', id: 6 }
                ]
            },
            fontCollection: [
                { nameCN: '方正字体', nameEN: 'FANG ZHENG @ 123' },
                { nameCN: '汉仪字体', nameEN: 'HANYI @ 123' },
                { nameCN: '神韵字体', nameEN: 'SHENYUN @ 123' },
                { nameCN: '兄弟字体', nameEN: 'XIONGDI @ 123' },
                { nameCN: '腾翔字体', nameEN: 'STENGXIANG @ 123' },
                { nameCN: '伯乐字体', nameEN: 'BOLE @ 123' },
                { nameCN: '梦家叔字体', nameEN: 'UNCLE @ 123' },
                { nameCN: 'XFont', nameEN: 'XFONT @ 123' },
                { nameCN: '文鼎字体', nameEN: 'WENDING @ 123' },
                { nameCN: '书法字体', nameEN: 'SHUFA @ 123' }
            ]
        }
    },

    methods: {
        gotoDetail(fontItem) {
            console.log(fontItem)
            this.$router.push({
                name: 'viewItem',
                params: {
                    type: 'font',
                    id: fontItem.id || 'PHN2ZyB4bWxucz'
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .top-rank-wrapper {
        background-size: cover;
        background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjAwIDEwMCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6dXJsKCNhKTt9LmJ7ZmlsbDp1cmwoI2IpO308L3N0eWxlPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjEzMCIgeTE9IjQwLjUiIHgyPSIyMDAiIHkyPSI0MC41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjJkNjA4IiBzdG9wLW9wYWNpdHk9IjAuNyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2YyZDYwOCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMCIgeTE9IjgwLjUiIHgyPSI3Mi45MyIgeTI9IjgwLjUiIHhsaW5rOmhyZWY9IiNhIi8+PC9kZWZzPjx0aXRsZT7otYTmupAgMTwvdGl0bGU+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMzAsMjcuNWE1My40OSw1My40OSwwLDAsMCw3MCw1MC44OVYwSDEzNy42MUE1My4yMSw1My4yMSwwLDAsMCwxMzAsMjcuNVoiLz48cGF0aCBjbGFzcz0iYiIgZD0iTTE0LDYxQTY0LjU5LDY0LjU5LDAsMCwwLDAsNjIuNTVWMTAwSDcyLjkzQTY0LDY0LDAsMCwwLDE0LDYxWiIvPjwvc3ZnPg==");
    }
    .rank-icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgOTAgOTAiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOnVybCgjYSk7fTwvc3R5bGU+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iNDUiIHkxPSI5MCIgeDI9IjQ1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjJkNjA4IiBzdG9wLW9wYWNpdHk9IjAuNyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2YyZDYwOCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZT7otYTmupAgMjwvdGl0bGU+PHBhdGggY2xhc3M9ImEiIGQ9Ik05MCw4Ljg3VjQxYTguNDgsOC40OCwwLDAsMS0yLjc1LDYuMTIsOC40OCw4LjQ4LDAsMCwxLTYuMTIsMi43NUg2Ni41NUEyMi42MSwyMi42MSwwLDAsMSw2MS44LDYxLjQ4cS0zLjkxLDQuODYtMTIuMzYsNi4xM1Y3Ni45cTkuNzIuODQsMTEuODMsNC4xMkExMS43NSwxMS43NSwwLDAsMSw2Myw4OC43M1Y5MEgyN1Y4OC4zMWExMS43NSwxMS43NSwwLDAsMSwxLjY5LTcuNzFxMi4xMS0zLjI3LDExLjgzLTQuMTJ2LTkuM3EtOC0xLjI2LTEyLTYuMTJhMjMuNjIsMjMuNjIsMCwwLDEtNS4wNy0xMS42Mkg4Ljg3YTguNDgsOC40OCwwLDAsMS02LjEyLTIuNzVBOC40OSw4LjQ5LDAsMCwxLDAsNDAuNTZWOC44N0gyMi4zOVYwSDY3LjYxVjguODdIOTBaTTIyLjM5LDQwLjU2VjE4SDguODd2MjIuNlpNODEuMTMsMThINjcuNjF2MjIuNkg4MS4xM1oiLz48L3N2Zz4=");
    }
    .rank-tail-icon {
        width: 40px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        filter: brightness(1.5);
        background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTIxLjU2IDQ5LjkxIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDp1cmwoI2EpO30uYntmaWxsOnVybCgjYik7fS5je2ZpbGw6dXJsKCNjKTt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHkxPSIyNi41MiIgeDI9IjQ1LjQxIiB5Mj0iMjYuNTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmMmQ2MDgiIHN0b3Atb3BhY2l0eT0iMC43Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjJkNjA4Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIxNjIuOTEiIHkxPSItMjAuODUiIHgyPSIxOTEuMyIgeTI9Ii0yMC44NSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgtNzEuMDkgMjkuOTgpIHJvdGF0ZSg2LjQpIiB4bGluazpocmVmPSIjYSIvPjxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9IjU3LjcxIiB5MT0iMTYuODYiIHgyPSI5MS4zMiIgeTI9IjE2Ljg2IiB4bGluazpocmVmPSIjYSIvPjwvZGVmcz48dGl0bGU+6LWE5rqQIDI8L3RpdGxlPjxwb2x5Z29uIGNsYXNzPSJhIiBwb2ludHM9IjQzLjU5IDEwLjMzIDM2LjkgMjUuMjcgNDUuNDEgMzkuMjQgMjkuMTQgMzcuNSAxOC40NyA0OS45MSAxNS4xIDMzLjkgMCAyNy41OSAxNC4xOSAxOS40NCAxNS41MiAzLjEzIDI3LjY2IDE0LjEgNDMuNTkgMTAuMzMiLz48cG9seWdvbiBjbGFzcz0iYiIgcG9pbnRzPSIxMDIuODEgNDMuMjkgMTAxLjk3IDMzLjA1IDkzLjA3IDI3Ljk0IDEwMi41NCAyMy45OCAxMDQuNjUgMTMuOTMgMTExLjM1IDIxLjcyIDEyMS41NiAyMC42MiAxMTYuMjIgMjkuMzkgMTIwLjQyIDM4Ljc2IDExMC40MyAzNi40IDEwMi44MSA0My4yOSIvPjxwb2x5Z29uIGNsYXNzPSJjIiBwb2ludHM9Ijc2LjU3IDMzLjcxIDY5LjYxIDI0LjA2IDU3LjcxIDI0LjMyIDY0Ljc0IDE0LjcyIDYwLjgxIDMuNDkgNzIuMTEgNy4yMSA4MS41OCAwIDgxLjU0IDExLjkgOTEuMzIgMTguNjggNzkuOTkgMjIuMzIgNzYuNTcgMzMuNzEiLz48L3N2Zz4=");
    }
    .rank-number {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        display: block;
        text-align: center;
        line-height: 20px;
        color: white;

        &-1 {
            background-color: #FFB947;
        }

        &-2 {
            background-color: #E290FF;
        }

        &-3 {
            background-color: #5BEAAC;
        }
    }
</style>
