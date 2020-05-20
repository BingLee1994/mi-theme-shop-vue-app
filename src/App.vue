<template>
  <MiuiDarkMode id='app' tagName="div">
    <keep-alive>
      <transition :name="transitionName">
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </transition>
    </keep-alive>

    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </MiuiDarkMode>
</template>

<script>
import MiuiDarkMode from '@miui/dark-mode'

export default {
    components: { MiuiDarkMode },
    data() {
      return {
        transitionName: ''
      }
    },
    /* computed: {
      transitionName() {
        let to = this.$route
        let { routeHistory } = this.$router
        let { currentRoute } = routeHistory
        console.log('to的页面：', to.name)
        console.log('当前页面是：', currentRoute.name)
        console.log('来自于：', currentRoute.lastRouteName)
        let last = routeHistory.get(-3) || {}
        if (to.name === last.name) {
          // routeHistory.back(2)
          return 'screen-enter-right'
        } else {
          return 'screen-enter-left'
        }
      }
    } */
    watch: {
      $route(_, from) {
        debugger
        let { routeHistory } = this.$router
        let { currentRoute } = routeHistory
        let { lastRoute } = routeHistory
        console.log(lastRoute)
        console.log('当前页面是：', currentRoute.name)
        console.log('来自于：', currentRoute.lastRouteName)
        if (currentRoute.lastRouteName === from.name) {
          this.transitionName = 'screen-enter-right'
        } else {
          this.transitionName = 'screen-enter-left'
        }
      }
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
