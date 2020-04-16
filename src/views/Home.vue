<template>
    <div>主页
        <ColorfulButton>123</ColorfulButton>
        <ColorfulButton color="black" darkmode>123</ColorfulButton>
        <ColorfulButton @click="testClick">test</ColorfulButton>
        <SwiperActivityItem>
                <ul>
                    <li style="margin: 20px" v-for="item in list" :key="item.id">
                        {{item.text}}
                    </li>
                </ul>
            </SwiperActivityItem>

        <SwiperActivity>
            <SwiperActivityItem>
                <ul>
                    <li style="margin: 20px" v-for="item in list" :key="item.id">
                        {{item.text}}
                    </li>
                </ul>
            </SwiperActivityItem>
            <SwiperActivityItem>
                <ul>
                    <li style="margin: 20px" v-for="item in list" :key="item.id">
                        {{item.text}}
                    </li>
                </ul>
            </SwiperActivityItem>
        </SwiperActivity>
    </div>
</template>

<script>
import ColorfulButton from '@/components/app/colorful-button'
import SwiperActivity from '@/components/app/swiper-activity/index.vue'
import SwiperActivityItem from '@/components/app/swiper-activity/item.vue'

export default {
    name: 'Welcome',
    components: { ColorfulButton, SwiperActivityItem, SwiperActivity },
    mounted() {
        setTimeout(() => {
            // this.$router.push('home')
        }, 3000)
    },
    methods: {
        testClick() {
            alert(123)
        }
    },
    data() {
        let list = []
        for (let i = 0; i < 100; i++) {
            list.push({ text: 'qeqwe', id: i })
        }
        return { list }
    }
}
</script>
