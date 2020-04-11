import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@assets/js/font-size'
import './style/reset.scss'
import './style/app.scss'
import Dialog from '@miui/dialog/install'

const elApp = document.getElementById('app')

Vue.use(Dialog)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount(elApp)
