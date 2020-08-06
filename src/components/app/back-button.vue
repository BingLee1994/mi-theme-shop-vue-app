<style lang="scss">
.back-button {
    display: inline-block;
    padding: 5px;

    svg {
        width: 1.8rem;
        display: block;
    }
}
</style>

<template>
    <span class="back-button" @click="onClick">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.96 38.89">
            <title>back-btn</title>
            <polygon :style="`fill:${color};width:${width}`" points="41.76 20.74 41.76 16.74 7.66 16.74 21.57 2.83 18.74 0 0 18.74 18.74 37.48 21.57 34.65 7.66 20.74 41.76 20.74"/>
        </svg>
    </span>
</template>

<script>

export default {
    name: 'BackButton',
    props: {
        route: [Object, String],
        width: String,
        color: {
            type: String,
            default: 'var(--black80)'
        }
    },

    methods: {
        onClick(e) {
            if (this.route) {
                this.$router.push(this.route)
            } else {
                this.$router.go(-1)
            }
        }
    }
}
</script>
