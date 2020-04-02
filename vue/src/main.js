// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import utils from './assets/js/util'
import store from './store/store'
Vue.config.productionTip = false

Vue.prototype.$axios = Axios;
Vue.prototype.$utils = utils;

Vue.use(ElementUI, {
  size: 'middle'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  template: '<App/>'
})
