<template>
    <span class="icon" v-on="$listeners">
        <svg :style="`width:${width};fill:${color}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.5 38.36">
            <title>comment</title>
            <path d="M40.28,38.36a2.16,2.16,0,0,1-1.43-.54l-9.6-8.32H0V0H42.5V36.15a2.21,2.21,0,0,1-2.22,2.21ZM2.5,27H30.18L40,35.51V2.5H2.5Z"/>
            <circle cx="10" cy="14" r="2.75"/>
            <circle cx="21.7" cy="14" r="2.75"/>
            <circle cx="33.4" cy="14" r="2.75"/>
        </svg>
        <slot></slot>
    </span>
</template>

<script>

export default {
    name: 'CommentIcon',
    props: {
        width: {
            type: String,
            default: '15px'
        },
        color: String
    }
}
</script>
