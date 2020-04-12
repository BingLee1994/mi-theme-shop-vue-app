<style lang="scss">
    @import "~@miui/component-style/action-bar/action-bar";
</style>

<template>
    <div class="miui-action-bar-wrapper" :id="$attrs.id">
        <div class="miui-action-bar">
            <span v-if="showBackButton" class="action-button back-button" @click="onClickBackButton"></span>
            <p v-if="title" class="title bold">{{title}}</p>
            <span class="action-button right-button" @click="popupActionMenu"></span>
            <SearchEditText v-if="showNormalSearch" :placeholder="searchBoxPlaceholder"/>
        </div>
        <div v-if="showSeparateSearch" class="search-box-wrapper">
            <SearchEditText v-if="showSeparateSearch" :placeholder="searchBoxPlaceholder"/>
        </div>
    </div>
</template>

<script>
import SearchEditText from './search-edit-text'
import { isEmpty } from '../utils'
// import ActionMenu from './action-menu/menu'
import actionMenu from './action-menu'

export default {
    components: { SearchEditText },
    inheritAttrs: false,
    initPosition: 0,
    props: {
        title: String,
        showSearchBox: Boolean,
        showBackButton: Boolean,
        searchBoxPlaceholder: String
    },
    computed: {
        showSeparateSearch() {
            return this.$props.showSearchBox && !isEmpty(this.$props.title)
        },
        showNormalSearch() {
            return this.$props.showSearchBox && isEmpty(this.$props.title)
        }
    },
    methods: {
        onClickBackButton(e) {
            console.log('back')
        },
        popupActionMenu(e) {
            console.log(e)
            actionMenu.showMenu({
                menuItems: [
                    { text: 123 },
                    { text: 456 }
                ],
                position: {
                    x: e.clientX,
                    y: e.clientY
                }
            })
        }
    }
}
</script>
