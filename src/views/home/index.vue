<template>
    <div class="home-screen">
        <keep-alive>
          <router-view class="body"></router-view>
        </keep-alive>
        <TabBar
          :tabs="tabs"
          @clickTab="selectTab"
          :selectedTab="currentTab"
          class="footer"
        ></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/app/tab-bar'

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
          tabs: [
              {
                  text: '广场',
                  iconClass: 'tab-icn icn-gallery',
                  activeClass: 'gallery-selected',
                  route: {
                      name: 'gallery',
                      params: { navId: 0 }
                  }
              },
              {
                  text: '分类',
                  iconClass: 'tab-icn icn-category',
                  activeClass: 'category-selected',
                  route: {
                      name: 'category',
                      params: { navId: 0 }
                  }
              },
              {
                  text: '我',
                  iconClass: 'tab-icn icn-me',
                  activeClass: 'me-selected',
                  route: { name: 'me' }
              }
          ]
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
    --footer-height: 70px;
    @include fillscreen;

    .body {
      box-sizing: border-box;
      overflow: hidden auto;
      position: absolute;
      overflow-y: auto;
      top: 0;
      bottom: var(--footer-height);
      left: 0;
      right: 0;
    }

    .footer {
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: var(--footer-height);
      background: var(--white);
      box-sizing: border-box;
    }
  }

  .adv-swiper {
    $marginH: 15px;
    border-radius: 10px;
    overflow: hidden;
    height: 25vh;
    width: calc(100% - #{$marginH * 2});
    margin: 1px;
    margin: 0 $marginH;
  }

    .icn-category {
        background-image:url("data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2045.5%2053.55%22%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%202%22%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_1-2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%201%22%3E%3Cpath%20d%3D%22M41.42%2C53.55a4.1%2C4.1%2C0%2C0%2C1-2-.51L23.51%2C44.29a1.58%2C1.58%2C0%2C0%2C0-1.52%2C0L6.05%2C53a4.08%2C4.08%2C0%2C0%2C1-6-3.58V4.08A4.08%2C4.08%2C0%2C0%2C1%2C4.08%2C0H41.42A4.08%2C4.08%2C0%2C0%2C1%2C45.5%2C4.08V49.46a4.06%2C4.06%2C0%2C0%2C1-2%2C3.52A4.1%2C4.1%2C0%2C0%2C1%2C41.42%2C53.55Zm-18.67-12a4%2C4%2C0%2C0%2C1%2C2%2C.51l15.95%2C8.75a1.53%2C1.53%2C0%2C0%2C0%2C1.56%2C0A1.55%2C1.55%2C0%2C0%2C0%2C43%2C49.46V4.08A1.58%2C1.58%2C0%2C0%2C0%2C41.42%2C2.5H4.08A1.58%2C1.58%2C0%2C0%2C0%2C2.5%2C4.08V49.46a1.55%2C1.55%2C0%2C0%2C0%2C.78%2C1.37%2C1.53%2C1.53%2C0%2C0%2C0%2C1.56%2C0l16-8.75A4%2C4%2C0%2C0%2C1%2C22.75%2C41.59Z%22%2F%3E%3Crect%20x%3D%2211.75%22%20y%3D%2214.25%22%20width%3D%2222%22%20height%3D%225%22%20rx%3D%222.5%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
    }

    .icn-me {
        background-image:url("data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2050.92%2050.92%22%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%202%22%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_1-2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%201%22%3E%3Cpath%20d%3D%22M25.26%2C50.92c-.68%2C0-1.37%2C0-2.05-.08A25.38%2C25.38%2C0%2C0%2C1%2C.08%2C27.71%2C25.25%2C25.25%2C0%2C0%2C1%2C23.67.47L45.84%2C0a4.84%2C4.84%2C0%2C0%2C1%2C3.62%2C1.46%2C4.92%2C4.92%2C0%2C0%2C1%2C1.46%2C3.62L50.45%2C27.2A25.24%2C25.24%2C0%2C0%2C1%2C25.26%2C50.92ZM46%2C2.5h-.06L23.78%2C3A22.76%2C22.76%2C0%2C0%2C0%2C2.57%2C27.52%2C22.75%2C22.75%2C0%2C0%2C0%2C40.16%2C42.85%2C22.58%2C22.58%2C0%2C0%2C0%2C48%2C27.09L48.42%2C5a2.44%2C2.44%2C0%2C0%2C0-.73-1.8A2.42%2C2.42%2C0%2C0%2C0%2C46%2C2.5Z%22%2F%3E%3Cellipse%20cx%3D%2214.25%22%20cy%3D%2224.17%22%20rx%3D%222.5%22%20ry%3D%224%22%2F%3E%3Cellipse%20cx%3D%2228.25%22%20cy%3D%2224.17%22%20rx%3D%222.5%22%20ry%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
    }

    .icn-gallery {
        background-image:url("data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2056.5%2054.73%22%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%202%22%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_1-2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%201%22%3E%3Cpath%20d%3D%22M48.52%2C54.73H8a8%2C8%2C0%2C0%2C1-8-8v-29L28.25%2C0%2C56.5%2C17.79v29A8%2C8%2C0%2C0%2C1%2C48.52%2C54.73ZM2.5%2C19.17V46.75A5.49%2C5.49%2C0%2C0%2C0%2C8%2C52.23H48.52A5.49%2C5.49%2C0%2C0%2C0%2C54%2C46.75V19.17L28.25%2C3Z%22%2F%3E%3Crect%20x%3D%2224.25%22%20y%3D%2221.98%22%20width%3D%228%22%20height%3D%2220%22%20rx%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
    }

    .category-selected {
      color: #6a38e5;
      .icn-category {
          filter: none !important;
          background-image:url("data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2043%2051.05%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%236a38e5%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%202%22%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_1-2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%201%22%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M40.17%2C0H2.83A2.83%2C2.83%2C0%2C0%2C0%2C0%2C2.83V48.22A2.83%2C2.83%2C0%2C0%2C0%2C4.19%2C50.7l16-8.76a2.85%2C2.85%2C0%2C0%2C1%2C2.72%2C0l16%2C8.76A2.83%2C2.83%2C0%2C0%2C0%2C43%2C48.22V2.83A2.83%2C2.83%2C0%2C0%2C0%2C40.17%2C0ZM30%2C18H13a2.5%2C2.5%2C0%2C0%2C1%2C0-5H30a2.5%2C2.5%2C0%2C0%2C1%2C0%2C5Z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
      }
    }

    .me-selected {
      color: #b437dd;
      .icn-me {
          filter: none !important;
          background-image:url("data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048.42%2048.42%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23b437dd%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%202%22%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_1-2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%201%22%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M44.62%2C0%2C22.5.47A24%2C24%2C0%2C1%2C0%2C48%2C25.92L48.42%2C3.8A3.73%2C3.73%2C0%2C0%2C0%2C44.62%2C0ZM13%2C26.92c-1.38%2C0-2.5-1.79-2.5-4s1.12-4%2C2.5-4%2C2.5%2C1.79%2C2.5%2C4S14.38%2C26.92%2C13%2C26.92Zm14%2C0c-1.38%2C0-2.5-1.79-2.5-4s1.12-4%2C2.5-4%2C2.5%2C1.79%2C2.5%2C4S28.38%2C26.92%2C27%2C26.92Z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
      }
    }

    .gallery-selected {
      color: #fdc13d;
      .icn-gallery {
          filter: none !important;
          background-image:url("data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2054%2052%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23fdc13d%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%202%22%3E%3Cg%20id%3D%22%E5%9B%BE%E5%B1%82_1-2%22%20data-name%3D%22%E5%9B%BE%E5%B1%82%201%22%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M27%2C0%2C0%2C17V45.27A6.73%2C6.73%2C0%2C0%2C0%2C6.73%2C52H47.27A6.73%2C6.73%2C0%2C0%2C0%2C54%2C45.27V17Zm4%2C36.5a4%2C4%2C0%2C0%2C1-8%2C0v-12a4%2C4%2C0%2C0%2C1%2C8%2C0Z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
      }
    }

    .dark-mode {
      .tab-icn {
        filter: contrast(0);
      }
    }
</style>
