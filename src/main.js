import Vue from 'vue'
import App from './App.vue'
import { auth } from './firebase'

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: h => h(App)
    }).$mount('#app')
  }
})
