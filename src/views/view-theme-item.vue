<template>
    <Screen
        class="view-detail-screen"
        ref="detailScreen"
        @scroll="appendRecommendListIfNeed"
        :backRoute="backRoute"
    >

        <template slot="maskLayer">
            <Loading
                retryButton="重新加载"
                retryMessage="暂时无法处理您的请求，请稍后再试。"
                v-if="showLoader"
                :showRetry="showRetry"
                @clickRetry="loadThemeItem"
            />

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
        </template>

        <template slot="main" slot-scope="frame">
            <div
                class="preview-slider-wrapper"
                :style="{
                    margin: `0 -${frame.padding}px`
                }"
            >
                <div
                    class="preview-slider"
                    v-if="previewImgs.length"
                    :style="{
                        paddingLeft: `${frame.padding}px`,
                        paddingRight: `${frame.padding}px`
                    }"
                >
                    <LazyImg
                        v-for="(src, index) in previewImgs"
                        :key="index"
                        :src="src"
                        :class="`item item-${itemType}`"
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
                    <span class="expand-button primary link" @click="showItemDetailPopup">详情</span>
                </div>

                <div v-flex class="action-wrapper" v-if="trendData">
                    <Icon width="15px" type="like" @click="likeIt">{{likes}}</Icon>
                    <Icon width="15px" type="comment" @click="gotoComments">{{trendData.comments}}</Icon>
                    <Icon width="15px" type="favorite" @click="toggleFavorite">{{favorite? '已收藏': '收藏'}}</Icon>
                    <Icon width="15px" type="share" @click="share">分享</Icon>
                </div>
            </section>

            <div class="keywords-wrapper" v-if="keywords && keywords.length > 0">
                <ColorfulButton small v-for="keyword in keywords" :key="keyword">
                    {{keyword}}
                </ColorfulButton>
            </div>

            <p class="section-title">主题设计师</p>
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
            <ThemeList :items="recommendList" column="3" @clickItem="loadThemeItem"/>
            <p class="no-more-item" v-show="showNoMoreItem">到底啦</p>
        </template>
    </Screen>
</template>

<script>
import LazyImg from '@/components/app/simple-lazy-load-img'
import Button from '@/components/app/button'
import Icon from '@/components/app/icons'
import ThemeList from '@/components/app/list-view/theme-list/list'
import Loading from '@/components/app/loading'
import Screen from '@/components/app/base-activity'
import api from '@/api'
import StarRank from '@/components/app/star-rank/star-rank'
import ColorfulButton from '@/components/app/colorful-button'
import { debounce, dateMD, isWechat } from '@/utils'

const STATUE_PURCHASED = 1

export default {
    components: { LazyImg, Screen, Loading, ThemeList, Icon, ColorfulButton, Button, StarRank },
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
            likes: false,
            themeId: '',
            follow: false,
            favorite: false,
            showNoMoreItem: false,
            backRoute: null
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

    created() {
        this.appendRecommendListIfNeed = debounce(this.appendRecommendListIfNeed, 300).bind(this)
    },

    activated() {
        let lastRoute = this.$router.routeHistory.lastRoute || {}
        if (lastRoute.name !== 'viewComment') {
            this.loadThemeItem()
        }
    },

    beforeRouteEnter(to, from, next) {
        next(_this => {
            _this.backRoute = from.name === 'viewComment' ? { name: 'home' } : null
        })
    },

    methods: {
        showNetworkError() {
            this.$toast.show('（模拟后台）糟糕，服务器开小差了，请稍后再试哦！', 1)
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
            this.$toast.show('demo里的主题数据随机展示哦!（由于没有真实后台）', 1)
            this.$refs.detailScreen.resetScrollBar()
            try {
                this.showLoadingLayer()
                let { type, id } = this.$route.params
                let themeData = await api.getItemDetail(id, type)
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
                this.likes = themeData.trend.likes

                this.recommendList = []
                this.getReconmand()
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

        toggleFavorite() {
            this.favorite = !this.favorite
            if (this.favorite) {
                this.$toast.show('已收藏！')
            }
        },

        async checkOrderStatus() {
            let closeLoading = this.showLoading('查询中...（模拟）')
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

        likeIt() {
            this.likes++
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
                    <span>大米钱包</span>
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

        share() {
            if (!isWechat()) {
                this.$dialog.alert('', '暂时无法在浏览器里分享微信好友哦，请在微信里使用！')
            }
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
                    try {
                        await this.$dialog.confirm({
                            title: '我会继续努力的',
                            message: `取关后可能无法找到此设计师，确定取消关注${artist.name || ''}?`,
                            secondaryButton: '残忍取关',
                            primaryButton: '手滑了'
                        })
                    } catch (err) {
                        await api.updateFollowStatus(artist.id, !this.follow)
                        this.follow = !this.follow
                    }
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
                name: 'viewComment',
                params: {
                    itemId: this.themeId,
                    themeName: this.itemInfo.title
                }
            })
        },

        appendRecommendListIfNeed(event) {
            if (this.recommendList.length >= 20) {
                this.showNoMoreItem = true
                return
            }
            let { scrollTop, scrollHeight, offsetHeight } = event.target
            if (scrollTop >= (scrollHeight - offsetHeight - 20)) {
                this.getReconmand()
            }
        },

        getReconmand() {
            this.$api.getReconmandList().then(list => {
                list.forEach(listItem => {
                    this.recommendList.push({
                        id: listItem.id,
                        imgUrl: listItem.previewImage,
                        type: listItem.type,
                        title: listItem.name,
                        name: listItem.name
                    })
                })
            })
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
    font-size: 1.4rem;
    color: var(--black80);
    padding-top: 10px;

    .body {
        height: 100%;
        overflow: hidden auto;
    }

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
        border: 1px solid var(--miOrange);
        color: var(--miOrange);
        padding: 8px 15px;
        border-radius: 15px;
        justify-self: center;
        align-self: center;
        font-size: 1.3rem;
        line-height: 1;
        &.active {
            color: white;
            background-color: var(--miOrange);
        }
    }

    .text-trim-ellipsis {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .preview-slider-wrapper {
        overflow: hidden;
        .preview-slider {
            padding-right: 20px;
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

                &-font {
                    width: 100%;
                }
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
                @include bg-center(#{$avatarSize} #{$avatarSize});
                box-shadow: 0px 0px 3px var(--black10);
                display: inline-block;
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
        margin: 0 -20px;
        padding: 0 20px;
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

    .no-more-item {
        text-align: center;
        margin: 5px 0 20px 0;
    }
}
</style>
