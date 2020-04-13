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
                'miui-checkbox_checked': isChecked
            }"
        >
        </span>
        <span
            v-if="label"
            :class="{
                'label': true,
                'label_checked': isChecked,
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
            isChecked: this.$props.checked,
            darkModeClass: 'miui-checkbox-wrapper-dark'
        }
    },
    watch: {
        checked(newVal) {
            if (this.isChecked !== newVal) {
                this.isChecked = newVal
            }
        }
    },
    methods: {
        toggleCheckbox(e) {
            if (this.$props.disabled) return
            let value = !this.isChecked
            this.$emit('change', value)
            this.isChecked = value
        }
    }
}
</script>
