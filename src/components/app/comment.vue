<template>
    <div class='comment-list-item' v-if="comment">
        <div v-flex-item.1>
            <p class="title">{{comment.userName}}</p>
            <p class="header-wrapper">
                <StarRank :starSize="12" :length="5" :point="comment.point"/>
                <span class="version">{{comment.version}}</span>
                <span class="date">{{comment.date | dateMD}}</span>
            </p>
            <p class="comment">{{comment.comment}}</p>
        </div>
        <Icon type="like" width="15px" @click="likeIt">{{likesCount}}</Icon>
    </div>
</template>

<script>
import StarRank from '@/components/app/star-rank/star-rank'
import Icon from '@/components/app/icons'
import api from '@/api'
import { dateMD } from '@/utils'

export default {
    name: 'Comment',
    components: { StarRank, Icon },
    props: {
        comment: {
            type: Object,
            default() {
                return {}
            }
        }
    },

    filters: {
        dateMD
    },

    data() {
        let { likes } = this.$props.comment || {}
        return {
            likesCount: likes || 0
        }
    },

    methods: {
        async likeIt() {
            let { id: commentId } = this.comment
            await api.likeIt(commentId)
            this.likesCount++
        }
    }
}
</script>

<style scoped lang="scss">
.comment-list-item {
    padding: 17px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--black10);

    .title {
        color: var(--black);
        font-size: 1.5rem;
    }

    .header-wrapper {
        color: var(--black50);
        display: flex;
        align-items: center;
        margin: 8px 0;

        span {
            line-height: 1;
            font-size: 1.2rem;
            display: inline-block;
        }

        .version {
            margin: 0 10px 0 5px;
            border-right: 1px solid var(--black30);
            padding-right: 10px;
        }
    }

    .comment {
        margin-right: 10px;
    }
}
</style>
