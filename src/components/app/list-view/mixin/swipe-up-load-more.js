
import { debounce } from '@/utils'

let checkLoadMore = function(elList, component) {
    let { scrollTop, clientHeight, scrollHeight } = elList
    if (scrollHeight > clientHeight && scrollTop + clientHeight === scrollHeight) {
        component.$emit('loadMore')
    }
}

checkLoadMore = debounce(checkLoadMore, 100)

export default {
    methods: {
        checkLoadMore(e) {
            let elList = e.currentTarget
            checkLoadMore(elList, this)
        }
    }
}
