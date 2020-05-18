import { lazyImg } from './lazy-load'
import { flexContainer, flexItem } from './flex-box'
import { fullScreen } from './dom'

export default function install(Vue) {
    [lazyImg, fullScreen, flexContainer, flexItem].forEach(i => {
        Vue.directive(i.name, i.option)
    })
}
