import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@assets/js/font-size'
import './style/reset.scss'
import './style/app.scss'
import Dialog from '@miui/dialog/install'
import Toast from '@miui/toast/install'
import installMyDirective from '@/directives'
import { install as Api } from '@/api'

const elApp = document.getElementById('app')

Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Api)
Vue.config.productionTip = false

installMyDirective(Vue)

new Vue({
  router,
  store,
  render(h) { return h(App) }
}).$mount(elApp)
