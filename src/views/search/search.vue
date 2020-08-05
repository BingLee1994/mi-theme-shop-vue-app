<template>
    <div class="search-view">
        <section
            v-flex.centerY
            class="search-bar action-bar header"
        >
            <Icon type="back" @click="goBack"/>
            <input
                :value="keyWord"
                placeholder="请输入关键字"
                @input="handlekeyWord"
                @focus="onFocus"
                :class="{
                    'search-box': true,
                    'dark-mode': darkMode
                }"
            />
        </section>

        <div v-if="!isShowResult" class="container">

            <section class="suggestion-wrapper" v-if="recommendations.length > 0">
                <p class="header">大家都在搜</p>
                <ColorfulButon v-for="item in recommendations" :key="item.id"
                    @click="onClickRecommend(item)"
                >
                    {{item}}
                </ColorfulButon>
            </section>

            <ul class="suggestion-list option-list-wrapper" v-if="keyWord">
                <li v-for="keyword in searchSuggestion"
                    :key="keyword"
                    @click="doSearch(keyword, $event)"
                    class="list-item"
                >
                    <span>{{keyword}}</span>
                </li>
                <li v-flex.centerY class="search-button list-item" @click="doSearch(null)">
                    <Icon type="search" />
                    {{keyWord}}
                </li>
            </ul>

            <ul class="history-list option-list-wrapper"
                v-if="isShowHistory && !keyWord && history.length > 0"
            >
                <li v-for="keyword in history"
                    :key="keyword"
                    @click="doSearch(keyword, $event)"
                    class="list-item"
                    v-flex.centerX
                >
                    <span class="text" v-flex-item.1>{{keyword}}</span>
                    <Icon type="delete" @click.stop="removeHistory(keyword)"/>
                </li>
                <li
                    class="list-item clear-all-button bold"
                    @click="clearHistory"
                >
                    清空浏览历史
                </li>
            </ul>

            <section class="adv-wrapper">
                <div v-for="item in adviertisements" :key="item.id"
                    @click="onClickAdviertisement(item)"
                    class="adv"
                >
                    <p class="title bold">{{item.title}}</p>
                    <p class="description">{{item.description}}</p>
                    <div
                        class="img cover"
                        v-lazy:background.once="item.imgUrl"
                    />
                </div>
            </section>

            <section class="style-list" v-flex.wrap>
                <ImageButton
                    v-for="item in styles"
                    :key="item.id"
                    @click="onClickStyle(item)"
                    :src="item.imgUrl"
                    cover
                />
            </section>

            <section
                class="category-list mg-b25"
                v-flex:overflow.wrap="'hidden'"
            >
                <ImageButton
                    v-for="item in categoryList"
                    :key="item.id"
                    @click="onClick(item)"
                    :src="item.imgUrl"
                    cover
                >
                    {{item.text}}
                </ImageButton>
            </section>

        </div>

        <SearchFilter v-if="isShowResult" @change="onFilterChange">筛选器</SearchFilter>
        <div v-if="isShowResult" class="container">
            <ThemeList
                :type="searchType"
                :items="searchResult"
                :column="3"
                @click="viewDetail"
                :enableSwipeToLoadMore="false"
            />
        </div>
    </div>
</template>

<script>
import ColorfulButon from '@/components/app/colorful-button'
import Icon from '@/components/app/icons'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ThemeList from '@/components/app/list-view'
import ImageButton from '@/components/app/image-button'
import DarkModeMixin from '@/mixins/dark-mode'
import SearchFilter from './search-filter'
import api from '@/api'

export default {
    name: 'Search',
    components: { ColorfulButon, Icon, SearchFilter, ImageButton, ThemeList },
    mixins: [DarkModeMixin],

    created() {
        let searchType = this.$route.query.type || 'theme'
        this.searchType = searchType
        this.setCategory(searchType)
    },

    data() {
        return {
            keyWord: '',
            isFocused: false,
            isShowResult: false,
            isShowHistory: false,
            searchSuggestion: [],
            searchResult: [],
            categoryList: [
                { text: '主题', name: 'theme', imgUrl: require('../../assets/img/i-theme.jpg') },
                { text: '壁纸', name: 'wallpaper', imgUrl: require('../../assets/img/i-wallpaper.jpg') },
                { text: '字体', name: 'font', imgUrl: require('../../assets/img/i-font.jpg') },
                { text: '铃声', name: 'ringtone', imgUrl: require('../../assets/img/i-ringtone.jpg') }
            ]
        }
    },

    computed: {
        ...mapGetters(['history', 'recommendations', 'adviertisements', 'styles'])
    },

    mounted() {
        this.fetchSearchScreenData()
        let { keyword } = this.$route.query
        if (keyword) {
            this.keyWord = keyword
            this.doSearch()
        }
    },

    methods: {
        ...mapMutations(['addHistory', 'setCategory', 'clearHistory', 'removeHistory']),
        ...mapActions(['fetchSearchScreenData']),
        handlekeyWord(e) {
            this.isShowResult = false
            this.keyWord = e.target.value
        },

        onClickRecommend(keyWord) {
            this.keyWord = keyWord
        },

        onClickAdviertisement(item) {
            console.log(item)
        },

        onClickStyle() {
        },

        onClickCategory({ name }) {
            console.log(name)
        },

        onFocus() {
            this.isShowHistory = true
        },

        async doSearch(keyWord) {
            if (!keyWord) {
                keyWord = this.keyWord
            }
            if (this.keyWord !== keyWord) {
                this.keyWord = keyWord
            }
            this.addHistory(this.keyWord)

            this.isShowResult = true
            let response = await api.search(keyWord, this.searchType)
            let resultList = []
            response.forEach(item => {
                if (item.type === this.searchType) {
                    if (item.type === 'theme') {
                        item = {
                            title: item.title,
                            imgUrl: item.imgUrl,
                            type: item.type,
                            id: item.id || 'detaultid'
                        }
                    }
                    resultList.push(item)
                }
            })
            this.searchResult = resultList
        },

        async viewDetail(item) {
            try {
                await this.$router.push({
                    name: 'viewItem', params: { id: item.itemId, type: this.searchType || 'theme' }
                })
            } catch (err) {

            }
        },

        async onFilterChange(filterRule) {
            this.doSearch()
        },

        goBack() {
            window.history.go(-1)
        }
    },
    beforeRouteEnter: (to, from, next) => {
        console.log(from)
        document.body.scrollTop = 0
        next()
    }
}
</script>

<style lang="scss">
.search-view {
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .header.search-bar {
        min-height: 6rem;
        $itemHeight: 4rem;
        padding: 0 15px;

        .icon {
            margin: 0 5px;
            box-sizing: border-box;
        }

        input.search-box {
            appearance: none;
            border: none;
            padding: 0 #{$itemHeight/2};
            height: $itemHeight;
            border-radius: $itemHeight/2;
            background: var(--black05);
            flex: 1;
            margin: 0 10px;

            &.dark-mode {
                background: var(--black20);
                color: white;
            }
        }
    }

    .container {
        padding: 0 15px;
        box-sizing: border-box;
        flex: 1;
        overflow-y: auto;
        $superLightBorder: 1px solid var(--black05);

        .suggestion-wrapper {
            margin: 15px 0;
            .header {
                font-size: 1.3rem;
                line-height: 1.5;
                color: var(--black30);
                margin-bottom: 10px;
            }
        }

        .search-button {
            padding: 0 10px;
            vertical-align: middle;
        }

        .option-list-wrapper {
            border-top: $superLightBorder;
            .list-item {
                border-bottom: $superLightBorder;
                padding: 15px 10px;
                color:var(--black);
                display: flex;
                align-items: center;
                &:active {
                    background: var(--black05);
                    opacity: .8;
                    border-color: transparent;
                }
            }
            & + .adv-wrapper {
                border-top: none;
            }
        }

        .history-list {
            .clear-all-button {
                text-align: center;
                color: var(--black50);
                padding: 15px 0;
                display: block !important;
            }
        }

        .adv-wrapper {
            border-top: $superLightBorder;
            margin: 10px 0;

            .adv {
                text-align: center;
                border-bottom: $superLightBorder;
                margin: 10px 0;

                p {
                    padding: 0 20px;
                    line-height: 1.5;
                    font-size: 1.4rem;
                }

                .description {
                    color: var(--secondaryTextColor);
                }

                .img {
                    height: 45vw;
                    margin: 10px;
                    margin-bottom: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 0 1px var(--black05);
                }
            }
        }
    }
}
</style>
