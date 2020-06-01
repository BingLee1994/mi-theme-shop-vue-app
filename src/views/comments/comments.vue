<template>
    <Screen
        class="view-comments-screen"
        :title="themeName"
        footerClassName="bottom-wrapper"
    >

        <template slot="maskLayer">
            <!-- <div class="loading" v-if="showLoader">
                <Retry message="出错了请再试一次。" @click="getComments" v-if="showRetry"/>
                <Loading v-else />
            </div> -->
            <Loading
                v-if="showLoader"
                :showRetry="showRetry"
                @clickRetry="getComments"
            />
        </template>

        <template slot="main">
            <p class="rank-wrapper">
                <span class="point">{{rankPoint}}</span> |
                <span>{{commentsCount}}条评论</span>
            </p>
            <StarRank :length="5" :point="rankPoint"/>

            <p class="section-title">精选评论：</p>
            <Comment :comment="topComment"/>

            <p class="section-title">所有评论：</p>
            <Comment v-for="(item, index) in commentsList" :key="index" :comment="item"/>
        </template>

        <template  slot="footer">
            <Button class="edit-button" @click="writeComment">撰写评论</Button>
        </template>
    </Screen>
</template>

<script>
import api from '@/api'
import StarRank from '@/components/app/star-rank/star-rank'
import Comment from '@/components/app/comment'
import Button from '@/components/app/button'
import Loading from '@/components/app/loading'
import Screen from '@/components/app/base-activity'

export default {
    components: { Screen, StarRank, Button, Loading, Comment },
    data() {
        return {
            showLoader: false,
            showRetry: false,
            commentsList: [],
            topComment: null,
            rankPoint: 0
        }
    },

    computed: {
        commentsCount() {
            return (this.commentsList || []).length || 0
        },
        themeName() {
            return this.$route.params.themeName || ''
        }
    },

    async mounted() {
        this.getComments()
    },

    methods: {
        showNetworkError() {
            this.$toast.show('（模拟后台）糟糕，服务器开小差了，请稍后再试哦！')
        },

        showLoading(msg) {
            if (msg) {
                return this.$dialog.showLoading(msg)
            }
            return () => {}
        },

        showLoadingLayer() {
            this.showLoader = true
            this.showRetry = false
        },

        hideLoadingLayer() {
            this.showLoader = false
            this.showRetry = false
        },

        async getComments() {
            try {
                this.showLoadingLayer()
                let itemId = this.$route.params.itemId
                let response = await api.getComments(itemId)
                this.commentsList = response.comments
                this.topComment = response.topComment
                this.name = response.name
                this.rankPoint = response.point
                this.hideLoadingLayer()
            } catch (e) {
                this.showRetry = true
            }
        },

        writeComment() {
            this.$router.push({ name: 'writeComment', params: { itemName: this.themeName } })
        }
    }
}
</script>

<style lang="scss">
.view-comments-screen {
    font-size: 1.3rem;
    color: var(--black80);

    .rank-wrapper {
        margin-bottom: 5px;
        .point {
            font-size: 2.5rem;
        }
    }

    .loading {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: var(--white);
    }

    .primary {
        color: var(--black);
    }

    .secondary {
        color: var(--black50);
    }

    .section-title {
        margin: 5px 0;
        margin-top: 15px;
        color: var(--black);
        font-weight: bold;
        font-size: 1.5rem;
    }

    .comment-list {
        padding: 0 20px;
    }

    .footer {
        padding: 20px 0;
        text-align: center;

        .edit-button {
            width: 90%;
            height: 40px;
        }
    }
}
</style>
