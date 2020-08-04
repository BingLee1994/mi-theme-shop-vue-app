
<template>
    <li
        class="font-preview-card pd-v10"
        v-on="$listeners"
        :style="`--accentColor:${accentColor}`"
    >
        <p class="title">{{item.nameCN}}</p>
        <p class="sub-title">{{item.nameEN}}</p>
    </li>
</template>

<script>
const defaultColor = ['#d1d3eb', '#a9a4f1', '#9fd0cf', '#e3c8ab', '#efb7e9', '#bbcaa1', '#ffafaf', '#a1c9a9']
export default {
    name: 'FontFacePreview',
    props: {
        item: Object
    },
    computed: {
        accentColor() {
            return defaultColor[Math.floor(Math.random() * defaultColor.length + 1)]
        }
    }
}
</script>

<style lang="scss" scoped>
    .font-preview-card {
        border-radius: 6px;
        border-style: dashed;
        border-width: 3px;
        border-color: var(--accentColor);
        box-sizing: border-box;
        text-align: center;
        color: var(--accentColor);
        min-height: 80px;

        .title {
            font-size: 1.3rem;
            @include iphone5se {
                font-size: 1.1rem;
            }
        }

        .sub-title {
            font-size: 1.2rem;
            @include iphone5se {
                font-size: 1rem;
            }
        }
    }
</style>
