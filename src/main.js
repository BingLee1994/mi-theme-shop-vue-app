import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@assets/js/font-size'
import './style/reset.scss'
import './style/app.scss'
import Dialog from '@miui/dialog/install'
import Toast from '@miui/toast/install'

const elApp = document.getElementById('app')

Vue.use(Dialog)
Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount(elApp)
