<template>
    <div>
        <keep-alive>
          <SwiperActivity
            ref="swiper"
            @indexChange="onSwiperIndexChange"
            :selected="currentNavIndex"
          >
              <Item
                v-for="item in swiperItems"
                :key="item.index"
                :extra="item.index"
                class="view-content"
              >
                <component :is="item.component" />
              </Item>
          </SwiperActivity>
        </keep-alive>
    </div>
</template>

<script>
import SwiperActivity from '@/components/app/swiper-activity/activity'
import Item from '@/components/app/swiper-activity/item'
import RecommendView from '@views/home/gallery/recommend'
import ThemeView from '@views/home/gallery/theme'
import WallpaperView from '@views/home/gallery/wallpaper'
import NavigationMixin from '@/mixins/navigation'

const navComponentMap = {
  theme: 'ThemeView',
  recommend: 'RecommendView',
  wallpaper: 'WallpaperView',
  font: null,
  ringtone: null
}

export default {
    name: 'Gallery',
    components: { Item, SwiperActivity, RecommendView, ThemeView, WallpaperView },
    mixins: [NavigationMixin],

    data() {
      return {
        swiperItems: []
      }
    },

    created() {
      let swiperItems = []
      this.navItems.forEach((n, index) => {
        let componentName = navComponentMap[n.name]
        if (componentName) {
          swiperItems.push({
            index,
            component: componentName
          })
        }
      })
      this.swiperItems = swiperItems
    },

    methods: {
      onSwiperIndexChange(_, navIndex) {
        this.selectNavByIndex(navIndex)
      }
    },

    beforeRouteUpdate(to, from, next) {
      console.log('复用了')
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
