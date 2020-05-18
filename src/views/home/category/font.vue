<template>
    <div style="width: 100%; height:100%;background:pink;color:white">
        字体
        <button @click="testClick">点击我</button>
    </div>
</template>

<script>

export default {
    name: 'FontCategory',
    components: {},
    mounted() {
        console.log('category进入font')
    },
    data() {
        let list = []
        for (let i = 0; i < 100; i++) {
            list.push({ text: 'qeqwe', id: i })
        }
        return { list }
    },
    methods: {
        testClick() {
            alert(123)
        }
    }
}
</script>
