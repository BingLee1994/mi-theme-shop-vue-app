<template>
    <div class="star-wrapper"
        :style="{
            'margin-right': `${divider}px`,
            '--size': computedSize
        }"
        @click="onClickItem"
    >
        <span class="star star-bg" style="margin"></span>
        <span class="star star-fg" :style="`width: calc(100% * ${width})`"></span>
    </div>
</template>

<script>

export default {
    name: 'Start',
    props: {
        point: Number,
        color: String,
        size: {
            type: [Number, String],
            default: '1.5rem'
        },
        divider: {
            type: Number,
            default: 5
        }
    },

    computed: {
        width() {
            return Math.min(Math.max(this.point, 0), 1)
        },

        computedSize() {
            if (typeof this.size === 'number') {
                return this.size + 'px'
            }
            return this.size
        }
    },

    methods: {
        onClickItem(e) {
            this.$emit('click', e)
        }
    }
}
</script>

<style scoped lang="scss">
    .star-wrapper {
        line-height: 1;
        font-size: 0;
        --color: #FFC666;
        --size: 1.5rem;
        display: block;
        width: var(--size);
        height: var(--size);
        position: relative;

        .star {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 100%;
            vertical-align: middle;
            display: inline-block;
            mask-position: left center;
            mask-size: var(--size) var(--size);
            mask-repeat: no-repeat;
            -webkit-mask-position: left center;
            -webkit-mask-size: var(--size) var(--size);
            -webkit-mask-repeat: no-repeat;
            background-color: var(--color);

            &-bg {
                mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyODcuMzEgMjg3LjMxIj48dGl0bGU+6LWE5rqQIDI8L3RpdGxlPjxwYXRoIGQ9Ik0yODQuMjQsMTE5Ljg1YzYtNi4xNCwyLjctMTYuODYtNS42Mi0xOC4xMmwtODEuNy0xMi40NGExMC4xOCwxMC4xOCwwLDAsMS03LjYzLTUuODFMMTUyLjc1LDUuOTJhOS45NSw5Ljk1LDAsMCwwLTE4LjE5LDBMOTgsODMuNDhhMTAuMjEsMTAuMjEsMCwwLDEtNy42NCw1LjgxTDguNywxMDEuNzNjLTguMzIsMS4yNi0xMS42NSwxMi01LjYzLDE4LjEybDU5LjEyLDYwLjM3YTEwLjkzLDEwLjkzLDAsMCwxLDIuOTEsOS40MUw1MS4xNSwyNzQuODZhMTAuNTEsMTAuNTEsMCwwLDAsMTAsMTIuNDUsOS43Nyw5Ljc3LDAsMCwwLDQuNzItMS4yNGw3My4wNy00MC4yNWE5Ljc0LDkuNzQsMCwwLDEsOS40NCwwbDczLjA2LDQwLjI1YTkuODQsOS44NCwwLDAsMCw0LjczLDEuMjQsMTAuNSwxMC41LDAsMCwwLDEwLTEyLjQ1bC0xMy45NS04NS4yM2ExMC45MSwxMC45MSwwLDAsMSwyLjkyLTkuNDFabS02OS4xMiw1MC41N2EyNSwyNSwwLDAsMC02LjczLDIxLjQ3bDEyLjc4LDc4LTY2LTM2LjM3YTIzLjcyLDIzLjcyLDAsMCwwLTIyLjk1LDBsLTY2LDM2LjM3LDEyLjc4LTc4YTI1LDI1LDAsMCwwLTYuNzMtMjEuNDdMMTcuNDgsMTE0LjU1bDc1LTExLjQyYTI0LjE2LDI0LjE2LDAsMCwwLDE4LjE5LTEzLjY5bDMzLTcwLDMzLDcwYTI0LjE2LDI0LjE2LDAsMCwwLDE4LjIsMTMuNjlsNzUsMTEuNDJaIi8+PC9zdmc+');
                -webkit-mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyODcuMzEgMjg3LjMxIj48dGl0bGU+6LWE5rqQIDI8L3RpdGxlPjxwYXRoIGQ9Ik0yODQuMjQsMTE5Ljg1YzYtNi4xNCwyLjctMTYuODYtNS42Mi0xOC4xMmwtODEuNy0xMi40NGExMC4xOCwxMC4xOCwwLDAsMS03LjYzLTUuODFMMTUyLjc1LDUuOTJhOS45NSw5Ljk1LDAsMCwwLTE4LjE5LDBMOTgsODMuNDhhMTAuMjEsMTAuMjEsMCwwLDEtNy42NCw1LjgxTDguNywxMDEuNzNjLTguMzIsMS4yNi0xMS42NSwxMi01LjYzLDE4LjEybDU5LjEyLDYwLjM3YTEwLjkzLDEwLjkzLDAsMCwxLDIuOTEsOS40MUw1MS4xNSwyNzQuODZhMTAuNTEsMTAuNTEsMCwwLDAsMTAsMTIuNDUsOS43Nyw5Ljc3LDAsMCwwLDQuNzItMS4yNGw3My4wNy00MC4yNWE5Ljc0LDkuNzQsMCwwLDEsOS40NCwwbDczLjA2LDQwLjI1YTkuODQsOS44NCwwLDAsMCw0LjczLDEuMjQsMTAuNSwxMC41LDAsMCwwLDEwLTEyLjQ1bC0xMy45NS04NS4yM2ExMC45MSwxMC45MSwwLDAsMSwyLjkyLTkuNDFabS02OS4xMiw1MC41N2EyNSwyNSwwLDAsMC02LjczLDIxLjQ3bDEyLjc4LDc4LTY2LTM2LjM3YTIzLjcyLDIzLjcyLDAsMCwwLTIyLjk1LDBsLTY2LDM2LjM3LDEyLjc4LTc4YTI1LDI1LDAsMCwwLTYuNzMtMjEuNDdMMTcuNDgsMTE0LjU1bDc1LTExLjQyYTI0LjE2LDI0LjE2LDAsMCwwLDE4LjE5LTEzLjY5bDMzLTcwLDMzLDcwYTI0LjE2LDI0LjE2LDAsMCwwLDE4LjIsMTMuNjlsNzUsMTEuNDJaIi8+PC9zdmc+');
            }

            &-fg {
                mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyODcuMzEgMjg3LjMxIj48dGl0bGU+6LWE5rqQIDQ8L3RpdGxlPjxwYXRoIGQ9Ik0yODQuMjQsMTE5Ljg1YzYtNi4xNCwyLjctMTYuODYtNS42Mi0xOC4xMmwtODEuNy0xMi40NGExMC4xOCwxMC4xOCwwLDAsMS03LjYzLTUuODFMMTUyLjc1LDUuOTJhOS45NSw5Ljk1LDAsMCwwLTE4LjE5LDBMOTgsODMuNDhhMTAuMjEsMTAuMjEsMCwwLDEtNy42NCw1LjgxTDguNywxMDEuNzNjLTguMzIsMS4yNi0xMS42NSwxMi01LjYzLDE4LjEybDU5LjEyLDYwLjM3YTEwLjkzLDEwLjkzLDAsMCwxLDIuOTEsOS40MUw1MS4xNSwyNzQuODZhMTAuNTEsMTAuNTEsMCwwLDAsMTAsMTIuNDUsOS43Nyw5Ljc3LDAsMCwwLDQuNzItMS4yNGw3My4wNy00MC4yNWE5Ljc0LDkuNzQsMCwwLDEsOS40NCwwbDczLjA2LDQwLjI1YTkuODQsOS44NCwwLDAsMCw0LjczLDEuMjQsMTAuNSwxMC41LDAsMCwwLDEwLTEyLjQ1bC0xMy45NS04NS4yM2ExMC45MSwxMC45MSwwLDAsMSwyLjkyLTkuNDFaIi8+PC9zdmc+');
                -webkit-mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyODcuMzEgMjg3LjMxIj48dGl0bGU+6LWE5rqQIDQ8L3RpdGxlPjxwYXRoIGQ9Ik0yODQuMjQsMTE5Ljg1YzYtNi4xNCwyLjctMTYuODYtNS42Mi0xOC4xMmwtODEuNy0xMi40NGExMC4xOCwxMC4xOCwwLDAsMS03LjYzLTUuODFMMTUyLjc1LDUuOTJhOS45NSw5Ljk1LDAsMCwwLTE4LjE5LDBMOTgsODMuNDhhMTAuMjEsMTAuMjEsMCwwLDEtNy42NCw1LjgxTDguNywxMDEuNzNjLTguMzIsMS4yNi0xMS42NSwxMi01LjYzLDE4LjEybDU5LjEyLDYwLjM3YTEwLjkzLDEwLjkzLDAsMCwxLDIuOTEsOS40MUw1MS4xNSwyNzQuODZhMTAuNTEsMTAuNTEsMCwwLDAsMTAsMTIuNDUsOS43Nyw5Ljc3LDAsMCwwLDQuNzItMS4yNGw3My4wNy00MC4yNWE5Ljc0LDkuNzQsMCwwLDEsOS40NCwwbDczLjA2LDQwLjI1YTkuODQsOS44NCwwLDAsMCw0LjczLDEuMjQsMTAuNSwxMC41LDAsMCwwLDEwLTEyLjQ1bC0xMy45NS04NS4yM2ExMC45MSwxMC45MSwwLDAsMSwyLjkyLTkuNDFaIi8+PC9zdmc+');
            }
        }
    }
</style>
