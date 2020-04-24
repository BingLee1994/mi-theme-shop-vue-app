<template>
    <div class="search-view">
        <div
            class="search-bar header"
        >
            <button @click="goBack">返回</button>
            <input
                :value="keyWords"
                placeholder="请输入"
                @input="handleKeyWords"
                @focus="onFocus"
            />
            <button>筛选</button>
        </div>

        <div v-if="!isShowResult" class="container">

            <div>
                <p>大家都在搜</p>
                <ColorfulButon v-for="item in recommendations" :key="item.id"
                    @click="onClickRecommend(item)"
                >
                    {{item}}
                </ColorfulButon>
            </div>

            <ul class="history-list" v-if="isShowHistory && !keyWords">
                <li v-for="item in history" :key="item"
                    @click="onClickHistory"
                >
                    {{item}} <span @click="removeHistory(item)">删除</span>
                </li>
            </ul>

            <p v-if="keyWords" @click="doSearch">搜索{{keyWords}}</p>

            <div>
                <div v-for="item in adviertisements" :key="item.id"
                    @click="onClickAdviertisement(item)"
                    class="adv-wrapper"
                >
                    <p>{{item.title}}</p>
                    <p>{{item.description}}</p>
                    <div class="img cover" :style="{backgroundImage: `url(${item.imgUrl})`}" />
                </div>
            </div>

            <div class="style-list">
                <a v-for="item in styles" :key="item.id"
                    class="img-button cover"
                    :style="{backgroundImage: `url(${item.imgUrl})`}"
                    @click="onClickStyle(item)"
                >
                </a>
            </div>

            <CategoryList @click="onClickCategory" />

        </div>
        <div v-if="!isShowResult" class="container">
            搜索结果
        </div>
    </div>
</template>

<script>
import ColorfulButon from '@/components/app/colorful-button'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import CategoryList from './category-list'

export default {
    name: 'Search',
    components: { ColorfulButon, CategoryList },
    created() {
        let searchType = this.$route.query.type || 'theme'
        this.setCategory(searchType)
    },
    data() {
        return {
            keyWords: '',
            isFocused: false,
            isShowResult: false,
            isShowHistory: false
        }
    },
    computed: {
        ...mapGetters(['history', 'recommendations', 'adviertisements', 'styles'])
    },
    mounted() {
        this.fetchSearchScreenData()
    },
    methods: {
        ...mapMutations(['addHistory', 'setCategory', 'removeHistory']),
        ...mapActions(['fetchSearchScreenData']),
        handleKeyWords(e) {
            this.keyWords = e.target.value
        },
        onClickRecommend(keyWords) {
            this.keyWords = keyWords
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
        doSearch() {
            console.log('search')
            this.addHistory(this.keyWords)
        },
        onClickHistory() {
            console.log('history')
        },
        goBack() {
            console.log(this.$router.history)
            if (window.history.length === 1) {
                this.$router.push({ name: 'home' })
            } else {
                this.$router.go(-1)
            }
        }
    }
}
</script>

<style lang="scss">
.search-view {
    overflow: hidden;
    .cover {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

    }

    .container {
        padding: 15px;
        box-sizing: border-box;
        .adv-wrapper {
            padding: 10px 0;
            .img {
                height: 45vw;
                margin: 10px;
                border-radius: 10px;
                box-shadow: 0 0 0 1px var(--black05);
            }
            border-bottom: 1px solid var(--black10);
            margin: 10px 0;
        }
        .style-list {
            display: flex;
            flex-wrap: wrap;
            .img-button {
                width: calc(50% - 10px);
                margin: 5px;
                height: 60px;
                border-radius: 6px;
                box-shadow: 0 0 0 1px var(--black05);
            }
        }
    }
}
</style>
