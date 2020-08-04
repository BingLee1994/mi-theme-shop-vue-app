<template>
    <div class="wallpaper-viewer screen">
        <div class="title-bar">
            <Icon
                type="back"
                :colorMode="0"
                :autoDarkMode="false"
                @click="goBack"
            />
            <p class="title">{{title}}</p>
        </div>
        <Swiper
            :items="wallpapers"
            :darkIndicator="true"
            :disableTimer="true"
            class="wallpaper-swiper"
        />
        <Button widen class="bottom-btn" @click="setWallpaper">设置壁纸</Button>
        <Loading v-if="false"/>
    </div>
</template>

<script>
import Swiper from '@/components/app/swiper.vue'
import Loading from '@/components/app/loading'
import Button from '@miui/buttons/button'
import Icon from '@/components/app/icons'

export default {
    name: 'ThemeWallpaperGallery',
    components: { Swiper, Loading, Button, Icon },
    data() {
        return {
            wallpapers: [],
            title: ''
        }
    },
    mounted() {
        this.$toast.show('demo版，壁纸随机显示哦。（由于没有真实后台）')
        this.getWallpapers()
    },
    methods: {
        goBack() {
            history.back()
        },

        async getWallpapers() {
            try {
                let itemDetail = await this.$api.getItemDetail(this.$route.params.id, 'wallpaper')
                let wallpapers = itemDetail.previewImgs
                let { title } = itemDetail
                if (wallpapers.length > 1) {
                    title += `（${wallpapers.length}张）`
                }
                this.wallpapers = wallpapers
                this.title = title
            } catch (err) {}
        },
        setWallpaper() {
            this.$dialog.actionList({
                title: '选择要设置的壁纸类型',
                actionList: [
                    '桌面壁纸',
                    '锁屏壁纸',
                    '桌面和锁屏壁纸'
                ]
            }).then(option => {
                this.$toast.show('已设置' + option)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wallpaper-viewer {
    & > .title-bar {
        position: absolute;
        padding: 20px;
        top: 0;
        left: 0;
        right: 0;
        height: 80px;
        z-index: 10;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0) 100%);

        & .title {
            position: absolute;
            top: 20px;
            left: 50px;
            right: 50px;
            text-align: center;
            color: white;
            font-size: 1.5rem;
        }
    }

    .wallpaper-swiper {
        height: 100%;
    }

    .bottom-btn {
        position: absolute;
        bottom: 20px;
        color: black;
        background-color: rgba(255,255,255,.3);
        backdrop-filter: blur(20px);
    }
}
</style>
