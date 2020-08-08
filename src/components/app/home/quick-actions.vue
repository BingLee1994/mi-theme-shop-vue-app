<template>
    <div class="quick-actions-wrapper">
        <div class="action-button"
            v-for="(item, index) in items"
            :key="index"
            @click="onClick(item, index, $event)"
        >
            <span
                :class="['action-icon', item.className]"
            >
                <img style="height: 100%;object-fit: contain" :src="item.imgUrl"/>
            </span>
            <p class="label">{{item.text}}</p>
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
            let { route, routeLink, external, prompt, link } = item
            if (routeLink && route) {
                this.$router.push(route)
            } else if (external) {
                this.$dialog.alert('', prompt.message, prompt.primaryButton).then(() => {
                    window.open(link)
                })
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
            $height: 6rem;
            overflow: hidden;
            flex: 1;
            text-align: center;
            font-size: 1.1rem;
            height: $height;
            .action-icon {
                height: calc(4rem - 5px);
                width: 100%;
                display: inline-block;
                margin-bottom: 5px;
            }
            .label {
                height: 2rem;
                line-height: 2rem;
                font-size: 1.3rem;
            }
        }
    }
</style>
