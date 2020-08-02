<style lang='scss'>
@import "~@miui/component-style/edit-text";
</style>

<script>
import { warn, joinClass, isEmpty, isNone } from '../utils'
import EditTextAppearance from './edit-text-apperance'

const expectedType = ['text', 'number', 'password']
const expectedSlotTag = ['span', 'font']

export default {
    name: 'MIUI-EditText',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        widen: Boolean,
        disabled: Boolean,
        value: [String, Number],
        prefixIconClass: String,
        suffixIconClass: String,
        placeholder: String,
        width: [Number, String],
        showPasswordButton: Boolean,
        showClearButton: Boolean,
        name: String,
        height: String,
        title: String,
        appearance: {
            type: EditTextAppearance,
            default: null
        },
        type: {
            validator(value) {
                return expectedType.indexOf(value) !== -1
            }
        }
    },
    data() {
        return {
            visualType: this.$props.type,
            visualValue: this.$props.value,
            isComposing: false
        }
    },
    computed: {
        showPrependText() {
            return this._checkTextSlot('prepend-text')
        },
        showAppendText() {
            return this._checkTextSlot('append-text')
        }
    },
    watch: {
        value(val) {
            requestAnimationFrame(() => {
                this._updateNativeInputValue(val)
            })
        },
        type(val) {
            this.visualType = val
        }
    },
    methods: {
        _checkTextSlot(slotName) {
            let slot = this.$slots[slotName]
            if (isEmpty(slot)) return false
            let child = slot[0]
            if (expectedSlotTag.some(t => t === child.tag) || child.tag === undefined) {
                if (slot.length > 1) {
                    warn(`Expected one child for slot [${slotName}], but got ${slot.length}`, this)
                }
                return true
            }
            warn(`Expected text, <${expectedSlotTag.join('>, <')}> for slot [${slotName}], but got <${(child.componentOptions && child.componentOptions.tag) || child.tag}>`, this)
            return false
        },
        toggleShowPassword(e) {
            if (this.type !== 'password') return
            this.visualType = this.visualType === 'text' ? 'password' : 'text'
        },
        emitEvent(type, extra) {
            return e => {
                this.$emit(type, e, extra)
            }
        },
        onCompositionStart(e) {
            this.isComposing = true
        },
        onCompositionEnd(e) {
            this.isComposing = false
            this.onInput(e)
        },
        onInput(e) {
            if (this.isComposing) return
            this.visualValue = e.target.value
            this.$emit('change', e.target.value, e)
        },
        clearInput() {
            if (this.$refs.input) {
                this._updateNativeInputValue()
                this.$emit('change', '')
            }
        },
        _updateNativeInputValue(val) {
            val = isNone(val) ? '' : val
            this.$refs.input.value = val
            this.visualValue = val
        }
    },
    mounted() {
        this._updateNativeInputValue(this.value)
    },
    render() {
        let {
            widen, disabled, width, height,
            prefixIconClass, name,
            suffixIconClass, placeholder, type,
            showPasswordButton, showClearButton, appearance
        } = this.$props

        let { visualType, showPrependText, showAppendText } = this

        let style = { width, height }
        if (!isNone(appearance)) {
            Object.assign(style, appearance.toStyle())
        }

        return (
            <div
                style={style}
                title={this.$props.title}
                class={
                    joinClass(
                        'miui-edit-text-wrapper',
                        widen ? 'miui-edit-text-wrapper_widen' : '',
                        disabled ? 'miui-edit-text-wrapper_disabled' : ''
                    )
                }
            >
                {/* if */ showPrependText &&
                    <span class="prepend-text">{this.$slots['prepend-text'][0]}</span>
                }

                {/* if */ prefixIconClass &&
                    <span class={joinClass('icon prefix-icon', prefixIconClass)}></span>
                }

                <input
                    ref="input"
                    name={name}
                    placeholder={placeholder}
                    type={visualType}
                    disabled={disabled}
                    onInput={this.onInput}
                    onFocus={this.emitEvent('focus')}
                    onBlur={this.emitEvent('blur')}
                    onKeydown={this.emitEvent('keydown')}
                    onKeyup={this.emitEvent('keyup')}
                    onKeypress={this.emitEvent('keypress')}
                    onCompositionstart={this.onCompositionStart}
                    onCompositionend={this.onCompositionEnd}
                    />

                {/* if */ showAppendText &&
                    <span class="append-text">{this.$slots['append-text'][0]}</span>
                }

                {/* if */ suffixIconClass &&
                    <span class={joinClass('icon suffix-icon', suffixIconClass)}></span>
                }

                {/* if */ (type === 'password' && showPasswordButton) &&
                    <button class='icon password-icon' onClick={this.toggleShowPassword}></button>
                }

                {/* if */ (showClearButton && !isEmpty(this.visualValue)) &&
                    <button class='icon clear-icon' onClick={this.clearInput}></button>
                }
            </div>
        )
    }
}

export { EditTextAppearance }
</script>
