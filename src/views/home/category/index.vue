<template>
    <div>
        选择您的category
        <SwiperActivity style="height:500px" ref="swiper">
            <Item name="theme">
              <ThemeView/>
            </Item>
            <Item name="wallpaper">
              <WallpaperView/>
            </Item>
            <Item name="font">
              <FontView />
            </Item>
        </SwiperActivity>
    </div>
</template>

<script>
import SwiperActivity from '@/components/app/swiper-activity/activity'
import Item from '@/components/app/swiper-activity/item'
import FontView from '@views/home/category/font'
import ThemeView from '@views/home/category/theme'
import WallpaperView from '@views/home/category/wallpaper'

const navIdOffset = -1

export default {
    name: 'Category',
    components: { Item, SwiperActivity, FontView, ThemeView, WallpaperView },
    inject: ['changeNav'],
    watch: {
      $route: 'swipeTo'
    },
    mounted() {
      console.log('category mounted')
    },
    methods: {
        swipeTo() {
          let index = Math.max(this.$route.params.id + navIdOffset, 0)
          this.$refs.swiper.swipeTo(index)
        }
    },
    beforeRouteUpdate(to, from, next) {
      next()
    }
}
</script>

<style lang="scss">
</style>
