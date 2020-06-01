<template>
    <Screen class="view-detail-screen" :title="title">

        <!-- <template slot="maskLayer">
            <div>
                <Retry message="出错了请再试一次。"/>
                <Loading v-else />
            </div>
        </template> -->

        <template slot="main">
            <ThemeList :items="itemList" column="3" @click="viewDetail"/>
        </template>
    </Screen>
</template>

<script>
import ThemeList from '@/components/app/theme-list/list'
import Screen from '@/components/app/base-activity'
import api from '@/api'

export default {
    components: { Screen, ThemeList },
    data() {
        return {
            itemList: []
        }
    },

    computed: {
        title() {
            return this.$route.params.keyWord
        }
    },

    async mounted() {
        try {
            let result = await api.search(this.$route.params.keyWord, 'theme')
            this.itemList = result
        } catch (err) {
            console.log(err)
        }
    },

    methods: {
        async viewDetail(item) {
            try {
                await this.$router.push({
                    name: 'viewItemEntry', params: { id: item.itemId }
                })
            } catch (err) {

            }
        }
    }
}
</script>

<style lang="scss">
</style>
