<template>
    <div class="category-screen" title="类别" v-flex:direction="'column'">
      <ActionBar title="所有分类"
        :showBackButton="false"
        :showRightButton="true"
        rightButtonClass="icon icn-search"
        @clickRightButton="gotoSearch"
        >
      </ActionBar>

      <main
        v-flex-item.1
      >
        <div class="category-group-wrapper">
            <nav class="category-option">
              <div
                v-for="item in navItems"
                :key="item.name"
                :class="{
                  'nav-item': true,
                  selected: item.name === currentNavName
                }"
                @click="selectNavByName(item.name)"
              >
                {{item.text}}
              </div>
            </nav>

            <div
              class="main"
              ref="componentWrapper"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchCancel"
              @touchcancel="handleTouchCancel"
            >
              <keep-alive>
                <component :is="componentName"/>
              </keep-alive>
              <div class="loader" ref="loader" v-show="showLoader">上滑翻页</div>
            </div>

        </div>
      </main>

    </div>
</template>

<script>
import ThemeWallpaperCategory from './theme-wallpaper-category'
import FontCategory from './font-category'
import RingtoneCategory from './ringtone-category'
import navigationBar from '@/mixins/navigation'
import ActionBar from '@/components/miui/action-bar/action-bar'

const components = {
  theme: 'ThemeWallpaperCategory',
  font: 'FontCategory',
  ringtone: 'RingtoneCategory'
}

const loaderIntersecThresHold = 0.8

export default {
    name: 'CaregoryHome',
    mixins: [navigationBar],
    components: { ThemeWallpaperCategory, ActionBar, FontCategory, RingtoneCategory },

    computed: {
      componentName() {
        let { currentNavName } = this
        return components[currentNavName] || ''
      }
    },

    data() {
      return {
        showLoader: false
      }
    },

    created() {
      this.canShowNextComponent = false
      this.moveStartY = 0
      this.moveDis = 0
    },

    watch: {
      currentNavIndex() {
        this.checkShowLoader()
      }
    },

    mounted() {
      let elLoader = this.$refs.loader
      if (elLoader) {
        let intersectionOption = {
          threshold: [0, loaderIntersecThresHold],
          root: this.$refs.componentWrapper
        }
        let intersectionOb = new IntersectionObserver(this.handleLoaderVisibility, intersectionOption)
        intersectionOb.observe(elLoader)
        this.intersectionOb = intersectionOb

        this.checkShowLoader()
      }
    },

    beforeDestroy() {
      this.intersectionOb.disconnect()
      this.intersectionOb = null
    },

    methods: {
      checkShowLoader() {
        setTimeout(() => {
          let elComponentWrapper = this.$refs.componentWrapper
          if (elComponentWrapper) {
            let { offsetHeight, scrollHeight } = elComponentWrapper
            let showLoader = scrollHeight > offsetHeight
            this.showLoader = showLoader
          }
        })
      },

      handleLoaderVisibility([e]) {
        let { intersectionRatio, target: elLoader } = e
        if (intersectionRatio >= loaderIntersecThresHold) {
          elLoader.classList.add('active')
        } else {
          elLoader.classList.remove('active')
          this.canShowNextComponent = false
        }
      },

      gotoSearch() {
        this.$router.push({ name: 'search', query: { type: this.currentNavName } })
      },

      handleTouchStart(e) {
        this.moveStartY = e.touches[0].pageY
      },

      handleTouchMove(e) {
        let curY = e.touches[0].pageY
        this.moveDis = curY - this.moveStartY
        let elComponentWrapper = e.currentTarget

        if (elComponentWrapper.scrollTop !== elComponentWrapper.scrollHeight - elComponentWrapper.offsetHeight) {
          this.moveDis = 0
        }
      },

      handleTouchCancel(e) {
        let { currentTarget: elComponentWrapper } = e
        if (
          this.moveDis < -10 &&
          elComponentWrapper.scrollTop >= elComponentWrapper.scrollHeight - elComponentWrapper.offsetHeight - 2) {
          this.canShowNextComponent = true
        } else {
          this.canShowNextComponent = false
        }
        if (this.canShowNextComponent) {
          let { navItems, currentNavIndex } = this
          let nextNav = currentNavIndex + 1
          if (nextNav === navItems.length) {
            nextNav = 0
          }
          this.selectNavByIndex(nextNav)
          this.$refs.componentWrapper.scrollTop = 0

          this.checkShowLoader()
        }
      }
    }
}
</script>

<style lang="scss">
  .category-screen {
    $sideMenuWidth: 80px;
    .category-group-wrapper {
      height: 100%;
      position: relative;

      .category-option {
        height: 100%;
        width: $sideMenuWidth;
        background: var(--black01);
        border-right: 1px solid var(--black03);
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;

        .nav-item {
          padding: 15px 0px;
          text-align: center;
          box-sizing: border-box;
          font-size: 1.2rem;

          &.selected {
            color: var(--miOrange);
            background-color: var(--black02);
            border-right: 2px solid var(--miOrange);
          }
        }
      }

      .main {
        position: absolute;
        left: $sideMenuWidth;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: hidden auto;
        overflow-y:auto;

        .loader {
          text-align: center;
          font-size: 1.2rem;
          color: var(--black30);
          padding: 10px 0;
          transition: all .2s ease;
          opacity: 0;
          transform: translateY(10px);
          transform-origin: bottom center;

          &.active {
            opacity: 1;
          transform: translateY(0px);
          }
        }
      }
    }
  }
</style>
