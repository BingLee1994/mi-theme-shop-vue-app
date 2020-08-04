<style lang="scss">
    @import "~@miui/component-style/toggle";
</style>

<template>
    <label
        class="miui-toggle-wrapper"
        :title="title"
    >
        <span
            @click="swtichToggle"
            @transitionstart="isAnimationPlaying = true"
            @transitionend="isAnimationPlaying = false"
            :class="{
                'miui-toggle': true,
                'miui-toggle_disabled': disabled,
                'miui-toggle_checked': checked
            }"
        >
        </span>
        <span
            v-if="label"
            :class="{
                'label': true,
                'label_checked': checked,
                [labelClass]: true
            }"
        >
            {{label}}
        </span>
    </label>
</template>

<script>
export default {
    name: 'MIUI-Toggle',
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        disabled: Boolean,
        checked: Boolean,
        label: String,
        labelClass: String,
        title: String
    },
    data() {
        return {
            isAnimationPlaying: false
        }
    },
    methods: {
        swtichToggle(e) {
            if (this.$props.disabled || this.isAnimationPlaying) return
            let value = !this.$props.checked
            this.$emit('change', value)
        }
    }
}
</script>
