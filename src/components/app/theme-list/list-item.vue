<template>
    <div
        class="theme-list-item-warapper"
        @click="onClick"
    >
        <LazyImg
            :src="item.imgUrl"
            :class="'cover' + (imgClass? imgClass : '')"
            :style="{ height: imgHeight }"
            fitCover
            :threshold="0.1"
        />
        <p class="title">{{item.title}}</p>
        <p class="description">{{item.description}}</p>
        <div class="keywords-wrapper" v-if="item.keywords">
            <ColorfulButton
                :plain="true"
                v-for="(keyword, index) in item.keywords"
                :key="index"
                small
            >
                {{keyword.text || keyword}}
            </ColorfulButton>
        </div>
    </div>
</template>

<script>
import LazyImg from '@/components/app/simple-lazy-load-img'
import ColorfulButton from '@/components/app/colorful-button'

export default {
    name: 'WaterfallList',
    components: { LazyImg, ColorfulButton },
    data() {
        return {
            imgHeight: ''
        }
    },
    props: {
        item: Object,
        type: String,
        imgClass: String
    },
    mounted() {
        if (this.item && !this.item.external) {
            let ratio = window.innerWidth / window.innerHeight
            let width = this.$el.offsetWidth
            let height = width / 9 * 16
            if (ratio < 9 / 16) {
                height = width / 9 * 18
            }
            this.imgHeight = height + 'px'
        }
    },
    methods: {
        onClick(item, e) {
            this.$emit('click', item, e)
        }
    }
}
</script>

<style scoped lang="scss">
    .theme-list-item-warapper {
        margin-bottom: 20px;

        .cover {
            display: flex;
            width: 100%;
            height: 400px;
            border-radius: 10px;
            margin-bottom: 10px;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--black05);
        }
        p {
            line-height: 1;
            margin: 5px 0;
        }
        .title {
            line-height: 1.3;
            font-size: 1.4rem;
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
