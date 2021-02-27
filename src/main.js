import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import { firebase } from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// }

var firebaseConfig = {
  apiKey: "AIzaSyAlGitwaUEOJEWUlmRH671Gw9fWT18QBMo",
  authDomain: "flashcall-dff0a.firebaseapp.com",
  projectId: "flashcall-dff0a",
  storageBucket: "flashcall-dff0a.appspot.com",
  messagingSenderId: "357469838300",
  appId: "1:357469838300:web:160dc0f33c503228eb0d19",
  measurementId: "G-D2YL9Q1HZN"
};

firebase.initializeApp(firebaseConfig)


Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app') 
