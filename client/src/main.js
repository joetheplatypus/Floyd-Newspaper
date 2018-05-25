// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from '@/store'
import 'vuetify/dist/vuetify.min.css'
import VueCkeditor from 'vue-ckeditor2'

Vue.use(VueCkeditor)

Vue.use(Vuetify, {
  theme: {
    primary: '#6e121d',
    secondary: '#f8c42a',
    accent: '#f8c42a'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
