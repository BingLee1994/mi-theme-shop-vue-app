<template>
    <div class="search-view">
        <section
            v-flex.centerY
            class="search-bar action-bar header"
        >
            <button class="icon" @click="goBack">返回</button>
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
            <button class="icon">筛选</button>
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
                <li class="search-button list-item" @click="doSearch(null)">搜索{{keyWord}}</li>
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
                    <span @click.stop="removeHistory(keyword)">删除</span>
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
                />
            </section>

            <section
                class="category-list"
                v-flex:overflow.wrap="'hidden'"
            >
                <ImageButton
                    v-for="item in categoryList"
                    :key="item.id"
                    @click="onClick(item)"
                    :src="item.imgUrl"
                >
                    {{item.text}}
                </ImageButton>
            </section>

        </div>
        <div v-if="isShowResult" class="container">
            <p class="hint">此版本为demo版，搜索结果为从后台随机获取的数据</p>
            <ThemeList :items="searchResult" :column="3" @click="viewDetail"/>
        </div>
    </div>
</template>

<script>
import ColorfulButon from '@/components/app/colorful-button'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ThemeList from '@/components/app/theme-list/list'
import ImageButton from '@/components/app/image-button'
import DarkModeMixin from '@/mixins/dark-mode'
import api from '@/api'

export default {
    name: 'Search',
    components: { ColorfulButon, ImageButton, ThemeList },
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
                { text: '主题', name: 'theme' },
                { text: '壁纸', name: 'wallpaper' },
                { text: '字体', name: 'font' },
                { text: '铃声', name: 'ringtone' }
            ]
        }
    },

    computed: {
        ...mapGetters(['history', 'recommendations', 'adviertisements', 'styles'])
    },

    mounted() {
        this.fetchSearchScreenData()
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
            this.searchResult = await api.search(keyWord, this.searchType)
        },

        async viewDetail(item) {
            try {
                await this.$router.push({
                    name: 'viewItemEntry', params: { id: item.itemId }
                })
            } catch (err) {

            }
        },

        goBack() {
            this.$router.push({ name: 'home' })
        }
    },
    beforeRouteEnter: (to, from, next) => {
        document.body.scrollTop = 0
        next()
    }
}
</script>

<style lang="scss">
.search-view {
    overflow: hidden;

    .header.search-bar {
        min-height: 6rem;
        $itemHeight: 4rem;

        .icon {
            width: $itemHeight;
            height: $itemHeight;
            margin: 0 5px;
        }

        input.search-box {
            appearance: none;
            border: none;
            padding: 0 #{$itemHeight/2};
            height: $itemHeight;
            border-radius: $itemHeight/2;
            background: var(--black05);
            flex: 1;

            &.dark-mode {
                background: var(--black20);
                color: white;
            }
        }
    }

    .container {
        padding: 0 10px 10px;
        box-sizing: border-box;
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
        }

        .option-list-wrapper {
            border-top: $superLightBorder;
            .list-item {
                border-bottom: $superLightBorder;
                padding: 15px 10px;
                color:var(--black);
                border-radius: 10px;
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
