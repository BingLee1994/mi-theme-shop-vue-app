<template>
    <Screen class="view-category-screen" :title="title">

        <template slot="maskLayer">
            <div>
                <Loading v-show="showLoading"/>
            </div>
        </template>

        <template slot="main">
            <ThemeList
                :type="$route.params.filter || 'theme'"
                :items="itemList"
                column="3"
                @click="viewDetail"
            />
        </template>
    </Screen>
</template>

<script>
import ThemeList from '@/components/app/list-view'
import Screen from '@/components/app/base-activity'
import Loading from '@/components/app/loading'
import api from '@/api'

export default {
    components: { Screen, ThemeList, Loading },
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
        this.$toast.show('Demo里的数据随机展示!（由于没有真实后台）')
        let type = this.$route.params.filter || 'theme'
        try {
            this.showLoading = true
            let result = await api.search(this.$route.params.keyWord, type)
            console.log(result)
            if (type === 'theme') { 
                result = result.map(theme => {
                    return {
                        title: theme.title,
                        imgUrl: theme.imgUrl,
                        id: theme.id,
                        type: 'theme'
                    }
                })
            }
            this.itemList = result
            this.showLoading = false
        } catch (err) {
            console.log(err)
        }
    },

    methods: {
        async viewDetail(item) {
            try {
                await this.$router.push({
                    name: 'viewItem', params: { id: item.itemId, type: item.type || 'theme' }
                })
            } catch (err) {
            }
        }
    }
}
</script>

<style lang="scss">
</style>
