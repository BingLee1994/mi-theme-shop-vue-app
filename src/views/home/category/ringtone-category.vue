<template>
    <div class="pd-15">
        <section class="category-wrapper">
            <ImageButton
                v-for="item in styles"
                :key="item.id"
                @click="onClick(item)"
                :src="item.imgUrl"
                medium
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
                    imgUrl: '/tmp/ringtone/s8.png'
                },
                {
                    title: '影视金曲',
                    imgUrl: '/tmp/ringtone/s5.png'
                },
                {
                    title: '说唱',
                    imgUrl: '/tmp/ringtone/s6.png'
                },
                {
                    title: '纯音乐',
                    imgUrl: '/tmp/ringtone/s7.png'
                },
                {
                    title: '古风',
                    imgUrl: '/tmp/ringtone/s10.png'
                },
                {
                    title: '怀旧',
                    imgUrl: '/tmp/ringtone/s9.png'
                }
            ],
            features: [
                {
                    title: '来电',
                    imgUrl: '/tmp/ringtone/s1.png'
                },
                {
                    title: '闹钟',
                    imgUrl: '/tmp/ringtone/s2.png'
                },
                {
                    title: '通知',
                    imgUrl: '/tmp/ringtone/s4.png'
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
