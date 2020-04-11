<script>
import EditTextAppearance from '../edit-text/edit-text-apperance'
import EditText from '../edit-text/edit-text'

const searchEditTextAppearance = new EditTextAppearance('var(--black10)')
searchEditTextAppearance.borderWidth = '0px'
searchEditTextAppearance.caretColor = 'var(--black80)'
searchEditTextAppearance.borderRadius = '22px'

export default {
    inheritAttrs: false,
    render() {
        return (
            <EditText
                placeholder={this.$attrs.placeholder}
                {...this.$listeners}
                appearance={searchEditTextAppearance}
                showClearButton={true}
                prefixIconClass="search"
                widen
                style={{ margin: 0 }}
            >
            </EditText>
        )
    }
}
</script>
