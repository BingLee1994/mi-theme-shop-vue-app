<template>
    <div>
        <NavBar
          :navItems="navItems"
          :selectedNav="currentNavIndex"
          @clickNavItem="selectNavByIndex"
        >
        </NavBar>
        <button @click="gotoSearch">搜索</button>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

        <TabBar
          :tabs="tabs"
          @clickTab="selectTab"
          :selectedTab="currentTab"
        ></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/app/tab-bar'
import { tabsData } from './nav-and-tabs'
import NavBar from '@/components/app/nav-bar'
import NavigationMixin from '@/mixins/navigation'

export default {
    name: 'Home',
    components: { TabBar, NavBar },
    mixins: [NavigationMixin],

    watch: {
      $route() {
        this.syncNavTabByRoute()
      }
    },

    created() {
      this.syncNavTabByRoute()
    },

    data() {
        return {
          currentTab: 0,
          tabs: tabsData()
        }
    },

    methods: {
      syncNavTabByRoute() {
        let { name: routeName, matched: matchedRoutes } = this.$route
        if (routeName === 'home') {
          return this.selectTab(0)
        }

        let whichRoute = 0
        let routesLength = matchedRoutes.length
        for (; whichRoute < routesLength; whichRoute++) {
          let { tabs } = this
          let { length } = tabs
          let index = 0
          let matched = false
          let route = matchedRoutes[whichRoute]
          for (; index < length; index++) {
            if (tabs[index].route.name === route.name) {
              matched = true
              break
            }
          }
          if (matched) {
            this.currentTab = index
            break
          }
        }
      },

      _checkHideNav(routeName) {
        let recommendNav = 0
        if (routeName === 'gallery') {
          this.showNavItem(recommendNav)
        } else {
          this.hideNavItem(recommendNav)
        }
      },

      selectTab(index = 0) {
          let route = this.tabs[index].route
          if (this.$router.currentRoute.name !== route.name) {
            this.$router.push(route)
            this._checkHideNav(route.name)
          }
      },

      gotoSearch() {
        this.$router.push({ name: 'search', query: { type: this.currentNavName } })
      }
    }
}
</script>

<style lang="scss">
  .gallery-selected {
    color: pink;
  }
  .me-selected {
    color: blue;
  }
  .category-selected {
    color: green;
  }
  .adv-swiper {
    border-radius: 10px;
    overflow: hidden;
    height: 30vh;
    width: calc(100% - 2px);
    margin: 1px;
  }
</style>
