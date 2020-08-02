<template>
    <div class="search-filter-wrapper">
        <transition name="open-mask">
            <div class="mask" @scroll="preventScroll" v-show="showAdvFilter" @click="showAdvFilter = false"></div>
        </transition>
        <ul class="filter-bar">
            <li>
                <span>排序方式：</span>
            </li>
            <li
                v-for="option in sortOptions"
                :key="option.value"
                :class="{
                    'sort-tab sort-option': true,
                    selected: selectedSort === option.value,
                    up: sortOrder,
                    down: !sortOrder
                }"
                @click="changeSortType(option)"
            >
                <span>{{option.name}}</span>
            </li>
            <li class="sort-tab" @click="toggleAdvFilter">筛选</li>
        </ul>

        <div class="adv-filter-wrapper">
            <div :class="['adv-filter', showAdvFilter? 'show': '']" v-flex:direction="'column'">
                <ul class="filter-list" v-flex-item.1>
                    <p class="title">价格</p>
                    <div class="options">
                        <Button
                            v-for="priceOption in priceFilters"
                            :key="priceOption.value"
                            small
                            :selected="priceOption.selected"
                            @click="onPriceFilterChange(priceOption)"
                        >
                            {{priceOption.name}}
                        </Button>
                        <Button small :selected="showPriceInput" @click="togglePriceInput">指定价格范围</Button>
                        <div class="input-wrapper" v-if="showPriceInput">
                            <EditText width="45%" type="number" height="3.5rem" placeholder="最低价"/>
                            -
                            <EditText width="45%" type="number" height="3.5rem" placeholder="最高价"/>
                        </div>
                    </div>
                    <p class="title">系统适配</p>
                    <p class="options">
                        <Button
                            v-for="sysOption in systemFilters"
                            :key="sysOption.value"
                            small
                            :selected="sysOption.selected"
                            @click="onFilterChange(sysOption, 'system')"
                        >
                            {{sysOption.name}}
                        </Button>
                    </p>
                </ul>
                <div v-flex-item.0 v-flex.centerY>
                    <Button style="margin-right: 0" widen medium @click="cancel">取消</Button>
                    <Button primary widen medium @click="confirm">确定</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@miui/buttons/button'
import { arrayRemove } from '../../utils'
import EditText from '@miui/edit-text/edit-text'

export default {
    name: 'SearchFilter',
    components: { Button, EditText },
    data() {
        return {
            sortOptions: [
                { name: '新上线', value: 'date' },
                { name: '价格', value: 'price' },
                { name: '销量', value: 'download' }
            ],
            sortBy: '',
            sortOrder: 0,
            selectedSort: null,
            showAdvFilter: false,
            priceFilters: [
                { name: '免费', value: 0, selected: false },
                { name: '3米币', value: 3, selected: false },
                { name: '6米币', value: 6, selected: false },
                { name: '9米币', value: 9, selected: false }
            ],
            systemFilters: [
                { name: 'MIUI 9', value: 'miui9', selected: false },
                { name: 'MIUI 10', value: 'miui10', selected: false },
                { name: 'MIUI 11', value: 'miui11', selected: false },
                { name: 'MIUI 12', value: 'miui12', selected: false }
            ],
            showPriceInput: false,
            filterRule: {
                price: [],
                system: []
            }
        }
    },
    created() {
        this.selectedSort = this.sortOptions[0].value
    },
    methods: {
        preventScroll(e) {
            console.log(e)
        },

        changeSortType(option) {
            if (this.selectedSort !== option.value) {
                this.selectedSort = option.value
            } else {
                this.sortOrder = !this.sortOrder
            }
            this.emit()
        },

        toggleAdvFilter() {
            this.showAdvFilter = !this.showAdvFilter
        },

        togglePriceInput() {
            this.showPriceInput = !this.showPriceInput
            if (this.showPriceInput) {
                this.priceFilters.forEach(p => {
                    p.selected = false
                })
                this.filterRule.price = []
            }
        },

        onPriceFilterChange(priceOption) {
            this.showPriceInput = false
            this.onFilterChange(priceOption, 'price')
        },

        onFilterChange(filterOption, ruleName) {
            let { filterRule } = this
            let { value } = filterOption
            let rule = filterRule[ruleName]
            if (rule) {
                if (!rule.includes(value)) {
                    rule.push(value)
                    filterOption.selected = true
                } else {
                    arrayRemove(rule, value)
                    filterOption.selected = false
                }
            }
        },

        cancel() {
            this.showAdvFilter = false
        },

        confirm() {
            this.showAdvFilter = false
            this.emit()
        },

        emit() {
            this.$emit('change', {
                sortBy: this.sortBy,
                sortOrder: this.sortOrder,
                filterRule: this.filterRule
            })
        }
    }
}
</script>

<style lang="scss">
.search-filter-wrapper {
    padding: 0 15px;
    margin: 10px 0;
    $transitionDuration: .25s;
    $transitionTiming: ease;
    $maskOpacity: .5;

    .filter-bar {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 7px 0;

        .sort-tab {
            padding: 0px 15px;
            font-size: 1.3rem;
            margin: 0 5px;

            &.sort-option {
                padding-left: 10px;
            }

            &.selected {
                color: var(--miOrange);
                font-weight: bold;
                &.sort-option {
                    position: relative;
                    &::after {
                        content: '';
                        display: inline-block;
                        width: 0;
                        height: 0;
                        border: 5px solid transparent;
                        top: 50%;
                        right: 0;
                        position: absolute;
                    }
                    &.down {
                        &::after {
                            border-top-color: var(--miOrange);
                            transform: translateY(-2px);
                        }
                    }

                    &.up {
                        &::after {
                            border-bottom-color: var(--miOrange);
                            transform: translateY(-7px);
                        }
                    }
                }
            }
        }
    }

    .mask {
        @include fillscreen(var(--black));
        opacity: $maskOpacity;
        z-index: 100;
    }

    .adv-filter-wrapper {
        --margin: 10px;
        .adv-filter {
            transition: transform $transitionDuration $transitionTiming;
            transform: translateX(calc(100% + var(--margin)));
            position: fixed;
            width: 250px;
            right: var(--margin);
            top: var(--margin);
            bottom: var(--margin);
            border-radius: 5px;
            background: var(--white);
            z-index: 200;

            &.show {
                transform: translateX(0);
            }

            .filter-list {
                padding: 15px;

                .title {
                    color: var(--black);
                    font-size: 1.4rem;
                    margin: 25px 5px;
                    margin-bottom: 5px;
                }

                .input-wrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 10px 0;

                    input {
                        font-size: 1.3rem;
                    }
                }
            }
        }
    }

    .open-mask {
        &-enter {
            opacity: 0;

            &-active {
                transition-property: all;
                transition-duration: $transitionDuration;
                transition-timing-function: $transitionTiming;
            }

            &-to {
                opacity: $maskOpacity;
            }
        }

        &-leave {
            opacity: $maskOpacity;

            &-to {
                opacity: 0;
            }

            &-active {
                transition-property: all;
                transition-duration: $transitionDuration;
                transition-timing-function: $transitionTiming;
            }
        }
    }

    // .open-filter {
    //     &-enter {
    //         transform: translateX(calc(100% + var(--margin)));

    //         &-active {
    //             transition-property: all;
    //             transition-duration: 30s;
    //             transition-timing-function: $transitionTiming;
    //             z-index: 200;
    //         }

    //         &-to {
    //             transform: translateX(0);
    //         }
    //     }

    //     &-leave {
    //         transform: translateX(0);

    //         &-to {
    //             transform: translateX(calc(100% + var(--margin)));
    //         }

    //         &-active {
    //             transition-property: all;
    //             transition-duration: $transitionDuration;
    //             transition-timing-function: $transitionTiming;
    //             z-index: 200;
    //         }
    //     }
    // }
}
</style>
