import store from '@/store'

const AppContext = {
    version: '1.0',
    language: 'zh-cn'
}

export default function getRequestContext() {
    let userContext = store.getters['authenticator/userContext'] || {}
    return {
        appContext: AppContext,
        userContext
    }
}
