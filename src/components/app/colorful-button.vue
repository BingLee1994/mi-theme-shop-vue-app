<template>
    <button
        class="colorful-button"
        v-on="$listeners"
        :style="{borderColor: colorVal}"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'ColorfulButton',
    props: {
        color: String
    },
    computed: {
        colorVal() {
            console.log(this.color)
            return this.color
        }
    }
}
</script>

<style scoped lang="scss">
    .colorful-button {
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        padding: 0 1rem;
        border-radius: 0.5rem;
        border: 1px solid black;
        border-color: #A0D0D0;
        box-sizing: border-box;
        background: #E8F6F6;
        color: rgba(0,0,0,.7);
        font-size: 1.4rem;
    }
</style>
