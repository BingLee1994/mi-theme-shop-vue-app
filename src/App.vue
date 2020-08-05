<template>
  <MiuiDarkMode id='app' tagName="div" class="app">
    <transition :name="transitionName">
      <keep-alive :include="keepLiveComponentNames">
          <router-view></router-view>
      </keep-alive>
    </transition>
  </MiuiDarkMode>
</template>

<script>
import MiuiDarkMode from '@miui/dark-mode'

export default {
    components: { MiuiDarkMode },
    data() {
      return {
        transitionName: '',
        keepLiveComponentNames: []
      }
    },

    created() {
      // this.keepLiveComponentNames = []
      this.filterKeepAliveComponentName(this.$router.options.routes)
      // this.keepAliveIncludePattern = this.keepLiveComponentNames.join(',')
      console.log('include is', this.keepLiveComponentNames.join(','))
    },

    watch: {
      $route(current, from) {
        let isBacking = this.$router.isBacking
        this.transitionName = isBacking ? 'screen-enter-right' : 'screen-enter-left'
      }
    },

    methods: {
      filterKeepAliveComponentName(routes) {
        routes.forEach(route => {
          if (route.meta && route.meta.keepAlive) {
            this.keepLiveComponentNames.push(route.component.name)
          }
          if (route.children && route.children.length) {
            this.filterKeepAliveComponentName(route.children)
          }
        })
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
