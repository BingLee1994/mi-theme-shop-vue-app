<template>
  <MiuiDarkMode id='app' tagName="div" class="app">
    <!-- <transition
      :css="false"
      v-on:before-enter="transBeforeEnter"
      v-on:enter="transEnter"
      v-on:after-enter="transAfterEnter"
      v-on:before-leave="transBeforeLeave"
      v-on:leave="transLeave"
      v-on:after-leave="transAfterLeave"
    >
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition
      :css="false"
      v-on:before-enter="transBeforeEnterNoAlive"
      v-on:enter="transEnterNoAlive"
      v-on:after-enter="transAfterEnterNoAlive"
      v-on:before-leave="transBeforeLeaveNoAlive"
      v-on:leave="transLeaveNoAlive"
      v-on:after-leave="transAfterLeaveNoAlive"
    >
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition> -->

    <!-- <transition :name="transitionName">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
      </transition>

    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition> -->

    <transition :name="transitionName">
      <keep-alive include="Gallery">
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
        includedRoute: ''
      }
    },

    created() {
      this._keepLiveRoute = []
      this._getKeepAliveComponentName(this.$router.options.routes)
      this.includedRoute = this._keepLiveRoute.join(',')
      console.log('include is', this.includedRoute)
    },

    activated() {
      console.log('App activated')
    },

    watch: {
      $route(current, from) {
        let isBacking = this.$router.isBacking
        this.transitionName = isBacking ? 'screen-enter-right' : 'screen-enter-left'
        console.log('\n\n\n--------------------------------------------------------------')
        console.log('是否是后退: ' + isBacking)
        console.log('过渡动画是: ' + this.transitionName === 'screen-enter-right' ? '出场' : '入场')
        console.log('--------------------------------------------------------------\n\n\n')
      }
    },

    methods: {
      _getKeepAliveComponentName(routes) {
        routes.forEach(route => {
          if (route.meta && route.meta.keepAlive) {
            this._keepLiveRoute.push(route.component.name)
          }
          if (route.children && route.children.length) {
            this._getKeepAliveComponentName(route.children)
          }
        })
      },
      transBeforeEnter() {
        console.log('入场')
        console.log(arguments)
      },
      transEnter() {
        console.log('入场')
        console.log(arguments)
      },
      transAfterEnter() {
        console.log('入场')
        console.log(arguments)
      },
      transBeforeLeave() {
        console.log('出场')
        console.log(arguments)
      },
      transLeave() {
        console.log('出场')
        console.log(arguments)
      },
      transAfterLeave() {
        console.log('出场')
        console.log(arguments)
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
