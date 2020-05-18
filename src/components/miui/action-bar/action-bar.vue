<style lang="scss">
    @import "~@miui/component-style/action-bar/action-bar";
</style>

<template>
    <div class="miui-action-bar-wrapper" :id="$attrs.id">
        <div class="miui-action-bar">
            <span
                v-if="showBackButton"
                class="action-button back-button"
                @click="onClickBackButton"
            ></span>

            <span
                v-if="showLeftButton"
                :class="['action-button left-button', leftButtonClass]"
                @click="onClickLeftButton"
            ></span>

            <p v-if="title" class="title bold">{{title}}</p>

            <span
                v-if="showRightButton"
                :class="['action-button right-button', rightButtonClass]"
                @click="onClickRightButton"
            ></span>

            <span
                v-if="showActionMenu"
                class="action-button menu-button"
                @click="popupActionMenu"
            ></span>

            <SearchEditText v-if="showNormalSearch" :placeholder="searchBoxPlaceholder"/>
        </div>
        <div v-if="showSeparateSearch" class="search-box-wrapper">
            <SearchEditText
                v-if="showSeparateSearch"
                :placeholder="searchBoxPlaceholder"
            />
        </div>
    </div>
</template>

<script>
import SearchEditText from './search-edit-text'
import { isEmpty, isNone } from '../utils'
// import ActionMenu from './action-menu/menu'
import showActionMenu from './action-menu'

export default {
    components: { SearchEditText },
    inheritAttrs: false,
    initPosition: 0,
    props: {
        title: String,
        showSearchBox: Boolean,
        showBackButton: Boolean,
        searchBoxPlaceholder: String,
        showActionMenu: Boolean,
        actionMenuItems: Array,
        showRightButton: Boolean,
        showLeftButton: Boolean,
        rightButtonClass: String,
        leftButtonClass: String
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
            this.$emit('clickBackButton')
        },
        onClickLeftButton(e) {
            this._onClickCustomizedButton(e)
        },
        onClickRightButton(e) {
            this._onClickCustomizedButton(e, false)
        },
        _onClickCustomizedButton(e, isLeft = true) {
            this.$emit(isLeft ? 'clickLeftButton' : 'clickRightButton')
        },
        async popupActionMenu(e) {
            let { actionMenuItems: menuItems } = this.$props
            if (isNone(menuItems) || menuItems.length === 0) return

            try {
                let selectedItem = await showActionMenu({
                    menuItems,
                    position: {
                        x: e.clientX,
                        y: e.clientY
                    }
                })
                this.$emit('selectActionMenuItem', selectedItem)
            } catch (err) {
                this.$emit('actionMenuDismissed')
            }
        }
    }
}
</script>
