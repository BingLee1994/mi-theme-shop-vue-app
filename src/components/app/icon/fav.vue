<template>
    <span class="icon" v-on="$listeners">
        <svg :style="`width:${width};color${color}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.58 46">
            <title>fav</title>
            <path d="M24.29,46l-.74-.54C22.59,44.75,0,27.89,0,12.77A12.77,12.77,0,0,1,24.29,7.26a12.77,12.77,0,0,1,24.29,5.51c0,15.12-22.59,32-23.55,32.69ZM12.77,2.5A10.29,10.29,0,0,0,2.5,12.77c0,12.42,17.89,27.06,21.79,30.11,3.9-3.05,21.79-17.7,21.79-30.11a10.27,10.27,0,1,0-20.54,0H23A10.29,10.29,0,0,0,12.77,2.5Z"/>
        </svg>
        <slot></slot>
    </span>
</template>

<script>

export default {
    name: 'FavIcon',
    props: {
        width: {
            type: String,
            default: '15px'
        },
        color: {
            type: String,
            default: 'var(--black80)'
        }
    }
}
</script>
