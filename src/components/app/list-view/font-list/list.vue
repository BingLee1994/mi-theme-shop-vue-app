<template>
    <ul
        class="font-list-item-warapper"
        ref="list"
    >
        <li
            v-for="item in items"
            @click="onClick"
            :key="item.id"
            class="list-item"
            v-flex.centerY
        >
            <div v-flex-item.1 class="thumb" v-lazy:background="item.previewImg"></div>
            <span v-flex-item.0 class="label">{{item.price | formatPrice}}</span>
        </li>
        <Loading v-if="showLoading"/>
    </ul>
</template>

<script>
import Loading from '../../loading'
import darkMode from '@/mixins/dark-mode'

export default {
    name: 'FontList',
    components: { Loading },
    mixins: [darkMode],
    props: {
        items: Array,
        showLoading: Boolean
    },
    filters: {
        formatPrice(val = 0) {
            if (val > 0) {
                return val + '米币'
            }
            return '免费'
        }
    },

    created() {
        this.darkModeClass = 'dark-mode'
    },

    mounted() {
        this.enableWipeToLoadMore()
    },

    methods: {
        enableWipeToLoadMore() {

        },

        onClick(item, e) {
            this.$router.push({
                name: 'viewItem',
                params: {
                    type: this.$props.type || 'font',
                    id: this.$props.id || 'detaultid'
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .font-list-item-warapper {
        padding: 0 10px;
        .list-item {
            margin: 45px 0;

            &:first-of-type {
                margin-top: 5px;
            }

            &:last-of-type {
                margin-bottom: 5px;
            }

            .thumb {
                height: 25px;
                @include bg-center;
                margin-right: 15px;
                background-image:url('data:image/svg+xml;base64,PHN2ZyBpZD0i5Zu+5bGCXzEiIGRhdGEtbmFtZT0i5Zu+5bGCIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDIzMC4wOCAzMC41NCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmFmYWY7fS5jbHMtMntmaWxsOiNiYmNhYTE7fS5jbHMtM3tmaWxsOiM5ZmQwY2Y7fS5jbHMtNHtmaWxsOiNhOWE0ZjE7fS5jbHMtNXtmaWxsOiNhMWM5YTk7fS5jbHMtNntmaWxsOiM4MjgyODI7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE4LjYsNDUuMkgxNC45MmwxMi41LTMwLjUzaDRMNDMsNDUuMkgzOC43MWwtMy4xNy04LjRIMjIuMDVabTQuNjUtMTEuNDVIMzQuMzhMMjksMTkuNTZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQuOTIgLTE0LjY3KSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTU5LDQ1LjJINTUuMzJsMTIuNS0zMC41M2g0TDgzLjQsNDUuMkg3OS4xMWwtMy4xNy04LjRINjIuNDVabTQuNjUtMTEuNDVINzQuNzhMNjkuNDEsMTkuNTZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQuOTIgLTE0LjY3KSIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTk5LjQsNDUuMkg5NS43MmwxMi41LTMwLjUzaDRMMTIzLjgsNDUuMmgtNC4yOWwtMy4xNy04LjRIMTAyLjg1Wm00LjY1LTExLjQ1aDExLjEzbC01LjM3LTE0LjE5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0LjkyIC0xNC42NykiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xMzkuOCw0NS4yaC0zLjY4bDEyLjUtMzAuNTNoNEwxNjQuMiw0NS4yaC00LjI5bC0zLjE3LTguNEgxNDMuMjVabTQuNjUtMTEuNDVoMTEuMTNsLTUuMzctMTQuMTlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQuOTIgLTE0LjY3KSIvPjxwYXRoIGNsYXNzPSJjbHMtNSIgZD0iTTE4MC4yLDQ1LjJoLTMuNjhMMTg5LDE0LjY3aDRMMjA0LjYsNDUuMmgtNC4yOWwtMy4xNy04LjRIMTgzLjY1Wm00LjY1LTExLjQ1SDE5NmwtNS4zNy0xNC4xOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNC45MiAtMTQuNjcpIi8+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNMjIwLjYsNDUuMmgtMy42OGwxMi41LTMwLjUzaDRMMjQ1LDQ1LjJoLTQuMjlsLTMuMTctOC40SDIyNC4wNVptNC42NS0xMS40NWgxMS4xM0wyMzEsMTkuNTZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQuOTIgLTE0LjY3KSIvPjwvc3ZnPg==');
            }

            .label {
                color: var(--black50);
                width: 50px;
                text-align: right;
                font-size: 1.3rem;
                white-space: nowrap;
            }
        }

        &.dark-mode .thumb {
            filter: contrast(0) brightness(2);
        }
    }
</style>
