<template>
    <div class="ringtone-list-wrapper">
        <RingtoneListItem
            v-for="item in items"
            :key="item.id"
            :keyWords="item.keyWords"
            :name="item.name"
            :hot="item.hot"
            :duration="item.duration"
        />
        <Loading v-if="showLoading" />
    </div>
</template>

<script>
import Loading from '../../loading'
import RingtoneListItem from './list-item'
import SwipeToLoadMore from '../mixin/swipe-up-load-more'

export default {
    name: 'RingtoneList',
    mixins: [SwipeToLoadMore],
    components: { RingtoneListItem, Loading },
    props: {
        items: Array,
        showLoading: Boolean
    }
}
</script>

<style scoped lang="scss">
    .ringtone-list-wrapper {
        padding: 15px;
    }
</style>
