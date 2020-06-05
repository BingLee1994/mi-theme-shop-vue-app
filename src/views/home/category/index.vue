<template>
    <div class="category-screen" title="类别" v-flex:direction="'column'">
      <ActionBar title="所有分类"
        :showBackButton="false"
        :showRightButton="true"
        rightButtonClass="icn-search"
        @clickRightButton="gotoSearch"
        >
      </ActionBar>
      <main v-flex-item.1.hidden>
        <div class="category-group-wrapper">
            <ul class="category-option">
              <li
                v-for="item in navItems"
                :key="item.name"
                :class="{
                  selected: item.name === currentNavName
                }"
                @click="selectNavByName(item.name)"
              >
                {{item.text}}
              </li>
            </ul>
            <div class="main">
              <keep-alive>
                <component :is="componentName" />
              </keep-alive>
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

    mounted() {
      console.log(this.componentName)
    },

    methods: {
      gotoSearch() {
        this.$router.push({ name: 'search', query: { type: this.currentNavName } })
      }
    }
}
</script>

<style lang="scss">
  .category-screen {
    .category-group-wrapper {
      height: 100%;
      position: relative;

      .category-option {
        height: 100%;
        min-width: 80px;
        background: var(--black01);
        border-right: 1px solid var(--black03);
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;

        li {
          padding: 15px 18px;
          box-sizing: border-box;
          font-size: 1.3rem;

          &.selected {
            color: var(--miOrange);
            background-color: var(--black02);
            border-right: 2px solid var(--miOrange);
          }
        }
      }

      .main {
        position: absolute;
        left: 100px;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: hidden auto;
      }
    }
  }
</style>
