<template>
  <MiuiDarkMode id='app' tagName="div" class="app">
      <transition :name="transitionName">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
      </transition>

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
    watch: {
      $route(current, from) {
        let isBacking = this.$router.isBacking
        this.transitionName = isBacking ? 'screen-enter-right' : 'screen-enter-left'
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
