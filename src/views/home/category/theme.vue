<template>
    <div
        ref="root"
    >
        <ThemeList :items="list"/>
    </div>
</template>

<script>
import ThemeList from '@/components/app/theme-list/list'

export default {
    name: 'ThemeCategory',
    components: { ThemeList },
    // mounted() {
    //     let { root, target } = this.$refs
    //     let option = {
    //         root
    //     }
    //     let observer = new IntersectionObserver((entries) => {
    //         console.log('即将进入视图')
    //         entries.forEach(entry => {
    //             console.log(entry.intersectionRatio)
    //         })
    //     }, option)
    //     observer.observe(target)
    // },
    data() {
        let list = []
        for (let i = 0; i < 100; i++) {
            list.push({
                text: 'item' + i,
                id: i,
                style: {
                    height: (21 * (i * 0.1 + 1)) + 'px',
                    border: '1px solid black',
                    margin: '3px'
                }
            })
        }
        return { list }
    }
}
</script>
