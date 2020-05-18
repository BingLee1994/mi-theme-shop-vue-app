<template>
    <div
        class="view-detail-screen"
        v-flex.column
        v-full-screen.hiddenX
    >
        <div class="loading" v-if="showLoader">
            <div v-if="showRetry">
                <span>出错了，</span>
                <button @click="loadThemeItem">再试一次</button>
            </div>
            <Loading v-else />
        </div>
        <BackButton class="header" v-flex-item:shrink="0" />

        <transition name="fade">
            <div
                class="img-viewer"
                v-full-screen.hidden
                v-if="showImagePreview"
                @click="showImagePreview=false"
            >
                <img :src="currentImage"/>
            </div>
        </transition>

        <div
            class="body"
            v-flex-item:overflow.1="`hidden auto`"
            @scroll="appendRecommendListIfNeed"
        >
            <div class="preview-slider-wrapper">
                <div
                    class="preview-slider" v-if="previewImgs.length"
                >
                    <LazyImg
                        v-for="(src, index) in previewImgs"
                        :key="index"
                        :src="src"
                        class="item"
                        fitY
                        :name = "'slider' + index"
                        :threshold="0.1"
                        @click="viewImage(src)"
                    />
                </div>
                <div v-else class="preview-slider no-item" >no item</div>
            </div>

            <section class="detail-wrapper" v-if="itemInfo">
                <div v-flex class="title-wrapper">
                    <div v-flex-item.1>
                        <p class="title text-trim-ellipsis primary">{{itemInfo.title}}</p>
                        <p class="title secondary">V {{itemInfo.version}}</p>
                    </div>
                    <Button @click="checkOrderStatus">{{formattedPriceButton}}</Button>
                </div>

                <StarRank :length="5" :point="starRank" starColor="#FBBB51"/>

                <div class="description-wrapper">
                    <span class="description text-trim-ellipsis">{{itemInfo.description}}</span>
                    <span class="expand-button primary" @click="showItemDetailPopup">详情</span>
                </div>

                <div v-flex class="action-wrapper" v-if="trendData">
                    <LikeIcon>{{trendData.likes}}</LikeIcon>
                    <CommentIcon>{{trendData.comments}}</CommentIcon>
                    <FavIcon>{{favorite? '已收藏': '收藏'}}</FavIcon>
                    <span class="share-button">分享</span>
                </div>
            </section>

            <div class="keywords-wrapper" v-if="keywords && keywords.length > 0">
                <ColorfulButton small v-for="keyword in keywords" :key="keyword">
                    {{keyword}}
                </ColorfulButton>
            </div>

            <p class="section-title">主题作者</p>
            <section class="artist-wrapper" v-if="artist">
                <div class="avatar">
                    <span class="img" v-lazy:background.once="artist.avatar"></span>
                </div>
                <div class="tittle">{{artist.name}}</div>
                <div class="description">
                    {{artist.artwork}}作品 | {{artist.followers}}粉丝
                </div>
                <Button :plain="!follow" @click="followArtist">
                    {{!follow? '关注': '已关注'}}
                </Button>
            </section>

            <p class="section-title">精选评论</p>
            <section class="comments-wrapper" v-if="topComments">
                <div class="card">
                    <p class="title">
                        <span class="primary">{{topComments.userName}}</span>
                        <span class="secondary" v-if="topComments.date"> | {{topComments.date | dateMD}}</span>
                    </p>
                    <StarRank :starSize="13" :length="5" :point="topComments.stars" starColor="#FBBB51"/>
                    <p class="comment">{{topComments.text}}</p>
                    <p class="more-button" @click="gotoComments">所有评论</p>
                </div>
            </section>

            <p class="section-title">猜你喜欢</p>
            <ThemeList :items="recommendList" column="3"/>
        </div>
    </div>
</template>

<script>
import LazyImg from '@/components/app/simple-lazy-load-img'
import Button from '@/components/app/button'
import FavIcon from '@/components/app/icon/fav'
import LikeIcon from '@/components/app/icon/like'
import CommentIcon from '@/components/app/icon/comment'
import ThemeList from '@/components/app/theme-list/list'
import BackButton from '@/components/app/back-button'
import Loading from '@/components/app/loading'
import api from '@/api'
import StarRank from '@/components/app/star-rank/star-rank'
import ColorfulButton from '@/components/app/colorful-button'
import { debounce, dateMD } from '@/utils'

const STATUE_PURCHASED = 1

export default {
    components: { LazyImg, FavIcon, Loading, ThemeList, LikeIcon, CommentIcon, BackButton, ColorfulButton, Button, StarRank },
    data() {
        return {
            showImagePreview: false,
            currentImage: '',
            showLoader: false,
            showRetry: false,
            previewImgs: [],
            itemInfo: {},
            isDescExpanded: false,
            version: [],
            changesLog: [],
            keywords: [],
            artist: null,
            trendData: null,
            purchased: false,
            topComments: null,
            recommendList: [],
            themeId: '',
            follow: false,
            favorite: false
        }
    },

    filters: { dateMD },

    computed: {
        starRank() {
            return (this.trendData || {}).stars || 0
        },
        itemId() {
            return this.$route.params.id
        },
        itemType() {
            return this.$route.params.type
        },
        formattedPriceButton() {
            let { itemInfo, purchased } = this
            let price = itemInfo.price || 0
            if (!price || purchased || parseInt(price) === 0) return '下载'
            return `${price}米币购买`
        }
    },

    mounted() {
        this.loadThemeItem()
    },

    created() {
        this.appendRecommendListIfNeed = debounce(this.appendRecommendListIfNeed, 100).bind(this)
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

        async loadThemeItem() {
            try {
                this.showLoadingLayer()
                let themeData = await api.getItemDetail()
                this.previewImgs = themeData.previewImgs || []
                this.itemInfo = themeData.info || {}
                this.trendData = themeData.trend || {}
                this.artist = themeData.artist
                this.topComments = themeData.topComments
                this.themeId = themeData.id
                this.purchased = themeData.purchased
                this.keywords = themeData.keywords || []
                this.follow = (themeData.artist || {}).follow
                this.favorite = themeData.favorite

                this.mockList()
                this.hideLoadingLayer(themeData.id)
                this.getChangesLog()
            } catch (e) {
                this.showRetry = true
            }
        },

        getChangesLog(itemId) {
            api.getItemChangeLog(itemId).then(log => {
                this.changesLog = log
            }).catch(_ => {})
        },

        viewImage(src) {
            this.showImagePreview = true
            this.currentImage = src
        },

        async checkOrderStatus() {
            let closeLoading = this.showLoading('查询中...')
            let themeId = this.themeId

            if (themeId) {
                try {
                    let response = await api.getOrderStatus(themeId, this.purchased)
                    await closeLoading()

                    let { id: itemId, price, status, downloadUrl } = response
                    if (status === STATUE_PURCHASED) {
                        this.download(downloadUrl)
                    } else {
                        await this.$dialog.confirm({
                            title: '确认购买',
                            message: `您确定要支付${price}米币购买该主题吗？`,
                            secondaryButton: '我再看看',
                            primaryButton: '立即购买'
                        })
                        this.purchase(itemId)
                    }
                } catch (e) {
                    closeLoading()
                    if (e instanceof Error) {
                        this.showNetworkError()
                    }
                }
            }
        },

        genOrderList(h, price, itemName) {
            return <div class="view-detail-screen order-list-popup">
                <p class="order-list">
                    <span>{itemName}</span>
                    <span>
                        <span class="highlight">{price}</span>
                        米币
                    </span>
                </p>
                <p class="order-list">
                    <span>支付方式</span>
                    <span>小米钱包</span>
                </p>
            </div>
        },

        async purchase(itemId) {
            if (this.themeId) {
                let closeLoading = this.showLoading('订单生成中...')
                try {
                    let { id: orderId, price, itemName } = await api.makeOrder(itemId)
                    await closeLoading()

                    await this.$dialog.popup({
                        title: '支付',
                        children: this.genOrderList(this.$createElement, price, itemName),
                        secondaryButton: '取消',
                        primaryButton: '支付'
                    })

                    closeLoading = this.showLoading('支付中...')
                    let { status, downloadUrl } = await api.purchaseItem(orderId)
                    closeLoading()

                    if (status === STATUE_PURCHASED) {
                        this.purchased = true
                        this.$toast.show('购买成功！')
                        this.download(downloadUrl)
                    } else {
                        this.$toast.show('购买失败，请稍后再试')
                    }
                } catch (e) {
                    closeLoading()
                    if (e instanceof Error) {
                        this.showNetworkError()
                    }
                }
            }
        },

        download(url) {
            let a = document.createElement('a')
            a.download = `${this.itemInfo.title}.mtz`
            a.href = '/assets/theme.mtz'
            a.click()
        },

        showItemDetailPopup() {
            let option = {
                secondaryButton: null,
                children: this.createDetailDialog(this.$createElement)
            }
            this.$dialog.popup(option)
        },

        toggleDescription() {
            this.isDescExpanded = !this.isDescExpanded
        },

        createDetailDialog(h) {
            let { title, description } = this.itemInfo || {}
            return <div class="view-detail-screen item-detail-popup-wrapper">
                <p class="title">{title}</p>
                <StarRank length={5} point={this.starRank} starColor="#FBBB51"/>
                <p class="title">资源简介：</p>
                <p>{description}</p>
                {(this.changesLog && this.changesLog.length > 0) &&
                    <div>
                        <p class="title">更新日志：</p>
                        <ul>{
                            this.changesLog.map(w => (
                                <li class="comment-list">
                                    <p class="header">
                                        <span class="version">V {w.version}</span>
                                        <span class="date">{dateMD(w.date)}</span>
                                    </p>
                                    <p>{w.change}</p>
                                </li>
                            ))
                        }</ul>
                    </div>
                }
            </div>
        },

        async followArtist() {
            let artist = this.artist || {}
            if (this.follow) {
                try {
                    await this.$dialog.confirm({
                        title: '确定',
                        message: `确定取消关注${artist.name || ''}?`,
                        secondaryButton: '手滑了',
                        primaryButton: '确定'
                    })
                    await api.updateFollowStatus(artist.id, !this.follow)
                    this.follow = !this.follow
                } catch (_) {
                }
            } else {
                await api.updateFollowStatus(artist.id, !this.follow)
                this.follow = !this.follow
            }
        },

        async goBack() {
            try {
                await this.$router.push(-1)
            } catch (err) {
                if (err.name && err.name === 'NavigationDuplicated') {
                    this.$router.push({ name: 'home' })
                }
            }
        },

        gotoComments() {
            this.$router.push({
                name: 'commentScreen',
                params: {
                    itemId: this.themeId,
                    themeName: this.itemInfo.title
                }
            })
        },

        appendRecommendListIfNeed(event) {
            let { scrollTop, scrollHeight, offsetHeight } = event.target
            if (scrollTop >= (scrollHeight - offsetHeight - 20)) {
                this.mockList()
            }
        },

        mockList() {
            let i = 5
            while (i > 0) {
                this.recommendList.push({
                    title: 'test',
                    imgUrl: 'http://t3.market.mi-img.com/thumbnail/jpeg/w242/ThemeMarket/061074f72179d01fb5cb97cd2b9f4a5670842c74e'
                })
                i--
            }
        }
    }
}
</script>

<style lang="scss">
.fade {
    &-enter {
        opacity: 0;

        &-active {
            transition: opacity .25s ease;
        }

        &-to {
            opacity: 1;
        }
    }

    &-leave {
        opacity: 1;

        &-active {
            transition: opacity .25s ease;
        }

        &-to {
            opacity: 0;
        }
    }
}

.view-detail-screen {
    $oringe: #FBBB51;
    font-size: 1.4rem;
    color: var(--black80);
    padding-top: 10px;

    .loading {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: var(--white);
        z-index: 100;
    }

    .primary {
        color: var(--black);
    }

    .secondary {
        color: var(--black50);
    }

    .section-title {
        margin: 5px 0;
        margin-top: 25px;
    }

    .primary-button {
        border: 1px solid $oringe;
        color: $oringe;
        padding: 8px 15px;
        border-radius: 15px;
        justify-self: center;
        align-self: center;
        font-size: 1.3rem;
        line-height: 1;
        &.active {
            color: white;
            background-color: $oringe;
        }
    }

    .text-trim-ellipsis {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    & > .header {
        padding: 10px 15px;
        border-bottom: 1px solid var(--black05);
    }

    .body {
        padding: 0 15px;
    }

    .preview-slider-wrapper {
        overflow: hidden;
        margin-bottom: 20px;
        .preview-slider {
            width: auto;
            overflow: auto hidden;
            white-space: nowrap;
            touch-action: pan-x;
            margin-bottom: -26px;
            padding-bottom: 28px;
            .item {
                display: inline-block;
                margin: 0 5px;
                width: 130px;
                height: 260px;
                border-radius: 10px;
                box-shadow: 0 0 0 1px var(--black05);
                margin-top: 1px;
            }
        }
    }

    .img-viewer{
        z-index: 100;
        background: var(--black90);
        img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }

    .title-wrapper {
        margin: 10px 0;
        .title {
            color: var(--black);
            font-size: 1.8rem;

            &.secondary {
                color: var(--black50);
                font-size: 1.2rem;
                margin: 5px 0;
            }
        }
    }

    .action-wrapper {
        margin: 10px 0;
        .icon {
            margin-right: 15px;
        }
    }

    .description-wrapper {
        margin: 10px 0;
        line-height: 1.3;
        font-size: 0;
        span {
            vertical-align: middle;
            font-size: 1.4rem;
        }
        .description {
            display: inline-block;
            width: 80%;
        }
        .expand-button {
            padding-left: 10px;
            cursor: pointer;
        }
    }

    .artist-wrapper {
        $avatarSize:50px;
        margin: 15px 0;
        display: grid;
        grid-template-columns: 60px auto 80px;
        grid-template-rows: 30px 30px;
        grid-template-areas: 'a t b'
        'a d b';

        .avatar {
            grid-area: a;
            align-self: center;
            .img {
                width: $avatarSize;
                height: $avatarSize;
                border-radius: $avatarSize / 2;
                background-size: #{$avatarSize} #{$avatarSize};
                background-repeat: no-repeat;
                background-position: center;
                display: inline-block;
                box-shadow: 0px 0px 3px var(--black10);
            }
        }

        .tittle {
            grid-area: t;
            align-self: end;
        }

        .description {
            grid-area: d;
            font-size: 1.3rem;
            color: var(--black50);
            padding-top: 2px;
        }

        .follow-button {
            grid-area: b;
            justify-self: end;
            font-size: 1.2rem;
        }
    }

    .comments-wrapper {
        margin-bottom: 30px;
        .card {
            margin: 10px 0;
            border-radius: 10px;
            background: var(--black05);
            padding: 5px 15px;

            & .title {
                margin: 10px 0;
                font-size: 1.2rem;
            }

            .comment {
                line-height: 1.5;
                margin: 10px 0;
            }

            .more-button {
                padding: 10px 0;
                text-align: center;
                font-size: 1.3rem;
                border-top: 1px solid var(--black05);
                padding-bottom: 5px;
            }
        }
    }

    .theme-preview-cover {
        height: 200px;
    }

    &.item-detail-popup-wrapper {
        margin: 0 -10px;
        padding: 0 15px;
        margin-bottom: 20px;
        max-height: 50vh;
        overflow: hidden auto;
        font-size: 1.4rem;

        .title {
            font-size: 1.8rem !important;
            margin: 20px 0 10px 0 !important;
            text-align: left !important;
            color: var(--black);
            font-weight: bold;
        }

        > .title {
            &:first-of-type {
                margin-top: 10px !important;
            }
        }

        .comment-list {
            margin: 10px 0 20px 0;
            .header {
                font-size: 1.3rem;
                line-height: 1;
                margin-bottom: 5px;

                .version {
                    padding-right: 10px;
                    margin-right: 10px;
                    border-right: 1px solid var(--black30);
                    line-height: 1;
                    display: inline-block;
                    vertical-align: middle;
                    color: var(--black90);
                }

                .date {
                    color: var(--black50);
                }
            }
        }
    }

    &.order-list-popup {
        margin-bottom: 20px;
        margin-top: -10px;
        .order-list {
            color: var(--black);
            display: flex;
            -webkit-box-pack: justify;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--black05);
            padding: 15px 0;
        }

        .highlight {
            font-size: 3rem;
            font-weight: 300;
            vertical-align: middle;
            padding-right: 5px;
        }
    }
}
</style>
