<template>
    <div style="width: 100%; height:100%;background:green;color:white">
        gallery
        <ul>
            <li v-for="item in list" :key="item.id">{{item.text}}</li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'ThemeGallery',
    components: {},
    mounted() {
        console.log('进入主题')
    },
    data() {
        let list = []
        for (let i = 0; i < 100; i++) {
            list.push({ text: 'item', id: i })
        }
        return { list }
    }
}
</script>
