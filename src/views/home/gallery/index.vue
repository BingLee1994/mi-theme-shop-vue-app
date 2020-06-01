<template>
    <div class="gallery-screen">
        <div class="header" v-flex.centerY>
            <NavBar
              :navItems="navItems"
              :selectedNav="currentNavIndex"
              @clickNavItem="selectNavByIndex"
              class="nav-list-wrapper"
            >
            </NavBar>
            <button v-flex-item.0 class="search-button icn icn-search" @click="gotoSearch"></button>
        </div>
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
import ThemeWallpaperView from '@views/home/gallery/theme-wallpaper'
import FontView from '@views/home/gallery/font'
import RingtoneView from '@views/home/gallery/ringtone'
import NavBar from '@/components/app/nav-bar'
import navigationBar from '@/mixins/navigation'

const navComponentMap = {
  theme: 'ThemeWallpaperView',
  font: 'FontView',
  ringtone: 'RingtoneView'
}

export default {
    name: 'Gallery',
    mixins: [navigationBar],
    components: { NavBar, Item, SwiperActivity, ThemeWallpaperView, FontView, RingtoneView },

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
      },

      /* selectNavByIndex(idx) {
        this.selectNavByIndex = idx
      }, */

      gotoSearch() {
        this.$router.push({ name: 'search', query: { type: this.currentNavName } })
      }
    },

    beforeRouteUpdate(to, from, next) {
      console.log('复用了')
      next()
    }
}
</script>

<style lang="scss">
  .gallery-screen {
    .header {
      padding: 0 10px;
    }
  }
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
