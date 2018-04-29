// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueSession from 'vue-session'
//import VueResource from 'vue-resource'
import Moment from 'vue-moment'

Vue.prototype.$http = axios
Vue.config.productionTip = false
//Vue.use(VueResource)
Vue.use(VueSession)
Vue.use(Moment)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
