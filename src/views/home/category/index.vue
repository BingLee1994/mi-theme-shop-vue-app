<script>
import SwiperActivity from '@/components/app/swiper-activity/activity'
import Item from '@/components/app/swiper-activity/item'
import FontView from '@views/home/category/font'
import ThemeView from '@views/home/category/theme'
import WallpaperView from '@views/home/category/wallpaper'
import NavigationMixin from '@/mixins/navigation'

const navComponentMap = {
  theme: ThemeView,
  wallpaper: WallpaperView,
  font: FontView,
  ringtone: null
}

export default {
    name: 'Category',
    mixins: [NavigationMixin],
    render() {
      if (this.$route.name !== 'category') {
        return
      }
      let { currentNavIndex, currentNavName } = this
      let swiperItems = []
      let selectedNavIndex = null
      let selectedSwiperIndex = 0

      this.navItems.forEach((nav, index) => {
        let componentName = navComponentMap[nav.name]
        if (componentName && !nav.hidden) {
          swiperItems.push({
            index,
            component: componentName
          })
          if (nav.name === currentNavName) {
            selectedSwiperIndex = swiperItems.length - 1
            selectedNavIndex = index
          }
        }
      })

      if (!selectedNavIndex) {
        selectedNavIndex = swiperItems[0].index
      }

      if (selectedNavIndex && selectedNavIndex !== currentNavIndex) {
        this.selectNavByIndex(selectedNavIndex)
      }

      return (
        <div class="view-content">
          请选择
          <KeepAlive>
            <SwiperActivity
              ref="swiper"
              selected={selectedSwiperIndex}
              onIndexChange={this.onSwiperIndexChange.bind(this)}
            >{
                swiperItems.map(item => {
                  let Component = item.component
                  return (
                    <Item
                      key={item.index}
                      extra={item.index}
                      class="view-content"
                    >
                      <Component/>
                    </Item>
                  )
                })
              }</SwiperActivity>
            </KeepAlive>
        </div>
      )
    },

    methods: {
      onSwiperIndexChange(_, navIndex) {
        this.selectNavByIndex(navIndex)
      }
    },

    beforeRouteUpdate(to, from, next) {
      next()
    }
}
</script>

<style lang="scss">
</style>
