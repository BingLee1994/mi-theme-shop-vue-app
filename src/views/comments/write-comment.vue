<template>
    <div
        class="screen write-comments-screen"
        v-flex.column
        v-full-screen.hiddenX
    >
        <div
            v-flex-item:shrink="0"
            class="action-header header"
        >
            <BackButton />
            <p class="big-title">
                <span>撰写评论</span>
                <span v-if="name">：{{name}}</span>
            </p>
        </div>

        <section
            v-flex-item:overflow.1.scrollY
            class="comment-form"
        >
            <div class="rank-wrapper">
                <span>选择喜爱程度：</span>
                <StarRank :length="5" v-model="rankPoint"/>
            </div>
            <textarea placeholder="我们期待你的精彩评论！" class="comment-box" v-model="comment"/>
        </section>

        <section class="footer bottom-wrapper" v-flex-item:shrink="0">
            <p class="hint">您的评论经过审核后才能展示！</p>
            <Button
                class="edit-button"
                :disabled="!comment"
                @click="submitComment"
            >
                发表评论
            </Button>
        </section>
    </div>
</template>

<script>
import api from '@/api'
import StarRank from '@/components/app/star-rank/star-rank'
import Button from '@/components/app/button'
import BackButton from '@/components/app/back-button'

export default {
    components: { StarRank, Button, BackButton },
    data() {
        return {
            comment: '',
            rankPoint: 0
        }
    },

    computed: {
        name() {
            return this.$route.params.itemName
        }
    },

    methods: {
        submitComment() {
            let { comment, rankPoint } = this
            api.submitComment(comment, rankPoint, 'theme12345').then((response) => {
                this.$toast.show('发表成功')
                let lastRoute = this.$router.routeHistory.lastRoute
                if (lastRoute) {
                    this.$router.go(-1)
                } else {
                    this.$router.push({ name: 'home' })
                }
            })
        }
    }
}
</script>

<style lang="scss">
.comment-form {
    padding: 10px 25px;

    .rank-wrapper {
        display: flex;
        margin-bottom: 10px;
    }

    .comment-box {
        border-radius: 5px;
        width: 100%;
        height: 50vh;
        border: 1px solid var(--black10);
        padding: 15px;
        box-sizing: border-box;
    }
}

.footer {
    padding: 20px 0;
    text-align: center;

    .hint {
        font-size: 1.2rem;
        color: var(--black30);
        text-align: center;
        margin-bottom: 10px;
    }

    .edit-button {
        width: 90%;
        height: 40px;
    }
}
</style>
