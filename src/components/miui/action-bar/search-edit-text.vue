<script>
import EditTextAppearance from '../edit-text/edit-text-apperance'
import EditText from '../edit-text/edit-text'

const searchBoxAppearance = new EditTextAppearance('var(--black10)')
searchBoxAppearance.borderWidth = 0
searchBoxAppearance.caretColor = 'var(--black80)'
searchBoxAppearance.borderRadius = '2.2rem'
searchBoxAppearance.height = '4.5rem'

export default {
    inheritAttrs: false,
    render() {
        return (
            <EditText
                placeholder={this.$attrs.placeholder}
                {...this.$listeners}
                appearance={searchBoxAppearance}
                showClearButton={true}
                suffixIconClass="search"
                widen
                style={{ margin: 0 }}
            >
            </EditText>
        )
    }
}
</script>
