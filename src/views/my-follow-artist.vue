<template>
    <Screen
        class="my-follow-screen"
        title="我的关注"
        :backRoute="{ name: 'me' }"
    >
        <template slot="maskLayer">
            <Loading v-if="showLoading"/>
        </template>
        <template slot="main">
            <div
                v-flex.centerY
                class="artist-list pd-v15"
                v-for="artist in allFollowArtist"
                :key="artist.id"
                @click="gotoDetail(artist)"
            >
                <LazyImg class="avatar" :src="artist.avatar" fitCover/>
                <p class="mg-h15" v-flex-item.1>{{artist.name}}</p>
                <Button @click.stop="toggleFollow(artist)">{{artist.followed ? '取消关注' : '关注'}}</Button>
            </div>
        </template>
    </Screen>
</template>

<script>
import Loading from '@/components/app/loading'
import Screen from '@/components/app/base-activity'
import LazyImg from '@/components/app/simple-lazy-load-img'
import Button from '@/components/app/button'

export default {
    components: { Loading, Screen, LazyImg, Button },
    data() {
        return {
            showLoading: false,
            allFollowArtist: []
        }
    },

    mounted() {
        this.getAllFollowArtist()
    },

    methods: {
        async getAllFollowArtist(item) {
            try {
                this.showLoading = true
                let allFollowArtist = await this.$api.getFollowArtist()
                this.allFollowArtist = allFollowArtist.map(artist => {
                    artist.followed = true
                    return artist
                })
            } catch (err) {
                console.log(err)
            } finally {
                this.showLoading = false
            }
        },

        toggleFollow(artist) {
            if (artist.followed) {
                this.$dialog.confirm({
                    title: '取消关注',
                    message: `小主，您真的不再关注${artist.name}了吗？`,
                    secondaryButton: '我再想想',
                    primaryButton: '去意已决'
                }).then(() => {
                    artist.followed = false
                })
            }
            artist.followed = true
        },

        gotoDetail(artist) {
            this.$router.push({
                name: 'viewCategory',
                params: {
                    filter: 'theme',
                    keyWord: `设计师：${artist.name}`
                }
            })
        }
    }
}
</script>

<style lang="scss">
.my-follow-screen {
    .artist-list {
        border-bottom: 1px solid var(--black05);
        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 25px;
        }
    }
}
</style>
