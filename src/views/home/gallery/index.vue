<template>
    <div>
        广场
        <SwiperActivity
          style="height:500px"
          ref="swiper"
          @indexChange="onSwiperIndexChange"
        >
            <Item name="reconmand">
              <RecommendView />
            </Item>
            <Item name="theme">
              <ThemeView/>
            </Item>
            <Item name="wallpaper">
              <WallpaperView/>
            </Item>
        </SwiperActivity>
    </div>
</template>

<script>
import SwiperActivity from '@/components/app/swiper-activity/activity'
import Item from '@/components/app/swiper-activity/item'
import RecommendView from '@views/home/gallery/recommend'
import ThemeView from '@views/home/gallery/theme'
import WallpaperView from '@views/home/gallery/wallpaper'

export default {
    name: 'Gallery',
    components: { Item, SwiperActivity, RecommendView, ThemeView, WallpaperView },
    inject: ['changeNav'],
    watch: {
      $route: 'swipeTo'
    },
    mounted() {
      console.log('gallery mounted')
    },
    methods: {
        swipeTo() {
          let index = this.$route.params.id
          this.$refs.swiper.swipeTo(index)
        },
        onSwiperIndexChange(idx, name) {
          console.log(this)
          this.changeNav(name, idx)
        }
    },
    beforeRouteUpdate(to, from, next) {
      console.log('路由更新了')
      next()
    }
}
</script>

<style lang="scss">
  .home-selected {
    color: pink;
  }
  .me-selected {
    color: blue;
  }
  .category-selected {
    color: green;
  }
</style>
