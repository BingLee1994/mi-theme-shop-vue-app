import Vue from 'vue'
import Vuex from 'vuex'

import preference from './preference'
import navigation from './navigation'
import search from './search'
import authenticator from './authenticator'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    preference,
    navigation,
    search,
    authenticator
  }
})
