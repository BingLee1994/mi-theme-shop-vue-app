<template>
    <Screen class="view-category-screen" :title="title">

        <template slot="maskLayer">
            <div>
                <Loading v-show="showLoading"/>
            </div>
        </template>

        <template slot="main">
            <ThemeList :items="itemList" column="3" @click="viewDetail"/>
        </template>
    </Screen>
</template>

<script>
import ThemeList from '@/components/app/list-view/theme-list/list'
import Screen from '@/components/app/base-activity'
import api from '@/api'

export default {
    components: { Screen, ThemeList },
    data() {
        return {
            itemList: [],
            showLoading: true
        }
    },

    computed: {
        title() {
            return this.$route.params.keyWord
        }
    },

    async mounted() {
        try {
            this.showLoading = true
            let result = await api.search(this.$route.params.keyWord, 'theme')
            this.itemList = result.map(theme => {
                return {
                    title: theme.title,
                    imgUrl: theme.imgUrl,
                    id: theme.id,
                    type: 'theme'
                }
            })
            this.showLoading = false
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
