<template>
    <div class="rank-list-wrapper pd-15 mg-15"
        :style="{
            backgroundColor: accentColor,
            backgroundImage: backgroundImage
        }"
    >
        <p class="title mg-b10">
            <slot name="titleIcon"></slot>
            <span>{{title}}</span>
            <slot name="titleTailIcon"></slot>
        </p>
        <div class="rank-list pd-10">
            <div
                v-for="(item, index) in list"
                :key="item.id"
                @click="onClickItem(item, index)"
                v-flex.centerY
                class="pd-v10"
            >
                <slot name="rankNumber" :rankNumber="index +1">
                    <span class="bold">{{index + 1}}.</span>
                </slot>
                <img
                    class="mg-h15"
                    v-flex-item.1
                    :src="item.imgUrl"
                />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'FontRankList',
    props: {
        list: Array,
        accentColor: String,
        backgroundImage: String,
        title: String
    },

    methods: {
        onClickItem(item, idx) {
            this.$emit('clickItem', { ...item }, idx)
        }
    }
}
</script>

<style lang="scss">
    .rank-list-wrapper {
        --radius: .8rem;
        background-color: rgb(231, 197, 47);
        border-radius: var(--radius);

        .title {
            color: white;
            font-weight: bold;
            font-size: 1.7rem;
        }

        .rank-list {
            border-radius: var(--radius);
            background-color: rgb(253, 253, 253);

            img {
                display: block;
                flex: 1 1 0px;
                object-fit: contain;
                overflow: hidden;
            }
        }
    }
</style>
