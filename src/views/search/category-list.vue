<template>
    <div class="category-list">
        <a
            v-for="item in list"
            :key="item.id"
            @click="onClick(item)"
            :style="{
                background: item.imgUrl
            }"
        >
            {{item.text}}
        </a>
    </div>
</template>

<script>
export default {
    name: 'CategoryList',
    methods: {
        onClick(item) {
            this.$emit('click', item)
        }
    },
    data() {
        return {
            list: [
                { text: '主题', name: 'theme' },
                { text: '壁纸', name: 'wallpaper' },
                { text: '字体', name: 'font' },
                { text: '铃声', name: 'ringtone' }
            ]
        }
    }
}
</script>

<style lang="scss">
    .category-list {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        justify-content: space-between;
        a {
            display: inline-block;
            width: calc(50% - 5px);
            margin-bottom: 10px;
            height: 30px;
            border: 1px solid black;
        }
    }
</style>
