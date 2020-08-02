<style lang="scss">
    @import "~@miui/component-style/checkbox";
</style>

<template>
    <label
        class="miui-checkbox-wrapper"
        @click="toggleCheckbox"
    >
        <span
            :class="{
                'miui-checkbox': true,
                'miui-checkbox_disabled': disabled,
                'miui-checkbox_checked': checked
            }"
        >
        <svg class="check-icn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.37 4.41">
            <path d="M6.37.65,2.66,4.35a.19.19,0,0,1-.28,0L0,2l.65-.64L2.38,3.06a.19.19,0,0,0,.28,0L5.72,0Z"/>
        </svg>
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
import darkMode from '@/mixins/dark-mode'

export default {
    name: 'MIUI-Checkbox',
    mixins: [darkMode],
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        disabled: Boolean,
        checked: Boolean,
        label: [String, Number],
        labelClass: String
    },
    data() {
        return {
            darkModeClass: 'miui-checkbox-wrapper-dark'
        }
    },
    methods: {
        toggleCheckbox(e) {
            if (this.$props.disabled) return
            let value = !this.checked
            this.$emit('change', value)
        }
    }
}
</script>
