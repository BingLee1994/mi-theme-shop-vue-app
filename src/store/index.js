import Vue from 'vue'
import Vuex from 'vuex'

import preference from './preference'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    preference
  }
})
