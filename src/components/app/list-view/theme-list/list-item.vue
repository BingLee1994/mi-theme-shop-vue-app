<template>
    <div
        class="theme-list-item-warapper"
        @click="onClick"
    >
        <span class="wallpaper-indicator" v-if="showWallpaperIndicator"></span>
        <LazyImg
            :src="item.imgUrl"
            :class="'cover' + (imgClass? imgClass : '')"
            :style="{ width: width, height: imgHeight }"
            fitCover
            :threshold="0.1"
            ref="img"
        />
        <p class="title">{{item.title}}</p>
        <p class="description">{{item.description}}</p>
        <div class="keywords-wrapper" v-if="item.keywords">
            <ColorfulButton
                :plain="true"
                v-for="(keyword, index) in item.keywords"
                :key="index"
                small
                @click.stop="doSearch(keyword)"
            >
                {{keyword.text || keyword}}
            </ColorfulButton>
        </div>
        <StarRank class="mg-t5" v-if="item.rank" :length="5" :point="item.rank"/>
    </div>
</template>

<script>
import LazyImg from '@/components/app/simple-lazy-load-img'
import ColorfulButton from '@/components/app/colorful-button'
import StarRank from '@/components/app/star-rank/star-rank'

export default {
    name: 'WaterfallList',
    components: { LazyImg, ColorfulButton, StarRank },
    data() {
        return {
            imgHeight: ''
        }
    },
    props: {
        item: Object,
        type: String,
        imgClass: String,
        width: {
            type: String,
            default: '100%'
        },
        height: String
    },
    computed: {
        showWallpaperIndicator() {
            return this.item.type === 'wallpaper'
        }
    },
    mounted() {
        if (this.item && !this.item.external) {
            let ratio = window.innerWidth / window.innerHeight
            let width = this.$refs.img.$el.offsetWidth
            let height = width / ratio
            this.imgHeight = height + 'px'
        }
    },
    methods: {
        doSearch(keyword) {
            this.$router.push({
                name: 'search',
                query: {
                    type: this.type || 'theme',
                    keyword
                }
            })
        },
        onClick(item, e) {
            let routeName = 'viewItem'
            let { type, id } = this.$props
            let params = {
                type: type || 'theme',
                id: id || 'tst'
            }
            if (type === 'wallpaper') {
                routeName = 'viewWallpaperItem'
                delete params.type
            }
            this.$router.push({
                name: routeName,
                params
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .theme-list-item-warapper {
        margin-bottom: 25px;
        position: relative;

        .wallpaper-indicator {
            background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PGRlZnM+PHN0eWxlPi5he29wYWNpdHk6MC41O30uYntmaWxsOiNmZmY7fS5je2ZpbGw6IzFlMWUxZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPui1hOa6kCA0PC90aXRsZT48ZyBjbGFzcz0iYSI+PGNpcmNsZSBjbGFzcz0iYiIgY3g9IjIwIiBjeT0iMjAiIHI9IjIwIi8+PC9nPjxwYXRoIGNsYXNzPSJjIiBkPSJNMzEuMDksOC43M0EyLjU4LDIuNTgsMCwwLDAsMjkuMjMsOEgxMS4wOWEyLjQ5LDIuNDksMCwwLDAtMS44NS43NiwyLjU0LDIuNTQsMCwwLDAtLjc3LDEuODZWMjguNzZhMi42MSwyLjYxLDAsMCwwLDIuNjIsMi42MUgyOS4yM2EyLjYsMi42LDAsMCwwLDIuNjItMi42MVYxMC42MkEyLjU0LDIuNTQsMCwwLDAsMzEuMDksOC43M1ptLTE2LjU0LDRhMi42LDIuNiwwLDEsMS0yLjYsMi42QTIuNiwyLjYsMCwwLDEsMTQuNTUsMTIuNzFaTTExLjA5LDI3LjQ4bDQuNTEtNS44NSwzLjI4LDMuOSw0LjUxLTUuODQsNS44NCw3Ljc5WiIvPjwvc3ZnPg==");
            width: 25px;
            height: 25px;
            background-repeat: no-repeat;
            position: absolute;
            top: 10px;
            right: 10px;
            display: inline-block;
            z-index: 10;
        }

        .cover {
            display: flex;
            width: 100%;
            height: 400px;
            border-radius: 10px;
            margin-bottom: 10px;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--black04);
            background-clip: content-box;
        }
        p {
            line-height: 1;
            margin: 5px 0;
        }
        .title {
            line-height: 1.3;
            font-size: 1.2rem;
        }
        .description {
            font-size: 1.3rem;
            color: var(--black50);
        }
        .keywords-wrapper {
            margin-top: 10px;
        }
    }
</style>
