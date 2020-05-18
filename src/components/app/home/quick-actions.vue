<template>
    <div class="quick-actions-wrapper">
        <div class="action-button"
            v-for="(item, index) in items"
            :key="index"
            @click="onClick(item, index, $event)"
        >
            <span
                :class="['icon', item.className]"
            >
                <img :src="item.imgUrl"/>
            </span>
            <p><span class="label">{{item.text}}</span></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuickAction',
    props: {
        category: {
            type: String,
            default: 'theme'
        },
        items: Array
    },
    methods: {
        onClick(item, index, e) {
            let { route, routeLink } = item
            if (routeLink && route) {
                this.$router.push(route)
            } else {
                this.$emit('click', item, index, e)
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .quick-actions-wrapper {
        display: flex;
        margin: 10px 5px;
        .action-button {
            flex: 1;
            text-align: center;
            font-size: 1.1rem;
            .icon {
                width: 50px;
                height: 30px;
                border: 1px solid yellow;
                display: inline-block;
                margin-bottom: 5px;
            }
        }
    }
</style>
