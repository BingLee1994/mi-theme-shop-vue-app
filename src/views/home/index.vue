<template>
    <div class="home-screen" v-flex:direction="'column'">
        <keep-alive>
          <router-view class="body" v-flex-item.1></router-view>
        </keep-alive>
        <TabBar
          :tabs="tabs"
          @clickTab="selectTab"
          :selectedTab="currentTab"
          class="footer"
          v-flex-item.0
        ></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/app/tab-bar'
import { tabsData } from './nav-and-tabs'

export default {
    name: 'Home',
    components: { TabBar },

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
        /* let recommendNav = 0
        if (routeName === 'gallery') {
          this.showNavItem(recommendNav)
        } else {
          this.hideNavItem(recommendNav)
        } */
      },

      selectTab(index = 0) {
          let route = this.tabs[index].route
          if (this.$router.currentRoute.name !== route.name) {
            this.$router.push(route)
            this._checkHideNav(route.name)
          }
      }
    }
}
</script>

<style lang="scss">
  .home-screen {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .header {
      display: flex;
      .nav-list-wrapper {
        flex: 1
      }
    }
    .body {
      box-sizing: border-box;
      flex: 1;
      overflow: hidden auto;
    }
    .view-content {
      $margin: 15px;
      padding: 0 $margin;
      overflow-y: auto;
      box-sizing: border-box;
    }
  }
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
    $marginH: 5px;
    border-radius: 10px;
    overflow: hidden;
    height: 25vh;
    width: calc(100% - #{$marginH * 2});
    margin: 1px;
    margin: 0 $marginH;
  }
</style>
