// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import './assets/css/common-font.css'
import './assets/css/reset.css'
import swiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'
import './common/common'
import store from './store'

Vue.use(swiper)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  error: require('./assets/img/error.jpg'),
  loading: require('./assets/img/error.jpg'),
  attempt: 1
})
Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
