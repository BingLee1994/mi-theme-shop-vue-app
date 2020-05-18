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
    computed: {
      transitionName() {
        let to = this.$route
        let { routeHistory } = this.$router
        let last = routeHistory.get(-3) || {}
        if (to.name === last.name) {
          routeHistory.back(2)
          return 'screen-enter-right'
        } else {
          return 'screen-enter-left'
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
