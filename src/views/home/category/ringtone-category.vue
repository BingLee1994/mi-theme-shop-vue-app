<template>
    <div class="pd-15">
        <section class="category-wrapper">
            <ImageButton
                v-for="item in styles"
                :key="item.id"
                @click="onClick(item)"
                :src="item.imgUrl"
                small
                cover
            >
                {{item.title}}
            </ImageButton>
        </section>
        <section class="category-wrapper">
            <p class="bold mg-t20">好听的铃声用在哪里？</p>
            <ImageButton
                v-for="item in features"
                :key="item.id"
                @click="gotoCollection(item)"
                :src="item.imgUrl"
                medium
                cover
            >
                {{item.title}}
            </ImageButton>
        </section>
    </div>
</template>

<script>
import ImageButton from '@/components/app/image-button'

export default {
    name: 'ThemeWallpaperCategory',
    components: { ImageButton },
    data() {
        return {
            styles: [
                {
                    title: '流行金曲',
                    imgUrl: ''
                },
                {
                    title: '影视金曲',
                    imgUrl: ''
                },
                {
                    title: '说唱',
                    imgUrl: ''
                },
                {
                    title: '纯音乐',
                    imgUrl: ''
                },
                {
                    title: '古风',
                    imgUrl: ''
                },
                {
                    title: '怀旧金曲',
                    imgUrl: ''
                }
            ],
            features: [
                {
                    title: '来电',
                    imgUrl: ''
                },
                {
                    title: '闹钟',
                    imgUrl: ''
                },
                {
                    title: '通知',
                    imgUrl: ''
                }
            ]
        }
    },

    methods: {
        gotoCollection(item) {
        }
    }
}
</script>

<style lang="scss">
</style>
